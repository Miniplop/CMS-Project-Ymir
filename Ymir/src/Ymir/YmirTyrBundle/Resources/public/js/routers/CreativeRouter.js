var App = App || {};
App.Models.Project =App.Models.Project || {};



App.Router.CreativeRouter = Backbone.Router.extend({

    routes: {

		'(:id)' : 'creative'

	},

	creative: function (id) {

		console.log('you are viewing creative page ' +id);

        // Nav Bar view 
       /* this.categories = new App.Collections.CategorieList();
        var catlistview = new App.Views.CategorieListView({collection: this.categories});

        // Stage view
        this.pages = new App.Collections.PageList();
        var arbreWidget = new App.Views.WidgetListView({collection: this.pages});*/

	}
});