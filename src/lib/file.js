export function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		console.log(file);
		reader.readAsDataURL(file);
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}
