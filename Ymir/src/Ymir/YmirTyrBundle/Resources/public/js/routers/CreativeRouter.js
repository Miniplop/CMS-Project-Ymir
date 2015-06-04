var App = App || {};
App.Models.Project =App.Models.Project || {};



App.Router.CreativeRouter = Backbone.Router.extend({

    routes: {

		'(:id)' : 'creative'

	},

	creative: function (id) {

		console.log('you are viewing creative page ' +id);
        
        // Faut chercher l'id ...

        // Nav Bar view 
        App.categories = new App.Collections.CategorieList();
        var catlistview = new App.Views.CategorieListView({collection: App.categories});

        // Stage view
        App.page = new App.Models.Page();
        App.PageBuilder = new App.Utils.PageBuilder(App.page);
        App.DragDropHandler = new App.Utils.DragDropHandler();

	}
});