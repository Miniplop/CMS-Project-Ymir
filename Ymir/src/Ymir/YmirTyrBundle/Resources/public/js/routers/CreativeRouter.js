var App = App || {};
App.Utils.PageBuilder = App.Utils.PageBuilder ||  {};
/**
 *
 */
App.Router.CreativeRouter = Backbone.Router.extend({

    routes: {

		'(:id)' : 'creative'

	},

    /**
     *
     * @param id
     */
	creative: function (id) {

		console.log('you are viewing creative page ' +id);
        
        // Faut chercher l'id ...

        // Nav Bar view
      /*  App.categories = new App.Collections.CategorieList();
        var catlistview = new App.Views.CategorieListView({collection: App.categories});*/
         App.creativeView = new App.Views.CreativeView();
        // Stage view
        App.PageBuilder = new App.Utils.PageBuilder(null);
        App.DragDropHandler = new App.Utils.DragDropHandler();
        App.PageSelector = new App.Utils.PageSelector();

	}
});