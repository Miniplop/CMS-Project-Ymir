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
                        self.resetSelectUi();
                    }
                });
                $( ".stage" ).on( "dblclick", "*", function( event ) {
                    self.resetSelectUi();
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
         * @param widget_id
         * @param selected
         */
        initSelectWidgetListeners: function(widget_id, selected, isContainer) {
            $("#delete-widget").on("click", function(event) {
                App.PageBuilder.removeWidget(widget_id, selected);
                App.DragDropHandler.refreshDrop();
                event.preventDefault();
            });
            if(isContainer) {
                $("#edit-widget-container").on("click", function(event) {
                    console.log("edit widget container");
                });
            } else {
                if(selected.parent().attr("data-container")) {
                    (function(self) {
                        $("#get-widget-container").on("click", function(event) {
                            self.resetSelectUi();
                            var widget_elem = self.getWidgetElement(selected.parent());
                            console.log(widget_elem);
                            if(widget_elem != null) {
                                self.initSelectWidgetUi(widget_elem);

                                event.stopPropagation();
                                event.preventDefault();
                            }
                        });
                    })(this);
                }
            }
        },
        /**
         *
         * @param selected
         */
        initSelectWidgetUi: function(selected) {
            $( ".stage" ).addClass("stage-selected");
            selected.addClass("ui-selected");
            this.initializeWidgetOptionView(selected.data("widget-id"), selected, selected.data("container") != null);
            this.initSelectWidgetListeners(selected.data("widget-id"), selected, selected.data("container") != null);

        },
        /**
         *
         * @param widget_id
         * @param selected
         * @param isContainer
         */
        initializeWidgetOptionView: function(widget_id, selected, isContainer) {
            $($('#widget-edit').html()).offset(selected.offset()).appendTo("body");
            if(isContainer) {
                //$("#edit-widget-container").css("display", "block");
            } else {
                if(selected.parent().attr("data-container")) {
                    $("#get-widget-container").css("display", "block");
                }
            }
            $("#delete-widget").css("display", "block");
        },
        /**
         *
         * @param selected
         */
        initSelectHtmlElementUi: function(selected) {
            $($('#html-element-edit').html()).offset(selected.offset()).appendTo("body");
            $("#get-html-element-container").css("display", "block");
            this.initializeHtmlElementListeners(selected);
            $( ".stage" ).addClass("stage-selected");
            selected.addClass("ui-selected");
            this.initializeHtmlPropView(selected.data("html-element-id"), selected);
            this.showPropertiesToolbar();
        },
        initializeHtmlElementListeners: function(selected) {
            (function(self) {
                $("#get-html-element-container").on("click", function(event) {
                    self.resetSelectUi();
                    var widget_elem = self.getWidgetElement(selected.parent());
                    console.log(widget_elem);
                    if(widget_elem != null) {
                        self.initSelectHtmlElementUi(widget_elem);

                        event.stopPropagation();
                        event.preventDefault();
                    }
                });
            })(this);
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
        resetSelectUi: function() {
            this.resetClass();
            App.creativeView.cancelPropertiesView();
            $('.toolbar-parameter').css('bottom', '-40%');
            $('.widget-menu').remove();
            $("#delete-widget").off();
            $($('#widget-edit').html()).find("#delete-widget").css("display", "none");
            $($('#widget-edit').html()).find("#get-widget-container").css("display", "none");
            $($('#widget-edit').html()).find("#edit-widget-container").css("display", "none");
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
            if(htmlElement != null){
                App.creativeView.propertiesView(htmlElement.get("properties"));
                
                // Si on est sur un champ de texte
                if(htmlElement.get("value")){
                    
                    // Récupération du template
                    jqObject.attr('contenteditable','true');
                    jqObject.addClass('editing');
                    jqObject.focus();
                    // Peut etre optimiser
                    
                    // Activation de la perte de focus du formulaire d'edition de texte 
                    $(".editing").blur(function(event){
                        console.log("blur");
                        App.PageBuilder.getPage().getHtmlElement(htmlElementId).set("value",$(this).text());
                        jqObject.removeClass('editing');
                        App.PageBuilder.reloadIframe();
                    });
                }
            }
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