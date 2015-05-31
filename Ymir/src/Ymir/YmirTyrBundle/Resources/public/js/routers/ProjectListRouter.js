var App = App || {};
App.Router.ProjectListRouter = Backbone.Router.extend({
    
    routes: {
		'' : 'home',
        '/creative' : 'creative',
        '/profil' : 'profil',
	},
    
	home: function () {
		console.log('you are viewing home page');
	},
    
    creative: function () {
		console.log('you are viewing creative page');
	},
    
    profil: function () {
		console.log('you are viewing profil page');
	}
});
