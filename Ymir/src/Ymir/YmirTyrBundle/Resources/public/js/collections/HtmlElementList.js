var App = App || {};
App.Models.HtmlElement = App.Models.HtmlElement || {};
App.Collections.HtmlElementList = Backbone.Collection.extend({
    model: App.Models.HtmlElement,
    parse: function(res) {
        console.log("parse html element liste");
        console.log(res);
        return res;
    },
    
    buildHtmlElementList: function() {
        var res = "";
        this.each(function (element) {
            res = res + element.buildHtmlElement();
        });
        return res;
    }
});