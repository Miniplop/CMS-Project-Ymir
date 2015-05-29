var App = App || {};
App.Models.MetaWidget = App.Models.MetaWidget || {};
App.Collections.MetaWidgetList = Backbone.Collection.extend({
    model : App.Models.MetaWidget,
    parse: function(res) {
        return res.widgets;
    }
});