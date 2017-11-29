import { Template } from 'meteor/templating';

Template.ui_sidebar_left.helpers({
    activeListClass(route) {
        return ActiveRoute.name(route) && 'active';
    }
});

Template.registerHelper('eq', function(a, b) {
    return a === b;
});