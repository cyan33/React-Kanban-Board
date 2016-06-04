// the throttle function executes 'func' in every 'wait' milliseconds
// it's good for performance
export const throttle = (func, wait) => {
	let context, args, prevArgs, argsChanged, result;
	let previous = 0;
	return function () {
		let now, remaining;
		if (wait) {
			now = Date.now();
			remaining = wait - (now - previous);
		}
		context = this;
		args = arguments;
		argsChanged = JSON.stringify(args) != JSON.stringify(prevArgs);
		prevArgs = {args};
		if (argsChanged || wait && (remaining <= 0 || remaining > wait)) {
			if (wait) {
				previous = now;
			}
			result = func.apply(context, args);
			context = args = null;
		}
		return result;
	};
}