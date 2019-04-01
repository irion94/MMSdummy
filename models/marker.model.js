let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const MarkerSchema = new Schema(
    {
        id: String,
        date: Date,
        name: String,
        color: String,
        photo: [String],
        coordinates: {}
    }
);
const Marker = mongoose.model('Marker', MarkerSchema);
module.exports = Marker;
module.exports.Schema = MarkerSchema;
