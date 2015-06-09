var App = App || {};
/**
 *
 */
(function () {

    /**
     *
     * @constructor
     */
    function PageSelector (){
        this.initialize();
    };
    _.extend(PageSelector.prototype, {
        /**
         *
         */
         initialize : function() {
            (function(self) {
                $( "body" ).on( "click", "*", function( event ) {
                    if($(this).hasClass("not-disable-selection")) {
                        event.stopPropagation();
                    } else {
                        self.resetSelectHtmlElementUi();
                    }
                });
                $( ".stage" ).on( "dblclick", "*", function( event ) {
                    self.resetClass();
                    if ($(this).data("html-element-id")) {
                        self.initSelectHtmlElementUi($(this));
                    }
                    event.stopPropagation();
                    event.preventDefault();
                });
                $( ".stage" ).on( "click", "*", function( event ) {
                    var widget_elem = self.getWidgetElement($(this));
                    if(widget_elem != null) {
                        self.initSelectWidgetUi(widget_elem);
                    }

                    event.stopPropagation();
                    event.preventDefault();
                });
            })(this);
        },
        /**
         *
         * @param selected
         */
        initSelectWidgetUi: function(selected) {
            $( ".stage" ).addClass("stage-selected");
            selected.addClass("ui-selected");
            this.initializeWidgetOptionView(selected.data("widget-id"), selected, selected.data("container") != null);

        },
        initializeWidgetOptionView: function(widget_id, selected, isContainer) {
            if(isContainer) {
                // icone de modification des parametres du container.
            } else {
                if(selected.parent().data("container")) {
                    // icone de selection du container parent
                }
                //icone de suppression
            }
        },
        /**
         *
         * @param selected
         */
        initSelectHtmlElementUi: function(selected) {
            $( ".stage" ).addClass("stage-selected");
            selected.addClass("ui-selected");
            this.initializeHtmlPropView(selected.data("html-element-id"), selected);
            this.showPropertiesToolbar();
        },
        /**
         *
         */
        showPropertiesToolbar: function() {
            $('.toolbar-parameter').css('bottom', '0');
        },
        /**
         *
         */
        resetSelectHtmlElementUi: function() {
            this.resetClass();
            App.creativeView.cancelPropertiesView();
            $('.toolbar-parameter').css('bottom', '-40%');
        },
        resetClass: function() {
            $( ".stage" ).find("*").removeClass('ui-selected');
            $( ".stage" ).removeClass("stage-selected");
        },
        /**
         *
         * @param htmlElementId
         * @param jqObject
         */
        initializeHtmlPropView: function(htmlElementId, jqObject) {
            var htmlElement = App.PageBuilder.getPage().getHtmlElement(htmlElementId);
            if(htmlElement != null)
                App.creativeView.propertiesView(htmlElement.get("properties"));
            else {
                console.error("no html element for id : " + htmlElementId);
            }
        },
        /**
         *
         * @param jqObject
         * @return {*}
         */
        getWidgetElement: function(jqObject) {
            if(jqObject.data("widget-id"))
                return jqObject;
            else if(jqObject.parent() != null && !jqObject.parent().hasClass(".stage"))
                return this.getWidgetElement(jqObject.parent());
            return null;
        }
    });

    App.Utils.PageSelector = PageSelector;
    return App.Utils.PageSelector;
})();