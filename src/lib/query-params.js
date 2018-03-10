export function objectToParams(obj) {
	return Object.entries(obj)
		.map(param => {
			return encodeURIComponent(param[0]) + '=' + encodeURIComponent(param[1]);
		})
		.join('&');
}

export function paramsToObject(params) {
	let obj = {};
	for (let param of params.substr(1).split('&')) {
		const pair = param.split('=');
		obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]).replace(
			/\+/g,
			' '
		);
	}

	return obj;
}
