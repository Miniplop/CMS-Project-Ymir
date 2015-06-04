var App = App || {};
App.Models.Property = App.Models.Property || {};

App.Collections.PropertyList = Backbone.Collection.extend({
    model : App.Models.Property,
    parse: function(res) {
        return res;
    }
});