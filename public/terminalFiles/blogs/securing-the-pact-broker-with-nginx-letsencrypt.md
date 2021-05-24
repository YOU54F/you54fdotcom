---
title: "Securing the Pact Broker with nginx and LetsEncrypt"
date: "2019-03-19"
---

# Dockerised Pact Broker - Secure Implementation

## Background & Aim

The cool guys and girls over at Dius offer a [dockerised](https://github.com/DiUS/pact_broker-docker) implementation of the [Pact-Broker](https://github.com/pact-foundation/pact_broker) for free! I know, amazing, right? You can get it right now [here](https://hub.docker.com/r/dius/pact-broker/)

However out of the box, the Docker solution is not secure. There is an [example SSL configuration](https://github.com/pact-foundation/pact_broker/wiki/Configuration#running-the-broker-behind-a-reverse-proxy), utilising nginx as a reverse proxy, to allow access solely via HTTPS, provided by the PACT team.

I have extended on this implementation, to ensure we are following current industry standards for a secure nginx implementation.

Additionally we will go through the process of how to generate your own self-signed certificates and register them with a Certificate Authority to give confidence to your stakeholders and site-visitors.

We will only be using open-source tooling because open-source ftw <3.

If you haven't already read my post about using Pact & Swagger to compliment your development workflow, you can check it out [here](https://you54f.wordpress.com/2019/02/19/protecting-your-api-development-workflows-with-swagger-openapi-pact-io/).

## Prerequisites

- It is assumed that you have registered a domain name as it is a requirement to generate your signed SSL certificates.
- Get the fork here https://github.com/YOU54F/pact\_broker-docker/tree/feat/secureBroker/ssl\_letsencrypt for my source code

## Additional Notes

- This example will use a dockerised postgres instance, as described in the main pact_broker-docker readme, just so you can run the example end-to-end.
- If you are able to use your cloud provider to sign your certificates, then you may not need to use lets-encrypt. In my example, I am using a self-managed AWS EC2 instance, which is unable to utilise AWS certificate manager, as you are unable to download the generated ceritifcates. If you are using Fargate, this is not an issue.

## Initial Setup

1. [Install Docker](https://docs.docker.com/engine/installation/) on your instance
2. Copy the contents of `ssl_letsencrypt` to your instance and rename to `pact-broker`
3. Replace the following occurances found in the `*.sh` & `docker-compose.yml` files in `pact-broker` & `pact-broker/lets-encrypt`
   - domain_name - Replace with your registered domain name
   - email_address - Replace with your email address. It should match the registered domain
   - username - Replace with the name of your user (it is assumed your folder will live in `/home/username/pact-broker` but you can change to suit)
4. Rename `.env.example` to `.env`.

## Get to know your environment file

The `.env` file contains the credentials we will pass into the docker-compose file and ultimately to the pact-broker. More options can be added as per Pact.io documentation, but will also require adding into your `docker-compose.yml` file.

The database variables are setup to talk to the postgres database loaded via docker-compose.

```bash
PACT_BROKER_DATABASE_USERNAME=postgres
PACT_BROKER_DATABASE_PASSWORD=postgres
PACT_BROKER_DATABASE_HOST=postgres
PACT_BROKER_DATABASE_NAME=postgres
PACT_BROKER_BASIC_AUTH_USERNAME=readwrite
PACT_BROKER_BASIC_AUTH_PASSWORD=readwrite
PACT_BROKER_BASIC_AUTH_READ_ONLY_USERNAME=readonly
PACT_BROKER_BASIC_AUTH_READ_ONLY_PASSWORD=readonly
```

_NOTE: Please do not commit your `.env` file to source control. If you do, consider your credentials comprimised and update them straight away_

## Generate your Signed SSL cerficate with Lets-Encrypt

Let-Encrypt is an open-source project which will allow you to create SSL certificates, and sign them against the Lets-Encrypt Certificate Authority. It is in a bid to help make the web safer.

1. Change into the `lets-encrypt` folder
2. Run `docker-compose up -d`. This will load up a single page application that lets-encrypt can read from, in order to verify that the domain is owned by you.
3. Run `./makecertsstaging.sh` - This will generate sample certificates for you, in `lets-encrypt/out`
4. Run `./makecertsinfostaging.sh` - This will provide information about the generated certificates for you.
5. If all the above steps ran ok, we can safely remove the `out` dir in `lets-encrypt/out` to remove our staged certificates.
6. Run `./makecerts.sh` - This will generate your signed certificates for you, in `lets-encrypt/out`
7. Run `./makecertsinfolive.sh` - This will provide information about the generated certificates for you.

Certificates will be output to `pact-broker/letsencrypt/out/etc/letsencrypt/live//`

The folder is actually sym-linked, and the actual certificates live in the `archive` folder.

Each generated certificate will last for three months, a further section will discuss renewals.

## Generate your Diffe-Hellman Param certificate

1. Change into the `lets-encrypt` folder
2. Run `./gen_dhparam.sh`. This will take a while (5-10 minutes) so go make a brew.

## Check your nginx configuration

There is a lot going on in the nginx configuration. I will touch on why each component is there, and you can elect to remove as you wish.

In this section, we are going to add headers to every request, to avoid cross-site scripting attacks

```bash
add_header X-XSS-Protection "1; mode=block";
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
```

Remove the nginx version number from responses to avoid leaking implementation details.

```bash
server_tokens off;
```

In the first server block which is for HTTP requests, we do the following

- Listen to all requests on port 80. Our server name, in the name of the pact broker docker image as defined in the `docker-compose.yml`

```bash
listen 80 default_server;
server_name broker;
```

- Only allow GET methods, if accessed via port 80. Add in any request methods you wish to allow. I prefer to whitelist, rather than blacklist.

```bash
if ( $request\_method !~ ^(GET|HEAD)$ ) {
return 405;
}
```

Redirect all HTTP requests, to HTTPS. We drop any request parameters that were provided to avoid any parameter injection in our redirect to HTTPS.

```bash
return 301 https://$host;
```

The second server block is for our HTTPS requests.

- Listen on port 443 and enable ssl

```bash
listen 443 ssl;
server_name broker;
```

- Our certificates are loaded in to the docker-container via the `docker-compose.yml` volumes section, on the following paths.

```bash
ssl_certificate "/etc/nginx/ssl/certs/fullchain.pem";
ssl_certificate_key "/etc/nginx/ssl/certs/privkey.pem";
ssl_dhparam "/etc/nginx/ssl/dhparam/dhparams.pem";
```

- Enable SSL protocols. TLSv1 is insecure and shouldn't be used. TLSv1.1 is weak. For compliance reasons, TLSv1 should not be used.

```bash
ssl_protocols TLSv1.2 TLSv1.3;
```

- Only enable known strong SSL ciphers. It is a balancing act between using strong ciphers and compatability. A site scoring 100% on a cipher test, would not be compatible with all devices. The current set gives 95% on SSLLabs security test.
- Let's also tell nginx to use this list

```bash
ssl_ciphers "EECDH+ECDSA+AESGCM EECDH+ECDSA+SHA384 EECDH+ECDSA+SHA256 EECDH+aRSA+SHA384 EECDH+aRSA+SHA256 EECDH+aRSA+RC4 EECDH EDH+aRSA HIGH !RC4 !aNULL !eNULL !LOW !3DES !MD5 !EXP !PSK !SRP !DSS";
ssl_prefer_server_ciphers on;
```

- ecdh provides a nice default for nginx as not all openSSL implementations do it well
- session tickets don't provide forward secrecy.
- Limit the SSL buffer size (default 16k iirc)
- Maintain SSL connections for 10 minutes
- Switch of gzip compression as it can be vunerable. Enable if needed.

```bash
ssl_ecdh_curve secp384r1;
ssl_session_tickets off;
ssl_buffer_size 4k;
ssl_session_cache shared:SSL:10m;
gzip off;
```

Add Strict Transport Security headers

```bash
add_header Strict-Transport-Security "max-age=31536000; includeSubdomains";
```

- I am only enabling the following methods on HTTPS requests.

```bash
if ( $request\_method !~ ^(POST|PUT|PATCH|GET|HEAD|DELETE)$ ) {
return 405;
}
```

- Whilst implementing webhooks, I noted that URL based tokens are visible to users both rw/ro, to the pact-broker, so we are blocking access to the `/webhooks` url. This will also block `/webhooks/**`
- This shows how you can provide granular control of traffic in nginx, you could allow POST's only with an if statement.

```bash
error_page 418 = @blockAccess;

location /webhooks {
return 418;
}
location @blockAccess {
deny all;
}
```

The following block is used to proxy all requests recieved through nginx, to the pact broker.

- `proxy_set_headers` are used to ensure the redirect urls are correct in the HAL browser and additionaly enforce our secure headers.
- `proxy_hide_headers` will avoid leaking details of our pact_broker & passenger version.
- `proxy_pass` will send our requests recieved on nginx through to the broker.

```bash
location {

# Setting headers for redirects

proxy_set_header Host $host;
proxy_set_header X-Forwarded-Scheme "https";
proxy_set_header X-Forwarded-Port "443";
proxy_set_header X-Forwarded-Ssl "on";
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header Strict-Transport-Security "max-age=31536000; includeSubdomains";
proxy_set_header X-XSS-Protection "1; mode=block";
proxy_set_header X-Frame-Options DENY;
proxy_set_header X-Content-Type-Options nosniff;

# Hide return headers to avoid leaking implementation details

proxy_hide_header X-Powered-By;
proxy_hide_header X-Pact-Broker-Version;

# Perform the proxy pass to our site

proxy_pass http://broker:80;
}
```

## Get to know your docker-compose file

Each docker container is connected by a specified network

```bash
networks:

- docker-network
```

Standard postgres configuration.

```bash
postgres:
image: postgres
healthcheck:
test: psql postgres --command "select 1" -U postgres
ports:

- "5432:5432"
  environment:
  POSTGRES_USER: postgres
  POSTGRES_PASSWORD: password
  POSTGRES_DB: postgres
  networks:
- docker-network
```

The pact broker configuration with basic auth enabled.

- Variables stored in the `.env` file  
   are read by `docker-compose` on starting the containers
- Read into the `docker-compose` file  
   with variables prefixed with `$`
- You can add additional supported pact parameters, either directly in here, on in your `env` file.

```yml
broker_app:
container_name: 'pact-broker'
image: dius/pact-broker:latest
links:

- postgres
  environment:
  PACT_BROKER_DATABASE_USERNAME: $PACT_BROKER_DATABASE_USERNAME
  PACT_BROKER_DATABASE_PASSWORD: $PACT_BROKER_DATABASE_PASSWORD
  PACT_BROKER_DATABASE_HOST: $PACT_BROKER_DATABASE_HOST
  PACT_BROKER_DATABASE_NAME: $PACT_BROKER_DATABASE_NAME
  PACT_BROKER_BASIC_AUTH_USERNAME: $PACT_BROKER_BASIC_AUTH_USERNAME
  PACT_BROKER_BASIC_AUTH_PASSWORD: $PACT_BROKER_BASIC_AUTH_PASSWORD
  PACT_BROKER_BASIC_AUTH_READ_ONLY_USERNAME: $PACT_BROKER_BASIC_AUTH_READ_ONLY_USERNAME
  PACT_BROKER_BASIC_AUTH_READ_ONLY_PASSWORD: $PACT_BROKER_BASIC_AUTH_READ_ONLY_PASSWORD
  PACT_BROKER_LOG_LEVEL: WARN
  networks:
- docker-network
```

The configuration for nginx.

- We link the pact broker container, called broker_app, but reference it as `broker` which is used as our `servername` in nginx configuration.
- The first volume link loads in our `nginx.conf` file
- The next three volumes point at the `out` directory of lets-encrypt.
- The last volume will load in our example site we used for certification, it will be used for renewing our cerificates, which we will touch on after running our example.

```yml
nginx:
container_name: 'pact-nginx'
image: nginx:alpine
links:

- broker_app:broker
  volumes:
- ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
- ./letsencrypt/out/etc/letsencrypt/live//fullchain.pem:/etc/nginx/ssl/certs/fullchain.pem
- ./letsencrypt/out/etc/letsencrypt/live//privkey.pem:/etc/nginx/ssl/certs/privkey.pem
- ./letsencrypt/out/etc/letsencrypt/live//chain.pem:/etc/nginx/ssl/certs/chain.pem
- ./letsencrypt/dhparam/dhparams.pem:/etc/nginx/ssl/dhparam/dhparams.pem
- ./letsencrypt/out/renewal:/data/letsencrypt
  ports:
- "80:80"
- "8443:443"
  networks:
- docker-network
```

## Running our example

If you have not already generated your certificates, please do so now

1. Change into the `lets-encrypt` folder
2. Run `docker-compose up -d`. This will load up a single page application that lets-encrypt can read from, in order to verify that the domain is owned by you.
3. Run `./makecertsstaging.sh` - This will generate sample certificates for you, in `lets-encrypt/out`
4. Run `./makecertsinfostaging.sh` - This will provide information about the generated certificates for you.
5. If all the above steps ran ok, we can safely remove the `out` dir in `lets-encrypt/out` to remove our staged certificates.
6. Run `./makecerts.sh` - This will generate your signed certificates for you, in `lets-encrypt/out`
7. Run `./makecertsinfolive.sh` - This will provide information about the generated certificates for you.

We can now run our secure broker

1. Modify the `docker-compose.yml` file as required.
2. Run `docker-compose up` to get a running Pact Broker and a clean Postgres database

## Testing your setup

```bash
curl -v http://localhost

# This will redirect to https

curl -v http://localhost/matrix

# This will redirect to https root, not matrix

curl -v https://localhost/matrix

# This will redirect to https matrix page

# Note we don't provide the flag -k (insecure) as the website is certified

curl -v http://localhost/webhooks
curl -v https://localhost/webhooks

# This will return a 418 error

```

## Renewing your certificates

We generated certificates with LetsEncrypt, however they will expire after 3 months. We have aimed to minimised disruption by incorporating the renewal process into our configuration, so we will just need to run a script to generate them and bounce our app.

1. Ensure you are in the root folder, in our example the `pact-broker` folder
2. Run `./renewcerts_staging.sh` - This will run a do a dry run of the renewal process, or inform you that you don't need to generate one yet.
3. Run `./renewcerts.sh` - This will run the renewal process and generate you new certicates and restart your docker instance

Certificates will be output to `pact-broker/letsencrypt/out/etc/letsencrypt/live//`

Note, the folder is the same as our old certificates, so no change to our docker-compose file. This is because this location is actually sym-linked, and the actual certificates live in the `archive` folder.

## Replace the dockerised postgres DB with a proper instance

You will need to make some minor changes to utilise a non-dockerised Postgres instance.

Update the following environment variables in your `.env` file

```bash
PACT_BROKER_DATABASE_USERNAME=postgres
PACT_BROKER_DATABASE_PASSWORD=postgres
PACT_BROKER_DATABASE_HOST=postgres
PACT_BROKER_DATABASE_NAME=postgres
```

and comment out, or remove the following lines from your `docker-compose.yml`

```yml
# postgres:
# image: postgres
# healthcheck:
# test: psql postgres --command "select 1" -U postgres
# ports:
# - "5432:5432"
# environment:
# POSTGRES_USER: postgres
# POSTGRES_PASSWORD: password
# POSTGRES_DB: postgres

broker_app:
image: dius/pact-broker
links:
# - postgres
```

## General Pact Broker configuration and usage

Documentation for the Pact Broker application itself can be found in the Pact Broker [Wiki](https://github.com/pact-foundation/pact_broker/wiki)

## Troubleshooting

See the [Troubleshooting](https://github.com/DiUS/pact_broker-docker/wiki/Troubleshooting) page on the wiki.
