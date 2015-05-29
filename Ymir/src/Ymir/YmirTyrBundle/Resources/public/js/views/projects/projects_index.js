var App = App || {};
// view qui rend la liste des projets
  App.Views.ProjectsIndex = Backbone.View.extend({
        
    template: _.template($("#tpl-menu").html()),
      
    initialize: function() {
        this.render();
    },
      
    render: function(){
        this.$el.html(this.template({}));
    }
      
});    

  
