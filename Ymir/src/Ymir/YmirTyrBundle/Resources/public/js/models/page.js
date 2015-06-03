var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
/**
 * parameters :
 * idGenerator: int used to create new ids
 * ===============
 * attributes :
 * id : int
 * title : String, title of the page
 * widgets : List of widget contained in the page
 */
App.Models.Page = Backbone.Model.extend({
    url : 'http://127.0.0.1/ymir/Ymir/web/app_dev.php/stage',
    defaults: {
        idGenerator: 0
    },
    
    parse: function (result) {
        console.log("parse Page");
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
    },
    getNewId: function() {
        this.idGenerator++;
        return this.idGenerator;
    }
});