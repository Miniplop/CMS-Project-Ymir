var App = App || {};
App.Models.Project = App.Models.Project || {};

App.Collections.ProjectList = Backbone.Collection.extend({
    
    model: App.Models.Project,
    url : "/project/list",

});
