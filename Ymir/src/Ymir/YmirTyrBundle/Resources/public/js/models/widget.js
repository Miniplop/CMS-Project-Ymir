var App = App || {};
App.Models.Widget = Backbone.Model.extend({
	defaults: {
		id: 0,
		name: "",
		htmlElements: {},
		htmlPreview: "",
	}
});