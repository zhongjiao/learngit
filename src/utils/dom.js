import Vue from 'vue';

const isServer = Vue.prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};


export const on = (function() {
  if(!isServer && window.addEventListener) {
    return function(element, event, handler) {
      element.addEventListener(event, handler, false);
    }
  } else {
    return function(element, event, handler) {
      element.attachEvent('on' + event, handler);
    }
  }
})();

export const off = (function() {
  if(!isServer && window.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler);
      }
    }
  } else {
    return function(element, event, handler) {
      if(element && event) {
        element.detachEvent('on' + event, handler);
      }
    }
  }
})();

export const once = function(element, event, handler){
  var listener = function() {
    if (handler) {
      handler.apply(this, arguments);
    }
    off(element, event, handler);
  };
  on(element, event, listener);
};
export function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
}
export function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ');
    }
}
export function addClass(el, cls) {
  if(!el) return false;
  const classes = (cls || '').split(' ');
  var clsName = el.className;

  for (let i = 0, j = classes.length; i < j; j++ ) {

    var tempCls = classes[i];
    if(!tempCls) continue;

    if(el.classList) {
      el.classList.add(tempCls);
    } else if(!hasClass(el, tempCls)) {
      clsName += ' ' + tempCls;
    }
  }
  if(!el.classList) {
    el.className = cls;
  }
}
/* istanbul ignore next */
export const getStyle = ieVersion < 9 ? function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/* istanbul ignore next */
export function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};

