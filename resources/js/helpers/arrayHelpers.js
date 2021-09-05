let arrayHelpers = {
	checkArray: function(array,string) {
		return (array.indexOf(string) > -1)
	},
	filterArray: function(array,search,column) {
		let result = []
		array.forEach(e => {
			let c = e[column].toString().toLowerCase()
			let s = search.toLowerCase()
			if(c.includes(s)) {
				result.push(e)
			}
		})
		return result
	},
	sortArray: function(key,order) {
		return function innerSort(a, b) {
		
			const varA = (typeof a[key] === 'string')
				? a[key].toUpperCase() : a[key];
			const varB = (typeof b[key] === 'string')
				? b[key].toUpperCase() : b[key];
		
			let comparison = 0;
			if (varA > varB) {
				comparison = 1;
			} else if (varA < varB) {
				comparison = -1;
			}
			return (
				(order === 'desc') ? (comparison * -1) : comparison
			);
		};
	}
}
export default arrayHelpers 