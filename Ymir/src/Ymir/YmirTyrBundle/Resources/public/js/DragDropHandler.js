var DragDropHandler = function () {
	'use strict';
	
	
	function initContainerParameterForm() {
		
		$("#container-modal #name").val("Container");
		$("#container-modal #nbColumns").val(1);
		$("#container-modal #isRow").attr("checked", false);
		$("#container-modal .columnsSize").val(1);
		while($("#container-modal .columnsSize:last").data("column-index") > 1)
			$("#container-modal .columnsSize:last").remove();
		
		$("#container-modal #nbColumns").on("change", function() {
			var nbColumn = $(this).val();
			while($("#container-modal .columnsSize:last").data("column-index") > nbColumn)
				$("#container-modal .columnsSize:last").remove();
			
			var curr_index = $("#container-modal .columnsSize:last").data("column-index") + 1;
			while($("#container-modal .columnsSize:last").data("column-index") < nbColumn) {
				$("#container-modal .columnsSize:last").after('<select data-column-index="'+curr_index+'" name="columnsSize_'+curr_index+'" class="columnsSize"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option> </select>');
				curr_index++;
			}
				
		});
		$("#container-parameters-add").on("click", function(event) {
			$('#container-modal').foundation('reveal', 'close');
			event.preventDefault();
			var nb_column = $("#container-modal #nbColumns").val();
			var columnsSizes = {};
			$("#container-modal .columnsSize").each(function(index) {
				columnsSizes[index+1] = $(this).val();
			});
			var container = $("<section>");
			if($("#container-modal #isRow").prop("checked"))
				container.addClass("row");
			for(var colSize in columnsSizes)
				container.append('<div class="large-'+columnsSizes[colSize]+' columns droppable"></div>');
			container.children().last().addClass("end");
			$(".stage").append(container);
		});
		$("#container-modal").foundation('reveal', 'open');
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