var App = App || {};
App.Collections.CategorieList = Backbone.Collection.extend({
    url   : "http://127.0.0.1/ymir/Ymir/web/app_dev.php/widgets",
    model : App.Models.Categorie,
    parse: function(res) {
        return res.categories;
    },
    getWidget: function(id) {
    	var widget = null;
		for (var i = 0; i < this.length; i++) {
			if((widget = this.models[i].getWidget(id)) != null)
				break;
        }
		return widget;
    }
});