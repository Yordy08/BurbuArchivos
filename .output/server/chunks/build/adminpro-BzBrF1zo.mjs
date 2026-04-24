import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';

const _sfc_main = {
  __name: "adminpro",
  __ssrInlineRender: true,
  setup(__props) {
    const users = ref([]);
    const isAdmin = ref(false);
    const totalImages = ref(0);
    const totalUsers = ref(0);
    const alertMessage = ref("");
    const alertType = ref("success");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container py-5" }, _attrs))}><div class="text-center mb-5"><p class="text-muted"> Gesti\xF3n de usuarios y estad\xEDsticas del sistema </p></div>`);
      if (!isAdmin.value) {
        _push(`<div class="alert alert-danger text-center"> \u274C No tienes permisos para acceder a esta secci\xF3n </div>`);
      } else {
        _push(`<div>`);
        if (alertMessage.value) {
          _push(`<div class="${ssrRenderClass(`alert alert-${alertType.value} alert-dismissible fade show`)}" role="alert">${ssrInterpolate(alertMessage.value)} <button type="button" class="btn-close"></button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="row g-3 mb-5"><div class="col-md-6"><div class="card bg-primary text-white"><div class="card-body"><h5>Total Usuarios</h5><h3>${ssrInterpolate(totalUsers.value)}</h3></div></div></div><div class="col-md-6"><div class="card bg-success text-white"><div class="card-body"><h5>Total Im\xE1genes</h5><h3>${ssrInterpolate(totalImages.value)}</h3></div></div></div></div><div class="card shadow"><div class="card-header bg-danger text-white"> \u{1F465} Gesti\xF3n de Usuarios </div><div class="card-body table-responsive"><table class="table table-hover align-middle"><thead><tr><th>Nombre</th><th>Email</th><th>Contrase\xF1a</th><th>Rol</th><th>Im\xE1genes</th><th>Acciones</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(users.value, (user) => {
          var _a;
          _push(`<tr><td><input${ssrRenderAttr("value", user.name)} class="form-control form-control-sm"></td><td><input${ssrRenderAttr("value", user.email)} class="form-control form-control-sm"></td><td><input${ssrRenderAttr("value", user.newPassword)} type="password" placeholder="Nueva contrase\xF1a" class="form-control form-control-sm"></td><td><select class="form-select form-select-sm"><option value="user"${ssrIncludeBooleanAttr(Array.isArray(user.role) ? ssrLooseContain(user.role, "user") : ssrLooseEqual(user.role, "user")) ? " selected" : ""}>User</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(user.role) ? ssrLooseContain(user.role, "admin") : ssrLooseEqual(user.role, "admin")) ? " selected" : ""}>Admin</option></select></td><td class="text-center">${ssrInterpolate(((_a = user._count) == null ? void 0 : _a.images) || 0)}</td><td><button class="btn btn-sm btn-primary me-2"> Guardar </button><button class="btn btn-sm btn-warning"> Reset Pass </button></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/adminpro.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=adminpro-BzBrF1zo.mjs.map
