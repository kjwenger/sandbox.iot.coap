const debug = require('debug')('ikea:tradfri:get_information')
const coap = require('node-coap-client').CoapClient
const cbor = require('cbor')

const hostname = `coaps://${process.env.IP_ADDRESS}:5684`
debug('hostname:', hostname)
coap.setSecurityParams(hostname, {
    psk: {
        IDENTITY: process.env.IDENTITY
    }
})
const bulb = process.argv[2] || 0
debug('bulb:', bulb)
const state = process.argv[3] || 0
debug('state:', state)
const address = 65537 + bulb
debug('address:', address)

const target = `coaps://${process.env.IP_ADDRESS}:5684/15001/${address}`
debug('target:', target)
const object = { '3311': [ { '5850': state } ] }
const json = JSON.stringify(object)
const payload = Buffer.from(json,'utf8');
const encoded = cbor.encode(object)
coap.request(target, 'put', encoded)
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