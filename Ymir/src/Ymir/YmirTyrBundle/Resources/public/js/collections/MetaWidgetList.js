var App = App || {};
App.Models.MetaWidget = App.Models.MetaWidget || {};
App.Collections.MetaWidgetList = Backbone.Collection.extend({
    model : App.Models.MetaWidget,
    parse: function(res) {
        console.log("parse MetaWidgetList");
        return res.widgets;
    },
	getWidget: function (id) {
		return this.get(id);
	}
});