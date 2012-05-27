var VIEWED = "viewed";
var SAVED = "saved";
var LSP = "mlsext_";

function saveStatus(pid, status) {
	//update the keys with this property
	var keys = JSON.parse(localStorage.getItem(LSP));
	//check if this property already exists
	if (jQuery.inArray(pid, keys) == -1) {
		//var obj = {};
		//obj["pid"] = pid;
		keys.push(pid);
		console.log("stringify: "+JSON.stringify(keys));
		localStorage.setItem(LSP, JSON.stringify(keys));
	}

	if (status == SAVED)
		localStorage.setItem(LSP.concat(pid), status);
	else if (status == VIEWED)
		localStorage.removeItem(LSP.concat(pid));

	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {newStatus: status});	//don't send any response to this, all scripts need to get this update
	});
	/*console.log("newstatus "+status);
	chrome.extension.sendRequest({newStatus: status}, function(response) {
		console.log("someone responded");
	});*/
}

function getStatus(pid) {
	return localStorage.getItem(LSP.concat(pid));
}

/*
keys = {
	"keys": [
		{_pid_: "true"}

		{"item": _pid_},
		{"item": _pid2_},
		...
	]
};
*/