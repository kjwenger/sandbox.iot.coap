const { TradfriClient, Accessory, AccessoryTypes } = require('node-tradfri-client')

const tradfri = new TradfriClient(process.env.CLIENT_ID)
tradfri.authenticate('LYckaR0uxUow5fD7')
    .then(authentication => {
        console.debug('authentication:', authentication)
        const {identity, psk} = authentication
    })
