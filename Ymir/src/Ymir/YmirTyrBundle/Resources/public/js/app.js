var app = (function() {
	
		window.App = {
		  defaults: {
			  categories: null,
              pages: null,
		  },
		  Models: {},
		  Collections: {},
		  Views: {},
		  Forms: {},
		  Router: {},
	      todos: null,
		  init: function(){
<<<<<<< HEAD
            this.categories = new App.Collections.CategorieList();
            var catlistview = new App.Views.CategorieListView({collection: this.categories});
              
            
=======
            new App.Router.MainRouter();
>>>>>>> fe56f74979b732e4f73de26cea06f218f78d7bb8
            Backbone.history.start();
            return this;
	      }
		};
    
	    
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
	    
	   /* var routeur = new App.Router.ProjectListRouter();*/
	    return window.App;	
})();