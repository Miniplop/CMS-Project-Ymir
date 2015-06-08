var App = App || {};
App.Models.ProjectPage = Backbone.Model.extend({ 

    url : function() {
      var base = 'pages';
      if (this.isNew()) return base; // Url pour CREATE
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/')+ this.id; // Url pour UPDATE or DELETE
    },


    parse : function(result){
      return result.project;
    },
  // id : id de la page
  defaults: {
        title: "Default page"
  } 
});
