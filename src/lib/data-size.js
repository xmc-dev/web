export function byteSizeToString(size) {
	if (size < 1000) {
		return size.toString() + ' B';
	}
	return (size / 1000).toFixed(2) + ' KB';
}
