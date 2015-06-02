var App = App || {};
App.Collections.HtmlElementList = App.Collections.HtmlElementList || {};
App.Models.Widget = Backbone.Model.extend({
    defaults: {
        id : 0,
        meta_widget_id: 0,   
        htmlElements : null
    },
    parse: function (res) {
        this.htmlElements = new App.Collections.HtmlElementList(res.htmlElements);
        return res;
    },
    render: function() {
        
    }
});