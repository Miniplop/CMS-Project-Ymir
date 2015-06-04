var App = App || {};
App.Models.Categorie = App.Models.Categorie || {};
App.Collections.CategorieList = Backbone.Collection.extend({
    url : "",
    model : App.Models.Categorie,
	initialize: function() {
        this.url = App.Urls.categories;
    },
	parse: function(res) {
        return res.categories;
    },
    getMetaWidget: function(id) {
		var metaWidget = null;
		for (var i = 0; i < this.models.length; i++) {
			if((metaWidget = this.models[i].getMetaWidget(id)) != null)
				break;
		}
		return metaWidget;
	}
});