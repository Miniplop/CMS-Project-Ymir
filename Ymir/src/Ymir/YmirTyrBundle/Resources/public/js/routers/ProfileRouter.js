var App = App || {};
App.Models.Project =App.Models.Project || {};

App.Router.ProfileRouter = Backbone.Router.extend({
    
    routes: {    
		'' : 'profile',
        'edit/:id': 'edit'
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
	},
    
    
    
    edit:function(id){
        //id.preventDefault();
        app.history.pushState("","","creative");
        Backbone.history.checkUrl()
        console.log("page creative avec la page :" +id);
       /*// Nav Bar view
        this.categories = new App.Collections.CategorieList();
        var catView = new App.Views.CategorieListView({collection: this.categories});
        this.PageBuilder = new App.Utils.PageBuilder(null);
        this.DragDropHandler = new App.Utils.DragDropHandler();*/
    }
});
