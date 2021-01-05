/****************************************************************************
 ** @license
 ** This file is part of yFiles for HTML 2.3.0.3.
 **
 ** yWorks proprietary/confidential. Use is subject to license terms.
 **
 ** Copyright (c) 2020 by yWorks GmbH, Vor dem Kreuzberg 28,
 ** 72070 Tuebingen, Germany. All rights reserved.
 **
 ***************************************************************************/
import y from"./core.js";import l from"./lang.js";import _a_ from"./algorithms.js";import _b_ from"./layout-orthogonal.js";import _c_ from"./router-polyline.js";import _d_ from"./router-other.js";import _e_ from"./layout-tree.js";import _f_ from"./layout-core.js";_a_.lang=l,_b_.lang=l,_c_.lang=l,_d_.lang=l,_e_.lang=l,_f_.lang=l,function(t,i,n,e){"use strict";var o=i.lang.ClassDefinition,a=(i.lang.InterfaceDefinition,i.lang.AttributeDefinition,i.lang.EnumDefinition,i.lang.StructDefinition,i.lang.Abstract,i.lang.module),r=(i.lang.delegate,i.lang.Number,i.lang.String,i.lang.decorators.OptionArgs),l=i.lang.decorators.SetterArg;i.lang.addMappings("yFiles-for-HTML-Complete-2.3.0.3-Evaluation (Build a8bb13db3ea7-12/02/2020)",{_$_hae:["aspectRatio","$yiO"],_$_iae:["gridSpacing","$ziO"],get _$_cnn(){return["CompactOrthogonalLayout","ARC",r(l("gridSpacing"),l("aspectRatio"),l("partitionFinder"),l("partitionPlacer"),l("interEdgeRouter"),l("coreLayout"))]},_$$_xta:["yfiles.orthogonal","yfiles._R.T","yfiles._R.C"]});var f=["Illegal value for grid size: ","Aspect ratio must be greater than zero: "];a("_$$_xta",function(i){i._$_cnn=new o(function(){return{$extends:t.C.CRC,constructor:function(){t.C.CRC.call(this);var i=new t.T.CRC.T2(0,t.RG.$f4);this.$JxO=i;var n=new t.C.ZQC;n.$JOO=!0,n.$Hc=3,this.$is=n;var e=new t.T.CRC.T1(null);this.$KxO=e,this.$IxO=t.XRA.$m(null),this.$yiO=1,this.$ziO=20},$f:0,$f1:0,$f5:0,$f6:0,_$_iae:{get:function(){return this.$f1},set:function(i){if(i<1)throw t.IG.$m18(f[0]+i);(this.$f1=i,this.$is instanceof t.C.ZQC)&&(this.$is.$AiO=i);if(this.$KxO instanceof t.T.CRC.T1){var n=this.$KxO;n.$f.$HzO=2*i,n.$f.$niO=i}var e=this.$IxO;e instanceof t.T.CRC.T?e.$f.$pM=new t.C.SRC(0,0,i):e instanceof t.YRA&&(e.$f=.125)}},_$_hae:{get:function(){return this.$f},set:function(i){if(i<=0)throw t.IG.$m18(f[1]+i);(this.$f=i,this.$KxO instanceof t.T.CRC.T1)&&(this.$KxO.$f.$TpO=new t.C.DWA(i,1));this.$IxO instanceof t.YRA&&(this.$IxO.$f=.125)}}}})})}(y.lang.module("yfiles._R"),y,"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self);export default y;
