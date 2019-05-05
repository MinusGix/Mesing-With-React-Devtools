// A file to load before everything else, for testing modifications made before React even loads.


function captureTrace () {
	let err;
	try {
		throw Error("Capturing Trace");
	} catch (caughtErr) {
		err = caughtErr;
	}
	return err;
}

// This code listens for addEventListener calls on window
// This seems to only catch the constant error handling listeners from ReactDOM (search for `handleWindowError` and look around there to see what I mean)
let _addEventListener = window.addEventListener.bind(window);
window.addEventListener = function (...args) {
	let err = captureTrace();

	if (args[1].name !== "handleWindowError") {
		console.log('addEventListener', err, ...args);
	}
	return _addEventListener(...args);
};
window.addEventListener.toString = function () {
	console.log('[INFO] window.addEventListener.toString() called!');
	return _addEventListener.toString();
};

/*let _Map = Map;
Map = function (...args) {
	let err = captureTrace();
	//console.log("Map constructor", err, ...args);
	return new _Map(...args);
};
Map.toString = _Map.toString.bind(_Map);*/
console.log(__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent);