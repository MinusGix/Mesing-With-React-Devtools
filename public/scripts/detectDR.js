// Detect Devtools via using $r (File is named DR due to not wanting to use special characters in the filename)

(function () {
	const TICKRATE = 30; // ms
	function HAS_$r_BEEN_DECLARED () {
		/* Note: This works, since `$r` is not declared at all (thus it throws when you try to use it)
			I use this instead of something like:
				`return typeof()`
		*/
		try {
			$r;
			return true;
		} catch (_) {
			return false;
		}
	}

	setInterval(function () {
		if (HAS_$r_BEEN_DECLARED()) {
			console.log("REACT DEVTOOLS DETECTED AS USED!");
		}
	}, TICKRATE);

})();