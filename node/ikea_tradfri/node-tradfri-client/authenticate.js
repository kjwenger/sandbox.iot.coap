const { TradfriClient } = require('node-tradfri-client')

const tradfri = new TradfriClient(process.env.CLIENT_ID)
tradfri.authenticate(process.env.IDENTITY)
    .then(authentication => {
        console.debug('authentication:', authentication)
    })
