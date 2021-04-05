/****************************************************************************
 ** @license
 ** This file is part of yFiles for HTML 2.3.0.4.
 **
 ** yWorks proprietary/confidential. Use is subject to license terms.
 **
 ** Copyright (c) 2021 by yWorks GmbH, Vor dem Kreuzberg 28,
 ** 72070 Tuebingen, Germany. All rights reserved.
 **
 ***************************************************************************/
import y from"./core.js";import l from"./lang.js";import _a_ from"./algorithms.js";import _b_ from"./layout-core.js";import _c_ from"./layout-hierarchic.js";import _d_ from"./router-other.js";_a_.lang=l,_b_.lang=l,_c_.lang=l,_d_.lang=l,function($,f,n,t){"use strict";function i(f){var n=new $.C.KOC,t=n.$iIj;t.$Qjj=new $.C.HPC.$s(0,!1),t.$DRj=60,t.$wQj=20;var i=n.$oIj;switch(f.$f7){case-1:i.$Vsj=0;break;case 0:i.$Vsj=.5;break;case 1:i.$Vsj=1}return n}function r($,f,n){for(var t=0,i=0,r=f.$VVj();r.$Kp;r.$tu()){var l=r.$Wp;1===n.$Ev(l)?l.$f7>0&&i++:t+=l.$f6}return i<=1&&2===t}function l(f,n,t){var i=n.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY);f.$f16=n.$bYj(),f.$f17=n.$bYj(),f.$f3=n.$bYj(),f.$f4=n.$bYj(),f.$f12 instanceof $.C.KOC&&0!==f.$f20&&(f.$f=f.$f12.$Ywk(n)),function(f,n,t){f.$f5=$.DF.$m13(n.$oY),f.$f1=new $.FE;var i=new $.FE;f.$f11=new $.C.FXA.$r,f.$f2=n.$cYj(),f.$f15=n.$cYj(),f.$f6=n.$cYj(),f.$f9=n.$cYj(),f.$f8=n.$cYj(),f.$f19=new $.ME;for(var r=n.$eYj();r.$Kp;r.$tu()){var l=new $.C.FXA.$r,o=r.$Wp;f.$f2.$gA(o,"n"+o.$nL),1===n.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY).$Ev(o)?e(f,o,l):a(f,o,l);var s=new $.FE;s.$m(l),u(f,l,s);for(var _=0;_<s.$ki;_++)if((l=s.$ni(_)).$f1>1){for(var E=new $.GH.$c1("GN"),v=0;v<l.$f1;v++)E.$m2($.LF.$m8(l.$ni(v).$nL)),E.$m2("/");i.$m(E.toString()),f.$f1.$m(l)}}for(var A=0;A<f.$f1.$ki;A++){var h=new $.C.XVA(0,0,0,0),T=n.$RXj(),l=f.$f1.$ni(A);f.$f11.$m5(T);for(var p=0;p<l.$f1;p++){var C=l.$ni(p);f.$f15.$gA(C,i.$ni(A)),f.$f9.$gA(C,t),f.$f8.$gA(C,h)}f.$f8.$gA(T,h),f.$f6.$Kk(T,!0),f.$f2.$gA(T,i.$ni(A))}n.$sAk($.T.ZXA.NODE_ID_DP_KEY,f.$f2),n.$sAk($.T.ZXA.PARENT_NODE_ID_DP_KEY,f.$f15),n.$sAk($.T.ZXA.GROUP_DP_KEY,f.$f6),n.$sAk($.T.ZXA.GROUP_NODE_INSETS_DP_KEY,f.$f8),n.$sAk($.T.AKC.LAYOUT_DP_KEY,f.$f9)}(f,n,t);for(var r=n.$ekk($.T.HJC.NODE_ID_DP_KEY),l=n.$eYj();l.$Kp;l.$tu()){var o=l.$Wp;if(1===n.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY).$Ev(o)){for(var s=null,_=o.$emk(null);_.$Kp;_.$tu()){var E=_.$Vp.$f3;if(null===s&&(s=E),n.$wBk(_.$Vp,new $.C.GWA.$s(0,n.$m38(_.$Vp.$f2).$tr/2)),n.$yBk(_.$Vp,new $.C.GWA.$s(0,-n.$m38(_.$Vp.$f3).$tr/2)),f.$f3.$gA(_.$Vp,$.T.GLC.$s(2,!0)),f.$f4.$gA(_.$Vp,$.T.GLC.$s(1,!0)),null!==f.$f&&s!==E){var v=null===r?s:r.$Ev(s),A=null===r?E:r.$Ev(E);(4===f.$f20||3===f.$f20)!==(2===i.$Ev(E))?f.$f.$ZD(v,A):f.$f.$cD(v,A)}}for(var h=new $.FE,T="CG"+o.$nL,p=o.$emk(null);p.$Kp;p.$tu()){var C=p.$Vp;f.$f16.$gA(C,T);var k=f.$f15.$Ev(C.$f3);null!==k&&-1!==h.indexOf(k)||(f.$f17.$gA(C,T),null!==k&&h.$m(k))}}}n.$sAk($.T.ILC.SOURCE_GROUP_ID_DP_KEY,f.$f16),n.$sAk($.T.ILC.TARGET_GROUP_ID_DP_KEY,f.$f17),n.$sAk($.T.ILC.SOURCE_PORT_CONSTRAINT_DP_KEY,f.$f3),n.$sAk($.T.ILC.TARGET_PORT_CONSTRAINT_DP_KEY,f.$f4)}function e(f,n,t){if(1!==n.$f2.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY).$Ev(n))throw $.JG.$m30(k[4]);if(!f.$f5[n.$nL]){t.$m5(n),f.$f5[n.$nL]=!0;for(var i=0,r=n.$Eaj();r.$Kp;r.$tu())if(a(f,r.$Wp,t),++i>2)throw $.JG.$m30(k[5])}}function a(f,n,t){if(1===n.$f2.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY).$Ev(n))throw $.JG.$m30(k[6]);if(!f.$f5[n.$nL]){t.$m5(n),f.$f5[n.$nL]=!0;for(var i=n.$uaj();i.$Kp;i.$tu())e(f,i.$Wp,t)}}function u(f,n,t){var i=-1,r=-1;for(i=0;i<n.$f1;i++){var l=n.$ni(i);if(1===l.$f2.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY).$Ev(l)){for(var e=l.$uaj();e.$Kp&&!((r=n.indexOf(e.$Wp))>-1);e.$tu());if(r>-1)break}}if(-1!==r){var a=new $.C.FXA.$r,_=n.$ni(i),E=n.$ni(r),v=new $.C.FXA.$r;n.$Io(E),a.$m5(E);for(e=E.$uaj();e.$Kp;e.$tu()){var A=e.$Wp;n.$Io(A),a.$m5(A);for(var h=A.$Eaj();h.$Kp;h.$tu()){var T=h.$Wp;T!==E&&(o(f,A,T,_,E)?s(f,A,n,a):v.$m5(A))}}if(n.$RWj()){n.$Tcj(a),v.$Eo(),n.$Io(E),a.$m5(E);for(e=E.$uaj();e.$Kp;e.$tu()){A=e.$Wp;n.$Io(A),a.$m5(A),v.$m5(A)}}for(e=v.$VVj();e.$Kp;e.$tu())for(var p=e.$Wp.$hkk(null);p.$Kp;p.$tu())if(p.$Vp.$f2!==E){var C=E.$f2;C.$wBk(p.$Vp,new $.C.GWA.$s(0,0)),C.$yBk(p.$Vp,new $.C.GWA.$s(0,0)),f.$f3.$gA(p.$Vp,$.T.GLC.$s(0,!0)),f.$f4.$gA(p.$Vp,$.T.GLC.$s(0,!0)),f.$f19.$m(p.$Vp)}u(f,n,t),u(f,a,t),t.$m(a)}}function o(f,n,t,i,r){return function f(n,t,i,r,l,e){if(!$.KE.$m9(e,new $.T.ENC.T(t,i)))return!0;var a=!0;for(var u=i.$uaj();u.$Kp;u.$tu()){var o=u.$Wp;if(o!==t){if(o===r)return!1;for(var s=o.$Eaj();s.$Kp;s.$tu()){var _=s.$Wp;if(_!==i&&!f(n,o,_,r,l,e)){a=!1;break}}}}return a}(f,n,t,i,r,new $.ME)}function s($,f,n,t){for(var i=f.$Eaj();i.$Kp;i.$tu()){var r=i.$Wp;if(!(n.indexOf(r)<0)){n.$Io(r),t.$m5(r);for(var l=r.$uaj();l.$Kp;l.$tu()){var e=l.$Wp;n.indexOf(e)>-1&&(n.$Io(e),t.$m5(e),s($,e,n,t))}}}}function _($,f,n,t){for(var i=1,r=f.$Eaj();r.$Kp;r.$tu()){var l=r.$Wp;if(l!==n&&-1===t.indexOf(l)){t.$m5(l);for(var e=l.$uaj();e.$Kp;e.$tu()){var a=e.$Wp;a!==f&&(i+=_($,a,l,t))}}}return i}var E=f.lang.ClassDefinition,v=(f.lang.InterfaceDefinition,f.lang.AttributeDefinition,f.lang.EnumDefinition),A=(f.lang.StructDefinition,f.lang.Abstract,f.lang.module),h=(f.lang.delegate,f.lang.Boolean,f.lang.Number,f.lang.Void,f.lang.Object),T=(f.lang.String,f.lang.decorators.Type),p=f.lang.decorators.OptionArgs,C=f.lang.decorators.SetterArg;f.lang.addMappings("yFiles-for-HTML-Complete-2.3.0.4-Evaluation (Build af8280ceb940-04/05/2021)",{get _$_spd(){return["alignment","$vb",T("yfiles._R.C.GNC",5)]},_$_tpd:["topLayout","$wb"],_$_xff:["partnerlessBelow","$Pyj"],_$_kzf:["offsetForFamilyNodes","$YIj"],_$_whg:["familyNodesAlwaysBelow","$qMj"],get _$_urg(){return["familyMembersSortingPolicy","$tSj",T("yfiles._R.C.HNC",5)]},_$_vsg:["spacingBetweenFamilyMembers","$WSj"],get _$_cjn(){return["FamilyTreeLayout","ENC",p(C("topLayout"),C("spacingBetweenFamilyMembers"),C("offsetForFamilyNodes"),C("partnerlessBelow"),C("familyNodesAlwaysBelow"),C("alignment","yfiles._R.C.GNC"),C("parallelEdgeRouterEnabled"),C("selfLoopRouterEnabled"),C("familyMembersSortingPolicy","yfiles._R.C.HNC"),C("labeling"),C("selfLoopRouter"),C("parallelEdgeRouter"),C("componentLayout"),C("subgraphLayout"),C("hideGroupsStage"),C("orientationLayout"),C("orientationLayoutEnabled"),C("layoutOrientation","yfiles._R.C.SHC"),C("labelingEnabled"),C("hideGroupsStageEnabled"),C("componentLayoutEnabled"),C("subgraphLayoutEnabled"))]},_$_djn:["FamilyType","FNC"],_$_ejn:["VerticalNodeAlignment","GNC"],_$_fjn:["FamilyMembersSortingPolicy","HNC"],_$$_ota:["yfiles.genealogy","yfiles._R.T","yfiles._R.C"]});var k=["Unknown alignment.","DataProvider "," is not registered to the graph.","FamilyTypeDpKey","Direct link between two individuals","Family node has more than two parent nodes","Direct link between two family nodes"];A("_$$_ota",function(n){n._$_cjn=new E(function(){return{$extends:$.C.DKC,constructor:function(){$.C.DKC.call(this),this.$f=null,this.$INj=!1,this.$DBj.$Ye=12,this.$f12=i(this)},$f16:null,$f17:null,$f3:null,$f4:null,$f19:null,$f9:null,$f2:null,$f15:null,$f6:null,$f8:null,$f21:null,$f22:null,$f12:null,$f24:!0,$f13:30,$f14:10,$f10:!0,$f18:!1,$f7:0,_$_tpd:{get:function(){return this.$f12},set:function($){this.$f12=null===$?i(this):$}},"$m1!":function(){if(!this.$f24||0!==this.$f20)return!1;var f=this.$wb;return $.C.IJC.isInstance(f)&&(f=f.$nr),f instanceof $.C.KOC},_$_vsg:{get:function(){return this.$f13},set:function(f){if(f<0)throw $.JG.$m2();this.$f13=f}},_$_kzf:{get:function(){return this.$f14},set:function(f){if(f<0)throw $.JG.$m2();this.$f14=f}},_$_xff:{get:function(){return this.$f10},set:function($){this.$f10=$}},_$_whg:{get:function(){return this.$f18},set:function($){this.$f18=$}},_$_spd:{get:function(){return this.$f7},set:function(f){var n=0;switch(0|f){case 1:n=1;break;case 0:n=.5;break;case-1:n=0;break;default:throw $.JG.$m18(k[0])}null!==this.$f12&&this.$f12 instanceof $.C.KOC&&(this.$f12.$oIj.$Vsj=n),this.$f7=0|f}},$LRj:{set:function($){this.$f48=$}},$DLj:{set:function($){this.$f31=$}},$f20:0,$f:null,_$_urg:{get:function(){return this.$f20},set:function(f){switch(0|f){case 0:case 1:case 2:case 3:case 4:this.$f20=0|f;break;default:throw $.JG.$m2()}}},$Ymk:function(f){if(null===f.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY))throw $.JG.$m28(k[1]+$.T.ENC.FAMILY_TYPE_DP_KEY+k[2]);var n=new $.C.WXA(f),t=f.$ekk($.T.ZXA.GROUP_DP_KEY),i=f.$ekk($.T.ZXA.PARENT_NODE_ID_DP_KEY),r=f.$ekk($.T.ZXA.NODE_ID_DP_KEY),e=f.$ekk($.T.ZXA.GROUP_NODE_INSETS_DP_KEY),a=new $.C.WXA(f),u=null,o=$.T.XXA.$D(),s=$.T.XXA.$D(),_=$.T.XXA.$D(),E=$.T.XXA.$D(),v=$.T.XXA.$B(),A=null;if(function(f,n){f.$f21=$.T.XXA.$D();var t=n.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY);if(null!==t)for(var i=n.$eYj();i.$Kp;i.$tu()){var r=i.$Wp;1===t.$Ev(r)&&f.$f21.$mA(r,r.$f7)}}(this,f),function(f,n){f.$f22=$.T.XXA.$D();var t=n.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY);if(null!==t)for(var i=n.$eYj();i.$Kp;i.$tu()){var r=i.$Wp;1===t.$Ev(r)&&f.$f22.$mA(r,r.$f6)}}(this,f),null!==t){u=f.$bYj();for(var T=!1,p=f.$dYj();p.$Kp;p.$tu()){var C=p.$Vp;t.$Ck(C.$f2)!==t.$Ck(C.$f3)?(u.$Kk(C,!0),a.$scj(C),T=!0):u.$Kk(C,!1)}T||(f.$bjk(u),u=null);for(var c=f.$eYj();c.$Kp;c.$tu()){var m=c.$Wp;t.$Ck(m)&&(v.$gA(r.$Ev(m),m),n.$ucj(m),o.$Kk(m,!0),s.$gA(m,i.$Ev(m)),_.$gA(m,r.$Ev(m)),E.$gA(m,e.$Ev(m)))}null!==t&&f.$Epk($.T.ZXA.GROUP_DP_KEY),null!==i&&f.$Epk($.T.ZXA.PARENT_NODE_ID_DP_KEY),null!==r&&f.$Epk($.T.ZXA.NODE_ID_DP_KEY),null!==e&&f.$Epk($.T.ZXA.GROUP_NODE_INSETS_DP_KEY)}var K=new $.T.ENC.T1(this);if(l(this,f,K),null!==t){var D=new $.C.AYA(f);for(c=f.$eYj();c.$Kp;c.$tu()){m=c.$Wp;if(D.$Ohk(m)){var Y=new $.FE;o.$Kk(m,!1);for(var j=D.$Mhk(m).$m3();j.$p;){var w=j.$m(),P=i.$Ev(w);if(null!==P){for(var g=0;g<Y.$ki;g++)if(P===i.$Ev(Y.$ni(g))){P=null;break}null!==P&&Y.$m(w)}}if(0===Y.$ki){w=D.$Mhk(m).$wXj();s.$gA(m,i.$Ev(w)),_.$gA(m,r.$Ev(w))}else if(s.$gA(m,i.$Ev(Y.$ni(0))),_.$gA(m,r.$Ev(Y.$ni(0))),Y.$ki>1){for(var N=0;N<Y.$ki;N++)for(var I=v.$Ev(i.$Ev(Y.$ni(N))),X=0;X<Y.$ki;X++){var O=v.$Ev(i.$Ev(Y.$ni(X)));h.equals(r.$Ev(O),i.$Ev(I))&&Y.$m2(X)}if(s.$gA(m,i.$Ev(Y.$ni(0))),_.$gA(m,r.$Ev(Y.$ni(0))),1===Y.$ki);else{null===A&&(A=new $.C.FXA.$r);var d=f.$RXj();A.$m5(d),o.$Kk(d,!0),_.$gA(d,d);for(g=1;g<Y.$ki;g++)for(var F=Y.$ni(0),R=!1;null!==F;){for(var L=v.$Ev(i.$Ev(F)),y=Y.$ni(g);null!==y;){var G=v.$Ev(i.$Ev(y));if(G===L){if(Y.$ni(0)!==F)for(var M=0;M<g;M++)Y.$qi(M,F);Y.$qi(g,y),R=!0;break}y=G}if(R)break;for(M=0;M<g;M++)Y.$qi(M,F);F=L}for(g=0;g<Y.$ki;g++)s.$gA(Y.$ni(g),d);s.$gA(d,i.$Ev(Y.$ni(0))),n.$ucj(d)}}}else o.$Kk(m,!1),s.$gA(m,i.$Ev(m)),_.$gA(m,r.$Ev(m))}D.$dWj()}var b=new $.T.ENC.T2(this,this.$wb),V=new $.T.ENC.T4(n,t,o,s,_,E,b),W=new $.C.AKC;W.$nr=V;var S=new $.C.VIC(W,null);S.$Psj=this.$m1();try{new $.T.ENC.T3(this,S,K,b).$Bw(f)}finally{!function(f,n){null!==f.$f16&&(n.$Epk($.T.ILC.SOURCE_GROUP_ID_DP_KEY),n.$bjk(f.$f16),f.$f16=null),null!==f.$f17&&(n.$Epk($.T.ILC.TARGET_GROUP_ID_DP_KEY),n.$bjk(f.$f17),f.$f17=null),null!==f.$f3&&(n.$Epk($.T.ILC.SOURCE_PORT_CONSTRAINT_DP_KEY),n.$bjk(f.$f3),f.$f3=null),null!==f.$f4&&(n.$Epk($.T.ILC.TARGET_PORT_CONSTRAINT_DP_KEY),n.$bjk(f.$f4),f.$f4=null),null!==f.$f8&&(n.$Epk($.T.ZXA.GROUP_NODE_INSETS_DP_KEY),n.$cjk(f.$f8),f.$f8=null),null!==f.$f9&&(n.$Epk($.T.AKC.LAYOUT_DP_KEY),n.$cjk(f.$f9),f.$f9=null),null!==f.$f2&&(n.$Epk($.T.ZXA.NODE_ID_DP_KEY),n.$cjk(f.$f2),f.$f2=null),null!==f.$f15&&(n.$Epk($.T.ZXA.PARENT_NODE_ID_DP_KEY),n.$cjk(f.$f15),f.$f15=null),null!==f.$f6&&(n.$Epk($.T.ZXA.GROUP_DP_KEY),n.$cjk(f.$f6),f.$f6=null),null!==f.$f&&(f.$f.$Ru(),f.$f=null),f.$f19=null}(this,f),null!==t&&f.$sAk($.T.ZXA.GROUP_DP_KEY,t),null!==i&&f.$sAk($.T.ZXA.PARENT_NODE_ID_DP_KEY,i),null!==r&&f.$sAk($.T.ZXA.NODE_ID_DP_KEY,r),null!==e&&f.$sAk($.T.ZXA.GROUP_NODE_INSETS_DP_KEY,e)}if(n.$AXj(),null!==A){for(g=0;g<A.$f1;g++)f.$Sfj(A.$ni(g));A=null}if(a.$AXj(),null!==this.$f1)for(g=0;g<this.$f1.$ki;g++)f.$Sfj(this.$f11.$ni(g));if(null!==u){f.$sAk($.T.ZSC.AFFECTED_EDGES_DP_KEY,u);var B=new $.C.ETC;B.$WEj=$.T.ZSC.AFFECTED_EDGES_DP_KEY;try{B.$Bw(f)}finally{f.$Epk($.T.ZSC.AFFECTED_EDGES_DP_KEY),f.$bjk(u)}}},$f5:null,$f1:null,$f11:null,$static:{FAMILY_TYPE_DP_KEY:null,T2:new E(function(){return{$extends:$.C.BKC,$final:!0,constructor:function(f,n){$.C.BKC.call(this,n),this.$f=f,this.$f1=$.T.XXA.$C()},$f1:null,"$m!":function($){return this.$f1.$Ev($)},"$Bw!":function($){if(this.$nr.$Bw($),this.$f.$m1())for(var f=$.$eYj();f.$Kp;f.$tu())for(var n=f.$Wp.$hkk(null);n.$Kp;n.$tu()){var t=n.$Vp;this.$f1.$gA(t,$.$ypk(t))}},$f:null}}),T3:new E(function(){return{$extends:$.C.BKC,$final:!0,constructor:function(f,n,t,i){$.C.BKC.call(this,n),this.$f=f,this.$f2=t,this.$f1=i},$f2:null,$f1:null,"$Bw!":function(f){if(this.$f.$m1()){var n=new $.C.AYA(f),t=$.T.XXA.$D();!function(f,n,t,i){for(var l=t.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY),e=f.$f.$f11.$VVj();e.$Kp;e.$tu()){var a=e.$Wp,u=n.$Mhk(a);if(r(0,u,l)){i.$Kk(a,!0);for(var o=u.$VVj();o.$Kp;o.$tu()){var s=o.$Wp;if(1!==l.$Ev(s))for(var _=s.$hkk(null);_.$Kp;_.$tu())f.$f.$f4.$gA(_.$Vp,null)}}}}(this,n,f,t),this.$nr.$Bw(f),function(f,n,t,i,r){for(var l=n.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY),e=f.$f.$f11.$VVj();e.$Kp;e.$tu()){var a=e.$Wp;if(i.$Ck(a)){for(var u=t.$Mhk(a),o=null,s=null,_=u.$VVj();_.$Kp;_.$tu()){var E=_.$Wp;1!==l.$Ev(E)&&E.$f6>0&&(null===o?o=E:s=E)}if(null!==o&&null!==s){var v=n.$sgj(o),A=n.$sgj(s),h=r.$m(o.$f11).$f,T=r.$m(s.$f11).$f;if(v>A&&h<T||v<A&&h>T){var p=n.$Xkk(a);for(_=u.$VVj();_.$Kp;_.$tu()){E=_.$Wp;var C=p.$f+p.$f3-(n.$sgj(E)-p.$f);n.$cCk(E,C,n.$tgj(E))}}}}}}(this,f,n,t,this.$f1),function(f,n,t,i){for(var r=n.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY),l=f.$f.$f11.$VVj();l.$Kp;l.$tu()){var e=l.$Wp;if(i.$Ck(e))for(var a=t.$Mhk(e).$VVj();a.$Kp;a.$tu()){var u=a.$Wp;if(1!==r.$Ev(u))for(var o=u.$hkk(null);o.$Kp;o.$tu()){var s=o.$Vp;n.$yBk(s,new $.C.GWA.$s(0,-n.$m38(u).$tr/2)),f.$f.$f4.$gA(s,$.T.GLC.$s(1,!0))}}}}(this,f,n,t),f.$sAk($.T.ZXA.GROUP_NODE_INSETS_DP_KEY,this.$f.$f8);var i=this.$f1.$nr;i.$Ne=0,this.$f2.$f1=!0,this.$nr.$Bw(f),i.$Ne=1,this.$f2.$f1=!1,f.$Epk($.T.KOC.INCREMENTAL_HINTS_DP_KEY),n.$dWj()}else this.$nr.$Bw(f)},$f:null}}),T4:new E(function(){return{$extends:$.C.BKC,$final:!0,constructor:function(f,n,t,i,r,l,e){$.C.BKC.call(this,e),this.$f=f,this.$f1=n,this.$f2=t,this.$f5=i,this.$f4=r,this.$f3=l},"$Bw!":function(f){var n=new $.C.FXA.$s(this.$f.$zaj());this.$f.$AXj(),null!==this.$f1&&(f.$sAk($.T.ZXA.GROUP_DP_KEY,this.$f2),f.$sAk($.T.ZXA.PARENT_NODE_ID_DP_KEY,this.$f5),f.$sAk($.T.ZXA.NODE_ID_DP_KEY,this.$f4),f.$sAk($.T.ZXA.GROUP_NODE_INSETS_DP_KEY,this.$f3)),this.$TSk(f),this.$f.$vcj(n),f.$Epk($.T.ZXA.GROUP_DP_KEY),f.$Epk($.T.ZXA.PARENT_NODE_ID_DP_KEY),f.$Epk($.T.ZXA.NODE_ID_DP_KEY),f.$Epk($.T.ZXA.GROUP_NODE_INSETS_DP_KEY)},$f:null,$f1:null,$f2:null,$f5:null,$f4:null,$f3:null}}),T:new E(function(){return{$final:!0,constructor:function($,f){this.$f1=$,this.$f=f},$f1:null,$f:null,"equals!":function($){if(this===$)return!0;if(null===$||f.lang.getType(this)!==f.lang.getType($))return!1;var n=$;return this.$f===n.$f&&this.$f1===n.$f1},"hashCode!":function(){var $=this.$f1.hashCode();return $=31*$+this.$f.hashCode()}}}),T1:new E(function(){return{$final:!0,$with:[$.C.GJC],constructor:function(f){this.$f=f,this.$f1=!1,this.$f3=$.T.XXA.$D(),this.$f2=new $.T.ENC.T1.T(this,this.$f3,this.$f.$f21)},$f1:!1,$f2:null,$f3:null,"$Bw!":function(f){if(1!==f.$oY){if(2===f.$oY&&this.$f.$f10&&this.$f.$f22.$Kv(f.$nY)<2&&this.$f.$f22.$Kv(f.$gV)<2){for(var n=null,t=null,i=f.$eYj();i.$Kp;i.$tu()){var r=i.$Wp;1!==f.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY).$Ev(r)?n=r:t=r}if(null!==n&&null!==t){var l=f.$m38(n),e=f.$m38(t);l.$sC(-l.$Xq/2,0),e.$sC(-e.$Xq/2,l.$tr+this.$f.$f14);for(var a=t.$hkk(null);a.$Kp;a.$tu()){var u=a.$Vp;($$=f.$m37(u)).$fu(),$$.$Gs=new $.C.GWA.$s(0,0),$$.$Hs=new $.C.GWA.$s(0,0)}var o=this.$f.$f8.$Ev(n),s=new $.C.XVA(o.top,o.left,-this.$f.$f14-f.$m38(t).$tr,o.right);return void this.$f.$f8.$gA(n,s)}}var E=new $.C.FXA.$r;if(this.$f1)E.$Scj(f.$eYj()),E.$wcj(new $.T.ENC.T1.T1(this,f));else{var v=new $.C.FXA.$r,A=new $.C.FXA.$r;for(i=f.$eYj();i.$Kp;i.$tu()){r=i.$Wp;1!==f.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY).$Ev(r)?v.$m5(r):A.$m5(r)}for(var h=null,T=0,p=0;p<v.$f1;p++){(x=v.$ni(p)).$uaj().$Up>T&&(T=x.$uaj().$Up,h=x)}v.$Io(h),E.$m5(h),function f(n,t,i,r,l){for(var e=new $.C.FXA.$r,a=l.$uaj();a.$Kp;a.$tu()){var u=a.$Wp;if(i.$Io(u)){var o=_(n,u,l,new $.C.FXA.$t(l));n.$f3.$mA(u,o),e.$m5(u)}}e.$wcj(n.$f2);var s=l.$f2.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY),E=!1;if(1===e.$f1&&r.indexOf(l)===r.$f1-1&&(E=!0),2===n.$f.$f20||4===n.$f.$f20)for(var v=0;v<e.$f1;v++)4===n.$f.$f20===(2===s.$Ev(l))?r.$m5(e.$ni(v)):r.$Mo(0,e.$ni(v));else if(0!==n.$f.$f20&&1===r.$f1&&1===e.$f1)3===n.$f.$f20===(2===s.$Ev(l))?r.$m5(e.$ni(0)):r.$Mo(0,e.$ni(0));else{var A=r.indexOf(l),h=r.indexOf(l)+1;for(v=0;v<e.$f1;v++)v%2!==0||E?r.$Mo(h,e.$ni(v)):r.$Mo(A,e.$ni(v)),h++}var T=new $.C.FXA.$r;for(v=0;v<e.$f1;v++){for(var p=!1,C=null,k=(u=e.$ni(v)).$Eaj();k.$Kp;k.$tu())if((C=k.$Wp)!==l){p=!0;break}if(t.$Io(C)){T.$m5(C);var c=r.indexOf(u);r.indexOf(l)>c?r.$Mo(r.indexOf(u),C):r.$Mo(r.indexOf(u)+1,C)}else if(p){var m=0;for(r.$Io(u),k=u.$Eaj();k.$Kp;k.$tu())m=Math.max(r.indexOf(k.$Wp),m);r.$Mo(m,u)}}e=null;for(v=0;v<T.$f1;v++)f(n,t,i,r,T.$ni(v))}(this,v,A,E,h)}var C=new $.C.FXA.$r,k=new $.C.FXA.$r,c=new $.FE,m=0,K=0,D=Number.MAX_VALUE;for(p=0;p<E.$f1;p++){r=E.$ni(p);var Y=f.$m38(r);1===f.$ekk($.T.ENC.FAMILY_TYPE_DP_KEY).$Ev(r)?(C.$m5(r),c.$m(p),Y.$sC(m+Math.max((this.$f.$f13-Y.$Xq)/2,Y.$Xq/4),-Y.$tr/2),m=m+Math.max(1.5*Y.$Xq,this.$f.$f13)|0):(k.$m5(r),D=Math.min(Y.$tr,D),K=Math.max(Y.$tr,K),Y.$sC(m,-Y.$tr/2),m=m+Y.$Xq|0)}if(0!==this.$f.$f7)for(p=0;p<k.$f1;p++){Y=f.$m38(k.$ni(p));1===this.$f.$f7?Y.$sC(Y.$Ip,-(Y.$tr-D/2)):Y.$sC(Y.$Ip,-D/2)}var j=$.DF.$m10(E.$f1),w=-2;for(p=0;p<C.$f1;p++){var P=C.$ni(p),g=!1,N=$.VE.$m8(c.$ni(p));if(this.$f.$f18||w===N-1&&0===j[w])g=!0;else for(var I=P.$Eaj();I.$Kp;I.$tu()){var X=I.$Wp,O=E.indexOf(X)-N;if(Math.abs(O)>2){g=!0;break}}if(g)j[N]=1;else{var d=new $.C.GWA.$s(0,0);for(a=P.$hkk(null);a.$Kp;a.$tu()){u=a.$Vp;if(($$=f.$m37(u)).$fu(),0===this.$f.$f7)$$.$Gs=d;else{Y=f.$m38(u.$f2);f.$vBk(u,new $.C.GWA.$s(Y.$Ip+Y.$Xq/2,0))}$$.$Hs=d}C.$m8(p),c.$m2(p),p--}w=N}var F,R=K/2;1===this.$f.$f7?R=D/2:-1===this.$f.$f7&&(R=K-D/2),F=R;for(p=0;p<C.$f1;p++){P=C.$ni(p);for(var L=$.VE.$m8(c.$ni(p)),y=0,G=P.$Eaj();G.$Kp;G.$tu()){for(var M=E.indexOf(G.$Wp),b=Math.min(L,M),V=Math.max(L,M),W=0,S=b;S<=V;S++)W+=j[S];y=Math.max(W,y)}Y=f.$m38(P);var B=R+this.$f.$f14+(Y.$tr+this.$f.$f14)*(y-1);Y.$sC(Y.$Ip,B),F=Math.max(F,B+Y.$tr)}for(var Z=0;Z<k.$f1;Z++){var x=k.$ni(Z),U=E.indexOf(x),q=0,H=new $.C.JVA.$r;for(a=x.$emk(null);a.$Kp;a.$tu()){u=a.$Vp;j[E.indexOf(u.$f3)]>0&&(H.$m5(u),q++)}if(q>0){var J=f.$m38(x).$Xq/(q+1),z=$.DF.$m10(H.$f1),Q=$.DF.$m10(H.$f1);for(p=0;p<H.$f1;p++){z[p]=E.indexOf(H.$ni(p).$f3)-U,z[p]>0&&(z[p]-=2*E.$f1),Q[p]=J;for(S=0;S<p;S++)z[p]>z[S]?Q[S]+=J:Q[p]+=J}for(p=0;p<H.$f1;p++){var $$;u=H.$ni(p);($$=f.$m37(u)).$fu(),$$.$Hs=new $.C.GWA.$s(0,0);var f$=f.$m38(x),n$=f.$m38(u.$f3),t$=this.$f.$f19.$wj(u)?f$.$Xq/2:Q[p],i$=n$.$Jp+n$.$tr/2;$$.$Gs=new $.C.GWA.$s(t$-f$.$Xq/2,0),$$.$IB(f$.$Ip+t$,i$)}}}var r$=(o=this.$f.$f8.$Ev(k.$ni(0))).top,l$=o.bottom;null!==o&&0===this.$f.$f7?r$=F-R:null!==o&&1===this.$f.$f7&&(l$=R-F),this.$f.$f8.$gA(k.$ni(0),new $.C.XVA(r$,o.left,l$,o.right))}},$f:null,$static:{T:new E(function(){return{$final:!0,$with:[$.C.RYA],constructor:function($,f,n){this.$f1=$,this.$f=f,this.$f2=n},$f:null,$f2:null,"$No!":function(f,n){var t=$.T.RXA.$m(this.$f.$Kv(f),this.$f.$Kv(n));return 0!==t?t:$.T.RXA.$m(this.$f2.$Kv(f),this.$f2.$Kv(n))},$f1:null}}),T1:new E(function(){return{$final:!0,$with:[$.C.RYA],constructor:function($,f){this.$f1=$,this.$f=f},$f:null,"$No!":function(f,n){return $.T.RXA.$z(this.$f.$sgj(f),this.$f.$sgj(n))},$f1:null}})}}}),$clinit:function(){$.T.ENC.FAMILY_TYPE_DP_KEY=new $.C.HVA($.C.FNC.$class,$.C.ENC.$class,k[3])}}}})}),A("_$$_ota",function($){$._$_djn=new v(function(){return{FAMILY:1,MALE:2,FEMALE:3}})}),A("_$$_ota",function($){$._$_ejn=new v(function(){return{TOP:-1,CENTER:0,BOTTOM:1}})}),A("_$$_ota",function($){$._$_fjn=new v(function(){return{NO_SORTING:0,FEMALE_FIRST:1,FEMALE_ALWAYS_FIRST:2,MALE_FIRST:3,MALE_ALWAYS_FIRST:4}})})}(y.lang.module("yfiles._R"),y,"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self);export default y;
