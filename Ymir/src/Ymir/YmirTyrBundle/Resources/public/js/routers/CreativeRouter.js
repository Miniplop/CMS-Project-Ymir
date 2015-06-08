var App = App || {};
App.Models.Project = App.Models.Project || {};

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
	creative: function () {
<<<<<<< HEAD

      
        
        
        
        // Nav Bar view
        App.creativeView = new App.Views.CreativeView();
        
        // Stage view
        var CheminComplet = document.location.href;
        const id_page = CheminComplet.substring(CheminComplet.lastIndexOf( "/" )+1 );
        var page = new  App.Models.Page({id : id_page});
        page.set('widgets', new App.Collections.WidgetList());
        page.fetch();
        App.PageBuilder = new App.Utils.PageBuilder(page);
        App.DragDropHandler = new App.Utils.DragDropHandler();
        App.PageSelector = new App.Utils.PageSelector();
        
        console.log('you are viewing creative page ' +id_page);
=======
>>>>>>> 4e5fd93fd72f8d4010ed610af59c855b989b0567
        
            // Faut chercher l'id ...
            var CheminComplet = document.location.href;
            const id_page = CheminComplet.substring(CheminComplet.lastIndexOf( "/" )+1 );
            var page = new  App.Models.Page().fetch({id : id_page});

            console.log('you are viewing creative page ' +id_page);


            // Nav Bar view
            App.creativeView = new App.Views.CreativeView();

            // Stage view
            App.PageBuilder = new App.Utils.PageBuilder(null);
            App.DragDropHandler = new App.Utils.DragDropHandler();
            App.PageSelector = new App.Utils.PageSelector();


            //******************************************
            //
            //                    Events
            //
            //******************************************

            $(".project-name-input").change(function(){
                console.log("change name");
            });

            $("#save_page").click(function(){
                console.log("save");
                if (App.page){
                    App.page.save({},{
                        success:function(){

                        },
                        error:function(){

                        }
                    });
                }

            });

            $("#checkbox_mobile").click(function() {
                console.log("go event");
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
        });
<<<<<<< HEAD
        
        
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
	});
       
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