var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
App.Models.Widget = Backbone.Model.extend({
    defaults: {
        ident : 0,
        cl : '',
        tag : '',
        content: '',
        children : null
        
    },
    /*initialize: function () {
        this.children = new App.Collections.WidgetList();
    },*/
    parse: function (res) {
        res.children = new App.Collections.WidgetList(res.children);
        this.children = res.children;
        return res;
    }
});