var App = App || {};
App.Views.PageView = Backbone.View.extend({
    initialize: function () {
        _.bindAll(this, "render");
        this.model.fetch({ // call fetch() with the following options
                success: this.render, // $.ajax 'success' callback
        });
    },
    
    render: function () {
        var widgets = new App.Collections.WidgetList(this.model.get("widgets"));
        var item = new App.Views.WidgetListView({collection : widgets});
        return this;
    }
});
