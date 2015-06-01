var App = App || {};
App.Views.WidgetView = Backbone.View.extend({
    template: _.template($('#widget-template').html()),
    /*tagName: 'li',
    className: 'accordion-navigation',*/
    render: function () {
        var html = this.template(this.model.toJSON());
        this.$el.html(html); // on écrit à l'interieur de la balise pointée par el
        if (this.model.children.length !== 0) {
            this.model.children.widgetLocation = "widget" + this.model.id;
            var children = new App.Views.WidgetListView({collection :  this.model.children});
        }
        return this;
    }
});
