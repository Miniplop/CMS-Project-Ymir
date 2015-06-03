var App = App || {};
App.Collections.HtmlElementList = App.Collections.HtmlElementList || {};
/**
 * id : int, id of the widget
 * meta_widget_id : id of the meta widget
 * htmlElements : App.Collections.HtmlElementList
 */
App.Models.Widget = Backbone.Model.extend({
    
    parse: function (res) {
        res.htmlElements = new App.Collections.HtmlElementList(res.htmlElements, {parse: true});
        return res;
    },
    addWidget: function(container_html_element_id, widget) {
            this.get('htmlElements').addWidget(container_html_element_id, widget);
    }
});