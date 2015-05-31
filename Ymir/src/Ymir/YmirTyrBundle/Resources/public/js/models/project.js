var App = App || {};
App.Models.Project = Backbone.Model.extend({
    
    /*url: '/project/create',*/
    
    defaults:{
        nom: "",
        id: null,
        pages: null
    }
});
