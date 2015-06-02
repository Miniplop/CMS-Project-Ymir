var DragDropHandler = function () {
	'use strict';
	
	function initContainerParameterForm() {
		new window.App.Forms.ContainerParametersForm();
	}
	
	
	function handleDropEvent(event, ui) {
		
		var recipier_id = $(this).data("widget-id"), categorie_id = $(ui.draggable).data("categorie-id");
		
		if (recipier_id == null) {
			console.log("stage is the recipier");
		}
		
		if (categorie_id == 3) { //containers
			initContainerParameterForm();
			console.log("this is a container");
		}
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
						var id = $(this).data("widget-id"), widget = window.App.categories.getWidget(id);
						if (widget != null) {
							return $(widget.get("htmlPreview"));
						} else {
							return $("<div></div>)");
						}
					},
					start: function (event, ui) {
					},
					stop: function () {
					}

				});
			});
			$(".device-draggable").draggable().css("position", "absolute");
		}
	}, DropHandler = {
		init: function () {
			$(".droppable").droppable({
				drop: handleDropEvent
			});
			$(".stage").bind("DOMSubtreeModified", function () {
				$(".droppable").droppable({
					drop: handleDropEvent,
					hoverClass: "drop-hover"
				});
			});
		}
	};

	DragHandler.init();
	DropHandler.init();
	
	$(document).on('close.fndtn.reveal', '[data-reveal]', function () {
		var modal = $(this);
		console.log(modal);
	});
};
