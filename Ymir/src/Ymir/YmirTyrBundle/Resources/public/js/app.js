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
	        /*this.todos = new App.Collections.Projects();
	        ViewsFactory.menu();*/
			var catList = new App.Collections.CategorieList();
			var catlistview = new App.Views.CategorieListView({collection: catList});
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
	    
	    $("#checkbox_mobile").click( function(){
	    	   if( $(this).is(':checked') ) $("#mockup-mobile").css("display", "inline");
	    	   else $("#mockup-mobile").css("display", "none");
		});
	    
	    $("#checkbox_tablet").click( function(){
	    	   if( $(this).is(':checked') ) $("#mockup-tablet").css("display", "inline");
	    	   else $("#mockup-tablet").css("display", "none");
		});
	    
	    $("#checkbox_desktop").click( function(){
	    	   if( $(this).is(':checked') ) $("#mockup-desktop").css("display", "inline");
	    	   else $("#mockup-desktop").css("display", "none");
		});
	    
	    
	    App.Router = new Router();
	    return window.App;	
	    
})();