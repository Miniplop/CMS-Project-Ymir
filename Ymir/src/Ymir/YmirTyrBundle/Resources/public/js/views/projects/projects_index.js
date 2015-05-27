
// view qui rend la liste des projets
  App.Views.ProjectsIndex = Backbone.View.extend({
        
        el:".list-projet", 
      
        tagName:"ul", 

        className :"projets", 

        attributes:"",
      
        events:{
        },


        initialize: function() {
            _.bindAll(this,'render'); // Bind this to all view functions
            this.collection = new App.Collections.Projects();
            this.collection.on('add',this.render,this);
            this.collection.fetch();
        },

        //this creates new rows in the table for each model in the collection
        render: function() {
             var $el = $(this.el), self = this; // Remarque du prof
            // Console print
            console.log(this.el);
            console.log(this.$el);
            //this.$el.empty(); // Erreur si vide
            
           this.collection.each(function(projet){
               var projetView = new projet_view({model:projet});
               self.$el.append(App.Views.ProjectIndex.el);
           });
            return this;
        };
      
});    

  
