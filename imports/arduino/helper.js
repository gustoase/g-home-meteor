/**
 * Функция для динимачекого создания объекта который создается через new Blabla();
 * @param constructor
 * @returns {*}
 */
module.exports.create = function (constructor) {
    var args = Array.prototype.slice.call(arguments, 1);
    var object = Object.create(constructor.prototype);
    var result = constructor.apply(object, args);
    if (typeof result === 'object') {
        return result;
    } else {
        return object;
    }
}