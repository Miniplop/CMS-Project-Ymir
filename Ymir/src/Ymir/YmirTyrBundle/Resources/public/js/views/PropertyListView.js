var App = App || {};
App.Views.PropertyView = App.Views.PropertyView || {};

App.Views.PropertyListView = Backbone.View.extend({
    el: $('#toolbar-html-element-property-list'),
    initialize: function() {
        _.bindAll(this, "render");
        this.render();
    },

    render: function() {
        var $el = $(this.el);

        this.collection.each(function(property) {
            var item = new App.Views.PropertyView({ model: property });
            $el.append(item.render().el);
        });
        $("#meta-widgets-panel").html(this.$el);
        console.log(this);
        return this;
    }
});
