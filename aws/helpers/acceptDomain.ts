import { Route53Domains } from 'aws-sdk'
var params = {
  Password: 'xyz',
  DomainName: 'you54f.co.uk',
}
const r53 = new Route53Domains()
r53.acceptDomainTransferFromAnotherAwsAccount(params, function (err, data) {
  if (err) console.log(err, err.stack)
  else console.log(data)
})
