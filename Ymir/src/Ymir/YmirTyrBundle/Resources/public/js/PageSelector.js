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
                $( "body" ).on( "click", "*", function( event ) {
                    if($(this).hasClass("not-disable-selection")) {
                        event.stopPropagation();
                    } else {
                        self.resetSelectUi();
                    }
                });
                $( ".stage" ).on( "dblclick", "*", function( event ) {
                    if ($(this).data("html-element-id")) {
                        self.initSelectUi($(this));
                    }
                    event.stopPropagation();
                    event.preventDefault();
                });
            })(this);
        },
        initSelectUi: function(selected) {
            $( ".stage" ).addClass("selected");
            selected.addClass("ui-selected");
            this.initializeView(selected.data("html-element-id"), selected);
            this.showPropertiesToolbar();
        },
        showPropertiesToolbar: function() {
            $('.toolbar-parameter').css('bottom', '0');
        },
        resetSelectUi: function() {
            this.resetClass();
            App.creativeView.cancelPropertiesView();
            $('.toolbar-parameter').css('bottom', '-40%');
        },
        resetClass: function() {
            $( ".stage" ).find("*").removeClass('ui-selected');
            $( ".stage" ).removeClass("selected");
        },
        /**
         *
         * @param htmlElementId
         * @param jqObject
         */
        initializeView: function(htmlElementId, jqObject) {
            var htmlElement = App.page.getHtmlElement(htmlElementId);
            App.creativeView.propertiesView(htmlElement.get("properties"));
        }
    });

    App.Utils.PageSelector = PageSelector;
    return App.Utils.PageSelector;
})();