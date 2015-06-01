var App = App || {};
App.Models.Project =App.Models.Project || {};



App.Router.MainRouter = Backbone.Router.extend({
    
    routes: {
		'' : 'home',
        '/creative' : 'creative',
        '/profil' : 'profil',
	},
    
	home: function () {
          /*   this.pages = new App.Collections.PageList();*/		
        console.log('you are viewing home page');
        
        var listprojet = new App.Collections.ProjectList();
        // Ici fetch a faire 
        // Prompt pour name
        var view = new App.Views.ProjectListView({collection : listprojet}).render();
	},
    
    creative: function () {
        
		console.log('you are viewing creative page');
        
        // Nav Bar view 
        this.categories = new App.Collections.CategorieList();
        var catlistview = new App.Views.CategorieListView({collection: this.categories});
        
        // Stage view 
        this.pages = new App.Collections.PageList();
        var arbreWidget = new App.Views.WidgetListView({collection: this.pages});
	},
    
    profil: function () {
        
		console.log('you are viewing profil page');
        
	}
});
