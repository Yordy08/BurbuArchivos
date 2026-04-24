import { _ as __nuxt_component_0$1 } from './nuxt-link-B8myKoD2.mjs';
import { mergeProps, defineComponent, ref, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card shadow-lg border-0" }, _attrs))} data-v-fb71e5d7><div class="card-body p-5" data-v-fb71e5d7><h2 class="card-title text-center mb-4 fw-bold text-primary" data-v-fb71e5d7>Iniciar Sesi\xF3n</h2><form data-v-fb71e5d7><div class="mb-3" data-v-fb71e5d7><label for="email" class="form-label fw-semibold" data-v-fb71e5d7>Correo electr\xF3nico</label><div class="input-group" data-v-fb71e5d7><span class="input-group-text" data-v-fb71e5d7><i class="bi bi-envelope" data-v-fb71e5d7></i></span><input id="email"${ssrRenderAttr("value", unref(email))} type="email" class="form-control form-control-lg" required placeholder="tu@email.com" data-v-fb71e5d7></div></div><div class="mb-4" data-v-fb71e5d7><label for="password" class="form-label fw-semibold" data-v-fb71e5d7>Contrase\xF1a</label><div class="input-group" data-v-fb71e5d7><span class="input-group-text" data-v-fb71e5d7><i class="bi bi-lock" data-v-fb71e5d7></i></span><input id="password"${ssrRenderAttr("value", unref(password))} type="password" class="form-control form-control-lg" required placeholder="Tu contrase\xF1a" data-v-fb71e5d7></div></div><div class="d-grid mb-3" data-v-fb71e5d7><button type="submit" class="btn btn-primary btn-lg"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-fb71e5d7>`);
      if (unref(loading)) {
        _push(`<span class="spinner-border spinner-border-sm me-2" role="status" data-v-fb71e5d7></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(loading) ? "Iniciando..." : "Iniciar Sesi\xF3n")}</button></div>`);
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
      _push(`</form><hr class="my-4" data-v-fb71e5d7><p class="text-center mb-0" data-v-fb71e5d7> \xBFNo tienes cuenta? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "text-decoration-none fw-semibold text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Reg\xEDstrate aqu\xED `);
          } else {
            return [
              createTextVNode(" Reg\xEDstrate aqu\xED ")
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

export { login as default };
//# sourceMappingURL=login-CLBbu6aO.mjs.map
