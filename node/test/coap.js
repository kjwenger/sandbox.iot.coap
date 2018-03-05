/* global xdescribe */
const debug = require('debug')('test-coap')
const {describe, it} = require('mocha')
const chai = require('chai')
const expect = chai.expect
const coap = require('coap')
const cbor = require('cbor')
const stringstream = require('stringstream')
const http = require('http')

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

        req.on('error', (err) => {
          console.error(err.message)
          done(err)
        })
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

        req.on('error', (err) => {
          console.error(err.message)
          done(err)
        })
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
    it('should communicate temperature as CBOR over IPv6', (done) => {
      const object = {temperature: 27.3}
      const server = coap.createServer({ type: 'udp6' })
      server.on('request', (req, res) => {
        const encoded = cbor.encode(object)
        res.end(encoded)
      })

      server.listen(() => {
        const req = coap.request('coap://[::1]/temperature')

        req.on('error', (err) => {
          console.error(err.message)
          done(err)
        })
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
  xdescribe('http client and coap server through proxy', () => {
    it('should communicate temperature as CBOR', (done) => {
      const object = {temperature: 19.8}
      debug('object.temperature:', object.temperature)

      const server = coap.createServer()
      debug('server._options:', server._options)

      const proxy = coap.createServer({proxy: true}, (req, res) => {
        debug('coap.createServer() req:', req)
        // const parsed = JSON.parse(req.payload)
        // debug('coap.createServer() parsed:', parsed)
        // const encoded = cbor.encode(parsed)
        // debug('coap.createServer() encoded:', encoded)
        // res.end(encoded)
        res.end(req.payload)
      })
      debug('proxy._options:', proxy._options)

      server.on('request', (req, res) => {
        debug(`server.on('request') req.url:`, req.url)
        const encoded = cbor.encode(object)
        debug(`server.on('request') encoded:`, encoded)
        res.end(encoded)
      })

      server.listen(5683, '0.0.0.0', (err1) => {
        debug('server.listen() err1:', err1)

        proxy.listen(8683, '0.0.0.0', (err2) => {
          debug('server.listen() proxy.listen() err2:', err2)

          const req = coap.request({
            host: 'localhost',
            port: 8683,
            path: '/temperature',
            agent: false,
            proxyUri: 'coap://localhost:5683'
          })
          debug('server.listen() proxy.listen() req.output:', req.output)

          req.on('response', (res) => {
            debug(`server.listen() proxy.listen() req.on('response') res:`, res)
          })
          req.end()

          // const req = http.get({
          //   host: 'localhost',
          //   port: 8683,
          //   agent: false,
          //   path: '/temperature'
          // }, (res) => {
          //   let string = ''
          //
          //   res.on('data', (chunk) => {
          //     string += chunk
          //   })
          //   res.on('end', () => {
          //     console.log(JSON.parse(string))
          //   })
          // })
          //
          // debug('server.listen() proxy.listen() req.output:', req.output)
          //
          // req.on('error', (err) => {
          //   console.error(err.message)
          //   proxy.close(() => {
          //     server.close(() => {
          //       done(err)
          //     })
          //   })
          // })
        })
      })
    })
  })
})
