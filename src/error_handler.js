/**
 * custom error handler
 *
 * @param msg (string}
 * @param url {string}
 * @param line {int}
 * @param col {int}
 * @param error {object}
 * @returns {boolean}
 * @see {@link https://github.com/zdenekgebauer/js-error-handler}
 */
window.onerror = function (msg, url, line, col, error) {
	var trace = (error !== undefined && error !== null ? error.stack : ''),
		script = document.getElementById('error-handler'),
		alertOnError = Boolean(script.getAttribute('data-alert') === 'true'),
		sendUrl = (script.getAttribute('data-log') == '' ? false : script.getAttribute('data-log'));
	if (window.sendErrorTo !== undefined) {
		sendUrl = (window.sendErrorTo === '' ? false : window.sendErrorTo);
	}
	if (window.alertOnError !== undefined) {
		alertOnError = Boolean(window.alertOnError);
	}

	col = col ? col : '';

	if (alertOnError) {
		alert(msg + "\nURL:" + url + ' line:' + line + ', col:' + col + "\ntrace:\n" + trace);
	}

	if (sendUrl) {
		var data = 'msg=' + encodeURIComponent(msg) + '&url=' + url + '&line=' + line + '&col=' + col
			+ '&trace=' + trace + '&page=' + encodeURIComponent(window.location.href);
		if (navigator.sendBeacon) {
			navigator.sendBeacon(sendUrl, data);
		} else {
			var request = new XMLHttpRequest();
			request.open('POST', sendUrl, true);
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			request.send(data);
		}
	}

	return (alertOnError || sendUrl)
};