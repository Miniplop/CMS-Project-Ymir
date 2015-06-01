var App = App || {};
App.Views.ProjectPageView = Backbone.View.extend({
    
    compteur : null,
    template: _.template($('#list-projet-template').html()),
    
    events:{
        'click .add-page' : 'addPage',
        'click .remove-page' : 'removePage'
    },
    
    initialize: function (){
         _.bindAll(this, 'render','unrender');
        this.model.bind('update', this.render); // Bind l'update
        this.model.bind('remove', this.unrender);
    },
    
    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    },
    
    removePage: function (){
    },
    
    
    
    addPage: function(){
        var newPage = new App.Models.ProjectPage();
        newPage.save({},{
            success : function (){
                var listePage = this.model.get("pages");
                listePage.add(newPage);
                this.model.set("pages",listePage); // Rappelle l'events "update"
            }, 
            
            error : function(){
                 new Error({ message : 'Impossible to save page'});      
            },
            
        });
    },
    
    unrender: function(){
        var self = this;
        self.$el.remove();
    }
    
});