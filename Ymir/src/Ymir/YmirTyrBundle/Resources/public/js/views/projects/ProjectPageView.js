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
		this.model.bind("add", this.render);
        this.model.bind("change", this.render);
		this.model.bind("remove", this.unrender);
    },
    
    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    },
    
    removePage: function (e){
         var id = $(e.currentTarget).data('id'); // Récupération de l'id <3 backbone
         var page = this.model.get("pages").get(id);
         page.destroy({},{
              success : function(){
                 this.model.get("pages").remove(id); //
             },
              error : function(){
             }
         });
    },
    
    
    
    addPage: function(){
        var newPage = new App.Models.ProjectPage();
        newPage.save(null,{
            success : function (response){
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