var App = App || {};
App.Models.Project =App.Models.Project || {};



App.Router.MainRouter = Backbone.Router.extend({
    
    routes: {
		'' : 'home',
        '/creative' : 'creative',
        '/profil' : 'profil',
	},
    
	home: function () {		
        console.log('you are viewing home page');
        
        var listprojet = new App.Collections.ProjectList();
        listprojet.fetch({
            success : function (){
                var view = new App.Views.ProjectListView({collection : listprojet});
            },
            error : function (){
                new Error({ message : 'Impossible to load project list'});      
            }
        });
	},
    
    creative: function () {
        
		console.log('you are viewing creative page');
        
        // Nav Bar view 
        this.categories = new App.Collections.CategorieList();
        var catlistview = new App.Views.CategorieListView({collection: this.categories});
        
        // Stage view 
        var arbreWidget = new App.Views.WidgetListView({collection: this.pages});
	},
    
    profil: function () {
        
		console.log('you are viewing profil page');
        
	}
});
