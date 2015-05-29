App.Models.Widget = Backbone.Model.extend({
    defaults: {
        id : 0,
        class : '',
        tag : '',
        children : new App.Collections.collectionWidgetListe()
        
    }
});