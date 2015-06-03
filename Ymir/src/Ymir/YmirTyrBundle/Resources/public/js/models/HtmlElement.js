var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
App.Models.HtmlElement = Backbone.Model.extend({
    
    /**
        htmlParameters : list of html parameter: {name: "class", value: "class_names"}
        tag : html tag of the html object
        value : value contained in the html object, ex : <div> value </div>. If is not empty, htmlChildren and widgetChildren are empty
        htmlChildren : App.Collections.HtmlElementList
        widgetChildren : App.Collections.WidgetList
    */
    
    parse: function (res) {
        res.widgetChildren = new App.Collections.WidgetList(res.widgetChildren, {parse: true});
        res.htmlChildren = new App.Collections.HtmlElementList(res.htmlChildren, {parse: true});
        // res.htmlParameters = new App.Collections.HtmlParameterList(res.htmlParameters, {parse: true});
        return res;
    },
    addWidget: function(container_html_element_id, widget) {
        if(this.get("id") == container_html_element_id) {
            this.get("widgetChildren").add(widget);
        }
    }
});