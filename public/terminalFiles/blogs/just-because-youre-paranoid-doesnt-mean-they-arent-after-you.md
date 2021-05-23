---
title: "“Just because you're paranoid doesn't mean they aren't after you.”"
date: "2019-03-14"
---

#### Some simple command-line tricks borrowed from the land of devOps to help you analyse logs and gain useful insight.

I'm under attack! Or rather, my EC2 instance is. ( A virtual machine running Ubuntu, hosted in AWS )

It's not a mega worry for me, as it is just a sandbox for testing/development of home projects. However it is the perfect opportunity for me to demonstrate some techniques you can use to extract useful information from logs.

My virtual machine has been running for around 3 three months with port 22 which is used for ssh, left accessible publicly on the internet. The logs live in `/var/log`

We are going to use `ls` to list the contents of the directory & `cat` to output our file contents directly to the terminal.

$ ls /var/log/secure\*  
  secure             
  secure-20181230    
  secure-20190106    
  secure-20190307    
  secure-20190310  
  
$ cat /var/log/secure\*  
  
  Mar 10 03:40:27 ip-\*\*\*-\*\*-\*\*-\*\* sshd\[29874\]: Invalid user test from 189.63.115.134 port 56702  
\*\*\* MY SCREEN BUFFER INSTANTLY FILLED UP WITH STUFF LIKE THAT \*\*\*

Oh crap, I thought. Naughty, naughty h4x0rs.  
  
I knew there was alot, but not how many, so let's count how many failed login attempts we've had.  
  
`cat /var/log/secure*` output the content of each of the 5 files directly to the terminal (the `*` is a wildcard and will pattern match any files called `secure` with any suffix)

`|` this is called a pipe, it will allow you to pass the output of the command to the left of the pipe, as an input to the command to the right of the pipe.

`grep -e 'Invalid user'` This is a pattern matcher, it will look for every occurance of the words `Invalid user` and output the entire log line, so we can trim our search to only failed login attempts

