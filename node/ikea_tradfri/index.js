const { discoverGateway, TradfriClient, Accessory, AccessoryTypes } = require('node-tradfri-client')

discoverGateway()
    .then(result => {
        console.debug('result:', result)
        const tradfri = new TradfriClient(result.name)
        tradfri.authenticate('LYckaR0uxUow5fD7')
            .then(authentication => {
                console.debug('authentication:', authentication)
                const {identity, psk} = authentication
            })
    })
    .catch(console.error)
