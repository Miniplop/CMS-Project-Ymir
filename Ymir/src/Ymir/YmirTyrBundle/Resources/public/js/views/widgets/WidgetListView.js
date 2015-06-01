var App = App || {};
App.Views.WidgetView = App.Views.WidgetView || {};

App.Views.WidgetListView = Backbone.View.extend({
    el: $("#stage"),    
    initialize: function () {
        console.log("init view");
        _.bindAll(this, "render");
        this.collection.fetch({ // call fetch() with the following options
                success: this.render, // $.ajax 'success' callback
        });
    },
    
    
    render : function () {
        console.log("render view");
        var $el = $(this.el), self = this;
        this.collection.each(function (widget) {
            var item = new App.Views.WidgetView({model : widget});
            $el.append(item.render().el);            
        });
        return this;
    }
});