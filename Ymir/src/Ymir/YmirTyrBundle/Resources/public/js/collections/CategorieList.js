var App = App || {};
App.Models.Categorie = App.Models.Categorie || {};
App.Collections.CategorieList = Backbone.Collection.extend({
    url   : "http://127.0.0.1/ymir/Ymir/web/app_dev.php/widgets",
    model : App.Models.Categorie,
	initialize: function() {
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