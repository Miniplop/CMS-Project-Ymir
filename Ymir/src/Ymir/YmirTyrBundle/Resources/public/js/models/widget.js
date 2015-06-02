var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
App.Models.Widget = Backbone.Model.extend({
    defaults: {
        id : 0,
        meta_widget_id: 0,   
        htmlElements : null
        
    },
<<<<<<< HEAD
    initialize: function () {
        this.children = new App.Collections.WidgetList();

    },
=======
>>>>>>> 05aaa159175fa8b099e66aac73bb2f380bfd8f79
    parse: function (res) {
        this.htmlElements = new App.Models.HtmlElements(res.htmlElements);
        console.log(this.get("children"));
        return res;
    },
    render: function() {
        if(this.children.isEmpty())
            return null;
    }
});