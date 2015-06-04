var App = App || {};
App.Models.Widget = App.Models.Widget || function() {};
App.Collections.WidgetList = App.Collections.WidgetList ||  function () {};
App.Collections.HtmlElementList = App.Collections.HtmlElementList ||  function () {};
App.Models.HtmlElement = App.Models.HtmlElement ||  function () {};
(function () {
    function PageBuilder(page) {
        _.bindAll(this, "initialize");
        if (page !== null) {
            this.page = page;
            this.page.fetch({ success: this.initialize });
        } else {
            this.page = new App.Models.Page();
            this.page.set('widgets', new App.Collections.WidgetList());
            this.initialize();
        }
    };
    _.extend( PageBuilder.prototype, {
        initialize: function() {
            var thisObject = this; // closure MAGGLE
            var widgets = this.page.get("widgets");
            for(var i in widgets.models) {
                if (this.page.idWidgetGenerator < widgets.models[i].get("id"))
                    this.page.idWidgetGenerator = widgets.models[i].get("id");
                
                var elements = this.buildJqueryWidgetFromWidget(widgets.models[i], false, null);
                var tabletElement = this.buildJqueryWidgetFromWidget(widgets.models[i], false, null);
                var mobileElement = this.buildJqueryWidgetFromWidget(widgets.models[i], false, null);
                
                for (var index in elements)
                    this.addToDOM(elements[index], $(".stage"), widgets.models[i]);

                var mobile = $("#mobile");
                var tablet = $("#tablet");
                mobile.ready(function() {
                    console.log(App.Urls.css);
                    mobile.contents().find("head").append("<link rel=\"stylesheet\" href=\"/css/vendor_foundation.min_2.css\" />");
                    mobile.contents().find("head").append("<link rel=\"stylesheet\" href=\"/css/vendor_foundation-icons_3.css\" />");
                    for (var index in mobileElement)
                        thisObject.addToDOM(mobileElement[index], mobile.contents().find("body"), widgets.models[i]);
                });
                tablet.ready(function() {
                    tablet.contents().find("head").append("<link rel=\"stylesheet\" href=\"/css/vendor_foundation.min_2.css\" />");
                    tablet.contents().find("head").append("<link rel=\"stylesheet\" href=\"/css/vendor_foundation-icons_3.css\" />");
                    for (var index in tabletElement)
                        thisObject.addToDOM(tabletElement[index], tablet.contents().find("body"), widgets.models[i]);
                });
            }
        },
        /**
         *
         * @param mWidget : App.Models.MetaWidget : object added
         * @param receiver : {*|jQuery|HTMLElement} that receives the widget
         * @description
         *      Build the JQuery widget from the meta widget structure
         *      Add it to the App.Models.Page tree
         *      add it to the DOM
         */
        addWidgetFromMeta: function (mWidget, receiver) {
            var container_html_element_id = receiver.data("html-element-id");
            var newOrder = null;
            // build the App.Models.Widget and add it to the page tree
            var widget = this.buildWidgetModelFromMeta(mWidget);
            this.page.addWidget(container_html_element_id, widget);
            // build JQuery Objects and add it to the dom
            var htmlsWidget = this.buildJqueryWidgetFromWidget(widget, true, null);

            for (var index in htmlsWidget)
                this.addToDOM(htmlsWidget[index], receiver, widget);
        },


        /**
         * @param containerParameters: Array
         *          meta_widget: App.Models.MetaWidget
         *          nb_column: int (number of columns)
         *          columnsSizes array (sizes of columns)
         *          parent: {*|jQuery|HTMLElement} (object where container is dropped)
         *          isRow: boolean (specify if the container is a row)
         * @description
         *      Build the JQuery container
         *      Add it to the App.Models.Page tree
         *      add it to the DOM
         */
        addContainer: function (containerParameters) {
            var widget = new App.Models.Widget();
            widget.set('id', this.page.getNewWidgetId());
            widget.set('meta_widget_id', containerParameters.meta_widget.get('id'));
            widget.set('htmlElements', new App.Collections.HtmlElementList());
            var htmlContainer = containerParameters.meta_widget.get("metaHtmlElements");
            var htmlElement = this.buildHtmlElementModelFromMeta(htmlContainer.models[0]);


            var container = $('<' + htmlContainer.models[0].get('tag') + '>');
            if (containerParameters.isRow)
                container.addClass('row');
            for (var i = 1; i <= containerParameters.nb_column; i++) {
                // build sub div HtmlElement that will be replaced when we put a widget on it
                var htmlElementChild = new App.Models.HtmlElement();
                htmlElementChild.set('id', htmlElement.get('id'));
                htmlElementChild.set('tag', 'div');
                htmlElementChild.set('value', '');
                htmlElementChild.set('order', i);
                htmlElementChild.set('htmlParameters', []);
                htmlElementChild.get('htmlParameters').push({name: "data-info", value: "replaceable"});
                htmlElementChild.get('htmlParameters').push({name: "data-order", value: i});
                if (i == containerParameters.nb_column)
                    htmlElementChild.get('htmlParameters').push({
                        name: "class",
                        value: "large-" + containerParameters.columnsSizes[i] + " columns end"
                    });
                else
                    htmlElementChild.get('htmlParameters').push({
                        name: "class",
                        value: "large-" + containerParameters.columnsSizes[i] + " columns"
                    });
                htmlElementChild.set('widgetChildren', new App.Collections.WidgetList());
                htmlElementChild.set('htmlChildren', new App.Collections.HtmlElementList());
                htmlElement.get("htmlChildren").add(htmlElementChild);
                // build subs div Jquery objects
                var column = $('<div>');
                column.addClass('large-' + containerParameters.columnsSizes[i] + ' droppable columns');
                column.attr("data-info", "replaceable");
                column.attr("data-order", i); // we need to keep order in the DOM. When this div will be replaced by a widget, widget.order will have this value
                column.attr("data-html-element-id", htmlElement.get('id'));
                container.append(column);
            }
            container.children().last().addClass('end');
            container.attr("data-html-element-id", htmlElement.get('id'));

            widget.get("htmlElements").add(htmlElement);
            var container_html_element_id = containerParameters.parent.data("html-element-id");
            this.page.addWidget(container_html_element_id, widget)

            // add to parent into page
            this.addToDOM(container, $(containerParameters.parent), widget);
        },

        /**
         *
         * @param mWidget : App.Models.MetaWidget : object added
         * @return {App.Models.Widget}
         */
        buildWidgetModelFromMeta: function (mWidget) {
            var widget = new App.Models.Widget();
            // generate a new id from the current max widget contained in the page
            widget.set('id', this.page.getNewWidgetId());

            widget.set('meta_widget_id', mWidget.get('id'));
            widget.set('htmlElements', new App.Collections.HtmlElementList());

            for (var index in  mWidget.get("metaHtmlElements").models) {
                var htmlElement = this.buildHtmlElementModelFromMeta(mWidget.get("metaHtmlElements").models[index]);
                htmlElement.set('order', index);
                widget.get("htmlElements").add(htmlElement);
            }
            return widget;
        },

        /**
         *
         * @param metaHtmlElement : App.Models.MetaHtmlELement
         *
         */
        buildHtmlElementModelFromMeta: function (metaHtmlElement) {
            var htmlElement = new App.Models.HtmlElement();
            htmlElement.set('id', this.page.getNewHtmlElementId());
            htmlElement.set('tag', metaHtmlElement.get('tag'));
            htmlElement.set('value', metaHtmlElement.get('value'));
            htmlElement.set('htmlParameters', []);
            htmlElement.set('widgetChildren', new App.Collections.WidgetList());
            htmlElement.set('htmlChildren', new App.Collections.HtmlElementList());
            htmlElement.set('properties', new App.Collections.PropertyList());

            var metaProperties = metaHtmlElement.get('metaHtmlParameters');
            for (var index in metaProperties)
                htmlElement.get('htmlParameters').push( { name: metaProperties[index].name, cssName: metaProperties[index].cssName, value: metaProperties[index].defaultValue } );

            for (var index in metaHtmlElement.get('metaHtmlParameters'))
                htmlElement.get('htmlParameters').push(metaHtmlElement.get('metaHtmlParameters')[index]);

            for (var index in metaHtmlElement.get('children').models) {
                var htmlElementChild = this.buildHtmlElementModelFromMeta(metaHtmlElement.get('children').models[index]);
                htmlElementChild.set('order', index);
                htmlElement.get('htmlChildren').add(htmlElementChild);
            }
            return htmlElement;
        },

        /**
         *
         * @param jqObject: {*|jQuery|HTMLElement} to add
         * @param receiver: {*|jQuery|HTMLElement} that receives the object
         *                  if has class stage => append
         *                  else => replaceWith
         */
        addToDOM: function (jqObject, receiver, widget) {
            console.log("addToDOM");
            if (receiver.data("info") == "replaceable") {
                widget.set('order', receiver.data("order"));
                this.addContainerClass(jqObject, receiver.attr("class"));
                receiver.replaceWith(jqObject);
            } else {
                widget.set('order', receiver.children().length + 1);
                receiver.append(jqObject);
            }
        },

        /**
         *
         * @param mWidget: App.Models.Widget, we use it to build the JQuery Element
         * @return {{*|jQuery|HTMLElement}}
         */
        buildJqueryWidgetFromWidget: function (widget, isNew, parent) {
            var htmlsWidget = [];
            var widget_id = widget.get('id');
            for (var index in  widget.get("htmlElements").models) {
                var jqWidget = this.buildJqueryFromHtmlElement(widget.get("htmlElements").models[index], isNew, null);
                if(parent != null)
                    parent.append(jqWidget);
                htmlsWidget.push(jqWidget);
            }
            return htmlsWidget;
        },
        /**
         *
         * @param htmlElement : App.Models.
         * @param parent : {*|jQuery|HTMLElement}, null when it's a widget root element
         * @return {*|jQuery|HTMLElement} or String
         */
        buildJqueryFromHtmlElement: function (htmlElement, isNew, parent) {
            var jqWidget = null;
            if (htmlElement.get("tag") != null && htmlElement.get("tag") != "") {
                jqWidget = $('<' + htmlElement.get("tag") + '>');

                var properties = htmlElement.get('properties');
                for (var index in properties)
                    jqWidget.css(properties[index].cssName, properties[index].value);

                for (var index in htmlElement.get("htmlParameters")) {
                    jqWidget.attr(htmlElement.get("htmlParameters")[index].name, htmlElement.get("htmlParameters")[index].value);
                }

                for (var index in htmlElement.get("htmlChildren").models)
                    this.buildJqueryFromHtmlElement(htmlElement.get("htmlChildren").models[index], isNew, jqWidget);
                for (var index in htmlElement.get("widgetChildren").models)
                    this.buildJqueryWidgetFromWidget(htmlElement.get("widgetChildren").models[index], isNew, jqWidget);
                jqWidget.append(htmlElement.get("value"));
                jqWidget.attr('data-html-element-id', htmlElement.get('id'));
            } else {
                jqWidget = htmlElement.get("value");
            }
            if (parent != null)
                parent.append(jqWidget);
            if (!isNew)
                if (this.page.idHtmlElementGenerator < htmlElement.get('id'))
                    this.page.idHtmlElementGenerator = htmlElement.get('id');
            return jqWidget;
        },

        /**
         *
         * @param jqObject : {*|jQuery|HTMLElement}, object that will receive new class
         * @param classStr : String, we will search which class we want to keep
         */
        addContainerClass: function (jqObject, classStr) {
            var classes = classStr.split(' ');
            for (var i in classes) {
                if (classes[i].contains('large-'))
                    jqObject.addClass(classes[i]);
                if (classes[i].contains('small-'))
                    jqObject.addClass(classes[i]);
                if (classes[i].contains('medium-'))
                    jqObject.addClass(classes[i]);
                if (classes[i].contains('columns'))
                    jqObject.addClass(classes[i]);
                if (classes[i].contains('end'))
                    jqObject.addClass(classes[i])
                if (classes[i].contains('column'))
                    jqObject.addClass(classes[i]);
                if (classes[i].contains('row'))
                    jqObject.addClass(classes[i]);
                if (classes[i].contains('small-block-grid-'))
                    jqObject.addClass(classes[i]);
                if (classes[i].contains('medium-block-grid-'))
                    jqObject.addClass(classes[i]);
                if (classes[i].contains('large-block-grid-'))
                    jqObject.addClass(classes[i]);

            }

        }

    });
    App.Utils.PageBuilder = PageBuilder;
    return App.Utils.PageBuilder;
})();