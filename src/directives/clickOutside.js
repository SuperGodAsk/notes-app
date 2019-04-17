import Vue from 'vue';

const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )

export const clickOutside = {
  bind: function(el, binding) {
    const handler = (e) => {
      if (!el.contains(e.target) && isVisible(el)) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = handler

    // add Event Listeners
    document.addEventListener('click', handler)
  },

  unbind: function(el, binding) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null

  }
}

Vue.directive('click-outside', clickOutside)
