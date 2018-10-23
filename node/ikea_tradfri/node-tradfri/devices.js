const tradfri = require('node-tradfri').create({
    coapClientPath: 'coap-client',
    identity: 'IDENTITY',
    preSharedKey: process.env.IDENTITY,
    hubIpAddress: process.env.IP_ADDRESS
})

tradfri.getDevices()
    .then(console.debug)
    .catch(console.error)
