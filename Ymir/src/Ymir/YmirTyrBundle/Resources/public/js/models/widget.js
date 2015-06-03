var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
/**
 * id : int, id of the widget
 * meta_widget_id : id of the meta widget
 * htmlElements : App.Collections.HtmlElementList
 */
App.Models.Widget = Backbone.Model.extend({
    initialize: function () {
        this.children = new App.Collections.WidgetList();

    },
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