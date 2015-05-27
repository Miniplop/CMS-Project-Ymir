var app = (function() {
	
	window.App = {
	  Models: {},
	  Collections: {},
	  Views: {},
	  Router: {},
      todos: null,
      content: null,
	  init: function(){
        //this.content = $("#content");
        this.todos = new App.Collections.Projects();
        ViewsFactory.menu();
        return this;
      },
      changeContent: function(el){
        this.content.empty().append(el);
        return this;
      },
      title: function(str){
        $("h1").text(str);
        return this;
      }
	};
           
    var ViewsFactory = {
           menu: function(){
            if(!this.menuView){
                this.menuView = new App.Views.ProjectsIndex({
                    el: $("#menu")
                });
            }
            return this.menuView;
            }
    };

    var Router = Backbone.Router.extend({});
    App.Router = new Router();
    return window.App;	
    
})();