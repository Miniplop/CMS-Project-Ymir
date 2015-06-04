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
    
	return window.App;	
})();