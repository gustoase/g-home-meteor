var mongoose = require('mongoose');
var Client = require('./Client');
var Schema = mongoose.Schema;

var Tasks = new Schema({
    _id : Schema.Types.ObjectId,
    text: String,
    // port: Number,
    // module: String, //название модуля johny-five
    // type_pin: { type: String, default: 'digital' }, // тип пина, analog или digital
    // date_update: { type: Date, default: Date.now },
    // is_enabled: { type: Boolean, default: true },
    // value: { type: Schema.Types.Mixed, default: {} } // последние данные по датчикам

    // living:  Boolean,
    // updated: { type: Date, default: Date.now },
    // age:     { type: Number, min: 18, max: 65 },
    // mixed:   Schema.Types.Mixed,
    // _someId: Schema.Types.ObjectId,
    // array:      [],
    // ofString:   [String],
    // ofNumber:   [Number],
    // ofDates:    [Date],
    // ofBuffer:   [Buffer],
    // ofBoolean:  [Boolean],
    // ofMixed:    [Schema.Types.Mixed],
    // ofObjectId: [Schema.Types.ObjectId],
    // nested: {
    //     stuff: { type: String, lowercase: true, trim: true }
    // }
});

module.exports.Tasks = Client.model('Tasks', Tasks);