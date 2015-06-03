var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
/**
 * parameters :
 * idGenerator: int used to create new ids
 * ===============
 * attributes :
 * id : int
 * title : String, title of the page
 * widgets : List of widget contained in the page
 */
App.Models.Page = Backbone.Model.extend({
    url : 'http://127.0.0.1/ymir/Ymir/web/app_dev.php/stage',

    initialize: function() {
        this.idWidgetGenerator = 0;
        this.idHtmlElementGenerator = 0;
    },
    parse: function (result) {
        result.widgets = new App.Collections.WidgetList(result.widgets, {parse: true});
        return result;
    },
    toJSON: function(options) {
        var json =  _.clone(this.attributes);
        json.widgets = this.get("widgets").toJSON(options);
        return json;
    },
    
    addWidget : function (container_html_element_id, widget) {
        if(container_html_element_id == null)
            this.get("widgets").add(widget);
        else
            this.get("widgets").addWidget(container_html_element_id, widget);
    },
    getNewWidgetId: function() {
        this.idWidgetGenerator++;
        return this.idWidgetGenerator;
    },
    getNewHtmlElementId: function() {
        this.idHtmlElementGenerator++;
        return this.idHtmlElementGenerator;
    }
});