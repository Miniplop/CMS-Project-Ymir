var App = App || {};
App.Views.WidgetView = Backbone.View.extend({
    template: _.template($('#widget-template').html()),
    /*tagName: 'li',
    className: 'accordion-navigation',*/
    render: function () {
        var html = this.template(this.model.toJSON());
        this.$el.html(html); // on écrit à l'interieur de la balise pointée par el
        if (this.model.children !== null) {
            var children = new App.Views.WidgetListView({collection :  this.model.children, loc : "#widget" + this.model.id});
        }
        return this;
    }
});
