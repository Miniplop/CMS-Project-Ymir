var App = App || {};
App.Views.ProjectPageView = App.Views.ProjectPageView || {};

App.Views.ProjectListView = Backbone.View.extend({

  el: $('#button-add-project'),

      
  events: {
      'click button.addProject': 'addProject',
      'click .remove-project': 'removeProject',
      'click .download-project' : 'downloadProject'
  },
      
    initialize: function() {
        // Bind
        _.bindAll(this,'render','addProject','removeProject');
        this.collection.bind('add', this.render);  // Bind l'ajout d'un project    
        this.render();      
    },
      
    render: function(){
        var $el = $(this.el), self = this;
        
        $el.append("<button class=\"addProject\" class=\"button small radius\">New Project</button>");
        el = $('.project-list');
        if (this.collection.length != 0){ // Si liste pas vide 
            this.collection.each(function(project) {
                var item = new App.Views.ProjectPageView({ model: project });
                $el.append(item.render().el);
            });
            $("#project-panel").html(this.$el);
        }else{
           $el.append("<div>Aucun projets :/</div>"); 
        }
        return this;
    },
    
    removeProject: function(e){
        var self = this;
        var id = $(e.currentTarget).data('id'); // Récupération de l'id <3 backbone
        console.log("RemoveProject : "+ id);
        this.collection.get(id).destroy({id : id},{
            succes : function(){
                this.collection.remove({id : id});
            },
            error : function(){
                new Error({ message : 'Impossible to remove project '});
            }
        });
        
    },
    
    addProject: function(){
        var self = this;
        console.log("AddProject");
        var newProject = new App.Models.Project();
        // TODO : Ajouter une page par défault
        newProject.save({name : "Default Project"},{
            success: function (){
                self.collection.add(newProject.project); // rappelle render par le bind d'add
            },
            error: function (){
                 new Error({ message : 'Impossible to save project '});
            }
            });
       
    },
    
    downloadProject: function(){
        var id = $(ev.currentTarget).data('id');
        console.log("Download "+id);
    }
        
});    

  
