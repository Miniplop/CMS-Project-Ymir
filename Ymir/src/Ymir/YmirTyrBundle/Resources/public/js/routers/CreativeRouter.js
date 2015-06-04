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

    /**
     *
     * @param id
     */
	creative: function (id) {

		console.log('you are viewing creative page ' +id);
        
        // Faut chercher l'id ...
        
        // Nav Bar view
        App.categories = new App.Collections.CategorieList();
        var catlistview = new App.Views.CategorieListView({collection: App.categories});
        
        // Stage view
        App.PageBuilder = new App.Utils.PageBuilder(null);
        App.DragDropHandler = new App.Utils.DragDropHandler();
        App.PageSelector = new App.Utils.PageSelector();
        
        
        //******************************************
        //
        //                    Events
        //
        //******************************************
        
        $("#save_page").click(function(){
            if (App.page){
                App.page.save({},{
                    success:function(){
                        
                    },
                    error:function(){
                        
                    }
                });
            }
            
        });
        
        
	   $("#checkbox_rotate").click(function () {
		if (!($(this).hasClass('active'))){ // not active
            $(this).addClass('active');
			/*if ($("#checkbox_tablet").hasClass('active')){
				$("#mockup-tablet").addClass("mockup-rotate");
				$("#tablet").css('width', '420');
				$("#tablet").addClass("iframe-rotate");
			}*/
			if ($("#checkbox_mobile").hasClass('active')){
                console.log("rotation");
				$("#mockup-mobile").addClass("mockup-rotate");
				$("#mobile").css('width', '334');
                $("#mobile").addClass("iframe-rotate");
			}

		} else {
            $(this).removeClass("active"); 
			$("#mobile").css('width', '201');
			$("#tablet").css('width', '671');
			$("#mockup-tablet").removeClass("mockup-rotate");
			$("#mockup-mobile").removeClass("mockup-rotate");
			$("#tablet").removeClass("iframe-rotate");
			$("#mobile").removeClass("iframe-rotate");
			$("#mockup-rotate").css("display", "none");
		}
	})
        
        $("#checkbox_mobile").click(function() {
		   if( !($(this).hasClass('active')) ){ // Si le bouton n'est pas activé
               $("#mockup-mobile").css("display", "inline");
                $("#checkbox_rotate").css("display","inline");
               $(this).addClass("active");
           } 
		   else { // Si le bouton est activé
               $("#mockup-mobile").css("display", "none");
                $("#checkbox_rotate").css("display","none");
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