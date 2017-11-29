import { Module, ModuleType } from '../../../../Model/Module.js';


/**** список модулей ***/
Template.ui_module_admin_list.helpers({
    modules() {
        return Module.find({});
    },
});

Template.ui_module_admin_list_tr.helpers({
    moduleType() {
        return ModuleType.findOne(this.module);
    }
});

Template.ui_module_admin_list_tr.events({
    'click .delete-module'(event) {
        if (!confirm('Точно удалить?')) {
            return;
        }

        Meteor.call('admin.module.delete', this._id, function (err, res) {
            if (err) {
                alert(err.message);
            }
        })
    },
});


/**** Добавление нового модуля ***/
Template.ui_module_admin_new_module.events({
    'submit .new-module'(event) {
        event.preventDefault();
        const data = $(event.target).serializeArray();

        let module_data = {};
        $.each(data, function() {
            if (this.name == 'port') {
                this.value = this.value*1;
            }
            module_data[this.name] = this.value;
        });

        Meteor.call('admin.module.add', module_data, function (err, res) {
            if (err) {
                alert(err.message);
            }

            if (res === true) {
                FlowRouter.go('admin.module.list');
            }
        })
    },
});


Template.ui_module_admin_new_module.helpers({
    module_types() {
        return ModuleType.find({});
    },
});


/**** Редактирование модуля ***/
Template.ui_module_admin_edit_module.helpers({
    module_types() {
        return ModuleType.find({});
    },
    module() {
        const _id = FlowRouter.getParam('_id');

        if (!_id) {
            FlowRouter.go('admin.module.list');
        }

        return Module.findOne({_id: _id});
    }
});

Template.ui_module_admin_edit_module.events({
    'submit .edit-module'(event) {
        event.preventDefault();
        const data = $(event.target).serializeArray();

        let module_data = {};
        $.each(data, function() {
            if (this.name == 'port') {
                this.value = this.value*1;
            }
            module_data[this.name] = this.value;
        });

        Meteor.call('admin.module.edit', module_data, function (err, res) {
            if (err) {
                alert(err.message);
            }

            if (res === true) {
                FlowRouter.go('admin.module.list');
            }
        })
    },
});
