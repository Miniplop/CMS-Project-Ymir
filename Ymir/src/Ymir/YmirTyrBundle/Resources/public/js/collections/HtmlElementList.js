var App = App || {};
App.Models.HtmlElement = App.Models.HtmlElement || {};
App.Collections.HtmlElementList = Backbone.Collection.extend({
    model: App.Models.HtmlElement,
    parse: function(res) {
        console.log("parse html element liste");
        console.log(res);
        return res;
    },
    addWidget: function(container_html_element_id, widget) {
        for(var index in this.models)
            this.models[index].addWidget(container_html_element_id, widget);
    }
});