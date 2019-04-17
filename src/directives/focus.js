import Vue from 'vue';

export const focus = {
  update: function (el) {
    if (!el.offsetParent) { // element not visible
      el.dataset.focused=false;
    } else if (el.dataset.focused!=="true") { // focus hasn't been forced yet
      el.dataset.focused=true;
      el.focus();
    }
  }
}

Vue.directive('focus', focus)
