var App = App || {};
App.Models.Page = App.Models.Page || {};
App.Collections.PageList = Backbone.Collection.extend({
    
    url : 'http://127.0.0.1:8000/pages', // endroit où aller recup les données sur le serveur
    model: App.Models.Page,
    initialize: function(){},
    
    parse: function(res) {
        return res.pages;
    }
    
});
