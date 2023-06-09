import { useEffect, useState, createContext } from 'react';

export const isDebouncingContext = createContext();

export const useIsDebouncing = () => {
	const [isDebouncing, setIsDebouncing] = useState(false);

	return [isDebouncing, setIsDebouncing];
};

export const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [value, delay]);

	return debouncedValue;
};
