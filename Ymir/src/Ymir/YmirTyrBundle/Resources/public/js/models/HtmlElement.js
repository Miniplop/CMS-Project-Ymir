var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
App.Collections.HtmlElementList = App.Collections.HtmlElementList || {};
App.Collections.PropertyList = App.Collections.PropertyList || {};

/**
 * htmlParameters : list of html parameter: {name: "class", value: "class_names", mapped: "put it in generated html"}
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
        _.sortBy(res.widget_children, "order");
        _.sortBy(res.html_children, "order");
        res.widgetChildren = new App.Collections.WidgetList(res.widget_children, {parse: true});
        res.htmlChildren = new App.Collections.HtmlElementList(res.html_children, {parse: true});
        res.properties = new App.Collections.PropertyList(res.properties, {parse: true});
        res.htmlParameters = res.html_parameters;
        delete res.html_parameters;
        delete res.html_children;
        delete res.widget_children;
        return res;
    },
    /**
     *
     * @param container_html_element_id
     * @param widget
     */
    addWidget: function(container_html_element_id, widget) {
        if(this.get("id") == container_html_element_id) {
            this.get("widgetChildren").add(widget, {at: widget.get('order') - 1});
        } else {
            this.get("widgetChildren").addWidget(container_html_element_id, widget);
            this.get("htmlChildren").addWidget(container_html_element_id, widget);
        }
    },
    /**
     *
     * @param id (number) id of the widget to return
     * @return {*}
     */
    getWidget: function(id) {
        var result = this.get("widgetChildren").getWidget(id);
        if(result == null)
            result = this.get("htmlChildren").getWidget(id);
        return result;
    },
    /**
     *
     * @param id (number)
     * @return {*}
     */
    getHtmlElement: function(id) {
        if(this.get("id") == id)
            return this;
        else {
            var result = this.get("widgetChildren").getHtmlElement(id);
            if(result == null)
                result = this.get("htmlChildren").getHtmlElement(id);
            return result;
        }
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
     * @param elementId (number)
     */
    removeHtmlElement: function(elementId) {
        if(elementId == this.get("id")) {
            this.collection.remove(this);
        }
        else {
            this.get("htmlChildren").removeHtmlElement(elementId);
            this.get("widgetChildren").removeHtmlElement(elementId);
        }
    },

    /**
     *
     * @param widgetId (number)
     * @param replacerModel (App.Models.HtmlElement)
     * @param replacerHtmlElementContainerId (number) Where to add replacerModel
     */
    removeWidget: function(widgetId, replacerModel, replacerHtmlElementContainerId) {
        if(this.get("id") == replacerHtmlElementContainerId) {
            this.get("htmlChildren").add(replacerModel);
        }
        this.get("htmlChildren").removeWidget(widgetId, replacerModel, replacerHtmlElementContainerId);
        this.get("widgetChildren").removeWidget(widgetId, replacerModel, replacerHtmlElementContainerId);
    },
    /**
     *
     * @param order
     * @return {App.Models.Widget|App.Models.HtmlElement}
     */
    getElementAtOrder : function(order) {
        for(var index in this.get("widgetChildren").models) {
            if(this.get("widgetChildren").models[index].get("order") == order)
                return this.get("widgetChildren").models[index];

            if(this.get("widgetChildren").models[index].get("order") > order) // ordred list by order
                break;
        }
        for(var index in this.get("htmlChildren").models) {
            if(this.get("htmlChildren").models[index].get("order") == order)
                return this.get("htmlChildren").models[index];

            if(this.get("htmlChildren").models[index].get("order") > order) // ordred list by order
                break;
        }
        console.error("Invalid order (" + order + ") in html element : " + this.get("id"));
        return null;
    },
    /**
     *
     * @return {number} size of widgetChildren + size of htmlChildren
     */
    getNbChildren : function() {
        return this.get("widgetChildren").size() + this.get("htmlChildren").size();
    }
});