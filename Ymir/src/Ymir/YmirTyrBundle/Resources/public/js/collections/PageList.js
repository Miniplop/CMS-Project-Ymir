var App = App || {};
App.Models.Page = App.Models.Page || {};
App.Collections.PageList = Backbone.Collection.extend({
    
    url : 'pages', // endroit où aller recup les données sur le serveur
    model: App.Models.Page,
    initialize: function(){},
    
    parse: function(res) {
        
        return {
            id : res.id,
            name : res.name,
            pages :res.pages
        };
    }    
});
