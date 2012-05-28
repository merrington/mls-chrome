var VIEWED = "viewed";
var SAVED = "saved";
var LSP = "mlsext_";

function saveStatus(pid, status) {
	//update the keys with this property
	var keys = JSON.parse(window.localStorage.getItem(LSP));
	//check if this property already exists
	if (jQuery.inArray(pid, keys) == -1) {
		keys.push(pid);
		window.localStorage.setItem(LSP, JSON.stringify(keys));
	}

	if (status == SAVED) {
		window.localStorage.setItem((LSP + pid), status);
		setSavedPid(pid);
	}
	else if (status == VIEWED) {
		window.localStorage.removeItem(LSP + pid);
		removeSavedPid(pid);
	}

	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {newStatus: status});	//don't send any response to this, all scripts need to get this update
	});
	/*console.log("newstatus "+status);
	chrome.extension.sendRequest({newStatus: status}, function(response) {
		console.log("someone responded");
	});*/
}

function getStatus(pid) {
	return window.localStorage.getItem(LSP+pid);
}

function setSavedPid(pid) {
	//get the current tab
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {buildObject: pid}, function(response) {
			var obj = response.object;
			var savedList = JSON.parse(window.localStorage.getItem(LSP+SAVED));
			savedList.push(obj);
			window.localStorage.setItem(LSP+SAVED, JSON.stringify(savedList));
		});
	});
}

function removeSavedPid(pid) {
	var savedList = JSON.parse(window.localStorage.getItem(LSP+SAVED));
	for (obj in savedList) {
		if (savedList[obj].pid == pid) {
			savedList.splice(obj,1);
		}

	}
}

/*
keys = []

savedPid = {
	"id" : _pid_,
	"imgUrl" : _imgUrl_,
	"description" : _desc_,
	"address" : _addr_,
	"price" : _price_,
	"notes" : _notes_ 		//coming later
}
*/