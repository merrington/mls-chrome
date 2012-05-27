var SAVED = "saved";
var VIEWED = "viewed";
var LSP = "mlsext_";	//local store prefix
var pid = "";

chrome.tabs.getSelected(null, function(tab) {
	setPid(tab.url);
});

function setPid(url) {
	var pidStart = url.indexOf("=")+1;
	var pidStop = url.indexOf("&");
	pid = url.slice(pidStart, pidStop);

	$("#saveBtn").click(function() {
		$("#saveBtn").button('loading');
		$("#deleteBtn").button('reset');
		saveStatus(pid, SAVED);
	});

	chrome.extension.sendRequest({viewing: pid}, function(response) {
		var status = response.status;
		if (response.status == SAVED) {
			$("#saveBtn").button('loading');
		} else if (status == VIEWED) {
			$("#deleteBtn").button('loading');
		}
	});
}