// modal.js : Handle the dialog window to define the parameters of a new section
var ModalHandler = (function () {
	// 'use strict';
	console.log("creation de la modal");

	var Modal = {
		init: function(){	
			$(".modalSection").dialog({
				autoOpen: false, // creation of a hidden instance of the dialog box
				modal: true 
			});
		}
	};

	Modal.init();

});