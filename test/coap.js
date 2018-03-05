const {describe, it} = require('mocha')
const chai = require('chai')
const expect = chai.expect
const coap = require('coap')
const cbor = require('cbor')
const stringstream = require('stringstream')

describe('CoAP', () => {
  describe('client and server', () => {
    it('should communicate "Hello, world!" as string', (done) => {
      const server = coap.createServer()
      server.on('request', (req, res) => {
        res.end('Hello, ' + req.url.split('/')[1] + '!')
      })

      // the default CoAP port is 5683
      server.listen(() => {
        const req = coap.request('coap://localhost/world')

        req.on('response', (res) => {
          res.on('end', () => {
            done()
          })

          let string
          const stream = res.pipe(stringstream('utf8'))

          stream.on('data', (data) => { string += data })
          stream.on('end', () => {
            expect(string).to.eql('Hello, world!')
          })

          server.close()
        })

        req.end()
      })
    })
    it('should communicate temperature as CBOR', (done) => {
      const object = {temperature: 27.3}
      const server = coap.createServer()
      server.on('request', (req, res) => {
        const encoded = cbor.encode(object)
        res.end(encoded)
      })

      server.listen(() => {
        const req = coap.request('coap://localhost/temperature')

        req.on('response', (res) => {
          res.on('end', () => {
            done()
          })

          const decoder = new cbor.Decoder()
          decoder.on('data', (decoded) => {
            expect(decoded).to.eql(object)
            server.close()
          })

          res.pipe(decoder)
        })

        req.end()
      })
    })
  })
})
