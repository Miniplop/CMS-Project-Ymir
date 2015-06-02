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
        console.log(res.children);
        this.children = new App.Collections.WidgetList(res.children);
        console.log(this.get("children"));
        return res;
    },
    render: function() {
        if(this.children.isEmpty())
            return null;
    }
});