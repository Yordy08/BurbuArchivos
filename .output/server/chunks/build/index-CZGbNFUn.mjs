import { _ as __nuxt_component_0 } from './nuxt-link-B8myKoD2.mjs';
import { withAsyncContext, computed, reactive, ref, watch, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { u as useFetch } from './fetch-B-GoBOxQ.mjs';
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
import '@vue/shared';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const {
      data,
      pending,
      refresh
    } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/auth/me",
      "$qftas4ngfG"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const user = computed(() => {
      var _a;
      return ((_a = data.value) == null ? void 0 : _a.user) || null;
    });
    const initials = computed(() => {
      var _a;
      if (!((_a = user.value) == null ? void 0 : _a.name)) return "U";
      return user.value.name.split(" ").map((word) => word[0]).join("").substring(0, 2).toUpperCase();
    });
    const totalDownloads = computed(() => {
      var _a;
      if (!((_a = user.value) == null ? void 0 : _a.images)) return 0;
      return user.value.images.reduce(
        (total, img) => total + (img.downloads || 0),
        0
      );
    });
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };
    const profileForm = reactive({
      name: "",
      email: ""
    });
    const profileLoading = ref(false);
    const profileMessage = ref("");
    const profileError = ref(false);
    watch(() => user.value, (u) => {
      if (u) {
        profileForm.name = u.name || "";
        profileForm.email = u.email || "";
      }
    }, { immediate: true });
    const passwordForm = reactive({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    const passwordLoading = ref(false);
    const passwordMessage = ref("");
    const passwordError = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container py-5" }, _attrs))}>`);
      if (unref(pending)) {
        _push(`<div class="text-center py-5"><div class="spinner-border text-danger" role="status"><span class="visually-hidden">Cargando...</span></div></div>`);
      } else if (user.value) {
        _push(`<div class="row g-5"><div class="col-lg-4 d-flex flex-column gap-4"><div class="card shadow border-0 rounded-4"><div class="card-body text-center p-4"><div class="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mx-auto mb-3" style="${ssrRenderStyle({ "width": "90px", "height": "90px", "font-size": "2rem", "font-weight": "bold" })}">${ssrInterpolate(initials.value)}</div><h2 class="fw-bold text-danger mb-1">${ssrInterpolate(user.value.name)}</h2><p class="text-muted mb-2">${ssrInterpolate(user.value.email)}</p><span class="badge bg-dark px-3 py-2 rounded-pill mb-3">${ssrInterpolate(user.value.role)}</span><hr><div class="row text-center"><div class="col-6"><h4 class="fw-bold text-danger">${ssrInterpolate(((_a = user.value.images) == null ? void 0 : _a.length) || 0)}</h4><small class="text-muted">Im\xE1genes</small></div><div class="col-6"><h4 class="fw-bold text-danger">${ssrInterpolate(totalDownloads.value)}</h4><small class="text-muted">Descargas</small></div></div></div></div><div class="card shadow border-0 rounded-4"><div class="card-body p-4"><h5 class="fw-bold text-danger mb-3">\u270F\uFE0F Editar Perfil</h5>`);
        if (profileMessage.value) {
          _push(`<div class="${ssrRenderClass(["alert", profileError.value ? "alert-danger" : "alert-success"])}">${ssrInterpolate(profileMessage.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<form class="d-flex flex-column gap-3"><input${ssrRenderAttr("value", profileForm.name)} type="text" class="form-control" placeholder="Nombre" required><input${ssrRenderAttr("value", profileForm.email)} type="email" class="form-control" placeholder="Correo" required><button type="submit" class="btn btn-danger rounded-pill"${ssrIncludeBooleanAttr(profileLoading.value) ? " disabled" : ""}>`);
        if (profileLoading.value) {
          _push(`<span class="spinner-border spinner-border-sm me-2"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` Guardar Cambios </button></form></div></div><div class="card shadow border-0 rounded-4"><div class="card-body p-4"><h5 class="fw-bold text-danger mb-3">\u{1F512} Contrase\xF1a</h5>`);
        if (passwordMessage.value) {
          _push(`<div class="${ssrRenderClass(["alert", passwordError.value ? "alert-danger" : "alert-success"])}">${ssrInterpolate(passwordMessage.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<form class="d-flex flex-column gap-3"><input${ssrRenderAttr("value", passwordForm.currentPassword)} type="password" class="form-control" placeholder="Actual" required><input${ssrRenderAttr("value", passwordForm.newPassword)} type="password" class="form-control" placeholder="Nueva" required><input${ssrRenderAttr("value", passwordForm.confirmPassword)} type="password" class="form-control" placeholder="Confirmar" required><button type="submit" class="btn btn-dark rounded-pill"${ssrIncludeBooleanAttr(passwordLoading.value) ? " disabled" : ""}>`);
        if (passwordLoading.value) {
          _push(`<span class="spinner-border spinner-border-sm me-2"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` Actualizar </button></form></div></div></div><div class="col-lg-8"><div class="d-flex justify-content-between align-items-center mb-4"><h3 class="fw-bold text-danger mb-0">\u{1F5BC}\uFE0F Mis Im\xE1genes</h3>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/subir",
          class: "btn btn-danger rounded-pill px-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` + Subir Nueva `);
            } else {
              return [
                createTextVNode(" + Subir Nueva ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if ((_b = user.value.images) == null ? void 0 : _b.length) {
          _push(`<div class="row g-4"><!--[-->`);
          ssrRenderList(user.value.images, (image) => {
            _push(`<div class="col-md-6 col-xl-4"><div class="card shadow border-0 h-100"><img${ssrRenderAttr("src", image.urlOriginal)} class="card-img-top" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}"><div class="card-body"><h6 class="fw-bold text-danger">${ssrInterpolate(image.title)}</h6><small class="text-muted d-block mb-2"> \u{1F4C5} ${ssrInterpolate(formatDate(image.createdAt))}</small><small class="text-muted d-block mb-3"> \u2B07 ${ssrInterpolate(image.downloads)} descargas </small>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/foto/${image.slug}`,
              class: "btn btn-outline-dark btn-sm w-100 rounded-pill"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Ver `);
                } else {
                  return [
                    createTextVNode(" Ver ")
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="alert alert-warning text-center"> No has subido im\xE1genes todav\xEDa. </div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<div class="alert alert-danger text-center"> Usuario no encontrado o sesi\xF3n expirada. </div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/perfil/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CZGbNFUn.mjs.map
