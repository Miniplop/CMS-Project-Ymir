var App = App || {};
App.Models.ProjectPage = App.Models.ProjectPage || {};

App.Collections.ProjectPageList = Backbone.Collection.extend({
    
    model: App.Models.ProjectPage,
    
    initialize: function() {
        this.add(new App.Models.ProjectPage());
    }
});