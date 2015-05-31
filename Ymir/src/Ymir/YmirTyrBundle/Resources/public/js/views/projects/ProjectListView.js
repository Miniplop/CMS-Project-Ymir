var App = App || {};
App.Views.ProjectPageView = App.Views.ProjectPageView || {};

App.Views.ProjectListView = Backbone.View.extend({

  el: $('.project-list'),

      
  events: {
      
      'click div#addProject':'addProject',
      'click #download/:id':'download', // affichage des pages
      'click #remove/:id':'removeItem', // Suppression d'un projets
      'click #addproject/:id' : 'addItem' // Ajout d'un projet
      
      
  },
      
    initialize: function() {
        // Bind
        _.bindAll(this,'addProject','render','addItem','removeItem','download');
        
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
    
    addProject: function(){
        console.log("AddProject ");
        App.Models.Project.create();
        //this.collection.add();
    },
    
    removeItem: function(id){
        console.log("Remove "+id);
      /*  this.collection.remove(this.collection.where({id: id}));*/
    },
        
    download: function(id){
      console.log("Download "+id);
  }
        
});    

  
