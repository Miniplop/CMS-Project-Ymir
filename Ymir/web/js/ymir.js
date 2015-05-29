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

    var Router = Backbone.Router.extend({
        routes: {},
        
    
    });
    App.Router = new Router();
    return window.App;	
    
})();

//View qui rend un projet
App.Views.ProjectIndex = Backbone.View.extend({

});

// view qui rend la liste des projets
  App.Views.ProjectsIndex = Backbone.View.extend({
        
    template: _.template($("#tpl-menu").html()),
      
    initialize: function() {
        this.render();
    },
      
    render: function(){
        this.$el.html(this.template({}));
    }
      
});    

  

App.Views.UsersIndex = Backbone.View.extend({

});

App.Models.Project = Backbone.Model.extend({ 
  defaults: {
        title: "Projet 1",
        archived: false,
        done: false 
  }
});

App.Models.Project = Backbone.Model.extend({

});

App.Models.User = Backbone.Model.extend({
	urlRoot: '/user',
    defaults: {
    	id: '',
        username: '',
        email: '',
        password: ''
    }

});

App.Collections.Projects = Backbone.Collection.extend({

    initialize: function(){
        this.add({ title: "Learn JavaScript basics" });
        this.add({ title: "Go to backbonejs.org" });
        this.add({ title: "Develop a Backbone application" });
    },
    model: App.Models.Project,
    
    archive: function(archived, index) {
        this.models[index].set("archived", archived);
    },
    changeStatus: function(done, index) {
        this.models[index].set("done", done);
    }

});

App.Collections.Users = Backbone.Collection.extend({
});
