var App = App || {};
App.Models.HtmlElements = App.Models.HtmlElements || {};
App.Models.Widget = Backbone.Model.extend({
    defaults: {
        id : 0,
        meta_widget_id: 0,   
        htmlElements : null
        
    },
    initialize: function () {
        this.children = new App.Collections.WidgetList();

    },
    parse: function (res) {
        this.htmlElements = new App.Models.HtmlElements(res.htmlElements);
        return res;
    },
    render: function() {
        if(this.htmlElements.isEmpty())
            return null;
    }
});