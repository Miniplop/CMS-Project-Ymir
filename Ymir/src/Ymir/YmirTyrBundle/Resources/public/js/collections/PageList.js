var App = App || {};
App.Models.Page = App.Models.Page || {};
App.Collections.PageList = Backbone.Collection.extend({
    
    url : 'http://127.0.0.1/ymir/Ymir/web/app_dev.php/pages', // endroit où aller recup les données sur le serveur
    model: App.Models.Page,
    initialize: function(){
        //collectionPage.fetch(); // recupération des données
    },
    
    archive: function(archived, index) {
        this.models[index].set("archived", archived);
    }
});
