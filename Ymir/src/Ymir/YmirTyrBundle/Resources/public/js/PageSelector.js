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
            if(htmlElement != null){
                App.creativeView.propertiesView(htmlElement.get("properties"));
                
                // Si on est sur un champ de texte
                if(htmlElement.get("value")){
                    
                    // Récupération du template
                    template = _.template($('#text-edition-template').html());
                    var offset = jqObject.offset();
                    var text_color = jqObject.css("color");
                    var bg_color = jqObject.css("background-color");
                    var parent_width = jqObject.css("width");
                    var parent_heigth = jqObject.css("height");
                    var parent_align = jqObject.css("text-align");
                    console.log(offset);
                    if(parent_align == "center"){
                        console.log(parent_width + " " +parent_heigth);
                        offset.top = offset.top + parent_width/2;
                        offset.left = offset.left + parent_heigth/2; 
                    }
                    console.log(offset);
                    jqObject.css("color",bg_color);
                    var html = $(template({ value : htmlElement.get("value"),id: htmlElementId, size: htmlElement.get("value").length })).offset(offset);
                    html.css("color",text_color);
                    html.css("background-color",bg_color);
                    html.appendTo("body");
                    
                    // Peut etre optimiser
                    
                    // Activation de la perte de focus du formulaire d'edition de texte 
                    $("#text-edition").blur(function(event){
                        App.PageBuilder.getPage().getHtmlElement(htmlElementId).set("value",$(this).val());
                        jqObject.css("color",text_color);
                        jqObject.text($(this).val());
                        html.remove(); // Suppression du template sur le dom
                         App.PageBuilder.reloadIframe();
                    });
                    
                    // Activation du submit du formulaire d'edition de texte 
                    $("#text-edition").change(function(event){
                        App.PageBuilder.getPage().getHtmlElement(htmlElementId).set("value",$(this).val());
                        jqObject.css("color",text_color);
                        jqObject.text($(this).val());
                        html.remove(); // Suppression du template sur le dom
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