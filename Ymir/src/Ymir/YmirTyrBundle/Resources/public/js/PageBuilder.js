var App = App || {};
(function () {

    function PageBuilder (page) {
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
            var container = $("stage");
            var widgets = this.page.get("widgets");
            widgets.each( function(widget) {
                var element = null;
                if (widget.get("htmlElements").length > 0)
                    element = widget.render(); // TODO: render doit générer un jquerry element (le machin entre $())
                container.append(element);
            });
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