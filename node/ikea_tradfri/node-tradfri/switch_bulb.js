const debug = require('debug')('ikea:tradfri:switch_bulb')
const tradfri = require('node-tradfri').create({
    coapClientPath: 'coap-client',
    identity: 'IDENTITY',
    preSharedKey: process.env.IDENTITY,
    hubIpAddress: process.env.IP_ADDRESS
})
const bulb = process.argv[2] || 0
debug('bulb:', bulb)
const state = process.argv[3] || 'off'
debug('state:', state)
const address = 65537 + bulb
debug('address:', address)

tradfri.setDeviceState(address, {
    state: state
})
    .then(console.debug)
    .catch(console.error)
