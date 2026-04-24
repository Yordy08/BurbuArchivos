import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';

const _sfc_main = {
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const image = ref(null);
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container py-5" }, _attrs))}>`);
      if (loading.value) {
        _push(`<div class="text-center py-5"><div class="spinner-border text-danger"></div></div>`);
      } else if (image.value) {
        _push(`<div class="row g-4"><div class="col-lg-8"><img${ssrRenderAttr("src", image.value.urlOriginal)}${ssrRenderAttr("alt", image.value.title)} class="img-fluid rounded shadow w-100"></div><div class="col-lg-4"><div class="card shadow border-0"><div class="card-body"><h3 class="text-danger fw-bold">${ssrInterpolate(image.value.title)}</h3><p> \u{1F464} ${ssrInterpolate(((_a = image.value.user) == null ? void 0 : _a.name) || "Sin usuario")}</p><p> \u{1F4C5} ${ssrInterpolate(new Date(image.value.createdAt).toLocaleDateString())}</p><p> \u2B07 ${ssrInterpolate(image.value.downloads)}</p>`);
        if (image.value.downloadable) {
          _push(`<button class="btn btn-danger w-100"> Descargar </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      } else {
        _push(`<div class="alert alert-warning text-center"> Imagen no encontrada </div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/foto/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-B-PHIsu9.mjs.map
