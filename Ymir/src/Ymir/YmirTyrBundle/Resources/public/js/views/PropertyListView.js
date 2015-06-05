var App = App || {};
App.Views.PropertyView = App.Views.PropertyView || {};

App.Views.PropertyListView = Backbone.View.extend({
    el: $('#toolbar-html-element-property-list'),
    initialize: function() {
        _.bindAll(this, "render");
    },

    render: function() {
        var $el = $(this.el);
        $el.empty();
        this.collection.each(function(property) {
            var item = new App.Views.PropertyView({ model: property });
            $el.append(item.render().el);
        });
        $(".toolbar-parameter").append(this.$el);
        return this;
    }
});
