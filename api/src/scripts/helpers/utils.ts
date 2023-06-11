export function isNumeric(numberLike: any): numberLike is number | string{
	return !(isNaN(numberLike)) && (typeof numberLike !== 'object') &&
      (numberLike != Number.POSITIVE_INFINITY) && (numberLike!= Number.NEGATIVE_INFINITY);
}