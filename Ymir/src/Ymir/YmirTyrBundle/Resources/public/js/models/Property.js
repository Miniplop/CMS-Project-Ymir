var App = App || {};
/**
 * name :
 * type :
 * inputType :
 * indentifier :
 * value
 */
App.Models.Property = Backbone.Model.extend({
    parse: function(result) {
        result.inputType = result.input_type;
        return result;
    }
});