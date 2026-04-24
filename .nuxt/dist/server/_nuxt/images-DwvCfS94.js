import { withAsyncContext, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { u as useRoute } from "../server.mjs";
import { u as useFetch } from "./fetch-B-GoBOxQ.js";
import "C:/Users/Yordy/BurbuArchivos/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Yordy/BurbuArchivos/node_modules/hookable/dist/index.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/unctx/dist/index.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Yordy/BurbuArchivos/node_modules/defu/dist/defu.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/ufo/dist/index.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "C:/Users/Yordy/BurbuArchivos/node_modules/perfect-debounce/dist/index.mjs";
import "./client-only-B-nPYjnQ.js";
const _sfc_main = {
  __name: "images",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const userId = route.params.id || "some-user-id";
    const { data: user } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/users/${userId}`,
      "$7ZXmdqGGwP"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1>Perfil de Usuario</h1>`);
      if (unref(user)) {
        _push(`<div><p>Nombre: ${ssrInterpolate(unref(user).name)}</p><p>Email: ${ssrInterpolate(unref(user).email)}</p><h2>Imágenes</h2>`);
        if (unref(user).images.length) {
          _push(`<ul><!--[-->`);
          ssrRenderList(unref(user).images, (image) => {
            _push(`<li><a${ssrRenderAttr("href", `/foto/${image.slug}`)}>${ssrInterpolate(image.title)}</a></li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<p>No hay imágenes.</p>`);
        }
        _push(`</div>`);
      } else {
        _push(`<p>Usuario no encontrado.</p>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/images.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=images-DwvCfS94.js.map
