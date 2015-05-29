var App = App || {};
App.Routers.ProjectListRouter = Backbone.Router.extend({
    
    routes: {
		'/' : 'home',
        '/creative' : 'creative',
        '/profil' : 'profil',
	},
    
	home: function () {
		alert('you are viewing home page');
	},
    
    creative: function () {
		alert('you are viewing creative page');
	},
    
    profil: function () {
		alert('you are viewing profil page');
	}
});
