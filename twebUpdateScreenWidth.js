/**
 * Global Debounce Timer
 *
 * This variable will store the timeout ID for debounce functionality,
 * ensuring that only the final call within a rapid sequence of events is executed.
 */
let twebDebounceTimer;


/**
 * Debounce function to limit the rate at which a set of callbacks is executed.
 *
 * @param {Array<Function>} callbacks - Array of callback functions to execute.
 * @param {number} time - Delay in milliseconds before executing the callbacks.
 * @param {Event} event - Event object (optional), passed to each callback function.
 *
 * The function waits for the specified `time` after the last event trigger
 * before invoking the callback(s). If another event occurs within this time,
 * the timer is reset, effectively "debouncing" the events.
 */
const twebDebounce = (callbacks, time, event) => {
	// Clears any existing timer to prevent multiple rapid executions.
	window.clearTimeout(twebDebounceTimer);

	// Sets a new timer. After the specified delay, all callbacks are executed.
	twebDebounceTimer = window.setTimeout(() => {
		callbacks.forEach(callback => {
			// Execute each callback, optionally passing the event object.
			callback(event);
		});
	}, time);
};


/**
 * Function to detect the browser's current zoom level.
 *
 * The method used to detect zoom level varies by browser,
 * so different techniques are applied for Chrome, Safari, Edge, Opera, Firefox,
 * and mobile devices.
 *
 * @returns {number} - The detected zoom level as a ratio (e.g., 1 for 100% zoom).
 */
const twebDetectZoom = () => {
	// Chrome / Edge detection (non-Opera). Calculates zoom based on window dimensions.
	if ((window.chrome && !window.opera && !navigator.userAgent.includes('Edg/')) || navigator.userAgent.includes('Edg/')) {
		return Math.round((window.outerWidth / window.innerWidth) * 100) / 100;
	}
	// Safari detection. Uses window dimensions to calculate zoom level.
	else if (/constructor/i.test(window.HTMLElement) || (window.safari && !window.chrome)) {
		return Math.round((window.outerWidth / window.innerWidth) * 100) / 100;
	}
	// Opera detection. Zoom calculated using the top-level window dimensions.
	else if (navigator.userAgent.includes('Opera') || navigator.userAgent.includes('OPR/')) {
		return window.top.outerWidth / window.top.innerWidth;
	}
	// Firefox detection. Uses device pixel ratio to detect zoom level.
	else if (navigator.userAgent.includes('Firefox')) {
		return window.devicePixelRatio || 1;
	}
	// Mobile detection. Determines zoom based on screen width and viewport width.
	else if (
		'ontouchstart' in window ||
		navigator.maxTouchPoints > 0 ||
		window.matchMedia("(pointer: coarse)").matches
	) {
		const isLandscape = window.matchMedia("(orientation: landscape)").matches;
		const deviceWidth = isLandscape ? screen.height : screen.width;

		// Returns the ratio of the device width to the viewport width.
		return deviceWidth / window.innerWidth;
	}
	// Default case when none of the above conditions match.
	else {
		return 1;
	}
};


/**
 * Function to update the CSS variable for the viewport width (`--tweb--vw`).
 *
 * This function adjusts the CSS variable based on the detected zoom level, ensuring
 * that responsive elements can account for changes in the browser's zoom level.
 */
const twebUpdateScreenWidth = () => {
	// Detect the current zoom level of the browser.
	const zoom = twebDetectZoom();

	// Update the CSS custom property `--tweb--vw` to adjust for zoom scaling.
	document.documentElement.style.setProperty('--tweb--vw', `${parseFloat(zoom.toFixed(1)) * 100}vw`);
}


// Event listener to update the viewport width variable when the DOM content is fully loaded.
window.addEventListener('DOMContentLoaded', () => {
	twebUpdateScreenWidth();
});


// Event listener to debounce and update the viewport width variable on window resize.
window.addEventListener('resize', () => {
	// Calls twebUpdateScreenWidth with zero delay, debounced to avoid rapid execution on resize.
	twebDebounce([twebUpdateScreenWidth], 0);
}, false);