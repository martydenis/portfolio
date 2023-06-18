if (document.getElementById('back')) {
  document.getElementById('back').addEventListener('touchend', function(e) {
    e.stopPropagation();
  });

  document.getElementById('back').addEventListener('click', function(e) {
    e.stopPropagation();
  });

  document.getElementById('back').addEventListener('mousedown', function(e) {
    e.stopPropagation();
  });
}

window.AdjustingInterval = function(func, interval, errorFunc) {
  /**
   * Add support for tab out tab in
   */
  const that = this;
  let expected, timeout;
  this.interval = interval;

  this.start = function() {
    expected = Date.now() + this.interval;
    timeout = setTimeout(step, this.interval);
  }

  this.stop = function() {
    clearTimeout(timeout);
  }

  function step() {
    var drift = Date.now() - expected;
    if (drift > that.interval) {
      // You could have some default stuff here too...
      if (errorFunc) errorFunc();
    }
    func();
    expected += that.interval;
    timeout = setTimeout(step, Math.max(0, that.interval-drift));
  }
}

window.getAngleBetweenPoints = function(p1, p2) {
  const dX = p2.x - p1.x;
  const dY = p2.y - p1.y;
  return Math.atan2(dY, dX);
}

window.toDegrees = function(rad) {
  return rad * 180 / Math.PI;
}

window.roundToTwo = function(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

window.getDistance = function(x1, y1, x2, y2) {
  const xDiff = x2 - x1;
  const yDiff = y2 - y1;
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

window.dpi = function(value) {
  return value * window.devicePixelRatio;
}

// window.easeInOutCubic = function(x) {
//   return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
// }

window.randomIntFromRange = function(min, max, round = true) {
  if (round) {
    return Math.floor(min + Math.random() * (max - min + 1));
  } else {
    return min + Math.random() * (max - min + 1);
  }
}

window.randomValueFromArray = function(array) {
  return array[Math.floor(Math.random() * array.length)];
}

window.hexToRGB = function(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

// Throttle function from Lodash
window.throttle = function(func, wait, options) {
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