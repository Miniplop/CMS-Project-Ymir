var App = App || {};
(function () {
	var DropHandler = function() {
		this.initialize();
	};
	_.extend(DropHandler.prototype, {


		initialize: function() {
			(function(self) {
				$('.droppable').droppable({
					drop: self.handleDropEvent,
					hoverClass: 'drop-hover',
                    greedy: true
                });
			})(this);

		},



		refresh: function() {
            (function(self) {
                $('.stage').find('.droppable').droppable({
                    drop: self.handleDropEvent,
                    hoverClass: 'drop-hover',
                    greedy: true
                });
            })(this);
		},

		handleDropEvent: function (event, ui) {

			var recipier_id = $(this).data('meta-widget-id'), categorie_id = $(ui.draggable).data('categorie-id'), meta_widget_id = $(ui.draggable).data('meta-widget-id');

			if (categorie_id == 3) { //containers
				var form = new window.App.Forms.ContainerParametersForm({
					name: 'Container',
					nbColumns: 1,
					isRow: false,
					columnsSizes: [12],
					metaWidget: window.App.categories.getMetaWidget(meta_widget_id),
					parent: this,
                    stageIsRecipier: (recipier_id == null)
				});
				console.log('this is a container');
			} else {
                App.PageBuilder.addElement(meta_widget_id, categorie_id, recipier_id);
            }
		}
	});

	var DragHandler =  function () {
		this.initialize();
	};
	_.extend(DragHandler.prototype, {
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

	function DragDropHandler () {
		this.DragHandler = new DragHandler();
		this.DropHandler = new DropHandler();
	};
    _.extend(DragDropHandler.prototype, {
        refreshDrop: function() {
            this.DropHandler.refresh();
        }
    });
    App.Utils.DragDropHandler = DragDropHandler;
    return App.Utils.DragDropHandler;
})();