var SAVED = "saved";
var VIEWED = "viewed";
var LSP = "mlsext_";	//local store prefix
var pid = "";

chrome.tabs.getSelected(null, function(currentTab) {
	setPid(currentTab.url);
});

function setPid(url) {
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