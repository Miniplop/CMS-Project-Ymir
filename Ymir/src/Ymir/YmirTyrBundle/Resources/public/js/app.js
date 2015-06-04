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
    

	return window.App;	
})();