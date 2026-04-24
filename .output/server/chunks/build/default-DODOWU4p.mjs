import { _ as __nuxt_component_0 } from './nuxt-link-B8myKoD2.mjs';
import { mergeProps, ref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main$2 = {
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoggedIn = ref(false);
    const user = ref(null);
    const closeMenu = () => {
      const toggler = (void 0).querySelector('[data-bs-target="#navbarContent"]');
      const menu = (void 0).getElementById("navbarContent");
      if ((menu == null ? void 0 : menu.classList.contains("show")) && toggler) {
        toggler.click();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "navbar navbar-expand-lg navbar-dark bg-primary shadow" }, _attrs))}><div class="container-fluid">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "navbar-brand",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Burbu | Archivos `);
          } else {
            return [
              createTextVNode(" Burbu | Archivos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarContent"><ul class="navbar-nav me-auto mb-2 mb-lg-0"><li class="nav-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link",
        to: "/",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Inicio`);
          } else {
            return [
              createTextVNode("Inicio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "nav-link",
        to: "/galeria",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Galer\xEDa`);
          } else {
            return [
              createTextVNode("Galer\xEDa")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (isLoggedIn.value) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "nav-link",
          to: "/subir",
          onClick: closeMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Subir `);
            } else {
              return [
                createTextVNode(" Subir ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoggedIn.value) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "nav-link",
          to: "/adminpro",
          onClick: closeMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Dashboard `);
            } else {
              return [
                createTextVNode(" Dashboard ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul><ul class="navbar-nav mb-2 mb-lg-0">`);
      if (!isLoggedIn.value) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "nav-link",
          to: "/login",
          onClick: closeMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Login `);
            } else {
              return [
                createTextVNode(" Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">${ssrInterpolate(((_a = user.value) == null ? void 0 : _a.name) || "Usuario")}</a><ul class="dropdown-menu dropdown-menu-end"><li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "dropdown-item",
          to: "/perfil",
          onClick: closeMenu
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Perfil `);
            } else {
              return [
                createTextVNode(" Perfil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
        if (((_b = user.value) == null ? void 0 : _b.role) === "admin") {
          _push(`<li>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            class: "dropdown-item",
            to: "/admin",
            onClick: closeMenu
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Admin `);
              } else {
                return [
                  createTextVNode(" Admin ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<li><hr class="dropdown-divider"></li><li><a class="dropdown-item text-danger" href="#"> Cerrar sesi\xF3n </a></li></ul></li>`);
      }
      _push(`</ul></div></div></nav>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-dark text-light mt-auto" }, _attrs))}><div class="container py-5"><div class="row align-items-center"><div class="col-md-6"><p class="mb-0"> \xA9 2024 Burbu Archivos. Todos los derechos reservados. </p></div><div class="col-md-6 text-md-end">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/privacidad",
    class: "text-light text-decoration-none me-3"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Pol\xEDtica de Privacidad `);
      } else {
        return [
          createTextVNode(" Pol\xEDtica de Privacidad ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/terminos",
    class: "text-light text-decoration-none"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` T\xE9rminos de Servicio `);
      } else {
        return [
          createTextVNode(" T\xE9rminos de Servicio ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Navbar = _sfc_main$2;
  const _component_Footer = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-layout" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
  _push(`<main class="content">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-DODOWU4p.mjs.map
