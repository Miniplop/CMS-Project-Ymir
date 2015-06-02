App.Forms.ContainerParametersForm = function(options) {
	this.options = options || {};
    this.container = null;
    this.initialize();
};
_.extend(App.Forms.ContainerParametersForm.prototype, {
	initialize: function () {
		
		$('#container-modal #name').val(this.options.name);
		$('#container-modal #nbColumns').val(this.options.nbColumns);
		$('#container-modal #isRow').attr('checked', this.options.isRow);
		for(var i = 1; i <= this.options.nbColumns; i++)
			$('#container-modal .columnsSize[name=columnsSize_'+this.options.nbColumns+']').val(this.options.columnsSizes[i-1]);
		
		while($("#container-modal .columnsSize:last").data("column-index") > this.options.nbColumns)
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
		(function(self) {
			$("#container-parameters-add").on("click", function(event) {
				$('#container-modal').foundation('reveal', 'close');
				event.preventDefault();
                self.buildContainer();
                App.DragDropHandler.refreshDrop();
                $("#container-parameters-add").off("click", this);
			});
		})(this);
		$("#container-modal").foundation('reveal', 'open');
	},
	getContainer: function () {
		return this.container;
	},
    buildContainer: function () {
        console.log(this);
        var nb_column = $("#container-modal #nbColumns").val();
        var columnsSizes = {};
        $("#container-modal .columnsSize").each(function(index) {
            columnsSizes[index+1] = $(this).val();
        });

        this.container = $('<' + this.options.metaWidget.get('htmlElements')[0].tag + '>');
        this.container.addClass("droppable");
        if($("#container-modal #isRow").prop("checked"))
            this.container.addClass("row");
        for(var colSize in columnsSizes) {
            this.container.append('<' + this.options.metaWidget.get('htmlElements')[0].children[0].tag + ' class="large-' + columnsSizes[colSize] + ' columns droppable"></div>');
        }
        this.container.children().last().addClass("end");
        $(this.options.parent).append(this.container);
    }
});