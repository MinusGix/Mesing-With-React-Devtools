# React DevTools Messing
This is a repo of messing around with the React Dev tools. To simplify things, this uses no jsx (so `React.createElement` and thel ike).

Current findings:  
- `__REACT_DEVTOOLS_GLOBAL_HOOK__` is, well, globally available. This makes it easy to tell if someone has the extension. React (ReactDOM, specifically.) seeks this out and registers itself with it.  
	- For the 'injection' see ReactDOM `injectInternals` function.  
	- This would allow using this to fingerprint users, I'd imagine.  
	- Detecting React Devtools would also be a good excuse for a site to enact devtool detection functions. Lets say you have one which is annoying to regular users (has false positives), well you can enable it for this user since they are far more likely to possibly open devtools.  
- `$r` is a global variable which is set to the currently selected element.
	- When the program starts it is not set. If the devtools (normal devtools) are open, then it will not be set.
	- If you open the React devtab, then it will be set to the topmost element.
	- If you open the React devtab, then switch back to (for example) the Console devtab, it will still be set.
	- If you open the React devtab, then switch back to (for example) the Console devtab, then refresh the page, then the React devtab will still initialize itself, and thus it will be set to the topmost element.
		- This means you could detect if it's set to see if they've used the React devtab on this page, even across reloads as long as they keep the devtools open. This does not happen if you close the devtools and refresh.
	- If you select a React Element (such as `<Clock />`) then it will hold the ReactElement in `$r`.
	- If you select an HTML Element, (such as `<h1>`) then it will hold the HTMLElement in `$r`.
	- This is obviously meant to mirror Chromiums (I have no clue if it's on Firefox as well) Elements panel, when you select an element it will set a variable called `$0` so you can more easily manipulate it. Chromium does this better, as it's not *actually* a variable, and so the page cannot access it.
- `__REACT_DEVTOOLS_GLOBAL_HOOK__.$0` Exposes the hidden variable `$0`, but not entirely.
	Normally Chromium has `$0` which is the last-selected item in the elements tab, this makes things easier when writing scripts in the console and the like.
	But, normally, the page can't access this (which means they can't tell what you've selected in the panel), but React exposes this.
	If you go to the Elements devtab, click on an element, then go to the React tab it will set `__REACT_DEVTOOLS_GLOBAL_HOOK__.$0` to the value of `$0` which it can access. While this doesn't allow a page to actively know what you're selecting (requires you to switch tabs), it still allows them to know you're using the elements tab and looking at things.

Files:
- `public/index.js` the simple Clock React testing app. Does not use JSX for simplicity.
- `public/React.js` React.js development version v16.8.6
- `public/ReactDOM.js` ReactDOM.js development version v16.8.6
- `public/scripts/`
	- `detectDR.js` Detects `$r` (see it's section in 'Current Findings'), and tries to detect the usage of React Devtools that way. Does a simple check for if the variable has been declared several times/second.
	- `detectRD` Detects if `__REACT_DEVTOOLS_GLOBAL_HOOK__` is declared. Does this whenever you call the function.

Of minor note: These are things which are just of note, but don't really let you do anything
	- 

TODO:
- Possibly look at https://github.com/facebook/react-devtools/tree/master/packages/react-devtools (a React Devtools which you include in your page). Possibly don't look at this too much, as ReactDevtools is more used (I'm assuming) and if you're putting it in a page then there's no real real reason to try to mess with it as you likely own the page.
- Possibly look at React Native, the way their connecting to it is interesting.