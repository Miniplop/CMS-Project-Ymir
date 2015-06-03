var App = App || {};
App.Collections.MetaWidgetList = App.Collections.MetaWidgetList || {};

/**
 * id: int
 * name : String : name of the collection,
 * metaWidgets : App.Collections.MetaWidgetList
 */
App.Models.Categorie = Backbone.Model.extend({
    parse: function(result) {
    	result.metaWidgets = new App.Collections.MetaWidgetList(result.metaWidgets, {parse: true});
    	return result;
    },
    getMetaWidget: function(id) {
		return this.get("metaWidgets").getMetaWidget(id);
	}	
});