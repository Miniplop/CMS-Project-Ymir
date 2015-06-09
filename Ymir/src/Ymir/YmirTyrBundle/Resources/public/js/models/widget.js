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
        res.htmlElements = new App.Collections.HtmlElementList(res.html_elements, {parse: true});
        return res;
    },
    /**
     *
     * @param container_html_element_id (number)
     * @param widget (App.Models.Widget)
     */
    addWidget: function(container_html_element_id, widget) {
            this.get('htmlElements').addWidget(container_html_element_id, widget);
    },
    /**
     *
     * @param id (number)
     * @return {*}
     */
    getWidget: function(id) {
        if(this.get("id") == id)
            return this;
        else
            return this.get("htmlElements").getHtmlElement(id);
    },
    /**
     *
     * @param id (number)
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
    },
    /**
     *
     * @param elementId (number)
     */
    removeHtmlElement: function(elementId) {
        this.get("htmlElements").removeHtmlElement(elementId);
    },

    /**
     *
     * @param widgetId (number) Id of widget to remove
     * @param replacerModel (App.Models.HtmlElement)
     * @param replacerHtmlElementContainerId (number) Where to add replacerModel
     * @description
     *      if we've found the id and parent is a container, replace this by a empty div with same size class.
     *      else i just remove it from the parent collection
     */
    removeWidget: function(widgetId, replacerModel, replacerHtmlElementContainerId) {
        if(this.get("id") == widgetId)
            this.collection.remove(this);
        else
            this.get("htmlElements").removeWidget(widgetId, replacerModel, replacerHtmlElementContainerId);
    }
});