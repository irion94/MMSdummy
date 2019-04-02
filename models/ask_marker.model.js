let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const AskMarkerSchema = new Schema(
    {
        id: String,
        date: Date,
        name: String,
        type: String,
        coordinates: {}
    }
);
const AskMarker = mongoose.model('AskMarker', AskMarkerSchema);
module.exports = AskMarker;
module.exports.Schema = AskMarkerSchema;
