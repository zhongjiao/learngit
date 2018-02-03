import Vue from 'vue';

const isServer = Vue.prototype.$isServer;

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
