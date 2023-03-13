const {Schema, model} = require('mongoose')

const Geozone = new Schema({
    name: {type: String, unique: true, required: true},
    location: new Schema({
        type: {type: String, required: true},
        coordinates: [[[Number]]]
    })
})

module.exports = model('geozone', Geozone)