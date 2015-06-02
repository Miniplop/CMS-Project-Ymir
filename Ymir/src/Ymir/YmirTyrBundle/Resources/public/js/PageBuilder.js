var App = App || {};
(function () {

    function PageBuilder (page) {
        if (page != null)
            this.page = page;
        else
            this.page = new App.Models.Page();
        _.bindAll(this, "initialize");
        this.page.fetch ({
            success: this.initialize,
        });        
    };
    _.extend(PageBuilder.prototype, {
        initialize: function() {
            var container = $("stage");
            for(var widget in this.page.widgets) {
                var element = widget.render();
                container.append(element);
            }
        },
        addElement: function() {
            //addWidget();...
        },
        addContainer: function(tag, isRow, nbColumns, columnsSizes) {

        }

    });
    App.Utils.PageBuilder = PageBuilder;
    return App.Utils.PageBuilder;
})();