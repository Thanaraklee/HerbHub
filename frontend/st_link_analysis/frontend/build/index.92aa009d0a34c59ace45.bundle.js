"use strict";
(self.webpackChunkst_link_analysis =
  self.webpackChunkst_link_analysis || []).push([
  [57],
  {
    208: (e, n, t) => {
      t.d(n, { A: () => g });
      var o = t(982),
        a = t.n(o),
        i = t(314),
        r = t.n(i),
        l = t(417),
        s = t.n(l),
        d = new URL(t(245), t.b),
        c = r()(a()),
        u = s()(d);
      c.push([
        e.id,
        `@font-face {\n    font-family: "Cairo";\n    src: url(${u}) format("truetype");\n    weight: 125 900;\n}\n\n/* ---------------------------------------------------- */\n/* ---------------------- Main ------------------------ */\n/* ---------------------------------------------------- */\nbody[data-theme="light"] {\n    --neutral-1: hsl(0deg 0% 100% / 0%);\n    --neutral-2: hsl(223, 0%, 99%);\n    --neutral-3: hsl(223, 23%, 95%);\n\n    --neutral-8: hsl(223, 0%, 47%);\n    --neutral-9: hsl(223, 19%, 7%);\n\n    --box-shadow: hsla(223, 19%, 7%, 0.15) 0px 0px 5px -0.5px;\n}\n\nbody[data-theme="dark"] {\n    --neutral-1: hsl(223deg 19% 7% / 0%);\n    --neutral-2: hsl(223, 19%, 10%);\n    --neutral-3: hsl(223, 19%, 16%);\n\n    --neutral-8: hsl(223, 0%, 60%);\n    --neutral-9: hsl(223, 0%, 100%);\n\n    --box-shadow: hsla(0, 0%, 0%, 1) 0px 0px 5px -0.5px;\n}\n\nhtml {\n    font-size: clamp(8px, 3px + 1vw, 14px);\n}\n\nbody {\n    margin: 0px;\n    font-family: "Cairo", sans-serif;\n    --default-margin: 0.5rem;\n    --transition-duration: 200ms;\n}\n\n.container {\n    box-sizing: border-box;\n    position: relative;\n    background-color: var(--neutral-1);\n    border: hsl(223deg 23% 95% / 0%) dashed;\n}\n\n/* ---------------------------------------------------- */\n/* ---------------------- UTILITY ---------------------- */\n/* ---------------------------------------------------- */\n.bar {\n    z-index: 2;\n    position: absolute;\n    margin: var(--default-margin);\n    transition-duration: var(--transition-duration);\n    display: flex;\n    background-color: var(--neutral-2);\n    box-shadow: var(--box-shadow);\n}\n\n.bar__item {\n    display: flex;\n    vertical-align: middle;\n    align-items: center;\n    cursor: pointer;\n    &:hover {\n        background-color: var(--neutral-3);\n    }\n    &:active {\n        background-color: var(--neutral-2);\n    }\n}\n\n.bar__icon {\n    fill: var(--neutral-9);\n    height: 60%;\n    width: 60%;\n    margin: auto;\n}\n\n.bar__hr {\n    margin: 0;\n    border: var(--neutral-3) solid 0.5px;\n}\n\n/* ---------------------------------------------------- */\n/* --------------- Cyotscape Container ---------------- */\n/* ---------------------------------------------------- */\n.cy {\n    z-index: 1;\n    height: 100%;\n    box-sizing: border-box;\n    width: 100%;\n}\n\n/* ---------------------------------------------------- */\n/* --------------- Information Panel ------------------ */\n/* ---------------------------------------------------- */\n.infopanel {\n    z-index: 2;\n    box-sizing: border-box;\n    position: absolute;\n    top: 0rem;\n    bottom: 0rem;\n    margin: var(--default-margin);\n    width: 0rem;\n    transition-duration: var(--transition-duration);\n    /* content */\n    display: flex;\n    flex-direction: column;\n    padding: 1rem;\n    /* theme */\n    box-shadow: var(--box-shadow);\n    background-color: var(--neutral-2);\n}\n\n.infopanel[data-expanded="true"] {\n    width: 17.5rem;\n\n    & .infopanel__props {\n        border: var(--neutral-3) solid;\n    }\n    & .infopanel__help {\n        display: none;\n    }\n}\n\n.infopanel__help {\n    position: absolute;\n    bottom: calc(50% - 5rem);\n    left: 0rem;\n    height: auto;\n    transform: rotate(-90deg);\n    transform-origin: left top;\n    white-space: nowrap;\n}\n\n.infopanel__label {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n}\n\n.infopanel__name {\n    text-align: center;\n    align-content: center;\n    border-radius: 0.5rem;\n    border: var(--neutral-2) solid;\n    margin: auto;\n    width: 75%;\n    height: 2rem;\n    /* theme */\n    color: var(--neutral-9);\n    background-color: var(--neutral-2);\n    font-weight: 600;\n}\n\n.infopanel__icon {\n    width: 2rem;\n    height: 2rem;\n    border-radius: 1.3rem;\n    margin: auto 0.5rem;\n    /* theme */\n    color: var(--neutral-9);\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 65%;\n}\n\n.infopanel__props {\n    padding: 1rem;\n    margin-top: 1rem;\n    /* content */\n    display: flex;\n    flex-direction: column;\n    flex: 1px;\n    row-gap: 1rem;\n    overflow: auto;\n}\n\n.infopanel__key {\n    margin: 0;\n    line-height: 1.5rem;\n    color: var(--neutral-8);\n}\n\n.infopanel__val {\n    margin: 0;\n    line-height: 1.5rem;\n    color: var(--neutral-9);\n    font-weight: 600;\n}\n\n/* ---------------------------------------------------- */\n/* -------------------- Layout ------------------------ */\n/* ---------------------------------------------------- */\n#nodeActions {\n    left: 2.5rem; /*2.0 + 0.0 + 0.5*/\n    top: 0rem;\n    width: 2rem;\n    flex-direction: column;\n\n    &[data-expanded="true"] {\n        left: 18rem; /*2.0 + 17.5 + 0.5*/\n    }\n\n    & .bar__item {\n        height: 2.5rem;\n        display: none;\n    }\n}\n\n#toolbar {\n    top: 0rem;\n    right: 0rem;\n    height: 2rem;\n\n    & .bar__item {\n        width: 2.5rem;\n    }\n}\n\n#viewbar {\n    bottom: 0rem;\n    right: 0rem;\n    width: 2rem;\n    flex-direction: column;\n\n    & .bar__item {\n        height: 2.5rem;\n    }\n\n    & .viewbar__zoom {\n        height: 4rem;\n    }\n}\n`,
        "",
      ]);
      const g = c;
    },
    601: (e, n, t) => {
      var o = t(72),
        a = t.n(o),
        i = t(825),
        r = t.n(i),
        l = t(659),
        s = t.n(l),
        d = t(56),
        c = t.n(d),
        u = t(540),
        g = t.n(u),
        h = t(113),
        m = t.n(h),
        p = t(208),
        b = {};
      (b.styleTagTransform = m()),
        (b.setAttributes = c()),
        (b.insert = s().bind(null, "head")),
        (b.domAPI = r()),
        (b.insertStyleElement = g()),
        a()(p.A, b),
        p.A && p.A.locals && p.A.locals;
      var f = t(373);
      class y {
        constructor() {
          return y.instance
            ? y.instance
            : ((this.state = {
                selection: { selected: null, lastSelected: null },
                style: { theme: "light", custom_style: [] },
                layout: null,
                lastExpanded: !1,
              }),
              (this.observers = {
                selection: [],
                style: [],
                layout: [],
                lastExpanded: [],
              }),
              (y.instance = this),
              this);
        }
        getState(e) {
          return this.state[e];
        }
        updateState(e, n) {
          (this.state[e] = n), this.notify(e);
        }
        subscribe(e, n) {
          this.observers[e].push(n);
        }
        notify(e) {
          this.observers[e].forEach((n) => {
            n(this.state[e]);
          });
        }
      }
      const x = new y();
      Object.freeze(x);
      const v = x;
      function k(e, n) {
        let t;
        return function (...o) {
          clearTimeout(t), (t = setTimeout(() => e.apply(this, o), n));
        };
      }
      function w() {
        const e = document.getElementById("cy")?._cyreg?.cy;
        return e || (console.error("Cytoscape instance not found."), null);
      }
      const _ = k(function ({ action: e, data: n, timestamp: t } = {}) {
        f.wk.setComponentValue({ action: e, data: n, timestamp: t });
      }, 100);
      var E = t(165),
        I = t(527),
        C = t.n(I),
        S = t(95),
        B = t.n(S);
      const L = {
          dark: {
            highlight: "rgb(210, 0, 0)",
            line: "rgb(48, 49, 57)",
            font: "rgb(250, 250, 250)",
            border: "rgb(48, 49, 57)",
            fontHighlight: "rgb(250, 250, 250)",
          },
          light: {
            line: "rgb(195,195,195)",
            font: "rgb(5,5,5)",
            border: "rgb(250,250,250)",
            highlight: "rgb(255,50,50)",
            fontHighlight: "rgb(250, 250, 250)",
          },
        },
        z = {
          width: 20,
          height: 20,
          "border-width": 0.8,
          "font-size": 3.6,
          "text-valign": "bottom",
          "text-margin-y": 3.2,
          "background-repeat": "no-repeat",
          "background-width": "60%",
          "background-height": "60%",
          "background-color": "#0a0a0a",
        },
        A = {
          width: 2,
          "font-size": 3.2,
          "text-rotation": "autorotate",
          "text-background-padding": 1,
          "text-background-opacity": 1,
          "text-background-shape": "round-rectangle",
          "arrow-scale": 0.6,
          "curve-style": "bezier",
        },
        T = {
          "outline-width": 0.6,
          "font-weight": "bold",
          "text-background-opacity": 1,
          "text-background-shape": "round-rectangle",
          "text-background-padding": 1,
        },
        j = { "font-weight": "bold" };
      function O(e) {
        return [
          { selector: "*", style: { "min-zoomed-font-size": 10 } },
          {
            selector: "node",
            style: { ...z, color: L[e].font, "border-color": L[e].border },
          },
          {
            selector: "edge",
            style: {
              ...A,
              color: L[e].font,
              "line-color": L[e].line,
              "background-color": L[e].line,
              "target-arrow-color": L[e].line,
              "text-background-color": L[e].line,
            },
          },
        ];
      }
      function R(e) {
        return [
          {
            selector: "node:selected, node.highlight",
            style: {
              ...T,
              color: L[e].fontHighlight,
              "text-background-color": L[e].highlight,
              "outline-color": L[e].highlight,
            },
          },
          {
            selector: "edge:selected, edge.highlight",
            style: {
              ...j,
              color: L[e].fontHighlight,
              "line-color": L[e].highlight,
              "target-arrow-color": L[e].highlight,
              "text-background-color": L[e].highlight,
            },
          },
        ];
      }
      const N = {
        light: { default: O("light"), highlight: R("light") },
        dark: { default: O("dark"), highlight: R("dark") },
      };
      function D(e) {
        const n = { selected: null, lastSelected: null };
        "select" == e.type && (n.lastSelected = e.target),
          (n.selected = e.cy.$(":selected")),
          v.updateState("selection", n),
          document.body.focus();
      }
      E.A.use(C()), E.A.use(B());
      const H = {
          fullscreen: k(() => {
            document.fullscreenElement
              ? document.exitFullscreen()
              : document.getElementById("container").requestFullscreen();
          }, 100),
          refresh: k(() => {
            w().layout(v.getState("layout")).run();
          }, 200),
          export: k(() => {
            let e = w().elements().not(":hidden").jsons();
            (e = new Blob([JSON.stringify(e, null, 2)], {
              type: "application/json",
            })),
              (e = URL.createObjectURL(e));
            const n = document.createElement("a");
            (n.href = e),
              (n.download = "graph.json"),
              document.body.appendChild(n),
              n.click(),
              document.body.removeChild(n),
              URL.revokeObjectURL(e);
          }, 250),
        },
        F = 200,
        U = {
          plus: k(() => {
            const e = w(),
              n = e.extent();
            e.animate({
              zoom: {
                level: 1.25 * e.zoom(),
                position: { x: n.x1 + 0.5 * n.w, y: n.y1 + 0.5 * n.h },
              },
              duration: 50,
            });
          }, 50),
          minus: k(() => {
            const e = w(),
              n = e.extent();
            e.animate({
              zoom: {
                level: 0.8 * e.zoom(),
                position: { x: n.x1 + 0.5 * n.w, y: n.y1 + 0.5 * n.h },
              },
              duration: 50,
            });
          }, 50),
          fit: k(() => {
            w().animate({ fit: { padding: 20 }, duration: F });
          }, F),
          center: k(() => {
            w().animate({ center: {}, duration: F });
          }, F),
        },
        $ = {
          name: "fcose",
          animationDuration: 500,
          randomize: !1,
          fit: !1,
          nodeDimensionsIncludeLabels: !0,
          uniformNodeDimensions: !0,
          numIter: 50,
          tile: !1,
        },
        J = {
          remove: k(function () {
            const e = v.getState("selection").selected?.filter("node");
            e?.length > 0 &&
              (e.remove(),
              _({
                action: "remove",
                data: { node_ids: e.map((e) => e.id()) },
                timestamp: Date.now(),
              }),
              e.unselect(),
              v.updateState("lastExpanded", !1));
          }, 150),
          expand: k(function () {
            const e = v.getState("selection").lastSelected?.filter("node");
            "nodes" == e?.group() &&
              (_({
                action: "expand",
                data: { node_ids: [e.id()] },
                timestamp: Date.now(),
              }),
              v.updateState("lastExpanded", e));
          }, 150),
        };
      let M, P, V, q, Y, G, K;
      v.subscribe("selection", function () {
        const e = document.getElementById("infopanel"),
          n = document.getElementById("nodeActions"),
          { selected: t } = v.getState("selection");
        let o, a, i, r, l;
        1 === t?.length
          ? ((o = t.first().style().backgroundColor),
            (a = t.first().data()),
            (i = a.label || t.group().slice(0, -1).toUpperCase()),
            (r = !0),
            (l = t.style()["background-image"]))
          : ((o = "hsla(0, 0%, 0%, 0)"),
            (a = {}),
            (i = ""),
            (r = !1),
            (l = null)),
          e.setAttribute("data-expanded", r),
          n.setAttribute("data-expanded", r),
          (function (e, n, t) {
            const o = document.getElementById("infopanelLabel");
            (o.firstChild.innerText = n),
              (o.firstChild.style.borderColor = e),
              (o.lastChild.style.backgroundColor = e),
              (o.lastChild.style.backgroundImage =
                t && "none" != t ? `url(${t})` : "");
          })(o, i, l),
          (function (e) {
            document.getElementById("infopanelProps").innerHTML =
              Object.entries(e)
                .filter((e) => "label" != e[0])
                .map(
                  ([e, n]) =>
                    `\n        <div class='infopanel__prop'>\n            <p class='infopanel__key'>${e}</p>\n            <p class='infopanel__val'>${n}</p>\n        </div>`
                )
                .join("");
          })(a);
      }),
        v.subscribe("selection", function () {
          const e = w(),
            n = v.getState("selection").lastSelected;
          e.$(".highlight").removeClass("highlight");
          const t = n?.group();
          "nodes" == t
            ? n.connectedEdges().addClass("highlight")
            : "edges" == t && n.connectedNodes().addClass("highlight");
        }),
        v.subscribe("layout", function () {
          w().layout(v.getState("layout")).run();
        }),
        v.subscribe("style", function () {
          const e = w(),
            { theme: n, custom_style: t } = v.getState("style"),
            o = [...N[n].default, ...t, ...N[n].highlight];
          document.body.setAttribute("data-theme", n), e.style(o);
        }),
        document.addEventListener("fullscreenchange", function () {
          setTimeout(() => {
            f.wk.setFrameHeight(),
              document.getElementById("container").scrollIntoView();
          }, 150);
        }),
        setTimeout(() => {
          f.wk.setFrameHeight();
        }, 150),
        f.wk.events.addEventListener(
          f.wk.RENDER_EVENT,
          k(function (e) {
            const { args: n, theme: t } = e.detail;
            if (
              ((V = JSON.stringify(n.elements)),
              (Y = JSON.stringify(n.style) + t.base),
              (K = JSON.stringify(n.layout)),
              (document.getElementById("container").style.height = n.height),
              M ||
                ((document.getElementById("container").style.height = n.height),
                (M = (function (e) {
                  const n = (0, E.A)({
                    container: document.getElementById("cy"),
                  });
                  return (
                    n.on("select unselect", k(D, 100)),
                    e.forEach((e) => {
                      n.on(
                        e.event_type,
                        e.selector,
                        (n) => {
                          _({
                            action: e.name,
                            data: {
                              type: n.type,
                              target_id: n.target.id(),
                              target_group: n.target.group(),
                            },
                            timestamp: Date.now(),
                          });
                        },
                        Math.max(e.debounce, 100)
                      );
                    }),
                    n
                  );
                })(n.events)),
                M.json({ elements: n.elements }),
                (P = V),
                (function (e) {
                  if (0 !== e.length) {
                    if (e.includes("remove")) {
                      const e = document.getElementById("nodeActionsRemove");
                      e.addEventListener("click", J.remove),
                        (e.style.display = "flex"),
                        document.addEventListener("keydown", (e) => {
                          ["Delete", "Backspace"].includes(e.key) && J.remove();
                        }),
                        document.body.setAttribute("tabindex", "0");
                    }
                    if (e.includes("expand")) {
                      const e = document.getElementById("nodeActionsExpand");
                      e.addEventListener("click", J.expand),
                        (e.style.display = "flex"),
                        w().on("dblclick dbltap", "node", J.expand);
                    }
                  } else
                    document.getElementById("nodeActions").style.display =
                      "none";
                })(n.nodeActions),
                document
                  .getElementById("toolbarFullscreen")
                  .addEventListener("click", H.fullscreen),
                document
                  .getElementById("toolbarRefresh")
                  .addEventListener("click", H.refresh),
                document
                  .getElementById("toolbarExport")
                  .addEventListener("click", H.export),
                document
                  .getElementById("viewbarPlus")
                  .addEventListener("click", U.plus),
                document
                  .getElementById("viewbarMinus")
                  .addEventListener("click", U.minus),
                document
                  .getElementById("viewbarFit")
                  .addEventListener("click", U.fit),
                document
                  .getElementById("viewbarCenter")
                  .addEventListener("click", U.center)),
              V != P)
            ) {
              P = V;
              const e = v.getState("lastExpanded");
              !1 === e
                ? M.json({ elements: n.elements })
                : (function (e, n) {
                    const t = e.position(),
                      o = {
                        ...$,
                        fixedNodeConstraint: [{ nodeId: e.id(), position: t }],
                      };
                    n.position(t),
                      n.addClass("highlight"),
                      e.connectedEdges().addClass("highlight"),
                      w().layout(o).run();
                  })(
                    e,
                    M.add([...n.elements.nodes, ...n.elements.edges]).filter(
                      "node"
                    )
                  );
            }
            v.updateState("lastExpanded", !1),
              Y != q &&
                ((q = Y),
                v.updateState("style", {
                  custom_style: n.style,
                  theme: t.base,
                })),
              K != G && ((G = K), v.updateState("layout", n.layout)),
              setTimeout(() => {
                f.wk.setFrameHeight();
              }, 150);
          }, 100)
        ),
        f.wk.setComponentReady();
    },
    245: (e, n, t) => {
      e.exports = t.p + "32b01d6a21d9433a251c.ttf";
    },
  },
  (e) => {
    e.O(0, [293, 902, 986, 96], () => e((e.s = 601))), e.O();
  },
]);

