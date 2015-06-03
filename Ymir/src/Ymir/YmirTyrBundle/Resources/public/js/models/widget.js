var App = App || {};
App.Collections.HtmlElementList = App.Collections.HtmlElementList || {};
/**
 * id : int, id of the widget
 * meta_widget_id : id of the meta widget
 * htmlElements : App.Collections.HtmlElementList
 */
App.Models.Widget = Backbone.Model.extend({
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