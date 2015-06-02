var App = App || {};
App.Models.Categorie = App.Models.Categorie || {};
App.Collections.CategorieList = Backbone.Collection.extend({
    url   : "http://127.0.0.1:8000/widgets",
    model : App.Models.Categorie,
	initialize: function() {
    },
	parse: function(res) {
        console.log("parse CategorieList");
        return res.categories;
    },
	getWidget: function(id) {
		var widget = null;
		for (var i = 0; i < this.models.length; i++) {
			if((widget = this.models[i].getWidget(id)) != null)
				break;
		}
		return widget;
	}
});