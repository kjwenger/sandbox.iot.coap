const debug = require('debug')('ikea:tradfri:get_information')
const coap = require('node-coap-client').CoapClient

const hostname = `coaps://${process.env.IP_ADDRESS}:5684`
debug('hostname:', hostname)
coap.setSecurityParams(hostname, {
    psk: {
        IDENTITY: process.env.IDENTITY
    }
})
const bulb = process.argv[1] || 0
const state = process.argv[2] || 0
const address = 65537 + bulb

const target = `coaps://${process.env.IP_ADDRESS}:5684/15001/${address}`
debug('target:', target)
const payload = Buffer.from(`{ "3311": [ { "5850": ${state} } ] }`,'utf8');
coap.request(target, 'put', { '3311': [ { '5850': state } ] })
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