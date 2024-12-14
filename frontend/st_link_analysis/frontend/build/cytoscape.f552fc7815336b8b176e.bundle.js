/*! For license information please see cytoscape.f552fc7815336b8b176e.bundle.js.LICENSE.txt */
(self.webpackChunkst_link_analysis =
  self.webpackChunkst_link_analysis || []).push([
  [986],
  {
    95: function (e, t, n) {
      var r;
      (r = function (e) {
        return (function (e) {
          var t = {};
          function n(r) {
            if (t[r]) return t[r].exports;
            var i = (t[r] = { i: r, l: !1, exports: {} });
            return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
          }
          return (
            (n.m = e),
            (n.c = t),
            (n.i = function (e) {
              return e;
            }),
            (n.d = function (e, t, r) {
              n.o(e, t) ||
                Object.defineProperty(e, t, {
                  configurable: !1,
                  enumerable: !0,
                  get: r,
                });
            }),
            (n.n = function (e) {
              var t =
                e && e.__esModule
                  ? function () {
                      return e.default;
                    }
                  : function () {
                      return e;
                    };
              return n.d(t, "a", t), t;
            }),
            (n.o = function (e, t) {
              return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (n.p = ""),
            n((n.s = 3))
          );
        })([
          function (e, t, n) {
            "use strict";
            var r =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (e) {
                      return typeof e;
                    }
                  : function (e) {
                      return e &&
                        "function" == typeof Symbol &&
                        e.constructor === Symbol &&
                        e !== Symbol.prototype
                        ? "symbol"
                        : typeof e;
                    },
              i = n(1),
              a = n(2),
              o = n(5) || ("undefined" != typeof window ? window.cola : null),
              s = n(4),
              l = function (e) {
                return (void 0 === e ? "undefined" : r(e)) === r(0);
              },
              u = function () {},
              c = function (e, t) {
                var n;
                return null != (n = e) &&
                  (void 0 === n ? "undefined" : r(n)) === r(function () {})
                  ? e.apply(t, [t])
                  : e;
              };
            function d(e) {
              this.options = i({}, a, e);
            }
            (d.prototype.run = function () {
              var e = this,
                t = this.options;
              e.manuallyStopped = !1;
              var n = t.cy,
                i = t.eles,
                a = i.nodes(),
                d = i.edges(),
                h = !1,
                p = a.filter(function (e) {
                  return e.isParent();
                }),
                f = a.subtract(p),
                g = t.boundingBox || {
                  x1: 0,
                  y1: 0,
                  w: n.width(),
                  h: n.height(),
                };
              void 0 === g.x2 && (g.x2 = g.x1 + g.w),
                void 0 === g.w && (g.w = g.x2 - g.x1),
                void 0 === g.y2 && (g.y2 = g.y1 + g.h),
                void 0 === g.h && (g.h = g.y2 - g.y1);
              var v = function () {
                  for (var e = 0; e < a.length; e++) {
                    var r = a[e],
                      i = r.layoutDimensions(t),
                      o = r.scratch("cola");
                    if (!o.updatedDims) {
                      var s = c(t.nodeSpacing, r);
                      (o.width = i.w + 2 * s), (o.height = i.h + 2 * s);
                    }
                  }
                  a.positions(function (e) {
                    var t = e.scratch().cola,
                      n = void 0;
                    return (
                      !e.grabbed() &&
                        f.contains(e) &&
                        ((n = { x: g.x1 + t.x, y: g.y1 + t.y }),
                        (l(n.x) && l(n.y)) || (n = void 0)),
                      n
                    );
                  }),
                    a.updateCompoundBounds(),
                    h || (m(), (h = !0)),
                    t.fit && n.fit(t.padding);
                },
                y = function () {
                  t.ungrabifyWhileSimulating && w.grabify(),
                    n.off("destroy", E),
                    a.off("grab free position", C),
                    a.off("lock unlock", k),
                    e.one("layoutstop", t.stop),
                    e.trigger({ type: "layoutstop", layout: e });
                },
                m = function () {
                  e.one("layoutready", t.ready),
                    e.trigger({ type: "layoutready", layout: e });
                },
                b = t.refresh;
              b = t.refresh < 0 ? 1 : Math.max(1, b);
              var x = (e.adaptor = o.adaptor({
                trigger: function (e) {
                  var n = o.EventType ? o.EventType.tick : null,
                    r = o.EventType ? o.EventType.end : null;
                  switch (e.type) {
                    case "tick":
                    case n:
                      t.animate && v();
                      break;
                    case "end":
                    case r:
                      v(), t.infinite || y();
                  }
                },
                kick: function () {
                  var n = !0,
                    r = function () {
                      if (e.manuallyStopped) return y(), !0;
                      var r = x.tick();
                      return (
                        t.infinite ||
                          n ||
                          x.convergenceThreshold(t.convergenceThreshold),
                        (n = !1),
                        r && t.infinite && x.resume(),
                        r
                      );
                    };
                  if (t.animate)
                    s(function e() {
                      (function () {
                        for (var e = void 0, t = 0; t < b && !e; t++)
                          e = e || r();
                        return e;
                      })() || s(e);
                    });
                  else for (; !r(); );
                },
                on: u,
                drag: u,
              }));
              e.adaptor = x;
              var w = a.filter(":grabbable");
              t.ungrabifyWhileSimulating && w.ungrabify();
              var E = void 0;
              n.one(
                "destroy",
                (E = function () {
                  e.stop();
                })
              );
              var C = void 0;
              a.on(
                "grab free position",
                (C = function (e) {
                  var t = this,
                    n = t.scratch().cola,
                    r = t.position();
                  if (e.cyTarget === t || e.target === t)
                    switch (e.type) {
                      case "grab":
                        x.dragstart(n);
                        break;
                      case "free":
                        x.dragend(n);
                        break;
                      case "position":
                        (n.px === r.x - g.x1 && n.py === r.y - g.y1) ||
                          ((n.px = r.x - g.x1), (n.py = r.y - g.y1));
                    }
                })
              );
              var k = void 0;
              a.on(
                "lock unlock",
                (k = function () {
                  var e = this,
                    t = e.scratch().cola;
                  (t.fixed = e.locked()),
                    e.locked() ? x.dragstart(t) : x.dragend(t);
                })
              ),
                x.nodes(
                  f.map(function (e, n) {
                    var r = c(t.nodeSpacing, e),
                      i = e.position(),
                      a = e.layoutDimensions(t);
                    return (e.scratch().cola = {
                      x:
                        (t.randomize && !e.locked()) || void 0 === i.x
                          ? Math.round(Math.random() * g.w)
                          : i.x,
                      y:
                        (t.randomize && !e.locked()) || void 0 === i.y
                          ? Math.round(Math.random() * g.h)
                          : i.y,
                      width: a.w + 2 * r,
                      height: a.h + 2 * r,
                      index: n,
                      fixed: e.locked(),
                    });
                  })
                );
              var T = [];
              t.alignment &&
                (t.alignment.vertical &&
                  t.alignment.vertical.forEach(function (e) {
                    var t = [];
                    e.forEach(function (e) {
                      var n = e.node.scratch().cola.index;
                      t.push({ node: n, offset: e.offset ? e.offset : 0 });
                    }),
                      T.push({ type: "alignment", axis: "x", offsets: t });
                  }),
                t.alignment.horizontal &&
                  t.alignment.horizontal.forEach(function (e) {
                    var t = [];
                    e.forEach(function (e) {
                      var n = e.node.scratch().cola.index;
                      t.push({ node: n, offset: e.offset ? e.offset : 0 });
                    }),
                      T.push({ type: "alignment", axis: "y", offsets: t });
                  })),
                t.gapInequalities &&
                  t.gapInequalities.forEach(function (e) {
                    var t = e.left.scratch().cola.index,
                      n = e.right.scratch().cola.index;
                    T.push({
                      axis: e.axis,
                      left: t,
                      right: n,
                      gap: e.gap,
                      equality: e.equality,
                    });
                  }),
                T.length > 0 && x.constraints(T),
                x.groups(
                  p
                    .map(function (e, n) {
                      var r = c(t.nodeSpacing, e),
                        i = function (t) {
                          return parseFloat(e.style("padding-" + t));
                        },
                        a = i("left") + r,
                        o = i("right") + r,
                        s = i("top") + r,
                        l = i("bottom") + r;
                      return (
                        (e.scratch().cola = {
                          index: n,
                          padding: Math.max(a, o, s, l),
                          leaves: e
                            .children()
                            .intersection(f)
                            .map(function (e) {
                              return e[0].scratch().cola.index;
                            }),
                          fixed: e.locked(),
                        }),
                        e
                      );
                    })
                    .map(function (e) {
                      return (
                        (e.scratch().cola.groups = e
                          .children()
                          .intersection(p)
                          .map(function (e) {
                            return e.scratch().cola.index;
                          })),
                        e.scratch().cola
                      );
                    })
                );
              var S,
                P = void 0,
                D = void 0;
              if (
                (null != t.edgeLength
                  ? ((P = t.edgeLength), (D = "linkDistance"))
                  : null != t.edgeSymDiffLength
                  ? ((P = t.edgeSymDiffLength),
                    (D = "symmetricDiffLinkLengths"))
                  : null != t.edgeJaccardLength
                  ? ((P = t.edgeJaccardLength), (D = "jaccardLinkLengths"))
                  : ((P = 100), (D = "linkDistance")),
                x.links(
                  d
                    .stdFilter(function (e) {
                      return f.contains(e.source()) && f.contains(e.target());
                    })
                    .map(function (e) {
                      var t = (e.scratch().cola = {
                        source: e.source()[0].scratch().cola.index,
                        target: e.target()[0].scratch().cola.index,
                      });
                      return null != P && (t.calcLength = c(P, e)), t;
                    })
                ),
                x.size([g.w, g.h]),
                null != P &&
                  x[D](function (e) {
                    return e.calcLength;
                  }),
                t.flow)
              ) {
                var _ = void 0;
                (void 0 === (S = t.flow) ? "undefined" : r(S)) === r("")
                  ? (_ = { axis: t.flow, minSeparation: 50 })
                  : l(t.flow)
                  ? (_ = { axis: "y", minSeparation: t.flow })
                  : (function (e) {
                      return (
                        null != e &&
                        (void 0 === e ? "undefined" : r(e)) === r({})
                      );
                    })(t.flow)
                  ? (((_ = t.flow).axis = _.axis || "y"),
                    (_.minSeparation =
                      null != _.minSeparation ? _.minSeparation : 50))
                  : (_ = { axis: "y", minSeparation: 50 }),
                  x.flowLayout(_.axis, _.minSeparation);
              }
              return (
                e.trigger({ type: "layoutstart", layout: e }),
                x
                  .avoidOverlaps(t.avoidOverlap)
                  .handleDisconnected(t.handleDisconnected)
                  .start(
                    t.unconstrIter,
                    t.userConstIter,
                    t.allConstIter,
                    void 0,
                    void 0,
                    t.centerGraph
                  ),
                t.infinite ||
                  setTimeout(function () {
                    e.manuallyStopped || x.stop();
                  }, t.maxSimulationTime),
                this
              );
            }),
              (d.prototype.stop = function () {
                return (
                  this.adaptor &&
                    ((this.manuallyStopped = !0), this.adaptor.stop()),
                  this
                );
              }),
              (e.exports = d);
          },
          function (e, t, n) {
            "use strict";
            e.exports =
              null != Object.assign
                ? Object.assign.bind(Object)
                : function (e) {
                    for (
                      var t = arguments.length,
                        n = Array(t > 1 ? t - 1 : 0),
                        r = 1;
                      r < t;
                      r++
                    )
                      n[r - 1] = arguments[r];
                    return (
                      n
                        .filter(function (e) {
                          return null != e;
                        })
                        .forEach(function (t) {
                          Object.keys(t).forEach(function (n) {
                            return (e[n] = t[n]);
                          });
                        }),
                      e
                    );
                  };
          },
          function (e, t, n) {
            "use strict";
            e.exports = {
              animate: !0,
              refresh: 1,
              maxSimulationTime: 4e3,
              ungrabifyWhileSimulating: !1,
              fit: !0,
              padding: 30,
              boundingBox: void 0,
              nodeDimensionsIncludeLabels: !1,
              ready: function () {},
              stop: function () {},
              randomize: !1,
              avoidOverlap: !0,
              handleDisconnected: !0,
              convergenceThreshold: 0.01,
              nodeSpacing: function (e) {
                return 10;
              },
              flow: void 0,
              alignment: void 0,
              gapInequalities: void 0,
              centerGraph: !0,
              edgeLength: void 0,
              edgeSymDiffLength: void 0,
              edgeJaccardLength: void 0,
              unconstrIter: void 0,
              userConstIter: void 0,
              allConstIter: void 0,
              infinite: !1,
            };
          },
          function (e, t, n) {
            "use strict";
            var r = n(0),
              i = function (e) {
                e && e("layout", "cola", r);
              };
            "undefined" != typeof cytoscape && i(cytoscape), (e.exports = i);
          },
          function (e, t, n) {
            "use strict";
            var r,
              i =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (e) {
                      return typeof e;
                    }
                  : function (e) {
                      return e &&
                        "function" == typeof Symbol &&
                        e.constructor === Symbol &&
                        e !== Symbol.prototype
                        ? "symbol"
                        : typeof e;
                    };
            (r =
              "undefined" !==
              ("undefined" == typeof window ? "undefined" : i(window))
                ? window.requestAnimationFrame ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame ||
                  window.msRequestAnimationFrame ||
                  function (e) {
                    return setTimeout(e, 16);
                  }
                : function (e) {
                    e();
                  }),
              (e.exports = r);
          },
          function (t, n) {
            t.exports = e;
          },
        ]);
      }),
        (e.exports = r(n(109)));
    },
    527: function (e, t, n) {
      var r;
      (r = function (e) {
        return (() => {
          "use strict";
          var t = {
              658: (e) => {
                e.exports =
                  null != Object.assign
                    ? Object.assign.bind(Object)
                    : function (e) {
                        for (
                          var t = arguments.length,
                            n = Array(t > 1 ? t - 1 : 0),
                            r = 1;
                          r < t;
                          r++
                        )
                          n[r - 1] = arguments[r];
                        return (
                          n.forEach(function (t) {
                            Object.keys(t).forEach(function (n) {
                              return (e[n] = t[n]);
                            });
                          }),
                          e
                        );
                      };
              },
              548: (e, t, n) => {
                var r = function (e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e))
                      return (function (e, t) {
                        var n = [],
                          r = !0,
                          i = !1,
                          a = void 0;
                        try {
                          for (
                            var o, s = e[Symbol.iterator]();
                            !(r = (o = s.next()).done) &&
                            (n.push(o.value), !t || n.length !== t);
                            r = !0
                          );
                        } catch (e) {
                          (i = !0), (a = e);
                        } finally {
                          try {
                            !r && s.return && s.return();
                          } finally {
                            if (i) throw a;
                          }
                        }
                        return n;
                      })(e, t);
                    throw new TypeError(
                      "Invalid attempt to destructure non-iterable instance"
                    );
                  },
                  i = n(140).layoutBase.LinkedList,
                  a = {
                    getTopMostNodes: function (e) {
                      for (var t = {}, n = 0; n < e.length; n++)
                        t[e[n].id()] = !0;
                      var r = e.filter(function (e, n) {
                        "number" == typeof e && (e = n);
                        for (var r = e.parent()[0]; null != r; ) {
                          if (t[r.id()]) return !1;
                          r = r.parent()[0];
                        }
                        return !0;
                      });
                      return r;
                    },
                    connectComponents: function (e, t, n, r) {
                      var a = new i(),
                        o = new Set(),
                        s = [],
                        l = void 0,
                        u = void 0,
                        c = void 0,
                        d = !1,
                        h = 1,
                        p = [],
                        f = [],
                        g = function () {
                          var r = e.collection();
                          f.push(r);
                          var i = n[0],
                            g = e.collection();
                          g.merge(i).merge(i.descendants().intersection(t)),
                            s.push(i),
                            g.forEach(function (e) {
                              a.push(e), o.add(e), r.merge(e);
                            });
                          for (
                            var v = function () {
                              i = a.shift();
                              var u = e.collection();
                              i.neighborhood()
                                .nodes()
                                .forEach(function (e) {
                                  t.intersection(i.edgesWith(e)).length > 0 &&
                                    u.merge(e);
                                });
                              for (var c = 0; c < u.length; c++) {
                                var d = u[c];
                                null ==
                                  (l = n.intersection(
                                    d.union(d.ancestors())
                                  )) ||
                                  o.has(l[0]) ||
                                  l
                                    .union(l.descendants())
                                    .forEach(function (e) {
                                      a.push(e),
                                        o.add(e),
                                        r.merge(e),
                                        n.has(e) && s.push(e);
                                    });
                              }
                            };
                            0 != a.length;

                          )
                            v();
                          if (
                            (r.forEach(function (e) {
                              t.intersection(e.connectedEdges()).forEach(
                                function (e) {
                                  r.has(e.source()) &&
                                    r.has(e.target()) &&
                                    r.merge(e);
                                }
                              );
                            }),
                            s.length == n.length && (d = !0),
                            !d || (d && h > 1))
                          ) {
                            (u = s[0]),
                              (c = u.connectedEdges().length),
                              s.forEach(function (e) {
                                e.connectedEdges().length < c &&
                                  ((c = e.connectedEdges().length), (u = e));
                              }),
                              p.push(u.id());
                            var y = e.collection();
                            y.merge(s[0]),
                              s.forEach(function (e) {
                                y.merge(e);
                              }),
                              (s = []),
                              (n = n.difference(y)),
                              h++;
                          }
                        };
                      do {
                        g();
                      } while (!d);
                      return (
                        r && p.length > 0 && r.set("dummy" + (r.size + 1), p), f
                      );
                    },
                    relocateComponent: function (e, t, n) {
                      if (!n.fixedNodeConstraint) {
                        var i = Number.POSITIVE_INFINITY,
                          a = Number.NEGATIVE_INFINITY,
                          o = Number.POSITIVE_INFINITY,
                          s = Number.NEGATIVE_INFINITY;
                        if ("draft" == n.quality) {
                          var l = !0,
                            u = !1,
                            c = void 0;
                          try {
                            for (
                              var d, h = t.nodeIndexes[Symbol.iterator]();
                              !(l = (d = h.next()).done);
                              l = !0
                            ) {
                              var p = d.value,
                                f = r(p, 2),
                                g = f[0],
                                v = f[1],
                                y = n.cy.getElementById(g);
                              if (y) {
                                var m = y.boundingBox(),
                                  b = t.xCoords[v] - m.w / 2,
                                  x = t.xCoords[v] + m.w / 2,
                                  w = t.yCoords[v] - m.h / 2,
                                  E = t.yCoords[v] + m.h / 2;
                                b < i && (i = b),
                                  x > a && (a = x),
                                  w < o && (o = w),
                                  E > s && (s = E);
                              }
                            }
                          } catch (e) {
                            (u = !0), (c = e);
                          } finally {
                            try {
                              !l && h.return && h.return();
                            } finally {
                              if (u) throw c;
                            }
                          }
                          var C = e.x - (a + i) / 2,
                            k = e.y - (s + o) / 2;
                          (t.xCoords = t.xCoords.map(function (e) {
                            return e + C;
                          })),
                            (t.yCoords = t.yCoords.map(function (e) {
                              return e + k;
                            }));
                        } else {
                          Object.keys(t).forEach(function (e) {
                            var n = t[e],
                              r = n.getRect().x,
                              l = n.getRect().x + n.getRect().width,
                              u = n.getRect().y,
                              c = n.getRect().y + n.getRect().height;
                            r < i && (i = r),
                              l > a && (a = l),
                              u < o && (o = u),
                              c > s && (s = c);
                          });
                          var T = e.x - (a + i) / 2,
                            S = e.y - (s + o) / 2;
                          Object.keys(t).forEach(function (e) {
                            var n = t[e];
                            n.setCenter(n.getCenterX() + T, n.getCenterY() + S);
                          });
                        }
                      }
                    },
                    calcBoundingBox: function (e, t, n, r) {
                      for (
                        var i = Number.MAX_SAFE_INTEGER,
                          a = Number.MIN_SAFE_INTEGER,
                          o = Number.MAX_SAFE_INTEGER,
                          s = Number.MIN_SAFE_INTEGER,
                          l = void 0,
                          u = void 0,
                          c = void 0,
                          d = void 0,
                          h = e.descendants().not(":parent"),
                          p = h.length,
                          f = 0;
                        f < p;
                        f++
                      ) {
                        var g = h[f];
                        i > (l = t[r.get(g.id())] - g.width() / 2) && (i = l),
                          a < (u = t[r.get(g.id())] + g.width() / 2) && (a = u),
                          o > (c = n[r.get(g.id())] - g.height() / 2) &&
                            (o = c),
                          s < (d = n[r.get(g.id())] + g.height() / 2) &&
                            (s = d);
                      }
                      var v = {};
                      return (
                        (v.topLeftX = i),
                        (v.topLeftY = o),
                        (v.width = a - i),
                        (v.height = s - o),
                        v
                      );
                    },
                    calcParentsWithoutChildren: function (e, t) {
                      var n = e.collection();
                      return (
                        t.nodes(":parent").forEach(function (e) {
                          var t = !1;
                          e.children().forEach(function (e) {
                            "none" != e.css("display") && (t = !0);
                          }),
                            t || n.merge(e);
                        }),
                        n
                      );
                    },
                  };
                e.exports = a;
              },
              816: (e, t, n) => {
                var r = n(548),
                  i = n(140).CoSELayout,
                  a = n(140).CoSENode,
                  o = n(140).layoutBase.PointD,
                  s = n(140).layoutBase.DimensionD,
                  l = n(140).layoutBase.LayoutConstants,
                  u = n(140).layoutBase.FDLayoutConstants,
                  c = n(140).CoSEConstants;
                e.exports = {
                  coseLayout: function (e, t) {
                    var n = e.cy,
                      d = e.eles,
                      h = d.nodes(),
                      p = d.edges(),
                      f = void 0,
                      g = void 0,
                      v = void 0,
                      y = {};
                    e.randomize &&
                      ((f = t.nodeIndexes), (g = t.xCoords), (v = t.yCoords));
                    var m = function (e) {
                        return "function" == typeof e;
                      },
                      b = function (e, t) {
                        return m(e) ? e(t) : e;
                      },
                      x = r.calcParentsWithoutChildren(n, d);
                    null != e.nestingFactor &&
                      (c.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR =
                        u.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR =
                          e.nestingFactor),
                      null != e.gravity &&
                        (c.DEFAULT_GRAVITY_STRENGTH =
                          u.DEFAULT_GRAVITY_STRENGTH =
                            e.gravity),
                      null != e.numIter &&
                        (c.MAX_ITERATIONS = u.MAX_ITERATIONS = e.numIter),
                      null != e.gravityRange &&
                        (c.DEFAULT_GRAVITY_RANGE_FACTOR =
                          u.DEFAULT_GRAVITY_RANGE_FACTOR =
                            e.gravityRange),
                      null != e.gravityCompound &&
                        (c.DEFAULT_COMPOUND_GRAVITY_STRENGTH =
                          u.DEFAULT_COMPOUND_GRAVITY_STRENGTH =
                            e.gravityCompound),
                      null != e.gravityRangeCompound &&
                        (c.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR =
                          u.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR =
                            e.gravityRangeCompound),
                      null != e.initialEnergyOnIncremental &&
                        (c.DEFAULT_COOLING_FACTOR_INCREMENTAL =
                          u.DEFAULT_COOLING_FACTOR_INCREMENTAL =
                            e.initialEnergyOnIncremental),
                      null != e.tilingCompareBy &&
                        (c.TILING_COMPARE_BY = e.tilingCompareBy),
                      "proof" == e.quality ? (l.QUALITY = 2) : (l.QUALITY = 0),
                      (c.NODE_DIMENSIONS_INCLUDE_LABELS =
                        u.NODE_DIMENSIONS_INCLUDE_LABELS =
                        l.NODE_DIMENSIONS_INCLUDE_LABELS =
                          e.nodeDimensionsIncludeLabels),
                      (c.DEFAULT_INCREMENTAL =
                        u.DEFAULT_INCREMENTAL =
                        l.DEFAULT_INCREMENTAL =
                          !e.randomize),
                      (c.ANIMATE = u.ANIMATE = l.ANIMATE = e.animate),
                      (c.TILE = e.tile),
                      (c.TILING_PADDING_VERTICAL =
                        "function" == typeof e.tilingPaddingVertical
                          ? e.tilingPaddingVertical.call()
                          : e.tilingPaddingVertical),
                      (c.TILING_PADDING_HORIZONTAL =
                        "function" == typeof e.tilingPaddingHorizontal
                          ? e.tilingPaddingHorizontal.call()
                          : e.tilingPaddingHorizontal),
                      (c.DEFAULT_INCREMENTAL =
                        u.DEFAULT_INCREMENTAL =
                        l.DEFAULT_INCREMENTAL =
                          !0),
                      (c.PURE_INCREMENTAL = !e.randomize),
                      (l.DEFAULT_UNIFORM_LEAF_NODE_SIZES =
                        e.uniformNodeDimensions),
                      "transformed" == e.step &&
                        ((c.TRANSFORM_ON_CONSTRAINT_HANDLING = !0),
                        (c.ENFORCE_CONSTRAINTS = !1),
                        (c.APPLY_LAYOUT = !1)),
                      "enforced" == e.step &&
                        ((c.TRANSFORM_ON_CONSTRAINT_HANDLING = !1),
                        (c.ENFORCE_CONSTRAINTS = !0),
                        (c.APPLY_LAYOUT = !1)),
                      "cose" == e.step &&
                        ((c.TRANSFORM_ON_CONSTRAINT_HANDLING = !1),
                        (c.ENFORCE_CONSTRAINTS = !1),
                        (c.APPLY_LAYOUT = !0)),
                      "all" == e.step &&
                        (e.randomize
                          ? (c.TRANSFORM_ON_CONSTRAINT_HANDLING = !0)
                          : (c.TRANSFORM_ON_CONSTRAINT_HANDLING = !1),
                        (c.ENFORCE_CONSTRAINTS = !0),
                        (c.APPLY_LAYOUT = !0)),
                      e.fixedNodeConstraint ||
                      e.alignmentConstraint ||
                      e.relativePlacementConstraint
                        ? (c.TREE_REDUCTION_ON_INCREMENTAL = !1)
                        : (c.TREE_REDUCTION_ON_INCREMENTAL = !0);
                    var w = new i(),
                      E = w.newGraphManager();
                    return (
                      (function e(t, n, i, l) {
                        for (var u = n.length, c = 0; c < u; c++) {
                          var d = n[c],
                            h = null;
                          0 == d.intersection(x).length && (h = d.children());
                          var p = void 0,
                            m = d.layoutDimensions({
                              nodeDimensionsIncludeLabels:
                                l.nodeDimensionsIncludeLabels,
                            });
                          if (null != d.outerWidth() && null != d.outerHeight())
                            if (l.randomize)
                              if (d.isParent()) {
                                var w = r.calcBoundingBox(d, g, v, f);
                                p =
                                  0 == d.intersection(x).length
                                    ? t.add(
                                        new a(
                                          i.graphManager,
                                          new o(w.topLeftX, w.topLeftY),
                                          new s(w.width, w.height)
                                        )
                                      )
                                    : t.add(
                                        new a(
                                          i.graphManager,
                                          new o(w.topLeftX, w.topLeftY),
                                          new s(
                                            parseFloat(m.w),
                                            parseFloat(m.h)
                                          )
                                        )
                                      );
                              } else
                                p = t.add(
                                  new a(
                                    i.graphManager,
                                    new o(
                                      g[f.get(d.id())] - m.w / 2,
                                      v[f.get(d.id())] - m.h / 2
                                    ),
                                    new s(parseFloat(m.w), parseFloat(m.h))
                                  )
                                );
                            else
                              p = t.add(
                                new a(
                                  i.graphManager,
                                  new o(
                                    d.position("x") - m.w / 2,
                                    d.position("y") - m.h / 2
                                  ),
                                  new s(parseFloat(m.w), parseFloat(m.h))
                                )
                              );
                          else p = t.add(new a(this.graphManager));
                          (p.id = d.data("id")),
                            (p.nodeRepulsion = b(l.nodeRepulsion, d)),
                            (p.paddingLeft = parseInt(d.css("padding"))),
                            (p.paddingTop = parseInt(d.css("padding"))),
                            (p.paddingRight = parseInt(d.css("padding"))),
                            (p.paddingBottom = parseInt(d.css("padding"))),
                            l.nodeDimensionsIncludeLabels &&
                              ((p.labelWidth = d.boundingBox({
                                includeLabels: !0,
                                includeNodes: !1,
                                includeOverlays: !1,
                              }).w),
                              (p.labelHeight = d.boundingBox({
                                includeLabels: !0,
                                includeNodes: !1,
                                includeOverlays: !1,
                              }).h),
                              (p.labelPosVertical = d.css("text-valign")),
                              (p.labelPosHorizontal = d.css("text-halign"))),
                            (y[d.data("id")] = p),
                            isNaN(p.rect.x) && (p.rect.x = 0),
                            isNaN(p.rect.y) && (p.rect.y = 0),
                            null != h &&
                              h.length > 0 &&
                              e(
                                i.getGraphManager().add(i.newGraph(), p),
                                h,
                                i,
                                l
                              );
                        }
                      })(E.addRoot(), r.getTopMostNodes(h), w, e),
                      (function (t, n, r) {
                        for (var i = 0, a = 0, o = 0; o < r.length; o++) {
                          var s = r[o],
                            l = y[s.data("source")],
                            d = y[s.data("target")];
                          if (
                            l &&
                            d &&
                            l !== d &&
                            0 == l.getEdgesBetween(d).length
                          ) {
                            var h = n.add(t.newEdge(), l, d);
                            (h.id = s.id()),
                              (h.idealLength = b(e.idealEdgeLength, s)),
                              (h.edgeElasticity = b(e.edgeElasticity, s)),
                              (i += h.idealLength),
                              a++;
                          }
                        }
                        null != e.idealEdgeLength &&
                          (a > 0
                            ? (c.DEFAULT_EDGE_LENGTH = u.DEFAULT_EDGE_LENGTH =
                                i / a)
                            : m(e.idealEdgeLength)
                            ? (c.DEFAULT_EDGE_LENGTH = u.DEFAULT_EDGE_LENGTH =
                                50)
                            : (c.DEFAULT_EDGE_LENGTH = u.DEFAULT_EDGE_LENGTH =
                                e.idealEdgeLength),
                          (c.MIN_REPULSION_DIST = u.MIN_REPULSION_DIST =
                            u.DEFAULT_EDGE_LENGTH / 10),
                          (c.DEFAULT_RADIAL_SEPARATION =
                            u.DEFAULT_EDGE_LENGTH));
                      })(w, E, p),
                      (function (e, t) {
                        t.fixedNodeConstraint &&
                          (e.constraints.fixedNodeConstraint =
                            t.fixedNodeConstraint),
                          t.alignmentConstraint &&
                            (e.constraints.alignmentConstraint =
                              t.alignmentConstraint),
                          t.relativePlacementConstraint &&
                            (e.constraints.relativePlacementConstraint =
                              t.relativePlacementConstraint);
                      })(w, e),
                      w.runLayout(),
                      y
                    );
                  },
                };
              },
              212: (e, t, n) => {
                var r = (function () {
                    function e(e, t) {
                      for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        (r.enumerable = r.enumerable || !1),
                          (r.configurable = !0),
                          "value" in r && (r.writable = !0),
                          Object.defineProperty(e, r.key, r);
                      }
                    }
                    return function (t, n, r) {
                      return n && e(t.prototype, n), r && e(t, r), t;
                    };
                  })(),
                  i = n(658),
                  a = n(548),
                  o = n(657).spectralLayout,
                  s = n(816).coseLayout,
                  l = Object.freeze({
                    quality: "default",
                    randomize: !0,
                    animate: !0,
                    animationDuration: 1e3,
                    animationEasing: void 0,
                    fit: !0,
                    padding: 30,
                    nodeDimensionsIncludeLabels: !1,
                    uniformNodeDimensions: !1,
                    packComponents: !0,
                    step: "all",
                    samplingType: !0,
                    sampleSize: 25,
                    nodeSeparation: 75,
                    piTol: 1e-7,
                    nodeRepulsion: function (e) {
                      return 4500;
                    },
                    idealEdgeLength: function (e) {
                      return 50;
                    },
                    edgeElasticity: function (e) {
                      return 0.45;
                    },
                    nestingFactor: 0.1,
                    gravity: 0.25,
                    numIter: 2500,
                    tile: !0,
                    tilingCompareBy: void 0,
                    tilingPaddingVertical: 10,
                    tilingPaddingHorizontal: 10,
                    gravityRangeCompound: 1.5,
                    gravityCompound: 1,
                    gravityRange: 3.8,
                    initialEnergyOnIncremental: 0.3,
                    fixedNodeConstraint: void 0,
                    alignmentConstraint: void 0,
                    relativePlacementConstraint: void 0,
                    ready: function () {},
                    stop: function () {},
                  }),
                  u = (function () {
                    function e(t) {
                      !(function (e, t) {
                        if (!(e instanceof t))
                          throw new TypeError(
                            "Cannot call a class as a function"
                          );
                      })(this, e),
                        (this.options = i({}, l, t));
                    }
                    return (
                      r(e, [
                        {
                          key: "run",
                          value: function () {
                            var e = this.options,
                              t = e.cy,
                              n = e.eles,
                              r = [],
                              i = [],
                              l = void 0,
                              u = [];
                            !e.fixedNodeConstraint ||
                              (Array.isArray(e.fixedNodeConstraint) &&
                                0 != e.fixedNodeConstraint.length) ||
                              (e.fixedNodeConstraint = void 0),
                              e.alignmentConstraint &&
                                (!e.alignmentConstraint.vertical ||
                                  (Array.isArray(
                                    e.alignmentConstraint.vertical
                                  ) &&
                                    0 !=
                                      e.alignmentConstraint.vertical.length) ||
                                  (e.alignmentConstraint.vertical = void 0),
                                !e.alignmentConstraint.horizontal ||
                                  (Array.isArray(
                                    e.alignmentConstraint.horizontal
                                  ) &&
                                    0 !=
                                      e.alignmentConstraint.horizontal
                                        .length) ||
                                  (e.alignmentConstraint.horizontal = void 0)),
                              !e.relativePlacementConstraint ||
                                (Array.isArray(e.relativePlacementConstraint) &&
                                  0 != e.relativePlacementConstraint.length) ||
                                (e.relativePlacementConstraint = void 0),
                              (e.fixedNodeConstraint ||
                                e.alignmentConstraint ||
                                e.relativePlacementConstraint) &&
                                ((e.tile = !1), (e.packComponents = !1));
                            var c = void 0,
                              d = !1;
                            if (
                              (t.layoutUtilities &&
                                e.packComponents &&
                                ((c = t.layoutUtilities("get")) ||
                                  (c = t.layoutUtilities()),
                                (d = !0)),
                              n.nodes().length > 0)
                            )
                              if (d) {
                                var h = a.getTopMostNodes(e.eles.nodes());
                                if (
                                  ((l = a.connectComponents(
                                    t,
                                    e.eles,
                                    h
                                  )).forEach(function (e) {
                                    var t = e.boundingBox();
                                    u.push({
                                      x: t.x1 + t.w / 2,
                                      y: t.y1 + t.h / 2,
                                    });
                                  }),
                                  e.randomize &&
                                    l.forEach(function (t) {
                                      (e.eles = t), r.push(o(e));
                                    }),
                                  "default" == e.quality ||
                                    "proof" == e.quality)
                                ) {
                                  var p = t.collection();
                                  if (e.tile) {
                                    var f = new Map(),
                                      g = 0,
                                      v = {
                                        nodeIndexes: f,
                                        xCoords: [],
                                        yCoords: [],
                                      },
                                      y = [];
                                    if (
                                      (l.forEach(function (e, t) {
                                        0 == e.edges().length &&
                                          (e.nodes().forEach(function (t, n) {
                                            p.merge(e.nodes()[n]),
                                              t.isParent() ||
                                                (v.nodeIndexes.set(
                                                  e.nodes()[n].id(),
                                                  g++
                                                ),
                                                v.xCoords.push(
                                                  e.nodes()[0].position().x
                                                ),
                                                v.yCoords.push(
                                                  e.nodes()[0].position().y
                                                ));
                                          }),
                                          y.push(t));
                                      }),
                                      p.length > 1)
                                    ) {
                                      var m = p.boundingBox();
                                      u.push({
                                        x: m.x1 + m.w / 2,
                                        y: m.y1 + m.h / 2,
                                      }),
                                        l.push(p),
                                        r.push(v);
                                      for (var b = y.length - 1; b >= 0; b--)
                                        l.splice(y[b], 1),
                                          r.splice(y[b], 1),
                                          u.splice(y[b], 1);
                                    }
                                  }
                                  l.forEach(function (t, n) {
                                    (e.eles = t),
                                      i.push(s(e, r[n])),
                                      a.relocateComponent(u[n], i[n], e);
                                  });
                                } else
                                  l.forEach(function (t, n) {
                                    a.relocateComponent(u[n], r[n], e);
                                  });
                                var x = new Set();
                                if (l.length > 1) {
                                  var w = [],
                                    E = n.filter(function (e) {
                                      return "none" == e.css("display");
                                    });
                                  l.forEach(function (t, n) {
                                    var o = void 0;
                                    if (
                                      ("draft" == e.quality &&
                                        (o = r[n].nodeIndexes),
                                      t.nodes().not(E).length > 0)
                                    ) {
                                      var s = { edges: [], nodes: [] },
                                        l = void 0;
                                      t
                                        .nodes()
                                        .not(E)
                                        .forEach(function (t) {
                                          if ("draft" == e.quality)
                                            if (t.isParent()) {
                                              var u = a.calcBoundingBox(
                                                t,
                                                r[n].xCoords,
                                                r[n].yCoords,
                                                o
                                              );
                                              s.nodes.push({
                                                x: u.topLeftX,
                                                y: u.topLeftY,
                                                width: u.width,
                                                height: u.height,
                                              });
                                            } else
                                              (l = o.get(t.id())),
                                                s.nodes.push({
                                                  x:
                                                    r[n].xCoords[l] -
                                                    t.boundingbox().w / 2,
                                                  y:
                                                    r[n].yCoords[l] -
                                                    t.boundingbox().h / 2,
                                                  width: t.boundingbox().w,
                                                  height: t.boundingbox().h,
                                                });
                                          else
                                            i[n][t.id()] &&
                                              s.nodes.push({
                                                x: i[n][t.id()].getLeft(),
                                                y: i[n][t.id()].getTop(),
                                                width: i[n][t.id()].getWidth(),
                                                height:
                                                  i[n][t.id()].getHeight(),
                                              });
                                        }),
                                        t.edges().forEach(function (t) {
                                          var l = t.source(),
                                            u = t.target();
                                          if (
                                            "none" != l.css("display") &&
                                            "none" != u.css("display")
                                          )
                                            if ("draft" == e.quality) {
                                              var c = o.get(l.id()),
                                                d = o.get(u.id()),
                                                h = [],
                                                p = [];
                                              if (l.isParent()) {
                                                var f = a.calcBoundingBox(
                                                  l,
                                                  r[n].xCoords,
                                                  r[n].yCoords,
                                                  o
                                                );
                                                h.push(
                                                  f.topLeftX + f.width / 2
                                                ),
                                                  h.push(
                                                    f.topLeftY + f.height / 2
                                                  );
                                              } else
                                                h.push(r[n].xCoords[c]),
                                                  h.push(r[n].yCoords[c]);
                                              if (u.isParent()) {
                                                var g = a.calcBoundingBox(
                                                  u,
                                                  r[n].xCoords,
                                                  r[n].yCoords,
                                                  o
                                                );
                                                p.push(
                                                  g.topLeftX + g.width / 2
                                                ),
                                                  p.push(
                                                    g.topLeftY + g.height / 2
                                                  );
                                              } else
                                                p.push(r[n].xCoords[d]),
                                                  p.push(r[n].yCoords[d]);
                                              s.edges.push({
                                                startX: h[0],
                                                startY: h[1],
                                                endX: p[0],
                                                endY: p[1],
                                              });
                                            } else
                                              i[n][l.id()] &&
                                                i[n][u.id()] &&
                                                s.edges.push({
                                                  startX:
                                                    i[n][l.id()].getCenterX(),
                                                  startY:
                                                    i[n][l.id()].getCenterY(),
                                                  endX: i[n][
                                                    u.id()
                                                  ].getCenterX(),
                                                  endY: i[n][
                                                    u.id()
                                                  ].getCenterY(),
                                                });
                                        }),
                                        s.nodes.length > 0 &&
                                          (w.push(s), x.add(n));
                                    }
                                  });
                                  var C = c.packComponents(
                                    w,
                                    e.randomize
                                  ).shifts;
                                  if ("draft" == e.quality)
                                    r.forEach(function (e, t) {
                                      var n = e.xCoords.map(function (e) {
                                          return e + C[t].dx;
                                        }),
                                        r = e.yCoords.map(function (e) {
                                          return e + C[t].dy;
                                        });
                                      (e.xCoords = n), (e.yCoords = r);
                                    });
                                  else {
                                    var k = 0;
                                    x.forEach(function (e) {
                                      Object.keys(i[e]).forEach(function (t) {
                                        var n = i[e][t];
                                        n.setCenter(
                                          n.getCenterX() + C[k].dx,
                                          n.getCenterY() + C[k].dy
                                        );
                                      }),
                                        k++;
                                    });
                                  }
                                }
                              } else {
                                var T = e.eles.boundingBox();
                                if (
                                  (u.push({
                                    x: T.x1 + T.w / 2,
                                    y: T.y1 + T.h / 2,
                                  }),
                                  e.randomize)
                                ) {
                                  var S = o(e);
                                  r.push(S);
                                }
                                "default" == e.quality || "proof" == e.quality
                                  ? (i.push(s(e, r[0])),
                                    a.relocateComponent(u[0], i[0], e))
                                  : a.relocateComponent(u[0], r[0], e);
                              }
                            var P = function (t, n) {
                              if (
                                "default" == e.quality ||
                                "proof" == e.quality
                              ) {
                                "number" == typeof t && (t = n);
                                var a = void 0,
                                  o = void 0,
                                  s = t.data("id");
                                return (
                                  i.forEach(function (e) {
                                    s in e &&
                                      ((a = {
                                        x: e[s].getRect().getCenterX(),
                                        y: e[s].getRect().getCenterY(),
                                      }),
                                      (o = e[s]));
                                  }),
                                  e.nodeDimensionsIncludeLabels &&
                                    (o.labelWidth &&
                                      ("left" == o.labelPosHorizontal
                                        ? (a.x += o.labelWidth / 2)
                                        : "right" == o.labelPosHorizontal &&
                                          (a.x -= o.labelWidth / 2)),
                                    o.labelHeight &&
                                      ("top" == o.labelPosVertical
                                        ? (a.y += o.labelHeight / 2)
                                        : "bottom" == o.labelPosVertical &&
                                          (a.y -= o.labelHeight / 2))),
                                  null == a &&
                                    (a = {
                                      x: t.position("x"),
                                      y: t.position("y"),
                                    }),
                                  { x: a.x, y: a.y }
                                );
                              }
                              var l = void 0;
                              return (
                                r.forEach(function (e) {
                                  var n = e.nodeIndexes.get(t.id());
                                  null != n &&
                                    (l = { x: e.xCoords[n], y: e.yCoords[n] });
                                }),
                                null == l &&
                                  (l = {
                                    x: t.position("x"),
                                    y: t.position("y"),
                                  }),
                                { x: l.x, y: l.y }
                              );
                            };
                            if (
                              "default" == e.quality ||
                              "proof" == e.quality ||
                              e.randomize
                            ) {
                              var D = a.calcParentsWithoutChildren(t, n),
                                _ = n.filter(function (e) {
                                  return "none" == e.css("display");
                                });
                              (e.eles = n.not(_)),
                                n
                                  .nodes()
                                  .not(":parent")
                                  .not(_)
                                  .layoutPositions(this, e, P),
                                D.length > 0 &&
                                  D.forEach(function (e) {
                                    e.position(P(e));
                                  });
                            } else
                              console.log(
                                "If randomize option is set to false, then quality option must be 'default' or 'proof'."
                              );
                          },
                        },
                      ]),
                      e
                    );
                  })();
                e.exports = u;
              },
              657: (e, t, n) => {
                var r = n(548),
                  i = n(140).layoutBase.Matrix,
                  a = n(140).layoutBase.SVD;
                e.exports = {
                  spectralLayout: function (e) {
                    var t = e.cy,
                      n = e.eles,
                      o = n.nodes(),
                      s = n.nodes(":parent"),
                      l = new Map(),
                      u = new Map(),
                      c = new Map(),
                      d = [],
                      h = [],
                      p = [],
                      f = [],
                      g = [],
                      v = [],
                      y = [],
                      m = [],
                      b = void 0,
                      x = 1e8,
                      w = 1e-9,
                      E = e.piTol,
                      C = e.samplingType,
                      k = e.nodeSeparation,
                      T = void 0,
                      S = function (e, t, n) {
                        for (
                          var r = [],
                            i = 0,
                            a = 0,
                            o = 0,
                            s = void 0,
                            l = [],
                            c = 0,
                            h = 1,
                            p = 0;
                          p < b;
                          p++
                        )
                          l[p] = x;
                        for (r[a] = e, l[e] = 0; a >= i; ) {
                          o = r[i++];
                          for (var f = d[o], y = 0; y < f.length; y++)
                            l[(s = u.get(f[y]))] == x &&
                              ((l[s] = l[o] + 1), (r[++a] = s));
                          v[o][t] = l[o] * k;
                        }
                        if (n) {
                          for (var m = 0; m < b; m++)
                            v[m][t] < g[m] && (g[m] = v[m][t]);
                          for (var w = 0; w < b; w++)
                            g[w] > c && ((c = g[w]), (h = w));
                        }
                        return h;
                      };
                    r.connectComponents(t, n, r.getTopMostNodes(o), l),
                      s.forEach(function (e) {
                        r.connectComponents(
                          t,
                          n,
                          r.getTopMostNodes(e.descendants().intersection(n)),
                          l
                        );
                      });
                    for (var P = 0, D = 0; D < o.length; D++)
                      o[D].isParent() || u.set(o[D].id(), P++);
                    var _ = !0,
                      M = !1,
                      N = void 0;
                    try {
                      for (
                        var I, B = l.keys()[Symbol.iterator]();
                        !(_ = (I = B.next()).done);
                        _ = !0
                      ) {
                        var A = I.value;
                        u.set(A, P++);
                      }
                    } catch (e) {
                      (M = !0), (N = e);
                    } finally {
                      try {
                        !_ && B.return && B.return();
                      } finally {
                        if (M) throw N;
                      }
                    }
                    for (var L = 0; L < u.size; L++) d[L] = [];
                    s.forEach(function (e) {
                      for (
                        var t = e.children().intersection(n);
                        0 == t.nodes(":childless").length;

                      )
                        t = t.nodes()[0].children().intersection(n);
                      var r = 0,
                        i = t.nodes(":childless")[0].connectedEdges().length;
                      t.nodes(":childless").forEach(function (e, t) {
                        e.connectedEdges().length < i &&
                          ((i = e.connectedEdges().length), (r = t));
                      }),
                        c.set(e.id(), t.nodes(":childless")[r].id());
                    }),
                      o.forEach(function (e) {
                        var t;
                        (t = e.isParent()
                          ? u.get(c.get(e.id()))
                          : u.get(e.id())),
                          e
                            .neighborhood()
                            .nodes()
                            .forEach(function (r) {
                              n.intersection(e.edgesWith(r)).length > 0 &&
                                (r.isParent()
                                  ? d[t].push(c.get(r.id()))
                                  : d[t].push(r.id()));
                            });
                      });
                    var O = function (e) {
                        var n = u.get(e),
                          r = void 0;
                        l.get(e).forEach(function (i) {
                          (r = t.getElementById(i).isParent() ? c.get(i) : i),
                            d[n].push(r),
                            d[u.get(r)].push(e);
                        });
                      },
                      R = !0,
                      z = !1,
                      F = void 0;
                    try {
                      for (
                        var V, q = l.keys()[Symbol.iterator]();
                        !(R = (V = q.next()).done);
                        R = !0
                      )
                        O(V.value);
                    } catch (e) {
                      (z = !0), (F = e);
                    } finally {
                      try {
                        !R && q.return && q.return();
                      } finally {
                        if (z) throw F;
                      }
                    }
                    var j = void 0;
                    if ((b = u.size) > 2) {
                      T = b < e.sampleSize ? b : e.sampleSize;
                      for (var Y = 0; Y < b; Y++) v[Y] = [];
                      for (var X = 0; X < T; X++) m[X] = [];
                      return (
                        "draft" == e.quality || "all" == e.step
                          ? ((function (e) {
                              var t = void 0;
                              if (e) {
                                t = Math.floor(Math.random() * b);
                                for (var n = 0; n < b; n++) g[n] = x;
                                for (var r = 0; r < T; r++)
                                  (f[r] = t), (t = S(t, r, e));
                              } else {
                                !(function () {
                                  for (var e = 0, t = 0, n = !1; t < T; ) {
                                    (e = Math.floor(Math.random() * b)),
                                      (n = !1);
                                    for (var r = 0; r < t; r++)
                                      if (f[r] == e) {
                                        n = !0;
                                        break;
                                      }
                                    n || ((f[t] = e), t++);
                                  }
                                })();
                                for (var i = 0; i < T; i++) S(f[i], i, e);
                              }
                              for (var a = 0; a < b; a++)
                                for (var o = 0; o < T; o++) v[a][o] *= v[a][o];
                              for (var s = 0; s < T; s++) y[s] = [];
                              for (var l = 0; l < T; l++)
                                for (var u = 0; u < T; u++)
                                  y[l][u] = v[f[u]][l];
                            })(C),
                            (function () {
                              for (
                                var e = a.svd(y),
                                  t = e.S,
                                  n = e.U,
                                  r = e.V,
                                  o = t[0] * t[0] * t[0],
                                  s = [],
                                  l = 0;
                                l < T;
                                l++
                              ) {
                                s[l] = [];
                                for (var u = 0; u < T; u++)
                                  (s[l][u] = 0),
                                    l == u &&
                                      (s[l][u] =
                                        t[l] /
                                        (t[l] * t[l] + o / (t[l] * t[l])));
                              }
                              m = i.multMat(i.multMat(r, s), i.transpose(n));
                            })(),
                            (function () {
                              for (
                                var e = void 0,
                                  t = void 0,
                                  n = [],
                                  r = [],
                                  a = [],
                                  o = [],
                                  s = 0;
                                s < b;
                                s++
                              )
                                (n[s] = Math.random()), (r[s] = Math.random());
                              (n = i.normalize(n)), (r = i.normalize(r));
                              for (var l = w, u = w, c = void 0; ; ) {
                                for (var d = 0; d < b; d++) a[d] = n[d];
                                if (
                                  ((n = i.multGamma(
                                    i.multL(i.multGamma(a), v, m)
                                  )),
                                  (e = i.dotProduct(a, n)),
                                  (n = i.normalize(n)),
                                  (l = i.dotProduct(a, n)),
                                  (c = Math.abs(l / u)) <= 1 + E && c >= 1)
                                )
                                  break;
                                u = l;
                              }
                              for (var f = 0; f < b; f++) a[f] = n[f];
                              for (u = w; ; ) {
                                for (var g = 0; g < b; g++) o[g] = r[g];
                                if (
                                  ((o = i.minusOp(
                                    o,
                                    i.multCons(a, i.dotProduct(a, o))
                                  )),
                                  (r = i.multGamma(
                                    i.multL(i.multGamma(o), v, m)
                                  )),
                                  (t = i.dotProduct(o, r)),
                                  (r = i.normalize(r)),
                                  (l = i.dotProduct(o, r)),
                                  (c = Math.abs(l / u)) <= 1 + E && c >= 1)
                                )
                                  break;
                                u = l;
                              }
                              for (var y = 0; y < b; y++) o[y] = r[y];
                              (h = i.multCons(a, Math.sqrt(Math.abs(e)))),
                                (p = i.multCons(o, Math.sqrt(Math.abs(t))));
                            })(),
                            (j = { nodeIndexes: u, xCoords: h, yCoords: p }))
                          : (u.forEach(function (e, n) {
                              h.push(t.getElementById(n).position("x")),
                                p.push(t.getElementById(n).position("y"));
                            }),
                            (j = { nodeIndexes: u, xCoords: h, yCoords: p })),
                        j
                      );
                    }
                    var W = u.keys(),
                      H = t.getElementById(W.next().value),
                      G = H.position(),
                      U = H.outerWidth();
                    if ((h.push(G.x), p.push(G.y), 2 == b)) {
                      var K = t.getElementById(W.next().value).outerWidth();
                      h.push(G.x + U / 2 + K / 2 + e.idealEdgeLength),
                        p.push(G.y);
                    }
                    return { nodeIndexes: u, xCoords: h, yCoords: p };
                  },
                };
              },
              579: (e, t, n) => {
                var r = n(212),
                  i = function (e) {
                    e && e("layout", "fcose", r);
                  };
                "undefined" != typeof cytoscape && i(cytoscape),
                  (e.exports = i);
              },
              140: (t) => {
                t.exports = e;
              },
            },
            n = {},
            r = (function e(r) {
              var i = n[r];
              if (void 0 !== i) return i.exports;
              var a = (n[r] = { exports: {} });
              return t[r](a, a.exports, e), a.exports;
            })(579);
          return r;
        })();
      }),
        (e.exports = r(n(180)));
    },
    165: (e, t, n) => {
      "use strict";
      function r(e) {
        return (
          (r =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          r(e)
        );
      }
      function i(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function a(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function o(e, t, n) {
        return (
          t && a(e.prototype, t),
          n && a(e, n),
          Object.defineProperty(e, "prototype", { writable: !1 }),
          e
        );
      }
      function s(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      function l(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            var n =
              null == e
                ? null
                : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != n) {
              var r,
                i,
                a = [],
                o = !0,
                s = !1;
              try {
                for (
                  n = n.call(e);
                  !(o = (r = n.next()).done) &&
                  (a.push(r.value), !t || a.length !== t);
                  o = !0
                );
              } catch (e) {
                (s = !0), (i = e);
              } finally {
                try {
                  o || null == n.return || n.return();
                } finally {
                  if (s) throw i;
                }
              }
              return a;
            }
          })(e, t) ||
          u(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function u(e, t) {
        if (e) {
          if ("string" == typeof e) return c(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return (
            "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(e)
              : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? c(e, t)
              : void 0
          );
        }
      }
      function c(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      n.d(t, { A: () => Vu });
      var d = "undefined" == typeof window ? null : window,
        h = d ? d.navigator : null;
      d && d.document;
      var p = r(""),
        f = r({}),
        g = r(function () {}),
        v = "undefined" == typeof HTMLElement ? "undefined" : r(HTMLElement),
        y = function (e) {
          return e && e.instanceString && b(e.instanceString)
            ? e.instanceString()
            : null;
        },
        m = function (e) {
          return null != e && r(e) == p;
        },
        b = function (e) {
          return null != e && r(e) === g;
        },
        x = function (e) {
          return (
            !k(e) &&
            (Array.isArray ? Array.isArray(e) : null != e && e instanceof Array)
          );
        },
        w = function (e) {
          return null != e && r(e) === f && !x(e) && e.constructor === Object;
        },
        E = function (e) {
          return null != e && r(e) === r(1) && !isNaN(e);
        },
        C = function (e) {
          return "undefined" === v
            ? void 0
            : null != e && e instanceof HTMLElement;
        },
        k = function (e) {
          return T(e) || S(e);
        },
        T = function (e) {
          return "collection" === y(e) && e._private.single;
        },
        S = function (e) {
          return "collection" === y(e) && !e._private.single;
        },
        P = function (e) {
          return "core" === y(e);
        },
        D = function (e) {
          return "stylesheet" === y(e);
        },
        _ = function (e) {
          return null == e || !("" !== e && !e.match(/^\s+$/));
        },
        M = function (e) {
          return (
            (function (e) {
              return null != e && r(e) === f;
            })(e) && b(e.then)
          );
        },
        N = function (e, t) {
          t ||
            (t = function () {
              if (1 === arguments.length) return arguments[0];
              if (0 === arguments.length) return "undefined";
              for (var e = [], t = 0; t < arguments.length; t++)
                e.push(arguments[t]);
              return e.join("$");
            });
          var n = function n() {
            var r,
              i = arguments,
              a = t.apply(this, i),
              o = n.cache;
            return (r = o[a]) || (r = o[a] = e.apply(this, i)), r;
          };
          return (n.cache = {}), n;
        },
        I = N(function (e) {
          return e.replace(/([A-Z])/g, function (e) {
            return "-" + e.toLowerCase();
          });
        }),
        B = N(function (e) {
          return e.replace(/(-\w)/g, function (e) {
            return e[1].toUpperCase();
          });
        }),
        A = N(
          function (e, t) {
            return e + t[0].toUpperCase() + t.substring(1);
          },
          function (e, t) {
            return e + "$" + t;
          }
        ),
        L = function (e) {
          return _(e) ? e : e.charAt(0).toUpperCase() + e.substring(1);
        },
        O = "(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))",
        R =
          "rgb[a]?\\((" +
          O +
          "[%]?)\\s*,\\s*(" +
          O +
          "[%]?)\\s*,\\s*(" +
          O +
          "[%]?)(?:\\s*,\\s*(" +
          O +
          "))?\\)",
        z =
          "rgb[a]?\\((?:" +
          O +
          "[%]?)\\s*,\\s*(?:" +
          O +
          "[%]?)\\s*,\\s*(?:" +
          O +
          "[%]?)(?:\\s*,\\s*(?:" +
          O +
          "))?\\)",
        F =
          "hsl[a]?\\((" +
          O +
          ")\\s*,\\s*(" +
          O +
          "[%])\\s*,\\s*(" +
          O +
          "[%])(?:\\s*,\\s*(" +
          O +
          "))?\\)",
        V =
          "hsl[a]?\\((?:" +
          O +
          ")\\s*,\\s*(?:" +
          O +
          "[%])\\s*,\\s*(?:" +
          O +
          "[%])(?:\\s*,\\s*(?:" +
          O +
          "))?\\)",
        q = function (e, t) {
          return e < t ? -1 : e > t ? 1 : 0;
        },
        j =
          null != Object.assign
            ? Object.assign.bind(Object)
            : function (e) {
                for (var t = arguments, n = 1; n < t.length; n++) {
                  var r = t[n];
                  if (null != r)
                    for (var i = Object.keys(r), a = 0; a < i.length; a++) {
                      var o = i[a];
                      e[o] = r[o];
                    }
                }
                return e;
              },
        Y = {
          transparent: [0, 0, 0, 0],
          aliceblue: [240, 248, 255],
          antiquewhite: [250, 235, 215],
          aqua: [0, 255, 255],
          aquamarine: [127, 255, 212],
          azure: [240, 255, 255],
          beige: [245, 245, 220],
          bisque: [255, 228, 196],
          black: [0, 0, 0],
          blanchedalmond: [255, 235, 205],
          blue: [0, 0, 255],
          blueviolet: [138, 43, 226],
          brown: [165, 42, 42],
          burlywood: [222, 184, 135],
          cadetblue: [95, 158, 160],
          chartreuse: [127, 255, 0],
          chocolate: [210, 105, 30],
          coral: [255, 127, 80],
          cornflowerblue: [100, 149, 237],
          cornsilk: [255, 248, 220],
          crimson: [220, 20, 60],
          cyan: [0, 255, 255],
          darkblue: [0, 0, 139],
          darkcyan: [0, 139, 139],
          darkgoldenrod: [184, 134, 11],
          darkgray: [169, 169, 169],
          darkgreen: [0, 100, 0],
          darkgrey: [169, 169, 169],
          darkkhaki: [189, 183, 107],
          darkmagenta: [139, 0, 139],
          darkolivegreen: [85, 107, 47],
          darkorange: [255, 140, 0],
          darkorchid: [153, 50, 204],
          darkred: [139, 0, 0],
          darksalmon: [233, 150, 122],
          darkseagreen: [143, 188, 143],
          darkslateblue: [72, 61, 139],
          darkslategray: [47, 79, 79],
          darkslategrey: [47, 79, 79],
          darkturquoise: [0, 206, 209],
          darkviolet: [148, 0, 211],
          deeppink: [255, 20, 147],
          deepskyblue: [0, 191, 255],
          dimgray: [105, 105, 105],
          dimgrey: [105, 105, 105],
          dodgerblue: [30, 144, 255],
          firebrick: [178, 34, 34],
          floralwhite: [255, 250, 240],
          forestgreen: [34, 139, 34],
          fuchsia: [255, 0, 255],
          gainsboro: [220, 220, 220],
          ghostwhite: [248, 248, 255],
          gold: [255, 215, 0],
          goldenrod: [218, 165, 32],
          gray: [128, 128, 128],
          grey: [128, 128, 128],
          green: [0, 128, 0],
          greenyellow: [173, 255, 47],
          honeydew: [240, 255, 240],
          hotpink: [255, 105, 180],
          indianred: [205, 92, 92],
          indigo: [75, 0, 130],
          ivory: [255, 255, 240],
          khaki: [240, 230, 140],
          lavender: [230, 230, 250],
          lavenderblush: [255, 240, 245],
          lawngreen: [124, 252, 0],
          lemonchiffon: [255, 250, 205],
          lightblue: [173, 216, 230],
          lightcoral: [240, 128, 128],
          lightcyan: [224, 255, 255],
          lightgoldenrodyellow: [250, 250, 210],
          lightgray: [211, 211, 211],
          lightgreen: [144, 238, 144],
          lightgrey: [211, 211, 211],
          lightpink: [255, 182, 193],
          lightsalmon: [255, 160, 122],
          lightseagreen: [32, 178, 170],
          lightskyblue: [135, 206, 250],
          lightslategray: [119, 136, 153],
          lightslategrey: [119, 136, 153],
          lightsteelblue: [176, 196, 222],
          lightyellow: [255, 255, 224],
          lime: [0, 255, 0],
          limegreen: [50, 205, 50],
          linen: [250, 240, 230],
          magenta: [255, 0, 255],
          maroon: [128, 0, 0],
          mediumaquamarine: [102, 205, 170],
          mediumblue: [0, 0, 205],
          mediumorchid: [186, 85, 211],
          mediumpurple: [147, 112, 219],
          mediumseagreen: [60, 179, 113],
          mediumslateblue: [123, 104, 238],
          mediumspringgreen: [0, 250, 154],
          mediumturquoise: [72, 209, 204],
          mediumvioletred: [199, 21, 133],
          midnightblue: [25, 25, 112],
          mintcream: [245, 255, 250],
          mistyrose: [255, 228, 225],
          moccasin: [255, 228, 181],
          navajowhite: [255, 222, 173],
          navy: [0, 0, 128],
          oldlace: [253, 245, 230],
          olive: [128, 128, 0],
          olivedrab: [107, 142, 35],
          orange: [255, 165, 0],
          orangered: [255, 69, 0],
          orchid: [218, 112, 214],
          palegoldenrod: [238, 232, 170],
          palegreen: [152, 251, 152],
          paleturquoise: [175, 238, 238],
          palevioletred: [219, 112, 147],
          papayawhip: [255, 239, 213],
          peachpuff: [255, 218, 185],
          peru: [205, 133, 63],
          pink: [255, 192, 203],
          plum: [221, 160, 221],
          powderblue: [176, 224, 230],
          purple: [128, 0, 128],
          red: [255, 0, 0],
          rosybrown: [188, 143, 143],
          royalblue: [65, 105, 225],
          saddlebrown: [139, 69, 19],
          salmon: [250, 128, 114],
          sandybrown: [244, 164, 96],
          seagreen: [46, 139, 87],
          seashell: [255, 245, 238],
          sienna: [160, 82, 45],
          silver: [192, 192, 192],
          skyblue: [135, 206, 235],
          slateblue: [106, 90, 205],
          slategray: [112, 128, 144],
          slategrey: [112, 128, 144],
          snow: [255, 250, 250],
          springgreen: [0, 255, 127],
          steelblue: [70, 130, 180],
          tan: [210, 180, 140],
          teal: [0, 128, 128],
          thistle: [216, 191, 216],
          tomato: [255, 99, 71],
          turquoise: [64, 224, 208],
          violet: [238, 130, 238],
          wheat: [245, 222, 179],
          white: [255, 255, 255],
          whitesmoke: [245, 245, 245],
          yellow: [255, 255, 0],
          yellowgreen: [154, 205, 50],
        },
        X = function (e) {
          for (var t = e.map, n = e.keys, r = n.length, i = 0; i < r; i++) {
            var a = n[i];
            if (w(a)) throw Error("Tried to set map with object key");
            i < n.length - 1
              ? (null == t[a] && (t[a] = {}), (t = t[a]))
              : (t[a] = e.value);
          }
        },
        W = function (e) {
          for (var t = e.map, n = e.keys, r = n.length, i = 0; i < r; i++) {
            var a = n[i];
            if (w(a)) throw Error("Tried to get map with object key");
            if (null == (t = t[a])) return t;
          }
          return t;
        },
        H = function (e) {
          var t = typeof e;
          return null != e && ("object" == t || "function" == t);
        },
        G =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {},
        U = "object" == typeof G && G && G.Object === Object && G,
        K = "object" == typeof self && self && self.Object === Object && self,
        Z = U || K || Function("return this")(),
        $ = function () {
          return Z.Date.now();
        },
        Q = /\s/,
        J = /^\s+/,
        ee = function (e) {
          return e
            ? e
                .slice(
                  0,
                  (function (e) {
                    for (var t = e.length; t-- && Q.test(e.charAt(t)); );
                    return t;
                  })(e) + 1
                )
                .replace(J, "")
            : e;
        },
        te = Z.Symbol,
        ne = Object.prototype,
        re = ne.hasOwnProperty,
        ie = ne.toString,
        ae = te ? te.toStringTag : void 0,
        oe = Object.prototype.toString,
        se = te ? te.toStringTag : void 0,
        le = function (e) {
          return null == e
            ? void 0 === e
              ? "[object Undefined]"
              : "[object Null]"
            : se && se in Object(e)
            ? (function (e) {
                var t = re.call(e, ae),
                  n = e[ae];
                try {
                  e[ae] = void 0;
                  var r = !0;
                } catch (e) {}
                var i = ie.call(e);
                return r && (t ? (e[ae] = n) : delete e[ae]), i;
              })(e)
            : (function (e) {
                return oe.call(e);
              })(e);
        },
        ue = function (e) {
          return (
            "symbol" == typeof e ||
            ((function (e) {
              return null != e && "object" == typeof e;
            })(e) &&
              "[object Symbol]" == le(e))
          );
        },
        ce = /^[-+]0x[0-9a-f]+$/i,
        de = /^0b[01]+$/i,
        he = /^0o[0-7]+$/i,
        pe = parseInt,
        fe = function (e) {
          if ("number" == typeof e) return e;
          if (ue(e)) return NaN;
          if (H(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = H(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = ee(e);
          var n = de.test(e);
          return n || he.test(e)
            ? pe(e.slice(2), n ? 2 : 8)
            : ce.test(e)
            ? NaN
            : +e;
        },
        ge = Math.max,
        ve = Math.min,
        ye = function (e, t, n) {
          var r,
            i,
            a,
            o,
            s,
            l,
            u = 0,
            c = !1,
            d = !1,
            h = !0;
          if ("function" != typeof e)
            throw new TypeError("Expected a function");
          function p(t) {
            var n = r,
              a = i;
            return (r = i = void 0), (u = t), (o = e.apply(a, n));
          }
          function f(e) {
            var n = e - l;
            return void 0 === l || n >= t || n < 0 || (d && e - u >= a);
          }
          function g() {
            var e = $();
            if (f(e)) return v(e);
            s = setTimeout(
              g,
              (function (e) {
                var n = t - (e - l);
                return d ? ve(n, a - (e - u)) : n;
              })(e)
            );
          }
          function v(e) {
            return (s = void 0), h && r ? p(e) : ((r = i = void 0), o);
          }
          function y() {
            var e = $(),
              n = f(e);
            if (((r = arguments), (i = this), (l = e), n)) {
              if (void 0 === s)
                return (function (e) {
                  return (u = e), (s = setTimeout(g, t)), c ? p(e) : o;
                })(l);
              if (d) return clearTimeout(s), (s = setTimeout(g, t)), p(l);
            }
            return void 0 === s && (s = setTimeout(g, t)), o;
          }
          return (
            (t = fe(t) || 0),
            H(n) &&
              ((c = !!n.leading),
              (a = (d = "maxWait" in n) ? ge(fe(n.maxWait) || 0, t) : a),
              (h = "trailing" in n ? !!n.trailing : h)),
            (y.cancel = function () {
              void 0 !== s && clearTimeout(s),
                (u = 0),
                (r = l = i = s = void 0);
            }),
            (y.flush = function () {
              return void 0 === s ? o : v($());
            }),
            y
          );
        },
        me = d ? d.performance : null,
        be =
          me && me.now
            ? function () {
                return me.now();
              }
            : function () {
                return Date.now();
              },
        xe = (function () {
          if (d) {
            if (d.requestAnimationFrame)
              return function (e) {
                d.requestAnimationFrame(e);
              };
            if (d.mozRequestAnimationFrame)
              return function (e) {
                d.mozRequestAnimationFrame(e);
              };
            if (d.webkitRequestAnimationFrame)
              return function (e) {
                d.webkitRequestAnimationFrame(e);
              };
            if (d.msRequestAnimationFrame)
              return function (e) {
                d.msRequestAnimationFrame(e);
              };
          }
          return function (e) {
            e &&
              setTimeout(function () {
                e(be());
              }, 1e3 / 60);
          };
        })(),
        we = function (e) {
          return xe(e);
        },
        Ee = be,
        Ce = 9261,
        ke = 5381,
        Te = function (e) {
          for (
            var t,
              n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : Ce;
            !(t = e.next()).done;

          )
            n = (65599 * n + t.value) | 0;
          return n;
        },
        Se = function (e) {
          return (
            (65599 *
              (arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : Ce) +
              e) |
            0
          );
        },
        Pe = function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ke;
          return ((t << 5) + t + e) | 0;
        },
        De = function (e) {
          return 2097152 * e[0] + e[1];
        },
        _e = function (e, t) {
          return [Se(e[0], t[0]), Pe(e[1], t[1])];
        },
        Me = function (e, t) {
          var n = { value: 0, done: !1 },
            r = 0,
            i = e.length;
          return Te(
            {
              next: function () {
                return r < i ? (n.value = e.charCodeAt(r++)) : (n.done = !0), n;
              },
            },
            t
          );
        },
        Ne = function () {
          return Ie(arguments);
        },
        Ie = function (e) {
          for (var t, n = 0; n < e.length; n++) {
            var r = e[n];
            t = 0 === n ? Me(r) : Me(r, t);
          }
          return t;
        },
        Be = !0,
        Ae = null != console.warn,
        Le = null != console.trace,
        Oe = Number.MAX_SAFE_INTEGER || 9007199254740991,
        Re = function () {
          return !0;
        },
        ze = function () {
          return !1;
        },
        Fe = function () {
          return 0;
        },
        Ve = function () {},
        qe = function (e) {
          throw new Error(e);
        },
        je = function (e) {
          if (void 0 === e) return Be;
          Be = !!e;
        },
        Ye = function (e) {
          je() &&
            (Ae ? console.warn(e) : (console.log(e), Le && console.trace()));
        },
        Xe = function (e) {
          return null == e
            ? e
            : x(e)
            ? e.slice()
            : w(e)
            ? (function (e) {
                return j({}, e);
              })(e)
            : e;
        },
        We = function (e, t) {
          for (
            t = e = "";
            e++ < 36;
            t +=
              (51 * e) & 52
                ? (15 ^ e
                    ? 8 ^ (Math.random() * (20 ^ e ? 16 : 4))
                    : 4
                  ).toString(16)
                : "-"
          );
          return t;
        },
        He = {},
        Ge = function () {
          return He;
        },
        Ue = function (e) {
          var t = Object.keys(e);
          return function (n) {
            for (var r = {}, i = 0; i < t.length; i++) {
              var a = t[i],
                o = null == n ? void 0 : n[a];
              r[a] = void 0 === o ? e[a] : o;
            }
            return r;
          };
        },
        Ke = function (e, t, n) {
          for (
            var r = e.length - 1;
            r >= 0 && (e[r] !== t || (e.splice(r, 1), !n));
            r--
          );
        },
        Ze = function (e) {
          e.splice(0, e.length);
        },
        $e = function (e, t, n) {
          return n && (t = A(n, t)), e[t];
        },
        Qe = function (e, t, n, r) {
          n && (t = A(n, t)), (e[t] = r);
        },
        Je =
          "undefined" != typeof Map
            ? Map
            : (function () {
                function e() {
                  i(this, e), (this._obj = {});
                }
                return (
                  o(e, [
                    {
                      key: "set",
                      value: function (e, t) {
                        return (this._obj[e] = t), this;
                      },
                    },
                    {
                      key: "delete",
                      value: function (e) {
                        return (this._obj[e] = void 0), this;
                      },
                    },
                    {
                      key: "clear",
                      value: function () {
                        this._obj = {};
                      },
                    },
                    {
                      key: "has",
                      value: function (e) {
                        return void 0 !== this._obj[e];
                      },
                    },
                    {
                      key: "get",
                      value: function (e) {
                        return this._obj[e];
                      },
                    },
                  ]),
                  e
                );
              })(),
        et = (function () {
          function e(t) {
            if (
              (i(this, e),
              (this._obj = Object.create(null)),
              (this.size = 0),
              null != t)
            ) {
              var n;
              n =
                null != t.instanceString &&
                t.instanceString() === this.instanceString()
                  ? t.toArray()
                  : t;
              for (var r = 0; r < n.length; r++) this.add(n[r]);
            }
          }
          return (
            o(e, [
              {
                key: "instanceString",
                value: function () {
                  return "set";
                },
              },
              {
                key: "add",
                value: function (e) {
                  var t = this._obj;
                  1 !== t[e] && ((t[e] = 1), this.size++);
                },
              },
              {
                key: "delete",
                value: function (e) {
                  var t = this._obj;
                  1 === t[e] && ((t[e] = 0), this.size--);
                },
              },
              {
                key: "clear",
                value: function () {
                  this._obj = Object.create(null);
                },
              },
              {
                key: "has",
                value: function (e) {
                  return 1 === this._obj[e];
                },
              },
              {
                key: "toArray",
                value: function () {
                  var e = this;
                  return Object.keys(this._obj).filter(function (t) {
                    return e.has(t);
                  });
                },
              },
              {
                key: "forEach",
                value: function (e, t) {
                  return this.toArray().forEach(e, t);
                },
              },
            ]),
            e
          );
        })(),
        tt =
          "undefined" !== ("undefined" == typeof Set ? "undefined" : r(Set))
            ? Set
            : et,
        nt = function (e, t) {
          var n =
            !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
          if (void 0 !== e && void 0 !== t && P(e)) {
            var r = t.group;
            if (
              (null == r &&
                (r =
                  t.data && null != t.data.source && null != t.data.target
                    ? "edges"
                    : "nodes"),
              "nodes" === r || "edges" === r)
            ) {
              (this.length = 1), (this[0] = this);
              var i = (this._private = {
                cy: e,
                single: !0,
                data: t.data || {},
                position: t.position || { x: 0, y: 0 },
                autoWidth: void 0,
                autoHeight: void 0,
                autoPadding: void 0,
                compoundBoundsClean: !1,
                listeners: [],
                group: r,
                style: {},
                rstyle: {},
                styleCxts: [],
                styleKeys: {},
                removed: !0,
                selected: !!t.selected,
                selectable: void 0 === t.selectable || !!t.selectable,
                locked: !!t.locked,
                grabbed: !1,
                grabbable: void 0 === t.grabbable || !!t.grabbable,
                pannable: void 0 === t.pannable ? "edges" === r : !!t.pannable,
                active: !1,
                classes: new tt(),
                animation: { current: [], queue: [] },
                rscratch: {},
                scratch: t.scratch || {},
                edges: [],
                children: [],
                parent: t.parent && t.parent.isNode() ? t.parent : null,
                traversalCache: {},
                backgrounding: !1,
                bbCache: null,
                bbCacheShift: { x: 0, y: 0 },
                bodyBounds: null,
                overlayBounds: null,
                labelBounds: {
                  all: null,
                  source: null,
                  target: null,
                  main: null,
                },
                arrowBounds: {
                  source: null,
                  target: null,
                  "mid-source": null,
                  "mid-target": null,
                },
              });
              if (
                (null == i.position.x && (i.position.x = 0),
                null == i.position.y && (i.position.y = 0),
                t.renderedPosition)
              ) {
                var a = t.renderedPosition,
                  o = e.pan(),
                  s = e.zoom();
                i.position = { x: (a.x - o.x) / s, y: (a.y - o.y) / s };
              }
              var l = [];
              x(t.classes)
                ? (l = t.classes)
                : m(t.classes) && (l = t.classes.split(/\s+/));
              for (var u = 0, c = l.length; u < c; u++) {
                var d = l[u];
                d && "" !== d && i.classes.add(d);
              }
              this.createEmitter();
              var h = t.style || t.css;
              h &&
                (Ye(
                  "Setting a `style` bypass at element creation should be done only when absolutely necessary.  Try to use the stylesheet instead."
                ),
                this.style(h)),
                (void 0 === n || n) && this.restore();
            } else
              qe(
                "An element must be of type `nodes` or `edges`; you specified `" +
                  r +
                  "`"
              );
          } else qe("An element must have a core reference and parameters set");
        },
        rt = function (e) {
          return (
            (e = { bfs: e.bfs || !e.dfs, dfs: e.dfs || !e.bfs }),
            function (t, n, r) {
              var i;
              w(t) &&
                !k(t) &&
                ((t = (i = t).roots || i.root),
                (n = i.visit),
                (r = i.directed)),
                (r = 2 !== arguments.length || b(n) ? r : n),
                (n = b(n) ? n : function () {});
              for (
                var a,
                  o = this._private.cy,
                  s = (t = m(t) ? this.filter(t) : t),
                  l = [],
                  u = [],
                  c = {},
                  d = {},
                  h = {},
                  p = 0,
                  f = this.byGroup(),
                  g = f.nodes,
                  v = f.edges,
                  y = 0;
                y < s.length;
                y++
              ) {
                var x = s[y],
                  E = x.id();
                x.isNode() &&
                  (l.unshift(x), e.bfs && ((h[E] = !0), u.push(x)), (d[E] = 0));
              }
              for (
                var C = function () {
                  var t = e.bfs ? l.shift() : l.pop(),
                    i = t.id();
                  if (e.dfs) {
                    if (h[i]) return "continue";
                    (h[i] = !0), u.push(t);
                  }
                  var o,
                    s = d[i],
                    f = c[i],
                    y = null != f ? f.source() : null,
                    m = null != f ? f.target() : null,
                    b = null == f ? void 0 : t.same(y) ? m[0] : y[0];
                  if (!0 === (o = n(t, f, b, p++, s))) return (a = t), "break";
                  if (!1 === o) return "break";
                  for (
                    var x = t.connectedEdges().filter(function (e) {
                        return (!r || e.source().same(t)) && v.has(e);
                      }),
                      w = 0;
                    w < x.length;
                    w++
                  ) {
                    var E = x[w],
                      C = E.connectedNodes().filter(function (e) {
                        return !e.same(t) && g.has(e);
                      }),
                      k = C.id();
                    0 === C.length ||
                      h[k] ||
                      ((C = C[0]),
                      l.push(C),
                      e.bfs && ((h[k] = !0), u.push(C)),
                      (c[k] = E),
                      (d[k] = d[i] + 1));
                  }
                };
                0 !== l.length;

              ) {
                var T = C();
                if ("continue" !== T && "break" === T) break;
              }
              for (var S = o.collection(), P = 0; P < u.length; P++) {
                var D = u[P],
                  _ = c[D.id()];
                null != _ && S.push(_), S.push(D);
              }
              return { path: o.collection(S), found: o.collection(a) };
            }
          );
        },
        it = {
          breadthFirstSearch: rt({ bfs: !0 }),
          depthFirstSearch: rt({ dfs: !0 }),
        };
      (it.bfs = it.breadthFirstSearch), (it.dfs = it.depthFirstSearch);
      var at,
        ot =
          ((function (e, t) {
            (function () {
              var t, n, r, i, a, o, s, l, u, c, d, h, p, f, g;
              (r = Math.floor),
                (c = Math.min),
                (n = function (e, t) {
                  return e < t ? -1 : e > t ? 1 : 0;
                }),
                (u = function (e, t, i, a, o) {
                  var s;
                  if ((null == i && (i = 0), null == o && (o = n), i < 0))
                    throw new Error("lo must be non-negative");
                  for (null == a && (a = e.length); i < a; )
                    o(t, e[(s = r((i + a) / 2))]) < 0 ? (a = s) : (i = s + 1);
                  return [].splice.apply(e, [i, i - i].concat(t)), t;
                }),
                (o = function (e, t, r) {
                  return (
                    null == r && (r = n), e.push(t), f(e, 0, e.length - 1, r)
                  );
                }),
                (a = function (e, t) {
                  var r, i;
                  return (
                    null == t && (t = n),
                    (r = e.pop()),
                    e.length ? ((i = e[0]), (e[0] = r), g(e, 0, t)) : (i = r),
                    i
                  );
                }),
                (l = function (e, t, r) {
                  var i;
                  return (
                    null == r && (r = n), (i = e[0]), (e[0] = t), g(e, 0, r), i
                  );
                }),
                (s = function (e, t, r) {
                  var i;
                  return (
                    null == r && (r = n),
                    e.length &&
                      r(e[0], t) < 0 &&
                      ((t = (i = [e[0], t])[0]), (e[0] = i[1]), g(e, 0, r)),
                    t
                  );
                }),
                (i = function (e, t) {
                  var i, a, o, s, l, u;
                  for (
                    null == t && (t = n),
                      l = [],
                      a = 0,
                      o = (s = function () {
                        u = [];
                        for (
                          var t = 0, n = r(e.length / 2);
                          0 <= n ? t < n : t > n;
                          0 <= n ? t++ : t--
                        )
                          u.push(t);
                        return u;
                      }
                        .apply(this)
                        .reverse()).length;
                    a < o;
                    a++
                  )
                    (i = s[a]), l.push(g(e, i, t));
                  return l;
                }),
                (p = function (e, t, r) {
                  var i;
                  if ((null == r && (r = n), -1 !== (i = e.indexOf(t))))
                    return f(e, 0, i, r), g(e, i, r);
                }),
                (d = function (e, t, r) {
                  var a, o, l, u, c;
                  if ((null == r && (r = n), !(o = e.slice(0, t)).length))
                    return o;
                  for (i(o, r), l = 0, u = (c = e.slice(t)).length; l < u; l++)
                    (a = c[l]), s(o, a, r);
                  return o.sort(r).reverse();
                }),
                (h = function (e, t, r) {
                  var o, s, l, d, h, p, f, g, v;
                  if ((null == r && (r = n), 10 * t <= e.length)) {
                    if (!(l = e.slice(0, t).sort(r)).length) return l;
                    for (
                      s = l[l.length - 1], d = 0, p = (f = e.slice(t)).length;
                      d < p;
                      d++
                    )
                      r((o = f[d]), s) < 0 &&
                        (u(l, o, 0, null, r), l.pop(), (s = l[l.length - 1]));
                    return l;
                  }
                  for (
                    i(e, r), v = [], h = 0, g = c(t, e.length);
                    0 <= g ? h < g : h > g;
                    0 <= g ? ++h : --h
                  )
                    v.push(a(e, r));
                  return v;
                }),
                (f = function (e, t, r, i) {
                  var a, o, s;
                  for (
                    null == i && (i = n), a = e[r];
                    r > t && i(a, (o = e[(s = (r - 1) >> 1)])) < 0;

                  )
                    (e[r] = o), (r = s);
                  return (e[r] = a);
                }),
                (g = function (e, t, r) {
                  var i, a, o, s, l;
                  for (
                    null == r && (r = n),
                      a = e.length,
                      l = t,
                      o = e[t],
                      i = 2 * t + 1;
                    i < a;

                  )
                    (s = i + 1) < a && !(r(e[i], e[s]) < 0) && (i = s),
                      (e[t] = e[i]),
                      (i = 2 * (t = i) + 1);
                  return (e[t] = o), f(e, l, t, r);
                }),
                (t = (function () {
                  function e(e) {
                    (this.cmp = null != e ? e : n), (this.nodes = []);
                  }
                  return (
                    (e.push = o),
                    (e.pop = a),
                    (e.replace = l),
                    (e.pushpop = s),
                    (e.heapify = i),
                    (e.updateItem = p),
                    (e.nlargest = d),
                    (e.nsmallest = h),
                    (e.prototype.push = function (e) {
                      return o(this.nodes, e, this.cmp);
                    }),
                    (e.prototype.pop = function () {
                      return a(this.nodes, this.cmp);
                    }),
                    (e.prototype.peek = function () {
                      return this.nodes[0];
                    }),
                    (e.prototype.contains = function (e) {
                      return -1 !== this.nodes.indexOf(e);
                    }),
                    (e.prototype.replace = function (e) {
                      return l(this.nodes, e, this.cmp);
                    }),
                    (e.prototype.pushpop = function (e) {
                      return s(this.nodes, e, this.cmp);
                    }),
                    (e.prototype.heapify = function () {
                      return i(this.nodes, this.cmp);
                    }),
                    (e.prototype.updateItem = function (e) {
                      return p(this.nodes, e, this.cmp);
                    }),
                    (e.prototype.clear = function () {
                      return (this.nodes = []);
                    }),
                    (e.prototype.empty = function () {
                      return 0 === this.nodes.length;
                    }),
                    (e.prototype.size = function () {
                      return this.nodes.length;
                    }),
                    (e.prototype.clone = function () {
                      var t;
                      return ((t = new e()).nodes = this.nodes.slice(0)), t;
                    }),
                    (e.prototype.toArray = function () {
                      return this.nodes.slice(0);
                    }),
                    (e.prototype.insert = e.prototype.push),
                    (e.prototype.top = e.prototype.peek),
                    (e.prototype.front = e.prototype.peek),
                    (e.prototype.has = e.prototype.contains),
                    (e.prototype.copy = e.prototype.clone),
                    e
                  );
                })()),
                (e.exports = t);
            }).call(G);
          })((at = { exports: {} })),
          at.exports),
        st = ot,
        lt = Ue({
          root: null,
          weight: function (e) {
            return 1;
          },
          directed: !1,
        }),
        ut = {
          dijkstra: function (e) {
            if (!w(e)) {
              var t = arguments;
              e = { root: t[0], weight: t[1], directed: t[2] };
            }
            var n = lt(e),
              r = n.root,
              i = n.weight,
              a = n.directed,
              o = this,
              s = i,
              l = m(r) ? this.filter(r)[0] : r[0],
              u = {},
              c = {},
              d = {},
              h = this.byGroup(),
              p = h.nodes,
              f = h.edges;
            f.unmergeBy(function (e) {
              return e.isLoop();
            });
            for (
              var g = function (e) {
                  return u[e.id()];
                },
                v = function (e, t) {
                  (u[e.id()] = t), y.updateItem(e);
                },
                y = new st(function (e, t) {
                  return g(e) - g(t);
                }),
                b = 0;
              b < p.length;
              b++
            ) {
              var x = p[b];
              (u[x.id()] = x.same(l) ? 0 : 1 / 0), y.push(x);
            }
            for (
              var E = function (e, t) {
                for (
                  var n,
                    r = (a ? e.edgesTo(t) : e.edgesWith(t)).intersect(f),
                    i = 1 / 0,
                    o = 0;
                  o < r.length;
                  o++
                ) {
                  var l = r[o],
                    u = s(l);
                  (u < i || !n) && ((i = u), (n = l));
                }
                return { edge: n, dist: i };
              };
              y.size() > 0;

            ) {
              var C = y.pop(),
                k = g(C),
                T = C.id();
              if (((d[T] = k), k !== 1 / 0))
                for (
                  var S = C.neighborhood().intersect(p), P = 0;
                  P < S.length;
                  P++
                ) {
                  var D = S[P],
                    _ = D.id(),
                    M = E(C, D),
                    N = k + M.dist;
                  N < g(D) && (v(D, N), (c[_] = { node: C, edge: M.edge }));
                }
            }
            return {
              distanceTo: function (e) {
                var t = m(e) ? p.filter(e)[0] : e[0];
                return d[t.id()];
              },
              pathTo: function (e) {
                var t = m(e) ? p.filter(e)[0] : e[0],
                  n = [],
                  r = t,
                  i = r.id();
                if (t.length > 0)
                  for (n.unshift(t); c[i]; ) {
                    var a = c[i];
                    n.unshift(a.edge),
                      n.unshift(a.node),
                      (i = (r = a.node).id());
                  }
                return o.spawn(n);
              },
            };
          },
        },
        ct = {
          kruskal: function (e) {
            e =
              e ||
              function (e) {
                return 1;
              };
            for (
              var t = this.byGroup(),
                n = t.nodes,
                r = t.edges,
                i = n.length,
                a = new Array(i),
                o = n,
                s = function (e) {
                  for (var t = 0; t < a.length; t++) if (a[t].has(e)) return t;
                },
                l = 0;
              l < i;
              l++
            )
              a[l] = this.spawn(n[l]);
            for (
              var u = r.sort(function (t, n) {
                  return e(t) - e(n);
                }),
                c = 0;
              c < u.length;
              c++
            ) {
              var d = u[c],
                h = d.source()[0],
                p = d.target()[0],
                f = s(h),
                g = s(p),
                v = a[f],
                y = a[g];
              f !== g && (o.merge(d), v.merge(y), a.splice(g, 1));
            }
            return o;
          },
        },
        dt = Ue({
          root: null,
          goal: null,
          weight: function (e) {
            return 1;
          },
          heuristic: function (e) {
            return 0;
          },
          directed: !1,
        }),
        ht = {
          aStar: function (e) {
            var t = this.cy(),
              n = dt(e),
              r = n.root,
              i = n.goal,
              a = n.heuristic,
              o = n.directed,
              s = n.weight;
            (r = t.collection(r)[0]), (i = t.collection(i)[0]);
            var l,
              u,
              c = r.id(),
              d = i.id(),
              h = {},
              p = {},
              f = {},
              g = new st(function (e, t) {
                return p[e.id()] - p[t.id()];
              }),
              v = new tt(),
              y = {},
              m = {},
              b = function (e, t) {
                g.push(e), v.add(t);
              };
            b(r, c), (h[c] = 0), (p[c] = a(r));
            for (var x, w = 0; g.size() > 0; ) {
              if (((u = (l = g.pop()).id()), v.delete(u), w++, u === d)) {
                for (
                  var E = [], C = i, k = d, T = m[k];
                  E.unshift(C), null != T && E.unshift(T), null != (C = y[k]);

                )
                  T = m[(k = C.id())];
                return {
                  found: !0,
                  distance: h[u],
                  path: this.spawn(E),
                  steps: w,
                };
              }
              f[u] = !0;
              for (var S = l._private.edges, P = 0; P < S.length; P++) {
                var D = S[P];
                if (
                  this.hasElementWithId(D.id()) &&
                  (!o || D.data("source") === u)
                ) {
                  var _ = D.source(),
                    M = D.target(),
                    N = _.id() !== u ? _ : M,
                    I = N.id();
                  if (this.hasElementWithId(I) && !f[I]) {
                    var B = h[u] + s(D);
                    (x = I),
                      v.has(x)
                        ? B < h[I] &&
                          ((h[I] = B),
                          (p[I] = B + a(N)),
                          (y[I] = l),
                          (m[I] = D))
                        : ((h[I] = B),
                          (p[I] = B + a(N)),
                          b(N, I),
                          (y[I] = l),
                          (m[I] = D));
                  }
                }
              }
            }
            return { found: !1, distance: void 0, path: void 0, steps: w };
          },
        },
        pt = Ue({
          weight: function (e) {
            return 1;
          },
          directed: !1,
        }),
        ft = {
          floydWarshall: function (e) {
            for (
              var t = this.cy(),
                n = pt(e),
                r = n.weight,
                i = n.directed,
                a = r,
                o = this.byGroup(),
                s = o.nodes,
                l = o.edges,
                u = s.length,
                c = u * u,
                d = function (e) {
                  return s.indexOf(e);
                },
                h = function (e) {
                  return s[e];
                },
                p = new Array(c),
                f = 0;
              f < c;
              f++
            ) {
              var g = f % u,
                v = (f - g) / u;
              p[f] = v === g ? 0 : 1 / 0;
            }
            for (
              var y = new Array(c), b = new Array(c), x = 0;
              x < l.length;
              x++
            ) {
              var w = l[x],
                E = w.source()[0],
                C = w.target()[0];
              if (E !== C) {
                var k = d(E),
                  T = d(C),
                  S = k * u + T,
                  P = a(w);
                if ((p[S] > P && ((p[S] = P), (y[S] = T), (b[S] = w)), !i)) {
                  var D = T * u + k;
                  !i && p[D] > P && ((p[D] = P), (y[D] = k), (b[D] = w));
                }
              }
            }
            for (var _ = 0; _ < u; _++)
              for (var M = 0; M < u; M++)
                for (var N = M * u + _, I = 0; I < u; I++) {
                  var B = M * u + I,
                    A = _ * u + I;
                  p[N] + p[A] < p[B] && ((p[B] = p[N] + p[A]), (y[B] = y[N]));
                }
            var L = function (e) {
                return d(
                  (function (e) {
                    return (m(e) ? t.filter(e) : e)[0];
                  })(e)
                );
              },
              O = {
                distance: function (e, t) {
                  var n = L(e),
                    r = L(t);
                  return p[n * u + r];
                },
                path: function (e, n) {
                  var r = L(e),
                    i = L(n),
                    a = h(r);
                  if (r === i) return a.collection();
                  if (null == y[r * u + i]) return t.collection();
                  var o,
                    s = t.collection(),
                    l = r;
                  for (s.merge(a); r !== i; )
                    (l = r),
                      (r = y[r * u + i]),
                      (o = b[l * u + r]),
                      s.merge(o),
                      s.merge(h(r));
                  return s;
                },
              };
            return O;
          },
        },
        gt = Ue({
          weight: function (e) {
            return 1;
          },
          directed: !1,
          root: null,
        }),
        vt = {
          bellmanFord: function (e) {
            var t = this,
              n = gt(e),
              r = n.weight,
              i = n.directed,
              a = n.root,
              o = r,
              s = this,
              l = this.cy(),
              u = this.byGroup(),
              c = u.edges,
              d = u.nodes,
              h = d.length,
              p = new Je(),
              f = !1,
              g = [];
            (a = l.collection(a)[0]),
              c.unmergeBy(function (e) {
                return e.isLoop();
              });
            for (
              var v = c.length,
                y = function (e) {
                  var t = p.get(e.id());
                  return t || ((t = {}), p.set(e.id(), t)), t;
                },
                b = function (e) {
                  return (m(e) ? l.$(e) : e)[0];
                },
                x = 0;
              x < h;
              x++
            ) {
              var w = d[x],
                E = y(w);
              w.same(a) ? (E.dist = 0) : (E.dist = 1 / 0),
                (E.pred = null),
                (E.edge = null);
            }
            for (
              var C = !1,
                k = function (e, t, n, r, i, a) {
                  var o = r.dist + a;
                  o < i.dist &&
                    !n.same(r.edge) &&
                    ((i.dist = o), (i.pred = e), (i.edge = n), (C = !0));
                },
                T = 1;
              T < h;
              T++
            ) {
              C = !1;
              for (var S = 0; S < v; S++) {
                var P = c[S],
                  D = P.source(),
                  _ = P.target(),
                  M = o(P),
                  N = y(D),
                  I = y(_);
                k(D, 0, P, N, I, M), i || k(_, 0, P, I, N, M);
              }
              if (!C) break;
            }
            if (C)
              for (var B = [], A = 0; A < v; A++) {
                var L = c[A],
                  O = L.source(),
                  R = L.target(),
                  z = o(L),
                  F = y(O).dist,
                  V = y(R).dist;
                if (F + z < V || (!i && V + z < F)) {
                  if (
                    (f ||
                      (Ye(
                        "Graph contains a negative weight cycle for Bellman-Ford"
                      ),
                      (f = !0)),
                    !1 === e.findNegativeWeightCycles)
                  )
                    break;
                  var q = [];
                  F + z < V && q.push(O), !i && V + z < F && q.push(R);
                  for (var j = q.length, Y = 0; Y < j; Y++) {
                    var X = q[Y],
                      W = [X];
                    W.push(y(X).edge);
                    for (var H = y(X).pred; -1 === W.indexOf(H); )
                      W.push(H), W.push(y(H).edge), (H = y(H).pred);
                    for (
                      var G = (W = W.slice(W.indexOf(H)))[0].id(), U = 0, K = 2;
                      K < W.length;
                      K += 2
                    )
                      W[K].id() < G && ((G = W[K].id()), (U = K));
                    (W = W.slice(U).concat(W.slice(0, U))).push(W[0]);
                    var Z = W.map(function (e) {
                      return e.id();
                    }).join(",");
                    -1 === B.indexOf(Z) && (g.push(s.spawn(W)), B.push(Z));
                  }
                }
              }
            return {
              distanceTo: function (e) {
                return y(b(e)).dist;
              },
              pathTo: function (e) {
                for (
                  var n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : a,
                    r = [],
                    i = b(e);
                  ;

                ) {
                  if (null == i) return t.spawn();
                  var o = y(i),
                    l = o.edge,
                    u = o.pred;
                  if ((r.unshift(i[0]), i.same(n) && r.length > 0)) break;
                  null != l && r.unshift(l), (i = u);
                }
                return s.spawn(r);
              },
              hasNegativeWeightCycle: f,
              negativeWeightCycles: g,
            };
          },
        },
        yt = Math.sqrt(2),
        mt = function (e, t, n) {
          0 === n.length &&
            qe("Karger-Stein must be run on a connected (sub)graph");
          for (
            var r = n[e],
              i = r[1],
              a = r[2],
              o = t[i],
              s = t[a],
              l = n,
              u = l.length - 1;
            u >= 0;
            u--
          ) {
            var c = l[u],
              d = c[1],
              h = c[2];
            ((t[d] === o && t[h] === s) || (t[d] === s && t[h] === o)) &&
              l.splice(u, 1);
          }
          for (var p = 0; p < l.length; p++) {
            var f = l[p];
            f[1] === s
              ? ((l[p] = f.slice()), (l[p][1] = o))
              : f[2] === s && ((l[p] = f.slice()), (l[p][2] = o));
          }
          for (var g = 0; g < t.length; g++) t[g] === s && (t[g] = o);
          return l;
        },
        bt = function (e, t, n, r) {
          for (; n > r; ) {
            var i = Math.floor(Math.random() * t.length);
            (t = mt(i, e, t)), n--;
          }
          return t;
        },
        xt = {
          kargerStein: function () {
            var e = this,
              t = this.byGroup(),
              n = t.nodes,
              r = t.edges;
            r.unmergeBy(function (e) {
              return e.isLoop();
            });
            var i = n.length,
              a = r.length,
              o = Math.ceil(Math.pow(Math.log(i) / Math.LN2, 2)),
              s = Math.floor(i / yt);
            if (!(i < 2)) {
              for (var l = [], u = 0; u < a; u++) {
                var c = r[u];
                l.push([u, n.indexOf(c.source()), n.indexOf(c.target())]);
              }
              for (
                var d = 1 / 0,
                  h = [],
                  p = new Array(i),
                  f = new Array(i),
                  g = new Array(i),
                  v = function (e, t) {
                    for (var n = 0; n < i; n++) t[n] = e[n];
                  },
                  y = 0;
                y <= o;
                y++
              ) {
                for (var m = 0; m < i; m++) f[m] = m;
                var b = bt(f, l.slice(), i, s),
                  x = b.slice();
                v(f, g);
                var w = bt(f, b, s, 2),
                  E = bt(g, x, s, 2);
                w.length <= E.length && w.length < d
                  ? ((d = w.length), (h = w), v(f, p))
                  : E.length <= w.length &&
                    E.length < d &&
                    ((d = E.length), (h = E), v(g, p));
              }
              for (
                var C = this.spawn(
                    h.map(function (e) {
                      return r[e[0]];
                    })
                  ),
                  k = this.spawn(),
                  T = this.spawn(),
                  S = p[0],
                  P = 0;
                P < p.length;
                P++
              ) {
                var D = p[P],
                  _ = n[P];
                D === S ? k.merge(_) : T.merge(_);
              }
              var M = function (t) {
                  var n = e.spawn();
                  return (
                    t.forEach(function (t) {
                      n.merge(t),
                        t.connectedEdges().forEach(function (t) {
                          e.contains(t) && !C.contains(t) && n.merge(t);
                        });
                    }),
                    n
                  );
                },
                N = [M(k), M(T)];
              return { cut: C, components: N, partition1: k, partition2: T };
            }
            qe("At least 2 nodes are required for Karger-Stein algorithm");
          },
        },
        wt = function (e, t, n) {
          return { x: e.x * t + n.x, y: e.y * t + n.y };
        },
        Et = function (e, t, n) {
          return { x: (e.x - n.x) / t, y: (e.y - n.y) / t };
        },
        Ct = function (e) {
          return { x: e[0], y: e[1] };
        },
        kt = function (e, t) {
          return Math.atan2(t, e) - Math.PI / 2;
        },
        Tt =
          Math.log2 ||
          function (e) {
            return Math.log(e) / Math.log(2);
          },
        St = function (e) {
          return e > 0 ? 1 : e < 0 ? -1 : 0;
        },
        Pt = function (e, t) {
          return Math.sqrt(Dt(e, t));
        },
        Dt = function (e, t) {
          var n = t.x - e.x,
            r = t.y - e.y;
          return n * n + r * r;
        },
        _t = function (e) {
          for (var t = e.length, n = 0, r = 0; r < t; r++) n += e[r];
          for (var i = 0; i < t; i++) e[i] = e[i] / n;
          return e;
        },
        Mt = function (e, t, n, r) {
          return (1 - r) * (1 - r) * e + 2 * (1 - r) * r * t + r * r * n;
        },
        Nt = function (e, t, n, r) {
          return { x: Mt(e.x, t.x, n.x, r), y: Mt(e.y, t.y, n.y, r) };
        },
        It = function (e, t, n) {
          return Math.max(e, Math.min(n, t));
        },
        Bt = function (e) {
          if (null == e)
            return { x1: 1 / 0, y1: 1 / 0, x2: -1 / 0, y2: -1 / 0, w: 0, h: 0 };
          if (null != e.x1 && null != e.y1) {
            if (null != e.x2 && null != e.y2 && e.x2 >= e.x1 && e.y2 >= e.y1)
              return {
                x1: e.x1,
                y1: e.y1,
                x2: e.x2,
                y2: e.y2,
                w: e.x2 - e.x1,
                h: e.y2 - e.y1,
              };
            if (null != e.w && null != e.h && e.w >= 0 && e.h >= 0)
              return {
                x1: e.x1,
                y1: e.y1,
                x2: e.x1 + e.w,
                y2: e.y1 + e.h,
                w: e.w,
                h: e.h,
              };
          }
        },
        At = function (e, t) {
          (e.x1 = Math.min(e.x1, t.x1)),
            (e.x2 = Math.max(e.x2, t.x2)),
            (e.w = e.x2 - e.x1),
            (e.y1 = Math.min(e.y1, t.y1)),
            (e.y2 = Math.max(e.y2, t.y2)),
            (e.h = e.y2 - e.y1);
        },
        Lt = function (e, t, n) {
          (e.x1 = Math.min(e.x1, t)),
            (e.x2 = Math.max(e.x2, t)),
            (e.w = e.x2 - e.x1),
            (e.y1 = Math.min(e.y1, n)),
            (e.y2 = Math.max(e.y2, n)),
            (e.h = e.y2 - e.y1);
        },
        Ot = function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          return (
            (e.x1 -= t),
            (e.x2 += t),
            (e.y1 -= t),
            (e.y2 += t),
            (e.w = e.x2 - e.x1),
            (e.h = e.y2 - e.y1),
            e
          );
        },
        Rt = function (e) {
          var t,
            n,
            r,
            i,
            a =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : [0];
          if (1 === a.length) t = n = r = i = a[0];
          else if (2 === a.length) (t = r = a[0]), (i = n = a[1]);
          else if (4 === a.length) {
            var o = l(a, 4);
            (t = o[0]), (n = o[1]), (r = o[2]), (i = o[3]);
          }
          return (
            (e.x1 -= i),
            (e.x2 += n),
            (e.y1 -= t),
            (e.y2 += r),
            (e.w = e.x2 - e.x1),
            (e.h = e.y2 - e.y1),
            e
          );
        },
        zt = function (e, t) {
          (e.x1 = t.x1),
            (e.y1 = t.y1),
            (e.x2 = t.x2),
            (e.y2 = t.y2),
            (e.w = e.x2 - e.x1),
            (e.h = e.y2 - e.y1);
        },
        Ft = function (e, t) {
          return !(
            e.x1 > t.x2 ||
            t.x1 > e.x2 ||
            e.x2 < t.x1 ||
            t.x2 < e.x1 ||
            e.y2 < t.y1 ||
            t.y2 < e.y1 ||
            e.y1 > t.y2 ||
            t.y1 > e.y2
          );
        },
        Vt = function (e, t, n) {
          return e.x1 <= t && t <= e.x2 && e.y1 <= n && n <= e.y2;
        },
        qt = function (e, t) {
          return Vt(e, t.x1, t.y1) && Vt(e, t.x2, t.y2);
        },
        jt = function (e, t, n, r, i, a, o) {
          var s,
            l,
            u =
              arguments.length > 7 && void 0 !== arguments[7]
                ? arguments[7]
                : "auto",
            c = "auto" === u ? sn(i, a) : u,
            d = i / 2,
            h = a / 2,
            p = (c = Math.min(c, d, h)) !== d,
            f = c !== h;
          if (p) {
            var g = r - h - o;
            if (
              (s = en(e, t, n, r, n - d + c - o, g, n + d - c + o, g, !1))
                .length > 0
            )
              return s;
          }
          if (f) {
            var v = n + d + o;
            if (
              (s = en(e, t, n, r, v, r - h + c - o, v, r + h - c + o, !1))
                .length > 0
            )
              return s;
          }
          if (p) {
            var y = r + h + o;
            if (
              (s = en(e, t, n, r, n - d + c - o, y, n + d - c + o, y, !1))
                .length > 0
            )
              return s;
          }
          if (f) {
            var m = n - d - o;
            if (
              (s = en(e, t, n, r, m, r - h + c - o, m, r + h - c + o, !1))
                .length > 0
            )
              return s;
          }
          var b = n - d + c,
            x = r - h + c;
          if (
            (l = Qt(e, t, n, r, b, x, c + o)).length > 0 &&
            l[0] <= b &&
            l[1] <= x
          )
            return [l[0], l[1]];
          var w = n + d - c,
            E = r - h + c;
          if (
            (l = Qt(e, t, n, r, w, E, c + o)).length > 0 &&
            l[0] >= w &&
            l[1] <= E
          )
            return [l[0], l[1]];
          var C = n + d - c,
            k = r + h - c;
          if (
            (l = Qt(e, t, n, r, C, k, c + o)).length > 0 &&
            l[0] >= C &&
            l[1] >= k
          )
            return [l[0], l[1]];
          var T = n - d + c,
            S = r + h - c;
          return (l = Qt(e, t, n, r, T, S, c + o)).length > 0 &&
            l[0] <= T &&
            l[1] >= S
            ? [l[0], l[1]]
            : [];
        },
        Yt = function (e, t, n, r, i, a, o) {
          var s = o,
            l = Math.min(n, i),
            u = Math.max(n, i),
            c = Math.min(r, a),
            d = Math.max(r, a);
          return l - s <= e && e <= u + s && c - s <= t && t <= d + s;
        },
        Xt = function (e, t, n, r, i, a, o, s, l) {
          var u = Math.min(n, o, i) - l,
            c = Math.max(n, o, i) + l,
            d = Math.min(r, s, a) - l,
            h = Math.max(r, s, a) + l;
          return !(e < u || e > c || t < d || t > h);
        },
        Wt = function (e, t, n, r, i, a, o, s) {
          var l,
            u,
            c,
            d,
            h,
            p,
            f,
            g,
            v,
            y,
            m,
            b,
            x,
            w = [];
          (u =
            9 * n * i -
            3 * n * n -
            3 * n * o -
            6 * i * i +
            3 * i * o +
            9 * r * a -
            3 * r * r -
            3 * r * s -
            6 * a * a +
            3 * a * s),
            (c =
              3 * n * n -
              6 * n * i +
              n * o -
              n * e +
              2 * i * i +
              2 * i * e -
              o * e +
              3 * r * r -
              6 * r * a +
              r * s -
              r * t +
              2 * a * a +
              2 * a * t -
              s * t),
            (d =
              1 * n * i -
              n * n +
              n * e -
              i * e +
              r * a -
              r * r +
              r * t -
              a * t),
            0 ===
              (l =
                1 * n * n -
                4 * n * i +
                2 * n * o +
                4 * i * i -
                4 * i * o +
                o * o +
                r * r -
                4 * r * a +
                2 * r * s +
                4 * a * a -
                4 * a * s +
                s * s) && (l = 1e-5),
            (g = -27 * (d /= l) + (u /= l) * (9 * (c /= l) - u * u * 2)),
            (p = (f = (3 * c - u * u) / 9) * f * f + (g /= 54) * g),
            ((h = w)[1] = 0),
            (b = u / 3),
            p > 0
              ? ((y =
                  (y = g + Math.sqrt(p)) < 0
                    ? -Math.pow(-y, 1 / 3)
                    : Math.pow(y, 1 / 3)),
                (m =
                  (m = g - Math.sqrt(p)) < 0
                    ? -Math.pow(-m, 1 / 3)
                    : Math.pow(m, 1 / 3)),
                (h[0] = -b + y + m),
                (b += (y + m) / 2),
                (h[4] = h[2] = -b),
                (b = (Math.sqrt(3) * (-m + y)) / 2),
                (h[3] = b),
                (h[5] = -b))
              : ((h[5] = h[3] = 0),
                0 === p
                  ? ((x = g < 0 ? -Math.pow(-g, 1 / 3) : Math.pow(g, 1 / 3)),
                    (h[0] = 2 * x - b),
                    (h[4] = h[2] = -(x + b)))
                  : ((v = (f = -f) * f * f),
                    (v = Math.acos(g / Math.sqrt(v))),
                    (x = 2 * Math.sqrt(f)),
                    (h[0] = -b + x * Math.cos(v / 3)),
                    (h[2] = -b + x * Math.cos((v + 2 * Math.PI) / 3)),
                    (h[4] = -b + x * Math.cos((v + 4 * Math.PI) / 3))));
          for (var E = [], C = 0; C < 6; C += 2)
            Math.abs(w[C + 1]) < 1e-7 && w[C] >= 0 && w[C] <= 1 && E.push(w[C]);
          E.push(1), E.push(0);
          for (var k, T, S, P = -1, D = 0; D < E.length; D++)
            (k =
              Math.pow(1 - E[D], 2) * n +
              2 * (1 - E[D]) * E[D] * i +
              E[D] * E[D] * o),
              (T =
                Math.pow(1 - E[D], 2) * r +
                2 * (1 - E[D]) * E[D] * a +
                E[D] * E[D] * s),
              (S = Math.pow(k - e, 2) + Math.pow(T - t, 2)),
              P >= 0 ? S < P && (P = S) : (P = S);
          return P;
        },
        Ht = function (e, t, n, r, i, a) {
          var o = [e - n, t - r],
            s = [i - n, a - r],
            l = s[0] * s[0] + s[1] * s[1],
            u = o[0] * o[0] + o[1] * o[1],
            c = o[0] * s[0] + o[1] * s[1],
            d = (c * c) / l;
          return c < 0
            ? u
            : d > l
            ? (e - i) * (e - i) + (t - a) * (t - a)
            : u - d;
        },
        Gt = function (e, t, n) {
          for (var r, i, a, o, s = 0, l = 0; l < n.length / 2; l++)
            if (
              ((r = n[2 * l]),
              (i = n[2 * l + 1]),
              l + 1 < n.length / 2
                ? ((a = n[2 * (l + 1)]), (o = n[2 * (l + 1) + 1]))
                : ((a = n[2 * (l + 1 - n.length / 2)]),
                  (o = n[2 * (l + 1 - n.length / 2) + 1])),
              r == e && a == e)
            );
            else {
              if (!((r >= e && e >= a) || (r <= e && e <= a))) continue;
              ((e - r) / (a - r)) * (o - i) + i > t && s++;
            }
          return s % 2 != 0;
        },
        Ut = function (e, t, n, r, i, a, o, s, l) {
          var u,
            c = new Array(n.length);
          null != s[0]
            ? ((u = Math.atan(s[1] / s[0])),
              s[0] < 0 ? (u += Math.PI / 2) : (u = -u - Math.PI / 2))
            : (u = s);
          for (
            var d, h = Math.cos(-u), p = Math.sin(-u), f = 0;
            f < c.length / 2;
            f++
          )
            (c[2 * f] = (a / 2) * (n[2 * f] * h - n[2 * f + 1] * p)),
              (c[2 * f + 1] = (o / 2) * (n[2 * f + 1] * h + n[2 * f] * p)),
              (c[2 * f] += r),
              (c[2 * f + 1] += i);
          if (l > 0) {
            var g = Zt(c, -l);
            d = Kt(g);
          } else d = c;
          return Gt(e, t, d);
        },
        Kt = function (e) {
          for (
            var t, n, r, i, a, o, s, l, u = new Array(e.length / 2), c = 0;
            c < e.length / 4;
            c++
          ) {
            (t = e[4 * c]),
              (n = e[4 * c + 1]),
              (r = e[4 * c + 2]),
              (i = e[4 * c + 3]),
              c < e.length / 4 - 1
                ? ((a = e[4 * (c + 1)]),
                  (o = e[4 * (c + 1) + 1]),
                  (s = e[4 * (c + 1) + 2]),
                  (l = e[4 * (c + 1) + 3]))
                : ((a = e[0]), (o = e[1]), (s = e[2]), (l = e[3]));
            var d = en(t, n, r, i, a, o, s, l, !0);
            (u[2 * c] = d[0]), (u[2 * c + 1] = d[1]);
          }
          return u;
        },
        Zt = function (e, t) {
          for (
            var n, r, i, a, o = new Array(2 * e.length), s = 0;
            s < e.length / 2;
            s++
          ) {
            (n = e[2 * s]),
              (r = e[2 * s + 1]),
              s < e.length / 2 - 1
                ? ((i = e[2 * (s + 1)]), (a = e[2 * (s + 1) + 1]))
                : ((i = e[0]), (a = e[1]));
            var l = a - r,
              u = -(i - n),
              c = Math.sqrt(l * l + u * u),
              d = l / c,
              h = u / c;
            (o[4 * s] = n + d * t),
              (o[4 * s + 1] = r + h * t),
              (o[4 * s + 2] = i + d * t),
              (o[4 * s + 3] = a + h * t);
          }
          return o;
        },
        $t = function (e, t, n, r, i, a, o) {
          return (
            (e -= i), (t -= a), (e /= n / 2 + o) * e + (t /= r / 2 + o) * t <= 1
          );
        },
        Qt = function (e, t, n, r, i, a, o) {
          var s = [n - e, r - t],
            l = [e - i, t - a],
            u = s[0] * s[0] + s[1] * s[1],
            c = 2 * (l[0] * s[0] + l[1] * s[1]),
            d = c * c - 4 * u * (l[0] * l[0] + l[1] * l[1] - o * o);
          if (d < 0) return [];
          var h = (-c + Math.sqrt(d)) / (2 * u),
            p = (-c - Math.sqrt(d)) / (2 * u),
            f = Math.min(h, p),
            g = Math.max(h, p),
            v = [];
          if (
            (f >= 0 && f <= 1 && v.push(f),
            g >= 0 && g <= 1 && v.push(g),
            0 === v.length)
          )
            return [];
          var y = v[0] * s[0] + e,
            m = v[0] * s[1] + t;
          return v.length > 1
            ? v[0] == v[1]
              ? [y, m]
              : [y, m, v[1] * s[0] + e, v[1] * s[1] + t]
            : [y, m];
        },
        Jt = function (e, t, n) {
          return (t <= e && e <= n) || (n <= e && e <= t)
            ? e
            : (e <= t && t <= n) || (n <= t && t <= e)
            ? t
            : n;
        },
        en = function (e, t, n, r, i, a, o, s, l) {
          var u = e - i,
            c = n - e,
            d = o - i,
            h = t - a,
            p = r - t,
            f = s - a,
            g = d * h - f * u,
            v = c * h - p * u,
            y = f * c - d * p;
          if (0 !== y) {
            var m = g / y,
              b = v / y,
              x = -0.001;
            return (x <= m && m <= 1.001 && x <= b && b <= 1.001) || l
              ? [e + m * c, t + m * p]
              : [];
          }
          return 0 === g || 0 === v
            ? Jt(e, n, o) === o
              ? [o, s]
              : Jt(e, n, i) === i
              ? [i, a]
              : Jt(i, o, n) === n
              ? [n, r]
              : []
            : [];
        },
        tn = function (e, t, n, r, i, a, o, s) {
          var l,
            u,
            c,
            d,
            h,
            p,
            f = [],
            g = new Array(n.length),
            v = !0;
          if ((null == a && (v = !1), v)) {
            for (var y = 0; y < g.length / 2; y++)
              (g[2 * y] = n[2 * y] * a + r),
                (g[2 * y + 1] = n[2 * y + 1] * o + i);
            if (s > 0) {
              var m = Zt(g, -s);
              u = Kt(m);
            } else u = g;
          } else u = n;
          for (var b = 0; b < u.length / 2; b++)
            (c = u[2 * b]),
              (d = u[2 * b + 1]),
              b < u.length / 2 - 1
                ? ((h = u[2 * (b + 1)]), (p = u[2 * (b + 1) + 1]))
                : ((h = u[0]), (p = u[1])),
              0 !== (l = en(e, t, r, i, c, d, h, p)).length &&
                f.push(l[0], l[1]);
          return f;
        },
        nn = function (e, t, n) {
          var r = [e[0] - t[0], e[1] - t[1]],
            i = Math.sqrt(r[0] * r[0] + r[1] * r[1]),
            a = (i - n) / i;
          return a < 0 && (a = 1e-5), [t[0] + a * r[0], t[1] + a * r[1]];
        },
        rn = function (e, t) {
          var n = on(e, t);
          return an(n);
        },
        an = function (e) {
          for (
            var t,
              n,
              r = e.length / 2,
              i = 1 / 0,
              a = 1 / 0,
              o = -1 / 0,
              s = -1 / 0,
              l = 0;
            l < r;
            l++
          )
            (t = e[2 * l]),
              (n = e[2 * l + 1]),
              (i = Math.min(i, t)),
              (o = Math.max(o, t)),
              (a = Math.min(a, n)),
              (s = Math.max(s, n));
          for (var u = 2 / (o - i), c = 2 / (s - a), d = 0; d < r; d++)
            (t = e[2 * d] = e[2 * d] * u),
              (n = e[2 * d + 1] = e[2 * d + 1] * c),
              (i = Math.min(i, t)),
              (o = Math.max(o, t)),
              (a = Math.min(a, n)),
              (s = Math.max(s, n));
          if (a < -1)
            for (var h = 0; h < r; h++)
              n = e[2 * h + 1] = e[2 * h + 1] + (-1 - a);
          return e;
        },
        on = function (e, t) {
          var n = (1 / e) * 2 * Math.PI,
            r = e % 2 == 0 ? Math.PI / 2 + n / 2 : Math.PI / 2;
          r += t;
          for (var i, a = new Array(2 * e), o = 0; o < e; o++)
            (i = o * n + r),
              (a[2 * o] = Math.cos(i)),
              (a[2 * o + 1] = Math.sin(-i));
          return a;
        },
        sn = function (e, t) {
          return Math.min(e / 4, t / 4, 8);
        },
        ln = function (e, t) {
          return Math.min(e / 10, t / 10, 8);
        },
        un = function (e, t) {
          return {
            heightOffset: Math.min(15, 0.05 * t),
            widthOffset: Math.min(100, 0.25 * e),
            ctrlPtOffsetPct: 0.05,
          };
        },
        cn = Ue({
          dampingFactor: 0.8,
          precision: 1e-6,
          iterations: 200,
          weight: function (e) {
            return 1;
          },
        }),
        dn = {
          pageRank: function (e) {
            for (
              var t = cn(e),
                n = t.dampingFactor,
                r = t.precision,
                i = t.iterations,
                a = t.weight,
                o = this._private.cy,
                s = this.byGroup(),
                l = s.nodes,
                u = s.edges,
                c = l.length,
                d = c * c,
                h = u.length,
                p = new Array(d),
                f = new Array(c),
                g = (1 - n) / c,
                v = 0;
              v < c;
              v++
            ) {
              for (var y = 0; y < c; y++) p[v * c + y] = 0;
              f[v] = 0;
            }
            for (var m = 0; m < h; m++) {
              var b = u[m],
                x = b.data("source"),
                w = b.data("target");
              if (x !== w) {
                var E = l.indexOfId(x),
                  C = l.indexOfId(w),
                  k = a(b);
                (p[C * c + E] += k), (f[E] += k);
              }
            }
            for (var T = 1 / c + g, S = 0; S < c; S++)
              if (0 === f[S]) for (var P = 0; P < c; P++) p[P * c + S] = T;
              else
                for (var D = 0; D < c; D++) {
                  var _ = D * c + S;
                  p[_] = p[_] / f[S] + g;
                }
            for (var M, N = new Array(c), I = new Array(c), B = 0; B < c; B++)
              N[B] = 1;
            for (var A = 0; A < i; A++) {
              for (var L = 0; L < c; L++) I[L] = 0;
              for (var O = 0; O < c; O++)
                for (var R = 0; R < c; R++) {
                  var z = O * c + R;
                  I[O] += p[z] * N[R];
                }
              _t(I), (M = N), (N = I), (I = M);
              for (var F = 0, V = 0; V < c; V++) {
                var q = M[V] - N[V];
                F += q * q;
              }
              if (F < r) break;
            }
            return {
              rank: function (e) {
                return (e = o.collection(e)[0]), N[l.indexOf(e)];
              },
            };
          },
        },
        hn = Ue({
          root: null,
          weight: function (e) {
            return 1;
          },
          directed: !1,
          alpha: 0,
        }),
        pn = {
          degreeCentralityNormalized: function (e) {
            e = hn(e);
            var t = this.cy(),
              n = this.nodes(),
              r = n.length;
            if (e.directed) {
              for (var i = {}, a = {}, o = 0, s = 0, l = 0; l < r; l++) {
                var u = n[l],
                  c = u.id();
                e.root = u;
                var d = this.degreeCentrality(e);
                o < d.indegree && (o = d.indegree),
                  s < d.outdegree && (s = d.outdegree),
                  (i[c] = d.indegree),
                  (a[c] = d.outdegree);
              }
              return {
                indegree: function (e) {
                  return 0 == o
                    ? 0
                    : (m(e) && (e = t.filter(e)), i[e.id()] / o);
                },
                outdegree: function (e) {
                  return 0 === s
                    ? 0
                    : (m(e) && (e = t.filter(e)), a[e.id()] / s);
                },
              };
            }
            for (var h = {}, p = 0, f = 0; f < r; f++) {
              var g = n[f];
              e.root = g;
              var v = this.degreeCentrality(e);
              p < v.degree && (p = v.degree), (h[g.id()] = v.degree);
            }
            return {
              degree: function (e) {
                return 0 === p ? 0 : (m(e) && (e = t.filter(e)), h[e.id()] / p);
              },
            };
          },
          degreeCentrality: function (e) {
            e = hn(e);
            var t = this.cy(),
              n = this,
              r = e,
              i = r.root,
              a = r.weight,
              o = r.directed,
              s = r.alpha;
            if (((i = t.collection(i)[0]), o)) {
              for (
                var l = i.connectedEdges(),
                  u = l.filter(function (e) {
                    return e.target().same(i) && n.has(e);
                  }),
                  c = l.filter(function (e) {
                    return e.source().same(i) && n.has(e);
                  }),
                  d = u.length,
                  h = c.length,
                  p = 0,
                  f = 0,
                  g = 0;
                g < u.length;
                g++
              )
                p += a(u[g]);
              for (var v = 0; v < c.length; v++) f += a(c[v]);
              return {
                indegree: Math.pow(d, 1 - s) * Math.pow(p, s),
                outdegree: Math.pow(h, 1 - s) * Math.pow(f, s),
              };
            }
            for (
              var y = i.connectedEdges().intersection(n),
                m = y.length,
                b = 0,
                x = 0;
              x < y.length;
              x++
            )
              b += a(y[x]);
            return { degree: Math.pow(m, 1 - s) * Math.pow(b, s) };
          },
        };
      (pn.dc = pn.degreeCentrality),
        (pn.dcn = pn.degreeCentralityNormalised =
          pn.degreeCentralityNormalized);
      var fn = Ue({
          harmonic: !0,
          weight: function () {
            return 1;
          },
          directed: !1,
          root: null,
        }),
        gn = {
          closenessCentralityNormalized: function (e) {
            for (
              var t = fn(e),
                n = t.harmonic,
                r = t.weight,
                i = t.directed,
                a = this.cy(),
                o = {},
                s = 0,
                l = this.nodes(),
                u = this.floydWarshall({ weight: r, directed: i }),
                c = 0;
              c < l.length;
              c++
            ) {
              for (var d = 0, h = l[c], p = 0; p < l.length; p++)
                if (c !== p) {
                  var f = u.distance(h, l[p]);
                  d += n ? 1 / f : f;
                }
              n || (d = 1 / d), s < d && (s = d), (o[h.id()] = d);
            }
            return {
              closeness: function (e) {
                return 0 == s
                  ? 0
                  : ((e = m(e) ? a.filter(e)[0].id() : e.id()), o[e] / s);
              },
            };
          },
          closenessCentrality: function (e) {
            var t = fn(e),
              n = t.root,
              r = t.weight,
              i = t.directed,
              a = t.harmonic;
            n = this.filter(n)[0];
            for (
              var o = this.dijkstra({ root: n, weight: r, directed: i }),
                s = 0,
                l = this.nodes(),
                u = 0;
              u < l.length;
              u++
            ) {
              var c = l[u];
              if (!c.same(n)) {
                var d = o.distanceTo(c);
                s += a ? 1 / d : d;
              }
            }
            return a ? s : 1 / s;
          },
        };
      (gn.cc = gn.closenessCentrality),
        (gn.ccn = gn.closenessCentralityNormalised =
          gn.closenessCentralityNormalized);
      var vn = Ue({ weight: null, directed: !1 }),
        yn = {
          betweennessCentrality: function (e) {
            for (
              var t = vn(e),
                n = t.directed,
                r = t.weight,
                i = null != r,
                a = this.cy(),
                o = this.nodes(),
                s = {},
                l = {},
                u = 0,
                c = function (e, t) {
                  (l[e] = t), t > u && (u = t);
                },
                d = function (e) {
                  return l[e];
                },
                h = 0;
              h < o.length;
              h++
            ) {
              var p = o[h],
                f = p.id();
              (s[f] = n ? p.outgoers().nodes() : p.openNeighborhood().nodes()),
                c(f, 0);
            }
            for (
              var g = function (e) {
                  for (
                    var t = o[e].id(),
                      n = [],
                      l = {},
                      u = {},
                      h = {},
                      p = new st(function (e, t) {
                        return h[e] - h[t];
                      }),
                      f = 0;
                    f < o.length;
                    f++
                  ) {
                    var g = o[f].id();
                    (l[g] = []), (u[g] = 0), (h[g] = 1 / 0);
                  }
                  for (u[t] = 1, h[t] = 0, p.push(t); !p.empty(); ) {
                    var v = p.pop();
                    if ((n.push(v), i))
                      for (var y = 0; y < s[v].length; y++) {
                        var m,
                          b = s[v][y],
                          x = a.getElementById(v);
                        m =
                          x.edgesTo(b).length > 0
                            ? x.edgesTo(b)[0]
                            : b.edgesTo(x)[0];
                        var w = r(m);
                        (b = b.id()),
                          h[b] > h[v] + w &&
                            ((h[b] = h[v] + w),
                            p.nodes.indexOf(b) < 0
                              ? p.push(b)
                              : p.updateItem(b),
                            (u[b] = 0),
                            (l[b] = [])),
                          h[b] == h[v] + w &&
                            ((u[b] = u[b] + u[v]), l[b].push(v));
                      }
                    else
                      for (var E = 0; E < s[v].length; E++) {
                        var C = s[v][E].id();
                        h[C] == 1 / 0 && (p.push(C), (h[C] = h[v] + 1)),
                          h[C] == h[v] + 1 &&
                            ((u[C] = u[C] + u[v]), l[C].push(v));
                      }
                  }
                  for (var k = {}, T = 0; T < o.length; T++) k[o[T].id()] = 0;
                  for (; n.length > 0; ) {
                    for (var S = n.pop(), P = 0; P < l[S].length; P++) {
                      var D = l[S][P];
                      k[D] = k[D] + (u[D] / u[S]) * (1 + k[S]);
                    }
                    S != o[e].id() && c(S, d(S) + k[S]);
                  }
                },
                v = 0;
              v < o.length;
              v++
            )
              g(v);
            var y = {
              betweenness: function (e) {
                var t = a.collection(e).id();
                return d(t);
              },
              betweennessNormalized: function (e) {
                if (0 == u) return 0;
                var t = a.collection(e).id();
                return d(t) / u;
              },
            };
            return (y.betweennessNormalised = y.betweennessNormalized), y;
          },
        };
      yn.bc = yn.betweennessCentrality;
      var mn = Ue({
          expandFactor: 2,
          inflateFactor: 2,
          multFactor: 1,
          maxIterations: 20,
          attributes: [
            function (e) {
              return 1;
            },
          ],
        }),
        bn = function (e, t) {
          for (var n = 0, r = 0; r < t.length; r++) n += t[r](e);
          return n;
        },
        xn = function (e, t) {
          for (var n, r = 0; r < t; r++) {
            n = 0;
            for (var i = 0; i < t; i++) n += e[i * t + r];
            for (var a = 0; a < t; a++) e[a * t + r] = e[a * t + r] / n;
          }
        },
        wn = function (e, t, n) {
          for (var r = new Array(n * n), i = 0; i < n; i++) {
            for (var a = 0; a < n; a++) r[i * n + a] = 0;
            for (var o = 0; o < n; o++)
              for (var s = 0; s < n; s++)
                r[i * n + s] += e[i * n + o] * t[o * n + s];
          }
          return r;
        },
        En = function (e, t, n) {
          for (var r = e.slice(0), i = 1; i < n; i++) e = wn(e, r, t);
          return e;
        },
        Cn = function (e, t, n) {
          for (var r = new Array(t * t), i = 0; i < t * t; i++)
            r[i] = Math.pow(e[i], n);
          return xn(r, t), r;
        },
        kn = function (e, t, n, r) {
          for (var i = 0; i < n; i++)
            if (
              Math.round(e[i] * Math.pow(10, r)) / Math.pow(10, r) !=
              Math.round(t[i] * Math.pow(10, r)) / Math.pow(10, r)
            )
              return !1;
          return !0;
        },
        Tn = function (e, t) {
          for (var n = 0; n < e.length; n++)
            if (!t[n] || e[n].id() !== t[n].id()) return !1;
          return !0;
        },
        Sn = function (e) {
          for (
            var t = this.nodes(),
              n = this.edges(),
              r = this.cy(),
              i = (function (e) {
                return mn(e);
              })(e),
              a = {},
              o = 0;
            o < t.length;
            o++
          )
            a[t[o].id()] = o;
          for (
            var s, l = t.length, u = l * l, c = new Array(u), d = 0;
            d < u;
            d++
          )
            c[d] = 0;
          for (var h = 0; h < n.length; h++) {
            var p = n[h],
              f = a[p.source().id()],
              g = a[p.target().id()],
              v = bn(p, i.attributes);
            (c[f * l + g] += v), (c[g * l + f] += v);
          }
          !(function (e, t, n) {
            for (var r = 0; r < t; r++) e[r * t + r] = n;
          })(c, l, i.multFactor),
            xn(c, l);
          for (var y = !0, m = 0; y && m < i.maxIterations; )
            (y = !1),
              (s = En(c, l, i.expandFactor)),
              (c = Cn(s, l, i.inflateFactor)),
              kn(c, s, u, 4) || (y = !0),
              m++;
          var b = (function (e, t, n, r) {
            for (var i = [], a = 0; a < t; a++) {
              for (var o = [], s = 0; s < t; s++)
                Math.round(1e3 * e[a * t + s]) / 1e3 > 0 && o.push(n[s]);
              0 !== o.length && i.push(r.collection(o));
            }
            return i;
          })(c, l, t, r);
          return (
            (b = (function (e) {
              for (var t = 0; t < e.length; t++)
                for (var n = 0; n < e.length; n++)
                  t != n && Tn(e[t], e[n]) && e.splice(n, 1);
              return e;
            })(b)),
            b
          );
        },
        Pn = { markovClustering: Sn, mcl: Sn },
        Dn = function (e) {
          return e;
        },
        _n = function (e, t) {
          return Math.abs(t - e);
        },
        Mn = function (e, t, n) {
          return e + _n(t, n);
        },
        Nn = function (e, t, n) {
          return e + Math.pow(n - t, 2);
        },
        In = function (e) {
          return Math.sqrt(e);
        },
        Bn = function (e, t, n) {
          return Math.max(e, _n(t, n));
        },
        An = function (e, t, n, r, i) {
          for (
            var a =
                arguments.length > 5 && void 0 !== arguments[5]
                  ? arguments[5]
                  : Dn,
              o = r,
              s = 0;
            s < e;
            s++
          )
            o = i(o, t(s), n(s));
          return a(o);
        },
        Ln = {
          euclidean: function (e, t, n) {
            return e >= 2 ? An(e, t, n, 0, Nn, In) : An(e, t, n, 0, Mn);
          },
          squaredEuclidean: function (e, t, n) {
            return An(e, t, n, 0, Nn);
          },
          manhattan: function (e, t, n) {
            return An(e, t, n, 0, Mn);
          },
          max: function (e, t, n) {
            return An(e, t, n, -1 / 0, Bn);
          },
        };
      function On(e, t, n, r, i, a) {
        var o;
        return (
          (o = b(e) ? e : Ln[e] || Ln.euclidean),
          0 === t && b(e) ? o(i, a) : o(t, n, r, i, a)
        );
      }
      (Ln["squared-euclidean"] = Ln.squaredEuclidean),
        (Ln.squaredeuclidean = Ln.squaredEuclidean);
      var Rn = Ue({
          k: 2,
          m: 2,
          sensitivityThreshold: 1e-4,
          distance: "euclidean",
          maxIterations: 10,
          attributes: [],
          testMode: !1,
          testCentroids: null,
        }),
        zn = function (e) {
          return Rn(e);
        },
        Fn = function (e, t, n, r, i) {
          var a =
              "kMedoids" !== i
                ? function (e) {
                    return n[e];
                  }
                : function (e) {
                    return r[e](n);
                  },
            o = n,
            s = t;
          return On(
            e,
            r.length,
            a,
            function (e) {
              return r[e](t);
            },
            o,
            s
          );
        },
        Vn = function (e, t, n) {
          for (
            var r = n.length,
              i = new Array(r),
              a = new Array(r),
              o = new Array(t),
              s = null,
              l = 0;
            l < r;
            l++
          )
            (i[l] = e.min(n[l]).value), (a[l] = e.max(n[l]).value);
          for (var u = 0; u < t; u++) {
            s = [];
            for (var c = 0; c < r; c++)
              s[c] = Math.random() * (a[c] - i[c]) + i[c];
            o[u] = s;
          }
          return o;
        },
        qn = function (e, t, n, r, i) {
          for (var a = 1 / 0, o = 0, s = 0; s < t.length; s++) {
            var l = Fn(n, e, t[s], r, i);
            l < a && ((a = l), (o = s));
          }
          return o;
        },
        jn = function (e, t, n) {
          for (var r = [], i = null, a = 0; a < t.length; a++)
            n[(i = t[a]).id()] === e && r.push(i);
          return r;
        },
        Yn = function (e, t, n) {
          return Math.abs(t - e) <= n;
        },
        Xn = function (e, t, n) {
          for (var r = 0; r < e.length; r++)
            for (var i = 0; i < e[r].length; i++)
              if (Math.abs(e[r][i] - t[r][i]) > n) return !1;
          return !0;
        },
        Wn = function (e, t, n) {
          for (var r = 0; r < n; r++) if (e === t[r]) return !0;
          return !1;
        },
        Hn = function (e, t) {
          var n = new Array(t);
          if (e.length < 50)
            for (var r = 0; r < t; r++) {
              for (
                var i = e[Math.floor(Math.random() * e.length)];
                Wn(i, n, r);

              )
                i = e[Math.floor(Math.random() * e.length)];
              n[r] = i;
            }
          else
            for (var a = 0; a < t; a++)
              n[a] = e[Math.floor(Math.random() * e.length)];
          return n;
        },
        Gn = function (e, t, n) {
          for (var r = 0, i = 0; i < t.length; i++)
            r += Fn("manhattan", t[i], e, n, "kMedoids");
          return r;
        },
        Un = function (e, t, n, r, i) {
          for (var a, o, s = 0; s < t.length; s++)
            for (var l = 0; l < e.length; l++) r[s][l] = Math.pow(n[s][l], i.m);
          for (var u = 0; u < e.length; u++)
            for (var c = 0; c < i.attributes.length; c++) {
              (a = 0), (o = 0);
              for (var d = 0; d < t.length; d++)
                (a += r[d][u] * i.attributes[c](t[d])), (o += r[d][u]);
              e[u][c] = a / o;
            }
        },
        Kn = function (e, t, n, r, i) {
          for (var a = 0; a < e.length; a++) t[a] = e[a].slice();
          for (var o, s, l, u = 2 / (i.m - 1), c = 0; c < n.length; c++)
            for (var d = 0; d < r.length; d++) {
              o = 0;
              for (var h = 0; h < n.length; h++)
                (s = Fn(i.distance, r[d], n[c], i.attributes, "cmeans")),
                  (l = Fn(i.distance, r[d], n[h], i.attributes, "cmeans")),
                  (o += Math.pow(s / l, u));
              e[d][c] = 1 / o;
            }
        },
        Zn = function (e) {
          var t,
            n,
            r,
            i,
            a,
            o = this.cy(),
            s = this.nodes(),
            l = zn(e);
          i = new Array(s.length);
          for (var u = 0; u < s.length; u++) i[u] = new Array(l.k);
          r = new Array(s.length);
          for (var c = 0; c < s.length; c++) r[c] = new Array(l.k);
          for (var d = 0; d < s.length; d++) {
            for (var h = 0, p = 0; p < l.k; p++)
              (r[d][p] = Math.random()), (h += r[d][p]);
            for (var f = 0; f < l.k; f++) r[d][f] = r[d][f] / h;
          }
          n = new Array(l.k);
          for (var g = 0; g < l.k; g++) n[g] = new Array(l.attributes.length);
          a = new Array(s.length);
          for (var v = 0; v < s.length; v++) a[v] = new Array(l.k);
          for (var y = !0, m = 0; y && m < l.maxIterations; )
            (y = !1),
              Un(n, s, r, a, l),
              Kn(r, i, n, s, l),
              Xn(r, i, l.sensitivityThreshold) || (y = !0),
              m++;
          return (
            (t = (function (e, t, n, r) {
              for (var i, a, o = new Array(n.k), s = 0; s < o.length; s++)
                o[s] = [];
              for (var l = 0; l < t.length; l++) {
                (i = -1 / 0), (a = -1);
                for (var u = 0; u < t[0].length; u++)
                  t[l][u] > i && ((i = t[l][u]), (a = u));
                o[a].push(e[l]);
              }
              for (var c = 0; c < o.length; c++) o[c] = r.collection(o[c]);
              return o;
            })(s, r, l, o)),
            { clusters: t, degreeOfMembership: r }
          );
        },
        $n = {
          kMeans: function (e) {
            var t,
              n = this.cy(),
              i = this.nodes(),
              a = null,
              o = zn(e),
              s = new Array(o.k),
              l = {};
            o.testMode
              ? "number" == typeof o.testCentroids
                ? (o.testCentroids, (t = Vn(i, o.k, o.attributes)))
                : (t =
                    "object" === r(o.testCentroids)
                      ? o.testCentroids
                      : Vn(i, o.k, o.attributes))
              : (t = Vn(i, o.k, o.attributes));
            for (var u = !0, c = 0; u && c < o.maxIterations; ) {
              for (var d = 0; d < i.length; d++)
                l[(a = i[d]).id()] = qn(
                  a,
                  t,
                  o.distance,
                  o.attributes,
                  "kMeans"
                );
              u = !1;
              for (var h = 0; h < o.k; h++) {
                var p = jn(h, i, l);
                if (0 !== p.length) {
                  for (
                    var f = o.attributes.length,
                      g = t[h],
                      v = new Array(f),
                      y = new Array(f),
                      m = 0;
                    m < f;
                    m++
                  ) {
                    y[m] = 0;
                    for (var b = 0; b < p.length; b++)
                      (a = p[b]), (y[m] += o.attributes[m](a));
                    (v[m] = y[m] / p.length),
                      Yn(v[m], g[m], o.sensitivityThreshold) || (u = !0);
                  }
                  (t[h] = v), (s[h] = n.collection(p));
                }
              }
              c++;
            }
            return s;
          },
          kMedoids: function (e) {
            var t,
              n,
              i = this.cy(),
              a = this.nodes(),
              o = null,
              s = zn(e),
              l = new Array(s.k),
              u = {},
              c = new Array(s.k);
            s.testMode
              ? "number" == typeof s.testCentroids ||
                (t =
                  "object" === r(s.testCentroids)
                    ? s.testCentroids
                    : Hn(a, s.k))
              : (t = Hn(a, s.k));
            for (var d = !0, h = 0; d && h < s.maxIterations; ) {
              for (var p = 0; p < a.length; p++)
                u[(o = a[p]).id()] = qn(
                  o,
                  t,
                  s.distance,
                  s.attributes,
                  "kMedoids"
                );
              d = !1;
              for (var f = 0; f < t.length; f++) {
                var g = jn(f, a, u);
                if (0 !== g.length) {
                  c[f] = Gn(t[f], g, s.attributes);
                  for (var v = 0; v < g.length; v++)
                    (n = Gn(g[v], g, s.attributes)) < c[f] &&
                      ((c[f] = n), (t[f] = g[v]), (d = !0));
                  l[f] = i.collection(g);
                }
              }
              h++;
            }
            return l;
          },
          fuzzyCMeans: Zn,
          fcm: Zn,
        },
        Qn = Ue({
          distance: "euclidean",
          linkage: "min",
          mode: "threshold",
          threshold: 1 / 0,
          addDendrogram: !1,
          dendrogramDepth: 0,
          attributes: [],
        }),
        Jn = { single: "min", complete: "max" },
        er = function (e, t, n, r, i) {
          for (
            var a,
              o = 0,
              s = 1 / 0,
              l = i.attributes,
              u = function (e, t) {
                return On(
                  i.distance,
                  l.length,
                  function (t) {
                    return l[t](e);
                  },
                  function (e) {
                    return l[e](t);
                  },
                  e,
                  t
                );
              },
              c = 0;
            c < e.length;
            c++
          ) {
            var d = e[c].key,
              h = n[d][r[d]];
            h < s && ((o = d), (s = h));
          }
          if (
            ("threshold" === i.mode && s >= i.threshold) ||
            ("dendrogram" === i.mode && 1 === e.length)
          )
            return !1;
          var p,
            f = t[o],
            g = t[r[o]];
          (p =
            "dendrogram" === i.mode
              ? { left: f, right: g, key: f.key }
              : { value: f.value.concat(g.value), key: f.key }),
            (e[f.index] = p),
            e.splice(g.index, 1),
            (t[f.key] = p);
          for (var v = 0; v < e.length; v++) {
            var y = e[v];
            f.key === y.key
              ? (a = 1 / 0)
              : "min" === i.linkage
              ? ((a = n[f.key][y.key]),
                n[f.key][y.key] > n[g.key][y.key] && (a = n[g.key][y.key]))
              : "max" === i.linkage
              ? ((a = n[f.key][y.key]),
                n[f.key][y.key] < n[g.key][y.key] && (a = n[g.key][y.key]))
              : (a =
                  "mean" === i.linkage
                    ? (n[f.key][y.key] * f.size + n[g.key][y.key] * g.size) /
                      (f.size + g.size)
                    : "dendrogram" === i.mode
                    ? u(y.value, f.value)
                    : u(y.value[0], f.value[0])),
              (n[f.key][y.key] = n[y.key][f.key] = a);
          }
          for (var m = 0; m < e.length; m++) {
            var b = e[m].key;
            if (r[b] === f.key || r[b] === g.key) {
              for (var x = b, w = 0; w < e.length; w++) {
                var E = e[w].key;
                n[b][E] < n[b][x] && (x = E);
              }
              r[b] = x;
            }
            e[m].index = m;
          }
          return (f.key = g.key = f.index = g.index = null), !0;
        },
        tr = function e(t, n, r) {
          t &&
            (t.value
              ? n.push(t.value)
              : (t.left && e(t.left, n), t.right && e(t.right, n)));
        },
        nr = function e(t, n) {
          if (!t) return "";
          if (t.left && t.right) {
            var r = e(t.left, n),
              i = e(t.right, n),
              a = n.add({ group: "nodes", data: { id: r + "," + i } });
            return (
              n.add({ group: "edges", data: { source: r, target: a.id() } }),
              n.add({ group: "edges", data: { source: i, target: a.id() } }),
              a.id()
            );
          }
          return t.value ? t.value.id() : void 0;
        },
        rr = function e(t, n, r) {
          if (!t) return [];
          var i = [],
            a = [],
            o = [];
          return 0 === n
            ? (t.left && tr(t.left, i),
              t.right && tr(t.right, a),
              (o = i.concat(a)),
              [r.collection(o)])
            : 1 === n
            ? t.value
              ? [r.collection(t.value)]
              : (t.left && tr(t.left, i),
                t.right && tr(t.right, a),
                [r.collection(i), r.collection(a)])
            : t.value
            ? [r.collection(t.value)]
            : (t.left && (i = e(t.left, n - 1, r)),
              t.right && (a = e(t.right, n - 1, r)),
              i.concat(a));
        },
        ir = function (e) {
          for (
            var t = this.cy(),
              n = this.nodes(),
              r = (function (e) {
                var t = Qn(e),
                  n = Jn[t.linkage];
                return null != n && (t.linkage = n), t;
              })(e),
              i = r.attributes,
              a = function (e, t) {
                return On(
                  r.distance,
                  i.length,
                  function (t) {
                    return i[t](e);
                  },
                  function (e) {
                    return i[e](t);
                  },
                  e,
                  t
                );
              },
              o = [],
              s = [],
              l = [],
              u = [],
              c = 0;
            c < n.length;
            c++
          ) {
            var d = {
              value: "dendrogram" === r.mode ? n[c] : [n[c]],
              key: c,
              index: c,
            };
            (o[c] = d), (u[c] = d), (s[c] = []), (l[c] = 0);
          }
          for (var h = 0; h < o.length; h++)
            for (var p = 0; p <= h; p++) {
              var f;
              (f =
                "dendrogram" === r.mode
                  ? h === p
                    ? 1 / 0
                    : a(o[h].value, o[p].value)
                  : h === p
                  ? 1 / 0
                  : a(o[h].value[0], o[p].value[0])),
                (s[h][p] = f),
                (s[p][h] = f),
                f < s[h][l[h]] && (l[h] = p);
            }
          for (var g, v = er(o, u, s, l, r); v; ) v = er(o, u, s, l, r);
          return (
            "dendrogram" === r.mode
              ? ((g = rr(o[0], r.dendrogramDepth, t)),
                r.addDendrogram && nr(o[0], t))
              : ((g = new Array(o.length)),
                o.forEach(function (e, n) {
                  (e.key = e.index = null), (g[n] = t.collection(e.value));
                })),
            g
          );
        },
        ar = { hierarchicalClustering: ir, hca: ir },
        or = Ue({
          distance: "euclidean",
          preference: "median",
          damping: 0.8,
          maxIterations: 1e3,
          minIterations: 100,
          attributes: [],
        }),
        sr = function (e, t, n, r) {
          var i = function (e, t) {
            return r[t](e);
          };
          return -On(
            e,
            r.length,
            function (e) {
              return i(t, e);
            },
            function (e) {
              return i(n, e);
            },
            t,
            n
          );
        },
        lr = function (e, t, n) {
          for (var r = [], i = 0; i < e; i++) {
            for (var a = -1, o = -1 / 0, s = 0; s < n.length; s++) {
              var l = n[s];
              t[i * e + l] > o && ((a = l), (o = t[i * e + l]));
            }
            a > 0 && r.push(a);
          }
          for (var u = 0; u < n.length; u++) r[n[u]] = n[u];
          return r;
        },
        ur = function (e) {
          for (
            var t,
              n,
              r,
              i,
              a,
              o,
              s = this.cy(),
              l = this.nodes(),
              u = (function (e) {
                var t = e.damping,
                  n = e.preference;
                (0.5 <= t && t < 1) ||
                  qe("Damping must range on [0.5, 1).  Got: ".concat(t));
                var r = ["median", "mean", "min", "max"];
                return (
                  r.some(function (e) {
                    return e === n;
                  }) ||
                    E(n) ||
                    qe(
                      "Preference must be one of ["
                        .concat(
                          r
                            .map(function (e) {
                              return "'".concat(e, "'");
                            })
                            .join(", "),
                          "] or a number.  Got: "
                        )
                        .concat(n)
                    ),
                  or(e)
                );
              })(e),
              c = {},
              d = 0;
            d < l.length;
            d++
          )
            c[l[d].id()] = d;
          (n = (t = l.length) * t), (r = new Array(n));
          for (var h = 0; h < n; h++) r[h] = -1 / 0;
          for (var p = 0; p < t; p++)
            for (var f = 0; f < t; f++)
              p !== f &&
                (r[p * t + f] = sr(u.distance, l[p], l[f], u.attributes));
          i = (function (e, t) {
            var n;
            return (
              (n =
                "median" === t
                  ? (function (e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : 0,
                        n =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : e.length,
                        r =
                          !(arguments.length > 4 && void 0 !== arguments[4]) ||
                          arguments[4],
                        i =
                          !(arguments.length > 5 && void 0 !== arguments[5]) ||
                          arguments[5];
                      arguments.length > 3 &&
                      void 0 !== arguments[3] &&
                      !arguments[3]
                        ? (n < e.length && e.splice(n, e.length - n),
                          t > 0 && e.splice(0, t))
                        : (e = e.slice(t, n));
                      for (var a = 0, o = e.length - 1; o >= 0; o--) {
                        var s = e[o];
                        i
                          ? isFinite(s) || ((e[o] = -1 / 0), a++)
                          : e.splice(o, 1);
                      }
                      r &&
                        e.sort(function (e, t) {
                          return e - t;
                        });
                      var l = e.length,
                        u = Math.floor(l / 2);
                      return l % 2 != 0
                        ? e[u + 1 + a]
                        : (e[u - 1 + a] + e[u + a]) / 2;
                    })(e)
                  : "mean" === t
                  ? (function (e) {
                      for (
                        var t =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : 0,
                          n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : e.length,
                          r = 0,
                          i = 0,
                          a = t;
                        a < n;
                        a++
                      ) {
                        var o = e[a];
                        isFinite(o) && ((r += o), i++);
                      }
                      return r / i;
                    })(e)
                  : "min" === t
                  ? (function (e) {
                      for (
                        var t =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : 0,
                          n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : e.length,
                          r = 1 / 0,
                          i = t;
                        i < n;
                        i++
                      ) {
                        var a = e[i];
                        isFinite(a) && (r = Math.min(a, r));
                      }
                      return r;
                    })(e)
                  : "max" === t
                  ? (function (e) {
                      for (
                        var t =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : 0,
                          n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : e.length,
                          r = -1 / 0,
                          i = t;
                        i < n;
                        i++
                      ) {
                        var a = e[i];
                        isFinite(a) && (r = Math.max(a, r));
                      }
                      return r;
                    })(e)
                  : t),
              n
            );
          })(r, u.preference);
          for (var g = 0; g < t; g++) r[g * t + g] = i;
          a = new Array(n);
          for (var v = 0; v < n; v++) a[v] = 0;
          o = new Array(n);
          for (var y = 0; y < n; y++) o[y] = 0;
          for (
            var m = new Array(t), b = new Array(t), x = new Array(t), w = 0;
            w < t;
            w++
          )
            (m[w] = 0), (b[w] = 0), (x[w] = 0);
          for (
            var C, k = new Array(t * u.minIterations), T = 0;
            T < k.length;
            T++
          )
            k[T] = 0;
          for (C = 0; C < u.maxIterations; C++) {
            for (var S = 0; S < t; S++) {
              for (var P = -1 / 0, D = -1 / 0, _ = -1, M = 0, N = 0; N < t; N++)
                (m[N] = a[S * t + N]),
                  (M = o[S * t + N] + r[S * t + N]) >= P
                    ? ((D = P), (P = M), (_ = N))
                    : M > D && (D = M);
              for (var I = 0; I < t; I++)
                a[S * t + I] =
                  (1 - u.damping) * (r[S * t + I] - P) + u.damping * m[I];
              a[S * t + _] =
                (1 - u.damping) * (r[S * t + _] - D) + u.damping * m[_];
            }
            for (var B = 0; B < t; B++) {
              for (var A = 0, L = 0; L < t; L++)
                (m[L] = o[L * t + B]),
                  (b[L] = Math.max(0, a[L * t + B])),
                  (A += b[L]);
              (A -= b[B]), (b[B] = a[B * t + B]), (A += b[B]);
              for (var O = 0; O < t; O++)
                o[O * t + B] =
                  (1 - u.damping) * Math.min(0, A - b[O]) + u.damping * m[O];
              o[B * t + B] = (1 - u.damping) * (A - b[B]) + u.damping * m[B];
            }
            for (var R = 0, z = 0; z < t; z++) {
              var F = o[z * t + z] + a[z * t + z] > 0 ? 1 : 0;
              (k[(C % u.minIterations) * t + z] = F), (R += F);
            }
            if (
              R > 0 &&
              (C >= u.minIterations - 1 || C == u.maxIterations - 1)
            ) {
              for (var V = 0, q = 0; q < t; q++) {
                x[q] = 0;
                for (var j = 0; j < u.minIterations; j++) x[q] += k[j * t + q];
                (0 !== x[q] && x[q] !== u.minIterations) || V++;
              }
              if (V === t) break;
            }
          }
          for (
            var Y = (function (e, t, n) {
                for (var r = [], i = 0; i < e; i++)
                  t[i * e + i] + n[i * e + i] > 0 && r.push(i);
                return r;
              })(t, a, o),
              X = (function (e, t, n) {
                for (var r = lr(e, t, n), i = 0; i < n.length; i++) {
                  for (var a = [], o = 0; o < r.length; o++)
                    r[o] === n[i] && a.push(o);
                  for (var s = -1, l = -1 / 0, u = 0; u < a.length; u++) {
                    for (var c = 0, d = 0; d < a.length; d++)
                      c += t[a[d] * e + a[u]];
                    c > l && ((s = u), (l = c));
                  }
                  n[i] = a[s];
                }
                return lr(e, t, n);
              })(t, r, Y),
              W = {},
              H = 0;
            H < Y.length;
            H++
          )
            W[Y[H]] = [];
          for (var G = 0; G < l.length; G++) {
            var U = X[c[l[G].id()]];
            null != U && W[U].push(l[G]);
          }
          for (var K = new Array(Y.length), Z = 0; Z < Y.length; Z++)
            K[Z] = s.collection(W[Y[Z]]);
          return K;
        },
        cr = { affinityPropagation: ur, ap: ur },
        dr = Ue({ root: void 0, directed: !1 }),
        hr = function () {
          var e = this,
            t = {},
            n = 0,
            r = 0,
            i = [],
            a = [],
            o = {},
            s = function s(l, u, c) {
              l === c && (r += 1), (t[u] = { id: n, low: n++, cutVertex: !1 });
              var d,
                h,
                p,
                f,
                g = e.getElementById(u).connectedEdges().intersection(e);
              0 === g.size()
                ? i.push(e.spawn(e.getElementById(u)))
                : g.forEach(function (n) {
                    (d = n.source().id()),
                      (h = n.target().id()),
                      (p = d === u ? h : d) !== c &&
                        ((f = n.id()),
                        o[f] || ((o[f] = !0), a.push({ x: u, y: p, edge: n })),
                        p in t
                          ? (t[u].low = Math.min(t[u].low, t[p].id))
                          : (s(l, p, u),
                            (t[u].low = Math.min(t[u].low, t[p].low)),
                            t[u].id <= t[p].low &&
                              ((t[u].cutVertex = !0),
                              (function (n, r) {
                                for (
                                  var o = a.length - 1, s = [], l = e.spawn();
                                  a[o].x != n || a[o].y != r;

                                )
                                  s.push(a.pop().edge), o--;
                                s.push(a.pop().edge),
                                  s.forEach(function (n) {
                                    var r = n.connectedNodes().intersection(e);
                                    l.merge(n),
                                      r.forEach(function (n) {
                                        var r = n.id(),
                                          i = n
                                            .connectedEdges()
                                            .intersection(e);
                                        l.merge(n),
                                          t[r].cutVertex
                                            ? l.merge(
                                                i.filter(function (e) {
                                                  return e.isLoop();
                                                })
                                              )
                                            : l.merge(i);
                                      });
                                  }),
                                  i.push(l);
                              })(u, p))));
                  });
            };
          e.forEach(function (e) {
            if (e.isNode()) {
              var n = e.id();
              n in t || ((r = 0), s(n, n), (t[n].cutVertex = r > 1));
            }
          });
          var l = Object.keys(t)
            .filter(function (e) {
              return t[e].cutVertex;
            })
            .map(function (t) {
              return e.getElementById(t);
            });
          return { cut: e.spawn(l), components: i };
        },
        pr = function () {
          var e = this,
            t = {},
            n = 0,
            r = [],
            i = [],
            a = e.spawn(e),
            o = function o(s) {
              if (
                (i.push(s),
                (t[s] = { index: n, low: n++, explored: !1 }),
                e
                  .getElementById(s)
                  .connectedEdges()
                  .intersection(e)
                  .forEach(function (e) {
                    var n = e.target().id();
                    n !== s &&
                      (n in t || o(n),
                      t[n].explored ||
                        (t[s].low = Math.min(t[s].low, t[n].low)));
                  }),
                t[s].index === t[s].low)
              ) {
                for (var l = e.spawn(); ; ) {
                  var u = i.pop();
                  if (
                    (l.merge(e.getElementById(u)),
                    (t[u].low = t[s].index),
                    (t[u].explored = !0),
                    u === s)
                  )
                    break;
                }
                var c = l.edgesWith(l),
                  d = l.merge(c);
                r.push(d), (a = a.difference(d));
              }
            };
          return (
            e.forEach(function (e) {
              if (e.isNode()) {
                var n = e.id();
                n in t || o(n);
              }
            }),
            { cut: a, components: r }
          );
        },
        fr = {};
      [
        it,
        ut,
        ct,
        ht,
        ft,
        vt,
        xt,
        dn,
        pn,
        gn,
        yn,
        Pn,
        $n,
        ar,
        cr,
        {
          hierholzer: function (e) {
            if (!w(e)) {
              var t = arguments;
              e = { root: t[0], directed: t[1] };
            }
            var n,
              r,
              i,
              a = dr(e),
              o = a.root,
              s = a.directed,
              l = this,
              u = !1;
            o && (i = m(o) ? this.filter(o)[0].id() : o[0].id());
            var c = {},
              d = {};
            s
              ? l.forEach(function (e) {
                  var t = e.id();
                  if (e.isNode()) {
                    var i = e.indegree(!0),
                      a = e.outdegree(!0),
                      o = i - a,
                      s = a - i;
                    1 == o
                      ? n
                        ? (u = !0)
                        : (n = t)
                      : 1 == s
                      ? r
                        ? (u = !0)
                        : (r = t)
                      : (s > 1 || o > 1) && (u = !0),
                      (c[t] = []),
                      e.outgoers().forEach(function (e) {
                        e.isEdge() && c[t].push(e.id());
                      });
                  } else d[t] = [void 0, e.target().id()];
                })
              : l.forEach(function (e) {
                  var t = e.id();
                  e.isNode()
                    ? (e.degree(!0) % 2 &&
                        (n ? (r ? (u = !0) : (r = t)) : (n = t)),
                      (c[t] = []),
                      e.connectedEdges().forEach(function (e) {
                        return c[t].push(e.id());
                      }))
                    : (d[t] = [e.source().id(), e.target().id()]);
                });
            var h = { found: !1, trail: void 0 };
            if (u) return h;
            if (r && n)
              if (s) {
                if (i && r != i) return h;
                i = r;
              } else {
                if (i && r != i && n != i) return h;
                i || (i = r);
              }
            else i || (i = l[0].id());
            var p = function (e) {
                for (var t, n, r, i = e, a = [e]; c[i].length; )
                  (t = c[i].shift()),
                    (n = d[t][0]),
                    i != (r = d[t][1])
                      ? ((c[r] = c[r].filter(function (e) {
                          return e != t;
                        })),
                        (i = r))
                      : s ||
                        i == n ||
                        ((c[n] = c[n].filter(function (e) {
                          return e != t;
                        })),
                        (i = n)),
                    a.unshift(t),
                    a.unshift(i);
                return a;
              },
              f = [],
              g = [];
            for (g = p(i); 1 != g.length; )
              0 == c[g[0]].length
                ? (f.unshift(l.getElementById(g.shift())),
                  f.unshift(l.getElementById(g.shift())))
                : (g = p(g.shift()).concat(g));
            for (var v in (f.unshift(l.getElementById(g.shift())), c))
              if (c[v].length) return h;
            return (h.found = !0), (h.trail = this.spawn(f, !0)), h;
          },
        },
        {
          hopcroftTarjanBiconnected: hr,
          htbc: hr,
          htb: hr,
          hopcroftTarjanBiconnectedComponents: hr,
        },
        {
          tarjanStronglyConnected: pr,
          tsc: pr,
          tscc: pr,
          tarjanStronglyConnectedComponents: pr,
        },
      ].forEach(function (e) {
        j(fr, e);
      });
      var gr = function e(t) {
        if (!(this instanceof e)) return new e(t);
        (this.id = "Thenable/1.0.7"),
          (this.state = 0),
          (this.fulfillValue = void 0),
          (this.rejectReason = void 0),
          (this.onFulfilled = []),
          (this.onRejected = []),
          (this.proxy = { then: this.then.bind(this) }),
          "function" == typeof t &&
            t.call(this, this.fulfill.bind(this), this.reject.bind(this));
      };
      gr.prototype = {
        fulfill: function (e) {
          return vr(this, 1, "fulfillValue", e);
        },
        reject: function (e) {
          return vr(this, 2, "rejectReason", e);
        },
        then: function (e, t) {
          var n = this,
            r = new gr();
          return (
            n.onFulfilled.push(br(e, r, "fulfill")),
            n.onRejected.push(br(t, r, "reject")),
            yr(n),
            r.proxy
          );
        },
      };
      var vr = function (e, t, n, r) {
          return 0 === e.state && ((e.state = t), (e[n] = r), yr(e)), e;
        },
        yr = function (e) {
          1 === e.state
            ? mr(e, "onFulfilled", e.fulfillValue)
            : 2 === e.state && mr(e, "onRejected", e.rejectReason);
        },
        mr = function (e, t, n) {
          if (0 !== e[t].length) {
            var r = e[t];
            e[t] = [];
            var i = function () {
              for (var e = 0; e < r.length; e++) r[e](n);
            };
            "function" == typeof setImmediate
              ? setImmediate(i)
              : setTimeout(i, 0);
          }
        },
        br = function (e, t, n) {
          return function (r) {
            if ("function" != typeof e) t[n].call(t, r);
            else {
              var i;
              try {
                i = e(r);
              } catch (e) {
                return void t.reject(e);
              }
              xr(t, i);
            }
          };
        },
        xr = function e(t, n) {
          if (t !== n && t.proxy !== n) {
            var i;
            if (("object" === r(n) && null !== n) || "function" == typeof n)
              try {
                i = n.then;
              } catch (e) {
                return void t.reject(e);
              }
            if ("function" != typeof i) t.fulfill(n);
            else {
              var a = !1;
              try {
                i.call(
                  n,
                  function (r) {
                    a ||
                      ((a = !0),
                      r === n
                        ? t.reject(new TypeError("circular thenable chain"))
                        : e(t, r));
                  },
                  function (e) {
                    a || ((a = !0), t.reject(e));
                  }
                );
              } catch (e) {
                a || t.reject(e);
              }
            }
          } else t.reject(new TypeError("cannot resolve promise with itself"));
        };
      (gr.all = function (e) {
        return new gr(function (t, n) {
          for (
            var r = new Array(e.length),
              i = 0,
              a = function (n, a) {
                (r[n] = a), ++i === e.length && t(r);
              },
              o = 0;
            o < e.length;
            o++
          )
            !(function (t) {
              var r = e[t];
              null != r && null != r.then
                ? r.then(
                    function (e) {
                      a(t, e);
                    },
                    function (e) {
                      n(e);
                    }
                  )
                : a(t, r);
            })(o);
        });
      }),
        (gr.resolve = function (e) {
          return new gr(function (t, n) {
            t(e);
          });
        }),
        (gr.reject = function (e) {
          return new gr(function (t, n) {
            n(e);
          });
        });
      var wr = "undefined" != typeof Promise ? Promise : gr,
        Er = function (e, t, n) {
          var r = P(e),
            i = !r,
            a = (this._private = j({ duration: 1e3 }, t, n));
          if (
            ((a.target = e),
            (a.style = a.style || a.css),
            (a.started = !1),
            (a.playing = !1),
            (a.hooked = !1),
            (a.applying = !1),
            (a.progress = 0),
            (a.completes = []),
            (a.frames = []),
            a.complete && b(a.complete) && a.completes.push(a.complete),
            i)
          ) {
            var o = e.position();
            (a.startPosition = a.startPosition || { x: o.x, y: o.y }),
              (a.startStyle =
                a.startStyle ||
                e.cy().style().getAnimationStartStyle(e, a.style));
          }
          if (r) {
            var s = e.pan();
            (a.startPan = { x: s.x, y: s.y }), (a.startZoom = e.zoom());
          }
          (this.length = 1), (this[0] = this);
        },
        Cr = Er.prototype;
      j(Cr, {
        instanceString: function () {
          return "animation";
        },
        hook: function () {
          var e = this._private;
          if (!e.hooked) {
            var t = e.target._private.animation;
            (e.queue ? t.queue : t.current).push(this),
              k(e.target) && e.target.cy().addToAnimationPool(e.target),
              (e.hooked = !0);
          }
          return this;
        },
        play: function () {
          var e = this._private;
          return (
            1 === e.progress && (e.progress = 0),
            (e.playing = !0),
            (e.started = !1),
            (e.stopped = !1),
            this.hook(),
            this
          );
        },
        playing: function () {
          return this._private.playing;
        },
        apply: function () {
          var e = this._private;
          return (
            (e.applying = !0),
            (e.started = !1),
            (e.stopped = !1),
            this.hook(),
            this
          );
        },
        applying: function () {
          return this._private.applying;
        },
        pause: function () {
          var e = this._private;
          return (e.playing = !1), (e.started = !1), this;
        },
        stop: function () {
          var e = this._private;
          return (e.playing = !1), (e.started = !1), (e.stopped = !0), this;
        },
        rewind: function () {
          return this.progress(0);
        },
        fastforward: function () {
          return this.progress(1);
        },
        time: function (e) {
          var t = this._private;
          return void 0 === e
            ? t.progress * t.duration
            : this.progress(e / t.duration);
        },
        progress: function (e) {
          var t = this._private,
            n = t.playing;
          return void 0 === e
            ? t.progress
            : (n && this.pause(),
              (t.progress = e),
              (t.started = !1),
              n && this.play(),
              this);
        },
        completed: function () {
          return 1 === this._private.progress;
        },
        reverse: function () {
          var e = this._private,
            t = e.playing;
          t && this.pause(), (e.progress = 1 - e.progress), (e.started = !1);
          var n = function (t, n) {
            var r = e[t];
            null != r && ((e[t] = e[n]), (e[n] = r));
          };
          if (
            (n("zoom", "startZoom"),
            n("pan", "startPan"),
            n("position", "startPosition"),
            e.style)
          )
            for (var r = 0; r < e.style.length; r++) {
              var i = e.style[r],
                a = i.name,
                o = e.startStyle[a];
              (e.startStyle[a] = i), (e.style[r] = o);
            }
          return t && this.play(), this;
        },
        promise: function (e) {
          var t,
            n = this._private;
          return (
            (t = "frame" === e ? n.frames : n.completes),
            new wr(function (e, n) {
              t.push(function () {
                e();
              });
            })
          );
        },
      }),
        (Cr.complete = Cr.completed),
        (Cr.run = Cr.play),
        (Cr.running = Cr.playing);
      var kr,
        Tr = {
          animated: function () {
            return function () {
              var e = this,
                t = void 0 !== e.length ? e : [e];
              if (!(this._private.cy || this).styleEnabled()) return !1;
              var n = t[0];
              return n ? n._private.animation.current.length > 0 : void 0;
            };
          },
          clearQueue: function () {
            return function () {
              var e = this,
                t = void 0 !== e.length ? e : [e];
              if (!(this._private.cy || this).styleEnabled()) return this;
              for (var n = 0; n < t.length; n++)
                t[n]._private.animation.queue = [];
              return this;
            };
          },
          delay: function () {
            return function (e, t) {
              return (this._private.cy || this).styleEnabled()
                ? this.animate({ delay: e, duration: e, complete: t })
                : this;
            };
          },
          delayAnimation: function () {
            return function (e, t) {
              return (this._private.cy || this).styleEnabled()
                ? this.animation({ delay: e, duration: e, complete: t })
                : this;
            };
          },
          animation: function () {
            return function (e, t) {
              var n = this,
                r = void 0 !== n.length,
                i = r ? n : [n],
                a = this._private.cy || this,
                o = !r,
                s = !o;
              if (!a.styleEnabled()) return this;
              var l = a.style();
              if (((e = j({}, e, t)), 0 === Object.keys(e).length))
                return new Er(i[0], e);
              switch (
                (void 0 === e.duration && (e.duration = 400), e.duration)
              ) {
                case "slow":
                  e.duration = 600;
                  break;
                case "fast":
                  e.duration = 200;
              }
              if (
                (s &&
                  ((e.style = l.getPropsList(e.style || e.css)),
                  (e.css = void 0)),
                s && null != e.renderedPosition)
              ) {
                var u = e.renderedPosition,
                  c = a.pan(),
                  d = a.zoom();
                e.position = Et(u, d, c);
              }
              if (o && null != e.panBy) {
                var h = e.panBy,
                  p = a.pan();
                e.pan = { x: p.x + h.x, y: p.y + h.y };
              }
              var f = e.center || e.centre;
              if (o && null != f) {
                var g = a.getCenterPan(f.eles, e.zoom);
                null != g && (e.pan = g);
              }
              if (o && null != e.fit) {
                var v = e.fit,
                  y = a.getFitViewport(v.eles || v.boundingBox, v.padding);
                null != y && ((e.pan = y.pan), (e.zoom = y.zoom));
              }
              if (o && w(e.zoom)) {
                var m = a.getZoomedViewport(e.zoom);
                null != m
                  ? (m.zoomed && (e.zoom = m.zoom), m.panned && (e.pan = m.pan))
                  : (e.zoom = null);
              }
              return new Er(i[0], e);
            };
          },
          animate: function () {
            return function (e, t) {
              var n = this,
                r = void 0 !== n.length ? n : [n];
              if (!(this._private.cy || this).styleEnabled()) return this;
              t && (e = j({}, e, t));
              for (var i = 0; i < r.length; i++) {
                var a = r[i],
                  o = a.animated() && (void 0 === e.queue || e.queue);
                a.animation(e, o ? { queue: !0 } : void 0).play();
              }
              return this;
            };
          },
          stop: function () {
            return function (e, t) {
              var n = this,
                r = void 0 !== n.length ? n : [n],
                i = this._private.cy || this;
              if (!i.styleEnabled()) return this;
              for (var a = 0; a < r.length; a++) {
                for (
                  var o = r[a]._private, s = o.animation.current, l = 0;
                  l < s.length;
                  l++
                ) {
                  var u = s[l]._private;
                  t && (u.duration = 0);
                }
                e && (o.animation.queue = []), t || (o.animation.current = []);
              }
              return i.notify("draw"), this;
            };
          },
        },
        Sr = Array.isArray,
        Pr = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        Dr = /^\w*$/,
        _r = Z["__core-js_shared__"],
        Mr = (kr = /[^.]+$/.exec((_r && _r.keys && _r.keys.IE_PROTO) || ""))
          ? "Symbol(src)_1." + kr
          : "",
        Nr = Function.prototype.toString,
        Ir = /^\[object .+?Constructor\]$/,
        Br = Function.prototype,
        Ar = Object.prototype,
        Lr = Br.toString,
        Or = Ar.hasOwnProperty,
        Rr = RegExp(
          "^" +
            Lr.call(Or)
              .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?"
              ) +
            "$"
        ),
        zr = function (e) {
          return (
            !(!H(e) || ((t = e), Mr && Mr in t)) &&
            ((function (e) {
              if (!H(e)) return !1;
              var t = le(e);
              return (
                "[object Function]" == t ||
                "[object GeneratorFunction]" == t ||
                "[object AsyncFunction]" == t ||
                "[object Proxy]" == t
              );
            })(e)
              ? Rr
              : Ir
            ).test(
              (function (e) {
                if (null != e) {
                  try {
                    return Nr.call(e);
                  } catch (e) {}
                  try {
                    return e + "";
                  } catch (e) {}
                }
                return "";
              })(e)
            )
          );
          var t;
        },
        Fr = function (e, t) {
          var n = (function (e, t) {
            return null == e ? void 0 : e[t];
          })(e, t);
          return zr(n) ? n : void 0;
        },
        Vr = Fr(Object, "create"),
        qr = Object.prototype.hasOwnProperty,
        jr = Object.prototype.hasOwnProperty;
      function Yr(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }
      (Yr.prototype.clear = function () {
        (this.__data__ = Vr ? Vr(null) : {}), (this.size = 0);
      }),
        (Yr.prototype.delete = function (e) {
          var t = this.has(e) && delete this.__data__[e];
          return (this.size -= t ? 1 : 0), t;
        }),
        (Yr.prototype.get = function (e) {
          var t = this.__data__;
          if (Vr) {
            var n = t[e];
            return "__lodash_hash_undefined__" === n ? void 0 : n;
          }
          return qr.call(t, e) ? t[e] : void 0;
        }),
        (Yr.prototype.has = function (e) {
          var t = this.__data__;
          return Vr ? void 0 !== t[e] : jr.call(t, e);
        }),
        (Yr.prototype.set = function (e, t) {
          var n = this.__data__;
          return (
            (this.size += this.has(e) ? 0 : 1),
            (n[e] = Vr && void 0 === t ? "__lodash_hash_undefined__" : t),
            this
          );
        });
      var Xr = Yr,
        Wr = function (e, t) {
          return e === t || (e != e && t != t);
        },
        Hr = function (e, t) {
          for (var n = e.length; n--; ) if (Wr(e[n][0], t)) return n;
          return -1;
        },
        Gr = Array.prototype.splice;
      function Ur(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }
      (Ur.prototype.clear = function () {
        (this.__data__ = []), (this.size = 0);
      }),
        (Ur.prototype.delete = function (e) {
          var t = this.__data__,
            n = Hr(t, e);
          return !(
            n < 0 ||
            (n == t.length - 1 ? t.pop() : Gr.call(t, n, 1), --this.size, 0)
          );
        }),
        (Ur.prototype.get = function (e) {
          var t = this.__data__,
            n = Hr(t, e);
          return n < 0 ? void 0 : t[n][1];
        }),
        (Ur.prototype.has = function (e) {
          return Hr(this.__data__, e) > -1;
        }),
        (Ur.prototype.set = function (e, t) {
          var n = this.__data__,
            r = Hr(n, e);
          return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
        });
      var Kr = Ur,
        Zr = Fr(Z, "Map"),
        $r = function (e, t) {
          var n,
            r,
            i = e.__data__;
          return (
            "string" == (r = typeof (n = t)) ||
            "number" == r ||
            "symbol" == r ||
            "boolean" == r
              ? "__proto__" !== n
              : null === n
          )
            ? i["string" == typeof t ? "string" : "hash"]
            : i.map;
        };
      function Qr(e) {
        var t = -1,
          n = null == e ? 0 : e.length;
        for (this.clear(); ++t < n; ) {
          var r = e[t];
          this.set(r[0], r[1]);
        }
      }
      (Qr.prototype.clear = function () {
        (this.size = 0),
          (this.__data__ = {
            hash: new Xr(),
            map: new (Zr || Kr)(),
            string: new Xr(),
          });
      }),
        (Qr.prototype.delete = function (e) {
          var t = $r(this, e).delete(e);
          return (this.size -= t ? 1 : 0), t;
        }),
        (Qr.prototype.get = function (e) {
          return $r(this, e).get(e);
        }),
        (Qr.prototype.has = function (e) {
          return $r(this, e).has(e);
        }),
        (Qr.prototype.set = function (e, t) {
          var n = $r(this, e),
            r = n.size;
          return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
        });
      var Jr = Qr;
      function ei(e, t) {
        if ("function" != typeof e || (null != t && "function" != typeof t))
          throw new TypeError("Expected a function");
        var n = function () {
          var r = arguments,
            i = t ? t.apply(this, r) : r[0],
            a = n.cache;
          if (a.has(i)) return a.get(i);
          var o = e.apply(this, r);
          return (n.cache = a.set(i, o) || a), o;
        };
        return (n.cache = new (ei.Cache || Jr)()), n;
      }
      ei.Cache = Jr;
      var ti = ei,
        ni =
          /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        ri = /\\(\\)?/g,
        ii = (function (e) {
          var t = ti(e, function (e) {
              return 500 === n.size && n.clear(), e;
            }),
            n = t.cache;
          return t;
        })(function (e) {
          var t = [];
          return (
            46 === e.charCodeAt(0) && t.push(""),
            e.replace(ni, function (e, n, r, i) {
              t.push(r ? i.replace(ri, "$1") : n || e);
            }),
            t
          );
        }),
        ai = ii,
        oi = function (e, t) {
          for (
            var n = -1, r = null == e ? 0 : e.length, i = Array(r);
            ++n < r;

          )
            i[n] = t(e[n], n, e);
          return i;
        },
        si = te ? te.prototype : void 0,
        li = si ? si.toString : void 0,
        ui = function e(t) {
          if ("string" == typeof t) return t;
          if (Sr(t)) return oi(t, e) + "";
          if (ue(t)) return li ? li.call(t) : "";
          var n = t + "";
          return "0" == n && 1 / t == -1 / 0 ? "-0" : n;
        },
        ci = function (e) {
          return null == e ? "" : ui(e);
        },
        di = function (e, t) {
          return Sr(e)
            ? e
            : (function (e, t) {
                if (Sr(e)) return !1;
                var n = typeof e;
                return (
                  !(
                    "number" != n &&
                    "symbol" != n &&
                    "boolean" != n &&
                    null != e &&
                    !ue(e)
                  ) ||
                  Dr.test(e) ||
                  !Pr.test(e) ||
                  (null != t && e in Object(t))
                );
              })(e, t)
            ? [e]
            : ai(ci(e));
        },
        hi = function (e) {
          if ("string" == typeof e || ue(e)) return e;
          var t = e + "";
          return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
        },
        pi = function (e, t, n) {
          var r =
            null == e
              ? void 0
              : (function (e, t) {
                  for (
                    var n = 0, r = (t = di(t, e)).length;
                    null != e && n < r;

                  )
                    e = e[hi(t[n++])];
                  return n && n == r ? e : void 0;
                })(e, t);
          return void 0 === r ? n : r;
        },
        fi = (function () {
          try {
            var e = Fr(Object, "defineProperty");
            return e({}, "", {}), e;
          } catch (e) {}
        })(),
        gi = Object.prototype.hasOwnProperty,
        vi = function (e, t, n) {
          var r = e[t];
          (gi.call(e, t) && Wr(r, n) && (void 0 !== n || t in e)) ||
            (function (e, t, n) {
              "__proto__" == t && fi
                ? fi(e, t, {
                    configurable: !0,
                    enumerable: !0,
                    value: n,
                    writable: !0,
                  })
                : (e[t] = n);
            })(e, t, n);
        },
        yi = /^(?:0|[1-9]\d*)$/,
        mi = function (e, t) {
          var n = typeof e;
          return (
            !!(t = null == t ? 9007199254740991 : t) &&
            ("number" == n || ("symbol" != n && yi.test(e))) &&
            e > -1 &&
            e % 1 == 0 &&
            e < t
          );
        },
        bi = function (e, t, n) {
          return null == e
            ? e
            : (function (e, t, n, r) {
                if (!H(e)) return e;
                for (
                  var i = -1, a = (t = di(t, e)).length, o = a - 1, s = e;
                  null != s && ++i < a;

                ) {
                  var l = hi(t[i]),
                    u = n;
                  if (
                    "__proto__" === l ||
                    "constructor" === l ||
                    "prototype" === l
                  )
                    return e;
                  if (i != o) {
                    var c = s[l];
                    void 0 === (u = r ? r(c, l, s) : void 0) &&
                      (u = H(c) ? c : mi(t[i + 1]) ? [] : {});
                  }
                  vi(s, l, u), (s = s[l]);
                }
                return e;
              })(e, t, n);
        },
        xi = function (e) {
          return Sr(e)
            ? oi(e, hi)
            : ue(e)
            ? [e]
            : (function (e, t) {
                var n = -1,
                  r = e.length;
                for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
                return t;
              })(ai(ci(e)));
        },
        wi = {
          data: function (e) {
            return (
              (e = j(
                {},
                {
                  field: "data",
                  bindingEvent: "data",
                  allowBinding: !1,
                  allowSetting: !1,
                  allowGetting: !1,
                  settingEvent: "data",
                  settingTriggersEvent: !1,
                  triggerFnName: "trigger",
                  immutableKeys: {},
                  updateStyle: !1,
                  beforeGet: function (e) {},
                  beforeSet: function (e, t) {},
                  onSet: function (e) {},
                  canSet: function (e) {
                    return !0;
                  },
                },
                e
              )),
              function (t, n) {
                var r = e,
                  i = this,
                  a = void 0 !== i.length,
                  o = a ? i : [i],
                  l = a ? i[0] : i;
                if (m(t)) {
                  var u,
                    c = -1 !== t.indexOf(".") && xi(t);
                  if (r.allowGetting && void 0 === n)
                    return (
                      l &&
                        (r.beforeGet(l),
                        (u =
                          c && void 0 === l._private[r.field][t]
                            ? pi(l._private[r.field], c)
                            : l._private[r.field][t])),
                      u
                    );
                  if (r.allowSetting && void 0 !== n && !r.immutableKeys[t]) {
                    var d = s({}, t, n);
                    r.beforeSet(i, d);
                    for (var h = 0, p = o.length; h < p; h++) {
                      var f = o[h];
                      r.canSet(f) &&
                        (c && void 0 === l._private[r.field][t]
                          ? bi(f._private[r.field], c, n)
                          : (f._private[r.field][t] = n));
                    }
                    r.updateStyle && i.updateStyle(),
                      r.onSet(i),
                      r.settingTriggersEvent &&
                        i[r.triggerFnName](r.settingEvent);
                  }
                } else if (r.allowSetting && w(t)) {
                  var g,
                    v,
                    y = t,
                    x = Object.keys(y);
                  r.beforeSet(i, y);
                  for (var E = 0; E < x.length; E++)
                    if (((v = y[(g = x[E])]), !r.immutableKeys[g]))
                      for (var C = 0; C < o.length; C++) {
                        var k = o[C];
                        r.canSet(k) && (k._private[r.field][g] = v);
                      }
                  r.updateStyle && i.updateStyle(),
                    r.onSet(i),
                    r.settingTriggersEvent &&
                      i[r.triggerFnName](r.settingEvent);
                } else if (r.allowBinding && b(t)) {
                  var T = t;
                  i.on(r.bindingEvent, T);
                } else if (r.allowGetting && void 0 === t) {
                  var S;
                  return l && (r.beforeGet(l), (S = l._private[r.field])), S;
                }
                return i;
              }
            );
          },
          removeData: function (e) {
            return (
              (e = j(
                {},
                {
                  field: "data",
                  event: "data",
                  triggerFnName: "trigger",
                  triggerEvent: !1,
                  immutableKeys: {},
                },
                e
              )),
              function (t) {
                var n = e,
                  r = this,
                  i = void 0 !== r.length ? r : [r];
                if (m(t)) {
                  for (
                    var a = t.split(/\s+/), o = a.length, s = 0;
                    s < o;
                    s++
                  ) {
                    var l = a[s];
                    if (!_(l) && !n.immutableKeys[l])
                      for (var u = 0, c = i.length; u < c; u++)
                        i[u]._private[n.field][l] = void 0;
                  }
                  n.triggerEvent && r[n.triggerFnName](n.event);
                } else if (void 0 === t) {
                  for (var d = 0, h = i.length; d < h; d++)
                    for (
                      var p = i[d]._private[n.field], f = Object.keys(p), g = 0;
                      g < f.length;
                      g++
                    ) {
                      var v = f[g];
                      !n.immutableKeys[v] && (p[v] = void 0);
                    }
                  n.triggerEvent && r[n.triggerFnName](n.event);
                }
                return r;
              }
            );
          },
        },
        Ei = {
          eventAliasesOn: function (e) {
            var t = e;
            (t.addListener = t.listen = t.bind = t.on),
              (t.unlisten = t.unbind = t.off = t.removeListener),
              (t.trigger = t.emit),
              (t.pon = t.promiseOn =
                function (e, t) {
                  var n = this,
                    r = Array.prototype.slice.call(arguments, 0);
                  return new wr(function (e, t) {
                    var i = r.concat([
                        function (t) {
                          n.off.apply(n, a), e(t);
                        },
                      ]),
                      a = i.concat([]);
                    n.on.apply(n, i);
                  });
                });
          },
        },
        Ci = {};
      [Tr, wi, Ei].forEach(function (e) {
        j(Ci, e);
      });
      var ki = {
          animate: Ci.animate(),
          animation: Ci.animation(),
          animated: Ci.animated(),
          clearQueue: Ci.clearQueue(),
          delay: Ci.delay(),
          delayAnimation: Ci.delayAnimation(),
          stop: Ci.stop(),
        },
        Ti = {
          classes: function (e) {
            var t = this;
            if (void 0 === e) {
              var n = [];
              return (
                t[0]._private.classes.forEach(function (e) {
                  return n.push(e);
                }),
                n
              );
            }
            x(e) || (e = (e || "").match(/\S+/g) || []);
            for (var r = [], i = new tt(e), a = 0; a < t.length; a++) {
              for (
                var o = t[a], s = o._private, l = s.classes, u = !1, c = 0;
                c < e.length;
                c++
              ) {
                var d = e[c];
                if (!l.has(d)) {
                  u = !0;
                  break;
                }
              }
              u || (u = l.size !== e.length), u && ((s.classes = i), r.push(o));
            }
            return r.length > 0 && this.spawn(r).updateStyle().emit("class"), t;
          },
          addClass: function (e) {
            return this.toggleClass(e, !0);
          },
          hasClass: function (e) {
            var t = this[0];
            return null != t && t._private.classes.has(e);
          },
          toggleClass: function (e, t) {
            x(e) || (e = e.match(/\S+/g) || []);
            for (
              var n = this, r = void 0 === t, i = [], a = 0, o = n.length;
              a < o;
              a++
            )
              for (
                var s = n[a], l = s._private.classes, u = !1, c = 0;
                c < e.length;
                c++
              ) {
                var d = e[c],
                  h = l.has(d),
                  p = !1;
                t || (r && !h)
                  ? (l.add(d), (p = !0))
                  : (!t || (r && h)) && (l.delete(d), (p = !0)),
                  !u && p && (i.push(s), (u = !0));
              }
            return i.length > 0 && this.spawn(i).updateStyle().emit("class"), n;
          },
          removeClass: function (e) {
            return this.toggleClass(e, !1);
          },
          flashClass: function (e, t) {
            var n = this;
            if (null == t) t = 250;
            else if (0 === t) return n;
            return (
              n.addClass(e),
              setTimeout(function () {
                n.removeClass(e);
              }, t),
              n
            );
          },
        };
      Ti.className = Ti.classNames = Ti.classes;
      var Si = {
        metaChar:
          "[\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\`\\{\\|\\}\\~]",
        comparatorOp: "=|\\!=|>|>=|<|<=|\\$=|\\^=|\\*=",
        boolOp: "\\?|\\!|\\^",
        string: "\"(?:\\\\\"|[^\"])*\"|'(?:\\\\'|[^'])*'",
        number: O,
        meta: "degree|indegree|outdegree",
        separator: "\\s*,\\s*",
        descendant: "\\s+",
        child: "\\s+>\\s+",
        subject: "\\$",
        group: "node|edge|\\*",
        directedEdge: "\\s+->\\s+",
        undirectedEdge: "\\s+<->\\s+",
      };
      (Si.variable = "(?:[\\w-.]|(?:\\\\" + Si.metaChar + "))+"),
        (Si.className = "(?:[\\w-]|(?:\\\\" + Si.metaChar + "))+"),
        (Si.value = Si.string + "|" + Si.number),
        (Si.id = Si.variable),
        (function () {
          var e, t, n;
          for (e = Si.comparatorOp.split("|"), n = 0; n < e.length; n++)
            (t = e[n]), (Si.comparatorOp += "|@" + t);
          for (e = Si.comparatorOp.split("|"), n = 0; n < e.length; n++)
            (t = e[n]).indexOf("!") >= 0 ||
              ("=" !== t && (Si.comparatorOp += "|\\!" + t));
        })();
      var Pi = 20,
        Di = [
          {
            selector: ":selected",
            matches: function (e) {
              return e.selected();
            },
          },
          {
            selector: ":unselected",
            matches: function (e) {
              return !e.selected();
            },
          },
          {
            selector: ":selectable",
            matches: function (e) {
              return e.selectable();
            },
          },
          {
            selector: ":unselectable",
            matches: function (e) {
              return !e.selectable();
            },
          },
          {
            selector: ":locked",
            matches: function (e) {
              return e.locked();
            },
          },
          {
            selector: ":unlocked",
            matches: function (e) {
              return !e.locked();
            },
          },
          {
            selector: ":visible",
            matches: function (e) {
              return e.visible();
            },
          },
          {
            selector: ":hidden",
            matches: function (e) {
              return !e.visible();
            },
          },
          {
            selector: ":transparent",
            matches: function (e) {
              return e.transparent();
            },
          },
          {
            selector: ":grabbed",
            matches: function (e) {
              return e.grabbed();
            },
          },
          {
            selector: ":free",
            matches: function (e) {
              return !e.grabbed();
            },
          },
          {
            selector: ":removed",
            matches: function (e) {
              return e.removed();
            },
          },
          {
            selector: ":inside",
            matches: function (e) {
              return !e.removed();
            },
          },
          {
            selector: ":grabbable",
            matches: function (e) {
              return e.grabbable();
            },
          },
          {
            selector: ":ungrabbable",
            matches: function (e) {
              return !e.grabbable();
            },
          },
          {
            selector: ":animated",
            matches: function (e) {
              return e.animated();
            },
          },
          {
            selector: ":unanimated",
            matches: function (e) {
              return !e.animated();
            },
          },
          {
            selector: ":parent",
            matches: function (e) {
              return e.isParent();
            },
          },
          {
            selector: ":childless",
            matches: function (e) {
              return e.isChildless();
            },
          },
          {
            selector: ":child",
            matches: function (e) {
              return e.isChild();
            },
          },
          {
            selector: ":orphan",
            matches: function (e) {
              return e.isOrphan();
            },
          },
          {
            selector: ":nonorphan",
            matches: function (e) {
              return e.isChild();
            },
          },
          {
            selector: ":compound",
            matches: function (e) {
              return e.isNode()
                ? e.isParent()
                : e.source().isParent() || e.target().isParent();
            },
          },
          {
            selector: ":loop",
            matches: function (e) {
              return e.isLoop();
            },
          },
          {
            selector: ":simple",
            matches: function (e) {
              return e.isSimple();
            },
          },
          {
            selector: ":active",
            matches: function (e) {
              return e.active();
            },
          },
          {
            selector: ":inactive",
            matches: function (e) {
              return !e.active();
            },
          },
          {
            selector: ":backgrounding",
            matches: function (e) {
              return e.backgrounding();
            },
          },
          {
            selector: ":nonbackgrounding",
            matches: function (e) {
              return !e.backgrounding();
            },
          },
        ].sort(function (e, t) {
          return (function (e, t) {
            return -1 * q(e, t);
          })(e.selector, t.selector);
        }),
        _i = (function () {
          for (var e, t = {}, n = 0; n < Di.length; n++)
            t[(e = Di[n]).selector] = e.matches;
          return t;
        })(),
        Mi =
          "(" +
          Di.map(function (e) {
            return e.selector;
          }).join("|") +
          ")",
        Ni = function (e) {
          return e.replace(
            new RegExp("\\\\(" + Si.metaChar + ")", "g"),
            function (e, t) {
              return t;
            }
          );
        },
        Ii = function (e, t, n) {
          e[e.length - 1] = n;
        },
        Bi = [
          {
            name: "group",
            query: !0,
            regex: "(" + Si.group + ")",
            populate: function (e, t, n) {
              var r = l(n, 1)[0];
              t.checks.push({ type: 0, value: "*" === r ? r : r + "s" });
            },
          },
          {
            name: "state",
            query: !0,
            regex: Mi,
            populate: function (e, t, n) {
              var r = l(n, 1)[0];
              t.checks.push({ type: 7, value: r });
            },
          },
          {
            name: "id",
            query: !0,
            regex: "\\#(" + Si.id + ")",
            populate: function (e, t, n) {
              var r = l(n, 1)[0];
              t.checks.push({ type: 8, value: Ni(r) });
            },
          },
          {
            name: "className",
            query: !0,
            regex: "\\.(" + Si.className + ")",
            populate: function (e, t, n) {
              var r = l(n, 1)[0];
              t.checks.push({ type: 9, value: Ni(r) });
            },
          },
          {
            name: "dataExists",
            query: !0,
            regex: "\\[\\s*(" + Si.variable + ")\\s*\\]",
            populate: function (e, t, n) {
              var r = l(n, 1)[0];
              t.checks.push({ type: 4, field: Ni(r) });
            },
          },
          {
            name: "dataCompare",
            query: !0,
            regex:
              "\\[\\s*(" +
              Si.variable +
              ")\\s*(" +
              Si.comparatorOp +
              ")\\s*(" +
              Si.value +
              ")\\s*\\]",
            populate: function (e, t, n) {
              var r = l(n, 3),
                i = r[0],
                a = r[1],
                o = r[2];
              (o =
                null != new RegExp("^" + Si.string + "$").exec(o)
                  ? o.substring(1, o.length - 1)
                  : parseFloat(o)),
                t.checks.push({ type: 3, field: Ni(i), operator: a, value: o });
            },
          },
          {
            name: "dataBool",
            query: !0,
            regex: "\\[\\s*(" + Si.boolOp + ")\\s*(" + Si.variable + ")\\s*\\]",
            populate: function (e, t, n) {
              var r = l(n, 2),
                i = r[0],
                a = r[1];
              t.checks.push({ type: 5, field: Ni(a), operator: i });
            },
          },
          {
            name: "metaCompare",
            query: !0,
            regex:
              "\\[\\[\\s*(" +
              Si.meta +
              ")\\s*(" +
              Si.comparatorOp +
              ")\\s*(" +
              Si.number +
              ")\\s*\\]\\]",
            populate: function (e, t, n) {
              var r = l(n, 3),
                i = r[0],
                a = r[1],
                o = r[2];
              t.checks.push({
                type: 6,
                field: Ni(i),
                operator: a,
                value: parseFloat(o),
              });
            },
          },
          {
            name: "nextQuery",
            separator: !0,
            regex: Si.separator,
            populate: function (e, t) {
              var n = e.currentSubject,
                r = e.edgeCount,
                i = e.compoundCount,
                a = e[e.length - 1];
              return (
                null != n && ((a.subject = n), (e.currentSubject = null)),
                (a.edgeCount = r),
                (a.compoundCount = i),
                (e.edgeCount = 0),
                (e.compoundCount = 0),
                (e[e.length++] = { checks: [] })
              );
            },
          },
          {
            name: "directedEdge",
            separator: !0,
            regex: Si.directedEdge,
            populate: function (e, t) {
              if (null == e.currentSubject) {
                var n = { checks: [] },
                  r = t,
                  i = { checks: [] };
                return (
                  n.checks.push({ type: 11, source: r, target: i }),
                  Ii(e, 0, n),
                  e.edgeCount++,
                  i
                );
              }
              var a = { checks: [] },
                o = t,
                s = { checks: [] };
              return (
                a.checks.push({ type: 12, source: o, target: s }),
                Ii(e, 0, a),
                e.edgeCount++,
                s
              );
            },
          },
          {
            name: "undirectedEdge",
            separator: !0,
            regex: Si.undirectedEdge,
            populate: function (e, t) {
              if (null == e.currentSubject) {
                var n = { checks: [] },
                  r = t,
                  i = { checks: [] };
                return (
                  n.checks.push({ type: 10, nodes: [r, i] }),
                  Ii(e, 0, n),
                  e.edgeCount++,
                  i
                );
              }
              var a = { checks: [] },
                o = t,
                s = { checks: [] };
              return (
                a.checks.push({ type: 14, node: o, neighbor: s }),
                Ii(e, 0, a),
                s
              );
            },
          },
          {
            name: "child",
            separator: !0,
            regex: Si.child,
            populate: function (e, t) {
              if (null == e.currentSubject) {
                var n = { checks: [] },
                  r = { checks: [] },
                  i = e[e.length - 1];
                return (
                  n.checks.push({ type: 15, parent: i, child: r }),
                  Ii(e, 0, n),
                  e.compoundCount++,
                  r
                );
              }
              if (e.currentSubject === t) {
                var a = { checks: [] },
                  o = e[e.length - 1],
                  s = { checks: [] },
                  l = { checks: [] },
                  u = { checks: [] },
                  c = { checks: [] };
                return (
                  a.checks.push({ type: 19, left: o, right: s, subject: l }),
                  (l.checks = t.checks),
                  (t.checks = [{ type: Pi }]),
                  c.checks.push({ type: Pi }),
                  s.checks.push({ type: 17, parent: c, child: u }),
                  Ii(e, 0, a),
                  (e.currentSubject = l),
                  e.compoundCount++,
                  u
                );
              }
              var d = { checks: [] },
                h = { checks: [] },
                p = [{ type: 17, parent: d, child: h }];
              return (
                (d.checks = t.checks), (t.checks = p), e.compoundCount++, h
              );
            },
          },
          {
            name: "descendant",
            separator: !0,
            regex: Si.descendant,
            populate: function (e, t) {
              if (null == e.currentSubject) {
                var n = { checks: [] },
                  r = { checks: [] },
                  i = e[e.length - 1];
                return (
                  n.checks.push({ type: 16, ancestor: i, descendant: r }),
                  Ii(e, 0, n),
                  e.compoundCount++,
                  r
                );
              }
              if (e.currentSubject === t) {
                var a = { checks: [] },
                  o = e[e.length - 1],
                  s = { checks: [] },
                  l = { checks: [] },
                  u = { checks: [] },
                  c = { checks: [] };
                return (
                  a.checks.push({ type: 19, left: o, right: s, subject: l }),
                  (l.checks = t.checks),
                  (t.checks = [{ type: Pi }]),
                  c.checks.push({ type: Pi }),
                  s.checks.push({ type: 18, ancestor: c, descendant: u }),
                  Ii(e, 0, a),
                  (e.currentSubject = l),
                  e.compoundCount++,
                  u
                );
              }
              var d = { checks: [] },
                h = { checks: [] },
                p = [{ type: 18, ancestor: d, descendant: h }];
              return (
                (d.checks = t.checks), (t.checks = p), e.compoundCount++, h
              );
            },
          },
          {
            name: "subject",
            modifier: !0,
            regex: Si.subject,
            populate: function (e, t) {
              if (null != e.currentSubject && e.currentSubject !== t)
                return (
                  Ye(
                    "Redefinition of subject in selector `" + e.toString() + "`"
                  ),
                  !1
                );
              e.currentSubject = t;
              var n = e[e.length - 1].checks[0],
                r = null == n ? null : n.type;
              11 === r
                ? (n.type = 13)
                : 10 === r &&
                  ((n.type = 14),
                  (n.node = n.nodes[1]),
                  (n.neighbor = n.nodes[0]),
                  (n.nodes = null));
            },
          },
        ];
      Bi.forEach(function (e) {
        return (e.regexObj = new RegExp("^" + e.regex));
      });
      var Ai = function (e) {
          for (var t, n, r, i = 0; i < Bi.length; i++) {
            var a = Bi[i],
              o = a.name,
              s = e.match(a.regexObj);
            if (null != s) {
              (n = s), (t = a), (r = o);
              var l = s[0];
              e = e.substring(l.length);
              break;
            }
          }
          return { expr: t, match: n, name: r, remaining: e };
        },
        Li = {
          parse: function (e) {
            var t = this,
              n = (t.inputText = e),
              r = (t[0] = { checks: [] });
            for (
              t.length = 1,
                n = (function (e) {
                  var t = e.match(/^\s+/);
                  if (t) {
                    var n = t[0];
                    e = e.substring(n.length);
                  }
                  return e;
                })(n);
              ;

            ) {
              var i = Ai(n);
              if (null == i.expr)
                return Ye("The selector `" + e + "`is invalid"), !1;
              var a = i.match.slice(1),
                o = i.expr.populate(t, r, a);
              if (!1 === o) return !1;
              if ((null != o && (r = o), (n = i.remaining).match(/^\s*$/)))
                break;
            }
            var s = t[t.length - 1];
            null != t.currentSubject && (s.subject = t.currentSubject),
              (s.edgeCount = t.edgeCount),
              (s.compoundCount = t.compoundCount);
            for (var l = 0; l < t.length; l++) {
              var u = t[l];
              if (u.compoundCount > 0 && u.edgeCount > 0)
                return (
                  Ye(
                    "The selector `" +
                      e +
                      "` is invalid because it uses both a compound selector and an edge selector"
                  ),
                  !1
                );
              if (u.edgeCount > 1)
                return (
                  Ye(
                    "The selector `" +
                      e +
                      "` is invalid because it uses multiple edge selectors"
                  ),
                  !1
                );
              1 === u.edgeCount &&
                Ye(
                  "The selector `" +
                    e +
                    "` is deprecated.  Edge selectors do not take effect on changes to source and target nodes after an edge is added, for performance reasons.  Use a class or data selector on edges instead, updating the class or data of an edge when your app detects a change in source or target nodes."
                );
            }
            return !0;
          },
          toString: function () {
            if (null != this.toStringCache) return this.toStringCache;
            for (
              var e = function (e) {
                  return null == e ? "" : e;
                },
                t = function (t) {
                  return m(t) ? '"' + t + '"' : e(t);
                },
                n = function (e) {
                  return " " + e + " ";
                },
                r = function (i, a) {
                  return i.checks.reduce(function (o, s, l) {
                    return (
                      o +
                      (a === i && 0 === l ? "$" : "") +
                      (function (i, a) {
                        var o = i.type,
                          s = i.value;
                        switch (o) {
                          case 0:
                            var l = e(s);
                            return l.substring(0, l.length - 1);
                          case 3:
                            var u = i.field,
                              c = i.operator;
                            return "[" + u + n(e(c)) + t(s) + "]";
                          case 5:
                            var d = i.operator,
                              h = i.field;
                            return "[" + e(d) + h + "]";
                          case 4:
                            return "[" + i.field + "]";
                          case 6:
                            var p = i.operator;
                            return "[[" + i.field + n(e(p)) + t(s) + "]]";
                          case 7:
                            return s;
                          case 8:
                            return "#" + s;
                          case 9:
                            return "." + s;
                          case 17:
                          case 15:
                            return r(i.parent, a) + n(">") + r(i.child, a);
                          case 18:
                          case 16:
                            return r(i.ancestor, a) + " " + r(i.descendant, a);
                          case 19:
                            var f = r(i.left, a),
                              g = r(i.subject, a),
                              v = r(i.right, a);
                            return f + (f.length > 0 ? " " : "") + g + v;
                          case Pi:
                            return "";
                        }
                      })(s, a)
                    );
                  }, "");
                },
                i = "",
                a = 0;
              a < this.length;
              a++
            ) {
              var o = this[a];
              (i += r(o, o.subject)),
                this.length > 1 && a < this.length - 1 && (i += ", ");
            }
            return (this.toStringCache = i), i;
          },
        },
        Oi = function (e, t, n) {
          var r,
            i,
            a,
            o = m(e),
            s = E(e),
            l = m(n),
            u = !1,
            c = !1,
            d = !1;
          switch (
            (t.indexOf("!") >= 0 && ((t = t.replace("!", "")), (c = !0)),
            t.indexOf("@") >= 0 && ((t = t.replace("@", "")), (u = !0)),
            (o || l || u) && ((i = o || s ? "" + e : ""), (a = "" + n)),
            u && ((e = i = i.toLowerCase()), (n = a = a.toLowerCase())),
            t)
          ) {
            case "*=":
              r = i.indexOf(a) >= 0;
              break;
            case "$=":
              r = i.indexOf(a, i.length - a.length) >= 0;
              break;
            case "^=":
              r = 0 === i.indexOf(a);
              break;
            case "=":
              r = e === n;
              break;
            case ">":
              (d = !0), (r = e > n);
              break;
            case ">=":
              (d = !0), (r = e >= n);
              break;
            case "<":
              (d = !0), (r = e < n);
              break;
            case "<=":
              (d = !0), (r = e <= n);
              break;
            default:
              r = !1;
          }
          return !c || (null == e && d) || (r = !r), r;
        },
        Ri = function (e, t) {
          return e.data(t);
        },
        zi = [],
        Fi = function (e, t) {
          return e.checks.every(function (e) {
            return zi[e.type](e, t);
          });
        };
      (zi[0] = function (e, t) {
        var n = e.value;
        return "*" === n || n === t.group();
      }),
        (zi[7] = function (e, t) {
          return (function (e, t) {
            return _i[e](t);
          })(e.value, t);
        }),
        (zi[8] = function (e, t) {
          var n = e.value;
          return t.id() === n;
        }),
        (zi[9] = function (e, t) {
          var n = e.value;
          return t.hasClass(n);
        }),
        (zi[6] = function (e, t) {
          var n = e.field,
            r = e.operator,
            i = e.value;
          return Oi(
            (function (e, t) {
              return e[t]();
            })(t, n),
            r,
            i
          );
        }),
        (zi[3] = function (e, t) {
          var n = e.field,
            r = e.operator,
            i = e.value;
          return Oi(Ri(t, n), r, i);
        }),
        (zi[5] = function (e, t) {
          var n = e.field,
            r = e.operator;
          return (function (e, t) {
            switch (t) {
              case "?":
                return !!e;
              case "!":
                return !e;
              case "^":
                return void 0 === e;
            }
          })(Ri(t, n), r);
        }),
        (zi[4] = function (e, t) {
          var n = e.field;
          return e.operator, void 0 !== Ri(t, n);
        }),
        (zi[10] = function (e, t) {
          var n = e.nodes[0],
            r = e.nodes[1],
            i = t.source(),
            a = t.target();
          return (Fi(n, i) && Fi(r, a)) || (Fi(r, i) && Fi(n, a));
        }),
        (zi[14] = function (e, t) {
          return (
            Fi(e.node, t) &&
            t.neighborhood().some(function (t) {
              return t.isNode() && Fi(e.neighbor, t);
            })
          );
        }),
        (zi[11] = function (e, t) {
          return Fi(e.source, t.source()) && Fi(e.target, t.target());
        }),
        (zi[12] = function (e, t) {
          return (
            Fi(e.source, t) &&
            t.outgoers().some(function (t) {
              return t.isNode() && Fi(e.target, t);
            })
          );
        }),
        (zi[13] = function (e, t) {
          return (
            Fi(e.target, t) &&
            t.incomers().some(function (t) {
              return t.isNode() && Fi(e.source, t);
            })
          );
        }),
        (zi[15] = function (e, t) {
          return Fi(e.child, t) && Fi(e.parent, t.parent());
        }),
        (zi[17] = function (e, t) {
          return (
            Fi(e.parent, t) &&
            t.children().some(function (t) {
              return Fi(e.child, t);
            })
          );
        }),
        (zi[16] = function (e, t) {
          return (
            Fi(e.descendant, t) &&
            t.ancestors().some(function (t) {
              return Fi(e.ancestor, t);
            })
          );
        }),
        (zi[18] = function (e, t) {
          return (
            Fi(e.ancestor, t) &&
            t.descendants().some(function (t) {
              return Fi(e.descendant, t);
            })
          );
        }),
        (zi[19] = function (e, t) {
          return Fi(e.subject, t) && Fi(e.left, t) && Fi(e.right, t);
        }),
        (zi[20] = function () {
          return !0;
        }),
        (zi[1] = function (e, t) {
          return e.value.has(t);
        }),
        (zi[2] = function (e, t) {
          return (0, e.value)(t);
        });
      var Vi = {
          matches: function (e) {
            for (var t = 0; t < this.length; t++) {
              var n = this[t];
              if (Fi(n, e)) return !0;
            }
            return !1;
          },
          filter: function (e) {
            var t = this;
            if (
              1 === t.length &&
              1 === t[0].checks.length &&
              8 === t[0].checks[0].type
            )
              return e.getElementById(t[0].checks[0].value).collection();
            var n = function (e) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                if (Fi(r, e)) return !0;
              }
              return !1;
            };
            return (
              null == t.text() &&
                (n = function () {
                  return !0;
                }),
              e.filter(n)
            );
          },
        },
        qi = function (e) {
          (this.inputText = e),
            (this.currentSubject = null),
            (this.compoundCount = 0),
            (this.edgeCount = 0),
            (this.length = 0),
            null == e ||
              (m(e) && e.match(/^\s*$/)) ||
              (k(e)
                ? this.addQuery({
                    checks: [{ type: 1, value: e.collection() }],
                  })
                : b(e)
                ? this.addQuery({ checks: [{ type: 2, value: e }] })
                : m(e)
                ? this.parse(e) || (this.invalid = !0)
                : qe("A selector must be created from a string; found "));
        },
        ji = qi.prototype;
      [Li, Vi].forEach(function (e) {
        return j(ji, e);
      }),
        (ji.text = function () {
          return this.inputText;
        }),
        (ji.size = function () {
          return this.length;
        }),
        (ji.eq = function (e) {
          return this[e];
        }),
        (ji.sameText = function (e) {
          return !this.invalid && !e.invalid && this.text() === e.text();
        }),
        (ji.addQuery = function (e) {
          this[this.length++] = e;
        }),
        (ji.selector = ji.toString);
      var Yi = {
        allAre: function (e) {
          var t = new qi(e);
          return this.every(function (e) {
            return t.matches(e);
          });
        },
        is: function (e) {
          var t = new qi(e);
          return this.some(function (e) {
            return t.matches(e);
          });
        },
        some: function (e, t) {
          for (var n = 0; n < this.length; n++)
            if (t ? e.apply(t, [this[n], n, this]) : e(this[n], n, this))
              return !0;
          return !1;
        },
        every: function (e, t) {
          for (var n = 0; n < this.length; n++)
            if (!(t ? e.apply(t, [this[n], n, this]) : e(this[n], n, this)))
              return !1;
          return !0;
        },
        same: function (e) {
          if (this === e) return !0;
          e = this.cy().collection(e);
          var t = this.length;
          return (
            t === e.length &&
            (1 === t
              ? this[0] === e[0]
              : this.every(function (t) {
                  return e.hasElementWithId(t.id());
                }))
          );
        },
        anySame: function (e) {
          return (
            (e = this.cy().collection(e)),
            this.some(function (t) {
              return e.hasElementWithId(t.id());
            })
          );
        },
        allAreNeighbors: function (e) {
          e = this.cy().collection(e);
          var t = this.neighborhood();
          return e.every(function (e) {
            return t.hasElementWithId(e.id());
          });
        },
        contains: function (e) {
          e = this.cy().collection(e);
          var t = this;
          return e.every(function (e) {
            return t.hasElementWithId(e.id());
          });
        },
      };
      (Yi.allAreNeighbours = Yi.allAreNeighbors),
        (Yi.has = Yi.contains),
        (Yi.equal = Yi.equals = Yi.same);
      var Xi,
        Wi,
        Hi = function (e, t) {
          return function (n, r, i, a) {
            var o,
              s = n,
              l = this;
            if (
              (null == s ? (o = "") : k(s) && 1 === s.length && (o = s.id()),
              1 === l.length && o)
            ) {
              var u = l[0]._private,
                c = (u.traversalCache = u.traversalCache || {}),
                d = (c[t] = c[t] || []),
                h = Me(o);
              return d[h] || (d[h] = e.call(l, n, r, i, a));
            }
            return e.call(l, n, r, i, a);
          };
        },
        Gi = {
          parent: function (e) {
            var t = [];
            if (1 === this.length) {
              var n = this[0]._private.parent;
              if (n) return n;
            }
            for (var r = 0; r < this.length; r++) {
              var i = this[r]._private.parent;
              i && t.push(i);
            }
            return this.spawn(t, !0).filter(e);
          },
          parents: function (e) {
            for (var t = [], n = this.parent(); n.nonempty(); ) {
              for (var r = 0; r < n.length; r++) {
                var i = n[r];
                t.push(i);
              }
              n = n.parent();
            }
            return this.spawn(t, !0).filter(e);
          },
          commonAncestors: function (e) {
            for (var t, n = 0; n < this.length; n++) {
              var r = this[n].parents();
              t = (t = t || r).intersect(r);
            }
            return t.filter(e);
          },
          orphans: function (e) {
            return this.stdFilter(function (e) {
              return e.isOrphan();
            }).filter(e);
          },
          nonorphans: function (e) {
            return this.stdFilter(function (e) {
              return e.isChild();
            }).filter(e);
          },
          children: Hi(function (e) {
            for (var t = [], n = 0; n < this.length; n++)
              for (var r = this[n]._private.children, i = 0; i < r.length; i++)
                t.push(r[i]);
            return this.spawn(t, !0).filter(e);
          }, "children"),
          siblings: function (e) {
            return this.parent().children().not(this).filter(e);
          },
          isParent: function () {
            var e = this[0];
            if (e) return e.isNode() && 0 !== e._private.children.length;
          },
          isChildless: function () {
            var e = this[0];
            if (e) return e.isNode() && 0 === e._private.children.length;
          },
          isChild: function () {
            var e = this[0];
            if (e) return e.isNode() && null != e._private.parent;
          },
          isOrphan: function () {
            var e = this[0];
            if (e) return e.isNode() && null == e._private.parent;
          },
          descendants: function (e) {
            var t = [];
            return (
              (function e(n) {
                for (var r = 0; r < n.length; r++) {
                  var i = n[r];
                  t.push(i), i.children().nonempty() && e(i.children());
                }
              })(this.children()),
              this.spawn(t, !0).filter(e)
            );
          },
        };
      function Ui(e, t, n, r) {
        for (
          var i = [], a = new tt(), o = e.cy().hasCompoundNodes(), s = 0;
          s < e.length;
          s++
        ) {
          var l = e[s];
          n ? i.push(l) : o && r(i, a, l);
        }
        for (; i.length > 0; ) {
          var u = i.shift();
          t(u), a.add(u.id()), o && r(i, a, u);
        }
        return e;
      }
      function Ki(e, t, n) {
        if (n.isParent())
          for (var r = n._private.children, i = 0; i < r.length; i++) {
            var a = r[i];
            t.has(a.id()) || e.push(a);
          }
      }
      function Zi(e, t, n) {
        if (n.isChild()) {
          var r = n._private.parent;
          t.has(r.id()) || e.push(r);
        }
      }
      function $i(e, t, n) {
        Zi(e, t, n), Ki(e, t, n);
      }
      (Gi.forEachDown = function (e) {
        return Ui(
          this,
          e,
          !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
          Ki
        );
      }),
        (Gi.forEachUp = function (e) {
          return Ui(
            this,
            e,
            !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            Zi
          );
        }),
        (Gi.forEachUpAndDown = function (e) {
          return Ui(
            this,
            e,
            !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            $i
          );
        }),
        (Gi.ancestors = Gi.parents),
        ((Xi = Wi =
          {
            data: Ci.data({
              field: "data",
              bindingEvent: "data",
              allowBinding: !0,
              allowSetting: !0,
              settingEvent: "data",
              settingTriggersEvent: !0,
              triggerFnName: "trigger",
              allowGetting: !0,
              immutableKeys: { id: !0, source: !0, target: !0, parent: !0 },
              updateStyle: !0,
            }),
            removeData: Ci.removeData({
              field: "data",
              event: "data",
              triggerFnName: "trigger",
              triggerEvent: !0,
              immutableKeys: { id: !0, source: !0, target: !0, parent: !0 },
              updateStyle: !0,
            }),
            scratch: Ci.data({
              field: "scratch",
              bindingEvent: "scratch",
              allowBinding: !0,
              allowSetting: !0,
              settingEvent: "scratch",
              settingTriggersEvent: !0,
              triggerFnName: "trigger",
              allowGetting: !0,
              updateStyle: !0,
            }),
            removeScratch: Ci.removeData({
              field: "scratch",
              event: "scratch",
              triggerFnName: "trigger",
              triggerEvent: !0,
              updateStyle: !0,
            }),
            rscratch: Ci.data({
              field: "rscratch",
              allowBinding: !1,
              allowSetting: !0,
              settingTriggersEvent: !1,
              allowGetting: !0,
            }),
            removeRscratch: Ci.removeData({
              field: "rscratch",
              triggerEvent: !1,
            }),
            id: function () {
              var e = this[0];
              if (e) return e._private.data.id;
            },
          }).attr = Xi.data),
        (Xi.removeAttr = Xi.removeData);
      var Qi,
        Ji,
        ea = Wi,
        ta = {};
      function na(e) {
        return function (t) {
          var n = this;
          if (
            (void 0 === t && (t = !0),
            0 !== n.length && n.isNode() && !n.removed())
          ) {
            for (
              var r = 0, i = n[0], a = i._private.edges, o = 0;
              o < a.length;
              o++
            ) {
              var s = a[o];
              (!t && s.isLoop()) || (r += e(i, s));
            }
            return r;
          }
        };
      }
      function ra(e, t) {
        return function (n) {
          for (var r, i = this.nodes(), a = 0; a < i.length; a++) {
            var o = i[a][e](n);
            void 0 === o || (void 0 !== r && !t(o, r)) || (r = o);
          }
          return r;
        };
      }
      j(ta, {
        degree: na(function (e, t) {
          return t.source().same(t.target()) ? 2 : 1;
        }),
        indegree: na(function (e, t) {
          return t.target().same(e) ? 1 : 0;
        }),
        outdegree: na(function (e, t) {
          return t.source().same(e) ? 1 : 0;
        }),
      }),
        j(ta, {
          minDegree: ra("degree", function (e, t) {
            return e < t;
          }),
          maxDegree: ra("degree", function (e, t) {
            return e > t;
          }),
          minIndegree: ra("indegree", function (e, t) {
            return e < t;
          }),
          maxIndegree: ra("indegree", function (e, t) {
            return e > t;
          }),
          minOutdegree: ra("outdegree", function (e, t) {
            return e < t;
          }),
          maxOutdegree: ra("outdegree", function (e, t) {
            return e > t;
          }),
        }),
        j(ta, {
          totalDegree: function (e) {
            for (var t = 0, n = this.nodes(), r = 0; r < n.length; r++)
              t += n[r].degree(e);
            return t;
          },
        });
      var ia = function (e, t, n) {
          for (var r = 0; r < e.length; r++) {
            var i = e[r];
            if (!i.locked()) {
              var a = i._private.position,
                o = {
                  x: null != t.x ? t.x - a.x : 0,
                  y: null != t.y ? t.y - a.y : 0,
                };
              !i.isParent() ||
                (0 === o.x && 0 === o.y) ||
                i.children().shift(o, n),
                i.dirtyBoundingBoxCache();
            }
          }
        },
        aa = {
          field: "position",
          bindingEvent: "position",
          allowBinding: !0,
          allowSetting: !0,
          settingEvent: "position",
          settingTriggersEvent: !0,
          triggerFnName: "emitAndNotify",
          allowGetting: !0,
          validKeys: ["x", "y"],
          beforeGet: function (e) {
            e.updateCompoundBounds();
          },
          beforeSet: function (e, t) {
            ia(e, t, !1);
          },
          onSet: function (e) {
            e.dirtyCompoundBoundsCache();
          },
          canSet: function (e) {
            return !e.locked();
          },
        };
      (Qi = Ji =
        {
          position: Ci.data(aa),
          silentPosition: Ci.data(
            j({}, aa, {
              allowBinding: !1,
              allowSetting: !0,
              settingTriggersEvent: !1,
              allowGetting: !1,
              beforeSet: function (e, t) {
                ia(e, t, !0);
              },
              onSet: function (e) {
                e.dirtyCompoundBoundsCache();
              },
            })
          ),
          positions: function (e, t) {
            if (w(e)) t ? this.silentPosition(e) : this.position(e);
            else if (b(e)) {
              var n = e,
                r = this.cy();
              r.startBatch();
              for (var i = 0; i < this.length; i++) {
                var a,
                  o = this[i];
                (a = n(o, i)) && (t ? o.silentPosition(a) : o.position(a));
              }
              r.endBatch();
            }
            return this;
          },
          silentPositions: function (e) {
            return this.positions(e, !0);
          },
          shift: function (e, t, n) {
            var r;
            if (
              (w(e)
                ? ((r = { x: E(e.x) ? e.x : 0, y: E(e.y) ? e.y : 0 }), (n = t))
                : m(e) && E(t) && ((r = { x: 0, y: 0 })[e] = t),
              null != r)
            ) {
              var i = this.cy();
              i.startBatch();
              for (var a = 0; a < this.length; a++) {
                var o = this[a];
                if (
                  !(
                    i.hasCompoundNodes() &&
                    o.isChild() &&
                    o.ancestors().anySame(this)
                  )
                ) {
                  var s = o.position(),
                    l = { x: s.x + r.x, y: s.y + r.y };
                  n ? o.silentPosition(l) : o.position(l);
                }
              }
              i.endBatch();
            }
            return this;
          },
          silentShift: function (e, t) {
            return (
              w(e) ? this.shift(e, !0) : m(e) && E(t) && this.shift(e, t, !0),
              this
            );
          },
          renderedPosition: function (e, t) {
            var n = this[0],
              r = this.cy(),
              i = r.zoom(),
              a = r.pan(),
              o = w(e) ? e : void 0,
              s = void 0 !== o || (void 0 !== t && m(e));
            if (n && n.isNode()) {
              if (!s) {
                var l = n.position();
                return (o = wt(l, i, a)), void 0 === e ? o : o[e];
              }
              for (var u = 0; u < this.length; u++) {
                var c = this[u];
                void 0 !== t
                  ? c.position(e, (t - a[e]) / i)
                  : void 0 !== o && c.position(Et(o, i, a));
              }
            } else if (!s) return;
            return this;
          },
          relativePosition: function (e, t) {
            var n = this[0],
              r = this.cy(),
              i = w(e) ? e : void 0,
              a = void 0 !== i || (void 0 !== t && m(e)),
              o = r.hasCompoundNodes();
            if (n && n.isNode()) {
              if (!a) {
                var s = n.position(),
                  l = o ? n.parent() : null,
                  u = l && l.length > 0,
                  c = u;
                u && (l = l[0]);
                var d = c ? l.position() : { x: 0, y: 0 };
                return (
                  (i = { x: s.x - d.x, y: s.y - d.y }), void 0 === e ? i : i[e]
                );
              }
              for (var h = 0; h < this.length; h++) {
                var p = this[h],
                  f = o ? p.parent() : null,
                  g = f && f.length > 0,
                  v = g;
                g && (f = f[0]);
                var y = v ? f.position() : { x: 0, y: 0 };
                void 0 !== t
                  ? p.position(e, t + y[e])
                  : void 0 !== i && p.position({ x: i.x + y.x, y: i.y + y.y });
              }
            } else if (!a) return;
            return this;
          },
        }),
        (Qi.modelPosition = Qi.point = Qi.position),
        (Qi.modelPositions = Qi.points = Qi.positions),
        (Qi.renderedPoint = Qi.renderedPosition),
        (Qi.relativePoint = Qi.relativePosition);
      var oa,
        sa,
        la = Ji;
      (oa = sa = {}),
        (sa.renderedBoundingBox = function (e) {
          var t = this.boundingBox(e),
            n = this.cy(),
            r = n.zoom(),
            i = n.pan(),
            a = t.x1 * r + i.x,
            o = t.x2 * r + i.x,
            s = t.y1 * r + i.y,
            l = t.y2 * r + i.y;
          return { x1: a, x2: o, y1: s, y2: l, w: o - a, h: l - s };
        }),
        (sa.dirtyCompoundBoundsCache = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = this.cy();
          return t.styleEnabled() && t.hasCompoundNodes()
            ? (this.forEachUp(function (t) {
                if (t.isParent()) {
                  var n = t._private;
                  (n.compoundBoundsClean = !1),
                    (n.bbCache = null),
                    e || t.emitAndNotify("bounds");
                }
              }),
              this)
            : this;
        }),
        (sa.updateCompoundBounds = function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = this.cy();
          if (!t.styleEnabled() || !t.hasCompoundNodes()) return this;
          if (!e && t.batching()) return this;
          function n(e) {
            if (e.isParent()) {
              var t = e._private,
                n = e.children(),
                r = "include" === e.pstyle("compound-sizing-wrt-labels").value,
                i = {
                  width: {
                    val: e.pstyle("min-width").pfValue,
                    left: e.pstyle("min-width-bias-left"),
                    right: e.pstyle("min-width-bias-right"),
                  },
                  height: {
                    val: e.pstyle("min-height").pfValue,
                    top: e.pstyle("min-height-bias-top"),
                    bottom: e.pstyle("min-height-bias-bottom"),
                  },
                },
                a = n.boundingBox({
                  includeLabels: r,
                  includeOverlays: !1,
                  useCache: !1,
                }),
                o = t.position;
              (0 !== a.w && 0 !== a.h) ||
                (((a = {
                  w: e.pstyle("width").pfValue,
                  h: e.pstyle("height").pfValue,
                }).x1 = o.x - a.w / 2),
                (a.x2 = o.x + a.w / 2),
                (a.y1 = o.y - a.h / 2),
                (a.y2 = o.y + a.h / 2));
              var s = i.width.left.value;
              "px" === i.width.left.units &&
                i.width.val > 0 &&
                (s = (100 * s) / i.width.val);
              var l = i.width.right.value;
              "px" === i.width.right.units &&
                i.width.val > 0 &&
                (l = (100 * l) / i.width.val);
              var u = i.height.top.value;
              "px" === i.height.top.units &&
                i.height.val > 0 &&
                (u = (100 * u) / i.height.val);
              var c = i.height.bottom.value;
              "px" === i.height.bottom.units &&
                i.height.val > 0 &&
                (c = (100 * c) / i.height.val);
              var d = y(i.width.val - a.w, s, l),
                h = d.biasDiff,
                p = d.biasComplementDiff,
                f = y(i.height.val - a.h, u, c),
                g = f.biasDiff,
                v = f.biasComplementDiff;
              (t.autoPadding = (function (e, t, n, r) {
                if ("%" !== n.units) return "px" === n.units ? n.pfValue : 0;
                switch (r) {
                  case "width":
                    return e > 0 ? n.pfValue * e : 0;
                  case "height":
                    return t > 0 ? n.pfValue * t : 0;
                  case "average":
                    return e > 0 && t > 0 ? (n.pfValue * (e + t)) / 2 : 0;
                  case "min":
                    return e > 0 && t > 0
                      ? e > t
                        ? n.pfValue * t
                        : n.pfValue * e
                      : 0;
                  case "max":
                    return e > 0 && t > 0
                      ? e > t
                        ? n.pfValue * e
                        : n.pfValue * t
                      : 0;
                  default:
                    return 0;
                }
              })(
                a.w,
                a.h,
                e.pstyle("padding"),
                e.pstyle("padding-relative-to").value
              )),
                (t.autoWidth = Math.max(a.w, i.width.val)),
                (o.x = (-h + a.x1 + a.x2 + p) / 2),
                (t.autoHeight = Math.max(a.h, i.height.val)),
                (o.y = (-g + a.y1 + a.y2 + v) / 2);
            }
            function y(e, t, n) {
              var r = 0,
                i = 0,
                a = t + n;
              return (
                e > 0 && a > 0 && ((r = (t / a) * e), (i = (n / a) * e)),
                { biasDiff: r, biasComplementDiff: i }
              );
            }
          }
          for (var r = 0; r < this.length; r++) {
            var i = this[r],
              a = i._private;
            (a.compoundBoundsClean && !e) ||
              (n(i), t.batching() || (a.compoundBoundsClean = !0));
          }
          return this;
        });
      var ua = function (e) {
          return e === 1 / 0 || e === -1 / 0 ? 0 : e;
        },
        ca = function (e, t, n, r, i) {
          r - t != 0 &&
            i - n != 0 &&
            null != t &&
            null != n &&
            null != r &&
            null != i &&
            ((e.x1 = t < e.x1 ? t : e.x1),
            (e.x2 = r > e.x2 ? r : e.x2),
            (e.y1 = n < e.y1 ? n : e.y1),
            (e.y2 = i > e.y2 ? i : e.y2),
            (e.w = e.x2 - e.x1),
            (e.h = e.y2 - e.y1));
        },
        da = function (e, t) {
          return null == t ? e : ca(e, t.x1, t.y1, t.x2, t.y2);
        },
        ha = function (e, t, n) {
          return $e(e, t, n);
        },
        pa = function (e, t, n) {
          if (!t.cy().headless()) {
            var r,
              i,
              a = t._private,
              o = a.rstyle,
              s = o.arrowWidth / 2;
            if ("none" !== t.pstyle(n + "-arrow-shape").value) {
              "source" === n
                ? ((r = o.srcX), (i = o.srcY))
                : "target" === n
                ? ((r = o.tgtX), (i = o.tgtY))
                : ((r = o.midX), (i = o.midY));
              var l = (a.arrowBounds = a.arrowBounds || {}),
                u = (l[n] = l[n] || {});
              (u.x1 = r - s),
                (u.y1 = i - s),
                (u.x2 = r + s),
                (u.y2 = i + s),
                (u.w = u.x2 - u.x1),
                (u.h = u.y2 - u.y1),
                Ot(u, 1),
                ca(e, u.x1, u.y1, u.x2, u.y2);
            }
          }
        },
        fa = function (e, t, n) {
          if (!t.cy().headless()) {
            var r;
            r = n ? n + "-" : "";
            var i = t._private,
              a = i.rstyle;
            if (t.pstyle(r + "label").strValue) {
              var o,
                s,
                l,
                u,
                c = t.pstyle("text-halign"),
                d = t.pstyle("text-valign"),
                h = ha(a, "labelWidth", n),
                p = ha(a, "labelHeight", n),
                f = ha(a, "labelX", n),
                g = ha(a, "labelY", n),
                v = t.pstyle(r + "text-margin-x").pfValue,
                y = t.pstyle(r + "text-margin-y").pfValue,
                m = t.isEdge(),
                b = t.pstyle(r + "text-rotation"),
                x = t.pstyle("text-outline-width").pfValue,
                w = t.pstyle("text-border-width").pfValue / 2,
                E = t.pstyle("text-background-padding").pfValue,
                C = p,
                k = h,
                T = k / 2,
                S = C / 2;
              if (m) (o = f - T), (s = f + T), (l = g - S), (u = g + S);
              else {
                switch (c.value) {
                  case "left":
                    (o = f - k), (s = f);
                    break;
                  case "center":
                    (o = f - T), (s = f + T);
                    break;
                  case "right":
                    (o = f), (s = f + k);
                }
                switch (d.value) {
                  case "top":
                    (l = g - C), (u = g);
                    break;
                  case "center":
                    (l = g - S), (u = g + S);
                    break;
                  case "bottom":
                    (l = g), (u = g + C);
                }
              }
              (o += v - Math.max(x, w) - E - 2),
                (s += v + Math.max(x, w) + E + 2),
                (l += y - Math.max(x, w) - E - 2),
                (u += y + Math.max(x, w) + E + 2);
              var P = n || "main",
                D = i.labelBounds,
                _ = (D[P] = D[P] || {});
              (_.x1 = o),
                (_.y1 = l),
                (_.x2 = s),
                (_.y2 = u),
                (_.w = s - o),
                (_.h = u - l);
              var M = m && "autorotate" === b.strValue,
                N = null != b.pfValue && 0 !== b.pfValue;
              if (M || N) {
                var I = M ? ha(i.rstyle, "labelAngle", n) : b.pfValue,
                  B = Math.cos(I),
                  A = Math.sin(I),
                  L = (o + s) / 2,
                  O = (l + u) / 2;
                if (!m) {
                  switch (c.value) {
                    case "left":
                      L = s;
                      break;
                    case "right":
                      L = o;
                  }
                  switch (d.value) {
                    case "top":
                      O = u;
                      break;
                    case "bottom":
                      O = l;
                  }
                }
                var R = function (e, t) {
                    return {
                      x: (e -= L) * B - (t -= O) * A + L,
                      y: e * A + t * B + O,
                    };
                  },
                  z = R(o, l),
                  F = R(o, u),
                  V = R(s, l),
                  q = R(s, u);
                (o = Math.min(z.x, F.x, V.x, q.x)),
                  (s = Math.max(z.x, F.x, V.x, q.x)),
                  (l = Math.min(z.y, F.y, V.y, q.y)),
                  (u = Math.max(z.y, F.y, V.y, q.y));
              }
              var j = P + "Rot",
                Y = (D[j] = D[j] || {});
              (Y.x1 = o),
                (Y.y1 = l),
                (Y.x2 = s),
                (Y.y2 = u),
                (Y.w = s - o),
                (Y.h = u - l),
                ca(e, o, l, s, u),
                ca(i.labelBounds.all, o, l, s, u);
            }
            return e;
          }
        },
        ga = function (e) {
          var t = 0,
            n = function (e) {
              return (e ? 1 : 0) << t++;
            },
            r = 0;
          return (
            (r += n(e.incudeNodes)),
            (r += n(e.includeEdges)),
            (r += n(e.includeLabels)),
            (r += n(e.includeMainLabels)),
            (r += n(e.includeSourceLabels)),
            (r += n(e.includeTargetLabels)),
            (r += n(e.includeOverlays)) + n(e.includeOutlines)
          );
        },
        va = function (e) {
          if (e.isEdge()) {
            var t = e.source().position(),
              n = e.target().position(),
              r = function (e) {
                return Math.round(e);
              };
            return (function (e, t) {
              var n = { value: 0, done: !1 },
                r = 0,
                i = e.length;
              return Te(
                {
                  next: function () {
                    return r < i ? (n.value = e[r++]) : (n.done = !0), n;
                  },
                },
                void 0
              );
            })([r(t.x), r(t.y), r(n.x), r(n.y)]);
          }
          return 0;
        },
        ya = function (e, t) {
          var n,
            r = e._private,
            i = e.isEdge(),
            a = (null == t ? ba : ga(t)) === ba,
            o = va(e),
            s = r.bbCachePosKey === o,
            l = t.useCache && s,
            u = function (e) {
              return null == e._private.bbCache || e._private.styleDirty;
            };
          if (
            (!l || u(e) || (i && u(e.source())) || u(e.target())
              ? (s || e.recalculateRenderedStyle(l),
                (n = (function (e, t) {
                  var n,
                    r,
                    i,
                    a,
                    o,
                    s,
                    l,
                    u = e._private.cy,
                    c = u.styleEnabled(),
                    d = u.headless(),
                    h = Bt(),
                    p = e._private,
                    f = e.isNode(),
                    g = e.isEdge(),
                    v = p.rstyle,
                    y = f && c ? e.pstyle("bounds-expansion").pfValue : [0],
                    m = function (e) {
                      return "none" !== e.pstyle("display").value;
                    },
                    b =
                      !c || (m(e) && (!g || (m(e.source()) && m(e.target()))));
                  if (b) {
                    var x = 0;
                    c &&
                      t.includeOverlays &&
                      0 !== e.pstyle("overlay-opacity").value &&
                      (x = e.pstyle("overlay-padding").value);
                    var w = 0;
                    c &&
                      t.includeUnderlays &&
                      0 !== e.pstyle("underlay-opacity").value &&
                      (w = e.pstyle("underlay-padding").value);
                    var E = Math.max(x, w),
                      C = 0;
                    if (
                      (c && (C = e.pstyle("width").pfValue / 2),
                      f && t.includeNodes)
                    ) {
                      var k = e.position();
                      (o = k.x), (s = k.y);
                      var T = e.outerWidth() / 2,
                        S = e.outerHeight() / 2;
                      ca(h, (n = o - T), (i = s - S), (r = o + T), (a = s + S)),
                        c &&
                          t.includeOutlines &&
                          (function (e, t) {
                            if (!t.cy().headless()) {
                              var n,
                                r,
                                i = t.pstyle("outline-opacity").value,
                                a = t.pstyle("outline-width").value;
                              if (i > 0 && a > 0) {
                                var o = t.pstyle("outline-offset").value,
                                  s = t.pstyle("shape").value,
                                  l = a + o,
                                  u = (e.w + 2 * l) / e.w,
                                  c = (e.h + 2 * l) / e.h,
                                  d = 0;
                                [
                                  "diamond",
                                  "pentagon",
                                  "round-triangle",
                                ].includes(s)
                                  ? ((u = (e.w + 2.4 * l) / e.w),
                                    (d = -l / 3.6))
                                  : [
                                      "concave-hexagon",
                                      "rhomboid",
                                      "right-rhomboid",
                                    ].includes(s)
                                  ? (u = (e.w + 2.4 * l) / e.w)
                                  : "star" === s
                                  ? ((u = (e.w + 2.8 * l) / e.w),
                                    (c = (e.h + 2.6 * l) / e.h),
                                    (d = -l / 3.8))
                                  : "triangle" === s
                                  ? ((u = (e.w + 2.8 * l) / e.w),
                                    (c = (e.h + 2.4 * l) / e.h),
                                    (d = -l / 1.4))
                                  : "vee" === s &&
                                    ((u = (e.w + 4.4 * l) / e.w),
                                    (c = (e.h + 3.8 * l) / e.h),
                                    (d = 0.5 * -l));
                                var h = e.h * c - e.h,
                                  p = e.w * u - e.w;
                                if (
                                  (Rt(e, [Math.ceil(h / 2), Math.ceil(p / 2)]),
                                  0 !== d)
                                ) {
                                  var f =
                                    ((r = d),
                                    {
                                      x1: (n = e).x1 + 0,
                                      x2: n.x2 + 0,
                                      y1: n.y1 + r,
                                      y2: n.y2 + r,
                                      w: n.w,
                                      h: n.h,
                                    });
                                  At(e, f);
                                }
                              }
                            }
                          })(h, e);
                    } else if (g && t.includeEdges)
                      if (c && !d) {
                        var P = e.pstyle("curve-style").strValue;
                        if (
                          ((n = Math.min(v.srcX, v.midX, v.tgtX)),
                          (r = Math.max(v.srcX, v.midX, v.tgtX)),
                          (i = Math.min(v.srcY, v.midY, v.tgtY)),
                          (a = Math.max(v.srcY, v.midY, v.tgtY)),
                          ca(h, (n -= C), (i -= C), (r += C), (a += C)),
                          "haystack" === P)
                        ) {
                          var D = v.haystackPts;
                          if (D && 2 === D.length) {
                            if (
                              ((n = D[0].x), (i = D[0].y), n > (r = D[1].x))
                            ) {
                              var _ = n;
                              (n = r), (r = _);
                            }
                            if (i > (a = D[1].y)) {
                              var M = i;
                              (i = a), (a = M);
                            }
                            ca(h, n - C, i - C, r + C, a + C);
                          }
                        } else if (
                          "bezier" === P ||
                          "unbundled-bezier" === P ||
                          P.endsWith("segments") ||
                          P.endsWith("taxi")
                        ) {
                          var N;
                          switch (P) {
                            case "bezier":
                            case "unbundled-bezier":
                              N = v.bezierPts;
                              break;
                            case "segments":
                            case "taxi":
                            case "round-segments":
                            case "round-taxi":
                              N = v.linePts;
                          }
                          if (null != N)
                            for (var I = 0; I < N.length; I++) {
                              var B = N[I];
                              (n = B.x - C),
                                (r = B.x + C),
                                (i = B.y - C),
                                (a = B.y + C),
                                ca(h, n, i, r, a);
                            }
                        }
                      } else {
                        var A = e.source().position(),
                          L = e.target().position();
                        if ((n = A.x) > (r = L.x)) {
                          var O = n;
                          (n = r), (r = O);
                        }
                        if ((i = A.y) > (a = L.y)) {
                          var R = i;
                          (i = a), (a = R);
                        }
                        ca(h, (n -= C), (i -= C), (r += C), (a += C));
                      }
                    if (
                      (c &&
                        t.includeEdges &&
                        g &&
                        (pa(h, e, "mid-source"),
                        pa(h, e, "mid-target"),
                        pa(h, e, "source"),
                        pa(h, e, "target")),
                      c && "yes" === e.pstyle("ghost").value)
                    ) {
                      var z = e.pstyle("ghost-offset-x").pfValue,
                        F = e.pstyle("ghost-offset-y").pfValue;
                      ca(h, h.x1 + z, h.y1 + F, h.x2 + z, h.y2 + F);
                    }
                    var V = (p.bodyBounds = p.bodyBounds || {});
                    zt(V, h),
                      Rt(V, y),
                      Ot(V, 1),
                      c &&
                        ((n = h.x1),
                        (r = h.x2),
                        (i = h.y1),
                        (a = h.y2),
                        ca(h, n - E, i - E, r + E, a + E));
                    var q = (p.overlayBounds = p.overlayBounds || {});
                    zt(q, h), Rt(q, y), Ot(q, 1);
                    var j = (p.labelBounds = p.labelBounds || {});
                    null != j.all
                      ? (((l = j.all).x1 = 1 / 0),
                        (l.y1 = 1 / 0),
                        (l.x2 = -1 / 0),
                        (l.y2 = -1 / 0),
                        (l.w = 0),
                        (l.h = 0))
                      : (j.all = Bt()),
                      c &&
                        t.includeLabels &&
                        (t.includeMainLabels && fa(h, e, null),
                        g &&
                          (t.includeSourceLabels && fa(h, e, "source"),
                          t.includeTargetLabels && fa(h, e, "target")));
                  }
                  return (
                    (h.x1 = ua(h.x1)),
                    (h.y1 = ua(h.y1)),
                    (h.x2 = ua(h.x2)),
                    (h.y2 = ua(h.y2)),
                    (h.w = ua(h.x2 - h.x1)),
                    (h.h = ua(h.y2 - h.y1)),
                    h.w > 0 && h.h > 0 && b && (Rt(h, y), Ot(h, 1)),
                    h
                  );
                })(e, ma)),
                (r.bbCache = n),
                (r.bbCachePosKey = o))
              : (n = r.bbCache),
            !a)
          ) {
            var c = e.isNode();
            (n = Bt()),
              ((t.includeNodes && c) || (t.includeEdges && !c)) &&
                (t.includeOverlays
                  ? da(n, r.overlayBounds)
                  : da(n, r.bodyBounds)),
              t.includeLabels &&
                (t.includeMainLabels &&
                (!i || (t.includeSourceLabels && t.includeTargetLabels))
                  ? da(n, r.labelBounds.all)
                  : (t.includeMainLabels && da(n, r.labelBounds.mainRot),
                    t.includeSourceLabels && da(n, r.labelBounds.sourceRot),
                    t.includeTargetLabels && da(n, r.labelBounds.targetRot))),
              (n.w = n.x2 - n.x1),
              (n.h = n.y2 - n.y1);
          }
          return n;
        },
        ma = {
          includeNodes: !0,
          includeEdges: !0,
          includeLabels: !0,
          includeMainLabels: !0,
          includeSourceLabels: !0,
          includeTargetLabels: !0,
          includeOverlays: !0,
          includeUnderlays: !0,
          includeOutlines: !0,
          useCache: !0,
        },
        ba = ga(ma),
        xa = Ue(ma);
      (sa.boundingBox = function (e) {
        var t;
        if (
          1 !== this.length ||
          null == this[0]._private.bbCache ||
          this[0]._private.styleDirty ||
          (void 0 !== e && void 0 !== e.useCache && !0 !== e.useCache)
        ) {
          t = Bt();
          var n = xa((e = e || ma)),
            r = this;
          if (r.cy().styleEnabled())
            for (var i = 0; i < r.length; i++) {
              var a = r[i],
                o = a._private,
                s = va(a),
                l = o.bbCachePosKey === s,
                u = n.useCache && l && !o.styleDirty;
              a.recalculateRenderedStyle(u);
            }
          this.updateCompoundBounds(!e.useCache);
          for (var c = 0; c < r.length; c++) {
            var d = r[c];
            da(t, ya(d, n));
          }
        } else (e = void 0 === e ? ma : xa(e)), (t = ya(this[0], e));
        return (
          (t.x1 = ua(t.x1)),
          (t.y1 = ua(t.y1)),
          (t.x2 = ua(t.x2)),
          (t.y2 = ua(t.y2)),
          (t.w = ua(t.x2 - t.x1)),
          (t.h = ua(t.y2 - t.y1)),
          t
        );
      }),
        (sa.dirtyBoundingBoxCache = function () {
          for (var e = 0; e < this.length; e++) {
            var t = this[e]._private;
            (t.bbCache = null),
              (t.bbCachePosKey = null),
              (t.bodyBounds = null),
              (t.overlayBounds = null),
              (t.labelBounds.all = null),
              (t.labelBounds.source = null),
              (t.labelBounds.target = null),
              (t.labelBounds.main = null),
              (t.labelBounds.sourceRot = null),
              (t.labelBounds.targetRot = null),
              (t.labelBounds.mainRot = null),
              (t.arrowBounds.source = null),
              (t.arrowBounds.target = null),
              (t.arrowBounds["mid-source"] = null),
              (t.arrowBounds["mid-target"] = null);
          }
          return this.emitAndNotify("bounds"), this;
        }),
        (sa.boundingBoxAt = function (e) {
          var t = this.nodes(),
            n = this.cy(),
            r = n.hasCompoundNodes(),
            i = n.collection();
          if (
            (r &&
              ((i = t.filter(function (e) {
                return e.isParent();
              })),
              (t = t.not(i))),
            w(e))
          ) {
            var a = e;
            e = function () {
              return a;
            };
          }
          n.startBatch(),
            t
              .forEach(function (t, n) {
                return (t._private.bbAtOldPos = e(t, n));
              })
              .silentPositions(e),
            r &&
              (i.dirtyCompoundBoundsCache(),
              i.dirtyBoundingBoxCache(),
              i.updateCompoundBounds(!0));
          var o = (function (e) {
            return { x1: e.x1, x2: e.x2, w: e.w, y1: e.y1, y2: e.y2, h: e.h };
          })(this.boundingBox({ useCache: !1 }));
          return (
            t.silentPositions(function (e) {
              return e._private.bbAtOldPos;
            }),
            r &&
              (i.dirtyCompoundBoundsCache(),
              i.dirtyBoundingBoxCache(),
              i.updateCompoundBounds(!0)),
            n.endBatch(),
            o
          );
        }),
        (oa.boundingbox = oa.bb = oa.boundingBox),
        (oa.renderedBoundingbox = oa.renderedBoundingBox);
      var wa,
        Ea,
        Ca = sa;
      wa = Ea = {};
      var ka = function (e) {
        (e.uppercaseName = L(e.name)),
          (e.autoName = "auto" + e.uppercaseName),
          (e.labelName = "label" + e.uppercaseName),
          (e.outerName = "outer" + e.uppercaseName),
          (e.uppercaseOuterName = L(e.outerName)),
          (wa[e.name] = function () {
            var t = this[0],
              n = t._private,
              r = n.cy._private.styleEnabled;
            if (t) {
              if (r) {
                if (t.isParent())
                  return t.updateCompoundBounds(), n[e.autoName] || 0;
                var i = t.pstyle(e.name);
                return "label" === i.strValue
                  ? (t.recalculateRenderedStyle(), n.rstyle[e.labelName] || 0)
                  : i.pfValue;
              }
              return 1;
            }
          }),
          (wa["outer" + e.uppercaseName] = function () {
            var t = this[0],
              n = t._private.cy._private.styleEnabled;
            if (t)
              return n
                ? t[e.name]() +
                    t.pstyle("border-width").pfValue +
                    2 * t.padding()
                : 1;
          }),
          (wa["rendered" + e.uppercaseName] = function () {
            var t = this[0];
            if (t) return t[e.name]() * this.cy().zoom();
          }),
          (wa["rendered" + e.uppercaseOuterName] = function () {
            var t = this[0];
            if (t) return t[e.outerName]() * this.cy().zoom();
          });
      };
      ka({ name: "width" }),
        ka({ name: "height" }),
        (Ea.padding = function () {
          var e = this[0],
            t = e._private;
          return e.isParent()
            ? (e.updateCompoundBounds(),
              void 0 !== t.autoPadding
                ? t.autoPadding
                : e.pstyle("padding").pfValue)
            : e.pstyle("padding").pfValue;
        }),
        (Ea.paddedHeight = function () {
          var e = this[0];
          return e.height() + 2 * e.padding();
        }),
        (Ea.paddedWidth = function () {
          var e = this[0];
          return e.width() + 2 * e.padding();
        });
      var Ta = Ea,
        Sa = {
          controlPoints: {
            get: function (e) {
              return e.renderer().getControlPoints(e);
            },
            mult: !0,
          },
          segmentPoints: {
            get: function (e) {
              return e.renderer().getSegmentPoints(e);
            },
            mult: !0,
          },
          sourceEndpoint: {
            get: function (e) {
              return e.renderer().getSourceEndpoint(e);
            },
          },
          targetEndpoint: {
            get: function (e) {
              return e.renderer().getTargetEndpoint(e);
            },
          },
          midpoint: {
            get: function (e) {
              return e.renderer().getEdgeMidpoint(e);
            },
          },
        },
        Pa = Object.keys(Sa).reduce(function (e, t) {
          var n = Sa[t],
            r = (function (e) {
              return "rendered" + e[0].toUpperCase() + e.substr(1);
            })(t);
          return (
            (e[t] = function () {
              return (function (e, t) {
                if (e.isEdge()) return t(e);
              })(this, n.get);
            }),
            n.mult
              ? (e[r] = function () {
                  return (function (e, t) {
                    if (e.isEdge()) {
                      var n = e.cy(),
                        r = n.pan(),
                        i = n.zoom();
                      return t(e).map(function (e) {
                        return wt(e, i, r);
                      });
                    }
                  })(this, n.get);
                })
              : (e[r] = function () {
                  return (function (e, t) {
                    if (e.isEdge()) {
                      var n = e.cy();
                      return wt(t(e), n.zoom(), n.pan());
                    }
                  })(this, n.get);
                }),
            e
          );
        }, {}),
        Da = j({}, la, Ca, Ta, Pa),
        _a = function (e, t) {
          this.recycle(e, t);
        };
      function Ma() {
        return !1;
      }
      function Na() {
        return !0;
      }
      _a.prototype = {
        instanceString: function () {
          return "event";
        },
        recycle: function (e, t) {
          if (
            ((this.isImmediatePropagationStopped =
              this.isPropagationStopped =
              this.isDefaultPrevented =
                Ma),
            null != e && e.preventDefault
              ? ((this.type = e.type),
                (this.isDefaultPrevented = e.defaultPrevented ? Na : Ma))
              : null != e && e.type
              ? (t = e)
              : (this.type = e),
            null != t &&
              ((this.originalEvent = t.originalEvent),
              (this.type = null != t.type ? t.type : this.type),
              (this.cy = t.cy),
              (this.target = t.target),
              (this.position = t.position),
              (this.renderedPosition = t.renderedPosition),
              (this.namespace = t.namespace),
              (this.layout = t.layout)),
            null != this.cy &&
              null != this.position &&
              null == this.renderedPosition)
          ) {
            var n = this.position,
              r = this.cy.zoom(),
              i = this.cy.pan();
            this.renderedPosition = { x: n.x * r + i.x, y: n.y * r + i.y };
          }
          this.timeStamp = (e && e.timeStamp) || Date.now();
        },
        preventDefault: function () {
          this.isDefaultPrevented = Na;
          var e = this.originalEvent;
          e && e.preventDefault && e.preventDefault();
        },
        stopPropagation: function () {
          this.isPropagationStopped = Na;
          var e = this.originalEvent;
          e && e.stopPropagation && e.stopPropagation();
        },
        stopImmediatePropagation: function () {
          (this.isImmediatePropagationStopped = Na), this.stopPropagation();
        },
        isDefaultPrevented: Ma,
        isPropagationStopped: Ma,
        isImmediatePropagationStopped: Ma,
      };
      var Ia = /^([^.]+)(\.(?:[^.]+))?$/,
        Ba = {
          qualifierCompare: function (e, t) {
            return e === t;
          },
          eventMatches: function () {
            return !0;
          },
          addEventFields: function () {},
          callbackContext: function (e) {
            return e;
          },
          beforeEmit: function () {},
          afterEmit: function () {},
          bubble: function () {
            return !1;
          },
          parent: function () {
            return null;
          },
          context: null,
        },
        Aa = Object.keys(Ba),
        La = {};
      function Oa() {
        for (
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : La,
            t = arguments.length > 1 ? arguments[1] : void 0,
            n = 0;
          n < Aa.length;
          n++
        ) {
          var r = Aa[n];
          this[r] = e[r] || Ba[r];
        }
        (this.context = t || this.context),
          (this.listeners = []),
          (this.emitting = 0);
      }
      var Ra = Oa.prototype,
        za = function (e, t, n, r, i, a, o) {
          b(r) && ((i = r), (r = null)), o && (a = null == a ? o : j({}, a, o));
          for (var s = x(n) ? n : n.split(/\s+/), l = 0; l < s.length; l++) {
            var u = s[l];
            if (!_(u)) {
              var c = u.match(Ia);
              if (c && !1 === t(e, u, c[1], c[2] ? c[2] : null, r, i, a)) break;
            }
          }
        },
        Fa = function (e, t) {
          return e.addEventFields(e.context, t), new _a(t.type, t);
        };
      (Ra.on = Ra.addListener =
        function (e, t, n, r, i) {
          return (
            za(
              this,
              function (e, t, n, r, i, a, o) {
                b(a) &&
                  e.listeners.push({
                    event: t,
                    callback: a,
                    type: n,
                    namespace: r,
                    qualifier: i,
                    conf: o,
                  });
              },
              e,
              t,
              n,
              r,
              i
            ),
            this
          );
        }),
        (Ra.one = function (e, t, n, r) {
          return this.on(e, t, n, r, { one: !0 });
        }),
        (Ra.removeListener = Ra.off =
          function (e, t, n, r) {
            var i = this;
            0 !== this.emitting && (this.listeners = this.listeners.slice());
            for (
              var a = this.listeners,
                o = function (o) {
                  var s = a[o];
                  za(
                    i,
                    function (t, n, r, i, l, u) {
                      if (
                        (s.type === r || "*" === e) &&
                        ((!i && ".*" !== s.namespace) || s.namespace === i) &&
                        (!l || t.qualifierCompare(s.qualifier, l)) &&
                        (!u || s.callback === u)
                      )
                        return a.splice(o, 1), !1;
                    },
                    e,
                    t,
                    n,
                    r
                  );
                },
                s = a.length - 1;
              s >= 0;
              s--
            )
              o(s);
            return this;
          }),
        (Ra.removeAllListeners = function () {
          return this.removeListener("*");
        }),
        (Ra.emit = Ra.trigger =
          function (e, t, n) {
            var r = this.listeners,
              i = r.length;
            return (
              this.emitting++,
              x(t) || (t = [t]),
              (function (e, t, n) {
                if ("event" !== y(n))
                  if (w(n)) t(e, Fa(e, n));
                  else
                    for (
                      var r = x(n) ? n : n.split(/\s+/), i = 0;
                      i < r.length;
                      i++
                    ) {
                      var a = r[i];
                      if (!_(a)) {
                        var o = a.match(Ia);
                        if (o) {
                          var s = o[1],
                            l = o[2] ? o[2] : null;
                          t(
                            e,
                            Fa(e, { type: s, namespace: l, target: e.context })
                          );
                        }
                      }
                    }
                else t(e, n);
              })(
                this,
                function (e, a) {
                  null != n &&
                    ((r = [
                      {
                        event: a.event,
                        type: a.type,
                        namespace: a.namespace,
                        callback: n,
                      },
                    ]),
                    (i = r.length));
                  for (
                    var o = function (n) {
                        var i = r[n];
                        if (
                          i.type === a.type &&
                          (!i.namespace ||
                            i.namespace === a.namespace ||
                            ".*" === i.namespace) &&
                          e.eventMatches(e.context, i, a)
                        ) {
                          var o = [a];
                          null != t &&
                            (function (e, t) {
                              for (var n = 0; n < t.length; n++) {
                                var r = t[n];
                                e.push(r);
                              }
                            })(o, t),
                            e.beforeEmit(e.context, i, a),
                            i.conf &&
                              i.conf.one &&
                              (e.listeners = e.listeners.filter(function (e) {
                                return e !== i;
                              }));
                          var s = e.callbackContext(e.context, i, a),
                            l = i.callback.apply(s, o);
                          e.afterEmit(e.context, i, a),
                            !1 === l &&
                              (a.stopPropagation(), a.preventDefault());
                        }
                      },
                      s = 0;
                    s < i;
                    s++
                  )
                    o(s);
                  e.bubble(e.context) &&
                    !a.isPropagationStopped() &&
                    e.parent(e.context).emit(a, t);
                },
                e
              ),
              this.emitting--,
              this
            );
          });
      var Va = {
          qualifierCompare: function (e, t) {
            return null == e || null == t
              ? null == e && null == t
              : e.sameText(t);
          },
          eventMatches: function (e, t, n) {
            var r = t.qualifier;
            return (
              null == r ||
              (e !== n.target && T(n.target) && r.matches(n.target))
            );
          },
          addEventFields: function (e, t) {
            (t.cy = e.cy()), (t.target = e);
          },
          callbackContext: function (e, t, n) {
            return null != t.qualifier ? n.target : e;
          },
          beforeEmit: function (e, t) {
            t.conf &&
              t.conf.once &&
              t.conf.onceCollection.removeListener(
                t.event,
                t.qualifier,
                t.callback
              );
          },
          bubble: function () {
            return !0;
          },
          parent: function (e) {
            return e.isChild() ? e.parent() : e.cy();
          },
        },
        qa = function (e) {
          return m(e) ? new qi(e) : e;
        },
        ja = {
          createEmitter: function () {
            for (var e = 0; e < this.length; e++) {
              var t = this[e],
                n = t._private;
              n.emitter || (n.emitter = new Oa(Va, t));
            }
            return this;
          },
          emitter: function () {
            return this._private.emitter;
          },
          on: function (e, t, n) {
            for (var r = qa(t), i = 0; i < this.length; i++)
              this[i].emitter().on(e, r, n);
            return this;
          },
          removeListener: function (e, t, n) {
            for (var r = qa(t), i = 0; i < this.length; i++)
              this[i].emitter().removeListener(e, r, n);
            return this;
          },
          removeAllListeners: function () {
            for (var e = 0; e < this.length; e++)
              this[e].emitter().removeAllListeners();
            return this;
          },
          one: function (e, t, n) {
            for (var r = qa(t), i = 0; i < this.length; i++)
              this[i].emitter().one(e, r, n);
            return this;
          },
          once: function (e, t, n) {
            for (var r = qa(t), i = 0; i < this.length; i++)
              this[i].emitter().on(e, r, n, { once: !0, onceCollection: this });
          },
          emit: function (e, t) {
            for (var n = 0; n < this.length; n++) this[n].emitter().emit(e, t);
            return this;
          },
          emitAndNotify: function (e, t) {
            if (0 !== this.length)
              return this.cy().notify(e, this), this.emit(e, t), this;
          },
        };
      Ci.eventAliasesOn(ja);
      var Ya = {
          nodes: function (e) {
            return this.filter(function (e) {
              return e.isNode();
            }).filter(e);
          },
          edges: function (e) {
            return this.filter(function (e) {
              return e.isEdge();
            }).filter(e);
          },
          byGroup: function () {
            for (
              var e = this.spawn(), t = this.spawn(), n = 0;
              n < this.length;
              n++
            ) {
              var r = this[n];
              r.isNode() ? e.push(r) : t.push(r);
            }
            return { nodes: e, edges: t };
          },
          filter: function (e, t) {
            if (void 0 === e) return this;
            if (m(e) || k(e)) return new qi(e).filter(this);
            if (b(e)) {
              for (var n = this.spawn(), r = this, i = 0; i < r.length; i++) {
                var a = r[i];
                (t ? e.apply(t, [a, i, r]) : e(a, i, r)) && n.push(a);
              }
              return n;
            }
            return this.spawn();
          },
          not: function (e) {
            if (e) {
              m(e) && (e = this.filter(e));
              for (var t = this.spawn(), n = 0; n < this.length; n++) {
                var r = this[n];
                e.has(r) || t.push(r);
              }
              return t;
            }
            return this;
          },
          absoluteComplement: function () {
            return this.cy().mutableElements().not(this);
          },
          intersect: function (e) {
            if (m(e)) {
              var t = e;
              return this.filter(t);
            }
            for (
              var n = this.spawn(),
                r = e,
                i = this.length < e.length,
                a = i ? this : r,
                o = i ? r : this,
                s = 0;
              s < a.length;
              s++
            ) {
              var l = a[s];
              o.has(l) && n.push(l);
            }
            return n;
          },
          xor: function (e) {
            var t = this._private.cy;
            m(e) && (e = t.$(e));
            var n = this.spawn(),
              r = e,
              i = function (e, t) {
                for (var r = 0; r < e.length; r++) {
                  var i = e[r],
                    a = i._private.data.id;
                  t.hasElementWithId(a) || n.push(i);
                }
              };
            return i(this, r), i(r, this), n;
          },
          diff: function (e) {
            var t = this._private.cy;
            m(e) && (e = t.$(e));
            var n = this.spawn(),
              r = this.spawn(),
              i = this.spawn(),
              a = e,
              o = function (e, t, n) {
                for (var r = 0; r < e.length; r++) {
                  var a = e[r],
                    o = a._private.data.id;
                  t.hasElementWithId(o) ? i.merge(a) : n.push(a);
                }
              };
            return o(this, a, n), o(a, this, r), { left: n, right: r, both: i };
          },
          add: function (e) {
            var t = this._private.cy;
            if (!e) return this;
            if (m(e)) {
              var n = e;
              e = t.mutableElements().filter(n);
            }
            for (var r = this.spawnSelf(), i = 0; i < e.length; i++) {
              var a = e[i];
              !this.has(a) && r.push(a);
            }
            return r;
          },
          merge: function (e) {
            var t = this._private,
              n = t.cy;
            if (!e) return this;
            if (e && m(e)) {
              var r = e;
              e = n.mutableElements().filter(r);
            }
            for (var i = t.map, a = 0; a < e.length; a++) {
              var o = e[a],
                s = o._private.data.id;
              if (!i.has(s)) {
                var l = this.length++;
                (this[l] = o), i.set(s, { ele: o, index: l });
              }
            }
            return this;
          },
          unmergeAt: function (e) {
            var t = this[e].id(),
              n = this._private.map;
            (this[e] = void 0), n.delete(t);
            var r = e === this.length - 1;
            if (this.length > 1 && !r) {
              var i = this.length - 1,
                a = this[i],
                o = a._private.data.id;
              (this[i] = void 0), (this[e] = a), n.set(o, { ele: a, index: e });
            }
            return this.length--, this;
          },
          unmergeOne: function (e) {
            e = e[0];
            var t = this._private,
              n = e._private.data.id,
              r = t.map.get(n);
            if (!r) return this;
            var i = r.index;
            return this.unmergeAt(i), this;
          },
          unmerge: function (e) {
            var t = this._private.cy;
            if (!e) return this;
            if (e && m(e)) {
              var n = e;
              e = t.mutableElements().filter(n);
            }
            for (var r = 0; r < e.length; r++) this.unmergeOne(e[r]);
            return this;
          },
          unmergeBy: function (e) {
            for (var t = this.length - 1; t >= 0; t--)
              e(this[t]) && this.unmergeAt(t);
            return this;
          },
          map: function (e, t) {
            for (var n = [], r = this, i = 0; i < r.length; i++) {
              var a = r[i],
                o = t ? e.apply(t, [a, i, r]) : e(a, i, r);
              n.push(o);
            }
            return n;
          },
          reduce: function (e, t) {
            for (var n = t, r = this, i = 0; i < r.length; i++)
              n = e(n, r[i], i, r);
            return n;
          },
          max: function (e, t) {
            for (var n, r = -1 / 0, i = this, a = 0; a < i.length; a++) {
              var o = i[a],
                s = t ? e.apply(t, [o, a, i]) : e(o, a, i);
              s > r && ((r = s), (n = o));
            }
            return { value: r, ele: n };
          },
          min: function (e, t) {
            for (var n, r = 1 / 0, i = this, a = 0; a < i.length; a++) {
              var o = i[a],
                s = t ? e.apply(t, [o, a, i]) : e(o, a, i);
              s < r && ((r = s), (n = o));
            }
            return { value: r, ele: n };
          },
        },
        Xa = Ya;
      (Xa.u = Xa["|"] = Xa["+"] = Xa.union = Xa.or = Xa.add),
        (Xa["\\"] =
          Xa["!"] =
          Xa["-"] =
          Xa.difference =
          Xa.relativeComplement =
          Xa.subtract =
            Xa.not),
        (Xa.n = Xa["&"] = Xa["."] = Xa.and = Xa.intersection = Xa.intersect),
        (Xa["^"] =
          Xa["(+)"] =
          Xa["(-)"] =
          Xa.symmetricDifference =
          Xa.symdiff =
            Xa.xor),
        (Xa.fnFilter = Xa.filterFn = Xa.stdFilter = Xa.filter),
        (Xa.complement = Xa.abscomp = Xa.absoluteComplement);
      var Wa,
        Ha = function (e, t) {
          var n = e.cy().hasCompoundNodes();
          function r(e) {
            var t = e.pstyle("z-compound-depth");
            return "auto" === t.value
              ? n
                ? e.zDepth()
                : 0
              : "bottom" === t.value
              ? -1
              : "top" === t.value
              ? Oe
              : 0;
          }
          var i = r(e) - r(t);
          if (0 !== i) return i;
          function a(e) {
            return "auto" === e.pstyle("z-index-compare").value && e.isNode()
              ? 1
              : 0;
          }
          var o = a(e) - a(t);
          if (0 !== o) return o;
          var s = e.pstyle("z-index").value - t.pstyle("z-index").value;
          return 0 !== s ? s : e.poolIndex() - t.poolIndex();
        },
        Ga = {
          forEach: function (e, t) {
            if (b(e))
              for (var n = this.length, r = 0; r < n; r++) {
                var i = this[r];
                if (!1 === (t ? e.apply(t, [i, r, this]) : e(i, r, this)))
                  break;
              }
            return this;
          },
          toArray: function () {
            for (var e = [], t = 0; t < this.length; t++) e.push(this[t]);
            return e;
          },
          slice: function (e, t) {
            var n = [],
              r = this.length;
            null == t && (t = r),
              null == e && (e = 0),
              e < 0 && (e = r + e),
              t < 0 && (t = r + t);
            for (var i = e; i >= 0 && i < t && i < r; i++) n.push(this[i]);
            return this.spawn(n);
          },
          size: function () {
            return this.length;
          },
          eq: function (e) {
            return this[e] || this.spawn();
          },
          first: function () {
            return this[0] || this.spawn();
          },
          last: function () {
            return this[this.length - 1] || this.spawn();
          },
          empty: function () {
            return 0 === this.length;
          },
          nonempty: function () {
            return !this.empty();
          },
          sort: function (e) {
            if (!b(e)) return this;
            var t = this.toArray().sort(e);
            return this.spawn(t);
          },
          sortByZIndex: function () {
            return this.sort(Ha);
          },
          zDepth: function () {
            var e = this[0];
            if (e) {
              var t = e._private;
              if ("nodes" === t.group) {
                var n = t.data.parent ? e.parents().size() : 0;
                return e.isParent() ? n : Oe - 1;
              }
              var r = t.source,
                i = t.target,
                a = r.zDepth(),
                o = i.zDepth();
              return Math.max(a, o, 0);
            }
          },
        };
      (Ga.each = Ga.forEach),
        (Wa = "undefined"),
        ("undefined" == typeof Symbol ? "undefined" : r(Symbol)) != Wa &&
          r(Symbol.iterator) != Wa &&
          (Ga[Symbol.iterator] = function () {
            var e = this,
              t = { value: void 0, done: !1 },
              n = 0,
              r = this.length;
            return s(
              {
                next: function () {
                  return (
                    n < r
                      ? (t.value = e[n++])
                      : ((t.value = void 0), (t.done = !0)),
                    t
                  );
                },
              },
              Symbol.iterator,
              function () {
                return this;
              }
            );
          });
      var Ua = Ue({ nodeDimensionsIncludeLabels: !1 }),
        Ka = {
          layoutDimensions: function (e) {
            var t;
            if (((e = Ua(e)), this.takesUpSpace()))
              if (e.nodeDimensionsIncludeLabels) {
                var n = this.boundingBox();
                t = { w: n.w, h: n.h };
              } else t = { w: this.outerWidth(), h: this.outerHeight() };
            else t = { w: 0, h: 0 };
            return (0 !== t.w && 0 !== t.h) || (t.w = t.h = 1), t;
          },
          layoutPositions: function (e, t, n) {
            var r = this.nodes().filter(function (e) {
                return !e.isParent();
              }),
              i = this.cy(),
              a = t.eles,
              o = function (e) {
                return e.id();
              },
              s = N(n, o);
            e.emit({ type: "layoutstart", layout: e }), (e.animations = []);
            var l = t.spacingFactor && 1 !== t.spacingFactor,
              u = (function () {
                if (!l) return null;
                for (var e = Bt(), t = 0; t < r.length; t++) {
                  var n = r[t],
                    i = s(n, t);
                  Lt(e, i.x, i.y);
                }
                return e;
              })(),
              c = N(function (e, n) {
                var r,
                  i,
                  a,
                  o,
                  c,
                  d = s(e, n);
                return (
                  l &&
                    ((r = Math.abs(t.spacingFactor)),
                    (a = d),
                    (o = (i = u).x1 + i.w / 2),
                    (c = i.y1 + i.h / 2),
                    (d = { x: o + (a.x - o) * r, y: c + (a.y - c) * r })),
                  null != t.transform && (d = t.transform(e, d)),
                  d
                );
              }, o);
            if (t.animate) {
              for (var d = 0; d < r.length; d++) {
                var h = r[d],
                  p = c(h, d);
                if (null == t.animateFilter || t.animateFilter(h, d)) {
                  var f = h.animation({
                    position: p,
                    duration: t.animationDuration,
                    easing: t.animationEasing,
                  });
                  e.animations.push(f);
                } else h.position(p);
              }
              if (t.fit) {
                var g = i.animation({
                  fit: { boundingBox: a.boundingBoxAt(c), padding: t.padding },
                  duration: t.animationDuration,
                  easing: t.animationEasing,
                });
                e.animations.push(g);
              } else if (void 0 !== t.zoom && void 0 !== t.pan) {
                var v = i.animation({
                  zoom: t.zoom,
                  pan: t.pan,
                  duration: t.animationDuration,
                  easing: t.animationEasing,
                });
                e.animations.push(v);
              }
              e.animations.forEach(function (e) {
                return e.play();
              }),
                e.one("layoutready", t.ready),
                e.emit({ type: "layoutready", layout: e }),
                wr
                  .all(
                    e.animations.map(function (e) {
                      return e.promise();
                    })
                  )
                  .then(function () {
                    e.one("layoutstop", t.stop),
                      e.emit({ type: "layoutstop", layout: e });
                  });
            } else
              r.positions(c),
                t.fit && i.fit(t.eles, t.padding),
                null != t.zoom && i.zoom(t.zoom),
                t.pan && i.pan(t.pan),
                e.one("layoutready", t.ready),
                e.emit({ type: "layoutready", layout: e }),
                e.one("layoutstop", t.stop),
                e.emit({ type: "layoutstop", layout: e });
            return this;
          },
          layout: function (e) {
            return this.cy().makeLayout(j({}, e, { eles: this }));
          },
        };
      function Za(e, t, n) {
        var r,
          i = n._private,
          a = (i.styleCache = i.styleCache || []);
        return null != (r = a[e]) ? r : (r = a[e] = t(n));
      }
      function $a(e, t) {
        return (
          (e = Me(e)),
          function (n) {
            return Za(e, t, n);
          }
        );
      }
      function Qa(e, t) {
        e = Me(e);
        var n = function (e) {
          return t.call(e);
        };
        return function () {
          var t = this[0];
          if (t) return Za(e, n, t);
        };
      }
      Ka.createLayout = Ka.makeLayout = Ka.layout;
      var Ja = {
        recalculateRenderedStyle: function (e) {
          var t = this.cy(),
            n = t.renderer(),
            r = t.styleEnabled();
          return n && r && n.recalculateRenderedStyle(this, e), this;
        },
        dirtyStyleCache: function () {
          var e,
            t = this.cy(),
            n = function (e) {
              return (e._private.styleCache = null);
            };
          return (
            t.hasCompoundNodes()
              ? ((e = this.spawnSelf()
                  .merge(this.descendants())
                  .merge(this.parents())).merge(e.connectedEdges()),
                e.forEach(n))
              : this.forEach(function (e) {
                  n(e), e.connectedEdges().forEach(n);
                }),
            this
          );
        },
        updateStyle: function (e) {
          var t = this._private.cy;
          if (!t.styleEnabled()) return this;
          if (t.batching()) return t._private.batchStyleEles.merge(this), this;
          var n = this;
          (e = !(!e && void 0 !== e)),
            t.hasCompoundNodes() &&
              (n = this.spawnSelf()
                .merge(this.descendants())
                .merge(this.parents()));
          var r = n;
          return (
            e ? r.emitAndNotify("style") : r.emit("style"),
            n.forEach(function (e) {
              return (e._private.styleDirty = !0);
            }),
            this
          );
        },
        cleanStyle: function () {
          var e = this.cy();
          if (e.styleEnabled())
            for (var t = 0; t < this.length; t++) {
              var n = this[t];
              n._private.styleDirty &&
                ((n._private.styleDirty = !1), e.style().apply(n));
            }
        },
        parsedStyle: function (e) {
          var t =
              !(arguments.length > 1 && void 0 !== arguments[1]) ||
              arguments[1],
            n = this[0],
            r = n.cy();
          if (r.styleEnabled() && n) {
            this.cleanStyle();
            var i = n._private.style[e];
            return null != i ? i : t ? r.style().getDefaultProperty(e) : null;
          }
        },
        numericStyle: function (e) {
          var t = this[0];
          if (t.cy().styleEnabled() && t) {
            var n = t.pstyle(e);
            return void 0 !== n.pfValue ? n.pfValue : n.value;
          }
        },
        numericStyleUnits: function (e) {
          var t = this[0];
          if (t.cy().styleEnabled()) return t ? t.pstyle(e).units : void 0;
        },
        renderedStyle: function (e) {
          var t = this.cy();
          if (!t.styleEnabled()) return this;
          var n = this[0];
          return n ? t.style().getRenderedStyle(n, e) : void 0;
        },
        style: function (e, t) {
          var n = this.cy();
          if (!n.styleEnabled()) return this;
          var r = !1,
            i = n.style();
          if (w(e)) {
            var a = e;
            i.applyBypass(this, a, r), this.emitAndNotify("style");
          } else if (m(e)) {
            if (void 0 === t) {
              var o = this[0];
              return o ? i.getStylePropertyValue(o, e) : void 0;
            }
            i.applyBypass(this, e, t, r), this.emitAndNotify("style");
          } else if (void 0 === e) {
            var s = this[0];
            return s ? i.getRawStyle(s) : void 0;
          }
          return this;
        },
        removeStyle: function (e) {
          var t = this.cy();
          if (!t.styleEnabled()) return this;
          var n = !1,
            r = t.style(),
            i = this;
          if (void 0 === e)
            for (var a = 0; a < i.length; a++) {
              var o = i[a];
              r.removeAllBypasses(o, n);
            }
          else {
            e = e.split(/\s+/);
            for (var s = 0; s < i.length; s++) {
              var l = i[s];
              r.removeBypasses(l, e, n);
            }
          }
          return this.emitAndNotify("style"), this;
        },
        show: function () {
          return this.css("display", "element"), this;
        },
        hide: function () {
          return this.css("display", "none"), this;
        },
        effectiveOpacity: function () {
          var e = this.cy();
          if (!e.styleEnabled()) return 1;
          var t = e.hasCompoundNodes(),
            n = this[0];
          if (n) {
            var r = n._private,
              i = n.pstyle("opacity").value;
            if (!t) return i;
            var a = r.data.parent ? n.parents() : null;
            if (a)
              for (var o = 0; o < a.length; o++)
                i *= a[o].pstyle("opacity").value;
            return i;
          }
        },
        transparent: function () {
          if (!this.cy().styleEnabled()) return !1;
          var e = this[0],
            t = e.cy().hasCompoundNodes();
          return e
            ? t
              ? 0 === e.effectiveOpacity()
              : 0 === e.pstyle("opacity").value
            : void 0;
        },
        backgrounding: function () {
          return !!this.cy().styleEnabled() && !!this[0]._private.backgrounding;
        },
      };
      function eo(e, t) {
        var n = e._private.data.parent ? e.parents() : null;
        if (n) for (var r = 0; r < n.length; r++) if (!t(n[r])) return !1;
        return !0;
      }
      function to(e) {
        var t = e.ok,
          n = e.edgeOkViaNode || e.ok,
          r = e.parentOk || e.ok;
        return function () {
          var e = this.cy();
          if (!e.styleEnabled()) return !0;
          var i = this[0],
            a = e.hasCompoundNodes();
          if (i) {
            var o = i._private;
            if (!t(i)) return !1;
            if (i.isNode()) return !a || eo(i, r);
            var s = o.source,
              l = o.target;
            return (
              n(s) &&
              (!a || eo(s, n)) &&
              (s === l || (n(l) && (!a || eo(l, n))))
            );
          }
        };
      }
      var no = $a("eleTakesUpSpace", function (e) {
        return (
          "element" === e.pstyle("display").value &&
          0 !== e.width() &&
          (!e.isNode() || 0 !== e.height())
        );
      });
      Ja.takesUpSpace = Qa("takesUpSpace", to({ ok: no }));
      var ro = $a("eleInteractive", function (e) {
          return (
            "yes" === e.pstyle("events").value &&
            "visible" === e.pstyle("visibility").value &&
            no(e)
          );
        }),
        io = $a("parentInteractive", function (e) {
          return "visible" === e.pstyle("visibility").value && no(e);
        });
      (Ja.interactive = Qa(
        "interactive",
        to({ ok: ro, parentOk: io, edgeOkViaNode: no })
      )),
        (Ja.noninteractive = function () {
          var e = this[0];
          if (e) return !e.interactive();
        });
      var ao = $a("eleVisible", function (e) {
          return (
            "visible" === e.pstyle("visibility").value &&
            0 !== e.pstyle("opacity").pfValue &&
            no(e)
          );
        }),
        oo = no;
      (Ja.visible = Qa("visible", to({ ok: ao, edgeOkViaNode: oo }))),
        (Ja.hidden = function () {
          var e = this[0];
          if (e) return !e.visible();
        }),
        (Ja.isBundledBezier = Qa("isBundledBezier", function () {
          return (
            !!this.cy().styleEnabled() &&
            !this.removed() &&
            "bezier" === this.pstyle("curve-style").value &&
            this.takesUpSpace()
          );
        })),
        (Ja.bypass = Ja.css = Ja.style),
        (Ja.renderedCss = Ja.renderedStyle),
        (Ja.removeBypass = Ja.removeCss = Ja.removeStyle),
        (Ja.pstyle = Ja.parsedStyle);
      var so = {};
      function lo(e) {
        return function () {
          var t = arguments,
            n = [];
          if (2 === t.length) {
            var r = t[0],
              i = t[1];
            this.on(e.event, r, i);
          } else if (1 === t.length && b(t[0])) {
            var a = t[0];
            this.on(e.event, a);
          } else if (0 === t.length || (1 === t.length && x(t[0]))) {
            for (
              var o = 1 === t.length ? t[0] : null, s = 0;
              s < this.length;
              s++
            ) {
              var l = this[s],
                u = !e.ableField || l._private[e.ableField],
                c = l._private[e.field] != e.value;
              if (e.overrideAble) {
                var d = e.overrideAble(l);
                if (void 0 !== d && ((u = d), !d)) return this;
              }
              u && ((l._private[e.field] = e.value), c && n.push(l));
            }
            var h = this.spawn(n);
            h.updateStyle(), h.emit(e.event), o && h.emit(o);
          }
          return this;
        };
      }
      function uo(e) {
        (so[e.field] = function () {
          var t = this[0];
          if (t) {
            if (e.overrideField) {
              var n = e.overrideField(t);
              if (void 0 !== n) return n;
            }
            return t._private[e.field];
          }
        }),
          (so[e.on] = lo({
            event: e.on,
            field: e.field,
            ableField: e.ableField,
            overrideAble: e.overrideAble,
            value: !0,
          })),
          (so[e.off] = lo({
            event: e.off,
            field: e.field,
            ableField: e.ableField,
            overrideAble: e.overrideAble,
            value: !1,
          }));
      }
      uo({
        field: "locked",
        overrideField: function (e) {
          return !!e.cy().autolock() || void 0;
        },
        on: "lock",
        off: "unlock",
      }),
        uo({
          field: "grabbable",
          overrideField: function (e) {
            return !e.cy().autoungrabify() && !e.pannable() && void 0;
          },
          on: "grabify",
          off: "ungrabify",
        }),
        uo({
          field: "selected",
          ableField: "selectable",
          overrideAble: function (e) {
            return !e.cy().autounselectify() && void 0;
          },
          on: "select",
          off: "unselect",
        }),
        uo({
          field: "selectable",
          overrideField: function (e) {
            return !e.cy().autounselectify() && void 0;
          },
          on: "selectify",
          off: "unselectify",
        }),
        (so.deselect = so.unselect),
        (so.grabbed = function () {
          var e = this[0];
          if (e) return e._private.grabbed;
        }),
        uo({ field: "active", on: "activate", off: "unactivate" }),
        uo({ field: "pannable", on: "panify", off: "unpanify" }),
        (so.inactive = function () {
          var e = this[0];
          if (e) return !e._private.active;
        });
      var co = {},
        ho = function (e) {
          return function (t) {
            for (var n = [], r = 0; r < this.length; r++) {
              var i = this[r];
              if (i.isNode()) {
                for (
                  var a = !1, o = i.connectedEdges(), s = 0;
                  s < o.length;
                  s++
                ) {
                  var l = o[s],
                    u = l.source(),
                    c = l.target();
                  if (
                    (e.noIncomingEdges && c === i && u !== i) ||
                    (e.noOutgoingEdges && u === i && c !== i)
                  ) {
                    a = !0;
                    break;
                  }
                }
                a || n.push(i);
              }
            }
            return this.spawn(n, !0).filter(t);
          };
        },
        po = function (e) {
          return function (t) {
            for (var n = [], r = 0; r < this.length; r++) {
              var i = this[r];
              if (i.isNode())
                for (var a = i.connectedEdges(), o = 0; o < a.length; o++) {
                  var s = a[o],
                    l = s.source(),
                    u = s.target();
                  e.outgoing && l === i
                    ? (n.push(s), n.push(u))
                    : e.incoming && u === i && (n.push(s), n.push(l));
                }
            }
            return this.spawn(n, !0).filter(t);
          };
        },
        fo = function (e) {
          return function (t) {
            for (var n = this, r = [], i = {}; ; ) {
              var a = e.outgoing ? n.outgoers() : n.incomers();
              if (0 === a.length) break;
              for (var o = !1, s = 0; s < a.length; s++) {
                var l = a[s],
                  u = l.id();
                i[u] || ((i[u] = !0), r.push(l), (o = !0));
              }
              if (!o) break;
              n = a;
            }
            return this.spawn(r, !0).filter(t);
          };
        };
      function go(e) {
        return function (t) {
          for (var n = [], r = 0; r < this.length; r++) {
            var i = this[r]._private[e.attr];
            i && n.push(i);
          }
          return this.spawn(n, !0).filter(t);
        };
      }
      function vo(e) {
        return function (t) {
          var n = [],
            r = this._private.cy,
            i = e || {};
          m(t) && (t = r.$(t));
          for (var a = 0; a < t.length; a++)
            for (var o = t[a]._private.edges, s = 0; s < o.length; s++) {
              var l = o[s],
                u = l._private.data,
                c =
                  this.hasElementWithId(u.source) &&
                  t.hasElementWithId(u.target),
                d =
                  t.hasElementWithId(u.source) &&
                  this.hasElementWithId(u.target);
              if (c || d) {
                if (i.thisIsSrc || i.thisIsTgt) {
                  if (i.thisIsSrc && !c) continue;
                  if (i.thisIsTgt && !d) continue;
                }
                n.push(l);
              }
            }
          return this.spawn(n, !0);
        };
      }
      function yo(e) {
        return (
          (e = j({}, { codirected: !1 }, e)),
          function (t) {
            for (var n = [], r = this.edges(), i = e, a = 0; a < r.length; a++)
              for (
                var o = r[a]._private,
                  s = o.source,
                  l = s._private.data.id,
                  u = o.data.target,
                  c = s._private.edges,
                  d = 0;
                d < c.length;
                d++
              ) {
                var h = c[d],
                  p = h._private.data,
                  f = p.target,
                  g = p.source,
                  v = f === u && g === l,
                  y = l === f && u === g;
                ((i.codirected && v) || (!i.codirected && (v || y))) &&
                  n.push(h);
              }
            return this.spawn(n, !0).filter(t);
          }
        );
      }
      (co.clearTraversalCache = function () {
        for (var e = 0; e < this.length; e++)
          this[e]._private.traversalCache = null;
      }),
        j(co, {
          roots: ho({ noIncomingEdges: !0 }),
          leaves: ho({ noOutgoingEdges: !0 }),
          outgoers: Hi(po({ outgoing: !0 }), "outgoers"),
          successors: fo({ outgoing: !0 }),
          incomers: Hi(po({ incoming: !0 }), "incomers"),
          predecessors: fo({ incoming: !0 }),
        }),
        j(co, {
          neighborhood: Hi(function (e) {
            for (var t = [], n = this.nodes(), r = 0; r < n.length; r++)
              for (
                var i = n[r], a = i.connectedEdges(), o = 0;
                o < a.length;
                o++
              ) {
                var s = a[o],
                  l = s.source(),
                  u = s.target(),
                  c = i === l ? u : l;
                c.length > 0 && t.push(c[0]), t.push(s[0]);
              }
            return this.spawn(t, !0).filter(e);
          }, "neighborhood"),
          closedNeighborhood: function (e) {
            return this.neighborhood().add(this).filter(e);
          },
          openNeighborhood: function (e) {
            return this.neighborhood(e);
          },
        }),
        (co.neighbourhood = co.neighborhood),
        (co.closedNeighbourhood = co.closedNeighborhood),
        (co.openNeighbourhood = co.openNeighborhood),
        j(co, {
          source: Hi(function (e) {
            var t,
              n = this[0];
            return (
              n && (t = n._private.source || n.cy().collection()),
              t && e ? t.filter(e) : t
            );
          }, "source"),
          target: Hi(function (e) {
            var t,
              n = this[0];
            return (
              n && (t = n._private.target || n.cy().collection()),
              t && e ? t.filter(e) : t
            );
          }, "target"),
          sources: go({ attr: "source" }),
          targets: go({ attr: "target" }),
        }),
        j(co, {
          edgesWith: Hi(vo(), "edgesWith"),
          edgesTo: Hi(vo({ thisIsSrc: !0 }), "edgesTo"),
        }),
        j(co, {
          connectedEdges: Hi(function (e) {
            for (var t = [], n = 0; n < this.length; n++) {
              var r = this[n];
              if (r.isNode())
                for (var i = r._private.edges, a = 0; a < i.length; a++) {
                  var o = i[a];
                  t.push(o);
                }
            }
            return this.spawn(t, !0).filter(e);
          }, "connectedEdges"),
          connectedNodes: Hi(function (e) {
            for (var t = [], n = 0; n < this.length; n++) {
              var r = this[n];
              r.isEdge() && (t.push(r.source()[0]), t.push(r.target()[0]));
            }
            return this.spawn(t, !0).filter(e);
          }, "connectedNodes"),
          parallelEdges: Hi(yo(), "parallelEdges"),
          codirectedEdges: Hi(yo({ codirected: !0 }), "codirectedEdges"),
        }),
        j(co, {
          components: function (e) {
            var t = this,
              n = t.cy(),
              r = n.collection(),
              i = null == e ? t.nodes() : e.nodes(),
              a = [];
            null != e && i.empty() && (i = e.sources());
            var o = function (e, t) {
              r.merge(e), i.unmerge(e), t.merge(e);
            };
            if (i.empty()) return t.spawn();
            var s = function () {
              var e = n.collection();
              a.push(e);
              var r = i[0];
              o(r, e),
                t.bfs({
                  directed: !1,
                  roots: r,
                  visit: function (t) {
                    return o(t, e);
                  },
                }),
                e.forEach(function (n) {
                  n.connectedEdges().forEach(function (n) {
                    t.has(n) &&
                      e.has(n.source()) &&
                      e.has(n.target()) &&
                      e.merge(n);
                  });
                });
            };
            do {
              s();
            } while (i.length > 0);
            return a;
          },
          component: function () {
            var e = this[0];
            return e.cy().mutableElements().components(e)[0];
          },
        }),
        (co.componentsOf = co.components);
      var mo = function (e, t) {
          var n =
              arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
          if (void 0 !== e) {
            var i = new Je(),
              a = !1;
            if (t) {
              if (t.length > 0 && w(t[0]) && !T(t[0])) {
                a = !0;
                for (
                  var o = [], s = new tt(), l = 0, u = t.length;
                  l < u;
                  l++
                ) {
                  var c = t[l];
                  null == c.data && (c.data = {});
                  var d = c.data;
                  if (null == d.id) d.id = We();
                  else if (e.hasElementWithId(d.id) || s.has(d.id)) continue;
                  var h = new nt(e, c, !1);
                  o.push(h), s.add(d.id);
                }
                t = o;
              }
            } else t = [];
            this.length = 0;
            for (var p = 0, f = t.length; p < f; p++) {
              var g = t[p][0];
              if (null != g) {
                var v = g._private.data.id;
                (n && i.has(v)) ||
                  (n && i.set(v, { index: this.length, ele: g }),
                  (this[this.length] = g),
                  this.length++);
              }
            }
            (this._private = {
              eles: this,
              cy: e,
              get map() {
                return null == this.lazyMap && this.rebuildMap(), this.lazyMap;
              },
              set map(e) {
                this.lazyMap = e;
              },
              rebuildMap: function () {
                for (
                  var e = (this.lazyMap = new Je()), t = this.eles, n = 0;
                  n < t.length;
                  n++
                ) {
                  var r = t[n];
                  e.set(r.id(), { index: n, ele: r });
                }
              },
            }),
              n && (this._private.map = i),
              a && !r && this.restore();
          } else qe("A collection must have a reference to the core");
        },
        bo = (nt.prototype = mo.prototype = Object.create(Array.prototype));
      (bo.instanceString = function () {
        return "collection";
      }),
        (bo.spawn = function (e, t) {
          return new mo(this.cy(), e, t);
        }),
        (bo.spawnSelf = function () {
          return this.spawn(this);
        }),
        (bo.cy = function () {
          return this._private.cy;
        }),
        (bo.renderer = function () {
          return this._private.cy.renderer();
        }),
        (bo.element = function () {
          return this[0];
        }),
        (bo.collection = function () {
          return S(this) ? this : new mo(this._private.cy, [this]);
        }),
        (bo.unique = function () {
          return new mo(this._private.cy, this, !0);
        }),
        (bo.hasElementWithId = function (e) {
          return (e = "" + e), this._private.map.has(e);
        }),
        (bo.getElementById = function (e) {
          e = "" + e;
          var t = this._private.cy,
            n = this._private.map.get(e);
          return n ? n.ele : new mo(t);
        }),
        (bo.$id = bo.getElementById),
        (bo.poolIndex = function () {
          var e = this._private.cy._private.elements,
            t = this[0]._private.data.id;
          return e._private.map.get(t).index;
        }),
        (bo.indexOf = function (e) {
          var t = e[0]._private.data.id;
          return this._private.map.get(t).index;
        }),
        (bo.indexOfId = function (e) {
          return (e = "" + e), this._private.map.get(e).index;
        }),
        (bo.json = function (e) {
          var t = this.element(),
            n = this.cy();
          if (null == t && e) return this;
          if (null != t) {
            var r = t._private;
            if (w(e)) {
              if ((n.startBatch(), e.data)) {
                t.data(e.data);
                var i = r.data;
                if (t.isEdge()) {
                  var a = !1,
                    o = {},
                    s = e.data.source,
                    l = e.data.target;
                  null != s && s != i.source && ((o.source = "" + s), (a = !0)),
                    null != l &&
                      l != i.target &&
                      ((o.target = "" + l), (a = !0)),
                    a && (t = t.move(o));
                } else {
                  var u = "parent" in e.data,
                    c = e.data.parent;
                  !u ||
                    (null == c && null == i.parent) ||
                    c == i.parent ||
                    (void 0 === c && (c = null),
                    null != c && (c = "" + c),
                    (t = t.move({ parent: c })));
                }
              }
              e.position && t.position(e.position);
              var d = function (n, i, a) {
                var o = e[n];
                null != o && o !== r[n] && (o ? t[i]() : t[a]());
              };
              return (
                d("removed", "remove", "restore"),
                d("selected", "select", "unselect"),
                d("selectable", "selectify", "unselectify"),
                d("locked", "lock", "unlock"),
                d("grabbable", "grabify", "ungrabify"),
                d("pannable", "panify", "unpanify"),
                null != e.classes && t.classes(e.classes),
                n.endBatch(),
                this
              );
            }
            if (void 0 === e) {
              var h = {
                  data: Xe(r.data),
                  position: Xe(r.position),
                  group: r.group,
                  removed: r.removed,
                  selected: r.selected,
                  selectable: r.selectable,
                  locked: r.locked,
                  grabbable: r.grabbable,
                  pannable: r.pannable,
                  classes: "",
                },
                p = 0;
              return (
                r.classes.forEach(function (e) {
                  return (h.classes += 0 == p++ ? e : " " + e);
                }),
                h
              );
            }
          }
        }),
        (bo.jsons = function () {
          for (var e = [], t = 0; t < this.length; t++) {
            var n = this[t].json();
            e.push(n);
          }
          return e;
        }),
        (bo.clone = function () {
          for (var e = this.cy(), t = [], n = 0; n < this.length; n++) {
            var r = this[n].json(),
              i = new nt(e, r, !1);
            t.push(i);
          }
          return new mo(e, t);
        }),
        (bo.copy = bo.clone),
        (bo.restore = function () {
          for (
            var e,
              t,
              n =
                !(arguments.length > 0 && void 0 !== arguments[0]) ||
                arguments[0],
              r =
                !(arguments.length > 1 && void 0 !== arguments[1]) ||
                arguments[1],
              i = this,
              a = i.cy(),
              o = a._private,
              s = [],
              l = [],
              u = 0,
              c = i.length;
            u < c;
            u++
          ) {
            var d = i[u];
            (r && !d.removed()) || (d.isNode() ? s.push(d) : l.push(d));
          }
          e = s.concat(l);
          var h = function () {
            e.splice(t, 1), t--;
          };
          for (t = 0; t < e.length; t++) {
            var p = e[t],
              f = p._private,
              g = f.data;
            if ((p.clearTraversalCache(), r || f.removed))
              if (void 0 === g.id) g.id = We();
              else if (E(g.id)) g.id = "" + g.id;
              else {
                if (_(g.id) || !m(g.id)) {
                  qe(
                    "Can not create element with invalid string ID `" +
                      g.id +
                      "`"
                  ),
                    h();
                  continue;
                }
                if (a.hasElementWithId(g.id)) {
                  qe("Can not create second element with ID `" + g.id + "`"),
                    h();
                  continue;
                }
              }
            var v = g.id;
            if (p.isNode()) {
              var y = f.position;
              null == y.x && (y.x = 0), null == y.y && (y.y = 0);
            }
            if (p.isEdge()) {
              for (
                var b = p,
                  x = ["source", "target"],
                  w = x.length,
                  C = !1,
                  k = 0;
                k < w;
                k++
              ) {
                var T = x[k],
                  S = g[T];
                E(S) && (S = g[T] = "" + g[T]),
                  null == S || "" === S
                    ? (qe(
                        "Can not create edge `" + v + "` with unspecified " + T
                      ),
                      (C = !0))
                    : a.hasElementWithId(S) ||
                      (qe(
                        "Can not create edge `" +
                          v +
                          "` with nonexistant " +
                          T +
                          " `" +
                          S +
                          "`"
                      ),
                      (C = !0));
              }
              if (C) {
                h();
                continue;
              }
              var P = a.getElementById(g.source),
                D = a.getElementById(g.target);
              P.same(D)
                ? P._private.edges.push(b)
                : (P._private.edges.push(b), D._private.edges.push(b)),
                (b._private.source = P),
                (b._private.target = D);
            }
            (f.map = new Je()),
              f.map.set(v, { ele: p, index: 0 }),
              (f.removed = !1),
              r && a.addToPool(p);
          }
          for (var M = 0; M < s.length; M++) {
            var N = s[M],
              I = N._private.data;
            E(I.parent) && (I.parent = "" + I.parent);
            var B = I.parent;
            if (null != B || N._private.parent) {
              var A = N._private.parent
                ? a.collection().merge(N._private.parent)
                : a.getElementById(B);
              if (A.empty()) I.parent = void 0;
              else if (A[0].removed())
                Ye(
                  "Node added with missing parent, reference to parent removed"
                ),
                  (I.parent = void 0),
                  (N._private.parent = null);
              else {
                for (var L = !1, O = A; !O.empty(); ) {
                  if (N.same(O)) {
                    (L = !0), (I.parent = void 0);
                    break;
                  }
                  O = O.parent();
                }
                L ||
                  (A[0]._private.children.push(N),
                  (N._private.parent = A[0]),
                  (o.hasCompoundNodes = !0));
              }
            }
          }
          if (e.length > 0) {
            for (
              var R = e.length === i.length ? i : new mo(a, e), z = 0;
              z < R.length;
              z++
            ) {
              var F = R[z];
              F.isNode() ||
                (F.parallelEdges().clearTraversalCache(),
                F.source().clearTraversalCache(),
                F.target().clearTraversalCache());
            }
            (o.hasCompoundNodes
              ? a
                  .collection()
                  .merge(R)
                  .merge(R.connectedNodes())
                  .merge(R.parent())
              : R
            )
              .dirtyCompoundBoundsCache()
              .dirtyBoundingBoxCache()
              .updateStyle(n),
              n ? R.emitAndNotify("add") : r && R.emit("add");
          }
          return i;
        }),
        (bo.removed = function () {
          var e = this[0];
          return e && e._private.removed;
        }),
        (bo.inside = function () {
          var e = this[0];
          return e && !e._private.removed;
        }),
        (bo.remove = function () {
          var e =
              !(arguments.length > 0 && void 0 !== arguments[0]) ||
              arguments[0],
            t =
              !(arguments.length > 1 && void 0 !== arguments[1]) ||
              arguments[1],
            n = this,
            r = [],
            i = {},
            a = n._private.cy;
          function o(e) {
            var n = i[e.id()];
            (t && e.removed()) ||
              n ||
              ((i[e.id()] = !0),
              e.isNode()
                ? (r.push(e),
                  (function (e) {
                    for (var t = e._private.edges, n = 0; n < t.length; n++)
                      o(t[n]);
                  })(e),
                  (function (e) {
                    for (var t = e._private.children, n = 0; n < t.length; n++)
                      o(t[n]);
                  })(e))
                : r.unshift(e));
          }
          for (var s = 0, l = n.length; s < l; s++) o(n[s]);
          function u(e, t) {
            var n = e._private.edges;
            Ke(n, t), e.clearTraversalCache();
          }
          function c(e) {
            e.clearTraversalCache();
          }
          var d = [];
          function h(e, t) {
            t = t[0];
            var n = (e = e[0])._private.children,
              r = e.id();
            Ke(n, t),
              (t._private.parent = null),
              d.ids[r] || ((d.ids[r] = !0), d.push(e));
          }
          (d.ids = {}), n.dirtyCompoundBoundsCache(), t && a.removeFromPool(r);
          for (var p = 0; p < r.length; p++) {
            var f = r[p];
            if (f.isEdge()) {
              var g = f.source()[0],
                v = f.target()[0];
              u(g, f), u(v, f);
              for (var y = f.parallelEdges(), m = 0; m < y.length; m++) {
                var b = y[m];
                c(b), b.isBundledBezier() && b.dirtyBoundingBoxCache();
              }
            } else {
              var x = f.parent();
              0 !== x.length && h(x, f);
            }
            t && (f._private.removed = !0);
          }
          var w = a._private.elements;
          a._private.hasCompoundNodes = !1;
          for (var E = 0; E < w.length; E++)
            if (w[E].isParent()) {
              a._private.hasCompoundNodes = !0;
              break;
            }
          var C = new mo(this.cy(), r);
          C.size() > 0 &&
            (e ? C.emitAndNotify("remove") : t && C.emit("remove"));
          for (var k = 0; k < d.length; k++) {
            var T = d[k];
            (t && T.removed()) || T.updateStyle();
          }
          return C;
        }),
        (bo.move = function (e) {
          var t = this._private.cy,
            n = this,
            r = !1,
            i = !1,
            a = function (e) {
              return null == e ? e : "" + e;
            };
          if (void 0 !== e.source || void 0 !== e.target) {
            var o = a(e.source),
              s = a(e.target),
              l = null != o && t.hasElementWithId(o),
              u = null != s && t.hasElementWithId(s);
            (l || u) &&
              (t.batch(function () {
                n.remove(r, i), n.emitAndNotify("moveout");
                for (var e = 0; e < n.length; e++) {
                  var t = n[e],
                    a = t._private.data;
                  t.isEdge() && (l && (a.source = o), u && (a.target = s));
                }
                n.restore(r, i);
              }),
              n.emitAndNotify("move"));
          } else if (void 0 !== e.parent) {
            var c = a(e.parent);
            if (null === c || t.hasElementWithId(c)) {
              var d = null === c ? void 0 : c;
              t.batch(function () {
                var e = n.remove(r, i);
                e.emitAndNotify("moveout");
                for (var t = 0; t < n.length; t++) {
                  var a = n[t],
                    o = a._private.data;
                  a.isNode() && (o.parent = d);
                }
                e.restore(r, i);
              }),
                n.emitAndNotify("move");
            }
          }
          return this;
        }),
        [
          fr,
          ki,
          Ti,
          Yi,
          Gi,
          ea,
          ta,
          Da,
          ja,
          Ya,
          {
            isNode: function () {
              return "nodes" === this.group();
            },
            isEdge: function () {
              return "edges" === this.group();
            },
            isLoop: function () {
              return this.isEdge() && this.source()[0] === this.target()[0];
            },
            isSimple: function () {
              return this.isEdge() && this.source()[0] !== this.target()[0];
            },
            group: function () {
              var e = this[0];
              if (e) return e._private.group;
            },
          },
          Ga,
          Ka,
          Ja,
          so,
          co,
        ].forEach(function (e) {
          j(bo, e);
        });
      var xo = {
        add: function (e) {
          var t,
            n = this;
          if (k(e)) {
            var r = e;
            if (r._private.cy === n) t = r.restore();
            else {
              for (var i = [], a = 0; a < r.length; a++) {
                var o = r[a];
                i.push(o.json());
              }
              t = new mo(n, i);
            }
          } else if (x(e)) t = new mo(n, e);
          else if (w(e) && (x(e.nodes) || x(e.edges))) {
            for (
              var s = e, l = [], u = ["nodes", "edges"], c = 0, d = u.length;
              c < d;
              c++
            ) {
              var h = u[c],
                p = s[h];
              if (x(p))
                for (var f = 0, g = p.length; f < g; f++) {
                  var v = j({ group: h }, p[f]);
                  l.push(v);
                }
            }
            t = new mo(n, l);
          } else t = new nt(n, e).collection();
          return t;
        },
        remove: function (e) {
          if (k(e));
          else if (m(e)) {
            var t = e;
            e = this.$(t);
          }
          return e.remove();
        },
      };
      function wo(e, t, n, r) {
        var i = 0.1,
          a = "undefined" != typeof Float32Array;
        if (4 !== arguments.length) return !1;
        for (var o = 0; o < 4; ++o)
          if (
            "number" != typeof arguments[o] ||
            isNaN(arguments[o]) ||
            !isFinite(arguments[o])
          )
            return !1;
        (e = Math.min(e, 1)),
          (n = Math.min(n, 1)),
          (e = Math.max(e, 0)),
          (n = Math.max(n, 0));
        var s = a ? new Float32Array(11) : new Array(11);
        function l(e, t) {
          return 1 - 3 * t + 3 * e;
        }
        function u(e, t) {
          return 3 * t - 6 * e;
        }
        function c(e) {
          return 3 * e;
        }
        function d(e, t, n) {
          return ((l(t, n) * e + u(t, n)) * e + c(t)) * e;
        }
        function h(e, t, n) {
          return 3 * l(t, n) * e * e + 2 * u(t, n) * e + c(t);
        }
        var p = !1;
        var f = function (a) {
          return (
            p ||
              ((p = !0),
              (e === t && n === r) ||
                (function () {
                  for (var t = 0; t < 11; ++t) s[t] = d(t * i, e, n);
                })()),
            e === t && n === r
              ? a
              : 0 === a
              ? 0
              : 1 === a
              ? 1
              : d(
                  (function (t) {
                    for (var r = 0, a = 1; 10 !== a && s[a] <= t; ++a) r += i;
                    --a;
                    var o = r + ((t - s[a]) / (s[a + 1] - s[a])) * i,
                      l = h(o, e, n);
                    return l >= 0.001
                      ? (function (t, r) {
                          for (var i = 0; i < 4; ++i) {
                            var a = h(r, e, n);
                            if (0 === a) return r;
                            r -= (d(r, e, n) - t) / a;
                          }
                          return r;
                        })(t, o)
                      : 0 === l
                      ? o
                      : (function (t, r, i) {
                          var a,
                            o,
                            s = 0;
                          do {
                            (a = d((o = r + (i - r) / 2), e, n) - t) > 0
                              ? (i = o)
                              : (r = o);
                          } while (Math.abs(a) > 1e-7 && ++s < 10);
                          return o;
                        })(t, r, r + i);
                  })(a),
                  t,
                  r
                )
          );
        };
        f.getControlPoints = function () {
          return [
            { x: e, y: t },
            { x: n, y: r },
          ];
        };
        var g = "generateBezier(" + [e, t, n, r] + ")";
        return (
          (f.toString = function () {
            return g;
          }),
          f
        );
      }
      var Eo = (function () {
          function e(e) {
            return -e.tension * e.x - e.friction * e.v;
          }
          function t(t, n, r) {
            var i = {
              x: t.x + r.dx * n,
              v: t.v + r.dv * n,
              tension: t.tension,
              friction: t.friction,
            };
            return { dx: i.v, dv: e(i) };
          }
          function n(n, r) {
            var i = { dx: n.v, dv: e(n) },
              a = t(n, 0.5 * r, i),
              o = t(n, 0.5 * r, a),
              s = t(n, r, o),
              l = (1 / 6) * (i.dx + 2 * (a.dx + o.dx) + s.dx),
              u = (1 / 6) * (i.dv + 2 * (a.dv + o.dv) + s.dv);
            return (n.x = n.x + l * r), (n.v = n.v + u * r), n;
          }
          return function e(t, r, i) {
            var a,
              o,
              s,
              l = { x: -1, v: 0, tension: null, friction: null },
              u = [0],
              c = 0,
              d = 1e-4;
            for (
              t = parseFloat(t) || 500,
                r = parseFloat(r) || 20,
                i = i || null,
                l.tension = t,
                l.friction = r,
                o = (a = null !== i) ? ((c = e(t, r)) / i) * 0.016 : 0.016;
              (s = n(s || l, o)),
                u.push(1 + s.x),
                (c += 16),
                Math.abs(s.x) > d && Math.abs(s.v) > d;

            );
            return a
              ? function (e) {
                  return u[(e * (u.length - 1)) | 0];
                }
              : c;
          };
        })(),
        Co = function (e, t, n, r) {
          var i = wo(e, t, n, r);
          return function (e, t, n) {
            return e + (t - e) * i(n);
          };
        },
        ko = {
          linear: function (e, t, n) {
            return e + (t - e) * n;
          },
          ease: Co(0.25, 0.1, 0.25, 1),
          "ease-in": Co(0.42, 0, 1, 1),
          "ease-out": Co(0, 0, 0.58, 1),
          "ease-in-out": Co(0.42, 0, 0.58, 1),
          "ease-in-sine": Co(0.47, 0, 0.745, 0.715),
          "ease-out-sine": Co(0.39, 0.575, 0.565, 1),
          "ease-in-out-sine": Co(0.445, 0.05, 0.55, 0.95),
          "ease-in-quad": Co(0.55, 0.085, 0.68, 0.53),
          "ease-out-quad": Co(0.25, 0.46, 0.45, 0.94),
          "ease-in-out-quad": Co(0.455, 0.03, 0.515, 0.955),
          "ease-in-cubic": Co(0.55, 0.055, 0.675, 0.19),
          "ease-out-cubic": Co(0.215, 0.61, 0.355, 1),
          "ease-in-out-cubic": Co(0.645, 0.045, 0.355, 1),
          "ease-in-quart": Co(0.895, 0.03, 0.685, 0.22),
          "ease-out-quart": Co(0.165, 0.84, 0.44, 1),
          "ease-in-out-quart": Co(0.77, 0, 0.175, 1),
          "ease-in-quint": Co(0.755, 0.05, 0.855, 0.06),
          "ease-out-quint": Co(0.23, 1, 0.32, 1),
          "ease-in-out-quint": Co(0.86, 0, 0.07, 1),
          "ease-in-expo": Co(0.95, 0.05, 0.795, 0.035),
          "ease-out-expo": Co(0.19, 1, 0.22, 1),
          "ease-in-out-expo": Co(1, 0, 0, 1),
          "ease-in-circ": Co(0.6, 0.04, 0.98, 0.335),
          "ease-out-circ": Co(0.075, 0.82, 0.165, 1),
          "ease-in-out-circ": Co(0.785, 0.135, 0.15, 0.86),
          spring: function (e, t, n) {
            if (0 === n) return ko.linear;
            var r = Eo(e, t, n);
            return function (e, t, n) {
              return e + (t - e) * r(n);
            };
          },
          "cubic-bezier": Co,
        };
      function To(e, t, n, r, i) {
        if (1 === r) return n;
        if (t === n) return n;
        var a = i(t, n, r);
        return (
          null == e ||
            ((e.roundValue || e.color) && (a = Math.round(a)),
            void 0 !== e.min && (a = Math.max(a, e.min)),
            void 0 !== e.max && (a = Math.min(a, e.max))),
          a
        );
      }
      function So(e, t) {
        return null != e.pfValue || null != e.value
          ? null == e.pfValue || (null != t && "%" === t.type.units)
            ? e.value
            : e.pfValue
          : e;
      }
      function Po(e, t, n, r, i) {
        var a = null != i ? i.type : null;
        n < 0 ? (n = 0) : n > 1 && (n = 1);
        var o = So(e, i),
          s = So(t, i);
        if (E(o) && E(s)) return To(a, o, s, n, r);
        if (x(o) && x(s)) {
          for (var l = [], u = 0; u < s.length; u++) {
            var c = o[u],
              d = s[u];
            if (null != c && null != d) {
              var h = To(a, c, d, n, r);
              l.push(h);
            } else l.push(d);
          }
          return l;
        }
      }
      function Do(e, t, n, r) {
        var i = !r,
          a = e._private,
          o = t._private,
          s = o.easing,
          l = o.startTime,
          u = (r ? e : e.cy()).style();
        if (!o.easingImpl)
          if (null == s) o.easingImpl = ko.linear;
          else {
            var c, d, h;
            (c = m(s) ? u.parse("transition-timing-function", s).value : s),
              m(c)
                ? ((d = c), (h = []))
                : ((d = c[1]),
                  (h = c.slice(2).map(function (e) {
                    return +e;
                  }))),
              h.length > 0
                ? ("spring" === d && h.push(o.duration),
                  (o.easingImpl = ko[d].apply(null, h)))
                : (o.easingImpl = ko[d]);
          }
        var p,
          f = o.easingImpl;
        if (
          ((p = 0 === o.duration ? 1 : (n - l) / o.duration),
          o.applying && (p = o.progress),
          p < 0 ? (p = 0) : p > 1 && (p = 1),
          null == o.delay)
        ) {
          var g = o.startPosition,
            v = o.position;
          if (v && i && !e.locked()) {
            var y = {};
            _o(g.x, v.x) && (y.x = Po(g.x, v.x, p, f)),
              _o(g.y, v.y) && (y.y = Po(g.y, v.y, p, f)),
              e.position(y);
          }
          var b = o.startPan,
            x = o.pan,
            w = a.pan,
            E = null != x && r;
          E &&
            (_o(b.x, x.x) && (w.x = Po(b.x, x.x, p, f)),
            _o(b.y, x.y) && (w.y = Po(b.y, x.y, p, f)),
            e.emit("pan"));
          var C = o.startZoom,
            k = o.zoom,
            T = null != k && r;
          T &&
            (_o(C, k) && (a.zoom = It(a.minZoom, Po(C, k, p, f), a.maxZoom)),
            e.emit("zoom")),
            (E || T) && e.emit("viewport");
          var S = o.style;
          if (S && S.length > 0 && i) {
            for (var P = 0; P < S.length; P++) {
              var D = S[P],
                _ = D.name,
                M = D,
                N = o.startStyle[_],
                I = Po(N, M, p, f, u.properties[N.name]);
              u.overrideBypass(e, _, I);
            }
            e.emit("style");
          }
        }
        return (o.progress = p), p;
      }
      function _o(e, t) {
        return !!(null != e && null != t && ((E(e) && E(t)) || (e && t)));
      }
      function Mo(e, t, n, r) {
        var i = t._private;
        (i.started = !0), (i.startTime = n - i.progress * i.duration);
      }
      function No(e, t) {
        var n = t._private.aniEles,
          r = [];
        function i(t, n) {
          var i = t._private,
            a = i.animation.current,
            o = i.animation.queue,
            s = !1;
          if (0 === a.length) {
            var l = o.shift();
            l && a.push(l);
          }
          for (
            var u = function (e) {
                for (var t = e.length - 1; t >= 0; t--) (0, e[t])();
                e.splice(0, e.length);
              },
              c = a.length - 1;
            c >= 0;
            c--
          ) {
            var d = a[c],
              h = d._private;
            h.stopped
              ? (a.splice(c, 1),
                (h.hooked = !1),
                (h.playing = !1),
                (h.started = !1),
                u(h.frames))
              : (h.playing || h.applying) &&
                (h.playing && h.applying && (h.applying = !1),
                h.started || Mo(0, d, e),
                Do(t, d, e, n),
                h.applying && (h.applying = !1),
                u(h.frames),
                null != h.step && h.step(e),
                d.completed() &&
                  (a.splice(c, 1),
                  (h.hooked = !1),
                  (h.playing = !1),
                  (h.started = !1),
                  u(h.completes)),
                (s = !0));
          }
          return n || 0 !== a.length || 0 !== o.length || r.push(t), s;
        }
        for (var a = !1, o = 0; o < n.length; o++) {
          var s = i(n[o]);
          a = a || s;
        }
        var l = i(t, !0);
        (a || l) && (n.length > 0 ? t.notify("draw", n) : t.notify("draw")),
          n.unmerge(r),
          t.emit("step");
      }
      var Io = {
          animate: Ci.animate(),
          animation: Ci.animation(),
          animated: Ci.animated(),
          clearQueue: Ci.clearQueue(),
          delay: Ci.delay(),
          delayAnimation: Ci.delayAnimation(),
          stop: Ci.stop(),
          addToAnimationPool: function (e) {
            this.styleEnabled() && this._private.aniEles.merge(e);
          },
          stopAnimationLoop: function () {
            this._private.animationsRunning = !1;
          },
          startAnimationLoop: function () {
            var e = this;
            if (((e._private.animationsRunning = !0), e.styleEnabled())) {
              var t = e.renderer();
              t && t.beforeRender
                ? t.beforeRender(function (t, n) {
                    No(n, e);
                  }, t.beforeRenderPriorities.animations)
                : (function t() {
                    e._private.animationsRunning &&
                      we(function (n) {
                        No(n, e), t();
                      });
                  })();
            }
          },
        },
        Bo = {
          qualifierCompare: function (e, t) {
            return null == e || null == t
              ? null == e && null == t
              : e.sameText(t);
          },
          eventMatches: function (e, t, n) {
            var r = t.qualifier;
            return (
              null == r ||
              (e !== n.target && T(n.target) && r.matches(n.target))
            );
          },
          addEventFields: function (e, t) {
            (t.cy = e), (t.target = e);
          },
          callbackContext: function (e, t, n) {
            return null != t.qualifier ? n.target : e;
          },
        },
        Ao = function (e) {
          return m(e) ? new qi(e) : e;
        },
        Lo = {
          createEmitter: function () {
            var e = this._private;
            return e.emitter || (e.emitter = new Oa(Bo, this)), this;
          },
          emitter: function () {
            return this._private.emitter;
          },
          on: function (e, t, n) {
            return this.emitter().on(e, Ao(t), n), this;
          },
          removeListener: function (e, t, n) {
            return this.emitter().removeListener(e, Ao(t), n), this;
          },
          removeAllListeners: function () {
            return this.emitter().removeAllListeners(), this;
          },
          one: function (e, t, n) {
            return this.emitter().one(e, Ao(t), n), this;
          },
          once: function (e, t, n) {
            return this.emitter().one(e, Ao(t), n), this;
          },
          emit: function (e, t) {
            return this.emitter().emit(e, t), this;
          },
          emitAndNotify: function (e, t) {
            return this.emit(e), this.notify(e, t), this;
          },
        };
      Ci.eventAliasesOn(Lo);
      var Oo = {
        png: function (e) {
          return (e = e || {}), this._private.renderer.png(e);
        },
        jpg: function (e) {
          var t = this._private.renderer;
          return ((e = e || {}).bg = e.bg || "#fff"), t.jpg(e);
        },
      };
      Oo.jpeg = Oo.jpg;
      var Ro = {
        layout: function (e) {
          var t = this;
          if (null != e)
            if (null != e.name) {
              var n,
                r = e.name,
                i = t.extension("layout", r);
              if (null != i)
                return (
                  (n = m(e.eles)
                    ? t.$(e.eles)
                    : null != e.eles
                    ? e.eles
                    : t.$()),
                  new i(j({}, e, { cy: t, eles: n }))
                );
              qe(
                "No such layout `" +
                  r +
                  "` found.  Did you forget to import it and `cytoscape.use()` it?"
              );
            } else qe("A `name` must be specified to make a layout");
          else qe("Layout options must be specified to make a layout");
        },
      };
      Ro.createLayout = Ro.makeLayout = Ro.layout;
      var zo = {
          notify: function (e, t) {
            var n = this._private;
            if (this.batching()) {
              n.batchNotifications = n.batchNotifications || {};
              var r = (n.batchNotifications[e] =
                n.batchNotifications[e] || this.collection());
              null != t && r.merge(t);
            } else if (n.notificationsEnabled) {
              var i = this.renderer();
              !this.destroyed() && i && i.notify(e, t);
            }
          },
          notifications: function (e) {
            var t = this._private;
            return void 0 === e
              ? t.notificationsEnabled
              : ((t.notificationsEnabled = !!e), this);
          },
          noNotifications: function (e) {
            this.notifications(!1), e(), this.notifications(!0);
          },
          batching: function () {
            return this._private.batchCount > 0;
          },
          startBatch: function () {
            var e = this._private;
            return (
              null == e.batchCount && (e.batchCount = 0),
              0 === e.batchCount &&
                ((e.batchStyleEles = this.collection()),
                (e.batchNotifications = {})),
              e.batchCount++,
              this
            );
          },
          endBatch: function () {
            var e = this._private;
            if (0 === e.batchCount) return this;
            if ((e.batchCount--, 0 === e.batchCount)) {
              e.batchStyleEles.updateStyle();
              var t = this.renderer();
              Object.keys(e.batchNotifications).forEach(function (n) {
                var r = e.batchNotifications[n];
                r.empty() ? t.notify(n) : t.notify(n, r);
              });
            }
            return this;
          },
          batch: function (e) {
            return this.startBatch(), e(), this.endBatch(), this;
          },
          batchData: function (e) {
            var t = this;
            return this.batch(function () {
              for (var n = Object.keys(e), r = 0; r < n.length; r++) {
                var i = n[r],
                  a = e[i];
                t.getElementById(i).data(a);
              }
            });
          },
        },
        Fo = Ue({
          hideEdgesOnViewport: !1,
          textureOnViewport: !1,
          motionBlur: !1,
          motionBlurOpacity: 0.05,
          pixelRatio: void 0,
          desktopTapThreshold: 4,
          touchTapThreshold: 8,
          wheelSensitivity: 1,
          debug: !1,
          showFps: !1,
        }),
        Vo = {
          renderTo: function (e, t, n, r) {
            return this._private.renderer.renderTo(e, t, n, r), this;
          },
          renderer: function () {
            return this._private.renderer;
          },
          forceRender: function () {
            return this.notify("draw"), this;
          },
          resize: function () {
            return this.invalidateSize(), this.emitAndNotify("resize"), this;
          },
          initRenderer: function (e) {
            var t = this,
              n = t.extension("renderer", e.name);
            if (null != n) {
              void 0 !== e.wheelSensitivity &&
                Ye(
                  "You have set a custom wheel sensitivity.  This will make your app zoom unnaturally when using mainstream mice.  You should change this value from the default only if you can guarantee that all your users will use the same hardware and OS configuration as your current machine."
                );
              var r = Fo(e);
              (r.cy = t), (t._private.renderer = new n(r)), this.notify("init");
            } else
              qe(
                "Can not initialise: No such renderer `".concat(
                  e.name,
                  "` found. Did you forget to import it and `cytoscape.use()` it?"
                )
              );
          },
          destroyRenderer: function () {
            var e = this;
            e.notify("destroy");
            var t = e.container();
            if (t)
              for (t._cyreg = null; t.childNodes.length > 0; )
                t.removeChild(t.childNodes[0]);
            (e._private.renderer = null),
              e.mutableElements().forEach(function (e) {
                var t = e._private;
                (t.rscratch = {}),
                  (t.rstyle = {}),
                  (t.animation.current = []),
                  (t.animation.queue = []);
              });
          },
          onRender: function (e) {
            return this.on("render", e);
          },
          offRender: function (e) {
            return this.off("render", e);
          },
        };
      Vo.invalidateDimensions = Vo.resize;
      var qo = {
        collection: function (e, t) {
          return m(e)
            ? this.$(e)
            : k(e)
            ? e.collection()
            : x(e)
            ? (t || (t = {}), new mo(this, e, t.unique, t.removed))
            : new mo(this);
        },
        nodes: function (e) {
          var t = this.$(function (e) {
            return e.isNode();
          });
          return e ? t.filter(e) : t;
        },
        edges: function (e) {
          var t = this.$(function (e) {
            return e.isEdge();
          });
          return e ? t.filter(e) : t;
        },
        $: function (e) {
          var t = this._private.elements;
          return e ? t.filter(e) : t.spawnSelf();
        },
        mutableElements: function () {
          return this._private.elements;
        },
      };
      qo.elements = qo.filter = qo.$;
      var jo = {},
        Yo = "t";
      (jo.apply = function (e) {
        for (
          var t = this, n = t._private.cy.collection(), r = 0;
          r < e.length;
          r++
        ) {
          var i = e[r],
            a = t.getContextMeta(i);
          if (!a.empty) {
            var o = t.getContextStyle(a),
              s = t.applyContextStyle(a, o, i);
            i._private.appliedInitStyle
              ? t.updateTransitions(i, s.diffProps)
              : (i._private.appliedInitStyle = !0),
              t.updateStyleHints(i) && n.push(i);
          }
        }
        return n;
      }),
        (jo.getPropertiesDiff = function (e, t) {
          var n = this,
            r = (n._private.propDiffs = n._private.propDiffs || {}),
            i = e + "-" + t,
            a = r[i];
          if (a) return a;
          for (var o = [], s = {}, l = 0; l < n.length; l++) {
            var u = n[l],
              c = e[l] === Yo,
              d = t[l] === Yo,
              h = c !== d,
              p = u.mappedProperties.length > 0;
            if (h || (d && p)) {
              var f = void 0;
              (h && p) || h
                ? (f = u.properties)
                : p && (f = u.mappedProperties);
              for (var g = 0; g < f.length; g++) {
                for (
                  var v = f[g], y = v.name, m = !1, b = l + 1;
                  b < n.length;
                  b++
                ) {
                  var x = n[b];
                  if (t[b] === Yo && (m = null != x.properties[v.name])) break;
                }
                s[y] || m || ((s[y] = !0), o.push(y));
              }
            }
          }
          return (r[i] = o), o;
        }),
        (jo.getContextMeta = function (e) {
          for (
            var t, n = this, r = "", i = e._private.styleCxtKey || "", a = 0;
            a < n.length;
            a++
          ) {
            var o = n[a];
            r += o.selector && o.selector.matches(e) ? Yo : "f";
          }
          return (
            (t = n.getPropertiesDiff(i, r)),
            (e._private.styleCxtKey = r),
            { key: r, diffPropNames: t, empty: 0 === t.length }
          );
        }),
        (jo.getContextStyle = function (e) {
          var t = e.key,
            n = (this._private.contextStyles =
              this._private.contextStyles || {});
          if (n[t]) return n[t];
          for (var r = { _private: { key: t } }, i = 0; i < this.length; i++) {
            var a = this[i];
            if (t[i] === Yo)
              for (var o = 0; o < a.properties.length; o++) {
                var s = a.properties[o];
                r[s.name] = s;
              }
          }
          return (n[t] = r), r;
        }),
        (jo.applyContextStyle = function (e, t, n) {
          for (
            var r = e.diffPropNames, i = {}, a = this.types, o = 0;
            o < r.length;
            o++
          ) {
            var s = r[o],
              l = t[s],
              u = n.pstyle(s);
            if (!l) {
              if (!u) continue;
              l = u.bypass
                ? { name: s, deleteBypassed: !0 }
                : { name: s, delete: !0 };
            }
            if (u !== l) {
              if (
                l.mapped === a.fn &&
                null != u &&
                null != u.mapping &&
                u.mapping.value === l.value
              ) {
                var c = u.mapping;
                if ((c.fnValue = l.value(n)) === c.prevFnValue) continue;
              }
              var d = (i[s] = { prev: u });
              this.applyParsedProperty(n, l),
                (d.next = n.pstyle(s)),
                d.next && d.next.bypass && (d.next = d.next.bypassed);
            }
          }
          return { diffProps: i };
        }),
        (jo.updateStyleHints = function (e) {
          var t = e._private,
            n = this,
            r = n.propertyGroupNames,
            i = n.propertyGroupKeys,
            a = function (e, t, r) {
              return n.getPropertiesHash(e, t, r);
            },
            o = t.styleKey;
          if (e.removed()) return !1;
          var s = "nodes" === t.group,
            l = e._private.style;
          r = Object.keys(l);
          for (var u = 0; u < i.length; u++) {
            var c = i[u];
            t.styleKeys[c] = [Ce, ke];
          }
          for (
            var d,
              h = function (e, n) {
                return (t.styleKeys[n][0] = Se(e, t.styleKeys[n][0]));
              },
              p = function (e, n) {
                return (t.styleKeys[n][1] = Pe(e, t.styleKeys[n][1]));
              },
              f = function (e, t) {
                h(e, t), p(e, t);
              },
              g = function (e, t) {
                for (var n = 0; n < e.length; n++) {
                  var r = e.charCodeAt(n);
                  h(r, t), p(r, t);
                }
              },
              v = 0;
            v < r.length;
            v++
          ) {
            var y = r[v],
              m = l[y];
            if (null != m) {
              var b = this.properties[y],
                x = b.type,
                w = b.groupKey,
                E = void 0;
              null != b.hashOverride
                ? (E = b.hashOverride(e, m))
                : null != m.pfValue && (E = m.pfValue);
              var C = null == b.enums ? m.value : null,
                k = null != E,
                T = k || null != C,
                S = m.units;
              x.number && T && !x.multiple
                ? (f(
                    -128 < (d = k ? E : C) && d < 128 && Math.floor(d) !== d
                      ? 2e9 - ((1024 * d) | 0)
                      : d,
                    w
                  ),
                  k || null == S || g(S, w))
                : g(m.strValue, w);
            }
          }
          for (var P = [Ce, ke], D = 0; D < i.length; D++) {
            var _ = i[D],
              M = t.styleKeys[_];
            (P[0] = Se(M[0], P[0])), (P[1] = Pe(M[1], P[1]));
          }
          t.styleKey = 2097152 * P[0] + P[1];
          var N = t.styleKeys;
          t.labelDimsKey = De(N.labelDimensions);
          var I = a(e, ["label"], N.labelDimensions);
          if (
            ((t.labelKey = De(I)),
            (t.labelStyleKey = De(_e(N.commonLabel, I))),
            !s)
          ) {
            var B = a(e, ["source-label"], N.labelDimensions);
            (t.sourceLabelKey = De(B)),
              (t.sourceLabelStyleKey = De(_e(N.commonLabel, B)));
            var A = a(e, ["target-label"], N.labelDimensions);
            (t.targetLabelKey = De(A)),
              (t.targetLabelStyleKey = De(_e(N.commonLabel, A)));
          }
          if (s) {
            var L = t.styleKeys,
              O = L.nodeBody,
              R = L.nodeBorder,
              z = L.nodeOutline,
              F = L.backgroundImage,
              V = L.compound,
              q = L.pie,
              j = [O, R, z, F, V, q]
                .filter(function (e) {
                  return null != e;
                })
                .reduce(_e, [Ce, ke]);
            (t.nodeKey = De(j)),
              (t.hasPie = null != q && q[0] !== Ce && q[1] !== ke);
          }
          return o !== t.styleKey;
        }),
        (jo.clearStyleHints = function (e) {
          var t = e._private;
          (t.styleCxtKey = ""),
            (t.styleKeys = {}),
            (t.styleKey = null),
            (t.labelKey = null),
            (t.labelStyleKey = null),
            (t.sourceLabelKey = null),
            (t.sourceLabelStyleKey = null),
            (t.targetLabelKey = null),
            (t.targetLabelStyleKey = null),
            (t.nodeKey = null),
            (t.hasPie = null);
        }),
        (jo.applyParsedProperty = function (e, t) {
          var n,
            r = this,
            i = t,
            a = e._private.style,
            o = r.types,
            s = r.properties[i.name].type,
            l = i.bypass,
            u = a[i.name],
            c = u && u.bypass,
            d = e._private,
            h = "mapping",
            p = function (e) {
              return null == e ? null : null != e.pfValue ? e.pfValue : e.value;
            },
            f = function () {
              var t = p(u),
                n = p(i);
              r.checkTriggers(e, i.name, t, n);
            };
          if (
            ("curve-style" === t.name &&
              e.isEdge() &&
              (("bezier" !== t.value && e.isLoop()) ||
                ("haystack" === t.value &&
                  (e.source().isParent() || e.target().isParent()))) &&
              (i = t = this.parse(t.name, "bezier", l)),
            i.delete)
          )
            return (a[i.name] = void 0), f(), !0;
          if (i.deleteBypassed)
            return u
              ? !!u.bypass && ((u.bypassed = void 0), f(), !0)
              : (f(), !0);
          if (i.deleteBypass)
            return u
              ? !!u.bypass && ((a[i.name] = u.bypassed), f(), !0)
              : (f(), !0);
          var g = function () {
            Ye(
              "Do not assign mappings to elements without corresponding data (i.e. ele `" +
                e.id() +
                "` has no mapping for property `" +
                i.name +
                "` with data field `" +
                i.field +
                "`); try a `[" +
                i.field +
                "]` selector to limit scope to elements with `" +
                i.field +
                "` defined"
            );
          };
          switch (i.mapped) {
            case o.mapData:
              for (
                var v, y = i.field.split("."), m = d.data, b = 0;
                b < y.length && m;
                b++
              )
                m = m[y[b]];
              if (null == m) return g(), !1;
              if (!E(m))
                return (
                  Ye(
                    "Do not use continuous mappers without specifying numeric data (i.e. `" +
                      i.field +
                      ": " +
                      m +
                      "` for `" +
                      e.id() +
                      "` is non-numeric)"
                  ),
                  !1
                );
              var x = i.fieldMax - i.fieldMin;
              if (
                ((v = 0 === x ? 0 : (m - i.fieldMin) / x) < 0
                  ? (v = 0)
                  : v > 1 && (v = 1),
                s.color)
              ) {
                var w = i.valueMin[0],
                  C = i.valueMax[0],
                  k = i.valueMin[1],
                  T = i.valueMax[1],
                  S = i.valueMin[2],
                  P = i.valueMax[2],
                  D = null == i.valueMin[3] ? 1 : i.valueMin[3],
                  _ = null == i.valueMax[3] ? 1 : i.valueMax[3],
                  M = [
                    Math.round(w + (C - w) * v),
                    Math.round(k + (T - k) * v),
                    Math.round(S + (P - S) * v),
                    Math.round(D + (_ - D) * v),
                  ];
                n = {
                  bypass: i.bypass,
                  name: i.name,
                  value: M,
                  strValue: "rgb(" + M[0] + ", " + M[1] + ", " + M[2] + ")",
                };
              } else {
                if (!s.number) return !1;
                var N = i.valueMin + (i.valueMax - i.valueMin) * v;
                n = this.parse(i.name, N, i.bypass, h);
              }
              if (!n) return g(), !1;
              (n.mapping = i), (i = n);
              break;
            case o.data:
              for (
                var I = i.field.split("."), B = d.data, A = 0;
                A < I.length && B;
                A++
              )
                B = B[I[A]];
              if ((null != B && (n = this.parse(i.name, B, i.bypass, h)), !n))
                return g(), !1;
              (n.mapping = i), (i = n);
              break;
            case o.fn:
              var L = i.value,
                O = null != i.fnValue ? i.fnValue : L(e);
              if (((i.prevFnValue = O), null == O))
                return (
                  Ye(
                    "Custom function mappers may not return null (i.e. `" +
                      i.name +
                      "` for ele `" +
                      e.id() +
                      "` is null)"
                  ),
                  !1
                );
              if (!(n = this.parse(i.name, O, i.bypass, h)))
                return (
                  Ye(
                    "Custom function mappers may not return invalid values for the property type (i.e. `" +
                      i.name +
                      "` for ele `" +
                      e.id() +
                      "` is invalid)"
                  ),
                  !1
                );
              (n.mapping = Xe(i)), (i = n);
              break;
            case void 0:
              break;
            default:
              return !1;
          }
          return (
            l
              ? ((i.bypassed = c ? u.bypassed : u), (a[i.name] = i))
              : c
              ? (u.bypassed = i)
              : (a[i.name] = i),
            f(),
            !0
          );
        }),
        (jo.cleanElements = function (e, t) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];
            if (
              (this.clearStyleHints(r),
              r.dirtyCompoundBoundsCache(),
              r.dirtyBoundingBoxCache(),
              t)
            )
              for (
                var i = r._private.style, a = Object.keys(i), o = 0;
                o < a.length;
                o++
              ) {
                var s = a[o],
                  l = i[s];
                null != l && (l.bypass ? (l.bypassed = null) : (i[s] = null));
              }
            else r._private.style = {};
          }
        }),
        (jo.update = function () {
          this._private.cy.mutableElements().updateStyle();
        }),
        (jo.updateTransitions = function (e, t) {
          var n = this,
            r = e._private,
            i = e.pstyle("transition-property").value,
            a = e.pstyle("transition-duration").pfValue,
            o = e.pstyle("transition-delay").pfValue;
          if (i.length > 0 && a > 0) {
            for (var s = {}, l = !1, u = 0; u < i.length; u++) {
              var c = i[u],
                d = e.pstyle(c),
                h = t[c];
              if (h) {
                var p = h.prev,
                  f = null != h.next ? h.next : d,
                  g = !1,
                  v = void 0,
                  y = 1e-6;
                p &&
                  (E(p.pfValue) && E(f.pfValue)
                    ? ((g = f.pfValue - p.pfValue), (v = p.pfValue + y * g))
                    : E(p.value) && E(f.value)
                    ? ((g = f.value - p.value), (v = p.value + y * g))
                    : x(p.value) &&
                      x(f.value) &&
                      ((g =
                        p.value[0] !== f.value[0] ||
                        p.value[1] !== f.value[1] ||
                        p.value[2] !== f.value[2]),
                      (v = p.strValue)),
                  g &&
                    ((s[c] = f.strValue), this.applyBypass(e, c, v), (l = !0)));
              }
            }
            if (!l) return;
            (r.transitioning = !0),
              new wr(function (t) {
                o > 0 ? e.delayAnimation(o).play().promise().then(t) : t();
              })
                .then(function () {
                  return e
                    .animation({
                      style: s,
                      duration: a,
                      easing: e.pstyle("transition-timing-function").value,
                      queue: !1,
                    })
                    .play()
                    .promise();
                })
                .then(function () {
                  n.removeBypasses(e, i),
                    e.emitAndNotify("style"),
                    (r.transitioning = !1);
                });
          } else
            r.transitioning &&
              (this.removeBypasses(e, i),
              e.emitAndNotify("style"),
              (r.transitioning = !1));
        }),
        (jo.checkTrigger = function (e, t, n, r, i, a) {
          var o = this.properties[t],
            s = i(o);
          null != s && s(n, r) && a(o);
        }),
        (jo.checkZOrderTrigger = function (e, t, n, r) {
          var i = this;
          this.checkTrigger(
            e,
            t,
            n,
            r,
            function (e) {
              return e.triggersZOrder;
            },
            function () {
              i._private.cy.notify("zorder", e);
            }
          );
        }),
        (jo.checkBoundsTrigger = function (e, t, n, r) {
          this.checkTrigger(
            e,
            t,
            n,
            r,
            function (e) {
              return e.triggersBounds;
            },
            function (i) {
              e.dirtyCompoundBoundsCache(),
                e.dirtyBoundingBoxCache(),
                !i.triggersBoundsOfParallelBeziers ||
                  "curve-style" !== t ||
                  ("bezier" !== n && "bezier" !== r) ||
                  e.parallelEdges().forEach(function (e) {
                    e.isBundledBezier() && e.dirtyBoundingBoxCache();
                  }),
                !i.triggersBoundsOfConnectedEdges ||
                  "display" !== t ||
                  ("none" !== n && "none" !== r) ||
                  e.connectedEdges().forEach(function (e) {
                    e.dirtyBoundingBoxCache();
                  });
            }
          );
        }),
        (jo.checkTriggers = function (e, t, n, r) {
          e.dirtyStyleCache(),
            this.checkZOrderTrigger(e, t, n, r),
            this.checkBoundsTrigger(e, t, n, r);
        });
      var Xo = {
          applyBypass: function (e, t, n, r) {
            var i = [];
            if ("*" === t || "**" === t) {
              if (void 0 !== n)
                for (var a = 0; a < this.properties.length; a++) {
                  var o = this.properties[a].name,
                    s = this.parse(o, n, !0);
                  s && i.push(s);
                }
            } else if (m(t)) {
              var l = this.parse(t, n, !0);
              l && i.push(l);
            } else {
              if (!w(t)) return !1;
              var u = t;
              r = n;
              for (var c = Object.keys(u), d = 0; d < c.length; d++) {
                var h = c[d],
                  p = u[h];
                if ((void 0 === p && (p = u[B(h)]), void 0 !== p)) {
                  var f = this.parse(h, p, !0);
                  f && i.push(f);
                }
              }
            }
            if (0 === i.length) return !1;
            for (var g = !1, v = 0; v < e.length; v++) {
              for (var y = e[v], b = {}, x = void 0, E = 0; E < i.length; E++) {
                var C = i[E];
                if (r) {
                  var k = y.pstyle(C.name);
                  x = b[C.name] = { prev: k };
                }
                (g = this.applyParsedProperty(y, Xe(C)) || g),
                  r && (x.next = y.pstyle(C.name));
              }
              g && this.updateStyleHints(y),
                r && this.updateTransitions(y, b, !0);
            }
            return g;
          },
          overrideBypass: function (e, t, n) {
            t = I(t);
            for (var r = 0; r < e.length; r++) {
              var i = e[r],
                a = i._private.style[t],
                o = this.properties[t].type,
                s = o.color,
                l = o.mutiple,
                u = a ? (null != a.pfValue ? a.pfValue : a.value) : null;
              a && a.bypass
                ? ((a.value = n),
                  null != a.pfValue && (a.pfValue = n),
                  (a.strValue = s
                    ? "rgb(" + n.join(",") + ")"
                    : l
                    ? n.join(" ")
                    : "" + n),
                  this.updateStyleHints(i))
                : this.applyBypass(i, t, n),
                this.checkTriggers(i, t, u, n);
            }
          },
          removeAllBypasses: function (e, t) {
            return this.removeBypasses(e, this.propertyNames, t);
          },
          removeBypasses: function (e, t, n) {
            for (var r = 0; r < e.length; r++) {
              for (var i = e[r], a = {}, o = 0; o < t.length; o++) {
                var s = t[o],
                  l = this.properties[s],
                  u = i.pstyle(l.name);
                if (u && u.bypass) {
                  var c = this.parse(s, "", !0),
                    d = (a[l.name] = { prev: u });
                  this.applyParsedProperty(i, c), (d.next = i.pstyle(l.name));
                }
              }
              this.updateStyleHints(i), n && this.updateTransitions(i, a, !0);
            }
          },
        },
        Wo = {
          getEmSizeInPixels: function () {
            var e = this.containerCss("font-size");
            return null != e ? parseFloat(e) : 1;
          },
          containerCss: function (e) {
            var t = this._private.cy,
              n = t.container(),
              r = t.window();
            if (r && n && r.getComputedStyle)
              return r.getComputedStyle(n).getPropertyValue(e);
          },
        },
        Ho = {
          getRenderedStyle: function (e, t) {
            return t
              ? this.getStylePropertyValue(e, t, !0)
              : this.getRawStyle(e, !0);
          },
          getRawStyle: function (e, t) {
            var n = this;
            if ((e = e[0])) {
              for (var r = {}, i = 0; i < n.properties.length; i++) {
                var a = n.properties[i],
                  o = n.getStylePropertyValue(e, a.name, t);
                null != o && ((r[a.name] = o), (r[B(a.name)] = o));
              }
              return r;
            }
          },
          getIndexedStyle: function (e, t, n, r) {
            var i = e.pstyle(t)[n][r];
            return null != i ? i : e.cy().style().getDefaultProperty(t)[n][0];
          },
          getStylePropertyValue: function (e, t, n) {
            if ((e = e[0])) {
              var r = this.properties[t];
              r.alias && (r = r.pointsTo);
              var i = r.type,
                a = e.pstyle(r.name);
              if (a) {
                var o = a.value,
                  s = a.units,
                  l = a.strValue;
                if (n && i.number && null != o && E(o)) {
                  var u = e.cy().zoom(),
                    c = function (e) {
                      return e * u;
                    },
                    d = function (e, t) {
                      return c(e) + t;
                    },
                    h = x(o);
                  return (
                    h
                      ? s.every(function (e) {
                          return null != e;
                        })
                      : null != s
                  )
                    ? h
                      ? o
                          .map(function (e, t) {
                            return d(e, s[t]);
                          })
                          .join(" ")
                      : d(o, s)
                    : h
                    ? o
                        .map(function (e) {
                          return m(e) ? e : "" + c(e);
                        })
                        .join(" ")
                    : "" + c(o);
                }
                if (null != l) return l;
              }
              return null;
            }
          },
          getAnimationStartStyle: function (e, t) {
            for (var n = {}, r = 0; r < t.length; r++) {
              var i = t[r].name,
                a = e.pstyle(i);
              void 0 !== a &&
                (a = w(a) ? this.parse(i, a.strValue) : this.parse(i, a)),
                a && (n[i] = a);
            }
            return n;
          },
          getPropsList: function (e) {
            var t = [],
              n = e,
              r = this.properties;
            if (n)
              for (var i = Object.keys(n), a = 0; a < i.length; a++) {
                var o = i[a],
                  s = n[o],
                  l = r[o] || r[I(o)],
                  u = this.parse(l.name, s);
                u && t.push(u);
              }
            return t;
          },
          getNonDefaultPropertiesHash: function (e, t, n) {
            var r,
              i,
              a,
              o,
              s,
              l,
              u = n.slice();
            for (s = 0; s < t.length; s++)
              if (((r = t[s]), null != (i = e.pstyle(r, !1))))
                if (null != i.pfValue)
                  (u[0] = Se(o, u[0])), (u[1] = Pe(o, u[1]));
                else
                  for (a = i.strValue, l = 0; l < a.length; l++)
                    (o = a.charCodeAt(l)),
                      (u[0] = Se(o, u[0])),
                      (u[1] = Pe(o, u[1]));
            return u;
          },
        };
      Ho.getPropertiesHash = Ho.getNonDefaultPropertiesHash;
      var Go = {
          appendFromJson: function (e) {
            for (var t = this, n = 0; n < e.length; n++) {
              var r = e[n],
                i = r.selector,
                a = r.style || r.css,
                o = Object.keys(a);
              t.selector(i);
              for (var s = 0; s < o.length; s++) {
                var l = o[s],
                  u = a[l];
                t.css(l, u);
              }
            }
            return t;
          },
          fromJson: function (e) {
            var t = this;
            return t.resetToDefault(), t.appendFromJson(e), t;
          },
          json: function () {
            for (var e = [], t = this.defaultLength; t < this.length; t++) {
              for (
                var n = this[t],
                  r = n.selector,
                  i = n.properties,
                  a = {},
                  o = 0;
                o < i.length;
                o++
              ) {
                var s = i[o];
                a[s.name] = s.strValue;
              }
              e.push({ selector: r ? r.toString() : "core", style: a });
            }
            return e;
          },
        },
        Uo = {
          appendFromString: function (e) {
            var t,
              n,
              r,
              i = this,
              a = "" + e;
            function o() {
              a = a.length > t.length ? a.substr(t.length) : "";
            }
            function s() {
              n = n.length > r.length ? n.substr(r.length) : "";
            }
            for (
              a = a.replace(/[/][*](\s|.)+?[*][/]/g, "");
              !a.match(/^\s*$/);

            ) {
              var l = a.match(/^\s*((?:.|\s)+?)\s*\{((?:.|\s)+?)\}/);
              if (!l) {
                Ye(
                  "Halting stylesheet parsing: String stylesheet contains more to parse but no selector and block found in: " +
                    a
                );
                break;
              }
              t = l[0];
              var u = l[1];
              if ("core" !== u && new qi(u).invalid)
                Ye(
                  "Skipping parsing of block: Invalid selector found in string stylesheet: " +
                    u
                ),
                  o();
              else {
                var c = l[2],
                  d = !1;
                n = c;
                for (var h = []; !n.match(/^\s*$/); ) {
                  var p = n.match(/^\s*(.+?)\s*:\s*(.+?)(?:\s*;|\s*$)/);
                  if (!p) {
                    Ye(
                      "Skipping parsing of block: Invalid formatting of style property and value definitions found in:" +
                        c
                    ),
                      (d = !0);
                    break;
                  }
                  r = p[0];
                  var f = p[1],
                    g = p[2];
                  this.properties[f]
                    ? i.parse(f, g)
                      ? (h.push({ name: f, val: g }), s())
                      : (Ye(
                          "Skipping property: Invalid property definition in: " +
                            r
                        ),
                        s())
                    : (Ye("Skipping property: Invalid property name in: " + r),
                      s());
                }
                if (d) {
                  o();
                  break;
                }
                i.selector(u);
                for (var v = 0; v < h.length; v++) {
                  var y = h[v];
                  i.css(y.name, y.val);
                }
                o();
              }
            }
            return i;
          },
          fromString: function (e) {
            var t = this;
            return t.resetToDefault(), t.appendFromString(e), t;
          },
        },
        Ko = {};
      !(function () {
        var e = O,
          t = z,
          n = V,
          r = function (e) {
            return "^" + e + "\\s*\\(\\s*([\\w\\.]+)\\s*\\)$";
          },
          i = function (r) {
            var i =
              e +
              "|\\w+|" +
              t +
              "|" +
              n +
              "|\\#[0-9a-fA-F]{3}|\\#[0-9a-fA-F]{6}";
            return (
              "^" +
              r +
              "\\s*\\(([\\w\\.]+)\\s*\\,\\s*(" +
              e +
              ")\\s*\\,\\s*(" +
              e +
              ")\\s*,\\s*(" +
              i +
              ")\\s*\\,\\s*(" +
              i +
              ")\\)$"
            );
          },
          a = [
            "^url\\s*\\(\\s*['\"]?(.+?)['\"]?\\s*\\)$",
            "^(none)$",
            "^(.+)$",
          ];
        Ko.types = {
          time: { number: !0, min: 0, units: "s|ms", implicitUnits: "ms" },
          percent: {
            number: !0,
            min: 0,
            max: 100,
            units: "%",
            implicitUnits: "%",
          },
          percentages: {
            number: !0,
            min: 0,
            max: 100,
            units: "%",
            implicitUnits: "%",
            multiple: !0,
          },
          zeroOneNumber: { number: !0, min: 0, max: 1, unitless: !0 },
          zeroOneNumbers: {
            number: !0,
            min: 0,
            max: 1,
            unitless: !0,
            multiple: !0,
          },
          nOneOneNumber: { number: !0, min: -1, max: 1, unitless: !0 },
          nonNegativeInt: { number: !0, min: 0, integer: !0, unitless: !0 },
          nonNegativeNumber: { number: !0, min: 0, unitless: !0 },
          position: { enums: ["parent", "origin"] },
          nodeSize: { number: !0, min: 0, enums: ["label"] },
          number: { number: !0, unitless: !0 },
          numbers: { number: !0, unitless: !0, multiple: !0 },
          positiveNumber: { number: !0, unitless: !0, min: 0, strictMin: !0 },
          size: { number: !0, min: 0 },
          bidirectionalSize: { number: !0 },
          bidirectionalSizeMaybePercent: { number: !0, allowPercent: !0 },
          bidirectionalSizes: { number: !0, multiple: !0 },
          sizeMaybePercent: { number: !0, min: 0, allowPercent: !0 },
          axisDirection: {
            enums: [
              "horizontal",
              "leftward",
              "rightward",
              "vertical",
              "upward",
              "downward",
              "auto",
            ],
          },
          paddingRelativeTo: {
            enums: ["width", "height", "average", "min", "max"],
          },
          bgWH: {
            number: !0,
            min: 0,
            allowPercent: !0,
            enums: ["auto"],
            multiple: !0,
          },
          bgPos: { number: !0, allowPercent: !0, multiple: !0 },
          bgRelativeTo: { enums: ["inner", "include-padding"], multiple: !0 },
          bgRepeat: {
            enums: ["repeat", "repeat-x", "repeat-y", "no-repeat"],
            multiple: !0,
          },
          bgFit: { enums: ["none", "contain", "cover"], multiple: !0 },
          bgCrossOrigin: {
            enums: ["anonymous", "use-credentials", "null"],
            multiple: !0,
          },
          bgClip: { enums: ["none", "node"], multiple: !0 },
          bgContainment: { enums: ["inside", "over"], multiple: !0 },
          color: { color: !0 },
          colors: { color: !0, multiple: !0 },
          fill: { enums: ["solid", "linear-gradient", "radial-gradient"] },
          bool: { enums: ["yes", "no"] },
          bools: { enums: ["yes", "no"], multiple: !0 },
          lineStyle: { enums: ["solid", "dotted", "dashed"] },
          lineCap: { enums: ["butt", "round", "square"] },
          linePosition: { enums: ["center", "inside", "outside"] },
          lineJoin: { enums: ["round", "bevel", "miter"] },
          borderStyle: { enums: ["solid", "dotted", "dashed", "double"] },
          curveStyle: {
            enums: [
              "bezier",
              "unbundled-bezier",
              "haystack",
              "segments",
              "straight",
              "straight-triangle",
              "taxi",
              "round-segments",
              "round-taxi",
            ],
          },
          radiusType: {
            enums: ["arc-radius", "influence-radius"],
            multiple: !0,
          },
          fontFamily: { regex: '^([\\w- \\"]+(?:\\s*,\\s*[\\w- \\"]+)*)$' },
          fontStyle: { enums: ["italic", "normal", "oblique"] },
          fontWeight: {
            enums: [
              "normal",
              "bold",
              "bolder",
              "lighter",
              "100",
              "200",
              "300",
              "400",
              "500",
              "600",
              "800",
              "900",
              100,
              200,
              300,
              400,
              500,
              600,
              700,
              800,
              900,
            ],
          },
          textDecoration: {
            enums: ["none", "underline", "overline", "line-through"],
          },
          textTransform: { enums: ["none", "uppercase", "lowercase"] },
          textWrap: { enums: ["none", "wrap", "ellipsis"] },
          textOverflowWrap: { enums: ["whitespace", "anywhere"] },
          textBackgroundShape: {
            enums: ["rectangle", "roundrectangle", "round-rectangle"],
          },
          nodeShape: {
            enums: [
              "rectangle",
              "roundrectangle",
              "round-rectangle",
              "cutrectangle",
              "cut-rectangle",
              "bottomroundrectangle",
              "bottom-round-rectangle",
              "barrel",
              "ellipse",
              "triangle",
              "round-triangle",
              "square",
              "pentagon",
              "round-pentagon",
              "hexagon",
              "round-hexagon",
              "concavehexagon",
              "concave-hexagon",
              "heptagon",
              "round-heptagon",
              "octagon",
              "round-octagon",
              "tag",
              "round-tag",
              "star",
              "diamond",
              "round-diamond",
              "vee",
              "rhomboid",
              "right-rhomboid",
              "polygon",
            ],
          },
          overlayShape: {
            enums: ["roundrectangle", "round-rectangle", "ellipse"],
          },
          cornerRadius: {
            number: !0,
            min: 0,
            units: "px|em",
            implicitUnits: "px",
            enums: ["auto"],
          },
          compoundIncludeLabels: { enums: ["include", "exclude"] },
          arrowShape: {
            enums: [
              "tee",
              "triangle",
              "triangle-tee",
              "circle-triangle",
              "triangle-cross",
              "triangle-backcurve",
              "vee",
              "square",
              "circle",
              "diamond",
              "chevron",
              "none",
            ],
          },
          arrowFill: { enums: ["filled", "hollow"] },
          arrowWidth: {
            number: !0,
            units: "%|px|em",
            implicitUnits: "px",
            enums: ["match-line"],
          },
          display: { enums: ["element", "none"] },
          visibility: { enums: ["hidden", "visible"] },
          zCompoundDepth: { enums: ["bottom", "orphan", "auto", "top"] },
          zIndexCompare: { enums: ["auto", "manual"] },
          valign: { enums: ["top", "center", "bottom"] },
          halign: { enums: ["left", "center", "right"] },
          justification: { enums: ["left", "center", "right", "auto"] },
          text: { string: !0 },
          data: { mapping: !0, regex: r("data") },
          layoutData: { mapping: !0, regex: r("layoutData") },
          scratch: { mapping: !0, regex: r("scratch") },
          mapData: { mapping: !0, regex: i("mapData") },
          mapLayoutData: { mapping: !0, regex: i("mapLayoutData") },
          mapScratch: { mapping: !0, regex: i("mapScratch") },
          fn: { mapping: !0, fn: !0 },
          url: { regexes: a, singleRegexMatchValue: !0 },
          urls: { regexes: a, singleRegexMatchValue: !0, multiple: !0 },
          propList: { propList: !0 },
          angle: { number: !0, units: "deg|rad", implicitUnits: "rad" },
          textRotation: {
            number: !0,
            units: "deg|rad",
            implicitUnits: "rad",
            enums: ["none", "autorotate"],
          },
          polygonPointList: {
            number: !0,
            multiple: !0,
            evenMultiple: !0,
            min: -1,
            max: 1,
            unitless: !0,
          },
          edgeDistances: {
            enums: ["intersection", "node-position", "endpoints"],
          },
          edgeEndpoint: {
            number: !0,
            multiple: !0,
            units: "%|px|em|deg|rad",
            implicitUnits: "px",
            enums: [
              "inside-to-node",
              "outside-to-node",
              "outside-to-node-or-label",
              "outside-to-line",
              "outside-to-line-or-label",
            ],
            singleEnum: !0,
            validate: function (e, t) {
              switch (e.length) {
                case 2:
                  return (
                    "deg" !== t[0] &&
                    "rad" !== t[0] &&
                    "deg" !== t[1] &&
                    "rad" !== t[1]
                  );
                case 1:
                  return m(e[0]) || "deg" === t[0] || "rad" === t[0];
                default:
                  return !1;
              }
            },
          },
          easing: {
            regexes: [
              "^(spring)\\s*\\(\\s*(" + e + ")\\s*,\\s*(" + e + ")\\s*\\)$",
              "^(cubic-bezier)\\s*\\(\\s*(" +
                e +
                ")\\s*,\\s*(" +
                e +
                ")\\s*,\\s*(" +
                e +
                ")\\s*,\\s*(" +
                e +
                ")\\s*\\)$",
            ],
            enums: [
              "linear",
              "ease",
              "ease-in",
              "ease-out",
              "ease-in-out",
              "ease-in-sine",
              "ease-out-sine",
              "ease-in-out-sine",
              "ease-in-quad",
              "ease-out-quad",
              "ease-in-out-quad",
              "ease-in-cubic",
              "ease-out-cubic",
              "ease-in-out-cubic",
              "ease-in-quart",
              "ease-out-quart",
              "ease-in-out-quart",
              "ease-in-quint",
              "ease-out-quint",
              "ease-in-out-quint",
              "ease-in-expo",
              "ease-out-expo",
              "ease-in-out-expo",
              "ease-in-circ",
              "ease-out-circ",
              "ease-in-out-circ",
            ],
          },
          gradientDirection: {
            enums: [
              "to-bottom",
              "to-top",
              "to-left",
              "to-right",
              "to-bottom-right",
              "to-bottom-left",
              "to-top-right",
              "to-top-left",
              "to-right-bottom",
              "to-left-bottom",
              "to-right-top",
              "to-left-top",
            ],
          },
          boundsExpansion: {
            number: !0,
            multiple: !0,
            min: 0,
            validate: function (e) {
              var t = e.length;
              return 1 === t || 2 === t || 4 === t;
            },
          },
        };
        var o = {
            zeroNonZero: function (e, t) {
              return (
                ((null == e || null == t) && e !== t) ||
                (0 == e && 0 != t) ||
                (0 != e && 0 == t)
              );
            },
            any: function (e, t) {
              return e != t;
            },
            emptyNonEmpty: function (e, t) {
              var n = _(e),
                r = _(t);
              return (n && !r) || (!n && r);
            },
          },
          s = Ko.types,
          l = [
            {
              name: "label",
              type: s.text,
              triggersBounds: o.any,
              triggersZOrder: o.emptyNonEmpty,
            },
            {
              name: "text-rotation",
              type: s.textRotation,
              triggersBounds: o.any,
            },
            {
              name: "text-margin-x",
              type: s.bidirectionalSize,
              triggersBounds: o.any,
            },
            {
              name: "text-margin-y",
              type: s.bidirectionalSize,
              triggersBounds: o.any,
            },
          ],
          u = [
            { name: "source-label", type: s.text, triggersBounds: o.any },
            {
              name: "source-text-rotation",
              type: s.textRotation,
              triggersBounds: o.any,
            },
            {
              name: "source-text-margin-x",
              type: s.bidirectionalSize,
              triggersBounds: o.any,
            },
            {
              name: "source-text-margin-y",
              type: s.bidirectionalSize,
              triggersBounds: o.any,
            },
            { name: "source-text-offset", type: s.size, triggersBounds: o.any },
          ],
          c = [
            { name: "target-label", type: s.text, triggersBounds: o.any },
            {
              name: "target-text-rotation",
              type: s.textRotation,
              triggersBounds: o.any,
            },
            {
              name: "target-text-margin-x",
              type: s.bidirectionalSize,
              triggersBounds: o.any,
            },
            {
              name: "target-text-margin-y",
              type: s.bidirectionalSize,
              triggersBounds: o.any,
            },
            { name: "target-text-offset", type: s.size, triggersBounds: o.any },
          ],
          d = [
            { name: "font-family", type: s.fontFamily, triggersBounds: o.any },
            { name: "font-style", type: s.fontStyle, triggersBounds: o.any },
            { name: "font-weight", type: s.fontWeight, triggersBounds: o.any },
            { name: "font-size", type: s.size, triggersBounds: o.any },
            {
              name: "text-transform",
              type: s.textTransform,
              triggersBounds: o.any,
            },
            { name: "text-wrap", type: s.textWrap, triggersBounds: o.any },
            {
              name: "text-overflow-wrap",
              type: s.textOverflowWrap,
              triggersBounds: o.any,
            },
            { name: "text-max-width", type: s.size, triggersBounds: o.any },
            { name: "text-outline-width", type: s.size, triggersBounds: o.any },
            {
              name: "line-height",
              type: s.positiveNumber,
              triggersBounds: o.any,
            },
          ],
          h = [
            { name: "text-valign", type: s.valign, triggersBounds: o.any },
            { name: "text-halign", type: s.halign, triggersBounds: o.any },
            { name: "color", type: s.color },
            { name: "text-outline-color", type: s.color },
            { name: "text-outline-opacity", type: s.zeroOneNumber },
            { name: "text-background-color", type: s.color },
            { name: "text-background-opacity", type: s.zeroOneNumber },
            {
              name: "text-background-padding",
              type: s.size,
              triggersBounds: o.any,
            },
            { name: "text-border-opacity", type: s.zeroOneNumber },
            { name: "text-border-color", type: s.color },
            { name: "text-border-width", type: s.size, triggersBounds: o.any },
            {
              name: "text-border-style",
              type: s.borderStyle,
              triggersBounds: o.any,
            },
            {
              name: "text-background-shape",
              type: s.textBackgroundShape,
              triggersBounds: o.any,
            },
            { name: "text-justification", type: s.justification },
          ],
          p = [
            { name: "events", type: s.bool, triggersZOrder: o.any },
            { name: "text-events", type: s.bool, triggersZOrder: o.any },
          ],
          f = [
            {
              name: "display",
              type: s.display,
              triggersZOrder: o.any,
              triggersBounds: o.any,
              triggersBoundsOfConnectedEdges: !0,
            },
            { name: "visibility", type: s.visibility, triggersZOrder: o.any },
            {
              name: "opacity",
              type: s.zeroOneNumber,
              triggersZOrder: o.zeroNonZero,
            },
            { name: "text-opacity", type: s.zeroOneNumber },
            { name: "min-zoomed-font-size", type: s.size },
            {
              name: "z-compound-depth",
              type: s.zCompoundDepth,
              triggersZOrder: o.any,
            },
            {
              name: "z-index-compare",
              type: s.zIndexCompare,
              triggersZOrder: o.any,
            },
            { name: "z-index", type: s.number, triggersZOrder: o.any },
          ],
          g = [
            { name: "overlay-padding", type: s.size, triggersBounds: o.any },
            { name: "overlay-color", type: s.color },
            {
              name: "overlay-opacity",
              type: s.zeroOneNumber,
              triggersBounds: o.zeroNonZero,
            },
            {
              name: "overlay-shape",
              type: s.overlayShape,
              triggersBounds: o.any,
            },
            { name: "overlay-corner-radius", type: s.cornerRadius },
          ],
          v = [
            { name: "underlay-padding", type: s.size, triggersBounds: o.any },
            { name: "underlay-color", type: s.color },
            {
              name: "underlay-opacity",
              type: s.zeroOneNumber,
              triggersBounds: o.zeroNonZero,
            },
            {
              name: "underlay-shape",
              type: s.overlayShape,
              triggersBounds: o.any,
            },
            { name: "underlay-corner-radius", type: s.cornerRadius },
          ],
          y = [
            { name: "transition-property", type: s.propList },
            { name: "transition-duration", type: s.time },
            { name: "transition-delay", type: s.time },
            { name: "transition-timing-function", type: s.easing },
          ],
          b = function (e, t) {
            return "label" === t.value ? -e.poolIndex() : t.pfValue;
          },
          x = [
            {
              name: "height",
              type: s.nodeSize,
              triggersBounds: o.any,
              hashOverride: b,
            },
            {
              name: "width",
              type: s.nodeSize,
              triggersBounds: o.any,
              hashOverride: b,
            },
            { name: "shape", type: s.nodeShape, triggersBounds: o.any },
            {
              name: "shape-polygon-points",
              type: s.polygonPointList,
              triggersBounds: o.any,
            },
            { name: "corner-radius", type: s.cornerRadius },
            { name: "background-color", type: s.color },
            { name: "background-fill", type: s.fill },
            { name: "background-opacity", type: s.zeroOneNumber },
            { name: "background-blacken", type: s.nOneOneNumber },
            { name: "background-gradient-stop-colors", type: s.colors },
            { name: "background-gradient-stop-positions", type: s.percentages },
            {
              name: "background-gradient-direction",
              type: s.gradientDirection,
            },
            {
              name: "padding",
              type: s.sizeMaybePercent,
              triggersBounds: o.any,
            },
            {
              name: "padding-relative-to",
              type: s.paddingRelativeTo,
              triggersBounds: o.any,
            },
            {
              name: "bounds-expansion",
              type: s.boundsExpansion,
              triggersBounds: o.any,
            },
          ],
          w = [
            { name: "border-color", type: s.color },
            { name: "border-opacity", type: s.zeroOneNumber },
            { name: "border-width", type: s.size, triggersBounds: o.any },
            { name: "border-style", type: s.borderStyle },
            { name: "border-cap", type: s.lineCap },
            { name: "border-join", type: s.lineJoin },
            { name: "border-dash-pattern", type: s.numbers },
            { name: "border-dash-offset", type: s.number },
            { name: "border-position", type: s.linePosition },
          ],
          E = [
            { name: "outline-color", type: s.color },
            { name: "outline-opacity", type: s.zeroOneNumber },
            { name: "outline-width", type: s.size, triggersBounds: o.any },
            { name: "outline-style", type: s.borderStyle },
            { name: "outline-offset", type: s.size, triggersBounds: o.any },
          ],
          C = [
            { name: "background-image", type: s.urls },
            { name: "background-image-crossorigin", type: s.bgCrossOrigin },
            { name: "background-image-opacity", type: s.zeroOneNumbers },
            { name: "background-image-containment", type: s.bgContainment },
            { name: "background-image-smoothing", type: s.bools },
            { name: "background-position-x", type: s.bgPos },
            { name: "background-position-y", type: s.bgPos },
            { name: "background-width-relative-to", type: s.bgRelativeTo },
            { name: "background-height-relative-to", type: s.bgRelativeTo },
            { name: "background-repeat", type: s.bgRepeat },
            { name: "background-fit", type: s.bgFit },
            { name: "background-clip", type: s.bgClip },
            { name: "background-width", type: s.bgWH },
            { name: "background-height", type: s.bgWH },
            { name: "background-offset-x", type: s.bgPos },
            { name: "background-offset-y", type: s.bgPos },
          ],
          k = [
            { name: "position", type: s.position, triggersBounds: o.any },
            {
              name: "compound-sizing-wrt-labels",
              type: s.compoundIncludeLabels,
              triggersBounds: o.any,
            },
            { name: "min-width", type: s.size, triggersBounds: o.any },
            {
              name: "min-width-bias-left",
              type: s.sizeMaybePercent,
              triggersBounds: o.any,
            },
            {
              name: "min-width-bias-right",
              type: s.sizeMaybePercent,
              triggersBounds: o.any,
            },
            { name: "min-height", type: s.size, triggersBounds: o.any },
            {
              name: "min-height-bias-top",
              type: s.sizeMaybePercent,
              triggersBounds: o.any,
            },
            {
              name: "min-height-bias-bottom",
              type: s.sizeMaybePercent,
              triggersBounds: o.any,
            },
          ],
          T = [
            { name: "line-style", type: s.lineStyle },
            { name: "line-color", type: s.color },
            { name: "line-fill", type: s.fill },
            { name: "line-cap", type: s.lineCap },
            { name: "line-opacity", type: s.zeroOneNumber },
            { name: "line-dash-pattern", type: s.numbers },
            { name: "line-dash-offset", type: s.number },
            { name: "line-gradient-stop-colors", type: s.colors },
            { name: "line-gradient-stop-positions", type: s.percentages },
            {
              name: "curve-style",
              type: s.curveStyle,
              triggersBounds: o.any,
              triggersBoundsOfParallelBeziers: !0,
            },
            {
              name: "haystack-radius",
              type: s.zeroOneNumber,
              triggersBounds: o.any,
            },
            {
              name: "source-endpoint",
              type: s.edgeEndpoint,
              triggersBounds: o.any,
            },
            {
              name: "target-endpoint",
              type: s.edgeEndpoint,
              triggersBounds: o.any,
            },
            {
              name: "control-point-step-size",
              type: s.size,
              triggersBounds: o.any,
            },
            {
              name: "control-point-distances",
              type: s.bidirectionalSizes,
              triggersBounds: o.any,
            },
            {
              name: "control-point-weights",
              type: s.numbers,
              triggersBounds: o.any,
            },
            {
              name: "segment-distances",
              type: s.bidirectionalSizes,
              triggersBounds: o.any,
            },
            { name: "segment-weights", type: s.numbers, triggersBounds: o.any },
            { name: "segment-radii", type: s.numbers, triggersBounds: o.any },
            { name: "radius-type", type: s.radiusType, triggersBounds: o.any },
            {
              name: "taxi-turn",
              type: s.bidirectionalSizeMaybePercent,
              triggersBounds: o.any,
            },
            {
              name: "taxi-turn-min-distance",
              type: s.size,
              triggersBounds: o.any,
            },
            {
              name: "taxi-direction",
              type: s.axisDirection,
              triggersBounds: o.any,
            },
            { name: "taxi-radius", type: s.number, triggersBounds: o.any },
            {
              name: "edge-distances",
              type: s.edgeDistances,
              triggersBounds: o.any,
            },
            {
              name: "arrow-scale",
              type: s.positiveNumber,
              triggersBounds: o.any,
            },
            { name: "loop-direction", type: s.angle, triggersBounds: o.any },
            { name: "loop-sweep", type: s.angle, triggersBounds: o.any },
            {
              name: "source-distance-from-node",
              type: s.size,
              triggersBounds: o.any,
            },
            {
              name: "target-distance-from-node",
              type: s.size,
              triggersBounds: o.any,
            },
          ],
          S = [
            { name: "ghost", type: s.bool, triggersBounds: o.any },
            {
              name: "ghost-offset-x",
              type: s.bidirectionalSize,
              triggersBounds: o.any,
            },
            {
              name: "ghost-offset-y",
              type: s.bidirectionalSize,
              triggersBounds: o.any,
            },
            { name: "ghost-opacity", type: s.zeroOneNumber },
          ],
          P = [
            { name: "selection-box-color", type: s.color },
            { name: "selection-box-opacity", type: s.zeroOneNumber },
            { name: "selection-box-border-color", type: s.color },
            { name: "selection-box-border-width", type: s.size },
            { name: "active-bg-color", type: s.color },
            { name: "active-bg-opacity", type: s.zeroOneNumber },
            { name: "active-bg-size", type: s.size },
            { name: "outside-texture-bg-color", type: s.color },
            { name: "outside-texture-bg-opacity", type: s.zeroOneNumber },
          ],
          D = [];
        (Ko.pieBackgroundN = 16),
          D.push({ name: "pie-size", type: s.sizeMaybePercent });
        for (var M = 1; M <= Ko.pieBackgroundN; M++)
          D.push({ name: "pie-" + M + "-background-color", type: s.color }),
            D.push({ name: "pie-" + M + "-background-size", type: s.percent }),
            D.push({
              name: "pie-" + M + "-background-opacity",
              type: s.zeroOneNumber,
            });
        var N = [],
          I = (Ko.arrowPrefixes = [
            "source",
            "mid-source",
            "target",
            "mid-target",
          ]);
        [
          { name: "arrow-shape", type: s.arrowShape, triggersBounds: o.any },
          { name: "arrow-color", type: s.color },
          { name: "arrow-fill", type: s.arrowFill },
          { name: "arrow-width", type: s.arrowWidth },
        ].forEach(function (e) {
          I.forEach(function (t) {
            var n = t + "-" + e.name,
              r = e.type,
              i = e.triggersBounds;
            N.push({ name: n, type: r, triggersBounds: i });
          });
        }, {});
        var B = (Ko.properties = [].concat(
            p,
            y,
            f,
            g,
            v,
            S,
            h,
            d,
            l,
            u,
            c,
            x,
            w,
            E,
            C,
            D,
            k,
            T,
            N,
            P
          )),
          A = (Ko.propertyGroups = {
            behavior: p,
            transition: y,
            visibility: f,
            overlay: g,
            underlay: v,
            ghost: S,
            commonLabel: h,
            labelDimensions: d,
            mainLabel: l,
            sourceLabel: u,
            targetLabel: c,
            nodeBody: x,
            nodeBorder: w,
            nodeOutline: E,
            backgroundImage: C,
            pie: D,
            compound: k,
            edgeLine: T,
            edgeArrow: N,
            core: P,
          }),
          L = (Ko.propertyGroupNames = {});
        (Ko.propertyGroupKeys = Object.keys(A)).forEach(function (e) {
          (L[e] = A[e].map(function (e) {
            return e.name;
          })),
            A[e].forEach(function (t) {
              return (t.groupKey = e);
            });
        });
        var R = (Ko.aliases = [
          { name: "content", pointsTo: "label" },
          {
            name: "control-point-distance",
            pointsTo: "control-point-distances",
          },
          { name: "control-point-weight", pointsTo: "control-point-weights" },
          { name: "segment-distance", pointsTo: "segment-distances" },
          { name: "segment-weight", pointsTo: "segment-weights" },
          { name: "segment-radius", pointsTo: "segment-radii" },
          { name: "edge-text-rotation", pointsTo: "text-rotation" },
          { name: "padding-left", pointsTo: "padding" },
          { name: "padding-right", pointsTo: "padding" },
          { name: "padding-top", pointsTo: "padding" },
          { name: "padding-bottom", pointsTo: "padding" },
        ]);
        Ko.propertyNames = B.map(function (e) {
          return e.name;
        });
        for (var F = 0; F < B.length; F++) {
          var q = B[F];
          B[q.name] = q;
        }
        for (var j = 0; j < R.length; j++) {
          var Y = R[j],
            X = B[Y.pointsTo],
            W = { name: Y.name, alias: !0, pointsTo: X };
          B.push(W), (B[Y.name] = W);
        }
      })(),
        (Ko.getDefaultProperty = function (e) {
          return this.getDefaultProperties()[e];
        }),
        (Ko.getDefaultProperties = function () {
          var e = this._private;
          if (null != e.defaultProperties) return e.defaultProperties;
          for (
            var t = j(
                {
                  "selection-box-color": "#ddd",
                  "selection-box-opacity": 0.65,
                  "selection-box-border-color": "#aaa",
                  "selection-box-border-width": 1,
                  "active-bg-color": "black",
                  "active-bg-opacity": 0.15,
                  "active-bg-size": 30,
                  "outside-texture-bg-color": "#000",
                  "outside-texture-bg-opacity": 0.125,
                  events: "yes",
                  "text-events": "no",
                  "text-valign": "top",
                  "text-halign": "center",
                  "text-justification": "auto",
                  "line-height": 1,
                  color: "#000",
                  "text-outline-color": "#000",
                  "text-outline-width": 0,
                  "text-outline-opacity": 1,
                  "text-opacity": 1,
                  "text-decoration": "none",
                  "text-transform": "none",
                  "text-wrap": "none",
                  "text-overflow-wrap": "whitespace",
                  "text-max-width": 9999,
                  "text-background-color": "#000",
                  "text-background-opacity": 0,
                  "text-background-shape": "rectangle",
                  "text-background-padding": 0,
                  "text-border-opacity": 0,
                  "text-border-width": 0,
                  "text-border-style": "solid",
                  "text-border-color": "#000",
                  "font-family": "Helvetica Neue, Helvetica, sans-serif",
                  "font-style": "normal",
                  "font-weight": "normal",
                  "font-size": 16,
                  "min-zoomed-font-size": 0,
                  "text-rotation": "none",
                  "source-text-rotation": "none",
                  "target-text-rotation": "none",
                  visibility: "visible",
                  display: "element",
                  opacity: 1,
                  "z-compound-depth": "auto",
                  "z-index-compare": "auto",
                  "z-index": 0,
                  label: "",
                  "text-margin-x": 0,
                  "text-margin-y": 0,
                  "source-label": "",
                  "source-text-offset": 0,
                  "source-text-margin-x": 0,
                  "source-text-margin-y": 0,
                  "target-label": "",
                  "target-text-offset": 0,
                  "target-text-margin-x": 0,
                  "target-text-margin-y": 0,
                  "overlay-opacity": 0,
                  "overlay-color": "#000",
                  "overlay-padding": 10,
                  "overlay-shape": "round-rectangle",
                  "overlay-corner-radius": "auto",
                  "underlay-opacity": 0,
                  "underlay-color": "#000",
                  "underlay-padding": 10,
                  "underlay-shape": "round-rectangle",
                  "underlay-corner-radius": "auto",
                  "transition-property": "none",
                  "transition-duration": 0,
                  "transition-delay": 0,
                  "transition-timing-function": "linear",
                  "background-blacken": 0,
                  "background-color": "#999",
                  "background-fill": "solid",
                  "background-opacity": 1,
                  "background-image": "none",
                  "background-image-crossorigin": "anonymous",
                  "background-image-opacity": 1,
                  "background-image-containment": "inside",
                  "background-image-smoothing": "yes",
                  "background-position-x": "50%",
                  "background-position-y": "50%",
                  "background-offset-x": 0,
                  "background-offset-y": 0,
                  "background-width-relative-to": "include-padding",
                  "background-height-relative-to": "include-padding",
                  "background-repeat": "no-repeat",
                  "background-fit": "none",
                  "background-clip": "node",
                  "background-width": "auto",
                  "background-height": "auto",
                  "border-color": "#000",
                  "border-opacity": 1,
                  "border-width": 0,
                  "border-style": "solid",
                  "border-dash-pattern": [4, 2],
                  "border-dash-offset": 0,
                  "border-cap": "butt",
                  "border-join": "miter",
                  "border-position": "center",
                  "outline-color": "#999",
                  "outline-opacity": 1,
                  "outline-width": 0,
                  "outline-offset": 0,
                  "outline-style": "solid",
                  height: 30,
                  width: 30,
                  shape: "ellipse",
                  "shape-polygon-points": "-1, -1,   1, -1,   1, 1,   -1, 1",
                  "corner-radius": "auto",
                  "bounds-expansion": 0,
                  "background-gradient-direction": "to-bottom",
                  "background-gradient-stop-colors": "#999",
                  "background-gradient-stop-positions": "0%",
                  ghost: "no",
                  "ghost-offset-y": 0,
                  "ghost-offset-x": 0,
                  "ghost-opacity": 0,
                  padding: 0,
                  "padding-relative-to": "width",
                  position: "origin",
                  "compound-sizing-wrt-labels": "include",
                  "min-width": 0,
                  "min-width-bias-left": 0,
                  "min-width-bias-right": 0,
                  "min-height": 0,
                  "min-height-bias-top": 0,
                  "min-height-bias-bottom": 0,
                },
                { "pie-size": "100%" },
                [
                  { name: "pie-{{i}}-background-color", value: "black" },
                  { name: "pie-{{i}}-background-size", value: "0%" },
                  { name: "pie-{{i}}-background-opacity", value: 1 },
                ].reduce(function (e, t) {
                  for (var n = 1; n <= Ko.pieBackgroundN; n++) {
                    var r = t.name.replace("{{i}}", n),
                      i = t.value;
                    e[r] = i;
                  }
                  return e;
                }, {}),
                {
                  "line-style": "solid",
                  "line-color": "#999",
                  "line-fill": "solid",
                  "line-cap": "butt",
                  "line-opacity": 1,
                  "line-gradient-stop-colors": "#999",
                  "line-gradient-stop-positions": "0%",
                  "control-point-step-size": 40,
                  "control-point-weights": 0.5,
                  "segment-weights": 0.5,
                  "segment-distances": 20,
                  "segment-radii": 15,
                  "radius-type": "arc-radius",
                  "taxi-turn": "50%",
                  "taxi-radius": 15,
                  "taxi-turn-min-distance": 10,
                  "taxi-direction": "auto",
                  "edge-distances": "intersection",
                  "curve-style": "haystack",
                  "haystack-radius": 0,
                  "arrow-scale": 1,
                  "loop-direction": "-45deg",
                  "loop-sweep": "-90deg",
                  "source-distance-from-node": 0,
                  "target-distance-from-node": 0,
                  "source-endpoint": "outside-to-node",
                  "target-endpoint": "outside-to-node",
                  "line-dash-pattern": [6, 3],
                  "line-dash-offset": 0,
                },
                [
                  { name: "arrow-shape", value: "none" },
                  { name: "arrow-color", value: "#999" },
                  { name: "arrow-fill", value: "filled" },
                  { name: "arrow-width", value: 1 },
                ].reduce(function (e, t) {
                  return (
                    Ko.arrowPrefixes.forEach(function (n) {
                      var r = n + "-" + t.name,
                        i = t.value;
                      e[r] = i;
                    }),
                    e
                  );
                }, {})
              ),
              n = {},
              r = 0;
            r < this.properties.length;
            r++
          ) {
            var i = this.properties[r];
            if (!i.pointsTo) {
              var a = i.name,
                o = t[a],
                s = this.parse(a, o);
              n[a] = s;
            }
          }
          return (e.defaultProperties = n), e.defaultProperties;
        }),
        (Ko.addDefaultStylesheet = function () {
          this.selector(":parent")
            .css({
              shape: "rectangle",
              padding: 10,
              "background-color": "#eee",
              "border-color": "#ccc",
              "border-width": 1,
            })
            .selector("edge")
            .css({ width: 3 })
            .selector(":loop")
            .css({ "curve-style": "bezier" })
            .selector("edge:compound")
            .css({
              "curve-style": "bezier",
              "source-endpoint": "outside-to-line",
              "target-endpoint": "outside-to-line",
            })
            .selector(":selected")
            .css({
              "background-color": "#0169D9",
              "line-color": "#0169D9",
              "source-arrow-color": "#0169D9",
              "target-arrow-color": "#0169D9",
              "mid-source-arrow-color": "#0169D9",
              "mid-target-arrow-color": "#0169D9",
            })
            .selector(":parent:selected")
            .css({ "background-color": "#CCE1F9", "border-color": "#aec8e5" })
            .selector(":active")
            .css({
              "overlay-color": "black",
              "overlay-padding": 10,
              "overlay-opacity": 0.25,
            }),
            (this.defaultLength = this.length);
        });
      var Zo = {
        parse: function (e, t, n, r) {
          var i = this;
          if (b(t)) return i.parseImplWarn(e, t, n, r);
          var a,
            o = Ne(
              e,
              "" + t,
              n ? "t" : "f",
              "mapping" === r || !0 === r || !1 === r || null == r
                ? "dontcare"
                : r
            ),
            s = (i.propCache = i.propCache || []);
          return (
            (a = s[o]) || (a = s[o] = i.parseImplWarn(e, t, n, r)),
            (n || "mapping" === r) && (a = Xe(a)) && (a.value = Xe(a.value)),
            a
          );
        },
        parseImplWarn: function (e, t, n, r) {
          var i = this.parseImpl(e, t, n, r);
          return (
            i ||
              null == t ||
              Ye(
                "The style property `".concat(e, ": ").concat(t, "` is invalid")
              ),
            !i ||
              ("width" !== i.name && "height" !== i.name) ||
              "label" !== t ||
              Ye(
                "The style value of `label` is deprecated for `" + i.name + "`"
              ),
            i
          );
        },
      };
      Zo.parseImpl = function (e, t, n, r) {
        var i = this;
        e = I(e);
        var a = i.properties[e],
          o = t,
          s = i.types;
        if (!a) return null;
        if (void 0 === t) return null;
        a.alias && ((a = a.pointsTo), (e = a.name));
        var l = m(t);
        l && (t = t.trim());
        var u,
          c,
          d = a.type;
        if (!d) return null;
        if (n && ("" === t || null === t))
          return { name: e, value: t, bypass: !0, deleteBypass: !0 };
        if (b(t))
          return { name: e, value: t, strValue: "fn", mapped: s.fn, bypass: n };
        if (!l || r || t.length < 7 || "a" !== t[1]);
        else {
          if (
            t.length >= 7 &&
            "d" === t[0] &&
            (u = new RegExp(s.data.regex).exec(t))
          ) {
            if (n) return !1;
            var h = s.data;
            return {
              name: e,
              value: u,
              strValue: "" + t,
              mapped: h,
              field: u[1],
              bypass: n,
            };
          }
          if (
            t.length >= 10 &&
            "m" === t[0] &&
            (c = new RegExp(s.mapData.regex).exec(t))
          ) {
            if (n) return !1;
            if (d.multiple) return !1;
            var p = s.mapData;
            if (!d.color && !d.number) return !1;
            var f = this.parse(e, c[4]);
            if (!f || f.mapped) return !1;
            var g = this.parse(e, c[5]);
            if (!g || g.mapped) return !1;
            if (f.pfValue === g.pfValue || f.strValue === g.strValue)
              return (
                Ye(
                  "`" +
                    e +
                    ": " +
                    t +
                    "` is not a valid mapper because the output range is zero; converting to `" +
                    e +
                    ": " +
                    f.strValue +
                    "`"
                ),
                this.parse(e, f.strValue)
              );
            if (d.color) {
              var v = f.value,
                y = g.value;
              if (
                !(
                  v[0] !== y[0] ||
                  v[1] !== y[1] ||
                  v[2] !== y[2] ||
                  (v[3] !== y[3] &&
                    ((null != v[3] && 1 !== v[3]) ||
                      (null != y[3] && 1 !== y[3])))
                )
              )
                return !1;
            }
            return {
              name: e,
              value: c,
              strValue: "" + t,
              mapped: p,
              field: c[1],
              fieldMin: parseFloat(c[2]),
              fieldMax: parseFloat(c[3]),
              valueMin: f.value,
              valueMax: g.value,
              bypass: n,
            };
          }
        }
        if (d.multiple && "multiple" !== r) {
          var w;
          if (
            ((w = l ? t.split(/\s+/) : x(t) ? t : [t]),
            d.evenMultiple && w.length % 2 != 0)
          )
            return null;
          for (
            var C = [], k = [], T = [], S = "", P = !1, D = 0;
            D < w.length;
            D++
          ) {
            var _ = i.parse(e, w[D], n, "multiple");
            (P = P || m(_.value)),
              C.push(_.value),
              T.push(null != _.pfValue ? _.pfValue : _.value),
              k.push(_.units),
              (S += (D > 0 ? " " : "") + _.strValue);
          }
          return d.validate && !d.validate(C, k)
            ? null
            : d.singleEnum && P
            ? 1 === C.length && m(C[0])
              ? { name: e, value: C[0], strValue: C[0], bypass: n }
              : null
            : {
                name: e,
                value: C,
                pfValue: T,
                strValue: S,
                bypass: n,
                units: k,
              };
        }
        var M,
          N,
          B,
          A = function () {
            for (var r = 0; r < d.enums.length; r++)
              if (d.enums[r] === t)
                return { name: e, value: t, strValue: "" + t, bypass: n };
            return null;
          };
        if (d.number) {
          var L,
            z = "px";
          if (
            (d.units && (L = d.units),
            d.implicitUnits && (z = d.implicitUnits),
            !d.unitless)
          )
            if (l) {
              var V = "px|em" + (d.allowPercent ? "|\\%" : "");
              L && (V = L);
              var q = t.match("^(" + O + ")(" + V + ")?$");
              q && ((t = q[1]), (L = q[2] || z));
            } else (L && !d.implicitUnits) || (L = z);
          if (((t = parseFloat(t)), isNaN(t) && void 0 === d.enums))
            return null;
          if (isNaN(t) && void 0 !== d.enums) return (t = o), A();
          if (d.integer && (!E((N = t)) || Math.floor(N) !== N)) return null;
          if (
            (void 0 !== d.min && (t < d.min || (d.strictMin && t === d.min))) ||
            (void 0 !== d.max && (t > d.max || (d.strictMax && t === d.max)))
          )
            return null;
          var j = {
            name: e,
            value: t,
            strValue: "" + t + (L || ""),
            units: L,
            bypass: n,
          };
          return (
            d.unitless || ("px" !== L && "em" !== L)
              ? (j.pfValue = t)
              : (j.pfValue =
                  "px" !== L && L ? this.getEmSizeInPixels() * t : t),
            ("ms" !== L && "s" !== L) || (j.pfValue = "ms" === L ? t : 1e3 * t),
            ("deg" !== L && "rad" !== L) ||
              (j.pfValue = "rad" === L ? t : ((M = t), (Math.PI * M) / 180)),
            "%" === L && (j.pfValue = t / 100),
            j
          );
        }
        if (d.propList) {
          var X = [],
            W = "" + t;
          if ("none" === W);
          else {
            for (var H = W.split(/\s*,\s*|\s+/), G = 0; G < H.length; G++) {
              var U = H[G].trim();
              i.properties[U]
                ? X.push(U)
                : Ye("`" + U + "` is not a valid property name");
            }
            if (0 === X.length) return null;
          }
          return {
            name: e,
            value: X,
            strValue: 0 === X.length ? "none" : X.join(" "),
            bypass: n,
          };
        }
        if (d.color) {
          var K =
            (x((B = t)) ? B : null) ||
            (function (e) {
              return Y[e.toLowerCase()];
            })(B) ||
            (function (e) {
              if ((4 === e.length || 7 === e.length) && "#" === e[0]) {
                var t,
                  n,
                  r,
                  i = 16;
                return (
                  4 === e.length
                    ? ((t = parseInt(e[1] + e[1], i)),
                      (n = parseInt(e[2] + e[2], i)),
                      (r = parseInt(e[3] + e[3], i)))
                    : ((t = parseInt(e[1] + e[2], i)),
                      (n = parseInt(e[3] + e[4], i)),
                      (r = parseInt(e[5] + e[6], i))),
                  [t, n, r]
                );
              }
            })(B) ||
            (function (e) {
              var t,
                n = new RegExp("^" + R + "$").exec(e);
              if (n) {
                t = [];
                for (var r = [], i = 1; i <= 3; i++) {
                  var a = n[i];
                  if (
                    ("%" === a[a.length - 1] && (r[i] = !0),
                    (a = parseFloat(a)),
                    r[i] && (a = (a / 100) * 255),
                    a < 0 || a > 255)
                  )
                    return;
                  t.push(Math.floor(a));
                }
                var o = r[1] || r[2] || r[3],
                  s = r[1] && r[2] && r[3];
                if (o && !s) return;
                var l = n[4];
                if (void 0 !== l) {
                  if ((l = parseFloat(l)) < 0 || l > 1) return;
                  t.push(l);
                }
              }
              return t;
            })(B) ||
            (function (e) {
              var t, n, r, i, a, o, s, l;
              function u(e, t, n) {
                return (
                  n < 0 && (n += 1),
                  n > 1 && (n -= 1),
                  n < 1 / 6
                    ? e + 6 * (t - e) * n
                    : n < 0.5
                    ? t
                    : n < 2 / 3
                    ? e + (t - e) * (2 / 3 - n) * 6
                    : e
                );
              }
              var c = new RegExp("^" + F + "$").exec(e);
              if (c) {
                if (
                  ((n = parseInt(c[1])) < 0
                    ? (n = (360 - ((-1 * n) % 360)) % 360)
                    : n > 360 && (n %= 360),
                  (n /= 360),
                  (r = parseFloat(c[2])) < 0 || r > 100)
                )
                  return;
                if (((r /= 100), (i = parseFloat(c[3])) < 0 || i > 100)) return;
                if (
                  ((i /= 100),
                  void 0 !== (a = c[4]) && ((a = parseFloat(a)) < 0 || a > 1))
                )
                  return;
                if (0 === r) o = s = l = Math.round(255 * i);
                else {
                  var d = i < 0.5 ? i * (1 + r) : i + r - i * r,
                    h = 2 * i - d;
                  (o = Math.round(255 * u(h, d, n + 1 / 3))),
                    (s = Math.round(255 * u(h, d, n))),
                    (l = Math.round(255 * u(h, d, n - 1 / 3)));
                }
                t = [o, s, l, a];
              }
              return t;
            })(B);
          return K
            ? {
                name: e,
                value: K,
                pfValue: K,
                strValue: "rgb(" + K[0] + "," + K[1] + "," + K[2] + ")",
                bypass: n,
              }
            : null;
        }
        if (d.regex || d.regexes) {
          if (d.enums) {
            var Z = A();
            if (Z) return Z;
          }
          for (
            var $ = d.regexes ? d.regexes : [d.regex], Q = 0;
            Q < $.length;
            Q++
          ) {
            var J = new RegExp($[Q]).exec(t);
            if (J)
              return {
                name: e,
                value: d.singleRegexMatchValue ? J[1] : J,
                strValue: "" + t,
                bypass: n,
              };
          }
          return null;
        }
        return d.string
          ? { name: e, value: "" + t, strValue: "" + t, bypass: n }
          : d.enums
          ? A()
          : null;
      };
      var $o = function e(t) {
          if (!(this instanceof e)) return new e(t);
          P(t)
            ? ((this._private = { cy: t, coreStyle: {} }),
              (this.length = 0),
              this.resetToDefault())
            : qe("A style must have a core reference");
        },
        Qo = $o.prototype;
      (Qo.instanceString = function () {
        return "style";
      }),
        (Qo.clear = function () {
          for (
            var e = this._private, t = e.cy.elements(), n = 0;
            n < this.length;
            n++
          )
            this[n] = void 0;
          return (
            (this.length = 0),
            (e.contextStyles = {}),
            (e.propDiffs = {}),
            this.cleanElements(t, !0),
            t.forEach(function (e) {
              var t = e[0]._private;
              (t.styleDirty = !0), (t.appliedInitStyle = !1);
            }),
            this
          );
        }),
        (Qo.resetToDefault = function () {
          return this.clear(), this.addDefaultStylesheet(), this;
        }),
        (Qo.core = function (e) {
          return this._private.coreStyle[e] || this.getDefaultProperty(e);
        }),
        (Qo.selector = function (e) {
          var t = "core" === e ? null : new qi(e),
            n = this.length++;
          return (
            (this[n] = {
              selector: t,
              properties: [],
              mappedProperties: [],
              index: n,
            }),
            this
          );
        }),
        (Qo.css = function () {
          var e = arguments;
          if (1 === e.length)
            for (var t = e[0], n = 0; n < this.properties.length; n++) {
              var r = this.properties[n],
                i = t[r.name];
              void 0 === i && (i = t[B(r.name)]),
                void 0 !== i && this.cssRule(r.name, i);
            }
          else 2 === e.length && this.cssRule(e[0], e[1]);
          return this;
        }),
        (Qo.style = Qo.css),
        (Qo.cssRule = function (e, t) {
          var n = this.parse(e, t);
          if (n) {
            var r = this.length - 1;
            this[r].properties.push(n),
              (this[r].properties[n.name] = n),
              n.name.match(/pie-(\d+)-background-size/) &&
                n.value &&
                (this._private.hasPie = !0),
              n.mapped && this[r].mappedProperties.push(n),
              !this[r].selector && (this._private.coreStyle[n.name] = n);
          }
          return this;
        }),
        (Qo.append = function (e) {
          return (
            D(e)
              ? e.appendToStyle(this)
              : x(e)
              ? this.appendFromJson(e)
              : m(e) && this.appendFromString(e),
            this
          );
        }),
        ($o.fromJson = function (e, t) {
          var n = new $o(e);
          return n.fromJson(t), n;
        }),
        ($o.fromString = function (e, t) {
          return new $o(e).fromString(t);
        }),
        [jo, Xo, Wo, Ho, Go, Uo, Ko, Zo].forEach(function (e) {
          j(Qo, e);
        }),
        ($o.types = Qo.types),
        ($o.properties = Qo.properties),
        ($o.propertyGroups = Qo.propertyGroups),
        ($o.propertyGroupNames = Qo.propertyGroupNames),
        ($o.propertyGroupKeys = Qo.propertyGroupKeys);
      var Jo = {
          style: function (e) {
            return e && this.setStyle(e).update(), this._private.style;
          },
          setStyle: function (e) {
            var t = this._private;
            return (
              D(e)
                ? (t.style = e.generateStyle(this))
                : x(e)
                ? (t.style = $o.fromJson(this, e))
                : m(e)
                ? (t.style = $o.fromString(this, e))
                : (t.style = $o(this)),
              t.style
            );
          },
          updateStyle: function () {
            this.mutableElements().updateStyle();
          },
        },
        es = {
          autolock: function (e) {
            return void 0 === e
              ? this._private.autolock
              : ((this._private.autolock = !!e), this);
          },
          autoungrabify: function (e) {
            return void 0 === e
              ? this._private.autoungrabify
              : ((this._private.autoungrabify = !!e), this);
          },
          autounselectify: function (e) {
            return void 0 === e
              ? this._private.autounselectify
              : ((this._private.autounselectify = !!e), this);
          },
          selectionType: function (e) {
            var t = this._private;
            return (
              null == t.selectionType && (t.selectionType = "single"),
              void 0 === e
                ? t.selectionType
                : (("additive" !== e && "single" !== e) ||
                    (t.selectionType = e),
                  this)
            );
          },
          panningEnabled: function (e) {
            return void 0 === e
              ? this._private.panningEnabled
              : ((this._private.panningEnabled = !!e), this);
          },
          userPanningEnabled: function (e) {
            return void 0 === e
              ? this._private.userPanningEnabled
              : ((this._private.userPanningEnabled = !!e), this);
          },
          zoomingEnabled: function (e) {
            return void 0 === e
              ? this._private.zoomingEnabled
              : ((this._private.zoomingEnabled = !!e), this);
          },
          userZoomingEnabled: function (e) {
            return void 0 === e
              ? this._private.userZoomingEnabled
              : ((this._private.userZoomingEnabled = !!e), this);
          },
          boxSelectionEnabled: function (e) {
            return void 0 === e
              ? this._private.boxSelectionEnabled
              : ((this._private.boxSelectionEnabled = !!e), this);
          },
          pan: function () {
            var e,
              t,
              n,
              r,
              i,
              a = arguments,
              o = this._private.pan;
            switch (a.length) {
              case 0:
                return o;
              case 1:
                if (m(a[0])) return o[(e = a[0])];
                if (w(a[0])) {
                  if (!this._private.panningEnabled) return this;
                  (r = (n = a[0]).x),
                    (i = n.y),
                    E(r) && (o.x = r),
                    E(i) && (o.y = i),
                    this.emit("pan viewport");
                }
                break;
              case 2:
                if (!this._private.panningEnabled) return this;
                (t = a[1]),
                  ("x" !== (e = a[0]) && "y" !== e) || !E(t) || (o[e] = t),
                  this.emit("pan viewport");
            }
            return this.notify("viewport"), this;
          },
          panBy: function (e, t) {
            var n,
              r,
              i,
              a,
              o,
              s = arguments,
              l = this._private.pan;
            if (!this._private.panningEnabled) return this;
            switch (s.length) {
              case 1:
                w(e) &&
                  ((a = (i = s[0]).x),
                  (o = i.y),
                  E(a) && (l.x += a),
                  E(o) && (l.y += o),
                  this.emit("pan viewport"));
                break;
              case 2:
                (r = t),
                  ("x" !== (n = e) && "y" !== n) || !E(r) || (l[n] += r),
                  this.emit("pan viewport");
            }
            return this.notify("viewport"), this;
          },
          fit: function (e, t) {
            var n = this.getFitViewport(e, t);
            if (n) {
              var r = this._private;
              (r.zoom = n.zoom),
                (r.pan = n.pan),
                this.emit("pan zoom viewport"),
                this.notify("viewport");
            }
            return this;
          },
          getFitViewport: function (e, t) {
            if (
              (E(e) && void 0 === t && ((t = e), (e = void 0)),
              this._private.panningEnabled && this._private.zoomingEnabled)
            ) {
              var n, r;
              if (m(e)) {
                var i = e;
                e = this.$(i);
              } else if (
                w((r = e)) &&
                E(r.x1) &&
                E(r.x2) &&
                E(r.y1) &&
                E(r.y2)
              ) {
                var a = e;
                ((n = { x1: a.x1, y1: a.y1, x2: a.x2, y2: a.y2 }).w =
                  n.x2 - n.x1),
                  (n.h = n.y2 - n.y1);
              } else k(e) || (e = this.mutableElements());
              if (!k(e) || !e.empty()) {
                n = n || e.boundingBox();
                var o,
                  s = this.width(),
                  l = this.height();
                if (
                  ((t = E(t) ? t : 0),
                  !isNaN(s) &&
                    !isNaN(l) &&
                    s > 0 &&
                    l > 0 &&
                    !isNaN(n.w) &&
                    !isNaN(n.h) &&
                    n.w > 0 &&
                    n.h > 0)
                )
                  return {
                    zoom: (o =
                      (o =
                        (o = Math.min((s - 2 * t) / n.w, (l - 2 * t) / n.h)) >
                        this._private.maxZoom
                          ? this._private.maxZoom
                          : o) < this._private.minZoom
                        ? this._private.minZoom
                        : o),
                    pan: {
                      x: (s - o * (n.x1 + n.x2)) / 2,
                      y: (l - o * (n.y1 + n.y2)) / 2,
                    },
                  };
              }
            }
          },
          zoomRange: function (e, t) {
            var n = this._private;
            if (null == t) {
              var r = e;
              (e = r.min), (t = r.max);
            }
            return (
              E(e) && E(t) && e <= t
                ? ((n.minZoom = e), (n.maxZoom = t))
                : E(e) && void 0 === t && e <= n.maxZoom
                ? (n.minZoom = e)
                : E(t) && void 0 === e && t >= n.minZoom && (n.maxZoom = t),
              this
            );
          },
          minZoom: function (e) {
            return void 0 === e
              ? this._private.minZoom
              : this.zoomRange({ min: e });
          },
          maxZoom: function (e) {
            return void 0 === e
              ? this._private.maxZoom
              : this.zoomRange({ max: e });
          },
          getZoomedViewport: function (e) {
            var t,
              n,
              r = this._private,
              i = r.pan,
              a = r.zoom,
              o = !1;
            if (
              (r.zoomingEnabled || (o = !0),
              E(e)
                ? (n = e)
                : w(e) &&
                  ((n = e.level),
                  null != e.position
                    ? (t = wt(e.position, a, i))
                    : null != e.renderedPosition && (t = e.renderedPosition),
                  null == t || r.panningEnabled || (o = !0)),
              (n =
                (n = n > r.maxZoom ? r.maxZoom : n) < r.minZoom
                  ? r.minZoom
                  : n),
              o || !E(n) || n === a || (null != t && (!E(t.x) || !E(t.y))))
            )
              return null;
            if (null != t) {
              var s = i,
                l = a,
                u = n;
              return {
                zoomed: !0,
                panned: !0,
                zoom: u,
                pan: {
                  x: (-u / l) * (t.x - s.x) + t.x,
                  y: (-u / l) * (t.y - s.y) + t.y,
                },
              };
            }
            return { zoomed: !0, panned: !1, zoom: n, pan: i };
          },
          zoom: function (e) {
            if (void 0 === e) return this._private.zoom;
            var t = this.getZoomedViewport(e),
              n = this._private;
            return null != t && t.zoomed
              ? ((n.zoom = t.zoom),
                t.panned && ((n.pan.x = t.pan.x), (n.pan.y = t.pan.y)),
                this.emit("zoom" + (t.panned ? " pan" : "") + " viewport"),
                this.notify("viewport"),
                this)
              : this;
          },
          viewport: function (e) {
            var t = this._private,
              n = !0,
              r = !0,
              i = [],
              a = !1,
              o = !1;
            if (!e) return this;
            if ((E(e.zoom) || (n = !1), w(e.pan) || (r = !1), !n && !r))
              return this;
            if (n) {
              var s = e.zoom;
              s < t.minZoom || s > t.maxZoom || !t.zoomingEnabled
                ? (a = !0)
                : ((t.zoom = s), i.push("zoom"));
            }
            if (r && (!a || !e.cancelOnFailedZoom) && t.panningEnabled) {
              var l = e.pan;
              E(l.x) && ((t.pan.x = l.x), (o = !1)),
                E(l.y) && ((t.pan.y = l.y), (o = !1)),
                o || i.push("pan");
            }
            return (
              i.length > 0 &&
                (i.push("viewport"),
                this.emit(i.join(" ")),
                this.notify("viewport")),
              this
            );
          },
          center: function (e) {
            var t = this.getCenterPan(e);
            return (
              t &&
                ((this._private.pan = t),
                this.emit("pan viewport"),
                this.notify("viewport")),
              this
            );
          },
          getCenterPan: function (e, t) {
            if (this._private.panningEnabled) {
              if (m(e)) {
                var n = e;
                e = this.mutableElements().filter(n);
              } else k(e) || (e = this.mutableElements());
              if (0 !== e.length) {
                var r = e.boundingBox(),
                  i = this.width(),
                  a = this.height();
                return {
                  x:
                    (i -
                      (t = void 0 === t ? this._private.zoom : t) *
                        (r.x1 + r.x2)) /
                    2,
                  y: (a - t * (r.y1 + r.y2)) / 2,
                };
              }
            }
          },
          reset: function () {
            return this._private.panningEnabled && this._private.zoomingEnabled
              ? (this.viewport({ pan: { x: 0, y: 0 }, zoom: 1 }), this)
              : this;
          },
          invalidateSize: function () {
            this._private.sizeCache = null;
          },
          size: function () {
            var e,
              t,
              n = this._private,
              r = n.container;
            return (n.sizeCache =
              n.sizeCache ||
              (r
                ? ((e = this.window().getComputedStyle(r)),
                  (t = function (t) {
                    return parseFloat(e.getPropertyValue(t));
                  }),
                  {
                    width:
                      r.clientWidth - t("padding-left") - t("padding-right"),
                    height:
                      r.clientHeight - t("padding-top") - t("padding-bottom"),
                  })
                : { width: 1, height: 1 }));
          },
          width: function () {
            return this.size().width;
          },
          height: function () {
            return this.size().height;
          },
          extent: function () {
            var e = this._private.pan,
              t = this._private.zoom,
              n = this.renderedExtent(),
              r = {
                x1: (n.x1 - e.x) / t,
                x2: (n.x2 - e.x) / t,
                y1: (n.y1 - e.y) / t,
                y2: (n.y2 - e.y) / t,
              };
            return (r.w = r.x2 - r.x1), (r.h = r.y2 - r.y1), r;
          },
          renderedExtent: function () {
            var e = this.width(),
              t = this.height();
            return { x1: 0, y1: 0, x2: e, y2: t, w: e, h: t };
          },
          multiClickDebounceTime: function (e) {
            return e
              ? ((this._private.multiClickDebounceTime = e), this)
              : this._private.multiClickDebounceTime;
          },
        };
      (es.centre = es.center),
        (es.autolockNodes = es.autolock),
        (es.autoungrabifyNodes = es.autoungrabify);
      var ts = {
        data: Ci.data({
          field: "data",
          bindingEvent: "data",
          allowBinding: !0,
          allowSetting: !0,
          settingEvent: "data",
          settingTriggersEvent: !0,
          triggerFnName: "trigger",
          allowGetting: !0,
          updateStyle: !0,
        }),
        removeData: Ci.removeData({
          field: "data",
          event: "data",
          triggerFnName: "trigger",
          triggerEvent: !0,
          updateStyle: !0,
        }),
        scratch: Ci.data({
          field: "scratch",
          bindingEvent: "scratch",
          allowBinding: !0,
          allowSetting: !0,
          settingEvent: "scratch",
          settingTriggersEvent: !0,
          triggerFnName: "trigger",
          allowGetting: !0,
          updateStyle: !0,
        }),
        removeScratch: Ci.removeData({
          field: "scratch",
          event: "scratch",
          triggerFnName: "trigger",
          triggerEvent: !0,
          updateStyle: !0,
        }),
      };
      (ts.attr = ts.data), (ts.removeAttr = ts.removeData);
      var ns = function (e) {
          var t = this,
            n = (e = j({}, e)).container;
          n && !C(n) && C(n[0]) && (n = n[0]);
          var r = n ? n._cyreg : null;
          (r = r || {}) && r.cy && (r.cy.destroy(), (r = {}));
          var i = (r.readies = r.readies || []);
          n && (n._cyreg = r), (r.cy = t);
          var a = void 0 !== d && void 0 !== n && !e.headless,
            o = e;
          (o.layout = j({ name: a ? "grid" : "null" }, o.layout)),
            (o.renderer = j({ name: a ? "canvas" : "null" }, o.renderer));
          var s = function (e, t, n) {
              return void 0 !== t ? t : void 0 !== n ? n : e;
            },
            l = (this._private = {
              container: n,
              ready: !1,
              options: o,
              elements: new mo(this),
              listeners: [],
              aniEles: new mo(this),
              data: o.data || {},
              scratch: {},
              layout: null,
              renderer: null,
              destroyed: !1,
              notificationsEnabled: !0,
              minZoom: 1e-50,
              maxZoom: 1e50,
              zoomingEnabled: s(!0, o.zoomingEnabled),
              userZoomingEnabled: s(!0, o.userZoomingEnabled),
              panningEnabled: s(!0, o.panningEnabled),
              userPanningEnabled: s(!0, o.userPanningEnabled),
              boxSelectionEnabled: s(!0, o.boxSelectionEnabled),
              autolock: s(!1, o.autolock, o.autolockNodes),
              autoungrabify: s(!1, o.autoungrabify, o.autoungrabifyNodes),
              autounselectify: s(!1, o.autounselectify),
              styleEnabled: void 0 === o.styleEnabled ? a : o.styleEnabled,
              zoom: E(o.zoom) ? o.zoom : 1,
              pan: {
                x: w(o.pan) && E(o.pan.x) ? o.pan.x : 0,
                y: w(o.pan) && E(o.pan.y) ? o.pan.y : 0,
              },
              animation: { current: [], queue: [] },
              hasCompoundNodes: !1,
              multiClickDebounceTime: s(250, o.multiClickDebounceTime),
            });
          this.createEmitter(),
            this.selectionType(o.selectionType),
            this.zoomRange({ min: o.minZoom, max: o.maxZoom }),
            l.styleEnabled && t.setStyle([]);
          var u = j({}, o, o.renderer);
          t.initRenderer(u),
            (function (e, t) {
              if (e.some(M)) return wr.all(e).then(t);
              t(e);
            })([o.style, o.elements], function (e) {
              var n = e[0],
                a = e[1];
              l.styleEnabled && t.style().append(n),
                (function (e, n, r) {
                  t.notifications(!1);
                  var i = t.mutableElements();
                  i.length > 0 && i.remove(),
                    null != e && (w(e) || x(e)) && t.add(e),
                    t
                      .one("layoutready", function (e) {
                        t.notifications(!0),
                          t.emit(e),
                          t.one("load", n),
                          t.emitAndNotify("load");
                      })
                      .one("layoutstop", function () {
                        t.one("done", r), t.emit("done");
                      });
                  var a = j({}, t._private.options.layout);
                  (a.eles = t.elements()), t.layout(a).run();
                })(
                  a,
                  function () {
                    t.startAnimationLoop(),
                      (l.ready = !0),
                      b(o.ready) && t.on("ready", o.ready);
                    for (var e = 0; e < i.length; e++) {
                      var n = i[e];
                      t.on("ready", n);
                    }
                    r && (r.readies = []), t.emit("ready");
                  },
                  o.done
                );
            });
        },
        rs = ns.prototype;
      j(rs, {
        instanceString: function () {
          return "core";
        },
        isReady: function () {
          return this._private.ready;
        },
        destroyed: function () {
          return this._private.destroyed;
        },
        ready: function (e) {
          return (
            this.isReady()
              ? this.emitter().emit("ready", [], e)
              : this.on("ready", e),
            this
          );
        },
        destroy: function () {
          var e = this;
          if (!e.destroyed())
            return (
              e.stopAnimationLoop(),
              e.destroyRenderer(),
              this.emit("destroy"),
              (e._private.destroyed = !0),
              e
            );
        },
        hasElementWithId: function (e) {
          return this._private.elements.hasElementWithId(e);
        },
        getElementById: function (e) {
          return this._private.elements.getElementById(e);
        },
        hasCompoundNodes: function () {
          return this._private.hasCompoundNodes;
        },
        headless: function () {
          return this._private.renderer.isHeadless();
        },
        styleEnabled: function () {
          return this._private.styleEnabled;
        },
        addToPool: function (e) {
          return this._private.elements.merge(e), this;
        },
        removeFromPool: function (e) {
          return this._private.elements.unmerge(e), this;
        },
        container: function () {
          return this._private.container || null;
        },
        window: function () {
          if (null == this._private.container) return d;
          var e = this._private.container.ownerDocument;
          return void 0 === e || null == e ? d : e.defaultView || d;
        },
        mount: function (e) {
          if (null != e) {
            var t = this,
              n = t._private,
              r = n.options;
            return (
              !C(e) && C(e[0]) && (e = e[0]),
              t.stopAnimationLoop(),
              t.destroyRenderer(),
              (n.container = e),
              (n.styleEnabled = !0),
              t.invalidateSize(),
              t.initRenderer(
                j({}, r, r.renderer, {
                  name: "null" === r.renderer.name ? "canvas" : r.renderer.name,
                })
              ),
              t.startAnimationLoop(),
              t.style(r.style),
              t.emit("mount"),
              t
            );
          }
        },
        unmount: function () {
          var e = this;
          return (
            e.stopAnimationLoop(),
            e.destroyRenderer(),
            e.initRenderer({ name: "null" }),
            e.emit("unmount"),
            e
          );
        },
        options: function () {
          return Xe(this._private.options);
        },
        json: function (e) {
          var t = this,
            n = t._private,
            r = t.mutableElements();
          if (w(e)) {
            if ((t.startBatch(), e.elements)) {
              var i = {},
                a = function (e, n) {
                  for (var r = [], a = [], o = 0; o < e.length; o++) {
                    var s = e[o];
                    if (s.data.id) {
                      var l = "" + s.data.id,
                        u = t.getElementById(l);
                      (i[l] = !0),
                        0 !== u.length
                          ? a.push({ ele: u, json: s })
                          : n
                          ? ((s.group = n), r.push(s))
                          : r.push(s);
                    } else
                      Ye(
                        "cy.json() cannot handle elements without an ID attribute"
                      );
                  }
                  t.add(r);
                  for (var c = 0; c < a.length; c++) {
                    var d = a[c],
                      h = d.ele,
                      p = d.json;
                    h.json(p);
                  }
                };
              if (x(e.elements)) a(e.elements);
              else
                for (var o = ["nodes", "edges"], s = 0; s < o.length; s++) {
                  var l = o[s],
                    u = e.elements[l];
                  x(u) && a(u, l);
                }
              var c = t.collection();
              r
                .filter(function (e) {
                  return !i[e.id()];
                })
                .forEach(function (e) {
                  e.isParent() ? c.merge(e) : e.remove();
                }),
                c.forEach(function (e) {
                  return e.children().move({ parent: null });
                }),
                c.forEach(function (e) {
                  return (function (e) {
                    return t.getElementById(e.id());
                  })(e).remove();
                });
            }
            e.style && t.style(e.style),
              null != e.zoom && e.zoom !== n.zoom && t.zoom(e.zoom),
              e.pan &&
                ((e.pan.x === n.pan.x && e.pan.y === n.pan.y) || t.pan(e.pan)),
              e.data && t.data(e.data);
            for (
              var d = [
                  "minZoom",
                  "maxZoom",
                  "zoomingEnabled",
                  "userZoomingEnabled",
                  "panningEnabled",
                  "userPanningEnabled",
                  "boxSelectionEnabled",
                  "autolock",
                  "autoungrabify",
                  "autounselectify",
                  "multiClickDebounceTime",
                ],
                h = 0;
              h < d.length;
              h++
            ) {
              var p = d[h];
              null != e[p] && t[p](e[p]);
            }
            return t.endBatch(), this;
          }
          var f = {};
          e
            ? (f.elements = this.elements().map(function (e) {
                return e.json();
              }))
            : ((f.elements = {}),
              r.forEach(function (e) {
                var t = e.group();
                f.elements[t] || (f.elements[t] = []),
                  f.elements[t].push(e.json());
              })),
            this._private.styleEnabled && (f.style = t.style().json()),
            (f.data = Xe(t.data()));
          var g = n.options;
          return (
            (f.zoomingEnabled = n.zoomingEnabled),
            (f.userZoomingEnabled = n.userZoomingEnabled),
            (f.zoom = n.zoom),
            (f.minZoom = n.minZoom),
            (f.maxZoom = n.maxZoom),
            (f.panningEnabled = n.panningEnabled),
            (f.userPanningEnabled = n.userPanningEnabled),
            (f.pan = Xe(n.pan)),
            (f.boxSelectionEnabled = n.boxSelectionEnabled),
            (f.renderer = Xe(g.renderer)),
            (f.hideEdgesOnViewport = g.hideEdgesOnViewport),
            (f.textureOnViewport = g.textureOnViewport),
            (f.wheelSensitivity = g.wheelSensitivity),
            (f.motionBlur = g.motionBlur),
            (f.multiClickDebounceTime = g.multiClickDebounceTime),
            f
          );
        },
      }),
        (rs.$id = rs.getElementById),
        [xo, Io, Lo, Oo, Ro, zo, Vo, qo, Jo, es, ts].forEach(function (e) {
          j(rs, e);
        });
      var is = {
          fit: !0,
          directed: !1,
          padding: 30,
          circle: !1,
          grid: !1,
          spacingFactor: 1.75,
          boundingBox: void 0,
          avoidOverlap: !0,
          nodeDimensionsIncludeLabels: !1,
          roots: void 0,
          depthSort: void 0,
          animate: !1,
          animationDuration: 500,
          animationEasing: void 0,
          animateFilter: function (e, t) {
            return !0;
          },
          ready: void 0,
          stop: void 0,
          transform: function (e, t) {
            return t;
          },
        },
        as = { maximal: !1, acyclic: !1 },
        os = function (e) {
          return e.scratch("breadthfirst");
        },
        ss = function (e, t) {
          return e.scratch("breadthfirst", t);
        };
      function ls(e) {
        this.options = j({}, is, as, e);
      }
      ls.prototype.run = function () {
        var e,
          t = this.options,
          n = t,
          r = t.cy,
          i = n.eles,
          a = i.nodes().filter(function (e) {
            return !e.isParent();
          }),
          o = i,
          s = n.directed,
          l = n.acyclic || n.maximal || n.maximalAdjustments > 0,
          u = Bt(
            n.boundingBox
              ? n.boundingBox
              : { x1: 0, y1: 0, w: r.width(), h: r.height() }
          );
        if (k(n.roots)) e = n.roots;
        else if (x(n.roots)) {
          for (var c = [], d = 0; d < n.roots.length; d++) {
            var h = n.roots[d],
              p = r.getElementById(h);
            c.push(p);
          }
          e = r.collection(c);
        } else if (m(n.roots)) e = r.$(n.roots);
        else if (s) e = a.roots();
        else {
          var f = i.components();
          e = r.collection();
          for (
            var g = function (t) {
                var n = f[t],
                  r = n.maxDegree(!1),
                  i = n.filter(function (e) {
                    return e.degree(!1) === r;
                  });
                e = e.add(i);
              },
              v = 0;
            v < f.length;
            v++
          )
            g(v);
        }
        var y = [],
          b = {},
          w = function (e, t) {
            null == y[t] && (y[t] = []);
            var n = y[t].length;
            y[t].push(e), ss(e, { index: n, depth: t });
          };
        o.bfs({
          roots: e,
          directed: n.directed,
          visit: function (e, t, n, r, i) {
            var a = e[0],
              o = a.id();
            w(a, i), (b[o] = !0);
          },
        });
        for (var E = [], C = 0; C < a.length; C++) {
          var T = a[C];
          b[T.id()] || E.push(T);
        }
        var S = function (e) {
            for (var t = y[e], n = 0; n < t.length; n++) {
              var r = t[n];
              null != r ? ss(r, { depth: e, index: n }) : (t.splice(n, 1), n--);
            }
          },
          P = function () {
            for (var e = 0; e < y.length; e++) S(e);
          },
          D = function (e, t) {
            for (
              var r = os(e),
                a = e.incomers().filter(function (e) {
                  return e.isNode() && i.has(e);
                }),
                o = -1,
                s = e.id(),
                l = 0;
              l < a.length;
              l++
            ) {
              var u = a[l],
                c = os(u);
              o = Math.max(o, c.depth);
            }
            if (r.depth <= o) {
              if (!n.acyclic && t[s]) return null;
              var d = o + 1;
              return (
                (function (e, t) {
                  var n = os(e),
                    r = n.depth,
                    i = n.index;
                  (y[r][i] = null), w(e, t);
                })(e, d),
                (t[s] = d),
                !0
              );
            }
            return !1;
          };
        if (s && l) {
          var _ = [],
            M = {},
            N = function (e) {
              return _.push(e);
            };
          for (
            a.forEach(function (e) {
              return _.push(e);
            });
            _.length > 0;

          ) {
            var I = _.shift(),
              B = D(I, M);
            if (B)
              I.outgoers()
                .filter(function (e) {
                  return e.isNode() && i.has(e);
                })
                .forEach(N);
            else if (null === B) {
              Ye(
                "Detected double maximal shift for node `" +
                  I.id() +
                  "`.  Bailing maximal adjustment due to cycle.  Use `options.maximal: true` only on DAGs."
              );
              break;
            }
          }
        }
        P();
        var A = 0;
        if (n.avoidOverlap)
          for (var L = 0; L < a.length; L++) {
            var O = a[L].layoutDimensions(n),
              R = O.w,
              z = O.h;
            A = Math.max(A, R, z);
          }
        var F = {},
          V = function (e) {
            if (F[e.id()]) return F[e.id()];
            for (
              var t = os(e).depth, n = e.neighborhood(), r = 0, i = 0, o = 0;
              o < n.length;
              o++
            ) {
              var s = n[o];
              if (!s.isEdge() && !s.isParent() && a.has(s)) {
                var l = os(s);
                if (null != l) {
                  var u = l.index,
                    c = l.depth;
                  if (null != u && null != c) {
                    var d = y[c].length;
                    c < t && ((r += u / d), i++);
                  }
                }
              }
            }
            return (
              (r /= i = Math.max(1, i)), 0 === i && (r = 0), (F[e.id()] = r), r
            );
          },
          j = function (e, t) {
            var n = V(e) - V(t);
            return 0 === n ? q(e.id(), t.id()) : n;
          };
        void 0 !== n.depthSort && (j = n.depthSort);
        for (var Y = 0; Y < y.length; Y++) y[Y].sort(j), S(Y);
        for (var X = [], W = 0; W < E.length; W++) X.push(E[W]);
        y.unshift(X), P();
        for (var H = 0, G = 0; G < y.length; G++) H = Math.max(y[G].length, H);
        var U = u.x1 + u.w / 2,
          K = u.x1 + u.h / 2,
          Z = y.reduce(function (e, t) {
            return Math.max(e, t.length);
          }, 0);
        return (
          i.nodes().layoutPositions(this, n, function (e) {
            var t = os(e),
              r = t.depth,
              i = t.index,
              a = y[r].length,
              o = Math.max(u.w / ((n.grid ? Z : a) + 1), A),
              s = Math.max(u.h / (y.length + 1), A),
              l = Math.min(u.w / 2 / y.length, u.h / 2 / y.length);
            if (((l = Math.max(l, A)), n.circle)) {
              var c =
                  l * r + l - (y.length > 0 && y[0].length <= 3 ? l / 2 : 0),
                d = ((2 * Math.PI) / y[r].length) * i;
              return (
                0 === r && 1 === y[0].length && (c = 1),
                { x: U + c * Math.cos(d), y: K + c * Math.sin(d) }
              );
            }
            return { x: U + (i + 1 - (a + 1) / 2) * o, y: (r + 1) * s };
          }),
          this
        );
      };
      var us = {
        fit: !0,
        padding: 30,
        boundingBox: void 0,
        avoidOverlap: !0,
        nodeDimensionsIncludeLabels: !1,
        spacingFactor: void 0,
        radius: void 0,
        startAngle: 1.5 * Math.PI,
        sweep: void 0,
        clockwise: !0,
        sort: void 0,
        animate: !1,
        animationDuration: 500,
        animationEasing: void 0,
        animateFilter: function (e, t) {
          return !0;
        },
        ready: void 0,
        stop: void 0,
        transform: function (e, t) {
          return t;
        },
      };
      function cs(e) {
        this.options = j({}, us, e);
      }
      cs.prototype.run = function () {
        var e = this.options,
          t = e,
          n = e.cy,
          r = t.eles,
          i = void 0 !== t.counterclockwise ? !t.counterclockwise : t.clockwise,
          a = r.nodes().not(":parent");
        t.sort && (a = a.sort(t.sort));
        for (
          var o,
            s = Bt(
              t.boundingBox
                ? t.boundingBox
                : { x1: 0, y1: 0, w: n.width(), h: n.height() }
            ),
            l = s.x1 + s.w / 2,
            u = s.y1 + s.h / 2,
            c =
              (void 0 === t.sweep
                ? 2 * Math.PI - (2 * Math.PI) / a.length
                : t.sweep) / Math.max(1, a.length - 1),
            d = 0,
            h = 0;
          h < a.length;
          h++
        ) {
          var p = a[h].layoutDimensions(t),
            f = p.w,
            g = p.h;
          d = Math.max(d, f, g);
        }
        if (
          ((o = E(t.radius)
            ? t.radius
            : a.length <= 1
            ? 0
            : Math.min(s.h, s.w) / 2 - d),
          a.length > 1 && t.avoidOverlap)
        ) {
          d *= 1.75;
          var v = Math.cos(c) - Math.cos(0),
            y = Math.sin(c) - Math.sin(0),
            m = Math.sqrt((d * d) / (v * v + y * y));
          o = Math.max(m, o);
        }
        return (
          r.nodes().layoutPositions(this, t, function (e, n) {
            var r = t.startAngle + n * c * (i ? 1 : -1),
              a = o * Math.cos(r),
              s = o * Math.sin(r);
            return { x: l + a, y: u + s };
          }),
          this
        );
      };
      var ds,
        hs = {
          fit: !0,
          padding: 30,
          startAngle: 1.5 * Math.PI,
          sweep: void 0,
          clockwise: !0,
          equidistant: !1,
          minNodeSpacing: 10,
          boundingBox: void 0,
          avoidOverlap: !0,
          nodeDimensionsIncludeLabels: !1,
          height: void 0,
          width: void 0,
          spacingFactor: void 0,
          concentric: function (e) {
            return e.degree();
          },
          levelWidth: function (e) {
            return e.maxDegree() / 4;
          },
          animate: !1,
          animationDuration: 500,
          animationEasing: void 0,
          animateFilter: function (e, t) {
            return !0;
          },
          ready: void 0,
          stop: void 0,
          transform: function (e, t) {
            return t;
          },
        };
      function ps(e) {
        this.options = j({}, hs, e);
      }
      ps.prototype.run = function () {
        for (
          var e = this.options,
            t = e,
            n =
              void 0 !== t.counterclockwise ? !t.counterclockwise : t.clockwise,
            r = e.cy,
            i = t.eles,
            a = i.nodes().not(":parent"),
            o = Bt(
              t.boundingBox
                ? t.boundingBox
                : { x1: 0, y1: 0, w: r.width(), h: r.height() }
            ),
            s = o.x1 + o.w / 2,
            l = o.y1 + o.h / 2,
            u = [],
            c = 0,
            d = 0;
          d < a.length;
          d++
        ) {
          var h,
            p = a[d];
          (h = t.concentric(p)),
            u.push({ value: h, node: p }),
            (p._private.scratch.concentric = h);
        }
        a.updateStyle();
        for (var f = 0; f < a.length; f++) {
          var g = a[f].layoutDimensions(t);
          c = Math.max(c, g.w, g.h);
        }
        u.sort(function (e, t) {
          return t.value - e.value;
        });
        for (
          var v = t.levelWidth(a), y = [[]], m = y[0], b = 0;
          b < u.length;
          b++
        ) {
          var x = u[b];
          m.length > 0 &&
            Math.abs(m[0].value - x.value) >= v &&
            ((m = []), y.push(m)),
            m.push(x);
        }
        var w = c + t.minNodeSpacing;
        if (!t.avoidOverlap) {
          var E = y.length > 0 && y[0].length > 1,
            C = (Math.min(o.w, o.h) / 2 - w) / (y.length + E ? 1 : 0);
          w = Math.min(w, C);
        }
        for (var k = 0, T = 0; T < y.length; T++) {
          var S = y[T],
            P =
              void 0 === t.sweep
                ? 2 * Math.PI - (2 * Math.PI) / S.length
                : t.sweep,
            D = (S.dTheta = P / Math.max(1, S.length - 1));
          if (S.length > 1 && t.avoidOverlap) {
            var _ = Math.cos(D) - Math.cos(0),
              M = Math.sin(D) - Math.sin(0),
              N = Math.sqrt((w * w) / (_ * _ + M * M));
            k = Math.max(N, k);
          }
          (S.r = k), (k += w);
        }
        if (t.equidistant) {
          for (var I = 0, B = 0, A = 0; A < y.length; A++) {
            var L = y[A].r - B;
            I = Math.max(I, L);
          }
          B = 0;
          for (var O = 0; O < y.length; O++) {
            var R = y[O];
            0 === O && (B = R.r), (R.r = B), (B += I);
          }
        }
        for (var z = {}, F = 0; F < y.length; F++)
          for (var V = y[F], q = V.dTheta, j = V.r, Y = 0; Y < V.length; Y++) {
            var X = V[Y],
              W = t.startAngle + (n ? 1 : -1) * q * Y,
              H = { x: s + j * Math.cos(W), y: l + j * Math.sin(W) };
            z[X.node.id()] = H;
          }
        return (
          i.nodes().layoutPositions(this, t, function (e) {
            var t = e.id();
            return z[t];
          }),
          this
        );
      };
      var fs = {
        ready: function () {},
        stop: function () {},
        animate: !0,
        animationEasing: void 0,
        animationDuration: void 0,
        animateFilter: function (e, t) {
          return !0;
        },
        animationThreshold: 250,
        refresh: 20,
        fit: !0,
        padding: 30,
        boundingBox: void 0,
        nodeDimensionsIncludeLabels: !1,
        randomize: !1,
        componentSpacing: 40,
        nodeRepulsion: function (e) {
          return 2048;
        },
        nodeOverlap: 4,
        idealEdgeLength: function (e) {
          return 32;
        },
        edgeElasticity: function (e) {
          return 32;
        },
        nestingFactor: 1.2,
        gravity: 1,
        numIter: 1e3,
        initialTemp: 1e3,
        coolingFactor: 0.99,
        minTemp: 1,
      };
      function gs(e) {
        (this.options = j({}, fs, e)), (this.options.layout = this);
        var t = this.options.eles.nodes(),
          n = this.options.eles.edges().filter(function (e) {
            var n = e.source().data("id"),
              r = e.target().data("id"),
              i = t.some(function (e) {
                return e.data("id") === n;
              }),
              a = t.some(function (e) {
                return e.data("id") === r;
              });
            return !i || !a;
          });
        this.options.eles = this.options.eles.not(n);
      }
      (gs.prototype.run = function () {
        var e = this.options,
          t = e.cy,
          n = this;
        (n.stopped = !1),
          (!0 !== e.animate && !1 !== e.animate) ||
            n.emit({ type: "layoutstart", layout: n }),
          (ds = !0 === e.debug);
        var r = vs(t, n, e);
        ds && (void 0)(r), e.randomize && bs(r);
        var i = Ee(),
          a = function () {
            ws(r, t, e), !0 === e.fit && t.fit(e.padding);
          },
          o = function (t) {
            return !(
              n.stopped ||
              t >= e.numIter ||
              (Es(r, e),
              (r.temperature = r.temperature * e.coolingFactor),
              r.temperature < e.minTemp)
            );
          },
          s = function () {
            if (!0 === e.animate || !1 === e.animate)
              a(),
                n.one("layoutstop", e.stop),
                n.emit({ type: "layoutstop", layout: n });
            else {
              var t = e.eles.nodes(),
                i = xs(r, e, t);
              t.layoutPositions(n, e, i);
            }
          },
          l = 0,
          u = !0;
        if (!0 === e.animate)
          !(function t() {
            for (var n = 0; u && n < e.refresh; ) (u = o(l)), l++, n++;
            u
              ? (Ee() - i >= e.animationThreshold && a(), we(t))
              : (As(r, e), s());
          })();
        else {
          for (; u; ) (u = o(l)), l++;
          As(r, e), s();
        }
        return this;
      }),
        (gs.prototype.stop = function () {
          return (
            (this.stopped = !0),
            this.thread && this.thread.stop(),
            this.emit("layoutstop"),
            this
          );
        }),
        (gs.prototype.destroy = function () {
          return this.thread && this.thread.stop(), this;
        });
      var vs = function (e, t, n) {
          for (
            var r = n.eles.edges(),
              i = n.eles.nodes(),
              a = Bt(
                n.boundingBox
                  ? n.boundingBox
                  : { x1: 0, y1: 0, w: e.width(), h: e.height() }
              ),
              o = {
                isCompound: e.hasCompoundNodes(),
                layoutNodes: [],
                idToIndex: {},
                nodeSize: i.size(),
                graphSet: [],
                indexToGraph: [],
                layoutEdges: [],
                edgeSize: r.size(),
                temperature: n.initialTemp,
                clientWidth: a.w,
                clientHeight: a.h,
                boundingBox: a,
              },
              s = n.eles.components(),
              l = {},
              u = 0;
            u < s.length;
            u++
          )
            for (var c = s[u], d = 0; d < c.length; d++) l[c[d].id()] = u;
          for (u = 0; u < o.nodeSize; u++) {
            var h = (y = i[u]).layoutDimensions(n);
            ((A = {}).isLocked = y.locked()),
              (A.id = y.data("id")),
              (A.parentId = y.data("parent")),
              (A.cmptId = l[y.id()]),
              (A.children = []),
              (A.positionX = y.position("x")),
              (A.positionY = y.position("y")),
              (A.offsetX = 0),
              (A.offsetY = 0),
              (A.height = h.w),
              (A.width = h.h),
              (A.maxX = A.positionX + A.width / 2),
              (A.minX = A.positionX - A.width / 2),
              (A.maxY = A.positionY + A.height / 2),
              (A.minY = A.positionY - A.height / 2),
              (A.padLeft = parseFloat(y.style("padding"))),
              (A.padRight = parseFloat(y.style("padding"))),
              (A.padTop = parseFloat(y.style("padding"))),
              (A.padBottom = parseFloat(y.style("padding"))),
              (A.nodeRepulsion = b(n.nodeRepulsion)
                ? n.nodeRepulsion(y)
                : n.nodeRepulsion),
              o.layoutNodes.push(A),
              (o.idToIndex[A.id] = u);
          }
          var p = [],
            f = 0,
            g = -1,
            v = [];
          for (u = 0; u < o.nodeSize; u++) {
            var y,
              m = (y = o.layoutNodes[u]).parentId;
            null != m
              ? o.layoutNodes[o.idToIndex[m]].children.push(y.id)
              : ((p[++g] = y.id), v.push(y.id));
          }
          for (o.graphSet.push(v); f <= g; ) {
            var x = p[f++],
              w = o.idToIndex[x],
              E = o.layoutNodes[w].children;
            if (E.length > 0)
              for (o.graphSet.push(E), u = 0; u < E.length; u++) p[++g] = E[u];
          }
          for (u = 0; u < o.graphSet.length; u++) {
            var C = o.graphSet[u];
            for (d = 0; d < C.length; d++) {
              var k = o.idToIndex[C[d]];
              o.indexToGraph[k] = u;
            }
          }
          for (u = 0; u < o.edgeSize; u++) {
            var T = r[u],
              S = {};
            (S.id = T.data("id")),
              (S.sourceId = T.data("source")),
              (S.targetId = T.data("target"));
            var P = b(n.idealEdgeLength)
                ? n.idealEdgeLength(T)
                : n.idealEdgeLength,
              D = b(n.edgeElasticity) ? n.edgeElasticity(T) : n.edgeElasticity,
              _ = o.idToIndex[S.sourceId],
              M = o.idToIndex[S.targetId];
            if (o.indexToGraph[_] != o.indexToGraph[M]) {
              for (
                var N = ys(S.sourceId, S.targetId, o),
                  I = o.graphSet[N],
                  B = 0,
                  A = o.layoutNodes[_];
                -1 === I.indexOf(A.id);

              )
                (A = o.layoutNodes[o.idToIndex[A.parentId]]), B++;
              for (A = o.layoutNodes[M]; -1 === I.indexOf(A.id); )
                (A = o.layoutNodes[o.idToIndex[A.parentId]]), B++;
              P *= B * n.nestingFactor;
            }
            (S.idealLength = P), (S.elasticity = D), o.layoutEdges.push(S);
          }
          return o;
        },
        ys = function (e, t, n) {
          var r = ms(e, t, 0, n);
          return 2 > r.count ? 0 : r.graph;
        },
        ms = function e(t, n, r, i) {
          var a = i.graphSet[r];
          if (-1 < a.indexOf(t) && -1 < a.indexOf(n))
            return { count: 2, graph: r };
          for (var o = 0, s = 0; s < a.length; s++) {
            var l = a[s],
              u = i.idToIndex[l],
              c = i.layoutNodes[u].children;
            if (0 !== c.length) {
              var d = e(t, n, i.indexToGraph[i.idToIndex[c[0]]], i);
              if (0 !== d.count) {
                if (1 !== d.count) return d;
                if (2 == ++o) break;
              }
            }
          }
          return { count: o, graph: r };
        },
        bs = function (e, t) {
          for (
            var n = e.clientWidth, r = e.clientHeight, i = 0;
            i < e.nodeSize;
            i++
          ) {
            var a = e.layoutNodes[i];
            0 !== a.children.length ||
              a.isLocked ||
              ((a.positionX = Math.random() * n),
              (a.positionY = Math.random() * r));
          }
        },
        xs = function (e, t, n) {
          var r = e.boundingBox,
            i = { x1: 1 / 0, x2: -1 / 0, y1: 1 / 0, y2: -1 / 0 };
          return (
            t.boundingBox &&
              (n.forEach(function (t) {
                var n = e.layoutNodes[e.idToIndex[t.data("id")]];
                (i.x1 = Math.min(i.x1, n.positionX)),
                  (i.x2 = Math.max(i.x2, n.positionX)),
                  (i.y1 = Math.min(i.y1, n.positionY)),
                  (i.y2 = Math.max(i.y2, n.positionY));
              }),
              (i.w = i.x2 - i.x1),
              (i.h = i.y2 - i.y1)),
            function (n, a) {
              var o = e.layoutNodes[e.idToIndex[n.data("id")]];
              if (t.boundingBox) {
                var s = (o.positionX - i.x1) / i.w,
                  l = (o.positionY - i.y1) / i.h;
                return { x: r.x1 + s * r.w, y: r.y1 + l * r.h };
              }
              return { x: o.positionX, y: o.positionY };
            }
          );
        },
        ws = function (e, t, n) {
          var r = n.layout,
            i = n.eles.nodes(),
            a = xs(e, n, i);
          i.positions(a),
            !0 !== e.ready &&
              ((e.ready = !0),
              r.one("layoutready", n.ready),
              r.emit({ type: "layoutready", layout: this }));
        },
        Es = function (e, t, n) {
          Cs(e, t), Ds(e), _s(e, t), Ms(e), Ns(e);
        },
        Cs = function (e, t) {
          for (var n = 0; n < e.graphSet.length; n++)
            for (var r = e.graphSet[n], i = r.length, a = 0; a < i; a++)
              for (
                var o = e.layoutNodes[e.idToIndex[r[a]]], s = a + 1;
                s < i;
                s++
              ) {
                var l = e.layoutNodes[e.idToIndex[r[s]]];
                Ts(o, l, e, t);
              }
        },
        ks = function (e) {
          return -e + 2 * e * Math.random();
        },
        Ts = function (e, t, n, r) {
          if (e.cmptId === t.cmptId || n.isCompound) {
            var i = t.positionX - e.positionX,
              a = t.positionY - e.positionY;
            0 === i && 0 === a && ((i = ks(1)), (a = ks(1)));
            var o = Ss(e, t, i, a);
            if (o > 0)
              var s =
                  ((u = r.nodeOverlap * o) * i) /
                  (g = Math.sqrt(i * i + a * a)),
                l = (u * a) / g;
            else {
              var u,
                c = Ps(e, i, a),
                d = Ps(t, -1 * i, -1 * a),
                h = d.x - c.x,
                p = d.y - c.y,
                f = h * h + p * p,
                g = Math.sqrt(f);
              (s = ((u = (e.nodeRepulsion + t.nodeRepulsion) / f) * h) / g),
                (l = (u * p) / g);
            }
            e.isLocked || ((e.offsetX -= s), (e.offsetY -= l)),
              t.isLocked || ((t.offsetX += s), (t.offsetY += l));
          }
        },
        Ss = function (e, t, n, r) {
          if (n > 0) var i = e.maxX - t.minX;
          else i = t.maxX - e.minX;
          if (r > 0) var a = e.maxY - t.minY;
          else a = t.maxY - e.minY;
          return i >= 0 && a >= 0 ? Math.sqrt(i * i + a * a) : 0;
        },
        Ps = function (e, t, n) {
          var r = e.positionX,
            i = e.positionY,
            a = e.height || 1,
            o = e.width || 1,
            s = n / t,
            l = a / o,
            u = {};
          return (0 === t && 0 < n) || (0 === t && 0 > n)
            ? ((u.x = r), (u.y = i + a / 2), u)
            : 0 < t && -1 * l <= s && s <= l
            ? ((u.x = r + o / 2), (u.y = i + (o * n) / 2 / t), u)
            : 0 > t && -1 * l <= s && s <= l
            ? ((u.x = r - o / 2), (u.y = i - (o * n) / 2 / t), u)
            : 0 < n && (s <= -1 * l || s >= l)
            ? ((u.x = r + (a * t) / 2 / n), (u.y = i + a / 2), u)
            : 0 > n && (s <= -1 * l || s >= l)
            ? ((u.x = r - (a * t) / 2 / n), (u.y = i - a / 2), u)
            : u;
        },
        Ds = function (e, t) {
          for (var n = 0; n < e.edgeSize; n++) {
            var r = e.layoutEdges[n],
              i = e.idToIndex[r.sourceId],
              a = e.layoutNodes[i],
              o = e.idToIndex[r.targetId],
              s = e.layoutNodes[o],
              l = s.positionX - a.positionX,
              u = s.positionY - a.positionY;
            if (0 !== l || 0 !== u) {
              var c = Ps(a, l, u),
                d = Ps(s, -1 * l, -1 * u),
                h = d.x - c.x,
                p = d.y - c.y,
                f = Math.sqrt(h * h + p * p),
                g = Math.pow(r.idealLength - f, 2) / r.elasticity;
              if (0 !== f)
                var v = (g * h) / f,
                  y = (g * p) / f;
              else (v = 0), (y = 0);
              a.isLocked || ((a.offsetX += v), (a.offsetY += y)),
                s.isLocked || ((s.offsetX -= v), (s.offsetY -= y));
            }
          }
        },
        _s = function (e, t) {
          if (0 !== t.gravity)
            for (var n = 0; n < e.graphSet.length; n++) {
              var r = e.graphSet[n],
                i = r.length;
              if (0 === n)
                var a = e.clientHeight / 2,
                  o = e.clientWidth / 2;
              else {
                var s = e.layoutNodes[e.idToIndex[r[0]]],
                  l = e.layoutNodes[e.idToIndex[s.parentId]];
                (a = l.positionX), (o = l.positionY);
              }
              for (var u = 0; u < i; u++) {
                var c = e.layoutNodes[e.idToIndex[r[u]]];
                if (!c.isLocked) {
                  var d = a - c.positionX,
                    h = o - c.positionY,
                    p = Math.sqrt(d * d + h * h);
                  if (p > 1) {
                    var f = (t.gravity * d) / p,
                      g = (t.gravity * h) / p;
                    (c.offsetX += f), (c.offsetY += g);
                  }
                }
              }
            }
        },
        Ms = function (e, t) {
          var n = [],
            r = 0,
            i = -1;
          for (
            n.push.apply(n, e.graphSet[0]), i += e.graphSet[0].length;
            r <= i;

          ) {
            var a = n[r++],
              o = e.idToIndex[a],
              s = e.layoutNodes[o],
              l = s.children;
            if (0 < l.length && !s.isLocked) {
              for (var u = s.offsetX, c = s.offsetY, d = 0; d < l.length; d++) {
                var h = e.layoutNodes[e.idToIndex[l[d]]];
                (h.offsetX += u), (h.offsetY += c), (n[++i] = l[d]);
              }
              (s.offsetX = 0), (s.offsetY = 0);
            }
          }
        },
        Ns = function (e, t) {
          for (var n = 0; n < e.nodeSize; n++)
            0 < (i = e.layoutNodes[n]).children.length &&
              ((i.maxX = void 0),
              (i.minX = void 0),
              (i.maxY = void 0),
              (i.minY = void 0));
          for (n = 0; n < e.nodeSize; n++)
            if (!(0 < (i = e.layoutNodes[n]).children.length || i.isLocked)) {
              var r = Is(i.offsetX, i.offsetY, e.temperature);
              (i.positionX += r.x),
                (i.positionY += r.y),
                (i.offsetX = 0),
                (i.offsetY = 0),
                (i.minX = i.positionX - i.width),
                (i.maxX = i.positionX + i.width),
                (i.minY = i.positionY - i.height),
                (i.maxY = i.positionY + i.height),
                Bs(i, e);
            }
          for (n = 0; n < e.nodeSize; n++) {
            var i;
            0 < (i = e.layoutNodes[n]).children.length &&
              !i.isLocked &&
              ((i.positionX = (i.maxX + i.minX) / 2),
              (i.positionY = (i.maxY + i.minY) / 2),
              (i.width = i.maxX - i.minX),
              (i.height = i.maxY - i.minY));
          }
        },
        Is = function (e, t, n) {
          var r = Math.sqrt(e * e + t * t);
          if (r > n) var i = { x: (n * e) / r, y: (n * t) / r };
          else i = { x: e, y: t };
          return i;
        },
        Bs = function e(t, n) {
          var r = t.parentId;
          if (null != r) {
            var i = n.layoutNodes[n.idToIndex[r]],
              a = !1;
            return (
              (null == i.maxX || t.maxX + i.padRight > i.maxX) &&
                ((i.maxX = t.maxX + i.padRight), (a = !0)),
              (null == i.minX || t.minX - i.padLeft < i.minX) &&
                ((i.minX = t.minX - i.padLeft), (a = !0)),
              (null == i.maxY || t.maxY + i.padBottom > i.maxY) &&
                ((i.maxY = t.maxY + i.padBottom), (a = !0)),
              (null == i.minY || t.minY - i.padTop < i.minY) &&
                ((i.minY = t.minY - i.padTop), (a = !0)),
              a ? e(i, n) : void 0
            );
          }
        },
        As = function (e, t) {
          for (var n = e.layoutNodes, r = [], i = 0; i < n.length; i++) {
            var a = n[i],
              o = a.cmptId;
            (r[o] = r[o] || []).push(a);
          }
          var s = 0;
          for (i = 0; i < r.length; i++)
            if ((g = r[i])) {
              (g.x1 = 1 / 0), (g.x2 = -1 / 0), (g.y1 = 1 / 0), (g.y2 = -1 / 0);
              for (var l = 0; l < g.length; l++) {
                var u = g[l];
                (g.x1 = Math.min(g.x1, u.positionX - u.width / 2)),
                  (g.x2 = Math.max(g.x2, u.positionX + u.width / 2)),
                  (g.y1 = Math.min(g.y1, u.positionY - u.height / 2)),
                  (g.y2 = Math.max(g.y2, u.positionY + u.height / 2));
              }
              (g.w = g.x2 - g.x1), (g.h = g.y2 - g.y1), (s += g.w * g.h);
            }
          r.sort(function (e, t) {
            return t.w * t.h - e.w * e.h;
          });
          var c = 0,
            d = 0,
            h = 0,
            p = 0,
            f = (Math.sqrt(s) * e.clientWidth) / e.clientHeight;
          for (i = 0; i < r.length; i++) {
            var g;
            if ((g = r[i])) {
              for (l = 0; l < g.length; l++)
                (u = g[l]).isLocked ||
                  ((u.positionX += c - g.x1), (u.positionY += d - g.y1));
              (c += g.w + t.componentSpacing),
                (h += g.w + t.componentSpacing),
                (p = Math.max(p, g.h)),
                h > f &&
                  ((d += p + t.componentSpacing), (c = 0), (h = 0), (p = 0));
            }
          }
        },
        Ls = {
          fit: !0,
          padding: 30,
          boundingBox: void 0,
          avoidOverlap: !0,
          avoidOverlapPadding: 10,
          nodeDimensionsIncludeLabels: !1,
          spacingFactor: void 0,
          condense: !1,
          rows: void 0,
          cols: void 0,
          position: function (e) {},
          sort: void 0,
          animate: !1,
          animationDuration: 500,
          animationEasing: void 0,
          animateFilter: function (e, t) {
            return !0;
          },
          ready: void 0,
          stop: void 0,
          transform: function (e, t) {
            return t;
          },
        };
      function Os(e) {
        this.options = j({}, Ls, e);
      }
      Os.prototype.run = function () {
        var e = this.options,
          t = e,
          n = e.cy,
          r = t.eles,
          i = r.nodes().not(":parent");
        t.sort && (i = i.sort(t.sort));
        var a = Bt(
          t.boundingBox
            ? t.boundingBox
            : { x1: 0, y1: 0, w: n.width(), h: n.height() }
        );
        if (0 === a.h || 0 === a.w)
          r.nodes().layoutPositions(this, t, function (e) {
            return { x: a.x1, y: a.y1 };
          });
        else {
          var o = i.size(),
            s = Math.sqrt((o * a.h) / a.w),
            l = Math.round(s),
            u = Math.round((a.w / a.h) * s),
            c = function (e) {
              if (null == e) return Math.min(l, u);
              Math.min(l, u) == l ? (l = e) : (u = e);
            },
            d = function (e) {
              if (null == e) return Math.max(l, u);
              Math.max(l, u) == l ? (l = e) : (u = e);
            },
            h = t.rows,
            p = null != t.cols ? t.cols : t.columns;
          if (null != h && null != p) (l = h), (u = p);
          else if (null != h && null == p) (l = h), (u = Math.ceil(o / l));
          else if (null == h && null != p) (u = p), (l = Math.ceil(o / u));
          else if (u * l > o) {
            var f = c(),
              g = d();
            (f - 1) * g >= o ? c(f - 1) : (g - 1) * f >= o && d(g - 1);
          } else
            for (; u * l < o; ) {
              var v = c(),
                y = d();
              (y + 1) * v >= o ? d(y + 1) : c(v + 1);
            }
          var m = a.w / u,
            b = a.h / l;
          if ((t.condense && ((m = 0), (b = 0)), t.avoidOverlap))
            for (var x = 0; x < i.length; x++) {
              var w = i[x],
                E = w._private.position;
              (null != E.x && null != E.y) || ((E.x = 0), (E.y = 0));
              var C = w.layoutDimensions(t),
                k = t.avoidOverlapPadding,
                T = C.w + k,
                S = C.h + k;
              (m = Math.max(m, T)), (b = Math.max(b, S));
            }
          for (
            var P = {},
              D = function (e, t) {
                return !!P["c-" + e + "-" + t];
              },
              _ = function (e, t) {
                P["c-" + e + "-" + t] = !0;
              },
              M = 0,
              N = 0,
              I = function () {
                ++N >= u && ((N = 0), M++);
              },
              B = {},
              A = 0;
            A < i.length;
            A++
          ) {
            var L = i[A],
              O = t.position(L);
            if (O && (void 0 !== O.row || void 0 !== O.col)) {
              var R = { row: O.row, col: O.col };
              if (void 0 === R.col) for (R.col = 0; D(R.row, R.col); ) R.col++;
              else if (void 0 === R.row)
                for (R.row = 0; D(R.row, R.col); ) R.row++;
              (B[L.id()] = R), _(R.row, R.col);
            }
          }
          i.layoutPositions(this, t, function (e, t) {
            var n, r;
            if (e.locked() || e.isParent()) return !1;
            var i = B[e.id()];
            if (i)
              (n = i.col * m + m / 2 + a.x1), (r = i.row * b + b / 2 + a.y1);
            else {
              for (; D(M, N); ) I();
              (n = N * m + m / 2 + a.x1),
                (r = M * b + b / 2 + a.y1),
                _(M, N),
                I();
            }
            return { x: n, y: r };
          });
        }
        return this;
      };
      var Rs = { ready: function () {}, stop: function () {} };
      function zs(e) {
        this.options = j({}, Rs, e);
      }
      (zs.prototype.run = function () {
        var e = this.options,
          t = e.eles,
          n = this;
        return (
          e.cy,
          n.emit("layoutstart"),
          t.nodes().positions(function () {
            return { x: 0, y: 0 };
          }),
          n.one("layoutready", e.ready),
          n.emit("layoutready"),
          n.one("layoutstop", e.stop),
          n.emit("layoutstop"),
          this
        );
      }),
        (zs.prototype.stop = function () {
          return this;
        });
      var Fs = {
        positions: void 0,
        zoom: void 0,
        pan: void 0,
        fit: !0,
        padding: 30,
        spacingFactor: void 0,
        animate: !1,
        animationDuration: 500,
        animationEasing: void 0,
        animateFilter: function (e, t) {
          return !0;
        },
        ready: void 0,
        stop: void 0,
        transform: function (e, t) {
          return t;
        },
      };
      function Vs(e) {
        this.options = j({}, Fs, e);
      }
      Vs.prototype.run = function () {
        var e = this.options,
          t = e.eles.nodes(),
          n = b(e.positions);
        return (
          t.layoutPositions(this, e, function (t, r) {
            var i = (function (t) {
              if (null == e.positions)
                return (function (e) {
                  return { x: e.x, y: e.y };
                })(t.position());
              if (n) return e.positions(t);
              var r = e.positions[t._private.data.id];
              return null == r ? null : r;
            })(t);
            return !t.locked() && null != i && i;
          }),
          this
        );
      };
      var qs = {
        fit: !0,
        padding: 30,
        boundingBox: void 0,
        animate: !1,
        animationDuration: 500,
        animationEasing: void 0,
        animateFilter: function (e, t) {
          return !0;
        },
        ready: void 0,
        stop: void 0,
        transform: function (e, t) {
          return t;
        },
      };
      function js(e) {
        this.options = j({}, qs, e);
      }
      js.prototype.run = function () {
        var e = this.options,
          t = e.cy,
          n = e.eles,
          r = Bt(
            e.boundingBox
              ? e.boundingBox
              : { x1: 0, y1: 0, w: t.width(), h: t.height() }
          );
        return (
          n.nodes().layoutPositions(this, e, function (e, t) {
            return {
              x: r.x1 + Math.round(Math.random() * r.w),
              y: r.y1 + Math.round(Math.random() * r.h),
            };
          }),
          this
        );
      };
      var Ys = [
        { name: "breadthfirst", impl: ls },
        { name: "circle", impl: cs },
        { name: "concentric", impl: ps },
        { name: "cose", impl: gs },
        { name: "grid", impl: Os },
        { name: "null", impl: zs },
        { name: "preset", impl: Vs },
        { name: "random", impl: js },
      ];
      function Xs(e) {
        (this.options = e), (this.notifications = 0);
      }
      var Ws = function () {},
        Hs = function () {
          throw new Error("A headless instance can not render images");
        };
      Xs.prototype = {
        recalculateRenderedStyle: Ws,
        notify: function () {
          this.notifications++;
        },
        init: Ws,
        isHeadless: function () {
          return !0;
        },
        png: Hs,
        jpg: Hs,
      };
      var Gs = {
          arrowShapeWidth: 0.3,
          registerArrowShapes: function () {
            var e = (this.arrowShapes = {}),
              t = this,
              n = function (e, t, n, r, i, a, o) {
                var s = i.x - n / 2 - o,
                  l = i.x + n / 2 + o,
                  u = i.y - n / 2 - o,
                  c = i.y + n / 2 + o;
                return s <= e && e <= l && u <= t && t <= c;
              },
              r = function (e, t, n, r, i) {
                var a = e * Math.cos(r) - t * Math.sin(r),
                  o = (e * Math.sin(r) + t * Math.cos(r)) * n;
                return { x: a * n + i.x, y: o + i.y };
              },
              i = function (e, t, n, i) {
                for (var a = [], o = 0; o < e.length; o += 2) {
                  var s = e[o],
                    l = e[o + 1];
                  a.push(r(s, l, t, n, i));
                }
                return a;
              },
              a = function (e) {
                for (var t = [], n = 0; n < e.length; n++) {
                  var r = e[n];
                  t.push(r.x, r.y);
                }
                return t;
              },
              o = function (e) {
                return (
                  e.pstyle("width").pfValue *
                  e.pstyle("arrow-scale").pfValue *
                  2
                );
              },
              s = function (r, s) {
                m(s) && (s = e[s]),
                  (e[r] = j(
                    {
                      name: r,
                      points: [-0.15, -0.3, 0.15, -0.3, 0.15, 0.3, -0.15, 0.3],
                      collide: function (e, t, n, r, o, s) {
                        var l = a(i(this.points, n + 2 * s, r, o));
                        return Gt(e, t, l);
                      },
                      roughCollide: n,
                      draw: function (e, n, r, a) {
                        var o = i(this.points, n, r, a);
                        t.arrowShapeImpl("polygon")(e, o);
                      },
                      spacing: function (e) {
                        return 0;
                      },
                      gap: o,
                    },
                    s
                  ));
              };
            s("none", {
              collide: ze,
              roughCollide: ze,
              draw: Ve,
              spacing: Fe,
              gap: Fe,
            }),
              s("triangle", { points: [-0.15, -0.3, 0, 0, 0.15, -0.3] }),
              s("arrow", "triangle"),
              s("triangle-backcurve", {
                points: e.triangle.points,
                controlPoint: [0, -0.15],
                roughCollide: n,
                draw: function (e, n, a, o, s) {
                  var l = i(this.points, n, a, o),
                    u = this.controlPoint,
                    c = r(u[0], u[1], n, a, o);
                  t.arrowShapeImpl(this.name)(e, l, c);
                },
                gap: function (e) {
                  return 0.8 * o(e);
                },
              }),
              s("triangle-tee", {
                points: [0, 0, 0.15, -0.3, -0.15, -0.3, 0, 0],
                pointsTee: [-0.15, -0.4, -0.15, -0.5, 0.15, -0.5, 0.15, -0.4],
                collide: function (e, t, n, r, o, s, l) {
                  var u = a(i(this.points, n + 2 * l, r, o)),
                    c = a(i(this.pointsTee, n + 2 * l, r, o));
                  return Gt(e, t, u) || Gt(e, t, c);
                },
                draw: function (e, n, r, a, o) {
                  var s = i(this.points, n, r, a),
                    l = i(this.pointsTee, n, r, a);
                  t.arrowShapeImpl(this.name)(e, s, l);
                },
              }),
              s("circle-triangle", {
                radius: 0.15,
                pointsTr: [0, -0.15, 0.15, -0.45, -0.15, -0.45, 0, -0.15],
                collide: function (e, t, n, r, o, s, l) {
                  var u = o,
                    c =
                      Math.pow(u.x - e, 2) + Math.pow(u.y - t, 2) <=
                      Math.pow((n + 2 * l) * this.radius, 2),
                    d = a(i(this.points, n + 2 * l, r, o));
                  return Gt(e, t, d) || c;
                },
                draw: function (e, n, r, a, o) {
                  var s = i(this.pointsTr, n, r, a);
                  t.arrowShapeImpl(this.name)(e, s, a.x, a.y, this.radius * n);
                },
                spacing: function (e) {
                  return (
                    t.getArrowWidth(
                      e.pstyle("width").pfValue,
                      e.pstyle("arrow-scale").value
                    ) * this.radius
                  );
                },
              }),
              s("triangle-cross", {
                points: [0, 0, 0.15, -0.3, -0.15, -0.3, 0, 0],
                baseCrossLinePts: [
                  -0.15, -0.4, -0.15, -0.4, 0.15, -0.4, 0.15, -0.4,
                ],
                crossLinePts: function (e, t) {
                  var n = this.baseCrossLinePts.slice(),
                    r = t / e;
                  return (n[3] = n[3] - r), (n[5] = n[5] - r), n;
                },
                collide: function (e, t, n, r, o, s, l) {
                  var u = a(i(this.points, n + 2 * l, r, o)),
                    c = a(i(this.crossLinePts(n, s), n + 2 * l, r, o));
                  return Gt(e, t, u) || Gt(e, t, c);
                },
                draw: function (e, n, r, a, o) {
                  var s = i(this.points, n, r, a),
                    l = i(this.crossLinePts(n, o), n, r, a);
                  t.arrowShapeImpl(this.name)(e, s, l);
                },
              }),
              s("vee", {
                points: [-0.15, -0.3, 0, 0, 0.15, -0.3, 0, -0.15],
                gap: function (e) {
                  return 0.525 * o(e);
                },
              }),
              s("circle", {
                radius: 0.15,
                collide: function (e, t, n, r, i, a, o) {
                  var s = i;
                  return (
                    Math.pow(s.x - e, 2) + Math.pow(s.y - t, 2) <=
                    Math.pow((n + 2 * o) * this.radius, 2)
                  );
                },
                draw: function (e, n, r, i, a) {
                  t.arrowShapeImpl(this.name)(e, i.x, i.y, this.radius * n);
                },
                spacing: function (e) {
                  return (
                    t.getArrowWidth(
                      e.pstyle("width").pfValue,
                      e.pstyle("arrow-scale").value
                    ) * this.radius
                  );
                },
              }),
              s("tee", {
                points: [-0.15, 0, -0.15, -0.1, 0.15, -0.1, 0.15, 0],
                spacing: function (e) {
                  return 1;
                },
                gap: function (e) {
                  return 1;
                },
              }),
              s("square", {
                points: [-0.15, 0, 0.15, 0, 0.15, -0.3, -0.15, -0.3],
              }),
              s("diamond", {
                points: [-0.15, -0.15, 0, -0.3, 0.15, -0.15, 0, 0],
                gap: function (e) {
                  return (
                    e.pstyle("width").pfValue * e.pstyle("arrow-scale").value
                  );
                },
              }),
              s("chevron", {
                points: [
                  0, 0, -0.15, -0.15, -0.1, -0.2, 0, -0.1, 0.1, -0.2, 0.15,
                  -0.15,
                ],
                gap: function (e) {
                  return (
                    0.95 *
                    e.pstyle("width").pfValue *
                    e.pstyle("arrow-scale").value
                  );
                },
              });
          },
        },
        Us = {
          projectIntoViewport: function (e, t) {
            var n = this.cy,
              r = this.findContainerClientCoords(),
              i = r[0],
              a = r[1],
              o = r[4],
              s = n.pan(),
              l = n.zoom();
            return [((e - i) / o - s.x) / l, ((t - a) / o - s.y) / l];
          },
          findContainerClientCoords: function () {
            if (this.containerBB) return this.containerBB;
            var e = this.container,
              t = e.getBoundingClientRect(),
              n = this.cy.window().getComputedStyle(e),
              r = function (e) {
                return parseFloat(n.getPropertyValue(e));
              },
              i = r("padding-left"),
              a = r("padding-right"),
              o = r("padding-top"),
              s = r("padding-bottom"),
              l = r("border-left-width"),
              u = r("border-right-width"),
              c = r("border-top-width"),
              d = (r("border-bottom-width"), e.clientWidth),
              h = e.clientHeight,
              p = i + a,
              f = o + s,
              g = l + u,
              v = t.width / (d + g),
              y = d - p,
              m = h - f,
              b = t.left + i + l,
              x = t.top + o + c;
            return (this.containerBB = [b, x, y, m, v]);
          },
          invalidateContainerClientCoordsCache: function () {
            this.containerBB = null;
          },
          findNearestElement: function (e, t, n, r) {
            return this.findNearestElements(e, t, n, r)[0];
          },
          findNearestElements: function (e, t, n, r) {
            var i,
              a,
              o = this,
              s = this,
              l = s.getCachedZSortedEles(),
              u = [],
              c = s.cy.zoom(),
              d = s.cy.hasCompoundNodes(),
              h = (r ? 24 : 8) / c,
              p = (r ? 8 : 2) / c,
              f = (r ? 8 : 2) / c,
              g = 1 / 0;
            function v(e, t) {
              if (e.isNode()) {
                if (a) return;
                (a = e), u.push(e);
              }
              if (e.isEdge() && (null == t || t < g))
                if (i) {
                  if (
                    i.pstyle("z-compound-depth").value ===
                      e.pstyle("z-compound-depth").value &&
                    i.pstyle("z-compound-depth").value ===
                      e.pstyle("z-compound-depth").value
                  )
                    for (var n = 0; n < u.length; n++)
                      if (u[n].isEdge()) {
                        (u[n] = e), (i = e), (g = null != t ? t : g);
                        break;
                      }
                } else u.push(e), (i = e), (g = null != t ? t : g);
            }
            function y(n) {
              var r = n.outerWidth() + 2 * p,
                i = n.outerHeight() + 2 * p,
                a = r / 2,
                l = i / 2,
                u = n.position(),
                c =
                  "auto" === n.pstyle("corner-radius").value
                    ? "auto"
                    : n.pstyle("corner-radius").pfValue,
                d = n._private.rscratch;
              if (
                u.x - a <= e &&
                e <= u.x + a &&
                u.y - l <= t &&
                t <= u.y + l &&
                s.nodeShapes[o.getNodeShape(n)].checkPoint(
                  e,
                  t,
                  0,
                  r,
                  i,
                  u.x,
                  u.y,
                  c,
                  d
                )
              )
                return v(n, 0), !0;
            }
            function m(n) {
              var r,
                i = n._private,
                a = i.rscratch,
                l = n.pstyle("width").pfValue,
                c = n.pstyle("arrow-scale").value,
                p = l / 2 + h,
                f = p * p,
                g = 2 * p,
                m = i.source,
                b = i.target;
              if (
                "segments" === a.edgeType ||
                "straight" === a.edgeType ||
                "haystack" === a.edgeType
              ) {
                for (var x = a.allpts, w = 0; w + 3 < x.length; w += 2)
                  if (
                    Yt(e, t, x[w], x[w + 1], x[w + 2], x[w + 3], g) &&
                    f > (r = Ht(e, t, x[w], x[w + 1], x[w + 2], x[w + 3]))
                  )
                    return v(n, r), !0;
              } else if (
                "bezier" === a.edgeType ||
                "multibezier" === a.edgeType ||
                "self" === a.edgeType ||
                "compound" === a.edgeType
              )
                for (x = a.allpts, w = 0; w + 5 < a.allpts.length; w += 4)
                  if (
                    Xt(
                      e,
                      t,
                      x[w],
                      x[w + 1],
                      x[w + 2],
                      x[w + 3],
                      x[w + 4],
                      x[w + 5],
                      g
                    ) &&
                    f >
                      (r = Wt(
                        e,
                        t,
                        x[w],
                        x[w + 1],
                        x[w + 2],
                        x[w + 3],
                        x[w + 4],
                        x[w + 5]
                      ))
                  )
                    return v(n, r), !0;
              (m = m || i.source), (b = b || i.target);
              var E = o.getArrowWidth(l, c),
                C = [
                  {
                    name: "source",
                    x: a.arrowStartX,
                    y: a.arrowStartY,
                    angle: a.srcArrowAngle,
                  },
                  {
                    name: "target",
                    x: a.arrowEndX,
                    y: a.arrowEndY,
                    angle: a.tgtArrowAngle,
                  },
                  {
                    name: "mid-source",
                    x: a.midX,
                    y: a.midY,
                    angle: a.midsrcArrowAngle,
                  },
                  {
                    name: "mid-target",
                    x: a.midX,
                    y: a.midY,
                    angle: a.midtgtArrowAngle,
                  },
                ];
              for (w = 0; w < C.length; w++) {
                var k = C[w],
                  T = s.arrowShapes[n.pstyle(k.name + "-arrow-shape").value],
                  S = n.pstyle("width").pfValue;
                if (
                  T.roughCollide(e, t, E, k.angle, { x: k.x, y: k.y }, S, h) &&
                  T.collide(e, t, E, k.angle, { x: k.x, y: k.y }, S, h)
                )
                  return v(n), !0;
              }
              d && u.length > 0 && (y(m), y(b));
            }
            function b(e, t, n) {
              return $e(e, t, n);
            }
            function x(n, r) {
              var i,
                a = n._private,
                o = f;
              (i = r ? r + "-" : ""), n.boundingBox();
              var s = a.labelBounds[r || "main"],
                l = n.pstyle(i + "label").value;
              if ("yes" === n.pstyle("text-events").strValue && l) {
                var u = b(a.rscratch, "labelX", r),
                  c = b(a.rscratch, "labelY", r),
                  d = b(a.rscratch, "labelAngle", r),
                  h = n.pstyle(i + "text-margin-x").pfValue,
                  p = n.pstyle(i + "text-margin-y").pfValue,
                  g = s.x1 - o - h,
                  y = s.x2 + o - h,
                  m = s.y1 - o - p,
                  x = s.y2 + o - p;
                if (d) {
                  var w = Math.cos(d),
                    E = Math.sin(d),
                    C = function (e, t) {
                      return {
                        x: (e -= u) * w - (t -= c) * E + u,
                        y: e * E + t * w + c,
                      };
                    },
                    k = C(g, m),
                    T = C(g, x),
                    S = C(y, m),
                    P = C(y, x),
                    D = [
                      k.x + h,
                      k.y + p,
                      S.x + h,
                      S.y + p,
                      P.x + h,
                      P.y + p,
                      T.x + h,
                      T.y + p,
                    ];
                  if (Gt(e, t, D)) return v(n), !0;
                } else if (Vt(s, e, t)) return v(n), !0;
              }
            }
            n && (l = l.interactive);
            for (var w = l.length - 1; w >= 0; w--) {
              var E = l[w];
              E.isNode()
                ? y(E) || x(E)
                : m(E) || x(E) || x(E, "source") || x(E, "target");
            }
            return u;
          },
          getAllInBox: function (e, t, n, r) {
            for (
              var i,
                a,
                o = this.getCachedZSortedEles().interactive,
                s = [],
                l = Math.min(e, n),
                u = Math.max(e, n),
                c = Math.min(t, r),
                d = Math.max(t, r),
                h = Bt({ x1: (e = l), y1: (t = c), x2: (n = u), y2: (r = d) }),
                p = 0;
              p < o.length;
              p++
            ) {
              var f = o[p];
              if (f.isNode()) {
                var g = f,
                  v = g.boundingBox({
                    includeNodes: !0,
                    includeEdges: !1,
                    includeLabels: !1,
                  });
                Ft(h, v) && !qt(v, h) && s.push(g);
              } else {
                var y = f,
                  m = y._private,
                  b = m.rscratch;
                if (
                  null != b.startX &&
                  null != b.startY &&
                  !Vt(h, b.startX, b.startY)
                )
                  continue;
                if (null != b.endX && null != b.endY && !Vt(h, b.endX, b.endY))
                  continue;
                if (
                  "bezier" === b.edgeType ||
                  "multibezier" === b.edgeType ||
                  "self" === b.edgeType ||
                  "compound" === b.edgeType ||
                  "segments" === b.edgeType ||
                  "haystack" === b.edgeType
                ) {
                  for (
                    var x =
                        m.rstyle.bezierPts ||
                        m.rstyle.linePts ||
                        m.rstyle.haystackPts,
                      w = !0,
                      E = 0;
                    E < x.length;
                    E++
                  )
                    if (((i = h), (a = x[E]), !Vt(i, a.x, a.y))) {
                      w = !1;
                      break;
                    }
                  w && s.push(y);
                } else
                  ("haystack" !== b.edgeType && "straight" !== b.edgeType) ||
                    s.push(y);
              }
            }
            return s;
          },
        },
        Ks = {
          calculateArrowAngles: function (e) {
            var t,
              n,
              r,
              i,
              a,
              o,
              s = e._private.rscratch,
              l = "haystack" === s.edgeType,
              u = "bezier" === s.edgeType,
              c = "multibezier" === s.edgeType,
              d = "segments" === s.edgeType,
              h = "compound" === s.edgeType,
              p = "self" === s.edgeType;
            if (
              (l
                ? ((r = s.haystackPts[0]),
                  (i = s.haystackPts[1]),
                  (a = s.haystackPts[2]),
                  (o = s.haystackPts[3]))
                : ((r = s.arrowStartX),
                  (i = s.arrowStartY),
                  (a = s.arrowEndX),
                  (o = s.arrowEndY)),
              (g = s.midX),
              (v = s.midY),
              d)
            )
              (t = r - s.segpts[0]), (n = i - s.segpts[1]);
            else if (c || h || p || u) {
              var f = s.allpts;
              (t = r - Mt(f[0], f[2], f[4], 0.1)),
                (n = i - Mt(f[1], f[3], f[5], 0.1));
            } else (t = r - g), (n = i - v);
            s.srcArrowAngle = kt(t, n);
            var g = s.midX,
              v = s.midY;
            if (
              (l && ((g = (r + a) / 2), (v = (i + o) / 2)),
              (t = a - r),
              (n = o - i),
              d)
            )
              if (((f = s.allpts).length / 2) % 2 == 0) {
                var y = (T = f.length / 2) - 2;
                (t = f[T] - f[y]), (n = f[T + 1] - f[y + 1]);
              } else
                s.isRound
                  ? ((t = s.midVector[1]), (n = -s.midVector[0]))
                  : ((y = (T = f.length / 2 - 1) - 2),
                    (t = f[T] - f[y]),
                    (n = f[T + 1] - f[y + 1]));
            else if (c || h || p) {
              var m, b, x, w;
              f = s.allpts;
              if ((s.ctrlpts.length / 2) % 2 == 0) {
                var E = 2 + (C = 2 + (k = f.length / 2 - 1));
                (m = Mt(f[k], f[C], f[E], 0)),
                  (b = Mt(f[k + 1], f[C + 1], f[E + 1], 0)),
                  (x = Mt(f[k], f[C], f[E], 1e-4)),
                  (w = Mt(f[k + 1], f[C + 1], f[E + 1], 1e-4));
              } else {
                var C, k;
                (E = 2 + (C = f.length / 2 - 1)),
                  (m = Mt(f[(k = C - 2)], f[C], f[E], 0.4999)),
                  (b = Mt(f[k + 1], f[C + 1], f[E + 1], 0.4999)),
                  (x = Mt(f[k], f[C], f[E], 0.5)),
                  (w = Mt(f[k + 1], f[C + 1], f[E + 1], 0.5));
              }
              (t = x - m), (n = w - b);
            }
            if (
              ((s.midtgtArrowAngle = kt(t, n)),
              (s.midDispX = t),
              (s.midDispY = n),
              (t *= -1),
              (n *= -1),
              d)
            )
              if (((f = s.allpts).length / 2) % 2 == 0);
              else if (!s.isRound) {
                var T,
                  S = 2 + (T = f.length / 2 - 1);
                (t = -(f[S] - f[T])), (n = -(f[S + 1] - f[T + 1]));
              }
            if (((s.midsrcArrowAngle = kt(t, n)), d))
              (t = a - s.segpts[s.segpts.length - 2]),
                (n = o - s.segpts[s.segpts.length - 1]);
            else if (c || h || p || u) {
              var P = (f = s.allpts).length;
              (t = a - Mt(f[P - 6], f[P - 4], f[P - 2], 0.9)),
                (n = o - Mt(f[P - 5], f[P - 3], f[P - 1], 0.9));
            } else (t = a - g), (n = o - v);
            s.tgtArrowAngle = kt(t, n);
          },
        };
      Ks.getArrowWidth = Ks.getArrowHeight = function (e, t) {
        var n = (this.arrowWidthCache = this.arrowWidthCache || {}),
          r = n[e + ", " + t];
        return (
          r ||
          ((r = Math.max(Math.pow(13.37 * e, 0.9), 29) * t),
          (n[e + ", " + t] = r),
          r)
        );
      };
      var Zs,
        $s,
        Qs,
        Js,
        el,
        tl,
        nl,
        rl,
        il,
        al,
        ol,
        sl,
        ll,
        ul,
        cl,
        dl,
        hl,
        pl = {},
        fl = {},
        gl = function (e, t, n) {
          (n.x = t.x - e.x),
            (n.y = t.y - e.y),
            (n.len = Math.sqrt(n.x * n.x + n.y * n.y)),
            (n.nx = n.x / n.len),
            (n.ny = n.y / n.len),
            (n.ang = Math.atan2(n.ny, n.nx));
        };
      function vl(e, t) {
        0 === t.radius
          ? e.lineTo(t.cx, t.cy)
          : e.arc(
              t.cx,
              t.cy,
              t.radius,
              t.startAngle,
              t.endAngle,
              t.counterClockwise
            );
      }
      function yl(e, t, n, r) {
        var i =
          !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
        return 0 === r || 0 === t.radius
          ? {
              cx: t.x,
              cy: t.y,
              radius: 0,
              startX: t.x,
              startY: t.y,
              stopX: t.x,
              stopY: t.y,
              startAngle: void 0,
              endAngle: void 0,
              counterClockwise: void 0,
            }
          : ((function (e, t, n, r, i) {
              var a, o;
              if (
                (e !== hl
                  ? gl(t, e, pl)
                  : (((o = pl).x = -1 * (a = fl).x),
                    (o.y = -1 * a.y),
                    (o.nx = -1 * a.nx),
                    (o.ny = -1 * a.ny),
                    (o.ang = a.ang > 0 ? -(Math.PI - a.ang) : Math.PI + a.ang)),
                gl(t, n, fl),
                (Qs = pl.nx * fl.ny - pl.ny * fl.nx),
                (Js = pl.nx * fl.nx - pl.ny * -fl.ny),
                (nl = Math.asin(Math.max(-1, Math.min(1, Qs)))),
                Math.abs(nl) < 1e-6)
              )
                return (Zs = t.x), ($s = t.y), void (il = ol = 0);
              (el = 1),
                (tl = !1),
                Js < 0
                  ? nl < 0
                    ? (nl = Math.PI + nl)
                    : ((nl = Math.PI - nl), (el = -1), (tl = !0))
                  : nl > 0 && ((el = -1), (tl = !0)),
                (ol = void 0 !== t.radius ? t.radius : r),
                (rl = nl / 2),
                (sl = Math.min(pl.len / 2, fl.len / 2)),
                i
                  ? (al = Math.abs((Math.cos(rl) * ol) / Math.sin(rl))) > sl
                    ? ((al = sl),
                      (il = Math.abs((al * Math.sin(rl)) / Math.cos(rl))))
                    : (il = ol)
                  : ((al = Math.min(sl, ol)),
                    (il = Math.abs((al * Math.sin(rl)) / Math.cos(rl)))),
                (cl = t.x + fl.nx * al),
                (dl = t.y + fl.ny * al),
                (Zs = cl - fl.ny * il * el),
                ($s = dl + fl.nx * il * el),
                (ll = t.x + pl.nx * al),
                (ul = t.y + pl.ny * al),
                (hl = t);
            })(e, t, n, r, i),
            {
              cx: Zs,
              cy: $s,
              radius: il,
              startX: ll,
              startY: ul,
              stopX: cl,
              stopY: dl,
              startAngle: pl.ang + (Math.PI / 2) * el,
              endAngle: fl.ang - (Math.PI / 2) * el,
              counterClockwise: tl,
            });
      }
      var ml = {};
      function bl(e) {
        var t = [];
        if (null != e) {
          for (var n = 0; n < e.length; n += 2) {
            var r = e[n],
              i = e[n + 1];
            t.push({ x: r, y: i });
          }
          return t;
        }
      }
      (ml.findMidptPtsEtc = function (e, t) {
        var n,
          r = t.posPts,
          i = t.intersectionPts,
          a = t.vectorNormInverse,
          o = e.pstyle("source-endpoint"),
          s = e.pstyle("target-endpoint"),
          u = null != o.units && null != s.units;
        switch (e.pstyle("edge-distances").value) {
          case "node-position":
            n = r;
            break;
          case "intersection":
            n = i;
            break;
          case "endpoints":
            if (u) {
              var c = l(this.manualEndptToPx(e.source()[0], o), 2),
                d = c[0],
                h = c[1],
                p = l(this.manualEndptToPx(e.target()[0], s), 2),
                f = p[0],
                g = p[1],
                v = { x1: d, y1: h, x2: f, y2: g };
              (a = (function (e, t, n, r) {
                var i = r - t,
                  a = n - e,
                  o = Math.sqrt(a * a + i * i);
                return { x: -i / o, y: a / o };
              })(d, h, f, g)),
                (n = v);
            } else
              Ye(
                "Edge ".concat(
                  e.id(),
                  " has edge-distances:endpoints specified without manual endpoints specified via source-endpoint and target-endpoint.  Falling back on edge-distances:intersection (default)."
                )
              ),
                (n = i);
        }
        return { midptPts: n, vectorNormInverse: a };
      }),
        (ml.findHaystackPoints = function (e) {
          for (var t = 0; t < e.length; t++) {
            var n = e[t],
              r = n._private,
              i = r.rscratch;
            if (!i.haystack) {
              var a = 2 * Math.random() * Math.PI;
              (i.source = { x: Math.cos(a), y: Math.sin(a) }),
                (a = 2 * Math.random() * Math.PI),
                (i.target = { x: Math.cos(a), y: Math.sin(a) });
            }
            var o = r.source,
              s = r.target,
              l = o.position(),
              u = s.position(),
              c = o.width(),
              d = s.width(),
              h = o.height(),
              p = s.height(),
              f = n.pstyle("haystack-radius").value / 2;
            (i.haystackPts = i.allpts =
              [
                i.source.x * c * f + l.x,
                i.source.y * h * f + l.y,
                i.target.x * d * f + u.x,
                i.target.y * p * f + u.y,
              ]),
              (i.midX = (i.allpts[0] + i.allpts[2]) / 2),
              (i.midY = (i.allpts[1] + i.allpts[3]) / 2),
              (i.edgeType = "haystack"),
              (i.haystack = !0),
              this.storeEdgeProjections(n),
              this.calculateArrowAngles(n),
              this.recalculateEdgeLabelProjections(n),
              this.calculateLabelAngles(n);
          }
        }),
        (ml.findSegmentsPoints = function (e, t) {
          var n = e._private.rscratch,
            r = e.pstyle("segment-weights"),
            i = e.pstyle("segment-distances"),
            a = e.pstyle("segment-radii"),
            o = e.pstyle("radius-type"),
            s = Math.min(r.pfValue.length, i.pfValue.length),
            l = a.pfValue[a.pfValue.length - 1],
            u = o.pfValue[o.pfValue.length - 1];
          (n.edgeType = "segments"),
            (n.segpts = []),
            (n.radii = []),
            (n.isArcRadius = []);
          for (var c = 0; c < s; c++) {
            var d = r.pfValue[c],
              h = i.pfValue[c],
              p = 1 - d,
              f = d,
              g = this.findMidptPtsEtc(e, t),
              v = g.midptPts,
              y = g.vectorNormInverse,
              m = { x: v.x1 * p + v.x2 * f, y: v.y1 * p + v.y2 * f };
            n.segpts.push(m.x + y.x * h, m.y + y.y * h),
              n.radii.push(void 0 !== a.pfValue[c] ? a.pfValue[c] : l),
              n.isArcRadius.push(
                "arc-radius" === (void 0 !== o.pfValue[c] ? o.pfValue[c] : u)
              );
          }
        }),
        (ml.findLoopPoints = function (e, t, n, r) {
          var i = e._private.rscratch,
            a = t.dirCounts,
            o = t.srcPos,
            s = e.pstyle("control-point-distances"),
            l = s ? s.pfValue[0] : void 0,
            u = e.pstyle("loop-direction").pfValue,
            c = e.pstyle("loop-sweep").pfValue,
            d = e.pstyle("control-point-step-size").pfValue;
          i.edgeType = "self";
          var h = n,
            p = d;
          r && ((h = 0), (p = l));
          var f = u - Math.PI / 2,
            g = f - c / 2,
            v = f + c / 2,
            y = String(u + "_" + c);
          (h = void 0 === a[y] ? (a[y] = 0) : ++a[y]),
            (i.ctrlpts = [
              o.x + 1.4 * Math.cos(g) * p * (h / 3 + 1),
              o.y + 1.4 * Math.sin(g) * p * (h / 3 + 1),
              o.x + 1.4 * Math.cos(v) * p * (h / 3 + 1),
              o.y + 1.4 * Math.sin(v) * p * (h / 3 + 1),
            ]);
        }),
        (ml.findCompoundLoopPoints = function (e, t, n, r) {
          var i = e._private.rscratch;
          i.edgeType = "compound";
          var a = t.srcPos,
            o = t.tgtPos,
            s = t.srcW,
            l = t.srcH,
            u = t.tgtW,
            c = t.tgtH,
            d = e.pstyle("control-point-step-size").pfValue,
            h = e.pstyle("control-point-distances"),
            p = h ? h.pfValue[0] : void 0,
            f = n,
            g = d;
          r && ((f = 0), (g = p));
          var v = { x: a.x - s / 2, y: a.y - l / 2 },
            y = { x: o.x - u / 2, y: o.y - c / 2 },
            m = { x: Math.min(v.x, y.x), y: Math.min(v.y, y.y) },
            b = Math.max(0.5, Math.log(0.01 * s)),
            x = Math.max(0.5, Math.log(0.01 * u));
          i.ctrlpts = [
            m.x,
            m.y - (1 + Math.pow(50, 1.12) / 100) * g * (f / 3 + 1) * b,
            m.x - (1 + Math.pow(50, 1.12) / 100) * g * (f / 3 + 1) * x,
            m.y,
          ];
        }),
        (ml.findStraightEdgePoints = function (e) {
          e._private.rscratch.edgeType = "straight";
        }),
        (ml.findBezierPoints = function (e, t, n, r, i) {
          var a = e._private.rscratch,
            o = e.pstyle("control-point-step-size").pfValue,
            s = e.pstyle("control-point-distances"),
            l = e.pstyle("control-point-weights"),
            u = s && l ? Math.min(s.value.length, l.value.length) : 1,
            c = s ? s.pfValue[0] : void 0,
            d = l.value[0],
            h = r;
          (a.edgeType = h ? "multibezier" : "bezier"), (a.ctrlpts = []);
          for (var p = 0; p < u; p++) {
            var f,
              g = (0.5 - t.eles.length / 2 + n) * o * (i ? -1 : 1),
              v = St(g);
            h && ((c = s ? s.pfValue[p] : o), (d = l.value[p]));
            var y =
                void 0 !== (f = r ? c : void 0 !== c ? v * c : void 0) ? f : g,
              m = 1 - d,
              b = d,
              x = this.findMidptPtsEtc(e, t),
              w = x.midptPts,
              E = x.vectorNormInverse,
              C = { x: w.x1 * m + w.x2 * b, y: w.y1 * m + w.y2 * b };
            a.ctrlpts.push(C.x + E.x * y, C.y + E.y * y);
          }
        }),
        (ml.findTaxiPoints = function (e, t) {
          var n = e._private.rscratch;
          n.edgeType = "segments";
          var r = "vertical",
            i = "horizontal",
            a = "leftward",
            o = "rightward",
            s = "downward",
            l = "upward",
            u = t.posPts,
            c = t.srcW,
            d = t.srcH,
            h = t.tgtW,
            p = t.tgtH,
            f = "node-position" !== e.pstyle("edge-distances").value,
            g = e.pstyle("taxi-direction").value,
            v = g,
            y = e.pstyle("taxi-turn"),
            m = "%" === y.units,
            b = y.pfValue,
            x = b < 0,
            w = e.pstyle("taxi-turn-min-distance").pfValue,
            E = f ? (c + h) / 2 : 0,
            C = f ? (d + p) / 2 : 0,
            k = u.x2 - u.x1,
            T = u.y2 - u.y1,
            S = function (e, t) {
              return e > 0 ? Math.max(e - t, 0) : Math.min(e + t, 0);
            },
            P = S(k, E),
            D = S(T, C),
            _ = !1;
          "auto" === v
            ? (g = Math.abs(P) > Math.abs(D) ? i : r)
            : v === l || v === s
            ? ((g = r), (_ = !0))
            : (v !== a && v !== o) || ((g = i), (_ = !0));
          var M,
            N = g === r,
            I = N ? D : P,
            B = N ? T : k,
            A = St(B),
            L = !1;
          (_ && (m || x)) ||
            !(
              (v === s && B < 0) ||
              (v === l && B > 0) ||
              (v === a && B > 0) ||
              (v === o && B < 0)
            ) ||
            ((I = (A *= -1) * Math.abs(I)), (L = !0));
          var O = function (e) {
              return Math.abs(e) < w || Math.abs(e) >= Math.abs(I);
            },
            R = O((M = m ? (b < 0 ? 1 + b : b) * I : (b < 0 ? I : 0) + b * A)),
            z = O(Math.abs(I) - Math.abs(M));
          if ((!R && !z) || L)
            if (N) {
              var F = u.y1 + M + (f ? (d / 2) * A : 0),
                V = u.x1,
                q = u.x2;
              n.segpts = [V, F, q, F];
            } else {
              var j = u.x1 + M + (f ? (c / 2) * A : 0),
                Y = u.y1,
                X = u.y2;
              n.segpts = [j, Y, j, X];
            }
          else if (N) {
            var W = Math.abs(B) <= d / 2,
              H = Math.abs(k) <= h / 2;
            if (W) {
              var G = (u.x1 + u.x2) / 2,
                U = u.y1,
                K = u.y2;
              n.segpts = [G, U, G, K];
            } else if (H) {
              var Z = (u.y1 + u.y2) / 2,
                $ = u.x1,
                Q = u.x2;
              n.segpts = [$, Z, Q, Z];
            } else n.segpts = [u.x1, u.y2];
          } else {
            var J = Math.abs(B) <= c / 2,
              ee = Math.abs(T) <= p / 2;
            if (J) {
              var te = (u.y1 + u.y2) / 2,
                ne = u.x1,
                re = u.x2;
              n.segpts = [ne, te, re, te];
            } else if (ee) {
              var ie = (u.x1 + u.x2) / 2,
                ae = u.y1,
                oe = u.y2;
              n.segpts = [ie, ae, ie, oe];
            } else n.segpts = [u.x2, u.y1];
          }
          if (n.isRound) {
            var se = e.pstyle("taxi-radius").value,
              le = "arc-radius" === e.pstyle("radius-type").value[0];
            (n.radii = new Array(n.segpts.length / 2).fill(se)),
              (n.isArcRadius = new Array(n.segpts.length / 2).fill(le));
          }
        }),
        (ml.tryToCorrectInvalidPoints = function (e, t) {
          var n = e._private.rscratch;
          if ("bezier" === n.edgeType) {
            var r = t.srcPos,
              i = t.tgtPos,
              a = t.srcW,
              o = t.srcH,
              s = t.tgtW,
              l = t.tgtH,
              u = t.srcShape,
              c = t.tgtShape,
              d = t.srcCornerRadius,
              h = t.tgtCornerRadius,
              p = t.srcRs,
              f = t.tgtRs,
              g = !E(n.startX) || !E(n.startY),
              v = !E(n.arrowStartX) || !E(n.arrowStartY),
              y = !E(n.endX) || !E(n.endY),
              m = !E(n.arrowEndX) || !E(n.arrowEndY),
              b =
                this.getArrowWidth(
                  e.pstyle("width").pfValue,
                  e.pstyle("arrow-scale").value
                ) *
                this.arrowShapeWidth *
                3,
              x = Pt(
                { x: n.ctrlpts[0], y: n.ctrlpts[1] },
                { x: n.startX, y: n.startY }
              ),
              w = x < b,
              C = Pt(
                { x: n.ctrlpts[0], y: n.ctrlpts[1] },
                { x: n.endX, y: n.endY }
              ),
              k = C < b,
              T = !1;
            if (g || v || w) {
              T = !0;
              var S = { x: n.ctrlpts[0] - r.x, y: n.ctrlpts[1] - r.y },
                P = Math.sqrt(S.x * S.x + S.y * S.y),
                D = { x: S.x / P, y: S.y / P },
                _ = Math.max(a, o),
                M = {
                  x: n.ctrlpts[0] + 2 * D.x * _,
                  y: n.ctrlpts[1] + 2 * D.y * _,
                },
                N = u.intersectLine(r.x, r.y, a, o, M.x, M.y, 0, d, p);
              w
                ? ((n.ctrlpts[0] = n.ctrlpts[0] + D.x * (b - x)),
                  (n.ctrlpts[1] = n.ctrlpts[1] + D.y * (b - x)))
                : ((n.ctrlpts[0] = N[0] + D.x * b),
                  (n.ctrlpts[1] = N[1] + D.y * b));
            }
            if (y || m || k) {
              T = !0;
              var I = { x: n.ctrlpts[0] - i.x, y: n.ctrlpts[1] - i.y },
                B = Math.sqrt(I.x * I.x + I.y * I.y),
                A = { x: I.x / B, y: I.y / B },
                L = Math.max(a, o),
                O = {
                  x: n.ctrlpts[0] + 2 * A.x * L,
                  y: n.ctrlpts[1] + 2 * A.y * L,
                },
                R = c.intersectLine(i.x, i.y, s, l, O.x, O.y, 0, h, f);
              k
                ? ((n.ctrlpts[0] = n.ctrlpts[0] + A.x * (b - C)),
                  (n.ctrlpts[1] = n.ctrlpts[1] + A.y * (b - C)))
                : ((n.ctrlpts[0] = R[0] + A.x * b),
                  (n.ctrlpts[1] = R[1] + A.y * b));
            }
            T && this.findEndpoints(e);
          }
        }),
        (ml.storeAllpts = function (e) {
          var t = e._private.rscratch;
          if (
            "multibezier" === t.edgeType ||
            "bezier" === t.edgeType ||
            "self" === t.edgeType ||
            "compound" === t.edgeType
          ) {
            (t.allpts = []), t.allpts.push(t.startX, t.startY);
            for (var n = 0; n + 1 < t.ctrlpts.length; n += 2)
              t.allpts.push(t.ctrlpts[n], t.ctrlpts[n + 1]),
                n + 3 < t.ctrlpts.length &&
                  t.allpts.push(
                    (t.ctrlpts[n] + t.ctrlpts[n + 2]) / 2,
                    (t.ctrlpts[n + 1] + t.ctrlpts[n + 3]) / 2
                  );
            var r;
            t.allpts.push(t.endX, t.endY),
              (t.ctrlpts.length / 2) % 2 == 0
                ? ((r = t.allpts.length / 2 - 1),
                  (t.midX = t.allpts[r]),
                  (t.midY = t.allpts[r + 1]))
                : ((r = t.allpts.length / 2 - 3),
                  (t.midX = Mt(
                    t.allpts[r],
                    t.allpts[r + 2],
                    t.allpts[r + 4],
                    0.5
                  )),
                  (t.midY = Mt(
                    t.allpts[r + 1],
                    t.allpts[r + 3],
                    t.allpts[r + 5],
                    0.5
                  )));
          } else if ("straight" === t.edgeType)
            (t.allpts = [t.startX, t.startY, t.endX, t.endY]),
              (t.midX = (t.startX + t.endX + t.arrowStartX + t.arrowEndX) / 4),
              (t.midY = (t.startY + t.endY + t.arrowStartY + t.arrowEndY) / 4);
          else if ("segments" === t.edgeType) {
            if (
              ((t.allpts = []),
              t.allpts.push(t.startX, t.startY),
              t.allpts.push.apply(t.allpts, t.segpts),
              t.allpts.push(t.endX, t.endY),
              t.isRound)
            ) {
              t.roundCorners = [];
              for (var i = 2; i + 3 < t.allpts.length; i += 2) {
                var a = t.radii[i / 2 - 1],
                  o = t.isArcRadius[i / 2 - 1];
                t.roundCorners.push(
                  yl(
                    { x: t.allpts[i - 2], y: t.allpts[i - 1] },
                    { x: t.allpts[i], y: t.allpts[i + 1], radius: a },
                    { x: t.allpts[i + 2], y: t.allpts[i + 3] },
                    a,
                    o
                  )
                );
              }
            }
            if (t.segpts.length % 4 == 0) {
              var s = t.segpts.length / 2,
                l = s - 2;
              (t.midX = (t.segpts[l] + t.segpts[s]) / 2),
                (t.midY = (t.segpts[l + 1] + t.segpts[s + 1]) / 2);
            } else {
              var u = t.segpts.length / 2 - 1;
              if (t.isRound) {
                var c = { x: t.segpts[u], y: t.segpts[u + 1] },
                  d = t.roundCorners[u / 2],
                  h = [c.x - d.cx, c.y - d.cy],
                  p =
                    d.radius / Math.sqrt(Math.pow(h[0], 2) + Math.pow(h[1], 2));
                (h = h.map(function (e) {
                  return e * p;
                })),
                  (t.midX = d.cx + h[0]),
                  (t.midY = d.cy + h[1]),
                  (t.midVector = h);
              } else (t.midX = t.segpts[u]), (t.midY = t.segpts[u + 1]);
            }
          }
        }),
        (ml.checkForInvalidEdgeWarning = function (e) {
          var t = e[0]._private.rscratch;
          t.nodesOverlap ||
          (E(t.startX) && E(t.startY) && E(t.endX) && E(t.endY))
            ? (t.loggedErr = !1)
            : t.loggedErr ||
              ((t.loggedErr = !0),
              Ye(
                "Edge `" +
                  e.id() +
                  "` has invalid endpoints and so it is impossible to draw.  Adjust your edge style (e.g. control points) accordingly or use an alternative edge type.  This is expected behaviour when the source node and the target node overlap."
              ));
        }),
        (ml.findEdgeControlPoints = function (e) {
          var t = this;
          if (e && 0 !== e.length) {
            for (
              var n = this,
                r = n.cy.hasCompoundNodes(),
                i = {
                  map: new Je(),
                  get: function (e) {
                    var t = this.map.get(e[0]);
                    return null != t ? t.get(e[1]) : null;
                  },
                  set: function (e, t) {
                    var n = this.map.get(e[0]);
                    null == n && ((n = new Je()), this.map.set(e[0], n)),
                      n.set(e[1], t);
                  },
                },
                a = [],
                o = [],
                s = 0;
              s < e.length;
              s++
            ) {
              var l = e[s],
                u = l._private,
                c = l.pstyle("curve-style").value;
              if (!l.removed() && l.takesUpSpace())
                if ("haystack" !== c) {
                  var d =
                      "unbundled-bezier" === c ||
                      c.endsWith("segments") ||
                      "straight" === c ||
                      "straight-triangle" === c ||
                      c.endsWith("taxi"),
                    h = "unbundled-bezier" === c || "bezier" === c,
                    p = u.source,
                    f = u.target,
                    g = [p.poolIndex(), f.poolIndex()].sort(),
                    v = i.get(g);
                  null == v && ((v = { eles: [] }), i.set(g, v), a.push(g)),
                    v.eles.push(l),
                    d && (v.hasUnbundled = !0),
                    h && (v.hasBezier = !0);
                } else o.push(l);
            }
            for (
              var y = function (e) {
                  var o = a[e],
                    s = i.get(o),
                    l = void 0;
                  if (!s.hasUnbundled) {
                    var u = s.eles[0].parallelEdges().filter(function (e) {
                      return e.isBundledBezier();
                    });
                    Ze(s.eles),
                      u.forEach(function (e) {
                        return s.eles.push(e);
                      }),
                      s.eles.sort(function (e, t) {
                        return e.poolIndex() - t.poolIndex();
                      });
                  }
                  var c = s.eles[0],
                    d = c.source(),
                    h = c.target();
                  if (d.poolIndex() > h.poolIndex()) {
                    var p = d;
                    (d = h), (h = p);
                  }
                  var f = (s.srcPos = d.position()),
                    g = (s.tgtPos = h.position()),
                    v = (s.srcW = d.outerWidth()),
                    y = (s.srcH = d.outerHeight()),
                    m = (s.tgtW = h.outerWidth()),
                    b = (s.tgtH = h.outerHeight()),
                    x = (s.srcShape = n.nodeShapes[t.getNodeShape(d)]),
                    w = (s.tgtShape = n.nodeShapes[t.getNodeShape(h)]),
                    C = (s.srcCornerRadius =
                      "auto" === d.pstyle("corner-radius").value
                        ? "auto"
                        : d.pstyle("corner-radius").pfValue),
                    k = (s.tgtCornerRadius =
                      "auto" === h.pstyle("corner-radius").value
                        ? "auto"
                        : h.pstyle("corner-radius").pfValue),
                    T = (s.tgtRs = h._private.rscratch),
                    S = (s.srcRs = d._private.rscratch);
                  s.dirCounts = {
                    north: 0,
                    west: 0,
                    south: 0,
                    east: 0,
                    northwest: 0,
                    southwest: 0,
                    northeast: 0,
                    southeast: 0,
                  };
                  for (var P = 0; P < s.eles.length; P++) {
                    var D = s.eles[P],
                      _ = D[0]._private.rscratch,
                      M = D.pstyle("curve-style").value,
                      N =
                        "unbundled-bezier" === M ||
                        M.endsWith("segments") ||
                        M.endsWith("taxi"),
                      I = !d.same(D.source());
                    if (
                      !s.calculatedIntersection &&
                      d !== h &&
                      (s.hasBezier || s.hasUnbundled)
                    ) {
                      s.calculatedIntersection = !0;
                      var B = x.intersectLine(
                          f.x,
                          f.y,
                          v,
                          y,
                          g.x,
                          g.y,
                          0,
                          C,
                          S
                        ),
                        A = (s.srcIntn = B),
                        L = w.intersectLine(g.x, g.y, m, b, f.x, f.y, 0, k, T),
                        O = (s.tgtIntn = L),
                        R = (s.intersectionPts = {
                          x1: B[0],
                          x2: L[0],
                          y1: B[1],
                          y2: L[1],
                        }),
                        z = (s.posPts = { x1: f.x, x2: g.x, y1: f.y, y2: g.y }),
                        F = L[1] - B[1],
                        V = L[0] - B[0],
                        q = Math.sqrt(V * V + F * F),
                        j = (s.vector = { x: V, y: F }),
                        Y = (s.vectorNorm = { x: j.x / q, y: j.y / q }),
                        X = { x: -Y.y, y: Y.x };
                      (s.nodesOverlap =
                        !E(q) ||
                        w.checkPoint(B[0], B[1], 0, m, b, g.x, g.y, k, T) ||
                        x.checkPoint(L[0], L[1], 0, v, y, f.x, f.y, C, S)),
                        (s.vectorNormInverse = X),
                        (l = {
                          nodesOverlap: s.nodesOverlap,
                          dirCounts: s.dirCounts,
                          calculatedIntersection: !0,
                          hasBezier: s.hasBezier,
                          hasUnbundled: s.hasUnbundled,
                          eles: s.eles,
                          srcPos: g,
                          tgtPos: f,
                          srcW: m,
                          srcH: b,
                          tgtW: v,
                          tgtH: y,
                          srcIntn: O,
                          tgtIntn: A,
                          srcShape: w,
                          tgtShape: x,
                          posPts: { x1: z.x2, y1: z.y2, x2: z.x1, y2: z.y1 },
                          intersectionPts: {
                            x1: R.x2,
                            y1: R.y2,
                            x2: R.x1,
                            y2: R.y1,
                          },
                          vector: { x: -j.x, y: -j.y },
                          vectorNorm: { x: -Y.x, y: -Y.y },
                          vectorNormInverse: { x: -X.x, y: -X.y },
                        });
                    }
                    var W = I ? l : s;
                    (_.nodesOverlap = W.nodesOverlap),
                      (_.srcIntn = W.srcIntn),
                      (_.tgtIntn = W.tgtIntn),
                      (_.isRound = M.startsWith("round")),
                      r &&
                      (d.isParent() ||
                        d.isChild() ||
                        h.isParent() ||
                        h.isChild()) &&
                      (d.parents().anySame(h) ||
                        h.parents().anySame(d) ||
                        (d.same(h) && d.isParent()))
                        ? t.findCompoundLoopPoints(D, W, P, N)
                        : d === h
                        ? t.findLoopPoints(D, W, P, N)
                        : M.endsWith("segments")
                        ? t.findSegmentsPoints(D, W)
                        : M.endsWith("taxi")
                        ? t.findTaxiPoints(D, W)
                        : "straight" === M ||
                          (!N &&
                            s.eles.length % 2 == 1 &&
                            P === Math.floor(s.eles.length / 2))
                        ? t.findStraightEdgePoints(D)
                        : t.findBezierPoints(D, W, P, N, I),
                      t.findEndpoints(D),
                      t.tryToCorrectInvalidPoints(D, W),
                      t.checkForInvalidEdgeWarning(D),
                      t.storeAllpts(D),
                      t.storeEdgeProjections(D),
                      t.calculateArrowAngles(D),
                      t.recalculateEdgeLabelProjections(D),
                      t.calculateLabelAngles(D);
                  }
                },
                m = 0;
              m < a.length;
              m++
            )
              y(m);
            this.findHaystackPoints(o);
          }
        }),
        (ml.getSegmentPoints = function (e) {
          var t = e[0]._private.rscratch;
          if ("segments" === t.edgeType)
            return this.recalculateRenderedStyle(e), bl(t.segpts);
        }),
        (ml.getControlPoints = function (e) {
          var t = e[0]._private.rscratch,
            n = t.edgeType;
          if (
            "bezier" === n ||
            "multibezier" === n ||
            "self" === n ||
            "compound" === n
          )
            return this.recalculateRenderedStyle(e), bl(t.ctrlpts);
        }),
        (ml.getEdgeMidpoint = function (e) {
          var t = e[0]._private.rscratch;
          return this.recalculateRenderedStyle(e), { x: t.midX, y: t.midY };
        });
      var xl = {
          manualEndptToPx: function (e, t) {
            var n = e.position(),
              r = e.outerWidth(),
              i = e.outerHeight(),
              a = e._private.rscratch;
            if (2 === t.value.length) {
              var o = [t.pfValue[0], t.pfValue[1]];
              return (
                "%" === t.units[0] && (o[0] = o[0] * r),
                "%" === t.units[1] && (o[1] = o[1] * i),
                (o[0] += n.x),
                (o[1] += n.y),
                o
              );
            }
            var s = t.pfValue[0];
            s = -Math.PI / 2 + s;
            var l = 2 * Math.max(r, i),
              u = [n.x + Math.cos(s) * l, n.y + Math.sin(s) * l];
            return this.nodeShapes[this.getNodeShape(e)].intersectLine(
              n.x,
              n.y,
              r,
              i,
              u[0],
              u[1],
              0,
              "auto" === e.pstyle("corner-radius").value
                ? "auto"
                : e.pstyle("corner-radius").pfValue,
              a
            );
          },
          findEndpoints: function (e) {
            var t,
              n,
              r,
              i,
              a,
              o = this,
              s = e.source()[0],
              l = e.target()[0],
              u = s.position(),
              c = l.position(),
              d = e.pstyle("target-arrow-shape").value,
              h = e.pstyle("source-arrow-shape").value,
              p = e.pstyle("target-distance-from-node").pfValue,
              f = e.pstyle("source-distance-from-node").pfValue,
              g = s._private.rscratch,
              v = l._private.rscratch,
              y = e.pstyle("curve-style").value,
              m = e._private.rscratch,
              b = m.edgeType,
              x = "self" === b || "compound" === b,
              w = "bezier" === b || "multibezier" === b || x,
              C = "bezier" !== b,
              k = "straight" === b || "segments" === b,
              T = "segments" === b,
              S = w || C || k,
              P = x || "taxi" === y,
              D = e.pstyle("source-endpoint"),
              _ = P ? "outside-to-node" : D.value,
              M =
                "auto" === s.pstyle("corner-radius").value
                  ? "auto"
                  : s.pstyle("corner-radius").pfValue,
              N = e.pstyle("target-endpoint"),
              I = P ? "outside-to-node" : N.value,
              B =
                "auto" === l.pstyle("corner-radius").value
                  ? "auto"
                  : l.pstyle("corner-radius").pfValue;
            if (((m.srcManEndpt = D), (m.tgtManEndpt = N), w)) {
              var A = [m.ctrlpts[0], m.ctrlpts[1]];
              (n = C
                ? [
                    m.ctrlpts[m.ctrlpts.length - 2],
                    m.ctrlpts[m.ctrlpts.length - 1],
                  ]
                : A),
                (r = A);
            } else if (k) {
              var L = T ? m.segpts.slice(0, 2) : [c.x, c.y];
              (n = T ? m.segpts.slice(m.segpts.length - 2) : [u.x, u.y]),
                (r = L);
            }
            if ("inside-to-node" === I) t = [c.x, c.y];
            else if (N.units) t = this.manualEndptToPx(l, N);
            else if ("outside-to-line" === I) t = m.tgtIntn;
            else if (
              ("outside-to-node" === I || "outside-to-node-or-label" === I
                ? (i = n)
                : ("outside-to-line" !== I &&
                    "outside-to-line-or-label" !== I) ||
                  (i = [u.x, u.y]),
              (t = o.nodeShapes[this.getNodeShape(l)].intersectLine(
                c.x,
                c.y,
                l.outerWidth(),
                l.outerHeight(),
                i[0],
                i[1],
                0,
                B,
                v
              )),
              "outside-to-node-or-label" === I ||
                "outside-to-line-or-label" === I)
            ) {
              var O = l._private.rscratch,
                R = O.labelWidth,
                z = O.labelHeight,
                F = O.labelX,
                V = O.labelY,
                q = R / 2,
                j = z / 2,
                Y = l.pstyle("text-valign").value;
              "top" === Y ? (V -= j) : "bottom" === Y && (V += j);
              var X = l.pstyle("text-halign").value;
              "left" === X ? (F -= q) : "right" === X && (F += q);
              var W = tn(
                i[0],
                i[1],
                [F - q, V - j, F + q, V - j, F + q, V + j, F - q, V + j],
                c.x,
                c.y
              );
              if (W.length > 0) {
                var H = u,
                  G = Dt(H, Ct(t)),
                  U = Dt(H, Ct(W)),
                  K = G;
                U < G && ((t = W), (K = U)),
                  W.length > 2 &&
                    Dt(H, { x: W[2], y: W[3] }) < K &&
                    (t = [W[2], W[3]]);
              }
            }
            var Z = nn(t, n, o.arrowShapes[d].spacing(e) + p),
              $ = nn(t, n, o.arrowShapes[d].gap(e) + p);
            if (
              ((m.endX = $[0]),
              (m.endY = $[1]),
              (m.arrowEndX = Z[0]),
              (m.arrowEndY = Z[1]),
              "inside-to-node" === _)
            )
              t = [u.x, u.y];
            else if (D.units) t = this.manualEndptToPx(s, D);
            else if ("outside-to-line" === _) t = m.srcIntn;
            else if (
              ("outside-to-node" === _ || "outside-to-node-or-label" === _
                ? (a = r)
                : ("outside-to-line" !== _ &&
                    "outside-to-line-or-label" !== _) ||
                  (a = [c.x, c.y]),
              (t = o.nodeShapes[this.getNodeShape(s)].intersectLine(
                u.x,
                u.y,
                s.outerWidth(),
                s.outerHeight(),
                a[0],
                a[1],
                0,
                M,
                g
              )),
              "outside-to-node-or-label" === _ ||
                "outside-to-line-or-label" === _)
            ) {
              var Q = s._private.rscratch,
                J = Q.labelWidth,
                ee = Q.labelHeight,
                te = Q.labelX,
                ne = Q.labelY,
                re = J / 2,
                ie = ee / 2,
                ae = s.pstyle("text-valign").value;
              "top" === ae ? (ne -= ie) : "bottom" === ae && (ne += ie);
              var oe = s.pstyle("text-halign").value;
              "left" === oe ? (te -= re) : "right" === oe && (te += re);
              var se = tn(
                a[0],
                a[1],
                [
                  te - re,
                  ne - ie,
                  te + re,
                  ne - ie,
                  te + re,
                  ne + ie,
                  te - re,
                  ne + ie,
                ],
                u.x,
                u.y
              );
              if (se.length > 0) {
                var le = c,
                  ue = Dt(le, Ct(t)),
                  ce = Dt(le, Ct(se)),
                  de = ue;
                ce < ue && ((t = [se[0], se[1]]), (de = ce)),
                  se.length > 2 &&
                    Dt(le, { x: se[2], y: se[3] }) < de &&
                    (t = [se[2], se[3]]);
              }
            }
            var he = nn(t, r, o.arrowShapes[h].spacing(e) + f),
              pe = nn(t, r, o.arrowShapes[h].gap(e) + f);
            (m.startX = pe[0]),
              (m.startY = pe[1]),
              (m.arrowStartX = he[0]),
              (m.arrowStartY = he[1]),
              S &&
                (E(m.startX) && E(m.startY) && E(m.endX) && E(m.endY)
                  ? (m.badLine = !1)
                  : (m.badLine = !0));
          },
          getSourceEndpoint: function (e) {
            var t = e[0]._private.rscratch;
            return (
              this.recalculateRenderedStyle(e),
              "haystack" === t.edgeType
                ? { x: t.haystackPts[0], y: t.haystackPts[1] }
                : { x: t.arrowStartX, y: t.arrowStartY }
            );
          },
          getTargetEndpoint: function (e) {
            var t = e[0]._private.rscratch;
            return (
              this.recalculateRenderedStyle(e),
              "haystack" === t.edgeType
                ? { x: t.haystackPts[2], y: t.haystackPts[3] }
                : { x: t.arrowEndX, y: t.arrowEndY }
            );
          },
        },
        wl = {};
      function El(e, t, n) {
        for (
          var r = function (e, t, n, r) {
              return Mt(e, t, n, r);
            },
            i = t._private.rstyle.bezierPts,
            a = 0;
          a < e.bezierProjPcts.length;
          a++
        ) {
          var o = e.bezierProjPcts[a];
          i.push({ x: r(n[0], n[2], n[4], o), y: r(n[1], n[3], n[5], o) });
        }
      }
      (wl.storeEdgeProjections = function (e) {
        var t = e._private,
          n = t.rscratch,
          r = n.edgeType;
        if (
          ((t.rstyle.bezierPts = null),
          (t.rstyle.linePts = null),
          (t.rstyle.haystackPts = null),
          "multibezier" === r ||
            "bezier" === r ||
            "self" === r ||
            "compound" === r)
        ) {
          t.rstyle.bezierPts = [];
          for (var i = 0; i + 5 < n.allpts.length; i += 4)
            El(this, e, n.allpts.slice(i, i + 6));
        } else if ("segments" === r) {
          var a = (t.rstyle.linePts = []);
          for (i = 0; i + 1 < n.allpts.length; i += 2)
            a.push({ x: n.allpts[i], y: n.allpts[i + 1] });
        } else if ("haystack" === r) {
          var o = n.haystackPts;
          t.rstyle.haystackPts = [
            { x: o[0], y: o[1] },
            { x: o[2], y: o[3] },
          ];
        }
        t.rstyle.arrowWidth =
          this.getArrowWidth(
            e.pstyle("width").pfValue,
            e.pstyle("arrow-scale").value
          ) * this.arrowShapeWidth;
      }),
        (wl.recalculateEdgeProjections = function (e) {
          this.findEdgeControlPoints(e);
        });
      var Cl = {
          recalculateNodeLabelProjection: function (e) {
            var t = e.pstyle("label").strValue;
            if (!_(t)) {
              var n,
                r,
                i = e._private,
                a = e.width(),
                o = e.height(),
                s = e.padding(),
                l = e.position(),
                u = e.pstyle("text-halign").strValue,
                c = e.pstyle("text-valign").strValue,
                d = i.rscratch,
                h = i.rstyle;
              switch (u) {
                case "left":
                  n = l.x - a / 2 - s;
                  break;
                case "right":
                  n = l.x + a / 2 + s;
                  break;
                default:
                  n = l.x;
              }
              switch (c) {
                case "top":
                  r = l.y - o / 2 - s;
                  break;
                case "bottom":
                  r = l.y + o / 2 + s;
                  break;
                default:
                  r = l.y;
              }
              (d.labelX = n),
                (d.labelY = r),
                (h.labelX = n),
                (h.labelY = r),
                this.calculateLabelAngles(e),
                this.applyLabelDimensions(e);
            }
          },
        },
        kl = function (e, t) {
          var n = Math.atan(t / e);
          return 0 === e && n < 0 && (n *= -1), n;
        },
        Tl = function (e, t) {
          var n = t.x - e.x,
            r = t.y - e.y;
          return kl(n, r);
        };
      (Cl.recalculateEdgeLabelProjections = function (e) {
        var t,
          n = e._private,
          r = n.rscratch,
          i = this,
          a = {
            mid: e.pstyle("label").strValue,
            source: e.pstyle("source-label").strValue,
            target: e.pstyle("target-label").strValue,
          };
        if (a.mid || a.source || a.target) {
          t = { x: r.midX, y: r.midY };
          var o = function (e, t, r) {
            Qe(n.rscratch, e, t, r), Qe(n.rstyle, e, t, r);
          };
          o("labelX", null, t.x), o("labelY", null, t.y);
          var s = kl(r.midDispX, r.midDispY);
          o("labelAutoAngle", null, s);
          var l = function e() {
              if (e.cache) return e.cache;
              for (var t = [], a = 0; a + 5 < r.allpts.length; a += 4) {
                var o = { x: r.allpts[a], y: r.allpts[a + 1] },
                  s = { x: r.allpts[a + 2], y: r.allpts[a + 3] },
                  l = { x: r.allpts[a + 4], y: r.allpts[a + 5] };
                t.push({
                  p0: o,
                  p1: s,
                  p2: l,
                  startDist: 0,
                  length: 0,
                  segments: [],
                });
              }
              var u = n.rstyle.bezierPts,
                c = i.bezierProjPcts.length;
              function d(e, t, n, r, i) {
                var a = Pt(t, n),
                  o = e.segments[e.segments.length - 1],
                  s = {
                    p0: t,
                    p1: n,
                    t0: r,
                    t1: i,
                    startDist: o ? o.startDist + o.length : 0,
                    length: a,
                  };
                e.segments.push(s), (e.length += a);
              }
              for (var h = 0; h < t.length; h++) {
                var p = t[h],
                  f = t[h - 1];
                f && (p.startDist = f.startDist + f.length),
                  d(p, p.p0, u[h * c], 0, i.bezierProjPcts[0]);
                for (var g = 0; g < c - 1; g++)
                  d(
                    p,
                    u[h * c + g],
                    u[h * c + g + 1],
                    i.bezierProjPcts[g],
                    i.bezierProjPcts[g + 1]
                  );
                d(p, u[h * c + c - 1], p.p2, i.bezierProjPcts[c - 1], 1);
              }
              return (e.cache = t);
            },
            u = function (n) {
              var i,
                s = "source" === n;
              if (a[n]) {
                var u = e.pstyle(n + "-text-offset").pfValue;
                switch (r.edgeType) {
                  case "self":
                  case "compound":
                  case "bezier":
                  case "multibezier":
                    for (
                      var c, d = l(), h = 0, p = 0, f = 0;
                      f < d.length;
                      f++
                    ) {
                      for (
                        var g = d[s ? f : d.length - 1 - f], v = 0;
                        v < g.segments.length;
                        v++
                      ) {
                        var y = g.segments[s ? v : g.segments.length - 1 - v],
                          m = f === d.length - 1 && v === g.segments.length - 1;
                        if (((h = p), (p += y.length) >= u || m)) {
                          c = { cp: g, segment: y };
                          break;
                        }
                      }
                      if (c) break;
                    }
                    var b = c.cp,
                      x = c.segment,
                      w = (u - h) / x.length,
                      E = x.t1 - x.t0,
                      C = s ? x.t0 + E * w : x.t1 - E * w;
                    (C = It(0, C, 1)),
                      (t = Nt(b.p0, b.p1, b.p2, C)),
                      (i = (function (e, t, n, r) {
                        var i = It(0, r - 0.001, 1),
                          a = It(0, r + 0.001, 1),
                          o = Nt(e, t, n, i),
                          s = Nt(e, t, n, a);
                        return Tl(o, s);
                      })(b.p0, b.p1, b.p2, C));
                    break;
                  case "straight":
                  case "segments":
                  case "haystack":
                    for (
                      var k, T, S, P, D = 0, _ = r.allpts.length, M = 0;
                      M + 3 < _ &&
                      (s
                        ? ((S = { x: r.allpts[M], y: r.allpts[M + 1] }),
                          (P = { x: r.allpts[M + 2], y: r.allpts[M + 3] }))
                        : ((S = {
                            x: r.allpts[_ - 2 - M],
                            y: r.allpts[_ - 1 - M],
                          }),
                          (P = {
                            x: r.allpts[_ - 4 - M],
                            y: r.allpts[_ - 3 - M],
                          })),
                      (T = D),
                      !((D += k = Pt(S, P)) >= u));
                      M += 2
                    );
                    var N = (u - T) / k;
                    (N = It(0, N, 1)),
                      (t = (function (e, t, n, r) {
                        var i = t.x - e.x,
                          a = t.y - e.y,
                          o = Pt(e, t),
                          s = i / o,
                          l = a / o;
                        return (
                          (n = null == n ? 0 : n),
                          (r = null != r ? r : n * o),
                          { x: e.x + s * r, y: e.y + l * r }
                        );
                      })(S, P, N)),
                      (i = Tl(S, P));
                }
                o("labelX", n, t.x),
                  o("labelY", n, t.y),
                  o("labelAutoAngle", n, i);
              }
            };
          u("source"), u("target"), this.applyLabelDimensions(e);
        }
      }),
        (Cl.applyLabelDimensions = function (e) {
          this.applyPrefixedLabelDimensions(e),
            e.isEdge() &&
              (this.applyPrefixedLabelDimensions(e, "source"),
              this.applyPrefixedLabelDimensions(e, "target"));
        }),
        (Cl.applyPrefixedLabelDimensions = function (e, t) {
          var n = e._private,
            r = this.getLabelText(e, t),
            i = this.calculateLabelDimensions(e, r),
            a = e.pstyle("line-height").pfValue,
            o = e.pstyle("text-wrap").strValue,
            s = $e(n.rscratch, "labelWrapCachedLines", t) || [],
            l = "wrap" !== o ? 1 : Math.max(s.length, 1),
            u = i.height / l,
            c = u * a,
            d = i.width,
            h = i.height + (l - 1) * (a - 1) * u;
          Qe(n.rstyle, "labelWidth", t, d),
            Qe(n.rscratch, "labelWidth", t, d),
            Qe(n.rstyle, "labelHeight", t, h),
            Qe(n.rscratch, "labelHeight", t, h),
            Qe(n.rscratch, "labelLineHeight", t, c);
        }),
        (Cl.getLabelText = function (e, t) {
          var n = e._private,
            r = t ? t + "-" : "",
            i = e.pstyle(r + "label").strValue,
            a = e.pstyle("text-transform").value,
            o = function (e, r) {
              return r ? (Qe(n.rscratch, e, t, r), r) : $e(n.rscratch, e, t);
            };
          if (!i) return "";
          "none" == a ||
            ("uppercase" == a
              ? (i = i.toUpperCase())
              : "lowercase" == a && (i = i.toLowerCase()));
          var s = e.pstyle("text-wrap").value;
          if ("wrap" === s) {
            var l = o("labelKey");
            if (null != l && o("labelWrapKey") === l)
              return o("labelWrapCachedText");
            for (
              var u = i.split("\n"),
                c = e.pstyle("text-max-width").pfValue,
                d = "anywhere" === e.pstyle("text-overflow-wrap").value,
                h = [],
                p = /[\s\u200b]+/,
                f = d ? "" : " ",
                g = 0;
              g < u.length;
              g++
            ) {
              var v = u[g],
                y = this.calculateLabelDimensions(e, v).width;
              if (d) {
                var m = v.split("").join("​");
                v = m;
              }
              if (y > c) {
                for (var b = v.split(p), x = "", w = 0; w < b.length; w++) {
                  var E = b[w],
                    C = 0 === x.length ? E : x + f + E;
                  this.calculateLabelDimensions(e, C).width <= c
                    ? (x += E + f)
                    : (x && h.push(x), (x = E + f));
                }
                x.match(/^[\s\u200b]+$/) || h.push(x);
              } else h.push(v);
            }
            o("labelWrapCachedLines", h),
              (i = o("labelWrapCachedText", h.join("\n"))),
              o("labelWrapKey", l);
          } else if ("ellipsis" === s) {
            var k = e.pstyle("text-max-width").pfValue,
              T = "",
              S = !1;
            if (this.calculateLabelDimensions(e, i).width < k) return i;
            for (
              var P = 0;
              P < i.length &&
              !(this.calculateLabelDimensions(e, T + i[P] + "…").width > k);
              P++
            )
              (T += i[P]), P === i.length - 1 && (S = !0);
            return S || (T += "…"), T;
          }
          return i;
        }),
        (Cl.getLabelJustification = function (e) {
          var t = e.pstyle("text-justification").strValue,
            n = e.pstyle("text-halign").strValue;
          if ("auto" !== t) return t;
          if (!e.isNode()) return "center";
          switch (n) {
            case "left":
              return "right";
            case "right":
              return "left";
            default:
              return "center";
          }
        }),
        (Cl.calculateLabelDimensions = function (e, t) {
          var n = Me(t, e._private.labelDimsKey),
            r = this.labelDimCache || (this.labelDimCache = []),
            i = r[n];
          if (null != i) return i;
          var a = e.pstyle("font-style").strValue,
            o = e.pstyle("font-size").pfValue,
            s = e.pstyle("font-family").strValue,
            l = e.pstyle("font-weight").strValue,
            u = this.labelCalcCanvas,
            c = this.labelCalcCanvasContext;
          if (!u) {
            (u = this.labelCalcCanvas = document.createElement("canvas")),
              (c = this.labelCalcCanvasContext = u.getContext("2d"));
            var d = u.style;
            (d.position = "absolute"),
              (d.left = "-9999px"),
              (d.top = "-9999px"),
              (d.zIndex = "-1"),
              (d.visibility = "hidden"),
              (d.pointerEvents = "none");
          }
          c.font = "".concat(a, " ").concat(l, " ").concat(o, "px ").concat(s);
          for (var h = 0, p = 0, f = t.split("\n"), g = 0; g < f.length; g++) {
            var v = f[g],
              y = c.measureText(v),
              m = Math.ceil(y.width),
              b = o;
            (h = Math.max(m, h)), (p += b);
          }
          return (h += 0), (p += 0), (r[n] = { width: h, height: p });
        }),
        (Cl.calculateLabelAngle = function (e, t) {
          var n = e._private.rscratch,
            r = e.isEdge(),
            i = t ? t + "-" : "",
            a = e.pstyle(i + "text-rotation"),
            o = a.strValue;
          return "none" === o
            ? 0
            : r && "autorotate" === o
            ? n.labelAutoAngle
            : "autorotate" === o
            ? 0
            : a.pfValue;
        }),
        (Cl.calculateLabelAngles = function (e) {
          var t = this,
            n = e.isEdge(),
            r = e._private.rscratch;
          (r.labelAngle = t.calculateLabelAngle(e)),
            n &&
              ((r.sourceLabelAngle = t.calculateLabelAngle(e, "source")),
              (r.targetLabelAngle = t.calculateLabelAngle(e, "target")));
        });
      var Sl = {},
        Pl = !1;
      Sl.getNodeShape = function (e) {
        var t = e.pstyle("shape").value;
        if ("cutrectangle" === t && (e.width() < 28 || e.height() < 28))
          return (
            Pl ||
              (Ye(
                "The `cutrectangle` node shape can not be used at small sizes so `rectangle` is used instead"
              ),
              (Pl = !0)),
            "rectangle"
          );
        if (e.isParent())
          return "rectangle" === t ||
            "roundrectangle" === t ||
            "round-rectangle" === t ||
            "cutrectangle" === t ||
            "cut-rectangle" === t ||
            "barrel" === t
            ? t
            : "rectangle";
        if ("polygon" === t) {
          var n = e.pstyle("shape-polygon-points").value;
          return this.nodeShapes.makePolygon(n).name;
        }
        return t;
      };
      var Dl = {
          updateCachedGrabbedEles: function () {
            var e = this.cachedZSortedEles;
            if (e) {
              (e.drag = []), (e.nondrag = []);
              for (var t = [], n = 0; n < e.length; n++) {
                var r = (i = e[n])._private.rscratch;
                i.grabbed() && !i.isParent()
                  ? t.push(i)
                  : r.inDragLayer
                  ? e.drag.push(i)
                  : e.nondrag.push(i);
              }
              for (n = 0; n < t.length; n++) {
                var i = t[n];
                e.drag.push(i);
              }
            }
          },
          invalidateCachedZSortedEles: function () {
            this.cachedZSortedEles = null;
          },
          getCachedZSortedEles: function (e) {
            if (e || !this.cachedZSortedEles) {
              var t = this.cy.mutableElements().toArray();
              t.sort(Ha),
                (t.interactive = t.filter(function (e) {
                  return e.interactive();
                })),
                (this.cachedZSortedEles = t),
                this.updateCachedGrabbedEles();
            } else t = this.cachedZSortedEles;
            return t;
          },
        },
        _l = {};
      [
        Us,
        Ks,
        ml,
        xl,
        wl,
        Cl,
        Sl,
        {
          registerCalculationListeners: function () {
            var e = this.cy,
              t = e.collection(),
              n = this,
              r = function (e) {
                var n =
                  !(arguments.length > 1 && void 0 !== arguments[1]) ||
                  arguments[1];
                if ((t.merge(e), n))
                  for (var r = 0; r < e.length; r++) {
                    var i = e[r]._private.rstyle;
                    (i.clean = !1), (i.cleanConnected = !1);
                  }
              };
            n.binder(e)
              .on("bounds.* dirty.*", function (e) {
                var t = e.target;
                r(t);
              })
              .on("style.* background.*", function (e) {
                var t = e.target;
                r(t, !1);
              });
            var i = function (i) {
              if (i) {
                var a = n.onUpdateEleCalcsFns;
                t.cleanStyle();
                for (var o = 0; o < t.length; o++) {
                  var s = t[o],
                    l = s._private.rstyle;
                  s.isNode() &&
                    !l.cleanConnected &&
                    (r(s.connectedEdges()), (l.cleanConnected = !0));
                }
                if (a) for (var u = 0; u < a.length; u++) (0, a[u])(i, t);
                n.recalculateRenderedStyle(t), (t = e.collection());
              }
            };
            (n.flushRenderedStyleQueue = function () {
              i(!0);
            }),
              n.beforeRender(i, n.beforeRenderPriorities.eleCalcs);
          },
          onUpdateEleCalcs: function (e) {
            (this.onUpdateEleCalcsFns = this.onUpdateEleCalcsFns || []).push(e);
          },
          recalculateRenderedStyle: function (e, t) {
            var n = function (e) {
                return e._private.rstyle.cleanConnected;
              },
              r = [],
              i = [];
            if (!this.destroyed) {
              void 0 === t && (t = !0);
              for (var a = 0; a < e.length; a++) {
                var o = e[a],
                  s = o._private,
                  l = s.rstyle;
                !o.isEdge() ||
                  (n(o.source()) && n(o.target())) ||
                  (l.clean = !1),
                  (t && l.clean) ||
                    o.removed() ||
                    ("none" !== o.pstyle("display").value &&
                      ("nodes" === s.group ? i.push(o) : r.push(o),
                      (l.clean = !0)));
              }
              for (var u = 0; u < i.length; u++) {
                var c = i[u],
                  d = c._private.rstyle,
                  h = c.position();
                this.recalculateNodeLabelProjection(c),
                  (d.nodeX = h.x),
                  (d.nodeY = h.y),
                  (d.nodeW = c.pstyle("width").pfValue),
                  (d.nodeH = c.pstyle("height").pfValue);
              }
              this.recalculateEdgeProjections(r);
              for (var p = 0; p < r.length; p++) {
                var f = r[p]._private,
                  g = f.rstyle,
                  v = f.rscratch;
                (g.srcX = v.arrowStartX),
                  (g.srcY = v.arrowStartY),
                  (g.tgtX = v.arrowEndX),
                  (g.tgtY = v.arrowEndY),
                  (g.midX = v.midX),
                  (g.midY = v.midY),
                  (g.labelAngle = v.labelAngle),
                  (g.sourceLabelAngle = v.sourceLabelAngle),
                  (g.targetLabelAngle = v.targetLabelAngle);
              }
            }
          },
        },
        Dl,
      ].forEach(function (e) {
        j(_l, e);
      });
      var Ml = {
          getCachedImage: function (e, t, n) {
            var r = (this.imageCache = this.imageCache || {}),
              i = r[e];
            if (i)
              return (
                i.image.complete || i.image.addEventListener("load", n), i.image
              );
            var a = ((i = r[e] = r[e] || {}).image = new Image());
            a.addEventListener("load", n),
              a.addEventListener("error", function () {
                a.error = !0;
              });
            return (
              "data:" === e.substring(0, 5).toLowerCase() ||
                ((t = "null" === t ? null : t), (a.crossOrigin = t)),
              (a.src = e),
              a
            );
          },
        },
        Nl = {
          registerBinding: function (e, t, n, r) {
            var i = Array.prototype.slice.apply(arguments, [1]),
              a = this.binder(e);
            return a.on.apply(a, i);
          },
          binder: function (e) {
            var t = this,
              n = t.cy.window(),
              r =
                e === n ||
                e === n.document ||
                e === n.document.body ||
                ("undefined" != typeof HTMLElement && e instanceof HTMLElement);
            if (null == t.supportsPassiveEvents) {
              var i = !1;
              try {
                var a = Object.defineProperty({}, "passive", {
                  get: function () {
                    return (i = !0), !0;
                  },
                });
                n.addEventListener("test", null, a);
              } catch (e) {}
              t.supportsPassiveEvents = i;
            }
            var o = function (n, i, a) {
              var o = Array.prototype.slice.call(arguments);
              return (
                r &&
                  t.supportsPassiveEvents &&
                  (o[2] = { capture: null != a && a, passive: !1, once: !1 }),
                t.bindings.push({ target: e, args: o }),
                (e.addEventListener || e.on).apply(e, o),
                this
              );
            };
            return { on: o, addEventListener: o, addListener: o, bind: o };
          },
          nodeIsDraggable: function (e) {
            return e && e.isNode() && !e.locked() && e.grabbable();
          },
          nodeIsGrabbable: function (e) {
            return this.nodeIsDraggable(e) && e.interactive();
          },
        };
      Nl.load = function () {
        var e = this,
          t = e.cy.window(),
          n = function (e) {
            return e.selected();
          },
          r = function (t, n, r, i) {
            null == t && (t = e.cy);
            for (var a = 0; a < n.length; a++) {
              var o = n[a];
              t.emit({ originalEvent: r, type: o, position: i });
            }
          },
          i = function (e) {
            return e.shiftKey || e.metaKey || e.ctrlKey;
          },
          a = function (t, n) {
            var r = !0;
            if (e.cy.hasCompoundNodes() && t && t.pannable()) {
              for (var i = 0; n && i < n.length; i++)
                if ((t = n[i]).isNode() && t.isParent() && !t.pannable()) {
                  r = !1;
                  break;
                }
            } else r = !0;
            return r;
          },
          o = function (e) {
            e[0]._private.rscratch.inDragLayer = !0;
          },
          s = function (e) {
            e[0]._private.rscratch.isGrabTarget = !0;
          },
          l = function (e, t) {
            var n = t.addToList;
            n.has(e) ||
              !e.grabbable() ||
              e.locked() ||
              (n.merge(e),
              (function (e) {
                e[0]._private.grabbed = !0;
              })(e));
          },
          u = function (t, n) {
            n = n || {};
            var r = t.cy().hasCompoundNodes();
            n.inDragLayer &&
              (t.forEach(o),
              t
                .neighborhood()
                .stdFilter(function (e) {
                  return !r || e.isEdge();
                })
                .forEach(o)),
              n.addToList &&
                t.forEach(function (e) {
                  l(e, n);
                }),
              (function (e, t) {
                if (
                  e.cy().hasCompoundNodes() &&
                  (null != t.inDragLayer || null != t.addToList)
                ) {
                  var n = e.descendants();
                  t.inDragLayer &&
                    (n.forEach(o), n.connectedEdges().forEach(o)),
                    t.addToList && l(n, t);
                }
              })(t, n),
              h(t, { inDragLayer: n.inDragLayer }),
              e.updateCachedGrabbedEles();
          },
          c = u,
          d = function (t) {
            t &&
              (e.getCachedZSortedEles().forEach(function (e) {
                !(function (e) {
                  e[0]._private.grabbed = !1;
                })(e),
                  (function (e) {
                    e[0]._private.rscratch.inDragLayer = !1;
                  })(e),
                  (function (e) {
                    e[0]._private.rscratch.isGrabTarget = !1;
                  })(e);
              }),
              e.updateCachedGrabbedEles());
          },
          h = function (e, t) {
            if (
              (null != t.inDragLayer || null != t.addToList) &&
              e.cy().hasCompoundNodes()
            ) {
              var n = e.ancestors().orphans();
              if (!n.same(e)) {
                var r = n
                    .descendants()
                    .spawnSelf()
                    .merge(n)
                    .unmerge(e)
                    .unmerge(e.descendants()),
                  i = r.connectedEdges();
                t.inDragLayer && (i.forEach(o), r.forEach(o)),
                  t.addToList &&
                    r.forEach(function (e) {
                      l(e, t);
                    });
              }
            }
          },
          p = function () {
            null != document.activeElement &&
              null != document.activeElement.blur &&
              document.activeElement.blur();
          },
          f = "undefined" != typeof MutationObserver,
          g = "undefined" != typeof ResizeObserver;
        f
          ? ((e.removeObserver = new MutationObserver(function (t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n].removedNodes;
                if (r)
                  for (var i = 0; i < r.length; i++)
                    if (r[i] === e.container) {
                      e.destroy();
                      break;
                    }
              }
            })),
            e.container.parentNode &&
              e.removeObserver.observe(e.container.parentNode, {
                childList: !0,
              }))
          : e.registerBinding(e.container, "DOMNodeRemoved", function (t) {
              e.destroy();
            });
        var v = ye(function () {
          e.cy.resize();
        }, 100);
        f &&
          ((e.styleObserver = new MutationObserver(v)),
          e.styleObserver.observe(e.container, { attributes: !0 })),
          e.registerBinding(t, "resize", v),
          g &&
            ((e.resizeObserver = new ResizeObserver(v)),
            e.resizeObserver.observe(e.container));
        var y = function () {
          e.invalidateContainerClientCoordsCache();
        };
        !(function (e, t) {
          for (; null != e; ) t(e), (e = e.parentNode);
        })(e.container, function (t) {
          e.registerBinding(t, "transitionend", y),
            e.registerBinding(t, "animationend", y),
            e.registerBinding(t, "scroll", y);
        }),
          e.registerBinding(e.container, "contextmenu", function (e) {
            e.preventDefault();
          });
        var m,
          b,
          x,
          w = function (t) {
            for (
              var n = e.findContainerClientCoords(),
                r = n[0],
                i = n[1],
                a = n[2],
                o = n[3],
                s = t.touches ? t.touches : [t],
                l = !1,
                u = 0;
              u < s.length;
              u++
            ) {
              var c = s[u];
              if (
                r <= c.clientX &&
                c.clientX <= r + a &&
                i <= c.clientY &&
                c.clientY <= i + o
              ) {
                l = !0;
                break;
              }
            }
            if (!l) return !1;
            for (var d = e.container, h = t.target.parentNode, p = !1; h; ) {
              if (h === d) {
                p = !0;
                break;
              }
              h = h.parentNode;
            }
            return !!p;
          };
        e.registerBinding(
          e.container,
          "mousedown",
          function (t) {
            if (w(t)) {
              t.preventDefault(),
                p(),
                (e.hoverData.capture = !0),
                (e.hoverData.which = t.which);
              var n = e.cy,
                i = [t.clientX, t.clientY],
                a = e.projectIntoViewport(i[0], i[1]),
                o = e.selection,
                l = e.findNearestElements(a[0], a[1], !0, !1),
                d = l[0],
                h = e.dragData.possibleDragElements;
              if (
                ((e.hoverData.mdownPos = a),
                (e.hoverData.mdownGPos = i),
                3 == t.which)
              ) {
                e.hoverData.cxtStarted = !0;
                var f = {
                  originalEvent: t,
                  type: "cxttapstart",
                  position: { x: a[0], y: a[1] },
                };
                d
                  ? (d.activate(), d.emit(f), (e.hoverData.down = d))
                  : n.emit(f),
                  (e.hoverData.downTime = new Date().getTime()),
                  (e.hoverData.cxtDragged = !1);
              } else if (1 == t.which) {
                if ((d && d.activate(), null != d && e.nodeIsGrabbable(d))) {
                  var g = function (e) {
                    return {
                      originalEvent: t,
                      type: e,
                      position: { x: a[0], y: a[1] },
                    };
                  };
                  if ((s(d), d.selected())) {
                    h = e.dragData.possibleDragElements = n.collection();
                    var v = n.$(function (t) {
                      return t.isNode() && t.selected() && e.nodeIsGrabbable(t);
                    });
                    u(v, { addToList: h }),
                      d.emit(g("grabon")),
                      v.forEach(function (e) {
                        e.emit(g("grab"));
                      });
                  } else
                    (h = e.dragData.possibleDragElements = n.collection()),
                      c(d, { addToList: h }),
                      d.emit(g("grabon")).emit(g("grab"));
                  e.redrawHint("eles", !0), e.redrawHint("drag", !0);
                }
                (e.hoverData.down = d),
                  (e.hoverData.downs = l),
                  (e.hoverData.downTime = new Date().getTime()),
                  r(d, ["mousedown", "tapstart", "vmousedown"], t, {
                    x: a[0],
                    y: a[1],
                  }),
                  null == d
                    ? ((o[4] = 1),
                      (e.data.bgActivePosistion = { x: a[0], y: a[1] }),
                      e.redrawHint("select", !0),
                      e.redraw())
                    : d.pannable() && (o[4] = 1),
                  (e.hoverData.tapholdCancelled = !1),
                  clearTimeout(e.hoverData.tapholdTimeout),
                  (e.hoverData.tapholdTimeout = setTimeout(function () {
                    if (!e.hoverData.tapholdCancelled) {
                      var r = e.hoverData.down;
                      r
                        ? r.emit({
                            originalEvent: t,
                            type: "taphold",
                            position: { x: a[0], y: a[1] },
                          })
                        : n.emit({
                            originalEvent: t,
                            type: "taphold",
                            position: { x: a[0], y: a[1] },
                          });
                    }
                  }, e.tapholdDuration));
              }
              (o[0] = o[2] = a[0]), (o[1] = o[3] = a[1]);
            }
          },
          !1
        ),
          e.registerBinding(
            t,
            "mousemove",
            function (t) {
              if (e.hoverData.capture || w(t)) {
                var n = !1,
                  o = e.cy,
                  s = o.zoom(),
                  l = [t.clientX, t.clientY],
                  c = e.projectIntoViewport(l[0], l[1]),
                  h = e.hoverData.mdownPos,
                  p = e.hoverData.mdownGPos,
                  f = e.selection,
                  g = null;
                e.hoverData.draggingEles ||
                  e.hoverData.dragging ||
                  e.hoverData.selecting ||
                  (g = e.findNearestElement(c[0], c[1], !0, !1));
                var v,
                  y = e.hoverData.last,
                  m = e.hoverData.down,
                  b = [c[0] - f[2], c[1] - f[3]],
                  x = e.dragData.possibleDragElements;
                if (p) {
                  var C = l[0] - p[0],
                    k = C * C,
                    T = l[1] - p[1],
                    S = k + T * T;
                  e.hoverData.isOverThresholdDrag = v =
                    S >= e.desktopTapThreshold2;
                }
                var P = i(t);
                v && (e.hoverData.tapholdCancelled = !0),
                  (n = !0),
                  r(g, ["mousemove", "vmousemove", "tapdrag"], t, {
                    x: c[0],
                    y: c[1],
                  });
                var D = function () {
                  (e.data.bgActivePosistion = void 0),
                    e.hoverData.selecting ||
                      o.emit({
                        originalEvent: t,
                        type: "boxstart",
                        position: { x: c[0], y: c[1] },
                      }),
                    (f[4] = 1),
                    (e.hoverData.selecting = !0),
                    e.redrawHint("select", !0),
                    e.redraw();
                };
                if (3 === e.hoverData.which) {
                  if (v) {
                    var _ = {
                      originalEvent: t,
                      type: "cxtdrag",
                      position: { x: c[0], y: c[1] },
                    };
                    m ? m.emit(_) : o.emit(_),
                      (e.hoverData.cxtDragged = !0),
                      (e.hoverData.cxtOver && g === e.hoverData.cxtOver) ||
                        (e.hoverData.cxtOver &&
                          e.hoverData.cxtOver.emit({
                            originalEvent: t,
                            type: "cxtdragout",
                            position: { x: c[0], y: c[1] },
                          }),
                        (e.hoverData.cxtOver = g),
                        g &&
                          g.emit({
                            originalEvent: t,
                            type: "cxtdragover",
                            position: { x: c[0], y: c[1] },
                          }));
                  }
                } else if (e.hoverData.dragging) {
                  if (
                    ((n = !0), o.panningEnabled() && o.userPanningEnabled())
                  ) {
                    var M;
                    if (e.hoverData.justStartedPan) {
                      var N = e.hoverData.mdownPos;
                      (M = { x: (c[0] - N[0]) * s, y: (c[1] - N[1]) * s }),
                        (e.hoverData.justStartedPan = !1);
                    } else M = { x: b[0] * s, y: b[1] * s };
                    o.panBy(M), o.emit("dragpan"), (e.hoverData.dragged = !0);
                  }
                  c = e.projectIntoViewport(t.clientX, t.clientY);
                } else if (1 != f[4] || (null != m && !m.pannable())) {
                  if (
                    (m && m.pannable() && m.active() && m.unactivate(),
                    (m && m.grabbed()) ||
                      g == y ||
                      (y &&
                        r(y, ["mouseout", "tapdragout"], t, {
                          x: c[0],
                          y: c[1],
                        }),
                      g &&
                        r(g, ["mouseover", "tapdragover"], t, {
                          x: c[0],
                          y: c[1],
                        }),
                      (e.hoverData.last = g)),
                    m)
                  )
                    if (v) {
                      if (o.boxSelectionEnabled() && P)
                        m &&
                          m.grabbed() &&
                          (d(x),
                          m.emit("freeon"),
                          x.emit("free"),
                          e.dragData.didDrag &&
                            (m.emit("dragfreeon"), x.emit("dragfree"))),
                          D();
                      else if (m && m.grabbed() && e.nodeIsDraggable(m)) {
                        var I = !e.dragData.didDrag;
                        I && e.redrawHint("eles", !0),
                          (e.dragData.didDrag = !0),
                          e.hoverData.draggingEles || u(x, { inDragLayer: !0 });
                        var B = { x: 0, y: 0 };
                        if (
                          E(b[0]) &&
                          E(b[1]) &&
                          ((B.x += b[0]), (B.y += b[1]), I)
                        ) {
                          var A = e.hoverData.dragDelta;
                          A &&
                            E(A[0]) &&
                            E(A[1]) &&
                            ((B.x += A[0]), (B.y += A[1]));
                        }
                        (e.hoverData.draggingEles = !0),
                          x.silentShift(B).emit("position drag"),
                          e.redrawHint("drag", !0),
                          e.redraw();
                      }
                    } else
                      !(function () {
                        var t = (e.hoverData.dragDelta =
                          e.hoverData.dragDelta || []);
                        0 === t.length
                          ? (t.push(b[0]), t.push(b[1]))
                          : ((t[0] += b[0]), (t[1] += b[1]));
                      })();
                  n = !0;
                } else
                  v &&
                    (e.hoverData.dragging ||
                    !o.boxSelectionEnabled() ||
                    (!P && o.panningEnabled() && o.userPanningEnabled())
                      ? !e.hoverData.selecting &&
                        o.panningEnabled() &&
                        o.userPanningEnabled() &&
                        a(m, e.hoverData.downs) &&
                        ((e.hoverData.dragging = !0),
                        (e.hoverData.justStartedPan = !0),
                        (f[4] = 0),
                        (e.data.bgActivePosistion = Ct(h)),
                        e.redrawHint("select", !0),
                        e.redraw())
                      : D(),
                    m && m.pannable() && m.active() && m.unactivate());
                return (
                  (f[2] = c[0]),
                  (f[3] = c[1]),
                  n
                    ? (t.stopPropagation && t.stopPropagation(),
                      t.preventDefault && t.preventDefault(),
                      !1)
                    : void 0
                );
              }
            },
            !1
          ),
          e.registerBinding(
            t,
            "mouseup",
            function (t) {
              if (e.hoverData.capture) {
                e.hoverData.capture = !1;
                var a = e.cy,
                  o = e.projectIntoViewport(t.clientX, t.clientY),
                  s = e.selection,
                  l = e.findNearestElement(o[0], o[1], !0, !1),
                  u = e.dragData.possibleDragElements,
                  c = e.hoverData.down,
                  h = i(t);
                if (
                  (e.data.bgActivePosistion &&
                    (e.redrawHint("select", !0), e.redraw()),
                  (e.hoverData.tapholdCancelled = !0),
                  (e.data.bgActivePosistion = void 0),
                  c && c.unactivate(),
                  3 === e.hoverData.which)
                ) {
                  var p = {
                    originalEvent: t,
                    type: "cxttapend",
                    position: { x: o[0], y: o[1] },
                  };
                  if ((c ? c.emit(p) : a.emit(p), !e.hoverData.cxtDragged)) {
                    var f = {
                      originalEvent: t,
                      type: "cxttap",
                      position: { x: o[0], y: o[1] },
                    };
                    c ? c.emit(f) : a.emit(f);
                  }
                  (e.hoverData.cxtDragged = !1), (e.hoverData.which = null);
                } else if (1 === e.hoverData.which) {
                  if (
                    (r(l, ["mouseup", "tapend", "vmouseup"], t, {
                      x: o[0],
                      y: o[1],
                    }),
                    e.dragData.didDrag ||
                      e.hoverData.dragged ||
                      e.hoverData.selecting ||
                      e.hoverData.isOverThresholdDrag ||
                      (r(c, ["click", "tap", "vclick"], t, {
                        x: o[0],
                        y: o[1],
                      }),
                      (b = !1),
                      t.timeStamp - x <= a.multiClickDebounceTime()
                        ? (m && clearTimeout(m),
                          (b = !0),
                          (x = null),
                          r(c, ["dblclick", "dbltap", "vdblclick"], t, {
                            x: o[0],
                            y: o[1],
                          }))
                        : ((m = setTimeout(function () {
                            b ||
                              r(c, ["oneclick", "onetap", "voneclick"], t, {
                                x: o[0],
                                y: o[1],
                              });
                          }, a.multiClickDebounceTime())),
                          (x = t.timeStamp))),
                    null != c ||
                      e.dragData.didDrag ||
                      e.hoverData.selecting ||
                      e.hoverData.dragged ||
                      i(t) ||
                      (a.$(n).unselect(["tapunselect"]),
                      u.length > 0 && e.redrawHint("eles", !0),
                      (e.dragData.possibleDragElements = u = a.collection())),
                    l != c ||
                      e.dragData.didDrag ||
                      e.hoverData.selecting ||
                      (null != l &&
                        l._private.selectable &&
                        (e.hoverData.dragging ||
                          ("additive" === a.selectionType() || h
                            ? l.selected()
                              ? l.unselect(["tapunselect"])
                              : l.select(["tapselect"])
                            : h ||
                              (a.$(n).unmerge(l).unselect(["tapunselect"]),
                              l.select(["tapselect"]))),
                        e.redrawHint("eles", !0))),
                    e.hoverData.selecting)
                  ) {
                    var g = a.collection(e.getAllInBox(s[0], s[1], s[2], s[3]));
                    e.redrawHint("select", !0),
                      g.length > 0 && e.redrawHint("eles", !0),
                      a.emit({
                        type: "boxend",
                        originalEvent: t,
                        position: { x: o[0], y: o[1] },
                      });
                    "additive" === a.selectionType() ||
                      h ||
                      a.$(n).unmerge(g).unselect(),
                      g
                        .emit("box")
                        .stdFilter(function (e) {
                          return e.selectable() && !e.selected();
                        })
                        .select()
                        .emit("boxselect"),
                      e.redraw();
                  }
                  if (
                    (e.hoverData.dragging &&
                      ((e.hoverData.dragging = !1),
                      e.redrawHint("select", !0),
                      e.redrawHint("eles", !0),
                      e.redraw()),
                    !s[4])
                  ) {
                    e.redrawHint("drag", !0), e.redrawHint("eles", !0);
                    var v = c && c.grabbed();
                    d(u),
                      v &&
                        (c.emit("freeon"),
                        u.emit("free"),
                        e.dragData.didDrag &&
                          (c.emit("dragfreeon"), u.emit("dragfree")));
                  }
                }
                (s[4] = 0),
                  (e.hoverData.down = null),
                  (e.hoverData.cxtStarted = !1),
                  (e.hoverData.draggingEles = !1),
                  (e.hoverData.selecting = !1),
                  (e.hoverData.isOverThresholdDrag = !1),
                  (e.dragData.didDrag = !1),
                  (e.hoverData.dragged = !1),
                  (e.hoverData.dragDelta = []),
                  (e.hoverData.mdownPos = null),
                  (e.hoverData.mdownGPos = null);
              }
            },
            !1
          );
        var C,
          k,
          T,
          S,
          P,
          D,
          _,
          M,
          N,
          I,
          B,
          A,
          L,
          O = function (t) {
            if (!e.scrollingPage) {
              var n = e.cy,
                r = n.zoom(),
                i = n.pan(),
                a = e.projectIntoViewport(t.clientX, t.clientY),
                o = [a[0] * r + i.x, a[1] * r + i.y];
              if (
                e.hoverData.draggingEles ||
                e.hoverData.dragging ||
                e.hoverData.cxtStarted ||
                0 !== e.selection[4]
              )
                t.preventDefault();
              else if (
                n.panningEnabled() &&
                n.userPanningEnabled() &&
                n.zoomingEnabled() &&
                n.userZoomingEnabled()
              ) {
                var s;
                t.preventDefault(),
                  (e.data.wheelZooming = !0),
                  clearTimeout(e.data.wheelTimeout),
                  (e.data.wheelTimeout = setTimeout(function () {
                    (e.data.wheelZooming = !1),
                      e.redrawHint("eles", !0),
                      e.redraw();
                  }, 150)),
                  (s =
                    null != t.deltaY
                      ? t.deltaY / -250
                      : null != t.wheelDeltaY
                      ? t.wheelDeltaY / 1e3
                      : t.wheelDelta / 1e3),
                  (s *= e.wheelSensitivity),
                  1 === t.deltaMode && (s *= 33);
                var l = n.zoom() * Math.pow(10, s);
                "gesturechange" === t.type &&
                  (l = e.gestureStartZoom * t.scale),
                  n.zoom({ level: l, renderedPosition: { x: o[0], y: o[1] } }),
                  n.emit(
                    "gesturechange" === t.type ? "pinchzoom" : "scrollzoom"
                  );
              }
            }
          };
        e.registerBinding(e.container, "wheel", O, !0),
          e.registerBinding(
            t,
            "scroll",
            function (t) {
              (e.scrollingPage = !0),
                clearTimeout(e.scrollingPageTimeout),
                (e.scrollingPageTimeout = setTimeout(function () {
                  e.scrollingPage = !1;
                }, 250));
            },
            !0
          ),
          e.registerBinding(
            e.container,
            "gesturestart",
            function (t) {
              (e.gestureStartZoom = e.cy.zoom()),
                e.hasTouchStarted || t.preventDefault();
            },
            !0
          ),
          e.registerBinding(
            e.container,
            "gesturechange",
            function (t) {
              e.hasTouchStarted || O(t);
            },
            !0
          ),
          e.registerBinding(
            e.container,
            "mouseout",
            function (t) {
              var n = e.projectIntoViewport(t.clientX, t.clientY);
              e.cy.emit({
                originalEvent: t,
                type: "mouseout",
                position: { x: n[0], y: n[1] },
              });
            },
            !1
          ),
          e.registerBinding(
            e.container,
            "mouseover",
            function (t) {
              var n = e.projectIntoViewport(t.clientX, t.clientY);
              e.cy.emit({
                originalEvent: t,
                type: "mouseover",
                position: { x: n[0], y: n[1] },
              });
            },
            !1
          );
        var R,
          z,
          F,
          V,
          q,
          j,
          Y,
          X = function (e, t, n, r) {
            return Math.sqrt((n - e) * (n - e) + (r - t) * (r - t));
          },
          W = function (e, t, n, r) {
            return (n - e) * (n - e) + (r - t) * (r - t);
          };
        if (
          (e.registerBinding(
            e.container,
            "touchstart",
            (R = function (t) {
              if (((e.hasTouchStarted = !0), w(t))) {
                p(),
                  (e.touchData.capture = !0),
                  (e.data.bgActivePosistion = void 0);
                var n = e.cy,
                  i = e.touchData.now,
                  a = e.touchData.earlier;
                if (t.touches[0]) {
                  var o = e.projectIntoViewport(
                    t.touches[0].clientX,
                    t.touches[0].clientY
                  );
                  (i[0] = o[0]), (i[1] = o[1]);
                }
                if (
                  (t.touches[1] &&
                    ((o = e.projectIntoViewport(
                      t.touches[1].clientX,
                      t.touches[1].clientY
                    )),
                    (i[2] = o[0]),
                    (i[3] = o[1])),
                  t.touches[2] &&
                    ((o = e.projectIntoViewport(
                      t.touches[2].clientX,
                      t.touches[2].clientY
                    )),
                    (i[4] = o[0]),
                    (i[5] = o[1])),
                  t.touches[1])
                ) {
                  (e.touchData.singleTouchMoved = !0),
                    d(e.dragData.touchDragEles);
                  var l = e.findContainerClientCoords();
                  (N = l[0]),
                    (I = l[1]),
                    (B = l[2]),
                    (A = l[3]),
                    (C = t.touches[0].clientX - N),
                    (k = t.touches[0].clientY - I),
                    (T = t.touches[1].clientX - N),
                    (S = t.touches[1].clientY - I),
                    (L =
                      0 <= C &&
                      C <= B &&
                      0 <= T &&
                      T <= B &&
                      0 <= k &&
                      k <= A &&
                      0 <= S &&
                      S <= A);
                  var h = n.pan(),
                    f = n.zoom();
                  if (
                    ((P = X(C, k, T, S)),
                    (D = W(C, k, T, S)),
                    (M = [
                      ((_ = [(C + T) / 2, (k + S) / 2])[0] - h.x) / f,
                      (_[1] - h.y) / f,
                    ]),
                    D < 4e4 && !t.touches[2])
                  ) {
                    var g = e.findNearestElement(i[0], i[1], !0, !0),
                      v = e.findNearestElement(i[2], i[3], !0, !0);
                    return (
                      g && g.isNode()
                        ? (g
                            .activate()
                            .emit({
                              originalEvent: t,
                              type: "cxttapstart",
                              position: { x: i[0], y: i[1] },
                            }),
                          (e.touchData.start = g))
                        : v && v.isNode()
                        ? (v
                            .activate()
                            .emit({
                              originalEvent: t,
                              type: "cxttapstart",
                              position: { x: i[0], y: i[1] },
                            }),
                          (e.touchData.start = v))
                        : n.emit({
                            originalEvent: t,
                            type: "cxttapstart",
                            position: { x: i[0], y: i[1] },
                          }),
                      e.touchData.start &&
                        (e.touchData.start._private.grabbed = !1),
                      (e.touchData.cxt = !0),
                      (e.touchData.cxtDragged = !1),
                      (e.data.bgActivePosistion = void 0),
                      void e.redraw()
                    );
                  }
                }
                if (t.touches[2]) n.boxSelectionEnabled() && t.preventDefault();
                else if (t.touches[1]);
                else if (t.touches[0]) {
                  var y = e.findNearestElements(i[0], i[1], !0, !0),
                    m = y[0];
                  if (
                    null != m &&
                    (m.activate(),
                    (e.touchData.start = m),
                    (e.touchData.starts = y),
                    e.nodeIsGrabbable(m))
                  ) {
                    var b = (e.dragData.touchDragEles = n.collection()),
                      x = null;
                    e.redrawHint("eles", !0),
                      e.redrawHint("drag", !0),
                      m.selected()
                        ? ((x = n.$(function (t) {
                            return t.selected() && e.nodeIsGrabbable(t);
                          })),
                          u(x, { addToList: b }))
                        : c(m, { addToList: b }),
                      s(m);
                    var E = function (e) {
                      return {
                        originalEvent: t,
                        type: e,
                        position: { x: i[0], y: i[1] },
                      };
                    };
                    m.emit(E("grabon")),
                      x
                        ? x.forEach(function (e) {
                            e.emit(E("grab"));
                          })
                        : m.emit(E("grab"));
                  }
                  r(m, ["touchstart", "tapstart", "vmousedown"], t, {
                    x: i[0],
                    y: i[1],
                  }),
                    null == m &&
                      ((e.data.bgActivePosistion = { x: o[0], y: o[1] }),
                      e.redrawHint("select", !0),
                      e.redraw()),
                    (e.touchData.singleTouchMoved = !1),
                    (e.touchData.singleTouchStartTime = +new Date()),
                    clearTimeout(e.touchData.tapholdTimeout),
                    (e.touchData.tapholdTimeout = setTimeout(function () {
                      !1 !== e.touchData.singleTouchMoved ||
                        e.pinching ||
                        e.touchData.selecting ||
                        r(e.touchData.start, ["taphold"], t, {
                          x: i[0],
                          y: i[1],
                        });
                    }, e.tapholdDuration));
                }
                if (t.touches.length >= 1) {
                  for (
                    var O = (e.touchData.startPosition = [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                      ]),
                      R = 0;
                    R < i.length;
                    R++
                  )
                    O[R] = a[R] = i[R];
                  var z = t.touches[0];
                  e.touchData.startGPosition = [z.clientX, z.clientY];
                }
              }
            }),
            !1
          ),
          e.registerBinding(
            window,
            "touchmove",
            (z = function (t) {
              var n = e.touchData.capture;
              if (n || w(t)) {
                var i = e.selection,
                  o = e.cy,
                  s = e.touchData.now,
                  l = e.touchData.earlier,
                  c = o.zoom();
                if (t.touches[0]) {
                  var h = e.projectIntoViewport(
                    t.touches[0].clientX,
                    t.touches[0].clientY
                  );
                  (s[0] = h[0]), (s[1] = h[1]);
                }
                t.touches[1] &&
                  ((h = e.projectIntoViewport(
                    t.touches[1].clientX,
                    t.touches[1].clientY
                  )),
                  (s[2] = h[0]),
                  (s[3] = h[1])),
                  t.touches[2] &&
                    ((h = e.projectIntoViewport(
                      t.touches[2].clientX,
                      t.touches[2].clientY
                    )),
                    (s[4] = h[0]),
                    (s[5] = h[1]));
                var p,
                  f = e.touchData.startGPosition;
                if (n && t.touches[0] && f) {
                  for (var g = [], v = 0; v < s.length; v++) g[v] = s[v] - l[v];
                  var y = t.touches[0].clientX - f[0],
                    m = y * y,
                    b = t.touches[0].clientY - f[1];
                  p = m + b * b >= e.touchTapThreshold2;
                }
                if (n && e.touchData.cxt) {
                  t.preventDefault();
                  var x = t.touches[0].clientX - N,
                    _ = t.touches[0].clientY - I,
                    B = t.touches[1].clientX - N,
                    A = t.touches[1].clientY - I,
                    O = W(x, _, B, A);
                  if (O / D >= 2.25 || O >= 22500) {
                    (e.touchData.cxt = !1),
                      (e.data.bgActivePosistion = void 0),
                      e.redrawHint("select", !0);
                    var R = {
                      originalEvent: t,
                      type: "cxttapend",
                      position: { x: s[0], y: s[1] },
                    };
                    e.touchData.start
                      ? (e.touchData.start.unactivate().emit(R),
                        (e.touchData.start = null))
                      : o.emit(R);
                  }
                }
                if (n && e.touchData.cxt) {
                  (R = {
                    originalEvent: t,
                    type: "cxtdrag",
                    position: { x: s[0], y: s[1] },
                  }),
                    (e.data.bgActivePosistion = void 0),
                    e.redrawHint("select", !0),
                    e.touchData.start ? e.touchData.start.emit(R) : o.emit(R),
                    e.touchData.start &&
                      (e.touchData.start._private.grabbed = !1),
                    (e.touchData.cxtDragged = !0);
                  var z = e.findNearestElement(s[0], s[1], !0, !0);
                  (e.touchData.cxtOver && z === e.touchData.cxtOver) ||
                    (e.touchData.cxtOver &&
                      e.touchData.cxtOver.emit({
                        originalEvent: t,
                        type: "cxtdragout",
                        position: { x: s[0], y: s[1] },
                      }),
                    (e.touchData.cxtOver = z),
                    z &&
                      z.emit({
                        originalEvent: t,
                        type: "cxtdragover",
                        position: { x: s[0], y: s[1] },
                      }));
                } else if (n && t.touches[2] && o.boxSelectionEnabled())
                  t.preventDefault(),
                    (e.data.bgActivePosistion = void 0),
                    (this.lastThreeTouch = +new Date()),
                    e.touchData.selecting ||
                      o.emit({
                        originalEvent: t,
                        type: "boxstart",
                        position: { x: s[0], y: s[1] },
                      }),
                    (e.touchData.selecting = !0),
                    (e.touchData.didSelect = !0),
                    (i[4] = 1),
                    i && 0 !== i.length && void 0 !== i[0]
                      ? ((i[2] = (s[0] + s[2] + s[4]) / 3),
                        (i[3] = (s[1] + s[3] + s[5]) / 3))
                      : ((i[0] = (s[0] + s[2] + s[4]) / 3),
                        (i[1] = (s[1] + s[3] + s[5]) / 3),
                        (i[2] = (s[0] + s[2] + s[4]) / 3 + 1),
                        (i[3] = (s[1] + s[3] + s[5]) / 3 + 1)),
                    e.redrawHint("select", !0),
                    e.redraw();
                else if (
                  n &&
                  t.touches[1] &&
                  !e.touchData.didSelect &&
                  o.zoomingEnabled() &&
                  o.panningEnabled() &&
                  o.userZoomingEnabled() &&
                  o.userPanningEnabled()
                ) {
                  if (
                    (t.preventDefault(),
                    (e.data.bgActivePosistion = void 0),
                    e.redrawHint("select", !0),
                    (ee = e.dragData.touchDragEles))
                  ) {
                    e.redrawHint("drag", !0);
                    for (var F = 0; F < ee.length; F++) {
                      var V = ee[F]._private;
                      (V.grabbed = !1), (V.rscratch.inDragLayer = !1);
                    }
                  }
                  var q = e.touchData.start,
                    j =
                      ((x = t.touches[0].clientX - N),
                      (_ = t.touches[0].clientY - I),
                      (B = t.touches[1].clientX - N),
                      (A = t.touches[1].clientY - I),
                      X(x, _, B, A)),
                    Y = j / P;
                  if (L) {
                    var H = (x - C + (B - T)) / 2,
                      G = (_ - k + (A - S)) / 2,
                      U = o.zoom(),
                      K = U * Y,
                      Z = o.pan(),
                      $ = M[0] * U + Z.x,
                      Q = M[1] * U + Z.y,
                      J = {
                        x: (-K / U) * ($ - Z.x - H) + $,
                        y: (-K / U) * (Q - Z.y - G) + Q,
                      };
                    if (q && q.active()) {
                      var ee = e.dragData.touchDragEles;
                      d(ee),
                        e.redrawHint("drag", !0),
                        e.redrawHint("eles", !0),
                        q.unactivate().emit("freeon"),
                        ee.emit("free"),
                        e.dragData.didDrag &&
                          (q.emit("dragfreeon"), ee.emit("dragfree"));
                    }
                    o.viewport({ zoom: K, pan: J, cancelOnFailedZoom: !0 }),
                      o.emit("pinchzoom"),
                      (P = j),
                      (C = x),
                      (k = _),
                      (T = B),
                      (S = A),
                      (e.pinching = !0);
                  }
                  t.touches[0] &&
                    ((h = e.projectIntoViewport(
                      t.touches[0].clientX,
                      t.touches[0].clientY
                    )),
                    (s[0] = h[0]),
                    (s[1] = h[1])),
                    t.touches[1] &&
                      ((h = e.projectIntoViewport(
                        t.touches[1].clientX,
                        t.touches[1].clientY
                      )),
                      (s[2] = h[0]),
                      (s[3] = h[1])),
                    t.touches[2] &&
                      ((h = e.projectIntoViewport(
                        t.touches[2].clientX,
                        t.touches[2].clientY
                      )),
                      (s[4] = h[0]),
                      (s[5] = h[1]));
                } else if (t.touches[0] && !e.touchData.didSelect) {
                  var te = e.touchData.start,
                    ne = e.touchData.last;
                  if (
                    (e.hoverData.draggingEles ||
                      e.swipePanning ||
                      (z = e.findNearestElement(s[0], s[1], !0, !0)),
                    n && null != te && t.preventDefault(),
                    n && null != te && e.nodeIsDraggable(te))
                  )
                    if (p) {
                      ee = e.dragData.touchDragEles;
                      var re = !e.dragData.didDrag;
                      re && u(ee, { inDragLayer: !0 }),
                        (e.dragData.didDrag = !0);
                      var ie = { x: 0, y: 0 };
                      E(g[0]) &&
                        E(g[1]) &&
                        ((ie.x += g[0]),
                        (ie.y += g[1]),
                        re &&
                          (e.redrawHint("eles", !0),
                          (ae = e.touchData.dragDelta) &&
                            E(ae[0]) &&
                            E(ae[1]) &&
                            ((ie.x += ae[0]), (ie.y += ae[1])))),
                        (e.hoverData.draggingEles = !0),
                        ee.silentShift(ie).emit("position drag"),
                        e.redrawHint("drag", !0),
                        e.touchData.startPosition[0] == l[0] &&
                          e.touchData.startPosition[1] == l[1] &&
                          e.redrawHint("eles", !0),
                        e.redraw();
                    } else {
                      var ae;
                      0 ===
                      (ae = e.touchData.dragDelta = e.touchData.dragDelta || [])
                        .length
                        ? (ae.push(g[0]), ae.push(g[1]))
                        : ((ae[0] += g[0]), (ae[1] += g[1]));
                    }
                  if (
                    (r(te || z, ["touchmove", "tapdrag", "vmousemove"], t, {
                      x: s[0],
                      y: s[1],
                    }),
                    (te && te.grabbed()) ||
                      z == ne ||
                      (ne &&
                        ne.emit({
                          originalEvent: t,
                          type: "tapdragout",
                          position: { x: s[0], y: s[1] },
                        }),
                      z &&
                        z.emit({
                          originalEvent: t,
                          type: "tapdragover",
                          position: { x: s[0], y: s[1] },
                        })),
                    (e.touchData.last = z),
                    n)
                  )
                    for (F = 0; F < s.length; F++)
                      s[F] &&
                        e.touchData.startPosition[F] &&
                        p &&
                        (e.touchData.singleTouchMoved = !0);
                  n &&
                    (null == te || te.pannable()) &&
                    o.panningEnabled() &&
                    o.userPanningEnabled() &&
                    (a(te, e.touchData.starts) &&
                      (t.preventDefault(),
                      e.data.bgActivePosistion ||
                        (e.data.bgActivePosistion = Ct(
                          e.touchData.startPosition
                        )),
                      e.swipePanning
                        ? (o.panBy({ x: g[0] * c, y: g[1] * c }),
                          o.emit("dragpan"))
                        : p &&
                          ((e.swipePanning = !0),
                          o.panBy({ x: y * c, y: b * c }),
                          o.emit("dragpan"),
                          te &&
                            (te.unactivate(),
                            e.redrawHint("select", !0),
                            (e.touchData.start = null)))),
                    (h = e.projectIntoViewport(
                      t.touches[0].clientX,
                      t.touches[0].clientY
                    )),
                    (s[0] = h[0]),
                    (s[1] = h[1]));
                }
                for (v = 0; v < s.length; v++) l[v] = s[v];
                n &&
                  t.touches.length > 0 &&
                  !e.hoverData.draggingEles &&
                  !e.swipePanning &&
                  null != e.data.bgActivePosistion &&
                  ((e.data.bgActivePosistion = void 0),
                  e.redrawHint("select", !0),
                  e.redraw());
              }
            }),
            !1
          ),
          e.registerBinding(
            t,
            "touchcancel",
            (F = function (t) {
              var n = e.touchData.start;
              (e.touchData.capture = !1), n && n.unactivate();
            })
          ),
          e.registerBinding(
            t,
            "touchend",
            (V = function (t) {
              var i = e.touchData.start;
              if (e.touchData.capture) {
                0 === t.touches.length && (e.touchData.capture = !1),
                  t.preventDefault();
                var a = e.selection;
                (e.swipePanning = !1), (e.hoverData.draggingEles = !1);
                var o,
                  s = e.cy,
                  l = s.zoom(),
                  u = e.touchData.now,
                  c = e.touchData.earlier;
                if (t.touches[0]) {
                  var h = e.projectIntoViewport(
                    t.touches[0].clientX,
                    t.touches[0].clientY
                  );
                  (u[0] = h[0]), (u[1] = h[1]);
                }
                if (
                  (t.touches[1] &&
                    ((h = e.projectIntoViewport(
                      t.touches[1].clientX,
                      t.touches[1].clientY
                    )),
                    (u[2] = h[0]),
                    (u[3] = h[1])),
                  t.touches[2] &&
                    ((h = e.projectIntoViewport(
                      t.touches[2].clientX,
                      t.touches[2].clientY
                    )),
                    (u[4] = h[0]),
                    (u[5] = h[1])),
                  i && i.unactivate(),
                  e.touchData.cxt)
                ) {
                  if (
                    ((o = {
                      originalEvent: t,
                      type: "cxttapend",
                      position: { x: u[0], y: u[1] },
                    }),
                    i ? i.emit(o) : s.emit(o),
                    !e.touchData.cxtDragged)
                  ) {
                    var p = {
                      originalEvent: t,
                      type: "cxttap",
                      position: { x: u[0], y: u[1] },
                    };
                    i ? i.emit(p) : s.emit(p);
                  }
                  return (
                    e.touchData.start &&
                      (e.touchData.start._private.grabbed = !1),
                    (e.touchData.cxt = !1),
                    (e.touchData.start = null),
                    void e.redraw()
                  );
                }
                if (
                  !t.touches[2] &&
                  s.boxSelectionEnabled() &&
                  e.touchData.selecting
                ) {
                  e.touchData.selecting = !1;
                  var f = s.collection(e.getAllInBox(a[0], a[1], a[2], a[3]));
                  (a[0] = void 0),
                    (a[1] = void 0),
                    (a[2] = void 0),
                    (a[3] = void 0),
                    (a[4] = 0),
                    e.redrawHint("select", !0),
                    s.emit({
                      type: "boxend",
                      originalEvent: t,
                      position: { x: u[0], y: u[1] },
                    }),
                    f
                      .emit("box")
                      .stdFilter(function (e) {
                        return e.selectable() && !e.selected();
                      })
                      .select()
                      .emit("boxselect"),
                    f.nonempty() && e.redrawHint("eles", !0),
                    e.redraw();
                }
                if ((null != i && i.unactivate(), t.touches[2]))
                  (e.data.bgActivePosistion = void 0),
                    e.redrawHint("select", !0);
                else if (t.touches[1]);
                else if (t.touches[0]);
                else if (!t.touches[0]) {
                  (e.data.bgActivePosistion = void 0),
                    e.redrawHint("select", !0);
                  var g = e.dragData.touchDragEles;
                  if (null != i) {
                    var v = i._private.grabbed;
                    d(g),
                      e.redrawHint("drag", !0),
                      e.redrawHint("eles", !0),
                      v &&
                        (i.emit("freeon"),
                        g.emit("free"),
                        e.dragData.didDrag &&
                          (i.emit("dragfreeon"), g.emit("dragfree"))),
                      r(
                        i,
                        ["touchend", "tapend", "vmouseup", "tapdragout"],
                        t,
                        { x: u[0], y: u[1] }
                      ),
                      i.unactivate(),
                      (e.touchData.start = null);
                  } else {
                    var y = e.findNearestElement(u[0], u[1], !0, !0);
                    r(y, ["touchend", "tapend", "vmouseup", "tapdragout"], t, {
                      x: u[0],
                      y: u[1],
                    });
                  }
                  var m = e.touchData.startPosition[0] - u[0],
                    b = m * m,
                    x = e.touchData.startPosition[1] - u[1],
                    w = (b + x * x) * l * l;
                  e.touchData.singleTouchMoved ||
                    (i || s.$(":selected").unselect(["tapunselect"]),
                    r(i, ["tap", "vclick"], t, { x: u[0], y: u[1] }),
                    (q = !1),
                    t.timeStamp - Y <= s.multiClickDebounceTime()
                      ? (j && clearTimeout(j),
                        (q = !0),
                        (Y = null),
                        r(i, ["dbltap", "vdblclick"], t, { x: u[0], y: u[1] }))
                      : ((j = setTimeout(function () {
                          q ||
                            r(i, ["onetap", "voneclick"], t, {
                              x: u[0],
                              y: u[1],
                            });
                        }, s.multiClickDebounceTime())),
                        (Y = t.timeStamp))),
                    null != i &&
                      !e.dragData.didDrag &&
                      i._private.selectable &&
                      w < e.touchTapThreshold2 &&
                      !e.pinching &&
                      ("single" === s.selectionType()
                        ? (s.$(n).unmerge(i).unselect(["tapunselect"]),
                          i.select(["tapselect"]))
                        : i.selected()
                        ? i.unselect(["tapunselect"])
                        : i.select(["tapselect"]),
                      e.redrawHint("eles", !0)),
                    (e.touchData.singleTouchMoved = !0);
                }
                for (var E = 0; E < u.length; E++) c[E] = u[E];
                (e.dragData.didDrag = !1),
                  0 === t.touches.length &&
                    ((e.touchData.dragDelta = []),
                    (e.touchData.startPosition = [
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                    ]),
                    (e.touchData.startGPosition = null),
                    (e.touchData.didSelect = !1)),
                  t.touches.length < 2 &&
                    (1 === t.touches.length &&
                      (e.touchData.startGPosition = [
                        t.touches[0].clientX,
                        t.touches[0].clientY,
                      ]),
                    (e.pinching = !1),
                    e.redrawHint("eles", !0),
                    e.redraw());
              }
            }),
            !1
          ),
          "undefined" == typeof TouchEvent)
        ) {
          var H = [],
            G = function (e) {
              return {
                clientX: e.clientX,
                clientY: e.clientY,
                force: 1,
                identifier: e.pointerId,
                pageX: e.pageX,
                pageY: e.pageY,
                radiusX: e.width / 2,
                radiusY: e.height / 2,
                screenX: e.screenX,
                screenY: e.screenY,
                target: e.target,
              };
            },
            U = function (e) {
              for (var t = 0; t < H.length; t++)
                if (H[t].event.pointerId === e.pointerId)
                  return void H.splice(t, 1);
            },
            K = function (e) {
              e.touches = H.map(function (e) {
                return e.touch;
              });
            },
            Z = function (e) {
              return "mouse" === e.pointerType || 4 === e.pointerType;
            };
          e.registerBinding(e.container, "pointerdown", function (e) {
            Z(e) ||
              (e.preventDefault(),
              (function (e) {
                H.push(
                  (function (e) {
                    return { event: e, touch: G(e) };
                  })(e)
                );
              })(e),
              K(e),
              R(e));
          }),
            e.registerBinding(e.container, "pointerup", function (e) {
              Z(e) || (U(e), K(e), V(e));
            }),
            e.registerBinding(e.container, "pointercancel", function (e) {
              Z(e) || (U(e), K(e), F());
            }),
            e.registerBinding(e.container, "pointermove", function (e) {
              Z(e) ||
                (e.preventDefault(),
                (function (e) {
                  var t = H.filter(function (t) {
                    return t.event.pointerId === e.pointerId;
                  })[0];
                  (t.event = e), (t.touch = G(e));
                })(e),
                K(e),
                z(e));
            });
        }
      };
      var Il = {
          generatePolygon: function (e, t) {
            return (this.nodeShapes[e] = {
              renderer: this,
              name: e,
              points: t,
              draw: function (e, t, n, r, i, a) {
                this.renderer.nodeShapeImpl(
                  "polygon",
                  e,
                  t,
                  n,
                  r,
                  i,
                  this.points
                );
              },
              intersectLine: function (e, t, n, r, i, a, o, s) {
                return tn(i, a, this.points, e, t, n / 2, r / 2, o);
              },
              checkPoint: function (e, t, n, r, i, a, o, s) {
                return Ut(e, t, this.points, a, o, r, i, [0, -1], n);
              },
            });
          },
          generateEllipse: function () {
            return (this.nodeShapes.ellipse = {
              renderer: this,
              name: "ellipse",
              draw: function (e, t, n, r, i, a) {
                this.renderer.nodeShapeImpl(this.name, e, t, n, r, i);
              },
              intersectLine: function (e, t, n, r, i, a, o, s) {
                return (function (e, t, n, r, i, a) {
                  var o = n - e,
                    s = r - t;
                  (o /= i), (s /= a);
                  var l = Math.sqrt(o * o + s * s),
                    u = l - 1;
                  if (u < 0) return [];
                  var c = u / l;
                  return [(n - e) * c + e, (r - t) * c + t];
                })(i, a, e, t, n / 2 + o, r / 2 + o);
              },
              checkPoint: function (e, t, n, r, i, a, o, s) {
                return $t(e, t, r, i, a, o, n);
              },
            });
          },
          generateRoundPolygon: function (e, t) {
            return (this.nodeShapes[e] = {
              renderer: this,
              name: e,
              points: t,
              getOrCreateCorners: function (e, n, r, i, a, o, s) {
                if (void 0 !== o[s] && o[s + "-cx"] === e && o[s + "-cy"] === n)
                  return o[s];
                (o[s] = new Array(t.length / 2)),
                  (o[s + "-cx"] = e),
                  (o[s + "-cy"] = n);
                var l = r / 2,
                  u = i / 2;
                a = "auto" === a ? ln(r, i) : a;
                for (
                  var c = new Array(t.length / 2), d = 0;
                  d < t.length / 2;
                  d++
                )
                  c[d] = { x: e + l * t[2 * d], y: n + u * t[2 * d + 1] };
                var h,
                  p,
                  f,
                  g,
                  v = c.length;
                for (p = c[v - 1], h = 0; h < v; h++)
                  (f = c[h % v]),
                    (g = c[(h + 1) % v]),
                    (o[s][h] = yl(p, f, g, a)),
                    (p = f),
                    (f = g);
                return o[s];
              },
              draw: function (e, t, n, r, i, a, o) {
                this.renderer.nodeShapeImpl(
                  "round-polygon",
                  e,
                  t,
                  n,
                  r,
                  i,
                  this.points,
                  this.getOrCreateCorners(t, n, r, i, a, o, "drawCorners")
                );
              },
              intersectLine: function (e, t, n, r, i, a, o, s, l) {
                return (function (e, t, n, r, i, a, o, s, l) {
                  var u,
                    c = [],
                    d = new Array(2 * n.length);
                  l.forEach(function (n, a) {
                    0 === a
                      ? ((d[d.length - 2] = n.startX),
                        (d[d.length - 1] = n.startY))
                      : ((d[4 * a - 2] = n.startX), (d[4 * a - 1] = n.startY)),
                      (d[4 * a] = n.stopX),
                      (d[4 * a + 1] = n.stopY),
                      0 !== (u = Qt(e, t, r, i, n.cx, n.cy, n.radius)).length &&
                        c.push(u[0], u[1]);
                  });
                  for (var h = 0; h < d.length / 4; h++)
                    0 !==
                      (u = en(
                        e,
                        t,
                        r,
                        i,
                        d[4 * h],
                        d[4 * h + 1],
                        d[4 * h + 2],
                        d[4 * h + 3],
                        !1
                      )).length && c.push(u[0], u[1]);
                  if (c.length > 2) {
                    for (
                      var p = [c[0], c[1]],
                        f = Math.pow(p[0] - e, 2) + Math.pow(p[1] - t, 2),
                        g = 1;
                      g < c.length / 2;
                      g++
                    ) {
                      var v =
                        Math.pow(c[2 * g] - e, 2) +
                        Math.pow(c[2 * g + 1] - t, 2);
                      v <= f &&
                        ((p[0] = c[2 * g]), (p[1] = c[2 * g + 1]), (f = v));
                    }
                    return p;
                  }
                  return c;
                })(
                  i,
                  a,
                  this.points,
                  e,
                  t,
                  0,
                  0,
                  0,
                  this.getOrCreateCorners(e, t, n, r, s, l, "corners")
                );
              },
              checkPoint: function (e, t, n, r, i, a, o, s, l) {
                return (function (e, t, n, r, i, a, o, s) {
                  for (
                    var l = new Array(2 * n.length), u = 0;
                    u < s.length;
                    u++
                  ) {
                    var c = s[u];
                    if (
                      ((l[4 * u + 0] = c.startX),
                      (l[4 * u + 1] = c.startY),
                      (l[4 * u + 2] = c.stopX),
                      (l[4 * u + 3] = c.stopY),
                      Math.pow(c.cx - e, 2) + Math.pow(c.cy - t, 2) <=
                        Math.pow(c.radius, 2))
                    )
                      return !0;
                  }
                  return Gt(e, t, l);
                })(
                  e,
                  t,
                  this.points,
                  0,
                  0,
                  0,
                  0,
                  this.getOrCreateCorners(a, o, r, i, s, l, "corners")
                );
              },
            });
          },
          generateRoundRectangle: function () {
            return (this.nodeShapes["round-rectangle"] =
              this.nodeShapes.roundrectangle =
                {
                  renderer: this,
                  name: "round-rectangle",
                  points: rn(4, 0),
                  draw: function (e, t, n, r, i, a) {
                    this.renderer.nodeShapeImpl(
                      this.name,
                      e,
                      t,
                      n,
                      r,
                      i,
                      this.points,
                      a
                    );
                  },
                  intersectLine: function (e, t, n, r, i, a, o, s) {
                    return jt(i, a, e, t, n, r, o, s);
                  },
                  checkPoint: function (e, t, n, r, i, a, o, s) {
                    var l = r / 2,
                      u = i / 2;
                    s = "auto" === s ? sn(r, i) : s;
                    var c = 2 * (s = Math.min(l, u, s));
                    return !!(
                      Ut(e, t, this.points, a, o, r, i - c, [0, -1], n) ||
                      Ut(e, t, this.points, a, o, r - c, i, [0, -1], n) ||
                      $t(e, t, c, c, a - l + s, o - u + s, n) ||
                      $t(e, t, c, c, a + l - s, o - u + s, n) ||
                      $t(e, t, c, c, a + l - s, o + u - s, n) ||
                      $t(e, t, c, c, a - l + s, o + u - s, n)
                    );
                  },
                });
          },
          generateCutRectangle: function () {
            return (this.nodeShapes["cut-rectangle"] =
              this.nodeShapes.cutrectangle =
                {
                  renderer: this,
                  name: "cut-rectangle",
                  cornerLength: 8,
                  points: rn(4, 0),
                  draw: function (e, t, n, r, i, a) {
                    this.renderer.nodeShapeImpl(
                      this.name,
                      e,
                      t,
                      n,
                      r,
                      i,
                      null,
                      a
                    );
                  },
                  generateCutTrianglePts: function (e, t, n, r, i) {
                    var a = "auto" === i ? this.cornerLength : i,
                      o = t / 2,
                      s = e / 2,
                      l = n - s,
                      u = n + s,
                      c = r - o,
                      d = r + o;
                    return {
                      topLeft: [l, c + a, l + a, c, l + a, c + a],
                      topRight: [u - a, c, u, c + a, u - a, c + a],
                      bottomRight: [u, d - a, u - a, d, u - a, d - a],
                      bottomLeft: [l + a, d, l, d - a, l + a, d - a],
                    };
                  },
                  intersectLine: function (e, t, n, r, i, a, o, s) {
                    var l = this.generateCutTrianglePts(
                        n + 2 * o,
                        r + 2 * o,
                        e,
                        t,
                        s
                      ),
                      u = [].concat.apply(
                        [],
                        [
                          l.topLeft.splice(0, 4),
                          l.topRight.splice(0, 4),
                          l.bottomRight.splice(0, 4),
                          l.bottomLeft.splice(0, 4),
                        ]
                      );
                    return tn(i, a, u, e, t);
                  },
                  checkPoint: function (e, t, n, r, i, a, o, s) {
                    var l = "auto" === s ? this.cornerLength : s;
                    if (Ut(e, t, this.points, a, o, r, i - 2 * l, [0, -1], n))
                      return !0;
                    if (Ut(e, t, this.points, a, o, r - 2 * l, i, [0, -1], n))
                      return !0;
                    var u = this.generateCutTrianglePts(r, i, a, o);
                    return (
                      Gt(e, t, u.topLeft) ||
                      Gt(e, t, u.topRight) ||
                      Gt(e, t, u.bottomRight) ||
                      Gt(e, t, u.bottomLeft)
                    );
                  },
                });
          },
          generateBarrel: function () {
            return (this.nodeShapes.barrel = {
              renderer: this,
              name: "barrel",
              points: rn(4, 0),
              draw: function (e, t, n, r, i, a) {
                this.renderer.nodeShapeImpl(this.name, e, t, n, r, i);
              },
              intersectLine: function (e, t, n, r, i, a, o, s) {
                var l = this.generateBarrelBezierPts(
                    n + 2 * o,
                    r + 2 * o,
                    e,
                    t
                  ),
                  u = function (e) {
                    var t = Nt(
                        { x: e[0], y: e[1] },
                        { x: e[2], y: e[3] },
                        { x: e[4], y: e[5] },
                        0.15
                      ),
                      n = Nt(
                        { x: e[0], y: e[1] },
                        { x: e[2], y: e[3] },
                        { x: e[4], y: e[5] },
                        0.5
                      ),
                      r = Nt(
                        { x: e[0], y: e[1] },
                        { x: e[2], y: e[3] },
                        { x: e[4], y: e[5] },
                        0.85
                      );
                    return [
                      e[0],
                      e[1],
                      t.x,
                      t.y,
                      n.x,
                      n.y,
                      r.x,
                      r.y,
                      e[4],
                      e[5],
                    ];
                  },
                  c = [].concat(
                    u(l.topLeft),
                    u(l.topRight),
                    u(l.bottomRight),
                    u(l.bottomLeft)
                  );
                return tn(i, a, c, e, t);
              },
              generateBarrelBezierPts: function (e, t, n, r) {
                var i = t / 2,
                  a = e / 2,
                  o = n - a,
                  s = n + a,
                  l = r - i,
                  u = r + i,
                  c = un(e, t),
                  d = c.heightOffset,
                  h = c.widthOffset,
                  p = c.ctrlPtOffsetPct * e,
                  f = {
                    topLeft: [o, l + d, o + p, l, o + h, l],
                    topRight: [s - h, l, s - p, l, s, l + d],
                    bottomRight: [s, u - d, s - p, u, s - h, u],
                    bottomLeft: [o + h, u, o + p, u, o, u - d],
                  };
                return (
                  (f.topLeft.isTop = !0),
                  (f.topRight.isTop = !0),
                  (f.bottomLeft.isBottom = !0),
                  (f.bottomRight.isBottom = !0),
                  f
                );
              },
              checkPoint: function (e, t, n, r, i, a, o, s) {
                var l = un(r, i),
                  u = l.heightOffset,
                  c = l.widthOffset;
                if (Ut(e, t, this.points, a, o, r, i - 2 * u, [0, -1], n))
                  return !0;
                if (Ut(e, t, this.points, a, o, r - 2 * c, i, [0, -1], n))
                  return !0;
                for (
                  var d = this.generateBarrelBezierPts(r, i, a, o),
                    h = function (e, t, n) {
                      var r,
                        i,
                        a = n[4],
                        o = n[2],
                        s = n[0],
                        l = n[5],
                        u = n[1],
                        c = Math.min(a, s),
                        d = Math.max(a, s),
                        h = Math.min(l, u),
                        p = Math.max(l, u);
                      if (c <= e && e <= d && h <= t && t <= p) {
                        var f = [(r = a) - 2 * (i = o) + s, 2 * (i - r), r],
                          g = (function (e, t, n, r) {
                            var i = t * t - 4 * e * (n -= r);
                            if (i < 0) return [];
                            var a = Math.sqrt(i),
                              o = 2 * e;
                            return [(-t + a) / o, (-t - a) / o];
                          })(f[0], f[1], f[2], e).filter(function (e) {
                            return 0 <= e && e <= 1;
                          });
                        if (g.length > 0) return g[0];
                      }
                      return null;
                    },
                    p = Object.keys(d),
                    f = 0;
                  f < p.length;
                  f++
                ) {
                  var g = d[p[f]],
                    v = h(e, t, g);
                  if (null != v) {
                    var y = g[5],
                      m = g[3],
                      b = g[1],
                      x = Mt(y, m, b, v);
                    if (g.isTop && x <= t) return !0;
                    if (g.isBottom && t <= x) return !0;
                  }
                }
                return !1;
              },
            });
          },
          generateBottomRoundrectangle: function () {
            return (this.nodeShapes["bottom-round-rectangle"] =
              this.nodeShapes.bottomroundrectangle =
                {
                  renderer: this,
                  name: "bottom-round-rectangle",
                  points: rn(4, 0),
                  draw: function (e, t, n, r, i, a) {
                    this.renderer.nodeShapeImpl(
                      this.name,
                      e,
                      t,
                      n,
                      r,
                      i,
                      this.points,
                      a
                    );
                  },
                  intersectLine: function (e, t, n, r, i, a, o, s) {
                    var l = t - (r / 2 + o),
                      u = en(
                        i,
                        a,
                        e,
                        t,
                        e - (n / 2 + o),
                        l,
                        e + (n / 2 + o),
                        l,
                        !1
                      );
                    return u.length > 0 ? u : jt(i, a, e, t, n, r, o, s);
                  },
                  checkPoint: function (e, t, n, r, i, a, o, s) {
                    var l = 2 * (s = "auto" === s ? sn(r, i) : s);
                    if (Ut(e, t, this.points, a, o, r, i - l, [0, -1], n))
                      return !0;
                    if (Ut(e, t, this.points, a, o, r - l, i, [0, -1], n))
                      return !0;
                    var u = r / 2 + 2 * n,
                      c = i / 2 + 2 * n;
                    return (
                      !!Gt(e, t, [
                        a - u,
                        o - c,
                        a - u,
                        o,
                        a + u,
                        o,
                        a + u,
                        o - c,
                      ]) ||
                      !!$t(e, t, l, l, a + r / 2 - s, o + i / 2 - s, n) ||
                      !!$t(e, t, l, l, a - r / 2 + s, o + i / 2 - s, n)
                    );
                  },
                });
          },
          registerNodeShapes: function () {
            var e = (this.nodeShapes = {}),
              t = this;
            this.generateEllipse(),
              this.generatePolygon("triangle", rn(3, 0)),
              this.generateRoundPolygon("round-triangle", rn(3, 0)),
              this.generatePolygon("rectangle", rn(4, 0)),
              (e.square = e.rectangle),
              this.generateRoundRectangle(),
              this.generateCutRectangle(),
              this.generateBarrel(),
              this.generateBottomRoundrectangle();
            var n = [0, 1, 1, 0, 0, -1, -1, 0];
            this.generatePolygon("diamond", n),
              this.generateRoundPolygon("round-diamond", n),
              this.generatePolygon("pentagon", rn(5, 0)),
              this.generateRoundPolygon("round-pentagon", rn(5, 0)),
              this.generatePolygon("hexagon", rn(6, 0)),
              this.generateRoundPolygon("round-hexagon", rn(6, 0)),
              this.generatePolygon("heptagon", rn(7, 0)),
              this.generateRoundPolygon("round-heptagon", rn(7, 0)),
              this.generatePolygon("octagon", rn(8, 0)),
              this.generateRoundPolygon("round-octagon", rn(8, 0));
            var r = new Array(20),
              i = on(5, 0),
              a = on(5, Math.PI / 5),
              o = 0.5 * (3 - Math.sqrt(5));
            o *= 1.57;
            for (var s = 0; s < a.length / 2; s++)
              (a[2 * s] *= o), (a[2 * s + 1] *= o);
            for (s = 0; s < 5; s++)
              (r[4 * s] = i[2 * s]),
                (r[4 * s + 1] = i[2 * s + 1]),
                (r[4 * s + 2] = a[2 * s]),
                (r[4 * s + 3] = a[2 * s + 1]);
            (r = an(r)),
              this.generatePolygon("star", r),
              this.generatePolygon("vee", [-1, -1, 0, -0.333, 1, -1, 0, 1]),
              this.generatePolygon(
                "rhomboid",
                [-1, -1, 0.333, -1, 1, 1, -0.333, 1]
              ),
              this.generatePolygon(
                "right-rhomboid",
                [-0.333, -1, 1, -1, 0.333, 1, -1, 1]
              ),
              (this.nodeShapes.concavehexagon = this.generatePolygon(
                "concave-hexagon",
                [-1, -0.95, -0.75, 0, -1, 0.95, 1, 0.95, 0.75, 0, 1, -0.95]
              ));
            var l = [-1, -1, 0.25, -1, 1, 0, 0.25, 1, -1, 1];
            this.generatePolygon("tag", l),
              this.generateRoundPolygon("round-tag", l),
              (e.makePolygon = function (e) {
                var n,
                  r = "polygon-" + e.join("$");
                return (n = this[r]) ? n : t.generatePolygon(r, e);
              });
          },
        },
        Bl = {
          timeToRender: function () {
            return this.redrawTotalTime / this.redrawCount;
          },
          redraw: function (e) {
            e = e || Ge();
            var t = this;
            void 0 === t.averageRedrawTime && (t.averageRedrawTime = 0),
              void 0 === t.lastRedrawTime && (t.lastRedrawTime = 0),
              void 0 === t.lastDrawTime && (t.lastDrawTime = 0),
              (t.requestedFrame = !0),
              (t.renderOptions = e);
          },
          beforeRender: function (e, t) {
            if (!this.destroyed) {
              null == t && qe("Priority is not optional for beforeRender");
              var n = this.beforeRenderCallbacks;
              n.push({ fn: e, priority: t }),
                n.sort(function (e, t) {
                  return t.priority - e.priority;
                });
            }
          },
        },
        Al = function (e, t, n) {
          for (var r = e.beforeRenderCallbacks, i = 0; i < r.length; i++)
            r[i].fn(t, n);
        };
      Bl.startRenderLoop = function () {
        var e = this,
          t = e.cy;
        e.renderLoopStarted ||
          ((e.renderLoopStarted = !0),
          we(function n(r) {
            if (!e.destroyed) {
              if (t.batching());
              else if (e.requestedFrame && !e.skipFrame) {
                Al(e, !0, r);
                var i = Ee();
                e.render(e.renderOptions);
                var a = (e.lastDrawTime = Ee());
                void 0 === e.averageRedrawTime && (e.averageRedrawTime = a - i),
                  void 0 === e.redrawCount && (e.redrawCount = 0),
                  e.redrawCount++,
                  void 0 === e.redrawTotalTime && (e.redrawTotalTime = 0);
                var o = a - i;
                (e.redrawTotalTime += o),
                  (e.lastRedrawTime = o),
                  (e.averageRedrawTime = e.averageRedrawTime / 2 + o / 2),
                  (e.requestedFrame = !1);
              } else Al(e, !1, r);
              (e.skipFrame = !1), we(n);
            }
          }));
      };
      var Ll = function (e) {
          this.init(e);
        },
        Ol = Ll.prototype;
      (Ol.clientFunctions = [
        "redrawHint",
        "render",
        "renderTo",
        "matchCanvasSize",
        "nodeShapeImpl",
        "arrowShapeImpl",
      ]),
        (Ol.init = function (e) {
          var t = this;
          (t.options = e), (t.cy = e.cy);
          var n = (t.container = e.cy.container()),
            r = t.cy.window();
          if (r) {
            var i = r.document,
              a = i.head,
              o = "__________cytoscape_stylesheet",
              s = "__________cytoscape_container",
              l = null != i.getElementById(o);
            if (
              (n.className.indexOf(s) < 0 &&
                (n.className = (n.className || "") + " " + s),
              !l)
            ) {
              var u = i.createElement("style");
              (u.id = o),
                (u.textContent = "." + s + " { position: relative; }"),
                a.insertBefore(u, a.children[0]);
            }
            "static" === r.getComputedStyle(n).getPropertyValue("position") &&
              Ye(
                "A Cytoscape container has style position:static and so can not use UI extensions properly"
              );
          }
          (t.selection = [void 0, void 0, void 0, void 0, 0]),
            (t.bezierProjPcts = [0.05, 0.225, 0.4, 0.5, 0.6, 0.775, 0.95]),
            (t.hoverData = {
              down: null,
              last: null,
              downTime: null,
              triggerMode: null,
              dragging: !1,
              initialPan: [null, null],
              capture: !1,
            }),
            (t.dragData = { possibleDragElements: [] }),
            (t.touchData = {
              start: null,
              capture: !1,
              startPosition: [null, null, null, null, null, null],
              singleTouchStartTime: null,
              singleTouchMoved: !0,
              now: [null, null, null, null, null, null],
              earlier: [null, null, null, null, null, null],
            }),
            (t.redraws = 0),
            (t.showFps = e.showFps),
            (t.debug = e.debug),
            (t.hideEdgesOnViewport = e.hideEdgesOnViewport),
            (t.textureOnViewport = e.textureOnViewport),
            (t.wheelSensitivity = e.wheelSensitivity),
            (t.motionBlurEnabled = e.motionBlur),
            (t.forcedPixelRatio = E(e.pixelRatio) ? e.pixelRatio : null),
            (t.motionBlur = e.motionBlur),
            (t.motionBlurOpacity = e.motionBlurOpacity),
            (t.motionBlurTransparency = 1 - t.motionBlurOpacity),
            (t.motionBlurPxRatio = 1),
            (t.mbPxRBlurry = 1),
            (t.minMbLowQualFrames = 4),
            (t.fullQualityMb = !1),
            (t.clearedForMotionBlur = []),
            (t.desktopTapThreshold = e.desktopTapThreshold),
            (t.desktopTapThreshold2 =
              e.desktopTapThreshold * e.desktopTapThreshold),
            (t.touchTapThreshold = e.touchTapThreshold),
            (t.touchTapThreshold2 = e.touchTapThreshold * e.touchTapThreshold),
            (t.tapholdDuration = 500),
            (t.bindings = []),
            (t.beforeRenderCallbacks = []),
            (t.beforeRenderPriorities = {
              animations: 400,
              eleCalcs: 300,
              eleTxrDeq: 200,
              lyrTxrDeq: 150,
              lyrTxrSkip: 100,
            }),
            t.registerNodeShapes(),
            t.registerArrowShapes(),
            t.registerCalculationListeners();
        }),
        (Ol.notify = function (e, t) {
          var n = this,
            r = n.cy;
          this.destroyed ||
            ("init" !== e
              ? "destroy" !== e
                ? (("add" === e ||
                    "remove" === e ||
                    ("move" === e && r.hasCompoundNodes()) ||
                    "load" === e ||
                    "zorder" === e ||
                    "mount" === e) &&
                    n.invalidateCachedZSortedEles(),
                  "viewport" === e && n.redrawHint("select", !0),
                  ("load" !== e && "resize" !== e && "mount" !== e) ||
                    (n.invalidateContainerClientCoordsCache(),
                    n.matchCanvasSize(n.container)),
                  n.redrawHint("eles", !0),
                  n.redrawHint("drag", !0),
                  this.startRenderLoop(),
                  this.redraw())
                : n.destroy()
              : n.load());
        }),
        (Ol.destroy = function () {
          var e = this;
          (e.destroyed = !0), e.cy.stopAnimationLoop();
          for (var t = 0; t < e.bindings.length; t++) {
            var n = e.bindings[t],
              r = n.target;
            (r.off || r.removeEventListener).apply(r, n.args);
          }
          if (
            ((e.bindings = []),
            (e.beforeRenderCallbacks = []),
            (e.onUpdateEleCalcsFns = []),
            e.removeObserver && e.removeObserver.disconnect(),
            e.styleObserver && e.styleObserver.disconnect(),
            e.resizeObserver && e.resizeObserver.disconnect(),
            e.labelCalcDiv)
          )
            try {
              document.body.removeChild(e.labelCalcDiv);
            } catch (e) {}
        }),
        (Ol.isHeadless = function () {
          return !1;
        }),
        [Gs, _l, Ml, Nl, Il, Bl].forEach(function (e) {
          j(Ol, e);
        });
      var Rl = 1e3 / 60,
        zl = function (e) {
          return function () {
            var t = this,
              n = this.renderer;
            if (!t.dequeueingSetup) {
              t.dequeueingSetup = !0;
              var r = ye(function () {
                  n.redrawHint("eles", !0),
                    n.redrawHint("drag", !0),
                    n.redraw();
                }, e.deqRedrawThreshold),
                i = e.priority || Ve;
              n.beforeRender(function (i, a) {
                var o = Ee(),
                  s = n.averageRedrawTime,
                  l = n.lastRedrawTime,
                  u = [],
                  c = n.cy.extent(),
                  d = n.getPixelRatio();
                for (i || n.flushRenderedStyleQueue(); ; ) {
                  var h = Ee(),
                    p = h - o,
                    f = h - a;
                  if (l < Rl) {
                    var g = Rl - (i ? s : 0);
                    if (f >= e.deqFastCost * g) break;
                  } else if (i) {
                    if (p >= e.deqCost * l || p >= e.deqAvgCost * s) break;
                  } else if (f >= e.deqNoDrawCost * Rl) break;
                  var v = e.deq(t, d, c);
                  if (!(v.length > 0)) break;
                  for (var y = 0; y < v.length; y++) u.push(v[y]);
                }
                u.length > 0 &&
                  (e.onDeqd(t, u), !i && e.shouldRedraw(t, u, d, c) && r());
              }, i(t));
            }
          };
        },
        Fl = (function () {
          function e(t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : ze;
            i(this, e),
              (this.idsByKey = new Je()),
              (this.keyForId = new Je()),
              (this.cachesByLvl = new Je()),
              (this.lvls = []),
              (this.getKey = t),
              (this.doesEleInvalidateKey = n);
          }
          return (
            o(e, [
              {
                key: "getIdsFor",
                value: function (e) {
                  null == e && qe("Can not get id list for null key");
                  var t = this.idsByKey,
                    n = this.idsByKey.get(e);
                  return n || ((n = new tt()), t.set(e, n)), n;
                },
              },
              {
                key: "addIdForKey",
                value: function (e, t) {
                  null != e && this.getIdsFor(e).add(t);
                },
              },
              {
                key: "deleteIdForKey",
                value: function (e, t) {
                  null != e && this.getIdsFor(e).delete(t);
                },
              },
              {
                key: "getNumberOfIdsForKey",
                value: function (e) {
                  return null == e ? 0 : this.getIdsFor(e).size;
                },
              },
              {
                key: "updateKeyMappingFor",
                value: function (e) {
                  var t = e.id(),
                    n = this.keyForId.get(t),
                    r = this.getKey(e);
                  this.deleteIdForKey(n, t),
                    this.addIdForKey(r, t),
                    this.keyForId.set(t, r);
                },
              },
              {
                key: "deleteKeyMappingFor",
                value: function (e) {
                  var t = e.id(),
                    n = this.keyForId.get(t);
                  this.deleteIdForKey(n, t), this.keyForId.delete(t);
                },
              },
              {
                key: "keyHasChangedFor",
                value: function (e) {
                  var t = e.id();
                  return this.keyForId.get(t) !== this.getKey(e);
                },
              },
              {
                key: "isInvalid",
                value: function (e) {
                  return (
                    this.keyHasChangedFor(e) || this.doesEleInvalidateKey(e)
                  );
                },
              },
              {
                key: "getCachesAt",
                value: function (e) {
                  var t = this.cachesByLvl,
                    n = this.lvls,
                    r = t.get(e);
                  return r || ((r = new Je()), t.set(e, r), n.push(e)), r;
                },
              },
              {
                key: "getCache",
                value: function (e, t) {
                  return this.getCachesAt(t).get(e);
                },
              },
              {
                key: "get",
                value: function (e, t) {
                  var n = this.getKey(e),
                    r = this.getCache(n, t);
                  return null != r && this.updateKeyMappingFor(e), r;
                },
              },
              {
                key: "getForCachedKey",
                value: function (e, t) {
                  var n = this.keyForId.get(e.id());
                  return this.getCache(n, t);
                },
              },
              {
                key: "hasCache",
                value: function (e, t) {
                  return this.getCachesAt(t).has(e);
                },
              },
              {
                key: "has",
                value: function (e, t) {
                  var n = this.getKey(e);
                  return this.hasCache(n, t);
                },
              },
              {
                key: "setCache",
                value: function (e, t, n) {
                  (n.key = e), this.getCachesAt(t).set(e, n);
                },
              },
              {
                key: "set",
                value: function (e, t, n) {
                  var r = this.getKey(e);
                  this.setCache(r, t, n), this.updateKeyMappingFor(e);
                },
              },
              {
                key: "deleteCache",
                value: function (e, t) {
                  this.getCachesAt(t).delete(e);
                },
              },
              {
                key: "delete",
                value: function (e, t) {
                  var n = this.getKey(e);
                  this.deleteCache(n, t);
                },
              },
              {
                key: "invalidateKey",
                value: function (e) {
                  var t = this;
                  this.lvls.forEach(function (n) {
                    return t.deleteCache(e, n);
                  });
                },
              },
              {
                key: "invalidate",
                value: function (e) {
                  var t = e.id(),
                    n = this.keyForId.get(t);
                  this.deleteKeyMappingFor(e);
                  var r = this.doesEleInvalidateKey(e);
                  return (
                    r && this.invalidateKey(n),
                    r || 0 === this.getNumberOfIdsForKey(n)
                  );
                },
              },
            ]),
            e
          );
        })(),
        Vl = {
          dequeue: "dequeue",
          downscale: "downscale",
          highQuality: "highQuality",
        },
        ql = Ue({
          getKey: null,
          doesEleInvalidateKey: ze,
          drawElement: null,
          getBoundingBox: null,
          getRotationPoint: null,
          getRotationOffset: null,
          isVisible: Re,
          allowEdgeTxrCaching: !0,
          allowParentTxrCaching: !0,
        }),
        jl = function (e, t) {
          var n = this;
          (n.renderer = e), (n.onDequeues = []);
          var r = ql(t);
          j(n, r),
            (n.lookup = new Fl(r.getKey, r.doesEleInvalidateKey)),
            n.setupDequeueing();
        },
        Yl = jl.prototype;
      (Yl.reasons = Vl),
        (Yl.getTextureQueue = function (e) {
          var t = this;
          return (
            (t.eleImgCaches = t.eleImgCaches || {}),
            (t.eleImgCaches[e] = t.eleImgCaches[e] || [])
          );
        }),
        (Yl.getRetiredTextureQueue = function (e) {
          var t = (this.eleImgCaches.retired = this.eleImgCaches.retired || {});
          return (t[e] = t[e] || []);
        }),
        (Yl.getElementQueue = function () {
          return (this.eleCacheQueue =
            this.eleCacheQueue ||
            new st(function (e, t) {
              return t.reqs - e.reqs;
            }));
        }),
        (Yl.getElementKeyToQueue = function () {
          return (this.eleKeyToCacheQueue = this.eleKeyToCacheQueue || {});
        }),
        (Yl.getElement = function (e, t, n, r, i) {
          var a = this,
            o = this.renderer,
            s = o.cy.zoom(),
            l = this.lookup;
          if (
            !t ||
            0 === t.w ||
            0 === t.h ||
            isNaN(t.w) ||
            isNaN(t.h) ||
            !e.visible() ||
            e.removed()
          )
            return null;
          if (
            (!a.allowEdgeTxrCaching && e.isEdge()) ||
            (!a.allowParentTxrCaching && e.isParent())
          )
            return null;
          if ((null == r && (r = Math.ceil(Tt(s * n))), r < -4)) r = -4;
          else if (s >= 7.99 || r > 3) return null;
          var u = Math.pow(2, r),
            c = t.h * u,
            d = t.w * u,
            h = o.eleTextBiggerThanMin(e, u);
          if (!this.isVisible(e, h)) return null;
          var p,
            f = l.get(e, r);
          if (
            (f &&
              f.invalidated &&
              ((f.invalidated = !1), (f.texture.invalidatedWidth -= f.width)),
            f)
          )
            return f;
          if (
            ((p = c <= 25 ? 25 : c <= 50 ? 50 : 50 * Math.ceil(c / 50)),
            c > 1024 || d > 1024)
          )
            return null;
          var g = a.getTextureQueue(p),
            v = g[g.length - 2],
            y = function () {
              return a.recycleTexture(p, d) || a.addTexture(p, d);
            };
          v || (v = g[g.length - 1]),
            v || (v = y()),
            v.width - v.usedWidth < d && (v = y());
          for (
            var m,
              b = function (e) {
                return e && e.scaledLabelShown === h;
              },
              x = i && i === Vl.dequeue,
              w = i && i === Vl.highQuality,
              E = i && i === Vl.downscale,
              C = r + 1;
            C <= 3;
            C++
          ) {
            var k = l.get(e, C);
            if (k) {
              m = k;
              break;
            }
          }
          var T = m && m.level === r + 1 ? m : null,
            S = function () {
              v.context.drawImage(
                T.texture.canvas,
                T.x,
                0,
                T.width,
                T.height,
                v.usedWidth,
                0,
                d,
                c
              );
            };
          if (
            (v.context.setTransform(1, 0, 0, 1, 0, 0),
            v.context.clearRect(v.usedWidth, 0, d, p),
            b(T))
          )
            S();
          else if (b(m)) {
            if (!w) return a.queueElement(e, m.level - 1), m;
            for (var P = m.level; P > r; P--)
              T = a.getElement(e, t, n, P, Vl.downscale);
            S();
          } else {
            var D;
            if (!x && !w && !E)
              for (var _ = r - 1; _ >= -4; _--) {
                var M = l.get(e, _);
                if (M) {
                  D = M;
                  break;
                }
              }
            if (b(D)) return a.queueElement(e, r), D;
            v.context.translate(v.usedWidth, 0),
              v.context.scale(u, u),
              this.drawElement(v.context, e, t, h, !1),
              v.context.scale(1 / u, 1 / u),
              v.context.translate(-v.usedWidth, 0);
          }
          return (
            (f = {
              x: v.usedWidth,
              texture: v,
              level: r,
              scale: u,
              width: d,
              height: c,
              scaledLabelShown: h,
            }),
            (v.usedWidth += Math.ceil(d + 8)),
            v.eleCaches.push(f),
            l.set(e, r, f),
            a.checkTextureFullness(v),
            f
          );
        }),
        (Yl.invalidateElements = function (e) {
          for (var t = 0; t < e.length; t++) this.invalidateElement(e[t]);
        }),
        (Yl.invalidateElement = function (e) {
          var t = this,
            n = t.lookup,
            r = [];
          if (n.isInvalid(e)) {
            for (var i = -4; i <= 3; i++) {
              var a = n.getForCachedKey(e, i);
              a && r.push(a);
            }
            if (n.invalidate(e))
              for (var o = 0; o < r.length; o++) {
                var s = r[o],
                  l = s.texture;
                (l.invalidatedWidth += s.width),
                  (s.invalidated = !0),
                  t.checkTextureUtility(l);
              }
            t.removeFromQueue(e);
          }
        }),
        (Yl.checkTextureUtility = function (e) {
          e.invalidatedWidth >= 0.2 * e.width && this.retireTexture(e);
        }),
        (Yl.checkTextureFullness = function (e) {
          var t = this.getTextureQueue(e.height);
          e.usedWidth / e.width > 0.8 && e.fullnessChecks >= 10
            ? Ke(t, e)
            : e.fullnessChecks++;
        }),
        (Yl.retireTexture = function (e) {
          var t = e.height,
            n = this.getTextureQueue(t),
            r = this.lookup;
          Ke(n, e), (e.retired = !0);
          for (var i = e.eleCaches, a = 0; a < i.length; a++) {
            var o = i[a];
            r.deleteCache(o.key, o.level);
          }
          Ze(i), this.getRetiredTextureQueue(t).push(e);
        }),
        (Yl.addTexture = function (e, t) {
          var n = {};
          return (
            this.getTextureQueue(e).push(n),
            (n.eleCaches = []),
            (n.height = e),
            (n.width = Math.max(1024, t)),
            (n.usedWidth = 0),
            (n.invalidatedWidth = 0),
            (n.fullnessChecks = 0),
            (n.canvas = this.renderer.makeOffscreenCanvas(n.width, n.height)),
            (n.context = n.canvas.getContext("2d")),
            n
          );
        }),
        (Yl.recycleTexture = function (e, t) {
          for (
            var n = this.getTextureQueue(e),
              r = this.getRetiredTextureQueue(e),
              i = 0;
            i < r.length;
            i++
          ) {
            var a = r[i];
            if (a.width >= t)
              return (
                (a.retired = !1),
                (a.usedWidth = 0),
                (a.invalidatedWidth = 0),
                (a.fullnessChecks = 0),
                Ze(a.eleCaches),
                a.context.setTransform(1, 0, 0, 1, 0, 0),
                a.context.clearRect(0, 0, a.width, a.height),
                Ke(r, a),
                n.push(a),
                a
              );
          }
        }),
        (Yl.queueElement = function (e, t) {
          var n = this.getElementQueue(),
            r = this.getElementKeyToQueue(),
            i = this.getKey(e),
            a = r[i];
          if (a)
            (a.level = Math.max(a.level, t)),
              a.eles.merge(e),
              a.reqs++,
              n.updateItem(a);
          else {
            var o = { eles: e.spawn().merge(e), level: t, reqs: 1, key: i };
            n.push(o), (r[i] = o);
          }
        }),
        (Yl.dequeue = function (e) {
          for (
            var t = this,
              n = t.getElementQueue(),
              r = t.getElementKeyToQueue(),
              i = [],
              a = t.lookup,
              o = 0;
            o < 1 && n.size() > 0;
            o++
          ) {
            var s = n.pop(),
              l = s.key,
              u = s.eles[0],
              c = a.hasCache(u, s.level);
            if (((r[l] = null), !c)) {
              i.push(s);
              var d = t.getBoundingBox(u);
              t.getElement(u, d, e, s.level, Vl.dequeue);
            }
          }
          return i;
        }),
        (Yl.removeFromQueue = function (e) {
          var t = this.getElementQueue(),
            n = this.getElementKeyToQueue(),
            r = this.getKey(e),
            i = n[r];
          null != i &&
            (1 === i.eles.length
              ? ((i.reqs = Oe), t.updateItem(i), t.pop(), (n[r] = null))
              : i.eles.unmerge(e));
        }),
        (Yl.onDequeue = function (e) {
          this.onDequeues.push(e);
        }),
        (Yl.offDequeue = function (e) {
          Ke(this.onDequeues, e);
        }),
        (Yl.setupDequeueing = zl({
          deqRedrawThreshold: 100,
          deqCost: 0.15,
          deqAvgCost: 0.1,
          deqNoDrawCost: 0.9,
          deqFastCost: 0.9,
          deq: function (e, t, n) {
            return e.dequeue(t, n);
          },
          onDeqd: function (e, t) {
            for (var n = 0; n < e.onDequeues.length; n++)
              (0, e.onDequeues[n])(t);
          },
          shouldRedraw: function (e, t, n, r) {
            for (var i = 0; i < t.length; i++)
              for (var a = t[i].eles, o = 0; o < a.length; o++) {
                var s = a[o].boundingBox();
                if (Ft(s, r)) return !0;
              }
            return !1;
          },
          priority: function (e) {
            return e.renderer.beforeRenderPriorities.eleTxrDeq;
          },
        }));
      var Xl = function (e) {
          var t = this,
            n = (t.renderer = e),
            r = n.cy;
          (t.layersByLevel = {}),
            (t.firstGet = !0),
            (t.lastInvalidationTime = Ee() - 500),
            (t.skipping = !1),
            (t.eleTxrDeqs = r.collection()),
            (t.scheduleElementRefinement = ye(function () {
              t.refineElementTextures(t.eleTxrDeqs),
                t.eleTxrDeqs.unmerge(t.eleTxrDeqs);
            }, 50)),
            n.beforeRender(function (e, n) {
              n - t.lastInvalidationTime <= 250
                ? (t.skipping = !0)
                : (t.skipping = !1);
            }, n.beforeRenderPriorities.lyrTxrSkip),
            (t.layersQueue = new st(function (e, t) {
              return t.reqs - e.reqs;
            })),
            t.setupDequeueing();
        },
        Wl = Xl.prototype,
        Hl = 0,
        Gl = Math.pow(2, 53) - 1;
      (Wl.makeLayer = function (e, t) {
        var n = Math.pow(2, t),
          r = Math.ceil(e.w * n),
          i = Math.ceil(e.h * n),
          a = this.renderer.makeOffscreenCanvas(r, i),
          o = {
            id: (Hl = ++Hl % Gl),
            bb: e,
            level: t,
            width: r,
            height: i,
            canvas: a,
            context: a.getContext("2d"),
            eles: [],
            elesQueue: [],
            reqs: 0,
          },
          s = o.context,
          l = -o.bb.x1,
          u = -o.bb.y1;
        return s.scale(n, n), s.translate(l, u), o;
      }),
        (Wl.getLayers = function (e, t, n) {
          var r = this,
            i = r.renderer.cy.zoom(),
            a = r.firstGet;
          if (((r.firstGet = !1), null == n))
            if ((n = Math.ceil(Tt(i * t))) < -4) n = -4;
            else if (i >= 3.99 || n > 2) return null;
          r.validateLayersElesOrdering(n, e);
          var o,
            s,
            l = r.layersByLevel,
            u = Math.pow(2, n),
            c = (l[n] = l[n] || []);
          if (r.levelIsComplete(n, e)) return c;
          !(function () {
            var t = function (t) {
                if (
                  (r.validateLayersElesOrdering(t, e), r.levelIsComplete(t, e))
                )
                  return (s = l[t]), !0;
              },
              i = function (e) {
                if (!s) for (var r = n + e; -4 <= r && r <= 2 && !t(r); r += e);
              };
            i(1), i(-1);
            for (var a = c.length - 1; a >= 0; a--) {
              var o = c[a];
              o.invalid && Ke(c, o);
            }
          })();
          var d = function (t) {
            var i = (t = t || {}).after;
            if (
              ((function () {
                if (!o) {
                  o = Bt();
                  for (var t = 0; t < e.length; t++) At(o, e[t].boundingBox());
                }
              })(),
              o.w * u * (o.h * u) > 16e6)
            )
              return null;
            var a = r.makeLayer(o, n);
            if (null != i) {
              var s = c.indexOf(i) + 1;
              c.splice(s, 0, a);
            } else (void 0 === t.insert || t.insert) && c.unshift(a);
            return a;
          };
          if (r.skipping && !a) return null;
          for (
            var h = null, p = e.length / 1, f = !a, g = 0;
            g < e.length;
            g++
          ) {
            var v = e[g],
              y = v._private.rscratch,
              m = (y.imgLayerCaches = y.imgLayerCaches || {}),
              b = m[n];
            if (b) h = b;
            else {
              if (
                (!h || h.eles.length >= p || !qt(h.bb, v.boundingBox())) &&
                !(h = d({ insert: !0, after: h }))
              )
                return null;
              s || f ? r.queueLayer(h, v) : r.drawEleInLayer(h, v, n, t),
                h.eles.push(v),
                (m[n] = h);
            }
          }
          return s || (f ? null : c);
        }),
        (Wl.getEleLevelForLayerLevel = function (e, t) {
          return e;
        }),
        (Wl.drawEleInLayer = function (e, t, n, r) {
          var i = this.renderer,
            a = e.context,
            o = t.boundingBox();
          0 !== o.w &&
            0 !== o.h &&
            t.visible() &&
            ((n = this.getEleLevelForLayerLevel(n, r)),
            i.setImgSmoothing(a, !1),
            i.drawCachedElement(a, t, null, null, n, !0),
            i.setImgSmoothing(a, !0));
        }),
        (Wl.levelIsComplete = function (e, t) {
          var n = this.layersByLevel[e];
          if (!n || 0 === n.length) return !1;
          for (var r = 0, i = 0; i < n.length; i++) {
            var a = n[i];
            if (a.reqs > 0) return !1;
            if (a.invalid) return !1;
            r += a.eles.length;
          }
          return r === t.length;
        }),
        (Wl.validateLayersElesOrdering = function (e, t) {
          var n = this.layersByLevel[e];
          if (n)
            for (var r = 0; r < n.length; r++) {
              for (var i = n[r], a = -1, o = 0; o < t.length; o++)
                if (i.eles[0] === t[o]) {
                  a = o;
                  break;
                }
              if (a < 0) this.invalidateLayer(i);
              else {
                var s = a;
                for (o = 0; o < i.eles.length; o++)
                  if (i.eles[o] !== t[s + o]) {
                    this.invalidateLayer(i);
                    break;
                  }
              }
            }
        }),
        (Wl.updateElementsInLayers = function (e, t) {
          for (var n = T(e[0]), r = 0; r < e.length; r++)
            for (
              var i = n ? null : e[r],
                a = n ? e[r] : e[r].ele,
                o = a._private.rscratch,
                s = (o.imgLayerCaches = o.imgLayerCaches || {}),
                l = -4;
              l <= 2;
              l++
            ) {
              var u = s[l];
              u &&
                ((i && this.getEleLevelForLayerLevel(u.level) !== i.level) ||
                  t(u, a, i));
            }
        }),
        (Wl.haveLayers = function () {
          for (var e = !1, t = -4; t <= 2; t++) {
            var n = this.layersByLevel[t];
            if (n && n.length > 0) {
              e = !0;
              break;
            }
          }
          return e;
        }),
        (Wl.invalidateElements = function (e) {
          var t = this;
          0 !== e.length &&
            ((t.lastInvalidationTime = Ee()),
            0 !== e.length &&
              t.haveLayers() &&
              t.updateElementsInLayers(e, function (e, n, r) {
                t.invalidateLayer(e);
              }));
        }),
        (Wl.invalidateLayer = function (e) {
          if (((this.lastInvalidationTime = Ee()), !e.invalid)) {
            var t = e.level,
              n = e.eles,
              r = this.layersByLevel[t];
            Ke(r, e),
              (e.elesQueue = []),
              (e.invalid = !0),
              e.replacement && (e.replacement.invalid = !0);
            for (var i = 0; i < n.length; i++) {
              var a = n[i]._private.rscratch.imgLayerCaches;
              a && (a[t] = null);
            }
          }
        }),
        (Wl.refineElementTextures = function (e) {
          var t = this;
          t.updateElementsInLayers(e, function (e, n, r) {
            var i = e.replacement;
            if (
              (i ||
                (((i = e.replacement = t.makeLayer(e.bb, e.level)).replaces =
                  e),
                (i.eles = e.eles)),
              !i.reqs)
            )
              for (var a = 0; a < i.eles.length; a++)
                t.queueLayer(i, i.eles[a]);
          });
        }),
        (Wl.enqueueElementRefinement = function (e) {
          this.eleTxrDeqs.merge(e), this.scheduleElementRefinement();
        }),
        (Wl.queueLayer = function (e, t) {
          var n = this.layersQueue,
            r = e.elesQueue,
            i = (r.hasId = r.hasId || {});
          if (!e.replacement) {
            if (t) {
              if (i[t.id()]) return;
              r.push(t), (i[t.id()] = !0);
            }
            e.reqs ? (e.reqs++, n.updateItem(e)) : ((e.reqs = 1), n.push(e));
          }
        }),
        (Wl.dequeue = function (e) {
          for (
            var t = this, n = t.layersQueue, r = [], i = 0;
            i < 1 && 0 !== n.size();

          ) {
            var a = n.peek();
            if (a.replacement) n.pop();
            else if (a.replaces && a !== a.replaces.replacement) n.pop();
            else if (a.invalid) n.pop();
            else {
              var o = a.elesQueue.shift();
              o && (t.drawEleInLayer(a, o, a.level, e), i++),
                0 === r.length && r.push(!0),
                0 === a.elesQueue.length &&
                  (n.pop(),
                  (a.reqs = 0),
                  a.replaces && t.applyLayerReplacement(a),
                  t.requestRedraw());
            }
          }
          return r;
        }),
        (Wl.applyLayerReplacement = function (e) {
          var t = this.layersByLevel[e.level],
            n = e.replaces,
            r = t.indexOf(n);
          if (!(r < 0 || n.invalid)) {
            t[r] = e;
            for (var i = 0; i < e.eles.length; i++) {
              var a = e.eles[i]._private,
                o = (a.imgLayerCaches = a.imgLayerCaches || {});
              o && (o[e.level] = e);
            }
            this.requestRedraw();
          }
        }),
        (Wl.requestRedraw = ye(function () {
          var e = this.renderer;
          e.redrawHint("eles", !0), e.redrawHint("drag", !0), e.redraw();
        }, 100)),
        (Wl.setupDequeueing = zl({
          deqRedrawThreshold: 50,
          deqCost: 0.15,
          deqAvgCost: 0.1,
          deqNoDrawCost: 0.9,
          deqFastCost: 0.9,
          deq: function (e, t) {
            return e.dequeue(t);
          },
          onDeqd: Ve,
          shouldRedraw: Re,
          priority: function (e) {
            return e.renderer.beforeRenderPriorities.lyrTxrDeq;
          },
        }));
      var Ul,
        Kl = {};
      function Zl(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          e.lineTo(r.x, r.y);
        }
      }
      function $l(e, t, n) {
        for (var r, i = 0; i < t.length; i++) {
          var a = t[i];
          0 === i && (r = a), e.lineTo(a.x, a.y);
        }
        e.quadraticCurveTo(n.x, n.y, r.x, r.y);
      }
      function Ql(e, t, n) {
        e.beginPath && e.beginPath();
        for (var r = t, i = 0; i < r.length; i++) {
          var a = r[i];
          e.lineTo(a.x, a.y);
        }
        var o = n,
          s = n[0];
        for (e.moveTo(s.x, s.y), i = 1; i < o.length; i++)
          (a = o[i]), e.lineTo(a.x, a.y);
        e.closePath && e.closePath();
      }
      function Jl(e, t, n, r, i) {
        e.beginPath && e.beginPath(), e.arc(n, r, i, 0, 2 * Math.PI, !1);
        var a = t,
          o = a[0];
        e.moveTo(o.x, o.y);
        for (var s = 0; s < a.length; s++) {
          var l = a[s];
          e.lineTo(l.x, l.y);
        }
        e.closePath && e.closePath();
      }
      function eu(e, t, n, r) {
        e.arc(t, n, r, 0, 2 * Math.PI, !1);
      }
      Kl.arrowShapeImpl = function (e) {
        return (Ul ||
          (Ul = {
            polygon: Zl,
            "triangle-backcurve": $l,
            "triangle-tee": Ql,
            "circle-triangle": Jl,
            "triangle-cross": Ql,
            circle: eu,
          }))[e];
      };
      var tu = {
          drawElement: function (e, t, n, r, i, a) {
            t.isNode()
              ? this.drawNode(e, t, n, r, i, a)
              : this.drawEdge(e, t, n, r, i, a);
          },
          drawElementOverlay: function (e, t) {
            t.isNode()
              ? this.drawNodeOverlay(e, t)
              : this.drawEdgeOverlay(e, t);
          },
          drawElementUnderlay: function (e, t) {
            t.isNode()
              ? this.drawNodeUnderlay(e, t)
              : this.drawEdgeUnderlay(e, t);
          },
          drawCachedElementPortion: function (e, t, n, r, i, a, o, s) {
            var l = this,
              u = n.getBoundingBox(t);
            if (0 !== u.w && 0 !== u.h) {
              var c = n.getElement(t, u, r, i, a);
              if (null != c) {
                var d = s(l, t);
                if (0 === d) return;
                var h,
                  p,
                  f,
                  g,
                  v,
                  y,
                  m = o(l, t),
                  b = u.x1,
                  x = u.y1,
                  w = u.w,
                  E = u.h;
                if (0 !== m) {
                  var C = n.getRotationPoint(t);
                  (f = C.x),
                    (g = C.y),
                    e.translate(f, g),
                    e.rotate(m),
                    (v = l.getImgSmoothing(e)) || l.setImgSmoothing(e, !0);
                  var k = n.getRotationOffset(t);
                  (h = k.x), (p = k.y);
                } else (h = b), (p = x);
                1 !== d && ((y = e.globalAlpha), (e.globalAlpha = y * d)),
                  e.drawImage(
                    c.texture.canvas,
                    c.x,
                    0,
                    c.width,
                    c.height,
                    h,
                    p,
                    w,
                    E
                  ),
                  1 !== d && (e.globalAlpha = y),
                  0 !== m &&
                    (e.rotate(-m),
                    e.translate(-f, -g),
                    v || l.setImgSmoothing(e, !1));
              } else n.drawElement(e, t);
            }
          },
        },
        nu = function () {
          return 0;
        },
        ru = function (e, t) {
          return e.getTextAngle(t, null);
        },
        iu = function (e, t) {
          return e.getTextAngle(t, "source");
        },
        au = function (e, t) {
          return e.getTextAngle(t, "target");
        },
        ou = function (e, t) {
          return t.effectiveOpacity();
        },
        su = function (e, t) {
          return t.pstyle("text-opacity").pfValue * t.effectiveOpacity();
        };
      (tu.drawCachedElement = function (e, t, n, r, i, a) {
        var o = this,
          s = o.data,
          l = s.eleTxrCache,
          u = s.lblTxrCache,
          c = s.slbTxrCache,
          d = s.tlbTxrCache,
          h = t.boundingBox(),
          p = !0 === a ? l.reasons.highQuality : null;
        if (0 !== h.w && 0 !== h.h && t.visible() && (!r || Ft(h, r))) {
          var f = t.isEdge(),
            g = t.element()._private.rscratch.badLine;
          o.drawElementUnderlay(e, t),
            o.drawCachedElementPortion(e, t, l, n, i, p, nu, ou),
            (f && g) || o.drawCachedElementPortion(e, t, u, n, i, p, ru, su),
            f &&
              !g &&
              (o.drawCachedElementPortion(e, t, c, n, i, p, iu, su),
              o.drawCachedElementPortion(e, t, d, n, i, p, au, su)),
            o.drawElementOverlay(e, t);
        }
      }),
        (tu.drawElements = function (e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            this.drawElement(e, r);
          }
        }),
        (tu.drawCachedElements = function (e, t, n, r) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            this.drawCachedElement(e, a, n, r);
          }
        }),
        (tu.drawCachedNodes = function (e, t, n, r) {
          for (var i = 0; i < t.length; i++) {
            var a = t[i];
            a.isNode() && this.drawCachedElement(e, a, n, r);
          }
        }),
        (tu.drawLayeredElements = function (e, t, n, r) {
          var i = this.data.lyrTxrCache.getLayers(t, n);
          if (i)
            for (var a = 0; a < i.length; a++) {
              var o = i[a],
                s = o.bb;
              0 !== s.w &&
                0 !== s.h &&
                e.drawImage(o.canvas, s.x1, s.y1, s.w, s.h);
            }
          else this.drawCachedElements(e, t, n, r);
        });
      var lu = {
          drawEdge: function (e, t, n) {
            var r =
                !(arguments.length > 3 && void 0 !== arguments[3]) ||
                arguments[3],
              i =
                !(arguments.length > 4 && void 0 !== arguments[4]) ||
                arguments[4],
              a =
                !(arguments.length > 5 && void 0 !== arguments[5]) ||
                arguments[5],
              o = this,
              s = t._private.rscratch;
            if (
              (!a || t.visible()) &&
              !s.badLine &&
              null != s.allpts &&
              !isNaN(s.allpts[0])
            ) {
              var l;
              n && ((l = n), e.translate(-l.x1, -l.y1));
              var u = a ? t.pstyle("opacity").value : 1,
                c = a ? t.pstyle("line-opacity").value : 1,
                d = t.pstyle("curve-style").value,
                h = t.pstyle("line-style").value,
                p = t.pstyle("width").pfValue,
                f = t.pstyle("line-cap").value,
                g = u * c,
                v = u * c,
                y = function () {
                  var n =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : g;
                  "straight-triangle" === d
                    ? (o.eleStrokeStyle(e, t, n),
                      o.drawEdgeTrianglePath(t, e, s.allpts))
                    : ((e.lineWidth = p),
                      (e.lineCap = f),
                      o.eleStrokeStyle(e, t, n),
                      o.drawEdgePath(t, e, s.allpts, h),
                      (e.lineCap = "butt"));
                },
                m = function () {
                  var n =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : v;
                  o.drawArrowheads(e, t, n);
                };
              if (((e.lineJoin = "round"), "yes" === t.pstyle("ghost").value)) {
                var b = t.pstyle("ghost-offset-x").pfValue,
                  x = t.pstyle("ghost-offset-y").pfValue,
                  w = t.pstyle("ghost-opacity").value,
                  E = g * w;
                e.translate(b, x), y(E), m(E), e.translate(-b, -x);
              }
              i && o.drawEdgeUnderlay(e, t),
                y(),
                m(),
                i && o.drawEdgeOverlay(e, t),
                o.drawElementText(e, t, null, r),
                n && e.translate(l.x1, l.y1);
            }
          },
        },
        uu = function (e) {
          if (!["overlay", "underlay"].includes(e))
            throw new Error("Invalid state");
          return function (t, n) {
            if (n.visible()) {
              var r = n.pstyle("".concat(e, "-opacity")).value;
              if (0 !== r) {
                var i = this,
                  a = i.usePaths(),
                  o = n._private.rscratch,
                  s = 2 * n.pstyle("".concat(e, "-padding")).pfValue,
                  l = n.pstyle("".concat(e, "-color")).value;
                (t.lineWidth = s),
                  "self" !== o.edgeType || a
                    ? (t.lineCap = "round")
                    : (t.lineCap = "butt"),
                  i.colorStrokeStyle(t, l[0], l[1], l[2], r),
                  i.drawEdgePath(n, t, o.allpts, "solid");
              }
            }
          };
        };
      (lu.drawEdgeOverlay = uu("overlay")),
        (lu.drawEdgeUnderlay = uu("underlay")),
        (lu.drawEdgePath = function (e, t, n, r) {
          var i,
            a = e._private.rscratch,
            o = t,
            s = !1,
            l = this.usePaths(),
            c = e.pstyle("line-dash-pattern").pfValue,
            d = e.pstyle("line-dash-offset").pfValue;
          if (l) {
            var h = n.join("$");
            a.pathCacheKey && a.pathCacheKey === h
              ? ((i = t = a.pathCache), (s = !0))
              : ((i = t = new Path2D()),
                (a.pathCacheKey = h),
                (a.pathCache = i));
          }
          if (o.setLineDash)
            switch (r) {
              case "dotted":
                o.setLineDash([1, 1]);
                break;
              case "dashed":
                o.setLineDash(c), (o.lineDashOffset = d);
                break;
              case "solid":
                o.setLineDash([]);
            }
          if (!s && !a.badLine)
            switch (
              (t.beginPath && t.beginPath(), t.moveTo(n[0], n[1]), a.edgeType)
            ) {
              case "bezier":
              case "self":
              case "compound":
              case "multibezier":
                for (var p = 2; p + 3 < n.length; p += 4)
                  t.quadraticCurveTo(n[p], n[p + 1], n[p + 2], n[p + 3]);
                break;
              case "straight":
              case "haystack":
                for (var f = 2; f + 1 < n.length; f += 2)
                  t.lineTo(n[f], n[f + 1]);
                break;
              case "segments":
                if (a.isRound) {
                  var g,
                    v = (function (e, t) {
                      var n =
                        ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                        e["@@iterator"];
                      if (!n) {
                        if (Array.isArray(e) || (n = u(e))) {
                          n && (e = n);
                          var r = 0,
                            i = function () {};
                          return {
                            s: i,
                            n: function () {
                              return r >= e.length
                                ? { done: !0 }
                                : { done: !1, value: e[r++] };
                            },
                            e: function (e) {
                              throw e;
                            },
                            f: i,
                          };
                        }
                        throw new TypeError(
                          "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                        );
                      }
                      var a,
                        o = !0,
                        s = !1;
                      return {
                        s: function () {
                          n = n.call(e);
                        },
                        n: function () {
                          var e = n.next();
                          return (o = e.done), e;
                        },
                        e: function (e) {
                          (s = !0), (a = e);
                        },
                        f: function () {
                          try {
                            o || null == n.return || n.return();
                          } finally {
                            if (s) throw a;
                          }
                        },
                      };
                    })(a.roundCorners);
                  try {
                    for (v.s(); !(g = v.n()).done; ) vl(t, g.value);
                  } catch (e) {
                    v.e(e);
                  } finally {
                    v.f();
                  }
                  t.lineTo(n[n.length - 2], n[n.length - 1]);
                } else
                  for (var y = 2; y + 1 < n.length; y += 2)
                    t.lineTo(n[y], n[y + 1]);
            }
          (t = o),
            l ? t.stroke(i) : t.stroke(),
            t.setLineDash && t.setLineDash([]);
        }),
        (lu.drawEdgeTrianglePath = function (e, t, n) {
          t.fillStyle = t.strokeStyle;
          for (
            var r = e.pstyle("width").pfValue, i = 0;
            i + 1 < n.length;
            i += 2
          ) {
            var a = [n[i + 2] - n[i], n[i + 3] - n[i + 1]],
              o = Math.sqrt(a[0] * a[0] + a[1] * a[1]),
              s = [a[1] / o, -a[0] / o],
              l = [(s[0] * r) / 2, (s[1] * r) / 2];
            t.beginPath(),
              t.moveTo(n[i] - l[0], n[i + 1] - l[1]),
              t.lineTo(n[i] + l[0], n[i + 1] + l[1]),
              t.lineTo(n[i + 2], n[i + 3]),
              t.closePath(),
              t.fill();
          }
        }),
        (lu.drawArrowheads = function (e, t, n) {
          var r = t._private.rscratch,
            i = "haystack" === r.edgeType;
          i ||
            this.drawArrowhead(
              e,
              t,
              "source",
              r.arrowStartX,
              r.arrowStartY,
              r.srcArrowAngle,
              n
            ),
            this.drawArrowhead(
              e,
              t,
              "mid-target",
              r.midX,
              r.midY,
              r.midtgtArrowAngle,
              n
            ),
            this.drawArrowhead(
              e,
              t,
              "mid-source",
              r.midX,
              r.midY,
              r.midsrcArrowAngle,
              n
            ),
            i ||
              this.drawArrowhead(
                e,
                t,
                "target",
                r.arrowEndX,
                r.arrowEndY,
                r.tgtArrowAngle,
                n
              );
        }),
        (lu.drawArrowhead = function (e, t, n, r, i, a, o) {
          if (
            !(
              isNaN(r) ||
              null == r ||
              isNaN(i) ||
              null == i ||
              isNaN(a) ||
              null == a
            )
          ) {
            var s = this,
              l = t.pstyle(n + "-arrow-shape").value;
            if ("none" !== l) {
              var u =
                  "hollow" === t.pstyle(n + "-arrow-fill").value
                    ? "both"
                    : "filled",
                c = t.pstyle(n + "-arrow-fill").value,
                d = t.pstyle("width").pfValue,
                h = t.pstyle(n + "-arrow-width"),
                p = "match-line" === h.value ? d : h.pfValue;
              "%" === h.units && (p *= d);
              var f = t.pstyle("opacity").value;
              void 0 === o && (o = f);
              var g = e.globalCompositeOperation;
              (1 === o && "hollow" !== c) ||
                ((e.globalCompositeOperation = "destination-out"),
                s.colorFillStyle(e, 255, 255, 255, 1),
                s.colorStrokeStyle(e, 255, 255, 255, 1),
                s.drawArrowShape(t, e, u, d, l, p, r, i, a),
                (e.globalCompositeOperation = g));
              var v = t.pstyle(n + "-arrow-color").value;
              s.colorFillStyle(e, v[0], v[1], v[2], o),
                s.colorStrokeStyle(e, v[0], v[1], v[2], o),
                s.drawArrowShape(t, e, c, d, l, p, r, i, a);
            }
          }
        }),
        (lu.drawArrowShape = function (e, t, n, r, i, a, o, s, l) {
          var u,
            c = this,
            d = this.usePaths() && "triangle-cross" !== i,
            h = !1,
            p = t,
            f = { x: o, y: s },
            g = e.pstyle("arrow-scale").value,
            v = this.getArrowWidth(r, g),
            y = c.arrowShapes[i];
          if (d) {
            var m = (c.arrowPathCache = c.arrowPathCache || []),
              b = Me(i),
              x = m[b];
            null != x
              ? ((u = t = x), (h = !0))
              : ((u = t = new Path2D()), (m[b] = u));
          }
          h ||
            (t.beginPath && t.beginPath(),
            d ? y.draw(t, 1, 0, { x: 0, y: 0 }, 1) : y.draw(t, v, l, f, r),
            t.closePath && t.closePath()),
            (t = p),
            d && (t.translate(o, s), t.rotate(l), t.scale(v, v)),
            ("filled" !== n && "both" !== n) || (d ? t.fill(u) : t.fill()),
            ("hollow" !== n && "both" !== n) ||
              ((t.lineWidth = a / (d ? v : 1)),
              (t.lineJoin = "miter"),
              d ? t.stroke(u) : t.stroke()),
            d && (t.scale(1 / v, 1 / v), t.rotate(-l), t.translate(-o, -s));
        });
      var cu = {
          safeDrawImage: function (e, t, n, r, i, a, o, s, l, u) {
            if (!(i <= 0 || a <= 0 || l <= 0 || u <= 0))
              try {
                e.drawImage(t, n, r, i, a, o, s, l, u);
              } catch (e) {
                Ye(e);
              }
          },
          drawInscribedImage: function (e, t, n, r, i) {
            var a = this,
              o = n.position(),
              s = o.x,
              l = o.y,
              u = n.cy().style(),
              c = u.getIndexedStyle.bind(u),
              d = c(n, "background-fit", "value", r),
              h = c(n, "background-repeat", "value", r),
              p = n.width(),
              f = n.height(),
              g = 2 * n.padding(),
              v =
                p +
                ("inner" === c(n, "background-width-relative-to", "value", r)
                  ? 0
                  : g),
              y =
                f +
                ("inner" === c(n, "background-height-relative-to", "value", r)
                  ? 0
                  : g),
              m = n._private.rscratch,
              b = "node" === c(n, "background-clip", "value", r),
              x = c(n, "background-image-opacity", "value", r) * i,
              w = c(n, "background-image-smoothing", "value", r),
              E = n.pstyle("corner-radius").value;
            "auto" !== E && (E = n.pstyle("corner-radius").pfValue);
            var C = t.width || t.cachedW,
              k = t.height || t.cachedH;
            (null != C && null != k) ||
              (document.body.appendChild(t),
              (C = t.cachedW = t.width || t.offsetWidth),
              (k = t.cachedH = t.height || t.offsetHeight),
              document.body.removeChild(t));
            var T = C,
              S = k;
            if (
              ("auto" !== c(n, "background-width", "value", r) &&
                (T =
                  "%" === c(n, "background-width", "units", r)
                    ? c(n, "background-width", "pfValue", r) * v
                    : c(n, "background-width", "pfValue", r)),
              "auto" !== c(n, "background-height", "value", r) &&
                (S =
                  "%" === c(n, "background-height", "units", r)
                    ? c(n, "background-height", "pfValue", r) * y
                    : c(n, "background-height", "pfValue", r)),
              0 !== T && 0 !== S)
            ) {
              if ("contain" === d) (T *= P = Math.min(v / T, y / S)), (S *= P);
              else if ("cover" === d) {
                var P;
                (T *= P = Math.max(v / T, y / S)), (S *= P);
              }
              var D = s - v / 2,
                _ = c(n, "background-position-x", "units", r),
                M = c(n, "background-position-x", "pfValue", r);
              D += "%" === _ ? (v - T) * M : M;
              var N = c(n, "background-offset-x", "units", r),
                I = c(n, "background-offset-x", "pfValue", r);
              D += "%" === N ? (v - T) * I : I;
              var B = l - y / 2,
                A = c(n, "background-position-y", "units", r),
                L = c(n, "background-position-y", "pfValue", r);
              B += "%" === A ? (y - S) * L : L;
              var O = c(n, "background-offset-y", "units", r),
                R = c(n, "background-offset-y", "pfValue", r);
              (B += "%" === O ? (y - S) * R : R),
                m.pathCache && ((D -= s), (B -= l), (s = 0), (l = 0));
              var z = e.globalAlpha;
              e.globalAlpha = x;
              var F = a.getImgSmoothing(e),
                V = !1;
              if (
                ("no" === w && F
                  ? (a.setImgSmoothing(e, !1), (V = !0))
                  : "yes" !== w || F || (a.setImgSmoothing(e, !0), (V = !0)),
                "no-repeat" === h)
              )
                b &&
                  (e.save(),
                  m.pathCache
                    ? e.clip(m.pathCache)
                    : (a.nodeShapes[a.getNodeShape(n)].draw(
                        e,
                        s,
                        l,
                        v,
                        y,
                        E,
                        m
                      ),
                      e.clip())),
                  a.safeDrawImage(e, t, 0, 0, C, k, D, B, T, S),
                  b && e.restore();
              else {
                var q = e.createPattern(t, h);
                (e.fillStyle = q),
                  a.nodeShapes[a.getNodeShape(n)].draw(e, s, l, v, y, E, m),
                  e.translate(D, B),
                  e.fill(),
                  e.translate(-D, -B);
              }
              (e.globalAlpha = z), V && a.setImgSmoothing(e, F);
            }
          },
        },
        du = {};
      function hu(e, t, n, r, i) {
        var a =
            arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 5,
          o = arguments.length > 6 ? arguments[6] : void 0;
        e.beginPath(),
          e.moveTo(t + a, n),
          e.lineTo(t + r - a, n),
          e.quadraticCurveTo(t + r, n, t + r, n + a),
          e.lineTo(t + r, n + i - a),
          e.quadraticCurveTo(t + r, n + i, t + r - a, n + i),
          e.lineTo(t + a, n + i),
          e.quadraticCurveTo(t, n + i, t, n + i - a),
          e.lineTo(t, n + a),
          e.quadraticCurveTo(t, n, t + a, n),
          e.closePath(),
          o ? e.stroke() : e.fill();
      }
      (du.eleTextBiggerThanMin = function (e, t) {
        if (!t) {
          var n = e.cy().zoom(),
            r = this.getPixelRatio(),
            i = Math.ceil(Tt(n * r));
          t = Math.pow(2, i);
        }
        return !(
          e.pstyle("font-size").pfValue * t <
          e.pstyle("min-zoomed-font-size").pfValue
        );
      }),
        (du.drawElementText = function (e, t, n, r, i) {
          var a =
              !(arguments.length > 5 && void 0 !== arguments[5]) ||
              arguments[5],
            o = this;
          if (null == r) {
            if (a && !o.eleTextBiggerThanMin(t)) return;
          } else if (!1 === r) return;
          if (t.isNode()) {
            var s = t.pstyle("label");
            if (!s || !s.value) return;
            var l = o.getLabelJustification(t);
            (e.textAlign = l), (e.textBaseline = "bottom");
          } else {
            var u = t.element()._private.rscratch.badLine,
              c = t.pstyle("label"),
              d = t.pstyle("source-label"),
              h = t.pstyle("target-label");
            if (u || ((!c || !c.value) && (!d || !d.value) && (!h || !h.value)))
              return;
            (e.textAlign = "center"), (e.textBaseline = "bottom");
          }
          var p,
            f = !n;
          n && ((p = n), e.translate(-p.x1, -p.y1)),
            null == i
              ? (o.drawText(e, t, null, f, a),
                t.isEdge() &&
                  (o.drawText(e, t, "source", f, a),
                  o.drawText(e, t, "target", f, a)))
              : o.drawText(e, t, i, f, a),
            n && e.translate(p.x1, p.y1);
        }),
        (du.getFontCache = function (e) {
          var t;
          this.fontCaches = this.fontCaches || [];
          for (var n = 0; n < this.fontCaches.length; n++)
            if ((t = this.fontCaches[n]).context === e) return t;
          return (t = { context: e }), this.fontCaches.push(t), t;
        }),
        (du.setupTextStyle = function (e, t) {
          var n =
              !(arguments.length > 2 && void 0 !== arguments[2]) ||
              arguments[2],
            r = t.pstyle("font-style").strValue,
            i = t.pstyle("font-size").pfValue + "px",
            a = t.pstyle("font-family").strValue,
            o = t.pstyle("font-weight").strValue,
            s = n ? t.effectiveOpacity() * t.pstyle("text-opacity").value : 1,
            l = t.pstyle("text-outline-opacity").value * s,
            u = t.pstyle("color").value,
            c = t.pstyle("text-outline-color").value;
          (e.font = r + " " + o + " " + i + " " + a),
            (e.lineJoin = "round"),
            this.colorFillStyle(e, u[0], u[1], u[2], s),
            this.colorStrokeStyle(e, c[0], c[1], c[2], l);
        }),
        (du.getTextAngle = function (e, t) {
          var n = e._private.rscratch,
            r = t ? t + "-" : "",
            i = e.pstyle(r + "text-rotation"),
            a = $e(n, "labelAngle", t);
          return "autorotate" === i.strValue
            ? e.isEdge()
              ? a
              : 0
            : "none" === i.strValue
            ? 0
            : i.pfValue;
        }),
        (du.drawText = function (e, t, n) {
          var r =
              !(arguments.length > 3 && void 0 !== arguments[3]) ||
              arguments[3],
            i =
              !(arguments.length > 4 && void 0 !== arguments[4]) ||
              arguments[4],
            a = t._private.rscratch,
            o = i ? t.effectiveOpacity() : 1;
          if (!i || (0 !== o && 0 !== t.pstyle("text-opacity").value)) {
            "main" === n && (n = null);
            var s,
              l,
              u = $e(a, "labelX", n),
              c = $e(a, "labelY", n),
              d = this.getLabelText(t, n);
            if (null != d && "" !== d && !isNaN(u) && !isNaN(c)) {
              this.setupTextStyle(e, t, i);
              var h,
                p = n ? n + "-" : "",
                f = $e(a, "labelWidth", n),
                g = $e(a, "labelHeight", n),
                v = t.pstyle(p + "text-margin-x").pfValue,
                y = t.pstyle(p + "text-margin-y").pfValue,
                m = t.isEdge(),
                b = t.pstyle("text-halign").value,
                x = t.pstyle("text-valign").value;
              switch (
                (m && ((b = "center"), (x = "center")),
                (u += v),
                (c += y),
                0 !== (h = r ? this.getTextAngle(t, n) : 0) &&
                  ((s = u),
                  (l = c),
                  e.translate(s, l),
                  e.rotate(h),
                  (u = 0),
                  (c = 0)),
                x)
              ) {
                case "top":
                  break;
                case "center":
                  c += g / 2;
                  break;
                case "bottom":
                  c += g;
              }
              var w = t.pstyle("text-background-opacity").value,
                E = t.pstyle("text-border-opacity").value,
                C = t.pstyle("text-border-width").pfValue,
                k = t.pstyle("text-background-padding").pfValue,
                T =
                  0 ===
                  t.pstyle("text-background-shape").strValue.indexOf("round");
              if (w > 0 || (C > 0 && E > 0)) {
                var S = u - k;
                switch (b) {
                  case "left":
                    S -= f;
                    break;
                  case "center":
                    S -= f / 2;
                }
                var P = c - g - k,
                  D = f + 2 * k,
                  _ = g + 2 * k;
                if (w > 0) {
                  var M = e.fillStyle,
                    N = t.pstyle("text-background-color").value;
                  (e.fillStyle =
                    "rgba(" +
                    N[0] +
                    "," +
                    N[1] +
                    "," +
                    N[2] +
                    "," +
                    w * o +
                    ")"),
                    T ? hu(e, S, P, D, _, 2) : e.fillRect(S, P, D, _),
                    (e.fillStyle = M);
                }
                if (C > 0 && E > 0) {
                  var I = e.strokeStyle,
                    B = e.lineWidth,
                    A = t.pstyle("text-border-color").value,
                    L = t.pstyle("text-border-style").value;
                  if (
                    ((e.strokeStyle =
                      "rgba(" +
                      A[0] +
                      "," +
                      A[1] +
                      "," +
                      A[2] +
                      "," +
                      E * o +
                      ")"),
                    (e.lineWidth = C),
                    e.setLineDash)
                  )
                    switch (L) {
                      case "dotted":
                        e.setLineDash([1, 1]);
                        break;
                      case "dashed":
                        e.setLineDash([4, 2]);
                        break;
                      case "double":
                        (e.lineWidth = C / 4), e.setLineDash([]);
                        break;
                      case "solid":
                        e.setLineDash([]);
                    }
                  if (
                    (T
                      ? hu(e, S, P, D, _, 2, "stroke")
                      : e.strokeRect(S, P, D, _),
                    "double" === L)
                  ) {
                    var O = C / 2;
                    T
                      ? hu(e, S + O, P + O, D - 2 * O, _ - 2 * O, 2, "stroke")
                      : e.strokeRect(S + O, P + O, D - 2 * O, _ - 2 * O);
                  }
                  e.setLineDash && e.setLineDash([]),
                    (e.lineWidth = B),
                    (e.strokeStyle = I);
                }
              }
              var R = 2 * t.pstyle("text-outline-width").pfValue;
              if (
                (R > 0 && (e.lineWidth = R),
                "wrap" === t.pstyle("text-wrap").value)
              ) {
                var z = $e(a, "labelWrapCachedLines", n),
                  F = $e(a, "labelLineHeight", n),
                  V = f / 2,
                  q = this.getLabelJustification(t);
                switch (
                  ("auto" === q ||
                    ("left" === b
                      ? "left" === q
                        ? (u += -f)
                        : "center" === q && (u += -V)
                      : "center" === b
                      ? "left" === q
                        ? (u += -V)
                        : "right" === q && (u += V)
                      : "right" === b &&
                        ("center" === q
                          ? (u += V)
                          : "right" === q && (u += f))),
                  x)
                ) {
                  case "top":
                  case "center":
                  case "bottom":
                    c -= (z.length - 1) * F;
                }
                for (var j = 0; j < z.length; j++)
                  R > 0 && e.strokeText(z[j], u, c),
                    e.fillText(z[j], u, c),
                    (c += F);
              } else R > 0 && e.strokeText(d, u, c), e.fillText(d, u, c);
              0 !== h && (e.rotate(-h), e.translate(-s, -l));
            }
          }
        });
      var pu = {
          drawNode: function (e, t, n) {
            var r,
              i,
              a =
                !(arguments.length > 3 && void 0 !== arguments[3]) ||
                arguments[3],
              o =
                !(arguments.length > 4 && void 0 !== arguments[4]) ||
                arguments[4],
              s =
                !(arguments.length > 5 && void 0 !== arguments[5]) ||
                arguments[5],
              l = this,
              u = t._private,
              c = u.rscratch,
              d = t.position();
            if (E(d.x) && E(d.y) && (!s || t.visible())) {
              var h,
                p,
                f = s ? t.effectiveOpacity() : 1,
                g = l.usePaths(),
                v = !1,
                y = t.padding();
              (r = t.width() + 2 * y),
                (i = t.height() + 2 * y),
                n && ((p = n), e.translate(-p.x1, -p.y1));
              for (
                var m = t.pstyle("background-image").value,
                  b = new Array(m.length),
                  x = new Array(m.length),
                  w = 0,
                  C = 0;
                C < m.length;
                C++
              ) {
                var k = m[C];
                if ((b[C] = null != k && "none" !== k)) {
                  var T = t
                    .cy()
                    .style()
                    .getIndexedStyle(
                      t,
                      "background-image-crossorigin",
                      "value",
                      C
                    );
                  w++,
                    (x[C] = l.getCachedImage(k, T, function () {
                      (u.backgroundTimestamp = Date.now()),
                        t.emitAndNotify("background");
                    }));
                }
              }
              var S = t.pstyle("background-blacken").value,
                P = t.pstyle("border-width").pfValue,
                D = t.pstyle("background-opacity").value * f,
                _ = t.pstyle("border-color").value,
                M = t.pstyle("border-style").value,
                N = t.pstyle("border-join").value,
                I = t.pstyle("border-cap").value,
                B = t.pstyle("border-position").value,
                A = t.pstyle("border-dash-pattern").pfValue,
                L = t.pstyle("border-dash-offset").pfValue,
                O = t.pstyle("border-opacity").value * f,
                R = t.pstyle("outline-width").pfValue,
                z = t.pstyle("outline-color").value,
                F = t.pstyle("outline-style").value,
                V = t.pstyle("outline-opacity").value * f,
                q = t.pstyle("outline-offset").value,
                j = t.pstyle("corner-radius").value;
              "auto" !== j && (j = t.pstyle("corner-radius").pfValue);
              var Y = function () {
                  var n =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : D;
                  l.eleFillStyle(e, t, n);
                },
                X = function () {
                  var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : O;
                  l.colorStrokeStyle(e, _[0], _[1], _[2], t);
                },
                W = function () {
                  var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : V;
                  l.colorStrokeStyle(e, z[0], z[1], z[2], t);
                },
                H = function (e, t, n, r) {
                  var i,
                    a = (l.nodePathCache = l.nodePathCache || []),
                    o = Ne(
                      "polygon" === n ? n + "," + r.join(",") : n,
                      "" + t,
                      "" + e,
                      "" + j
                    ),
                    s = a[o],
                    u = !1;
                  return (
                    null != s
                      ? ((i = s), (u = !0), (c.pathCache = i))
                      : ((i = new Path2D()), (a[o] = c.pathCache = i)),
                    { path: i, cacheHit: u }
                  );
                },
                G = t.pstyle("shape").strValue,
                U = t.pstyle("shape-polygon-points").pfValue;
              if (g) {
                e.translate(d.x, d.y);
                var K = H(r, i, G, U);
                (h = K.path), (v = K.cacheHit);
              }
              var Z = function () {
                  if (!v) {
                    var n = d;
                    g && (n = { x: 0, y: 0 }),
                      l.nodeShapes[l.getNodeShape(t)].draw(
                        h || e,
                        n.x,
                        n.y,
                        r,
                        i,
                        j,
                        c
                      );
                  }
                  g ? e.fill(h) : e.fill();
                },
                $ = function () {
                  for (
                    var n =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : f,
                      r =
                        !(arguments.length > 1 && void 0 !== arguments[1]) ||
                        arguments[1],
                      i = u.backgrounding,
                      a = 0,
                      o = 0;
                    o < x.length;
                    o++
                  ) {
                    var s = t
                      .cy()
                      .style()
                      .getIndexedStyle(
                        t,
                        "background-image-containment",
                        "value",
                        o
                      );
                    (r && "over" === s) || (!r && "inside" === s)
                      ? a++
                      : b[o] &&
                        x[o].complete &&
                        !x[o].error &&
                        (a++, l.drawInscribedImage(e, x[o], t, o, n));
                  }
                  (u.backgrounding = !(a === w)),
                    i !== u.backgrounding && t.updateStyle(!1);
                },
                Q = function () {
                  var n =
                      arguments.length > 0 &&
                      void 0 !== arguments[0] &&
                      arguments[0],
                    a =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : f;
                  l.hasPie(t) &&
                    (l.drawPie(e, t, a),
                    n &&
                      (g ||
                        l.nodeShapes[l.getNodeShape(t)].draw(
                          e,
                          d.x,
                          d.y,
                          r,
                          i,
                          j,
                          c
                        )));
                },
                J = function () {
                  var t =
                      (S > 0 ? S : -S) *
                      (arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : f),
                    n = S > 0 ? 0 : 255;
                  0 !== S &&
                    (l.colorFillStyle(e, n, n, n, t), g ? e.fill(h) : e.fill());
                },
                ee = function () {
                  if (P > 0) {
                    if (
                      ((e.lineWidth = P),
                      (e.lineCap = I),
                      (e.lineJoin = N),
                      e.setLineDash)
                    )
                      switch (M) {
                        case "dotted":
                          e.setLineDash([1, 1]);
                          break;
                        case "dashed":
                          e.setLineDash(A), (e.lineDashOffset = L);
                          break;
                        case "solid":
                        case "double":
                          e.setLineDash([]);
                      }
                    if ("center" !== B) {
                      if ((e.save(), (e.lineWidth *= 2), "inside" === B))
                        g ? e.clip(h) : e.clip();
                      else {
                        var t = new Path2D();
                        t.rect(-r / 2 - P, -i / 2 - P, r + 2 * P, i + 2 * P),
                          t.addPath(h),
                          e.clip(t, "evenodd");
                      }
                      g ? e.stroke(h) : e.stroke(), e.restore();
                    } else g ? e.stroke(h) : e.stroke();
                    if ("double" === M) {
                      e.lineWidth = P / 3;
                      var n = e.globalCompositeOperation;
                      (e.globalCompositeOperation = "destination-out"),
                        g ? e.stroke(h) : e.stroke(),
                        (e.globalCompositeOperation = n);
                    }
                    e.setLineDash && e.setLineDash([]);
                  }
                },
                te = function () {
                  if (R > 0) {
                    if (
                      ((e.lineWidth = R), (e.lineCap = "butt"), e.setLineDash)
                    )
                      switch (F) {
                        case "dotted":
                          e.setLineDash([1, 1]);
                          break;
                        case "dashed":
                          e.setLineDash([4, 2]);
                          break;
                        case "solid":
                        case "double":
                          e.setLineDash([]);
                      }
                    var n = d;
                    g && (n = { x: 0, y: 0 });
                    var a = l.getNodeShape(t),
                      o = P;
                    "inside" === B && (o = 0), "outside" === B && (o *= 2);
                    var s,
                      u = (r + o + (R + q)) / r,
                      c = (i + o + (R + q)) / i,
                      h = r * u,
                      p = i * c,
                      f = l.nodeShapes[a].points;
                    if ((g && (s = H(h, p, a, f).path), "ellipse" === a))
                      l.drawEllipsePath(s || e, n.x, n.y, h, p);
                    else if (
                      [
                        "round-diamond",
                        "round-heptagon",
                        "round-hexagon",
                        "round-octagon",
                        "round-pentagon",
                        "round-polygon",
                        "round-triangle",
                        "round-tag",
                      ].includes(a)
                    ) {
                      var v = 0,
                        y = 0,
                        m = 0;
                      "round-diamond" === a
                        ? (v = 1.4 * (o + q + R))
                        : "round-heptagon" === a
                        ? ((v = 1.075 * (o + q + R)),
                          (m = -(o / 2 + q + R) / 35))
                        : "round-hexagon" === a
                        ? (v = 1.12 * (o + q + R))
                        : "round-pentagon" === a
                        ? ((v = 1.13 * (o + q + R)),
                          (m = -(o / 2 + q + R) / 15))
                        : "round-tag" === a
                        ? ((v = 1.12 * (o + q + R)),
                          (y = 0.07 * (o / 2 + R + q)))
                        : "round-triangle" === a &&
                          ((v = (o + q + R) * (Math.PI / 2)),
                          (m = -(o + q / 2 + R) / Math.PI)),
                        0 !== v &&
                          ((h = r * (u = (r + v) / r)),
                          ["round-hexagon", "round-tag"].includes(a) ||
                            (p = i * (c = (i + v) / i)));
                      for (
                        var b = h / 2,
                          x = p / 2,
                          w =
                            (j = "auto" === j ? ln(h, p) : j) + (o + R + q) / 2,
                          E = new Array(f.length / 2),
                          C = new Array(f.length / 2),
                          k = 0;
                        k < f.length / 2;
                        k++
                      )
                        E[k] = {
                          x: n.x + y + b * f[2 * k],
                          y: n.y + m + x * f[2 * k + 1],
                        };
                      var T,
                        S,
                        D,
                        _,
                        M = E.length;
                      for (S = E[M - 1], T = 0; T < M; T++)
                        (D = E[T % M]),
                          (_ = E[(T + 1) % M]),
                          (C[T] = yl(S, D, _, w)),
                          (S = D),
                          (D = _);
                      l.drawRoundPolygonPath(
                        s || e,
                        n.x + y,
                        n.y + m,
                        r * u,
                        i * c,
                        f,
                        C
                      );
                    } else
                      ["roundrectangle", "round-rectangle"].includes(a)
                        ? ((j = "auto" === j ? sn(h, p) : j),
                          l.drawRoundRectanglePath(
                            s || e,
                            n.x,
                            n.y,
                            h,
                            p,
                            j + (o + R + q) / 2
                          ))
                        : ["cutrectangle", "cut-rectangle"].includes(a)
                        ? ((j = "auto" === j ? 8 : j),
                          l.drawCutRectanglePath(
                            s || e,
                            n.x,
                            n.y,
                            h,
                            p,
                            null,
                            j + (o + R + q) / 4
                          ))
                        : [
                            "bottomroundrectangle",
                            "bottom-round-rectangle",
                          ].includes(a)
                        ? ((j = "auto" === j ? sn(h, p) : j),
                          l.drawBottomRoundRectanglePath(
                            s || e,
                            n.x,
                            n.y,
                            h,
                            p,
                            j + (o + R + q) / 2
                          ))
                        : "barrel" === a
                        ? l.drawBarrelPath(s || e, n.x, n.y, h, p)
                        : a.startsWith("polygon") ||
                          [
                            "rhomboid",
                            "right-rhomboid",
                            "round-tag",
                            "tag",
                            "vee",
                          ].includes(a)
                        ? ((f = Kt(Zt(f, (o + R + q) / r))),
                          l.drawPolygonPath(s || e, n.x, n.y, r, i, f))
                        : ((f = Kt(Zt(f, -(o + R + q) / r))),
                          l.drawPolygonPath(s || e, n.x, n.y, r, i, f));
                    if ((g ? e.stroke(s) : e.stroke(), "double" === F)) {
                      e.lineWidth = o / 3;
                      var N = e.globalCompositeOperation;
                      (e.globalCompositeOperation = "destination-out"),
                        g ? e.stroke(s) : e.stroke(),
                        (e.globalCompositeOperation = N);
                    }
                    e.setLineDash && e.setLineDash([]);
                  }
                };
              if ("yes" === t.pstyle("ghost").value) {
                var ne = t.pstyle("ghost-offset-x").pfValue,
                  re = t.pstyle("ghost-offset-y").pfValue,
                  ie = t.pstyle("ghost-opacity").value,
                  ae = ie * f;
                e.translate(ne, re),
                  W(),
                  te(),
                  Y(ie * D),
                  Z(),
                  $(ae, !0),
                  X(ie * O),
                  ee(),
                  Q(0 !== S || 0 !== P),
                  $(ae, !1),
                  J(ae),
                  e.translate(-ne, -re);
              }
              g && e.translate(-d.x, -d.y),
                o && l.drawNodeUnderlay(e, t, d, r, i),
                g && e.translate(d.x, d.y),
                W(),
                te(),
                Y(),
                Z(),
                $(f, !0),
                X(),
                ee(),
                Q(0 !== S || 0 !== P),
                $(f, !1),
                J(),
                g && e.translate(-d.x, -d.y),
                l.drawElementText(e, t, null, a),
                o && l.drawNodeOverlay(e, t, d, r, i),
                n && e.translate(p.x1, p.y1);
            }
          },
        },
        fu = function (e) {
          if (!["overlay", "underlay"].includes(e))
            throw new Error("Invalid state");
          return function (t, n, r, i, a) {
            if (n.visible()) {
              var o = n.pstyle("".concat(e, "-padding")).pfValue,
                s = n.pstyle("".concat(e, "-opacity")).value,
                l = n.pstyle("".concat(e, "-color")).value,
                u = n.pstyle("".concat(e, "-shape")).value,
                c = n.pstyle("".concat(e, "-corner-radius")).value;
              if (s > 0) {
                if (((r = r || n.position()), null == i || null == a)) {
                  var d = n.padding();
                  (i = n.width() + 2 * d), (a = n.height() + 2 * d);
                }
                this.colorFillStyle(t, l[0], l[1], l[2], s),
                  this.nodeShapes[u].draw(t, r.x, r.y, i + 2 * o, a + 2 * o, c),
                  t.fill();
              }
            }
          };
        };
      (pu.drawNodeOverlay = fu("overlay")),
        (pu.drawNodeUnderlay = fu("underlay")),
        (pu.hasPie = function (e) {
          return (e = e[0])._private.hasPie;
        }),
        (pu.drawPie = function (e, t, n, r) {
          (t = t[0]), (r = r || t.position());
          var i = t.cy().style(),
            a = t.pstyle("pie-size"),
            o = r.x,
            s = r.y,
            l = t.width(),
            u = t.height(),
            c = Math.min(l, u) / 2,
            d = 0;
          this.usePaths() && ((o = 0), (s = 0)),
            "%" === a.units
              ? (c *= a.pfValue)
              : void 0 !== a.pfValue && (c = a.pfValue / 2);
          for (var h = 1; h <= i.pieBackgroundN; h++) {
            var p = t.pstyle("pie-" + h + "-background-size").value,
              f = t.pstyle("pie-" + h + "-background-color").value,
              g = t.pstyle("pie-" + h + "-background-opacity").value * n,
              v = p / 100;
            v + d > 1 && (v = 1 - d);
            var y = 1.5 * Math.PI + 2 * Math.PI * d,
              m = y + 2 * Math.PI * v;
            0 === p ||
              d >= 1 ||
              d + v > 1 ||
              (e.beginPath(),
              e.moveTo(o, s),
              e.arc(o, s, c, y, m),
              e.closePath(),
              this.colorFillStyle(e, f[0], f[1], f[2], g),
              e.fill(),
              (d += v));
          }
        });
      for (
        var gu = {
            getPixelRatio: function () {
              var e = this.data.contexts[0];
              if (null != this.forcedPixelRatio) return this.forcedPixelRatio;
              var t =
                e.backingStorePixelRatio ||
                e.webkitBackingStorePixelRatio ||
                e.mozBackingStorePixelRatio ||
                e.msBackingStorePixelRatio ||
                e.oBackingStorePixelRatio ||
                e.backingStorePixelRatio ||
                1;
              return (window.devicePixelRatio || 1) / t;
            },
            paintCache: function (e) {
              for (
                var t,
                  n = (this.paintCaches = this.paintCaches || []),
                  r = !0,
                  i = 0;
                i < n.length;
                i++
              )
                if ((t = n[i]).context === e) {
                  r = !1;
                  break;
                }
              return r && ((t = { context: e }), n.push(t)), t;
            },
            createGradientStyleFor: function (e, t, n, r, i) {
              var a,
                o = this.usePaths(),
                s = n.pstyle(t + "-gradient-stop-colors").value,
                l = n.pstyle(t + "-gradient-stop-positions").pfValue;
              if ("radial-gradient" === r)
                if (n.isEdge()) {
                  var u = n.sourceEndpoint(),
                    c = n.targetEndpoint(),
                    d = n.midpoint(),
                    h = Pt(u, d),
                    p = Pt(c, d);
                  a = e.createRadialGradient(
                    d.x,
                    d.y,
                    0,
                    d.x,
                    d.y,
                    Math.max(h, p)
                  );
                } else {
                  var f = o ? { x: 0, y: 0 } : n.position(),
                    g = n.paddedWidth(),
                    v = n.paddedHeight();
                  a = e.createRadialGradient(
                    f.x,
                    f.y,
                    0,
                    f.x,
                    f.y,
                    Math.max(g, v)
                  );
                }
              else if (n.isEdge()) {
                var y = n.sourceEndpoint(),
                  m = n.targetEndpoint();
                a = e.createLinearGradient(y.x, y.y, m.x, m.y);
              } else {
                var b = o ? { x: 0, y: 0 } : n.position(),
                  x = n.paddedWidth() / 2,
                  w = n.paddedHeight() / 2;
                switch (n.pstyle("background-gradient-direction").value) {
                  case "to-bottom":
                    a = e.createLinearGradient(b.x, b.y - w, b.x, b.y + w);
                    break;
                  case "to-top":
                    a = e.createLinearGradient(b.x, b.y + w, b.x, b.y - w);
                    break;
                  case "to-left":
                    a = e.createLinearGradient(b.x + x, b.y, b.x - x, b.y);
                    break;
                  case "to-right":
                    a = e.createLinearGradient(b.x - x, b.y, b.x + x, b.y);
                    break;
                  case "to-bottom-right":
                  case "to-right-bottom":
                    a = e.createLinearGradient(
                      b.x - x,
                      b.y - w,
                      b.x + x,
                      b.y + w
                    );
                    break;
                  case "to-top-right":
                  case "to-right-top":
                    a = e.createLinearGradient(
                      b.x - x,
                      b.y + w,
                      b.x + x,
                      b.y - w
                    );
                    break;
                  case "to-bottom-left":
                  case "to-left-bottom":
                    a = e.createLinearGradient(
                      b.x + x,
                      b.y - w,
                      b.x - x,
                      b.y + w
                    );
                    break;
                  case "to-top-left":
                  case "to-left-top":
                    a = e.createLinearGradient(
                      b.x + x,
                      b.y + w,
                      b.x - x,
                      b.y - w
                    );
                }
              }
              if (!a) return null;
              for (
                var E = l.length === s.length, C = s.length, k = 0;
                k < C;
                k++
              )
                a.addColorStop(
                  E ? l[k] : k / (C - 1),
                  "rgba(" +
                    s[k][0] +
                    "," +
                    s[k][1] +
                    "," +
                    s[k][2] +
                    "," +
                    i +
                    ")"
                );
              return a;
            },
            gradientFillStyle: function (e, t, n, r) {
              var i = this.createGradientStyleFor(e, "background", t, n, r);
              if (!i) return null;
              e.fillStyle = i;
            },
            colorFillStyle: function (e, t, n, r, i) {
              e.fillStyle = "rgba(" + t + "," + n + "," + r + "," + i + ")";
            },
            eleFillStyle: function (e, t, n) {
              var r = t.pstyle("background-fill").value;
              if ("linear-gradient" === r || "radial-gradient" === r)
                this.gradientFillStyle(e, t, r, n);
              else {
                var i = t.pstyle("background-color").value;
                this.colorFillStyle(e, i[0], i[1], i[2], n);
              }
            },
            gradientStrokeStyle: function (e, t, n, r) {
              var i = this.createGradientStyleFor(e, "line", t, n, r);
              if (!i) return null;
              e.strokeStyle = i;
            },
            colorStrokeStyle: function (e, t, n, r, i) {
              e.strokeStyle = "rgba(" + t + "," + n + "," + r + "," + i + ")";
            },
            eleStrokeStyle: function (e, t, n) {
              var r = t.pstyle("line-fill").value;
              if ("linear-gradient" === r || "radial-gradient" === r)
                this.gradientStrokeStyle(e, t, r, n);
              else {
                var i = t.pstyle("line-color").value;
                this.colorStrokeStyle(e, i[0], i[1], i[2], n);
              }
            },
            matchCanvasSize: function (e) {
              var t = this,
                n = t.data,
                r = t.findContainerClientCoords(),
                i = r[2],
                a = r[3],
                o = t.getPixelRatio(),
                s = t.motionBlurPxRatio;
              (e !== t.data.bufferCanvases[t.MOTIONBLUR_BUFFER_NODE] &&
                e !== t.data.bufferCanvases[t.MOTIONBLUR_BUFFER_DRAG]) ||
                (o = s);
              var l,
                u = i * o,
                c = a * o;
              if (u !== t.canvasWidth || c !== t.canvasHeight) {
                t.fontCaches = null;
                var d = n.canvasContainer;
                (d.style.width = i + "px"), (d.style.height = a + "px");
                for (var h = 0; h < t.CANVAS_LAYERS; h++)
                  ((l = n.canvases[h]).width = u),
                    (l.height = c),
                    (l.style.width = i + "px"),
                    (l.style.height = a + "px");
                for (h = 0; h < t.BUFFER_COUNT; h++)
                  ((l = n.bufferCanvases[h]).width = u),
                    (l.height = c),
                    (l.style.width = i + "px"),
                    (l.style.height = a + "px");
                (t.textureMult = 1),
                  o <= 1 &&
                    ((l = n.bufferCanvases[t.TEXTURE_BUFFER]),
                    (t.textureMult = 2),
                    (l.width = u * t.textureMult),
                    (l.height = c * t.textureMult)),
                  (t.canvasWidth = u),
                  (t.canvasHeight = c);
              }
            },
            renderTo: function (e, t, n, r) {
              this.render({
                forcedContext: e,
                forcedZoom: t,
                forcedPan: n,
                drawAllLayers: !0,
                forcedPxRatio: r,
              });
            },
            render: function (e) {
              var t = (e = e || Ge()).forcedContext,
                n = e.drawAllLayers,
                r = e.drawOnlyNodeLayer,
                i = e.forcedZoom,
                a = e.forcedPan,
                o = this,
                s =
                  void 0 === e.forcedPxRatio
                    ? this.getPixelRatio()
                    : e.forcedPxRatio,
                l = o.cy,
                u = o.data,
                c = u.canvasNeedsRedraw,
                d =
                  o.textureOnViewport &&
                  !t &&
                  (o.pinching ||
                    o.hoverData.dragging ||
                    o.swipePanning ||
                    o.data.wheelZooming),
                h = void 0 !== e.motionBlur ? e.motionBlur : o.motionBlur,
                p = o.motionBlurPxRatio,
                f = l.hasCompoundNodes(),
                g = o.hoverData.draggingEles,
                v = !(!o.hoverData.selecting && !o.touchData.selecting),
                y = (h = h && !t && o.motionBlurEnabled && !v);
              t ||
                (o.prevPxRatio !== s &&
                  (o.invalidateContainerClientCoordsCache(),
                  o.matchCanvasSize(o.container),
                  o.redrawHint("eles", !0),
                  o.redrawHint("drag", !0)),
                (o.prevPxRatio = s)),
                !t && o.motionBlurTimeout && clearTimeout(o.motionBlurTimeout),
                h &&
                  (null == o.mbFrames && (o.mbFrames = 0),
                  o.mbFrames++,
                  o.mbFrames < 3 && (y = !1),
                  o.mbFrames > o.minMbLowQualFrames &&
                    (o.motionBlurPxRatio = o.mbPxRBlurry)),
                o.clearingMotionBlur && (o.motionBlurPxRatio = 1),
                o.textureDrawLastFrame &&
                  !d &&
                  ((c[o.NODE] = !0), (c[o.SELECT_BOX] = !0));
              var m = l.style(),
                b = l.zoom(),
                x = void 0 !== i ? i : b,
                w = l.pan(),
                E = { x: w.x, y: w.y },
                C = { zoom: b, pan: { x: w.x, y: w.y } },
                k = o.prevViewport;
              void 0 === k ||
                C.zoom !== k.zoom ||
                C.pan.x !== k.pan.x ||
                C.pan.y !== k.pan.y ||
                (g && !f) ||
                (o.motionBlurPxRatio = 1),
                a && (E = a),
                (x *= s),
                (E.x *= s),
                (E.y *= s);
              var T = o.getCachedZSortedEles();
              function S(e, t, n, r, i) {
                var a = e.globalCompositeOperation;
                (e.globalCompositeOperation = "destination-out"),
                  o.colorFillStyle(e, 255, 255, 255, o.motionBlurTransparency),
                  e.fillRect(t, n, r, i),
                  (e.globalCompositeOperation = a);
              }
              function P(e, r) {
                var s, l, c, d;
                o.clearingMotionBlur ||
                (e !== u.bufferContexts[o.MOTIONBLUR_BUFFER_NODE] &&
                  e !== u.bufferContexts[o.MOTIONBLUR_BUFFER_DRAG])
                  ? ((s = E),
                    (l = x),
                    (c = o.canvasWidth),
                    (d = o.canvasHeight))
                  : ((s = { x: w.x * p, y: w.y * p }),
                    (l = b * p),
                    (c = o.canvasWidth * p),
                    (d = o.canvasHeight * p)),
                  e.setTransform(1, 0, 0, 1, 0, 0),
                  "motionBlur" === r
                    ? S(e, 0, 0, c, d)
                    : t || (void 0 !== r && !r) || e.clearRect(0, 0, c, d),
                  n || (e.translate(s.x, s.y), e.scale(l, l)),
                  a && e.translate(a.x, a.y),
                  i && e.scale(i, i);
              }
              if ((d || (o.textureDrawLastFrame = !1), d)) {
                if (((o.textureDrawLastFrame = !0), !o.textureCache)) {
                  (o.textureCache = {}),
                    (o.textureCache.bb = l.mutableElements().boundingBox()),
                    (o.textureCache.texture =
                      o.data.bufferCanvases[o.TEXTURE_BUFFER]);
                  var D = o.data.bufferContexts[o.TEXTURE_BUFFER];
                  D.setTransform(1, 0, 0, 1, 0, 0),
                    D.clearRect(
                      0,
                      0,
                      o.canvasWidth * o.textureMult,
                      o.canvasHeight * o.textureMult
                    ),
                    o.render({
                      forcedContext: D,
                      drawOnlyNodeLayer: !0,
                      forcedPxRatio: s * o.textureMult,
                    }),
                    ((C = o.textureCache.viewport =
                      {
                        zoom: l.zoom(),
                        pan: l.pan(),
                        width: o.canvasWidth,
                        height: o.canvasHeight,
                      }).mpan = {
                      x: (0 - C.pan.x) / C.zoom,
                      y: (0 - C.pan.y) / C.zoom,
                    });
                }
                (c[o.DRAG] = !1), (c[o.NODE] = !1);
                var _ = u.contexts[o.NODE],
                  M = o.textureCache.texture;
                (C = o.textureCache.viewport),
                  _.setTransform(1, 0, 0, 1, 0, 0),
                  h
                    ? S(_, 0, 0, C.width, C.height)
                    : _.clearRect(0, 0, C.width, C.height);
                var N = m.core("outside-texture-bg-color").value,
                  I = m.core("outside-texture-bg-opacity").value;
                o.colorFillStyle(_, N[0], N[1], N[2], I),
                  _.fillRect(0, 0, C.width, C.height),
                  (b = l.zoom()),
                  P(_, !1),
                  _.clearRect(
                    C.mpan.x,
                    C.mpan.y,
                    C.width / C.zoom / s,
                    C.height / C.zoom / s
                  ),
                  _.drawImage(
                    M,
                    C.mpan.x,
                    C.mpan.y,
                    C.width / C.zoom / s,
                    C.height / C.zoom / s
                  );
              } else o.textureOnViewport && !t && (o.textureCache = null);
              var B = l.extent(),
                A =
                  o.pinching ||
                  o.hoverData.dragging ||
                  o.swipePanning ||
                  o.data.wheelZooming ||
                  o.hoverData.draggingEles ||
                  o.cy.animated(),
                L = o.hideEdgesOnViewport && A,
                O = [];
              if (
                ((O[o.NODE] =
                  (!c[o.NODE] && h && !o.clearedForMotionBlur[o.NODE]) ||
                  o.clearingMotionBlur),
                O[o.NODE] && (o.clearedForMotionBlur[o.NODE] = !0),
                (O[o.DRAG] =
                  (!c[o.DRAG] && h && !o.clearedForMotionBlur[o.DRAG]) ||
                  o.clearingMotionBlur),
                O[o.DRAG] && (o.clearedForMotionBlur[o.DRAG] = !0),
                c[o.NODE] || n || r || O[o.NODE])
              ) {
                var R = h && !O[o.NODE] && 1 !== p;
                P(
                  (_ =
                    t ||
                    (R
                      ? o.data.bufferContexts[o.MOTIONBLUR_BUFFER_NODE]
                      : u.contexts[o.NODE])),
                  h && !R ? "motionBlur" : void 0
                ),
                  L
                    ? o.drawCachedNodes(_, T.nondrag, s, B)
                    : o.drawLayeredElements(_, T.nondrag, s, B),
                  o.debug && o.drawDebugPoints(_, T.nondrag),
                  n || h || (c[o.NODE] = !1);
              }
              if (
                (!r &&
                  (c[o.DRAG] || n || O[o.DRAG]) &&
                  ((R = h && !O[o.DRAG] && 1 !== p),
                  P(
                    (_ =
                      t ||
                      (R
                        ? o.data.bufferContexts[o.MOTIONBLUR_BUFFER_DRAG]
                        : u.contexts[o.DRAG])),
                    h && !R ? "motionBlur" : void 0
                  ),
                  L
                    ? o.drawCachedNodes(_, T.drag, s, B)
                    : o.drawCachedElements(_, T.drag, s, B),
                  o.debug && o.drawDebugPoints(_, T.drag),
                  n || h || (c[o.DRAG] = !1)),
                o.showFps || (!r && c[o.SELECT_BOX] && !n))
              ) {
                if (
                  (P((_ = t || u.contexts[o.SELECT_BOX])),
                  1 == o.selection[4] &&
                    (o.hoverData.selecting || o.touchData.selecting))
                ) {
                  b = o.cy.zoom();
                  var z = m.core("selection-box-border-width").value / b;
                  (_.lineWidth = z),
                    (_.fillStyle =
                      "rgba(" +
                      m.core("selection-box-color").value[0] +
                      "," +
                      m.core("selection-box-color").value[1] +
                      "," +
                      m.core("selection-box-color").value[2] +
                      "," +
                      m.core("selection-box-opacity").value +
                      ")"),
                    _.fillRect(
                      o.selection[0],
                      o.selection[1],
                      o.selection[2] - o.selection[0],
                      o.selection[3] - o.selection[1]
                    ),
                    z > 0 &&
                      ((_.strokeStyle =
                        "rgba(" +
                        m.core("selection-box-border-color").value[0] +
                        "," +
                        m.core("selection-box-border-color").value[1] +
                        "," +
                        m.core("selection-box-border-color").value[2] +
                        "," +
                        m.core("selection-box-opacity").value +
                        ")"),
                      _.strokeRect(
                        o.selection[0],
                        o.selection[1],
                        o.selection[2] - o.selection[0],
                        o.selection[3] - o.selection[1]
                      ));
                }
                if (u.bgActivePosistion && !o.hoverData.selecting) {
                  b = o.cy.zoom();
                  var F = u.bgActivePosistion;
                  (_.fillStyle =
                    "rgba(" +
                    m.core("active-bg-color").value[0] +
                    "," +
                    m.core("active-bg-color").value[1] +
                    "," +
                    m.core("active-bg-color").value[2] +
                    "," +
                    m.core("active-bg-opacity").value +
                    ")"),
                    _.beginPath(),
                    _.arc(
                      F.x,
                      F.y,
                      m.core("active-bg-size").pfValue / b,
                      0,
                      2 * Math.PI
                    ),
                    _.fill();
                }
                var V = o.lastRedrawTime;
                if (o.showFps && V) {
                  V = Math.round(V);
                  var q = Math.round(1e3 / V);
                  _.setTransform(1, 0, 0, 1, 0, 0),
                    (_.fillStyle = "rgba(255, 0, 0, 0.75)"),
                    (_.strokeStyle = "rgba(255, 0, 0, 0.75)"),
                    (_.lineWidth = 1),
                    _.fillText("1 frame = " + V + " ms = " + q + " fps", 0, 20),
                    _.strokeRect(0, 30, 250, 20),
                    _.fillRect(0, 30, 250 * Math.min(q / 60, 1), 20);
                }
                n || (c[o.SELECT_BOX] = !1);
              }
              if (h && 1 !== p) {
                var j = u.contexts[o.NODE],
                  Y = o.data.bufferCanvases[o.MOTIONBLUR_BUFFER_NODE],
                  X = u.contexts[o.DRAG],
                  W = o.data.bufferCanvases[o.MOTIONBLUR_BUFFER_DRAG],
                  H = function (e, t, n) {
                    e.setTransform(1, 0, 0, 1, 0, 0),
                      n || !y
                        ? e.clearRect(0, 0, o.canvasWidth, o.canvasHeight)
                        : S(e, 0, 0, o.canvasWidth, o.canvasHeight);
                    var r = p;
                    e.drawImage(
                      t,
                      0,
                      0,
                      o.canvasWidth * r,
                      o.canvasHeight * r,
                      0,
                      0,
                      o.canvasWidth,
                      o.canvasHeight
                    );
                  };
                (c[o.NODE] || O[o.NODE]) &&
                  (H(j, Y, O[o.NODE]), (c[o.NODE] = !1)),
                  (c[o.DRAG] || O[o.DRAG]) &&
                    (H(X, W, O[o.DRAG]), (c[o.DRAG] = !1));
              }
              (o.prevViewport = C),
                o.clearingMotionBlur &&
                  ((o.clearingMotionBlur = !1),
                  (o.motionBlurCleared = !0),
                  (o.motionBlur = !0)),
                h &&
                  (o.motionBlurTimeout = setTimeout(function () {
                    (o.motionBlurTimeout = null),
                      (o.clearedForMotionBlur[o.NODE] = !1),
                      (o.clearedForMotionBlur[o.DRAG] = !1),
                      (o.motionBlur = !1),
                      (o.clearingMotionBlur = !d),
                      (o.mbFrames = 0),
                      (c[o.NODE] = !0),
                      (c[o.DRAG] = !0),
                      o.redraw();
                  }, 100)),
                t || l.emit("render");
            },
          },
          vu = {
            drawPolygonPath: function (e, t, n, r, i, a) {
              var o = r / 2,
                s = i / 2;
              e.beginPath && e.beginPath(),
                e.moveTo(t + o * a[0], n + s * a[1]);
              for (var l = 1; l < a.length / 2; l++)
                e.lineTo(t + o * a[2 * l], n + s * a[2 * l + 1]);
              e.closePath();
            },
            drawRoundPolygonPath: function (e, t, n, r, i, a, o) {
              o.forEach(function (t) {
                return vl(e, t);
              }),
                e.closePath();
            },
            drawRoundRectanglePath: function (e, t, n, r, i, a) {
              var o = r / 2,
                s = i / 2,
                l = "auto" === a ? sn(r, i) : Math.min(a, s, o);
              e.beginPath && e.beginPath(),
                e.moveTo(t, n - s),
                e.arcTo(t + o, n - s, t + o, n, l),
                e.arcTo(t + o, n + s, t, n + s, l),
                e.arcTo(t - o, n + s, t - o, n, l),
                e.arcTo(t - o, n - s, t, n - s, l),
                e.lineTo(t, n - s),
                e.closePath();
            },
            drawBottomRoundRectanglePath: function (e, t, n, r, i, a) {
              var o = r / 2,
                s = i / 2,
                l = "auto" === a ? sn(r, i) : a;
              e.beginPath && e.beginPath(),
                e.moveTo(t, n - s),
                e.lineTo(t + o, n - s),
                e.lineTo(t + o, n),
                e.arcTo(t + o, n + s, t, n + s, l),
                e.arcTo(t - o, n + s, t - o, n, l),
                e.lineTo(t - o, n - s),
                e.lineTo(t, n - s),
                e.closePath();
            },
            drawCutRectanglePath: function (e, t, n, r, i, a, o) {
              var s = r / 2,
                l = i / 2,
                u = "auto" === o ? 8 : o;
              e.beginPath && e.beginPath(),
                e.moveTo(t - s + u, n - l),
                e.lineTo(t + s - u, n - l),
                e.lineTo(t + s, n - l + u),
                e.lineTo(t + s, n + l - u),
                e.lineTo(t + s - u, n + l),
                e.lineTo(t - s + u, n + l),
                e.lineTo(t - s, n + l - u),
                e.lineTo(t - s, n - l + u),
                e.closePath();
            },
            drawBarrelPath: function (e, t, n, r, i) {
              var a = r / 2,
                o = i / 2,
                s = t - a,
                l = t + a,
                u = n - o,
                c = n + o,
                d = un(r, i),
                h = d.widthOffset,
                p = d.heightOffset,
                f = d.ctrlPtOffsetPct * h;
              e.beginPath && e.beginPath(),
                e.moveTo(s, u + p),
                e.lineTo(s, c - p),
                e.quadraticCurveTo(s + f, c, s + h, c),
                e.lineTo(l - h, c),
                e.quadraticCurveTo(l - f, c, l, c - p),
                e.lineTo(l, u + p),
                e.quadraticCurveTo(l - f, u, l - h, u),
                e.lineTo(s + h, u),
                e.quadraticCurveTo(s + f, u, s, u + p),
                e.closePath();
            },
          },
          yu = Math.sin(0),
          mu = Math.cos(0),
          bu = {},
          xu = {},
          wu = Math.PI / 40,
          Eu = 0 * Math.PI;
        Eu < 2 * Math.PI;
        Eu += wu
      )
        (bu[Eu] = Math.sin(Eu)), (xu[Eu] = Math.cos(Eu));
      vu.drawEllipsePath = function (e, t, n, r, i) {
        if ((e.beginPath && e.beginPath(), e.ellipse))
          e.ellipse(t, n, r / 2, i / 2, 0, 0, 2 * Math.PI);
        else
          for (
            var a, o, s = r / 2, l = i / 2, u = 0 * Math.PI;
            u < 2 * Math.PI;
            u += wu
          )
            (a = t - s * bu[u] * yu + s * xu[u] * mu),
              (o = n + l * xu[u] * yu + l * bu[u] * mu),
              0 === u ? e.moveTo(a, o) : e.lineTo(a, o);
        e.closePath();
      };
      var Cu = {};
      function ku(e) {
        var t = e.indexOf(",");
        return e.substr(t + 1);
      }
      function Tu(e, t, n) {
        var r = function () {
          return t.toDataURL(n, e.quality);
        };
        switch (e.output) {
          case "blob-promise":
            return new wr(function (r, i) {
              try {
                t.toBlob(
                  function (e) {
                    null != e
                      ? r(e)
                      : i(
                          new Error(
                            "`canvas.toBlob()` sent a null value in its callback"
                          )
                        );
                  },
                  n,
                  e.quality
                );
              } catch (e) {
                i(e);
              }
            });
          case "blob":
            return (function (e, t) {
              for (
                var n = atob(e),
                  r = new ArrayBuffer(n.length),
                  i = new Uint8Array(r),
                  a = 0;
                a < n.length;
                a++
              )
                i[a] = n.charCodeAt(a);
              return new Blob([r], { type: t });
            })(ku(r()), n);
          case "base64":
            return ku(r());
          default:
            return r();
        }
      }
      (Cu.createBuffer = function (e, t) {
        var n = document.createElement("canvas");
        return (n.width = e), (n.height = t), [n, n.getContext("2d")];
      }),
        (Cu.bufferCanvasImage = function (e) {
          var t = this.cy,
            n = t.mutableElements().boundingBox(),
            r = this.findContainerClientCoords(),
            i = e.full ? Math.ceil(n.w) : r[2],
            a = e.full ? Math.ceil(n.h) : r[3],
            o = E(e.maxWidth) || E(e.maxHeight),
            s = this.getPixelRatio(),
            l = 1;
          if (void 0 !== e.scale) (i *= e.scale), (a *= e.scale), (l = e.scale);
          else if (o) {
            var u = 1 / 0,
              c = 1 / 0;
            E(e.maxWidth) && (u = (l * e.maxWidth) / i),
              E(e.maxHeight) && (c = (l * e.maxHeight) / a),
              (i *= l = Math.min(u, c)),
              (a *= l);
          }
          o || ((i *= s), (a *= s), (l *= s));
          var d = document.createElement("canvas");
          (d.width = i),
            (d.height = a),
            (d.style.width = i + "px"),
            (d.style.height = a + "px");
          var h = d.getContext("2d");
          if (i > 0 && a > 0) {
            h.clearRect(0, 0, i, a),
              (h.globalCompositeOperation = "source-over");
            var p = this.getCachedZSortedEles();
            if (e.full)
              h.translate(-n.x1 * l, -n.y1 * l),
                h.scale(l, l),
                this.drawElements(h, p),
                h.scale(1 / l, 1 / l),
                h.translate(n.x1 * l, n.y1 * l);
            else {
              var f = t.pan(),
                g = { x: f.x * l, y: f.y * l };
              (l *= t.zoom()),
                h.translate(g.x, g.y),
                h.scale(l, l),
                this.drawElements(h, p),
                h.scale(1 / l, 1 / l),
                h.translate(-g.x, -g.y);
            }
            e.bg &&
              ((h.globalCompositeOperation = "destination-over"),
              (h.fillStyle = e.bg),
              h.rect(0, 0, i, a),
              h.fill());
          }
          return d;
        }),
        (Cu.png = function (e) {
          return Tu(e, this.bufferCanvasImage(e), "image/png");
        }),
        (Cu.jpg = function (e) {
          return Tu(e, this.bufferCanvasImage(e), "image/jpeg");
        });
      var Su = Du,
        Pu = Du.prototype;
      function Du(e) {
        var t = this;
        t.data = {
          canvases: new Array(Pu.CANVAS_LAYERS),
          contexts: new Array(Pu.CANVAS_LAYERS),
          canvasNeedsRedraw: new Array(Pu.CANVAS_LAYERS),
          bufferCanvases: new Array(Pu.BUFFER_COUNT),
          bufferContexts: new Array(Pu.CANVAS_LAYERS),
        };
        var n = "-webkit-tap-highlight-color",
          r = "rgba(0,0,0,0)";
        t.data.canvasContainer = document.createElement("div");
        var i = t.data.canvasContainer.style;
        (t.data.canvasContainer.style[n] = r),
          (i.position = "relative"),
          (i.zIndex = "0"),
          (i.overflow = "hidden");
        var a = e.cy.container();
        a.appendChild(t.data.canvasContainer), (a.style[n] = r);
        var o = {
          "-webkit-user-select": "none",
          "-moz-user-select": "-moz-none",
          "user-select": "none",
          "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
          "outline-style": "none",
        };
        h &&
          h.userAgent.match(/msie|trident|edge/i) &&
          ((o["-ms-touch-action"] = "none"), (o["touch-action"] = "none"));
        for (var s = 0; s < Pu.CANVAS_LAYERS; s++) {
          var l = (t.data.canvases[s] = document.createElement("canvas"));
          (t.data.contexts[s] = l.getContext("2d")),
            Object.keys(o).forEach(function (e) {
              l.style[e] = o[e];
            }),
            (l.style.position = "absolute"),
            l.setAttribute("data-id", "layer" + s),
            (l.style.zIndex = String(Pu.CANVAS_LAYERS - s)),
            t.data.canvasContainer.appendChild(l),
            (t.data.canvasNeedsRedraw[s] = !1);
        }
        for (
          t.data.topCanvas = t.data.canvases[0],
            t.data.canvases[Pu.NODE].setAttribute(
              "data-id",
              "layer" + Pu.NODE + "-node"
            ),
            t.data.canvases[Pu.SELECT_BOX].setAttribute(
              "data-id",
              "layer" + Pu.SELECT_BOX + "-selectbox"
            ),
            t.data.canvases[Pu.DRAG].setAttribute(
              "data-id",
              "layer" + Pu.DRAG + "-drag"
            ),
            s = 0;
          s < Pu.BUFFER_COUNT;
          s++
        )
          (t.data.bufferCanvases[s] = document.createElement("canvas")),
            (t.data.bufferContexts[s] =
              t.data.bufferCanvases[s].getContext("2d")),
            (t.data.bufferCanvases[s].style.position = "absolute"),
            t.data.bufferCanvases[s].setAttribute("data-id", "buffer" + s),
            (t.data.bufferCanvases[s].style.zIndex = String(-s - 1)),
            (t.data.bufferCanvases[s].style.visibility = "hidden");
        t.pathsEnabled = !0;
        var u = Bt(),
          c = function (e) {
            return { x: -e.w / 2, y: -e.h / 2 };
          },
          d = function (e) {
            return e.boundingBox(), e[0]._private.bodyBounds;
          },
          p = function (e) {
            return e.boundingBox(), e[0]._private.labelBounds.main || u;
          },
          f = function (e) {
            return e.boundingBox(), e[0]._private.labelBounds.source || u;
          },
          g = function (e) {
            return e.boundingBox(), e[0]._private.labelBounds.target || u;
          },
          v = function (e, t) {
            return t;
          },
          y = function (e, t, n) {
            var r = e ? e + "-" : "";
            return {
              x: t.x + n.pstyle(r + "text-margin-x").pfValue,
              y: t.y + n.pstyle(r + "text-margin-y").pfValue,
            };
          },
          m = function (e, t, n) {
            var r = e[0]._private.rscratch;
            return { x: r[t], y: r[n] };
          },
          b = (t.data.eleTxrCache = new jl(t, {
            getKey: function (e) {
              return e[0]._private.nodeKey;
            },
            doesEleInvalidateKey: function (e) {
              var t = e[0]._private;
              return !(t.oldBackgroundTimestamp === t.backgroundTimestamp);
            },
            drawElement: function (e, n, r, i, a) {
              return t.drawElement(e, n, r, !1, !1, a);
            },
            getBoundingBox: d,
            getRotationPoint: function (e) {
              return { x: ((t = d(e)).x1 + t.x2) / 2, y: (t.y1 + t.y2) / 2 };
              var t;
            },
            getRotationOffset: function (e) {
              return c(d(e));
            },
            allowEdgeTxrCaching: !1,
            allowParentTxrCaching: !1,
          })),
          x = (t.data.lblTxrCache = new jl(t, {
            getKey: function (e) {
              return e[0]._private.labelStyleKey;
            },
            drawElement: function (e, n, r, i, a) {
              return t.drawElementText(e, n, r, i, "main", a);
            },
            getBoundingBox: p,
            getRotationPoint: function (e) {
              return y("", m(e, "labelX", "labelY"), e);
            },
            getRotationOffset: function (e) {
              var t = p(e),
                n = c(p(e));
              if (e.isNode()) {
                switch (e.pstyle("text-halign").value) {
                  case "left":
                    n.x = -t.w;
                    break;
                  case "right":
                    n.x = 0;
                }
                switch (e.pstyle("text-valign").value) {
                  case "top":
                    n.y = -t.h;
                    break;
                  case "bottom":
                    n.y = 0;
                }
              }
              return n;
            },
            isVisible: v,
          })),
          w = (t.data.slbTxrCache = new jl(t, {
            getKey: function (e) {
              return e[0]._private.sourceLabelStyleKey;
            },
            drawElement: function (e, n, r, i, a) {
              return t.drawElementText(e, n, r, i, "source", a);
            },
            getBoundingBox: f,
            getRotationPoint: function (e) {
              return y("source", m(e, "sourceLabelX", "sourceLabelY"), e);
            },
            getRotationOffset: function (e) {
              return c(f(e));
            },
            isVisible: v,
          })),
          E = (t.data.tlbTxrCache = new jl(t, {
            getKey: function (e) {
              return e[0]._private.targetLabelStyleKey;
            },
            drawElement: function (e, n, r, i, a) {
              return t.drawElementText(e, n, r, i, "target", a);
            },
            getBoundingBox: g,
            getRotationPoint: function (e) {
              return y("target", m(e, "targetLabelX", "targetLabelY"), e);
            },
            getRotationOffset: function (e) {
              return c(g(e));
            },
            isVisible: v,
          })),
          C = (t.data.lyrTxrCache = new Xl(t));
        t.onUpdateEleCalcs(function (e, t) {
          b.invalidateElements(t),
            x.invalidateElements(t),
            w.invalidateElements(t),
            E.invalidateElements(t),
            C.invalidateElements(t);
          for (var n = 0; n < t.length; n++) {
            var r = t[n]._private;
            r.oldBackgroundTimestamp = r.backgroundTimestamp;
          }
        });
        var k = function (e) {
          for (var t = 0; t < e.length; t++)
            C.enqueueElementRefinement(e[t].ele);
        };
        b.onDequeue(k), x.onDequeue(k), w.onDequeue(k), E.onDequeue(k);
      }
      (Pu.CANVAS_LAYERS = 3),
        (Pu.SELECT_BOX = 0),
        (Pu.DRAG = 1),
        (Pu.NODE = 2),
        (Pu.BUFFER_COUNT = 3),
        (Pu.TEXTURE_BUFFER = 0),
        (Pu.MOTIONBLUR_BUFFER_NODE = 1),
        (Pu.MOTIONBLUR_BUFFER_DRAG = 2),
        (Pu.redrawHint = function (e, t) {
          var n = this;
          switch (e) {
            case "eles":
              n.data.canvasNeedsRedraw[Pu.NODE] = t;
              break;
            case "drag":
              n.data.canvasNeedsRedraw[Pu.DRAG] = t;
              break;
            case "select":
              n.data.canvasNeedsRedraw[Pu.SELECT_BOX] = t;
          }
        });
      var _u = "undefined" != typeof Path2D;
      (Pu.path2dEnabled = function (e) {
        if (void 0 === e) return this.pathsEnabled;
        this.pathsEnabled = !!e;
      }),
        (Pu.usePaths = function () {
          return _u && this.pathsEnabled;
        }),
        (Pu.setImgSmoothing = function (e, t) {
          null != e.imageSmoothingEnabled
            ? (e.imageSmoothingEnabled = t)
            : ((e.webkitImageSmoothingEnabled = t),
              (e.mozImageSmoothingEnabled = t),
              (e.msImageSmoothingEnabled = t));
        }),
        (Pu.getImgSmoothing = function (e) {
          return null != e.imageSmoothingEnabled
            ? e.imageSmoothingEnabled
            : e.webkitImageSmoothingEnabled ||
                e.mozImageSmoothingEnabled ||
                e.msImageSmoothingEnabled;
        }),
        (Pu.makeOffscreenCanvas = function (e, t) {
          var n;
          return (
            "undefined" !==
            ("undefined" == typeof OffscreenCanvas
              ? "undefined"
              : r(OffscreenCanvas))
              ? (n = new OffscreenCanvas(e, t))
              : (((n = document.createElement("canvas")).width = e),
                (n.height = t)),
            n
          );
        }),
        [
          Kl,
          tu,
          lu,
          cu,
          du,
          pu,
          gu,
          vu,
          Cu,
          {
            nodeShapeImpl: function (e, t, n, r, i, a, o, s) {
              switch (e) {
                case "ellipse":
                  return this.drawEllipsePath(t, n, r, i, a);
                case "polygon":
                  return this.drawPolygonPath(t, n, r, i, a, o);
                case "round-polygon":
                  return this.drawRoundPolygonPath(t, n, r, i, a, o, s);
                case "roundrectangle":
                case "round-rectangle":
                  return this.drawRoundRectanglePath(t, n, r, i, a, s);
                case "cutrectangle":
                case "cut-rectangle":
                  return this.drawCutRectanglePath(t, n, r, i, a, o, s);
                case "bottomroundrectangle":
                case "bottom-round-rectangle":
                  return this.drawBottomRoundRectanglePath(t, n, r, i, a, s);
                case "barrel":
                  return this.drawBarrelPath(t, n, r, i, a);
              }
            },
          },
        ].forEach(function (e) {
          j(Pu, e);
        });
      var Mu = [
          { type: "layout", extensions: Ys },
          {
            type: "renderer",
            extensions: [
              { name: "null", impl: Xs },
              { name: "base", impl: Ll },
              { name: "canvas", impl: Su },
            ],
          },
        ],
        Nu = {},
        Iu = {};
      function Bu(e, t, n) {
        var r = n,
          i = function (n) {
            Ye(
              "Can not register `" +
                t +
                "` for `" +
                e +
                "` since `" +
                n +
                "` already exists in the prototype and can not be overridden"
            );
          };
        if ("core" === e) {
          if (ns.prototype[t]) return i(t);
          ns.prototype[t] = n;
        } else if ("collection" === e) {
          if (mo.prototype[t]) return i(t);
          mo.prototype[t] = n;
        } else if ("layout" === e) {
          for (
            var a = function (e) {
                (this.options = e),
                  n.call(this, e),
                  w(this._private) || (this._private = {}),
                  (this._private.cy = e.cy),
                  (this._private.listeners = []),
                  this.createEmitter();
              },
              o = (a.prototype = Object.create(n.prototype)),
              s = [],
              l = 0;
            l < s.length;
            l++
          ) {
            var u = s[l];
            o[u] =
              o[u] ||
              function () {
                return this;
              };
          }
          o.start && !o.run
            ? (o.run = function () {
                return this.start(), this;
              })
            : !o.start &&
              o.run &&
              (o.start = function () {
                return this.run(), this;
              });
          var c = n.prototype.stop;
          (o.stop = function () {
            var e = this.options;
            if (e && e.animate) {
              var t = this.animations;
              if (t) for (var n = 0; n < t.length; n++) t[n].stop();
            }
            return c ? c.call(this) : this.emit("layoutstop"), this;
          }),
            o.destroy ||
              (o.destroy = function () {
                return this;
              }),
            (o.cy = function () {
              return this._private.cy;
            });
          var d = function (e) {
              return e._private.cy;
            },
            h = {
              addEventFields: function (e, t) {
                (t.layout = e), (t.cy = d(e)), (t.target = e);
              },
              bubble: function () {
                return !0;
              },
              parent: function (e) {
                return d(e);
              },
            };
          j(o, {
            createEmitter: function () {
              return (this._private.emitter = new Oa(h, this)), this;
            },
            emitter: function () {
              return this._private.emitter;
            },
            on: function (e, t) {
              return this.emitter().on(e, t), this;
            },
            one: function (e, t) {
              return this.emitter().one(e, t), this;
            },
            once: function (e, t) {
              return this.emitter().one(e, t), this;
            },
            removeListener: function (e, t) {
              return this.emitter().removeListener(e, t), this;
            },
            removeAllListeners: function () {
              return this.emitter().removeAllListeners(), this;
            },
            emit: function (e, t) {
              return this.emitter().emit(e, t), this;
            },
          }),
            Ci.eventAliasesOn(o),
            (r = a);
        } else if ("renderer" === e && "null" !== t && "base" !== t) {
          var p = Au("renderer", "base"),
            f = p.prototype,
            g = n,
            v = n.prototype,
            y = function () {
              p.apply(this, arguments), g.apply(this, arguments);
            },
            m = y.prototype;
          for (var b in f) {
            var x = f[b];
            if (null != v[b]) return i(b);
            m[b] = x;
          }
          for (var E in v) m[E] = v[E];
          f.clientFunctions.forEach(function (e) {
            m[e] =
              m[e] ||
              function () {
                qe(
                  "Renderer does not implement `renderer." +
                    e +
                    "()` on its prototype"
                );
              };
          }),
            (r = y);
        } else if (
          "__proto__" === e ||
          "constructor" === e ||
          "prototype" === e
        )
          return qe(
            e +
              " is an illegal type to be registered, possibly lead to prototype pollutions"
          );
        return X({ map: Nu, keys: [e, t], value: r });
      }
      function Au(e, t) {
        return W({ map: Nu, keys: [e, t] });
      }
      function Lu(e, t, n, r, i) {
        return X({ map: Iu, keys: [e, t, n, r], value: i });
      }
      function Ou(e, t, n, r) {
        return W({ map: Iu, keys: [e, t, n, r] });
      }
      var Ru = function () {
        return 2 === arguments.length
          ? Au.apply(null, arguments)
          : 3 === arguments.length
          ? Bu.apply(null, arguments)
          : 4 === arguments.length
          ? Ou.apply(null, arguments)
          : 5 === arguments.length
          ? Lu.apply(null, arguments)
          : void qe("Invalid extension access syntax");
      };
      (ns.prototype.extension = Ru),
        Mu.forEach(function (e) {
          e.extensions.forEach(function (t) {
            Bu(e.type, t.name, t.impl);
          });
        });
      var zu = function e() {
          if (!(this instanceof e)) return new e();
          this.length = 0;
        },
        Fu = zu.prototype;
      (Fu.instanceString = function () {
        return "stylesheet";
      }),
        (Fu.selector = function (e) {
          return (this[this.length++] = { selector: e, properties: [] }), this;
        }),
        (Fu.css = function (e, t) {
          var n = this.length - 1;
          if (m(e)) this[n].properties.push({ name: e, value: t });
          else if (w(e))
            for (var r = e, i = Object.keys(r), a = 0; a < i.length; a++) {
              var o = i[a],
                s = r[o];
              if (null != s) {
                var l = $o.properties[o] || $o.properties[B(o)];
                if (null != l) {
                  var u = l.name,
                    c = s;
                  this[n].properties.push({ name: u, value: c });
                }
              }
            }
          return this;
        }),
        (Fu.style = Fu.css),
        (Fu.generateStyle = function (e) {
          var t = new $o(e);
          return this.appendToStyle(t);
        }),
        (Fu.appendToStyle = function (e) {
          for (var t = 0; t < this.length; t++) {
            var n = this[t],
              r = n.selector,
              i = n.properties;
            e.selector(r);
            for (var a = 0; a < i.length; a++) {
              var o = i[a];
              e.css(o.name, o.value);
            }
          }
          return e;
        });
      var Vu = function (e) {
        return (
          void 0 === e && (e = {}),
          w(e) ? new ns(e) : m(e) ? Ru.apply(Ru, arguments) : void 0
        );
      };
      (Vu.use = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return t.unshift(Vu), e.apply(null, t), this;
      }),
        (Vu.warnings = function (e) {
          return je(e);
        }),
        (Vu.version = "3.29.2"),
        (Vu.stylesheet = Vu.Stylesheet = zu);
    },
  },
]);