// Note: this will return false if you don't have react devtools, as it doesn't care about that
// it just looks for the canvas it uses.
function detectUpdateSetting () {
	let canvas = document.querySelector('canvas#TraceUpdatesWebNodePresenter');
	return canvas !== null;
}