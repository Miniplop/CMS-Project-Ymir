var App = App || {};
App.Models.Widget = App.Models.Widget || {};
App.Collections.WidgetList = Backbone.Collection.extend({
    widgetLocation : "#stage",
    model: App.Models.Widget,
    
    parse: function (res) {
        return res;
    },
    addWidget : function (container_html_element_id, widget) {
        for(var index in this.models) {
            this.models[index].addWidget(container_html_element_id, widget);
        }
        // TODO : update bd
    }
});
