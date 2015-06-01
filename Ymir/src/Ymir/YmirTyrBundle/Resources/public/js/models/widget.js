var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
App.Models.Widget = Backbone.Model.extend({
    defaults: {
        id : 0,
        class : '',
        tag : '',
        content: '',
        children : null
        
    },
    initialize: function () {
        console.log("init widget");
        this.children = new App.Collections.WidgetList();
    }
});