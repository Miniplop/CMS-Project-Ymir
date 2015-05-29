var app = (function() {
	
		window.App = {
		  defaults: {
			  categories: null,
              pages: null,
		  },
		  Models: {},
		  Collections: {},
		  Views: {},
		  Router: {},
	      todos: null,
		  init: function(){
              
            this.pages = new App.Collections.PageList();
            var arbreWidget = new App.Views.WidgetListView({collection: this.pages});
              
            var routeur = new App.Routers.ProjectListRouter();
              

            var listprojet = new App.Collections.ProjectList();
            var view = new App.Views.ProjectListView({collection : listprojet}).render();
           
           /* this.categories = new App.Collections.CategorieList();
            var catlistview = new App.Views.CategorieListView({collection: this.categories});*/
              
            
            Backbone.history.start();
              
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
	    
	    
	    return window.App;	
})();