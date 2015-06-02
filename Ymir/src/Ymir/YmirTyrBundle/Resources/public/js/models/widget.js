var App = App || {};

App.Collections.WidgetList = App.Collections.WidgetList || {};

App.Models.Widget = Backbone.Model.extend({
    defaults: {
        id : 0,
        meta_widget_id: 0,   
        htmlElements : null
        
    },
    initialize: function () {
        this.children = new App.Collections.WidgetList();

    },
<<<<<<< HEAD
    
=======
>>>>>>> 59b8ac97e9c85ab52909da727cac8a784c891c4f
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