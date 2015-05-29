var App = App || {};
App.Models.Categorie = Backbone.Model.extend({
	defaults: {
		id: 0,
		name: "",
		widgets: new App.Collections.WidgetList()
	},
	initialize: function(){
    },
    parse: function(result) {
    	result.widgets = new App.Collections.WidgetList(result.widgets);
    	return result;
    },
	getWidget: function(id) {
		console.log(this);
		return this.get("widgets").getWidget(id);	
	}	
});