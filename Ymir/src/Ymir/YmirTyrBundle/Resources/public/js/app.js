(function() {
	
	window.App = {
	  Models: {},
	  Collections: {},
	  Views: {},
	  Routers: {},
	  init: function() {}
	};
    
	$(document).foundation();
	App.init();
    
    var v = App.Models.Project( id:10);
    
    var view = App.Views.ProjectsIndex();
    $('div.projets-body').html(view.render().el);
	
})();