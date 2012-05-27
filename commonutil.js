function saveStatus(pid, status) {
	localStorage[LSP+pid] = status;
	chrome.extensions.sendRequest({newStatus: status});
}