App.Collections.WidgetList = Backbone.Collection.extend({
    model : App.Models.Widget,
    parse: function(res) {
        return res.widgets;
    }
});