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
                console.log("app init");
            if (this.routeur_selection == "profile"){
                var routeur = new App.Router.ProfileRouter();
            }else if ( this.routeur_selection == "creative" ) {
                var routeur = new App.Router.CreativeRouter();
            }else{
                 console.log("error");
            }
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