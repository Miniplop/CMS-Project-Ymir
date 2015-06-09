var App = App || {};
App.Models.Widget = App.Models.Widget || {};
/**
 *
 */
App.Collections.WidgetList = Backbone.Collection.extend({
    widgetLocation : "#stage",
    model: App.Models.Widget,
    /**
     *
     * @param res
     * @return {*}
     */
    parse: function (res) {
        return res;
    },
    /**
     *
     * @param container_html_element_id (number) the location of the widget in the tree
     * @param widget (App.Models.Widget) : widget to add
     */
    addWidget : function (container_html_element_id, widget) {
        for(var index in this.models)
            this.models[index].addWidget(container_html_element_id, widget);
    },
    /**
     *
     * @param id (number) id of the widget to return
     * @return {*}
     */
    getWidget: function(id) {
        var result = null;
        for(var index in this.models)
            if((result = this.models[index].getWidget(id)) != null)
                break;
        return result;
    },
    /**
     *
     * @param id (number)
     */
    getHtmlElement: function(id) {
        var result = null;
        for(var index in this.models)
            if((result = this.models[index].getHtmlElement(id)) != null)
                break;
        return result;
    },
    /**
     *
     * @param elementId (number)
     */
    removeHtmlElement: function(elementId) {
        for(var index in this.models)
            this.models[index].removeHtmlElement(elementId);
    },

    /**
     *
     * @param widgetId (number)
     * @param replacerModel (App.Models.HtmlElement)
     * @param replacerHtmlElementContainerId (number) Where to add replacerModel
     */
    removeWidget: function(widgetId, replacerModel, replacerHtmlElementContainerId) {
        for(var index in this.models)
            this.models[index].removeWidget(widgetId, replacerModel, replacerHtmlElementContainerId);
    }
});
