(function () {
	// Note that this stops devtools from updating. This can be remedied by reopening devtools or refreshing the page.
	// That's why we do it several times per second. Honestly you could probably do it every 700ms without issue.
	// If you wanted to be even more annoying, than throw in a console.error to make it seem like the devtools is having an issue.
	const TICKRATE = 100;

	setInterval(function () {
		// Send the shutdown method, if the hook exists
		if (typeof(__REACT_DEVTOOLS_GLOBAL_HOOK__) === 'object') {
			if (typeof(__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent) === 'object') {
				if (typeof(__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent.emit) === 'function') {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.reactDevtoolsAgent.emit('shutdown');
				}
			}
		}
	}, TICKRATE);
})()