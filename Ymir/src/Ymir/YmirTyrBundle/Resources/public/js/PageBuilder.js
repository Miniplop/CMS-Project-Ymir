var App = App || {};
App.Collections.WidgetList = App.Collections.WidgetList || {};
App.Collections.HtmlElementList = App.Collections.HtmlElementList || {};
App.Models.HtmlElement = App.Models.HtmlElement || {};
App.Models.Widget = App.Models.Widget || {};
(function () {

    function PageBuilder (page) {
        console.log("constructeur pageBuilder");
        if (page !== null)
            this.page = page;
        else
            this.page = new App.Models.Page();
        _.bindAll(this, "initialize");
        this.page.fetch ({
            success: this.initialize,
        });        
    };
    _.extend( PageBuilder.prototype, {
        initialize: function() {
            var container = $('.stage');
            console.log ("go init");
            var widgets = this.page.get("widgets");
            widgets.each( function(widget) {
                console.log("go build ini");
                var element = this.buildJqueryWidgetFromWidget(widget);
                container.append(element);
            });
        },
        /**
         *
         * @param mWidget : App.Models.MetaWidget : object added
         * @param receiver : Jquery object that receives the widget
         * @description
         *      Build the JQuery widget from the meta widget structure
         *      Add it to the App.Models.Page tree
         *      add it to the DOM
         */
        addWidgetFromMeta: function(mWidget, receiver) {

            // build the App.Models.Widget and add it to the page tree
            var widget = this.buildWidgetModelFromMeta(mWidget);
            console.log(widget);
            // build JQuery Objects and add it to the dom
            var htmlsWidget = this.buildJqueryWidgetFromMeta(widget);
            for(var index in htmlsWidget)
                this.addToDOM(htmlsWidget[index], receiver);
        },


        /**
         * @param containerParameters: Array
         *          meta_widget: App.Models.MetaWidget
         *          nb_column: int (number of columns)
         *          columnsSizes array (sizes of columns)
         *          parent: JQuery Object (object where container is dropped)
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
        },

        /**
         *
         * @param metaHtmlElement : App.Models.MetaHtmlELement
         *
         * htmlParameters : list of html parameter: {name: "class", value: "class_names"}
         tag : html tag of the html object
         value : value contained in the html object, ex : <div> value </div>. If is not empty, htmlChildren and widgetChildren are empty
         htmlChildren : App.Collections.HtmlElementList
         widgetChildren :
         */
        buildHtmlElementModelFromMeta: function(metaHtmlElement) {
            var htmlElement = new App.Models.HtmlElement();
            htmlElement.set('tag', metaHtmlElement.get('tag'));
            htmlElement.set('htmlParameters', []);
            console.log(htmlElement);
            for(var index in metaHtmlElement.get('metaHtmlParameters')) {
                htmlElement.get('htmlParameters').push(metaHtmlElement.get('metaHtmlParameters')[index]);
            }
            htmlElement.set('value', metaHtmlElement.get('value'));
            htmlElement.set('widgetChildren', new App.Collections.WidgetList());
            htmlElement.set('htmlChildren', new App.Collections.HtmlElementList());
            for(var index in metaHtmlElement.get('children').models) {
                var htmlElementChild = this.buildHtmlElementModelFromMeta(metaHtmlElement.get('children').models[index]);
                htmlElement.get('htmlChildren').add(htmlElementChild);
            }
        },

        /**
         *
         * @param jqObject: JQuery object to add
         * @param receiver: Jquery object that receives the object
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
         * @param mWidget: App.Models.MetaWidget (we use it to build the JQuery Element
         * @return {{*|jQuery|HTMLElement}}
         */
        buildJqueryWidgetFromWidget: function(Widget) {
            console.log("buildJqueryWidgetFromWidget");
            var htmlsWidget = [];
            for(var index in  Widget.get("htmlElements").models) {
                console.log("go build html");
                var jqWidget = this.buildJqueryHtmlFromWidget(Widget.get("htmlElements").models[index], null);
                htmlsWidget.push(jqWidget);
            }
            return htmlsWidget;
        },
        /**
         *
         * @param htmlElement
         * @param parent, null when it's a widget root element
         * @return {*|jQuery|HTMLElement} or String
         */
        buildJqueryHtmlFromWidget: function(htmlElement, parent) {
            console.log("buildJqueryHtmlFromWidget");
            var jqWidget = null;
            if(htmlElement.get("tag") != null && htmlElement.get("tag") != "") {
                jqWidget = $('<'+ htmlElement.get("tag") +'>')
                for(var index in htmlElement.get("htmlParameters")) {
                    jqWidget.attr(htmlElement.get("htmlParameters")[index].name, htmlElement.get("htmlParameters")[index].value);
                }

                for(var index in htmlElement.get("children").models)
                    this.buildJqueryHtmlFromWidget(htmlElement.get("children").models[index], jqWidget);

                jqWidget.append(htmlElement.get("value"));
            } else {
                jqWidget = htmlElement.get("value");
            }
            if(parent != null)
                parent.append(jqWidget);
            return jqWidget;
        },

        /**
         *
         * @param jqObject
         * @param classStr
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