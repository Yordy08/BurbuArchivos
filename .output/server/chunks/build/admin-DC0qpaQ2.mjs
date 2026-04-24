import { _ as __nuxt_component_0 } from './nuxt-link-B8myKoD2.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = {
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const images = ref([]);
    const loading = ref(true);
    const showEditModal = ref(false);
    const saving = ref(false);
    const stats = ref({
      totalImages: 0,
      totalDownloads: 0,
      totalUsers: 1,
      lastLogin: null
    });
    const editingImage = ref({});
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container py-5" }, _attrs))}><h1 class="mb-4 text-center fw-bold text-danger">\u{1F4CA} Panel Administrativo</h1><div class="row g-3 mb-5"><div class="col-md-3"><div class="card bg-primary text-white"><div class="card-body"><h5 class="card-title">Im\xE1genes Subidas</h5><p class="card-text fs-4">${ssrInterpolate(stats.value.totalImages)}</p></div></div></div><div class="col-md-3"><div class="card bg-success text-white"><div class="card-body"><h5 class="card-title">Total Descargas</h5><p class="card-text fs-4">${ssrInterpolate(stats.value.totalDownloads)}</p></div></div></div><div class="col-md-3"><div class="card bg-warning text-dark"><div class="card-body"><h5 class="card-title">\xDAltimo Login</h5><p class="card-text small">${ssrInterpolate(stats.value.lastLogin ? new Date(stats.value.lastLogin).toLocaleDateString() : "N/A")}</p></div></div></div></div><div class="card shadow"><div class="card-header bg-danger text-white"><h5 class="mb-0">\u{1F5BC}\uFE0F Mis Im\xE1genes</h5></div><div class="card-body">`);
      if (loading.value) {
        _push(`<div class="text-center"><div class="spinner-border text-danger"></div></div>`);
      } else if (images.value.length === 0) {
        _push(`<div class="text-center text-muted"> No tienes im\xE1genes subidas. </div>`);
      } else {
        _push(`<div class="table-responsive"><table class="table table-hover"><thead class="table-light"><tr><th>Imagen</th><th>T\xEDtulo</th><th>Visibilidad</th><th>Descargas</th><th>Descargable</th><th>Fecha</th><th>Acciones</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(images.value, (image) => {
          _push(`<tr><td><img${ssrRenderAttr("src", image.urlOriginal)} style="${ssrRenderStyle({ "height": "50px", "width": "50px", "object-fit": "cover", "border-radius": "5px" })}"></td><td>${ssrInterpolate(image.title)}</td><td><span class="${ssrRenderClass(image.visibility === "public" ? "badge bg-success" : "badge bg-warning")}">${ssrInterpolate(image.visibility)}</span></td><td><strong>${ssrInterpolate(image.downloads)}</strong></td><td><span class="${ssrRenderClass(image.downloadable ? "badge bg-success" : "badge bg-danger")}">${ssrInterpolate(image.downloadable ? "S\xED" : "No")}</span></td><td>${ssrInterpolate(new Date(image.createdAt).toLocaleDateString())}</td><td><button class="btn btn-sm btn-outline-primary me-1"> \u270F\uFE0F </button>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/foto/${image.slug}`,
            class: "btn btn-sm btn-outline-secondary me-1"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` \u{1F441}\uFE0F `);
              } else {
                return [
                  createTextVNode(" \u{1F441}\uFE0F ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button class="btn btn-sm btn-outline-danger"> \u{1F5D1}\uFE0F </button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
      }
      _push(`</div></div>`);
      if (showEditModal.value) {
        _push(`<div class="modal d-block" style="${ssrRenderStyle({ "background": "rgba(0,0,0,.5)" })}"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5>Editar Imagen</h5><button class="btn-close"></button></div><div class="modal-body"><input${ssrRenderAttr("value", editingImage.value.title)} class="form-control mb-3" placeholder="T\xEDtulo"><select class="form-select mb-3"><option value="public"${ssrIncludeBooleanAttr(Array.isArray(editingImage.value.visibility) ? ssrLooseContain(editingImage.value.visibility, "public") : ssrLooseEqual(editingImage.value.visibility, "public")) ? " selected" : ""}>P\xFAblica</option><option value="private"${ssrIncludeBooleanAttr(Array.isArray(editingImage.value.visibility) ? ssrLooseContain(editingImage.value.visibility, "private") : ssrLooseEqual(editingImage.value.visibility, "private")) ? " selected" : ""}>Privada</option></select><div class="form-check"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(editingImage.value.downloadable) ? ssrLooseContain(editingImage.value.downloadable, null) : editingImage.value.downloadable) ? " checked" : ""} class="form-check-input"><label>Descargable</label></div></div><div class="modal-footer"><button class="btn btn-secondary"> Cancelar </button><button class="btn btn-primary"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""}>${ssrInterpolate(saving.value ? "Guardando..." : "Guardar")}</button></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-DC0qpaQ2.mjs.map
