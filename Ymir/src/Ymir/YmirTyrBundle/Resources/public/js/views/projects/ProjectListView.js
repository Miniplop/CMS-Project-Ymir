var App = App || {};
App.Views.ProjectPageView = App.Views.ProjectPageView || {};

App.Views.ProjectListView = Backbone.View.extend({
  
  events: {
      'click .addProject': 'addProject',
      'click .remove-project': 'removeProject',
      'click .download-project' : 'downloadProject',
  },
      
    initialize: function() {
        // Bind
        _.bindAll(this,'render','render_main','addProject','removeProject');
        this.model.bind('add',this.render_main);  // Bind l'ajout d'un project    
        this.render_main();      
    },
    
    render_main : function (){
        var $el = $(this.el), self = this;
        $(this.el).empty();
        $el.append("<button class=\"addProject\" class=\"button small radius\">New Project</button><hr>");
        this.render();
        $("#project-panel").append(this.$el);
        return this;
    },
    
    render: function(){
        var $el = $(this.el), self = this;        
        if (this.model.length != 0){ // Si liste pas vide 
            this.model.each(function(project) {
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
        
        this.model.get(id).destroy({id : id},{
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
        var newProject = new App.Models.Project();
        var resp = newProject;
        newProject.set("pages",new App.Collections.ProjectPageList());
        newProject.save(); // Faut que ca me retourne juste l'id le reste ballec
        this.model.fetch();
       
    },
    
    
    downloadProject: function(e){
        var id = $(e.currentTarget).data('id');
        console.log("Download "+id);
    }
        
});    

  
