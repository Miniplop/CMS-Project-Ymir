var App = App || {};
App.Views.ProjectPageView = App.Views.ProjectPageView || {};

App.Views.ProjectListView = Backbone.View.extend({
  
  events: {
      'click .addProject': 'addProject',
      'click .remove-project': 'removeProject',
      'click .download-project' : 'downloadProject'
  },
      
    initialize: function() {
        // Bind
        _.bindAll(this,'render','render_base','addProject','removeProject');
        this.collection.bind('add',this.render_base);  // Bind l'ajout d'un project    
        this.render_base();      
    },
    
    
    render_base : function (){
        var $el = $(this.el), self = this;
        $el.append("<button class=\"addProject\" class=\"button small radius\">New Project</button><hr>");
        this.render();
        $("#project-panel").html(this.$el);
        return this;
    },
    
    render: function(){
        var $el = $(this.el), self = this;        
        if (this.collection.length != 0){ // Si liste pas vide 
            this.collection.each(function(project) {
                var item = new App.Views.ProjectPageView({ model: project });
                $el.append(item.render().el);
            });
            
        }else{
            $el.append("<div>Aucun projets :/</div>");
        }
        return this;
    },
    
    removeProject: function(e){
        var self = this;
        var id = $(e.currentTarget).data('id'); // Récupération de l'id <3 backbone
        
        this.collection.get(id).destroy({id : id},{
            succes : function(){
                console.log("RemoveProject : "+ id);
                this.collection.remove({id : id}); 
            },
            error : function(){
                new Error({ message : 'Impossible to remove project '});
            }
        });
        
    },
    
    addProject: function(){
        var self = this;
        console.log('addProject');
        var newProject = new App.Models.Project();
        newProject.set("pages",new App.Collections.ProjectPageList());
        newProject.save();
        this.collection.add(newProject.get("Attributes").get("project"));
    },
    
    downloadProject: function(e){
        var id = $(e.currentTarget).data('id');
        console.log("Download "+id);
    }
        
});    

  
