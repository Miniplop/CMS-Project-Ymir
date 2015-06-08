var App = App || {};
App.Models.Page = App.Models.Page || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
App.Collections.HtmlElementList = App.Collections.HtmlElementList || {};
App.Models.HtmlElement = App.Models.HtmlElement || {};
/**
 *
 */
(function () {
    /**
     *
     * @param page App.Models.Page
     * @constructor
     */
    function PageBuilder(page) {
        _.bindAll(this, "initialize");
        if (page !== null) {
            this.page = page;
            this.page.fetch({success : this.initialize()});
        } else {
            this.page = new App.Models.Page();
            this.page.set('widgets', new App.Collections.WidgetList());
            this.initialize();
        }
    };

    _.extend(PageBuilder.prototype, {
        /**
         *
         */
        initialize: function () {
            var thisObject = this;
            
            var widgets = this.page.get("widgets");
            var title = this.page.get("title");
            console.log(widgets);
            console.log(title);
            var mobile = $("#mobile");
            var tablet = $("#tablet");
            var title_target = $(".project-name-input");
            for (var i in widgets.models) {
                if (this.page.idWidgetGenerator < widgets.models[i].get("id"))
                    this.page.idWidgetGenerator = widgets.models[i].get("id");
                
                /**
                *   Nous avons besoin de deux clones de elements pour mettre à jour les iframe.
                *   Or, la dupplication de données en javascript est compliquée, surtout lorsqu'il s'agit d'objets imbriqués.
                *   La plupart des methodes clones existantes font de la duplication par référence, ce qui ne nous convient pas.
                *   C'est pourquoi nous avons opté pour une methode un peu plus archaique, on fait trois fois la même chose.
                *   Ce n'est pas extremement couteux .
                */
                var elements = this.buildJqueryWidgetFromWidget(widgets.models[i], false, null);

                for (var index in elements) {
                    this.addWidget(elements[index], $(".stage"), widgets.models[i]);
                    this.updateIframe(elements[index].clone(), elements[index].clone(), widgets.models[i]);
                }
            }
            title_target.ready(function(){
                console.log("titre de la page :" +title);
               $(title_target).val(title);
            });
            
            mobile.ready(function () {
                mobile.contents().find("head").append('<link rel="stylesheet" href="' + app.Urls.css.foundation + '">');
                mobile.contents().find("body").html('<script type="text/javascript" src="' + app.Urls.js.foundation + '">');
            });

            tablet.ready(function () {
                tablet.contents().find("head").append('<link rel="stylesheet" href="' + app.Urls.css.foundation + '">');
                tablet.contents().find("body").html('<script type="text/javascript" src="' + app.Urls.js.foundation + '">');
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
        addWidgetFromMeta: function (mWidget, receiver) {
            var container_html_element_id = receiver.data("html-element-id");
            var newOrder = null;
            // build the App.Models.Widget and add it to the page tree
            var widget = this.buildWidgetModelFromMeta(mWidget);
            // build JQuery Objects and add it to the dom
            /**
            * On effectue les mêmes opérations sur les trois variables suivntes, pour 
            * les raisons indiquées dans la methode initialize.
            */
            var htmlsWidget = this.buildJqueryWidgetFromWidget(widget, true, null);

            for (var index in htmlsWidget) {
                this.addWidget(htmlsWidget[index], receiver, widget);
                this.updateIframe(htmlsWidget[index].clone(), htmlsWidget[index].clone(), widget);
            }
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
                htmlElementChild.set('id', this.page.getNewHtmlElementId());
                htmlElementChild.set('tag', 'div');
                htmlElementChild.set('value', '');
                htmlElementChild.set('order', i);
                htmlElementChild.set('htmlParameters', []);
                htmlElementChild.get('htmlParameters').push({name: "data-info", value: "replaceable"});
                htmlElementChild.get('htmlParameters').push({name: "data-order", value: i});
                htmlElementChild.get('htmlParameters').push({
                    name: "class",
                    value: "large-" + containerParameters.columnsSizes[i] + " columns" + (i == containerParameters.nb_column ? " end" : "")
                });
                htmlElementChild.set('widgetChildren', new App.Collections.WidgetList());
                htmlElementChild.set('htmlChildren', new App.Collections.HtmlElementList());
                htmlElementChild.set('properties', new App.Collections.PropertyList());
                htmlElement.get("htmlChildren").add(htmlElementChild);
                // build subs div Jquery objects
                var column = $('<div>');
                column.addClass('large-' + containerParameters.columnsSizes[i] + ' droppable columns');
                column.attr("data-info", "replaceable");
                column.attr("data-order", i); // we need to keep order in the DOM. When this div will be replaced by a widget, widget.order will have this value
                column.attr("data-html-element-id", htmlElementChild.get('id'));
                container.append(column);
            }
            container.children().last().addClass('end');
            container.attr("data-html-element-id", htmlElement.get('id'));
            container.attr("data-widget-id", widget.get("id"));
            container.attr("data-container", "true");

            widget.get("htmlElements").add(htmlElement);
            var container_html_element_id = containerParameters.parent.data("html-element-id");

            // add to parent into page
            this.addWidget(container, $(containerParameters.parent), widget);


            this.updateIframe(container.clone(), container.clone(), widget);
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

            var metaProperties = metaHtmlElement.get("metaProperties");
            for (var index in metaProperties)
                htmlElement.get('properties').add(this.buildHtmlProperty(metaProperties[index]));

            for (var index in metaHtmlElement.get('metaHtmlParameters'))
                htmlElement.get('htmlParameters').push(metaHtmlElement.get('metaHtmlParameters')[index]);

            for (var index in metaHtmlElement.get('children').models) {
                var htmlElementChild = this.buildHtmlElementModelFromMeta(metaHtmlElement.get('children').models[index]);
                htmlElementChild.set('order', index);
                htmlElement.get('htmlChildren').add(htmlElementChild);
            }
            return htmlElement;
        },

        buildHtmlProperty: function (metaProp) {
            var prop = new App.Models.Property();
            prop.set('name', metaProp.name);
            prop.set('type', metaProp.type);
            prop.set('inputType', metaProp.inputType);
            prop.set('identifier', metaProp.identifier);
            prop.set('value', metaProp.defaultValue);
            return prop;
        },

        /**
         *
         * @param jqObject: {*|jQuery|HTMLElement} to add
         * @param receiver: {*|jQuery|HTMLElement} that receives the object
         *                  if has class stage => append
         *                  else => replaceWith
         */
        addWidget: function (jqObject, receiver, widget, parent) {
            var receiver_id = receiver.data("html-element-id");
            if (receiver.data("info") == "replaceable") {
                widget.set('order', receiver.data("order"));
                this.addContainerClass(jqObject, receiver.attr("class"));
                this.page.removeHtmlElement(receiver_id);
                if (receiver.parent().attr("data-container") == "true")
                    receiver_id = receiver.parent().data("html-element-id");
                else
                    console.error("replaceable html element must have a container has parent");

                receiver.replaceWith(jqObject);
            } else {
                widget.set('order', receiver.children().length + 1);
                receiver.append(jqObject);
                console.log("add widget in : " + receiver_id);
            }
            this.page.addWidget(receiver_id, widget)
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
                jqWidget.attr('data-widget-id', widget_id);
                if (parent != null)
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
                this.addProperties(jqWidget, htmlElement.get('properties').models);

                for (var index in htmlElement.get("htmlParameters")) {
                    jqWidget.attr(htmlElement.get("htmlParameters")[index].name, htmlElement.get("htmlParameters")[index].value);
                }

                for (var index in htmlElement.get("htmlChildren").models)
                    this.buildJqueryFromHtmlElement(htmlElement.get("htmlChildren").models[index], isNew, jqWidget);
                for (var index in htmlElement.get("widgetChildren").models)
                    this.buildJqueryWidgetFromWidget(htmlElement.get("widgetChildren").models[index], isNew, jqWidget);

                if (parent != null && parent.data("container"))
                    jqWidget.attr("data-info", "replaceable");
                jqWidget.append(htmlElement.get("value"));
                jqWidget.attr('data-html-element-id', htmlElement.get('id'));
            } else {
                jqWidget = htmlElement.get("value");
            }
            if (parent != null)
                parent.append(jqWidget);

            if (!isNew)
                this.updateHtmlIds(htmlElement.get('id'));
            return jqWidget;
        },
        /**
         *
         * @param jqWidget
         * @param properties
         */
        addProperties: function (jqWidget, properties) {
            for (var index in properties) {
                if (properties[index].get("type") == "css")
                    jqWidget.css(properties[index].get("identifier"), properties[index].get("value"));
                else if (properties[index].get("type") == "html") {
                    jqWidget.attr(properties[index].get("identifier"), properties[index].get("value"));
                }
                else
                    console.error("unknown html element property type : " + properties[index].get("type"));
            }
        },
        /**
         *
         * @param id
         */
        updateHtmlIds: function (id) {
            if (this.page.idHtmlElementGenerator < id)
                this.page.idHtmlElementGenerator = id;
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
        },
        getPage: function () {
            return this.page;
        },

        updateIframe: function (mobileElement, tabletElement, widget) {
            var mobile = $("#mobile");
            var tablet = $("#tablet");
            var thisObject = this;
            mobile.ready(function () {
                thisObject.addWidget(mobileElement, mobile.contents().find("body"), widget);
            });
            tablet.ready(function () {
                thisObject.addWidget(tabletElement, tablet.contents().find("body"), widget);
            });
        },
        
        clearIframe: function() {
            var mobile = $("#mobile");
            var tablet = $("#tablet");
            mobile.ready(function() {
                mobile.contents().find("body").empty();
            });
            tablet.ready(function() {
                tablet.contents().find("body").empty();
            });
        },
        
        reloadIframe: function () {
            console.log("reload Iframe");
            var widgets = this.page.get("widgets");
            this.clearIframe();
            for (var i in widgets.models) {
                if (this.page.idWidgetGenerator < widgets.models[i].get("id"))
                    this.page.idWidgetGenerator = widgets.models[i].get("id");
                
                /**
                *   Nous avons besoin de deux clones de elements pour mettre à jour les iframe.
                *   Or, la dupplication de données en javascript est compliquée, surtout lorsqu'il s'agit d'objets imbriqués.
                *   La plupart des methodes clones existantes font de la duplication par référence, ce qui ne nous convient pas.
                *   C'est pourquoi nous avons opté pour une methode un peu plus archaique, on fait trois fois la même chose.
                *   Ce n'est pas extremement couteux .
                */
                var tabletElement = this.buildJqueryWidgetFromWidget(widgets.models[i], false, null);
                var mobileElement = this.buildJqueryWidgetFromWidget(widgets.models[i], false, null);

                for (var index in tabletElement){
                    this.updateIframe(mobileElement[index], tabletElement[index], widgets.models[i]);
                }
            }
        }
    });

    App.Utils.PageBuilder = PageBuilder;
    return App.Utils.PageBuilder;
})();