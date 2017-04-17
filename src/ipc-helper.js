const {Disposable} = require('event-kit')



module.exports = {
    on(emitter, eventName, callback) {
        emitter.on(eventName, callback)
        return new Disposable(function () {
            emitter.removeListener(eventName, callback)
        })
    },

    callback
}