var VIEWED = "viewed";
var SAVED = "saved";

$(function() {
	//get the ID of the property
	var action = $("#frmMain").attr("action");
	var pidStart = action.indexOf("=")+1;
	var pidStop = action.indexOf("&");
	action = action.slice(pidStart, pidStop);

	//send this to the background script(?) so that it gets saved
	chrome.extension.sendRequest({viewing: action}, function(response) {
		var status = response.status;
		updateStatus(status);
	});	
});

function updateStatus(status) {
	if (status == VIEWED) {	
		//if viewed, add a box over the content
		$("body").append('<div id="viewed_alpha_box"/>');
		$("#viewed_alpha_box").css("position", "fixed");
		$("#viewed_alpha_box").css("top", "0");
		$("#viewed_alpha_box").css("left", "0");
		$("#viewed_alpha_box").css("width", "100%");
		$("#viewed_alpha_box").css("height", "100%");
		$("#viewed_alpha_box").css("background", "#6E6E6E");
		$("#viewed_alpha_box").css("pointer-events", "none");
		$("#viewed_alpha_box").css("z-index", "100");
		$("#viewed_alpha_box").css("opacity", "0.3");
		//show popup
		$("body").prepend('<div style="position:relative; top:0; left:0; '+
			'width:100%; height:30px; background-color:#ffc000; z-index:101;">'+
		 	'<p style="position:absolute; width:100%; height:100%; '+
		 	'display:table-cell; vertical-align:middle; text-align:center;">'+
		 	'You have previously viewed this property and did not mark it'+
		 	'</p></div>'
		 );
	} else if (status == SAVED) {
		$("body").prepend('<div style="position:relative; top:0; left:0; '+
			'width:100%; height:30px; background-color:#ffc000; z-index:101;">'+
		 	'<p style="position:absolute; width:100%; height:100%; '+
		 	'display:table-cell; vertical-align:middle; text-align:center;">'+
		 	'You have this property saved</p>'+
		 	'</div>'
		 );
	}
}

function updateStatusListener(request, sender, sendResponse) {
	if (request.newStatus != null)
		updateStatus(request.newStatus);
}

chrome.extensions.onRequest.addListener(updateStatusListener);