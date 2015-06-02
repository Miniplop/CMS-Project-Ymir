var App = App || {};
App.Collections.ProjectPageList = App.Collections.ProjectPageList || {};

App.Models.Project = Backbone.Model.extend({
    
     url : function() {
      var base = 'projects';
      if (this.isNew()) return base; // Url pour CREATE
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/')+ this.id; // Url pour UPDATE or DELETE
    },
    
    parse: function(result) {
    	result.pages = new App.Collections.ProjectPageList(result.pages);
    	return result;
    },
    
    // pages : contient les pages du projet
    // id : contient l'id du projet
    // user : contient l'utilisateur 
    defaults:{
        name: "Default page"
    }
});
