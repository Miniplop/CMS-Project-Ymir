App.Views.CategorieView = Backbone.View.extend({
    template: _.template($('#categorie-template').html()),

    render: function() {
    	console.log(this.model.get('widgets').models);
        var html = this.template(this.model.toJSON(), {widgets: this.model.get('widgets').models});
        this.$el.html(html);
        return this;
    }
});