import shajs from 'sha.js';
import { OAUTH2 } from '../../config';

function paramsString(params) {
	return Object.entries(params)
		.map(param => {
			return encodeURIComponent(param[0]) + '=' + encodeURIComponent(param[1]);
		})
		.join('&');
}

function base64URLEncode(str) {
	return str
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');
}

export function auth({ scope }) {
	const verifierArr = new Uint8Array(43);
	crypto.getRandomValues(verifierArr);
	const verifier = base64URLEncode(
		btoa(String.fromCharCode.apply(null, verifierArr))
	);

	const challenge = base64URLEncode(
		shajs('sha256')
			.update(verifier)
			.digest('base64')
	);

	const reqOpts = {
		scope,
		response_type: 'code',
		client_id: OAUTH2.clientId,
		code_challenge: challenge,
		code_challenge_method: 'S256',
		redirect_uri: OAUTH2.redirectUri
	};
	console.log(OAUTH2.url + '/authorize?' + paramsString(reqOpts));
}
