let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const RecognizedSchema = new Schema(
    {
        id: String,
        date: Date,
        name: String,
        color: String,
        recognized: Number,
        coordinates: {}
    }
);
const Recognized = mongoose.model('Recognized', RecognizedSchema);
module.exports = Recognized;
module.exports.Schema = RecognizedSchema;
