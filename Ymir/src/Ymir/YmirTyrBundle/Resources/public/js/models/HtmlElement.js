var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
App.Models.HtmlElement = Backbone.Model.extend({
    
    /**
        class: "",
        tag: "",
        value: "",
        htmlChildren: null,
        widgetChildren: null
    */
    
    parse: function (res) {
        console.log("parse html elements");
        res.widgetChildren = new App.Collections.WidgetList(res.widgetChildren, {parse: true});
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