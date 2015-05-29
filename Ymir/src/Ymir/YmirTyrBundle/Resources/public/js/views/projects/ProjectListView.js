var App = App || {};
App.Views.ProjectPageView = App.Views.ProjectPageView || {};

App.Views.ProjectListView = Backbone.View.extend({

  el: $('.project-list'),

      
  events: {
      
      
      'click a#download/:id':'download', // affichage des pages
      'click a#remove/:id':'removeItem', // Suppression d'un projets
      'click a#addproject/:id' : 'addItem' // Ajout d'un projet
      
      
  },
      
    initialize: function() {
        // Bind
        _.bindAll(this,'render','addItem','removeItem','download');
        
    },
      
    render: function(){
        var $el = $(this.el), self = this;
        this.collection.each(function(project) {
        	var item = new App.Views.ProjectPageView({ collection: project });
            $el.append(item.render().el);
        });
        $("#project-panel").html(this.$el);
        return this;
    },
    
    addItem: function(id){
        console.log("Add "+id);
    },
    
    removeItem: function(id){
        console.log("Remove "+id);
      /*  this.collection.remove(this.collection.where({id: id}));*/
    },
        
    download: function(id){
      console.log("Download "+id);
  }
        
});    

  
