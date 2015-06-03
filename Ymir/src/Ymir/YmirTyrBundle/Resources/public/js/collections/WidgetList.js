var App = App || {};
App.Models.Widget = App.Models.Widget || {};
App.Collections.WidgetList = Backbone.Collection.extend({
    widgetLocation : "#stage",
    // Une collection de page contient des models de page
    model: App.Models.Widget,
    
    parse: function (res) {
        console.log("parse Widgets List");
        return res;
    },

    addWidget : function (idParent, widget) {
        for (var i = 0; i < this.length; i++){
            if (this.at(i).get("id") == idParent){
                this.at().get("children").push(widget);
                return true;
            }
            if (this.at(i).get("children").addWidget(idParent,widget))
                return true;            
        }
        return false;
        // TODO : update bd
    },
    
    removeWidget : function (idWidget) {
        var find = false;
        for (var i = 0; i < this.length; i++){
            if (this.at(i).get("id") == idWidget){
                find = true;
                break; 
            }
            if (this.at(i).get("children").removeWidget(idWidget))
                return true;
        }
        if (!find)
            return false;
        
        
        for (var i = 0; i < this.get(idWidget).get("children").length; i++){
            this.removeWidget(idWidget,this.get(idWidget).get("children").at(i).get("id"));   
        }
        this.remove(idWidget);
        
        // TODO : update bd
        // TODO: remove bd
        return true;
    }    
});
