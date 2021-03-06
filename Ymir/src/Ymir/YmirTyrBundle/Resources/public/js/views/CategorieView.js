var App = App || {};
App.Views.CategorieView = Backbone.View.extend({
    template: null,
    tagName: 'li',
    className: 'accordion-navigation',
    initialize: function() {
        this.template = _.template($('#categorie-template').html());
    },
    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    }
});
