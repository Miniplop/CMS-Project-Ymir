var App = App || {};
App.Collections.HtmlElementList = App.Collections.HtmlElementList || {};
App.Models.Widget = Backbone.Model.extend({
    /**
        id : 0,
        meta_widget_id: 0,   
        htmlElements : null
    */
    parse: function (res) {
        console.log("parse widget");
        res.htmlElements = new App.Collections.HtmlElementList(res.htmlElements, {parse: true});
        return res;
    },
    buildJQueryObject: function() {
        console.log("render widget");
        return this.get("htmlElements").buildHtmlElementList();
    }
});