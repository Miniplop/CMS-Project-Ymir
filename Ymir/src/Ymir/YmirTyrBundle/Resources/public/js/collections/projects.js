App.Collections.Projects = Backbone.Collection.extend({

    model: App.Models.Project,
    url : "/projects",
    
    initialize: function(){
        /*var page1 = new App.Models.PageIndex().set("title", "page n°1");
        var page2 = new App.Models.PageIndex().set("title", "page n°2");
        var page3 = new App.Models.PageIndex().set("title", "page n°3");
        var pages1 = new App.Collections.Pages().add([page1,page2]);
        pages1.set("id", "1");
        var pages2 = new App.Collections.Pages({id : "2"});
        pages2.add([page2,page3]);*/
        var pages3 = new App.Collections.Pages({id : "3"});
        pages3.add([page1,page3]);
        var p1 = new App.Models.Project().set("nom" , "Projet 1");
        p1.set("id","1");
        /*p1.set("pages",pages1);*/
        var p2= new App.Models.Project().set("nom" , "Projet 2");
        p2.set("id","2");
        /*p2.set("pages",pages2);*/
        var p3= new App.Models.Project().set("nom" , "Projet 3");
        p3.set("id","3");
        /*p3.set("pages",pages3);*/
        this.add([p1,p2,p3]);
    }

});
