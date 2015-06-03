var App = App || {};
App.Models.Project = App.Models.Project || {};

App.Collections.ProjectList = Backbone.Collection.extend({
    
    model: App.Models.Project,
    url : "http://127.0.0.1/ymir/Ymir/web/app_dev.php/projects",
    
        parse: function(res) {
        return res.projects;
    }

});
