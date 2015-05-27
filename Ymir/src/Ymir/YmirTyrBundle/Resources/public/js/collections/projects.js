App.Collections.Projects = Backbone.Collection.extend({

  model: project,
    url_database:"",
    parse : function(res)
    {
        console.log('response inside parse' + res);
        return res;
    }

});
