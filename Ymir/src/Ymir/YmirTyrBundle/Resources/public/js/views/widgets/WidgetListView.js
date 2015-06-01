var App = App || {};
App.Views.WidgetView = App.Views.WidgetView || {};

App.Views.WidgetListView = Backbone.View.extend({
    defaults: {
        el: null
    },
    initialize: function () {
        this.el = $(this.collection.widgetLocation);
        _.bindAll(this, "render");
        this.render(); // $.ajax 'success' callback
    },
    
    
    render : function () {
        console.log("render WidgetListView");
        var $el = $(this.el), self = this;
        this.collection.each(function (widget) {
            if (widget.children.length == 0){
                console.log("children null dans widgetListView");    
            } else {
                console.log("children non null dans widgetListView");
            }
            var item = new App.Views.WidgetView({model : widget});
            $el.append(item.render().el);
        });
        return this;
    }
});