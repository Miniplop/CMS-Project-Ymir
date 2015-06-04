var app = (function() {
    /**
     *
     * @type {{categories: null, page: null, DragDropHandler: null, PageBuilder: null, PageSelector: null, Models: {}, Collections: {}, Views: {}, Forms: {}, Router: {}, Utils: {}, Urls: {css: {}, js: {}}, todos: null, init: Function}}
     */
	window.App = {
        /**
         * objects
         */
		categories: null,
        page: null,
        DragDropHandler: null,
        PageBuilder: null,
        PageSelector: null,

        /**
         * namespaces & class
         */
		Models: {},
		Collections: {},
		Views: {},
		Forms: {},
		Router: {},
        Utils: {},
        Urls: {
            css: {},
            js: {}
        },
		todos: null,
        /**
         *
         * @param routeur
         * @return {App}
         */
        init: function(routeur) {
            $(document).foundation();
            var rout;  
          if (!routeur){
              rout = new App.Router.ProfileRouter();
          }else{
              rout = new App.Router.CreativeRouter();
          }
            Backbone.history.start();
            return this;
	      }
		};
    
	    
	$("#checkbox_mobile").click(function() {
		   if( $(this).is(':checked') ) $("#mockup-mobile").css("display", "inline");
		   else $("#mockup-mobile").css("display", "none");
	});

	$("#checkbox_tablet").click( function() {
		   if( $(this).is(':checked') ) $("#mockup-tablet").css("display", "inline");
		   else $("#mockup-tablet").css("display", "none");
	});

	$("#checkbox_rotate").click(function () {
		if ($(this).is(':checked')){
			if ($("#checkbox_tablet").is(':checked')){
				$("#mockup-tablet").addClass("mockup-rotate");
				$("#tablet").css('width', '420');
				$("#tablet").addClass("iframe-rotate");
			}
			if ($("#checkbox_mobile").is(':checked')){
				$("#mockup-mobile").addClass("mockup-rotate");
				// top: 12.2641509%; bottom: 12.2641509%; left: 10.5403012%; right: 18.6005314%;
				// $("#mobile").css('top', '12.2641509%');
				// $("#mobile").css('bottom', '12.2641509%');
				// $("#mobile").css('left', '10.5403012%');
				// $("#mobile").css('right', '18.6005314%');
				$("#mobile").css('width', '334');

				$("#mobile").addClass("iframe-rotate");

			}

		} else {
			$("#mobile").css('width', '201');
			$("#tablet").css('width', '671');
			$("#mockup-tablet").removeClass("mockup-rotate");
			$("#mockup-mobile").removeClass("mockup-rotate");
			$("#tablet").removeClass("iframe-rotate");
			$("#mobile").removeClass("iframe-rotate");
			$("#mockup-rotate").css("display", "none");
		}
	})
    
	return window.App;	
})();