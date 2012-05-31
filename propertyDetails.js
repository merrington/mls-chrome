var VIEWED = "viewed";
var SAVED = "saved";

//inject bootstrap css
var style = document.createElement('link');
style.rel = "stylesheet";
style.type = "text/css";
style.href = chrome.extension.getURL("css/bootstrap.min.css");
document.head.appendChild(style);

$(function() {
	//get the ID of the property
	var action = $("#frmMain").attr("action");
	var pidStart = action.indexOf("=")+1;
	var pidStop = action.indexOf("&");
	if (pidStop == -1)
		pidStop = action.length;
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
		$("body").append('<div id="viewed_alpha_box" style="position:fixed; '+
			'top:0; left:0; width:100%; height:100%; background:#6E6E6E; '+
			'pointer-events:none; z-index:100; opacity:0.3;"/>');
		//show popup
		$("body").prepend('<div id="viewed_alert" style="position:relative; top:0; left:10%; '+
			'width:80%; height:30px; background-color:#ffc000; z-index:101; '+
			'-webkit-border-bottom-left-radius:15px; -webkit-border-bottom-right-radius:15px;">'+
		 	'<h4 id="viewed_alert_text" style="position:absolute; width:100%; height:100%; '+
		 	'display:table-cell; vertical-align:middle; text-align:center;">'+
		 	'You have previously viewed this property and did not mark it'+
		 	'</h4>'+
		 	'<p style="position:absolute; top:5; right:10;"><button class="btn btn-mini btn-inverse" id="close_popup"><i class="icon-remove icon-white"></i> </button></p></div>'
		 );
		$("#saved_alert").remove();
	} else if (status == SAVED) {
		$("body").prepend('<div id="saved_alert" style="position:relative; top:0; left:10%; '+
			'width:80%; height:30px; background-color:#58FA58; z-index:101; '+
			'-webkit-border-bottom-left-radius:15px; -webkit-border-bottom-right-radius:15px;">'+
		 	'<h4 style="position:absolute; width:100%; height:100%; '+
		 	'display:table-cell; vertical-align:middle; text-align:center;">'+
		 	'You have this property saved</h4>'+
		 	'<p style="position:absolute; top:5; right:10;"><button class="btn btn-mini btn-inverse" id="close_popup"><i class="icon-remove icon-white"></i> </button></p>'+
		 	'</div>'
		 );
		$("#viewed_alpha_box").remove();
		$("#viewed_alert").remove();
	}

	$("#close_popup").click(function() {
		$("#viewed_alpha_box").remove();
		$("#viewed_alert").remove();
		$("#saved_alert").remove();
	});
}

function updateStatusListener(request, sender, sendResponse) {
	if (request.newStatus != null) {
		console.log(request.newStatus);
		updateStatus(request.newStatus);
	}
}

function buildObject(request, sender, sendResponse) {
	if (request.buildObject != null) {
		var obj = {};
		obj.pid = request.buildObject;
		obj.imgUrl = $("#_ctl0_imgHouse").attr('src');
		obj.description = $("div.PropDetailsRemarksValue").first().text();
		obj.address = $("#_ctl0_elLocationMap1_lblAddress").text();
		var price = $("td.MainHeadingRight").first().find($("span")).first().text().trim();
		obj.price = price.substring(price.indexOf(": ")+2, price.length);

		sendResponse({object: obj});
	}
}

chrome.extension.onRequest.addListener(updateStatusListener);
chrome.extension.onRequest.addListener(buildObject);