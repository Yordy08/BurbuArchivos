import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Yordy/BurbuArchivos/node_modules/hookable/dist/index.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/unctx/dist/index.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Yordy/BurbuArchivos/node_modules/defu/dist/defu.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const images = ref([]);
    const loading = ref(true);
    const selectedImage = ref(null);
    const search = ref("");
    const filteredImages = computed(() => {
      if (!search.value) return images.value;
      const s = search.value.toLowerCase();
      return images.value.filter(
        (img) => img.title?.toLowerCase().includes(s) || img.user?.name?.toLowerCase().includes(s)
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "container-fluid min-vh-100",
        style: { "background": "rgba(250,250,250,0.75)" }
      }, _attrs))} data-v-2b9daba2><section class="py-4" style="${ssrRenderStyle({ "background": "rgba(255,255,255,0.6)" })}" data-v-2b9daba2><div class="container text-center mb-4" data-v-2b9daba2><p class="text-muted" data-v-2b9daba2> Explora imágenes compartidas por la comunidad </p><div class="row justify-content-center" data-v-2b9daba2><div class="col-md-6" data-v-2b9daba2><input${ssrRenderAttr("value", search.value)} type="text" class="form-control form-control-lg" placeholder="🔍 Buscar por título o usuario..." data-v-2b9daba2></div></div></div>`);
      if (loading.value) {
        _push(`<div class="text-center py-5" data-v-2b9daba2><div class="spinner-border text-danger" data-v-2b9daba2></div></div>`);
      } else if (filteredImages.value.length === 0) {
        _push(`<div class="alert alert-warning text-center" data-v-2b9daba2> No hay imágenes encontradas. </div>`);
      } else {
        _push(`<div class="container" data-v-2b9daba2><div class="row g-4" data-v-2b9daba2><!--[-->`);
        ssrRenderList(filteredImages.value, (image) => {
          _push(`<div class="col-md-6 col-lg-4 col-xl-3" data-v-2b9daba2><div class="card shadow border-0 h-100 hover-card" data-v-2b9daba2><img${ssrRenderAttr("src", image.urlOriginal)} class="card-img-top" style="${ssrRenderStyle({ "height": "220px", "object-fit": "cover", "cursor": "pointer" })}" data-v-2b9daba2><div class="card-body d-flex flex-column" data-v-2b9daba2><h5 class="fw-bold text-danger" data-v-2b9daba2>${ssrInterpolate(image.title)}</h5><p class="small text-muted" data-v-2b9daba2> Publicado por: ${ssrInterpolate(image.user?.name || "Usuario")}</p><p class="small text-muted mb-2" data-v-2b9daba2> ⬇ ${ssrInterpolate(image.downloads)} descargas </p><div class="mt-auto d-grid gap-2" data-v-2b9daba2><button class="btn btn-outline-dark rounded-pill" data-v-2b9daba2> 👁 Ver Imagen </button>`);
          if (image.downloadable) {
            _push(`<button class="btn btn-danger rounded-pill" data-v-2b9daba2> ⬇ Descargar </button>`);
          } else {
            _push(`<button disabled class="btn btn-secondary rounded-pill" data-v-2b9daba2> ❌ Descarga bloqueada </button>`);
          }
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`</section>`);
      if (selectedImage.value) {
        _push(`<div class="modal-backdrop" data-v-2b9daba2><div class="modal-box" data-v-2b9daba2><img${ssrRenderAttr("src", selectedImage.value.urlOriginal)} data-v-2b9daba2><h5 class="mt-3 text-danger" data-v-2b9daba2>${ssrInterpolate(selectedImage.value.title)}</h5><p class="text-muted" data-v-2b9daba2> 👤 ${ssrInterpolate(selectedImage.value.user?.name)}</p>`);
        if (selectedImage.value.downloadable) {
          _push(`<button class="btn btn-danger w-100" data-v-2b9daba2> ⬇ Descargar </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="btn btn-secondary w-100 mt-2" data-v-2b9daba2> Cerrar </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2b9daba2"]]);
export {
  index as default
};
//# sourceMappingURL=index-BBlFyuRw.js.map
