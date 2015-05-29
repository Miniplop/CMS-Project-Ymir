App.Models.Project = Backbone.Model.extend({

    defaults: {
        id : 0,
        title: "Page 1",
        widgetSource: new App.Collections.collectionWidgetListe() // contient uniquement le wdget source (body)
    },
    
    addWidget : function (idParent, widget) {
        this.widgetSource.addWidget(idParent, widget);
    },
    
    removeWidget : function (idWidget) {
        this.widgetSource.removeWidget(idWidget);
    },
    
    moveWidget : function (Widget, idNewParent) {
        this.widgetSource.removeWidget(Widget.get("id"));
        this.widgetSource.addWidget(idNewParent, Widget);
    }
});