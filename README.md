# Clamp Generator by TigriWeb

Our Clamp Generator is available [here](https://clamp-generator.tigriweb.dev/ "Clamp Generator").


## `_tweb-functions.scss`

This SCSS file contains utility functions for responsive and scalable layouts:

* **`rem($sizeValue: 16)`** : Converts a pixel value to rem units based on a 16px base. If the input is not a number, the original value is returned.
* **`vw($min, $max, $use-var: 0, $max-v: 1200)`** : Generates a viewport-width-based value. This function provides a responsive size between `$min` and `$max` based on the viewport, with optional support for CSS custom properties.
* **`vwft($min, $max, $min-v: 768, $max-v: 1200, $use-var: 0)`** : Similar to `vw()`, but optimized for fluid typography, smoothly scaling between the minimum and maximum sizes across specified viewport ranges.

These functions can be imported into your project to simplify responsive design.


## `twebUpdateScreenWidth.js`

This JavaScript file detects the browser’s zoom level and dynamically updates a CSS custom property (`--tweb--vw`) for the viewport width, ensuring better handling of responsive elements under different zoom settings.

It includes:

* **Debounce functionality** to prevent rapid execution of callbacks during resize events.
* **Zoom level detection** for various browsers, including Chrome, Firefox, Safari, Edge, and mobile devices.
* Automatically updates the viewport width on page load and window resize.

You can include this script in your project, and it will automatically handle viewport width updates for you.
