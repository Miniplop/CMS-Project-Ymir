var App = App || {};
App.Views.PropertyListView = App.Views.PropertyListView || {};
App.Views.CategorieListView = App.Views.CategorieListView || {};

App.Views.CreativeView = Backbone.View.extend({
    initialize: function() {
        _.bindAll(this, "render");
        App.categories = new App.Collections.CategorieList();
        this.categoriesView = new App.Views.CategorieListView({collection: App.categories});
        this.propertyView = null;
    },

    render: function() {
        this.categoriesView.render();
        if(this.propertyView != null)
            this.propertyView.render();
        return this;
    },
    propertiesView: function(properties) {
        this.propertyView = new App.Views.PropertyListView({ collection: properties });
        this.render();
        return this;
    },
    cancelPropertiesView: function() {
        if(this.propertyView != null) {
            this.propertyView.remove();
            this.propertyView = null;
        }
        return this;
    }
});
