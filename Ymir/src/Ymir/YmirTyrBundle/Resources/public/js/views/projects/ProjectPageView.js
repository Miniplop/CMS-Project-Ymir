
var App = App || {};
App.Views.ProjectPageView = Backbone.View.extend({
    
    compteur : null,
    template: _.template($('#list-projet-template').html()),
    
    initialize: function (){
        
    },
    
    render: function() {
        var html = this.template(this.collection.toJSON());
        this.$el.html(html);
        return this;
    }
    
});