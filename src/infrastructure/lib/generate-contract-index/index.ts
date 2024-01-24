export function GenerateContractIndex(id: number) {
	let result = "";
	const lastTwoDigitOfYear = new Date().getFullYear().toString().slice(-2);
	const month =
		(new Date().getMonth() + 1).toString().length > 1
			? (new Date().getMonth() + 1).toString()
			: `0${(new Date().getMonth() + 1).toString()}`;
	result += lastTwoDigitOfYear + month + id.toString();

	return result;
}
