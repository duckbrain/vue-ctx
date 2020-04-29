(function(exports) {
  function ctxOf(comp) {
    while (comp) {
      if (comp.$context) {
        return comp.$context;
      }
      comp = comp.$parent
    }
    return {};
  }

  var VueCtx = {
    /**
     *
     * @param {import("vue").VueConstructor} Vue
     * @param {*} options
     */
    install: function(Vue, options) {
      Vue.component("ProvideContext", {
        props: {
          name: String,
          value: null,
          values: null,
        },
        render: function(createElement) {
          if (this.$slots.default.length === 1) {
            return this.$slots.default
          }
          return createElement('div', {class: "vue-ctx-container"}, this.$slots.default)
        },
        computed: {
          $context: function() {
            const val = {};
            if (this.values) {
              Object.assign(val, this.values);
            } else if (this.name) {
              val[this.name] = this.value;
            } else {
              throw new Error("must provide values or name to ProvideContext")
            }
            return Object.assign({}, ctxOf(this.$parent), val);
          }
        }
      })

      Vue.mixin({
        methods: {
          $ctx: function(key, fallback) {
            var c = ctxOf(this);
            if (!key) {
              return c;
            }
            return key in c ? c[key] : fallback;
          }
        }
      })
    },
  }

  exports['VueCtx'] = VueCtx;
})(typeof module !== 'undefined' ? module.exports : window)
