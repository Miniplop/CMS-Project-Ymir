var App = App || {};
App.Views.WidgetView = App.Views.WidgetView || {};

App.Views.WidgetListView = Backbone.View.extend({
    defaults: {
        el: null
    },
    initialize: function () {
        console.log("init widgetListView");
        _.bindAll(this, "render");
        this.collection.fetch({
            /*success: function(response){
                console.log(response);
            },*/
            success : this.render, 
        });
    },
    
    render : function () {
        this.el = $(this.collection.widgetLocation);
        
        console.log("render WidgetListView");
        var $el = $(this.el), self = this;
        this.collection.each(function (widget) {
            var item = new App.Views.WidgetView({model : widget});
            $el.append(item.render().el);
        });
        return this;
    }
});