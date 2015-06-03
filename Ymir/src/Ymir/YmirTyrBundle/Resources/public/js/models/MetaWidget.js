var App = App || {};
App.Collections.MetaHtmlElementList = App.Collections.MetaHtmlElementList || {};
/**
 * id : int
 * name : String : meta widget name
 * htmlPreview : html string that represente html for preview the widget
 * metaHtmlElements : App.Collections.MetaHtmElementList
 */
App.Models.MetaWidget = Backbone.Model.extend({
    parse: function(result) {
        result.metaHtmlElements = new App.Collections.MetaHtmlElementList(result.metaHtmlElements, {parse: true});
        return result;
    }
});