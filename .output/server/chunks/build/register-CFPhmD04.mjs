import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const msg = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))} data-v-12a9aa98><div class="box" data-v-12a9aa98><h1 data-v-12a9aa98>Registro</h1><p class="subtitle" data-v-12a9aa98>Crea tu cuenta en BurbuArchivo</p><form data-v-12a9aa98><input${ssrRenderAttr("value", name.value)} placeholder="Nombre" data-v-12a9aa98><input${ssrRenderAttr("value", email.value)} placeholder="Correo" data-v-12a9aa98><input${ssrRenderAttr("value", password.value)} type="password" placeholder="Clave" data-v-12a9aa98><button data-v-12a9aa98>Registrarme</button></form><p class="msg" data-v-12a9aa98>${ssrInterpolate(msg.value)}</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-12a9aa98"]]);

export { register as default };
//# sourceMappingURL=register-CFPhmD04.mjs.map
