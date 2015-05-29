var App = App || {};
App.Views.WidgetView = Backbone.View.extend({
    template: _.template($('#widget-template').html()),
    /*tagName: 'li',
    className: 'accordion-navigation',*/
    render: function () {
        var html = this.template(this.model.toJSON());
        this.$el.html(html); // on écrit à l'interieur de la balise pointée par el
        console.log(this.$el);
        return this;
    }
});
