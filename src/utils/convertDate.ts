export const convertDate = (date: Date): string => {
	const newDate = new Date(date)
	const formattedDate = `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`
	return formattedDate
}
