var App = App || {};
App.Models.Categorie = App.Models.Categorie || {};
App.Collections.CategorieList = Backbone.Collection.extend({
    url   : "http://127.0.0.1:8000/widgets",
    model : App.Models.Categorie,
	initialize: function() {
    },parse: function(res) {
        return res.categories;
    }
});