var VIEWED = "viewed";
var SAVED = "saved";

function saveStatus(pid, status) {
	if (status == SAVED)
		localStorage[LSP+pid] = status;
	else if (status == VIEWED)
		localStorage.removeItem(pid);
	
	chrome.tabs.sendRequest(tab.id, {newStatus: status});	//don't send any response to this, all scripts need to get this update
	/*console.log("newstatus "+status);
	chrome.extension.sendRequest({newStatus: status}, function(response) {
		console.log("someone responded");
	});*/
}