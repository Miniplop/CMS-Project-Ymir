define(['text!views/Profil/listeProjets.html.twig'], function(template) { 
//View qui rend un projet
App.Views.ProjectIndex = Backbone.View.extend({

        tagName: "li",

        className:"projet",

        attributes: "",

        template: _.template(template),
        
        // Liste des events possibles
        events:{
        }

        initialize: function() {
            _.bindAll(this,'render'); // Bind this to all view functions
            this.model.bind('change',this.render,this);
            this.model.bind('destroy', this.remove,this);
        },

        render: function() {
            var $el = $(this.el);
            $el.data('listid',this.model.get('id'));
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
});