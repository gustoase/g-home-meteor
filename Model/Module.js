import { Mongo } from 'meteor/mongo';

export const Module = new Mongo.Collection('Module');
export const ModuleType = new Mongo.Collection('ModuleType');


if (Meteor.isServer) {
    Meteor.startup(() => {
        if (ModuleType.find().count() === 0) {
            ModuleType.insert({ name: 'Relay' });
            ModuleType.insert({ name: 'Servo' });
        }
    });
}

export const ModuleSchema = new SimpleSchema({
    title: {type: String, min: 3},
    module: {type: String, min: 2},
    port: {type: Number, min: 1}
});