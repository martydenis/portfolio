export function dpi(value) {
    return value * window.devicePixelRatio;
}

export function randomIntFromRange(min, max, round = true) {
    if (round) {
        return Math.floor(min + Math.random() * (max - min + 1));
    } else {
        return min + Math.random() * (max - min + 1);
    }
}

export function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Throttle function from Lodash
export function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

export function validateEmailAddress(email) {
    //compare l'email entré à l'expression régulière.
    var regExpPattern = /^[0-9a-zA-Z][-._a-zA-Z0-9]*@([0-9a-zA-Z][-._0-9a-zA-Z]*\.)+[a-zA-Z]{2,4}$/;
    return email.match(regExpPattern) != null;
}
