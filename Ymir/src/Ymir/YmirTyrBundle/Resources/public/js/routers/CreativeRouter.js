var App = App || {};
App.Models.Project =App.Models.Project || {};



App.Router.CreativeRouter = Backbone.Router.extend({
    
    routes: {
        
		'' : 'creative'
   
	},
    
	creative: function () {		
        
		console.log('you are viewing creative page');
        
        // Nav Bar view 
        this.categories = new App.Collections.CategorieList();
        var catlistview = new App.Views.CategorieListView({collection: this.categories});
        
        // Stage view 
        var arbreWidget = new App.Views.WidgetListView({collection: this.pages});

	}
});
