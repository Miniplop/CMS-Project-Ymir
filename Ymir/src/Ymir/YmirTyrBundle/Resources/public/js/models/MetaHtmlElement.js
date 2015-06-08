var App = App || {};
App.Collections.MetaHtmlElementList = App.Collections.MetaHtmlElementList || {};
/**
 * id : int
 * tag : String that represente the HTML tag (div, li, ul, h1...)
 * metaHtmlParameters : List of HTML parameter :  {"name": "class", "value": "button", mapped: "true"}
 * children : App.Collections.MetaHtmlElementList
 * metaProperties: App.Collections.MetaPropertyList
 * value : Value of the htmlElement. If value is not empty, children is empty
 * acceptAllCategorieAsChildren : true if You can put all widget that you want else only those listed in possibleCategorieAsChildren
 * possibleCategorieAsChildren" : List of widget's categorie that you can place on it
 */
App.Models.MetaHtmlElement = Backbone.Model.extend({
    parse: function(resp) {
        resp.children = new App.Collections.MetaHtmlElementList(resp.children, {parse: true});
        return resp;
    }
});