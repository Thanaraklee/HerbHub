/*! For license information please see vendors.19de8d7b23d1a57d52fd.bundle.js.LICENSE.txt */
(self.webpackChunkst_link_analysis =
  self.webpackChunkst_link_analysis || []).push([
  [96],
  {
    180: function (t, e, n) {
      var r;
      (r = function (t) {
        return (() => {
          "use strict";
          var e = {
              45: (t, e, n) => {
                var r = {};
                (r.layoutBase = n(551)),
                  (r.CoSEConstants = n(806)),
                  (r.CoSEEdge = n(767)),
                  (r.CoSEGraph = n(880)),
                  (r.CoSEGraphManager = n(578)),
                  (r.CoSELayout = n(765)),
                  (r.CoSENode = n(991)),
                  (r.ConstraintHandler = n(902)),
                  (t.exports = r);
              },
              806: (t, e, n) => {
                var r = n(551).FDLayoutConstants;
                function i() {}
                for (var o in r) i[o] = r[o];
                (i.DEFAULT_USE_MULTI_LEVEL_SCALING = !1),
                  (i.DEFAULT_RADIAL_SEPARATION = r.DEFAULT_EDGE_LENGTH),
                  (i.DEFAULT_COMPONENT_SEPERATION = 60),
                  (i.TILE = !0),
                  (i.TILING_PADDING_VERTICAL = 10),
                  (i.TILING_PADDING_HORIZONTAL = 10),
                  (i.TRANSFORM_ON_CONSTRAINT_HANDLING = !0),
                  (i.ENFORCE_CONSTRAINTS = !0),
                  (i.APPLY_LAYOUT = !0),
                  (i.RELAX_MOVEMENT_ON_CONSTRAINTS = !0),
                  (i.TREE_REDUCTION_ON_INCREMENTAL = !0),
                  (i.PURE_INCREMENTAL = i.DEFAULT_INCREMENTAL),
                  (t.exports = i);
              },
              767: (t, e, n) => {
                var r = n(551).FDLayoutEdge;
                function i(t, e, n) {
                  r.call(this, t, e, n);
                }
                for (var o in ((i.prototype = Object.create(r.prototype)), r))
                  i[o] = r[o];
                t.exports = i;
              },
              880: (t, e, n) => {
                var r = n(551).LGraph;
                function i(t, e, n) {
                  r.call(this, t, e, n);
                }
                for (var o in ((i.prototype = Object.create(r.prototype)), r))
                  i[o] = r[o];
                t.exports = i;
              },
              578: (t, e, n) => {
                var r = n(551).LGraphManager;
                function i(t) {
                  r.call(this, t);
                }
                for (var o in ((i.prototype = Object.create(r.prototype)), r))
                  i[o] = r[o];
                t.exports = i;
              },
              765: (t, e, n) => {
                var r = n(551).FDLayout,
                  i = n(578),
                  o = n(880),
                  s = n(991),
                  a = n(767),
                  h = n(806),
                  u = n(902),
                  c = n(551).FDLayoutConstants,
                  l = n(551).LayoutConstants,
                  p = n(551).Point,
                  f = n(551).PointD,
                  d = n(551).DimensionD,
                  g = n(551).Layout,
                  v = n(551).Integer,
                  y = n(551).IGeometry,
                  m = n(551).LGraph,
                  _ = n(551).Transform,
                  E = n(551).LinkedList;
                function b() {
                  r.call(this), (this.toBeTiled = {}), (this.constraints = {});
                }
                for (var w in ((b.prototype = Object.create(r.prototype)), r))
                  b[w] = r[w];
                (b.prototype.newGraphManager = function () {
                  var t = new i(this);
                  return (this.graphManager = t), t;
                }),
                  (b.prototype.newGraph = function (t) {
                    return new o(null, this.graphManager, t);
                  }),
                  (b.prototype.newNode = function (t) {
                    return new s(this.graphManager, t);
                  }),
                  (b.prototype.newEdge = function (t) {
                    return new a(null, null, t);
                  }),
                  (b.prototype.initParameters = function () {
                    r.prototype.initParameters.call(this, arguments),
                      this.isSubLayout ||
                        (h.DEFAULT_EDGE_LENGTH < 10
                          ? (this.idealEdgeLength = 10)
                          : (this.idealEdgeLength = h.DEFAULT_EDGE_LENGTH),
                        (this.useSmartIdealEdgeLengthCalculation =
                          h.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION),
                        (this.gravityConstant = c.DEFAULT_GRAVITY_STRENGTH),
                        (this.compoundGravityConstant =
                          c.DEFAULT_COMPOUND_GRAVITY_STRENGTH),
                        (this.gravityRangeFactor =
                          c.DEFAULT_GRAVITY_RANGE_FACTOR),
                        (this.compoundGravityRangeFactor =
                          c.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR),
                        (this.prunedNodesAll = []),
                        (this.growTreeIterations = 0),
                        (this.afterGrowthIterations = 0),
                        (this.isTreeGrowing = !1),
                        (this.isGrowthFinished = !1));
                  }),
                  (b.prototype.initSpringEmbedder = function () {
                    r.prototype.initSpringEmbedder.call(this),
                      (this.coolingCycle = 0),
                      (this.maxCoolingCycle =
                        this.maxIterations / c.CONVERGENCE_CHECK_PERIOD),
                      (this.finalTemperature = 0.04),
                      (this.coolingAdjuster = 1);
                  }),
                  (b.prototype.layout = function () {
                    return (
                      l.DEFAULT_CREATE_BENDS_AS_NEEDED &&
                        (this.createBendpoints(),
                        this.graphManager.resetAllEdges()),
                      (this.level = 0),
                      this.classicLayout()
                    );
                  }),
                  (b.prototype.classicLayout = function () {
                    if (
                      ((this.nodesWithGravity =
                        this.calculateNodesToApplyGravitationTo()),
                      this.graphManager.setAllNodesToApplyGravitation(
                        this.nodesWithGravity
                      ),
                      this.calcNoOfChildrenForAllNodes(),
                      this.graphManager.calcLowestCommonAncestors(),
                      this.graphManager.calcInclusionTreeDepths(),
                      this.graphManager.getRoot().calcEstimatedSize(),
                      this.calcIdealEdgeLengths(),
                      this.incremental)
                    )
                      h.TREE_REDUCTION_ON_INCREMENTAL &&
                        (this.reduceTrees(),
                        this.graphManager.resetAllNodesToApplyGravitation(),
                        (e = new Set(this.getAllNodes())),
                        (n = this.nodesWithGravity.filter(function (t) {
                          return e.has(t);
                        })),
                        this.graphManager.setAllNodesToApplyGravitation(n));
                    else {
                      var t = this.getFlatForest();
                      if (t.length > 0) this.positionNodesRadially(t);
                      else {
                        this.reduceTrees(),
                          this.graphManager.resetAllNodesToApplyGravitation();
                        var e = new Set(this.getAllNodes()),
                          n = this.nodesWithGravity.filter(function (t) {
                            return e.has(t);
                          });
                        this.graphManager.setAllNodesToApplyGravitation(n),
                          this.positionNodesRandomly();
                      }
                    }
                    return (
                      Object.keys(this.constraints).length > 0 &&
                        (u.handleConstraints(this),
                        this.initConstraintVariables()),
                      this.initSpringEmbedder(),
                      h.APPLY_LAYOUT && this.runSpringEmbedder(),
                      !0
                    );
                  }),
                  (b.prototype.tick = function () {
                    if (
                      (this.totalIterations++,
                      this.totalIterations === this.maxIterations &&
                        !this.isTreeGrowing &&
                        !this.isGrowthFinished)
                    ) {
                      if (!(this.prunedNodesAll.length > 0)) return !0;
                      this.isTreeGrowing = !0;
                    }
                    if (
                      this.totalIterations % c.CONVERGENCE_CHECK_PERIOD == 0 &&
                      !this.isTreeGrowing &&
                      !this.isGrowthFinished
                    ) {
                      if (this.isConverged()) {
                        if (!(this.prunedNodesAll.length > 0)) return !0;
                        this.isTreeGrowing = !0;
                      }
                      this.coolingCycle++,
                        0 == this.layoutQuality
                          ? (this.coolingAdjuster = this.coolingCycle)
                          : 1 == this.layoutQuality &&
                            (this.coolingAdjuster = this.coolingCycle / 3),
                        (this.coolingFactor = Math.max(
                          this.initialCoolingFactor -
                            (Math.pow(
                              this.coolingCycle,
                              Math.log(
                                100 *
                                  (this.initialCoolingFactor -
                                    this.finalTemperature)
                              ) / Math.log(this.maxCoolingCycle)
                            ) /
                              100) *
                              this.coolingAdjuster,
                          this.finalTemperature
                        )),
                        (this.animationPeriod = Math.ceil(
                          this.initialAnimationPeriod *
                            Math.sqrt(this.coolingFactor)
                        ));
                    }
                    if (this.isTreeGrowing) {
                      if (this.growTreeIterations % 10 == 0)
                        if (this.prunedNodesAll.length > 0) {
                          this.graphManager.updateBounds(),
                            this.updateGrid(),
                            this.growTree(this.prunedNodesAll),
                            this.graphManager.resetAllNodesToApplyGravitation();
                          var t = new Set(this.getAllNodes()),
                            e = this.nodesWithGravity.filter(function (e) {
                              return t.has(e);
                            });
                          this.graphManager.setAllNodesToApplyGravitation(e),
                            this.graphManager.updateBounds(),
                            this.updateGrid(),
                            h.PURE_INCREMENTAL
                              ? (this.coolingFactor =
                                  c.DEFAULT_COOLING_FACTOR_INCREMENTAL / 2)
                              : (this.coolingFactor =
                                  c.DEFAULT_COOLING_FACTOR_INCREMENTAL);
                        } else
                          (this.isTreeGrowing = !1),
                            (this.isGrowthFinished = !0);
                      this.growTreeIterations++;
                    }
                    if (this.isGrowthFinished) {
                      if (this.isConverged()) return !0;
                      this.afterGrowthIterations % 10 == 0 &&
                        (this.graphManager.updateBounds(), this.updateGrid()),
                        h.PURE_INCREMENTAL
                          ? (this.coolingFactor =
                              (c.DEFAULT_COOLING_FACTOR_INCREMENTAL / 2) *
                              ((100 - this.afterGrowthIterations) / 100))
                          : (this.coolingFactor =
                              c.DEFAULT_COOLING_FACTOR_INCREMENTAL *
                              ((100 - this.afterGrowthIterations) / 100)),
                        this.afterGrowthIterations++;
                    }
                    var n = !this.isTreeGrowing && !this.isGrowthFinished,
                      r =
                        (this.growTreeIterations % 10 == 1 &&
                          this.isTreeGrowing) ||
                        (this.afterGrowthIterations % 10 == 1 &&
                          this.isGrowthFinished);
                    return (
                      (this.totalDisplacement = 0),
                      this.graphManager.updateBounds(),
                      this.calcSpringForces(),
                      this.calcRepulsionForces(n, r),
                      this.calcGravitationalForces(),
                      this.moveNodes(),
                      this.animate(),
                      !1
                    );
                  }),
                  (b.prototype.getPositionsData = function () {
                    for (
                      var t = this.graphManager.getAllNodes(), e = {}, n = 0;
                      n < t.length;
                      n++
                    ) {
                      var r = t[n].rect,
                        i = t[n].id;
                      e[i] = {
                        id: i,
                        x: r.getCenterX(),
                        y: r.getCenterY(),
                        w: r.width,
                        h: r.height,
                      };
                    }
                    return e;
                  }),
                  (b.prototype.runSpringEmbedder = function () {
                    (this.initialAnimationPeriod = 25),
                      (this.animationPeriod = this.initialAnimationPeriod);
                    var t = !1;
                    if ("during" === c.ANIMATE) this.emit("layoutstarted");
                    else {
                      for (; !t; ) t = this.tick();
                      this.graphManager.updateBounds();
                    }
                  }),
                  (b.prototype.moveNodes = function () {
                    for (var t = this.getAllNodes(), e = 0; e < t.length; e++)
                      t[e].calculateDisplacement();
                    for (
                      Object.keys(this.constraints).length > 0 &&
                        this.updateDisplacements(),
                        e = 0;
                      e < t.length;
                      e++
                    )
                      t[e].move();
                  }),
                  (b.prototype.initConstraintVariables = function () {
                    var t = this;
                    (this.idToNodeMap = new Map()),
                      (this.fixedNodeSet = new Set());
                    for (
                      var e = this.graphManager.getAllNodes(), n = 0;
                      n < e.length;
                      n++
                    ) {
                      var r = e[n];
                      this.idToNodeMap.set(r.id, r);
                    }
                    var i = function e(n) {
                      for (
                        var r, i = n.getChild().getNodes(), o = 0, s = 0;
                        s < i.length;
                        s++
                      )
                        null == (r = i[s]).getChild()
                          ? t.fixedNodeSet.has(r.id) && (o += 100)
                          : (o += e(r));
                      return o;
                    };
                    if (this.constraints.fixedNodeConstraint)
                      for (
                        this.constraints.fixedNodeConstraint.forEach(function (
                          e
                        ) {
                          t.fixedNodeSet.add(e.nodeId);
                        }),
                          e = this.graphManager.getAllNodes(),
                          n = 0;
                        n < e.length;
                        n++
                      )
                        if (null != (r = e[n]).getChild()) {
                          var o = i(r);
                          o > 0 && (r.fixedNodeWeight = o);
                        }
                    if (this.constraints.relativePlacementConstraint) {
                      var s = new Map(),
                        a = new Map();
                      if (
                        ((this.dummyToNodeForVerticalAlignment = new Map()),
                        (this.dummyToNodeForHorizontalAlignment = new Map()),
                        (this.fixedNodesOnHorizontal = new Set()),
                        (this.fixedNodesOnVertical = new Set()),
                        this.fixedNodeSet.forEach(function (e) {
                          t.fixedNodesOnHorizontal.add(e),
                            t.fixedNodesOnVertical.add(e);
                        }),
                        this.constraints.alignmentConstraint)
                      ) {
                        if (this.constraints.alignmentConstraint.vertical) {
                          var u = this.constraints.alignmentConstraint.vertical;
                          for (n = 0; n < u.length; n++)
                            this.dummyToNodeForVerticalAlignment.set(
                              "dummy" + n,
                              []
                            ),
                              u[n].forEach(function (e) {
                                s.set(e, "dummy" + n),
                                  t.dummyToNodeForVerticalAlignment
                                    .get("dummy" + n)
                                    .push(e),
                                  t.fixedNodeSet.has(e) &&
                                    t.fixedNodesOnHorizontal.add("dummy" + n);
                              });
                        }
                        if (this.constraints.alignmentConstraint.horizontal) {
                          var c =
                            this.constraints.alignmentConstraint.horizontal;
                          for (n = 0; n < c.length; n++)
                            this.dummyToNodeForHorizontalAlignment.set(
                              "dummy" + n,
                              []
                            ),
                              c[n].forEach(function (e) {
                                a.set(e, "dummy" + n),
                                  t.dummyToNodeForHorizontalAlignment
                                    .get("dummy" + n)
                                    .push(e),
                                  t.fixedNodeSet.has(e) &&
                                    t.fixedNodesOnVertical.add("dummy" + n);
                              });
                        }
                      }
                      if (h.RELAX_MOVEMENT_ON_CONSTRAINTS)
                        (this.shuffle = function (t) {
                          var e, n, r;
                          for (r = t.length - 1; r >= (2 * t.length) / 3; r--)
                            (e = Math.floor(Math.random() * (r + 1))),
                              (n = t[r]),
                              (t[r] = t[e]),
                              (t[e] = n);
                          return t;
                        }),
                          (this.nodesInRelativeHorizontal = []),
                          (this.nodesInRelativeVertical = []),
                          (this.nodeToRelativeConstraintMapHorizontal =
                            new Map()),
                          (this.nodeToRelativeConstraintMapVertical =
                            new Map()),
                          (this.nodeToTempPositionMapHorizontal = new Map()),
                          (this.nodeToTempPositionMapVertical = new Map()),
                          this.constraints.relativePlacementConstraint.forEach(
                            function (e) {
                              if (e.left) {
                                var n = s.has(e.left) ? s.get(e.left) : e.left,
                                  r = s.has(e.right) ? s.get(e.right) : e.right;
                                t.nodesInRelativeHorizontal.includes(n) ||
                                  (t.nodesInRelativeHorizontal.push(n),
                                  t.nodeToRelativeConstraintMapHorizontal.set(
                                    n,
                                    []
                                  ),
                                  t.dummyToNodeForVerticalAlignment.has(n)
                                    ? t.nodeToTempPositionMapHorizontal.set(
                                        n,
                                        t.idToNodeMap
                                          .get(
                                            t.dummyToNodeForVerticalAlignment.get(
                                              n
                                            )[0]
                                          )
                                          .getCenterX()
                                      )
                                    : t.nodeToTempPositionMapHorizontal.set(
                                        n,
                                        t.idToNodeMap.get(n).getCenterX()
                                      )),
                                  t.nodesInRelativeHorizontal.includes(r) ||
                                    (t.nodesInRelativeHorizontal.push(r),
                                    t.nodeToRelativeConstraintMapHorizontal.set(
                                      r,
                                      []
                                    ),
                                    t.dummyToNodeForVerticalAlignment.has(r)
                                      ? t.nodeToTempPositionMapHorizontal.set(
                                          r,
                                          t.idToNodeMap
                                            .get(
                                              t.dummyToNodeForVerticalAlignment.get(
                                                r
                                              )[0]
                                            )
                                            .getCenterX()
                                        )
                                      : t.nodeToTempPositionMapHorizontal.set(
                                          r,
                                          t.idToNodeMap.get(r).getCenterX()
                                        )),
                                  t.nodeToRelativeConstraintMapHorizontal
                                    .get(n)
                                    .push({ right: r, gap: e.gap }),
                                  t.nodeToRelativeConstraintMapHorizontal
                                    .get(r)
                                    .push({ left: n, gap: e.gap });
                              } else {
                                var i = a.has(e.top) ? a.get(e.top) : e.top,
                                  o = a.has(e.bottom)
                                    ? a.get(e.bottom)
                                    : e.bottom;
                                t.nodesInRelativeVertical.includes(i) ||
                                  (t.nodesInRelativeVertical.push(i),
                                  t.nodeToRelativeConstraintMapVertical.set(
                                    i,
                                    []
                                  ),
                                  t.dummyToNodeForHorizontalAlignment.has(i)
                                    ? t.nodeToTempPositionMapVertical.set(
                                        i,
                                        t.idToNodeMap
                                          .get(
                                            t.dummyToNodeForHorizontalAlignment.get(
                                              i
                                            )[0]
                                          )
                                          .getCenterY()
                                      )
                                    : t.nodeToTempPositionMapVertical.set(
                                        i,
                                        t.idToNodeMap.get(i).getCenterY()
                                      )),
                                  t.nodesInRelativeVertical.includes(o) ||
                                    (t.nodesInRelativeVertical.push(o),
                                    t.nodeToRelativeConstraintMapVertical.set(
                                      o,
                                      []
                                    ),
                                    t.dummyToNodeForHorizontalAlignment.has(o)
                                      ? t.nodeToTempPositionMapVertical.set(
                                          o,
                                          t.idToNodeMap
                                            .get(
                                              t.dummyToNodeForHorizontalAlignment.get(
                                                o
                                              )[0]
                                            )
                                            .getCenterY()
                                        )
                                      : t.nodeToTempPositionMapVertical.set(
                                          o,
                                          t.idToNodeMap.get(o).getCenterY()
                                        )),
                                  t.nodeToRelativeConstraintMapVertical
                                    .get(i)
                                    .push({ bottom: o, gap: e.gap }),
                                  t.nodeToRelativeConstraintMapVertical
                                    .get(o)
                                    .push({ top: i, gap: e.gap });
                              }
                            }
                          );
                      else {
                        var l = new Map(),
                          p = new Map();
                        this.constraints.relativePlacementConstraint.forEach(
                          function (t) {
                            if (t.left) {
                              var e = s.has(t.left) ? s.get(t.left) : t.left,
                                n = s.has(t.right) ? s.get(t.right) : t.right;
                              l.has(e) ? l.get(e).push(n) : l.set(e, [n]),
                                l.has(n) ? l.get(n).push(e) : l.set(n, [e]);
                            } else {
                              var r = a.has(t.top) ? a.get(t.top) : t.top,
                                i = a.has(t.bottom)
                                  ? a.get(t.bottom)
                                  : t.bottom;
                              p.has(r) ? p.get(r).push(i) : p.set(r, [i]),
                                p.has(i) ? p.get(i).push(r) : p.set(i, [r]);
                            }
                          }
                        );
                        var f = function (t, e) {
                            var n = [],
                              r = [],
                              i = new E(),
                              o = new Set(),
                              s = 0;
                            return (
                              t.forEach(function (a, h) {
                                if (!o.has(h)) {
                                  (n[s] = []), (r[s] = !1);
                                  var u = h;
                                  for (
                                    i.push(u), o.add(u), n[s].push(u);
                                    0 != i.length;

                                  )
                                    (u = i.shift()),
                                      e.has(u) && (r[s] = !0),
                                      t.get(u).forEach(function (t) {
                                        o.has(t) ||
                                          (i.push(t), o.add(t), n[s].push(t));
                                      });
                                  s++;
                                }
                              }),
                              { components: n, isFixed: r }
                            );
                          },
                          d = f(l, t.fixedNodesOnHorizontal);
                        (this.componentsOnHorizontal = d.components),
                          (this.fixedComponentsOnHorizontal = d.isFixed);
                        var g = f(p, t.fixedNodesOnVertical);
                        (this.componentsOnVertical = g.components),
                          (this.fixedComponentsOnVertical = g.isFixed);
                      }
                    }
                  }),
                  (b.prototype.updateDisplacements = function () {
                    var t = this;
                    if (
                      (this.constraints.fixedNodeConstraint &&
                        this.constraints.fixedNodeConstraint.forEach(function (
                          e
                        ) {
                          var n = t.idToNodeMap.get(e.nodeId);
                          (n.displacementX = 0), (n.displacementY = 0);
                        }),
                      this.constraints.alignmentConstraint)
                    ) {
                      if (this.constraints.alignmentConstraint.vertical)
                        for (
                          var e = this.constraints.alignmentConstraint.vertical,
                            n = 0;
                          n < e.length;
                          n++
                        ) {
                          for (var r = 0, i = 0; i < e[n].length; i++) {
                            if (this.fixedNodeSet.has(e[n][i])) {
                              r = 0;
                              break;
                            }
                            r += this.idToNodeMap.get(e[n][i]).displacementX;
                          }
                          var o = r / e[n].length;
                          for (i = 0; i < e[n].length; i++)
                            this.idToNodeMap.get(e[n][i]).displacementX = o;
                        }
                      if (this.constraints.alignmentConstraint.horizontal) {
                        var s = this.constraints.alignmentConstraint.horizontal;
                        for (n = 0; n < s.length; n++) {
                          var a = 0;
                          for (i = 0; i < s[n].length; i++) {
                            if (this.fixedNodeSet.has(s[n][i])) {
                              a = 0;
                              break;
                            }
                            a += this.idToNodeMap.get(s[n][i]).displacementY;
                          }
                          var u = a / s[n].length;
                          for (i = 0; i < s[n].length; i++)
                            this.idToNodeMap.get(s[n][i]).displacementY = u;
                        }
                      }
                    }
                    if (this.constraints.relativePlacementConstraint)
                      if (h.RELAX_MOVEMENT_ON_CONSTRAINTS)
                        this.totalIterations % 10 == 0 &&
                          (this.shuffle(this.nodesInRelativeHorizontal),
                          this.shuffle(this.nodesInRelativeVertical)),
                          this.nodesInRelativeHorizontal.forEach(function (e) {
                            if (!t.fixedNodesOnHorizontal.has(e)) {
                              var n = 0;
                              (n = t.dummyToNodeForVerticalAlignment.has(e)
                                ? t.idToNodeMap.get(
                                    t.dummyToNodeForVerticalAlignment.get(e)[0]
                                  ).displacementX
                                : t.idToNodeMap.get(e).displacementX),
                                t.nodeToRelativeConstraintMapHorizontal
                                  .get(e)
                                  .forEach(function (r) {
                                    var i;
                                    r.right
                                      ? (i =
                                          t.nodeToTempPositionMapHorizontal.get(
                                            r.right
                                          ) -
                                          t.nodeToTempPositionMapHorizontal.get(
                                            e
                                          ) -
                                          n) < r.gap && (n -= r.gap - i)
                                      : (i =
                                          t.nodeToTempPositionMapHorizontal.get(
                                            e
                                          ) -
                                          t.nodeToTempPositionMapHorizontal.get(
                                            r.left
                                          ) +
                                          n) < r.gap && (n += r.gap - i);
                                  }),
                                t.nodeToTempPositionMapHorizontal.set(
                                  e,
                                  t.nodeToTempPositionMapHorizontal.get(e) + n
                                ),
                                t.dummyToNodeForVerticalAlignment.has(e)
                                  ? t.dummyToNodeForVerticalAlignment
                                      .get(e)
                                      .forEach(function (e) {
                                        t.idToNodeMap.get(e).displacementX = n;
                                      })
                                  : (t.idToNodeMap.get(e).displacementX = n);
                            }
                          }),
                          this.nodesInRelativeVertical.forEach(function (e) {
                            if (!t.fixedNodesOnHorizontal.has(e)) {
                              var n = 0;
                              (n = t.dummyToNodeForHorizontalAlignment.has(e)
                                ? t.idToNodeMap.get(
                                    t.dummyToNodeForHorizontalAlignment.get(
                                      e
                                    )[0]
                                  ).displacementY
                                : t.idToNodeMap.get(e).displacementY),
                                t.nodeToRelativeConstraintMapVertical
                                  .get(e)
                                  .forEach(function (r) {
                                    var i;
                                    r.bottom
                                      ? (i =
                                          t.nodeToTempPositionMapVertical.get(
                                            r.bottom
                                          ) -
                                          t.nodeToTempPositionMapVertical.get(
                                            e
                                          ) -
                                          n) < r.gap && (n -= r.gap - i)
                                      : (i =
                                          t.nodeToTempPositionMapVertical.get(
                                            e
                                          ) -
                                          t.nodeToTempPositionMapVertical.get(
                                            r.top
                                          ) +
                                          n) < r.gap && (n += r.gap - i);
                                  }),
                                t.nodeToTempPositionMapVertical.set(
                                  e,
                                  t.nodeToTempPositionMapVertical.get(e) + n
                                ),
                                t.dummyToNodeForHorizontalAlignment.has(e)
                                  ? t.dummyToNodeForHorizontalAlignment
                                      .get(e)
                                      .forEach(function (e) {
                                        t.idToNodeMap.get(e).displacementY = n;
                                      })
                                  : (t.idToNodeMap.get(e).displacementY = n);
                            }
                          });
                      else {
                        for (
                          n = 0;
                          n < this.componentsOnHorizontal.length;
                          n++
                        ) {
                          var c = this.componentsOnHorizontal[n];
                          if (this.fixedComponentsOnHorizontal[n])
                            for (i = 0; i < c.length; i++)
                              this.dummyToNodeForVerticalAlignment.has(c[i])
                                ? this.dummyToNodeForVerticalAlignment
                                    .get(c[i])
                                    .forEach(function (e) {
                                      t.idToNodeMap.get(e).displacementX = 0;
                                    })
                                : (this.idToNodeMap.get(
                                    c[i]
                                  ).displacementX = 0);
                          else {
                            var l = 0,
                              p = 0;
                            for (i = 0; i < c.length; i++)
                              this.dummyToNodeForVerticalAlignment.has(c[i])
                                ? ((l +=
                                    (d =
                                      this.dummyToNodeForVerticalAlignment.get(
                                        c[i]
                                      )).length *
                                    this.idToNodeMap.get(d[0]).displacementX),
                                  (p += d.length))
                                : ((l += this.idToNodeMap.get(
                                    c[i]
                                  ).displacementX),
                                  p++);
                            var f = l / p;
                            for (i = 0; i < c.length; i++)
                              this.dummyToNodeForVerticalAlignment.has(c[i])
                                ? this.dummyToNodeForVerticalAlignment
                                    .get(c[i])
                                    .forEach(function (e) {
                                      t.idToNodeMap.get(e).displacementX = f;
                                    })
                                : (this.idToNodeMap.get(c[i]).displacementX =
                                    f);
                          }
                        }
                        for (n = 0; n < this.componentsOnVertical.length; n++)
                          if (
                            ((c = this.componentsOnVertical[n]),
                            this.fixedComponentsOnVertical[n])
                          )
                            for (i = 0; i < c.length; i++)
                              this.dummyToNodeForHorizontalAlignment.has(c[i])
                                ? this.dummyToNodeForHorizontalAlignment
                                    .get(c[i])
                                    .forEach(function (e) {
                                      t.idToNodeMap.get(e).displacementY = 0;
                                    })
                                : (this.idToNodeMap.get(
                                    c[i]
                                  ).displacementY = 0);
                          else {
                            for (l = 0, p = 0, i = 0; i < c.length; i++) {
                              var d;
                              this.dummyToNodeForHorizontalAlignment.has(c[i])
                                ? ((l +=
                                    (d =
                                      this.dummyToNodeForHorizontalAlignment.get(
                                        c[i]
                                      )).length *
                                    this.idToNodeMap.get(d[0]).displacementY),
                                  (p += d.length))
                                : ((l += this.idToNodeMap.get(
                                    c[i]
                                  ).displacementY),
                                  p++);
                            }
                            for (f = l / p, i = 0; i < c.length; i++)
                              this.dummyToNodeForHorizontalAlignment.has(c[i])
                                ? this.dummyToNodeForHorizontalAlignment
                                    .get(c[i])
                                    .forEach(function (e) {
                                      t.idToNodeMap.get(e).displacementY = f;
                                    })
                                : (this.idToNodeMap.get(c[i]).displacementY =
                                    f);
                          }
                      }
                  }),
                  (b.prototype.calculateNodesToApplyGravitationTo =
                    function () {
                      var t,
                        e,
                        n = [],
                        r = this.graphManager.getGraphs(),
                        i = r.length;
                      for (e = 0; e < i; e++)
                        (t = r[e]).updateConnected(),
                          t.isConnected || (n = n.concat(t.getNodes()));
                      return n;
                    }),
                  (b.prototype.createBendpoints = function () {
                    var t = [];
                    t = t.concat(this.graphManager.getAllEdges());
                    var e,
                      n = new Set();
                    for (e = 0; e < t.length; e++) {
                      var r = t[e];
                      if (!n.has(r)) {
                        var i = r.getSource(),
                          o = r.getTarget();
                        if (i == o)
                          r.getBendpoints().push(new f()),
                            r.getBendpoints().push(new f()),
                            this.createDummyNodesForBendpoints(r),
                            n.add(r);
                        else {
                          var s = [];
                          if (
                            ((s = (s = s.concat(i.getEdgeListToNode(o))).concat(
                              o.getEdgeListToNode(i)
                            )),
                            !n.has(s[0]))
                          ) {
                            var a;
                            if (s.length > 1)
                              for (a = 0; a < s.length; a++) {
                                var h = s[a];
                                h.getBendpoints().push(new f()),
                                  this.createDummyNodesForBendpoints(h);
                              }
                            s.forEach(function (t) {
                              n.add(t);
                            });
                          }
                        }
                      }
                      if (n.size == t.length) break;
                    }
                  }),
                  (b.prototype.positionNodesRadially = function (t) {
                    for (
                      var e = new p(0, 0),
                        n = Math.ceil(Math.sqrt(t.length)),
                        r = 0,
                        i = 0,
                        o = 0,
                        s = new f(0, 0),
                        a = 0;
                      a < t.length;
                      a++
                    ) {
                      a % n == 0 &&
                        ((o = 0),
                        (i = r),
                        0 != a && (i += h.DEFAULT_COMPONENT_SEPERATION),
                        (r = 0));
                      var u = t[a],
                        c = g.findCenterOfTree(u);
                      (e.x = o),
                        (e.y = i),
                        (s = b.radialLayout(u, c, e)).y > r &&
                          (r = Math.floor(s.y)),
                        (o = Math.floor(s.x + h.DEFAULT_COMPONENT_SEPERATION));
                    }
                    this.transform(
                      new f(
                        l.WORLD_CENTER_X - s.x / 2,
                        l.WORLD_CENTER_Y - s.y / 2
                      )
                    );
                  }),
                  (b.radialLayout = function (t, e, n) {
                    var r = Math.max(
                      this.maxDiagonalInTree(t),
                      h.DEFAULT_RADIAL_SEPARATION
                    );
                    b.branchRadialLayout(e, null, 0, 359, 0, r);
                    var i = m.calculateBounds(t),
                      o = new _();
                    o.setDeviceOrgX(i.getMinX()),
                      o.setDeviceOrgY(i.getMinY()),
                      o.setWorldOrgX(n.x),
                      o.setWorldOrgY(n.y);
                    for (var s = 0; s < t.length; s++) t[s].transform(o);
                    var a = new f(i.getMaxX(), i.getMaxY());
                    return o.inverseTransformPoint(a);
                  }),
                  (b.branchRadialLayout = function (t, e, n, r, i, o) {
                    var s = (r - n + 1) / 2;
                    s < 0 && (s += 180);
                    var a = (((s + n) % 360) * y.TWO_PI) / 360,
                      h = (Math.cos(a), i * Math.cos(a)),
                      u = i * Math.sin(a);
                    t.setCenter(h, u);
                    var c = [],
                      l = (c = c.concat(t.getEdges())).length;
                    null != e && l--;
                    for (
                      var p, f = 0, d = c.length, g = t.getEdgesBetween(e);
                      g.length > 1;

                    ) {
                      var v = g[0];
                      g.splice(0, 1);
                      var m = c.indexOf(v);
                      m >= 0 && c.splice(m, 1), d--, l--;
                    }
                    p = null != e ? (c.indexOf(g[0]) + 1) % d : 0;
                    for (
                      var _ = Math.abs(r - n) / l, E = p;
                      f != l;
                      E = ++E % d
                    ) {
                      var w = c[E].getOtherEnd(t);
                      if (w != e) {
                        var N = (n + f * _) % 360,
                          x = (N + _) % 360;
                        b.branchRadialLayout(w, t, N, x, i + o, o), f++;
                      }
                    }
                  }),
                  (b.maxDiagonalInTree = function (t) {
                    for (var e = v.MIN_VALUE, n = 0; n < t.length; n++) {
                      var r = t[n].getDiagonal();
                      r > e && (e = r);
                    }
                    return e;
                  }),
                  (b.prototype.calcRepulsionRange = function () {
                    return 2 * (this.level + 1) * this.idealEdgeLength;
                  }),
                  (b.prototype.groupZeroDegreeMembers = function () {
                    var t = this,
                      e = {};
                    (this.memberGroups = {}), (this.idToDummyNode = {});
                    for (
                      var n = [], r = this.graphManager.getAllNodes(), i = 0;
                      i < r.length;
                      i++
                    ) {
                      var o = (a = r[i]).getParent();
                      0 !== this.getNodeDegreeWithChildren(a) ||
                        (null != o.id && this.getToBeTiled(o)) ||
                        n.push(a);
                    }
                    for (i = 0; i < n.length; i++) {
                      var a,
                        h = (a = n[i]).getParent().id;
                      void 0 === e[h] && (e[h] = []), (e[h] = e[h].concat(a));
                    }
                    Object.keys(e).forEach(function (n) {
                      if (e[n].length > 1) {
                        var r = "DummyCompound_" + n;
                        t.memberGroups[r] = e[n];
                        var i = e[n][0].getParent(),
                          o = new s(t.graphManager);
                        (o.id = r),
                          (o.paddingLeft = i.paddingLeft || 0),
                          (o.paddingRight = i.paddingRight || 0),
                          (o.paddingBottom = i.paddingBottom || 0),
                          (o.paddingTop = i.paddingTop || 0),
                          (t.idToDummyNode[r] = o);
                        var a = t.getGraphManager().add(t.newGraph(), o),
                          h = i.getChild();
                        h.add(o);
                        for (var u = 0; u < e[n].length; u++) {
                          var c = e[n][u];
                          h.remove(c), a.add(c);
                        }
                      }
                    });
                  }),
                  (b.prototype.clearCompounds = function () {
                    var t = {},
                      e = {};
                    this.performDFSOnCompounds();
                    for (var n = 0; n < this.compoundOrder.length; n++)
                      (e[this.compoundOrder[n].id] = this.compoundOrder[n]),
                        (t[this.compoundOrder[n].id] = [].concat(
                          this.compoundOrder[n].getChild().getNodes()
                        )),
                        this.graphManager.remove(
                          this.compoundOrder[n].getChild()
                        ),
                        (this.compoundOrder[n].child = null);
                    this.graphManager.resetAllNodes(),
                      this.tileCompoundMembers(t, e);
                  }),
                  (b.prototype.clearZeroDegreeMembers = function () {
                    var t = this,
                      e = (this.tiledZeroDegreePack = []);
                    Object.keys(this.memberGroups).forEach(function (n) {
                      var r = t.idToDummyNode[n];
                      if (
                        ((e[n] = t.tileNodes(
                          t.memberGroups[n],
                          r.paddingLeft + r.paddingRight
                        )),
                        (r.rect.width = e[n].width),
                        (r.rect.height = e[n].height),
                        r.setCenter(e[n].centerX, e[n].centerY),
                        (r.labelMarginLeft = 0),
                        (r.labelMarginTop = 0),
                        h.NODE_DIMENSIONS_INCLUDE_LABELS)
                      ) {
                        var i = r.rect.width,
                          o = r.rect.height;
                        r.labelWidth &&
                          ("left" == r.labelPosHorizontal
                            ? ((r.rect.x -= r.labelWidth),
                              r.setWidth(i + r.labelWidth),
                              (r.labelMarginLeft = r.labelWidth))
                            : "center" == r.labelPosHorizontal &&
                              r.labelWidth > i
                            ? ((r.rect.x -= (r.labelWidth - i) / 2),
                              r.setWidth(r.labelWidth),
                              (r.labelMarginLeft = (r.labelWidth - i) / 2))
                            : "right" == r.labelPosHorizontal &&
                              r.setWidth(i + r.labelWidth)),
                          r.labelHeight &&
                            ("top" == r.labelPosVertical
                              ? ((r.rect.y -= r.labelHeight),
                                r.setHeight(o + r.labelHeight),
                                (r.labelMarginTop = r.labelHeight))
                              : "center" == r.labelPosVertical &&
                                r.labelHeight > o
                              ? ((r.rect.y -= (r.labelHeight - o) / 2),
                                r.setHeight(r.labelHeight),
                                (r.labelMarginTop = (r.labelHeight - o) / 2))
                              : "bottom" == r.labelPosVertical &&
                                r.setHeight(o + r.labelHeight));
                      }
                    });
                  }),
                  (b.prototype.repopulateCompounds = function () {
                    for (var t = this.compoundOrder.length - 1; t >= 0; t--) {
                      var e = this.compoundOrder[t],
                        n = e.id,
                        r = e.paddingLeft,
                        i = e.paddingTop,
                        o = e.labelMarginLeft,
                        s = e.labelMarginTop;
                      this.adjustLocations(
                        this.tiledMemberPack[n],
                        e.rect.x,
                        e.rect.y,
                        r,
                        i,
                        o,
                        s
                      );
                    }
                  }),
                  (b.prototype.repopulateZeroDegreeMembers = function () {
                    var t = this,
                      e = this.tiledZeroDegreePack;
                    Object.keys(e).forEach(function (n) {
                      var r = t.idToDummyNode[n],
                        i = r.paddingLeft,
                        o = r.paddingTop,
                        s = r.labelMarginLeft,
                        a = r.labelMarginTop;
                      t.adjustLocations(e[n], r.rect.x, r.rect.y, i, o, s, a);
                    });
                  }),
                  (b.prototype.getToBeTiled = function (t) {
                    var e = t.id;
                    if (null != this.toBeTiled[e]) return this.toBeTiled[e];
                    var n = t.getChild();
                    if (null == n) return (this.toBeTiled[e] = !1), !1;
                    for (var r = n.getNodes(), i = 0; i < r.length; i++) {
                      var o = r[i];
                      if (this.getNodeDegree(o) > 0)
                        return (this.toBeTiled[e] = !1), !1;
                      if (null != o.getChild()) {
                        if (!this.getToBeTiled(o))
                          return (this.toBeTiled[e] = !1), !1;
                      } else this.toBeTiled[o.id] = !1;
                    }
                    return (this.toBeTiled[e] = !0), !0;
                  }),
                  (b.prototype.getNodeDegree = function (t) {
                    t.id;
                    for (
                      var e = t.getEdges(), n = 0, r = 0;
                      r < e.length;
                      r++
                    ) {
                      var i = e[r];
                      i.getSource().id !== i.getTarget().id && (n += 1);
                    }
                    return n;
                  }),
                  (b.prototype.getNodeDegreeWithChildren = function (t) {
                    var e = this.getNodeDegree(t);
                    if (null == t.getChild()) return e;
                    for (
                      var n = t.getChild().getNodes(), r = 0;
                      r < n.length;
                      r++
                    ) {
                      var i = n[r];
                      e += this.getNodeDegreeWithChildren(i);
                    }
                    return e;
                  }),
                  (b.prototype.performDFSOnCompounds = function () {
                    (this.compoundOrder = []),
                      this.fillCompexOrderByDFS(
                        this.graphManager.getRoot().getNodes()
                      );
                  }),
                  (b.prototype.fillCompexOrderByDFS = function (t) {
                    for (var e = 0; e < t.length; e++) {
                      var n = t[e];
                      null != n.getChild() &&
                        this.fillCompexOrderByDFS(n.getChild().getNodes()),
                        this.getToBeTiled(n) && this.compoundOrder.push(n);
                    }
                  }),
                  (b.prototype.adjustLocations = function (
                    t,
                    e,
                    n,
                    r,
                    i,
                    o,
                    s
                  ) {
                    n += i + s;
                    for (var a = (e += r + o), h = 0; h < t.rows.length; h++) {
                      var u = t.rows[h];
                      e = a;
                      for (var c = 0, l = 0; l < u.length; l++) {
                        var p = u[l];
                        (p.rect.x = e),
                          (p.rect.y = n),
                          (e += p.rect.width + t.horizontalPadding),
                          p.rect.height > c && (c = p.rect.height);
                      }
                      n += c + t.verticalPadding;
                    }
                  }),
                  (b.prototype.tileCompoundMembers = function (t, e) {
                    var n = this;
                    (this.tiledMemberPack = []),
                      Object.keys(t).forEach(function (r) {
                        var i = e[r];
                        if (
                          ((n.tiledMemberPack[r] = n.tileNodes(
                            t[r],
                            i.paddingLeft + i.paddingRight
                          )),
                          (i.rect.width = n.tiledMemberPack[r].width),
                          (i.rect.height = n.tiledMemberPack[r].height),
                          i.setCenter(
                            n.tiledMemberPack[r].centerX,
                            n.tiledMemberPack[r].centerY
                          ),
                          (i.labelMarginLeft = 0),
                          (i.labelMarginTop = 0),
                          h.NODE_DIMENSIONS_INCLUDE_LABELS)
                        ) {
                          var o = i.rect.width,
                            s = i.rect.height;
                          i.labelWidth &&
                            ("left" == i.labelPosHorizontal
                              ? ((i.rect.x -= i.labelWidth),
                                i.setWidth(o + i.labelWidth),
                                (i.labelMarginLeft = i.labelWidth))
                              : "center" == i.labelPosHorizontal &&
                                i.labelWidth > o
                              ? ((i.rect.x -= (i.labelWidth - o) / 2),
                                i.setWidth(i.labelWidth),
                                (i.labelMarginLeft = (i.labelWidth - o) / 2))
                              : "right" == i.labelPosHorizontal &&
                                i.setWidth(o + i.labelWidth)),
                            i.labelHeight &&
                              ("top" == i.labelPosVertical
                                ? ((i.rect.y -= i.labelHeight),
                                  i.setHeight(s + i.labelHeight),
                                  (i.labelMarginTop = i.labelHeight))
                                : "center" == i.labelPosVertical &&
                                  i.labelHeight > s
                                ? ((i.rect.y -= (i.labelHeight - s) / 2),
                                  i.setHeight(i.labelHeight),
                                  (i.labelMarginTop = (i.labelHeight - s) / 2))
                                : "bottom" == i.labelPosVertical &&
                                  i.setHeight(s + i.labelHeight));
                        }
                      });
                  }),
                  (b.prototype.tileNodes = function (t, e) {
                    var n = this.tileNodesByFavoringDim(t, e, !0),
                      r = this.tileNodesByFavoringDim(t, e, !1),
                      i = this.getOrgRatio(n);
                    return this.getOrgRatio(r) < i ? r : n;
                  }),
                  (b.prototype.getOrgRatio = function (t) {
                    var e = t.width / t.height;
                    return e < 1 && (e = 1 / e), e;
                  }),
                  (b.prototype.calcIdealRowWidth = function (t, e) {
                    var n = h.TILING_PADDING_VERTICAL,
                      r = h.TILING_PADDING_HORIZONTAL,
                      i = t.length,
                      o = 0,
                      s = 0,
                      a = 0;
                    t.forEach(function (t) {
                      (o += t.getWidth()),
                        (s += t.getHeight()),
                        t.getWidth() > a && (a = t.getWidth());
                    });
                    var u,
                      c = o / i,
                      l = s / i,
                      p = Math.pow(n - r, 2) + 4 * (c + r) * (l + n) * i,
                      f = (r - n + Math.sqrt(p)) / (2 * (c + r));
                    e ? (u = Math.ceil(f)) == f && u++ : (u = Math.floor(f));
                    var d = u * (c + r) - r;
                    return a > d && (d = a), d + 2 * r;
                  }),
                  (b.prototype.tileNodesByFavoringDim = function (t, e, n) {
                    var r = h.TILING_PADDING_VERTICAL,
                      i = h.TILING_PADDING_HORIZONTAL,
                      o = h.TILING_COMPARE_BY,
                      s = {
                        rows: [],
                        rowWidth: [],
                        rowHeight: [],
                        width: 0,
                        height: e,
                        verticalPadding: r,
                        horizontalPadding: i,
                        centerX: 0,
                        centerY: 0,
                      };
                    o && (s.idealRowWidth = this.calcIdealRowWidth(t, n));
                    var a = function (t) {
                        return t.rect.width * t.rect.height;
                      },
                      u = function (t, e) {
                        return a(e) - a(t);
                      };
                    t.sort(function (t, e) {
                      var n = u;
                      return s.idealRowWidth ? (n = o)(t.id, e.id) : n(t, e);
                    });
                    for (var c = 0, l = 0, p = 0; p < t.length; p++)
                      (c += (f = t[p]).getCenterX()), (l += f.getCenterY());
                    for (
                      s.centerX = c / t.length, s.centerY = l / t.length, p = 0;
                      p < t.length;
                      p++
                    ) {
                      var f = t[p];
                      if (0 == s.rows.length) this.insertNodeToRow(s, f, 0, e);
                      else if (
                        this.canAddHorizontal(s, f.rect.width, f.rect.height)
                      ) {
                        var d = s.rows.length - 1;
                        s.idealRowWidth || (d = this.getShortestRowIndex(s)),
                          this.insertNodeToRow(s, f, d, e);
                      } else this.insertNodeToRow(s, f, s.rows.length, e);
                      this.shiftToLastRow(s);
                    }
                    return s;
                  }),
                  (b.prototype.insertNodeToRow = function (t, e, n, r) {
                    var i = r;
                    n == t.rows.length &&
                      (t.rows.push([]),
                      t.rowWidth.push(i),
                      t.rowHeight.push(0));
                    var o = t.rowWidth[n] + e.rect.width;
                    t.rows[n].length > 0 && (o += t.horizontalPadding),
                      (t.rowWidth[n] = o),
                      t.width < o && (t.width = o);
                    var s = e.rect.height;
                    n > 0 && (s += t.verticalPadding);
                    var a = 0;
                    s > t.rowHeight[n] &&
                      ((a = t.rowHeight[n]),
                      (t.rowHeight[n] = s),
                      (a = t.rowHeight[n] - a)),
                      (t.height += a),
                      t.rows[n].push(e);
                  }),
                  (b.prototype.getShortestRowIndex = function (t) {
                    for (
                      var e = -1, n = Number.MAX_VALUE, r = 0;
                      r < t.rows.length;
                      r++
                    )
                      t.rowWidth[r] < n && ((e = r), (n = t.rowWidth[r]));
                    return e;
                  }),
                  (b.prototype.getLongestRowIndex = function (t) {
                    for (
                      var e = -1, n = Number.MIN_VALUE, r = 0;
                      r < t.rows.length;
                      r++
                    )
                      t.rowWidth[r] > n && ((e = r), (n = t.rowWidth[r]));
                    return e;
                  }),
                  (b.prototype.canAddHorizontal = function (t, e, n) {
                    if (t.idealRowWidth) {
                      var r = t.rows.length - 1;
                      return (
                        t.rowWidth[r] + e + t.horizontalPadding <=
                        t.idealRowWidth
                      );
                    }
                    var i = this.getShortestRowIndex(t);
                    if (i < 0) return !0;
                    var o = t.rowWidth[i];
                    if (o + t.horizontalPadding + e <= t.width) return !0;
                    var s,
                      a,
                      h = 0;
                    return (
                      t.rowHeight[i] < n &&
                        i > 0 &&
                        (h = n + t.verticalPadding - t.rowHeight[i]),
                      (s =
                        t.width - o >= e + t.horizontalPadding
                          ? (t.height + h) / (o + e + t.horizontalPadding)
                          : (t.height + h) / t.width),
                      (h = n + t.verticalPadding),
                      (a =
                        t.width < e
                          ? (t.height + h) / e
                          : (t.height + h) / t.width) < 1 && (a = 1 / a),
                      s < 1 && (s = 1 / s),
                      s < a
                    );
                  }),
                  (b.prototype.shiftToLastRow = function (t) {
                    var e = this.getLongestRowIndex(t),
                      n = t.rowWidth.length - 1,
                      r = t.rows[e],
                      i = r[r.length - 1],
                      o = i.width + t.horizontalPadding;
                    if (t.width - t.rowWidth[n] > o && e != n) {
                      r.splice(-1, 1),
                        t.rows[n].push(i),
                        (t.rowWidth[e] = t.rowWidth[e] - o),
                        (t.rowWidth[n] = t.rowWidth[n] + o),
                        (t.width = t.rowWidth[instance.getLongestRowIndex(t)]);
                      for (var s = Number.MIN_VALUE, a = 0; a < r.length; a++)
                        r[a].height > s && (s = r[a].height);
                      e > 0 && (s += t.verticalPadding);
                      var h = t.rowHeight[e] + t.rowHeight[n];
                      (t.rowHeight[e] = s),
                        t.rowHeight[n] < i.height + t.verticalPadding &&
                          (t.rowHeight[n] = i.height + t.verticalPadding);
                      var u = t.rowHeight[e] + t.rowHeight[n];
                      (t.height += u - h), this.shiftToLastRow(t);
                    }
                  }),
                  (b.prototype.tilingPreLayout = function () {
                    h.TILE &&
                      (this.groupZeroDegreeMembers(),
                      this.clearCompounds(),
                      this.clearZeroDegreeMembers());
                  }),
                  (b.prototype.tilingPostLayout = function () {
                    h.TILE &&
                      (this.repopulateZeroDegreeMembers(),
                      this.repopulateCompounds());
                  }),
                  (b.prototype.reduceTrees = function () {
                    for (var t, e = [], n = !0; n; ) {
                      var r = this.graphManager.getAllNodes(),
                        i = [];
                      n = !1;
                      for (var o = 0; o < r.length; o++)
                        if (
                          1 == (t = r[o]).getEdges().length &&
                          !t.getEdges()[0].isInterGraph &&
                          null == t.getChild()
                        ) {
                          if (h.PURE_INCREMENTAL) {
                            var s = t.getEdges()[0].getOtherEnd(t),
                              a = new d(
                                t.getCenterX() - s.getCenterX(),
                                t.getCenterY() - s.getCenterY()
                              );
                            i.push([t, t.getEdges()[0], t.getOwner(), a]);
                          } else i.push([t, t.getEdges()[0], t.getOwner()]);
                          n = !0;
                        }
                      if (1 == n) {
                        for (var u = [], c = 0; c < i.length; c++)
                          1 == i[c][0].getEdges().length &&
                            (u.push(i[c]), i[c][0].getOwner().remove(i[c][0]));
                        e.push(u),
                          this.graphManager.resetAllNodes(),
                          this.graphManager.resetAllEdges();
                      }
                    }
                    this.prunedNodesAll = e;
                  }),
                  (b.prototype.growTree = function (t) {
                    for (var e, n = t[t.length - 1], r = 0; r < n.length; r++)
                      (e = n[r]),
                        this.findPlaceforPrunedNode(e),
                        e[2].add(e[0]),
                        e[2].add(e[1], e[1].source, e[1].target);
                    t.splice(t.length - 1, 1),
                      this.graphManager.resetAllNodes(),
                      this.graphManager.resetAllEdges();
                  }),
                  (b.prototype.findPlaceforPrunedNode = function (t) {
                    var e,
                      n,
                      r = t[0];
                    if (
                      ((n = r == t[1].source ? t[1].target : t[1].source),
                      h.PURE_INCREMENTAL)
                    )
                      r.setCenter(
                        n.getCenterX() + t[3].getWidth(),
                        n.getCenterY() + t[3].getHeight()
                      );
                    else {
                      var i = n.startX,
                        o = n.finishX,
                        s = n.startY,
                        a = n.finishY,
                        u = [0, 0, 0, 0];
                      if (s > 0)
                        for (var l = i; l <= o; l++)
                          u[0] +=
                            this.grid[l][s - 1].length +
                            this.grid[l][s].length -
                            1;
                      if (o < this.grid.length - 1)
                        for (l = s; l <= a; l++)
                          u[1] +=
                            this.grid[o + 1][l].length +
                            this.grid[o][l].length -
                            1;
                      if (a < this.grid[0].length - 1)
                        for (l = i; l <= o; l++)
                          u[2] +=
                            this.grid[l][a + 1].length +
                            this.grid[l][a].length -
                            1;
                      if (i > 0)
                        for (l = s; l <= a; l++)
                          u[3] +=
                            this.grid[i - 1][l].length +
                            this.grid[i][l].length -
                            1;
                      for (var p, f, d = v.MAX_VALUE, g = 0; g < u.length; g++)
                        u[g] < d
                          ? ((d = u[g]), (p = 1), (f = g))
                          : u[g] == d && p++;
                      if (3 == p && 0 == d)
                        0 == u[0] && 0 == u[1] && 0 == u[2]
                          ? (e = 1)
                          : 0 == u[0] && 0 == u[1] && 0 == u[3]
                          ? (e = 0)
                          : 0 == u[0] && 0 == u[2] && 0 == u[3]
                          ? (e = 3)
                          : 0 == u[1] && 0 == u[2] && 0 == u[3] && (e = 2);
                      else if (2 == p && 0 == d) {
                        var y = Math.floor(2 * Math.random());
                        e =
                          0 == u[0] && 0 == u[1]
                            ? 0 == y
                              ? 0
                              : 1
                            : 0 == u[0] && 0 == u[2]
                            ? 0 == y
                              ? 0
                              : 2
                            : 0 == u[0] && 0 == u[3]
                            ? 0 == y
                              ? 0
                              : 3
                            : 0 == u[1] && 0 == u[2]
                            ? 0 == y
                              ? 1
                              : 2
                            : 0 == u[1] && 0 == u[3]
                            ? 0 == y
                              ? 1
                              : 3
                            : 0 == y
                            ? 2
                            : 3;
                      } else
                        e =
                          4 == p && 0 == d
                            ? (y = Math.floor(4 * Math.random()))
                            : f;
                      0 == e
                        ? r.setCenter(
                            n.getCenterX(),
                            n.getCenterY() -
                              n.getHeight() / 2 -
                              c.DEFAULT_EDGE_LENGTH -
                              r.getHeight() / 2
                          )
                        : 1 == e
                        ? r.setCenter(
                            n.getCenterX() +
                              n.getWidth() / 2 +
                              c.DEFAULT_EDGE_LENGTH +
                              r.getWidth() / 2,
                            n.getCenterY()
                          )
                        : 2 == e
                        ? r.setCenter(
                            n.getCenterX(),
                            n.getCenterY() +
                              n.getHeight() / 2 +
                              c.DEFAULT_EDGE_LENGTH +
                              r.getHeight() / 2
                          )
                        : r.setCenter(
                            n.getCenterX() -
                              n.getWidth() / 2 -
                              c.DEFAULT_EDGE_LENGTH -
                              r.getWidth() / 2,
                            n.getCenterY()
                          );
                    }
                  }),
                  (t.exports = b);
              },
              991: (t, e, n) => {
                var r = n(551).FDLayoutNode,
                  i = n(551).IMath;
                function o(t, e, n, i) {
                  r.call(this, t, e, n, i);
                }
                for (var s in ((o.prototype = Object.create(r.prototype)), r))
                  o[s] = r[s];
                (o.prototype.calculateDisplacement = function () {
                  var t = this.graphManager.getLayout();
                  null != this.getChild() && this.fixedNodeWeight
                    ? ((this.displacementX +=
                        (t.coolingFactor *
                          (this.springForceX +
                            this.repulsionForceX +
                            this.gravitationForceX)) /
                        this.fixedNodeWeight),
                      (this.displacementY +=
                        (t.coolingFactor *
                          (this.springForceY +
                            this.repulsionForceY +
                            this.gravitationForceY)) /
                        this.fixedNodeWeight))
                    : ((this.displacementX +=
                        (t.coolingFactor *
                          (this.springForceX +
                            this.repulsionForceX +
                            this.gravitationForceX)) /
                        this.noOfChildren),
                      (this.displacementY +=
                        (t.coolingFactor *
                          (this.springForceY +
                            this.repulsionForceY +
                            this.gravitationForceY)) /
                        this.noOfChildren)),
                    Math.abs(this.displacementX) >
                      t.coolingFactor * t.maxNodeDisplacement &&
                      (this.displacementX =
                        t.coolingFactor *
                        t.maxNodeDisplacement *
                        i.sign(this.displacementX)),
                    Math.abs(this.displacementY) >
                      t.coolingFactor * t.maxNodeDisplacement &&
                      (this.displacementY =
                        t.coolingFactor *
                        t.maxNodeDisplacement *
                        i.sign(this.displacementY)),
                    this.child &&
                      this.child.getNodes().length > 0 &&
                      this.propogateDisplacementToChildren(
                        this.displacementX,
                        this.displacementY
                      );
                }),
                  (o.prototype.propogateDisplacementToChildren = function (
                    t,
                    e
                  ) {
                    for (
                      var n, r = this.getChild().getNodes(), i = 0;
                      i < r.length;
                      i++
                    )
                      null == (n = r[i]).getChild()
                        ? ((n.displacementX += t), (n.displacementY += e))
                        : n.propogateDisplacementToChildren(t, e);
                  }),
                  (o.prototype.move = function () {
                    var t = this.graphManager.getLayout();
                    (null != this.child && 0 != this.child.getNodes().length) ||
                      (this.moveBy(this.displacementX, this.displacementY),
                      (t.totalDisplacement +=
                        Math.abs(this.displacementX) +
                        Math.abs(this.displacementY))),
                      (this.springForceX = 0),
                      (this.springForceY = 0),
                      (this.repulsionForceX = 0),
                      (this.repulsionForceY = 0),
                      (this.gravitationForceX = 0),
                      (this.gravitationForceY = 0),
                      (this.displacementX = 0),
                      (this.displacementY = 0);
                  }),
                  (o.prototype.setPred1 = function (t) {
                    this.pred1 = t;
                  }),
                  (o.prototype.getPred1 = function () {
                    return pred1;
                  }),
                  (o.prototype.getPred2 = function () {
                    return pred2;
                  }),
                  (o.prototype.setNext = function (t) {
                    this.next = t;
                  }),
                  (o.prototype.getNext = function () {
                    return next;
                  }),
                  (o.prototype.setProcessed = function (t) {
                    this.processed = t;
                  }),
                  (o.prototype.isProcessed = function () {
                    return processed;
                  }),
                  (t.exports = o);
              },
              902: (t, e, n) => {
                function r(t) {
                  if (Array.isArray(t)) {
                    for (var e = 0, n = Array(t.length); e < t.length; e++)
                      n[e] = t[e];
                    return n;
                  }
                  return Array.from(t);
                }
                var i = n(806),
                  o = n(551).LinkedList,
                  s = n(551).Matrix,
                  a = n(551).SVD;
                function h() {}
                (h.handleConstraints = function (t) {
                  var e = {};
                  (e.fixedNodeConstraint = t.constraints.fixedNodeConstraint),
                    (e.alignmentConstraint = t.constraints.alignmentConstraint),
                    (e.relativePlacementConstraint =
                      t.constraints.relativePlacementConstraint);
                  for (
                    var n = new Map(),
                      h = new Map(),
                      u = [],
                      c = [],
                      l = t.getAllNodes(),
                      p = 0,
                      f = 0;
                    f < l.length;
                    f++
                  ) {
                    var d = l[f];
                    null == d.getChild() &&
                      (h.set(d.id, p++),
                      u.push(d.getCenterX()),
                      c.push(d.getCenterY()),
                      n.set(d.id, d));
                  }
                  e.relativePlacementConstraint &&
                    e.relativePlacementConstraint.forEach(function (t) {
                      t.gap ||
                        0 == t.gap ||
                        (t.left
                          ? (t.gap =
                              i.DEFAULT_EDGE_LENGTH +
                              n.get(t.left).getWidth() / 2 +
                              n.get(t.right).getWidth() / 2)
                          : (t.gap =
                              i.DEFAULT_EDGE_LENGTH +
                              n.get(t.top).getHeight() / 2 +
                              n.get(t.bottom).getHeight() / 2));
                    });
                  var g = function (t) {
                      var e = 0,
                        n = 0;
                      return (
                        t.forEach(function (t) {
                          (e += u[h.get(t)]), (n += c[h.get(t)]);
                        }),
                        { x: e / t.size, y: n / t.size }
                      );
                    },
                    v = function (t, e, n, i, s) {
                      var a = new Map();
                      t.forEach(function (t, e) {
                        a.set(e, 0);
                      }),
                        t.forEach(function (t, e) {
                          t.forEach(function (t) {
                            a.set(t.id, a.get(t.id) + 1);
                          });
                        });
                      var l = new Map(),
                        p = new Map(),
                        f = new o();
                      a.forEach(function (t, r) {
                        0 == t
                          ? (f.push(r),
                            n ||
                              ("horizontal" == e
                                ? l.set(r, h.has(r) ? u[h.get(r)] : i.get(r))
                                : l.set(r, h.has(r) ? c[h.get(r)] : i.get(r))))
                          : l.set(r, Number.NEGATIVE_INFINITY),
                          n && p.set(r, new Set([r]));
                      }),
                        n &&
                          s.forEach(function (t) {
                            var r = [];
                            if (
                              (t.forEach(function (t) {
                                n.has(t) && r.push(t);
                              }),
                              r.length > 0)
                            ) {
                              var o = 0;
                              r.forEach(function (t) {
                                "horizontal" == e
                                  ? (l.set(
                                      t,
                                      h.has(t) ? u[h.get(t)] : i.get(t)
                                    ),
                                    (o += l.get(t)))
                                  : (l.set(
                                      t,
                                      h.has(t) ? c[h.get(t)] : i.get(t)
                                    ),
                                    (o += l.get(t)));
                              }),
                                (o /= r.length),
                                t.forEach(function (t) {
                                  n.has(t) || l.set(t, o);
                                });
                            } else {
                              var s = 0;
                              t.forEach(function (t) {
                                s +=
                                  "horizontal" == e
                                    ? h.has(t)
                                      ? u[h.get(t)]
                                      : i.get(t)
                                    : h.has(t)
                                    ? c[h.get(t)]
                                    : i.get(t);
                              }),
                                (s /= t.length),
                                t.forEach(function (t) {
                                  l.set(t, s);
                                });
                            }
                          });
                      for (
                        var d = function () {
                          var r = f.shift();
                          t.get(r).forEach(function (t) {
                            if (l.get(t.id) < l.get(r) + t.gap)
                              if (n && n.has(t.id)) {
                                var o;
                                if (
                                  ((o =
                                    "horizontal" == e
                                      ? h.has(t.id)
                                        ? u[h.get(t.id)]
                                        : i.get(t.id)
                                      : h.has(t.id)
                                      ? c[h.get(t.id)]
                                      : i.get(t.id)),
                                  l.set(t.id, o),
                                  o < l.get(r) + t.gap)
                                ) {
                                  var s = l.get(r) + t.gap - o;
                                  p.get(r).forEach(function (t) {
                                    l.set(t, l.get(t) - s);
                                  });
                                }
                              } else l.set(t.id, l.get(r) + t.gap);
                            a.set(t.id, a.get(t.id) - 1),
                              0 == a.get(t.id) && f.push(t.id),
                              n &&
                                p.set(
                                  t.id,
                                  (function (t, e) {
                                    var n = new Set(t),
                                      r = !0,
                                      i = !1,
                                      o = void 0;
                                    try {
                                      for (
                                        var s, a = e[Symbol.iterator]();
                                        !(r = (s = a.next()).done);
                                        r = !0
                                      ) {
                                        var h = s.value;
                                        n.add(h);
                                      }
                                    } catch (t) {
                                      (i = !0), (o = t);
                                    } finally {
                                      try {
                                        !r && a.return && a.return();
                                      } finally {
                                        if (i) throw o;
                                      }
                                    }
                                    return n;
                                  })(p.get(r), p.get(t.id))
                                );
                          });
                        };
                        0 != f.length;

                      )
                        d();
                      if (n) {
                        var g = new Set();
                        t.forEach(function (t, e) {
                          0 == t.length && g.add(e);
                        });
                        var v = [];
                        p.forEach(function (t, e) {
                          if (g.has(e)) {
                            var i = !1,
                              o = !0,
                              s = !1,
                              a = void 0;
                            try {
                              for (
                                var h, u = t[Symbol.iterator]();
                                !(o = (h = u.next()).done);
                                o = !0
                              ) {
                                var c = h.value;
                                n.has(c) && (i = !0);
                              }
                            } catch (t) {
                              (s = !0), (a = t);
                            } finally {
                              try {
                                !o && u.return && u.return();
                              } finally {
                                if (s) throw a;
                              }
                            }
                            if (!i) {
                              var l = !1,
                                p = void 0;
                              v.forEach(function (e, n) {
                                e.has([].concat(r(t))[0]) &&
                                  ((l = !0), (p = n));
                              }),
                                l
                                  ? t.forEach(function (t) {
                                      v[p].add(t);
                                    })
                                  : v.push(new Set(t));
                            }
                          }
                        }),
                          v.forEach(function (t, n) {
                            var r = Number.POSITIVE_INFINITY,
                              o = Number.POSITIVE_INFINITY,
                              s = Number.NEGATIVE_INFINITY,
                              a = Number.NEGATIVE_INFINITY,
                              p = !0,
                              f = !1,
                              d = void 0;
                            try {
                              for (
                                var g, v = t[Symbol.iterator]();
                                !(p = (g = v.next()).done);
                                p = !0
                              ) {
                                var y,
                                  m = g.value;
                                y =
                                  "horizontal" == e
                                    ? h.has(m)
                                      ? u[h.get(m)]
                                      : i.get(m)
                                    : h.has(m)
                                    ? c[h.get(m)]
                                    : i.get(m);
                                var _ = l.get(m);
                                y < r && (r = y),
                                  y > s && (s = y),
                                  _ < o && (o = _),
                                  _ > a && (a = _);
                              }
                            } catch (t) {
                              (f = !0), (d = t);
                            } finally {
                              try {
                                !p && v.return && v.return();
                              } finally {
                                if (f) throw d;
                              }
                            }
                            var E = (r + s) / 2 - (o + a) / 2,
                              b = !0,
                              w = !1,
                              N = void 0;
                            try {
                              for (
                                var x, A = t[Symbol.iterator]();
                                !(b = (x = A.next()).done);
                                b = !0
                              ) {
                                var T = x.value;
                                l.set(T, l.get(T) + E);
                              }
                            } catch (t) {
                              (w = !0), (N = t);
                            } finally {
                              try {
                                !b && A.return && A.return();
                              } finally {
                                if (w) throw N;
                              }
                            }
                          });
                      }
                      return l;
                    },
                    y = function (t) {
                      var e = 0,
                        n = 0,
                        r = 0,
                        i = 0;
                      if (
                        (t.forEach(function (t) {
                          t.left
                            ? u[h.get(t.left)] - u[h.get(t.right)] >= 0
                              ? e++
                              : n++
                            : c[h.get(t.top)] - c[h.get(t.bottom)] >= 0
                            ? r++
                            : i++;
                        }),
                        e > n && r > i)
                      )
                        for (var o = 0; o < h.size; o++)
                          (u[o] = -1 * u[o]), (c[o] = -1 * c[o]);
                      else if (e > n)
                        for (var s = 0; s < h.size; s++) u[s] = -1 * u[s];
                      else if (r > i)
                        for (var a = 0; a < h.size; a++) c[a] = -1 * c[a];
                    },
                    m = function (t) {
                      var e = [],
                        n = new o(),
                        r = new Set(),
                        i = 0;
                      return (
                        t.forEach(function (o, s) {
                          if (!r.has(s)) {
                            e[i] = [];
                            var a = s;
                            for (
                              n.push(a), r.add(a), e[i].push(a);
                              0 != n.length;

                            )
                              (a = n.shift()),
                                t.get(a).forEach(function (t) {
                                  r.has(t.id) ||
                                    (n.push(t.id),
                                    r.add(t.id),
                                    e[i].push(t.id));
                                });
                            i++;
                          }
                        }),
                        e
                      );
                    },
                    _ = function (t) {
                      var e = new Map();
                      return (
                        t.forEach(function (t, n) {
                          e.set(n, []);
                        }),
                        t.forEach(function (t, n) {
                          t.forEach(function (t) {
                            e.get(n).push(t),
                              e
                                .get(t.id)
                                .push({
                                  id: n,
                                  gap: t.gap,
                                  direction: t.direction,
                                });
                          });
                        }),
                        e
                      );
                    },
                    E = function (t) {
                      var e = new Map();
                      return (
                        t.forEach(function (t, n) {
                          e.set(n, []);
                        }),
                        t.forEach(function (t, n) {
                          t.forEach(function (t) {
                            e.get(t.id).push({
                              id: n,
                              gap: t.gap,
                              direction: t.direction,
                            });
                          });
                        }),
                        e
                      );
                    },
                    b = [],
                    w = [],
                    N = !1,
                    x = !1,
                    A = new Set(),
                    T = new Map(),
                    M = new Map(),
                    O = [];
                  if (
                    (e.fixedNodeConstraint &&
                      e.fixedNodeConstraint.forEach(function (t) {
                        A.add(t.nodeId);
                      }),
                    e.relativePlacementConstraint &&
                      (e.relativePlacementConstraint.forEach(function (t) {
                        t.left
                          ? (T.has(t.left)
                              ? T.get(t.left).push({
                                  id: t.right,
                                  gap: t.gap,
                                  direction: "horizontal",
                                })
                              : T.set(t.left, [
                                  {
                                    id: t.right,
                                    gap: t.gap,
                                    direction: "horizontal",
                                  },
                                ]),
                            T.has(t.right) || T.set(t.right, []))
                          : (T.has(t.top)
                              ? T.get(t.top).push({
                                  id: t.bottom,
                                  gap: t.gap,
                                  direction: "vertical",
                                })
                              : T.set(t.top, [
                                  {
                                    id: t.bottom,
                                    gap: t.gap,
                                    direction: "vertical",
                                  },
                                ]),
                            T.has(t.bottom) || T.set(t.bottom, []));
                      }),
                      (M = _(T)),
                      (O = m(M))),
                    i.TRANSFORM_ON_CONSTRAINT_HANDLING)
                  ) {
                    if (
                      e.fixedNodeConstraint &&
                      e.fixedNodeConstraint.length > 1
                    )
                      e.fixedNodeConstraint.forEach(function (t, e) {
                        (b[e] = [t.position.x, t.position.y]),
                          (w[e] = [u[h.get(t.nodeId)], c[h.get(t.nodeId)]]);
                      }),
                        (N = !0);
                    else if (e.alignmentConstraint)
                      !(function () {
                        var t = 0;
                        if (e.alignmentConstraint.vertical) {
                          for (
                            var n = e.alignmentConstraint.vertical,
                              i = function (e) {
                                var i = new Set();
                                n[e].forEach(function (t) {
                                  i.add(t);
                                });
                                var o,
                                  s = new Set(
                                    [].concat(r(i)).filter(function (t) {
                                      return A.has(t);
                                    })
                                  );
                                (o =
                                  s.size > 0
                                    ? u[h.get(s.values().next().value)]
                                    : g(i).x),
                                  n[e].forEach(function (e) {
                                    (b[t] = [o, c[h.get(e)]]),
                                      (w[t] = [u[h.get(e)], c[h.get(e)]]),
                                      t++;
                                  });
                              },
                              o = 0;
                            o < n.length;
                            o++
                          )
                            i(o);
                          N = !0;
                        }
                        if (e.alignmentConstraint.horizontal) {
                          for (
                            var s = e.alignmentConstraint.horizontal,
                              a = function (e) {
                                var n = new Set();
                                s[e].forEach(function (t) {
                                  n.add(t);
                                });
                                var i,
                                  o = new Set(
                                    [].concat(r(n)).filter(function (t) {
                                      return A.has(t);
                                    })
                                  );
                                (i =
                                  o.size > 0
                                    ? u[h.get(o.values().next().value)]
                                    : g(n).y),
                                  s[e].forEach(function (e) {
                                    (b[t] = [u[h.get(e)], i]),
                                      (w[t] = [u[h.get(e)], c[h.get(e)]]),
                                      t++;
                                  });
                              },
                              l = 0;
                            l < s.length;
                            l++
                          )
                            a(l);
                          N = !0;
                        }
                        e.relativePlacementConstraint && (x = !0);
                      })();
                    else if (e.relativePlacementConstraint) {
                      for (var I = 0, L = 0, C = 0; C < O.length; C++)
                        O[C].length > I && ((I = O[C].length), (L = C));
                      if (I < M.size / 2)
                        y(e.relativePlacementConstraint), (N = !1), (x = !1);
                      else {
                        var D = new Map(),
                          S = new Map(),
                          P = [];
                        O[L].forEach(function (t) {
                          T.get(t).forEach(function (e) {
                            "horizontal" == e.direction
                              ? (D.has(t) ? D.get(t).push(e) : D.set(t, [e]),
                                D.has(e.id) || D.set(e.id, []),
                                P.push({ left: t, right: e.id }))
                              : (S.has(t) ? S.get(t).push(e) : S.set(t, [e]),
                                S.has(e.id) || S.set(e.id, []),
                                P.push({ top: t, bottom: e.id }));
                          });
                        }),
                          y(P),
                          (x = !1);
                        var R = v(D, "horizontal"),
                          F = v(S, "vertical");
                        O[L].forEach(function (t, e) {
                          (w[e] = [u[h.get(t)], c[h.get(t)]]),
                            (b[e] = []),
                            R.has(t)
                              ? (b[e][0] = R.get(t))
                              : (b[e][0] = u[h.get(t)]),
                            F.has(t)
                              ? (b[e][1] = F.get(t))
                              : (b[e][1] = c[h.get(t)]);
                        }),
                          (N = !0);
                      }
                    }
                    if (N) {
                      for (
                        var k, G = s.transpose(b), U = s.transpose(w), Y = 0;
                        Y < G.length;
                        Y++
                      )
                        (G[Y] = s.multGamma(G[Y])), (U[Y] = s.multGamma(U[Y]));
                      var V = s.multMat(G, s.transpose(U)),
                        X = a.svd(V);
                      k = s.multMat(X.V, s.transpose(X.U));
                      for (var H = 0; H < h.size; H++) {
                        var z = [u[H], c[H]],
                          B = [k[0][0], k[1][0]],
                          j = [k[0][1], k[1][1]];
                        (u[H] = s.dotProduct(z, B)),
                          (c[H] = s.dotProduct(z, j));
                      }
                      x && y(e.relativePlacementConstraint);
                    }
                  }
                  if (i.ENFORCE_CONSTRAINTS) {
                    if (
                      e.fixedNodeConstraint &&
                      e.fixedNodeConstraint.length > 0
                    ) {
                      var W = { x: 0, y: 0 };
                      e.fixedNodeConstraint.forEach(function (t, e) {
                        var n,
                          r,
                          i =
                            ((r = {
                              x: u[h.get(t.nodeId)],
                              y: c[h.get(t.nodeId)],
                            }),
                            { x: (n = t.position).x - r.x, y: n.y - r.y });
                        (W.x += i.x), (W.y += i.y);
                      }),
                        (W.x /= e.fixedNodeConstraint.length),
                        (W.y /= e.fixedNodeConstraint.length),
                        u.forEach(function (t, e) {
                          u[e] += W.x;
                        }),
                        c.forEach(function (t, e) {
                          c[e] += W.y;
                        }),
                        e.fixedNodeConstraint.forEach(function (t) {
                          (u[h.get(t.nodeId)] = t.position.x),
                            (c[h.get(t.nodeId)] = t.position.y);
                        });
                    }
                    if (e.alignmentConstraint) {
                      if (e.alignmentConstraint.vertical)
                        for (
                          var q = e.alignmentConstraint.vertical,
                            $ = function (t) {
                              var e = new Set();
                              q[t].forEach(function (t) {
                                e.add(t);
                              });
                              var n,
                                i = new Set(
                                  [].concat(r(e)).filter(function (t) {
                                    return A.has(t);
                                  })
                                );
                              (n =
                                i.size > 0
                                  ? u[h.get(i.values().next().value)]
                                  : g(e).x),
                                e.forEach(function (t) {
                                  A.has(t) || (u[h.get(t)] = n);
                                });
                            },
                            Z = 0;
                          Z < q.length;
                          Z++
                        )
                          $(Z);
                      if (e.alignmentConstraint.horizontal)
                        for (
                          var K = e.alignmentConstraint.horizontal,
                            Q = function (t) {
                              var e = new Set();
                              K[t].forEach(function (t) {
                                e.add(t);
                              });
                              var n,
                                i = new Set(
                                  [].concat(r(e)).filter(function (t) {
                                    return A.has(t);
                                  })
                                );
                              (n =
                                i.size > 0
                                  ? c[h.get(i.values().next().value)]
                                  : g(e).y),
                                e.forEach(function (t) {
                                  A.has(t) || (c[h.get(t)] = n);
                                });
                            },
                            J = 0;
                          J < K.length;
                          J++
                        )
                          Q(J);
                    }
                    e.relativePlacementConstraint &&
                      (function () {
                        var t = new Map(),
                          n = new Map(),
                          r = new Map(),
                          i = new Map(),
                          o = new Map(),
                          s = new Map(),
                          a = new Set(),
                          l = new Set();
                        if (
                          (A.forEach(function (t) {
                            a.add(t), l.add(t);
                          }),
                          e.alignmentConstraint)
                        ) {
                          if (e.alignmentConstraint.vertical)
                            for (
                              var p = e.alignmentConstraint.vertical,
                                f = function (e) {
                                  r.set("dummy" + e, []),
                                    p[e].forEach(function (n) {
                                      t.set(n, "dummy" + e),
                                        r.get("dummy" + e).push(n),
                                        A.has(n) && a.add("dummy" + e);
                                    }),
                                    o.set("dummy" + e, u[h.get(p[e][0])]);
                                },
                                d = 0;
                              d < p.length;
                              d++
                            )
                              f(d);
                          if (e.alignmentConstraint.horizontal)
                            for (
                              var g = e.alignmentConstraint.horizontal,
                                y = function (t) {
                                  i.set("dummy" + t, []),
                                    g[t].forEach(function (e) {
                                      n.set(e, "dummy" + t),
                                        i.get("dummy" + t).push(e),
                                        A.has(e) && l.add("dummy" + t);
                                    }),
                                    s.set("dummy" + t, c[h.get(g[t][0])]);
                                },
                                b = 0;
                              b < g.length;
                              b++
                            )
                              y(b);
                        }
                        var w = new Map(),
                          N = new Map(),
                          x = function (e) {
                            T.get(e).forEach(function (r) {
                              var i = void 0,
                                o = void 0;
                              "horizontal" == r.direction
                                ? ((i = t.get(e) ? t.get(e) : e),
                                  (o = t.get(r.id)
                                    ? {
                                        id: t.get(r.id),
                                        gap: r.gap,
                                        direction: r.direction,
                                      }
                                    : r),
                                  w.has(i) ? w.get(i).push(o) : w.set(i, [o]),
                                  w.has(o.id) || w.set(o.id, []))
                                : ((i = n.get(e) ? n.get(e) : e),
                                  (o = n.get(r.id)
                                    ? {
                                        id: n.get(r.id),
                                        gap: r.gap,
                                        direction: r.direction,
                                      }
                                    : r),
                                  N.has(i) ? N.get(i).push(o) : N.set(i, [o]),
                                  N.has(o.id) || N.set(o.id, []));
                            });
                          },
                          M = !0,
                          O = !1,
                          I = void 0;
                        try {
                          for (
                            var L, C = T.keys()[Symbol.iterator]();
                            !(M = (L = C.next()).done);
                            M = !0
                          )
                            x(L.value);
                        } catch (t) {
                          (O = !0), (I = t);
                        } finally {
                          try {
                            !M && C.return && C.return();
                          } finally {
                            if (O) throw I;
                          }
                        }
                        var D = _(w),
                          S = _(N),
                          P = m(D),
                          R = m(S),
                          F = E(w),
                          k = E(N),
                          G = [],
                          U = [];
                        P.forEach(function (t, e) {
                          (G[e] = []),
                            t.forEach(function (t) {
                              0 == F.get(t).length && G[e].push(t);
                            });
                        }),
                          R.forEach(function (t, e) {
                            (U[e] = []),
                              t.forEach(function (t) {
                                0 == k.get(t).length && U[e].push(t);
                              });
                          });
                        var Y = v(w, "horizontal", a, o, G),
                          V = v(N, "vertical", l, s, U),
                          X = function (t) {
                            r.get(t)
                              ? r.get(t).forEach(function (e) {
                                  u[h.get(e)] = Y.get(t);
                                })
                              : (u[h.get(t)] = Y.get(t));
                          },
                          H = !0,
                          z = !1,
                          B = void 0;
                        try {
                          for (
                            var j, W = Y.keys()[Symbol.iterator]();
                            !(H = (j = W.next()).done);
                            H = !0
                          )
                            X(j.value);
                        } catch (t) {
                          (z = !0), (B = t);
                        } finally {
                          try {
                            !H && W.return && W.return();
                          } finally {
                            if (z) throw B;
                          }
                        }
                        var q = function (t) {
                            i.get(t)
                              ? i.get(t).forEach(function (e) {
                                  c[h.get(e)] = V.get(t);
                                })
                              : (c[h.get(t)] = V.get(t));
                          },
                          $ = !0,
                          Z = !1,
                          K = void 0;
                        try {
                          for (
                            var Q, J = V.keys()[Symbol.iterator]();
                            !($ = (Q = J.next()).done);
                            $ = !0
                          )
                            q(Q.value);
                        } catch (t) {
                          (Z = !0), (K = t);
                        } finally {
                          try {
                            !$ && J.return && J.return();
                          } finally {
                            if (Z) throw K;
                          }
                        }
                      })();
                  }
                  for (var tt = 0; tt < l.length; tt++) {
                    var et = l[tt];
                    null == et.getChild() &&
                      et.setCenter(u[h.get(et.id)], c[h.get(et.id)]);
                  }
                }),
                  (t.exports = h);
              },
              551: (e) => {
                e.exports = t;
              },
            },
            n = {},
            r = (function t(r) {
              var i = n[r];
              if (void 0 !== i) return i.exports;
              var o = (n[r] = { exports: {} });
              return e[r](o, o.exports, t), o.exports;
            })(45);
          return r;
        })();
      }),
        (t.exports = r(n(143)));
    },
    314: (t) => {
      "use strict";
      t.exports = function (t) {
        var e = [];
        return (
          (e.toString = function () {
            return this.map(function (e) {
              var n = "",
                r = void 0 !== e[5];
              return (
                e[4] && (n += "@supports (".concat(e[4], ") {")),
                e[2] && (n += "@media ".concat(e[2], " {")),
                r &&
                  (n += "@layer".concat(
                    e[5].length > 0 ? " ".concat(e[5]) : "",
                    " {"
                  )),
                (n += t(e)),
                r && (n += "}"),
                e[2] && (n += "}"),
                e[4] && (n += "}"),
                n
              );
            }).join("");
          }),
          (e.i = function (t, n, r, i, o) {
            "string" == typeof t && (t = [[null, t, void 0]]);
            var s = {};
            if (r)
              for (var a = 0; a < this.length; a++) {
                var h = this[a][0];
                null != h && (s[h] = !0);
              }
            for (var u = 0; u < t.length; u++) {
              var c = [].concat(t[u]);
              (r && s[c[0]]) ||
                (void 0 !== o &&
                  (void 0 === c[5] ||
                    (c[1] = "@layer"
                      .concat(c[5].length > 0 ? " ".concat(c[5]) : "", " {")
                      .concat(c[1], "}")),
                  (c[5] = o)),
                n &&
                  (c[2]
                    ? ((c[1] = "@media ".concat(c[2], " {").concat(c[1], "}")),
                      (c[2] = n))
                    : (c[2] = n)),
                i &&
                  (c[4]
                    ? ((c[1] = "@supports ("
                        .concat(c[4], ") {")
                        .concat(c[1], "}")),
                      (c[4] = i))
                    : (c[4] = "".concat(i))),
                e.push(c));
            }
          }),
          e
        );
      };
    },
    417: (t) => {
      "use strict";
      t.exports = function (t, e) {
        return (
          e || (e = {}),
          t
            ? ((t = String(t.__esModule ? t.default : t)),
              /^['"].*['"]$/.test(t) && (t = t.slice(1, -1)),
              e.hash && (t += e.hash),
              /["'() \t\n]|(%20)/.test(t) || e.needQuotes
                ? '"'.concat(t.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"')
                : t)
            : t
        );
      };
    },
    982: (t) => {
      "use strict";
      t.exports = function (t) {
        return t[1];
      };
    },
    723: (t, e, n) => {
      "use strict";
      n.d(e, { M$: () => l, $F: () => c, v2: () => h, kc: () => r });
      const r = 4,
        i = new Int32Array(2),
        o = new Float32Array(i.buffer),
        s = new Float64Array(i.buffer),
        a = 1 === new Uint16Array(new Uint8Array([1, 0]).buffer)[0];
      class h {
        constructor(t, e) {
          (this.low = 0 | t), (this.high = 0 | e);
        }
        static create(t, e) {
          return 0 == t && 0 == e ? h.ZERO : new h(t, e);
        }
        toFloat64() {
          return (this.low >>> 0) + 4294967296 * this.high;
        }
        equals(t) {
          return this.low == t.low && this.high == t.high;
        }
      }
      var u;
      (h.ZERO = new h(0, 0)),
        (function (t) {
          (t[(t.UTF8_BYTES = 1)] = "UTF8_BYTES"),
            (t[(t.UTF16_STRING = 2)] = "UTF16_STRING");
        })(u || (u = {}));
      class c {
        constructor(t) {
          (this.bytes_ = t), (this.position_ = 0);
        }
        static allocate(t) {
          return new c(new Uint8Array(t));
        }
        clear() {
          this.position_ = 0;
        }
        bytes() {
          return this.bytes_;
        }
        position() {
          return this.position_;
        }
        setPosition(t) {
          this.position_ = t;
        }
        capacity() {
          return this.bytes_.length;
        }
        readInt8(t) {
          return (this.readUint8(t) << 24) >> 24;
        }
        readUint8(t) {
          return this.bytes_[t];
        }
        readInt16(t) {
          return (this.readUint16(t) << 16) >> 16;
        }
        readUint16(t) {
          return this.bytes_[t] | (this.bytes_[t + 1] << 8);
        }
        readInt32(t) {
          return (
            this.bytes_[t] |
            (this.bytes_[t + 1] << 8) |
            (this.bytes_[t + 2] << 16) |
            (this.bytes_[t + 3] << 24)
          );
        }
        readUint32(t) {
          return this.readInt32(t) >>> 0;
        }
        readInt64(t) {
          return new h(this.readInt32(t), this.readInt32(t + 4));
        }
        readUint64(t) {
          return new h(this.readUint32(t), this.readUint32(t + 4));
        }
        readFloat32(t) {
          return (i[0] = this.readInt32(t)), o[0];
        }
        readFloat64(t) {
          return (
            (i[a ? 0 : 1] = this.readInt32(t)),
            (i[a ? 1 : 0] = this.readInt32(t + 4)),
            s[0]
          );
        }
        writeInt8(t, e) {
          this.bytes_[t] = e;
        }
        writeUint8(t, e) {
          this.bytes_[t] = e;
        }
        writeInt16(t, e) {
          (this.bytes_[t] = e), (this.bytes_[t + 1] = e >> 8);
        }
        writeUint16(t, e) {
          (this.bytes_[t] = e), (this.bytes_[t + 1] = e >> 8);
        }
        writeInt32(t, e) {
          (this.bytes_[t] = e),
            (this.bytes_[t + 1] = e >> 8),
            (this.bytes_[t + 2] = e >> 16),
            (this.bytes_[t + 3] = e >> 24);
        }
        writeUint32(t, e) {
          (this.bytes_[t] = e),
            (this.bytes_[t + 1] = e >> 8),
            (this.bytes_[t + 2] = e >> 16),
            (this.bytes_[t + 3] = e >> 24);
        }
        writeInt64(t, e) {
          this.writeInt32(t, e.low), this.writeInt32(t + 4, e.high);
        }
        writeUint64(t, e) {
          this.writeUint32(t, e.low), this.writeUint32(t + 4, e.high);
        }
        writeFloat32(t, e) {
          (o[0] = e), this.writeInt32(t, i[0]);
        }
        writeFloat64(t, e) {
          (s[0] = e),
            this.writeInt32(t, i[a ? 0 : 1]),
            this.writeInt32(t + 4, i[a ? 1 : 0]);
        }
        getBufferIdentifier() {
          if (this.bytes_.length < this.position_ + 4 + 4)
            throw new Error(
              "FlatBuffers: ByteBuffer is too short to contain an identifier."
            );
          let t = "";
          for (let e = 0; e < 4; e++)
            t += String.fromCharCode(this.readInt8(this.position_ + 4 + e));
          return t;
        }
        __offset(t, e) {
          const n = t - this.readInt32(t);
          return e < this.readInt16(n) ? this.readInt16(n + e) : 0;
        }
        __union(t, e) {
          return (t.bb_pos = e + this.readInt32(e)), (t.bb = this), t;
        }
        __string(t, e) {
          t += this.readInt32(t);
          const n = this.readInt32(t);
          let r = "",
            i = 0;
          if (((t += 4), e === u.UTF8_BYTES))
            return this.bytes_.subarray(t, t + n);
          for (; i < n; ) {
            let e;
            const n = this.readUint8(t + i++);
            if (n < 192) e = n;
            else {
              const r = this.readUint8(t + i++);
              if (n < 224) e = ((31 & n) << 6) | (63 & r);
              else {
                const o = this.readUint8(t + i++);
                e =
                  n < 240
                    ? ((15 & n) << 12) | ((63 & r) << 6) | (63 & o)
                    : ((7 & n) << 18) |
                      ((63 & r) << 12) |
                      ((63 & o) << 6) |
                      (63 & this.readUint8(t + i++));
              }
            }
            e < 65536
              ? (r += String.fromCharCode(e))
              : ((e -= 65536),
                (r += String.fromCharCode(
                  55296 + (e >> 10),
                  56320 + (1023 & e)
                )));
          }
          return r;
        }
        __union_with_string(t, e) {
          return "string" == typeof t ? this.__string(e) : this.__union(t, e);
        }
        __indirect(t) {
          return t + this.readInt32(t);
        }
        __vector(t) {
          return t + this.readInt32(t) + 4;
        }
        __vector_len(t) {
          return this.readInt32(t + this.readInt32(t));
        }
        __has_identifier(t) {
          if (4 != t.length)
            throw new Error("FlatBuffers: file identifier must be length 4");
          for (let e = 0; e < 4; e++)
            if (t.charCodeAt(e) != this.readInt8(this.position() + 4 + e))
              return !1;
          return !0;
        }
        createLong(t, e) {
          return h.create(t, e);
        }
        createScalarList(t, e) {
          const n = [];
          for (let r = 0; r < e; ++r) null !== t(r) && n.push(t(r));
          return n;
        }
        createObjList(t, e) {
          const n = [];
          for (let r = 0; r < e; ++r) {
            const e = t(r);
            null !== e && n.push(e.unpack());
          }
          return n;
        }
      }
      class l {
        constructor(t) {
          let e;
          (this.minalign = 1),
            (this.vtable = null),
            (this.vtable_in_use = 0),
            (this.isNested = !1),
            (this.object_start = 0),
            (this.vtables = []),
            (this.vector_num_elems = 0),
            (this.force_defaults = !1),
            (this.string_maps = null),
            (e = t || 1024),
            (this.bb = c.allocate(e)),
            (this.space = e);
        }
        clear() {
          this.bb.clear(),
            (this.space = this.bb.capacity()),
            (this.minalign = 1),
            (this.vtable = null),
            (this.vtable_in_use = 0),
            (this.isNested = !1),
            (this.object_start = 0),
            (this.vtables = []),
            (this.vector_num_elems = 0),
            (this.force_defaults = !1),
            (this.string_maps = null);
        }
        forceDefaults(t) {
          this.force_defaults = t;
        }
        dataBuffer() {
          return this.bb;
        }
        asUint8Array() {
          return this.bb
            .bytes()
            .subarray(this.bb.position(), this.bb.position() + this.offset());
        }
        prep(t, e) {
          t > this.minalign && (this.minalign = t);
          const n = (1 + ~(this.bb.capacity() - this.space + e)) & (t - 1);
          for (; this.space < n + t + e; ) {
            const t = this.bb.capacity();
            (this.bb = l.growByteBuffer(this.bb)),
              (this.space += this.bb.capacity() - t);
          }
          this.pad(n);
        }
        pad(t) {
          for (let e = 0; e < t; e++) this.bb.writeInt8(--this.space, 0);
        }
        writeInt8(t) {
          this.bb.writeInt8((this.space -= 1), t);
        }
        writeInt16(t) {
          this.bb.writeInt16((this.space -= 2), t);
        }
        writeInt32(t) {
          this.bb.writeInt32((this.space -= 4), t);
        }
        writeInt64(t) {
          this.bb.writeInt64((this.space -= 8), t);
        }
        writeFloat32(t) {
          this.bb.writeFloat32((this.space -= 4), t);
        }
        writeFloat64(t) {
          this.bb.writeFloat64((this.space -= 8), t);
        }
        addInt8(t) {
          this.prep(1, 0), this.writeInt8(t);
        }
        addInt16(t) {
          this.prep(2, 0), this.writeInt16(t);
        }
        addInt32(t) {
          this.prep(4, 0), this.writeInt32(t);
        }
        addInt64(t) {
          this.prep(8, 0), this.writeInt64(t);
        }
        addFloat32(t) {
          this.prep(4, 0), this.writeFloat32(t);
        }
        addFloat64(t) {
          this.prep(8, 0), this.writeFloat64(t);
        }
        addFieldInt8(t, e, n) {
          (this.force_defaults || e != n) && (this.addInt8(e), this.slot(t));
        }
        addFieldInt16(t, e, n) {
          (this.force_defaults || e != n) && (this.addInt16(e), this.slot(t));
        }
        addFieldInt32(t, e, n) {
          (this.force_defaults || e != n) && (this.addInt32(e), this.slot(t));
        }
        addFieldInt64(t, e, n) {
          (!this.force_defaults && e.equals(n)) ||
            (this.addInt64(e), this.slot(t));
        }
        addFieldFloat32(t, e, n) {
          (this.force_defaults || e != n) && (this.addFloat32(e), this.slot(t));
        }
        addFieldFloat64(t, e, n) {
          (this.force_defaults || e != n) && (this.addFloat64(e), this.slot(t));
        }
        addFieldOffset(t, e, n) {
          (this.force_defaults || e != n) && (this.addOffset(e), this.slot(t));
        }
        addFieldStruct(t, e, n) {
          e != n && (this.nested(e), this.slot(t));
        }
        nested(t) {
          if (t != this.offset())
            throw new Error("FlatBuffers: struct must be serialized inline.");
        }
        notNested() {
          if (this.isNested)
            throw new Error(
              "FlatBuffers: object serialization must not be nested."
            );
        }
        slot(t) {
          null !== this.vtable && (this.vtable[t] = this.offset());
        }
        offset() {
          return this.bb.capacity() - this.space;
        }
        static growByteBuffer(t) {
          const e = t.capacity();
          if (3221225472 & e)
            throw new Error(
              "FlatBuffers: cannot grow buffer beyond 2 gigabytes."
            );
          const n = e << 1,
            r = c.allocate(n);
          return r.setPosition(n - e), r.bytes().set(t.bytes(), n - e), r;
        }
        addOffset(t) {
          this.prep(4, 0), this.writeInt32(this.offset() - t + 4);
        }
        startObject(t) {
          this.notNested(),
            null == this.vtable && (this.vtable = []),
            (this.vtable_in_use = t);
          for (let e = 0; e < t; e++) this.vtable[e] = 0;
          (this.isNested = !0), (this.object_start = this.offset());
        }
        endObject() {
          if (null == this.vtable || !this.isNested)
            throw new Error(
              "FlatBuffers: endObject called without startObject"
            );
          this.addInt32(0);
          const t = this.offset();
          let e = this.vtable_in_use - 1;
          for (; e >= 0 && 0 == this.vtable[e]; e--);
          const n = e + 1;
          for (; e >= 0; e--)
            this.addInt16(0 != this.vtable[e] ? t - this.vtable[e] : 0);
          this.addInt16(t - this.object_start);
          const r = 2 * (n + 2);
          this.addInt16(r);
          let i = 0;
          const o = this.space;
          t: for (e = 0; e < this.vtables.length; e++) {
            const t = this.bb.capacity() - this.vtables[e];
            if (r == this.bb.readInt16(t)) {
              for (let e = 2; e < r; e += 2)
                if (this.bb.readInt16(o + e) != this.bb.readInt16(t + e))
                  continue t;
              i = this.vtables[e];
              break;
            }
          }
          return (
            i
              ? ((this.space = this.bb.capacity() - t),
                this.bb.writeInt32(this.space, i - t))
              : (this.vtables.push(this.offset()),
                this.bb.writeInt32(this.bb.capacity() - t, this.offset() - t)),
            (this.isNested = !1),
            t
          );
        }
        finish(t, e, n) {
          const i = n ? r : 0;
          if (e) {
            const t = e;
            if ((this.prep(this.minalign, 8 + i), 4 != t.length))
              throw new Error("FlatBuffers: file identifier must be length 4");
            for (let e = 3; e >= 0; e--) this.writeInt8(t.charCodeAt(e));
          }
          this.prep(this.minalign, 4 + i),
            this.addOffset(t),
            i && this.addInt32(this.bb.capacity() - this.space),
            this.bb.setPosition(this.space);
        }
        finishSizePrefixed(t, e) {
          this.finish(t, e, !0);
        }
        requiredField(t, e) {
          const n = this.bb.capacity() - t,
            r = n - this.bb.readInt32(n);
          if (0 == this.bb.readInt16(r + e))
            throw new Error("FlatBuffers: field " + e + " must be set");
        }
        startVector(t, e, n) {
          this.notNested(),
            (this.vector_num_elems = e),
            this.prep(4, t * e),
            this.prep(n, t * e);
        }
        endVector() {
          return this.writeInt32(this.vector_num_elems), this.offset();
        }
        createSharedString(t) {
          if (!t) return 0;
          if (
            (this.string_maps || (this.string_maps = new Map()),
            this.string_maps.has(t))
          )
            return this.string_maps.get(t);
          const e = this.createString(t);
          return this.string_maps.set(t, e), e;
        }
        createString(t) {
          if (!t) return 0;
          let e;
          if (t instanceof Uint8Array) e = t;
          else {
            e = [];
            let n = 0;
            for (; n < t.length; ) {
              let r;
              const i = t.charCodeAt(n++);
              (r =
                i < 55296 || i >= 56320
                  ? i
                  : (i << 10) + t.charCodeAt(n++) + -56613888),
                r < 128
                  ? e.push(r)
                  : (r < 2048
                      ? e.push(((r >> 6) & 31) | 192)
                      : (r < 65536
                          ? e.push(((r >> 12) & 15) | 224)
                          : e.push(
                              ((r >> 18) & 7) | 240,
                              ((r >> 12) & 63) | 128
                            ),
                        e.push(((r >> 6) & 63) | 128)),
                    e.push((63 & r) | 128));
            }
          }
          this.addInt8(0),
            this.startVector(1, e.length, 1),
            this.bb.setPosition((this.space -= e.length));
          for (
            let t = 0, n = this.space, r = this.bb.bytes();
            t < e.length;
            t++
          )
            r[n++] = e[t];
          return this.endVector();
        }
        createLong(t, e) {
          return h.create(t, e);
        }
        createObjectOffset(t) {
          return null === t
            ? 0
            : "string" == typeof t
            ? this.createString(t)
            : t.pack(this);
        }
        createObjectOffsetList(t) {
          const e = [];
          for (let n = 0; n < t.length; ++n) {
            const r = t[n];
            if (null === r)
              throw new Error(
                "FlatBuffers: Argument for createObjectOffsetList cannot contain null."
              );
            e.push(this.createObjectOffset(r));
          }
          return e;
        }
        createStructOffsetList(t, e) {
          return (
            e(this, t.length), this.createObjectOffsetList(t), this.endVector()
          );
        }
      }
    },
    146: (t, e, n) => {
      "use strict";
      var r = n(363),
        i = {
          childContextTypes: !0,
          contextType: !0,
          contextTypes: !0,
          defaultProps: !0,
          displayName: !0,
          getDefaultProps: !0,
          getDerivedStateFromError: !0,
          getDerivedStateFromProps: !0,
          mixins: !0,
          propTypes: !0,
          type: !0,
        },
        o = {
          name: !0,
          length: !0,
          prototype: !0,
          caller: !0,
          callee: !0,
          arguments: !0,
          arity: !0,
        },
        s = {
          $$typeof: !0,
          compare: !0,
          defaultProps: !0,
          displayName: !0,
          propTypes: !0,
          type: !0,
        },
        a = {};
      function h(t) {
        return r.isMemo(t) ? s : a[t.$$typeof] || i;
      }
      (a[r.ForwardRef] = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
      }),
        (a[r.Memo] = s);
      var u = Object.defineProperty,
        c = Object.getOwnPropertyNames,
        l = Object.getOwnPropertySymbols,
        p = Object.getOwnPropertyDescriptor,
        f = Object.getPrototypeOf,
        d = Object.prototype;
      t.exports = function t(e, n, r) {
        if ("string" != typeof n) {
          if (d) {
            var i = f(n);
            i && i !== d && t(e, i, r);
          }
          var s = c(n);
          l && (s = s.concat(l(n)));
          for (var a = h(e), g = h(n), v = 0; v < s.length; ++v) {
            var y = s[v];
            if (!(o[y] || (r && r[y]) || (g && g[y]) || (a && a[y]))) {
              var m = p(n, y);
              try {
                u(e, y, m);
              } catch (t) {}
            }
          }
        }
        return e;
      };
    },
    143: function (t) {
      var e;
      (e = function () {
        return (function (t) {
          var e = {};
          function n(r) {
            if (e[r]) return e[r].exports;
            var i = (e[r] = { i: r, l: !1, exports: {} });
            return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
          }
          return (
            (n.m = t),
            (n.c = e),
            (n.i = function (t) {
              return t;
            }),
            (n.d = function (t, e, r) {
              n.o(t, e) ||
                Object.defineProperty(t, e, {
                  configurable: !1,
                  enumerable: !0,
                  get: r,
                });
            }),
            (n.n = function (t) {
              var e =
                t && t.__esModule
                  ? function () {
                      return t.default;
                    }
                  : function () {
                      return t;
                    };
              return n.d(e, "a", e), e;
            }),
            (n.o = function (t, e) {
              return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (n.p = ""),
            n((n.s = 28))
          );
        })([
          function (t, e, n) {
            "use strict";
            function r() {}
            (r.QUALITY = 1),
              (r.DEFAULT_CREATE_BENDS_AS_NEEDED = !1),
              (r.DEFAULT_INCREMENTAL = !1),
              (r.DEFAULT_ANIMATION_ON_LAYOUT = !0),
              (r.DEFAULT_ANIMATION_DURING_LAYOUT = !1),
              (r.DEFAULT_ANIMATION_PERIOD = 50),
              (r.DEFAULT_UNIFORM_LEAF_NODE_SIZES = !1),
              (r.DEFAULT_GRAPH_MARGIN = 15),
              (r.NODE_DIMENSIONS_INCLUDE_LABELS = !1),
              (r.SIMPLE_NODE_SIZE = 40),
              (r.SIMPLE_NODE_HALF_SIZE = r.SIMPLE_NODE_SIZE / 2),
              (r.EMPTY_COMPOUND_NODE_SIZE = 40),
              (r.MIN_EDGE_LENGTH = 1),
              (r.WORLD_BOUNDARY = 1e6),
              (r.INITIAL_WORLD_BOUNDARY = r.WORLD_BOUNDARY / 1e3),
              (r.WORLD_CENTER_X = 1200),
              (r.WORLD_CENTER_Y = 900),
              (t.exports = r);
          },
          function (t, e, n) {
            "use strict";
            var r = n(2),
              i = n(8),
              o = n(9);
            function s(t, e, n) {
              r.call(this, n),
                (this.isOverlapingSourceAndTarget = !1),
                (this.vGraphObject = n),
                (this.bendpoints = []),
                (this.source = t),
                (this.target = e);
            }
            for (var a in ((s.prototype = Object.create(r.prototype)), r))
              s[a] = r[a];
            (s.prototype.getSource = function () {
              return this.source;
            }),
              (s.prototype.getTarget = function () {
                return this.target;
              }),
              (s.prototype.isInterGraph = function () {
                return this.isInterGraph;
              }),
              (s.prototype.getLength = function () {
                return this.length;
              }),
              (s.prototype.isOverlapingSourceAndTarget = function () {
                return this.isOverlapingSourceAndTarget;
              }),
              (s.prototype.getBendpoints = function () {
                return this.bendpoints;
              }),
              (s.prototype.getLca = function () {
                return this.lca;
              }),
              (s.prototype.getSourceInLca = function () {
                return this.sourceInLca;
              }),
              (s.prototype.getTargetInLca = function () {
                return this.targetInLca;
              }),
              (s.prototype.getOtherEnd = function (t) {
                if (this.source === t) return this.target;
                if (this.target === t) return this.source;
                throw "Node is not incident with this edge";
              }),
              (s.prototype.getOtherEndInGraph = function (t, e) {
                for (
                  var n = this.getOtherEnd(t),
                    r = e.getGraphManager().getRoot();
                  ;

                ) {
                  if (n.getOwner() == e) return n;
                  if (n.getOwner() == r) break;
                  n = n.getOwner().getParent();
                }
                return null;
              }),
              (s.prototype.updateLength = function () {
                var t = new Array(4);
                (this.isOverlapingSourceAndTarget = i.getIntersection(
                  this.target.getRect(),
                  this.source.getRect(),
                  t
                )),
                  this.isOverlapingSourceAndTarget ||
                    ((this.lengthX = t[0] - t[2]),
                    (this.lengthY = t[1] - t[3]),
                    Math.abs(this.lengthX) < 1 &&
                      (this.lengthX = o.sign(this.lengthX)),
                    Math.abs(this.lengthY) < 1 &&
                      (this.lengthY = o.sign(this.lengthY)),
                    (this.length = Math.sqrt(
                      this.lengthX * this.lengthX + this.lengthY * this.lengthY
                    )));
              }),
              (s.prototype.updateLengthSimple = function () {
                (this.lengthX =
                  this.target.getCenterX() - this.source.getCenterX()),
                  (this.lengthY =
                    this.target.getCenterY() - this.source.getCenterY()),
                  Math.abs(this.lengthX) < 1 &&
                    (this.lengthX = o.sign(this.lengthX)),
                  Math.abs(this.lengthY) < 1 &&
                    (this.lengthY = o.sign(this.lengthY)),
                  (this.length = Math.sqrt(
                    this.lengthX * this.lengthX + this.lengthY * this.lengthY
                  ));
              }),
              (t.exports = s);
          },
          function (t, e, n) {
            "use strict";
            t.exports = function (t) {
              this.vGraphObject = t;
            };
          },
          function (t, e, n) {
            "use strict";
            var r = n(2),
              i = n(10),
              o = n(13),
              s = n(0),
              a = n(16),
              h = n(5);
            function u(t, e, n, s) {
              null == n && null == s && (s = e),
                r.call(this, s),
                null != t.graphManager && (t = t.graphManager),
                (this.estimatedSize = i.MIN_VALUE),
                (this.inclusionTreeDepth = i.MAX_VALUE),
                (this.vGraphObject = s),
                (this.edges = []),
                (this.graphManager = t),
                (this.rect =
                  null != n && null != e
                    ? new o(e.x, e.y, n.width, n.height)
                    : new o());
            }
            for (var c in ((u.prototype = Object.create(r.prototype)), r))
              u[c] = r[c];
            (u.prototype.getEdges = function () {
              return this.edges;
            }),
              (u.prototype.getChild = function () {
                return this.child;
              }),
              (u.prototype.getOwner = function () {
                return this.owner;
              }),
              (u.prototype.getWidth = function () {
                return this.rect.width;
              }),
              (u.prototype.setWidth = function (t) {
                this.rect.width = t;
              }),
              (u.prototype.getHeight = function () {
                return this.rect.height;
              }),
              (u.prototype.setHeight = function (t) {
                this.rect.height = t;
              }),
              (u.prototype.getCenterX = function () {
                return this.rect.x + this.rect.width / 2;
              }),
              (u.prototype.getCenterY = function () {
                return this.rect.y + this.rect.height / 2;
              }),
              (u.prototype.getCenter = function () {
                return new h(
                  this.rect.x + this.rect.width / 2,
                  this.rect.y + this.rect.height / 2
                );
              }),
              (u.prototype.getLocation = function () {
                return new h(this.rect.x, this.rect.y);
              }),
              (u.prototype.getRect = function () {
                return this.rect;
              }),
              (u.prototype.getDiagonal = function () {
                return Math.sqrt(
                  this.rect.width * this.rect.width +
                    this.rect.height * this.rect.height
                );
              }),
              (u.prototype.getHalfTheDiagonal = function () {
                return (
                  Math.sqrt(
                    this.rect.height * this.rect.height +
                      this.rect.width * this.rect.width
                  ) / 2
                );
              }),
              (u.prototype.setRect = function (t, e) {
                (this.rect.x = t.x),
                  (this.rect.y = t.y),
                  (this.rect.width = e.width),
                  (this.rect.height = e.height);
              }),
              (u.prototype.setCenter = function (t, e) {
                (this.rect.x = t - this.rect.width / 2),
                  (this.rect.y = e - this.rect.height / 2);
              }),
              (u.prototype.setLocation = function (t, e) {
                (this.rect.x = t), (this.rect.y = e);
              }),
              (u.prototype.moveBy = function (t, e) {
                (this.rect.x += t), (this.rect.y += e);
              }),
              (u.prototype.getEdgeListToNode = function (t) {
                var e = [],
                  n = this;
                return (
                  n.edges.forEach(function (r) {
                    if (r.target == t) {
                      if (r.source != n) throw "Incorrect edge source!";
                      e.push(r);
                    }
                  }),
                  e
                );
              }),
              (u.prototype.getEdgesBetween = function (t) {
                var e = [],
                  n = this;
                return (
                  n.edges.forEach(function (r) {
                    if (r.source != n && r.target != n)
                      throw "Incorrect edge source and/or target";
                    (r.target != t && r.source != t) || e.push(r);
                  }),
                  e
                );
              }),
              (u.prototype.getNeighborsList = function () {
                var t = new Set(),
                  e = this;
                return (
                  e.edges.forEach(function (n) {
                    if (n.source == e) t.add(n.target);
                    else {
                      if (n.target != e) throw "Incorrect incidency!";
                      t.add(n.source);
                    }
                  }),
                  t
                );
              }),
              (u.prototype.withChildren = function () {
                var t = new Set();
                if ((t.add(this), null != this.child))
                  for (var e = this.child.getNodes(), n = 0; n < e.length; n++)
                    e[n].withChildren().forEach(function (e) {
                      t.add(e);
                    });
                return t;
              }),
              (u.prototype.getNoOfChildren = function () {
                var t = 0;
                if (null == this.child) t = 1;
                else
                  for (var e = this.child.getNodes(), n = 0; n < e.length; n++)
                    t += e[n].getNoOfChildren();
                return 0 == t && (t = 1), t;
              }),
              (u.prototype.getEstimatedSize = function () {
                if (this.estimatedSize == i.MIN_VALUE) throw "assert failed";
                return this.estimatedSize;
              }),
              (u.prototype.calcEstimatedSize = function () {
                return null == this.child
                  ? (this.estimatedSize =
                      (this.rect.width + this.rect.height) / 2)
                  : ((this.estimatedSize = this.child.calcEstimatedSize()),
                    (this.rect.width = this.estimatedSize),
                    (this.rect.height = this.estimatedSize),
                    this.estimatedSize);
              }),
              (u.prototype.scatter = function () {
                var t,
                  e,
                  n = -s.INITIAL_WORLD_BOUNDARY,
                  r = s.INITIAL_WORLD_BOUNDARY;
                t = s.WORLD_CENTER_X + a.nextDouble() * (r - n) + n;
                var i = -s.INITIAL_WORLD_BOUNDARY,
                  o = s.INITIAL_WORLD_BOUNDARY;
                (e = s.WORLD_CENTER_Y + a.nextDouble() * (o - i) + i),
                  (this.rect.x = t),
                  (this.rect.y = e);
              }),
              (u.prototype.updateBounds = function () {
                if (null == this.getChild()) throw "assert failed";
                if (0 != this.getChild().getNodes().length) {
                  var t = this.getChild();
                  if (
                    (t.updateBounds(!0),
                    (this.rect.x = t.getLeft()),
                    (this.rect.y = t.getTop()),
                    this.setWidth(t.getRight() - t.getLeft()),
                    this.setHeight(t.getBottom() - t.getTop()),
                    s.NODE_DIMENSIONS_INCLUDE_LABELS)
                  ) {
                    var e = t.getRight() - t.getLeft(),
                      n = t.getBottom() - t.getTop();
                    this.labelWidth &&
                      ("left" == this.labelPosHorizontal
                        ? ((this.rect.x -= this.labelWidth),
                          this.setWidth(e + this.labelWidth))
                        : "center" == this.labelPosHorizontal &&
                          this.labelWidth > e
                        ? ((this.rect.x -= (this.labelWidth - e) / 2),
                          this.setWidth(this.labelWidth))
                        : "right" == this.labelPosHorizontal &&
                          this.setWidth(e + this.labelWidth)),
                      this.labelHeight &&
                        ("top" == this.labelPosVertical
                          ? ((this.rect.y -= this.labelHeight),
                            this.setHeight(n + this.labelHeight))
                          : "center" == this.labelPosVertical &&
                            this.labelHeight > n
                          ? ((this.rect.y -= (this.labelHeight - n) / 2),
                            this.setHeight(this.labelHeight))
                          : "bottom" == this.labelPosVertical &&
                            this.setHeight(n + this.labelHeight));
                  }
                }
              }),
              (u.prototype.getInclusionTreeDepth = function () {
                if (this.inclusionTreeDepth == i.MAX_VALUE)
                  throw "assert failed";
                return this.inclusionTreeDepth;
              }),
              (u.prototype.transform = function (t) {
                var e = this.rect.x;
                e > s.WORLD_BOUNDARY
                  ? (e = s.WORLD_BOUNDARY)
                  : e < -s.WORLD_BOUNDARY && (e = -s.WORLD_BOUNDARY);
                var n = this.rect.y;
                n > s.WORLD_BOUNDARY
                  ? (n = s.WORLD_BOUNDARY)
                  : n < -s.WORLD_BOUNDARY && (n = -s.WORLD_BOUNDARY);
                var r = new h(e, n),
                  i = t.inverseTransformPoint(r);
                this.setLocation(i.x, i.y);
              }),
              (u.prototype.getLeft = function () {
                return this.rect.x;
              }),
              (u.prototype.getRight = function () {
                return this.rect.x + this.rect.width;
              }),
              (u.prototype.getTop = function () {
                return this.rect.y;
              }),
              (u.prototype.getBottom = function () {
                return this.rect.y + this.rect.height;
              }),
              (u.prototype.getParent = function () {
                return null == this.owner ? null : this.owner.getParent();
              }),
              (t.exports = u);
          },
          function (t, e, n) {
            "use strict";
            var r = n(0);
            function i() {}
            for (var o in r) i[o] = r[o];
            (i.MAX_ITERATIONS = 2500),
              (i.DEFAULT_EDGE_LENGTH = 50),
              (i.DEFAULT_SPRING_STRENGTH = 0.45),
              (i.DEFAULT_REPULSION_STRENGTH = 4500),
              (i.DEFAULT_GRAVITY_STRENGTH = 0.4),
              (i.DEFAULT_COMPOUND_GRAVITY_STRENGTH = 1),
              (i.DEFAULT_GRAVITY_RANGE_FACTOR = 3.8),
              (i.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = 1.5),
              (i.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION = !0),
              (i.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION = !0),
              (i.DEFAULT_COOLING_FACTOR_INCREMENTAL = 0.3),
              (i.COOLING_ADAPTATION_FACTOR = 0.33),
              (i.ADAPTATION_LOWER_NODE_LIMIT = 1e3),
              (i.ADAPTATION_UPPER_NODE_LIMIT = 5e3),
              (i.MAX_NODE_DISPLACEMENT_INCREMENTAL = 100),
              (i.MAX_NODE_DISPLACEMENT =
                3 * i.MAX_NODE_DISPLACEMENT_INCREMENTAL),
              (i.MIN_REPULSION_DIST = i.DEFAULT_EDGE_LENGTH / 10),
              (i.CONVERGENCE_CHECK_PERIOD = 100),
              (i.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = 0.1),
              (i.MIN_EDGE_LENGTH = 1),
              (i.GRID_CALCULATION_CHECK_PERIOD = 10),
              (t.exports = i);
          },
          function (t, e, n) {
            "use strict";
            function r(t, e) {
              null == t && null == e
                ? ((this.x = 0), (this.y = 0))
                : ((this.x = t), (this.y = e));
            }
            (r.prototype.getX = function () {
              return this.x;
            }),
              (r.prototype.getY = function () {
                return this.y;
              }),
              (r.prototype.setX = function (t) {
                this.x = t;
              }),
              (r.prototype.setY = function (t) {
                this.y = t;
              }),
              (r.prototype.getDifference = function (t) {
                return new DimensionD(this.x - t.x, this.y - t.y);
              }),
              (r.prototype.getCopy = function () {
                return new r(this.x, this.y);
              }),
              (r.prototype.translate = function (t) {
                return (this.x += t.width), (this.y += t.height), this;
              }),
              (t.exports = r);
          },
          function (t, e, n) {
            "use strict";
            var r = n(2),
              i = n(10),
              o = n(0),
              s = n(7),
              a = n(3),
              h = n(1),
              u = n(13),
              c = n(12),
              l = n(11);
            function p(t, e, n) {
              r.call(this, n),
                (this.estimatedSize = i.MIN_VALUE),
                (this.margin = o.DEFAULT_GRAPH_MARGIN),
                (this.edges = []),
                (this.nodes = []),
                (this.isConnected = !1),
                (this.parent = t),
                null != e && e instanceof s
                  ? (this.graphManager = e)
                  : null != e &&
                    e instanceof Layout &&
                    (this.graphManager = e.graphManager);
            }
            for (var f in ((p.prototype = Object.create(r.prototype)), r))
              p[f] = r[f];
            (p.prototype.getNodes = function () {
              return this.nodes;
            }),
              (p.prototype.getEdges = function () {
                return this.edges;
              }),
              (p.prototype.getGraphManager = function () {
                return this.graphManager;
              }),
              (p.prototype.getParent = function () {
                return this.parent;
              }),
              (p.prototype.getLeft = function () {
                return this.left;
              }),
              (p.prototype.getRight = function () {
                return this.right;
              }),
              (p.prototype.getTop = function () {
                return this.top;
              }),
              (p.prototype.getBottom = function () {
                return this.bottom;
              }),
              (p.prototype.isConnected = function () {
                return this.isConnected;
              }),
              (p.prototype.add = function (t, e, n) {
                if (null == e && null == n) {
                  var r = t;
                  if (null == this.graphManager)
                    throw "Graph has no graph mgr!";
                  if (this.getNodes().indexOf(r) > -1)
                    throw "Node already in graph!";
                  return (r.owner = this), this.getNodes().push(r), r;
                }
                var i = t;
                if (
                  !(
                    this.getNodes().indexOf(e) > -1 &&
                    this.getNodes().indexOf(n) > -1
                  )
                )
                  throw "Source or target not in graph!";
                if (e.owner != n.owner || e.owner != this)
                  throw "Both owners must be this graph!";
                return e.owner != n.owner
                  ? null
                  : ((i.source = e),
                    (i.target = n),
                    (i.isInterGraph = !1),
                    this.getEdges().push(i),
                    e.edges.push(i),
                    n != e && n.edges.push(i),
                    i);
              }),
              (p.prototype.remove = function (t) {
                var e = t;
                if (t instanceof a) {
                  if (null == e) throw "Node is null!";
                  if (null == e.owner || e.owner != this)
                    throw "Owner graph is invalid!";
                  if (null == this.graphManager)
                    throw "Owner graph manager is invalid!";
                  for (var n = e.edges.slice(), r = n.length, i = 0; i < r; i++)
                    (o = n[i]).isInterGraph
                      ? this.graphManager.remove(o)
                      : o.source.owner.remove(o);
                  if (-1 == (s = this.nodes.indexOf(e)))
                    throw "Node not in owner node list!";
                  this.nodes.splice(s, 1);
                } else if (t instanceof h) {
                  var o;
                  if (null == (o = t)) throw "Edge is null!";
                  if (null == o.source || null == o.target)
                    throw "Source and/or target is null!";
                  if (
                    null == o.source.owner ||
                    null == o.target.owner ||
                    o.source.owner != this ||
                    o.target.owner != this
                  )
                    throw "Source and/or target owner is invalid!";
                  var s,
                    u = o.source.edges.indexOf(o),
                    c = o.target.edges.indexOf(o);
                  if (!(u > -1 && c > -1))
                    throw "Source and/or target doesn't know this edge!";
                  if (
                    (o.source.edges.splice(u, 1),
                    o.target != o.source && o.target.edges.splice(c, 1),
                    -1 == (s = o.source.owner.getEdges().indexOf(o)))
                  )
                    throw "Not in owner's edge list!";
                  o.source.owner.getEdges().splice(s, 1);
                }
              }),
              (p.prototype.updateLeftTop = function () {
                for (
                  var t,
                    e,
                    n,
                    r = i.MAX_VALUE,
                    o = i.MAX_VALUE,
                    s = this.getNodes(),
                    a = s.length,
                    h = 0;
                  h < a;
                  h++
                ) {
                  var u = s[h];
                  r > (t = u.getTop()) && (r = t),
                    o > (e = u.getLeft()) && (o = e);
                }
                return r == i.MAX_VALUE
                  ? null
                  : ((n =
                      null != s[0].getParent().paddingLeft
                        ? s[0].getParent().paddingLeft
                        : this.margin),
                    (this.left = o - n),
                    (this.top = r - n),
                    new c(this.left, this.top));
              }),
              (p.prototype.updateBounds = function (t) {
                for (
                  var e,
                    n,
                    r,
                    o,
                    s,
                    a = i.MAX_VALUE,
                    h = -i.MAX_VALUE,
                    c = i.MAX_VALUE,
                    l = -i.MAX_VALUE,
                    p = this.nodes,
                    f = p.length,
                    d = 0;
                  d < f;
                  d++
                ) {
                  var g = p[d];
                  t && null != g.child && g.updateBounds(),
                    a > (e = g.getLeft()) && (a = e),
                    h < (n = g.getRight()) && (h = n),
                    c > (r = g.getTop()) && (c = r),
                    l < (o = g.getBottom()) && (l = o);
                }
                var v = new u(a, c, h - a, l - c);
                a == i.MAX_VALUE &&
                  ((this.left = this.parent.getLeft()),
                  (this.right = this.parent.getRight()),
                  (this.top = this.parent.getTop()),
                  (this.bottom = this.parent.getBottom())),
                  (s =
                    null != p[0].getParent().paddingLeft
                      ? p[0].getParent().paddingLeft
                      : this.margin),
                  (this.left = v.x - s),
                  (this.right = v.x + v.width + s),
                  (this.top = v.y - s),
                  (this.bottom = v.y + v.height + s);
              }),
              (p.calculateBounds = function (t) {
                for (
                  var e,
                    n,
                    r,
                    o,
                    s = i.MAX_VALUE,
                    a = -i.MAX_VALUE,
                    h = i.MAX_VALUE,
                    c = -i.MAX_VALUE,
                    l = t.length,
                    p = 0;
                  p < l;
                  p++
                ) {
                  var f = t[p];
                  s > (e = f.getLeft()) && (s = e),
                    a < (n = f.getRight()) && (a = n),
                    h > (r = f.getTop()) && (h = r),
                    c < (o = f.getBottom()) && (c = o);
                }
                return new u(s, h, a - s, c - h);
              }),
              (p.prototype.getInclusionTreeDepth = function () {
                return this == this.graphManager.getRoot()
                  ? 1
                  : this.parent.getInclusionTreeDepth();
              }),
              (p.prototype.getEstimatedSize = function () {
                if (this.estimatedSize == i.MIN_VALUE) throw "assert failed";
                return this.estimatedSize;
              }),
              (p.prototype.calcEstimatedSize = function () {
                for (var t = 0, e = this.nodes, n = e.length, r = 0; r < n; r++)
                  t += e[r].calcEstimatedSize();
                return (
                  (this.estimatedSize =
                    0 == t
                      ? o.EMPTY_COMPOUND_NODE_SIZE
                      : t / Math.sqrt(this.nodes.length)),
                  this.estimatedSize
                );
              }),
              (p.prototype.updateConnected = function () {
                var t = this;
                if (0 != this.nodes.length) {
                  var e,
                    n,
                    r = new l(),
                    i = new Set(),
                    o = this.nodes[0];
                  for (
                    o.withChildren().forEach(function (t) {
                      r.push(t), i.add(t);
                    });
                    0 !== r.length;

                  )
                    for (
                      var s = (e = (o = r.shift()).getEdges()).length, a = 0;
                      a < s;
                      a++
                    )
                      null == (n = e[a].getOtherEndInGraph(o, this)) ||
                        i.has(n) ||
                        n.withChildren().forEach(function (t) {
                          r.push(t), i.add(t);
                        });
                  if (((this.isConnected = !1), i.size >= this.nodes.length)) {
                    var h = 0;
                    i.forEach(function (e) {
                      e.owner == t && h++;
                    }),
                      h == this.nodes.length && (this.isConnected = !0);
                  }
                } else this.isConnected = !0;
              }),
              (t.exports = p);
          },
          function (t, e, n) {
            "use strict";
            var r,
              i = n(1);
            function o(t) {
              (r = n(6)),
                (this.layout = t),
                (this.graphs = []),
                (this.edges = []);
            }
            (o.prototype.addRoot = function () {
              var t = this.layout.newGraph(),
                e = this.layout.newNode(null),
                n = this.add(t, e);
              return this.setRootGraph(n), this.rootGraph;
            }),
              (o.prototype.add = function (t, e, n, r, i) {
                if (null == n && null == r && null == i) {
                  if (null == t) throw "Graph is null!";
                  if (null == e) throw "Parent node is null!";
                  if (this.graphs.indexOf(t) > -1)
                    throw "Graph already in this graph mgr!";
                  if ((this.graphs.push(t), null != t.parent))
                    throw "Already has a parent!";
                  if (null != e.child) throw "Already has a child!";
                  return (t.parent = e), (e.child = t), t;
                }
                (i = n), (n = t);
                var o = (r = e).getOwner(),
                  s = i.getOwner();
                if (null == o || o.getGraphManager() != this)
                  throw "Source not in this graph mgr!";
                if (null == s || s.getGraphManager() != this)
                  throw "Target not in this graph mgr!";
                if (o == s) return (n.isInterGraph = !1), o.add(n, r, i);
                if (
                  ((n.isInterGraph = !0),
                  (n.source = r),
                  (n.target = i),
                  this.edges.indexOf(n) > -1)
                )
                  throw "Edge already in inter-graph edge list!";
                if ((this.edges.push(n), null == n.source || null == n.target))
                  throw "Edge source and/or target is null!";
                if (
                  -1 != n.source.edges.indexOf(n) ||
                  -1 != n.target.edges.indexOf(n)
                )
                  throw "Edge already in source and/or target incidency list!";
                return n.source.edges.push(n), n.target.edges.push(n), n;
              }),
              (o.prototype.remove = function (t) {
                if (t instanceof r) {
                  var e = t;
                  if (e.getGraphManager() != this)
                    throw "Graph not in this graph mgr";
                  if (
                    e != this.rootGraph &&
                    (null == e.parent || e.parent.graphManager != this)
                  )
                    throw "Invalid parent node!";
                  for (
                    var n,
                      o = [],
                      s = (o = o.concat(e.getEdges())).length,
                      a = 0;
                    a < s;
                    a++
                  )
                    (n = o[a]), e.remove(n);
                  var h,
                    u = [];
                  for (
                    s = (u = u.concat(e.getNodes())).length, a = 0;
                    a < s;
                    a++
                  )
                    (h = u[a]), e.remove(h);
                  e == this.rootGraph && this.setRootGraph(null);
                  var c = this.graphs.indexOf(e);
                  this.graphs.splice(c, 1), (e.parent = null);
                } else if (t instanceof i) {
                  if (null == (n = t)) throw "Edge is null!";
                  if (!n.isInterGraph) throw "Not an inter-graph edge!";
                  if (null == n.source || null == n.target)
                    throw "Source and/or target is null!";
                  if (
                    -1 == n.source.edges.indexOf(n) ||
                    -1 == n.target.edges.indexOf(n)
                  )
                    throw "Source and/or target doesn't know this edge!";
                  if (
                    ((c = n.source.edges.indexOf(n)),
                    n.source.edges.splice(c, 1),
                    (c = n.target.edges.indexOf(n)),
                    n.target.edges.splice(c, 1),
                    null == n.source.owner ||
                      null == n.source.owner.getGraphManager())
                  )
                    throw "Edge owner graph or owner graph manager is null!";
                  if (-1 == n.source.owner.getGraphManager().edges.indexOf(n))
                    throw "Not in owner graph manager's edge list!";
                  (c = n.source.owner.getGraphManager().edges.indexOf(n)),
                    n.source.owner.getGraphManager().edges.splice(c, 1);
                }
              }),
              (o.prototype.updateBounds = function () {
                this.rootGraph.updateBounds(!0);
              }),
              (o.prototype.getGraphs = function () {
                return this.graphs;
              }),
              (o.prototype.getAllNodes = function () {
                if (null == this.allNodes) {
                  for (
                    var t = [], e = this.getGraphs(), n = e.length, r = 0;
                    r < n;
                    r++
                  )
                    t = t.concat(e[r].getNodes());
                  this.allNodes = t;
                }
                return this.allNodes;
              }),
              (o.prototype.resetAllNodes = function () {
                this.allNodes = null;
              }),
              (o.prototype.resetAllEdges = function () {
                this.allEdges = null;
              }),
              (o.prototype.resetAllNodesToApplyGravitation = function () {
                this.allNodesToApplyGravitation = null;
              }),
              (o.prototype.getAllEdges = function () {
                if (null == this.allEdges) {
                  for (
                    var t = [], e = this.getGraphs(), n = (e.length, 0);
                    n < e.length;
                    n++
                  )
                    t = t.concat(e[n].getEdges());
                  (t = t.concat(this.edges)), (this.allEdges = t);
                }
                return this.allEdges;
              }),
              (o.prototype.getAllNodesToApplyGravitation = function () {
                return this.allNodesToApplyGravitation;
              }),
              (o.prototype.setAllNodesToApplyGravitation = function (t) {
                if (null != this.allNodesToApplyGravitation)
                  throw "assert failed";
                this.allNodesToApplyGravitation = t;
              }),
              (o.prototype.getRoot = function () {
                return this.rootGraph;
              }),
              (o.prototype.setRootGraph = function (t) {
                if (t.getGraphManager() != this)
                  throw "Root not in this graph mgr!";
                (this.rootGraph = t),
                  null == t.parent &&
                    (t.parent = this.layout.newNode("Root node"));
              }),
              (o.prototype.getLayout = function () {
                return this.layout;
              }),
              (o.prototype.isOneAncestorOfOther = function (t, e) {
                if (null == t || null == e) throw "assert failed";
                if (t == e) return !0;
                for (var n, r = t.getOwner(); null != (n = r.getParent()); ) {
                  if (n == e) return !0;
                  if (null == (r = n.getOwner())) break;
                }
                for (r = e.getOwner(); null != (n = r.getParent()); ) {
                  if (n == t) return !0;
                  if (null == (r = n.getOwner())) break;
                }
                return !1;
              }),
              (o.prototype.calcLowestCommonAncestors = function () {
                for (
                  var t,
                    e,
                    n,
                    r,
                    i,
                    o = this.getAllEdges(),
                    s = o.length,
                    a = 0;
                  a < s;
                  a++
                )
                  if (
                    ((e = (t = o[a]).source),
                    (n = t.target),
                    (t.lca = null),
                    (t.sourceInLca = e),
                    (t.targetInLca = n),
                    e != n)
                  ) {
                    for (r = e.getOwner(); null == t.lca; ) {
                      for (
                        t.targetInLca = n, i = n.getOwner();
                        null == t.lca;

                      ) {
                        if (i == r) {
                          t.lca = i;
                          break;
                        }
                        if (i == this.rootGraph) break;
                        if (null != t.lca) throw "assert failed";
                        (t.targetInLca = i.getParent()),
                          (i = t.targetInLca.getOwner());
                      }
                      if (r == this.rootGraph) break;
                      null == t.lca &&
                        ((t.sourceInLca = r.getParent()),
                        (r = t.sourceInLca.getOwner()));
                    }
                    if (null == t.lca) throw "assert failed";
                  } else t.lca = e.getOwner();
              }),
              (o.prototype.calcLowestCommonAncestor = function (t, e) {
                if (t == e) return t.getOwner();
                for (var n = t.getOwner(); null != n; ) {
                  for (var r = e.getOwner(); null != r; ) {
                    if (r == n) return r;
                    r = r.getParent().getOwner();
                  }
                  n = n.getParent().getOwner();
                }
                return n;
              }),
              (o.prototype.calcInclusionTreeDepths = function (t, e) {
                var n;
                null == t && null == e && ((t = this.rootGraph), (e = 1));
                for (var r = t.getNodes(), i = r.length, o = 0; o < i; o++)
                  ((n = r[o]).inclusionTreeDepth = e),
                    null != n.child &&
                      this.calcInclusionTreeDepths(n.child, e + 1);
              }),
              (o.prototype.includesInvalidEdge = function () {
                for (var t, e = [], n = this.edges.length, r = 0; r < n; r++)
                  (t = this.edges[r]),
                    this.isOneAncestorOfOther(t.source, t.target) && e.push(t);
                for (r = 0; r < e.length; r++) this.remove(e[r]);
                return !1;
              }),
              (t.exports = o);
          },
          function (t, e, n) {
            "use strict";
            var r = n(12);
            function i() {}
            (i.calcSeparationAmount = function (t, e, n, r) {
              if (!t.intersects(e)) throw "assert failed";
              var i = new Array(2);
              this.decideDirectionsForOverlappingNodes(t, e, i),
                (n[0] =
                  Math.min(t.getRight(), e.getRight()) - Math.max(t.x, e.x)),
                (n[1] =
                  Math.min(t.getBottom(), e.getBottom()) - Math.max(t.y, e.y)),
                t.getX() <= e.getX() && t.getRight() >= e.getRight()
                  ? (n[0] += Math.min(
                      e.getX() - t.getX(),
                      t.getRight() - e.getRight()
                    ))
                  : e.getX() <= t.getX() &&
                    e.getRight() >= t.getRight() &&
                    (n[0] += Math.min(
                      t.getX() - e.getX(),
                      e.getRight() - t.getRight()
                    )),
                t.getY() <= e.getY() && t.getBottom() >= e.getBottom()
                  ? (n[1] += Math.min(
                      e.getY() - t.getY(),
                      t.getBottom() - e.getBottom()
                    ))
                  : e.getY() <= t.getY() &&
                    e.getBottom() >= t.getBottom() &&
                    (n[1] += Math.min(
                      t.getY() - e.getY(),
                      e.getBottom() - t.getBottom()
                    ));
              var o = Math.abs(
                (e.getCenterY() - t.getCenterY()) /
                  (e.getCenterX() - t.getCenterX())
              );
              e.getCenterY() === t.getCenterY() &&
                e.getCenterX() === t.getCenterX() &&
                (o = 1);
              var s = o * n[0],
                a = n[1] / o;
              n[0] < a ? (a = n[0]) : (s = n[1]),
                (n[0] = -1 * i[0] * (a / 2 + r)),
                (n[1] = -1 * i[1] * (s / 2 + r));
            }),
              (i.decideDirectionsForOverlappingNodes = function (t, e, n) {
                t.getCenterX() < e.getCenterX() ? (n[0] = -1) : (n[0] = 1),
                  t.getCenterY() < e.getCenterY() ? (n[1] = -1) : (n[1] = 1);
              }),
              (i.getIntersection2 = function (t, e, n) {
                var r = t.getCenterX(),
                  i = t.getCenterY(),
                  o = e.getCenterX(),
                  s = e.getCenterY();
                if (t.intersects(e))
                  return (n[0] = r), (n[1] = i), (n[2] = o), (n[3] = s), !0;
                var a = t.getX(),
                  h = t.getY(),
                  u = t.getRight(),
                  c = t.getX(),
                  l = t.getBottom(),
                  p = t.getRight(),
                  f = t.getWidthHalf(),
                  d = t.getHeightHalf(),
                  g = e.getX(),
                  v = e.getY(),
                  y = e.getRight(),
                  m = e.getX(),
                  _ = e.getBottom(),
                  E = e.getRight(),
                  b = e.getWidthHalf(),
                  w = e.getHeightHalf(),
                  N = !1,
                  x = !1;
                if (r === o) {
                  if (i > s)
                    return (n[0] = r), (n[1] = h), (n[2] = o), (n[3] = _), !1;
                  if (i < s)
                    return (n[0] = r), (n[1] = l), (n[2] = o), (n[3] = v), !1;
                } else if (i === s) {
                  if (r > o)
                    return (n[0] = a), (n[1] = i), (n[2] = y), (n[3] = s), !1;
                  if (r < o)
                    return (n[0] = u), (n[1] = i), (n[2] = g), (n[3] = s), !1;
                } else {
                  var A = t.height / t.width,
                    T = e.height / e.width,
                    M = (s - i) / (o - r),
                    O = void 0,
                    I = void 0,
                    L = void 0,
                    C = void 0,
                    D = void 0,
                    S = void 0;
                  if (
                    (-A === M
                      ? r > o
                        ? ((n[0] = c), (n[1] = l), (N = !0))
                        : ((n[0] = u), (n[1] = h), (N = !0))
                      : A === M &&
                        (r > o
                          ? ((n[0] = a), (n[1] = h), (N = !0))
                          : ((n[0] = p), (n[1] = l), (N = !0))),
                    -T === M
                      ? o > r
                        ? ((n[2] = m), (n[3] = _), (x = !0))
                        : ((n[2] = y), (n[3] = v), (x = !0))
                      : T === M &&
                        (o > r
                          ? ((n[2] = g), (n[3] = v), (x = !0))
                          : ((n[2] = E), (n[3] = _), (x = !0))),
                    N && x)
                  )
                    return !1;
                  if (
                    (r > o
                      ? i > s
                        ? ((O = this.getCardinalDirection(A, M, 4)),
                          (I = this.getCardinalDirection(T, M, 2)))
                        : ((O = this.getCardinalDirection(-A, M, 3)),
                          (I = this.getCardinalDirection(-T, M, 1)))
                      : i > s
                      ? ((O = this.getCardinalDirection(-A, M, 1)),
                        (I = this.getCardinalDirection(-T, M, 3)))
                      : ((O = this.getCardinalDirection(A, M, 2)),
                        (I = this.getCardinalDirection(T, M, 4))),
                    !N)
                  )
                    switch (O) {
                      case 1:
                        (C = h), (L = r + -d / M), (n[0] = L), (n[1] = C);
                        break;
                      case 2:
                        (L = p), (C = i + f * M), (n[0] = L), (n[1] = C);
                        break;
                      case 3:
                        (C = l), (L = r + d / M), (n[0] = L), (n[1] = C);
                        break;
                      case 4:
                        (L = c), (C = i + -f * M), (n[0] = L), (n[1] = C);
                    }
                  if (!x)
                    switch (I) {
                      case 1:
                        (S = v), (D = o + -w / M), (n[2] = D), (n[3] = S);
                        break;
                      case 2:
                        (D = E), (S = s + b * M), (n[2] = D), (n[3] = S);
                        break;
                      case 3:
                        (S = _), (D = o + w / M), (n[2] = D), (n[3] = S);
                        break;
                      case 4:
                        (D = m), (S = s + -b * M), (n[2] = D), (n[3] = S);
                    }
                }
                return !1;
              }),
              (i.getCardinalDirection = function (t, e, n) {
                return t > e ? n : 1 + (n % 4);
              }),
              (i.getIntersection = function (t, e, n, i) {
                if (null == i) return this.getIntersection2(t, e, n);
                var o,
                  s,
                  a,
                  h,
                  u,
                  c,
                  l,
                  p = t.x,
                  f = t.y,
                  d = e.x,
                  g = e.y,
                  v = n.x,
                  y = n.y,
                  m = i.x,
                  _ = i.y;
                return 0 ==
                  (l = (o = g - f) * (h = v - m) - (s = _ - y) * (a = p - d))
                  ? null
                  : new r(
                      (a * (c = m * y - v * _) - h * (u = d * f - p * g)) / l,
                      (s * u - o * c) / l
                    );
              }),
              (i.angleOfVector = function (t, e, n, r) {
                var i = void 0;
                return (
                  t !== n
                    ? ((i = Math.atan((r - e) / (n - t))),
                      n < t ? (i += Math.PI) : r < e && (i += this.TWO_PI))
                    : (i = r < e ? this.ONE_AND_HALF_PI : this.HALF_PI),
                  i
                );
              }),
              (i.doIntersect = function (t, e, n, r) {
                var i = t.x,
                  o = t.y,
                  s = e.x,
                  a = e.y,
                  h = n.x,
                  u = n.y,
                  c = r.x,
                  l = r.y,
                  p = (s - i) * (l - u) - (c - h) * (a - o);
                if (0 === p) return !1;
                var f = ((l - u) * (c - i) + (h - c) * (l - o)) / p,
                  d = ((o - a) * (c - i) + (s - i) * (l - o)) / p;
                return 0 < f && f < 1 && 0 < d && d < 1;
              }),
              (i.findCircleLineIntersections = function (t, e, n, r, i, o, s) {
                var a = (n - t) * (n - t) + (r - e) * (r - e),
                  h = 2 * ((t - i) * (n - t) + (e - o) * (r - e)),
                  u = (t - i) * (t - i) + (e - o) * (e - o) - s * s;
                if (h * h - 4 * a * u >= 0) {
                  var c = (-h + Math.sqrt(h * h - 4 * a * u)) / (2 * a),
                    l = (-h - Math.sqrt(h * h - 4 * a * u)) / (2 * a);
                  return c >= 0 && c <= 1 ? [c] : l >= 0 && l <= 1 ? [l] : null;
                }
                return null;
              }),
              (i.HALF_PI = 0.5 * Math.PI),
              (i.ONE_AND_HALF_PI = 1.5 * Math.PI),
              (i.TWO_PI = 2 * Math.PI),
              (i.THREE_PI = 3 * Math.PI),
              (t.exports = i);
          },
          function (t, e, n) {
            "use strict";
            function r() {}
            (r.sign = function (t) {
              return t > 0 ? 1 : t < 0 ? -1 : 0;
            }),
              (r.floor = function (t) {
                return t < 0 ? Math.ceil(t) : Math.floor(t);
              }),
              (r.ceil = function (t) {
                return t < 0 ? Math.floor(t) : Math.ceil(t);
              }),
              (t.exports = r);
          },
          function (t, e, n) {
            "use strict";
            function r() {}
            (r.MAX_VALUE = 2147483647),
              (r.MIN_VALUE = -2147483648),
              (t.exports = r);
          },
          function (t, e, n) {
            "use strict";
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    (r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      "value" in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r);
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e;
                };
              })(),
              i = function (t) {
                return { value: t, next: null, prev: null };
              },
              o = function (t, e, n, r) {
                return (
                  null !== t ? (t.next = e) : (r.head = e),
                  null !== n ? (n.prev = e) : (r.tail = e),
                  (e.prev = t),
                  (e.next = n),
                  r.length++,
                  e
                );
              },
              s = function (t, e) {
                var n = t.prev,
                  r = t.next;
                return (
                  null !== n ? (n.next = r) : (e.head = r),
                  null !== r ? (r.prev = n) : (e.tail = n),
                  (t.prev = t.next = null),
                  e.length--,
                  t
                );
              },
              a = (function () {
                function t(e) {
                  var n = this;
                  !(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, t),
                    (this.length = 0),
                    (this.head = null),
                    (this.tail = null),
                    null != e &&
                      e.forEach(function (t) {
                        return n.push(t);
                      });
                }
                return (
                  r(t, [
                    {
                      key: "size",
                      value: function () {
                        return this.length;
                      },
                    },
                    {
                      key: "insertBefore",
                      value: function (t, e) {
                        return o(e.prev, i(t), e, this);
                      },
                    },
                    {
                      key: "insertAfter",
                      value: function (t, e) {
                        return o(e, i(t), e.next, this);
                      },
                    },
                    {
                      key: "insertNodeBefore",
                      value: function (t, e) {
                        return o(e.prev, t, e, this);
                      },
                    },
                    {
                      key: "insertNodeAfter",
                      value: function (t, e) {
                        return o(e, t, e.next, this);
                      },
                    },
                    {
                      key: "push",
                      value: function (t) {
                        return o(this.tail, i(t), null, this);
                      },
                    },
                    {
                      key: "unshift",
                      value: function (t) {
                        return o(null, i(t), this.head, this);
                      },
                    },
                    {
                      key: "remove",
                      value: function (t) {
                        return s(t, this);
                      },
                    },
                    {
                      key: "pop",
                      value: function () {
                        return s(this.tail, this).value;
                      },
                    },
                    {
                      key: "popNode",
                      value: function () {
                        return s(this.tail, this);
                      },
                    },
                    {
                      key: "shift",
                      value: function () {
                        return s(this.head, this).value;
                      },
                    },
                    {
                      key: "shiftNode",
                      value: function () {
                        return s(this.head, this);
                      },
                    },
                    {
                      key: "get_object_at",
                      value: function (t) {
                        if (t <= this.length()) {
                          for (var e = 1, n = this.head; e < t; )
                            (n = n.next), e++;
                          return n.value;
                        }
                      },
                    },
                    {
                      key: "set_object_at",
                      value: function (t, e) {
                        if (t <= this.length()) {
                          for (var n = 1, r = this.head; n < t; )
                            (r = r.next), n++;
                          r.value = e;
                        }
                      },
                    },
                  ]),
                  t
                );
              })();
            t.exports = a;
          },
          function (t, e, n) {
            "use strict";
            function r(t, e, n) {
              (this.x = null),
                (this.y = null),
                null == t && null == e && null == n
                  ? ((this.x = 0), (this.y = 0))
                  : "number" == typeof t && "number" == typeof e && null == n
                  ? ((this.x = t), (this.y = e))
                  : "Point" == t.constructor.name &&
                    null == e &&
                    null == n &&
                    ((n = t), (this.x = n.x), (this.y = n.y));
            }
            (r.prototype.getX = function () {
              return this.x;
            }),
              (r.prototype.getY = function () {
                return this.y;
              }),
              (r.prototype.getLocation = function () {
                return new r(this.x, this.y);
              }),
              (r.prototype.setLocation = function (t, e, n) {
                "Point" == t.constructor.name && null == e && null == n
                  ? ((n = t), this.setLocation(n.x, n.y))
                  : "number" == typeof t &&
                    "number" == typeof e &&
                    null == n &&
                    (parseInt(t) == t && parseInt(e) == e
                      ? this.move(t, e)
                      : ((this.x = Math.floor(t + 0.5)),
                        (this.y = Math.floor(e + 0.5))));
              }),
              (r.prototype.move = function (t, e) {
                (this.x = t), (this.y = e);
              }),
              (r.prototype.translate = function (t, e) {
                (this.x += t), (this.y += e);
              }),
              (r.prototype.equals = function (t) {
                if ("Point" == t.constructor.name) {
                  var e = t;
                  return this.x == e.x && this.y == e.y;
                }
                return this == t;
              }),
              (r.prototype.toString = function () {
                return (
                  new r().constructor.name +
                  "[x=" +
                  this.x +
                  ",y=" +
                  this.y +
                  "]"
                );
              }),
              (t.exports = r);
          },
          function (t, e, n) {
            "use strict";
            function r(t, e, n, r) {
              (this.x = 0),
                (this.y = 0),
                (this.width = 0),
                (this.height = 0),
                null != t &&
                  null != e &&
                  null != n &&
                  null != r &&
                  ((this.x = t),
                  (this.y = e),
                  (this.width = n),
                  (this.height = r));
            }
            (r.prototype.getX = function () {
              return this.x;
            }),
              (r.prototype.setX = function (t) {
                this.x = t;
              }),
              (r.prototype.getY = function () {
                return this.y;
              }),
              (r.prototype.setY = function (t) {
                this.y = t;
              }),
              (r.prototype.getWidth = function () {
                return this.width;
              }),
              (r.prototype.setWidth = function (t) {
                this.width = t;
              }),
              (r.prototype.getHeight = function () {
                return this.height;
              }),
              (r.prototype.setHeight = function (t) {
                this.height = t;
              }),
              (r.prototype.getRight = function () {
                return this.x + this.width;
              }),
              (r.prototype.getBottom = function () {
                return this.y + this.height;
              }),
              (r.prototype.intersects = function (t) {
                return !(
                  this.getRight() < t.x ||
                  this.getBottom() < t.y ||
                  t.getRight() < this.x ||
                  t.getBottom() < this.y
                );
              }),
              (r.prototype.getCenterX = function () {
                return this.x + this.width / 2;
              }),
              (r.prototype.getMinX = function () {
                return this.getX();
              }),
              (r.prototype.getMaxX = function () {
                return this.getX() + this.width;
              }),
              (r.prototype.getCenterY = function () {
                return this.y + this.height / 2;
              }),
              (r.prototype.getMinY = function () {
                return this.getY();
              }),
              (r.prototype.getMaxY = function () {
                return this.getY() + this.height;
              }),
              (r.prototype.getWidthHalf = function () {
                return this.width / 2;
              }),
              (r.prototype.getHeightHalf = function () {
                return this.height / 2;
              }),
              (t.exports = r);
          },
          function (t, e, n) {
            "use strict";
            var r =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  };
            function i() {}
            (i.lastID = 0),
              (i.createID = function (t) {
                return i.isPrimitive(t)
                  ? t
                  : (null != t.uniqueID ||
                      ((t.uniqueID = i.getString()), i.lastID++),
                    t.uniqueID);
              }),
              (i.getString = function (t) {
                return null == t && (t = i.lastID), "Object#" + t;
              }),
              (i.isPrimitive = function (t) {
                var e = void 0 === t ? "undefined" : r(t);
                return null == t || ("object" != e && "function" != e);
              }),
              (t.exports = i);
          },
          function (t, e, n) {
            "use strict";
            function r(t) {
              if (Array.isArray(t)) {
                for (var e = 0, n = Array(t.length); e < t.length; e++)
                  n[e] = t[e];
                return n;
              }
              return Array.from(t);
            }
            var i = n(0),
              o = n(7),
              s = n(3),
              a = n(1),
              h = n(6),
              u = n(5),
              c = n(17),
              l = n(29);
            function p(t) {
              l.call(this),
                (this.layoutQuality = i.QUALITY),
                (this.createBendsAsNeeded = i.DEFAULT_CREATE_BENDS_AS_NEEDED),
                (this.incremental = i.DEFAULT_INCREMENTAL),
                (this.animationOnLayout = i.DEFAULT_ANIMATION_ON_LAYOUT),
                (this.animationDuringLayout =
                  i.DEFAULT_ANIMATION_DURING_LAYOUT),
                (this.animationPeriod = i.DEFAULT_ANIMATION_PERIOD),
                (this.uniformLeafNodeSizes = i.DEFAULT_UNIFORM_LEAF_NODE_SIZES),
                (this.edgeToDummyNodes = new Map()),
                (this.graphManager = new o(this)),
                (this.isLayoutFinished = !1),
                (this.isSubLayout = !1),
                (this.isRemoteUse = !1),
                null != t && (this.isRemoteUse = t);
            }
            (p.RANDOM_SEED = 1),
              (p.prototype = Object.create(l.prototype)),
              (p.prototype.getGraphManager = function () {
                return this.graphManager;
              }),
              (p.prototype.getAllNodes = function () {
                return this.graphManager.getAllNodes();
              }),
              (p.prototype.getAllEdges = function () {
                return this.graphManager.getAllEdges();
              }),
              (p.prototype.getAllNodesToApplyGravitation = function () {
                return this.graphManager.getAllNodesToApplyGravitation();
              }),
              (p.prototype.newGraphManager = function () {
                var t = new o(this);
                return (this.graphManager = t), t;
              }),
              (p.prototype.newGraph = function (t) {
                return new h(null, this.graphManager, t);
              }),
              (p.prototype.newNode = function (t) {
                return new s(this.graphManager, t);
              }),
              (p.prototype.newEdge = function (t) {
                return new a(null, null, t);
              }),
              (p.prototype.checkLayoutSuccess = function () {
                return (
                  null == this.graphManager.getRoot() ||
                  0 == this.graphManager.getRoot().getNodes().length ||
                  this.graphManager.includesInvalidEdge()
                );
              }),
              (p.prototype.runLayout = function () {
                var t;
                return (
                  (this.isLayoutFinished = !1),
                  this.tilingPreLayout && this.tilingPreLayout(),
                  this.initParameters(),
                  (t = !this.checkLayoutSuccess() && this.layout()),
                  "during" !== i.ANIMATE &&
                    (t && (this.isSubLayout || this.doPostLayout()),
                    this.tilingPostLayout && this.tilingPostLayout(),
                    (this.isLayoutFinished = !0),
                    t)
                );
              }),
              (p.prototype.doPostLayout = function () {
                this.incremental || this.transform(), this.update();
              }),
              (p.prototype.update2 = function () {
                if (
                  (this.createBendsAsNeeded &&
                    (this.createBendpointsFromDummyNodes(),
                    this.graphManager.resetAllEdges()),
                  !this.isRemoteUse)
                ) {
                  for (
                    var t = this.graphManager.getAllEdges(), e = 0;
                    e < t.length;
                    e++
                  )
                    t[e];
                  var n = this.graphManager.getRoot().getNodes();
                  for (e = 0; e < n.length; e++) n[e];
                  this.update(this.graphManager.getRoot());
                }
              }),
              (p.prototype.update = function (t) {
                if (null == t) this.update2();
                else if (t instanceof s) {
                  var e = t;
                  if (null != e.getChild())
                    for (
                      var n = e.getChild().getNodes(), r = 0;
                      r < n.length;
                      r++
                    )
                      update(n[r]);
                  null != e.vGraphObject && e.vGraphObject.update(e);
                } else if (t instanceof a) {
                  var i = t;
                  null != i.vGraphObject && i.vGraphObject.update(i);
                } else if (t instanceof h) {
                  var o = t;
                  null != o.vGraphObject && o.vGraphObject.update(o);
                }
              }),
              (p.prototype.initParameters = function () {
                this.isSubLayout ||
                  ((this.layoutQuality = i.QUALITY),
                  (this.animationDuringLayout =
                    i.DEFAULT_ANIMATION_DURING_LAYOUT),
                  (this.animationPeriod = i.DEFAULT_ANIMATION_PERIOD),
                  (this.animationOnLayout = i.DEFAULT_ANIMATION_ON_LAYOUT),
                  (this.incremental = i.DEFAULT_INCREMENTAL),
                  (this.createBendsAsNeeded = i.DEFAULT_CREATE_BENDS_AS_NEEDED),
                  (this.uniformLeafNodeSizes =
                    i.DEFAULT_UNIFORM_LEAF_NODE_SIZES)),
                  this.animationDuringLayout && (this.animationOnLayout = !1);
              }),
              (p.prototype.transform = function (t) {
                if (null == t) this.transform(new u(0, 0));
                else {
                  var e = new c(),
                    n = this.graphManager.getRoot().updateLeftTop();
                  if (null != n) {
                    e.setWorldOrgX(t.x),
                      e.setWorldOrgY(t.y),
                      e.setDeviceOrgX(n.x),
                      e.setDeviceOrgY(n.y);
                    for (var r = this.getAllNodes(), i = 0; i < r.length; i++)
                      r[i].transform(e);
                  }
                }
              }),
              (p.prototype.positionNodesRandomly = function (t) {
                if (null == t)
                  this.positionNodesRandomly(this.getGraphManager().getRoot()),
                    this.getGraphManager().getRoot().updateBounds(!0);
                else
                  for (var e, n, r = t.getNodes(), i = 0; i < r.length; i++)
                    null == (n = (e = r[i]).getChild()) ||
                    0 == n.getNodes().length
                      ? e.scatter()
                      : (this.positionNodesRandomly(n), e.updateBounds());
              }),
              (p.prototype.getFlatForest = function () {
                for (
                  var t = [],
                    e = !0,
                    n = this.graphManager.getRoot().getNodes(),
                    i = !0,
                    o = 0;
                  o < n.length;
                  o++
                )
                  null != n[o].getChild() && (i = !1);
                if (!i) return t;
                var s = new Set(),
                  a = [],
                  h = new Map(),
                  u = [];
                for (u = u.concat(n); u.length > 0 && e; ) {
                  for (a.push(u[0]); a.length > 0 && e; ) {
                    var c = a[0];
                    a.splice(0, 1), s.add(c);
                    var l = c.getEdges();
                    for (o = 0; o < l.length; o++) {
                      var p = l[o].getOtherEnd(c);
                      if (h.get(c) != p) {
                        if (s.has(p)) {
                          e = !1;
                          break;
                        }
                        a.push(p), h.set(p, c);
                      }
                    }
                  }
                  if (e) {
                    var f = [].concat(r(s));
                    for (t.push(f), o = 0; o < f.length; o++) {
                      var d = f[o],
                        g = u.indexOf(d);
                      g > -1 && u.splice(g, 1);
                    }
                    (s = new Set()), (h = new Map());
                  } else t = [];
                }
                return t;
              }),
              (p.prototype.createDummyNodesForBendpoints = function (t) {
                for (
                  var e = [],
                    n = t.source,
                    r = this.graphManager.calcLowestCommonAncestor(
                      t.source,
                      t.target
                    ),
                    i = 0;
                  i < t.bendpoints.length;
                  i++
                ) {
                  var o = this.newNode(null);
                  o.setRect(new Point(0, 0), new Dimension(1, 1)), r.add(o);
                  var s = this.newEdge(null);
                  this.graphManager.add(s, n, o), e.add(o), (n = o);
                }
                return (
                  (s = this.newEdge(null)),
                  this.graphManager.add(s, n, t.target),
                  this.edgeToDummyNodes.set(t, e),
                  t.isInterGraph() ? this.graphManager.remove(t) : r.remove(t),
                  e
                );
              }),
              (p.prototype.createBendpointsFromDummyNodes = function () {
                var t = [];
                (t = t.concat(this.graphManager.getAllEdges())),
                  (t = [].concat(r(this.edgeToDummyNodes.keys())).concat(t));
                for (var e = 0; e < t.length; e++) {
                  var n = t[e];
                  if (n.bendpoints.length > 0) {
                    for (
                      var i = this.edgeToDummyNodes.get(n), o = 0;
                      o < i.length;
                      o++
                    ) {
                      var s = i[o],
                        a = new u(s.getCenterX(), s.getCenterY()),
                        h = n.bendpoints.get(o);
                      (h.x = a.x), (h.y = a.y), s.getOwner().remove(s);
                    }
                    this.graphManager.add(n, n.source, n.target);
                  }
                }
              }),
              (p.transform = function (t, e, n, r) {
                if (null != n && null != r) {
                  var i = e;
                  return (
                    t <= 50
                      ? (i -= ((e - e / n) / 50) * (50 - t))
                      : (i += ((e * r - e) / 50) * (t - 50)),
                    i
                  );
                }
                var o, s;
                return (
                  t <= 50
                    ? ((o = (9 * e) / 500), (s = e / 10))
                    : ((o = (9 * e) / 50), (s = -8 * e)),
                  o * t + s
                );
              }),
              (p.findCenterOfTree = function (t) {
                var e = [];
                e = e.concat(t);
                var n = [],
                  r = new Map(),
                  i = !1,
                  o = null;
                (1 != e.length && 2 != e.length) || ((i = !0), (o = e[0]));
                for (var s = 0; s < e.length; s++) {
                  var a = (c = e[s]).getNeighborsList().size;
                  r.set(c, c.getNeighborsList().size), 1 == a && n.push(c);
                }
                var h = [];
                for (h = h.concat(n); !i; ) {
                  var u = [];
                  for (u = u.concat(h), h = [], s = 0; s < e.length; s++) {
                    var c = e[s],
                      l = e.indexOf(c);
                    l >= 0 && e.splice(l, 1),
                      c.getNeighborsList().forEach(function (t) {
                        if (n.indexOf(t) < 0) {
                          var e = r.get(t) - 1;
                          1 == e && h.push(t), r.set(t, e);
                        }
                      });
                  }
                  (n = n.concat(h)),
                    (1 != e.length && 2 != e.length) || ((i = !0), (o = e[0]));
                }
                return o;
              }),
              (p.prototype.setGraphManager = function (t) {
                this.graphManager = t;
              }),
              (t.exports = p);
          },
          function (t, e, n) {
            "use strict";
            function r() {}
            (r.seed = 1),
              (r.x = 0),
              (r.nextDouble = function () {
                return (r.x = 1e4 * Math.sin(r.seed++)), r.x - Math.floor(r.x);
              }),
              (t.exports = r);
          },
          function (t, e, n) {
            "use strict";
            var r = n(5);
            function i(t, e) {
              (this.lworldOrgX = 0),
                (this.lworldOrgY = 0),
                (this.ldeviceOrgX = 0),
                (this.ldeviceOrgY = 0),
                (this.lworldExtX = 1),
                (this.lworldExtY = 1),
                (this.ldeviceExtX = 1),
                (this.ldeviceExtY = 1);
            }
            (i.prototype.getWorldOrgX = function () {
              return this.lworldOrgX;
            }),
              (i.prototype.setWorldOrgX = function (t) {
                this.lworldOrgX = t;
              }),
              (i.prototype.getWorldOrgY = function () {
                return this.lworldOrgY;
              }),
              (i.prototype.setWorldOrgY = function (t) {
                this.lworldOrgY = t;
              }),
              (i.prototype.getWorldExtX = function () {
                return this.lworldExtX;
              }),
              (i.prototype.setWorldExtX = function (t) {
                this.lworldExtX = t;
              }),
              (i.prototype.getWorldExtY = function () {
                return this.lworldExtY;
              }),
              (i.prototype.setWorldExtY = function (t) {
                this.lworldExtY = t;
              }),
              (i.prototype.getDeviceOrgX = function () {
                return this.ldeviceOrgX;
              }),
              (i.prototype.setDeviceOrgX = function (t) {
                this.ldeviceOrgX = t;
              }),
              (i.prototype.getDeviceOrgY = function () {
                return this.ldeviceOrgY;
              }),
              (i.prototype.setDeviceOrgY = function (t) {
                this.ldeviceOrgY = t;
              }),
              (i.prototype.getDeviceExtX = function () {
                return this.ldeviceExtX;
              }),
              (i.prototype.setDeviceExtX = function (t) {
                this.ldeviceExtX = t;
              }),
              (i.prototype.getDeviceExtY = function () {
                return this.ldeviceExtY;
              }),
              (i.prototype.setDeviceExtY = function (t) {
                this.ldeviceExtY = t;
              }),
              (i.prototype.transformX = function (t) {
                var e = 0,
                  n = this.lworldExtX;
                return (
                  0 != n &&
                    (e =
                      this.ldeviceOrgX +
                      ((t - this.lworldOrgX) * this.ldeviceExtX) / n),
                  e
                );
              }),
              (i.prototype.transformY = function (t) {
                var e = 0,
                  n = this.lworldExtY;
                return (
                  0 != n &&
                    (e =
                      this.ldeviceOrgY +
                      ((t - this.lworldOrgY) * this.ldeviceExtY) / n),
                  e
                );
              }),
              (i.prototype.inverseTransformX = function (t) {
                var e = 0,
                  n = this.ldeviceExtX;
                return (
                  0 != n &&
                    (e =
                      this.lworldOrgX +
                      ((t - this.ldeviceOrgX) * this.lworldExtX) / n),
                  e
                );
              }),
              (i.prototype.inverseTransformY = function (t) {
                var e = 0,
                  n = this.ldeviceExtY;
                return (
                  0 != n &&
                    (e =
                      this.lworldOrgY +
                      ((t - this.ldeviceOrgY) * this.lworldExtY) / n),
                  e
                );
              }),
              (i.prototype.inverseTransformPoint = function (t) {
                return new r(
                  this.inverseTransformX(t.x),
                  this.inverseTransformY(t.y)
                );
              }),
              (t.exports = i);
          },
          function (t, e, n) {
            "use strict";
            var r = n(15),
              i = n(4),
              o = n(0),
              s = n(8),
              a = n(9);
            function h() {
              r.call(this),
                (this.useSmartIdealEdgeLengthCalculation =
                  i.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION),
                (this.gravityConstant = i.DEFAULT_GRAVITY_STRENGTH),
                (this.compoundGravityConstant =
                  i.DEFAULT_COMPOUND_GRAVITY_STRENGTH),
                (this.gravityRangeFactor = i.DEFAULT_GRAVITY_RANGE_FACTOR),
                (this.compoundGravityRangeFactor =
                  i.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR),
                (this.displacementThresholdPerNode =
                  (3 * i.DEFAULT_EDGE_LENGTH) / 100),
                (this.coolingFactor = i.DEFAULT_COOLING_FACTOR_INCREMENTAL),
                (this.initialCoolingFactor =
                  i.DEFAULT_COOLING_FACTOR_INCREMENTAL),
                (this.totalDisplacement = 0),
                (this.oldTotalDisplacement = 0),
                (this.maxIterations = i.MAX_ITERATIONS);
            }
            for (var u in ((h.prototype = Object.create(r.prototype)), r))
              h[u] = r[u];
            (h.prototype.initParameters = function () {
              r.prototype.initParameters.call(this, arguments),
                (this.totalIterations = 0),
                (this.notAnimatedIterations = 0),
                (this.useFRGridVariant =
                  i.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION),
                (this.grid = []);
            }),
              (h.prototype.calcIdealEdgeLengths = function () {
                for (
                  var t,
                    e,
                    n,
                    r,
                    s,
                    a,
                    h,
                    u = this.getGraphManager().getAllEdges(),
                    c = 0;
                  c < u.length;
                  c++
                )
                  (e = (t = u[c]).idealLength),
                    t.isInterGraph &&
                      ((r = t.getSource()),
                      (s = t.getTarget()),
                      (a = t.getSourceInLca().getEstimatedSize()),
                      (h = t.getTargetInLca().getEstimatedSize()),
                      this.useSmartIdealEdgeLengthCalculation &&
                        (t.idealLength += a + h - 2 * o.SIMPLE_NODE_SIZE),
                      (n = t.getLca().getInclusionTreeDepth()),
                      (t.idealLength +=
                        e *
                        i.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR *
                        (r.getInclusionTreeDepth() +
                          s.getInclusionTreeDepth() -
                          2 * n)));
              }),
              (h.prototype.initSpringEmbedder = function () {
                var t = this.getAllNodes().length;
                this.incremental
                  ? (t > i.ADAPTATION_LOWER_NODE_LIMIT &&
                      (this.coolingFactor = Math.max(
                        this.coolingFactor * i.COOLING_ADAPTATION_FACTOR,
                        this.coolingFactor -
                          ((t - i.ADAPTATION_LOWER_NODE_LIMIT) /
                            (i.ADAPTATION_UPPER_NODE_LIMIT -
                              i.ADAPTATION_LOWER_NODE_LIMIT)) *
                            this.coolingFactor *
                            (1 - i.COOLING_ADAPTATION_FACTOR)
                      )),
                    (this.maxNodeDisplacement =
                      i.MAX_NODE_DISPLACEMENT_INCREMENTAL))
                  : (t > i.ADAPTATION_LOWER_NODE_LIMIT
                      ? (this.coolingFactor = Math.max(
                          i.COOLING_ADAPTATION_FACTOR,
                          1 -
                            ((t - i.ADAPTATION_LOWER_NODE_LIMIT) /
                              (i.ADAPTATION_UPPER_NODE_LIMIT -
                                i.ADAPTATION_LOWER_NODE_LIMIT)) *
                              (1 - i.COOLING_ADAPTATION_FACTOR)
                        ))
                      : (this.coolingFactor = 1),
                    (this.initialCoolingFactor = this.coolingFactor),
                    (this.maxNodeDisplacement = i.MAX_NODE_DISPLACEMENT)),
                  (this.maxIterations = Math.max(
                    5 * this.getAllNodes().length,
                    this.maxIterations
                  )),
                  (this.displacementThresholdPerNode =
                    (3 * i.DEFAULT_EDGE_LENGTH) / 100),
                  (this.totalDisplacementThreshold =
                    this.displacementThresholdPerNode *
                    this.getAllNodes().length),
                  (this.repulsionRange = this.calcRepulsionRange());
              }),
              (h.prototype.calcSpringForces = function () {
                for (var t, e = this.getAllEdges(), n = 0; n < e.length; n++)
                  (t = e[n]), this.calcSpringForce(t, t.idealLength);
              }),
              (h.prototype.calcRepulsionForces = function () {
                var t,
                  e,
                  n,
                  r,
                  o,
                  s =
                    !(arguments.length > 0 && void 0 !== arguments[0]) ||
                    arguments[0],
                  a =
                    arguments.length > 1 &&
                    void 0 !== arguments[1] &&
                    arguments[1],
                  h = this.getAllNodes();
                if (this.useFRGridVariant)
                  for (
                    this.totalIterations % i.GRID_CALCULATION_CHECK_PERIOD ==
                      1 &&
                      s &&
                      this.updateGrid(),
                      o = new Set(),
                      t = 0;
                    t < h.length;
                    t++
                  )
                    (n = h[t]),
                      this.calculateRepulsionForceOfANode(n, o, s, a),
                      o.add(n);
                else
                  for (t = 0; t < h.length; t++)
                    for (n = h[t], e = t + 1; e < h.length; e++)
                      (r = h[e]),
                        n.getOwner() == r.getOwner() &&
                          this.calcRepulsionForce(n, r);
              }),
              (h.prototype.calcGravitationalForces = function () {
                for (
                  var t, e = this.getAllNodesToApplyGravitation(), n = 0;
                  n < e.length;
                  n++
                )
                  (t = e[n]), this.calcGravitationalForce(t);
              }),
              (h.prototype.moveNodes = function () {
                for (var t = this.getAllNodes(), e = 0; e < t.length; e++)
                  t[e].move();
              }),
              (h.prototype.calcSpringForce = function (t, e) {
                var n,
                  r,
                  i,
                  o,
                  s = t.getSource(),
                  a = t.getTarget();
                if (
                  this.uniformLeafNodeSizes &&
                  null == s.getChild() &&
                  null == a.getChild()
                )
                  t.updateLengthSimple();
                else if ((t.updateLength(), t.isOverlapingSourceAndTarget))
                  return;
                0 != (n = t.getLength()) &&
                  ((i = (r = t.edgeElasticity * (n - e)) * (t.lengthX / n)),
                  (o = r * (t.lengthY / n)),
                  (s.springForceX += i),
                  (s.springForceY += o),
                  (a.springForceX -= i),
                  (a.springForceY -= o));
              }),
              (h.prototype.calcRepulsionForce = function (t, e) {
                var n,
                  r,
                  o,
                  h,
                  u,
                  c,
                  l,
                  p = t.getRect(),
                  f = e.getRect(),
                  d = new Array(2),
                  g = new Array(4);
                if (p.intersects(f)) {
                  s.calcSeparationAmount(p, f, d, i.DEFAULT_EDGE_LENGTH / 2),
                    (c = 2 * d[0]),
                    (l = 2 * d[1]);
                  var v =
                    (t.noOfChildren * e.noOfChildren) /
                    (t.noOfChildren + e.noOfChildren);
                  (t.repulsionForceX -= v * c),
                    (t.repulsionForceY -= v * l),
                    (e.repulsionForceX += v * c),
                    (e.repulsionForceY += v * l);
                } else
                  this.uniformLeafNodeSizes &&
                  null == t.getChild() &&
                  null == e.getChild()
                    ? ((n = f.getCenterX() - p.getCenterX()),
                      (r = f.getCenterY() - p.getCenterY()))
                    : (s.getIntersection(p, f, g),
                      (n = g[2] - g[0]),
                      (r = g[3] - g[1])),
                    Math.abs(n) < i.MIN_REPULSION_DIST &&
                      (n = a.sign(n) * i.MIN_REPULSION_DIST),
                    Math.abs(r) < i.MIN_REPULSION_DIST &&
                      (r = a.sign(r) * i.MIN_REPULSION_DIST),
                    (o = n * n + r * r),
                    (h = Math.sqrt(o)),
                    (c =
                      ((u =
                        ((t.nodeRepulsion / 2 + e.nodeRepulsion / 2) *
                          t.noOfChildren *
                          e.noOfChildren) /
                        o) *
                        n) /
                      h),
                    (l = (u * r) / h),
                    (t.repulsionForceX -= c),
                    (t.repulsionForceY -= l),
                    (e.repulsionForceX += c),
                    (e.repulsionForceY += l);
              }),
              (h.prototype.calcGravitationalForce = function (t) {
                var e, n, r, i, o, s, a, h;
                (n = ((e = t.getOwner()).getRight() + e.getLeft()) / 2),
                  (r = (e.getTop() + e.getBottom()) / 2),
                  (i = t.getCenterX() - n),
                  (o = t.getCenterY() - r),
                  (s = Math.abs(i) + t.getWidth() / 2),
                  (a = Math.abs(o) + t.getHeight() / 2),
                  t.getOwner() == this.graphManager.getRoot()
                    ? (s >
                        (h = e.getEstimatedSize() * this.gravityRangeFactor) ||
                        a > h) &&
                      ((t.gravitationForceX = -this.gravityConstant * i),
                      (t.gravitationForceY = -this.gravityConstant * o))
                    : (s >
                        (h =
                          e.getEstimatedSize() *
                          this.compoundGravityRangeFactor) ||
                        a > h) &&
                      ((t.gravitationForceX =
                        -this.gravityConstant *
                        i *
                        this.compoundGravityConstant),
                      (t.gravitationForceY =
                        -this.gravityConstant *
                        o *
                        this.compoundGravityConstant));
              }),
              (h.prototype.isConverged = function () {
                var t,
                  e = !1;
                return (
                  this.totalIterations > this.maxIterations / 3 &&
                    (e =
                      Math.abs(
                        this.totalDisplacement - this.oldTotalDisplacement
                      ) < 2),
                  (t =
                    this.totalDisplacement < this.totalDisplacementThreshold),
                  (this.oldTotalDisplacement = this.totalDisplacement),
                  t || e
                );
              }),
              (h.prototype.animate = function () {
                this.animationDuringLayout &&
                  !this.isSubLayout &&
                  (this.notAnimatedIterations == this.animationPeriod
                    ? (this.update(), (this.notAnimatedIterations = 0))
                    : this.notAnimatedIterations++);
              }),
              (h.prototype.calcNoOfChildrenForAllNodes = function () {
                for (
                  var t, e = this.graphManager.getAllNodes(), n = 0;
                  n < e.length;
                  n++
                )
                  (t = e[n]).noOfChildren = t.getNoOfChildren();
              }),
              (h.prototype.calcGrid = function (t) {
                var e, n;
                (e = parseInt(
                  Math.ceil((t.getRight() - t.getLeft()) / this.repulsionRange)
                )),
                  (n = parseInt(
                    Math.ceil(
                      (t.getBottom() - t.getTop()) / this.repulsionRange
                    )
                  ));
                for (var r = new Array(e), i = 0; i < e; i++)
                  r[i] = new Array(n);
                for (i = 0; i < e; i++)
                  for (var o = 0; o < n; o++) r[i][o] = new Array();
                return r;
              }),
              (h.prototype.addNodeToGrid = function (t, e, n) {
                var r, i, o, s;
                (r = parseInt(
                  Math.floor((t.getRect().x - e) / this.repulsionRange)
                )),
                  (i = parseInt(
                    Math.floor(
                      (t.getRect().width + t.getRect().x - e) /
                        this.repulsionRange
                    )
                  )),
                  (o = parseInt(
                    Math.floor((t.getRect().y - n) / this.repulsionRange)
                  )),
                  (s = parseInt(
                    Math.floor(
                      (t.getRect().height + t.getRect().y - n) /
                        this.repulsionRange
                    )
                  ));
                for (var a = r; a <= i; a++)
                  for (var h = o; h <= s; h++)
                    this.grid[a][h].push(t), t.setGridCoordinates(r, i, o, s);
              }),
              (h.prototype.updateGrid = function () {
                var t,
                  e,
                  n = this.getAllNodes();
                for (
                  this.grid = this.calcGrid(this.graphManager.getRoot()), t = 0;
                  t < n.length;
                  t++
                )
                  (e = n[t]),
                    this.addNodeToGrid(
                      e,
                      this.graphManager.getRoot().getLeft(),
                      this.graphManager.getRoot().getTop()
                    );
              }),
              (h.prototype.calculateRepulsionForceOfANode = function (
                t,
                e,
                n,
                r
              ) {
                if (
                  (this.totalIterations % i.GRID_CALCULATION_CHECK_PERIOD ==
                    1 &&
                    n) ||
                  r
                ) {
                  var o,
                    s = new Set();
                  t.surrounding = new Array();
                  for (
                    var a = this.grid, h = t.startX - 1;
                    h < t.finishX + 2;
                    h++
                  )
                    for (var u = t.startY - 1; u < t.finishY + 2; u++)
                      if (
                        !(h < 0 || u < 0 || h >= a.length || u >= a[0].length)
                      )
                        for (var c = 0; c < a[h][u].length; c++)
                          if (
                            ((o = a[h][u][c]),
                            t.getOwner() == o.getOwner() &&
                              t != o &&
                              !e.has(o) &&
                              !s.has(o))
                          ) {
                            var l =
                                Math.abs(t.getCenterX() - o.getCenterX()) -
                                (t.getWidth() / 2 + o.getWidth() / 2),
                              p =
                                Math.abs(t.getCenterY() - o.getCenterY()) -
                                (t.getHeight() / 2 + o.getHeight() / 2);
                            l <= this.repulsionRange &&
                              p <= this.repulsionRange &&
                              s.add(o);
                          }
                  t.surrounding = [].concat(
                    (function (t) {
                      if (Array.isArray(t)) {
                        for (var e = 0, n = Array(t.length); e < t.length; e++)
                          n[e] = t[e];
                        return n;
                      }
                      return Array.from(t);
                    })(s)
                  );
                }
                for (h = 0; h < t.surrounding.length; h++)
                  this.calcRepulsionForce(t, t.surrounding[h]);
              }),
              (h.prototype.calcRepulsionRange = function () {
                return 0;
              }),
              (t.exports = h);
          },
          function (t, e, n) {
            "use strict";
            var r = n(1),
              i = n(4);
            function o(t, e, n) {
              r.call(this, t, e, n),
                (this.idealLength = i.DEFAULT_EDGE_LENGTH),
                (this.edgeElasticity = i.DEFAULT_SPRING_STRENGTH);
            }
            for (var s in ((o.prototype = Object.create(r.prototype)), r))
              o[s] = r[s];
            t.exports = o;
          },
          function (t, e, n) {
            "use strict";
            var r = n(3),
              i = n(4);
            function o(t, e, n, o) {
              r.call(this, t, e, n, o),
                (this.nodeRepulsion = i.DEFAULT_REPULSION_STRENGTH),
                (this.springForceX = 0),
                (this.springForceY = 0),
                (this.repulsionForceX = 0),
                (this.repulsionForceY = 0),
                (this.gravitationForceX = 0),
                (this.gravitationForceY = 0),
                (this.displacementX = 0),
                (this.displacementY = 0),
                (this.startX = 0),
                (this.finishX = 0),
                (this.startY = 0),
                (this.finishY = 0),
                (this.surrounding = []);
            }
            for (var s in ((o.prototype = Object.create(r.prototype)), r))
              o[s] = r[s];
            (o.prototype.setGridCoordinates = function (t, e, n, r) {
              (this.startX = t),
                (this.finishX = e),
                (this.startY = n),
                (this.finishY = r);
            }),
              (t.exports = o);
          },
          function (t, e, n) {
            "use strict";
            function r(t, e) {
              (this.width = 0),
                (this.height = 0),
                null !== t &&
                  null !== e &&
                  ((this.height = e), (this.width = t));
            }
            (r.prototype.getWidth = function () {
              return this.width;
            }),
              (r.prototype.setWidth = function (t) {
                this.width = t;
              }),
              (r.prototype.getHeight = function () {
                return this.height;
              }),
              (r.prototype.setHeight = function (t) {
                this.height = t;
              }),
              (t.exports = r);
          },
          function (t, e, n) {
            "use strict";
            var r = n(14);
            function i() {
              (this.map = {}), (this.keys = []);
            }
            (i.prototype.put = function (t, e) {
              var n = r.createID(t);
              this.contains(n) || ((this.map[n] = e), this.keys.push(t));
            }),
              (i.prototype.contains = function (t) {
                return r.createID(t), null != this.map[t];
              }),
              (i.prototype.get = function (t) {
                var e = r.createID(t);
                return this.map[e];
              }),
              (i.prototype.keySet = function () {
                return this.keys;
              }),
              (t.exports = i);
          },
          function (t, e, n) {
            "use strict";
            var r = n(14);
            function i() {
              this.set = {};
            }
            (i.prototype.add = function (t) {
              var e = r.createID(t);
              this.contains(e) || (this.set[e] = t);
            }),
              (i.prototype.remove = function (t) {
                delete this.set[r.createID(t)];
              }),
              (i.prototype.clear = function () {
                this.set = {};
              }),
              (i.prototype.contains = function (t) {
                return this.set[r.createID(t)] == t;
              }),
              (i.prototype.isEmpty = function () {
                return 0 === this.size();
              }),
              (i.prototype.size = function () {
                return Object.keys(this.set).length;
              }),
              (i.prototype.addAllTo = function (t) {
                for (
                  var e = Object.keys(this.set), n = e.length, r = 0;
                  r < n;
                  r++
                )
                  t.push(this.set[e[r]]);
              }),
              (i.prototype.size = function () {
                return Object.keys(this.set).length;
              }),
              (i.prototype.addAll = function (t) {
                for (var e = t.length, n = 0; n < e; n++) {
                  var r = t[n];
                  this.add(r);
                }
              }),
              (t.exports = i);
          },
          function (t, e, n) {
            "use strict";
            function r() {}
            (r.multMat = function (t, e) {
              for (var n = [], r = 0; r < t.length; r++) {
                n[r] = [];
                for (var i = 0; i < e[0].length; i++) {
                  n[r][i] = 0;
                  for (var o = 0; o < t[0].length; o++)
                    n[r][i] += t[r][o] * e[o][i];
                }
              }
              return n;
            }),
              (r.transpose = function (t) {
                for (var e = [], n = 0; n < t[0].length; n++) {
                  e[n] = [];
                  for (var r = 0; r < t.length; r++) e[n][r] = t[r][n];
                }
                return e;
              }),
              (r.multCons = function (t, e) {
                for (var n = [], r = 0; r < t.length; r++) n[r] = t[r] * e;
                return n;
              }),
              (r.minusOp = function (t, e) {
                for (var n = [], r = 0; r < t.length; r++) n[r] = t[r] - e[r];
                return n;
              }),
              (r.dotProduct = function (t, e) {
                for (var n = 0, r = 0; r < t.length; r++) n += t[r] * e[r];
                return n;
              }),
              (r.mag = function (t) {
                return Math.sqrt(this.dotProduct(t, t));
              }),
              (r.normalize = function (t) {
                for (var e = [], n = this.mag(t), r = 0; r < t.length; r++)
                  e[r] = t[r] / n;
                return e;
              }),
              (r.multGamma = function (t) {
                for (var e = [], n = 0, r = 0; r < t.length; r++) n += t[r];
                n *= -1 / t.length;
                for (var i = 0; i < t.length; i++) e[i] = n + t[i];
                return e;
              }),
              (r.multL = function (t, e, n) {
                for (var r = [], i = [], o = [], s = 0; s < e[0].length; s++) {
                  for (var a = 0, h = 0; h < e.length; h++)
                    a += -0.5 * e[h][s] * t[h];
                  i[s] = a;
                }
                for (var u = 0; u < n.length; u++) {
                  for (var c = 0, l = 0; l < n.length; l++) c += n[u][l] * i[l];
                  o[u] = c;
                }
                for (var p = 0; p < e.length; p++) {
                  for (var f = 0, d = 0; d < e[0].length; d++)
                    f += e[p][d] * o[d];
                  r[p] = f;
                }
                return r;
              }),
              (t.exports = r);
          },
          function (t, e, n) {
            "use strict";
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    (r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      "value" in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r);
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e;
                };
              })(),
              i = n(11),
              o = (function () {
                function t(e, n) {
                  !(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, t),
                    (null === n && void 0 === n) ||
                      (this.compareFunction = this._defaultCompareFunction);
                  var r;
                  (r = e instanceof i ? e.size() : e.length),
                    this._quicksort(e, 0, r - 1);
                }
                return (
                  r(t, [
                    {
                      key: "_quicksort",
                      value: function (t, e, n) {
                        if (e < n) {
                          var r = this._partition(t, e, n);
                          this._quicksort(t, e, r),
                            this._quicksort(t, r + 1, n);
                        }
                      },
                    },
                    {
                      key: "_partition",
                      value: function (t, e, n) {
                        for (var r = this._get(t, e), i = e, o = n; ; ) {
                          for (; this.compareFunction(r, this._get(t, o)); )
                            o--;
                          for (; this.compareFunction(this._get(t, i), r); )
                            i++;
                          if (!(i < o)) return o;
                          this._swap(t, i, o), i++, o--;
                        }
                      },
                    },
                    {
                      key: "_get",
                      value: function (t, e) {
                        return t instanceof i ? t.get_object_at(e) : t[e];
                      },
                    },
                    {
                      key: "_set",
                      value: function (t, e, n) {
                        t instanceof i ? t.set_object_at(e, n) : (t[e] = n);
                      },
                    },
                    {
                      key: "_swap",
                      value: function (t, e, n) {
                        var r = this._get(t, e);
                        this._set(t, e, this._get(t, n)), this._set(t, n, r);
                      },
                    },
                    {
                      key: "_defaultCompareFunction",
                      value: function (t, e) {
                        return e > t;
                      },
                    },
                  ]),
                  t
                );
              })();
            t.exports = o;
          },
          function (t, e, n) {
            "use strict";
            function r() {}
            (r.svd = function (t) {
              (this.U = null),
                (this.V = null),
                (this.s = null),
                (this.m = 0),
                (this.n = 0),
                (this.m = t.length),
                (this.n = t[0].length);
              var e = Math.min(this.m, this.n);
              (this.s = (function (t) {
                for (var e = []; t-- > 0; ) e.push(0);
                return e;
              })(Math.min(this.m + 1, this.n))),
                (this.U = (function t(e) {
                  if (0 == e.length) return 0;
                  for (var n = [], r = 0; r < e[0]; r++) n.push(t(e.slice(1)));
                  return n;
                })([this.m, e])),
                (this.V = (function t(e) {
                  if (0 == e.length) return 0;
                  for (var n = [], r = 0; r < e[0]; r++) n.push(t(e.slice(1)));
                  return n;
                })([this.n, this.n]));
              for (
                var n,
                  i,
                  o = (function (t) {
                    for (var e = []; t-- > 0; ) e.push(0);
                    return e;
                  })(this.n),
                  s = (function (t) {
                    for (var e = []; t-- > 0; ) e.push(0);
                    return e;
                  })(this.m),
                  a = Math.min(this.m - 1, this.n),
                  h = Math.max(0, Math.min(this.n - 2, this.m)),
                  u = 0;
                u < Math.max(a, h);
                u++
              ) {
                if (u < a) {
                  this.s[u] = 0;
                  for (var c = u; c < this.m; c++)
                    this.s[u] = r.hypot(this.s[u], t[c][u]);
                  if (0 !== this.s[u]) {
                    t[u][u] < 0 && (this.s[u] = -this.s[u]);
                    for (var l = u; l < this.m; l++) t[l][u] /= this.s[u];
                    t[u][u] += 1;
                  }
                  this.s[u] = -this.s[u];
                }
                for (var p = u + 1; p < this.n; p++) {
                  if (((n = u < a), (i = 0 !== this.s[u]), n && i)) {
                    for (var f = 0, d = u; d < this.m; d++)
                      f += t[d][u] * t[d][p];
                    f = -f / t[u][u];
                    for (var g = u; g < this.m; g++) t[g][p] += f * t[g][u];
                  }
                  o[p] = t[u][p];
                }
                if (
                  (function (t, e) {
                    return e;
                  })(0, u < a)
                )
                  for (var v = u; v < this.m; v++) this.U[v][u] = t[v][u];
                if (u < h) {
                  o[u] = 0;
                  for (var y = u + 1; y < this.n; y++)
                    o[u] = r.hypot(o[u], o[y]);
                  if (0 !== o[u]) {
                    o[u + 1] < 0 && (o[u] = -o[u]);
                    for (var m = u + 1; m < this.n; m++) o[m] /= o[u];
                    o[u + 1] += 1;
                  }
                  if (
                    ((o[u] = -o[u]),
                    (function (t, e) {
                      return t && e;
                    })(u + 1 < this.m, 0 !== o[u]))
                  ) {
                    for (var _ = u + 1; _ < this.m; _++) s[_] = 0;
                    for (var E = u + 1; E < this.n; E++)
                      for (var b = u + 1; b < this.m; b++)
                        s[b] += o[E] * t[b][E];
                    for (var w = u + 1; w < this.n; w++)
                      for (var N = -o[w] / o[u + 1], x = u + 1; x < this.m; x++)
                        t[x][w] += N * s[x];
                  }
                  for (var A = u + 1; A < this.n; A++) this.V[A][u] = o[A];
                }
              }
              var T = Math.min(this.n, this.m + 1);
              a < this.n && (this.s[a] = t[a][a]),
                this.m < T && (this.s[T - 1] = 0),
                h + 1 < T && (o[h] = t[h][T - 1]),
                (o[T - 1] = 0);
              for (var M = a; M < e; M++) {
                for (var O = 0; O < this.m; O++) this.U[O][M] = 0;
                this.U[M][M] = 1;
              }
              for (var I = a - 1; I >= 0; I--)
                if (0 !== this.s[I]) {
                  for (var L = I + 1; L < e; L++) {
                    for (var C = 0, D = I; D < this.m; D++)
                      C += this.U[D][I] * this.U[D][L];
                    C = -C / this.U[I][I];
                    for (var S = I; S < this.m; S++)
                      this.U[S][L] += C * this.U[S][I];
                  }
                  for (var P = I; P < this.m; P++) this.U[P][I] = -this.U[P][I];
                  this.U[I][I] = 1 + this.U[I][I];
                  for (var R = 0; R < I - 1; R++) this.U[R][I] = 0;
                } else {
                  for (var F = 0; F < this.m; F++) this.U[F][I] = 0;
                  this.U[I][I] = 1;
                }
              for (var k = this.n - 1; k >= 0; k--) {
                if (
                  (function (t, e) {
                    return t && e;
                  })(k < h, 0 !== o[k])
                )
                  for (var G = k + 1; G < e; G++) {
                    for (var U = 0, Y = k + 1; Y < this.n; Y++)
                      U += this.V[Y][k] * this.V[Y][G];
                    U = -U / this.V[k + 1][k];
                    for (var V = k + 1; V < this.n; V++)
                      this.V[V][G] += U * this.V[V][k];
                  }
                for (var X = 0; X < this.n; X++) this.V[X][k] = 0;
                this.V[k][k] = 1;
              }
              for (
                var H = T - 1, z = Math.pow(2, -52), B = Math.pow(2, -966);
                T > 0;

              ) {
                var j = void 0,
                  W = void 0;
                for (j = T - 2; j >= -1 && -1 !== j; j--)
                  if (
                    Math.abs(o[j]) <=
                    B + z * (Math.abs(this.s[j]) + Math.abs(this.s[j + 1]))
                  ) {
                    o[j] = 0;
                    break;
                  }
                if (j === T - 2) W = 4;
                else {
                  var q = void 0;
                  for (q = T - 1; q >= j && q !== j; q--) {
                    var $ =
                      (q !== T ? Math.abs(o[q]) : 0) +
                      (q !== j + 1 ? Math.abs(o[q - 1]) : 0);
                    if (Math.abs(this.s[q]) <= B + z * $) {
                      this.s[q] = 0;
                      break;
                    }
                  }
                  q === j
                    ? (W = 3)
                    : q === T - 1
                    ? (W = 1)
                    : ((W = 2), (j = q));
                }
                switch ((j++, W)) {
                  case 1:
                    var Z = o[T - 2];
                    o[T - 2] = 0;
                    for (var K = T - 2; K >= j; K--) {
                      var Q = r.hypot(this.s[K], Z),
                        J = this.s[K] / Q,
                        tt = Z / Q;
                      (this.s[K] = Q),
                        K !== j &&
                          ((Z = -tt * o[K - 1]), (o[K - 1] = J * o[K - 1]));
                      for (var et = 0; et < this.n; et++)
                        (Q = J * this.V[et][K] + tt * this.V[et][T - 1]),
                          (this.V[et][T - 1] =
                            -tt * this.V[et][K] + J * this.V[et][T - 1]),
                          (this.V[et][K] = Q);
                    }
                    break;
                  case 2:
                    var nt = o[j - 1];
                    o[j - 1] = 0;
                    for (var rt = j; rt < T; rt++) {
                      var it = r.hypot(this.s[rt], nt),
                        ot = this.s[rt] / it,
                        st = nt / it;
                      (this.s[rt] = it),
                        (nt = -st * o[rt]),
                        (o[rt] = ot * o[rt]);
                      for (var at = 0; at < this.m; at++)
                        (it = ot * this.U[at][rt] + st * this.U[at][j - 1]),
                          (this.U[at][j - 1] =
                            -st * this.U[at][rt] + ot * this.U[at][j - 1]),
                          (this.U[at][rt] = it);
                    }
                    break;
                  case 3:
                    var ht = Math.max(
                        Math.max(
                          Math.max(
                            Math.max(
                              Math.abs(this.s[T - 1]),
                              Math.abs(this.s[T - 2])
                            ),
                            Math.abs(o[T - 2])
                          ),
                          Math.abs(this.s[j])
                        ),
                        Math.abs(o[j])
                      ),
                      ut = this.s[T - 1] / ht,
                      ct = this.s[T - 2] / ht,
                      lt = o[T - 2] / ht,
                      pt = this.s[j] / ht,
                      ft = o[j] / ht,
                      dt = ((ct + ut) * (ct - ut) + lt * lt) / 2,
                      gt = ut * lt * (ut * lt),
                      vt = 0;
                    (function (t, e) {
                      return t || e;
                    })(0 !== dt, 0 !== gt) &&
                      ((vt = Math.sqrt(dt * dt + gt)),
                      dt < 0 && (vt = -vt),
                      (vt = gt / (dt + vt)));
                    for (
                      var yt = (pt + ut) * (pt - ut) + vt, mt = pt * ft, _t = j;
                      _t < T - 1;
                      _t++
                    ) {
                      var Et = r.hypot(yt, mt),
                        bt = yt / Et,
                        wt = mt / Et;
                      _t !== j && (o[_t - 1] = Et),
                        (yt = bt * this.s[_t] + wt * o[_t]),
                        (o[_t] = bt * o[_t] - wt * this.s[_t]),
                        (mt = wt * this.s[_t + 1]),
                        (this.s[_t + 1] = bt * this.s[_t + 1]);
                      for (var Nt = 0; Nt < this.n; Nt++)
                        (Et = bt * this.V[Nt][_t] + wt * this.V[Nt][_t + 1]),
                          (this.V[Nt][_t + 1] =
                            -wt * this.V[Nt][_t] + bt * this.V[Nt][_t + 1]),
                          (this.V[Nt][_t] = Et);
                      if (
                        ((bt = yt / (Et = r.hypot(yt, mt))),
                        (wt = mt / Et),
                        (this.s[_t] = Et),
                        (yt = bt * o[_t] + wt * this.s[_t + 1]),
                        (this.s[_t + 1] = -wt * o[_t] + bt * this.s[_t + 1]),
                        (mt = wt * o[_t + 1]),
                        (o[_t + 1] = bt * o[_t + 1]),
                        _t < this.m - 1)
                      )
                        for (var xt = 0; xt < this.m; xt++)
                          (Et = bt * this.U[xt][_t] + wt * this.U[xt][_t + 1]),
                            (this.U[xt][_t + 1] =
                              -wt * this.U[xt][_t] + bt * this.U[xt][_t + 1]),
                            (this.U[xt][_t] = Et);
                    }
                    o[T - 2] = yt;
                    break;
                  case 4:
                    if (this.s[j] <= 0) {
                      this.s[j] = this.s[j] < 0 ? -this.s[j] : 0;
                      for (var At = 0; At <= H; At++)
                        this.V[At][j] = -this.V[At][j];
                    }
                    for (; j < H && !(this.s[j] >= this.s[j + 1]); ) {
                      var Tt = this.s[j];
                      if (
                        ((this.s[j] = this.s[j + 1]),
                        (this.s[j + 1] = Tt),
                        j < this.n - 1)
                      )
                        for (var Mt = 0; Mt < this.n; Mt++)
                          (Tt = this.V[Mt][j + 1]),
                            (this.V[Mt][j + 1] = this.V[Mt][j]),
                            (this.V[Mt][j] = Tt);
                      if (j < this.m - 1)
                        for (var Ot = 0; Ot < this.m; Ot++)
                          (Tt = this.U[Ot][j + 1]),
                            (this.U[Ot][j + 1] = this.U[Ot][j]),
                            (this.U[Ot][j] = Tt);
                      j++;
                    }
                    T--;
                }
              }
              return { U: this.U, V: this.V, S: this.s };
            }),
              (r.hypot = function (t, e) {
                var n = void 0;
                return (
                  Math.abs(t) > Math.abs(e)
                    ? ((n = e / t), (n = Math.abs(t) * Math.sqrt(1 + n * n)))
                    : 0 != e
                    ? ((n = t / e), (n = Math.abs(e) * Math.sqrt(1 + n * n)))
                    : (n = 0),
                  n
                );
              }),
              (t.exports = r);
          },
          function (t, e, n) {
            "use strict";
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    (r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      "value" in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r);
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e;
                };
              })(),
              i = (function () {
                function t(e, n) {
                  var r =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : 1,
                    i =
                      arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : -1,
                    o =
                      arguments.length > 4 && void 0 !== arguments[4]
                        ? arguments[4]
                        : -1;
                  !(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError("Cannot call a class as a function");
                  })(this, t),
                    (this.sequence1 = e),
                    (this.sequence2 = n),
                    (this.match_score = r),
                    (this.mismatch_penalty = i),
                    (this.gap_penalty = o),
                    (this.iMax = e.length + 1),
                    (this.jMax = n.length + 1),
                    (this.grid = new Array(this.iMax));
                  for (var s = 0; s < this.iMax; s++) {
                    this.grid[s] = new Array(this.jMax);
                    for (var a = 0; a < this.jMax; a++) this.grid[s][a] = 0;
                  }
                  this.tracebackGrid = new Array(this.iMax);
                  for (var h = 0; h < this.iMax; h++) {
                    this.tracebackGrid[h] = new Array(this.jMax);
                    for (var u = 0; u < this.jMax; u++)
                      this.tracebackGrid[h][u] = [null, null, null];
                  }
                  (this.alignments = []),
                    (this.score = -1),
                    this.computeGrids();
                }
                return (
                  r(t, [
                    {
                      key: "getScore",
                      value: function () {
                        return this.score;
                      },
                    },
                    {
                      key: "getAlignments",
                      value: function () {
                        return this.alignments;
                      },
                    },
                    {
                      key: "computeGrids",
                      value: function () {
                        for (var t = 1; t < this.jMax; t++)
                          (this.grid[0][t] =
                            this.grid[0][t - 1] + this.gap_penalty),
                            (this.tracebackGrid[0][t] = [!1, !1, !0]);
                        for (var e = 1; e < this.iMax; e++)
                          (this.grid[e][0] =
                            this.grid[e - 1][0] + this.gap_penalty),
                            (this.tracebackGrid[e][0] = [!1, !0, !1]);
                        for (var n = 1; n < this.iMax; n++)
                          for (var r = 1; r < this.jMax; r++) {
                            var i = [
                                this.sequence1[n - 1] === this.sequence2[r - 1]
                                  ? this.grid[n - 1][r - 1] + this.match_score
                                  : this.grid[n - 1][r - 1] +
                                    this.mismatch_penalty,
                                this.grid[n - 1][r] + this.gap_penalty,
                                this.grid[n][r - 1] + this.gap_penalty,
                              ],
                              o = this.arrayAllMaxIndexes(i);
                            (this.grid[n][r] = i[o[0]]),
                              (this.tracebackGrid[n][r] = [
                                o.includes(0),
                                o.includes(1),
                                o.includes(2),
                              ]);
                          }
                        this.score = this.grid[this.iMax - 1][this.jMax - 1];
                      },
                    },
                    {
                      key: "alignmentTraceback",
                      value: function () {
                        var t = [];
                        for (
                          t.push({
                            pos: [this.sequence1.length, this.sequence2.length],
                            seq1: "",
                            seq2: "",
                          });
                          t[0];

                        ) {
                          var e = t[0],
                            n = this.tracebackGrid[e.pos[0]][e.pos[1]];
                          n[0] &&
                            t.push({
                              pos: [e.pos[0] - 1, e.pos[1] - 1],
                              seq1: this.sequence1[e.pos[0] - 1] + e.seq1,
                              seq2: this.sequence2[e.pos[1] - 1] + e.seq2,
                            }),
                            n[1] &&
                              t.push({
                                pos: [e.pos[0] - 1, e.pos[1]],
                                seq1: this.sequence1[e.pos[0] - 1] + e.seq1,
                                seq2: "-" + e.seq2,
                              }),
                            n[2] &&
                              t.push({
                                pos: [e.pos[0], e.pos[1] - 1],
                                seq1: "-" + e.seq1,
                                seq2: this.sequence2[e.pos[1] - 1] + e.seq2,
                              }),
                            0 === e.pos[0] &&
                              0 === e.pos[1] &&
                              this.alignments.push({
                                sequence1: e.seq1,
                                sequence2: e.seq2,
                              }),
                            t.shift();
                        }
                        return this.alignments;
                      },
                    },
                    {
                      key: "getAllIndexes",
                      value: function (t, e) {
                        for (
                          var n = [], r = -1;
                          -1 !== (r = t.indexOf(e, r + 1));

                        )
                          n.push(r);
                        return n;
                      },
                    },
                    {
                      key: "arrayAllMaxIndexes",
                      value: function (t) {
                        return this.getAllIndexes(t, Math.max.apply(null, t));
                      },
                    },
                  ]),
                  t
                );
              })();
            t.exports = i;
          },
          function (t, e, n) {
            "use strict";
            var r = function () {};
            (r.FDLayout = n(18)),
              (r.FDLayoutConstants = n(4)),
              (r.FDLayoutEdge = n(19)),
              (r.FDLayoutNode = n(20)),
              (r.DimensionD = n(21)),
              (r.HashMap = n(22)),
              (r.HashSet = n(23)),
              (r.IGeometry = n(8)),
              (r.IMath = n(9)),
              (r.Integer = n(10)),
              (r.Point = n(12)),
              (r.PointD = n(5)),
              (r.RandomSeed = n(16)),
              (r.RectangleD = n(13)),
              (r.Transform = n(17)),
              (r.UniqueIDGeneretor = n(14)),
              (r.Quicksort = n(25)),
              (r.LinkedList = n(11)),
              (r.LGraphObject = n(2)),
              (r.LGraph = n(6)),
              (r.LEdge = n(1)),
              (r.LGraphManager = n(7)),
              (r.LNode = n(3)),
              (r.Layout = n(15)),
              (r.LayoutConstants = n(0)),
              (r.NeedlemanWunsch = n(27)),
              (r.Matrix = n(24)),
              (r.SVD = n(26)),
              (t.exports = r);
          },
          function (t, e, n) {
            "use strict";
            function r() {
              this.listeners = [];
            }
            var i = r.prototype;
            (i.addListener = function (t, e) {
              this.listeners.push({ event: t, callback: e });
            }),
              (i.removeListener = function (t, e) {
                for (var n = this.listeners.length; n >= 0; n--) {
                  var r = this.listeners[n];
                  r.event === t &&
                    r.callback === e &&
                    this.listeners.splice(n, 1);
                }
              }),
              (i.emit = function (t, e) {
                for (var n = 0; n < this.listeners.length; n++) {
                  var r = this.listeners[n];
                  t === r.event && r.callback(e);
                }
              }),
              (t.exports = r);
          },
        ]);
      }),
        (t.exports = e());
    },
    228: (t) => {
      "use strict";
      var e = Object.getOwnPropertySymbols,
        n = Object.prototype.hasOwnProperty,
        r = Object.prototype.propertyIsEnumerable;
      t.exports = (function () {
        try {
          if (!Object.assign) return !1;
          var t = new String("abc");
          if (((t[5] = "de"), "5" === Object.getOwnPropertyNames(t)[0]))
            return !1;
          for (var e = {}, n = 0; n < 10; n++)
            e["_" + String.fromCharCode(n)] = n;
          if (
            "0123456789" !==
            Object.getOwnPropertyNames(e)
              .map(function (t) {
                return e[t];
              })
              .join("")
          )
            return !1;
          var r = {};
          return (
            "abcdefghijklmnopqrst".split("").forEach(function (t) {
              r[t] = t;
            }),
            "abcdefghijklmnopqrst" ===
              Object.keys(Object.assign({}, r)).join("")
          );
        } catch (t) {
          return !1;
        }
      })()
        ? Object.assign
        : function (t, i) {
            for (
              var o,
                s,
                a = (function (t) {
                  if (null == t)
                    throw new TypeError(
                      "Object.assign cannot be called with null or undefined"
                    );
                  return Object(t);
                })(t),
                h = 1;
              h < arguments.length;
              h++
            ) {
              for (var u in (o = Object(arguments[h])))
                n.call(o, u) && (a[u] = o[u]);
              if (e) {
                s = e(o);
                for (var c = 0; c < s.length; c++)
                  r.call(o, s[c]) && (a[s[c]] = o[s[c]]);
              }
            }
            return a;
          };
    },
    799: (t, e) => {
      "use strict";
      var n = "function" == typeof Symbol && Symbol.for,
        r = n ? Symbol.for("react.element") : 60103,
        i = n ? Symbol.for("react.portal") : 60106,
        o = n ? Symbol.for("react.fragment") : 60107,
        s = n ? Symbol.for("react.strict_mode") : 60108,
        a = n ? Symbol.for("react.profiler") : 60114,
        h = n ? Symbol.for("react.provider") : 60109,
        u = n ? Symbol.for("react.context") : 60110,
        c = n ? Symbol.for("react.async_mode") : 60111,
        l = n ? Symbol.for("react.concurrent_mode") : 60111,
        p = n ? Symbol.for("react.forward_ref") : 60112,
        f = n ? Symbol.for("react.suspense") : 60113,
        d = n ? Symbol.for("react.suspense_list") : 60120,
        g = n ? Symbol.for("react.memo") : 60115,
        v = n ? Symbol.for("react.lazy") : 60116,
        y = n ? Symbol.for("react.block") : 60121,
        m = n ? Symbol.for("react.fundamental") : 60117,
        _ = n ? Symbol.for("react.responder") : 60118,
        E = n ? Symbol.for("react.scope") : 60119;
      function b(t) {
        if ("object" == typeof t && null !== t) {
          var e = t.$$typeof;
          switch (e) {
            case r:
              switch ((t = t.type)) {
                case c:
                case l:
                case o:
                case a:
                case s:
                case f:
                  return t;
                default:
                  switch ((t = t && t.$$typeof)) {
                    case u:
                    case p:
                    case v:
                    case g:
                    case h:
                      return t;
                    default:
                      return e;
                  }
              }
            case i:
              return e;
          }
        }
      }
      function w(t) {
        return b(t) === l;
      }
      (e.AsyncMode = c),
        (e.ConcurrentMode = l),
        (e.ContextConsumer = u),
        (e.ContextProvider = h),
        (e.Element = r),
        (e.ForwardRef = p),
        (e.Fragment = o),
        (e.Lazy = v),
        (e.Memo = g),
        (e.Portal = i),
        (e.Profiler = a),
        (e.StrictMode = s),
        (e.Suspense = f),
        (e.isAsyncMode = function (t) {
          return w(t) || b(t) === c;
        }),
        (e.isConcurrentMode = w),
        (e.isContextConsumer = function (t) {
          return b(t) === u;
        }),
        (e.isContextProvider = function (t) {
          return b(t) === h;
        }),
        (e.isElement = function (t) {
          return "object" == typeof t && null !== t && t.$$typeof === r;
        }),
        (e.isForwardRef = function (t) {
          return b(t) === p;
        }),
        (e.isFragment = function (t) {
          return b(t) === o;
        }),
        (e.isLazy = function (t) {
          return b(t) === v;
        }),
        (e.isMemo = function (t) {
          return b(t) === g;
        }),
        (e.isPortal = function (t) {
          return b(t) === i;
        }),
        (e.isProfiler = function (t) {
          return b(t) === a;
        }),
        (e.isStrictMode = function (t) {
          return b(t) === s;
        }),
        (e.isSuspense = function (t) {
          return b(t) === f;
        }),
        (e.isValidElementType = function (t) {
          return (
            "string" == typeof t ||
            "function" == typeof t ||
            t === o ||
            t === l ||
            t === a ||
            t === s ||
            t === f ||
            t === d ||
            ("object" == typeof t &&
              null !== t &&
              (t.$$typeof === v ||
                t.$$typeof === g ||
                t.$$typeof === h ||
                t.$$typeof === u ||
                t.$$typeof === p ||
                t.$$typeof === m ||
                t.$$typeof === _ ||
                t.$$typeof === E ||
                t.$$typeof === y))
          );
        }),
        (e.typeOf = b);
    },
    363: (t, e, n) => {
      "use strict";
      t.exports = n(799);
    },
    287: (t, e, n) => {
      "use strict";
      var r = n(228),
        i = "function" == typeof Symbol && Symbol.for;
      i && Symbol.for("react.element"),
        i && Symbol.for("react.portal"),
        i && Symbol.for("react.fragment"),
        i && Symbol.for("react.strict_mode"),
        i && Symbol.for("react.profiler"),
        i && Symbol.for("react.provider"),
        i && Symbol.for("react.context"),
        i && Symbol.for("react.forward_ref"),
        i && Symbol.for("react.suspense"),
        i && Symbol.for("react.memo"),
        i && Symbol.for("react.lazy"),
        "function" == typeof Symbol && Symbol.iterator;
      function o(t) {
        for (
          var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + t,
            n = 1;
          n < arguments.length;
          n++
        )
          e += "&args[]=" + encodeURIComponent(arguments[n]);
        return (
          "Minified React error #" +
          t +
          "; visit " +
          e +
          " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
        );
      }
      var s = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function () {},
          enqueueReplaceState: function () {},
          enqueueSetState: function () {},
        },
        a = {};
      function h(t, e, n) {
        (this.props = t),
          (this.context = e),
          (this.refs = a),
          (this.updater = n || s);
      }
      function u() {}
      function c(t, e, n) {
        (this.props = t),
          (this.context = e),
          (this.refs = a),
          (this.updater = n || s);
      }
      (h.prototype.isReactComponent = {}),
        (h.prototype.setState = function (t, e) {
          if ("object" != typeof t && "function" != typeof t && null != t)
            throw Error(o(85));
          this.updater.enqueueSetState(this, t, e, "setState");
        }),
        (h.prototype.forceUpdate = function (t) {
          this.updater.enqueueForceUpdate(this, t, "forceUpdate");
        }),
        (u.prototype = h.prototype);
      var l = (c.prototype = new u());
      (l.constructor = c), r(l, h.prototype), (l.isPureReactComponent = !0);
      Object.prototype.hasOwnProperty;
      e.PureComponent = c;
    },
    159: (t, e, n) => {
      "use strict";
      t.exports = n(287);
    },
    72: (t) => {
      "use strict";
      var e = [];
      function n(t) {
        for (var n = -1, r = 0; r < e.length; r++)
          if (e[r].identifier === t) {
            n = r;
            break;
          }
        return n;
      }
      function r(t, r) {
        for (var o = {}, s = [], a = 0; a < t.length; a++) {
          var h = t[a],
            u = r.base ? h[0] + r.base : h[0],
            c = o[u] || 0,
            l = "".concat(u, " ").concat(c);
          o[u] = c + 1;
          var p = n(l),
            f = {
              css: h[1],
              media: h[2],
              sourceMap: h[3],
              supports: h[4],
              layer: h[5],
            };
          if (-1 !== p) e[p].references++, e[p].updater(f);
          else {
            var d = i(f, r);
            (r.byIndex = a),
              e.splice(a, 0, { identifier: l, updater: d, references: 1 });
          }
          s.push(l);
        }
        return s;
      }
      function i(t, e) {
        var n = e.domAPI(e);
        return (
          n.update(t),
          function (e) {
            if (e) {
              if (
                e.css === t.css &&
                e.media === t.media &&
                e.sourceMap === t.sourceMap &&
                e.supports === t.supports &&
                e.layer === t.layer
              )
                return;
              n.update((t = e));
            } else n.remove();
          }
        );
      }
      t.exports = function (t, i) {
        var o = r((t = t || []), (i = i || {}));
        return function (t) {
          t = t || [];
          for (var s = 0; s < o.length; s++) {
            var a = n(o[s]);
            e[a].references--;
          }
          for (var h = r(t, i), u = 0; u < o.length; u++) {
            var c = n(o[u]);
            0 === e[c].references && (e[c].updater(), e.splice(c, 1));
          }
          o = h;
        };
      };
    },
    659: (t) => {
      "use strict";
      var e = {};
      t.exports = function (t, n) {
        var r = (function (t) {
          if (void 0 === e[t]) {
            var n = document.querySelector(t);
            if (
              window.HTMLIFrameElement &&
              n instanceof window.HTMLIFrameElement
            )
              try {
                n = n.contentDocument.head;
              } catch (t) {
                n = null;
              }
            e[t] = n;
          }
          return e[t];
        })(t);
        if (!r)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
          );
        r.appendChild(n);
      };
    },
    540: (t) => {
      "use strict";
      t.exports = function (t) {
        var e = document.createElement("style");
        return t.setAttributes(e, t.attributes), t.insert(e, t.options), e;
      };
    },
    56: (t, e, n) => {
      "use strict";
      t.exports = function (t) {
        var e = n.nc;
        e && t.setAttribute("nonce", e);
      };
    },
    825: (t) => {
      "use strict";
      t.exports = function (t) {
        if ("undefined" == typeof document)
          return { update: function () {}, remove: function () {} };
        var e = t.insertStyleElement(t);
        return {
          update: function (n) {
            !(function (t, e, n) {
              var r = "";
              n.supports && (r += "@supports (".concat(n.supports, ") {")),
                n.media && (r += "@media ".concat(n.media, " {"));
              var i = void 0 !== n.layer;
              i &&
                (r += "@layer".concat(
                  n.layer.length > 0 ? " ".concat(n.layer) : "",
                  " {"
                )),
                (r += n.css),
                i && (r += "}"),
                n.media && (r += "}"),
                n.supports && (r += "}");
              var o = n.sourceMap;
              o &&
                "undefined" != typeof btoa &&
                (r +=
                  "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                    btoa(unescape(encodeURIComponent(JSON.stringify(o)))),
                    " */"
                  )),
                e.styleTagTransform(r, t, e.options);
            })(e, t, n);
          },
          remove: function () {
            !(function (t) {
              if (null === t.parentNode) return !1;
              t.parentNode.removeChild(t);
            })(e);
          },
        };
      };
    },
    113: (t) => {
      "use strict";
      t.exports = function (t, e) {
        if (e.styleSheet) e.styleSheet.cssText = t;
        else {
          for (; e.firstChild; ) e.removeChild(e.firstChild);
          e.appendChild(document.createTextNode(t));
        }
      };
    },
    109: (t, e, n) => {
      "use strict";
      function r(t) {
        for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        r(n(381)),
        r(n(890)),
        r(n(210)),
        r(n(810)),
        r(n(155)),
        r(n(795)),
        r(n(128)),
        r(n(755)),
        r(n(581)),
        r(n(965)),
        r(n(957)),
        r(n(266)),
        r(n(893)),
        r(n(542)),
        r(n(126)),
        r(n(804));
    },
    381: function (t, e, n) {
      "use strict";
      var r,
        i =
          (this && this.__extends) ||
          ((r = function (t, e) {
            return (
              (r =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                }),
              r(t, e)
            );
          }),
          function (t, e) {
            function n() {
              this.constructor = t;
            }
            r(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((n.prototype = e.prototype), new n()));
          });
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = n(128),
        s = (function (t) {
          function e(e) {
            var n = t.call(this) || this,
              r = e;
            return (
              r.trigger && (n.trigger = r.trigger),
              r.kick && (n.kick = r.kick),
              r.drag && (n.drag = r.drag),
              r.on && (n.on = r.on),
              (n.dragstart = n.dragStart = o.Layout.dragStart),
              (n.dragend = n.dragEnd = o.Layout.dragEnd),
              n
            );
          }
          return (
            i(e, t),
            (e.prototype.trigger = function (t) {}),
            (e.prototype.kick = function () {}),
            (e.prototype.drag = function () {}),
            (e.prototype.on = function (t, e) {
              return this;
            }),
            e
          );
        })(o.Layout);
      (e.LayoutAdaptor = s),
        (e.adaptor = function (t) {
          return new s(t);
        });
    },
    804: (t, e, n) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var r = n(128),
        i = n(155);
      (e.gridify = function (t, e, n, r) {
        return (
          t.cola.start(0, 0, 0, 10, !1),
          (function (t, e, n, r) {
            t.forEach(function (t) {
              t.routerNode = { name: t.name, bounds: t.bounds.inflate(-n) };
            }),
              e.forEach(function (e) {
                e.routerNode = {
                  bounds: e.bounds.inflate(-r),
                  children: (void 0 !== e.groups
                    ? e.groups.map(function (e) {
                        return t.length + e.id;
                      })
                    : []
                  ).concat(
                    void 0 !== e.leaves
                      ? e.leaves.map(function (t) {
                          return t.index;
                        })
                      : []
                  ),
                };
              });
            var o = t.concat(e).map(function (t, e) {
              return (t.routerNode.id = e), t.routerNode;
            });
            return new i.GridRouter(
              o,
              {
                getChildren: function (t) {
                  return t.children;
                },
                getBounds: function (t) {
                  return t.bounds;
                },
              },
              n - r
            );
          })(t.cola.nodes(), t.cola.groups(), n, r).routeEdges(
            t.powerGraph.powerEdges,
            e,
            function (t) {
              return t.source.routerNode.id;
            },
            function (t) {
              return t.target.routerNode.id;
            }
          )
        );
      }),
        (e.powerGraphGridLayout = function (t, e, n) {
          var i;
          t.nodes.forEach(function (t, e) {
            return (t.index = e);
          }),
            new r.Layout()
              .avoidOverlaps(!1)
              .nodes(t.nodes)
              .links(t.links)
              .powerGraphGroups(function (t) {
                (i = t).groups.forEach(function (t) {
                  return (t.padding = n);
                });
              });
          var o = t.nodes.length,
            s = [],
            a = t.nodes.slice(0);
          return (
            a.forEach(function (t, e) {
              return (t.index = e);
            }),
            i.groups.forEach(function (t) {
              var e = (t.index = t.id + o);
              a.push(t),
                void 0 !== t.leaves &&
                  t.leaves.forEach(function (t) {
                    return s.push({ source: e, target: t.index });
                  }),
                void 0 !== t.groups &&
                  t.groups.forEach(function (t) {
                    return s.push({ source: e, target: t.id + o });
                  });
            }),
            i.powerEdges.forEach(function (t) {
              s.push({ source: t.source.index, target: t.target.index });
            }),
            new r.Layout()
              .size(e)
              .nodes(a)
              .links(s)
              .avoidOverlaps(!1)
              .linkDistance(30)
              .symmetricDiffLinkLengths(5)
              .convergenceThreshold(1e-4)
              .start(100, 0, 0, 0, !1),
            {
              cola: new r.Layout()
                .convergenceThreshold(0.001)
                .size(e)
                .avoidOverlaps(!0)
                .nodes(t.nodes)
                .links(t.links)
                .groupCompactness(1e-4)
                .linkDistance(30)
                .symmetricDiffLinkLengths(5)
                .powerGraphGroups(function (t) {
                  (i = t).groups.forEach(function (t) {
                    t.padding = n;
                  });
                })
                .start(50, 0, 100, 0, !1),
              powerGraph: i,
            }
          );
        });
    },
    890: (t, e, n) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var r = n(915),
        i = n(924);
      e.d3adaptor = function (t) {
        return !t ||
          (function (t) {
            return t.version && null !== t.version.match(/^3\./);
          })(t)
          ? new r.D3StyleLayoutAdaptor()
          : new i.D3StyleLayoutAdaptor(t);
      };
    },
    915: function (t, e, n) {
      "use strict";
      var r,
        i =
          (this && this.__extends) ||
          ((r = function (t, e) {
            return (
              (r =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                }),
              r(t, e)
            );
          }),
          function (t, e) {
            function n() {
              this.constructor = t;
            }
            r(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((n.prototype = e.prototype), new n()));
          });
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = n(128),
        s = (function (t) {
          function e() {
            var e = t.call(this) || this;
            e.event = d3.dispatch(
              o.EventType[o.EventType.start],
              o.EventType[o.EventType.tick],
              o.EventType[o.EventType.end]
            );
            var n = e;
            return (
              (e.drag = function () {
                if (!t)
                  var t = d3.behavior
                    .drag()
                    .origin(o.Layout.dragOrigin)
                    .on("dragstart.d3adaptor", o.Layout.dragStart)
                    .on("drag.d3adaptor", function (t) {
                      o.Layout.drag(t, d3.event), n.resume();
                    })
                    .on("dragend.d3adaptor", o.Layout.dragEnd);
                if (!arguments.length) return t;
                this.call(t);
              }),
              e
            );
          }
          return (
            i(e, t),
            (e.prototype.trigger = function (t) {
              var e = {
                type: o.EventType[t.type],
                alpha: t.alpha,
                stress: t.stress,
              };
              this.event[e.type](e);
            }),
            (e.prototype.kick = function () {
              var e = this;
              d3.timer(function () {
                return t.prototype.tick.call(e);
              });
            }),
            (e.prototype.on = function (t, e) {
              return (
                "string" == typeof t
                  ? this.event.on(t, e)
                  : this.event.on(o.EventType[t], e),
                this
              );
            }),
            e
          );
        })(o.Layout);
      (e.D3StyleLayoutAdaptor = s),
        (e.d3adaptor = function () {
          return new s();
        });
    },
    924: function (t, e, n) {
      "use strict";
      var r,
        i =
          (this && this.__extends) ||
          ((r = function (t, e) {
            return (
              (r =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                }),
              r(t, e)
            );
          }),
          function (t, e) {
            function n() {
              this.constructor = t;
            }
            r(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((n.prototype = e.prototype), new n()));
          });
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = n(128),
        s = (function (t) {
          function e(e) {
            var n = t.call(this) || this;
            (n.d3Context = e),
              (n.event = e.dispatch(
                o.EventType[o.EventType.start],
                o.EventType[o.EventType.tick],
                o.EventType[o.EventType.end]
              ));
            var r = n;
            return (
              (n.drag = function () {
                if (!t)
                  var t = e
                    .drag()
                    .subject(o.Layout.dragOrigin)
                    .on("start.d3adaptor", o.Layout.dragStart)
                    .on("drag.d3adaptor", function (t) {
                      o.Layout.drag(t, e.event), r.resume();
                    })
                    .on("end.d3adaptor", o.Layout.dragEnd);
                if (!arguments.length) return t;
                arguments[0].call(t);
              }),
              n
            );
          }
          return (
            i(e, t),
            (e.prototype.trigger = function (t) {
              var e = {
                type: o.EventType[t.type],
                alpha: t.alpha,
                stress: t.stress,
              };
              this.event.call(e.type, e);
            }),
            (e.prototype.kick = function () {
              var e = this,
                n = this.d3Context.timer(function () {
                  return t.prototype.tick.call(e) && n.stop();
                });
            }),
            (e.prototype.on = function (t, e) {
              return (
                "string" == typeof t
                  ? this.event.on(t, e)
                  : this.event.on(o.EventType[t], e),
                this
              );
            }),
            e
          );
        })(o.Layout);
      e.D3StyleLayoutAdaptor = s;
    },
    210: (t, e) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = (function () {
        function t() {
          this.locks = {};
        }
        return (
          (t.prototype.add = function (t, e) {
            this.locks[t] = e;
          }),
          (t.prototype.clear = function () {
            this.locks = {};
          }),
          (t.prototype.isEmpty = function () {
            for (var t in this.locks) return !1;
            return !0;
          }),
          (t.prototype.apply = function (t) {
            for (var e in this.locks) t(Number(e), this.locks[e]);
          }),
          t
        );
      })();
      e.Locks = n;
      var r = (function () {
        function t(t, e, r) {
          void 0 === r && (r = null),
            (this.D = e),
            (this.G = r),
            (this.threshold = 1e-4),
            (this.numGridSnapNodes = 0),
            (this.snapGridSize = 100),
            (this.snapStrength = 1e3),
            (this.scaleSnapByMaxH = !1),
            (this.random = new i()),
            (this.project = null),
            (this.x = t),
            (this.k = t.length);
          var o = (this.n = t[0].length);
          (this.H = new Array(this.k)),
            (this.g = new Array(this.k)),
            (this.Hd = new Array(this.k)),
            (this.a = new Array(this.k)),
            (this.b = new Array(this.k)),
            (this.c = new Array(this.k)),
            (this.d = new Array(this.k)),
            (this.e = new Array(this.k)),
            (this.ia = new Array(this.k)),
            (this.ib = new Array(this.k)),
            (this.xtmp = new Array(this.k)),
            (this.locks = new n()),
            (this.minD = Number.MAX_VALUE);
          for (var s, a = o; a--; )
            for (s = o; --s > a; ) {
              var h = e[a][s];
              h > 0 && h < this.minD && (this.minD = h);
            }
          for (
            this.minD === Number.MAX_VALUE && (this.minD = 1), a = this.k;
            a--;

          ) {
            for (
              this.g[a] = new Array(o), this.H[a] = new Array(o), s = o;
              s--;

            )
              this.H[a][s] = new Array(o);
            (this.Hd[a] = new Array(o)),
              (this.a[a] = new Array(o)),
              (this.b[a] = new Array(o)),
              (this.c[a] = new Array(o)),
              (this.d[a] = new Array(o)),
              (this.e[a] = new Array(o)),
              (this.ia[a] = new Array(o)),
              (this.ib[a] = new Array(o)),
              (this.xtmp[a] = new Array(o));
          }
        }
        return (
          (t.createSquareMatrix = function (t, e) {
            for (var n = new Array(t), r = 0; r < t; ++r) {
              n[r] = new Array(t);
              for (var i = 0; i < t; ++i) n[r][i] = e(r, i);
            }
            return n;
          }),
          (t.prototype.offsetDir = function () {
            for (
              var t = this, e = new Array(this.k), n = 0, r = 0;
              r < this.k;
              ++r
            ) {
              var i = (e[r] = this.random.getNextBetween(0.01, 1) - 0.5);
              n += i * i;
            }
            return (
              (n = Math.sqrt(n)),
              e.map(function (e) {
                return e * (t.minD / n);
              })
            );
          }),
          (t.prototype.computeDerivatives = function (t) {
            var e = this,
              n = this.n;
            if (!(n < 1)) {
              for (
                var r,
                  i = new Array(this.k),
                  o = new Array(this.k),
                  s = new Array(this.k),
                  a = 0,
                  h = 0;
                h < n;
                ++h
              ) {
                for (r = 0; r < this.k; ++r) s[r] = this.g[r][h] = 0;
                for (var u = 0; u < n; ++u)
                  if (h !== u) {
                    for (var c = n; c--; ) {
                      var l = 0;
                      for (r = 0; r < this.k; ++r) {
                        var p = (i[r] = t[r][h] - t[r][u]);
                        l += o[r] = p * p;
                      }
                      if (l > 1e-9) break;
                      var f = this.offsetDir();
                      for (r = 0; r < this.k; ++r) t[r][u] += f[r];
                    }
                    var d = Math.sqrt(l),
                      g = this.D[h][u],
                      v = null != this.G ? this.G[h][u] : 1;
                    if ((v > 1 && d > g) || !isFinite(g))
                      for (r = 0; r < this.k; ++r) this.H[r][h][u] = 0;
                    else {
                      v > 1 && (v = 1);
                      var y = g * g,
                        m = (2 * v * (d - g)) / (y * d),
                        _ = d * d * d,
                        E = (2 * -v) / (y * _);
                      for (
                        isFinite(m) || console.log(m), r = 0;
                        r < this.k;
                        ++r
                      )
                        (this.g[r][h] += i[r] * m),
                          (s[r] -= this.H[r][h][u] =
                            E * (_ + g * (o[r] - l) + d * l));
                    }
                  }
                for (r = 0; r < this.k; ++r)
                  a = Math.max(a, (this.H[r][h][h] = s[r]));
              }
              var b = this.snapGridSize / 2,
                w = this.snapGridSize,
                N = this.snapStrength / (b * b),
                x = this.numGridSnapNodes;
              for (h = 0; h < x; ++h)
                for (r = 0; r < this.k; ++r) {
                  var A = this.x[r][h],
                    T = A / w,
                    M = T % 1,
                    O = T - M;
                  -b <
                    (p =
                      Math.abs(M) <= 0.5
                        ? A - O * w
                        : A > 0
                        ? A - (O + 1) * w
                        : A - (O - 1) * w) &&
                    p <= b &&
                    (this.scaleSnapByMaxH
                      ? ((this.g[r][h] += a * N * p),
                        (this.H[r][h][h] += a * N))
                      : ((this.g[r][h] += N * p), (this.H[r][h][h] += N)));
                }
              this.locks.isEmpty() ||
                this.locks.apply(function (n, i) {
                  for (r = 0; r < e.k; ++r)
                    (e.H[r][n][n] += a), (e.g[r][n] -= a * (i[r] - t[r][n]));
                });
            }
          }),
          (t.dotProd = function (t, e) {
            for (var n = 0, r = t.length; r--; ) n += t[r] * e[r];
            return n;
          }),
          (t.rightMultiply = function (e, n, r) {
            for (var i = e.length; i--; ) r[i] = t.dotProd(e[i], n);
          }),
          (t.prototype.computeStepSize = function (e) {
            for (var n = 0, r = 0, i = 0; i < this.k; ++i)
              (n += t.dotProd(this.g[i], e[i])),
                t.rightMultiply(this.H[i], e[i], this.Hd[i]),
                (r += t.dotProd(e[i], this.Hd[i]));
            return 0 !== r && isFinite(r) ? (1 * n) / r : 0;
          }),
          (t.prototype.reduceStress = function () {
            this.computeDerivatives(this.x);
            for (var t = this.computeStepSize(this.g), e = 0; e < this.k; ++e)
              this.takeDescentStep(this.x[e], this.g[e], t);
            return this.computeStress();
          }),
          (t.copy = function (t, e) {
            for (var n = t.length, r = e[0].length, i = 0; i < n; ++i)
              for (var o = 0; o < r; ++o) e[i][o] = t[i][o];
          }),
          (t.prototype.stepAndProject = function (e, n, r, i) {
            t.copy(e, n),
              this.takeDescentStep(n[0], r[0], i),
              this.project && this.project[0](e[0], e[1], n[0]),
              this.takeDescentStep(n[1], r[1], i),
              this.project && this.project[1](n[0], e[1], n[1]);
            for (var o = 2; o < this.k; o++)
              this.takeDescentStep(n[o], r[o], i);
          }),
          (t.mApply = function (t, e, n) {
            for (var r = t; r-- > 0; ) for (var i = e; i-- > 0; ) n(r, i);
          }),
          (t.prototype.matrixApply = function (e) {
            t.mApply(this.k, this.n, e);
          }),
          (t.prototype.computeNextPosition = function (t, e) {
            var n = this;
            this.computeDerivatives(t);
            var r = this.computeStepSize(this.g);
            if ((this.stepAndProject(t, e, this.g, r), this.project)) {
              this.matrixApply(function (r, i) {
                return (n.e[r][i] = t[r][i] - e[r][i]);
              });
              var i = this.computeStepSize(this.e);
              (i = Math.max(0.2, Math.min(i, 1))),
                this.stepAndProject(t, e, this.e, i);
            }
          }),
          (t.prototype.run = function (t) {
            for (var e = Number.MAX_VALUE, n = !1; !n && t-- > 0; ) {
              var r = this.rungeKutta();
              (n = Math.abs(e / r - 1) < this.threshold), (e = r);
            }
            return e;
          }),
          (t.prototype.rungeKutta = function () {
            var e = this;
            this.computeNextPosition(this.x, this.a),
              t.mid(this.x, this.a, this.ia),
              this.computeNextPosition(this.ia, this.b),
              t.mid(this.x, this.b, this.ib),
              this.computeNextPosition(this.ib, this.c),
              this.computeNextPosition(this.c, this.d);
            var n = 0;
            return (
              this.matrixApply(function (t, r) {
                var i =
                    (e.a[t][r] + 2 * e.b[t][r] + 2 * e.c[t][r] + e.d[t][r]) / 6,
                  o = e.x[t][r] - i;
                (n += o * o), (e.x[t][r] = i);
              }),
              n
            );
          }),
          (t.mid = function (e, n, r) {
            t.mApply(e.length, e[0].length, function (t, i) {
              return (r[t][i] = e[t][i] + (n[t][i] - e[t][i]) / 2);
            });
          }),
          (t.prototype.takeDescentStep = function (t, e, n) {
            for (var r = 0; r < this.n; ++r) t[r] = t[r] - n * e[r];
          }),
          (t.prototype.computeStress = function () {
            for (var t = 0, e = 0, n = this.n - 1; e < n; ++e)
              for (var r = e + 1, i = this.n; r < i; ++r) {
                for (var o = 0, s = 0; s < this.k; ++s) {
                  var a = this.x[s][e] - this.x[s][r];
                  o += a * a;
                }
                o = Math.sqrt(o);
                var h = this.D[e][r];
                if (isFinite(h)) {
                  var u = h - o;
                  t += (u * u) / (h * h);
                }
              }
            return t;
          }),
          (t.zeroDistance = 1e-10),
          t
        );
      })();
      e.Descent = r;
      var i = (function () {
        function t(t) {
          void 0 === t && (t = 1),
            (this.seed = t),
            (this.a = 214013),
            (this.c = 2531011),
            (this.m = 2147483648),
            (this.range = 32767);
        }
        return (
          (t.prototype.getNext = function () {
            return (
              (this.seed = (this.seed * this.a + this.c) % this.m),
              (this.seed >> 16) / this.range
            );
          }),
          (t.prototype.getNextBetween = function (t, e) {
            return t + this.getNext() * (e - t);
          }),
          t
        );
      })();
      e.PseudoRandom = i;
    },
    810: function (t, e, n) {
      "use strict";
      var r,
        i =
          (this && this.__extends) ||
          ((r = function (t, e) {
            return (
              (r =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                }),
              r(t, e)
            );
          }),
          function (t, e) {
            function n() {
              this.constructor = t;
            }
            r(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((n.prototype = e.prototype), new n()));
          });
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = n(893),
        s = function () {};
      e.Point = s;
      var a = function (t, e, n, r) {
        (this.x1 = t), (this.y1 = e), (this.x2 = n), (this.y2 = r);
      };
      e.LineSegment = a;
      var h = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return i(e, t), e;
      })(s);
      function u(t, e, n) {
        return (e.x - t.x) * (n.y - t.y) - (n.x - t.x) * (e.y - t.y);
      }
      function c(t, e, n) {
        return u(t, e, n) > 0;
      }
      function l(t, e, n) {
        return u(t, e, n) < 0;
      }
      function p(t, e) {
        var n,
          r,
          i,
          o,
          s = e.length - 1;
        if (l(t, e[1], e[0]) && !c(t, e[s - 1], e[0])) return 0;
        for (n = 0, r = s; ; ) {
          if (r - n == 1) return c(t, e[n], e[r]) ? n : r;
          if (
            (o = l(t, e[(i = Math.floor((n + r) / 2)) + 1], e[i])) &&
            !c(t, e[i - 1], e[i])
          )
            return i;
          c(t, e[n + 1], e[n])
            ? o || c(t, e[n], e[i])
              ? (r = i)
              : (n = i)
            : o && l(t, e[n], e[i])
            ? (r = i)
            : (n = i);
        }
      }
      function f(t, e) {
        var n,
          r,
          i,
          o,
          s = e.length - 1;
        if (c(t, e[s - 1], e[0]) && !l(t, e[1], e[0])) return 0;
        for (n = 0, r = s; ; ) {
          if (r - n == 1) return l(t, e[n], e[r]) ? n : r;
          if (
            ((o = l(t, e[(i = Math.floor((n + r) / 2)) + 1], e[i])),
            c(t, e[i - 1], e[i]) && !o)
          )
            return i;
          l(t, e[n + 1], e[n])
            ? o
              ? l(t, e[n], e[i])
                ? (r = i)
                : (n = i)
              : (r = i)
            : o
            ? (n = i)
            : c(t, e[n], e[i])
            ? (r = i)
            : (n = i);
        }
      }
      function d(t, e, n, r, i, o) {
        var s, a;
        a = r(t[(s = n(e[0], t))], e);
        for (var h = !1; !h; ) {
          for (
            h = !0;
            s === t.length - 1 && (s = 0), !i(e[a], t[s], t[s + 1]);

          )
            ++s;
          for (; 0 === a && (a = e.length - 1), !o(t[s], e[a], e[a - 1]); )
            --a, (h = !1);
        }
        return { t1: s, t2: a };
      }
      function g(t, e) {
        return d(t, e, p, f, c, l);
      }
      (e.PolyPoint = h),
        (e.isLeft = u),
        (e.ConvexHull = function (t) {
          var e,
            n = t.slice(0).sort(function (t, e) {
              return t.x !== e.x ? e.x - t.x : e.y - t.y;
            }),
            r = t.length,
            i = n[0].x;
          for (e = 1; e < r && n[e].x === i; ++e);
          var o = e - 1,
            s = [];
          if ((s.push(n[0]), o === r - 1)) n[o].y !== n[0].y && s.push(n[o]);
          else {
            var a,
              h = r - 1,
              c = n[r - 1].x;
            for (e = r - 2; e >= 0 && n[e].x === c; e--);
            for (a = e + 1, e = o; ++e <= a; )
              if (!(u(n[0], n[a], n[e]) >= 0 && e < a)) {
                for (
                  ;
                  s.length > 1 &&
                  !(u(s[s.length - 2], s[s.length - 1], n[e]) > 0);

                )
                  s.length -= 1;
                0 != e && s.push(n[e]);
              }
            h != a && s.push(n[h]);
            var l = s.length;
            for (e = a; --e >= o; )
              if (!(u(n[h], n[o], n[e]) >= 0 && e > o)) {
                for (
                  ;
                  s.length > l &&
                  !(u(s[s.length - 2], s[s.length - 1], n[e]) > 0);

                )
                  s.length -= 1;
                0 != e && s.push(n[e]);
              }
          }
          return s;
        }),
        (e.clockwiseRadialSweep = function (t, e, n) {
          e.slice(0)
            .sort(function (e, n) {
              return (
                Math.atan2(e.y - t.y, e.x - t.x) -
                Math.atan2(n.y - t.y, n.x - t.x)
              );
            })
            .forEach(n);
        }),
        (e.tangent_PolyPolyC = d),
        (e.LRtangent_PolyPolyC = function (t, e) {
          var n = g(e, t);
          return { t1: n.t2, t2: n.t1 };
        }),
        (e.RLtangent_PolyPolyC = g),
        (e.LLtangent_PolyPolyC = function (t, e) {
          return d(t, e, f, f, l, l);
        }),
        (e.RRtangent_PolyPolyC = function (t, e) {
          return d(t, e, p, p, c, c);
        });
      var v = function (t, e) {
        (this.t1 = t), (this.t2 = e);
      };
      e.BiTangent = v;
      var y = function () {};
      e.BiTangents = y;
      var m = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return i(e, t), e;
      })(s);
      e.TVGPoint = m;
      var _ = function (t, e, n, r) {
        (this.id = t),
          (this.polyid = e),
          (this.polyvertid = n),
          (this.p = r),
          (r.vv = this);
      };
      e.VisibilityVertex = _;
      var E = (function () {
        function t(t, e) {
          (this.source = t), (this.target = e);
        }
        return (
          (t.prototype.length = function () {
            var t = this.source.p.x - this.target.p.x,
              e = this.source.p.y - this.target.p.y;
            return Math.sqrt(t * t + e * e);
          }),
          t
        );
      })();
      e.VisibilityEdge = E;
      var b = (function () {
        function t(t, e) {
          if (((this.P = t), (this.V = []), (this.E = []), e))
            (this.V = e.V.slice(0)), (this.E = e.E.slice(0));
          else {
            for (var n = t.length, r = 0; r < n; r++) {
              for (var i = t[r], o = 0; o < i.length; ++o) {
                var s = i[o],
                  a = new _(this.V.length, r, o, s);
                this.V.push(a), o > 0 && this.E.push(new E(i[o - 1].vv, a));
              }
              i.length > 1 && this.E.push(new E(i[0].vv, i[i.length - 1].vv));
            }
            for (r = 0; r < n - 1; r++) {
              var h = t[r];
              for (o = r + 1; o < n; o++) {
                var u = t[o],
                  c = N(h, u);
                for (var l in c) {
                  var p = c[l],
                    f = h[p.t1],
                    d = u[p.t2];
                  this.addEdgeIfVisible(f, d, r, o);
                }
              }
            }
          }
        }
        return (
          (t.prototype.addEdgeIfVisible = function (t, e, n, r) {
            this.intersectsPolys(new a(t.x, t.y, e.x, e.y), n, r) ||
              this.E.push(new E(t.vv, e.vv));
          }),
          (t.prototype.addPoint = function (t, e) {
            var n,
              r,
              i,
              o = this.P.length;
            this.V.push(new _(this.V.length, o, 0, t));
            for (var s = 0; s < o; ++s)
              if (s !== e) {
                var a = this.P[s],
                  h =
                    ((n = t),
                    (i = void 0),
                    (i = (r = a).slice(0)).push(r[0]),
                    { rtan: p(n, i), ltan: f(n, i) });
                this.addEdgeIfVisible(t, a[h.ltan], e, s),
                  this.addEdgeIfVisible(t, a[h.rtan], e, s);
              }
            return t.vv;
          }),
          (t.prototype.intersectsPolys = function (t, e, n) {
            for (var r = 0, i = this.P.length; r < i; ++r)
              if (r != e && r != n && w(t, this.P[r]).length > 0) return !0;
            return !1;
          }),
          t
        );
      })();
      function w(t, e) {
        for (var n = [], r = 1, i = e.length; r < i; ++r) {
          var s = o.Rectangle.lineIntersection(
            t.x1,
            t.y1,
            t.x2,
            t.y2,
            e[r - 1].x,
            e[r - 1].y,
            e[r].x,
            e[r].y
          );
          s && n.push(s);
        }
        return n;
      }
      function N(t, e) {
        for (
          var n = t.length - 1, r = e.length - 1, i = new y(), o = 0;
          o < n;
          ++o
        )
          for (var s = 0; s < r; ++s) {
            var a = t[0 == o ? n - 1 : o - 1],
              h = t[o],
              c = t[o + 1],
              l = e[0 == s ? r - 1 : s - 1],
              p = e[s],
              f = e[s + 1],
              d = u(a, h, p),
              g = u(h, l, p),
              m = u(h, p, f),
              _ = u(l, p, h),
              E = u(p, a, h),
              b = u(p, h, c);
            d >= 0 && g >= 0 && m < 0 && _ >= 0 && E >= 0 && b < 0
              ? (i.ll = new v(o, s))
              : d <= 0 && g <= 0 && m > 0 && _ <= 0 && E <= 0 && b > 0
              ? (i.rr = new v(o, s))
              : d <= 0 && g > 0 && m <= 0 && _ >= 0 && E < 0 && b >= 0
              ? (i.rl = new v(o, s))
              : d >= 0 &&
                g < 0 &&
                m >= 0 &&
                _ <= 0 &&
                E > 0 &&
                b <= 0 &&
                (i.lr = new v(o, s));
          }
        return i;
      }
      function x(t, e) {
        return !t.every(function (t) {
          return !(function (t, e) {
            for (var n = 1, r = e.length; n < r; ++n)
              if (l(e[n - 1], e[n], t)) return !1;
            return !0;
          })(t, e);
        });
      }
      (e.TangentVisibilityGraph = b),
        (e.tangents = N),
        (e.polysOverlap = function (t, e) {
          if (x(t, e)) return !0;
          if (x(e, t)) return !0;
          for (var n = 1, r = t.length; n < r; ++n) {
            var i = t[n],
              o = t[n - 1];
            if (w(new a(o.x, o.y, i.x, i.y), e).length > 0) return !0;
          }
          return !1;
        });
    },
    155: (t, e, n) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var r = n(893),
        i = n(126),
        o = n(542),
        s = function (t, e, n) {
          (this.id = t),
            (this.rect = e),
            (this.children = n),
            (this.leaf = void 0 === n || 0 === n.length);
        };
      e.NodeWrapper = s;
      var a = function (t, e, n, r, i) {
        void 0 === r && (r = null),
          void 0 === i && (i = null),
          (this.id = t),
          (this.x = e),
          (this.y = n),
          (this.node = r),
          (this.line = i);
      };
      e.Vert = a;
      var h = (function () {
        function t(e, n) {
          (this.s = e), (this.t = n);
          var r = t.findMatch(e, n),
            i = n.slice(0).reverse(),
            o = t.findMatch(e, i);
          r.length >= o.length
            ? ((this.length = r.length),
              (this.si = r.si),
              (this.ti = r.ti),
              (this.reversed = !1))
            : ((this.length = o.length),
              (this.si = o.si),
              (this.ti = n.length - o.ti - o.length),
              (this.reversed = !0));
        }
        return (
          (t.findMatch = function (t, e) {
            for (
              var n = t.length,
                r = e.length,
                i = { length: 0, si: -1, ti: -1 },
                o = new Array(n),
                s = 0;
              s < n;
              s++
            ) {
              o[s] = new Array(r);
              for (var a = 0; a < r; a++)
                if (t[s] === e[a]) {
                  var h = (o[s][a] =
                    0 === s || 0 === a ? 1 : o[s - 1][a - 1] + 1);
                  h > i.length &&
                    ((i.length = h), (i.si = s - h + 1), (i.ti = a - h + 1));
                } else o[s][a] = 0;
            }
            return i;
          }),
          (t.prototype.getSequence = function () {
            return this.length >= 0
              ? this.s.slice(this.si, this.si + this.length)
              : [];
          }),
          t
        );
      })();
      e.LongestCommonSubsequence = h;
      var u = (function () {
        function t(t, e, n) {
          var i = this;
          void 0 === n && (n = 12),
            (this.originalnodes = t),
            (this.groupPadding = n),
            (this.leaves = null),
            (this.nodes = t.map(function (t, n) {
              return new s(n, e.getBounds(t), e.getChildren(t));
            })),
            (this.leaves = this.nodes.filter(function (t) {
              return t.leaf;
            })),
            (this.groups = this.nodes.filter(function (t) {
              return !t.leaf;
            })),
            (this.cols = this.getGridLines("x")),
            (this.rows = this.getGridLines("y")),
            this.groups.forEach(function (t) {
              return t.children.forEach(function (e) {
                return (i.nodes[e].parent = t);
              });
            }),
            (this.root = { children: [] }),
            this.nodes.forEach(function (t) {
              void 0 === t.parent &&
                ((t.parent = i.root), i.root.children.push(t.id)),
                (t.ports = []);
            }),
            (this.backToFront = this.nodes.slice(0)),
            this.backToFront.sort(function (t, e) {
              return i.getDepth(t) - i.getDepth(e);
            }),
            this.backToFront
              .slice(0)
              .reverse()
              .filter(function (t) {
                return !t.leaf;
              })
              .forEach(function (t) {
                var e = r.Rectangle.empty();
                t.children.forEach(function (t) {
                  return (e = e.union(i.nodes[t].rect));
                }),
                  (t.rect = e.inflate(i.groupPadding));
              });
          var o = this.midPoints(
              this.cols.map(function (t) {
                return t.pos;
              })
            ),
            h = this.midPoints(
              this.rows.map(function (t) {
                return t.pos;
              })
            ),
            u = o[0],
            c = o[o.length - 1],
            l = h[0],
            p = h[h.length - 1],
            f = this.rows
              .map(function (t) {
                return { x1: u, x2: c, y1: t.pos, y2: t.pos };
              })
              .concat(
                h.map(function (t) {
                  return { x1: u, x2: c, y1: t, y2: t };
                })
              ),
            d = this.cols
              .map(function (t) {
                return { x1: t.pos, x2: t.pos, y1: l, y2: p };
              })
              .concat(
                o.map(function (t) {
                  return { x1: t, x2: t, y1: l, y2: p };
                })
              ),
            g = f.concat(d);
          g.forEach(function (t) {
            return (t.verts = []);
          }),
            (this.verts = []),
            (this.edges = []),
            f.forEach(function (t) {
              return d.forEach(function (e) {
                var n = new a(i.verts.length, e.x1, t.y1);
                t.verts.push(n), e.verts.push(n), i.verts.push(n);
                for (var r = i.backToFront.length; r-- > 0; ) {
                  var o = i.backToFront[r],
                    s = o.rect,
                    h = Math.abs(n.x - s.cx()),
                    u = Math.abs(n.y - s.cy());
                  if (h < s.width() / 2 && u < s.height() / 2) {
                    n.node = o;
                    break;
                  }
                }
              });
            }),
            g.forEach(function (t, e) {
              i.nodes.forEach(function (e, n) {
                e.rect
                  .lineIntersections(t.x1, t.y1, t.x2, t.y2)
                  .forEach(function (n, r) {
                    var o = new a(i.verts.length, n.x, n.y, e, t);
                    i.verts.push(o), t.verts.push(o), e.ports.push(o);
                  });
              });
              var n = Math.abs(t.y1 - t.y2) < 0.1,
                r = function (t, e) {
                  return n ? e.x - t.x : e.y - t.y;
                };
              t.verts.sort(r);
              for (var o = 1; o < t.verts.length; o++) {
                var s = t.verts[o - 1],
                  h = t.verts[o];
                (s.node && s.node === h.node && s.node.leaf) ||
                  i.edges.push({
                    source: s.id,
                    target: h.id,
                    length: Math.abs(r(s, h)),
                  });
              }
            });
        }
        return (
          (t.prototype.avg = function (t) {
            return (
              t.reduce(function (t, e) {
                return t + e;
              }) / t.length
            );
          }),
          (t.prototype.getGridLines = function (t) {
            for (
              var e = [], n = this.leaves.slice(0, this.leaves.length);
              n.length > 0;

            ) {
              var r = n.filter(function (e) {
                  return e.rect["overlap" + t.toUpperCase()](n[0].rect);
                }),
                i = {
                  nodes: r,
                  pos: this.avg(
                    r.map(function (e) {
                      return e.rect["c" + t]();
                    })
                  ),
                };
              e.push(i),
                i.nodes.forEach(function (t) {
                  return n.splice(n.indexOf(t), 1);
                });
            }
            return (
              e.sort(function (t, e) {
                return t.pos - e.pos;
              }),
              e
            );
          }),
          (t.prototype.getDepth = function (t) {
            for (var e = 0; t.parent !== this.root; ) e++, (t = t.parent);
            return e;
          }),
          (t.prototype.midPoints = function (t) {
            for (
              var e = t[1] - t[0], n = [t[0] - e / 2], r = 1;
              r < t.length;
              r++
            )
              n.push((t[r] + t[r - 1]) / 2);
            return n.push(t[t.length - 1] + e / 2), n;
          }),
          (t.prototype.findLineage = function (t) {
            var e = [t];
            do {
              (t = t.parent), e.push(t);
            } while (t !== this.root);
            return e.reverse();
          }),
          (t.prototype.findAncestorPathBetween = function (t, e) {
            for (
              var n = this.findLineage(t), r = this.findLineage(e), i = 0;
              n[i] === r[i];

            )
              i++;
            return {
              commonAncestor: n[i - 1],
              lineages: n.slice(i).concat(r.slice(i)),
            };
          }),
          (t.prototype.siblingObstacles = function (t, e) {
            var n = this,
              r = this.findAncestorPathBetween(t, e),
              i = {};
            r.lineages.forEach(function (t) {
              return (i[t.id] = {});
            });
            var o = r.commonAncestor.children.filter(function (t) {
              return !(t in i);
            });
            return (
              r.lineages
                .filter(function (t) {
                  return t.parent !== r.commonAncestor;
                })
                .forEach(function (t) {
                  return (o = o.concat(
                    t.parent.children.filter(function (e) {
                      return e !== t.id;
                    })
                  ));
                }),
              o.map(function (t) {
                return n.nodes[t];
              })
            );
          }),
          (t.getSegmentSets = function (t, e, n) {
            for (var r = [], i = 0; i < t.length; i++)
              for (var o = t[i], s = 0; s < o.length; s++) {
                ((l = o[s]).edgeid = i), (l.i = s);
                var a = l[1][e] - l[0][e];
                Math.abs(a) < 0.1 && r.push(l);
              }
            r.sort(function (t, n) {
              return t[0][e] - n[0][e];
            });
            for (var h = [], u = null, c = 0; c < r.length; c++) {
              var l = r[c];
              (!u || Math.abs(l[0][e] - u.pos) > 0.1) &&
                ((u = { pos: l[0][e], segments: [] }), h.push(u)),
                u.segments.push(l);
            }
            return h;
          }),
          (t.nudgeSegs = function (t, e, n, r, o, s) {
            var a = r.length;
            if (!(a <= 1)) {
              for (
                var h = r.map(function (e) {
                    return new i.Variable(e[0][t]);
                  }),
                  u = [],
                  c = 0;
                c < a;
                c++
              )
                for (var l = 0; l < a; l++)
                  if (c !== l) {
                    var p = r[c],
                      f = r[l],
                      d = p.edgeid,
                      g = f.edgeid,
                      v = -1,
                      y = -1;
                    "x" == t
                      ? o(d, g) &&
                        (p[0][e] < p[1][e]
                          ? ((v = l), (y = c))
                          : ((v = c), (y = l)))
                      : o(d, g) &&
                        (p[0][e] < p[1][e]
                          ? ((v = c), (y = l))
                          : ((v = l), (y = c))),
                      v >= 0 && u.push(new i.Constraint(h[v], h[y], s));
                  }
              new i.Solver(h, u).solve(),
                h.forEach(function (e, i) {
                  var o = r[i],
                    s = e.position();
                  o[0][t] = o[1][t] = s;
                  var a = n[o.edgeid];
                  o.i > 0 && (a[o.i - 1][1][t] = s),
                    o.i < a.length - 1 && (a[o.i + 1][0][t] = s);
                });
            }
          }),
          (t.nudgeSegments = function (e, n, r, i, o) {
            for (var s = t.getSegmentSets(e, n, r), a = 0; a < s.length; a++) {
              for (var h = s[a], u = [], c = 0; c < h.segments.length; c++) {
                var l = h.segments[c];
                u.push({ type: 0, s: l, pos: Math.min(l[0][r], l[1][r]) }),
                  u.push({ type: 1, s: l, pos: Math.max(l[0][r], l[1][r]) });
              }
              u.sort(function (t, e) {
                return t.pos - e.pos + t.type - e.type;
              });
              var p = [],
                f = 0;
              u.forEach(function (s) {
                0 === s.type ? (p.push(s.s), f++) : f--,
                  0 == f && (t.nudgeSegs(n, r, e, p, i, o), (p = []));
              });
            }
          }),
          (t.prototype.routeEdges = function (e, n, r, i) {
            var o = this,
              s = e.map(function (t) {
                return o.route(r(t), i(t));
              }),
              a = t.orderEdges(s),
              h = s.map(function (e) {
                return t.makeSegments(e);
              });
            return (
              t.nudgeSegments(h, "x", "y", a, n),
              t.nudgeSegments(h, "y", "x", a, n),
              t.unreverseEdges(h, s),
              h
            );
          }),
          (t.unreverseEdges = function (t, e) {
            t.forEach(function (t, n) {
              e[n].reversed &&
                (t.reverse(),
                t.forEach(function (t) {
                  t.reverse();
                }));
            });
          }),
          (t.angleBetween2Lines = function (t, e) {
            var n = Math.atan2(t[0].y - t[1].y, t[0].x - t[1].x),
              r = Math.atan2(e[0].y - e[1].y, e[0].x - e[1].x),
              i = n - r;
            return (i > Math.PI || i < -Math.PI) && (i = r - n), i;
          }),
          (t.isLeft = function (t, e, n) {
            return (e.x - t.x) * (n.y - t.y) - (e.y - t.y) * (n.x - t.x) <= 0;
          }),
          (t.getOrder = function (t) {
            for (var e = {}, n = 0; n < t.length; n++) {
              var r = t[n];
              void 0 === e[r.l] && (e[r.l] = {}), (e[r.l][r.r] = !0);
            }
            return function (t, n) {
              return void 0 !== e[t] && e[t][n];
            };
          }),
          (t.orderEdges = function (e) {
            for (var n = [], r = 0; r < e.length - 1; r++)
              for (var i = r + 1; i < e.length; i++) {
                var o,
                  s,
                  a,
                  u = e[r],
                  c = e[i],
                  l = new h(u, c);
                0 !== l.length &&
                  (l.reversed &&
                    (c.reverse(), (c.reversed = !0), (l = new h(u, c))),
                  (l.si <= 0 || l.ti <= 0) &&
                  (l.si + l.length >= u.length || l.ti + l.length >= c.length)
                    ? n.push({ l: r, r: i })
                    : (l.si + l.length >= u.length ||
                      l.ti + l.length >= c.length
                        ? ((o = u[l.si + 1]),
                          (a = u[l.si - 1]),
                          (s = c[l.ti - 1]))
                        : ((o = u[l.si + l.length - 2]),
                          (s = u[l.si + l.length]),
                          (a = c[l.ti + l.length])),
                      t.isLeft(o, s, a)
                        ? n.push({ l: i, r })
                        : n.push({ l: r, r: i })));
              }
            return t.getOrder(n);
          }),
          (t.makeSegments = function (t) {
            function e(t) {
              return { x: t.x, y: t.y };
            }
            for (
              var n = function (t, e, n) {
                  return (
                    Math.abs(
                      (e.x - t.x) * (n.y - t.y) - (e.y - t.y) * (n.x - t.x)
                    ) < 0.001
                  );
                },
                r = [],
                i = e(t[0]),
                o = 1;
              o < t.length;
              o++
            ) {
              var s = e(t[o]),
                a = o < t.length - 1 ? t[o + 1] : null;
              (a && n(i, s, a)) || (r.push([i, s]), (i = s));
            }
            return r;
          }),
          (t.prototype.route = function (t, e) {
            var n = this,
              r = this.nodes[t],
              i = this.nodes[e];
            this.obstacles = this.siblingObstacles(r, i);
            var s = {};
            this.obstacles.forEach(function (t) {
              return (s[t.id] = t);
            }),
              (this.passableEdges = this.edges.filter(function (t) {
                var e = n.verts[t.source],
                  r = n.verts[t.target];
                return !(
                  (e.node && e.node.id in s) ||
                  (r.node && r.node.id in s)
                );
              }));
            for (var a = 1; a < r.ports.length; a++) {
              var h = r.ports[0].id,
                u = r.ports[a].id;
              this.passableEdges.push({ source: h, target: u, length: 0 });
            }
            for (a = 1; a < i.ports.length; a++)
              (h = i.ports[0].id),
                (u = i.ports[a].id),
                this.passableEdges.push({ source: h, target: u, length: 0 });
            var c = new o.Calculator(
                this.verts.length,
                this.passableEdges,
                function (t) {
                  return t.source;
                },
                function (t) {
                  return t.target;
                },
                function (t) {
                  return t.length;
                }
              ).PathFromNodeToNodeWithPrevCost(
                r.ports[0].id,
                i.ports[0].id,
                function (t, e, o) {
                  var s = n.verts[t],
                    a = n.verts[e],
                    h = n.verts[o],
                    u = Math.abs(h.x - s.x),
                    c = Math.abs(h.y - s.y);
                  return (s.node === r && s.node === a.node) ||
                    (a.node === i && a.node === h.node)
                    ? 0
                    : u > 1 && c > 1
                    ? 1e3
                    : 0;
                }
              ),
              l = c.reverse().map(function (t) {
                return n.verts[t];
              });
            return (
              l.push(this.nodes[i.id].ports[0]),
              l.filter(function (t, e) {
                return !(
                  (e < l.length - 1 && l[e + 1].node === r && t.node === r) ||
                  (e > 0 && t.node === i && l[e - 1].node === i)
                );
              })
            );
          }),
          (t.getRoutePath = function (e, n, r, i) {
            var o,
              s,
              a,
              h = {
                routepath: "M " + e[0][0].x + " " + e[0][0].y + " ",
                arrowpath: "",
              };
            if (e.length > 1)
              for (var u = 0; u < e.length; u++) {
                var c = (o = e[u])[1].x,
                  l = o[1].y,
                  p = c - o[0].x,
                  f = l - o[0].y;
                if (u < e.length - 1) {
                  Math.abs(p) > 0
                    ? (c -= (p / Math.abs(p)) * n)
                    : (l -= (f / Math.abs(f)) * n),
                    (h.routepath += "L " + c + " " + l + " ");
                  var d = e[u + 1],
                    g = d[0].x,
                    v = d[0].y;
                  (p = d[1].x - g), (f = d[1].y - v);
                  var y,
                    m,
                    _ = t.angleBetween2Lines(o, d) < 0 ? 1 : 0;
                  Math.abs(p) > 0
                    ? ((y = g + (p / Math.abs(p)) * n), (m = v))
                    : ((y = g), (m = v + (f / Math.abs(f)) * n));
                  var E = Math.abs(y - c),
                    b = Math.abs(m - l);
                  h.routepath +=
                    "A " + E + " " + b + " 0 0 " + _ + " " + y + " " + m + " ";
                } else {
                  var w = [c, l];
                  Math.abs(p) > 0
                    ? ((s = [(c -= (p / Math.abs(p)) * i), l + r]),
                      (a = [c, l - r]))
                    : ((s = [c + r, (l -= (f / Math.abs(f)) * i)]),
                      (a = [c - r, l])),
                    (h.routepath += "L " + c + " " + l + " "),
                    i > 0 &&
                      (h.arrowpath =
                        "M " +
                        w[0] +
                        " " +
                        w[1] +
                        " L " +
                        s[0] +
                        " " +
                        s[1] +
                        " L " +
                        a[0] +
                        " " +
                        a[1]);
                }
              }
            else
              (c = (o = e[0])[1].x),
                (l = o[1].y),
                (p = c - o[0].x),
                (f = l - o[0].y),
                (w = [c, l]),
                Math.abs(p) > 0
                  ? ((s = [(c -= (p / Math.abs(p)) * i), l + r]),
                    (a = [c, l - r]))
                  : ((s = [c + r, (l -= (f / Math.abs(f)) * i)]),
                    (a = [c - r, l])),
                (h.routepath += "L " + c + " " + l + " "),
                i > 0 &&
                  (h.arrowpath =
                    "M " +
                    w[0] +
                    " " +
                    w[1] +
                    " L " +
                    s[0] +
                    " " +
                    s[1] +
                    " L " +
                    a[0] +
                    " " +
                    a[1]);
            return h;
          }),
          t
        );
      })();
      e.GridRouter = u;
    },
    795: (t, e) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = 10,
        r = (1 + Math.sqrt(5)) / 2,
        i = 1e-4;
      (e.applyPacking = function (t, e, o, s, a, h) {
        void 0 === a && (a = 1), void 0 === h && (h = !0);
        var u = 0,
          c = 0,
          l = e,
          p = o,
          f = ((a = void 0 !== a ? a : 1), (s = void 0 !== s ? s : 0), 0),
          d = 0,
          g = 0,
          v = 0,
          y = [];
        function m(t, e) {
          (y = []), (f = 0), (d = 0), (v = c);
          for (var n = 0; n < t.length; n++) _(t[n], e);
          return Math.abs(f / d - a);
        }
        function _(t, e) {
          for (var r = void 0, o = 0; o < y.length; o++)
            if (
              y[o].space_left >= t.height &&
              y[o].x + y[o].width + t.width + n - e <= i
            ) {
              r = y[o];
              break;
            }
          y.push(t),
            void 0 !== r
              ? ((t.x = r.x + r.width + n),
                (t.y = r.bottom),
                (t.space_left = t.height),
                (t.bottom = t.y),
                (r.space_left -= t.height + n),
                (r.bottom += t.height + n))
              : ((t.y = v),
                (v += t.height + n),
                (t.x = u),
                (t.bottom = t.y),
                (t.space_left = t.height)),
            t.y + t.height - d > -1e-4 && (d = t.y + t.height - c),
            t.x + t.width - f > -1e-4 && (f = t.x + t.width - u);
        }
        0 != t.length &&
          ((function (t) {
            t.forEach(function (t) {
              var e, n, r, i, o;
              (e = t),
                (n = Number.MAX_VALUE),
                (r = Number.MAX_VALUE),
                (i = 0),
                (o = 0),
                e.array.forEach(function (t) {
                  var e = void 0 !== t.width ? t.width : s,
                    a = void 0 !== t.height ? t.height : s;
                  (e /= 2),
                    (a /= 2),
                    (i = Math.max(t.x + e, i)),
                    (n = Math.min(t.x - e, n)),
                    (o = Math.max(t.y + a, o)),
                    (r = Math.min(t.y - a, r));
                }),
                (e.width = i - n),
                (e.height = o - r);
            });
          })(t),
          (function (t, e) {
            var o = Number.POSITIVE_INFINITY,
              s = 0;
            t.sort(function (t, e) {
              return e.height - t.height;
            });
            for (
              var a =
                  (v =
                  g =
                    t.reduce(function (t, e) {
                      return t.width < e.width ? t.width : e.width;
                    })),
                h = (y = (function (t) {
                  var e = 0;
                  return (
                    t.forEach(function (t) {
                      return (e += t.width + n);
                    }),
                    e
                  );
                })(t)),
                u = 0,
                c = Number.MAX_VALUE,
                l = Number.MAX_VALUE,
                p = -1,
                f = Number.MAX_VALUE,
                d = Number.MAX_VALUE;
              f > g || d > i;

            ) {
              if (1 != p) {
                var v = h - (h - a) / r;
                c = m(t, v);
              }
              if (0 != p) {
                var y = a + (h - a) / r;
                l = m(t, y);
              }
              if (
                ((f = Math.abs(v - y)),
                (d = Math.abs(c - l)),
                c < o && ((o = c), (s = v)),
                l < o && ((o = l), (s = y)),
                c > l
                  ? ((a = v), (v = y), (c = l), (p = 1))
                  : ((h = y), (y = v), (l = c), (p = 0)),
                u++ > 100)
              )
                break;
            }
            m(t, s);
          })(t),
          h &&
            (function (t) {
              t.forEach(function (t) {
                var e = { x: 0, y: 0 };
                t.array.forEach(function (t) {
                  (e.x += t.x), (e.y += t.y);
                }),
                  (e.x /= t.array.length),
                  (e.y /= t.array.length);
                var n = e.x - t.width / 2,
                  r = e.y - t.height / 2,
                  i = t.x - n + l / 2 - f / 2,
                  o = t.y - r + p / 2 - d / 2;
                t.array.forEach(function (t) {
                  (t.x += i), (t.y += o);
                });
              });
            })(t));
      }),
        (e.separateGraphs = function (t, e) {
          for (var n = {}, r = {}, i = [], o = 0, s = 0; s < e.length; s++) {
            var a = e[s],
              h = a.source,
              u = a.target;
            r[h.index] ? r[h.index].push(u) : (r[h.index] = [u]),
              r[u.index] ? r[u.index].push(h) : (r[u.index] = [h]);
          }
          for (s = 0; s < t.length; s++) {
            var c = t[s];
            n[c.index] || l(c, !0);
          }
          function l(t, e) {
            if (void 0 === n[t.index]) {
              e && (o++, i.push({ array: [] })),
                (n[t.index] = o),
                i[o - 1].array.push(t);
              var s = r[t.index];
              if (s) for (var a = 0; a < s.length; a++) l(s[a], !1);
            }
          }
          return i;
        });
    },
    128: (t, e, n) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var r,
        i = n(965),
        o = n(581),
        s = n(210),
        a = n(893),
        h = n(542),
        u = n(810),
        c = n(795);
      function l(t) {
        return void 0 !== t.leaves || void 0 !== t.groups;
      }
      !(function (t) {
        (t[(t.start = 0)] = "start"),
          (t[(t.tick = 1)] = "tick"),
          (t[(t.end = 2)] = "end");
      })((r = e.EventType || (e.EventType = {})));
      var p = (function () {
        function t() {
          var e = this;
          (this._canvasSize = [1, 1]),
            (this._linkDistance = 20),
            (this._defaultNodeSize = 10),
            (this._linkLengthCalculator = null),
            (this._linkType = null),
            (this._avoidOverlaps = !1),
            (this._handleDisconnected = !0),
            (this._running = !1),
            (this._nodes = []),
            (this._groups = []),
            (this._rootGroup = null),
            (this._links = []),
            (this._constraints = []),
            (this._distanceMatrix = null),
            (this._descent = null),
            (this._directedLinkConstraints = null),
            (this._threshold = 0.01),
            (this._visibilityGraph = null),
            (this._groupCompactness = 1e-6),
            (this.event = null),
            (this.linkAccessor = {
              getSourceIndex: t.getSourceIndex,
              getTargetIndex: t.getTargetIndex,
              setLength: t.setLinkLength,
              getType: function (t) {
                return "function" == typeof e._linkType ? e._linkType(t) : 0;
              },
            });
        }
        return (
          (t.prototype.on = function (t, e) {
            return (
              this.event || (this.event = {}),
              "string" == typeof t
                ? (this.event[r[t]] = e)
                : (this.event[t] = e),
              this
            );
          }),
          (t.prototype.trigger = function (t) {
            this.event &&
              void 0 !== this.event[t.type] &&
              this.event[t.type](t);
          }),
          (t.prototype.kick = function () {
            for (; !this.tick(); );
          }),
          (t.prototype.tick = function () {
            if (this._alpha < this._threshold)
              return (
                (this._running = !1),
                this.trigger({
                  type: r.end,
                  alpha: (this._alpha = 0),
                  stress: this._lastStress,
                }),
                !0
              );
            var t,
              e,
              n = this._nodes.length;
            for (
              this._links.length, this._descent.locks.clear(), e = 0;
              e < n;
              ++e
            )
              if ((t = this._nodes[e]).fixed) {
                (void 0 !== t.px && void 0 !== t.py) ||
                  ((t.px = t.x), (t.py = t.y));
                var i = [t.px, t.py];
                this._descent.locks.add(e, i);
              }
            var o = this._descent.rungeKutta();
            return (
              0 === o
                ? (this._alpha = 0)
                : void 0 !== this._lastStress && (this._alpha = o),
              (this._lastStress = o),
              this.updateNodePositions(),
              this.trigger({
                type: r.tick,
                alpha: this._alpha,
                stress: this._lastStress,
              }),
              !1
            );
          }),
          (t.prototype.updateNodePositions = function () {
            for (
              var t,
                e = this._descent.x[0],
                n = this._descent.x[1],
                r = this._nodes.length;
              r--;

            )
              ((t = this._nodes[r]).x = e[r]), (t.y = n[r]);
          }),
          (t.prototype.nodes = function (t) {
            if (!t) {
              if (0 === this._nodes.length && this._links.length > 0) {
                var e = 0;
                this._links.forEach(function (t) {
                  e = Math.max(e, t.source, t.target);
                }),
                  (this._nodes = new Array(++e));
                for (var n = 0; n < e; ++n) this._nodes[n] = {};
              }
              return this._nodes;
            }
            return (this._nodes = t), this;
          }),
          (t.prototype.groups = function (t) {
            var e = this;
            return t
              ? ((this._groups = t),
                (this._rootGroup = {}),
                this._groups.forEach(function (t) {
                  void 0 === t.padding && (t.padding = 1),
                    void 0 !== t.leaves &&
                      t.leaves.forEach(function (n, r) {
                        "number" == typeof n &&
                          ((t.leaves[r] = e._nodes[n]).parent = t);
                      }),
                    void 0 !== t.groups &&
                      t.groups.forEach(function (n, r) {
                        "number" == typeof n &&
                          ((t.groups[r] = e._groups[n]).parent = t);
                      });
                }),
                (this._rootGroup.leaves = this._nodes.filter(function (t) {
                  return void 0 === t.parent;
                })),
                (this._rootGroup.groups = this._groups.filter(function (t) {
                  return void 0 === t.parent;
                })),
                this)
              : this._groups;
          }),
          (t.prototype.powerGraphGroups = function (t) {
            var e = i.getGroups(
              this._nodes,
              this._links,
              this.linkAccessor,
              this._rootGroup
            );
            return this.groups(e.groups), t(e), this;
          }),
          (t.prototype.avoidOverlaps = function (t) {
            return arguments.length
              ? ((this._avoidOverlaps = t), this)
              : this._avoidOverlaps;
          }),
          (t.prototype.handleDisconnected = function (t) {
            return arguments.length
              ? ((this._handleDisconnected = t), this)
              : this._handleDisconnected;
          }),
          (t.prototype.flowLayout = function (t, e) {
            return (
              arguments.length || (t = "y"),
              (this._directedLinkConstraints = {
                axis: t,
                getMinSeparation:
                  "number" == typeof e
                    ? function () {
                        return e;
                      }
                    : e,
              }),
              this
            );
          }),
          (t.prototype.links = function (t) {
            return arguments.length ? ((this._links = t), this) : this._links;
          }),
          (t.prototype.constraints = function (t) {
            return arguments.length
              ? ((this._constraints = t), this)
              : this._constraints;
          }),
          (t.prototype.distanceMatrix = function (t) {
            return arguments.length
              ? ((this._distanceMatrix = t), this)
              : this._distanceMatrix;
          }),
          (t.prototype.size = function (t) {
            return t ? ((this._canvasSize = t), this) : this._canvasSize;
          }),
          (t.prototype.defaultNodeSize = function (t) {
            return t
              ? ((this._defaultNodeSize = t), this)
              : this._defaultNodeSize;
          }),
          (t.prototype.groupCompactness = function (t) {
            return t
              ? ((this._groupCompactness = t), this)
              : this._groupCompactness;
          }),
          (t.prototype.linkDistance = function (t) {
            return t
              ? ((this._linkDistance = "function" == typeof t ? t : +t),
                (this._linkLengthCalculator = null),
                this)
              : this._linkDistance;
          }),
          (t.prototype.linkType = function (t) {
            return (this._linkType = t), this;
          }),
          (t.prototype.convergenceThreshold = function (t) {
            return t
              ? ((this._threshold = "function" == typeof t ? t : +t), this)
              : this._threshold;
          }),
          (t.prototype.alpha = function (t) {
            return arguments.length
              ? ((t = +t),
                this._alpha
                  ? (this._alpha = t > 0 ? t : 0)
                  : t > 0 &&
                    (this._running ||
                      ((this._running = !0),
                      this.trigger({ type: r.start, alpha: (this._alpha = t) }),
                      this.kick())),
                this)
              : this._alpha;
          }),
          (t.prototype.getLinkLength = function (t) {
            return "function" == typeof this._linkDistance
              ? +this._linkDistance(t)
              : this._linkDistance;
          }),
          (t.setLinkLength = function (t, e) {
            t.length = e;
          }),
          (t.prototype.getLinkType = function (t) {
            return "function" == typeof this._linkType ? this._linkType(t) : 0;
          }),
          (t.prototype.symmetricDiffLinkLengths = function (t, e) {
            var n = this;
            return (
              void 0 === e && (e = 1),
              this.linkDistance(function (e) {
                return t * e.length;
              }),
              (this._linkLengthCalculator = function () {
                return o.symmetricDiffLinkLengths(n._links, n.linkAccessor, e);
              }),
              this
            );
          }),
          (t.prototype.jaccardLinkLengths = function (t, e) {
            var n = this;
            return (
              void 0 === e && (e = 1),
              this.linkDistance(function (e) {
                return t * e.length;
              }),
              (this._linkLengthCalculator = function () {
                return o.jaccardLinkLengths(n._links, n.linkAccessor, e);
              }),
              this
            );
          }),
          (t.prototype.start = function (e, n, r, i, u, c) {
            var l = this;
            void 0 === e && (e = 0),
              void 0 === n && (n = 0),
              void 0 === r && (r = 0),
              void 0 === i && (i = 0),
              void 0 === u && (u = !0),
              void 0 === c && (c = !0);
            var p,
              f = this.nodes().length,
              d = f + 2 * this._groups.length,
              g = (this._links.length, this._canvasSize[0]),
              v = this._canvasSize[1],
              y = new Array(d),
              m = new Array(d),
              _ = null,
              E = this._avoidOverlaps;
            this._nodes.forEach(function (t, e) {
              (t.index = e),
                void 0 === t.x && ((t.x = g / 2), (t.y = v / 2)),
                (y[e] = t.x),
                (m[e] = t.y);
            }),
              this._linkLengthCalculator && this._linkLengthCalculator(),
              this._distanceMatrix
                ? (p = this._distanceMatrix)
                : ((p = new h.Calculator(
                    d,
                    this._links,
                    t.getSourceIndex,
                    t.getTargetIndex,
                    function (t) {
                      return l.getLinkLength(t);
                    }
                  ).DistanceMatrix()),
                  (_ = s.Descent.createSquareMatrix(d, function () {
                    return 2;
                  })),
                  this._links.forEach(function (t) {
                    "number" == typeof t.source &&
                      (t.source = l._nodes[t.source]),
                      "number" == typeof t.target &&
                        (t.target = l._nodes[t.target]);
                  }),
                  this._links.forEach(function (e) {
                    var n = t.getSourceIndex(e),
                      r = t.getTargetIndex(e);
                    _[n][r] = _[r][n] = e.weight || 1;
                  }));
            var b = s.Descent.createSquareMatrix(d, function (t, e) {
              return p[t][e];
            });
            if (this._rootGroup && void 0 !== this._rootGroup.groups) {
              var w = f;
              this._groups.forEach(function (t) {
                !(function (t, e, n, r) {
                  (_[t][e] = _[e][t] = n), (b[t][e] = b[e][t] = 0.1);
                })(w, w + 1, l._groupCompactness),
                  (y[w] = 0),
                  (m[w++] = 0),
                  (y[w] = 0),
                  (m[w++] = 0);
              });
            } else this._rootGroup = { leaves: this._nodes, groups: [] };
            var N = this._constraints || [];
            for (
              this._directedLinkConstraints &&
                ((this.linkAccessor.getMinSeparation =
                  this._directedLinkConstraints.getMinSeparation),
                (N = N.concat(
                  o.generateDirectedEdgeConstraints(
                    f,
                    this._links,
                    this._directedLinkConstraints.axis,
                    this.linkAccessor
                  )
                ))),
                this.avoidOverlaps(!1),
                this._descent = new s.Descent([y, m], b),
                this._descent.locks.clear(),
                w = 0;
              w < f;
              ++w
            ) {
              var x = this._nodes[w];
              if (x.fixed) {
                (x.px = x.x), (x.py = x.y);
                var A = [x.x, x.y];
                this._descent.locks.add(w, A);
              }
            }
            if (
              ((this._descent.threshold = this._threshold),
              this.initialLayout(e, y, m),
              N.length > 0 &&
                (this._descent.project = new a.Projection(
                  this._nodes,
                  this._groups,
                  this._rootGroup,
                  N
                ).projectFunctions()),
              this._descent.run(n),
              this.separateOverlappingComponents(g, v, c),
              this.avoidOverlaps(E),
              E &&
                (this._nodes.forEach(function (t, e) {
                  (t.x = y[e]), (t.y = m[e]);
                }),
                (this._descent.project = new a.Projection(
                  this._nodes,
                  this._groups,
                  this._rootGroup,
                  N,
                  !0
                ).projectFunctions()),
                this._nodes.forEach(function (t, e) {
                  (y[e] = t.x), (m[e] = t.y);
                })),
              (this._descent.G = _),
              this._descent.run(r),
              i)
            ) {
              (this._descent.snapStrength = 1e3),
                (this._descent.snapGridSize = this._nodes[0].width),
                (this._descent.numGridSnapNodes = f),
                (this._descent.scaleSnapByMaxH = f != d);
              var T = s.Descent.createSquareMatrix(d, function (t, e) {
                return t >= f || e >= f ? _[t][e] : 0;
              });
              (this._descent.G = T), this._descent.run(i);
            }
            return (
              this.updateNodePositions(),
              this.separateOverlappingComponents(g, v, c),
              u ? this.resume() : this
            );
          }),
          (t.prototype.initialLayout = function (e, n, r) {
            if (this._groups.length > 0 && e > 0) {
              var i = this._nodes.length,
                o = this._links.map(function (t) {
                  return { source: t.source.index, target: t.target.index };
                }),
                s = this._nodes.map(function (t) {
                  return { index: t.index };
                });
              this._groups.forEach(function (t, e) {
                s.push({ index: (t.index = i + e) });
              }),
                this._groups.forEach(function (t, e) {
                  void 0 !== t.leaves &&
                    t.leaves.forEach(function (e) {
                      return o.push({ source: t.index, target: e.index });
                    }),
                    void 0 !== t.groups &&
                      t.groups.forEach(function (e) {
                        return o.push({ source: t.index, target: e.index });
                      });
                }),
                new t()
                  .size(this.size())
                  .nodes(s)
                  .links(o)
                  .avoidOverlaps(!1)
                  .linkDistance(this.linkDistance())
                  .symmetricDiffLinkLengths(5)
                  .convergenceThreshold(1e-4)
                  .start(e, 0, 0, 0, !1),
                this._nodes.forEach(function (t) {
                  (n[t.index] = s[t.index].x), (r[t.index] = s[t.index].y);
                });
            } else this._descent.run(e);
          }),
          (t.prototype.separateOverlappingComponents = function (t, e, n) {
            var r = this;
            if (
              (void 0 === n && (n = !0),
              !this._distanceMatrix && this._handleDisconnected)
            ) {
              var i = this._descent.x[0],
                o = this._descent.x[1];
              this._nodes.forEach(function (t, e) {
                (t.x = i[e]), (t.y = o[e]);
              });
              var s = c.separateGraphs(this._nodes, this._links);
              c.applyPacking(s, t, e, this._defaultNodeSize, 1, n),
                this._nodes.forEach(function (t, e) {
                  (r._descent.x[0][e] = t.x),
                    (r._descent.x[1][e] = t.y),
                    t.bounds &&
                      (t.bounds.setXCentre(t.x), t.bounds.setYCentre(t.y));
                });
            }
          }),
          (t.prototype.resume = function () {
            return this.alpha(0.1);
          }),
          (t.prototype.stop = function () {
            return this.alpha(0);
          }),
          (t.prototype.prepareEdgeRouting = function (t) {
            void 0 === t && (t = 0),
              (this._visibilityGraph = new u.TangentVisibilityGraph(
                this._nodes.map(function (e) {
                  return e.bounds.inflate(-t).vertices();
                })
              ));
          }),
          (t.prototype.routeEdge = function (t, e, n) {
            void 0 === e && (e = 5);
            var r = [],
              i = new u.TangentVisibilityGraph(this._visibilityGraph.P, {
                V: this._visibilityGraph.V,
                E: this._visibilityGraph.E,
              }),
              o = { x: t.source.x, y: t.source.y },
              s = { x: t.target.x, y: t.target.y },
              c = i.addPoint(o, t.source.index),
              l = i.addPoint(s, t.target.index);
            i.addEdgeIfVisible(o, s, t.source.index, t.target.index),
              void 0 !== n && n(i);
            var p = new h.Calculator(
              i.V.length,
              i.E,
              function (t) {
                return t.source.id;
              },
              function (t) {
                return t.target.id;
              },
              function (t) {
                return t.length();
              }
            ).PathFromNodeToNode(c.id, l.id);
            if (1 === p.length || p.length === i.V.length) {
              var f = a.makeEdgeBetween(
                t.source.innerBounds,
                t.target.innerBounds,
                e
              );
              r = [f.sourceIntersection, f.arrowStart];
            } else {
              for (
                var d = p.length - 2,
                  g = i.V[p[d]].p,
                  v = i.V[p[0]].p,
                  y =
                    ((r = [t.source.innerBounds.rayIntersection(g.x, g.y)]), d);
                y >= 0;
                --y
              )
                r.push(i.V[p[y]].p);
              r.push(a.makeEdgeTo(v, t.target.innerBounds, e));
            }
            return r;
          }),
          (t.getSourceIndex = function (t) {
            return "number" == typeof t.source ? t.source : t.source.index;
          }),
          (t.getTargetIndex = function (t) {
            return "number" == typeof t.target ? t.target : t.target.index;
          }),
          (t.linkId = function (e) {
            return t.getSourceIndex(e) + "-" + t.getTargetIndex(e);
          }),
          (t.dragStart = function (e) {
            l(e)
              ? t.storeOffset(e, t.dragOrigin(e))
              : (t.stopNode(e), (e.fixed |= 2));
          }),
          (t.stopNode = function (t) {
            (t.px = t.x), (t.py = t.y);
          }),
          (t.storeOffset = function (e, n) {
            void 0 !== e.leaves &&
              e.leaves.forEach(function (e) {
                (e.fixed |= 2),
                  t.stopNode(e),
                  (e._dragGroupOffsetX = e.x - n.x),
                  (e._dragGroupOffsetY = e.y - n.y);
              }),
              void 0 !== e.groups &&
                e.groups.forEach(function (e) {
                  return t.storeOffset(e, n);
                });
          }),
          (t.dragOrigin = function (t) {
            return l(t) ? { x: t.bounds.cx(), y: t.bounds.cy() } : t;
          }),
          (t.drag = function (e, n) {
            l(e)
              ? (void 0 !== e.leaves &&
                  e.leaves.forEach(function (t) {
                    e.bounds.setXCentre(n.x),
                      e.bounds.setYCentre(n.y),
                      (t.px = t._dragGroupOffsetX + n.x),
                      (t.py = t._dragGroupOffsetY + n.y);
                  }),
                void 0 !== e.groups &&
                  e.groups.forEach(function (e) {
                    return t.drag(e, n);
                  }))
              : ((e.px = n.x), (e.py = n.y));
          }),
          (t.dragEnd = function (e) {
            l(e)
              ? (void 0 !== e.leaves &&
                  e.leaves.forEach(function (e) {
                    t.dragEnd(e),
                      delete e._dragGroupOffsetX,
                      delete e._dragGroupOffsetY;
                  }),
                void 0 !== e.groups && e.groups.forEach(t.dragEnd))
              : (e.fixed &= -7);
          }),
          (t.mouseOver = function (t) {
            (t.fixed |= 4), (t.px = t.x), (t.py = t.y);
          }),
          (t.mouseOut = function (t) {
            t.fixed &= -5;
          }),
          t
        );
      })();
      e.Layout = p;
    },
    755: (t, e, n) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var r = n(542),
        i = n(210),
        o = n(893),
        s = n(581),
        a = (function () {
          function t(t, e) {
            (this.source = t), (this.target = e);
          }
          return (
            (t.prototype.actualLength = function (t) {
              var e = this;
              return Math.sqrt(
                t.reduce(function (t, n) {
                  var r = n[e.target] - n[e.source];
                  return t + r * r;
                }, 0)
              );
            }),
            t
          );
        })();
      e.Link3D = a;
      e.Node3D = function (t, e, n) {
        void 0 === t && (t = 0),
          void 0 === e && (e = 0),
          void 0 === n && (n = 0),
          (this.x = t),
          (this.y = e),
          (this.z = n);
      };
      var h = (function () {
        function t(e, n, r) {
          var i = this;
          void 0 === r && (r = 1),
            (this.nodes = e),
            (this.links = n),
            (this.idealLinkLength = r),
            (this.constraints = null),
            (this.useJaccardLinkLengths = !0),
            (this.result = new Array(t.k));
          for (var o = 0; o < t.k; ++o) this.result[o] = new Array(e.length);
          e.forEach(function (e, n) {
            for (var r = 0, o = t.dims; r < o.length; r++) {
              var s = o[r];
              void 0 === e[s] && (e[s] = Math.random());
            }
            (i.result[0][n] = e.x),
              (i.result[1][n] = e.y),
              (i.result[2][n] = e.z);
          });
        }
        return (
          (t.prototype.linkLength = function (t) {
            return t.actualLength(this.result);
          }),
          (t.prototype.start = function (t) {
            var e = this;
            void 0 === t && (t = 100);
            var n = this.nodes.length,
              a = new u();
            this.useJaccardLinkLengths &&
              s.jaccardLinkLengths(this.links, a, 1.5),
              this.links.forEach(function (t) {
                return (t.length *= e.idealLinkLength);
              });
            var h = new r.Calculator(
                n,
                this.links,
                function (t) {
                  return t.source;
                },
                function (t) {
                  return t.target;
                },
                function (t) {
                  return t.length;
                }
              ).DistanceMatrix(),
              c = i.Descent.createSquareMatrix(n, function (t, e) {
                return h[t][e];
              }),
              l = i.Descent.createSquareMatrix(n, function () {
                return 2;
              });
            this.links.forEach(function (t) {
              var e = t.source,
                n = t.target;
              return (l[e][n] = l[n][e] = 1);
            }),
              (this.descent = new i.Descent(this.result, c)),
              (this.descent.threshold = 0.001),
              (this.descent.G = l),
              this.constraints &&
                (this.descent.project = new o.Projection(
                  this.nodes,
                  null,
                  null,
                  this.constraints
                ).projectFunctions());
            for (var p = 0; p < this.nodes.length; p++) {
              var f = this.nodes[p];
              f.fixed && this.descent.locks.add(p, [f.x, f.y, f.z]);
            }
            return this.descent.run(t), this;
          }),
          (t.prototype.tick = function () {
            this.descent.locks.clear();
            for (var t = 0; t < this.nodes.length; t++) {
              var e = this.nodes[t];
              e.fixed && this.descent.locks.add(t, [e.x, e.y, e.z]);
            }
            return this.descent.rungeKutta();
          }),
          (t.dims = ["x", "y", "z"]),
          (t.k = t.dims.length),
          t
        );
      })();
      e.Layout3D = h;
      var u = (function () {
        function t() {}
        return (
          (t.prototype.getSourceIndex = function (t) {
            return t.source;
          }),
          (t.prototype.getTargetIndex = function (t) {
            return t.target;
          }),
          (t.prototype.getLength = function (t) {
            return t.length;
          }),
          (t.prototype.setLength = function (t, e) {
            t.length = e;
          }),
          t
        );
      })();
    },
    581: (t, e) => {
      "use strict";
      function n(t, e) {
        var n = {};
        for (var r in t) n[r] = {};
        for (var r in e) n[r] = {};
        return Object.keys(n).length;
      }
      function r(t, e) {
        var n = 0;
        for (var r in t) void 0 !== e[r] && ++n;
        return n;
      }
      function i(t, e, n, r) {
        var i = (function (t, e) {
          var n = {},
            r = function (t, e) {
              void 0 === n[t] && (n[t] = {}), (n[t][e] = {});
            };
          return (
            t.forEach(function (t) {
              var n = e.getSourceIndex(t),
                i = e.getTargetIndex(t);
              r(n, i), r(i, n);
            }),
            n
          );
        })(t, r);
        t.forEach(function (t) {
          var o = i[r.getSourceIndex(t)],
            s = i[r.getTargetIndex(t)];
          r.setLength(t, 1 + e * n(o, s));
        });
      }
      function o(t, e, n) {
        var r = [],
          i = 0,
          o = [],
          s = [];
        function a(t) {
          (t.index = t.lowlink = i++), o.push(t), (t.onStack = !0);
          for (var e = 0, n = t.out; e < n.length; e++) {
            var r = n[e];
            void 0 === r.index
              ? (a(r), (t.lowlink = Math.min(t.lowlink, r.lowlink)))
              : r.onStack && (t.lowlink = Math.min(t.lowlink, r.index));
          }
          if (t.lowlink === t.index) {
            for (
              var h = [];
              o.length && (((r = o.pop()).onStack = !1), h.push(r), r !== t);

            );
            s.push(
              h.map(function (t) {
                return t.id;
              })
            );
          }
        }
        for (var h = 0; h < t; h++) r.push({ id: h, out: [] });
        for (var u = 0, c = e; u < c.length; u++) {
          var l = c[u],
            p = r[n.getSourceIndex(l)],
            f = r[n.getTargetIndex(l)];
          p.out.push(f);
        }
        for (var d = 0, g = r; d < g.length; d++) {
          var v = g[d];
          void 0 === v.index && a(v);
        }
        return s;
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.symmetricDiffLinkLengths = function (t, e, o) {
          void 0 === o && (o = 1),
            i(
              t,
              o,
              function (t, e) {
                return Math.sqrt(n(t, e) - r(t, e));
              },
              e
            );
        }),
        (e.jaccardLinkLengths = function (t, e, o) {
          void 0 === o && (o = 1),
            i(
              t,
              o,
              function (t, e) {
                return Math.min(Object.keys(t).length, Object.keys(e).length) <
                  1.1
                  ? 0
                  : r(t, e) / n(t, e);
              },
              e
            );
        }),
        (e.generateDirectedEdgeConstraints = function (t, e, n, r) {
          var i = o(t, e, r),
            s = {};
          i.forEach(function (t, e) {
            return t.forEach(function (t) {
              return (s[t] = e);
            });
          });
          var a = [];
          return (
            e.forEach(function (t) {
              var e = r.getSourceIndex(t),
                i = r.getTargetIndex(t);
              s[e] !== s[i] &&
                a.push({
                  axis: n,
                  left: e,
                  right: i,
                  gap: r.getMinSeparation(t),
                });
            }),
            a
          );
        }),
        (e.stronglyConnectedComponents = o);
    },
    965: (t, e) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = function (t, e, n) {
        (this.source = t), (this.target = e), (this.type = n);
      };
      e.PowerEdge = n;
      var r = (function () {
        function t(t, e, n, r) {
          var i = this;
          if (
            ((this.linkAccessor = n),
            (this.modules = new Array(t)),
            (this.roots = []),
            r)
          )
            this.initModulesFromGroup(r);
          else {
            this.roots.push(new s());
            for (var a = 0; a < t; ++a)
              this.roots[0].add((this.modules[a] = new o(a)));
          }
          (this.R = e.length),
            e.forEach(function (t) {
              var e = i.modules[n.getSourceIndex(t)],
                r = i.modules[n.getTargetIndex(t)],
                o = n.getType(t);
              e.outgoing.add(o, r), r.incoming.add(o, e);
            });
        }
        return (
          (t.prototype.initModulesFromGroup = function (t) {
            var e = new s();
            this.roots.push(e);
            for (var n = 0; n < t.leaves.length; ++n) {
              var r = t.leaves[n],
                i = new o(r.id);
              (this.modules[r.id] = i), e.add(i);
            }
            if (t.groups)
              for (var h = 0; h < t.groups.length; ++h) {
                var u = t.groups[h],
                  c = {};
                for (var l in u)
                  "leaves" !== l &&
                    "groups" !== l &&
                    u.hasOwnProperty(l) &&
                    (c[l] = u[l]);
                e.add(
                  new o(
                    -1 - h,
                    new a(),
                    new a(),
                    this.initModulesFromGroup(u),
                    c
                  )
                );
              }
            return e;
          }),
          (t.prototype.merge = function (t, e, n) {
            void 0 === n && (n = 0);
            var r = t.incoming.intersection(e.incoming),
              i = t.outgoing.intersection(e.outgoing),
              a = new s();
            a.add(t), a.add(e);
            var h = new o(this.modules.length, i, r, a);
            this.modules.push(h);
            var u = function (n, r, i) {
              n.forAll(function (n, o) {
                n.forAll(function (n) {
                  var s = n[r];
                  s.add(o, h),
                    s.remove(o, t),
                    s.remove(o, e),
                    t[i].remove(o, n),
                    e[i].remove(o, n);
                });
              });
            };
            return (
              u(i, "incoming", "outgoing"),
              u(r, "outgoing", "incoming"),
              (this.R -= r.count() + i.count()),
              this.roots[n].remove(t),
              this.roots[n].remove(e),
              this.roots[n].add(h),
              h
            );
          }),
          (t.prototype.rootMerges = function (t) {
            void 0 === t && (t = 0);
            for (
              var e = this.roots[t].modules(),
                n = e.length,
                r = new Array(n * (n - 1)),
                i = 0,
                o = 0,
                s = n - 1;
              o < s;
              ++o
            )
              for (var a = o + 1; a < n; ++a) {
                var h = e[o],
                  u = e[a];
                (r[i] = { id: i, nEdges: this.nEdges(h, u), a: h, b: u }), i++;
              }
            return r;
          }),
          (t.prototype.greedyMerge = function () {
            for (var t = 0; t < this.roots.length; ++t)
              if (!(this.roots[t].modules().length < 2)) {
                var e = this.rootMerges(t).sort(function (t, e) {
                  return t.nEdges == e.nEdges
                    ? t.id - e.id
                    : t.nEdges - e.nEdges;
                })[0];
                if (!(e.nEdges >= this.R)) return this.merge(e.a, e.b, t), !0;
              }
          }),
          (t.prototype.nEdges = function (t, e) {
            var n = t.incoming.intersection(e.incoming),
              r = t.outgoing.intersection(e.outgoing);
            return this.R - n.count() - r.count();
          }),
          (t.prototype.getGroupHierarchy = function (t) {
            var e = this,
              r = [];
            return (
              i(this.roots[0], {}, r),
              this.allEdges().forEach(function (i) {
                var o = e.modules[i.source],
                  s = e.modules[i.target];
                t.push(
                  new n(
                    void 0 === o.gid ? i.source : r[o.gid],
                    void 0 === s.gid ? i.target : r[s.gid],
                    i.type
                  )
                );
              }),
              r
            );
          }),
          (t.prototype.allEdges = function () {
            var e = [];
            return t.getEdges(this.roots[0], e), e;
          }),
          (t.getEdges = function (e, n) {
            e.forAll(function (e) {
              e.getEdges(n), t.getEdges(e.children, n);
            });
          }),
          t
        );
      })();
      function i(t, e, n) {
        t.forAll(function (t) {
          if (t.isLeaf()) e.leaves || (e.leaves = []), e.leaves.push(t.id);
          else {
            var r = e;
            if (((t.gid = n.length), !t.isIsland() || t.isPredefined())) {
              if (((r = { id: t.gid }), t.isPredefined()))
                for (var o in t.definition) r[o] = t.definition[o];
              e.groups || (e.groups = []), e.groups.push(t.gid), n.push(r);
            }
            i(t.children, r, n);
          }
        });
      }
      e.Configuration = r;
      var o = (function () {
        function t(t, e, n, r, i) {
          void 0 === e && (e = new a()),
            void 0 === n && (n = new a()),
            void 0 === r && (r = new s()),
            (this.id = t),
            (this.outgoing = e),
            (this.incoming = n),
            (this.children = r),
            (this.definition = i);
        }
        return (
          (t.prototype.getEdges = function (t) {
            var e = this;
            this.outgoing.forAll(function (r, i) {
              r.forAll(function (r) {
                t.push(new n(e.id, r.id, i));
              });
            });
          }),
          (t.prototype.isLeaf = function () {
            return 0 === this.children.count();
          }),
          (t.prototype.isIsland = function () {
            return 0 === this.outgoing.count() && 0 === this.incoming.count();
          }),
          (t.prototype.isPredefined = function () {
            return void 0 !== this.definition;
          }),
          t
        );
      })();
      e.Module = o;
      var s = (function () {
        function t() {
          this.table = {};
        }
        return (
          (t.prototype.count = function () {
            return Object.keys(this.table).length;
          }),
          (t.prototype.intersection = function (e) {
            var n = new t();
            return (
              (n.table = (function (t, e) {
                var n = {};
                for (var r in t) r in e && (n[r] = t[r]);
                return n;
              })(this.table, e.table)),
              n
            );
          }),
          (t.prototype.intersectionCount = function (t) {
            return this.intersection(t).count();
          }),
          (t.prototype.contains = function (t) {
            return t in this.table;
          }),
          (t.prototype.add = function (t) {
            this.table[t.id] = t;
          }),
          (t.prototype.remove = function (t) {
            delete this.table[t.id];
          }),
          (t.prototype.forAll = function (t) {
            for (var e in this.table) t(this.table[e]);
          }),
          (t.prototype.modules = function () {
            var t = [];
            return (
              this.forAll(function (e) {
                e.isPredefined() || t.push(e);
              }),
              t
            );
          }),
          t
        );
      })();
      e.ModuleSet = s;
      var a = (function () {
        function t() {
          (this.sets = {}), (this.n = 0);
        }
        return (
          (t.prototype.count = function () {
            return this.n;
          }),
          (t.prototype.contains = function (t) {
            var e = !1;
            return (
              this.forAllModules(function (n) {
                e || n.id != t || (e = !0);
              }),
              e
            );
          }),
          (t.prototype.add = function (t, e) {
            (t in this.sets ? this.sets[t] : (this.sets[t] = new s())).add(e),
              ++this.n;
          }),
          (t.prototype.remove = function (t, e) {
            var n = this.sets[t];
            n.remove(e), 0 === n.count() && delete this.sets[t], --this.n;
          }),
          (t.prototype.forAll = function (t) {
            for (var e in this.sets) t(this.sets[e], Number(e));
          }),
          (t.prototype.forAllModules = function (t) {
            this.forAll(function (e, n) {
              return e.forAll(t);
            });
          }),
          (t.prototype.intersection = function (e) {
            var n = new t();
            return (
              this.forAll(function (t, r) {
                if (r in e.sets) {
                  var i = t.intersection(e.sets[r]),
                    o = i.count();
                  o > 0 && ((n.sets[r] = i), (n.n += o));
                }
              }),
              n
            );
          }),
          t
        );
      })();
      (e.LinkSets = a),
        (e.getGroups = function (t, e, n, i) {
          for (var o = t.length, s = new r(o, e, n, i); s.greedyMerge(); );
          var a = [],
            h = s.getGroupHierarchy(a);
          return (
            a.forEach(function (e) {
              var n = function (n) {
                var r = e[n];
                "number" == typeof r && (e[n] = t[r]);
              };
              n("source"), n("target");
            }),
            { groups: h, powerEdges: a }
          );
        });
    },
    957: (t, e) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = (function () {
        function t(t) {
          (this.elem = t), (this.subheaps = []);
        }
        return (
          (t.prototype.toString = function (t) {
            for (var e = "", n = !1, r = 0; r < this.subheaps.length; ++r) {
              var i = this.subheaps[r];
              i.elem
                ? (n && (e += ","), (e += i.toString(t)), (n = !0))
                : (n = !1);
            }
            return (
              "" !== e && (e = "(" + e + ")"),
              (this.elem ? t(this.elem) : "") + e
            );
          }),
          (t.prototype.forEach = function (t) {
            this.empty() ||
              (t(this.elem, this),
              this.subheaps.forEach(function (e) {
                return e.forEach(t);
              }));
          }),
          (t.prototype.count = function () {
            return this.empty()
              ? 0
              : 1 +
                  this.subheaps.reduce(function (t, e) {
                    return t + e.count();
                  }, 0);
          }),
          (t.prototype.min = function () {
            return this.elem;
          }),
          (t.prototype.empty = function () {
            return null == this.elem;
          }),
          (t.prototype.contains = function (t) {
            if (this === t) return !0;
            for (var e = 0; e < this.subheaps.length; e++)
              if (this.subheaps[e].contains(t)) return !0;
            return !1;
          }),
          (t.prototype.isHeap = function (t) {
            var e = this;
            return this.subheaps.every(function (n) {
              return t(e.elem, n.elem) && n.isHeap(t);
            });
          }),
          (t.prototype.insert = function (e, n) {
            return this.merge(new t(e), n);
          }),
          (t.prototype.merge = function (t, e) {
            return this.empty()
              ? t
              : t.empty()
              ? this
              : e(this.elem, t.elem)
              ? (this.subheaps.push(t), this)
              : (t.subheaps.push(this), t);
          }),
          (t.prototype.removeMin = function (t) {
            return this.empty() ? null : this.mergePairs(t);
          }),
          (t.prototype.mergePairs = function (e) {
            if (0 == this.subheaps.length) return new t(null);
            if (1 == this.subheaps.length) return this.subheaps[0];
            var n = this.subheaps.pop().merge(this.subheaps.pop(), e),
              r = this.mergePairs(e);
            return n.merge(r, e);
          }),
          (t.prototype.decreaseKey = function (e, n, r, i) {
            var o = e.removeMin(i);
            (e.elem = o.elem),
              (e.subheaps = o.subheaps),
              null !== r && null !== o.elem && r(e.elem, e);
            var s = new t(n);
            return null !== r && r(n, s), this.merge(s, i);
          }),
          t
        );
      })();
      e.PairingHeap = n;
      var r = (function () {
        function t(t) {
          this.lessThan = t;
        }
        return (
          (t.prototype.top = function () {
            return this.empty() ? null : this.root.elem;
          }),
          (t.prototype.push = function () {
            for (var t, e = [], r = 0; r < arguments.length; r++)
              e[r] = arguments[r];
            for (var i, o = 0; (i = e[o]); ++o)
              (t = new n(i)),
                (this.root = this.empty()
                  ? t
                  : this.root.merge(t, this.lessThan));
            return t;
          }),
          (t.prototype.empty = function () {
            return !this.root || !this.root.elem;
          }),
          (t.prototype.isHeap = function () {
            return this.root.isHeap(this.lessThan);
          }),
          (t.prototype.forEach = function (t) {
            this.root.forEach(t);
          }),
          (t.prototype.pop = function () {
            if (this.empty()) return null;
            var t = this.root.min();
            return (this.root = this.root.removeMin(this.lessThan)), t;
          }),
          (t.prototype.reduceKey = function (t, e, n) {
            void 0 === n && (n = null),
              (this.root = this.root.decreaseKey(t, e, n, this.lessThan));
          }),
          (t.prototype.toString = function (t) {
            return this.root.toString(t);
          }),
          (t.prototype.count = function () {
            return this.root.count();
          }),
          t
        );
      })();
      e.PriorityQueue = r;
    },
    266: function (t, e) {
      "use strict";
      var n,
        r =
          (this && this.__extends) ||
          ((n = function (t, e) {
            return (
              (n =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                }),
              n(t, e)
            );
          }),
          function (t, e) {
            function r() {
              this.constructor = t;
            }
            n(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((r.prototype = e.prototype), new r()));
          });
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = (function () {
        function t() {
          this.findIter = function (t) {
            for (var e = this._root, n = this.iterator(); null !== e; ) {
              var r = this._comparator(t, e.data);
              if (0 === r) return (n._cursor = e), n;
              n._ancestors.push(e), (e = e.get_child(r > 0));
            }
            return null;
          };
        }
        return (
          (t.prototype.clear = function () {
            (this._root = null), (this.size = 0);
          }),
          (t.prototype.find = function (t) {
            for (var e = this._root; null !== e; ) {
              var n = this._comparator(t, e.data);
              if (0 === n) return e.data;
              e = e.get_child(n > 0);
            }
            return null;
          }),
          (t.prototype.lowerBound = function (t) {
            return this._bound(t, this._comparator);
          }),
          (t.prototype.upperBound = function (t) {
            var e = this._comparator;
            return this._bound(t, function (t, n) {
              return e(n, t);
            });
          }),
          (t.prototype.min = function () {
            var t = this._root;
            if (null === t) return null;
            for (; null !== t.left; ) t = t.left;
            return t.data;
          }),
          (t.prototype.max = function () {
            var t = this._root;
            if (null === t) return null;
            for (; null !== t.right; ) t = t.right;
            return t.data;
          }),
          (t.prototype.iterator = function () {
            return new o(this);
          }),
          (t.prototype.each = function (t) {
            for (var e, n = this.iterator(); null !== (e = n.next()); ) t(e);
          }),
          (t.prototype.reach = function (t) {
            for (var e, n = this.iterator(); null !== (e = n.prev()); ) t(e);
          }),
          (t.prototype._bound = function (t, e) {
            for (var n = this._root, r = this.iterator(); null !== n; ) {
              var i = this._comparator(t, n.data);
              if (0 === i) return (r._cursor = n), r;
              r._ancestors.push(n), (n = n.get_child(i > 0));
            }
            for (var o = r._ancestors.length - 1; o >= 0; --o)
              if (e(t, (n = r._ancestors[o]).data) > 0)
                return (r._cursor = n), (r._ancestors.length = o), r;
            return (r._ancestors.length = 0), r;
          }),
          t
        );
      })();
      e.TreeBase = i;
      var o = (function () {
        function t(t) {
          (this._tree = t), (this._ancestors = []), (this._cursor = null);
        }
        return (
          (t.prototype.data = function () {
            return null !== this._cursor ? this._cursor.data : null;
          }),
          (t.prototype.next = function () {
            if (null === this._cursor) {
              var t = this._tree._root;
              null !== t && this._minNode(t);
            } else {
              var e;
              if (null === this._cursor.right)
                do {
                  if (((e = this._cursor), !this._ancestors.length)) {
                    this._cursor = null;
                    break;
                  }
                  this._cursor = this._ancestors.pop();
                } while (this._cursor.right === e);
              else
                this._ancestors.push(this._cursor),
                  this._minNode(this._cursor.right);
            }
            return null !== this._cursor ? this._cursor.data : null;
          }),
          (t.prototype.prev = function () {
            if (null === this._cursor) {
              var t = this._tree._root;
              null !== t && this._maxNode(t);
            } else {
              var e;
              if (null === this._cursor.left)
                do {
                  if (((e = this._cursor), !this._ancestors.length)) {
                    this._cursor = null;
                    break;
                  }
                  this._cursor = this._ancestors.pop();
                } while (this._cursor.left === e);
              else
                this._ancestors.push(this._cursor),
                  this._maxNode(this._cursor.left);
            }
            return null !== this._cursor ? this._cursor.data : null;
          }),
          (t.prototype._minNode = function (t) {
            for (; null !== t.left; ) this._ancestors.push(t), (t = t.left);
            this._cursor = t;
          }),
          (t.prototype._maxNode = function (t) {
            for (; null !== t.right; ) this._ancestors.push(t), (t = t.right);
            this._cursor = t;
          }),
          t
        );
      })();
      e.Iterator = o;
      var s = (function () {
          function t(t) {
            (this.data = t),
              (this.left = null),
              (this.right = null),
              (this.red = !0);
          }
          return (
            (t.prototype.get_child = function (t) {
              return t ? this.right : this.left;
            }),
            (t.prototype.set_child = function (t, e) {
              t ? (this.right = e) : (this.left = e);
            }),
            t
          );
        })(),
        a = (function (t) {
          function e(e) {
            var n = t.call(this) || this;
            return (n._root = null), (n._comparator = e), (n.size = 0), n;
          }
          return (
            r(e, t),
            (e.prototype.insert = function (t) {
              var n = !1;
              if (null === this._root)
                (this._root = new s(t)), (n = !0), this.size++;
              else {
                var r = new s(void 0),
                  i = !1,
                  o = !1,
                  a = null,
                  h = r,
                  u = null,
                  c = this._root;
                for (h.right = this._root; ; ) {
                  if (
                    (null === c
                      ? ((c = new s(t)),
                        u.set_child(i, c),
                        (n = !0),
                        this.size++)
                      : e.is_red(c.left) &&
                        e.is_red(c.right) &&
                        ((c.red = !0), (c.left.red = !1), (c.right.red = !1)),
                    e.is_red(c) && e.is_red(u))
                  ) {
                    var l = h.right === a;
                    c === u.get_child(o)
                      ? h.set_child(l, e.single_rotate(a, !o))
                      : h.set_child(l, e.double_rotate(a, !o));
                  }
                  var p = this._comparator(c.data, t);
                  if (0 === p) break;
                  (o = i),
                    (i = p < 0),
                    null !== a && (h = a),
                    (a = u),
                    (u = c),
                    (c = c.get_child(i));
                }
                this._root = r.right;
              }
              return (this._root.red = !1), n;
            }),
            (e.prototype.remove = function (t) {
              if (null === this._root) return !1;
              var n = new s(void 0),
                r = n;
              r.right = this._root;
              for (
                var i = null, o = null, a = null, h = !0;
                null !== r.get_child(h);

              ) {
                var u = h;
                (o = i), (i = r), (r = r.get_child(h));
                var c = this._comparator(t, r.data);
                if (
                  ((h = c > 0),
                  0 === c && (a = r),
                  !e.is_red(r) && !e.is_red(r.get_child(h)))
                )
                  if (e.is_red(r.get_child(!h))) {
                    var l = e.single_rotate(r, h);
                    i.set_child(u, l), (i = l);
                  } else if (!e.is_red(r.get_child(!h))) {
                    var p = i.get_child(!u);
                    if (null !== p)
                      if (
                        e.is_red(p.get_child(!u)) ||
                        e.is_red(p.get_child(u))
                      ) {
                        var f = o.right === i;
                        e.is_red(p.get_child(u))
                          ? o.set_child(f, e.double_rotate(i, u))
                          : e.is_red(p.get_child(!u)) &&
                            o.set_child(f, e.single_rotate(i, u));
                        var d = o.get_child(f);
                        (d.red = !0),
                          (r.red = !0),
                          (d.left.red = !1),
                          (d.right.red = !1);
                      } else (i.red = !1), (p.red = !0), (r.red = !0);
                  }
              }
              return (
                null !== a &&
                  ((a.data = r.data),
                  i.set_child(i.right === r, r.get_child(null === r.left)),
                  this.size--),
                (this._root = n.right),
                null !== this._root && (this._root.red = !1),
                null !== a
              );
            }),
            (e.is_red = function (t) {
              return null !== t && t.red;
            }),
            (e.single_rotate = function (t, e) {
              var n = t.get_child(!e);
              return (
                t.set_child(!e, n.get_child(e)),
                n.set_child(e, t),
                (t.red = !0),
                (n.red = !1),
                n
              );
            }),
            (e.double_rotate = function (t, n) {
              return (
                t.set_child(!n, e.single_rotate(t.get_child(!n), !n)),
                e.single_rotate(t, n)
              );
            }),
            e
          );
        })(i);
      e.RBTree = a;
    },
    893: function (t, e, n) {
      "use strict";
      var r,
        i =
          (this && this.__extends) ||
          ((r = function (t, e) {
            return (
              (r =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (t, e) {
                    t.__proto__ = e;
                  }) ||
                function (t, e) {
                  for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                }),
              r(t, e)
            );
          }),
          function (t, e) {
            function n() {
              this.constructor = t;
            }
            r(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((n.prototype = e.prototype), new n()));
          });
      Object.defineProperty(e, "__esModule", { value: !0 });
      var o = n(126),
        s = n(266);
      function a(t) {
        return (
          (t.bounds =
            void 0 !== t.leaves
              ? t.leaves.reduce(function (t, e) {
                  return e.bounds.union(t);
                }, h.empty())
              : h.empty()),
          void 0 !== t.groups &&
            (t.bounds = t.groups.reduce(function (t, e) {
              return a(e).union(t);
            }, t.bounds)),
          (t.bounds = t.bounds.inflate(t.padding)),
          t.bounds
        );
      }
      e.computeGroupBounds = a;
      var h = (function () {
        function t(t, e, n, r) {
          (this.x = t), (this.X = e), (this.y = n), (this.Y = r);
        }
        return (
          (t.empty = function () {
            return new t(
              Number.POSITIVE_INFINITY,
              Number.NEGATIVE_INFINITY,
              Number.POSITIVE_INFINITY,
              Number.NEGATIVE_INFINITY
            );
          }),
          (t.prototype.cx = function () {
            return (this.x + this.X) / 2;
          }),
          (t.prototype.cy = function () {
            return (this.y + this.Y) / 2;
          }),
          (t.prototype.overlapX = function (t) {
            var e = this.cx(),
              n = t.cx();
            return e <= n && t.x < this.X
              ? this.X - t.x
              : n <= e && this.x < t.X
              ? t.X - this.x
              : 0;
          }),
          (t.prototype.overlapY = function (t) {
            var e = this.cy(),
              n = t.cy();
            return e <= n && t.y < this.Y
              ? this.Y - t.y
              : n <= e && this.y < t.Y
              ? t.Y - this.y
              : 0;
          }),
          (t.prototype.setXCentre = function (t) {
            var e = t - this.cx();
            (this.x += e), (this.X += e);
          }),
          (t.prototype.setYCentre = function (t) {
            var e = t - this.cy();
            (this.y += e), (this.Y += e);
          }),
          (t.prototype.width = function () {
            return this.X - this.x;
          }),
          (t.prototype.height = function () {
            return this.Y - this.y;
          }),
          (t.prototype.union = function (e) {
            return new t(
              Math.min(this.x, e.x),
              Math.max(this.X, e.X),
              Math.min(this.y, e.y),
              Math.max(this.Y, e.Y)
            );
          }),
          (t.prototype.lineIntersections = function (e, n, r, i) {
            for (
              var o = [
                  [this.x, this.y, this.X, this.y],
                  [this.X, this.y, this.X, this.Y],
                  [this.X, this.Y, this.x, this.Y],
                  [this.x, this.Y, this.x, this.y],
                ],
                s = [],
                a = 0;
              a < 4;
              ++a
            ) {
              var h = t.lineIntersection(
                e,
                n,
                r,
                i,
                o[a][0],
                o[a][1],
                o[a][2],
                o[a][3]
              );
              null !== h && s.push({ x: h.x, y: h.y });
            }
            return s;
          }),
          (t.prototype.rayIntersection = function (t, e) {
            var n = this.lineIntersections(this.cx(), this.cy(), t, e);
            return n.length > 0 ? n[0] : null;
          }),
          (t.prototype.vertices = function () {
            return [
              { x: this.x, y: this.y },
              { x: this.X, y: this.y },
              { x: this.X, y: this.Y },
              { x: this.x, y: this.Y },
            ];
          }),
          (t.lineIntersection = function (t, e, n, r, i, o, s, a) {
            var h = n - t,
              u = s - i,
              c = r - e,
              l = a - o,
              p = l * h - u * c;
            if (0 == p) return null;
            var f = t - i,
              d = e - o,
              g = (u * d - l * f) / p,
              v = (h * d - c * f) / p;
            return g >= 0 && g <= 1 && v >= 0 && v <= 1
              ? { x: t + g * h, y: e + g * c }
              : null;
          }),
          (t.prototype.inflate = function (e) {
            return new t(this.x - e, this.X + e, this.y - e, this.Y + e);
          }),
          t
        );
      })();
      (e.Rectangle = h),
        (e.makeEdgeBetween = function (t, e, n) {
          var r = t.rayIntersection(e.cx(), e.cy()) || { x: t.cx(), y: t.cy() },
            i = e.rayIntersection(t.cx(), t.cy()) || { x: e.cx(), y: e.cy() },
            o = i.x - r.x,
            s = i.y - r.y,
            a = Math.sqrt(o * o + s * s),
            h = a - n;
          return {
            sourceIntersection: r,
            targetIntersection: i,
            arrowStart: { x: r.x + (h * o) / a, y: r.y + (h * s) / a },
          };
        }),
        (e.makeEdgeTo = function (t, e, n) {
          var r = e.rayIntersection(t.x, t.y);
          r || (r = { x: e.cx(), y: e.cy() });
          var i = r.x - t.x,
            o = r.y - t.y,
            s = Math.sqrt(i * i + o * o);
          return { x: r.x - (n * i) / s, y: r.y - (n * o) / s };
        });
      var u = function (t, e, n) {
          (this.v = t),
            (this.r = e),
            (this.pos = n),
            (this.prev = p()),
            (this.next = p());
        },
        c = function (t, e, n) {
          (this.isOpen = t), (this.v = e), (this.pos = n);
        };
      function l(t, e) {
        return t.pos > e.pos
          ? 1
          : t.pos < e.pos || t.isOpen
          ? -1
          : e.isOpen
          ? 1
          : 0;
      }
      function p() {
        return new s.RBTree(function (t, e) {
          return t.pos - e.pos;
        });
      }
      var f = {
          getCentre: function (t) {
            return t.cx();
          },
          getOpen: function (t) {
            return t.y;
          },
          getClose: function (t) {
            return t.Y;
          },
          getSize: function (t) {
            return t.width();
          },
          makeRect: function (t, e, n, r) {
            return new h(n - r / 2, n + r / 2, t, e);
          },
          findNeighbours: function (t, e) {
            var n = function (n, r) {
              for (var i, o = e.findIter(t); null !== (i = o[n]()); ) {
                var s = i.r.overlapX(t.r);
                if (
                  ((s <= 0 || s <= i.r.overlapY(t.r)) &&
                    (t[n].insert(i), i[r].insert(t)),
                  s <= 0)
                )
                  break;
              }
            };
            n("next", "prev"), n("prev", "next");
          },
        },
        d = {
          getCentre: function (t) {
            return t.cy();
          },
          getOpen: function (t) {
            return t.x;
          },
          getClose: function (t) {
            return t.X;
          },
          getSize: function (t) {
            return t.height();
          },
          makeRect: function (t, e, n, r) {
            return new h(t, e, n - r / 2, n + r / 2);
          },
          findNeighbours: function (t, e) {
            var n = function (n, r) {
              var i = e.findIter(t)[n]();
              null !== i &&
                i.r.overlapX(t.r) > 0 &&
                (t[n].insert(i), i[r].insert(t));
            };
            n("next", "prev"), n("prev", "next");
          },
        };
      function g(t, e, n, r) {
        void 0 === r && (r = !1);
        var i = t.padding,
          o = void 0 !== t.groups ? t.groups.length : 0,
          s = void 0 !== t.leaves ? t.leaves.length : 0,
          a = o
            ? t.groups.reduce(function (t, r) {
                return t.concat(g(r, e, n, !0));
              }, [])
            : [],
          h = (r ? 2 : 0) + s + o,
          u = new Array(h),
          c = new Array(h),
          l = 0,
          p = function (t, e) {
            (c[l] = t), (u[l++] = e);
          };
        if (r) {
          var f = t.bounds,
            d = e.getCentre(f),
            y = e.getSize(f) / 2,
            m = e.getOpen(f),
            _ = e.getClose(f),
            E = d - y + i / 2,
            b = d + y - i / 2;
          (t.minVar.desiredPosition = E),
            p(e.makeRect(m, _, E, i), t.minVar),
            (t.maxVar.desiredPosition = b),
            p(e.makeRect(m, _, b, i), t.maxVar);
        }
        s &&
          t.leaves.forEach(function (t) {
            return p(t.bounds, t.variable);
          }),
          o &&
            t.groups.forEach(function (t) {
              var n = t.bounds;
              p(
                e.makeRect(
                  e.getOpen(n),
                  e.getClose(n),
                  e.getCentre(n),
                  e.getSize(n)
                ),
                t.minVar
              );
            });
        var w = v(c, u, e, n);
        return (
          o &&
            (u.forEach(function (t) {
              (t.cOut = []), (t.cIn = []);
            }),
            w.forEach(function (t) {
              t.left.cOut.push(t), t.right.cIn.push(t);
            }),
            t.groups.forEach(function (t) {
              var n = (t.padding - e.getSize(t.bounds)) / 2;
              t.minVar.cIn.forEach(function (t) {
                return (t.gap += n);
              }),
                t.minVar.cOut.forEach(function (e) {
                  (e.left = t.maxVar), (e.gap += n);
                });
            })),
          a.concat(w)
        );
      }
      function v(t, e, n, r) {
        var i,
          s = t.length,
          a = 2 * s;
        console.assert(e.length >= s);
        var h = new Array(a);
        for (i = 0; i < s; ++i) {
          var f = t[i],
            d = new u(e[i], f, n.getCentre(f));
          (h[i] = new c(!0, d, n.getOpen(f))),
            (h[i + s] = new c(!1, d, n.getClose(f)));
        }
        h.sort(l);
        var g = new Array(),
          v = p();
        for (i = 0; i < a; ++i) {
          var y = h[i];
          if (((d = y.v), y.isOpen)) v.insert(d), n.findNeighbours(d, v);
          else {
            v.remove(d);
            var m = function (t, e) {
                var i = (n.getSize(t.r) + n.getSize(e.r)) / 2 + r;
                g.push(new o.Constraint(t.v, e.v, i));
              },
              _ = function (t, e, n) {
                for (var r, i = d[t].iterator(); null !== (r = i[t]()); )
                  n(r, d), r[e].remove(d);
              };
            _("prev", "next", function (t, e) {
              return m(t, e);
            }),
              _("next", "prev", function (t, e) {
                return m(e, t);
              });
          }
        }
        return console.assert(0 === v.size), g;
      }
      function y(t, e) {
        return v(t, e, f, 1e-6);
      }
      function m(t, e) {
        return v(t, e, d, 1e-6);
      }
      function _(t) {
        return g(t, f, 1e-6);
      }
      function E(t) {
        return g(t, d, 1e-6);
      }
      (e.generateXConstraints = y),
        (e.generateYConstraints = m),
        (e.generateXGroupConstraints = _),
        (e.generateYGroupConstraints = E),
        (e.removeOverlaps = function (t) {
          var e = t.map(function (t) {
              return new o.Variable(t.cx());
            }),
            n = y(t, e),
            r = new o.Solver(e, n);
          r.solve(),
            e.forEach(function (e, n) {
              return t[n].setXCentre(e.position());
            }),
            (e = t.map(function (t) {
              return new o.Variable(t.cy());
            })),
            (n = m(t, e)),
            (r = new o.Solver(e, n)).solve(),
            e.forEach(function (e, n) {
              return t[n].setYCentre(e.position());
            });
        });
      var b = (function (t) {
        function e(e, n) {
          var r = t.call(this, 0, n) || this;
          return (r.index = e), r;
        }
        return i(e, t), e;
      })(o.Variable);
      e.IndexedVariable = b;
      var w = (function () {
        function t(t, e, n, r, i) {
          var o = this;
          if (
            (void 0 === n && (n = null),
            void 0 === r && (r = null),
            void 0 === i && (i = !1),
            (this.nodes = t),
            (this.groups = e),
            (this.rootGroup = n),
            (this.avoidOverlaps = i),
            (this.variables = t.map(function (t, e) {
              return (t.variable = new b(e, 1));
            })),
            r && this.createConstraints(r),
            i && n && void 0 !== n.groups)
          ) {
            t.forEach(function (t) {
              if (t.width && t.height) {
                var e = t.width / 2,
                  n = t.height / 2;
                t.bounds = new h(t.x - e, t.x + e, t.y - n, t.y + n);
              } else t.bounds = new h(t.x, t.x, t.y, t.y);
            }),
              a(n);
            var s = t.length;
            e.forEach(function (t) {
              (o.variables[s] = t.minVar =
                new b(s++, void 0 !== t.stiffness ? t.stiffness : 0.01)),
                (o.variables[s] = t.maxVar =
                  new b(s++, void 0 !== t.stiffness ? t.stiffness : 0.01));
            });
          }
        }
        return (
          (t.prototype.createSeparation = function (t) {
            return new o.Constraint(
              this.nodes[t.left].variable,
              this.nodes[t.right].variable,
              t.gap,
              void 0 !== t.equality && t.equality
            );
          }),
          (t.prototype.makeFeasible = function (t) {
            var e = this;
            if (this.avoidOverlaps) {
              var n = "x",
                r = "width";
              "x" === t.axis && ((n = "y"), (r = "height"));
              var i = t.offsets
                  .map(function (t) {
                    return e.nodes[t.node];
                  })
                  .sort(function (t, e) {
                    return t[n] - e[n];
                  }),
                o = null;
              i.forEach(function (t) {
                if (o) {
                  var e = o[n] + o[r];
                  e > t[n] && (t[n] = e);
                }
                o = t;
              });
            }
          }),
          (t.prototype.createAlignment = function (t) {
            var e = this,
              n = this.nodes[t.offsets[0].node].variable;
            this.makeFeasible(t);
            var r = "x" === t.axis ? this.xConstraints : this.yConstraints;
            t.offsets.slice(1).forEach(function (t) {
              var i = e.nodes[t.node].variable;
              r.push(new o.Constraint(n, i, t.offset, !0));
            });
          }),
          (t.prototype.createConstraints = function (t) {
            var e = this,
              n = function (t) {
                return void 0 === t.type || "separation" === t.type;
              };
            (this.xConstraints = t
              .filter(function (t) {
                return "x" === t.axis && n(t);
              })
              .map(function (t) {
                return e.createSeparation(t);
              })),
              (this.yConstraints = t
                .filter(function (t) {
                  return "y" === t.axis && n(t);
                })
                .map(function (t) {
                  return e.createSeparation(t);
                })),
              t
                .filter(function (t) {
                  return "alignment" === t.type;
                })
                .forEach(function (t) {
                  return e.createAlignment(t);
                });
          }),
          (t.prototype.setupVariablesAndBounds = function (t, e, n, r) {
            this.nodes.forEach(function (i, o) {
              i.fixed
                ? ((i.variable.weight = i.fixedWeight ? i.fixedWeight : 1e3),
                  (n[o] = r(i)))
                : (i.variable.weight = 1);
              var s = (i.width || 0) / 2,
                a = (i.height || 0) / 2,
                u = t[o],
                c = e[o];
              i.bounds = new h(u - s, u + s, c - a, c + a);
            });
          }),
          (t.prototype.xProject = function (t, e, n) {
            (this.rootGroup || this.avoidOverlaps || this.xConstraints) &&
              this.project(
                t,
                e,
                t,
                n,
                function (t) {
                  return t.px;
                },
                this.xConstraints,
                _,
                function (t) {
                  return t.bounds.setXCentre(
                    (n[t.variable.index] = t.variable.position())
                  );
                },
                function (t) {
                  var e = (n[t.minVar.index] = t.minVar.position()),
                    r = (n[t.maxVar.index] = t.maxVar.position()),
                    i = t.padding / 2;
                  (t.bounds.x = e - i), (t.bounds.X = r + i);
                }
              );
          }),
          (t.prototype.yProject = function (t, e, n) {
            (this.rootGroup || this.yConstraints) &&
              this.project(
                t,
                e,
                e,
                n,
                function (t) {
                  return t.py;
                },
                this.yConstraints,
                E,
                function (t) {
                  return t.bounds.setYCentre(
                    (n[t.variable.index] = t.variable.position())
                  );
                },
                function (t) {
                  var e = (n[t.minVar.index] = t.minVar.position()),
                    r = (n[t.maxVar.index] = t.maxVar.position()),
                    i = t.padding / 2;
                  (t.bounds.y = e - i), (t.bounds.Y = r + i);
                }
              );
          }),
          (t.prototype.projectFunctions = function () {
            var t = this;
            return [
              function (e, n, r) {
                return t.xProject(e, n, r);
              },
              function (e, n, r) {
                return t.yProject(e, n, r);
              },
            ];
          }),
          (t.prototype.project = function (t, e, n, r, i, o, s, h, u) {
            this.setupVariablesAndBounds(t, e, r, i),
              this.rootGroup &&
                this.avoidOverlaps &&
                (a(this.rootGroup), (o = o.concat(s(this.rootGroup)))),
              this.solve(this.variables, o, n, r),
              this.nodes.forEach(h),
              this.rootGroup &&
                this.avoidOverlaps &&
                (this.groups.forEach(u), a(this.rootGroup));
          }),
          (t.prototype.solve = function (t, e, n, r) {
            var i = new o.Solver(t, e);
            i.setStartingPositions(n), i.setDesiredPositions(r), i.solve();
          }),
          t
        );
      })();
      e.Projection = w;
    },
    542: (t, e, n) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var r = n(957),
        i = function (t, e) {
          (this.id = t), (this.distance = e);
        },
        o = function (t) {
          (this.id = t), (this.neighbours = []);
        },
        s = function (t, e, n) {
          (this.node = t), (this.prev = e), (this.d = n);
        },
        a = (function () {
          function t(t, e, n, r, s) {
            (this.n = t), (this.es = e), (this.neighbours = new Array(this.n));
            for (var a = this.n; a--; ) this.neighbours[a] = new o(a);
            for (a = this.es.length; a--; ) {
              var h = this.es[a],
                u = n(h),
                c = r(h),
                l = s(h);
              this.neighbours[u].neighbours.push(new i(c, l)),
                this.neighbours[c].neighbours.push(new i(u, l));
            }
          }
          return (
            (t.prototype.DistanceMatrix = function () {
              for (var t = new Array(this.n), e = 0; e < this.n; ++e)
                t[e] = this.dijkstraNeighbours(e);
              return t;
            }),
            (t.prototype.DistancesFromNode = function (t) {
              return this.dijkstraNeighbours(t);
            }),
            (t.prototype.PathFromNodeToNode = function (t, e) {
              return this.dijkstraNeighbours(t, e);
            }),
            (t.prototype.PathFromNodeToNodeWithPrevCost = function (t, e, n) {
              var i = new r.PriorityQueue(function (t, e) {
                  return t.d <= e.d;
                }),
                o = this.neighbours[t],
                a = new s(o, null, 0),
                h = {};
              for (i.push(a); !i.empty() && (o = (a = i.pop()).node).id !== e; )
                for (var u = o.neighbours.length; u--; ) {
                  var c = o.neighbours[u],
                    l = this.neighbours[c.id];
                  if (!a.prev || l.id !== a.prev.node.id) {
                    var p = l.id + "," + o.id;
                    if (!(p in h && h[p] <= a.d)) {
                      var f = a.prev ? n(a.prev.node.id, o.id, l.id) : 0,
                        d = a.d + c.distance + f;
                      (h[p] = d), i.push(new s(l, a, d));
                    }
                  }
                }
              for (var g = []; a.prev; ) (a = a.prev), g.push(a.node.id);
              return g;
            }),
            (t.prototype.dijkstraNeighbours = function (t, e) {
              void 0 === e && (e = -1);
              for (
                var n = new r.PriorityQueue(function (t, e) {
                    return t.d <= e.d;
                  }),
                  i = this.neighbours.length,
                  o = new Array(i);
                i--;

              ) {
                var s = this.neighbours[i];
                (s.d = i === t ? 0 : Number.POSITIVE_INFINITY),
                  (s.q = n.push(s));
              }
              for (; !n.empty(); ) {
                var a = n.pop();
                if (((o[a.id] = a.d), a.id === e)) {
                  for (var h = [], u = a; void 0 !== u.prev; )
                    h.push(u.prev.id), (u = u.prev);
                  return h;
                }
                for (i = a.neighbours.length; i--; ) {
                  var c = a.neighbours[i],
                    l = ((u = this.neighbours[c.id]), a.d + c.distance);
                  a.d !== Number.MAX_VALUE &&
                    u.d > l &&
                    ((u.d = l),
                    (u.prev = a),
                    n.reduceKey(u.q, u, function (t, e) {
                      return (t.q = e);
                    }));
                }
              }
              return o;
            }),
            t
          );
        })();
      e.Calculator = a;
    },
    126: (t, e) => {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var n = (function () {
        function t(t) {
          (this.scale = t), (this.AB = 0), (this.AD = 0), (this.A2 = 0);
        }
        return (
          (t.prototype.addVariable = function (t) {
            var e = this.scale / t.scale,
              n = t.offset / t.scale,
              r = t.weight;
            (this.AB += r * e * n),
              (this.AD += r * e * t.desiredPosition),
              (this.A2 += r * e * e);
          }),
          (t.prototype.getPosn = function () {
            return (this.AD - this.AB) / this.A2;
          }),
          t
        );
      })();
      e.PositionStats = n;
      var r = (function () {
        function t(t, e, n, r) {
          void 0 === r && (r = !1),
            (this.left = t),
            (this.right = e),
            (this.gap = n),
            (this.equality = r),
            (this.active = !1),
            (this.unsatisfiable = !1),
            (this.left = t),
            (this.right = e),
            (this.gap = n),
            (this.equality = r);
        }
        return (
          (t.prototype.slack = function () {
            return this.unsatisfiable
              ? Number.MAX_VALUE
              : this.right.scale * this.right.position() -
                  this.gap -
                  this.left.scale * this.left.position();
          }),
          t
        );
      })();
      e.Constraint = r;
      var i = (function () {
        function t(t, e, n) {
          void 0 === e && (e = 1),
            void 0 === n && (n = 1),
            (this.desiredPosition = t),
            (this.weight = e),
            (this.scale = n),
            (this.offset = 0);
        }
        return (
          (t.prototype.dfdv = function () {
            return 2 * this.weight * (this.position() - this.desiredPosition);
          }),
          (t.prototype.position = function () {
            return (
              (this.block.ps.scale * this.block.posn + this.offset) / this.scale
            );
          }),
          (t.prototype.visitNeighbours = function (t, e) {
            var n = function (n, r) {
              return n.active && t !== r && e(n, r);
            };
            this.cOut.forEach(function (t) {
              return n(t, t.right);
            }),
              this.cIn.forEach(function (t) {
                return n(t, t.left);
              });
          }),
          t
        );
      })();
      e.Variable = i;
      var o = (function () {
        function t(t) {
          (this.vars = []),
            (t.offset = 0),
            (this.ps = new n(t.scale)),
            this.addVariable(t);
        }
        return (
          (t.prototype.addVariable = function (t) {
            (t.block = this),
              this.vars.push(t),
              this.ps.addVariable(t),
              (this.posn = this.ps.getPosn());
          }),
          (t.prototype.updateWeightedPosition = function () {
            this.ps.AB = this.ps.AD = this.ps.A2 = 0;
            for (var t = 0, e = this.vars.length; t < e; ++t)
              this.ps.addVariable(this.vars[t]);
            this.posn = this.ps.getPosn();
          }),
          (t.prototype.compute_lm = function (t, e, n) {
            var r = this,
              i = t.dfdv();
            return (
              t.visitNeighbours(e, function (e, o) {
                var s = r.compute_lm(o, t, n);
                o === e.right
                  ? ((i += s * e.left.scale), (e.lm = s))
                  : ((i += s * e.right.scale), (e.lm = -s)),
                  n(e);
              }),
              i / t.scale
            );
          }),
          (t.prototype.populateSplitBlock = function (t, e) {
            var n = this;
            t.visitNeighbours(e, function (e, r) {
              (r.offset = t.offset + (r === e.right ? e.gap : -e.gap)),
                n.addVariable(r),
                n.populateSplitBlock(r, t);
            });
          }),
          (t.prototype.traverse = function (t, e, n, r) {
            var i = this;
            void 0 === n && (n = this.vars[0]),
              void 0 === r && (r = null),
              n.visitNeighbours(r, function (r, o) {
                e.push(t(r)), i.traverse(t, e, o, n);
              });
          }),
          (t.prototype.findMinLM = function () {
            var t = null;
            return (
              this.compute_lm(this.vars[0], null, function (e) {
                !e.equality && (null === t || e.lm < t.lm) && (t = e);
              }),
              t
            );
          }),
          (t.prototype.findMinLMBetween = function (t, e) {
            this.compute_lm(t, null, function () {});
            var n = null;
            return (
              this.findPath(t, null, e, function (t, e) {
                !t.equality &&
                  t.right === e &&
                  (null === n || t.lm < n.lm) &&
                  (n = t);
              }),
              n
            );
          }),
          (t.prototype.findPath = function (t, e, n, r) {
            var i = this,
              o = !1;
            return (
              t.visitNeighbours(e, function (e, s) {
                o ||
                  (s !== n && !i.findPath(s, t, n, r)) ||
                  ((o = !0), r(e, s));
              }),
              o
            );
          }),
          (t.prototype.isActiveDirectedPathBetween = function (t, e) {
            if (t === e) return !0;
            for (var n = t.cOut.length; n--; ) {
              var r = t.cOut[n];
              if (r.active && this.isActiveDirectedPathBetween(r.right, e))
                return !0;
            }
            return !1;
          }),
          (t.split = function (e) {
            return (
              (e.active = !1),
              [t.createSplitBlock(e.left), t.createSplitBlock(e.right)]
            );
          }),
          (t.createSplitBlock = function (e) {
            var n = new t(e);
            return n.populateSplitBlock(e, null), n;
          }),
          (t.prototype.splitBetween = function (e, n) {
            var r = this.findMinLMBetween(e, n);
            if (null !== r) {
              var i = t.split(r);
              return { constraint: r, lb: i[0], rb: i[1] };
            }
            return null;
          }),
          (t.prototype.mergeAcross = function (t, e, n) {
            e.active = !0;
            for (var r = 0, i = t.vars.length; r < i; ++r) {
              var o = t.vars[r];
              (o.offset += n), this.addVariable(o);
            }
            this.posn = this.ps.getPosn();
          }),
          (t.prototype.cost = function () {
            for (var t = 0, e = this.vars.length; e--; ) {
              var n = this.vars[e],
                r = n.position() - n.desiredPosition;
              t += r * r * n.weight;
            }
            return t;
          }),
          t
        );
      })();
      e.Block = o;
      var s = (function () {
        function t(t) {
          this.vs = t;
          var e = t.length;
          for (this.list = new Array(e); e--; ) {
            var n = new o(t[e]);
            (this.list[e] = n), (n.blockInd = e);
          }
        }
        return (
          (t.prototype.cost = function () {
            for (var t = 0, e = this.list.length; e--; )
              t += this.list[e].cost();
            return t;
          }),
          (t.prototype.insert = function (t) {
            (t.blockInd = this.list.length), this.list.push(t);
          }),
          (t.prototype.remove = function (t) {
            var e = this.list.length - 1,
              n = this.list[e];
            (this.list.length = e),
              t !== n &&
                ((this.list[t.blockInd] = n), (n.blockInd = t.blockInd));
          }),
          (t.prototype.merge = function (t) {
            var e = t.left.block,
              n = t.right.block,
              r = t.right.offset - t.left.offset - t.gap;
            e.vars.length < n.vars.length
              ? (n.mergeAcross(e, t, r), this.remove(e))
              : (e.mergeAcross(n, t, -r), this.remove(n));
          }),
          (t.prototype.forEach = function (t) {
            this.list.forEach(t);
          }),
          (t.prototype.updateBlockPositions = function () {
            this.list.forEach(function (t) {
              return t.updateWeightedPosition();
            });
          }),
          (t.prototype.split = function (t) {
            var e = this;
            this.updateBlockPositions(),
              this.list.forEach(function (n) {
                var r = n.findMinLM();
                null !== r &&
                  r.lm < a.LAGRANGIAN_TOLERANCE &&
                  ((n = r.left.block),
                  o.split(r).forEach(function (t) {
                    return e.insert(t);
                  }),
                  e.remove(n),
                  t.push(r));
              });
          }),
          t
        );
      })();
      e.Blocks = s;
      var a = (function () {
        function t(t, e) {
          (this.vs = t),
            (this.cs = e),
            (this.vs = t),
            t.forEach(function (t) {
              (t.cIn = []), (t.cOut = []);
            }),
            (this.cs = e),
            e.forEach(function (t) {
              t.left.cOut.push(t), t.right.cIn.push(t);
            }),
            (this.inactive = e.map(function (t) {
              return (t.active = !1), t;
            })),
            (this.bs = null);
        }
        return (
          (t.prototype.cost = function () {
            return this.bs.cost();
          }),
          (t.prototype.setStartingPositions = function (t) {
            (this.inactive = this.cs.map(function (t) {
              return (t.active = !1), t;
            })),
              (this.bs = new s(this.vs)),
              this.bs.forEach(function (e, n) {
                return (e.posn = t[n]);
              });
          }),
          (t.prototype.setDesiredPositions = function (t) {
            this.vs.forEach(function (e, n) {
              return (e.desiredPosition = t[n]);
            });
          }),
          (t.prototype.mostViolated = function () {
            for (
              var e = Number.MAX_VALUE,
                n = null,
                r = this.inactive,
                i = r.length,
                o = i,
                s = 0;
              s < i;
              ++s
            ) {
              var a = r[s];
              if (!a.unsatisfiable) {
                var h = a.slack();
                if (
                  (a.equality || h < e) &&
                  ((e = h), (n = a), (o = s), a.equality)
                )
                  break;
              }
            }
            return (
              o !== i &&
                ((e < t.ZERO_UPPERBOUND && !n.active) || n.equality) &&
                ((r[o] = r[i - 1]), (r.length = i - 1)),
              n
            );
          }),
          (t.prototype.satisfy = function () {
            null == this.bs && (this.bs = new s(this.vs)),
              this.bs.split(this.inactive);
            for (
              var e = null;
              (e = this.mostViolated()) &&
              (e.equality || (e.slack() < t.ZERO_UPPERBOUND && !e.active));

            ) {
              var n = e.left.block;
              if (n !== e.right.block) this.bs.merge(e);
              else {
                if (n.isActiveDirectedPathBetween(e.right, e.left)) {
                  e.unsatisfiable = !0;
                  continue;
                }
                var r = n.splitBetween(e.left, e.right);
                if (null === r) {
                  e.unsatisfiable = !0;
                  continue;
                }
                this.bs.insert(r.lb),
                  this.bs.insert(r.rb),
                  this.bs.remove(n),
                  this.inactive.push(r.constraint),
                  e.slack() >= 0 ? this.inactive.push(e) : this.bs.merge(e);
              }
            }
          }),
          (t.prototype.solve = function () {
            this.satisfy();
            for (
              var t = Number.MAX_VALUE, e = this.bs.cost();
              Math.abs(t - e) > 1e-4;

            )
              this.satisfy(), (t = e), (e = this.bs.cost());
            return e;
          }),
          (t.LAGRANGIAN_TOLERANCE = -1e-4),
          (t.ZERO_UPPERBOUND = -1e-10),
          t
        );
      })();
      (e.Solver = a),
        (e.removeOverlapInOneDimension = function (t, e, n) {
          for (
            var o = t.map(function (t) {
                return new i(t.desiredCenter);
              }),
              s = [],
              h = t.length,
              u = 0;
            u < h - 1;
            u++
          ) {
            var c = t[u],
              l = t[u + 1];
            s.push(new r(o[u], o[u + 1], (c.size + l.size) / 2));
          }
          var p = o[0],
            f = o[h - 1],
            d = t[0].size / 2,
            g = t[h - 1].size / 2,
            v = null,
            y = null;
          return (
            e &&
              ((v = new i(e, 1e3 * p.weight)),
              o.push(v),
              s.push(new r(v, p, d))),
            n &&
              ((y = new i(n, 1e3 * f.weight)),
              o.push(y),
              s.push(new r(f, y, g))),
            new a(o, s).solve(),
            {
              newCenters: o.slice(0, t.length).map(function (t) {
                return t.position();
              }),
              lowerBound: v ? v.position() : p.position() - d,
              upperBound: y ? y.position() : f.position() + g,
            }
          );
        });
    },
    635: (t, e, n) => {
      "use strict";
      function r(t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(t) {
            try {
              h(r.next(t));
            } catch (t) {
              o(t);
            }
          }
          function a(t) {
            try {
              h(r.throw(t));
            } catch (t) {
              o(t);
            }
          }
          function h(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(s, a);
          }
          h((r = r.apply(t, e || [])).next());
        });
      }
      function i(t) {
        return this instanceof i ? ((this.v = t), this) : new i(t);
      }
      function o(t, e, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var r,
          o = n.apply(t, e || []),
          s = [];
        return (
          (r = {}),
          a("next"),
          a("throw"),
          a("return", function (t) {
            return function (e) {
              return Promise.resolve(e).then(t, c);
            };
          }),
          (r[Symbol.asyncIterator] = function () {
            return this;
          }),
          r
        );
        function a(t, e) {
          o[t] &&
            ((r[t] = function (e) {
              return new Promise(function (n, r) {
                s.push([t, e, n, r]) > 1 || h(t, e);
              });
            }),
            e && (r[t] = e(r[t])));
        }
        function h(t, e) {
          try {
            (n = o[t](e)).value instanceof i
              ? Promise.resolve(n.value.v).then(u, c)
              : l(s[0][2], n);
          } catch (t) {
            l(s[0][3], t);
          }
          var n;
        }
        function u(t) {
          h("next", t);
        }
        function c(t) {
          h("throw", t);
        }
        function l(t, e) {
          t(e), s.shift(), s.length && h(s[0][0], s[0][1]);
        }
      }
      function s(t) {
        var e, n;
        return (
          (e = {}),
          r("next"),
          r("throw", function (t) {
            throw t;
          }),
          r("return"),
          (e[Symbol.iterator] = function () {
            return this;
          }),
          e
        );
        function r(r, o) {
          e[r] = t[r]
            ? function (e) {
                return (n = !n)
                  ? { value: i(t[r](e)), done: !1 }
                  : o
                  ? o(e)
                  : e;
              }
            : o;
        }
      }
      function a(t) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var e,
          n = t[Symbol.asyncIterator];
        return n
          ? n.call(t)
          : ((t = (function (t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                n = e && t[e],
                r = 0;
              if (n) return n.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && r >= t.length && (t = void 0),
                      { value: t && t[r++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(t)),
            (e = {}),
            r("next"),
            r("throw"),
            r("return"),
            (e[Symbol.asyncIterator] = function () {
              return this;
            }),
            e);
        function r(n) {
          e[n] =
            t[n] &&
            function (e) {
              return new Promise(function (r, i) {
                !(function (t, e, n, r) {
                  Promise.resolve(r).then(function (e) {
                    t({ value: e, done: n });
                  }, e);
                })(r, i, (e = t[n](e)).done, e.value);
              });
            };
        }
      }
      n.d(e, {
        AQ: () => o,
        Me: () => s,
        N3: () => i,
        sH: () => r,
        xN: () => a,
      }),
        Object.create,
        Object.create,
        "function" == typeof SuppressedError && SuppressedError;
    },
  },
]);