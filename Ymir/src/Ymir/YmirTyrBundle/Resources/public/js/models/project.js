var App = App || {};
App.Models.Project = Backbone.Model.extend({
    
     url : function() {
      var base = 'project';
      if (this.isNew()) return base+'/create'; // Url pour CREATE
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/')        + this.id; // Url pour UPDATE
    },
    
    parse: function(result) {
    	result.pages = new App.Collections.ProjectPageList(result.pages);
    	return result;
    },
    
    defaults:{
        name: "",
        user:"",
        id: null,
        pages: null
    }
});
