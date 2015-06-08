var App = App || {};
/**
 *
 */
App.Views.PropertyView = Backbone.View.extend({
    template: null,
    tagName: 'li',
    className   :'not-disable-selection',
    events:{
        'change input' : 'change'
    },
    /**
     *
     */
    initialize: function() {
        this.template = _.template($('#property-template').html());
    },
    /**
     *
     * @return {App.Views.PropertyView}
     */
    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    },
    change: function(e) {
        var newVal = $(e.currentTarget).val();
        this.model.set('value', newVal);

        if(this.model.get("type") == "css")
            $('.ui-selected').css(this.model.get("identifier"), this.model.get("value"));
        else if(this.model.get("type") == "html")
            $('.ui-selected').attr(this.model.get("identifier"), this.model.get("value"));
        App.PageBuilder.reloadIframe();
    }
});
