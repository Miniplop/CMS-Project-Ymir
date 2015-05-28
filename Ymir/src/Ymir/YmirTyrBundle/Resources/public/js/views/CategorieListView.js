App.Views.CategorieListView = Backbone.View.extend({
    el: $('.toolbar-widget-categorie-list'),
    initialize: function() {
        this.collection.on("add", this.render, this);
    },

    render: function() {
        var $el = $(this.el), self = this;

        this.collection.each(function(categorie) {
        	var item = new App.Views.CategorieView({ model: categorie });
            $el.append(item.render().el);
        });
        $("#widgets-panel").html(this.$el);
        return this;
    }
});