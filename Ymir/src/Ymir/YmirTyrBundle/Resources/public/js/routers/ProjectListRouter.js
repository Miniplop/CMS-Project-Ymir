var App = App || {};
App.Routers.ProjectListRouter = Backbone.Router.extend({
    
    routes: {
		'' : 'home',
		'/download/:index': 'donwload'
	},
	home: function () {
		alert('you are viewing home page');
	},
	donwload: function (index) {
		alert('you tying to dl '+index);
	}
});
