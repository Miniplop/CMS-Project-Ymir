App.Forms.ContainerParametersForm = function(options) {
	this.options = options || {};
    this.container = null;
    this.initialize();
};
_.extend(App.Forms.ContainerParametersForm.prototype, {
    /**
     * @description
     *      initializes modal to the settings from the container
     */
	initialize: function () {
		$('#container-modal #name').val(this.options.name);
		$('#container-modal #nbColumns').val(this.options.nbColumns);
		$('#container-modal #isRow').attr('checked', this.options.isRow);

        // remove previous added column (modal is not reinitialized after add so we do it on loading)
        this.resetUI(this.options.nbColumns);

        // when i change number of column, i add or remove their size.
        (function(self) {
            $("#container-modal #nbColumns").on("change", function() {
                console.log("GO CHANGE");
                var nbColumn = $(this).val();
                // remove column if there i
                self.resetUI(nbColumn);

                // add missing column size choice
                var curr_index = $("#container-modal .row:last .columns:first").data("column-index") + 1;
                while($("#container-modal .row:last .columns:first").data("column-index") < nbColumn) {
                    console.log("WHILE");
                    self.addColumnChoice(curr_index);
                    curr_index++;
                }

            });
        })(this);
		(function(self) {
            // when add is clicked, i get the settings and i add container to the stage.
            // I refresh drop zones after that because i can drop into a container.
			$("#container-parameters-add").on("click", function(event) {
				$('#container-modal').foundation('reveal', 'close');
				event.preventDefault();
                var containerParameters = self.getContainerParameters();
                App.PageBuilder.addContainer(containerParameters);
                App.DragDropHandler.refreshDrop();
                $("#container-parameters-add").off();
			});
		})(this);
		$("#container-modal").foundation('reveal', 'open');
	},
    /**
     * @param index
     * @description
     *      Create a new Column choice
     */
    addColumnChoice: function(index) {
        $("#container-modal .row:last").after('<div class="row"><select data-column-index="'+index+'" name="columnsSize_'+index+'" class="columnsSize-Large large-4 columns"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select><select data-column-index="'+index+'" name="columnsSize_'+index+'" class="columnsSize-Medium large-4 columns"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select><select data-column-index="'+index+'" name="columnsSize_'+index+'" class="columnsSize-Small large-4 columns" ><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></div>');
    },
    /**
     * @param nbColumn
     * @description
     *      remove column if their data-column-index is greater than nbColumn
     */
    resetUI: function(nbColumn) {
        while($("#container-modal .columnsSize:last").data("column-index") > nbColumn)
            $("#container-modal .columnsSize:last").remove();

        for(var i = 1; i <= nbColumn; i++)
            $('#container-modal .columnsSize[name=columnsSize_'+this.options.nbColumns+']').val(12);
    },

	getContainer: function () {
		return this.container;
	},
    /**
     *
     * @return {{meta_widget: (form.metaWidget|*), nb_column: (*|jQuery), columnsSizes: {}, parent: (*|jQuery|HTMLElement), isRow: (*|jQuery)}}
     * @description
     *      build the structure that describe a container.
     */
    getContainerParameters: function () {
        var columnsSizes = {};
        // get column size and add them to the structure.
        $("#container-modal .columnsSize").each(function(index) {
            columnsSizes[index+1] = $(this).val();
        });
        var containerParameters = {
            meta_widget: this.options.metaWidget,
            nb_column: $("#container-modal #nbColumns").val(),
            columnsSizes: columnsSizes,
            parent: $(this.options.parent),
            isRow: $("#container-modal #isRow").prop("checked")
        };
        return containerParameters;
    }
});