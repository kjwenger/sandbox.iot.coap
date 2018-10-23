const debug = require('debug')('ikea:tradfri:get_information')
const coap = require('node-coap-client').CoapClient

const hostname = `coaps://${process.env.IP_ADDRESS}:5684`
debug('hostname:', hostname)
coap.setSecurityParams(hostname, {
    psk: {
        IDENTITY: process.env.IDENTITY
    }
})
const target = `coaps://${process.env.IP_ADDRESS}:5684/15011/15012`
debug('target:', target)
coap.request(target, 'get')
    .then(result => {
        const code = result.code.major * 100 + result.code.minor
        console.debug('code:', code)
        console.debug('format:', result.format)
        console.debug('payload:', JSON.stringify(JSON.parse(result.payload.toString()), null, 2))
        process.exit(result.code.major - 2 ? code : 0)
    })
    .catch(err => {
        console.error(err)
        throw error
    })