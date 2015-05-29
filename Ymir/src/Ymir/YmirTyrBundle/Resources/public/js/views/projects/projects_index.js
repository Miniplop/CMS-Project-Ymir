
// view qui rend la liste des projets
  App.Views.ProjectsIndex = Backbone.View.extend({

      el: $('.project-list'),

      
      events: {
          'click a#download':'download', // affichage des pages
          'click a#remove':'removeItem', // Suppression d'un projets
          'click a#add' : 'addItem' // Ajout d'un projet
      },
      
    initialize: function() {
        // Bind
      //_.bindAll(this,'render','addItem','removeItem','activItem');
        this.compteur = 0;
    },
      
    render: function(){
         var $el = $(this.el), self = this;
        this.collection.each(function(project) {
        	var item = new App.Views.PageIndex({ collection: project });
            $el.append(item.render().el);
        });
        $("#project-panel").html(this.$el);
        return this;
    },
    
    addItem: function(){
        console.log("Add");
    },
    
    removeItem: function(){
        console.log("Remove");
    },
        
    download: function(){
      console.log("Download");
  }
        
});    

  
