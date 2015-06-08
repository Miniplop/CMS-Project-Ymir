var App = App || {};
/**
 *
 */
(function () {
    /**
     *
     * @constructor
     */
	var DropHandler = function() {
		this.initialize();
	};
	_.extend(DropHandler.prototype, {


		initialize: function() {
			(function(self) {
				$('.droppable').droppable({
                    accept: ':not(.mobile)',
					drop: self.handleDropEvent,
					hoverClass: 'drop-hover',
                });
			})(this);

		},


        /**
         *
         */
		refresh: function() {
            (function(self) {
                $('.stage').find('.droppable').droppable({
                    accept: ':not(.mobile)',
                    greedy: true,
                    drop: self.handleDropEvent,
                    hoverClass: 'drop-hover'
                });
            })(this);
		},

        /**
         *
         * @param event
         * @param ui
         */
		handleDropEvent: function (event, ui) {
			var recipier_id = $(this).data('meta-widget-id'),
                categorie_id = $(ui.draggable).data('categorie-id'),
                meta_widget_id = $(ui.draggable).data('meta-widget-id'),
                meta_widget = null;
            meta_widget_to_add = window.App.categories.getMetaWidget(meta_widget_id);

			if (categorie_id == 3) { //containers
				var form = new window.App.Forms.ContainerParametersForm({
					name: 'Container',
					nbColumns: 1,
					isRow: false,
					columnsSizes: [12],
					metaWidget: meta_widget_to_add,
					parent: this,
                    stageIsRecipier: (recipier_id == null)
				});
			} else {
                App.PageBuilder.addWidgetFromMeta(meta_widget_to_add, $(this));
                App.DragDropHandler.refreshDrop();
            }
		}
	});


    /**
     *
     * @constructor
     */
	var DragHandler =  function () {
		this.initialize();
	};
	_.extend(DragHandler.prototype, {
        /**
         *
         */
		initialize: function() {
			$('.toolbar-meta-widget').bind('DOMSubtreeModified', function () {
				$('.draggable').draggable({
					revert: 'invalid', // si dropper dans un zone non .droppable, l'element retourne à la source sans s'ajouter
					opacity: 0.45,
					containement: 'page',
                    stack: '.stage',
					helper: function () {
						var meta_widget_id = $(this).data('meta-widget-id'), widget = null;
                        metaWidget = window.App.categories.getMetaWidget(meta_widget_id);
						if (metaWidget != null) {
							return $(metaWidget.get('htmlPreview'));
						} else {
							return $('<div></div>');
						}
					}

				});
			});
			$('.device-draggable').draggable().css('position', 'absolute');
		}
	});

    /**
     *
     * @constructor
     */
	function DragDropHandler () {
		this.DragHandler = new DragHandler();
		this.DropHandler = new DropHandler();
	};
    _.extend(DragDropHandler.prototype, {
        /**
         *
         */
        refreshDrop: function() {
            this.DropHandler.refresh();
        }
    });
    App.Utils.DragDropHandler = DragDropHandler;
    return App.Utils.DragDropHandler;
})();