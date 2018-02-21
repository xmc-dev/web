export function stringDate(date) {
    if (!date) {
        return '-';
    }
    return new Date(date).toLocaleString()
}