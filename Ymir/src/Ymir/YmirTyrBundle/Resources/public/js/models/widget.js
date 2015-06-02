var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
App.Models.Widget = Backbone.Model.extend({
    defaults: {
        ident : 0,
        metaWidget_id: 0,
        cl : '',
        tag : '',
        content: '',        
        children : null
        
    },
    initialize: function () {
        this.children = new App.Collections.WidgetList();
    },
    parse: function (result) {
        console.log("parse widget");
        //result.children = new App.Collections.WidgetList(result.children);
        /*console.log("children length: " + result.children.length);
        result.children.each( function(child) {
            console.log("child content: " + child.content);
        });*/
        return result;
    }
});