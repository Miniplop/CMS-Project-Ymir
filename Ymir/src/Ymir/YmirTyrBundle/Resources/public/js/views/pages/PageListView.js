var App = App || {};
App.Views.PageView = App.Views.PageView || {};

App.Views.PageListView = Backbone.View.extend({
    initialize: function () {
        _.bindAll(this, "render");
        this.collection.fetch({ // call fetch() with the following options
                success: this.render, // $.ajax 'success' callback
        });
    },
    
    
    render : function () {
        var self = this;
        this.collection.each(function (page) {
            var item = new App.Views.PageView({model : page});
            item.render();
        });
        return this;
    }
});