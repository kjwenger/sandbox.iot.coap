const { discoverGateway } = require('node-tradfri-client')

try {
    discoverGateway()
        .then(console.debug)
        .catch(console.error)
} catch (err) {
    console.error(err)
}
