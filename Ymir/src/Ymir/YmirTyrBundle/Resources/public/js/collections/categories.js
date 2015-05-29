App.Collections.CategorieList = Backbone.Collection.extend({
    url   : "http://127.0.0.1/ymir/Ymir/web/app_dev.php/widgets",
    model : App.Models.Categorie,

	initialize: function() {
    },parse: function(res) {
        return res.categories;
    }
});