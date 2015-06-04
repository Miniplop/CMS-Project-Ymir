var App = App || {};
App.Models.Project =App.Models.Project || {};

/*
* Creative router
* 
*
*
*/


App.Router.CreativeRouter = Backbone.Router.extend({

    routes: {

		'' : 'creative'

	},

	creative: function (id) {

		console.log('you are viewing creative page ' +id);
        
        // Faut chercher l'id ...

        // Nav Bar view 
        App.categories = new App.Collections.CategorieList();
        var catlistview = new App.Views.CategorieListView({collection: App.categories});

        // Stage view
        App.PageBuilder = new App.Utils.PageBuilder(new App.Models.Page());
        App.DragDropHandler = new App.Utils.DragDropHandler();
        App.PageSelector = new App.Utils.PageSelector();
        
        
        // Event
        $("#save_page").click(function(){
            var test = new App.Models.Page();
            test.set("id", 14);
            test.save;
            
        });
        
        $("#checkbox_mobile").click(function() {
		   if( !($(this).hasClass('active')) ){ // Si le bouton n'est pas activé
               $("#mockup-mobile").css("display", "inline");
               $(this).addClass("active");
           } 
		   else { // Si le bouton est activé
               $("#mockup-mobile").css("display", "none");
               $(this).removeClass("active");
           }
	   });

	   $("#checkbox_tablet").click( function() {
		   if( !($(this).hasClass('active')) ){
                $("#mockup-tablet").css("display", "inline");
                $(this).addClass("active");
           }
		   else { // Si le bouton est activé
               $("#mockup-tablet").css("display", "none");
               $(this).removeClass("active");
           }
	   });

	}
});