`wc -l` this will count how many words in a document, but we are passing the `-l` flag which will count how many lines (a single line for each failed login attempt

$ cat /var/log/secure\*   
  Mar 10 03:40:27 ip-\*\*\*-\*\*--\*\*-\*\* sshd\[29874\]: reverse mapping checking getaddrinfo for bd3f7386.virtua.com.br \[189.63.115.134\] failed - POSSIBLE BREAK-IN ATTEMPT!  
  Mar 10 03:40:27 ip-\*\*\*-\*\*--\*\*-\*\* sshd\[29874\]: Invalid user test from 189.63.115.134 port 56702  
  Mar 10 03:40:27 ip-\*\*\*-\*\*--\*\*-\*\* sshd\[29874\]: input\_userauth\_request: invalid user test \[preauth\]  
  Mar 10 03:40:27 ip-\*\*\*-\*\*--\*\*-\*\* sshd\[29874\]: Received disconnect from 189.63.115.134 port 56702:11: Bye Bye \[preauth\]  
  Mar 10 03:40:27 ip-\*\*\*-\*\*--\*\*-\*\* sshd\[29874\]: Disconnected from 189.63.115.134 port 56702 \[preauth\]  
  
$ cat /var/log/secure\* | grep -e 'Invalid user'   
  Mar 10 03:39:35 ip-\*\*\*-\*\*--\*\*-\*\* sshd\[29842\]: Invalid user test from 185.20.197.116 port 59039  
  Mar 10 03:39:36 ip-\*\*\*-\*\*--\*\*-\*\* sshd\[29844\]: Invalid user admin from 14.139.127.91 port 41233  
  Mar 10 03:39:42 ip-\*\*\*-\*\*--\*\*-\*\* sshd\[29850\]: Invalid user ism from 94.132.46.32 port 37902  
  Mar 10 03:39:43 ip-\*\*\*-\*\*--\*\*-\*\* sshd\[29854\]: Invalid user admin from 219.142.28.206 port 39222  
  Mar 10 03:40:27 ip-\*\*\*-\*\*--\*\*-\*\* sshd\[29874\]: Invalid user test from 189.63.115.134 port 56702  
  
$ cat /var/log/secure\* | grep -e 'Invalid user' | wc -l   
  16288

Wow, 16,288 attempts.

We can a combination of 3 commands, to extract a piece of information from each log line and de-duplicate it, so we can find out how many different usernames/IP addresses & ports that they tried.

`awk '{print $8}'` This will print only the 8th word in each line which is the username in our case. The below example shows how the string is split.  

Mar 10 03:40:27 ip-\*\*\*-\*\*--\*\*-\*\* sshd\[29874\]: Invalid user test from 189.63.115.134 port 56702  
  
$1 = Mar   
$2 = 10   
$3 = 03:40:27   
$4 = ip-\*\*\*-\*\*--\*\*-\*\*  
$5 = sshd\[29874\]:   
$6 = Invalid   
$7 = user   
$8 = test   
$9 = from   
$10 = 189.63.115.134   
$11 = port   
$12 = 56702 

`sort` This will arrange our list in alphabetical order

`uniq` this will remove duplicates, but requires a pre-sorted list, which is why we run the output through `sort` first

$ cat /var/log/secure\* | grep -e 'Invalid user' | awk '{print $8}'   
 daniel  
 uftp  
 deploy  
 sammy  
 transfer  
 uftp  
 uftp  
 travelblog  
  
$ cat /var/log/secure\* | grep -e 'Invalid user' | awk '{print $8}' | sort   
 zo  
 zookeeper  
 zqsun  
 zule  
 zv  
 zwji  
 zxin10  
 zxin10  
 zxin10  
 zxin10  
  
$ cat /var/log/secure\* | grep -e 'Invalid user' | awk '{print $8}' | sort | uniq  
  
 zk  
 zly  
 zn  
 znc  
 zo  
 zookeeper  
 zqsun  
 zule  
 zv  
 zwji  
 zxin10  

After we have out sorted list, we can used `wc -l` again to count the lines. There were 2816 distinct user names, 5252 different IP's trying 11,300 different ports

$ cat /var/log/secure\* | grep -e 'Invalid user' | awk '{print $8}' | sort | uniq | wc -l  
  
2816  

$ cat /var/log/secure\* | grep -e 'Invalid user' | awk '{print $10}' | sort | uniq | wc -l  
  
5252  

$ cat /var/log/secure\* | grep -e 'Invalid user' | awk '{print $8}' | sort | uniq | wc -l  
  
11300  

Let's get some insight into the data, we can find out which were the most common usernames, how many times a particular IP address hit us, and which ports are most commonly hit.

`uniq -c` The `-c` flag will count the number of occurrences

`sort -nr` The `-nr` flag will sort the record in numerical order

`less` This will you to read the large output in your own time, rather than watch the matrix flash in front of your eyes.

$ cat /var/log/secure\* | grep -e 'Invalid user' | awk '{print $8}' | sort | uniq -c | sort -nr  
  
 894 admin  
 681 test  
 261 postgres  
 244 oracle  
 238 user  
 215 ubuntu  
 196 nagios  
 186 guest  
 182 ftpuser  
 131 deploy  
 116 pi  
 115 git  
 109 ubnt  
 104 teamspeak  
 103 support  
 100 mysql  
  95 minecraft  
  92 tomcat  

$ cat /var/log/secure\* | grep -e 'Invalid user' | awk '{print $10}' | sort | uniq -c | sort -nr  
  
 432 111.230.251.46  
 328 1.237.178.27  
 272 142.93.191.55  
 243 115.231.8.189  
 219 217.170.205.77  
 180 198.98.53.194  
 174 106.12.85.241  
 152 18.207.226.35  
 120 178.128.96.131  
 100 220.191.194.22

$ cat /var/log/secure\* | grep -e 'Invalid user' | awk '{print $12}' | sort | uniq -c | sort -nr  
  
   9 1920  
   7 54170  
   6 58932  
   6 56054  
   6 55524  
   6 53154  
   6 49414  
   6 48000  
   6 47278  
   6 44800  
   6 39266  
   6 37284
