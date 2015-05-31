var App = App || {};
App.Views.ProjectPageView = App.Views.ProjectPageView || {};

App.Views.ProjectListView = Backbone.View.extend({

  el: $('.project-list'),

      
  events: {
      
      'click .addProject':'addProject'      
  },
      
    initialize: function() {
        // Bind
        //_.bindAll(this,'addProject','render');
        
    },
      
    render: function(){
        var $el = $(this.el), self = this;
        
        $el.append("<button class=\"addProject\" class=\"button small radius\">New Project</button>");
		
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
        console.log("AddProject");
        //App.Models.Project.create();
        /*this.collection.add();*/
    },
    
    removeItem: function(id){
        console.log("Remove "+id);
      /*  this.collection.remove(this.collection.where({id: id}));*/
    },
        
    download: function(id){
      console.log("Download "+id);
  }
        
});    

  
