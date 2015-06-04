var App = App || {};
App.Models.HtmlElement = App.Models.HtmlElement || {};
/**
 *
 */
App.Collections.HtmlElementList = Backbone.Collection.extend({
    model: App.Models.HtmlElement,
    /**
     *
     * @param res
     * @return {*}
     */
    parse: function(res) {
        return res;
    },
    /**
     *
     * @param container_html_element_id
     * @param widget
     */
    addWidget: function(container_html_element_id, widget) {
        for(var index in this.models)
            this.models[index].addWidget(container_html_element_id, widget);
    },
    /**
     *
     * @param id
     */
    getHtmlElement: function(id) {
        var result = null;
        for(var index in this.models)
            if((result = this.models[index].getHtmlElement(id)) != null)
                break;
        return result;
    }
});