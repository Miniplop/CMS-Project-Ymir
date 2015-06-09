var App = App || {};
App.Models.Page = App.Models.Page || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
App.Collections.HtmlElementList = App.Collections.HtmlElementList || {};
App.Models.HtmlElement = App.Models.HtmlElement || {};
/**
 *
 * @description
 *      Manage all the stage modification
 *      Add Widget to the stage & iframes
 *      Add Widget to the page tree
 *
 *      Steps :
 *          if we add a widget by drag&drop =>
 *              Build App.Models.Widgets, App.Models.HtmlElements based on App.Models.MetaWidgets and App.Models.MetaHtmlElement
 *          if we load an existing page or we have build App.Models.Widgets, App.Models.HtmlElements from Metas =>
 *              Build {*|jQuery|HTMLElement} based on App.Models.Widgets and App.Models.HtmlElements.
 *          Add {*|jQuery|HTMLElement} to the DOM at the specified location.
 *
 *      Infos:
 *          HtmlElement and Widget ids are generated by page.getNewHtmlElementId or page.getNewHtmlWidgetId
 *          Ids are unique for one page.
 *
 */
(function () {
    /**
     *
     * @param page App.Models.Page
     * @constructor
     */
    function PageBuilder(page_id) {
        _.bindAll(this, "initialize");
        this.page = new App.Models.Page({id : page_id});
        this.page.fetch({success : this.initialize});
    };

    _.extend(PageBuilder.prototype, {
        /**
         *
         */
        initialize: function () {
            var title = this.page.get("title");
            var mobile = $("#mobile");
            var tablet = $("#tablet");
            var title_target = $(".project-name-input");
            var widgets = this.page.get("widgets");

            for (var i in widgets.models) {

                // build {*|jQuery|HTMLElement} using the widget object
                var elements = this.buildJqueryWidgetFromWidget(widgets.models[i], false, null);
                console.log(elements);
                // add widget to the page tree and to the dom (stage & iframes)
                for (var index in elements) {
                    console.log(elements[index]);
                    this.addWidget(elements[index], $(".stage"), widgets.models[i]);
                }
            }
            this.reloadIframe();
            title_target.ready(function(){
                console.log("titre de la page :" +title);
               $(title_target).val(title);
            });

            // add css and js for iframes
            mobile.ready(function () {
                mobile.contents().find("head").append('<link rel="stylesheet" href="' + app.Urls.css.foundation + '">');
            });
            tablet.ready(function () {
                tablet.contents().find("head").append('<link rel="stylesheet" href="' + app.Urls.css.foundation + '">');
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
            // build the App.Models.Widget
            var widget = this.buildWidgetModelFromMeta(mWidget,container_html_element_id);

            // build {*|jQuery|HTMLElement}
            var htmlsWidget = this.buildJqueryWidgetFromWidget(widget, true, null);

            // add widget to the page tree and add {*|jQuery|HTMLElement} to the stage and iframes
            for (var index in htmlsWidget) {
                this.addWidget(htmlsWidget[index], receiver, widget);
            }
            this.reloadIframe();
        },


        /**
         * @param containerParameters: Array
         *          meta_widget: App.Models.MetaWidget
         *          nb_column: int (number of columns)
         *          columnsSizes array (sizes of columns)
         *          parent: {*|jQuery|HTMLElement} (object where container is dropped)
         *          isRow: boolean (specify if the container is a row)
         * @description
         *      Build the JQuery container, the specified column (sub div of the container) will be replaced when we drop something on it.
         *      Add it to the App.Models.Page tree
         *      add it to the DOM
         */
        addContainer: function (containerParameters) {
            // initialize App.Models.Widget
            var widget = new App.Models.Widget();
            widget.set('id', this.page.getNewWidgetId());
            widget.set('meta_widget_id', containerParameters.meta_widget.get('id'));
            widget.set('htmlElements', new App.Collections.HtmlElementList());

            // get tag of the container
            var metaHtmlElements = containerParameters.meta_widget.get("metaHtmlElements");
            var metaHtmlTag = metaHtmlElements.models[0].get('tag');
            // build HtmlElement from MetaHtmlElement
            var htmlElement = this.buildHtmlElementModelFromMeta(metaHtmlElements.models[0]);

            // initialize {*|jQuery|HTMLElement} (src of the container)
            var container = $('<' + metaHtmlTag + '>');
            if (containerParameters.isRow)
                container.addClass('row');

            // add droppable areas to the conatiner (replaceable div)
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
                // put column size
                htmlElementChild.get('htmlParameters').push({
                    name: "class",
                    value: "large-" + containerParameters.columnsSizes[i][0] + 
                    " medium-" + containerParameters.columnsSizes[i][1] +
                    " small-" + containerParameters.columnsSizes[i][2] +
                    " columns" + (i == containerParameters.nb_column ? "end" : "")
                });
                htmlElementChild.set('widgetChildren', new App.Collections.WidgetList());
                htmlElementChild.set('htmlChildren', new App.Collections.HtmlElementList());
                htmlElementChild.set('properties', new App.Collections.PropertyList());
                // add HtmlElement column to the HtmlElement container
                htmlElement.get("htmlChildren").add(htmlElementChild);

                // build subs div {*|jQuery|HTMLElement} with size, order, htmlElementId
                var column = $('<div>');
                column.addClass('large-' + containerParameters.columnsSizes[i][0] +
                    ' medium-' + containerParameters.columnsSizes[i][1] +
                    ' small-' + containerParameters.columnsSizes[i][2] +
                    ' droppable columns');
                column.attr("data-info", "replaceable");
                column.attr("data-order", i); // we need to keep order in the DOM. When this div will be replaced by a widget, widget.order will have this value
                column.attr("data-html-element-id", htmlElementChild.get('id'));
                // add {*|jQuery|HTMLElement} column to the {*|jQuery|HTMLElement} container
                container.append(column);
            }
            // the last column has class "end" otherwise it will be float:right
            container.children().last().addClass('end');
            // specify widget-id, htmlElementId and container to the {*|jQuery|HTMLElement} container
            container.attr("data-html-element-id", htmlElement.get('id'));
            container.attr("data-widget-id", widget.get("id"));
            container.attr("data-container", "true");

            widget.get("htmlElements").add(htmlElement);
            var container_html_element_id = containerParameters.parent.data("html-element-id");

            // Add container to the page tree and to the DOM (stage & iframes)
            this.addWidget(container, $(containerParameters.parent), widget);

            this.reloadIframe();
        },

        /**
         *
         * @param mWidget : App.Models.MetaWidget : object added
         * @return {App.Models.Widget}
         * @description
         *      build the App.Models.Widget based on the App.Models.MetaWidget
         */
        buildWidgetModelFromMeta: function (mWidget) {
            var widget = new App.Models.Widget();
            // generate a new id from the current max widget contained in the page
            widget.set('id', this.page.getNewWidgetId());

            widget.set('meta_widget_id', mWidget.get('id'));
            widget.set('htmlElements', new App.Collections.HtmlElementList());

            // Build App.Collections.HtmlElementList based on the App.Collections.MetaHtmlElementList
            for (var index in  mWidget.get("metaHtmlElements").models) {
                var htmlElement = this.buildHtmlElementModelFromMeta(mWidget.get("metaHtmlElements").models[index]);
                // initialize order
                htmlElement.set('order', index);
                // add the the App.Models.Widget
                widget.get("htmlElements").add(htmlElement);
            }
            return widget;
        },

        /**
         *
         * @param metaHtmlElement : App.Models.MetaHtmlELement
         * @description
         *      Build the App.Models.HtmlElement based on the App.Models.MetaHtmlElement
         */
        buildHtmlElementModelFromMeta: function (metaHtmlElement) {
            var htmlElement = new App.Models.HtmlElement();
            // get a new Id.
            htmlElement.set('id', this.page.getNewHtmlElementId());
            htmlElement.set('tag', metaHtmlElement.get('tag'));
            htmlElement.set('value', metaHtmlElement.get('value'));
            htmlElement.set('htmlParameters', []);
            htmlElement.set('widgetChildren', new App.Collections.WidgetList());
            htmlElement.set('htmlChildren', new App.Collections.HtmlElementList());
            htmlElement.set('properties', new App.Collections.PropertyList());

            // copy MetaHtmlElement.MetaProperties into HtmlElement.Properties
            var metaProperties = metaHtmlElement.get("metaProperties");
            for (var index in metaProperties)
                htmlElement.get('properties').add(this.buildHtmlProperty(metaProperties[index]));

            // copy MetaHtmlElement.MetaHtmlParameters into HtmlElement.HtmlParameters
            for (var index in metaHtmlElement.get('metaHtmlParameters'))
                htmlElement.get('htmlParameters').push(metaHtmlElement.get('metaHtmlParameters')[index]);

            // build htmlElement children from MetaHtmlElement children
            for (var index in metaHtmlElement.get('children').models) {
                var htmlElementChild = this.buildHtmlElementModelFromMeta(metaHtmlElement.get('children').models[index]);
                htmlElementChild.set('order', index);
                htmlElement.get('htmlChildren').add(htmlElementChild);
            }
            return htmlElement;
        },

        /**
         *
         * @param metaProp {name, type, inputType, identifier]
         * @return {App.Models.Property}
         * @description
         *      return a copy of MetaProperties
         */
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
         * @description
         *      if the reveiver of the the widget has data-info = replaceable, we replace it by jqObject
         *      we set to the widget the receiver order and reveiver classes, we add the widget object to the receiver parent object
         *      else we simply add it to the receiver and update the order
         *
         */
        addWidget: function (jqObject, receiver, widget) {
            var receiver_id = receiver.data("html-element-id");
            if (receiver.data("info") == "replaceable") {
                widget.set('order', receiver.data("order"));
                console.log("Order: " + receiver.data("order"));
                this.addContainerClass(jqObject, receiver.attr("class"), widget);
                // remove replaceable HtmlElement (div data-info="replaceable") and add the widget as children of the container root (section, article,...)
                this.page.removeHtmlElement(receiver_id);
                if (receiver.parent().attr("data-container") == "true")
                    receiver_id = receiver.parent().attr("data-html-element-id");
                else // error if parent is not a container
                    console.error("replaceable html element must have a container has parent");

                receiver.replaceWith(jqObject);
            } else {
                // add a new widget to something else than a container. we set order + 1 and append the object to the end.
                // TODO: put a widget between 2 widgets
                widget.set('order', receiver.children().length + 1);
                receiver.append(jqObject);
            }
            // add the widget the the tree
            this.page.addWidget(receiver_id, widget)
        },

        /**
         *
         * @param Widget: App.Models.Widget, we use it to build the JQuery Element
         * @param isNew: boolean : used to update id generators of the page
         * @param parent: {{*|jQuery|HTMLElement}} not null when it's a child of an HtmlElement
         * @return and array of {{*|jQuery|HTMLElement}} (translation of the widget children (HtmlElement)
         * @description
         *      Build the {{*|jQuery|HTMLElement}} from the description of a App.Models.Widget
         *
         */
        buildJqueryWidgetFromWidget: function (widget, isNew, parent) {
            var htmlsWidget = [];
            var widget_id = widget.get('id');
            for (var index in  widget.get("htmlElements").models) {
                // build the {{*|jQuery|HTMLElement}} from widget childrens
                var jqWidget = this.buildJqueryFromHtmlElement(widget.get("htmlElements").models[index], isNew, null);
                //  set the widget-id
                jqWidget.attr('data-widget-id', widget_id);
                // if the widget is into a HtmlElement
                if (parent != null)
                    parent.append(jqWidget);
                htmlsWidget.push(jqWidget);
            }
            if(!isNew)
                this.updateWidgetIds(widget.get("id"));
            return htmlsWidget;
        },
        /**
         *
         * @param htmlElement : App.Models.HtmlElement
         * @param isNew: boolean : used to update id generators of the page
         * @param parent : {*|jQuery|HTMLElement}, null when it's a widget root element
         * @return {*|jQuery|HTMLElement}
         * @description
         *
         */
        buildJqueryFromHtmlElement: function (htmlElement, isNew, parent) {
            var jqWidget = null;
            if (htmlElement.get("tag") != null && htmlElement.get("tag") != "") {
                jqWidget = $('<' + htmlElement.get("tag") + '>');
                // add editable property to the {*|jQuery|HTMLElement}
                this.addProperties(jqWidget, htmlElement.get('properties').models);

                // add html parameters to the {*|jQuery|HTMLElement}
                for (var index in htmlElement.get("htmlParameters")) {
                    jqWidget.attr(htmlElement.get("htmlParameters")[index].name, htmlElement.get("htmlParameters")[index].value);
                }

                // build HtmlElement.HtmlElementChildren
                for (var index in htmlElement.get("htmlChildren").models)
                    this.buildJqueryFromHtmlElement(htmlElement.get("htmlChildren").models[index], isNew, jqWidget)
                // build HtmlElement widget children
                for (var index in htmlElement.get("widgetChildren").models)
                    this.buildJqueryWidgetFromWidget(htmlElement.get("widgetChildren").models[index], isNew, jqWidget);

                // if its a sub div of a container, we set it to replaceable and droppable
                if (parent != null && parent.data("container")) {
                    jqWidget.attr("data-info", "replaceable");
                    jqWidget.addClass("droppable");
                }
                // add the text value
                jqWidget.append(htmlElement.get("value"));
                jqWidget.attr('data-html-element-id', htmlElement.get('id'));
            } else {
                console.error("an Html element must have a tag, id : " + htmlElement.get('id'));
            }
            if (parent != null)
                parent.append(jqWidget);

            // if it's a loaded page from the server, we update the page id generators
            if (!isNew)
                this.updateHtmlIds(htmlElement.get('id'));
            return jqWidget;
        },
        /**
         *
         * @param jqWidget
         * @param properties App.Collections.PropertyList
         * @description
         *      a Property has 2 possible type : css or Html
         *      if it's css,  identifier representes the css property name
         *      if it's html, identifier representes the html parameter name.
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
         * @description
         *      Update the page HtmlElement Ids generator.
         */
        updateWidgetIds: function (id) {
            if (this.page.idWidgetGenerator < id)
                this.page.idWidgetGenerator = id;
        },
        /**
         *
         * @param id
         * @description
         *      Update the page HtmlElement Ids generator.
         */
        updateHtmlIds: function (id) {
            if (this.page.idHtmlElementGenerator < id)
                this.page.idHtmlElementGenerator = id;
        },

        /**
         *
         * @param jqObject : {*|jQuery|HTMLElement}, object that will receive new class
         * @param classStr : String, we will search which class we want to keep and to add to the widget's html parameters
         * @param widget: App.Models.Widget; widget where to add the the class has HtmlParameter
         * @description
         *      Choose which class we will keep
         */
        addContainerClass: function (jqObject, classStr, widget) {
            var widgetClassParameter = " ";
            var classes = classStr.split(' ');
            for (var i in classes) {
                if (classes[i].contains('large-')) {
                    jqObject.addClass(classes[i]);
                    widgetClassParameter.concat(" " + classes[i]);
                }
                if (classes[i].contains('small-')) {
                    jqObject.addClass(classes[i]);
                    widgetClassParameter.concat(" " + classes[i]);
                }
                if (classes[i].contains('medium-')) {
                    jqObject.addClass(classes[i]);
                    widgetClassParameter.concat(" " + classes[i]);
                }
                if (classes[i].contains('columns')) {
                    jqObject.addClass(classes[i]);
                    widgetClassParameter.concat(" " + classes[i]);
                }
                if (classes[i].contains('end')) {
                    jqObject.addClass(classes[i]);
                    widgetClassParameter.concat(" " + classes[i]);
                }
                if (classes[i].contains('column')) {
                    jqObject.addClass(classes[i]);
                    widgetClassParameter.concat(" " + classes[i]);
                }
                if (classes[i].contains('row')) {
                    jqObject.addClass(classes[i]);
                    widgetClassParameter.concat(" " + classes[i]);
                }
                if (classes[i].contains('small-block-grid-')) {
                    jqObject.addClass(classes[i]);
                    widgetClassParameter.concat(" " + classes[i]);
                }
                if (classes[i].contains('medium-block-grid-')) {
                    jqObject.addClass(classes[i]);
                    widgetClassParameter.concat(" " + classes[i]);
                }
                if (classes[i].contains('large-block-grid-')) {
                    jqObject.addClass(classes[i]);
                    widgetClassParameter.concat(" " + classes[i]);
                }

            }
            for (var index in widget.get("htmlElements").models) {
                var htmlParameter = null;
                var htmlElement = widget.get("htmlElements").models[index];
                for (var i in htmlElement.get("htmlParameters")) {
                    htmlParameter = {name: "class", value: jqObject.attr("class"), mapped:"true"};
                    htmlElement.get("htmlParameters").push(htmlParameter);
                }
                console.log(htmlElement);
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
                mobile.contents().find("body").append(mobileElement);
                
            });
            tablet.ready(function () {
                tablet.contents().find("body").append(tabletElement);
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
            var widgets = this.page.get("widgets");
            this.clearIframe();
            var mobile = $("#mobile");
            var tablet = $("#tablet");
            for (var i in widgets.models) {
                var elements = this.buildJqueryWidgetFromWidget(widgets.models[i], false, null);
                for (var index in elements){
                    this.updateIframe(elements[index], elements[index].clone(), widgets.models[i]);
                }
            }
            var includeFoundationJs = '<script type="text/javascript" src="' + app.Urls.js.foundation + '">' ;
            mobile.ready(function () {
                mobile.contents().find("body").append(includeFoundationJs);
            });

            tablet.ready(function () {
                tablet.contents().find("body").append(includeFoundationJs);
            });
        }
    });

    App.Utils.PageBuilder = PageBuilder;
    return App.Utils.PageBuilder;
})();