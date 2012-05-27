var SAVED = "saved";
var VIEWED = "viewed";
var LSP = "mlsext_";	//local store prefix
var pid = "";
var tab = "";

chrome.tabs.getSelected(null, function(currentTab) {
	setPid(currentTab.url);
	tab = currentTab;
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
	})

	chrome.extension.sendRequest({viewing: pid}, function(response) {
		toggleButtons(response.status)
	});
}

function toggleButtons(status) {
	if (status == SAVED) {
		$("#saveBtn").button('loading');
		$("#deleteBtn").button('reset');
	} else if (status == VIEWED) {
		$("#saveBtn").button('reset');
		$("#deleteBtn").button('loading');
	}
}