var App = App || {};
/**
 *
 */
(function () {
    
    function PageSelector (){
        this.initialize();
    };
    _.extend(PageSelector.prototype, {
        /**
         *
         */
         initialize : function() {
            (function(self) {

                $( ".stage" ).on( "click", "*", function( event ) {
                    $( ".stage" ).find('.ui-selected').removeClass('ui-selected');
                    if ($( this).data("html-element-id")) {
                        $( this).addClass("ui-selected");
                        self.elementSelected($( this).data("html-element-id"), this);
                    }
                    event.stopPropagation();
                    event.preventDefault();
                });
            })(this);
        },
        /**
         *
         * @param htmlElementId
         * @param jqObject
         */
        elementSelected: function(htmlElementId, jqObject) {
            var htmlElement = App.page.getHtmlElement(htmlElementId);
            $('.toolbar-parameter').css('bottom', 0);
            App.creativeView.propertiesView(htmlElement.get("properties"));


        }
    });

    App.Utils.PageSelector = PageSelector;
    return App.Utils.PageSelector;
})();