var App = App || {};
App.Collections.Projects = Backbone.Collection.extend({

    initialize: function(){
        this.add({ title: "Learn JavaScript basics" });
        this.add({ title: "Go to backbonejs.org" });
        this.add({ title: "Develop a Backbone application" });
    },
    model: App.Models.Project,
    
    archive: function(archived, index) {
        this.models[index].set("archived", archived);
    },
    changeStatus: function(done, index) {
        this.models[index].set("done", done);
    }

});
