var App = App || {};
App.Views.PropertyView = App.Views.PropertyView || {};

App.Views.PropertyListView = Backbone.View.extend({
    el: $('#toolbar-html-element-property-list'),
    initialize: function() {
        _.bindAll(this, "render");
        this.collection.fetch({ // call fetch() with the following options
            success: this.render // $.ajax 'success' callback
        });

    },

    render: function() {
        var $el = $(this.el);

        this.collection.each(function(properties) {
            var item = new App.Views.PropertyView({ model: properties });
            $el.append(item.render().el);
        });
        $("#meta-widgets-panel").html(this.$el);
        return this;
    }
});
