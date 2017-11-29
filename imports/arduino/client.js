var five = require("johnny-five");
var create = require('./helper').create;
// var Tasks = require('./mongo/TasksSchema').Tasks;
// var MongoWatch = require('mongo-watch');


// var board = new five.Board();
//
// board.on("ready", function() {
//
//     var r1 = new five.Relay(48);
//     var r2 = new five.Relay(50);
//     var r3 = new five.Relay(52);
//
//     var relays = new five.Relays([r1, r2, r3]);
//
//     // Close all relays independently
//     r1.close();
//     r2.close();
//     r3.close();
//
//     setTimeout(function () {
//         // Open all relays.
//         relays.open();
//     }, 1000);
// });

// Tasks.find({}, function (err, docs) {
//     console.log(docs);
// });
//
// var watcher = new MongoWatch({
//     format: 'pretty',
//     db: 'meteor',
//     port: 3001,
// });
// watcher.debug = console.log;
//
// watcher.watch('meteor.tasks', function (event) {
//    console.log('event-----' + event.operation, event.data);
// });

// module.exports = {
//     /**
//      * Установить системные уведомления
//      * @param system_events
//      */
//     setSystemEvents: function (system_events) {
//         this.system_events = system_events;
//         return this;
//     },
//
//     /**
//      * Установить ардуино
//      * @param board
//      */
//     setBoard: function (board) {
//         this.board = board;
//         return this;
//     },
//
//     init: function () {
//         this.system_events = null;
//         this.board = null;
//         this.cache_modules = [];
//         this.instance_modules = {};
//         return this;
//     },
//
//     /**
//      * Получить зарегистированные модули в системе
//      * @returns {{}|*}
//      */
//     getInstanceModules: function () {
//         return this.instance_modules;
//     },
//
//     /**
//      * Добавить в систему новый модуль
//      * @param name
//      * @param port
//      * @param new_module
//      * @param type_pin
//      * @param is_enabled
//      * @param default_value
//      * @param callback
//      */
//     addNewModule: function (name, port, new_module, type_pin, is_enabled, default_value = {}, callback) {
//         var self = this;
//
//         Module.find({port: port}, function (err, module) {
//             if (module.length) {
//                 var exist_module = module.pop();
//                 var text_err = 'Не удалось добавить модуль порт под номером '+port+' занят модулем - ' + exist_module.name;
//                 self.system_events.emit(
//                     controller.SYSTEM_EVENT_NEW_MODULE_ERROR_ADDED,
//                     {text: text_err, detail: err}
//                 );
//
//                 callback(text_err);
//             } else {
//                 Module.create({
//                     name: name,
//                     port: port,
//                     module: new_module,
//                     _id: new mongoose.Types.ObjectId,
//                     type_pin: type_pin,
//                     is_enabled: is_enabled,
//                     value: default_value
//                 }, function (err, new_module) {
//                     if (err) {
//                         self.system_events.emit(controller.SYSTEM_EVENT_NEW_MODULE_ERROR_ADDED, {text: 'Не удалось добавить модуль', detail: err});
//                     }
//
//                     self.cache_modules.push(new_module);
//                     self.system_events.emit(controller.SYSTEM_EVENT_NEW_MODULE_SUCCESS_ADDED, new_module);
//                     callback(null, new_module);
//                 });
//             }
//         });
//     },
//
//     /**
//      * Редактировать модуль
//      * @param id
//      * @param name
//      * @param port
//      * @param new_module
//      * @param type_pin
//      * @param is_enabled
//      * @param default_value
//      * @param callback
//      */
//     editModule: function (id, name, port, new_module, type_pin, is_enabled, default_value = {}, callback) {
//         var self = this;
//
//         var promise = Module.findOne({_id: id}).exec();
//
//         promise.then(function (module) {
//             module.name = name;
//             module.port = port;
//             module.module = new_module;
//             module.type_pin = type_pin;
//             module.is_enabled = is_enabled;
//             module.value = default_value;
//
//             return module.save();
//         })
//             .then(function (module) {
//                 self.reloadModules();
//                 callback(null, module);
//             })
//             .catch(function (err) {
//                 callback(err);
//             });
//     },
//
//     /**
//      * Загрузить в систему все модули найденные в БД
//      */
//     loadModules: function () {
//         var self = this;
//         Module.find({}, function (err, modules) {
//             if (err || modules.length == 0) {
//                 self.system_events.emit(controller.SYSTEM_EVENT_MODULE_ERROR_LOADED, {
//                     text: 'Зарегистрированные модули не найдены',
//                     details: err
//                 });
//
//                 return;
//             }
//
//             var count_registered_modules = 0;
//             modules.forEach(function(module) {
//                 self.cache_modules.push(module);
//                 if (module.is_enabled) {
//                     self.registerModule(module);
//                     count_registered_modules++;
//                 }
//             });
//
//             self.system_events.emit(controller.SYSTEM_EVENT_MODULE_SUCCESS_LOADED, {
//                 text: 'Все модули арегистрированны ('+count_registered_modules+')'
//             });
//         });
//     },
//
//     /**
//      * Зарегистрировать модуль в системе, для дальнейшей работы с ним клиентам
//      *
//      * @param {Module} module
//      */
//     registerModule: function (module) {
//         var five_module = create(five[module.module], module.port); // new five.Relay(9);
//         var module_item = {};
//         module_item[module.module] = five_module;
//         this.board.repl.inject(module_item);
//
//         this.instance_modules[module._id] = five_module;
//     },
//
//     /**
//      * Найти все модули в бд
//      * @returns {Array}
//      */
//     findAllModules: function () {
//         // берем из закешированного массива модулей, чтобы не делать лишний запрос
//         return this.cache_modules;
//     },
//
//     /**
//      * Найти модуль по ID
//      * @param id
//      * @param callback
//      */
//     findModuleById: function (id, callback) {
//         Module.findOne({_id: id}, function (err, module) {
//             callback(err, module);
//         });
//     },
//
//     /**
//      * Удалить модуль
//      * @param id
//      */
//     removeModule: function (id) {
//         var self = this;
//         var promise = Module.find({ _id: id }).remove().exec();
//         promise.then(function () {
//             self.reloadModules();
//         });
//     },
//
//     reloadModules: function () {
//         this.system_events.emit(controller.SYSTEM_EVENT_RELOAD);
//         this.board.repl.close();
//     },
//
//     /**
//      * Следим за разыными событиями
//      */
//     bindsEvents: function () {
//         var self = this;
//         // следим за новым модулем
//         self.system_events.on(controller.SYSTEM_EVENT_NEW_MODULE_SUCCESS_ADDED, function (new_module) {
//             if (new_module.is_enabled) {
//                 self.registerModule(new_module);
//             }
//         });
//
//         return this;
//     }
// };
