import Tabular from 'meteor/aldeed:tabular';
import { Module } from '../Model/Module.js';
import { Template } from 'meteor/templating';

TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.Module = new Tabular.Table({
    name: "Module",
    collection: Module,
    columns: [
        {data: "_id", title: "ID"},
        {data: "title", title: "Название"},
        {data: "module", title: "Модуль"},
        {data: "port", title: "Порт"}
    ]
});
