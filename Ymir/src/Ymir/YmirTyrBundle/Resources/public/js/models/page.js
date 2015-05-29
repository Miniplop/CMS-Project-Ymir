App.Models.Project = Backbone.Model.extend({

    url : '/page',
    defaults: {
        title: "Page 1",
        archived: false,
        listeWidget: new App.Collections.widgets_liste()
    },
    // Collection de widget contenant uniquement le widget source de la page, celui qui contient tous les autres (body).
    widgetSource : App.Collections.widgets,
    
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