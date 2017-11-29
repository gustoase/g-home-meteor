FlowRouter.route('/', {
    name: 'main',
    action() {
        BlazeLayout.render('app_body', {main: 'ui_start_page'});
    }
});

FlowRouter.route('/module/list', {
    name: 'module.list',
    action() {
        BlazeLayout.render('app_body', {main: 'ui_module_client_list'});
    }
});


/*************** Admin parts ****************/


FlowRouter.route('/admin/module/list', {
    name: 'admin.module.list',
    action() {
        BlazeLayout.render('app_body', {main: 'ui_module_admin_list'});
    }
});

FlowRouter.route('/admin/module/add', {
    name: 'admin.module.add',
    action() {
        BlazeLayout.render('app_body', {main: 'ui_module_admin_new_module'});
    }
});

FlowRouter.route('/admin/module/edit/:_id', {
    name: 'admin.module.edit',
    action(params) {
        BlazeLayout.render('app_body', {main: 'ui_module_admin_edit_module'});
    }
});