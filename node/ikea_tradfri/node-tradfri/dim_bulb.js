const debug = require('debug')('ikea:tradfri:switch_bulb')
const tradfri = require('node-tradfri').create({
    coapClientPath: 'coap-client',
    identity: 'IDENTITY',
    preSharedKey: process.env.IDENTITY,
    hubIpAddress: process.env.IP_ADDRESS
})
const bulb = parseInt(process.argv[2]) || 0
debug('bulb:', bulb)
const brightness = parseInt(process.argv[3]) || 0
debug('brightness:', brightness)
const address = 65537 + bulb
debug('address:', address)

tradfri.setDeviceState(address, {
    brightness: brightness
})
    .then(console.debug)
    .catch(console.error)
