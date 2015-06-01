var App = App || {};
App.Views.PageView = Backbone.View.extend({
    
    render: function () {        
        var item = new App.Views.WidgetListView({collection : this.model.widgets});
        return this;
    }
});
