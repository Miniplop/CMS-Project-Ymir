App.Views.CategorieListView = Backbone.View.extend({
    el: $('.toolbar-widget-categorie-list'),
    initialize: function() {
        this.collection.bind("add", this.render, this);
    },

    render: function() {
        var $el = $(this.el)
            , self = this;

          this.collection.each(function(list) {
            var item, sidebarItem;
            item = new App.Views.CategorieView({ model: list });
            $el.append(item.render().el);
          });
            $("#widgets-panel").html(this.$el);
          return this;
    }
});