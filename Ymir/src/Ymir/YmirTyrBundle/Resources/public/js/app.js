var app = (function() {
	
	window.App = {
	  Models: {},
	  Collections: {},
	  Views: {},
	  Router: {},
      todos: null,
	  init: function(){
    //this.content = $("#content");
          var listprojet = new App.Collections.Projects();
          var view = new App.Views.ProjectsIndex({collection : listprojet}).render();
		/*var catList = new App.Collections.CategorieList().parse();
		var catlistview = new App.Views.CategorieListView({collection: catList}).render();*/
        return this;
      }
	};
           
    /*var ViewsFactory = {
           menu: function(){
            if(!this.menuView){
                this.menuView = new App.Views.ProjectsIndex({
                    el: $("#menu")
                });
            }
            return this.menuView;
            }
    };
*/
    var Router = Backbone.Router.extend({
        routes: {},
    });
    App.Router = new Router();
    return window.App;	
    
})();