var app = (function() {
	
	window.App = {
        // objects
		categories: null,
        page: null,
        DragDropHandler: null,
        PageBuilder: null,
        PageSelector: null,
        
        // namespaces & class
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

	$("#checkbox_desktop").click( function() {
		   if( $(this).is(':checked') ) $("#mockup-desktop").css("display", "inline");
		   else $("#mockup-desktop").css("display", "none");
	});
    
	return window.App;	
})();