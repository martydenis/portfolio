"use strict";
(self["webpackChunkmartindenis_v3"] = self["webpackChunkmartindenis_v3"] || []).push([["common"],{

/***/ "./node_modules/gsap/CSSPlugin.js":
/*!****************************************!*\
  !*** ./node_modules/gsap/CSSPlugin.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSSPlugin: () => (/* binding */ CSSPlugin),
/* harmony export */   _createElement: () => (/* binding */ _createElement),
/* harmony export */   _getBBox: () => (/* binding */ _getBBox),
/* harmony export */   checkPrefix: () => (/* binding */ _checkPropPrefix),
/* harmony export */   "default": () => (/* binding */ CSSPlugin)
/* harmony export */ });
/* harmony import */ var _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gsap-core.js */ "./node_modules/gsap/gsap-core.js");
/*!
 * CSSPlugin 3.11.5
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var _win,
    _doc,
    _docElement,
    _pluginInitted,
    _tempDiv,
    _tempDivStyler,
    _recentSetterPlugin,
    _reverting,
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _transformProps = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _atan2 = Math.atan2,
    _bigNum = 1e8,
    _capsExp = /([A-Z])/g,
    _horizontalExp = /(left|right|width|margin|padding|x)/i,
    _complexExp = /[\s,\(]\S/,
    _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
},
    _renderCSSProp = function _renderCSSProp(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
},
    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
},
    //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
_renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
},
    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
},
    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
},
    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
  return target.style[property] = value;
},
    _setterCSSProp = function _setterCSSProp(target, property, value) {
  return target.style.setProperty(property, value);
},
    _setterTransform = function _setterTransform(target, property, value) {
  return target._gsap[property] = value;
},
    _setterScale = function _setterScale(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
},
    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
},
    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
},
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _saveStyle = function _saveStyle(property, isNotCSS) {
  var _this = this;

  var target = this.target,
      style = target.style;

  if (property in _transformProps) {
    this.tfm = this.tfm || {};

    if (property !== "transform") {
      property = _propertyAliases[property] || property;
      ~property.indexOf(",") ? property.split(",").forEach(function (a) {
        return _this.tfm[a] = _get(target, a);
      }) : this.tfm[property] = target._gsap.x ? target._gsap[property] : _get(target, property); // note: scale would map to "scaleX,scaleY", thus we loop and apply them both.
    } else {
      return _propertyAliases.transform.split(",").forEach(function (p) {
        return _saveStyle.call(_this, p, isNotCSS);
      });
    }

    if (this.props.indexOf(_transformProp) >= 0) {
      return;
    }

    if (target._gsap.svg) {
      this.svgo = target.getAttribute("data-svg-origin");
      this.props.push(_transformOriginProp, isNotCSS, "");
    }

    property = _transformProp;
  }

  (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
},
    _removeIndependentTransforms = function _removeIndependentTransforms(style) {
  if (style.translate) {
    style.removeProperty("translate");
    style.removeProperty("scale");
    style.removeProperty("rotate");
  }
},
    _revertStyle = function _revertStyle() {
  var props = this.props,
      target = this.target,
      style = target.style,
      cache = target._gsap,
      i,
      p;

  for (i = 0; i < props.length; i += 3) {
    // stored like this: property, isNotCSS, value
    props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase());
  }

  if (this.tfm) {
    for (p in this.tfm) {
      cache[p] = this.tfm[p];
    }

    if (cache.svg) {
      cache.renderTransform();
      target.setAttribute("data-svg-origin", this.svgo || "");
    }

    i = _reverting();

    if ((!i || !i.isStart) && !style[_transformProp]) {
      _removeIndependentTransforms(style);

      cache.uncache = 1; // if it's a startAt that's being reverted in the _initTween() of the core, we don't need to uncache transforms. This is purely a performance optimization.
    }
  }
},
    _getStyleSaver = function _getStyleSaver(target, properties) {
  var saver = {
    target: target,
    props: [],
    revert: _revertStyle,
    save: _saveStyle
  };
  target._gsap || _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.core.getCache(target); // just make sure there's a _gsap cache defined because we read from it in _saveStyle() and it's more efficient to just check it here once.

  properties && properties.split(",").forEach(function (p) {
    return saver.save(p);
  });
  return saver;
},
    _supports3D,
    _createElement = function _createElement(type, ns) {
  var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

  return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
},
    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
},
    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
  var e = element || _tempDiv,
      s = e.style,
      i = 5;

  if (property in s && !preferPrefix) {
    return property;
  }

  property = property.charAt(0).toUpperCase() + property.substr(1);

  while (i-- && !(_prefixes[i] + property in s)) {}

  return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
},
    _initCore = function _initCore() {
  if (_windowExists() && window.document) {
    _win = window;
    _doc = _win.document;
    _docElement = _doc.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _tempDivStyler = _createElement("div");
    _transformProp = _checkPropPrefix(_transformProp);
    _transformOriginProp = _transformProp + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

    _supports3D = !!_checkPropPrefix("perspective");
    _reverting = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.core.reverting;
    _pluginInitted = 1;
  }
},
    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
  //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
  var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
      oldParent = this.parentNode,
      oldSibling = this.nextSibling,
      oldCSS = this.style.cssText,
      bbox;

  _docElement.appendChild(svg);

  svg.appendChild(this);
  this.style.display = "block";

  if (swapIfPossible) {
    try {
      bbox = this.getBBox();
      this._gsapBBox = this.getBBox; //store the original

      this.getBBox = _getBBoxHack;
    } catch (e) {}
  } else if (this._gsapBBox) {
    bbox = this._gsapBBox();
  }

  if (oldParent) {
    if (oldSibling) {
      oldParent.insertBefore(this, oldSibling);
    } else {
      oldParent.appendChild(this);
    }
  }

  _docElement.removeChild(svg);

  this.style.cssText = oldCSS;
  return bbox;
},
    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
  var i = attributesArray.length;

  while (i--) {
    if (target.hasAttribute(attributesArray[i])) {
      return target.getAttribute(attributesArray[i]);
    }
  }
},
    _getBBox = function _getBBox(target) {
  var bounds;

  try {
    bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
  } catch (error) {
    bounds = _getBBoxHack.call(target, true);
  }

  bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
},
    _isSVG = function _isSVG(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
},
    //reports if the element is an SVG on which getBBox() actually works
_removeProperty = function _removeProperty(target, property) {
  if (property) {
    var style = target.style;

    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp;
    }

    if (style.removeProperty) {
      if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
        //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
        property = "-" + property;
      }

      style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
    } else {
      //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
      style.removeAttribute(property);
    }
  }
},
    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;

  plugin._props.push(property);

  return pt;
},
    _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
},
    _nonStandardLayouts = {
  grid: 1,
  flex: 1
},
    //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
_convertToUnit = function _convertToUnit(target, property, value, unit) {
  var curValue = parseFloat(value) || 0,
      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
  style = _tempDiv.style,
      horizontal = _horizontalExp.test(property),
      isRootSVG = target.tagName.toLowerCase() === "svg",
      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
      amount = 100,
      toPixels = unit === "px",
      toPercent = unit === "%",
      px,
      parent,
      cache,
      isSVG;

  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }

  curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);

  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
    return (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(toPercent ? curValue / px * amount : curValue / 100 * px);
  }

  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;

  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }

  if (!parent || parent === _doc || !parent.appendChild) {
    parent = _doc.body;
  }

  cache = parent._gsap;

  if (cache && toPercent && cache.width && horizontal && cache.time === _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._ticker.time && !cache.uncache) {
    return (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(curValue / cache.width * amount);
  } else {
    (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
    parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

    parent.appendChild(_tempDiv);
    px = _tempDiv[measureProperty];
    parent.removeChild(_tempDiv);
    style.position = "absolute";

    if (horizontal && toPercent) {
      cache = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._getCache)(parent);
      cache.time = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._ticker.time;
      cache.width = parent[measureProperty];
    }
  }

  return (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
},
    _get = function _get(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore();

  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];

    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }

  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];

    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._getProperty)(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
    }
  }

  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
},
    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
  // note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  if (!start || start === "none") {
    // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://greensock.com/forums/topic/18310-clippath-doesnt-work-on-ios/
    var p = _checkPropPrefix(prop, target, 1),
        s = p && _getComputedProperty(target, p, 1);

    if (s && s !== start) {
      prop = p;
      start = s;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://greensock.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
    }
  }

  var pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(this._pt, target.style, prop, 0, 1, _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._renderComplexString),
      index = 0,
      matchIndex = 0,
      a,
      result,
      startValues,
      startNum,
      color,
      startValue,
      endValue,
      endNum,
      chunk,
      endUnit,
      startUnit,
      endValues;
  pt.b = start;
  pt.e = end;
  start += ""; // ensure values are strings

  end += "";

  if (end === "auto") {
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    target.style[prop] = start;
  }

  a = [start, end];

  (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._colorStringFilter)(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().


  start = a[0];
  end = a[1];
  startValues = start.match(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numWithUnitExp) || [];
  endValues = end.match(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numWithUnitExp) || [];

  if (endValues.length) {
    while (result = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);

      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }

      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        endValue.charAt(1) === "=" && (endValue = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._parseRelative)(startNum, endValue) + startUnit);
        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numWithUnitExp.lastIndex - endUnit.length;

        if (!endUnit) {
          //if something like "perspective:300" is passed in and we must add a unit to the end
          endUnit = endUnit || _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[prop] || startUnit;

          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }

        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        } // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.


        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum - startNum,
          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
        };
      }
    }

    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }

  _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
},
    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
  var split = value.split(" "),
      x = split[0],
      y = split[1] || "50%";

  if (x === "top" || x === "bottom" || y === "left" || y === "right") {
    //the user provided them in the wrong order, so flip them
    value = x;
    x = y;
    y = value;
  }

  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y] || y;
  return split.join(" ");
},
    _renderClearProps = function _renderClearProps(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t,
        style = target.style,
        props = data.u,
        cache = target._gsap,
        prop,
        clearTransforms,
        i;

    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i = props.length;

      while (--i > -1) {
        prop = props[i];

        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
        }

        _removeProperty(target, prop);
      }
    }

    if (clearTransforms) {
      _removeProperty(target, _transformProp);

      if (cache) {
        cache.svg && target.removeAttribute("transform");

        _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.


        cache.uncache = 1;

        _removeIndependentTransforms(style);
      }
    }
  }
},
    // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
_specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;

      plugin._props.push(property);

      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://greensock.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */

},

/*
 * --------------------------------------------------------------------------------------
 * TRANSFORMS
 * --------------------------------------------------------------------------------------
 */
_identity2DMatrix = [1, 0, 0, 1, 0, 0],
    _rotationalProperties = {},
    _isNullTransform = function _isNullTransform(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
},
    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
  var matrixString = _getComputedProperty(target, _transformProp);

  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._numExp).map(_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round);
},
    _getMatrix = function _getMatrix(target, force2D) {
  var cache = target._gsap || (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._getCache)(target),
      style = target.style,
      matrix = _getComputedTransformMatrixAsArray(target),
      parent,
      nextSibling,
      temp,
      addedToDOM;

  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;

    if (!parent || !target.offsetParent) {
      // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375
      addedToDOM = 1; //flag

      nextSibling = target.nextElementSibling;

      _docElement.appendChild(target); //we must add it to the DOM in order to get values properly

    }

    matrix = _getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");

    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }

  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
},
    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap,
      matrix = matrixArray || _getMatrix(target, true),
      xOriginOld = cache.xOrigin || 0,
      yOriginOld = cache.yOrigin || 0,
      xOffsetOld = cache.xOffset || 0,
      yOffsetOld = cache.yOffset || 0,
      a = matrix[0],
      b = matrix[1],
      c = matrix[2],
      d = matrix[3],
      tx = matrix[4],
      ty = matrix[5],
      originSplit = origin.split(" "),
      xOrigin = parseFloat(originSplit[0]) || 0,
      yOrigin = parseFloat(originSplit[1]) || 0,
      bounds,
      determinant,
      x,
      y;

  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
    //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
    x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
    y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
    xOrigin = x;
    yOrigin = y;
  }

  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
    cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }

  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);

    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }

  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
},
    _parseTransform = function _parseTransform(target, uncache) {
  var cache = target._gsap || new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.GSCache(target);

  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }

  var style = target.style,
      invertedScaleX = cache.scaleX < 0,
      px = "px",
      deg = "deg",
      cs = getComputedStyle(target),
      origin = _getComputedProperty(target, _transformOriginProp) || "0",
      x,
      y,
      z,
      scaleX,
      scaleY,
      rotation,
      rotationX,
      rotationY,
      skewX,
      skewY,
      perspective,
      xOrigin,
      yOrigin,
      matrix,
      angle,
      cos,
      sin,
      a,
      b,
      c,
      d,
      a12,
      a22,
      t1,
      t2,
      t3,
      a13,
      a23,
      a33,
      a42,
      a43,
      a32;
  x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));

  if (cs.translate) {
    // accommodate independent transforms by combining them into normal ones.
    if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
      style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
    }

    style.scale = style.rotate = style.translate = "none";
  }

  matrix = _getMatrix(target, cache.svg);

  if (cache.svg) {
    if (cache.uncache) {
      // if cache.uncache is true (and maybe if origin is 0,0), we need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Previously we let the data-svg-origin stay instead, but when introducing revert(), it complicated things.
      t2 = target.getBBox();
      origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
      t1 = "";
    } else {
      t1 = !uncache && target.getAttribute("data-svg-origin"); //  Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.
    }

    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }

  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;

  if (matrix !== _identity2DMatrix) {
    a = matrix[0]; //a11

    b = matrix[1]; //a21

    c = matrix[2]; //a31

    d = matrix[3]; //a41

    x = a12 = matrix[4];
    y = a22 = matrix[5]; //2D matrix

    if (matrix.length === 6) {
      scaleX = Math.sqrt(a * a + b * b);
      scaleY = Math.sqrt(d * d + c * c);
      rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

      skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));

      if (cache.svg) {
        x -= xOrigin - (xOrigin * a + yOrigin * c);
        y -= yOrigin - (xOrigin * b + yOrigin * d);
      } //3D matrix

    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG; //rotationX

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t2 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t2;
        a32 = t3;
      } //rotationY


      angle = _atan2(-c, a33);
      rotationY = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a * cos - a13 * sin;
        t2 = b * cos - a23 * sin;
        t3 = c * cos - a33 * sin;
        a43 = d * sin + a43 * cos;
        a = t1;
        b = t2;
        c = t3;
      } //rotationZ


      angle = _atan2(b, a);
      rotation = angle * _RAD2DEG;

      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a * cos + b * sin;
        t2 = a12 * cos + a22 * sin;
        b = b * cos - a * sin;
        a22 = a22 * cos - a12 * sin;
        a = t1;
        a12 = t2;
      }

      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }

      scaleX = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(Math.sqrt(a * a + b * b + c * c));
      scaleY = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }

    if (cache.svg) {
      //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
      t1 && target.setAttribute("transform", t1);
    }
  }

  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }

  uncache = uncache || cache.uncache;
  cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
  cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
  cache.z = z + px;
  cache.scaleX = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(scaleX);
  cache.scaleY = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(scaleY);
  cache.rotation = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(rotation) + deg;
  cache.rotationX = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(rotationX) + deg;
  cache.rotationY = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;

  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }

  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
},
    _firstTwoOnly = function _firstTwoOnly(value) {
  return (value = value.split(" "))[0] + " " + value[1];
},
    //for handling transformOrigin values, stripping out the 3rd dimension
_addPxTranslate = function _addPxTranslate(target, start, value) {
  var unit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(start);
  return (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
},
    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;

  _renderCSSTransforms(ratio, cache);
},
    _zeroDeg = "0deg",
    _zeroPx = "0px",
    _endParenthesis = ") ",
    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
  var _ref = cache || this,
      xPercent = _ref.xPercent,
      yPercent = _ref.yPercent,
      x = _ref.x,
      y = _ref.y,
      z = _ref.z,
      rotation = _ref.rotation,
      rotationY = _ref.rotationY,
      rotationX = _ref.rotationX,
      skewX = _ref.skewX,
      skewY = _ref.skewY,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      transformPerspective = _ref.transformPerspective,
      force3D = _ref.force3D,
      target = _ref.target,
      zOrigin = _ref.zOrigin,
      transforms = "",
      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)


  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD,
        a13 = Math.sin(angle),
        a33 = Math.cos(angle),
        cos;

    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }

  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }

  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }

  if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
  }

  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }

  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }

  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }

  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }

  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }

  target.style[_transformProp] = transforms || "translate(0, 0)";
},
    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
  var _ref2 = cache || this,
      xPercent = _ref2.xPercent,
      yPercent = _ref2.yPercent,
      x = _ref2.x,
      y = _ref2.y,
      rotation = _ref2.rotation,
      skewX = _ref2.skewX,
      skewY = _ref2.skewY,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      target = _ref2.target,
      xOrigin = _ref2.xOrigin,
      yOrigin = _ref2.yOrigin,
      xOffset = _ref2.xOffset,
      yOffset = _ref2.yOffset,
      forceCSS = _ref2.forceCSS,
      tx = parseFloat(x),
      ty = parseFloat(y),
      a11,
      a21,
      a12,
      a22,
      temp;

  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);

  if (skewY) {
    //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }

  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;

    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;

      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }

    a11 = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(a11);
    a21 = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(a21);
    a12 = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(a12);
    a22 = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }

  if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y, "px");
  }

  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }

  if (xPercent || yPercent) {
    //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
    temp = target.getBBox();
    tx = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(tx + xPercent / 100 * temp.width);
    ty = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._round)(ty + yPercent / 100 * temp.height);
  }

  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);
  forceCSS && (target.style[_transformProp] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the transform attribute changes!)
},
    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
  var cap = 360,
      isString = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._isString)(endValue),
      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
      change = endNum - startNum,
      finalValue = startNum + change + "deg",
      direction,
      pt;

  if (isString) {
    direction = endValue.split("_")[1];

    if (direction === "short") {
      change %= cap;

      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }

    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
    }
  }

  plugin._pt = pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";

  plugin._props.push(property);

  return pt;
},
    _assign = function _assign(target, source) {
  // Internet Explorer doesn't have Object.assign(), so we recreate it here.
  for (var p in source) {
    target[p] = source[p];
  }

  return target;
},
    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
  //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
  var startCache = _assign({}, target._gsap),
      exclude = "perspective,force3D,transformOrigin,svgOrigin",
      style = target.style,
      endCache,
      p,
      startValue,
      endValue,
      startNum,
      endNum,
      startUnit,
      endUnit;

  if (startCache.svg) {
    startValue = target.getAttribute("transform");
    target.setAttribute("transform", "");
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);

    _removeProperty(target, _transformProp);

    target.setAttribute("transform", startValue);
  } else {
    startValue = getComputedStyle(target)[_transformProp];
    style[_transformProp] = transforms;
    endCache = _parseTransform(target, 1);
    style[_transformProp] = startValue;
  }

  for (p in _transformProps) {
    startValue = startCache[p];
    endValue = endCache[p];

    if (startValue !== endValue && exclude.indexOf(p) < 0) {
      //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
      startUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(startValue);
      endUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;

      plugin._props.push(p);
    }
  }

  _assign(endCache, startCache);
}; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.


(0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)("padding,margin,Width,Radius", function (name, index) {
  var t = "Top",
      r = "Right",
      b = "Bottom",
      l = "Left",
      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
    return index < 2 ? name + side : "border" + side + name;
  });

  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
    var a, vars;

    if (arguments.length < 4) {
      // getter, passed target, property, and unit (from _get())
      a = props.map(function (prop) {
        return _get(plugin, prop, property);
      });
      vars = a.join(" ");
      return vars.split(a[0]).length === 5 ? a[0] : vars;
    }

    a = (endValue + "").split(" ");
    vars = {};
    props.forEach(function (prop, i) {
      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});

var CSSPlugin = {
  name: "css",
  register: _initCore,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init(target, vars, tween, index, targets) {
    var props = this._props,
        style = target.style,
        startAt = tween.vars.startAt,
        startValue,
        endValue,
        endNum,
        startNum,
        type,
        specialProp,
        p,
        startUnit,
        endUnit,
        relative,
        isTransformRelated,
        transformPropTween,
        cache,
        smooth,
        hasPriority,
        inlineProps;
    _pluginInitted || _initCore(); // we may call init() multiple times on the same plugin instance, like when adding special properties, so make sure we don't overwrite the revert data or inlineProps

    this.styles = this.styles || _getStyleSaver(target);
    inlineProps = this.styles.props;
    this.tween = tween;

    for (p in vars) {
      if (p === "autoRound") {
        continue;
      }

      endValue = vars[p];

      if (_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._plugins[p] && (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._checkPlugin)(p, vars, tween, index, target, targets)) {
        // plugins
        continue;
      }

      type = typeof endValue;
      specialProp = _specialProps[p];

      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }

      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._replaceRandom)(endValue);
      }

      if (specialProp) {
        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
      } else if (p.substr(0, 2) === "--") {
        //CSS variable
        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
        endValue += "";
        _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._colorExp.lastIndex = 0;

        if (!_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._colorExp.test(startValue)) {
          // colors don't have units
          startUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(startValue);
          endUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(endValue);
        }

        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
        props.push(p);
        inlineProps.push(p, 0, style[p]);
      } else if (type !== "undefined") {
        if (startAt && p in startAt) {
          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
          (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._isString)(startValue) && ~startValue.indexOf("random(") && (startValue = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._replaceRandom)(startValue));
          (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(startValue + "") || (startValue += _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[p] || (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
        } else {
          startValue = _get(target, p);
        }

        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);

        if (p in _propertyAliases) {
          if (p === "autoAlpha") {
            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
              startNum = 0;
            }

            inlineProps.push("visibility", 0, style.visibility);

            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }

          if (p !== "scale" && p !== "transform") {
            p = _propertyAliases[p];
            ~p.indexOf(",") && (p = p.split(",")[0]);
          }
        }

        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

        if (isTransformRelated) {
          this.styles.save(p);

          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
          }

          if (p === "scale") {
            this._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._parseRelative)(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
            this._pt.u = 0;
            props.push("scaleY", p);
            p += "X";
          } else if (p === "transformOrigin") {
            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);

              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }

            continue;
          } else if (p === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);

            continue;
          } else if (p in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p, startNum, relative ? (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._parseRelative)(startNum, relative + endValue) : endValue);

            continue;
          } else if (p === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);

            continue;
          } else if (p === "force3D") {
            cache[p] = endValue;
            continue;
          } else if (p === "transform") {
            _addRawTransformPTs(this, endValue, target);

            continue;
          }
        } else if (!(p in style)) {
          p = _checkPropPrefix(p) || p;
        }

        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0); // protect against NaN

          endUnit = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.getUnit)(endValue) || (p in _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units ? _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[p] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
          this._pt = new _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._parseRelative)(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;

          if (startUnit !== endUnit && endUnit !== "%") {
            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p in style)) {
          if (p in target) {
            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
            this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
          } else if (p !== "parseTransform") {
            (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._missingPlugin)(p, endValue);

            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
        }

        isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
        props.push(p);
      }
    }

    hasPriority && (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._sortPropTweensByPriority)(this);
  },
  render: function render(ratio, data) {
    if (data.tween._time || !_reverting()) {
      var pt = data._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
    } else {
      data.styles.revert();
    }
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
    var p = _propertyAliases[property];
    p && p.indexOf(",") < 0 && (property = p);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !(0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._isUndefined)(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._getSetter)(target, property);
  },
  core: {
    _removeProperty: _removeProperty,
    _getMatrix: _getMatrix
  }
};
_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.utils.checkPrefix = _checkPropPrefix;
_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.core.getStyleSaver = _getStyleSaver;

(function (positionAndScale, rotation, others, aliases) {
  var all = (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)(positionAndScale + "," + rotation + "," + others, function (name) {
    _transformProps[name] = 1;
  });

  (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)(rotation, function (name) {
    _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });

  _propertyAliases[all[13]] = positionAndScale + "," + rotation;

  (0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)(aliases, function (name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");

(0,_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._forEachName)("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
  _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__._config.units[name] = "px";
});

_gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.registerPlugin(CSSPlugin);


/***/ }),

/***/ "./node_modules/gsap/Observer.js":
/*!***************************************!*\
  !*** ./node_modules/gsap/Observer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Observer: () => (/* binding */ Observer),
/* harmony export */   _getProxyProp: () => (/* binding */ _getProxyProp),
/* harmony export */   _getScrollFunc: () => (/* binding */ _getScrollFunc),
/* harmony export */   _getTarget: () => (/* binding */ _getTarget),
/* harmony export */   _getVelocityProp: () => (/* binding */ _getVelocityProp),
/* harmony export */   _horizontal: () => (/* binding */ _horizontal),
/* harmony export */   _isViewport: () => (/* binding */ _isViewport),
/* harmony export */   _proxies: () => (/* binding */ _proxies),
/* harmony export */   _scrollers: () => (/* binding */ _scrollers),
/* harmony export */   _vertical: () => (/* binding */ _vertical),
/* harmony export */   "default": () => (/* binding */ Observer)
/* harmony export */ });
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*!
 * Observer 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var gsap,
    _coreInitted,
    _clamp,
    _win,
    _doc,
    _docEl,
    _body,
    _isTouch,
    _pointerType,
    ScrollTrigger,
    _root,
    _normalizer,
    _eventTypes,
    _context,
    _getGSAP = function _getGSAP() {
  return gsap || typeof window !== "undefined" && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _passThrough = function _passThrough(p) {
  return p;
},
    _startup = 1,
    _observers = [],
    _scrollers = [],
    _proxies = [],
    _getTime = Date.now,
    _bridge = function _bridge(name, value) {
  return value;
},
    _integrate = function _integrate() {
  var core = ScrollTrigger.core,
      data = core.bridge || {},
      scrollers = core._scrollers,
      proxies = core._proxies;
  scrollers.push.apply(scrollers, _scrollers);
  proxies.push.apply(proxies, _proxies);
  _scrollers = scrollers;
  _proxies = proxies;

  _bridge = function _bridge(name, value) {
    return data[name](value);
  };
},
    _getProxyProp = function _getProxyProp(element, property) {
  return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
},
    _isViewport = function _isViewport(el) {
  return !!~_root.indexOf(el);
},
    _addListener = function _addListener(element, type, func, nonPassive, capture) {
  return element.addEventListener(type, func, {
    passive: !nonPassive,
    capture: !!capture
  });
},
    _removeListener = function _removeListener(element, type, func, capture) {
  return element.removeEventListener(type, func, !!capture);
},
    _scrollLeft = "scrollLeft",
    _scrollTop = "scrollTop",
    _onScroll = function _onScroll() {
  return _normalizer && _normalizer.isPressed || _scrollers.cache++;
},
    _scrollCacheFunc = function _scrollCacheFunc(f, doNotCache) {
  var cachingFunc = function cachingFunc(value) {
    // since reading the scrollTop/scrollLeft/pageOffsetY/pageOffsetX can trigger a layout, this function allows us to cache the value so it only gets read fresh after a "scroll" event fires (or while we're refreshing because that can lengthen the page and alter the scroll position). when "soft" is true, that means don't actually set the scroll, but cache the new value instead (useful in ScrollSmoother)
    if (value || value === 0) {
      _startup && (_win.history.scrollRestoration = "manual"); // otherwise the new position will get overwritten by the browser onload.

      var isNormalizing = _normalizer && _normalizer.isPressed;
      value = cachingFunc.v = Math.round(value) || (_normalizer && _normalizer.iOS ? 1 : 0); //TODO: iOS Bug: if you allow it to go to 0, Safari can start to report super strange (wildly inaccurate) touch positions!

      f(value);
      cachingFunc.cacheID = _scrollers.cache;
      isNormalizing && _bridge("ss", value); // set scroll (notify ScrollTrigger so it can dispatch a "scrollStart" event if necessary
    } else if (doNotCache || _scrollers.cache !== cachingFunc.cacheID || _bridge("ref")) {
      cachingFunc.cacheID = _scrollers.cache;
      cachingFunc.v = f();
    }

    return cachingFunc.v + cachingFunc.offset;
  };

  cachingFunc.offset = 0;
  return f && cachingFunc;
},
    _horizontal = {
  s: _scrollLeft,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: _scrollCacheFunc(function (value) {
    return arguments.length ? _win.scrollTo(value, _vertical.sc()) : _win.pageXOffset || _doc[_scrollLeft] || _docEl[_scrollLeft] || _body[_scrollLeft] || 0;
  })
},
    _vertical = {
  s: _scrollTop,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: _horizontal,
  sc: _scrollCacheFunc(function (value) {
    return arguments.length ? _win.scrollTo(_horizontal.sc(), value) : _win.pageYOffset || _doc[_scrollTop] || _docEl[_scrollTop] || _body[_scrollTop] || 0;
  })
},
    _getTarget = function _getTarget(t) {
  return gsap.utils.toArray(t)[0] || (typeof t === "string" && gsap.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
},
    _getScrollFunc = function _getScrollFunc(element, _ref) {
  var s = _ref.s,
      sc = _ref.sc;
  // we store the scroller functions in an alternating sequenced Array like [element, verticalScrollFunc, horizontalScrollFunc, ...] so that we can minimize memory, maximize performance, and we also record the last position as a ".rec" property in order to revert to that after refreshing to ensure things don't shift around.
  _isViewport(element) && (element = _doc.scrollingElement || _docEl);

  var i = _scrollers.indexOf(element),
      offset = sc === _vertical.sc ? 1 : 2;

  !~i && (i = _scrollers.push(element) - 1);
  _scrollers[i + offset] || element.addEventListener("scroll", _onScroll); // clear the cache when a scroll occurs

  var prev = _scrollers[i + offset],
      func = prev || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport(element) ? sc : _scrollCacheFunc(function (value) {
    return arguments.length ? element[s] = value : element[s];
  })));
  func.target = element;
  prev || (func.smooth = gsap.getProperty(element, "scrollBehavior") === "smooth"); // only set it the first time (don't reset every time a scrollFunc is requested because perhaps it happens during a refresh() when it's disabled in ScrollTrigger.

  return func;
},
    _getVelocityProp = function _getVelocityProp(value, minTimeRefresh, useDelta) {
  var v1 = value,
      v2 = value,
      t1 = _getTime(),
      t2 = t1,
      min = minTimeRefresh || 50,
      dropToZeroTime = Math.max(500, min * 3),
      update = function update(value, force) {
    var t = _getTime();

    if (force || t - t1 > min) {
      v2 = v1;
      v1 = value;
      t2 = t1;
      t1 = t;
    } else if (useDelta) {
      v1 += value;
    } else {
      // not totally necessary, but makes it a bit more accurate by adjusting the v1 value according to the new slope. This way we're not just ignoring the incoming data. Removing for now because it doesn't seem to make much practical difference and it's probably not worth the kb.
      v1 = v2 + (value - v2) / (t - t2) * (t1 - t2);
    }
  },
      reset = function reset() {
    v2 = v1 = useDelta ? 0 : v1;
    t2 = t1 = 0;
  },
      getVelocity = function getVelocity(latestValue) {
    var tOld = t2,
        vOld = v2,
        t = _getTime();

    (latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
    return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1000;
  };

  return {
    update: update,
    reset: reset,
    getVelocity: getVelocity
  };
},
    _getEvent = function _getEvent(e, preventDefault) {
  preventDefault && !e._gsapAllow && e.preventDefault();
  return e.changedTouches ? e.changedTouches[0] : e;
},
    _getAbsoluteMax = function _getAbsoluteMax(a) {
  var max = Math.max.apply(Math, a),
      min = Math.min.apply(Math, a);
  return Math.abs(max) >= Math.abs(min) ? max : min;
},
    _setScrollTrigger = function _setScrollTrigger() {
  ScrollTrigger = gsap.core.globals().ScrollTrigger;
  ScrollTrigger && ScrollTrigger.core && _integrate();
},
    _initCore = function _initCore(core) {
  gsap = core || _getGSAP();

  if (gsap && typeof document !== "undefined" && document.body) {
    _win = window;
    _doc = document;
    _docEl = _doc.documentElement;
    _body = _doc.body;
    _root = [_win, _doc, _docEl, _body];
    _clamp = gsap.utils.clamp;

    _context = gsap.core.context || function () {};

    _pointerType = "onpointerenter" in _body ? "pointer" : "mouse"; // isTouch is 0 if no touch, 1 if ONLY touch, and 2 if it can accommodate touch but also other types like mouse/pointer.

    _isTouch = Observer.isTouch = _win.matchMedia && _win.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
    _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
    setTimeout(function () {
      return _startup = 0;
    }, 500);

    _setScrollTrigger();

    _coreInitted = 1;
  }

  return _coreInitted;
};

_horizontal.op = _vertical;
_scrollers.cache = 0;
var Observer = /*#__PURE__*/function () {
  function Observer(vars) {
    this.init(vars);
  }

  var _proto = Observer.prototype;

  _proto.init = function init(vars) {
    _coreInitted || _initCore(gsap) || console.warn("Please gsap.registerPlugin(Observer)");
    ScrollTrigger || _setScrollTrigger();
    var tolerance = vars.tolerance,
        dragMinimum = vars.dragMinimum,
        type = vars.type,
        target = vars.target,
        lineHeight = vars.lineHeight,
        debounce = vars.debounce,
        preventDefault = vars.preventDefault,
        onStop = vars.onStop,
        onStopDelay = vars.onStopDelay,
        ignore = vars.ignore,
        wheelSpeed = vars.wheelSpeed,
        event = vars.event,
        onDragStart = vars.onDragStart,
        onDragEnd = vars.onDragEnd,
        onDrag = vars.onDrag,
        onPress = vars.onPress,
        onRelease = vars.onRelease,
        onRight = vars.onRight,
        onLeft = vars.onLeft,
        onUp = vars.onUp,
        onDown = vars.onDown,
        onChangeX = vars.onChangeX,
        onChangeY = vars.onChangeY,
        onChange = vars.onChange,
        onToggleX = vars.onToggleX,
        onToggleY = vars.onToggleY,
        onHover = vars.onHover,
        onHoverEnd = vars.onHoverEnd,
        onMove = vars.onMove,
        ignoreCheck = vars.ignoreCheck,
        isNormalizer = vars.isNormalizer,
        onGestureStart = vars.onGestureStart,
        onGestureEnd = vars.onGestureEnd,
        onWheel = vars.onWheel,
        onEnable = vars.onEnable,
        onDisable = vars.onDisable,
        onClick = vars.onClick,
        scrollSpeed = vars.scrollSpeed,
        capture = vars.capture,
        allowClicks = vars.allowClicks,
        lockAxis = vars.lockAxis,
        onLockAxis = vars.onLockAxis;
    this.target = target = _getTarget(target) || _docEl;
    this.vars = vars;
    ignore && (ignore = gsap.utils.toArray(ignore));
    tolerance = tolerance || 1e-9;
    dragMinimum = dragMinimum || 0;
    wheelSpeed = wheelSpeed || 1;
    scrollSpeed = scrollSpeed || 1;
    type = type || "wheel,touch,pointer";
    debounce = debounce !== false;
    lineHeight || (lineHeight = parseFloat(_win.getComputedStyle(_body).lineHeight) || 22); // note: browser may report "normal", so default to 22.

    var id,
        onStopDelayedCall,
        dragged,
        moved,
        wheeled,
        locked,
        axis,
        self = this,
        prevDeltaX = 0,
        prevDeltaY = 0,
        scrollFuncX = _getScrollFunc(target, _horizontal),
        scrollFuncY = _getScrollFunc(target, _vertical),
        scrollX = scrollFuncX(),
        scrollY = scrollFuncY(),
        limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown",
        // for devices that accommodate mouse events and touch events, we need to distinguish.
    isViewport = _isViewport(target),
        ownerDoc = target.ownerDocument || _doc,
        deltaX = [0, 0, 0],
        // wheel, scroll, pointer/touch
    deltaY = [0, 0, 0],
        onClickTime = 0,
        clickCapture = function clickCapture() {
      return onClickTime = _getTime();
    },
        _ignoreCheck = function _ignoreCheck(e, isPointerOrTouch) {
      return (self.event = e) && ignore && ~ignore.indexOf(e.target) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
    },
        onStopFunc = function onStopFunc() {
      self._vx.reset();

      self._vy.reset();

      onStopDelayedCall.pause();
      onStop && onStop(self);
    },
        update = function update() {
      var dx = self.deltaX = _getAbsoluteMax(deltaX),
          dy = self.deltaY = _getAbsoluteMax(deltaY),
          changedX = Math.abs(dx) >= tolerance,
          changedY = Math.abs(dy) >= tolerance;

      onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY); // in ScrollTrigger.normalizeScroll(), we need to know if it was touch/pointer so we need access to the deltaX/deltaY Arrays before we clear them out.

      if (changedX) {
        onRight && self.deltaX > 0 && onRight(self);
        onLeft && self.deltaX < 0 && onLeft(self);
        onChangeX && onChangeX(self);
        onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
        prevDeltaX = self.deltaX;
        deltaX[0] = deltaX[1] = deltaX[2] = 0;
      }

      if (changedY) {
        onDown && self.deltaY > 0 && onDown(self);
        onUp && self.deltaY < 0 && onUp(self);
        onChangeY && onChangeY(self);
        onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
        prevDeltaY = self.deltaY;
        deltaY[0] = deltaY[1] = deltaY[2] = 0;
      }

      if (moved || dragged) {
        onMove && onMove(self);

        if (dragged) {
          onDrag(self);
          dragged = false;
        }

        moved = false;
      }

      locked && !(locked = false) && onLockAxis && onLockAxis(self);

      if (wheeled) {
        onWheel(self);
        wheeled = false;
      }

      id = 0;
    },
        onDelta = function onDelta(x, y, index) {
      deltaX[index] += x;
      deltaY[index] += y;

      self._vx.update(x);

      self._vy.update(y);

      debounce ? id || (id = requestAnimationFrame(update)) : update();
    },
        onTouchOrPointerDelta = function onTouchOrPointerDelta(x, y) {
      if (lockAxis && !axis) {
        self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
        locked = true;
      }

      if (axis !== "y") {
        deltaX[2] += x;

        self._vx.update(x, true); // update the velocity as frequently as possible instead of in the debounced function so that very quick touch-scrolls (flicks) feel natural. If it's the mouse/touch/pointer, force it so that we get snappy/accurate momentum scroll.

      }

      if (axis !== "x") {
        deltaY[2] += y;

        self._vy.update(y, true);
      }

      debounce ? id || (id = requestAnimationFrame(update)) : update();
    },
        _onDrag = function _onDrag(e) {
      if (_ignoreCheck(e, 1)) {
        return;
      }

      e = _getEvent(e, preventDefault);
      var x = e.clientX,
          y = e.clientY,
          dx = x - self.x,
          dy = y - self.y,
          isDragging = self.isDragging;
      self.x = x;
      self.y = y;

      if (isDragging || Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum) {
        onDrag && (dragged = true);
        isDragging || (self.isDragging = true);
        onTouchOrPointerDelta(dx, dy);
        isDragging || onDragStart && onDragStart(self);
      }
    },
        _onPress = self.onPress = function (e) {
      if (_ignoreCheck(e, 1) || e && e.button) {
        return;
      }

      self.axis = axis = null;
      onStopDelayedCall.pause();
      self.isPressed = true;
      e = _getEvent(e); // note: may need to preventDefault(?) Won't side-scroll on iOS Safari if we do, though.

      prevDeltaX = prevDeltaY = 0;
      self.startX = self.x = e.clientX;
      self.startY = self.y = e.clientY;

      self._vx.reset(); // otherwise the t2 may be stale if the user touches and flicks super fast and releases in less than 2 requestAnimationFrame ticks, causing velocity to be 0.


      self._vy.reset();

      _addListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, preventDefault, true);

      self.deltaX = self.deltaY = 0;
      onPress && onPress(self);
    },
        _onRelease = self.onRelease = function (e) {
      if (_ignoreCheck(e, 1)) {
        return;
      }

      _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);

      var isTrackingDrag = !isNaN(self.y - self.startY),
          wasDragging = self.isDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3),
          // some touch devices need some wiggle room in terms of sensing clicks - the finger may move a few pixels.
      eventData = _getEvent(e);

      if (!wasDragging && isTrackingDrag) {
        self._vx.reset();

        self._vy.reset();

        if (preventDefault && allowClicks) {
          gsap.delayedCall(0.08, function () {
            // some browsers (like Firefox) won't trust script-generated clicks, so if the user tries to click on a video to play it, for example, it simply won't work. Since a regular "click" event will most likely be generated anyway (one that has its isTrusted flag set to true), we must slightly delay our script-generated click so that the "real"/trusted one is prioritized. Remember, when there are duplicate events in quick succession, we suppress all but the first one. Some browsers don't even trigger the "real" one at all, so our synthetic one is a safety valve that ensures that no matter what, a click event does get dispatched.
            if (_getTime() - onClickTime > 300 && !e.defaultPrevented) {
              if (e.target.click) {
                //some browsers (like mobile Safari) don't properly trigger the click event
                e.target.click();
              } else if (ownerDoc.createEvent) {
                var syntheticEvent = ownerDoc.createEvent("MouseEvents");
                syntheticEvent.initMouseEvent("click", true, true, _win, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
                e.target.dispatchEvent(syntheticEvent);
              }
            }
          });
        }
      }

      self.isDragging = self.isGesturing = self.isPressed = false;
      onStop && !isNormalizer && onStopDelayedCall.restart(true);
      onDragEnd && wasDragging && onDragEnd(self);
      onRelease && onRelease(self, wasDragging);
    },
        _onGestureStart = function _onGestureStart(e) {
      return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
    },
        _onGestureEnd = function _onGestureEnd() {
      return (self.isGesturing = false) || onGestureEnd(self);
    },
        onScroll = function onScroll(e) {
      if (_ignoreCheck(e)) {
        return;
      }

      var x = scrollFuncX(),
          y = scrollFuncY();
      onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
      scrollX = x;
      scrollY = y;
      onStop && onStopDelayedCall.restart(true);
    },
        _onWheel = function _onWheel(e) {
      if (_ignoreCheck(e)) {
        return;
      }

      e = _getEvent(e, preventDefault);
      onWheel && (wheeled = true);
      var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win.innerHeight : 1) * wheelSpeed;
      onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
      onStop && !isNormalizer && onStopDelayedCall.restart(true);
    },
        _onMove = function _onMove(e) {
      if (_ignoreCheck(e)) {
        return;
      }

      var x = e.clientX,
          y = e.clientY,
          dx = x - self.x,
          dy = y - self.y;
      self.x = x;
      self.y = y;
      moved = true;
      (dx || dy) && onTouchOrPointerDelta(dx, dy);
    },
        _onHover = function _onHover(e) {
      self.event = e;
      onHover(self);
    },
        _onHoverEnd = function _onHoverEnd(e) {
      self.event = e;
      onHoverEnd(self);
    },
        _onClick = function _onClick(e) {
      return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self);
    };

    onStopDelayedCall = self._dc = gsap.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
    self.deltaX = self.deltaY = 0;
    self._vx = _getVelocityProp(0, 50, true);
    self._vy = _getVelocityProp(0, 50, true);
    self.scrollX = scrollFuncX;
    self.scrollY = scrollFuncY;
    self.isDragging = self.isGesturing = self.isPressed = false;

    _context(this);

    self.enable = function (e) {
      if (!self.isEnabled) {
        _addListener(isViewport ? ownerDoc : target, "scroll", _onScroll);

        type.indexOf("scroll") >= 0 && _addListener(isViewport ? ownerDoc : target, "scroll", onScroll, preventDefault, capture);
        type.indexOf("wheel") >= 0 && _addListener(target, "wheel", _onWheel, preventDefault, capture);

        if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
          _addListener(target, _eventTypes[0], _onPress, preventDefault, capture);

          _addListener(ownerDoc, _eventTypes[2], _onRelease);

          _addListener(ownerDoc, _eventTypes[3], _onRelease);

          allowClicks && _addListener(target, "click", clickCapture, false, true);
          onClick && _addListener(target, "click", _onClick);
          onGestureStart && _addListener(ownerDoc, "gesturestart", _onGestureStart);
          onGestureEnd && _addListener(ownerDoc, "gestureend", _onGestureEnd);
          onHover && _addListener(target, _pointerType + "enter", _onHover);
          onHoverEnd && _addListener(target, _pointerType + "leave", _onHoverEnd);
          onMove && _addListener(target, _pointerType + "move", _onMove);
        }

        self.isEnabled = true;
        e && e.type && _onPress(e);
        onEnable && onEnable(self);
      }

      return self;
    };

    self.disable = function () {
      if (self.isEnabled) {
        // only remove the _onScroll listener if there aren't any others that rely on the functionality.
        _observers.filter(function (o) {
          return o !== self && _isViewport(o.target);
        }).length || _removeListener(isViewport ? ownerDoc : target, "scroll", _onScroll);

        if (self.isPressed) {
          self._vx.reset();

          self._vy.reset();

          _removeListener(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
        }

        _removeListener(isViewport ? ownerDoc : target, "scroll", onScroll, capture);

        _removeListener(target, "wheel", _onWheel, capture);

        _removeListener(target, _eventTypes[0], _onPress, capture);

        _removeListener(ownerDoc, _eventTypes[2], _onRelease);

        _removeListener(ownerDoc, _eventTypes[3], _onRelease);

        _removeListener(target, "click", clickCapture, true);

        _removeListener(target, "click", _onClick);

        _removeListener(ownerDoc, "gesturestart", _onGestureStart);

        _removeListener(ownerDoc, "gestureend", _onGestureEnd);

        _removeListener(target, _pointerType + "enter", _onHover);

        _removeListener(target, _pointerType + "leave", _onHoverEnd);

        _removeListener(target, _pointerType + "move", _onMove);

        self.isEnabled = self.isPressed = self.isDragging = false;
        onDisable && onDisable(self);
      }
    };

    self.kill = self.revert = function () {
      self.disable();

      var i = _observers.indexOf(self);

      i >= 0 && _observers.splice(i, 1);
      _normalizer === self && (_normalizer = 0);
    };

    _observers.push(self);

    isNormalizer && _isViewport(target) && (_normalizer = self);
    self.enable(event);
  };

  _createClass(Observer, [{
    key: "velocityX",
    get: function get() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function get() {
      return this._vy.getVelocity();
    }
  }]);

  return Observer;
}();
Observer.version = "3.11.5";

Observer.create = function (vars) {
  return new Observer(vars);
};

Observer.register = _initCore;

Observer.getAll = function () {
  return _observers.slice();
};

Observer.getById = function (id) {
  return _observers.filter(function (o) {
    return o.vars.id === id;
  })[0];
};

_getGSAP() && gsap.registerPlugin(Observer);


/***/ }),

/***/ "./node_modules/gsap/ScrollTrigger.js":
/*!********************************************!*\
  !*** ./node_modules/gsap/ScrollTrigger.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScrollTrigger: () => (/* binding */ ScrollTrigger),
/* harmony export */   "default": () => (/* binding */ ScrollTrigger)
/* harmony export */ });
/* harmony import */ var _Observer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observer.js */ "./node_modules/gsap/Observer.js");
/*!
 * ScrollTrigger 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */


var gsap,
    _coreInitted,
    _win,
    _doc,
    _docEl,
    _body,
    _root,
    _resizeDelay,
    _toArray,
    _clamp,
    _time2,
    _syncInterval,
    _refreshing,
    _pointerIsDown,
    _transformProp,
    _i,
    _prevWidth,
    _prevHeight,
    _autoRefresh,
    _sort,
    _suppressOverwrites,
    _ignoreResize,
    _normalizer,
    _ignoreMobileResize,
    _baseScreenHeight,
    _baseScreenWidth,
    _fixIOSBug,
    _context,
    _scrollRestoration,
    _limitCallbacks,
    // if true, we'll only trigger callbacks if the active state toggles, so if you scroll immediately past both the start and end positions of a ScrollTrigger (thus inactive to inactive), neither its onEnter nor onLeave will be called. This is useful during startup.
_startup = 1,
    _getTime = Date.now,
    _time1 = _getTime(),
    _lastScrollTime = 0,
    _enabled = 0,
    _rafBugFix = function _rafBugFix() {
  return _enabled && requestAnimationFrame(_rafBugFix);
},
    // in some browsers (like Firefox), screen repaints weren't consistent unless we had SOMETHING queued up in requestAnimationFrame()! So this just creates a super simple loop to keep it alive and smooth out repaints.
_pointerDownHandler = function _pointerDownHandler() {
  return _pointerIsDown = 1;
},
    _pointerUpHandler = function _pointerUpHandler() {
  return _pointerIsDown = 0;
},
    _passThrough = function _passThrough(v) {
  return v;
},
    _round = function _round(value) {
  return Math.round(value * 100000) / 100000 || 0;
},
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _getGSAP = function _getGSAP() {
  return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
},
    _isViewport = function _isViewport(e) {
  return !!~_root.indexOf(e);
},
    _getBoundsFunc = function _getBoundsFunc(element) {
  return (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getProxyProp)(element, "getBoundingClientRect") || (_isViewport(element) ? function () {
    _winOffsets.width = _win.innerWidth;
    _winOffsets.height = _win.innerHeight;
    return _winOffsets;
  } : function () {
    return _getBounds(element);
  });
},
    _getSizeFunc = function _getSizeFunc(scroller, isViewport, _ref) {
  var d = _ref.d,
      d2 = _ref.d2,
      a = _ref.a;
  return (a = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getProxyProp)(scroller, "getBoundingClientRect")) ? function () {
    return a()[d];
  } : function () {
    return (isViewport ? _win["inner" + d2] : scroller["client" + d2]) || 0;
  };
},
    _getOffsetsFunc = function _getOffsetsFunc(element, isViewport) {
  return !isViewport || ~_Observer_js__WEBPACK_IMPORTED_MODULE_0__._proxies.indexOf(element) ? _getBoundsFunc(element) : function () {
    return _winOffsets;
  };
},
    _maxScroll = function _maxScroll(element, _ref2) {
  var s = _ref2.s,
      d2 = _ref2.d2,
      d = _ref2.d,
      a = _ref2.a;
  return Math.max(0, (s = "scroll" + d2) && (a = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getProxyProp)(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport(element) ? (_docEl[s] || _body[s]) - (_win["inner" + d2] || _docEl["client" + d2] || _body["client" + d2]) : element[s] - element["offset" + d2]);
},
    _iterateAutoRefresh = function _iterateAutoRefresh(func, events) {
  for (var i = 0; i < _autoRefresh.length; i += 3) {
    (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
  }
},
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _callIfFunc = function _callIfFunc(value) {
  return _isFunction(value) && value();
},
    _combineFunc = function _combineFunc(f1, f2) {
  return function () {
    var result1 = _callIfFunc(f1),
        result2 = _callIfFunc(f2);

    return function () {
      _callIfFunc(result1);

      _callIfFunc(result2);
    };
  };
},
    _endAnimation = function _endAnimation(animation, reversed, pause) {
  return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
},
    _callback = function _callback(self, func) {
  if (self.enabled) {
    var result = func(self);
    result && result.totalTime && (self.callbackAnimation = result);
  }
},
    _abs = Math.abs,
    _scrollLeft = "scrollLeft",
    _scrollTop = "scrollTop",
    _left = "left",
    _top = "top",
    _right = "right",
    _bottom = "bottom",
    _width = "width",
    _height = "height",
    _Right = "Right",
    _Left = "Left",
    _Top = "Top",
    _Bottom = "Bottom",
    _padding = "padding",
    _margin = "margin",
    _Width = "Width",
    _Height = "Height",
    _px = "px",
    _getComputedStyle = function _getComputedStyle(element) {
  return _win.getComputedStyle(element);
},
    _makePositionable = function _makePositionable(element) {
  // if the element already has position: absolute or fixed, leave that, otherwise make it position: relative
  var position = _getComputedStyle(element).position;

  element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || (obj[p] = defaults[p]);
  }

  return obj;
},
    _getBounds = function _getBounds(element, withoutTransforms) {
  var tween = withoutTransforms && _getComputedStyle(element)[_transformProp] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap.to(element, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1),
      bounds = element.getBoundingClientRect();
  tween && tween.progress(0).kill();
  return bounds;
},
    _getSize = function _getSize(element, _ref3) {
  var d2 = _ref3.d2;
  return element["offset" + d2] || element["client" + d2] || 0;
},
    _getLabelRatioArray = function _getLabelRatioArray(timeline) {
  var a = [],
      labels = timeline.labels,
      duration = timeline.duration(),
      p;

  for (p in labels) {
    a.push(labels[p] / duration);
  }

  return a;
},
    _getClosestLabel = function _getClosestLabel(animation) {
  return function (value) {
    return gsap.utils.snap(_getLabelRatioArray(animation), value);
  };
},
    _snapDirectional = function _snapDirectional(snapIncrementOrArray) {
  var snap = gsap.utils.snap(snapIncrementOrArray),
      a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function (a, b) {
    return a - b;
  });
  return a ? function (value, direction, threshold) {
    if (threshold === void 0) {
      threshold = 1e-3;
    }

    var i;

    if (!direction) {
      return snap(value);
    }

    if (direction > 0) {
      value -= threshold; // to avoid rounding errors. If we're too strict, it might snap forward, then immediately again, and again.

      for (i = 0; i < a.length; i++) {
        if (a[i] >= value) {
          return a[i];
        }
      }

      return a[i - 1];
    } else {
      i = a.length;
      value += threshold;

      while (i--) {
        if (a[i] <= value) {
          return a[i];
        }
      }
    }

    return a[0];
  } : function (value, direction, threshold) {
    if (threshold === void 0) {
      threshold = 1e-3;
    }

    var snapped = snap(value);
    return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
  };
},
    _getLabelAtDirection = function _getLabelAtDirection(timeline) {
  return function (value, st) {
    return _snapDirectional(_getLabelRatioArray(timeline))(value, st.direction);
  };
},
    _multiListener = function _multiListener(func, element, types, callback) {
  return types.split(",").forEach(function (type) {
    return func(element, type, callback);
  });
},
    _addListener = function _addListener(element, type, func, nonPassive, capture) {
  return element.addEventListener(type, func, {
    passive: !nonPassive,
    capture: !!capture
  });
},
    _removeListener = function _removeListener(element, type, func, capture) {
  return element.removeEventListener(type, func, !!capture);
},
    _wheelListener = function _wheelListener(func, el, scrollFunc) {
  scrollFunc = scrollFunc && scrollFunc.wheelHandler;

  if (scrollFunc) {
    func(el, "wheel", scrollFunc);
    func(el, "touchmove", scrollFunc);
  }
},
    _markerDefaults = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
},
    _defaults = {
  toggleActions: "play",
  anticipatePin: 0
},
    _keywords = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
},
    _offsetToPx = function _offsetToPx(value, size) {
  if (_isString(value)) {
    var eqIndex = value.indexOf("="),
        relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;

    if (~eqIndex) {
      value.indexOf("%") > eqIndex && (relative *= size / 100);
      value = value.substr(0, eqIndex - 1);
    }

    value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
  }

  return value;
},
    _createMarker = function _createMarker(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
  var startColor = _ref4.startColor,
      endColor = _ref4.endColor,
      fontSize = _ref4.fontSize,
      indent = _ref4.indent,
      fontWeight = _ref4.fontWeight;

  var e = _doc.createElement("div"),
      useFixedPosition = _isViewport(container) || (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getProxyProp)(container, "pinType") === "fixed",
      isScroller = type.indexOf("scroller") !== -1,
      parent = useFixedPosition ? _body : container,
      isStart = type.indexOf("start") !== -1,
      color = isStart ? startColor : endColor,
      css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";

  css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
  (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
  matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
  e._isStart = isStart;
  e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
  e.style.cssText = css;
  e.innerText = name || name === 0 ? type + "-" + name : type;
  parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
  e._offset = e["offset" + direction.op.d2];

  _positionMarker(e, 0, direction, isStart);

  return e;
},
    _positionMarker = function _positionMarker(marker, start, direction, flipped) {
  var vars = {
    display: "block"
  },
      side = direction[flipped ? "os2" : "p2"],
      oppositeSide = direction[flipped ? "p2" : "os2"];
  marker._isFlipped = flipped;
  vars[direction.a + "Percent"] = flipped ? -100 : 0;
  vars[direction.a] = flipped ? "1px" : 0;
  vars["border" + side + _Width] = 1;
  vars["border" + oppositeSide + _Width] = 0;
  vars[direction.p] = start + "px";
  gsap.set(marker, vars);
},
    _triggers = [],
    _ids = {},
    _rafID,
    _sync = function _sync() {
  return _getTime() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
},
    _onScroll = function _onScroll() {
  // previously, we tried to optimize performance by batching/deferring to the next requestAnimationFrame(), but discovered that Safari has a few bugs that make this unworkable (especially on iOS). See https://codepen.io/GreenSock/pen/16c435b12ef09c38125204818e7b45fc?editors=0010 and https://codepen.io/GreenSock/pen/JjOxYpQ/3dd65ccec5a60f1d862c355d84d14562?editors=0010 and https://codepen.io/GreenSock/pen/ExbrPNa/087cef197dc35445a0951e8935c41503?editors=0010
  if (!_normalizer || !_normalizer.isPressed || _normalizer.startX > _body.clientWidth) {
    // if the user is dragging the scrollbar, allow it.
    _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.cache++;

    if (_normalizer) {
      _rafID || (_rafID = requestAnimationFrame(_updateAll));
    } else {
      _updateAll(); // Safari in particular (on desktop) NEEDS the immediate update rather than waiting for a requestAnimationFrame() whereas iOS seems to benefit from waiting for the requestAnimationFrame() tick, at least when normalizing. See https://codepen.io/GreenSock/pen/qBYozqO?editors=0110

    }

    _lastScrollTime || _dispatch("scrollStart");
    _lastScrollTime = _getTime();
  }
},
    _setBaseDimensions = function _setBaseDimensions() {
  _baseScreenWidth = _win.innerWidth;
  _baseScreenHeight = _win.innerHeight;
},
    _onResize = function _onResize() {
  _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.cache++;
  !_refreshing && !_ignoreResize && !_doc.fullscreenElement && !_doc.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win.innerWidth || Math.abs(_win.innerHeight - _baseScreenHeight) > _win.innerHeight * 0.25) && _resizeDelay.restart(true);
},
    // ignore resizes triggered by refresh()
_listeners = {},
    _emptyArray = [],
    _softRefresh = function _softRefresh() {
  return _removeListener(ScrollTrigger, "scrollEnd", _softRefresh) || _refreshAll(true);
},
    _dispatch = function _dispatch(type) {
  return _listeners[type] && _listeners[type].map(function (f) {
    return f();
  }) || _emptyArray;
},
    _savedStyles = [],
    // when ScrollTrigger.saveStyles() is called, the inline styles are recorded in this Array in a sequential format like [element, cssText, gsCache, media]. This keeps it very memory-efficient and fast to iterate through.
_revertRecorded = function _revertRecorded(media) {
  for (var i = 0; i < _savedStyles.length; i += 5) {
    if (!media || _savedStyles[i + 4] && _savedStyles[i + 4].query === media) {
      _savedStyles[i].style.cssText = _savedStyles[i + 1];
      _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
      _savedStyles[i + 3].uncache = 1;
    }
  }
},
    _revertAll = function _revertAll(kill, media) {
  var trigger;

  for (_i = 0; _i < _triggers.length; _i++) {
    trigger = _triggers[_i];

    if (trigger && (!media || trigger._ctx === media)) {
      if (kill) {
        trigger.kill(1);
      } else {
        trigger.revert(true, true);
      }
    }
  }

  media && _revertRecorded(media);
  media || _dispatch("revert");
},
    _clearScrollMemory = function _clearScrollMemory(scrollRestoration, force) {
  // zero-out all the recorded scroll positions. Don't use _triggers because if, for example, .matchMedia() is used to create some ScrollTriggers and then the user resizes and it removes ALL ScrollTriggers, and then go back to a size where there are ScrollTriggers, it would have kept the position(s) saved from the initial state.
  _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.cache++;
  (force || !_refreshingAll) && _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.forEach(function (obj) {
    return _isFunction(obj) && obj.cacheID++ && (obj.rec = 0);
  });
  _isString(scrollRestoration) && (_win.history.scrollRestoration = _scrollRestoration = scrollRestoration);
},
    _refreshingAll,
    _refreshID = 0,
    _queueRefreshID,
    _queueRefreshAll = function _queueRefreshAll() {
  // we don't want to call _refreshAll() every time we create a new ScrollTrigger (for performance reasons) - it's better to batch them. Some frameworks dynamically load content and we can't rely on the window's "load" or "DOMContentLoaded" events to trigger it.
  if (_queueRefreshID !== _refreshID) {
    var id = _queueRefreshID = _refreshID;
    requestAnimationFrame(function () {
      return id === _refreshID && _refreshAll(true);
    });
  }
},
    _refreshAll = function _refreshAll(force, skipRevert) {
  if (_lastScrollTime && !force) {
    _addListener(ScrollTrigger, "scrollEnd", _softRefresh);

    return;
  }

  _refreshingAll = ScrollTrigger.isRefreshing = true;

  _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.forEach(function (obj) {
    return _isFunction(obj) && obj.cacheID++ && (obj.rec = obj());
  }); // force the clearing of the cache because some browsers take a little while to dispatch the "scroll" event and the user may have changed the scroll position and then called ScrollTrigger.refresh() right away


  var refreshInits = _dispatch("refreshInit");

  _sort && ScrollTrigger.sort();
  skipRevert || _revertAll();

  _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.forEach(function (obj) {
    if (_isFunction(obj)) {
      obj.smooth && (obj.target.style.scrollBehavior = "auto"); // smooth scrolling interferes

      obj(0);
    }
  });

  _triggers.slice(0).forEach(function (t) {
    return t.refresh();
  }); // don't loop with _i because during a refresh() someone could call ScrollTrigger.update() which would iterate through _i resulting in a skip.


  _triggers.forEach(function (t, i) {
    // nested pins (pinnedContainer) with pinSpacing may expand the container, so we must accommodate that here.
    if (t._subPinOffset && t.pin) {
      var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight",
          original = t.pin[prop];
      t.revert(true, 1);
      t.adjustPinSpacing(t.pin[prop] - original);
      t.refresh();
    }
  });

  _triggers.forEach(function (t) {
    return t.vars.end === "max" && t.setPositions(t.start, Math.max(t.start + 1, _maxScroll(t.scroller, t._dir)));
  }); // the scroller's max scroll position may change after all the ScrollTriggers refreshed (like pinning could push it down), so we need to loop back and correct any with end: "max".


  refreshInits.forEach(function (result) {
    return result && result.render && result.render(-1);
  }); // if the onRefreshInit() returns an animation (typically a gsap.set()), revert it. This makes it easy to put things in a certain spot before refreshing for measurement purposes, and then put things back.

  _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.forEach(function (obj) {
    if (_isFunction(obj)) {
      obj.smooth && requestAnimationFrame(function () {
        return obj.target.style.scrollBehavior = "smooth";
      });
      obj.rec && obj(obj.rec);
    }
  });

  _clearScrollMemory(_scrollRestoration, 1);

  _resizeDelay.pause();

  _refreshID++;
  _refreshingAll = 2;

  _updateAll(2);

  _triggers.forEach(function (t) {
    return _isFunction(t.vars.onRefresh) && t.vars.onRefresh(t);
  });

  _refreshingAll = ScrollTrigger.isRefreshing = false;

  _dispatch("refresh");
},
    _lastScroll = 0,
    _direction = 1,
    _primary,
    _updateAll = function _updateAll(force) {
  if (!_refreshingAll || force === 2) {
    ScrollTrigger.isUpdating = true;
    _primary && _primary.update(0); // ScrollSmoother uses refreshPriority -9999 to become the primary that gets updated before all others because it affects the scroll position.

    var l = _triggers.length,
        time = _getTime(),
        recordVelocity = time - _time1 >= 50,
        scroll = l && _triggers[0].scroll();

    _direction = _lastScroll > scroll ? -1 : 1;
    _refreshingAll || (_lastScroll = scroll);

    if (recordVelocity) {
      if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
        _lastScrollTime = 0;

        _dispatch("scrollEnd");
      }

      _time2 = _time1;
      _time1 = time;
    }

    if (_direction < 0) {
      _i = l;

      while (_i-- > 0) {
        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
      }

      _direction = 1;
    } else {
      for (_i = 0; _i < l; _i++) {
        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
      }
    }

    ScrollTrigger.isUpdating = false;
  }

  _rafID = 0;
},
    _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
    _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]),
    _swapPinOut = function _swapPinOut(pin, spacer, state) {
  _setState(state);

  var cache = pin._gsap;

  if (cache.spacerIsNative) {
    _setState(cache.spacerState);
  } else if (pin._gsap.swappedIn) {
    var parent = spacer.parentNode;

    if (parent) {
      parent.insertBefore(pin, spacer);
      parent.removeChild(spacer);
    }
  }

  pin._gsap.swappedIn = false;
},
    _swapPinIn = function _swapPinIn(pin, spacer, cs, spacerState) {
  if (!pin._gsap.swappedIn) {
    var i = _propNamesToCopy.length,
        spacerStyle = spacer.style,
        pinStyle = pin.style,
        p;

    while (i--) {
      p = _propNamesToCopy[i];
      spacerStyle[p] = cs[p];
    }

    spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
    cs.display === "inline" && (spacerStyle.display = "inline-block");
    pinStyle[_bottom] = pinStyle[_right] = "auto";
    spacerStyle.flexBasis = cs.flexBasis || "auto";
    spacerStyle.overflow = "visible";
    spacerStyle.boxSizing = "border-box";
    spacerStyle[_width] = _getSize(pin, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._horizontal) + _px;
    spacerStyle[_height] = _getSize(pin, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical) + _px;
    spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";

    _setState(spacerState);

    pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
    pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
    pinStyle[_padding] = cs[_padding];

    if (pin.parentNode !== spacer) {
      pin.parentNode.insertBefore(spacer, pin);
      spacer.appendChild(pin);
    }

    pin._gsap.swappedIn = true;
  }
},
    _capsExp = /([A-Z])/g,
    _setState = function _setState(state) {
  if (state) {
    var style = state.t.style,
        l = state.length,
        i = 0,
        p,
        value;
    (state.t._gsap || gsap.core.getCache(state.t)).uncache = 1; // otherwise transforms may be off

    for (; i < l; i += 2) {
      value = state[i + 1];
      p = state[i];

      if (value) {
        style[p] = value;
      } else if (style[p]) {
        style.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
      }
    }
  }
},
    _getState = function _getState(element) {
  // returns an Array with alternating values like [property, value, property, value] and a "t" property pointing to the target (element). Makes it fast and cheap.
  var l = _stateProps.length,
      style = element.style,
      state = [],
      i = 0;

  for (; i < l; i++) {
    state.push(_stateProps[i], style[_stateProps[i]]);
  }

  state.t = element;
  return state;
},
    _copyState = function _copyState(state, override, omitOffsets) {
  var result = [],
      l = state.length,
      i = omitOffsets ? 8 : 0,
      // skip top, left, right, bottom if omitOffsets is true
  p;

  for (; i < l; i += 2) {
    p = state[i];
    result.push(p, p in override ? override[p] : state[i + 1]);
  }

  result.t = state.t;
  return result;
},
    _winOffsets = {
  left: 0,
  top: 0
},
    // // potential future feature (?) Allow users to calculate where a trigger hits (scroll position) like getScrollPosition("#id", "top bottom")
// _getScrollPosition = (trigger, position, {scroller, containerAnimation, horizontal}) => {
// 	scroller = _getTarget(scroller || _win);
// 	let direction = horizontal ? _horizontal : _vertical,
// 		isViewport = _isViewport(scroller);
// 	_getSizeFunc(scroller, isViewport, direction);
// 	return _parsePosition(position, _getTarget(trigger), _getSizeFunc(scroller, isViewport, direction)(), direction, _getScrollFunc(scroller, direction)(), 0, 0, 0, _getOffsetsFunc(scroller, isViewport)(), isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, 0, containerAnimation ? containerAnimation.duration() : _maxScroll(scroller), containerAnimation);
// },
_parsePosition = function _parsePosition(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation) {
  _isFunction(value) && (value = value(self));

  if (_isString(value) && value.substr(0, 3) === "max") {
    value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
  }

  var time = containerAnimation ? containerAnimation.time() : 0,
      p1,
      p2,
      element;
  containerAnimation && containerAnimation.seek(0);

  if (!_isNumber(value)) {
    _isFunction(trigger) && (trigger = trigger(self));
    var offsets = (value || "0").split(" "),
        bounds,
        localOffset,
        globalOffset,
        display;
    element = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)(trigger) || _body;
    bounds = _getBounds(element) || {};

    if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
      // if display is "none", it won't report getBoundingClientRect() properly
      display = element.style.display;
      element.style.display = "block";
      bounds = _getBounds(element);
      display ? element.style.display = display : element.style.removeProperty("display");
    }

    localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
    globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
    value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
    markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
    scrollerSize -= scrollerSize - globalOffset; // adjust for the marker
  } else {
    containerAnimation && (value = gsap.utils.mapRange(containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, 0, scrollerMax, value));
    markerScroller && _positionMarker(markerScroller, scrollerSize, direction, true);
  }

  if (marker) {
    var position = value + scrollerSize,
        isStart = marker._isStart;
    p1 = "scroll" + direction.d2;

    _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body[p1], _docEl[p1]) : marker.parentNode[p1]) <= position + 1);

    if (useFixedPosition) {
      scrollerBounds = _getBounds(markerScroller);
      useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
    }
  }

  if (containerAnimation && element) {
    p1 = _getBounds(element);
    containerAnimation.seek(scrollerMax);
    p2 = _getBounds(element);
    containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
    value = value / containerAnimation._caScrollDist * scrollerMax;
  }

  containerAnimation && containerAnimation.seek(time);
  return containerAnimation ? value : Math.round(value);
},
    _prefixExp = /(webkit|moz|length|cssText|inset)/i,
    _reparent = function _reparent(element, parent, top, left) {
  if (element.parentNode !== parent) {
    var style = element.style,
        p,
        cs;

    if (parent === _body) {
      element._stOrig = style.cssText; // record original inline styles so we can revert them later

      cs = _getComputedStyle(element);

      for (p in cs) {
        // must copy all relevant styles to ensure that nothing changes visually when we reparent to the <body>. Skip the vendor prefixed ones.
        if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
          style[p] = cs[p];
        }
      }

      style.top = top;
      style.left = left;
    } else {
      style.cssText = element._stOrig;
    }

    gsap.core.getCache(element).uncache = 1;
    parent.appendChild(element);
  }
},
    _interruptionTracker = function _interruptionTracker(getValueFunc, initialValue, onInterrupt) {
  var last1 = initialValue,
      last2 = last1;
  return function (value) {
    var current = Math.round(getValueFunc()); // round because in some [very uncommon] Windows environments, scroll can get reported with decimals even though it was set without.

    if (current !== last1 && current !== last2 && Math.abs(current - last1) > 3 && Math.abs(current - last2) > 3) {
      // if the user scrolls, kill the tween. iOS Safari intermittently misreports the scroll position, it may be the most recently-set one or the one before that! When Safari is zoomed (CMD-+), it often misreports as 1 pixel off too! So if we set the scroll position to 125, for example, it'll actually report it as 124.
      value = current;
      onInterrupt && onInterrupt();
    }

    last2 = last1;
    last1 = value;
    return value;
  };
},
    // _mergeAnimations = animations => {
// 	let tl = gsap.timeline({smoothChildTiming: true}).startTime(Math.min(...animations.map(a => a.globalTime(0))));
// 	animations.forEach(a => {let time = a.totalTime(); tl.add(a); a.totalTime(time); });
// 	tl.smoothChildTiming = false;
// 	return tl;
// },
// returns a function that can be used to tween the scroll position in the direction provided, and when doing so it'll add a .tween property to the FUNCTION itself, and remove it when the tween completes or gets killed. This gives us a way to have multiple ScrollTriggers use a central function for any given scroller and see if there's a scroll tween running (which would affect if/how things get updated)
_getTweenCreator = function _getTweenCreator(scroller, direction) {
  var getScroll = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getScrollFunc)(scroller, direction),
      prop = "_scroll" + direction.p2,
      // add a tweenable property to the scroller that's a getter/setter function, like _scrollTop or _scrollLeft. This way, if someone does gsap.killTweensOf(scroller) it'll kill the scroll tween.
  lastScroll1,
      lastScroll2,
      getTween = function getTween(scrollTo, vars, initialValue, change1, change2) {
    var tween = getTween.tween,
        onComplete = vars.onComplete,
        modifiers = {};
    initialValue = initialValue || getScroll();

    var checkForInterruption = _interruptionTracker(getScroll, initialValue, function () {
      tween.kill();
      getTween.tween = 0;
    });

    change2 = change1 && change2 || 0; // if change1 is 0, we set that to the difference and ignore change2. Otherwise, there would be a compound effect.

    change1 = change1 || scrollTo - initialValue;
    tween && tween.kill();
    lastScroll1 = Math.round(initialValue);
    vars[prop] = scrollTo;
    vars.modifiers = modifiers;

    modifiers[prop] = function () {
      return checkForInterruption(initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio);
    };

    vars.onUpdate = function () {
      _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.cache++;

      _updateAll();
    };

    vars.onComplete = function () {
      getTween.tween = 0;
      onComplete && onComplete.call(tween);
    };

    tween = getTween.tween = gsap.to(scroller, vars);
    return tween;
  };

  scroller[prop] = getScroll;

  getScroll.wheelHandler = function () {
    return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
  };

  _addListener(scroller, "wheel", getScroll.wheelHandler); // Windows machines handle mousewheel scrolling in chunks (like "3 lines per scroll") meaning the typical strategy for cancelling the scroll isn't as sensitive. It's much more likely to match one of the previous 2 scroll event positions. So we kill any snapping as soon as there's a wheel event.


  ScrollTrigger.isTouch && _addListener(scroller, "touchmove", getScroll.wheelHandler);
  return getTween;
};

var ScrollTrigger = /*#__PURE__*/function () {
  function ScrollTrigger(vars, animation) {
    _coreInitted || ScrollTrigger.register(gsap) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
    this.init(vars, animation);
  }

  var _proto = ScrollTrigger.prototype;

  _proto.init = function init(vars, animation) {
    this.progress = this.start = 0;
    this.vars && this.kill(true, true); // in case it's being initted again

    if (!_enabled) {
      this.update = this.refresh = this.kill = _passThrough;
      return;
    }

    vars = _setDefaults(_isString(vars) || _isNumber(vars) || vars.nodeType ? {
      trigger: vars
    } : vars, _defaults);

    var _vars = vars,
        onUpdate = _vars.onUpdate,
        toggleClass = _vars.toggleClass,
        id = _vars.id,
        onToggle = _vars.onToggle,
        onRefresh = _vars.onRefresh,
        scrub = _vars.scrub,
        trigger = _vars.trigger,
        pin = _vars.pin,
        pinSpacing = _vars.pinSpacing,
        invalidateOnRefresh = _vars.invalidateOnRefresh,
        anticipatePin = _vars.anticipatePin,
        onScrubComplete = _vars.onScrubComplete,
        onSnapComplete = _vars.onSnapComplete,
        once = _vars.once,
        snap = _vars.snap,
        pinReparent = _vars.pinReparent,
        pinSpacer = _vars.pinSpacer,
        containerAnimation = _vars.containerAnimation,
        fastScrollEnd = _vars.fastScrollEnd,
        preventOverlaps = _vars.preventOverlaps,
        direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _Observer_js__WEBPACK_IMPORTED_MODULE_0__._horizontal : _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical,
        isToggle = !scrub && scrub !== 0,
        scroller = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)(vars.scroller || _win),
        scrollerCache = gsap.core.getCache(scroller),
        isViewport = _isViewport(scroller),
        useFixedPosition = ("pinType" in vars ? vars.pinType : (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getProxyProp)(scroller, "pinType") || isViewport && "fixed") === "fixed",
        callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack],
        toggleActions = isToggle && vars.toggleActions.split(" "),
        markers = "markers" in vars ? vars.markers : _defaults.markers,
        borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0,
        self = this,
        onRefreshInit = vars.onRefreshInit && function () {
      return vars.onRefreshInit(self);
    },
        getScrollerSize = _getSizeFunc(scroller, isViewport, direction),
        getScrollerOffsets = _getOffsetsFunc(scroller, isViewport),
        lastSnap = 0,
        lastRefresh = 0,
        scrollFunc = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getScrollFunc)(scroller, direction),
        tweenTo,
        pinCache,
        snapFunc,
        scroll1,
        scroll2,
        start,
        end,
        markerStart,
        markerEnd,
        markerStartTrigger,
        markerEndTrigger,
        markerVars,
        change,
        pinOriginalState,
        pinActiveState,
        pinState,
        spacer,
        offset,
        pinGetter,
        pinSetter,
        pinStart,
        pinChange,
        spacingStart,
        spacerState,
        markerStartSetter,
        pinMoves,
        markerEndSetter,
        cs,
        snap1,
        snap2,
        scrubTween,
        scrubSmooth,
        snapDurClamp,
        snapDelayedCall,
        prevProgress,
        prevScroll,
        prevAnimProgress,
        caMarkerSetter,
        customRevertReturn;

    _context(self);

    self._dir = direction;
    anticipatePin *= 45;
    self.scroller = scroller;
    self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
    scroll1 = scrollFunc();
    self.vars = vars;
    animation = animation || vars.animation;

    if ("refreshPriority" in vars) {
      _sort = 1;
      vars.refreshPriority === -9999 && (_primary = self); // used by ScrollSmoother
    }

    scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
      top: _getTweenCreator(scroller, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical),
      left: _getTweenCreator(scroller, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._horizontal)
    };
    self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];

    self.scrubDuration = function (value) {
      scrubSmooth = _isNumber(value) && value;

      if (!scrubSmooth) {
        scrubTween && scrubTween.progress(1).kill();
        scrubTween = 0;
      } else {
        scrubTween ? scrubTween.duration(value) : scrubTween = gsap.to(animation, {
          ease: "expo",
          totalProgress: "+=0.001",
          duration: scrubSmooth,
          paused: true,
          onComplete: function onComplete() {
            return onScrubComplete && onScrubComplete(self);
          }
        });
      }
    };

    if (animation) {
      animation.vars.lazy = false;
      animation._initted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true);
      self.animation = animation.pause();
      animation.scrollTrigger = self;
      self.scrubDuration(scrub);
      scrubTween && scrubTween.resetTo && scrubTween.resetTo("totalProgress", 0); // otherwise the initial scrub progress value would start at 0.001 which normally is no big deal, but for containerAnimation it can be noticeable since the range is so tiny.

      snap1 = 0;
      id || (id = animation.vars.id);
    }

    _triggers.push(self);

    if (snap) {
      // TODO: potential idea: use legitimate CSS scroll snapping by pushing invisible elements into the DOM that serve as snap positions, and toggle the document.scrollingElement.style.scrollSnapType onToggle. See https://codepen.io/GreenSock/pen/JjLrgWM for a quick proof of concept.
      if (!_isObject(snap) || snap.push) {
        snap = {
          snapTo: snap
        };
      }

      "scrollBehavior" in _body.style && gsap.set(isViewport ? [_body, _docEl] : scroller, {
        scrollBehavior: "auto"
      }); // smooth scrolling doesn't work with snap.

      _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.forEach(function (o) {
        return _isFunction(o) && o.target === (isViewport ? _doc.scrollingElement || _docEl : scroller) && (o.smooth = false);
      }); // note: set smooth to false on both the vertical and horizontal scroll getters/setters


      snapFunc = _isFunction(snap.snapTo) ? snap.snapTo : snap.snapTo === "labels" ? _getClosestLabel(animation) : snap.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap.directional !== false ? function (value, st) {
        return _snapDirectional(snap.snapTo)(value, _getTime() - lastRefresh < 500 ? 0 : st.direction);
      } : gsap.utils.snap(snap.snapTo);
      snapDurClamp = snap.duration || {
        min: 0.1,
        max: 2
      };
      snapDurClamp = _isObject(snapDurClamp) ? _clamp(snapDurClamp.min, snapDurClamp.max) : _clamp(snapDurClamp, snapDurClamp);
      snapDelayedCall = gsap.delayedCall(snap.delay || scrubSmooth / 2 || 0.1, function () {
        var scroll = scrollFunc(),
            refreshedRecently = _getTime() - lastRefresh < 500,
            tween = tweenTo.tween;

        if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
          var progress = (scroll - start) / change,
              totalProgress = animation && !isToggle ? animation.totalProgress() : progress,
              velocity = refreshedRecently ? 0 : (totalProgress - snap2) / (_getTime() - _time2) * 1000 || 0,
              change1 = gsap.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185),
              naturalEnd = progress + (snap.inertia === false ? 0 : change1),
              endValue = _clamp(0, 1, snapFunc(naturalEnd, self)),
              endScroll = Math.round(start + endValue * change),
              _snap = snap,
              onStart = _snap.onStart,
              _onInterrupt = _snap.onInterrupt,
              _onComplete = _snap.onComplete;

          if (scroll <= end && scroll >= start && endScroll !== scroll) {
            if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
              // there's an overlapping snap! So we must figure out which one is closer and let that tween live.
              return;
            }

            if (snap.inertia === false) {
              change1 = endValue - progress;
            }

            tweenTo(endScroll, {
              duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
              ease: snap.ease || "power3",
              data: _abs(endScroll - scroll),
              // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
              onInterrupt: function onInterrupt() {
                return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
              },
              onComplete: function onComplete() {
                self.update();
                lastSnap = scrollFunc();
                snap1 = snap2 = animation && !isToggle ? animation.totalProgress() : self.progress;
                onSnapComplete && onSnapComplete(self);
                _onComplete && _onComplete(self);
              }
            }, scroll, change1 * change, endScroll - scroll - change1 * change);
            onStart && onStart(self, tweenTo.tween);
          }
        } else if (self.isActive && lastSnap !== scroll) {
          snapDelayedCall.restart(true);
        }
      }).pause();
    }

    id && (_ids[id] = self);
    trigger = self.trigger = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)(trigger || pin); // if a trigger has some kind of scroll-related effect applied that could contaminate the "y" or "x" position (like a ScrollSmoother effect), we needed a way to temporarily revert it, so we use the stRevert property of the gsCache. It can return another function that we'll call at the end so it can return to its normal state.

    customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
    customRevertReturn && (customRevertReturn = customRevertReturn(self));
    pin = pin === true ? trigger : (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)(pin);
    _isString(toggleClass) && (toggleClass = {
      targets: trigger,
      className: toggleClass
    });

    if (pin) {
      pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding); // if the parent is display: flex, don't apply pinSpacing by default. We should check that pin.parentNode is an element (not shadow dom window)

      self.pin = pin;
      pinCache = gsap.core.getCache(pin);

      if (!pinCache.spacer) {
        // record the spacer and pinOriginalState on the cache in case someone tries pinning the same element with MULTIPLE ScrollTriggers - we don't want to have multiple spacers or record the "original" pin state after it has already been affected by another ScrollTrigger.
        if (pinSpacer) {
          pinSpacer = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)(pinSpacer);
          pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement); // for React & Angular

          pinCache.spacerIsNative = !!pinSpacer;
          pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
        }

        pinCache.spacer = spacer = pinSpacer || _doc.createElement("div");
        spacer.classList.add("pin-spacer");
        id && spacer.classList.add("pin-spacer-" + id);
        pinCache.pinState = pinOriginalState = _getState(pin);
      } else {
        pinOriginalState = pinCache.pinState;
      }

      vars.force3D !== false && gsap.set(pin, {
        force3D: true
      });
      self.spacer = spacer = pinCache.spacer;
      cs = _getComputedStyle(pin);
      spacingStart = cs[pinSpacing + direction.os2];
      pinGetter = gsap.getProperty(pin);
      pinSetter = gsap.quickSetter(pin, direction.a, _px); // pin.firstChild && !_maxScroll(pin, direction) && (pin.style.overflow = "hidden"); // protects from collapsing margins, but can have unintended consequences as demonstrated here: https://codepen.io/GreenSock/pen/1e42c7a73bfa409d2cf1e184e7a4248d so it was removed in favor of just telling people to set up their CSS to avoid the collapsing margins (overflow: hidden | auto is just one option. Another is border-top: 1px solid transparent).

      _swapPinIn(pin, spacer, cs);

      pinState = _getState(pin);
    }

    if (markers) {
      markerVars = _isObject(markers) ? _setDefaults(markers, _markerDefaults) : _markerDefaults;
      markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
      markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
      offset = markerStartTrigger["offset" + direction.op.d2];

      var content = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)((0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getProxyProp)(scroller, "content") || scroller);

      markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
      markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
      containerAnimation && (caMarkerSetter = gsap.quickSetter([markerStart, markerEnd], direction.a, _px));

      if (!useFixedPosition && !(_Observer_js__WEBPACK_IMPORTED_MODULE_0__._proxies.length && (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getProxyProp)(scroller, "fixedMarkers") === true)) {
        _makePositionable(isViewport ? _body : scroller);

        gsap.set([markerStartTrigger, markerEndTrigger], {
          force3D: true
        });
        markerStartSetter = gsap.quickSetter(markerStartTrigger, direction.a, _px);
        markerEndSetter = gsap.quickSetter(markerEndTrigger, direction.a, _px);
      }
    }

    if (containerAnimation) {
      var oldOnUpdate = containerAnimation.vars.onUpdate,
          oldParams = containerAnimation.vars.onUpdateParams;
      containerAnimation.eventCallback("onUpdate", function () {
        self.update(0, 0, 1);
        oldOnUpdate && oldOnUpdate.apply(containerAnimation, oldParams || []);
      });
    }

    self.previous = function () {
      return _triggers[_triggers.indexOf(self) - 1];
    };

    self.next = function () {
      return _triggers[_triggers.indexOf(self) + 1];
    };

    self.revert = function (revert, temp) {
      if (!temp) {
        return self.kill(true);
      } // for compatibility with gsap.context() and gsap.matchMedia() which call revert()


      var r = revert !== false || !self.enabled,
          prevRefreshing = _refreshing;

      if (r !== self.isReverted) {
        if (r) {
          // if (!self.scroll.rec && (_refreshing || _refreshingAll)) {
          // 	self.scroll.rec = scrollFunc();
          // 	_refreshingAll && scrollFunc(0);
          // }
          prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0); // record the scroll so we can revert later (repositioning/pinning things can affect scroll position). In the static refresh() method, we first record all the scroll positions as a reference.

          prevProgress = self.progress;
          prevAnimProgress = animation && animation.progress();
        }

        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
          return m.style.display = r ? "none" : "block";
        });

        if (r) {
          _refreshing = self;
          self.update(r); // make sure the pin is back in its original position so that all the measurements are correct. do this BEFORE swapping the pin out
        }

        if (pin && (!pinReparent || !self.isActive)) {
          if (r) {
            _swapPinOut(pin, spacer, pinOriginalState);
          } else {
            _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
          }
        }

        r || self.update(r); // when we're restoring, the update should run AFTER swapping the pin into its pin-spacer.

        _refreshing = prevRefreshing; // restore. We set it to true during the update() so that things fire properly in there.

        self.isReverted = r;
      }
    };

    self.refresh = function (soft, force) {
      if ((_refreshing || !self.enabled) && !force) {
        return;
      }

      if (pin && soft && _lastScrollTime) {
        _addListener(ScrollTrigger, "scrollEnd", _softRefresh);

        return;
      }

      !_refreshingAll && onRefreshInit && onRefreshInit(self);
      _refreshing = self;
      lastRefresh = _getTime();

      if (tweenTo.tween) {
        tweenTo.tween.kill();
        tweenTo.tween = 0;
      }

      scrubTween && scrubTween.pause();
      invalidateOnRefresh && animation && animation.revert({
        kill: false
      }).invalidate();
      self.isReverted || self.revert(true, true);
      self._subPinOffset = false; // we'll set this to true in the sub-pins if we find any

      var size = getScrollerSize(),
          scrollerBounds = getScrollerOffsets(),
          max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction),
          isFirstRefresh = change <= 0.01,
          offset = 0,
          otherPinOffset = 0,
          parsedEnd = vars.end,
          parsedEndTrigger = vars.endTrigger || trigger,
          parsedStart = vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"),
          pinnedContainer = self.pinnedContainer = vars.pinnedContainer && (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)(vars.pinnedContainer),
          triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0,
          i = triggerIndex,
          cs,
          bounds,
          scroll,
          isVertical,
          override,
          curTrigger,
          curPin,
          oppositeScroll,
          initted,
          revertedPins,
          forcedOverflow;

      while (i--) {
        // user might try to pin the same element more than once, so we must find any prior triggers with the same pin, revert them, and determine how long they're pinning so that we can offset things appropriately. Make sure we revert from last to first so that things "rewind" properly.
        curTrigger = _triggers[i];
        curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self); // if it's a timeline-based trigger that hasn't been fully initialized yet because it's waiting for 1 tick, just force the refresh() here, otherwise if it contains a pin that's supposed to affect other ScrollTriggers further down the page, they won't be adjusted properly.

        curPin = curTrigger.pin;

        if (curPin && (curPin === trigger || curPin === pin || curPin === pinnedContainer) && !curTrigger.isReverted) {
          revertedPins || (revertedPins = []);
          revertedPins.unshift(curTrigger); // we'll revert from first to last to make sure things reach their end state properly

          curTrigger.revert(true, true);
        }

        if (curTrigger !== _triggers[i]) {
          // in case it got removed.
          triggerIndex--;
          i--;
        }
      }

      _isFunction(parsedStart) && (parsedStart = parsedStart(self));
      start = _parsePosition(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation) || (pin ? -0.001 : 0);
      _isFunction(parsedEnd) && (parsedEnd = parsedEnd(self));

      if (_isString(parsedEnd) && !parsedEnd.indexOf("+=")) {
        if (~parsedEnd.indexOf(" ")) {
          parsedEnd = (_isString(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
        } else {
          offset = _offsetToPx(parsedEnd.substr(2), size);
          parsedEnd = _isString(parsedStart) ? parsedStart : (containerAnimation ? gsap.utils.mapRange(0, containerAnimation.duration(), containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, start) : start) + offset; // _parsePosition won't factor in the offset if the start is a number, so do it here.

          parsedEndTrigger = trigger;
        }
      }

      end = Math.max(start, _parsePosition(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation)) || -0.001;
      change = end - start || (start -= 0.01) && 0.001;
      offset = 0;
      i = triggerIndex;

      while (i--) {
        curTrigger = _triggers[i];
        curPin = curTrigger.pin;

        if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
          cs = curTrigger.end - curTrigger.start;

          if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && !_isNumber(parsedStart)) {
            // numeric start values shouldn't be offset at all - treat them as absolute
            offset += cs * (1 - curTrigger.progress);
          }

          curPin === pin && (otherPinOffset += cs);
        }
      }

      start += offset;
      end += offset;

      if (isFirstRefresh) {
        // on the very first refresh(), the prevProgress couldn't have been accurate yet because the start/end were never calculated, so we set it here. Before 3.11.5, it could lead to an inaccurate scroll position restoration with snapping.
        prevProgress = gsap.utils.clamp(0, 1, gsap.utils.normalize(start, end, prevScroll));
      }

      self._pinPush = otherPinOffset;

      if (markerStart && offset) {
        // offset the markers if necessary
        cs = {};
        cs[direction.a] = "+=" + offset;
        pinnedContainer && (cs[direction.p] = "-=" + scrollFunc());
        gsap.set([markerStart, markerEnd], cs);
      }

      if (pin) {
        cs = _getComputedStyle(pin);
        isVertical = direction === _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical;
        scroll = scrollFunc(); // recalculate because the triggers can affect the scroll

        pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;

        if (!max && end > 1) {
          // makes sure the scroller has a scrollbar, otherwise if something has width: 100%, for example, it would be too big (exclude the scrollbar). See https://greensock.com/forums/topic/25182-scrolltrigger-width-of-page-increase-where-markers-are-set-to-false/
          forcedOverflow = (isViewport ? _doc.scrollingElement || _docEl : scroller).style;
          forcedOverflow = {
            style: forcedOverflow,
            value: forcedOverflow["overflow" + direction.a.toUpperCase()]
          };
          forcedOverflow.style["overflow" + direction.a.toUpperCase()] = "scroll";
        }

        _swapPinIn(pin, spacer, cs);

        pinState = _getState(pin); // transforms will interfere with the top/left/right/bottom placement, so remove them temporarily. getBoundingClientRect() factors in transforms.

        bounds = _getBounds(pin, true);
        oppositeScroll = useFixedPosition && (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getScrollFunc)(scroller, isVertical ? _Observer_js__WEBPACK_IMPORTED_MODULE_0__._horizontal : _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical)();

        if (pinSpacing) {
          spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
          spacerState.t = spacer;
          i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
          i && spacerState.push(direction.d, i + _px); // for box-sizing: border-box (must include padding).

          _setState(spacerState);

          if (pinnedContainer) {
            // in ScrollTrigger.refresh(), we need to re-evaluate the pinContainer's size because this pinSpacing may stretch it out, but we can't just add the exact distance because depending on layout, it may not push things down or it may only do so partially.
            _triggers.forEach(function (t) {
              if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) {
                t._subPinOffset = true;
              }
            });
          }

          useFixedPosition && scrollFunc(prevScroll);
        }

        if (useFixedPosition) {
          override = {
            top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
            left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
            boxSizing: "border-box",
            position: "fixed"
          };
          override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
          override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
          override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
          override[_padding] = cs[_padding];
          override[_padding + _Top] = cs[_padding + _Top];
          override[_padding + _Right] = cs[_padding + _Right];
          override[_padding + _Bottom] = cs[_padding + _Bottom];
          override[_padding + _Left] = cs[_padding + _Left];
          pinActiveState = _copyState(pinOriginalState, override, pinReparent);
          _refreshingAll && scrollFunc(0);
        }

        if (animation) {
          // the animation might be affecting the transform, so we must jump to the end, check the value, and compensate accordingly. Otherwise, when it becomes unpinned, the pinSetter() will get set to a value that doesn't include whatever the animation did.
          initted = animation._initted; // if not, we must invalidate() after this step, otherwise it could lock in starting values prematurely.

          _suppressOverwrites(1);

          animation.render(animation.duration(), true, true);
          pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
          pinMoves = Math.abs(change - pinChange) > 1;
          useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2); // transform is the last property/value set in the state Array. Since the animation is controlling that, we should omit it.

          animation.render(0, true, true);
          initted || animation.invalidate(true);
          animation.parent || animation.totalTime(animation.totalTime()); // if, for example, a toggleAction called play() and then refresh() happens and when we render(1) above, it would cause the animation to complete and get removed from its parent, so this makes sure it gets put back in.

          _suppressOverwrites(0);
        } else {
          pinChange = change;
        }

        forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
      } else if (trigger && scrollFunc() && !containerAnimation) {
        // it may be INSIDE a pinned element, so walk up the tree and look for any elements with _pinOffset to compensate because anything with pinSpacing that's already scrolled would throw off the measurements in getBoundingClientRect()
        bounds = trigger.parentNode;

        while (bounds && bounds !== _body) {
          if (bounds._pinOffset) {
            start -= bounds._pinOffset;
            end -= bounds._pinOffset;
          }

          bounds = bounds.parentNode;
        }
      }

      revertedPins && revertedPins.forEach(function (t) {
        return t.revert(false, true);
      });
      self.start = start;
      self.end = end;
      scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc(); // reset velocity

      if (!containerAnimation && !_refreshingAll) {
        scroll1 < prevScroll && scrollFunc(prevScroll);
        self.scroll.rec = 0;
      }

      self.revert(false, true);

      if (snapDelayedCall) {
        lastSnap = -1;
        self.isActive && scrollFunc(start + change * prevProgress); // just so snapping gets re-enabled, clear out any recorded last value

        snapDelayedCall.restart(true);
      }

      _refreshing = 0;
      animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress, true).render(animation.time(), true, true); // must force a re-render because if saveStyles() was used on the target(s), the styles could have been wiped out during the refresh().

      if (isFirstRefresh || prevProgress !== self.progress || containerAnimation) {
        // ensures that the direction is set properly (when refreshing, progress is set back to 0 initially, then back again to wherever it needs to be) and that callbacks are triggered.
        animation && !isToggle && animation.totalProgress(containerAnimation && start < -0.001 && !prevProgress ? gsap.utils.normalize(start, end, 0) : prevProgress, true); // to avoid issues where animation callbacks like onStart aren't triggered.

        self.progress = (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
      }

      pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
      scrubTween && scrubTween.invalidate();
      onRefresh && !_refreshingAll && onRefresh(self); // when refreshing all, we do extra work to correct pinnedContainer sizes and ensure things don't exceed the maxScroll, so we should do all the refreshes at the end after all that work so that the start/end values are corrected.
    };

    self.getVelocity = function () {
      return (scrollFunc() - scroll2) / (_getTime() - _time2) * 1000 || 0;
    };

    self.endAnimation = function () {
      _endAnimation(self.callbackAnimation);

      if (animation) {
        scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
      }
    };

    self.labelToScroll = function (label) {
      return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
    };

    self.getTrailing = function (name) {
      var i = _triggers.indexOf(self),
          a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);

      return (_isString(name) ? a.filter(function (t) {
        return t.vars.preventOverlaps === name;
      }) : a).filter(function (t) {
        return self.direction > 0 ? t.end <= start : t.start >= end;
      });
    };

    self.update = function (reset, recordVelocity, forceFake) {
      if (containerAnimation && !forceFake && !reset) {
        return;
      }

      var scroll = _refreshingAll === true ? prevScroll : self.scroll(),
          p = reset ? 0 : (scroll - start) / change,
          clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0,
          prevProgress = self.progress,
          isActive,
          wasActive,
          toggleState,
          action,
          stateChanged,
          toggled,
          isAtMax,
          isTakingAction;

      if (recordVelocity) {
        scroll2 = scroll1;
        scroll1 = containerAnimation ? scrollFunc() : scroll;

        if (snap) {
          snap2 = snap1;
          snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
        }
      } // anticipate the pinning a few ticks ahead of time based on velocity to avoid a visual glitch due to the fact that most browsers do scrolling on a separate thread (not synced with requestAnimationFrame).


      anticipatePin && !clipped && pin && !_refreshing && !_startup && _lastScrollTime && start < scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin && (clipped = 0.0001);

      if (clipped !== prevProgress && self.enabled) {
        isActive = self.isActive = !!clipped && clipped < 1;
        wasActive = !!prevProgress && prevProgress < 1;
        toggled = isActive !== wasActive;
        stateChanged = toggled || !!clipped !== !!prevProgress; // could go from start all the way to end, thus it didn't toggle but it did change state in a sense (may need to fire a callback)

        self.direction = clipped > prevProgress ? 1 : -1;
        self.progress = clipped;

        if (stateChanged && !_refreshing) {
          toggleState = clipped && !prevProgress ? 0 : clipped === 1 ? 1 : prevProgress === 1 ? 2 : 3; // 0 = enter, 1 = leave, 2 = enterBack, 3 = leaveBack (we prioritize the FIRST encounter, thus if you scroll really fast past the onEnter and onLeave in one tick, it'd prioritize onEnter.

          if (isToggle) {
            action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState]; // if it didn't toggle, that means it shot right past and since we prioritize the "enter" action, we should switch to the "leave" in this case (but only if one is defined)

            isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
          }
        }

        preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function (t) {
          return t.endAnimation();
        }));

        if (!isToggle) {
          if (scrubTween && !_refreshing && !_startup) {
            scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start); // if there's a scrub on both the container animation and this one (or a ScrollSmoother), the update order would cause this one not to have rendered yet, so it wouldn't make any progress before we .restart() it heading toward the new progress so it'd appear stuck thus we force a render here.

            if (scrubTween.resetTo) {
              scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
            } else {
              // legacy support (courtesy), before 3.10.0
              scrubTween.vars.totalProgress = clipped;
              scrubTween.invalidate().restart();
            }
          } else if (animation) {
            animation.totalProgress(clipped, !!_refreshing);
          }
        }

        if (pin) {
          reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);

          if (!useFixedPosition) {
            pinSetter(_round(pinStart + pinChange * clipped));
          } else if (stateChanged) {
            isAtMax = !reset && clipped > prevProgress && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction); // if it's at the VERY end of the page, don't switch away from position: fixed because it's pointless and it could cause a brief flash when the user scrolls back up (when it gets pinned again)

            if (pinReparent) {
              if (!reset && (isActive || isAtMax)) {
                var bounds = _getBounds(pin, true),
                    _offset = scroll - start;

                _reparent(pin, _body, bounds.top + (direction === _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical ? _offset : 0) + _px, bounds.left + (direction === _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical ? 0 : _offset) + _px);
              } else {
                _reparent(pin, spacer);
              }
            }

            _setState(isActive || isAtMax ? pinActiveState : pinState);

            pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
          }
        }

        snap && !tweenTo.tween && !_refreshing && !_startup && snapDelayedCall.restart(true);
        toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function (el) {
          return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
        }); // classes could affect positioning, so do it even if reset or refreshing is true.

        onUpdate && !isToggle && !reset && onUpdate(self);

        if (stateChanged && !_refreshing) {
          if (isToggle) {
            if (isTakingAction) {
              if (action === "complete") {
                animation.pause().totalProgress(1);
              } else if (action === "reset") {
                animation.restart(true).pause();
              } else if (action === "restart") {
                animation.restart(true);
              } else {
                animation[action]();
              }
            }

            onUpdate && onUpdate(self);
          }

          if (toggled || !_limitCallbacks) {
            // on startup, the page could be scrolled and we don't want to fire callbacks that didn't toggle. For example onEnter shouldn't fire if the ScrollTrigger isn't actually entered.
            onToggle && toggled && _callback(self, onToggle);
            callbacks[toggleState] && _callback(self, callbacks[toggleState]);
            once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0); // a callback shouldn't be called again if once is true.

            if (!toggled) {
              // it's possible to go completely past, like from before the start to after the end (or vice-versa) in which case BOTH callbacks should be fired in that order
              toggleState = clipped === 1 ? 1 : 3;
              callbacks[toggleState] && _callback(self, callbacks[toggleState]);
            }
          }

          if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber(fastScrollEnd) ? fastScrollEnd : 2500)) {
            _endAnimation(self.callbackAnimation);

            scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
          }
        } else if (isToggle && onUpdate && !_refreshing) {
          onUpdate(self);
        }
      } // update absolutely-positioned markers (only if the scroller isn't the viewport)


      if (markerEndSetter) {
        var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
        markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
        markerEndSetter(n);
      }

      caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
    };

    self.enable = function (reset, refresh) {
      if (!self.enabled) {
        self.enabled = true;

        _addListener(scroller, "resize", _onResize);

        _addListener(isViewport ? _doc : scroller, "scroll", _onScroll);

        onRefreshInit && _addListener(ScrollTrigger, "refreshInit", onRefreshInit);

        if (reset !== false) {
          self.progress = prevProgress = 0;
          scroll1 = scroll2 = lastSnap = scrollFunc();
        }

        refresh !== false && self.refresh();
      }
    };

    self.getTween = function (snap) {
      return snap && tweenTo ? tweenTo.tween : scrubTween;
    };

    self.setPositions = function (newStart, newEnd) {
      // doesn't persist after refresh()! Intended to be a way to override values that were set during refresh(), like you could set it in onRefresh()
      if (pin) {
        pinStart += newStart - start;
        pinChange += newEnd - newStart - change;
        pinSpacing === _padding && self.adjustPinSpacing(newEnd - newStart - change);
      }

      self.start = start = newStart;
      self.end = end = newEnd;
      change = newEnd - newStart;
      self.update();
    };

    self.adjustPinSpacing = function (amount) {
      if (spacerState && amount) {
        var i = spacerState.indexOf(direction.d) + 1;
        spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
        spacerState[1] = parseFloat(spacerState[1]) + amount + _px;

        _setState(spacerState);
      }
    };

    self.disable = function (reset, allowAnimation) {
      if (self.enabled) {
        reset !== false && self.revert(true, true);
        self.enabled = self.isActive = false;
        allowAnimation || scrubTween && scrubTween.pause();
        prevScroll = 0;
        pinCache && (pinCache.uncache = 1);
        onRefreshInit && _removeListener(ScrollTrigger, "refreshInit", onRefreshInit);

        if (snapDelayedCall) {
          snapDelayedCall.pause();
          tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
        }

        if (!isViewport) {
          var i = _triggers.length;

          while (i--) {
            if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
              return; //don't remove the listeners if there are still other triggers referencing it.
            }
          }

          _removeListener(scroller, "resize", _onResize);

          _removeListener(scroller, "scroll", _onScroll);
        }
      }
    };

    self.kill = function (revert, allowAnimation) {
      self.disable(revert, allowAnimation);
      scrubTween && !allowAnimation && scrubTween.kill();
      id && delete _ids[id];

      var i = _triggers.indexOf(self);

      i >= 0 && _triggers.splice(i, 1);
      i === _i && _direction > 0 && _i--; // if we're in the middle of a refresh() or update(), splicing would cause skips in the index, so adjust...
      // if no other ScrollTrigger instances of the same scroller are found, wipe out any recorded scroll position. Otherwise, in a single page application, for example, it could maintain scroll position when it really shouldn't.

      i = 0;

      _triggers.forEach(function (t) {
        return t.scroller === self.scroller && (i = 1);
      });

      i || _refreshingAll || (self.scroll.rec = 0);

      if (animation) {
        animation.scrollTrigger = null;
        revert && animation.revert({
          kill: false
        });
        allowAnimation || animation.kill();
      }

      markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
        return m.parentNode && m.parentNode.removeChild(m);
      });
      _primary === self && (_primary = 0);

      if (pin) {
        pinCache && (pinCache.uncache = 1);
        i = 0;

        _triggers.forEach(function (t) {
          return t.pin === pin && i++;
        });

        i || (pinCache.spacer = 0); // if there aren't any more ScrollTriggers with the same pin, remove the spacer, otherwise it could be contaminated with old/stale values if the user re-creates a ScrollTrigger for the same element.
      }

      vars.onKill && vars.onKill(self);
    };

    self.enable(false, false);
    customRevertReturn && customRevertReturn(self);
    !animation || !animation.add || change ? self.refresh() : gsap.delayedCall(0.01, function () {
      return start || end || self.refresh();
    }) && (change = 0.01) && (start = end = 0); // if the animation is a timeline, it may not have been populated yet, so it wouldn't render at the proper place on the first refresh(), thus we should schedule one for the next tick. If "change" is defined, we know it must be re-enabling, thus we can refresh() right away.

    pin && _queueRefreshAll(); // pinning could affect the positions of other things, so make sure we queue a full refresh()
  };

  ScrollTrigger.register = function register(core) {
    if (!_coreInitted) {
      gsap = core || _getGSAP();
      _windowExists() && window.document && ScrollTrigger.enable();
      _coreInitted = _enabled;
    }

    return _coreInitted;
  };

  ScrollTrigger.defaults = function defaults(config) {
    if (config) {
      for (var p in config) {
        _defaults[p] = config[p];
      }
    }

    return _defaults;
  };

  ScrollTrigger.disable = function disable(reset, kill) {
    _enabled = 0;

    _triggers.forEach(function (trigger) {
      return trigger[kill ? "kill" : "disable"](reset);
    });

    _removeListener(_win, "wheel", _onScroll);

    _removeListener(_doc, "scroll", _onScroll);

    clearInterval(_syncInterval);

    _removeListener(_doc, "touchcancel", _passThrough);

    _removeListener(_body, "touchstart", _passThrough);

    _multiListener(_removeListener, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);

    _multiListener(_removeListener, _doc, "pointerup,touchend,mouseup", _pointerUpHandler);

    _resizeDelay.kill();

    _iterateAutoRefresh(_removeListener);

    for (var i = 0; i < _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.length; i += 3) {
      _wheelListener(_removeListener, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers[i], _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers[i + 1]);

      _wheelListener(_removeListener, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers[i], _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers[i + 2]);
    }
  };

  ScrollTrigger.enable = function enable() {
    _win = window;
    _doc = document;
    _docEl = _doc.documentElement;
    _body = _doc.body;

    if (gsap) {
      _toArray = gsap.utils.toArray;
      _clamp = gsap.utils.clamp;
      _context = gsap.core.context || _passThrough;
      _suppressOverwrites = gsap.core.suppressOverwrites || _passThrough;
      _scrollRestoration = _win.history.scrollRestoration || "auto";
      _lastScroll = _win.pageYOffset;
      gsap.core.globals("ScrollTrigger", ScrollTrigger); // must register the global manually because in Internet Explorer, functions (classes) don't have a "name" property.

      if (_body) {
        _enabled = 1;

        _rafBugFix();

        _Observer_js__WEBPACK_IMPORTED_MODULE_0__.Observer.register(gsap); // isTouch is 0 if no touch, 1 if ONLY touch, and 2 if it can accommodate touch but also other types like mouse/pointer.

        ScrollTrigger.isTouch = _Observer_js__WEBPACK_IMPORTED_MODULE_0__.Observer.isTouch;
        _fixIOSBug = _Observer_js__WEBPACK_IMPORTED_MODULE_0__.Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent); // since 2017, iOS has had a bug that causes event.clientX/Y to be inaccurate when a scroll occurs, thus we must alternate ignoring every other touchmove event to work around it. See https://bugs.webkit.org/show_bug.cgi?id=181954 and https://codepen.io/GreenSock/pen/ExbrPNa/087cef197dc35445a0951e8935c41503

        _addListener(_win, "wheel", _onScroll); // mostly for 3rd party smooth scrolling libraries.


        _root = [_win, _doc, _docEl, _body];

        if (gsap.matchMedia) {
          ScrollTrigger.matchMedia = function (vars) {
            var mm = gsap.matchMedia(),
                p;

            for (p in vars) {
              mm.add(p, vars[p]);
            }

            return mm;
          };

          gsap.addEventListener("matchMediaInit", function () {
            return _revertAll();
          });
          gsap.addEventListener("matchMediaRevert", function () {
            return _revertRecorded();
          });
          gsap.addEventListener("matchMedia", function () {
            _refreshAll(0, 1);

            _dispatch("matchMedia");
          });
          gsap.matchMedia("(orientation: portrait)", function () {
            // when orientation changes, we should take new base measurements for the ignoreMobileResize feature.
            _setBaseDimensions();

            return _setBaseDimensions;
          });
        } else {
          console.warn("Requires GSAP 3.11.0 or later");
        }

        _setBaseDimensions();

        _addListener(_doc, "scroll", _onScroll); // some browsers (like Chrome), the window stops dispatching scroll events on the window if you scroll really fast, but it's consistent on the document!


        var bodyStyle = _body.style,
            border = bodyStyle.borderTopStyle,
            AnimationProto = gsap.core.Animation.prototype,
            bounds,
            i;
        AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
          value: function value() {
            return this.time(-0.01, true);
          }
        }); // only for backwards compatibility (Animation.revert() was added after 3.10.4)

        bodyStyle.borderTopStyle = "solid"; // works around an issue where a margin of a child element could throw off the bounds of the _body, making it seem like there's a margin when there actually isn't. The border ensures that the bounds are accurate.

        bounds = _getBounds(_body);
        _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical.m = Math.round(bounds.top + _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical.sc()) || 0; // accommodate the offset of the <body> caused by margins and/or padding

        _Observer_js__WEBPACK_IMPORTED_MODULE_0__._horizontal.m = Math.round(bounds.left + _Observer_js__WEBPACK_IMPORTED_MODULE_0__._horizontal.sc()) || 0;
        border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style"); // TODO: (?) maybe move to leveraging the velocity mechanism in Observer and skip intervals.

        _syncInterval = setInterval(_sync, 250);
        gsap.delayedCall(0.5, function () {
          return _startup = 0;
        });

        _addListener(_doc, "touchcancel", _passThrough); // some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document.


        _addListener(_body, "touchstart", _passThrough); //works around Safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/


        _multiListener(_addListener, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);

        _multiListener(_addListener, _doc, "pointerup,touchend,mouseup", _pointerUpHandler);

        _transformProp = gsap.utils.checkPrefix("transform");

        _stateProps.push(_transformProp);

        _coreInitted = _getTime();
        _resizeDelay = gsap.delayedCall(0.2, _refreshAll).pause();
        _autoRefresh = [_doc, "visibilitychange", function () {
          var w = _win.innerWidth,
              h = _win.innerHeight;

          if (_doc.hidden) {
            _prevWidth = w;
            _prevHeight = h;
          } else if (_prevWidth !== w || _prevHeight !== h) {
            _onResize();
          }
        }, _doc, "DOMContentLoaded", _refreshAll, _win, "load", _refreshAll, _win, "resize", _onResize];

        _iterateAutoRefresh(_addListener);

        _triggers.forEach(function (trigger) {
          return trigger.enable(0, 1);
        });

        for (i = 0; i < _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.length; i += 3) {
          _wheelListener(_removeListener, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers[i], _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers[i + 1]);

          _wheelListener(_removeListener, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers[i], _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers[i + 2]);
        }
      }
    }
  };

  ScrollTrigger.config = function config(vars) {
    "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
    var ms = vars.syncInterval;
    ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
    "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger.isTouch === 1 && vars.ignoreMobileResize);

    if ("autoRefreshEvents" in vars) {
      _iterateAutoRefresh(_removeListener) || _iterateAutoRefresh(_addListener, vars.autoRefreshEvents || "none");
      _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
    }
  };

  ScrollTrigger.scrollerProxy = function scrollerProxy(target, vars) {
    var t = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)(target),
        i = _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.indexOf(t),
        isViewport = _isViewport(t);

    if (~i) {
      _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.splice(i, isViewport ? 6 : 2);
    }

    if (vars) {
      isViewport ? _Observer_js__WEBPACK_IMPORTED_MODULE_0__._proxies.unshift(_win, vars, _body, vars, _docEl, vars) : _Observer_js__WEBPACK_IMPORTED_MODULE_0__._proxies.unshift(t, vars);
    }
  };

  ScrollTrigger.clearMatchMedia = function clearMatchMedia(query) {
    _triggers.forEach(function (t) {
      return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
    });
  };

  ScrollTrigger.isInViewport = function isInViewport(element, ratio, horizontal) {
    var bounds = (_isString(element) ? (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)(element) : element).getBoundingClientRect(),
        offset = bounds[horizontal ? _width : _height] * ratio || 0;
    return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win.innerHeight;
  };

  ScrollTrigger.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
    _isString(element) && (element = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)(element));
    var bounds = element.getBoundingClientRect(),
        size = bounds[horizontal ? _width : _height],
        offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
    return horizontal ? (bounds.left + offset) / _win.innerWidth : (bounds.top + offset) / _win.innerHeight;
  };

  ScrollTrigger.killAll = function killAll(allowListeners) {
    _triggers.slice(0).forEach(function (t) {
      return t.vars.id !== "ScrollSmoother" && t.kill();
    });

    if (allowListeners !== true) {
      var listeners = _listeners.killAll || [];
      _listeners = {};
      listeners.forEach(function (f) {
        return f();
      });
    }
  };

  return ScrollTrigger;
}();
ScrollTrigger.version = "3.11.5";

ScrollTrigger.saveStyles = function (targets) {
  return targets ? _toArray(targets).forEach(function (target) {
    // saved styles are recorded in a consecutive alternating Array, like [element, cssText, transform attribute, cache, matchMedia, ...]
    if (target && target.style) {
      var i = _savedStyles.indexOf(target);

      i >= 0 && _savedStyles.splice(i, 5);

      _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap.core.getCache(target), _context());
    }
  }) : _savedStyles;
};

ScrollTrigger.revert = function (soft, media) {
  return _revertAll(!soft, media);
};

ScrollTrigger.create = function (vars, animation) {
  return new ScrollTrigger(vars, animation);
};

ScrollTrigger.refresh = function (safe) {
  return safe ? _onResize() : (_coreInitted || ScrollTrigger.register()) && _refreshAll(true);
};

ScrollTrigger.update = function (force) {
  return ++_Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.cache && _updateAll(force === true ? 2 : 0);
};

ScrollTrigger.clearScrollMemory = _clearScrollMemory;

ScrollTrigger.maxScroll = function (element, horizontal) {
  return _maxScroll(element, horizontal ? _Observer_js__WEBPACK_IMPORTED_MODULE_0__._horizontal : _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical);
};

ScrollTrigger.getScrollFunc = function (element, horizontal) {
  return (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getScrollFunc)((0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)(element), horizontal ? _Observer_js__WEBPACK_IMPORTED_MODULE_0__._horizontal : _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical);
};

ScrollTrigger.getById = function (id) {
  return _ids[id];
};

ScrollTrigger.getAll = function () {
  return _triggers.filter(function (t) {
    return t.vars.id !== "ScrollSmoother";
  });
}; // it's common for people to ScrollTrigger.getAll(t => t.kill()) on page routes, for example, and we don't want it to ruin smooth scrolling by killing the main ScrollSmoother one.


ScrollTrigger.isScrolling = function () {
  return !!_lastScrollTime;
};

ScrollTrigger.snapDirectional = _snapDirectional;

ScrollTrigger.addEventListener = function (type, callback) {
  var a = _listeners[type] || (_listeners[type] = []);
  ~a.indexOf(callback) || a.push(callback);
};

ScrollTrigger.removeEventListener = function (type, callback) {
  var a = _listeners[type],
      i = a && a.indexOf(callback);
  i >= 0 && a.splice(i, 1);
};

ScrollTrigger.batch = function (targets, vars) {
  var result = [],
      varsCopy = {},
      interval = vars.interval || 0.016,
      batchMax = vars.batchMax || 1e9,
      proxyCallback = function proxyCallback(type, callback) {
    var elements = [],
        triggers = [],
        delay = gsap.delayedCall(interval, function () {
      callback(elements, triggers);
      elements = [];
      triggers = [];
    }).pause();
    return function (self) {
      elements.length || delay.restart(true);
      elements.push(self.trigger);
      triggers.push(self);
      batchMax <= elements.length && delay.progress(1);
    };
  },
      p;

  for (p in vars) {
    varsCopy[p] = p.substr(0, 2) === "on" && _isFunction(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
  }

  if (_isFunction(batchMax)) {
    batchMax = batchMax();

    _addListener(ScrollTrigger, "refresh", function () {
      return batchMax = vars.batchMax();
    });
  }

  _toArray(targets).forEach(function (target) {
    var config = {};

    for (p in varsCopy) {
      config[p] = varsCopy[p];
    }

    config.trigger = target;
    result.push(ScrollTrigger.create(config));
  });

  return result;
}; // to reduce file size. clamps the scroll and also returns a duration multiplier so that if the scroll gets chopped shorter, the duration gets curtailed as well (otherwise if you're very close to the top of the page, for example, and swipe up really fast, it'll suddenly slow down and take a long time to reach the top).


var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier(scrollFunc, current, end, max) {
  current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
  return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
},
    _allowNativePanning = function _allowNativePanning(target, direction) {
  if (direction === true) {
    target.style.removeProperty("touch-action");
  } else {
    target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (_Observer_js__WEBPACK_IMPORTED_MODULE_0__.Observer.isTouch ? " pinch-zoom" : "") : "none"; // note: Firefox doesn't support it pinch-zoom properly, at least in addition to a pan-x or pan-y.
  }

  target === _docEl && _allowNativePanning(_body, direction);
},
    _overflow = {
  auto: 1,
  scroll: 1
},
    _nestedScroll = function _nestedScroll(_ref5) {
  var event = _ref5.event,
      target = _ref5.target,
      axis = _ref5.axis;

  var node = (event.changedTouches ? event.changedTouches[0] : event).target,
      cache = node._gsap || gsap.core.getCache(node),
      time = _getTime(),
      cs;

  if (!cache._isScrollT || time - cache._isScrollT > 2000) {
    // cache for 2 seconds to improve performance.
    while (node && node !== _body && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))) {
      node = node.parentNode;
    }

    cache._isScroll = node && node !== target && !_isViewport(node) && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
    cache._isScrollT = time;
  }

  if (cache._isScroll || axis === "x") {
    event.stopPropagation();
    event._gsapAllow = true;
  }
},
    // capture events on scrollable elements INSIDE the <body> and allow those by calling stopPropagation() when we find a scrollable ancestor
_inputObserver = function _inputObserver(target, type, inputs, nested) {
  return _Observer_js__WEBPACK_IMPORTED_MODULE_0__.Observer.create({
    target: target,
    capture: true,
    debounce: false,
    lockAxis: true,
    type: type,
    onWheel: nested = nested && _nestedScroll,
    onPress: nested,
    onDrag: nested,
    onScroll: nested,
    onEnable: function onEnable() {
      return inputs && _addListener(_doc, _Observer_js__WEBPACK_IMPORTED_MODULE_0__.Observer.eventTypes[0], _captureInputs, false, true);
    },
    onDisable: function onDisable() {
      return _removeListener(_doc, _Observer_js__WEBPACK_IMPORTED_MODULE_0__.Observer.eventTypes[0], _captureInputs, true);
    }
  });
},
    _inputExp = /(input|label|select|textarea)/i,
    _inputIsFocused,
    _captureInputs = function _captureInputs(e) {
  var isInput = _inputExp.test(e.target.tagName);

  if (isInput || _inputIsFocused) {
    e._gsapAllow = true;
    _inputIsFocused = isInput;
  }
},
    _getScrollNormalizer = function _getScrollNormalizer(vars) {
  _isObject(vars) || (vars = {});
  vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
  vars.type || (vars.type = "wheel,touch");
  vars.debounce = !!vars.debounce;
  vars.id = vars.id || "normalizer";

  var _vars2 = vars,
      normalizeScrollX = _vars2.normalizeScrollX,
      momentum = _vars2.momentum,
      allowNestedScroll = _vars2.allowNestedScroll,
      onRelease = _vars2.onRelease,
      self,
      maxY,
      target = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)(vars.target) || _docEl,
      smoother = gsap.core.globals().ScrollSmoother,
      smootherInstance = smoother && smoother.get(),
      content = _fixIOSBug && (vars.content && (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getTarget)(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()),
      scrollFuncY = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getScrollFunc)(target, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical),
      scrollFuncX = (0,_Observer_js__WEBPACK_IMPORTED_MODULE_0__._getScrollFunc)(target, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._horizontal),
      scale = 1,
      initialScale = (_Observer_js__WEBPACK_IMPORTED_MODULE_0__.Observer.isTouch && _win.visualViewport ? _win.visualViewport.scale * _win.visualViewport.width : _win.outerWidth) / _win.innerWidth,
      wheelRefresh = 0,
      resolveMomentumDuration = _isFunction(momentum) ? function () {
    return momentum(self);
  } : function () {
    return momentum || 2.8;
  },
      lastRefreshID,
      skipTouchMove,
      inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll),
      resumeTouchMove = function resumeTouchMove() {
    return skipTouchMove = false;
  },
      scrollClampX = _passThrough,
      scrollClampY = _passThrough,
      updateClamps = function updateClamps() {
    maxY = _maxScroll(target, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical);
    scrollClampY = _clamp(_fixIOSBug ? 1 : 0, maxY);
    normalizeScrollX && (scrollClampX = _clamp(0, _maxScroll(target, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._horizontal)));
    lastRefreshID = _refreshID;
  },
      removeContentOffset = function removeContentOffset() {
    content._gsap.y = _round(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
    content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
    scrollFuncY.offset = scrollFuncY.cacheID = 0;
  },
      ignoreDrag = function ignoreDrag() {
    if (skipTouchMove) {
      requestAnimationFrame(resumeTouchMove);

      var offset = _round(self.deltaY / 2),
          scroll = scrollClampY(scrollFuncY.v - offset);

      if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
        scrollFuncY.offset = scroll - scrollFuncY.v;

        var y = _round((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);

        content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
        content._gsap.y = y + "px";
        scrollFuncY.cacheID = _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.cache;

        _updateAll();
      }

      return true;
    }

    scrollFuncY.offset && removeContentOffset();
    skipTouchMove = true;
  },
      tween,
      startScrollX,
      startScrollY,
      onStopDelayedCall,
      onResize = function onResize() {
    // if the window resizes, like on an iPhone which Apple FORCES the address bar to show/hide even if we event.preventDefault(), it may be scrolling too far now that the address bar is showing, so we must dynamically adjust the momentum tween.
    updateClamps();

    if (tween.isActive() && tween.vars.scrollY > maxY) {
      scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
    }
  };

  content && gsap.set(content, {
    y: "+=0"
  }); // to ensure there's a cache (element._gsap)

  vars.ignoreCheck = function (e) {
    return _fixIOSBug && e.type === "touchmove" && ignoreDrag(e) || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
  };

  vars.onPress = function () {
    skipTouchMove = false;
    var prevScale = scale;
    scale = _round((_win.visualViewport && _win.visualViewport.scale || 1) / initialScale);
    tween.pause();
    prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
    startScrollX = scrollFuncX();
    startScrollY = scrollFuncY();
    updateClamps();
    lastRefreshID = _refreshID;
  };

  vars.onRelease = vars.onGestureStart = function (self, wasDragging) {
    scrollFuncY.offset && removeContentOffset();

    if (!wasDragging) {
      onStopDelayedCall.restart(true);
    } else {
      _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers.cache++; // make sure we're pulling the non-cached value
      // alternate algorithm: durX = Math.min(6, Math.abs(self.velocityX / 800)),	dur = Math.max(durX, Math.min(6, Math.abs(self.velocityY / 800))); dur = dur * (0.4 + (1 - _power4In(dur / 6)) * 0.6)) * (momentumSpeed || 1)

      var dur = resolveMomentumDuration(),
          currentScroll,
          endScroll;

      if (normalizeScrollX) {
        currentScroll = scrollFuncX();
        endScroll = currentScroll + dur * 0.05 * -self.velocityX / 0.227; // the constant .227 is from power4(0.05). velocity is inverted because scrolling goes in the opposite direction.

        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._horizontal));
        tween.vars.scrollX = scrollClampX(endScroll);
      }

      currentScroll = scrollFuncY();
      endScroll = currentScroll + dur * 0.05 * -self.velocityY / 0.227; // the constant .227 is from power4(0.05)

      dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _Observer_js__WEBPACK_IMPORTED_MODULE_0__._vertical));
      tween.vars.scrollY = scrollClampY(endScroll);
      tween.invalidate().duration(dur).play(0.01);

      if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
        // iOS bug: it'll show the address bar but NOT fire the window "resize" event until the animation is done but we must protect against overshoot so we leverage an onUpdate to do so.
        gsap.to({}, {
          onUpdate: onResize,
          duration: dur
        });
      }
    }

    onRelease && onRelease(self);
  };

  vars.onWheel = function () {
    tween._ts && tween.pause();

    if (_getTime() - wheelRefresh > 1000) {
      // after 1 second, refresh the clamps otherwise that'll only happen when ScrollTrigger.refresh() is called or for touch-scrolling.
      lastRefreshID = 0;
      wheelRefresh = _getTime();
    }
  };

  vars.onChange = function (self, dx, dy, xArray, yArray) {
    _refreshID !== lastRefreshID && updateClamps();
    dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self.startX - self.x) : scrollFuncX() + dx - xArray[1])); // for more precision, we track pointer/touch movement from the start, otherwise it'll drift.

    if (dy) {
      scrollFuncY.offset && removeContentOffset();
      var isTouch = yArray[2] === dy,
          y = isTouch ? startScrollY + self.startY - self.y : scrollFuncY() + dy - yArray[1],
          yClamped = scrollClampY(y);
      isTouch && y !== yClamped && (startScrollY += yClamped - y);
      scrollFuncY(yClamped);
    }

    (dy || dx) && _updateAll();
  };

  vars.onEnable = function () {
    _allowNativePanning(target, normalizeScrollX ? false : "x");

    ScrollTrigger.addEventListener("refresh", onResize);

    _addListener(_win, "resize", onResize);

    if (scrollFuncY.smooth) {
      scrollFuncY.target.style.scrollBehavior = "auto";
      scrollFuncY.smooth = scrollFuncX.smooth = false;
    }

    inputObserver.enable();
  };

  vars.onDisable = function () {
    _allowNativePanning(target, true);

    _removeListener(_win, "resize", onResize);

    ScrollTrigger.removeEventListener("refresh", onResize);
    inputObserver.kill();
  };

  vars.lockAxis = vars.lockAxis !== false;
  self = new _Observer_js__WEBPACK_IMPORTED_MODULE_0__.Observer(vars);
  self.iOS = _fixIOSBug; // used in the Observer getCachedScroll() function to work around an iOS bug that wreaks havoc with TouchEvent.clientY if we allow scroll to go all the way back to 0.

  _fixIOSBug && !scrollFuncY() && scrollFuncY(1); // iOS bug causes event.clientY values to freak out (wildly inaccurate) if the scroll position is exactly 0.

  _fixIOSBug && gsap.ticker.add(_passThrough); // prevent the ticker from sleeping

  onStopDelayedCall = self._dc;
  tween = gsap.to(self, {
    ease: "power4",
    paused: true,
    scrollX: normalizeScrollX ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: _interruptionTracker(scrollFuncY, scrollFuncY(), function () {
        return tween.pause();
      })
    },
    onUpdate: _updateAll,
    onComplete: onStopDelayedCall.vars.onComplete
  }); // we need the modifier to sense if the scroll position is altered outside of the momentum tween (like with a scrollTo tween) so we can pause() it to prevent conflicts.

  return self;
};

ScrollTrigger.sort = function (func) {
  return _triggers.sort(func || function (a, b) {
    return (a.vars.refreshPriority || 0) * -1e6 + a.start - (b.start + (b.vars.refreshPriority || 0) * -1e6);
  });
};

ScrollTrigger.observe = function (vars) {
  return new _Observer_js__WEBPACK_IMPORTED_MODULE_0__.Observer(vars);
};

ScrollTrigger.normalizeScroll = function (vars) {
  if (typeof vars === "undefined") {
    return _normalizer;
  }

  if (vars === true && _normalizer) {
    return _normalizer.enable();
  }

  if (vars === false) {
    return _normalizer && _normalizer.kill();
  }

  var normalizer = vars instanceof _Observer_js__WEBPACK_IMPORTED_MODULE_0__.Observer ? vars : _getScrollNormalizer(vars);
  _normalizer && _normalizer.target === normalizer.target && _normalizer.kill();
  _isViewport(normalizer.target) && (_normalizer = normalizer);
  return normalizer;
};

ScrollTrigger.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: _Observer_js__WEBPACK_IMPORTED_MODULE_0__._getVelocityProp,
  _inputObserver: _inputObserver,
  _scrollers: _Observer_js__WEBPACK_IMPORTED_MODULE_0__._scrollers,
  _proxies: _Observer_js__WEBPACK_IMPORTED_MODULE_0__._proxies,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function ss() {
      _lastScrollTime || _dispatch("scrollStart");
      _lastScrollTime = _getTime();
    },
    // a way to get the _refreshing value in Observer
    ref: function ref() {
      return _refreshing;
    }
  }
};
_getGSAP() && gsap.registerPlugin(ScrollTrigger);


/***/ }),

/***/ "./node_modules/gsap/gsap-core.js":
/*!****************************************!*\
  !*** ./node_modules/gsap/gsap-core.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Animation: () => (/* binding */ Animation),
/* harmony export */   Back: () => (/* binding */ Back),
/* harmony export */   Bounce: () => (/* binding */ Bounce),
/* harmony export */   Circ: () => (/* binding */ Circ),
/* harmony export */   Cubic: () => (/* binding */ Cubic),
/* harmony export */   Elastic: () => (/* binding */ Elastic),
/* harmony export */   Expo: () => (/* binding */ Expo),
/* harmony export */   GSCache: () => (/* binding */ GSCache),
/* harmony export */   Linear: () => (/* binding */ Linear),
/* harmony export */   Power0: () => (/* binding */ Power0),
/* harmony export */   Power1: () => (/* binding */ Power1),
/* harmony export */   Power2: () => (/* binding */ Power2),
/* harmony export */   Power3: () => (/* binding */ Power3),
/* harmony export */   Power4: () => (/* binding */ Power4),
/* harmony export */   PropTween: () => (/* binding */ PropTween),
/* harmony export */   Quad: () => (/* binding */ Quad),
/* harmony export */   Quart: () => (/* binding */ Quart),
/* harmony export */   Quint: () => (/* binding */ Quint),
/* harmony export */   Sine: () => (/* binding */ Sine),
/* harmony export */   SteppedEase: () => (/* binding */ SteppedEase),
/* harmony export */   Strong: () => (/* binding */ Strong),
/* harmony export */   Timeline: () => (/* binding */ Timeline),
/* harmony export */   TimelineLite: () => (/* binding */ Timeline),
/* harmony export */   TimelineMax: () => (/* binding */ Timeline),
/* harmony export */   Tween: () => (/* binding */ Tween),
/* harmony export */   TweenLite: () => (/* binding */ Tween),
/* harmony export */   TweenMax: () => (/* binding */ Tween),
/* harmony export */   _checkPlugin: () => (/* binding */ _checkPlugin),
/* harmony export */   _colorExp: () => (/* binding */ _colorExp),
/* harmony export */   _colorStringFilter: () => (/* binding */ _colorStringFilter),
/* harmony export */   _config: () => (/* binding */ _config),
/* harmony export */   _forEachName: () => (/* binding */ _forEachName),
/* harmony export */   _getCache: () => (/* binding */ _getCache),
/* harmony export */   _getProperty: () => (/* binding */ _getProperty),
/* harmony export */   _getSetter: () => (/* binding */ _getSetter),
/* harmony export */   _isString: () => (/* binding */ _isString),
/* harmony export */   _isUndefined: () => (/* binding */ _isUndefined),
/* harmony export */   _missingPlugin: () => (/* binding */ _missingPlugin),
/* harmony export */   _numExp: () => (/* binding */ _numExp),
/* harmony export */   _numWithUnitExp: () => (/* binding */ _numWithUnitExp),
/* harmony export */   _parseRelative: () => (/* binding */ _parseRelative),
/* harmony export */   _plugins: () => (/* binding */ _plugins),
/* harmony export */   _relExp: () => (/* binding */ _relExp),
/* harmony export */   _removeLinkedListItem: () => (/* binding */ _removeLinkedListItem),
/* harmony export */   _renderComplexString: () => (/* binding */ _renderComplexString),
/* harmony export */   _replaceRandom: () => (/* binding */ _replaceRandom),
/* harmony export */   _round: () => (/* binding */ _round),
/* harmony export */   _roundModifier: () => (/* binding */ _roundModifier),
/* harmony export */   _setDefaults: () => (/* binding */ _setDefaults),
/* harmony export */   _sortPropTweensByPriority: () => (/* binding */ _sortPropTweensByPriority),
/* harmony export */   _ticker: () => (/* binding */ _ticker),
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   "default": () => (/* binding */ gsap),
/* harmony export */   distribute: () => (/* binding */ distribute),
/* harmony export */   getUnit: () => (/* binding */ getUnit),
/* harmony export */   gsap: () => (/* binding */ gsap),
/* harmony export */   interpolate: () => (/* binding */ interpolate),
/* harmony export */   mapRange: () => (/* binding */ mapRange),
/* harmony export */   normalize: () => (/* binding */ normalize),
/* harmony export */   pipe: () => (/* binding */ pipe),
/* harmony export */   random: () => (/* binding */ random),
/* harmony export */   selector: () => (/* binding */ selector),
/* harmony export */   shuffle: () => (/* binding */ shuffle),
/* harmony export */   snap: () => (/* binding */ snap),
/* harmony export */   splitColor: () => (/* binding */ splitColor),
/* harmony export */   toArray: () => (/* binding */ toArray),
/* harmony export */   unitize: () => (/* binding */ unitize),
/* harmony export */   wrap: () => (/* binding */ wrap),
/* harmony export */   wrapYoyo: () => (/* binding */ wrapYoyo)
/* harmony export */ });
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/*!
 * GSAP 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
},
    _defaults = {
  duration: .5,
  overwrite: false,
  delay: 0
},
    _suppressOverwrites,
    _reverting,
    _context,
    _bigNum = 1e8,
    _tinyNum = 1 / _bigNum,
    _2PI = Math.PI * 2,
    _HALF_PI = _2PI / 4,
    _gsID = 0,
    _sqrt = Math.sqrt,
    _cos = Math.cos,
    _sin = Math.sin,
    _isString = function _isString(value) {
  return typeof value === "string";
},
    _isFunction = function _isFunction(value) {
  return typeof value === "function";
},
    _isNumber = function _isNumber(value) {
  return typeof value === "number";
},
    _isUndefined = function _isUndefined(value) {
  return typeof value === "undefined";
},
    _isObject = function _isObject(value) {
  return typeof value === "object";
},
    _isNotFalse = function _isNotFalse(value) {
  return value !== false;
},
    _windowExists = function _windowExists() {
  return typeof window !== "undefined";
},
    _isFuncOrString = function _isFuncOrString(value) {
  return _isFunction(value) || _isString(value);
},
    _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
    // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
_isArray = Array.isArray,
    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
    //only numbers (including negatives and decimals) but NOT relative values.
_numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
_numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
_relExp = /[+-]=-?[.\d]+/,
    _delimitedValueExp = /[^,'"\[\]\s]+/gi,
    // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
_unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    _globalTimeline,
    _win,
    _coreInitted,
    _doc,
    _globals = {},
    _installScope = {},
    _coreReady,
    _install = function _install(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap;
},
    _missingPlugin = function _missingPlugin(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
},
    _warn = function _warn(message, suppress) {
  return !suppress && console.warn(message);
},
    _addGlobal = function _addGlobal(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
},
    _emptyFunc = function _emptyFunc() {
  return 0;
},
    _startAtRevertConfig = {
  suppressEvents: true,
  isStart: true,
  kill: false
},
    _revertConfigNoKill = {
  suppressEvents: true,
  kill: false
},
    _revertConfig = {
  suppressEvents: true
},
    _reservedProps = {},
    _lazyTweens = [],
    _lazyLookup = {},
    _lastRenderedFrame,
    _plugins = {},
    _effects = {},
    _nextGCFrame = 30,
    _harnessPlugins = [],
    _callbackNames = "",
    _harness = function _harness(targets) {
  var target = targets[0],
      harnessPlugin,
      i;
  _isObject(target) || _isFunction(target) || (targets = [targets]);

  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
    i = _harnessPlugins.length;

    while (i-- && !_harnessPlugins[i].targetTest(target)) {}

    harnessPlugin = _harnessPlugins[i];
  }

  i = targets.length;

  while (i--) {
    targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
  }

  return targets;
},
    _getCache = function _getCache(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
},
    _getProperty = function _getProperty(target, property, v) {
  return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
},
    _forEachName = function _forEachName(names, func) {
  return (names = names.split(",")).forEach(func) || names;
},
    //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
_round = function _round(value) {
  return Math.round(value * 100000) / 100000 || 0;
},
    _roundPrecise = function _roundPrecise(value) {
  return Math.round(value * 10000000) / 10000000 || 0;
},
    // increased precision mostly for timing values.
_parseRelative = function _parseRelative(start, value) {
  var operator = value.charAt(0),
      end = parseFloat(value.substr(2));
  start = parseFloat(start);
  return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
},
    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
  //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
  var l = toFind.length,
      i = 0;

  for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}

  return i < l;
},
    _lazyRender = function _lazyRender() {
  var l = _lazyTweens.length,
      a = _lazyTweens.slice(0),
      i,
      tween;

  _lazyLookup = {};
  _lazyTweens.length = 0;

  for (i = 0; i < l; i++) {
    tween = a[i];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
},
    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
  _lazyTweens.length && !_reverting && _lazyRender();
  animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
  _lazyTweens.length && !_reverting && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
},
    _numericIfPossible = function _numericIfPossible(value) {
  var n = parseFloat(value);
  return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
},
    _passThrough = function _passThrough(p) {
  return p;
},
    _setDefaults = function _setDefaults(obj, defaults) {
  for (var p in defaults) {
    p in obj || (obj[p] = defaults[p]);
  }

  return obj;
},
    _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
  return function (obj, defaults) {
    for (var p in defaults) {
      p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
    }
  };
},
    _merge = function _merge(base, toMerge) {
  for (var p in toMerge) {
    base[p] = toMerge[p];
  }

  return base;
},
    _mergeDeep = function _mergeDeep(base, toMerge) {
  for (var p in toMerge) {
    p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
  }

  return base;
},
    _copyExcluding = function _copyExcluding(obj, excluding) {
  var copy = {},
      p;

  for (p in obj) {
    p in excluding || (copy[p] = obj[p]);
  }

  return copy;
},
    _inheritDefaults = function _inheritDefaults(vars) {
  var parent = vars.parent || _globalTimeline,
      func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;

  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }

  return vars;
},
    _arraysMatch = function _arraysMatch(a1, a2) {
  var i = a1.length,
      match = i === a2.length;

  while (match && i-- && a1[i] === a2[i]) {}

  return i < 0;
},
    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = parent[lastProp],
      t;

  if (sortBy) {
    t = child[sortBy];

    while (prev && prev[sortBy] > t) {
      prev = prev._prev;
    }
  }

  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }

  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }

  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
},
    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }

  if (lastProp === void 0) {
    lastProp = "_last";
  }

  var prev = child._prev,
      next = child._next;

  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }

  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }

  child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
},
    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
  child._act = 0;
},
    _uncache = function _uncache(animation, child) {
  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
    // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
    var a = animation;

    while (a) {
      a._dirty = 1;
      a = a.parent;
    }
  }

  return animation;
},
    _recacheAncestors = function _recacheAncestors(animation) {
  var parent = animation.parent;

  while (parent && parent.parent) {
    //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }

  return animation;
},
    _rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
  return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
},
    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
},
    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
},
    // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
_animationCycle = function _animationCycle(tTime, cycleDuration) {
  var whole = Math.floor(tTime /= cycleDuration);
  return tTime && whole === tTime ? whole - 1 : whole;
},
    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
},
    _setEnd = function _setEnd(animation) {
  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
},
    _alignPlayhead = function _alignPlayhead(animation, totalTime) {
  // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
  var parent = animation._dp;

  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));

    _setEnd(animation);

    parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
  }

  return animation;
},

/*
_totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	let cycleDuration = duration + repeatDelay,
		time = _round(clampedTotalTime % cycleDuration);
	if (time > duration) {
		time = duration;
	}
	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
},
*/
_postAddChecks = function _postAddChecks(timeline, child) {
  var t;

  if (child._time || child._initted && !child._dur) {
    //in case, for example, the _start is moved on a tween that has already rendered. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning.
    t = _parentToChildTotalTime(timeline.rawTime(), child);

    if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
      child.render(t, true);
    }
  } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.


  if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
    //in case any of the ancestors had completed but should now be enabled...
    if (timeline._dur < timeline.duration()) {
      t = timeline;

      while (t._dp) {
        t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

        t = t._dp;
      }
    }

    timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
  }
},
    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));

  _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);

  _isFromOrFromStart(child) || (timeline._recent = child);
  skipChecks || _postAddChecks(timeline, child);
  timeline._ts < 0 && _alignPlayhead(timeline, timeline._tTime); // if the timeline is reversed and the new child makes it longer, we may need to adjust the parent's _start (push it back)

  return timeline;
},
    _scrollTrigger = function _scrollTrigger(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
},
    _attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
  _initTween(tween, time, tTime);

  if (!tween._initted) {
    return 1;
  }

  if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);

    tween._lazy = [tTime, suppressEvents];
    return 1;
  }
},
    _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
  var parent = _ref.parent;
  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
},
    // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
_isFromOrFromStart = function _isFromOrFromStart(_ref2) {
  var data = _ref2.data;
  return data === "isFromStart" || data === "isStart";
},
    _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio,
      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
  repeatDelay = tween._rDelay,
      tTime = 0,
      pt,
      iteration,
      prevIteration;

  if (repeatDelay && tween._repeat) {
    // in case there's a zero-duration tween that has a repeat with a repeatDelay
    tTime = _clamp(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);

    if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
      // if iteration changed
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }

  if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
      // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
      return;
    }

    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

    suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    pt = tween._pt;

    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }

    totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
    tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");

    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);

      if (!suppressEvents && !_reverting) {
        _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);

        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
},
    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
  var child;

  if (time > prevTime) {
    child = animation._first;

    while (child && child._start <= time) {
      if (child.data === "isPause" && child._start > prevTime) {
        return child;
      }

      child = child._next;
    }
  } else {
    child = animation._last;

    while (child && child._start >= time) {
      if (child.data === "isPause" && child._start < prevTime) {
        return child;
      }

      child = child._prev;
    }
  }
},
    _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat,
      dur = _roundPrecise(duration) || 0,
      totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
  animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
},
    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
},
    _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc,
  totalDuration: _emptyFunc
},
    _parsePosition = function _parsePosition(animation, position, percentAnimation) {
  var labels = animation.labels,
      recent = animation._recent || _zeroPosition,
      clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
  i,
      offset,
      isPercent;

  if (_isString(position) && (isNaN(position) || position in labels)) {
    //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
    offset = position.charAt(0);
    isPercent = position.substr(-1) === "%";
    i = position.indexOf("=");

    if (offset === "<" || offset === ">") {
      i >= 0 && (position = position.replace(/=/, ""));
      return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
    }

    if (i < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }

    offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));

    if (isPercent && percentAnimation) {
      offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
    }

    return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
  }

  return position == null ? clippedDuration : +position;
},
    _createTweenType = function _createTweenType(type, params, timeline) {
  var isLegacy = _isNumber(params[1]),
      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
      vars = params[varsIndex],
      irVars,
      parent;

  isLegacy && (vars.duration = params[1]);
  vars.parent = timeline;

  if (type) {
    irVars = vars;
    parent = timeline;

    while (parent && !("immediateRender" in irVars)) {
      // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }

    vars.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
  }

  return new Tween(params[0], vars, params[varsIndex + 1]);
},
    _conditionalReturn = function _conditionalReturn(value, func) {
  return value || value === 0 ? func(value) : func;
},
    _clamp = function _clamp(min, max, value) {
  return value < min ? min : value > max ? max : value;
},
    getUnit = function getUnit(value, v) {
  return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
},
    // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
clamp = function clamp(min, max, value) {
  return _conditionalReturn(value, function (v) {
    return _clamp(min, max, v);
  });
},
    _slice = [].slice,
    _isArrayLike = function _isArrayLike(value, nonEmpty) {
  return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
},
    _flatten = function _flatten(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }

  return ar.forEach(function (value) {
    var _accumulator;

    return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
},
    //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
toArray = function toArray(value, scope, leaveStrings) {
  return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
},
    selector = function selector(value) {
  value = toArray(value)[0] || _warn("Invalid scope") || {};
  return function (v) {
    var el = value.current || value.nativeElement || value;
    return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
  };
},
    shuffle = function shuffle(a) {
  return a.sort(function () {
    return .5 - Math.random();
  });
},
    // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = Math.floor(Math.random() * i), v = a[--i], a[i] = a[j], a[j] = v); return a;
//for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
distribute = function distribute(v) {
  if (_isFunction(v)) {
    return v;
  }

  var vars = _isObject(v) ? v : {
    each: v
  },
      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
  ease = _parseEase(vars.ease),
      from = vars.from || 0,
      base = parseFloat(vars.base) || 0,
      cache = {},
      isDecimal = from > 0 && from < 1,
      ratios = isNaN(from) || isDecimal,
      axis = vars.axis,
      ratioX = from,
      ratioY = from;

  if (_isString(from)) {
    ratioX = ratioY = {
      center: .5,
      edges: .5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }

  return function (i, target, a) {
    var l = (a || vars).length,
        distances = cache[l],
        originX,
        originY,
        x,
        y,
        d,
        j,
        max,
        min,
        wrapAt;

    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];

      if (!wrapAt) {
        max = -_bigNum;

        while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}

        wrapAt--;
      }

      distances = cache[l] = [];
      originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
      originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum;

      for (j = 0; j < l; j++) {
        x = j % wrapAt - originX;
        y = originY - (j / wrapAt | 0);
        distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
        d > max && (max = d);
        d < min && (min = d);
      }

      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l < 0 ? base - l : base;
      distances.u = getUnit(vars.amount || vars.each) || 0; //unit

      ease = ease && l < 0 ? _invertEase(ease) : ease;
    }

    l = (distances[i] - distances.min) / distances.max || 0;
    return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
  };
},
    _roundModifier = function _roundModifier(v) {
  //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
  var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

  return function (raw) {
    var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);

    return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
  };
},
    snap = function snap(snapTo, value) {
  var isArray = _isArray(snapTo),
      radius,
      is2D;

  if (!isArray && _isObject(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum;

    if (snapTo.values) {
      snapTo = toArray(snapTo.values);

      if (is2D = !_isNumber(snapTo[0])) {
        radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }

  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function (raw) {
    var x = parseFloat(is2D ? raw.x : raw),
        y = parseFloat(is2D ? raw.y : 0),
        min = _bigNum,
        closest = 0,
        i = snapTo.length,
        dx,
        dy;

    while (i--) {
      if (is2D) {
        dx = snapTo[i].x - x;
        dy = snapTo[i].y - y;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i] - x);
      }

      if (dx < min) {
        min = dx;
        closest = i;
      }
    }

    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
  });
},
    random = function random(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
},
    pipe = function pipe() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }

  return function (value) {
    return functions.reduce(function (v, f) {
      return f(v);
    }, value);
  };
},
    unitize = function unitize(func, unit) {
  return function (value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
},
    normalize = function normalize(min, max, value) {
  return mapRange(min, max, 0, 1, value);
},
    _wrapArray = function _wrapArray(a, wrapper, value) {
  return _conditionalReturn(value, function (index) {
    return a[~~wrapper(index)];
  });
},
    wrap = function wrap(min, max, value) {
  // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
    return (range + (value - min) % range) % range + min;
  });
},
    wrapYoyo = function wrapYoyo(min, max, value) {
  var range = max - min,
      total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
    value = (total + (value - min) % total) % total || 0;
    return min + (value > range ? total - value : value);
  });
},
    _replaceRandom = function _replaceRandom(value) {
  //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
  var prev = 0,
      s = "",
      i,
      nums,
      end,
      isArray;

  while (~(i = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i);
    isArray = value.charAt(i + 7) === "[";
    nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
    s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }

  return s + value.substr(prev, value.length - prev);
},
    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin,
      outRange = outMax - outMin;
  return _conditionalReturn(value, function (value) {
    return outMin + ((value - inMin) / inRange * outRange || 0);
  });
},
    interpolate = function interpolate(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function (p) {
    return (1 - p) * start + p * end;
  };

  if (!func) {
    var isString = _isString(start),
        master = {},
        p,
        i,
        interpolators,
        l,
        il;

    progress === true && (mutate = 1) && (progress = null);

    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l = start.length;
      il = l - 2;

      for (i = 1; i < l; i++) {
        interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
      }

      l--;

      func = function func(p) {
        p *= l;
        var i = Math.min(il, ~~p);
        return interpolators[i](p - i);
      };

      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }

    if (!interpolators) {
      for (p in end) {
        _addPropTween.call(master, start, p, "get", end[p]);
      }

      func = function func(p) {
        return _renderPropTweens(p, master) || (isString ? start.p : start);
      };
    }
  }

  return _conditionalReturn(progress, func);
},
    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
  //used for nextLabel() and previousLabel()
  var labels = timeline.labels,
      min = _bigNum,
      p,
      distance,
      label;

  for (p in labels) {
    distance = labels[p] - fromTime;

    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p;
      min = distance;
    }
  }

  return label;
},
    _callback = function _callback(animation, type, executeLazyFirst) {
  var v = animation.vars,
      callback = v[type],
      prevContext = _context,
      context = animation._ctx,
      params,
      scope,
      result;

  if (!callback) {
    return;
  }

  params = v[type + "Params"];
  scope = v.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

  context && (_context = context);
  result = params ? callback.apply(scope, params) : callback.call(scope);
  _context = prevContext;
  return result;
},
    _interrupt = function _interrupt(animation) {
  _removeFromParent(animation);

  animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
  animation.progress() < 1 && _callback(animation, "onInterrupt");
  return animation;
},
    _quickTween,
    _registerPluginQueue = [],
    _createPlugin = function _createPlugin(config) {
  if (!_windowExists()) {
    _registerPluginQueue.push(config);

    return;
  }

  config = !config.name && config["default"] || config; //UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

  var name = config.name,
      isFunc = _isFunction(config),
      Plugin = name && !isFunc && config.init ? function () {
    this._props = [];
  } : config,
      //in case someone passes in an object that's not a plugin, like CustomEase
  instanceDefaults = {
    init: _emptyFunc,
    render: _renderPropTweens,
    add: _addPropTween,
    kill: _killPropTweensOf,
    modifier: _addPluginModifier,
    rawVars: 0
  },
      statics = {
    targetTest: 0,
    get: 0,
    getSetter: _getSetter,
    aliases: {},
    register: 0
  };

  _wake();

  if (config !== Plugin) {
    if (_plugins[name]) {
      return;
    }

    _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics)); //static methods


    _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods


    _plugins[Plugin.prop = name] = Plugin;

    if (config.targetTest) {
      _harnessPlugins.push(Plugin);

      _reservedProps[name] = 1;
    }

    name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
  }

  _addGlobal(name, Plugin);

  config.register && config.register(gsap, Plugin, PropTween);
},

/*
 * --------------------------------------------------------------------------------------
 * COLORS
 * --------------------------------------------------------------------------------------
 */
_255 = 255,
    _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
},
    // possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
// let ctx = _doc.createElement("canvas").getContext("2d");
// _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
_hue = function _hue(h, m1, m2) {
  h += h < 0 ? 1 : h > 1 ? -1 : 0;
  return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
},
    splitColor = function splitColor(v, toHSL, forceAlpha) {
  var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
      r,
      g,
      b,
      h,
      s,
      l,
      max,
      min,
      d,
      wasHSL;

  if (!a) {
    if (v.substr(-1) === ",") {
      //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
      v = v.substr(0, v.length - 1);
    }

    if (_colorLookup[v]) {
      a = _colorLookup[v];
    } else if (v.charAt(0) === "#") {
      if (v.length < 6) {
        //for shorthand like #9F0 or #9F0F (could have alpha)
        r = v.charAt(1);
        g = v.charAt(2);
        b = v.charAt(3);
        v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
      }

      if (v.length === 9) {
        // hex with alpha, like #fd5e53ff
        a = parseInt(v.substr(1, 6), 16);
        return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
      }

      v = parseInt(v.substr(1), 16);
      a = [v >> 16, v >> 8 & _255, v & _255];
    } else if (v.substr(0, 3) === "hsl") {
      a = wasHSL = v.match(_strictNumExp);

      if (!toHSL) {
        h = +a[0] % 360 / 360;
        s = +a[1] / 100;
        l = +a[2] / 100;
        g = l <= .5 ? l * (s + 1) : l + s - l * s;
        r = l * 2 - g;
        a.length > 3 && (a[3] *= 1); //cast as number

        a[0] = _hue(h + 1 / 3, r, g);
        a[1] = _hue(h, r, g);
        a[2] = _hue(h - 1 / 3, r, g);
      } else if (~v.indexOf("=")) {
        //if relative values are found, just return the raw strings with the relative prefixes in place.
        a = v.match(_numExp);
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
      }
    } else {
      a = v.match(_strictNumExp) || _colorLookup.transparent;
    }

    a = a.map(Number);
  }

  if (toHSL && !wasHSL) {
    r = a[0] / _255;
    g = a[1] / _255;
    b = a[2] / _255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }

    a[0] = ~~(h + .5);
    a[1] = ~~(s * 100 + .5);
    a[2] = ~~(l * 100 + .5);
  }

  forceAlpha && a.length < 4 && (a[3] = 1);
  return a;
},
    _colorOrderData = function _colorOrderData(v) {
  // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
  var values = [],
      c = [],
      i = -1;
  v.split(_colorExp).forEach(function (v) {
    var a = v.match(_numWithUnitExp) || [];
    values.push.apply(values, a);
    c.push(i += a.length + 1);
  });
  values.c = c;
  return values;
},
    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
  var result = "",
      colors = (s + result).match(_colorExp),
      type = toHSL ? "hsla(" : "rgba(",
      i = 0,
      c,
      shell,
      d,
      l;

  if (!colors) {
    return s;
  }

  colors = colors.map(function (color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });

  if (orderMatchData) {
    d = _colorOrderData(s);
    c = orderMatchData.c;

    if (c.join(result) !== d.c.join(result)) {
      shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
      l = shell.length - 1;

      for (; i < l; i++) {
        result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
      }
    }
  }

  if (!shell) {
    shell = s.split(_colorExp);
    l = shell.length - 1;

    for (; i < l; i++) {
      result += shell[i] + colors[i];
    }
  }

  return result + shell[l];
},
    _colorExp = function () {
  var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
  p;

  for (p in _colorLookup) {
    s += "|" + p + "\\b";
  }

  return new RegExp(s + ")", "gi");
}(),
    _hslExp = /hsl[a]?\(/,
    _colorStringFilter = function _colorStringFilter(a) {
  var combined = a.join(" "),
      toHSL;
  _colorExp.lastIndex = 0;

  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a[1] = _formatColors(a[1], toHSL);
    a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

    return true;
  }
},

/*
 * --------------------------------------------------------------------------------------
 * TICKER
 * --------------------------------------------------------------------------------------
 */
_tickerActive,
    _ticker = function () {
  var _getTime = Date.now,
      _lagThreshold = 500,
      _adjustedLag = 33,
      _startTime = _getTime(),
      _lastUpdate = _startTime,
      _gap = 1000 / 240,
      _nextTime = _gap,
      _listeners = [],
      _id,
      _req,
      _raf,
      _self,
      _delta,
      _i,
      _tick = function _tick(v) {
    var elapsed = _getTime() - _lastUpdate,
        manual = v === true,
        overlap,
        dispatch,
        time,
        frame;

    elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;

    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1000;
      _self.time = time = time / 1000;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }

    manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

    if (dispatch) {
      for (_i = 0; _i < _listeners.length; _i++) {
        // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
        _listeners[_i](time, _delta, frame, v);
      }
    }
  };

  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1000 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted && _windowExists()) {
          _win = _coreInitted = window;
          _doc = _win.document || {};
          _globals.gsap = gsap;
          (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);

          _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});

          _raf = _win.requestAnimationFrame;

          _registerPluginQueue.forEach(_createPlugin);
        }

        _id && _self.sleep();

        _req = _raf || function (f) {
          return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
        };

        _tickerActive = 1;

        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || Infinity; // zero should be interpreted as basically unlimited

      _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
    },
    fps: function fps(_fps) {
      _gap = 1000 / (_fps || 240);
      _nextTime = _self.time * 1000 + _gap;
    },
    add: function add(callback, once, prioritize) {
      var func = once ? function (t, d, f, v) {
        callback(t, d, f, v);

        _self.remove(func);
      } : callback;

      _self.remove(callback);

      _listeners[prioritize ? "unshift" : "push"](func);

      _wake();

      return func;
    },
    remove: function remove(callback, i) {
      ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
    },
    _listeners: _listeners
  };
  return _self;
}(),
    _wake = function _wake() {
  return !_tickerActive && _ticker.wake();
},
    //also ensures the core classes are initialized.

/*
* -------------------------------------------------
* EASING
* -------------------------------------------------
*/
_easeMap = {},
    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
    _quotesExp = /["']/g,
    _parseObjectInString = function _parseObjectInString(value) {
  //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
  var obj = {},
      split = value.substr(1, value.length - 3).split(":"),
      key = split[0],
      i = 1,
      l = split.length,
      index,
      val,
      parsedVal;

  for (; i < l; i++) {
    val = split[i];
    index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }

  return obj;
},
    _valueInParentheses = function _valueInParentheses(value) {
  var open = value.indexOf("(") + 1,
      close = value.indexOf(")"),
      nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
},
    _configEaseFromString = function _configEaseFromString(name) {
  //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
  var split = (name + "").split("("),
      ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
},
    _invertEase = function _invertEase(ease) {
  return function (p) {
    return 1 - ease(1 - p);
  };
},
    // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
_propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
  var child = timeline._first,
      ease;

  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }

    child = child._next;
  }
},
    _parseEase = function _parseEase(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
},
    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut(p) {
      return 1 - easeIn(1 - p);
    };
  }

  if (easeInOut === void 0) {
    easeInOut = function easeInOut(p) {
      return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
    };
  }

  var ease = {
    easeIn: easeIn,
    easeOut: easeOut,
    easeInOut: easeInOut
  },
      lowercaseName;

  _forEachName(names, function (name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;

    for (var p in ease) {
      _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
    }
  });

  return ease;
},
    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
  return function (p) {
    return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
  };
},
    _configElastic = function _configElastic(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1,
      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
  p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
      easeOut = function easeOut(p) {
    return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  p2 = _2PI / p2; //precalculate to optimize

  ease.config = function (amplitude, period) {
    return _configElastic(type, amplitude, period);
  };

  return ease;
},
    _configBack = function _configBack(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }

  var easeOut = function easeOut(p) {
    return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
  },
      ease = type === "out" ? easeOut : type === "in" ? function (p) {
    return 1 - easeOut(1 - p);
  } : _easeInOutFromOut(easeOut);

  ease.config = function (overshoot) {
    return _configBack(type, overshoot);
  };

  return ease;
}; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEase = ratio => {
// 	let y = 0.5 + ratio / 2;
// 	return p => (2 * (1 - p) * p * y + p * p);
// },
// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
// _weightedEaseStrong = ratio => {
// 	ratio = .5 + ratio / 2;
// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
// 		b = ratio - o,
// 		c = ratio + o;
// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
// };


_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
  var power = i < 5 ? i + 1 : i;

  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
    return Math.pow(p, power);
  } : function (p) {
    return p;
  }, function (p) {
    return 1 - Math.pow(1 - p, power);
  }, function (p) {
    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
  });
});

_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;

_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());

(function (n, c) {
  var n1 = 1 / c,
      n2 = 2 * n1,
      n3 = 2.5 * n1,
      easeOut = function easeOut(p) {
    return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
  };

  _insertEase("Bounce", function (p) {
    return 1 - easeOut(1 - p);
  }, easeOut);
})(7.5625, 2.75);

_insertEase("Expo", function (p) {
  return p ? Math.pow(2, 10 * (p - 1)) : 0;
});

_insertEase("Circ", function (p) {
  return -(_sqrt(1 - p * p) - 1);
});

_insertEase("Sine", function (p) {
  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
});

_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());

_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }

    var p1 = 1 / steps,
        p2 = steps + (immediateStart ? 0 : 1),
        p3 = immediateStart ? 1 : 0,
        max = 1 - _tinyNum;
    return function (p) {
      return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
    };
  }
};
_defaults.ease = _easeMap["quad.out"];

_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
  return _callbackNames += name + "," + name + "Params,";
});
/*
 * --------------------------------------------------------------------------------------
 * CACHE
 * --------------------------------------------------------------------------------------
 */


var GSCache = function GSCache(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
/*
 * --------------------------------------------------------------------------------------
 * ANIMATION
 * --------------------------------------------------------------------------------------
 */

var Animation = /*#__PURE__*/function () {
  function Animation(vars) {
    this.vars = vars;
    this._delay = +vars.delay || 0;

    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }

    this._ts = 1;

    _setDuration(this, +vars.duration, 1, 1);

    this.data = vars.data;

    if (_context) {
      this._ctx = _context;

      _context.data.push(this);
    }

    _tickerActive || _ticker.wake();
  }

  var _proto = Animation.prototype;

  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }

    return this._delay;
  };

  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };

  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }

    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };

  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();

    if (!arguments.length) {
      return this._tTime;
    }

    var parent = this._dp;

    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);

      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

      while (parent && parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }

        parent = parent.parent;
      }

      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }

    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
      //   this._lock = 1;

      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
      //}

    }

    return this;
  };

  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
  };

  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
  };

  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
  };

  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;

    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  } // potential future addition:
  // isPlayingBackwards() {
  // 	let animation = this,
  // 		orientation = 1; // 1 = forward, -1 = backward
  // 	while (animation) {
  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
  // 		animation = animation.parent;
  // 	}
  // 	return orientation < 0;
  // }
  ;

  _proto.timeScale = function timeScale(value) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
    }

    if (this._rts === value) {
      return this;
    }

    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
    // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
    //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

    this.totalTime(_clamp(-Math.abs(this._delay), this._tDur, tTime), true);

    _setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.


    return _recacheAncestors(this);
  };

  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }

    if (this._ps !== value) {
      this._ps = value;

      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
      } else {
        _wake();

        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
      }
    }

    return this;
  };

  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }

    return this._start;
  };

  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  };

  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp; // _dp = detached parent

    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };

  _proto.revert = function revert(config) {
    if (config === void 0) {
      config = _revertConfig;
    }

    var prevIsReverting = _reverting;
    _reverting = config;

    if (this._initted || this._startAt) {
      this.timeline && this.timeline.revert(config);
      this.totalTime(-0.01, config.suppressEvents);
    }

    this.data !== "nested" && config.kill !== false && this.kill();
    _reverting = prevIsReverting;
    return this;
  };

  _proto.globalTime = function globalTime(rawTime) {
    var animation = this,
        time = arguments.length ? rawTime : animation.rawTime();

    while (animation) {
      time = animation._start + time / (animation._ts || 1);
      animation = animation._dp;
    }

    return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(rawTime) : time; // the _startAt tweens for .fromTo() and .from() that have immediateRender should always be FIRST in the timeline (important for context.revert()). "_sat" stands for _startAtTween, referring to the parent tween that created the _startAt. We must discern if that tween had immediateRender so that we can know whether or not to prioritize it in revert().
  };

  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }

    return this._repeat === -2 ? Infinity : this._repeat;
  };

  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      var time = this._time;
      this._rDelay = value;

      _onUpdateTotalDuration(this);

      return time ? this.time(time) : this;
    }

    return this._rDelay;
  };

  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }

    return this._yoyo;
  };

  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
  };

  _proto.restart = function restart(includeDelay, suppressEvents) {
    return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
  };

  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };

  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };

  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };

  _proto.resume = function resume() {
    return this.paused(false);
  };

  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

      return this;
    }

    return this._rts < 0;
  };

  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };

  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp,
        start = this._start,
        rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };

  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;

    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }

      return this;
    }

    return vars[type];
  };

  _proto.then = function then(onFulfilled) {
    var self = this;
    return new Promise(function (resolve) {
      var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
          _resolve = function _resolve() {
        var _then = self.then;
        self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

        _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
        resolve(f);
        self.then = _then;
      };

      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };

  _proto.kill = function kill() {
    _interrupt(this);
  };

  return Animation;
}();

_setDefaults(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
/*
 * -------------------------------------------------
 * TIMELINE
 * -------------------------------------------------
 */


var Timeline = /*#__PURE__*/function (_Animation) {
  _inheritsLoose(Timeline, _Animation);

  function Timeline(vars, position) {
    var _this;

    if (vars === void 0) {
      vars = {};
    }

    _this = _Animation.call(this, vars) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
    vars.reversed && _this.reverse();
    vars.paused && _this.paused(true);
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }

  var _proto2 = Timeline.prototype;

  _proto2.to = function to(targets, vars, position) {
    _createTweenType(0, arguments, this);

    return this;
  };

  _proto2.from = function from(targets, vars, position) {
    _createTweenType(1, arguments, this);

    return this;
  };

  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    _createTweenType(2, arguments, this);

    return this;
  };

  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition(this, position), 1);
    return this;
  };

  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
  } //ONLY for backward compatibility! Maybe delete?
  ;

  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition(this, position));
    return this;
  };

  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };

  _proto2.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._dirty ? this.totalDuration() : this._tDur,
        dur = this._dur,
        tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
        // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
    crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
        time,
        child,
        next,
        iteration,
        cycleDuration,
        prevPaused,
        pauseTween,
        timeScale,
        prevStart,
        prevIteration,
        yoyo,
        isYoyo;
    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);

    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }

      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;

      if (crossingStart) {
        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://greensock.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005 also, this._tTime - prevIteration * cycleDuration - this._dur <= 0 just checks to make sure it wasn't previously in the "repeatDelay" portion

        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        /*
        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
        */


        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1,
              doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : dur;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

          !suppressEvents && this.parent && _callback(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);

          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
            // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
            return this;
          }

          dur = this._dur; // in case the duration changed in the onRepeat

          tDur = this._tDur;

          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -0.0001;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }

          this._lock = 0;

          if (!this._ts && !prevPaused) {
            return this;
          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.


          _propagateYoyoEase(this, isYoyo);
        }
      }

      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));

        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }

      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
      }

      if (!prevTime && time && !suppressEvents && !iteration) {
        _callback(this, "onStart");

        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }

      if (time >= prevTime && totalTime >= 0) {
        child = this._first;

        while (child) {
          next = child._next;

          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

        while (child) {
          next = child._prev;

          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
              return this.render(totalTime, suppressEvents, force);
            }

            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt)); // if reverting, we should always force renders of initted tweens (but remember that .fromTo() or .from() may have a _startAt but not _initted yet). If, for example, a .fromTo() tween with a stagger (which creates an internal timeline) gets reverted BEFORE some of its child tweens render for the first time, it may not properly trigger them to revert.

            if (time !== this._time || !this._ts && !prevPaused) {
              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

              break;
            }
          }

          child = next;
        }
      }

      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;

        if (this._ts) {
          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

          _setEnd(this);

          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
        // remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
          _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto2.add = function add(child, position) {
    var _this2 = this;

    _isNumber(position) || (position = _parsePosition(this, position, child));

    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function (obj) {
          return _this2.add(obj, position);
        });
        return this;
      }

      if (_isString(child)) {
        return this.addLabel(child, position);
      }

      if (_isFunction(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }

    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
  };

  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }

    if (tweens === void 0) {
      tweens = true;
    }

    if (timelines === void 0) {
      timelines = true;
    }

    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum;
    }

    var a = [],
        child = this._first;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a.push(child);
        } else {
          timelines && a.push(child);
          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
        }
      }

      child = child._next;
    }

    return a;
  };

  _proto2.getById = function getById(id) {
    var animations = this.getChildren(1, 1, 1),
        i = animations.length;

    while (i--) {
      if (animations[i].vars.id === id) {
        return animations[i];
      }
    }
  };

  _proto2.remove = function remove(child) {
    if (_isString(child)) {
      return this.removeLabel(child);
    }

    if (_isFunction(child)) {
      return this.killTweensOf(child);
    }

    _removeLinkedListItem(this, child);

    if (child === this._recent) {
      this._recent = this._last;
    }

    return _uncache(this);
  };

  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }

    this._forcing = 1;

    if (!this._dp && this._ts) {
      //special case for the global timeline (or any other that has no parent or detached parent).
      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }

    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);

    this._forcing = 0;
    return this;
  };

  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition(this, position);
    return this;
  };

  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };

  _proto2.addPause = function addPause(position, callback, params) {
    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
    t.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t, _parsePosition(this, position));
  };

  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition(this, position);

    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }

      child = child._next;
    }
  };

  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive),
        i = tweens.length;

    while (i--) {
      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
    }

    return this;
  };

  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
    var a = [],
        parsedTargets = toArray(targets),
        child = this._first,
        isGlobalTime = _isNumber(onlyActive),
        // a number is interpreted as a global time. If the animation spans
    children;

    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
          a.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a.push.apply(a, children);
      }

      child = child._next;
    }

    return a;
  } // potential future feature - targets() on timelines
  // targets() {
  // 	let result = [];
  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
  // 	return result.filter((v, i) => result.indexOf(v) === i);
  // }
  ;

  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};

    var tl = this,
        endTime = _parsePosition(tl, position),
        _vars = vars,
        startAt = _vars.startAt,
        _onStart = _vars.onStart,
        onStartParams = _vars.onStartParams,
        immediateRender = _vars.immediateRender,
        initted,
        tween = Tween.to(tl, _setDefaults({
      ease: vars.ease || "none",
      lazy: false,
      immediateRender: false,
      time: endTime,
      overwrite: "auto",
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();

        if (!initted) {
          var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          initted = 1;
        }

        _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
      }
    }, vars));

    return immediateRender ? tween.render(0) : tween;
  };

  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults({
      startAt: {
        time: _parsePosition(this, fromPosition)
      }
    }, vars));
  };

  _proto2.recent = function recent() {
    return this._recent;
  };

  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, afterTime));
  };

  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }

    return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
  };

  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };

  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }

    var child = this._first,
        labels = this.labels,
        p;

    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }

      child = child._next;
    }

    if (adjustLabels) {
      for (p in labels) {
        if (labels[p] >= ignoreBeforeTime) {
          labels[p] += amount;
        }
      }
    }

    return _uncache(this);
  };

  _proto2.invalidate = function invalidate(soft) {
    var child = this._first;
    this._lock = 0;

    while (child) {
      child.invalidate(soft);
      child = child._next;
    }

    return _Animation.prototype.invalidate.call(this, soft);
  };

  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }

    var child = this._first,
        next;

    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }

    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };

  _proto2.totalDuration = function totalDuration(value) {
    var max = 0,
        self = this,
        child = self._last,
        prevStart = _bigNum,
        prev,
        start,
        parent;

    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }

    if (self._dirty) {
      parent = self.parent;

      while (child) {
        prev = child._prev; //record it here in case the tween changes position in the sequence...

        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

        start = child._start;

        if (start > prevStart && self._sort && child._ts && !self._lock) {
          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }

        if (start < 0 && child._ts) {
          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
          max -= start;

          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += start / self._ts;
            self._time -= start;
            self._tTime -= start;
          }

          self.shiftChildren(-start, false, -1e999);
          prevStart = 0;
        }

        child._end > max && child._ts && (max = child._end);
        child = prev;
      }

      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);

      self._dirty = 0;
    }

    return self._tDur;
  };

  Timeline.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));

      _lastRenderedFrame = _ticker.frame;
    }

    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
        while (child && !child._ts) {
          child = child._next;
        }

        child || _ticker.sleep();
      }
    }
  };

  return Timeline;
}(Animation);

_setDefaults(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});

var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
  //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
      index = 0,
      matchIndex = 0,
      result,
      startNums,
      color,
      endNum,
      chunk,
      startNum,
      hasRandom,
      a;
  pt.b = start;
  pt.e = end;
  start += ""; //ensure values are strings

  end += "";

  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }

  if (stringFilter) {
    a = [start, end];
    stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

    start = a[0];
    end = a[1];
  }

  startNums = start.match(_complexStringNumExp) || [];

  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);

    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }

    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }

  pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

  pt.fp = funcParam;

  if (_relExp.test(end) || hasRandom) {
    pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
  }

  this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

  return pt;
},
    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
  _isFunction(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop],
      parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
      setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
      pt;

  if (_isString(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }

    if (end.charAt(1) === "=") {
      pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);

      if (pt || pt === 0) {
        // to avoid isNaN, like if someone passes in a value like "!= whatever"
        end = pt;
      }
    }
  }

  if (!optional || parsedStart !== end || _forceAllPropTweens) {
    if (!isNaN(parsedStart * end) && end !== "") {
      // fun fact: any number multiplied by "" is evaluated as the number 0!
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }

    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
},
    //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
_processVars = function _processVars(vars, index, target, targets, tween) {
  _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));

  if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
    return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }

  var copy = {},
      p;

  for (p in vars) {
    copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
  }

  return copy;
},
    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i;

  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);

    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

      i = plugin._props.length;

      while (i--) {
        ptLookup[plugin._props[i]] = pt;
      }
    }
  }

  return plugin;
},
    _overwritingTween,
    //store a reference temporarily so we can avoid overwriting itself.
_forceAllPropTweens,
    _initTween = function _initTween(tween, time, tTime) {
  var vars = tween.vars,
      ease = vars.ease,
      startAt = vars.startAt,
      immediateRender = vars.immediateRender,
      lazy = vars.lazy,
      onUpdate = vars.onUpdate,
      onUpdateParams = vars.onUpdateParams,
      callbackScope = vars.callbackScope,
      runBackwards = vars.runBackwards,
      yoyoEase = vars.yoyoEase,
      keyframes = vars.keyframes,
      autoRevert = vars.autoRevert,
      dur = tween._dur,
      prevStartAt = tween._startAt,
      targets = tween._targets,
      parent = tween.parent,
      fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets,
      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
      tl = tween.timeline,
      cleanVars,
      i,
      p,
      pt,
      target,
      hasPriority,
      gsData,
      harness,
      plugin,
      ptLookup,
      index,
      harnessVars,
      overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;

  if (yoyoEase && tween._yoyo && !tween._repeat) {
    //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }

  tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

  if (!tl || keyframes && !vars.stagger) {
    //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

    cleanVars = _copyExcluding(vars, _reservedProps);

    if (prevStartAt) {
      prevStartAt._zTime < 0 && prevStartAt.progress(1); // in case it's a lazy startAt that hasn't rendered yet.

      time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig); // if it's a "startAt" (not "from()" or runBackwards: true), we only need to do a shallow revert (keep transforms cached in CSSPlugin)
      // don't just _removeFromParent(prevStartAt.render(-1, true)) because that'll leave inline styles. We're creating a new _startAt for "startAt" tweens that re-capture things to ensure that if the pre-tween values changed since the tween was created, they're recorded.

      prevStartAt._lazy = 0;
    }

    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
        data: "isStart",
        overwrite: false,
        parent: parent,
        immediateRender: true,
        lazy: !prevStartAt && _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate,
        onUpdateParams: onUpdateParams,
        callbackScope: callbackScope,
        stagger: 0
      }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);


      tween._startAt._dp = 0; // don't allow it to get put back into root timeline! Like when revert() is called and totalTime() gets set.

      tween._startAt._sat = tween; // used in globalTime(). _sat stands for _startAtTween

      time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

      if (immediateRender) {
        if (dur && time <= 0 && tTime <= 0) {
          // check tTime here because in the case of a yoyo tween whose playhead gets pushed to the end like tween.progress(1), we should allow it through so that the onComplete gets fired properly.
          time && (tween._zTime = time);
          return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
        }
      }
    } else if (runBackwards && dur) {
      //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
      if (!prevStartAt) {
        time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

        p = _setDefaults({
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
          immediateRender: immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y:gsap.utils.wrap([-100,100])})

        }, cleanVars);
        harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

        _removeFromParent(tween._startAt = Tween.set(targets, p));

        tween._startAt._dp = 0; // don't allow it to get put back into root timeline!

        tween._startAt._sat = tween; // used in globalTime()

        time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
        tween._zTime = time;

        if (!immediateRender) {
          _initTween(tween._startAt, _tinyNum, _tinyNum); //ensures that the initial values are recorded

        } else if (!time) {
          return;
        }
      }
    }

    tween._pt = tween._ptCache = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;

    for (i = 0; i < targets.length; i++) {
      target = targets[i];
      gsData = target._gsap || _harness(targets)[i]._gsap;
      tween._ptLookup[i] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

      index = fullTargets === targets ? i : fullTargets.indexOf(target);

      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);

        plugin._props.forEach(function (name) {
          ptLookup[name] = pt;
        });

        plugin.priority && (hasPriority = 1);
      }

      if (!harness || harnessVars) {
        for (p in cleanVars) {
          if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }

      tween._op && tween._op[i] && tween.kill(target, tween._op[i]);

      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;

        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!


        overwritten = !tween.parent;
        _overwritingTween = 0;
      }

      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }

    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
  }

  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.

  keyframes && time <= 0 && tl.render(_bigNum, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
},
    _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
  var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property],
      pt,
      rootPT,
      lookup,
      i;

  if (!ptCache) {
    ptCache = tween._ptCache[property] = [];
    lookup = tween._ptLookup;
    i = tween._targets.length;

    while (i--) {
      pt = lookup[i][property];

      if (pt && pt.d && pt.d._pt) {
        // it's a plugin, so find the nested PropTween
        pt = pt.d._pt;

        while (pt && pt.p !== property && pt.fp !== property) {
          // "fp" is functionParam for things like setting CSS variables which require .setProperty("--var-name", value)
          pt = pt._next;
        }
      }

      if (!pt) {
        // there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
        // if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
        _forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.

        tween.vars[property] = "+=0";

        _initTween(tween, time);

        _forceAllPropTweens = 0;
        return 1;
      }

      ptCache.push(pt);
    }
  }

  i = ptCache.length;

  while (i--) {
    rootPT = ptCache[i];
    pt = rootPT._pt || rootPT; // complex values may have nested PropTweens. We only accommodate the FIRST value.

    pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
    pt.c = value - pt.s;
    rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e)); // mainly for CSSPlugin (end value)

    rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b)); // (beginning value)
  }
},
    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0,
      propertyAliases = harness && harness.aliases,
      copy,
      p,
      i,
      aliases;

  if (!propertyAliases) {
    return vars;
  }

  copy = _merge({}, vars);

  for (p in propertyAliases) {
    if (p in copy) {
      aliases = propertyAliases[p].split(",");
      i = aliases.length;

      while (i--) {
        copy[aliases[i]] = copy[p];
      }
    }
  }

  return copy;
},
    // parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
_parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
  var ease = obj.ease || easeEach || "power1.inOut",
      p,
      a;

  if (_isArray(obj)) {
    a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease

    obj.forEach(function (value, i) {
      return a.push({
        t: i / (obj.length - 1) * 100,
        v: value,
        e: ease
      });
    });
  } else {
    for (p in obj) {
      a = allProps[p] || (allProps[p] = []);
      p === "ease" || a.push({
        t: parseFloat(prop),
        v: obj[p],
        e: ease
      });
    }
  }
},
    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
  return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
},
    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    _staggerPropsToSkip = {};

_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
  return _staggerPropsToSkip[name] = 1;
});
/*
 * --------------------------------------------------------------------------------------
 * TWEEN
 * --------------------------------------------------------------------------------------
 */


var Tween = /*#__PURE__*/function (_Animation2) {
  _inheritsLoose(Tween, _Animation2);

  function Tween(targets, vars, position, skipInherit) {
    var _this3;

    if (typeof vars === "number") {
      position.duration = vars;
      vars = position;
      position = null;
    }

    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
    var _this3$vars = _this3.vars,
        duration = _this3$vars.duration,
        delay = _this3$vars.delay,
        immediateRender = _this3$vars.immediateRender,
        stagger = _this3$vars.stagger,
        overwrite = _this3$vars.overwrite,
        keyframes = _this3$vars.keyframes,
        defaults = _this3$vars.defaults,
        scrollTrigger = _this3$vars.scrollTrigger,
        yoyoEase = _this3$vars.yoyoEase,
        parent = vars.parent || _globalTimeline,
        parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
        tl,
        i,
        copy,
        l,
        p,
        curTarget,
        staggerFunc,
        staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

    _this3._overwrite = overwrite;

    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults || {},
        targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
      }); // we need to store the targets because for staggers and keyframes, we end up creating an individual tween for each but function-based values need to know the index and the whole Array of targets.

      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;

      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        l = parsedTargets.length;
        staggerFunc = stagger && distribute(stagger);

        if (_isObject(stagger)) {
          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
          for (p in stagger) {
            if (~_staggerTweenProps.indexOf(p)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p] = stagger[p];
            }
          }
        }

        for (i = 0; i < l; i++) {
          copy = _copyExcluding(vars, _staggerPropsToSkip);
          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;

          if (!stagger && l === 1 && copy.delay) {
            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }

          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
          tl._ease = _easeMap.none;
        }

        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
      } else if (keyframes) {
        _inheritDefaults(_setDefaults(tl.vars.defaults, {
          ease: "none"
        }));

        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
        var time = 0,
            a,
            kf,
            v;

        if (_isArray(keyframes)) {
          keyframes.forEach(function (frame) {
            return tl.to(parsedTargets, frame, ">");
          });
          tl.duration(); // to ensure tl._dur is cached because we tap into it for performance purposes in the render() method.
        } else {
          copy = {};

          for (p in keyframes) {
            p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
          }

          for (p in copy) {
            a = copy[p].sort(function (a, b) {
              return a.t - b.t;
            });
            time = 0;

            for (i = 0; i < a.length; i++) {
              kf = a[i];
              v = {
                ease: kf.e,
                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
              };
              v[p] = kf.v;
              tl.to(parsedTargets, v, time);
              time += v.duration;
            }
          }

          tl.duration() < duration && tl.to({}, {
            duration: duration - tl.duration()
          }); // in case keyframes didn't go to 100%
        }
      }

      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
    }

    if (overwrite === true && !_suppressOverwrites) {
      _overwritingTween = _assertThisInitialized(_this3);

      _globalTimeline.killTweensOf(parsedTargets);

      _overwritingTween = 0;
    }

    _addToTimeline(parent, _assertThisInitialized(_this3), position);

    vars.reversed && _this3.reverse();
    vars.paused && _this3.paused(true);

    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

      _this3.render(Math.max(0, -delay) || 0); //in case delay is negative

    }

    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }

  var _proto3 = Tween.prototype;

  _proto3.render = function render(totalTime, suppressEvents, force) {
    var prevTime = this._time,
        tDur = this._tDur,
        dur = this._dur,
        isNegative = totalTime < 0,
        tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        time,
        pt,
        iteration,
        cycleDuration,
        prevIteration,
        isYoyo,
        ratio,
        timeline,
        yoyoEase;

    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
      //this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
      time = tTime;
      timeline = this.timeline;

      if (this._repeat) {
        //adjust the time for repeats and yoyos
        cycleDuration = dur + this._rDelay;

        if (this._repeat < -1 && isNegative) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }

        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

        if (tTime === tDur) {
          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
          iteration = this._repeat;
          time = dur;
        } else {
          iteration = ~~(tTime / cycleDuration);

          if (iteration && iteration === tTime / cycleDuration) {
            time = dur;
            iteration--;
          }

          time > dur && (time = dur);
        }

        isYoyo = this._yoyo && iteration & 1;

        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }

        prevIteration = _animationCycle(this._tTime, cycleDuration);

        if (time === prevTime && !force && this._initted) {
          //could be during the repeatDelay part. No need to render and fire callbacks.
          this._tTime = tTime;
          return this;
        }

        if (iteration !== prevIteration) {
          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

          if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }

      if (!this._initted) {
        if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

          return this;
        }

        if (prevTime !== this._time) {
          // rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values.
          return this;
        }

        if (dur !== this._dur) {
          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
          return this.render(totalTime, suppressEvents, force);
        }
      }

      this._tTime = tTime;
      this._time = time;

      if (!this._act && this._ts) {
        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

        this._lazy = 0;
      }

      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);

      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }

      if (time && !prevTime && !suppressEvents && !iteration) {
        _callback(this, "onStart");

        if (this._tTime !== tTime) {
          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
          return this;
        }
      }

      pt = this._pt;

      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }

      timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);

      if (this._onUpdate && !suppressEvents) {
        isNegative && _rewindStartAt(this, totalTime, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

        _callback(this, "onUpdate");
      }

      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");

      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

        if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
          _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);

          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }

    return this;
  };

  _proto3.targets = function targets() {
    return this._targets;
  };

  _proto3.invalidate = function invalidate(soft) {
    // "soft" gives us a way to clear out everything EXCEPT the recorded pre-"from" portion of from() tweens. Otherwise, for example, if you tween.progress(1).render(0, true true).invalidate(), the "from" values would persist and then on the next render, the from() tweens would initialize and the current value would match the "from" values, thus animate from the same value to the same value (no animation). We tap into this in ScrollTrigger's refresh() where we must push a tween to completion and then back again but honor its init state in case the tween is dependent on another tween further up on the page.
    (!soft || !this.vars.runBackwards) && (this._startAt = 0);
    this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate(soft);
    return _Animation2.prototype.invalidate.call(this, soft);
  };

  _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
    _tickerActive || _ticker.wake();
    this._ts || this.play();
    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
        ratio;
    this._initted || _initTween(this, time);
    ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
    // possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
    // if (_isObject(property)) { // performance optimization
    // 	for (p in property) {
    // 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
    // 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
    // 		}
    // 	}
    // } else {

    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) {
      return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
    } //}


    _alignPlayhead(this, 0);

    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
    return this.render(0);
  };

  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }

    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      return this.parent ? _interrupt(this) : this;
    }

    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

      return this;
    }

    var parsedTargets = this._targets,
        killingTargets = targets ? toArray(targets) : parsedTargets,
        propTweenLookup = this._ptLookup,
        firstPT = this._pt,
        overwrittenProps,
        curLookup,
        curOverwriteProps,
        props,
        p,
        pt,
        i;

    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }

    overwrittenProps = this._op = this._op || [];

    if (vars !== "all") {
      //so people can pass in a comma-delimited list of property names
      if (_isString(vars)) {
        p = {};

        _forEachName(vars, function (name) {
          return p[name] = 1;
        });

        vars = p;
      }

      vars = _addAliasesToVars(parsedTargets, vars);
    }

    i = parsedTargets.length;

    while (i--) {
      if (~killingTargets.indexOf(parsedTargets[i])) {
        curLookup = propTweenLookup[i];

        if (vars === "all") {
          overwrittenProps[i] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
          props = vars;
        }

        for (p in props) {
          pt = curLookup && curLookup[p];

          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }

            delete curLookup[p];
          }

          if (curOverwriteProps !== "all") {
            curOverwriteProps[p] = 1;
          }
        }
      }
    }

    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

    return this;
  };

  Tween.to = function to(targets, vars) {
    return new Tween(targets, vars, arguments[2]);
  };

  Tween.from = function from(targets, vars) {
    return _createTweenType(1, arguments);
  };

  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay: delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    }); // we must use onReverseComplete too for things like timeline.add(() => {...}) which should be triggered in BOTH directions (forward and reverse)
  };

  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
    return _createTweenType(2, arguments);
  };

  Tween.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween(targets, vars);
  };

  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };

  return Tween;
}(Animation);

_setDefaults(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
// 	Tween.prototype[name] = function() {
// 		let tl = new Timeline();
// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
// 	}
// });
//for backward compatibility. Leverage the timeline calls.


_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
  Tween[name] = function () {
    var tl = new Timeline(),
        params = _slice.call(arguments, 0);

    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
/*
 * --------------------------------------------------------------------------------------
 * PROPTWEEN
 * --------------------------------------------------------------------------------------
 */


var _setterPlain = function _setterPlain(target, property, value) {
  return target[property] = value;
},
    _setterFunc = function _setterFunc(target, property, value) {
  return target[property](value);
},
    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
  return target[property](data.fp, value);
},
    _setterAttribute = function _setterAttribute(target, property, value) {
  return target.setAttribute(property, value);
},
    _getSetter = function _getSetter(target, property) {
  return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
},
    _renderPlain = function _renderPlain(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
},
    _renderBoolean = function _renderBoolean(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
},
    _renderComplexString = function _renderComplexString(ratio, data) {
  var pt = data._pt,
      s = "";

  if (!ratio && data.b) {
    //b = beginning string
    s = data.b;
  } else if (ratio === 1 && data.e) {
    //e = ending string
    s = data.e;
  } else {
    while (pt) {
      s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

      pt = pt._next;
    }

    s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
  }

  data.set(data.t, data.p, s, data);
},
    _renderPropTweens = function _renderPropTweens(ratio, data) {
  var pt = data._pt;

  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
},
    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
  var pt = this._pt,
      next;

  while (pt) {
    next = pt._next;
    pt.p === property && pt.modifier(modifier, tween, target);
    pt = next;
  }
},
    _killPropTweensOf = function _killPropTweensOf(property) {
  var pt = this._pt,
      hasNonDependentRemaining,
      next;

  while (pt) {
    next = pt._next;

    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }

    pt = next;
  }

  return !hasNonDependentRemaining;
},
    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
},
    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
  var pt = parent._pt,
      next,
      pt2,
      first,
      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

  while (pt) {
    next = pt._next;
    pt2 = first;

    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }

    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }

    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }

    pt = next;
  }

  parent._pt = first;
}; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)


var PropTween = /*#__PURE__*/function () {
  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;

    if (next) {
      next._prev = this;
    }
  }

  var _proto4 = PropTween.prototype;

  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target; //modifier target

    this.tween = tween;
  };

  return PropTween;
}(); //Initialization tasks

_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
  return _reservedProps[name] = 1;
});

_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;

var _media = [],
    _listeners = {},
    _emptyArray = [],
    _lastMediaTime = 0,
    _dispatch = function _dispatch(type) {
  return (_listeners[type] || _emptyArray).map(function (f) {
    return f();
  });
},
    _onMediaChange = function _onMediaChange() {
  var time = Date.now(),
      matches = [];

  if (time - _lastMediaTime > 2) {
    _dispatch("matchMediaInit");

    _media.forEach(function (c) {
      var queries = c.queries,
          conditions = c.conditions,
          match,
          p,
          anyMatch,
          toggled;

      for (p in queries) {
        match = _win.matchMedia(queries[p]).matches; // Firefox doesn't update the "matches" property of the MediaQueryList object correctly - it only does so as it calls its change handler - so we must re-create a media query here to ensure it's accurate.

        match && (anyMatch = 1);

        if (match !== conditions[p]) {
          conditions[p] = match;
          toggled = 1;
        }
      }

      if (toggled) {
        c.revert();
        anyMatch && matches.push(c);
      }
    });

    _dispatch("matchMediaRevert");

    matches.forEach(function (c) {
      return c.onMatch(c);
    });
    _lastMediaTime = time;

    _dispatch("matchMedia");
  }
};

var Context = /*#__PURE__*/function () {
  function Context(func, scope) {
    this.selector = scope && selector(scope);
    this.data = [];
    this._r = []; // returned/cleanup functions

    this.isReverted = false;
    func && this.add(func);
  }

  var _proto5 = Context.prototype;

  _proto5.add = function add(name, func, scope) {
    // possible future addition if we need the ability to add() an animation to a context and for whatever reason cannot create that animation inside of a context.add(() => {...}) function.
    // if (name && _isFunction(name.revert)) {
    // 	this.data.push(name);
    // 	return (name._ctx = this);
    // }
    if (_isFunction(name)) {
      scope = func;
      func = name;
      name = _isFunction;
    }

    var self = this,
        f = function f() {
      var prev = _context,
          prevSelector = self.selector,
          result;
      prev && prev !== self && prev.data.push(self);
      scope && (self.selector = selector(scope));
      _context = self;
      result = func.apply(self, arguments);
      _isFunction(result) && self._r.push(result);
      _context = prev;
      self.selector = prevSelector;
      self.isReverted = false;
      return result;
    };

    self.last = f;
    return name === _isFunction ? f(self) : name ? self[name] = f : f;
  };

  _proto5.ignore = function ignore(func) {
    var prev = _context;
    _context = null;
    func(this);
    _context = prev;
  };

  _proto5.getTweens = function getTweens() {
    var a = [];
    this.data.forEach(function (e) {
      return e instanceof Context ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
    });
    return a;
  };

  _proto5.clear = function clear() {
    this._r.length = this.data.length = 0;
  };

  _proto5.kill = function kill(revert, matchMedia) {
    var _this4 = this;

    if (revert) {
      var tweens = this.getTweens();
      this.data.forEach(function (t) {
        // Flip plugin tweens are very different in that they should actually be pushed to their end. The plugin replaces the timeline's .revert() method to do exactly that. But we also need to remove any of those nested tweens inside the flip timeline so that they don't get individually reverted.
        if (t.data === "isFlip") {
          t.revert();
          t.getChildren(true, true, false).forEach(function (tween) {
            return tweens.splice(tweens.indexOf(tween), 1);
          });
        }
      }); // save as an object so that we can cache the globalTime for each tween to optimize performance during the sort

      tweens.map(function (t) {
        return {
          g: t.globalTime(0),
          t: t
        };
      }).sort(function (a, b) {
        return b.g - a.g || -1;
      }).forEach(function (o) {
        return o.t.revert(revert);
      }); // note: all of the _startAt tweens should be reverted in reverse order that they were created, and they'll all have the same globalTime (-1) so the " || -1" in the sort keeps the order properly.

      this.data.forEach(function (e) {
        return !(e instanceof Animation) && e.revert && e.revert(revert);
      });

      this._r.forEach(function (f) {
        return f(revert, _this4);
      });

      this.isReverted = true;
    } else {
      this.data.forEach(function (e) {
        return e.kill && e.kill();
      });
    }

    this.clear();

    if (matchMedia) {
      var i = _media.indexOf(this);

      !!~i && _media.splice(i, 1);
    }
  };

  _proto5.revert = function revert(config) {
    this.kill(config || {});
  };

  return Context;
}();

var MatchMedia = /*#__PURE__*/function () {
  function MatchMedia(scope) {
    this.contexts = [];
    this.scope = scope;
  }

  var _proto6 = MatchMedia.prototype;

  _proto6.add = function add(conditions, func, scope) {
    _isObject(conditions) || (conditions = {
      matches: conditions
    });
    var context = new Context(0, scope || this.scope),
        cond = context.conditions = {},
        mq,
        p,
        active;
    this.contexts.push(context);
    func = context.add("onMatch", func);
    context.queries = conditions;

    for (p in conditions) {
      if (p === "all") {
        active = 1;
      } else {
        mq = _win.matchMedia(conditions[p]);

        if (mq) {
          _media.indexOf(context) < 0 && _media.push(context);
          (cond[p] = mq.matches) && (active = 1);
          mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
        }
      }
    }

    active && func(context);
    return this;
  } // refresh() {
  // 	let time = _lastMediaTime,
  // 		media = _media;
  // 	_lastMediaTime = -1;
  // 	_media = this.contexts;
  // 	_onMediaChange();
  // 	_lastMediaTime = time;
  // 	_media = media;
  // }
  ;

  _proto6.revert = function revert(config) {
    this.kill(config || {});
  };

  _proto6.kill = function kill(revert) {
    this.contexts.forEach(function (c) {
      return c.kill(revert, true);
    });
  };

  return MatchMedia;
}();
/*
 * --------------------------------------------------------------------------------------
 * GSAP
 * --------------------------------------------------------------------------------------
 */


var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args.forEach(function (config) {
      return _createPlugin(config);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

    var getter = _getCache(target || {}).get,
        format = unit ? _passThrough : _numericIfPossible;

    unit === "native" && (unit = "");
    return !target ? target : !property ? function (property, unit, uncache) {
      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);

    if (target.length > 1) {
      var setters = target.map(function (t) {
        return gsap.quickSetter(t, property, unit);
      }),
          l = setters.length;
      return function (value) {
        var i = l;

        while (i--) {
          setters[i](value);
        }
      };
    }

    target = target[0] || {};

    var Plugin = _plugins[property],
        cache = _getCache(target),
        p = cache.harness && (cache.harness.aliases || {})[property] || property,
        // in case it's an alias, like "rotate" for "rotation".
    setter = Plugin ? function (value) {
      var p = new Plugin();
      _quickTween._pt = 0;
      p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p.render(1, p);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p);

    return Plugin ? setter : function (value) {
      return setter(target, p, unit ? value + unit : value, cache, 1);
    };
  },
  quickTo: function quickTo(target, property, vars) {
    var _merge2;

    var tween = gsap.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, _merge2), vars || {})),
        func = function func(value, start, startIsRelative) {
      return tween.resetTo(property, value, start, startIsRelative);
    };

    func.tween = tween;
    return func;
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
    return _mergeDeep(_defaults, value || {});
  },
  config: function config(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref3) {
    var name = _ref3.name,
        effect = _ref3.effect,
        plugins = _ref3.plugins,
        defaults = _ref3.defaults,
        extendTimeline = _ref3.extendTimeline;
    (plugins || "").split(",").forEach(function (pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });

    _effects[name] = function (targets, vars, tl) {
      return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
    };

    if (extendTimeline) {
      Timeline.prototype[name] = function (targets, vars, position) {
        return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }

    var tl = new Timeline(vars),
        child,
        next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);

    _globalTimeline.remove(tl);

    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;

    while (child) {
      next = child._next;

      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }

      child = next;
    }

    _addToTimeline(_globalTimeline, tl, 0);

    return tl;
  },
  context: function context(func, scope) {
    return func ? new Context(func, scope) : _context;
  },
  matchMedia: function matchMedia(scope) {
    return new MatchMedia(scope);
  },
  matchMediaRefresh: function matchMediaRefresh() {
    return _media.forEach(function (c) {
      var cond = c.conditions,
          found,
          p;

      for (p in cond) {
        if (cond[p]) {
          cond[p] = false;
          found = 1;
        }
      }

      found && c.revert();
    }) || _onMediaChange();
  },
  addEventListener: function addEventListener(type, callback) {
    var a = _listeners[type] || (_listeners[type] = []);
    ~a.indexOf(callback) || a.push(callback);
  },
  removeEventListener: function removeEventListener(type, callback) {
    var a = _listeners[type],
        i = a && a.indexOf(callback);
    i >= 0 && a.splice(i, 1);
  },
  utils: {
    wrap: wrap,
    wrapYoyo: wrapYoyo,
    distribute: distribute,
    random: random,
    snap: snap,
    normalize: normalize,
    getUnit: getUnit,
    clamp: clamp,
    splitColor: splitColor,
    toArray: toArray,
    selector: selector,
    mapRange: mapRange,
    pipe: pipe,
    unitize: unitize,
    interpolate: interpolate,
    shuffle: shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween: PropTween,
    globals: _addGlobal,
    Tween: Tween,
    Timeline: Timeline,
    Animation: Animation,
    getCache: _getCache,
    _removeLinkedListItem: _removeLinkedListItem,
    reverting: function reverting() {
      return _reverting;
    },
    context: function context(toAdd) {
      if (toAdd && _context) {
        _context.data.push(toAdd);

        toAdd._ctx = _context;
      }

      return _context;
    },
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites = value;
    }
  }
};

_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
  return _gsap[name] = Tween[name];
});

_ticker.add(Timeline.updateRoot);

_quickTween = _gsap.to({}, {
  duration: 0
}); // ---- EXTRA PLUGINS --------------------------------------------------------

var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
  var pt = plugin._pt;

  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }

  return pt;
},
    _addModifiers = function _addModifiers(tween, modifiers) {
  var targets = tween._targets,
      p,
      i,
      pt;

  for (p in modifiers) {
    i = targets.length;

    while (i--) {
      pt = tween._ptLookup[i][p];

      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          // is a plugin
          pt = _getPluginPropTween(pt, p);
        }

        pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
      }
    }
  }
},
    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
  return {
    name: name,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init(target, vars, tween) {
      tween._onInit = function (tween) {
        var temp, p;

        if (_isString(vars)) {
          temp = {};

          _forEachName(vars, function (name) {
            return temp[name] = 1;
          }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.


          vars = temp;
        }

        if (modifier) {
          temp = {};

          for (p in vars) {
            temp[p] = modifier(vars[p]);
          }

          vars = temp;
        }

        _addModifiers(tween, vars);
      };
    }
  };
}; //register core plugins


var gsap = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p, pt, v;
    this.tween = tween;

    for (p in vars) {
      v = target.getAttribute(p) || "";
      pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
      pt.op = p;
      pt.b = v; // record the beginning value so we can revert()

      this._props.push(p);
    }
  },
  render: function render(ratio, data) {
    var pt = data._pt;

    while (pt) {
      _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d); // if reverting, go back to the original (pt.b)

      pt = pt._next;
    }
  }
}, {
  name: "endArray",
  init: function init(target, value) {
    var i = value.length;

    while (i--) {
      this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

Tween.version = Timeline.version = gsap.version = "3.11.5";
_coreReady = 1;
_windowExists() && _wake();
var Power0 = _easeMap.Power0,
    Power1 = _easeMap.Power1,
    Power2 = _easeMap.Power2,
    Power3 = _easeMap.Power3,
    Power4 = _easeMap.Power4,
    Linear = _easeMap.Linear,
    Quad = _easeMap.Quad,
    Cubic = _easeMap.Cubic,
    Quart = _easeMap.Quart,
    Quint = _easeMap.Quint,
    Strong = _easeMap.Strong,
    Elastic = _easeMap.Elastic,
    Back = _easeMap.Back,
    SteppedEase = _easeMap.SteppedEase,
    Bounce = _easeMap.Bounce,
    Sine = _easeMap.Sine,
    Expo = _easeMap.Expo,
    Circ = _easeMap.Circ;

 //export some internal methods/orojects for use in CSSPlugin so that we can externalize that file and allow custom builds that exclude it.



/***/ }),

/***/ "./node_modules/gsap/index.js":
/*!************************************!*\
  !*** ./node_modules/gsap/index.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Back: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Back),
/* harmony export */   Bounce: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Bounce),
/* harmony export */   CSSPlugin: () => (/* reexport safe */ _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__.CSSPlugin),
/* harmony export */   Circ: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Circ),
/* harmony export */   Cubic: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Cubic),
/* harmony export */   Elastic: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Elastic),
/* harmony export */   Expo: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Expo),
/* harmony export */   Linear: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Linear),
/* harmony export */   Power0: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power0),
/* harmony export */   Power1: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power1),
/* harmony export */   Power2: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power2),
/* harmony export */   Power3: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power3),
/* harmony export */   Power4: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Power4),
/* harmony export */   Quad: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Quad),
/* harmony export */   Quart: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Quart),
/* harmony export */   Quint: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Quint),
/* harmony export */   Sine: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Sine),
/* harmony export */   SteppedEase: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.SteppedEase),
/* harmony export */   Strong: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.Strong),
/* harmony export */   TimelineLite: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.TimelineLite),
/* harmony export */   TimelineMax: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.TimelineMax),
/* harmony export */   TweenLite: () => (/* reexport safe */ _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.TweenLite),
/* harmony export */   TweenMax: () => (/* binding */ TweenMaxWithCSS),
/* harmony export */   "default": () => (/* binding */ gsapWithCSS),
/* harmony export */   gsap: () => (/* binding */ gsapWithCSS)
/* harmony export */ });
/* harmony import */ var _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gsap-core.js */ "./node_modules/gsap/gsap-core.js");
/* harmony import */ var _CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CSSPlugin.js */ "./node_modules/gsap/CSSPlugin.js");


var gsapWithCSS = _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap.registerPlugin(_CSSPlugin_js__WEBPACK_IMPORTED_MODULE_1__.CSSPlugin) || _gsap_core_js__WEBPACK_IMPORTED_MODULE_0__.gsap,
    // to protect from tree shaking
TweenMaxWithCSS = gsapWithCSS.core.Tween;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esb0ZBQW9GOztBQUVwRjtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxvRUFBb0U7O0FBRXBFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRGQUE0Rjs7QUFFNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0ZBQW9GOztBQUVwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0NBQWtDOztBQUVsQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCOztBQUV4QjtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCOzs7QUFHeEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ29KOztBQUVwSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLFNBQVMsMkRBQWE7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsMkRBQWE7QUFDM0I7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLHlCQUF5QiwwREFBZ0I7QUFDekM7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDJEQUFhO0FBQzlELENBQUM7QUFDRDtBQUNBLGtCQUFrQix5QkFBeUI7QUFDM0M7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjs7QUFFMUIsa0JBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtREFBbUQsMkRB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OztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSwySUFBMkk7QUFDM0k7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxlQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUEsbURBQW1EO0FBQ25ELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7O0FBR0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7QUFDakM7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGlFQUFpRTs7QUFFakU7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpRUFBaUU7O0FBRWpFLHNFQUFzRTs7QUFFdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJGQUEyRjtBQUMzRixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBSTs7QUFFSixrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFD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LEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscURBQXFEOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0tBQWdLOztBQUVoSztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCOztBQUUvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjs7QUFFM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxZQUFZOzs7QUFHWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixxREFBcUQsNk5BQTZOLE9BQU8sV0FBVyxLQUFLO0FBQy9UOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7O0FBRTFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsNkRBQTZEOztBQUU3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbVFBQW1ROztBQUVuUTtBQUNBO0FBQ0E7QUFDQSxvRkFBb0Y7O0FBRXBGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUM7O0FBRW5DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5SEFBeUg7O0FBRXpIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBLDBFQUEwRTtBQUMxRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdFQUFnRTtBQUNoRTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsR0FBRztBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLDZHQUE2Rzs7QUFFN0c7QUFDQTs7QUFFQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOzs7QUFHSTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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RUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLEdBQUc7OztBQUdkO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdJO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLHFFQUFxRTs7QUFFckU7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsdUlBQXVJOztBQUV4STtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDbUo7QUFDcUgsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbDJJcEQ7QUFDMUs7QUFDM0Msa0JBQWtCLDhEQUFtQixDQUFDLG9EQUFTLEtBQUssK0NBQUk7QUFDeEQ7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21hcnRpbmRlbmlzX3YzLy4vbm9kZV9tb2R1bGVzL2dzYXAvQ1NTUGx1Z2luLmpzIiwid2VicGFjazovL21hcnRpbmRlbmlzX3YzLy4vbm9kZV9tb2R1bGVzL2dzYXAvT2JzZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vbWFydGluZGVuaXNfdjMvLi9ub2RlX21vZHVsZXMvZ3NhcC9TY3JvbGxUcmlnZ2VyLmpzIiwid2VicGFjazovL21hcnRpbmRlbmlzX3YzLy4vbm9kZV9tb2R1bGVzL2dzYXAvZ3NhcC1jb3JlLmpzIiwid2VicGFjazovL21hcnRpbmRlbmlzX3YzLy4vbm9kZV9tb2R1bGVzL2dzYXAvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBDU1NQbHVnaW4gMy4xMS41XG4gKiBodHRwczovL2dyZWVuc29jay5jb21cbiAqXG4gKiBDb3B5cmlnaHQgMjAwOC0yMDIzLCBHcmVlblNvY2suIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBTdWJqZWN0IHRvIHRoZSB0ZXJtcyBhdCBodHRwczovL2dyZWVuc29jay5jb20vc3RhbmRhcmQtbGljZW5zZSBvciBmb3JcbiAqIENsdWIgR3JlZW5Tb2NrIG1lbWJlcnMsIHRoZSBhZ3JlZW1lbnQgaXNzdWVkIHdpdGggdGhhdCBtZW1iZXJzaGlwLlxuICogQGF1dGhvcjogSmFjayBEb3lsZSwgamFja0BncmVlbnNvY2suY29tXG4qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHsgZ3NhcCwgX2dldFByb3BlcnR5LCBfbnVtRXhwLCBfbnVtV2l0aFVuaXRFeHAsIGdldFVuaXQsIF9pc1N0cmluZywgX2lzVW5kZWZpbmVkLCBfcmVuZGVyQ29tcGxleFN0cmluZywgX3JlbEV4cCwgX2ZvckVhY2hOYW1lLCBfc29ydFByb3BUd2VlbnNCeVByaW9yaXR5LCBfY29sb3JTdHJpbmdGaWx0ZXIsIF9jaGVja1BsdWdpbiwgX3JlcGxhY2VSYW5kb20sIF9wbHVnaW5zLCBHU0NhY2hlLCBQcm9wVHdlZW4sIF9jb25maWcsIF90aWNrZXIsIF9yb3VuZCwgX21pc3NpbmdQbHVnaW4sIF9nZXRTZXR0ZXIsIF9nZXRDYWNoZSwgX2NvbG9yRXhwLCBfcGFyc2VSZWxhdGl2ZSwgX3NldERlZmF1bHRzLCBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0gLy9mb3IgdGhlIGNvbW1lbnRlZC1vdXQgY2xhc3NOYW1lIGZlYXR1cmUuXG59IGZyb20gXCIuL2dzYXAtY29yZS5qc1wiO1xuXG52YXIgX3dpbixcbiAgICBfZG9jLFxuICAgIF9kb2NFbGVtZW50LFxuICAgIF9wbHVnaW5Jbml0dGVkLFxuICAgIF90ZW1wRGl2LFxuICAgIF90ZW1wRGl2U3R5bGVyLFxuICAgIF9yZWNlbnRTZXR0ZXJQbHVnaW4sXG4gICAgX3JldmVydGluZyxcbiAgICBfd2luZG93RXhpc3RzID0gZnVuY3Rpb24gX3dpbmRvd0V4aXN0cygpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG59LFxuICAgIF90cmFuc2Zvcm1Qcm9wcyA9IHt9LFxuICAgIF9SQUQyREVHID0gMTgwIC8gTWF0aC5QSSxcbiAgICBfREVHMlJBRCA9IE1hdGguUEkgLyAxODAsXG4gICAgX2F0YW4yID0gTWF0aC5hdGFuMixcbiAgICBfYmlnTnVtID0gMWU4LFxuICAgIF9jYXBzRXhwID0gLyhbQS1aXSkvZyxcbiAgICBfaG9yaXpvbnRhbEV4cCA9IC8obGVmdHxyaWdodHx3aWR0aHxtYXJnaW58cGFkZGluZ3x4KS9pLFxuICAgIF9jb21wbGV4RXhwID0gL1tcXHMsXFwoXVxcUy8sXG4gICAgX3Byb3BlcnR5QWxpYXNlcyA9IHtcbiAgYXV0b0FscGhhOiBcIm9wYWNpdHksdmlzaWJpbGl0eVwiLFxuICBzY2FsZTogXCJzY2FsZVgsc2NhbGVZXCIsXG4gIGFscGhhOiBcIm9wYWNpdHlcIlxufSxcbiAgICBfcmVuZGVyQ1NTUHJvcCA9IGZ1bmN0aW9uIF9yZW5kZXJDU1NQcm9wKHJhdGlvLCBkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgTWF0aC5yb3VuZCgoZGF0YS5zICsgZGF0YS5jICogcmF0aW8pICogMTAwMDApIC8gMTAwMDAgKyBkYXRhLnUsIGRhdGEpO1xufSxcbiAgICBfcmVuZGVyUHJvcFdpdGhFbmQgPSBmdW5jdGlvbiBfcmVuZGVyUHJvcFdpdGhFbmQocmF0aW8sIGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCByYXRpbyA9PT0gMSA/IGRhdGEuZSA6IE1hdGgucm91bmQoKGRhdGEucyArIGRhdGEuYyAqIHJhdGlvKSAqIDEwMDAwKSAvIDEwMDAwICsgZGF0YS51LCBkYXRhKTtcbn0sXG4gICAgX3JlbmRlckNTU1Byb3BXaXRoQmVnaW5uaW5nID0gZnVuY3Rpb24gX3JlbmRlckNTU1Byb3BXaXRoQmVnaW5uaW5nKHJhdGlvLCBkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgcmF0aW8gPyBNYXRoLnJvdW5kKChkYXRhLnMgKyBkYXRhLmMgKiByYXRpbykgKiAxMDAwMCkgLyAxMDAwMCArIGRhdGEudSA6IGRhdGEuYiwgZGF0YSk7XG59LFxuICAgIC8vaWYgdW5pdHMgY2hhbmdlLCB3ZSBuZWVkIGEgd2F5IHRvIHJlbmRlciB0aGUgb3JpZ2luYWwgdW5pdC92YWx1ZSB3aGVuIHRoZSB0d2VlbiBnb2VzIGFsbCB0aGUgd2F5IGJhY2sgdG8gdGhlIGJlZ2lubmluZyAocmF0aW86MClcbl9yZW5kZXJSb3VuZGVkQ1NTUHJvcCA9IGZ1bmN0aW9uIF9yZW5kZXJSb3VuZGVkQ1NTUHJvcChyYXRpbywgZGF0YSkge1xuICB2YXIgdmFsdWUgPSBkYXRhLnMgKyBkYXRhLmMgKiByYXRpbztcbiAgZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsIH5+KHZhbHVlICsgKHZhbHVlIDwgMCA/IC0uNSA6IC41KSkgKyBkYXRhLnUsIGRhdGEpO1xufSxcbiAgICBfcmVuZGVyTm9uVHdlZW5pbmdWYWx1ZSA9IGZ1bmN0aW9uIF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlKHJhdGlvLCBkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgcmF0aW8gPyBkYXRhLmUgOiBkYXRhLmIsIGRhdGEpO1xufSxcbiAgICBfcmVuZGVyTm9uVHdlZW5pbmdWYWx1ZU9ubHlBdEVuZCA9IGZ1bmN0aW9uIF9yZW5kZXJOb25Ud2VlbmluZ1ZhbHVlT25seUF0RW5kKHJhdGlvLCBkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgcmF0aW8gIT09IDEgPyBkYXRhLmIgOiBkYXRhLmUsIGRhdGEpO1xufSxcbiAgICBfc2V0dGVyQ1NTU3R5bGUgPSBmdW5jdGlvbiBfc2V0dGVyQ1NTU3R5bGUodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbn0sXG4gICAgX3NldHRlckNTU1Byb3AgPSBmdW5jdGlvbiBfc2V0dGVyQ1NTUHJvcCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xuICByZXR1cm4gdGFyZ2V0LnN0eWxlLnNldFByb3BlcnR5KHByb3BlcnR5LCB2YWx1ZSk7XG59LFxuICAgIF9zZXR0ZXJUcmFuc2Zvcm0gPSBmdW5jdGlvbiBfc2V0dGVyVHJhbnNmb3JtKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXQuX2dzYXBbcHJvcGVydHldID0gdmFsdWU7XG59LFxuICAgIF9zZXR0ZXJTY2FsZSA9IGZ1bmN0aW9uIF9zZXR0ZXJTY2FsZSh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xuICByZXR1cm4gdGFyZ2V0Ll9nc2FwLnNjYWxlWCA9IHRhcmdldC5fZ3NhcC5zY2FsZVkgPSB2YWx1ZTtcbn0sXG4gICAgX3NldHRlclNjYWxlV2l0aFJlbmRlciA9IGZ1bmN0aW9uIF9zZXR0ZXJTY2FsZVdpdGhSZW5kZXIodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIGRhdGEsIHJhdGlvKSB7XG4gIHZhciBjYWNoZSA9IHRhcmdldC5fZ3NhcDtcbiAgY2FjaGUuc2NhbGVYID0gY2FjaGUuc2NhbGVZID0gdmFsdWU7XG4gIGNhY2hlLnJlbmRlclRyYW5zZm9ybShyYXRpbywgY2FjaGUpO1xufSxcbiAgICBfc2V0dGVyVHJhbnNmb3JtV2l0aFJlbmRlciA9IGZ1bmN0aW9uIF9zZXR0ZXJUcmFuc2Zvcm1XaXRoUmVuZGVyKHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCBkYXRhLCByYXRpbykge1xuICB2YXIgY2FjaGUgPSB0YXJnZXQuX2dzYXA7XG4gIGNhY2hlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0ocmF0aW8sIGNhY2hlKTtcbn0sXG4gICAgX3RyYW5zZm9ybVByb3AgPSBcInRyYW5zZm9ybVwiLFxuICAgIF90cmFuc2Zvcm1PcmlnaW5Qcm9wID0gX3RyYW5zZm9ybVByb3AgKyBcIk9yaWdpblwiLFxuICAgIF9zYXZlU3R5bGUgPSBmdW5jdGlvbiBfc2F2ZVN0eWxlKHByb3BlcnR5LCBpc05vdENTUykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcbiAgICAgIHN0eWxlID0gdGFyZ2V0LnN0eWxlO1xuXG4gIGlmIChwcm9wZXJ0eSBpbiBfdHJhbnNmb3JtUHJvcHMpIHtcbiAgICB0aGlzLnRmbSA9IHRoaXMudGZtIHx8IHt9O1xuXG4gICAgaWYgKHByb3BlcnR5ICE9PSBcInRyYW5zZm9ybVwiKSB7XG4gICAgICBwcm9wZXJ0eSA9IF9wcm9wZXJ0eUFsaWFzZXNbcHJvcGVydHldIHx8IHByb3BlcnR5O1xuICAgICAgfnByb3BlcnR5LmluZGV4T2YoXCIsXCIpID8gcHJvcGVydHkuc3BsaXQoXCIsXCIpLmZvckVhY2goZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLnRmbVthXSA9IF9nZXQodGFyZ2V0LCBhKTtcbiAgICAgIH0pIDogdGhpcy50Zm1bcHJvcGVydHldID0gdGFyZ2V0Ll9nc2FwLnggPyB0YXJnZXQuX2dzYXBbcHJvcGVydHldIDogX2dldCh0YXJnZXQsIHByb3BlcnR5KTsgLy8gbm90ZTogc2NhbGUgd291bGQgbWFwIHRvIFwic2NhbGVYLHNjYWxlWVwiLCB0aHVzIHdlIGxvb3AgYW5kIGFwcGx5IHRoZW0gYm90aC5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIF9wcm9wZXJ0eUFsaWFzZXMudHJhbnNmb3JtLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHJldHVybiBfc2F2ZVN0eWxlLmNhbGwoX3RoaXMsIHAsIGlzTm90Q1NTKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmluZGV4T2YoX3RyYW5zZm9ybVByb3ApID49IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0Ll9nc2FwLnN2Zykge1xuICAgICAgdGhpcy5zdmdvID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc3ZnLW9yaWdpblwiKTtcbiAgICAgIHRoaXMucHJvcHMucHVzaChfdHJhbnNmb3JtT3JpZ2luUHJvcCwgaXNOb3RDU1MsIFwiXCIpO1xuICAgIH1cblxuICAgIHByb3BlcnR5ID0gX3RyYW5zZm9ybVByb3A7XG4gIH1cblxuICAoc3R5bGUgfHwgaXNOb3RDU1MpICYmIHRoaXMucHJvcHMucHVzaChwcm9wZXJ0eSwgaXNOb3RDU1MsIHN0eWxlW3Byb3BlcnR5XSk7XG59LFxuICAgIF9yZW1vdmVJbmRlcGVuZGVudFRyYW5zZm9ybXMgPSBmdW5jdGlvbiBfcmVtb3ZlSW5kZXBlbmRlbnRUcmFuc2Zvcm1zKHN0eWxlKSB7XG4gIGlmIChzdHlsZS50cmFuc2xhdGUpIHtcbiAgICBzdHlsZS5yZW1vdmVQcm9wZXJ0eShcInRyYW5zbGF0ZVwiKTtcbiAgICBzdHlsZS5yZW1vdmVQcm9wZXJ0eShcInNjYWxlXCIpO1xuICAgIHN0eWxlLnJlbW92ZVByb3BlcnR5KFwicm90YXRlXCIpO1xuICB9XG59LFxuICAgIF9yZXZlcnRTdHlsZSA9IGZ1bmN0aW9uIF9yZXZlcnRTdHlsZSgpIHtcbiAgdmFyIHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgIHRhcmdldCA9IHRoaXMudGFyZ2V0LFxuICAgICAgc3R5bGUgPSB0YXJnZXQuc3R5bGUsXG4gICAgICBjYWNoZSA9IHRhcmdldC5fZ3NhcCxcbiAgICAgIGksXG4gICAgICBwO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkgKz0gMykge1xuICAgIC8vIHN0b3JlZCBsaWtlIHRoaXM6IHByb3BlcnR5LCBpc05vdENTUywgdmFsdWVcbiAgICBwcm9wc1tpICsgMV0gPyB0YXJnZXRbcHJvcHNbaV1dID0gcHJvcHNbaSArIDJdIDogcHJvcHNbaSArIDJdID8gc3R5bGVbcHJvcHNbaV1dID0gcHJvcHNbaSArIDJdIDogc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcHNbaV0uc3Vic3RyKDAsIDIpID09PSBcIi0tXCIgPyBwcm9wc1tpXSA6IHByb3BzW2ldLnJlcGxhY2UoX2NhcHNFeHAsIFwiLSQxXCIpLnRvTG93ZXJDYXNlKCkpO1xuICB9XG5cbiAgaWYgKHRoaXMudGZtKSB7XG4gICAgZm9yIChwIGluIHRoaXMudGZtKSB7XG4gICAgICBjYWNoZVtwXSA9IHRoaXMudGZtW3BdO1xuICAgIH1cblxuICAgIGlmIChjYWNoZS5zdmcpIHtcbiAgICAgIGNhY2hlLnJlbmRlclRyYW5zZm9ybSgpO1xuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcImRhdGEtc3ZnLW9yaWdpblwiLCB0aGlzLnN2Z28gfHwgXCJcIik7XG4gICAgfVxuXG4gICAgaSA9IF9yZXZlcnRpbmcoKTtcblxuICAgIGlmICgoIWkgfHwgIWkuaXNTdGFydCkgJiYgIXN0eWxlW190cmFuc2Zvcm1Qcm9wXSkge1xuICAgICAgX3JlbW92ZUluZGVwZW5kZW50VHJhbnNmb3JtcyhzdHlsZSk7XG5cbiAgICAgIGNhY2hlLnVuY2FjaGUgPSAxOyAvLyBpZiBpdCdzIGEgc3RhcnRBdCB0aGF0J3MgYmVpbmcgcmV2ZXJ0ZWQgaW4gdGhlIF9pbml0VHdlZW4oKSBvZiB0aGUgY29yZSwgd2UgZG9uJ3QgbmVlZCB0byB1bmNhY2hlIHRyYW5zZm9ybXMuIFRoaXMgaXMgcHVyZWx5IGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uLlxuICAgIH1cbiAgfVxufSxcbiAgICBfZ2V0U3R5bGVTYXZlciA9IGZ1bmN0aW9uIF9nZXRTdHlsZVNhdmVyKHRhcmdldCwgcHJvcGVydGllcykge1xuICB2YXIgc2F2ZXIgPSB7XG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgcHJvcHM6IFtdLFxuICAgIHJldmVydDogX3JldmVydFN0eWxlLFxuICAgIHNhdmU6IF9zYXZlU3R5bGVcbiAgfTtcbiAgdGFyZ2V0Ll9nc2FwIHx8IGdzYXAuY29yZS5nZXRDYWNoZSh0YXJnZXQpOyAvLyBqdXN0IG1ha2Ugc3VyZSB0aGVyZSdzIGEgX2dzYXAgY2FjaGUgZGVmaW5lZCBiZWNhdXNlIHdlIHJlYWQgZnJvbSBpdCBpbiBfc2F2ZVN0eWxlKCkgYW5kIGl0J3MgbW9yZSBlZmZpY2llbnQgdG8ganVzdCBjaGVjayBpdCBoZXJlIG9uY2UuXG5cbiAgcHJvcGVydGllcyAmJiBwcm9wZXJ0aWVzLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIHNhdmVyLnNhdmUocCk7XG4gIH0pO1xuICByZXR1cm4gc2F2ZXI7XG59LFxuICAgIF9zdXBwb3J0czNELFxuICAgIF9jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gX2NyZWF0ZUVsZW1lbnQodHlwZSwgbnMpIHtcbiAgdmFyIGUgPSBfZG9jLmNyZWF0ZUVsZW1lbnROUyA/IF9kb2MuY3JlYXRlRWxlbWVudE5TKChucyB8fCBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIikucmVwbGFjZSgvXmh0dHBzLywgXCJodHRwXCIpLCB0eXBlKSA6IF9kb2MuY3JlYXRlRWxlbWVudCh0eXBlKTsgLy9zb21lIHNlcnZlcnMgc3dhcCBpbiBodHRwcyBmb3IgaHR0cCBpbiB0aGUgbmFtZXNwYWNlIHdoaWNoIGNhbiBicmVhayB0aGluZ3MsIG1ha2luZyBcInN0eWxlXCIgaW5hY2Nlc3NpYmxlLlxuXG4gIHJldHVybiBlLnN0eWxlID8gZSA6IF9kb2MuY3JlYXRlRWxlbWVudCh0eXBlKTsgLy9zb21lIGVudmlyb25tZW50cyB3b24ndCBhbGxvdyBhY2Nlc3MgdG8gdGhlIGVsZW1lbnQncyBzdHlsZSB3aGVuIGNyZWF0ZWQgd2l0aCBhIG5hbWVzcGFjZSBpbiB3aGljaCBjYXNlIHdlIGRlZmF1bHQgdG8gdGhlIHN0YW5kYXJkIGNyZWF0ZUVsZW1lbnQoKSB0byB3b3JrIGFyb3VuZCB0aGUgaXNzdWUuIEFsc28gbm90ZSB0aGF0IHdoZW4gR1NBUCBpcyBlbWJlZGRlZCBkaXJlY3RseSBpbnNpZGUgYW4gU1ZHIGZpbGUsIGNyZWF0ZUVsZW1lbnQoKSB3b24ndCBhbGxvdyBhY2Nlc3MgdG8gdGhlIHN0eWxlIG9iamVjdCBpbiBGaXJlZm94IChzZWUgaHR0cHM6Ly9ncmVlbnNvY2suY29tL2ZvcnVtcy90b3BpYy8yMDIxNS1wcm9ibGVtLXVzaW5nLXR3ZWVubWF4LWluLXN0YW5kYWxvbmUtc2VsZi1jb250YWluaW5nLXN2Zy1maWxlLWVyci1jYW5ub3Qtc2V0LXByb3BlcnR5LWNzc3RleHQtb2YtdW5kZWZpbmVkLykuXG59LFxuICAgIF9nZXRDb21wdXRlZFByb3BlcnR5ID0gZnVuY3Rpb24gX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSwgc2tpcFByZWZpeEZhbGxiYWNrKSB7XG4gIHZhciBjcyA9IGdldENvbXB1dGVkU3R5bGUodGFyZ2V0KTtcbiAgcmV0dXJuIGNzW3Byb3BlcnR5XSB8fCBjcy5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5LnJlcGxhY2UoX2NhcHNFeHAsIFwiLSQxXCIpLnRvTG93ZXJDYXNlKCkpIHx8IGNzLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpIHx8ICFza2lwUHJlZml4RmFsbGJhY2sgJiYgX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBfY2hlY2tQcm9wUHJlZml4KHByb3BlcnR5KSB8fCBwcm9wZXJ0eSwgMSkgfHwgXCJcIjsgLy9jc3MgdmFyaWFibGVzIG1heSBub3QgbmVlZCBjYXBzIHN3YXBwZWQgb3V0IGZvciBkYXNoZXMgYW5kIGxvd2VyY2FzZS5cbn0sXG4gICAgX3ByZWZpeGVzID0gXCJPLE1veixtcyxNcyxXZWJraXRcIi5zcGxpdChcIixcIiksXG4gICAgX2NoZWNrUHJvcFByZWZpeCA9IGZ1bmN0aW9uIF9jaGVja1Byb3BQcmVmaXgocHJvcGVydHksIGVsZW1lbnQsIHByZWZlclByZWZpeCkge1xuICB2YXIgZSA9IGVsZW1lbnQgfHwgX3RlbXBEaXYsXG4gICAgICBzID0gZS5zdHlsZSxcbiAgICAgIGkgPSA1O1xuXG4gIGlmIChwcm9wZXJ0eSBpbiBzICYmICFwcmVmZXJQcmVmaXgpIHtcbiAgICByZXR1cm4gcHJvcGVydHk7XG4gIH1cblxuICBwcm9wZXJ0eSA9IHByb3BlcnR5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcGVydHkuc3Vic3RyKDEpO1xuXG4gIHdoaWxlIChpLS0gJiYgIShfcHJlZml4ZXNbaV0gKyBwcm9wZXJ0eSBpbiBzKSkge31cblxuICByZXR1cm4gaSA8IDAgPyBudWxsIDogKGkgPT09IDMgPyBcIm1zXCIgOiBpID49IDAgPyBfcHJlZml4ZXNbaV0gOiBcIlwiKSArIHByb3BlcnR5O1xufSxcbiAgICBfaW5pdENvcmUgPSBmdW5jdGlvbiBfaW5pdENvcmUoKSB7XG4gIGlmIChfd2luZG93RXhpc3RzKCkgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgX3dpbiA9IHdpbmRvdztcbiAgICBfZG9jID0gX3dpbi5kb2N1bWVudDtcbiAgICBfZG9jRWxlbWVudCA9IF9kb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgIF90ZW1wRGl2ID0gX2NyZWF0ZUVsZW1lbnQoXCJkaXZcIikgfHwge1xuICAgICAgc3R5bGU6IHt9XG4gICAgfTtcbiAgICBfdGVtcERpdlN0eWxlciA9IF9jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIF90cmFuc2Zvcm1Qcm9wID0gX2NoZWNrUHJvcFByZWZpeChfdHJhbnNmb3JtUHJvcCk7XG4gICAgX3RyYW5zZm9ybU9yaWdpblByb3AgPSBfdHJhbnNmb3JtUHJvcCArIFwiT3JpZ2luXCI7XG4gICAgX3RlbXBEaXYuc3R5bGUuY3NzVGV4dCA9IFwiYm9yZGVyLXdpZHRoOjA7bGluZS1oZWlnaHQ6MDtwb3NpdGlvbjphYnNvbHV0ZTtwYWRkaW5nOjBcIjsgLy9tYWtlIHN1cmUgdG8gb3ZlcnJpZGUgY2VydGFpbiBwcm9wZXJ0aWVzIHRoYXQgbWF5IGNvbnRhbWluYXRlIG1lYXN1cmVtZW50cywgaW4gY2FzZSB0aGUgdXNlciBoYXMgb3ZlcnJlYWNoaW5nIHN0eWxlIHNoZWV0cy5cblxuICAgIF9zdXBwb3J0czNEID0gISFfY2hlY2tQcm9wUHJlZml4KFwicGVyc3BlY3RpdmVcIik7XG4gICAgX3JldmVydGluZyA9IGdzYXAuY29yZS5yZXZlcnRpbmc7XG4gICAgX3BsdWdpbkluaXR0ZWQgPSAxO1xuICB9XG59LFxuICAgIF9nZXRCQm94SGFjayA9IGZ1bmN0aW9uIF9nZXRCQm94SGFjayhzd2FwSWZQb3NzaWJsZSkge1xuICAvL3dvcmtzIGFyb3VuZCBpc3N1ZXMgaW4gc29tZSBicm93c2VycyAobGlrZSBGaXJlZm94KSB0aGF0IGRvbid0IGNvcnJlY3RseSByZXBvcnQgZ2V0QkJveCgpIG9uIFNWRyBlbGVtZW50cyBpbnNpZGUgYSA8ZGVmcz4gZWxlbWVudCBhbmQvb3IgPG1hc2s+LiBXZSB0cnkgY3JlYXRpbmcgYW4gU1ZHLCBhZGRpbmcgaXQgdG8gdGhlIGRvY3VtZW50RWxlbWVudCBhbmQgdG9zcyB0aGUgZWxlbWVudCBpbiB0aGVyZSBzbyB0aGF0IGl0J3MgZGVmaW5pdGVseSBwYXJ0IG9mIHRoZSByZW5kZXJpbmcgdHJlZSwgdGhlbiBncmFiIHRoZSBiYm94IGFuZCBpZiBpdCB3b3Jrcywgd2UgYWN0dWFsbHkgc3dhcCBvdXQgdGhlIG9yaWdpbmFsIGdldEJCb3goKSBtZXRob2QgZm9yIG91ciBvd24gdGhhdCBkb2VzIHRoZXNlIGV4dHJhIHN0ZXBzIHdoZW5ldmVyIGdldEJCb3ggaXMgbmVlZGVkLiBUaGlzIGhlbHBzIGVuc3VyZSB0aGF0IHBlcmZvcm1hbmNlIGlzIG9wdGltYWwgKG9ubHkgZG8gYWxsIHRoZXNlIGV4dHJhIHN0ZXBzIHdoZW4gYWJzb2x1dGVseSBuZWNlc3NhcnkuLi5tb3N0IGVsZW1lbnRzIGRvbid0IG5lZWQgaXQpLlxuICB2YXIgc3ZnID0gX2NyZWF0ZUVsZW1lbnQoXCJzdmdcIiwgdGhpcy5vd25lclNWR0VsZW1lbnQgJiYgdGhpcy5vd25lclNWR0VsZW1lbnQuZ2V0QXR0cmlidXRlKFwieG1sbnNcIikgfHwgXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiKSxcbiAgICAgIG9sZFBhcmVudCA9IHRoaXMucGFyZW50Tm9kZSxcbiAgICAgIG9sZFNpYmxpbmcgPSB0aGlzLm5leHRTaWJsaW5nLFxuICAgICAgb2xkQ1NTID0gdGhpcy5zdHlsZS5jc3NUZXh0LFxuICAgICAgYmJveDtcblxuICBfZG9jRWxlbWVudC5hcHBlbmRDaGlsZChzdmcpO1xuXG4gIHN2Zy5hcHBlbmRDaGlsZCh0aGlzKTtcbiAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gIGlmIChzd2FwSWZQb3NzaWJsZSkge1xuICAgIHRyeSB7XG4gICAgICBiYm94ID0gdGhpcy5nZXRCQm94KCk7XG4gICAgICB0aGlzLl9nc2FwQkJveCA9IHRoaXMuZ2V0QkJveDsgLy9zdG9yZSB0aGUgb3JpZ2luYWxcblxuICAgICAgdGhpcy5nZXRCQm94ID0gX2dldEJCb3hIYWNrO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH0gZWxzZSBpZiAodGhpcy5fZ3NhcEJCb3gpIHtcbiAgICBiYm94ID0gdGhpcy5fZ3NhcEJCb3goKTtcbiAgfVxuXG4gIGlmIChvbGRQYXJlbnQpIHtcbiAgICBpZiAob2xkU2libGluZykge1xuICAgICAgb2xkUGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLCBvbGRTaWJsaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkUGFyZW50LmFwcGVuZENoaWxkKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIF9kb2NFbGVtZW50LnJlbW92ZUNoaWxkKHN2Zyk7XG5cbiAgdGhpcy5zdHlsZS5jc3NUZXh0ID0gb2xkQ1NTO1xuICByZXR1cm4gYmJveDtcbn0sXG4gICAgX2dldEF0dHJpYnV0ZUZhbGxiYWNrcyA9IGZ1bmN0aW9uIF9nZXRBdHRyaWJ1dGVGYWxsYmFja3ModGFyZ2V0LCBhdHRyaWJ1dGVzQXJyYXkpIHtcbiAgdmFyIGkgPSBhdHRyaWJ1dGVzQXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZiAodGFyZ2V0Lmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGVzQXJyYXlbaV0pKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVzQXJyYXlbaV0pO1xuICAgIH1cbiAgfVxufSxcbiAgICBfZ2V0QkJveCA9IGZ1bmN0aW9uIF9nZXRCQm94KHRhcmdldCkge1xuICB2YXIgYm91bmRzO1xuXG4gIHRyeSB7XG4gICAgYm91bmRzID0gdGFyZ2V0LmdldEJCb3goKTsgLy9GaXJlZm94IHRocm93cyBlcnJvcnMgaWYgeW91IHRyeSBjYWxsaW5nIGdldEJCb3goKSBvbiBhbiBTVkcgZWxlbWVudCB0aGF0J3Mgbm90IHJlbmRlcmVkIChsaWtlIGluIGEgPHN5bWJvbD4gb3IgPGRlZnM+KS4gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NjEyMTE4XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgYm91bmRzID0gX2dldEJCb3hIYWNrLmNhbGwodGFyZ2V0LCB0cnVlKTtcbiAgfVxuXG4gIGJvdW5kcyAmJiAoYm91bmRzLndpZHRoIHx8IGJvdW5kcy5oZWlnaHQpIHx8IHRhcmdldC5nZXRCQm94ID09PSBfZ2V0QkJveEhhY2sgfHwgKGJvdW5kcyA9IF9nZXRCQm94SGFjay5jYWxsKHRhcmdldCwgdHJ1ZSkpOyAvL3NvbWUgYnJvd3NlcnMgKGxpa2UgRmlyZWZveCkgbWlzcmVwb3J0IHRoZSBib3VuZHMgaWYgdGhlIGVsZW1lbnQgaGFzIHplcm8gd2lkdGggYW5kIGhlaWdodCAoaXQganVzdCBhc3N1bWVzIGl0J3MgYXQgeDowLCB5OjApLCB0aHVzIHdlIG5lZWQgdG8gbWFudWFsbHkgZ3JhYiB0aGUgcG9zaXRpb24gaW4gdGhhdCBjYXNlLlxuXG4gIHJldHVybiBib3VuZHMgJiYgIWJvdW5kcy53aWR0aCAmJiAhYm91bmRzLnggJiYgIWJvdW5kcy55ID8ge1xuICAgIHg6ICtfZ2V0QXR0cmlidXRlRmFsbGJhY2tzKHRhcmdldCwgW1wieFwiLCBcImN4XCIsIFwieDFcIl0pIHx8IDAsXG4gICAgeTogK19nZXRBdHRyaWJ1dGVGYWxsYmFja3ModGFyZ2V0LCBbXCJ5XCIsIFwiY3lcIiwgXCJ5MVwiXSkgfHwgMCxcbiAgICB3aWR0aDogMCxcbiAgICBoZWlnaHQ6IDBcbiAgfSA6IGJvdW5kcztcbn0sXG4gICAgX2lzU1ZHID0gZnVuY3Rpb24gX2lzU1ZHKGUpIHtcbiAgcmV0dXJuICEhKGUuZ2V0Q1RNICYmICghZS5wYXJlbnROb2RlIHx8IGUub3duZXJTVkdFbGVtZW50KSAmJiBfZ2V0QkJveChlKSk7XG59LFxuICAgIC8vcmVwb3J0cyBpZiB0aGUgZWxlbWVudCBpcyBhbiBTVkcgb24gd2hpY2ggZ2V0QkJveCgpIGFjdHVhbGx5IHdvcmtzXG5fcmVtb3ZlUHJvcGVydHkgPSBmdW5jdGlvbiBfcmVtb3ZlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkge1xuICBpZiAocHJvcGVydHkpIHtcbiAgICB2YXIgc3R5bGUgPSB0YXJnZXQuc3R5bGU7XG5cbiAgICBpZiAocHJvcGVydHkgaW4gX3RyYW5zZm9ybVByb3BzICYmIHByb3BlcnR5ICE9PSBfdHJhbnNmb3JtT3JpZ2luUHJvcCkge1xuICAgICAgcHJvcGVydHkgPSBfdHJhbnNmb3JtUHJvcDtcbiAgICB9XG5cbiAgICBpZiAoc3R5bGUucmVtb3ZlUHJvcGVydHkpIHtcbiAgICAgIGlmIChwcm9wZXJ0eS5zdWJzdHIoMCwgMikgPT09IFwibXNcIiB8fCBwcm9wZXJ0eS5zdWJzdHIoMCwgNikgPT09IFwid2Via2l0XCIpIHtcbiAgICAgICAgLy9NaWNyb3NvZnQgYW5kIHNvbWUgV2Via2l0IGJyb3dzZXJzIGRvbid0IGNvbmZvcm0gdG8gdGhlIHN0YW5kYXJkIG9mIGNhcGl0YWxpemluZyB0aGUgZmlyc3QgcHJlZml4IGNoYXJhY3Rlciwgc28gd2UgYWRqdXN0IHNvIHRoYXQgd2hlbiB3ZSBwcmVmaXggdGhlIGNhcHMgd2l0aCBhIGRhc2gsIGl0J3MgY29ycmVjdCAob3RoZXJ3aXNlIGl0J2QgYmUgXCJtcy10cmFuc2Zvcm1cIiBpbnN0ZWFkIG9mIFwiLW1zLXRyYW5zZm9ybVwiIGZvciBJRTksIGZvciBleGFtcGxlKVxuICAgICAgICBwcm9wZXJ0eSA9IFwiLVwiICsgcHJvcGVydHk7XG4gICAgICB9XG5cbiAgICAgIHN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3BlcnR5LnJlcGxhY2UoX2NhcHNFeHAsIFwiLSQxXCIpLnRvTG93ZXJDYXNlKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL25vdGU6IG9sZCB2ZXJzaW9ucyBvZiBJRSB1c2UgXCJyZW1vdmVBdHRyaWJ1dGUoKVwiIGluc3RlYWQgb2YgXCJyZW1vdmVQcm9wZXJ0eSgpXCJcbiAgICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZShwcm9wZXJ0eSk7XG4gICAgfVxuICB9XG59LFxuICAgIF9hZGROb25Ud2VlbmluZ1BUID0gZnVuY3Rpb24gX2FkZE5vblR3ZWVuaW5nUFQocGx1Z2luLCB0YXJnZXQsIHByb3BlcnR5LCBiZWdpbm5pbmcsIGVuZCwgb25seVNldEF0RW5kKSB7XG4gIHZhciBwdCA9IG5ldyBQcm9wVHdlZW4ocGx1Z2luLl9wdCwgdGFyZ2V0LCBwcm9wZXJ0eSwgMCwgMSwgb25seVNldEF0RW5kID8gX3JlbmRlck5vblR3ZWVuaW5nVmFsdWVPbmx5QXRFbmQgOiBfcmVuZGVyTm9uVHdlZW5pbmdWYWx1ZSk7XG4gIHBsdWdpbi5fcHQgPSBwdDtcbiAgcHQuYiA9IGJlZ2lubmluZztcbiAgcHQuZSA9IGVuZDtcblxuICBwbHVnaW4uX3Byb3BzLnB1c2gocHJvcGVydHkpO1xuXG4gIHJldHVybiBwdDtcbn0sXG4gICAgX25vbkNvbnZlcnRpYmxlVW5pdHMgPSB7XG4gIGRlZzogMSxcbiAgcmFkOiAxLFxuICB0dXJuOiAxXG59LFxuICAgIF9ub25TdGFuZGFyZExheW91dHMgPSB7XG4gIGdyaWQ6IDEsXG4gIGZsZXg6IDFcbn0sXG4gICAgLy90YWtlcyBhIHNpbmdsZSB2YWx1ZSBsaWtlIDIwcHggYW5kIGNvbnZlcnRzIGl0IHRvIHRoZSB1bml0IHNwZWNpZmllZCwgbGlrZSBcIiVcIiwgcmV0dXJuaW5nIG9ubHkgdGhlIG51bWVyaWMgYW1vdW50LlxuX2NvbnZlcnRUb1VuaXQgPSBmdW5jdGlvbiBfY29udmVydFRvVW5pdCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgdW5pdCkge1xuICB2YXIgY3VyVmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwLFxuICAgICAgY3VyVW5pdCA9ICh2YWx1ZSArIFwiXCIpLnRyaW0oKS5zdWJzdHIoKGN1clZhbHVlICsgXCJcIikubGVuZ3RoKSB8fCBcInB4XCIsXG4gICAgICAvLyBzb21lIGJyb3dzZXJzIGxlYXZlIGV4dHJhIHdoaXRlc3BhY2UgYXQgdGhlIGJlZ2lubmluZyBvZiBDU1MgdmFyaWFibGVzLCBoZW5jZSB0aGUgbmVlZCB0byB0cmltKClcbiAgc3R5bGUgPSBfdGVtcERpdi5zdHlsZSxcbiAgICAgIGhvcml6b250YWwgPSBfaG9yaXpvbnRhbEV4cC50ZXN0KHByb3BlcnR5KSxcbiAgICAgIGlzUm9vdFNWRyA9IHRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwic3ZnXCIsXG4gICAgICBtZWFzdXJlUHJvcGVydHkgPSAoaXNSb290U1ZHID8gXCJjbGllbnRcIiA6IFwib2Zmc2V0XCIpICsgKGhvcml6b250YWwgPyBcIldpZHRoXCIgOiBcIkhlaWdodFwiKSxcbiAgICAgIGFtb3VudCA9IDEwMCxcbiAgICAgIHRvUGl4ZWxzID0gdW5pdCA9PT0gXCJweFwiLFxuICAgICAgdG9QZXJjZW50ID0gdW5pdCA9PT0gXCIlXCIsXG4gICAgICBweCxcbiAgICAgIHBhcmVudCxcbiAgICAgIGNhY2hlLFxuICAgICAgaXNTVkc7XG5cbiAgaWYgKHVuaXQgPT09IGN1clVuaXQgfHwgIWN1clZhbHVlIHx8IF9ub25Db252ZXJ0aWJsZVVuaXRzW3VuaXRdIHx8IF9ub25Db252ZXJ0aWJsZVVuaXRzW2N1clVuaXRdKSB7XG4gICAgcmV0dXJuIGN1clZhbHVlO1xuICB9XG5cbiAgY3VyVW5pdCAhPT0gXCJweFwiICYmICF0b1BpeGVscyAmJiAoY3VyVmFsdWUgPSBfY29udmVydFRvVW5pdCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgXCJweFwiKSk7XG4gIGlzU1ZHID0gdGFyZ2V0LmdldENUTSAmJiBfaXNTVkcodGFyZ2V0KTtcblxuICBpZiAoKHRvUGVyY2VudCB8fCBjdXJVbml0ID09PSBcIiVcIikgJiYgKF90cmFuc2Zvcm1Qcm9wc1twcm9wZXJ0eV0gfHwgfnByb3BlcnR5LmluZGV4T2YoXCJhZGl1c1wiKSkpIHtcbiAgICBweCA9IGlzU1ZHID8gdGFyZ2V0LmdldEJCb3goKVtob3Jpem9udGFsID8gXCJ3aWR0aFwiIDogXCJoZWlnaHRcIl0gOiB0YXJnZXRbbWVhc3VyZVByb3BlcnR5XTtcbiAgICByZXR1cm4gX3JvdW5kKHRvUGVyY2VudCA/IGN1clZhbHVlIC8gcHggKiBhbW91bnQgOiBjdXJWYWx1ZSAvIDEwMCAqIHB4KTtcbiAgfVxuXG4gIHN0eWxlW2hvcml6b250YWwgPyBcIndpZHRoXCIgOiBcImhlaWdodFwiXSA9IGFtb3VudCArICh0b1BpeGVscyA/IGN1clVuaXQgOiB1bml0KTtcbiAgcGFyZW50ID0gfnByb3BlcnR5LmluZGV4T2YoXCJhZGl1c1wiKSB8fCB1bml0ID09PSBcImVtXCIgJiYgdGFyZ2V0LmFwcGVuZENoaWxkICYmICFpc1Jvb3RTVkcgPyB0YXJnZXQgOiB0YXJnZXQucGFyZW50Tm9kZTtcblxuICBpZiAoaXNTVkcpIHtcbiAgICBwYXJlbnQgPSAodGFyZ2V0Lm93bmVyU1ZHRWxlbWVudCB8fCB7fSkucGFyZW50Tm9kZTtcbiAgfVxuXG4gIGlmICghcGFyZW50IHx8IHBhcmVudCA9PT0gX2RvYyB8fCAhcGFyZW50LmFwcGVuZENoaWxkKSB7XG4gICAgcGFyZW50ID0gX2RvYy5ib2R5O1xuICB9XG5cbiAgY2FjaGUgPSBwYXJlbnQuX2dzYXA7XG5cbiAgaWYgKGNhY2hlICYmIHRvUGVyY2VudCAmJiBjYWNoZS53aWR0aCAmJiBob3Jpem9udGFsICYmIGNhY2hlLnRpbWUgPT09IF90aWNrZXIudGltZSAmJiAhY2FjaGUudW5jYWNoZSkge1xuICAgIHJldHVybiBfcm91bmQoY3VyVmFsdWUgLyBjYWNoZS53aWR0aCAqIGFtb3VudCk7XG4gIH0gZWxzZSB7XG4gICAgKHRvUGVyY2VudCB8fCBjdXJVbml0ID09PSBcIiVcIikgJiYgIV9ub25TdGFuZGFyZExheW91dHNbX2dldENvbXB1dGVkUHJvcGVydHkocGFyZW50LCBcImRpc3BsYXlcIildICYmIChzdHlsZS5wb3NpdGlvbiA9IF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgXCJwb3NpdGlvblwiKSk7XG4gICAgcGFyZW50ID09PSB0YXJnZXQgJiYgKHN0eWxlLnBvc2l0aW9uID0gXCJzdGF0aWNcIik7IC8vIGxpa2UgZm9yIGJvcmRlclJhZGl1cywgaWYgaXQncyBhICUgd2UgbXVzdCBoYXZlIGl0IHJlbGF0aXZlIHRvIHRoZSB0YXJnZXQgaXRzZWxmIGJ1dCB0aGF0IG1heSBub3QgaGF2ZSBwb3NpdGlvbjogcmVsYXRpdmUgb3IgcG9zaXRpb246IGFic29sdXRlIGluIHdoaWNoIGNhc2UgaXQnZCBnbyB1cCB0aGUgY2hhaW4gdW50aWwgaXQgZmluZHMgaXRzIG9mZnNldFBhcmVudCAoYmFkKS4gcG9zaXRpb246IHN0YXRpYyBwcm90ZWN0cyBhZ2FpbnN0IHRoYXQuXG5cbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoX3RlbXBEaXYpO1xuICAgIHB4ID0gX3RlbXBEaXZbbWVhc3VyZVByb3BlcnR5XTtcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoX3RlbXBEaXYpO1xuICAgIHN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXG4gICAgaWYgKGhvcml6b250YWwgJiYgdG9QZXJjZW50KSB7XG4gICAgICBjYWNoZSA9IF9nZXRDYWNoZShwYXJlbnQpO1xuICAgICAgY2FjaGUudGltZSA9IF90aWNrZXIudGltZTtcbiAgICAgIGNhY2hlLndpZHRoID0gcGFyZW50W21lYXN1cmVQcm9wZXJ0eV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9yb3VuZCh0b1BpeGVscyA/IHB4ICogY3VyVmFsdWUgLyBhbW91bnQgOiBweCAmJiBjdXJWYWx1ZSA/IGFtb3VudCAvIHB4ICogY3VyVmFsdWUgOiAwKTtcbn0sXG4gICAgX2dldCA9IGZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdW5pdCwgdW5jYWNoZSkge1xuICB2YXIgdmFsdWU7XG4gIF9wbHVnaW5Jbml0dGVkIHx8IF9pbml0Q29yZSgpO1xuXG4gIGlmIChwcm9wZXJ0eSBpbiBfcHJvcGVydHlBbGlhc2VzICYmIHByb3BlcnR5ICE9PSBcInRyYW5zZm9ybVwiKSB7XG4gICAgcHJvcGVydHkgPSBfcHJvcGVydHlBbGlhc2VzW3Byb3BlcnR5XTtcblxuICAgIGlmICh+cHJvcGVydHkuaW5kZXhPZihcIixcIikpIHtcbiAgICAgIHByb3BlcnR5ID0gcHJvcGVydHkuc3BsaXQoXCIsXCIpWzBdO1xuICAgIH1cbiAgfVxuXG4gIGlmIChfdHJhbnNmb3JtUHJvcHNbcHJvcGVydHldICYmIHByb3BlcnR5ICE9PSBcInRyYW5zZm9ybVwiKSB7XG4gICAgdmFsdWUgPSBfcGFyc2VUcmFuc2Zvcm0odGFyZ2V0LCB1bmNhY2hlKTtcbiAgICB2YWx1ZSA9IHByb3BlcnR5ICE9PSBcInRyYW5zZm9ybU9yaWdpblwiID8gdmFsdWVbcHJvcGVydHldIDogdmFsdWUuc3ZnID8gdmFsdWUub3JpZ2luIDogX2ZpcnN0VHdvT25seShfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIF90cmFuc2Zvcm1PcmlnaW5Qcm9wKSkgKyBcIiBcIiArIHZhbHVlLnpPcmlnaW4gKyBcInB4XCI7XG4gIH0gZWxzZSB7XG4gICAgdmFsdWUgPSB0YXJnZXQuc3R5bGVbcHJvcGVydHldO1xuXG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gXCJhdXRvXCIgfHwgdW5jYWNoZSB8fCB+KHZhbHVlICsgXCJcIikuaW5kZXhPZihcImNhbGMoXCIpKSB7XG4gICAgICB2YWx1ZSA9IF9zcGVjaWFsUHJvcHNbcHJvcGVydHldICYmIF9zcGVjaWFsUHJvcHNbcHJvcGVydHldKHRhcmdldCwgcHJvcGVydHksIHVuaXQpIHx8IF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgcHJvcGVydHkpIHx8IF9nZXRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5KSB8fCAocHJvcGVydHkgPT09IFwib3BhY2l0eVwiID8gMSA6IDApOyAvLyBub3RlOiBzb21lIGJyb3dzZXJzLCBsaWtlIEZpcmVmb3gsIGRvbid0IHJlcG9ydCBib3JkZXJSYWRpdXMgY29ycmVjdGx5ISBJbnN0ZWFkLCBpdCBvbmx5IHJlcG9ydHMgZXZlcnkgY29ybmVyIGxpa2UgIGJvcmRlclRvcExlZnRSYWRpdXNcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5pdCAmJiAhfih2YWx1ZSArIFwiXCIpLnRyaW0oKS5pbmRleE9mKFwiIFwiKSA/IF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCB1bml0KSArIHVuaXQgOiB2YWx1ZTtcbn0sXG4gICAgX3R3ZWVuQ29tcGxleENTU1N0cmluZyA9IGZ1bmN0aW9uIF90d2VlbkNvbXBsZXhDU1NTdHJpbmcodGFyZ2V0LCBwcm9wLCBzdGFydCwgZW5kKSB7XG4gIC8vIG5vdGU6IHdlIGNhbGwgX3R3ZWVuQ29tcGxleENTU1N0cmluZy5jYWxsKHBsdWdpbkluc3RhbmNlLi4uKSB0byBlbnN1cmUgdGhhdCBpdCdzIHNjb3BlZCBwcm9wZXJseS4gV2UgbWF5IGNhbGwgaXQgZnJvbSB3aXRoaW4gYSBwbHVnaW4gdG9vLCB0aHVzIFwidGhpc1wiIHdvdWxkIHJlZmVyIHRvIHRoZSBwbHVnaW4uXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPT09IFwibm9uZVwiKSB7XG4gICAgLy8gc29tZSBicm93c2VycyBsaWtlIFNhZmFyaSBhY3R1YWxseSBQUkVGRVIgdGhlIHByZWZpeGVkIHByb3BlcnR5IGFuZCBtaXMtcmVwb3J0IHRoZSB1bnByZWZpeGVkIHZhbHVlIGxpa2UgY2xpcFBhdGggKEJVRykuIEluIG90aGVyIHdvcmRzLCBldmVuIHRob3VnaCBjbGlwUGF0aCBleGlzdHMgaW4gdGhlIHN0eWxlIChcImNsaXBQYXRoXCIgaW4gdGFyZ2V0LnN0eWxlKSBhbmQgaXQncyBzZXQgaW4gdGhlIENTUyBwcm9wZXJseSAoYWxvbmcgd2l0aCAtd2Via2l0LWNsaXAtcGF0aCksIFNhZmFyaSByZXBvcnRzIGNsaXBQYXRoIGFzIFwibm9uZVwiIHdoZXJlYXMgV2Via2l0Q2xpcFBhdGggcmVwb3J0cyBhY2N1cmF0ZWx5IGxpa2UgXCJlbGxpcHNlKDEwMCUgMCUgYXQgNTAlIDAlKVwiLCBzbyBpbiB0aGlzIGNhc2Ugd2UgbXVzdCBTV0lUQ0ggdG8gdXNpbmcgdGhlIHByZWZpeGVkIHByb3BlcnR5IGluc3RlYWQuIFNlZSBodHRwczovL2dyZWVuc29jay5jb20vZm9ydW1zL3RvcGljLzE4MzEwLWNsaXBwYXRoLWRvZXNudC13b3JrLW9uLWlvcy9cbiAgICB2YXIgcCA9IF9jaGVja1Byb3BQcmVmaXgocHJvcCwgdGFyZ2V0LCAxKSxcbiAgICAgICAgcyA9IHAgJiYgX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBwLCAxKTtcblxuICAgIGlmIChzICYmIHMgIT09IHN0YXJ0KSB7XG4gICAgICBwcm9wID0gcDtcbiAgICAgIHN0YXJ0ID0gcztcbiAgICB9IGVsc2UgaWYgKHByb3AgPT09IFwiYm9yZGVyQ29sb3JcIikge1xuICAgICAgc3RhcnQgPSBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIFwiYm9yZGVyVG9wQ29sb3JcIik7IC8vIEZpcmVmb3ggYnVnOiBhbHdheXMgcmVwb3J0cyBcImJvcmRlckNvbG9yXCIgYXMgXCJcIiwgc28gd2UgbXVzdCBmYWxsIGJhY2sgdG8gYm9yZGVyVG9wQ29sb3IuIFNlZSBodHRwczovL2dyZWVuc29jay5jb20vZm9ydW1zL3RvcGljLzI0NTgzLWhvdy10by1yZXR1cm4tY29sb3JzLXRoYXQtaS1oYWQtYWZ0ZXItcmV2ZXJzZS9cbiAgICB9XG4gIH1cblxuICB2YXIgcHQgPSBuZXcgUHJvcFR3ZWVuKHRoaXMuX3B0LCB0YXJnZXQuc3R5bGUsIHByb3AsIDAsIDEsIF9yZW5kZXJDb21wbGV4U3RyaW5nKSxcbiAgICAgIGluZGV4ID0gMCxcbiAgICAgIG1hdGNoSW5kZXggPSAwLFxuICAgICAgYSxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHN0YXJ0VmFsdWVzLFxuICAgICAgc3RhcnROdW0sXG4gICAgICBjb2xvcixcbiAgICAgIHN0YXJ0VmFsdWUsXG4gICAgICBlbmRWYWx1ZSxcbiAgICAgIGVuZE51bSxcbiAgICAgIGNodW5rLFxuICAgICAgZW5kVW5pdCxcbiAgICAgIHN0YXJ0VW5pdCxcbiAgICAgIGVuZFZhbHVlcztcbiAgcHQuYiA9IHN0YXJ0O1xuICBwdC5lID0gZW5kO1xuICBzdGFydCArPSBcIlwiOyAvLyBlbnN1cmUgdmFsdWVzIGFyZSBzdHJpbmdzXG5cbiAgZW5kICs9IFwiXCI7XG5cbiAgaWYgKGVuZCA9PT0gXCJhdXRvXCIpIHtcbiAgICB0YXJnZXQuc3R5bGVbcHJvcF0gPSBlbmQ7XG4gICAgZW5kID0gX2dldENvbXB1dGVkUHJvcGVydHkodGFyZ2V0LCBwcm9wKSB8fCBlbmQ7XG4gICAgdGFyZ2V0LnN0eWxlW3Byb3BdID0gc3RhcnQ7XG4gIH1cblxuICBhID0gW3N0YXJ0LCBlbmRdO1xuXG4gIF9jb2xvclN0cmluZ0ZpbHRlcihhKTsgLy8gcGFzcyBhbiBhcnJheSB3aXRoIHRoZSBzdGFydGluZyBhbmQgZW5kaW5nIHZhbHVlcyBhbmQgbGV0IHRoZSBmaWx0ZXIgZG8gd2hhdGV2ZXIgaXQgbmVlZHMgdG8gdGhlIHZhbHVlcy4gSWYgY29sb3JzIGFyZSBmb3VuZCwgaXQgcmV0dXJucyB0cnVlIGFuZCB0aGVuIHdlIG11c3QgbWF0Y2ggd2hlcmUgdGhlIGNvbG9yIHNob3dzIHVwIG9yZGVyLXdpc2UgYmVjYXVzZSBmb3IgdGhpbmdzIGxpa2UgYm94U2hhZG93LCBzb21ldGltZXMgdGhlIGJyb3dzZXIgcHJvdmlkZXMgdGhlIGNvbXB1dGVkIHZhbHVlcyB3aXRoIHRoZSBjb2xvciBGSVJTVCwgYnV0IHRoZSB1c2VyIHByb3ZpZGVzIGl0IHdpdGggdGhlIGNvbG9yIExBU1QsIHNvIGZsaXAgdGhlbSBpZiBuZWNlc3NhcnkuIFNhbWUgZm9yIGRyb3Atc2hhZG93KCkuXG5cblxuICBzdGFydCA9IGFbMF07XG4gIGVuZCA9IGFbMV07XG4gIHN0YXJ0VmFsdWVzID0gc3RhcnQubWF0Y2goX251bVdpdGhVbml0RXhwKSB8fCBbXTtcbiAgZW5kVmFsdWVzID0gZW5kLm1hdGNoKF9udW1XaXRoVW5pdEV4cCkgfHwgW107XG5cbiAgaWYgKGVuZFZhbHVlcy5sZW5ndGgpIHtcbiAgICB3aGlsZSAocmVzdWx0ID0gX251bVdpdGhVbml0RXhwLmV4ZWMoZW5kKSkge1xuICAgICAgZW5kVmFsdWUgPSByZXN1bHRbMF07XG4gICAgICBjaHVuayA9IGVuZC5zdWJzdHJpbmcoaW5kZXgsIHJlc3VsdC5pbmRleCk7XG5cbiAgICAgIGlmIChjb2xvcikge1xuICAgICAgICBjb2xvciA9IChjb2xvciArIDEpICUgNTtcbiAgICAgIH0gZWxzZSBpZiAoY2h1bmsuc3Vic3RyKC01KSA9PT0gXCJyZ2JhKFwiIHx8IGNodW5rLnN1YnN0cigtNSkgPT09IFwiaHNsYShcIikge1xuICAgICAgICBjb2xvciA9IDE7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbmRWYWx1ZSAhPT0gKHN0YXJ0VmFsdWUgPSBzdGFydFZhbHVlc1ttYXRjaEluZGV4KytdIHx8IFwiXCIpKSB7XG4gICAgICAgIHN0YXJ0TnVtID0gcGFyc2VGbG9hdChzdGFydFZhbHVlKSB8fCAwO1xuICAgICAgICBzdGFydFVuaXQgPSBzdGFydFZhbHVlLnN1YnN0cigoc3RhcnROdW0gKyBcIlwiKS5sZW5ndGgpO1xuICAgICAgICBlbmRWYWx1ZS5jaGFyQXQoMSkgPT09IFwiPVwiICYmIChlbmRWYWx1ZSA9IF9wYXJzZVJlbGF0aXZlKHN0YXJ0TnVtLCBlbmRWYWx1ZSkgKyBzdGFydFVuaXQpO1xuICAgICAgICBlbmROdW0gPSBwYXJzZUZsb2F0KGVuZFZhbHVlKTtcbiAgICAgICAgZW5kVW5pdCA9IGVuZFZhbHVlLnN1YnN0cigoZW5kTnVtICsgXCJcIikubGVuZ3RoKTtcbiAgICAgICAgaW5kZXggPSBfbnVtV2l0aFVuaXRFeHAubGFzdEluZGV4IC0gZW5kVW5pdC5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCFlbmRVbml0KSB7XG4gICAgICAgICAgLy9pZiBzb21ldGhpbmcgbGlrZSBcInBlcnNwZWN0aXZlOjMwMFwiIGlzIHBhc3NlZCBpbiBhbmQgd2UgbXVzdCBhZGQgYSB1bml0IHRvIHRoZSBlbmRcbiAgICAgICAgICBlbmRVbml0ID0gZW5kVW5pdCB8fCBfY29uZmlnLnVuaXRzW3Byb3BdIHx8IHN0YXJ0VW5pdDtcblxuICAgICAgICAgIGlmIChpbmRleCA9PT0gZW5kLmxlbmd0aCkge1xuICAgICAgICAgICAgZW5kICs9IGVuZFVuaXQ7XG4gICAgICAgICAgICBwdC5lICs9IGVuZFVuaXQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXJ0VW5pdCAhPT0gZW5kVW5pdCkge1xuICAgICAgICAgIHN0YXJ0TnVtID0gX2NvbnZlcnRUb1VuaXQodGFyZ2V0LCBwcm9wLCBzdGFydFZhbHVlLCBlbmRVbml0KSB8fCAwO1xuICAgICAgICB9IC8vIHRoZXNlIG5lc3RlZCBQcm9wVHdlZW5zIGFyZSBoYW5kbGVkIGluIGEgc3BlY2lhbCB3YXkgLSB3ZSdsbCBuZXZlciBhY3R1YWxseSBjYWxsIGEgcmVuZGVyIG9yIHNldHRlciBtZXRob2Qgb24gdGhlbS4gV2UnbGwganVzdCBsb29wIHRocm91Z2ggdGhlbSBpbiB0aGUgcGFyZW50IGNvbXBsZXggc3RyaW5nIFByb3BUd2VlbidzIHJlbmRlciBtZXRob2QuXG5cblxuICAgICAgICBwdC5fcHQgPSB7XG4gICAgICAgICAgX25leHQ6IHB0Ll9wdCxcbiAgICAgICAgICBwOiBjaHVuayB8fCBtYXRjaEluZGV4ID09PSAxID8gY2h1bmsgOiBcIixcIixcbiAgICAgICAgICAvL25vdGU6IFNWRyBzcGVjIGFsbG93cyBvbWlzc2lvbiBvZiBjb21tYS9zcGFjZSB3aGVuIGEgbmVnYXRpdmUgc2lnbiBpcyB3ZWRnZWQgYmV0d2VlbiB0d28gbnVtYmVycywgbGlrZSAyLjUtNS4zIGluc3RlYWQgb2YgMi41LC01LjMgYnV0IHdoZW4gdHdlZW5pbmcsIHRoZSBuZWdhdGl2ZSB2YWx1ZSBtYXkgc3dpdGNoIHRvIHBvc2l0aXZlLCBzbyB3ZSBpbnNlcnQgdGhlIGNvbW1hIGp1c3QgaW4gY2FzZS5cbiAgICAgICAgICBzOiBzdGFydE51bSxcbiAgICAgICAgICBjOiBlbmROdW0gLSBzdGFydE51bSxcbiAgICAgICAgICBtOiBjb2xvciAmJiBjb2xvciA8IDQgfHwgcHJvcCA9PT0gXCJ6SW5kZXhcIiA/IE1hdGgucm91bmQgOiAwXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHQuYyA9IGluZGV4IDwgZW5kLmxlbmd0aCA/IGVuZC5zdWJzdHJpbmcoaW5kZXgsIGVuZC5sZW5ndGgpIDogXCJcIjsgLy93ZSB1c2UgdGhlIFwiY1wiIG9mIHRoZSBQcm9wVHdlZW4gdG8gc3RvcmUgdGhlIGZpbmFsIHBhcnQgb2YgdGhlIHN0cmluZyAoYWZ0ZXIgdGhlIGxhc3QgbnVtYmVyKVxuICB9IGVsc2Uge1xuICAgIHB0LnIgPSBwcm9wID09PSBcImRpc3BsYXlcIiAmJiBlbmQgPT09IFwibm9uZVwiID8gX3JlbmRlck5vblR3ZWVuaW5nVmFsdWVPbmx5QXRFbmQgOiBfcmVuZGVyTm9uVHdlZW5pbmdWYWx1ZTtcbiAgfVxuXG4gIF9yZWxFeHAudGVzdChlbmQpICYmIChwdC5lID0gMCk7IC8vaWYgdGhlIGVuZCBzdHJpbmcgY29udGFpbnMgcmVsYXRpdmUgdmFsdWVzIG9yIGR5bmFtaWMgcmFuZG9tKC4uLikgdmFsdWVzLCBkZWxldGUgdGhlIGVuZCBpdCBzbyB0aGF0IG9uIHRoZSBmaW5hbCByZW5kZXIgd2UgZG9uJ3QgYWN0dWFsbHkgc2V0IGl0IHRvIHRoZSBzdHJpbmcgd2l0aCArPSBvciAtPSBjaGFyYWN0ZXJzIChmb3JjZXMgaXQgdG8gdXNlIHRoZSBjYWxjdWxhdGVkIHZhbHVlKS5cblxuICB0aGlzLl9wdCA9IHB0OyAvL3N0YXJ0IHRoZSBsaW5rZWQgbGlzdCB3aXRoIHRoaXMgbmV3IFByb3BUd2Vlbi4gUmVtZW1iZXIsIHdlIGNhbGwgX3R3ZWVuQ29tcGxleENTU1N0cmluZy5jYWxsKHBsdWdpbkluc3RhbmNlLi4uKSB0byBlbnN1cmUgdGhhdCBpdCdzIHNjb3BlZCBwcm9wZXJseS4gV2UgbWF5IGNhbGwgaXQgZnJvbSB3aXRoaW4gYW5vdGhlciBwbHVnaW4gdG9vLCB0aHVzIFwidGhpc1wiIHdvdWxkIHJlZmVyIHRvIHRoZSBwbHVnaW4uXG5cbiAgcmV0dXJuIHB0O1xufSxcbiAgICBfa2V5d29yZFRvUGVyY2VudCA9IHtcbiAgdG9wOiBcIjAlXCIsXG4gIGJvdHRvbTogXCIxMDAlXCIsXG4gIGxlZnQ6IFwiMCVcIixcbiAgcmlnaHQ6IFwiMTAwJVwiLFxuICBjZW50ZXI6IFwiNTAlXCJcbn0sXG4gICAgX2NvbnZlcnRLZXl3b3Jkc1RvUGVyY2VudGFnZXMgPSBmdW5jdGlvbiBfY29udmVydEtleXdvcmRzVG9QZXJjZW50YWdlcyh2YWx1ZSkge1xuICB2YXIgc3BsaXQgPSB2YWx1ZS5zcGxpdChcIiBcIiksXG4gICAgICB4ID0gc3BsaXRbMF0sXG4gICAgICB5ID0gc3BsaXRbMV0gfHwgXCI1MCVcIjtcblxuICBpZiAoeCA9PT0gXCJ0b3BcIiB8fCB4ID09PSBcImJvdHRvbVwiIHx8IHkgPT09IFwibGVmdFwiIHx8IHkgPT09IFwicmlnaHRcIikge1xuICAgIC8vdGhlIHVzZXIgcHJvdmlkZWQgdGhlbSBpbiB0aGUgd3Jvbmcgb3JkZXIsIHNvIGZsaXAgdGhlbVxuICAgIHZhbHVlID0geDtcbiAgICB4ID0geTtcbiAgICB5ID0gdmFsdWU7XG4gIH1cblxuICBzcGxpdFswXSA9IF9rZXl3b3JkVG9QZXJjZW50W3hdIHx8IHg7XG4gIHNwbGl0WzFdID0gX2tleXdvcmRUb1BlcmNlbnRbeV0gfHwgeTtcbiAgcmV0dXJuIHNwbGl0LmpvaW4oXCIgXCIpO1xufSxcbiAgICBfcmVuZGVyQ2xlYXJQcm9wcyA9IGZ1bmN0aW9uIF9yZW5kZXJDbGVhclByb3BzKHJhdGlvLCBkYXRhKSB7XG4gIGlmIChkYXRhLnR3ZWVuICYmIGRhdGEudHdlZW4uX3RpbWUgPT09IGRhdGEudHdlZW4uX2R1cikge1xuICAgIHZhciB0YXJnZXQgPSBkYXRhLnQsXG4gICAgICAgIHN0eWxlID0gdGFyZ2V0LnN0eWxlLFxuICAgICAgICBwcm9wcyA9IGRhdGEudSxcbiAgICAgICAgY2FjaGUgPSB0YXJnZXQuX2dzYXAsXG4gICAgICAgIHByb3AsXG4gICAgICAgIGNsZWFyVHJhbnNmb3JtcyxcbiAgICAgICAgaTtcblxuICAgIGlmIChwcm9wcyA9PT0gXCJhbGxcIiB8fCBwcm9wcyA9PT0gdHJ1ZSkge1xuICAgICAgc3R5bGUuY3NzVGV4dCA9IFwiXCI7XG4gICAgICBjbGVhclRyYW5zZm9ybXMgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9wcyA9IHByb3BzLnNwbGl0KFwiLFwiKTtcbiAgICAgIGkgPSBwcm9wcy5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgtLWkgPiAtMSkge1xuICAgICAgICBwcm9wID0gcHJvcHNbaV07XG5cbiAgICAgICAgaWYgKF90cmFuc2Zvcm1Qcm9wc1twcm9wXSkge1xuICAgICAgICAgIGNsZWFyVHJhbnNmb3JtcyA9IDE7XG4gICAgICAgICAgcHJvcCA9IHByb3AgPT09IFwidHJhbnNmb3JtT3JpZ2luXCIgPyBfdHJhbnNmb3JtT3JpZ2luUHJvcCA6IF90cmFuc2Zvcm1Qcm9wO1xuICAgICAgICB9XG5cbiAgICAgICAgX3JlbW92ZVByb3BlcnR5KHRhcmdldCwgcHJvcCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNsZWFyVHJhbnNmb3Jtcykge1xuICAgICAgX3JlbW92ZVByb3BlcnR5KHRhcmdldCwgX3RyYW5zZm9ybVByb3ApO1xuXG4gICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgY2FjaGUuc3ZnICYmIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIik7XG5cbiAgICAgICAgX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgMSk7IC8vIGZvcmNlIGFsbCB0aGUgY2FjaGVkIHZhbHVlcyBiYWNrIHRvIFwibm9ybWFsXCIvaWRlbnRpdHksIG90aGVyd2lzZSBpZiB0aGVyZSdzIGFub3RoZXIgdHdlZW4gdGhhdCdzIGFscmVhZHkgc2V0IHRvIHJlbmRlciB0cmFuc2Zvcm1zIG9uIHRoaXMgZWxlbWVudCwgaXQgY291bGQgZGlzcGxheSB0aGUgd3JvbmcgdmFsdWVzLlxuXG5cbiAgICAgICAgY2FjaGUudW5jYWNoZSA9IDE7XG5cbiAgICAgICAgX3JlbW92ZUluZGVwZW5kZW50VHJhbnNmb3JtcyhzdHlsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59LFxuICAgIC8vIG5vdGU6IHNwZWNpYWxQcm9wcyBzaG91bGQgcmV0dXJuIDEgaWYgKGFuZCBvbmx5IGlmKSB0aGV5IGhhdmUgYSBub24temVybyBwcmlvcml0eS4gSXQgaW5kaWNhdGVzIHdlIG5lZWQgdG8gc29ydCB0aGUgbGlua2VkIGxpc3QuXG5fc3BlY2lhbFByb3BzID0ge1xuICBjbGVhclByb3BzOiBmdW5jdGlvbiBjbGVhclByb3BzKHBsdWdpbiwgdGFyZ2V0LCBwcm9wZXJ0eSwgZW5kVmFsdWUsIHR3ZWVuKSB7XG4gICAgaWYgKHR3ZWVuLmRhdGEgIT09IFwiaXNGcm9tU3RhcnRcIikge1xuICAgICAgdmFyIHB0ID0gcGx1Z2luLl9wdCA9IG5ldyBQcm9wVHdlZW4ocGx1Z2luLl9wdCwgdGFyZ2V0LCBwcm9wZXJ0eSwgMCwgMCwgX3JlbmRlckNsZWFyUHJvcHMpO1xuICAgICAgcHQudSA9IGVuZFZhbHVlO1xuICAgICAgcHQucHIgPSAtMTA7XG4gICAgICBwdC50d2VlbiA9IHR3ZWVuO1xuXG4gICAgICBwbHVnaW4uX3Byb3BzLnB1c2gocHJvcGVydHkpO1xuXG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH1cbiAgLyogY2xhc3NOYW1lIGZlYXR1cmUgKGFib3V0IDAuNGtiIGd6aXBwZWQpLlxuICAsIGNsYXNzTmFtZShwbHVnaW4sIHRhcmdldCwgcHJvcGVydHksIGVuZFZhbHVlLCB0d2Vlbikge1xuICBcdGxldCBfcmVuZGVyQ2xhc3NOYW1lID0gKHJhdGlvLCBkYXRhKSA9PiB7XG4gIFx0XHRcdGRhdGEuY3NzLnJlbmRlcihyYXRpbywgZGF0YS5jc3MpO1xuICBcdFx0XHRpZiAoIXJhdGlvIHx8IHJhdGlvID09PSAxKSB7XG4gIFx0XHRcdFx0bGV0IGlubGluZSA9IGRhdGEucm12LFxuICBcdFx0XHRcdFx0dGFyZ2V0ID0gZGF0YS50LFxuICBcdFx0XHRcdFx0cDtcbiAgXHRcdFx0XHR0YXJnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgcmF0aW8gPyBkYXRhLmUgOiBkYXRhLmIpO1xuICBcdFx0XHRcdGZvciAocCBpbiBpbmxpbmUpIHtcbiAgXHRcdFx0XHRcdF9yZW1vdmVQcm9wZXJ0eSh0YXJnZXQsIHApO1xuICBcdFx0XHRcdH1cbiAgXHRcdFx0fVxuICBcdFx0fSxcbiAgXHRcdF9nZXRBbGxTdHlsZXMgPSAodGFyZ2V0KSA9PiB7XG4gIFx0XHRcdGxldCBzdHlsZXMgPSB7fSxcbiAgXHRcdFx0XHRjb21wdXRlZCA9IGdldENvbXB1dGVkU3R5bGUodGFyZ2V0KSxcbiAgXHRcdFx0XHRwO1xuICBcdFx0XHRmb3IgKHAgaW4gY29tcHV0ZWQpIHtcbiAgXHRcdFx0XHRpZiAoaXNOYU4ocCkgJiYgcCAhPT0gXCJjc3NUZXh0XCIgJiYgcCAhPT0gXCJsZW5ndGhcIikge1xuICBcdFx0XHRcdFx0c3R5bGVzW3BdID0gY29tcHV0ZWRbcF07XG4gIFx0XHRcdFx0fVxuICBcdFx0XHR9XG4gIFx0XHRcdF9zZXREZWZhdWx0cyhzdHlsZXMsIF9wYXJzZVRyYW5zZm9ybSh0YXJnZXQsIDEpKTtcbiAgXHRcdFx0cmV0dXJuIHN0eWxlcztcbiAgXHRcdH0sXG4gIFx0XHRzdGFydENsYXNzTGlzdCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSxcbiAgXHRcdHN0eWxlID0gdGFyZ2V0LnN0eWxlLFxuICBcdFx0Y3NzVGV4dCA9IHN0eWxlLmNzc1RleHQsXG4gIFx0XHRjYWNoZSA9IHRhcmdldC5fZ3NhcCxcbiAgXHRcdGNsYXNzUFQgPSBjYWNoZS5jbGFzc1BULFxuICBcdFx0aW5saW5lVG9SZW1vdmVBdEVuZCA9IHt9LFxuICBcdFx0ZGF0YSA9IHt0OnRhcmdldCwgcGx1Z2luOnBsdWdpbiwgcm12OmlubGluZVRvUmVtb3ZlQXRFbmQsIGI6c3RhcnRDbGFzc0xpc3QsIGU6KGVuZFZhbHVlLmNoYXJBdCgxKSAhPT0gXCI9XCIpID8gZW5kVmFsdWUgOiBzdGFydENsYXNzTGlzdC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoPzpcXFxcc3xeKVwiICsgZW5kVmFsdWUuc3Vic3RyKDIpICsgXCIoPyFbXFxcXHctXSlcIiksIFwiXCIpICsgKChlbmRWYWx1ZS5jaGFyQXQoMCkgPT09IFwiK1wiKSA/IFwiIFwiICsgZW5kVmFsdWUuc3Vic3RyKDIpIDogXCJcIil9LFxuICBcdFx0Y2hhbmdpbmdWYXJzID0ge30sXG4gIFx0XHRzdGFydFZhcnMgPSBfZ2V0QWxsU3R5bGVzKHRhcmdldCksXG4gIFx0XHR0cmFuc2Zvcm1SZWxhdGVkID0gLyh0cmFuc2Zvcm18cGVyc3BlY3RpdmUpL2ksXG4gIFx0XHRlbmRWYXJzLCBwO1xuICBcdGlmIChjbGFzc1BUKSB7XG4gIFx0XHRjbGFzc1BULnIoMSwgY2xhc3NQVC5kKTtcbiAgXHRcdF9yZW1vdmVMaW5rZWRMaXN0SXRlbShjbGFzc1BULmQucGx1Z2luLCBjbGFzc1BULCBcIl9wdFwiKTtcbiAgXHR9XG4gIFx0dGFyZ2V0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGRhdGEuZSk7XG4gIFx0ZW5kVmFycyA9IF9nZXRBbGxTdHlsZXModGFyZ2V0LCB0cnVlKTtcbiAgXHR0YXJnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgc3RhcnRDbGFzc0xpc3QpO1xuICBcdGZvciAocCBpbiBlbmRWYXJzKSB7XG4gIFx0XHRpZiAoZW5kVmFyc1twXSAhPT0gc3RhcnRWYXJzW3BdICYmICF0cmFuc2Zvcm1SZWxhdGVkLnRlc3QocCkpIHtcbiAgXHRcdFx0Y2hhbmdpbmdWYXJzW3BdID0gZW5kVmFyc1twXTtcbiAgXHRcdFx0aWYgKCFzdHlsZVtwXSAmJiBzdHlsZVtwXSAhPT0gXCIwXCIpIHtcbiAgXHRcdFx0XHRpbmxpbmVUb1JlbW92ZUF0RW5kW3BdID0gMTtcbiAgXHRcdFx0fVxuICBcdFx0fVxuICBcdH1cbiAgXHRjYWNoZS5jbGFzc1BUID0gcGx1Z2luLl9wdCA9IG5ldyBQcm9wVHdlZW4ocGx1Z2luLl9wdCwgdGFyZ2V0LCBcImNsYXNzTmFtZVwiLCAwLCAwLCBfcmVuZGVyQ2xhc3NOYW1lLCBkYXRhLCAwLCAtMTEpO1xuICBcdGlmIChzdHlsZS5jc3NUZXh0ICE9PSBjc3NUZXh0KSB7IC8vb25seSBhcHBseSBpZiB0aGluZ3MgY2hhbmdlLiBPdGhlcndpc2UsIGluIGNhc2VzIGxpa2UgYSBiYWNrZ3JvdW5kLWltYWdlIHRoYXQncyBwdWxsZWQgZHluYW1pY2FsbHksIGl0IGNvdWxkIGNhdXNlIGEgcmVmcmVzaC4gU2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMjAzNjgtcG9zc2libGUtZ3NhcC1idWctc3dpdGNoaW5nLWNsYXNzbmFtZXMtaW4tY2hyb21lLy5cbiAgXHRcdHN0eWxlLmNzc1RleHQgPSBjc3NUZXh0OyAvL3dlIHJlY29yZGVkIGNzc1RleHQgYmVmb3JlIHdlIHN3YXBwZWQgY2xhc3NlcyBhbmQgcmFuIF9nZXRBbGxTdHlsZXMoKSBiZWNhdXNlIGluIGNhc2VzIHdoZW4gYSBjbGFzc05hbWUgdHdlZW4gaXMgb3ZlcndyaXR0ZW4sIHdlIHJlbW92ZSBhbGwgdGhlIHJlbGF0ZWQgdHdlZW5pbmcgcHJvcGVydGllcyBmcm9tIHRoYXQgY2xhc3MgY2hhbmdlIChvdGhlcndpc2UgY2xhc3Mtc3BlY2lmaWMgc3R1ZmYgY2FuJ3Qgb3ZlcnJpZGUgcHJvcGVydGllcyB3ZSd2ZSBkaXJlY3RseSBzZXQgb24gdGhlIHRhcmdldCdzIHN0eWxlIG9iamVjdCBkdWUgdG8gc3BlY2lmaWNpdHkpLlxuICBcdH1cbiAgXHRfcGFyc2VUcmFuc2Zvcm0odGFyZ2V0LCB0cnVlKTsgLy90byBjbGVhciB0aGUgY2FjaGluZyBvZiB0cmFuc2Zvcm1zXG4gIFx0ZGF0YS5jc3MgPSBuZXcgZ3NhcC5wbHVnaW5zLmNzcygpO1xuICBcdGRhdGEuY3NzLmluaXQodGFyZ2V0LCBjaGFuZ2luZ1ZhcnMsIHR3ZWVuKTtcbiAgXHRwbHVnaW4uX3Byb3BzLnB1c2goLi4uZGF0YS5jc3MuX3Byb3BzKTtcbiAgXHRyZXR1cm4gMTtcbiAgfVxuICAqL1xuXG59LFxuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRSQU5TRk9STVNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cbl9pZGVudGl0eTJETWF0cml4ID0gWzEsIDAsIDAsIDEsIDAsIDBdLFxuICAgIF9yb3RhdGlvbmFsUHJvcGVydGllcyA9IHt9LFxuICAgIF9pc051bGxUcmFuc2Zvcm0gPSBmdW5jdGlvbiBfaXNOdWxsVHJhbnNmb3JtKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gXCJtYXRyaXgoMSwgMCwgMCwgMSwgMCwgMClcIiB8fCB2YWx1ZSA9PT0gXCJub25lXCIgfHwgIXZhbHVlO1xufSxcbiAgICBfZ2V0Q29tcHV0ZWRUcmFuc2Zvcm1NYXRyaXhBc0FycmF5ID0gZnVuY3Rpb24gX2dldENvbXB1dGVkVHJhbnNmb3JtTWF0cml4QXNBcnJheSh0YXJnZXQpIHtcbiAgdmFyIG1hdHJpeFN0cmluZyA9IF9nZXRDb21wdXRlZFByb3BlcnR5KHRhcmdldCwgX3RyYW5zZm9ybVByb3ApO1xuXG4gIHJldHVybiBfaXNOdWxsVHJhbnNmb3JtKG1hdHJpeFN0cmluZykgPyBfaWRlbnRpdHkyRE1hdHJpeCA6IG1hdHJpeFN0cmluZy5zdWJzdHIoNykubWF0Y2goX251bUV4cCkubWFwKF9yb3VuZCk7XG59LFxuICAgIF9nZXRNYXRyaXggPSBmdW5jdGlvbiBfZ2V0TWF0cml4KHRhcmdldCwgZm9yY2UyRCkge1xuICB2YXIgY2FjaGUgPSB0YXJnZXQuX2dzYXAgfHwgX2dldENhY2hlKHRhcmdldCksXG4gICAgICBzdHlsZSA9IHRhcmdldC5zdHlsZSxcbiAgICAgIG1hdHJpeCA9IF9nZXRDb21wdXRlZFRyYW5zZm9ybU1hdHJpeEFzQXJyYXkodGFyZ2V0KSxcbiAgICAgIHBhcmVudCxcbiAgICAgIG5leHRTaWJsaW5nLFxuICAgICAgdGVtcCxcbiAgICAgIGFkZGVkVG9ET007XG5cbiAgaWYgKGNhY2hlLnN2ZyAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIpKSB7XG4gICAgdGVtcCA9IHRhcmdldC50cmFuc2Zvcm0uYmFzZVZhbC5jb25zb2xpZGF0ZSgpLm1hdHJpeDsgLy9lbnN1cmVzIHRoYXQgZXZlbiBjb21wbGV4IHZhbHVlcyBsaWtlIFwidHJhbnNsYXRlKDUwLDYwKSByb3RhdGUoMTM1LDAsMClcIiBhcmUgcGFyc2VkIGJlY2F1c2UgaXQgbWFzaGVzIGl0IGludG8gYSBtYXRyaXguXG5cbiAgICBtYXRyaXggPSBbdGVtcC5hLCB0ZW1wLmIsIHRlbXAuYywgdGVtcC5kLCB0ZW1wLmUsIHRlbXAuZl07XG4gICAgcmV0dXJuIG1hdHJpeC5qb2luKFwiLFwiKSA9PT0gXCIxLDAsMCwxLDAsMFwiID8gX2lkZW50aXR5MkRNYXRyaXggOiBtYXRyaXg7XG4gIH0gZWxzZSBpZiAobWF0cml4ID09PSBfaWRlbnRpdHkyRE1hdHJpeCAmJiAhdGFyZ2V0Lm9mZnNldFBhcmVudCAmJiB0YXJnZXQgIT09IF9kb2NFbGVtZW50ICYmICFjYWNoZS5zdmcpIHtcbiAgICAvL25vdGU6IGlmIG9mZnNldFBhcmVudCBpcyBudWxsLCB0aGF0IG1lYW5zIHRoZSBlbGVtZW50IGlzbid0IGluIHRoZSBub3JtYWwgZG9jdW1lbnQgZmxvdywgbGlrZSBpZiBpdCBoYXMgZGlzcGxheTpub25lIG9yIG9uZSBvZiBpdHMgYW5jZXN0b3JzIGhhcyBkaXNwbGF5Om5vbmUpLiBGaXJlZm94IHJldHVybnMgbnVsbCBmb3IgZ2V0Q29tcHV0ZWRTdHlsZSgpIGlmIHRoZSBlbGVtZW50IGlzIGluIGFuIGlmcmFtZSB0aGF0IGhhcyBkaXNwbGF5Om5vbmUuIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICAgIC8vYnJvd3NlcnMgZG9uJ3QgcmVwb3J0IHRyYW5zZm9ybXMgYWNjdXJhdGVseSB1bmxlc3MgdGhlIGVsZW1lbnQgaXMgaW4gdGhlIERPTSBhbmQgaGFzIGEgZGlzcGxheSB2YWx1ZSB0aGF0J3Mgbm90IFwibm9uZVwiLiBGaXJlZm94IGFuZCBNaWNyb3NvZnQgYnJvd3NlcnMgaGF2ZSBhIHBhcnRpYWwgYnVnIHdoZXJlIHRoZXknbGwgcmVwb3J0IHRyYW5zZm9ybXMgZXZlbiBpZiBkaXNwbGF5Om5vbmUgQlVUIG5vdCBhbnkgcGVyY2VudGFnZS1iYXNlZCB2YWx1ZXMgbGlrZSB0cmFuc2xhdGUoLTUwJSwgOHB4KSB3aWxsIGJlIHJlcG9ydGVkIGFzIGlmIGl0J3MgdHJhbnNsYXRlKDAsIDhweCkuXG4gICAgdGVtcCA9IHN0eWxlLmRpc3BsYXk7XG4gICAgc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZTtcblxuICAgIGlmICghcGFyZW50IHx8ICF0YXJnZXQub2Zmc2V0UGFyZW50KSB7XG4gICAgICAvLyBub3RlOiBpbiAzLjMuMCB3ZSBzd2l0Y2hlZCB0YXJnZXQub2Zmc2V0UGFyZW50IHRvIF9kb2MuYm9keS5jb250YWlucyh0YXJnZXQpIHRvIGF2b2lkIFtzb21ldGltZXMgdW5uZWNlc3NhcnldIE11dGF0aW9uT2JzZXJ2ZXIgY2FsbHMgYnV0IHRoYXQgd2Fzbid0IGFkZXF1YXRlIGJlY2F1c2UgdGhlcmUgYXJlIGVkZ2UgY2FzZXMgd2hlcmUgbmVzdGVkIHBvc2l0aW9uOiBmaXhlZCBlbGVtZW50cyBuZWVkIHRvIGdldCByZXBhcmVudGVkIHRvIGFjY3VyYXRlbHkgc2Vuc2UgdHJhbnNmb3Jtcy4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmVlbnNvY2svR1NBUC9pc3N1ZXMvMzg4IGFuZCBodHRwczovL2dpdGh1Yi5jb20vZ3JlZW5zb2NrL0dTQVAvaXNzdWVzLzM3NVxuICAgICAgYWRkZWRUb0RPTSA9IDE7IC8vZmxhZ1xuXG4gICAgICBuZXh0U2libGluZyA9IHRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgIF9kb2NFbGVtZW50LmFwcGVuZENoaWxkKHRhcmdldCk7IC8vd2UgbXVzdCBhZGQgaXQgdG8gdGhlIERPTSBpbiBvcmRlciB0byBnZXQgdmFsdWVzIHByb3Blcmx5XG5cbiAgICB9XG5cbiAgICBtYXRyaXggPSBfZ2V0Q29tcHV0ZWRUcmFuc2Zvcm1NYXRyaXhBc0FycmF5KHRhcmdldCk7XG4gICAgdGVtcCA/IHN0eWxlLmRpc3BsYXkgPSB0ZW1wIDogX3JlbW92ZVByb3BlcnR5KHRhcmdldCwgXCJkaXNwbGF5XCIpO1xuXG4gICAgaWYgKGFkZGVkVG9ET00pIHtcbiAgICAgIG5leHRTaWJsaW5nID8gcGFyZW50Lmluc2VydEJlZm9yZSh0YXJnZXQsIG5leHRTaWJsaW5nKSA6IHBhcmVudCA/IHBhcmVudC5hcHBlbmRDaGlsZCh0YXJnZXQpIDogX2RvY0VsZW1lbnQucmVtb3ZlQ2hpbGQodGFyZ2V0KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZm9yY2UyRCAmJiBtYXRyaXgubGVuZ3RoID4gNiA/IFttYXRyaXhbMF0sIG1hdHJpeFsxXSwgbWF0cml4WzRdLCBtYXRyaXhbNV0sIG1hdHJpeFsxMl0sIG1hdHJpeFsxM11dIDogbWF0cml4O1xufSxcbiAgICBfYXBwbHlTVkdPcmlnaW4gPSBmdW5jdGlvbiBfYXBwbHlTVkdPcmlnaW4odGFyZ2V0LCBvcmlnaW4sIG9yaWdpbklzQWJzb2x1dGUsIHNtb290aCwgbWF0cml4QXJyYXksIHBsdWdpblRvQWRkUHJvcFR3ZWVuc1RvKSB7XG4gIHZhciBjYWNoZSA9IHRhcmdldC5fZ3NhcCxcbiAgICAgIG1hdHJpeCA9IG1hdHJpeEFycmF5IHx8IF9nZXRNYXRyaXgodGFyZ2V0LCB0cnVlKSxcbiAgICAgIHhPcmlnaW5PbGQgPSBjYWNoZS54T3JpZ2luIHx8IDAsXG4gICAgICB5T3JpZ2luT2xkID0gY2FjaGUueU9yaWdpbiB8fCAwLFxuICAgICAgeE9mZnNldE9sZCA9IGNhY2hlLnhPZmZzZXQgfHwgMCxcbiAgICAgIHlPZmZzZXRPbGQgPSBjYWNoZS55T2Zmc2V0IHx8IDAsXG4gICAgICBhID0gbWF0cml4WzBdLFxuICAgICAgYiA9IG1hdHJpeFsxXSxcbiAgICAgIGMgPSBtYXRyaXhbMl0sXG4gICAgICBkID0gbWF0cml4WzNdLFxuICAgICAgdHggPSBtYXRyaXhbNF0sXG4gICAgICB0eSA9IG1hdHJpeFs1XSxcbiAgICAgIG9yaWdpblNwbGl0ID0gb3JpZ2luLnNwbGl0KFwiIFwiKSxcbiAgICAgIHhPcmlnaW4gPSBwYXJzZUZsb2F0KG9yaWdpblNwbGl0WzBdKSB8fCAwLFxuICAgICAgeU9yaWdpbiA9IHBhcnNlRmxvYXQob3JpZ2luU3BsaXRbMV0pIHx8IDAsXG4gICAgICBib3VuZHMsXG4gICAgICBkZXRlcm1pbmFudCxcbiAgICAgIHgsXG4gICAgICB5O1xuXG4gIGlmICghb3JpZ2luSXNBYnNvbHV0ZSkge1xuICAgIGJvdW5kcyA9IF9nZXRCQm94KHRhcmdldCk7XG4gICAgeE9yaWdpbiA9IGJvdW5kcy54ICsgKH5vcmlnaW5TcGxpdFswXS5pbmRleE9mKFwiJVwiKSA/IHhPcmlnaW4gLyAxMDAgKiBib3VuZHMud2lkdGggOiB4T3JpZ2luKTtcbiAgICB5T3JpZ2luID0gYm91bmRzLnkgKyAofihvcmlnaW5TcGxpdFsxXSB8fCBvcmlnaW5TcGxpdFswXSkuaW5kZXhPZihcIiVcIikgPyB5T3JpZ2luIC8gMTAwICogYm91bmRzLmhlaWdodCA6IHlPcmlnaW4pO1xuICB9IGVsc2UgaWYgKG1hdHJpeCAhPT0gX2lkZW50aXR5MkRNYXRyaXggJiYgKGRldGVybWluYW50ID0gYSAqIGQgLSBiICogYykpIHtcbiAgICAvL2lmIGl0J3MgemVybyAobGlrZSBpZiBzY2FsZVggYW5kIHNjYWxlWSBhcmUgemVybyksIHNraXAgaXQgdG8gYXZvaWQgZXJyb3JzIHdpdGggZGl2aWRpbmcgYnkgemVyby5cbiAgICB4ID0geE9yaWdpbiAqIChkIC8gZGV0ZXJtaW5hbnQpICsgeU9yaWdpbiAqICgtYyAvIGRldGVybWluYW50KSArIChjICogdHkgLSBkICogdHgpIC8gZGV0ZXJtaW5hbnQ7XG4gICAgeSA9IHhPcmlnaW4gKiAoLWIgLyBkZXRlcm1pbmFudCkgKyB5T3JpZ2luICogKGEgLyBkZXRlcm1pbmFudCkgLSAoYSAqIHR5IC0gYiAqIHR4KSAvIGRldGVybWluYW50O1xuICAgIHhPcmlnaW4gPSB4O1xuICAgIHlPcmlnaW4gPSB5O1xuICB9XG5cbiAgaWYgKHNtb290aCB8fCBzbW9vdGggIT09IGZhbHNlICYmIGNhY2hlLnNtb290aCkge1xuICAgIHR4ID0geE9yaWdpbiAtIHhPcmlnaW5PbGQ7XG4gICAgdHkgPSB5T3JpZ2luIC0geU9yaWdpbk9sZDtcbiAgICBjYWNoZS54T2Zmc2V0ID0geE9mZnNldE9sZCArICh0eCAqIGEgKyB0eSAqIGMpIC0gdHg7XG4gICAgY2FjaGUueU9mZnNldCA9IHlPZmZzZXRPbGQgKyAodHggKiBiICsgdHkgKiBkKSAtIHR5O1xuICB9IGVsc2Uge1xuICAgIGNhY2hlLnhPZmZzZXQgPSBjYWNoZS55T2Zmc2V0ID0gMDtcbiAgfVxuXG4gIGNhY2hlLnhPcmlnaW4gPSB4T3JpZ2luO1xuICBjYWNoZS55T3JpZ2luID0geU9yaWdpbjtcbiAgY2FjaGUuc21vb3RoID0gISFzbW9vdGg7XG4gIGNhY2hlLm9yaWdpbiA9IG9yaWdpbjtcbiAgY2FjaGUub3JpZ2luSXNBYnNvbHV0ZSA9ICEhb3JpZ2luSXNBYnNvbHV0ZTtcbiAgdGFyZ2V0LnN0eWxlW190cmFuc2Zvcm1PcmlnaW5Qcm9wXSA9IFwiMHB4IDBweFwiOyAvL290aGVyd2lzZSwgaWYgc29tZW9uZSBzZXRzICBhbiBvcmlnaW4gdmlhIENTUywgaXQgd2lsbCBsaWtlbHkgaW50ZXJmZXJlIHdpdGggdGhlIFNWRyB0cmFuc2Zvcm0gYXR0cmlidXRlIG9uZXMgKGJlY2F1c2UgcmVtZW1iZXIsIHdlJ3JlIGJha2luZyB0aGUgb3JpZ2luIGludG8gdGhlIG1hdHJpeCgpIHZhbHVlKS5cblxuICBpZiAocGx1Z2luVG9BZGRQcm9wVHdlZW5zVG8pIHtcbiAgICBfYWRkTm9uVHdlZW5pbmdQVChwbHVnaW5Ub0FkZFByb3BUd2VlbnNUbywgY2FjaGUsIFwieE9yaWdpblwiLCB4T3JpZ2luT2xkLCB4T3JpZ2luKTtcblxuICAgIF9hZGROb25Ud2VlbmluZ1BUKHBsdWdpblRvQWRkUHJvcFR3ZWVuc1RvLCBjYWNoZSwgXCJ5T3JpZ2luXCIsIHlPcmlnaW5PbGQsIHlPcmlnaW4pO1xuXG4gICAgX2FkZE5vblR3ZWVuaW5nUFQocGx1Z2luVG9BZGRQcm9wVHdlZW5zVG8sIGNhY2hlLCBcInhPZmZzZXRcIiwgeE9mZnNldE9sZCwgY2FjaGUueE9mZnNldCk7XG5cbiAgICBfYWRkTm9uVHdlZW5pbmdQVChwbHVnaW5Ub0FkZFByb3BUd2VlbnNUbywgY2FjaGUsIFwieU9mZnNldFwiLCB5T2Zmc2V0T2xkLCBjYWNoZS55T2Zmc2V0KTtcbiAgfVxuXG4gIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN2Zy1vcmlnaW5cIiwgeE9yaWdpbiArIFwiIFwiICsgeU9yaWdpbik7XG59LFxuICAgIF9wYXJzZVRyYW5zZm9ybSA9IGZ1bmN0aW9uIF9wYXJzZVRyYW5zZm9ybSh0YXJnZXQsIHVuY2FjaGUpIHtcbiAgdmFyIGNhY2hlID0gdGFyZ2V0Ll9nc2FwIHx8IG5ldyBHU0NhY2hlKHRhcmdldCk7XG5cbiAgaWYgKFwieFwiIGluIGNhY2hlICYmICF1bmNhY2hlICYmICFjYWNoZS51bmNhY2hlKSB7XG4gICAgcmV0dXJuIGNhY2hlO1xuICB9XG5cbiAgdmFyIHN0eWxlID0gdGFyZ2V0LnN0eWxlLFxuICAgICAgaW52ZXJ0ZWRTY2FsZVggPSBjYWNoZS5zY2FsZVggPCAwLFxuICAgICAgcHggPSBcInB4XCIsXG4gICAgICBkZWcgPSBcImRlZ1wiLFxuICAgICAgY3MgPSBnZXRDb21wdXRlZFN0eWxlKHRhcmdldCksXG4gICAgICBvcmlnaW4gPSBfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIF90cmFuc2Zvcm1PcmlnaW5Qcm9wKSB8fCBcIjBcIixcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgeixcbiAgICAgIHNjYWxlWCxcbiAgICAgIHNjYWxlWSxcbiAgICAgIHJvdGF0aW9uLFxuICAgICAgcm90YXRpb25YLFxuICAgICAgcm90YXRpb25ZLFxuICAgICAgc2tld1gsXG4gICAgICBza2V3WSxcbiAgICAgIHBlcnNwZWN0aXZlLFxuICAgICAgeE9yaWdpbixcbiAgICAgIHlPcmlnaW4sXG4gICAgICBtYXRyaXgsXG4gICAgICBhbmdsZSxcbiAgICAgIGNvcyxcbiAgICAgIHNpbixcbiAgICAgIGEsXG4gICAgICBiLFxuICAgICAgYyxcbiAgICAgIGQsXG4gICAgICBhMTIsXG4gICAgICBhMjIsXG4gICAgICB0MSxcbiAgICAgIHQyLFxuICAgICAgdDMsXG4gICAgICBhMTMsXG4gICAgICBhMjMsXG4gICAgICBhMzMsXG4gICAgICBhNDIsXG4gICAgICBhNDMsXG4gICAgICBhMzI7XG4gIHggPSB5ID0geiA9IHJvdGF0aW9uID0gcm90YXRpb25YID0gcm90YXRpb25ZID0gc2tld1ggPSBza2V3WSA9IHBlcnNwZWN0aXZlID0gMDtcbiAgc2NhbGVYID0gc2NhbGVZID0gMTtcbiAgY2FjaGUuc3ZnID0gISEodGFyZ2V0LmdldENUTSAmJiBfaXNTVkcodGFyZ2V0KSk7XG5cbiAgaWYgKGNzLnRyYW5zbGF0ZSkge1xuICAgIC8vIGFjY29tbW9kYXRlIGluZGVwZW5kZW50IHRyYW5zZm9ybXMgYnkgY29tYmluaW5nIHRoZW0gaW50byBub3JtYWwgb25lcy5cbiAgICBpZiAoY3MudHJhbnNsYXRlICE9PSBcIm5vbmVcIiB8fCBjcy5zY2FsZSAhPT0gXCJub25lXCIgfHwgY3Mucm90YXRlICE9PSBcIm5vbmVcIikge1xuICAgICAgc3R5bGVbX3RyYW5zZm9ybVByb3BdID0gKGNzLnRyYW5zbGF0ZSAhPT0gXCJub25lXCIgPyBcInRyYW5zbGF0ZTNkKFwiICsgKGNzLnRyYW5zbGF0ZSArIFwiIDAgMFwiKS5zcGxpdChcIiBcIikuc2xpY2UoMCwgMykuam9pbihcIiwgXCIpICsgXCIpIFwiIDogXCJcIikgKyAoY3Mucm90YXRlICE9PSBcIm5vbmVcIiA/IFwicm90YXRlKFwiICsgY3Mucm90YXRlICsgXCIpIFwiIDogXCJcIikgKyAoY3Muc2NhbGUgIT09IFwibm9uZVwiID8gXCJzY2FsZShcIiArIGNzLnNjYWxlLnNwbGl0KFwiIFwiKS5qb2luKFwiLFwiKSArIFwiKSBcIiA6IFwiXCIpICsgKGNzW190cmFuc2Zvcm1Qcm9wXSAhPT0gXCJub25lXCIgPyBjc1tfdHJhbnNmb3JtUHJvcF0gOiBcIlwiKTtcbiAgICB9XG5cbiAgICBzdHlsZS5zY2FsZSA9IHN0eWxlLnJvdGF0ZSA9IHN0eWxlLnRyYW5zbGF0ZSA9IFwibm9uZVwiO1xuICB9XG5cbiAgbWF0cml4ID0gX2dldE1hdHJpeCh0YXJnZXQsIGNhY2hlLnN2Zyk7XG5cbiAgaWYgKGNhY2hlLnN2Zykge1xuICAgIGlmIChjYWNoZS51bmNhY2hlKSB7XG4gICAgICAvLyBpZiBjYWNoZS51bmNhY2hlIGlzIHRydWUgKGFuZCBtYXliZSBpZiBvcmlnaW4gaXMgMCwwKSwgd2UgbmVlZCB0byBzZXQgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAoY2FjaGUueE9yaWdpbiAtIGJib3gueCkgKyBcInB4IFwiICsgKGNhY2hlLnlPcmlnaW4gLSBiYm94LnkpICsgXCJweFwiLiBQcmV2aW91c2x5IHdlIGxldCB0aGUgZGF0YS1zdmctb3JpZ2luIHN0YXkgaW5zdGVhZCwgYnV0IHdoZW4gaW50cm9kdWNpbmcgcmV2ZXJ0KCksIGl0IGNvbXBsaWNhdGVkIHRoaW5ncy5cbiAgICAgIHQyID0gdGFyZ2V0LmdldEJCb3goKTtcbiAgICAgIG9yaWdpbiA9IGNhY2hlLnhPcmlnaW4gLSB0Mi54ICsgXCJweCBcIiArIChjYWNoZS55T3JpZ2luIC0gdDIueSkgKyBcInB4XCI7XG4gICAgICB0MSA9IFwiXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHQxID0gIXVuY2FjaGUgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc3ZnLW9yaWdpblwiKTsgLy8gIFJlbWVtYmVyLCB0byB3b3JrIGFyb3VuZCBicm93c2VyIGluY29uc2lzdGVuY2llcyB3ZSBhbHdheXMgZm9yY2UgU1ZHIGVsZW1lbnRzJyB0cmFuc2Zvcm1PcmlnaW4gdG8gMCwwIGFuZCBvZmZzZXQgdGhlIHRyYW5zbGF0aW9uIGFjY29yZGluZ2x5LlxuICAgIH1cblxuICAgIF9hcHBseVNWR09yaWdpbih0YXJnZXQsIHQxIHx8IG9yaWdpbiwgISF0MSB8fCBjYWNoZS5vcmlnaW5Jc0Fic29sdXRlLCBjYWNoZS5zbW9vdGggIT09IGZhbHNlLCBtYXRyaXgpO1xuICB9XG5cbiAgeE9yaWdpbiA9IGNhY2hlLnhPcmlnaW4gfHwgMDtcbiAgeU9yaWdpbiA9IGNhY2hlLnlPcmlnaW4gfHwgMDtcblxuICBpZiAobWF0cml4ICE9PSBfaWRlbnRpdHkyRE1hdHJpeCkge1xuICAgIGEgPSBtYXRyaXhbMF07IC8vYTExXG5cbiAgICBiID0gbWF0cml4WzFdOyAvL2EyMVxuXG4gICAgYyA9IG1hdHJpeFsyXTsgLy9hMzFcblxuICAgIGQgPSBtYXRyaXhbM107IC8vYTQxXG5cbiAgICB4ID0gYTEyID0gbWF0cml4WzRdO1xuICAgIHkgPSBhMjIgPSBtYXRyaXhbNV07IC8vMkQgbWF0cml4XG5cbiAgICBpZiAobWF0cml4Lmxlbmd0aCA9PT0gNikge1xuICAgICAgc2NhbGVYID0gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpO1xuICAgICAgc2NhbGVZID0gTWF0aC5zcXJ0KGQgKiBkICsgYyAqIGMpO1xuICAgICAgcm90YXRpb24gPSBhIHx8IGIgPyBfYXRhbjIoYiwgYSkgKiBfUkFEMkRFRyA6IDA7IC8vbm90ZTogaWYgc2NhbGVYIGlzIDAsIHdlIGNhbm5vdCBhY2N1cmF0ZWx5IG1lYXN1cmUgcm90YXRpb24uIFNhbWUgZm9yIHNrZXdYIHdpdGggYSBzY2FsZVkgb2YgMC4gVGhlcmVmb3JlLCB3ZSBkZWZhdWx0IHRvIHRoZSBwcmV2aW91c2x5IHJlY29yZGVkIHZhbHVlIChvciB6ZXJvIGlmIHRoYXQgZG9lc24ndCBleGlzdCkuXG5cbiAgICAgIHNrZXdYID0gYyB8fCBkID8gX2F0YW4yKGMsIGQpICogX1JBRDJERUcgKyByb3RhdGlvbiA6IDA7XG4gICAgICBza2V3WCAmJiAoc2NhbGVZICo9IE1hdGguYWJzKE1hdGguY29zKHNrZXdYICogX0RFRzJSQUQpKSk7XG5cbiAgICAgIGlmIChjYWNoZS5zdmcpIHtcbiAgICAgICAgeCAtPSB4T3JpZ2luIC0gKHhPcmlnaW4gKiBhICsgeU9yaWdpbiAqIGMpO1xuICAgICAgICB5IC09IHlPcmlnaW4gLSAoeE9yaWdpbiAqIGIgKyB5T3JpZ2luICogZCk7XG4gICAgICB9IC8vM0QgbWF0cml4XG5cbiAgICB9IGVsc2Uge1xuICAgICAgYTMyID0gbWF0cml4WzZdO1xuICAgICAgYTQyID0gbWF0cml4WzddO1xuICAgICAgYTEzID0gbWF0cml4WzhdO1xuICAgICAgYTIzID0gbWF0cml4WzldO1xuICAgICAgYTMzID0gbWF0cml4WzEwXTtcbiAgICAgIGE0MyA9IG1hdHJpeFsxMV07XG4gICAgICB4ID0gbWF0cml4WzEyXTtcbiAgICAgIHkgPSBtYXRyaXhbMTNdO1xuICAgICAgeiA9IG1hdHJpeFsxNF07XG4gICAgICBhbmdsZSA9IF9hdGFuMihhMzIsIGEzMyk7XG4gICAgICByb3RhdGlvblggPSBhbmdsZSAqIF9SQUQyREVHOyAvL3JvdGF0aW9uWFxuXG4gICAgICBpZiAoYW5nbGUpIHtcbiAgICAgICAgY29zID0gTWF0aC5jb3MoLWFuZ2xlKTtcbiAgICAgICAgc2luID0gTWF0aC5zaW4oLWFuZ2xlKTtcbiAgICAgICAgdDEgPSBhMTIgKiBjb3MgKyBhMTMgKiBzaW47XG4gICAgICAgIHQyID0gYTIyICogY29zICsgYTIzICogc2luO1xuICAgICAgICB0MyA9IGEzMiAqIGNvcyArIGEzMyAqIHNpbjtcbiAgICAgICAgYTEzID0gYTEyICogLXNpbiArIGExMyAqIGNvcztcbiAgICAgICAgYTIzID0gYTIyICogLXNpbiArIGEyMyAqIGNvcztcbiAgICAgICAgYTMzID0gYTMyICogLXNpbiArIGEzMyAqIGNvcztcbiAgICAgICAgYTQzID0gYTQyICogLXNpbiArIGE0MyAqIGNvcztcbiAgICAgICAgYTEyID0gdDE7XG4gICAgICAgIGEyMiA9IHQyO1xuICAgICAgICBhMzIgPSB0MztcbiAgICAgIH0gLy9yb3RhdGlvbllcblxuXG4gICAgICBhbmdsZSA9IF9hdGFuMigtYywgYTMzKTtcbiAgICAgIHJvdGF0aW9uWSA9IGFuZ2xlICogX1JBRDJERUc7XG5cbiAgICAgIGlmIChhbmdsZSkge1xuICAgICAgICBjb3MgPSBNYXRoLmNvcygtYW5nbGUpO1xuICAgICAgICBzaW4gPSBNYXRoLnNpbigtYW5nbGUpO1xuICAgICAgICB0MSA9IGEgKiBjb3MgLSBhMTMgKiBzaW47XG4gICAgICAgIHQyID0gYiAqIGNvcyAtIGEyMyAqIHNpbjtcbiAgICAgICAgdDMgPSBjICogY29zIC0gYTMzICogc2luO1xuICAgICAgICBhNDMgPSBkICogc2luICsgYTQzICogY29zO1xuICAgICAgICBhID0gdDE7XG4gICAgICAgIGIgPSB0MjtcbiAgICAgICAgYyA9IHQzO1xuICAgICAgfSAvL3JvdGF0aW9uWlxuXG5cbiAgICAgIGFuZ2xlID0gX2F0YW4yKGIsIGEpO1xuICAgICAgcm90YXRpb24gPSBhbmdsZSAqIF9SQUQyREVHO1xuXG4gICAgICBpZiAoYW5nbGUpIHtcbiAgICAgICAgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgIHQxID0gYSAqIGNvcyArIGIgKiBzaW47XG4gICAgICAgIHQyID0gYTEyICogY29zICsgYTIyICogc2luO1xuICAgICAgICBiID0gYiAqIGNvcyAtIGEgKiBzaW47XG4gICAgICAgIGEyMiA9IGEyMiAqIGNvcyAtIGExMiAqIHNpbjtcbiAgICAgICAgYSA9IHQxO1xuICAgICAgICBhMTIgPSB0MjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJvdGF0aW9uWCAmJiBNYXRoLmFicyhyb3RhdGlvblgpICsgTWF0aC5hYnMocm90YXRpb24pID4gMzU5LjkpIHtcbiAgICAgICAgLy93aGVuIHJvdGF0aW9uWSBpcyBzZXQsIGl0IHdpbGwgb2Z0ZW4gYmUgcGFyc2VkIGFzIDE4MCBkZWdyZWVzIGRpZmZlcmVudCB0aGFuIGl0IHNob3VsZCBiZSwgYW5kIHJvdGF0aW9uWCBhbmQgcm90YXRpb24gYm90aCBiZWluZyAxODAgKGl0IGxvb2tzIHRoZSBzYW1lKSwgc28gd2UgYWRqdXN0IGZvciB0aGF0IGhlcmUuXG4gICAgICAgIHJvdGF0aW9uWCA9IHJvdGF0aW9uID0gMDtcbiAgICAgICAgcm90YXRpb25ZID0gMTgwIC0gcm90YXRpb25ZO1xuICAgICAgfVxuXG4gICAgICBzY2FsZVggPSBfcm91bmQoTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIgKyBjICogYykpO1xuICAgICAgc2NhbGVZID0gX3JvdW5kKE1hdGguc3FydChhMjIgKiBhMjIgKyBhMzIgKiBhMzIpKTtcbiAgICAgIGFuZ2xlID0gX2F0YW4yKGExMiwgYTIyKTtcbiAgICAgIHNrZXdYID0gTWF0aC5hYnMoYW5nbGUpID4gMC4wMDAyID8gYW5nbGUgKiBfUkFEMkRFRyA6IDA7XG4gICAgICBwZXJzcGVjdGl2ZSA9IGE0MyA/IDEgLyAoYTQzIDwgMCA/IC1hNDMgOiBhNDMpIDogMDtcbiAgICB9XG5cbiAgICBpZiAoY2FjaGUuc3ZnKSB7XG4gICAgICAvL3NlbnNlIGlmIHRoZXJlIGFyZSBDU1MgdHJhbnNmb3JtcyBhcHBsaWVkIG9uIGFuIFNWRyBlbGVtZW50IGluIHdoaWNoIGNhc2Ugd2UgbXVzdCBvdmVyd3JpdGUgdGhlbSB3aGVuIHJlbmRlcmluZy4gVGhlIHRyYW5zZm9ybSBhdHRyaWJ1dGUgaXMgbW9yZSByZWxpYWJsZSBjcm9zcy1icm93c2VyLCBidXQgd2UgY2FuJ3QganVzdCByZW1vdmUgdGhlIENTUyBvbmVzIGJlY2F1c2UgdGhleSBtYXkgYmUgYXBwbGllZCBpbiBhIENTUyBydWxlIHNvbWV3aGVyZSAobm90IGp1c3QgaW5saW5lKS5cbiAgICAgIHQxID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiKTtcbiAgICAgIGNhY2hlLmZvcmNlQ1NTID0gdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCBcIlwiKSB8fCAhX2lzTnVsbFRyYW5zZm9ybShfZ2V0Q29tcHV0ZWRQcm9wZXJ0eSh0YXJnZXQsIF90cmFuc2Zvcm1Qcm9wKSk7XG4gICAgICB0MSAmJiB0YXJnZXQuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHQxKTtcbiAgICB9XG4gIH1cblxuICBpZiAoTWF0aC5hYnMoc2tld1gpID4gOTAgJiYgTWF0aC5hYnMoc2tld1gpIDwgMjcwKSB7XG4gICAgaWYgKGludmVydGVkU2NhbGVYKSB7XG4gICAgICBzY2FsZVggKj0gLTE7XG4gICAgICBza2V3WCArPSByb3RhdGlvbiA8PSAwID8gMTgwIDogLTE4MDtcbiAgICAgIHJvdGF0aW9uICs9IHJvdGF0aW9uIDw9IDAgPyAxODAgOiAtMTgwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY2FsZVkgKj0gLTE7XG4gICAgICBza2V3WCArPSBza2V3WCA8PSAwID8gMTgwIDogLTE4MDtcbiAgICB9XG4gIH1cblxuICB1bmNhY2hlID0gdW5jYWNoZSB8fCBjYWNoZS51bmNhY2hlO1xuICBjYWNoZS54ID0geCAtICgoY2FjaGUueFBlcmNlbnQgPSB4ICYmICghdW5jYWNoZSAmJiBjYWNoZS54UGVyY2VudCB8fCAoTWF0aC5yb3VuZCh0YXJnZXQub2Zmc2V0V2lkdGggLyAyKSA9PT0gTWF0aC5yb3VuZCgteCkgPyAtNTAgOiAwKSkpID8gdGFyZ2V0Lm9mZnNldFdpZHRoICogY2FjaGUueFBlcmNlbnQgLyAxMDAgOiAwKSArIHB4O1xuICBjYWNoZS55ID0geSAtICgoY2FjaGUueVBlcmNlbnQgPSB5ICYmICghdW5jYWNoZSAmJiBjYWNoZS55UGVyY2VudCB8fCAoTWF0aC5yb3VuZCh0YXJnZXQub2Zmc2V0SGVpZ2h0IC8gMikgPT09IE1hdGgucm91bmQoLXkpID8gLTUwIDogMCkpKSA/IHRhcmdldC5vZmZzZXRIZWlnaHQgKiBjYWNoZS55UGVyY2VudCAvIDEwMCA6IDApICsgcHg7XG4gIGNhY2hlLnogPSB6ICsgcHg7XG4gIGNhY2hlLnNjYWxlWCA9IF9yb3VuZChzY2FsZVgpO1xuICBjYWNoZS5zY2FsZVkgPSBfcm91bmQoc2NhbGVZKTtcbiAgY2FjaGUucm90YXRpb24gPSBfcm91bmQocm90YXRpb24pICsgZGVnO1xuICBjYWNoZS5yb3RhdGlvblggPSBfcm91bmQocm90YXRpb25YKSArIGRlZztcbiAgY2FjaGUucm90YXRpb25ZID0gX3JvdW5kKHJvdGF0aW9uWSkgKyBkZWc7XG4gIGNhY2hlLnNrZXdYID0gc2tld1ggKyBkZWc7XG4gIGNhY2hlLnNrZXdZID0gc2tld1kgKyBkZWc7XG4gIGNhY2hlLnRyYW5zZm9ybVBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmUgKyBweDtcblxuICBpZiAoY2FjaGUuek9yaWdpbiA9IHBhcnNlRmxvYXQob3JpZ2luLnNwbGl0KFwiIFwiKVsyXSkgfHwgMCkge1xuICAgIHN0eWxlW190cmFuc2Zvcm1PcmlnaW5Qcm9wXSA9IF9maXJzdFR3b09ubHkob3JpZ2luKTtcbiAgfVxuXG4gIGNhY2hlLnhPZmZzZXQgPSBjYWNoZS55T2Zmc2V0ID0gMDtcbiAgY2FjaGUuZm9yY2UzRCA9IF9jb25maWcuZm9yY2UzRDtcbiAgY2FjaGUucmVuZGVyVHJhbnNmb3JtID0gY2FjaGUuc3ZnID8gX3JlbmRlclNWR1RyYW5zZm9ybXMgOiBfc3VwcG9ydHMzRCA/IF9yZW5kZXJDU1NUcmFuc2Zvcm1zIDogX3JlbmRlck5vbjNEVHJhbnNmb3JtcztcbiAgY2FjaGUudW5jYWNoZSA9IDA7XG4gIHJldHVybiBjYWNoZTtcbn0sXG4gICAgX2ZpcnN0VHdvT25seSA9IGZ1bmN0aW9uIF9maXJzdFR3b09ubHkodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiIFwiKSlbMF0gKyBcIiBcIiArIHZhbHVlWzFdO1xufSxcbiAgICAvL2ZvciBoYW5kbGluZyB0cmFuc2Zvcm1PcmlnaW4gdmFsdWVzLCBzdHJpcHBpbmcgb3V0IHRoZSAzcmQgZGltZW5zaW9uXG5fYWRkUHhUcmFuc2xhdGUgPSBmdW5jdGlvbiBfYWRkUHhUcmFuc2xhdGUodGFyZ2V0LCBzdGFydCwgdmFsdWUpIHtcbiAgdmFyIHVuaXQgPSBnZXRVbml0KHN0YXJ0KTtcbiAgcmV0dXJuIF9yb3VuZChwYXJzZUZsb2F0KHN0YXJ0KSArIHBhcnNlRmxvYXQoX2NvbnZlcnRUb1VuaXQodGFyZ2V0LCBcInhcIiwgdmFsdWUgKyBcInB4XCIsIHVuaXQpKSkgKyB1bml0O1xufSxcbiAgICBfcmVuZGVyTm9uM0RUcmFuc2Zvcm1zID0gZnVuY3Rpb24gX3JlbmRlck5vbjNEVHJhbnNmb3JtcyhyYXRpbywgY2FjaGUpIHtcbiAgY2FjaGUueiA9IFwiMHB4XCI7XG4gIGNhY2hlLnJvdGF0aW9uWSA9IGNhY2hlLnJvdGF0aW9uWCA9IFwiMGRlZ1wiO1xuICBjYWNoZS5mb3JjZTNEID0gMDtcblxuICBfcmVuZGVyQ1NTVHJhbnNmb3JtcyhyYXRpbywgY2FjaGUpO1xufSxcbiAgICBfemVyb0RlZyA9IFwiMGRlZ1wiLFxuICAgIF96ZXJvUHggPSBcIjBweFwiLFxuICAgIF9lbmRQYXJlbnRoZXNpcyA9IFwiKSBcIixcbiAgICBfcmVuZGVyQ1NTVHJhbnNmb3JtcyA9IGZ1bmN0aW9uIF9yZW5kZXJDU1NUcmFuc2Zvcm1zKHJhdGlvLCBjYWNoZSkge1xuICB2YXIgX3JlZiA9IGNhY2hlIHx8IHRoaXMsXG4gICAgICB4UGVyY2VudCA9IF9yZWYueFBlcmNlbnQsXG4gICAgICB5UGVyY2VudCA9IF9yZWYueVBlcmNlbnQsXG4gICAgICB4ID0gX3JlZi54LFxuICAgICAgeSA9IF9yZWYueSxcbiAgICAgIHogPSBfcmVmLnosXG4gICAgICByb3RhdGlvbiA9IF9yZWYucm90YXRpb24sXG4gICAgICByb3RhdGlvblkgPSBfcmVmLnJvdGF0aW9uWSxcbiAgICAgIHJvdGF0aW9uWCA9IF9yZWYucm90YXRpb25YLFxuICAgICAgc2tld1ggPSBfcmVmLnNrZXdYLFxuICAgICAgc2tld1kgPSBfcmVmLnNrZXdZLFxuICAgICAgc2NhbGVYID0gX3JlZi5zY2FsZVgsXG4gICAgICBzY2FsZVkgPSBfcmVmLnNjYWxlWSxcbiAgICAgIHRyYW5zZm9ybVBlcnNwZWN0aXZlID0gX3JlZi50cmFuc2Zvcm1QZXJzcGVjdGl2ZSxcbiAgICAgIGZvcmNlM0QgPSBfcmVmLmZvcmNlM0QsXG4gICAgICB0YXJnZXQgPSBfcmVmLnRhcmdldCxcbiAgICAgIHpPcmlnaW4gPSBfcmVmLnpPcmlnaW4sXG4gICAgICB0cmFuc2Zvcm1zID0gXCJcIixcbiAgICAgIHVzZTNEID0gZm9yY2UzRCA9PT0gXCJhdXRvXCIgJiYgcmF0aW8gJiYgcmF0aW8gIT09IDEgfHwgZm9yY2UzRCA9PT0gdHJ1ZTsgLy8gU2FmYXJpIGhhcyBhIGJ1ZyB0aGF0IGNhdXNlcyBpdCBub3QgdG8gcmVuZGVyIDNEIHRyYW5zZm9ybS1vcmlnaW4gdmFsdWVzIHByb3Blcmx5LCBzbyB3ZSBmb3JjZSB0aGUgeiBvcmlnaW4gdG8gMCwgcmVjb3JkIGl0IGluIHRoZSBjYWNoZSwgYW5kIHRoZW4gZG8gdGhlIG1hdGggaGVyZSB0byBvZmZzZXQgdGhlIHRyYW5zbGF0ZSB2YWx1ZXMgYWNjb3JkaW5nbHkgKGJhc2ljYWxseSBkbyB0aGUgM0QgdHJhbnNmb3JtLW9yaWdpbiBwYXJ0IG1hbnVhbGx5KVxuXG5cbiAgaWYgKHpPcmlnaW4gJiYgKHJvdGF0aW9uWCAhPT0gX3plcm9EZWcgfHwgcm90YXRpb25ZICE9PSBfemVyb0RlZykpIHtcbiAgICB2YXIgYW5nbGUgPSBwYXJzZUZsb2F0KHJvdGF0aW9uWSkgKiBfREVHMlJBRCxcbiAgICAgICAgYTEzID0gTWF0aC5zaW4oYW5nbGUpLFxuICAgICAgICBhMzMgPSBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgIGNvcztcblxuICAgIGFuZ2xlID0gcGFyc2VGbG9hdChyb3RhdGlvblgpICogX0RFRzJSQUQ7XG4gICAgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuICAgIHggPSBfYWRkUHhUcmFuc2xhdGUodGFyZ2V0LCB4LCBhMTMgKiBjb3MgKiAtek9yaWdpbik7XG4gICAgeSA9IF9hZGRQeFRyYW5zbGF0ZSh0YXJnZXQsIHksIC1NYXRoLnNpbihhbmdsZSkgKiAtek9yaWdpbik7XG4gICAgeiA9IF9hZGRQeFRyYW5zbGF0ZSh0YXJnZXQsIHosIGEzMyAqIGNvcyAqIC16T3JpZ2luICsgek9yaWdpbik7XG4gIH1cblxuICBpZiAodHJhbnNmb3JtUGVyc3BlY3RpdmUgIT09IF96ZXJvUHgpIHtcbiAgICB0cmFuc2Zvcm1zICs9IFwicGVyc3BlY3RpdmUoXCIgKyB0cmFuc2Zvcm1QZXJzcGVjdGl2ZSArIF9lbmRQYXJlbnRoZXNpcztcbiAgfVxuXG4gIGlmICh4UGVyY2VudCB8fCB5UGVyY2VudCkge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJ0cmFuc2xhdGUoXCIgKyB4UGVyY2VudCArIFwiJSwgXCIgKyB5UGVyY2VudCArIFwiJSkgXCI7XG4gIH1cblxuICBpZiAodXNlM0QgfHwgeCAhPT0gX3plcm9QeCB8fCB5ICE9PSBfemVyb1B4IHx8IHogIT09IF96ZXJvUHgpIHtcbiAgICB0cmFuc2Zvcm1zICs9IHogIT09IF96ZXJvUHggfHwgdXNlM0QgPyBcInRyYW5zbGF0ZTNkKFwiICsgeCArIFwiLCBcIiArIHkgKyBcIiwgXCIgKyB6ICsgXCIpIFwiIDogXCJ0cmFuc2xhdGUoXCIgKyB4ICsgXCIsIFwiICsgeSArIF9lbmRQYXJlbnRoZXNpcztcbiAgfVxuXG4gIGlmIChyb3RhdGlvbiAhPT0gX3plcm9EZWcpIHtcbiAgICB0cmFuc2Zvcm1zICs9IFwicm90YXRlKFwiICsgcm90YXRpb24gKyBfZW5kUGFyZW50aGVzaXM7XG4gIH1cblxuICBpZiAocm90YXRpb25ZICE9PSBfemVyb0RlZykge1xuICAgIHRyYW5zZm9ybXMgKz0gXCJyb3RhdGVZKFwiICsgcm90YXRpb25ZICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgaWYgKHJvdGF0aW9uWCAhPT0gX3plcm9EZWcpIHtcbiAgICB0cmFuc2Zvcm1zICs9IFwicm90YXRlWChcIiArIHJvdGF0aW9uWCArIF9lbmRQYXJlbnRoZXNpcztcbiAgfVxuXG4gIGlmIChza2V3WCAhPT0gX3plcm9EZWcgfHwgc2tld1kgIT09IF96ZXJvRGVnKSB7XG4gICAgdHJhbnNmb3JtcyArPSBcInNrZXcoXCIgKyBza2V3WCArIFwiLCBcIiArIHNrZXdZICsgX2VuZFBhcmVudGhlc2lzO1xuICB9XG5cbiAgaWYgKHNjYWxlWCAhPT0gMSB8fCBzY2FsZVkgIT09IDEpIHtcbiAgICB0cmFuc2Zvcm1zICs9IFwic2NhbGUoXCIgKyBzY2FsZVggKyBcIiwgXCIgKyBzY2FsZVkgKyBfZW5kUGFyZW50aGVzaXM7XG4gIH1cblxuICB0YXJnZXQuc3R5bGVbX3RyYW5zZm9ybVByb3BdID0gdHJhbnNmb3JtcyB8fCBcInRyYW5zbGF0ZSgwLCAwKVwiO1xufSxcbiAgICBfcmVuZGVyU1ZHVHJhbnNmb3JtcyA9IGZ1bmN0aW9uIF9yZW5kZXJTVkdUcmFuc2Zvcm1zKHJhdGlvLCBjYWNoZSkge1xuICB2YXIgX3JlZjIgPSBjYWNoZSB8fCB0aGlzLFxuICAgICAgeFBlcmNlbnQgPSBfcmVmMi54UGVyY2VudCxcbiAgICAgIHlQZXJjZW50ID0gX3JlZjIueVBlcmNlbnQsXG4gICAgICB4ID0gX3JlZjIueCxcbiAgICAgIHkgPSBfcmVmMi55LFxuICAgICAgcm90YXRpb24gPSBfcmVmMi5yb3RhdGlvbixcbiAgICAgIHNrZXdYID0gX3JlZjIuc2tld1gsXG4gICAgICBza2V3WSA9IF9yZWYyLnNrZXdZLFxuICAgICAgc2NhbGVYID0gX3JlZjIuc2NhbGVYLFxuICAgICAgc2NhbGVZID0gX3JlZjIuc2NhbGVZLFxuICAgICAgdGFyZ2V0ID0gX3JlZjIudGFyZ2V0LFxuICAgICAgeE9yaWdpbiA9IF9yZWYyLnhPcmlnaW4sXG4gICAgICB5T3JpZ2luID0gX3JlZjIueU9yaWdpbixcbiAgICAgIHhPZmZzZXQgPSBfcmVmMi54T2Zmc2V0LFxuICAgICAgeU9mZnNldCA9IF9yZWYyLnlPZmZzZXQsXG4gICAgICBmb3JjZUNTUyA9IF9yZWYyLmZvcmNlQ1NTLFxuICAgICAgdHggPSBwYXJzZUZsb2F0KHgpLFxuICAgICAgdHkgPSBwYXJzZUZsb2F0KHkpLFxuICAgICAgYTExLFxuICAgICAgYTIxLFxuICAgICAgYTEyLFxuICAgICAgYTIyLFxuICAgICAgdGVtcDtcblxuICByb3RhdGlvbiA9IHBhcnNlRmxvYXQocm90YXRpb24pO1xuICBza2V3WCA9IHBhcnNlRmxvYXQoc2tld1gpO1xuICBza2V3WSA9IHBhcnNlRmxvYXQoc2tld1kpO1xuXG4gIGlmIChza2V3WSkge1xuICAgIC8vZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIHdlIGNvbWJpbmUgYWxsIHNrZXdpbmcgaW50byB0aGUgc2tld1ggYW5kIHJvdGF0aW9uIHZhbHVlcy4gUmVtZW1iZXIsIGEgc2tld1kgb2YgMTAgZGVncmVlcyBsb29rcyB0aGUgc2FtZSBhcyBhIHJvdGF0aW9uIG9mIDEwIGRlZ3JlZXMgcGx1cyBhIHNrZXdYIG9mIDEwIGRlZ3JlZXMuXG4gICAgc2tld1kgPSBwYXJzZUZsb2F0KHNrZXdZKTtcbiAgICBza2V3WCArPSBza2V3WTtcbiAgICByb3RhdGlvbiArPSBza2V3WTtcbiAgfVxuXG4gIGlmIChyb3RhdGlvbiB8fCBza2V3WCkge1xuICAgIHJvdGF0aW9uICo9IF9ERUcyUkFEO1xuICAgIHNrZXdYICo9IF9ERUcyUkFEO1xuICAgIGExMSA9IE1hdGguY29zKHJvdGF0aW9uKSAqIHNjYWxlWDtcbiAgICBhMjEgPSBNYXRoLnNpbihyb3RhdGlvbikgKiBzY2FsZVg7XG4gICAgYTEyID0gTWF0aC5zaW4ocm90YXRpb24gLSBza2V3WCkgKiAtc2NhbGVZO1xuICAgIGEyMiA9IE1hdGguY29zKHJvdGF0aW9uIC0gc2tld1gpICogc2NhbGVZO1xuXG4gICAgaWYgKHNrZXdYKSB7XG4gICAgICBza2V3WSAqPSBfREVHMlJBRDtcbiAgICAgIHRlbXAgPSBNYXRoLnRhbihza2V3WCAtIHNrZXdZKTtcbiAgICAgIHRlbXAgPSBNYXRoLnNxcnQoMSArIHRlbXAgKiB0ZW1wKTtcbiAgICAgIGExMiAqPSB0ZW1wO1xuICAgICAgYTIyICo9IHRlbXA7XG5cbiAgICAgIGlmIChza2V3WSkge1xuICAgICAgICB0ZW1wID0gTWF0aC50YW4oc2tld1kpO1xuICAgICAgICB0ZW1wID0gTWF0aC5zcXJ0KDEgKyB0ZW1wICogdGVtcCk7XG4gICAgICAgIGExMSAqPSB0ZW1wO1xuICAgICAgICBhMjEgKj0gdGVtcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhMTEgPSBfcm91bmQoYTExKTtcbiAgICBhMjEgPSBfcm91bmQoYTIxKTtcbiAgICBhMTIgPSBfcm91bmQoYTEyKTtcbiAgICBhMjIgPSBfcm91bmQoYTIyKTtcbiAgfSBlbHNlIHtcbiAgICBhMTEgPSBzY2FsZVg7XG4gICAgYTIyID0gc2NhbGVZO1xuICAgIGEyMSA9IGExMiA9IDA7XG4gIH1cblxuICBpZiAodHggJiYgIX4oeCArIFwiXCIpLmluZGV4T2YoXCJweFwiKSB8fCB0eSAmJiAhfih5ICsgXCJcIikuaW5kZXhPZihcInB4XCIpKSB7XG4gICAgdHggPSBfY29udmVydFRvVW5pdCh0YXJnZXQsIFwieFwiLCB4LCBcInB4XCIpO1xuICAgIHR5ID0gX2NvbnZlcnRUb1VuaXQodGFyZ2V0LCBcInlcIiwgeSwgXCJweFwiKTtcbiAgfVxuXG4gIGlmICh4T3JpZ2luIHx8IHlPcmlnaW4gfHwgeE9mZnNldCB8fCB5T2Zmc2V0KSB7XG4gICAgdHggPSBfcm91bmQodHggKyB4T3JpZ2luIC0gKHhPcmlnaW4gKiBhMTEgKyB5T3JpZ2luICogYTEyKSArIHhPZmZzZXQpO1xuICAgIHR5ID0gX3JvdW5kKHR5ICsgeU9yaWdpbiAtICh4T3JpZ2luICogYTIxICsgeU9yaWdpbiAqIGEyMikgKyB5T2Zmc2V0KTtcbiAgfVxuXG4gIGlmICh4UGVyY2VudCB8fCB5UGVyY2VudCkge1xuICAgIC8vVGhlIFNWRyBzcGVjIGRvZXNuJ3Qgc3VwcG9ydCBwZXJjZW50YWdlLWJhc2VkIHRyYW5zbGF0aW9uIGluIHRoZSBcInRyYW5zZm9ybVwiIGF0dHJpYnV0ZSwgc28gd2UgbWVyZ2UgaXQgaW50byB0aGUgdHJhbnNsYXRpb24gdG8gc2ltdWxhdGUgaXQuXG4gICAgdGVtcCA9IHRhcmdldC5nZXRCQm94KCk7XG4gICAgdHggPSBfcm91bmQodHggKyB4UGVyY2VudCAvIDEwMCAqIHRlbXAud2lkdGgpO1xuICAgIHR5ID0gX3JvdW5kKHR5ICsgeVBlcmNlbnQgLyAxMDAgKiB0ZW1wLmhlaWdodCk7XG4gIH1cblxuICB0ZW1wID0gXCJtYXRyaXgoXCIgKyBhMTEgKyBcIixcIiArIGEyMSArIFwiLFwiICsgYTEyICsgXCIsXCIgKyBhMjIgKyBcIixcIiArIHR4ICsgXCIsXCIgKyB0eSArIFwiKVwiO1xuICB0YXJnZXQuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHRlbXApO1xuICBmb3JjZUNTUyAmJiAodGFyZ2V0LnN0eWxlW190cmFuc2Zvcm1Qcm9wXSA9IHRlbXApOyAvL3NvbWUgYnJvd3NlcnMgcHJpb3JpdGl6ZSBDU1MgdHJhbnNmb3JtcyBvdmVyIHRoZSB0cmFuc2Zvcm0gYXR0cmlidXRlLiBXaGVuIHdlIHNlbnNlIHRoYXQgdGhlIHVzZXIgaGFzIENTUyB0cmFuc2Zvcm1zIGFwcGxpZWQsIHdlIG11c3Qgb3ZlcndyaXRlIHRoZW0gdGhpcyB3YXkgKG90aGVyd2lzZSBzb21lIGJyb3dzZXIgc2ltcGx5IHdvbid0IHJlbmRlciB0aGUgdHJhbnNmb3JtIGF0dHJpYnV0ZSBjaGFuZ2VzISlcbn0sXG4gICAgX2FkZFJvdGF0aW9uYWxQcm9wVHdlZW4gPSBmdW5jdGlvbiBfYWRkUm90YXRpb25hbFByb3BUd2VlbihwbHVnaW4sIHRhcmdldCwgcHJvcGVydHksIHN0YXJ0TnVtLCBlbmRWYWx1ZSkge1xuICB2YXIgY2FwID0gMzYwLFxuICAgICAgaXNTdHJpbmcgPSBfaXNTdHJpbmcoZW5kVmFsdWUpLFxuICAgICAgZW5kTnVtID0gcGFyc2VGbG9hdChlbmRWYWx1ZSkgKiAoaXNTdHJpbmcgJiYgfmVuZFZhbHVlLmluZGV4T2YoXCJyYWRcIikgPyBfUkFEMkRFRyA6IDEpLFxuICAgICAgY2hhbmdlID0gZW5kTnVtIC0gc3RhcnROdW0sXG4gICAgICBmaW5hbFZhbHVlID0gc3RhcnROdW0gKyBjaGFuZ2UgKyBcImRlZ1wiLFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgcHQ7XG5cbiAgaWYgKGlzU3RyaW5nKSB7XG4gICAgZGlyZWN0aW9uID0gZW5kVmFsdWUuc3BsaXQoXCJfXCIpWzFdO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJzaG9ydFwiKSB7XG4gICAgICBjaGFuZ2UgJT0gY2FwO1xuXG4gICAgICBpZiAoY2hhbmdlICE9PSBjaGFuZ2UgJSAoY2FwIC8gMikpIHtcbiAgICAgICAgY2hhbmdlICs9IGNoYW5nZSA8IDAgPyBjYXAgOiAtY2FwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiY3dcIiAmJiBjaGFuZ2UgPCAwKSB7XG4gICAgICBjaGFuZ2UgPSAoY2hhbmdlICsgY2FwICogX2JpZ051bSkgJSBjYXAgLSB+fihjaGFuZ2UgLyBjYXApICogY2FwO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNjd1wiICYmIGNoYW5nZSA+IDApIHtcbiAgICAgIGNoYW5nZSA9IChjaGFuZ2UgLSBjYXAgKiBfYmlnTnVtKSAlIGNhcCAtIH5+KGNoYW5nZSAvIGNhcCkgKiBjYXA7XG4gICAgfVxuICB9XG5cbiAgcGx1Z2luLl9wdCA9IHB0ID0gbmV3IFByb3BUd2VlbihwbHVnaW4uX3B0LCB0YXJnZXQsIHByb3BlcnR5LCBzdGFydE51bSwgY2hhbmdlLCBfcmVuZGVyUHJvcFdpdGhFbmQpO1xuICBwdC5lID0gZmluYWxWYWx1ZTtcbiAgcHQudSA9IFwiZGVnXCI7XG5cbiAgcGx1Z2luLl9wcm9wcy5wdXNoKHByb3BlcnR5KTtcblxuICByZXR1cm4gcHQ7XG59LFxuICAgIF9hc3NpZ24gPSBmdW5jdGlvbiBfYXNzaWduKHRhcmdldCwgc291cmNlKSB7XG4gIC8vIEludGVybmV0IEV4cGxvcmVyIGRvZXNuJ3QgaGF2ZSBPYmplY3QuYXNzaWduKCksIHNvIHdlIHJlY3JlYXRlIGl0IGhlcmUuXG4gIGZvciAodmFyIHAgaW4gc291cmNlKSB7XG4gICAgdGFyZ2V0W3BdID0gc291cmNlW3BdO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn0sXG4gICAgX2FkZFJhd1RyYW5zZm9ybVBUcyA9IGZ1bmN0aW9uIF9hZGRSYXdUcmFuc2Zvcm1QVHMocGx1Z2luLCB0cmFuc2Zvcm1zLCB0YXJnZXQpIHtcbiAgLy9mb3IgaGFuZGxpbmcgY2FzZXMgd2hlcmUgc29tZW9uZSBwYXNzZXMgaW4gYSB3aG9sZSB0cmFuc2Zvcm0gc3RyaW5nLCBsaWtlIHRyYW5zZm9ybTogXCJzY2FsZSgyLCAzKSByb3RhdGUoMjBkZWcpIHRyYW5zbGF0ZVkoMzBlbSlcIlxuICB2YXIgc3RhcnRDYWNoZSA9IF9hc3NpZ24oe30sIHRhcmdldC5fZ3NhcCksXG4gICAgICBleGNsdWRlID0gXCJwZXJzcGVjdGl2ZSxmb3JjZTNELHRyYW5zZm9ybU9yaWdpbixzdmdPcmlnaW5cIixcbiAgICAgIHN0eWxlID0gdGFyZ2V0LnN0eWxlLFxuICAgICAgZW5kQ2FjaGUsXG4gICAgICBwLFxuICAgICAgc3RhcnRWYWx1ZSxcbiAgICAgIGVuZFZhbHVlLFxuICAgICAgc3RhcnROdW0sXG4gICAgICBlbmROdW0sXG4gICAgICBzdGFydFVuaXQsXG4gICAgICBlbmRVbml0O1xuXG4gIGlmIChzdGFydENhY2hlLnN2Zykge1xuICAgIHN0YXJ0VmFsdWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIpO1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgXCJcIik7XG4gICAgc3R5bGVbX3RyYW5zZm9ybVByb3BdID0gdHJhbnNmb3JtcztcbiAgICBlbmRDYWNoZSA9IF9wYXJzZVRyYW5zZm9ybSh0YXJnZXQsIDEpO1xuXG4gICAgX3JlbW92ZVByb3BlcnR5KHRhcmdldCwgX3RyYW5zZm9ybVByb3ApO1xuXG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCBzdGFydFZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBzdGFydFZhbHVlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpW190cmFuc2Zvcm1Qcm9wXTtcbiAgICBzdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSB0cmFuc2Zvcm1zO1xuICAgIGVuZENhY2hlID0gX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgMSk7XG4gICAgc3R5bGVbX3RyYW5zZm9ybVByb3BdID0gc3RhcnRWYWx1ZTtcbiAgfVxuXG4gIGZvciAocCBpbiBfdHJhbnNmb3JtUHJvcHMpIHtcbiAgICBzdGFydFZhbHVlID0gc3RhcnRDYWNoZVtwXTtcbiAgICBlbmRWYWx1ZSA9IGVuZENhY2hlW3BdO1xuXG4gICAgaWYgKHN0YXJ0VmFsdWUgIT09IGVuZFZhbHVlICYmIGV4Y2x1ZGUuaW5kZXhPZihwKSA8IDApIHtcbiAgICAgIC8vdHdlZW5pbmcgdG8gbm8gcGVyc3BlY3RpdmUgZ2l2ZXMgdmVyeSB1bmludHVpdGl2ZSByZXN1bHRzIC0ganVzdCBrZWVwIHRoZSBzYW1lIHBlcnNwZWN0aXZlIGluIHRoYXQgY2FzZS5cbiAgICAgIHN0YXJ0VW5pdCA9IGdldFVuaXQoc3RhcnRWYWx1ZSk7XG4gICAgICBlbmRVbml0ID0gZ2V0VW5pdChlbmRWYWx1ZSk7XG4gICAgICBzdGFydE51bSA9IHN0YXJ0VW5pdCAhPT0gZW5kVW5pdCA/IF9jb252ZXJ0VG9Vbml0KHRhcmdldCwgcCwgc3RhcnRWYWx1ZSwgZW5kVW5pdCkgOiBwYXJzZUZsb2F0KHN0YXJ0VmFsdWUpO1xuICAgICAgZW5kTnVtID0gcGFyc2VGbG9hdChlbmRWYWx1ZSk7XG4gICAgICBwbHVnaW4uX3B0ID0gbmV3IFByb3BUd2VlbihwbHVnaW4uX3B0LCBlbmRDYWNoZSwgcCwgc3RhcnROdW0sIGVuZE51bSAtIHN0YXJ0TnVtLCBfcmVuZGVyQ1NTUHJvcCk7XG4gICAgICBwbHVnaW4uX3B0LnUgPSBlbmRVbml0IHx8IDA7XG5cbiAgICAgIHBsdWdpbi5fcHJvcHMucHVzaChwKTtcbiAgICB9XG4gIH1cblxuICBfYXNzaWduKGVuZENhY2hlLCBzdGFydENhY2hlKTtcbn07IC8vIGhhbmRsZSBzcGxpdHRpbmcgYXBhcnQgcGFkZGluZywgbWFyZ2luLCBib3JkZXJXaWR0aCwgYW5kIGJvcmRlclJhZGl1cyBpbnRvIHRoZWlyIDQgY29tcG9uZW50cy4gRmlyZWZveCwgZm9yIGV4YW1wbGUsIHdvbid0IHJlcG9ydCBib3JkZXJSYWRpdXMgY29ycmVjdGx5IC0gaXQgd2lsbCBvbmx5IGRvIGJvcmRlclRvcExlZnRSYWRpdXMgYW5kIHRoZSBvdGhlciBjb3JuZXJzLiBXZSBhbHNvIHdhbnQgdG8gaGFuZGxlIHBhZGRpbmdUb3AsIG1hcmdpbkxlZnQsIGJvcmRlclJpZ2h0V2lkdGgsIGV0Yy5cblxuXG5fZm9yRWFjaE5hbWUoXCJwYWRkaW5nLG1hcmdpbixXaWR0aCxSYWRpdXNcIiwgZnVuY3Rpb24gKG5hbWUsIGluZGV4KSB7XG4gIHZhciB0ID0gXCJUb3BcIixcbiAgICAgIHIgPSBcIlJpZ2h0XCIsXG4gICAgICBiID0gXCJCb3R0b21cIixcbiAgICAgIGwgPSBcIkxlZnRcIixcbiAgICAgIHByb3BzID0gKGluZGV4IDwgMyA/IFt0LCByLCBiLCBsXSA6IFt0ICsgbCwgdCArIHIsIGIgKyByLCBiICsgbF0pLm1hcChmdW5jdGlvbiAoc2lkZSkge1xuICAgIHJldHVybiBpbmRleCA8IDIgPyBuYW1lICsgc2lkZSA6IFwiYm9yZGVyXCIgKyBzaWRlICsgbmFtZTtcbiAgfSk7XG5cbiAgX3NwZWNpYWxQcm9wc1tpbmRleCA+IDEgPyBcImJvcmRlclwiICsgbmFtZSA6IG5hbWVdID0gZnVuY3Rpb24gKHBsdWdpbiwgdGFyZ2V0LCBwcm9wZXJ0eSwgZW5kVmFsdWUsIHR3ZWVuKSB7XG4gICAgdmFyIGEsIHZhcnM7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDQpIHtcbiAgICAgIC8vIGdldHRlciwgcGFzc2VkIHRhcmdldCwgcHJvcGVydHksIGFuZCB1bml0IChmcm9tIF9nZXQoKSlcbiAgICAgIGEgPSBwcm9wcy5tYXAoZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgcmV0dXJuIF9nZXQocGx1Z2luLCBwcm9wLCBwcm9wZXJ0eSk7XG4gICAgICB9KTtcbiAgICAgIHZhcnMgPSBhLmpvaW4oXCIgXCIpO1xuICAgICAgcmV0dXJuIHZhcnMuc3BsaXQoYVswXSkubGVuZ3RoID09PSA1ID8gYVswXSA6IHZhcnM7XG4gICAgfVxuXG4gICAgYSA9IChlbmRWYWx1ZSArIFwiXCIpLnNwbGl0KFwiIFwiKTtcbiAgICB2YXJzID0ge307XG4gICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCwgaSkge1xuICAgICAgcmV0dXJuIHZhcnNbcHJvcF0gPSBhW2ldID0gYVtpXSB8fCBhWyhpIC0gMSkgLyAyIHwgMF07XG4gICAgfSk7XG4gICAgcGx1Z2luLmluaXQodGFyZ2V0LCB2YXJzLCB0d2Vlbik7XG4gIH07XG59KTtcblxuZXhwb3J0IHZhciBDU1NQbHVnaW4gPSB7XG4gIG5hbWU6IFwiY3NzXCIsXG4gIHJlZ2lzdGVyOiBfaW5pdENvcmUsXG4gIHRhcmdldFRlc3Q6IGZ1bmN0aW9uIHRhcmdldFRlc3QodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRhcmdldC5zdHlsZSAmJiB0YXJnZXQubm9kZVR5cGU7XG4gIH0sXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQodGFyZ2V0LCB2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldHMpIHtcbiAgICB2YXIgcHJvcHMgPSB0aGlzLl9wcm9wcyxcbiAgICAgICAgc3R5bGUgPSB0YXJnZXQuc3R5bGUsXG4gICAgICAgIHN0YXJ0QXQgPSB0d2Vlbi52YXJzLnN0YXJ0QXQsXG4gICAgICAgIHN0YXJ0VmFsdWUsXG4gICAgICAgIGVuZFZhbHVlLFxuICAgICAgICBlbmROdW0sXG4gICAgICAgIHN0YXJ0TnVtLFxuICAgICAgICB0eXBlLFxuICAgICAgICBzcGVjaWFsUHJvcCxcbiAgICAgICAgcCxcbiAgICAgICAgc3RhcnRVbml0LFxuICAgICAgICBlbmRVbml0LFxuICAgICAgICByZWxhdGl2ZSxcbiAgICAgICAgaXNUcmFuc2Zvcm1SZWxhdGVkLFxuICAgICAgICB0cmFuc2Zvcm1Qcm9wVHdlZW4sXG4gICAgICAgIGNhY2hlLFxuICAgICAgICBzbW9vdGgsXG4gICAgICAgIGhhc1ByaW9yaXR5LFxuICAgICAgICBpbmxpbmVQcm9wcztcbiAgICBfcGx1Z2luSW5pdHRlZCB8fCBfaW5pdENvcmUoKTsgLy8gd2UgbWF5IGNhbGwgaW5pdCgpIG11bHRpcGxlIHRpbWVzIG9uIHRoZSBzYW1lIHBsdWdpbiBpbnN0YW5jZSwgbGlrZSB3aGVuIGFkZGluZyBzcGVjaWFsIHByb3BlcnRpZXMsIHNvIG1ha2Ugc3VyZSB3ZSBkb24ndCBvdmVyd3JpdGUgdGhlIHJldmVydCBkYXRhIG9yIGlubGluZVByb3BzXG5cbiAgICB0aGlzLnN0eWxlcyA9IHRoaXMuc3R5bGVzIHx8IF9nZXRTdHlsZVNhdmVyKHRhcmdldCk7XG4gICAgaW5saW5lUHJvcHMgPSB0aGlzLnN0eWxlcy5wcm9wcztcbiAgICB0aGlzLnR3ZWVuID0gdHdlZW47XG5cbiAgICBmb3IgKHAgaW4gdmFycykge1xuICAgICAgaWYgKHAgPT09IFwiYXV0b1JvdW5kXCIpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGVuZFZhbHVlID0gdmFyc1twXTtcblxuICAgICAgaWYgKF9wbHVnaW5zW3BdICYmIF9jaGVja1BsdWdpbihwLCB2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykpIHtcbiAgICAgICAgLy8gcGx1Z2luc1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdHlwZSA9IHR5cGVvZiBlbmRWYWx1ZTtcbiAgICAgIHNwZWNpYWxQcm9wID0gX3NwZWNpYWxQcm9wc1twXTtcblxuICAgICAgaWYgKHR5cGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBlbmRWYWx1ZSA9IGVuZFZhbHVlLmNhbGwodHdlZW4sIGluZGV4LCB0YXJnZXQsIHRhcmdldHMpO1xuICAgICAgICB0eXBlID0gdHlwZW9mIGVuZFZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZSA9PT0gXCJzdHJpbmdcIiAmJiB+ZW5kVmFsdWUuaW5kZXhPZihcInJhbmRvbShcIikpIHtcbiAgICAgICAgZW5kVmFsdWUgPSBfcmVwbGFjZVJhbmRvbShlbmRWYWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzcGVjaWFsUHJvcCkge1xuICAgICAgICBzcGVjaWFsUHJvcCh0aGlzLCB0YXJnZXQsIHAsIGVuZFZhbHVlLCB0d2VlbikgJiYgKGhhc1ByaW9yaXR5ID0gMSk7XG4gICAgICB9IGVsc2UgaWYgKHAuc3Vic3RyKDAsIDIpID09PSBcIi0tXCIpIHtcbiAgICAgICAgLy9DU1MgdmFyaWFibGVcbiAgICAgICAgc3RhcnRWYWx1ZSA9IChnZXRDb21wdXRlZFN0eWxlKHRhcmdldCkuZ2V0UHJvcGVydHlWYWx1ZShwKSArIFwiXCIpLnRyaW0oKTtcbiAgICAgICAgZW5kVmFsdWUgKz0gXCJcIjtcbiAgICAgICAgX2NvbG9yRXhwLmxhc3RJbmRleCA9IDA7XG5cbiAgICAgICAgaWYgKCFfY29sb3JFeHAudGVzdChzdGFydFZhbHVlKSkge1xuICAgICAgICAgIC8vIGNvbG9ycyBkb24ndCBoYXZlIHVuaXRzXG4gICAgICAgICAgc3RhcnRVbml0ID0gZ2V0VW5pdChzdGFydFZhbHVlKTtcbiAgICAgICAgICBlbmRVbml0ID0gZ2V0VW5pdChlbmRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBlbmRVbml0ID8gc3RhcnRVbml0ICE9PSBlbmRVbml0ICYmIChzdGFydFZhbHVlID0gX2NvbnZlcnRUb1VuaXQodGFyZ2V0LCBwLCBzdGFydFZhbHVlLCBlbmRVbml0KSArIGVuZFVuaXQpIDogc3RhcnRVbml0ICYmIChlbmRWYWx1ZSArPSBzdGFydFVuaXQpO1xuICAgICAgICB0aGlzLmFkZChzdHlsZSwgXCJzZXRQcm9wZXJ0eVwiLCBzdGFydFZhbHVlLCBlbmRWYWx1ZSwgaW5kZXgsIHRhcmdldHMsIDAsIDAsIHApO1xuICAgICAgICBwcm9wcy5wdXNoKHApO1xuICAgICAgICBpbmxpbmVQcm9wcy5wdXNoKHAsIDAsIHN0eWxlW3BdKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAoc3RhcnRBdCAmJiBwIGluIHN0YXJ0QXQpIHtcbiAgICAgICAgICAvLyBpbiBjYXNlIHNvbWVvbmUgaGFyZC1jb2RlcyBhIGNvbXBsZXggdmFsdWUgYXMgdGhlIHN0YXJ0LCBsaWtlIHRvcDogXCJjYWxjKDJ2aCAvIDIpXCIuIFdpdGhvdXQgdGhpcywgaXQnZCB1c2UgdGhlIGNvbXB1dGVkIHZhbHVlIChhbHdheXMgaW4gcHgpXG4gICAgICAgICAgc3RhcnRWYWx1ZSA9IHR5cGVvZiBzdGFydEF0W3BdID09PSBcImZ1bmN0aW9uXCIgPyBzdGFydEF0W3BdLmNhbGwodHdlZW4sIGluZGV4LCB0YXJnZXQsIHRhcmdldHMpIDogc3RhcnRBdFtwXTtcbiAgICAgICAgICBfaXNTdHJpbmcoc3RhcnRWYWx1ZSkgJiYgfnN0YXJ0VmFsdWUuaW5kZXhPZihcInJhbmRvbShcIikgJiYgKHN0YXJ0VmFsdWUgPSBfcmVwbGFjZVJhbmRvbShzdGFydFZhbHVlKSk7XG4gICAgICAgICAgZ2V0VW5pdChzdGFydFZhbHVlICsgXCJcIikgfHwgKHN0YXJ0VmFsdWUgKz0gX2NvbmZpZy51bml0c1twXSB8fCBnZXRVbml0KF9nZXQodGFyZ2V0LCBwKSkgfHwgXCJcIik7IC8vIGZvciBjYXNlcyB3aGVuIHNvbWVvbmUgcGFzc2VzIGluIGEgdW5pdGxlc3MgdmFsdWUgbGlrZSB7eDogMTAwfTsgaWYgd2UgdHJ5IHNldHRpbmcgdHJhbnNsYXRlKDEwMCwgMHB4KSBpdCB3b24ndCB3b3JrLlxuXG4gICAgICAgICAgKHN0YXJ0VmFsdWUgKyBcIlwiKS5jaGFyQXQoMSkgPT09IFwiPVwiICYmIChzdGFydFZhbHVlID0gX2dldCh0YXJnZXQsIHApKTsgLy8gY2FuJ3Qgd29yayB3aXRoIHJlbGF0aXZlIHZhbHVlc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXJ0VmFsdWUgPSBfZ2V0KHRhcmdldCwgcCk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydE51bSA9IHBhcnNlRmxvYXQoc3RhcnRWYWx1ZSk7XG4gICAgICAgIHJlbGF0aXZlID0gdHlwZSA9PT0gXCJzdHJpbmdcIiAmJiBlbmRWYWx1ZS5jaGFyQXQoMSkgPT09IFwiPVwiICYmIGVuZFZhbHVlLnN1YnN0cigwLCAyKTtcbiAgICAgICAgcmVsYXRpdmUgJiYgKGVuZFZhbHVlID0gZW5kVmFsdWUuc3Vic3RyKDIpKTtcbiAgICAgICAgZW5kTnVtID0gcGFyc2VGbG9hdChlbmRWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHAgaW4gX3Byb3BlcnR5QWxpYXNlcykge1xuICAgICAgICAgIGlmIChwID09PSBcImF1dG9BbHBoYVwiKSB7XG4gICAgICAgICAgICAvL3NwZWNpYWwgY2FzZSB3aGVyZSB3ZSBjb250cm9sIHRoZSB2aXNpYmlsaXR5IGFsb25nIHdpdGggb3BhY2l0eS4gV2Ugc3RpbGwgYWxsb3cgdGhlIG9wYWNpdHkgdmFsdWUgdG8gcGFzcyB0aHJvdWdoIGFuZCBnZXQgdHdlZW5lZC5cbiAgICAgICAgICAgIGlmIChzdGFydE51bSA9PT0gMSAmJiBfZ2V0KHRhcmdldCwgXCJ2aXNpYmlsaXR5XCIpID09PSBcImhpZGRlblwiICYmIGVuZE51bSkge1xuICAgICAgICAgICAgICAvL2lmIHZpc2liaWxpdHkgaXMgaW5pdGlhbGx5IHNldCB0byBcImhpZGRlblwiLCB3ZSBzaG91bGQgaW50ZXJwcmV0IHRoYXQgYXMgaW50ZW50IHRvIG1ha2Ugb3BhY2l0eSAwIChhIGNvbnZlbmllbmNlKVxuICAgICAgICAgICAgICBzdGFydE51bSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlubGluZVByb3BzLnB1c2goXCJ2aXNpYmlsaXR5XCIsIDAsIHN0eWxlLnZpc2liaWxpdHkpO1xuXG4gICAgICAgICAgICBfYWRkTm9uVHdlZW5pbmdQVCh0aGlzLCBzdHlsZSwgXCJ2aXNpYmlsaXR5XCIsIHN0YXJ0TnVtID8gXCJpbmhlcml0XCIgOiBcImhpZGRlblwiLCBlbmROdW0gPyBcImluaGVyaXRcIiA6IFwiaGlkZGVuXCIsICFlbmROdW0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwICE9PSBcInNjYWxlXCIgJiYgcCAhPT0gXCJ0cmFuc2Zvcm1cIikge1xuICAgICAgICAgICAgcCA9IF9wcm9wZXJ0eUFsaWFzZXNbcF07XG4gICAgICAgICAgICB+cC5pbmRleE9mKFwiLFwiKSAmJiAocCA9IHAuc3BsaXQoXCIsXCIpWzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpc1RyYW5zZm9ybVJlbGF0ZWQgPSBwIGluIF90cmFuc2Zvcm1Qcm9wczsgLy8tLS0gVFJBTlNGT1JNLVJFTEFURUQgLS0tXG5cbiAgICAgICAgaWYgKGlzVHJhbnNmb3JtUmVsYXRlZCkge1xuICAgICAgICAgIHRoaXMuc3R5bGVzLnNhdmUocCk7XG5cbiAgICAgICAgICBpZiAoIXRyYW5zZm9ybVByb3BUd2Vlbikge1xuICAgICAgICAgICAgY2FjaGUgPSB0YXJnZXQuX2dzYXA7XG4gICAgICAgICAgICBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0gJiYgIXZhcnMucGFyc2VUcmFuc2Zvcm0gfHwgX3BhcnNlVHJhbnNmb3JtKHRhcmdldCwgdmFycy5wYXJzZVRyYW5zZm9ybSk7IC8vIGlmLCBmb3IgZXhhbXBsZSwgZ3NhcC5zZXQoLi4uIHt0cmFuc2Zvcm06XCJ0cmFuc2xhdGVYKDUwdncpXCJ9KSwgdGhlIF9nZXQoKSBjYWxsIGRvZXNuJ3QgcGFyc2UgdGhlIHRyYW5zZm9ybSwgdGh1cyBjYWNoZS5yZW5kZXJUcmFuc2Zvcm0gd29uJ3QgYmUgc2V0IHlldCBzbyBmb3JjZSB0aGUgcGFyc2luZyBvZiB0aGUgdHJhbnNmb3JtIGhlcmUuXG5cbiAgICAgICAgICAgIHNtb290aCA9IHZhcnMuc21vb3RoT3JpZ2luICE9PSBmYWxzZSAmJiBjYWNoZS5zbW9vdGg7XG4gICAgICAgICAgICB0cmFuc2Zvcm1Qcm9wVHdlZW4gPSB0aGlzLl9wdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIHN0eWxlLCBfdHJhbnNmb3JtUHJvcCwgMCwgMSwgY2FjaGUucmVuZGVyVHJhbnNmb3JtLCBjYWNoZSwgMCwgLTEpOyAvL3RoZSBmaXJzdCB0aW1lIHRocm91Z2gsIGNyZWF0ZSB0aGUgcmVuZGVyaW5nIFByb3BUd2VlbiBzbyB0aGF0IGl0IHJ1bnMgTEFTVCAoaW4gdGhlIGxpbmtlZCBsaXN0LCB3ZSBrZWVwIGFkZGluZyB0byB0aGUgYmVnaW5uaW5nKVxuXG4gICAgICAgICAgICB0cmFuc2Zvcm1Qcm9wVHdlZW4uZGVwID0gMTsgLy9mbGFnIGl0IGFzIGRlcGVuZGVudCBzbyB0aGF0IGlmIHRoaW5ncyBnZXQga2lsbGVkL292ZXJ3cml0dGVuIGFuZCB0aGlzIGlzIHRoZSBvbmx5IFByb3BUd2VlbiBsZWZ0LCB3ZSBjYW4gc2FmZWx5IGtpbGwgdGhlIHdob2xlIHR3ZWVuLlxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwID09PSBcInNjYWxlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3B0ID0gbmV3IFByb3BUd2Vlbih0aGlzLl9wdCwgY2FjaGUsIFwic2NhbGVZXCIsIGNhY2hlLnNjYWxlWSwgKHJlbGF0aXZlID8gX3BhcnNlUmVsYXRpdmUoY2FjaGUuc2NhbGVZLCByZWxhdGl2ZSArIGVuZE51bSkgOiBlbmROdW0pIC0gY2FjaGUuc2NhbGVZIHx8IDAsIF9yZW5kZXJDU1NQcm9wKTtcbiAgICAgICAgICAgIHRoaXMuX3B0LnUgPSAwO1xuICAgICAgICAgICAgcHJvcHMucHVzaChcInNjYWxlWVwiLCBwKTtcbiAgICAgICAgICAgIHAgKz0gXCJYXCI7XG4gICAgICAgICAgfSBlbHNlIGlmIChwID09PSBcInRyYW5zZm9ybU9yaWdpblwiKSB7XG4gICAgICAgICAgICBpbmxpbmVQcm9wcy5wdXNoKF90cmFuc2Zvcm1PcmlnaW5Qcm9wLCAwLCBzdHlsZVtfdHJhbnNmb3JtT3JpZ2luUHJvcF0pO1xuICAgICAgICAgICAgZW5kVmFsdWUgPSBfY29udmVydEtleXdvcmRzVG9QZXJjZW50YWdlcyhlbmRWYWx1ZSk7IC8vaW4gY2FzZSBzb21ldGhpbmcgbGlrZSBcImxlZnQgdG9wXCIgb3IgXCJib3R0b20gcmlnaHRcIiBpcyBwYXNzZWQgaW4uIENvbnZlcnQgdG8gcGVyY2VudGFnZXMuXG5cbiAgICAgICAgICAgIGlmIChjYWNoZS5zdmcpIHtcbiAgICAgICAgICAgICAgX2FwcGx5U1ZHT3JpZ2luKHRhcmdldCwgZW5kVmFsdWUsIDAsIHNtb290aCwgMCwgdGhpcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbmRVbml0ID0gcGFyc2VGbG9hdChlbmRWYWx1ZS5zcGxpdChcIiBcIilbMl0pIHx8IDA7IC8vaGFuZGxlIHRoZSB6T3JpZ2luIHNlcGFyYXRlbHkhXG5cbiAgICAgICAgICAgICAgZW5kVW5pdCAhPT0gY2FjaGUuek9yaWdpbiAmJiBfYWRkTm9uVHdlZW5pbmdQVCh0aGlzLCBjYWNoZSwgXCJ6T3JpZ2luXCIsIGNhY2hlLnpPcmlnaW4sIGVuZFVuaXQpO1xuXG4gICAgICAgICAgICAgIF9hZGROb25Ud2VlbmluZ1BUKHRoaXMsIHN0eWxlLCBwLCBfZmlyc3RUd29Pbmx5KHN0YXJ0VmFsdWUpLCBfZmlyc3RUd29Pbmx5KGVuZFZhbHVlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocCA9PT0gXCJzdmdPcmlnaW5cIikge1xuICAgICAgICAgICAgX2FwcGx5U1ZHT3JpZ2luKHRhcmdldCwgZW5kVmFsdWUsIDEsIHNtb290aCwgMCwgdGhpcyk7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocCBpbiBfcm90YXRpb25hbFByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIF9hZGRSb3RhdGlvbmFsUHJvcFR3ZWVuKHRoaXMsIGNhY2hlLCBwLCBzdGFydE51bSwgcmVsYXRpdmUgPyBfcGFyc2VSZWxhdGl2ZShzdGFydE51bSwgcmVsYXRpdmUgKyBlbmRWYWx1ZSkgOiBlbmRWYWx1ZSk7XG5cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAocCA9PT0gXCJzbW9vdGhPcmlnaW5cIikge1xuICAgICAgICAgICAgX2FkZE5vblR3ZWVuaW5nUFQodGhpcywgY2FjaGUsIFwic21vb3RoXCIsIGNhY2hlLnNtb290aCwgZW5kVmFsdWUpO1xuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgPT09IFwiZm9yY2UzRFwiKSB7XG4gICAgICAgICAgICBjYWNoZVtwXSA9IGVuZFZhbHVlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChwID09PSBcInRyYW5zZm9ybVwiKSB7XG4gICAgICAgICAgICBfYWRkUmF3VHJhbnNmb3JtUFRzKHRoaXMsIGVuZFZhbHVlLCB0YXJnZXQpO1xuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIShwIGluIHN0eWxlKSkge1xuICAgICAgICAgIHAgPSBfY2hlY2tQcm9wUHJlZml4KHApIHx8IHA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNUcmFuc2Zvcm1SZWxhdGVkIHx8IChlbmROdW0gfHwgZW5kTnVtID09PSAwKSAmJiAoc3RhcnROdW0gfHwgc3RhcnROdW0gPT09IDApICYmICFfY29tcGxleEV4cC50ZXN0KGVuZFZhbHVlKSAmJiBwIGluIHN0eWxlKSB7XG4gICAgICAgICAgc3RhcnRVbml0ID0gKHN0YXJ0VmFsdWUgKyBcIlwiKS5zdWJzdHIoKHN0YXJ0TnVtICsgXCJcIikubGVuZ3RoKTtcbiAgICAgICAgICBlbmROdW0gfHwgKGVuZE51bSA9IDApOyAvLyBwcm90ZWN0IGFnYWluc3QgTmFOXG5cbiAgICAgICAgICBlbmRVbml0ID0gZ2V0VW5pdChlbmRWYWx1ZSkgfHwgKHAgaW4gX2NvbmZpZy51bml0cyA/IF9jb25maWcudW5pdHNbcF0gOiBzdGFydFVuaXQpO1xuICAgICAgICAgIHN0YXJ0VW5pdCAhPT0gZW5kVW5pdCAmJiAoc3RhcnROdW0gPSBfY29udmVydFRvVW5pdCh0YXJnZXQsIHAsIHN0YXJ0VmFsdWUsIGVuZFVuaXQpKTtcbiAgICAgICAgICB0aGlzLl9wdCA9IG5ldyBQcm9wVHdlZW4odGhpcy5fcHQsIGlzVHJhbnNmb3JtUmVsYXRlZCA/IGNhY2hlIDogc3R5bGUsIHAsIHN0YXJ0TnVtLCAocmVsYXRpdmUgPyBfcGFyc2VSZWxhdGl2ZShzdGFydE51bSwgcmVsYXRpdmUgKyBlbmROdW0pIDogZW5kTnVtKSAtIHN0YXJ0TnVtLCAhaXNUcmFuc2Zvcm1SZWxhdGVkICYmIChlbmRVbml0ID09PSBcInB4XCIgfHwgcCA9PT0gXCJ6SW5kZXhcIikgJiYgdmFycy5hdXRvUm91bmQgIT09IGZhbHNlID8gX3JlbmRlclJvdW5kZWRDU1NQcm9wIDogX3JlbmRlckNTU1Byb3ApO1xuICAgICAgICAgIHRoaXMuX3B0LnUgPSBlbmRVbml0IHx8IDA7XG5cbiAgICAgICAgICBpZiAoc3RhcnRVbml0ICE9PSBlbmRVbml0ICYmIGVuZFVuaXQgIT09IFwiJVwiKSB7XG4gICAgICAgICAgICAvL3doZW4gdGhlIHR3ZWVuIGdvZXMgYWxsIHRoZSB3YXkgYmFjayB0byB0aGUgYmVnaW5uaW5nLCB3ZSBuZWVkIHRvIHJldmVydCBpdCB0byB0aGUgT0xEL09SSUdJTkFMIHZhbHVlICh3aXRoIHRob3NlIHVuaXRzKS4gV2UgcmVjb3JkIHRoYXQgYXMgYSBcImJcIiAoYmVnaW5uaW5nKSBwcm9wZXJ0eSBhbmQgcG9pbnQgdG8gYSByZW5kZXIgbWV0aG9kIHRoYXQgaGFuZGxlcyB0aGF0LiAocGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uKVxuICAgICAgICAgICAgdGhpcy5fcHQuYiA9IHN0YXJ0VmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9wdC5yID0gX3JlbmRlckNTU1Byb3BXaXRoQmVnaW5uaW5nO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghKHAgaW4gc3R5bGUpKSB7XG4gICAgICAgICAgaWYgKHAgaW4gdGFyZ2V0KSB7XG4gICAgICAgICAgICAvL21heWJlIGl0J3Mgbm90IGEgc3R5bGUgLSBpdCBjb3VsZCBiZSBhIHByb3BlcnR5IGFkZGVkIGRpcmVjdGx5IHRvIGFuIGVsZW1lbnQgaW4gd2hpY2ggY2FzZSB3ZSdsbCB0cnkgdG8gYW5pbWF0ZSB0aGF0LlxuICAgICAgICAgICAgdGhpcy5hZGQodGFyZ2V0LCBwLCBzdGFydFZhbHVlIHx8IHRhcmdldFtwXSwgcmVsYXRpdmUgPyByZWxhdGl2ZSArIGVuZFZhbHVlIDogZW5kVmFsdWUsIGluZGV4LCB0YXJnZXRzKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHAgIT09IFwicGFyc2VUcmFuc2Zvcm1cIikge1xuICAgICAgICAgICAgX21pc3NpbmdQbHVnaW4ocCwgZW5kVmFsdWUpO1xuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3R3ZWVuQ29tcGxleENTU1N0cmluZy5jYWxsKHRoaXMsIHRhcmdldCwgcCwgc3RhcnRWYWx1ZSwgcmVsYXRpdmUgPyByZWxhdGl2ZSArIGVuZFZhbHVlIDogZW5kVmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXNUcmFuc2Zvcm1SZWxhdGVkIHx8IChwIGluIHN0eWxlID8gaW5saW5lUHJvcHMucHVzaChwLCAwLCBzdHlsZVtwXSkgOiBpbmxpbmVQcm9wcy5wdXNoKHAsIDEsIHN0YXJ0VmFsdWUgfHwgdGFyZ2V0W3BdKSk7XG4gICAgICAgIHByb3BzLnB1c2gocCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaGFzUHJpb3JpdHkgJiYgX3NvcnRQcm9wVHdlZW5zQnlQcmlvcml0eSh0aGlzKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIocmF0aW8sIGRhdGEpIHtcbiAgICBpZiAoZGF0YS50d2Vlbi5fdGltZSB8fCAhX3JldmVydGluZygpKSB7XG4gICAgICB2YXIgcHQgPSBkYXRhLl9wdDtcblxuICAgICAgd2hpbGUgKHB0KSB7XG4gICAgICAgIHB0LnIocmF0aW8sIHB0LmQpO1xuICAgICAgICBwdCA9IHB0Ll9uZXh0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhLnN0eWxlcy5yZXZlcnQoKTtcbiAgICB9XG4gIH0sXG4gIGdldDogX2dldCxcbiAgYWxpYXNlczogX3Byb3BlcnR5QWxpYXNlcyxcbiAgZ2V0U2V0dGVyOiBmdW5jdGlvbiBnZXRTZXR0ZXIodGFyZ2V0LCBwcm9wZXJ0eSwgcGx1Z2luKSB7XG4gICAgLy9yZXR1cm5zIGEgc2V0dGVyIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyB0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSBhbmQgYXBwbGllcyBpdCBhY2NvcmRpbmdseS4gUmVtZW1iZXIsIHByb3BlcnRpZXMgbGlrZSBcInhcIiBhcmVuJ3QgYXMgc2ltcGxlIGFzIHRhcmdldC5zdHlsZS5wcm9wZXJ0eSA9IHZhbHVlIGJlY2F1c2UgdGhleSd2ZSBnb3QgdG8gYmUgYXBwbGllZCB0byBhIHByb3h5IG9iamVjdCBhbmQgdGhlbiBtZXJnZWQgaW50byBhIHRyYW5zZm9ybSBzdHJpbmcgaW4gYSByZW5kZXJlci5cbiAgICB2YXIgcCA9IF9wcm9wZXJ0eUFsaWFzZXNbcHJvcGVydHldO1xuICAgIHAgJiYgcC5pbmRleE9mKFwiLFwiKSA8IDAgJiYgKHByb3BlcnR5ID0gcCk7XG4gICAgcmV0dXJuIHByb3BlcnR5IGluIF90cmFuc2Zvcm1Qcm9wcyAmJiBwcm9wZXJ0eSAhPT0gX3RyYW5zZm9ybU9yaWdpblByb3AgJiYgKHRhcmdldC5fZ3NhcC54IHx8IF9nZXQodGFyZ2V0LCBcInhcIikpID8gcGx1Z2luICYmIF9yZWNlbnRTZXR0ZXJQbHVnaW4gPT09IHBsdWdpbiA/IHByb3BlcnR5ID09PSBcInNjYWxlXCIgPyBfc2V0dGVyU2NhbGUgOiBfc2V0dGVyVHJhbnNmb3JtIDogKF9yZWNlbnRTZXR0ZXJQbHVnaW4gPSBwbHVnaW4gfHwge30pICYmIChwcm9wZXJ0eSA9PT0gXCJzY2FsZVwiID8gX3NldHRlclNjYWxlV2l0aFJlbmRlciA6IF9zZXR0ZXJUcmFuc2Zvcm1XaXRoUmVuZGVyKSA6IHRhcmdldC5zdHlsZSAmJiAhX2lzVW5kZWZpbmVkKHRhcmdldC5zdHlsZVtwcm9wZXJ0eV0pID8gX3NldHRlckNTU1N0eWxlIDogfnByb3BlcnR5LmluZGV4T2YoXCItXCIpID8gX3NldHRlckNTU1Byb3AgOiBfZ2V0U2V0dGVyKHRhcmdldCwgcHJvcGVydHkpO1xuICB9LFxuICBjb3JlOiB7XG4gICAgX3JlbW92ZVByb3BlcnR5OiBfcmVtb3ZlUHJvcGVydHksXG4gICAgX2dldE1hdHJpeDogX2dldE1hdHJpeFxuICB9XG59O1xuZ3NhcC51dGlscy5jaGVja1ByZWZpeCA9IF9jaGVja1Byb3BQcmVmaXg7XG5nc2FwLmNvcmUuZ2V0U3R5bGVTYXZlciA9IF9nZXRTdHlsZVNhdmVyO1xuXG4oZnVuY3Rpb24gKHBvc2l0aW9uQW5kU2NhbGUsIHJvdGF0aW9uLCBvdGhlcnMsIGFsaWFzZXMpIHtcbiAgdmFyIGFsbCA9IF9mb3JFYWNoTmFtZShwb3NpdGlvbkFuZFNjYWxlICsgXCIsXCIgKyByb3RhdGlvbiArIFwiLFwiICsgb3RoZXJzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgIF90cmFuc2Zvcm1Qcm9wc1tuYW1lXSA9IDE7XG4gIH0pO1xuXG4gIF9mb3JFYWNoTmFtZShyb3RhdGlvbiwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBfY29uZmlnLnVuaXRzW25hbWVdID0gXCJkZWdcIjtcbiAgICBfcm90YXRpb25hbFByb3BlcnRpZXNbbmFtZV0gPSAxO1xuICB9KTtcblxuICBfcHJvcGVydHlBbGlhc2VzW2FsbFsxM11dID0gcG9zaXRpb25BbmRTY2FsZSArIFwiLFwiICsgcm90YXRpb247XG5cbiAgX2ZvckVhY2hOYW1lKGFsaWFzZXMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIHNwbGl0ID0gbmFtZS5zcGxpdChcIjpcIik7XG4gICAgX3Byb3BlcnR5QWxpYXNlc1tzcGxpdFsxXV0gPSBhbGxbc3BsaXRbMF1dO1xuICB9KTtcbn0pKFwieCx5LHosc2NhbGUsc2NhbGVYLHNjYWxlWSx4UGVyY2VudCx5UGVyY2VudFwiLCBcInJvdGF0aW9uLHJvdGF0aW9uWCxyb3RhdGlvblksc2tld1gsc2tld1lcIiwgXCJ0cmFuc2Zvcm0sdHJhbnNmb3JtT3JpZ2luLHN2Z09yaWdpbixmb3JjZTNELHNtb290aE9yaWdpbix0cmFuc2Zvcm1QZXJzcGVjdGl2ZVwiLCBcIjA6dHJhbnNsYXRlWCwxOnRyYW5zbGF0ZVksMjp0cmFuc2xhdGVaLDg6cm90YXRlLDg6cm90YXRpb25aLDg6cm90YXRlWiw5OnJvdGF0ZVgsMTA6cm90YXRlWVwiKTtcblxuX2ZvckVhY2hOYW1lKFwieCx5LHosdG9wLHJpZ2h0LGJvdHRvbSxsZWZ0LHdpZHRoLGhlaWdodCxmb250U2l6ZSxwYWRkaW5nLG1hcmdpbixwZXJzcGVjdGl2ZVwiLCBmdW5jdGlvbiAobmFtZSkge1xuICBfY29uZmlnLnVuaXRzW25hbWVdID0gXCJweFwiO1xufSk7XG5cbmdzYXAucmVnaXN0ZXJQbHVnaW4oQ1NTUGx1Z2luKTtcbmV4cG9ydCB7IENTU1BsdWdpbiBhcyBkZWZhdWx0LCBfZ2V0QkJveCwgX2NyZWF0ZUVsZW1lbnQsIF9jaGVja1Byb3BQcmVmaXggYXMgY2hlY2tQcmVmaXggfTsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbi8qIVxuICogT2JzZXJ2ZXIgMy4xMS41XG4gKiBodHRwczovL2dyZWVuc29jay5jb21cbiAqXG4gKiBAbGljZW5zZSBDb3B5cmlnaHQgMjAwOC0yMDIzLCBHcmVlblNvY2suIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBTdWJqZWN0IHRvIHRoZSB0ZXJtcyBhdCBodHRwczovL2dyZWVuc29jay5jb20vc3RhbmRhcmQtbGljZW5zZSBvciBmb3JcbiAqIENsdWIgR3JlZW5Tb2NrIG1lbWJlcnMsIHRoZSBhZ3JlZW1lbnQgaXNzdWVkIHdpdGggdGhhdCBtZW1iZXJzaGlwLlxuICogQGF1dGhvcjogSmFjayBEb3lsZSwgamFja0BncmVlbnNvY2suY29tXG4qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xudmFyIGdzYXAsXG4gICAgX2NvcmVJbml0dGVkLFxuICAgIF9jbGFtcCxcbiAgICBfd2luLFxuICAgIF9kb2MsXG4gICAgX2RvY0VsLFxuICAgIF9ib2R5LFxuICAgIF9pc1RvdWNoLFxuICAgIF9wb2ludGVyVHlwZSxcbiAgICBTY3JvbGxUcmlnZ2VyLFxuICAgIF9yb290LFxuICAgIF9ub3JtYWxpemVyLFxuICAgIF9ldmVudFR5cGVzLFxuICAgIF9jb250ZXh0LFxuICAgIF9nZXRHU0FQID0gZnVuY3Rpb24gX2dldEdTQVAoKSB7XG4gIHJldHVybiBnc2FwIHx8IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgKGdzYXAgPSB3aW5kb3cuZ3NhcCkgJiYgZ3NhcC5yZWdpc3RlclBsdWdpbiAmJiBnc2FwO1xufSxcbiAgICBfcGFzc1Rocm91Z2ggPSBmdW5jdGlvbiBfcGFzc1Rocm91Z2gocCkge1xuICByZXR1cm4gcDtcbn0sXG4gICAgX3N0YXJ0dXAgPSAxLFxuICAgIF9vYnNlcnZlcnMgPSBbXSxcbiAgICBfc2Nyb2xsZXJzID0gW10sXG4gICAgX3Byb3hpZXMgPSBbXSxcbiAgICBfZ2V0VGltZSA9IERhdGUubm93LFxuICAgIF9icmlkZ2UgPSBmdW5jdGlvbiBfYnJpZGdlKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn0sXG4gICAgX2ludGVncmF0ZSA9IGZ1bmN0aW9uIF9pbnRlZ3JhdGUoKSB7XG4gIHZhciBjb3JlID0gU2Nyb2xsVHJpZ2dlci5jb3JlLFxuICAgICAgZGF0YSA9IGNvcmUuYnJpZGdlIHx8IHt9LFxuICAgICAgc2Nyb2xsZXJzID0gY29yZS5fc2Nyb2xsZXJzLFxuICAgICAgcHJveGllcyA9IGNvcmUuX3Byb3hpZXM7XG4gIHNjcm9sbGVycy5wdXNoLmFwcGx5KHNjcm9sbGVycywgX3Njcm9sbGVycyk7XG4gIHByb3hpZXMucHVzaC5hcHBseShwcm94aWVzLCBfcHJveGllcyk7XG4gIF9zY3JvbGxlcnMgPSBzY3JvbGxlcnM7XG4gIF9wcm94aWVzID0gcHJveGllcztcblxuICBfYnJpZGdlID0gZnVuY3Rpb24gX2JyaWRnZShuYW1lLCB2YWx1ZSkge1xuICAgIHJldHVybiBkYXRhW25hbWVdKHZhbHVlKTtcbiAgfTtcbn0sXG4gICAgX2dldFByb3h5UHJvcCA9IGZ1bmN0aW9uIF9nZXRQcm94eVByb3AoZWxlbWVudCwgcHJvcGVydHkpIHtcbiAgcmV0dXJuIH5fcHJveGllcy5pbmRleE9mKGVsZW1lbnQpICYmIF9wcm94aWVzW19wcm94aWVzLmluZGV4T2YoZWxlbWVudCkgKyAxXVtwcm9wZXJ0eV07XG59LFxuICAgIF9pc1ZpZXdwb3J0ID0gZnVuY3Rpb24gX2lzVmlld3BvcnQoZWwpIHtcbiAgcmV0dXJuICEhfl9yb290LmluZGV4T2YoZWwpO1xufSxcbiAgICBfYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBfYWRkTGlzdGVuZXIoZWxlbWVudCwgdHlwZSwgZnVuYywgbm9uUGFzc2l2ZSwgY2FwdHVyZSkge1xuICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMsIHtcbiAgICBwYXNzaXZlOiAhbm9uUGFzc2l2ZSxcbiAgICBjYXB0dXJlOiAhIWNhcHR1cmVcbiAgfSk7XG59LFxuICAgIF9yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIF9yZW1vdmVMaXN0ZW5lcihlbGVtZW50LCB0eXBlLCBmdW5jLCBjYXB0dXJlKSB7XG4gIHJldHVybiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZnVuYywgISFjYXB0dXJlKTtcbn0sXG4gICAgX3Njcm9sbExlZnQgPSBcInNjcm9sbExlZnRcIixcbiAgICBfc2Nyb2xsVG9wID0gXCJzY3JvbGxUb3BcIixcbiAgICBfb25TY3JvbGwgPSBmdW5jdGlvbiBfb25TY3JvbGwoKSB7XG4gIHJldHVybiBfbm9ybWFsaXplciAmJiBfbm9ybWFsaXplci5pc1ByZXNzZWQgfHwgX3Njcm9sbGVycy5jYWNoZSsrO1xufSxcbiAgICBfc2Nyb2xsQ2FjaGVGdW5jID0gZnVuY3Rpb24gX3Njcm9sbENhY2hlRnVuYyhmLCBkb05vdENhY2hlKSB7XG4gIHZhciBjYWNoaW5nRnVuYyA9IGZ1bmN0aW9uIGNhY2hpbmdGdW5jKHZhbHVlKSB7XG4gICAgLy8gc2luY2UgcmVhZGluZyB0aGUgc2Nyb2xsVG9wL3Njcm9sbExlZnQvcGFnZU9mZnNldFkvcGFnZU9mZnNldFggY2FuIHRyaWdnZXIgYSBsYXlvdXQsIHRoaXMgZnVuY3Rpb24gYWxsb3dzIHVzIHRvIGNhY2hlIHRoZSB2YWx1ZSBzbyBpdCBvbmx5IGdldHMgcmVhZCBmcmVzaCBhZnRlciBhIFwic2Nyb2xsXCIgZXZlbnQgZmlyZXMgKG9yIHdoaWxlIHdlJ3JlIHJlZnJlc2hpbmcgYmVjYXVzZSB0aGF0IGNhbiBsZW5ndGhlbiB0aGUgcGFnZSBhbmQgYWx0ZXIgdGhlIHNjcm9sbCBwb3NpdGlvbikuIHdoZW4gXCJzb2Z0XCIgaXMgdHJ1ZSwgdGhhdCBtZWFucyBkb24ndCBhY3R1YWxseSBzZXQgdGhlIHNjcm9sbCwgYnV0IGNhY2hlIHRoZSBuZXcgdmFsdWUgaW5zdGVhZCAodXNlZnVsIGluIFNjcm9sbFNtb290aGVyKVxuICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkge1xuICAgICAgX3N0YXJ0dXAgJiYgKF93aW4uaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9IFwibWFudWFsXCIpOyAvLyBvdGhlcndpc2UgdGhlIG5ldyBwb3NpdGlvbiB3aWxsIGdldCBvdmVyd3JpdHRlbiBieSB0aGUgYnJvd3NlciBvbmxvYWQuXG5cbiAgICAgIHZhciBpc05vcm1hbGl6aW5nID0gX25vcm1hbGl6ZXIgJiYgX25vcm1hbGl6ZXIuaXNQcmVzc2VkO1xuICAgICAgdmFsdWUgPSBjYWNoaW5nRnVuYy52ID0gTWF0aC5yb3VuZCh2YWx1ZSkgfHwgKF9ub3JtYWxpemVyICYmIF9ub3JtYWxpemVyLmlPUyA/IDEgOiAwKTsgLy9UT0RPOiBpT1MgQnVnOiBpZiB5b3UgYWxsb3cgaXQgdG8gZ28gdG8gMCwgU2FmYXJpIGNhbiBzdGFydCB0byByZXBvcnQgc3VwZXIgc3RyYW5nZSAod2lsZGx5IGluYWNjdXJhdGUpIHRvdWNoIHBvc2l0aW9ucyFcblxuICAgICAgZih2YWx1ZSk7XG4gICAgICBjYWNoaW5nRnVuYy5jYWNoZUlEID0gX3Njcm9sbGVycy5jYWNoZTtcbiAgICAgIGlzTm9ybWFsaXppbmcgJiYgX2JyaWRnZShcInNzXCIsIHZhbHVlKTsgLy8gc2V0IHNjcm9sbCAobm90aWZ5IFNjcm9sbFRyaWdnZXIgc28gaXQgY2FuIGRpc3BhdGNoIGEgXCJzY3JvbGxTdGFydFwiIGV2ZW50IGlmIG5lY2Vzc2FyeVxuICAgIH0gZWxzZSBpZiAoZG9Ob3RDYWNoZSB8fCBfc2Nyb2xsZXJzLmNhY2hlICE9PSBjYWNoaW5nRnVuYy5jYWNoZUlEIHx8IF9icmlkZ2UoXCJyZWZcIikpIHtcbiAgICAgIGNhY2hpbmdGdW5jLmNhY2hlSUQgPSBfc2Nyb2xsZXJzLmNhY2hlO1xuICAgICAgY2FjaGluZ0Z1bmMudiA9IGYoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGluZ0Z1bmMudiArIGNhY2hpbmdGdW5jLm9mZnNldDtcbiAgfTtcblxuICBjYWNoaW5nRnVuYy5vZmZzZXQgPSAwO1xuICByZXR1cm4gZiAmJiBjYWNoaW5nRnVuYztcbn0sXG4gICAgX2hvcml6b250YWwgPSB7XG4gIHM6IF9zY3JvbGxMZWZ0LFxuICBwOiBcImxlZnRcIixcbiAgcDI6IFwiTGVmdFwiLFxuICBvczogXCJyaWdodFwiLFxuICBvczI6IFwiUmlnaHRcIixcbiAgZDogXCJ3aWR0aFwiLFxuICBkMjogXCJXaWR0aFwiLFxuICBhOiBcInhcIixcbiAgc2M6IF9zY3JvbGxDYWNoZUZ1bmMoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyBfd2luLnNjcm9sbFRvKHZhbHVlLCBfdmVydGljYWwuc2MoKSkgOiBfd2luLnBhZ2VYT2Zmc2V0IHx8IF9kb2NbX3Njcm9sbExlZnRdIHx8IF9kb2NFbFtfc2Nyb2xsTGVmdF0gfHwgX2JvZHlbX3Njcm9sbExlZnRdIHx8IDA7XG4gIH0pXG59LFxuICAgIF92ZXJ0aWNhbCA9IHtcbiAgczogX3Njcm9sbFRvcCxcbiAgcDogXCJ0b3BcIixcbiAgcDI6IFwiVG9wXCIsXG4gIG9zOiBcImJvdHRvbVwiLFxuICBvczI6IFwiQm90dG9tXCIsXG4gIGQ6IFwiaGVpZ2h0XCIsXG4gIGQyOiBcIkhlaWdodFwiLFxuICBhOiBcInlcIixcbiAgb3A6IF9ob3Jpem9udGFsLFxuICBzYzogX3Njcm9sbENhY2hlRnVuYyhmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IF93aW4uc2Nyb2xsVG8oX2hvcml6b250YWwuc2MoKSwgdmFsdWUpIDogX3dpbi5wYWdlWU9mZnNldCB8fCBfZG9jW19zY3JvbGxUb3BdIHx8IF9kb2NFbFtfc2Nyb2xsVG9wXSB8fCBfYm9keVtfc2Nyb2xsVG9wXSB8fCAwO1xuICB9KVxufSxcbiAgICBfZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gX2dldFRhcmdldCh0KSB7XG4gIHJldHVybiBnc2FwLnV0aWxzLnRvQXJyYXkodClbMF0gfHwgKHR5cGVvZiB0ID09PSBcInN0cmluZ1wiICYmIGdzYXAuY29uZmlnKCkubnVsbFRhcmdldFdhcm4gIT09IGZhbHNlID8gY29uc29sZS53YXJuKFwiRWxlbWVudCBub3QgZm91bmQ6XCIsIHQpIDogbnVsbCk7XG59LFxuICAgIF9nZXRTY3JvbGxGdW5jID0gZnVuY3Rpb24gX2dldFNjcm9sbEZ1bmMoZWxlbWVudCwgX3JlZikge1xuICB2YXIgcyA9IF9yZWYucyxcbiAgICAgIHNjID0gX3JlZi5zYztcbiAgLy8gd2Ugc3RvcmUgdGhlIHNjcm9sbGVyIGZ1bmN0aW9ucyBpbiBhbiBhbHRlcm5hdGluZyBzZXF1ZW5jZWQgQXJyYXkgbGlrZSBbZWxlbWVudCwgdmVydGljYWxTY3JvbGxGdW5jLCBob3Jpem9udGFsU2Nyb2xsRnVuYywgLi4uXSBzbyB0aGF0IHdlIGNhbiBtaW5pbWl6ZSBtZW1vcnksIG1heGltaXplIHBlcmZvcm1hbmNlLCBhbmQgd2UgYWxzbyByZWNvcmQgdGhlIGxhc3QgcG9zaXRpb24gYXMgYSBcIi5yZWNcIiBwcm9wZXJ0eSBpbiBvcmRlciB0byByZXZlcnQgdG8gdGhhdCBhZnRlciByZWZyZXNoaW5nIHRvIGVuc3VyZSB0aGluZ3MgZG9uJ3Qgc2hpZnQgYXJvdW5kLlxuICBfaXNWaWV3cG9ydChlbGVtZW50KSAmJiAoZWxlbWVudCA9IF9kb2Muc2Nyb2xsaW5nRWxlbWVudCB8fCBfZG9jRWwpO1xuXG4gIHZhciBpID0gX3Njcm9sbGVycy5pbmRleE9mKGVsZW1lbnQpLFxuICAgICAgb2Zmc2V0ID0gc2MgPT09IF92ZXJ0aWNhbC5zYyA/IDEgOiAyO1xuXG4gICF+aSAmJiAoaSA9IF9zY3JvbGxlcnMucHVzaChlbGVtZW50KSAtIDEpO1xuICBfc2Nyb2xsZXJzW2kgKyBvZmZzZXRdIHx8IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBfb25TY3JvbGwpOyAvLyBjbGVhciB0aGUgY2FjaGUgd2hlbiBhIHNjcm9sbCBvY2N1cnNcblxuICB2YXIgcHJldiA9IF9zY3JvbGxlcnNbaSArIG9mZnNldF0sXG4gICAgICBmdW5jID0gcHJldiB8fCAoX3Njcm9sbGVyc1tpICsgb2Zmc2V0XSA9IF9zY3JvbGxDYWNoZUZ1bmMoX2dldFByb3h5UHJvcChlbGVtZW50LCBzKSwgdHJ1ZSkgfHwgKF9pc1ZpZXdwb3J0KGVsZW1lbnQpID8gc2MgOiBfc2Nyb2xsQ2FjaGVGdW5jKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gZWxlbWVudFtzXSA9IHZhbHVlIDogZWxlbWVudFtzXTtcbiAgfSkpKTtcbiAgZnVuYy50YXJnZXQgPSBlbGVtZW50O1xuICBwcmV2IHx8IChmdW5jLnNtb290aCA9IGdzYXAuZ2V0UHJvcGVydHkoZWxlbWVudCwgXCJzY3JvbGxCZWhhdmlvclwiKSA9PT0gXCJzbW9vdGhcIik7IC8vIG9ubHkgc2V0IGl0IHRoZSBmaXJzdCB0aW1lIChkb24ndCByZXNldCBldmVyeSB0aW1lIGEgc2Nyb2xsRnVuYyBpcyByZXF1ZXN0ZWQgYmVjYXVzZSBwZXJoYXBzIGl0IGhhcHBlbnMgZHVyaW5nIGEgcmVmcmVzaCgpIHdoZW4gaXQncyBkaXNhYmxlZCBpbiBTY3JvbGxUcmlnZ2VyLlxuXG4gIHJldHVybiBmdW5jO1xufSxcbiAgICBfZ2V0VmVsb2NpdHlQcm9wID0gZnVuY3Rpb24gX2dldFZlbG9jaXR5UHJvcCh2YWx1ZSwgbWluVGltZVJlZnJlc2gsIHVzZURlbHRhKSB7XG4gIHZhciB2MSA9IHZhbHVlLFxuICAgICAgdjIgPSB2YWx1ZSxcbiAgICAgIHQxID0gX2dldFRpbWUoKSxcbiAgICAgIHQyID0gdDEsXG4gICAgICBtaW4gPSBtaW5UaW1lUmVmcmVzaCB8fCA1MCxcbiAgICAgIGRyb3BUb1plcm9UaW1lID0gTWF0aC5tYXgoNTAwLCBtaW4gKiAzKSxcbiAgICAgIHVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSh2YWx1ZSwgZm9yY2UpIHtcbiAgICB2YXIgdCA9IF9nZXRUaW1lKCk7XG5cbiAgICBpZiAoZm9yY2UgfHwgdCAtIHQxID4gbWluKSB7XG4gICAgICB2MiA9IHYxO1xuICAgICAgdjEgPSB2YWx1ZTtcbiAgICAgIHQyID0gdDE7XG4gICAgICB0MSA9IHQ7XG4gICAgfSBlbHNlIGlmICh1c2VEZWx0YSkge1xuICAgICAgdjEgKz0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vdCB0b3RhbGx5IG5lY2Vzc2FyeSwgYnV0IG1ha2VzIGl0IGEgYml0IG1vcmUgYWNjdXJhdGUgYnkgYWRqdXN0aW5nIHRoZSB2MSB2YWx1ZSBhY2NvcmRpbmcgdG8gdGhlIG5ldyBzbG9wZS4gVGhpcyB3YXkgd2UncmUgbm90IGp1c3QgaWdub3JpbmcgdGhlIGluY29taW5nIGRhdGEuIFJlbW92aW5nIGZvciBub3cgYmVjYXVzZSBpdCBkb2Vzbid0IHNlZW0gdG8gbWFrZSBtdWNoIHByYWN0aWNhbCBkaWZmZXJlbmNlIGFuZCBpdCdzIHByb2JhYmx5IG5vdCB3b3J0aCB0aGUga2IuXG4gICAgICB2MSA9IHYyICsgKHZhbHVlIC0gdjIpIC8gKHQgLSB0MikgKiAodDEgLSB0Mik7XG4gICAgfVxuICB9LFxuICAgICAgcmVzZXQgPSBmdW5jdGlvbiByZXNldCgpIHtcbiAgICB2MiA9IHYxID0gdXNlRGVsdGEgPyAwIDogdjE7XG4gICAgdDIgPSB0MSA9IDA7XG4gIH0sXG4gICAgICBnZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KGxhdGVzdFZhbHVlKSB7XG4gICAgdmFyIHRPbGQgPSB0MixcbiAgICAgICAgdk9sZCA9IHYyLFxuICAgICAgICB0ID0gX2dldFRpbWUoKTtcblxuICAgIChsYXRlc3RWYWx1ZSB8fCBsYXRlc3RWYWx1ZSA9PT0gMCkgJiYgbGF0ZXN0VmFsdWUgIT09IHYxICYmIHVwZGF0ZShsYXRlc3RWYWx1ZSk7XG4gICAgcmV0dXJuIHQxID09PSB0MiB8fCB0IC0gdDIgPiBkcm9wVG9aZXJvVGltZSA/IDAgOiAodjEgKyAodXNlRGVsdGEgPyB2T2xkIDogLXZPbGQpKSAvICgodXNlRGVsdGEgPyB0IDogdDEpIC0gdE9sZCkgKiAxMDAwO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiB1cGRhdGUsXG4gICAgcmVzZXQ6IHJlc2V0LFxuICAgIGdldFZlbG9jaXR5OiBnZXRWZWxvY2l0eVxuICB9O1xufSxcbiAgICBfZ2V0RXZlbnQgPSBmdW5jdGlvbiBfZ2V0RXZlbnQoZSwgcHJldmVudERlZmF1bHQpIHtcbiAgcHJldmVudERlZmF1bHQgJiYgIWUuX2dzYXBBbGxvdyAmJiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHJldHVybiBlLmNoYW5nZWRUb3VjaGVzID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGU7XG59LFxuICAgIF9nZXRBYnNvbHV0ZU1heCA9IGZ1bmN0aW9uIF9nZXRBYnNvbHV0ZU1heChhKSB7XG4gIHZhciBtYXggPSBNYXRoLm1heC5hcHBseShNYXRoLCBhKSxcbiAgICAgIG1pbiA9IE1hdGgubWluLmFwcGx5KE1hdGgsIGEpO1xuICByZXR1cm4gTWF0aC5hYnMobWF4KSA+PSBNYXRoLmFicyhtaW4pID8gbWF4IDogbWluO1xufSxcbiAgICBfc2V0U2Nyb2xsVHJpZ2dlciA9IGZ1bmN0aW9uIF9zZXRTY3JvbGxUcmlnZ2VyKCkge1xuICBTY3JvbGxUcmlnZ2VyID0gZ3NhcC5jb3JlLmdsb2JhbHMoKS5TY3JvbGxUcmlnZ2VyO1xuICBTY3JvbGxUcmlnZ2VyICYmIFNjcm9sbFRyaWdnZXIuY29yZSAmJiBfaW50ZWdyYXRlKCk7XG59LFxuICAgIF9pbml0Q29yZSA9IGZ1bmN0aW9uIF9pbml0Q29yZShjb3JlKSB7XG4gIGdzYXAgPSBjb3JlIHx8IF9nZXRHU0FQKCk7XG5cbiAgaWYgKGdzYXAgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LmJvZHkpIHtcbiAgICBfd2luID0gd2luZG93O1xuICAgIF9kb2MgPSBkb2N1bWVudDtcbiAgICBfZG9jRWwgPSBfZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICBfYm9keSA9IF9kb2MuYm9keTtcbiAgICBfcm9vdCA9IFtfd2luLCBfZG9jLCBfZG9jRWwsIF9ib2R5XTtcbiAgICBfY2xhbXAgPSBnc2FwLnV0aWxzLmNsYW1wO1xuXG4gICAgX2NvbnRleHQgPSBnc2FwLmNvcmUuY29udGV4dCB8fCBmdW5jdGlvbiAoKSB7fTtcblxuICAgIF9wb2ludGVyVHlwZSA9IFwib25wb2ludGVyZW50ZXJcIiBpbiBfYm9keSA/IFwicG9pbnRlclwiIDogXCJtb3VzZVwiOyAvLyBpc1RvdWNoIGlzIDAgaWYgbm8gdG91Y2gsIDEgaWYgT05MWSB0b3VjaCwgYW5kIDIgaWYgaXQgY2FuIGFjY29tbW9kYXRlIHRvdWNoIGJ1dCBhbHNvIG90aGVyIHR5cGVzIGxpa2UgbW91c2UvcG9pbnRlci5cblxuICAgIF9pc1RvdWNoID0gT2JzZXJ2ZXIuaXNUb3VjaCA9IF93aW4ubWF0Y2hNZWRpYSAmJiBfd2luLm1hdGNoTWVkaWEoXCIoaG92ZXI6IG5vbmUpLCAocG9pbnRlcjogY29hcnNlKVwiKS5tYXRjaGVzID8gMSA6IFwib250b3VjaHN0YXJ0XCIgaW4gX3dpbiB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwIHx8IG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMCA/IDIgOiAwO1xuICAgIF9ldmVudFR5cGVzID0gT2JzZXJ2ZXIuZXZlbnRUeXBlcyA9IChcIm9udG91Y2hzdGFydFwiIGluIF9kb2NFbCA/IFwidG91Y2hzdGFydCx0b3VjaG1vdmUsdG91Y2hjYW5jZWwsdG91Y2hlbmRcIiA6ICEoXCJvbnBvaW50ZXJkb3duXCIgaW4gX2RvY0VsKSA/IFwibW91c2Vkb3duLG1vdXNlbW92ZSxtb3VzZXVwLG1vdXNldXBcIiA6IFwicG9pbnRlcmRvd24scG9pbnRlcm1vdmUscG9pbnRlcmNhbmNlbCxwb2ludGVydXBcIikuc3BsaXQoXCIsXCIpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF9zdGFydHVwID0gMDtcbiAgICB9LCA1MDApO1xuXG4gICAgX3NldFNjcm9sbFRyaWdnZXIoKTtcblxuICAgIF9jb3JlSW5pdHRlZCA9IDE7XG4gIH1cblxuICByZXR1cm4gX2NvcmVJbml0dGVkO1xufTtcblxuX2hvcml6b250YWwub3AgPSBfdmVydGljYWw7XG5fc2Nyb2xsZXJzLmNhY2hlID0gMDtcbmV4cG9ydCB2YXIgT2JzZXJ2ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBPYnNlcnZlcih2YXJzKSB7XG4gICAgdGhpcy5pbml0KHZhcnMpO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IE9ic2VydmVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdCA9IGZ1bmN0aW9uIGluaXQodmFycykge1xuICAgIF9jb3JlSW5pdHRlZCB8fCBfaW5pdENvcmUoZ3NhcCkgfHwgY29uc29sZS53YXJuKFwiUGxlYXNlIGdzYXAucmVnaXN0ZXJQbHVnaW4oT2JzZXJ2ZXIpXCIpO1xuICAgIFNjcm9sbFRyaWdnZXIgfHwgX3NldFNjcm9sbFRyaWdnZXIoKTtcbiAgICB2YXIgdG9sZXJhbmNlID0gdmFycy50b2xlcmFuY2UsXG4gICAgICAgIGRyYWdNaW5pbXVtID0gdmFycy5kcmFnTWluaW11bSxcbiAgICAgICAgdHlwZSA9IHZhcnMudHlwZSxcbiAgICAgICAgdGFyZ2V0ID0gdmFycy50YXJnZXQsXG4gICAgICAgIGxpbmVIZWlnaHQgPSB2YXJzLmxpbmVIZWlnaHQsXG4gICAgICAgIGRlYm91bmNlID0gdmFycy5kZWJvdW5jZSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSB2YXJzLnByZXZlbnREZWZhdWx0LFxuICAgICAgICBvblN0b3AgPSB2YXJzLm9uU3RvcCxcbiAgICAgICAgb25TdG9wRGVsYXkgPSB2YXJzLm9uU3RvcERlbGF5LFxuICAgICAgICBpZ25vcmUgPSB2YXJzLmlnbm9yZSxcbiAgICAgICAgd2hlZWxTcGVlZCA9IHZhcnMud2hlZWxTcGVlZCxcbiAgICAgICAgZXZlbnQgPSB2YXJzLmV2ZW50LFxuICAgICAgICBvbkRyYWdTdGFydCA9IHZhcnMub25EcmFnU3RhcnQsXG4gICAgICAgIG9uRHJhZ0VuZCA9IHZhcnMub25EcmFnRW5kLFxuICAgICAgICBvbkRyYWcgPSB2YXJzLm9uRHJhZyxcbiAgICAgICAgb25QcmVzcyA9IHZhcnMub25QcmVzcyxcbiAgICAgICAgb25SZWxlYXNlID0gdmFycy5vblJlbGVhc2UsXG4gICAgICAgIG9uUmlnaHQgPSB2YXJzLm9uUmlnaHQsXG4gICAgICAgIG9uTGVmdCA9IHZhcnMub25MZWZ0LFxuICAgICAgICBvblVwID0gdmFycy5vblVwLFxuICAgICAgICBvbkRvd24gPSB2YXJzLm9uRG93bixcbiAgICAgICAgb25DaGFuZ2VYID0gdmFycy5vbkNoYW5nZVgsXG4gICAgICAgIG9uQ2hhbmdlWSA9IHZhcnMub25DaGFuZ2VZLFxuICAgICAgICBvbkNoYW5nZSA9IHZhcnMub25DaGFuZ2UsXG4gICAgICAgIG9uVG9nZ2xlWCA9IHZhcnMub25Ub2dnbGVYLFxuICAgICAgICBvblRvZ2dsZVkgPSB2YXJzLm9uVG9nZ2xlWSxcbiAgICAgICAgb25Ib3ZlciA9IHZhcnMub25Ib3ZlcixcbiAgICAgICAgb25Ib3ZlckVuZCA9IHZhcnMub25Ib3ZlckVuZCxcbiAgICAgICAgb25Nb3ZlID0gdmFycy5vbk1vdmUsXG4gICAgICAgIGlnbm9yZUNoZWNrID0gdmFycy5pZ25vcmVDaGVjayxcbiAgICAgICAgaXNOb3JtYWxpemVyID0gdmFycy5pc05vcm1hbGl6ZXIsXG4gICAgICAgIG9uR2VzdHVyZVN0YXJ0ID0gdmFycy5vbkdlc3R1cmVTdGFydCxcbiAgICAgICAgb25HZXN0dXJlRW5kID0gdmFycy5vbkdlc3R1cmVFbmQsXG4gICAgICAgIG9uV2hlZWwgPSB2YXJzLm9uV2hlZWwsXG4gICAgICAgIG9uRW5hYmxlID0gdmFycy5vbkVuYWJsZSxcbiAgICAgICAgb25EaXNhYmxlID0gdmFycy5vbkRpc2FibGUsXG4gICAgICAgIG9uQ2xpY2sgPSB2YXJzLm9uQ2xpY2ssXG4gICAgICAgIHNjcm9sbFNwZWVkID0gdmFycy5zY3JvbGxTcGVlZCxcbiAgICAgICAgY2FwdHVyZSA9IHZhcnMuY2FwdHVyZSxcbiAgICAgICAgYWxsb3dDbGlja3MgPSB2YXJzLmFsbG93Q2xpY2tzLFxuICAgICAgICBsb2NrQXhpcyA9IHZhcnMubG9ja0F4aXMsXG4gICAgICAgIG9uTG9ja0F4aXMgPSB2YXJzLm9uTG9ja0F4aXM7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQgPSBfZ2V0VGFyZ2V0KHRhcmdldCkgfHwgX2RvY0VsO1xuICAgIHRoaXMudmFycyA9IHZhcnM7XG4gICAgaWdub3JlICYmIChpZ25vcmUgPSBnc2FwLnV0aWxzLnRvQXJyYXkoaWdub3JlKSk7XG4gICAgdG9sZXJhbmNlID0gdG9sZXJhbmNlIHx8IDFlLTk7XG4gICAgZHJhZ01pbmltdW0gPSBkcmFnTWluaW11bSB8fCAwO1xuICAgIHdoZWVsU3BlZWQgPSB3aGVlbFNwZWVkIHx8IDE7XG4gICAgc2Nyb2xsU3BlZWQgPSBzY3JvbGxTcGVlZCB8fCAxO1xuICAgIHR5cGUgPSB0eXBlIHx8IFwid2hlZWwsdG91Y2gscG9pbnRlclwiO1xuICAgIGRlYm91bmNlID0gZGVib3VuY2UgIT09IGZhbHNlO1xuICAgIGxpbmVIZWlnaHQgfHwgKGxpbmVIZWlnaHQgPSBwYXJzZUZsb2F0KF93aW4uZ2V0Q29tcHV0ZWRTdHlsZShfYm9keSkubGluZUhlaWdodCkgfHwgMjIpOyAvLyBub3RlOiBicm93c2VyIG1heSByZXBvcnQgXCJub3JtYWxcIiwgc28gZGVmYXVsdCB0byAyMi5cblxuICAgIHZhciBpZCxcbiAgICAgICAgb25TdG9wRGVsYXllZENhbGwsXG4gICAgICAgIGRyYWdnZWQsXG4gICAgICAgIG1vdmVkLFxuICAgICAgICB3aGVlbGVkLFxuICAgICAgICBsb2NrZWQsXG4gICAgICAgIGF4aXMsXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBwcmV2RGVsdGFYID0gMCxcbiAgICAgICAgcHJldkRlbHRhWSA9IDAsXG4gICAgICAgIHNjcm9sbEZ1bmNYID0gX2dldFNjcm9sbEZ1bmModGFyZ2V0LCBfaG9yaXpvbnRhbCksXG4gICAgICAgIHNjcm9sbEZ1bmNZID0gX2dldFNjcm9sbEZ1bmModGFyZ2V0LCBfdmVydGljYWwpLFxuICAgICAgICBzY3JvbGxYID0gc2Nyb2xsRnVuY1goKSxcbiAgICAgICAgc2Nyb2xsWSA9IHNjcm9sbEZ1bmNZKCksXG4gICAgICAgIGxpbWl0VG9Ub3VjaCA9IH50eXBlLmluZGV4T2YoXCJ0b3VjaFwiKSAmJiAhfnR5cGUuaW5kZXhPZihcInBvaW50ZXJcIikgJiYgX2V2ZW50VHlwZXNbMF0gPT09IFwicG9pbnRlcmRvd25cIixcbiAgICAgICAgLy8gZm9yIGRldmljZXMgdGhhdCBhY2NvbW1vZGF0ZSBtb3VzZSBldmVudHMgYW5kIHRvdWNoIGV2ZW50cywgd2UgbmVlZCB0byBkaXN0aW5ndWlzaC5cbiAgICBpc1ZpZXdwb3J0ID0gX2lzVmlld3BvcnQodGFyZ2V0KSxcbiAgICAgICAgb3duZXJEb2MgPSB0YXJnZXQub3duZXJEb2N1bWVudCB8fCBfZG9jLFxuICAgICAgICBkZWx0YVggPSBbMCwgMCwgMF0sXG4gICAgICAgIC8vIHdoZWVsLCBzY3JvbGwsIHBvaW50ZXIvdG91Y2hcbiAgICBkZWx0YVkgPSBbMCwgMCwgMF0sXG4gICAgICAgIG9uQ2xpY2tUaW1lID0gMCxcbiAgICAgICAgY2xpY2tDYXB0dXJlID0gZnVuY3Rpb24gY2xpY2tDYXB0dXJlKCkge1xuICAgICAgcmV0dXJuIG9uQ2xpY2tUaW1lID0gX2dldFRpbWUoKTtcbiAgICB9LFxuICAgICAgICBfaWdub3JlQ2hlY2sgPSBmdW5jdGlvbiBfaWdub3JlQ2hlY2soZSwgaXNQb2ludGVyT3JUb3VjaCkge1xuICAgICAgcmV0dXJuIChzZWxmLmV2ZW50ID0gZSkgJiYgaWdub3JlICYmIH5pZ25vcmUuaW5kZXhPZihlLnRhcmdldCkgfHwgaXNQb2ludGVyT3JUb3VjaCAmJiBsaW1pdFRvVG91Y2ggJiYgZS5wb2ludGVyVHlwZSAhPT0gXCJ0b3VjaFwiIHx8IGlnbm9yZUNoZWNrICYmIGlnbm9yZUNoZWNrKGUsIGlzUG9pbnRlck9yVG91Y2gpO1xuICAgIH0sXG4gICAgICAgIG9uU3RvcEZ1bmMgPSBmdW5jdGlvbiBvblN0b3BGdW5jKCkge1xuICAgICAgc2VsZi5fdngucmVzZXQoKTtcblxuICAgICAgc2VsZi5fdnkucmVzZXQoKTtcblxuICAgICAgb25TdG9wRGVsYXllZENhbGwucGF1c2UoKTtcbiAgICAgIG9uU3RvcCAmJiBvblN0b3Aoc2VsZik7XG4gICAgfSxcbiAgICAgICAgdXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgdmFyIGR4ID0gc2VsZi5kZWx0YVggPSBfZ2V0QWJzb2x1dGVNYXgoZGVsdGFYKSxcbiAgICAgICAgICBkeSA9IHNlbGYuZGVsdGFZID0gX2dldEFic29sdXRlTWF4KGRlbHRhWSksXG4gICAgICAgICAgY2hhbmdlZFggPSBNYXRoLmFicyhkeCkgPj0gdG9sZXJhbmNlLFxuICAgICAgICAgIGNoYW5nZWRZID0gTWF0aC5hYnMoZHkpID49IHRvbGVyYW5jZTtcblxuICAgICAgb25DaGFuZ2UgJiYgKGNoYW5nZWRYIHx8IGNoYW5nZWRZKSAmJiBvbkNoYW5nZShzZWxmLCBkeCwgZHksIGRlbHRhWCwgZGVsdGFZKTsgLy8gaW4gU2Nyb2xsVHJpZ2dlci5ub3JtYWxpemVTY3JvbGwoKSwgd2UgbmVlZCB0byBrbm93IGlmIGl0IHdhcyB0b3VjaC9wb2ludGVyIHNvIHdlIG5lZWQgYWNjZXNzIHRvIHRoZSBkZWx0YVgvZGVsdGFZIEFycmF5cyBiZWZvcmUgd2UgY2xlYXIgdGhlbSBvdXQuXG5cbiAgICAgIGlmIChjaGFuZ2VkWCkge1xuICAgICAgICBvblJpZ2h0ICYmIHNlbGYuZGVsdGFYID4gMCAmJiBvblJpZ2h0KHNlbGYpO1xuICAgICAgICBvbkxlZnQgJiYgc2VsZi5kZWx0YVggPCAwICYmIG9uTGVmdChzZWxmKTtcbiAgICAgICAgb25DaGFuZ2VYICYmIG9uQ2hhbmdlWChzZWxmKTtcbiAgICAgICAgb25Ub2dnbGVYICYmIHNlbGYuZGVsdGFYIDwgMCAhPT0gcHJldkRlbHRhWCA8IDAgJiYgb25Ub2dnbGVYKHNlbGYpO1xuICAgICAgICBwcmV2RGVsdGFYID0gc2VsZi5kZWx0YVg7XG4gICAgICAgIGRlbHRhWFswXSA9IGRlbHRhWFsxXSA9IGRlbHRhWFsyXSA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VkWSkge1xuICAgICAgICBvbkRvd24gJiYgc2VsZi5kZWx0YVkgPiAwICYmIG9uRG93bihzZWxmKTtcbiAgICAgICAgb25VcCAmJiBzZWxmLmRlbHRhWSA8IDAgJiYgb25VcChzZWxmKTtcbiAgICAgICAgb25DaGFuZ2VZICYmIG9uQ2hhbmdlWShzZWxmKTtcbiAgICAgICAgb25Ub2dnbGVZICYmIHNlbGYuZGVsdGFZIDwgMCAhPT0gcHJldkRlbHRhWSA8IDAgJiYgb25Ub2dnbGVZKHNlbGYpO1xuICAgICAgICBwcmV2RGVsdGFZID0gc2VsZi5kZWx0YVk7XG4gICAgICAgIGRlbHRhWVswXSA9IGRlbHRhWVsxXSA9IGRlbHRhWVsyXSA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb3ZlZCB8fCBkcmFnZ2VkKSB7XG4gICAgICAgIG9uTW92ZSAmJiBvbk1vdmUoc2VsZik7XG5cbiAgICAgICAgaWYgKGRyYWdnZWQpIHtcbiAgICAgICAgICBvbkRyYWcoc2VsZik7XG4gICAgICAgICAgZHJhZ2dlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbW92ZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgbG9ja2VkICYmICEobG9ja2VkID0gZmFsc2UpICYmIG9uTG9ja0F4aXMgJiYgb25Mb2NrQXhpcyhzZWxmKTtcblxuICAgICAgaWYgKHdoZWVsZWQpIHtcbiAgICAgICAgb25XaGVlbChzZWxmKTtcbiAgICAgICAgd2hlZWxlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZCA9IDA7XG4gICAgfSxcbiAgICAgICAgb25EZWx0YSA9IGZ1bmN0aW9uIG9uRGVsdGEoeCwgeSwgaW5kZXgpIHtcbiAgICAgIGRlbHRhWFtpbmRleF0gKz0geDtcbiAgICAgIGRlbHRhWVtpbmRleF0gKz0geTtcblxuICAgICAgc2VsZi5fdngudXBkYXRlKHgpO1xuXG4gICAgICBzZWxmLl92eS51cGRhdGUoeSk7XG5cbiAgICAgIGRlYm91bmNlID8gaWQgfHwgKGlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSkpIDogdXBkYXRlKCk7XG4gICAgfSxcbiAgICAgICAgb25Ub3VjaE9yUG9pbnRlckRlbHRhID0gZnVuY3Rpb24gb25Ub3VjaE9yUG9pbnRlckRlbHRhKHgsIHkpIHtcbiAgICAgIGlmIChsb2NrQXhpcyAmJiAhYXhpcykge1xuICAgICAgICBzZWxmLmF4aXMgPSBheGlzID0gTWF0aC5hYnMoeCkgPiBNYXRoLmFicyh5KSA/IFwieFwiIDogXCJ5XCI7XG4gICAgICAgIGxvY2tlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChheGlzICE9PSBcInlcIikge1xuICAgICAgICBkZWx0YVhbMl0gKz0geDtcblxuICAgICAgICBzZWxmLl92eC51cGRhdGUoeCwgdHJ1ZSk7IC8vIHVwZGF0ZSB0aGUgdmVsb2NpdHkgYXMgZnJlcXVlbnRseSBhcyBwb3NzaWJsZSBpbnN0ZWFkIG9mIGluIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gc28gdGhhdCB2ZXJ5IHF1aWNrIHRvdWNoLXNjcm9sbHMgKGZsaWNrcykgZmVlbCBuYXR1cmFsLiBJZiBpdCdzIHRoZSBtb3VzZS90b3VjaC9wb2ludGVyLCBmb3JjZSBpdCBzbyB0aGF0IHdlIGdldCBzbmFwcHkvYWNjdXJhdGUgbW9tZW50dW0gc2Nyb2xsLlxuXG4gICAgICB9XG5cbiAgICAgIGlmIChheGlzICE9PSBcInhcIikge1xuICAgICAgICBkZWx0YVlbMl0gKz0geTtcblxuICAgICAgICBzZWxmLl92eS51cGRhdGUoeSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGRlYm91bmNlID8gaWQgfHwgKGlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSkpIDogdXBkYXRlKCk7XG4gICAgfSxcbiAgICAgICAgX29uRHJhZyA9IGZ1bmN0aW9uIF9vbkRyYWcoZSkge1xuICAgICAgaWYgKF9pZ25vcmVDaGVjayhlLCAxKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGUgPSBfZ2V0RXZlbnQoZSwgcHJldmVudERlZmF1bHQpO1xuICAgICAgdmFyIHggPSBlLmNsaWVudFgsXG4gICAgICAgICAgeSA9IGUuY2xpZW50WSxcbiAgICAgICAgICBkeCA9IHggLSBzZWxmLngsXG4gICAgICAgICAgZHkgPSB5IC0gc2VsZi55LFxuICAgICAgICAgIGlzRHJhZ2dpbmcgPSBzZWxmLmlzRHJhZ2dpbmc7XG4gICAgICBzZWxmLnggPSB4O1xuICAgICAgc2VsZi55ID0geTtcblxuICAgICAgaWYgKGlzRHJhZ2dpbmcgfHwgTWF0aC5hYnMoc2VsZi5zdGFydFggLSB4KSA+PSBkcmFnTWluaW11bSB8fCBNYXRoLmFicyhzZWxmLnN0YXJ0WSAtIHkpID49IGRyYWdNaW5pbXVtKSB7XG4gICAgICAgIG9uRHJhZyAmJiAoZHJhZ2dlZCA9IHRydWUpO1xuICAgICAgICBpc0RyYWdnaW5nIHx8IChzZWxmLmlzRHJhZ2dpbmcgPSB0cnVlKTtcbiAgICAgICAgb25Ub3VjaE9yUG9pbnRlckRlbHRhKGR4LCBkeSk7XG4gICAgICAgIGlzRHJhZ2dpbmcgfHwgb25EcmFnU3RhcnQgJiYgb25EcmFnU3RhcnQoc2VsZik7XG4gICAgICB9XG4gICAgfSxcbiAgICAgICAgX29uUHJlc3MgPSBzZWxmLm9uUHJlc3MgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKF9pZ25vcmVDaGVjayhlLCAxKSB8fCBlICYmIGUuYnV0dG9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2VsZi5heGlzID0gYXhpcyA9IG51bGw7XG4gICAgICBvblN0b3BEZWxheWVkQ2FsbC5wYXVzZSgpO1xuICAgICAgc2VsZi5pc1ByZXNzZWQgPSB0cnVlO1xuICAgICAgZSA9IF9nZXRFdmVudChlKTsgLy8gbm90ZTogbWF5IG5lZWQgdG8gcHJldmVudERlZmF1bHQoPykgV29uJ3Qgc2lkZS1zY3JvbGwgb24gaU9TIFNhZmFyaSBpZiB3ZSBkbywgdGhvdWdoLlxuXG4gICAgICBwcmV2RGVsdGFYID0gcHJldkRlbHRhWSA9IDA7XG4gICAgICBzZWxmLnN0YXJ0WCA9IHNlbGYueCA9IGUuY2xpZW50WDtcbiAgICAgIHNlbGYuc3RhcnRZID0gc2VsZi55ID0gZS5jbGllbnRZO1xuXG4gICAgICBzZWxmLl92eC5yZXNldCgpOyAvLyBvdGhlcndpc2UgdGhlIHQyIG1heSBiZSBzdGFsZSBpZiB0aGUgdXNlciB0b3VjaGVzIGFuZCBmbGlja3Mgc3VwZXIgZmFzdCBhbmQgcmVsZWFzZXMgaW4gbGVzcyB0aGFuIDIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHRpY2tzLCBjYXVzaW5nIHZlbG9jaXR5IHRvIGJlIDAuXG5cblxuICAgICAgc2VsZi5fdnkucmVzZXQoKTtcblxuICAgICAgX2FkZExpc3RlbmVyKGlzTm9ybWFsaXplciA/IHRhcmdldCA6IG93bmVyRG9jLCBfZXZlbnRUeXBlc1sxXSwgX29uRHJhZywgcHJldmVudERlZmF1bHQsIHRydWUpO1xuXG4gICAgICBzZWxmLmRlbHRhWCA9IHNlbGYuZGVsdGFZID0gMDtcbiAgICAgIG9uUHJlc3MgJiYgb25QcmVzcyhzZWxmKTtcbiAgICB9LFxuICAgICAgICBfb25SZWxlYXNlID0gc2VsZi5vblJlbGVhc2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKF9pZ25vcmVDaGVjayhlLCAxKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIF9yZW1vdmVMaXN0ZW5lcihpc05vcm1hbGl6ZXIgPyB0YXJnZXQgOiBvd25lckRvYywgX2V2ZW50VHlwZXNbMV0sIF9vbkRyYWcsIHRydWUpO1xuXG4gICAgICB2YXIgaXNUcmFja2luZ0RyYWcgPSAhaXNOYU4oc2VsZi55IC0gc2VsZi5zdGFydFkpLFxuICAgICAgICAgIHdhc0RyYWdnaW5nID0gc2VsZi5pc0RyYWdnaW5nICYmIChNYXRoLmFicyhzZWxmLnggLSBzZWxmLnN0YXJ0WCkgPiAzIHx8IE1hdGguYWJzKHNlbGYueSAtIHNlbGYuc3RhcnRZKSA+IDMpLFxuICAgICAgICAgIC8vIHNvbWUgdG91Y2ggZGV2aWNlcyBuZWVkIHNvbWUgd2lnZ2xlIHJvb20gaW4gdGVybXMgb2Ygc2Vuc2luZyBjbGlja3MgLSB0aGUgZmluZ2VyIG1heSBtb3ZlIGEgZmV3IHBpeGVscy5cbiAgICAgIGV2ZW50RGF0YSA9IF9nZXRFdmVudChlKTtcblxuICAgICAgaWYgKCF3YXNEcmFnZ2luZyAmJiBpc1RyYWNraW5nRHJhZykge1xuICAgICAgICBzZWxmLl92eC5yZXNldCgpO1xuXG4gICAgICAgIHNlbGYuX3Z5LnJlc2V0KCk7XG5cbiAgICAgICAgaWYgKHByZXZlbnREZWZhdWx0ICYmIGFsbG93Q2xpY2tzKSB7XG4gICAgICAgICAgZ3NhcC5kZWxheWVkQ2FsbCgwLjA4LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBzb21lIGJyb3dzZXJzIChsaWtlIEZpcmVmb3gpIHdvbid0IHRydXN0IHNjcmlwdC1nZW5lcmF0ZWQgY2xpY2tzLCBzbyBpZiB0aGUgdXNlciB0cmllcyB0byBjbGljayBvbiBhIHZpZGVvIHRvIHBsYXkgaXQsIGZvciBleGFtcGxlLCBpdCBzaW1wbHkgd29uJ3Qgd29yay4gU2luY2UgYSByZWd1bGFyIFwiY2xpY2tcIiBldmVudCB3aWxsIG1vc3QgbGlrZWx5IGJlIGdlbmVyYXRlZCBhbnl3YXkgKG9uZSB0aGF0IGhhcyBpdHMgaXNUcnVzdGVkIGZsYWcgc2V0IHRvIHRydWUpLCB3ZSBtdXN0IHNsaWdodGx5IGRlbGF5IG91ciBzY3JpcHQtZ2VuZXJhdGVkIGNsaWNrIHNvIHRoYXQgdGhlIFwicmVhbFwiL3RydXN0ZWQgb25lIGlzIHByaW9yaXRpemVkLiBSZW1lbWJlciwgd2hlbiB0aGVyZSBhcmUgZHVwbGljYXRlIGV2ZW50cyBpbiBxdWljayBzdWNjZXNzaW9uLCB3ZSBzdXBwcmVzcyBhbGwgYnV0IHRoZSBmaXJzdCBvbmUuIFNvbWUgYnJvd3NlcnMgZG9uJ3QgZXZlbiB0cmlnZ2VyIHRoZSBcInJlYWxcIiBvbmUgYXQgYWxsLCBzbyBvdXIgc3ludGhldGljIG9uZSBpcyBhIHNhZmV0eSB2YWx2ZSB0aGF0IGVuc3VyZXMgdGhhdCBubyBtYXR0ZXIgd2hhdCwgYSBjbGljayBldmVudCBkb2VzIGdldCBkaXNwYXRjaGVkLlxuICAgICAgICAgICAgaWYgKF9nZXRUaW1lKCkgLSBvbkNsaWNrVGltZSA+IDMwMCAmJiAhZS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGljaykge1xuICAgICAgICAgICAgICAgIC8vc29tZSBicm93c2VycyAobGlrZSBtb2JpbGUgU2FmYXJpKSBkb24ndCBwcm9wZXJseSB0cmlnZ2VyIHRoZSBjbGljayBldmVudFxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsaWNrKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAob3duZXJEb2MuY3JlYXRlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3ludGhldGljRXZlbnQgPSBvd25lckRvYy5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRzXCIpO1xuICAgICAgICAgICAgICAgIHN5bnRoZXRpY0V2ZW50LmluaXRNb3VzZUV2ZW50KFwiY2xpY2tcIiwgdHJ1ZSwgdHJ1ZSwgX3dpbiwgMSwgZXZlbnREYXRhLnNjcmVlblgsIGV2ZW50RGF0YS5zY3JlZW5ZLCBldmVudERhdGEuY2xpZW50WCwgZXZlbnREYXRhLmNsaWVudFksIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5kaXNwYXRjaEV2ZW50KHN5bnRoZXRpY0V2ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNlbGYuaXNEcmFnZ2luZyA9IHNlbGYuaXNHZXN0dXJpbmcgPSBzZWxmLmlzUHJlc3NlZCA9IGZhbHNlO1xuICAgICAgb25TdG9wICYmICFpc05vcm1hbGl6ZXIgJiYgb25TdG9wRGVsYXllZENhbGwucmVzdGFydCh0cnVlKTtcbiAgICAgIG9uRHJhZ0VuZCAmJiB3YXNEcmFnZ2luZyAmJiBvbkRyYWdFbmQoc2VsZik7XG4gICAgICBvblJlbGVhc2UgJiYgb25SZWxlYXNlKHNlbGYsIHdhc0RyYWdnaW5nKTtcbiAgICB9LFxuICAgICAgICBfb25HZXN0dXJlU3RhcnQgPSBmdW5jdGlvbiBfb25HZXN0dXJlU3RhcnQoZSkge1xuICAgICAgcmV0dXJuIGUudG91Y2hlcyAmJiBlLnRvdWNoZXMubGVuZ3RoID4gMSAmJiAoc2VsZi5pc0dlc3R1cmluZyA9IHRydWUpICYmIG9uR2VzdHVyZVN0YXJ0KGUsIHNlbGYuaXNEcmFnZ2luZyk7XG4gICAgfSxcbiAgICAgICAgX29uR2VzdHVyZUVuZCA9IGZ1bmN0aW9uIF9vbkdlc3R1cmVFbmQoKSB7XG4gICAgICByZXR1cm4gKHNlbGYuaXNHZXN0dXJpbmcgPSBmYWxzZSkgfHwgb25HZXN0dXJlRW5kKHNlbGYpO1xuICAgIH0sXG4gICAgICAgIG9uU2Nyb2xsID0gZnVuY3Rpb24gb25TY3JvbGwoZSkge1xuICAgICAgaWYgKF9pZ25vcmVDaGVjayhlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB4ID0gc2Nyb2xsRnVuY1goKSxcbiAgICAgICAgICB5ID0gc2Nyb2xsRnVuY1koKTtcbiAgICAgIG9uRGVsdGEoKHggLSBzY3JvbGxYKSAqIHNjcm9sbFNwZWVkLCAoeSAtIHNjcm9sbFkpICogc2Nyb2xsU3BlZWQsIDEpO1xuICAgICAgc2Nyb2xsWCA9IHg7XG4gICAgICBzY3JvbGxZID0geTtcbiAgICAgIG9uU3RvcCAmJiBvblN0b3BEZWxheWVkQ2FsbC5yZXN0YXJ0KHRydWUpO1xuICAgIH0sXG4gICAgICAgIF9vbldoZWVsID0gZnVuY3Rpb24gX29uV2hlZWwoZSkge1xuICAgICAgaWYgKF9pZ25vcmVDaGVjayhlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGUgPSBfZ2V0RXZlbnQoZSwgcHJldmVudERlZmF1bHQpO1xuICAgICAgb25XaGVlbCAmJiAod2hlZWxlZCA9IHRydWUpO1xuICAgICAgdmFyIG11bHRpcGxpZXIgPSAoZS5kZWx0YU1vZGUgPT09IDEgPyBsaW5lSGVpZ2h0IDogZS5kZWx0YU1vZGUgPT09IDIgPyBfd2luLmlubmVySGVpZ2h0IDogMSkgKiB3aGVlbFNwZWVkO1xuICAgICAgb25EZWx0YShlLmRlbHRhWCAqIG11bHRpcGxpZXIsIGUuZGVsdGFZICogbXVsdGlwbGllciwgMCk7XG4gICAgICBvblN0b3AgJiYgIWlzTm9ybWFsaXplciAmJiBvblN0b3BEZWxheWVkQ2FsbC5yZXN0YXJ0KHRydWUpO1xuICAgIH0sXG4gICAgICAgIF9vbk1vdmUgPSBmdW5jdGlvbiBfb25Nb3ZlKGUpIHtcbiAgICAgIGlmIChfaWdub3JlQ2hlY2soZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgeCA9IGUuY2xpZW50WCxcbiAgICAgICAgICB5ID0gZS5jbGllbnRZLFxuICAgICAgICAgIGR4ID0geCAtIHNlbGYueCxcbiAgICAgICAgICBkeSA9IHkgLSBzZWxmLnk7XG4gICAgICBzZWxmLnggPSB4O1xuICAgICAgc2VsZi55ID0geTtcbiAgICAgIG1vdmVkID0gdHJ1ZTtcbiAgICAgIChkeCB8fCBkeSkgJiYgb25Ub3VjaE9yUG9pbnRlckRlbHRhKGR4LCBkeSk7XG4gICAgfSxcbiAgICAgICAgX29uSG92ZXIgPSBmdW5jdGlvbiBfb25Ib3ZlcihlKSB7XG4gICAgICBzZWxmLmV2ZW50ID0gZTtcbiAgICAgIG9uSG92ZXIoc2VsZik7XG4gICAgfSxcbiAgICAgICAgX29uSG92ZXJFbmQgPSBmdW5jdGlvbiBfb25Ib3ZlckVuZChlKSB7XG4gICAgICBzZWxmLmV2ZW50ID0gZTtcbiAgICAgIG9uSG92ZXJFbmQoc2VsZik7XG4gICAgfSxcbiAgICAgICAgX29uQ2xpY2sgPSBmdW5jdGlvbiBfb25DbGljayhlKSB7XG4gICAgICByZXR1cm4gX2lnbm9yZUNoZWNrKGUpIHx8IF9nZXRFdmVudChlLCBwcmV2ZW50RGVmYXVsdCkgJiYgb25DbGljayhzZWxmKTtcbiAgICB9O1xuXG4gICAgb25TdG9wRGVsYXllZENhbGwgPSBzZWxmLl9kYyA9IGdzYXAuZGVsYXllZENhbGwob25TdG9wRGVsYXkgfHwgMC4yNSwgb25TdG9wRnVuYykucGF1c2UoKTtcbiAgICBzZWxmLmRlbHRhWCA9IHNlbGYuZGVsdGFZID0gMDtcbiAgICBzZWxmLl92eCA9IF9nZXRWZWxvY2l0eVByb3AoMCwgNTAsIHRydWUpO1xuICAgIHNlbGYuX3Z5ID0gX2dldFZlbG9jaXR5UHJvcCgwLCA1MCwgdHJ1ZSk7XG4gICAgc2VsZi5zY3JvbGxYID0gc2Nyb2xsRnVuY1g7XG4gICAgc2VsZi5zY3JvbGxZID0gc2Nyb2xsRnVuY1k7XG4gICAgc2VsZi5pc0RyYWdnaW5nID0gc2VsZi5pc0dlc3R1cmluZyA9IHNlbGYuaXNQcmVzc2VkID0gZmFsc2U7XG5cbiAgICBfY29udGV4dCh0aGlzKTtcblxuICAgIHNlbGYuZW5hYmxlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICghc2VsZi5pc0VuYWJsZWQpIHtcbiAgICAgICAgX2FkZExpc3RlbmVyKGlzVmlld3BvcnQgPyBvd25lckRvYyA6IHRhcmdldCwgXCJzY3JvbGxcIiwgX29uU2Nyb2xsKTtcblxuICAgICAgICB0eXBlLmluZGV4T2YoXCJzY3JvbGxcIikgPj0gMCAmJiBfYWRkTGlzdGVuZXIoaXNWaWV3cG9ydCA/IG93bmVyRG9jIDogdGFyZ2V0LCBcInNjcm9sbFwiLCBvblNjcm9sbCwgcHJldmVudERlZmF1bHQsIGNhcHR1cmUpO1xuICAgICAgICB0eXBlLmluZGV4T2YoXCJ3aGVlbFwiKSA+PSAwICYmIF9hZGRMaXN0ZW5lcih0YXJnZXQsIFwid2hlZWxcIiwgX29uV2hlZWwsIHByZXZlbnREZWZhdWx0LCBjYXB0dXJlKTtcblxuICAgICAgICBpZiAodHlwZS5pbmRleE9mKFwidG91Y2hcIikgPj0gMCAmJiBfaXNUb3VjaCB8fCB0eXBlLmluZGV4T2YoXCJwb2ludGVyXCIpID49IDApIHtcbiAgICAgICAgICBfYWRkTGlzdGVuZXIodGFyZ2V0LCBfZXZlbnRUeXBlc1swXSwgX29uUHJlc3MsIHByZXZlbnREZWZhdWx0LCBjYXB0dXJlKTtcblxuICAgICAgICAgIF9hZGRMaXN0ZW5lcihvd25lckRvYywgX2V2ZW50VHlwZXNbMl0sIF9vblJlbGVhc2UpO1xuXG4gICAgICAgICAgX2FkZExpc3RlbmVyKG93bmVyRG9jLCBfZXZlbnRUeXBlc1szXSwgX29uUmVsZWFzZSk7XG5cbiAgICAgICAgICBhbGxvd0NsaWNrcyAmJiBfYWRkTGlzdGVuZXIodGFyZ2V0LCBcImNsaWNrXCIsIGNsaWNrQ2FwdHVyZSwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgIG9uQ2xpY2sgJiYgX2FkZExpc3RlbmVyKHRhcmdldCwgXCJjbGlja1wiLCBfb25DbGljayk7XG4gICAgICAgICAgb25HZXN0dXJlU3RhcnQgJiYgX2FkZExpc3RlbmVyKG93bmVyRG9jLCBcImdlc3R1cmVzdGFydFwiLCBfb25HZXN0dXJlU3RhcnQpO1xuICAgICAgICAgIG9uR2VzdHVyZUVuZCAmJiBfYWRkTGlzdGVuZXIob3duZXJEb2MsIFwiZ2VzdHVyZWVuZFwiLCBfb25HZXN0dXJlRW5kKTtcbiAgICAgICAgICBvbkhvdmVyICYmIF9hZGRMaXN0ZW5lcih0YXJnZXQsIF9wb2ludGVyVHlwZSArIFwiZW50ZXJcIiwgX29uSG92ZXIpO1xuICAgICAgICAgIG9uSG92ZXJFbmQgJiYgX2FkZExpc3RlbmVyKHRhcmdldCwgX3BvaW50ZXJUeXBlICsgXCJsZWF2ZVwiLCBfb25Ib3ZlckVuZCk7XG4gICAgICAgICAgb25Nb3ZlICYmIF9hZGRMaXN0ZW5lcih0YXJnZXQsIF9wb2ludGVyVHlwZSArIFwibW92ZVwiLCBfb25Nb3ZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuaXNFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgZSAmJiBlLnR5cGUgJiYgX29uUHJlc3MoZSk7XG4gICAgICAgIG9uRW5hYmxlICYmIG9uRW5hYmxlKHNlbGYpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuaXNFbmFibGVkKSB7XG4gICAgICAgIC8vIG9ubHkgcmVtb3ZlIHRoZSBfb25TY3JvbGwgbGlzdGVuZXIgaWYgdGhlcmUgYXJlbid0IGFueSBvdGhlcnMgdGhhdCByZWx5IG9uIHRoZSBmdW5jdGlvbmFsaXR5LlxuICAgICAgICBfb2JzZXJ2ZXJzLmZpbHRlcihmdW5jdGlvbiAobykge1xuICAgICAgICAgIHJldHVybiBvICE9PSBzZWxmICYmIF9pc1ZpZXdwb3J0KG8udGFyZ2V0KTtcbiAgICAgICAgfSkubGVuZ3RoIHx8IF9yZW1vdmVMaXN0ZW5lcihpc1ZpZXdwb3J0ID8gb3duZXJEb2MgOiB0YXJnZXQsIFwic2Nyb2xsXCIsIF9vblNjcm9sbCk7XG5cbiAgICAgICAgaWYgKHNlbGYuaXNQcmVzc2VkKSB7XG4gICAgICAgICAgc2VsZi5fdngucmVzZXQoKTtcblxuICAgICAgICAgIHNlbGYuX3Z5LnJlc2V0KCk7XG5cbiAgICAgICAgICBfcmVtb3ZlTGlzdGVuZXIoaXNOb3JtYWxpemVyID8gdGFyZ2V0IDogb3duZXJEb2MsIF9ldmVudFR5cGVzWzFdLCBfb25EcmFnLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9yZW1vdmVMaXN0ZW5lcihpc1ZpZXdwb3J0ID8gb3duZXJEb2MgOiB0YXJnZXQsIFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCBjYXB0dXJlKTtcblxuICAgICAgICBfcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBcIndoZWVsXCIsIF9vbldoZWVsLCBjYXB0dXJlKTtcblxuICAgICAgICBfcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBfZXZlbnRUeXBlc1swXSwgX29uUHJlc3MsIGNhcHR1cmUpO1xuXG4gICAgICAgIF9yZW1vdmVMaXN0ZW5lcihvd25lckRvYywgX2V2ZW50VHlwZXNbMl0sIF9vblJlbGVhc2UpO1xuXG4gICAgICAgIF9yZW1vdmVMaXN0ZW5lcihvd25lckRvYywgX2V2ZW50VHlwZXNbM10sIF9vblJlbGVhc2UpO1xuXG4gICAgICAgIF9yZW1vdmVMaXN0ZW5lcih0YXJnZXQsIFwiY2xpY2tcIiwgY2xpY2tDYXB0dXJlLCB0cnVlKTtcblxuICAgICAgICBfcmVtb3ZlTGlzdGVuZXIodGFyZ2V0LCBcImNsaWNrXCIsIF9vbkNsaWNrKTtcblxuICAgICAgICBfcmVtb3ZlTGlzdGVuZXIob3duZXJEb2MsIFwiZ2VzdHVyZXN0YXJ0XCIsIF9vbkdlc3R1cmVTdGFydCk7XG5cbiAgICAgICAgX3JlbW92ZUxpc3RlbmVyKG93bmVyRG9jLCBcImdlc3R1cmVlbmRcIiwgX29uR2VzdHVyZUVuZCk7XG5cbiAgICAgICAgX3JlbW92ZUxpc3RlbmVyKHRhcmdldCwgX3BvaW50ZXJUeXBlICsgXCJlbnRlclwiLCBfb25Ib3Zlcik7XG5cbiAgICAgICAgX3JlbW92ZUxpc3RlbmVyKHRhcmdldCwgX3BvaW50ZXJUeXBlICsgXCJsZWF2ZVwiLCBfb25Ib3ZlckVuZCk7XG5cbiAgICAgICAgX3JlbW92ZUxpc3RlbmVyKHRhcmdldCwgX3BvaW50ZXJUeXBlICsgXCJtb3ZlXCIsIF9vbk1vdmUpO1xuXG4gICAgICAgIHNlbGYuaXNFbmFibGVkID0gc2VsZi5pc1ByZXNzZWQgPSBzZWxmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgb25EaXNhYmxlICYmIG9uRGlzYWJsZShzZWxmKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi5raWxsID0gc2VsZi5yZXZlcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLmRpc2FibGUoKTtcblxuICAgICAgdmFyIGkgPSBfb2JzZXJ2ZXJzLmluZGV4T2Yoc2VsZik7XG5cbiAgICAgIGkgPj0gMCAmJiBfb2JzZXJ2ZXJzLnNwbGljZShpLCAxKTtcbiAgICAgIF9ub3JtYWxpemVyID09PSBzZWxmICYmIChfbm9ybWFsaXplciA9IDApO1xuICAgIH07XG5cbiAgICBfb2JzZXJ2ZXJzLnB1c2goc2VsZik7XG5cbiAgICBpc05vcm1hbGl6ZXIgJiYgX2lzVmlld3BvcnQodGFyZ2V0KSAmJiAoX25vcm1hbGl6ZXIgPSBzZWxmKTtcbiAgICBzZWxmLmVuYWJsZShldmVudCk7XG4gIH07XG5cbiAgX2NyZWF0ZUNsYXNzKE9ic2VydmVyLCBbe1xuICAgIGtleTogXCJ2ZWxvY2l0eVhcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl92eC5nZXRWZWxvY2l0eSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ2ZWxvY2l0eVlcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl92eS5nZXRWZWxvY2l0eSgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBPYnNlcnZlcjtcbn0oKTtcbk9ic2VydmVyLnZlcnNpb24gPSBcIjMuMTEuNVwiO1xuXG5PYnNlcnZlci5jcmVhdGUgPSBmdW5jdGlvbiAodmFycykge1xuICByZXR1cm4gbmV3IE9ic2VydmVyKHZhcnMpO1xufTtcblxuT2JzZXJ2ZXIucmVnaXN0ZXIgPSBfaW5pdENvcmU7XG5cbk9ic2VydmVyLmdldEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF9vYnNlcnZlcnMuc2xpY2UoKTtcbn07XG5cbk9ic2VydmVyLmdldEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgcmV0dXJuIF9vYnNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIG8udmFycy5pZCA9PT0gaWQ7XG4gIH0pWzBdO1xufTtcblxuX2dldEdTQVAoKSAmJiBnc2FwLnJlZ2lzdGVyUGx1Z2luKE9ic2VydmVyKTtcbmV4cG9ydCB7IE9ic2VydmVyIGFzIGRlZmF1bHQsIF9pc1ZpZXdwb3J0LCBfc2Nyb2xsZXJzLCBfZ2V0U2Nyb2xsRnVuYywgX2dldFByb3h5UHJvcCwgX3Byb3hpZXMsIF9nZXRWZWxvY2l0eVByb3AsIF92ZXJ0aWNhbCwgX2hvcml6b250YWwsIF9nZXRUYXJnZXQgfTsiLCIvKiFcbiAqIFNjcm9sbFRyaWdnZXIgMy4xMS41XG4gKiBodHRwczovL2dyZWVuc29jay5jb21cbiAqXG4gKiBAbGljZW5zZSBDb3B5cmlnaHQgMjAwOC0yMDIzLCBHcmVlblNvY2suIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBTdWJqZWN0IHRvIHRoZSB0ZXJtcyBhdCBodHRwczovL2dyZWVuc29jay5jb20vc3RhbmRhcmQtbGljZW5zZSBvciBmb3JcbiAqIENsdWIgR3JlZW5Tb2NrIG1lbWJlcnMsIHRoZSBhZ3JlZW1lbnQgaXNzdWVkIHdpdGggdGhhdCBtZW1iZXJzaGlwLlxuICogQGF1dGhvcjogSmFjayBEb3lsZSwgamFja0BncmVlbnNvY2suY29tXG4qL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHsgT2JzZXJ2ZXIsIF9nZXRUYXJnZXQsIF92ZXJ0aWNhbCwgX2hvcml6b250YWwsIF9zY3JvbGxlcnMsIF9wcm94aWVzLCBfZ2V0U2Nyb2xsRnVuYywgX2dldFByb3h5UHJvcCwgX2dldFZlbG9jaXR5UHJvcCB9IGZyb20gXCIuL09ic2VydmVyLmpzXCI7XG5cbnZhciBnc2FwLFxuICAgIF9jb3JlSW5pdHRlZCxcbiAgICBfd2luLFxuICAgIF9kb2MsXG4gICAgX2RvY0VsLFxuICAgIF9ib2R5LFxuICAgIF9yb290LFxuICAgIF9yZXNpemVEZWxheSxcbiAgICBfdG9BcnJheSxcbiAgICBfY2xhbXAsXG4gICAgX3RpbWUyLFxuICAgIF9zeW5jSW50ZXJ2YWwsXG4gICAgX3JlZnJlc2hpbmcsXG4gICAgX3BvaW50ZXJJc0Rvd24sXG4gICAgX3RyYW5zZm9ybVByb3AsXG4gICAgX2ksXG4gICAgX3ByZXZXaWR0aCxcbiAgICBfcHJldkhlaWdodCxcbiAgICBfYXV0b1JlZnJlc2gsXG4gICAgX3NvcnQsXG4gICAgX3N1cHByZXNzT3ZlcndyaXRlcyxcbiAgICBfaWdub3JlUmVzaXplLFxuICAgIF9ub3JtYWxpemVyLFxuICAgIF9pZ25vcmVNb2JpbGVSZXNpemUsXG4gICAgX2Jhc2VTY3JlZW5IZWlnaHQsXG4gICAgX2Jhc2VTY3JlZW5XaWR0aCxcbiAgICBfZml4SU9TQnVnLFxuICAgIF9jb250ZXh0LFxuICAgIF9zY3JvbGxSZXN0b3JhdGlvbixcbiAgICBfbGltaXRDYWxsYmFja3MsXG4gICAgLy8gaWYgdHJ1ZSwgd2UnbGwgb25seSB0cmlnZ2VyIGNhbGxiYWNrcyBpZiB0aGUgYWN0aXZlIHN0YXRlIHRvZ2dsZXMsIHNvIGlmIHlvdSBzY3JvbGwgaW1tZWRpYXRlbHkgcGFzdCBib3RoIHRoZSBzdGFydCBhbmQgZW5kIHBvc2l0aW9ucyBvZiBhIFNjcm9sbFRyaWdnZXIgKHRodXMgaW5hY3RpdmUgdG8gaW5hY3RpdmUpLCBuZWl0aGVyIGl0cyBvbkVudGVyIG5vciBvbkxlYXZlIHdpbGwgYmUgY2FsbGVkLiBUaGlzIGlzIHVzZWZ1bCBkdXJpbmcgc3RhcnR1cC5cbl9zdGFydHVwID0gMSxcbiAgICBfZ2V0VGltZSA9IERhdGUubm93LFxuICAgIF90aW1lMSA9IF9nZXRUaW1lKCksXG4gICAgX2xhc3RTY3JvbGxUaW1lID0gMCxcbiAgICBfZW5hYmxlZCA9IDAsXG4gICAgX3JhZkJ1Z0ZpeCA9IGZ1bmN0aW9uIF9yYWZCdWdGaXgoKSB7XG4gIHJldHVybiBfZW5hYmxlZCAmJiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3JhZkJ1Z0ZpeCk7XG59LFxuICAgIC8vIGluIHNvbWUgYnJvd3NlcnMgKGxpa2UgRmlyZWZveCksIHNjcmVlbiByZXBhaW50cyB3ZXJlbid0IGNvbnNpc3RlbnQgdW5sZXNzIHdlIGhhZCBTT01FVEhJTkcgcXVldWVkIHVwIGluIHJlcXVlc3RBbmltYXRpb25GcmFtZSgpISBTbyB0aGlzIGp1c3QgY3JlYXRlcyBhIHN1cGVyIHNpbXBsZSBsb29wIHRvIGtlZXAgaXQgYWxpdmUgYW5kIHNtb290aCBvdXQgcmVwYWludHMuXG5fcG9pbnRlckRvd25IYW5kbGVyID0gZnVuY3Rpb24gX3BvaW50ZXJEb3duSGFuZGxlcigpIHtcbiAgcmV0dXJuIF9wb2ludGVySXNEb3duID0gMTtcbn0sXG4gICAgX3BvaW50ZXJVcEhhbmRsZXIgPSBmdW5jdGlvbiBfcG9pbnRlclVwSGFuZGxlcigpIHtcbiAgcmV0dXJuIF9wb2ludGVySXNEb3duID0gMDtcbn0sXG4gICAgX3Bhc3NUaHJvdWdoID0gZnVuY3Rpb24gX3Bhc3NUaHJvdWdoKHYpIHtcbiAgcmV0dXJuIHY7XG59LFxuICAgIF9yb3VuZCA9IGZ1bmN0aW9uIF9yb3VuZCh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIDEwMDAwMCkgLyAxMDAwMDAgfHwgMDtcbn0sXG4gICAgX3dpbmRvd0V4aXN0cyA9IGZ1bmN0aW9uIF93aW5kb3dFeGlzdHMoKSB7XG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xufSxcbiAgICBfZ2V0R1NBUCA9IGZ1bmN0aW9uIF9nZXRHU0FQKCkge1xuICByZXR1cm4gZ3NhcCB8fCBfd2luZG93RXhpc3RzKCkgJiYgKGdzYXAgPSB3aW5kb3cuZ3NhcCkgJiYgZ3NhcC5yZWdpc3RlclBsdWdpbiAmJiBnc2FwO1xufSxcbiAgICBfaXNWaWV3cG9ydCA9IGZ1bmN0aW9uIF9pc1ZpZXdwb3J0KGUpIHtcbiAgcmV0dXJuICEhfl9yb290LmluZGV4T2YoZSk7XG59LFxuICAgIF9nZXRCb3VuZHNGdW5jID0gZnVuY3Rpb24gX2dldEJvdW5kc0Z1bmMoZWxlbWVudCkge1xuICByZXR1cm4gX2dldFByb3h5UHJvcChlbGVtZW50LCBcImdldEJvdW5kaW5nQ2xpZW50UmVjdFwiKSB8fCAoX2lzVmlld3BvcnQoZWxlbWVudCkgPyBmdW5jdGlvbiAoKSB7XG4gICAgX3dpbk9mZnNldHMud2lkdGggPSBfd2luLmlubmVyV2lkdGg7XG4gICAgX3dpbk9mZnNldHMuaGVpZ2h0ID0gX3dpbi5pbm5lckhlaWdodDtcbiAgICByZXR1cm4gX3dpbk9mZnNldHM7XG4gIH0gOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9nZXRCb3VuZHMoZWxlbWVudCk7XG4gIH0pO1xufSxcbiAgICBfZ2V0U2l6ZUZ1bmMgPSBmdW5jdGlvbiBfZ2V0U2l6ZUZ1bmMoc2Nyb2xsZXIsIGlzVmlld3BvcnQsIF9yZWYpIHtcbiAgdmFyIGQgPSBfcmVmLmQsXG4gICAgICBkMiA9IF9yZWYuZDIsXG4gICAgICBhID0gX3JlZi5hO1xuICByZXR1cm4gKGEgPSBfZ2V0UHJveHlQcm9wKHNjcm9sbGVyLCBcImdldEJvdW5kaW5nQ2xpZW50UmVjdFwiKSkgPyBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGEoKVtkXTtcbiAgfSA6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKGlzVmlld3BvcnQgPyBfd2luW1wiaW5uZXJcIiArIGQyXSA6IHNjcm9sbGVyW1wiY2xpZW50XCIgKyBkMl0pIHx8IDA7XG4gIH07XG59LFxuICAgIF9nZXRPZmZzZXRzRnVuYyA9IGZ1bmN0aW9uIF9nZXRPZmZzZXRzRnVuYyhlbGVtZW50LCBpc1ZpZXdwb3J0KSB7XG4gIHJldHVybiAhaXNWaWV3cG9ydCB8fCB+X3Byb3hpZXMuaW5kZXhPZihlbGVtZW50KSA/IF9nZXRCb3VuZHNGdW5jKGVsZW1lbnQpIDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfd2luT2Zmc2V0cztcbiAgfTtcbn0sXG4gICAgX21heFNjcm9sbCA9IGZ1bmN0aW9uIF9tYXhTY3JvbGwoZWxlbWVudCwgX3JlZjIpIHtcbiAgdmFyIHMgPSBfcmVmMi5zLFxuICAgICAgZDIgPSBfcmVmMi5kMixcbiAgICAgIGQgPSBfcmVmMi5kLFxuICAgICAgYSA9IF9yZWYyLmE7XG4gIHJldHVybiBNYXRoLm1heCgwLCAocyA9IFwic2Nyb2xsXCIgKyBkMikgJiYgKGEgPSBfZ2V0UHJveHlQcm9wKGVsZW1lbnQsIHMpKSA/IGEoKSAtIF9nZXRCb3VuZHNGdW5jKGVsZW1lbnQpKClbZF0gOiBfaXNWaWV3cG9ydChlbGVtZW50KSA/IChfZG9jRWxbc10gfHwgX2JvZHlbc10pIC0gKF93aW5bXCJpbm5lclwiICsgZDJdIHx8IF9kb2NFbFtcImNsaWVudFwiICsgZDJdIHx8IF9ib2R5W1wiY2xpZW50XCIgKyBkMl0pIDogZWxlbWVudFtzXSAtIGVsZW1lbnRbXCJvZmZzZXRcIiArIGQyXSk7XG59LFxuICAgIF9pdGVyYXRlQXV0b1JlZnJlc2ggPSBmdW5jdGlvbiBfaXRlcmF0ZUF1dG9SZWZyZXNoKGZ1bmMsIGV2ZW50cykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IF9hdXRvUmVmcmVzaC5sZW5ndGg7IGkgKz0gMykge1xuICAgICghZXZlbnRzIHx8IH5ldmVudHMuaW5kZXhPZihfYXV0b1JlZnJlc2hbaSArIDFdKSkgJiYgZnVuYyhfYXV0b1JlZnJlc2hbaV0sIF9hdXRvUmVmcmVzaFtpICsgMV0sIF9hdXRvUmVmcmVzaFtpICsgMl0pO1xuICB9XG59LFxuICAgIF9pc1N0cmluZyA9IGZ1bmN0aW9uIF9pc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiO1xufSxcbiAgICBfaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIF9pc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIjtcbn0sXG4gICAgX2lzTnVtYmVyID0gZnVuY3Rpb24gX2lzTnVtYmVyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCI7XG59LFxuICAgIF9pc09iamVjdCA9IGZ1bmN0aW9uIF9pc09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufSxcbiAgICBfY2FsbElmRnVuYyA9IGZ1bmN0aW9uIF9jYWxsSWZGdW5jKHZhbHVlKSB7XG4gIHJldHVybiBfaXNGdW5jdGlvbih2YWx1ZSkgJiYgdmFsdWUoKTtcbn0sXG4gICAgX2NvbWJpbmVGdW5jID0gZnVuY3Rpb24gX2NvbWJpbmVGdW5jKGYxLCBmMikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQxID0gX2NhbGxJZkZ1bmMoZjEpLFxuICAgICAgICByZXN1bHQyID0gX2NhbGxJZkZ1bmMoZjIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIF9jYWxsSWZGdW5jKHJlc3VsdDEpO1xuXG4gICAgICBfY2FsbElmRnVuYyhyZXN1bHQyKTtcbiAgICB9O1xuICB9O1xufSxcbiAgICBfZW5kQW5pbWF0aW9uID0gZnVuY3Rpb24gX2VuZEFuaW1hdGlvbihhbmltYXRpb24sIHJldmVyc2VkLCBwYXVzZSkge1xuICByZXR1cm4gYW5pbWF0aW9uICYmIGFuaW1hdGlvbi5wcm9ncmVzcyhyZXZlcnNlZCA/IDAgOiAxKSAmJiBwYXVzZSAmJiBhbmltYXRpb24ucGF1c2UoKTtcbn0sXG4gICAgX2NhbGxiYWNrID0gZnVuY3Rpb24gX2NhbGxiYWNrKHNlbGYsIGZ1bmMpIHtcbiAgaWYgKHNlbGYuZW5hYmxlZCkge1xuICAgIHZhciByZXN1bHQgPSBmdW5jKHNlbGYpO1xuICAgIHJlc3VsdCAmJiByZXN1bHQudG90YWxUaW1lICYmIChzZWxmLmNhbGxiYWNrQW5pbWF0aW9uID0gcmVzdWx0KTtcbiAgfVxufSxcbiAgICBfYWJzID0gTWF0aC5hYnMsXG4gICAgX3Njcm9sbExlZnQgPSBcInNjcm9sbExlZnRcIixcbiAgICBfc2Nyb2xsVG9wID0gXCJzY3JvbGxUb3BcIixcbiAgICBfbGVmdCA9IFwibGVmdFwiLFxuICAgIF90b3AgPSBcInRvcFwiLFxuICAgIF9yaWdodCA9IFwicmlnaHRcIixcbiAgICBfYm90dG9tID0gXCJib3R0b21cIixcbiAgICBfd2lkdGggPSBcIndpZHRoXCIsXG4gICAgX2hlaWdodCA9IFwiaGVpZ2h0XCIsXG4gICAgX1JpZ2h0ID0gXCJSaWdodFwiLFxuICAgIF9MZWZ0ID0gXCJMZWZ0XCIsXG4gICAgX1RvcCA9IFwiVG9wXCIsXG4gICAgX0JvdHRvbSA9IFwiQm90dG9tXCIsXG4gICAgX3BhZGRpbmcgPSBcInBhZGRpbmdcIixcbiAgICBfbWFyZ2luID0gXCJtYXJnaW5cIixcbiAgICBfV2lkdGggPSBcIldpZHRoXCIsXG4gICAgX0hlaWdodCA9IFwiSGVpZ2h0XCIsXG4gICAgX3B4ID0gXCJweFwiLFxuICAgIF9nZXRDb21wdXRlZFN0eWxlID0gZnVuY3Rpb24gX2dldENvbXB1dGVkU3R5bGUoZWxlbWVudCkge1xuICByZXR1cm4gX3dpbi5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufSxcbiAgICBfbWFrZVBvc2l0aW9uYWJsZSA9IGZ1bmN0aW9uIF9tYWtlUG9zaXRpb25hYmxlKGVsZW1lbnQpIHtcbiAgLy8gaWYgdGhlIGVsZW1lbnQgYWxyZWFkeSBoYXMgcG9zaXRpb246IGFic29sdXRlIG9yIGZpeGVkLCBsZWF2ZSB0aGF0LCBvdGhlcndpc2UgbWFrZSBpdCBwb3NpdGlvbjogcmVsYXRpdmVcbiAgdmFyIHBvc2l0aW9uID0gX2dldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb247XG5cbiAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uID09PSBcImFic29sdXRlXCIgfHwgcG9zaXRpb24gPT09IFwiZml4ZWRcIiA/IHBvc2l0aW9uIDogXCJyZWxhdGl2ZVwiO1xufSxcbiAgICBfc2V0RGVmYXVsdHMgPSBmdW5jdGlvbiBfc2V0RGVmYXVsdHMob2JqLCBkZWZhdWx0cykge1xuICBmb3IgKHZhciBwIGluIGRlZmF1bHRzKSB7XG4gICAgcCBpbiBvYmogfHwgKG9ialtwXSA9IGRlZmF1bHRzW3BdKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59LFxuICAgIF9nZXRCb3VuZHMgPSBmdW5jdGlvbiBfZ2V0Qm91bmRzKGVsZW1lbnQsIHdpdGhvdXRUcmFuc2Zvcm1zKSB7XG4gIHZhciB0d2VlbiA9IHdpdGhvdXRUcmFuc2Zvcm1zICYmIF9nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpW190cmFuc2Zvcm1Qcm9wXSAhPT0gXCJtYXRyaXgoMSwgMCwgMCwgMSwgMCwgMClcIiAmJiBnc2FwLnRvKGVsZW1lbnQsIHtcbiAgICB4OiAwLFxuICAgIHk6IDAsXG4gICAgeFBlcmNlbnQ6IDAsXG4gICAgeVBlcmNlbnQ6IDAsXG4gICAgcm90YXRpb246IDAsXG4gICAgcm90YXRpb25YOiAwLFxuICAgIHJvdGF0aW9uWTogMCxcbiAgICBzY2FsZTogMSxcbiAgICBza2V3WDogMCxcbiAgICBza2V3WTogMFxuICB9KS5wcm9ncmVzcygxKSxcbiAgICAgIGJvdW5kcyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHR3ZWVuICYmIHR3ZWVuLnByb2dyZXNzKDApLmtpbGwoKTtcbiAgcmV0dXJuIGJvdW5kcztcbn0sXG4gICAgX2dldFNpemUgPSBmdW5jdGlvbiBfZ2V0U2l6ZShlbGVtZW50LCBfcmVmMykge1xuICB2YXIgZDIgPSBfcmVmMy5kMjtcbiAgcmV0dXJuIGVsZW1lbnRbXCJvZmZzZXRcIiArIGQyXSB8fCBlbGVtZW50W1wiY2xpZW50XCIgKyBkMl0gfHwgMDtcbn0sXG4gICAgX2dldExhYmVsUmF0aW9BcnJheSA9IGZ1bmN0aW9uIF9nZXRMYWJlbFJhdGlvQXJyYXkodGltZWxpbmUpIHtcbiAgdmFyIGEgPSBbXSxcbiAgICAgIGxhYmVscyA9IHRpbWVsaW5lLmxhYmVscyxcbiAgICAgIGR1cmF0aW9uID0gdGltZWxpbmUuZHVyYXRpb24oKSxcbiAgICAgIHA7XG5cbiAgZm9yIChwIGluIGxhYmVscykge1xuICAgIGEucHVzaChsYWJlbHNbcF0gLyBkdXJhdGlvbik7XG4gIH1cblxuICByZXR1cm4gYTtcbn0sXG4gICAgX2dldENsb3Nlc3RMYWJlbCA9IGZ1bmN0aW9uIF9nZXRDbG9zZXN0TGFiZWwoYW5pbWF0aW9uKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZ3NhcC51dGlscy5zbmFwKF9nZXRMYWJlbFJhdGlvQXJyYXkoYW5pbWF0aW9uKSwgdmFsdWUpO1xuICB9O1xufSxcbiAgICBfc25hcERpcmVjdGlvbmFsID0gZnVuY3Rpb24gX3NuYXBEaXJlY3Rpb25hbChzbmFwSW5jcmVtZW50T3JBcnJheSkge1xuICB2YXIgc25hcCA9IGdzYXAudXRpbHMuc25hcChzbmFwSW5jcmVtZW50T3JBcnJheSksXG4gICAgICBhID0gQXJyYXkuaXNBcnJheShzbmFwSW5jcmVtZW50T3JBcnJheSkgJiYgc25hcEluY3JlbWVudE9yQXJyYXkuc2xpY2UoMCkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhIC0gYjtcbiAgfSk7XG4gIHJldHVybiBhID8gZnVuY3Rpb24gKHZhbHVlLCBkaXJlY3Rpb24sIHRocmVzaG9sZCkge1xuICAgIGlmICh0aHJlc2hvbGQgPT09IHZvaWQgMCkge1xuICAgICAgdGhyZXNob2xkID0gMWUtMztcbiAgICB9XG5cbiAgICB2YXIgaTtcblxuICAgIGlmICghZGlyZWN0aW9uKSB7XG4gICAgICByZXR1cm4gc25hcCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKGRpcmVjdGlvbiA+IDApIHtcbiAgICAgIHZhbHVlIC09IHRocmVzaG9sZDsgLy8gdG8gYXZvaWQgcm91bmRpbmcgZXJyb3JzLiBJZiB3ZSdyZSB0b28gc3RyaWN0LCBpdCBtaWdodCBzbmFwIGZvcndhcmQsIHRoZW4gaW1tZWRpYXRlbHkgYWdhaW4sIGFuZCBhZ2Fpbi5cblxuICAgICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFbaV0gPj0gdmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gYVtpXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYVtpIC0gMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGkgPSBhLmxlbmd0aDtcbiAgICAgIHZhbHVlICs9IHRocmVzaG9sZDtcblxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICBpZiAoYVtpXSA8PSB2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBhW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFbMF07XG4gIH0gOiBmdW5jdGlvbiAodmFsdWUsIGRpcmVjdGlvbiwgdGhyZXNob2xkKSB7XG4gICAgaWYgKHRocmVzaG9sZCA9PT0gdm9pZCAwKSB7XG4gICAgICB0aHJlc2hvbGQgPSAxZS0zO1xuICAgIH1cblxuICAgIHZhciBzbmFwcGVkID0gc25hcCh2YWx1ZSk7XG4gICAgcmV0dXJuICFkaXJlY3Rpb24gfHwgTWF0aC5hYnMoc25hcHBlZCAtIHZhbHVlKSA8IHRocmVzaG9sZCB8fCBzbmFwcGVkIC0gdmFsdWUgPCAwID09PSBkaXJlY3Rpb24gPCAwID8gc25hcHBlZCA6IHNuYXAoZGlyZWN0aW9uIDwgMCA/IHZhbHVlIC0gc25hcEluY3JlbWVudE9yQXJyYXkgOiB2YWx1ZSArIHNuYXBJbmNyZW1lbnRPckFycmF5KTtcbiAgfTtcbn0sXG4gICAgX2dldExhYmVsQXREaXJlY3Rpb24gPSBmdW5jdGlvbiBfZ2V0TGFiZWxBdERpcmVjdGlvbih0aW1lbGluZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlLCBzdCkge1xuICAgIHJldHVybiBfc25hcERpcmVjdGlvbmFsKF9nZXRMYWJlbFJhdGlvQXJyYXkodGltZWxpbmUpKSh2YWx1ZSwgc3QuZGlyZWN0aW9uKTtcbiAgfTtcbn0sXG4gICAgX211bHRpTGlzdGVuZXIgPSBmdW5jdGlvbiBfbXVsdGlMaXN0ZW5lcihmdW5jLCBlbGVtZW50LCB0eXBlcywgY2FsbGJhY2spIHtcbiAgcmV0dXJuIHR5cGVzLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgcmV0dXJuIGZ1bmMoZWxlbWVudCwgdHlwZSwgY2FsbGJhY2spO1xuICB9KTtcbn0sXG4gICAgX2FkZExpc3RlbmVyID0gZnVuY3Rpb24gX2FkZExpc3RlbmVyKGVsZW1lbnQsIHR5cGUsIGZ1bmMsIG5vblBhc3NpdmUsIGNhcHR1cmUpIHtcbiAgcmV0dXJuIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBmdW5jLCB7XG4gICAgcGFzc2l2ZTogIW5vblBhc3NpdmUsXG4gICAgY2FwdHVyZTogISFjYXB0dXJlXG4gIH0pO1xufSxcbiAgICBfcmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiBfcmVtb3ZlTGlzdGVuZXIoZWxlbWVudCwgdHlwZSwgZnVuYywgY2FwdHVyZSkge1xuICByZXR1cm4gZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGZ1bmMsICEhY2FwdHVyZSk7XG59LFxuICAgIF93aGVlbExpc3RlbmVyID0gZnVuY3Rpb24gX3doZWVsTGlzdGVuZXIoZnVuYywgZWwsIHNjcm9sbEZ1bmMpIHtcbiAgc2Nyb2xsRnVuYyA9IHNjcm9sbEZ1bmMgJiYgc2Nyb2xsRnVuYy53aGVlbEhhbmRsZXI7XG5cbiAgaWYgKHNjcm9sbEZ1bmMpIHtcbiAgICBmdW5jKGVsLCBcIndoZWVsXCIsIHNjcm9sbEZ1bmMpO1xuICAgIGZ1bmMoZWwsIFwidG91Y2htb3ZlXCIsIHNjcm9sbEZ1bmMpO1xuICB9XG59LFxuICAgIF9tYXJrZXJEZWZhdWx0cyA9IHtcbiAgc3RhcnRDb2xvcjogXCJncmVlblwiLFxuICBlbmRDb2xvcjogXCJyZWRcIixcbiAgaW5kZW50OiAwLFxuICBmb250U2l6ZTogXCIxNnB4XCIsXG4gIGZvbnRXZWlnaHQ6IFwibm9ybWFsXCJcbn0sXG4gICAgX2RlZmF1bHRzID0ge1xuICB0b2dnbGVBY3Rpb25zOiBcInBsYXlcIixcbiAgYW50aWNpcGF0ZVBpbjogMFxufSxcbiAgICBfa2V5d29yZHMgPSB7XG4gIHRvcDogMCxcbiAgbGVmdDogMCxcbiAgY2VudGVyOiAwLjUsXG4gIGJvdHRvbTogMSxcbiAgcmlnaHQ6IDFcbn0sXG4gICAgX29mZnNldFRvUHggPSBmdW5jdGlvbiBfb2Zmc2V0VG9QeCh2YWx1ZSwgc2l6ZSkge1xuICBpZiAoX2lzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBlcUluZGV4ID0gdmFsdWUuaW5kZXhPZihcIj1cIiksXG4gICAgICAgIHJlbGF0aXZlID0gfmVxSW5kZXggPyArKHZhbHVlLmNoYXJBdChlcUluZGV4IC0gMSkgKyAxKSAqIHBhcnNlRmxvYXQodmFsdWUuc3Vic3RyKGVxSW5kZXggKyAxKSkgOiAwO1xuXG4gICAgaWYgKH5lcUluZGV4KSB7XG4gICAgICB2YWx1ZS5pbmRleE9mKFwiJVwiKSA+IGVxSW5kZXggJiYgKHJlbGF0aXZlICo9IHNpemUgLyAxMDApO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMCwgZXFJbmRleCAtIDEpO1xuICAgIH1cblxuICAgIHZhbHVlID0gcmVsYXRpdmUgKyAodmFsdWUgaW4gX2tleXdvcmRzID8gX2tleXdvcmRzW3ZhbHVlXSAqIHNpemUgOiB+dmFsdWUuaW5kZXhPZihcIiVcIikgPyBwYXJzZUZsb2F0KHZhbHVlKSAqIHNpemUgLyAxMDAgOiBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn0sXG4gICAgX2NyZWF0ZU1hcmtlciA9IGZ1bmN0aW9uIF9jcmVhdGVNYXJrZXIodHlwZSwgbmFtZSwgY29udGFpbmVyLCBkaXJlY3Rpb24sIF9yZWY0LCBvZmZzZXQsIG1hdGNoV2lkdGhFbCwgY29udGFpbmVyQW5pbWF0aW9uKSB7XG4gIHZhciBzdGFydENvbG9yID0gX3JlZjQuc3RhcnRDb2xvcixcbiAgICAgIGVuZENvbG9yID0gX3JlZjQuZW5kQ29sb3IsXG4gICAgICBmb250U2l6ZSA9IF9yZWY0LmZvbnRTaXplLFxuICAgICAgaW5kZW50ID0gX3JlZjQuaW5kZW50LFxuICAgICAgZm9udFdlaWdodCA9IF9yZWY0LmZvbnRXZWlnaHQ7XG5cbiAgdmFyIGUgPSBfZG9jLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgICB1c2VGaXhlZFBvc2l0aW9uID0gX2lzVmlld3BvcnQoY29udGFpbmVyKSB8fCBfZ2V0UHJveHlQcm9wKGNvbnRhaW5lciwgXCJwaW5UeXBlXCIpID09PSBcImZpeGVkXCIsXG4gICAgICBpc1Njcm9sbGVyID0gdHlwZS5pbmRleE9mKFwic2Nyb2xsZXJcIikgIT09IC0xLFxuICAgICAgcGFyZW50ID0gdXNlRml4ZWRQb3NpdGlvbiA/IF9ib2R5IDogY29udGFpbmVyLFxuICAgICAgaXNTdGFydCA9IHR5cGUuaW5kZXhPZihcInN0YXJ0XCIpICE9PSAtMSxcbiAgICAgIGNvbG9yID0gaXNTdGFydCA/IHN0YXJ0Q29sb3IgOiBlbmRDb2xvcixcbiAgICAgIGNzcyA9IFwiYm9yZGVyLWNvbG9yOlwiICsgY29sb3IgKyBcIjtmb250LXNpemU6XCIgKyBmb250U2l6ZSArIFwiO2NvbG9yOlwiICsgY29sb3IgKyBcIjtmb250LXdlaWdodDpcIiArIGZvbnRXZWlnaHQgKyBcIjtwb2ludGVyLWV2ZW50czpub25lO3doaXRlLXNwYWNlOm5vd3JhcDtmb250LWZhbWlseTpzYW5zLXNlcmlmLEFyaWFsO3otaW5kZXg6MTAwMDtwYWRkaW5nOjRweCA4cHg7Ym9yZGVyLXdpZHRoOjA7Ym9yZGVyLXN0eWxlOnNvbGlkO1wiO1xuXG4gIGNzcyArPSBcInBvc2l0aW9uOlwiICsgKChpc1Njcm9sbGVyIHx8IGNvbnRhaW5lckFuaW1hdGlvbikgJiYgdXNlRml4ZWRQb3NpdGlvbiA/IFwiZml4ZWQ7XCIgOiBcImFic29sdXRlO1wiKTtcbiAgKGlzU2Nyb2xsZXIgfHwgY29udGFpbmVyQW5pbWF0aW9uIHx8ICF1c2VGaXhlZFBvc2l0aW9uKSAmJiAoY3NzICs9IChkaXJlY3Rpb24gPT09IF92ZXJ0aWNhbCA/IF9yaWdodCA6IF9ib3R0b20pICsgXCI6XCIgKyAob2Zmc2V0ICsgcGFyc2VGbG9hdChpbmRlbnQpKSArIFwicHg7XCIpO1xuICBtYXRjaFdpZHRoRWwgJiYgKGNzcyArPSBcImJveC1zaXppbmc6Ym9yZGVyLWJveDt0ZXh0LWFsaWduOmxlZnQ7d2lkdGg6XCIgKyBtYXRjaFdpZHRoRWwub2Zmc2V0V2lkdGggKyBcInB4O1wiKTtcbiAgZS5faXNTdGFydCA9IGlzU3RhcnQ7XG4gIGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJnc2FwLW1hcmtlci1cIiArIHR5cGUgKyAobmFtZSA/IFwiIG1hcmtlci1cIiArIG5hbWUgOiBcIlwiKSk7XG4gIGUuc3R5bGUuY3NzVGV4dCA9IGNzcztcbiAgZS5pbm5lclRleHQgPSBuYW1lIHx8IG5hbWUgPT09IDAgPyB0eXBlICsgXCItXCIgKyBuYW1lIDogdHlwZTtcbiAgcGFyZW50LmNoaWxkcmVuWzBdID8gcGFyZW50Lmluc2VydEJlZm9yZShlLCBwYXJlbnQuY2hpbGRyZW5bMF0pIDogcGFyZW50LmFwcGVuZENoaWxkKGUpO1xuICBlLl9vZmZzZXQgPSBlW1wib2Zmc2V0XCIgKyBkaXJlY3Rpb24ub3AuZDJdO1xuXG4gIF9wb3NpdGlvbk1hcmtlcihlLCAwLCBkaXJlY3Rpb24sIGlzU3RhcnQpO1xuXG4gIHJldHVybiBlO1xufSxcbiAgICBfcG9zaXRpb25NYXJrZXIgPSBmdW5jdGlvbiBfcG9zaXRpb25NYXJrZXIobWFya2VyLCBzdGFydCwgZGlyZWN0aW9uLCBmbGlwcGVkKSB7XG4gIHZhciB2YXJzID0ge1xuICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxuICB9LFxuICAgICAgc2lkZSA9IGRpcmVjdGlvbltmbGlwcGVkID8gXCJvczJcIiA6IFwicDJcIl0sXG4gICAgICBvcHBvc2l0ZVNpZGUgPSBkaXJlY3Rpb25bZmxpcHBlZCA/IFwicDJcIiA6IFwib3MyXCJdO1xuICBtYXJrZXIuX2lzRmxpcHBlZCA9IGZsaXBwZWQ7XG4gIHZhcnNbZGlyZWN0aW9uLmEgKyBcIlBlcmNlbnRcIl0gPSBmbGlwcGVkID8gLTEwMCA6IDA7XG4gIHZhcnNbZGlyZWN0aW9uLmFdID0gZmxpcHBlZCA/IFwiMXB4XCIgOiAwO1xuICB2YXJzW1wiYm9yZGVyXCIgKyBzaWRlICsgX1dpZHRoXSA9IDE7XG4gIHZhcnNbXCJib3JkZXJcIiArIG9wcG9zaXRlU2lkZSArIF9XaWR0aF0gPSAwO1xuICB2YXJzW2RpcmVjdGlvbi5wXSA9IHN0YXJ0ICsgXCJweFwiO1xuICBnc2FwLnNldChtYXJrZXIsIHZhcnMpO1xufSxcbiAgICBfdHJpZ2dlcnMgPSBbXSxcbiAgICBfaWRzID0ge30sXG4gICAgX3JhZklELFxuICAgIF9zeW5jID0gZnVuY3Rpb24gX3N5bmMoKSB7XG4gIHJldHVybiBfZ2V0VGltZSgpIC0gX2xhc3RTY3JvbGxUaW1lID4gMzQgJiYgKF9yYWZJRCB8fCAoX3JhZklEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF91cGRhdGVBbGwpKSk7XG59LFxuICAgIF9vblNjcm9sbCA9IGZ1bmN0aW9uIF9vblNjcm9sbCgpIHtcbiAgLy8gcHJldmlvdXNseSwgd2UgdHJpZWQgdG8gb3B0aW1pemUgcGVyZm9ybWFuY2UgYnkgYmF0Y2hpbmcvZGVmZXJyaW5nIHRvIHRoZSBuZXh0IHJlcXVlc3RBbmltYXRpb25GcmFtZSgpLCBidXQgZGlzY292ZXJlZCB0aGF0IFNhZmFyaSBoYXMgYSBmZXcgYnVncyB0aGF0IG1ha2UgdGhpcyB1bndvcmthYmxlIChlc3BlY2lhbGx5IG9uIGlPUykuIFNlZSBodHRwczovL2NvZGVwZW4uaW8vR3JlZW5Tb2NrL3Blbi8xNmM0MzViMTJlZjA5YzM4MTI1MjA0ODE4ZTdiNDVmYz9lZGl0b3JzPTAwMTAgYW5kIGh0dHBzOi8vY29kZXBlbi5pby9HcmVlblNvY2svcGVuL0pqT3hZcFEvM2RkNjVjY2VjNWE2MGYxZDg2MmMzNTVkODRkMTQ1NjI/ZWRpdG9ycz0wMDEwIGFuZCBodHRwczovL2NvZGVwZW4uaW8vR3JlZW5Tb2NrL3Blbi9FeGJyUE5hLzA4N2NlZjE5N2RjMzU0NDVhMDk1MWU4OTM1YzQxNTAzP2VkaXRvcnM9MDAxMFxuICBpZiAoIV9ub3JtYWxpemVyIHx8ICFfbm9ybWFsaXplci5pc1ByZXNzZWQgfHwgX25vcm1hbGl6ZXIuc3RhcnRYID4gX2JvZHkuY2xpZW50V2lkdGgpIHtcbiAgICAvLyBpZiB0aGUgdXNlciBpcyBkcmFnZ2luZyB0aGUgc2Nyb2xsYmFyLCBhbGxvdyBpdC5cbiAgICBfc2Nyb2xsZXJzLmNhY2hlKys7XG5cbiAgICBpZiAoX25vcm1hbGl6ZXIpIHtcbiAgICAgIF9yYWZJRCB8fCAoX3JhZklEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF91cGRhdGVBbGwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3VwZGF0ZUFsbCgpOyAvLyBTYWZhcmkgaW4gcGFydGljdWxhciAob24gZGVza3RvcCkgTkVFRFMgdGhlIGltbWVkaWF0ZSB1cGRhdGUgcmF0aGVyIHRoYW4gd2FpdGluZyBmb3IgYSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKSB3aGVyZWFzIGlPUyBzZWVtcyB0byBiZW5lZml0IGZyb20gd2FpdGluZyBmb3IgdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHRpY2ssIGF0IGxlYXN0IHdoZW4gbm9ybWFsaXppbmcuIFNlZSBodHRwczovL2NvZGVwZW4uaW8vR3JlZW5Tb2NrL3Blbi9xQllvenFPP2VkaXRvcnM9MDExMFxuXG4gICAgfVxuXG4gICAgX2xhc3RTY3JvbGxUaW1lIHx8IF9kaXNwYXRjaChcInNjcm9sbFN0YXJ0XCIpO1xuICAgIF9sYXN0U2Nyb2xsVGltZSA9IF9nZXRUaW1lKCk7XG4gIH1cbn0sXG4gICAgX3NldEJhc2VEaW1lbnNpb25zID0gZnVuY3Rpb24gX3NldEJhc2VEaW1lbnNpb25zKCkge1xuICBfYmFzZVNjcmVlbldpZHRoID0gX3dpbi5pbm5lcldpZHRoO1xuICBfYmFzZVNjcmVlbkhlaWdodCA9IF93aW4uaW5uZXJIZWlnaHQ7XG59LFxuICAgIF9vblJlc2l6ZSA9IGZ1bmN0aW9uIF9vblJlc2l6ZSgpIHtcbiAgX3Njcm9sbGVycy5jYWNoZSsrO1xuICAhX3JlZnJlc2hpbmcgJiYgIV9pZ25vcmVSZXNpemUgJiYgIV9kb2MuZnVsbHNjcmVlbkVsZW1lbnQgJiYgIV9kb2Mud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgJiYgKCFfaWdub3JlTW9iaWxlUmVzaXplIHx8IF9iYXNlU2NyZWVuV2lkdGggIT09IF93aW4uaW5uZXJXaWR0aCB8fCBNYXRoLmFicyhfd2luLmlubmVySGVpZ2h0IC0gX2Jhc2VTY3JlZW5IZWlnaHQpID4gX3dpbi5pbm5lckhlaWdodCAqIDAuMjUpICYmIF9yZXNpemVEZWxheS5yZXN0YXJ0KHRydWUpO1xufSxcbiAgICAvLyBpZ25vcmUgcmVzaXplcyB0cmlnZ2VyZWQgYnkgcmVmcmVzaCgpXG5fbGlzdGVuZXJzID0ge30sXG4gICAgX2VtcHR5QXJyYXkgPSBbXSxcbiAgICBfc29mdFJlZnJlc2ggPSBmdW5jdGlvbiBfc29mdFJlZnJlc2goKSB7XG4gIHJldHVybiBfcmVtb3ZlTGlzdGVuZXIoU2Nyb2xsVHJpZ2dlciwgXCJzY3JvbGxFbmRcIiwgX3NvZnRSZWZyZXNoKSB8fCBfcmVmcmVzaEFsbCh0cnVlKTtcbn0sXG4gICAgX2Rpc3BhdGNoID0gZnVuY3Rpb24gX2Rpc3BhdGNoKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnNbdHlwZV0gJiYgX2xpc3RlbmVyc1t0eXBlXS5tYXAoZnVuY3Rpb24gKGYpIHtcbiAgICByZXR1cm4gZigpO1xuICB9KSB8fCBfZW1wdHlBcnJheTtcbn0sXG4gICAgX3NhdmVkU3R5bGVzID0gW10sXG4gICAgLy8gd2hlbiBTY3JvbGxUcmlnZ2VyLnNhdmVTdHlsZXMoKSBpcyBjYWxsZWQsIHRoZSBpbmxpbmUgc3R5bGVzIGFyZSByZWNvcmRlZCBpbiB0aGlzIEFycmF5IGluIGEgc2VxdWVudGlhbCBmb3JtYXQgbGlrZSBbZWxlbWVudCwgY3NzVGV4dCwgZ3NDYWNoZSwgbWVkaWFdLiBUaGlzIGtlZXBzIGl0IHZlcnkgbWVtb3J5LWVmZmljaWVudCBhbmQgZmFzdCB0byBpdGVyYXRlIHRocm91Z2guXG5fcmV2ZXJ0UmVjb3JkZWQgPSBmdW5jdGlvbiBfcmV2ZXJ0UmVjb3JkZWQobWVkaWEpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBfc2F2ZWRTdHlsZXMubGVuZ3RoOyBpICs9IDUpIHtcbiAgICBpZiAoIW1lZGlhIHx8IF9zYXZlZFN0eWxlc1tpICsgNF0gJiYgX3NhdmVkU3R5bGVzW2kgKyA0XS5xdWVyeSA9PT0gbWVkaWEpIHtcbiAgICAgIF9zYXZlZFN0eWxlc1tpXS5zdHlsZS5jc3NUZXh0ID0gX3NhdmVkU3R5bGVzW2kgKyAxXTtcbiAgICAgIF9zYXZlZFN0eWxlc1tpXS5nZXRCQm94ICYmIF9zYXZlZFN0eWxlc1tpXS5zZXRBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIiwgX3NhdmVkU3R5bGVzW2kgKyAyXSB8fCBcIlwiKTtcbiAgICAgIF9zYXZlZFN0eWxlc1tpICsgM10udW5jYWNoZSA9IDE7XG4gICAgfVxuICB9XG59LFxuICAgIF9yZXZlcnRBbGwgPSBmdW5jdGlvbiBfcmV2ZXJ0QWxsKGtpbGwsIG1lZGlhKSB7XG4gIHZhciB0cmlnZ2VyO1xuXG4gIGZvciAoX2kgPSAwOyBfaSA8IF90cmlnZ2Vycy5sZW5ndGg7IF9pKyspIHtcbiAgICB0cmlnZ2VyID0gX3RyaWdnZXJzW19pXTtcblxuICAgIGlmICh0cmlnZ2VyICYmICghbWVkaWEgfHwgdHJpZ2dlci5fY3R4ID09PSBtZWRpYSkpIHtcbiAgICAgIGlmIChraWxsKSB7XG4gICAgICAgIHRyaWdnZXIua2lsbCgxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyaWdnZXIucmV2ZXJ0KHRydWUsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1lZGlhICYmIF9yZXZlcnRSZWNvcmRlZChtZWRpYSk7XG4gIG1lZGlhIHx8IF9kaXNwYXRjaChcInJldmVydFwiKTtcbn0sXG4gICAgX2NsZWFyU2Nyb2xsTWVtb3J5ID0gZnVuY3Rpb24gX2NsZWFyU2Nyb2xsTWVtb3J5KHNjcm9sbFJlc3RvcmF0aW9uLCBmb3JjZSkge1xuICAvLyB6ZXJvLW91dCBhbGwgdGhlIHJlY29yZGVkIHNjcm9sbCBwb3NpdGlvbnMuIERvbid0IHVzZSBfdHJpZ2dlcnMgYmVjYXVzZSBpZiwgZm9yIGV4YW1wbGUsIC5tYXRjaE1lZGlhKCkgaXMgdXNlZCB0byBjcmVhdGUgc29tZSBTY3JvbGxUcmlnZ2VycyBhbmQgdGhlbiB0aGUgdXNlciByZXNpemVzIGFuZCBpdCByZW1vdmVzIEFMTCBTY3JvbGxUcmlnZ2VycywgYW5kIHRoZW4gZ28gYmFjayB0byBhIHNpemUgd2hlcmUgdGhlcmUgYXJlIFNjcm9sbFRyaWdnZXJzLCBpdCB3b3VsZCBoYXZlIGtlcHQgdGhlIHBvc2l0aW9uKHMpIHNhdmVkIGZyb20gdGhlIGluaXRpYWwgc3RhdGUuXG4gIF9zY3JvbGxlcnMuY2FjaGUrKztcbiAgKGZvcmNlIHx8ICFfcmVmcmVzaGluZ0FsbCkgJiYgX3Njcm9sbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gX2lzRnVuY3Rpb24ob2JqKSAmJiBvYmouY2FjaGVJRCsrICYmIChvYmoucmVjID0gMCk7XG4gIH0pO1xuICBfaXNTdHJpbmcoc2Nyb2xsUmVzdG9yYXRpb24pICYmIChfd2luLmhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSBfc2Nyb2xsUmVzdG9yYXRpb24gPSBzY3JvbGxSZXN0b3JhdGlvbik7XG59LFxuICAgIF9yZWZyZXNoaW5nQWxsLFxuICAgIF9yZWZyZXNoSUQgPSAwLFxuICAgIF9xdWV1ZVJlZnJlc2hJRCxcbiAgICBfcXVldWVSZWZyZXNoQWxsID0gZnVuY3Rpb24gX3F1ZXVlUmVmcmVzaEFsbCgpIHtcbiAgLy8gd2UgZG9uJ3Qgd2FudCB0byBjYWxsIF9yZWZyZXNoQWxsKCkgZXZlcnkgdGltZSB3ZSBjcmVhdGUgYSBuZXcgU2Nyb2xsVHJpZ2dlciAoZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMpIC0gaXQncyBiZXR0ZXIgdG8gYmF0Y2ggdGhlbS4gU29tZSBmcmFtZXdvcmtzIGR5bmFtaWNhbGx5IGxvYWQgY29udGVudCBhbmQgd2UgY2FuJ3QgcmVseSBvbiB0aGUgd2luZG93J3MgXCJsb2FkXCIgb3IgXCJET01Db250ZW50TG9hZGVkXCIgZXZlbnRzIHRvIHRyaWdnZXIgaXQuXG4gIGlmIChfcXVldWVSZWZyZXNoSUQgIT09IF9yZWZyZXNoSUQpIHtcbiAgICB2YXIgaWQgPSBfcXVldWVSZWZyZXNoSUQgPSBfcmVmcmVzaElEO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gaWQgPT09IF9yZWZyZXNoSUQgJiYgX3JlZnJlc2hBbGwodHJ1ZSk7XG4gICAgfSk7XG4gIH1cbn0sXG4gICAgX3JlZnJlc2hBbGwgPSBmdW5jdGlvbiBfcmVmcmVzaEFsbChmb3JjZSwgc2tpcFJldmVydCkge1xuICBpZiAoX2xhc3RTY3JvbGxUaW1lICYmICFmb3JjZSkge1xuICAgIF9hZGRMaXN0ZW5lcihTY3JvbGxUcmlnZ2VyLCBcInNjcm9sbEVuZFwiLCBfc29mdFJlZnJlc2gpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgX3JlZnJlc2hpbmdBbGwgPSBTY3JvbGxUcmlnZ2VyLmlzUmVmcmVzaGluZyA9IHRydWU7XG5cbiAgX3Njcm9sbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gX2lzRnVuY3Rpb24ob2JqKSAmJiBvYmouY2FjaGVJRCsrICYmIChvYmoucmVjID0gb2JqKCkpO1xuICB9KTsgLy8gZm9yY2UgdGhlIGNsZWFyaW5nIG9mIHRoZSBjYWNoZSBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgdGFrZSBhIGxpdHRsZSB3aGlsZSB0byBkaXNwYXRjaCB0aGUgXCJzY3JvbGxcIiBldmVudCBhbmQgdGhlIHVzZXIgbWF5IGhhdmUgY2hhbmdlZCB0aGUgc2Nyb2xsIHBvc2l0aW9uIGFuZCB0aGVuIGNhbGxlZCBTY3JvbGxUcmlnZ2VyLnJlZnJlc2goKSByaWdodCBhd2F5XG5cblxuICB2YXIgcmVmcmVzaEluaXRzID0gX2Rpc3BhdGNoKFwicmVmcmVzaEluaXRcIik7XG5cbiAgX3NvcnQgJiYgU2Nyb2xsVHJpZ2dlci5zb3J0KCk7XG4gIHNraXBSZXZlcnQgfHwgX3JldmVydEFsbCgpO1xuXG4gIF9zY3JvbGxlcnMuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgaWYgKF9pc0Z1bmN0aW9uKG9iaikpIHtcbiAgICAgIG9iai5zbW9vdGggJiYgKG9iai50YXJnZXQuc3R5bGUuc2Nyb2xsQmVoYXZpb3IgPSBcImF1dG9cIik7IC8vIHNtb290aCBzY3JvbGxpbmcgaW50ZXJmZXJlc1xuXG4gICAgICBvYmooMCk7XG4gICAgfVxuICB9KTtcblxuICBfdHJpZ2dlcnMuc2xpY2UoMCkuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgIHJldHVybiB0LnJlZnJlc2goKTtcbiAgfSk7IC8vIGRvbid0IGxvb3Agd2l0aCBfaSBiZWNhdXNlIGR1cmluZyBhIHJlZnJlc2goKSBzb21lb25lIGNvdWxkIGNhbGwgU2Nyb2xsVHJpZ2dlci51cGRhdGUoKSB3aGljaCB3b3VsZCBpdGVyYXRlIHRocm91Z2ggX2kgcmVzdWx0aW5nIGluIGEgc2tpcC5cblxuXG4gIF90cmlnZ2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh0LCBpKSB7XG4gICAgLy8gbmVzdGVkIHBpbnMgKHBpbm5lZENvbnRhaW5lcikgd2l0aCBwaW5TcGFjaW5nIG1heSBleHBhbmQgdGhlIGNvbnRhaW5lciwgc28gd2UgbXVzdCBhY2NvbW1vZGF0ZSB0aGF0IGhlcmUuXG4gICAgaWYgKHQuX3N1YlBpbk9mZnNldCAmJiB0LnBpbikge1xuICAgICAgdmFyIHByb3AgPSB0LnZhcnMuaG9yaXpvbnRhbCA/IFwib2Zmc2V0V2lkdGhcIiA6IFwib2Zmc2V0SGVpZ2h0XCIsXG4gICAgICAgICAgb3JpZ2luYWwgPSB0LnBpbltwcm9wXTtcbiAgICAgIHQucmV2ZXJ0KHRydWUsIDEpO1xuICAgICAgdC5hZGp1c3RQaW5TcGFjaW5nKHQucGluW3Byb3BdIC0gb3JpZ2luYWwpO1xuICAgICAgdC5yZWZyZXNoKCk7XG4gICAgfVxuICB9KTtcblxuICBfdHJpZ2dlcnMuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgIHJldHVybiB0LnZhcnMuZW5kID09PSBcIm1heFwiICYmIHQuc2V0UG9zaXRpb25zKHQuc3RhcnQsIE1hdGgubWF4KHQuc3RhcnQgKyAxLCBfbWF4U2Nyb2xsKHQuc2Nyb2xsZXIsIHQuX2RpcikpKTtcbiAgfSk7IC8vIHRoZSBzY3JvbGxlcidzIG1heCBzY3JvbGwgcG9zaXRpb24gbWF5IGNoYW5nZSBhZnRlciBhbGwgdGhlIFNjcm9sbFRyaWdnZXJzIHJlZnJlc2hlZCAobGlrZSBwaW5uaW5nIGNvdWxkIHB1c2ggaXQgZG93biksIHNvIHdlIG5lZWQgdG8gbG9vcCBiYWNrIGFuZCBjb3JyZWN0IGFueSB3aXRoIGVuZDogXCJtYXhcIi5cblxuXG4gIHJlZnJlc2hJbml0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICByZXR1cm4gcmVzdWx0ICYmIHJlc3VsdC5yZW5kZXIgJiYgcmVzdWx0LnJlbmRlcigtMSk7XG4gIH0pOyAvLyBpZiB0aGUgb25SZWZyZXNoSW5pdCgpIHJldHVybnMgYW4gYW5pbWF0aW9uICh0eXBpY2FsbHkgYSBnc2FwLnNldCgpKSwgcmV2ZXJ0IGl0LiBUaGlzIG1ha2VzIGl0IGVhc3kgdG8gcHV0IHRoaW5ncyBpbiBhIGNlcnRhaW4gc3BvdCBiZWZvcmUgcmVmcmVzaGluZyBmb3IgbWVhc3VyZW1lbnQgcHVycG9zZXMsIGFuZCB0aGVuIHB1dCB0aGluZ3MgYmFjay5cblxuICBfc2Nyb2xsZXJzLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgIGlmIChfaXNGdW5jdGlvbihvYmopKSB7XG4gICAgICBvYmouc21vb3RoICYmIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvYmoudGFyZ2V0LnN0eWxlLnNjcm9sbEJlaGF2aW9yID0gXCJzbW9vdGhcIjtcbiAgICAgIH0pO1xuICAgICAgb2JqLnJlYyAmJiBvYmoob2JqLnJlYyk7XG4gICAgfVxuICB9KTtcblxuICBfY2xlYXJTY3JvbGxNZW1vcnkoX3Njcm9sbFJlc3RvcmF0aW9uLCAxKTtcblxuICBfcmVzaXplRGVsYXkucGF1c2UoKTtcblxuICBfcmVmcmVzaElEKys7XG4gIF9yZWZyZXNoaW5nQWxsID0gMjtcblxuICBfdXBkYXRlQWxsKDIpO1xuXG4gIF90cmlnZ2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG4gICAgcmV0dXJuIF9pc0Z1bmN0aW9uKHQudmFycy5vblJlZnJlc2gpICYmIHQudmFycy5vblJlZnJlc2godCk7XG4gIH0pO1xuXG4gIF9yZWZyZXNoaW5nQWxsID0gU2Nyb2xsVHJpZ2dlci5pc1JlZnJlc2hpbmcgPSBmYWxzZTtcblxuICBfZGlzcGF0Y2goXCJyZWZyZXNoXCIpO1xufSxcbiAgICBfbGFzdFNjcm9sbCA9IDAsXG4gICAgX2RpcmVjdGlvbiA9IDEsXG4gICAgX3ByaW1hcnksXG4gICAgX3VwZGF0ZUFsbCA9IGZ1bmN0aW9uIF91cGRhdGVBbGwoZm9yY2UpIHtcbiAgaWYgKCFfcmVmcmVzaGluZ0FsbCB8fCBmb3JjZSA9PT0gMikge1xuICAgIFNjcm9sbFRyaWdnZXIuaXNVcGRhdGluZyA9IHRydWU7XG4gICAgX3ByaW1hcnkgJiYgX3ByaW1hcnkudXBkYXRlKDApOyAvLyBTY3JvbGxTbW9vdGhlciB1c2VzIHJlZnJlc2hQcmlvcml0eSAtOTk5OSB0byBiZWNvbWUgdGhlIHByaW1hcnkgdGhhdCBnZXRzIHVwZGF0ZWQgYmVmb3JlIGFsbCBvdGhlcnMgYmVjYXVzZSBpdCBhZmZlY3RzIHRoZSBzY3JvbGwgcG9zaXRpb24uXG5cbiAgICB2YXIgbCA9IF90cmlnZ2Vycy5sZW5ndGgsXG4gICAgICAgIHRpbWUgPSBfZ2V0VGltZSgpLFxuICAgICAgICByZWNvcmRWZWxvY2l0eSA9IHRpbWUgLSBfdGltZTEgPj0gNTAsXG4gICAgICAgIHNjcm9sbCA9IGwgJiYgX3RyaWdnZXJzWzBdLnNjcm9sbCgpO1xuXG4gICAgX2RpcmVjdGlvbiA9IF9sYXN0U2Nyb2xsID4gc2Nyb2xsID8gLTEgOiAxO1xuICAgIF9yZWZyZXNoaW5nQWxsIHx8IChfbGFzdFNjcm9sbCA9IHNjcm9sbCk7XG5cbiAgICBpZiAocmVjb3JkVmVsb2NpdHkpIHtcbiAgICAgIGlmIChfbGFzdFNjcm9sbFRpbWUgJiYgIV9wb2ludGVySXNEb3duICYmIHRpbWUgLSBfbGFzdFNjcm9sbFRpbWUgPiAyMDApIHtcbiAgICAgICAgX2xhc3RTY3JvbGxUaW1lID0gMDtcblxuICAgICAgICBfZGlzcGF0Y2goXCJzY3JvbGxFbmRcIik7XG4gICAgICB9XG5cbiAgICAgIF90aW1lMiA9IF90aW1lMTtcbiAgICAgIF90aW1lMSA9IHRpbWU7XG4gICAgfVxuXG4gICAgaWYgKF9kaXJlY3Rpb24gPCAwKSB7XG4gICAgICBfaSA9IGw7XG5cbiAgICAgIHdoaWxlIChfaS0tID4gMCkge1xuICAgICAgICBfdHJpZ2dlcnNbX2ldICYmIF90cmlnZ2Vyc1tfaV0udXBkYXRlKDAsIHJlY29yZFZlbG9jaXR5KTtcbiAgICAgIH1cblxuICAgICAgX2RpcmVjdGlvbiA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IGw7IF9pKyspIHtcbiAgICAgICAgX3RyaWdnZXJzW19pXSAmJiBfdHJpZ2dlcnNbX2ldLnVwZGF0ZSgwLCByZWNvcmRWZWxvY2l0eSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgU2Nyb2xsVHJpZ2dlci5pc1VwZGF0aW5nID0gZmFsc2U7XG4gIH1cblxuICBfcmFmSUQgPSAwO1xufSxcbiAgICBfcHJvcE5hbWVzVG9Db3B5ID0gW19sZWZ0LCBfdG9wLCBfYm90dG9tLCBfcmlnaHQsIF9tYXJnaW4gKyBfQm90dG9tLCBfbWFyZ2luICsgX1JpZ2h0LCBfbWFyZ2luICsgX1RvcCwgX21hcmdpbiArIF9MZWZ0LCBcImRpc3BsYXlcIiwgXCJmbGV4U2hyaW5rXCIsIFwiZmxvYXRcIiwgXCJ6SW5kZXhcIiwgXCJncmlkQ29sdW1uU3RhcnRcIiwgXCJncmlkQ29sdW1uRW5kXCIsIFwiZ3JpZFJvd1N0YXJ0XCIsIFwiZ3JpZFJvd0VuZFwiLCBcImdyaWRBcmVhXCIsIFwianVzdGlmeVNlbGZcIiwgXCJhbGlnblNlbGZcIiwgXCJwbGFjZVNlbGZcIiwgXCJvcmRlclwiXSxcbiAgICBfc3RhdGVQcm9wcyA9IF9wcm9wTmFtZXNUb0NvcHkuY29uY2F0KFtfd2lkdGgsIF9oZWlnaHQsIFwiYm94U2l6aW5nXCIsIFwibWF4XCIgKyBfV2lkdGgsIFwibWF4XCIgKyBfSGVpZ2h0LCBcInBvc2l0aW9uXCIsIF9tYXJnaW4sIF9wYWRkaW5nLCBfcGFkZGluZyArIF9Ub3AsIF9wYWRkaW5nICsgX1JpZ2h0LCBfcGFkZGluZyArIF9Cb3R0b20sIF9wYWRkaW5nICsgX0xlZnRdKSxcbiAgICBfc3dhcFBpbk91dCA9IGZ1bmN0aW9uIF9zd2FwUGluT3V0KHBpbiwgc3BhY2VyLCBzdGF0ZSkge1xuICBfc2V0U3RhdGUoc3RhdGUpO1xuXG4gIHZhciBjYWNoZSA9IHBpbi5fZ3NhcDtcblxuICBpZiAoY2FjaGUuc3BhY2VySXNOYXRpdmUpIHtcbiAgICBfc2V0U3RhdGUoY2FjaGUuc3BhY2VyU3RhdGUpO1xuICB9IGVsc2UgaWYgKHBpbi5fZ3NhcC5zd2FwcGVkSW4pIHtcbiAgICB2YXIgcGFyZW50ID0gc3BhY2VyLnBhcmVudE5vZGU7XG5cbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHBpbiwgc3BhY2VyKTtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChzcGFjZXIpO1xuICAgIH1cbiAgfVxuXG4gIHBpbi5fZ3NhcC5zd2FwcGVkSW4gPSBmYWxzZTtcbn0sXG4gICAgX3N3YXBQaW5JbiA9IGZ1bmN0aW9uIF9zd2FwUGluSW4ocGluLCBzcGFjZXIsIGNzLCBzcGFjZXJTdGF0ZSkge1xuICBpZiAoIXBpbi5fZ3NhcC5zd2FwcGVkSW4pIHtcbiAgICB2YXIgaSA9IF9wcm9wTmFtZXNUb0NvcHkubGVuZ3RoLFxuICAgICAgICBzcGFjZXJTdHlsZSA9IHNwYWNlci5zdHlsZSxcbiAgICAgICAgcGluU3R5bGUgPSBwaW4uc3R5bGUsXG4gICAgICAgIHA7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBwID0gX3Byb3BOYW1lc1RvQ29weVtpXTtcbiAgICAgIHNwYWNlclN0eWxlW3BdID0gY3NbcF07XG4gICAgfVxuXG4gICAgc3BhY2VyU3R5bGUucG9zaXRpb24gPSBjcy5wb3NpdGlvbiA9PT0gXCJhYnNvbHV0ZVwiID8gXCJhYnNvbHV0ZVwiIDogXCJyZWxhdGl2ZVwiO1xuICAgIGNzLmRpc3BsYXkgPT09IFwiaW5saW5lXCIgJiYgKHNwYWNlclN0eWxlLmRpc3BsYXkgPSBcImlubGluZS1ibG9ja1wiKTtcbiAgICBwaW5TdHlsZVtfYm90dG9tXSA9IHBpblN0eWxlW19yaWdodF0gPSBcImF1dG9cIjtcbiAgICBzcGFjZXJTdHlsZS5mbGV4QmFzaXMgPSBjcy5mbGV4QmFzaXMgfHwgXCJhdXRvXCI7XG4gICAgc3BhY2VyU3R5bGUub3ZlcmZsb3cgPSBcInZpc2libGVcIjtcbiAgICBzcGFjZXJTdHlsZS5ib3hTaXppbmcgPSBcImJvcmRlci1ib3hcIjtcbiAgICBzcGFjZXJTdHlsZVtfd2lkdGhdID0gX2dldFNpemUocGluLCBfaG9yaXpvbnRhbCkgKyBfcHg7XG4gICAgc3BhY2VyU3R5bGVbX2hlaWdodF0gPSBfZ2V0U2l6ZShwaW4sIF92ZXJ0aWNhbCkgKyBfcHg7XG4gICAgc3BhY2VyU3R5bGVbX3BhZGRpbmddID0gcGluU3R5bGVbX21hcmdpbl0gPSBwaW5TdHlsZVtfdG9wXSA9IHBpblN0eWxlW19sZWZ0XSA9IFwiMFwiO1xuXG4gICAgX3NldFN0YXRlKHNwYWNlclN0YXRlKTtcblxuICAgIHBpblN0eWxlW193aWR0aF0gPSBwaW5TdHlsZVtcIm1heFwiICsgX1dpZHRoXSA9IGNzW193aWR0aF07XG4gICAgcGluU3R5bGVbX2hlaWdodF0gPSBwaW5TdHlsZVtcIm1heFwiICsgX0hlaWdodF0gPSBjc1tfaGVpZ2h0XTtcbiAgICBwaW5TdHlsZVtfcGFkZGluZ10gPSBjc1tfcGFkZGluZ107XG5cbiAgICBpZiAocGluLnBhcmVudE5vZGUgIT09IHNwYWNlcikge1xuICAgICAgcGluLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNwYWNlciwgcGluKTtcbiAgICAgIHNwYWNlci5hcHBlbmRDaGlsZChwaW4pO1xuICAgIH1cblxuICAgIHBpbi5fZ3NhcC5zd2FwcGVkSW4gPSB0cnVlO1xuICB9XG59LFxuICAgIF9jYXBzRXhwID0gLyhbQS1aXSkvZyxcbiAgICBfc2V0U3RhdGUgPSBmdW5jdGlvbiBfc2V0U3RhdGUoc3RhdGUpIHtcbiAgaWYgKHN0YXRlKSB7XG4gICAgdmFyIHN0eWxlID0gc3RhdGUudC5zdHlsZSxcbiAgICAgICAgbCA9IHN0YXRlLmxlbmd0aCxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIHAsXG4gICAgICAgIHZhbHVlO1xuICAgIChzdGF0ZS50Ll9nc2FwIHx8IGdzYXAuY29yZS5nZXRDYWNoZShzdGF0ZS50KSkudW5jYWNoZSA9IDE7IC8vIG90aGVyd2lzZSB0cmFuc2Zvcm1zIG1heSBiZSBvZmZcblxuICAgIGZvciAoOyBpIDwgbDsgaSArPSAyKSB7XG4gICAgICB2YWx1ZSA9IHN0YXRlW2kgKyAxXTtcbiAgICAgIHAgPSBzdGF0ZVtpXTtcblxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHN0eWxlW3BdID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKHN0eWxlW3BdKSB7XG4gICAgICAgIHN0eWxlLnJlbW92ZVByb3BlcnR5KHAucmVwbGFjZShfY2Fwc0V4cCwgXCItJDFcIikudG9Mb3dlckNhc2UoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59LFxuICAgIF9nZXRTdGF0ZSA9IGZ1bmN0aW9uIF9nZXRTdGF0ZShlbGVtZW50KSB7XG4gIC8vIHJldHVybnMgYW4gQXJyYXkgd2l0aCBhbHRlcm5hdGluZyB2YWx1ZXMgbGlrZSBbcHJvcGVydHksIHZhbHVlLCBwcm9wZXJ0eSwgdmFsdWVdIGFuZCBhIFwidFwiIHByb3BlcnR5IHBvaW50aW5nIHRvIHRoZSB0YXJnZXQgKGVsZW1lbnQpLiBNYWtlcyBpdCBmYXN0IGFuZCBjaGVhcC5cbiAgdmFyIGwgPSBfc3RhdGVQcm9wcy5sZW5ndGgsXG4gICAgICBzdHlsZSA9IGVsZW1lbnQuc3R5bGUsXG4gICAgICBzdGF0ZSA9IFtdLFxuICAgICAgaSA9IDA7XG5cbiAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICBzdGF0ZS5wdXNoKF9zdGF0ZVByb3BzW2ldLCBzdHlsZVtfc3RhdGVQcm9wc1tpXV0pO1xuICB9XG5cbiAgc3RhdGUudCA9IGVsZW1lbnQ7XG4gIHJldHVybiBzdGF0ZTtcbn0sXG4gICAgX2NvcHlTdGF0ZSA9IGZ1bmN0aW9uIF9jb3B5U3RhdGUoc3RhdGUsIG92ZXJyaWRlLCBvbWl0T2Zmc2V0cykge1xuICB2YXIgcmVzdWx0ID0gW10sXG4gICAgICBsID0gc3RhdGUubGVuZ3RoLFxuICAgICAgaSA9IG9taXRPZmZzZXRzID8gOCA6IDAsXG4gICAgICAvLyBza2lwIHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSBpZiBvbWl0T2Zmc2V0cyBpcyB0cnVlXG4gIHA7XG5cbiAgZm9yICg7IGkgPCBsOyBpICs9IDIpIHtcbiAgICBwID0gc3RhdGVbaV07XG4gICAgcmVzdWx0LnB1c2gocCwgcCBpbiBvdmVycmlkZSA/IG92ZXJyaWRlW3BdIDogc3RhdGVbaSArIDFdKTtcbiAgfVxuXG4gIHJlc3VsdC50ID0gc3RhdGUudDtcbiAgcmV0dXJuIHJlc3VsdDtcbn0sXG4gICAgX3dpbk9mZnNldHMgPSB7XG4gIGxlZnQ6IDAsXG4gIHRvcDogMFxufSxcbiAgICAvLyAvLyBwb3RlbnRpYWwgZnV0dXJlIGZlYXR1cmUgKD8pIEFsbG93IHVzZXJzIHRvIGNhbGN1bGF0ZSB3aGVyZSBhIHRyaWdnZXIgaGl0cyAoc2Nyb2xsIHBvc2l0aW9uKSBsaWtlIGdldFNjcm9sbFBvc2l0aW9uKFwiI2lkXCIsIFwidG9wIGJvdHRvbVwiKVxuLy8gX2dldFNjcm9sbFBvc2l0aW9uID0gKHRyaWdnZXIsIHBvc2l0aW9uLCB7c2Nyb2xsZXIsIGNvbnRhaW5lckFuaW1hdGlvbiwgaG9yaXpvbnRhbH0pID0+IHtcbi8vIFx0c2Nyb2xsZXIgPSBfZ2V0VGFyZ2V0KHNjcm9sbGVyIHx8IF93aW4pO1xuLy8gXHRsZXQgZGlyZWN0aW9uID0gaG9yaXpvbnRhbCA/IF9ob3Jpem9udGFsIDogX3ZlcnRpY2FsLFxuLy8gXHRcdGlzVmlld3BvcnQgPSBfaXNWaWV3cG9ydChzY3JvbGxlcik7XG4vLyBcdF9nZXRTaXplRnVuYyhzY3JvbGxlciwgaXNWaWV3cG9ydCwgZGlyZWN0aW9uKTtcbi8vIFx0cmV0dXJuIF9wYXJzZVBvc2l0aW9uKHBvc2l0aW9uLCBfZ2V0VGFyZ2V0KHRyaWdnZXIpLCBfZ2V0U2l6ZUZ1bmMoc2Nyb2xsZXIsIGlzVmlld3BvcnQsIGRpcmVjdGlvbikoKSwgZGlyZWN0aW9uLCBfZ2V0U2Nyb2xsRnVuYyhzY3JvbGxlciwgZGlyZWN0aW9uKSgpLCAwLCAwLCAwLCBfZ2V0T2Zmc2V0c0Z1bmMoc2Nyb2xsZXIsIGlzVmlld3BvcnQpKCksIGlzVmlld3BvcnQgPyAwIDogcGFyc2VGbG9hdChfZ2V0Q29tcHV0ZWRTdHlsZShzY3JvbGxlcilbXCJib3JkZXJcIiArIGRpcmVjdGlvbi5wMiArIF9XaWR0aF0pIHx8IDAsIDAsIGNvbnRhaW5lckFuaW1hdGlvbiA/IGNvbnRhaW5lckFuaW1hdGlvbi5kdXJhdGlvbigpIDogX21heFNjcm9sbChzY3JvbGxlciksIGNvbnRhaW5lckFuaW1hdGlvbik7XG4vLyB9LFxuX3BhcnNlUG9zaXRpb24gPSBmdW5jdGlvbiBfcGFyc2VQb3NpdGlvbih2YWx1ZSwgdHJpZ2dlciwgc2Nyb2xsZXJTaXplLCBkaXJlY3Rpb24sIHNjcm9sbCwgbWFya2VyLCBtYXJrZXJTY3JvbGxlciwgc2VsZiwgc2Nyb2xsZXJCb3VuZHMsIGJvcmRlcldpZHRoLCB1c2VGaXhlZFBvc2l0aW9uLCBzY3JvbGxlck1heCwgY29udGFpbmVyQW5pbWF0aW9uKSB7XG4gIF9pc0Z1bmN0aW9uKHZhbHVlKSAmJiAodmFsdWUgPSB2YWx1ZShzZWxmKSk7XG5cbiAgaWYgKF9pc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUuc3Vic3RyKDAsIDMpID09PSBcIm1heFwiKSB7XG4gICAgdmFsdWUgPSBzY3JvbGxlck1heCArICh2YWx1ZS5jaGFyQXQoNCkgPT09IFwiPVwiID8gX29mZnNldFRvUHgoXCIwXCIgKyB2YWx1ZS5zdWJzdHIoMyksIHNjcm9sbGVyU2l6ZSkgOiAwKTtcbiAgfVxuXG4gIHZhciB0aW1lID0gY29udGFpbmVyQW5pbWF0aW9uID8gY29udGFpbmVyQW5pbWF0aW9uLnRpbWUoKSA6IDAsXG4gICAgICBwMSxcbiAgICAgIHAyLFxuICAgICAgZWxlbWVudDtcbiAgY29udGFpbmVyQW5pbWF0aW9uICYmIGNvbnRhaW5lckFuaW1hdGlvbi5zZWVrKDApO1xuXG4gIGlmICghX2lzTnVtYmVyKHZhbHVlKSkge1xuICAgIF9pc0Z1bmN0aW9uKHRyaWdnZXIpICYmICh0cmlnZ2VyID0gdHJpZ2dlcihzZWxmKSk7XG4gICAgdmFyIG9mZnNldHMgPSAodmFsdWUgfHwgXCIwXCIpLnNwbGl0KFwiIFwiKSxcbiAgICAgICAgYm91bmRzLFxuICAgICAgICBsb2NhbE9mZnNldCxcbiAgICAgICAgZ2xvYmFsT2Zmc2V0LFxuICAgICAgICBkaXNwbGF5O1xuICAgIGVsZW1lbnQgPSBfZ2V0VGFyZ2V0KHRyaWdnZXIpIHx8IF9ib2R5O1xuICAgIGJvdW5kcyA9IF9nZXRCb3VuZHMoZWxlbWVudCkgfHwge307XG5cbiAgICBpZiAoKCFib3VuZHMgfHwgIWJvdW5kcy5sZWZ0ICYmICFib3VuZHMudG9wKSAmJiBfZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xuICAgICAgLy8gaWYgZGlzcGxheSBpcyBcIm5vbmVcIiwgaXQgd29uJ3QgcmVwb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIHByb3Blcmx5XG4gICAgICBkaXNwbGF5ID0gZWxlbWVudC5zdHlsZS5kaXNwbGF5O1xuICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgYm91bmRzID0gX2dldEJvdW5kcyhlbGVtZW50KTtcbiAgICAgIGRpc3BsYXkgPyBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5IDogZWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImRpc3BsYXlcIik7XG4gICAgfVxuXG4gICAgbG9jYWxPZmZzZXQgPSBfb2Zmc2V0VG9QeChvZmZzZXRzWzBdLCBib3VuZHNbZGlyZWN0aW9uLmRdKTtcbiAgICBnbG9iYWxPZmZzZXQgPSBfb2Zmc2V0VG9QeChvZmZzZXRzWzFdIHx8IFwiMFwiLCBzY3JvbGxlclNpemUpO1xuICAgIHZhbHVlID0gYm91bmRzW2RpcmVjdGlvbi5wXSAtIHNjcm9sbGVyQm91bmRzW2RpcmVjdGlvbi5wXSAtIGJvcmRlcldpZHRoICsgbG9jYWxPZmZzZXQgKyBzY3JvbGwgLSBnbG9iYWxPZmZzZXQ7XG4gICAgbWFya2VyU2Nyb2xsZXIgJiYgX3Bvc2l0aW9uTWFya2VyKG1hcmtlclNjcm9sbGVyLCBnbG9iYWxPZmZzZXQsIGRpcmVjdGlvbiwgc2Nyb2xsZXJTaXplIC0gZ2xvYmFsT2Zmc2V0IDwgMjAgfHwgbWFya2VyU2Nyb2xsZXIuX2lzU3RhcnQgJiYgZ2xvYmFsT2Zmc2V0ID4gMjApO1xuICAgIHNjcm9sbGVyU2l6ZSAtPSBzY3JvbGxlclNpemUgLSBnbG9iYWxPZmZzZXQ7IC8vIGFkanVzdCBmb3IgdGhlIG1hcmtlclxuICB9IGVsc2Uge1xuICAgIGNvbnRhaW5lckFuaW1hdGlvbiAmJiAodmFsdWUgPSBnc2FwLnV0aWxzLm1hcFJhbmdlKGNvbnRhaW5lckFuaW1hdGlvbi5zY3JvbGxUcmlnZ2VyLnN0YXJ0LCBjb250YWluZXJBbmltYXRpb24uc2Nyb2xsVHJpZ2dlci5lbmQsIDAsIHNjcm9sbGVyTWF4LCB2YWx1ZSkpO1xuICAgIG1hcmtlclNjcm9sbGVyICYmIF9wb3NpdGlvbk1hcmtlcihtYXJrZXJTY3JvbGxlciwgc2Nyb2xsZXJTaXplLCBkaXJlY3Rpb24sIHRydWUpO1xuICB9XG5cbiAgaWYgKG1hcmtlcikge1xuICAgIHZhciBwb3NpdGlvbiA9IHZhbHVlICsgc2Nyb2xsZXJTaXplLFxuICAgICAgICBpc1N0YXJ0ID0gbWFya2VyLl9pc1N0YXJ0O1xuICAgIHAxID0gXCJzY3JvbGxcIiArIGRpcmVjdGlvbi5kMjtcblxuICAgIF9wb3NpdGlvbk1hcmtlcihtYXJrZXIsIHBvc2l0aW9uLCBkaXJlY3Rpb24sIGlzU3RhcnQgJiYgcG9zaXRpb24gPiAyMCB8fCAhaXNTdGFydCAmJiAodXNlRml4ZWRQb3NpdGlvbiA/IE1hdGgubWF4KF9ib2R5W3AxXSwgX2RvY0VsW3AxXSkgOiBtYXJrZXIucGFyZW50Tm9kZVtwMV0pIDw9IHBvc2l0aW9uICsgMSk7XG5cbiAgICBpZiAodXNlRml4ZWRQb3NpdGlvbikge1xuICAgICAgc2Nyb2xsZXJCb3VuZHMgPSBfZ2V0Qm91bmRzKG1hcmtlclNjcm9sbGVyKTtcbiAgICAgIHVzZUZpeGVkUG9zaXRpb24gJiYgKG1hcmtlci5zdHlsZVtkaXJlY3Rpb24ub3AucF0gPSBzY3JvbGxlckJvdW5kc1tkaXJlY3Rpb24ub3AucF0gLSBkaXJlY3Rpb24ub3AubSAtIG1hcmtlci5fb2Zmc2V0ICsgX3B4KTtcbiAgICB9XG4gIH1cblxuICBpZiAoY29udGFpbmVyQW5pbWF0aW9uICYmIGVsZW1lbnQpIHtcbiAgICBwMSA9IF9nZXRCb3VuZHMoZWxlbWVudCk7XG4gICAgY29udGFpbmVyQW5pbWF0aW9uLnNlZWsoc2Nyb2xsZXJNYXgpO1xuICAgIHAyID0gX2dldEJvdW5kcyhlbGVtZW50KTtcbiAgICBjb250YWluZXJBbmltYXRpb24uX2NhU2Nyb2xsRGlzdCA9IHAxW2RpcmVjdGlvbi5wXSAtIHAyW2RpcmVjdGlvbi5wXTtcbiAgICB2YWx1ZSA9IHZhbHVlIC8gY29udGFpbmVyQW5pbWF0aW9uLl9jYVNjcm9sbERpc3QgKiBzY3JvbGxlck1heDtcbiAgfVxuXG4gIGNvbnRhaW5lckFuaW1hdGlvbiAmJiBjb250YWluZXJBbmltYXRpb24uc2Vlayh0aW1lKTtcbiAgcmV0dXJuIGNvbnRhaW5lckFuaW1hdGlvbiA/IHZhbHVlIDogTWF0aC5yb3VuZCh2YWx1ZSk7XG59LFxuICAgIF9wcmVmaXhFeHAgPSAvKHdlYmtpdHxtb3p8bGVuZ3RofGNzc1RleHR8aW5zZXQpL2ksXG4gICAgX3JlcGFyZW50ID0gZnVuY3Rpb24gX3JlcGFyZW50KGVsZW1lbnQsIHBhcmVudCwgdG9wLCBsZWZ0KSB7XG4gIGlmIChlbGVtZW50LnBhcmVudE5vZGUgIT09IHBhcmVudCkge1xuICAgIHZhciBzdHlsZSA9IGVsZW1lbnQuc3R5bGUsXG4gICAgICAgIHAsXG4gICAgICAgIGNzO1xuXG4gICAgaWYgKHBhcmVudCA9PT0gX2JvZHkpIHtcbiAgICAgIGVsZW1lbnQuX3N0T3JpZyA9IHN0eWxlLmNzc1RleHQ7IC8vIHJlY29yZCBvcmlnaW5hbCBpbmxpbmUgc3R5bGVzIHNvIHdlIGNhbiByZXZlcnQgdGhlbSBsYXRlclxuXG4gICAgICBjcyA9IF9nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgICBmb3IgKHAgaW4gY3MpIHtcbiAgICAgICAgLy8gbXVzdCBjb3B5IGFsbCByZWxldmFudCBzdHlsZXMgdG8gZW5zdXJlIHRoYXQgbm90aGluZyBjaGFuZ2VzIHZpc3VhbGx5IHdoZW4gd2UgcmVwYXJlbnQgdG8gdGhlIDxib2R5Pi4gU2tpcCB0aGUgdmVuZG9yIHByZWZpeGVkIG9uZXMuXG4gICAgICAgIGlmICghK3AgJiYgIV9wcmVmaXhFeHAudGVzdChwKSAmJiBjc1twXSAmJiB0eXBlb2Ygc3R5bGVbcF0gPT09IFwic3RyaW5nXCIgJiYgcCAhPT0gXCIwXCIpIHtcbiAgICAgICAgICBzdHlsZVtwXSA9IGNzW3BdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN0eWxlLnRvcCA9IHRvcDtcbiAgICAgIHN0eWxlLmxlZnQgPSBsZWZ0O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5jc3NUZXh0ID0gZWxlbWVudC5fc3RPcmlnO1xuICAgIH1cblxuICAgIGdzYXAuY29yZS5nZXRDYWNoZShlbGVtZW50KS51bmNhY2hlID0gMTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gIH1cbn0sXG4gICAgX2ludGVycnVwdGlvblRyYWNrZXIgPSBmdW5jdGlvbiBfaW50ZXJydXB0aW9uVHJhY2tlcihnZXRWYWx1ZUZ1bmMsIGluaXRpYWxWYWx1ZSwgb25JbnRlcnJ1cHQpIHtcbiAgdmFyIGxhc3QxID0gaW5pdGlhbFZhbHVlLFxuICAgICAgbGFzdDIgPSBsYXN0MTtcbiAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciBjdXJyZW50ID0gTWF0aC5yb3VuZChnZXRWYWx1ZUZ1bmMoKSk7IC8vIHJvdW5kIGJlY2F1c2UgaW4gc29tZSBbdmVyeSB1bmNvbW1vbl0gV2luZG93cyBlbnZpcm9ubWVudHMsIHNjcm9sbCBjYW4gZ2V0IHJlcG9ydGVkIHdpdGggZGVjaW1hbHMgZXZlbiB0aG91Z2ggaXQgd2FzIHNldCB3aXRob3V0LlxuXG4gICAgaWYgKGN1cnJlbnQgIT09IGxhc3QxICYmIGN1cnJlbnQgIT09IGxhc3QyICYmIE1hdGguYWJzKGN1cnJlbnQgLSBsYXN0MSkgPiAzICYmIE1hdGguYWJzKGN1cnJlbnQgLSBsYXN0MikgPiAzKSB7XG4gICAgICAvLyBpZiB0aGUgdXNlciBzY3JvbGxzLCBraWxsIHRoZSB0d2Vlbi4gaU9TIFNhZmFyaSBpbnRlcm1pdHRlbnRseSBtaXNyZXBvcnRzIHRoZSBzY3JvbGwgcG9zaXRpb24sIGl0IG1heSBiZSB0aGUgbW9zdCByZWNlbnRseS1zZXQgb25lIG9yIHRoZSBvbmUgYmVmb3JlIHRoYXQhIFdoZW4gU2FmYXJpIGlzIHpvb21lZCAoQ01ELSspLCBpdCBvZnRlbiBtaXNyZXBvcnRzIGFzIDEgcGl4ZWwgb2ZmIHRvbyEgU28gaWYgd2Ugc2V0IHRoZSBzY3JvbGwgcG9zaXRpb24gdG8gMTI1LCBmb3IgZXhhbXBsZSwgaXQnbGwgYWN0dWFsbHkgcmVwb3J0IGl0IGFzIDEyNC5cbiAgICAgIHZhbHVlID0gY3VycmVudDtcbiAgICAgIG9uSW50ZXJydXB0ICYmIG9uSW50ZXJydXB0KCk7XG4gICAgfVxuXG4gICAgbGFzdDIgPSBsYXN0MTtcbiAgICBsYXN0MSA9IHZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn0sXG4gICAgLy8gX21lcmdlQW5pbWF0aW9ucyA9IGFuaW1hdGlvbnMgPT4ge1xuLy8gXHRsZXQgdGwgPSBnc2FwLnRpbWVsaW5lKHtzbW9vdGhDaGlsZFRpbWluZzogdHJ1ZX0pLnN0YXJ0VGltZShNYXRoLm1pbiguLi5hbmltYXRpb25zLm1hcChhID0+IGEuZ2xvYmFsVGltZSgwKSkpKTtcbi8vIFx0YW5pbWF0aW9ucy5mb3JFYWNoKGEgPT4ge2xldCB0aW1lID0gYS50b3RhbFRpbWUoKTsgdGwuYWRkKGEpOyBhLnRvdGFsVGltZSh0aW1lKTsgfSk7XG4vLyBcdHRsLnNtb290aENoaWxkVGltaW5nID0gZmFsc2U7XG4vLyBcdHJldHVybiB0bDtcbi8vIH0sXG4vLyByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byB0d2VlbiB0aGUgc2Nyb2xsIHBvc2l0aW9uIGluIHRoZSBkaXJlY3Rpb24gcHJvdmlkZWQsIGFuZCB3aGVuIGRvaW5nIHNvIGl0J2xsIGFkZCBhIC50d2VlbiBwcm9wZXJ0eSB0byB0aGUgRlVOQ1RJT04gaXRzZWxmLCBhbmQgcmVtb3ZlIGl0IHdoZW4gdGhlIHR3ZWVuIGNvbXBsZXRlcyBvciBnZXRzIGtpbGxlZC4gVGhpcyBnaXZlcyB1cyBhIHdheSB0byBoYXZlIG11bHRpcGxlIFNjcm9sbFRyaWdnZXJzIHVzZSBhIGNlbnRyYWwgZnVuY3Rpb24gZm9yIGFueSBnaXZlbiBzY3JvbGxlciBhbmQgc2VlIGlmIHRoZXJlJ3MgYSBzY3JvbGwgdHdlZW4gcnVubmluZyAod2hpY2ggd291bGQgYWZmZWN0IGlmL2hvdyB0aGluZ3MgZ2V0IHVwZGF0ZWQpXG5fZ2V0VHdlZW5DcmVhdG9yID0gZnVuY3Rpb24gX2dldFR3ZWVuQ3JlYXRvcihzY3JvbGxlciwgZGlyZWN0aW9uKSB7XG4gIHZhciBnZXRTY3JvbGwgPSBfZ2V0U2Nyb2xsRnVuYyhzY3JvbGxlciwgZGlyZWN0aW9uKSxcbiAgICAgIHByb3AgPSBcIl9zY3JvbGxcIiArIGRpcmVjdGlvbi5wMixcbiAgICAgIC8vIGFkZCBhIHR3ZWVuYWJsZSBwcm9wZXJ0eSB0byB0aGUgc2Nyb2xsZXIgdGhhdCdzIGEgZ2V0dGVyL3NldHRlciBmdW5jdGlvbiwgbGlrZSBfc2Nyb2xsVG9wIG9yIF9zY3JvbGxMZWZ0LiBUaGlzIHdheSwgaWYgc29tZW9uZSBkb2VzIGdzYXAua2lsbFR3ZWVuc09mKHNjcm9sbGVyKSBpdCdsbCBraWxsIHRoZSBzY3JvbGwgdHdlZW4uXG4gIGxhc3RTY3JvbGwxLFxuICAgICAgbGFzdFNjcm9sbDIsXG4gICAgICBnZXRUd2VlbiA9IGZ1bmN0aW9uIGdldFR3ZWVuKHNjcm9sbFRvLCB2YXJzLCBpbml0aWFsVmFsdWUsIGNoYW5nZTEsIGNoYW5nZTIpIHtcbiAgICB2YXIgdHdlZW4gPSBnZXRUd2Vlbi50d2VlbixcbiAgICAgICAgb25Db21wbGV0ZSA9IHZhcnMub25Db21wbGV0ZSxcbiAgICAgICAgbW9kaWZpZXJzID0ge307XG4gICAgaW5pdGlhbFZhbHVlID0gaW5pdGlhbFZhbHVlIHx8IGdldFNjcm9sbCgpO1xuXG4gICAgdmFyIGNoZWNrRm9ySW50ZXJydXB0aW9uID0gX2ludGVycnVwdGlvblRyYWNrZXIoZ2V0U2Nyb2xsLCBpbml0aWFsVmFsdWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHR3ZWVuLmtpbGwoKTtcbiAgICAgIGdldFR3ZWVuLnR3ZWVuID0gMDtcbiAgICB9KTtcblxuICAgIGNoYW5nZTIgPSBjaGFuZ2UxICYmIGNoYW5nZTIgfHwgMDsgLy8gaWYgY2hhbmdlMSBpcyAwLCB3ZSBzZXQgdGhhdCB0byB0aGUgZGlmZmVyZW5jZSBhbmQgaWdub3JlIGNoYW5nZTIuIE90aGVyd2lzZSwgdGhlcmUgd291bGQgYmUgYSBjb21wb3VuZCBlZmZlY3QuXG5cbiAgICBjaGFuZ2UxID0gY2hhbmdlMSB8fCBzY3JvbGxUbyAtIGluaXRpYWxWYWx1ZTtcbiAgICB0d2VlbiAmJiB0d2Vlbi5raWxsKCk7XG4gICAgbGFzdFNjcm9sbDEgPSBNYXRoLnJvdW5kKGluaXRpYWxWYWx1ZSk7XG4gICAgdmFyc1twcm9wXSA9IHNjcm9sbFRvO1xuICAgIHZhcnMubW9kaWZpZXJzID0gbW9kaWZpZXJzO1xuXG4gICAgbW9kaWZpZXJzW3Byb3BdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGNoZWNrRm9ySW50ZXJydXB0aW9uKGluaXRpYWxWYWx1ZSArIGNoYW5nZTEgKiB0d2Vlbi5yYXRpbyArIGNoYW5nZTIgKiB0d2Vlbi5yYXRpbyAqIHR3ZWVuLnJhdGlvKTtcbiAgICB9O1xuXG4gICAgdmFycy5vblVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF9zY3JvbGxlcnMuY2FjaGUrKztcblxuICAgICAgX3VwZGF0ZUFsbCgpO1xuICAgIH07XG5cbiAgICB2YXJzLm9uQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBnZXRUd2Vlbi50d2VlbiA9IDA7XG4gICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUuY2FsbCh0d2Vlbik7XG4gICAgfTtcblxuICAgIHR3ZWVuID0gZ2V0VHdlZW4udHdlZW4gPSBnc2FwLnRvKHNjcm9sbGVyLCB2YXJzKTtcbiAgICByZXR1cm4gdHdlZW47XG4gIH07XG5cbiAgc2Nyb2xsZXJbcHJvcF0gPSBnZXRTY3JvbGw7XG5cbiAgZ2V0U2Nyb2xsLndoZWVsSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZ2V0VHdlZW4udHdlZW4gJiYgZ2V0VHdlZW4udHdlZW4ua2lsbCgpICYmIChnZXRUd2Vlbi50d2VlbiA9IDApO1xuICB9O1xuXG4gIF9hZGRMaXN0ZW5lcihzY3JvbGxlciwgXCJ3aGVlbFwiLCBnZXRTY3JvbGwud2hlZWxIYW5kbGVyKTsgLy8gV2luZG93cyBtYWNoaW5lcyBoYW5kbGUgbW91c2V3aGVlbCBzY3JvbGxpbmcgaW4gY2h1bmtzIChsaWtlIFwiMyBsaW5lcyBwZXIgc2Nyb2xsXCIpIG1lYW5pbmcgdGhlIHR5cGljYWwgc3RyYXRlZ3kgZm9yIGNhbmNlbGxpbmcgdGhlIHNjcm9sbCBpc24ndCBhcyBzZW5zaXRpdmUuIEl0J3MgbXVjaCBtb3JlIGxpa2VseSB0byBtYXRjaCBvbmUgb2YgdGhlIHByZXZpb3VzIDIgc2Nyb2xsIGV2ZW50IHBvc2l0aW9ucy4gU28gd2Uga2lsbCBhbnkgc25hcHBpbmcgYXMgc29vbiBhcyB0aGVyZSdzIGEgd2hlZWwgZXZlbnQuXG5cblxuICBTY3JvbGxUcmlnZ2VyLmlzVG91Y2ggJiYgX2FkZExpc3RlbmVyKHNjcm9sbGVyLCBcInRvdWNobW92ZVwiLCBnZXRTY3JvbGwud2hlZWxIYW5kbGVyKTtcbiAgcmV0dXJuIGdldFR3ZWVuO1xufTtcblxuZXhwb3J0IHZhciBTY3JvbGxUcmlnZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU2Nyb2xsVHJpZ2dlcih2YXJzLCBhbmltYXRpb24pIHtcbiAgICBfY29yZUluaXR0ZWQgfHwgU2Nyb2xsVHJpZ2dlci5yZWdpc3Rlcihnc2FwKSB8fCBjb25zb2xlLndhcm4oXCJQbGVhc2UgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyKVwiKTtcbiAgICB0aGlzLmluaXQodmFycywgYW5pbWF0aW9uKTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBTY3JvbGxUcmlnZ2VyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdCA9IGZ1bmN0aW9uIGluaXQodmFycywgYW5pbWF0aW9uKSB7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMuc3RhcnQgPSAwO1xuICAgIHRoaXMudmFycyAmJiB0aGlzLmtpbGwodHJ1ZSwgdHJ1ZSk7IC8vIGluIGNhc2UgaXQncyBiZWluZyBpbml0dGVkIGFnYWluXG5cbiAgICBpZiAoIV9lbmFibGVkKSB7XG4gICAgICB0aGlzLnVwZGF0ZSA9IHRoaXMucmVmcmVzaCA9IHRoaXMua2lsbCA9IF9wYXNzVGhyb3VnaDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXJzID0gX3NldERlZmF1bHRzKF9pc1N0cmluZyh2YXJzKSB8fCBfaXNOdW1iZXIodmFycykgfHwgdmFycy5ub2RlVHlwZSA/IHtcbiAgICAgIHRyaWdnZXI6IHZhcnNcbiAgICB9IDogdmFycywgX2RlZmF1bHRzKTtcblxuICAgIHZhciBfdmFycyA9IHZhcnMsXG4gICAgICAgIG9uVXBkYXRlID0gX3ZhcnMub25VcGRhdGUsXG4gICAgICAgIHRvZ2dsZUNsYXNzID0gX3ZhcnMudG9nZ2xlQ2xhc3MsXG4gICAgICAgIGlkID0gX3ZhcnMuaWQsXG4gICAgICAgIG9uVG9nZ2xlID0gX3ZhcnMub25Ub2dnbGUsXG4gICAgICAgIG9uUmVmcmVzaCA9IF92YXJzLm9uUmVmcmVzaCxcbiAgICAgICAgc2NydWIgPSBfdmFycy5zY3J1YixcbiAgICAgICAgdHJpZ2dlciA9IF92YXJzLnRyaWdnZXIsXG4gICAgICAgIHBpbiA9IF92YXJzLnBpbixcbiAgICAgICAgcGluU3BhY2luZyA9IF92YXJzLnBpblNwYWNpbmcsXG4gICAgICAgIGludmFsaWRhdGVPblJlZnJlc2ggPSBfdmFycy5pbnZhbGlkYXRlT25SZWZyZXNoLFxuICAgICAgICBhbnRpY2lwYXRlUGluID0gX3ZhcnMuYW50aWNpcGF0ZVBpbixcbiAgICAgICAgb25TY3J1YkNvbXBsZXRlID0gX3ZhcnMub25TY3J1YkNvbXBsZXRlLFxuICAgICAgICBvblNuYXBDb21wbGV0ZSA9IF92YXJzLm9uU25hcENvbXBsZXRlLFxuICAgICAgICBvbmNlID0gX3ZhcnMub25jZSxcbiAgICAgICAgc25hcCA9IF92YXJzLnNuYXAsXG4gICAgICAgIHBpblJlcGFyZW50ID0gX3ZhcnMucGluUmVwYXJlbnQsXG4gICAgICAgIHBpblNwYWNlciA9IF92YXJzLnBpblNwYWNlcixcbiAgICAgICAgY29udGFpbmVyQW5pbWF0aW9uID0gX3ZhcnMuY29udGFpbmVyQW5pbWF0aW9uLFxuICAgICAgICBmYXN0U2Nyb2xsRW5kID0gX3ZhcnMuZmFzdFNjcm9sbEVuZCxcbiAgICAgICAgcHJldmVudE92ZXJsYXBzID0gX3ZhcnMucHJldmVudE92ZXJsYXBzLFxuICAgICAgICBkaXJlY3Rpb24gPSB2YXJzLmhvcml6b250YWwgfHwgdmFycy5jb250YWluZXJBbmltYXRpb24gJiYgdmFycy5ob3Jpem9udGFsICE9PSBmYWxzZSA/IF9ob3Jpem9udGFsIDogX3ZlcnRpY2FsLFxuICAgICAgICBpc1RvZ2dsZSA9ICFzY3J1YiAmJiBzY3J1YiAhPT0gMCxcbiAgICAgICAgc2Nyb2xsZXIgPSBfZ2V0VGFyZ2V0KHZhcnMuc2Nyb2xsZXIgfHwgX3dpbiksXG4gICAgICAgIHNjcm9sbGVyQ2FjaGUgPSBnc2FwLmNvcmUuZ2V0Q2FjaGUoc2Nyb2xsZXIpLFxuICAgICAgICBpc1ZpZXdwb3J0ID0gX2lzVmlld3BvcnQoc2Nyb2xsZXIpLFxuICAgICAgICB1c2VGaXhlZFBvc2l0aW9uID0gKFwicGluVHlwZVwiIGluIHZhcnMgPyB2YXJzLnBpblR5cGUgOiBfZ2V0UHJveHlQcm9wKHNjcm9sbGVyLCBcInBpblR5cGVcIikgfHwgaXNWaWV3cG9ydCAmJiBcImZpeGVkXCIpID09PSBcImZpeGVkXCIsXG4gICAgICAgIGNhbGxiYWNrcyA9IFt2YXJzLm9uRW50ZXIsIHZhcnMub25MZWF2ZSwgdmFycy5vbkVudGVyQmFjaywgdmFycy5vbkxlYXZlQmFja10sXG4gICAgICAgIHRvZ2dsZUFjdGlvbnMgPSBpc1RvZ2dsZSAmJiB2YXJzLnRvZ2dsZUFjdGlvbnMuc3BsaXQoXCIgXCIpLFxuICAgICAgICBtYXJrZXJzID0gXCJtYXJrZXJzXCIgaW4gdmFycyA/IHZhcnMubWFya2VycyA6IF9kZWZhdWx0cy5tYXJrZXJzLFxuICAgICAgICBib3JkZXJXaWR0aCA9IGlzVmlld3BvcnQgPyAwIDogcGFyc2VGbG9hdChfZ2V0Q29tcHV0ZWRTdHlsZShzY3JvbGxlcilbXCJib3JkZXJcIiArIGRpcmVjdGlvbi5wMiArIF9XaWR0aF0pIHx8IDAsXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBvblJlZnJlc2hJbml0ID0gdmFycy5vblJlZnJlc2hJbml0ICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB2YXJzLm9uUmVmcmVzaEluaXQoc2VsZik7XG4gICAgfSxcbiAgICAgICAgZ2V0U2Nyb2xsZXJTaXplID0gX2dldFNpemVGdW5jKHNjcm9sbGVyLCBpc1ZpZXdwb3J0LCBkaXJlY3Rpb24pLFxuICAgICAgICBnZXRTY3JvbGxlck9mZnNldHMgPSBfZ2V0T2Zmc2V0c0Z1bmMoc2Nyb2xsZXIsIGlzVmlld3BvcnQpLFxuICAgICAgICBsYXN0U25hcCA9IDAsXG4gICAgICAgIGxhc3RSZWZyZXNoID0gMCxcbiAgICAgICAgc2Nyb2xsRnVuYyA9IF9nZXRTY3JvbGxGdW5jKHNjcm9sbGVyLCBkaXJlY3Rpb24pLFxuICAgICAgICB0d2VlblRvLFxuICAgICAgICBwaW5DYWNoZSxcbiAgICAgICAgc25hcEZ1bmMsXG4gICAgICAgIHNjcm9sbDEsXG4gICAgICAgIHNjcm9sbDIsXG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBlbmQsXG4gICAgICAgIG1hcmtlclN0YXJ0LFxuICAgICAgICBtYXJrZXJFbmQsXG4gICAgICAgIG1hcmtlclN0YXJ0VHJpZ2dlcixcbiAgICAgICAgbWFya2VyRW5kVHJpZ2dlcixcbiAgICAgICAgbWFya2VyVmFycyxcbiAgICAgICAgY2hhbmdlLFxuICAgICAgICBwaW5PcmlnaW5hbFN0YXRlLFxuICAgICAgICBwaW5BY3RpdmVTdGF0ZSxcbiAgICAgICAgcGluU3RhdGUsXG4gICAgICAgIHNwYWNlcixcbiAgICAgICAgb2Zmc2V0LFxuICAgICAgICBwaW5HZXR0ZXIsXG4gICAgICAgIHBpblNldHRlcixcbiAgICAgICAgcGluU3RhcnQsXG4gICAgICAgIHBpbkNoYW5nZSxcbiAgICAgICAgc3BhY2luZ1N0YXJ0LFxuICAgICAgICBzcGFjZXJTdGF0ZSxcbiAgICAgICAgbWFya2VyU3RhcnRTZXR0ZXIsXG4gICAgICAgIHBpbk1vdmVzLFxuICAgICAgICBtYXJrZXJFbmRTZXR0ZXIsXG4gICAgICAgIGNzLFxuICAgICAgICBzbmFwMSxcbiAgICAgICAgc25hcDIsXG4gICAgICAgIHNjcnViVHdlZW4sXG4gICAgICAgIHNjcnViU21vb3RoLFxuICAgICAgICBzbmFwRHVyQ2xhbXAsXG4gICAgICAgIHNuYXBEZWxheWVkQ2FsbCxcbiAgICAgICAgcHJldlByb2dyZXNzLFxuICAgICAgICBwcmV2U2Nyb2xsLFxuICAgICAgICBwcmV2QW5pbVByb2dyZXNzLFxuICAgICAgICBjYU1hcmtlclNldHRlcixcbiAgICAgICAgY3VzdG9tUmV2ZXJ0UmV0dXJuO1xuXG4gICAgX2NvbnRleHQoc2VsZik7XG5cbiAgICBzZWxmLl9kaXIgPSBkaXJlY3Rpb247XG4gICAgYW50aWNpcGF0ZVBpbiAqPSA0NTtcbiAgICBzZWxmLnNjcm9sbGVyID0gc2Nyb2xsZXI7XG4gICAgc2VsZi5zY3JvbGwgPSBjb250YWluZXJBbmltYXRpb24gPyBjb250YWluZXJBbmltYXRpb24udGltZS5iaW5kKGNvbnRhaW5lckFuaW1hdGlvbikgOiBzY3JvbGxGdW5jO1xuICAgIHNjcm9sbDEgPSBzY3JvbGxGdW5jKCk7XG4gICAgc2VsZi52YXJzID0gdmFycztcbiAgICBhbmltYXRpb24gPSBhbmltYXRpb24gfHwgdmFycy5hbmltYXRpb247XG5cbiAgICBpZiAoXCJyZWZyZXNoUHJpb3JpdHlcIiBpbiB2YXJzKSB7XG4gICAgICBfc29ydCA9IDE7XG4gICAgICB2YXJzLnJlZnJlc2hQcmlvcml0eSA9PT0gLTk5OTkgJiYgKF9wcmltYXJ5ID0gc2VsZik7IC8vIHVzZWQgYnkgU2Nyb2xsU21vb3RoZXJcbiAgICB9XG5cbiAgICBzY3JvbGxlckNhY2hlLnR3ZWVuU2Nyb2xsID0gc2Nyb2xsZXJDYWNoZS50d2VlblNjcm9sbCB8fCB7XG4gICAgICB0b3A6IF9nZXRUd2VlbkNyZWF0b3Ioc2Nyb2xsZXIsIF92ZXJ0aWNhbCksXG4gICAgICBsZWZ0OiBfZ2V0VHdlZW5DcmVhdG9yKHNjcm9sbGVyLCBfaG9yaXpvbnRhbClcbiAgICB9O1xuICAgIHNlbGYudHdlZW5UbyA9IHR3ZWVuVG8gPSBzY3JvbGxlckNhY2hlLnR3ZWVuU2Nyb2xsW2RpcmVjdGlvbi5wXTtcblxuICAgIHNlbGYuc2NydWJEdXJhdGlvbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgc2NydWJTbW9vdGggPSBfaXNOdW1iZXIodmFsdWUpICYmIHZhbHVlO1xuXG4gICAgICBpZiAoIXNjcnViU21vb3RoKSB7XG4gICAgICAgIHNjcnViVHdlZW4gJiYgc2NydWJUd2Vlbi5wcm9ncmVzcygxKS5raWxsKCk7XG4gICAgICAgIHNjcnViVHdlZW4gPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NydWJUd2VlbiA/IHNjcnViVHdlZW4uZHVyYXRpb24odmFsdWUpIDogc2NydWJUd2VlbiA9IGdzYXAudG8oYW5pbWF0aW9uLCB7XG4gICAgICAgICAgZWFzZTogXCJleHBvXCIsXG4gICAgICAgICAgdG90YWxQcm9ncmVzczogXCIrPTAuMDAxXCIsXG4gICAgICAgICAgZHVyYXRpb246IHNjcnViU21vb3RoLFxuICAgICAgICAgIHBhdXNlZDogdHJ1ZSxcbiAgICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiBvbkNvbXBsZXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIG9uU2NydWJDb21wbGV0ZSAmJiBvblNjcnViQ29tcGxldGUoc2VsZik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGFuaW1hdGlvbikge1xuICAgICAgYW5pbWF0aW9uLnZhcnMubGF6eSA9IGZhbHNlO1xuICAgICAgYW5pbWF0aW9uLl9pbml0dGVkIHx8IGFuaW1hdGlvbi52YXJzLmltbWVkaWF0ZVJlbmRlciAhPT0gZmFsc2UgJiYgdmFycy5pbW1lZGlhdGVSZW5kZXIgIT09IGZhbHNlICYmIGFuaW1hdGlvbi5kdXJhdGlvbigpICYmIGFuaW1hdGlvbi5yZW5kZXIoMCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBzZWxmLmFuaW1hdGlvbiA9IGFuaW1hdGlvbi5wYXVzZSgpO1xuICAgICAgYW5pbWF0aW9uLnNjcm9sbFRyaWdnZXIgPSBzZWxmO1xuICAgICAgc2VsZi5zY3J1YkR1cmF0aW9uKHNjcnViKTtcbiAgICAgIHNjcnViVHdlZW4gJiYgc2NydWJUd2Vlbi5yZXNldFRvICYmIHNjcnViVHdlZW4ucmVzZXRUbyhcInRvdGFsUHJvZ3Jlc3NcIiwgMCk7IC8vIG90aGVyd2lzZSB0aGUgaW5pdGlhbCBzY3J1YiBwcm9ncmVzcyB2YWx1ZSB3b3VsZCBzdGFydCBhdCAwLjAwMSB3aGljaCBub3JtYWxseSBpcyBubyBiaWcgZGVhbCwgYnV0IGZvciBjb250YWluZXJBbmltYXRpb24gaXQgY2FuIGJlIG5vdGljZWFibGUgc2luY2UgdGhlIHJhbmdlIGlzIHNvIHRpbnkuXG5cbiAgICAgIHNuYXAxID0gMDtcbiAgICAgIGlkIHx8IChpZCA9IGFuaW1hdGlvbi52YXJzLmlkKTtcbiAgICB9XG5cbiAgICBfdHJpZ2dlcnMucHVzaChzZWxmKTtcblxuICAgIGlmIChzbmFwKSB7XG4gICAgICAvLyBUT0RPOiBwb3RlbnRpYWwgaWRlYTogdXNlIGxlZ2l0aW1hdGUgQ1NTIHNjcm9sbCBzbmFwcGluZyBieSBwdXNoaW5nIGludmlzaWJsZSBlbGVtZW50cyBpbnRvIHRoZSBET00gdGhhdCBzZXJ2ZSBhcyBzbmFwIHBvc2l0aW9ucywgYW5kIHRvZ2dsZSB0aGUgZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zdHlsZS5zY3JvbGxTbmFwVHlwZSBvblRvZ2dsZS4gU2VlIGh0dHBzOi8vY29kZXBlbi5pby9HcmVlblNvY2svcGVuL0pqTHJnV00gZm9yIGEgcXVpY2sgcHJvb2Ygb2YgY29uY2VwdC5cbiAgICAgIGlmICghX2lzT2JqZWN0KHNuYXApIHx8IHNuYXAucHVzaCkge1xuICAgICAgICBzbmFwID0ge1xuICAgICAgICAgIHNuYXBUbzogc25hcFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBcInNjcm9sbEJlaGF2aW9yXCIgaW4gX2JvZHkuc3R5bGUgJiYgZ3NhcC5zZXQoaXNWaWV3cG9ydCA/IFtfYm9keSwgX2RvY0VsXSA6IHNjcm9sbGVyLCB7XG4gICAgICAgIHNjcm9sbEJlaGF2aW9yOiBcImF1dG9cIlxuICAgICAgfSk7IC8vIHNtb290aCBzY3JvbGxpbmcgZG9lc24ndCB3b3JrIHdpdGggc25hcC5cblxuICAgICAgX3Njcm9sbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChvKSB7XG4gICAgICAgIHJldHVybiBfaXNGdW5jdGlvbihvKSAmJiBvLnRhcmdldCA9PT0gKGlzVmlld3BvcnQgPyBfZG9jLnNjcm9sbGluZ0VsZW1lbnQgfHwgX2RvY0VsIDogc2Nyb2xsZXIpICYmIChvLnNtb290aCA9IGZhbHNlKTtcbiAgICAgIH0pOyAvLyBub3RlOiBzZXQgc21vb3RoIHRvIGZhbHNlIG9uIGJvdGggdGhlIHZlcnRpY2FsIGFuZCBob3Jpem9udGFsIHNjcm9sbCBnZXR0ZXJzL3NldHRlcnNcblxuXG4gICAgICBzbmFwRnVuYyA9IF9pc0Z1bmN0aW9uKHNuYXAuc25hcFRvKSA/IHNuYXAuc25hcFRvIDogc25hcC5zbmFwVG8gPT09IFwibGFiZWxzXCIgPyBfZ2V0Q2xvc2VzdExhYmVsKGFuaW1hdGlvbikgOiBzbmFwLnNuYXBUbyA9PT0gXCJsYWJlbHNEaXJlY3Rpb25hbFwiID8gX2dldExhYmVsQXREaXJlY3Rpb24oYW5pbWF0aW9uKSA6IHNuYXAuZGlyZWN0aW9uYWwgIT09IGZhbHNlID8gZnVuY3Rpb24gKHZhbHVlLCBzdCkge1xuICAgICAgICByZXR1cm4gX3NuYXBEaXJlY3Rpb25hbChzbmFwLnNuYXBUbykodmFsdWUsIF9nZXRUaW1lKCkgLSBsYXN0UmVmcmVzaCA8IDUwMCA/IDAgOiBzdC5kaXJlY3Rpb24pO1xuICAgICAgfSA6IGdzYXAudXRpbHMuc25hcChzbmFwLnNuYXBUbyk7XG4gICAgICBzbmFwRHVyQ2xhbXAgPSBzbmFwLmR1cmF0aW9uIHx8IHtcbiAgICAgICAgbWluOiAwLjEsXG4gICAgICAgIG1heDogMlxuICAgICAgfTtcbiAgICAgIHNuYXBEdXJDbGFtcCA9IF9pc09iamVjdChzbmFwRHVyQ2xhbXApID8gX2NsYW1wKHNuYXBEdXJDbGFtcC5taW4sIHNuYXBEdXJDbGFtcC5tYXgpIDogX2NsYW1wKHNuYXBEdXJDbGFtcCwgc25hcER1ckNsYW1wKTtcbiAgICAgIHNuYXBEZWxheWVkQ2FsbCA9IGdzYXAuZGVsYXllZENhbGwoc25hcC5kZWxheSB8fCBzY3J1YlNtb290aCAvIDIgfHwgMC4xLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzY3JvbGwgPSBzY3JvbGxGdW5jKCksXG4gICAgICAgICAgICByZWZyZXNoZWRSZWNlbnRseSA9IF9nZXRUaW1lKCkgLSBsYXN0UmVmcmVzaCA8IDUwMCxcbiAgICAgICAgICAgIHR3ZWVuID0gdHdlZW5Uby50d2VlbjtcblxuICAgICAgICBpZiAoKHJlZnJlc2hlZFJlY2VudGx5IHx8IE1hdGguYWJzKHNlbGYuZ2V0VmVsb2NpdHkoKSkgPCAxMCkgJiYgIXR3ZWVuICYmICFfcG9pbnRlcklzRG93biAmJiBsYXN0U25hcCAhPT0gc2Nyb2xsKSB7XG4gICAgICAgICAgdmFyIHByb2dyZXNzID0gKHNjcm9sbCAtIHN0YXJ0KSAvIGNoYW5nZSxcbiAgICAgICAgICAgICAgdG90YWxQcm9ncmVzcyA9IGFuaW1hdGlvbiAmJiAhaXNUb2dnbGUgPyBhbmltYXRpb24udG90YWxQcm9ncmVzcygpIDogcHJvZ3Jlc3MsXG4gICAgICAgICAgICAgIHZlbG9jaXR5ID0gcmVmcmVzaGVkUmVjZW50bHkgPyAwIDogKHRvdGFsUHJvZ3Jlc3MgLSBzbmFwMikgLyAoX2dldFRpbWUoKSAtIF90aW1lMikgKiAxMDAwIHx8IDAsXG4gICAgICAgICAgICAgIGNoYW5nZTEgPSBnc2FwLnV0aWxzLmNsYW1wKC1wcm9ncmVzcywgMSAtIHByb2dyZXNzLCBfYWJzKHZlbG9jaXR5IC8gMikgKiB2ZWxvY2l0eSAvIDAuMTg1KSxcbiAgICAgICAgICAgICAgbmF0dXJhbEVuZCA9IHByb2dyZXNzICsgKHNuYXAuaW5lcnRpYSA9PT0gZmFsc2UgPyAwIDogY2hhbmdlMSksXG4gICAgICAgICAgICAgIGVuZFZhbHVlID0gX2NsYW1wKDAsIDEsIHNuYXBGdW5jKG5hdHVyYWxFbmQsIHNlbGYpKSxcbiAgICAgICAgICAgICAgZW5kU2Nyb2xsID0gTWF0aC5yb3VuZChzdGFydCArIGVuZFZhbHVlICogY2hhbmdlKSxcbiAgICAgICAgICAgICAgX3NuYXAgPSBzbmFwLFxuICAgICAgICAgICAgICBvblN0YXJ0ID0gX3NuYXAub25TdGFydCxcbiAgICAgICAgICAgICAgX29uSW50ZXJydXB0ID0gX3NuYXAub25JbnRlcnJ1cHQsXG4gICAgICAgICAgICAgIF9vbkNvbXBsZXRlID0gX3NuYXAub25Db21wbGV0ZTtcblxuICAgICAgICAgIGlmIChzY3JvbGwgPD0gZW5kICYmIHNjcm9sbCA+PSBzdGFydCAmJiBlbmRTY3JvbGwgIT09IHNjcm9sbCkge1xuICAgICAgICAgICAgaWYgKHR3ZWVuICYmICF0d2Vlbi5faW5pdHRlZCAmJiB0d2Vlbi5kYXRhIDw9IF9hYnMoZW5kU2Nyb2xsIC0gc2Nyb2xsKSkge1xuICAgICAgICAgICAgICAvLyB0aGVyZSdzIGFuIG92ZXJsYXBwaW5nIHNuYXAhIFNvIHdlIG11c3QgZmlndXJlIG91dCB3aGljaCBvbmUgaXMgY2xvc2VyIGFuZCBsZXQgdGhhdCB0d2VlbiBsaXZlLlxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzbmFwLmluZXJ0aWEgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNoYW5nZTEgPSBlbmRWYWx1ZSAtIHByb2dyZXNzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0d2VlblRvKGVuZFNjcm9sbCwge1xuICAgICAgICAgICAgICBkdXJhdGlvbjogc25hcER1ckNsYW1wKF9hYnMoTWF0aC5tYXgoX2FicyhuYXR1cmFsRW5kIC0gdG90YWxQcm9ncmVzcyksIF9hYnMoZW5kVmFsdWUgLSB0b3RhbFByb2dyZXNzKSkgKiAwLjE4NSAvIHZlbG9jaXR5IC8gMC4wNSB8fCAwKSksXG4gICAgICAgICAgICAgIGVhc2U6IHNuYXAuZWFzZSB8fCBcInBvd2VyM1wiLFxuICAgICAgICAgICAgICBkYXRhOiBfYWJzKGVuZFNjcm9sbCAtIHNjcm9sbCksXG4gICAgICAgICAgICAgIC8vIHJlY29yZCB0aGUgZGlzdGFuY2Ugc28gdGhhdCBpZiBhbm90aGVyIHNuYXAgdHdlZW4gb2NjdXJzIChjb25mbGljdCkgd2UgY2FuIHByaW9yaXRpemUgdGhlIGNsb3Nlc3Qgc25hcC5cbiAgICAgICAgICAgICAgb25JbnRlcnJ1cHQ6IGZ1bmN0aW9uIG9uSW50ZXJydXB0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwRGVsYXllZENhbGwucmVzdGFydCh0cnVlKSAmJiBfb25JbnRlcnJ1cHQgJiYgX29uSW50ZXJydXB0KHNlbGYpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiBvbkNvbXBsZXRlKCkge1xuICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgbGFzdFNuYXAgPSBzY3JvbGxGdW5jKCk7XG4gICAgICAgICAgICAgICAgc25hcDEgPSBzbmFwMiA9IGFuaW1hdGlvbiAmJiAhaXNUb2dnbGUgPyBhbmltYXRpb24udG90YWxQcm9ncmVzcygpIDogc2VsZi5wcm9ncmVzcztcbiAgICAgICAgICAgICAgICBvblNuYXBDb21wbGV0ZSAmJiBvblNuYXBDb21wbGV0ZShzZWxmKTtcbiAgICAgICAgICAgICAgICBfb25Db21wbGV0ZSAmJiBfb25Db21wbGV0ZShzZWxmKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgc2Nyb2xsLCBjaGFuZ2UxICogY2hhbmdlLCBlbmRTY3JvbGwgLSBzY3JvbGwgLSBjaGFuZ2UxICogY2hhbmdlKTtcbiAgICAgICAgICAgIG9uU3RhcnQgJiYgb25TdGFydChzZWxmLCB0d2VlblRvLnR3ZWVuKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZi5pc0FjdGl2ZSAmJiBsYXN0U25hcCAhPT0gc2Nyb2xsKSB7XG4gICAgICAgICAgc25hcERlbGF5ZWRDYWxsLnJlc3RhcnQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgaWQgJiYgKF9pZHNbaWRdID0gc2VsZik7XG4gICAgdHJpZ2dlciA9IHNlbGYudHJpZ2dlciA9IF9nZXRUYXJnZXQodHJpZ2dlciB8fCBwaW4pOyAvLyBpZiBhIHRyaWdnZXIgaGFzIHNvbWUga2luZCBvZiBzY3JvbGwtcmVsYXRlZCBlZmZlY3QgYXBwbGllZCB0aGF0IGNvdWxkIGNvbnRhbWluYXRlIHRoZSBcInlcIiBvciBcInhcIiBwb3NpdGlvbiAobGlrZSBhIFNjcm9sbFNtb290aGVyIGVmZmVjdCksIHdlIG5lZWRlZCBhIHdheSB0byB0ZW1wb3JhcmlseSByZXZlcnQgaXQsIHNvIHdlIHVzZSB0aGUgc3RSZXZlcnQgcHJvcGVydHkgb2YgdGhlIGdzQ2FjaGUuIEl0IGNhbiByZXR1cm4gYW5vdGhlciBmdW5jdGlvbiB0aGF0IHdlJ2xsIGNhbGwgYXQgdGhlIGVuZCBzbyBpdCBjYW4gcmV0dXJuIHRvIGl0cyBub3JtYWwgc3RhdGUuXG5cbiAgICBjdXN0b21SZXZlcnRSZXR1cm4gPSB0cmlnZ2VyICYmIHRyaWdnZXIuX2dzYXAgJiYgdHJpZ2dlci5fZ3NhcC5zdFJldmVydDtcbiAgICBjdXN0b21SZXZlcnRSZXR1cm4gJiYgKGN1c3RvbVJldmVydFJldHVybiA9IGN1c3RvbVJldmVydFJldHVybihzZWxmKSk7XG4gICAgcGluID0gcGluID09PSB0cnVlID8gdHJpZ2dlciA6IF9nZXRUYXJnZXQocGluKTtcbiAgICBfaXNTdHJpbmcodG9nZ2xlQ2xhc3MpICYmICh0b2dnbGVDbGFzcyA9IHtcbiAgICAgIHRhcmdldHM6IHRyaWdnZXIsXG4gICAgICBjbGFzc05hbWU6IHRvZ2dsZUNsYXNzXG4gICAgfSk7XG5cbiAgICBpZiAocGluKSB7XG4gICAgICBwaW5TcGFjaW5nID09PSBmYWxzZSB8fCBwaW5TcGFjaW5nID09PSBfbWFyZ2luIHx8IChwaW5TcGFjaW5nID0gIXBpblNwYWNpbmcgJiYgcGluLnBhcmVudE5vZGUgJiYgcGluLnBhcmVudE5vZGUuc3R5bGUgJiYgX2dldENvbXB1dGVkU3R5bGUocGluLnBhcmVudE5vZGUpLmRpc3BsYXkgPT09IFwiZmxleFwiID8gZmFsc2UgOiBfcGFkZGluZyk7IC8vIGlmIHRoZSBwYXJlbnQgaXMgZGlzcGxheTogZmxleCwgZG9uJ3QgYXBwbHkgcGluU3BhY2luZyBieSBkZWZhdWx0LiBXZSBzaG91bGQgY2hlY2sgdGhhdCBwaW4ucGFyZW50Tm9kZSBpcyBhbiBlbGVtZW50IChub3Qgc2hhZG93IGRvbSB3aW5kb3cpXG5cbiAgICAgIHNlbGYucGluID0gcGluO1xuICAgICAgcGluQ2FjaGUgPSBnc2FwLmNvcmUuZ2V0Q2FjaGUocGluKTtcblxuICAgICAgaWYgKCFwaW5DYWNoZS5zcGFjZXIpIHtcbiAgICAgICAgLy8gcmVjb3JkIHRoZSBzcGFjZXIgYW5kIHBpbk9yaWdpbmFsU3RhdGUgb24gdGhlIGNhY2hlIGluIGNhc2Ugc29tZW9uZSB0cmllcyBwaW5uaW5nIHRoZSBzYW1lIGVsZW1lbnQgd2l0aCBNVUxUSVBMRSBTY3JvbGxUcmlnZ2VycyAtIHdlIGRvbid0IHdhbnQgdG8gaGF2ZSBtdWx0aXBsZSBzcGFjZXJzIG9yIHJlY29yZCB0aGUgXCJvcmlnaW5hbFwiIHBpbiBzdGF0ZSBhZnRlciBpdCBoYXMgYWxyZWFkeSBiZWVuIGFmZmVjdGVkIGJ5IGFub3RoZXIgU2Nyb2xsVHJpZ2dlci5cbiAgICAgICAgaWYgKHBpblNwYWNlcikge1xuICAgICAgICAgIHBpblNwYWNlciA9IF9nZXRUYXJnZXQocGluU3BhY2VyKTtcbiAgICAgICAgICBwaW5TcGFjZXIgJiYgIXBpblNwYWNlci5ub2RlVHlwZSAmJiAocGluU3BhY2VyID0gcGluU3BhY2VyLmN1cnJlbnQgfHwgcGluU3BhY2VyLm5hdGl2ZUVsZW1lbnQpOyAvLyBmb3IgUmVhY3QgJiBBbmd1bGFyXG5cbiAgICAgICAgICBwaW5DYWNoZS5zcGFjZXJJc05hdGl2ZSA9ICEhcGluU3BhY2VyO1xuICAgICAgICAgIHBpblNwYWNlciAmJiAocGluQ2FjaGUuc3BhY2VyU3RhdGUgPSBfZ2V0U3RhdGUocGluU3BhY2VyKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwaW5DYWNoZS5zcGFjZXIgPSBzcGFjZXIgPSBwaW5TcGFjZXIgfHwgX2RvYy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzcGFjZXIuY2xhc3NMaXN0LmFkZChcInBpbi1zcGFjZXJcIik7XG4gICAgICAgIGlkICYmIHNwYWNlci5jbGFzc0xpc3QuYWRkKFwicGluLXNwYWNlci1cIiArIGlkKTtcbiAgICAgICAgcGluQ2FjaGUucGluU3RhdGUgPSBwaW5PcmlnaW5hbFN0YXRlID0gX2dldFN0YXRlKHBpbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwaW5PcmlnaW5hbFN0YXRlID0gcGluQ2FjaGUucGluU3RhdGU7XG4gICAgICB9XG5cbiAgICAgIHZhcnMuZm9yY2UzRCAhPT0gZmFsc2UgJiYgZ3NhcC5zZXQocGluLCB7XG4gICAgICAgIGZvcmNlM0Q6IHRydWVcbiAgICAgIH0pO1xuICAgICAgc2VsZi5zcGFjZXIgPSBzcGFjZXIgPSBwaW5DYWNoZS5zcGFjZXI7XG4gICAgICBjcyA9IF9nZXRDb21wdXRlZFN0eWxlKHBpbik7XG4gICAgICBzcGFjaW5nU3RhcnQgPSBjc1twaW5TcGFjaW5nICsgZGlyZWN0aW9uLm9zMl07XG4gICAgICBwaW5HZXR0ZXIgPSBnc2FwLmdldFByb3BlcnR5KHBpbik7XG4gICAgICBwaW5TZXR0ZXIgPSBnc2FwLnF1aWNrU2V0dGVyKHBpbiwgZGlyZWN0aW9uLmEsIF9weCk7IC8vIHBpbi5maXJzdENoaWxkICYmICFfbWF4U2Nyb2xsKHBpbiwgZGlyZWN0aW9uKSAmJiAocGluLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIik7IC8vIHByb3RlY3RzIGZyb20gY29sbGFwc2luZyBtYXJnaW5zLCBidXQgY2FuIGhhdmUgdW5pbnRlbmRlZCBjb25zZXF1ZW5jZXMgYXMgZGVtb25zdHJhdGVkIGhlcmU6IGh0dHBzOi8vY29kZXBlbi5pby9HcmVlblNvY2svcGVuLzFlNDJjN2E3M2JmYTQwOWQyY2YxZTE4NGU3YTQyNDhkIHNvIGl0IHdhcyByZW1vdmVkIGluIGZhdm9yIG9mIGp1c3QgdGVsbGluZyBwZW9wbGUgdG8gc2V0IHVwIHRoZWlyIENTUyB0byBhdm9pZCB0aGUgY29sbGFwc2luZyBtYXJnaW5zIChvdmVyZmxvdzogaGlkZGVuIHwgYXV0byBpcyBqdXN0IG9uZSBvcHRpb24uIEFub3RoZXIgaXMgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHRyYW5zcGFyZW50KS5cblxuICAgICAgX3N3YXBQaW5JbihwaW4sIHNwYWNlciwgY3MpO1xuXG4gICAgICBwaW5TdGF0ZSA9IF9nZXRTdGF0ZShwaW4pO1xuICAgIH1cblxuICAgIGlmIChtYXJrZXJzKSB7XG4gICAgICBtYXJrZXJWYXJzID0gX2lzT2JqZWN0KG1hcmtlcnMpID8gX3NldERlZmF1bHRzKG1hcmtlcnMsIF9tYXJrZXJEZWZhdWx0cykgOiBfbWFya2VyRGVmYXVsdHM7XG4gICAgICBtYXJrZXJTdGFydFRyaWdnZXIgPSBfY3JlYXRlTWFya2VyKFwic2Nyb2xsZXItc3RhcnRcIiwgaWQsIHNjcm9sbGVyLCBkaXJlY3Rpb24sIG1hcmtlclZhcnMsIDApO1xuICAgICAgbWFya2VyRW5kVHJpZ2dlciA9IF9jcmVhdGVNYXJrZXIoXCJzY3JvbGxlci1lbmRcIiwgaWQsIHNjcm9sbGVyLCBkaXJlY3Rpb24sIG1hcmtlclZhcnMsIDAsIG1hcmtlclN0YXJ0VHJpZ2dlcik7XG4gICAgICBvZmZzZXQgPSBtYXJrZXJTdGFydFRyaWdnZXJbXCJvZmZzZXRcIiArIGRpcmVjdGlvbi5vcC5kMl07XG5cbiAgICAgIHZhciBjb250ZW50ID0gX2dldFRhcmdldChfZ2V0UHJveHlQcm9wKHNjcm9sbGVyLCBcImNvbnRlbnRcIikgfHwgc2Nyb2xsZXIpO1xuXG4gICAgICBtYXJrZXJTdGFydCA9IHRoaXMubWFya2VyU3RhcnQgPSBfY3JlYXRlTWFya2VyKFwic3RhcnRcIiwgaWQsIGNvbnRlbnQsIGRpcmVjdGlvbiwgbWFya2VyVmFycywgb2Zmc2V0LCAwLCBjb250YWluZXJBbmltYXRpb24pO1xuICAgICAgbWFya2VyRW5kID0gdGhpcy5tYXJrZXJFbmQgPSBfY3JlYXRlTWFya2VyKFwiZW5kXCIsIGlkLCBjb250ZW50LCBkaXJlY3Rpb24sIG1hcmtlclZhcnMsIG9mZnNldCwgMCwgY29udGFpbmVyQW5pbWF0aW9uKTtcbiAgICAgIGNvbnRhaW5lckFuaW1hdGlvbiAmJiAoY2FNYXJrZXJTZXR0ZXIgPSBnc2FwLnF1aWNrU2V0dGVyKFttYXJrZXJTdGFydCwgbWFya2VyRW5kXSwgZGlyZWN0aW9uLmEsIF9weCkpO1xuXG4gICAgICBpZiAoIXVzZUZpeGVkUG9zaXRpb24gJiYgIShfcHJveGllcy5sZW5ndGggJiYgX2dldFByb3h5UHJvcChzY3JvbGxlciwgXCJmaXhlZE1hcmtlcnNcIikgPT09IHRydWUpKSB7XG4gICAgICAgIF9tYWtlUG9zaXRpb25hYmxlKGlzVmlld3BvcnQgPyBfYm9keSA6IHNjcm9sbGVyKTtcblxuICAgICAgICBnc2FwLnNldChbbWFya2VyU3RhcnRUcmlnZ2VyLCBtYXJrZXJFbmRUcmlnZ2VyXSwge1xuICAgICAgICAgIGZvcmNlM0Q6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIG1hcmtlclN0YXJ0U2V0dGVyID0gZ3NhcC5xdWlja1NldHRlcihtYXJrZXJTdGFydFRyaWdnZXIsIGRpcmVjdGlvbi5hLCBfcHgpO1xuICAgICAgICBtYXJrZXJFbmRTZXR0ZXIgPSBnc2FwLnF1aWNrU2V0dGVyKG1hcmtlckVuZFRyaWdnZXIsIGRpcmVjdGlvbi5hLCBfcHgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb250YWluZXJBbmltYXRpb24pIHtcbiAgICAgIHZhciBvbGRPblVwZGF0ZSA9IGNvbnRhaW5lckFuaW1hdGlvbi52YXJzLm9uVXBkYXRlLFxuICAgICAgICAgIG9sZFBhcmFtcyA9IGNvbnRhaW5lckFuaW1hdGlvbi52YXJzLm9uVXBkYXRlUGFyYW1zO1xuICAgICAgY29udGFpbmVyQW5pbWF0aW9uLmV2ZW50Q2FsbGJhY2soXCJvblVwZGF0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYudXBkYXRlKDAsIDAsIDEpO1xuICAgICAgICBvbGRPblVwZGF0ZSAmJiBvbGRPblVwZGF0ZS5hcHBseShjb250YWluZXJBbmltYXRpb24sIG9sZFBhcmFtcyB8fCBbXSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxmLnByZXZpb3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90cmlnZ2Vyc1tfdHJpZ2dlcnMuaW5kZXhPZihzZWxmKSAtIDFdO1xuICAgIH07XG5cbiAgICBzZWxmLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RyaWdnZXJzW190cmlnZ2Vycy5pbmRleE9mKHNlbGYpICsgMV07XG4gICAgfTtcblxuICAgIHNlbGYucmV2ZXJ0ID0gZnVuY3Rpb24gKHJldmVydCwgdGVtcCkge1xuICAgICAgaWYgKCF0ZW1wKSB7XG4gICAgICAgIHJldHVybiBzZWxmLmtpbGwodHJ1ZSk7XG4gICAgICB9IC8vIGZvciBjb21wYXRpYmlsaXR5IHdpdGggZ3NhcC5jb250ZXh0KCkgYW5kIGdzYXAubWF0Y2hNZWRpYSgpIHdoaWNoIGNhbGwgcmV2ZXJ0KClcblxuXG4gICAgICB2YXIgciA9IHJldmVydCAhPT0gZmFsc2UgfHwgIXNlbGYuZW5hYmxlZCxcbiAgICAgICAgICBwcmV2UmVmcmVzaGluZyA9IF9yZWZyZXNoaW5nO1xuXG4gICAgICBpZiAociAhPT0gc2VsZi5pc1JldmVydGVkKSB7XG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgLy8gaWYgKCFzZWxmLnNjcm9sbC5yZWMgJiYgKF9yZWZyZXNoaW5nIHx8IF9yZWZyZXNoaW5nQWxsKSkge1xuICAgICAgICAgIC8vIFx0c2VsZi5zY3JvbGwucmVjID0gc2Nyb2xsRnVuYygpO1xuICAgICAgICAgIC8vIFx0X3JlZnJlc2hpbmdBbGwgJiYgc2Nyb2xsRnVuYygwKTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgICAgcHJldlNjcm9sbCA9IE1hdGgubWF4KHNjcm9sbEZ1bmMoKSwgc2VsZi5zY3JvbGwucmVjIHx8IDApOyAvLyByZWNvcmQgdGhlIHNjcm9sbCBzbyB3ZSBjYW4gcmV2ZXJ0IGxhdGVyIChyZXBvc2l0aW9uaW5nL3Bpbm5pbmcgdGhpbmdzIGNhbiBhZmZlY3Qgc2Nyb2xsIHBvc2l0aW9uKS4gSW4gdGhlIHN0YXRpYyByZWZyZXNoKCkgbWV0aG9kLCB3ZSBmaXJzdCByZWNvcmQgYWxsIHRoZSBzY3JvbGwgcG9zaXRpb25zIGFzIGEgcmVmZXJlbmNlLlxuXG4gICAgICAgICAgcHJldlByb2dyZXNzID0gc2VsZi5wcm9ncmVzcztcbiAgICAgICAgICBwcmV2QW5pbVByb2dyZXNzID0gYW5pbWF0aW9uICYmIGFuaW1hdGlvbi5wcm9ncmVzcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgbWFya2VyU3RhcnQgJiYgW21hcmtlclN0YXJ0LCBtYXJrZXJFbmQsIG1hcmtlclN0YXJ0VHJpZ2dlciwgbWFya2VyRW5kVHJpZ2dlcl0uZm9yRWFjaChmdW5jdGlvbiAobSkge1xuICAgICAgICAgIHJldHVybiBtLnN0eWxlLmRpc3BsYXkgPSByID8gXCJub25lXCIgOiBcImJsb2NrXCI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgX3JlZnJlc2hpbmcgPSBzZWxmO1xuICAgICAgICAgIHNlbGYudXBkYXRlKHIpOyAvLyBtYWtlIHN1cmUgdGhlIHBpbiBpcyBiYWNrIGluIGl0cyBvcmlnaW5hbCBwb3NpdGlvbiBzbyB0aGF0IGFsbCB0aGUgbWVhc3VyZW1lbnRzIGFyZSBjb3JyZWN0LiBkbyB0aGlzIEJFRk9SRSBzd2FwcGluZyB0aGUgcGluIG91dFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBpbiAmJiAoIXBpblJlcGFyZW50IHx8ICFzZWxmLmlzQWN0aXZlKSkge1xuICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICBfc3dhcFBpbk91dChwaW4sIHNwYWNlciwgcGluT3JpZ2luYWxTdGF0ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9zd2FwUGluSW4ocGluLCBzcGFjZXIsIF9nZXRDb21wdXRlZFN0eWxlKHBpbiksIHNwYWNlclN0YXRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByIHx8IHNlbGYudXBkYXRlKHIpOyAvLyB3aGVuIHdlJ3JlIHJlc3RvcmluZywgdGhlIHVwZGF0ZSBzaG91bGQgcnVuIEFGVEVSIHN3YXBwaW5nIHRoZSBwaW4gaW50byBpdHMgcGluLXNwYWNlci5cblxuICAgICAgICBfcmVmcmVzaGluZyA9IHByZXZSZWZyZXNoaW5nOyAvLyByZXN0b3JlLiBXZSBzZXQgaXQgdG8gdHJ1ZSBkdXJpbmcgdGhlIHVwZGF0ZSgpIHNvIHRoYXQgdGhpbmdzIGZpcmUgcHJvcGVybHkgaW4gdGhlcmUuXG5cbiAgICAgICAgc2VsZi5pc1JldmVydGVkID0gcjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi5yZWZyZXNoID0gZnVuY3Rpb24gKHNvZnQsIGZvcmNlKSB7XG4gICAgICBpZiAoKF9yZWZyZXNoaW5nIHx8ICFzZWxmLmVuYWJsZWQpICYmICFmb3JjZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChwaW4gJiYgc29mdCAmJiBfbGFzdFNjcm9sbFRpbWUpIHtcbiAgICAgICAgX2FkZExpc3RlbmVyKFNjcm9sbFRyaWdnZXIsIFwic2Nyb2xsRW5kXCIsIF9zb2Z0UmVmcmVzaCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAhX3JlZnJlc2hpbmdBbGwgJiYgb25SZWZyZXNoSW5pdCAmJiBvblJlZnJlc2hJbml0KHNlbGYpO1xuICAgICAgX3JlZnJlc2hpbmcgPSBzZWxmO1xuICAgICAgbGFzdFJlZnJlc2ggPSBfZ2V0VGltZSgpO1xuXG4gICAgICBpZiAodHdlZW5Uby50d2Vlbikge1xuICAgICAgICB0d2VlblRvLnR3ZWVuLmtpbGwoKTtcbiAgICAgICAgdHdlZW5Uby50d2VlbiA9IDA7XG4gICAgICB9XG5cbiAgICAgIHNjcnViVHdlZW4gJiYgc2NydWJUd2Vlbi5wYXVzZSgpO1xuICAgICAgaW52YWxpZGF0ZU9uUmVmcmVzaCAmJiBhbmltYXRpb24gJiYgYW5pbWF0aW9uLnJldmVydCh7XG4gICAgICAgIGtpbGw6IGZhbHNlXG4gICAgICB9KS5pbnZhbGlkYXRlKCk7XG4gICAgICBzZWxmLmlzUmV2ZXJ0ZWQgfHwgc2VsZi5yZXZlcnQodHJ1ZSwgdHJ1ZSk7XG4gICAgICBzZWxmLl9zdWJQaW5PZmZzZXQgPSBmYWxzZTsgLy8gd2UnbGwgc2V0IHRoaXMgdG8gdHJ1ZSBpbiB0aGUgc3ViLXBpbnMgaWYgd2UgZmluZCBhbnlcblxuICAgICAgdmFyIHNpemUgPSBnZXRTY3JvbGxlclNpemUoKSxcbiAgICAgICAgICBzY3JvbGxlckJvdW5kcyA9IGdldFNjcm9sbGVyT2Zmc2V0cygpLFxuICAgICAgICAgIG1heCA9IGNvbnRhaW5lckFuaW1hdGlvbiA/IGNvbnRhaW5lckFuaW1hdGlvbi5kdXJhdGlvbigpIDogX21heFNjcm9sbChzY3JvbGxlciwgZGlyZWN0aW9uKSxcbiAgICAgICAgICBpc0ZpcnN0UmVmcmVzaCA9IGNoYW5nZSA8PSAwLjAxLFxuICAgICAgICAgIG9mZnNldCA9IDAsXG4gICAgICAgICAgb3RoZXJQaW5PZmZzZXQgPSAwLFxuICAgICAgICAgIHBhcnNlZEVuZCA9IHZhcnMuZW5kLFxuICAgICAgICAgIHBhcnNlZEVuZFRyaWdnZXIgPSB2YXJzLmVuZFRyaWdnZXIgfHwgdHJpZ2dlcixcbiAgICAgICAgICBwYXJzZWRTdGFydCA9IHZhcnMuc3RhcnQgfHwgKHZhcnMuc3RhcnQgPT09IDAgfHwgIXRyaWdnZXIgPyAwIDogcGluID8gXCIwIDBcIiA6IFwiMCAxMDAlXCIpLFxuICAgICAgICAgIHBpbm5lZENvbnRhaW5lciA9IHNlbGYucGlubmVkQ29udGFpbmVyID0gdmFycy5waW5uZWRDb250YWluZXIgJiYgX2dldFRhcmdldCh2YXJzLnBpbm5lZENvbnRhaW5lciksXG4gICAgICAgICAgdHJpZ2dlckluZGV4ID0gdHJpZ2dlciAmJiBNYXRoLm1heCgwLCBfdHJpZ2dlcnMuaW5kZXhPZihzZWxmKSkgfHwgMCxcbiAgICAgICAgICBpID0gdHJpZ2dlckluZGV4LFxuICAgICAgICAgIGNzLFxuICAgICAgICAgIGJvdW5kcyxcbiAgICAgICAgICBzY3JvbGwsXG4gICAgICAgICAgaXNWZXJ0aWNhbCxcbiAgICAgICAgICBvdmVycmlkZSxcbiAgICAgICAgICBjdXJUcmlnZ2VyLFxuICAgICAgICAgIGN1clBpbixcbiAgICAgICAgICBvcHBvc2l0ZVNjcm9sbCxcbiAgICAgICAgICBpbml0dGVkLFxuICAgICAgICAgIHJldmVydGVkUGlucyxcbiAgICAgICAgICBmb3JjZWRPdmVyZmxvdztcblxuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAvLyB1c2VyIG1pZ2h0IHRyeSB0byBwaW4gdGhlIHNhbWUgZWxlbWVudCBtb3JlIHRoYW4gb25jZSwgc28gd2UgbXVzdCBmaW5kIGFueSBwcmlvciB0cmlnZ2VycyB3aXRoIHRoZSBzYW1lIHBpbiwgcmV2ZXJ0IHRoZW0sIGFuZCBkZXRlcm1pbmUgaG93IGxvbmcgdGhleSdyZSBwaW5uaW5nIHNvIHRoYXQgd2UgY2FuIG9mZnNldCB0aGluZ3MgYXBwcm9wcmlhdGVseS4gTWFrZSBzdXJlIHdlIHJldmVydCBmcm9tIGxhc3QgdG8gZmlyc3Qgc28gdGhhdCB0aGluZ3MgXCJyZXdpbmRcIiBwcm9wZXJseS5cbiAgICAgICAgY3VyVHJpZ2dlciA9IF90cmlnZ2Vyc1tpXTtcbiAgICAgICAgY3VyVHJpZ2dlci5lbmQgfHwgY3VyVHJpZ2dlci5yZWZyZXNoKDAsIDEpIHx8IChfcmVmcmVzaGluZyA9IHNlbGYpOyAvLyBpZiBpdCdzIGEgdGltZWxpbmUtYmFzZWQgdHJpZ2dlciB0aGF0IGhhc24ndCBiZWVuIGZ1bGx5IGluaXRpYWxpemVkIHlldCBiZWNhdXNlIGl0J3Mgd2FpdGluZyBmb3IgMSB0aWNrLCBqdXN0IGZvcmNlIHRoZSByZWZyZXNoKCkgaGVyZSwgb3RoZXJ3aXNlIGlmIGl0IGNvbnRhaW5zIGEgcGluIHRoYXQncyBzdXBwb3NlZCB0byBhZmZlY3Qgb3RoZXIgU2Nyb2xsVHJpZ2dlcnMgZnVydGhlciBkb3duIHRoZSBwYWdlLCB0aGV5IHdvbid0IGJlIGFkanVzdGVkIHByb3Blcmx5LlxuXG4gICAgICAgIGN1clBpbiA9IGN1clRyaWdnZXIucGluO1xuXG4gICAgICAgIGlmIChjdXJQaW4gJiYgKGN1clBpbiA9PT0gdHJpZ2dlciB8fCBjdXJQaW4gPT09IHBpbiB8fCBjdXJQaW4gPT09IHBpbm5lZENvbnRhaW5lcikgJiYgIWN1clRyaWdnZXIuaXNSZXZlcnRlZCkge1xuICAgICAgICAgIHJldmVydGVkUGlucyB8fCAocmV2ZXJ0ZWRQaW5zID0gW10pO1xuICAgICAgICAgIHJldmVydGVkUGlucy51bnNoaWZ0KGN1clRyaWdnZXIpOyAvLyB3ZSdsbCByZXZlcnQgZnJvbSBmaXJzdCB0byBsYXN0IHRvIG1ha2Ugc3VyZSB0aGluZ3MgcmVhY2ggdGhlaXIgZW5kIHN0YXRlIHByb3Blcmx5XG5cbiAgICAgICAgICBjdXJUcmlnZ2VyLnJldmVydCh0cnVlLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJUcmlnZ2VyICE9PSBfdHJpZ2dlcnNbaV0pIHtcbiAgICAgICAgICAvLyBpbiBjYXNlIGl0IGdvdCByZW1vdmVkLlxuICAgICAgICAgIHRyaWdnZXJJbmRleC0tO1xuICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfaXNGdW5jdGlvbihwYXJzZWRTdGFydCkgJiYgKHBhcnNlZFN0YXJ0ID0gcGFyc2VkU3RhcnQoc2VsZikpO1xuICAgICAgc3RhcnQgPSBfcGFyc2VQb3NpdGlvbihwYXJzZWRTdGFydCwgdHJpZ2dlciwgc2l6ZSwgZGlyZWN0aW9uLCBzY3JvbGxGdW5jKCksIG1hcmtlclN0YXJ0LCBtYXJrZXJTdGFydFRyaWdnZXIsIHNlbGYsIHNjcm9sbGVyQm91bmRzLCBib3JkZXJXaWR0aCwgdXNlRml4ZWRQb3NpdGlvbiwgbWF4LCBjb250YWluZXJBbmltYXRpb24pIHx8IChwaW4gPyAtMC4wMDEgOiAwKTtcbiAgICAgIF9pc0Z1bmN0aW9uKHBhcnNlZEVuZCkgJiYgKHBhcnNlZEVuZCA9IHBhcnNlZEVuZChzZWxmKSk7XG5cbiAgICAgIGlmIChfaXNTdHJpbmcocGFyc2VkRW5kKSAmJiAhcGFyc2VkRW5kLmluZGV4T2YoXCIrPVwiKSkge1xuICAgICAgICBpZiAofnBhcnNlZEVuZC5pbmRleE9mKFwiIFwiKSkge1xuICAgICAgICAgIHBhcnNlZEVuZCA9IChfaXNTdHJpbmcocGFyc2VkU3RhcnQpID8gcGFyc2VkU3RhcnQuc3BsaXQoXCIgXCIpWzBdIDogXCJcIikgKyBwYXJzZWRFbmQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2Zmc2V0ID0gX29mZnNldFRvUHgocGFyc2VkRW5kLnN1YnN0cigyKSwgc2l6ZSk7XG4gICAgICAgICAgcGFyc2VkRW5kID0gX2lzU3RyaW5nKHBhcnNlZFN0YXJ0KSA/IHBhcnNlZFN0YXJ0IDogKGNvbnRhaW5lckFuaW1hdGlvbiA/IGdzYXAudXRpbHMubWFwUmFuZ2UoMCwgY29udGFpbmVyQW5pbWF0aW9uLmR1cmF0aW9uKCksIGNvbnRhaW5lckFuaW1hdGlvbi5zY3JvbGxUcmlnZ2VyLnN0YXJ0LCBjb250YWluZXJBbmltYXRpb24uc2Nyb2xsVHJpZ2dlci5lbmQsIHN0YXJ0KSA6IHN0YXJ0KSArIG9mZnNldDsgLy8gX3BhcnNlUG9zaXRpb24gd29uJ3QgZmFjdG9yIGluIHRoZSBvZmZzZXQgaWYgdGhlIHN0YXJ0IGlzIGEgbnVtYmVyLCBzbyBkbyBpdCBoZXJlLlxuXG4gICAgICAgICAgcGFyc2VkRW5kVHJpZ2dlciA9IHRyaWdnZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZW5kID0gTWF0aC5tYXgoc3RhcnQsIF9wYXJzZVBvc2l0aW9uKHBhcnNlZEVuZCB8fCAocGFyc2VkRW5kVHJpZ2dlciA/IFwiMTAwJSAwXCIgOiBtYXgpLCBwYXJzZWRFbmRUcmlnZ2VyLCBzaXplLCBkaXJlY3Rpb24sIHNjcm9sbEZ1bmMoKSArIG9mZnNldCwgbWFya2VyRW5kLCBtYXJrZXJFbmRUcmlnZ2VyLCBzZWxmLCBzY3JvbGxlckJvdW5kcywgYm9yZGVyV2lkdGgsIHVzZUZpeGVkUG9zaXRpb24sIG1heCwgY29udGFpbmVyQW5pbWF0aW9uKSkgfHwgLTAuMDAxO1xuICAgICAgY2hhbmdlID0gZW5kIC0gc3RhcnQgfHwgKHN0YXJ0IC09IDAuMDEpICYmIDAuMDAxO1xuICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgIGkgPSB0cmlnZ2VySW5kZXg7XG5cbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY3VyVHJpZ2dlciA9IF90cmlnZ2Vyc1tpXTtcbiAgICAgICAgY3VyUGluID0gY3VyVHJpZ2dlci5waW47XG5cbiAgICAgICAgaWYgKGN1clBpbiAmJiBjdXJUcmlnZ2VyLnN0YXJ0IC0gY3VyVHJpZ2dlci5fcGluUHVzaCA8PSBzdGFydCAmJiAhY29udGFpbmVyQW5pbWF0aW9uICYmIGN1clRyaWdnZXIuZW5kID4gMCkge1xuICAgICAgICAgIGNzID0gY3VyVHJpZ2dlci5lbmQgLSBjdXJUcmlnZ2VyLnN0YXJ0O1xuXG4gICAgICAgICAgaWYgKChjdXJQaW4gPT09IHRyaWdnZXIgJiYgY3VyVHJpZ2dlci5zdGFydCAtIGN1clRyaWdnZXIuX3BpblB1c2ggPCBzdGFydCB8fCBjdXJQaW4gPT09IHBpbm5lZENvbnRhaW5lcikgJiYgIV9pc051bWJlcihwYXJzZWRTdGFydCkpIHtcbiAgICAgICAgICAgIC8vIG51bWVyaWMgc3RhcnQgdmFsdWVzIHNob3VsZG4ndCBiZSBvZmZzZXQgYXQgYWxsIC0gdHJlYXQgdGhlbSBhcyBhYnNvbHV0ZVxuICAgICAgICAgICAgb2Zmc2V0ICs9IGNzICogKDEgLSBjdXJUcmlnZ2VyLnByb2dyZXNzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdXJQaW4gPT09IHBpbiAmJiAob3RoZXJQaW5PZmZzZXQgKz0gY3MpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN0YXJ0ICs9IG9mZnNldDtcbiAgICAgIGVuZCArPSBvZmZzZXQ7XG5cbiAgICAgIGlmIChpc0ZpcnN0UmVmcmVzaCkge1xuICAgICAgICAvLyBvbiB0aGUgdmVyeSBmaXJzdCByZWZyZXNoKCksIHRoZSBwcmV2UHJvZ3Jlc3MgY291bGRuJ3QgaGF2ZSBiZWVuIGFjY3VyYXRlIHlldCBiZWNhdXNlIHRoZSBzdGFydC9lbmQgd2VyZSBuZXZlciBjYWxjdWxhdGVkLCBzbyB3ZSBzZXQgaXQgaGVyZS4gQmVmb3JlIDMuMTEuNSwgaXQgY291bGQgbGVhZCB0byBhbiBpbmFjY3VyYXRlIHNjcm9sbCBwb3NpdGlvbiByZXN0b3JhdGlvbiB3aXRoIHNuYXBwaW5nLlxuICAgICAgICBwcmV2UHJvZ3Jlc3MgPSBnc2FwLnV0aWxzLmNsYW1wKDAsIDEsIGdzYXAudXRpbHMubm9ybWFsaXplKHN0YXJ0LCBlbmQsIHByZXZTY3JvbGwpKTtcbiAgICAgIH1cblxuICAgICAgc2VsZi5fcGluUHVzaCA9IG90aGVyUGluT2Zmc2V0O1xuXG4gICAgICBpZiAobWFya2VyU3RhcnQgJiYgb2Zmc2V0KSB7XG4gICAgICAgIC8vIG9mZnNldCB0aGUgbWFya2VycyBpZiBuZWNlc3NhcnlcbiAgICAgICAgY3MgPSB7fTtcbiAgICAgICAgY3NbZGlyZWN0aW9uLmFdID0gXCIrPVwiICsgb2Zmc2V0O1xuICAgICAgICBwaW5uZWRDb250YWluZXIgJiYgKGNzW2RpcmVjdGlvbi5wXSA9IFwiLT1cIiArIHNjcm9sbEZ1bmMoKSk7XG4gICAgICAgIGdzYXAuc2V0KFttYXJrZXJTdGFydCwgbWFya2VyRW5kXSwgY3MpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGluKSB7XG4gICAgICAgIGNzID0gX2dldENvbXB1dGVkU3R5bGUocGluKTtcbiAgICAgICAgaXNWZXJ0aWNhbCA9IGRpcmVjdGlvbiA9PT0gX3ZlcnRpY2FsO1xuICAgICAgICBzY3JvbGwgPSBzY3JvbGxGdW5jKCk7IC8vIHJlY2FsY3VsYXRlIGJlY2F1c2UgdGhlIHRyaWdnZXJzIGNhbiBhZmZlY3QgdGhlIHNjcm9sbFxuXG4gICAgICAgIHBpblN0YXJ0ID0gcGFyc2VGbG9hdChwaW5HZXR0ZXIoZGlyZWN0aW9uLmEpKSArIG90aGVyUGluT2Zmc2V0O1xuXG4gICAgICAgIGlmICghbWF4ICYmIGVuZCA+IDEpIHtcbiAgICAgICAgICAvLyBtYWtlcyBzdXJlIHRoZSBzY3JvbGxlciBoYXMgYSBzY3JvbGxiYXIsIG90aGVyd2lzZSBpZiBzb21ldGhpbmcgaGFzIHdpZHRoOiAxMDAlLCBmb3IgZXhhbXBsZSwgaXQgd291bGQgYmUgdG9vIGJpZyAoZXhjbHVkZSB0aGUgc2Nyb2xsYmFyKS4gU2VlIGh0dHBzOi8vZ3JlZW5zb2NrLmNvbS9mb3J1bXMvdG9waWMvMjUxODItc2Nyb2xsdHJpZ2dlci13aWR0aC1vZi1wYWdlLWluY3JlYXNlLXdoZXJlLW1hcmtlcnMtYXJlLXNldC10by1mYWxzZS9cbiAgICAgICAgICBmb3JjZWRPdmVyZmxvdyA9IChpc1ZpZXdwb3J0ID8gX2RvYy5zY3JvbGxpbmdFbGVtZW50IHx8IF9kb2NFbCA6IHNjcm9sbGVyKS5zdHlsZTtcbiAgICAgICAgICBmb3JjZWRPdmVyZmxvdyA9IHtcbiAgICAgICAgICAgIHN0eWxlOiBmb3JjZWRPdmVyZmxvdyxcbiAgICAgICAgICAgIHZhbHVlOiBmb3JjZWRPdmVyZmxvd1tcIm92ZXJmbG93XCIgKyBkaXJlY3Rpb24uYS50b1VwcGVyQ2FzZSgpXVxuICAgICAgICAgIH07XG4gICAgICAgICAgZm9yY2VkT3ZlcmZsb3cuc3R5bGVbXCJvdmVyZmxvd1wiICsgZGlyZWN0aW9uLmEudG9VcHBlckNhc2UoKV0gPSBcInNjcm9sbFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgX3N3YXBQaW5JbihwaW4sIHNwYWNlciwgY3MpO1xuXG4gICAgICAgIHBpblN0YXRlID0gX2dldFN0YXRlKHBpbik7IC8vIHRyYW5zZm9ybXMgd2lsbCBpbnRlcmZlcmUgd2l0aCB0aGUgdG9wL2xlZnQvcmlnaHQvYm90dG9tIHBsYWNlbWVudCwgc28gcmVtb3ZlIHRoZW0gdGVtcG9yYXJpbHkuIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIGZhY3RvcnMgaW4gdHJhbnNmb3Jtcy5cblxuICAgICAgICBib3VuZHMgPSBfZ2V0Qm91bmRzKHBpbiwgdHJ1ZSk7XG4gICAgICAgIG9wcG9zaXRlU2Nyb2xsID0gdXNlRml4ZWRQb3NpdGlvbiAmJiBfZ2V0U2Nyb2xsRnVuYyhzY3JvbGxlciwgaXNWZXJ0aWNhbCA/IF9ob3Jpem9udGFsIDogX3ZlcnRpY2FsKSgpO1xuXG4gICAgICAgIGlmIChwaW5TcGFjaW5nKSB7XG4gICAgICAgICAgc3BhY2VyU3RhdGUgPSBbcGluU3BhY2luZyArIGRpcmVjdGlvbi5vczIsIGNoYW5nZSArIG90aGVyUGluT2Zmc2V0ICsgX3B4XTtcbiAgICAgICAgICBzcGFjZXJTdGF0ZS50ID0gc3BhY2VyO1xuICAgICAgICAgIGkgPSBwaW5TcGFjaW5nID09PSBfcGFkZGluZyA/IF9nZXRTaXplKHBpbiwgZGlyZWN0aW9uKSArIGNoYW5nZSArIG90aGVyUGluT2Zmc2V0IDogMDtcbiAgICAgICAgICBpICYmIHNwYWNlclN0YXRlLnB1c2goZGlyZWN0aW9uLmQsIGkgKyBfcHgpOyAvLyBmb3IgYm94LXNpemluZzogYm9yZGVyLWJveCAobXVzdCBpbmNsdWRlIHBhZGRpbmcpLlxuXG4gICAgICAgICAgX3NldFN0YXRlKHNwYWNlclN0YXRlKTtcblxuICAgICAgICAgIGlmIChwaW5uZWRDb250YWluZXIpIHtcbiAgICAgICAgICAgIC8vIGluIFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpLCB3ZSBuZWVkIHRvIHJlLWV2YWx1YXRlIHRoZSBwaW5Db250YWluZXIncyBzaXplIGJlY2F1c2UgdGhpcyBwaW5TcGFjaW5nIG1heSBzdHJldGNoIGl0IG91dCwgYnV0IHdlIGNhbid0IGp1c3QgYWRkIHRoZSBleGFjdCBkaXN0YW5jZSBiZWNhdXNlIGRlcGVuZGluZyBvbiBsYXlvdXQsIGl0IG1heSBub3QgcHVzaCB0aGluZ3MgZG93biBvciBpdCBtYXkgb25seSBkbyBzbyBwYXJ0aWFsbHkuXG4gICAgICAgICAgICBfdHJpZ2dlcnMuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICBpZiAodC5waW4gPT09IHBpbm5lZENvbnRhaW5lciAmJiB0LnZhcnMucGluU3BhY2luZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0Ll9zdWJQaW5PZmZzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB1c2VGaXhlZFBvc2l0aW9uICYmIHNjcm9sbEZ1bmMocHJldlNjcm9sbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXNlRml4ZWRQb3NpdGlvbikge1xuICAgICAgICAgIG92ZXJyaWRlID0ge1xuICAgICAgICAgICAgdG9wOiBib3VuZHMudG9wICsgKGlzVmVydGljYWwgPyBzY3JvbGwgLSBzdGFydCA6IG9wcG9zaXRlU2Nyb2xsKSArIF9weCxcbiAgICAgICAgICAgIGxlZnQ6IGJvdW5kcy5sZWZ0ICsgKGlzVmVydGljYWwgPyBvcHBvc2l0ZVNjcm9sbCA6IHNjcm9sbCAtIHN0YXJ0KSArIF9weCxcbiAgICAgICAgICAgIGJveFNpemluZzogXCJib3JkZXItYm94XCIsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiXG4gICAgICAgICAgfTtcbiAgICAgICAgICBvdmVycmlkZVtfd2lkdGhdID0gb3ZlcnJpZGVbXCJtYXhcIiArIF9XaWR0aF0gPSBNYXRoLmNlaWwoYm91bmRzLndpZHRoKSArIF9weDtcbiAgICAgICAgICBvdmVycmlkZVtfaGVpZ2h0XSA9IG92ZXJyaWRlW1wibWF4XCIgKyBfSGVpZ2h0XSA9IE1hdGguY2VpbChib3VuZHMuaGVpZ2h0KSArIF9weDtcbiAgICAgICAgICBvdmVycmlkZVtfbWFyZ2luXSA9IG92ZXJyaWRlW19tYXJnaW4gKyBfVG9wXSA9IG92ZXJyaWRlW19tYXJnaW4gKyBfUmlnaHRdID0gb3ZlcnJpZGVbX21hcmdpbiArIF9Cb3R0b21dID0gb3ZlcnJpZGVbX21hcmdpbiArIF9MZWZ0XSA9IFwiMFwiO1xuICAgICAgICAgIG92ZXJyaWRlW19wYWRkaW5nXSA9IGNzW19wYWRkaW5nXTtcbiAgICAgICAgICBvdmVycmlkZVtfcGFkZGluZyArIF9Ub3BdID0gY3NbX3BhZGRpbmcgKyBfVG9wXTtcbiAgICAgICAgICBvdmVycmlkZVtfcGFkZGluZyArIF9SaWdodF0gPSBjc1tfcGFkZGluZyArIF9SaWdodF07XG4gICAgICAgICAgb3ZlcnJpZGVbX3BhZGRpbmcgKyBfQm90dG9tXSA9IGNzW19wYWRkaW5nICsgX0JvdHRvbV07XG4gICAgICAgICAgb3ZlcnJpZGVbX3BhZGRpbmcgKyBfTGVmdF0gPSBjc1tfcGFkZGluZyArIF9MZWZ0XTtcbiAgICAgICAgICBwaW5BY3RpdmVTdGF0ZSA9IF9jb3B5U3RhdGUocGluT3JpZ2luYWxTdGF0ZSwgb3ZlcnJpZGUsIHBpblJlcGFyZW50KTtcbiAgICAgICAgICBfcmVmcmVzaGluZ0FsbCAmJiBzY3JvbGxGdW5jKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFuaW1hdGlvbikge1xuICAgICAgICAgIC8vIHRoZSBhbmltYXRpb24gbWlnaHQgYmUgYWZmZWN0aW5nIHRoZSB0cmFuc2Zvcm0sIHNvIHdlIG11c3QganVtcCB0byB0aGUgZW5kLCBjaGVjayB0aGUgdmFsdWUsIGFuZCBjb21wZW5zYXRlIGFjY29yZGluZ2x5LiBPdGhlcndpc2UsIHdoZW4gaXQgYmVjb21lcyB1bnBpbm5lZCwgdGhlIHBpblNldHRlcigpIHdpbGwgZ2V0IHNldCB0byBhIHZhbHVlIHRoYXQgZG9lc24ndCBpbmNsdWRlIHdoYXRldmVyIHRoZSBhbmltYXRpb24gZGlkLlxuICAgICAgICAgIGluaXR0ZWQgPSBhbmltYXRpb24uX2luaXR0ZWQ7IC8vIGlmIG5vdCwgd2UgbXVzdCBpbnZhbGlkYXRlKCkgYWZ0ZXIgdGhpcyBzdGVwLCBvdGhlcndpc2UgaXQgY291bGQgbG9jayBpbiBzdGFydGluZyB2YWx1ZXMgcHJlbWF0dXJlbHkuXG5cbiAgICAgICAgICBfc3VwcHJlc3NPdmVyd3JpdGVzKDEpO1xuXG4gICAgICAgICAgYW5pbWF0aW9uLnJlbmRlcihhbmltYXRpb24uZHVyYXRpb24oKSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgcGluQ2hhbmdlID0gcGluR2V0dGVyKGRpcmVjdGlvbi5hKSAtIHBpblN0YXJ0ICsgY2hhbmdlICsgb3RoZXJQaW5PZmZzZXQ7XG4gICAgICAgICAgcGluTW92ZXMgPSBNYXRoLmFicyhjaGFuZ2UgLSBwaW5DaGFuZ2UpID4gMTtcbiAgICAgICAgICB1c2VGaXhlZFBvc2l0aW9uICYmIHBpbk1vdmVzICYmIHBpbkFjdGl2ZVN0YXRlLnNwbGljZShwaW5BY3RpdmVTdGF0ZS5sZW5ndGggLSAyLCAyKTsgLy8gdHJhbnNmb3JtIGlzIHRoZSBsYXN0IHByb3BlcnR5L3ZhbHVlIHNldCBpbiB0aGUgc3RhdGUgQXJyYXkuIFNpbmNlIHRoZSBhbmltYXRpb24gaXMgY29udHJvbGxpbmcgdGhhdCwgd2Ugc2hvdWxkIG9taXQgaXQuXG5cbiAgICAgICAgICBhbmltYXRpb24ucmVuZGVyKDAsIHRydWUsIHRydWUpO1xuICAgICAgICAgIGluaXR0ZWQgfHwgYW5pbWF0aW9uLmludmFsaWRhdGUodHJ1ZSk7XG4gICAgICAgICAgYW5pbWF0aW9uLnBhcmVudCB8fCBhbmltYXRpb24udG90YWxUaW1lKGFuaW1hdGlvbi50b3RhbFRpbWUoKSk7IC8vIGlmLCBmb3IgZXhhbXBsZSwgYSB0b2dnbGVBY3Rpb24gY2FsbGVkIHBsYXkoKSBhbmQgdGhlbiByZWZyZXNoKCkgaGFwcGVucyBhbmQgd2hlbiB3ZSByZW5kZXIoMSkgYWJvdmUsIGl0IHdvdWxkIGNhdXNlIHRoZSBhbmltYXRpb24gdG8gY29tcGxldGUgYW5kIGdldCByZW1vdmVkIGZyb20gaXRzIHBhcmVudCwgc28gdGhpcyBtYWtlcyBzdXJlIGl0IGdldHMgcHV0IGJhY2sgaW4uXG5cbiAgICAgICAgICBfc3VwcHJlc3NPdmVyd3JpdGVzKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBpbkNoYW5nZSA9IGNoYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcmNlZE92ZXJmbG93ICYmIChmb3JjZWRPdmVyZmxvdy52YWx1ZSA/IGZvcmNlZE92ZXJmbG93LnN0eWxlW1wib3ZlcmZsb3dcIiArIGRpcmVjdGlvbi5hLnRvVXBwZXJDYXNlKCldID0gZm9yY2VkT3ZlcmZsb3cudmFsdWUgOiBmb3JjZWRPdmVyZmxvdy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIm92ZXJmbG93LVwiICsgZGlyZWN0aW9uLmEpKTtcbiAgICAgIH0gZWxzZSBpZiAodHJpZ2dlciAmJiBzY3JvbGxGdW5jKCkgJiYgIWNvbnRhaW5lckFuaW1hdGlvbikge1xuICAgICAgICAvLyBpdCBtYXkgYmUgSU5TSURFIGEgcGlubmVkIGVsZW1lbnQsIHNvIHdhbGsgdXAgdGhlIHRyZWUgYW5kIGxvb2sgZm9yIGFueSBlbGVtZW50cyB3aXRoIF9waW5PZmZzZXQgdG8gY29tcGVuc2F0ZSBiZWNhdXNlIGFueXRoaW5nIHdpdGggcGluU3BhY2luZyB0aGF0J3MgYWxyZWFkeSBzY3JvbGxlZCB3b3VsZCB0aHJvdyBvZmYgdGhlIG1lYXN1cmVtZW50cyBpbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBib3VuZHMgPSB0cmlnZ2VyLnBhcmVudE5vZGU7XG5cbiAgICAgICAgd2hpbGUgKGJvdW5kcyAmJiBib3VuZHMgIT09IF9ib2R5KSB7XG4gICAgICAgICAgaWYgKGJvdW5kcy5fcGluT2Zmc2V0KSB7XG4gICAgICAgICAgICBzdGFydCAtPSBib3VuZHMuX3Bpbk9mZnNldDtcbiAgICAgICAgICAgIGVuZCAtPSBib3VuZHMuX3Bpbk9mZnNldDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBib3VuZHMgPSBib3VuZHMucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXZlcnRlZFBpbnMgJiYgcmV2ZXJ0ZWRQaW5zLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQucmV2ZXJ0KGZhbHNlLCB0cnVlKTtcbiAgICAgIH0pO1xuICAgICAgc2VsZi5zdGFydCA9IHN0YXJ0O1xuICAgICAgc2VsZi5lbmQgPSBlbmQ7XG4gICAgICBzY3JvbGwxID0gc2Nyb2xsMiA9IF9yZWZyZXNoaW5nQWxsID8gcHJldlNjcm9sbCA6IHNjcm9sbEZ1bmMoKTsgLy8gcmVzZXQgdmVsb2NpdHlcblxuICAgICAgaWYgKCFjb250YWluZXJBbmltYXRpb24gJiYgIV9yZWZyZXNoaW5nQWxsKSB7XG4gICAgICAgIHNjcm9sbDEgPCBwcmV2U2Nyb2xsICYmIHNjcm9sbEZ1bmMocHJldlNjcm9sbCk7XG4gICAgICAgIHNlbGYuc2Nyb2xsLnJlYyA9IDA7XG4gICAgICB9XG5cbiAgICAgIHNlbGYucmV2ZXJ0KGZhbHNlLCB0cnVlKTtcblxuICAgICAgaWYgKHNuYXBEZWxheWVkQ2FsbCkge1xuICAgICAgICBsYXN0U25hcCA9IC0xO1xuICAgICAgICBzZWxmLmlzQWN0aXZlICYmIHNjcm9sbEZ1bmMoc3RhcnQgKyBjaGFuZ2UgKiBwcmV2UHJvZ3Jlc3MpOyAvLyBqdXN0IHNvIHNuYXBwaW5nIGdldHMgcmUtZW5hYmxlZCwgY2xlYXIgb3V0IGFueSByZWNvcmRlZCBsYXN0IHZhbHVlXG5cbiAgICAgICAgc25hcERlbGF5ZWRDYWxsLnJlc3RhcnQodHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIF9yZWZyZXNoaW5nID0gMDtcbiAgICAgIGFuaW1hdGlvbiAmJiBpc1RvZ2dsZSAmJiAoYW5pbWF0aW9uLl9pbml0dGVkIHx8IHByZXZBbmltUHJvZ3Jlc3MpICYmIGFuaW1hdGlvbi5wcm9ncmVzcygpICE9PSBwcmV2QW5pbVByb2dyZXNzICYmIGFuaW1hdGlvbi5wcm9ncmVzcyhwcmV2QW5pbVByb2dyZXNzLCB0cnVlKS5yZW5kZXIoYW5pbWF0aW9uLnRpbWUoKSwgdHJ1ZSwgdHJ1ZSk7IC8vIG11c3QgZm9yY2UgYSByZS1yZW5kZXIgYmVjYXVzZSBpZiBzYXZlU3R5bGVzKCkgd2FzIHVzZWQgb24gdGhlIHRhcmdldChzKSwgdGhlIHN0eWxlcyBjb3VsZCBoYXZlIGJlZW4gd2lwZWQgb3V0IGR1cmluZyB0aGUgcmVmcmVzaCgpLlxuXG4gICAgICBpZiAoaXNGaXJzdFJlZnJlc2ggfHwgcHJldlByb2dyZXNzICE9PSBzZWxmLnByb2dyZXNzIHx8IGNvbnRhaW5lckFuaW1hdGlvbikge1xuICAgICAgICAvLyBlbnN1cmVzIHRoYXQgdGhlIGRpcmVjdGlvbiBpcyBzZXQgcHJvcGVybHkgKHdoZW4gcmVmcmVzaGluZywgcHJvZ3Jlc3MgaXMgc2V0IGJhY2sgdG8gMCBpbml0aWFsbHksIHRoZW4gYmFjayBhZ2FpbiB0byB3aGVyZXZlciBpdCBuZWVkcyB0byBiZSkgYW5kIHRoYXQgY2FsbGJhY2tzIGFyZSB0cmlnZ2VyZWQuXG4gICAgICAgIGFuaW1hdGlvbiAmJiAhaXNUb2dnbGUgJiYgYW5pbWF0aW9uLnRvdGFsUHJvZ3Jlc3MoY29udGFpbmVyQW5pbWF0aW9uICYmIHN0YXJ0IDwgLTAuMDAxICYmICFwcmV2UHJvZ3Jlc3MgPyBnc2FwLnV0aWxzLm5vcm1hbGl6ZShzdGFydCwgZW5kLCAwKSA6IHByZXZQcm9ncmVzcywgdHJ1ZSk7IC8vIHRvIGF2b2lkIGlzc3VlcyB3aGVyZSBhbmltYXRpb24gY2FsbGJhY2tzIGxpa2Ugb25TdGFydCBhcmVuJ3QgdHJpZ2dlcmVkLlxuXG4gICAgICAgIHNlbGYucHJvZ3Jlc3MgPSAoc2Nyb2xsMSAtIHN0YXJ0KSAvIGNoYW5nZSA9PT0gcHJldlByb2dyZXNzID8gMCA6IHByZXZQcm9ncmVzcztcbiAgICAgIH1cblxuICAgICAgcGluICYmIHBpblNwYWNpbmcgJiYgKHNwYWNlci5fcGluT2Zmc2V0ID0gTWF0aC5yb3VuZChzZWxmLnByb2dyZXNzICogcGluQ2hhbmdlKSk7XG4gICAgICBzY3J1YlR3ZWVuICYmIHNjcnViVHdlZW4uaW52YWxpZGF0ZSgpO1xuICAgICAgb25SZWZyZXNoICYmICFfcmVmcmVzaGluZ0FsbCAmJiBvblJlZnJlc2goc2VsZik7IC8vIHdoZW4gcmVmcmVzaGluZyBhbGwsIHdlIGRvIGV4dHJhIHdvcmsgdG8gY29ycmVjdCBwaW5uZWRDb250YWluZXIgc2l6ZXMgYW5kIGVuc3VyZSB0aGluZ3MgZG9uJ3QgZXhjZWVkIHRoZSBtYXhTY3JvbGwsIHNvIHdlIHNob3VsZCBkbyBhbGwgdGhlIHJlZnJlc2hlcyBhdCB0aGUgZW5kIGFmdGVyIGFsbCB0aGF0IHdvcmsgc28gdGhhdCB0aGUgc3RhcnQvZW5kIHZhbHVlcyBhcmUgY29ycmVjdGVkLlxuICAgIH07XG5cbiAgICBzZWxmLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIChzY3JvbGxGdW5jKCkgLSBzY3JvbGwyKSAvIChfZ2V0VGltZSgpIC0gX3RpbWUyKSAqIDEwMDAgfHwgMDtcbiAgICB9O1xuXG4gICAgc2VsZi5lbmRBbmltYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfZW5kQW5pbWF0aW9uKHNlbGYuY2FsbGJhY2tBbmltYXRpb24pO1xuXG4gICAgICBpZiAoYW5pbWF0aW9uKSB7XG4gICAgICAgIHNjcnViVHdlZW4gPyBzY3J1YlR3ZWVuLnByb2dyZXNzKDEpIDogIWFuaW1hdGlvbi5wYXVzZWQoKSA/IF9lbmRBbmltYXRpb24oYW5pbWF0aW9uLCBhbmltYXRpb24ucmV2ZXJzZWQoKSkgOiBpc1RvZ2dsZSB8fCBfZW5kQW5pbWF0aW9uKGFuaW1hdGlvbiwgc2VsZi5kaXJlY3Rpb24gPCAwLCAxKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi5sYWJlbFRvU2Nyb2xsID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICByZXR1cm4gYW5pbWF0aW9uICYmIGFuaW1hdGlvbi5sYWJlbHMgJiYgKHN0YXJ0IHx8IHNlbGYucmVmcmVzaCgpIHx8IHN0YXJ0KSArIGFuaW1hdGlvbi5sYWJlbHNbbGFiZWxdIC8gYW5pbWF0aW9uLmR1cmF0aW9uKCkgKiBjaGFuZ2UgfHwgMDtcbiAgICB9O1xuXG4gICAgc2VsZi5nZXRUcmFpbGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgaSA9IF90cmlnZ2Vycy5pbmRleE9mKHNlbGYpLFxuICAgICAgICAgIGEgPSBzZWxmLmRpcmVjdGlvbiA+IDAgPyBfdHJpZ2dlcnMuc2xpY2UoMCwgaSkucmV2ZXJzZSgpIDogX3RyaWdnZXJzLnNsaWNlKGkgKyAxKTtcblxuICAgICAgcmV0dXJuIChfaXNTdHJpbmcobmFtZSkgPyBhLmZpbHRlcihmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdC52YXJzLnByZXZlbnRPdmVybGFwcyA9PT0gbmFtZTtcbiAgICAgIH0pIDogYSkuZmlsdGVyKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiBzZWxmLmRpcmVjdGlvbiA+IDAgPyB0LmVuZCA8PSBzdGFydCA6IHQuc3RhcnQgPj0gZW5kO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYudXBkYXRlID0gZnVuY3Rpb24gKHJlc2V0LCByZWNvcmRWZWxvY2l0eSwgZm9yY2VGYWtlKSB7XG4gICAgICBpZiAoY29udGFpbmVyQW5pbWF0aW9uICYmICFmb3JjZUZha2UgJiYgIXJlc2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHNjcm9sbCA9IF9yZWZyZXNoaW5nQWxsID09PSB0cnVlID8gcHJldlNjcm9sbCA6IHNlbGYuc2Nyb2xsKCksXG4gICAgICAgICAgcCA9IHJlc2V0ID8gMCA6IChzY3JvbGwgLSBzdGFydCkgLyBjaGFuZ2UsXG4gICAgICAgICAgY2xpcHBlZCA9IHAgPCAwID8gMCA6IHAgPiAxID8gMSA6IHAgfHwgMCxcbiAgICAgICAgICBwcmV2UHJvZ3Jlc3MgPSBzZWxmLnByb2dyZXNzLFxuICAgICAgICAgIGlzQWN0aXZlLFxuICAgICAgICAgIHdhc0FjdGl2ZSxcbiAgICAgICAgICB0b2dnbGVTdGF0ZSxcbiAgICAgICAgICBhY3Rpb24sXG4gICAgICAgICAgc3RhdGVDaGFuZ2VkLFxuICAgICAgICAgIHRvZ2dsZWQsXG4gICAgICAgICAgaXNBdE1heCxcbiAgICAgICAgICBpc1Rha2luZ0FjdGlvbjtcblxuICAgICAgaWYgKHJlY29yZFZlbG9jaXR5KSB7XG4gICAgICAgIHNjcm9sbDIgPSBzY3JvbGwxO1xuICAgICAgICBzY3JvbGwxID0gY29udGFpbmVyQW5pbWF0aW9uID8gc2Nyb2xsRnVuYygpIDogc2Nyb2xsO1xuXG4gICAgICAgIGlmIChzbmFwKSB7XG4gICAgICAgICAgc25hcDIgPSBzbmFwMTtcbiAgICAgICAgICBzbmFwMSA9IGFuaW1hdGlvbiAmJiAhaXNUb2dnbGUgPyBhbmltYXRpb24udG90YWxQcm9ncmVzcygpIDogY2xpcHBlZDtcbiAgICAgICAgfVxuICAgICAgfSAvLyBhbnRpY2lwYXRlIHRoZSBwaW5uaW5nIGEgZmV3IHRpY2tzIGFoZWFkIG9mIHRpbWUgYmFzZWQgb24gdmVsb2NpdHkgdG8gYXZvaWQgYSB2aXN1YWwgZ2xpdGNoIGR1ZSB0byB0aGUgZmFjdCB0aGF0IG1vc3QgYnJvd3NlcnMgZG8gc2Nyb2xsaW5nIG9uIGEgc2VwYXJhdGUgdGhyZWFkIChub3Qgc3luY2VkIHdpdGggcmVxdWVzdEFuaW1hdGlvbkZyYW1lKS5cblxuXG4gICAgICBhbnRpY2lwYXRlUGluICYmICFjbGlwcGVkICYmIHBpbiAmJiAhX3JlZnJlc2hpbmcgJiYgIV9zdGFydHVwICYmIF9sYXN0U2Nyb2xsVGltZSAmJiBzdGFydCA8IHNjcm9sbCArIChzY3JvbGwgLSBzY3JvbGwyKSAvIChfZ2V0VGltZSgpIC0gX3RpbWUyKSAqIGFudGljaXBhdGVQaW4gJiYgKGNsaXBwZWQgPSAwLjAwMDEpO1xuXG4gICAgICBpZiAoY2xpcHBlZCAhPT0gcHJldlByb2dyZXNzICYmIHNlbGYuZW5hYmxlZCkge1xuICAgICAgICBpc0FjdGl2ZSA9IHNlbGYuaXNBY3RpdmUgPSAhIWNsaXBwZWQgJiYgY2xpcHBlZCA8IDE7XG4gICAgICAgIHdhc0FjdGl2ZSA9ICEhcHJldlByb2dyZXNzICYmIHByZXZQcm9ncmVzcyA8IDE7XG4gICAgICAgIHRvZ2dsZWQgPSBpc0FjdGl2ZSAhPT0gd2FzQWN0aXZlO1xuICAgICAgICBzdGF0ZUNoYW5nZWQgPSB0b2dnbGVkIHx8ICEhY2xpcHBlZCAhPT0gISFwcmV2UHJvZ3Jlc3M7IC8vIGNvdWxkIGdvIGZyb20gc3RhcnQgYWxsIHRoZSB3YXkgdG8gZW5kLCB0aHVzIGl0IGRpZG4ndCB0b2dnbGUgYnV0IGl0IGRpZCBjaGFuZ2Ugc3RhdGUgaW4gYSBzZW5zZSAobWF5IG5lZWQgdG8gZmlyZSBhIGNhbGxiYWNrKVxuXG4gICAgICAgIHNlbGYuZGlyZWN0aW9uID0gY2xpcHBlZCA+IHByZXZQcm9ncmVzcyA/IDEgOiAtMTtcbiAgICAgICAgc2VsZi5wcm9ncmVzcyA9IGNsaXBwZWQ7XG5cbiAgICAgICAgaWYgKHN0YXRlQ2hhbmdlZCAmJiAhX3JlZnJlc2hpbmcpIHtcbiAgICAgICAgICB0b2dnbGVTdGF0ZSA9IGNsaXBwZWQgJiYgIXByZXZQcm9ncmVzcyA/IDAgOiBjbGlwcGVkID09PSAxID8gMSA6IHByZXZQcm9ncmVzcyA9PT0gMSA/IDIgOiAzOyAvLyAwID0gZW50ZXIsIDEgPSBsZWF2ZSwgMiA9IGVudGVyQmFjaywgMyA9IGxlYXZlQmFjayAod2UgcHJpb3JpdGl6ZSB0aGUgRklSU1QgZW5jb3VudGVyLCB0aHVzIGlmIHlvdSBzY3JvbGwgcmVhbGx5IGZhc3QgcGFzdCB0aGUgb25FbnRlciBhbmQgb25MZWF2ZSBpbiBvbmUgdGljaywgaXQnZCBwcmlvcml0aXplIG9uRW50ZXIuXG5cbiAgICAgICAgICBpZiAoaXNUb2dnbGUpIHtcbiAgICAgICAgICAgIGFjdGlvbiA9ICF0b2dnbGVkICYmIHRvZ2dsZUFjdGlvbnNbdG9nZ2xlU3RhdGUgKyAxXSAhPT0gXCJub25lXCIgJiYgdG9nZ2xlQWN0aW9uc1t0b2dnbGVTdGF0ZSArIDFdIHx8IHRvZ2dsZUFjdGlvbnNbdG9nZ2xlU3RhdGVdOyAvLyBpZiBpdCBkaWRuJ3QgdG9nZ2xlLCB0aGF0IG1lYW5zIGl0IHNob3QgcmlnaHQgcGFzdCBhbmQgc2luY2Ugd2UgcHJpb3JpdGl6ZSB0aGUgXCJlbnRlclwiIGFjdGlvbiwgd2Ugc2hvdWxkIHN3aXRjaCB0byB0aGUgXCJsZWF2ZVwiIGluIHRoaXMgY2FzZSAoYnV0IG9ubHkgaWYgb25lIGlzIGRlZmluZWQpXG5cbiAgICAgICAgICAgIGlzVGFraW5nQWN0aW9uID0gYW5pbWF0aW9uICYmIChhY3Rpb24gPT09IFwiY29tcGxldGVcIiB8fCBhY3Rpb24gPT09IFwicmVzZXRcIiB8fCBhY3Rpb24gaW4gYW5pbWF0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2ZW50T3ZlcmxhcHMgJiYgKHRvZ2dsZWQgfHwgaXNUYWtpbmdBY3Rpb24pICYmIChpc1Rha2luZ0FjdGlvbiB8fCBzY3J1YiB8fCAhYW5pbWF0aW9uKSAmJiAoX2lzRnVuY3Rpb24ocHJldmVudE92ZXJsYXBzKSA/IHByZXZlbnRPdmVybGFwcyhzZWxmKSA6IHNlbGYuZ2V0VHJhaWxpbmcocHJldmVudE92ZXJsYXBzKS5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgcmV0dXJuIHQuZW5kQW5pbWF0aW9uKCk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBpZiAoIWlzVG9nZ2xlKSB7XG4gICAgICAgICAgaWYgKHNjcnViVHdlZW4gJiYgIV9yZWZyZXNoaW5nICYmICFfc3RhcnR1cCkge1xuICAgICAgICAgICAgc2NydWJUd2Vlbi5fZHAuX3RpbWUgLSBzY3J1YlR3ZWVuLl9zdGFydCAhPT0gc2NydWJUd2Vlbi5fdGltZSAmJiBzY3J1YlR3ZWVuLnJlbmRlcihzY3J1YlR3ZWVuLl9kcC5fdGltZSAtIHNjcnViVHdlZW4uX3N0YXJ0KTsgLy8gaWYgdGhlcmUncyBhIHNjcnViIG9uIGJvdGggdGhlIGNvbnRhaW5lciBhbmltYXRpb24gYW5kIHRoaXMgb25lIChvciBhIFNjcm9sbFNtb290aGVyKSwgdGhlIHVwZGF0ZSBvcmRlciB3b3VsZCBjYXVzZSB0aGlzIG9uZSBub3QgdG8gaGF2ZSByZW5kZXJlZCB5ZXQsIHNvIGl0IHdvdWxkbid0IG1ha2UgYW55IHByb2dyZXNzIGJlZm9yZSB3ZSAucmVzdGFydCgpIGl0IGhlYWRpbmcgdG93YXJkIHRoZSBuZXcgcHJvZ3Jlc3Mgc28gaXQnZCBhcHBlYXIgc3R1Y2sgdGh1cyB3ZSBmb3JjZSBhIHJlbmRlciBoZXJlLlxuXG4gICAgICAgICAgICBpZiAoc2NydWJUd2Vlbi5yZXNldFRvKSB7XG4gICAgICAgICAgICAgIHNjcnViVHdlZW4ucmVzZXRUbyhcInRvdGFsUHJvZ3Jlc3NcIiwgY2xpcHBlZCwgYW5pbWF0aW9uLl90VGltZSAvIGFuaW1hdGlvbi5fdER1cik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBsZWdhY3kgc3VwcG9ydCAoY291cnRlc3kpLCBiZWZvcmUgMy4xMC4wXG4gICAgICAgICAgICAgIHNjcnViVHdlZW4udmFycy50b3RhbFByb2dyZXNzID0gY2xpcHBlZDtcbiAgICAgICAgICAgICAgc2NydWJUd2Vlbi5pbnZhbGlkYXRlKCkucmVzdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICBhbmltYXRpb24udG90YWxQcm9ncmVzcyhjbGlwcGVkLCAhIV9yZWZyZXNoaW5nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGluKSB7XG4gICAgICAgICAgcmVzZXQgJiYgcGluU3BhY2luZyAmJiAoc3BhY2VyLnN0eWxlW3BpblNwYWNpbmcgKyBkaXJlY3Rpb24ub3MyXSA9IHNwYWNpbmdTdGFydCk7XG5cbiAgICAgICAgICBpZiAoIXVzZUZpeGVkUG9zaXRpb24pIHtcbiAgICAgICAgICAgIHBpblNldHRlcihfcm91bmQocGluU3RhcnQgKyBwaW5DaGFuZ2UgKiBjbGlwcGVkKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIGlzQXRNYXggPSAhcmVzZXQgJiYgY2xpcHBlZCA+IHByZXZQcm9ncmVzcyAmJiBlbmQgKyAxID4gc2Nyb2xsICYmIHNjcm9sbCArIDEgPj0gX21heFNjcm9sbChzY3JvbGxlciwgZGlyZWN0aW9uKTsgLy8gaWYgaXQncyBhdCB0aGUgVkVSWSBlbmQgb2YgdGhlIHBhZ2UsIGRvbid0IHN3aXRjaCBhd2F5IGZyb20gcG9zaXRpb246IGZpeGVkIGJlY2F1c2UgaXQncyBwb2ludGxlc3MgYW5kIGl0IGNvdWxkIGNhdXNlIGEgYnJpZWYgZmxhc2ggd2hlbiB0aGUgdXNlciBzY3JvbGxzIGJhY2sgdXAgKHdoZW4gaXQgZ2V0cyBwaW5uZWQgYWdhaW4pXG5cbiAgICAgICAgICAgIGlmIChwaW5SZXBhcmVudCkge1xuICAgICAgICAgICAgICBpZiAoIXJlc2V0ICYmIChpc0FjdGl2ZSB8fCBpc0F0TWF4KSkge1xuICAgICAgICAgICAgICAgIHZhciBib3VuZHMgPSBfZ2V0Qm91bmRzKHBpbiwgdHJ1ZSksXG4gICAgICAgICAgICAgICAgICAgIF9vZmZzZXQgPSBzY3JvbGwgLSBzdGFydDtcblxuICAgICAgICAgICAgICAgIF9yZXBhcmVudChwaW4sIF9ib2R5LCBib3VuZHMudG9wICsgKGRpcmVjdGlvbiA9PT0gX3ZlcnRpY2FsID8gX29mZnNldCA6IDApICsgX3B4LCBib3VuZHMubGVmdCArIChkaXJlY3Rpb24gPT09IF92ZXJ0aWNhbCA/IDAgOiBfb2Zmc2V0KSArIF9weCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3JlcGFyZW50KHBpbiwgc3BhY2VyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfc2V0U3RhdGUoaXNBY3RpdmUgfHwgaXNBdE1heCA/IHBpbkFjdGl2ZVN0YXRlIDogcGluU3RhdGUpO1xuXG4gICAgICAgICAgICBwaW5Nb3ZlcyAmJiBjbGlwcGVkIDwgMSAmJiBpc0FjdGl2ZSB8fCBwaW5TZXR0ZXIocGluU3RhcnQgKyAoY2xpcHBlZCA9PT0gMSAmJiAhaXNBdE1heCA/IHBpbkNoYW5nZSA6IDApKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzbmFwICYmICF0d2VlblRvLnR3ZWVuICYmICFfcmVmcmVzaGluZyAmJiAhX3N0YXJ0dXAgJiYgc25hcERlbGF5ZWRDYWxsLnJlc3RhcnQodHJ1ZSk7XG4gICAgICAgIHRvZ2dsZUNsYXNzICYmICh0b2dnbGVkIHx8IG9uY2UgJiYgY2xpcHBlZCAmJiAoY2xpcHBlZCA8IDEgfHwgIV9saW1pdENhbGxiYWNrcykpICYmIF90b0FycmF5KHRvZ2dsZUNsYXNzLnRhcmdldHMpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgcmV0dXJuIGVsLmNsYXNzTGlzdFtpc0FjdGl2ZSB8fCBvbmNlID8gXCJhZGRcIiA6IFwicmVtb3ZlXCJdKHRvZ2dsZUNsYXNzLmNsYXNzTmFtZSk7XG4gICAgICAgIH0pOyAvLyBjbGFzc2VzIGNvdWxkIGFmZmVjdCBwb3NpdGlvbmluZywgc28gZG8gaXQgZXZlbiBpZiByZXNldCBvciByZWZyZXNoaW5nIGlzIHRydWUuXG5cbiAgICAgICAgb25VcGRhdGUgJiYgIWlzVG9nZ2xlICYmICFyZXNldCAmJiBvblVwZGF0ZShzZWxmKTtcblxuICAgICAgICBpZiAoc3RhdGVDaGFuZ2VkICYmICFfcmVmcmVzaGluZykge1xuICAgICAgICAgIGlmIChpc1RvZ2dsZSkge1xuICAgICAgICAgICAgaWYgKGlzVGFraW5nQWN0aW9uKSB7XG4gICAgICAgICAgICAgIGlmIChhY3Rpb24gPT09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi5wYXVzZSgpLnRvdGFsUHJvZ3Jlc3MoMSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSBcInJlc2V0XCIpIHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ucmVzdGFydCh0cnVlKS5wYXVzZSgpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gXCJyZXN0YXJ0XCIpIHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb24ucmVzdGFydCh0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25bYWN0aW9uXSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9uVXBkYXRlICYmIG9uVXBkYXRlKHNlbGYpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0b2dnbGVkIHx8ICFfbGltaXRDYWxsYmFja3MpIHtcbiAgICAgICAgICAgIC8vIG9uIHN0YXJ0dXAsIHRoZSBwYWdlIGNvdWxkIGJlIHNjcm9sbGVkIGFuZCB3ZSBkb24ndCB3YW50IHRvIGZpcmUgY2FsbGJhY2tzIHRoYXQgZGlkbid0IHRvZ2dsZS4gRm9yIGV4YW1wbGUgb25FbnRlciBzaG91bGRuJ3QgZmlyZSBpZiB0aGUgU2Nyb2xsVHJpZ2dlciBpc24ndCBhY3R1YWxseSBlbnRlcmVkLlxuICAgICAgICAgICAgb25Ub2dnbGUgJiYgdG9nZ2xlZCAmJiBfY2FsbGJhY2soc2VsZiwgb25Ub2dnbGUpO1xuICAgICAgICAgICAgY2FsbGJhY2tzW3RvZ2dsZVN0YXRlXSAmJiBfY2FsbGJhY2soc2VsZiwgY2FsbGJhY2tzW3RvZ2dsZVN0YXRlXSk7XG4gICAgICAgICAgICBvbmNlICYmIChjbGlwcGVkID09PSAxID8gc2VsZi5raWxsKGZhbHNlLCAxKSA6IGNhbGxiYWNrc1t0b2dnbGVTdGF0ZV0gPSAwKTsgLy8gYSBjYWxsYmFjayBzaG91bGRuJ3QgYmUgY2FsbGVkIGFnYWluIGlmIG9uY2UgaXMgdHJ1ZS5cblxuICAgICAgICAgICAgaWYgKCF0b2dnbGVkKSB7XG4gICAgICAgICAgICAgIC8vIGl0J3MgcG9zc2libGUgdG8gZ28gY29tcGxldGVseSBwYXN0LCBsaWtlIGZyb20gYmVmb3JlIHRoZSBzdGFydCB0byBhZnRlciB0aGUgZW5kIChvciB2aWNlLXZlcnNhKSBpbiB3aGljaCBjYXNlIEJPVEggY2FsbGJhY2tzIHNob3VsZCBiZSBmaXJlZCBpbiB0aGF0IG9yZGVyXG4gICAgICAgICAgICAgIHRvZ2dsZVN0YXRlID0gY2xpcHBlZCA9PT0gMSA/IDEgOiAzO1xuICAgICAgICAgICAgICBjYWxsYmFja3NbdG9nZ2xlU3RhdGVdICYmIF9jYWxsYmFjayhzZWxmLCBjYWxsYmFja3NbdG9nZ2xlU3RhdGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZmFzdFNjcm9sbEVuZCAmJiAhaXNBY3RpdmUgJiYgTWF0aC5hYnMoc2VsZi5nZXRWZWxvY2l0eSgpKSA+IChfaXNOdW1iZXIoZmFzdFNjcm9sbEVuZCkgPyBmYXN0U2Nyb2xsRW5kIDogMjUwMCkpIHtcbiAgICAgICAgICAgIF9lbmRBbmltYXRpb24oc2VsZi5jYWxsYmFja0FuaW1hdGlvbik7XG5cbiAgICAgICAgICAgIHNjcnViVHdlZW4gPyBzY3J1YlR3ZWVuLnByb2dyZXNzKDEpIDogX2VuZEFuaW1hdGlvbihhbmltYXRpb24sIGFjdGlvbiA9PT0gXCJyZXZlcnNlXCIgPyAxIDogIWNsaXBwZWQsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc1RvZ2dsZSAmJiBvblVwZGF0ZSAmJiAhX3JlZnJlc2hpbmcpIHtcbiAgICAgICAgICBvblVwZGF0ZShzZWxmKTtcbiAgICAgICAgfVxuICAgICAgfSAvLyB1cGRhdGUgYWJzb2x1dGVseS1wb3NpdGlvbmVkIG1hcmtlcnMgKG9ubHkgaWYgdGhlIHNjcm9sbGVyIGlzbid0IHRoZSB2aWV3cG9ydClcblxuXG4gICAgICBpZiAobWFya2VyRW5kU2V0dGVyKSB7XG4gICAgICAgIHZhciBuID0gY29udGFpbmVyQW5pbWF0aW9uID8gc2Nyb2xsIC8gY29udGFpbmVyQW5pbWF0aW9uLmR1cmF0aW9uKCkgKiAoY29udGFpbmVyQW5pbWF0aW9uLl9jYVNjcm9sbERpc3QgfHwgMCkgOiBzY3JvbGw7XG4gICAgICAgIG1hcmtlclN0YXJ0U2V0dGVyKG4gKyAobWFya2VyU3RhcnRUcmlnZ2VyLl9pc0ZsaXBwZWQgPyAxIDogMCkpO1xuICAgICAgICBtYXJrZXJFbmRTZXR0ZXIobik7XG4gICAgICB9XG5cbiAgICAgIGNhTWFya2VyU2V0dGVyICYmIGNhTWFya2VyU2V0dGVyKC1zY3JvbGwgLyBjb250YWluZXJBbmltYXRpb24uZHVyYXRpb24oKSAqIChjb250YWluZXJBbmltYXRpb24uX2NhU2Nyb2xsRGlzdCB8fCAwKSk7XG4gICAgfTtcblxuICAgIHNlbGYuZW5hYmxlID0gZnVuY3Rpb24gKHJlc2V0LCByZWZyZXNoKSB7XG4gICAgICBpZiAoIXNlbGYuZW5hYmxlZCkge1xuICAgICAgICBzZWxmLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIF9hZGRMaXN0ZW5lcihzY3JvbGxlciwgXCJyZXNpemVcIiwgX29uUmVzaXplKTtcblxuICAgICAgICBfYWRkTGlzdGVuZXIoaXNWaWV3cG9ydCA/IF9kb2MgOiBzY3JvbGxlciwgXCJzY3JvbGxcIiwgX29uU2Nyb2xsKTtcblxuICAgICAgICBvblJlZnJlc2hJbml0ICYmIF9hZGRMaXN0ZW5lcihTY3JvbGxUcmlnZ2VyLCBcInJlZnJlc2hJbml0XCIsIG9uUmVmcmVzaEluaXQpO1xuXG4gICAgICAgIGlmIChyZXNldCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBzZWxmLnByb2dyZXNzID0gcHJldlByb2dyZXNzID0gMDtcbiAgICAgICAgICBzY3JvbGwxID0gc2Nyb2xsMiA9IGxhc3RTbmFwID0gc2Nyb2xsRnVuYygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmcmVzaCAhPT0gZmFsc2UgJiYgc2VsZi5yZWZyZXNoKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYuZ2V0VHdlZW4gPSBmdW5jdGlvbiAoc25hcCkge1xuICAgICAgcmV0dXJuIHNuYXAgJiYgdHdlZW5UbyA/IHR3ZWVuVG8udHdlZW4gOiBzY3J1YlR3ZWVuO1xuICAgIH07XG5cbiAgICBzZWxmLnNldFBvc2l0aW9ucyA9IGZ1bmN0aW9uIChuZXdTdGFydCwgbmV3RW5kKSB7XG4gICAgICAvLyBkb2Vzbid0IHBlcnNpc3QgYWZ0ZXIgcmVmcmVzaCgpISBJbnRlbmRlZCB0byBiZSBhIHdheSB0byBvdmVycmlkZSB2YWx1ZXMgdGhhdCB3ZXJlIHNldCBkdXJpbmcgcmVmcmVzaCgpLCBsaWtlIHlvdSBjb3VsZCBzZXQgaXQgaW4gb25SZWZyZXNoKClcbiAgICAgIGlmIChwaW4pIHtcbiAgICAgICAgcGluU3RhcnQgKz0gbmV3U3RhcnQgLSBzdGFydDtcbiAgICAgICAgcGluQ2hhbmdlICs9IG5ld0VuZCAtIG5ld1N0YXJ0IC0gY2hhbmdlO1xuICAgICAgICBwaW5TcGFjaW5nID09PSBfcGFkZGluZyAmJiBzZWxmLmFkanVzdFBpblNwYWNpbmcobmV3RW5kIC0gbmV3U3RhcnQgLSBjaGFuZ2UpO1xuICAgICAgfVxuXG4gICAgICBzZWxmLnN0YXJ0ID0gc3RhcnQgPSBuZXdTdGFydDtcbiAgICAgIHNlbGYuZW5kID0gZW5kID0gbmV3RW5kO1xuICAgICAgY2hhbmdlID0gbmV3RW5kIC0gbmV3U3RhcnQ7XG4gICAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICBzZWxmLmFkanVzdFBpblNwYWNpbmcgPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICBpZiAoc3BhY2VyU3RhdGUgJiYgYW1vdW50KSB7XG4gICAgICAgIHZhciBpID0gc3BhY2VyU3RhdGUuaW5kZXhPZihkaXJlY3Rpb24uZCkgKyAxO1xuICAgICAgICBzcGFjZXJTdGF0ZVtpXSA9IHBhcnNlRmxvYXQoc3BhY2VyU3RhdGVbaV0pICsgYW1vdW50ICsgX3B4O1xuICAgICAgICBzcGFjZXJTdGF0ZVsxXSA9IHBhcnNlRmxvYXQoc3BhY2VyU3RhdGVbMV0pICsgYW1vdW50ICsgX3B4O1xuXG4gICAgICAgIF9zZXRTdGF0ZShzcGFjZXJTdGF0ZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYuZGlzYWJsZSA9IGZ1bmN0aW9uIChyZXNldCwgYWxsb3dBbmltYXRpb24pIHtcbiAgICAgIGlmIChzZWxmLmVuYWJsZWQpIHtcbiAgICAgICAgcmVzZXQgIT09IGZhbHNlICYmIHNlbGYucmV2ZXJ0KHRydWUsIHRydWUpO1xuICAgICAgICBzZWxmLmVuYWJsZWQgPSBzZWxmLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIGFsbG93QW5pbWF0aW9uIHx8IHNjcnViVHdlZW4gJiYgc2NydWJUd2Vlbi5wYXVzZSgpO1xuICAgICAgICBwcmV2U2Nyb2xsID0gMDtcbiAgICAgICAgcGluQ2FjaGUgJiYgKHBpbkNhY2hlLnVuY2FjaGUgPSAxKTtcbiAgICAgICAgb25SZWZyZXNoSW5pdCAmJiBfcmVtb3ZlTGlzdGVuZXIoU2Nyb2xsVHJpZ2dlciwgXCJyZWZyZXNoSW5pdFwiLCBvblJlZnJlc2hJbml0KTtcblxuICAgICAgICBpZiAoc25hcERlbGF5ZWRDYWxsKSB7XG4gICAgICAgICAgc25hcERlbGF5ZWRDYWxsLnBhdXNlKCk7XG4gICAgICAgICAgdHdlZW5Uby50d2VlbiAmJiB0d2VlblRvLnR3ZWVuLmtpbGwoKSAmJiAodHdlZW5Uby50d2VlbiA9IDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1ZpZXdwb3J0KSB7XG4gICAgICAgICAgdmFyIGkgPSBfdHJpZ2dlcnMubGVuZ3RoO1xuXG4gICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgaWYgKF90cmlnZ2Vyc1tpXS5zY3JvbGxlciA9PT0gc2Nyb2xsZXIgJiYgX3RyaWdnZXJzW2ldICE9PSBzZWxmKSB7XG4gICAgICAgICAgICAgIHJldHVybjsgLy9kb24ndCByZW1vdmUgdGhlIGxpc3RlbmVycyBpZiB0aGVyZSBhcmUgc3RpbGwgb3RoZXIgdHJpZ2dlcnMgcmVmZXJlbmNpbmcgaXQuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3JlbW92ZUxpc3RlbmVyKHNjcm9sbGVyLCBcInJlc2l6ZVwiLCBfb25SZXNpemUpO1xuXG4gICAgICAgICAgX3JlbW92ZUxpc3RlbmVyKHNjcm9sbGVyLCBcInNjcm9sbFwiLCBfb25TY3JvbGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYua2lsbCA9IGZ1bmN0aW9uIChyZXZlcnQsIGFsbG93QW5pbWF0aW9uKSB7XG4gICAgICBzZWxmLmRpc2FibGUocmV2ZXJ0LCBhbGxvd0FuaW1hdGlvbik7XG4gICAgICBzY3J1YlR3ZWVuICYmICFhbGxvd0FuaW1hdGlvbiAmJiBzY3J1YlR3ZWVuLmtpbGwoKTtcbiAgICAgIGlkICYmIGRlbGV0ZSBfaWRzW2lkXTtcblxuICAgICAgdmFyIGkgPSBfdHJpZ2dlcnMuaW5kZXhPZihzZWxmKTtcblxuICAgICAgaSA+PSAwICYmIF90cmlnZ2Vycy5zcGxpY2UoaSwgMSk7XG4gICAgICBpID09PSBfaSAmJiBfZGlyZWN0aW9uID4gMCAmJiBfaS0tOyAvLyBpZiB3ZSdyZSBpbiB0aGUgbWlkZGxlIG9mIGEgcmVmcmVzaCgpIG9yIHVwZGF0ZSgpLCBzcGxpY2luZyB3b3VsZCBjYXVzZSBza2lwcyBpbiB0aGUgaW5kZXgsIHNvIGFkanVzdC4uLlxuICAgICAgLy8gaWYgbm8gb3RoZXIgU2Nyb2xsVHJpZ2dlciBpbnN0YW5jZXMgb2YgdGhlIHNhbWUgc2Nyb2xsZXIgYXJlIGZvdW5kLCB3aXBlIG91dCBhbnkgcmVjb3JkZWQgc2Nyb2xsIHBvc2l0aW9uLiBPdGhlcndpc2UsIGluIGEgc2luZ2xlIHBhZ2UgYXBwbGljYXRpb24sIGZvciBleGFtcGxlLCBpdCBjb3VsZCBtYWludGFpbiBzY3JvbGwgcG9zaXRpb24gd2hlbiBpdCByZWFsbHkgc2hvdWxkbid0LlxuXG4gICAgICBpID0gMDtcblxuICAgICAgX3RyaWdnZXJzLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQuc2Nyb2xsZXIgPT09IHNlbGYuc2Nyb2xsZXIgJiYgKGkgPSAxKTtcbiAgICAgIH0pO1xuXG4gICAgICBpIHx8IF9yZWZyZXNoaW5nQWxsIHx8IChzZWxmLnNjcm9sbC5yZWMgPSAwKTtcblxuICAgICAgaWYgKGFuaW1hdGlvbikge1xuICAgICAgICBhbmltYXRpb24uc2Nyb2xsVHJpZ2dlciA9IG51bGw7XG4gICAgICAgIHJldmVydCAmJiBhbmltYXRpb24ucmV2ZXJ0KHtcbiAgICAgICAgICBraWxsOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgYWxsb3dBbmltYXRpb24gfHwgYW5pbWF0aW9uLmtpbGwoKTtcbiAgICAgIH1cblxuICAgICAgbWFya2VyU3RhcnQgJiYgW21hcmtlclN0YXJ0LCBtYXJrZXJFbmQsIG1hcmtlclN0YXJ0VHJpZ2dlciwgbWFya2VyRW5kVHJpZ2dlcl0uZm9yRWFjaChmdW5jdGlvbiAobSkge1xuICAgICAgICByZXR1cm4gbS5wYXJlbnROb2RlICYmIG0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtKTtcbiAgICAgIH0pO1xuICAgICAgX3ByaW1hcnkgPT09IHNlbGYgJiYgKF9wcmltYXJ5ID0gMCk7XG5cbiAgICAgIGlmIChwaW4pIHtcbiAgICAgICAgcGluQ2FjaGUgJiYgKHBpbkNhY2hlLnVuY2FjaGUgPSAxKTtcbiAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgX3RyaWdnZXJzLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICByZXR1cm4gdC5waW4gPT09IHBpbiAmJiBpKys7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGkgfHwgKHBpbkNhY2hlLnNwYWNlciA9IDApOyAvLyBpZiB0aGVyZSBhcmVuJ3QgYW55IG1vcmUgU2Nyb2xsVHJpZ2dlcnMgd2l0aCB0aGUgc2FtZSBwaW4sIHJlbW92ZSB0aGUgc3BhY2VyLCBvdGhlcndpc2UgaXQgY291bGQgYmUgY29udGFtaW5hdGVkIHdpdGggb2xkL3N0YWxlIHZhbHVlcyBpZiB0aGUgdXNlciByZS1jcmVhdGVzIGEgU2Nyb2xsVHJpZ2dlciBmb3IgdGhlIHNhbWUgZWxlbWVudC5cbiAgICAgIH1cblxuICAgICAgdmFycy5vbktpbGwgJiYgdmFycy5vbktpbGwoc2VsZik7XG4gICAgfTtcblxuICAgIHNlbGYuZW5hYmxlKGZhbHNlLCBmYWxzZSk7XG4gICAgY3VzdG9tUmV2ZXJ0UmV0dXJuICYmIGN1c3RvbVJldmVydFJldHVybihzZWxmKTtcbiAgICAhYW5pbWF0aW9uIHx8ICFhbmltYXRpb24uYWRkIHx8IGNoYW5nZSA/IHNlbGYucmVmcmVzaCgpIDogZ3NhcC5kZWxheWVkQ2FsbCgwLjAxLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RhcnQgfHwgZW5kIHx8IHNlbGYucmVmcmVzaCgpO1xuICAgIH0pICYmIChjaGFuZ2UgPSAwLjAxKSAmJiAoc3RhcnQgPSBlbmQgPSAwKTsgLy8gaWYgdGhlIGFuaW1hdGlvbiBpcyBhIHRpbWVsaW5lLCBpdCBtYXkgbm90IGhhdmUgYmVlbiBwb3B1bGF0ZWQgeWV0LCBzbyBpdCB3b3VsZG4ndCByZW5kZXIgYXQgdGhlIHByb3BlciBwbGFjZSBvbiB0aGUgZmlyc3QgcmVmcmVzaCgpLCB0aHVzIHdlIHNob3VsZCBzY2hlZHVsZSBvbmUgZm9yIHRoZSBuZXh0IHRpY2suIElmIFwiY2hhbmdlXCIgaXMgZGVmaW5lZCwgd2Uga25vdyBpdCBtdXN0IGJlIHJlLWVuYWJsaW5nLCB0aHVzIHdlIGNhbiByZWZyZXNoKCkgcmlnaHQgYXdheS5cblxuICAgIHBpbiAmJiBfcXVldWVSZWZyZXNoQWxsKCk7IC8vIHBpbm5pbmcgY291bGQgYWZmZWN0IHRoZSBwb3NpdGlvbnMgb2Ygb3RoZXIgdGhpbmdzLCBzbyBtYWtlIHN1cmUgd2UgcXVldWUgYSBmdWxsIHJlZnJlc2goKVxuICB9O1xuXG4gIFNjcm9sbFRyaWdnZXIucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3Rlcihjb3JlKSB7XG4gICAgaWYgKCFfY29yZUluaXR0ZWQpIHtcbiAgICAgIGdzYXAgPSBjb3JlIHx8IF9nZXRHU0FQKCk7XG4gICAgICBfd2luZG93RXhpc3RzKCkgJiYgd2luZG93LmRvY3VtZW50ICYmIFNjcm9sbFRyaWdnZXIuZW5hYmxlKCk7XG4gICAgICBfY29yZUluaXR0ZWQgPSBfZW5hYmxlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gX2NvcmVJbml0dGVkO1xuICB9O1xuXG4gIFNjcm9sbFRyaWdnZXIuZGVmYXVsdHMgPSBmdW5jdGlvbiBkZWZhdWx0cyhjb25maWcpIHtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBmb3IgKHZhciBwIGluIGNvbmZpZykge1xuICAgICAgICBfZGVmYXVsdHNbcF0gPSBjb25maWdbcF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9kZWZhdWx0cztcbiAgfTtcblxuICBTY3JvbGxUcmlnZ2VyLmRpc2FibGUgPSBmdW5jdGlvbiBkaXNhYmxlKHJlc2V0LCBraWxsKSB7XG4gICAgX2VuYWJsZWQgPSAwO1xuXG4gICAgX3RyaWdnZXJzLmZvckVhY2goZnVuY3Rpb24gKHRyaWdnZXIpIHtcbiAgICAgIHJldHVybiB0cmlnZ2VyW2tpbGwgPyBcImtpbGxcIiA6IFwiZGlzYWJsZVwiXShyZXNldCk7XG4gICAgfSk7XG5cbiAgICBfcmVtb3ZlTGlzdGVuZXIoX3dpbiwgXCJ3aGVlbFwiLCBfb25TY3JvbGwpO1xuXG4gICAgX3JlbW92ZUxpc3RlbmVyKF9kb2MsIFwic2Nyb2xsXCIsIF9vblNjcm9sbCk7XG5cbiAgICBjbGVhckludGVydmFsKF9zeW5jSW50ZXJ2YWwpO1xuXG4gICAgX3JlbW92ZUxpc3RlbmVyKF9kb2MsIFwidG91Y2hjYW5jZWxcIiwgX3Bhc3NUaHJvdWdoKTtcblxuICAgIF9yZW1vdmVMaXN0ZW5lcihfYm9keSwgXCJ0b3VjaHN0YXJ0XCIsIF9wYXNzVGhyb3VnaCk7XG5cbiAgICBfbXVsdGlMaXN0ZW5lcihfcmVtb3ZlTGlzdGVuZXIsIF9kb2MsIFwicG9pbnRlcmRvd24sdG91Y2hzdGFydCxtb3VzZWRvd25cIiwgX3BvaW50ZXJEb3duSGFuZGxlcik7XG5cbiAgICBfbXVsdGlMaXN0ZW5lcihfcmVtb3ZlTGlzdGVuZXIsIF9kb2MsIFwicG9pbnRlcnVwLHRvdWNoZW5kLG1vdXNldXBcIiwgX3BvaW50ZXJVcEhhbmRsZXIpO1xuXG4gICAgX3Jlc2l6ZURlbGF5LmtpbGwoKTtcblxuICAgIF9pdGVyYXRlQXV0b1JlZnJlc2goX3JlbW92ZUxpc3RlbmVyKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3Njcm9sbGVycy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgX3doZWVsTGlzdGVuZXIoX3JlbW92ZUxpc3RlbmVyLCBfc2Nyb2xsZXJzW2ldLCBfc2Nyb2xsZXJzW2kgKyAxXSk7XG5cbiAgICAgIF93aGVlbExpc3RlbmVyKF9yZW1vdmVMaXN0ZW5lciwgX3Njcm9sbGVyc1tpXSwgX3Njcm9sbGVyc1tpICsgMl0pO1xuICAgIH1cbiAgfTtcblxuICBTY3JvbGxUcmlnZ2VyLmVuYWJsZSA9IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICBfd2luID0gd2luZG93O1xuICAgIF9kb2MgPSBkb2N1bWVudDtcbiAgICBfZG9jRWwgPSBfZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICBfYm9keSA9IF9kb2MuYm9keTtcblxuICAgIGlmIChnc2FwKSB7XG4gICAgICBfdG9BcnJheSA9IGdzYXAudXRpbHMudG9BcnJheTtcbiAgICAgIF9jbGFtcCA9IGdzYXAudXRpbHMuY2xhbXA7XG4gICAgICBfY29udGV4dCA9IGdzYXAuY29yZS5jb250ZXh0IHx8IF9wYXNzVGhyb3VnaDtcbiAgICAgIF9zdXBwcmVzc092ZXJ3cml0ZXMgPSBnc2FwLmNvcmUuc3VwcHJlc3NPdmVyd3JpdGVzIHx8IF9wYXNzVGhyb3VnaDtcbiAgICAgIF9zY3JvbGxSZXN0b3JhdGlvbiA9IF93aW4uaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiB8fCBcImF1dG9cIjtcbiAgICAgIF9sYXN0U2Nyb2xsID0gX3dpbi5wYWdlWU9mZnNldDtcbiAgICAgIGdzYXAuY29yZS5nbG9iYWxzKFwiU2Nyb2xsVHJpZ2dlclwiLCBTY3JvbGxUcmlnZ2VyKTsgLy8gbXVzdCByZWdpc3RlciB0aGUgZ2xvYmFsIG1hbnVhbGx5IGJlY2F1c2UgaW4gSW50ZXJuZXQgRXhwbG9yZXIsIGZ1bmN0aW9ucyAoY2xhc3NlcykgZG9uJ3QgaGF2ZSBhIFwibmFtZVwiIHByb3BlcnR5LlxuXG4gICAgICBpZiAoX2JvZHkpIHtcbiAgICAgICAgX2VuYWJsZWQgPSAxO1xuXG4gICAgICAgIF9yYWZCdWdGaXgoKTtcblxuICAgICAgICBPYnNlcnZlci5yZWdpc3Rlcihnc2FwKTsgLy8gaXNUb3VjaCBpcyAwIGlmIG5vIHRvdWNoLCAxIGlmIE9OTFkgdG91Y2gsIGFuZCAyIGlmIGl0IGNhbiBhY2NvbW1vZGF0ZSB0b3VjaCBidXQgYWxzbyBvdGhlciB0eXBlcyBsaWtlIG1vdXNlL3BvaW50ZXIuXG5cbiAgICAgICAgU2Nyb2xsVHJpZ2dlci5pc1RvdWNoID0gT2JzZXJ2ZXIuaXNUb3VjaDtcbiAgICAgICAgX2ZpeElPU0J1ZyA9IE9ic2VydmVyLmlzVG91Y2ggJiYgLyhpUGFkfGlQaG9uZXxpUG9kfE1hYykvZy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpOyAvLyBzaW5jZSAyMDE3LCBpT1MgaGFzIGhhZCBhIGJ1ZyB0aGF0IGNhdXNlcyBldmVudC5jbGllbnRYL1kgdG8gYmUgaW5hY2N1cmF0ZSB3aGVuIGEgc2Nyb2xsIG9jY3VycywgdGh1cyB3ZSBtdXN0IGFsdGVybmF0ZSBpZ25vcmluZyBldmVyeSBvdGhlciB0b3VjaG1vdmUgZXZlbnQgdG8gd29yayBhcm91bmQgaXQuIFNlZSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTgxOTU0IGFuZCBodHRwczovL2NvZGVwZW4uaW8vR3JlZW5Tb2NrL3Blbi9FeGJyUE5hLzA4N2NlZjE5N2RjMzU0NDVhMDk1MWU4OTM1YzQxNTAzXG5cbiAgICAgICAgX2FkZExpc3RlbmVyKF93aW4sIFwid2hlZWxcIiwgX29uU2Nyb2xsKTsgLy8gbW9zdGx5IGZvciAzcmQgcGFydHkgc21vb3RoIHNjcm9sbGluZyBsaWJyYXJpZXMuXG5cblxuICAgICAgICBfcm9vdCA9IFtfd2luLCBfZG9jLCBfZG9jRWwsIF9ib2R5XTtcblxuICAgICAgICBpZiAoZ3NhcC5tYXRjaE1lZGlhKSB7XG4gICAgICAgICAgU2Nyb2xsVHJpZ2dlci5tYXRjaE1lZGlhID0gZnVuY3Rpb24gKHZhcnMpIHtcbiAgICAgICAgICAgIHZhciBtbSA9IGdzYXAubWF0Y2hNZWRpYSgpLFxuICAgICAgICAgICAgICAgIHA7XG5cbiAgICAgICAgICAgIGZvciAocCBpbiB2YXJzKSB7XG4gICAgICAgICAgICAgIG1tLmFkZChwLCB2YXJzW3BdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG1tO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBnc2FwLmFkZEV2ZW50TGlzdGVuZXIoXCJtYXRjaE1lZGlhSW5pdFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3JldmVydEFsbCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGdzYXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1hdGNoTWVkaWFSZXZlcnRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9yZXZlcnRSZWNvcmRlZCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGdzYXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1hdGNoTWVkaWFcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3JlZnJlc2hBbGwoMCwgMSk7XG5cbiAgICAgICAgICAgIF9kaXNwYXRjaChcIm1hdGNoTWVkaWFcIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZ3NhcC5tYXRjaE1lZGlhKFwiKG9yaWVudGF0aW9uOiBwb3J0cmFpdClcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gd2hlbiBvcmllbnRhdGlvbiBjaGFuZ2VzLCB3ZSBzaG91bGQgdGFrZSBuZXcgYmFzZSBtZWFzdXJlbWVudHMgZm9yIHRoZSBpZ25vcmVNb2JpbGVSZXNpemUgZmVhdHVyZS5cbiAgICAgICAgICAgIF9zZXRCYXNlRGltZW5zaW9ucygpO1xuXG4gICAgICAgICAgICByZXR1cm4gX3NldEJhc2VEaW1lbnNpb25zO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcIlJlcXVpcmVzIEdTQVAgMy4xMS4wIG9yIGxhdGVyXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3NldEJhc2VEaW1lbnNpb25zKCk7XG5cbiAgICAgICAgX2FkZExpc3RlbmVyKF9kb2MsIFwic2Nyb2xsXCIsIF9vblNjcm9sbCk7IC8vIHNvbWUgYnJvd3NlcnMgKGxpa2UgQ2hyb21lKSwgdGhlIHdpbmRvdyBzdG9wcyBkaXNwYXRjaGluZyBzY3JvbGwgZXZlbnRzIG9uIHRoZSB3aW5kb3cgaWYgeW91IHNjcm9sbCByZWFsbHkgZmFzdCwgYnV0IGl0J3MgY29uc2lzdGVudCBvbiB0aGUgZG9jdW1lbnQhXG5cblxuICAgICAgICB2YXIgYm9keVN0eWxlID0gX2JvZHkuc3R5bGUsXG4gICAgICAgICAgICBib3JkZXIgPSBib2R5U3R5bGUuYm9yZGVyVG9wU3R5bGUsXG4gICAgICAgICAgICBBbmltYXRpb25Qcm90byA9IGdzYXAuY29yZS5BbmltYXRpb24ucHJvdG90eXBlLFxuICAgICAgICAgICAgYm91bmRzLFxuICAgICAgICAgICAgaTtcbiAgICAgICAgQW5pbWF0aW9uUHJvdG8ucmV2ZXJ0IHx8IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBbmltYXRpb25Qcm90bywgXCJyZXZlcnRcIiwge1xuICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRpbWUoLTAuMDEsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7IC8vIG9ubHkgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IChBbmltYXRpb24ucmV2ZXJ0KCkgd2FzIGFkZGVkIGFmdGVyIDMuMTAuNClcblxuICAgICAgICBib2R5U3R5bGUuYm9yZGVyVG9wU3R5bGUgPSBcInNvbGlkXCI7IC8vIHdvcmtzIGFyb3VuZCBhbiBpc3N1ZSB3aGVyZSBhIG1hcmdpbiBvZiBhIGNoaWxkIGVsZW1lbnQgY291bGQgdGhyb3cgb2ZmIHRoZSBib3VuZHMgb2YgdGhlIF9ib2R5LCBtYWtpbmcgaXQgc2VlbSBsaWtlIHRoZXJlJ3MgYSBtYXJnaW4gd2hlbiB0aGVyZSBhY3R1YWxseSBpc24ndC4gVGhlIGJvcmRlciBlbnN1cmVzIHRoYXQgdGhlIGJvdW5kcyBhcmUgYWNjdXJhdGUuXG5cbiAgICAgICAgYm91bmRzID0gX2dldEJvdW5kcyhfYm9keSk7XG4gICAgICAgIF92ZXJ0aWNhbC5tID0gTWF0aC5yb3VuZChib3VuZHMudG9wICsgX3ZlcnRpY2FsLnNjKCkpIHx8IDA7IC8vIGFjY29tbW9kYXRlIHRoZSBvZmZzZXQgb2YgdGhlIDxib2R5PiBjYXVzZWQgYnkgbWFyZ2lucyBhbmQvb3IgcGFkZGluZ1xuXG4gICAgICAgIF9ob3Jpem9udGFsLm0gPSBNYXRoLnJvdW5kKGJvdW5kcy5sZWZ0ICsgX2hvcml6b250YWwuc2MoKSkgfHwgMDtcbiAgICAgICAgYm9yZGVyID8gYm9keVN0eWxlLmJvcmRlclRvcFN0eWxlID0gYm9yZGVyIDogYm9keVN0eWxlLnJlbW92ZVByb3BlcnR5KFwiYm9yZGVyLXRvcC1zdHlsZVwiKTsgLy8gVE9ETzogKD8pIG1heWJlIG1vdmUgdG8gbGV2ZXJhZ2luZyB0aGUgdmVsb2NpdHkgbWVjaGFuaXNtIGluIE9ic2VydmVyIGFuZCBza2lwIGludGVydmFscy5cblxuICAgICAgICBfc3luY0ludGVydmFsID0gc2V0SW50ZXJ2YWwoX3N5bmMsIDI1MCk7XG4gICAgICAgIGdzYXAuZGVsYXllZENhbGwoMC41LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF9zdGFydHVwID0gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX2FkZExpc3RlbmVyKF9kb2MsIFwidG91Y2hjYW5jZWxcIiwgX3Bhc3NUaHJvdWdoKTsgLy8gc29tZSBvbGRlciBBbmRyb2lkIGRldmljZXMgaW50ZXJtaXR0ZW50bHkgc3RvcCBkaXNwYXRjaGluZyBcInRvdWNobW92ZVwiIGV2ZW50cyBpZiB3ZSBkb24ndCBsaXN0ZW4gZm9yIFwidG91Y2hjYW5jZWxcIiBvbiB0aGUgZG9jdW1lbnQuXG5cblxuICAgICAgICBfYWRkTGlzdGVuZXIoX2JvZHksIFwidG91Y2hzdGFydFwiLCBfcGFzc1Rocm91Z2gpOyAvL3dvcmtzIGFyb3VuZCBTYWZhcmkgYnVnOiBodHRwczovL2dyZWVuc29jay5jb20vZm9ydW1zL3RvcGljLzIxNDUwLWRyYWdnYWJsZS1pbi1pZnJhbWUtb24tbW9iaWxlLWlzLWJ1Z2d5L1xuXG5cbiAgICAgICAgX211bHRpTGlzdGVuZXIoX2FkZExpc3RlbmVyLCBfZG9jLCBcInBvaW50ZXJkb3duLHRvdWNoc3RhcnQsbW91c2Vkb3duXCIsIF9wb2ludGVyRG93bkhhbmRsZXIpO1xuXG4gICAgICAgIF9tdWx0aUxpc3RlbmVyKF9hZGRMaXN0ZW5lciwgX2RvYywgXCJwb2ludGVydXAsdG91Y2hlbmQsbW91c2V1cFwiLCBfcG9pbnRlclVwSGFuZGxlcik7XG5cbiAgICAgICAgX3RyYW5zZm9ybVByb3AgPSBnc2FwLnV0aWxzLmNoZWNrUHJlZml4KFwidHJhbnNmb3JtXCIpO1xuXG4gICAgICAgIF9zdGF0ZVByb3BzLnB1c2goX3RyYW5zZm9ybVByb3ApO1xuXG4gICAgICAgIF9jb3JlSW5pdHRlZCA9IF9nZXRUaW1lKCk7XG4gICAgICAgIF9yZXNpemVEZWxheSA9IGdzYXAuZGVsYXllZENhbGwoMC4yLCBfcmVmcmVzaEFsbCkucGF1c2UoKTtcbiAgICAgICAgX2F1dG9SZWZyZXNoID0gW19kb2MsIFwidmlzaWJpbGl0eWNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHcgPSBfd2luLmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgIGggPSBfd2luLmlubmVySGVpZ2h0O1xuXG4gICAgICAgICAgaWYgKF9kb2MuaGlkZGVuKSB7XG4gICAgICAgICAgICBfcHJldldpZHRoID0gdztcbiAgICAgICAgICAgIF9wcmV2SGVpZ2h0ID0gaDtcbiAgICAgICAgICB9IGVsc2UgaWYgKF9wcmV2V2lkdGggIT09IHcgfHwgX3ByZXZIZWlnaHQgIT09IGgpIHtcbiAgICAgICAgICAgIF9vblJlc2l6ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgX2RvYywgXCJET01Db250ZW50TG9hZGVkXCIsIF9yZWZyZXNoQWxsLCBfd2luLCBcImxvYWRcIiwgX3JlZnJlc2hBbGwsIF93aW4sIFwicmVzaXplXCIsIF9vblJlc2l6ZV07XG5cbiAgICAgICAgX2l0ZXJhdGVBdXRvUmVmcmVzaChfYWRkTGlzdGVuZXIpO1xuXG4gICAgICAgIF90cmlnZ2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh0cmlnZ2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHRyaWdnZXIuZW5hYmxlKDAsIDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgX3Njcm9sbGVycy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICAgIF93aGVlbExpc3RlbmVyKF9yZW1vdmVMaXN0ZW5lciwgX3Njcm9sbGVyc1tpXSwgX3Njcm9sbGVyc1tpICsgMV0pO1xuXG4gICAgICAgICAgX3doZWVsTGlzdGVuZXIoX3JlbW92ZUxpc3RlbmVyLCBfc2Nyb2xsZXJzW2ldLCBfc2Nyb2xsZXJzW2kgKyAyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgU2Nyb2xsVHJpZ2dlci5jb25maWcgPSBmdW5jdGlvbiBjb25maWcodmFycykge1xuICAgIFwibGltaXRDYWxsYmFja3NcIiBpbiB2YXJzICYmIChfbGltaXRDYWxsYmFja3MgPSAhIXZhcnMubGltaXRDYWxsYmFja3MpO1xuICAgIHZhciBtcyA9IHZhcnMuc3luY0ludGVydmFsO1xuICAgIG1zICYmIGNsZWFySW50ZXJ2YWwoX3N5bmNJbnRlcnZhbCkgfHwgKF9zeW5jSW50ZXJ2YWwgPSBtcykgJiYgc2V0SW50ZXJ2YWwoX3N5bmMsIG1zKTtcbiAgICBcImlnbm9yZU1vYmlsZVJlc2l6ZVwiIGluIHZhcnMgJiYgKF9pZ25vcmVNb2JpbGVSZXNpemUgPSBTY3JvbGxUcmlnZ2VyLmlzVG91Y2ggPT09IDEgJiYgdmFycy5pZ25vcmVNb2JpbGVSZXNpemUpO1xuXG4gICAgaWYgKFwiYXV0b1JlZnJlc2hFdmVudHNcIiBpbiB2YXJzKSB7XG4gICAgICBfaXRlcmF0ZUF1dG9SZWZyZXNoKF9yZW1vdmVMaXN0ZW5lcikgfHwgX2l0ZXJhdGVBdXRvUmVmcmVzaChfYWRkTGlzdGVuZXIsIHZhcnMuYXV0b1JlZnJlc2hFdmVudHMgfHwgXCJub25lXCIpO1xuICAgICAgX2lnbm9yZVJlc2l6ZSA9ICh2YXJzLmF1dG9SZWZyZXNoRXZlbnRzICsgXCJcIikuaW5kZXhPZihcInJlc2l6ZVwiKSA9PT0gLTE7XG4gICAgfVxuICB9O1xuXG4gIFNjcm9sbFRyaWdnZXIuc2Nyb2xsZXJQcm94eSA9IGZ1bmN0aW9uIHNjcm9sbGVyUHJveHkodGFyZ2V0LCB2YXJzKSB7XG4gICAgdmFyIHQgPSBfZ2V0VGFyZ2V0KHRhcmdldCksXG4gICAgICAgIGkgPSBfc2Nyb2xsZXJzLmluZGV4T2YodCksXG4gICAgICAgIGlzVmlld3BvcnQgPSBfaXNWaWV3cG9ydCh0KTtcblxuICAgIGlmICh+aSkge1xuICAgICAgX3Njcm9sbGVycy5zcGxpY2UoaSwgaXNWaWV3cG9ydCA/IDYgOiAyKTtcbiAgICB9XG5cbiAgICBpZiAodmFycykge1xuICAgICAgaXNWaWV3cG9ydCA/IF9wcm94aWVzLnVuc2hpZnQoX3dpbiwgdmFycywgX2JvZHksIHZhcnMsIF9kb2NFbCwgdmFycykgOiBfcHJveGllcy51bnNoaWZ0KHQsIHZhcnMpO1xuICAgIH1cbiAgfTtcblxuICBTY3JvbGxUcmlnZ2VyLmNsZWFyTWF0Y2hNZWRpYSA9IGZ1bmN0aW9uIGNsZWFyTWF0Y2hNZWRpYShxdWVyeSkge1xuICAgIF90cmlnZ2Vycy5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG4gICAgICByZXR1cm4gdC5fY3R4ICYmIHQuX2N0eC5xdWVyeSA9PT0gcXVlcnkgJiYgdC5fY3R4LmtpbGwodHJ1ZSwgdHJ1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgU2Nyb2xsVHJpZ2dlci5pc0luVmlld3BvcnQgPSBmdW5jdGlvbiBpc0luVmlld3BvcnQoZWxlbWVudCwgcmF0aW8sIGhvcml6b250YWwpIHtcbiAgICB2YXIgYm91bmRzID0gKF9pc1N0cmluZyhlbGVtZW50KSA/IF9nZXRUYXJnZXQoZWxlbWVudCkgOiBlbGVtZW50KS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgb2Zmc2V0ID0gYm91bmRzW2hvcml6b250YWwgPyBfd2lkdGggOiBfaGVpZ2h0XSAqIHJhdGlvIHx8IDA7XG4gICAgcmV0dXJuIGhvcml6b250YWwgPyBib3VuZHMucmlnaHQgLSBvZmZzZXQgPiAwICYmIGJvdW5kcy5sZWZ0ICsgb2Zmc2V0IDwgX3dpbi5pbm5lcldpZHRoIDogYm91bmRzLmJvdHRvbSAtIG9mZnNldCA+IDAgJiYgYm91bmRzLnRvcCArIG9mZnNldCA8IF93aW4uaW5uZXJIZWlnaHQ7XG4gIH07XG5cbiAgU2Nyb2xsVHJpZ2dlci5wb3NpdGlvbkluVmlld3BvcnQgPSBmdW5jdGlvbiBwb3NpdGlvbkluVmlld3BvcnQoZWxlbWVudCwgcmVmZXJlbmNlUG9pbnQsIGhvcml6b250YWwpIHtcbiAgICBfaXNTdHJpbmcoZWxlbWVudCkgJiYgKGVsZW1lbnQgPSBfZ2V0VGFyZ2V0KGVsZW1lbnQpKTtcbiAgICB2YXIgYm91bmRzID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgc2l6ZSA9IGJvdW5kc1tob3Jpem9udGFsID8gX3dpZHRoIDogX2hlaWdodF0sXG4gICAgICAgIG9mZnNldCA9IHJlZmVyZW5jZVBvaW50ID09IG51bGwgPyBzaXplIC8gMiA6IHJlZmVyZW5jZVBvaW50IGluIF9rZXl3b3JkcyA/IF9rZXl3b3Jkc1tyZWZlcmVuY2VQb2ludF0gKiBzaXplIDogfnJlZmVyZW5jZVBvaW50LmluZGV4T2YoXCIlXCIpID8gcGFyc2VGbG9hdChyZWZlcmVuY2VQb2ludCkgKiBzaXplIC8gMTAwIDogcGFyc2VGbG9hdChyZWZlcmVuY2VQb2ludCkgfHwgMDtcbiAgICByZXR1cm4gaG9yaXpvbnRhbCA/IChib3VuZHMubGVmdCArIG9mZnNldCkgLyBfd2luLmlubmVyV2lkdGggOiAoYm91bmRzLnRvcCArIG9mZnNldCkgLyBfd2luLmlubmVySGVpZ2h0O1xuICB9O1xuXG4gIFNjcm9sbFRyaWdnZXIua2lsbEFsbCA9IGZ1bmN0aW9uIGtpbGxBbGwoYWxsb3dMaXN0ZW5lcnMpIHtcbiAgICBfdHJpZ2dlcnMuc2xpY2UoMCkuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuICAgICAgcmV0dXJuIHQudmFycy5pZCAhPT0gXCJTY3JvbGxTbW9vdGhlclwiICYmIHQua2lsbCgpO1xuICAgIH0pO1xuXG4gICAgaWYgKGFsbG93TGlzdGVuZXJzICE9PSB0cnVlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gX2xpc3RlbmVycy5raWxsQWxsIHx8IFtdO1xuICAgICAgX2xpc3RlbmVycyA9IHt9O1xuICAgICAgbGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gU2Nyb2xsVHJpZ2dlcjtcbn0oKTtcblNjcm9sbFRyaWdnZXIudmVyc2lvbiA9IFwiMy4xMS41XCI7XG5cblNjcm9sbFRyaWdnZXIuc2F2ZVN0eWxlcyA9IGZ1bmN0aW9uICh0YXJnZXRzKSB7XG4gIHJldHVybiB0YXJnZXRzID8gX3RvQXJyYXkodGFyZ2V0cykuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgLy8gc2F2ZWQgc3R5bGVzIGFyZSByZWNvcmRlZCBpbiBhIGNvbnNlY3V0aXZlIGFsdGVybmF0aW5nIEFycmF5LCBsaWtlIFtlbGVtZW50LCBjc3NUZXh0LCB0cmFuc2Zvcm0gYXR0cmlidXRlLCBjYWNoZSwgbWF0Y2hNZWRpYSwgLi4uXVxuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LnN0eWxlKSB7XG4gICAgICB2YXIgaSA9IF9zYXZlZFN0eWxlcy5pbmRleE9mKHRhcmdldCk7XG5cbiAgICAgIGkgPj0gMCAmJiBfc2F2ZWRTdHlsZXMuc3BsaWNlKGksIDUpO1xuXG4gICAgICBfc2F2ZWRTdHlsZXMucHVzaCh0YXJnZXQsIHRhcmdldC5zdHlsZS5jc3NUZXh0LCB0YXJnZXQuZ2V0QkJveCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIpLCBnc2FwLmNvcmUuZ2V0Q2FjaGUodGFyZ2V0KSwgX2NvbnRleHQoKSk7XG4gICAgfVxuICB9KSA6IF9zYXZlZFN0eWxlcztcbn07XG5cblNjcm9sbFRyaWdnZXIucmV2ZXJ0ID0gZnVuY3Rpb24gKHNvZnQsIG1lZGlhKSB7XG4gIHJldHVybiBfcmV2ZXJ0QWxsKCFzb2Z0LCBtZWRpYSk7XG59O1xuXG5TY3JvbGxUcmlnZ2VyLmNyZWF0ZSA9IGZ1bmN0aW9uICh2YXJzLCBhbmltYXRpb24pIHtcbiAgcmV0dXJuIG5ldyBTY3JvbGxUcmlnZ2VyKHZhcnMsIGFuaW1hdGlvbik7XG59O1xuXG5TY3JvbGxUcmlnZ2VyLnJlZnJlc2ggPSBmdW5jdGlvbiAoc2FmZSkge1xuICByZXR1cm4gc2FmZSA/IF9vblJlc2l6ZSgpIDogKF9jb3JlSW5pdHRlZCB8fCBTY3JvbGxUcmlnZ2VyLnJlZ2lzdGVyKCkpICYmIF9yZWZyZXNoQWxsKHRydWUpO1xufTtcblxuU2Nyb2xsVHJpZ2dlci51cGRhdGUgPSBmdW5jdGlvbiAoZm9yY2UpIHtcbiAgcmV0dXJuICsrX3Njcm9sbGVycy5jYWNoZSAmJiBfdXBkYXRlQWxsKGZvcmNlID09PSB0cnVlID8gMiA6IDApO1xufTtcblxuU2Nyb2xsVHJpZ2dlci5jbGVhclNjcm9sbE1lbW9yeSA9IF9jbGVhclNjcm9sbE1lbW9yeTtcblxuU2Nyb2xsVHJpZ2dlci5tYXhTY3JvbGwgPSBmdW5jdGlvbiAoZWxlbWVudCwgaG9yaXpvbnRhbCkge1xuICByZXR1cm4gX21heFNjcm9sbChlbGVtZW50LCBob3Jpem9udGFsID8gX2hvcml6b250YWwgOiBfdmVydGljYWwpO1xufTtcblxuU2Nyb2xsVHJpZ2dlci5nZXRTY3JvbGxGdW5jID0gZnVuY3Rpb24gKGVsZW1lbnQsIGhvcml6b250YWwpIHtcbiAgcmV0dXJuIF9nZXRTY3JvbGxGdW5jKF9nZXRUYXJnZXQoZWxlbWVudCksIGhvcml6b250YWwgPyBfaG9yaXpvbnRhbCA6IF92ZXJ0aWNhbCk7XG59O1xuXG5TY3JvbGxUcmlnZ2VyLmdldEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgcmV0dXJuIF9pZHNbaWRdO1xufTtcblxuU2Nyb2xsVHJpZ2dlci5nZXRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBfdHJpZ2dlcnMuZmlsdGVyKGZ1bmN0aW9uICh0KSB7XG4gICAgcmV0dXJuIHQudmFycy5pZCAhPT0gXCJTY3JvbGxTbW9vdGhlclwiO1xuICB9KTtcbn07IC8vIGl0J3MgY29tbW9uIGZvciBwZW9wbGUgdG8gU2Nyb2xsVHJpZ2dlci5nZXRBbGwodCA9PiB0LmtpbGwoKSkgb24gcGFnZSByb3V0ZXMsIGZvciBleGFtcGxlLCBhbmQgd2UgZG9uJ3Qgd2FudCBpdCB0byBydWluIHNtb290aCBzY3JvbGxpbmcgYnkga2lsbGluZyB0aGUgbWFpbiBTY3JvbGxTbW9vdGhlciBvbmUuXG5cblxuU2Nyb2xsVHJpZ2dlci5pc1Njcm9sbGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICEhX2xhc3RTY3JvbGxUaW1lO1xufTtcblxuU2Nyb2xsVHJpZ2dlci5zbmFwRGlyZWN0aW9uYWwgPSBfc25hcERpcmVjdGlvbmFsO1xuXG5TY3JvbGxUcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2spIHtcbiAgdmFyIGEgPSBfbGlzdGVuZXJzW3R5cGVdIHx8IChfbGlzdGVuZXJzW3R5cGVdID0gW10pO1xuICB+YS5pbmRleE9mKGNhbGxiYWNrKSB8fCBhLnB1c2goY2FsbGJhY2spO1xufTtcblxuU2Nyb2xsVHJpZ2dlci5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrKSB7XG4gIHZhciBhID0gX2xpc3RlbmVyc1t0eXBlXSxcbiAgICAgIGkgPSBhICYmIGEuaW5kZXhPZihjYWxsYmFjayk7XG4gIGkgPj0gMCAmJiBhLnNwbGljZShpLCAxKTtcbn07XG5cblNjcm9sbFRyaWdnZXIuYmF0Y2ggPSBmdW5jdGlvbiAodGFyZ2V0cywgdmFycykge1xuICB2YXIgcmVzdWx0ID0gW10sXG4gICAgICB2YXJzQ29weSA9IHt9LFxuICAgICAgaW50ZXJ2YWwgPSB2YXJzLmludGVydmFsIHx8IDAuMDE2LFxuICAgICAgYmF0Y2hNYXggPSB2YXJzLmJhdGNoTWF4IHx8IDFlOSxcbiAgICAgIHByb3h5Q2FsbGJhY2sgPSBmdW5jdGlvbiBwcm94eUNhbGxiYWNrKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGVsZW1lbnRzID0gW10sXG4gICAgICAgIHRyaWdnZXJzID0gW10sXG4gICAgICAgIGRlbGF5ID0gZ3NhcC5kZWxheWVkQ2FsbChpbnRlcnZhbCwgZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGJhY2soZWxlbWVudHMsIHRyaWdnZXJzKTtcbiAgICAgIGVsZW1lbnRzID0gW107XG4gICAgICB0cmlnZ2VycyA9IFtdO1xuICAgIH0pLnBhdXNlKCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgICBlbGVtZW50cy5sZW5ndGggfHwgZGVsYXkucmVzdGFydCh0cnVlKTtcbiAgICAgIGVsZW1lbnRzLnB1c2goc2VsZi50cmlnZ2VyKTtcbiAgICAgIHRyaWdnZXJzLnB1c2goc2VsZik7XG4gICAgICBiYXRjaE1heCA8PSBlbGVtZW50cy5sZW5ndGggJiYgZGVsYXkucHJvZ3Jlc3MoMSk7XG4gICAgfTtcbiAgfSxcbiAgICAgIHA7XG5cbiAgZm9yIChwIGluIHZhcnMpIHtcbiAgICB2YXJzQ29weVtwXSA9IHAuc3Vic3RyKDAsIDIpID09PSBcIm9uXCIgJiYgX2lzRnVuY3Rpb24odmFyc1twXSkgJiYgcCAhPT0gXCJvblJlZnJlc2hJbml0XCIgPyBwcm94eUNhbGxiYWNrKHAsIHZhcnNbcF0pIDogdmFyc1twXTtcbiAgfVxuXG4gIGlmIChfaXNGdW5jdGlvbihiYXRjaE1heCkpIHtcbiAgICBiYXRjaE1heCA9IGJhdGNoTWF4KCk7XG5cbiAgICBfYWRkTGlzdGVuZXIoU2Nyb2xsVHJpZ2dlciwgXCJyZWZyZXNoXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBiYXRjaE1heCA9IHZhcnMuYmF0Y2hNYXgoKTtcbiAgICB9KTtcbiAgfVxuXG4gIF90b0FycmF5KHRhcmdldHMpLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIHZhciBjb25maWcgPSB7fTtcblxuICAgIGZvciAocCBpbiB2YXJzQ29weSkge1xuICAgICAgY29uZmlnW3BdID0gdmFyc0NvcHlbcF07XG4gICAgfVxuXG4gICAgY29uZmlnLnRyaWdnZXIgPSB0YXJnZXQ7XG4gICAgcmVzdWx0LnB1c2goU2Nyb2xsVHJpZ2dlci5jcmVhdGUoY29uZmlnKSk7XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59OyAvLyB0byByZWR1Y2UgZmlsZSBzaXplLiBjbGFtcHMgdGhlIHNjcm9sbCBhbmQgYWxzbyByZXR1cm5zIGEgZHVyYXRpb24gbXVsdGlwbGllciBzbyB0aGF0IGlmIHRoZSBzY3JvbGwgZ2V0cyBjaG9wcGVkIHNob3J0ZXIsIHRoZSBkdXJhdGlvbiBnZXRzIGN1cnRhaWxlZCBhcyB3ZWxsIChvdGhlcndpc2UgaWYgeW91J3JlIHZlcnkgY2xvc2UgdG8gdGhlIHRvcCBvZiB0aGUgcGFnZSwgZm9yIGV4YW1wbGUsIGFuZCBzd2lwZSB1cCByZWFsbHkgZmFzdCwgaXQnbGwgc3VkZGVubHkgc2xvdyBkb3duIGFuZCB0YWtlIGEgbG9uZyB0aW1lIHRvIHJlYWNoIHRoZSB0b3ApLlxuXG5cbnZhciBfY2xhbXBTY3JvbGxBbmRHZXREdXJhdGlvbk11bHRpcGxpZXIgPSBmdW5jdGlvbiBfY2xhbXBTY3JvbGxBbmRHZXREdXJhdGlvbk11bHRpcGxpZXIoc2Nyb2xsRnVuYywgY3VycmVudCwgZW5kLCBtYXgpIHtcbiAgY3VycmVudCA+IG1heCA/IHNjcm9sbEZ1bmMobWF4KSA6IGN1cnJlbnQgPCAwICYmIHNjcm9sbEZ1bmMoMCk7XG4gIHJldHVybiBlbmQgPiBtYXggPyAobWF4IC0gY3VycmVudCkgLyAoZW5kIC0gY3VycmVudCkgOiBlbmQgPCAwID8gY3VycmVudCAvIChjdXJyZW50IC0gZW5kKSA6IDE7XG59LFxuICAgIF9hbGxvd05hdGl2ZVBhbm5pbmcgPSBmdW5jdGlvbiBfYWxsb3dOYXRpdmVQYW5uaW5nKHRhcmdldCwgZGlyZWN0aW9uKSB7XG4gIGlmIChkaXJlY3Rpb24gPT09IHRydWUpIHtcbiAgICB0YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJ0b3VjaC1hY3Rpb25cIik7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0LnN0eWxlLnRvdWNoQWN0aW9uID0gZGlyZWN0aW9uID09PSB0cnVlID8gXCJhdXRvXCIgOiBkaXJlY3Rpb24gPyBcInBhbi1cIiArIGRpcmVjdGlvbiArIChPYnNlcnZlci5pc1RvdWNoID8gXCIgcGluY2gtem9vbVwiIDogXCJcIikgOiBcIm5vbmVcIjsgLy8gbm90ZTogRmlyZWZveCBkb2Vzbid0IHN1cHBvcnQgaXQgcGluY2gtem9vbSBwcm9wZXJseSwgYXQgbGVhc3QgaW4gYWRkaXRpb24gdG8gYSBwYW4teCBvciBwYW4teS5cbiAgfVxuXG4gIHRhcmdldCA9PT0gX2RvY0VsICYmIF9hbGxvd05hdGl2ZVBhbm5pbmcoX2JvZHksIGRpcmVjdGlvbik7XG59LFxuICAgIF9vdmVyZmxvdyA9IHtcbiAgYXV0bzogMSxcbiAgc2Nyb2xsOiAxXG59LFxuICAgIF9uZXN0ZWRTY3JvbGwgPSBmdW5jdGlvbiBfbmVzdGVkU2Nyb2xsKF9yZWY1KSB7XG4gIHZhciBldmVudCA9IF9yZWY1LmV2ZW50LFxuICAgICAgdGFyZ2V0ID0gX3JlZjUudGFyZ2V0LFxuICAgICAgYXhpcyA9IF9yZWY1LmF4aXM7XG5cbiAgdmFyIG5vZGUgPSAoZXZlbnQuY2hhbmdlZFRvdWNoZXMgPyBldmVudC5jaGFuZ2VkVG91Y2hlc1swXSA6IGV2ZW50KS50YXJnZXQsXG4gICAgICBjYWNoZSA9IG5vZGUuX2dzYXAgfHwgZ3NhcC5jb3JlLmdldENhY2hlKG5vZGUpLFxuICAgICAgdGltZSA9IF9nZXRUaW1lKCksXG4gICAgICBjcztcblxuICBpZiAoIWNhY2hlLl9pc1Njcm9sbFQgfHwgdGltZSAtIGNhY2hlLl9pc1Njcm9sbFQgPiAyMDAwKSB7XG4gICAgLy8gY2FjaGUgZm9yIDIgc2Vjb25kcyB0byBpbXByb3ZlIHBlcmZvcm1hbmNlLlxuICAgIHdoaWxlIChub2RlICYmIG5vZGUgIT09IF9ib2R5ICYmIChub2RlLnNjcm9sbEhlaWdodCA8PSBub2RlLmNsaWVudEhlaWdodCAmJiBub2RlLnNjcm9sbFdpZHRoIDw9IG5vZGUuY2xpZW50V2lkdGggfHwgIShfb3ZlcmZsb3dbKGNzID0gX2dldENvbXB1dGVkU3R5bGUobm9kZSkpLm92ZXJmbG93WV0gfHwgX292ZXJmbG93W2NzLm92ZXJmbG93WF0pKSkge1xuICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICBjYWNoZS5faXNTY3JvbGwgPSBub2RlICYmIG5vZGUgIT09IHRhcmdldCAmJiAhX2lzVmlld3BvcnQobm9kZSkgJiYgKF9vdmVyZmxvd1soY3MgPSBfZ2V0Q29tcHV0ZWRTdHlsZShub2RlKSkub3ZlcmZsb3dZXSB8fCBfb3ZlcmZsb3dbY3Mub3ZlcmZsb3dYXSk7XG4gICAgY2FjaGUuX2lzU2Nyb2xsVCA9IHRpbWU7XG4gIH1cblxuICBpZiAoY2FjaGUuX2lzU2Nyb2xsIHx8IGF4aXMgPT09IFwieFwiKSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQuX2dzYXBBbGxvdyA9IHRydWU7XG4gIH1cbn0sXG4gICAgLy8gY2FwdHVyZSBldmVudHMgb24gc2Nyb2xsYWJsZSBlbGVtZW50cyBJTlNJREUgdGhlIDxib2R5PiBhbmQgYWxsb3cgdGhvc2UgYnkgY2FsbGluZyBzdG9wUHJvcGFnYXRpb24oKSB3aGVuIHdlIGZpbmQgYSBzY3JvbGxhYmxlIGFuY2VzdG9yXG5faW5wdXRPYnNlcnZlciA9IGZ1bmN0aW9uIF9pbnB1dE9ic2VydmVyKHRhcmdldCwgdHlwZSwgaW5wdXRzLCBuZXN0ZWQpIHtcbiAgcmV0dXJuIE9ic2VydmVyLmNyZWF0ZSh7XG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgY2FwdHVyZTogdHJ1ZSxcbiAgICBkZWJvdW5jZTogZmFsc2UsXG4gICAgbG9ja0F4aXM6IHRydWUsXG4gICAgdHlwZTogdHlwZSxcbiAgICBvbldoZWVsOiBuZXN0ZWQgPSBuZXN0ZWQgJiYgX25lc3RlZFNjcm9sbCxcbiAgICBvblByZXNzOiBuZXN0ZWQsXG4gICAgb25EcmFnOiBuZXN0ZWQsXG4gICAgb25TY3JvbGw6IG5lc3RlZCxcbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gb25FbmFibGUoKSB7XG4gICAgICByZXR1cm4gaW5wdXRzICYmIF9hZGRMaXN0ZW5lcihfZG9jLCBPYnNlcnZlci5ldmVudFR5cGVzWzBdLCBfY2FwdHVyZUlucHV0cywgZmFsc2UsIHRydWUpO1xuICAgIH0sXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiBvbkRpc2FibGUoKSB7XG4gICAgICByZXR1cm4gX3JlbW92ZUxpc3RlbmVyKF9kb2MsIE9ic2VydmVyLmV2ZW50VHlwZXNbMF0sIF9jYXB0dXJlSW5wdXRzLCB0cnVlKTtcbiAgICB9XG4gIH0pO1xufSxcbiAgICBfaW5wdXRFeHAgPSAvKGlucHV0fGxhYmVsfHNlbGVjdHx0ZXh0YXJlYSkvaSxcbiAgICBfaW5wdXRJc0ZvY3VzZWQsXG4gICAgX2NhcHR1cmVJbnB1dHMgPSBmdW5jdGlvbiBfY2FwdHVyZUlucHV0cyhlKSB7XG4gIHZhciBpc0lucHV0ID0gX2lucHV0RXhwLnRlc3QoZS50YXJnZXQudGFnTmFtZSk7XG5cbiAgaWYgKGlzSW5wdXQgfHwgX2lucHV0SXNGb2N1c2VkKSB7XG4gICAgZS5fZ3NhcEFsbG93ID0gdHJ1ZTtcbiAgICBfaW5wdXRJc0ZvY3VzZWQgPSBpc0lucHV0O1xuICB9XG59LFxuICAgIF9nZXRTY3JvbGxOb3JtYWxpemVyID0gZnVuY3Rpb24gX2dldFNjcm9sbE5vcm1hbGl6ZXIodmFycykge1xuICBfaXNPYmplY3QodmFycykgfHwgKHZhcnMgPSB7fSk7XG4gIHZhcnMucHJldmVudERlZmF1bHQgPSB2YXJzLmlzTm9ybWFsaXplciA9IHZhcnMuYWxsb3dDbGlja3MgPSB0cnVlO1xuICB2YXJzLnR5cGUgfHwgKHZhcnMudHlwZSA9IFwid2hlZWwsdG91Y2hcIik7XG4gIHZhcnMuZGVib3VuY2UgPSAhIXZhcnMuZGVib3VuY2U7XG4gIHZhcnMuaWQgPSB2YXJzLmlkIHx8IFwibm9ybWFsaXplclwiO1xuXG4gIHZhciBfdmFyczIgPSB2YXJzLFxuICAgICAgbm9ybWFsaXplU2Nyb2xsWCA9IF92YXJzMi5ub3JtYWxpemVTY3JvbGxYLFxuICAgICAgbW9tZW50dW0gPSBfdmFyczIubW9tZW50dW0sXG4gICAgICBhbGxvd05lc3RlZFNjcm9sbCA9IF92YXJzMi5hbGxvd05lc3RlZFNjcm9sbCxcbiAgICAgIG9uUmVsZWFzZSA9IF92YXJzMi5vblJlbGVhc2UsXG4gICAgICBzZWxmLFxuICAgICAgbWF4WSxcbiAgICAgIHRhcmdldCA9IF9nZXRUYXJnZXQodmFycy50YXJnZXQpIHx8IF9kb2NFbCxcbiAgICAgIHNtb290aGVyID0gZ3NhcC5jb3JlLmdsb2JhbHMoKS5TY3JvbGxTbW9vdGhlcixcbiAgICAgIHNtb290aGVySW5zdGFuY2UgPSBzbW9vdGhlciAmJiBzbW9vdGhlci5nZXQoKSxcbiAgICAgIGNvbnRlbnQgPSBfZml4SU9TQnVnICYmICh2YXJzLmNvbnRlbnQgJiYgX2dldFRhcmdldCh2YXJzLmNvbnRlbnQpIHx8IHNtb290aGVySW5zdGFuY2UgJiYgdmFycy5jb250ZW50ICE9PSBmYWxzZSAmJiAhc21vb3RoZXJJbnN0YW5jZS5zbW9vdGgoKSAmJiBzbW9vdGhlckluc3RhbmNlLmNvbnRlbnQoKSksXG4gICAgICBzY3JvbGxGdW5jWSA9IF9nZXRTY3JvbGxGdW5jKHRhcmdldCwgX3ZlcnRpY2FsKSxcbiAgICAgIHNjcm9sbEZ1bmNYID0gX2dldFNjcm9sbEZ1bmModGFyZ2V0LCBfaG9yaXpvbnRhbCksXG4gICAgICBzY2FsZSA9IDEsXG4gICAgICBpbml0aWFsU2NhbGUgPSAoT2JzZXJ2ZXIuaXNUb3VjaCAmJiBfd2luLnZpc3VhbFZpZXdwb3J0ID8gX3dpbi52aXN1YWxWaWV3cG9ydC5zY2FsZSAqIF93aW4udmlzdWFsVmlld3BvcnQud2lkdGggOiBfd2luLm91dGVyV2lkdGgpIC8gX3dpbi5pbm5lcldpZHRoLFxuICAgICAgd2hlZWxSZWZyZXNoID0gMCxcbiAgICAgIHJlc29sdmVNb21lbnR1bUR1cmF0aW9uID0gX2lzRnVuY3Rpb24obW9tZW50dW0pID8gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBtb21lbnR1bShzZWxmKTtcbiAgfSA6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbW9tZW50dW0gfHwgMi44O1xuICB9LFxuICAgICAgbGFzdFJlZnJlc2hJRCxcbiAgICAgIHNraXBUb3VjaE1vdmUsXG4gICAgICBpbnB1dE9ic2VydmVyID0gX2lucHV0T2JzZXJ2ZXIodGFyZ2V0LCB2YXJzLnR5cGUsIHRydWUsIGFsbG93TmVzdGVkU2Nyb2xsKSxcbiAgICAgIHJlc3VtZVRvdWNoTW92ZSA9IGZ1bmN0aW9uIHJlc3VtZVRvdWNoTW92ZSgpIHtcbiAgICByZXR1cm4gc2tpcFRvdWNoTW92ZSA9IGZhbHNlO1xuICB9LFxuICAgICAgc2Nyb2xsQ2xhbXBYID0gX3Bhc3NUaHJvdWdoLFxuICAgICAgc2Nyb2xsQ2xhbXBZID0gX3Bhc3NUaHJvdWdoLFxuICAgICAgdXBkYXRlQ2xhbXBzID0gZnVuY3Rpb24gdXBkYXRlQ2xhbXBzKCkge1xuICAgIG1heFkgPSBfbWF4U2Nyb2xsKHRhcmdldCwgX3ZlcnRpY2FsKTtcbiAgICBzY3JvbGxDbGFtcFkgPSBfY2xhbXAoX2ZpeElPU0J1ZyA/IDEgOiAwLCBtYXhZKTtcbiAgICBub3JtYWxpemVTY3JvbGxYICYmIChzY3JvbGxDbGFtcFggPSBfY2xhbXAoMCwgX21heFNjcm9sbCh0YXJnZXQsIF9ob3Jpem9udGFsKSkpO1xuICAgIGxhc3RSZWZyZXNoSUQgPSBfcmVmcmVzaElEO1xuICB9LFxuICAgICAgcmVtb3ZlQ29udGVudE9mZnNldCA9IGZ1bmN0aW9uIHJlbW92ZUNvbnRlbnRPZmZzZXQoKSB7XG4gICAgY29udGVudC5fZ3NhcC55ID0gX3JvdW5kKHBhcnNlRmxvYXQoY29udGVudC5fZ3NhcC55KSArIHNjcm9sbEZ1bmNZLm9mZnNldCkgKyBcInB4XCI7XG4gICAgY29udGVudC5zdHlsZS50cmFuc2Zvcm0gPSBcIm1hdHJpeDNkKDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIFwiICsgcGFyc2VGbG9hdChjb250ZW50Ll9nc2FwLnkpICsgXCIsIDAsIDEpXCI7XG4gICAgc2Nyb2xsRnVuY1kub2Zmc2V0ID0gc2Nyb2xsRnVuY1kuY2FjaGVJRCA9IDA7XG4gIH0sXG4gICAgICBpZ25vcmVEcmFnID0gZnVuY3Rpb24gaWdub3JlRHJhZygpIHtcbiAgICBpZiAoc2tpcFRvdWNoTW92ZSkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc3VtZVRvdWNoTW92ZSk7XG5cbiAgICAgIHZhciBvZmZzZXQgPSBfcm91bmQoc2VsZi5kZWx0YVkgLyAyKSxcbiAgICAgICAgICBzY3JvbGwgPSBzY3JvbGxDbGFtcFkoc2Nyb2xsRnVuY1kudiAtIG9mZnNldCk7XG5cbiAgICAgIGlmIChjb250ZW50ICYmIHNjcm9sbCAhPT0gc2Nyb2xsRnVuY1kudiArIHNjcm9sbEZ1bmNZLm9mZnNldCkge1xuICAgICAgICBzY3JvbGxGdW5jWS5vZmZzZXQgPSBzY3JvbGwgLSBzY3JvbGxGdW5jWS52O1xuXG4gICAgICAgIHZhciB5ID0gX3JvdW5kKChwYXJzZUZsb2F0KGNvbnRlbnQgJiYgY29udGVudC5fZ3NhcC55KSB8fCAwKSAtIHNjcm9sbEZ1bmNZLm9mZnNldCk7XG5cbiAgICAgICAgY29udGVudC5zdHlsZS50cmFuc2Zvcm0gPSBcIm1hdHJpeDNkKDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEsIDAsIDAsIFwiICsgeSArIFwiLCAwLCAxKVwiO1xuICAgICAgICBjb250ZW50Ll9nc2FwLnkgPSB5ICsgXCJweFwiO1xuICAgICAgICBzY3JvbGxGdW5jWS5jYWNoZUlEID0gX3Njcm9sbGVycy5jYWNoZTtcblxuICAgICAgICBfdXBkYXRlQWxsKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHNjcm9sbEZ1bmNZLm9mZnNldCAmJiByZW1vdmVDb250ZW50T2Zmc2V0KCk7XG4gICAgc2tpcFRvdWNoTW92ZSA9IHRydWU7XG4gIH0sXG4gICAgICB0d2VlbixcbiAgICAgIHN0YXJ0U2Nyb2xsWCxcbiAgICAgIHN0YXJ0U2Nyb2xsWSxcbiAgICAgIG9uU3RvcERlbGF5ZWRDYWxsLFxuICAgICAgb25SZXNpemUgPSBmdW5jdGlvbiBvblJlc2l6ZSgpIHtcbiAgICAvLyBpZiB0aGUgd2luZG93IHJlc2l6ZXMsIGxpa2Ugb24gYW4gaVBob25lIHdoaWNoIEFwcGxlIEZPUkNFUyB0aGUgYWRkcmVzcyBiYXIgdG8gc2hvdy9oaWRlIGV2ZW4gaWYgd2UgZXZlbnQucHJldmVudERlZmF1bHQoKSwgaXQgbWF5IGJlIHNjcm9sbGluZyB0b28gZmFyIG5vdyB0aGF0IHRoZSBhZGRyZXNzIGJhciBpcyBzaG93aW5nLCBzbyB3ZSBtdXN0IGR5bmFtaWNhbGx5IGFkanVzdCB0aGUgbW9tZW50dW0gdHdlZW4uXG4gICAgdXBkYXRlQ2xhbXBzKCk7XG5cbiAgICBpZiAodHdlZW4uaXNBY3RpdmUoKSAmJiB0d2Vlbi52YXJzLnNjcm9sbFkgPiBtYXhZKSB7XG4gICAgICBzY3JvbGxGdW5jWSgpID4gbWF4WSA/IHR3ZWVuLnByb2dyZXNzKDEpICYmIHNjcm9sbEZ1bmNZKG1heFkpIDogdHdlZW4ucmVzZXRUbyhcInNjcm9sbFlcIiwgbWF4WSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnRlbnQgJiYgZ3NhcC5zZXQoY29udGVudCwge1xuICAgIHk6IFwiKz0wXCJcbiAgfSk7IC8vIHRvIGVuc3VyZSB0aGVyZSdzIGEgY2FjaGUgKGVsZW1lbnQuX2dzYXApXG5cbiAgdmFycy5pZ25vcmVDaGVjayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgcmV0dXJuIF9maXhJT1NCdWcgJiYgZS50eXBlID09PSBcInRvdWNobW92ZVwiICYmIGlnbm9yZURyYWcoZSkgfHwgc2NhbGUgPiAxLjA1ICYmIGUudHlwZSAhPT0gXCJ0b3VjaHN0YXJ0XCIgfHwgc2VsZi5pc0dlc3R1cmluZyB8fCBlLnRvdWNoZXMgJiYgZS50b3VjaGVzLmxlbmd0aCA+IDE7XG4gIH07XG5cbiAgdmFycy5vblByZXNzID0gZnVuY3Rpb24gKCkge1xuICAgIHNraXBUb3VjaE1vdmUgPSBmYWxzZTtcbiAgICB2YXIgcHJldlNjYWxlID0gc2NhbGU7XG4gICAgc2NhbGUgPSBfcm91bmQoKF93aW4udmlzdWFsVmlld3BvcnQgJiYgX3dpbi52aXN1YWxWaWV3cG9ydC5zY2FsZSB8fCAxKSAvIGluaXRpYWxTY2FsZSk7XG4gICAgdHdlZW4ucGF1c2UoKTtcbiAgICBwcmV2U2NhbGUgIT09IHNjYWxlICYmIF9hbGxvd05hdGl2ZVBhbm5pbmcodGFyZ2V0LCBzY2FsZSA+IDEuMDEgPyB0cnVlIDogbm9ybWFsaXplU2Nyb2xsWCA/IGZhbHNlIDogXCJ4XCIpO1xuICAgIHN0YXJ0U2Nyb2xsWCA9IHNjcm9sbEZ1bmNYKCk7XG4gICAgc3RhcnRTY3JvbGxZID0gc2Nyb2xsRnVuY1koKTtcbiAgICB1cGRhdGVDbGFtcHMoKTtcbiAgICBsYXN0UmVmcmVzaElEID0gX3JlZnJlc2hJRDtcbiAgfTtcblxuICB2YXJzLm9uUmVsZWFzZSA9IHZhcnMub25HZXN0dXJlU3RhcnQgPSBmdW5jdGlvbiAoc2VsZiwgd2FzRHJhZ2dpbmcpIHtcbiAgICBzY3JvbGxGdW5jWS5vZmZzZXQgJiYgcmVtb3ZlQ29udGVudE9mZnNldCgpO1xuXG4gICAgaWYgKCF3YXNEcmFnZ2luZykge1xuICAgICAgb25TdG9wRGVsYXllZENhbGwucmVzdGFydCh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3Njcm9sbGVycy5jYWNoZSsrOyAvLyBtYWtlIHN1cmUgd2UncmUgcHVsbGluZyB0aGUgbm9uLWNhY2hlZCB2YWx1ZVxuICAgICAgLy8gYWx0ZXJuYXRlIGFsZ29yaXRobTogZHVyWCA9IE1hdGgubWluKDYsIE1hdGguYWJzKHNlbGYudmVsb2NpdHlYIC8gODAwKSksXHRkdXIgPSBNYXRoLm1heChkdXJYLCBNYXRoLm1pbig2LCBNYXRoLmFicyhzZWxmLnZlbG9jaXR5WSAvIDgwMCkpKTsgZHVyID0gZHVyICogKDAuNCArICgxIC0gX3Bvd2VyNEluKGR1ciAvIDYpKSAqIDAuNikpICogKG1vbWVudHVtU3BlZWQgfHwgMSlcblxuICAgICAgdmFyIGR1ciA9IHJlc29sdmVNb21lbnR1bUR1cmF0aW9uKCksXG4gICAgICAgICAgY3VycmVudFNjcm9sbCxcbiAgICAgICAgICBlbmRTY3JvbGw7XG5cbiAgICAgIGlmIChub3JtYWxpemVTY3JvbGxYKSB7XG4gICAgICAgIGN1cnJlbnRTY3JvbGwgPSBzY3JvbGxGdW5jWCgpO1xuICAgICAgICBlbmRTY3JvbGwgPSBjdXJyZW50U2Nyb2xsICsgZHVyICogMC4wNSAqIC1zZWxmLnZlbG9jaXR5WCAvIDAuMjI3OyAvLyB0aGUgY29uc3RhbnQgLjIyNyBpcyBmcm9tIHBvd2VyNCgwLjA1KS4gdmVsb2NpdHkgaXMgaW52ZXJ0ZWQgYmVjYXVzZSBzY3JvbGxpbmcgZ29lcyBpbiB0aGUgb3Bwb3NpdGUgZGlyZWN0aW9uLlxuXG4gICAgICAgIGR1ciAqPSBfY2xhbXBTY3JvbGxBbmRHZXREdXJhdGlvbk11bHRpcGxpZXIoc2Nyb2xsRnVuY1gsIGN1cnJlbnRTY3JvbGwsIGVuZFNjcm9sbCwgX21heFNjcm9sbCh0YXJnZXQsIF9ob3Jpem9udGFsKSk7XG4gICAgICAgIHR3ZWVuLnZhcnMuc2Nyb2xsWCA9IHNjcm9sbENsYW1wWChlbmRTY3JvbGwpO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50U2Nyb2xsID0gc2Nyb2xsRnVuY1koKTtcbiAgICAgIGVuZFNjcm9sbCA9IGN1cnJlbnRTY3JvbGwgKyBkdXIgKiAwLjA1ICogLXNlbGYudmVsb2NpdHlZIC8gMC4yMjc7IC8vIHRoZSBjb25zdGFudCAuMjI3IGlzIGZyb20gcG93ZXI0KDAuMDUpXG5cbiAgICAgIGR1ciAqPSBfY2xhbXBTY3JvbGxBbmRHZXREdXJhdGlvbk11bHRpcGxpZXIoc2Nyb2xsRnVuY1ksIGN1cnJlbnRTY3JvbGwsIGVuZFNjcm9sbCwgX21heFNjcm9sbCh0YXJnZXQsIF92ZXJ0aWNhbCkpO1xuICAgICAgdHdlZW4udmFycy5zY3JvbGxZID0gc2Nyb2xsQ2xhbXBZKGVuZFNjcm9sbCk7XG4gICAgICB0d2Vlbi5pbnZhbGlkYXRlKCkuZHVyYXRpb24oZHVyKS5wbGF5KDAuMDEpO1xuXG4gICAgICBpZiAoX2ZpeElPU0J1ZyAmJiB0d2Vlbi52YXJzLnNjcm9sbFkgPj0gbWF4WSB8fCBjdXJyZW50U2Nyb2xsID49IG1heFkgLSAxKSB7XG4gICAgICAgIC8vIGlPUyBidWc6IGl0J2xsIHNob3cgdGhlIGFkZHJlc3MgYmFyIGJ1dCBOT1QgZmlyZSB0aGUgd2luZG93IFwicmVzaXplXCIgZXZlbnQgdW50aWwgdGhlIGFuaW1hdGlvbiBpcyBkb25lIGJ1dCB3ZSBtdXN0IHByb3RlY3QgYWdhaW5zdCBvdmVyc2hvb3Qgc28gd2UgbGV2ZXJhZ2UgYW4gb25VcGRhdGUgdG8gZG8gc28uXG4gICAgICAgIGdzYXAudG8oe30sIHtcbiAgICAgICAgICBvblVwZGF0ZTogb25SZXNpemUsXG4gICAgICAgICAgZHVyYXRpb246IGR1clxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvblJlbGVhc2UgJiYgb25SZWxlYXNlKHNlbGYpO1xuICB9O1xuXG4gIHZhcnMub25XaGVlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0d2Vlbi5fdHMgJiYgdHdlZW4ucGF1c2UoKTtcblxuICAgIGlmIChfZ2V0VGltZSgpIC0gd2hlZWxSZWZyZXNoID4gMTAwMCkge1xuICAgICAgLy8gYWZ0ZXIgMSBzZWNvbmQsIHJlZnJlc2ggdGhlIGNsYW1wcyBvdGhlcndpc2UgdGhhdCdsbCBvbmx5IGhhcHBlbiB3aGVuIFNjcm9sbFRyaWdnZXIucmVmcmVzaCgpIGlzIGNhbGxlZCBvciBmb3IgdG91Y2gtc2Nyb2xsaW5nLlxuICAgICAgbGFzdFJlZnJlc2hJRCA9IDA7XG4gICAgICB3aGVlbFJlZnJlc2ggPSBfZ2V0VGltZSgpO1xuICAgIH1cbiAgfTtcblxuICB2YXJzLm9uQ2hhbmdlID0gZnVuY3Rpb24gKHNlbGYsIGR4LCBkeSwgeEFycmF5LCB5QXJyYXkpIHtcbiAgICBfcmVmcmVzaElEICE9PSBsYXN0UmVmcmVzaElEICYmIHVwZGF0ZUNsYW1wcygpO1xuICAgIGR4ICYmIG5vcm1hbGl6ZVNjcm9sbFggJiYgc2Nyb2xsRnVuY1goc2Nyb2xsQ2xhbXBYKHhBcnJheVsyXSA9PT0gZHggPyBzdGFydFNjcm9sbFggKyAoc2VsZi5zdGFydFggLSBzZWxmLngpIDogc2Nyb2xsRnVuY1goKSArIGR4IC0geEFycmF5WzFdKSk7IC8vIGZvciBtb3JlIHByZWNpc2lvbiwgd2UgdHJhY2sgcG9pbnRlci90b3VjaCBtb3ZlbWVudCBmcm9tIHRoZSBzdGFydCwgb3RoZXJ3aXNlIGl0J2xsIGRyaWZ0LlxuXG4gICAgaWYgKGR5KSB7XG4gICAgICBzY3JvbGxGdW5jWS5vZmZzZXQgJiYgcmVtb3ZlQ29udGVudE9mZnNldCgpO1xuICAgICAgdmFyIGlzVG91Y2ggPSB5QXJyYXlbMl0gPT09IGR5LFxuICAgICAgICAgIHkgPSBpc1RvdWNoID8gc3RhcnRTY3JvbGxZICsgc2VsZi5zdGFydFkgLSBzZWxmLnkgOiBzY3JvbGxGdW5jWSgpICsgZHkgLSB5QXJyYXlbMV0sXG4gICAgICAgICAgeUNsYW1wZWQgPSBzY3JvbGxDbGFtcFkoeSk7XG4gICAgICBpc1RvdWNoICYmIHkgIT09IHlDbGFtcGVkICYmIChzdGFydFNjcm9sbFkgKz0geUNsYW1wZWQgLSB5KTtcbiAgICAgIHNjcm9sbEZ1bmNZKHlDbGFtcGVkKTtcbiAgICB9XG5cbiAgICAoZHkgfHwgZHgpICYmIF91cGRhdGVBbGwoKTtcbiAgfTtcblxuICB2YXJzLm9uRW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgIF9hbGxvd05hdGl2ZVBhbm5pbmcodGFyZ2V0LCBub3JtYWxpemVTY3JvbGxYID8gZmFsc2UgOiBcInhcIik7XG5cbiAgICBTY3JvbGxUcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJyZWZyZXNoXCIsIG9uUmVzaXplKTtcblxuICAgIF9hZGRMaXN0ZW5lcihfd2luLCBcInJlc2l6ZVwiLCBvblJlc2l6ZSk7XG5cbiAgICBpZiAoc2Nyb2xsRnVuY1kuc21vb3RoKSB7XG4gICAgICBzY3JvbGxGdW5jWS50YXJnZXQuc3R5bGUuc2Nyb2xsQmVoYXZpb3IgPSBcImF1dG9cIjtcbiAgICAgIHNjcm9sbEZ1bmNZLnNtb290aCA9IHNjcm9sbEZ1bmNYLnNtb290aCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlucHV0T2JzZXJ2ZXIuZW5hYmxlKCk7XG4gIH07XG5cbiAgdmFycy5vbkRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgX2FsbG93TmF0aXZlUGFubmluZyh0YXJnZXQsIHRydWUpO1xuXG4gICAgX3JlbW92ZUxpc3RlbmVyKF93aW4sIFwicmVzaXplXCIsIG9uUmVzaXplKTtcblxuICAgIFNjcm9sbFRyaWdnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlZnJlc2hcIiwgb25SZXNpemUpO1xuICAgIGlucHV0T2JzZXJ2ZXIua2lsbCgpO1xuICB9O1xuXG4gIHZhcnMubG9ja0F4aXMgPSB2YXJzLmxvY2tBeGlzICE9PSBmYWxzZTtcbiAgc2VsZiA9IG5ldyBPYnNlcnZlcih2YXJzKTtcbiAgc2VsZi5pT1MgPSBfZml4SU9TQnVnOyAvLyB1c2VkIGluIHRoZSBPYnNlcnZlciBnZXRDYWNoZWRTY3JvbGwoKSBmdW5jdGlvbiB0byB3b3JrIGFyb3VuZCBhbiBpT1MgYnVnIHRoYXQgd3JlYWtzIGhhdm9jIHdpdGggVG91Y2hFdmVudC5jbGllbnRZIGlmIHdlIGFsbG93IHNjcm9sbCB0byBnbyBhbGwgdGhlIHdheSBiYWNrIHRvIDAuXG5cbiAgX2ZpeElPU0J1ZyAmJiAhc2Nyb2xsRnVuY1koKSAmJiBzY3JvbGxGdW5jWSgxKTsgLy8gaU9TIGJ1ZyBjYXVzZXMgZXZlbnQuY2xpZW50WSB2YWx1ZXMgdG8gZnJlYWsgb3V0ICh3aWxkbHkgaW5hY2N1cmF0ZSkgaWYgdGhlIHNjcm9sbCBwb3NpdGlvbiBpcyBleGFjdGx5IDAuXG5cbiAgX2ZpeElPU0J1ZyAmJiBnc2FwLnRpY2tlci5hZGQoX3Bhc3NUaHJvdWdoKTsgLy8gcHJldmVudCB0aGUgdGlja2VyIGZyb20gc2xlZXBpbmdcblxuICBvblN0b3BEZWxheWVkQ2FsbCA9IHNlbGYuX2RjO1xuICB0d2VlbiA9IGdzYXAudG8oc2VsZiwge1xuICAgIGVhc2U6IFwicG93ZXI0XCIsXG4gICAgcGF1c2VkOiB0cnVlLFxuICAgIHNjcm9sbFg6IG5vcm1hbGl6ZVNjcm9sbFggPyBcIis9MC4xXCIgOiBcIis9MFwiLFxuICAgIHNjcm9sbFk6IFwiKz0wLjFcIixcbiAgICBtb2RpZmllcnM6IHtcbiAgICAgIHNjcm9sbFk6IF9pbnRlcnJ1cHRpb25UcmFja2VyKHNjcm9sbEZ1bmNZLCBzY3JvbGxGdW5jWSgpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0d2Vlbi5wYXVzZSgpO1xuICAgICAgfSlcbiAgICB9LFxuICAgIG9uVXBkYXRlOiBfdXBkYXRlQWxsLFxuICAgIG9uQ29tcGxldGU6IG9uU3RvcERlbGF5ZWRDYWxsLnZhcnMub25Db21wbGV0ZVxuICB9KTsgLy8gd2UgbmVlZCB0aGUgbW9kaWZpZXIgdG8gc2Vuc2UgaWYgdGhlIHNjcm9sbCBwb3NpdGlvbiBpcyBhbHRlcmVkIG91dHNpZGUgb2YgdGhlIG1vbWVudHVtIHR3ZWVuIChsaWtlIHdpdGggYSBzY3JvbGxUbyB0d2Vlbikgc28gd2UgY2FuIHBhdXNlKCkgaXQgdG8gcHJldmVudCBjb25mbGljdHMuXG5cbiAgcmV0dXJuIHNlbGY7XG59O1xuXG5TY3JvbGxUcmlnZ2VyLnNvcnQgPSBmdW5jdGlvbiAoZnVuYykge1xuICByZXR1cm4gX3RyaWdnZXJzLnNvcnQoZnVuYyB8fCBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiAoYS52YXJzLnJlZnJlc2hQcmlvcml0eSB8fCAwKSAqIC0xZTYgKyBhLnN0YXJ0IC0gKGIuc3RhcnQgKyAoYi52YXJzLnJlZnJlc2hQcmlvcml0eSB8fCAwKSAqIC0xZTYpO1xuICB9KTtcbn07XG5cblNjcm9sbFRyaWdnZXIub2JzZXJ2ZSA9IGZ1bmN0aW9uICh2YXJzKSB7XG4gIHJldHVybiBuZXcgT2JzZXJ2ZXIodmFycyk7XG59O1xuXG5TY3JvbGxUcmlnZ2VyLm5vcm1hbGl6ZVNjcm9sbCA9IGZ1bmN0aW9uICh2YXJzKSB7XG4gIGlmICh0eXBlb2YgdmFycyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiBfbm9ybWFsaXplcjtcbiAgfVxuXG4gIGlmICh2YXJzID09PSB0cnVlICYmIF9ub3JtYWxpemVyKSB7XG4gICAgcmV0dXJuIF9ub3JtYWxpemVyLmVuYWJsZSgpO1xuICB9XG5cbiAgaWYgKHZhcnMgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIF9ub3JtYWxpemVyICYmIF9ub3JtYWxpemVyLmtpbGwoKTtcbiAgfVxuXG4gIHZhciBub3JtYWxpemVyID0gdmFycyBpbnN0YW5jZW9mIE9ic2VydmVyID8gdmFycyA6IF9nZXRTY3JvbGxOb3JtYWxpemVyKHZhcnMpO1xuICBfbm9ybWFsaXplciAmJiBfbm9ybWFsaXplci50YXJnZXQgPT09IG5vcm1hbGl6ZXIudGFyZ2V0ICYmIF9ub3JtYWxpemVyLmtpbGwoKTtcbiAgX2lzVmlld3BvcnQobm9ybWFsaXplci50YXJnZXQpICYmIChfbm9ybWFsaXplciA9IG5vcm1hbGl6ZXIpO1xuICByZXR1cm4gbm9ybWFsaXplcjtcbn07XG5cblNjcm9sbFRyaWdnZXIuY29yZSA9IHtcbiAgLy8gc21hbGxlciBmaWxlIHNpemUgd2F5IHRvIGxldmVyYWdlIGluIFNjcm9sbFNtb290aGVyIGFuZCBPYnNlcnZlclxuICBfZ2V0VmVsb2NpdHlQcm9wOiBfZ2V0VmVsb2NpdHlQcm9wLFxuICBfaW5wdXRPYnNlcnZlcjogX2lucHV0T2JzZXJ2ZXIsXG4gIF9zY3JvbGxlcnM6IF9zY3JvbGxlcnMsXG4gIF9wcm94aWVzOiBfcHJveGllcyxcbiAgYnJpZGdlOiB7XG4gICAgLy8gd2hlbiBub3JtYWxpemVTY3JvbGwgc2V0cyB0aGUgc2Nyb2xsIHBvc2l0aW9uIChzcyA9IHNldFNjcm9sbClcbiAgICBzczogZnVuY3Rpb24gc3MoKSB7XG4gICAgICBfbGFzdFNjcm9sbFRpbWUgfHwgX2Rpc3BhdGNoKFwic2Nyb2xsU3RhcnRcIik7XG4gICAgICBfbGFzdFNjcm9sbFRpbWUgPSBfZ2V0VGltZSgpO1xuICAgIH0sXG4gICAgLy8gYSB3YXkgdG8gZ2V0IHRoZSBfcmVmcmVzaGluZyB2YWx1ZSBpbiBPYnNlcnZlclxuICAgIHJlZjogZnVuY3Rpb24gcmVmKCkge1xuICAgICAgcmV0dXJuIF9yZWZyZXNoaW5nO1xuICAgIH1cbiAgfVxufTtcbl9nZXRHU0FQKCkgJiYgZ3NhcC5yZWdpc3RlclBsdWdpbihTY3JvbGxUcmlnZ2VyKTtcbmV4cG9ydCB7IFNjcm9sbFRyaWdnZXIgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyohXG4gKiBHU0FQIDMuMTEuNVxuICogaHR0cHM6Ly9ncmVlbnNvY2suY29tXG4gKlxuICogQGxpY2Vuc2UgQ29weXJpZ2h0IDIwMDgtMjAyMywgR3JlZW5Tb2NrLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogU3ViamVjdCB0byB0aGUgdGVybXMgYXQgaHR0cHM6Ly9ncmVlbnNvY2suY29tL3N0YW5kYXJkLWxpY2Vuc2Ugb3IgZm9yXG4gKiBDbHViIEdyZWVuU29jayBtZW1iZXJzLCB0aGUgYWdyZWVtZW50IGlzc3VlZCB3aXRoIHRoYXQgbWVtYmVyc2hpcC5cbiAqIEBhdXRob3I6IEphY2sgRG95bGUsIGphY2tAZ3JlZW5zb2NrLmNvbVxuKi9cblxuLyogZXNsaW50LWRpc2FibGUgKi9cbnZhciBfY29uZmlnID0ge1xuICBhdXRvU2xlZXA6IDEyMCxcbiAgZm9yY2UzRDogXCJhdXRvXCIsXG4gIG51bGxUYXJnZXRXYXJuOiAxLFxuICB1bml0czoge1xuICAgIGxpbmVIZWlnaHQ6IFwiXCJcbiAgfVxufSxcbiAgICBfZGVmYXVsdHMgPSB7XG4gIGR1cmF0aW9uOiAuNSxcbiAgb3ZlcndyaXRlOiBmYWxzZSxcbiAgZGVsYXk6IDBcbn0sXG4gICAgX3N1cHByZXNzT3ZlcndyaXRlcyxcbiAgICBfcmV2ZXJ0aW5nLFxuICAgIF9jb250ZXh0LFxuICAgIF9iaWdOdW0gPSAxZTgsXG4gICAgX3RpbnlOdW0gPSAxIC8gX2JpZ051bSxcbiAgICBfMlBJID0gTWF0aC5QSSAqIDIsXG4gICAgX0hBTEZfUEkgPSBfMlBJIC8gNCxcbiAgICBfZ3NJRCA9IDAsXG4gICAgX3NxcnQgPSBNYXRoLnNxcnQsXG4gICAgX2NvcyA9IE1hdGguY29zLFxuICAgIF9zaW4gPSBNYXRoLnNpbixcbiAgICBfaXNTdHJpbmcgPSBmdW5jdGlvbiBfaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIjtcbn0sXG4gICAgX2lzRnVuY3Rpb24gPSBmdW5jdGlvbiBfaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCI7XG59LFxuICAgIF9pc051bWJlciA9IGZ1bmN0aW9uIF9pc051bWJlcih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiO1xufSxcbiAgICBfaXNVbmRlZmluZWQgPSBmdW5jdGlvbiBfaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIjtcbn0sXG4gICAgX2lzT2JqZWN0ID0gZnVuY3Rpb24gX2lzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59LFxuICAgIF9pc05vdEZhbHNlID0gZnVuY3Rpb24gX2lzTm90RmFsc2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSBmYWxzZTtcbn0sXG4gICAgX3dpbmRvd0V4aXN0cyA9IGZ1bmN0aW9uIF93aW5kb3dFeGlzdHMoKSB7XG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xufSxcbiAgICBfaXNGdW5jT3JTdHJpbmcgPSBmdW5jdGlvbiBfaXNGdW5jT3JTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIF9pc0Z1bmN0aW9uKHZhbHVlKSB8fCBfaXNTdHJpbmcodmFsdWUpO1xufSxcbiAgICBfaXNUeXBlZEFycmF5ID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCIgJiYgQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uICgpIHt9LFxuICAgIC8vIG5vdGU6IElFMTAgaGFzIEFycmF5QnVmZmVyLCBidXQgTk9UIEFycmF5QnVmZmVyLmlzVmlldygpLlxuX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5LFxuICAgIF9zdHJpY3ROdW1FeHAgPSAvKD86LT9cXC4/XFxkfFxcLikrL2dpLFxuICAgIC8vb25seSBudW1iZXJzIChpbmNsdWRpbmcgbmVnYXRpdmVzIGFuZCBkZWNpbWFscykgYnV0IE5PVCByZWxhdGl2ZSB2YWx1ZXMuXG5fbnVtRXhwID0gL1stKz0uXSpcXGQrWy5lXFwtK10qXFxkKltlXFwtK10qXFxkKi9nLFxuICAgIC8vZmluZHMgYW55IG51bWJlcnMsIGluY2x1ZGluZyBvbmVzIHRoYXQgc3RhcnQgd2l0aCArPSBvciAtPSwgbmVnYXRpdmUgbnVtYmVycywgYW5kIG9uZXMgaW4gc2NpZW50aWZpYyBub3RhdGlvbiBsaWtlIDFlLTguXG5fbnVtV2l0aFVuaXRFeHAgPSAvWy0rPS5dKlxcZCtbLmUtXSpcXGQqW2EteiVdKi9nLFxuICAgIF9jb21wbGV4U3RyaW5nTnVtRXhwID0gL1stKz0uXSpcXGQrXFwuP1xcZCooPzplLXxlXFwrKT9cXGQqL2dpLFxuICAgIC8vZHVwbGljYXRlIHNvIHRoYXQgd2hpbGUgd2UncmUgbG9vcGluZyB0aHJvdWdoIG1hdGNoZXMgZnJvbSBleGVjKCksIGl0IGRvZXNuJ3QgY29udGFtaW5hdGUgdGhlIGxhc3RJbmRleCBvZiBfbnVtRXhwIHdoaWNoIHdlIHVzZSB0byBzZWFyY2ggZm9yIGNvbG9ycyB0b28uXG5fcmVsRXhwID0gL1srLV09LT9bLlxcZF0rLyxcbiAgICBfZGVsaW1pdGVkVmFsdWVFeHAgPSAvW14sJ1wiXFxbXFxdXFxzXSsvZ2ksXG4gICAgLy8gcHJldmlvdXNseSAvWyNcXC0rLl0qXFxiW2EtelxcZFxcLT0rJS5dKy9naSBidXQgZGlkbid0IGNhdGNoIHNwZWNpYWwgY2hhcmFjdGVycy5cbl91bml0RXhwID0gL15bK1xcLT1lXFxzXFxkXSpcXGQrWy5cXGRdKihbYS16XSp8JSlcXHMqJC9pLFxuICAgIF9nbG9iYWxUaW1lbGluZSxcbiAgICBfd2luLFxuICAgIF9jb3JlSW5pdHRlZCxcbiAgICBfZG9jLFxuICAgIF9nbG9iYWxzID0ge30sXG4gICAgX2luc3RhbGxTY29wZSA9IHt9LFxuICAgIF9jb3JlUmVhZHksXG4gICAgX2luc3RhbGwgPSBmdW5jdGlvbiBfaW5zdGFsbChzY29wZSkge1xuICByZXR1cm4gKF9pbnN0YWxsU2NvcGUgPSBfbWVyZ2Uoc2NvcGUsIF9nbG9iYWxzKSkgJiYgZ3NhcDtcbn0sXG4gICAgX21pc3NpbmdQbHVnaW4gPSBmdW5jdGlvbiBfbWlzc2luZ1BsdWdpbihwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIGNvbnNvbGUud2FybihcIkludmFsaWQgcHJvcGVydHlcIiwgcHJvcGVydHksIFwic2V0IHRvXCIsIHZhbHVlLCBcIk1pc3NpbmcgcGx1Z2luPyBnc2FwLnJlZ2lzdGVyUGx1Z2luKClcIik7XG59LFxuICAgIF93YXJuID0gZnVuY3Rpb24gX3dhcm4obWVzc2FnZSwgc3VwcHJlc3MpIHtcbiAgcmV0dXJuICFzdXBwcmVzcyAmJiBjb25zb2xlLndhcm4obWVzc2FnZSk7XG59LFxuICAgIF9hZGRHbG9iYWwgPSBmdW5jdGlvbiBfYWRkR2xvYmFsKG5hbWUsIG9iaikge1xuICByZXR1cm4gbmFtZSAmJiAoX2dsb2JhbHNbbmFtZV0gPSBvYmopICYmIF9pbnN0YWxsU2NvcGUgJiYgKF9pbnN0YWxsU2NvcGVbbmFtZV0gPSBvYmopIHx8IF9nbG9iYWxzO1xufSxcbiAgICBfZW1wdHlGdW5jID0gZnVuY3Rpb24gX2VtcHR5RnVuYygpIHtcbiAgcmV0dXJuIDA7XG59LFxuICAgIF9zdGFydEF0UmV2ZXJ0Q29uZmlnID0ge1xuICBzdXBwcmVzc0V2ZW50czogdHJ1ZSxcbiAgaXNTdGFydDogdHJ1ZSxcbiAga2lsbDogZmFsc2Vcbn0sXG4gICAgX3JldmVydENvbmZpZ05vS2lsbCA9IHtcbiAgc3VwcHJlc3NFdmVudHM6IHRydWUsXG4gIGtpbGw6IGZhbHNlXG59LFxuICAgIF9yZXZlcnRDb25maWcgPSB7XG4gIHN1cHByZXNzRXZlbnRzOiB0cnVlXG59LFxuICAgIF9yZXNlcnZlZFByb3BzID0ge30sXG4gICAgX2xhenlUd2VlbnMgPSBbXSxcbiAgICBfbGF6eUxvb2t1cCA9IHt9LFxuICAgIF9sYXN0UmVuZGVyZWRGcmFtZSxcbiAgICBfcGx1Z2lucyA9IHt9LFxuICAgIF9lZmZlY3RzID0ge30sXG4gICAgX25leHRHQ0ZyYW1lID0gMzAsXG4gICAgX2hhcm5lc3NQbHVnaW5zID0gW10sXG4gICAgX2NhbGxiYWNrTmFtZXMgPSBcIlwiLFxuICAgIF9oYXJuZXNzID0gZnVuY3Rpb24gX2hhcm5lc3ModGFyZ2V0cykge1xuICB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1swXSxcbiAgICAgIGhhcm5lc3NQbHVnaW4sXG4gICAgICBpO1xuICBfaXNPYmplY3QodGFyZ2V0KSB8fCBfaXNGdW5jdGlvbih0YXJnZXQpIHx8ICh0YXJnZXRzID0gW3RhcmdldHNdKTtcblxuICBpZiAoIShoYXJuZXNzUGx1Z2luID0gKHRhcmdldC5fZ3NhcCB8fCB7fSkuaGFybmVzcykpIHtcbiAgICAvLyBmaW5kIHRoZSBmaXJzdCB0YXJnZXQgd2l0aCBhIGhhcm5lc3MuIFdlIGFzc3VtZSB0YXJnZXRzIHBhc3NlZCBpbnRvIGFuIGFuaW1hdGlvbiB3aWxsIGJlIG9mIHNpbWlsYXIgdHlwZSwgbWVhbmluZyB0aGUgc2FtZSBraW5kIG9mIGhhcm5lc3MgY2FuIGJlIHVzZWQgZm9yIHRoZW0gYWxsIChwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24pXG4gICAgaSA9IF9oYXJuZXNzUGx1Z2lucy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tICYmICFfaGFybmVzc1BsdWdpbnNbaV0udGFyZ2V0VGVzdCh0YXJnZXQpKSB7fVxuXG4gICAgaGFybmVzc1BsdWdpbiA9IF9oYXJuZXNzUGx1Z2luc1tpXTtcbiAgfVxuXG4gIGkgPSB0YXJnZXRzLmxlbmd0aDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgdGFyZ2V0c1tpXSAmJiAodGFyZ2V0c1tpXS5fZ3NhcCB8fCAodGFyZ2V0c1tpXS5fZ3NhcCA9IG5ldyBHU0NhY2hlKHRhcmdldHNbaV0sIGhhcm5lc3NQbHVnaW4pKSkgfHwgdGFyZ2V0cy5zcGxpY2UoaSwgMSk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0cztcbn0sXG4gICAgX2dldENhY2hlID0gZnVuY3Rpb24gX2dldENhY2hlKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0Ll9nc2FwIHx8IF9oYXJuZXNzKHRvQXJyYXkodGFyZ2V0KSlbMF0uX2dzYXA7XG59LFxuICAgIF9nZXRQcm9wZXJ0eSA9IGZ1bmN0aW9uIF9nZXRQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5LCB2KSB7XG4gIHJldHVybiAodiA9IHRhcmdldFtwcm9wZXJ0eV0pICYmIF9pc0Z1bmN0aW9uKHYpID8gdGFyZ2V0W3Byb3BlcnR5XSgpIDogX2lzVW5kZWZpbmVkKHYpICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShwcm9wZXJ0eSkgfHwgdjtcbn0sXG4gICAgX2ZvckVhY2hOYW1lID0gZnVuY3Rpb24gX2ZvckVhY2hOYW1lKG5hbWVzLCBmdW5jKSB7XG4gIHJldHVybiAobmFtZXMgPSBuYW1lcy5zcGxpdChcIixcIikpLmZvckVhY2goZnVuYykgfHwgbmFtZXM7XG59LFxuICAgIC8vc3BsaXQgYSBjb21tYS1kZWxpbWl0ZWQgbGlzdCBvZiBuYW1lcyBpbnRvIGFuIGFycmF5LCB0aGVuIHJ1biBhIGZvckVhY2goKSBmdW5jdGlvbiBhbmQgcmV0dXJuIHRoZSBzcGxpdCBhcnJheSAodGhpcyBpcyBqdXN0IGEgd2F5IHRvIGNvbnNvbGlkYXRlL3Nob3J0ZW4gc29tZSBjb2RlKS5cbl9yb3VuZCA9IGZ1bmN0aW9uIF9yb3VuZCh2YWx1ZSkge1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIDEwMDAwMCkgLyAxMDAwMDAgfHwgMDtcbn0sXG4gICAgX3JvdW5kUHJlY2lzZSA9IGZ1bmN0aW9uIF9yb3VuZFByZWNpc2UodmFsdWUpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiAxMDAwMDAwMCkgLyAxMDAwMDAwMCB8fCAwO1xufSxcbiAgICAvLyBpbmNyZWFzZWQgcHJlY2lzaW9uIG1vc3RseSBmb3IgdGltaW5nIHZhbHVlcy5cbl9wYXJzZVJlbGF0aXZlID0gZnVuY3Rpb24gX3BhcnNlUmVsYXRpdmUoc3RhcnQsIHZhbHVlKSB7XG4gIHZhciBvcGVyYXRvciA9IHZhbHVlLmNoYXJBdCgwKSxcbiAgICAgIGVuZCA9IHBhcnNlRmxvYXQodmFsdWUuc3Vic3RyKDIpKTtcbiAgc3RhcnQgPSBwYXJzZUZsb2F0KHN0YXJ0KTtcbiAgcmV0dXJuIG9wZXJhdG9yID09PSBcIitcIiA/IHN0YXJ0ICsgZW5kIDogb3BlcmF0b3IgPT09IFwiLVwiID8gc3RhcnQgLSBlbmQgOiBvcGVyYXRvciA9PT0gXCIqXCIgPyBzdGFydCAqIGVuZCA6IHN0YXJ0IC8gZW5kO1xufSxcbiAgICBfYXJyYXlDb250YWluc0FueSA9IGZ1bmN0aW9uIF9hcnJheUNvbnRhaW5zQW55KHRvU2VhcmNoLCB0b0ZpbmQpIHtcbiAgLy9zZWFyY2hlcyBvbmUgYXJyYXkgdG8gZmluZCBtYXRjaGVzIGZvciBhbnkgb2YgdGhlIGl0ZW1zIGluIHRoZSB0b0ZpbmQgYXJyYXkuIEFzIHNvb24gYXMgb25lIGlzIGZvdW5kLCBpdCByZXR1cm5zIHRydWUuIEl0IGRvZXMgTk9UIHJldHVybiBhbGwgdGhlIG1hdGNoZXM7IGl0J3Mgc2ltcGx5IGEgYm9vbGVhbiBzZWFyY2guXG4gIHZhciBsID0gdG9GaW5kLmxlbmd0aCxcbiAgICAgIGkgPSAwO1xuXG4gIGZvciAoOyB0b1NlYXJjaC5pbmRleE9mKHRvRmluZFtpXSkgPCAwICYmICsraSA8IGw7KSB7fVxuXG4gIHJldHVybiBpIDwgbDtcbn0sXG4gICAgX2xhenlSZW5kZXIgPSBmdW5jdGlvbiBfbGF6eVJlbmRlcigpIHtcbiAgdmFyIGwgPSBfbGF6eVR3ZWVucy5sZW5ndGgsXG4gICAgICBhID0gX2xhenlUd2VlbnMuc2xpY2UoMCksXG4gICAgICBpLFxuICAgICAgdHdlZW47XG5cbiAgX2xhenlMb29rdXAgPSB7fTtcbiAgX2xhenlUd2VlbnMubGVuZ3RoID0gMDtcblxuICBmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgdHdlZW4gPSBhW2ldO1xuICAgIHR3ZWVuICYmIHR3ZWVuLl9sYXp5ICYmICh0d2Vlbi5yZW5kZXIodHdlZW4uX2xhenlbMF0sIHR3ZWVuLl9sYXp5WzFdLCB0cnVlKS5fbGF6eSA9IDApO1xuICB9XG59LFxuICAgIF9sYXp5U2FmZVJlbmRlciA9IGZ1bmN0aW9uIF9sYXp5U2FmZVJlbmRlcihhbmltYXRpb24sIHRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSkge1xuICBfbGF6eVR3ZWVucy5sZW5ndGggJiYgIV9yZXZlcnRpbmcgJiYgX2xhenlSZW5kZXIoKTtcbiAgYW5pbWF0aW9uLnJlbmRlcih0aW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UgfHwgX3JldmVydGluZyAmJiB0aW1lIDwgMCAmJiAoYW5pbWF0aW9uLl9pbml0dGVkIHx8IGFuaW1hdGlvbi5fc3RhcnRBdCkpO1xuICBfbGF6eVR3ZWVucy5sZW5ndGggJiYgIV9yZXZlcnRpbmcgJiYgX2xhenlSZW5kZXIoKTsgLy9pbiBjYXNlIHJlbmRlcmluZyBjYXVzZWQgYW55IHR3ZWVucyB0byBsYXp5LWluaXQsIHdlIHNob3VsZCByZW5kZXIgdGhlbSBiZWNhdXNlIHR5cGljYWxseSB3aGVuIHNvbWVvbmUgY2FsbHMgc2VlaygpIG9yIHRpbWUoKSBvciBwcm9ncmVzcygpLCB0aGV5IGV4cGVjdCBhbiBpbW1lZGlhdGUgcmVuZGVyLlxufSxcbiAgICBfbnVtZXJpY0lmUG9zc2libGUgPSBmdW5jdGlvbiBfbnVtZXJpY0lmUG9zc2libGUodmFsdWUpIHtcbiAgdmFyIG4gPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgcmV0dXJuIChuIHx8IG4gPT09IDApICYmICh2YWx1ZSArIFwiXCIpLm1hdGNoKF9kZWxpbWl0ZWRWYWx1ZUV4cCkubGVuZ3RoIDwgMiA/IG4gOiBfaXNTdHJpbmcodmFsdWUpID8gdmFsdWUudHJpbSgpIDogdmFsdWU7XG59LFxuICAgIF9wYXNzVGhyb3VnaCA9IGZ1bmN0aW9uIF9wYXNzVGhyb3VnaChwKSB7XG4gIHJldHVybiBwO1xufSxcbiAgICBfc2V0RGVmYXVsdHMgPSBmdW5jdGlvbiBfc2V0RGVmYXVsdHMob2JqLCBkZWZhdWx0cykge1xuICBmb3IgKHZhciBwIGluIGRlZmF1bHRzKSB7XG4gICAgcCBpbiBvYmogfHwgKG9ialtwXSA9IGRlZmF1bHRzW3BdKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59LFxuICAgIF9zZXRLZXlmcmFtZURlZmF1bHRzID0gZnVuY3Rpb24gX3NldEtleWZyYW1lRGVmYXVsdHMoZXhjbHVkZUR1cmF0aW9uKSB7XG4gIHJldHVybiBmdW5jdGlvbiAob2JqLCBkZWZhdWx0cykge1xuICAgIGZvciAodmFyIHAgaW4gZGVmYXVsdHMpIHtcbiAgICAgIHAgaW4gb2JqIHx8IHAgPT09IFwiZHVyYXRpb25cIiAmJiBleGNsdWRlRHVyYXRpb24gfHwgcCA9PT0gXCJlYXNlXCIgfHwgKG9ialtwXSA9IGRlZmF1bHRzW3BdKTtcbiAgICB9XG4gIH07XG59LFxuICAgIF9tZXJnZSA9IGZ1bmN0aW9uIF9tZXJnZShiYXNlLCB0b01lcmdlKSB7XG4gIGZvciAodmFyIHAgaW4gdG9NZXJnZSkge1xuICAgIGJhc2VbcF0gPSB0b01lcmdlW3BdO1xuICB9XG5cbiAgcmV0dXJuIGJhc2U7XG59LFxuICAgIF9tZXJnZURlZXAgPSBmdW5jdGlvbiBfbWVyZ2VEZWVwKGJhc2UsIHRvTWVyZ2UpIHtcbiAgZm9yICh2YXIgcCBpbiB0b01lcmdlKSB7XG4gICAgcCAhPT0gXCJfX3Byb3RvX19cIiAmJiBwICE9PSBcImNvbnN0cnVjdG9yXCIgJiYgcCAhPT0gXCJwcm90b3R5cGVcIiAmJiAoYmFzZVtwXSA9IF9pc09iamVjdCh0b01lcmdlW3BdKSA/IF9tZXJnZURlZXAoYmFzZVtwXSB8fCAoYmFzZVtwXSA9IHt9KSwgdG9NZXJnZVtwXSkgOiB0b01lcmdlW3BdKTtcbiAgfVxuXG4gIHJldHVybiBiYXNlO1xufSxcbiAgICBfY29weUV4Y2x1ZGluZyA9IGZ1bmN0aW9uIF9jb3B5RXhjbHVkaW5nKG9iaiwgZXhjbHVkaW5nKSB7XG4gIHZhciBjb3B5ID0ge30sXG4gICAgICBwO1xuXG4gIGZvciAocCBpbiBvYmopIHtcbiAgICBwIGluIGV4Y2x1ZGluZyB8fCAoY29weVtwXSA9IG9ialtwXSk7XG4gIH1cblxuICByZXR1cm4gY29weTtcbn0sXG4gICAgX2luaGVyaXREZWZhdWx0cyA9IGZ1bmN0aW9uIF9pbmhlcml0RGVmYXVsdHModmFycykge1xuICB2YXIgcGFyZW50ID0gdmFycy5wYXJlbnQgfHwgX2dsb2JhbFRpbWVsaW5lLFxuICAgICAgZnVuYyA9IHZhcnMua2V5ZnJhbWVzID8gX3NldEtleWZyYW1lRGVmYXVsdHMoX2lzQXJyYXkodmFycy5rZXlmcmFtZXMpKSA6IF9zZXREZWZhdWx0cztcblxuICBpZiAoX2lzTm90RmFsc2UodmFycy5pbmhlcml0KSkge1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgIGZ1bmModmFycywgcGFyZW50LnZhcnMuZGVmYXVsdHMpO1xuICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudCB8fCBwYXJlbnQuX2RwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YXJzO1xufSxcbiAgICBfYXJyYXlzTWF0Y2ggPSBmdW5jdGlvbiBfYXJyYXlzTWF0Y2goYTEsIGEyKSB7XG4gIHZhciBpID0gYTEubGVuZ3RoLFxuICAgICAgbWF0Y2ggPSBpID09PSBhMi5sZW5ndGg7XG5cbiAgd2hpbGUgKG1hdGNoICYmIGktLSAmJiBhMVtpXSA9PT0gYTJbaV0pIHt9XG5cbiAgcmV0dXJuIGkgPCAwO1xufSxcbiAgICBfYWRkTGlua2VkTGlzdEl0ZW0gPSBmdW5jdGlvbiBfYWRkTGlua2VkTGlzdEl0ZW0ocGFyZW50LCBjaGlsZCwgZmlyc3RQcm9wLCBsYXN0UHJvcCwgc29ydEJ5KSB7XG4gIGlmIChmaXJzdFByb3AgPT09IHZvaWQgMCkge1xuICAgIGZpcnN0UHJvcCA9IFwiX2ZpcnN0XCI7XG4gIH1cblxuICBpZiAobGFzdFByb3AgPT09IHZvaWQgMCkge1xuICAgIGxhc3RQcm9wID0gXCJfbGFzdFwiO1xuICB9XG5cbiAgdmFyIHByZXYgPSBwYXJlbnRbbGFzdFByb3BdLFxuICAgICAgdDtcblxuICBpZiAoc29ydEJ5KSB7XG4gICAgdCA9IGNoaWxkW3NvcnRCeV07XG5cbiAgICB3aGlsZSAocHJldiAmJiBwcmV2W3NvcnRCeV0gPiB0KSB7XG4gICAgICBwcmV2ID0gcHJldi5fcHJldjtcbiAgICB9XG4gIH1cblxuICBpZiAocHJldikge1xuICAgIGNoaWxkLl9uZXh0ID0gcHJldi5fbmV4dDtcbiAgICBwcmV2Ll9uZXh0ID0gY2hpbGQ7XG4gIH0gZWxzZSB7XG4gICAgY2hpbGQuX25leHQgPSBwYXJlbnRbZmlyc3RQcm9wXTtcbiAgICBwYXJlbnRbZmlyc3RQcm9wXSA9IGNoaWxkO1xuICB9XG5cbiAgaWYgKGNoaWxkLl9uZXh0KSB7XG4gICAgY2hpbGQuX25leHQuX3ByZXYgPSBjaGlsZDtcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnRbbGFzdFByb3BdID0gY2hpbGQ7XG4gIH1cblxuICBjaGlsZC5fcHJldiA9IHByZXY7XG4gIGNoaWxkLnBhcmVudCA9IGNoaWxkLl9kcCA9IHBhcmVudDtcbiAgcmV0dXJuIGNoaWxkO1xufSxcbiAgICBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0gPSBmdW5jdGlvbiBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0ocGFyZW50LCBjaGlsZCwgZmlyc3RQcm9wLCBsYXN0UHJvcCkge1xuICBpZiAoZmlyc3RQcm9wID09PSB2b2lkIDApIHtcbiAgICBmaXJzdFByb3AgPSBcIl9maXJzdFwiO1xuICB9XG5cbiAgaWYgKGxhc3RQcm9wID09PSB2b2lkIDApIHtcbiAgICBsYXN0UHJvcCA9IFwiX2xhc3RcIjtcbiAgfVxuXG4gIHZhciBwcmV2ID0gY2hpbGQuX3ByZXYsXG4gICAgICBuZXh0ID0gY2hpbGQuX25leHQ7XG5cbiAgaWYgKHByZXYpIHtcbiAgICBwcmV2Ll9uZXh0ID0gbmV4dDtcbiAgfSBlbHNlIGlmIChwYXJlbnRbZmlyc3RQcm9wXSA9PT0gY2hpbGQpIHtcbiAgICBwYXJlbnRbZmlyc3RQcm9wXSA9IG5leHQ7XG4gIH1cblxuICBpZiAobmV4dCkge1xuICAgIG5leHQuX3ByZXYgPSBwcmV2O1xuICB9IGVsc2UgaWYgKHBhcmVudFtsYXN0UHJvcF0gPT09IGNoaWxkKSB7XG4gICAgcGFyZW50W2xhc3RQcm9wXSA9IHByZXY7XG4gIH1cblxuICBjaGlsZC5fbmV4dCA9IGNoaWxkLl9wcmV2ID0gY2hpbGQucGFyZW50ID0gbnVsbDsgLy8gZG9uJ3QgZGVsZXRlIHRoZSBfZHAganVzdCBzbyB3ZSBjYW4gcmV2ZXJ0IGlmIG5lY2Vzc2FyeS4gQnV0IHBhcmVudCBzaG91bGQgYmUgbnVsbCB0byBpbmRpY2F0ZSB0aGUgaXRlbSBpc24ndCBpbiBhIGxpbmtlZCBsaXN0LlxufSxcbiAgICBfcmVtb3ZlRnJvbVBhcmVudCA9IGZ1bmN0aW9uIF9yZW1vdmVGcm9tUGFyZW50KGNoaWxkLCBvbmx5SWZQYXJlbnRIYXNBdXRvUmVtb3ZlKSB7XG4gIGNoaWxkLnBhcmVudCAmJiAoIW9ubHlJZlBhcmVudEhhc0F1dG9SZW1vdmUgfHwgY2hpbGQucGFyZW50LmF1dG9SZW1vdmVDaGlsZHJlbikgJiYgY2hpbGQucGFyZW50LnJlbW92ZShjaGlsZCk7XG4gIGNoaWxkLl9hY3QgPSAwO1xufSxcbiAgICBfdW5jYWNoZSA9IGZ1bmN0aW9uIF91bmNhY2hlKGFuaW1hdGlvbiwgY2hpbGQpIHtcbiAgaWYgKGFuaW1hdGlvbiAmJiAoIWNoaWxkIHx8IGNoaWxkLl9lbmQgPiBhbmltYXRpb24uX2R1ciB8fCBjaGlsZC5fc3RhcnQgPCAwKSkge1xuICAgIC8vIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbjogaWYgYSBjaGlsZCBhbmltYXRpb24gaXMgcGFzc2VkIGluIHdlIHNob3VsZCBvbmx5IHVuY2FjaGUgaWYgdGhhdCBjaGlsZCBFWFRFTkRTIHRoZSBhbmltYXRpb24gKGl0cyBlbmQgdGltZSBpcyBiZXlvbmQgdGhlIGVuZClcbiAgICB2YXIgYSA9IGFuaW1hdGlvbjtcblxuICAgIHdoaWxlIChhKSB7XG4gICAgICBhLl9kaXJ0eSA9IDE7XG4gICAgICBhID0gYS5wYXJlbnQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFuaW1hdGlvbjtcbn0sXG4gICAgX3JlY2FjaGVBbmNlc3RvcnMgPSBmdW5jdGlvbiBfcmVjYWNoZUFuY2VzdG9ycyhhbmltYXRpb24pIHtcbiAgdmFyIHBhcmVudCA9IGFuaW1hdGlvbi5wYXJlbnQ7XG5cbiAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQucGFyZW50KSB7XG4gICAgLy9zb21ldGltZXMgd2UgbXVzdCBmb3JjZSBhIHJlLXNvcnQgb2YgYWxsIGNoaWxkcmVuIGFuZCB1cGRhdGUgdGhlIGR1cmF0aW9uL3RvdGFsRHVyYXRpb24gb2YgYWxsIGFuY2VzdG9yIHRpbWVsaW5lcyBpbW1lZGlhdGVseSBpbiBjYXNlLCBmb3IgZXhhbXBsZSwgaW4gdGhlIG1pZGRsZSBvZiBhIHJlbmRlciBsb29wLCBvbmUgdHdlZW4gYWx0ZXJzIGFub3RoZXIgdHdlZW4ncyB0aW1lU2NhbGUgd2hpY2ggc2hvdmVzIGl0cyBzdGFydFRpbWUgYmVmb3JlIDAsIGZvcmNpbmcgdGhlIHBhcmVudCB0aW1lbGluZSB0byBzaGlmdCBhcm91bmQgYW5kIHNoaWZ0Q2hpbGRyZW4oKSB3aGljaCBjb3VsZCBhZmZlY3QgdGhhdCBuZXh0IHR3ZWVuJ3MgcmVuZGVyIChzdGFydFRpbWUpLiBEb2Vzbid0IG1hdHRlciBmb3IgdGhlIHJvb3QgdGltZWxpbmUgdGhvdWdoLlxuICAgIHBhcmVudC5fZGlydHkgPSAxO1xuICAgIHBhcmVudC50b3RhbER1cmF0aW9uKCk7XG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgfVxuXG4gIHJldHVybiBhbmltYXRpb247XG59LFxuICAgIF9yZXdpbmRTdGFydEF0ID0gZnVuY3Rpb24gX3Jld2luZFN0YXJ0QXQodHdlZW4sIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKSB7XG4gIHJldHVybiB0d2Vlbi5fc3RhcnRBdCAmJiAoX3JldmVydGluZyA/IHR3ZWVuLl9zdGFydEF0LnJldmVydChfcmV2ZXJ0Q29uZmlnTm9LaWxsKSA6IHR3ZWVuLnZhcnMuaW1tZWRpYXRlUmVuZGVyICYmICF0d2Vlbi52YXJzLmF1dG9SZXZlcnQgfHwgdHdlZW4uX3N0YXJ0QXQucmVuZGVyKHRvdGFsVGltZSwgdHJ1ZSwgZm9yY2UpKTtcbn0sXG4gICAgX2hhc05vUGF1c2VkQW5jZXN0b3JzID0gZnVuY3Rpb24gX2hhc05vUGF1c2VkQW5jZXN0b3JzKGFuaW1hdGlvbikge1xuICByZXR1cm4gIWFuaW1hdGlvbiB8fCBhbmltYXRpb24uX3RzICYmIF9oYXNOb1BhdXNlZEFuY2VzdG9ycyhhbmltYXRpb24ucGFyZW50KTtcbn0sXG4gICAgX2VsYXBzZWRDeWNsZUR1cmF0aW9uID0gZnVuY3Rpb24gX2VsYXBzZWRDeWNsZUR1cmF0aW9uKGFuaW1hdGlvbikge1xuICByZXR1cm4gYW5pbWF0aW9uLl9yZXBlYXQgPyBfYW5pbWF0aW9uQ3ljbGUoYW5pbWF0aW9uLl90VGltZSwgYW5pbWF0aW9uID0gYW5pbWF0aW9uLmR1cmF0aW9uKCkgKyBhbmltYXRpb24uX3JEZWxheSkgKiBhbmltYXRpb24gOiAwO1xufSxcbiAgICAvLyBmZWVkIGluIHRoZSB0b3RhbFRpbWUgYW5kIGN5Y2xlRHVyYXRpb24gYW5kIGl0J2xsIHJldHVybiB0aGUgY3ljbGUgKGl0ZXJhdGlvbiBtaW51cyAxKSBhbmQgaWYgdGhlIHBsYXloZWFkIGlzIGV4YWN0bHkgYXQgdGhlIHZlcnkgRU5ELCBpdCB3aWxsIE5PVCBidW1wIHVwIHRvIHRoZSBuZXh0IGN5Y2xlLlxuX2FuaW1hdGlvbkN5Y2xlID0gZnVuY3Rpb24gX2FuaW1hdGlvbkN5Y2xlKHRUaW1lLCBjeWNsZUR1cmF0aW9uKSB7XG4gIHZhciB3aG9sZSA9IE1hdGguZmxvb3IodFRpbWUgLz0gY3ljbGVEdXJhdGlvbik7XG4gIHJldHVybiB0VGltZSAmJiB3aG9sZSA9PT0gdFRpbWUgPyB3aG9sZSAtIDEgOiB3aG9sZTtcbn0sXG4gICAgX3BhcmVudFRvQ2hpbGRUb3RhbFRpbWUgPSBmdW5jdGlvbiBfcGFyZW50VG9DaGlsZFRvdGFsVGltZShwYXJlbnRUaW1lLCBjaGlsZCkge1xuICByZXR1cm4gKHBhcmVudFRpbWUgLSBjaGlsZC5fc3RhcnQpICogY2hpbGQuX3RzICsgKGNoaWxkLl90cyA+PSAwID8gMCA6IGNoaWxkLl9kaXJ0eSA/IGNoaWxkLnRvdGFsRHVyYXRpb24oKSA6IGNoaWxkLl90RHVyKTtcbn0sXG4gICAgX3NldEVuZCA9IGZ1bmN0aW9uIF9zZXRFbmQoYW5pbWF0aW9uKSB7XG4gIHJldHVybiBhbmltYXRpb24uX2VuZCA9IF9yb3VuZFByZWNpc2UoYW5pbWF0aW9uLl9zdGFydCArIChhbmltYXRpb24uX3REdXIgLyBNYXRoLmFicyhhbmltYXRpb24uX3RzIHx8IGFuaW1hdGlvbi5fcnRzIHx8IF90aW55TnVtKSB8fCAwKSk7XG59LFxuICAgIF9hbGlnblBsYXloZWFkID0gZnVuY3Rpb24gX2FsaWduUGxheWhlYWQoYW5pbWF0aW9uLCB0b3RhbFRpbWUpIHtcbiAgLy8gYWRqdXN0cyB0aGUgYW5pbWF0aW9uJ3MgX3N0YXJ0IGFuZCBfZW5kIGFjY29yZGluZyB0byB0aGUgcHJvdmlkZWQgdG90YWxUaW1lIChvbmx5IGlmIHRoZSBwYXJlbnQncyBzbW9vdGhDaGlsZFRpbWluZyBpcyB0cnVlIGFuZCB0aGUgYW5pbWF0aW9uIGlzbid0IHBhdXNlZCkuIEl0IGRvZXNuJ3QgZG8gYW55IHJlbmRlcmluZyBvciBmb3JjaW5nIHRoaW5ncyBiYWNrIGludG8gcGFyZW50IHRpbWVsaW5lcywgZXRjLiAtIHRoYXQncyB3aGF0IHRvdGFsVGltZSgpIGlzIGZvci5cbiAgdmFyIHBhcmVudCA9IGFuaW1hdGlvbi5fZHA7XG5cbiAgaWYgKHBhcmVudCAmJiBwYXJlbnQuc21vb3RoQ2hpbGRUaW1pbmcgJiYgYW5pbWF0aW9uLl90cykge1xuICAgIGFuaW1hdGlvbi5fc3RhcnQgPSBfcm91bmRQcmVjaXNlKHBhcmVudC5fdGltZSAtIChhbmltYXRpb24uX3RzID4gMCA/IHRvdGFsVGltZSAvIGFuaW1hdGlvbi5fdHMgOiAoKGFuaW1hdGlvbi5fZGlydHkgPyBhbmltYXRpb24udG90YWxEdXJhdGlvbigpIDogYW5pbWF0aW9uLl90RHVyKSAtIHRvdGFsVGltZSkgLyAtYW5pbWF0aW9uLl90cykpO1xuXG4gICAgX3NldEVuZChhbmltYXRpb24pO1xuXG4gICAgcGFyZW50Ll9kaXJ0eSB8fCBfdW5jYWNoZShwYXJlbnQsIGFuaW1hdGlvbik7IC8vZm9yIHBlcmZvcm1hbmNlIGltcHJvdmVtZW50LiBJZiB0aGUgcGFyZW50J3MgY2FjaGUgaXMgYWxyZWFkeSBkaXJ0eSwgaXQgYWxyZWFkeSB0b29rIGNhcmUgb2YgbWFya2luZyB0aGUgYW5jZXN0b3JzIGFzIGRpcnR5IHRvbywgc28gc2tpcCB0aGUgZnVuY3Rpb24gY2FsbCBoZXJlLlxuICB9XG5cbiAgcmV0dXJuIGFuaW1hdGlvbjtcbn0sXG5cbi8qXG5fdG90YWxUaW1lVG9UaW1lID0gKGNsYW1wZWRUb3RhbFRpbWUsIGR1cmF0aW9uLCByZXBlYXQsIHJlcGVhdERlbGF5LCB5b3lvKSA9PiB7XG5cdGxldCBjeWNsZUR1cmF0aW9uID0gZHVyYXRpb24gKyByZXBlYXREZWxheSxcblx0XHR0aW1lID0gX3JvdW5kKGNsYW1wZWRUb3RhbFRpbWUgJSBjeWNsZUR1cmF0aW9uKTtcblx0aWYgKHRpbWUgPiBkdXJhdGlvbikge1xuXHRcdHRpbWUgPSBkdXJhdGlvbjtcblx0fVxuXHRyZXR1cm4gKHlveW8gJiYgKH5+KGNsYW1wZWRUb3RhbFRpbWUgLyBjeWNsZUR1cmF0aW9uKSAmIDEpKSA/IGR1cmF0aW9uIC0gdGltZSA6IHRpbWU7XG59LFxuKi9cbl9wb3N0QWRkQ2hlY2tzID0gZnVuY3Rpb24gX3Bvc3RBZGRDaGVja3ModGltZWxpbmUsIGNoaWxkKSB7XG4gIHZhciB0O1xuXG4gIGlmIChjaGlsZC5fdGltZSB8fCBjaGlsZC5faW5pdHRlZCAmJiAhY2hpbGQuX2R1cikge1xuICAgIC8vaW4gY2FzZSwgZm9yIGV4YW1wbGUsIHRoZSBfc3RhcnQgaXMgbW92ZWQgb24gYSB0d2VlbiB0aGF0IGhhcyBhbHJlYWR5IHJlbmRlcmVkLiBJbWFnaW5lIGl0J3MgYXQgaXRzIGVuZCBzdGF0ZSwgdGhlbiB0aGUgc3RhcnRUaW1lIGlzIG1vdmVkIFdBWSBsYXRlciAoYWZ0ZXIgdGhlIGVuZCBvZiB0aGlzIHRpbWVsaW5lKSwgaXQgc2hvdWxkIHJlbmRlciBhdCBpdHMgYmVnaW5uaW5nLlxuICAgIHQgPSBfcGFyZW50VG9DaGlsZFRvdGFsVGltZSh0aW1lbGluZS5yYXdUaW1lKCksIGNoaWxkKTtcblxuICAgIGlmICghY2hpbGQuX2R1ciB8fCBfY2xhbXAoMCwgY2hpbGQudG90YWxEdXJhdGlvbigpLCB0KSAtIGNoaWxkLl90VGltZSA+IF90aW55TnVtKSB7XG4gICAgICBjaGlsZC5yZW5kZXIodCwgdHJ1ZSk7XG4gICAgfVxuICB9IC8vaWYgdGhlIHRpbWVsaW5lIGhhcyBhbHJlYWR5IGVuZGVkIGJ1dCB0aGUgaW5zZXJ0ZWQgdHdlZW4vdGltZWxpbmUgZXh0ZW5kcyB0aGUgZHVyYXRpb24sIHdlIHNob3VsZCBlbmFibGUgdGhpcyB0aW1lbGluZSBhZ2FpbiBzbyB0aGF0IGl0IHJlbmRlcnMgcHJvcGVybHkuIFdlIHNob3VsZCBhbHNvIGFsaWduIHRoZSBwbGF5aGVhZCB3aXRoIHRoZSBwYXJlbnQgdGltZWxpbmUncyB3aGVuIGFwcHJvcHJpYXRlLlxuXG5cbiAgaWYgKF91bmNhY2hlKHRpbWVsaW5lLCBjaGlsZCkuX2RwICYmIHRpbWVsaW5lLl9pbml0dGVkICYmIHRpbWVsaW5lLl90aW1lID49IHRpbWVsaW5lLl9kdXIgJiYgdGltZWxpbmUuX3RzKSB7XG4gICAgLy9pbiBjYXNlIGFueSBvZiB0aGUgYW5jZXN0b3JzIGhhZCBjb21wbGV0ZWQgYnV0IHNob3VsZCBub3cgYmUgZW5hYmxlZC4uLlxuICAgIGlmICh0aW1lbGluZS5fZHVyIDwgdGltZWxpbmUuZHVyYXRpb24oKSkge1xuICAgICAgdCA9IHRpbWVsaW5lO1xuXG4gICAgICB3aGlsZSAodC5fZHApIHtcbiAgICAgICAgdC5yYXdUaW1lKCkgPj0gMCAmJiB0LnRvdGFsVGltZSh0Ll90VGltZSk7IC8vbW92ZXMgdGhlIHRpbWVsaW5lIChzaGlmdHMgaXRzIHN0YXJ0VGltZSkgaWYgbmVjZXNzYXJ5LCBhbmQgYWxzbyBlbmFibGVzIGl0LiBJZiBpdCdzIGN1cnJlbnRseSB6ZXJvLCB0aG91Z2gsIGl0IG1heSBub3QgYmUgc2NoZWR1bGVkIHRvIHJlbmRlciB1bnRpbCBsYXRlciBzbyB0aGVyZSdzIG5vIG5lZWQgdG8gZm9yY2UgaXQgdG8gYWxpZ24gd2l0aCB0aGUgY3VycmVudCBwbGF5aGVhZCBwb3NpdGlvbi4gT25seSBtb3ZlIHRvIGNhdGNoIHVwIHdpdGggdGhlIHBsYXloZWFkLlxuXG4gICAgICAgIHQgPSB0Ll9kcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aW1lbGluZS5felRpbWUgPSAtX3RpbnlOdW07IC8vIGhlbHBzIGVuc3VyZSB0aGF0IHRoZSBuZXh0IHJlbmRlcigpIHdpbGwgYmUgZm9yY2VkIChjcm9zc2luZ1N0YXJ0ID0gdHJ1ZSBpbiByZW5kZXIoKSksIGV2ZW4gaWYgdGhlIGR1cmF0aW9uIGhhc24ndCBjaGFuZ2VkICh3ZSdyZSBhZGRpbmcgYSBjaGlsZCB3aGljaCB3b3VsZCBuZWVkIHRvIGdldCByZW5kZXJlZCkuIERlZmluaXRlbHkgYW4gZWRnZSBjYXNlLiBOb3RlOiB3ZSBNVVNUIGRvIHRoaXMgQUZURVIgdGhlIGxvb3AgYWJvdmUgd2hlcmUgdGhlIHRvdGFsVGltZSgpIG1pZ2h0IHRyaWdnZXIgYSByZW5kZXIoKSBiZWNhdXNlIHRoaXMgX2FkZFRvVGltZWxpbmUoKSBtZXRob2QgZ2V0cyBjYWxsZWQgZnJvbSB0aGUgQW5pbWF0aW9uIGNvbnN0cnVjdG9yLCBCRUZPUkUgdHdlZW5zIGV2ZW4gcmVjb3JkIHRoZWlyIHRhcmdldHMsIGV0Yy4gc28gd2Ugd291bGRuJ3Qgd2FudCB0aGluZ3MgdG8gZ2V0IHRyaWdnZXJlZCBpbiB0aGUgd3Jvbmcgb3JkZXIuXG4gIH1cbn0sXG4gICAgX2FkZFRvVGltZWxpbmUgPSBmdW5jdGlvbiBfYWRkVG9UaW1lbGluZSh0aW1lbGluZSwgY2hpbGQsIHBvc2l0aW9uLCBza2lwQ2hlY2tzKSB7XG4gIGNoaWxkLnBhcmVudCAmJiBfcmVtb3ZlRnJvbVBhcmVudChjaGlsZCk7XG4gIGNoaWxkLl9zdGFydCA9IF9yb3VuZFByZWNpc2UoKF9pc051bWJlcihwb3NpdGlvbikgPyBwb3NpdGlvbiA6IHBvc2l0aW9uIHx8IHRpbWVsaW5lICE9PSBfZ2xvYmFsVGltZWxpbmUgPyBfcGFyc2VQb3NpdGlvbih0aW1lbGluZSwgcG9zaXRpb24sIGNoaWxkKSA6IHRpbWVsaW5lLl90aW1lKSArIGNoaWxkLl9kZWxheSk7XG4gIGNoaWxkLl9lbmQgPSBfcm91bmRQcmVjaXNlKGNoaWxkLl9zdGFydCArIChjaGlsZC50b3RhbER1cmF0aW9uKCkgLyBNYXRoLmFicyhjaGlsZC50aW1lU2NhbGUoKSkgfHwgMCkpO1xuXG4gIF9hZGRMaW5rZWRMaXN0SXRlbSh0aW1lbGluZSwgY2hpbGQsIFwiX2ZpcnN0XCIsIFwiX2xhc3RcIiwgdGltZWxpbmUuX3NvcnQgPyBcIl9zdGFydFwiIDogMCk7XG5cbiAgX2lzRnJvbU9yRnJvbVN0YXJ0KGNoaWxkKSB8fCAodGltZWxpbmUuX3JlY2VudCA9IGNoaWxkKTtcbiAgc2tpcENoZWNrcyB8fCBfcG9zdEFkZENoZWNrcyh0aW1lbGluZSwgY2hpbGQpO1xuICB0aW1lbGluZS5fdHMgPCAwICYmIF9hbGlnblBsYXloZWFkKHRpbWVsaW5lLCB0aW1lbGluZS5fdFRpbWUpOyAvLyBpZiB0aGUgdGltZWxpbmUgaXMgcmV2ZXJzZWQgYW5kIHRoZSBuZXcgY2hpbGQgbWFrZXMgaXQgbG9uZ2VyLCB3ZSBtYXkgbmVlZCB0byBhZGp1c3QgdGhlIHBhcmVudCdzIF9zdGFydCAocHVzaCBpdCBiYWNrKVxuXG4gIHJldHVybiB0aW1lbGluZTtcbn0sXG4gICAgX3Njcm9sbFRyaWdnZXIgPSBmdW5jdGlvbiBfc2Nyb2xsVHJpZ2dlcihhbmltYXRpb24sIHRyaWdnZXIpIHtcbiAgcmV0dXJuIChfZ2xvYmFscy5TY3JvbGxUcmlnZ2VyIHx8IF9taXNzaW5nUGx1Z2luKFwic2Nyb2xsVHJpZ2dlclwiLCB0cmlnZ2VyKSkgJiYgX2dsb2JhbHMuU2Nyb2xsVHJpZ2dlci5jcmVhdGUodHJpZ2dlciwgYW5pbWF0aW9uKTtcbn0sXG4gICAgX2F0dGVtcHRJbml0VHdlZW4gPSBmdW5jdGlvbiBfYXR0ZW1wdEluaXRUd2Vlbih0d2VlbiwgdGltZSwgZm9yY2UsIHN1cHByZXNzRXZlbnRzLCB0VGltZSkge1xuICBfaW5pdFR3ZWVuKHR3ZWVuLCB0aW1lLCB0VGltZSk7XG5cbiAgaWYgKCF0d2Vlbi5faW5pdHRlZCkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgaWYgKCFmb3JjZSAmJiB0d2Vlbi5fcHQgJiYgIV9yZXZlcnRpbmcgJiYgKHR3ZWVuLl9kdXIgJiYgdHdlZW4udmFycy5sYXp5ICE9PSBmYWxzZSB8fCAhdHdlZW4uX2R1ciAmJiB0d2Vlbi52YXJzLmxhenkpICYmIF9sYXN0UmVuZGVyZWRGcmFtZSAhPT0gX3RpY2tlci5mcmFtZSkge1xuICAgIF9sYXp5VHdlZW5zLnB1c2godHdlZW4pO1xuXG4gICAgdHdlZW4uX2xhenkgPSBbdFRpbWUsIHN1cHByZXNzRXZlbnRzXTtcbiAgICByZXR1cm4gMTtcbiAgfVxufSxcbiAgICBfcGFyZW50UGxheWhlYWRJc0JlZm9yZVN0YXJ0ID0gZnVuY3Rpb24gX3BhcmVudFBsYXloZWFkSXNCZWZvcmVTdGFydChfcmVmKSB7XG4gIHZhciBwYXJlbnQgPSBfcmVmLnBhcmVudDtcbiAgcmV0dXJuIHBhcmVudCAmJiBwYXJlbnQuX3RzICYmIHBhcmVudC5faW5pdHRlZCAmJiAhcGFyZW50Ll9sb2NrICYmIChwYXJlbnQucmF3VGltZSgpIDwgMCB8fCBfcGFyZW50UGxheWhlYWRJc0JlZm9yZVN0YXJ0KHBhcmVudCkpO1xufSxcbiAgICAvLyBjaGVjayBwYXJlbnQncyBfbG9jayBiZWNhdXNlIHdoZW4gYSB0aW1lbGluZSByZXBlYXRzL3lveW9zIGFuZCBkb2VzIGl0cyBhcnRpZmljaWFsIHdyYXBwaW5nLCB3ZSBzaG91bGRuJ3QgZm9yY2UgdGhlIHJhdGlvIGJhY2sgdG8gMFxuX2lzRnJvbU9yRnJvbVN0YXJ0ID0gZnVuY3Rpb24gX2lzRnJvbU9yRnJvbVN0YXJ0KF9yZWYyKSB7XG4gIHZhciBkYXRhID0gX3JlZjIuZGF0YTtcbiAgcmV0dXJuIGRhdGEgPT09IFwiaXNGcm9tU3RhcnRcIiB8fCBkYXRhID09PSBcImlzU3RhcnRcIjtcbn0sXG4gICAgX3JlbmRlclplcm9EdXJhdGlvblR3ZWVuID0gZnVuY3Rpb24gX3JlbmRlclplcm9EdXJhdGlvblR3ZWVuKHR3ZWVuLCB0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSkge1xuICB2YXIgcHJldlJhdGlvID0gdHdlZW4ucmF0aW8sXG4gICAgICByYXRpbyA9IHRvdGFsVGltZSA8IDAgfHwgIXRvdGFsVGltZSAmJiAoIXR3ZWVuLl9zdGFydCAmJiBfcGFyZW50UGxheWhlYWRJc0JlZm9yZVN0YXJ0KHR3ZWVuKSAmJiAhKCF0d2Vlbi5faW5pdHRlZCAmJiBfaXNGcm9tT3JGcm9tU3RhcnQodHdlZW4pKSB8fCAodHdlZW4uX3RzIDwgMCB8fCB0d2Vlbi5fZHAuX3RzIDwgMCkgJiYgIV9pc0Zyb21PckZyb21TdGFydCh0d2VlbikpID8gMCA6IDEsXG4gICAgICAvLyBpZiB0aGUgdHdlZW4gb3IgaXRzIHBhcmVudCBpcyByZXZlcnNlZCBhbmQgdGhlIHRvdGFsVGltZSBpcyAwLCB3ZSBzaG91bGQgZ28gdG8gYSByYXRpbyBvZiAwLiBFZGdlIGNhc2U6IGlmIGEgZnJvbSgpIG9yIGZyb21UbygpIHN0YWdnZXIgdHdlZW4gaXMgcGxhY2VkIGxhdGVyIGluIGEgdGltZWxpbmUsIHRoZSBcInN0YXJ0QXRcIiB6ZXJvLWR1cmF0aW9uIHR3ZWVuIGNvdWxkIGluaXRpYWxseSByZW5kZXIgYXQgYSB0aW1lIHdoZW4gdGhlIHBhcmVudCB0aW1lbGluZSdzIHBsYXloZWFkIGlzIHRlY2huaWNhbGx5IEJFRk9SRSB3aGVyZSB0aGlzIHR3ZWVuIGlzLCBzbyBtYWtlIHN1cmUgdGhhdCBhbnkgXCJmcm9tXCIgYW5kIFwiZnJvbVRvXCIgc3RhcnRBdCB0d2VlbnMgYXJlIHJlbmRlcmVkIHRoZSBmaXJzdCB0aW1lIGF0IGEgcmF0aW8gb2YgMS5cbiAgcmVwZWF0RGVsYXkgPSB0d2Vlbi5fckRlbGF5LFxuICAgICAgdFRpbWUgPSAwLFxuICAgICAgcHQsXG4gICAgICBpdGVyYXRpb24sXG4gICAgICBwcmV2SXRlcmF0aW9uO1xuXG4gIGlmIChyZXBlYXREZWxheSAmJiB0d2Vlbi5fcmVwZWF0KSB7XG4gICAgLy8gaW4gY2FzZSB0aGVyZSdzIGEgemVyby1kdXJhdGlvbiB0d2VlbiB0aGF0IGhhcyBhIHJlcGVhdCB3aXRoIGEgcmVwZWF0RGVsYXlcbiAgICB0VGltZSA9IF9jbGFtcCgwLCB0d2Vlbi5fdER1ciwgdG90YWxUaW1lKTtcbiAgICBpdGVyYXRpb24gPSBfYW5pbWF0aW9uQ3ljbGUodFRpbWUsIHJlcGVhdERlbGF5KTtcbiAgICB0d2Vlbi5feW95byAmJiBpdGVyYXRpb24gJiAxICYmIChyYXRpbyA9IDEgLSByYXRpbyk7XG5cbiAgICBpZiAoaXRlcmF0aW9uICE9PSBfYW5pbWF0aW9uQ3ljbGUodHdlZW4uX3RUaW1lLCByZXBlYXREZWxheSkpIHtcbiAgICAgIC8vIGlmIGl0ZXJhdGlvbiBjaGFuZ2VkXG4gICAgICBwcmV2UmF0aW8gPSAxIC0gcmF0aW87XG4gICAgICB0d2Vlbi52YXJzLnJlcGVhdFJlZnJlc2ggJiYgdHdlZW4uX2luaXR0ZWQgJiYgdHdlZW4uaW52YWxpZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChyYXRpbyAhPT0gcHJldlJhdGlvIHx8IF9yZXZlcnRpbmcgfHwgZm9yY2UgfHwgdHdlZW4uX3pUaW1lID09PSBfdGlueU51bSB8fCAhdG90YWxUaW1lICYmIHR3ZWVuLl96VGltZSkge1xuICAgIGlmICghdHdlZW4uX2luaXR0ZWQgJiYgX2F0dGVtcHRJbml0VHdlZW4odHdlZW4sIHRvdGFsVGltZSwgZm9yY2UsIHN1cHByZXNzRXZlbnRzLCB0VGltZSkpIHtcbiAgICAgIC8vIGlmIHdlIHJlbmRlciB0aGUgdmVyeSBiZWdpbm5pbmcgKHRpbWUgPT0gMCkgb2YgYSBmcm9tVG8oKSwgd2UgbXVzdCBmb3JjZSB0aGUgcmVuZGVyIChub3JtYWwgdHdlZW5zIHdvdWxkbid0IG5lZWQgdG8gcmVuZGVyIGF0IGEgdGltZSBvZiAwIHdoZW4gdGhlIHByZXZUaW1lIHdhcyBhbHNvIDApLiBUaGlzIGlzIGFsc28gbWFuZGF0b3J5IHRvIG1ha2Ugc3VyZSBvdmVyd3JpdGluZyBraWNrcyBpbiBpbW1lZGlhdGVseS5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwcmV2SXRlcmF0aW9uID0gdHdlZW4uX3pUaW1lO1xuICAgIHR3ZWVuLl96VGltZSA9IHRvdGFsVGltZSB8fCAoc3VwcHJlc3NFdmVudHMgPyBfdGlueU51bSA6IDApOyAvLyB3aGVuIHRoZSBwbGF5aGVhZCBhcnJpdmVzIGF0IEVYQUNUTFkgdGltZSAwIChyaWdodCBvbiB0b3ApIG9mIGEgemVyby1kdXJhdGlvbiB0d2Vlbiwgd2UgbmVlZCB0byBkaXNjZXJuIGlmIGV2ZW50cyBhcmUgc3VwcHJlc3NlZCBzbyB0aGF0IHdoZW4gdGhlIHBsYXloZWFkIG1vdmVzIGFnYWluIChuZXh0IHRpbWUpLCBpdCdsbCB0cmlnZ2VyIHRoZSBjYWxsYmFjay4gSWYgZXZlbnRzIGFyZSBOT1Qgc3VwcHJlc3NlZCwgb2J2aW91c2x5IHRoZSBjYWxsYmFjayB3b3VsZCBiZSB0cmlnZ2VyZWQgaW4gdGhpcyByZW5kZXIuIEJhc2ljYWxseSwgdGhlIGNhbGxiYWNrIHNob3VsZCBmaXJlIGVpdGhlciB3aGVuIHRoZSBwbGF5aGVhZCBBUlJJVkVTIG9yIExFQVZFUyB0aGlzIGV4YWN0IHNwb3QsIG5vdCBib3RoLiBJbWFnaW5lIGRvaW5nIGEgdGltZWxpbmUuc2VlaygwKSBhbmQgdGhlcmUncyBhIGNhbGxiYWNrIHRoYXQgc2l0cyBhdCAwLiBTaW5jZSBldmVudHMgYXJlIHN1cHByZXNzZWQgb24gdGhhdCBzZWVrKCkgYnkgZGVmYXVsdCwgbm90aGluZyB3aWxsIGZpcmUsIGJ1dCB3aGVuIHRoZSBwbGF5aGVhZCBtb3ZlcyBvZmYgb2YgdGhhdCBwb3NpdGlvbiwgdGhlIGNhbGxiYWNrIHNob3VsZCBmaXJlLiBUaGlzIGJlaGF2aW9yIGlzIHdoYXQgcGVvcGxlIGludHVpdGl2ZWx5IGV4cGVjdC5cblxuICAgIHN1cHByZXNzRXZlbnRzIHx8IChzdXBwcmVzc0V2ZW50cyA9IHRvdGFsVGltZSAmJiAhcHJldkl0ZXJhdGlvbik7IC8vIGlmIGl0IHdhcyByZW5kZXJlZCBwcmV2aW91c2x5IGF0IGV4YWN0bHkgMCAoX3pUaW1lKSBhbmQgbm93IHRoZSBwbGF5aGVhZCBpcyBtb3ZpbmcgYXdheSwgRE9OJ1QgZmlyZSBjYWxsYmFja3Mgb3RoZXJ3aXNlIHRoZXknbGwgc2VlbSBsaWtlIGR1cGxpY2F0ZXMuXG5cbiAgICB0d2Vlbi5yYXRpbyA9IHJhdGlvO1xuICAgIHR3ZWVuLl9mcm9tICYmIChyYXRpbyA9IDEgLSByYXRpbyk7XG4gICAgdHdlZW4uX3RpbWUgPSAwO1xuICAgIHR3ZWVuLl90VGltZSA9IHRUaW1lO1xuICAgIHB0ID0gdHdlZW4uX3B0O1xuXG4gICAgd2hpbGUgKHB0KSB7XG4gICAgICBwdC5yKHJhdGlvLCBwdC5kKTtcbiAgICAgIHB0ID0gcHQuX25leHQ7XG4gICAgfVxuXG4gICAgdG90YWxUaW1lIDwgMCAmJiBfcmV3aW5kU3RhcnRBdCh0d2VlbiwgdG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cywgdHJ1ZSk7XG4gICAgdHdlZW4uX29uVXBkYXRlICYmICFzdXBwcmVzc0V2ZW50cyAmJiBfY2FsbGJhY2sodHdlZW4sIFwib25VcGRhdGVcIik7XG4gICAgdFRpbWUgJiYgdHdlZW4uX3JlcGVhdCAmJiAhc3VwcHJlc3NFdmVudHMgJiYgdHdlZW4ucGFyZW50ICYmIF9jYWxsYmFjayh0d2VlbiwgXCJvblJlcGVhdFwiKTtcblxuICAgIGlmICgodG90YWxUaW1lID49IHR3ZWVuLl90RHVyIHx8IHRvdGFsVGltZSA8IDApICYmIHR3ZWVuLnJhdGlvID09PSByYXRpbykge1xuICAgICAgcmF0aW8gJiYgX3JlbW92ZUZyb21QYXJlbnQodHdlZW4sIDEpO1xuXG4gICAgICBpZiAoIXN1cHByZXNzRXZlbnRzICYmICFfcmV2ZXJ0aW5nKSB7XG4gICAgICAgIF9jYWxsYmFjayh0d2VlbiwgcmF0aW8gPyBcIm9uQ29tcGxldGVcIiA6IFwib25SZXZlcnNlQ29tcGxldGVcIiwgdHJ1ZSk7XG5cbiAgICAgICAgdHdlZW4uX3Byb20gJiYgdHdlZW4uX3Byb20oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoIXR3ZWVuLl96VGltZSkge1xuICAgIHR3ZWVuLl96VGltZSA9IHRvdGFsVGltZTtcbiAgfVxufSxcbiAgICBfZmluZE5leHRQYXVzZVR3ZWVuID0gZnVuY3Rpb24gX2ZpbmROZXh0UGF1c2VUd2VlbihhbmltYXRpb24sIHByZXZUaW1lLCB0aW1lKSB7XG4gIHZhciBjaGlsZDtcblxuICBpZiAodGltZSA+IHByZXZUaW1lKSB7XG4gICAgY2hpbGQgPSBhbmltYXRpb24uX2ZpcnN0O1xuXG4gICAgd2hpbGUgKGNoaWxkICYmIGNoaWxkLl9zdGFydCA8PSB0aW1lKSB7XG4gICAgICBpZiAoY2hpbGQuZGF0YSA9PT0gXCJpc1BhdXNlXCIgJiYgY2hpbGQuX3N0YXJ0ID4gcHJldlRpbWUpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjaGlsZCA9IGFuaW1hdGlvbi5fbGFzdDtcblxuICAgIHdoaWxlIChjaGlsZCAmJiBjaGlsZC5fc3RhcnQgPj0gdGltZSkge1xuICAgICAgaWYgKGNoaWxkLmRhdGEgPT09IFwiaXNQYXVzZVwiICYmIGNoaWxkLl9zdGFydCA8IHByZXZUaW1lKSB7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cblxuICAgICAgY2hpbGQgPSBjaGlsZC5fcHJldjtcbiAgICB9XG4gIH1cbn0sXG4gICAgX3NldER1cmF0aW9uID0gZnVuY3Rpb24gX3NldER1cmF0aW9uKGFuaW1hdGlvbiwgZHVyYXRpb24sIHNraXBVbmNhY2hlLCBsZWF2ZVBsYXloZWFkKSB7XG4gIHZhciByZXBlYXQgPSBhbmltYXRpb24uX3JlcGVhdCxcbiAgICAgIGR1ciA9IF9yb3VuZFByZWNpc2UoZHVyYXRpb24pIHx8IDAsXG4gICAgICB0b3RhbFByb2dyZXNzID0gYW5pbWF0aW9uLl90VGltZSAvIGFuaW1hdGlvbi5fdER1cjtcbiAgdG90YWxQcm9ncmVzcyAmJiAhbGVhdmVQbGF5aGVhZCAmJiAoYW5pbWF0aW9uLl90aW1lICo9IGR1ciAvIGFuaW1hdGlvbi5fZHVyKTtcbiAgYW5pbWF0aW9uLl9kdXIgPSBkdXI7XG4gIGFuaW1hdGlvbi5fdER1ciA9ICFyZXBlYXQgPyBkdXIgOiByZXBlYXQgPCAwID8gMWUxMCA6IF9yb3VuZFByZWNpc2UoZHVyICogKHJlcGVhdCArIDEpICsgYW5pbWF0aW9uLl9yRGVsYXkgKiByZXBlYXQpO1xuICB0b3RhbFByb2dyZXNzID4gMCAmJiAhbGVhdmVQbGF5aGVhZCAmJiBfYWxpZ25QbGF5aGVhZChhbmltYXRpb24sIGFuaW1hdGlvbi5fdFRpbWUgPSBhbmltYXRpb24uX3REdXIgKiB0b3RhbFByb2dyZXNzKTtcbiAgYW5pbWF0aW9uLnBhcmVudCAmJiBfc2V0RW5kKGFuaW1hdGlvbik7XG4gIHNraXBVbmNhY2hlIHx8IF91bmNhY2hlKGFuaW1hdGlvbi5wYXJlbnQsIGFuaW1hdGlvbik7XG4gIHJldHVybiBhbmltYXRpb247XG59LFxuICAgIF9vblVwZGF0ZVRvdGFsRHVyYXRpb24gPSBmdW5jdGlvbiBfb25VcGRhdGVUb3RhbER1cmF0aW9uKGFuaW1hdGlvbikge1xuICByZXR1cm4gYW5pbWF0aW9uIGluc3RhbmNlb2YgVGltZWxpbmUgPyBfdW5jYWNoZShhbmltYXRpb24pIDogX3NldER1cmF0aW9uKGFuaW1hdGlvbiwgYW5pbWF0aW9uLl9kdXIpO1xufSxcbiAgICBfemVyb1Bvc2l0aW9uID0ge1xuICBfc3RhcnQ6IDAsXG4gIGVuZFRpbWU6IF9lbXB0eUZ1bmMsXG4gIHRvdGFsRHVyYXRpb246IF9lbXB0eUZ1bmNcbn0sXG4gICAgX3BhcnNlUG9zaXRpb24gPSBmdW5jdGlvbiBfcGFyc2VQb3NpdGlvbihhbmltYXRpb24sIHBvc2l0aW9uLCBwZXJjZW50QW5pbWF0aW9uKSB7XG4gIHZhciBsYWJlbHMgPSBhbmltYXRpb24ubGFiZWxzLFxuICAgICAgcmVjZW50ID0gYW5pbWF0aW9uLl9yZWNlbnQgfHwgX3plcm9Qb3NpdGlvbixcbiAgICAgIGNsaXBwZWREdXJhdGlvbiA9IGFuaW1hdGlvbi5kdXJhdGlvbigpID49IF9iaWdOdW0gPyByZWNlbnQuZW5kVGltZShmYWxzZSkgOiBhbmltYXRpb24uX2R1cixcbiAgICAgIC8vaW4gY2FzZSB0aGVyZSdzIGEgY2hpbGQgdGhhdCBpbmZpbml0ZWx5IHJlcGVhdHMsIHVzZXJzIGFsbW9zdCBuZXZlciBpbnRlbmQgZm9yIHRoZSBpbnNlcnRpb24gcG9pbnQgb2YgYSBuZXcgY2hpbGQgdG8gYmUgYmFzZWQgb24gYSBTVVBFUiBsb25nIHZhbHVlIGxpa2UgdGhhdCBzbyB3ZSBjbGlwIGl0IGFuZCBhc3N1bWUgdGhlIG1vc3QgcmVjZW50bHktYWRkZWQgY2hpbGQncyBlbmRUaW1lIHNob3VsZCBiZSB1c2VkIGluc3RlYWQuXG4gIGksXG4gICAgICBvZmZzZXQsXG4gICAgICBpc1BlcmNlbnQ7XG5cbiAgaWYgKF9pc1N0cmluZyhwb3NpdGlvbikgJiYgKGlzTmFOKHBvc2l0aW9uKSB8fCBwb3NpdGlvbiBpbiBsYWJlbHMpKSB7XG4gICAgLy9pZiB0aGUgc3RyaW5nIGlzIGEgbnVtYmVyIGxpa2UgXCIxXCIsIGNoZWNrIHRvIHNlZSBpZiB0aGVyZSdzIGEgbGFiZWwgd2l0aCB0aGF0IG5hbWUsIG90aGVyd2lzZSBpbnRlcnByZXQgaXQgYXMgYSBudW1iZXIgKGFic29sdXRlIHZhbHVlKS5cbiAgICBvZmZzZXQgPSBwb3NpdGlvbi5jaGFyQXQoMCk7XG4gICAgaXNQZXJjZW50ID0gcG9zaXRpb24uc3Vic3RyKC0xKSA9PT0gXCIlXCI7XG4gICAgaSA9IHBvc2l0aW9uLmluZGV4T2YoXCI9XCIpO1xuXG4gICAgaWYgKG9mZnNldCA9PT0gXCI8XCIgfHwgb2Zmc2V0ID09PSBcIj5cIikge1xuICAgICAgaSA+PSAwICYmIChwb3NpdGlvbiA9IHBvc2l0aW9uLnJlcGxhY2UoLz0vLCBcIlwiKSk7XG4gICAgICByZXR1cm4gKG9mZnNldCA9PT0gXCI8XCIgPyByZWNlbnQuX3N0YXJ0IDogcmVjZW50LmVuZFRpbWUocmVjZW50Ll9yZXBlYXQgPj0gMCkpICsgKHBhcnNlRmxvYXQocG9zaXRpb24uc3Vic3RyKDEpKSB8fCAwKSAqIChpc1BlcmNlbnQgPyAoaSA8IDAgPyByZWNlbnQgOiBwZXJjZW50QW5pbWF0aW9uKS50b3RhbER1cmF0aW9uKCkgLyAxMDAgOiAxKTtcbiAgICB9XG5cbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIHBvc2l0aW9uIGluIGxhYmVscyB8fCAobGFiZWxzW3Bvc2l0aW9uXSA9IGNsaXBwZWREdXJhdGlvbik7XG4gICAgICByZXR1cm4gbGFiZWxzW3Bvc2l0aW9uXTtcbiAgICB9XG5cbiAgICBvZmZzZXQgPSBwYXJzZUZsb2F0KHBvc2l0aW9uLmNoYXJBdChpIC0gMSkgKyBwb3NpdGlvbi5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChpc1BlcmNlbnQgJiYgcGVyY2VudEFuaW1hdGlvbikge1xuICAgICAgb2Zmc2V0ID0gb2Zmc2V0IC8gMTAwICogKF9pc0FycmF5KHBlcmNlbnRBbmltYXRpb24pID8gcGVyY2VudEFuaW1hdGlvblswXSA6IHBlcmNlbnRBbmltYXRpb24pLnRvdGFsRHVyYXRpb24oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaSA+IDEgPyBfcGFyc2VQb3NpdGlvbihhbmltYXRpb24sIHBvc2l0aW9uLnN1YnN0cigwLCBpIC0gMSksIHBlcmNlbnRBbmltYXRpb24pICsgb2Zmc2V0IDogY2xpcHBlZER1cmF0aW9uICsgb2Zmc2V0O1xuICB9XG5cbiAgcmV0dXJuIHBvc2l0aW9uID09IG51bGwgPyBjbGlwcGVkRHVyYXRpb24gOiArcG9zaXRpb247XG59LFxuICAgIF9jcmVhdGVUd2VlblR5cGUgPSBmdW5jdGlvbiBfY3JlYXRlVHdlZW5UeXBlKHR5cGUsIHBhcmFtcywgdGltZWxpbmUpIHtcbiAgdmFyIGlzTGVnYWN5ID0gX2lzTnVtYmVyKHBhcmFtc1sxXSksXG4gICAgICB2YXJzSW5kZXggPSAoaXNMZWdhY3kgPyAyIDogMSkgKyAodHlwZSA8IDIgPyAwIDogMSksXG4gICAgICB2YXJzID0gcGFyYW1zW3ZhcnNJbmRleF0sXG4gICAgICBpclZhcnMsXG4gICAgICBwYXJlbnQ7XG5cbiAgaXNMZWdhY3kgJiYgKHZhcnMuZHVyYXRpb24gPSBwYXJhbXNbMV0pO1xuICB2YXJzLnBhcmVudCA9IHRpbWVsaW5lO1xuXG4gIGlmICh0eXBlKSB7XG4gICAgaXJWYXJzID0gdmFycztcbiAgICBwYXJlbnQgPSB0aW1lbGluZTtcblxuICAgIHdoaWxlIChwYXJlbnQgJiYgIShcImltbWVkaWF0ZVJlbmRlclwiIGluIGlyVmFycykpIHtcbiAgICAgIC8vIGluaGVyaXRhbmNlIGhhc24ndCBoYXBwZW5lZCB5ZXQsIGJ1dCBzb21lb25lIG1heSBoYXZlIHNldCBhIGRlZmF1bHQgaW4gYW4gYW5jZXN0b3IgdGltZWxpbmUuIFdlIGNvdWxkIGRvIHZhcnMuaW1tZWRpYXRlUmVuZGVyID0gX2lzTm90RmFsc2UoX2luaGVyaXREZWZhdWx0cyh2YXJzKS5pbW1lZGlhdGVSZW5kZXIpIGJ1dCB0aGF0J2QgZXhhY3QgYSBzbGlnaHQgcGVyZm9ybWFuY2UgcGVuYWx0eSBiZWNhdXNlIF9pbmhlcml0RGVmYXVsdHMoKSBhbHNvIHJ1bnMgaW4gdGhlIFR3ZWVuIGNvbnN0cnVjdG9yLiBXZSdyZSBwYXlpbmcgYSBzbWFsbCBrYiBwcmljZSBoZXJlIHRvIGdhaW4gc3BlZWQuXG4gICAgICBpclZhcnMgPSBwYXJlbnQudmFycy5kZWZhdWx0cyB8fCB7fTtcbiAgICAgIHBhcmVudCA9IF9pc05vdEZhbHNlKHBhcmVudC52YXJzLmluaGVyaXQpICYmIHBhcmVudC5wYXJlbnQ7XG4gICAgfVxuXG4gICAgdmFycy5pbW1lZGlhdGVSZW5kZXIgPSBfaXNOb3RGYWxzZShpclZhcnMuaW1tZWRpYXRlUmVuZGVyKTtcbiAgICB0eXBlIDwgMiA/IHZhcnMucnVuQmFja3dhcmRzID0gMSA6IHZhcnMuc3RhcnRBdCA9IHBhcmFtc1t2YXJzSW5kZXggLSAxXTsgLy8gXCJmcm9tXCIgdmFyc1xuICB9XG5cbiAgcmV0dXJuIG5ldyBUd2VlbihwYXJhbXNbMF0sIHZhcnMsIHBhcmFtc1t2YXJzSW5kZXggKyAxXSk7XG59LFxuICAgIF9jb25kaXRpb25hbFJldHVybiA9IGZ1bmN0aW9uIF9jb25kaXRpb25hbFJldHVybih2YWx1ZSwgZnVuYykge1xuICByZXR1cm4gdmFsdWUgfHwgdmFsdWUgPT09IDAgPyBmdW5jKHZhbHVlKSA6IGZ1bmM7XG59LFxuICAgIF9jbGFtcCA9IGZ1bmN0aW9uIF9jbGFtcChtaW4sIG1heCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlIDwgbWluID8gbWluIDogdmFsdWUgPiBtYXggPyBtYXggOiB2YWx1ZTtcbn0sXG4gICAgZ2V0VW5pdCA9IGZ1bmN0aW9uIGdldFVuaXQodmFsdWUsIHYpIHtcbiAgcmV0dXJuICFfaXNTdHJpbmcodmFsdWUpIHx8ICEodiA9IF91bml0RXhwLmV4ZWModmFsdWUpKSA/IFwiXCIgOiB2WzFdO1xufSxcbiAgICAvLyBub3RlOiBwcm90ZWN0IGFnYWluc3QgcGFkZGVkIG51bWJlcnMgYXMgc3RyaW5ncywgbGlrZSBcIjEwMC4xMDBcIi4gVGhhdCBzaG91bGRuJ3QgcmV0dXJuIFwiMDBcIiBhcyB0aGUgdW5pdC4gSWYgaXQncyBudW1lcmljLCByZXR1cm4gbm8gdW5pdC5cbmNsYW1wID0gZnVuY3Rpb24gY2xhbXAobWluLCBtYXgsIHZhbHVlKSB7XG4gIHJldHVybiBfY29uZGl0aW9uYWxSZXR1cm4odmFsdWUsIGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIF9jbGFtcChtaW4sIG1heCwgdik7XG4gIH0pO1xufSxcbiAgICBfc2xpY2UgPSBbXS5zbGljZSxcbiAgICBfaXNBcnJheUxpa2UgPSBmdW5jdGlvbiBfaXNBcnJheUxpa2UodmFsdWUsIG5vbkVtcHR5KSB7XG4gIHJldHVybiB2YWx1ZSAmJiBfaXNPYmplY3QodmFsdWUpICYmIFwibGVuZ3RoXCIgaW4gdmFsdWUgJiYgKCFub25FbXB0eSAmJiAhdmFsdWUubGVuZ3RoIHx8IHZhbHVlLmxlbmd0aCAtIDEgaW4gdmFsdWUgJiYgX2lzT2JqZWN0KHZhbHVlWzBdKSkgJiYgIXZhbHVlLm5vZGVUeXBlICYmIHZhbHVlICE9PSBfd2luO1xufSxcbiAgICBfZmxhdHRlbiA9IGZ1bmN0aW9uIF9mbGF0dGVuKGFyLCBsZWF2ZVN0cmluZ3MsIGFjY3VtdWxhdG9yKSB7XG4gIGlmIChhY2N1bXVsYXRvciA9PT0gdm9pZCAwKSB7XG4gICAgYWNjdW11bGF0b3IgPSBbXTtcbiAgfVxuXG4gIHJldHVybiBhci5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciBfYWNjdW11bGF0b3I7XG5cbiAgICByZXR1cm4gX2lzU3RyaW5nKHZhbHVlKSAmJiAhbGVhdmVTdHJpbmdzIHx8IF9pc0FycmF5TGlrZSh2YWx1ZSwgMSkgPyAoX2FjY3VtdWxhdG9yID0gYWNjdW11bGF0b3IpLnB1c2guYXBwbHkoX2FjY3VtdWxhdG9yLCB0b0FycmF5KHZhbHVlKSkgOiBhY2N1bXVsYXRvci5wdXNoKHZhbHVlKTtcbiAgfSkgfHwgYWNjdW11bGF0b3I7XG59LFxuICAgIC8vdGFrZXMgYW55IHZhbHVlIGFuZCByZXR1cm5zIGFuIGFycmF5LiBJZiBpdCdzIGEgc3RyaW5nIChhbmQgbGVhdmVTdHJpbmdzIGlzbid0IHRydWUpLCBpdCdsbCB1c2UgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgpIGFuZCBjb252ZXJ0IHRoYXQgdG8gYW4gYXJyYXkuIEl0J2xsIGFsc28gYWNjZXB0IGl0ZXJhYmxlcyBsaWtlIGpRdWVyeSBvYmplY3RzLlxudG9BcnJheSA9IGZ1bmN0aW9uIHRvQXJyYXkodmFsdWUsIHNjb3BlLCBsZWF2ZVN0cmluZ3MpIHtcbiAgcmV0dXJuIF9jb250ZXh0ICYmICFzY29wZSAmJiBfY29udGV4dC5zZWxlY3RvciA/IF9jb250ZXh0LnNlbGVjdG9yKHZhbHVlKSA6IF9pc1N0cmluZyh2YWx1ZSkgJiYgIWxlYXZlU3RyaW5ncyAmJiAoX2NvcmVJbml0dGVkIHx8ICFfd2FrZSgpKSA/IF9zbGljZS5jYWxsKChzY29wZSB8fCBfZG9jKS5xdWVyeVNlbGVjdG9yQWxsKHZhbHVlKSwgMCkgOiBfaXNBcnJheSh2YWx1ZSkgPyBfZmxhdHRlbih2YWx1ZSwgbGVhdmVTdHJpbmdzKSA6IF9pc0FycmF5TGlrZSh2YWx1ZSkgPyBfc2xpY2UuY2FsbCh2YWx1ZSwgMCkgOiB2YWx1ZSA/IFt2YWx1ZV0gOiBbXTtcbn0sXG4gICAgc2VsZWN0b3IgPSBmdW5jdGlvbiBzZWxlY3Rvcih2YWx1ZSkge1xuICB2YWx1ZSA9IHRvQXJyYXkodmFsdWUpWzBdIHx8IF93YXJuKFwiSW52YWxpZCBzY29wZVwiKSB8fCB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uICh2KSB7XG4gICAgdmFyIGVsID0gdmFsdWUuY3VycmVudCB8fCB2YWx1ZS5uYXRpdmVFbGVtZW50IHx8IHZhbHVlO1xuICAgIHJldHVybiB0b0FycmF5KHYsIGVsLnF1ZXJ5U2VsZWN0b3JBbGwgPyBlbCA6IGVsID09PSB2YWx1ZSA/IF93YXJuKFwiSW52YWxpZCBzY29wZVwiKSB8fCBfZG9jLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikgOiB2YWx1ZSk7XG4gIH07XG59LFxuICAgIHNodWZmbGUgPSBmdW5jdGlvbiBzaHVmZmxlKGEpIHtcbiAgcmV0dXJuIGEuc29ydChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIC41IC0gTWF0aC5yYW5kb20oKTtcbiAgfSk7XG59LFxuICAgIC8vIGFsdGVybmF0aXZlIHRoYXQncyBhIGJpdCBmYXN0ZXIgYW5kIG1vcmUgcmVsaWFibHkgZGl2ZXJzZSBidXQgYmlnZ2VyOiAgIGZvciAobGV0IGosIHYsIGkgPSBhLmxlbmd0aDsgaTsgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGkpLCB2ID0gYVstLWldLCBhW2ldID0gYVtqXSwgYVtqXSA9IHYpOyByZXR1cm4gYTtcbi8vZm9yIGRpc3RyaWJ1dGluZyB2YWx1ZXMgYWNyb3NzIGFuIGFycmF5LiBDYW4gYWNjZXB0IGEgbnVtYmVyLCBhIGZ1bmN0aW9uIG9yIChtb3N0IGNvbW1vbmx5KSBhIGZ1bmN0aW9uIHdoaWNoIGNhbiBjb250YWluIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczoge2Jhc2UsIGFtb3VudCwgZnJvbSwgZWFzZSwgZ3JpZCwgYXhpcywgbGVuZ3RoLCBlYWNofS4gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgZXhwZWN0cyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6IGluZGV4LCB0YXJnZXQsIGFycmF5LiBSZWNvZ25pemVzIHRoZSBmb2xsb3dpbmdcbmRpc3RyaWJ1dGUgPSBmdW5jdGlvbiBkaXN0cmlidXRlKHYpIHtcbiAgaWYgKF9pc0Z1bmN0aW9uKHYpKSB7XG4gICAgcmV0dXJuIHY7XG4gIH1cblxuICB2YXIgdmFycyA9IF9pc09iamVjdCh2KSA/IHYgOiB7XG4gICAgZWFjaDogdlxuICB9LFxuICAgICAgLy9uOjEgaXMganVzdCB0byBpbmRpY2F0ZSB2IHdhcyBhIG51bWJlcjsgd2UgbGV2ZXJhZ2UgdGhhdCBsYXRlciB0byBzZXQgdiBhY2NvcmRpbmcgdG8gdGhlIGxlbmd0aCB3ZSBnZXQuIElmIGEgbnVtYmVyIGlzIHBhc3NlZCBpbiwgd2UgdHJlYXQgaXQgbGlrZSB0aGUgb2xkIHN0YWdnZXIgdmFsdWUgd2hlcmUgMC4xLCBmb3IgZXhhbXBsZSwgd291bGQgbWVhbiB0aGF0IHRoaW5ncyB3b3VsZCBiZSBkaXN0cmlidXRlZCB3aXRoIDAuMSBiZXR3ZWVuIGVhY2ggZWxlbWVudCBpbiB0aGUgYXJyYXkgcmF0aGVyIHRoYW4gYSB0b3RhbCBcImFtb3VudFwiIHRoYXQncyBjaHVua2VkIG91dCBhbW9uZyB0aGVtIGFsbC5cbiAgZWFzZSA9IF9wYXJzZUVhc2UodmFycy5lYXNlKSxcbiAgICAgIGZyb20gPSB2YXJzLmZyb20gfHwgMCxcbiAgICAgIGJhc2UgPSBwYXJzZUZsb2F0KHZhcnMuYmFzZSkgfHwgMCxcbiAgICAgIGNhY2hlID0ge30sXG4gICAgICBpc0RlY2ltYWwgPSBmcm9tID4gMCAmJiBmcm9tIDwgMSxcbiAgICAgIHJhdGlvcyA9IGlzTmFOKGZyb20pIHx8IGlzRGVjaW1hbCxcbiAgICAgIGF4aXMgPSB2YXJzLmF4aXMsXG4gICAgICByYXRpb1ggPSBmcm9tLFxuICAgICAgcmF0aW9ZID0gZnJvbTtcblxuICBpZiAoX2lzU3RyaW5nKGZyb20pKSB7XG4gICAgcmF0aW9YID0gcmF0aW9ZID0ge1xuICAgICAgY2VudGVyOiAuNSxcbiAgICAgIGVkZ2VzOiAuNSxcbiAgICAgIGVuZDogMVxuICAgIH1bZnJvbV0gfHwgMDtcbiAgfSBlbHNlIGlmICghaXNEZWNpbWFsICYmIHJhdGlvcykge1xuICAgIHJhdGlvWCA9IGZyb21bMF07XG4gICAgcmF0aW9ZID0gZnJvbVsxXTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaSwgdGFyZ2V0LCBhKSB7XG4gICAgdmFyIGwgPSAoYSB8fCB2YXJzKS5sZW5ndGgsXG4gICAgICAgIGRpc3RhbmNlcyA9IGNhY2hlW2xdLFxuICAgICAgICBvcmlnaW5YLFxuICAgICAgICBvcmlnaW5ZLFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICBkLFxuICAgICAgICBqLFxuICAgICAgICBtYXgsXG4gICAgICAgIG1pbixcbiAgICAgICAgd3JhcEF0O1xuXG4gICAgaWYgKCFkaXN0YW5jZXMpIHtcbiAgICAgIHdyYXBBdCA9IHZhcnMuZ3JpZCA9PT0gXCJhdXRvXCIgPyAwIDogKHZhcnMuZ3JpZCB8fCBbMSwgX2JpZ051bV0pWzFdO1xuXG4gICAgICBpZiAoIXdyYXBBdCkge1xuICAgICAgICBtYXggPSAtX2JpZ051bTtcblxuICAgICAgICB3aGlsZSAobWF4IDwgKG1heCA9IGFbd3JhcEF0KytdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQpICYmIHdyYXBBdCA8IGwpIHt9XG5cbiAgICAgICAgd3JhcEF0LS07XG4gICAgICB9XG5cbiAgICAgIGRpc3RhbmNlcyA9IGNhY2hlW2xdID0gW107XG4gICAgICBvcmlnaW5YID0gcmF0aW9zID8gTWF0aC5taW4od3JhcEF0LCBsKSAqIHJhdGlvWCAtIC41IDogZnJvbSAlIHdyYXBBdDtcbiAgICAgIG9yaWdpblkgPSB3cmFwQXQgPT09IF9iaWdOdW0gPyAwIDogcmF0aW9zID8gbCAqIHJhdGlvWSAvIHdyYXBBdCAtIC41IDogZnJvbSAvIHdyYXBBdCB8IDA7XG4gICAgICBtYXggPSAwO1xuICAgICAgbWluID0gX2JpZ051bTtcblxuICAgICAgZm9yIChqID0gMDsgaiA8IGw7IGorKykge1xuICAgICAgICB4ID0gaiAlIHdyYXBBdCAtIG9yaWdpblg7XG4gICAgICAgIHkgPSBvcmlnaW5ZIC0gKGogLyB3cmFwQXQgfCAwKTtcbiAgICAgICAgZGlzdGFuY2VzW2pdID0gZCA9ICFheGlzID8gX3NxcnQoeCAqIHggKyB5ICogeSkgOiBNYXRoLmFicyhheGlzID09PSBcInlcIiA/IHkgOiB4KTtcbiAgICAgICAgZCA+IG1heCAmJiAobWF4ID0gZCk7XG4gICAgICAgIGQgPCBtaW4gJiYgKG1pbiA9IGQpO1xuICAgICAgfVxuXG4gICAgICBmcm9tID09PSBcInJhbmRvbVwiICYmIHNodWZmbGUoZGlzdGFuY2VzKTtcbiAgICAgIGRpc3RhbmNlcy5tYXggPSBtYXggLSBtaW47XG4gICAgICBkaXN0YW5jZXMubWluID0gbWluO1xuICAgICAgZGlzdGFuY2VzLnYgPSBsID0gKHBhcnNlRmxvYXQodmFycy5hbW91bnQpIHx8IHBhcnNlRmxvYXQodmFycy5lYWNoKSAqICh3cmFwQXQgPiBsID8gbCAtIDEgOiAhYXhpcyA/IE1hdGgubWF4KHdyYXBBdCwgbCAvIHdyYXBBdCkgOiBheGlzID09PSBcInlcIiA/IGwgLyB3cmFwQXQgOiB3cmFwQXQpIHx8IDApICogKGZyb20gPT09IFwiZWRnZXNcIiA/IC0xIDogMSk7XG4gICAgICBkaXN0YW5jZXMuYiA9IGwgPCAwID8gYmFzZSAtIGwgOiBiYXNlO1xuICAgICAgZGlzdGFuY2VzLnUgPSBnZXRVbml0KHZhcnMuYW1vdW50IHx8IHZhcnMuZWFjaCkgfHwgMDsgLy91bml0XG5cbiAgICAgIGVhc2UgPSBlYXNlICYmIGwgPCAwID8gX2ludmVydEVhc2UoZWFzZSkgOiBlYXNlO1xuICAgIH1cblxuICAgIGwgPSAoZGlzdGFuY2VzW2ldIC0gZGlzdGFuY2VzLm1pbikgLyBkaXN0YW5jZXMubWF4IHx8IDA7XG4gICAgcmV0dXJuIF9yb3VuZFByZWNpc2UoZGlzdGFuY2VzLmIgKyAoZWFzZSA/IGVhc2UobCkgOiBsKSAqIGRpc3RhbmNlcy52KSArIGRpc3RhbmNlcy51OyAvL3JvdW5kIGluIG9yZGVyIHRvIHdvcmsgYXJvdW5kIGZsb2F0aW5nIHBvaW50IGVycm9yc1xuICB9O1xufSxcbiAgICBfcm91bmRNb2RpZmllciA9IGZ1bmN0aW9uIF9yb3VuZE1vZGlmaWVyKHYpIHtcbiAgLy9wYXNzIGluIDAuMSBnZXQgYSBmdW5jdGlvbiB0aGF0J2xsIHJvdW5kIHRvIHRoZSBuZWFyZXN0IHRlbnRoLCBvciA1IHRvIHJvdW5kIHRvIHRoZSBjbG9zZXN0IDUsIG9yIDAuMDAxIHRvIHRoZSBjbG9zZXN0IDEwMDB0aCwgZXRjLlxuICB2YXIgcCA9IE1hdGgucG93KDEwLCAoKHYgKyBcIlwiKS5zcGxpdChcIi5cIilbMV0gfHwgXCJcIikubGVuZ3RoKTsgLy90byBhdm9pZCBmbG9hdGluZyBwb2ludCBtYXRoIGVycm9ycyAobGlrZSAyNCAqIDAuMSA9PSAyLjQwMDAwMDAwMDAwMDAwMDQpLCB3ZSBjaG9wIG9mZiBhdCBhIHNwZWNpZmljIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyAobXVjaCBmYXN0ZXIgdGhhbiB0b0ZpeGVkKCkpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChyYXcpIHtcbiAgICB2YXIgbiA9IF9yb3VuZFByZWNpc2UoTWF0aC5yb3VuZChwYXJzZUZsb2F0KHJhdykgLyB2KSAqIHYgKiBwKTtcblxuICAgIHJldHVybiAobiAtIG4gJSAxKSAvIHAgKyAoX2lzTnVtYmVyKHJhdykgPyAwIDogZ2V0VW5pdChyYXcpKTsgLy8gbiAtIG4gJSAxIHJlcGxhY2VzIE1hdGguZmxvb3IoKSBpbiBvcmRlciB0byBoYW5kbGUgbmVnYXRpdmUgdmFsdWVzIHByb3Blcmx5LiBGb3IgZXhhbXBsZSwgTWF0aC5mbG9vcigtMTUwLjAwMDAwMDAwMDAwMDAzKSBpcyAxNTEhXG4gIH07XG59LFxuICAgIHNuYXAgPSBmdW5jdGlvbiBzbmFwKHNuYXBUbywgdmFsdWUpIHtcbiAgdmFyIGlzQXJyYXkgPSBfaXNBcnJheShzbmFwVG8pLFxuICAgICAgcmFkaXVzLFxuICAgICAgaXMyRDtcblxuICBpZiAoIWlzQXJyYXkgJiYgX2lzT2JqZWN0KHNuYXBUbykpIHtcbiAgICByYWRpdXMgPSBpc0FycmF5ID0gc25hcFRvLnJhZGl1cyB8fCBfYmlnTnVtO1xuXG4gICAgaWYgKHNuYXBUby52YWx1ZXMpIHtcbiAgICAgIHNuYXBUbyA9IHRvQXJyYXkoc25hcFRvLnZhbHVlcyk7XG5cbiAgICAgIGlmIChpczJEID0gIV9pc051bWJlcihzbmFwVG9bMF0pKSB7XG4gICAgICAgIHJhZGl1cyAqPSByYWRpdXM7IC8vcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIHNvIHdlIGRvbid0IGhhdmUgdG8gTWF0aC5zcXJ0KCkgaW4gdGhlIGxvb3AuXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNuYXBUbyA9IF9yb3VuZE1vZGlmaWVyKHNuYXBUby5pbmNyZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfY29uZGl0aW9uYWxSZXR1cm4odmFsdWUsICFpc0FycmF5ID8gX3JvdW5kTW9kaWZpZXIoc25hcFRvKSA6IF9pc0Z1bmN0aW9uKHNuYXBUbykgPyBmdW5jdGlvbiAocmF3KSB7XG4gICAgaXMyRCA9IHNuYXBUbyhyYXcpO1xuICAgIHJldHVybiBNYXRoLmFicyhpczJEIC0gcmF3KSA8PSByYWRpdXMgPyBpczJEIDogcmF3O1xuICB9IDogZnVuY3Rpb24gKHJhdykge1xuICAgIHZhciB4ID0gcGFyc2VGbG9hdChpczJEID8gcmF3LnggOiByYXcpLFxuICAgICAgICB5ID0gcGFyc2VGbG9hdChpczJEID8gcmF3LnkgOiAwKSxcbiAgICAgICAgbWluID0gX2JpZ051bSxcbiAgICAgICAgY2xvc2VzdCA9IDAsXG4gICAgICAgIGkgPSBzbmFwVG8ubGVuZ3RoLFxuICAgICAgICBkeCxcbiAgICAgICAgZHk7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoaXMyRCkge1xuICAgICAgICBkeCA9IHNuYXBUb1tpXS54IC0geDtcbiAgICAgICAgZHkgPSBzbmFwVG9baV0ueSAtIHk7XG4gICAgICAgIGR4ID0gZHggKiBkeCArIGR5ICogZHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkeCA9IE1hdGguYWJzKHNuYXBUb1tpXSAtIHgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZHggPCBtaW4pIHtcbiAgICAgICAgbWluID0gZHg7XG4gICAgICAgIGNsb3Nlc3QgPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNsb3Nlc3QgPSAhcmFkaXVzIHx8IG1pbiA8PSByYWRpdXMgPyBzbmFwVG9bY2xvc2VzdF0gOiByYXc7XG4gICAgcmV0dXJuIGlzMkQgfHwgY2xvc2VzdCA9PT0gcmF3IHx8IF9pc051bWJlcihyYXcpID8gY2xvc2VzdCA6IGNsb3Nlc3QgKyBnZXRVbml0KHJhdyk7XG4gIH0pO1xufSxcbiAgICByYW5kb20gPSBmdW5jdGlvbiByYW5kb20obWluLCBtYXgsIHJvdW5kaW5nSW5jcmVtZW50LCByZXR1cm5GdW5jdGlvbikge1xuICByZXR1cm4gX2NvbmRpdGlvbmFsUmV0dXJuKF9pc0FycmF5KG1pbikgPyAhbWF4IDogcm91bmRpbmdJbmNyZW1lbnQgPT09IHRydWUgPyAhIShyb3VuZGluZ0luY3JlbWVudCA9IDApIDogIXJldHVybkZ1bmN0aW9uLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9pc0FycmF5KG1pbikgPyBtaW5bfn4oTWF0aC5yYW5kb20oKSAqIG1pbi5sZW5ndGgpXSA6IChyb3VuZGluZ0luY3JlbWVudCA9IHJvdW5kaW5nSW5jcmVtZW50IHx8IDFlLTUpICYmIChyZXR1cm5GdW5jdGlvbiA9IHJvdW5kaW5nSW5jcmVtZW50IDwgMSA/IE1hdGgucG93KDEwLCAocm91bmRpbmdJbmNyZW1lbnQgKyBcIlwiKS5sZW5ndGggLSAyKSA6IDEpICYmIE1hdGguZmxvb3IoTWF0aC5yb3VuZCgobWluIC0gcm91bmRpbmdJbmNyZW1lbnQgLyAyICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyByb3VuZGluZ0luY3JlbWVudCAqIC45OSkpIC8gcm91bmRpbmdJbmNyZW1lbnQpICogcm91bmRpbmdJbmNyZW1lbnQgKiByZXR1cm5GdW5jdGlvbikgLyByZXR1cm5GdW5jdGlvbjtcbiAgfSk7XG59LFxuICAgIHBpcGUgPSBmdW5jdGlvbiBwaXBlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3Rpb25zID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmN0aW9uc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25zLnJlZHVjZShmdW5jdGlvbiAodiwgZikge1xuICAgICAgcmV0dXJuIGYodik7XG4gICAgfSwgdmFsdWUpO1xuICB9O1xufSxcbiAgICB1bml0aXplID0gZnVuY3Rpb24gdW5pdGl6ZShmdW5jLCB1bml0KSB7XG4gIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyhwYXJzZUZsb2F0KHZhbHVlKSkgKyAodW5pdCB8fCBnZXRVbml0KHZhbHVlKSk7XG4gIH07XG59LFxuICAgIG5vcm1hbGl6ZSA9IGZ1bmN0aW9uIG5vcm1hbGl6ZShtaW4sIG1heCwgdmFsdWUpIHtcbiAgcmV0dXJuIG1hcFJhbmdlKG1pbiwgbWF4LCAwLCAxLCB2YWx1ZSk7XG59LFxuICAgIF93cmFwQXJyYXkgPSBmdW5jdGlvbiBfd3JhcEFycmF5KGEsIHdyYXBwZXIsIHZhbHVlKSB7XG4gIHJldHVybiBfY29uZGl0aW9uYWxSZXR1cm4odmFsdWUsIGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHJldHVybiBhW35+d3JhcHBlcihpbmRleCldO1xuICB9KTtcbn0sXG4gICAgd3JhcCA9IGZ1bmN0aW9uIHdyYXAobWluLCBtYXgsIHZhbHVlKSB7XG4gIC8vIE5PVEU6IHdyYXAoKSBDQU5OT1QgYmUgYW4gYXJyb3cgZnVuY3Rpb24hIEEgdmVyeSBvZGQgY29tcGlsaW5nIGJ1ZyBjYXVzZXMgcHJvYmxlbXMgKHVucmVsYXRlZCB0byBHU0FQKS5cbiAgdmFyIHJhbmdlID0gbWF4IC0gbWluO1xuICByZXR1cm4gX2lzQXJyYXkobWluKSA/IF93cmFwQXJyYXkobWluLCB3cmFwKDAsIG1pbi5sZW5ndGgpLCBtYXgpIDogX2NvbmRpdGlvbmFsUmV0dXJuKHZhbHVlLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gKHJhbmdlICsgKHZhbHVlIC0gbWluKSAlIHJhbmdlKSAlIHJhbmdlICsgbWluO1xuICB9KTtcbn0sXG4gICAgd3JhcFlveW8gPSBmdW5jdGlvbiB3cmFwWW95byhtaW4sIG1heCwgdmFsdWUpIHtcbiAgdmFyIHJhbmdlID0gbWF4IC0gbWluLFxuICAgICAgdG90YWwgPSByYW5nZSAqIDI7XG4gIHJldHVybiBfaXNBcnJheShtaW4pID8gX3dyYXBBcnJheShtaW4sIHdyYXBZb3lvKDAsIG1pbi5sZW5ndGggLSAxKSwgbWF4KSA6IF9jb25kaXRpb25hbFJldHVybih2YWx1ZSwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFsdWUgPSAodG90YWwgKyAodmFsdWUgLSBtaW4pICUgdG90YWwpICUgdG90YWwgfHwgMDtcbiAgICByZXR1cm4gbWluICsgKHZhbHVlID4gcmFuZ2UgPyB0b3RhbCAtIHZhbHVlIDogdmFsdWUpO1xuICB9KTtcbn0sXG4gICAgX3JlcGxhY2VSYW5kb20gPSBmdW5jdGlvbiBfcmVwbGFjZVJhbmRvbSh2YWx1ZSkge1xuICAvL3JlcGxhY2VzIGFsbCBvY2N1cnJlbmNlcyBvZiByYW5kb20oLi4uKSBpbiBhIHN0cmluZyB3aXRoIHRoZSBjYWxjdWxhdGVkIHJhbmRvbSB2YWx1ZS4gY2FuIGJlIGEgcmFuZ2UgbGlrZSByYW5kb20oLTEwMCwgMTAwLCA1KSBvciBhbiBhcnJheSBsaWtlIHJhbmRvbShbMCwgMTAwLCA1MDBdKVxuICB2YXIgcHJldiA9IDAsXG4gICAgICBzID0gXCJcIixcbiAgICAgIGksXG4gICAgICBudW1zLFxuICAgICAgZW5kLFxuICAgICAgaXNBcnJheTtcblxuICB3aGlsZSAofihpID0gdmFsdWUuaW5kZXhPZihcInJhbmRvbShcIiwgcHJldikpKSB7XG4gICAgZW5kID0gdmFsdWUuaW5kZXhPZihcIilcIiwgaSk7XG4gICAgaXNBcnJheSA9IHZhbHVlLmNoYXJBdChpICsgNykgPT09IFwiW1wiO1xuICAgIG51bXMgPSB2YWx1ZS5zdWJzdHIoaSArIDcsIGVuZCAtIGkgLSA3KS5tYXRjaChpc0FycmF5ID8gX2RlbGltaXRlZFZhbHVlRXhwIDogX3N0cmljdE51bUV4cCk7XG4gICAgcyArPSB2YWx1ZS5zdWJzdHIocHJldiwgaSAtIHByZXYpICsgcmFuZG9tKGlzQXJyYXkgPyBudW1zIDogK251bXNbMF0sIGlzQXJyYXkgPyAwIDogK251bXNbMV0sICtudW1zWzJdIHx8IDFlLTUpO1xuICAgIHByZXYgPSBlbmQgKyAxO1xuICB9XG5cbiAgcmV0dXJuIHMgKyB2YWx1ZS5zdWJzdHIocHJldiwgdmFsdWUubGVuZ3RoIC0gcHJldik7XG59LFxuICAgIG1hcFJhbmdlID0gZnVuY3Rpb24gbWFwUmFuZ2UoaW5NaW4sIGluTWF4LCBvdXRNaW4sIG91dE1heCwgdmFsdWUpIHtcbiAgdmFyIGluUmFuZ2UgPSBpbk1heCAtIGluTWluLFxuICAgICAgb3V0UmFuZ2UgPSBvdXRNYXggLSBvdXRNaW47XG4gIHJldHVybiBfY29uZGl0aW9uYWxSZXR1cm4odmFsdWUsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiBvdXRNaW4gKyAoKHZhbHVlIC0gaW5NaW4pIC8gaW5SYW5nZSAqIG91dFJhbmdlIHx8IDApO1xuICB9KTtcbn0sXG4gICAgaW50ZXJwb2xhdGUgPSBmdW5jdGlvbiBpbnRlcnBvbGF0ZShzdGFydCwgZW5kLCBwcm9ncmVzcywgbXV0YXRlKSB7XG4gIHZhciBmdW5jID0gaXNOYU4oc3RhcnQgKyBlbmQpID8gMCA6IGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuICgxIC0gcCkgKiBzdGFydCArIHAgKiBlbmQ7XG4gIH07XG5cbiAgaWYgKCFmdW5jKSB7XG4gICAgdmFyIGlzU3RyaW5nID0gX2lzU3RyaW5nKHN0YXJ0KSxcbiAgICAgICAgbWFzdGVyID0ge30sXG4gICAgICAgIHAsXG4gICAgICAgIGksXG4gICAgICAgIGludGVycG9sYXRvcnMsXG4gICAgICAgIGwsXG4gICAgICAgIGlsO1xuXG4gICAgcHJvZ3Jlc3MgPT09IHRydWUgJiYgKG11dGF0ZSA9IDEpICYmIChwcm9ncmVzcyA9IG51bGwpO1xuXG4gICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICBzdGFydCA9IHtcbiAgICAgICAgcDogc3RhcnRcbiAgICAgIH07XG4gICAgICBlbmQgPSB7XG4gICAgICAgIHA6IGVuZFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKF9pc0FycmF5KHN0YXJ0KSAmJiAhX2lzQXJyYXkoZW5kKSkge1xuICAgICAgaW50ZXJwb2xhdG9ycyA9IFtdO1xuICAgICAgbCA9IHN0YXJ0Lmxlbmd0aDtcbiAgICAgIGlsID0gbCAtIDI7XG5cbiAgICAgIGZvciAoaSA9IDE7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaW50ZXJwb2xhdG9ycy5wdXNoKGludGVycG9sYXRlKHN0YXJ0W2kgLSAxXSwgc3RhcnRbaV0pKTsgLy9idWlsZCB0aGUgaW50ZXJwb2xhdG9ycyB1cCBmcm9udCBhcyBhIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbiBzbyB0aGF0IHdoZW4gdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBtYW55IHRpbWVzLCBpdCBjYW4ganVzdCByZXVzZSB0aGVtLlxuICAgICAgfVxuXG4gICAgICBsLS07XG5cbiAgICAgIGZ1bmMgPSBmdW5jdGlvbiBmdW5jKHApIHtcbiAgICAgICAgcCAqPSBsO1xuICAgICAgICB2YXIgaSA9IE1hdGgubWluKGlsLCB+fnApO1xuICAgICAgICByZXR1cm4gaW50ZXJwb2xhdG9yc1tpXShwIC0gaSk7XG4gICAgICB9O1xuXG4gICAgICBwcm9ncmVzcyA9IGVuZDtcbiAgICB9IGVsc2UgaWYgKCFtdXRhdGUpIHtcbiAgICAgIHN0YXJ0ID0gX21lcmdlKF9pc0FycmF5KHN0YXJ0KSA/IFtdIDoge30sIHN0YXJ0KTtcbiAgICB9XG5cbiAgICBpZiAoIWludGVycG9sYXRvcnMpIHtcbiAgICAgIGZvciAocCBpbiBlbmQpIHtcbiAgICAgICAgX2FkZFByb3BUd2Vlbi5jYWxsKG1hc3Rlciwgc3RhcnQsIHAsIFwiZ2V0XCIsIGVuZFtwXSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmMgPSBmdW5jdGlvbiBmdW5jKHApIHtcbiAgICAgICAgcmV0dXJuIF9yZW5kZXJQcm9wVHdlZW5zKHAsIG1hc3RlcikgfHwgKGlzU3RyaW5nID8gc3RhcnQucCA6IHN0YXJ0KTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9jb25kaXRpb25hbFJldHVybihwcm9ncmVzcywgZnVuYyk7XG59LFxuICAgIF9nZXRMYWJlbEluRGlyZWN0aW9uID0gZnVuY3Rpb24gX2dldExhYmVsSW5EaXJlY3Rpb24odGltZWxpbmUsIGZyb21UaW1lLCBiYWNrd2FyZCkge1xuICAvL3VzZWQgZm9yIG5leHRMYWJlbCgpIGFuZCBwcmV2aW91c0xhYmVsKClcbiAgdmFyIGxhYmVscyA9IHRpbWVsaW5lLmxhYmVscyxcbiAgICAgIG1pbiA9IF9iaWdOdW0sXG4gICAgICBwLFxuICAgICAgZGlzdGFuY2UsXG4gICAgICBsYWJlbDtcblxuICBmb3IgKHAgaW4gbGFiZWxzKSB7XG4gICAgZGlzdGFuY2UgPSBsYWJlbHNbcF0gLSBmcm9tVGltZTtcblxuICAgIGlmIChkaXN0YW5jZSA8IDAgPT09ICEhYmFja3dhcmQgJiYgZGlzdGFuY2UgJiYgbWluID4gKGRpc3RhbmNlID0gTWF0aC5hYnMoZGlzdGFuY2UpKSkge1xuICAgICAgbGFiZWwgPSBwO1xuICAgICAgbWluID0gZGlzdGFuY2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGxhYmVsO1xufSxcbiAgICBfY2FsbGJhY2sgPSBmdW5jdGlvbiBfY2FsbGJhY2soYW5pbWF0aW9uLCB0eXBlLCBleGVjdXRlTGF6eUZpcnN0KSB7XG4gIHZhciB2ID0gYW5pbWF0aW9uLnZhcnMsXG4gICAgICBjYWxsYmFjayA9IHZbdHlwZV0sXG4gICAgICBwcmV2Q29udGV4dCA9IF9jb250ZXh0LFxuICAgICAgY29udGV4dCA9IGFuaW1hdGlvbi5fY3R4LFxuICAgICAgcGFyYW1zLFxuICAgICAgc2NvcGUsXG4gICAgICByZXN1bHQ7XG5cbiAgaWYgKCFjYWxsYmFjaykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHBhcmFtcyA9IHZbdHlwZSArIFwiUGFyYW1zXCJdO1xuICBzY29wZSA9IHYuY2FsbGJhY2tTY29wZSB8fCBhbmltYXRpb247XG4gIGV4ZWN1dGVMYXp5Rmlyc3QgJiYgX2xhenlUd2VlbnMubGVuZ3RoICYmIF9sYXp5UmVuZGVyKCk7IC8vaW4gY2FzZSByZW5kZXJpbmcgY2F1c2VkIGFueSB0d2VlbnMgdG8gbGF6eS1pbml0LCB3ZSBzaG91bGQgcmVuZGVyIHRoZW0gYmVjYXVzZSB0eXBpY2FsbHkgd2hlbiBhIHRpbWVsaW5lIGZpbmlzaGVzLCB1c2VycyBleHBlY3QgdGhpbmdzIHRvIGhhdmUgcmVuZGVyZWQgZnVsbHkuIEltYWdpbmUgYW4gb25VcGRhdGUgb24gYSB0aW1lbGluZSB0aGF0IHJlcG9ydHMvY2hlY2tzIHR3ZWVuZWQgdmFsdWVzLlxuXG4gIGNvbnRleHQgJiYgKF9jb250ZXh0ID0gY29udGV4dCk7XG4gIHJlc3VsdCA9IHBhcmFtcyA/IGNhbGxiYWNrLmFwcGx5KHNjb3BlLCBwYXJhbXMpIDogY2FsbGJhY2suY2FsbChzY29wZSk7XG4gIF9jb250ZXh0ID0gcHJldkNvbnRleHQ7XG4gIHJldHVybiByZXN1bHQ7XG59LFxuICAgIF9pbnRlcnJ1cHQgPSBmdW5jdGlvbiBfaW50ZXJydXB0KGFuaW1hdGlvbikge1xuICBfcmVtb3ZlRnJvbVBhcmVudChhbmltYXRpb24pO1xuXG4gIGFuaW1hdGlvbi5zY3JvbGxUcmlnZ2VyICYmIGFuaW1hdGlvbi5zY3JvbGxUcmlnZ2VyLmtpbGwoISFfcmV2ZXJ0aW5nKTtcbiAgYW5pbWF0aW9uLnByb2dyZXNzKCkgPCAxICYmIF9jYWxsYmFjayhhbmltYXRpb24sIFwib25JbnRlcnJ1cHRcIik7XG4gIHJldHVybiBhbmltYXRpb247XG59LFxuICAgIF9xdWlja1R3ZWVuLFxuICAgIF9yZWdpc3RlclBsdWdpblF1ZXVlID0gW10sXG4gICAgX2NyZWF0ZVBsdWdpbiA9IGZ1bmN0aW9uIF9jcmVhdGVQbHVnaW4oY29uZmlnKSB7XG4gIGlmICghX3dpbmRvd0V4aXN0cygpKSB7XG4gICAgX3JlZ2lzdGVyUGx1Z2luUXVldWUucHVzaChjb25maWcpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uZmlnID0gIWNvbmZpZy5uYW1lICYmIGNvbmZpZ1tcImRlZmF1bHRcIl0gfHwgY29uZmlnOyAvL1VNRCBwYWNrYWdpbmcgd3JhcHMgdGhpbmdzIG9kZGx5LCBzbyBmb3IgZXhhbXBsZSBNb3Rpb25QYXRoSGVscGVyIGJlY29tZXMge01vdGlvblBhdGhIZWxwZXI6TW90aW9uUGF0aEhlbHBlciwgZGVmYXVsdDpNb3Rpb25QYXRoSGVscGVyfS5cblxuICB2YXIgbmFtZSA9IGNvbmZpZy5uYW1lLFxuICAgICAgaXNGdW5jID0gX2lzRnVuY3Rpb24oY29uZmlnKSxcbiAgICAgIFBsdWdpbiA9IG5hbWUgJiYgIWlzRnVuYyAmJiBjb25maWcuaW5pdCA/IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9wcm9wcyA9IFtdO1xuICB9IDogY29uZmlnLFxuICAgICAgLy9pbiBjYXNlIHNvbWVvbmUgcGFzc2VzIGluIGFuIG9iamVjdCB0aGF0J3Mgbm90IGEgcGx1Z2luLCBsaWtlIEN1c3RvbUVhc2VcbiAgaW5zdGFuY2VEZWZhdWx0cyA9IHtcbiAgICBpbml0OiBfZW1wdHlGdW5jLFxuICAgIHJlbmRlcjogX3JlbmRlclByb3BUd2VlbnMsXG4gICAgYWRkOiBfYWRkUHJvcFR3ZWVuLFxuICAgIGtpbGw6IF9raWxsUHJvcFR3ZWVuc09mLFxuICAgIG1vZGlmaWVyOiBfYWRkUGx1Z2luTW9kaWZpZXIsXG4gICAgcmF3VmFyczogMFxuICB9LFxuICAgICAgc3RhdGljcyA9IHtcbiAgICB0YXJnZXRUZXN0OiAwLFxuICAgIGdldDogMCxcbiAgICBnZXRTZXR0ZXI6IF9nZXRTZXR0ZXIsXG4gICAgYWxpYXNlczoge30sXG4gICAgcmVnaXN0ZXI6IDBcbiAgfTtcblxuICBfd2FrZSgpO1xuXG4gIGlmIChjb25maWcgIT09IFBsdWdpbikge1xuICAgIGlmIChfcGx1Z2luc1tuYW1lXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIF9zZXREZWZhdWx0cyhQbHVnaW4sIF9zZXREZWZhdWx0cyhfY29weUV4Y2x1ZGluZyhjb25maWcsIGluc3RhbmNlRGVmYXVsdHMpLCBzdGF0aWNzKSk7IC8vc3RhdGljIG1ldGhvZHNcblxuXG4gICAgX21lcmdlKFBsdWdpbi5wcm90b3R5cGUsIF9tZXJnZShpbnN0YW5jZURlZmF1bHRzLCBfY29weUV4Y2x1ZGluZyhjb25maWcsIHN0YXRpY3MpKSk7IC8vaW5zdGFuY2UgbWV0aG9kc1xuXG5cbiAgICBfcGx1Z2luc1tQbHVnaW4ucHJvcCA9IG5hbWVdID0gUGx1Z2luO1xuXG4gICAgaWYgKGNvbmZpZy50YXJnZXRUZXN0KSB7XG4gICAgICBfaGFybmVzc1BsdWdpbnMucHVzaChQbHVnaW4pO1xuXG4gICAgICBfcmVzZXJ2ZWRQcm9wc1tuYW1lXSA9IDE7XG4gICAgfVxuXG4gICAgbmFtZSA9IChuYW1lID09PSBcImNzc1wiID8gXCJDU1NcIiA6IG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnN1YnN0cigxKSkgKyBcIlBsdWdpblwiOyAvL2ZvciB0aGUgZ2xvYmFsIG5hbWUuIFwibW90aW9uUGF0aFwiIHNob3VsZCBiZWNvbWUgTW90aW9uUGF0aFBsdWdpblxuICB9XG5cbiAgX2FkZEdsb2JhbChuYW1lLCBQbHVnaW4pO1xuXG4gIGNvbmZpZy5yZWdpc3RlciAmJiBjb25maWcucmVnaXN0ZXIoZ3NhcCwgUGx1Z2luLCBQcm9wVHdlZW4pO1xufSxcblxuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDT0xPUlNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cbl8yNTUgPSAyNTUsXG4gICAgX2NvbG9yTG9va3VwID0ge1xuICBhcXVhOiBbMCwgXzI1NSwgXzI1NV0sXG4gIGxpbWU6IFswLCBfMjU1LCAwXSxcbiAgc2lsdmVyOiBbMTkyLCAxOTIsIDE5Ml0sXG4gIGJsYWNrOiBbMCwgMCwgMF0sXG4gIG1hcm9vbjogWzEyOCwgMCwgMF0sXG4gIHRlYWw6IFswLCAxMjgsIDEyOF0sXG4gIGJsdWU6IFswLCAwLCBfMjU1XSxcbiAgbmF2eTogWzAsIDAsIDEyOF0sXG4gIHdoaXRlOiBbXzI1NSwgXzI1NSwgXzI1NV0sXG4gIG9saXZlOiBbMTI4LCAxMjgsIDBdLFxuICB5ZWxsb3c6IFtfMjU1LCBfMjU1LCAwXSxcbiAgb3JhbmdlOiBbXzI1NSwgMTY1LCAwXSxcbiAgZ3JheTogWzEyOCwgMTI4LCAxMjhdLFxuICBwdXJwbGU6IFsxMjgsIDAsIDEyOF0sXG4gIGdyZWVuOiBbMCwgMTI4LCAwXSxcbiAgcmVkOiBbXzI1NSwgMCwgMF0sXG4gIHBpbms6IFtfMjU1LCAxOTIsIDIwM10sXG4gIGN5YW46IFswLCBfMjU1LCBfMjU1XSxcbiAgdHJhbnNwYXJlbnQ6IFtfMjU1LCBfMjU1LCBfMjU1LCAwXVxufSxcbiAgICAvLyBwb3NzaWJsZSBmdXR1cmUgaWRlYSB0byByZXBsYWNlIHRoZSBoYXJkLWNvZGVkIGNvbG9yIG5hbWUgdmFsdWVzIC0gcHV0IHRoaXMgaW4gdGhlIHRpY2tlci53YWtlKCkgd2hlcmUgd2Ugc2V0IHRoZSBfZG9jOlxuLy8gbGV0IGN0eCA9IF9kb2MuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS5nZXRDb250ZXh0KFwiMmRcIik7XG4vLyBfZm9yRWFjaE5hbWUoXCJhcXVhLGxpbWUsc2lsdmVyLGJsYWNrLG1hcm9vbix0ZWFsLGJsdWUsbmF2eSx3aGl0ZSxvbGl2ZSx5ZWxsb3csb3JhbmdlLGdyYXkscHVycGxlLGdyZWVuLHJlZCxwaW5rLGN5YW5cIiwgY29sb3IgPT4ge2N0eC5maWxsU3R5bGUgPSBjb2xvcjsgX2NvbG9yTG9va3VwW2NvbG9yXSA9IHNwbGl0Q29sb3IoY3R4LmZpbGxTdHlsZSl9KTtcbl9odWUgPSBmdW5jdGlvbiBfaHVlKGgsIG0xLCBtMikge1xuICBoICs9IGggPCAwID8gMSA6IGggPiAxID8gLTEgOiAwO1xuICByZXR1cm4gKGggKiA2IDwgMSA/IG0xICsgKG0yIC0gbTEpICogaCAqIDYgOiBoIDwgLjUgPyBtMiA6IGggKiAzIDwgMiA/IG0xICsgKG0yIC0gbTEpICogKDIgLyAzIC0gaCkgKiA2IDogbTEpICogXzI1NSArIC41IHwgMDtcbn0sXG4gICAgc3BsaXRDb2xvciA9IGZ1bmN0aW9uIHNwbGl0Q29sb3IodiwgdG9IU0wsIGZvcmNlQWxwaGEpIHtcbiAgdmFyIGEgPSAhdiA/IF9jb2xvckxvb2t1cC5ibGFjayA6IF9pc051bWJlcih2KSA/IFt2ID4+IDE2LCB2ID4+IDggJiBfMjU1LCB2ICYgXzI1NV0gOiAwLFxuICAgICAgcixcbiAgICAgIGcsXG4gICAgICBiLFxuICAgICAgaCxcbiAgICAgIHMsXG4gICAgICBsLFxuICAgICAgbWF4LFxuICAgICAgbWluLFxuICAgICAgZCxcbiAgICAgIHdhc0hTTDtcblxuICBpZiAoIWEpIHtcbiAgICBpZiAodi5zdWJzdHIoLTEpID09PSBcIixcIikge1xuICAgICAgLy9zb21ldGltZXMgYSB0cmFpbGluZyBjb21tYSBpcyBpbmNsdWRlZCBhbmQgd2Ugc2hvdWxkIGNob3AgaXQgb2ZmICh0eXBpY2FsbHkgZnJvbSBhIGNvbW1hLWRlbGltaXRlZCBsaXN0IG9mIHZhbHVlcyBsaWtlIGEgdGV4dFNoYWRvdzpcIjJweCAycHggMnB4IGJsdWUsIDVweCA1cHggNXB4IHJnYigyNTUsMCwwKVwiIC0gaW4gdGhpcyBleGFtcGxlIFwiYmx1ZSxcIiBoYXMgYSB0cmFpbGluZyBjb21tYS4gV2UgY291bGQgc3RyaXAgaXQgb3V0IGluc2lkZSBwYXJzZUNvbXBsZXgoKSBidXQgd2UnZCBuZWVkIHRvIGRvIGl0IHRvIHRoZSBiZWdpbm5pbmcgYW5kIGVuZGluZyB2YWx1ZXMgcGx1cyBpdCB3b3VsZG4ndCBwcm92aWRlIHByb3RlY3Rpb24gZnJvbSBvdGhlciBwb3RlbnRpYWwgc2NlbmFyaW9zIGxpa2UgaWYgdGhlIHVzZXIgcGFzc2VzIGluIGEgc2ltaWxhciB2YWx1ZS5cbiAgICAgIHYgPSB2LnN1YnN0cigwLCB2Lmxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIGlmIChfY29sb3JMb29rdXBbdl0pIHtcbiAgICAgIGEgPSBfY29sb3JMb29rdXBbdl07XG4gICAgfSBlbHNlIGlmICh2LmNoYXJBdCgwKSA9PT0gXCIjXCIpIHtcbiAgICAgIGlmICh2Lmxlbmd0aCA8IDYpIHtcbiAgICAgICAgLy9mb3Igc2hvcnRoYW5kIGxpa2UgIzlGMCBvciAjOUYwRiAoY291bGQgaGF2ZSBhbHBoYSlcbiAgICAgICAgciA9IHYuY2hhckF0KDEpO1xuICAgICAgICBnID0gdi5jaGFyQXQoMik7XG4gICAgICAgIGIgPSB2LmNoYXJBdCgzKTtcbiAgICAgICAgdiA9IFwiI1wiICsgciArIHIgKyBnICsgZyArIGIgKyBiICsgKHYubGVuZ3RoID09PSA1ID8gdi5jaGFyQXQoNCkgKyB2LmNoYXJBdCg0KSA6IFwiXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodi5sZW5ndGggPT09IDkpIHtcbiAgICAgICAgLy8gaGV4IHdpdGggYWxwaGEsIGxpa2UgI2ZkNWU1M2ZmXG4gICAgICAgIGEgPSBwYXJzZUludCh2LnN1YnN0cigxLCA2KSwgMTYpO1xuICAgICAgICByZXR1cm4gW2EgPj4gMTYsIGEgPj4gOCAmIF8yNTUsIGEgJiBfMjU1LCBwYXJzZUludCh2LnN1YnN0cig3KSwgMTYpIC8gMjU1XTtcbiAgICAgIH1cblxuICAgICAgdiA9IHBhcnNlSW50KHYuc3Vic3RyKDEpLCAxNik7XG4gICAgICBhID0gW3YgPj4gMTYsIHYgPj4gOCAmIF8yNTUsIHYgJiBfMjU1XTtcbiAgICB9IGVsc2UgaWYgKHYuc3Vic3RyKDAsIDMpID09PSBcImhzbFwiKSB7XG4gICAgICBhID0gd2FzSFNMID0gdi5tYXRjaChfc3RyaWN0TnVtRXhwKTtcblxuICAgICAgaWYgKCF0b0hTTCkge1xuICAgICAgICBoID0gK2FbMF0gJSAzNjAgLyAzNjA7XG4gICAgICAgIHMgPSArYVsxXSAvIDEwMDtcbiAgICAgICAgbCA9ICthWzJdIC8gMTAwO1xuICAgICAgICBnID0gbCA8PSAuNSA/IGwgKiAocyArIDEpIDogbCArIHMgLSBsICogcztcbiAgICAgICAgciA9IGwgKiAyIC0gZztcbiAgICAgICAgYS5sZW5ndGggPiAzICYmIChhWzNdICo9IDEpOyAvL2Nhc3QgYXMgbnVtYmVyXG5cbiAgICAgICAgYVswXSA9IF9odWUoaCArIDEgLyAzLCByLCBnKTtcbiAgICAgICAgYVsxXSA9IF9odWUoaCwgciwgZyk7XG4gICAgICAgIGFbMl0gPSBfaHVlKGggLSAxIC8gMywgciwgZyk7XG4gICAgICB9IGVsc2UgaWYgKH52LmluZGV4T2YoXCI9XCIpKSB7XG4gICAgICAgIC8vaWYgcmVsYXRpdmUgdmFsdWVzIGFyZSBmb3VuZCwganVzdCByZXR1cm4gdGhlIHJhdyBzdHJpbmdzIHdpdGggdGhlIHJlbGF0aXZlIHByZWZpeGVzIGluIHBsYWNlLlxuICAgICAgICBhID0gdi5tYXRjaChfbnVtRXhwKTtcbiAgICAgICAgZm9yY2VBbHBoYSAmJiBhLmxlbmd0aCA8IDQgJiYgKGFbM10gPSAxKTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGEgPSB2Lm1hdGNoKF9zdHJpY3ROdW1FeHApIHx8IF9jb2xvckxvb2t1cC50cmFuc3BhcmVudDtcbiAgICB9XG5cbiAgICBhID0gYS5tYXAoTnVtYmVyKTtcbiAgfVxuXG4gIGlmICh0b0hTTCAmJiAhd2FzSFNMKSB7XG4gICAgciA9IGFbMF0gLyBfMjU1O1xuICAgIGcgPSBhWzFdIC8gXzI1NTtcbiAgICBiID0gYVsyXSAvIF8yNTU7XG4gICAgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gICAgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgbCA9IChtYXggKyBtaW4pIC8gMjtcblxuICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgaCA9IHMgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBkID0gbWF4IC0gbWluO1xuICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuICAgICAgaCA9IG1heCA9PT0gciA/IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApIDogbWF4ID09PSBnID8gKGIgLSByKSAvIGQgKyAyIDogKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgaCAqPSA2MDtcbiAgICB9XG5cbiAgICBhWzBdID0gfn4oaCArIC41KTtcbiAgICBhWzFdID0gfn4ocyAqIDEwMCArIC41KTtcbiAgICBhWzJdID0gfn4obCAqIDEwMCArIC41KTtcbiAgfVxuXG4gIGZvcmNlQWxwaGEgJiYgYS5sZW5ndGggPCA0ICYmIChhWzNdID0gMSk7XG4gIHJldHVybiBhO1xufSxcbiAgICBfY29sb3JPcmRlckRhdGEgPSBmdW5jdGlvbiBfY29sb3JPcmRlckRhdGEodikge1xuICAvLyBzdHJpcHMgb3V0IHRoZSBjb2xvcnMgZnJvbSB0aGUgc3RyaW5nLCBmaW5kcyBhbGwgdGhlIG51bWVyaWMgc2xvdHMgKHdpdGggdW5pdHMpIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIHRob3NlLiBUaGUgQXJyYXkgYWxzbyBoYXMgYSBcImNcIiBwcm9wZXJ0eSB3aGljaCBpcyBhbiBBcnJheSBvZiB0aGUgaW5kZXggdmFsdWVzIHdoZXJlIHRoZSBjb2xvcnMgYmVsb25nLiBUaGlzIGlzIHRvIGhlbHAgd29yayBhcm91bmQgaXNzdWVzIHdoZXJlIHRoZXJlJ3MgYSBtaXMtbWF0Y2hlZCBvcmRlciBvZiBjb2xvci9udW1lcmljIGRhdGEgbGlrZSBkcm9wLXNoYWRvdygjZjAwIDBweCAxcHggMnB4KSBhbmQgZHJvcC1zaGFkb3coMHggMXB4IDJweCAjZjAwKS4gVGhpcyBpcyBiYXNpY2FsbHkgYSBoZWxwZXIgZnVuY3Rpb24gdXNlZCBpbiBfZm9ybWF0Q29sb3JzKClcbiAgdmFyIHZhbHVlcyA9IFtdLFxuICAgICAgYyA9IFtdLFxuICAgICAgaSA9IC0xO1xuICB2LnNwbGl0KF9jb2xvckV4cCkuZm9yRWFjaChmdW5jdGlvbiAodikge1xuICAgIHZhciBhID0gdi5tYXRjaChfbnVtV2l0aFVuaXRFeHApIHx8IFtdO1xuICAgIHZhbHVlcy5wdXNoLmFwcGx5KHZhbHVlcywgYSk7XG4gICAgYy5wdXNoKGkgKz0gYS5sZW5ndGggKyAxKTtcbiAgfSk7XG4gIHZhbHVlcy5jID0gYztcbiAgcmV0dXJuIHZhbHVlcztcbn0sXG4gICAgX2Zvcm1hdENvbG9ycyA9IGZ1bmN0aW9uIF9mb3JtYXRDb2xvcnMocywgdG9IU0wsIG9yZGVyTWF0Y2hEYXRhKSB7XG4gIHZhciByZXN1bHQgPSBcIlwiLFxuICAgICAgY29sb3JzID0gKHMgKyByZXN1bHQpLm1hdGNoKF9jb2xvckV4cCksXG4gICAgICB0eXBlID0gdG9IU0wgPyBcImhzbGEoXCIgOiBcInJnYmEoXCIsXG4gICAgICBpID0gMCxcbiAgICAgIGMsXG4gICAgICBzaGVsbCxcbiAgICAgIGQsXG4gICAgICBsO1xuXG4gIGlmICghY29sb3JzKSB7XG4gICAgcmV0dXJuIHM7XG4gIH1cblxuICBjb2xvcnMgPSBjb2xvcnMubWFwKGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHJldHVybiAoY29sb3IgPSBzcGxpdENvbG9yKGNvbG9yLCB0b0hTTCwgMSkpICYmIHR5cGUgKyAodG9IU0wgPyBjb2xvclswXSArIFwiLFwiICsgY29sb3JbMV0gKyBcIiUsXCIgKyBjb2xvclsyXSArIFwiJSxcIiArIGNvbG9yWzNdIDogY29sb3Iuam9pbihcIixcIikpICsgXCIpXCI7XG4gIH0pO1xuXG4gIGlmIChvcmRlck1hdGNoRGF0YSkge1xuICAgIGQgPSBfY29sb3JPcmRlckRhdGEocyk7XG4gICAgYyA9IG9yZGVyTWF0Y2hEYXRhLmM7XG5cbiAgICBpZiAoYy5qb2luKHJlc3VsdCkgIT09IGQuYy5qb2luKHJlc3VsdCkpIHtcbiAgICAgIHNoZWxsID0gcy5yZXBsYWNlKF9jb2xvckV4cCwgXCIxXCIpLnNwbGl0KF9udW1XaXRoVW5pdEV4cCk7XG4gICAgICBsID0gc2hlbGwubGVuZ3RoIC0gMTtcblxuICAgICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IHNoZWxsW2ldICsgKH5jLmluZGV4T2YoaSkgPyBjb2xvcnMuc2hpZnQoKSB8fCB0eXBlICsgXCIwLDAsMCwwKVwiIDogKGQubGVuZ3RoID8gZCA6IGNvbG9ycy5sZW5ndGggPyBjb2xvcnMgOiBvcmRlck1hdGNoRGF0YSkuc2hpZnQoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKCFzaGVsbCkge1xuICAgIHNoZWxsID0gcy5zcGxpdChfY29sb3JFeHApO1xuICAgIGwgPSBzaGVsbC5sZW5ndGggLSAxO1xuXG4gICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHJlc3VsdCArPSBzaGVsbFtpXSArIGNvbG9yc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0ICsgc2hlbGxbbF07XG59LFxuICAgIF9jb2xvckV4cCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHMgPSBcIig/OlxcXFxiKD86KD86cmdifHJnYmF8aHNsfGhzbGEpXFxcXCguKz9cXFxcKSl8XFxcXEIjKD86WzAtOWEtZl17Myw0fSl7MSwyfVxcXFxiXCIsXG4gICAgICAvL3dlJ2xsIGR5bmFtaWNhbGx5IGJ1aWxkIHRoaXMgUmVndWxhciBFeHByZXNzaW9uIHRvIGNvbnNlcnZlIGZpbGUgc2l6ZS4gQWZ0ZXIgYnVpbGRpbmcgaXQsIGl0IHdpbGwgYmUgYWJsZSB0byBmaW5kIHJnYigpLCByZ2JhKCksICMgKGhleGFkZWNpbWFsKSwgYW5kIG5hbWVkIGNvbG9yIHZhbHVlcyBsaWtlIHJlZCwgYmx1ZSwgcHVycGxlLCBldGMuLFxuICBwO1xuXG4gIGZvciAocCBpbiBfY29sb3JMb29rdXApIHtcbiAgICBzICs9IFwifFwiICsgcCArIFwiXFxcXGJcIjtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVnRXhwKHMgKyBcIilcIiwgXCJnaVwiKTtcbn0oKSxcbiAgICBfaHNsRXhwID0gL2hzbFthXT9cXCgvLFxuICAgIF9jb2xvclN0cmluZ0ZpbHRlciA9IGZ1bmN0aW9uIF9jb2xvclN0cmluZ0ZpbHRlcihhKSB7XG4gIHZhciBjb21iaW5lZCA9IGEuam9pbihcIiBcIiksXG4gICAgICB0b0hTTDtcbiAgX2NvbG9yRXhwLmxhc3RJbmRleCA9IDA7XG5cbiAgaWYgKF9jb2xvckV4cC50ZXN0KGNvbWJpbmVkKSkge1xuICAgIHRvSFNMID0gX2hzbEV4cC50ZXN0KGNvbWJpbmVkKTtcbiAgICBhWzFdID0gX2Zvcm1hdENvbG9ycyhhWzFdLCB0b0hTTCk7XG4gICAgYVswXSA9IF9mb3JtYXRDb2xvcnMoYVswXSwgdG9IU0wsIF9jb2xvck9yZGVyRGF0YShhWzFdKSk7IC8vIG1ha2Ugc3VyZSB0aGUgb3JkZXIgb2YgbnVtYmVycy9jb2xvcnMgbWF0Y2ggd2l0aCB0aGUgRU5EIHZhbHVlLlxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn0sXG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVElDS0VSXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5fdGlja2VyQWN0aXZlLFxuICAgIF90aWNrZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBfZ2V0VGltZSA9IERhdGUubm93LFxuICAgICAgX2xhZ1RocmVzaG9sZCA9IDUwMCxcbiAgICAgIF9hZGp1c3RlZExhZyA9IDMzLFxuICAgICAgX3N0YXJ0VGltZSA9IF9nZXRUaW1lKCksXG4gICAgICBfbGFzdFVwZGF0ZSA9IF9zdGFydFRpbWUsXG4gICAgICBfZ2FwID0gMTAwMCAvIDI0MCxcbiAgICAgIF9uZXh0VGltZSA9IF9nYXAsXG4gICAgICBfbGlzdGVuZXJzID0gW10sXG4gICAgICBfaWQsXG4gICAgICBfcmVxLFxuICAgICAgX3JhZixcbiAgICAgIF9zZWxmLFxuICAgICAgX2RlbHRhLFxuICAgICAgX2ksXG4gICAgICBfdGljayA9IGZ1bmN0aW9uIF90aWNrKHYpIHtcbiAgICB2YXIgZWxhcHNlZCA9IF9nZXRUaW1lKCkgLSBfbGFzdFVwZGF0ZSxcbiAgICAgICAgbWFudWFsID0gdiA9PT0gdHJ1ZSxcbiAgICAgICAgb3ZlcmxhcCxcbiAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgIHRpbWUsXG4gICAgICAgIGZyYW1lO1xuXG4gICAgZWxhcHNlZCA+IF9sYWdUaHJlc2hvbGQgJiYgKF9zdGFydFRpbWUgKz0gZWxhcHNlZCAtIF9hZGp1c3RlZExhZyk7XG4gICAgX2xhc3RVcGRhdGUgKz0gZWxhcHNlZDtcbiAgICB0aW1lID0gX2xhc3RVcGRhdGUgLSBfc3RhcnRUaW1lO1xuICAgIG92ZXJsYXAgPSB0aW1lIC0gX25leHRUaW1lO1xuXG4gICAgaWYgKG92ZXJsYXAgPiAwIHx8IG1hbnVhbCkge1xuICAgICAgZnJhbWUgPSArK19zZWxmLmZyYW1lO1xuICAgICAgX2RlbHRhID0gdGltZSAtIF9zZWxmLnRpbWUgKiAxMDAwO1xuICAgICAgX3NlbGYudGltZSA9IHRpbWUgPSB0aW1lIC8gMTAwMDtcbiAgICAgIF9uZXh0VGltZSArPSBvdmVybGFwICsgKG92ZXJsYXAgPj0gX2dhcCA/IDQgOiBfZ2FwIC0gb3ZlcmxhcCk7XG4gICAgICBkaXNwYXRjaCA9IDE7XG4gICAgfVxuXG4gICAgbWFudWFsIHx8IChfaWQgPSBfcmVxKF90aWNrKSk7IC8vbWFrZSBzdXJlIHRoZSByZXF1ZXN0IGlzIG1hZGUgYmVmb3JlIHdlIGRpc3BhdGNoIHRoZSBcInRpY2tcIiBldmVudCBzbyB0aGF0IHRpbWluZyBpcyBtYWludGFpbmVkLiBPdGhlcndpc2UsIGlmIHByb2Nlc3NpbmcgdGhlIFwidGlja1wiIHJlcXVpcmVzIGEgYnVuY2ggb2YgdGltZSAobGlrZSAxNW1zKSBhbmQgd2UncmUgdXNpbmcgYSBzZXRUaW1lb3V0KCkgdGhhdCdzIGJhc2VkIG9uIDE2LjdtcywgaXQnZCB0ZWNobmljYWxseSB0YWtlIDMxLjdtcyBiZXR3ZWVuIGZyYW1lcyBvdGhlcndpc2UuXG5cbiAgICBpZiAoZGlzcGF0Y2gpIHtcbiAgICAgIGZvciAoX2kgPSAwOyBfaSA8IF9saXN0ZW5lcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIC8vIHVzZSBfaSBhbmQgY2hlY2sgX2xpc3RlbmVycy5sZW5ndGggaW5zdGVhZCBvZiBhIHZhcmlhYmxlIGJlY2F1c2UgYSBsaXN0ZW5lciBjb3VsZCBnZXQgcmVtb3ZlZCBkdXJpbmcgdGhlIGxvb3AsIGFuZCBpZiB0aGF0IGhhcHBlbnMgdG8gYW4gZWxlbWVudCBsZXNzIHRoYW4gdGhlIGN1cnJlbnQgaW5kZXgsIGl0J2QgdGhyb3cgdGhpbmdzIG9mZiBpbiB0aGUgbG9vcC5cbiAgICAgICAgX2xpc3RlbmVyc1tfaV0odGltZSwgX2RlbHRhLCBmcmFtZSwgdik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9zZWxmID0ge1xuICAgIHRpbWU6IDAsXG4gICAgZnJhbWU6IDAsXG4gICAgdGljazogZnVuY3Rpb24gdGljaygpIHtcbiAgICAgIF90aWNrKHRydWUpO1xuICAgIH0sXG4gICAgZGVsdGFSYXRpbzogZnVuY3Rpb24gZGVsdGFSYXRpbyhmcHMpIHtcbiAgICAgIHJldHVybiBfZGVsdGEgLyAoMTAwMCAvIChmcHMgfHwgNjApKTtcbiAgICB9LFxuICAgIHdha2U6IGZ1bmN0aW9uIHdha2UoKSB7XG4gICAgICBpZiAoX2NvcmVSZWFkeSkge1xuICAgICAgICBpZiAoIV9jb3JlSW5pdHRlZCAmJiBfd2luZG93RXhpc3RzKCkpIHtcbiAgICAgICAgICBfd2luID0gX2NvcmVJbml0dGVkID0gd2luZG93O1xuICAgICAgICAgIF9kb2MgPSBfd2luLmRvY3VtZW50IHx8IHt9O1xuICAgICAgICAgIF9nbG9iYWxzLmdzYXAgPSBnc2FwO1xuICAgICAgICAgIChfd2luLmdzYXBWZXJzaW9ucyB8fCAoX3dpbi5nc2FwVmVyc2lvbnMgPSBbXSkpLnB1c2goZ3NhcC52ZXJzaW9uKTtcblxuICAgICAgICAgIF9pbnN0YWxsKF9pbnN0YWxsU2NvcGUgfHwgX3dpbi5HcmVlblNvY2tHbG9iYWxzIHx8ICFfd2luLmdzYXAgJiYgX3dpbiB8fCB7fSk7XG5cbiAgICAgICAgICBfcmFmID0gX3dpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbiAgICAgICAgICBfcmVnaXN0ZXJQbHVnaW5RdWV1ZS5mb3JFYWNoKF9jcmVhdGVQbHVnaW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgX2lkICYmIF9zZWxmLnNsZWVwKCk7XG5cbiAgICAgICAgX3JlcSA9IF9yYWYgfHwgZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmLCBfbmV4dFRpbWUgLSBfc2VsZi50aW1lICogMTAwMCArIDEgfCAwKTtcbiAgICAgICAgfTtcblxuICAgICAgICBfdGlja2VyQWN0aXZlID0gMTtcblxuICAgICAgICBfdGljaygyKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNsZWVwOiBmdW5jdGlvbiBzbGVlcCgpIHtcbiAgICAgIChfcmFmID8gX3dpbi5jYW5jZWxBbmltYXRpb25GcmFtZSA6IGNsZWFyVGltZW91dCkoX2lkKTtcbiAgICAgIF90aWNrZXJBY3RpdmUgPSAwO1xuICAgICAgX3JlcSA9IF9lbXB0eUZ1bmM7XG4gICAgfSxcbiAgICBsYWdTbW9vdGhpbmc6IGZ1bmN0aW9uIGxhZ1Ntb290aGluZyh0aHJlc2hvbGQsIGFkanVzdGVkTGFnKSB7XG4gICAgICBfbGFnVGhyZXNob2xkID0gdGhyZXNob2xkIHx8IEluZmluaXR5OyAvLyB6ZXJvIHNob3VsZCBiZSBpbnRlcnByZXRlZCBhcyBiYXNpY2FsbHkgdW5saW1pdGVkXG5cbiAgICAgIF9hZGp1c3RlZExhZyA9IE1hdGgubWluKGFkanVzdGVkTGFnIHx8IDMzLCBfbGFnVGhyZXNob2xkKTtcbiAgICB9LFxuICAgIGZwczogZnVuY3Rpb24gZnBzKF9mcHMpIHtcbiAgICAgIF9nYXAgPSAxMDAwIC8gKF9mcHMgfHwgMjQwKTtcbiAgICAgIF9uZXh0VGltZSA9IF9zZWxmLnRpbWUgKiAxMDAwICsgX2dhcDtcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24gYWRkKGNhbGxiYWNrLCBvbmNlLCBwcmlvcml0aXplKSB7XG4gICAgICB2YXIgZnVuYyA9IG9uY2UgPyBmdW5jdGlvbiAodCwgZCwgZiwgdikge1xuICAgICAgICBjYWxsYmFjayh0LCBkLCBmLCB2KTtcblxuICAgICAgICBfc2VsZi5yZW1vdmUoZnVuYyk7XG4gICAgICB9IDogY2FsbGJhY2s7XG5cbiAgICAgIF9zZWxmLnJlbW92ZShjYWxsYmFjayk7XG5cbiAgICAgIF9saXN0ZW5lcnNbcHJpb3JpdGl6ZSA/IFwidW5zaGlmdFwiIDogXCJwdXNoXCJdKGZ1bmMpO1xuXG4gICAgICBfd2FrZSgpO1xuXG4gICAgICByZXR1cm4gZnVuYztcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKGNhbGxiYWNrLCBpKSB7XG4gICAgICB+KGkgPSBfbGlzdGVuZXJzLmluZGV4T2YoY2FsbGJhY2spKSAmJiBfbGlzdGVuZXJzLnNwbGljZShpLCAxKSAmJiBfaSA+PSBpICYmIF9pLS07XG4gICAgfSxcbiAgICBfbGlzdGVuZXJzOiBfbGlzdGVuZXJzXG4gIH07XG4gIHJldHVybiBfc2VsZjtcbn0oKSxcbiAgICBfd2FrZSA9IGZ1bmN0aW9uIF93YWtlKCkge1xuICByZXR1cm4gIV90aWNrZXJBY3RpdmUgJiYgX3RpY2tlci53YWtlKCk7XG59LFxuICAgIC8vYWxzbyBlbnN1cmVzIHRoZSBjb3JlIGNsYXNzZXMgYXJlIGluaXRpYWxpemVkLlxuXG4vKlxuKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qIEVBU0lOR1xuKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qL1xuX2Vhc2VNYXAgPSB7fSxcbiAgICBfY3VzdG9tRWFzZUV4cCA9IC9eW1xcZC5cXC1NXVtcXGQuXFwtLFxcc10vLFxuICAgIF9xdW90ZXNFeHAgPSAvW1wiJ10vZyxcbiAgICBfcGFyc2VPYmplY3RJblN0cmluZyA9IGZ1bmN0aW9uIF9wYXJzZU9iamVjdEluU3RyaW5nKHZhbHVlKSB7XG4gIC8vdGFrZXMgYSBzdHJpbmcgbGlrZSBcInt3aWdnbGVzOjEwLCB0eXBlOmFudGljaXBhdGV9KVwiIGFuZCB0dXJucyBpdCBpbnRvIGEgcmVhbCBvYmplY3QuIE5vdGljZSBpdCBlbmRzIGluIFwiKVwiIGFuZCBpbmNsdWRlcyB0aGUge30gd3JhcHBlcnMuIFRoaXMgaXMgYmVjYXVzZSB3ZSBvbmx5IHVzZSB0aGlzIGZ1bmN0aW9uIGZvciBwYXJzaW5nIGVhc2UgY29uZmlncyBhbmQgcHJpb3JpdGl6ZWQgb3B0aW1pemF0aW9uIHJhdGhlciB0aGFuIHJldXNhYmlsaXR5LlxuICB2YXIgb2JqID0ge30sXG4gICAgICBzcGxpdCA9IHZhbHVlLnN1YnN0cigxLCB2YWx1ZS5sZW5ndGggLSAzKS5zcGxpdChcIjpcIiksXG4gICAgICBrZXkgPSBzcGxpdFswXSxcbiAgICAgIGkgPSAxLFxuICAgICAgbCA9IHNwbGl0Lmxlbmd0aCxcbiAgICAgIGluZGV4LFxuICAgICAgdmFsLFxuICAgICAgcGFyc2VkVmFsO1xuXG4gIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFsID0gc3BsaXRbaV07XG4gICAgaW5kZXggPSBpICE9PSBsIC0gMSA/IHZhbC5sYXN0SW5kZXhPZihcIixcIikgOiB2YWwubGVuZ3RoO1xuICAgIHBhcnNlZFZhbCA9IHZhbC5zdWJzdHIoMCwgaW5kZXgpO1xuICAgIG9ialtrZXldID0gaXNOYU4ocGFyc2VkVmFsKSA/IHBhcnNlZFZhbC5yZXBsYWNlKF9xdW90ZXNFeHAsIFwiXCIpLnRyaW0oKSA6ICtwYXJzZWRWYWw7XG4gICAga2V5ID0gdmFsLnN1YnN0cihpbmRleCArIDEpLnRyaW0oKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59LFxuICAgIF92YWx1ZUluUGFyZW50aGVzZXMgPSBmdW5jdGlvbiBfdmFsdWVJblBhcmVudGhlc2VzKHZhbHVlKSB7XG4gIHZhciBvcGVuID0gdmFsdWUuaW5kZXhPZihcIihcIikgKyAxLFxuICAgICAgY2xvc2UgPSB2YWx1ZS5pbmRleE9mKFwiKVwiKSxcbiAgICAgIG5lc3RlZCA9IHZhbHVlLmluZGV4T2YoXCIoXCIsIG9wZW4pO1xuICByZXR1cm4gdmFsdWUuc3Vic3RyaW5nKG9wZW4sIH5uZXN0ZWQgJiYgbmVzdGVkIDwgY2xvc2UgPyB2YWx1ZS5pbmRleE9mKFwiKVwiLCBjbG9zZSArIDEpIDogY2xvc2UpO1xufSxcbiAgICBfY29uZmlnRWFzZUZyb21TdHJpbmcgPSBmdW5jdGlvbiBfY29uZmlnRWFzZUZyb21TdHJpbmcobmFtZSkge1xuICAvL25hbWUgY2FuIGJlIGEgc3RyaW5nIGxpa2UgXCJlbGFzdGljLm91dCgxLDAuNSlcIiwgYW5kIHBhc3MgaW4gX2Vhc2VNYXAgYXMgb2JqIGFuZCBpdCdsbCBwYXJzZSBpdCBvdXQgYW5kIGNhbGwgdGhlIGFjdHVhbCBmdW5jdGlvbiBsaWtlIF9lYXNlTWFwLkVsYXN0aWMuZWFzZU91dC5jb25maWcoMSwwLjUpLiBJdCB3aWxsIGFsc28gcGFyc2UgY3VzdG9tIGVhc2Ugc3RyaW5ncyBhcyBsb25nIGFzIEN1c3RvbUVhc2UgaXMgbG9hZGVkIGFuZCByZWdpc3RlcmVkIChpbnRlcm5hbGx5IGFzIF9lYXNlTWFwLl9DRSkuXG4gIHZhciBzcGxpdCA9IChuYW1lICsgXCJcIikuc3BsaXQoXCIoXCIpLFxuICAgICAgZWFzZSA9IF9lYXNlTWFwW3NwbGl0WzBdXTtcbiAgcmV0dXJuIGVhc2UgJiYgc3BsaXQubGVuZ3RoID4gMSAmJiBlYXNlLmNvbmZpZyA/IGVhc2UuY29uZmlnLmFwcGx5KG51bGwsIH5uYW1lLmluZGV4T2YoXCJ7XCIpID8gW19wYXJzZU9iamVjdEluU3RyaW5nKHNwbGl0WzFdKV0gOiBfdmFsdWVJblBhcmVudGhlc2VzKG5hbWUpLnNwbGl0KFwiLFwiKS5tYXAoX251bWVyaWNJZlBvc3NpYmxlKSkgOiBfZWFzZU1hcC5fQ0UgJiYgX2N1c3RvbUVhc2VFeHAudGVzdChuYW1lKSA/IF9lYXNlTWFwLl9DRShcIlwiLCBuYW1lKSA6IGVhc2U7XG59LFxuICAgIF9pbnZlcnRFYXNlID0gZnVuY3Rpb24gX2ludmVydEVhc2UoZWFzZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIGVhc2UoMSAtIHApO1xuICB9O1xufSxcbiAgICAvLyBhbGxvdyB5b3lvRWFzZSB0byBiZSBzZXQgaW4gY2hpbGRyZW4gYW5kIGhhdmUgdGhvc2UgYWZmZWN0ZWQgd2hlbiB0aGUgcGFyZW50L2FuY2VzdG9yIHRpbWVsaW5lIHlveW9zLlxuX3Byb3BhZ2F0ZVlveW9FYXNlID0gZnVuY3Rpb24gX3Byb3BhZ2F0ZVlveW9FYXNlKHRpbWVsaW5lLCBpc1lveW8pIHtcbiAgdmFyIGNoaWxkID0gdGltZWxpbmUuX2ZpcnN0LFxuICAgICAgZWFzZTtcblxuICB3aGlsZSAoY2hpbGQpIHtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUaW1lbGluZSkge1xuICAgICAgX3Byb3BhZ2F0ZVlveW9FYXNlKGNoaWxkLCBpc1lveW8pO1xuICAgIH0gZWxzZSBpZiAoY2hpbGQudmFycy55b3lvRWFzZSAmJiAoIWNoaWxkLl95b3lvIHx8ICFjaGlsZC5fcmVwZWF0KSAmJiBjaGlsZC5feW95byAhPT0gaXNZb3lvKSB7XG4gICAgICBpZiAoY2hpbGQudGltZWxpbmUpIHtcbiAgICAgICAgX3Byb3BhZ2F0ZVlveW9FYXNlKGNoaWxkLnRpbWVsaW5lLCBpc1lveW8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWFzZSA9IGNoaWxkLl9lYXNlO1xuICAgICAgICBjaGlsZC5fZWFzZSA9IGNoaWxkLl95RWFzZTtcbiAgICAgICAgY2hpbGQuX3lFYXNlID0gZWFzZTtcbiAgICAgICAgY2hpbGQuX3lveW8gPSBpc1lveW87XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgfVxufSxcbiAgICBfcGFyc2VFYXNlID0gZnVuY3Rpb24gX3BhcnNlRWFzZShlYXNlLCBkZWZhdWx0RWFzZSkge1xuICByZXR1cm4gIWVhc2UgPyBkZWZhdWx0RWFzZSA6IChfaXNGdW5jdGlvbihlYXNlKSA/IGVhc2UgOiBfZWFzZU1hcFtlYXNlXSB8fCBfY29uZmlnRWFzZUZyb21TdHJpbmcoZWFzZSkpIHx8IGRlZmF1bHRFYXNlO1xufSxcbiAgICBfaW5zZXJ0RWFzZSA9IGZ1bmN0aW9uIF9pbnNlcnRFYXNlKG5hbWVzLCBlYXNlSW4sIGVhc2VPdXQsIGVhc2VJbk91dCkge1xuICBpZiAoZWFzZU91dCA9PT0gdm9pZCAwKSB7XG4gICAgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgICAgcmV0dXJuIDEgLSBlYXNlSW4oMSAtIHApO1xuICAgIH07XG4gIH1cblxuICBpZiAoZWFzZUluT3V0ID09PSB2b2lkIDApIHtcbiAgICBlYXNlSW5PdXQgPSBmdW5jdGlvbiBlYXNlSW5PdXQocCkge1xuICAgICAgcmV0dXJuIHAgPCAuNSA/IGVhc2VJbihwICogMikgLyAyIDogMSAtIGVhc2VJbigoMSAtIHApICogMikgLyAyO1xuICAgIH07XG4gIH1cblxuICB2YXIgZWFzZSA9IHtcbiAgICBlYXNlSW46IGVhc2VJbixcbiAgICBlYXNlT3V0OiBlYXNlT3V0LFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0XG4gIH0sXG4gICAgICBsb3dlcmNhc2VOYW1lO1xuXG4gIF9mb3JFYWNoTmFtZShuYW1lcywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBfZWFzZU1hcFtuYW1lXSA9IF9nbG9iYWxzW25hbWVdID0gZWFzZTtcbiAgICBfZWFzZU1hcFtsb3dlcmNhc2VOYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpXSA9IGVhc2VPdXQ7XG5cbiAgICBmb3IgKHZhciBwIGluIGVhc2UpIHtcbiAgICAgIF9lYXNlTWFwW2xvd2VyY2FzZU5hbWUgKyAocCA9PT0gXCJlYXNlSW5cIiA/IFwiLmluXCIgOiBwID09PSBcImVhc2VPdXRcIiA/IFwiLm91dFwiIDogXCIuaW5PdXRcIildID0gX2Vhc2VNYXBbbmFtZSArIFwiLlwiICsgcF0gPSBlYXNlW3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGVhc2U7XG59LFxuICAgIF9lYXNlSW5PdXRGcm9tT3V0ID0gZnVuY3Rpb24gX2Vhc2VJbk91dEZyb21PdXQoZWFzZU91dCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gcCA8IC41ID8gKDEgLSBlYXNlT3V0KDEgLSBwICogMikpIC8gMiA6IC41ICsgZWFzZU91dCgocCAtIC41KSAqIDIpIC8gMjtcbiAgfTtcbn0sXG4gICAgX2NvbmZpZ0VsYXN0aWMgPSBmdW5jdGlvbiBfY29uZmlnRWxhc3RpYyh0eXBlLCBhbXBsaXR1ZGUsIHBlcmlvZCkge1xuICB2YXIgcDEgPSBhbXBsaXR1ZGUgPj0gMSA/IGFtcGxpdHVkZSA6IDEsXG4gICAgICAvL25vdGU6IGlmIGFtcGxpdHVkZSBpcyA8IDEsIHdlIHNpbXBseSBhZGp1c3QgdGhlIHBlcmlvZCBmb3IgYSBtb3JlIG5hdHVyYWwgZmVlbC4gT3RoZXJ3aXNlIHRoZSBtYXRoIGRvZXNuJ3Qgd29yayByaWdodCBhbmQgdGhlIGN1cnZlIHN0YXJ0cyBhdCAxLlxuICBwMiA9IChwZXJpb2QgfHwgKHR5cGUgPyAuMyA6IC40NSkpIC8gKGFtcGxpdHVkZSA8IDEgPyBhbXBsaXR1ZGUgOiAxKSxcbiAgICAgIHAzID0gcDIgLyBfMlBJICogKE1hdGguYXNpbigxIC8gcDEpIHx8IDApLFxuICAgICAgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgIHJldHVybiBwID09PSAxID8gMSA6IHAxICogTWF0aC5wb3coMiwgLTEwICogcCkgKiBfc2luKChwIC0gcDMpICogcDIpICsgMTtcbiAgfSxcbiAgICAgIGVhc2UgPSB0eXBlID09PSBcIm91dFwiID8gZWFzZU91dCA6IHR5cGUgPT09IFwiaW5cIiA/IGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIDEgLSBlYXNlT3V0KDEgLSBwKTtcbiAgfSA6IF9lYXNlSW5PdXRGcm9tT3V0KGVhc2VPdXQpO1xuXG4gIHAyID0gXzJQSSAvIHAyOyAvL3ByZWNhbGN1bGF0ZSB0byBvcHRpbWl6ZVxuXG4gIGVhc2UuY29uZmlnID0gZnVuY3Rpb24gKGFtcGxpdHVkZSwgcGVyaW9kKSB7XG4gICAgcmV0dXJuIF9jb25maWdFbGFzdGljKHR5cGUsIGFtcGxpdHVkZSwgcGVyaW9kKTtcbiAgfTtcblxuICByZXR1cm4gZWFzZTtcbn0sXG4gICAgX2NvbmZpZ0JhY2sgPSBmdW5jdGlvbiBfY29uZmlnQmFjayh0eXBlLCBvdmVyc2hvb3QpIHtcbiAgaWYgKG92ZXJzaG9vdCA9PT0gdm9pZCAwKSB7XG4gICAgb3ZlcnNob290ID0gMS43MDE1ODtcbiAgfVxuXG4gIHZhciBlYXNlT3V0ID0gZnVuY3Rpb24gZWFzZU91dChwKSB7XG4gICAgcmV0dXJuIHAgPyAtLXAgKiBwICogKChvdmVyc2hvb3QgKyAxKSAqIHAgKyBvdmVyc2hvb3QpICsgMSA6IDA7XG4gIH0sXG4gICAgICBlYXNlID0gdHlwZSA9PT0gXCJvdXRcIiA/IGVhc2VPdXQgOiB0eXBlID09PSBcImluXCIgPyBmdW5jdGlvbiAocCkge1xuICAgIHJldHVybiAxIC0gZWFzZU91dCgxIC0gcCk7XG4gIH0gOiBfZWFzZUluT3V0RnJvbU91dChlYXNlT3V0KTtcblxuICBlYXNlLmNvbmZpZyA9IGZ1bmN0aW9uIChvdmVyc2hvb3QpIHtcbiAgICByZXR1cm4gX2NvbmZpZ0JhY2sodHlwZSwgb3ZlcnNob290KTtcbiAgfTtcblxuICByZXR1cm4gZWFzZTtcbn07IC8vIGEgY2hlYXBlciAoa2IgYW5kIGNwdSkgYnV0IG1vcmUgbWlsZCB3YXkgdG8gZ2V0IGEgcGFyYW1ldGVyaXplZCB3ZWlnaHRlZCBlYXNlIGJ5IGZlZWRpbmcgaW4gYSB2YWx1ZSBiZXR3ZWVuIC0xIChlYXNlSW4pIGFuZCAxIChlYXNlT3V0KSB3aGVyZSAwIGlzIGxpbmVhci5cbi8vIF93ZWlnaHRlZEVhc2UgPSByYXRpbyA9PiB7XG4vLyBcdGxldCB5ID0gMC41ICsgcmF0aW8gLyAyO1xuLy8gXHRyZXR1cm4gcCA9PiAoMiAqICgxIC0gcCkgKiBwICogeSArIHAgKiBwKTtcbi8vIH0sXG4vLyBhIHN0cm9uZ2VyIChidXQgbW9yZSBleHBlbnNpdmUga2IvY3B1KSBwYXJhbWV0ZXJpemVkIHdlaWdodGVkIGVhc2UgdGhhdCBsZXRzIHlvdSBmZWVkIGluIGEgdmFsdWUgYmV0d2VlbiAtMSAoZWFzZUluKSBhbmQgMSAoZWFzZU91dCkgd2hlcmUgMCBpcyBsaW5lYXIuXG4vLyBfd2VpZ2h0ZWRFYXNlU3Ryb25nID0gcmF0aW8gPT4ge1xuLy8gXHRyYXRpbyA9IC41ICsgcmF0aW8gLyAyO1xuLy8gXHRsZXQgbyA9IDEgLyAzICogKHJhdGlvIDwgLjUgPyByYXRpbyA6IDEgLSByYXRpbyksXG4vLyBcdFx0YiA9IHJhdGlvIC0gbyxcbi8vIFx0XHRjID0gcmF0aW8gKyBvO1xuLy8gXHRyZXR1cm4gcCA9PiBwID09PSAxID8gcCA6IDMgKiBiICogKDEgLSBwKSAqICgxIC0gcCkgKiBwICsgMyAqIGMgKiAoMSAtIHApICogcCAqIHAgKyBwICogcCAqIHA7XG4vLyB9O1xuXG5cbl9mb3JFYWNoTmFtZShcIkxpbmVhcixRdWFkLEN1YmljLFF1YXJ0LFF1aW50LFN0cm9uZ1wiLCBmdW5jdGlvbiAobmFtZSwgaSkge1xuICB2YXIgcG93ZXIgPSBpIDwgNSA/IGkgKyAxIDogaTtcblxuICBfaW5zZXJ0RWFzZShuYW1lICsgXCIsUG93ZXJcIiArIChwb3dlciAtIDEpLCBpID8gZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gTWF0aC5wb3cocCwgcG93ZXIpO1xuICB9IDogZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gcDtcbiAgfSwgZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIE1hdGgucG93KDEgLSBwLCBwb3dlcik7XG4gIH0sIGZ1bmN0aW9uIChwKSB7XG4gICAgcmV0dXJuIHAgPCAuNSA/IE1hdGgucG93KHAgKiAyLCBwb3dlcikgLyAyIDogMSAtIE1hdGgucG93KCgxIC0gcCkgKiAyLCBwb3dlcikgLyAyO1xuICB9KTtcbn0pO1xuXG5fZWFzZU1hcC5MaW5lYXIuZWFzZU5vbmUgPSBfZWFzZU1hcC5ub25lID0gX2Vhc2VNYXAuTGluZWFyLmVhc2VJbjtcblxuX2luc2VydEVhc2UoXCJFbGFzdGljXCIsIF9jb25maWdFbGFzdGljKFwiaW5cIiksIF9jb25maWdFbGFzdGljKFwib3V0XCIpLCBfY29uZmlnRWxhc3RpYygpKTtcblxuKGZ1bmN0aW9uIChuLCBjKSB7XG4gIHZhciBuMSA9IDEgLyBjLFxuICAgICAgbjIgPSAyICogbjEsXG4gICAgICBuMyA9IDIuNSAqIG4xLFxuICAgICAgZWFzZU91dCA9IGZ1bmN0aW9uIGVhc2VPdXQocCkge1xuICAgIHJldHVybiBwIDwgbjEgPyBuICogcCAqIHAgOiBwIDwgbjIgPyBuICogTWF0aC5wb3cocCAtIDEuNSAvIGMsIDIpICsgLjc1IDogcCA8IG4zID8gbiAqIChwIC09IDIuMjUgLyBjKSAqIHAgKyAuOTM3NSA6IG4gKiBNYXRoLnBvdyhwIC0gMi42MjUgLyBjLCAyKSArIC45ODQzNzU7XG4gIH07XG5cbiAgX2luc2VydEVhc2UoXCJCb3VuY2VcIiwgZnVuY3Rpb24gKHApIHtcbiAgICByZXR1cm4gMSAtIGVhc2VPdXQoMSAtIHApO1xuICB9LCBlYXNlT3V0KTtcbn0pKDcuNTYyNSwgMi43NSk7XG5cbl9pbnNlcnRFYXNlKFwiRXhwb1wiLCBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gcCA/IE1hdGgucG93KDIsIDEwICogKHAgLSAxKSkgOiAwO1xufSk7XG5cbl9pbnNlcnRFYXNlKFwiQ2lyY1wiLCBmdW5jdGlvbiAocCkge1xuICByZXR1cm4gLShfc3FydCgxIC0gcCAqIHApIC0gMSk7XG59KTtcblxuX2luc2VydEVhc2UoXCJTaW5lXCIsIGZ1bmN0aW9uIChwKSB7XG4gIHJldHVybiBwID09PSAxID8gMSA6IC1fY29zKHAgKiBfSEFMRl9QSSkgKyAxO1xufSk7XG5cbl9pbnNlcnRFYXNlKFwiQmFja1wiLCBfY29uZmlnQmFjayhcImluXCIpLCBfY29uZmlnQmFjayhcIm91dFwiKSwgX2NvbmZpZ0JhY2soKSk7XG5cbl9lYXNlTWFwLlN0ZXBwZWRFYXNlID0gX2Vhc2VNYXAuc3RlcHMgPSBfZ2xvYmFscy5TdGVwcGVkRWFzZSA9IHtcbiAgY29uZmlnOiBmdW5jdGlvbiBjb25maWcoc3RlcHMsIGltbWVkaWF0ZVN0YXJ0KSB7XG4gICAgaWYgKHN0ZXBzID09PSB2b2lkIDApIHtcbiAgICAgIHN0ZXBzID0gMTtcbiAgICB9XG5cbiAgICB2YXIgcDEgPSAxIC8gc3RlcHMsXG4gICAgICAgIHAyID0gc3RlcHMgKyAoaW1tZWRpYXRlU3RhcnQgPyAwIDogMSksXG4gICAgICAgIHAzID0gaW1tZWRpYXRlU3RhcnQgPyAxIDogMCxcbiAgICAgICAgbWF4ID0gMSAtIF90aW55TnVtO1xuICAgIHJldHVybiBmdW5jdGlvbiAocCkge1xuICAgICAgcmV0dXJuICgocDIgKiBfY2xhbXAoMCwgbWF4LCBwKSB8IDApICsgcDMpICogcDE7XG4gICAgfTtcbiAgfVxufTtcbl9kZWZhdWx0cy5lYXNlID0gX2Vhc2VNYXBbXCJxdWFkLm91dFwiXTtcblxuX2ZvckVhY2hOYW1lKFwib25Db21wbGV0ZSxvblVwZGF0ZSxvblN0YXJ0LG9uUmVwZWF0LG9uUmV2ZXJzZUNvbXBsZXRlLG9uSW50ZXJydXB0XCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBfY2FsbGJhY2tOYW1lcyArPSBuYW1lICsgXCIsXCIgKyBuYW1lICsgXCJQYXJhbXMsXCI7XG59KTtcbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ0FDSEVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG5leHBvcnQgdmFyIEdTQ2FjaGUgPSBmdW5jdGlvbiBHU0NhY2hlKHRhcmdldCwgaGFybmVzcykge1xuICB0aGlzLmlkID0gX2dzSUQrKztcbiAgdGFyZ2V0Ll9nc2FwID0gdGhpcztcbiAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gIHRoaXMuaGFybmVzcyA9IGhhcm5lc3M7XG4gIHRoaXMuZ2V0ID0gaGFybmVzcyA/IGhhcm5lc3MuZ2V0IDogX2dldFByb3BlcnR5O1xuICB0aGlzLnNldCA9IGhhcm5lc3MgPyBoYXJuZXNzLmdldFNldHRlciA6IF9nZXRTZXR0ZXI7XG59O1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBTklNQVRJT05cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuZXhwb3J0IHZhciBBbmltYXRpb24gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBbmltYXRpb24odmFycykge1xuICAgIHRoaXMudmFycyA9IHZhcnM7XG4gICAgdGhpcy5fZGVsYXkgPSArdmFycy5kZWxheSB8fCAwO1xuXG4gICAgaWYgKHRoaXMuX3JlcGVhdCA9IHZhcnMucmVwZWF0ID09PSBJbmZpbml0eSA/IC0yIDogdmFycy5yZXBlYXQgfHwgMCkge1xuICAgICAgLy8gVE9ETzogcmVwZWF0OiBJbmZpbml0eSBvbiBhIHRpbWVsaW5lJ3MgY2hpbGRyZW4gbXVzdCBmbGFnIHRoYXQgdGltZWxpbmUgaW50ZXJuYWxseSBhbmQgYWZmZWN0IGl0cyB0b3RhbER1cmF0aW9uLCBvdGhlcndpc2UgaXQnbGwgc3RvcCBpbiB0aGUgbmVnYXRpdmUgZGlyZWN0aW9uIHdoZW4gcmVhY2hpbmcgdGhlIHN0YXJ0LlxuICAgICAgdGhpcy5fckRlbGF5ID0gdmFycy5yZXBlYXREZWxheSB8fCAwO1xuICAgICAgdGhpcy5feW95byA9ICEhdmFycy55b3lvIHx8ICEhdmFycy55b3lvRWFzZTtcbiAgICB9XG5cbiAgICB0aGlzLl90cyA9IDE7XG5cbiAgICBfc2V0RHVyYXRpb24odGhpcywgK3ZhcnMuZHVyYXRpb24sIDEsIDEpO1xuXG4gICAgdGhpcy5kYXRhID0gdmFycy5kYXRhO1xuXG4gICAgaWYgKF9jb250ZXh0KSB7XG4gICAgICB0aGlzLl9jdHggPSBfY29udGV4dDtcblxuICAgICAgX2NvbnRleHQuZGF0YS5wdXNoKHRoaXMpO1xuICAgIH1cblxuICAgIF90aWNrZXJBY3RpdmUgfHwgX3RpY2tlci53YWtlKCk7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQW5pbWF0aW9uLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZGVsYXkgPSBmdW5jdGlvbiBkZWxheSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkge1xuICAgICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuc21vb3RoQ2hpbGRUaW1pbmcgJiYgdGhpcy5zdGFydFRpbWUodGhpcy5fc3RhcnQgKyB2YWx1ZSAtIHRoaXMuX2RlbGF5KTtcbiAgICAgIHRoaXMuX2RlbGF5ID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZGVsYXk7XG4gIH07XG5cbiAgX3Byb3RvLmR1cmF0aW9uID0gZnVuY3Rpb24gZHVyYXRpb24odmFsdWUpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudG90YWxEdXJhdGlvbih0aGlzLl9yZXBlYXQgPiAwID8gdmFsdWUgKyAodmFsdWUgKyB0aGlzLl9yRGVsYXkpICogdGhpcy5fcmVwZWF0IDogdmFsdWUpIDogdGhpcy50b3RhbER1cmF0aW9uKCkgJiYgdGhpcy5fZHVyO1xuICB9O1xuXG4gIF9wcm90by50b3RhbER1cmF0aW9uID0gZnVuY3Rpb24gdG90YWxEdXJhdGlvbih2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3REdXI7XG4gICAgfVxuXG4gICAgdGhpcy5fZGlydHkgPSAwO1xuICAgIHJldHVybiBfc2V0RHVyYXRpb24odGhpcywgdGhpcy5fcmVwZWF0IDwgMCA/IHZhbHVlIDogKHZhbHVlIC0gdGhpcy5fcmVwZWF0ICogdGhpcy5fckRlbGF5KSAvICh0aGlzLl9yZXBlYXQgKyAxKSk7XG4gIH07XG5cbiAgX3Byb3RvLnRvdGFsVGltZSA9IGZ1bmN0aW9uIHRvdGFsVGltZShfdG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cykge1xuICAgIF93YWtlKCk7XG5cbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl90VGltZTtcbiAgICB9XG5cbiAgICB2YXIgcGFyZW50ID0gdGhpcy5fZHA7XG5cbiAgICBpZiAocGFyZW50ICYmIHBhcmVudC5zbW9vdGhDaGlsZFRpbWluZyAmJiB0aGlzLl90cykge1xuICAgICAgX2FsaWduUGxheWhlYWQodGhpcywgX3RvdGFsVGltZSk7XG5cbiAgICAgICFwYXJlbnQuX2RwIHx8IHBhcmVudC5wYXJlbnQgfHwgX3Bvc3RBZGRDaGVja3MocGFyZW50LCB0aGlzKTsgLy8gZWRnZSBjYXNlOiBpZiB0aGlzIGlzIGEgY2hpbGQgb2YgYSB0aW1lbGluZSB0aGF0IGFscmVhZHkgY29tcGxldGVkLCBmb3IgZXhhbXBsZSwgd2UgbXVzdCByZS1hY3RpdmF0ZSB0aGUgcGFyZW50LlxuICAgICAgLy9pbiBjYXNlIGFueSBvZiB0aGUgYW5jZXN0b3IgdGltZWxpbmVzIGhhZCBjb21wbGV0ZWQgYnV0IHNob3VsZCBub3cgYmUgZW5hYmxlZCwgd2Ugc2hvdWxkIHJlc2V0IHRoZWlyIHRvdGFsVGltZSgpIHdoaWNoIHdpbGwgYWxzbyBlbnN1cmUgdGhhdCB0aGV5J3JlIGxpbmVkIHVwIHByb3Blcmx5IGFuZCBlbmFibGVkLiBTa2lwIGZvciBhbmltYXRpb25zIHRoYXQgYXJlIG9uIHRoZSByb290ICh3YXN0ZWZ1bCkuIEV4YW1wbGU6IGEgVGltZWxpbmVMaXRlLmV4cG9ydFJvb3QoKSBpcyBwZXJmb3JtZWQgd2hlbiB0aGVyZSdzIGEgcGF1c2VkIHR3ZWVuIG9uIHRoZSByb290LCB0aGUgZXhwb3J0IHdpbGwgbm90IGNvbXBsZXRlIHVudGlsIHRoYXQgdHdlZW4gaXMgdW5wYXVzZWQsIGJ1dCBpbWFnaW5lIGEgY2hpbGQgZ2V0cyByZXN0YXJ0ZWQgbGF0ZXIsIGFmdGVyIGFsbCBbdW5wYXVzZWRdIHR3ZWVucyBoYXZlIGNvbXBsZXRlZC4gVGhlIHN0YXJ0IG9mIHRoYXQgY2hpbGQgd291bGQgZ2V0IHB1c2hlZCBvdXQsIGJ1dCBvbmUgb2YgdGhlIGFuY2VzdG9ycyBtYXkgaGF2ZSBjb21wbGV0ZWQuXG5cbiAgICAgIHdoaWxlIChwYXJlbnQgJiYgcGFyZW50LnBhcmVudCkge1xuICAgICAgICBpZiAocGFyZW50LnBhcmVudC5fdGltZSAhPT0gcGFyZW50Ll9zdGFydCArIChwYXJlbnQuX3RzID49IDAgPyBwYXJlbnQuX3RUaW1lIC8gcGFyZW50Ll90cyA6IChwYXJlbnQudG90YWxEdXJhdGlvbigpIC0gcGFyZW50Ll90VGltZSkgLyAtcGFyZW50Ll90cykpIHtcbiAgICAgICAgICBwYXJlbnQudG90YWxUaW1lKHBhcmVudC5fdFRpbWUsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLnBhcmVudCAmJiB0aGlzLl9kcC5hdXRvUmVtb3ZlQ2hpbGRyZW4gJiYgKHRoaXMuX3RzID4gMCAmJiBfdG90YWxUaW1lIDwgdGhpcy5fdER1ciB8fCB0aGlzLl90cyA8IDAgJiYgX3RvdGFsVGltZSA+IDAgfHwgIXRoaXMuX3REdXIgJiYgIV90b3RhbFRpbWUpKSB7XG4gICAgICAgIC8vaWYgdGhlIGFuaW1hdGlvbiBkb2Vzbid0IGhhdmUgYSBwYXJlbnQsIHB1dCBpdCBiYWNrIGludG8gaXRzIGxhc3QgcGFyZW50IChyZWNvcmRlZCBhcyBfZHAgZm9yIGV4YWN0bHkgY2FzZXMgbGlrZSB0aGlzKS4gTGltaXQgdG8gcGFyZW50cyB3aXRoIGF1dG9SZW1vdmVDaGlsZHJlbiAobGlrZSBnbG9iYWxUaW1lbGluZSkgc28gdGhhdCBpZiB0aGUgdXNlciBtYW51YWxseSByZW1vdmVzIGFuIGFuaW1hdGlvbiBmcm9tIGEgdGltZWxpbmUgYW5kIHRoZW4gYWx0ZXJzIGl0cyBwbGF5aGVhZCwgaXQgZG9lc24ndCBnZXQgYWRkZWQgYmFjayBpbi5cbiAgICAgICAgX2FkZFRvVGltZWxpbmUodGhpcy5fZHAsIHRoaXMsIHRoaXMuX3N0YXJ0IC0gdGhpcy5fZGVsYXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl90VGltZSAhPT0gX3RvdGFsVGltZSB8fCAhdGhpcy5fZHVyICYmICFzdXBwcmVzc0V2ZW50cyB8fCB0aGlzLl9pbml0dGVkICYmIE1hdGguYWJzKHRoaXMuX3pUaW1lKSA9PT0gX3RpbnlOdW0gfHwgIV90b3RhbFRpbWUgJiYgIXRoaXMuX2luaXR0ZWQgJiYgKHRoaXMuYWRkIHx8IHRoaXMuX3B0TG9va3VwKSkge1xuICAgICAgLy8gY2hlY2sgZm9yIF9wdExvb2t1cCBvbiBhIFR3ZWVuIGluc3RhbmNlIHRvIGVuc3VyZSBpdCBoYXMgYWN0dWFsbHkgZmluaXNoZWQgYmVpbmcgaW5zdGFudGlhdGVkLCBvdGhlcndpc2UgaWYgdGhpcy5yZXZlcnNlKCkgZ2V0cyBjYWxsZWQgaW4gdGhlIEFuaW1hdGlvbiBjb25zdHJ1Y3RvciwgaXQgY291bGQgdHJpZ2dlciBhIHJlbmRlcigpIGhlcmUgZXZlbiB0aG91Z2ggdGhlIF90YXJnZXRzIHdlcmVuJ3QgcG9wdWxhdGVkLCB0aHVzIHdoZW4gX2luaXQoKSBpcyBjYWxsZWQgdGhlcmUgd29uJ3QgYmUgYW55IFByb3BUd2VlbnMgKGl0J2xsIGFjdCBsaWtlIHRoZSB0d2VlbiBpcyBub24tZnVuY3Rpb25hbClcbiAgICAgIHRoaXMuX3RzIHx8ICh0aGlzLl9wVGltZSA9IF90b3RhbFRpbWUpOyAvLyBvdGhlcndpc2UsIGlmIGFuIGFuaW1hdGlvbiBpcyBwYXVzZWQsIHRoZW4gdGhlIHBsYXloZWFkIGlzIG1vdmVkIGJhY2sgdG8gemVybywgdGhlbiByZXN1bWVkLCBpdCdkIHJldmVydCBiYWNrIHRvIHRoZSBvcmlnaW5hbCB0aW1lIGF0IHRoZSBwYXVzZVxuICAgICAgLy9pZiAoIXRoaXMuX2xvY2spIHsgLy8gYXZvaWQgZW5kbGVzcyByZWN1cnNpb24gKG5vdCBzdXJlIHdlIG5lZWQgdGhpcyB5ZXQgb3IgaWYgaXQncyB3b3J0aCB0aGUgcGVyZm9ybWFuY2UgaGl0KVxuICAgICAgLy8gICB0aGlzLl9sb2NrID0gMTtcblxuICAgICAgX2xhenlTYWZlUmVuZGVyKHRoaXMsIF90b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzKTsgLy8gICB0aGlzLl9sb2NrID0gMDtcbiAgICAgIC8vfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLnRpbWUgPSBmdW5jdGlvbiB0aW1lKHZhbHVlLCBzdXBwcmVzc0V2ZW50cykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gdGhpcy50b3RhbFRpbWUoTWF0aC5taW4odGhpcy50b3RhbER1cmF0aW9uKCksIHZhbHVlICsgX2VsYXBzZWRDeWNsZUR1cmF0aW9uKHRoaXMpKSAlICh0aGlzLl9kdXIgKyB0aGlzLl9yRGVsYXkpIHx8ICh2YWx1ZSA/IHRoaXMuX2R1ciA6IDApLCBzdXBwcmVzc0V2ZW50cykgOiB0aGlzLl90aW1lOyAvLyBub3RlOiBpZiB0aGUgbW9kdWx1cyByZXN1bHRzIGluIDAsIHRoZSBwbGF5aGVhZCBjb3VsZCBiZSBleGFjdGx5IGF0IHRoZSBlbmQgb3IgdGhlIGJlZ2lubmluZywgYW5kIHdlIGFsd2F5cyBkZWZlciB0byB0aGUgRU5EIHdpdGggYSBub24temVybyB2YWx1ZSwgb3RoZXJ3aXNlIGlmIHlvdSBzZXQgdGhlIHRpbWUoKSB0byB0aGUgdmVyeSBlbmQgKGR1cmF0aW9uKCkpLCBpdCB3b3VsZCByZW5kZXIgYXQgdGhlIFNUQVJUIVxuICB9O1xuXG4gIF9wcm90by50b3RhbFByb2dyZXNzID0gZnVuY3Rpb24gdG90YWxQcm9ncmVzcyh2YWx1ZSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudG90YWxUaW1lKHRoaXMudG90YWxEdXJhdGlvbigpICogdmFsdWUsIHN1cHByZXNzRXZlbnRzKSA6IHRoaXMudG90YWxEdXJhdGlvbigpID8gTWF0aC5taW4oMSwgdGhpcy5fdFRpbWUgLyB0aGlzLl90RHVyKSA6IHRoaXMucmF0aW87XG4gIH07XG5cbiAgX3Byb3RvLnByb2dyZXNzID0gZnVuY3Rpb24gcHJvZ3Jlc3ModmFsdWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0aGlzLnRvdGFsVGltZSh0aGlzLmR1cmF0aW9uKCkgKiAodGhpcy5feW95byAmJiAhKHRoaXMuaXRlcmF0aW9uKCkgJiAxKSA/IDEgLSB2YWx1ZSA6IHZhbHVlKSArIF9lbGFwc2VkQ3ljbGVEdXJhdGlvbih0aGlzKSwgc3VwcHJlc3NFdmVudHMpIDogdGhpcy5kdXJhdGlvbigpID8gTWF0aC5taW4oMSwgdGhpcy5fdGltZSAvIHRoaXMuX2R1cikgOiB0aGlzLnJhdGlvO1xuICB9O1xuXG4gIF9wcm90by5pdGVyYXRpb24gPSBmdW5jdGlvbiBpdGVyYXRpb24odmFsdWUsIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgdmFyIGN5Y2xlRHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uKCkgKyB0aGlzLl9yRGVsYXk7XG5cbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMudG90YWxUaW1lKHRoaXMuX3RpbWUgKyAodmFsdWUgLSAxKSAqIGN5Y2xlRHVyYXRpb24sIHN1cHByZXNzRXZlbnRzKSA6IHRoaXMuX3JlcGVhdCA/IF9hbmltYXRpb25DeWNsZSh0aGlzLl90VGltZSwgY3ljbGVEdXJhdGlvbikgKyAxIDogMTtcbiAgfSAvLyBwb3RlbnRpYWwgZnV0dXJlIGFkZGl0aW9uOlxuICAvLyBpc1BsYXlpbmdCYWNrd2FyZHMoKSB7XG4gIC8vIFx0bGV0IGFuaW1hdGlvbiA9IHRoaXMsXG4gIC8vIFx0XHRvcmllbnRhdGlvbiA9IDE7IC8vIDEgPSBmb3J3YXJkLCAtMSA9IGJhY2t3YXJkXG4gIC8vIFx0d2hpbGUgKGFuaW1hdGlvbikge1xuICAvLyBcdFx0b3JpZW50YXRpb24gKj0gYW5pbWF0aW9uLnJldmVyc2VkKCkgfHwgKGFuaW1hdGlvbi5yZXBlYXQoKSAmJiAhKGFuaW1hdGlvbi5pdGVyYXRpb24oKSAmIDEpKSA/IC0xIDogMTtcbiAgLy8gXHRcdGFuaW1hdGlvbiA9IGFuaW1hdGlvbi5wYXJlbnQ7XG4gIC8vIFx0fVxuICAvLyBcdHJldHVybiBvcmllbnRhdGlvbiA8IDA7XG4gIC8vIH1cbiAgO1xuXG4gIF9wcm90by50aW1lU2NhbGUgPSBmdW5jdGlvbiB0aW1lU2NhbGUodmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9ydHMgPT09IC1fdGlueU51bSA/IDAgOiB0aGlzLl9ydHM7IC8vIHJlY29yZGVkIHRpbWVTY2FsZS4gU3BlY2lhbCBjYXNlOiBpZiBzb21lb25lIGNhbGxzIHJldmVyc2UoKSBvbiBhbiBhbmltYXRpb24gd2l0aCB0aW1lU2NhbGUgb2YgMCwgd2UgYXNzaWduIGl0IC1fdGlueU51bSB0byByZW1lbWJlciBpdCdzIHJldmVyc2VkLlxuICAgIH1cblxuICAgIGlmICh0aGlzLl9ydHMgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgdFRpbWUgPSB0aGlzLnBhcmVudCAmJiB0aGlzLl90cyA/IF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHRoaXMucGFyZW50Ll90aW1lLCB0aGlzKSA6IHRoaXMuX3RUaW1lOyAvLyBtYWtlIHN1cmUgdG8gZG8gdGhlIHBhcmVudFRvQ2hpbGRUb3RhbFRpbWUoKSBCRUZPUkUgc2V0dGluZyB0aGUgbmV3IF90cyBiZWNhdXNlIHRoZSBvbGQgb25lIG11c3QgYmUgdXNlZCBpbiB0aGF0IGNhbGN1bGF0aW9uLlxuICAgIC8vIGZ1dHVyZSBhZGRpdGlvbj8gVXAgc2lkZTogZmFzdCBhbmQgbWluaW1hbCBmaWxlIHNpemUuIERvd24gc2lkZTogb25seSB3b3JrcyBvbiB0aGlzIGFuaW1hdGlvbjsgaWYgYSB0aW1lbGluZSBpcyByZXZlcnNlZCwgZm9yIGV4YW1wbGUsIGl0cyBjaGlsZHJlbnMnIG9uUmV2ZXJzZSB3b3VsZG4ndCBnZXQgY2FsbGVkLlxuICAgIC8vKCt2YWx1ZSA8IDAgJiYgdGhpcy5fcnRzID49IDApICYmIF9jYWxsYmFjayh0aGlzLCBcIm9uUmV2ZXJzZVwiLCB0cnVlKTtcbiAgICAvLyBwcmlvcml0aXplIHJlbmRlcmluZyB3aGVyZSB0aGUgcGFyZW50J3MgcGxheWhlYWQgbGluZXMgdXAgaW5zdGVhZCBvZiB0aGlzLl90VGltZSBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIGEgdHdlZW4gdGhhdCdzIGFuaW1hdGluZyBhbm90aGVyIHR3ZWVuJ3MgdGltZVNjYWxlIGluIHRoZSBzYW1lIHJlbmRlcmluZyBsb29wIChzYW1lIHBhcmVudCksIHRodXMgaWYgdGhlIHRpbWVTY2FsZSB0d2VlbiByZW5kZXJzIGZpcnN0LCBpdCB3b3VsZCBhbHRlciBfc3RhcnQgQkVGT1JFIF90VGltZSB3YXMgc2V0IG9uIHRoYXQgdGljayAoaW4gdGhlIHJlbmRlcmluZyBsb29wKSwgZWZmZWN0aXZlbHkgZnJlZXppbmcgaXQgdW50aWwgdGhlIHRpbWVTY2FsZSB0d2VlbiBmaW5pc2hlcy5cblxuICAgIHRoaXMuX3J0cyA9ICt2YWx1ZSB8fCAwO1xuICAgIHRoaXMuX3RzID0gdGhpcy5fcHMgfHwgdmFsdWUgPT09IC1fdGlueU51bSA/IDAgOiB0aGlzLl9ydHM7IC8vIF90cyBpcyB0aGUgZnVuY3Rpb25hbCB0aW1lU2NhbGUgd2hpY2ggd291bGQgYmUgMCBpZiB0aGUgYW5pbWF0aW9uIGlzIHBhdXNlZC5cblxuICAgIHRoaXMudG90YWxUaW1lKF9jbGFtcCgtTWF0aC5hYnModGhpcy5fZGVsYXkpLCB0aGlzLl90RHVyLCB0VGltZSksIHRydWUpO1xuXG4gICAgX3NldEVuZCh0aGlzKTsgLy8gaWYgcGFyZW50LnNtb290aENoaWxkVGltaW5nIHdhcyBmYWxzZSwgdGhlIGVuZCB0aW1lIGRpZG4ndCBnZXQgdXBkYXRlZCBpbiB0aGUgX2FsaWduUGxheWhlYWQoKSBtZXRob2QsIHNvIGRvIGl0IGhlcmUuXG5cblxuICAgIHJldHVybiBfcmVjYWNoZUFuY2VzdG9ycyh0aGlzKTtcbiAgfTtcblxuICBfcHJvdG8ucGF1c2VkID0gZnVuY3Rpb24gcGF1c2VkKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BzICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fcHMgPSB2YWx1ZTtcblxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3BUaW1lID0gdGhpcy5fdFRpbWUgfHwgTWF0aC5tYXgoLXRoaXMuX2RlbGF5LCB0aGlzLnJhd1RpbWUoKSk7IC8vIGlmIHRoZSBwYXVzZSBvY2N1cnMgZHVyaW5nIHRoZSBkZWxheSBwaGFzZSwgbWFrZSBzdXJlIHRoYXQncyBmYWN0b3JlZCBpbiB3aGVuIHJlc3VtaW5nLlxuXG4gICAgICAgIHRoaXMuX3RzID0gdGhpcy5fYWN0ID0gMDsgLy8gX3RzIGlzIHRoZSBmdW5jdGlvbmFsIHRpbWVTY2FsZSwgc28gYSBwYXVzZWQgdHdlZW4gd291bGQgZWZmZWN0aXZlbHkgaGF2ZSBhIHRpbWVTY2FsZSBvZiAwLiBXZSByZWNvcmQgdGhlIFwicmVhbFwiIHRpbWVTY2FsZSBhcyBfcnRzIChyZWNvcmRlZCB0aW1lIHNjYWxlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3dha2UoKTtcblxuICAgICAgICB0aGlzLl90cyA9IHRoaXMuX3J0czsgLy9vbmx5IGRlZmVyIHRvIF9wVGltZSAocGF1c2VUaW1lKSBpZiB0VGltZSBpcyB6ZXJvLiBSZW1lbWJlciwgc29tZW9uZSBjb3VsZCBwYXVzZSgpIGFuIGFuaW1hdGlvbiwgdGhlbiBzY3J1YiB0aGUgcGxheWhlYWQgYW5kIHJlc3VtZSgpLiBJZiB0aGUgcGFyZW50IGRvZXNuJ3QgaGF2ZSBzbW9vdGhDaGlsZFRpbWluZywgd2UgcmVuZGVyIGF0IHRoZSByYXdUaW1lKCkgYmVjYXVzZSB0aGUgc3RhcnRUaW1lIHdvbid0IGdldCB1cGRhdGVkLlxuXG4gICAgICAgIHRoaXMudG90YWxUaW1lKHRoaXMucGFyZW50ICYmICF0aGlzLnBhcmVudC5zbW9vdGhDaGlsZFRpbWluZyA/IHRoaXMucmF3VGltZSgpIDogdGhpcy5fdFRpbWUgfHwgdGhpcy5fcFRpbWUsIHRoaXMucHJvZ3Jlc3MoKSA9PT0gMSAmJiBNYXRoLmFicyh0aGlzLl96VGltZSkgIT09IF90aW55TnVtICYmICh0aGlzLl90VGltZSAtPSBfdGlueU51bSkpOyAvLyBlZGdlIGNhc2U6IGFuaW1hdGlvbi5wcm9ncmVzcygxKS5wYXVzZSgpLnBsYXkoKSB3b3VsZG4ndCByZW5kZXIgYWdhaW4gYmVjYXVzZSB0aGUgcGxheWhlYWQgaXMgYWxyZWFkeSBhdCB0aGUgZW5kLCBidXQgdGhlIGNhbGwgdG8gdG90YWxUaW1lKCkgYmVsb3cgd2lsbCBhZGQgaXQgYmFjayB0byBpdHMgcGFyZW50Li4uYW5kIG5vdCByZW1vdmUgaXQgYWdhaW4gKHNpbmNlIHJlbW92aW5nIG9ubHkgaGFwcGVucyB1cG9uIHJlbmRlcmluZyBhdCBhIG5ldyB0aW1lKS4gT2Zmc2V0dGluZyB0aGUgX3RUaW1lIHNsaWdodGx5IGlzIGRvbmUgc2ltcGx5IHRvIGNhdXNlIHRoZSBmaW5hbCByZW5kZXIgaW4gdG90YWxUaW1lKCkgdGhhdCdsbCBwb3AgaXQgb2ZmIGl0cyB0aW1lbGluZSAoaWYgYXV0b1JlbW92ZUNoaWxkcmVuIGlzIHRydWUsIG9mIGNvdXJzZSkuIENoZWNrIHRvIG1ha2Ugc3VyZSBfelRpbWUgaXNuJ3QgLV90aW55TnVtIHRvIGF2b2lkIGFuIGVkZ2UgY2FzZSB3aGVyZSB0aGUgcGxheWhlYWQgaXMgcHVzaGVkIHRvIHRoZSBlbmQgYnV0IElOU0lERSBhIHR3ZWVuL2NhbGxiYWNrLCB0aGUgdGltZWxpbmUgaXRzZWxmIGlzIHBhdXNlZCB0aHVzIGhhbHRpbmcgcmVuZGVyaW5nIGFuZCBsZWF2aW5nIGEgZmV3IHVucmVuZGVyZWQuIFdoZW4gcmVzdW1pbmcsIGl0IHdvdWxkbid0IHJlbmRlciB0aG9zZSBvdGhlcndpc2UuXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLnN0YXJ0VGltZSA9IGZ1bmN0aW9uIHN0YXJ0VGltZSh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9zdGFydCA9IHZhbHVlO1xuICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50IHx8IHRoaXMuX2RwO1xuICAgICAgcGFyZW50ICYmIChwYXJlbnQuX3NvcnQgfHwgIXRoaXMucGFyZW50KSAmJiBfYWRkVG9UaW1lbGluZShwYXJlbnQsIHRoaXMsIHZhbHVlIC0gdGhpcy5fZGVsYXkpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0O1xuICB9O1xuXG4gIF9wcm90by5lbmRUaW1lID0gZnVuY3Rpb24gZW5kVGltZShpbmNsdWRlUmVwZWF0cykge1xuICAgIHJldHVybiB0aGlzLl9zdGFydCArIChfaXNOb3RGYWxzZShpbmNsdWRlUmVwZWF0cykgPyB0aGlzLnRvdGFsRHVyYXRpb24oKSA6IHRoaXMuZHVyYXRpb24oKSkgLyBNYXRoLmFicyh0aGlzLl90cyB8fCAxKTtcbiAgfTtcblxuICBfcHJvdG8ucmF3VGltZSA9IGZ1bmN0aW9uIHJhd1RpbWUod3JhcFJlcGVhdHMpIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQgfHwgdGhpcy5fZHA7IC8vIF9kcCA9IGRldGFjaGVkIHBhcmVudFxuXG4gICAgcmV0dXJuICFwYXJlbnQgPyB0aGlzLl90VGltZSA6IHdyYXBSZXBlYXRzICYmICghdGhpcy5fdHMgfHwgdGhpcy5fcmVwZWF0ICYmIHRoaXMuX3RpbWUgJiYgdGhpcy50b3RhbFByb2dyZXNzKCkgPCAxKSA/IHRoaXMuX3RUaW1lICUgKHRoaXMuX2R1ciArIHRoaXMuX3JEZWxheSkgOiAhdGhpcy5fdHMgPyB0aGlzLl90VGltZSA6IF9wYXJlbnRUb0NoaWxkVG90YWxUaW1lKHBhcmVudC5yYXdUaW1lKHdyYXBSZXBlYXRzKSwgdGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvLnJldmVydCA9IGZ1bmN0aW9uIHJldmVydChjb25maWcpIHtcbiAgICBpZiAoY29uZmlnID09PSB2b2lkIDApIHtcbiAgICAgIGNvbmZpZyA9IF9yZXZlcnRDb25maWc7XG4gICAgfVxuXG4gICAgdmFyIHByZXZJc1JldmVydGluZyA9IF9yZXZlcnRpbmc7XG4gICAgX3JldmVydGluZyA9IGNvbmZpZztcblxuICAgIGlmICh0aGlzLl9pbml0dGVkIHx8IHRoaXMuX3N0YXJ0QXQpIHtcbiAgICAgIHRoaXMudGltZWxpbmUgJiYgdGhpcy50aW1lbGluZS5yZXZlcnQoY29uZmlnKTtcbiAgICAgIHRoaXMudG90YWxUaW1lKC0wLjAxLCBjb25maWcuc3VwcHJlc3NFdmVudHMpO1xuICAgIH1cblxuICAgIHRoaXMuZGF0YSAhPT0gXCJuZXN0ZWRcIiAmJiBjb25maWcua2lsbCAhPT0gZmFsc2UgJiYgdGhpcy5raWxsKCk7XG4gICAgX3JldmVydGluZyA9IHByZXZJc1JldmVydGluZztcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uZ2xvYmFsVGltZSA9IGZ1bmN0aW9uIGdsb2JhbFRpbWUocmF3VGltZSkge1xuICAgIHZhciBhbmltYXRpb24gPSB0aGlzLFxuICAgICAgICB0aW1lID0gYXJndW1lbnRzLmxlbmd0aCA/IHJhd1RpbWUgOiBhbmltYXRpb24ucmF3VGltZSgpO1xuXG4gICAgd2hpbGUgKGFuaW1hdGlvbikge1xuICAgICAgdGltZSA9IGFuaW1hdGlvbi5fc3RhcnQgKyB0aW1lIC8gKGFuaW1hdGlvbi5fdHMgfHwgMSk7XG4gICAgICBhbmltYXRpb24gPSBhbmltYXRpb24uX2RwO1xuICAgIH1cblxuICAgIHJldHVybiAhdGhpcy5wYXJlbnQgJiYgdGhpcy5fc2F0ID8gdGhpcy5fc2F0LnZhcnMuaW1tZWRpYXRlUmVuZGVyID8gLTEgOiB0aGlzLl9zYXQuZ2xvYmFsVGltZShyYXdUaW1lKSA6IHRpbWU7IC8vIHRoZSBfc3RhcnRBdCB0d2VlbnMgZm9yIC5mcm9tVG8oKSBhbmQgLmZyb20oKSB0aGF0IGhhdmUgaW1tZWRpYXRlUmVuZGVyIHNob3VsZCBhbHdheXMgYmUgRklSU1QgaW4gdGhlIHRpbWVsaW5lIChpbXBvcnRhbnQgZm9yIGNvbnRleHQucmV2ZXJ0KCkpLiBcIl9zYXRcIiBzdGFuZHMgZm9yIF9zdGFydEF0VHdlZW4sIHJlZmVycmluZyB0byB0aGUgcGFyZW50IHR3ZWVuIHRoYXQgY3JlYXRlZCB0aGUgX3N0YXJ0QXQuIFdlIG11c3QgZGlzY2VybiBpZiB0aGF0IHR3ZWVuIGhhZCBpbW1lZGlhdGVSZW5kZXIgc28gdGhhdCB3ZSBjYW4ga25vdyB3aGV0aGVyIG9yIG5vdCB0byBwcmlvcml0aXplIGl0IGluIHJldmVydCgpLlxuICB9O1xuXG4gIF9wcm90by5yZXBlYXQgPSBmdW5jdGlvbiByZXBlYXQodmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fcmVwZWF0ID0gdmFsdWUgPT09IEluZmluaXR5ID8gLTIgOiB2YWx1ZTtcbiAgICAgIHJldHVybiBfb25VcGRhdGVUb3RhbER1cmF0aW9uKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9yZXBlYXQgPT09IC0yID8gSW5maW5pdHkgOiB0aGlzLl9yZXBlYXQ7XG4gIH07XG5cbiAgX3Byb3RvLnJlcGVhdERlbGF5ID0gZnVuY3Rpb24gcmVwZWF0RGVsYXkodmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdmFyIHRpbWUgPSB0aGlzLl90aW1lO1xuICAgICAgdGhpcy5fckRlbGF5ID0gdmFsdWU7XG5cbiAgICAgIF9vblVwZGF0ZVRvdGFsRHVyYXRpb24odGhpcyk7XG5cbiAgICAgIHJldHVybiB0aW1lID8gdGhpcy50aW1lKHRpbWUpIDogdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fckRlbGF5O1xuICB9O1xuXG4gIF9wcm90by55b3lvID0gZnVuY3Rpb24geW95byh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl95b3lvID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5feW95bztcbiAgfTtcblxuICBfcHJvdG8uc2VlayA9IGZ1bmN0aW9uIHNlZWsocG9zaXRpb24sIHN1cHByZXNzRXZlbnRzKSB7XG4gICAgcmV0dXJuIHRoaXMudG90YWxUaW1lKF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSwgX2lzTm90RmFsc2Uoc3VwcHJlc3NFdmVudHMpKTtcbiAgfTtcblxuICBfcHJvdG8ucmVzdGFydCA9IGZ1bmN0aW9uIHJlc3RhcnQoaW5jbHVkZURlbGF5LCBzdXBwcmVzc0V2ZW50cykge1xuICAgIHJldHVybiB0aGlzLnBsYXkoKS50b3RhbFRpbWUoaW5jbHVkZURlbGF5ID8gLXRoaXMuX2RlbGF5IDogMCwgX2lzTm90RmFsc2Uoc3VwcHJlc3NFdmVudHMpKTtcbiAgfTtcblxuICBfcHJvdG8ucGxheSA9IGZ1bmN0aW9uIHBsYXkoZnJvbSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBmcm9tICE9IG51bGwgJiYgdGhpcy5zZWVrKGZyb20sIHN1cHByZXNzRXZlbnRzKTtcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlZChmYWxzZSkucGF1c2VkKGZhbHNlKTtcbiAgfTtcblxuICBfcHJvdG8ucmV2ZXJzZSA9IGZ1bmN0aW9uIHJldmVyc2UoZnJvbSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBmcm9tICE9IG51bGwgJiYgdGhpcy5zZWVrKGZyb20gfHwgdGhpcy50b3RhbER1cmF0aW9uKCksIHN1cHByZXNzRXZlbnRzKTtcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlZCh0cnVlKS5wYXVzZWQoZmFsc2UpO1xuICB9O1xuXG4gIF9wcm90by5wYXVzZSA9IGZ1bmN0aW9uIHBhdXNlKGF0VGltZSwgc3VwcHJlc3NFdmVudHMpIHtcbiAgICBhdFRpbWUgIT0gbnVsbCAmJiB0aGlzLnNlZWsoYXRUaW1lLCBzdXBwcmVzc0V2ZW50cyk7XG4gICAgcmV0dXJuIHRoaXMucGF1c2VkKHRydWUpO1xuICB9O1xuXG4gIF9wcm90by5yZXN1bWUgPSBmdW5jdGlvbiByZXN1bWUoKSB7XG4gICAgcmV0dXJuIHRoaXMucGF1c2VkKGZhbHNlKTtcbiAgfTtcblxuICBfcHJvdG8ucmV2ZXJzZWQgPSBmdW5jdGlvbiByZXZlcnNlZCh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAhIXZhbHVlICE9PSB0aGlzLnJldmVyc2VkKCkgJiYgdGhpcy50aW1lU2NhbGUoLXRoaXMuX3J0cyB8fCAodmFsdWUgPyAtX3RpbnlOdW0gOiAwKSk7IC8vIGluIGNhc2UgdGltZVNjYWxlIGlzIHplcm8sIHJldmVyc2luZyB3b3VsZCBoYXZlIG5vIGVmZmVjdCBzbyB3ZSB1c2UgX3RpbnlOdW0uXG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9ydHMgPCAwO1xuICB9O1xuXG4gIF9wcm90by5pbnZhbGlkYXRlID0gZnVuY3Rpb24gaW52YWxpZGF0ZSgpIHtcbiAgICB0aGlzLl9pbml0dGVkID0gdGhpcy5fYWN0ID0gMDtcbiAgICB0aGlzLl96VGltZSA9IC1fdGlueU51bTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQgfHwgdGhpcy5fZHAsXG4gICAgICAgIHN0YXJ0ID0gdGhpcy5fc3RhcnQsXG4gICAgICAgIHJhd1RpbWU7XG4gICAgcmV0dXJuICEhKCFwYXJlbnQgfHwgdGhpcy5fdHMgJiYgdGhpcy5faW5pdHRlZCAmJiBwYXJlbnQuaXNBY3RpdmUoKSAmJiAocmF3VGltZSA9IHBhcmVudC5yYXdUaW1lKHRydWUpKSA+PSBzdGFydCAmJiByYXdUaW1lIDwgdGhpcy5lbmRUaW1lKHRydWUpIC0gX3RpbnlOdW0pO1xuICB9O1xuXG4gIF9wcm90by5ldmVudENhbGxiYWNrID0gZnVuY3Rpb24gZXZlbnRDYWxsYmFjayh0eXBlLCBjYWxsYmFjaywgcGFyYW1zKSB7XG4gICAgdmFyIHZhcnMgPSB0aGlzLnZhcnM7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgZGVsZXRlIHZhcnNbdHlwZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXJzW3R5cGVdID0gY2FsbGJhY2s7XG4gICAgICAgIHBhcmFtcyAmJiAodmFyc1t0eXBlICsgXCJQYXJhbXNcIl0gPSBwYXJhbXMpO1xuICAgICAgICB0eXBlID09PSBcIm9uVXBkYXRlXCIgJiYgKHRoaXMuX29uVXBkYXRlID0gY2FsbGJhY2spO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdmFyc1t0eXBlXTtcbiAgfTtcblxuICBfcHJvdG8udGhlbiA9IGZ1bmN0aW9uIHRoZW4ob25GdWxmaWxsZWQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICB2YXIgZiA9IF9pc0Z1bmN0aW9uKG9uRnVsZmlsbGVkKSA/IG9uRnVsZmlsbGVkIDogX3Bhc3NUaHJvdWdoLFxuICAgICAgICAgIF9yZXNvbHZlID0gZnVuY3Rpb24gX3Jlc29sdmUoKSB7XG4gICAgICAgIHZhciBfdGhlbiA9IHNlbGYudGhlbjtcbiAgICAgICAgc2VsZi50aGVuID0gbnVsbDsgLy8gdGVtcG9yYXJpbHkgbnVsbCB0aGUgdGhlbigpIG1ldGhvZCB0byBhdm9pZCBhbiBpbmZpbml0ZSBsb29wIChzZWUgaHR0cHM6Ly9naXRodWIuY29tL2dyZWVuc29jay9HU0FQL2lzc3Vlcy8zMjIpXG5cbiAgICAgICAgX2lzRnVuY3Rpb24oZikgJiYgKGYgPSBmKHNlbGYpKSAmJiAoZi50aGVuIHx8IGYgPT09IHNlbGYpICYmIChzZWxmLnRoZW4gPSBfdGhlbik7XG4gICAgICAgIHJlc29sdmUoZik7XG4gICAgICAgIHNlbGYudGhlbiA9IF90aGVuO1xuICAgICAgfTtcblxuICAgICAgaWYgKHNlbGYuX2luaXR0ZWQgJiYgc2VsZi50b3RhbFByb2dyZXNzKCkgPT09IDEgJiYgc2VsZi5fdHMgPj0gMCB8fCAhc2VsZi5fdFRpbWUgJiYgc2VsZi5fdHMgPCAwKSB7XG4gICAgICAgIF9yZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLl9wcm9tID0gX3Jlc29sdmU7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmtpbGwgPSBmdW5jdGlvbiBraWxsKCkge1xuICAgIF9pbnRlcnJ1cHQodGhpcyk7XG4gIH07XG5cbiAgcmV0dXJuIEFuaW1hdGlvbjtcbn0oKTtcblxuX3NldERlZmF1bHRzKEFuaW1hdGlvbi5wcm90b3R5cGUsIHtcbiAgX3RpbWU6IDAsXG4gIF9zdGFydDogMCxcbiAgX2VuZDogMCxcbiAgX3RUaW1lOiAwLFxuICBfdER1cjogMCxcbiAgX2RpcnR5OiAwLFxuICBfcmVwZWF0OiAwLFxuICBfeW95bzogZmFsc2UsXG4gIHBhcmVudDogbnVsbCxcbiAgX2luaXR0ZWQ6IGZhbHNlLFxuICBfckRlbGF5OiAwLFxuICBfdHM6IDEsXG4gIF9kcDogMCxcbiAgcmF0aW86IDAsXG4gIF96VGltZTogLV90aW55TnVtLFxuICBfcHJvbTogMCxcbiAgX3BzOiBmYWxzZSxcbiAgX3J0czogMVxufSk7XG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVElNRUxJTkVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5cbmV4cG9ydCB2YXIgVGltZWxpbmUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9BbmltYXRpb24pIHtcbiAgX2luaGVyaXRzTG9vc2UoVGltZWxpbmUsIF9BbmltYXRpb24pO1xuXG4gIGZ1bmN0aW9uIFRpbWVsaW5lKHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgaWYgKHZhcnMgPT09IHZvaWQgMCkge1xuICAgICAgdmFycyA9IHt9O1xuICAgIH1cblxuICAgIF90aGlzID0gX0FuaW1hdGlvbi5jYWxsKHRoaXMsIHZhcnMpIHx8IHRoaXM7XG4gICAgX3RoaXMubGFiZWxzID0ge307XG4gICAgX3RoaXMuc21vb3RoQ2hpbGRUaW1pbmcgPSAhIXZhcnMuc21vb3RoQ2hpbGRUaW1pbmc7XG4gICAgX3RoaXMuYXV0b1JlbW92ZUNoaWxkcmVuID0gISF2YXJzLmF1dG9SZW1vdmVDaGlsZHJlbjtcbiAgICBfdGhpcy5fc29ydCA9IF9pc05vdEZhbHNlKHZhcnMuc29ydENoaWxkcmVuKTtcbiAgICBfZ2xvYmFsVGltZWxpbmUgJiYgX2FkZFRvVGltZWxpbmUodmFycy5wYXJlbnQgfHwgX2dsb2JhbFRpbWVsaW5lLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgcG9zaXRpb24pO1xuICAgIHZhcnMucmV2ZXJzZWQgJiYgX3RoaXMucmV2ZXJzZSgpO1xuICAgIHZhcnMucGF1c2VkICYmIF90aGlzLnBhdXNlZCh0cnVlKTtcbiAgICB2YXJzLnNjcm9sbFRyaWdnZXIgJiYgX3Njcm9sbFRyaWdnZXIoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIHZhcnMuc2Nyb2xsVHJpZ2dlcik7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90bzIgPSBUaW1lbGluZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMi50byA9IGZ1bmN0aW9uIHRvKHRhcmdldHMsIHZhcnMsIHBvc2l0aW9uKSB7XG4gICAgX2NyZWF0ZVR3ZWVuVHlwZSgwLCBhcmd1bWVudHMsIHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5mcm9tID0gZnVuY3Rpb24gZnJvbSh0YXJnZXRzLCB2YXJzLCBwb3NpdGlvbikge1xuICAgIF9jcmVhdGVUd2VlblR5cGUoMSwgYXJndW1lbnRzLCB0aGlzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuZnJvbVRvID0gZnVuY3Rpb24gZnJvbVRvKHRhcmdldHMsIGZyb21WYXJzLCB0b1ZhcnMsIHBvc2l0aW9uKSB7XG4gICAgX2NyZWF0ZVR3ZWVuVHlwZSgyLCBhcmd1bWVudHMsIHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5zZXQgPSBmdW5jdGlvbiBzZXQodGFyZ2V0cywgdmFycywgcG9zaXRpb24pIHtcbiAgICB2YXJzLmR1cmF0aW9uID0gMDtcbiAgICB2YXJzLnBhcmVudCA9IHRoaXM7XG4gICAgX2luaGVyaXREZWZhdWx0cyh2YXJzKS5yZXBlYXREZWxheSB8fCAodmFycy5yZXBlYXQgPSAwKTtcbiAgICB2YXJzLmltbWVkaWF0ZVJlbmRlciA9ICEhdmFycy5pbW1lZGlhdGVSZW5kZXI7XG4gICAgbmV3IFR3ZWVuKHRhcmdldHMsIHZhcnMsIF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSwgMSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5jYWxsID0gZnVuY3Rpb24gY2FsbChjYWxsYmFjaywgcGFyYW1zLCBwb3NpdGlvbikge1xuICAgIHJldHVybiBfYWRkVG9UaW1lbGluZSh0aGlzLCBUd2Vlbi5kZWxheWVkQ2FsbCgwLCBjYWxsYmFjaywgcGFyYW1zKSwgcG9zaXRpb24pO1xuICB9IC8vT05MWSBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSEgTWF5YmUgZGVsZXRlP1xuICA7XG5cbiAgX3Byb3RvMi5zdGFnZ2VyVG8gPSBmdW5jdGlvbiBzdGFnZ2VyVG8odGFyZ2V0cywgZHVyYXRpb24sIHZhcnMsIHN0YWdnZXIsIHBvc2l0aW9uLCBvbkNvbXBsZXRlQWxsLCBvbkNvbXBsZXRlQWxsUGFyYW1zKSB7XG4gICAgdmFycy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgIHZhcnMuc3RhZ2dlciA9IHZhcnMuc3RhZ2dlciB8fCBzdGFnZ2VyO1xuICAgIHZhcnMub25Db21wbGV0ZSA9IG9uQ29tcGxldGVBbGw7XG4gICAgdmFycy5vbkNvbXBsZXRlUGFyYW1zID0gb25Db21wbGV0ZUFsbFBhcmFtcztcbiAgICB2YXJzLnBhcmVudCA9IHRoaXM7XG4gICAgbmV3IFR3ZWVuKHRhcmdldHMsIHZhcnMsIF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5zdGFnZ2VyRnJvbSA9IGZ1bmN0aW9uIHN0YWdnZXJGcm9tKHRhcmdldHMsIGR1cmF0aW9uLCB2YXJzLCBzdGFnZ2VyLCBwb3NpdGlvbiwgb25Db21wbGV0ZUFsbCwgb25Db21wbGV0ZUFsbFBhcmFtcykge1xuICAgIHZhcnMucnVuQmFja3dhcmRzID0gMTtcbiAgICBfaW5oZXJpdERlZmF1bHRzKHZhcnMpLmltbWVkaWF0ZVJlbmRlciA9IF9pc05vdEZhbHNlKHZhcnMuaW1tZWRpYXRlUmVuZGVyKTtcbiAgICByZXR1cm4gdGhpcy5zdGFnZ2VyVG8odGFyZ2V0cywgZHVyYXRpb24sIHZhcnMsIHN0YWdnZXIsIHBvc2l0aW9uLCBvbkNvbXBsZXRlQWxsLCBvbkNvbXBsZXRlQWxsUGFyYW1zKTtcbiAgfTtcblxuICBfcHJvdG8yLnN0YWdnZXJGcm9tVG8gPSBmdW5jdGlvbiBzdGFnZ2VyRnJvbVRvKHRhcmdldHMsIGR1cmF0aW9uLCBmcm9tVmFycywgdG9WYXJzLCBzdGFnZ2VyLCBwb3NpdGlvbiwgb25Db21wbGV0ZUFsbCwgb25Db21wbGV0ZUFsbFBhcmFtcykge1xuICAgIHRvVmFycy5zdGFydEF0ID0gZnJvbVZhcnM7XG4gICAgX2luaGVyaXREZWZhdWx0cyh0b1ZhcnMpLmltbWVkaWF0ZVJlbmRlciA9IF9pc05vdEZhbHNlKHRvVmFycy5pbW1lZGlhdGVSZW5kZXIpO1xuICAgIHJldHVybiB0aGlzLnN0YWdnZXJUbyh0YXJnZXRzLCBkdXJhdGlvbiwgdG9WYXJzLCBzdGFnZ2VyLCBwb3NpdGlvbiwgb25Db21wbGV0ZUFsbCwgb25Db21wbGV0ZUFsbFBhcmFtcyk7XG4gIH07XG5cbiAgX3Byb3RvMi5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHtcbiAgICB2YXIgcHJldlRpbWUgPSB0aGlzLl90aW1lLFxuICAgICAgICB0RHVyID0gdGhpcy5fZGlydHkgPyB0aGlzLnRvdGFsRHVyYXRpb24oKSA6IHRoaXMuX3REdXIsXG4gICAgICAgIGR1ciA9IHRoaXMuX2R1cixcbiAgICAgICAgdFRpbWUgPSB0b3RhbFRpbWUgPD0gMCA/IDAgOiBfcm91bmRQcmVjaXNlKHRvdGFsVGltZSksXG4gICAgICAgIC8vIGlmIGEgcGF1c2VkIHRpbWVsaW5lIGlzIHJlc3VtZWQgKG9yIGl0cyBfc3RhcnQgaXMgdXBkYXRlZCBmb3IgYW5vdGhlciByZWFzb24uLi53aGljaCByb3VuZHMgaXQpLCB0aGF0IGNvdWxkIHJlc3VsdCBpbiB0aGUgcGxheWhlYWQgc2hpZnRpbmcgYSAqKnRpbnkqKiBhbW91bnQgYW5kIGEgemVyby1kdXJhdGlvbiBjaGlsZCBhdCB0aGF0IHNwb3QgbWF5IGdldCByZW5kZXJlZCBhdCBhIGRpZmZlcmVudCByYXRpbywgbGlrZSBpdHMgdG90YWxUaW1lIGluIHJlbmRlcigpIG1heSBiZSAxZS0xNyBpbnN0ZWFkIG9mIDAsIGZvciBleGFtcGxlLlxuICAgIGNyb3NzaW5nU3RhcnQgPSB0aGlzLl96VGltZSA8IDAgIT09IHRvdGFsVGltZSA8IDAgJiYgKHRoaXMuX2luaXR0ZWQgfHwgIWR1ciksXG4gICAgICAgIHRpbWUsXG4gICAgICAgIGNoaWxkLFxuICAgICAgICBuZXh0LFxuICAgICAgICBpdGVyYXRpb24sXG4gICAgICAgIGN5Y2xlRHVyYXRpb24sXG4gICAgICAgIHByZXZQYXVzZWQsXG4gICAgICAgIHBhdXNlVHdlZW4sXG4gICAgICAgIHRpbWVTY2FsZSxcbiAgICAgICAgcHJldlN0YXJ0LFxuICAgICAgICBwcmV2SXRlcmF0aW9uLFxuICAgICAgICB5b3lvLFxuICAgICAgICBpc1lveW87XG4gICAgdGhpcyAhPT0gX2dsb2JhbFRpbWVsaW5lICYmIHRUaW1lID4gdER1ciAmJiB0b3RhbFRpbWUgPj0gMCAmJiAodFRpbWUgPSB0RHVyKTtcblxuICAgIGlmICh0VGltZSAhPT0gdGhpcy5fdFRpbWUgfHwgZm9yY2UgfHwgY3Jvc3NpbmdTdGFydCkge1xuICAgICAgaWYgKHByZXZUaW1lICE9PSB0aGlzLl90aW1lICYmIGR1cikge1xuICAgICAgICAvL2lmIHRvdGFsRHVyYXRpb24oKSBmaW5kcyBhIGNoaWxkIHdpdGggYSBuZWdhdGl2ZSBzdGFydFRpbWUgYW5kIHNtb290aENoaWxkVGltaW5nIGlzIHRydWUsIHRoaW5ncyBnZXQgc2hpZnRlZCBhcm91bmQgaW50ZXJuYWxseSBzbyB3ZSBuZWVkIHRvIGFkanVzdCB0aGUgdGltZSBhY2NvcmRpbmdseS4gRm9yIGV4YW1wbGUsIGlmIGEgdHdlZW4gc3RhcnRzIGF0IC0zMCB3ZSBtdXN0IHNoaWZ0IEVWRVJZVEhJTkcgZm9yd2FyZCAzMCBzZWNvbmRzIGFuZCBtb3ZlIHRoaXMgdGltZWxpbmUncyBzdGFydFRpbWUgYmFja3dhcmQgYnkgMzAgc2Vjb25kcyBzbyB0aGF0IHRoaW5ncyBhbGlnbiB3aXRoIHRoZSBwbGF5aGVhZCAobm8ganVtcCkuXG4gICAgICAgIHRUaW1lICs9IHRoaXMuX3RpbWUgLSBwcmV2VGltZTtcbiAgICAgICAgdG90YWxUaW1lICs9IHRoaXMuX3RpbWUgLSBwcmV2VGltZTtcbiAgICAgIH1cblxuICAgICAgdGltZSA9IHRUaW1lO1xuICAgICAgcHJldlN0YXJ0ID0gdGhpcy5fc3RhcnQ7XG4gICAgICB0aW1lU2NhbGUgPSB0aGlzLl90cztcbiAgICAgIHByZXZQYXVzZWQgPSAhdGltZVNjYWxlO1xuXG4gICAgICBpZiAoY3Jvc3NpbmdTdGFydCkge1xuICAgICAgICBkdXIgfHwgKHByZXZUaW1lID0gdGhpcy5felRpbWUpOyAvL3doZW4gdGhlIHBsYXloZWFkIGFycml2ZXMgYXQgRVhBQ1RMWSB0aW1lIDAgKHJpZ2h0IG9uIHRvcCkgb2YgYSB6ZXJvLWR1cmF0aW9uIHRpbWVsaW5lLCB3ZSBuZWVkIHRvIGRpc2Nlcm4gaWYgZXZlbnRzIGFyZSBzdXBwcmVzc2VkIHNvIHRoYXQgd2hlbiB0aGUgcGxheWhlYWQgbW92ZXMgYWdhaW4gKG5leHQgdGltZSksIGl0J2xsIHRyaWdnZXIgdGhlIGNhbGxiYWNrLiBJZiBldmVudHMgYXJlIE5PVCBzdXBwcmVzc2VkLCBvYnZpb3VzbHkgdGhlIGNhbGxiYWNrIHdvdWxkIGJlIHRyaWdnZXJlZCBpbiB0aGlzIHJlbmRlci4gQmFzaWNhbGx5LCB0aGUgY2FsbGJhY2sgc2hvdWxkIGZpcmUgZWl0aGVyIHdoZW4gdGhlIHBsYXloZWFkIEFSUklWRVMgb3IgTEVBVkVTIHRoaXMgZXhhY3Qgc3BvdCwgbm90IGJvdGguIEltYWdpbmUgZG9pbmcgYSB0aW1lbGluZS5zZWVrKDApIGFuZCB0aGVyZSdzIGEgY2FsbGJhY2sgdGhhdCBzaXRzIGF0IDAuIFNpbmNlIGV2ZW50cyBhcmUgc3VwcHJlc3NlZCBvbiB0aGF0IHNlZWsoKSBieSBkZWZhdWx0LCBub3RoaW5nIHdpbGwgZmlyZSwgYnV0IHdoZW4gdGhlIHBsYXloZWFkIG1vdmVzIG9mZiBvZiB0aGF0IHBvc2l0aW9uLCB0aGUgY2FsbGJhY2sgc2hvdWxkIGZpcmUuIFRoaXMgYmVoYXZpb3IgaXMgd2hhdCBwZW9wbGUgaW50dWl0aXZlbHkgZXhwZWN0LlxuXG4gICAgICAgICh0b3RhbFRpbWUgfHwgIXN1cHByZXNzRXZlbnRzKSAmJiAodGhpcy5felRpbWUgPSB0b3RhbFRpbWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fcmVwZWF0KSB7XG4gICAgICAgIC8vYWRqdXN0IHRoZSB0aW1lIGZvciByZXBlYXRzIGFuZCB5b3lvc1xuICAgICAgICB5b3lvID0gdGhpcy5feW95bztcbiAgICAgICAgY3ljbGVEdXJhdGlvbiA9IGR1ciArIHRoaXMuX3JEZWxheTtcblxuICAgICAgICBpZiAodGhpcy5fcmVwZWF0IDwgLTEgJiYgdG90YWxUaW1lIDwgMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnRvdGFsVGltZShjeWNsZUR1cmF0aW9uICogMTAwICsgdG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGltZSA9IF9yb3VuZFByZWNpc2UodFRpbWUgJSBjeWNsZUR1cmF0aW9uKTsgLy9yb3VuZCB0byBhdm9pZCBmbG9hdGluZyBwb2ludCBlcnJvcnMuICg0ICUgMC44IHNob3VsZCBiZSAwIGJ1dCBzb21lIGJyb3dzZXJzIHJlcG9ydCBpdCBhcyAwLjc5OTk5OTk5ISlcblxuICAgICAgICBpZiAodFRpbWUgPT09IHREdXIpIHtcbiAgICAgICAgICAvLyB0aGUgdER1ciA9PT0gdFRpbWUgaXMgZm9yIGVkZ2UgY2FzZXMgd2hlcmUgdGhlcmUncyBhIGxlbmd0aHkgZGVjaW1hbCBvbiB0aGUgZHVyYXRpb24gYW5kIGl0IG1heSByZWFjaCB0aGUgdmVyeSBlbmQgYnV0IHRoZSB0aW1lIGlzIHJlbmRlcmVkIGFzIG5vdC1xdWl0ZS10aGVyZSAocmVtZW1iZXIsIHREdXIgaXMgcm91bmRlZCB0byA0IGRlY2ltYWxzIHdoZXJlYXMgZHVyIGlzbid0KVxuICAgICAgICAgIGl0ZXJhdGlvbiA9IHRoaXMuX3JlcGVhdDtcbiAgICAgICAgICB0aW1lID0gZHVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZXJhdGlvbiA9IH5+KHRUaW1lIC8gY3ljbGVEdXJhdGlvbik7XG5cbiAgICAgICAgICBpZiAoaXRlcmF0aW9uICYmIGl0ZXJhdGlvbiA9PT0gdFRpbWUgLyBjeWNsZUR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aW1lID0gZHVyO1xuICAgICAgICAgICAgaXRlcmF0aW9uLS07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGltZSA+IGR1ciAmJiAodGltZSA9IGR1cik7XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2SXRlcmF0aW9uID0gX2FuaW1hdGlvbkN5Y2xlKHRoaXMuX3RUaW1lLCBjeWNsZUR1cmF0aW9uKTtcbiAgICAgICAgIXByZXZUaW1lICYmIHRoaXMuX3RUaW1lICYmIHByZXZJdGVyYXRpb24gIT09IGl0ZXJhdGlvbiAmJiB0aGlzLl90VGltZSAtIHByZXZJdGVyYXRpb24gKiBjeWNsZUR1cmF0aW9uIC0gdGhpcy5fZHVyIDw9IDAgJiYgKHByZXZJdGVyYXRpb24gPSBpdGVyYXRpb24pOyAvLyBlZGdlIGNhc2UgLSBpZiBzb21lb25lIGRvZXMgYWRkUGF1c2UoKSBhdCB0aGUgdmVyeSBiZWdpbm5pbmcgb2YgYSByZXBlYXRpbmcgdGltZWxpbmUsIHRoYXQgcGF1c2UgaXMgdGVjaG5pY2FsbHkgYXQgdGhlIHNhbWUgc3BvdCBhcyB0aGUgZW5kIHdoaWNoIGNhdXNlcyB0aGlzLl90aW1lIHRvIGdldCBzZXQgdG8gMCB3aGVuIHRoZSB0b3RhbFRpbWUgd291bGQgbm9ybWFsbHkgcGxhY2UgdGhlIHBsYXloZWFkIGF0IHRoZSBlbmQuIFNlZSBodHRwczovL2dyZWVuc29jay5jb20vZm9ydW1zL3RvcGljLzIzODIzLWNsb3NpbmctbmF2LWFuaW1hdGlvbi1ub3Qtd29ya2luZy1vbi1pZS1hbmQtaXBob25lLTYtbWF5YmUtb3RoZXItb2xkZXItYnJvd3Nlci8/dGFiPWNvbW1lbnRzI2NvbW1lbnQtMTEzMDA1IGFsc28sIHRoaXMuX3RUaW1lIC0gcHJldkl0ZXJhdGlvbiAqIGN5Y2xlRHVyYXRpb24gLSB0aGlzLl9kdXIgPD0gMCBqdXN0IGNoZWNrcyB0byBtYWtlIHN1cmUgaXQgd2Fzbid0IHByZXZpb3VzbHkgaW4gdGhlIFwicmVwZWF0RGVsYXlcIiBwb3J0aW9uXG5cbiAgICAgICAgaWYgKHlveW8gJiYgaXRlcmF0aW9uICYgMSkge1xuICAgICAgICAgIHRpbWUgPSBkdXIgLSB0aW1lO1xuICAgICAgICAgIGlzWW95byA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgbWFrZSBzdXJlIGNoaWxkcmVuIGF0IHRoZSBlbmQvYmVnaW5uaW5nIG9mIHRoZSB0aW1lbGluZSBhcmUgcmVuZGVyZWQgcHJvcGVybHkuIElmLCBmb3IgZXhhbXBsZSxcbiAgICAgICAgYSAzLXNlY29uZCBsb25nIHRpbWVsaW5lIHJlbmRlcmVkIGF0IDIuOSBzZWNvbmRzIHByZXZpb3VzbHksIGFuZCBub3cgcmVuZGVycyBhdCAzLjIgc2Vjb25kcyAod2hpY2hcbiAgICAgICAgd291bGQgZ2V0IHRyYW5zbGF0ZWQgdG8gMi44IHNlY29uZHMgaWYgdGhlIHRpbWVsaW5lIHlveW9zIG9yIDAuMiBzZWNvbmRzIGlmIGl0IGp1c3QgcmVwZWF0cyksIHRoZXJlXG4gICAgICAgIGNvdWxkIGJlIGEgY2FsbGJhY2sgb3IgYSBzaG9ydCB0d2VlbiB0aGF0J3MgYXQgMi45NSBvciAzIHNlY29uZHMgaW4gd2hpY2ggd291bGRuJ3QgcmVuZGVyLiBTb1xuICAgICAgICB3ZSBuZWVkIHRvIHB1c2ggdGhlIHRpbWVsaW5lIHRvIHRoZSBlbmQgKGFuZC9vciBiZWdpbm5pbmcgZGVwZW5kaW5nIG9uIGl0cyB5b3lvIHZhbHVlKS4gQWxzbyB3ZSBtdXN0XG4gICAgICAgIGVuc3VyZSB0aGF0IHplcm8tZHVyYXRpb24gdHdlZW5zIGF0IHRoZSB2ZXJ5IGJlZ2lubmluZyBvciBlbmQgb2YgdGhlIFRpbWVsaW5lIHdvcmsuXG4gICAgICAgICovXG5cblxuICAgICAgICBpZiAoaXRlcmF0aW9uICE9PSBwcmV2SXRlcmF0aW9uICYmICF0aGlzLl9sb2NrKSB7XG4gICAgICAgICAgdmFyIHJld2luZGluZyA9IHlveW8gJiYgcHJldkl0ZXJhdGlvbiAmIDEsXG4gICAgICAgICAgICAgIGRvZXNXcmFwID0gcmV3aW5kaW5nID09PSAoeW95byAmJiBpdGVyYXRpb24gJiAxKTtcbiAgICAgICAgICBpdGVyYXRpb24gPCBwcmV2SXRlcmF0aW9uICYmIChyZXdpbmRpbmcgPSAhcmV3aW5kaW5nKTtcbiAgICAgICAgICBwcmV2VGltZSA9IHJld2luZGluZyA/IDAgOiBkdXI7XG4gICAgICAgICAgdGhpcy5fbG9jayA9IDE7XG4gICAgICAgICAgdGhpcy5yZW5kZXIocHJldlRpbWUgfHwgKGlzWW95byA/IDAgOiBfcm91bmRQcmVjaXNlKGl0ZXJhdGlvbiAqIGN5Y2xlRHVyYXRpb24pKSwgc3VwcHJlc3NFdmVudHMsICFkdXIpLl9sb2NrID0gMDtcbiAgICAgICAgICB0aGlzLl90VGltZSA9IHRUaW1lOyAvLyBpZiBhIHVzZXIgZ2V0cyB0aGUgaXRlcmF0aW9uKCkgaW5zaWRlIHRoZSBvblJlcGVhdCwgZm9yIGV4YW1wbGUsIGl0IHNob3VsZCBiZSBhY2N1cmF0ZS5cblxuICAgICAgICAgICFzdXBwcmVzc0V2ZW50cyAmJiB0aGlzLnBhcmVudCAmJiBfY2FsbGJhY2sodGhpcywgXCJvblJlcGVhdFwiKTtcbiAgICAgICAgICB0aGlzLnZhcnMucmVwZWF0UmVmcmVzaCAmJiAhaXNZb3lvICYmICh0aGlzLmludmFsaWRhdGUoKS5fbG9jayA9IDEpO1xuXG4gICAgICAgICAgaWYgKHByZXZUaW1lICYmIHByZXZUaW1lICE9PSB0aGlzLl90aW1lIHx8IHByZXZQYXVzZWQgIT09ICF0aGlzLl90cyB8fCB0aGlzLnZhcnMub25SZXBlYXQgJiYgIXRoaXMucGFyZW50ICYmICF0aGlzLl9hY3QpIHtcbiAgICAgICAgICAgIC8vIGlmIHByZXZUaW1lIGlzIDAgYW5kIHdlIHJlbmRlciBhdCB0aGUgdmVyeSBlbmQsIF90aW1lIHdpbGwgYmUgdGhlIGVuZCwgdGh1cyB3b24ndCBtYXRjaC4gU28gaW4gdGhpcyBlZGdlIGNhc2UsIHByZXZUaW1lIHdvbid0IG1hdGNoIF90aW1lIGJ1dCB0aGF0J3Mgb2theS4gSWYgaXQgZ2V0cyBraWxsZWQgaW4gdGhlIG9uUmVwZWF0LCBlamVjdCBhcyB3ZWxsLlxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZHVyID0gdGhpcy5fZHVyOyAvLyBpbiBjYXNlIHRoZSBkdXJhdGlvbiBjaGFuZ2VkIGluIHRoZSBvblJlcGVhdFxuXG4gICAgICAgICAgdER1ciA9IHRoaXMuX3REdXI7XG5cbiAgICAgICAgICBpZiAoZG9lc1dyYXApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2sgPSAyO1xuICAgICAgICAgICAgcHJldlRpbWUgPSByZXdpbmRpbmcgPyBkdXIgOiAtMC4wMDAxO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIocHJldlRpbWUsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy52YXJzLnJlcGVhdFJlZnJlc2ggJiYgIWlzWW95byAmJiB0aGlzLmludmFsaWRhdGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9sb2NrID0gMDtcblxuICAgICAgICAgIGlmICghdGhpcy5fdHMgJiYgIXByZXZQYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH0gLy9pbiBvcmRlciBmb3IgeW95b0Vhc2UgdG8gd29yayBwcm9wZXJseSB3aGVuIHRoZXJlJ3MgYSBzdGFnZ2VyLCB3ZSBtdXN0IHN3YXAgb3V0IHRoZSBlYXNlIGluIGVhY2ggc3ViLXR3ZWVuLlxuXG5cbiAgICAgICAgICBfcHJvcGFnYXRlWW95b0Vhc2UodGhpcywgaXNZb3lvKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5faGFzUGF1c2UgJiYgIXRoaXMuX2ZvcmNpbmcgJiYgdGhpcy5fbG9jayA8IDIpIHtcbiAgICAgICAgcGF1c2VUd2VlbiA9IF9maW5kTmV4dFBhdXNlVHdlZW4odGhpcywgX3JvdW5kUHJlY2lzZShwcmV2VGltZSksIF9yb3VuZFByZWNpc2UodGltZSkpO1xuXG4gICAgICAgIGlmIChwYXVzZVR3ZWVuKSB7XG4gICAgICAgICAgdFRpbWUgLT0gdGltZSAtICh0aW1lID0gcGF1c2VUd2Vlbi5fc3RhcnQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3RUaW1lID0gdFRpbWU7XG4gICAgICB0aGlzLl90aW1lID0gdGltZTtcbiAgICAgIHRoaXMuX2FjdCA9ICF0aW1lU2NhbGU7IC8vYXMgbG9uZyBhcyBpdCdzIG5vdCBwYXVzZWQsIGZvcmNlIGl0IHRvIGJlIGFjdGl2ZSBzbyB0aGF0IGlmIHRoZSB1c2VyIHJlbmRlcnMgaW5kZXBlbmRlbnQgb2YgdGhlIHBhcmVudCB0aW1lbGluZSwgaXQnbGwgYmUgZm9yY2VkIHRvIHJlLXJlbmRlciBvbiB0aGUgbmV4dCB0aWNrLlxuXG4gICAgICBpZiAoIXRoaXMuX2luaXR0ZWQpIHtcbiAgICAgICAgdGhpcy5fb25VcGRhdGUgPSB0aGlzLnZhcnMub25VcGRhdGU7XG4gICAgICAgIHRoaXMuX2luaXR0ZWQgPSAxO1xuICAgICAgICB0aGlzLl96VGltZSA9IHRvdGFsVGltZTtcbiAgICAgICAgcHJldlRpbWUgPSAwOyAvLyB1cG9uIGluaXQsIHRoZSBwbGF5aGVhZCBzaG91bGQgYWx3YXlzIGdvIGZvcndhcmQ7IHNvbWVvbmUgY291bGQgaW52YWxpZGF0ZSgpIGEgY29tcGxldGVkIHRpbWVsaW5lIGFuZCB0aGVuIGlmIHRoZXkgcmVzdGFydCgpLCB0aGF0IHdvdWxkIG1ha2UgY2hpbGQgdHdlZW5zIHJlbmRlciBpbiByZXZlcnNlIG9yZGVyIHdoaWNoIGNvdWxkIGxvY2sgaW4gdGhlIHdyb25nIHN0YXJ0aW5nIHZhbHVlcyBpZiB0aGV5IGJ1aWxkIG9uIGVhY2ggb3RoZXIsIGxpa2UgdGwudG8ob2JqLCB7eDogMTAwfSkudG8ob2JqLCB7eDogMH0pLlxuICAgICAgfVxuXG4gICAgICBpZiAoIXByZXZUaW1lICYmIHRpbWUgJiYgIXN1cHByZXNzRXZlbnRzICYmICFpdGVyYXRpb24pIHtcbiAgICAgICAgX2NhbGxiYWNrKHRoaXMsIFwib25TdGFydFwiKTtcblxuICAgICAgICBpZiAodGhpcy5fdFRpbWUgIT09IHRUaW1lKSB7XG4gICAgICAgICAgLy8gaW4gY2FzZSB0aGUgb25TdGFydCB0cmlnZ2VyZWQgYSByZW5kZXIgYXQgYSBkaWZmZXJlbnQgc3BvdCwgZWplY3QuIExpa2UgaWYgc29tZW9uZSBkaWQgYW5pbWF0aW9uLnBhdXNlKDAuNSkgb3Igc29tZXRoaW5nIGluc2lkZSB0aGUgb25TdGFydC5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGltZSA+PSBwcmV2VGltZSAmJiB0b3RhbFRpbWUgPj0gMCkge1xuICAgICAgICBjaGlsZCA9IHRoaXMuX2ZpcnN0O1xuXG4gICAgICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgICAgIG5leHQgPSBjaGlsZC5fbmV4dDtcblxuICAgICAgICAgIGlmICgoY2hpbGQuX2FjdCB8fCB0aW1lID49IGNoaWxkLl9zdGFydCkgJiYgY2hpbGQuX3RzICYmIHBhdXNlVHdlZW4gIT09IGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgIC8vIGFuIGV4dHJlbWUgZWRnZSBjYXNlIC0gdGhlIGNoaWxkJ3MgcmVuZGVyIGNvdWxkIGRvIHNvbWV0aGluZyBsaWtlIGtpbGwoKSB0aGUgXCJuZXh0XCIgb25lIGluIHRoZSBsaW5rZWQgbGlzdCwgb3IgcmVwYXJlbnQgaXQuIEluIHRoYXQgY2FzZSB3ZSBtdXN0IHJlLWluaXRpYXRlIHRoZSB3aG9sZSByZW5kZXIgdG8gYmUgc2FmZS5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hpbGQucmVuZGVyKGNoaWxkLl90cyA+IDAgPyAodGltZSAtIGNoaWxkLl9zdGFydCkgKiBjaGlsZC5fdHMgOiAoY2hpbGQuX2RpcnR5ID8gY2hpbGQudG90YWxEdXJhdGlvbigpIDogY2hpbGQuX3REdXIpICsgKHRpbWUgLSBjaGlsZC5fc3RhcnQpICogY2hpbGQuX3RzLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuXG4gICAgICAgICAgICBpZiAodGltZSAhPT0gdGhpcy5fdGltZSB8fCAhdGhpcy5fdHMgJiYgIXByZXZQYXVzZWQpIHtcbiAgICAgICAgICAgICAgLy9pbiBjYXNlIGEgdHdlZW4gcGF1c2VzIG9yIHNlZWtzIHRoZSB0aW1lbGluZSB3aGVuIHJlbmRlcmluZywgbGlrZSBpbnNpZGUgb2YgYW4gb25VcGRhdGUvb25Db21wbGV0ZVxuICAgICAgICAgICAgICBwYXVzZVR3ZWVuID0gMDtcbiAgICAgICAgICAgICAgbmV4dCAmJiAodFRpbWUgKz0gdGhpcy5felRpbWUgPSAtX3RpbnlOdW0pOyAvLyBpdCBkaWRuJ3QgZmluaXNoIHJlbmRlcmluZywgc28gZmxhZyB6VGltZSBhcyBuZWdhdGl2ZSBzbyB0aGF0IHNvIHRoYXQgdGhlIG5leHQgdGltZSByZW5kZXIoKSBpcyBjYWxsZWQgaXQnbGwgYmUgZm9yY2VkICh0byByZW5kZXIgYW55IHJlbWFpbmluZyBjaGlsZHJlbilcblxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjaGlsZCA9IG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkID0gdGhpcy5fbGFzdDtcbiAgICAgICAgdmFyIGFkanVzdGVkVGltZSA9IHRvdGFsVGltZSA8IDAgPyB0b3RhbFRpbWUgOiB0aW1lOyAvL3doZW4gdGhlIHBsYXloZWFkIGdvZXMgYmFja3dhcmQgYmV5b25kIHRoZSBzdGFydCBvZiB0aGlzIHRpbWVsaW5lLCB3ZSBtdXN0IHBhc3MgdGhhdCBpbmZvcm1hdGlvbiBkb3duIHRvIHRoZSBjaGlsZCBhbmltYXRpb25zIHNvIHRoYXQgemVyby1kdXJhdGlvbiB0d2VlbnMga25vdyB3aGV0aGVyIHRvIHJlbmRlciB0aGVpciBzdGFydGluZyBvciBlbmRpbmcgdmFsdWVzLlxuXG4gICAgICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgICAgIG5leHQgPSBjaGlsZC5fcHJldjtcblxuICAgICAgICAgIGlmICgoY2hpbGQuX2FjdCB8fCBhZGp1c3RlZFRpbWUgPD0gY2hpbGQuX2VuZCkgJiYgY2hpbGQuX3RzICYmIHBhdXNlVHdlZW4gIT09IGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50ICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgIC8vIGFuIGV4dHJlbWUgZWRnZSBjYXNlIC0gdGhlIGNoaWxkJ3MgcmVuZGVyIGNvdWxkIGRvIHNvbWV0aGluZyBsaWtlIGtpbGwoKSB0aGUgXCJuZXh0XCIgb25lIGluIHRoZSBsaW5rZWQgbGlzdCwgb3IgcmVwYXJlbnQgaXQuIEluIHRoYXQgY2FzZSB3ZSBtdXN0IHJlLWluaXRpYXRlIHRoZSB3aG9sZSByZW5kZXIgdG8gYmUgc2FmZS5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2hpbGQucmVuZGVyKGNoaWxkLl90cyA+IDAgPyAoYWRqdXN0ZWRUaW1lIC0gY2hpbGQuX3N0YXJ0KSAqIGNoaWxkLl90cyA6IChjaGlsZC5fZGlydHkgPyBjaGlsZC50b3RhbER1cmF0aW9uKCkgOiBjaGlsZC5fdER1cikgKyAoYWRqdXN0ZWRUaW1lIC0gY2hpbGQuX3N0YXJ0KSAqIGNoaWxkLl90cywgc3VwcHJlc3NFdmVudHMsIGZvcmNlIHx8IF9yZXZlcnRpbmcgJiYgKGNoaWxkLl9pbml0dGVkIHx8IGNoaWxkLl9zdGFydEF0KSk7IC8vIGlmIHJldmVydGluZywgd2Ugc2hvdWxkIGFsd2F5cyBmb3JjZSByZW5kZXJzIG9mIGluaXR0ZWQgdHdlZW5zIChidXQgcmVtZW1iZXIgdGhhdCAuZnJvbVRvKCkgb3IgLmZyb20oKSBtYXkgaGF2ZSBhIF9zdGFydEF0IGJ1dCBub3QgX2luaXR0ZWQgeWV0KS4gSWYsIGZvciBleGFtcGxlLCBhIC5mcm9tVG8oKSB0d2VlbiB3aXRoIGEgc3RhZ2dlciAod2hpY2ggY3JlYXRlcyBhbiBpbnRlcm5hbCB0aW1lbGluZSkgZ2V0cyByZXZlcnRlZCBCRUZPUkUgc29tZSBvZiBpdHMgY2hpbGQgdHdlZW5zIHJlbmRlciBmb3IgdGhlIGZpcnN0IHRpbWUsIGl0IG1heSBub3QgcHJvcGVybHkgdHJpZ2dlciB0aGVtIHRvIHJldmVydC5cblxuICAgICAgICAgICAgaWYgKHRpbWUgIT09IHRoaXMuX3RpbWUgfHwgIXRoaXMuX3RzICYmICFwcmV2UGF1c2VkKSB7XG4gICAgICAgICAgICAgIC8vaW4gY2FzZSBhIHR3ZWVuIHBhdXNlcyBvciBzZWVrcyB0aGUgdGltZWxpbmUgd2hlbiByZW5kZXJpbmcsIGxpa2UgaW5zaWRlIG9mIGFuIG9uVXBkYXRlL29uQ29tcGxldGVcbiAgICAgICAgICAgICAgcGF1c2VUd2VlbiA9IDA7XG4gICAgICAgICAgICAgIG5leHQgJiYgKHRUaW1lICs9IHRoaXMuX3pUaW1lID0gYWRqdXN0ZWRUaW1lID8gLV90aW55TnVtIDogX3RpbnlOdW0pOyAvLyBpdCBkaWRuJ3QgZmluaXNoIHJlbmRlcmluZywgc28gYWRqdXN0IHpUaW1lIHNvIHRoYXQgc28gdGhhdCB0aGUgbmV4dCB0aW1lIHJlbmRlcigpIGlzIGNhbGxlZCBpdCdsbCBiZSBmb3JjZWQgKHRvIHJlbmRlciBhbnkgcmVtYWluaW5nIGNoaWxkcmVuKVxuXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNoaWxkID0gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGF1c2VUd2VlbiAmJiAhc3VwcHJlc3NFdmVudHMpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICBwYXVzZVR3ZWVuLnJlbmRlcih0aW1lID49IHByZXZUaW1lID8gMCA6IC1fdGlueU51bSkuX3pUaW1lID0gdGltZSA+PSBwcmV2VGltZSA/IDEgOiAtMTtcblxuICAgICAgICBpZiAodGhpcy5fdHMpIHtcbiAgICAgICAgICAvL3RoZSBjYWxsYmFjayByZXN1bWVkIHBsYXliYWNrISBTbyBzaW5jZSB3ZSBtYXkgaGF2ZSBoZWxkIGJhY2sgdGhlIHBsYXloZWFkIGR1ZSB0byB3aGVyZSB0aGUgcGF1c2UgaXMgcG9zaXRpb25lZCwgZ28gYWhlYWQgYW5kIGp1bXAgdG8gd2hlcmUgaXQncyBTVVBQT1NFRCB0byBiZSAoaWYgbm8gcGF1c2UgaGFwcGVuZWQpLlxuICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gcHJldlN0YXJ0OyAvL2lmIHRoZSBwYXVzZSB3YXMgYXQgYW4gZWFybGllciB0aW1lIGFuZCB0aGUgdXNlciByZXN1bWVkIGluIHRoZSBjYWxsYmFjaywgaXQgY291bGQgcmVwb3NpdGlvbiB0aGUgdGltZWxpbmUgKGNoYW5naW5nIGl0cyBzdGFydFRpbWUpLCB0aHJvd2luZyB0aGluZ3Mgb2ZmIHNsaWdodGx5LCBzbyB3ZSBtYWtlIHN1cmUgdGhlIF9zdGFydCBkb2Vzbid0IHNoaWZ0LlxuXG4gICAgICAgICAgX3NldEVuZCh0aGlzKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlcih0b3RhbFRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fb25VcGRhdGUgJiYgIXN1cHByZXNzRXZlbnRzICYmIF9jYWxsYmFjayh0aGlzLCBcIm9uVXBkYXRlXCIsIHRydWUpO1xuICAgICAgaWYgKHRUaW1lID09PSB0RHVyICYmIHRoaXMuX3RUaW1lID49IHRoaXMudG90YWxEdXJhdGlvbigpIHx8ICF0VGltZSAmJiBwcmV2VGltZSkgaWYgKHByZXZTdGFydCA9PT0gdGhpcy5fc3RhcnQgfHwgTWF0aC5hYnModGltZVNjYWxlKSAhPT0gTWF0aC5hYnModGhpcy5fdHMpKSBpZiAoIXRoaXMuX2xvY2spIHtcbiAgICAgICAgLy8gcmVtZW1iZXIsIGEgY2hpbGQncyBjYWxsYmFjayBtYXkgYWx0ZXIgdGhpcyB0aW1lbGluZSdzIHBsYXloZWFkIG9yIHRpbWVTY2FsZSB3aGljaCBpcyB3aHkgd2UgbmVlZCB0byBhZGQgc29tZSBvZiB0aGVzZSBjaGVja3MuXG4gICAgICAgICh0b3RhbFRpbWUgfHwgIWR1cikgJiYgKHRUaW1lID09PSB0RHVyICYmIHRoaXMuX3RzID4gMCB8fCAhdFRpbWUgJiYgdGhpcy5fdHMgPCAwKSAmJiBfcmVtb3ZlRnJvbVBhcmVudCh0aGlzLCAxKTsgLy8gZG9uJ3QgcmVtb3ZlIGlmIHRoZSB0aW1lbGluZSBpcyByZXZlcnNlZCBhbmQgdGhlIHBsYXloZWFkIGlzbid0IGF0IDAsIG90aGVyd2lzZSB0bC5wcm9ncmVzcygxKS5yZXZlcnNlKCkgd29uJ3Qgd29yay4gT25seSByZW1vdmUgaWYgdGhlIHBsYXloZWFkIGlzIGF0IHRoZSBlbmQgYW5kIHRpbWVTY2FsZSBpcyBwb3NpdGl2ZSwgb3IgaWYgdGhlIHBsYXloZWFkIGlzIGF0IDAgYW5kIHRoZSB0aW1lU2NhbGUgaXMgbmVnYXRpdmUuXG5cbiAgICAgICAgaWYgKCFzdXBwcmVzc0V2ZW50cyAmJiAhKHRvdGFsVGltZSA8IDAgJiYgIXByZXZUaW1lKSAmJiAodFRpbWUgfHwgcHJldlRpbWUgfHwgIXREdXIpKSB7XG4gICAgICAgICAgX2NhbGxiYWNrKHRoaXMsIHRUaW1lID09PSB0RHVyICYmIHRvdGFsVGltZSA+PSAwID8gXCJvbkNvbXBsZXRlXCIgOiBcIm9uUmV2ZXJzZUNvbXBsZXRlXCIsIHRydWUpO1xuXG4gICAgICAgICAgdGhpcy5fcHJvbSAmJiAhKHRUaW1lIDwgdER1ciAmJiB0aGlzLnRpbWVTY2FsZSgpID4gMCkgJiYgdGhpcy5fcHJvbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5hZGQgPSBmdW5jdGlvbiBhZGQoY2hpbGQsIHBvc2l0aW9uKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBfaXNOdW1iZXIocG9zaXRpb24pIHx8IChwb3NpdGlvbiA9IF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uLCBjaGlsZCkpO1xuXG4gICAgaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBBbmltYXRpb24pKSB7XG4gICAgICBpZiAoX2lzQXJyYXkoY2hpbGQpKSB7XG4gICAgICAgIGNoaWxkLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgIHJldHVybiBfdGhpczIuYWRkKG9iaiwgcG9zaXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGlmIChfaXNTdHJpbmcoY2hpbGQpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZExhYmVsKGNoaWxkLCBwb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChfaXNGdW5jdGlvbihjaGlsZCkpIHtcbiAgICAgICAgY2hpbGQgPSBUd2Vlbi5kZWxheWVkQ2FsbCgwLCBjaGlsZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcyAhPT0gY2hpbGQgPyBfYWRkVG9UaW1lbGluZSh0aGlzLCBjaGlsZCwgcG9zaXRpb24pIDogdGhpczsgLy9kb24ndCBhbGxvdyBhIHRpbWVsaW5lIHRvIGJlIGFkZGVkIHRvIGl0c2VsZiBhcyBhIGNoaWxkIVxuICB9O1xuXG4gIF9wcm90bzIuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbiBnZXRDaGlsZHJlbihuZXN0ZWQsIHR3ZWVucywgdGltZWxpbmVzLCBpZ25vcmVCZWZvcmVUaW1lKSB7XG4gICAgaWYgKG5lc3RlZCA9PT0gdm9pZCAwKSB7XG4gICAgICBuZXN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0d2VlbnMgPT09IHZvaWQgMCkge1xuICAgICAgdHdlZW5zID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGltZWxpbmVzID09PSB2b2lkIDApIHtcbiAgICAgIHRpbWVsaW5lcyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGlnbm9yZUJlZm9yZVRpbWUgPT09IHZvaWQgMCkge1xuICAgICAgaWdub3JlQmVmb3JlVGltZSA9IC1fYmlnTnVtO1xuICAgIH1cblxuICAgIHZhciBhID0gW10sXG4gICAgICAgIGNoaWxkID0gdGhpcy5fZmlyc3Q7XG5cbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC5fc3RhcnQgPj0gaWdub3JlQmVmb3JlVGltZSkge1xuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUd2Vlbikge1xuICAgICAgICAgIHR3ZWVucyAmJiBhLnB1c2goY2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpbWVsaW5lcyAmJiBhLnB1c2goY2hpbGQpO1xuICAgICAgICAgIG5lc3RlZCAmJiBhLnB1c2guYXBwbHkoYSwgY2hpbGQuZ2V0Q2hpbGRyZW4odHJ1ZSwgdHdlZW5zLCB0aW1lbGluZXMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cblxuICAgIHJldHVybiBhO1xuICB9O1xuXG4gIF9wcm90bzIuZ2V0QnlJZCA9IGZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICB2YXIgYW5pbWF0aW9ucyA9IHRoaXMuZ2V0Q2hpbGRyZW4oMSwgMSwgMSksXG4gICAgICAgIGkgPSBhbmltYXRpb25zLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmIChhbmltYXRpb25zW2ldLnZhcnMuaWQgPT09IGlkKSB7XG4gICAgICAgIHJldHVybiBhbmltYXRpb25zW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfcHJvdG8yLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShjaGlsZCkge1xuICAgIGlmIChfaXNTdHJpbmcoY2hpbGQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZW1vdmVMYWJlbChjaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKF9pc0Z1bmN0aW9uKGNoaWxkKSkge1xuICAgICAgcmV0dXJuIHRoaXMua2lsbFR3ZWVuc09mKGNoaWxkKTtcbiAgICB9XG5cbiAgICBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0odGhpcywgY2hpbGQpO1xuXG4gICAgaWYgKGNoaWxkID09PSB0aGlzLl9yZWNlbnQpIHtcbiAgICAgIHRoaXMuX3JlY2VudCA9IHRoaXMuX2xhc3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIF91bmNhY2hlKHRoaXMpO1xuICB9O1xuXG4gIF9wcm90bzIudG90YWxUaW1lID0gZnVuY3Rpb24gdG90YWxUaW1lKF90b3RhbFRpbWUyLCBzdXBwcmVzc0V2ZW50cykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RUaW1lO1xuICAgIH1cblxuICAgIHRoaXMuX2ZvcmNpbmcgPSAxO1xuXG4gICAgaWYgKCF0aGlzLl9kcCAmJiB0aGlzLl90cykge1xuICAgICAgLy9zcGVjaWFsIGNhc2UgZm9yIHRoZSBnbG9iYWwgdGltZWxpbmUgKG9yIGFueSBvdGhlciB0aGF0IGhhcyBubyBwYXJlbnQgb3IgZGV0YWNoZWQgcGFyZW50KS5cbiAgICAgIHRoaXMuX3N0YXJ0ID0gX3JvdW5kUHJlY2lzZShfdGlja2VyLnRpbWUgLSAodGhpcy5fdHMgPiAwID8gX3RvdGFsVGltZTIgLyB0aGlzLl90cyA6ICh0aGlzLnRvdGFsRHVyYXRpb24oKSAtIF90b3RhbFRpbWUyKSAvIC10aGlzLl90cykpO1xuICAgIH1cblxuICAgIF9BbmltYXRpb24ucHJvdG90eXBlLnRvdGFsVGltZS5jYWxsKHRoaXMsIF90b3RhbFRpbWUyLCBzdXBwcmVzc0V2ZW50cyk7XG5cbiAgICB0aGlzLl9mb3JjaW5nID0gMDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLmFkZExhYmVsID0gZnVuY3Rpb24gYWRkTGFiZWwobGFiZWwsIHBvc2l0aW9uKSB7XG4gICAgdGhpcy5sYWJlbHNbbGFiZWxdID0gX3BhcnNlUG9zaXRpb24odGhpcywgcG9zaXRpb24pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIucmVtb3ZlTGFiZWwgPSBmdW5jdGlvbiByZW1vdmVMYWJlbChsYWJlbCkge1xuICAgIGRlbGV0ZSB0aGlzLmxhYmVsc1tsYWJlbF07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5hZGRQYXVzZSA9IGZ1bmN0aW9uIGFkZFBhdXNlKHBvc2l0aW9uLCBjYWxsYmFjaywgcGFyYW1zKSB7XG4gICAgdmFyIHQgPSBUd2Vlbi5kZWxheWVkQ2FsbCgwLCBjYWxsYmFjayB8fCBfZW1wdHlGdW5jLCBwYXJhbXMpO1xuICAgIHQuZGF0YSA9IFwiaXNQYXVzZVwiO1xuICAgIHRoaXMuX2hhc1BhdXNlID0gMTtcbiAgICByZXR1cm4gX2FkZFRvVGltZWxpbmUodGhpcywgdCwgX3BhcnNlUG9zaXRpb24odGhpcywgcG9zaXRpb24pKTtcbiAgfTtcblxuICBfcHJvdG8yLnJlbW92ZVBhdXNlID0gZnVuY3Rpb24gcmVtb3ZlUGF1c2UocG9zaXRpb24pIHtcbiAgICB2YXIgY2hpbGQgPSB0aGlzLl9maXJzdDtcbiAgICBwb3NpdGlvbiA9IF9wYXJzZVBvc2l0aW9uKHRoaXMsIHBvc2l0aW9uKTtcblxuICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkLl9zdGFydCA9PT0gcG9zaXRpb24gJiYgY2hpbGQuZGF0YSA9PT0gXCJpc1BhdXNlXCIpIHtcbiAgICAgICAgX3JlbW92ZUZyb21QYXJlbnQoY2hpbGQpO1xuICAgICAgfVxuXG4gICAgICBjaGlsZCA9IGNoaWxkLl9uZXh0O1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8yLmtpbGxUd2VlbnNPZiA9IGZ1bmN0aW9uIGtpbGxUd2VlbnNPZih0YXJnZXRzLCBwcm9wcywgb25seUFjdGl2ZSkge1xuICAgIHZhciB0d2VlbnMgPSB0aGlzLmdldFR3ZWVuc09mKHRhcmdldHMsIG9ubHlBY3RpdmUpLFxuICAgICAgICBpID0gdHdlZW5zLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuICE9PSB0d2VlbnNbaV0gJiYgdHdlZW5zW2ldLmtpbGwodGFyZ2V0cywgcHJvcHMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90bzIuZ2V0VHdlZW5zT2YgPSBmdW5jdGlvbiBnZXRUd2VlbnNPZih0YXJnZXRzLCBvbmx5QWN0aXZlKSB7XG4gICAgdmFyIGEgPSBbXSxcbiAgICAgICAgcGFyc2VkVGFyZ2V0cyA9IHRvQXJyYXkodGFyZ2V0cyksXG4gICAgICAgIGNoaWxkID0gdGhpcy5fZmlyc3QsXG4gICAgICAgIGlzR2xvYmFsVGltZSA9IF9pc051bWJlcihvbmx5QWN0aXZlKSxcbiAgICAgICAgLy8gYSBudW1iZXIgaXMgaW50ZXJwcmV0ZWQgYXMgYSBnbG9iYWwgdGltZS4gSWYgdGhlIGFuaW1hdGlvbiBzcGFuc1xuICAgIGNoaWxkcmVuO1xuXG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUd2Vlbikge1xuICAgICAgICBpZiAoX2FycmF5Q29udGFpbnNBbnkoY2hpbGQuX3RhcmdldHMsIHBhcnNlZFRhcmdldHMpICYmIChpc0dsb2JhbFRpbWUgPyAoIV9vdmVyd3JpdGluZ1R3ZWVuIHx8IGNoaWxkLl9pbml0dGVkICYmIGNoaWxkLl90cykgJiYgY2hpbGQuZ2xvYmFsVGltZSgwKSA8PSBvbmx5QWN0aXZlICYmIGNoaWxkLmdsb2JhbFRpbWUoY2hpbGQudG90YWxEdXJhdGlvbigpKSA+IG9ubHlBY3RpdmUgOiAhb25seUFjdGl2ZSB8fCBjaGlsZC5pc0FjdGl2ZSgpKSkge1xuICAgICAgICAgIC8vIG5vdGU6IGlmIHRoaXMgaXMgZm9yIG92ZXJ3cml0aW5nLCBpdCBzaG91bGQgb25seSBiZSBmb3IgdHdlZW5zIHRoYXQgYXJlbid0IHBhdXNlZCBhbmQgYXJlIGluaXR0ZWQuXG4gICAgICAgICAgYS5wdXNoKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgoY2hpbGRyZW4gPSBjaGlsZC5nZXRUd2VlbnNPZihwYXJzZWRUYXJnZXRzLCBvbmx5QWN0aXZlKSkubGVuZ3RoKSB7XG4gICAgICAgIGEucHVzaC5hcHBseShhLCBjaGlsZHJlbik7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGE7XG4gIH0gLy8gcG90ZW50aWFsIGZ1dHVyZSBmZWF0dXJlIC0gdGFyZ2V0cygpIG9uIHRpbWVsaW5lc1xuICAvLyB0YXJnZXRzKCkge1xuICAvLyBcdGxldCByZXN1bHQgPSBbXTtcbiAgLy8gXHR0aGlzLmdldENoaWxkcmVuKHRydWUsIHRydWUsIGZhbHNlKS5mb3JFYWNoKHQgPT4gcmVzdWx0LnB1c2goLi4udC50YXJnZXRzKCkpKTtcbiAgLy8gXHRyZXR1cm4gcmVzdWx0LmZpbHRlcigodiwgaSkgPT4gcmVzdWx0LmluZGV4T2YodikgPT09IGkpO1xuICAvLyB9XG4gIDtcblxuICBfcHJvdG8yLnR3ZWVuVG8gPSBmdW5jdGlvbiB0d2VlblRvKHBvc2l0aW9uLCB2YXJzKSB7XG4gICAgdmFycyA9IHZhcnMgfHwge307XG5cbiAgICB2YXIgdGwgPSB0aGlzLFxuICAgICAgICBlbmRUaW1lID0gX3BhcnNlUG9zaXRpb24odGwsIHBvc2l0aW9uKSxcbiAgICAgICAgX3ZhcnMgPSB2YXJzLFxuICAgICAgICBzdGFydEF0ID0gX3ZhcnMuc3RhcnRBdCxcbiAgICAgICAgX29uU3RhcnQgPSBfdmFycy5vblN0YXJ0LFxuICAgICAgICBvblN0YXJ0UGFyYW1zID0gX3ZhcnMub25TdGFydFBhcmFtcyxcbiAgICAgICAgaW1tZWRpYXRlUmVuZGVyID0gX3ZhcnMuaW1tZWRpYXRlUmVuZGVyLFxuICAgICAgICBpbml0dGVkLFxuICAgICAgICB0d2VlbiA9IFR3ZWVuLnRvKHRsLCBfc2V0RGVmYXVsdHMoe1xuICAgICAgZWFzZTogdmFycy5lYXNlIHx8IFwibm9uZVwiLFxuICAgICAgbGF6eTogZmFsc2UsXG4gICAgICBpbW1lZGlhdGVSZW5kZXI6IGZhbHNlLFxuICAgICAgdGltZTogZW5kVGltZSxcbiAgICAgIG92ZXJ3cml0ZTogXCJhdXRvXCIsXG4gICAgICBkdXJhdGlvbjogdmFycy5kdXJhdGlvbiB8fCBNYXRoLmFicygoZW5kVGltZSAtIChzdGFydEF0ICYmIFwidGltZVwiIGluIHN0YXJ0QXQgPyBzdGFydEF0LnRpbWUgOiB0bC5fdGltZSkpIC8gdGwudGltZVNjYWxlKCkpIHx8IF90aW55TnVtLFxuICAgICAgb25TdGFydDogZnVuY3Rpb24gb25TdGFydCgpIHtcbiAgICAgICAgdGwucGF1c2UoKTtcblxuICAgICAgICBpZiAoIWluaXR0ZWQpIHtcbiAgICAgICAgICB2YXIgZHVyYXRpb24gPSB2YXJzLmR1cmF0aW9uIHx8IE1hdGguYWJzKChlbmRUaW1lIC0gKHN0YXJ0QXQgJiYgXCJ0aW1lXCIgaW4gc3RhcnRBdCA/IHN0YXJ0QXQudGltZSA6IHRsLl90aW1lKSkgLyB0bC50aW1lU2NhbGUoKSk7XG4gICAgICAgICAgdHdlZW4uX2R1ciAhPT0gZHVyYXRpb24gJiYgX3NldER1cmF0aW9uKHR3ZWVuLCBkdXJhdGlvbiwgMCwgMSkucmVuZGVyKHR3ZWVuLl90aW1lLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBpbml0dGVkID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9vblN0YXJ0ICYmIF9vblN0YXJ0LmFwcGx5KHR3ZWVuLCBvblN0YXJ0UGFyYW1zIHx8IFtdKTsgLy9pbiBjYXNlIHRoZSB1c2VyIGhhZCBhbiBvblN0YXJ0IGluIHRoZSB2YXJzIC0gd2UgZG9uJ3Qgd2FudCB0byBvdmVyd3JpdGUgaXQuXG4gICAgICB9XG4gICAgfSwgdmFycykpO1xuXG4gICAgcmV0dXJuIGltbWVkaWF0ZVJlbmRlciA/IHR3ZWVuLnJlbmRlcigwKSA6IHR3ZWVuO1xuICB9O1xuXG4gIF9wcm90bzIudHdlZW5Gcm9tVG8gPSBmdW5jdGlvbiB0d2VlbkZyb21Ubyhmcm9tUG9zaXRpb24sIHRvUG9zaXRpb24sIHZhcnMpIHtcbiAgICByZXR1cm4gdGhpcy50d2VlblRvKHRvUG9zaXRpb24sIF9zZXREZWZhdWx0cyh7XG4gICAgICBzdGFydEF0OiB7XG4gICAgICAgIHRpbWU6IF9wYXJzZVBvc2l0aW9uKHRoaXMsIGZyb21Qb3NpdGlvbilcbiAgICAgIH1cbiAgICB9LCB2YXJzKSk7XG4gIH07XG5cbiAgX3Byb3RvMi5yZWNlbnQgPSBmdW5jdGlvbiByZWNlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY2VudDtcbiAgfTtcblxuICBfcHJvdG8yLm5leHRMYWJlbCA9IGZ1bmN0aW9uIG5leHRMYWJlbChhZnRlclRpbWUpIHtcbiAgICBpZiAoYWZ0ZXJUaW1lID09PSB2b2lkIDApIHtcbiAgICAgIGFmdGVyVGltZSA9IHRoaXMuX3RpbWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9nZXRMYWJlbEluRGlyZWN0aW9uKHRoaXMsIF9wYXJzZVBvc2l0aW9uKHRoaXMsIGFmdGVyVGltZSkpO1xuICB9O1xuXG4gIF9wcm90bzIucHJldmlvdXNMYWJlbCA9IGZ1bmN0aW9uIHByZXZpb3VzTGFiZWwoYmVmb3JlVGltZSkge1xuICAgIGlmIChiZWZvcmVUaW1lID09PSB2b2lkIDApIHtcbiAgICAgIGJlZm9yZVRpbWUgPSB0aGlzLl90aW1lO1xuICAgIH1cblxuICAgIHJldHVybiBfZ2V0TGFiZWxJbkRpcmVjdGlvbih0aGlzLCBfcGFyc2VQb3NpdGlvbih0aGlzLCBiZWZvcmVUaW1lKSwgMSk7XG4gIH07XG5cbiAgX3Byb3RvMi5jdXJyZW50TGFiZWwgPSBmdW5jdGlvbiBjdXJyZW50TGFiZWwodmFsdWUpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IHRoaXMuc2Vlayh2YWx1ZSwgdHJ1ZSkgOiB0aGlzLnByZXZpb3VzTGFiZWwodGhpcy5fdGltZSArIF90aW55TnVtKTtcbiAgfTtcblxuICBfcHJvdG8yLnNoaWZ0Q2hpbGRyZW4gPSBmdW5jdGlvbiBzaGlmdENoaWxkcmVuKGFtb3VudCwgYWRqdXN0TGFiZWxzLCBpZ25vcmVCZWZvcmVUaW1lKSB7XG4gICAgaWYgKGlnbm9yZUJlZm9yZVRpbWUgPT09IHZvaWQgMCkge1xuICAgICAgaWdub3JlQmVmb3JlVGltZSA9IDA7XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkID0gdGhpcy5fZmlyc3QsXG4gICAgICAgIGxhYmVscyA9IHRoaXMubGFiZWxzLFxuICAgICAgICBwO1xuXG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQuX3N0YXJ0ID49IGlnbm9yZUJlZm9yZVRpbWUpIHtcbiAgICAgICAgY2hpbGQuX3N0YXJ0ICs9IGFtb3VudDtcbiAgICAgICAgY2hpbGQuX2VuZCArPSBhbW91bnQ7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gY2hpbGQuX25leHQ7XG4gICAgfVxuXG4gICAgaWYgKGFkanVzdExhYmVscykge1xuICAgICAgZm9yIChwIGluIGxhYmVscykge1xuICAgICAgICBpZiAobGFiZWxzW3BdID49IGlnbm9yZUJlZm9yZVRpbWUpIHtcbiAgICAgICAgICBsYWJlbHNbcF0gKz0gYW1vdW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF91bmNhY2hlKHRoaXMpO1xuICB9O1xuXG4gIF9wcm90bzIuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uIGludmFsaWRhdGUoc29mdCkge1xuICAgIHZhciBjaGlsZCA9IHRoaXMuX2ZpcnN0O1xuICAgIHRoaXMuX2xvY2sgPSAwO1xuXG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBjaGlsZC5pbnZhbGlkYXRlKHNvZnQpO1xuICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICB9XG5cbiAgICByZXR1cm4gX0FuaW1hdGlvbi5wcm90b3R5cGUuaW52YWxpZGF0ZS5jYWxsKHRoaXMsIHNvZnQpO1xuICB9O1xuXG4gIF9wcm90bzIuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcihpbmNsdWRlTGFiZWxzKSB7XG4gICAgaWYgKGluY2x1ZGVMYWJlbHMgPT09IHZvaWQgMCkge1xuICAgICAgaW5jbHVkZUxhYmVscyA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGNoaWxkID0gdGhpcy5fZmlyc3QsXG4gICAgICAgIG5leHQ7XG5cbiAgICB3aGlsZSAoY2hpbGQpIHtcbiAgICAgIG5leHQgPSBjaGlsZC5fbmV4dDtcbiAgICAgIHRoaXMucmVtb3ZlKGNoaWxkKTtcbiAgICAgIGNoaWxkID0gbmV4dDtcbiAgICB9XG5cbiAgICB0aGlzLl9kcCAmJiAodGhpcy5fdGltZSA9IHRoaXMuX3RUaW1lID0gdGhpcy5fcFRpbWUgPSAwKTtcbiAgICBpbmNsdWRlTGFiZWxzICYmICh0aGlzLmxhYmVscyA9IHt9KTtcbiAgICByZXR1cm4gX3VuY2FjaGUodGhpcyk7XG4gIH07XG5cbiAgX3Byb3RvMi50b3RhbER1cmF0aW9uID0gZnVuY3Rpb24gdG90YWxEdXJhdGlvbih2YWx1ZSkge1xuICAgIHZhciBtYXggPSAwLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgY2hpbGQgPSBzZWxmLl9sYXN0LFxuICAgICAgICBwcmV2U3RhcnQgPSBfYmlnTnVtLFxuICAgICAgICBwcmV2LFxuICAgICAgICBzdGFydCxcbiAgICAgICAgcGFyZW50O1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBzZWxmLnRpbWVTY2FsZSgoc2VsZi5fcmVwZWF0IDwgMCA/IHNlbGYuZHVyYXRpb24oKSA6IHNlbGYudG90YWxEdXJhdGlvbigpKSAvIChzZWxmLnJldmVyc2VkKCkgPyAtdmFsdWUgOiB2YWx1ZSkpO1xuICAgIH1cblxuICAgIGlmIChzZWxmLl9kaXJ0eSkge1xuICAgICAgcGFyZW50ID0gc2VsZi5wYXJlbnQ7XG5cbiAgICAgIHdoaWxlIChjaGlsZCkge1xuICAgICAgICBwcmV2ID0gY2hpbGQuX3ByZXY7IC8vcmVjb3JkIGl0IGhlcmUgaW4gY2FzZSB0aGUgdHdlZW4gY2hhbmdlcyBwb3NpdGlvbiBpbiB0aGUgc2VxdWVuY2UuLi5cblxuICAgICAgICBjaGlsZC5fZGlydHkgJiYgY2hpbGQudG90YWxEdXJhdGlvbigpOyAvL2NvdWxkIGNoYW5nZSB0aGUgdHdlZW4uX3N0YXJ0VGltZSwgc28gbWFrZSBzdXJlIHRoZSBhbmltYXRpb24ncyBjYWNoZSBpcyBjbGVhbiBiZWZvcmUgYW5hbHl6aW5nIGl0LlxuXG4gICAgICAgIHN0YXJ0ID0gY2hpbGQuX3N0YXJ0O1xuXG4gICAgICAgIGlmIChzdGFydCA+IHByZXZTdGFydCAmJiBzZWxmLl9zb3J0ICYmIGNoaWxkLl90cyAmJiAhc2VsZi5fbG9jaykge1xuICAgICAgICAgIC8vaW4gY2FzZSBvbmUgb2YgdGhlIHR3ZWVucyBzaGlmdGVkIG91dCBvZiBvcmRlciwgaXQgbmVlZHMgdG8gYmUgcmUtaW5zZXJ0ZWQgaW50byB0aGUgY29ycmVjdCBwb3NpdGlvbiBpbiB0aGUgc2VxdWVuY2VcbiAgICAgICAgICBzZWxmLl9sb2NrID0gMTsgLy9wcmV2ZW50IGVuZGxlc3MgcmVjdXJzaXZlIGNhbGxzIC0gdGhlcmUgYXJlIG1ldGhvZHMgdGhhdCBnZXQgdHJpZ2dlcmVkIHRoYXQgY2hlY2sgZHVyYXRpb24vdG90YWxEdXJhdGlvbiB3aGVuIHdlIGFkZCgpLlxuXG4gICAgICAgICAgX2FkZFRvVGltZWxpbmUoc2VsZiwgY2hpbGQsIHN0YXJ0IC0gY2hpbGQuX2RlbGF5LCAxKS5fbG9jayA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJldlN0YXJ0ID0gc3RhcnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhcnQgPCAwICYmIGNoaWxkLl90cykge1xuICAgICAgICAgIC8vY2hpbGRyZW4gYXJlbid0IGFsbG93ZWQgdG8gaGF2ZSBuZWdhdGl2ZSBzdGFydFRpbWVzIHVubGVzcyBzbW9vdGhDaGlsZFRpbWluZyBpcyB0cnVlLCBzbyBhZGp1c3QgaGVyZSBpZiBvbmUgaXMgZm91bmQuXG4gICAgICAgICAgbWF4IC09IHN0YXJ0O1xuXG4gICAgICAgICAgaWYgKCFwYXJlbnQgJiYgIXNlbGYuX2RwIHx8IHBhcmVudCAmJiBwYXJlbnQuc21vb3RoQ2hpbGRUaW1pbmcpIHtcbiAgICAgICAgICAgIHNlbGYuX3N0YXJ0ICs9IHN0YXJ0IC8gc2VsZi5fdHM7XG4gICAgICAgICAgICBzZWxmLl90aW1lIC09IHN0YXJ0O1xuICAgICAgICAgICAgc2VsZi5fdFRpbWUgLT0gc3RhcnQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VsZi5zaGlmdENoaWxkcmVuKC1zdGFydCwgZmFsc2UsIC0xZTk5OSk7XG4gICAgICAgICAgcHJldlN0YXJ0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoaWxkLl9lbmQgPiBtYXggJiYgY2hpbGQuX3RzICYmIChtYXggPSBjaGlsZC5fZW5kKTtcbiAgICAgICAgY2hpbGQgPSBwcmV2O1xuICAgICAgfVxuXG4gICAgICBfc2V0RHVyYXRpb24oc2VsZiwgc2VsZiA9PT0gX2dsb2JhbFRpbWVsaW5lICYmIHNlbGYuX3RpbWUgPiBtYXggPyBzZWxmLl90aW1lIDogbWF4LCAxLCAxKTtcblxuICAgICAgc2VsZi5fZGlydHkgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmLl90RHVyO1xuICB9O1xuXG4gIFRpbWVsaW5lLnVwZGF0ZVJvb3QgPSBmdW5jdGlvbiB1cGRhdGVSb290KHRpbWUpIHtcbiAgICBpZiAoX2dsb2JhbFRpbWVsaW5lLl90cykge1xuICAgICAgX2xhenlTYWZlUmVuZGVyKF9nbG9iYWxUaW1lbGluZSwgX3BhcmVudFRvQ2hpbGRUb3RhbFRpbWUodGltZSwgX2dsb2JhbFRpbWVsaW5lKSk7XG5cbiAgICAgIF9sYXN0UmVuZGVyZWRGcmFtZSA9IF90aWNrZXIuZnJhbWU7XG4gICAgfVxuXG4gICAgaWYgKF90aWNrZXIuZnJhbWUgPj0gX25leHRHQ0ZyYW1lKSB7XG4gICAgICBfbmV4dEdDRnJhbWUgKz0gX2NvbmZpZy5hdXRvU2xlZXAgfHwgMTIwO1xuICAgICAgdmFyIGNoaWxkID0gX2dsb2JhbFRpbWVsaW5lLl9maXJzdDtcbiAgICAgIGlmICghY2hpbGQgfHwgIWNoaWxkLl90cykgaWYgKF9jb25maWcuYXV0b1NsZWVwICYmIF90aWNrZXIuX2xpc3RlbmVycy5sZW5ndGggPCAyKSB7XG4gICAgICAgIHdoaWxlIChjaGlsZCAmJiAhY2hpbGQuX3RzKSB7XG4gICAgICAgICAgY2hpbGQgPSBjaGlsZC5fbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNoaWxkIHx8IF90aWNrZXIuc2xlZXAoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFRpbWVsaW5lO1xufShBbmltYXRpb24pO1xuXG5fc2V0RGVmYXVsdHMoVGltZWxpbmUucHJvdG90eXBlLCB7XG4gIF9sb2NrOiAwLFxuICBfaGFzUGF1c2U6IDAsXG4gIF9mb3JjaW5nOiAwXG59KTtcblxudmFyIF9hZGRDb21wbGV4U3RyaW5nUHJvcFR3ZWVuID0gZnVuY3Rpb24gX2FkZENvbXBsZXhTdHJpbmdQcm9wVHdlZW4odGFyZ2V0LCBwcm9wLCBzdGFydCwgZW5kLCBzZXR0ZXIsIHN0cmluZ0ZpbHRlciwgZnVuY1BhcmFtKSB7XG4gIC8vbm90ZTogd2UgY2FsbCBfYWRkQ29tcGxleFN0cmluZ1Byb3BUd2Vlbi5jYWxsKHR3ZWVuSW5zdGFuY2UuLi4pIHRvIGVuc3VyZSB0aGF0IGl0J3Mgc2NvcGVkIHByb3Blcmx5LiBXZSBtYXkgY2FsbCBpdCBmcm9tIHdpdGhpbiBhIHBsdWdpbiB0b28sIHRodXMgXCJ0aGlzXCIgd291bGQgcmVmZXIgdG8gdGhlIHBsdWdpbi5cbiAgdmFyIHB0ID0gbmV3IFByb3BUd2Vlbih0aGlzLl9wdCwgdGFyZ2V0LCBwcm9wLCAwLCAxLCBfcmVuZGVyQ29tcGxleFN0cmluZywgbnVsbCwgc2V0dGVyKSxcbiAgICAgIGluZGV4ID0gMCxcbiAgICAgIG1hdGNoSW5kZXggPSAwLFxuICAgICAgcmVzdWx0LFxuICAgICAgc3RhcnROdW1zLFxuICAgICAgY29sb3IsXG4gICAgICBlbmROdW0sXG4gICAgICBjaHVuayxcbiAgICAgIHN0YXJ0TnVtLFxuICAgICAgaGFzUmFuZG9tLFxuICAgICAgYTtcbiAgcHQuYiA9IHN0YXJ0O1xuICBwdC5lID0gZW5kO1xuICBzdGFydCArPSBcIlwiOyAvL2Vuc3VyZSB2YWx1ZXMgYXJlIHN0cmluZ3NcblxuICBlbmQgKz0gXCJcIjtcblxuICBpZiAoaGFzUmFuZG9tID0gfmVuZC5pbmRleE9mKFwicmFuZG9tKFwiKSkge1xuICAgIGVuZCA9IF9yZXBsYWNlUmFuZG9tKGVuZCk7XG4gIH1cblxuICBpZiAoc3RyaW5nRmlsdGVyKSB7XG4gICAgYSA9IFtzdGFydCwgZW5kXTtcbiAgICBzdHJpbmdGaWx0ZXIoYSwgdGFyZ2V0LCBwcm9wKTsgLy9wYXNzIGFuIGFycmF5IHdpdGggdGhlIHN0YXJ0aW5nIGFuZCBlbmRpbmcgdmFsdWVzIGFuZCBsZXQgdGhlIGZpbHRlciBkbyB3aGF0ZXZlciBpdCBuZWVkcyB0byB0aGUgdmFsdWVzLlxuXG4gICAgc3RhcnQgPSBhWzBdO1xuICAgIGVuZCA9IGFbMV07XG4gIH1cblxuICBzdGFydE51bXMgPSBzdGFydC5tYXRjaChfY29tcGxleFN0cmluZ051bUV4cCkgfHwgW107XG5cbiAgd2hpbGUgKHJlc3VsdCA9IF9jb21wbGV4U3RyaW5nTnVtRXhwLmV4ZWMoZW5kKSkge1xuICAgIGVuZE51bSA9IHJlc3VsdFswXTtcbiAgICBjaHVuayA9IGVuZC5zdWJzdHJpbmcoaW5kZXgsIHJlc3VsdC5pbmRleCk7XG5cbiAgICBpZiAoY29sb3IpIHtcbiAgICAgIGNvbG9yID0gKGNvbG9yICsgMSkgJSA1O1xuICAgIH0gZWxzZSBpZiAoY2h1bmsuc3Vic3RyKC01KSA9PT0gXCJyZ2JhKFwiKSB7XG4gICAgICBjb2xvciA9IDE7XG4gICAgfVxuXG4gICAgaWYgKGVuZE51bSAhPT0gc3RhcnROdW1zW21hdGNoSW5kZXgrK10pIHtcbiAgICAgIHN0YXJ0TnVtID0gcGFyc2VGbG9hdChzdGFydE51bXNbbWF0Y2hJbmRleCAtIDFdKSB8fCAwOyAvL3RoZXNlIG5lc3RlZCBQcm9wVHdlZW5zIGFyZSBoYW5kbGVkIGluIGEgc3BlY2lhbCB3YXkgLSB3ZSdsbCBuZXZlciBhY3R1YWxseSBjYWxsIGEgcmVuZGVyIG9yIHNldHRlciBtZXRob2Qgb24gdGhlbS4gV2UnbGwganVzdCBsb29wIHRocm91Z2ggdGhlbSBpbiB0aGUgcGFyZW50IGNvbXBsZXggc3RyaW5nIFByb3BUd2VlbidzIHJlbmRlciBtZXRob2QuXG5cbiAgICAgIHB0Ll9wdCA9IHtcbiAgICAgICAgX25leHQ6IHB0Ll9wdCxcbiAgICAgICAgcDogY2h1bmsgfHwgbWF0Y2hJbmRleCA9PT0gMSA/IGNodW5rIDogXCIsXCIsXG4gICAgICAgIC8vbm90ZTogU1ZHIHNwZWMgYWxsb3dzIG9taXNzaW9uIG9mIGNvbW1hL3NwYWNlIHdoZW4gYSBuZWdhdGl2ZSBzaWduIGlzIHdlZGdlZCBiZXR3ZWVuIHR3byBudW1iZXJzLCBsaWtlIDIuNS01LjMgaW5zdGVhZCBvZiAyLjUsLTUuMyBidXQgd2hlbiB0d2VlbmluZywgdGhlIG5lZ2F0aXZlIHZhbHVlIG1heSBzd2l0Y2ggdG8gcG9zaXRpdmUsIHNvIHdlIGluc2VydCB0aGUgY29tbWEganVzdCBpbiBjYXNlLlxuICAgICAgICBzOiBzdGFydE51bSxcbiAgICAgICAgYzogZW5kTnVtLmNoYXJBdCgxKSA9PT0gXCI9XCIgPyBfcGFyc2VSZWxhdGl2ZShzdGFydE51bSwgZW5kTnVtKSAtIHN0YXJ0TnVtIDogcGFyc2VGbG9hdChlbmROdW0pIC0gc3RhcnROdW0sXG4gICAgICAgIG06IGNvbG9yICYmIGNvbG9yIDwgNCA/IE1hdGgucm91bmQgOiAwXG4gICAgICB9O1xuICAgICAgaW5kZXggPSBfY29tcGxleFN0cmluZ051bUV4cC5sYXN0SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgcHQuYyA9IGluZGV4IDwgZW5kLmxlbmd0aCA/IGVuZC5zdWJzdHJpbmcoaW5kZXgsIGVuZC5sZW5ndGgpIDogXCJcIjsgLy93ZSB1c2UgdGhlIFwiY1wiIG9mIHRoZSBQcm9wVHdlZW4gdG8gc3RvcmUgdGhlIGZpbmFsIHBhcnQgb2YgdGhlIHN0cmluZyAoYWZ0ZXIgdGhlIGxhc3QgbnVtYmVyKVxuXG4gIHB0LmZwID0gZnVuY1BhcmFtO1xuXG4gIGlmIChfcmVsRXhwLnRlc3QoZW5kKSB8fCBoYXNSYW5kb20pIHtcbiAgICBwdC5lID0gMDsgLy9pZiB0aGUgZW5kIHN0cmluZyBjb250YWlucyByZWxhdGl2ZSB2YWx1ZXMgb3IgZHluYW1pYyByYW5kb20oLi4uKSB2YWx1ZXMsIGRlbGV0ZSB0aGUgZW5kIGl0IHNvIHRoYXQgb24gdGhlIGZpbmFsIHJlbmRlciB3ZSBkb24ndCBhY3R1YWxseSBzZXQgaXQgdG8gdGhlIHN0cmluZyB3aXRoICs9IG9yIC09IGNoYXJhY3RlcnMgKGZvcmNlcyBpdCB0byB1c2UgdGhlIGNhbGN1bGF0ZWQgdmFsdWUpLlxuICB9XG5cbiAgdGhpcy5fcHQgPSBwdDsgLy9zdGFydCB0aGUgbGlua2VkIGxpc3Qgd2l0aCB0aGlzIG5ldyBQcm9wVHdlZW4uIFJlbWVtYmVyLCB3ZSBjYWxsIF9hZGRDb21wbGV4U3RyaW5nUHJvcFR3ZWVuLmNhbGwodHdlZW5JbnN0YW5jZS4uLikgdG8gZW5zdXJlIHRoYXQgaXQncyBzY29wZWQgcHJvcGVybHkuIFdlIG1heSBjYWxsIGl0IGZyb20gd2l0aGluIGEgcGx1Z2luIHRvbywgdGh1cyBcInRoaXNcIiB3b3VsZCByZWZlciB0byB0aGUgcGx1Z2luLlxuXG4gIHJldHVybiBwdDtcbn0sXG4gICAgX2FkZFByb3BUd2VlbiA9IGZ1bmN0aW9uIF9hZGRQcm9wVHdlZW4odGFyZ2V0LCBwcm9wLCBzdGFydCwgZW5kLCBpbmRleCwgdGFyZ2V0cywgbW9kaWZpZXIsIHN0cmluZ0ZpbHRlciwgZnVuY1BhcmFtLCBvcHRpb25hbCkge1xuICBfaXNGdW5jdGlvbihlbmQpICYmIChlbmQgPSBlbmQoaW5kZXggfHwgMCwgdGFyZ2V0LCB0YXJnZXRzKSk7XG4gIHZhciBjdXJyZW50VmFsdWUgPSB0YXJnZXRbcHJvcF0sXG4gICAgICBwYXJzZWRTdGFydCA9IHN0YXJ0ICE9PSBcImdldFwiID8gc3RhcnQgOiAhX2lzRnVuY3Rpb24oY3VycmVudFZhbHVlKSA/IGN1cnJlbnRWYWx1ZSA6IGZ1bmNQYXJhbSA/IHRhcmdldFtwcm9wLmluZGV4T2YoXCJzZXRcIikgfHwgIV9pc0Z1bmN0aW9uKHRhcmdldFtcImdldFwiICsgcHJvcC5zdWJzdHIoMyldKSA/IHByb3AgOiBcImdldFwiICsgcHJvcC5zdWJzdHIoMyldKGZ1bmNQYXJhbSkgOiB0YXJnZXRbcHJvcF0oKSxcbiAgICAgIHNldHRlciA9ICFfaXNGdW5jdGlvbihjdXJyZW50VmFsdWUpID8gX3NldHRlclBsYWluIDogZnVuY1BhcmFtID8gX3NldHRlckZ1bmNXaXRoUGFyYW0gOiBfc2V0dGVyRnVuYyxcbiAgICAgIHB0O1xuXG4gIGlmIChfaXNTdHJpbmcoZW5kKSkge1xuICAgIGlmICh+ZW5kLmluZGV4T2YoXCJyYW5kb20oXCIpKSB7XG4gICAgICBlbmQgPSBfcmVwbGFjZVJhbmRvbShlbmQpO1xuICAgIH1cblxuICAgIGlmIChlbmQuY2hhckF0KDEpID09PSBcIj1cIikge1xuICAgICAgcHQgPSBfcGFyc2VSZWxhdGl2ZShwYXJzZWRTdGFydCwgZW5kKSArIChnZXRVbml0KHBhcnNlZFN0YXJ0KSB8fCAwKTtcblxuICAgICAgaWYgKHB0IHx8IHB0ID09PSAwKSB7XG4gICAgICAgIC8vIHRvIGF2b2lkIGlzTmFOLCBsaWtlIGlmIHNvbWVvbmUgcGFzc2VzIGluIGEgdmFsdWUgbGlrZSBcIiE9IHdoYXRldmVyXCJcbiAgICAgICAgZW5kID0gcHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKCFvcHRpb25hbCB8fCBwYXJzZWRTdGFydCAhPT0gZW5kIHx8IF9mb3JjZUFsbFByb3BUd2VlbnMpIHtcbiAgICBpZiAoIWlzTmFOKHBhcnNlZFN0YXJ0ICogZW5kKSAmJiBlbmQgIT09IFwiXCIpIHtcbiAgICAgIC8vIGZ1biBmYWN0OiBhbnkgbnVtYmVyIG11bHRpcGxpZWQgYnkgXCJcIiBpcyBldmFsdWF0ZWQgYXMgdGhlIG51bWJlciAwIVxuICAgICAgcHQgPSBuZXcgUHJvcFR3ZWVuKHRoaXMuX3B0LCB0YXJnZXQsIHByb3AsICtwYXJzZWRTdGFydCB8fCAwLCBlbmQgLSAocGFyc2VkU3RhcnQgfHwgMCksIHR5cGVvZiBjdXJyZW50VmFsdWUgPT09IFwiYm9vbGVhblwiID8gX3JlbmRlckJvb2xlYW4gOiBfcmVuZGVyUGxhaW4sIDAsIHNldHRlcik7XG4gICAgICBmdW5jUGFyYW0gJiYgKHB0LmZwID0gZnVuY1BhcmFtKTtcbiAgICAgIG1vZGlmaWVyICYmIHB0Lm1vZGlmaWVyKG1vZGlmaWVyLCB0aGlzLCB0YXJnZXQpO1xuICAgICAgcmV0dXJuIHRoaXMuX3B0ID0gcHQ7XG4gICAgfVxuXG4gICAgIWN1cnJlbnRWYWx1ZSAmJiAhKHByb3AgaW4gdGFyZ2V0KSAmJiBfbWlzc2luZ1BsdWdpbihwcm9wLCBlbmQpO1xuICAgIHJldHVybiBfYWRkQ29tcGxleFN0cmluZ1Byb3BUd2Vlbi5jYWxsKHRoaXMsIHRhcmdldCwgcHJvcCwgcGFyc2VkU3RhcnQsIGVuZCwgc2V0dGVyLCBzdHJpbmdGaWx0ZXIgfHwgX2NvbmZpZy5zdHJpbmdGaWx0ZXIsIGZ1bmNQYXJhbSk7XG4gIH1cbn0sXG4gICAgLy9jcmVhdGVzIGEgY29weSBvZiB0aGUgdmFycyBvYmplY3QgYW5kIHByb2Nlc3NlcyBhbnkgZnVuY3Rpb24tYmFzZWQgdmFsdWVzIChwdXR0aW5nIHRoZSByZXN1bHRpbmcgdmFsdWVzIGRpcmVjdGx5IGludG8gdGhlIGNvcHkpIGFzIHdlbGwgYXMgc3RyaW5ncyB3aXRoIFwicmFuZG9tKClcIiBpbiB0aGVtLiBJdCBkb2VzIE5PVCBwcm9jZXNzIHJlbGF0aXZlIHZhbHVlcy5cbl9wcm9jZXNzVmFycyA9IGZ1bmN0aW9uIF9wcm9jZXNzVmFycyh2YXJzLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzLCB0d2Vlbikge1xuICBfaXNGdW5jdGlvbih2YXJzKSAmJiAodmFycyA9IF9wYXJzZUZ1bmNPclN0cmluZyh2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykpO1xuXG4gIGlmICghX2lzT2JqZWN0KHZhcnMpIHx8IHZhcnMuc3R5bGUgJiYgdmFycy5ub2RlVHlwZSB8fCBfaXNBcnJheSh2YXJzKSB8fCBfaXNUeXBlZEFycmF5KHZhcnMpKSB7XG4gICAgcmV0dXJuIF9pc1N0cmluZyh2YXJzKSA/IF9wYXJzZUZ1bmNPclN0cmluZyh2YXJzLCB0d2VlbiwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0cykgOiB2YXJzO1xuICB9XG5cbiAgdmFyIGNvcHkgPSB7fSxcbiAgICAgIHA7XG5cbiAgZm9yIChwIGluIHZhcnMpIHtcbiAgICBjb3B5W3BdID0gX3BhcnNlRnVuY09yU3RyaW5nKHZhcnNbcF0sIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKTtcbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufSxcbiAgICBfY2hlY2tQbHVnaW4gPSBmdW5jdGlvbiBfY2hlY2tQbHVnaW4ocHJvcGVydHksIHZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzKSB7XG4gIHZhciBwbHVnaW4sIHB0LCBwdExvb2t1cCwgaTtcblxuICBpZiAoX3BsdWdpbnNbcHJvcGVydHldICYmIChwbHVnaW4gPSBuZXcgX3BsdWdpbnNbcHJvcGVydHldKCkpLmluaXQodGFyZ2V0LCBwbHVnaW4ucmF3VmFycyA/IHZhcnNbcHJvcGVydHldIDogX3Byb2Nlc3NWYXJzKHZhcnNbcHJvcGVydHldLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRzLCB0d2VlbiksIHR3ZWVuLCBpbmRleCwgdGFyZ2V0cykgIT09IGZhbHNlKSB7XG4gICAgdHdlZW4uX3B0ID0gcHQgPSBuZXcgUHJvcFR3ZWVuKHR3ZWVuLl9wdCwgdGFyZ2V0LCBwcm9wZXJ0eSwgMCwgMSwgcGx1Z2luLnJlbmRlciwgcGx1Z2luLCAwLCBwbHVnaW4ucHJpb3JpdHkpO1xuXG4gICAgaWYgKHR3ZWVuICE9PSBfcXVpY2tUd2Vlbikge1xuICAgICAgcHRMb29rdXAgPSB0d2Vlbi5fcHRMb29rdXBbdHdlZW4uX3RhcmdldHMuaW5kZXhPZih0YXJnZXQpXTsgLy9ub3RlOiB3ZSBjYW4ndCB1c2UgdHdlZW4uX3B0TG9va3VwW2luZGV4XSBiZWNhdXNlIGZvciBzdGFnZ2VyZWQgdHdlZW5zLCB0aGUgaW5kZXggZnJvbSB0aGUgZnVsbFRhcmdldHMgYXJyYXkgd29uJ3QgbWF0Y2ggd2hhdCBpdCBpcyBpbiBlYWNoIGluZGl2aWR1YWwgdHdlZW4gdGhhdCBzcGF3bnMgZnJvbSB0aGUgc3RhZ2dlci5cblxuICAgICAgaSA9IHBsdWdpbi5fcHJvcHMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHB0TG9va3VwW3BsdWdpbi5fcHJvcHNbaV1dID0gcHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBsdWdpbjtcbn0sXG4gICAgX292ZXJ3cml0aW5nVHdlZW4sXG4gICAgLy9zdG9yZSBhIHJlZmVyZW5jZSB0ZW1wb3JhcmlseSBzbyB3ZSBjYW4gYXZvaWQgb3ZlcndyaXRpbmcgaXRzZWxmLlxuX2ZvcmNlQWxsUHJvcFR3ZWVucyxcbiAgICBfaW5pdFR3ZWVuID0gZnVuY3Rpb24gX2luaXRUd2Vlbih0d2VlbiwgdGltZSwgdFRpbWUpIHtcbiAgdmFyIHZhcnMgPSB0d2Vlbi52YXJzLFxuICAgICAgZWFzZSA9IHZhcnMuZWFzZSxcbiAgICAgIHN0YXJ0QXQgPSB2YXJzLnN0YXJ0QXQsXG4gICAgICBpbW1lZGlhdGVSZW5kZXIgPSB2YXJzLmltbWVkaWF0ZVJlbmRlcixcbiAgICAgIGxhenkgPSB2YXJzLmxhenksXG4gICAgICBvblVwZGF0ZSA9IHZhcnMub25VcGRhdGUsXG4gICAgICBvblVwZGF0ZVBhcmFtcyA9IHZhcnMub25VcGRhdGVQYXJhbXMsXG4gICAgICBjYWxsYmFja1Njb3BlID0gdmFycy5jYWxsYmFja1Njb3BlLFxuICAgICAgcnVuQmFja3dhcmRzID0gdmFycy5ydW5CYWNrd2FyZHMsXG4gICAgICB5b3lvRWFzZSA9IHZhcnMueW95b0Vhc2UsXG4gICAgICBrZXlmcmFtZXMgPSB2YXJzLmtleWZyYW1lcyxcbiAgICAgIGF1dG9SZXZlcnQgPSB2YXJzLmF1dG9SZXZlcnQsXG4gICAgICBkdXIgPSB0d2Vlbi5fZHVyLFxuICAgICAgcHJldlN0YXJ0QXQgPSB0d2Vlbi5fc3RhcnRBdCxcbiAgICAgIHRhcmdldHMgPSB0d2Vlbi5fdGFyZ2V0cyxcbiAgICAgIHBhcmVudCA9IHR3ZWVuLnBhcmVudCxcbiAgICAgIGZ1bGxUYXJnZXRzID0gcGFyZW50ICYmIHBhcmVudC5kYXRhID09PSBcIm5lc3RlZFwiID8gcGFyZW50LnZhcnMudGFyZ2V0cyA6IHRhcmdldHMsXG4gICAgICBhdXRvT3ZlcndyaXRlID0gdHdlZW4uX292ZXJ3cml0ZSA9PT0gXCJhdXRvXCIgJiYgIV9zdXBwcmVzc092ZXJ3cml0ZXMsXG4gICAgICB0bCA9IHR3ZWVuLnRpbWVsaW5lLFxuICAgICAgY2xlYW5WYXJzLFxuICAgICAgaSxcbiAgICAgIHAsXG4gICAgICBwdCxcbiAgICAgIHRhcmdldCxcbiAgICAgIGhhc1ByaW9yaXR5LFxuICAgICAgZ3NEYXRhLFxuICAgICAgaGFybmVzcyxcbiAgICAgIHBsdWdpbixcbiAgICAgIHB0TG9va3VwLFxuICAgICAgaW5kZXgsXG4gICAgICBoYXJuZXNzVmFycyxcbiAgICAgIG92ZXJ3cml0dGVuO1xuICB0bCAmJiAoIWtleWZyYW1lcyB8fCAhZWFzZSkgJiYgKGVhc2UgPSBcIm5vbmVcIik7XG4gIHR3ZWVuLl9lYXNlID0gX3BhcnNlRWFzZShlYXNlLCBfZGVmYXVsdHMuZWFzZSk7XG4gIHR3ZWVuLl95RWFzZSA9IHlveW9FYXNlID8gX2ludmVydEVhc2UoX3BhcnNlRWFzZSh5b3lvRWFzZSA9PT0gdHJ1ZSA/IGVhc2UgOiB5b3lvRWFzZSwgX2RlZmF1bHRzLmVhc2UpKSA6IDA7XG5cbiAgaWYgKHlveW9FYXNlICYmIHR3ZWVuLl95b3lvICYmICF0d2Vlbi5fcmVwZWF0KSB7XG4gICAgLy90aGVyZSBtdXN0IGhhdmUgYmVlbiBhIHBhcmVudCB0aW1lbGluZSB3aXRoIHlveW86dHJ1ZSB0aGF0IGlzIGN1cnJlbnRseSBpbiBpdHMgeW95byBwaGFzZSwgc28gZmxpcCB0aGUgZWFzZXMuXG4gICAgeW95b0Vhc2UgPSB0d2Vlbi5feUVhc2U7XG4gICAgdHdlZW4uX3lFYXNlID0gdHdlZW4uX2Vhc2U7XG4gICAgdHdlZW4uX2Vhc2UgPSB5b3lvRWFzZTtcbiAgfVxuXG4gIHR3ZWVuLl9mcm9tID0gIXRsICYmICEhdmFycy5ydW5CYWNrd2FyZHM7IC8vbmVzdGVkIHRpbWVsaW5lcyBzaG91bGQgbmV2ZXIgcnVuIGJhY2t3YXJkcyAtIHRoZSBiYWNrd2FyZHMtbmVzcyBpcyBpbiB0aGUgY2hpbGQgdHdlZW5zLlxuXG4gIGlmICghdGwgfHwga2V5ZnJhbWVzICYmICF2YXJzLnN0YWdnZXIpIHtcbiAgICAvL2lmIHRoZXJlJ3MgYW4gaW50ZXJuYWwgdGltZWxpbmUsIHNraXAgYWxsIHRoZSBwYXJzaW5nIGJlY2F1c2Ugd2UgcGFzc2VkIHRoYXQgdGFzayBkb3duIHRoZSBjaGFpbi5cbiAgICBoYXJuZXNzID0gdGFyZ2V0c1swXSA/IF9nZXRDYWNoZSh0YXJnZXRzWzBdKS5oYXJuZXNzIDogMDtcbiAgICBoYXJuZXNzVmFycyA9IGhhcm5lc3MgJiYgdmFyc1toYXJuZXNzLnByb3BdOyAvL3NvbWVvbmUgbWF5IG5lZWQgdG8gc3BlY2lmeSBDU1Mtc3BlY2lmaWMgdmFsdWVzIEFORCBub24tQ1NTIHZhbHVlcywgbGlrZSBpZiB0aGUgZWxlbWVudCBoYXMgYW4gXCJ4XCIgcHJvcGVydHkgcGx1cyBpdCdzIGEgc3RhbmRhcmQgRE9NIGVsZW1lbnQuIFdlIGFsbG93IHBlb3BsZSB0byBkaXN0aW5ndWlzaCBieSB3cmFwcGluZyBwbHVnaW4tc3BlY2lmaWMgc3R1ZmYgaW4gYSBjc3M6e30gb2JqZWN0IGZvciBleGFtcGxlLlxuXG4gICAgY2xlYW5WYXJzID0gX2NvcHlFeGNsdWRpbmcodmFycywgX3Jlc2VydmVkUHJvcHMpO1xuXG4gICAgaWYgKHByZXZTdGFydEF0KSB7XG4gICAgICBwcmV2U3RhcnRBdC5felRpbWUgPCAwICYmIHByZXZTdGFydEF0LnByb2dyZXNzKDEpOyAvLyBpbiBjYXNlIGl0J3MgYSBsYXp5IHN0YXJ0QXQgdGhhdCBoYXNuJ3QgcmVuZGVyZWQgeWV0LlxuXG4gICAgICB0aW1lIDwgMCAmJiBydW5CYWNrd2FyZHMgJiYgaW1tZWRpYXRlUmVuZGVyICYmICFhdXRvUmV2ZXJ0ID8gcHJldlN0YXJ0QXQucmVuZGVyKC0xLCB0cnVlKSA6IHByZXZTdGFydEF0LnJldmVydChydW5CYWNrd2FyZHMgJiYgZHVyID8gX3JldmVydENvbmZpZ05vS2lsbCA6IF9zdGFydEF0UmV2ZXJ0Q29uZmlnKTsgLy8gaWYgaXQncyBhIFwic3RhcnRBdFwiIChub3QgXCJmcm9tKClcIiBvciBydW5CYWNrd2FyZHM6IHRydWUpLCB3ZSBvbmx5IG5lZWQgdG8gZG8gYSBzaGFsbG93IHJldmVydCAoa2VlcCB0cmFuc2Zvcm1zIGNhY2hlZCBpbiBDU1NQbHVnaW4pXG4gICAgICAvLyBkb24ndCBqdXN0IF9yZW1vdmVGcm9tUGFyZW50KHByZXZTdGFydEF0LnJlbmRlcigtMSwgdHJ1ZSkpIGJlY2F1c2UgdGhhdCdsbCBsZWF2ZSBpbmxpbmUgc3R5bGVzLiBXZSdyZSBjcmVhdGluZyBhIG5ldyBfc3RhcnRBdCBmb3IgXCJzdGFydEF0XCIgdHdlZW5zIHRoYXQgcmUtY2FwdHVyZSB0aGluZ3MgdG8gZW5zdXJlIHRoYXQgaWYgdGhlIHByZS10d2VlbiB2YWx1ZXMgY2hhbmdlZCBzaW5jZSB0aGUgdHdlZW4gd2FzIGNyZWF0ZWQsIHRoZXkncmUgcmVjb3JkZWQuXG5cbiAgICAgIHByZXZTdGFydEF0Ll9sYXp5ID0gMDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnRBdCkge1xuICAgICAgX3JlbW92ZUZyb21QYXJlbnQodHdlZW4uX3N0YXJ0QXQgPSBUd2Vlbi5zZXQodGFyZ2V0cywgX3NldERlZmF1bHRzKHtcbiAgICAgICAgZGF0YTogXCJpc1N0YXJ0XCIsXG4gICAgICAgIG92ZXJ3cml0ZTogZmFsc2UsXG4gICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICBpbW1lZGlhdGVSZW5kZXI6IHRydWUsXG4gICAgICAgIGxhenk6ICFwcmV2U3RhcnRBdCAmJiBfaXNOb3RGYWxzZShsYXp5KSxcbiAgICAgICAgc3RhcnRBdDogbnVsbCxcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIG9uVXBkYXRlOiBvblVwZGF0ZSxcbiAgICAgICAgb25VcGRhdGVQYXJhbXM6IG9uVXBkYXRlUGFyYW1zLFxuICAgICAgICBjYWxsYmFja1Njb3BlOiBjYWxsYmFja1Njb3BlLFxuICAgICAgICBzdGFnZ2VyOiAwXG4gICAgICB9LCBzdGFydEF0KSkpOyAvL2NvcHkgdGhlIHByb3BlcnRpZXMvdmFsdWVzIGludG8gYSBuZXcgb2JqZWN0IHRvIGF2b2lkIGNvbGxpc2lvbnMsIGxpa2UgdmFyIHRvID0ge3g6MH0sIGZyb20gPSB7eDo1MDB9OyB0aW1lbGluZS5mcm9tVG8oZSwgZnJvbSwgdG8pLmZyb21UbyhlLCB0bywgZnJvbSk7XG5cblxuICAgICAgdHdlZW4uX3N0YXJ0QXQuX2RwID0gMDsgLy8gZG9uJ3QgYWxsb3cgaXQgdG8gZ2V0IHB1dCBiYWNrIGludG8gcm9vdCB0aW1lbGluZSEgTGlrZSB3aGVuIHJldmVydCgpIGlzIGNhbGxlZCBhbmQgdG90YWxUaW1lKCkgZ2V0cyBzZXQuXG5cbiAgICAgIHR3ZWVuLl9zdGFydEF0Ll9zYXQgPSB0d2VlbjsgLy8gdXNlZCBpbiBnbG9iYWxUaW1lKCkuIF9zYXQgc3RhbmRzIGZvciBfc3RhcnRBdFR3ZWVuXG5cbiAgICAgIHRpbWUgPCAwICYmIChfcmV2ZXJ0aW5nIHx8ICFpbW1lZGlhdGVSZW5kZXIgJiYgIWF1dG9SZXZlcnQpICYmIHR3ZWVuLl9zdGFydEF0LnJldmVydChfcmV2ZXJ0Q29uZmlnTm9LaWxsKTsgLy8gcmFyZSBlZGdlIGNhc2UsIGxpa2UgaWYgYSByZW5kZXIgaXMgZm9yY2VkIGluIHRoZSBuZWdhdGl2ZSBkaXJlY3Rpb24gb2YgYSBub24taW5pdHRlZCB0d2Vlbi5cblxuICAgICAgaWYgKGltbWVkaWF0ZVJlbmRlcikge1xuICAgICAgICBpZiAoZHVyICYmIHRpbWUgPD0gMCAmJiB0VGltZSA8PSAwKSB7XG4gICAgICAgICAgLy8gY2hlY2sgdFRpbWUgaGVyZSBiZWNhdXNlIGluIHRoZSBjYXNlIG9mIGEgeW95byB0d2VlbiB3aG9zZSBwbGF5aGVhZCBnZXRzIHB1c2hlZCB0byB0aGUgZW5kIGxpa2UgdHdlZW4ucHJvZ3Jlc3MoMSksIHdlIHNob3VsZCBhbGxvdyBpdCB0aHJvdWdoIHNvIHRoYXQgdGhlIG9uQ29tcGxldGUgZ2V0cyBmaXJlZCBwcm9wZXJseS5cbiAgICAgICAgICB0aW1lICYmICh0d2Vlbi5felRpbWUgPSB0aW1lKTtcbiAgICAgICAgICByZXR1cm47IC8vd2Ugc2tpcCBpbml0aWFsaXphdGlvbiBoZXJlIHNvIHRoYXQgb3ZlcndyaXRpbmcgZG9lc24ndCBvY2N1ciB1bnRpbCB0aGUgdHdlZW4gYWN0dWFsbHkgYmVnaW5zLiBPdGhlcndpc2UsIGlmIHlvdSBjcmVhdGUgc2V2ZXJhbCBpbW1lZGlhdGVSZW5kZXI6dHJ1ZSB0d2VlbnMgb2YgdGhlIHNhbWUgdGFyZ2V0L3Byb3BlcnRpZXMgdG8gZHJvcCBpbnRvIGEgVGltZWxpbmUsIHRoZSBsYXN0IG9uZSBjcmVhdGVkIHdvdWxkIG92ZXJ3cml0ZSB0aGUgZmlyc3Qgb25lcyBiZWNhdXNlIHRoZXkgZGlkbid0IGdldCBwbGFjZWQgaW50byB0aGUgdGltZWxpbmUgeWV0IGJlZm9yZSB0aGUgZmlyc3QgcmVuZGVyIG9jY3VycyBhbmQga2lja3MgaW4gb3ZlcndyaXRpbmcuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJ1bkJhY2t3YXJkcyAmJiBkdXIpIHtcbiAgICAgIC8vZnJvbSgpIHR3ZWVucyBtdXN0IGJlIGhhbmRsZWQgdW5pcXVlbHk6IHRoZWlyIGJlZ2lubmluZyB2YWx1ZXMgbXVzdCBiZSByZW5kZXJlZCBidXQgd2UgZG9uJ3Qgd2FudCBvdmVyd3JpdGluZyB0byBvY2N1ciB5ZXQgKHdoZW4gdGltZSBpcyBzdGlsbCAwKS4gV2FpdCB1bnRpbCB0aGUgdHdlZW4gYWN0dWFsbHkgYmVnaW5zIGJlZm9yZSBkb2luZyBhbGwgdGhlIHJvdXRpbmVzIGxpa2Ugb3ZlcndyaXRpbmcuIEF0IHRoYXQgdGltZSwgd2Ugc2hvdWxkIHJlbmRlciBhdCB0aGUgRU5EIG9mIHRoZSB0d2VlbiB0byBlbnN1cmUgdGhhdCB0aGluZ3MgaW5pdGlhbGl6ZSBjb3JyZWN0bHkgKHJlbWVtYmVyLCBmcm9tKCkgdHdlZW5zIGdvIGJhY2t3YXJkcylcbiAgICAgIGlmICghcHJldlN0YXJ0QXQpIHtcbiAgICAgICAgdGltZSAmJiAoaW1tZWRpYXRlUmVuZGVyID0gZmFsc2UpOyAvL2luIHJhcmUgY2FzZXMgKGxpa2UgaWYgYSBmcm9tKCkgdHdlZW4gcnVucyBhbmQgdGhlbiBpcyBpbnZhbGlkYXRlKCktZWQpLCBpbW1lZGlhdGVSZW5kZXIgY291bGQgYmUgdHJ1ZSBidXQgdGhlIGluaXRpYWwgZm9yY2VkLXJlbmRlciBnZXRzIHNraXBwZWQsIHNvIHRoZXJlJ3Mgbm8gbmVlZCB0byBmb3JjZSB0aGUgcmVuZGVyIGluIHRoaXMgY29udGV4dCB3aGVuIHRoZSBfdGltZSBpcyBncmVhdGVyIHRoYW4gMFxuXG4gICAgICAgIHAgPSBfc2V0RGVmYXVsdHMoe1xuICAgICAgICAgIG92ZXJ3cml0ZTogZmFsc2UsXG4gICAgICAgICAgZGF0YTogXCJpc0Zyb21TdGFydFwiLFxuICAgICAgICAgIC8vd2UgdGFnIHRoZSB0d2VlbiB3aXRoIGFzIFwiaXNGcm9tU3RhcnRcIiBzbyB0aGF0IGlmIFtpbnNpZGUgYSBwbHVnaW5dIHdlIG5lZWQgdG8gb25seSBkbyBzb21ldGhpbmcgYXQgdGhlIHZlcnkgRU5EIG9mIGEgdHdlZW4sIHdlIGhhdmUgYSB3YXkgb2YgaWRlbnRpZnlpbmcgdGhpcyB0d2VlbiBhcyBtZXJlbHkgdGhlIG9uZSB0aGF0J3Mgc2V0dGluZyB0aGUgYmVnaW5uaW5nIHZhbHVlcyBmb3IgYSBcImZyb20oKVwiIHR3ZWVuLiBGb3IgZXhhbXBsZSwgY2xlYXJQcm9wcyBpbiBDU1NQbHVnaW4gc2hvdWxkIG9ubHkgZ2V0IGFwcGxpZWQgYXQgdGhlIHZlcnkgRU5EIG9mIGEgdHdlZW4gYW5kIHdpdGhvdXQgdGhpcyB0YWcsIGZyb20oLi4ue2hlaWdodDoxMDAsIGNsZWFyUHJvcHM6XCJoZWlnaHRcIiwgZGVsYXk6MX0pIHdvdWxkIHdpcGUgdGhlIGhlaWdodCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSB0d2VlbiBhbmQgYWZ0ZXIgMSBzZWNvbmQsIGl0J2Qga2ljayBiYWNrIGluLlxuICAgICAgICAgIGxhenk6IGltbWVkaWF0ZVJlbmRlciAmJiAhcHJldlN0YXJ0QXQgJiYgX2lzTm90RmFsc2UobGF6eSksXG4gICAgICAgICAgaW1tZWRpYXRlUmVuZGVyOiBpbW1lZGlhdGVSZW5kZXIsXG4gICAgICAgICAgLy96ZXJvLWR1cmF0aW9uIHR3ZWVucyByZW5kZXIgaW1tZWRpYXRlbHkgYnkgZGVmYXVsdCwgYnV0IGlmIHdlJ3JlIG5vdCBzcGVjaWZpY2FsbHkgaW5zdHJ1Y3RlZCB0byByZW5kZXIgdGhpcyB0d2VlbiBpbW1lZGlhdGVseSwgd2Ugc2hvdWxkIHNraXAgdGhpcyBhbmQgbWVyZWx5IF9pbml0KCkgdG8gcmVjb3JkIHRoZSBzdGFydGluZyB2YWx1ZXMgKHJlbmRlcmluZyB0aGVtIGltbWVkaWF0ZWx5IHdvdWxkIHB1c2ggdGhlbSB0byBjb21wbGV0aW9uIHdoaWNoIGlzIHdhc3RlZnVsIGluIHRoYXQgY2FzZSAtIHdlJ2QgaGF2ZSB0byByZW5kZXIoLTEpIGltbWVkaWF0ZWx5IGFmdGVyKVxuICAgICAgICAgIHN0YWdnZXI6IDAsXG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQgLy9lbnN1cmVzIHRoYXQgbmVzdGVkIHR3ZWVucyB0aGF0IGhhZCBhIHN0YWdnZXIgYXJlIGhhbmRsZWQgcHJvcGVybHksIGxpa2UgZ3NhcC5mcm9tKFwiLmNsYXNzXCIsIHt5OmdzYXAudXRpbHMud3JhcChbLTEwMCwxMDBdKX0pXG5cbiAgICAgICAgfSwgY2xlYW5WYXJzKTtcbiAgICAgICAgaGFybmVzc1ZhcnMgJiYgKHBbaGFybmVzcy5wcm9wXSA9IGhhcm5lc3NWYXJzKTsgLy8gaW4gY2FzZSBzb21lb25lIGRvZXMgc29tZXRoaW5nIGxpa2UgLmZyb20oLi4uLCB7Y3NzOnt9fSlcblxuICAgICAgICBfcmVtb3ZlRnJvbVBhcmVudCh0d2Vlbi5fc3RhcnRBdCA9IFR3ZWVuLnNldCh0YXJnZXRzLCBwKSk7XG5cbiAgICAgICAgdHdlZW4uX3N0YXJ0QXQuX2RwID0gMDsgLy8gZG9uJ3QgYWxsb3cgaXQgdG8gZ2V0IHB1dCBiYWNrIGludG8gcm9vdCB0aW1lbGluZSFcblxuICAgICAgICB0d2Vlbi5fc3RhcnRBdC5fc2F0ID0gdHdlZW47IC8vIHVzZWQgaW4gZ2xvYmFsVGltZSgpXG5cbiAgICAgICAgdGltZSA8IDAgJiYgKF9yZXZlcnRpbmcgPyB0d2Vlbi5fc3RhcnRBdC5yZXZlcnQoX3JldmVydENvbmZpZ05vS2lsbCkgOiB0d2Vlbi5fc3RhcnRBdC5yZW5kZXIoLTEsIHRydWUpKTtcbiAgICAgICAgdHdlZW4uX3pUaW1lID0gdGltZTtcblxuICAgICAgICBpZiAoIWltbWVkaWF0ZVJlbmRlcikge1xuICAgICAgICAgIF9pbml0VHdlZW4odHdlZW4uX3N0YXJ0QXQsIF90aW55TnVtLCBfdGlueU51bSk7IC8vZW5zdXJlcyB0aGF0IHRoZSBpbml0aWFsIHZhbHVlcyBhcmUgcmVjb3JkZWRcblxuICAgICAgICB9IGVsc2UgaWYgKCF0aW1lKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHdlZW4uX3B0ID0gdHdlZW4uX3B0Q2FjaGUgPSAwO1xuICAgIGxhenkgPSBkdXIgJiYgX2lzTm90RmFsc2UobGF6eSkgfHwgbGF6eSAmJiAhZHVyO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICBnc0RhdGEgPSB0YXJnZXQuX2dzYXAgfHwgX2hhcm5lc3ModGFyZ2V0cylbaV0uX2dzYXA7XG4gICAgICB0d2Vlbi5fcHRMb29rdXBbaV0gPSBwdExvb2t1cCA9IHt9O1xuICAgICAgX2xhenlMb29rdXBbZ3NEYXRhLmlkXSAmJiBfbGF6eVR3ZWVucy5sZW5ndGggJiYgX2xhenlSZW5kZXIoKTsgLy9pZiBvdGhlciB0d2VlbnMgb2YgdGhlIHNhbWUgdGFyZ2V0IGhhdmUgcmVjZW50bHkgaW5pdHRlZCBidXQgaGF2ZW4ndCByZW5kZXJlZCB5ZXQsIHdlJ3ZlIGdvdCB0byBmb3JjZSB0aGUgcmVuZGVyIHNvIHRoYXQgdGhlIHN0YXJ0aW5nIHZhbHVlcyBhcmUgY29ycmVjdCAoaW1hZ2luZSBwb3B1bGF0aW5nIGEgdGltZWxpbmUgd2l0aCBhIGJ1bmNoIG9mIHNlcXVlbnRpYWwgdHdlZW5zIGFuZCB0aGVuIGp1bXBpbmcgdG8gdGhlIGVuZClcblxuICAgICAgaW5kZXggPSBmdWxsVGFyZ2V0cyA9PT0gdGFyZ2V0cyA/IGkgOiBmdWxsVGFyZ2V0cy5pbmRleE9mKHRhcmdldCk7XG5cbiAgICAgIGlmIChoYXJuZXNzICYmIChwbHVnaW4gPSBuZXcgaGFybmVzcygpKS5pbml0KHRhcmdldCwgaGFybmVzc1ZhcnMgfHwgY2xlYW5WYXJzLCB0d2VlbiwgaW5kZXgsIGZ1bGxUYXJnZXRzKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgdHdlZW4uX3B0ID0gcHQgPSBuZXcgUHJvcFR3ZWVuKHR3ZWVuLl9wdCwgdGFyZ2V0LCBwbHVnaW4ubmFtZSwgMCwgMSwgcGx1Z2luLnJlbmRlciwgcGx1Z2luLCAwLCBwbHVnaW4ucHJpb3JpdHkpO1xuXG4gICAgICAgIHBsdWdpbi5fcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIHB0TG9va3VwW25hbWVdID0gcHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHBsdWdpbi5wcmlvcml0eSAmJiAoaGFzUHJpb3JpdHkgPSAxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFoYXJuZXNzIHx8IGhhcm5lc3NWYXJzKSB7XG4gICAgICAgIGZvciAocCBpbiBjbGVhblZhcnMpIHtcbiAgICAgICAgICBpZiAoX3BsdWdpbnNbcF0gJiYgKHBsdWdpbiA9IF9jaGVja1BsdWdpbihwLCBjbGVhblZhcnMsIHR3ZWVuLCBpbmRleCwgdGFyZ2V0LCBmdWxsVGFyZ2V0cykpKSB7XG4gICAgICAgICAgICBwbHVnaW4ucHJpb3JpdHkgJiYgKGhhc1ByaW9yaXR5ID0gMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHB0TG9va3VwW3BdID0gcHQgPSBfYWRkUHJvcFR3ZWVuLmNhbGwodHdlZW4sIHRhcmdldCwgcCwgXCJnZXRcIiwgY2xlYW5WYXJzW3BdLCBpbmRleCwgZnVsbFRhcmdldHMsIDAsIHZhcnMuc3RyaW5nRmlsdGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdHdlZW4uX29wICYmIHR3ZWVuLl9vcFtpXSAmJiB0d2Vlbi5raWxsKHRhcmdldCwgdHdlZW4uX29wW2ldKTtcblxuICAgICAgaWYgKGF1dG9PdmVyd3JpdGUgJiYgdHdlZW4uX3B0KSB7XG4gICAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuID0gdHdlZW47XG5cbiAgICAgICAgX2dsb2JhbFRpbWVsaW5lLmtpbGxUd2VlbnNPZih0YXJnZXQsIHB0TG9va3VwLCB0d2Vlbi5nbG9iYWxUaW1lKHRpbWUpKTsgLy8gbWFrZSBzdXJlIHRoZSBvdmVyd3JpdGluZyBkb2Vzbid0IG92ZXJ3cml0ZSBUSElTIHR3ZWVuISEhXG5cblxuICAgICAgICBvdmVyd3JpdHRlbiA9ICF0d2Vlbi5wYXJlbnQ7XG4gICAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuID0gMDtcbiAgICAgIH1cblxuICAgICAgdHdlZW4uX3B0ICYmIGxhenkgJiYgKF9sYXp5TG9va3VwW2dzRGF0YS5pZF0gPSAxKTtcbiAgICB9XG5cbiAgICBoYXNQcmlvcml0eSAmJiBfc29ydFByb3BUd2VlbnNCeVByaW9yaXR5KHR3ZWVuKTtcbiAgICB0d2Vlbi5fb25Jbml0ICYmIHR3ZWVuLl9vbkluaXQodHdlZW4pOyAvL3BsdWdpbnMgbGlrZSBSb3VuZFByb3BzIG11c3Qgd2FpdCB1bnRpbCBBTEwgb2YgdGhlIFByb3BUd2VlbnMgYXJlIGluc3RhbnRpYXRlZC4gSW4gdGhlIHBsdWdpbidzIGluaXQoKSBmdW5jdGlvbiwgaXQgc2V0cyB0aGUgX29uSW5pdCBvbiB0aGUgdHdlZW4gaW5zdGFuY2UuIE1heSBub3QgYmUgcHJldHR5L2ludHVpdGl2ZSwgYnV0IGl0J3MgZmFzdCBhbmQga2VlcHMgZmlsZSBzaXplIGRvd24uXG4gIH1cblxuICB0d2Vlbi5fb25VcGRhdGUgPSBvblVwZGF0ZTtcbiAgdHdlZW4uX2luaXR0ZWQgPSAoIXR3ZWVuLl9vcCB8fCB0d2Vlbi5fcHQpICYmICFvdmVyd3JpdHRlbjsgLy8gaWYgb3ZlcndyaXR0ZW5Qcm9wcyByZXN1bHRlZCBpbiB0aGUgZW50aXJlIHR3ZWVuIGJlaW5nIGtpbGxlZCwgZG8gTk9UIGZsYWcgaXQgYXMgaW5pdHRlZCBvciBlbHNlIGl0IG1heSByZW5kZXIgZm9yIG9uZSB0aWNrLlxuXG4gIGtleWZyYW1lcyAmJiB0aW1lIDw9IDAgJiYgdGwucmVuZGVyKF9iaWdOdW0sIHRydWUsIHRydWUpOyAvLyBpZiB0aGVyZSdzIGEgMCUga2V5ZnJhbWUsIGl0J2xsIHJlbmRlciBpbiB0aGUgXCJiZWZvcmVcIiBzdGF0ZSBmb3IgYW55IHN0YWdnZXJlZC9kZWxheWVkIGFuaW1hdGlvbnMgdGh1cyB3aGVuIHRoZSBmb2xsb3dpbmcgdHdlZW4gaW5pdGlhbGl6ZXMsIGl0J2xsIHVzZSB0aGUgXCJiZWZvcmVcIiBzdGF0ZSBpbnN0ZWFkIG9mIHRoZSBcImFmdGVyXCIgc3RhdGUgYXMgdGhlIGluaXRpYWwgdmFsdWVzLlxufSxcbiAgICBfdXBkYXRlUHJvcFR3ZWVucyA9IGZ1bmN0aW9uIF91cGRhdGVQcm9wVHdlZW5zKHR3ZWVuLCBwcm9wZXJ0eSwgdmFsdWUsIHN0YXJ0LCBzdGFydElzUmVsYXRpdmUsIHJhdGlvLCB0aW1lKSB7XG4gIHZhciBwdENhY2hlID0gKHR3ZWVuLl9wdCAmJiB0d2Vlbi5fcHRDYWNoZSB8fCAodHdlZW4uX3B0Q2FjaGUgPSB7fSkpW3Byb3BlcnR5XSxcbiAgICAgIHB0LFxuICAgICAgcm9vdFBULFxuICAgICAgbG9va3VwLFxuICAgICAgaTtcblxuICBpZiAoIXB0Q2FjaGUpIHtcbiAgICBwdENhY2hlID0gdHdlZW4uX3B0Q2FjaGVbcHJvcGVydHldID0gW107XG4gICAgbG9va3VwID0gdHdlZW4uX3B0TG9va3VwO1xuICAgIGkgPSB0d2Vlbi5fdGFyZ2V0cy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBwdCA9IGxvb2t1cFtpXVtwcm9wZXJ0eV07XG5cbiAgICAgIGlmIChwdCAmJiBwdC5kICYmIHB0LmQuX3B0KSB7XG4gICAgICAgIC8vIGl0J3MgYSBwbHVnaW4sIHNvIGZpbmQgdGhlIG5lc3RlZCBQcm9wVHdlZW5cbiAgICAgICAgcHQgPSBwdC5kLl9wdDtcblxuICAgICAgICB3aGlsZSAocHQgJiYgcHQucCAhPT0gcHJvcGVydHkgJiYgcHQuZnAgIT09IHByb3BlcnR5KSB7XG4gICAgICAgICAgLy8gXCJmcFwiIGlzIGZ1bmN0aW9uUGFyYW0gZm9yIHRoaW5ncyBsaWtlIHNldHRpbmcgQ1NTIHZhcmlhYmxlcyB3aGljaCByZXF1aXJlIC5zZXRQcm9wZXJ0eShcIi0tdmFyLW5hbWVcIiwgdmFsdWUpXG4gICAgICAgICAgcHQgPSBwdC5fbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXB0KSB7XG4gICAgICAgIC8vIHRoZXJlIGlzIG5vIFByb3BUd2VlbiBhc3NvY2lhdGVkIHdpdGggdGhhdCBwcm9wZXJ0eSwgc28gd2UgbXVzdCBGT1JDRSBvbmUgdG8gYmUgY3JlYXRlZCBhbmQgZGl0Y2ggb3V0IG9mIHRoaXNcbiAgICAgICAgLy8gaWYgdGhlIHR3ZWVuIGhhcyBvdGhlciBwcm9wZXJ0aWVzIHRoYXQgYWxyZWFkeSByZW5kZXJlZCBhdCBuZXcgcG9zaXRpb25zLCB3ZSdkIG5vcm1hbGx5IGhhdmUgdG8gcmV3aW5kIHRvIHB1dCB0aGVtIGJhY2sgbGlrZSB0d2Vlbi5yZW5kZXIoMCwgdHJ1ZSkgYmVmb3JlIGZvcmNpbmcgYW4gX2luaXRUd2VlbigpLCBidXQgdGhhdCBjYW4gY3JlYXRlIGFub3RoZXIgZWRnZSBjYXNlIGxpa2UgdHdlZW5pbmcgYSB0aW1lbGluZSdzIHByb2dyZXNzIHdvdWxkIHRyaWdnZXIgb25VcGRhdGVzIHRvIGZpcmUgd2hpY2ggY291bGQgbW92ZSBvdGhlciB0aGluZ3MgYXJvdW5kLiBJdCdzIGJldHRlciB0byBqdXN0IGluZm9ybSB1c2VycyB0aGF0IC5yZXNldFRvKCkgc2hvdWxkIE9OTFkgYmUgdXNlZCBmb3IgdHdlZW5zIHRoYXQgYWxyZWFkeSBoYXZlIHRoYXQgcHJvcGVydHkuIEZvciBleGFtcGxlLCB5b3UgY2FuJ3QgZ3NhcC50byguLi57IHk6IDAgfSkgYW5kIHRoZW4gdHdlZW4ucmVzdFRvKFwieFwiLCAyMDApIGZvciBleGFtcGxlLlxuICAgICAgICBfZm9yY2VBbGxQcm9wVHdlZW5zID0gMTsgLy8gb3RoZXJ3aXNlLCB3aGVuIHdlIF9hZGRQcm9wVHdlZW4oKSBhbmQgaXQgZmluZHMgbm8gY2hhbmdlIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCBlbmQgdmFsdWVzLCBpdCBza2lwcyBjcmVhdGluZyBhIFByb3BUd2VlbiAoZm9yIGVmZmljaWVuY3kuLi53aHkgdHdlZW4gd2hlbiB0aGVyZSdzIG5vIGRpZmZlcmVuY2U/KSBidXQgaW4gdGhpcyBjYXNlIHdlIE5FRUQgdGhhdCBQcm9wVHdlZW4gY3JlYXRlZCBzbyB3ZSBjYW4gZWRpdCBpdC5cblxuICAgICAgICB0d2Vlbi52YXJzW3Byb3BlcnR5XSA9IFwiKz0wXCI7XG5cbiAgICAgICAgX2luaXRUd2Vlbih0d2VlbiwgdGltZSk7XG5cbiAgICAgICAgX2ZvcmNlQWxsUHJvcFR3ZWVucyA9IDA7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuXG4gICAgICBwdENhY2hlLnB1c2gocHQpO1xuICAgIH1cbiAgfVxuXG4gIGkgPSBwdENhY2hlLmxlbmd0aDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgcm9vdFBUID0gcHRDYWNoZVtpXTtcbiAgICBwdCA9IHJvb3RQVC5fcHQgfHwgcm9vdFBUOyAvLyBjb21wbGV4IHZhbHVlcyBtYXkgaGF2ZSBuZXN0ZWQgUHJvcFR3ZWVucy4gV2Ugb25seSBhY2NvbW1vZGF0ZSB0aGUgRklSU1QgdmFsdWUuXG5cbiAgICBwdC5zID0gKHN0YXJ0IHx8IHN0YXJ0ID09PSAwKSAmJiAhc3RhcnRJc1JlbGF0aXZlID8gc3RhcnQgOiBwdC5zICsgKHN0YXJ0IHx8IDApICsgcmF0aW8gKiBwdC5jO1xuICAgIHB0LmMgPSB2YWx1ZSAtIHB0LnM7XG4gICAgcm9vdFBULmUgJiYgKHJvb3RQVC5lID0gX3JvdW5kKHZhbHVlKSArIGdldFVuaXQocm9vdFBULmUpKTsgLy8gbWFpbmx5IGZvciBDU1NQbHVnaW4gKGVuZCB2YWx1ZSlcblxuICAgIHJvb3RQVC5iICYmIChyb290UFQuYiA9IHB0LnMgKyBnZXRVbml0KHJvb3RQVC5iKSk7IC8vIChiZWdpbm5pbmcgdmFsdWUpXG4gIH1cbn0sXG4gICAgX2FkZEFsaWFzZXNUb1ZhcnMgPSBmdW5jdGlvbiBfYWRkQWxpYXNlc1RvVmFycyh0YXJnZXRzLCB2YXJzKSB7XG4gIHZhciBoYXJuZXNzID0gdGFyZ2V0c1swXSA/IF9nZXRDYWNoZSh0YXJnZXRzWzBdKS5oYXJuZXNzIDogMCxcbiAgICAgIHByb3BlcnR5QWxpYXNlcyA9IGhhcm5lc3MgJiYgaGFybmVzcy5hbGlhc2VzLFxuICAgICAgY29weSxcbiAgICAgIHAsXG4gICAgICBpLFxuICAgICAgYWxpYXNlcztcblxuICBpZiAoIXByb3BlcnR5QWxpYXNlcykge1xuICAgIHJldHVybiB2YXJzO1xuICB9XG5cbiAgY29weSA9IF9tZXJnZSh7fSwgdmFycyk7XG5cbiAgZm9yIChwIGluIHByb3BlcnR5QWxpYXNlcykge1xuICAgIGlmIChwIGluIGNvcHkpIHtcbiAgICAgIGFsaWFzZXMgPSBwcm9wZXJ0eUFsaWFzZXNbcF0uc3BsaXQoXCIsXCIpO1xuICAgICAgaSA9IGFsaWFzZXMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvcHlbYWxpYXNlc1tpXV0gPSBjb3B5W3BdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufSxcbiAgICAvLyBwYXJzZXMgbXVsdGlwbGUgZm9ybWF0cywgbGlrZSB7XCIwJVwiOiB7eDogMTAwfSwge1wiNTAlXCI6IHt4OiAtMjB9fSBhbmQgeyB4OiB7XCIwJVwiOiAxMDAsIFwiNTAlXCI6IC0yMH0gfSwgYW5kIGFuIFwiZWFzZVwiIGNhbiBiZSBzZXQgb24gYW55IG9iamVjdC4gV2UgcG9wdWxhdGUgYW4gXCJhbGxQcm9wc1wiIG9iamVjdCB3aXRoIGFuIEFycmF5IGZvciBlYWNoIHByb3BlcnR5LCBsaWtlIHt4OiBbe30sIHt9XSwgeTpbe30sIHt9XX0gd2l0aCBkYXRhIGZvciBlYWNoIHByb3BlcnR5IHR3ZWVuLiBUaGUgb2JqZWN0cyBoYXZlIGEgXCJ0XCIgKHRpbWUpLCBcInZcIiwgKHZhbHVlKSwgYW5kIFwiZVwiIChlYXNlKSBwcm9wZXJ0eS4gVGhpcyBhbGxvd3MgdXMgdG8gcGllY2UgdG9nZXRoZXIgYSB0aW1lbGluZSBsYXRlci5cbl9wYXJzZUtleWZyYW1lID0gZnVuY3Rpb24gX3BhcnNlS2V5ZnJhbWUocHJvcCwgb2JqLCBhbGxQcm9wcywgZWFzZUVhY2gpIHtcbiAgdmFyIGVhc2UgPSBvYmouZWFzZSB8fCBlYXNlRWFjaCB8fCBcInBvd2VyMS5pbk91dFwiLFxuICAgICAgcCxcbiAgICAgIGE7XG5cbiAgaWYgKF9pc0FycmF5KG9iaikpIHtcbiAgICBhID0gYWxsUHJvcHNbcHJvcF0gfHwgKGFsbFByb3BzW3Byb3BdID0gW10pOyAvLyB0ID0gdGltZSAob3V0IG9mIDEwMCksIHYgPSB2YWx1ZSwgZSA9IGVhc2VcblxuICAgIG9iai5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaSkge1xuICAgICAgcmV0dXJuIGEucHVzaCh7XG4gICAgICAgIHQ6IGkgLyAob2JqLmxlbmd0aCAtIDEpICogMTAwLFxuICAgICAgICB2OiB2YWx1ZSxcbiAgICAgICAgZTogZWFzZVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChwIGluIG9iaikge1xuICAgICAgYSA9IGFsbFByb3BzW3BdIHx8IChhbGxQcm9wc1twXSA9IFtdKTtcbiAgICAgIHAgPT09IFwiZWFzZVwiIHx8IGEucHVzaCh7XG4gICAgICAgIHQ6IHBhcnNlRmxvYXQocHJvcCksXG4gICAgICAgIHY6IG9ialtwXSxcbiAgICAgICAgZTogZWFzZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59LFxuICAgIF9wYXJzZUZ1bmNPclN0cmluZyA9IGZ1bmN0aW9uIF9wYXJzZUZ1bmNPclN0cmluZyh2YWx1ZSwgdHdlZW4sIGksIHRhcmdldCwgdGFyZ2V0cykge1xuICByZXR1cm4gX2lzRnVuY3Rpb24odmFsdWUpID8gdmFsdWUuY2FsbCh0d2VlbiwgaSwgdGFyZ2V0LCB0YXJnZXRzKSA6IF9pc1N0cmluZyh2YWx1ZSkgJiYgfnZhbHVlLmluZGV4T2YoXCJyYW5kb20oXCIpID8gX3JlcGxhY2VSYW5kb20odmFsdWUpIDogdmFsdWU7XG59LFxuICAgIF9zdGFnZ2VyVHdlZW5Qcm9wcyA9IF9jYWxsYmFja05hbWVzICsgXCJyZXBlYXQscmVwZWF0RGVsYXkseW95byxyZXBlYXRSZWZyZXNoLHlveW9FYXNlLGF1dG9SZXZlcnRcIixcbiAgICBfc3RhZ2dlclByb3BzVG9Ta2lwID0ge307XG5cbl9mb3JFYWNoTmFtZShfc3RhZ2dlclR3ZWVuUHJvcHMgKyBcIixpZCxzdGFnZ2VyLGRlbGF5LGR1cmF0aW9uLHBhdXNlZCxzY3JvbGxUcmlnZ2VyXCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBfc3RhZ2dlclByb3BzVG9Ta2lwW25hbWVdID0gMTtcbn0pO1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUV0VFTlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5cbmV4cG9ydCB2YXIgVHdlZW4gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9BbmltYXRpb24yKSB7XG4gIF9pbmhlcml0c0xvb3NlKFR3ZWVuLCBfQW5pbWF0aW9uMik7XG5cbiAgZnVuY3Rpb24gVHdlZW4odGFyZ2V0cywgdmFycywgcG9zaXRpb24sIHNraXBJbmhlcml0KSB7XG4gICAgdmFyIF90aGlzMztcblxuICAgIGlmICh0eXBlb2YgdmFycyA9PT0gXCJudW1iZXJcIikge1xuICAgICAgcG9zaXRpb24uZHVyYXRpb24gPSB2YXJzO1xuICAgICAgdmFycyA9IHBvc2l0aW9uO1xuICAgICAgcG9zaXRpb24gPSBudWxsO1xuICAgIH1cblxuICAgIF90aGlzMyA9IF9BbmltYXRpb24yLmNhbGwodGhpcywgc2tpcEluaGVyaXQgPyB2YXJzIDogX2luaGVyaXREZWZhdWx0cyh2YXJzKSkgfHwgdGhpcztcbiAgICB2YXIgX3RoaXMzJHZhcnMgPSBfdGhpczMudmFycyxcbiAgICAgICAgZHVyYXRpb24gPSBfdGhpczMkdmFycy5kdXJhdGlvbixcbiAgICAgICAgZGVsYXkgPSBfdGhpczMkdmFycy5kZWxheSxcbiAgICAgICAgaW1tZWRpYXRlUmVuZGVyID0gX3RoaXMzJHZhcnMuaW1tZWRpYXRlUmVuZGVyLFxuICAgICAgICBzdGFnZ2VyID0gX3RoaXMzJHZhcnMuc3RhZ2dlcixcbiAgICAgICAgb3ZlcndyaXRlID0gX3RoaXMzJHZhcnMub3ZlcndyaXRlLFxuICAgICAgICBrZXlmcmFtZXMgPSBfdGhpczMkdmFycy5rZXlmcmFtZXMsXG4gICAgICAgIGRlZmF1bHRzID0gX3RoaXMzJHZhcnMuZGVmYXVsdHMsXG4gICAgICAgIHNjcm9sbFRyaWdnZXIgPSBfdGhpczMkdmFycy5zY3JvbGxUcmlnZ2VyLFxuICAgICAgICB5b3lvRWFzZSA9IF90aGlzMyR2YXJzLnlveW9FYXNlLFxuICAgICAgICBwYXJlbnQgPSB2YXJzLnBhcmVudCB8fCBfZ2xvYmFsVGltZWxpbmUsXG4gICAgICAgIHBhcnNlZFRhcmdldHMgPSAoX2lzQXJyYXkodGFyZ2V0cykgfHwgX2lzVHlwZWRBcnJheSh0YXJnZXRzKSA/IF9pc051bWJlcih0YXJnZXRzWzBdKSA6IFwibGVuZ3RoXCIgaW4gdmFycykgPyBbdGFyZ2V0c10gOiB0b0FycmF5KHRhcmdldHMpLFxuICAgICAgICB0bCxcbiAgICAgICAgaSxcbiAgICAgICAgY29weSxcbiAgICAgICAgbCxcbiAgICAgICAgcCxcbiAgICAgICAgY3VyVGFyZ2V0LFxuICAgICAgICBzdGFnZ2VyRnVuYyxcbiAgICAgICAgc3RhZ2dlclZhcnNUb01lcmdlO1xuICAgIF90aGlzMy5fdGFyZ2V0cyA9IHBhcnNlZFRhcmdldHMubGVuZ3RoID8gX2hhcm5lc3MocGFyc2VkVGFyZ2V0cykgOiBfd2FybihcIkdTQVAgdGFyZ2V0IFwiICsgdGFyZ2V0cyArIFwiIG5vdCBmb3VuZC4gaHR0cHM6Ly9ncmVlbnNvY2suY29tXCIsICFfY29uZmlnLm51bGxUYXJnZXRXYXJuKSB8fCBbXTtcbiAgICBfdGhpczMuX3B0TG9va3VwID0gW107IC8vUHJvcFR3ZWVuIGxvb2t1cC4gQW4gYXJyYXkgY29udGFpbmluZyBhbiBvYmplY3QgZm9yIGVhY2ggdGFyZ2V0LCBoYXZpbmcga2V5cyBmb3IgZWFjaCB0d2VlbmluZyBwcm9wZXJ0eVxuXG4gICAgX3RoaXMzLl9vdmVyd3JpdGUgPSBvdmVyd3JpdGU7XG5cbiAgICBpZiAoa2V5ZnJhbWVzIHx8IHN0YWdnZXIgfHwgX2lzRnVuY09yU3RyaW5nKGR1cmF0aW9uKSB8fCBfaXNGdW5jT3JTdHJpbmcoZGVsYXkpKSB7XG4gICAgICB2YXJzID0gX3RoaXMzLnZhcnM7XG4gICAgICB0bCA9IF90aGlzMy50aW1lbGluZSA9IG5ldyBUaW1lbGluZSh7XG4gICAgICAgIGRhdGE6IFwibmVzdGVkXCIsXG4gICAgICAgIGRlZmF1bHRzOiBkZWZhdWx0cyB8fCB7fSxcbiAgICAgICAgdGFyZ2V0czogcGFyZW50ICYmIHBhcmVudC5kYXRhID09PSBcIm5lc3RlZFwiID8gcGFyZW50LnZhcnMudGFyZ2V0cyA6IHBhcnNlZFRhcmdldHNcbiAgICAgIH0pOyAvLyB3ZSBuZWVkIHRvIHN0b3JlIHRoZSB0YXJnZXRzIGJlY2F1c2UgZm9yIHN0YWdnZXJzIGFuZCBrZXlmcmFtZXMsIHdlIGVuZCB1cCBjcmVhdGluZyBhbiBpbmRpdmlkdWFsIHR3ZWVuIGZvciBlYWNoIGJ1dCBmdW5jdGlvbi1iYXNlZCB2YWx1ZXMgbmVlZCB0byBrbm93IHRoZSBpbmRleCBhbmQgdGhlIHdob2xlIEFycmF5IG9mIHRhcmdldHMuXG5cbiAgICAgIHRsLmtpbGwoKTtcbiAgICAgIHRsLnBhcmVudCA9IHRsLl9kcCA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKTtcbiAgICAgIHRsLl9zdGFydCA9IDA7XG5cbiAgICAgIGlmIChzdGFnZ2VyIHx8IF9pc0Z1bmNPclN0cmluZyhkdXJhdGlvbikgfHwgX2lzRnVuY09yU3RyaW5nKGRlbGF5KSkge1xuICAgICAgICBsID0gcGFyc2VkVGFyZ2V0cy5sZW5ndGg7XG4gICAgICAgIHN0YWdnZXJGdW5jID0gc3RhZ2dlciAmJiBkaXN0cmlidXRlKHN0YWdnZXIpO1xuXG4gICAgICAgIGlmIChfaXNPYmplY3Qoc3RhZ2dlcikpIHtcbiAgICAgICAgICAvL3VzZXJzIGNhbiBwYXNzIGluIGNhbGxiYWNrcyBsaWtlIG9uU3RhcnQvb25Db21wbGV0ZSBpbiB0aGUgc3RhZ2dlciBvYmplY3QuIFRoZXNlIHNob3VsZCBmaXJlIHdpdGggZWFjaCBpbmRpdmlkdWFsIHR3ZWVuLlxuICAgICAgICAgIGZvciAocCBpbiBzdGFnZ2VyKSB7XG4gICAgICAgICAgICBpZiAofl9zdGFnZ2VyVHdlZW5Qcm9wcy5pbmRleE9mKHApKSB7XG4gICAgICAgICAgICAgIHN0YWdnZXJWYXJzVG9NZXJnZSB8fCAoc3RhZ2dlclZhcnNUb01lcmdlID0ge30pO1xuICAgICAgICAgICAgICBzdGFnZ2VyVmFyc1RvTWVyZ2VbcF0gPSBzdGFnZ2VyW3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBjb3B5ID0gX2NvcHlFeGNsdWRpbmcodmFycywgX3N0YWdnZXJQcm9wc1RvU2tpcCk7XG4gICAgICAgICAgY29weS5zdGFnZ2VyID0gMDtcbiAgICAgICAgICB5b3lvRWFzZSAmJiAoY29weS55b3lvRWFzZSA9IHlveW9FYXNlKTtcbiAgICAgICAgICBzdGFnZ2VyVmFyc1RvTWVyZ2UgJiYgX21lcmdlKGNvcHksIHN0YWdnZXJWYXJzVG9NZXJnZSk7XG4gICAgICAgICAgY3VyVGFyZ2V0ID0gcGFyc2VkVGFyZ2V0c1tpXTsgLy9kb24ndCBqdXN0IGNvcHkgZHVyYXRpb24gb3IgZGVsYXkgYmVjYXVzZSBpZiB0aGV5J3JlIGEgc3RyaW5nIG9yIGZ1bmN0aW9uLCB3ZSdkIGVuZCB1cCBpbiBhbiBpbmZpbml0ZSBsb29wIGJlY2F1c2UgX2lzRnVuY09yU3RyaW5nKCkgd291bGQgZXZhbHVhdGUgYXMgdHJ1ZSBpbiB0aGUgY2hpbGQgdHdlZW5zLCBlbnRlcmluZyB0aGlzIGxvb3AsIGV0Yy4gU28gd2UgcGFyc2UgdGhlIHZhbHVlIHN0cmFpZ2h0IGZyb20gdmFycyBhbmQgZGVmYXVsdCB0byAwLlxuXG4gICAgICAgICAgY29weS5kdXJhdGlvbiA9ICtfcGFyc2VGdW5jT3JTdHJpbmcoZHVyYXRpb24sIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKSwgaSwgY3VyVGFyZ2V0LCBwYXJzZWRUYXJnZXRzKTtcbiAgICAgICAgICBjb3B5LmRlbGF5ID0gKCtfcGFyc2VGdW5jT3JTdHJpbmcoZGVsYXksIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKSwgaSwgY3VyVGFyZ2V0LCBwYXJzZWRUYXJnZXRzKSB8fCAwKSAtIF90aGlzMy5fZGVsYXk7XG5cbiAgICAgICAgICBpZiAoIXN0YWdnZXIgJiYgbCA9PT0gMSAmJiBjb3B5LmRlbGF5KSB7XG4gICAgICAgICAgICAvLyBpZiBzb21lb25lIGRvZXMgZGVsYXk6XCJyYW5kb20oMSwgNSlcIiwgcmVwZWF0Oi0xLCBmb3IgZXhhbXBsZSwgdGhlIGRlbGF5IHNob3VsZG4ndCBiZSBpbnNpZGUgdGhlIHJlcGVhdC5cbiAgICAgICAgICAgIF90aGlzMy5fZGVsYXkgPSBkZWxheSA9IGNvcHkuZGVsYXk7XG4gICAgICAgICAgICBfdGhpczMuX3N0YXJ0ICs9IGRlbGF5O1xuICAgICAgICAgICAgY29weS5kZWxheSA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGwudG8oY3VyVGFyZ2V0LCBjb3B5LCBzdGFnZ2VyRnVuYyA/IHN0YWdnZXJGdW5jKGksIGN1clRhcmdldCwgcGFyc2VkVGFyZ2V0cykgOiAwKTtcbiAgICAgICAgICB0bC5fZWFzZSA9IF9lYXNlTWFwLm5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICB0bC5kdXJhdGlvbigpID8gZHVyYXRpb24gPSBkZWxheSA9IDAgOiBfdGhpczMudGltZWxpbmUgPSAwOyAvLyBpZiB0aGUgdGltZWxpbmUncyBkdXJhdGlvbiBpcyAwLCB3ZSBkb24ndCBuZWVkIGEgdGltZWxpbmUgaW50ZXJuYWxseSFcbiAgICAgIH0gZWxzZSBpZiAoa2V5ZnJhbWVzKSB7XG4gICAgICAgIF9pbmhlcml0RGVmYXVsdHMoX3NldERlZmF1bHRzKHRsLnZhcnMuZGVmYXVsdHMsIHtcbiAgICAgICAgICBlYXNlOiBcIm5vbmVcIlxuICAgICAgICB9KSk7XG5cbiAgICAgICAgdGwuX2Vhc2UgPSBfcGFyc2VFYXNlKGtleWZyYW1lcy5lYXNlIHx8IHZhcnMuZWFzZSB8fCBcIm5vbmVcIik7XG4gICAgICAgIHZhciB0aW1lID0gMCxcbiAgICAgICAgICAgIGEsXG4gICAgICAgICAgICBrZixcbiAgICAgICAgICAgIHY7XG5cbiAgICAgICAgaWYgKF9pc0FycmF5KGtleWZyYW1lcykpIHtcbiAgICAgICAgICBrZXlmcmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoZnJhbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0bC50byhwYXJzZWRUYXJnZXRzLCBmcmFtZSwgXCI+XCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRsLmR1cmF0aW9uKCk7IC8vIHRvIGVuc3VyZSB0bC5fZHVyIGlzIGNhY2hlZCBiZWNhdXNlIHdlIHRhcCBpbnRvIGl0IGZvciBwZXJmb3JtYW5jZSBwdXJwb3NlcyBpbiB0aGUgcmVuZGVyKCkgbWV0aG9kLlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvcHkgPSB7fTtcblxuICAgICAgICAgIGZvciAocCBpbiBrZXlmcmFtZXMpIHtcbiAgICAgICAgICAgIHAgPT09IFwiZWFzZVwiIHx8IHAgPT09IFwiZWFzZUVhY2hcIiB8fCBfcGFyc2VLZXlmcmFtZShwLCBrZXlmcmFtZXNbcF0sIGNvcHksIGtleWZyYW1lcy5lYXNlRWFjaCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChwIGluIGNvcHkpIHtcbiAgICAgICAgICAgIGEgPSBjb3B5W3BdLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGEudCAtIGIudDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGltZSA9IDA7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGtmID0gYVtpXTtcbiAgICAgICAgICAgICAgdiA9IHtcbiAgICAgICAgICAgICAgICBlYXNlOiBrZi5lLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAoa2YudCAtIChpID8gYVtpIC0gMV0udCA6IDApKSAvIDEwMCAqIGR1cmF0aW9uXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHZbcF0gPSBrZi52O1xuICAgICAgICAgICAgICB0bC50byhwYXJzZWRUYXJnZXRzLCB2LCB0aW1lKTtcbiAgICAgICAgICAgICAgdGltZSArPSB2LmR1cmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRsLmR1cmF0aW9uKCkgPCBkdXJhdGlvbiAmJiB0bC50byh7fSwge1xuICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uIC0gdGwuZHVyYXRpb24oKVxuICAgICAgICAgIH0pOyAvLyBpbiBjYXNlIGtleWZyYW1lcyBkaWRuJ3QgZ28gdG8gMTAwJVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGR1cmF0aW9uIHx8IF90aGlzMy5kdXJhdGlvbihkdXJhdGlvbiA9IHRsLmR1cmF0aW9uKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfdGhpczMudGltZWxpbmUgPSAwOyAvL3NwZWVkIG9wdGltaXphdGlvbiwgZmFzdGVyIGxvb2t1cHMgKG5vIGdvaW5nIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4pXG4gICAgfVxuXG4gICAgaWYgKG92ZXJ3cml0ZSA9PT0gdHJ1ZSAmJiAhX3N1cHByZXNzT3ZlcndyaXRlcykge1xuICAgICAgX292ZXJ3cml0aW5nVHdlZW4gPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMyk7XG5cbiAgICAgIF9nbG9iYWxUaW1lbGluZS5raWxsVHdlZW5zT2YocGFyc2VkVGFyZ2V0cyk7XG5cbiAgICAgIF9vdmVyd3JpdGluZ1R3ZWVuID0gMDtcbiAgICB9XG5cbiAgICBfYWRkVG9UaW1lbGluZShwYXJlbnQsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMzKSwgcG9zaXRpb24pO1xuXG4gICAgdmFycy5yZXZlcnNlZCAmJiBfdGhpczMucmV2ZXJzZSgpO1xuICAgIHZhcnMucGF1c2VkICYmIF90aGlzMy5wYXVzZWQodHJ1ZSk7XG5cbiAgICBpZiAoaW1tZWRpYXRlUmVuZGVyIHx8ICFkdXJhdGlvbiAmJiAha2V5ZnJhbWVzICYmIF90aGlzMy5fc3RhcnQgPT09IF9yb3VuZFByZWNpc2UocGFyZW50Ll90aW1lKSAmJiBfaXNOb3RGYWxzZShpbW1lZGlhdGVSZW5kZXIpICYmIF9oYXNOb1BhdXNlZEFuY2VzdG9ycyhfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzMykpICYmIHBhcmVudC5kYXRhICE9PSBcIm5lc3RlZFwiKSB7XG4gICAgICBfdGhpczMuX3RUaW1lID0gLV90aW55TnVtOyAvL2ZvcmNlcyBhIHJlbmRlciB3aXRob3V0IGhhdmluZyB0byBzZXQgdGhlIHJlbmRlcigpIFwiZm9yY2VcIiBwYXJhbWV0ZXIgdG8gdHJ1ZSBiZWNhdXNlIHdlIHdhbnQgdG8gYWxsb3cgbGF6eWluZyBieSBkZWZhdWx0ICh1c2luZyB0aGUgXCJmb3JjZVwiIHBhcmFtZXRlciBhbHdheXMgZm9yY2VzIGFuIGltbWVkaWF0ZSBmdWxsIHJlbmRlcilcblxuICAgICAgX3RoaXMzLnJlbmRlcihNYXRoLm1heCgwLCAtZGVsYXkpIHx8IDApOyAvL2luIGNhc2UgZGVsYXkgaXMgbmVnYXRpdmVcblxuICAgIH1cblxuICAgIHNjcm9sbFRyaWdnZXIgJiYgX3Njcm9sbFRyaWdnZXIoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpczMpLCBzY3JvbGxUcmlnZ2VyKTtcbiAgICByZXR1cm4gX3RoaXMzO1xuICB9XG5cbiAgdmFyIF9wcm90bzMgPSBUd2Vlbi5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHtcbiAgICB2YXIgcHJldlRpbWUgPSB0aGlzLl90aW1lLFxuICAgICAgICB0RHVyID0gdGhpcy5fdER1cixcbiAgICAgICAgZHVyID0gdGhpcy5fZHVyLFxuICAgICAgICBpc05lZ2F0aXZlID0gdG90YWxUaW1lIDwgMCxcbiAgICAgICAgdFRpbWUgPSB0b3RhbFRpbWUgPiB0RHVyIC0gX3RpbnlOdW0gJiYgIWlzTmVnYXRpdmUgPyB0RHVyIDogdG90YWxUaW1lIDwgX3RpbnlOdW0gPyAwIDogdG90YWxUaW1lLFxuICAgICAgICB0aW1lLFxuICAgICAgICBwdCxcbiAgICAgICAgaXRlcmF0aW9uLFxuICAgICAgICBjeWNsZUR1cmF0aW9uLFxuICAgICAgICBwcmV2SXRlcmF0aW9uLFxuICAgICAgICBpc1lveW8sXG4gICAgICAgIHJhdGlvLFxuICAgICAgICB0aW1lbGluZSxcbiAgICAgICAgeW95b0Vhc2U7XG5cbiAgICBpZiAoIWR1cikge1xuICAgICAgX3JlbmRlclplcm9EdXJhdGlvblR3ZWVuKHRoaXMsIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICB9IGVsc2UgaWYgKHRUaW1lICE9PSB0aGlzLl90VGltZSB8fCAhdG90YWxUaW1lIHx8IGZvcmNlIHx8ICF0aGlzLl9pbml0dGVkICYmIHRoaXMuX3RUaW1lIHx8IHRoaXMuX3N0YXJ0QXQgJiYgdGhpcy5felRpbWUgPCAwICE9PSBpc05lZ2F0aXZlKSB7XG4gICAgICAvL3RoaXMgc2Vuc2VzIGlmIHdlJ3JlIGNyb3NzaW5nIG92ZXIgdGhlIHN0YXJ0IHRpbWUsIGluIHdoaWNoIGNhc2Ugd2UgbXVzdCByZWNvcmQgX3pUaW1lIGFuZCBmb3JjZSB0aGUgcmVuZGVyLCBidXQgd2UgZG8gaXQgaW4gdGhpcyBsZW5ndGh5IGNvbmRpdGlvbmFsIHdheSBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucyAodXN1YWxseSB3ZSBjYW4gc2tpcCB0aGUgY2FsY3VsYXRpb25zKTogdGhpcy5faW5pdHRlZCAmJiAodGhpcy5felRpbWUgPCAwKSAhPT0gKHRvdGFsVGltZSA8IDApXG4gICAgICB0aW1lID0gdFRpbWU7XG4gICAgICB0aW1lbGluZSA9IHRoaXMudGltZWxpbmU7XG5cbiAgICAgIGlmICh0aGlzLl9yZXBlYXQpIHtcbiAgICAgICAgLy9hZGp1c3QgdGhlIHRpbWUgZm9yIHJlcGVhdHMgYW5kIHlveW9zXG4gICAgICAgIGN5Y2xlRHVyYXRpb24gPSBkdXIgKyB0aGlzLl9yRGVsYXk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3JlcGVhdCA8IC0xICYmIGlzTmVnYXRpdmUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50b3RhbFRpbWUoY3ljbGVEdXJhdGlvbiAqIDEwMCArIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWUgPSBfcm91bmRQcmVjaXNlKHRUaW1lICUgY3ljbGVEdXJhdGlvbik7IC8vcm91bmQgdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgZXJyb3JzLiAoNCAlIDAuOCBzaG91bGQgYmUgMCBidXQgc29tZSBicm93c2VycyByZXBvcnQgaXQgYXMgMC43OTk5OTk5OSEpXG5cbiAgICAgICAgaWYgKHRUaW1lID09PSB0RHVyKSB7XG4gICAgICAgICAgLy8gdGhlIHREdXIgPT09IHRUaW1lIGlzIGZvciBlZGdlIGNhc2VzIHdoZXJlIHRoZXJlJ3MgYSBsZW5ndGh5IGRlY2ltYWwgb24gdGhlIGR1cmF0aW9uIGFuZCBpdCBtYXkgcmVhY2ggdGhlIHZlcnkgZW5kIGJ1dCB0aGUgdGltZSBpcyByZW5kZXJlZCBhcyBub3QtcXVpdGUtdGhlcmUgKHJlbWVtYmVyLCB0RHVyIGlzIHJvdW5kZWQgdG8gNCBkZWNpbWFscyB3aGVyZWFzIGR1ciBpc24ndClcbiAgICAgICAgICBpdGVyYXRpb24gPSB0aGlzLl9yZXBlYXQ7XG4gICAgICAgICAgdGltZSA9IGR1cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVyYXRpb24gPSB+fih0VGltZSAvIGN5Y2xlRHVyYXRpb24pO1xuXG4gICAgICAgICAgaWYgKGl0ZXJhdGlvbiAmJiBpdGVyYXRpb24gPT09IHRUaW1lIC8gY3ljbGVEdXJhdGlvbikge1xuICAgICAgICAgICAgdGltZSA9IGR1cjtcbiAgICAgICAgICAgIGl0ZXJhdGlvbi0tO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRpbWUgPiBkdXIgJiYgKHRpbWUgPSBkdXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaXNZb3lvID0gdGhpcy5feW95byAmJiBpdGVyYXRpb24gJiAxO1xuXG4gICAgICAgIGlmIChpc1lveW8pIHtcbiAgICAgICAgICB5b3lvRWFzZSA9IHRoaXMuX3lFYXNlO1xuICAgICAgICAgIHRpbWUgPSBkdXIgLSB0aW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJldkl0ZXJhdGlvbiA9IF9hbmltYXRpb25DeWNsZSh0aGlzLl90VGltZSwgY3ljbGVEdXJhdGlvbik7XG5cbiAgICAgICAgaWYgKHRpbWUgPT09IHByZXZUaW1lICYmICFmb3JjZSAmJiB0aGlzLl9pbml0dGVkKSB7XG4gICAgICAgICAgLy9jb3VsZCBiZSBkdXJpbmcgdGhlIHJlcGVhdERlbGF5IHBhcnQuIE5vIG5lZWQgdG8gcmVuZGVyIGFuZCBmaXJlIGNhbGxiYWNrcy5cbiAgICAgICAgICB0aGlzLl90VGltZSA9IHRUaW1lO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZXJhdGlvbiAhPT0gcHJldkl0ZXJhdGlvbikge1xuICAgICAgICAgIHRpbWVsaW5lICYmIHRoaXMuX3lFYXNlICYmIF9wcm9wYWdhdGVZb3lvRWFzZSh0aW1lbGluZSwgaXNZb3lvKTsgLy9yZXBlYXRSZWZyZXNoIGZ1bmN0aW9uYWxpdHlcblxuICAgICAgICAgIGlmICh0aGlzLnZhcnMucmVwZWF0UmVmcmVzaCAmJiAhaXNZb3lvICYmICF0aGlzLl9sb2NrKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NrID0gZm9yY2UgPSAxOyAvL2ZvcmNlLCBvdGhlcndpc2UgaWYgbGF6eSBpcyB0cnVlLCB0aGUgX2F0dGVtcHRJbml0VHdlZW4oKSB3aWxsIHJldHVybiBhbmQgd2UnbGwganVtcCBvdXQgYW5kIGdldCBjYXVnaHQgYm91bmNpbmcgb24gZWFjaCB0aWNrLlxuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcihfcm91bmRQcmVjaXNlKGN5Y2xlRHVyYXRpb24gKiBpdGVyYXRpb24pLCB0cnVlKS5pbnZhbGlkYXRlKCkuX2xvY2sgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuX2luaXR0ZWQpIHtcbiAgICAgICAgaWYgKF9hdHRlbXB0SW5pdFR3ZWVuKHRoaXMsIGlzTmVnYXRpdmUgPyB0b3RhbFRpbWUgOiB0aW1lLCBmb3JjZSwgc3VwcHJlc3NFdmVudHMsIHRUaW1lKSkge1xuICAgICAgICAgIHRoaXMuX3RUaW1lID0gMDsgLy8gaW4gY29uc3RydWN0b3IgaWYgaW1tZWRpYXRlUmVuZGVyIGlzIHRydWUsIHdlIHNldCBfdFRpbWUgdG8gLV90aW55TnVtIHRvIGhhdmUgdGhlIHBsYXloZWFkIGNyb3NzIHRoZSBzdGFydGluZyBwb2ludCBidXQgd2UgY2FuJ3QgbGVhdmUgX3RUaW1lIGFzIGEgbmVnYXRpdmUgbnVtYmVyLlxuXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldlRpbWUgIT09IHRoaXMuX3RpbWUpIHtcbiAgICAgICAgICAvLyByYXJlIGVkZ2UgY2FzZSAtIGR1cmluZyBpbml0aWFsaXphdGlvbiwgYW4gb25VcGRhdGUgaW4gdGhlIF9zdGFydEF0ICguZnJvbVRvKCkpIG1pZ2h0IGZvcmNlIHRoaXMgdHdlZW4gdG8gcmVuZGVyIGF0IGEgZGlmZmVyZW50IHNwb3QgaW4gd2hpY2ggY2FzZSB3ZSBzaG91bGQgZGl0Y2ggdGhpcyByZW5kZXIoKSBjYWxsIHNvIHRoYXQgaXQgZG9lc24ndCByZXZlcnQgdGhlIHZhbHVlcy5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkdXIgIT09IHRoaXMuX2R1cikge1xuICAgICAgICAgIC8vIHdoaWxlIGluaXR0aW5nLCBhIHBsdWdpbiBsaWtlIEluZXJ0aWFQbHVnaW4gbWlnaHQgYWx0ZXIgdGhlIGR1cmF0aW9uLCBzbyByZXJ1biBmcm9tIHRoZSBzdGFydCB0byBlbnN1cmUgZXZlcnl0aGluZyByZW5kZXJzIGFzIGl0IHNob3VsZC5cbiAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIodG90YWxUaW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3RUaW1lID0gdFRpbWU7XG4gICAgICB0aGlzLl90aW1lID0gdGltZTtcblxuICAgICAgaWYgKCF0aGlzLl9hY3QgJiYgdGhpcy5fdHMpIHtcbiAgICAgICAgdGhpcy5fYWN0ID0gMTsgLy9hcyBsb25nIGFzIGl0J3Mgbm90IHBhdXNlZCwgZm9yY2UgaXQgdG8gYmUgYWN0aXZlIHNvIHRoYXQgaWYgdGhlIHVzZXIgcmVuZGVycyBpbmRlcGVuZGVudCBvZiB0aGUgcGFyZW50IHRpbWVsaW5lLCBpdCdsbCBiZSBmb3JjZWQgdG8gcmUtcmVuZGVyIG9uIHRoZSBuZXh0IHRpY2suXG5cbiAgICAgICAgdGhpcy5fbGF6eSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmF0aW8gPSByYXRpbyA9ICh5b3lvRWFzZSB8fCB0aGlzLl9lYXNlKSh0aW1lIC8gZHVyKTtcblxuICAgICAgaWYgKHRoaXMuX2Zyb20pIHtcbiAgICAgICAgdGhpcy5yYXRpbyA9IHJhdGlvID0gMSAtIHJhdGlvO1xuICAgICAgfVxuXG4gICAgICBpZiAodGltZSAmJiAhcHJldlRpbWUgJiYgIXN1cHByZXNzRXZlbnRzICYmICFpdGVyYXRpb24pIHtcbiAgICAgICAgX2NhbGxiYWNrKHRoaXMsIFwib25TdGFydFwiKTtcblxuICAgICAgICBpZiAodGhpcy5fdFRpbWUgIT09IHRUaW1lKSB7XG4gICAgICAgICAgLy8gaW4gY2FzZSB0aGUgb25TdGFydCB0cmlnZ2VyZWQgYSByZW5kZXIgYXQgYSBkaWZmZXJlbnQgc3BvdCwgZWplY3QuIExpa2UgaWYgc29tZW9uZSBkaWQgYW5pbWF0aW9uLnBhdXNlKDAuNSkgb3Igc29tZXRoaW5nIGluc2lkZSB0aGUgb25TdGFydC5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwdCA9IHRoaXMuX3B0O1xuXG4gICAgICB3aGlsZSAocHQpIHtcbiAgICAgICAgcHQucihyYXRpbywgcHQuZCk7XG4gICAgICAgIHB0ID0gcHQuX25leHQ7XG4gICAgICB9XG5cbiAgICAgIHRpbWVsaW5lICYmIHRpbWVsaW5lLnJlbmRlcih0b3RhbFRpbWUgPCAwID8gdG90YWxUaW1lIDogIXRpbWUgJiYgaXNZb3lvID8gLV90aW55TnVtIDogdGltZWxpbmUuX2R1ciAqIHRpbWVsaW5lLl9lYXNlKHRpbWUgLyB0aGlzLl9kdXIpLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHx8IHRoaXMuX3N0YXJ0QXQgJiYgKHRoaXMuX3pUaW1lID0gdG90YWxUaW1lKTtcblxuICAgICAgaWYgKHRoaXMuX29uVXBkYXRlICYmICFzdXBwcmVzc0V2ZW50cykge1xuICAgICAgICBpc05lZ2F0aXZlICYmIF9yZXdpbmRTdGFydEF0KHRoaXMsIHRvdGFsVGltZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTsgLy9ub3RlOiBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucywgd2UgdHVjayB0aGlzIGNvbmRpdGlvbmFsIGxvZ2ljIGluc2lkZSBsZXNzIHRyYXZlbGVkIGFyZWFzIChtb3N0IHR3ZWVucyBkb24ndCBoYXZlIGFuIG9uVXBkYXRlKS4gV2UnZCBqdXN0IGhhdmUgaXQgYXQgdGhlIGVuZCBiZWZvcmUgdGhlIG9uQ29tcGxldGUsIGJ1dCB0aGUgdmFsdWVzIHNob3VsZCBiZSB1cGRhdGVkIGJlZm9yZSBhbnkgb25VcGRhdGUgaXMgY2FsbGVkLCBzbyB3ZSBBTFNPIHB1dCBpdCBoZXJlIGFuZCB0aGVuIGlmIGl0J3Mgbm90IGNhbGxlZCwgd2UgZG8gc28gbGF0ZXIgbmVhciB0aGUgb25Db21wbGV0ZS5cblxuICAgICAgICBfY2FsbGJhY2sodGhpcywgXCJvblVwZGF0ZVwiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fcmVwZWF0ICYmIGl0ZXJhdGlvbiAhPT0gcHJldkl0ZXJhdGlvbiAmJiB0aGlzLnZhcnMub25SZXBlYXQgJiYgIXN1cHByZXNzRXZlbnRzICYmIHRoaXMucGFyZW50ICYmIF9jYWxsYmFjayh0aGlzLCBcIm9uUmVwZWF0XCIpO1xuXG4gICAgICBpZiAoKHRUaW1lID09PSB0aGlzLl90RHVyIHx8ICF0VGltZSkgJiYgdGhpcy5fdFRpbWUgPT09IHRUaW1lKSB7XG4gICAgICAgIGlzTmVnYXRpdmUgJiYgIXRoaXMuX29uVXBkYXRlICYmIF9yZXdpbmRTdGFydEF0KHRoaXMsIHRvdGFsVGltZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICh0b3RhbFRpbWUgfHwgIWR1cikgJiYgKHRUaW1lID09PSB0aGlzLl90RHVyICYmIHRoaXMuX3RzID4gMCB8fCAhdFRpbWUgJiYgdGhpcy5fdHMgPCAwKSAmJiBfcmVtb3ZlRnJvbVBhcmVudCh0aGlzLCAxKTsgLy8gZG9uJ3QgcmVtb3ZlIGlmIHdlJ3JlIHJlbmRlcmluZyBhdCBleGFjdGx5IGEgdGltZSBvZiAwLCBhcyB0aGVyZSBjb3VsZCBiZSBhdXRvUmV2ZXJ0IHZhbHVlcyB0aGF0IHNob3VsZCBnZXQgc2V0IG9uIHRoZSBuZXh0IHRpY2sgKGlmIHRoZSBwbGF5aGVhZCBnb2VzIGJhY2t3YXJkIGJleW9uZCB0aGUgc3RhcnRUaW1lLCBuZWdhdGl2ZSB0b3RhbFRpbWUpLiBEb24ndCByZW1vdmUgaWYgdGhlIHRpbWVsaW5lIGlzIHJldmVyc2VkIGFuZCB0aGUgcGxheWhlYWQgaXNuJ3QgYXQgMCwgb3RoZXJ3aXNlIHRsLnByb2dyZXNzKDEpLnJldmVyc2UoKSB3b24ndCB3b3JrLiBPbmx5IHJlbW92ZSBpZiB0aGUgcGxheWhlYWQgaXMgYXQgdGhlIGVuZCBhbmQgdGltZVNjYWxlIGlzIHBvc2l0aXZlLCBvciBpZiB0aGUgcGxheWhlYWQgaXMgYXQgMCBhbmQgdGhlIHRpbWVTY2FsZSBpcyBuZWdhdGl2ZS5cblxuICAgICAgICBpZiAoIXN1cHByZXNzRXZlbnRzICYmICEoaXNOZWdhdGl2ZSAmJiAhcHJldlRpbWUpICYmICh0VGltZSB8fCBwcmV2VGltZSB8fCBpc1lveW8pKSB7XG4gICAgICAgICAgLy8gaWYgcHJldlRpbWUgYW5kIHRUaW1lIGFyZSB6ZXJvLCB3ZSBzaG91bGRuJ3QgZmlyZSB0aGUgb25SZXZlcnNlQ29tcGxldGUuIFRoaXMgY291bGQgaGFwcGVuIGlmIHlvdSBnc2FwLnRvKC4uLiB7cGF1c2VkOnRydWV9KS5wbGF5KCk7XG4gICAgICAgICAgX2NhbGxiYWNrKHRoaXMsIHRUaW1lID09PSB0RHVyID8gXCJvbkNvbXBsZXRlXCIgOiBcIm9uUmV2ZXJzZUNvbXBsZXRlXCIsIHRydWUpO1xuXG4gICAgICAgICAgdGhpcy5fcHJvbSAmJiAhKHRUaW1lIDwgdER1ciAmJiB0aGlzLnRpbWVTY2FsZSgpID4gMCkgJiYgdGhpcy5fcHJvbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMy50YXJnZXRzID0gZnVuY3Rpb24gdGFyZ2V0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFyZ2V0cztcbiAgfTtcblxuICBfcHJvdG8zLmludmFsaWRhdGUgPSBmdW5jdGlvbiBpbnZhbGlkYXRlKHNvZnQpIHtcbiAgICAvLyBcInNvZnRcIiBnaXZlcyB1cyBhIHdheSB0byBjbGVhciBvdXQgZXZlcnl0aGluZyBFWENFUFQgdGhlIHJlY29yZGVkIHByZS1cImZyb21cIiBwb3J0aW9uIG9mIGZyb20oKSB0d2VlbnMuIE90aGVyd2lzZSwgZm9yIGV4YW1wbGUsIGlmIHlvdSB0d2Vlbi5wcm9ncmVzcygxKS5yZW5kZXIoMCwgdHJ1ZSB0cnVlKS5pbnZhbGlkYXRlKCksIHRoZSBcImZyb21cIiB2YWx1ZXMgd291bGQgcGVyc2lzdCBhbmQgdGhlbiBvbiB0aGUgbmV4dCByZW5kZXIsIHRoZSBmcm9tKCkgdHdlZW5zIHdvdWxkIGluaXRpYWxpemUgYW5kIHRoZSBjdXJyZW50IHZhbHVlIHdvdWxkIG1hdGNoIHRoZSBcImZyb21cIiB2YWx1ZXMsIHRodXMgYW5pbWF0ZSBmcm9tIHRoZSBzYW1lIHZhbHVlIHRvIHRoZSBzYW1lIHZhbHVlIChubyBhbmltYXRpb24pLiBXZSB0YXAgaW50byB0aGlzIGluIFNjcm9sbFRyaWdnZXIncyByZWZyZXNoKCkgd2hlcmUgd2UgbXVzdCBwdXNoIGEgdHdlZW4gdG8gY29tcGxldGlvbiBhbmQgdGhlbiBiYWNrIGFnYWluIGJ1dCBob25vciBpdHMgaW5pdCBzdGF0ZSBpbiBjYXNlIHRoZSB0d2VlbiBpcyBkZXBlbmRlbnQgb24gYW5vdGhlciB0d2VlbiBmdXJ0aGVyIHVwIG9uIHRoZSBwYWdlLlxuICAgICghc29mdCB8fCAhdGhpcy52YXJzLnJ1bkJhY2t3YXJkcykgJiYgKHRoaXMuX3N0YXJ0QXQgPSAwKTtcbiAgICB0aGlzLl9wdCA9IHRoaXMuX29wID0gdGhpcy5fb25VcGRhdGUgPSB0aGlzLl9sYXp5ID0gdGhpcy5yYXRpbyA9IDA7XG4gICAgdGhpcy5fcHRMb29rdXAgPSBbXTtcbiAgICB0aGlzLnRpbWVsaW5lICYmIHRoaXMudGltZWxpbmUuaW52YWxpZGF0ZShzb2Z0KTtcbiAgICByZXR1cm4gX0FuaW1hdGlvbjIucHJvdG90eXBlLmludmFsaWRhdGUuY2FsbCh0aGlzLCBzb2Z0KTtcbiAgfTtcblxuICBfcHJvdG8zLnJlc2V0VG8gPSBmdW5jdGlvbiByZXNldFRvKHByb3BlcnR5LCB2YWx1ZSwgc3RhcnQsIHN0YXJ0SXNSZWxhdGl2ZSkge1xuICAgIF90aWNrZXJBY3RpdmUgfHwgX3RpY2tlci53YWtlKCk7XG4gICAgdGhpcy5fdHMgfHwgdGhpcy5wbGF5KCk7XG4gICAgdmFyIHRpbWUgPSBNYXRoLm1pbih0aGlzLl9kdXIsICh0aGlzLl9kcC5fdGltZSAtIHRoaXMuX3N0YXJ0KSAqIHRoaXMuX3RzKSxcbiAgICAgICAgcmF0aW87XG4gICAgdGhpcy5faW5pdHRlZCB8fCBfaW5pdFR3ZWVuKHRoaXMsIHRpbWUpO1xuICAgIHJhdGlvID0gdGhpcy5fZWFzZSh0aW1lIC8gdGhpcy5fZHVyKTsgLy8gZG9uJ3QganVzdCBnZXQgdHdlZW4ucmF0aW8gYmVjYXVzZSBpdCBtYXkgbm90IGhhdmUgcmVuZGVyZWQgeWV0LlxuICAgIC8vIHBvc3NpYmxlIGZ1dHVyZSBhZGRpdGlvbiB0byBhbGxvdyBhbiBvYmplY3Qgd2l0aCBtdWx0aXBsZSB2YWx1ZXMgdG8gdXBkYXRlLCBsaWtlIHR3ZWVuLnJlc2V0VG8oe3g6IDEwMCwgeTogMjAwfSk7IEF0IHRoaXMgcG9pbnQsIGl0IGRvZXNuJ3Qgc2VlbSB3b3J0aCB0aGUgYWRkZWQga2IgZ2l2ZW4gdGhlIGZhY3QgdGhhdCBtb3N0IHVzZXJzIHdpbGwgbGlrZWx5IG9wdCBmb3IgdGhlIGNvbnZlbmllbnQgZ3NhcC5xdWlja1RvKCkgd2F5IG9mIGludGVyYWN0aW5nIHdpdGggdGhpcyBtZXRob2QuXG4gICAgLy8gaWYgKF9pc09iamVjdChwcm9wZXJ0eSkpIHsgLy8gcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uXG4gICAgLy8gXHRmb3IgKHAgaW4gcHJvcGVydHkpIHtcbiAgICAvLyBcdFx0aWYgKF91cGRhdGVQcm9wVHdlZW5zKHRoaXMsIHAsIHByb3BlcnR5W3BdLCB2YWx1ZSA/IHZhbHVlW3BdIDogbnVsbCwgc3RhcnQsIHJhdGlvLCB0aW1lKSkge1xuICAgIC8vIFx0XHRcdHJldHVybiB0aGlzLnJlc2V0VG8ocHJvcGVydHksIHZhbHVlLCBzdGFydCwgc3RhcnRJc1JlbGF0aXZlKTsgLy8gaWYgYSBQcm9wVHdlZW4gd2Fzbid0IGZvdW5kIGZvciB0aGUgcHJvcGVydHksIGl0J2xsIGdldCBmb3JjZWQgd2l0aCBhIHJlLWluaXRpYWxpemF0aW9uIHNvIHdlIG5lZWQgdG8ganVtcCBvdXQgYW5kIHN0YXJ0IG92ZXIgYWdhaW4uXG4gICAgLy8gXHRcdH1cbiAgICAvLyBcdH1cbiAgICAvLyB9IGVsc2Uge1xuXG4gICAgaWYgKF91cGRhdGVQcm9wVHdlZW5zKHRoaXMsIHByb3BlcnR5LCB2YWx1ZSwgc3RhcnQsIHN0YXJ0SXNSZWxhdGl2ZSwgcmF0aW8sIHRpbWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXNldFRvKHByb3BlcnR5LCB2YWx1ZSwgc3RhcnQsIHN0YXJ0SXNSZWxhdGl2ZSk7IC8vIGlmIGEgUHJvcFR3ZWVuIHdhc24ndCBmb3VuZCBmb3IgdGhlIHByb3BlcnR5LCBpdCdsbCBnZXQgZm9yY2VkIHdpdGggYSByZS1pbml0aWFsaXphdGlvbiBzbyB3ZSBuZWVkIHRvIGp1bXAgb3V0IGFuZCBzdGFydCBvdmVyIGFnYWluLlxuICAgIH0gLy99XG5cblxuICAgIF9hbGlnblBsYXloZWFkKHRoaXMsIDApO1xuXG4gICAgdGhpcy5wYXJlbnQgfHwgX2FkZExpbmtlZExpc3RJdGVtKHRoaXMuX2RwLCB0aGlzLCBcIl9maXJzdFwiLCBcIl9sYXN0XCIsIHRoaXMuX2RwLl9zb3J0ID8gXCJfc3RhcnRcIiA6IDApO1xuICAgIHJldHVybiB0aGlzLnJlbmRlcigwKTtcbiAgfTtcblxuICBfcHJvdG8zLmtpbGwgPSBmdW5jdGlvbiBraWxsKHRhcmdldHMsIHZhcnMpIHtcbiAgICBpZiAodmFycyA9PT0gdm9pZCAwKSB7XG4gICAgICB2YXJzID0gXCJhbGxcIjtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldHMgJiYgKCF2YXJzIHx8IHZhcnMgPT09IFwiYWxsXCIpKSB7XG4gICAgICB0aGlzLl9sYXp5ID0gdGhpcy5fcHQgPSAwO1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ID8gX2ludGVycnVwdCh0aGlzKSA6IHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGltZWxpbmUpIHtcbiAgICAgIHZhciB0RHVyID0gdGhpcy50aW1lbGluZS50b3RhbER1cmF0aW9uKCk7XG4gICAgICB0aGlzLnRpbWVsaW5lLmtpbGxUd2VlbnNPZih0YXJnZXRzLCB2YXJzLCBfb3ZlcndyaXRpbmdUd2VlbiAmJiBfb3ZlcndyaXRpbmdUd2Vlbi52YXJzLm92ZXJ3cml0ZSAhPT0gdHJ1ZSkuX2ZpcnN0IHx8IF9pbnRlcnJ1cHQodGhpcyk7IC8vIGlmIG5vdGhpbmcgaXMgbGVmdCB0d2VlbmluZywgaW50ZXJydXB0LlxuXG4gICAgICB0aGlzLnBhcmVudCAmJiB0RHVyICE9PSB0aGlzLnRpbWVsaW5lLnRvdGFsRHVyYXRpb24oKSAmJiBfc2V0RHVyYXRpb24odGhpcywgdGhpcy5fZHVyICogdGhpcy50aW1lbGluZS5fdER1ciAvIHREdXIsIDAsIDEpOyAvLyBpZiBhIG5lc3RlZCB0d2VlbiBpcyBraWxsZWQgdGhhdCBjaGFuZ2VzIHRoZSBkdXJhdGlvbiwgaXQgc2hvdWxkIGFmZmVjdCB0aGlzIHR3ZWVuJ3MgZHVyYXRpb24uIFdlIG11c3QgdXNlIHRoZSByYXRpbywgdGhvdWdoLCBiZWNhdXNlIHNvbWV0aW1lcyB0aGUgaW50ZXJuYWwgdGltZWxpbmUgaXMgc3RyZXRjaGVkIGxpa2UgZm9yIGtleWZyYW1lcyB3aGVyZSB0aGV5IGRvbid0IGFsbCBhZGQgdXAgdG8gd2hhdGV2ZXIgdGhlIHBhcmVudCB0d2VlbidzIGR1cmF0aW9uIHdhcyBzZXQgdG8uXG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhciBwYXJzZWRUYXJnZXRzID0gdGhpcy5fdGFyZ2V0cyxcbiAgICAgICAga2lsbGluZ1RhcmdldHMgPSB0YXJnZXRzID8gdG9BcnJheSh0YXJnZXRzKSA6IHBhcnNlZFRhcmdldHMsXG4gICAgICAgIHByb3BUd2Vlbkxvb2t1cCA9IHRoaXMuX3B0TG9va3VwLFxuICAgICAgICBmaXJzdFBUID0gdGhpcy5fcHQsXG4gICAgICAgIG92ZXJ3cml0dGVuUHJvcHMsXG4gICAgICAgIGN1ckxvb2t1cCxcbiAgICAgICAgY3VyT3ZlcndyaXRlUHJvcHMsXG4gICAgICAgIHByb3BzLFxuICAgICAgICBwLFxuICAgICAgICBwdCxcbiAgICAgICAgaTtcblxuICAgIGlmICgoIXZhcnMgfHwgdmFycyA9PT0gXCJhbGxcIikgJiYgX2FycmF5c01hdGNoKHBhcnNlZFRhcmdldHMsIGtpbGxpbmdUYXJnZXRzKSkge1xuICAgICAgdmFycyA9PT0gXCJhbGxcIiAmJiAodGhpcy5fcHQgPSAwKTtcbiAgICAgIHJldHVybiBfaW50ZXJydXB0KHRoaXMpO1xuICAgIH1cblxuICAgIG92ZXJ3cml0dGVuUHJvcHMgPSB0aGlzLl9vcCA9IHRoaXMuX29wIHx8IFtdO1xuXG4gICAgaWYgKHZhcnMgIT09IFwiYWxsXCIpIHtcbiAgICAgIC8vc28gcGVvcGxlIGNhbiBwYXNzIGluIGEgY29tbWEtZGVsaW1pdGVkIGxpc3Qgb2YgcHJvcGVydHkgbmFtZXNcbiAgICAgIGlmIChfaXNTdHJpbmcodmFycykpIHtcbiAgICAgICAgcCA9IHt9O1xuXG4gICAgICAgIF9mb3JFYWNoTmFtZSh2YXJzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgIHJldHVybiBwW25hbWVdID0gMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFycyA9IHA7XG4gICAgICB9XG5cbiAgICAgIHZhcnMgPSBfYWRkQWxpYXNlc1RvVmFycyhwYXJzZWRUYXJnZXRzLCB2YXJzKTtcbiAgICB9XG5cbiAgICBpID0gcGFyc2VkVGFyZ2V0cy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAofmtpbGxpbmdUYXJnZXRzLmluZGV4T2YocGFyc2VkVGFyZ2V0c1tpXSkpIHtcbiAgICAgICAgY3VyTG9va3VwID0gcHJvcFR3ZWVuTG9va3VwW2ldO1xuXG4gICAgICAgIGlmICh2YXJzID09PSBcImFsbFwiKSB7XG4gICAgICAgICAgb3ZlcndyaXR0ZW5Qcm9wc1tpXSA9IHZhcnM7XG4gICAgICAgICAgcHJvcHMgPSBjdXJMb29rdXA7XG4gICAgICAgICAgY3VyT3ZlcndyaXRlUHJvcHMgPSB7fTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJPdmVyd3JpdGVQcm9wcyA9IG92ZXJ3cml0dGVuUHJvcHNbaV0gPSBvdmVyd3JpdHRlblByb3BzW2ldIHx8IHt9O1xuICAgICAgICAgIHByb3BzID0gdmFycztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAocCBpbiBwcm9wcykge1xuICAgICAgICAgIHB0ID0gY3VyTG9va3VwICYmIGN1ckxvb2t1cFtwXTtcblxuICAgICAgICAgIGlmIChwdCkge1xuICAgICAgICAgICAgaWYgKCEoXCJraWxsXCIgaW4gcHQuZCkgfHwgcHQuZC5raWxsKHApID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIF9yZW1vdmVMaW5rZWRMaXN0SXRlbSh0aGlzLCBwdCwgXCJfcHRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSBjdXJMb29rdXBbcF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGN1ck92ZXJ3cml0ZVByb3BzICE9PSBcImFsbFwiKSB7XG4gICAgICAgICAgICBjdXJPdmVyd3JpdGVQcm9wc1twXSA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdHRlZCAmJiAhdGhpcy5fcHQgJiYgZmlyc3RQVCAmJiBfaW50ZXJydXB0KHRoaXMpOyAvL2lmIGFsbCB0d2VlbmluZyBwcm9wZXJ0aWVzIGFyZSBraWxsZWQsIGtpbGwgdGhlIHR3ZWVuLiBXaXRob3V0IHRoaXMgbGluZSwgaWYgdGhlcmUncyBhIHR3ZWVuIHdpdGggbXVsdGlwbGUgdGFyZ2V0cyBhbmQgdGhlbiB5b3Uga2lsbFR3ZWVuc09mKCkgZWFjaCB0YXJnZXQgaW5kaXZpZHVhbGx5LCB0aGUgdHdlZW4gd291bGQgdGVjaG5pY2FsbHkgc3RpbGwgcmVtYWluIGFjdGl2ZSBhbmQgZmlyZSBpdHMgb25Db21wbGV0ZSBldmVuIHRob3VnaCB0aGVyZSBhcmVuJ3QgYW55IG1vcmUgcHJvcGVydGllcyB0d2VlbmluZy5cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFR3ZWVuLnRvID0gZnVuY3Rpb24gdG8odGFyZ2V0cywgdmFycykge1xuICAgIHJldHVybiBuZXcgVHdlZW4odGFyZ2V0cywgdmFycywgYXJndW1lbnRzWzJdKTtcbiAgfTtcblxuICBUd2Vlbi5mcm9tID0gZnVuY3Rpb24gZnJvbSh0YXJnZXRzLCB2YXJzKSB7XG4gICAgcmV0dXJuIF9jcmVhdGVUd2VlblR5cGUoMSwgYXJndW1lbnRzKTtcbiAgfTtcblxuICBUd2Vlbi5kZWxheWVkQ2FsbCA9IGZ1bmN0aW9uIGRlbGF5ZWRDYWxsKGRlbGF5LCBjYWxsYmFjaywgcGFyYW1zLCBzY29wZSkge1xuICAgIHJldHVybiBuZXcgVHdlZW4oY2FsbGJhY2ssIDAsIHtcbiAgICAgIGltbWVkaWF0ZVJlbmRlcjogZmFsc2UsXG4gICAgICBsYXp5OiBmYWxzZSxcbiAgICAgIG92ZXJ3cml0ZTogZmFsc2UsXG4gICAgICBkZWxheTogZGVsYXksXG4gICAgICBvbkNvbXBsZXRlOiBjYWxsYmFjayxcbiAgICAgIG9uUmV2ZXJzZUNvbXBsZXRlOiBjYWxsYmFjayxcbiAgICAgIG9uQ29tcGxldGVQYXJhbXM6IHBhcmFtcyxcbiAgICAgIG9uUmV2ZXJzZUNvbXBsZXRlUGFyYW1zOiBwYXJhbXMsXG4gICAgICBjYWxsYmFja1Njb3BlOiBzY29wZVxuICAgIH0pOyAvLyB3ZSBtdXN0IHVzZSBvblJldmVyc2VDb21wbGV0ZSB0b28gZm9yIHRoaW5ncyBsaWtlIHRpbWVsaW5lLmFkZCgoKSA9PiB7Li4ufSkgd2hpY2ggc2hvdWxkIGJlIHRyaWdnZXJlZCBpbiBCT1RIIGRpcmVjdGlvbnMgKGZvcndhcmQgYW5kIHJldmVyc2UpXG4gIH07XG5cbiAgVHdlZW4uZnJvbVRvID0gZnVuY3Rpb24gZnJvbVRvKHRhcmdldHMsIGZyb21WYXJzLCB0b1ZhcnMpIHtcbiAgICByZXR1cm4gX2NyZWF0ZVR3ZWVuVHlwZSgyLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIFR3ZWVuLnNldCA9IGZ1bmN0aW9uIHNldCh0YXJnZXRzLCB2YXJzKSB7XG4gICAgdmFycy5kdXJhdGlvbiA9IDA7XG4gICAgdmFycy5yZXBlYXREZWxheSB8fCAodmFycy5yZXBlYXQgPSAwKTtcbiAgICByZXR1cm4gbmV3IFR3ZWVuKHRhcmdldHMsIHZhcnMpO1xuICB9O1xuXG4gIFR3ZWVuLmtpbGxUd2VlbnNPZiA9IGZ1bmN0aW9uIGtpbGxUd2VlbnNPZih0YXJnZXRzLCBwcm9wcywgb25seUFjdGl2ZSkge1xuICAgIHJldHVybiBfZ2xvYmFsVGltZWxpbmUua2lsbFR3ZWVuc09mKHRhcmdldHMsIHByb3BzLCBvbmx5QWN0aXZlKTtcbiAgfTtcblxuICByZXR1cm4gVHdlZW47XG59KEFuaW1hdGlvbik7XG5cbl9zZXREZWZhdWx0cyhUd2Vlbi5wcm90b3R5cGUsIHtcbiAgX3RhcmdldHM6IFtdLFxuICBfbGF6eTogMCxcbiAgX3N0YXJ0QXQ6IDAsXG4gIF9vcDogMCxcbiAgX29uSW5pdDogMFxufSk7IC8vYWRkIHRoZSBwZXJ0aW5lbnQgdGltZWxpbmUgbWV0aG9kcyB0byBUd2VlbiBpbnN0YW5jZXMgc28gdGhhdCB1c2VycyBjYW4gY2hhaW4gY29udmVuaWVudGx5IGFuZCBjcmVhdGUgYSB0aW1lbGluZSBhdXRvbWF0aWNhbGx5LiAocmVtb3ZlZCBkdWUgdG8gY29uY2VybnMgdGhhdCBpdCdkIHVsdGltYXRlbHkgYWRkIHRvIG1vcmUgY29uZnVzaW9uIGVzcGVjaWFsbHkgZm9yIGJlZ2lubmVycylcbi8vIF9mb3JFYWNoTmFtZShcInRvLGZyb20sZnJvbVRvLHNldCxjYWxsLGFkZCxhZGRMYWJlbCxhZGRQYXVzZVwiLCBuYW1lID0+IHtcbi8vIFx0VHdlZW4ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4vLyBcdFx0bGV0IHRsID0gbmV3IFRpbWVsaW5lKCk7XG4vLyBcdFx0cmV0dXJuIF9hZGRUb1RpbWVsaW5lKHRsLCB0aGlzKVtuYW1lXS5hcHBseSh0bCwgdG9BcnJheShhcmd1bWVudHMpKTtcbi8vIFx0fVxuLy8gfSk7XG4vL2ZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LiBMZXZlcmFnZSB0aGUgdGltZWxpbmUgY2FsbHMuXG5cblxuX2ZvckVhY2hOYW1lKFwic3RhZ2dlclRvLHN0YWdnZXJGcm9tLHN0YWdnZXJGcm9tVG9cIiwgZnVuY3Rpb24gKG5hbWUpIHtcbiAgVHdlZW5bbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRsID0gbmV3IFRpbWVsaW5lKCksXG4gICAgICAgIHBhcmFtcyA9IF9zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICBwYXJhbXMuc3BsaWNlKG5hbWUgPT09IFwic3RhZ2dlckZyb21Ub1wiID8gNSA6IDQsIDAsIDApO1xuICAgIHJldHVybiB0bFtuYW1lXS5hcHBseSh0bCwgcGFyYW1zKTtcbiAgfTtcbn0pO1xuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBQUk9QVFdFRU5cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuXG52YXIgX3NldHRlclBsYWluID0gZnVuY3Rpb24gX3NldHRlclBsYWluKHRhcmdldCwgcHJvcGVydHksIHZhbHVlKSB7XG4gIHJldHVybiB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XG59LFxuICAgIF9zZXR0ZXJGdW5jID0gZnVuY3Rpb24gX3NldHRlckZ1bmModGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldFtwcm9wZXJ0eV0odmFsdWUpO1xufSxcbiAgICBfc2V0dGVyRnVuY1dpdGhQYXJhbSA9IGZ1bmN0aW9uIF9zZXR0ZXJGdW5jV2l0aFBhcmFtKHRhcmdldCwgcHJvcGVydHksIHZhbHVlLCBkYXRhKSB7XG4gIHJldHVybiB0YXJnZXRbcHJvcGVydHldKGRhdGEuZnAsIHZhbHVlKTtcbn0sXG4gICAgX3NldHRlckF0dHJpYnV0ZSA9IGZ1bmN0aW9uIF9zZXR0ZXJBdHRyaWJ1dGUodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgcmV0dXJuIHRhcmdldC5zZXRBdHRyaWJ1dGUocHJvcGVydHksIHZhbHVlKTtcbn0sXG4gICAgX2dldFNldHRlciA9IGZ1bmN0aW9uIF9nZXRTZXR0ZXIodGFyZ2V0LCBwcm9wZXJ0eSkge1xuICByZXR1cm4gX2lzRnVuY3Rpb24odGFyZ2V0W3Byb3BlcnR5XSkgPyBfc2V0dGVyRnVuYyA6IF9pc1VuZGVmaW5lZCh0YXJnZXRbcHJvcGVydHldKSAmJiB0YXJnZXQuc2V0QXR0cmlidXRlID8gX3NldHRlckF0dHJpYnV0ZSA6IF9zZXR0ZXJQbGFpbjtcbn0sXG4gICAgX3JlbmRlclBsYWluID0gZnVuY3Rpb24gX3JlbmRlclBsYWluKHJhdGlvLCBkYXRhKSB7XG4gIHJldHVybiBkYXRhLnNldChkYXRhLnQsIGRhdGEucCwgTWF0aC5yb3VuZCgoZGF0YS5zICsgZGF0YS5jICogcmF0aW8pICogMTAwMDAwMCkgLyAxMDAwMDAwLCBkYXRhKTtcbn0sXG4gICAgX3JlbmRlckJvb2xlYW4gPSBmdW5jdGlvbiBfcmVuZGVyQm9vbGVhbihyYXRpbywgZGF0YSkge1xuICByZXR1cm4gZGF0YS5zZXQoZGF0YS50LCBkYXRhLnAsICEhKGRhdGEucyArIGRhdGEuYyAqIHJhdGlvKSwgZGF0YSk7XG59LFxuICAgIF9yZW5kZXJDb21wbGV4U3RyaW5nID0gZnVuY3Rpb24gX3JlbmRlckNvbXBsZXhTdHJpbmcocmF0aW8sIGRhdGEpIHtcbiAgdmFyIHB0ID0gZGF0YS5fcHQsXG4gICAgICBzID0gXCJcIjtcblxuICBpZiAoIXJhdGlvICYmIGRhdGEuYikge1xuICAgIC8vYiA9IGJlZ2lubmluZyBzdHJpbmdcbiAgICBzID0gZGF0YS5iO1xuICB9IGVsc2UgaWYgKHJhdGlvID09PSAxICYmIGRhdGEuZSkge1xuICAgIC8vZSA9IGVuZGluZyBzdHJpbmdcbiAgICBzID0gZGF0YS5lO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChwdCkge1xuICAgICAgcyA9IHB0LnAgKyAocHQubSA/IHB0Lm0ocHQucyArIHB0LmMgKiByYXRpbykgOiBNYXRoLnJvdW5kKChwdC5zICsgcHQuYyAqIHJhdGlvKSAqIDEwMDAwKSAvIDEwMDAwKSArIHM7IC8vd2UgdXNlIHRoZSBcInBcIiBwcm9wZXJ0eSBmb3IgdGhlIHRleHQgaW5iZXR3ZWVuIChsaWtlIGEgc3VmZml4KS4gQW5kIGluIHRoZSBjb250ZXh0IG9mIGEgY29tcGxleCBzdHJpbmcsIHRoZSBtb2RpZmllciAobSkgaXMgdHlwaWNhbGx5IGp1c3QgTWF0aC5yb3VuZCgpLCBsaWtlIGZvciBSR0IgY29sb3JzLlxuXG4gICAgICBwdCA9IHB0Ll9uZXh0O1xuICAgIH1cblxuICAgIHMgKz0gZGF0YS5jOyAvL3dlIHVzZSB0aGUgXCJjXCIgb2YgdGhlIFByb3BUd2VlbiB0byBzdG9yZSB0aGUgZmluYWwgY2h1bmsgb2Ygbm9uLW51bWVyaWMgdGV4dC5cbiAgfVxuXG4gIGRhdGEuc2V0KGRhdGEudCwgZGF0YS5wLCBzLCBkYXRhKTtcbn0sXG4gICAgX3JlbmRlclByb3BUd2VlbnMgPSBmdW5jdGlvbiBfcmVuZGVyUHJvcFR3ZWVucyhyYXRpbywgZGF0YSkge1xuICB2YXIgcHQgPSBkYXRhLl9wdDtcblxuICB3aGlsZSAocHQpIHtcbiAgICBwdC5yKHJhdGlvLCBwdC5kKTtcbiAgICBwdCA9IHB0Ll9uZXh0O1xuICB9XG59LFxuICAgIF9hZGRQbHVnaW5Nb2RpZmllciA9IGZ1bmN0aW9uIF9hZGRQbHVnaW5Nb2RpZmllcihtb2RpZmllciwgdHdlZW4sIHRhcmdldCwgcHJvcGVydHkpIHtcbiAgdmFyIHB0ID0gdGhpcy5fcHQsXG4gICAgICBuZXh0O1xuXG4gIHdoaWxlIChwdCkge1xuICAgIG5leHQgPSBwdC5fbmV4dDtcbiAgICBwdC5wID09PSBwcm9wZXJ0eSAmJiBwdC5tb2RpZmllcihtb2RpZmllciwgdHdlZW4sIHRhcmdldCk7XG4gICAgcHQgPSBuZXh0O1xuICB9XG59LFxuICAgIF9raWxsUHJvcFR3ZWVuc09mID0gZnVuY3Rpb24gX2tpbGxQcm9wVHdlZW5zT2YocHJvcGVydHkpIHtcbiAgdmFyIHB0ID0gdGhpcy5fcHQsXG4gICAgICBoYXNOb25EZXBlbmRlbnRSZW1haW5pbmcsXG4gICAgICBuZXh0O1xuXG4gIHdoaWxlIChwdCkge1xuICAgIG5leHQgPSBwdC5fbmV4dDtcblxuICAgIGlmIChwdC5wID09PSBwcm9wZXJ0eSAmJiAhcHQub3AgfHwgcHQub3AgPT09IHByb3BlcnR5KSB7XG4gICAgICBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0odGhpcywgcHQsIFwiX3B0XCIpO1xuICAgIH0gZWxzZSBpZiAoIXB0LmRlcCkge1xuICAgICAgaGFzTm9uRGVwZW5kZW50UmVtYWluaW5nID0gMTtcbiAgICB9XG5cbiAgICBwdCA9IG5leHQ7XG4gIH1cblxuICByZXR1cm4gIWhhc05vbkRlcGVuZGVudFJlbWFpbmluZztcbn0sXG4gICAgX3NldHRlcldpdGhNb2RpZmllciA9IGZ1bmN0aW9uIF9zZXR0ZXJXaXRoTW9kaWZpZXIodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIGRhdGEpIHtcbiAgZGF0YS5tU2V0KHRhcmdldCwgcHJvcGVydHksIGRhdGEubS5jYWxsKGRhdGEudHdlZW4sIHZhbHVlLCBkYXRhLm10KSwgZGF0YSk7XG59LFxuICAgIF9zb3J0UHJvcFR3ZWVuc0J5UHJpb3JpdHkgPSBmdW5jdGlvbiBfc29ydFByb3BUd2VlbnNCeVByaW9yaXR5KHBhcmVudCkge1xuICB2YXIgcHQgPSBwYXJlbnQuX3B0LFxuICAgICAgbmV4dCxcbiAgICAgIHB0MixcbiAgICAgIGZpcnN0LFxuICAgICAgbGFzdDsgLy9zb3J0cyB0aGUgUHJvcFR3ZWVuIGxpbmtlZCBsaXN0IGluIG9yZGVyIG9mIHByaW9yaXR5IGJlY2F1c2Ugc29tZSBwbHVnaW5zIG5lZWQgdG8gZG8gdGhlaXIgd29yayBhZnRlciBBTEwgb2YgdGhlIFByb3BUd2VlbnMgd2VyZSBjcmVhdGVkIChsaWtlIFJvdW5kUHJvcHNQbHVnaW4gYW5kIE1vZGlmaWVyc1BsdWdpbilcblxuICB3aGlsZSAocHQpIHtcbiAgICBuZXh0ID0gcHQuX25leHQ7XG4gICAgcHQyID0gZmlyc3Q7XG5cbiAgICB3aGlsZSAocHQyICYmIHB0Mi5wciA+IHB0LnByKSB7XG4gICAgICBwdDIgPSBwdDIuX25leHQ7XG4gICAgfVxuXG4gICAgaWYgKHB0Ll9wcmV2ID0gcHQyID8gcHQyLl9wcmV2IDogbGFzdCkge1xuICAgICAgcHQuX3ByZXYuX25leHQgPSBwdDtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlyc3QgPSBwdDtcbiAgICB9XG5cbiAgICBpZiAocHQuX25leHQgPSBwdDIpIHtcbiAgICAgIHB0Mi5fcHJldiA9IHB0O1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0ID0gcHQ7XG4gICAgfVxuXG4gICAgcHQgPSBuZXh0O1xuICB9XG5cbiAgcGFyZW50Ll9wdCA9IGZpcnN0O1xufTsgLy9Qcm9wVHdlZW4ga2V5OiB0ID0gdGFyZ2V0LCBwID0gcHJvcCwgciA9IHJlbmRlcmVyLCBkID0gZGF0YSwgcyA9IHN0YXJ0LCBjID0gY2hhbmdlLCBvcCA9IG92ZXJ3cml0ZVByb3BlcnR5IChPTkxZIHBvcHVsYXRlZCB3aGVuIGl0J3MgZGlmZmVyZW50IHRoYW4gcCksIHByID0gcHJpb3JpdHksIF9uZXh0L19wcmV2IGZvciB0aGUgbGlua2VkIGxpc3Qgc2libGluZ3MsIHNldCA9IHNldHRlciwgbSA9IG1vZGlmaWVyLCBtU2V0ID0gbW9kaWZpZXJTZXR0ZXIgKHRoZSBvcmlnaW5hbCBzZXR0ZXIsIGJlZm9yZSBhIG1vZGlmaWVyIHdhcyBhZGRlZClcblxuXG5leHBvcnQgdmFyIFByb3BUd2VlbiA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFByb3BUd2VlbihuZXh0LCB0YXJnZXQsIHByb3AsIHN0YXJ0LCBjaGFuZ2UsIHJlbmRlcmVyLCBkYXRhLCBzZXR0ZXIsIHByaW9yaXR5KSB7XG4gICAgdGhpcy50ID0gdGFyZ2V0O1xuICAgIHRoaXMucyA9IHN0YXJ0O1xuICAgIHRoaXMuYyA9IGNoYW5nZTtcbiAgICB0aGlzLnAgPSBwcm9wO1xuICAgIHRoaXMuciA9IHJlbmRlcmVyIHx8IF9yZW5kZXJQbGFpbjtcbiAgICB0aGlzLmQgPSBkYXRhIHx8IHRoaXM7XG4gICAgdGhpcy5zZXQgPSBzZXR0ZXIgfHwgX3NldHRlclBsYWluO1xuICAgIHRoaXMucHIgPSBwcmlvcml0eSB8fCAwO1xuICAgIHRoaXMuX25leHQgPSBuZXh0O1xuXG4gICAgaWYgKG5leHQpIHtcbiAgICAgIG5leHQuX3ByZXYgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIHZhciBfcHJvdG80ID0gUHJvcFR3ZWVuLnByb3RvdHlwZTtcblxuICBfcHJvdG80Lm1vZGlmaWVyID0gZnVuY3Rpb24gbW9kaWZpZXIoZnVuYywgdHdlZW4sIHRhcmdldCkge1xuICAgIHRoaXMubVNldCA9IHRoaXMubVNldCB8fCB0aGlzLnNldDsgLy9pbiBjYXNlIGl0IHdhcyBhbHJlYWR5IHNldCAoYSBQcm9wVHdlZW4gY2FuIG9ubHkgaGF2ZSBvbmUgbW9kaWZpZXIpXG5cbiAgICB0aGlzLnNldCA9IF9zZXR0ZXJXaXRoTW9kaWZpZXI7XG4gICAgdGhpcy5tID0gZnVuYztcbiAgICB0aGlzLm10ID0gdGFyZ2V0OyAvL21vZGlmaWVyIHRhcmdldFxuXG4gICAgdGhpcy50d2VlbiA9IHR3ZWVuO1xuICB9O1xuXG4gIHJldHVybiBQcm9wVHdlZW47XG59KCk7IC8vSW5pdGlhbGl6YXRpb24gdGFza3NcblxuX2ZvckVhY2hOYW1lKF9jYWxsYmFja05hbWVzICsgXCJwYXJlbnQsZHVyYXRpb24sZWFzZSxkZWxheSxvdmVyd3JpdGUscnVuQmFja3dhcmRzLHN0YXJ0QXQseW95byxpbW1lZGlhdGVSZW5kZXIscmVwZWF0LHJlcGVhdERlbGF5LGRhdGEscGF1c2VkLHJldmVyc2VkLGxhenksY2FsbGJhY2tTY29wZSxzdHJpbmdGaWx0ZXIsaWQseW95b0Vhc2Usc3RhZ2dlcixpbmhlcml0LHJlcGVhdFJlZnJlc2gsa2V5ZnJhbWVzLGF1dG9SZXZlcnQsc2Nyb2xsVHJpZ2dlclwiLCBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gX3Jlc2VydmVkUHJvcHNbbmFtZV0gPSAxO1xufSk7XG5cbl9nbG9iYWxzLlR3ZWVuTWF4ID0gX2dsb2JhbHMuVHdlZW5MaXRlID0gVHdlZW47XG5fZ2xvYmFscy5UaW1lbGluZUxpdGUgPSBfZ2xvYmFscy5UaW1lbGluZU1heCA9IFRpbWVsaW5lO1xuX2dsb2JhbFRpbWVsaW5lID0gbmV3IFRpbWVsaW5lKHtcbiAgc29ydENoaWxkcmVuOiBmYWxzZSxcbiAgZGVmYXVsdHM6IF9kZWZhdWx0cyxcbiAgYXV0b1JlbW92ZUNoaWxkcmVuOiB0cnVlLFxuICBpZDogXCJyb290XCIsXG4gIHNtb290aENoaWxkVGltaW5nOiB0cnVlXG59KTtcbl9jb25maWcuc3RyaW5nRmlsdGVyID0gX2NvbG9yU3RyaW5nRmlsdGVyO1xuXG52YXIgX21lZGlhID0gW10sXG4gICAgX2xpc3RlbmVycyA9IHt9LFxuICAgIF9lbXB0eUFycmF5ID0gW10sXG4gICAgX2xhc3RNZWRpYVRpbWUgPSAwLFxuICAgIF9kaXNwYXRjaCA9IGZ1bmN0aW9uIF9kaXNwYXRjaCh0eXBlKSB7XG4gIHJldHVybiAoX2xpc3RlbmVyc1t0eXBlXSB8fCBfZW1wdHlBcnJheSkubWFwKGZ1bmN0aW9uIChmKSB7XG4gICAgcmV0dXJuIGYoKTtcbiAgfSk7XG59LFxuICAgIF9vbk1lZGlhQ2hhbmdlID0gZnVuY3Rpb24gX29uTWVkaWFDaGFuZ2UoKSB7XG4gIHZhciB0aW1lID0gRGF0ZS5ub3coKSxcbiAgICAgIG1hdGNoZXMgPSBbXTtcblxuICBpZiAodGltZSAtIF9sYXN0TWVkaWFUaW1lID4gMikge1xuICAgIF9kaXNwYXRjaChcIm1hdGNoTWVkaWFJbml0XCIpO1xuXG4gICAgX21lZGlhLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgIHZhciBxdWVyaWVzID0gYy5xdWVyaWVzLFxuICAgICAgICAgIGNvbmRpdGlvbnMgPSBjLmNvbmRpdGlvbnMsXG4gICAgICAgICAgbWF0Y2gsXG4gICAgICAgICAgcCxcbiAgICAgICAgICBhbnlNYXRjaCxcbiAgICAgICAgICB0b2dnbGVkO1xuXG4gICAgICBmb3IgKHAgaW4gcXVlcmllcykge1xuICAgICAgICBtYXRjaCA9IF93aW4ubWF0Y2hNZWRpYShxdWVyaWVzW3BdKS5tYXRjaGVzOyAvLyBGaXJlZm94IGRvZXNuJ3QgdXBkYXRlIHRoZSBcIm1hdGNoZXNcIiBwcm9wZXJ0eSBvZiB0aGUgTWVkaWFRdWVyeUxpc3Qgb2JqZWN0IGNvcnJlY3RseSAtIGl0IG9ubHkgZG9lcyBzbyBhcyBpdCBjYWxscyBpdHMgY2hhbmdlIGhhbmRsZXIgLSBzbyB3ZSBtdXN0IHJlLWNyZWF0ZSBhIG1lZGlhIHF1ZXJ5IGhlcmUgdG8gZW5zdXJlIGl0J3MgYWNjdXJhdGUuXG5cbiAgICAgICAgbWF0Y2ggJiYgKGFueU1hdGNoID0gMSk7XG5cbiAgICAgICAgaWYgKG1hdGNoICE9PSBjb25kaXRpb25zW3BdKSB7XG4gICAgICAgICAgY29uZGl0aW9uc1twXSA9IG1hdGNoO1xuICAgICAgICAgIHRvZ2dsZWQgPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2dnbGVkKSB7XG4gICAgICAgIGMucmV2ZXJ0KCk7XG4gICAgICAgIGFueU1hdGNoICYmIG1hdGNoZXMucHVzaChjKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIF9kaXNwYXRjaChcIm1hdGNoTWVkaWFSZXZlcnRcIik7XG5cbiAgICBtYXRjaGVzLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgIHJldHVybiBjLm9uTWF0Y2goYyk7XG4gICAgfSk7XG4gICAgX2xhc3RNZWRpYVRpbWUgPSB0aW1lO1xuXG4gICAgX2Rpc3BhdGNoKFwibWF0Y2hNZWRpYVwiKTtcbiAgfVxufTtcblxudmFyIENvbnRleHQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDb250ZXh0KGZ1bmMsIHNjb3BlKSB7XG4gICAgdGhpcy5zZWxlY3RvciA9IHNjb3BlICYmIHNlbGVjdG9yKHNjb3BlKTtcbiAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICB0aGlzLl9yID0gW107IC8vIHJldHVybmVkL2NsZWFudXAgZnVuY3Rpb25zXG5cbiAgICB0aGlzLmlzUmV2ZXJ0ZWQgPSBmYWxzZTtcbiAgICBmdW5jICYmIHRoaXMuYWRkKGZ1bmMpO1xuICB9XG5cbiAgdmFyIF9wcm90bzUgPSBDb250ZXh0LnByb3RvdHlwZTtcblxuICBfcHJvdG81LmFkZCA9IGZ1bmN0aW9uIGFkZChuYW1lLCBmdW5jLCBzY29wZSkge1xuICAgIC8vIHBvc3NpYmxlIGZ1dHVyZSBhZGRpdGlvbiBpZiB3ZSBuZWVkIHRoZSBhYmlsaXR5IHRvIGFkZCgpIGFuIGFuaW1hdGlvbiB0byBhIGNvbnRleHQgYW5kIGZvciB3aGF0ZXZlciByZWFzb24gY2Fubm90IGNyZWF0ZSB0aGF0IGFuaW1hdGlvbiBpbnNpZGUgb2YgYSBjb250ZXh0LmFkZCgoKSA9PiB7Li4ufSkgZnVuY3Rpb24uXG4gICAgLy8gaWYgKG5hbWUgJiYgX2lzRnVuY3Rpb24obmFtZS5yZXZlcnQpKSB7XG4gICAgLy8gXHR0aGlzLmRhdGEucHVzaChuYW1lKTtcbiAgICAvLyBcdHJldHVybiAobmFtZS5fY3R4ID0gdGhpcyk7XG4gICAgLy8gfVxuICAgIGlmIChfaXNGdW5jdGlvbihuYW1lKSkge1xuICAgICAgc2NvcGUgPSBmdW5jO1xuICAgICAgZnVuYyA9IG5hbWU7XG4gICAgICBuYW1lID0gX2lzRnVuY3Rpb247XG4gICAgfVxuXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBmID0gZnVuY3Rpb24gZigpIHtcbiAgICAgIHZhciBwcmV2ID0gX2NvbnRleHQsXG4gICAgICAgICAgcHJldlNlbGVjdG9yID0gc2VsZi5zZWxlY3RvcixcbiAgICAgICAgICByZXN1bHQ7XG4gICAgICBwcmV2ICYmIHByZXYgIT09IHNlbGYgJiYgcHJldi5kYXRhLnB1c2goc2VsZik7XG4gICAgICBzY29wZSAmJiAoc2VsZi5zZWxlY3RvciA9IHNlbGVjdG9yKHNjb3BlKSk7XG4gICAgICBfY29udGV4dCA9IHNlbGY7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICBfaXNGdW5jdGlvbihyZXN1bHQpICYmIHNlbGYuX3IucHVzaChyZXN1bHQpO1xuICAgICAgX2NvbnRleHQgPSBwcmV2O1xuICAgICAgc2VsZi5zZWxlY3RvciA9IHByZXZTZWxlY3RvcjtcbiAgICAgIHNlbGYuaXNSZXZlcnRlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgc2VsZi5sYXN0ID0gZjtcbiAgICByZXR1cm4gbmFtZSA9PT0gX2lzRnVuY3Rpb24gPyBmKHNlbGYpIDogbmFtZSA/IHNlbGZbbmFtZV0gPSBmIDogZjtcbiAgfTtcblxuICBfcHJvdG81Lmlnbm9yZSA9IGZ1bmN0aW9uIGlnbm9yZShmdW5jKSB7XG4gICAgdmFyIHByZXYgPSBfY29udGV4dDtcbiAgICBfY29udGV4dCA9IG51bGw7XG4gICAgZnVuYyh0aGlzKTtcbiAgICBfY29udGV4dCA9IHByZXY7XG4gIH07XG5cbiAgX3Byb3RvNS5nZXRUd2VlbnMgPSBmdW5jdGlvbiBnZXRUd2VlbnMoKSB7XG4gICAgdmFyIGEgPSBbXTtcbiAgICB0aGlzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBDb250ZXh0ID8gYS5wdXNoLmFwcGx5KGEsIGUuZ2V0VHdlZW5zKCkpIDogZSBpbnN0YW5jZW9mIFR3ZWVuICYmICEoZS5wYXJlbnQgJiYgZS5wYXJlbnQuZGF0YSA9PT0gXCJuZXN0ZWRcIikgJiYgYS5wdXNoKGUpO1xuICAgIH0pO1xuICAgIHJldHVybiBhO1xuICB9O1xuXG4gIF9wcm90bzUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICB0aGlzLl9yLmxlbmd0aCA9IHRoaXMuZGF0YS5sZW5ndGggPSAwO1xuICB9O1xuXG4gIF9wcm90bzUua2lsbCA9IGZ1bmN0aW9uIGtpbGwocmV2ZXJ0LCBtYXRjaE1lZGlhKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICBpZiAocmV2ZXJ0KSB7XG4gICAgICB2YXIgdHdlZW5zID0gdGhpcy5nZXRUd2VlbnMoKTtcbiAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIC8vIEZsaXAgcGx1Z2luIHR3ZWVucyBhcmUgdmVyeSBkaWZmZXJlbnQgaW4gdGhhdCB0aGV5IHNob3VsZCBhY3R1YWxseSBiZSBwdXNoZWQgdG8gdGhlaXIgZW5kLiBUaGUgcGx1Z2luIHJlcGxhY2VzIHRoZSB0aW1lbGluZSdzIC5yZXZlcnQoKSBtZXRob2QgdG8gZG8gZXhhY3RseSB0aGF0LiBCdXQgd2UgYWxzbyBuZWVkIHRvIHJlbW92ZSBhbnkgb2YgdGhvc2UgbmVzdGVkIHR3ZWVucyBpbnNpZGUgdGhlIGZsaXAgdGltZWxpbmUgc28gdGhhdCB0aGV5IGRvbid0IGdldCBpbmRpdmlkdWFsbHkgcmV2ZXJ0ZWQuXG4gICAgICAgIGlmICh0LmRhdGEgPT09IFwiaXNGbGlwXCIpIHtcbiAgICAgICAgICB0LnJldmVydCgpO1xuICAgICAgICAgIHQuZ2V0Q2hpbGRyZW4odHJ1ZSwgdHJ1ZSwgZmFsc2UpLmZvckVhY2goZnVuY3Rpb24gKHR3ZWVuKSB7XG4gICAgICAgICAgICByZXR1cm4gdHdlZW5zLnNwbGljZSh0d2VlbnMuaW5kZXhPZih0d2VlbiksIDEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTsgLy8gc2F2ZSBhcyBhbiBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gY2FjaGUgdGhlIGdsb2JhbFRpbWUgZm9yIGVhY2ggdHdlZW4gdG8gb3B0aW1pemUgcGVyZm9ybWFuY2UgZHVyaW5nIHRoZSBzb3J0XG5cbiAgICAgIHR3ZWVucy5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBnOiB0Lmdsb2JhbFRpbWUoMCksXG4gICAgICAgICAgdDogdFxuICAgICAgICB9O1xuICAgICAgfSkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICByZXR1cm4gYi5nIC0gYS5nIHx8IC0xO1xuICAgICAgfSkuZm9yRWFjaChmdW5jdGlvbiAobykge1xuICAgICAgICByZXR1cm4gby50LnJldmVydChyZXZlcnQpO1xuICAgICAgfSk7IC8vIG5vdGU6IGFsbCBvZiB0aGUgX3N0YXJ0QXQgdHdlZW5zIHNob3VsZCBiZSByZXZlcnRlZCBpbiByZXZlcnNlIG9yZGVyIHRoYXQgdGhleSB3ZXJlIGNyZWF0ZWQsIGFuZCB0aGV5J2xsIGFsbCBoYXZlIHRoZSBzYW1lIGdsb2JhbFRpbWUgKC0xKSBzbyB0aGUgXCIgfHwgLTFcIiBpbiB0aGUgc29ydCBrZWVwcyB0aGUgb3JkZXIgcHJvcGVybHkuXG5cbiAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiAhKGUgaW5zdGFuY2VvZiBBbmltYXRpb24pICYmIGUucmV2ZXJ0ICYmIGUucmV2ZXJ0KHJldmVydCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fci5mb3JFYWNoKGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHJldHVybiBmKHJldmVydCwgX3RoaXM0KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmlzUmV2ZXJ0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gZS5raWxsICYmIGUua2lsbCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5jbGVhcigpO1xuXG4gICAgaWYgKG1hdGNoTWVkaWEpIHtcbiAgICAgIHZhciBpID0gX21lZGlhLmluZGV4T2YodGhpcyk7XG5cbiAgICAgICEhfmkgJiYgX21lZGlhLnNwbGljZShpLCAxKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvNS5yZXZlcnQgPSBmdW5jdGlvbiByZXZlcnQoY29uZmlnKSB7XG4gICAgdGhpcy5raWxsKGNvbmZpZyB8fCB7fSk7XG4gIH07XG5cbiAgcmV0dXJuIENvbnRleHQ7XG59KCk7XG5cbnZhciBNYXRjaE1lZGlhID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gTWF0Y2hNZWRpYShzY29wZSkge1xuICAgIHRoaXMuY29udGV4dHMgPSBbXTtcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gIH1cblxuICB2YXIgX3Byb3RvNiA9IE1hdGNoTWVkaWEucHJvdG90eXBlO1xuXG4gIF9wcm90bzYuYWRkID0gZnVuY3Rpb24gYWRkKGNvbmRpdGlvbnMsIGZ1bmMsIHNjb3BlKSB7XG4gICAgX2lzT2JqZWN0KGNvbmRpdGlvbnMpIHx8IChjb25kaXRpb25zID0ge1xuICAgICAgbWF0Y2hlczogY29uZGl0aW9uc1xuICAgIH0pO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQoMCwgc2NvcGUgfHwgdGhpcy5zY29wZSksXG4gICAgICAgIGNvbmQgPSBjb250ZXh0LmNvbmRpdGlvbnMgPSB7fSxcbiAgICAgICAgbXEsXG4gICAgICAgIHAsXG4gICAgICAgIGFjdGl2ZTtcbiAgICB0aGlzLmNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgZnVuYyA9IGNvbnRleHQuYWRkKFwib25NYXRjaFwiLCBmdW5jKTtcbiAgICBjb250ZXh0LnF1ZXJpZXMgPSBjb25kaXRpb25zO1xuXG4gICAgZm9yIChwIGluIGNvbmRpdGlvbnMpIHtcbiAgICAgIGlmIChwID09PSBcImFsbFwiKSB7XG4gICAgICAgIGFjdGl2ZSA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtcSA9IF93aW4ubWF0Y2hNZWRpYShjb25kaXRpb25zW3BdKTtcblxuICAgICAgICBpZiAobXEpIHtcbiAgICAgICAgICBfbWVkaWEuaW5kZXhPZihjb250ZXh0KSA8IDAgJiYgX21lZGlhLnB1c2goY29udGV4dCk7XG4gICAgICAgICAgKGNvbmRbcF0gPSBtcS5tYXRjaGVzKSAmJiAoYWN0aXZlID0gMSk7XG4gICAgICAgICAgbXEuYWRkTGlzdGVuZXIgPyBtcS5hZGRMaXN0ZW5lcihfb25NZWRpYUNoYW5nZSkgOiBtcS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIF9vbk1lZGlhQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGFjdGl2ZSAmJiBmdW5jKGNvbnRleHQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9IC8vIHJlZnJlc2goKSB7XG4gIC8vIFx0bGV0IHRpbWUgPSBfbGFzdE1lZGlhVGltZSxcbiAgLy8gXHRcdG1lZGlhID0gX21lZGlhO1xuICAvLyBcdF9sYXN0TWVkaWFUaW1lID0gLTE7XG4gIC8vIFx0X21lZGlhID0gdGhpcy5jb250ZXh0cztcbiAgLy8gXHRfb25NZWRpYUNoYW5nZSgpO1xuICAvLyBcdF9sYXN0TWVkaWFUaW1lID0gdGltZTtcbiAgLy8gXHRfbWVkaWEgPSBtZWRpYTtcbiAgLy8gfVxuICA7XG5cbiAgX3Byb3RvNi5yZXZlcnQgPSBmdW5jdGlvbiByZXZlcnQoY29uZmlnKSB7XG4gICAgdGhpcy5raWxsKGNvbmZpZyB8fCB7fSk7XG4gIH07XG5cbiAgX3Byb3RvNi5raWxsID0gZnVuY3Rpb24ga2lsbChyZXZlcnQpIHtcbiAgICB0aGlzLmNvbnRleHRzLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgIHJldHVybiBjLmtpbGwocmV2ZXJ0LCB0cnVlKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gTWF0Y2hNZWRpYTtcbn0oKTtcbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogR1NBUFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5cbnZhciBfZ3NhcCA9IHtcbiAgcmVnaXN0ZXJQbHVnaW46IGZ1bmN0aW9uIHJlZ2lzdGVyUGx1Z2luKCkge1xuICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICByZXR1cm4gX2NyZWF0ZVBsdWdpbihjb25maWcpO1xuICAgIH0pO1xuICB9LFxuICB0aW1lbGluZTogZnVuY3Rpb24gdGltZWxpbmUodmFycykge1xuICAgIHJldHVybiBuZXcgVGltZWxpbmUodmFycyk7XG4gIH0sXG4gIGdldFR3ZWVuc09mOiBmdW5jdGlvbiBnZXRUd2VlbnNPZih0YXJnZXRzLCBvbmx5QWN0aXZlKSB7XG4gICAgcmV0dXJuIF9nbG9iYWxUaW1lbGluZS5nZXRUd2VlbnNPZih0YXJnZXRzLCBvbmx5QWN0aXZlKTtcbiAgfSxcbiAgZ2V0UHJvcGVydHk6IGZ1bmN0aW9uIGdldFByb3BlcnR5KHRhcmdldCwgcHJvcGVydHksIHVuaXQsIHVuY2FjaGUpIHtcbiAgICBfaXNTdHJpbmcodGFyZ2V0KSAmJiAodGFyZ2V0ID0gdG9BcnJheSh0YXJnZXQpWzBdKTsgLy9pbiBjYXNlIHNlbGVjdG9yIHRleHQgb3IgYW4gYXJyYXkgaXMgcGFzc2VkIGluXG5cbiAgICB2YXIgZ2V0dGVyID0gX2dldENhY2hlKHRhcmdldCB8fCB7fSkuZ2V0LFxuICAgICAgICBmb3JtYXQgPSB1bml0ID8gX3Bhc3NUaHJvdWdoIDogX251bWVyaWNJZlBvc3NpYmxlO1xuXG4gICAgdW5pdCA9PT0gXCJuYXRpdmVcIiAmJiAodW5pdCA9IFwiXCIpO1xuICAgIHJldHVybiAhdGFyZ2V0ID8gdGFyZ2V0IDogIXByb3BlcnR5ID8gZnVuY3Rpb24gKHByb3BlcnR5LCB1bml0LCB1bmNhY2hlKSB7XG4gICAgICByZXR1cm4gZm9ybWF0KChfcGx1Z2luc1twcm9wZXJ0eV0gJiYgX3BsdWdpbnNbcHJvcGVydHldLmdldCB8fCBnZXR0ZXIpKHRhcmdldCwgcHJvcGVydHksIHVuaXQsIHVuY2FjaGUpKTtcbiAgICB9IDogZm9ybWF0KChfcGx1Z2luc1twcm9wZXJ0eV0gJiYgX3BsdWdpbnNbcHJvcGVydHldLmdldCB8fCBnZXR0ZXIpKHRhcmdldCwgcHJvcGVydHksIHVuaXQsIHVuY2FjaGUpKTtcbiAgfSxcbiAgcXVpY2tTZXR0ZXI6IGZ1bmN0aW9uIHF1aWNrU2V0dGVyKHRhcmdldCwgcHJvcGVydHksIHVuaXQpIHtcbiAgICB0YXJnZXQgPSB0b0FycmF5KHRhcmdldCk7XG5cbiAgICBpZiAodGFyZ2V0Lmxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBzZXR0ZXJzID0gdGFyZ2V0Lm1hcChmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gZ3NhcC5xdWlja1NldHRlcih0LCBwcm9wZXJ0eSwgdW5pdCk7XG4gICAgICB9KSxcbiAgICAgICAgICBsID0gc2V0dGVycy5sZW5ndGg7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBpID0gbDtcblxuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgc2V0dGVyc1tpXSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGFyZ2V0ID0gdGFyZ2V0WzBdIHx8IHt9O1xuXG4gICAgdmFyIFBsdWdpbiA9IF9wbHVnaW5zW3Byb3BlcnR5XSxcbiAgICAgICAgY2FjaGUgPSBfZ2V0Q2FjaGUodGFyZ2V0KSxcbiAgICAgICAgcCA9IGNhY2hlLmhhcm5lc3MgJiYgKGNhY2hlLmhhcm5lc3MuYWxpYXNlcyB8fCB7fSlbcHJvcGVydHldIHx8IHByb3BlcnR5LFxuICAgICAgICAvLyBpbiBjYXNlIGl0J3MgYW4gYWxpYXMsIGxpa2UgXCJyb3RhdGVcIiBmb3IgXCJyb3RhdGlvblwiLlxuICAgIHNldHRlciA9IFBsdWdpbiA/IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgdmFyIHAgPSBuZXcgUGx1Z2luKCk7XG4gICAgICBfcXVpY2tUd2Vlbi5fcHQgPSAwO1xuICAgICAgcC5pbml0KHRhcmdldCwgdW5pdCA/IHZhbHVlICsgdW5pdCA6IHZhbHVlLCBfcXVpY2tUd2VlbiwgMCwgW3RhcmdldF0pO1xuICAgICAgcC5yZW5kZXIoMSwgcCk7XG4gICAgICBfcXVpY2tUd2Vlbi5fcHQgJiYgX3JlbmRlclByb3BUd2VlbnMoMSwgX3F1aWNrVHdlZW4pO1xuICAgIH0gOiBjYWNoZS5zZXQodGFyZ2V0LCBwKTtcblxuICAgIHJldHVybiBQbHVnaW4gPyBzZXR0ZXIgOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBzZXR0ZXIodGFyZ2V0LCBwLCB1bml0ID8gdmFsdWUgKyB1bml0IDogdmFsdWUsIGNhY2hlLCAxKTtcbiAgICB9O1xuICB9LFxuICBxdWlja1RvOiBmdW5jdGlvbiBxdWlja1RvKHRhcmdldCwgcHJvcGVydHksIHZhcnMpIHtcbiAgICB2YXIgX21lcmdlMjtcblxuICAgIHZhciB0d2VlbiA9IGdzYXAudG8odGFyZ2V0LCBfbWVyZ2UoKF9tZXJnZTIgPSB7fSwgX21lcmdlMltwcm9wZXJ0eV0gPSBcIis9MC4xXCIsIF9tZXJnZTIucGF1c2VkID0gdHJ1ZSwgX21lcmdlMiksIHZhcnMgfHwge30pKSxcbiAgICAgICAgZnVuYyA9IGZ1bmN0aW9uIGZ1bmModmFsdWUsIHN0YXJ0LCBzdGFydElzUmVsYXRpdmUpIHtcbiAgICAgIHJldHVybiB0d2Vlbi5yZXNldFRvKHByb3BlcnR5LCB2YWx1ZSwgc3RhcnQsIHN0YXJ0SXNSZWxhdGl2ZSk7XG4gICAgfTtcblxuICAgIGZ1bmMudHdlZW4gPSB0d2VlbjtcbiAgICByZXR1cm4gZnVuYztcbiAgfSxcbiAgaXNUd2VlbmluZzogZnVuY3Rpb24gaXNUd2VlbmluZyh0YXJnZXRzKSB7XG4gICAgcmV0dXJuIF9nbG9iYWxUaW1lbGluZS5nZXRUd2VlbnNPZih0YXJnZXRzLCB0cnVlKS5sZW5ndGggPiAwO1xuICB9LFxuICBkZWZhdWx0czogZnVuY3Rpb24gZGVmYXVsdHModmFsdWUpIHtcbiAgICB2YWx1ZSAmJiB2YWx1ZS5lYXNlICYmICh2YWx1ZS5lYXNlID0gX3BhcnNlRWFzZSh2YWx1ZS5lYXNlLCBfZGVmYXVsdHMuZWFzZSkpO1xuICAgIHJldHVybiBfbWVyZ2VEZWVwKF9kZWZhdWx0cywgdmFsdWUgfHwge30pO1xuICB9LFxuICBjb25maWc6IGZ1bmN0aW9uIGNvbmZpZyh2YWx1ZSkge1xuICAgIHJldHVybiBfbWVyZ2VEZWVwKF9jb25maWcsIHZhbHVlIHx8IHt9KTtcbiAgfSxcbiAgcmVnaXN0ZXJFZmZlY3Q6IGZ1bmN0aW9uIHJlZ2lzdGVyRWZmZWN0KF9yZWYzKSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmMy5uYW1lLFxuICAgICAgICBlZmZlY3QgPSBfcmVmMy5lZmZlY3QsXG4gICAgICAgIHBsdWdpbnMgPSBfcmVmMy5wbHVnaW5zLFxuICAgICAgICBkZWZhdWx0cyA9IF9yZWYzLmRlZmF1bHRzLFxuICAgICAgICBleHRlbmRUaW1lbGluZSA9IF9yZWYzLmV4dGVuZFRpbWVsaW5lO1xuICAgIChwbHVnaW5zIHx8IFwiXCIpLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW5OYW1lKSB7XG4gICAgICByZXR1cm4gcGx1Z2luTmFtZSAmJiAhX3BsdWdpbnNbcGx1Z2luTmFtZV0gJiYgIV9nbG9iYWxzW3BsdWdpbk5hbWVdICYmIF93YXJuKG5hbWUgKyBcIiBlZmZlY3QgcmVxdWlyZXMgXCIgKyBwbHVnaW5OYW1lICsgXCIgcGx1Z2luLlwiKTtcbiAgICB9KTtcblxuICAgIF9lZmZlY3RzW25hbWVdID0gZnVuY3Rpb24gKHRhcmdldHMsIHZhcnMsIHRsKSB7XG4gICAgICByZXR1cm4gZWZmZWN0KHRvQXJyYXkodGFyZ2V0cyksIF9zZXREZWZhdWx0cyh2YXJzIHx8IHt9LCBkZWZhdWx0cyksIHRsKTtcbiAgICB9O1xuXG4gICAgaWYgKGV4dGVuZFRpbWVsaW5lKSB7XG4gICAgICBUaW1lbGluZS5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbiAodGFyZ2V0cywgdmFycywgcG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkKF9lZmZlY3RzW25hbWVdKHRhcmdldHMsIF9pc09iamVjdCh2YXJzKSA/IHZhcnMgOiAocG9zaXRpb24gPSB2YXJzKSAmJiB7fSwgdGhpcyksIHBvc2l0aW9uKTtcbiAgICAgIH07XG4gICAgfVxuICB9LFxuICByZWdpc3RlckVhc2U6IGZ1bmN0aW9uIHJlZ2lzdGVyRWFzZShuYW1lLCBlYXNlKSB7XG4gICAgX2Vhc2VNYXBbbmFtZV0gPSBfcGFyc2VFYXNlKGVhc2UpO1xuICB9LFxuICBwYXJzZUVhc2U6IGZ1bmN0aW9uIHBhcnNlRWFzZShlYXNlLCBkZWZhdWx0RWFzZSkge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gX3BhcnNlRWFzZShlYXNlLCBkZWZhdWx0RWFzZSkgOiBfZWFzZU1hcDtcbiAgfSxcbiAgZ2V0QnlJZDogZnVuY3Rpb24gZ2V0QnlJZChpZCkge1xuICAgIHJldHVybiBfZ2xvYmFsVGltZWxpbmUuZ2V0QnlJZChpZCk7XG4gIH0sXG4gIGV4cG9ydFJvb3Q6IGZ1bmN0aW9uIGV4cG9ydFJvb3QodmFycywgaW5jbHVkZURlbGF5ZWRDYWxscykge1xuICAgIGlmICh2YXJzID09PSB2b2lkIDApIHtcbiAgICAgIHZhcnMgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgdGwgPSBuZXcgVGltZWxpbmUodmFycyksXG4gICAgICAgIGNoaWxkLFxuICAgICAgICBuZXh0O1xuICAgIHRsLnNtb290aENoaWxkVGltaW5nID0gX2lzTm90RmFsc2UodmFycy5zbW9vdGhDaGlsZFRpbWluZyk7XG5cbiAgICBfZ2xvYmFsVGltZWxpbmUucmVtb3ZlKHRsKTtcblxuICAgIHRsLl9kcCA9IDA7IC8vb3RoZXJ3aXNlIGl0J2xsIGdldCByZS1hY3RpdmF0ZWQgd2hlbiBhZGRpbmcgY2hpbGRyZW4gYW5kIGJlIHJlLWludHJvZHVjZWQgaW50byBfZ2xvYmFsVGltZWxpbmUncyBsaW5rZWQgbGlzdCAodGhlbiBhZGRlZCB0byBpdHNlbGYpLlxuXG4gICAgdGwuX3RpbWUgPSB0bC5fdFRpbWUgPSBfZ2xvYmFsVGltZWxpbmUuX3RpbWU7XG4gICAgY2hpbGQgPSBfZ2xvYmFsVGltZWxpbmUuX2ZpcnN0O1xuXG4gICAgd2hpbGUgKGNoaWxkKSB7XG4gICAgICBuZXh0ID0gY2hpbGQuX25leHQ7XG5cbiAgICAgIGlmIChpbmNsdWRlRGVsYXllZENhbGxzIHx8ICEoIWNoaWxkLl9kdXIgJiYgY2hpbGQgaW5zdGFuY2VvZiBUd2VlbiAmJiBjaGlsZC52YXJzLm9uQ29tcGxldGUgPT09IGNoaWxkLl90YXJnZXRzWzBdKSkge1xuICAgICAgICBfYWRkVG9UaW1lbGluZSh0bCwgY2hpbGQsIGNoaWxkLl9zdGFydCAtIGNoaWxkLl9kZWxheSk7XG4gICAgICB9XG5cbiAgICAgIGNoaWxkID0gbmV4dDtcbiAgICB9XG5cbiAgICBfYWRkVG9UaW1lbGluZShfZ2xvYmFsVGltZWxpbmUsIHRsLCAwKTtcblxuICAgIHJldHVybiB0bDtcbiAgfSxcbiAgY29udGV4dDogZnVuY3Rpb24gY29udGV4dChmdW5jLCBzY29wZSkge1xuICAgIHJldHVybiBmdW5jID8gbmV3IENvbnRleHQoZnVuYywgc2NvcGUpIDogX2NvbnRleHQ7XG4gIH0sXG4gIG1hdGNoTWVkaWE6IGZ1bmN0aW9uIG1hdGNoTWVkaWEoc2NvcGUpIHtcbiAgICByZXR1cm4gbmV3IE1hdGNoTWVkaWEoc2NvcGUpO1xuICB9LFxuICBtYXRjaE1lZGlhUmVmcmVzaDogZnVuY3Rpb24gbWF0Y2hNZWRpYVJlZnJlc2goKSB7XG4gICAgcmV0dXJuIF9tZWRpYS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICB2YXIgY29uZCA9IGMuY29uZGl0aW9ucyxcbiAgICAgICAgICBmb3VuZCxcbiAgICAgICAgICBwO1xuXG4gICAgICBmb3IgKHAgaW4gY29uZCkge1xuICAgICAgICBpZiAoY29uZFtwXSkge1xuICAgICAgICAgIGNvbmRbcF0gPSBmYWxzZTtcbiAgICAgICAgICBmb3VuZCA9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm91bmQgJiYgYy5yZXZlcnQoKTtcbiAgICB9KSB8fCBfb25NZWRpYUNoYW5nZSgpO1xuICB9LFxuICBhZGRFdmVudExpc3RlbmVyOiBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGEgPSBfbGlzdGVuZXJzW3R5cGVdIHx8IChfbGlzdGVuZXJzW3R5cGVdID0gW10pO1xuICAgIH5hLmluZGV4T2YoY2FsbGJhY2spIHx8IGEucHVzaChjYWxsYmFjayk7XG4gIH0sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgYSA9IF9saXN0ZW5lcnNbdHlwZV0sXG4gICAgICAgIGkgPSBhICYmIGEuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgaSA+PSAwICYmIGEuc3BsaWNlKGksIDEpO1xuICB9LFxuICB1dGlsczoge1xuICAgIHdyYXA6IHdyYXAsXG4gICAgd3JhcFlveW86IHdyYXBZb3lvLFxuICAgIGRpc3RyaWJ1dGU6IGRpc3RyaWJ1dGUsXG4gICAgcmFuZG9tOiByYW5kb20sXG4gICAgc25hcDogc25hcCxcbiAgICBub3JtYWxpemU6IG5vcm1hbGl6ZSxcbiAgICBnZXRVbml0OiBnZXRVbml0LFxuICAgIGNsYW1wOiBjbGFtcCxcbiAgICBzcGxpdENvbG9yOiBzcGxpdENvbG9yLFxuICAgIHRvQXJyYXk6IHRvQXJyYXksXG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIG1hcFJhbmdlOiBtYXBSYW5nZSxcbiAgICBwaXBlOiBwaXBlLFxuICAgIHVuaXRpemU6IHVuaXRpemUsXG4gICAgaW50ZXJwb2xhdGU6IGludGVycG9sYXRlLFxuICAgIHNodWZmbGU6IHNodWZmbGVcbiAgfSxcbiAgaW5zdGFsbDogX2luc3RhbGwsXG4gIGVmZmVjdHM6IF9lZmZlY3RzLFxuICB0aWNrZXI6IF90aWNrZXIsXG4gIHVwZGF0ZVJvb3Q6IFRpbWVsaW5lLnVwZGF0ZVJvb3QsXG4gIHBsdWdpbnM6IF9wbHVnaW5zLFxuICBnbG9iYWxUaW1lbGluZTogX2dsb2JhbFRpbWVsaW5lLFxuICBjb3JlOiB7XG4gICAgUHJvcFR3ZWVuOiBQcm9wVHdlZW4sXG4gICAgZ2xvYmFsczogX2FkZEdsb2JhbCxcbiAgICBUd2VlbjogVHdlZW4sXG4gICAgVGltZWxpbmU6IFRpbWVsaW5lLFxuICAgIEFuaW1hdGlvbjogQW5pbWF0aW9uLFxuICAgIGdldENhY2hlOiBfZ2V0Q2FjaGUsXG4gICAgX3JlbW92ZUxpbmtlZExpc3RJdGVtOiBfcmVtb3ZlTGlua2VkTGlzdEl0ZW0sXG4gICAgcmV2ZXJ0aW5nOiBmdW5jdGlvbiByZXZlcnRpbmcoKSB7XG4gICAgICByZXR1cm4gX3JldmVydGluZztcbiAgICB9LFxuICAgIGNvbnRleHQ6IGZ1bmN0aW9uIGNvbnRleHQodG9BZGQpIHtcbiAgICAgIGlmICh0b0FkZCAmJiBfY29udGV4dCkge1xuICAgICAgICBfY29udGV4dC5kYXRhLnB1c2godG9BZGQpO1xuXG4gICAgICAgIHRvQWRkLl9jdHggPSBfY29udGV4dDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIF9jb250ZXh0O1xuICAgIH0sXG4gICAgc3VwcHJlc3NPdmVyd3JpdGVzOiBmdW5jdGlvbiBzdXBwcmVzc092ZXJ3cml0ZXModmFsdWUpIHtcbiAgICAgIHJldHVybiBfc3VwcHJlc3NPdmVyd3JpdGVzID0gdmFsdWU7XG4gICAgfVxuICB9XG59O1xuXG5fZm9yRWFjaE5hbWUoXCJ0byxmcm9tLGZyb21UbyxkZWxheWVkQ2FsbCxzZXQsa2lsbFR3ZWVuc09mXCIsIGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBfZ3NhcFtuYW1lXSA9IFR3ZWVuW25hbWVdO1xufSk7XG5cbl90aWNrZXIuYWRkKFRpbWVsaW5lLnVwZGF0ZVJvb3QpO1xuXG5fcXVpY2tUd2VlbiA9IF9nc2FwLnRvKHt9LCB7XG4gIGR1cmF0aW9uOiAwXG59KTsgLy8gLS0tLSBFWFRSQSBQTFVHSU5TIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBfZ2V0UGx1Z2luUHJvcFR3ZWVuID0gZnVuY3Rpb24gX2dldFBsdWdpblByb3BUd2VlbihwbHVnaW4sIHByb3ApIHtcbiAgdmFyIHB0ID0gcGx1Z2luLl9wdDtcblxuICB3aGlsZSAocHQgJiYgcHQucCAhPT0gcHJvcCAmJiBwdC5vcCAhPT0gcHJvcCAmJiBwdC5mcCAhPT0gcHJvcCkge1xuICAgIHB0ID0gcHQuX25leHQ7XG4gIH1cblxuICByZXR1cm4gcHQ7XG59LFxuICAgIF9hZGRNb2RpZmllcnMgPSBmdW5jdGlvbiBfYWRkTW9kaWZpZXJzKHR3ZWVuLCBtb2RpZmllcnMpIHtcbiAgdmFyIHRhcmdldHMgPSB0d2Vlbi5fdGFyZ2V0cyxcbiAgICAgIHAsXG4gICAgICBpLFxuICAgICAgcHQ7XG5cbiAgZm9yIChwIGluIG1vZGlmaWVycykge1xuICAgIGkgPSB0YXJnZXRzLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHB0ID0gdHdlZW4uX3B0TG9va3VwW2ldW3BdO1xuXG4gICAgICBpZiAocHQgJiYgKHB0ID0gcHQuZCkpIHtcbiAgICAgICAgaWYgKHB0Ll9wdCkge1xuICAgICAgICAgIC8vIGlzIGEgcGx1Z2luXG4gICAgICAgICAgcHQgPSBfZ2V0UGx1Z2luUHJvcFR3ZWVuKHB0LCBwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB0ICYmIHB0Lm1vZGlmaWVyICYmIHB0Lm1vZGlmaWVyKG1vZGlmaWVyc1twXSwgdHdlZW4sIHRhcmdldHNbaV0sIHApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSxcbiAgICBfYnVpbGRNb2RpZmllclBsdWdpbiA9IGZ1bmN0aW9uIF9idWlsZE1vZGlmaWVyUGx1Z2luKG5hbWUsIG1vZGlmaWVyKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbmFtZSxcbiAgICByYXdWYXJzOiAxLFxuICAgIC8vZG9uJ3QgcHJlLXByb2Nlc3MgZnVuY3Rpb24tYmFzZWQgdmFsdWVzIG9yIFwicmFuZG9tKClcIiBzdHJpbmdzLlxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQodGFyZ2V0LCB2YXJzLCB0d2Vlbikge1xuICAgICAgdHdlZW4uX29uSW5pdCA9IGZ1bmN0aW9uICh0d2Vlbikge1xuICAgICAgICB2YXIgdGVtcCwgcDtcblxuICAgICAgICBpZiAoX2lzU3RyaW5nKHZhcnMpKSB7XG4gICAgICAgICAgdGVtcCA9IHt9O1xuXG4gICAgICAgICAgX2ZvckVhY2hOYW1lKHZhcnMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGVtcFtuYW1lXSA9IDE7XG4gICAgICAgICAgfSk7IC8vaWYgdGhlIHVzZXIgcGFzc2VzIGluIGEgY29tbWEtZGVsaW1pdGVkIGxpc3Qgb2YgcHJvcGVydHkgbmFtZXMgdG8gcm91bmRQcm9wcywgbGlrZSBcIngseVwiLCB3ZSByb3VuZCB0byB3aG9sZSBudW1iZXJzLlxuXG5cbiAgICAgICAgICB2YXJzID0gdGVtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2RpZmllcikge1xuICAgICAgICAgIHRlbXAgPSB7fTtcblxuICAgICAgICAgIGZvciAocCBpbiB2YXJzKSB7XG4gICAgICAgICAgICB0ZW1wW3BdID0gbW9kaWZpZXIodmFyc1twXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFycyA9IHRlbXA7XG4gICAgICAgIH1cblxuICAgICAgICBfYWRkTW9kaWZpZXJzKHR3ZWVuLCB2YXJzKTtcbiAgICAgIH07XG4gICAgfVxuICB9O1xufTsgLy9yZWdpc3RlciBjb3JlIHBsdWdpbnNcblxuXG5leHBvcnQgdmFyIGdzYXAgPSBfZ3NhcC5yZWdpc3RlclBsdWdpbih7XG4gIG5hbWU6IFwiYXR0clwiLFxuICBpbml0OiBmdW5jdGlvbiBpbml0KHRhcmdldCwgdmFycywgdHdlZW4sIGluZGV4LCB0YXJnZXRzKSB7XG4gICAgdmFyIHAsIHB0LCB2O1xuICAgIHRoaXMudHdlZW4gPSB0d2VlbjtcblxuICAgIGZvciAocCBpbiB2YXJzKSB7XG4gICAgICB2ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShwKSB8fCBcIlwiO1xuICAgICAgcHQgPSB0aGlzLmFkZCh0YXJnZXQsIFwic2V0QXR0cmlidXRlXCIsICh2IHx8IDApICsgXCJcIiwgdmFyc1twXSwgaW5kZXgsIHRhcmdldHMsIDAsIDAsIHApO1xuICAgICAgcHQub3AgPSBwO1xuICAgICAgcHQuYiA9IHY7IC8vIHJlY29yZCB0aGUgYmVnaW5uaW5nIHZhbHVlIHNvIHdlIGNhbiByZXZlcnQoKVxuXG4gICAgICB0aGlzLl9wcm9wcy5wdXNoKHApO1xuICAgIH1cbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIocmF0aW8sIGRhdGEpIHtcbiAgICB2YXIgcHQgPSBkYXRhLl9wdDtcblxuICAgIHdoaWxlIChwdCkge1xuICAgICAgX3JldmVydGluZyA/IHB0LnNldChwdC50LCBwdC5wLCBwdC5iLCBwdCkgOiBwdC5yKHJhdGlvLCBwdC5kKTsgLy8gaWYgcmV2ZXJ0aW5nLCBnbyBiYWNrIHRvIHRoZSBvcmlnaW5hbCAocHQuYilcblxuICAgICAgcHQgPSBwdC5fbmV4dDtcbiAgICB9XG4gIH1cbn0sIHtcbiAgbmFtZTogXCJlbmRBcnJheVwiLFxuICBpbml0OiBmdW5jdGlvbiBpbml0KHRhcmdldCwgdmFsdWUpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmxlbmd0aDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMuYWRkKHRhcmdldCwgaSwgdGFyZ2V0W2ldIHx8IDAsIHZhbHVlW2ldLCAwLCAwLCAwLCAwLCAwLCAxKTtcbiAgICB9XG4gIH1cbn0sIF9idWlsZE1vZGlmaWVyUGx1Z2luKFwicm91bmRQcm9wc1wiLCBfcm91bmRNb2RpZmllciksIF9idWlsZE1vZGlmaWVyUGx1Z2luKFwibW9kaWZpZXJzXCIpLCBfYnVpbGRNb2RpZmllclBsdWdpbihcInNuYXBcIiwgc25hcCkpIHx8IF9nc2FwOyAvL3RvIHByZXZlbnQgdGhlIGNvcmUgcGx1Z2lucyBmcm9tIGJlaW5nIGRyb3BwZWQgdmlhIGFnZ3Jlc3NpdmUgdHJlZSBzaGFraW5nLCB3ZSBtdXN0IGluY2x1ZGUgdGhlbSBpbiB0aGUgdmFyaWFibGUgZGVjbGFyYXRpb24gaW4gdGhpcyB3YXkuXG5cblR3ZWVuLnZlcnNpb24gPSBUaW1lbGluZS52ZXJzaW9uID0gZ3NhcC52ZXJzaW9uID0gXCIzLjExLjVcIjtcbl9jb3JlUmVhZHkgPSAxO1xuX3dpbmRvd0V4aXN0cygpICYmIF93YWtlKCk7XG52YXIgUG93ZXIwID0gX2Vhc2VNYXAuUG93ZXIwLFxuICAgIFBvd2VyMSA9IF9lYXNlTWFwLlBvd2VyMSxcbiAgICBQb3dlcjIgPSBfZWFzZU1hcC5Qb3dlcjIsXG4gICAgUG93ZXIzID0gX2Vhc2VNYXAuUG93ZXIzLFxuICAgIFBvd2VyNCA9IF9lYXNlTWFwLlBvd2VyNCxcbiAgICBMaW5lYXIgPSBfZWFzZU1hcC5MaW5lYXIsXG4gICAgUXVhZCA9IF9lYXNlTWFwLlF1YWQsXG4gICAgQ3ViaWMgPSBfZWFzZU1hcC5DdWJpYyxcbiAgICBRdWFydCA9IF9lYXNlTWFwLlF1YXJ0LFxuICAgIFF1aW50ID0gX2Vhc2VNYXAuUXVpbnQsXG4gICAgU3Ryb25nID0gX2Vhc2VNYXAuU3Ryb25nLFxuICAgIEVsYXN0aWMgPSBfZWFzZU1hcC5FbGFzdGljLFxuICAgIEJhY2sgPSBfZWFzZU1hcC5CYWNrLFxuICAgIFN0ZXBwZWRFYXNlID0gX2Vhc2VNYXAuU3RlcHBlZEVhc2UsXG4gICAgQm91bmNlID0gX2Vhc2VNYXAuQm91bmNlLFxuICAgIFNpbmUgPSBfZWFzZU1hcC5TaW5lLFxuICAgIEV4cG8gPSBfZWFzZU1hcC5FeHBvLFxuICAgIENpcmMgPSBfZWFzZU1hcC5DaXJjO1xuZXhwb3J0IHsgUG93ZXIwLCBQb3dlcjEsIFBvd2VyMiwgUG93ZXIzLCBQb3dlcjQsIExpbmVhciwgUXVhZCwgQ3ViaWMsIFF1YXJ0LCBRdWludCwgU3Ryb25nLCBFbGFzdGljLCBCYWNrLCBTdGVwcGVkRWFzZSwgQm91bmNlLCBTaW5lLCBFeHBvLCBDaXJjIH07XG5leHBvcnQgeyBUd2VlbiBhcyBUd2Vlbk1heCwgVHdlZW4gYXMgVHdlZW5MaXRlLCBUaW1lbGluZSBhcyBUaW1lbGluZU1heCwgVGltZWxpbmUgYXMgVGltZWxpbmVMaXRlLCBnc2FwIGFzIGRlZmF1bHQsIHdyYXAsIHdyYXBZb3lvLCBkaXN0cmlidXRlLCByYW5kb20sIHNuYXAsIG5vcm1hbGl6ZSwgZ2V0VW5pdCwgY2xhbXAsIHNwbGl0Q29sb3IsIHRvQXJyYXksIHNlbGVjdG9yLCBtYXBSYW5nZSwgcGlwZSwgdW5pdGl6ZSwgaW50ZXJwb2xhdGUsIHNodWZmbGUgfTsgLy9leHBvcnQgc29tZSBpbnRlcm5hbCBtZXRob2RzL29yb2plY3RzIGZvciB1c2UgaW4gQ1NTUGx1Z2luIHNvIHRoYXQgd2UgY2FuIGV4dGVybmFsaXplIHRoYXQgZmlsZSBhbmQgYWxsb3cgY3VzdG9tIGJ1aWxkcyB0aGF0IGV4Y2x1ZGUgaXQuXG5cbmV4cG9ydCB7IF9nZXRQcm9wZXJ0eSwgX251bUV4cCwgX251bVdpdGhVbml0RXhwLCBfaXNTdHJpbmcsIF9pc1VuZGVmaW5lZCwgX3JlbmRlckNvbXBsZXhTdHJpbmcsIF9yZWxFeHAsIF9zZXREZWZhdWx0cywgX3JlbW92ZUxpbmtlZExpc3RJdGVtLCBfZm9yRWFjaE5hbWUsIF9zb3J0UHJvcFR3ZWVuc0J5UHJpb3JpdHksIF9jb2xvclN0cmluZ0ZpbHRlciwgX3JlcGxhY2VSYW5kb20sIF9jaGVja1BsdWdpbiwgX3BsdWdpbnMsIF90aWNrZXIsIF9jb25maWcsIF9yb3VuZE1vZGlmaWVyLCBfcm91bmQsIF9taXNzaW5nUGx1Z2luLCBfZ2V0U2V0dGVyLCBfZ2V0Q2FjaGUsIF9jb2xvckV4cCwgX3BhcnNlUmVsYXRpdmUgfTsiLCJpbXBvcnQgeyBnc2FwLCBQb3dlcjAsIFBvd2VyMSwgUG93ZXIyLCBQb3dlcjMsIFBvd2VyNCwgTGluZWFyLCBRdWFkLCBDdWJpYywgUXVhcnQsIFF1aW50LCBTdHJvbmcsIEVsYXN0aWMsIEJhY2ssIFN0ZXBwZWRFYXNlLCBCb3VuY2UsIFNpbmUsIEV4cG8sIENpcmMsIFR3ZWVuTGl0ZSwgVGltZWxpbmVMaXRlLCBUaW1lbGluZU1heCB9IGZyb20gXCIuL2dzYXAtY29yZS5qc1wiO1xuaW1wb3J0IHsgQ1NTUGx1Z2luIH0gZnJvbSBcIi4vQ1NTUGx1Z2luLmpzXCI7XG52YXIgZ3NhcFdpdGhDU1MgPSBnc2FwLnJlZ2lzdGVyUGx1Z2luKENTU1BsdWdpbikgfHwgZ3NhcCxcbiAgICAvLyB0byBwcm90ZWN0IGZyb20gdHJlZSBzaGFraW5nXG5Ud2Vlbk1heFdpdGhDU1MgPSBnc2FwV2l0aENTUy5jb3JlLlR3ZWVuO1xuZXhwb3J0IHsgZ3NhcFdpdGhDU1MgYXMgZ3NhcCwgZ3NhcFdpdGhDU1MgYXMgZGVmYXVsdCwgQ1NTUGx1Z2luLCBUd2Vlbk1heFdpdGhDU1MgYXMgVHdlZW5NYXgsIFR3ZWVuTGl0ZSwgVGltZWxpbmVNYXgsIFRpbWVsaW5lTGl0ZSwgUG93ZXIwLCBQb3dlcjEsIFBvd2VyMiwgUG93ZXIzLCBQb3dlcjQsIExpbmVhciwgUXVhZCwgQ3ViaWMsIFF1YXJ0LCBRdWludCwgU3Ryb25nLCBFbGFzdGljLCBCYWNrLCBTdGVwcGVkRWFzZSwgQm91bmNlLCBTaW5lLCBFeHBvLCBDaXJjIH07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9