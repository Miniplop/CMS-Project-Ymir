var App = App || {};
App.Views.WidgetView = Backbone.View.extend({
    template: _.template($('#widget-template').html()),
    render: function () {
        var html = this.template(this.model.toJSON());
        this.$el.html(html); // on écrit à l'interieur de la balise pointée par el
        var ch = new App.Collections.WidgetList(this.model.get("children"));
        if (ch.length !== 0) {
            var el = "widget" + this.model.id;
            var $el = $(el), self = this;
            ch.each(function (widget) {
                console.log("test draw child");
                var children = new App.Views.WidgetView({model :  widget});
                $el.append(children.render().el);
            });
        }
        return this;
    }
});
