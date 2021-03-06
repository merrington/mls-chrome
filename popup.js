var SAVED = "saved";
var VIEWED = "viewed";
var LSP = "mlsext_";	//local store prefix
var pid = "";

chrome.tabs.getSelected(null, function(currentTab) {
	setPid(currentTab.url);
});

function setPid(url) {
	if (url.indexOf("propertyDetails.aspx") == -1) {
		//this is not a property details page, hide the save/delete buttons!
		$("#saveBtn").remove();
		$("#deleteBtn").remove();
	}
	var pidStart = url.indexOf("=")+1;
	var pidStop = url.indexOf("&");
	pid = url.slice(pidStart, pidStop);

	$("#saveBtn").click(function() {
		toggleButtons(SAVED);
		saveStatus(pid, SAVED);
	});

	$("#deleteBtn").click(function() {
		toggleButtons(VIEWED);
		saveStatus(pid, VIEWED);
	});

	$("#viewBtn").click(function() {
		chrome.tabs.create({"url" :chrome.extension.getURL("listSaved.html")});
	});

	var status = getStatus(pid);
	toggleButtons(status);
}

function toggleButtons(status) {
	if (status == SAVED) {
		$("#saveBtn").button('loading');
		$("#deleteBtn").button('reset');
	} else {
		$("#saveBtn").button('reset');
		$("#deleteBtn").button('loading');
	}
}