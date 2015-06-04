var App = App || {};


(function () {
    
    function PageSelector (){
        this.initialize();
        
    };
    
    _.extend(PageSelector.prototype, {
        
         initialize : function(){
            (function(self) {
				$('.stage').selectable({
                   selected : function(event,ui){
                       $(this).css("background-color",'#23ff00');
                        console.log(this);
                    } 
                });
			})(this);
        }
 
    });

    App.Utils.PageSelector = PageSelector;
    return App.Utils.PageSelector;
})();