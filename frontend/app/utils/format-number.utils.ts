export const formatNumberToK = (num: number) => {
	switch (num) {
		case 1000000000:
			return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'

		case 1000000:
			return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'

		case 1000:
			return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'

		default:
			return num
	}
}
