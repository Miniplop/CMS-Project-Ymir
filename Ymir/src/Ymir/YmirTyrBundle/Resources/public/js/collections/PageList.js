var App = App || {};
App.Models.Page = App.Models.Page || {};
App.Collections.PageList = Backbone.Collection.extend({
    
    url : "/pages",
    model: App.Models.Page
    
});
