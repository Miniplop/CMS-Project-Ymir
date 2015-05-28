App.Models.Project = Backbone.Model.extend({

    url : '/page',
    defaults: {
        title: "Page 1",
        archived: false,
        listeWidget: new App.Collections.widgets_liste()
    },
});