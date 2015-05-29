var DragDropHandler = (function() {
	
	var DragHandler = {
		init: function() {
			$(".toolbar-widget").bind("DOMSubtreeModified", function() {
				$(".draggable").draggable({
					revert: "invalid", // si dropper dans un zone non .droppable, l'element retourne à la source sans s'ajouter
					opacity: 0.45,
					containement: "page",
					helper: "clone",
					start: function() {
					}
					
				});
			});
			
			$(".device-draggable").draggable().css("position", "absolute");

			$(".stage").on('dragover', function (e) {
			    $(this).css("box-shadow",  "0 10px 10px -10px rgba(0, 0, 0, 0.5)");
			    $(this).css("-webkit-transform", "scale(1.1)");
			    $(this).css("transform", "scale(1.1)");
				console.log("enter!!");
			});
			$(".stage").bind("DOMSubtreeModified", function() {
				$(".droppable").on('dragenter', function (e) {
				    $(this).css("box-shadow",  "0 10px 10px -10px rgba(0, 0, 0, 0.5)");
				    $(this).css("-webkit-transform", "scale(1.1)");
				    $(this).css("transform", "scale(1.1)");
				});
			});
		}
	};
	

	var DropHandler = {
			init: function() {
				$(".droppable").droppable({
					drop: handleDropEvent
					
				});
			}
	};

	
	function handleDropEvent(event, ui) {
		console.log(ui);
	}
	
	DragHandler.init();
	DropHandler.init();
});