const debug = require('debug')('ikea:tradfri:get_information')
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
const level = parseInt(process.argv[3]) || 0
debug('level:', level)
const address = 65537 + bulb
debug('address:', address)

const target = `coaps://${process.env.IP_ADDRESS}:5684/15001/${address}`
debug('target:', target)
const object = { '3311': [ { '5851': level } ] }
debug('object:', target)
const json = JSON.stringify(object, null, 2)
debug('json:', json)
const payload = Buffer.from(json, 'utf8');
debug('payload:', payload)
coap.request(target, 'put', payload)
    .then(result => {
        const code = result.code.major * 100 + result.code.minor
        console.debug('code:', code)
        console.debug('format:', result.format)
        console.debug('payload:', result.payload.toString('utf8'))
        process.exit(result.code.major - 2 ? code : 0)
    })
    .catch(err => {
        console.error(err)
        throw error
    })