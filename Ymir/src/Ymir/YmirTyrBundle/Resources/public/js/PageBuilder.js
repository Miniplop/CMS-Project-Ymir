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
            var container = $('.stage');
            console.log ("go init");
            var widgets = this.page.get("widgets");
            console.log(this.page);
            widgets.each( function(widget) {
                console.log(widget);
                var element = this.buildJqueryWidgetFromWidget(widget);
                container.append(element);
            });
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
        addWidgetFromMeta: function(mWidget, receiver) {
            var container_html_element_id = receiver.data("html-element-id");
            // build the App.Models.Widget and add it to the page tree
            var widget = this.buildWidgetModelFromMeta(mWidget);
            this.page.addWidget(container_html_element_id, widget);
            // build JQuery Objects and add it to the dom
            var htmlsWidget = this.buildJqueryWidgetFromWidget(widget);
            for(var index in htmlsWidget)
                this.addToDOM(htmlsWidget[index], receiver);
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
        addContainer: function(containerParameters) {
            var htmlContainer = containerParameters.meta_widget.get("metaHtmlElements").models[0];
            var container = $('<' + htmlContainer.get('tag') + '>');
            if(containerParameters.isRow)
                container.addClass('row');
            for(var i = 1; i <= containerParameters.nb_column; i++) {
                var column = $('<'+ htmlContainer.get('children').models[0].get('tag')+'>');
                column.addClass('large-'+containerParameters.columnsSizes[i]+' droppable columns');
                column.attr("data-info", "replaceable")
                container.append(column);
            }
            container.children().last().addClass('end');
            this.addToDOM(container, $(containerParameters.parent));
            $(containerParameters.parent).append(container);
        },

        /**
         *
         * @param mWidget : App.Models.MetaWidget : object added
         * @return {App.Models.Widget}
         */
        buildWidgetModelFromMeta: function(mWidget) {
            var widget = new App.Models.Widget();
            // generate a new id from the current max widget contained in the page
            widget.set('id', this.page.getNewId());

            widget.set('meta_widget_id', mWidget.get('id'));
            widget.set('htmlElements', new App.Collections.HtmlElementList());

            for(var index in  mWidget.get("metaHtmlElements").models) {
                var htmlElement = this.buildHtmlElementModelFromMeta(mWidget.get("metaHtmlElements").models[index]);
                widget.get("htmlElements").add(htmlElement);
            }
            return widget;
        },

        /**
         *
         * @param metaHtmlElement : App.Models.MetaHtmlELement
         *
         */
        buildHtmlElementModelFromMeta: function(metaHtmlElement) {
            var htmlElement = new App.Models.HtmlElement();
            htmlElement.set('tag', metaHtmlElement.get('tag'));
            htmlElement.set('value', metaHtmlElement.get('value'));
            htmlElement.set('htmlParameters', []);
            htmlElement.set('widgetChildren', new App.Collections.WidgetList());
            htmlElement.set('htmlChildren', new App.Collections.HtmlElementList());

            for(var index in metaHtmlElement.get('metaHtmlParameters'))
                htmlElement.get('htmlParameters').push(metaHtmlElement.get('metaHtmlParameters')[index]);

            for(var index in metaHtmlElement.get('children').models) {
                var htmlElementChild = this.buildHtmlElementModelFromMeta(metaHtmlElement.get('children').models[index]);
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
        addToDOM: function(jqObject, receiver) {
            if(receiver.hasClass('stage'))
                receiver.append(jqObject);
            else if(receiver.data("info") == "replaceable") {
                this.addContainerClass(jqObject, receiver.attr("class"));
                receiver.replaceWith(jqObject);
            }
        },

        /**
         *
         * @param mWidget: App.Models.Widget, we use it to build the JQuery Element
         * @return {{*|jQuery|HTMLElement}}
         */
        buildJqueryWidgetFromWidget: function(widget) {
            var htmlsWidget = [];
            var widget_id = widget.get('id');
            for(var index in  widget.get("htmlElements").models) {
                var jqWidget = this.buildJqueryFromHtmlElement(widget.get("htmlElements").models[index], widget_id, null);
                htmlsWidget.push(jqWidget);
            }
            console.log(htmlsWidget);
            return htmlsWidget;
        },
        /**
         *
         * @param htmlElement : App.Models.HtmlElement
         * @param parent : {*|jQuery|HTMLElement}, null when it's a widget root element
         * @return {*|jQuery|HTMLElement} or String
         */
        buildJqueryFromHtmlElement: function(htmlElement, widget_id, parent) {
            var jqWidget = null;
            if(htmlElement.get("tag") != null && htmlElement.get("tag") != "") {
                jqWidget = $('<'+ htmlElement.get("tag") +'>');

                for(var index in htmlElement.get("htmlParameters")) {
                    jqWidget.attr(htmlElement.get("htmlParameters")[index].name, htmlElement.get("htmlParameters")[index].value);
                }

                if(htmlElement.get("htmlChildren").models.length > 0 || htmlElement.get("widgetChildren").models.length > 0) {
                    for (var index in htmlElement.get("htmlChildren").models)
                        this.buildJqueryFromHtmlElement(htmlElement.get("htmlChildren").models[index], widget_id, jqWidget);
                    for (var index in htmlElement.get("widgetChildren").models)
                        this.buildJqueryWidgetFromWidget(htmlElement.get("widgetChildren").models[index], jqWidget);
                } else {
                    jqWidget.append(htmlElement.get("value"));
                }
            } else {
                jqWidget = htmlElement.get("value");
            }
            if(parent != null)
                parent.append(jqWidget);

            jqWidget.attr('data-widget-id', widget_id);
            console.log(jqWidget);
            return jqWidget;
        },

        /**
         *
         * @param jqObject : {*|jQuery|HTMLElement}, object that will receive new class
         * @param classStr : String, we will search which class we want to keep
         */
        addContainerClass: function(jqObject, classStr) {
            var classes = classStr.split(' ');
            for(var i in classes) {
                if(classes[i].contains('large-'))
                    jqObject.addClass(classes[i]);
                if(classes[i].contains('small-'))
                    jqObject.addClass(classes[i]);
                if(classes[i].contains('medium-'))
                    jqObject.addClass(classes[i]);
                if(classes[i].contains('columns'))
                    jqObject.addClass(classes[i]);
                if(classes[i].contains('end'))
                    jqObject.addClass(classes[i])
                if(classes[i].contains('column'))
                    jqObject.addClass(classes[i]);
                if(classes[i].contains('row'))
                    jqObject.addClass(classes[i]);
                if(classes[i].contains('small-block-grid-'))
                    jqObject.addClass(classes[i]);
                if(classes[i].contains('medium-block-grid-'))
                    jqObject.addClass(classes[i]);
                if(classes[i].contains('large-block-grid-'))
                    jqObject.addClass(classes[i]);

            }

        }

    });
    App.Utils.PageBuilder = PageBuilder;
    return App.Utils.PageBuilder;
})();