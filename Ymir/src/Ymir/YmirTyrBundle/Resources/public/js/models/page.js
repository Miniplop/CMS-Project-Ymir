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
        
    set_url : function() {
      var base = 'pages';
      if (this.isNew()) this.url = base; // Url pour CREATE
      this.url = base + (base.charAt(base.length - 1) == '/' ? '' : '/')+ this.id; // Url pour UPDATE or DELETE
    },
    /**
     *
     */
    initialize: function() {
        this.url = App.Urls.page;
        this.idWidgetGenerator = 0;
        this.idHtmlElementGenerator = 0;
    },
    /**
     *
     * @param result
     * @return {*}
     */
    parse: function (result) {
        result.widgets = new App.Collections.WidgetList(result.widgets, {parse: true});
        return result;
    },
    /**
     *
     * @param options
     * @return {*}
     */
    toJSON: function(options) {
        var json =  _.clone(this.attributes);
        json.widgets = this.get("widgets").toJSON(options);
        return json;
    },
    /**
     *
     * @param container_html_element_id
     * @param widget
     */
    addWidget : function (container_html_element_id, widget) {
        if(container_html_element_id == null)
            this.get("widgets").add(widget);
        else
            this.get("widgets").addWidget(container_html_element_id, widget);
    },
    /**
     *
     * @param id
     * @return {*}
     */
    getHtmlElement: function(id) {
        return this.get("widgets").getHtmlElement(id);
    },
    /**
     *
     * @return {number}
     */
    getNewWidgetId: function() {
        this.idWidgetGenerator++;
        return this.idWidgetGenerator;
    },
    /**
     *
     * @return {number}
     */
    getNewHtmlElementId: function() {
        this.idHtmlElementGenerator++;
        return this.idHtmlElementGenerator;
    }
});