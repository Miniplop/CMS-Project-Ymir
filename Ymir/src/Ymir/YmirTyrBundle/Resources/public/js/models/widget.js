var App = App || {};
App.Collections.HtmlElementList = App.Collections.HtmlElementList || {};

/**
 * id : int, id of the widget
 * meta_widget_id : id of the meta widget
 * htmlElements : App.Collections.HtmlElementList
 */

App.Models.Widget = Backbone.Model.extend({
    /**
     *
     * @param res
     * @return {*}
     */
    parse: function (res) {
        res.htmlElements = new App.Collections.HtmlElementList(res.htmlElements, {parse: true});
        return res;
    },
    /**
     *
     * @param container_html_element_id
     * @param widget
     */
    addWidget: function(container_html_element_id, widget) {
            this.get('htmlElements').addWidget(container_html_element_id, widget);
    },
    /**
     *
     * @param id
     * @return {*}
     */
    getHtmlElement: function(id) {
        return this.get('htmlElements').getHtmlElement(id);
    },
    /**
     *
     * @param options
     * @return {*}
     */
    toJSON: function(options) {
        var json =  _.clone(this.attributes);
        json.htmlElements = this.get("htmlElements").toJSON(options);
        return json;
    }
});