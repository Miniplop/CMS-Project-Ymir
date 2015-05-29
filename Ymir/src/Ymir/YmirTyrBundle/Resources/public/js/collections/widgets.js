var App = App || {};
App.Collections.WidgetList = Backbone.Collection.extend({
    model : App.Models.Widget,
    parse: function(res) {
        return res.widgets;
    },
	getWidget: function(id) {
		return this.get(id);	
	}
});