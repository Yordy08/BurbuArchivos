import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
        (img) => {
          var _a, _b, _c;
          return ((_a = img.title) == null ? void 0 : _a.toLowerCase().includes(s)) || ((_c = (_b = img.user) == null ? void 0 : _b.name) == null ? void 0 : _c.toLowerCase().includes(s));
        }
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "container-fluid min-vh-100",
        style: { "background": "rgba(250,250,250,0.75)" }
      }, _attrs))} data-v-2b9daba2><section class="py-4" style="${ssrRenderStyle({ "background": "rgba(255,255,255,0.6)" })}" data-v-2b9daba2><div class="container text-center mb-4" data-v-2b9daba2><p class="text-muted" data-v-2b9daba2> Explora im\xE1genes compartidas por la comunidad </p><div class="row justify-content-center" data-v-2b9daba2><div class="col-md-6" data-v-2b9daba2><input${ssrRenderAttr("value", search.value)} type="text" class="form-control form-control-lg" placeholder="\u{1F50D} Buscar por t\xEDtulo o usuario..." data-v-2b9daba2></div></div></div>`);
      if (loading.value) {
        _push(`<div class="text-center py-5" data-v-2b9daba2><div class="spinner-border text-danger" data-v-2b9daba2></div></div>`);
      } else if (filteredImages.value.length === 0) {
        _push(`<div class="alert alert-warning text-center" data-v-2b9daba2> No hay im\xE1genes encontradas. </div>`);
      } else {
        _push(`<div class="container" data-v-2b9daba2><div class="row g-4" data-v-2b9daba2><!--[-->`);
        ssrRenderList(filteredImages.value, (image) => {
          var _a2;
          _push(`<div class="col-md-6 col-lg-4 col-xl-3" data-v-2b9daba2><div class="card shadow border-0 h-100 hover-card" data-v-2b9daba2><img${ssrRenderAttr("src", image.urlOriginal)} class="card-img-top" style="${ssrRenderStyle({ "height": "220px", "object-fit": "cover", "cursor": "pointer" })}" data-v-2b9daba2><div class="card-body d-flex flex-column" data-v-2b9daba2><h5 class="fw-bold text-danger" data-v-2b9daba2>${ssrInterpolate(image.title)}</h5><p class="small text-muted" data-v-2b9daba2> Publicado por: ${ssrInterpolate(((_a2 = image.user) == null ? void 0 : _a2.name) || "Usuario")}</p><p class="small text-muted mb-2" data-v-2b9daba2> \u2B07 ${ssrInterpolate(image.downloads)} descargas </p><div class="mt-auto d-grid gap-2" data-v-2b9daba2><button class="btn btn-outline-dark rounded-pill" data-v-2b9daba2> \u{1F441} Ver Imagen </button>`);
          if (image.downloadable) {
            _push(`<button class="btn btn-danger rounded-pill" data-v-2b9daba2> \u2B07 Descargar </button>`);
          } else {
            _push(`<button disabled class="btn btn-secondary rounded-pill" data-v-2b9daba2> \u274C Descarga bloqueada </button>`);
          }
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`</section>`);
      if (selectedImage.value) {
        _push(`<div class="modal-backdrop" data-v-2b9daba2><div class="modal-box" data-v-2b9daba2><img${ssrRenderAttr("src", selectedImage.value.urlOriginal)} data-v-2b9daba2><h5 class="mt-3 text-danger" data-v-2b9daba2>${ssrInterpolate(selectedImage.value.title)}</h5><p class="text-muted" data-v-2b9daba2> \u{1F464} ${ssrInterpolate((_a = selectedImage.value.user) == null ? void 0 : _a.name)}</p>`);
        if (selectedImage.value.downloadable) {
          _push(`<button class="btn btn-danger w-100" data-v-2b9daba2> \u2B07 Descargar </button>`);
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

export { index as default };
//# sourceMappingURL=index-BBlFyuRw.mjs.map
