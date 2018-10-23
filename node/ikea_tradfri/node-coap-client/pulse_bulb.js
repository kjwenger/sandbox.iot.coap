const debug = require('debug')('ikea:tradfri:pulse_bulb')
const coap = require('node-coap-client').CoapClient

const hostname = `coaps://${process.env.IP_ADDRESS}:5684`
debug('hostname:', hostname)
coap.setSecurityParams(hostname, {
    psk: {
        IDENTITY: process.env.IDENTITY
    }
})
const bulb = parseInt(process.argv[2]) || 0
debug('bulb:', bulb)
const milliseconds = parseInt(process.argv[3]) || 1000
debug('milliseconds:', milliseconds)
const address = 65537 + bulb
debug('address:', address)
let brightness = 0
let increment = 1

const target = `coaps://${process.env.IP_ADDRESS}:5684/15001/${address}`
debug('target:', target)

const shift = () => {
    brightness += increment
    debug('brightness:', brightness)
    if (brightness >= 255) increment = -1
    else if (brightness <= 0) increment = 1
    debug('increment:', increment)
    const object = { '3311': [ { '5851': brightness } ] }
    debug('object:', target)
    const json = JSON.stringify(object, null, 2)
    debug('json:', json)
    const payload = Buffer.from(json, 'utf8');
    debug('payload:', payload)
    return coap.request(target, 'put', payload)
        .catch(console.error)
}
const loop = () => {
    shift().then(() => setTimeout(loop, milliseconds))
}

loop()