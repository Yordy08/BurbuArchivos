import { _ as __nuxt_component_0$1 } from "./nuxt-link-B8myKoD2.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import "C:/Users/Yordy/BurbuArchivos/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./client-only-B-nPYjnQ.js";
import "C:/Users/Yordy/BurbuArchivos/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Yordy/BurbuArchivos/node_modules/defu/dist/defu.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/ufo/dist/index.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/ofetch/dist/node.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/unctx/dist/index.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/h3/dist/index.mjs";
import "vue-router";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LoginForm",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card shadow-lg border-0" }, _attrs))} data-v-fb71e5d7><div class="card-body p-5" data-v-fb71e5d7><h2 class="card-title text-center mb-4 fw-bold text-primary" data-v-fb71e5d7>Iniciar Sesión</h2><form data-v-fb71e5d7><div class="mb-3" data-v-fb71e5d7><label for="email" class="form-label fw-semibold" data-v-fb71e5d7>Correo electrónico</label><div class="input-group" data-v-fb71e5d7><span class="input-group-text" data-v-fb71e5d7><i class="bi bi-envelope" data-v-fb71e5d7></i></span><input id="email"${ssrRenderAttr("value", unref(email))} type="email" class="form-control form-control-lg" required placeholder="tu@email.com" data-v-fb71e5d7></div></div><div class="mb-4" data-v-fb71e5d7><label for="password" class="form-label fw-semibold" data-v-fb71e5d7>Contraseña</label><div class="input-group" data-v-fb71e5d7><span class="input-group-text" data-v-fb71e5d7><i class="bi bi-lock" data-v-fb71e5d7></i></span><input id="password"${ssrRenderAttr("value", unref(password))} type="password" class="form-control form-control-lg" required placeholder="Tu contraseña" data-v-fb71e5d7></div></div><div class="d-grid mb-3" data-v-fb71e5d7><button type="submit" class="btn btn-primary btn-lg"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-fb71e5d7>`);
      if (unref(loading)) {
        _push(`<span class="spinner-border spinner-border-sm me-2" role="status" data-v-fb71e5d7></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(loading) ? "Iniciando..." : "Iniciar Sesión")}</button></div>`);
      if (unref(error)) {
        _push(`<div class="alert alert-danger d-flex align-items-center" data-v-fb71e5d7><i class="bi bi-exclamation-triangle me-2" data-v-fb71e5d7></i><span data-v-fb71e5d7>${ssrInterpolate(unref(error))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.success) {
        _push(`<div class="alert alert-success d-flex align-items-center" data-v-fb71e5d7><i class="bi bi-check-circle me-2" data-v-fb71e5d7></i><span data-v-fb71e5d7>${ssrInterpolate(_ctx.success)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form><hr class="my-4" data-v-fb71e5d7><p class="text-center mb-0" data-v-fb71e5d7> ¿No tienes cuenta? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "text-decoration-none fw-semibold text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Regístrate aquí `);
          } else {
            return [
              createTextVNode(" Regístrate aquí ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Auth/LoginForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-fb71e5d7"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AuthLoginForm = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-page" }, _attrs))} data-v-a78ddf47>`);
  _push(ssrRenderComponent(_component_AuthLoginForm, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a78ddf47"]]);
export {
  login as default
};
//# sourceMappingURL=login-CLBbu6aO.js.map
