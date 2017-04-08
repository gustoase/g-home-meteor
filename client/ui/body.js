import { Template } from 'meteor/templating';

import { Module } from '../../Model/Module.js';

Template.module_list.helpers({
    modules() {
        return Module.find({});
    },
});
