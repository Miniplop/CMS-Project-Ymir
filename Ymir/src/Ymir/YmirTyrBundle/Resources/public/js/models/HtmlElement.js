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
        return res;
    },
    
    buildHtmlElement: function() {
        /*if(this.widgetChildren.isEmpty())
            return null;*/
        var cl = this.get("class");
        var tag = this.get("tag");
        var value = this.get("value");
        var res = "<" + tag ;
        if (cl !== "")
            res = res + " class=\"" + cl + "\"";
        res = res + ">";
        if (value != "")
            res = res + value;
        if (this.get("widgetChildren").length > 0)
            res = res + this.get("widgetChildren").buildJQueryObject();
        res = res + "</" + tag + "<";
        
        return res;
    }
});