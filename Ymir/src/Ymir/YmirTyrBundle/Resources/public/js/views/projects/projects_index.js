
// view qui rend la liste des projets
  App.Views.ProjectsIndex = Backbone.View.extend({

      el: $('#menu'),
      template: _.template($('#list-projet-template').html()),
      
      events: {
          'click a#download':'download', // affichage des pages
          'click a#remove':'removeItem', // Suppression d'un projets
          'click a#add' : 'addItem' // Ajout d'un projet
      },
      
    initialize: function() {
        console.log("ta mére");
        // Bind
      //_.bindAll(this,'render','addItem','removeItem','activItem');
        this.compteur = 0;
    },
      
    render: function(){
        var self = this;
        this.
        this.$el.append("<ul class=\"accordion\" data-accordion></ul>");
         for(var i=0; i<this.collection.length; i++) {
            self.renderItem(this.collection.at(i));
             this.compteur=0;
         }
        return this;
    },
      
    renderItem: function(item){
        this.el = $('.accordion');
        $('.accordion').append("<li id= \"navigationfor"+item.get('id')+"\" class =\"accordion-navigation\"></li>"); // Le nom du projet
        this.el = $("#navigationfor"+item.get('id'));
        $(this.el).append("<a  href=\"#panel"+item.get('id')+this.compteur+"\">\n<ul class=\"inline-list\">"+item.get('nom')+"</ul></a>"); // Nom du projet
         // Remplissage de la barre accordéon
        $('.inline-list').append("<li><a href=\"#\"><i class=\"fi-download\"></i></a></li>"
					            +"<li><a href=\"#remove\"><i class=\"fi-x\"></i></a></li></li>"
                                );
        $(this.el).append("<div id=\"panel"+item.get('id')+this.compteur+"\" class=\"content\"></div>");
        /*var html = new App.Views.PageIndex({collection : item.get('pages')});
        $('#panel'+item.get('id')+this.compteur).append(html.render().el);*/
        return this;
    },
    
    addItem: function(){
        console.log("Add");
    },
    
    removeItem: function(){
        console.log("Remove");
    },
        
    download: function(){}{
      console.log("Download");
  }
        
});    

  
