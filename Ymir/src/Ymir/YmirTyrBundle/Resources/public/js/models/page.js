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
        
    /**
     *
     */
    initialize: function() {
        this.urlRoot = App.Urls.page+"pages/";
        this.idWidgetGenerator = 0;
        this.idHtmlElementGenerator = 0;
    },
    /**
     *
     * @param result
     * @return {*}
     */
    parse: function (res) {
        _.sortBy(res.widgets, "order");
        res.widgets = new App.Collections.WidgetList(res.widgets, {parse: true});
        return res;
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
        if(container_html_element_id == null){
            this.get("widgets").add(widget, {at: widget.get('order') - 1});
        }
        else {
            this.get("widgets").addWidget(container_html_element_id, widget);
        }
    },
    /**
     *
     * @param id (number)
     * @return {*}
     */
    getHtmlElement: function(id) {
        return this.get("widgets").getHtmlElement(id);
    },
    /**
     *
     * @param id (number) id of the widget to return
     * @return {*}
     */
    getWidget: function(id) {
        return this.get("widgets").getWidget(id);
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
    },
    /**
     *
     * @param elementId (number)
     */
    removeHtmlElement: function(elementId) {
        this.get("widgets").removeHtmlElement(elementId);
    },
    /**
     *
     * @param widgetId (number)
     * @param replacerModel (App.Models.HtmlElement)
     * @param replacerHtmlElementContainerId (number) Where to add replacerModel
     */
    removeWidget: function(widgetId, replacerModel, replacerHtmlElementContainerId) {
        this.get("widgets").removeWidget(widgetId, replacerModel, replacerHtmlElementContainerId);
    }
});