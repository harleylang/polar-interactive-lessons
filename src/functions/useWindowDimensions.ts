import { useState, useEffect } from 'react';

// from: https://stackoverflow.com/a/60978633/14198287
// and: https://stackoverflow.com/a/36862446/14198287

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return { width, height };
};

export default function useWindowDimensions() {

	const [dimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return { dimensions }; 

};
