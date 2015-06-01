var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
App.Models.Page = Backbone.Model.extend({

    defaults: {
        id : 0,
        title: "Page 1",
        widgets: null, // contient uniquement le wdget source (body)
    },
    
    parse: function (result) {
        result.widgets = new App.Collections.WidgetList(result.widgets);
        this.widgets = result.widgets;
        return result;
    },
    
    addWidget : function (idParent, widget) {
        this.widgets.addWidget(idParent, widget);
    },
    
    removeWidget : function (idWidget) {
        this.widgets.removeWidget(idWidget);
    },
    
    moveWidget : function (widget, idNewParent) {
        this.widgets.removeWidget(widget.get("id"));
        this.widgets.addWidget(idNewParent, Widget);
    }
});