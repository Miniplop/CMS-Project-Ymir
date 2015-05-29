var App = App || {};
App.Views.ProjectPageView = Backbone.View.extend({
    
    compteur : null,
    template: _.template($('#list-projet-template').html()),
    
    initialize: function (){
         _.bindAll(this, 'render', 'unrender', 'remove');
        this.collection.bind('remove', this.unrender);
    },
    
    render: function() {
        var html = this.template(this.collection.toJSON());
        this.$el.html(html);
        return this;
    },
    
    unrender: function(){
        this.$el.remove();
    }
    
});