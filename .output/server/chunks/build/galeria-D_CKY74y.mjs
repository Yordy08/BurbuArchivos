import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "galeria",
  __ssrInlineRender: true,
  setup(__props) {
    ref([]);
    const albums = ref([]);
    const selectedAlbum = ref(null);
    const selectedImage = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container py-4" }, _attrs))} data-v-86d21cf2><p class="text-muted" data-v-86d21cf2> Explora im\xE1genes compartidas por la comunidad </p><div class="row g-4" data-v-86d21cf2><!--[-->`);
      ssrRenderList(albums.value, (album) => {
        _push(`<div class="col-6 col-md-3" data-v-86d21cf2><div class="album-card" data-v-86d21cf2><div class="album-cover" data-v-86d21cf2><img${ssrRenderAttr("src", album.cover)} alt="album" data-v-86d21cf2></div><div class="album-info" data-v-86d21cf2><h6 data-v-86d21cf2> \xC1lbum de: ${ssrInterpolate(album.userName)}</h6><small data-v-86d21cf2>${ssrInterpolate(album.images.length)} fotos</small></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (selectedAlbum.value) {
        _push(`<div class="modal-backdrop" data-v-86d21cf2><div class="modal-content" data-v-86d21cf2><h4 class="mb-3 text-danger" data-v-86d21cf2> \u{1F4C1} ${ssrInterpolate(selectedAlbum.value.userName)}</h4><div class="row g-2" data-v-86d21cf2><!--[-->`);
        ssrRenderList(selectedAlbum.value.images, (img) => {
          _push(`<div class="col-6" data-v-86d21cf2><img${ssrRenderAttr("src", img.urlOriginal)} class="img-fluid rounded pointer" data-v-86d21cf2></div>`);
        });
        _push(`<!--]--></div><button class="btn btn-secondary w-100 mt-3" data-v-86d21cf2> Cerrar </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (selectedImage.value) {
        _push(`<div class="modal-backdrop" data-v-86d21cf2><div class="modal-content" data-v-86d21cf2><img${ssrRenderAttr("src", selectedImage.value.urlOriginal)} class="img-fluid rounded" data-v-86d21cf2><h5 class="mt-2" data-v-86d21cf2>${ssrInterpolate(selectedImage.value.title)}</h5><button class="btn btn-danger w-100 mt-2" data-v-86d21cf2> \u2B07 Descargar </button><button class="btn btn-secondary w-100 mt-2" data-v-86d21cf2> Cerrar </button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/galeria.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const galeria = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-86d21cf2"]]);

export { galeria as default };
//# sourceMappingURL=galeria-D_CKY74y.mjs.map
