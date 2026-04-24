import { ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import "C:/Users/Yordy/BurbuArchivos/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import "./client-only-B-nPYjnQ.js";
import "C:/Users/Yordy/BurbuArchivos/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Yordy/BurbuArchivos/node_modules/defu/dist/defu.mjs";
import slugify from "slugify";
import "sweetalert2";
import "C:/Users/Yordy/BurbuArchivos/node_modules/ofetch/dist/node.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/unctx/dist/index.mjs";
import "C:/Users/Yordy/BurbuArchivos/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Yordy/BurbuArchivos/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "subir",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    const title = ref("");
    const slug = ref("");
    const visibility = ref("public");
    const downloadable = ref(false);
    const seoEnabled = ref(true);
    ref([]);
    const preview = ref([]);
    const subiendo = ref(false);
    watch(title, (val) => {
      slug.value = slugify(val, {
        lower: true,
        strict: true
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container py-5" }, _attrs))}><div class="card shadow-lg border-0 rounded-4"><div class="card-body p-5"><h2 class="mb-4 fw-bold text-danger d-flex align-items-center gap-2"> 🖼️ Subir Imágenes </h2><form class="row g-4"><div class="col-md-6"><label class="form-label">📝 Título</label><input${ssrRenderAttr("value", title.value)} type="text" class="form-control" placeholder="Título general" required></div><div class="col-md-6"><label class="form-label">🔗 Slug SEO</label><input${ssrRenderAttr("value", slug.value)} type="text" class="form-control" readonly></div><div class="col-md-6"><label class="form-label">🌍 Visibilidad</label><select class="form-select"><option value="public"${ssrIncludeBooleanAttr(Array.isArray(visibility.value) ? ssrLooseContain(visibility.value, "public") : ssrLooseEqual(visibility.value, "public")) ? " selected" : ""}>Público</option><option value="private"${ssrIncludeBooleanAttr(Array.isArray(visibility.value) ? ssrLooseContain(visibility.value, "private") : ssrLooseEqual(visibility.value, "private")) ? " selected" : ""}>Privado</option></select></div><div class="col-md-3"><label class="form-label">⬇️ Descarga</label><select class="form-select"><option${ssrRenderAttr("value", true)}${ssrIncludeBooleanAttr(Array.isArray(downloadable.value) ? ssrLooseContain(downloadable.value, true) : ssrLooseEqual(downloadable.value, true)) ? " selected" : ""}>Permitida</option><option${ssrRenderAttr("value", false)}${ssrIncludeBooleanAttr(Array.isArray(downloadable.value) ? ssrLooseContain(downloadable.value, false) : ssrLooseEqual(downloadable.value, false)) ? " selected" : ""}>Bloqueada</option></select></div><div class="col-md-3"><label class="form-label">🚀 SEO</label><select class="form-select"><option${ssrRenderAttr("value", true)}${ssrIncludeBooleanAttr(Array.isArray(seoEnabled.value) ? ssrLooseContain(seoEnabled.value, true) : ssrLooseEqual(seoEnabled.value, true)) ? " selected" : ""}>Activo</option><option${ssrRenderAttr("value", false)}${ssrIncludeBooleanAttr(Array.isArray(seoEnabled.value) ? ssrLooseContain(seoEnabled.value, false) : ssrLooseEqual(seoEnabled.value, false)) ? " selected" : ""}>Apagado</option></select></div><div class="col-12"><label class="form-label">📷 Seleccionar Imágenes</label><input type="file" multiple accept="image/*" class="form-control" required>`);
      if (subiendo.value) {
        _push(`<div class="text-info mt-2"> Subiendo imágenes... </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (preview.value.length) {
        _push(`<div class="col-12"><div class="row g-3"><!--[-->`);
        ssrRenderList(preview.value, (img, index) => {
          _push(`<div class="col-md-3"><img${ssrRenderAttr("src", img)} class="img-fluid rounded border" style="${ssrRenderStyle({ "height": "200px", "width": "100%", "object-fit": "cover" })}"></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="col-12 text-end"><button class="btn btn-danger px-4"${ssrIncludeBooleanAttr(subiendo.value) ? " disabled" : ""}>${ssrInterpolate(subiendo.value ? "Subiendo..." : "Guardar Imágenes")}</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/subir.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=subir-BGcdQL8-.js.map
