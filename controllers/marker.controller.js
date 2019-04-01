const Marker = require('../models/marker.model');
const Recognized = require('../models/recognized.model');
const moment = require('moment');
const faker = require('faker');

async function worker(){
    const deletionDate = moment().minute(new Date().getMinutes()-1).format();
    await Marker.find({date: {$lt:deletionDate}, recognized: true});
}

async function worker2(object){
    return {...object, recognized: faker.random.number(10)}
}


setInterval(worker, 2000);


module.exports.create = async function (req, res, next) {
    const param = req.body;
    const rec = await worker2(param);
    console.log(rec);
    const marker = new Recognized(rec);
    const save = await marker.save();
    if(save){
        const deletionDate = moment().minute(new Date().getMinutes()-5).format();
        const markers = await Recognized.find({date: {$gt:deletionDate}, recognized: {$gt: -1}});
        return res.status(201).json(markers)
    }
    return res.status(401)
};