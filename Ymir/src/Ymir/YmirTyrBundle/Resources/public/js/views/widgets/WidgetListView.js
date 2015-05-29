var App = App || {};
App.Views.WidgetListView = Backbone.View.extend({
    el: $('.stage'),
    template: _.template($('#widget-template').html()),
    initialize: function () {
        console.log("init view");
        _.bindAll(this, "render");
        this.collection.fetch({ // call fetch() with the following options
               success: this.render // $.ajax 'success' callback
        });
    },
    
    
    render : function () {
        console.log("render view");
        var self = this;
        this.collection.each(function () {
            var html = this.template(this.model.toJSON());
            this.$el.append(html); // on écrit à l'interieur de la balise pointée par el
            console.log(this.$el);
            return this;
        });
    }
});