const Marker = require('../models/marker.model');
const AskMarker = require('../models/ask_marker.model');
const moment = require('moment');
const faker = require('faker');

async function worker2(object) {
    return {...object, recognized: faker.random.number(10)}
}

function time_interval(minutes) {
    return moment().minute(new Date().getMinutes() - minutes).format();
}

module.exports.createAsk = async function (req, res) {
    const param = req.body;
    const save = await new AskMarker(param).save();
    if(save){
        const askMarkers = await AskMarker.find({date: {$gt: time_interval(2)}});
        res.status(201).json(askMarkers)
    }
    res.status(401)
}

module.exports.create = async function (req, res, next) {
    const param = req.body;
    const rec = await worker2(param);
    const save = await new Marker(rec).save();
    if (save) {
        const markers = await Marker
            .find({date: {$gt: time_interval(5)}, recognized: {$gt: -1}})
            .select("-photo");
        setTimeout(() => res.status(201).json(markers), 5000) //simulate delay
    }
    return res.status(401)
};


module.exports.get = async function (req, res) {
    const markers = await Marker
        .find({date: {$gt: time_interval(5)}, recognized: {$gt: -1}})
        .select("-photo");
    const askMarkers = await AskMarker
        .find({date: {$gt: time_interval(2)}});
    if (markers && askMarkers) return res.status(201).json({markers: markers, askMarkers: askMarkers});
    return res.status(401).json({status: "Db error"})
}