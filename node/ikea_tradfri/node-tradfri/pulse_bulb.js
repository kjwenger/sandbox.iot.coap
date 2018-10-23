const debug = require('debug')('ikea:tradfri:switch_bulb')
const tradfri = require('node-tradfri').create({
    coapClientPath: 'coap-client',
    identity: 'IDENTITY',
    preSharedKey: process.env.IDENTITY,
    hubIpAddress: process.env.IP_ADDRESS
})
const bulb = parseInt(process.argv[2]) || 0
debug('bulb:', bulb)
const milliseconds = parseInt(process.argv[3]) || 1000
debug('milliseconds:', milliseconds)
const address = 65537 + bulb
debug('address:', address)
let brightness = 0
let increment = 1

const shift = () => {
    brightness += increment
    debug('brightness:', brightness)
    if (brightness >= 255) increment = -1
    else if (brightness <= 0) increment = 1
    debug('increment:', increment)
    return tradfri.setDeviceState(address, {
        state: 'on',
        brightness: brightness
    })
        .catch(console.error)
}
const loop = () => {
    shift().then(() => setTimeout(loop, milliseconds))
}

loop()