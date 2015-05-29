var DragDropHandler = (function () {
	'use strict';
	
	
	function handleDropEvent(event, ui) {
	}
	
	var DragHandler = {
		defaults: {
		},
		init: function () {
			$(".toolbar-widget").bind("DOMSubtreeModified", function () {
				$(".draggable").draggable({
					revert: "invalid", // si dropper dans un zone non .droppable, l'element retourne à la source sans s'ajouter
					opacity: 0.45,
					containement: "page",
					helper: function () {
						var id = $(this).data("widget-id");
						var widget = window.app.categories.getWidget(id);
						return $(widget.get("htmlPreview"));	
					},
					start: function ( event, ui ) {
					},
					stop: function () {
					}

				});
			});
			$(".device-draggable").draggable().css("position", "absolute");
		}
	};
	

	var DropHandler = {
		init: function () {
			$(".droppable").droppable({
				drop: handleDropEvent
			});
			$(".stage").bind("DOMSubtreeModified", function () {
				$(".droppable").droppable({
					drop: handleDropEvent
				});
			});
		}
	};

	DragHandler.init();
	DropHandler.init();
});