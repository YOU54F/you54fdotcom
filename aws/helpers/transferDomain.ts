import { Route53Domains } from 'aws-sdk'
var params = {
  AccountId: 'acc_to_transfer_to',
  DomainName: 'you54f.co.uk',
}
const r53 = new Route53Domains()
r53.transferDomainToAnotherAwsAccount(params, function (err, data) {
  if (err) console.log(err, err.stack)
  else console.log(data)
})
