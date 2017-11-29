import {ModuleSchema, Module} from '../../Model/Module.js';

Meteor.methods({
    'admin.module.add'({ title, module, port }) {
        ModuleSchema.validate({ title, module, port });

        Module.insert({
            title: title,
            module: module,
            port: port,
        });

        return true;
    }
});

Meteor.methods({
    'admin.module.edit'({_id, title, module, port }) {
        ModuleSchema.validate({ title, module, port });

        Module.update({ _id: _id }, {
            title: title,
            module: module,
            port: port,
        });

        return true;
    }
});

Meteor.methods({
    'admin.module.delete'(_id) {

        if (Module.find({_id: _id}).count() === 0) {
            throw new Meteor.Error(`Not found module id:${_id}`);
        }

        Module.remove({_id: _id});

        return true;
    }
});