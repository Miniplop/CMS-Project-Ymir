var app = (function() {
	
		window.App = {
		  defaults: {
			  categories: null,
              page: null,
		  },
		  Models: {},
		  Collections: {},
		  Views: {},
		  Forms: {},
		  Router: {},
	      todos: null,

		  init: function(routeur){
            if (!routeur){
                /*var routeur = new App.Router.ProfileRouter();*/
                var listprojet = new App.Collections.ProjectList();
        
                listprojet.fetch({
                    success : function (){
                        console.log(listprojet);
                        var view = new App.Views.ProjectListView({collection : listprojet});
                    },
                    error : function (){
                        new Error({ message : 'Impossible to load project list'});      
                    }
            });
            }else if (routeur) {
                //var routeur = new App.Router.CreativeRouter();  
                // Nav Bar view 
                this.categories = new App.Collections.CategorieList();
                var catlistview = new App.Views.CategorieListView({collection: this.categories});

                // Stage view 
                this.page = new App.Models.Page();
                var arbreWidget = new App.Views.PageView({model: this.page});
            }else{
                 console.log("error init");
            }
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
    
	    return window.App;	
})();