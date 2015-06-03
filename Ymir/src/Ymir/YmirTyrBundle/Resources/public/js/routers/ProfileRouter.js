var App = App || {};
App.Models.Project =App.Models.Project || {};

App.Router.ProfileRouter = Backbone.Router.extend({
    
    routes: {    
		'' : 'profile',
	},
    
	profile: function () {
        console.log('you are viewing profile page');
        var listprojet = new App.Collections.ProjectList();
        
        listprojet.fetch({
            success : function (collection,response){
                var view = new App.Views.ProjectListView({model : listprojet});
            },
            error : function (){
                new Error({ message : 'Impossible to load project list'});  
                
            }
        });
	}
});
