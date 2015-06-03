var App = App || {};
App.Models.MetaHtmlElement = App.Models.MetaHtmlElement || {};

App.Collections.MetaHtmlElementList = Backbone.Collection.extend({
    model : App.Models.MetaHtmlElement,
    parse: function(res) {
        return res;
    }
});