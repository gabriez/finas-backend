export const parseNumber = (
	value: string | number,
	paramName: string
): number => {
	const parsedValue = typeof value === "string" ? parseInt(value, 10) : value;
	if (isNaN(parsedValue) || parsedValue < 0) {
		throw new Error(`${paramName} debe ser un número positivo`);
	}
	return parsedValue;
};
