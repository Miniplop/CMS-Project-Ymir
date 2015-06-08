var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
App.Collections.HtmlElementList = App.Collections.HtmlElementList || {};
App.Collections.PropertyList = App.Collections.PropertyList || {};

/**
 * htmlParameters : list of html parameter: {name: "class", value: "class_names"}
 * tag : html tag of the html object
 * value : value contained in the html object, ex : <div> value </div>. If is not empty, htmlChildren and widgetChildren are empty
 * htmlChildren : App.Collections.HtmlElementList
 * widgetChildren : App.Collections.WidgetList
 * properties : App.Collections.PropertyList
 */
App.Models.HtmlElement = Backbone.Model.extend({
    /**
     *
     * @param res
     * @return {*}
     */
    parse: function (res) {
        res.widgetChildren = new App.Collections.WidgetList(res.widgetChildren, {parse: true});
        res.htmlChildren = new App.Collections.HtmlElementList(res.htmlChildren, {parse: true});
        res.properties = new App.Collections.PropertyList(res.properties, {parse: true});
        return res;
    },
    /**
     *
     * @param container_html_element_id
     * @param widget
     */
    addWidget: function(container_html_element_id, widget) {
        if(this.get("id") == container_html_element_id) {
            this.get("widgetChildren").add(widget);
        }
    },
    /**
     *
     * @param id
     * @return {*}
     */
    getHtmlElement: function(id) {
        if(this.get("id") == id)
            return this;
        var result = this.get("widgetChildren").getHtmlElement(id);
        if(result == null)
            result = this.get("htmlChildren").getHtmlElement(id);
        return result;
    },
    /**
     *
     * @param options
     * @return {*}
     */
    toJSON: function(options) {
        var json =  _.clone(this.attributes);
        json.htmlChildren = this.get("htmlChildren").toJSON(options);
        json.widgetChildren = this.get("widgetChildren").toJSON(options);
        json.properties = this.get("properties").toJSON(options);
        return json;
    },
    /**
     *
     * @param elementId
     */
    removeHtmlElement: function(elementId) {
        if(elementId == this.get("id")) {
            console.log("removing : ");
            console.log(this);
            this.collection.remove(this);
        }
        else {
            this.get("htmlChildren").removeHtmlElement(elementId);
            this.get("widgetChildren").removeHtmlElement(elementId);
        }
    }
});