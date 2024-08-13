// 2. Implement a function 'throttle' that ensures a given function is not called more than once
// every specified number of milliseconds.

const Throttle = (func, wait)=> {
    let timeout = null;
    let lastCall = 0;

    return function(...args) {
        const now = Date.now();
        const remaining = wait - (now - lastCall);

        if (remaining <= 0) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            lastCall = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                lastCall = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

function logMessage(message) {
    console.log(message);
}
const throttledLog = Throttle(logMessage, 1000);
throttledLog('Pesan 1');
throttledLog('Pesan 2');
throttledLog('Pesan 3');