App.Models.User = Backbone.Model.extend({
	urlRoot: '/user',
    defaults: {
    	id: '',
        username: '',
        email: '',
        password: ''
    }

});
