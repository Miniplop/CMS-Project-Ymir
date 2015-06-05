var App = App || {};
App.Views.CategorieView = App.Views.CategorieView || {};
/**
 *
 */
App.Views.CategorieListView = Backbone.View.extend({
    el: $('.toolbar-meta-widget-categorie-list'),
    /**
     *
     */
    initialize: function() {
        _.bindAll(this, "render");
    	this.collection.fetch({ // call fetch() with the following options
    	       success: this.render // $.ajax 'success' callback
    	});

    },
    /**
     *
     * @return {App.Views.CategorieListView}
     */
    render: function() {
        var $el = $(this.el);
        $el.empty();
        this.collection.each(function(categorie) {
        	var item = new App.Views.CategorieView({ model: categorie });
            $el.append(item.render().el);
        });
        $("#meta-widgets-panel").html(this.$el);
        return this;
    }
});
