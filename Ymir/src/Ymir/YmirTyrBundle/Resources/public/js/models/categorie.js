var App = App || {};
App.Collections.MetaWidgetList = App.Collections.MetaWidgetList || {};
App.Models.Categorie = Backbone.Model.extend({
	defaults: {
		id: 0,
		name: '',
		metaWidgets: null
	},
	initialize: function() {
        this.metaWidgets = new App.Collections.MetaWidgetList();
    },
    parse: function(result) {
    	result.widgets = new App.Collections.MetaWidgetList(result.widgets);
    	return result;
    }
	
});