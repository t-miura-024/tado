(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const f of l.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function n(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(a){if(a.ep)return;a.ep=!0;const l=n(a);fetch(a.href,l)}})();function Zm(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var wu={exports:{}},No={},Tu={exports:{}},pt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var np;function y_(){if(np)return pt;np=1;var r=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),f=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),h=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),y=Symbol.iterator;function v(D){return D===null||typeof D!="object"?null:(D=y&&D[y]||D["@@iterator"],typeof D=="function"?D:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},w=Object.assign,E={};function x(D,q,Z){this.props=D,this.context=q,this.refs=E,this.updater=Z||S}x.prototype.isReactComponent={},x.prototype.setState=function(D,q){if(typeof D!="object"&&typeof D!="function"&&D!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,D,q,"setState")},x.prototype.forceUpdate=function(D){this.updater.enqueueForceUpdate(this,D,"forceUpdate")};function g(){}g.prototype=x.prototype;function L(D,q,Z){this.props=D,this.context=q,this.refs=E,this.updater=Z||S}var C=L.prototype=new g;C.constructor=L,w(C,x.prototype),C.isPureReactComponent=!0;var N=Array.isArray,j=Object.prototype.hasOwnProperty,I={current:null},F={key:!0,ref:!0,__self:!0,__source:!0};function fe(D,q,Z){var ue,ge={},Ee=null,be=null;if(q!=null)for(ue in q.ref!==void 0&&(be=q.ref),q.key!==void 0&&(Ee=""+q.key),q)j.call(q,ue)&&!F.hasOwnProperty(ue)&&(ge[ue]=q[ue]);var Ce=arguments.length-2;if(Ce===1)ge.children=Z;else if(1<Ce){for(var Ie=Array(Ce),He=0;He<Ce;He++)Ie[He]=arguments[He+2];ge.children=Ie}if(D&&D.defaultProps)for(ue in Ce=D.defaultProps,Ce)ge[ue]===void 0&&(ge[ue]=Ce[ue]);return{$$typeof:r,type:D,key:Ee,ref:be,props:ge,_owner:I.current}}function T(D,q){return{$$typeof:r,type:D.type,key:q,ref:D.ref,props:D.props,_owner:D._owner}}function A(D){return typeof D=="object"&&D!==null&&D.$$typeof===r}function K(D){var q={"=":"=0",":":"=2"};return"$"+D.replace(/[=:]/g,function(Z){return q[Z]})}var $=/\/+/g;function pe(D,q){return typeof D=="object"&&D!==null&&D.key!=null?K(""+D.key):q.toString(36)}function k(D,q,Z,ue,ge){var Ee=typeof D;(Ee==="undefined"||Ee==="boolean")&&(D=null);var be=!1;if(D===null)be=!0;else switch(Ee){case"string":case"number":be=!0;break;case"object":switch(D.$$typeof){case r:case e:be=!0}}if(be)return be=D,ge=ge(be),D=ue===""?"."+pe(be,0):ue,N(ge)?(Z="",D!=null&&(Z=D.replace($,"$&/")+"/"),k(ge,q,Z,"",function(He){return He})):ge!=null&&(A(ge)&&(ge=T(ge,Z+(!ge.key||be&&be.key===ge.key?"":(""+ge.key).replace($,"$&/")+"/")+D)),q.push(ge)),1;if(be=0,ue=ue===""?".":ue+":",N(D))for(var Ce=0;Ce<D.length;Ce++){Ee=D[Ce];var Ie=ue+pe(Ee,Ce);be+=k(Ee,q,Z,Ie,ge)}else if(Ie=v(D),typeof Ie=="function")for(D=Ie.call(D),Ce=0;!(Ee=D.next()).done;)Ee=Ee.value,Ie=ue+pe(Ee,Ce++),be+=k(Ee,q,Z,Ie,ge);else if(Ee==="object")throw q=String(D),Error("Objects are not valid as a React child (found: "+(q==="[object Object]"?"object with keys {"+Object.keys(D).join(", ")+"}":q)+"). If you meant to render a collection of children, use an array instead.");return be}function te(D,q,Z){if(D==null)return D;var ue=[],ge=0;return k(D,ue,"","",function(Ee){return q.call(Z,Ee,ge++)}),ue}function re(D){if(D._status===-1){var q=D._result;q=q(),q.then(function(Z){(D._status===0||D._status===-1)&&(D._status=1,D._result=Z)},function(Z){(D._status===0||D._status===-1)&&(D._status=2,D._result=Z)}),D._status===-1&&(D._status=0,D._result=q)}if(D._status===1)return D._result.default;throw D._result}var le={current:null},V={transition:null},z={ReactCurrentDispatcher:le,ReactCurrentBatchConfig:V,ReactCurrentOwner:I};function Y(){throw Error("act(...) is not supported in production builds of React.")}return pt.Children={map:te,forEach:function(D,q,Z){te(D,function(){q.apply(this,arguments)},Z)},count:function(D){var q=0;return te(D,function(){q++}),q},toArray:function(D){return te(D,function(q){return q})||[]},only:function(D){if(!A(D))throw Error("React.Children.only expected to receive a single React element child.");return D}},pt.Component=x,pt.Fragment=n,pt.Profiler=a,pt.PureComponent=L,pt.StrictMode=s,pt.Suspense=h,pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=z,pt.act=Y,pt.cloneElement=function(D,q,Z){if(D==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+D+".");var ue=w({},D.props),ge=D.key,Ee=D.ref,be=D._owner;if(q!=null){if(q.ref!==void 0&&(Ee=q.ref,be=I.current),q.key!==void 0&&(ge=""+q.key),D.type&&D.type.defaultProps)var Ce=D.type.defaultProps;for(Ie in q)j.call(q,Ie)&&!F.hasOwnProperty(Ie)&&(ue[Ie]=q[Ie]===void 0&&Ce!==void 0?Ce[Ie]:q[Ie])}var Ie=arguments.length-2;if(Ie===1)ue.children=Z;else if(1<Ie){Ce=Array(Ie);for(var He=0;He<Ie;He++)Ce[He]=arguments[He+2];ue.children=Ce}return{$$typeof:r,type:D.type,key:ge,ref:Ee,props:ue,_owner:be}},pt.createContext=function(D){return D={$$typeof:f,_currentValue:D,_currentValue2:D,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},D.Provider={$$typeof:l,_context:D},D.Consumer=D},pt.createElement=fe,pt.createFactory=function(D){var q=fe.bind(null,D);return q.type=D,q},pt.createRef=function(){return{current:null}},pt.forwardRef=function(D){return{$$typeof:u,render:D}},pt.isValidElement=A,pt.lazy=function(D){return{$$typeof:_,_payload:{_status:-1,_result:D},_init:re}},pt.memo=function(D,q){return{$$typeof:m,type:D,compare:q===void 0?null:q}},pt.startTransition=function(D){var q=V.transition;V.transition={};try{D()}finally{V.transition=q}},pt.unstable_act=Y,pt.useCallback=function(D,q){return le.current.useCallback(D,q)},pt.useContext=function(D){return le.current.useContext(D)},pt.useDebugValue=function(){},pt.useDeferredValue=function(D){return le.current.useDeferredValue(D)},pt.useEffect=function(D,q){return le.current.useEffect(D,q)},pt.useId=function(){return le.current.useId()},pt.useImperativeHandle=function(D,q,Z){return le.current.useImperativeHandle(D,q,Z)},pt.useInsertionEffect=function(D,q){return le.current.useInsertionEffect(D,q)},pt.useLayoutEffect=function(D,q){return le.current.useLayoutEffect(D,q)},pt.useMemo=function(D,q){return le.current.useMemo(D,q)},pt.useReducer=function(D,q,Z){return le.current.useReducer(D,q,Z)},pt.useRef=function(D){return le.current.useRef(D)},pt.useState=function(D){return le.current.useState(D)},pt.useSyncExternalStore=function(D,q,Z){return le.current.useSyncExternalStore(D,q,Z)},pt.useTransition=function(){return le.current.useTransition()},pt.version="18.3.1",pt}var ip;function Tf(){return ip||(ip=1,Tu.exports=y_()),Tu.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rp;function S_(){if(rp)return No;rp=1;var r=Tf(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,a=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function f(u,h,m){var _,y={},v=null,S=null;m!==void 0&&(v=""+m),h.key!==void 0&&(v=""+h.key),h.ref!==void 0&&(S=h.ref);for(_ in h)s.call(h,_)&&!l.hasOwnProperty(_)&&(y[_]=h[_]);if(u&&u.defaultProps)for(_ in h=u.defaultProps,h)y[_]===void 0&&(y[_]=h[_]);return{$$typeof:e,type:u,key:v,ref:S,props:y,_owner:a.current}}return No.Fragment=n,No.jsx=f,No.jsxs=f,No}var sp;function M_(){return sp||(sp=1,wu.exports=S_()),wu.exports}var O=M_(),ze=Tf();const E_=Zm(ze);var nl={},Au={exports:{}},Ln={},bu={exports:{}},Cu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var op;function w_(){return op||(op=1,(function(r){function e(V,z){var Y=V.length;V.push(z);e:for(;0<Y;){var D=Y-1>>>1,q=V[D];if(0<a(q,z))V[D]=z,V[Y]=q,Y=D;else break e}}function n(V){return V.length===0?null:V[0]}function s(V){if(V.length===0)return null;var z=V[0],Y=V.pop();if(Y!==z){V[0]=Y;e:for(var D=0,q=V.length,Z=q>>>1;D<Z;){var ue=2*(D+1)-1,ge=V[ue],Ee=ue+1,be=V[Ee];if(0>a(ge,Y))Ee<q&&0>a(be,ge)?(V[D]=be,V[Ee]=Y,D=Ee):(V[D]=ge,V[ue]=Y,D=ue);else if(Ee<q&&0>a(be,Y))V[D]=be,V[Ee]=Y,D=Ee;else break e}}return z}function a(V,z){var Y=V.sortIndex-z.sortIndex;return Y!==0?Y:V.id-z.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;r.unstable_now=function(){return l.now()}}else{var f=Date,u=f.now();r.unstable_now=function(){return f.now()-u}}var h=[],m=[],_=1,y=null,v=3,S=!1,w=!1,E=!1,x=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,L=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function C(V){for(var z=n(m);z!==null;){if(z.callback===null)s(m);else if(z.startTime<=V)s(m),z.sortIndex=z.expirationTime,e(h,z);else break;z=n(m)}}function N(V){if(E=!1,C(V),!w)if(n(h)!==null)w=!0,re(j);else{var z=n(m);z!==null&&le(N,z.startTime-V)}}function j(V,z){w=!1,E&&(E=!1,g(fe),fe=-1),S=!0;var Y=v;try{for(C(z),y=n(h);y!==null&&(!(y.expirationTime>z)||V&&!K());){var D=y.callback;if(typeof D=="function"){y.callback=null,v=y.priorityLevel;var q=D(y.expirationTime<=z);z=r.unstable_now(),typeof q=="function"?y.callback=q:y===n(h)&&s(h),C(z)}else s(h);y=n(h)}if(y!==null)var Z=!0;else{var ue=n(m);ue!==null&&le(N,ue.startTime-z),Z=!1}return Z}finally{y=null,v=Y,S=!1}}var I=!1,F=null,fe=-1,T=5,A=-1;function K(){return!(r.unstable_now()-A<T)}function $(){if(F!==null){var V=r.unstable_now();A=V;var z=!0;try{z=F(!0,V)}finally{z?pe():(I=!1,F=null)}}else I=!1}var pe;if(typeof L=="function")pe=function(){L($)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,te=k.port2;k.port1.onmessage=$,pe=function(){te.postMessage(null)}}else pe=function(){x($,0)};function re(V){F=V,I||(I=!0,pe())}function le(V,z){fe=x(function(){V(r.unstable_now())},z)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(V){V.callback=null},r.unstable_continueExecution=function(){w||S||(w=!0,re(j))},r.unstable_forceFrameRate=function(V){0>V||125<V?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<V?Math.floor(1e3/V):5},r.unstable_getCurrentPriorityLevel=function(){return v},r.unstable_getFirstCallbackNode=function(){return n(h)},r.unstable_next=function(V){switch(v){case 1:case 2:case 3:var z=3;break;default:z=v}var Y=v;v=z;try{return V()}finally{v=Y}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(V,z){switch(V){case 1:case 2:case 3:case 4:case 5:break;default:V=3}var Y=v;v=V;try{return z()}finally{v=Y}},r.unstable_scheduleCallback=function(V,z,Y){var D=r.unstable_now();switch(typeof Y=="object"&&Y!==null?(Y=Y.delay,Y=typeof Y=="number"&&0<Y?D+Y:D):Y=D,V){case 1:var q=-1;break;case 2:q=250;break;case 5:q=1073741823;break;case 4:q=1e4;break;default:q=5e3}return q=Y+q,V={id:_++,callback:z,priorityLevel:V,startTime:Y,expirationTime:q,sortIndex:-1},Y>D?(V.sortIndex=Y,e(m,V),n(h)===null&&V===n(m)&&(E?(g(fe),fe=-1):E=!0,le(N,Y-D))):(V.sortIndex=q,e(h,V),w||S||(w=!0,re(j))),V},r.unstable_shouldYield=K,r.unstable_wrapCallback=function(V){var z=v;return function(){var Y=v;v=z;try{return V.apply(this,arguments)}finally{v=Y}}}})(Cu)),Cu}var ap;function T_(){return ap||(ap=1,bu.exports=w_()),bu.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lp;function A_(){if(lp)return Ln;lp=1;var r=Tf(),e=T_();function n(t){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,a={};function l(t,i){f(t,i),f(t+"Capture",i)}function f(t,i){for(a[t]=i,t=0;t<i.length;t++)s.add(i[t])}var u=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),h=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,_={},y={};function v(t){return h.call(y,t)?!0:h.call(_,t)?!1:m.test(t)?y[t]=!0:(_[t]=!0,!1)}function S(t,i,o,c){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function w(t,i,o,c){if(i===null||typeof i>"u"||S(t,i,o,c))return!0;if(c)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function E(t,i,o,c,d,p,M){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=d,this.mustUseProperty=o,this.propertyName=t,this.type=i,this.sanitizeURL=p,this.removeEmptyString=M}var x={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){x[t]=new E(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var i=t[0];x[i]=new E(i,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){x[t]=new E(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){x[t]=new E(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){x[t]=new E(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){x[t]=new E(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){x[t]=new E(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){x[t]=new E(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){x[t]=new E(t,5,!1,t.toLowerCase(),null,!1,!1)});var g=/[\-:]([a-z])/g;function L(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var i=t.replace(g,L);x[i]=new E(i,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var i=t.replace(g,L);x[i]=new E(i,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var i=t.replace(g,L);x[i]=new E(i,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){x[t]=new E(t,1,!1,t.toLowerCase(),null,!1,!1)}),x.xlinkHref=new E("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){x[t]=new E(t,1,!1,t.toLowerCase(),null,!0,!0)});function C(t,i,o,c){var d=x.hasOwnProperty(i)?x[i]:null;(d!==null?d.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(w(i,o,d,c)&&(o=null),c||d===null?v(i)&&(o===null?t.removeAttribute(i):t.setAttribute(i,""+o)):d.mustUseProperty?t[d.propertyName]=o===null?d.type===3?!1:"":o:(i=d.attributeName,c=d.attributeNamespace,o===null?t.removeAttribute(i):(d=d.type,o=d===3||d===4&&o===!0?"":""+o,c?t.setAttributeNS(c,i,o):t.setAttribute(i,o))))}var N=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,j=Symbol.for("react.element"),I=Symbol.for("react.portal"),F=Symbol.for("react.fragment"),fe=Symbol.for("react.strict_mode"),T=Symbol.for("react.profiler"),A=Symbol.for("react.provider"),K=Symbol.for("react.context"),$=Symbol.for("react.forward_ref"),pe=Symbol.for("react.suspense"),k=Symbol.for("react.suspense_list"),te=Symbol.for("react.memo"),re=Symbol.for("react.lazy"),le=Symbol.for("react.offscreen"),V=Symbol.iterator;function z(t){return t===null||typeof t!="object"?null:(t=V&&t[V]||t["@@iterator"],typeof t=="function"?t:null)}var Y=Object.assign,D;function q(t){if(D===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);D=i&&i[1]||""}return`
`+D+t}var Z=!1;function ue(t,i){if(!t||Z)return"";Z=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(oe){var c=oe}Reflect.construct(t,[],i)}else{try{i.call()}catch(oe){c=oe}t.call(i.prototype)}else{try{throw Error()}catch(oe){c=oe}t()}}catch(oe){if(oe&&c&&typeof oe.stack=="string"){for(var d=oe.stack.split(`
`),p=c.stack.split(`
`),M=d.length-1,U=p.length-1;1<=M&&0<=U&&d[M]!==p[U];)U--;for(;1<=M&&0<=U;M--,U--)if(d[M]!==p[U]){if(M!==1||U!==1)do if(M--,U--,0>U||d[M]!==p[U]){var B=`
`+d[M].replace(" at new "," at ");return t.displayName&&B.includes("<anonymous>")&&(B=B.replace("<anonymous>",t.displayName)),B}while(1<=M&&0<=U);break}}}finally{Z=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?q(t):""}function ge(t){switch(t.tag){case 5:return q(t.type);case 16:return q("Lazy");case 13:return q("Suspense");case 19:return q("SuspenseList");case 0:case 2:case 15:return t=ue(t.type,!1),t;case 11:return t=ue(t.type.render,!1),t;case 1:return t=ue(t.type,!0),t;default:return""}}function Ee(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case F:return"Fragment";case I:return"Portal";case T:return"Profiler";case fe:return"StrictMode";case pe:return"Suspense";case k:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case K:return(t.displayName||"Context")+".Consumer";case A:return(t._context.displayName||"Context")+".Provider";case $:var i=t.render;return t=t.displayName,t||(t=i.displayName||i.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case te:return i=t.displayName||null,i!==null?i:Ee(t.type)||"Memo";case re:i=t._payload,t=t._init;try{return Ee(t(i))}catch{}}return null}function be(t){var i=t.type;switch(t.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=i.render,t=t.displayName||t.name||"",i.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ee(i);case 8:return i===fe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Ce(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ie(t){var i=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function He(t){var i=Ie(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,i),c=""+t[i];if(!t.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var d=o.get,p=o.set;return Object.defineProperty(t,i,{configurable:!0,get:function(){return d.call(this)},set:function(M){c=""+M,p.call(this,M)}}),Object.defineProperty(t,i,{enumerable:o.enumerable}),{getValue:function(){return c},setValue:function(M){c=""+M},stopTracking:function(){t._valueTracker=null,delete t[i]}}}}function Ge(t){t._valueTracker||(t._valueTracker=He(t))}function Q(t){if(!t)return!1;var i=t._valueTracker;if(!i)return!0;var o=i.getValue(),c="";return t&&(c=Ie(t)?t.checked?"true":"false":t.value),t=c,t!==o?(i.setValue(t),!0):!1}function Lt(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function qe(t,i){var o=i.checked;return Y({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function Fe(t,i){var o=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;o=Ce(i.value!=null?i.value:o),t._wrapperState={initialChecked:c,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function Be(t,i){i=i.checked,i!=null&&C(t,"checked",i,!1)}function St(t,i){Be(t,i);var o=Ce(i.value),c=i.type;if(o!=null)c==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(c==="submit"||c==="reset"){t.removeAttribute("value");return}i.hasOwnProperty("value")?P(t,i.type,o):i.hasOwnProperty("defaultValue")&&P(t,i.type,Ce(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(t.defaultChecked=!!i.defaultChecked)}function st(t,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+t._wrapperState.initialValue,o||i===t.value||(t.value=i),t.defaultValue=i}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function P(t,i,o){(i!=="number"||Lt(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var b=Array.isArray;function ne(t,i,o,c){if(t=t.options,i){i={};for(var d=0;d<o.length;d++)i["$"+o[d]]=!0;for(o=0;o<t.length;o++)d=i.hasOwnProperty("$"+t[o].value),t[o].selected!==d&&(t[o].selected=d),d&&c&&(t[o].defaultSelected=!0)}else{for(o=""+Ce(o),i=null,d=0;d<t.length;d++){if(t[d].value===o){t[d].selected=!0,c&&(t[d].defaultSelected=!0);return}i!==null||t[d].disabled||(i=t[d])}i!==null&&(i.selected=!0)}}function ye(t,i){if(i.dangerouslySetInnerHTML!=null)throw Error(n(91));return Y({},i,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function xe(t,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(n(92));if(b(o)){if(1<o.length)throw Error(n(93));o=o[0]}i=o}i==null&&(i=""),o=i}t._wrapperState={initialValue:Ce(o)}}function Me(t,i){var o=Ce(i.value),c=Ce(i.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),i.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),c!=null&&(t.defaultValue=""+c)}function H(t){var i=t.textContent;i===t._wrapperState.initialValue&&i!==""&&i!==null&&(t.value=i)}function X(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function he(t,i){return t==null||t==="http://www.w3.org/1999/xhtml"?X(i):t==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Te,we=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,c,d){MSApp.execUnsafeLocalFunction(function(){return t(i,o,c,d)})}:t})(function(t,i){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=i;else{for(Te=Te||document.createElement("div"),Te.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Te.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;i.firstChild;)t.appendChild(i.firstChild)}});function me(t,i){if(i){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=i;return}}t.textContent=i}var lt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ke=["Webkit","ms","Moz","O"];Object.keys(lt).forEach(function(t){Ke.forEach(function(i){i=i+t.charAt(0).toUpperCase()+t.substring(1),lt[i]=lt[t]})});function Ze(t,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||lt.hasOwnProperty(t)&&lt[t]?(""+i).trim():i+"px"}function Ye(t,i){t=t.style;for(var o in i)if(i.hasOwnProperty(o)){var c=o.indexOf("--")===0,d=Ze(o,i[o],c);o==="float"&&(o="cssFloat"),c?t.setProperty(o,d):t[o]=d}}var We=Y({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ot(t,i){if(i){if(We[t]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(n(137,t));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(n(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(n(61))}if(i.style!=null&&typeof i.style!="object")throw Error(n(62))}}function vt(t,i){if(t.indexOf("-")===-1)return typeof i.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ct=null;function ct(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Re=null,G=null,Pe=null;function Ne(t){if(t=vo(t)){if(typeof Re!="function")throw Error(n(280));var i=t.stateNode;i&&(i=va(i),Re(t.stateNode,t.type,i))}}function nt(t){G?Pe?Pe.push(t):Pe=[t]:G=t}function Qe(){if(G){var t=G,i=Pe;if(Pe=G=null,Ne(t),i)for(t=0;t<i.length;t++)Ne(i[t])}}function Et(t,i){return t(i)}function wt(){}var Bt=!1;function en(t,i,o){if(Bt)return t(i,o);Bt=!0;try{return Et(t,i,o)}finally{Bt=!1,(G!==null||Pe!==null)&&(wt(),Qe())}}function xt(t,i){var o=t.stateNode;if(o===null)return null;var c=va(o);if(c===null)return null;o=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(t=t.type,c=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!c;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(n(231,i,typeof o));return o}var Yt=!1;if(u)try{var un={};Object.defineProperty(un,"passive",{get:function(){Yt=!0}}),window.addEventListener("test",un,un),window.removeEventListener("test",un,un)}catch{Yt=!1}function Ko(t,i,o,c,d,p,M,U,B){var oe=Array.prototype.slice.call(arguments,3);try{i.apply(o,oe)}catch(_e){this.onError(_e)}}var wr=!1,Mi=null,Tr=!1,Wi=null,Zo={onError:function(t){wr=!0,Mi=t}};function Qo(t,i,o,c,d,p,M,U,B){wr=!1,Mi=null,Ko.apply(Zo,arguments)}function Xl(t,i,o,c,d,p,M,U,B){if(Qo.apply(this,arguments),wr){if(wr){var oe=Mi;wr=!1,Mi=null}else throw Error(n(198));Tr||(Tr=!0,Wi=oe)}}function Ei(t){var i=t,o=t;if(t.alternate)for(;i.return;)i=i.return;else{t=i;do i=t,(i.flags&4098)!==0&&(o=i.return),t=i.return;while(t)}return i.tag===3?o:null}function Jo(t){if(t.tag===13){var i=t.memoizedState;if(i===null&&(t=t.alternate,t!==null&&(i=t.memoizedState)),i!==null)return i.dehydrated}return null}function R(t){if(Ei(t)!==t)throw Error(n(188))}function ee(t){var i=t.alternate;if(!i){if(i=Ei(t),i===null)throw Error(n(188));return i!==t?null:t}for(var o=t,c=i;;){var d=o.return;if(d===null)break;var p=d.alternate;if(p===null){if(c=d.return,c!==null){o=c;continue}break}if(d.child===p.child){for(p=d.child;p;){if(p===o)return R(d),t;if(p===c)return R(d),i;p=p.sibling}throw Error(n(188))}if(o.return!==c.return)o=d,c=p;else{for(var M=!1,U=d.child;U;){if(U===o){M=!0,o=d,c=p;break}if(U===c){M=!0,c=d,o=p;break}U=U.sibling}if(!M){for(U=p.child;U;){if(U===o){M=!0,o=p,c=d;break}if(U===c){M=!0,c=p,o=d;break}U=U.sibling}if(!M)throw Error(n(189))}}if(o.alternate!==c)throw Error(n(190))}if(o.tag!==3)throw Error(n(188));return o.stateNode.current===o?t:i}function ce(t){return t=ee(t),t!==null?de(t):null}function de(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var i=de(t);if(i!==null)return i;t=t.sibling}return null}var ae=e.unstable_scheduleCallback,De=e.unstable_cancelCallback,$e=e.unstable_shouldYield,tt=e.unstable_requestPaint,Oe=e.unstable_now,ut=e.unstable_getCurrentPriorityLevel,rt=e.unstable_ImmediatePriority,at=e.unstable_UserBlockingPriority,Rt=e.unstable_NormalPriority,vn=e.unstable_LowPriority,Vt=e.unstable_IdlePriority,wn=null,gt=null;function dt(t){if(gt&&typeof gt.onCommitFiberRoot=="function")try{gt.onCommitFiberRoot(wn,t,void 0,(t.current.flags&128)===128)}catch{}}var _n=Math.clz32?Math.clz32:ea,Ft=Math.log,wi=Math.LN2;function ea(t){return t>>>=0,t===0?32:31-(Ft(t)/wi|0)|0}var mi=64,ji=4194304;function Ht(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Gn(t,i){var o=t.pendingLanes;if(o===0)return 0;var c=0,d=t.suspendedLanes,p=t.pingedLanes,M=o&268435455;if(M!==0){var U=M&~d;U!==0?c=Ht(U):(p&=M,p!==0&&(c=Ht(p)))}else M=o&~d,M!==0?c=Ht(M):p!==0&&(c=Ht(p));if(c===0)return 0;if(i!==0&&i!==c&&(i&d)===0&&(d=c&-c,p=i&-i,d>=p||d===16&&(p&4194240)!==0))return i;if((c&4)!==0&&(c|=o&16),i=t.entangledLanes,i!==0)for(t=t.entanglements,i&=c;0<i;)o=31-_n(i),d=1<<o,c|=t[o],i&=~d;return c}function Qs(t,i){switch(t){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Tn(t,i){for(var o=t.suspendedLanes,c=t.pingedLanes,d=t.expirationTimes,p=t.pendingLanes;0<p;){var M=31-_n(p),U=1<<M,B=d[M];B===-1?((U&o)===0||(U&c)!==0)&&(d[M]=Qs(U,i)):B<=i&&(t.expiredLanes|=U),p&=~U}}function Ar(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function ta(){var t=mi;return mi<<=1,(mi&4194240)===0&&(mi=64),t}function Qr(t){for(var i=[],o=0;31>o;o++)i.push(t);return i}function Js(t,i,o){t.pendingLanes|=i,i!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,i=31-_n(i),t[i]=o}function Hg(t,i){var o=t.pendingLanes&~i;t.pendingLanes=i,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=i,t.mutableReadLanes&=i,t.entangledLanes&=i,i=t.entanglements;var c=t.eventTimes;for(t=t.expirationTimes;0<o;){var d=31-_n(o),p=1<<d;i[d]=0,c[d]=-1,t[d]=-1,o&=~p}}function ql(t,i){var o=t.entangledLanes|=i;for(t=t.entanglements;o;){var c=31-_n(o),d=1<<c;d&i|t[c]&i&&(t[c]|=i),o&=~d}}var Tt=0;function Uf(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var If,Yl,Ff,Of,kf,$l=!1,na=[],Xi=null,qi=null,Yi=null,eo=new Map,to=new Map,$i=[],Gg="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function zf(t,i){switch(t){case"focusin":case"focusout":Xi=null;break;case"dragenter":case"dragleave":qi=null;break;case"mouseover":case"mouseout":Yi=null;break;case"pointerover":case"pointerout":eo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":to.delete(i.pointerId)}}function no(t,i,o,c,d,p){return t===null||t.nativeEvent!==p?(t={blockedOn:i,domEventName:o,eventSystemFlags:c,nativeEvent:p,targetContainers:[d]},i!==null&&(i=vo(i),i!==null&&Yl(i)),t):(t.eventSystemFlags|=c,i=t.targetContainers,d!==null&&i.indexOf(d)===-1&&i.push(d),t)}function Vg(t,i,o,c,d){switch(i){case"focusin":return Xi=no(Xi,t,i,o,c,d),!0;case"dragenter":return qi=no(qi,t,i,o,c,d),!0;case"mouseover":return Yi=no(Yi,t,i,o,c,d),!0;case"pointerover":var p=d.pointerId;return eo.set(p,no(eo.get(p)||null,t,i,o,c,d)),!0;case"gotpointercapture":return p=d.pointerId,to.set(p,no(to.get(p)||null,t,i,o,c,d)),!0}return!1}function Bf(t){var i=br(t.target);if(i!==null){var o=Ei(i);if(o!==null){if(i=o.tag,i===13){if(i=Jo(o),i!==null){t.blockedOn=i,kf(t.priority,function(){Ff(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ia(t){if(t.blockedOn!==null)return!1;for(var i=t.targetContainers;0<i.length;){var o=Zl(t.domEventName,t.eventSystemFlags,i[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var c=new o.constructor(o.type,o);Ct=c,o.target.dispatchEvent(c),Ct=null}else return i=vo(o),i!==null&&Yl(i),t.blockedOn=o,!1;i.shift()}return!0}function Hf(t,i,o){ia(t)&&o.delete(i)}function Wg(){$l=!1,Xi!==null&&ia(Xi)&&(Xi=null),qi!==null&&ia(qi)&&(qi=null),Yi!==null&&ia(Yi)&&(Yi=null),eo.forEach(Hf),to.forEach(Hf)}function io(t,i){t.blockedOn===i&&(t.blockedOn=null,$l||($l=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,Wg)))}function ro(t){function i(d){return io(d,t)}if(0<na.length){io(na[0],t);for(var o=1;o<na.length;o++){var c=na[o];c.blockedOn===t&&(c.blockedOn=null)}}for(Xi!==null&&io(Xi,t),qi!==null&&io(qi,t),Yi!==null&&io(Yi,t),eo.forEach(i),to.forEach(i),o=0;o<$i.length;o++)c=$i[o],c.blockedOn===t&&(c.blockedOn=null);for(;0<$i.length&&(o=$i[0],o.blockedOn===null);)Bf(o),o.blockedOn===null&&$i.shift()}var Jr=N.ReactCurrentBatchConfig,ra=!0;function jg(t,i,o,c){var d=Tt,p=Jr.transition;Jr.transition=null;try{Tt=1,Kl(t,i,o,c)}finally{Tt=d,Jr.transition=p}}function Xg(t,i,o,c){var d=Tt,p=Jr.transition;Jr.transition=null;try{Tt=4,Kl(t,i,o,c)}finally{Tt=d,Jr.transition=p}}function Kl(t,i,o,c){if(ra){var d=Zl(t,i,o,c);if(d===null)pc(t,i,c,sa,o),zf(t,c);else if(Vg(d,t,i,o,c))c.stopPropagation();else if(zf(t,c),i&4&&-1<Gg.indexOf(t)){for(;d!==null;){var p=vo(d);if(p!==null&&If(p),p=Zl(t,i,o,c),p===null&&pc(t,i,c,sa,o),p===d)break;d=p}d!==null&&c.stopPropagation()}else pc(t,i,c,null,o)}}var sa=null;function Zl(t,i,o,c){if(sa=null,t=ct(c),t=br(t),t!==null)if(i=Ei(t),i===null)t=null;else if(o=i.tag,o===13){if(t=Jo(i),t!==null)return t;t=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;t=null}else i!==t&&(t=null);return sa=t,null}function Gf(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ut()){case rt:return 1;case at:return 4;case Rt:case vn:return 16;case Vt:return 536870912;default:return 16}default:return 16}}var Ki=null,Ql=null,oa=null;function Vf(){if(oa)return oa;var t,i=Ql,o=i.length,c,d="value"in Ki?Ki.value:Ki.textContent,p=d.length;for(t=0;t<o&&i[t]===d[t];t++);var M=o-t;for(c=1;c<=M&&i[o-c]===d[p-c];c++);return oa=d.slice(t,1<c?1-c:void 0)}function aa(t){var i=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&i===13&&(t=13)):t=i,t===10&&(t=13),32<=t||t===13?t:0}function la(){return!0}function Wf(){return!1}function In(t){function i(o,c,d,p,M){this._reactName=o,this._targetInst=d,this.type=c,this.nativeEvent=p,this.target=M,this.currentTarget=null;for(var U in t)t.hasOwnProperty(U)&&(o=t[U],this[U]=o?o(p):p[U]);return this.isDefaultPrevented=(p.defaultPrevented!=null?p.defaultPrevented:p.returnValue===!1)?la:Wf,this.isPropagationStopped=Wf,this}return Y(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=la)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=la)},persist:function(){},isPersistent:la}),i}var es={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jl=In(es),so=Y({},es,{view:0,detail:0}),qg=In(so),ec,tc,oo,ca=Y({},so,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ic,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==oo&&(oo&&t.type==="mousemove"?(ec=t.screenX-oo.screenX,tc=t.screenY-oo.screenY):tc=ec=0,oo=t),ec)},movementY:function(t){return"movementY"in t?t.movementY:tc}}),jf=In(ca),Yg=Y({},ca,{dataTransfer:0}),$g=In(Yg),Kg=Y({},so,{relatedTarget:0}),nc=In(Kg),Zg=Y({},es,{animationName:0,elapsedTime:0,pseudoElement:0}),Qg=In(Zg),Jg=Y({},es,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ev=In(Jg),tv=Y({},es,{data:0}),Xf=In(tv),nv={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},iv={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rv={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function sv(t){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(t):(t=rv[t])?!!i[t]:!1}function ic(){return sv}var ov=Y({},so,{key:function(t){if(t.key){var i=nv[t.key]||t.key;if(i!=="Unidentified")return i}return t.type==="keypress"?(t=aa(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?iv[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ic,charCode:function(t){return t.type==="keypress"?aa(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?aa(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),av=In(ov),lv=Y({},ca,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),qf=In(lv),cv=Y({},so,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ic}),uv=In(cv),fv=Y({},es,{propertyName:0,elapsedTime:0,pseudoElement:0}),dv=In(fv),hv=Y({},ca,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),pv=In(hv),mv=[9,13,27,32],rc=u&&"CompositionEvent"in window,ao=null;u&&"documentMode"in document&&(ao=document.documentMode);var gv=u&&"TextEvent"in window&&!ao,Yf=u&&(!rc||ao&&8<ao&&11>=ao),$f=" ",Kf=!1;function Zf(t,i){switch(t){case"keyup":return mv.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Qf(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ts=!1;function vv(t,i){switch(t){case"compositionend":return Qf(i);case"keypress":return i.which!==32?null:(Kf=!0,$f);case"textInput":return t=i.data,t===$f&&Kf?null:t;default:return null}}function _v(t,i){if(ts)return t==="compositionend"||!rc&&Zf(t,i)?(t=Vf(),oa=Ql=Ki=null,ts=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Yf&&i.locale!=="ko"?null:i.data;default:return null}}var xv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Jf(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i==="input"?!!xv[t.type]:i==="textarea"}function ed(t,i,o,c){nt(c),i=pa(i,"onChange"),0<i.length&&(o=new Jl("onChange","change",null,o,c),t.push({event:o,listeners:i}))}var lo=null,co=null;function yv(t){_d(t,0)}function ua(t){var i=os(t);if(Q(i))return t}function Sv(t,i){if(t==="change")return i}var td=!1;if(u){var sc;if(u){var oc="oninput"in document;if(!oc){var nd=document.createElement("div");nd.setAttribute("oninput","return;"),oc=typeof nd.oninput=="function"}sc=oc}else sc=!1;td=sc&&(!document.documentMode||9<document.documentMode)}function id(){lo&&(lo.detachEvent("onpropertychange",rd),co=lo=null)}function rd(t){if(t.propertyName==="value"&&ua(co)){var i=[];ed(i,co,t,ct(t)),en(yv,i)}}function Mv(t,i,o){t==="focusin"?(id(),lo=i,co=o,lo.attachEvent("onpropertychange",rd)):t==="focusout"&&id()}function Ev(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ua(co)}function wv(t,i){if(t==="click")return ua(i)}function Tv(t,i){if(t==="input"||t==="change")return ua(i)}function Av(t,i){return t===i&&(t!==0||1/t===1/i)||t!==t&&i!==i}var ni=typeof Object.is=="function"?Object.is:Av;function uo(t,i){if(ni(t,i))return!0;if(typeof t!="object"||t===null||typeof i!="object"||i===null)return!1;var o=Object.keys(t),c=Object.keys(i);if(o.length!==c.length)return!1;for(c=0;c<o.length;c++){var d=o[c];if(!h.call(i,d)||!ni(t[d],i[d]))return!1}return!0}function sd(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function od(t,i){var o=sd(t);t=0;for(var c;o;){if(o.nodeType===3){if(c=t+o.textContent.length,t<=i&&c>=i)return{node:o,offset:i-t};t=c}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=sd(o)}}function ad(t,i){return t&&i?t===i?!0:t&&t.nodeType===3?!1:i&&i.nodeType===3?ad(t,i.parentNode):"contains"in t?t.contains(i):t.compareDocumentPosition?!!(t.compareDocumentPosition(i)&16):!1:!1}function ld(){for(var t=window,i=Lt();i instanceof t.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)t=i.contentWindow;else break;i=Lt(t.document)}return i}function ac(t){var i=t&&t.nodeName&&t.nodeName.toLowerCase();return i&&(i==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||i==="textarea"||t.contentEditable==="true")}function bv(t){var i=ld(),o=t.focusedElem,c=t.selectionRange;if(i!==o&&o&&o.ownerDocument&&ad(o.ownerDocument.documentElement,o)){if(c!==null&&ac(o)){if(i=c.start,t=c.end,t===void 0&&(t=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(t,o.value.length);else if(t=(i=o.ownerDocument||document)&&i.defaultView||window,t.getSelection){t=t.getSelection();var d=o.textContent.length,p=Math.min(c.start,d);c=c.end===void 0?p:Math.min(c.end,d),!t.extend&&p>c&&(d=c,c=p,p=d),d=od(o,p);var M=od(o,c);d&&M&&(t.rangeCount!==1||t.anchorNode!==d.node||t.anchorOffset!==d.offset||t.focusNode!==M.node||t.focusOffset!==M.offset)&&(i=i.createRange(),i.setStart(d.node,d.offset),t.removeAllRanges(),p>c?(t.addRange(i),t.extend(M.node,M.offset)):(i.setEnd(M.node,M.offset),t.addRange(i)))}}for(i=[],t=o;t=t.parentNode;)t.nodeType===1&&i.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)t=i[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Cv=u&&"documentMode"in document&&11>=document.documentMode,ns=null,lc=null,fo=null,cc=!1;function cd(t,i,o){var c=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;cc||ns==null||ns!==Lt(c)||(c=ns,"selectionStart"in c&&ac(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),fo&&uo(fo,c)||(fo=c,c=pa(lc,"onSelect"),0<c.length&&(i=new Jl("onSelect","select",null,i,o),t.push({event:i,listeners:c}),i.target=ns)))}function fa(t,i){var o={};return o[t.toLowerCase()]=i.toLowerCase(),o["Webkit"+t]="webkit"+i,o["Moz"+t]="moz"+i,o}var is={animationend:fa("Animation","AnimationEnd"),animationiteration:fa("Animation","AnimationIteration"),animationstart:fa("Animation","AnimationStart"),transitionend:fa("Transition","TransitionEnd")},uc={},ud={};u&&(ud=document.createElement("div").style,"AnimationEvent"in window||(delete is.animationend.animation,delete is.animationiteration.animation,delete is.animationstart.animation),"TransitionEvent"in window||delete is.transitionend.transition);function da(t){if(uc[t])return uc[t];if(!is[t])return t;var i=is[t],o;for(o in i)if(i.hasOwnProperty(o)&&o in ud)return uc[t]=i[o];return t}var fd=da("animationend"),dd=da("animationiteration"),hd=da("animationstart"),pd=da("transitionend"),md=new Map,gd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Zi(t,i){md.set(t,i),l(i,[t])}for(var fc=0;fc<gd.length;fc++){var dc=gd[fc],Rv=dc.toLowerCase(),Pv=dc[0].toUpperCase()+dc.slice(1);Zi(Rv,"on"+Pv)}Zi(fd,"onAnimationEnd"),Zi(dd,"onAnimationIteration"),Zi(hd,"onAnimationStart"),Zi("dblclick","onDoubleClick"),Zi("focusin","onFocus"),Zi("focusout","onBlur"),Zi(pd,"onTransitionEnd"),f("onMouseEnter",["mouseout","mouseover"]),f("onMouseLeave",["mouseout","mouseover"]),f("onPointerEnter",["pointerout","pointerover"]),f("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ho="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Lv=new Set("cancel close invalid load scroll toggle".split(" ").concat(ho));function vd(t,i,o){var c=t.type||"unknown-event";t.currentTarget=o,Xl(c,i,void 0,t),t.currentTarget=null}function _d(t,i){i=(i&4)!==0;for(var o=0;o<t.length;o++){var c=t[o],d=c.event;c=c.listeners;e:{var p=void 0;if(i)for(var M=c.length-1;0<=M;M--){var U=c[M],B=U.instance,oe=U.currentTarget;if(U=U.listener,B!==p&&d.isPropagationStopped())break e;vd(d,U,oe),p=B}else for(M=0;M<c.length;M++){if(U=c[M],B=U.instance,oe=U.currentTarget,U=U.listener,B!==p&&d.isPropagationStopped())break e;vd(d,U,oe),p=B}}}if(Tr)throw t=Wi,Tr=!1,Wi=null,t}function Nt(t,i){var o=i[yc];o===void 0&&(o=i[yc]=new Set);var c=t+"__bubble";o.has(c)||(xd(i,t,2,!1),o.add(c))}function hc(t,i,o){var c=0;i&&(c|=4),xd(o,t,c,i)}var ha="_reactListening"+Math.random().toString(36).slice(2);function po(t){if(!t[ha]){t[ha]=!0,s.forEach(function(o){o!=="selectionchange"&&(Lv.has(o)||hc(o,!1,t),hc(o,!0,t))});var i=t.nodeType===9?t:t.ownerDocument;i===null||i[ha]||(i[ha]=!0,hc("selectionchange",!1,i))}}function xd(t,i,o,c){switch(Gf(i)){case 1:var d=jg;break;case 4:d=Xg;break;default:d=Kl}o=d.bind(null,i,o,t),d=void 0,!Yt||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(d=!0),c?d!==void 0?t.addEventListener(i,o,{capture:!0,passive:d}):t.addEventListener(i,o,!0):d!==void 0?t.addEventListener(i,o,{passive:d}):t.addEventListener(i,o,!1)}function pc(t,i,o,c,d){var p=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var M=c.tag;if(M===3||M===4){var U=c.stateNode.containerInfo;if(U===d||U.nodeType===8&&U.parentNode===d)break;if(M===4)for(M=c.return;M!==null;){var B=M.tag;if((B===3||B===4)&&(B=M.stateNode.containerInfo,B===d||B.nodeType===8&&B.parentNode===d))return;M=M.return}for(;U!==null;){if(M=br(U),M===null)return;if(B=M.tag,B===5||B===6){c=p=M;continue e}U=U.parentNode}}c=c.return}en(function(){var oe=p,_e=ct(o),Se=[];e:{var ve=md.get(t);if(ve!==void 0){var Ue=Jl,Ve=t;switch(t){case"keypress":if(aa(o)===0)break e;case"keydown":case"keyup":Ue=av;break;case"focusin":Ve="focus",Ue=nc;break;case"focusout":Ve="blur",Ue=nc;break;case"beforeblur":case"afterblur":Ue=nc;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Ue=jf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Ue=$g;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Ue=uv;break;case fd:case dd:case hd:Ue=Qg;break;case pd:Ue=dv;break;case"scroll":Ue=qg;break;case"wheel":Ue=pv;break;case"copy":case"cut":case"paste":Ue=ev;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Ue=qf}var je=(i&4)!==0,Wt=!je&&t==="scroll",J=je?ve!==null?ve+"Capture":null:ve;je=[];for(var W=oe,ie;W!==null;){ie=W;var Ae=ie.stateNode;if(ie.tag===5&&Ae!==null&&(ie=Ae,J!==null&&(Ae=xt(W,J),Ae!=null&&je.push(mo(W,Ae,ie)))),Wt)break;W=W.return}0<je.length&&(ve=new Ue(ve,Ve,null,o,_e),Se.push({event:ve,listeners:je}))}}if((i&7)===0){e:{if(ve=t==="mouseover"||t==="pointerover",Ue=t==="mouseout"||t==="pointerout",ve&&o!==Ct&&(Ve=o.relatedTarget||o.fromElement)&&(br(Ve)||Ve[Ti]))break e;if((Ue||ve)&&(ve=_e.window===_e?_e:(ve=_e.ownerDocument)?ve.defaultView||ve.parentWindow:window,Ue?(Ve=o.relatedTarget||o.toElement,Ue=oe,Ve=Ve?br(Ve):null,Ve!==null&&(Wt=Ei(Ve),Ve!==Wt||Ve.tag!==5&&Ve.tag!==6)&&(Ve=null)):(Ue=null,Ve=oe),Ue!==Ve)){if(je=jf,Ae="onMouseLeave",J="onMouseEnter",W="mouse",(t==="pointerout"||t==="pointerover")&&(je=qf,Ae="onPointerLeave",J="onPointerEnter",W="pointer"),Wt=Ue==null?ve:os(Ue),ie=Ve==null?ve:os(Ve),ve=new je(Ae,W+"leave",Ue,o,_e),ve.target=Wt,ve.relatedTarget=ie,Ae=null,br(_e)===oe&&(je=new je(J,W+"enter",Ve,o,_e),je.target=ie,je.relatedTarget=Wt,Ae=je),Wt=Ae,Ue&&Ve)t:{for(je=Ue,J=Ve,W=0,ie=je;ie;ie=rs(ie))W++;for(ie=0,Ae=J;Ae;Ae=rs(Ae))ie++;for(;0<W-ie;)je=rs(je),W--;for(;0<ie-W;)J=rs(J),ie--;for(;W--;){if(je===J||J!==null&&je===J.alternate)break t;je=rs(je),J=rs(J)}je=null}else je=null;Ue!==null&&yd(Se,ve,Ue,je,!1),Ve!==null&&Wt!==null&&yd(Se,Wt,Ve,je,!0)}}e:{if(ve=oe?os(oe):window,Ue=ve.nodeName&&ve.nodeName.toLowerCase(),Ue==="select"||Ue==="input"&&ve.type==="file")var Xe=Sv;else if(Jf(ve))if(td)Xe=Tv;else{Xe=Ev;var Je=Mv}else(Ue=ve.nodeName)&&Ue.toLowerCase()==="input"&&(ve.type==="checkbox"||ve.type==="radio")&&(Xe=wv);if(Xe&&(Xe=Xe(t,oe))){ed(Se,Xe,o,_e);break e}Je&&Je(t,ve,oe),t==="focusout"&&(Je=ve._wrapperState)&&Je.controlled&&ve.type==="number"&&P(ve,"number",ve.value)}switch(Je=oe?os(oe):window,t){case"focusin":(Jf(Je)||Je.contentEditable==="true")&&(ns=Je,lc=oe,fo=null);break;case"focusout":fo=lc=ns=null;break;case"mousedown":cc=!0;break;case"contextmenu":case"mouseup":case"dragend":cc=!1,cd(Se,o,_e);break;case"selectionchange":if(Cv)break;case"keydown":case"keyup":cd(Se,o,_e)}var et;if(rc)e:{switch(t){case"compositionstart":var it="onCompositionStart";break e;case"compositionend":it="onCompositionEnd";break e;case"compositionupdate":it="onCompositionUpdate";break e}it=void 0}else ts?Zf(t,o)&&(it="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(it="onCompositionStart");it&&(Yf&&o.locale!=="ko"&&(ts||it!=="onCompositionStart"?it==="onCompositionEnd"&&ts&&(et=Vf()):(Ki=_e,Ql="value"in Ki?Ki.value:Ki.textContent,ts=!0)),Je=pa(oe,it),0<Je.length&&(it=new Xf(it,t,null,o,_e),Se.push({event:it,listeners:Je}),et?it.data=et:(et=Qf(o),et!==null&&(it.data=et)))),(et=gv?vv(t,o):_v(t,o))&&(oe=pa(oe,"onBeforeInput"),0<oe.length&&(_e=new Xf("onBeforeInput","beforeinput",null,o,_e),Se.push({event:_e,listeners:oe}),_e.data=et))}_d(Se,i)})}function mo(t,i,o){return{instance:t,listener:i,currentTarget:o}}function pa(t,i){for(var o=i+"Capture",c=[];t!==null;){var d=t,p=d.stateNode;d.tag===5&&p!==null&&(d=p,p=xt(t,o),p!=null&&c.unshift(mo(t,p,d)),p=xt(t,i),p!=null&&c.push(mo(t,p,d))),t=t.return}return c}function rs(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function yd(t,i,o,c,d){for(var p=i._reactName,M=[];o!==null&&o!==c;){var U=o,B=U.alternate,oe=U.stateNode;if(B!==null&&B===c)break;U.tag===5&&oe!==null&&(U=oe,d?(B=xt(o,p),B!=null&&M.unshift(mo(o,B,U))):d||(B=xt(o,p),B!=null&&M.push(mo(o,B,U)))),o=o.return}M.length!==0&&t.push({event:i,listeners:M})}var Nv=/\r\n?/g,Dv=/\u0000|\uFFFD/g;function Sd(t){return(typeof t=="string"?t:""+t).replace(Nv,`
`).replace(Dv,"")}function ma(t,i,o){if(i=Sd(i),Sd(t)!==i&&o)throw Error(n(425))}function ga(){}var mc=null,gc=null;function vc(t,i){return t==="textarea"||t==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var _c=typeof setTimeout=="function"?setTimeout:void 0,Uv=typeof clearTimeout=="function"?clearTimeout:void 0,Md=typeof Promise=="function"?Promise:void 0,Iv=typeof queueMicrotask=="function"?queueMicrotask:typeof Md<"u"?function(t){return Md.resolve(null).then(t).catch(Fv)}:_c;function Fv(t){setTimeout(function(){throw t})}function xc(t,i){var o=i,c=0;do{var d=o.nextSibling;if(t.removeChild(o),d&&d.nodeType===8)if(o=d.data,o==="/$"){if(c===0){t.removeChild(d),ro(i);return}c--}else o!=="$"&&o!=="$?"&&o!=="$!"||c++;o=d}while(o);ro(i)}function Qi(t){for(;t!=null;t=t.nextSibling){var i=t.nodeType;if(i===1||i===3)break;if(i===8){if(i=t.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return t}function Ed(t){t=t.previousSibling;for(var i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return t;i--}else o==="/$"&&i++}t=t.previousSibling}return null}var ss=Math.random().toString(36).slice(2),gi="__reactFiber$"+ss,go="__reactProps$"+ss,Ti="__reactContainer$"+ss,yc="__reactEvents$"+ss,Ov="__reactListeners$"+ss,kv="__reactHandles$"+ss;function br(t){var i=t[gi];if(i)return i;for(var o=t.parentNode;o;){if(i=o[Ti]||o[gi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(t=Ed(t);t!==null;){if(o=t[gi])return o;t=Ed(t)}return i}t=o,o=t.parentNode}return null}function vo(t){return t=t[gi]||t[Ti],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function os(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(n(33))}function va(t){return t[go]||null}var Sc=[],as=-1;function Ji(t){return{current:t}}function Dt(t){0>as||(t.current=Sc[as],Sc[as]=null,as--)}function Pt(t,i){as++,Sc[as]=t.current,t.current=i}var er={},fn=Ji(er),An=Ji(!1),Cr=er;function ls(t,i){var o=t.type.contextTypes;if(!o)return er;var c=t.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var d={},p;for(p in o)d[p]=i[p];return c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=d),d}function bn(t){return t=t.childContextTypes,t!=null}function _a(){Dt(An),Dt(fn)}function wd(t,i,o){if(fn.current!==er)throw Error(n(168));Pt(fn,i),Pt(An,o)}function Td(t,i,o){var c=t.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return o;c=c.getChildContext();for(var d in c)if(!(d in i))throw Error(n(108,be(t)||"Unknown",d));return Y({},o,c)}function xa(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||er,Cr=fn.current,Pt(fn,t),Pt(An,An.current),!0}function Ad(t,i,o){var c=t.stateNode;if(!c)throw Error(n(169));o?(t=Td(t,i,Cr),c.__reactInternalMemoizedMergedChildContext=t,Dt(An),Dt(fn),Pt(fn,t)):Dt(An),Pt(An,o)}var Ai=null,ya=!1,Mc=!1;function bd(t){Ai===null?Ai=[t]:Ai.push(t)}function zv(t){ya=!0,bd(t)}function tr(){if(!Mc&&Ai!==null){Mc=!0;var t=0,i=Tt;try{var o=Ai;for(Tt=1;t<o.length;t++){var c=o[t];do c=c(!0);while(c!==null)}Ai=null,ya=!1}catch(d){throw Ai!==null&&(Ai=Ai.slice(t+1)),ae(rt,tr),d}finally{Tt=i,Mc=!1}}return null}var cs=[],us=0,Sa=null,Ma=0,Vn=[],Wn=0,Rr=null,bi=1,Ci="";function Pr(t,i){cs[us++]=Ma,cs[us++]=Sa,Sa=t,Ma=i}function Cd(t,i,o){Vn[Wn++]=bi,Vn[Wn++]=Ci,Vn[Wn++]=Rr,Rr=t;var c=bi;t=Ci;var d=32-_n(c)-1;c&=~(1<<d),o+=1;var p=32-_n(i)+d;if(30<p){var M=d-d%5;p=(c&(1<<M)-1).toString(32),c>>=M,d-=M,bi=1<<32-_n(i)+d|o<<d|c,Ci=p+t}else bi=1<<p|o<<d|c,Ci=t}function Ec(t){t.return!==null&&(Pr(t,1),Cd(t,1,0))}function wc(t){for(;t===Sa;)Sa=cs[--us],cs[us]=null,Ma=cs[--us],cs[us]=null;for(;t===Rr;)Rr=Vn[--Wn],Vn[Wn]=null,Ci=Vn[--Wn],Vn[Wn]=null,bi=Vn[--Wn],Vn[Wn]=null}var Fn=null,On=null,Ot=!1,ii=null;function Rd(t,i){var o=Yn(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=t,i=t.deletions,i===null?(t.deletions=[o],t.flags|=16):i.push(o)}function Pd(t,i){switch(t.tag){case 5:var o=t.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(t.stateNode=i,Fn=t,On=Qi(i.firstChild),!0):!1;case 6:return i=t.pendingProps===""||i.nodeType!==3?null:i,i!==null?(t.stateNode=i,Fn=t,On=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=Rr!==null?{id:bi,overflow:Ci}:null,t.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=Yn(18,null,null,0),o.stateNode=i,o.return=t,t.child=o,Fn=t,On=null,!0):!1;default:return!1}}function Tc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ac(t){if(Ot){var i=On;if(i){var o=i;if(!Pd(t,i)){if(Tc(t))throw Error(n(418));i=Qi(o.nextSibling);var c=Fn;i&&Pd(t,i)?Rd(c,o):(t.flags=t.flags&-4097|2,Ot=!1,Fn=t)}}else{if(Tc(t))throw Error(n(418));t.flags=t.flags&-4097|2,Ot=!1,Fn=t}}}function Ld(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Fn=t}function Ea(t){if(t!==Fn)return!1;if(!Ot)return Ld(t),Ot=!0,!1;var i;if((i=t.tag!==3)&&!(i=t.tag!==5)&&(i=t.type,i=i!=="head"&&i!=="body"&&!vc(t.type,t.memoizedProps)),i&&(i=On)){if(Tc(t))throw Nd(),Error(n(418));for(;i;)Rd(t,i),i=Qi(i.nextSibling)}if(Ld(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(n(317));e:{for(t=t.nextSibling,i=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(i===0){On=Qi(t.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}t=t.nextSibling}On=null}}else On=Fn?Qi(t.stateNode.nextSibling):null;return!0}function Nd(){for(var t=On;t;)t=Qi(t.nextSibling)}function fs(){On=Fn=null,Ot=!1}function bc(t){ii===null?ii=[t]:ii.push(t)}var Bv=N.ReactCurrentBatchConfig;function _o(t,i,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(n(309));var c=o.stateNode}if(!c)throw Error(n(147,t));var d=c,p=""+t;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===p?i.ref:(i=function(M){var U=d.refs;M===null?delete U[p]:U[p]=M},i._stringRef=p,i)}if(typeof t!="string")throw Error(n(284));if(!o._owner)throw Error(n(290,t))}return t}function wa(t,i){throw t=Object.prototype.toString.call(i),Error(n(31,t==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":t))}function Dd(t){var i=t._init;return i(t._payload)}function Ud(t){function i(J,W){if(t){var ie=J.deletions;ie===null?(J.deletions=[W],J.flags|=16):ie.push(W)}}function o(J,W){if(!t)return null;for(;W!==null;)i(J,W),W=W.sibling;return null}function c(J,W){for(J=new Map;W!==null;)W.key!==null?J.set(W.key,W):J.set(W.index,W),W=W.sibling;return J}function d(J,W){return J=cr(J,W),J.index=0,J.sibling=null,J}function p(J,W,ie){return J.index=ie,t?(ie=J.alternate,ie!==null?(ie=ie.index,ie<W?(J.flags|=2,W):ie):(J.flags|=2,W)):(J.flags|=1048576,W)}function M(J){return t&&J.alternate===null&&(J.flags|=2),J}function U(J,W,ie,Ae){return W===null||W.tag!==6?(W=_u(ie,J.mode,Ae),W.return=J,W):(W=d(W,ie),W.return=J,W)}function B(J,W,ie,Ae){var Xe=ie.type;return Xe===F?_e(J,W,ie.props.children,Ae,ie.key):W!==null&&(W.elementType===Xe||typeof Xe=="object"&&Xe!==null&&Xe.$$typeof===re&&Dd(Xe)===W.type)?(Ae=d(W,ie.props),Ae.ref=_o(J,W,ie),Ae.return=J,Ae):(Ae=Ya(ie.type,ie.key,ie.props,null,J.mode,Ae),Ae.ref=_o(J,W,ie),Ae.return=J,Ae)}function oe(J,W,ie,Ae){return W===null||W.tag!==4||W.stateNode.containerInfo!==ie.containerInfo||W.stateNode.implementation!==ie.implementation?(W=xu(ie,J.mode,Ae),W.return=J,W):(W=d(W,ie.children||[]),W.return=J,W)}function _e(J,W,ie,Ae,Xe){return W===null||W.tag!==7?(W=kr(ie,J.mode,Ae,Xe),W.return=J,W):(W=d(W,ie),W.return=J,W)}function Se(J,W,ie){if(typeof W=="string"&&W!==""||typeof W=="number")return W=_u(""+W,J.mode,ie),W.return=J,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case j:return ie=Ya(W.type,W.key,W.props,null,J.mode,ie),ie.ref=_o(J,null,W),ie.return=J,ie;case I:return W=xu(W,J.mode,ie),W.return=J,W;case re:var Ae=W._init;return Se(J,Ae(W._payload),ie)}if(b(W)||z(W))return W=kr(W,J.mode,ie,null),W.return=J,W;wa(J,W)}return null}function ve(J,W,ie,Ae){var Xe=W!==null?W.key:null;if(typeof ie=="string"&&ie!==""||typeof ie=="number")return Xe!==null?null:U(J,W,""+ie,Ae);if(typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case j:return ie.key===Xe?B(J,W,ie,Ae):null;case I:return ie.key===Xe?oe(J,W,ie,Ae):null;case re:return Xe=ie._init,ve(J,W,Xe(ie._payload),Ae)}if(b(ie)||z(ie))return Xe!==null?null:_e(J,W,ie,Ae,null);wa(J,ie)}return null}function Ue(J,W,ie,Ae,Xe){if(typeof Ae=="string"&&Ae!==""||typeof Ae=="number")return J=J.get(ie)||null,U(W,J,""+Ae,Xe);if(typeof Ae=="object"&&Ae!==null){switch(Ae.$$typeof){case j:return J=J.get(Ae.key===null?ie:Ae.key)||null,B(W,J,Ae,Xe);case I:return J=J.get(Ae.key===null?ie:Ae.key)||null,oe(W,J,Ae,Xe);case re:var Je=Ae._init;return Ue(J,W,ie,Je(Ae._payload),Xe)}if(b(Ae)||z(Ae))return J=J.get(ie)||null,_e(W,J,Ae,Xe,null);wa(W,Ae)}return null}function Ve(J,W,ie,Ae){for(var Xe=null,Je=null,et=W,it=W=0,rn=null;et!==null&&it<ie.length;it++){et.index>it?(rn=et,et=null):rn=et.sibling;var yt=ve(J,et,ie[it],Ae);if(yt===null){et===null&&(et=rn);break}t&&et&&yt.alternate===null&&i(J,et),W=p(yt,W,it),Je===null?Xe=yt:Je.sibling=yt,Je=yt,et=rn}if(it===ie.length)return o(J,et),Ot&&Pr(J,it),Xe;if(et===null){for(;it<ie.length;it++)et=Se(J,ie[it],Ae),et!==null&&(W=p(et,W,it),Je===null?Xe=et:Je.sibling=et,Je=et);return Ot&&Pr(J,it),Xe}for(et=c(J,et);it<ie.length;it++)rn=Ue(et,J,it,ie[it],Ae),rn!==null&&(t&&rn.alternate!==null&&et.delete(rn.key===null?it:rn.key),W=p(rn,W,it),Je===null?Xe=rn:Je.sibling=rn,Je=rn);return t&&et.forEach(function(ur){return i(J,ur)}),Ot&&Pr(J,it),Xe}function je(J,W,ie,Ae){var Xe=z(ie);if(typeof Xe!="function")throw Error(n(150));if(ie=Xe.call(ie),ie==null)throw Error(n(151));for(var Je=Xe=null,et=W,it=W=0,rn=null,yt=ie.next();et!==null&&!yt.done;it++,yt=ie.next()){et.index>it?(rn=et,et=null):rn=et.sibling;var ur=ve(J,et,yt.value,Ae);if(ur===null){et===null&&(et=rn);break}t&&et&&ur.alternate===null&&i(J,et),W=p(ur,W,it),Je===null?Xe=ur:Je.sibling=ur,Je=ur,et=rn}if(yt.done)return o(J,et),Ot&&Pr(J,it),Xe;if(et===null){for(;!yt.done;it++,yt=ie.next())yt=Se(J,yt.value,Ae),yt!==null&&(W=p(yt,W,it),Je===null?Xe=yt:Je.sibling=yt,Je=yt);return Ot&&Pr(J,it),Xe}for(et=c(J,et);!yt.done;it++,yt=ie.next())yt=Ue(et,J,it,yt.value,Ae),yt!==null&&(t&&yt.alternate!==null&&et.delete(yt.key===null?it:yt.key),W=p(yt,W,it),Je===null?Xe=yt:Je.sibling=yt,Je=yt);return t&&et.forEach(function(x_){return i(J,x_)}),Ot&&Pr(J,it),Xe}function Wt(J,W,ie,Ae){if(typeof ie=="object"&&ie!==null&&ie.type===F&&ie.key===null&&(ie=ie.props.children),typeof ie=="object"&&ie!==null){switch(ie.$$typeof){case j:e:{for(var Xe=ie.key,Je=W;Je!==null;){if(Je.key===Xe){if(Xe=ie.type,Xe===F){if(Je.tag===7){o(J,Je.sibling),W=d(Je,ie.props.children),W.return=J,J=W;break e}}else if(Je.elementType===Xe||typeof Xe=="object"&&Xe!==null&&Xe.$$typeof===re&&Dd(Xe)===Je.type){o(J,Je.sibling),W=d(Je,ie.props),W.ref=_o(J,Je,ie),W.return=J,J=W;break e}o(J,Je);break}else i(J,Je);Je=Je.sibling}ie.type===F?(W=kr(ie.props.children,J.mode,Ae,ie.key),W.return=J,J=W):(Ae=Ya(ie.type,ie.key,ie.props,null,J.mode,Ae),Ae.ref=_o(J,W,ie),Ae.return=J,J=Ae)}return M(J);case I:e:{for(Je=ie.key;W!==null;){if(W.key===Je)if(W.tag===4&&W.stateNode.containerInfo===ie.containerInfo&&W.stateNode.implementation===ie.implementation){o(J,W.sibling),W=d(W,ie.children||[]),W.return=J,J=W;break e}else{o(J,W);break}else i(J,W);W=W.sibling}W=xu(ie,J.mode,Ae),W.return=J,J=W}return M(J);case re:return Je=ie._init,Wt(J,W,Je(ie._payload),Ae)}if(b(ie))return Ve(J,W,ie,Ae);if(z(ie))return je(J,W,ie,Ae);wa(J,ie)}return typeof ie=="string"&&ie!==""||typeof ie=="number"?(ie=""+ie,W!==null&&W.tag===6?(o(J,W.sibling),W=d(W,ie),W.return=J,J=W):(o(J,W),W=_u(ie,J.mode,Ae),W.return=J,J=W),M(J)):o(J,W)}return Wt}var ds=Ud(!0),Id=Ud(!1),Ta=Ji(null),Aa=null,hs=null,Cc=null;function Rc(){Cc=hs=Aa=null}function Pc(t){var i=Ta.current;Dt(Ta),t._currentValue=i}function Lc(t,i,o){for(;t!==null;){var c=t.alternate;if((t.childLanes&i)!==i?(t.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),t===o)break;t=t.return}}function ps(t,i){Aa=t,Cc=hs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&i)!==0&&(Cn=!0),t.firstContext=null)}function jn(t){var i=t._currentValue;if(Cc!==t)if(t={context:t,memoizedValue:i,next:null},hs===null){if(Aa===null)throw Error(n(308));hs=t,Aa.dependencies={lanes:0,firstContext:t}}else hs=hs.next=t;return i}var Lr=null;function Nc(t){Lr===null?Lr=[t]:Lr.push(t)}function Fd(t,i,o,c){var d=i.interleaved;return d===null?(o.next=o,Nc(i)):(o.next=d.next,d.next=o),i.interleaved=o,Ri(t,c)}function Ri(t,i){t.lanes|=i;var o=t.alternate;for(o!==null&&(o.lanes|=i),o=t,t=t.return;t!==null;)t.childLanes|=i,o=t.alternate,o!==null&&(o.childLanes|=i),o=t,t=t.return;return o.tag===3?o.stateNode:null}var nr=!1;function Dc(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Od(t,i){t=t.updateQueue,i.updateQueue===t&&(i.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Pi(t,i){return{eventTime:t,lane:i,tag:0,payload:null,callback:null,next:null}}function ir(t,i,o){var c=t.updateQueue;if(c===null)return null;if(c=c.shared,(_t&2)!==0){var d=c.pending;return d===null?i.next=i:(i.next=d.next,d.next=i),c.pending=i,Ri(t,o)}return d=c.interleaved,d===null?(i.next=i,Nc(c)):(i.next=d.next,d.next=i),c.interleaved=i,Ri(t,o)}function ba(t,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var c=i.lanes;c&=t.pendingLanes,o|=c,i.lanes=o,ql(t,o)}}function kd(t,i){var o=t.updateQueue,c=t.alternate;if(c!==null&&(c=c.updateQueue,o===c)){var d=null,p=null;if(o=o.firstBaseUpdate,o!==null){do{var M={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};p===null?d=p=M:p=p.next=M,o=o.next}while(o!==null);p===null?d=p=i:p=p.next=i}else d=p=i;o={baseState:c.baseState,firstBaseUpdate:d,lastBaseUpdate:p,shared:c.shared,effects:c.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=i:t.next=i,o.lastBaseUpdate=i}function Ca(t,i,o,c){var d=t.updateQueue;nr=!1;var p=d.firstBaseUpdate,M=d.lastBaseUpdate,U=d.shared.pending;if(U!==null){d.shared.pending=null;var B=U,oe=B.next;B.next=null,M===null?p=oe:M.next=oe,M=B;var _e=t.alternate;_e!==null&&(_e=_e.updateQueue,U=_e.lastBaseUpdate,U!==M&&(U===null?_e.firstBaseUpdate=oe:U.next=oe,_e.lastBaseUpdate=B))}if(p!==null){var Se=d.baseState;M=0,_e=oe=B=null,U=p;do{var ve=U.lane,Ue=U.eventTime;if((c&ve)===ve){_e!==null&&(_e=_e.next={eventTime:Ue,lane:0,tag:U.tag,payload:U.payload,callback:U.callback,next:null});e:{var Ve=t,je=U;switch(ve=i,Ue=o,je.tag){case 1:if(Ve=je.payload,typeof Ve=="function"){Se=Ve.call(Ue,Se,ve);break e}Se=Ve;break e;case 3:Ve.flags=Ve.flags&-65537|128;case 0:if(Ve=je.payload,ve=typeof Ve=="function"?Ve.call(Ue,Se,ve):Ve,ve==null)break e;Se=Y({},Se,ve);break e;case 2:nr=!0}}U.callback!==null&&U.lane!==0&&(t.flags|=64,ve=d.effects,ve===null?d.effects=[U]:ve.push(U))}else Ue={eventTime:Ue,lane:ve,tag:U.tag,payload:U.payload,callback:U.callback,next:null},_e===null?(oe=_e=Ue,B=Se):_e=_e.next=Ue,M|=ve;if(U=U.next,U===null){if(U=d.shared.pending,U===null)break;ve=U,U=ve.next,ve.next=null,d.lastBaseUpdate=ve,d.shared.pending=null}}while(!0);if(_e===null&&(B=Se),d.baseState=B,d.firstBaseUpdate=oe,d.lastBaseUpdate=_e,i=d.shared.interleaved,i!==null){d=i;do M|=d.lane,d=d.next;while(d!==i)}else p===null&&(d.shared.lanes=0);Ur|=M,t.lanes=M,t.memoizedState=Se}}function zd(t,i,o){if(t=i.effects,i.effects=null,t!==null)for(i=0;i<t.length;i++){var c=t[i],d=c.callback;if(d!==null){if(c.callback=null,c=o,typeof d!="function")throw Error(n(191,d));d.call(c)}}}var xo={},vi=Ji(xo),yo=Ji(xo),So=Ji(xo);function Nr(t){if(t===xo)throw Error(n(174));return t}function Uc(t,i){switch(Pt(So,i),Pt(yo,t),Pt(vi,xo),t=i.nodeType,t){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:he(null,"");break;default:t=t===8?i.parentNode:i,i=t.namespaceURI||null,t=t.tagName,i=he(i,t)}Dt(vi),Pt(vi,i)}function ms(){Dt(vi),Dt(yo),Dt(So)}function Bd(t){Nr(So.current);var i=Nr(vi.current),o=he(i,t.type);i!==o&&(Pt(yo,t),Pt(vi,o))}function Ic(t){yo.current===t&&(Dt(vi),Dt(yo))}var kt=Ji(0);function Ra(t){for(var i=t;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Fc=[];function Oc(){for(var t=0;t<Fc.length;t++)Fc[t]._workInProgressVersionPrimary=null;Fc.length=0}var Pa=N.ReactCurrentDispatcher,kc=N.ReactCurrentBatchConfig,Dr=0,zt=null,$t=null,tn=null,La=!1,Mo=!1,Eo=0,Hv=0;function dn(){throw Error(n(321))}function zc(t,i){if(i===null)return!1;for(var o=0;o<i.length&&o<t.length;o++)if(!ni(t[o],i[o]))return!1;return!0}function Bc(t,i,o,c,d,p){if(Dr=p,zt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Pa.current=t===null||t.memoizedState===null?jv:Xv,t=o(c,d),Mo){p=0;do{if(Mo=!1,Eo=0,25<=p)throw Error(n(301));p+=1,tn=$t=null,i.updateQueue=null,Pa.current=qv,t=o(c,d)}while(Mo)}if(Pa.current=Ua,i=$t!==null&&$t.next!==null,Dr=0,tn=$t=zt=null,La=!1,i)throw Error(n(300));return t}function Hc(){var t=Eo!==0;return Eo=0,t}function _i(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return tn===null?zt.memoizedState=tn=t:tn=tn.next=t,tn}function Xn(){if($t===null){var t=zt.alternate;t=t!==null?t.memoizedState:null}else t=$t.next;var i=tn===null?zt.memoizedState:tn.next;if(i!==null)tn=i,$t=t;else{if(t===null)throw Error(n(310));$t=t,t={memoizedState:$t.memoizedState,baseState:$t.baseState,baseQueue:$t.baseQueue,queue:$t.queue,next:null},tn===null?zt.memoizedState=tn=t:tn=tn.next=t}return tn}function wo(t,i){return typeof i=="function"?i(t):i}function Gc(t){var i=Xn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var c=$t,d=c.baseQueue,p=o.pending;if(p!==null){if(d!==null){var M=d.next;d.next=p.next,p.next=M}c.baseQueue=d=p,o.pending=null}if(d!==null){p=d.next,c=c.baseState;var U=M=null,B=null,oe=p;do{var _e=oe.lane;if((Dr&_e)===_e)B!==null&&(B=B.next={lane:0,action:oe.action,hasEagerState:oe.hasEagerState,eagerState:oe.eagerState,next:null}),c=oe.hasEagerState?oe.eagerState:t(c,oe.action);else{var Se={lane:_e,action:oe.action,hasEagerState:oe.hasEagerState,eagerState:oe.eagerState,next:null};B===null?(U=B=Se,M=c):B=B.next=Se,zt.lanes|=_e,Ur|=_e}oe=oe.next}while(oe!==null&&oe!==p);B===null?M=c:B.next=U,ni(c,i.memoizedState)||(Cn=!0),i.memoizedState=c,i.baseState=M,i.baseQueue=B,o.lastRenderedState=c}if(t=o.interleaved,t!==null){d=t;do p=d.lane,zt.lanes|=p,Ur|=p,d=d.next;while(d!==t)}else d===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function Vc(t){var i=Xn(),o=i.queue;if(o===null)throw Error(n(311));o.lastRenderedReducer=t;var c=o.dispatch,d=o.pending,p=i.memoizedState;if(d!==null){o.pending=null;var M=d=d.next;do p=t(p,M.action),M=M.next;while(M!==d);ni(p,i.memoizedState)||(Cn=!0),i.memoizedState=p,i.baseQueue===null&&(i.baseState=p),o.lastRenderedState=p}return[p,c]}function Hd(){}function Gd(t,i){var o=zt,c=Xn(),d=i(),p=!ni(c.memoizedState,d);if(p&&(c.memoizedState=d,Cn=!0),c=c.queue,Wc(jd.bind(null,o,c,t),[t]),c.getSnapshot!==i||p||tn!==null&&tn.memoizedState.tag&1){if(o.flags|=2048,To(9,Wd.bind(null,o,c,d,i),void 0,null),nn===null)throw Error(n(349));(Dr&30)!==0||Vd(o,i,d)}return d}function Vd(t,i,o){t.flags|=16384,t={getSnapshot:i,value:o},i=zt.updateQueue,i===null?(i={lastEffect:null,stores:null},zt.updateQueue=i,i.stores=[t]):(o=i.stores,o===null?i.stores=[t]:o.push(t))}function Wd(t,i,o,c){i.value=o,i.getSnapshot=c,Xd(i)&&qd(t)}function jd(t,i,o){return o(function(){Xd(i)&&qd(t)})}function Xd(t){var i=t.getSnapshot;t=t.value;try{var o=i();return!ni(t,o)}catch{return!0}}function qd(t){var i=Ri(t,1);i!==null&&ai(i,t,1,-1)}function Yd(t){var i=_i();return typeof t=="function"&&(t=t()),i.memoizedState=i.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:wo,lastRenderedState:t},i.queue=t,t=t.dispatch=Wv.bind(null,zt,t),[i.memoizedState,t]}function To(t,i,o,c){return t={tag:t,create:i,destroy:o,deps:c,next:null},i=zt.updateQueue,i===null?(i={lastEffect:null,stores:null},zt.updateQueue=i,i.lastEffect=t.next=t):(o=i.lastEffect,o===null?i.lastEffect=t.next=t:(c=o.next,o.next=t,t.next=c,i.lastEffect=t)),t}function $d(){return Xn().memoizedState}function Na(t,i,o,c){var d=_i();zt.flags|=t,d.memoizedState=To(1|i,o,void 0,c===void 0?null:c)}function Da(t,i,o,c){var d=Xn();c=c===void 0?null:c;var p=void 0;if($t!==null){var M=$t.memoizedState;if(p=M.destroy,c!==null&&zc(c,M.deps)){d.memoizedState=To(i,o,p,c);return}}zt.flags|=t,d.memoizedState=To(1|i,o,p,c)}function Kd(t,i){return Na(8390656,8,t,i)}function Wc(t,i){return Da(2048,8,t,i)}function Zd(t,i){return Da(4,2,t,i)}function Qd(t,i){return Da(4,4,t,i)}function Jd(t,i){if(typeof i=="function")return t=t(),i(t),function(){i(null)};if(i!=null)return t=t(),i.current=t,function(){i.current=null}}function eh(t,i,o){return o=o!=null?o.concat([t]):null,Da(4,4,Jd.bind(null,i,t),o)}function jc(){}function th(t,i){var o=Xn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&zc(i,c[1])?c[0]:(o.memoizedState=[t,i],t)}function nh(t,i){var o=Xn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&zc(i,c[1])?c[0]:(t=t(),o.memoizedState=[t,i],t)}function ih(t,i,o){return(Dr&21)===0?(t.baseState&&(t.baseState=!1,Cn=!0),t.memoizedState=o):(ni(o,i)||(o=ta(),zt.lanes|=o,Ur|=o,t.baseState=!0),i)}function Gv(t,i){var o=Tt;Tt=o!==0&&4>o?o:4,t(!0);var c=kc.transition;kc.transition={};try{t(!1),i()}finally{Tt=o,kc.transition=c}}function rh(){return Xn().memoizedState}function Vv(t,i,o){var c=ar(t);if(o={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null},sh(t))oh(i,o);else if(o=Fd(t,i,o,c),o!==null){var d=yn();ai(o,t,c,d),ah(o,i,c)}}function Wv(t,i,o){var c=ar(t),d={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null};if(sh(t))oh(i,d);else{var p=t.alternate;if(t.lanes===0&&(p===null||p.lanes===0)&&(p=i.lastRenderedReducer,p!==null))try{var M=i.lastRenderedState,U=p(M,o);if(d.hasEagerState=!0,d.eagerState=U,ni(U,M)){var B=i.interleaved;B===null?(d.next=d,Nc(i)):(d.next=B.next,B.next=d),i.interleaved=d;return}}catch{}finally{}o=Fd(t,i,d,c),o!==null&&(d=yn(),ai(o,t,c,d),ah(o,i,c))}}function sh(t){var i=t.alternate;return t===zt||i!==null&&i===zt}function oh(t,i){Mo=La=!0;var o=t.pending;o===null?i.next=i:(i.next=o.next,o.next=i),t.pending=i}function ah(t,i,o){if((o&4194240)!==0){var c=i.lanes;c&=t.pendingLanes,o|=c,i.lanes=o,ql(t,o)}}var Ua={readContext:jn,useCallback:dn,useContext:dn,useEffect:dn,useImperativeHandle:dn,useInsertionEffect:dn,useLayoutEffect:dn,useMemo:dn,useReducer:dn,useRef:dn,useState:dn,useDebugValue:dn,useDeferredValue:dn,useTransition:dn,useMutableSource:dn,useSyncExternalStore:dn,useId:dn,unstable_isNewReconciler:!1},jv={readContext:jn,useCallback:function(t,i){return _i().memoizedState=[t,i===void 0?null:i],t},useContext:jn,useEffect:Kd,useImperativeHandle:function(t,i,o){return o=o!=null?o.concat([t]):null,Na(4194308,4,Jd.bind(null,i,t),o)},useLayoutEffect:function(t,i){return Na(4194308,4,t,i)},useInsertionEffect:function(t,i){return Na(4,2,t,i)},useMemo:function(t,i){var o=_i();return i=i===void 0?null:i,t=t(),o.memoizedState=[t,i],t},useReducer:function(t,i,o){var c=_i();return i=o!==void 0?o(i):i,c.memoizedState=c.baseState=i,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},c.queue=t,t=t.dispatch=Vv.bind(null,zt,t),[c.memoizedState,t]},useRef:function(t){var i=_i();return t={current:t},i.memoizedState=t},useState:Yd,useDebugValue:jc,useDeferredValue:function(t){return _i().memoizedState=t},useTransition:function(){var t=Yd(!1),i=t[0];return t=Gv.bind(null,t[1]),_i().memoizedState=t,[i,t]},useMutableSource:function(){},useSyncExternalStore:function(t,i,o){var c=zt,d=_i();if(Ot){if(o===void 0)throw Error(n(407));o=o()}else{if(o=i(),nn===null)throw Error(n(349));(Dr&30)!==0||Vd(c,i,o)}d.memoizedState=o;var p={value:o,getSnapshot:i};return d.queue=p,Kd(jd.bind(null,c,p,t),[t]),c.flags|=2048,To(9,Wd.bind(null,c,p,o,i),void 0,null),o},useId:function(){var t=_i(),i=nn.identifierPrefix;if(Ot){var o=Ci,c=bi;o=(c&~(1<<32-_n(c)-1)).toString(32)+o,i=":"+i+"R"+o,o=Eo++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=Hv++,i=":"+i+"r"+o.toString(32)+":";return t.memoizedState=i},unstable_isNewReconciler:!1},Xv={readContext:jn,useCallback:th,useContext:jn,useEffect:Wc,useImperativeHandle:eh,useInsertionEffect:Zd,useLayoutEffect:Qd,useMemo:nh,useReducer:Gc,useRef:$d,useState:function(){return Gc(wo)},useDebugValue:jc,useDeferredValue:function(t){var i=Xn();return ih(i,$t.memoizedState,t)},useTransition:function(){var t=Gc(wo)[0],i=Xn().memoizedState;return[t,i]},useMutableSource:Hd,useSyncExternalStore:Gd,useId:rh,unstable_isNewReconciler:!1},qv={readContext:jn,useCallback:th,useContext:jn,useEffect:Wc,useImperativeHandle:eh,useInsertionEffect:Zd,useLayoutEffect:Qd,useMemo:nh,useReducer:Vc,useRef:$d,useState:function(){return Vc(wo)},useDebugValue:jc,useDeferredValue:function(t){var i=Xn();return $t===null?i.memoizedState=t:ih(i,$t.memoizedState,t)},useTransition:function(){var t=Vc(wo)[0],i=Xn().memoizedState;return[t,i]},useMutableSource:Hd,useSyncExternalStore:Gd,useId:rh,unstable_isNewReconciler:!1};function ri(t,i){if(t&&t.defaultProps){i=Y({},i),t=t.defaultProps;for(var o in t)i[o]===void 0&&(i[o]=t[o]);return i}return i}function Xc(t,i,o,c){i=t.memoizedState,o=o(c,i),o=o==null?i:Y({},i,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var Ia={isMounted:function(t){return(t=t._reactInternals)?Ei(t)===t:!1},enqueueSetState:function(t,i,o){t=t._reactInternals;var c=yn(),d=ar(t),p=Pi(c,d);p.payload=i,o!=null&&(p.callback=o),i=ir(t,p,d),i!==null&&(ai(i,t,d,c),ba(i,t,d))},enqueueReplaceState:function(t,i,o){t=t._reactInternals;var c=yn(),d=ar(t),p=Pi(c,d);p.tag=1,p.payload=i,o!=null&&(p.callback=o),i=ir(t,p,d),i!==null&&(ai(i,t,d,c),ba(i,t,d))},enqueueForceUpdate:function(t,i){t=t._reactInternals;var o=yn(),c=ar(t),d=Pi(o,c);d.tag=2,i!=null&&(d.callback=i),i=ir(t,d,c),i!==null&&(ai(i,t,c,o),ba(i,t,c))}};function lh(t,i,o,c,d,p,M){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(c,p,M):i.prototype&&i.prototype.isPureReactComponent?!uo(o,c)||!uo(d,p):!0}function ch(t,i,o){var c=!1,d=er,p=i.contextType;return typeof p=="object"&&p!==null?p=jn(p):(d=bn(i)?Cr:fn.current,c=i.contextTypes,p=(c=c!=null)?ls(t,d):er),i=new i(o,p),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ia,t.stateNode=i,i._reactInternals=t,c&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=d,t.__reactInternalMemoizedMaskedChildContext=p),i}function uh(t,i,o,c){t=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,c),i.state!==t&&Ia.enqueueReplaceState(i,i.state,null)}function qc(t,i,o,c){var d=t.stateNode;d.props=o,d.state=t.memoizedState,d.refs={},Dc(t);var p=i.contextType;typeof p=="object"&&p!==null?d.context=jn(p):(p=bn(i)?Cr:fn.current,d.context=ls(t,p)),d.state=t.memoizedState,p=i.getDerivedStateFromProps,typeof p=="function"&&(Xc(t,i,p,o),d.state=t.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(i=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),i!==d.state&&Ia.enqueueReplaceState(d,d.state,null),Ca(t,o,d,c),d.state=t.memoizedState),typeof d.componentDidMount=="function"&&(t.flags|=4194308)}function gs(t,i){try{var o="",c=i;do o+=ge(c),c=c.return;while(c);var d=o}catch(p){d=`
Error generating stack: `+p.message+`
`+p.stack}return{value:t,source:i,stack:d,digest:null}}function Yc(t,i,o){return{value:t,source:null,stack:o??null,digest:i??null}}function $c(t,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var Yv=typeof WeakMap=="function"?WeakMap:Map;function fh(t,i,o){o=Pi(-1,o),o.tag=3,o.payload={element:null};var c=i.value;return o.callback=function(){Ga||(Ga=!0,uu=c),$c(t,i)},o}function dh(t,i,o){o=Pi(-1,o),o.tag=3;var c=t.type.getDerivedStateFromError;if(typeof c=="function"){var d=i.value;o.payload=function(){return c(d)},o.callback=function(){$c(t,i)}}var p=t.stateNode;return p!==null&&typeof p.componentDidCatch=="function"&&(o.callback=function(){$c(t,i),typeof c!="function"&&(sr===null?sr=new Set([this]):sr.add(this));var M=i.stack;this.componentDidCatch(i.value,{componentStack:M!==null?M:""})}),o}function hh(t,i,o){var c=t.pingCache;if(c===null){c=t.pingCache=new Yv;var d=new Set;c.set(i,d)}else d=c.get(i),d===void 0&&(d=new Set,c.set(i,d));d.has(o)||(d.add(o),t=l_.bind(null,t,i,o),i.then(t,t))}function ph(t){do{var i;if((i=t.tag===13)&&(i=t.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return t;t=t.return}while(t!==null);return null}function mh(t,i,o,c,d){return(t.mode&1)===0?(t===i?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Pi(-1,1),i.tag=2,ir(o,i,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=d,t)}var $v=N.ReactCurrentOwner,Cn=!1;function xn(t,i,o,c){i.child=t===null?Id(i,null,o,c):ds(i,t.child,o,c)}function gh(t,i,o,c,d){o=o.render;var p=i.ref;return ps(i,d),c=Bc(t,i,o,c,p,d),o=Hc(),t!==null&&!Cn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~d,Li(t,i,d)):(Ot&&o&&Ec(i),i.flags|=1,xn(t,i,c,d),i.child)}function vh(t,i,o,c,d){if(t===null){var p=o.type;return typeof p=="function"&&!vu(p)&&p.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=p,_h(t,i,p,c,d)):(t=Ya(o.type,null,c,i,i.mode,d),t.ref=i.ref,t.return=i,i.child=t)}if(p=t.child,(t.lanes&d)===0){var M=p.memoizedProps;if(o=o.compare,o=o!==null?o:uo,o(M,c)&&t.ref===i.ref)return Li(t,i,d)}return i.flags|=1,t=cr(p,c),t.ref=i.ref,t.return=i,i.child=t}function _h(t,i,o,c,d){if(t!==null){var p=t.memoizedProps;if(uo(p,c)&&t.ref===i.ref)if(Cn=!1,i.pendingProps=c=p,(t.lanes&d)!==0)(t.flags&131072)!==0&&(Cn=!0);else return i.lanes=t.lanes,Li(t,i,d)}return Kc(t,i,o,c,d)}function xh(t,i,o){var c=i.pendingProps,d=c.children,p=t!==null?t.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Pt(_s,kn),kn|=o;else{if((o&1073741824)===0)return t=p!==null?p.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:t,cachePool:null,transitions:null},i.updateQueue=null,Pt(_s,kn),kn|=t,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=p!==null?p.baseLanes:o,Pt(_s,kn),kn|=c}else p!==null?(c=p.baseLanes|o,i.memoizedState=null):c=o,Pt(_s,kn),kn|=c;return xn(t,i,d,o),i.child}function yh(t,i){var o=i.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function Kc(t,i,o,c,d){var p=bn(o)?Cr:fn.current;return p=ls(i,p),ps(i,d),o=Bc(t,i,o,c,p,d),c=Hc(),t!==null&&!Cn?(i.updateQueue=t.updateQueue,i.flags&=-2053,t.lanes&=~d,Li(t,i,d)):(Ot&&c&&Ec(i),i.flags|=1,xn(t,i,o,d),i.child)}function Sh(t,i,o,c,d){if(bn(o)){var p=!0;xa(i)}else p=!1;if(ps(i,d),i.stateNode===null)Oa(t,i),ch(i,o,c),qc(i,o,c,d),c=!0;else if(t===null){var M=i.stateNode,U=i.memoizedProps;M.props=U;var B=M.context,oe=o.contextType;typeof oe=="object"&&oe!==null?oe=jn(oe):(oe=bn(o)?Cr:fn.current,oe=ls(i,oe));var _e=o.getDerivedStateFromProps,Se=typeof _e=="function"||typeof M.getSnapshotBeforeUpdate=="function";Se||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(U!==c||B!==oe)&&uh(i,M,c,oe),nr=!1;var ve=i.memoizedState;M.state=ve,Ca(i,c,M,d),B=i.memoizedState,U!==c||ve!==B||An.current||nr?(typeof _e=="function"&&(Xc(i,o,_e,c),B=i.memoizedState),(U=nr||lh(i,o,U,c,ve,B,oe))?(Se||typeof M.UNSAFE_componentWillMount!="function"&&typeof M.componentWillMount!="function"||(typeof M.componentWillMount=="function"&&M.componentWillMount(),typeof M.UNSAFE_componentWillMount=="function"&&M.UNSAFE_componentWillMount()),typeof M.componentDidMount=="function"&&(i.flags|=4194308)):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=B),M.props=c,M.state=B,M.context=oe,c=U):(typeof M.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{M=i.stateNode,Od(t,i),U=i.memoizedProps,oe=i.type===i.elementType?U:ri(i.type,U),M.props=oe,Se=i.pendingProps,ve=M.context,B=o.contextType,typeof B=="object"&&B!==null?B=jn(B):(B=bn(o)?Cr:fn.current,B=ls(i,B));var Ue=o.getDerivedStateFromProps;(_e=typeof Ue=="function"||typeof M.getSnapshotBeforeUpdate=="function")||typeof M.UNSAFE_componentWillReceiveProps!="function"&&typeof M.componentWillReceiveProps!="function"||(U!==Se||ve!==B)&&uh(i,M,c,B),nr=!1,ve=i.memoizedState,M.state=ve,Ca(i,c,M,d);var Ve=i.memoizedState;U!==Se||ve!==Ve||An.current||nr?(typeof Ue=="function"&&(Xc(i,o,Ue,c),Ve=i.memoizedState),(oe=nr||lh(i,o,oe,c,ve,Ve,B)||!1)?(_e||typeof M.UNSAFE_componentWillUpdate!="function"&&typeof M.componentWillUpdate!="function"||(typeof M.componentWillUpdate=="function"&&M.componentWillUpdate(c,Ve,B),typeof M.UNSAFE_componentWillUpdate=="function"&&M.UNSAFE_componentWillUpdate(c,Ve,B)),typeof M.componentDidUpdate=="function"&&(i.flags|=4),typeof M.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof M.componentDidUpdate!="function"||U===t.memoizedProps&&ve===t.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||U===t.memoizedProps&&ve===t.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=Ve),M.props=c,M.state=Ve,M.context=B,c=oe):(typeof M.componentDidUpdate!="function"||U===t.memoizedProps&&ve===t.memoizedState||(i.flags|=4),typeof M.getSnapshotBeforeUpdate!="function"||U===t.memoizedProps&&ve===t.memoizedState||(i.flags|=1024),c=!1)}return Zc(t,i,o,c,p,d)}function Zc(t,i,o,c,d,p){yh(t,i);var M=(i.flags&128)!==0;if(!c&&!M)return d&&Ad(i,o,!1),Li(t,i,p);c=i.stateNode,$v.current=i;var U=M&&typeof o.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,t!==null&&M?(i.child=ds(i,t.child,null,p),i.child=ds(i,null,U,p)):xn(t,i,U,p),i.memoizedState=c.state,d&&Ad(i,o,!0),i.child}function Mh(t){var i=t.stateNode;i.pendingContext?wd(t,i.pendingContext,i.pendingContext!==i.context):i.context&&wd(t,i.context,!1),Uc(t,i.containerInfo)}function Eh(t,i,o,c,d){return fs(),bc(d),i.flags|=256,xn(t,i,o,c),i.child}var Qc={dehydrated:null,treeContext:null,retryLane:0};function Jc(t){return{baseLanes:t,cachePool:null,transitions:null}}function wh(t,i,o){var c=i.pendingProps,d=kt.current,p=!1,M=(i.flags&128)!==0,U;if((U=M)||(U=t!==null&&t.memoizedState===null?!1:(d&2)!==0),U?(p=!0,i.flags&=-129):(t===null||t.memoizedState!==null)&&(d|=1),Pt(kt,d&1),t===null)return Ac(i),t=i.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((i.mode&1)===0?i.lanes=1:t.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(M=c.children,t=c.fallback,p?(c=i.mode,p=i.child,M={mode:"hidden",children:M},(c&1)===0&&p!==null?(p.childLanes=0,p.pendingProps=M):p=$a(M,c,0,null),t=kr(t,c,o,null),p.return=i,t.return=i,p.sibling=t,i.child=p,i.child.memoizedState=Jc(o),i.memoizedState=Qc,t):eu(i,M));if(d=t.memoizedState,d!==null&&(U=d.dehydrated,U!==null))return Kv(t,i,M,c,U,d,o);if(p){p=c.fallback,M=i.mode,d=t.child,U=d.sibling;var B={mode:"hidden",children:c.children};return(M&1)===0&&i.child!==d?(c=i.child,c.childLanes=0,c.pendingProps=B,i.deletions=null):(c=cr(d,B),c.subtreeFlags=d.subtreeFlags&14680064),U!==null?p=cr(U,p):(p=kr(p,M,o,null),p.flags|=2),p.return=i,c.return=i,c.sibling=p,i.child=c,c=p,p=i.child,M=t.child.memoizedState,M=M===null?Jc(o):{baseLanes:M.baseLanes|o,cachePool:null,transitions:M.transitions},p.memoizedState=M,p.childLanes=t.childLanes&~o,i.memoizedState=Qc,c}return p=t.child,t=p.sibling,c=cr(p,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=o),c.return=i,c.sibling=null,t!==null&&(o=i.deletions,o===null?(i.deletions=[t],i.flags|=16):o.push(t)),i.child=c,i.memoizedState=null,c}function eu(t,i){return i=$a({mode:"visible",children:i},t.mode,0,null),i.return=t,t.child=i}function Fa(t,i,o,c){return c!==null&&bc(c),ds(i,t.child,null,o),t=eu(i,i.pendingProps.children),t.flags|=2,i.memoizedState=null,t}function Kv(t,i,o,c,d,p,M){if(o)return i.flags&256?(i.flags&=-257,c=Yc(Error(n(422))),Fa(t,i,M,c)):i.memoizedState!==null?(i.child=t.child,i.flags|=128,null):(p=c.fallback,d=i.mode,c=$a({mode:"visible",children:c.children},d,0,null),p=kr(p,d,M,null),p.flags|=2,c.return=i,p.return=i,c.sibling=p,i.child=c,(i.mode&1)!==0&&ds(i,t.child,null,M),i.child.memoizedState=Jc(M),i.memoizedState=Qc,p);if((i.mode&1)===0)return Fa(t,i,M,null);if(d.data==="$!"){if(c=d.nextSibling&&d.nextSibling.dataset,c)var U=c.dgst;return c=U,p=Error(n(419)),c=Yc(p,c,void 0),Fa(t,i,M,c)}if(U=(M&t.childLanes)!==0,Cn||U){if(c=nn,c!==null){switch(M&-M){case 4:d=2;break;case 16:d=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:d=32;break;case 536870912:d=268435456;break;default:d=0}d=(d&(c.suspendedLanes|M))!==0?0:d,d!==0&&d!==p.retryLane&&(p.retryLane=d,Ri(t,d),ai(c,t,d,-1))}return gu(),c=Yc(Error(n(421))),Fa(t,i,M,c)}return d.data==="$?"?(i.flags|=128,i.child=t.child,i=c_.bind(null,t),d._reactRetry=i,null):(t=p.treeContext,On=Qi(d.nextSibling),Fn=i,Ot=!0,ii=null,t!==null&&(Vn[Wn++]=bi,Vn[Wn++]=Ci,Vn[Wn++]=Rr,bi=t.id,Ci=t.overflow,Rr=i),i=eu(i,c.children),i.flags|=4096,i)}function Th(t,i,o){t.lanes|=i;var c=t.alternate;c!==null&&(c.lanes|=i),Lc(t.return,i,o)}function tu(t,i,o,c,d){var p=t.memoizedState;p===null?t.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:o,tailMode:d}:(p.isBackwards=i,p.rendering=null,p.renderingStartTime=0,p.last=c,p.tail=o,p.tailMode=d)}function Ah(t,i,o){var c=i.pendingProps,d=c.revealOrder,p=c.tail;if(xn(t,i,c.children,o),c=kt.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=i.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Th(t,o,i);else if(t.tag===19)Th(t,o,i);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===i)break e;for(;t.sibling===null;){if(t.return===null||t.return===i)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}c&=1}if(Pt(kt,c),(i.mode&1)===0)i.memoizedState=null;else switch(d){case"forwards":for(o=i.child,d=null;o!==null;)t=o.alternate,t!==null&&Ra(t)===null&&(d=o),o=o.sibling;o=d,o===null?(d=i.child,i.child=null):(d=o.sibling,o.sibling=null),tu(i,!1,d,o,p);break;case"backwards":for(o=null,d=i.child,i.child=null;d!==null;){if(t=d.alternate,t!==null&&Ra(t)===null){i.child=d;break}t=d.sibling,d.sibling=o,o=d,d=t}tu(i,!0,o,null,p);break;case"together":tu(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Oa(t,i){(i.mode&1)===0&&t!==null&&(t.alternate=null,i.alternate=null,i.flags|=2)}function Li(t,i,o){if(t!==null&&(i.dependencies=t.dependencies),Ur|=i.lanes,(o&i.childLanes)===0)return null;if(t!==null&&i.child!==t.child)throw Error(n(153));if(i.child!==null){for(t=i.child,o=cr(t,t.pendingProps),i.child=o,o.return=i;t.sibling!==null;)t=t.sibling,o=o.sibling=cr(t,t.pendingProps),o.return=i;o.sibling=null}return i.child}function Zv(t,i,o){switch(i.tag){case 3:Mh(i),fs();break;case 5:Bd(i);break;case 1:bn(i.type)&&xa(i);break;case 4:Uc(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,d=i.memoizedProps.value;Pt(Ta,c._currentValue),c._currentValue=d;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Pt(kt,kt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?wh(t,i,o):(Pt(kt,kt.current&1),t=Li(t,i,o),t!==null?t.sibling:null);Pt(kt,kt.current&1);break;case 19:if(c=(o&i.childLanes)!==0,(t.flags&128)!==0){if(c)return Ah(t,i,o);i.flags|=128}if(d=i.memoizedState,d!==null&&(d.rendering=null,d.tail=null,d.lastEffect=null),Pt(kt,kt.current),c)break;return null;case 22:case 23:return i.lanes=0,xh(t,i,o)}return Li(t,i,o)}var bh,nu,Ch,Rh;bh=function(t,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},nu=function(){},Ch=function(t,i,o,c){var d=t.memoizedProps;if(d!==c){t=i.stateNode,Nr(vi.current);var p=null;switch(o){case"input":d=qe(t,d),c=qe(t,c),p=[];break;case"select":d=Y({},d,{value:void 0}),c=Y({},c,{value:void 0}),p=[];break;case"textarea":d=ye(t,d),c=ye(t,c),p=[];break;default:typeof d.onClick!="function"&&typeof c.onClick=="function"&&(t.onclick=ga)}ot(o,c);var M;o=null;for(oe in d)if(!c.hasOwnProperty(oe)&&d.hasOwnProperty(oe)&&d[oe]!=null)if(oe==="style"){var U=d[oe];for(M in U)U.hasOwnProperty(M)&&(o||(o={}),o[M]="")}else oe!=="dangerouslySetInnerHTML"&&oe!=="children"&&oe!=="suppressContentEditableWarning"&&oe!=="suppressHydrationWarning"&&oe!=="autoFocus"&&(a.hasOwnProperty(oe)?p||(p=[]):(p=p||[]).push(oe,null));for(oe in c){var B=c[oe];if(U=d!=null?d[oe]:void 0,c.hasOwnProperty(oe)&&B!==U&&(B!=null||U!=null))if(oe==="style")if(U){for(M in U)!U.hasOwnProperty(M)||B&&B.hasOwnProperty(M)||(o||(o={}),o[M]="");for(M in B)B.hasOwnProperty(M)&&U[M]!==B[M]&&(o||(o={}),o[M]=B[M])}else o||(p||(p=[]),p.push(oe,o)),o=B;else oe==="dangerouslySetInnerHTML"?(B=B?B.__html:void 0,U=U?U.__html:void 0,B!=null&&U!==B&&(p=p||[]).push(oe,B)):oe==="children"?typeof B!="string"&&typeof B!="number"||(p=p||[]).push(oe,""+B):oe!=="suppressContentEditableWarning"&&oe!=="suppressHydrationWarning"&&(a.hasOwnProperty(oe)?(B!=null&&oe==="onScroll"&&Nt("scroll",t),p||U===B||(p=[])):(p=p||[]).push(oe,B))}o&&(p=p||[]).push("style",o);var oe=p;(i.updateQueue=oe)&&(i.flags|=4)}},Rh=function(t,i,o,c){o!==c&&(i.flags|=4)};function Ao(t,i){if(!Ot)switch(t.tailMode){case"hidden":i=t.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var c=null;o!==null;)o.alternate!==null&&(c=o),o=o.sibling;c===null?i||t.tail===null?t.tail=null:t.tail.sibling=null:c.sibling=null}}function hn(t){var i=t.alternate!==null&&t.alternate.child===t.child,o=0,c=0;if(i)for(var d=t.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags&14680064,c|=d.flags&14680064,d.return=t,d=d.sibling;else for(d=t.child;d!==null;)o|=d.lanes|d.childLanes,c|=d.subtreeFlags,c|=d.flags,d.return=t,d=d.sibling;return t.subtreeFlags|=c,t.childLanes=o,i}function Qv(t,i,o){var c=i.pendingProps;switch(wc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hn(i),null;case 1:return bn(i.type)&&_a(),hn(i),null;case 3:return c=i.stateNode,ms(),Dt(An),Dt(fn),Oc(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(t===null||t.child===null)&&(Ea(i)?i.flags|=4:t===null||t.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ii!==null&&(hu(ii),ii=null))),nu(t,i),hn(i),null;case 5:Ic(i);var d=Nr(So.current);if(o=i.type,t!==null&&i.stateNode!=null)Ch(t,i,o,c,d),t.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(n(166));return hn(i),null}if(t=Nr(vi.current),Ea(i)){c=i.stateNode,o=i.type;var p=i.memoizedProps;switch(c[gi]=i,c[go]=p,t=(i.mode&1)!==0,o){case"dialog":Nt("cancel",c),Nt("close",c);break;case"iframe":case"object":case"embed":Nt("load",c);break;case"video":case"audio":for(d=0;d<ho.length;d++)Nt(ho[d],c);break;case"source":Nt("error",c);break;case"img":case"image":case"link":Nt("error",c),Nt("load",c);break;case"details":Nt("toggle",c);break;case"input":Fe(c,p),Nt("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!p.multiple},Nt("invalid",c);break;case"textarea":xe(c,p),Nt("invalid",c)}ot(o,p),d=null;for(var M in p)if(p.hasOwnProperty(M)){var U=p[M];M==="children"?typeof U=="string"?c.textContent!==U&&(p.suppressHydrationWarning!==!0&&ma(c.textContent,U,t),d=["children",U]):typeof U=="number"&&c.textContent!==""+U&&(p.suppressHydrationWarning!==!0&&ma(c.textContent,U,t),d=["children",""+U]):a.hasOwnProperty(M)&&U!=null&&M==="onScroll"&&Nt("scroll",c)}switch(o){case"input":Ge(c),st(c,p,!0);break;case"textarea":Ge(c),H(c);break;case"select":case"option":break;default:typeof p.onClick=="function"&&(c.onclick=ga)}c=d,i.updateQueue=c,c!==null&&(i.flags|=4)}else{M=d.nodeType===9?d:d.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=X(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=M.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof c.is=="string"?t=M.createElement(o,{is:c.is}):(t=M.createElement(o),o==="select"&&(M=t,c.multiple?M.multiple=!0:c.size&&(M.size=c.size))):t=M.createElementNS(t,o),t[gi]=i,t[go]=c,bh(t,i,!1,!1),i.stateNode=t;e:{switch(M=vt(o,c),o){case"dialog":Nt("cancel",t),Nt("close",t),d=c;break;case"iframe":case"object":case"embed":Nt("load",t),d=c;break;case"video":case"audio":for(d=0;d<ho.length;d++)Nt(ho[d],t);d=c;break;case"source":Nt("error",t),d=c;break;case"img":case"image":case"link":Nt("error",t),Nt("load",t),d=c;break;case"details":Nt("toggle",t),d=c;break;case"input":Fe(t,c),d=qe(t,c),Nt("invalid",t);break;case"option":d=c;break;case"select":t._wrapperState={wasMultiple:!!c.multiple},d=Y({},c,{value:void 0}),Nt("invalid",t);break;case"textarea":xe(t,c),d=ye(t,c),Nt("invalid",t);break;default:d=c}ot(o,d),U=d;for(p in U)if(U.hasOwnProperty(p)){var B=U[p];p==="style"?Ye(t,B):p==="dangerouslySetInnerHTML"?(B=B?B.__html:void 0,B!=null&&we(t,B)):p==="children"?typeof B=="string"?(o!=="textarea"||B!=="")&&me(t,B):typeof B=="number"&&me(t,""+B):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(a.hasOwnProperty(p)?B!=null&&p==="onScroll"&&Nt("scroll",t):B!=null&&C(t,p,B,M))}switch(o){case"input":Ge(t),st(t,c,!1);break;case"textarea":Ge(t),H(t);break;case"option":c.value!=null&&t.setAttribute("value",""+Ce(c.value));break;case"select":t.multiple=!!c.multiple,p=c.value,p!=null?ne(t,!!c.multiple,p,!1):c.defaultValue!=null&&ne(t,!!c.multiple,c.defaultValue,!0);break;default:typeof d.onClick=="function"&&(t.onclick=ga)}switch(o){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return hn(i),null;case 6:if(t&&i.stateNode!=null)Rh(t,i,t.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(n(166));if(o=Nr(So.current),Nr(vi.current),Ea(i)){if(c=i.stateNode,o=i.memoizedProps,c[gi]=i,(p=c.nodeValue!==o)&&(t=Fn,t!==null))switch(t.tag){case 3:ma(c.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ma(c.nodeValue,o,(t.mode&1)!==0)}p&&(i.flags|=4)}else c=(o.nodeType===9?o:o.ownerDocument).createTextNode(c),c[gi]=i,i.stateNode=c}return hn(i),null;case 13:if(Dt(kt),c=i.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ot&&On!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Nd(),fs(),i.flags|=98560,p=!1;else if(p=Ea(i),c!==null&&c.dehydrated!==null){if(t===null){if(!p)throw Error(n(318));if(p=i.memoizedState,p=p!==null?p.dehydrated:null,!p)throw Error(n(317));p[gi]=i}else fs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;hn(i),p=!1}else ii!==null&&(hu(ii),ii=null),p=!0;if(!p)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(c=c!==null,c!==(t!==null&&t.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(t===null||(kt.current&1)!==0?Kt===0&&(Kt=3):gu())),i.updateQueue!==null&&(i.flags|=4),hn(i),null);case 4:return ms(),nu(t,i),t===null&&po(i.stateNode.containerInfo),hn(i),null;case 10:return Pc(i.type._context),hn(i),null;case 17:return bn(i.type)&&_a(),hn(i),null;case 19:if(Dt(kt),p=i.memoizedState,p===null)return hn(i),null;if(c=(i.flags&128)!==0,M=p.rendering,M===null)if(c)Ao(p,!1);else{if(Kt!==0||t!==null&&(t.flags&128)!==0)for(t=i.child;t!==null;){if(M=Ra(t),M!==null){for(i.flags|=128,Ao(p,!1),c=M.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=o,o=i.child;o!==null;)p=o,t=c,p.flags&=14680066,M=p.alternate,M===null?(p.childLanes=0,p.lanes=t,p.child=null,p.subtreeFlags=0,p.memoizedProps=null,p.memoizedState=null,p.updateQueue=null,p.dependencies=null,p.stateNode=null):(p.childLanes=M.childLanes,p.lanes=M.lanes,p.child=M.child,p.subtreeFlags=0,p.deletions=null,p.memoizedProps=M.memoizedProps,p.memoizedState=M.memoizedState,p.updateQueue=M.updateQueue,p.type=M.type,t=M.dependencies,p.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return Pt(kt,kt.current&1|2),i.child}t=t.sibling}p.tail!==null&&Oe()>xs&&(i.flags|=128,c=!0,Ao(p,!1),i.lanes=4194304)}else{if(!c)if(t=Ra(M),t!==null){if(i.flags|=128,c=!0,o=t.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Ao(p,!0),p.tail===null&&p.tailMode==="hidden"&&!M.alternate&&!Ot)return hn(i),null}else 2*Oe()-p.renderingStartTime>xs&&o!==1073741824&&(i.flags|=128,c=!0,Ao(p,!1),i.lanes=4194304);p.isBackwards?(M.sibling=i.child,i.child=M):(o=p.last,o!==null?o.sibling=M:i.child=M,p.last=M)}return p.tail!==null?(i=p.tail,p.rendering=i,p.tail=i.sibling,p.renderingStartTime=Oe(),i.sibling=null,o=kt.current,Pt(kt,c?o&1|2:o&1),i):(hn(i),null);case 22:case 23:return mu(),c=i.memoizedState!==null,t!==null&&t.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(kn&1073741824)!==0&&(hn(i),i.subtreeFlags&6&&(i.flags|=8192)):hn(i),null;case 24:return null;case 25:return null}throw Error(n(156,i.tag))}function Jv(t,i){switch(wc(i),i.tag){case 1:return bn(i.type)&&_a(),t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 3:return ms(),Dt(An),Dt(fn),Oc(),t=i.flags,(t&65536)!==0&&(t&128)===0?(i.flags=t&-65537|128,i):null;case 5:return Ic(i),null;case 13:if(Dt(kt),t=i.memoizedState,t!==null&&t.dehydrated!==null){if(i.alternate===null)throw Error(n(340));fs()}return t=i.flags,t&65536?(i.flags=t&-65537|128,i):null;case 19:return Dt(kt),null;case 4:return ms(),null;case 10:return Pc(i.type._context),null;case 22:case 23:return mu(),null;case 24:return null;default:return null}}var ka=!1,pn=!1,e_=typeof WeakSet=="function"?WeakSet:Set,ke=null;function vs(t,i){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(c){Gt(t,i,c)}else o.current=null}function iu(t,i,o){try{o()}catch(c){Gt(t,i,c)}}var Ph=!1;function t_(t,i){if(mc=ra,t=ld(),ac(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var c=o.getSelection&&o.getSelection();if(c&&c.rangeCount!==0){o=c.anchorNode;var d=c.anchorOffset,p=c.focusNode;c=c.focusOffset;try{o.nodeType,p.nodeType}catch{o=null;break e}var M=0,U=-1,B=-1,oe=0,_e=0,Se=t,ve=null;t:for(;;){for(var Ue;Se!==o||d!==0&&Se.nodeType!==3||(U=M+d),Se!==p||c!==0&&Se.nodeType!==3||(B=M+c),Se.nodeType===3&&(M+=Se.nodeValue.length),(Ue=Se.firstChild)!==null;)ve=Se,Se=Ue;for(;;){if(Se===t)break t;if(ve===o&&++oe===d&&(U=M),ve===p&&++_e===c&&(B=M),(Ue=Se.nextSibling)!==null)break;Se=ve,ve=Se.parentNode}Se=Ue}o=U===-1||B===-1?null:{start:U,end:B}}else o=null}o=o||{start:0,end:0}}else o=null;for(gc={focusedElem:t,selectionRange:o},ra=!1,ke=i;ke!==null;)if(i=ke,t=i.child,(i.subtreeFlags&1028)!==0&&t!==null)t.return=i,ke=t;else for(;ke!==null;){i=ke;try{var Ve=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Ve!==null){var je=Ve.memoizedProps,Wt=Ve.memoizedState,J=i.stateNode,W=J.getSnapshotBeforeUpdate(i.elementType===i.type?je:ri(i.type,je),Wt);J.__reactInternalSnapshotBeforeUpdate=W}break;case 3:var ie=i.stateNode.containerInfo;ie.nodeType===1?ie.textContent="":ie.nodeType===9&&ie.documentElement&&ie.removeChild(ie.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(Ae){Gt(i,i.return,Ae)}if(t=i.sibling,t!==null){t.return=i.return,ke=t;break}ke=i.return}return Ve=Ph,Ph=!1,Ve}function bo(t,i,o){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var d=c=c.next;do{if((d.tag&t)===t){var p=d.destroy;d.destroy=void 0,p!==void 0&&iu(i,o,p)}d=d.next}while(d!==c)}}function za(t,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&t)===t){var c=o.create;o.destroy=c()}o=o.next}while(o!==i)}}function ru(t){var i=t.ref;if(i!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof i=="function"?i(t):i.current=t}}function Lh(t){var i=t.alternate;i!==null&&(t.alternate=null,Lh(i)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(i=t.stateNode,i!==null&&(delete i[gi],delete i[go],delete i[yc],delete i[Ov],delete i[kv])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Nh(t){return t.tag===5||t.tag===3||t.tag===4}function Dh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Nh(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function su(t,i,o){var c=t.tag;if(c===5||c===6)t=t.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(t,i):o.insertBefore(t,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(t,o)):(i=o,i.appendChild(t)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=ga));else if(c!==4&&(t=t.child,t!==null))for(su(t,i,o),t=t.sibling;t!==null;)su(t,i,o),t=t.sibling}function ou(t,i,o){var c=t.tag;if(c===5||c===6)t=t.stateNode,i?o.insertBefore(t,i):o.appendChild(t);else if(c!==4&&(t=t.child,t!==null))for(ou(t,i,o),t=t.sibling;t!==null;)ou(t,i,o),t=t.sibling}var on=null,si=!1;function rr(t,i,o){for(o=o.child;o!==null;)Uh(t,i,o),o=o.sibling}function Uh(t,i,o){if(gt&&typeof gt.onCommitFiberUnmount=="function")try{gt.onCommitFiberUnmount(wn,o)}catch{}switch(o.tag){case 5:pn||vs(o,i);case 6:var c=on,d=si;on=null,rr(t,i,o),on=c,si=d,on!==null&&(si?(t=on,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):on.removeChild(o.stateNode));break;case 18:on!==null&&(si?(t=on,o=o.stateNode,t.nodeType===8?xc(t.parentNode,o):t.nodeType===1&&xc(t,o),ro(t)):xc(on,o.stateNode));break;case 4:c=on,d=si,on=o.stateNode.containerInfo,si=!0,rr(t,i,o),on=c,si=d;break;case 0:case 11:case 14:case 15:if(!pn&&(c=o.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){d=c=c.next;do{var p=d,M=p.destroy;p=p.tag,M!==void 0&&((p&2)!==0||(p&4)!==0)&&iu(o,i,M),d=d.next}while(d!==c)}rr(t,i,o);break;case 1:if(!pn&&(vs(o,i),c=o.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=o.memoizedProps,c.state=o.memoizedState,c.componentWillUnmount()}catch(U){Gt(o,i,U)}rr(t,i,o);break;case 21:rr(t,i,o);break;case 22:o.mode&1?(pn=(c=pn)||o.memoizedState!==null,rr(t,i,o),pn=c):rr(t,i,o);break;default:rr(t,i,o)}}function Ih(t){var i=t.updateQueue;if(i!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new e_),i.forEach(function(c){var d=u_.bind(null,t,c);o.has(c)||(o.add(c),c.then(d,d))})}}function oi(t,i){var o=i.deletions;if(o!==null)for(var c=0;c<o.length;c++){var d=o[c];try{var p=t,M=i,U=M;e:for(;U!==null;){switch(U.tag){case 5:on=U.stateNode,si=!1;break e;case 3:on=U.stateNode.containerInfo,si=!0;break e;case 4:on=U.stateNode.containerInfo,si=!0;break e}U=U.return}if(on===null)throw Error(n(160));Uh(p,M,d),on=null,si=!1;var B=d.alternate;B!==null&&(B.return=null),d.return=null}catch(oe){Gt(d,i,oe)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)Fh(i,t),i=i.sibling}function Fh(t,i){var o=t.alternate,c=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(oi(i,t),xi(t),c&4){try{bo(3,t,t.return),za(3,t)}catch(je){Gt(t,t.return,je)}try{bo(5,t,t.return)}catch(je){Gt(t,t.return,je)}}break;case 1:oi(i,t),xi(t),c&512&&o!==null&&vs(o,o.return);break;case 5:if(oi(i,t),xi(t),c&512&&o!==null&&vs(o,o.return),t.flags&32){var d=t.stateNode;try{me(d,"")}catch(je){Gt(t,t.return,je)}}if(c&4&&(d=t.stateNode,d!=null)){var p=t.memoizedProps,M=o!==null?o.memoizedProps:p,U=t.type,B=t.updateQueue;if(t.updateQueue=null,B!==null)try{U==="input"&&p.type==="radio"&&p.name!=null&&Be(d,p),vt(U,M);var oe=vt(U,p);for(M=0;M<B.length;M+=2){var _e=B[M],Se=B[M+1];_e==="style"?Ye(d,Se):_e==="dangerouslySetInnerHTML"?we(d,Se):_e==="children"?me(d,Se):C(d,_e,Se,oe)}switch(U){case"input":St(d,p);break;case"textarea":Me(d,p);break;case"select":var ve=d._wrapperState.wasMultiple;d._wrapperState.wasMultiple=!!p.multiple;var Ue=p.value;Ue!=null?ne(d,!!p.multiple,Ue,!1):ve!==!!p.multiple&&(p.defaultValue!=null?ne(d,!!p.multiple,p.defaultValue,!0):ne(d,!!p.multiple,p.multiple?[]:"",!1))}d[go]=p}catch(je){Gt(t,t.return,je)}}break;case 6:if(oi(i,t),xi(t),c&4){if(t.stateNode===null)throw Error(n(162));d=t.stateNode,p=t.memoizedProps;try{d.nodeValue=p}catch(je){Gt(t,t.return,je)}}break;case 3:if(oi(i,t),xi(t),c&4&&o!==null&&o.memoizedState.isDehydrated)try{ro(i.containerInfo)}catch(je){Gt(t,t.return,je)}break;case 4:oi(i,t),xi(t);break;case 13:oi(i,t),xi(t),d=t.child,d.flags&8192&&(p=d.memoizedState!==null,d.stateNode.isHidden=p,!p||d.alternate!==null&&d.alternate.memoizedState!==null||(cu=Oe())),c&4&&Ih(t);break;case 22:if(_e=o!==null&&o.memoizedState!==null,t.mode&1?(pn=(oe=pn)||_e,oi(i,t),pn=oe):oi(i,t),xi(t),c&8192){if(oe=t.memoizedState!==null,(t.stateNode.isHidden=oe)&&!_e&&(t.mode&1)!==0)for(ke=t,_e=t.child;_e!==null;){for(Se=ke=_e;ke!==null;){switch(ve=ke,Ue=ve.child,ve.tag){case 0:case 11:case 14:case 15:bo(4,ve,ve.return);break;case 1:vs(ve,ve.return);var Ve=ve.stateNode;if(typeof Ve.componentWillUnmount=="function"){c=ve,o=ve.return;try{i=c,Ve.props=i.memoizedProps,Ve.state=i.memoizedState,Ve.componentWillUnmount()}catch(je){Gt(c,o,je)}}break;case 5:vs(ve,ve.return);break;case 22:if(ve.memoizedState!==null){zh(Se);continue}}Ue!==null?(Ue.return=ve,ke=Ue):zh(Se)}_e=_e.sibling}e:for(_e=null,Se=t;;){if(Se.tag===5){if(_e===null){_e=Se;try{d=Se.stateNode,oe?(p=d.style,typeof p.setProperty=="function"?p.setProperty("display","none","important"):p.display="none"):(U=Se.stateNode,B=Se.memoizedProps.style,M=B!=null&&B.hasOwnProperty("display")?B.display:null,U.style.display=Ze("display",M))}catch(je){Gt(t,t.return,je)}}}else if(Se.tag===6){if(_e===null)try{Se.stateNode.nodeValue=oe?"":Se.memoizedProps}catch(je){Gt(t,t.return,je)}}else if((Se.tag!==22&&Se.tag!==23||Se.memoizedState===null||Se===t)&&Se.child!==null){Se.child.return=Se,Se=Se.child;continue}if(Se===t)break e;for(;Se.sibling===null;){if(Se.return===null||Se.return===t)break e;_e===Se&&(_e=null),Se=Se.return}_e===Se&&(_e=null),Se.sibling.return=Se.return,Se=Se.sibling}}break;case 19:oi(i,t),xi(t),c&4&&Ih(t);break;case 21:break;default:oi(i,t),xi(t)}}function xi(t){var i=t.flags;if(i&2){try{e:{for(var o=t.return;o!==null;){if(Nh(o)){var c=o;break e}o=o.return}throw Error(n(160))}switch(c.tag){case 5:var d=c.stateNode;c.flags&32&&(me(d,""),c.flags&=-33);var p=Dh(t);ou(t,p,d);break;case 3:case 4:var M=c.stateNode.containerInfo,U=Dh(t);su(t,U,M);break;default:throw Error(n(161))}}catch(B){Gt(t,t.return,B)}t.flags&=-3}i&4096&&(t.flags&=-4097)}function n_(t,i,o){ke=t,Oh(t)}function Oh(t,i,o){for(var c=(t.mode&1)!==0;ke!==null;){var d=ke,p=d.child;if(d.tag===22&&c){var M=d.memoizedState!==null||ka;if(!M){var U=d.alternate,B=U!==null&&U.memoizedState!==null||pn;U=ka;var oe=pn;if(ka=M,(pn=B)&&!oe)for(ke=d;ke!==null;)M=ke,B=M.child,M.tag===22&&M.memoizedState!==null?Bh(d):B!==null?(B.return=M,ke=B):Bh(d);for(;p!==null;)ke=p,Oh(p),p=p.sibling;ke=d,ka=U,pn=oe}kh(t)}else(d.subtreeFlags&8772)!==0&&p!==null?(p.return=d,ke=p):kh(t)}}function kh(t){for(;ke!==null;){var i=ke;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:pn||za(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!pn)if(o===null)c.componentDidMount();else{var d=i.elementType===i.type?o.memoizedProps:ri(i.type,o.memoizedProps);c.componentDidUpdate(d,o.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var p=i.updateQueue;p!==null&&zd(i,p,c);break;case 3:var M=i.updateQueue;if(M!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}zd(i,M,o)}break;case 5:var U=i.stateNode;if(o===null&&i.flags&4){o=U;var B=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":B.autoFocus&&o.focus();break;case"img":B.src&&(o.src=B.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var oe=i.alternate;if(oe!==null){var _e=oe.memoizedState;if(_e!==null){var Se=_e.dehydrated;Se!==null&&ro(Se)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}pn||i.flags&512&&ru(i)}catch(ve){Gt(i,i.return,ve)}}if(i===t){ke=null;break}if(o=i.sibling,o!==null){o.return=i.return,ke=o;break}ke=i.return}}function zh(t){for(;ke!==null;){var i=ke;if(i===t){ke=null;break}var o=i.sibling;if(o!==null){o.return=i.return,ke=o;break}ke=i.return}}function Bh(t){for(;ke!==null;){var i=ke;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{za(4,i)}catch(B){Gt(i,o,B)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var d=i.return;try{c.componentDidMount()}catch(B){Gt(i,d,B)}}var p=i.return;try{ru(i)}catch(B){Gt(i,p,B)}break;case 5:var M=i.return;try{ru(i)}catch(B){Gt(i,M,B)}}}catch(B){Gt(i,i.return,B)}if(i===t){ke=null;break}var U=i.sibling;if(U!==null){U.return=i.return,ke=U;break}ke=i.return}}var i_=Math.ceil,Ba=N.ReactCurrentDispatcher,au=N.ReactCurrentOwner,qn=N.ReactCurrentBatchConfig,_t=0,nn=null,Xt=null,an=0,kn=0,_s=Ji(0),Kt=0,Co=null,Ur=0,Ha=0,lu=0,Ro=null,Rn=null,cu=0,xs=1/0,Ni=null,Ga=!1,uu=null,sr=null,Va=!1,or=null,Wa=0,Po=0,fu=null,ja=-1,Xa=0;function yn(){return(_t&6)!==0?Oe():ja!==-1?ja:ja=Oe()}function ar(t){return(t.mode&1)===0?1:(_t&2)!==0&&an!==0?an&-an:Bv.transition!==null?(Xa===0&&(Xa=ta()),Xa):(t=Tt,t!==0||(t=window.event,t=t===void 0?16:Gf(t.type)),t)}function ai(t,i,o,c){if(50<Po)throw Po=0,fu=null,Error(n(185));Js(t,o,c),((_t&2)===0||t!==nn)&&(t===nn&&((_t&2)===0&&(Ha|=o),Kt===4&&lr(t,an)),Pn(t,c),o===1&&_t===0&&(i.mode&1)===0&&(xs=Oe()+500,ya&&tr()))}function Pn(t,i){var o=t.callbackNode;Tn(t,i);var c=Gn(t,t===nn?an:0);if(c===0)o!==null&&De(o),t.callbackNode=null,t.callbackPriority=0;else if(i=c&-c,t.callbackPriority!==i){if(o!=null&&De(o),i===1)t.tag===0?zv(Gh.bind(null,t)):bd(Gh.bind(null,t)),Iv(function(){(_t&6)===0&&tr()}),o=null;else{switch(Uf(c)){case 1:o=rt;break;case 4:o=at;break;case 16:o=Rt;break;case 536870912:o=Vt;break;default:o=Rt}o=Kh(o,Hh.bind(null,t))}t.callbackPriority=i,t.callbackNode=o}}function Hh(t,i){if(ja=-1,Xa=0,(_t&6)!==0)throw Error(n(327));var o=t.callbackNode;if(ys()&&t.callbackNode!==o)return null;var c=Gn(t,t===nn?an:0);if(c===0)return null;if((c&30)!==0||(c&t.expiredLanes)!==0||i)i=qa(t,c);else{i=c;var d=_t;_t|=2;var p=Wh();(nn!==t||an!==i)&&(Ni=null,xs=Oe()+500,Fr(t,i));do try{o_();break}catch(U){Vh(t,U)}while(!0);Rc(),Ba.current=p,_t=d,Xt!==null?i=0:(nn=null,an=0,i=Kt)}if(i!==0){if(i===2&&(d=Ar(t),d!==0&&(c=d,i=du(t,d))),i===1)throw o=Co,Fr(t,0),lr(t,c),Pn(t,Oe()),o;if(i===6)lr(t,c);else{if(d=t.current.alternate,(c&30)===0&&!r_(d)&&(i=qa(t,c),i===2&&(p=Ar(t),p!==0&&(c=p,i=du(t,p))),i===1))throw o=Co,Fr(t,0),lr(t,c),Pn(t,Oe()),o;switch(t.finishedWork=d,t.finishedLanes=c,i){case 0:case 1:throw Error(n(345));case 2:Or(t,Rn,Ni);break;case 3:if(lr(t,c),(c&130023424)===c&&(i=cu+500-Oe(),10<i)){if(Gn(t,0)!==0)break;if(d=t.suspendedLanes,(d&c)!==c){yn(),t.pingedLanes|=t.suspendedLanes&d;break}t.timeoutHandle=_c(Or.bind(null,t,Rn,Ni),i);break}Or(t,Rn,Ni);break;case 4:if(lr(t,c),(c&4194240)===c)break;for(i=t.eventTimes,d=-1;0<c;){var M=31-_n(c);p=1<<M,M=i[M],M>d&&(d=M),c&=~p}if(c=d,c=Oe()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*i_(c/1960))-c,10<c){t.timeoutHandle=_c(Or.bind(null,t,Rn,Ni),c);break}Or(t,Rn,Ni);break;case 5:Or(t,Rn,Ni);break;default:throw Error(n(329))}}}return Pn(t,Oe()),t.callbackNode===o?Hh.bind(null,t):null}function du(t,i){var o=Ro;return t.current.memoizedState.isDehydrated&&(Fr(t,i).flags|=256),t=qa(t,i),t!==2&&(i=Rn,Rn=o,i!==null&&hu(i)),t}function hu(t){Rn===null?Rn=t:Rn.push.apply(Rn,t)}function r_(t){for(var i=t;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var c=0;c<o.length;c++){var d=o[c],p=d.getSnapshot;d=d.value;try{if(!ni(p(),d))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===t)break;for(;i.sibling===null;){if(i.return===null||i.return===t)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function lr(t,i){for(i&=~lu,i&=~Ha,t.suspendedLanes|=i,t.pingedLanes&=~i,t=t.expirationTimes;0<i;){var o=31-_n(i),c=1<<o;t[o]=-1,i&=~c}}function Gh(t){if((_t&6)!==0)throw Error(n(327));ys();var i=Gn(t,0);if((i&1)===0)return Pn(t,Oe()),null;var o=qa(t,i);if(t.tag!==0&&o===2){var c=Ar(t);c!==0&&(i=c,o=du(t,c))}if(o===1)throw o=Co,Fr(t,0),lr(t,i),Pn(t,Oe()),o;if(o===6)throw Error(n(345));return t.finishedWork=t.current.alternate,t.finishedLanes=i,Or(t,Rn,Ni),Pn(t,Oe()),null}function pu(t,i){var o=_t;_t|=1;try{return t(i)}finally{_t=o,_t===0&&(xs=Oe()+500,ya&&tr())}}function Ir(t){or!==null&&or.tag===0&&(_t&6)===0&&ys();var i=_t;_t|=1;var o=qn.transition,c=Tt;try{if(qn.transition=null,Tt=1,t)return t()}finally{Tt=c,qn.transition=o,_t=i,(_t&6)===0&&tr()}}function mu(){kn=_s.current,Dt(_s)}function Fr(t,i){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,Uv(o)),Xt!==null)for(o=Xt.return;o!==null;){var c=o;switch(wc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&_a();break;case 3:ms(),Dt(An),Dt(fn),Oc();break;case 5:Ic(c);break;case 4:ms();break;case 13:Dt(kt);break;case 19:Dt(kt);break;case 10:Pc(c.type._context);break;case 22:case 23:mu()}o=o.return}if(nn=t,Xt=t=cr(t.current,null),an=kn=i,Kt=0,Co=null,lu=Ha=Ur=0,Rn=Ro=null,Lr!==null){for(i=0;i<Lr.length;i++)if(o=Lr[i],c=o.interleaved,c!==null){o.interleaved=null;var d=c.next,p=o.pending;if(p!==null){var M=p.next;p.next=d,c.next=M}o.pending=c}Lr=null}return t}function Vh(t,i){do{var o=Xt;try{if(Rc(),Pa.current=Ua,La){for(var c=zt.memoizedState;c!==null;){var d=c.queue;d!==null&&(d.pending=null),c=c.next}La=!1}if(Dr=0,tn=$t=zt=null,Mo=!1,Eo=0,au.current=null,o===null||o.return===null){Kt=1,Co=i,Xt=null;break}e:{var p=t,M=o.return,U=o,B=i;if(i=an,U.flags|=32768,B!==null&&typeof B=="object"&&typeof B.then=="function"){var oe=B,_e=U,Se=_e.tag;if((_e.mode&1)===0&&(Se===0||Se===11||Se===15)){var ve=_e.alternate;ve?(_e.updateQueue=ve.updateQueue,_e.memoizedState=ve.memoizedState,_e.lanes=ve.lanes):(_e.updateQueue=null,_e.memoizedState=null)}var Ue=ph(M);if(Ue!==null){Ue.flags&=-257,mh(Ue,M,U,p,i),Ue.mode&1&&hh(p,oe,i),i=Ue,B=oe;var Ve=i.updateQueue;if(Ve===null){var je=new Set;je.add(B),i.updateQueue=je}else Ve.add(B);break e}else{if((i&1)===0){hh(p,oe,i),gu();break e}B=Error(n(426))}}else if(Ot&&U.mode&1){var Wt=ph(M);if(Wt!==null){(Wt.flags&65536)===0&&(Wt.flags|=256),mh(Wt,M,U,p,i),bc(gs(B,U));break e}}p=B=gs(B,U),Kt!==4&&(Kt=2),Ro===null?Ro=[p]:Ro.push(p),p=M;do{switch(p.tag){case 3:p.flags|=65536,i&=-i,p.lanes|=i;var J=fh(p,B,i);kd(p,J);break e;case 1:U=B;var W=p.type,ie=p.stateNode;if((p.flags&128)===0&&(typeof W.getDerivedStateFromError=="function"||ie!==null&&typeof ie.componentDidCatch=="function"&&(sr===null||!sr.has(ie)))){p.flags|=65536,i&=-i,p.lanes|=i;var Ae=dh(p,U,i);kd(p,Ae);break e}}p=p.return}while(p!==null)}Xh(o)}catch(Xe){i=Xe,Xt===o&&o!==null&&(Xt=o=o.return);continue}break}while(!0)}function Wh(){var t=Ba.current;return Ba.current=Ua,t===null?Ua:t}function gu(){(Kt===0||Kt===3||Kt===2)&&(Kt=4),nn===null||(Ur&268435455)===0&&(Ha&268435455)===0||lr(nn,an)}function qa(t,i){var o=_t;_t|=2;var c=Wh();(nn!==t||an!==i)&&(Ni=null,Fr(t,i));do try{s_();break}catch(d){Vh(t,d)}while(!0);if(Rc(),_t=o,Ba.current=c,Xt!==null)throw Error(n(261));return nn=null,an=0,Kt}function s_(){for(;Xt!==null;)jh(Xt)}function o_(){for(;Xt!==null&&!$e();)jh(Xt)}function jh(t){var i=$h(t.alternate,t,kn);t.memoizedProps=t.pendingProps,i===null?Xh(t):Xt=i,au.current=null}function Xh(t){var i=t;do{var o=i.alternate;if(t=i.return,(i.flags&32768)===0){if(o=Qv(o,i,kn),o!==null){Xt=o;return}}else{if(o=Jv(o,i),o!==null){o.flags&=32767,Xt=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Kt=6,Xt=null;return}}if(i=i.sibling,i!==null){Xt=i;return}Xt=i=t}while(i!==null);Kt===0&&(Kt=5)}function Or(t,i,o){var c=Tt,d=qn.transition;try{qn.transition=null,Tt=1,a_(t,i,o,c)}finally{qn.transition=d,Tt=c}return null}function a_(t,i,o,c){do ys();while(or!==null);if((_t&6)!==0)throw Error(n(327));o=t.finishedWork;var d=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(n(177));t.callbackNode=null,t.callbackPriority=0;var p=o.lanes|o.childLanes;if(Hg(t,p),t===nn&&(Xt=nn=null,an=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||Va||(Va=!0,Kh(Rt,function(){return ys(),null})),p=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||p){p=qn.transition,qn.transition=null;var M=Tt;Tt=1;var U=_t;_t|=4,au.current=null,t_(t,o),Fh(o,t),bv(gc),ra=!!mc,gc=mc=null,t.current=o,n_(o),tt(),_t=U,Tt=M,qn.transition=p}else t.current=o;if(Va&&(Va=!1,or=t,Wa=d),p=t.pendingLanes,p===0&&(sr=null),dt(o.stateNode),Pn(t,Oe()),i!==null)for(c=t.onRecoverableError,o=0;o<i.length;o++)d=i[o],c(d.value,{componentStack:d.stack,digest:d.digest});if(Ga)throw Ga=!1,t=uu,uu=null,t;return(Wa&1)!==0&&t.tag!==0&&ys(),p=t.pendingLanes,(p&1)!==0?t===fu?Po++:(Po=0,fu=t):Po=0,tr(),null}function ys(){if(or!==null){var t=Uf(Wa),i=qn.transition,o=Tt;try{if(qn.transition=null,Tt=16>t?16:t,or===null)var c=!1;else{if(t=or,or=null,Wa=0,(_t&6)!==0)throw Error(n(331));var d=_t;for(_t|=4,ke=t.current;ke!==null;){var p=ke,M=p.child;if((ke.flags&16)!==0){var U=p.deletions;if(U!==null){for(var B=0;B<U.length;B++){var oe=U[B];for(ke=oe;ke!==null;){var _e=ke;switch(_e.tag){case 0:case 11:case 15:bo(8,_e,p)}var Se=_e.child;if(Se!==null)Se.return=_e,ke=Se;else for(;ke!==null;){_e=ke;var ve=_e.sibling,Ue=_e.return;if(Lh(_e),_e===oe){ke=null;break}if(ve!==null){ve.return=Ue,ke=ve;break}ke=Ue}}}var Ve=p.alternate;if(Ve!==null){var je=Ve.child;if(je!==null){Ve.child=null;do{var Wt=je.sibling;je.sibling=null,je=Wt}while(je!==null)}}ke=p}}if((p.subtreeFlags&2064)!==0&&M!==null)M.return=p,ke=M;else e:for(;ke!==null;){if(p=ke,(p.flags&2048)!==0)switch(p.tag){case 0:case 11:case 15:bo(9,p,p.return)}var J=p.sibling;if(J!==null){J.return=p.return,ke=J;break e}ke=p.return}}var W=t.current;for(ke=W;ke!==null;){M=ke;var ie=M.child;if((M.subtreeFlags&2064)!==0&&ie!==null)ie.return=M,ke=ie;else e:for(M=W;ke!==null;){if(U=ke,(U.flags&2048)!==0)try{switch(U.tag){case 0:case 11:case 15:za(9,U)}}catch(Xe){Gt(U,U.return,Xe)}if(U===M){ke=null;break e}var Ae=U.sibling;if(Ae!==null){Ae.return=U.return,ke=Ae;break e}ke=U.return}}if(_t=d,tr(),gt&&typeof gt.onPostCommitFiberRoot=="function")try{gt.onPostCommitFiberRoot(wn,t)}catch{}c=!0}return c}finally{Tt=o,qn.transition=i}}return!1}function qh(t,i,o){i=gs(o,i),i=fh(t,i,1),t=ir(t,i,1),i=yn(),t!==null&&(Js(t,1,i),Pn(t,i))}function Gt(t,i,o){if(t.tag===3)qh(t,t,o);else for(;i!==null;){if(i.tag===3){qh(i,t,o);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(sr===null||!sr.has(c))){t=gs(o,t),t=dh(i,t,1),i=ir(i,t,1),t=yn(),i!==null&&(Js(i,1,t),Pn(i,t));break}}i=i.return}}function l_(t,i,o){var c=t.pingCache;c!==null&&c.delete(i),i=yn(),t.pingedLanes|=t.suspendedLanes&o,nn===t&&(an&o)===o&&(Kt===4||Kt===3&&(an&130023424)===an&&500>Oe()-cu?Fr(t,0):lu|=o),Pn(t,i)}function Yh(t,i){i===0&&((t.mode&1)===0?i=1:(i=ji,ji<<=1,(ji&130023424)===0&&(ji=4194304)));var o=yn();t=Ri(t,i),t!==null&&(Js(t,i,o),Pn(t,o))}function c_(t){var i=t.memoizedState,o=0;i!==null&&(o=i.retryLane),Yh(t,o)}function u_(t,i){var o=0;switch(t.tag){case 13:var c=t.stateNode,d=t.memoizedState;d!==null&&(o=d.retryLane);break;case 19:c=t.stateNode;break;default:throw Error(n(314))}c!==null&&c.delete(i),Yh(t,o)}var $h;$h=function(t,i,o){if(t!==null)if(t.memoizedProps!==i.pendingProps||An.current)Cn=!0;else{if((t.lanes&o)===0&&(i.flags&128)===0)return Cn=!1,Zv(t,i,o);Cn=(t.flags&131072)!==0}else Cn=!1,Ot&&(i.flags&1048576)!==0&&Cd(i,Ma,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;Oa(t,i),t=i.pendingProps;var d=ls(i,fn.current);ps(i,o),d=Bc(null,i,c,t,d,o);var p=Hc();return i.flags|=1,typeof d=="object"&&d!==null&&typeof d.render=="function"&&d.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,bn(c)?(p=!0,xa(i)):p=!1,i.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,Dc(i),d.updater=Ia,i.stateNode=d,d._reactInternals=i,qc(i,c,t,o),i=Zc(null,i,c,!0,p,o)):(i.tag=0,Ot&&p&&Ec(i),xn(null,i,d,o),i=i.child),i;case 16:c=i.elementType;e:{switch(Oa(t,i),t=i.pendingProps,d=c._init,c=d(c._payload),i.type=c,d=i.tag=d_(c),t=ri(c,t),d){case 0:i=Kc(null,i,c,t,o);break e;case 1:i=Sh(null,i,c,t,o);break e;case 11:i=gh(null,i,c,t,o);break e;case 14:i=vh(null,i,c,ri(c.type,t),o);break e}throw Error(n(306,c,""))}return i;case 0:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ri(c,d),Kc(t,i,c,d,o);case 1:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ri(c,d),Sh(t,i,c,d,o);case 3:e:{if(Mh(i),t===null)throw Error(n(387));c=i.pendingProps,p=i.memoizedState,d=p.element,Od(t,i),Ca(i,c,null,o);var M=i.memoizedState;if(c=M.element,p.isDehydrated)if(p={element:c,isDehydrated:!1,cache:M.cache,pendingSuspenseBoundaries:M.pendingSuspenseBoundaries,transitions:M.transitions},i.updateQueue.baseState=p,i.memoizedState=p,i.flags&256){d=gs(Error(n(423)),i),i=Eh(t,i,c,o,d);break e}else if(c!==d){d=gs(Error(n(424)),i),i=Eh(t,i,c,o,d);break e}else for(On=Qi(i.stateNode.containerInfo.firstChild),Fn=i,Ot=!0,ii=null,o=Id(i,null,c,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(fs(),c===d){i=Li(t,i,o);break e}xn(t,i,c,o)}i=i.child}return i;case 5:return Bd(i),t===null&&Ac(i),c=i.type,d=i.pendingProps,p=t!==null?t.memoizedProps:null,M=d.children,vc(c,d)?M=null:p!==null&&vc(c,p)&&(i.flags|=32),yh(t,i),xn(t,i,M,o),i.child;case 6:return t===null&&Ac(i),null;case 13:return wh(t,i,o);case 4:return Uc(i,i.stateNode.containerInfo),c=i.pendingProps,t===null?i.child=ds(i,null,c,o):xn(t,i,c,o),i.child;case 11:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ri(c,d),gh(t,i,c,d,o);case 7:return xn(t,i,i.pendingProps,o),i.child;case 8:return xn(t,i,i.pendingProps.children,o),i.child;case 12:return xn(t,i,i.pendingProps.children,o),i.child;case 10:e:{if(c=i.type._context,d=i.pendingProps,p=i.memoizedProps,M=d.value,Pt(Ta,c._currentValue),c._currentValue=M,p!==null)if(ni(p.value,M)){if(p.children===d.children&&!An.current){i=Li(t,i,o);break e}}else for(p=i.child,p!==null&&(p.return=i);p!==null;){var U=p.dependencies;if(U!==null){M=p.child;for(var B=U.firstContext;B!==null;){if(B.context===c){if(p.tag===1){B=Pi(-1,o&-o),B.tag=2;var oe=p.updateQueue;if(oe!==null){oe=oe.shared;var _e=oe.pending;_e===null?B.next=B:(B.next=_e.next,_e.next=B),oe.pending=B}}p.lanes|=o,B=p.alternate,B!==null&&(B.lanes|=o),Lc(p.return,o,i),U.lanes|=o;break}B=B.next}}else if(p.tag===10)M=p.type===i.type?null:p.child;else if(p.tag===18){if(M=p.return,M===null)throw Error(n(341));M.lanes|=o,U=M.alternate,U!==null&&(U.lanes|=o),Lc(M,o,i),M=p.sibling}else M=p.child;if(M!==null)M.return=p;else for(M=p;M!==null;){if(M===i){M=null;break}if(p=M.sibling,p!==null){p.return=M.return,M=p;break}M=M.return}p=M}xn(t,i,d.children,o),i=i.child}return i;case 9:return d=i.type,c=i.pendingProps.children,ps(i,o),d=jn(d),c=c(d),i.flags|=1,xn(t,i,c,o),i.child;case 14:return c=i.type,d=ri(c,i.pendingProps),d=ri(c.type,d),vh(t,i,c,d,o);case 15:return _h(t,i,i.type,i.pendingProps,o);case 17:return c=i.type,d=i.pendingProps,d=i.elementType===c?d:ri(c,d),Oa(t,i),i.tag=1,bn(c)?(t=!0,xa(i)):t=!1,ps(i,o),ch(i,c,d),qc(i,c,d,o),Zc(null,i,c,!0,t,o);case 19:return Ah(t,i,o);case 22:return xh(t,i,o)}throw Error(n(156,i.tag))};function Kh(t,i){return ae(t,i)}function f_(t,i,o,c){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(t,i,o,c){return new f_(t,i,o,c)}function vu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function d_(t){if(typeof t=="function")return vu(t)?1:0;if(t!=null){if(t=t.$$typeof,t===$)return 11;if(t===te)return 14}return 2}function cr(t,i){var o=t.alternate;return o===null?(o=Yn(t.tag,i,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=i,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,i=t.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function Ya(t,i,o,c,d,p){var M=2;if(c=t,typeof t=="function")vu(t)&&(M=1);else if(typeof t=="string")M=5;else e:switch(t){case F:return kr(o.children,d,p,i);case fe:M=8,d|=8;break;case T:return t=Yn(12,o,i,d|2),t.elementType=T,t.lanes=p,t;case pe:return t=Yn(13,o,i,d),t.elementType=pe,t.lanes=p,t;case k:return t=Yn(19,o,i,d),t.elementType=k,t.lanes=p,t;case le:return $a(o,d,p,i);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case A:M=10;break e;case K:M=9;break e;case $:M=11;break e;case te:M=14;break e;case re:M=16,c=null;break e}throw Error(n(130,t==null?t:typeof t,""))}return i=Yn(M,o,i,d),i.elementType=t,i.type=c,i.lanes=p,i}function kr(t,i,o,c){return t=Yn(7,t,c,i),t.lanes=o,t}function $a(t,i,o,c){return t=Yn(22,t,c,i),t.elementType=le,t.lanes=o,t.stateNode={isHidden:!1},t}function _u(t,i,o){return t=Yn(6,t,null,i),t.lanes=o,t}function xu(t,i,o){return i=Yn(4,t.children!==null?t.children:[],t.key,i),i.lanes=o,i.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},i}function h_(t,i,o,c,d){this.tag=i,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Qr(0),this.expirationTimes=Qr(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Qr(0),this.identifierPrefix=c,this.onRecoverableError=d,this.mutableSourceEagerHydrationData=null}function yu(t,i,o,c,d,p,M,U,B){return t=new h_(t,i,o,U,B),i===1?(i=1,p===!0&&(i|=8)):i=0,p=Yn(3,null,null,i),t.current=p,p.stateNode=t,p.memoizedState={element:c,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Dc(p),t}function p_(t,i,o){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:I,key:c==null?null:""+c,children:t,containerInfo:i,implementation:o}}function Zh(t){if(!t)return er;t=t._reactInternals;e:{if(Ei(t)!==t||t.tag!==1)throw Error(n(170));var i=t;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(bn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(n(171))}if(t.tag===1){var o=t.type;if(bn(o))return Td(t,o,i)}return i}function Qh(t,i,o,c,d,p,M,U,B){return t=yu(o,c,!0,t,d,p,M,U,B),t.context=Zh(null),o=t.current,c=yn(),d=ar(o),p=Pi(c,d),p.callback=i??null,ir(o,p,d),t.current.lanes=d,Js(t,d,c),Pn(t,c),t}function Ka(t,i,o,c){var d=i.current,p=yn(),M=ar(d);return o=Zh(o),i.context===null?i.context=o:i.pendingContext=o,i=Pi(p,M),i.payload={element:t},c=c===void 0?null:c,c!==null&&(i.callback=c),t=ir(d,i,M),t!==null&&(ai(t,d,M,p),ba(t,d,M)),M}function Za(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Jh(t,i){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<i?o:i}}function Su(t,i){Jh(t,i),(t=t.alternate)&&Jh(t,i)}function m_(){return null}var ep=typeof reportError=="function"?reportError:function(t){console.error(t)};function Mu(t){this._internalRoot=t}Qa.prototype.render=Mu.prototype.render=function(t){var i=this._internalRoot;if(i===null)throw Error(n(409));Ka(t,i,null,null)},Qa.prototype.unmount=Mu.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var i=t.containerInfo;Ir(function(){Ka(null,t,null,null)}),i[Ti]=null}};function Qa(t){this._internalRoot=t}Qa.prototype.unstable_scheduleHydration=function(t){if(t){var i=Of();t={blockedOn:null,target:t,priority:i};for(var o=0;o<$i.length&&i!==0&&i<$i[o].priority;o++);$i.splice(o,0,t),o===0&&Bf(t)}};function Eu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ja(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function tp(){}function g_(t,i,o,c,d){if(d){if(typeof c=="function"){var p=c;c=function(){var oe=Za(M);p.call(oe)}}var M=Qh(i,c,t,0,null,!1,!1,"",tp);return t._reactRootContainer=M,t[Ti]=M.current,po(t.nodeType===8?t.parentNode:t),Ir(),M}for(;d=t.lastChild;)t.removeChild(d);if(typeof c=="function"){var U=c;c=function(){var oe=Za(B);U.call(oe)}}var B=yu(t,0,!1,null,null,!1,!1,"",tp);return t._reactRootContainer=B,t[Ti]=B.current,po(t.nodeType===8?t.parentNode:t),Ir(function(){Ka(i,B,o,c)}),B}function el(t,i,o,c,d){var p=o._reactRootContainer;if(p){var M=p;if(typeof d=="function"){var U=d;d=function(){var B=Za(M);U.call(B)}}Ka(i,M,t,d)}else M=g_(o,i,t,d,c);return Za(M)}If=function(t){switch(t.tag){case 3:var i=t.stateNode;if(i.current.memoizedState.isDehydrated){var o=Ht(i.pendingLanes);o!==0&&(ql(i,o|1),Pn(i,Oe()),(_t&6)===0&&(xs=Oe()+500,tr()))}break;case 13:Ir(function(){var c=Ri(t,1);if(c!==null){var d=yn();ai(c,t,1,d)}}),Su(t,1)}},Yl=function(t){if(t.tag===13){var i=Ri(t,134217728);if(i!==null){var o=yn();ai(i,t,134217728,o)}Su(t,134217728)}},Ff=function(t){if(t.tag===13){var i=ar(t),o=Ri(t,i);if(o!==null){var c=yn();ai(o,t,i,c)}Su(t,i)}},Of=function(){return Tt},kf=function(t,i){var o=Tt;try{return Tt=t,i()}finally{Tt=o}},Re=function(t,i,o){switch(i){case"input":if(St(t,o),i=o.name,o.type==="radio"&&i!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var c=o[i];if(c!==t&&c.form===t.form){var d=va(c);if(!d)throw Error(n(90));Q(c),St(c,d)}}}break;case"textarea":Me(t,o);break;case"select":i=o.value,i!=null&&ne(t,!!o.multiple,i,!1)}},Et=pu,wt=Ir;var v_={usingClientEntryPoint:!1,Events:[vo,os,va,nt,Qe,pu]},Lo={findFiberByHostInstance:br,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},__={bundleType:Lo.bundleType,version:Lo.version,rendererPackageName:Lo.rendererPackageName,rendererConfig:Lo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:N.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=ce(t),t===null?null:t.stateNode},findFiberByHostInstance:Lo.findFiberByHostInstance||m_,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var tl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!tl.isDisabled&&tl.supportsFiber)try{wn=tl.inject(__),gt=tl}catch{}}return Ln.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=v_,Ln.createPortal=function(t,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Eu(i))throw Error(n(200));return p_(t,i,null,o)},Ln.createRoot=function(t,i){if(!Eu(t))throw Error(n(299));var o=!1,c="",d=ep;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(d=i.onRecoverableError)),i=yu(t,1,!1,null,null,o,!1,c,d),t[Ti]=i.current,po(t.nodeType===8?t.parentNode:t),new Mu(i)},Ln.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var i=t._reactInternals;if(i===void 0)throw typeof t.render=="function"?Error(n(188)):(t=Object.keys(t).join(","),Error(n(268,t)));return t=ce(i),t=t===null?null:t.stateNode,t},Ln.flushSync=function(t){return Ir(t)},Ln.hydrate=function(t,i,o){if(!Ja(i))throw Error(n(200));return el(null,t,i,!0,o)},Ln.hydrateRoot=function(t,i,o){if(!Eu(t))throw Error(n(405));var c=o!=null&&o.hydratedSources||null,d=!1,p="",M=ep;if(o!=null&&(o.unstable_strictMode===!0&&(d=!0),o.identifierPrefix!==void 0&&(p=o.identifierPrefix),o.onRecoverableError!==void 0&&(M=o.onRecoverableError)),i=Qh(i,null,t,1,o??null,d,!1,p,M),t[Ti]=i.current,po(t),c)for(t=0;t<c.length;t++)o=c[t],d=o._getVersion,d=d(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,d]:i.mutableSourceEagerHydrationData.push(o,d);return new Qa(i)},Ln.render=function(t,i,o){if(!Ja(i))throw Error(n(200));return el(null,t,i,!1,o)},Ln.unmountComponentAtNode=function(t){if(!Ja(t))throw Error(n(40));return t._reactRootContainer?(Ir(function(){el(null,null,t,!1,function(){t._reactRootContainer=null,t[Ti]=null})}),!0):!1},Ln.unstable_batchedUpdates=pu,Ln.unstable_renderSubtreeIntoContainer=function(t,i,o,c){if(!Ja(o))throw Error(n(200));if(t==null||t._reactInternals===void 0)throw Error(n(38));return el(t,i,o,!1,c)},Ln.version="18.3.1-next-f1338f8080-20240426",Ln}var cp;function b_(){if(cp)return Au.exports;cp=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Au.exports=A_(),Au.exports}var up;function C_(){if(up)return nl;up=1;var r=b_();return nl.createRoot=r.createRoot,nl.hydrateRoot=r.hydrateRoot,nl}var R_=C_();const P_=Zm(R_);function Nl(r){if(!r)return"";let e=r.replace(/\/+$/,"");e=e.replace(/\\/g,"/");const n=e.lastIndexOf("/");return n===-1?e:e.slice(n+1)}function L_(r){if(!r)return".";let e=r.replace(/\\/g,"/");e=e.replace(/\/+$/,"");const n=e.lastIndexOf("/");return n===-1?".":n===0?"/":e.slice(0,n)}function N_(r){const e=Nl(r),n=e.lastIndexOf(".");return n<=0?"":e.slice(n)}function fp(r){const e=r.length,n=r.filter(s=>s.status==="passed").length;return{passed:n,total:e,text:`${n}/${e}`}}function D_(r){if(r.cwd){const s=Nl(r.cwd);if(s)return s}const e=L_(r.workflowPath),n=Nl(e);return n||Nl(r.workflowPath)}function dp(r){return r.title?r.title:r.workflowId}function hp(r){switch(r){case"running":return{symbol:"●",color:"#0080FF",label:"running"};case"paused":return{symbol:"◐",color:"#FFCC00",label:"paused"};case"done":return{symbol:"✔",color:"#00CC00",label:"done"};case"aborted":return{symbol:"✘",color:"#FF4444",label:"aborted"};default:return{symbol:"?",color:"#888888",label:r}}}function U_(r){return r==="skipped"}function I_(r,e){const n=e!=null&&r.stepKey===e,s=U_(r.status);let a;switch(r.status){case"passed":a="#00CC00";break;case"running":a="#0080FF";break;case"failed":a="#FF4444";break;case"skipped":a="#888888";break;case"pending":default:a="#666666";break}return s?a="#999999":n&&(a="#FFCC00"),{borderColor:a,isCurrent:n,isSkipped:s}}const F_=[".md",".txt",".json",".yaml",".yml",".toml",".ts",".js",".tsx",".jsx",".sql",".css",".html"],O_=new Set(F_);function k_(r,e){const n=N_(r).toLowerCase();if(!O_.has(n))return`unsupported extension: ${n||"(none)"}`}function Ru(r){return`プレビュー非対応: ${r}`}function z_(r,e){return`${r.artifactKey}: ${r.filePath} (${e?"存在✓":"欠損✗"})`}const Di=10;function pp(r,e,n){const s=[];for(const a of r){const l=a.startedAt??a.endedAt??"",f=n==null?void 0:n.get(a.stepId);s.push({kind:"attempt",timestamp:l,attempt:a,stepKey:f})}for(const a of e){const l=a.createdAt??"",f={id:a.id,stepKey:a.stepKey,event:a.event,answersJson:a.answersJson??null,createdAt:a.createdAt};s.push({kind:"gate_event",timestamp:l,gateEvent:f})}return s.sort((a,l)=>{if(a.timestamp!==l.timestamp)return a.timestamp<l.timestamp?-1:1;const f=a.kind==="attempt"?a.attempt.id??0:a.gateEvent.id??0,u=l.kind==="attempt"?l.attempt.id??0:l.gateEvent.id??0;return f-u}),s.reverse(),s.slice(0,20)}function B_(r){if(!r)return"-";try{const e=JSON.parse(r);if(!e||typeof e!="object"||Array.isArray(e))return String(r);const n=e,s=[];for(const[a,l]of Object.entries(n))if(typeof l=="string")s.push(`${a}: ${l}`);else if(l&&typeof l=="object"&&"value"in l){const f=l;f.input!=null&&f.input!==""?s.push(`${a}: ${f.value} (${f.input})`):s.push(`${a}: ${f.value}`)}else s.push(`${a}: ${JSON.stringify(l)}`);return s.length>0?s.join(", "):"-"}catch{return String(r)}}function H_(r){if(r.kind==="attempt"){const s=r.attempt,a=r.stepKey??String(s.stepId),l=s.checkStatus??"-";return`${r.timestamp} [attempt] ${a} #${s.attemptNumber} check:${l}`}const e=r.gateEvent,n=B_(e.answersJson??null);return`${r.timestamp} [gate] ${e.stepKey} ${e.event} answers:${n==="-"?"-":" "+n}`}const mp=180,Pu=72,gp=56,G_=16,vp=24,Lu=24;function V_(r){if(r.length===0)return{nodes:[],edges:[],width:0,height:0};const e=[],n=new Map;for(const v of r){const S=v.phase??"__none__";n.has(S)||(n.set(S,e.length),e.push(S))}const s=new Map;for(const v of r){const S=v.phase??"__none__",w=s.get(S);w?w.push(v):s.set(S,[v])}const a=[];for(const v of r){const S=v.phase??"__none__",w=n.get(S),E=s.get(S),x=E.findIndex(N=>N.key===v.key&&N.index===v.index),g=E.length,L=vp+w*(mp+gp),C=Lu+x*(Pu+G_);a.push({key:v.key,phase:v.phase,type:v.type,index:v.index,phaseIndex:w,withinPhaseIndex:x>=0?x:0,phaseSize:g,x:L,y:C})}const l=[],f=[];for(const v of r){const S=f.length>0?f[f.length-1]:void 0;S&&S.phase===v.phase?S.steps.push(v):f.push({phase:v.phase,steps:[v]})}for(let v=0;v<f.length;v++){const S=f[v],w=f[v+1];if(w){if(S.steps.length===1&&w.steps.length===1)l.push({from:S.steps[0].key,to:w.steps[0].key});else if(S.steps.length===1&&w.steps.length>1)for(const E of w.steps)l.push({from:S.steps[0].key,to:E.key});else if(S.steps.length>1&&w.steps.length===1)for(const E of S.steps)l.push({from:E.key,to:w.steps[0].key});else for(const E of S.steps){for(const x of w.steps)if(l.push({from:E.key,to:x.key}),l.length>60)break;if(l.length>60)break}if(l.length>60)break}}if(l.length===0&&r.length>1)for(let v=0;v<r.length-1;v++)l.push({from:r[v].key,to:r[v+1].key});const u=Math.max(...a.map(v=>v.phaseIndex)),h=new Map;for(const v of a){const S=h.get(v.phaseIndex)??0;h.set(v.phaseIndex,Math.max(S,v.y+Pu))}const m=Math.max(...Array.from(h.values()),Lu+Pu),_=vp*2+(u+1)*mp+u*gp,y=m+Lu;return{nodes:a,edges:l,width:_,height:y}}function Qm(r){var e,n,s="";if(typeof r=="string"||typeof r=="number")s+=r;else if(typeof r=="object")if(Array.isArray(r)){var a=r.length;for(e=0;e<a;e++)r[e]&&(n=Qm(r[e]))&&(s&&(s+=" "),s+=n)}else for(n in r)r[n]&&(s&&(s+=" "),s+=n);return s}function Jm(){for(var r,e,n=0,s="",a=arguments.length;n<a;n++)(r=arguments[n])&&(e=Qm(r))&&(s&&(s+=" "),s+=e);return s}const Af="-",W_=r=>{const e=X_(r),{conflictingClassGroups:n,conflictingClassGroupModifiers:s}=r;return{getClassGroupId:f=>{const u=f.split(Af);return u[0]===""&&u.length!==1&&u.shift(),eg(u,e)||j_(f)},getConflictingClassGroupIds:(f,u)=>{const h=n[f]||[];return u&&s[f]?[...h,...s[f]]:h}}},eg=(r,e)=>{var f;if(r.length===0)return e.classGroupId;const n=r[0],s=e.nextPart.get(n),a=s?eg(r.slice(1),s):void 0;if(a)return a;if(e.validators.length===0)return;const l=r.join(Af);return(f=e.validators.find(({validator:u})=>u(l)))==null?void 0:f.classGroupId},_p=/^\[(.+)\]$/,j_=r=>{if(_p.test(r)){const e=_p.exec(r)[1],n=e==null?void 0:e.substring(0,e.indexOf(":"));if(n)return"arbitrary.."+n}},X_=r=>{const{theme:e,prefix:n}=r,s={nextPart:new Map,validators:[]};return Y_(Object.entries(r.classGroups),n).forEach(([l,f])=>{hf(f,s,l,e)}),s},hf=(r,e,n,s)=>{r.forEach(a=>{if(typeof a=="string"){const l=a===""?e:xp(e,a);l.classGroupId=n;return}if(typeof a=="function"){if(q_(a)){hf(a(s),e,n,s);return}e.validators.push({validator:a,classGroupId:n});return}Object.entries(a).forEach(([l,f])=>{hf(f,xp(e,l),n,s)})})},xp=(r,e)=>{let n=r;return e.split(Af).forEach(s=>{n.nextPart.has(s)||n.nextPart.set(s,{nextPart:new Map,validators:[]}),n=n.nextPart.get(s)}),n},q_=r=>r.isThemeGetter,Y_=(r,e)=>e?r.map(([n,s])=>{const a=s.map(l=>typeof l=="string"?e+l:typeof l=="object"?Object.fromEntries(Object.entries(l).map(([f,u])=>[e+f,u])):l);return[n,a]}):r,$_=r=>{if(r<1)return{get:()=>{},set:()=>{}};let e=0,n=new Map,s=new Map;const a=(l,f)=>{n.set(l,f),e++,e>r&&(e=0,s=n,n=new Map)};return{get(l){let f=n.get(l);if(f!==void 0)return f;if((f=s.get(l))!==void 0)return a(l,f),f},set(l,f){n.has(l)?n.set(l,f):a(l,f)}}},tg="!",K_=r=>{const{separator:e,experimentalParseClassName:n}=r,s=e.length===1,a=e[0],l=e.length,f=u=>{const h=[];let m=0,_=0,y;for(let x=0;x<u.length;x++){let g=u[x];if(m===0){if(g===a&&(s||u.slice(x,x+l)===e)){h.push(u.slice(_,x)),_=x+l;continue}if(g==="/"){y=x;continue}}g==="["?m++:g==="]"&&m--}const v=h.length===0?u:u.substring(_),S=v.startsWith(tg),w=S?v.substring(1):v,E=y&&y>_?y-_:void 0;return{modifiers:h,hasImportantModifier:S,baseClassName:w,maybePostfixModifierPosition:E}};return n?u=>n({className:u,parseClassName:f}):f},Z_=r=>{if(r.length<=1)return r;const e=[];let n=[];return r.forEach(s=>{s[0]==="["?(e.push(...n.sort(),s),n=[]):n.push(s)}),e.push(...n.sort()),e},Q_=r=>({cache:$_(r.cacheSize),parseClassName:K_(r),...W_(r)}),J_=/\s+/,ex=(r,e)=>{const{parseClassName:n,getClassGroupId:s,getConflictingClassGroupIds:a}=e,l=[],f=r.trim().split(J_);let u="";for(let h=f.length-1;h>=0;h-=1){const m=f[h],{modifiers:_,hasImportantModifier:y,baseClassName:v,maybePostfixModifierPosition:S}=n(m);let w=!!S,E=s(w?v.substring(0,S):v);if(!E){if(!w){u=m+(u.length>0?" "+u:u);continue}if(E=s(v),!E){u=m+(u.length>0?" "+u:u);continue}w=!1}const x=Z_(_).join(":"),g=y?x+tg:x,L=g+E;if(l.includes(L))continue;l.push(L);const C=a(E,w);for(let N=0;N<C.length;++N){const j=C[N];l.push(g+j)}u=m+(u.length>0?" "+u:u)}return u};function tx(){let r=0,e,n,s="";for(;r<arguments.length;)(e=arguments[r++])&&(n=ng(e))&&(s&&(s+=" "),s+=n);return s}const ng=r=>{if(typeof r=="string")return r;let e,n="";for(let s=0;s<r.length;s++)r[s]&&(e=ng(r[s]))&&(n&&(n+=" "),n+=e);return n};function nx(r,...e){let n,s,a,l=f;function f(h){const m=e.reduce((_,y)=>y(_),r());return n=Q_(m),s=n.cache.get,a=n.cache.set,l=u,u(h)}function u(h){const m=s(h);if(m)return m;const _=ex(h,n);return a(h,_),_}return function(){return l(tx.apply(null,arguments))}}const Ut=r=>{const e=n=>n[r]||[];return e.isThemeGetter=!0,e},ig=/^\[(?:([a-z-]+):)?(.+)\]$/i,ix=/^\d+\/\d+$/,rx=new Set(["px","full","screen"]),sx=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,ox=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,ax=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,lx=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,cx=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Ui=r=>Hs(r)||rx.has(r)||ix.test(r),fr=r=>Ys(r,"length",vx),Hs=r=>!!r&&!Number.isNaN(Number(r)),Nu=r=>Ys(r,"number",Hs),Do=r=>!!r&&Number.isInteger(Number(r)),ux=r=>r.endsWith("%")&&Hs(r.slice(0,-1)),ft=r=>ig.test(r),dr=r=>sx.test(r),fx=new Set(["length","size","percentage"]),dx=r=>Ys(r,fx,rg),hx=r=>Ys(r,"position",rg),px=new Set(["image","url"]),mx=r=>Ys(r,px,xx),gx=r=>Ys(r,"",_x),Uo=()=>!0,Ys=(r,e,n)=>{const s=ig.exec(r);return s?s[1]?typeof e=="string"?s[1]===e:e.has(s[1]):n(s[2]):!1},vx=r=>ox.test(r)&&!ax.test(r),rg=()=>!1,_x=r=>lx.test(r),xx=r=>cx.test(r),yx=()=>{const r=Ut("colors"),e=Ut("spacing"),n=Ut("blur"),s=Ut("brightness"),a=Ut("borderColor"),l=Ut("borderRadius"),f=Ut("borderSpacing"),u=Ut("borderWidth"),h=Ut("contrast"),m=Ut("grayscale"),_=Ut("hueRotate"),y=Ut("invert"),v=Ut("gap"),S=Ut("gradientColorStops"),w=Ut("gradientColorStopPositions"),E=Ut("inset"),x=Ut("margin"),g=Ut("opacity"),L=Ut("padding"),C=Ut("saturate"),N=Ut("scale"),j=Ut("sepia"),I=Ut("skew"),F=Ut("space"),fe=Ut("translate"),T=()=>["auto","contain","none"],A=()=>["auto","hidden","clip","visible","scroll"],K=()=>["auto",ft,e],$=()=>[ft,e],pe=()=>["",Ui,fr],k=()=>["auto",Hs,ft],te=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],re=()=>["solid","dashed","dotted","double","none"],le=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],V=()=>["start","end","center","between","around","evenly","stretch"],z=()=>["","0",ft],Y=()=>["auto","avoid","all","avoid-page","page","left","right","column"],D=()=>[Hs,ft];return{cacheSize:500,separator:":",theme:{colors:[Uo],spacing:[Ui,fr],blur:["none","",dr,ft],brightness:D(),borderColor:[r],borderRadius:["none","","full",dr,ft],borderSpacing:$(),borderWidth:pe(),contrast:D(),grayscale:z(),hueRotate:D(),invert:z(),gap:$(),gradientColorStops:[r],gradientColorStopPositions:[ux,fr],inset:K(),margin:K(),opacity:D(),padding:$(),saturate:D(),scale:D(),sepia:z(),skew:D(),space:$(),translate:$()},classGroups:{aspect:[{aspect:["auto","square","video",ft]}],container:["container"],columns:[{columns:[dr]}],"break-after":[{"break-after":Y()}],"break-before":[{"break-before":Y()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...te(),ft]}],overflow:[{overflow:A()}],"overflow-x":[{"overflow-x":A()}],"overflow-y":[{"overflow-y":A()}],overscroll:[{overscroll:T()}],"overscroll-x":[{"overscroll-x":T()}],"overscroll-y":[{"overscroll-y":T()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[E]}],"inset-x":[{"inset-x":[E]}],"inset-y":[{"inset-y":[E]}],start:[{start:[E]}],end:[{end:[E]}],top:[{top:[E]}],right:[{right:[E]}],bottom:[{bottom:[E]}],left:[{left:[E]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",Do,ft]}],basis:[{basis:K()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",ft]}],grow:[{grow:z()}],shrink:[{shrink:z()}],order:[{order:["first","last","none",Do,ft]}],"grid-cols":[{"grid-cols":[Uo]}],"col-start-end":[{col:["auto",{span:["full",Do,ft]},ft]}],"col-start":[{"col-start":k()}],"col-end":[{"col-end":k()}],"grid-rows":[{"grid-rows":[Uo]}],"row-start-end":[{row:["auto",{span:[Do,ft]},ft]}],"row-start":[{"row-start":k()}],"row-end":[{"row-end":k()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",ft]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",ft]}],gap:[{gap:[v]}],"gap-x":[{"gap-x":[v]}],"gap-y":[{"gap-y":[v]}],"justify-content":[{justify:["normal",...V()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...V(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...V(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[L]}],px:[{px:[L]}],py:[{py:[L]}],ps:[{ps:[L]}],pe:[{pe:[L]}],pt:[{pt:[L]}],pr:[{pr:[L]}],pb:[{pb:[L]}],pl:[{pl:[L]}],m:[{m:[x]}],mx:[{mx:[x]}],my:[{my:[x]}],ms:[{ms:[x]}],me:[{me:[x]}],mt:[{mt:[x]}],mr:[{mr:[x]}],mb:[{mb:[x]}],ml:[{ml:[x]}],"space-x":[{"space-x":[F]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[F]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",ft,e]}],"min-w":[{"min-w":[ft,e,"min","max","fit"]}],"max-w":[{"max-w":[ft,e,"none","full","min","max","fit","prose",{screen:[dr]},dr]}],h:[{h:[ft,e,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[ft,e,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[ft,e,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[ft,e,"auto","min","max","fit"]}],"font-size":[{text:["base",dr,fr]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",Nu]}],"font-family":[{font:[Uo]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",ft]}],"line-clamp":[{"line-clamp":["none",Hs,Nu]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",Ui,ft]}],"list-image":[{"list-image":["none",ft]}],"list-style-type":[{list:["none","disc","decimal",ft]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[r]}],"placeholder-opacity":[{"placeholder-opacity":[g]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[r]}],"text-opacity":[{"text-opacity":[g]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...re(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",Ui,fr]}],"underline-offset":[{"underline-offset":["auto",Ui,ft]}],"text-decoration-color":[{decoration:[r]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:$()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",ft]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",ft]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[g]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...te(),hx]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",dx]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},mx]}],"bg-color":[{bg:[r]}],"gradient-from-pos":[{from:[w]}],"gradient-via-pos":[{via:[w]}],"gradient-to-pos":[{to:[w]}],"gradient-from":[{from:[S]}],"gradient-via":[{via:[S]}],"gradient-to":[{to:[S]}],rounded:[{rounded:[l]}],"rounded-s":[{"rounded-s":[l]}],"rounded-e":[{"rounded-e":[l]}],"rounded-t":[{"rounded-t":[l]}],"rounded-r":[{"rounded-r":[l]}],"rounded-b":[{"rounded-b":[l]}],"rounded-l":[{"rounded-l":[l]}],"rounded-ss":[{"rounded-ss":[l]}],"rounded-se":[{"rounded-se":[l]}],"rounded-ee":[{"rounded-ee":[l]}],"rounded-es":[{"rounded-es":[l]}],"rounded-tl":[{"rounded-tl":[l]}],"rounded-tr":[{"rounded-tr":[l]}],"rounded-br":[{"rounded-br":[l]}],"rounded-bl":[{"rounded-bl":[l]}],"border-w":[{border:[u]}],"border-w-x":[{"border-x":[u]}],"border-w-y":[{"border-y":[u]}],"border-w-s":[{"border-s":[u]}],"border-w-e":[{"border-e":[u]}],"border-w-t":[{"border-t":[u]}],"border-w-r":[{"border-r":[u]}],"border-w-b":[{"border-b":[u]}],"border-w-l":[{"border-l":[u]}],"border-opacity":[{"border-opacity":[g]}],"border-style":[{border:[...re(),"hidden"]}],"divide-x":[{"divide-x":[u]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[u]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[g]}],"divide-style":[{divide:re()}],"border-color":[{border:[a]}],"border-color-x":[{"border-x":[a]}],"border-color-y":[{"border-y":[a]}],"border-color-s":[{"border-s":[a]}],"border-color-e":[{"border-e":[a]}],"border-color-t":[{"border-t":[a]}],"border-color-r":[{"border-r":[a]}],"border-color-b":[{"border-b":[a]}],"border-color-l":[{"border-l":[a]}],"divide-color":[{divide:[a]}],"outline-style":[{outline:["",...re()]}],"outline-offset":[{"outline-offset":[Ui,ft]}],"outline-w":[{outline:[Ui,fr]}],"outline-color":[{outline:[r]}],"ring-w":[{ring:pe()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[r]}],"ring-opacity":[{"ring-opacity":[g]}],"ring-offset-w":[{"ring-offset":[Ui,fr]}],"ring-offset-color":[{"ring-offset":[r]}],shadow:[{shadow:["","inner","none",dr,gx]}],"shadow-color":[{shadow:[Uo]}],opacity:[{opacity:[g]}],"mix-blend":[{"mix-blend":[...le(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":le()}],filter:[{filter:["","none"]}],blur:[{blur:[n]}],brightness:[{brightness:[s]}],contrast:[{contrast:[h]}],"drop-shadow":[{"drop-shadow":["","none",dr,ft]}],grayscale:[{grayscale:[m]}],"hue-rotate":[{"hue-rotate":[_]}],invert:[{invert:[y]}],saturate:[{saturate:[C]}],sepia:[{sepia:[j]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[n]}],"backdrop-brightness":[{"backdrop-brightness":[s]}],"backdrop-contrast":[{"backdrop-contrast":[h]}],"backdrop-grayscale":[{"backdrop-grayscale":[m]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[_]}],"backdrop-invert":[{"backdrop-invert":[y]}],"backdrop-opacity":[{"backdrop-opacity":[g]}],"backdrop-saturate":[{"backdrop-saturate":[C]}],"backdrop-sepia":[{"backdrop-sepia":[j]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[f]}],"border-spacing-x":[{"border-spacing-x":[f]}],"border-spacing-y":[{"border-spacing-y":[f]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",ft]}],duration:[{duration:D()}],ease:[{ease:["linear","in","out","in-out",ft]}],delay:[{delay:D()}],animate:[{animate:["none","spin","ping","pulse","bounce",ft]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[N]}],"scale-x":[{"scale-x":[N]}],"scale-y":[{"scale-y":[N]}],rotate:[{rotate:[Do,ft]}],"translate-x":[{"translate-x":[fe]}],"translate-y":[{"translate-y":[fe]}],"skew-x":[{"skew-x":[I]}],"skew-y":[{"skew-y":[I]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",ft]}],accent:[{accent:["auto",r]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",ft]}],"caret-color":[{caret:[r]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":$()}],"scroll-mx":[{"scroll-mx":$()}],"scroll-my":[{"scroll-my":$()}],"scroll-ms":[{"scroll-ms":$()}],"scroll-me":[{"scroll-me":$()}],"scroll-mt":[{"scroll-mt":$()}],"scroll-mr":[{"scroll-mr":$()}],"scroll-mb":[{"scroll-mb":$()}],"scroll-ml":[{"scroll-ml":$()}],"scroll-p":[{"scroll-p":$()}],"scroll-px":[{"scroll-px":$()}],"scroll-py":[{"scroll-py":$()}],"scroll-ps":[{"scroll-ps":$()}],"scroll-pe":[{"scroll-pe":$()}],"scroll-pt":[{"scroll-pt":$()}],"scroll-pr":[{"scroll-pr":$()}],"scroll-pb":[{"scroll-pb":$()}],"scroll-pl":[{"scroll-pl":$()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",ft]}],fill:[{fill:[r,"none"]}],"stroke-w":[{stroke:[Ui,fr,Nu]}],stroke:[{stroke:[r,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},Sx=nx(yx);function jt(...r){return Sx(Jm(r))}const ks=ze.forwardRef(({className:r,...e},n)=>O.jsx("div",{ref:n,className:jt("rounded-lg border border-catppuccin-surface1 bg-catppuccin-surface0 text-catppuccin-text shadow-sm",r),...e}));ks.displayName="Card";const Mx=ze.forwardRef(({className:r,...e},n)=>O.jsx("div",{ref:n,className:jt("flex flex-col space-y-1.5 p-4",r),...e}));Mx.displayName="CardHeader";const Ex=ze.forwardRef(({className:r,...e},n)=>O.jsx("h3",{ref:n,className:jt("font-semibold leading-none tracking-tight",r),...e}));Ex.displayName="CardTitle";const wx=ze.forwardRef(({className:r,...e},n)=>O.jsx("p",{ref:n,className:jt("text-sm text-catppuccin-subtext0",r),...e}));wx.displayName="CardDescription";const Tx=ze.forwardRef(({className:r,...e},n)=>O.jsx("div",{ref:n,className:jt("p-4 pt-0",r),...e}));Tx.displayName="CardContent";const Ax=ze.forwardRef(({className:r,...e},n)=>O.jsx("div",{ref:n,className:jt("flex items-center p-4 pt-0",r),...e}));Ax.displayName="CardFooter";const yp=r=>typeof r=="boolean"?`${r}`:r===0?"0":r,Sp=Jm,bx=(r,e)=>n=>{var s;if((e==null?void 0:e.variants)==null)return Sp(r,n==null?void 0:n.class,n==null?void 0:n.className);const{variants:a,defaultVariants:l}=e,f=Object.keys(a).map(m=>{const _=n==null?void 0:n[m],y=l==null?void 0:l[m];if(_===null)return null;const v=yp(_)||yp(y);return a[m][v]}),u=n&&Object.entries(n).reduce((m,_)=>{let[y,v]=_;return v===void 0||(m[y]=v),m},{}),h=e==null||(s=e.compoundVariants)===null||s===void 0?void 0:s.reduce((m,_)=>{let{class:y,className:v,...S}=_;return Object.entries(S).every(w=>{let[E,x]=w;return Array.isArray(x)?x.includes({...l,...u}[E]):{...l,...u}[E]===x})?[...m,y,v]:m},[]);return Sp(r,f,h,n==null?void 0:n.class,n==null?void 0:n.className)},Cx=bx("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-catppuccin-mauve text-catppuccin-crust",secondary:"border-transparent bg-catppuccin-surface1 text-catppuccin-text",destructive:"border-transparent bg-catppuccin-red text-catppuccin-crust",outline:"text-catppuccin-text",passed:"border-transparent bg-catppuccin-green text-catppuccin-base",running:"border-transparent bg-catppuccin-blue text-catppuccin-base",failed:"border-transparent bg-catppuccin-red text-catppuccin-base",pending:"border-transparent bg-catppuccin-surface2 text-catppuccin-text",skipped:"border border-catppuccin-overlay0 bg-transparent text-catppuccin-subtext0"}},defaultVariants:{variant:"default"}});function Io({className:r,variant:e,...n}){return O.jsx("div",{className:jt(Cx({variant:e}),r),...n})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bf="160",Rx=0,Mp=1,Px=2,sg=1,Lx=2,Bi=3,Er=0,Un=1,Hi=2,yr=0,Gs=1,Ep=2,wp=3,Tp=4,Nx=5,jr=100,Dx=101,Ux=102,Ap=103,bp=104,Ix=200,Fx=201,Ox=202,kx=203,pf=204,mf=205,zx=206,Bx=207,Hx=208,Gx=209,Vx=210,Wx=211,jx=212,Xx=213,qx=214,Yx=0,$x=1,Kx=2,Ul=3,Zx=4,Qx=5,Jx=6,e0=7,og=0,t0=1,n0=2,Sr=0,i0=1,r0=2,s0=3,o0=4,a0=5,l0=6,ag=300,Ws=301,js=302,gf=303,vf=304,Gl=306,_f=1e3,di=1001,xf=1002,Mn=1003,Cp=1004,Du=1005,Kn=1006,c0=1007,Vo=1008,Mr=1009,u0=1010,f0=1011,Cf=1012,lg=1013,_r=1014,xr=1015,Wo=1016,cg=1017,ug=1018,qr=1020,d0=1021,hi=1023,h0=1024,p0=1025,Yr=1026,Xs=1027,m0=1028,fg=1029,g0=1030,dg=1031,hg=1033,Uu=33776,Iu=33777,Fu=33778,Ou=33779,Rp=35840,Pp=35841,Lp=35842,Np=35843,pg=36196,Dp=37492,Up=37496,Ip=37808,Fp=37809,Op=37810,kp=37811,zp=37812,Bp=37813,Hp=37814,Gp=37815,Vp=37816,Wp=37817,jp=37818,Xp=37819,qp=37820,Yp=37821,ku=36492,$p=36494,Kp=36495,v0=36283,Zp=36284,Qp=36285,Jp=36286,mg=3e3,$r=3001,_0=3200,x0=3201,y0=0,S0=1,Jn="",ln="srgb",Vi="srgb-linear",Rf="display-p3",Vl="display-p3-linear",Il="linear",It="srgb",Fl="rec709",Ol="p3",Ss=7680,em=519,M0=512,E0=513,w0=514,gg=515,T0=516,A0=517,b0=518,C0=519,tm=35044,nm="300 es",yf=1035,Gi=2e3,kl=2001;class $s{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(n)===-1&&s[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const s=this._listeners;return s[e]!==void 0&&s[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const l=a.indexOf(n);l!==-1&&a.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const s=this._listeners[e.type];if(s!==void 0){e.target=this;const a=s.slice(0);for(let l=0,f=a.length;l<f;l++)a[l].call(this,e);e.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zu=Math.PI/180,Sf=180/Math.PI;function jo(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(mn[r&255]+mn[r>>8&255]+mn[r>>16&255]+mn[r>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[n&63|128]+mn[n>>8&255]+"-"+mn[n>>16&255]+mn[n>>24&255]+mn[s&255]+mn[s>>8&255]+mn[s>>16&255]+mn[s>>24&255]).toLowerCase()}function Dn(r,e,n){return Math.max(e,Math.min(n,r))}function R0(r,e){return(r%e+e)%e}function Bu(r,e,n){return(1-n)*r+n*e}function im(r){return(r&r-1)===0&&r!==0}function Mf(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Fo(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Nn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class bt{constructor(e=0,n=0){bt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,s=this.y,a=e.elements;return this.x=a[0]*n+a[3]*s+a[6],this.y=a[1]*n+a[4]*s+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(e)/n;return Math.acos(Dn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,s=this.y-e.y;return n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,s){return this.x=e.x+(n.x-e.x)*s,this.y=e.y+(n.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const s=Math.cos(n),a=Math.sin(n),l=this.x-e.x,f=this.y-e.y;return this.x=l*s-f*a+e.x,this.y=l*a+f*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class mt{constructor(e,n,s,a,l,f,u,h,m){mt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,s,a,l,f,u,h,m)}set(e,n,s,a,l,f,u,h,m){const _=this.elements;return _[0]=e,_[1]=a,_[2]=u,_[3]=n,_[4]=l,_[5]=h,_[6]=s,_[7]=f,_[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,s=e.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],this}extractBasis(e,n,s){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const s=e.elements,a=n.elements,l=this.elements,f=s[0],u=s[3],h=s[6],m=s[1],_=s[4],y=s[7],v=s[2],S=s[5],w=s[8],E=a[0],x=a[3],g=a[6],L=a[1],C=a[4],N=a[7],j=a[2],I=a[5],F=a[8];return l[0]=f*E+u*L+h*j,l[3]=f*x+u*C+h*I,l[6]=f*g+u*N+h*F,l[1]=m*E+_*L+y*j,l[4]=m*x+_*C+y*I,l[7]=m*g+_*N+y*F,l[2]=v*E+S*L+w*j,l[5]=v*x+S*C+w*I,l[8]=v*g+S*N+w*F,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],s=e[1],a=e[2],l=e[3],f=e[4],u=e[5],h=e[6],m=e[7],_=e[8];return n*f*_-n*u*m-s*l*_+s*u*h+a*l*m-a*f*h}invert(){const e=this.elements,n=e[0],s=e[1],a=e[2],l=e[3],f=e[4],u=e[5],h=e[6],m=e[7],_=e[8],y=_*f-u*m,v=u*h-_*l,S=m*l-f*h,w=n*y+s*v+a*S;if(w===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/w;return e[0]=y*E,e[1]=(a*m-_*s)*E,e[2]=(u*s-a*f)*E,e[3]=v*E,e[4]=(_*n-a*h)*E,e[5]=(a*l-u*n)*E,e[6]=S*E,e[7]=(s*h-m*n)*E,e[8]=(f*n-s*l)*E,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,s,a,l,f,u){const h=Math.cos(l),m=Math.sin(l);return this.set(s*h,s*m,-s*(h*f+m*u)+f+e,-a*m,a*h,-a*(-m*f+h*u)+u+n,0,0,1),this}scale(e,n){return this.premultiply(Hu.makeScale(e,n)),this}rotate(e){return this.premultiply(Hu.makeRotation(-e)),this}translate(e,n){return this.premultiply(Hu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),s=Math.sin(e);return this.set(n,-s,0,s,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,s=e.elements;for(let a=0;a<9;a++)if(n[a]!==s[a])return!1;return!0}fromArray(e,n=0){for(let s=0;s<9;s++)this.elements[s]=e[s+n];return this}toArray(e=[],n=0){const s=this.elements;return e[n]=s[0],e[n+1]=s[1],e[n+2]=s[2],e[n+3]=s[3],e[n+4]=s[4],e[n+5]=s[5],e[n+6]=s[6],e[n+7]=s[7],e[n+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Hu=new mt;function vg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function zl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function P0(){const r=zl("canvas");return r.style.display="block",r}const rm={};function Go(r){r in rm||(rm[r]=!0,console.warn(r))}const sm=new mt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),om=new mt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),il={[Vi]:{transfer:Il,primaries:Fl,toReference:r=>r,fromReference:r=>r},[ln]:{transfer:It,primaries:Fl,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Vl]:{transfer:Il,primaries:Ol,toReference:r=>r.applyMatrix3(om),fromReference:r=>r.applyMatrix3(sm)},[Rf]:{transfer:It,primaries:Ol,toReference:r=>r.convertSRGBToLinear().applyMatrix3(om),fromReference:r=>r.applyMatrix3(sm).convertLinearToSRGB()}},L0=new Set([Vi,Vl]),At={enabled:!0,_workingColorSpace:Vi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!L0.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,n){if(this.enabled===!1||e===n||!e||!n)return r;const s=il[e].toReference,a=il[n].fromReference;return a(s(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return il[r].primaries},getTransfer:function(r){return r===Jn?Il:il[r].transfer}};function Vs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Gu(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ms;class _g{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ms===void 0&&(Ms=zl("canvas")),Ms.width=e.width,Ms.height=e.height;const s=Ms.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Ms}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=zl("canvas");n.width=e.width,n.height=e.height;const s=n.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const a=s.getImageData(0,0,e.width,e.height),l=a.data;for(let f=0;f<l.length;f++)l[f]=Vs(l[f]/255)*255;return s.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let s=0;s<n.length;s++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[s]=Math.floor(Vs(n[s]/255)*255):n[s]=Vs(n[s]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let N0=0;class xg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:N0++}),this.uuid=jo(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let f=0,u=a.length;f<u;f++)a[f].isDataTexture?l.push(Vu(a[f].image)):l.push(Vu(a[f]))}else l=Vu(a);s.url=l}return n||(e.images[this.uuid]=s),s}}function Vu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?_g.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let D0=0;class Hn extends $s{constructor(e=Hn.DEFAULT_IMAGE,n=Hn.DEFAULT_MAPPING,s=di,a=di,l=Kn,f=Vo,u=hi,h=Mr,m=Hn.DEFAULT_ANISOTROPY,_=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:D0++}),this.uuid=jo(),this.name="",this.source=new xg(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=s,this.wrapT=a,this.magFilter=l,this.minFilter=f,this.anisotropy=m,this.format=u,this.internalFormat=null,this.type=h,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof _=="string"?this.colorSpace=_:(Go("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=_===$r?ln:Jn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),n||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ag)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case _f:e.x=e.x-Math.floor(e.x);break;case di:e.x=e.x<0?0:1;break;case xf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case _f:e.y=e.y-Math.floor(e.y);break;case di:e.y=e.y<0?0:1;break;case xf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Go("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ln?$r:mg}set encoding(e){Go("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===$r?ln:Jn}}Hn.DEFAULT_IMAGE=null;Hn.DEFAULT_MAPPING=ag;Hn.DEFAULT_ANISOTROPY=1;class cn{constructor(e=0,n=0,s=0,a=1){cn.prototype.isVector4=!0,this.x=e,this.y=n,this.z=s,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,s,a){return this.x=e,this.y=n,this.z=s,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,s=this.y,a=this.z,l=this.w,f=e.elements;return this.x=f[0]*n+f[4]*s+f[8]*a+f[12]*l,this.y=f[1]*n+f[5]*s+f[9]*a+f[13]*l,this.z=f[2]*n+f[6]*s+f[10]*a+f[14]*l,this.w=f[3]*n+f[7]*s+f[11]*a+f[15]*l,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,s,a,l;const h=e.elements,m=h[0],_=h[4],y=h[8],v=h[1],S=h[5],w=h[9],E=h[2],x=h[6],g=h[10];if(Math.abs(_-v)<.01&&Math.abs(y-E)<.01&&Math.abs(w-x)<.01){if(Math.abs(_+v)<.1&&Math.abs(y+E)<.1&&Math.abs(w+x)<.1&&Math.abs(m+S+g-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const C=(m+1)/2,N=(S+1)/2,j=(g+1)/2,I=(_+v)/4,F=(y+E)/4,fe=(w+x)/4;return C>N&&C>j?C<.01?(s=0,a=.707106781,l=.707106781):(s=Math.sqrt(C),a=I/s,l=F/s):N>j?N<.01?(s=.707106781,a=0,l=.707106781):(a=Math.sqrt(N),s=I/a,l=fe/a):j<.01?(s=.707106781,a=.707106781,l=0):(l=Math.sqrt(j),s=F/l,a=fe/l),this.set(s,a,l,n),this}let L=Math.sqrt((x-w)*(x-w)+(y-E)*(y-E)+(v-_)*(v-_));return Math.abs(L)<.001&&(L=1),this.x=(x-w)/L,this.y=(y-E)/L,this.z=(v-_)/L,this.w=Math.acos((m+S+g-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,s){return this.x=e.x+(n.x-e.x)*s,this.y=e.y+(n.y-e.y)*s,this.z=e.z+(n.z-e.z)*s,this.w=e.w+(n.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class U0 extends $s{constructor(e=1,n=1,s={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new cn(0,0,e,n),this.scissorTest=!1,this.viewport=new cn(0,0,e,n);const a={width:e,height:n,depth:1};s.encoding!==void 0&&(Go("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),s.colorSpace=s.encoding===$r?ln:Jn),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},s),this.texture=new Hn(a,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=s.generateMipmaps,this.texture.internalFormat=s.internalFormat,this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}setSize(e,n,s=1){(this.width!==e||this.height!==n||this.depth!==s)&&(this.width=e,this.height=n,this.depth=s,this.texture.image.width=e,this.texture.image.height=n,this.texture.image.depth=s,this.dispose()),this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new xg(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Kr extends U0{constructor(e=1,n=1,s={}){super(e,n,s),this.isWebGLRenderTarget=!0}}class yg extends Hn{constructor(e=null,n=1,s=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:s,depth:a},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class I0 extends Hn{constructor(e=null,n=1,s=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:s,depth:a},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xo{constructor(e=0,n=0,s=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=s,this._w=a}static slerpFlat(e,n,s,a,l,f,u){let h=s[a+0],m=s[a+1],_=s[a+2],y=s[a+3];const v=l[f+0],S=l[f+1],w=l[f+2],E=l[f+3];if(u===0){e[n+0]=h,e[n+1]=m,e[n+2]=_,e[n+3]=y;return}if(u===1){e[n+0]=v,e[n+1]=S,e[n+2]=w,e[n+3]=E;return}if(y!==E||h!==v||m!==S||_!==w){let x=1-u;const g=h*v+m*S+_*w+y*E,L=g>=0?1:-1,C=1-g*g;if(C>Number.EPSILON){const j=Math.sqrt(C),I=Math.atan2(j,g*L);x=Math.sin(x*I)/j,u=Math.sin(u*I)/j}const N=u*L;if(h=h*x+v*N,m=m*x+S*N,_=_*x+w*N,y=y*x+E*N,x===1-u){const j=1/Math.sqrt(h*h+m*m+_*_+y*y);h*=j,m*=j,_*=j,y*=j}}e[n]=h,e[n+1]=m,e[n+2]=_,e[n+3]=y}static multiplyQuaternionsFlat(e,n,s,a,l,f){const u=s[a],h=s[a+1],m=s[a+2],_=s[a+3],y=l[f],v=l[f+1],S=l[f+2],w=l[f+3];return e[n]=u*w+_*y+h*S-m*v,e[n+1]=h*w+_*v+m*y-u*S,e[n+2]=m*w+_*S+u*v-h*y,e[n+3]=_*w-u*y-h*v-m*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,s,a){return this._x=e,this._y=n,this._z=s,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const s=e._x,a=e._y,l=e._z,f=e._order,u=Math.cos,h=Math.sin,m=u(s/2),_=u(a/2),y=u(l/2),v=h(s/2),S=h(a/2),w=h(l/2);switch(f){case"XYZ":this._x=v*_*y+m*S*w,this._y=m*S*y-v*_*w,this._z=m*_*w+v*S*y,this._w=m*_*y-v*S*w;break;case"YXZ":this._x=v*_*y+m*S*w,this._y=m*S*y-v*_*w,this._z=m*_*w-v*S*y,this._w=m*_*y+v*S*w;break;case"ZXY":this._x=v*_*y-m*S*w,this._y=m*S*y+v*_*w,this._z=m*_*w+v*S*y,this._w=m*_*y-v*S*w;break;case"ZYX":this._x=v*_*y-m*S*w,this._y=m*S*y+v*_*w,this._z=m*_*w-v*S*y,this._w=m*_*y+v*S*w;break;case"YZX":this._x=v*_*y+m*S*w,this._y=m*S*y+v*_*w,this._z=m*_*w-v*S*y,this._w=m*_*y-v*S*w;break;case"XZY":this._x=v*_*y-m*S*w,this._y=m*S*y-v*_*w,this._z=m*_*w+v*S*y,this._w=m*_*y+v*S*w;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const s=n/2,a=Math.sin(s);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,s=n[0],a=n[4],l=n[8],f=n[1],u=n[5],h=n[9],m=n[2],_=n[6],y=n[10],v=s+u+y;if(v>0){const S=.5/Math.sqrt(v+1);this._w=.25/S,this._x=(_-h)*S,this._y=(l-m)*S,this._z=(f-a)*S}else if(s>u&&s>y){const S=2*Math.sqrt(1+s-u-y);this._w=(_-h)/S,this._x=.25*S,this._y=(a+f)/S,this._z=(l+m)/S}else if(u>y){const S=2*Math.sqrt(1+u-s-y);this._w=(l-m)/S,this._x=(a+f)/S,this._y=.25*S,this._z=(h+_)/S}else{const S=2*Math.sqrt(1+y-s-u);this._w=(f-a)/S,this._x=(l+m)/S,this._y=(h+_)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let s=e.dot(n)+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Dn(this.dot(e),-1,1)))}rotateTowards(e,n){const s=this.angleTo(e);if(s===0)return this;const a=Math.min(1,n/s);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const s=e._x,a=e._y,l=e._z,f=e._w,u=n._x,h=n._y,m=n._z,_=n._w;return this._x=s*_+f*u+a*m-l*h,this._y=a*_+f*h+l*u-s*m,this._z=l*_+f*m+s*h-a*u,this._w=f*_-s*u-a*h-l*m,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const s=this._x,a=this._y,l=this._z,f=this._w;let u=f*e._w+s*e._x+a*e._y+l*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=f,this._x=s,this._y=a,this._z=l,this;const h=1-u*u;if(h<=Number.EPSILON){const S=1-n;return this._w=S*f+n*this._w,this._x=S*s+n*this._x,this._y=S*a+n*this._y,this._z=S*l+n*this._z,this.normalize(),this}const m=Math.sqrt(h),_=Math.atan2(m,u),y=Math.sin((1-n)*_)/m,v=Math.sin(n*_)/m;return this._w=f*y+this._w*v,this._x=s*y+this._x*v,this._y=a*y+this._y*v,this._z=l*y+this._z*v,this._onChangeCallback(),this}slerpQuaternions(e,n,s){return this.copy(e).slerp(n,s)}random(){const e=Math.random(),n=Math.sqrt(1-e),s=Math.sqrt(e),a=2*Math.PI*Math.random(),l=2*Math.PI*Math.random();return this.set(n*Math.cos(a),s*Math.sin(l),s*Math.cos(l),n*Math.sin(a))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class se{constructor(e=0,n=0,s=0){se.prototype.isVector3=!0,this.x=e,this.y=n,this.z=s}set(e,n,s){return s===void 0&&(s=this.z),this.x=e,this.y=n,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(am.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(am.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,s=this.y,a=this.z,l=e.elements;return this.x=l[0]*n+l[3]*s+l[6]*a,this.y=l[1]*n+l[4]*s+l[7]*a,this.z=l[2]*n+l[5]*s+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,s=this.y,a=this.z,l=e.elements,f=1/(l[3]*n+l[7]*s+l[11]*a+l[15]);return this.x=(l[0]*n+l[4]*s+l[8]*a+l[12])*f,this.y=(l[1]*n+l[5]*s+l[9]*a+l[13])*f,this.z=(l[2]*n+l[6]*s+l[10]*a+l[14])*f,this}applyQuaternion(e){const n=this.x,s=this.y,a=this.z,l=e.x,f=e.y,u=e.z,h=e.w,m=2*(f*a-u*s),_=2*(u*n-l*a),y=2*(l*s-f*n);return this.x=n+h*m+f*y-u*_,this.y=s+h*_+u*m-l*y,this.z=a+h*y+l*_-f*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,s=this.y,a=this.z,l=e.elements;return this.x=l[0]*n+l[4]*s+l[8]*a,this.y=l[1]*n+l[5]*s+l[9]*a,this.z=l[2]*n+l[6]*s+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(n,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,s){return this.x=e.x+(n.x-e.x)*s,this.y=e.y+(n.y-e.y)*s,this.z=e.z+(n.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const s=e.x,a=e.y,l=e.z,f=n.x,u=n.y,h=n.z;return this.x=a*h-l*u,this.y=l*f-s*h,this.z=s*u-a*f,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const s=e.dot(this)/n;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Wu.copy(this).projectOnVector(e),this.sub(Wu)}reflect(e){return this.sub(Wu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const s=this.dot(e)/n;return Math.acos(Dn(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,s=this.y-e.y,a=this.z-e.z;return n*n+s*s+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,s){const a=Math.sin(n)*e;return this.x=a*Math.sin(s),this.y=Math.cos(n)*e,this.z=a*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,s){return this.x=e*Math.sin(n),this.y=s,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=s,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,n=Math.random()*Math.PI*2,s=Math.sqrt(1-e**2);return this.x=s*Math.cos(n),this.y=s*Math.sin(n),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wu=new se,am=new Xo;class qo{constructor(e=new se(1/0,1/0,1/0),n=new se(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,s=e.length;n<s;n+=3)this.expandByPoint(li.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,s=e.count;n<s;n++)this.expandByPoint(li.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,s=e.length;n<s;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const s=li.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const l=s.getAttribute("position");if(n===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let f=0,u=l.count;f<u;f++)e.isMesh===!0?e.getVertexPosition(f,li):li.fromBufferAttribute(l,f),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),rl.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),rl.copy(s.boundingBox)),rl.applyMatrix4(e.matrixWorld),this.union(rl)}const a=e.children;for(let l=0,f=a.length;l<f;l++)this.expandByObject(a[l],n);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,s;return e.normal.x>0?(n=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),n<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Oo),sl.subVectors(this.max,Oo),Es.subVectors(e.a,Oo),ws.subVectors(e.b,Oo),Ts.subVectors(e.c,Oo),hr.subVectors(ws,Es),pr.subVectors(Ts,ws),zr.subVectors(Es,Ts);let n=[0,-hr.z,hr.y,0,-pr.z,pr.y,0,-zr.z,zr.y,hr.z,0,-hr.x,pr.z,0,-pr.x,zr.z,0,-zr.x,-hr.y,hr.x,0,-pr.y,pr.x,0,-zr.y,zr.x,0];return!ju(n,Es,ws,Ts,sl)||(n=[1,0,0,0,1,0,0,0,1],!ju(n,Es,ws,Ts,sl))?!1:(ol.crossVectors(hr,pr),n=[ol.x,ol.y,ol.z],ju(n,Es,ws,Ts,sl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ii=[new se,new se,new se,new se,new se,new se,new se,new se],li=new se,rl=new qo,Es=new se,ws=new se,Ts=new se,hr=new se,pr=new se,zr=new se,Oo=new se,sl=new se,ol=new se,Br=new se;function ju(r,e,n,s,a){for(let l=0,f=r.length-3;l<=f;l+=3){Br.fromArray(r,l);const u=a.x*Math.abs(Br.x)+a.y*Math.abs(Br.y)+a.z*Math.abs(Br.z),h=e.dot(Br),m=n.dot(Br),_=s.dot(Br);if(Math.max(-Math.max(h,m,_),Math.min(h,m,_))>u)return!1}return!0}const F0=new qo,ko=new se,Xu=new se;class Yo{constructor(e=new se,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const s=this.center;n!==void 0?s.copy(n):F0.setFromPoints(e).getCenter(s);let a=0;for(let l=0,f=e.length;l<f;l++)a=Math.max(a,s.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const s=this.center.distanceToSquared(e);return n.copy(e),s>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ko.subVectors(e,this.center);const n=ko.lengthSq();if(n>this.radius*this.radius){const s=Math.sqrt(n),a=(s-this.radius)*.5;this.center.addScaledVector(ko,a/s),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ko.copy(e.center).add(Xu)),this.expandByPoint(ko.copy(e.center).sub(Xu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Fi=new se,qu=new se,al=new se,mr=new se,Yu=new se,ll=new se,$u=new se;class Pf{constructor(e=new se,n=new se(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const s=n.dot(this.direction);return s<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Fi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,n),Fi.distanceToSquared(e))}distanceSqToSegment(e,n,s,a){qu.copy(e).add(n).multiplyScalar(.5),al.copy(n).sub(e).normalize(),mr.copy(this.origin).sub(qu);const l=e.distanceTo(n)*.5,f=-this.direction.dot(al),u=mr.dot(this.direction),h=-mr.dot(al),m=mr.lengthSq(),_=Math.abs(1-f*f);let y,v,S,w;if(_>0)if(y=f*h-u,v=f*u-h,w=l*_,y>=0)if(v>=-w)if(v<=w){const E=1/_;y*=E,v*=E,S=y*(y+f*v+2*u)+v*(f*y+v+2*h)+m}else v=l,y=Math.max(0,-(f*v+u)),S=-y*y+v*(v+2*h)+m;else v=-l,y=Math.max(0,-(f*v+u)),S=-y*y+v*(v+2*h)+m;else v<=-w?(y=Math.max(0,-(-f*l+u)),v=y>0?-l:Math.min(Math.max(-l,-h),l),S=-y*y+v*(v+2*h)+m):v<=w?(y=0,v=Math.min(Math.max(-l,-h),l),S=v*(v+2*h)+m):(y=Math.max(0,-(f*l+u)),v=y>0?l:Math.min(Math.max(-l,-h),l),S=-y*y+v*(v+2*h)+m);else v=f>0?-l:l,y=Math.max(0,-(f*v+u)),S=-y*y+v*(v+2*h)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,y),a&&a.copy(qu).addScaledVector(al,v),S}intersectSphere(e,n){Fi.subVectors(e.center,this.origin);const s=Fi.dot(this.direction),a=Fi.dot(Fi)-s*s,l=e.radius*e.radius;if(a>l)return null;const f=Math.sqrt(l-a),u=s-f,h=s+f;return h<0?null:u<0?this.at(h,n):this.at(u,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/n;return s>=0?s:null}intersectPlane(e,n){const s=this.distanceToPlane(e);return s===null?null:this.at(s,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let s,a,l,f,u,h;const m=1/this.direction.x,_=1/this.direction.y,y=1/this.direction.z,v=this.origin;return m>=0?(s=(e.min.x-v.x)*m,a=(e.max.x-v.x)*m):(s=(e.max.x-v.x)*m,a=(e.min.x-v.x)*m),_>=0?(l=(e.min.y-v.y)*_,f=(e.max.y-v.y)*_):(l=(e.max.y-v.y)*_,f=(e.min.y-v.y)*_),s>f||l>a||((l>s||isNaN(s))&&(s=l),(f<a||isNaN(a))&&(a=f),y>=0?(u=(e.min.z-v.z)*y,h=(e.max.z-v.z)*y):(u=(e.max.z-v.z)*y,h=(e.min.z-v.z)*y),s>h||u>a)||((u>s||s!==s)&&(s=u),(h<a||a!==a)&&(a=h),a<0)?null:this.at(s>=0?s:a,n)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,n,s,a,l){Yu.subVectors(n,e),ll.subVectors(s,e),$u.crossVectors(Yu,ll);let f=this.direction.dot($u),u;if(f>0){if(a)return null;u=1}else if(f<0)u=-1,f=-f;else return null;mr.subVectors(this.origin,e);const h=u*this.direction.dot(ll.crossVectors(mr,ll));if(h<0)return null;const m=u*this.direction.dot(Yu.cross(mr));if(m<0||h+m>f)return null;const _=-u*mr.dot($u);return _<0?null:this.at(_/f,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Zt{constructor(e,n,s,a,l,f,u,h,m,_,y,v,S,w,E,x){Zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,s,a,l,f,u,h,m,_,y,v,S,w,E,x)}set(e,n,s,a,l,f,u,h,m,_,y,v,S,w,E,x){const g=this.elements;return g[0]=e,g[4]=n,g[8]=s,g[12]=a,g[1]=l,g[5]=f,g[9]=u,g[13]=h,g[2]=m,g[6]=_,g[10]=y,g[14]=v,g[3]=S,g[7]=w,g[11]=E,g[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Zt().fromArray(this.elements)}copy(e){const n=this.elements,s=e.elements;return n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],n[4]=s[4],n[5]=s[5],n[6]=s[6],n[7]=s[7],n[8]=s[8],n[9]=s[9],n[10]=s[10],n[11]=s[11],n[12]=s[12],n[13]=s[13],n[14]=s[14],n[15]=s[15],this}copyPosition(e){const n=this.elements,s=e.elements;return n[12]=s[12],n[13]=s[13],n[14]=s[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,s){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,n,s){return this.set(e.x,n.x,s.x,0,e.y,n.y,s.y,0,e.z,n.z,s.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,s=e.elements,a=1/As.setFromMatrixColumn(e,0).length(),l=1/As.setFromMatrixColumn(e,1).length(),f=1/As.setFromMatrixColumn(e,2).length();return n[0]=s[0]*a,n[1]=s[1]*a,n[2]=s[2]*a,n[3]=0,n[4]=s[4]*l,n[5]=s[5]*l,n[6]=s[6]*l,n[7]=0,n[8]=s[8]*f,n[9]=s[9]*f,n[10]=s[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,s=e.x,a=e.y,l=e.z,f=Math.cos(s),u=Math.sin(s),h=Math.cos(a),m=Math.sin(a),_=Math.cos(l),y=Math.sin(l);if(e.order==="XYZ"){const v=f*_,S=f*y,w=u*_,E=u*y;n[0]=h*_,n[4]=-h*y,n[8]=m,n[1]=S+w*m,n[5]=v-E*m,n[9]=-u*h,n[2]=E-v*m,n[6]=w+S*m,n[10]=f*h}else if(e.order==="YXZ"){const v=h*_,S=h*y,w=m*_,E=m*y;n[0]=v+E*u,n[4]=w*u-S,n[8]=f*m,n[1]=f*y,n[5]=f*_,n[9]=-u,n[2]=S*u-w,n[6]=E+v*u,n[10]=f*h}else if(e.order==="ZXY"){const v=h*_,S=h*y,w=m*_,E=m*y;n[0]=v-E*u,n[4]=-f*y,n[8]=w+S*u,n[1]=S+w*u,n[5]=f*_,n[9]=E-v*u,n[2]=-f*m,n[6]=u,n[10]=f*h}else if(e.order==="ZYX"){const v=f*_,S=f*y,w=u*_,E=u*y;n[0]=h*_,n[4]=w*m-S,n[8]=v*m+E,n[1]=h*y,n[5]=E*m+v,n[9]=S*m-w,n[2]=-m,n[6]=u*h,n[10]=f*h}else if(e.order==="YZX"){const v=f*h,S=f*m,w=u*h,E=u*m;n[0]=h*_,n[4]=E-v*y,n[8]=w*y+S,n[1]=y,n[5]=f*_,n[9]=-u*_,n[2]=-m*_,n[6]=S*y+w,n[10]=v-E*y}else if(e.order==="XZY"){const v=f*h,S=f*m,w=u*h,E=u*m;n[0]=h*_,n[4]=-y,n[8]=m*_,n[1]=v*y+E,n[5]=f*_,n[9]=S*y-w,n[2]=w*y-S,n[6]=u*_,n[10]=E*y+v}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(O0,e,k0)}lookAt(e,n,s){const a=this.elements;return zn.subVectors(e,n),zn.lengthSq()===0&&(zn.z=1),zn.normalize(),gr.crossVectors(s,zn),gr.lengthSq()===0&&(Math.abs(s.z)===1?zn.x+=1e-4:zn.z+=1e-4,zn.normalize(),gr.crossVectors(s,zn)),gr.normalize(),cl.crossVectors(zn,gr),a[0]=gr.x,a[4]=cl.x,a[8]=zn.x,a[1]=gr.y,a[5]=cl.y,a[9]=zn.y,a[2]=gr.z,a[6]=cl.z,a[10]=zn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const s=e.elements,a=n.elements,l=this.elements,f=s[0],u=s[4],h=s[8],m=s[12],_=s[1],y=s[5],v=s[9],S=s[13],w=s[2],E=s[6],x=s[10],g=s[14],L=s[3],C=s[7],N=s[11],j=s[15],I=a[0],F=a[4],fe=a[8],T=a[12],A=a[1],K=a[5],$=a[9],pe=a[13],k=a[2],te=a[6],re=a[10],le=a[14],V=a[3],z=a[7],Y=a[11],D=a[15];return l[0]=f*I+u*A+h*k+m*V,l[4]=f*F+u*K+h*te+m*z,l[8]=f*fe+u*$+h*re+m*Y,l[12]=f*T+u*pe+h*le+m*D,l[1]=_*I+y*A+v*k+S*V,l[5]=_*F+y*K+v*te+S*z,l[9]=_*fe+y*$+v*re+S*Y,l[13]=_*T+y*pe+v*le+S*D,l[2]=w*I+E*A+x*k+g*V,l[6]=w*F+E*K+x*te+g*z,l[10]=w*fe+E*$+x*re+g*Y,l[14]=w*T+E*pe+x*le+g*D,l[3]=L*I+C*A+N*k+j*V,l[7]=L*F+C*K+N*te+j*z,l[11]=L*fe+C*$+N*re+j*Y,l[15]=L*T+C*pe+N*le+j*D,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],s=e[4],a=e[8],l=e[12],f=e[1],u=e[5],h=e[9],m=e[13],_=e[2],y=e[6],v=e[10],S=e[14],w=e[3],E=e[7],x=e[11],g=e[15];return w*(+l*h*y-a*m*y-l*u*v+s*m*v+a*u*S-s*h*S)+E*(+n*h*S-n*m*v+l*f*v-a*f*S+a*m*_-l*h*_)+x*(+n*m*y-n*u*S-l*f*y+s*f*S+l*u*_-s*m*_)+g*(-a*u*_-n*h*y+n*u*v+a*f*y-s*f*v+s*h*_)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,s){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=s),this}invert(){const e=this.elements,n=e[0],s=e[1],a=e[2],l=e[3],f=e[4],u=e[5],h=e[6],m=e[7],_=e[8],y=e[9],v=e[10],S=e[11],w=e[12],E=e[13],x=e[14],g=e[15],L=y*x*m-E*v*m+E*h*S-u*x*S-y*h*g+u*v*g,C=w*v*m-_*x*m-w*h*S+f*x*S+_*h*g-f*v*g,N=_*E*m-w*y*m+w*u*S-f*E*S-_*u*g+f*y*g,j=w*y*h-_*E*h-w*u*v+f*E*v+_*u*x-f*y*x,I=n*L+s*C+a*N+l*j;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/I;return e[0]=L*F,e[1]=(E*v*l-y*x*l-E*a*S+s*x*S+y*a*g-s*v*g)*F,e[2]=(u*x*l-E*h*l+E*a*m-s*x*m-u*a*g+s*h*g)*F,e[3]=(y*h*l-u*v*l-y*a*m+s*v*m+u*a*S-s*h*S)*F,e[4]=C*F,e[5]=(_*x*l-w*v*l+w*a*S-n*x*S-_*a*g+n*v*g)*F,e[6]=(w*h*l-f*x*l-w*a*m+n*x*m+f*a*g-n*h*g)*F,e[7]=(f*v*l-_*h*l+_*a*m-n*v*m-f*a*S+n*h*S)*F,e[8]=N*F,e[9]=(w*y*l-_*E*l-w*s*S+n*E*S+_*s*g-n*y*g)*F,e[10]=(f*E*l-w*u*l+w*s*m-n*E*m-f*s*g+n*u*g)*F,e[11]=(_*u*l-f*y*l-_*s*m+n*y*m+f*s*S-n*u*S)*F,e[12]=j*F,e[13]=(_*E*a-w*y*a+w*s*v-n*E*v-_*s*x+n*y*x)*F,e[14]=(w*u*a-f*E*a-w*s*h+n*E*h+f*s*x-n*u*x)*F,e[15]=(f*y*a-_*u*a+_*s*h-n*y*h-f*s*v+n*u*v)*F,this}scale(e){const n=this.elements,s=e.x,a=e.y,l=e.z;return n[0]*=s,n[4]*=a,n[8]*=l,n[1]*=s,n[5]*=a,n[9]*=l,n[2]*=s,n[6]*=a,n[10]*=l,n[3]*=s,n[7]*=a,n[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,s,a))}makeTranslation(e,n,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,s,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,n,-s,0,0,s,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),s=Math.sin(e);return this.set(n,0,s,0,0,1,0,0,-s,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),s=Math.sin(e);return this.set(n,-s,0,0,s,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const s=Math.cos(n),a=Math.sin(n),l=1-s,f=e.x,u=e.y,h=e.z,m=l*f,_=l*u;return this.set(m*f+s,m*u-a*h,m*h+a*u,0,m*u+a*h,_*u+s,_*h-a*f,0,m*h-a*u,_*h+a*f,l*h*h+s,0,0,0,0,1),this}makeScale(e,n,s){return this.set(e,0,0,0,0,n,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,n,s,a,l,f){return this.set(1,s,l,0,e,1,f,0,n,a,1,0,0,0,0,1),this}compose(e,n,s){const a=this.elements,l=n._x,f=n._y,u=n._z,h=n._w,m=l+l,_=f+f,y=u+u,v=l*m,S=l*_,w=l*y,E=f*_,x=f*y,g=u*y,L=h*m,C=h*_,N=h*y,j=s.x,I=s.y,F=s.z;return a[0]=(1-(E+g))*j,a[1]=(S+N)*j,a[2]=(w-C)*j,a[3]=0,a[4]=(S-N)*I,a[5]=(1-(v+g))*I,a[6]=(x+L)*I,a[7]=0,a[8]=(w+C)*F,a[9]=(x-L)*F,a[10]=(1-(v+E))*F,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,s){const a=this.elements;let l=As.set(a[0],a[1],a[2]).length();const f=As.set(a[4],a[5],a[6]).length(),u=As.set(a[8],a[9],a[10]).length();this.determinant()<0&&(l=-l),e.x=a[12],e.y=a[13],e.z=a[14],ci.copy(this);const m=1/l,_=1/f,y=1/u;return ci.elements[0]*=m,ci.elements[1]*=m,ci.elements[2]*=m,ci.elements[4]*=_,ci.elements[5]*=_,ci.elements[6]*=_,ci.elements[8]*=y,ci.elements[9]*=y,ci.elements[10]*=y,n.setFromRotationMatrix(ci),s.x=l,s.y=f,s.z=u,this}makePerspective(e,n,s,a,l,f,u=Gi){const h=this.elements,m=2*l/(n-e),_=2*l/(s-a),y=(n+e)/(n-e),v=(s+a)/(s-a);let S,w;if(u===Gi)S=-(f+l)/(f-l),w=-2*f*l/(f-l);else if(u===kl)S=-f/(f-l),w=-f*l/(f-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);return h[0]=m,h[4]=0,h[8]=y,h[12]=0,h[1]=0,h[5]=_,h[9]=v,h[13]=0,h[2]=0,h[6]=0,h[10]=S,h[14]=w,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,n,s,a,l,f,u=Gi){const h=this.elements,m=1/(n-e),_=1/(s-a),y=1/(f-l),v=(n+e)*m,S=(s+a)*_;let w,E;if(u===Gi)w=(f+l)*y,E=-2*y;else if(u===kl)w=l*y,E=-1*y;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);return h[0]=2*m,h[4]=0,h[8]=0,h[12]=-v,h[1]=0,h[5]=2*_,h[9]=0,h[13]=-S,h[2]=0,h[6]=0,h[10]=E,h[14]=-w,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const n=this.elements,s=e.elements;for(let a=0;a<16;a++)if(n[a]!==s[a])return!1;return!0}fromArray(e,n=0){for(let s=0;s<16;s++)this.elements[s]=e[s+n];return this}toArray(e=[],n=0){const s=this.elements;return e[n]=s[0],e[n+1]=s[1],e[n+2]=s[2],e[n+3]=s[3],e[n+4]=s[4],e[n+5]=s[5],e[n+6]=s[6],e[n+7]=s[7],e[n+8]=s[8],e[n+9]=s[9],e[n+10]=s[10],e[n+11]=s[11],e[n+12]=s[12],e[n+13]=s[13],e[n+14]=s[14],e[n+15]=s[15],e}}const As=new se,ci=new Zt,O0=new se(0,0,0),k0=new se(1,1,1),gr=new se,cl=new se,zn=new se,lm=new Zt,cm=new Xo;class Wl{constructor(e=0,n=0,s=0,a=Wl.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=s,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,s,a=this._order){return this._x=e,this._y=n,this._z=s,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,s=!0){const a=e.elements,l=a[0],f=a[4],u=a[8],h=a[1],m=a[5],_=a[9],y=a[2],v=a[6],S=a[10];switch(n){case"XYZ":this._y=Math.asin(Dn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-_,S),this._z=Math.atan2(-f,l)):(this._x=Math.atan2(v,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Dn(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(u,S),this._z=Math.atan2(h,m)):(this._y=Math.atan2(-y,l),this._z=0);break;case"ZXY":this._x=Math.asin(Dn(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-y,S),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(h,l));break;case"ZYX":this._y=Math.asin(-Dn(y,-1,1)),Math.abs(y)<.9999999?(this._x=Math.atan2(v,S),this._z=Math.atan2(h,l)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(Dn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-_,m),this._y=Math.atan2(-y,l)):(this._x=0,this._y=Math.atan2(u,S));break;case"XZY":this._z=Math.asin(-Dn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(v,m),this._y=Math.atan2(u,l)):(this._x=Math.atan2(-_,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,s){return lm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(lm,n,s)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return cm.setFromEuler(this),this.setFromQuaternion(cm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wl.DEFAULT_ORDER="XYZ";class Sg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let z0=0;const um=new se,bs=new Xo,Oi=new Zt,ul=new se,zo=new se,B0=new se,H0=new Xo,fm=new se(1,0,0),dm=new se(0,1,0),hm=new se(0,0,1),G0={type:"added"},V0={type:"removed"};class En extends $s{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=jo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=En.DEFAULT_UP.clone();const e=new se,n=new Wl,s=new Xo,a=new se(1,1,1);function l(){s.setFromEuler(n,!1)}function f(){n.setFromQuaternion(s,void 0,!1)}n._onChange(l),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Zt},normalMatrix:{value:new mt}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=En.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return bs.setFromAxisAngle(e,n),this.quaternion.multiply(bs),this}rotateOnWorldAxis(e,n){return bs.setFromAxisAngle(e,n),this.quaternion.premultiply(bs),this}rotateX(e){return this.rotateOnAxis(fm,e)}rotateY(e){return this.rotateOnAxis(dm,e)}rotateZ(e){return this.rotateOnAxis(hm,e)}translateOnAxis(e,n){return um.copy(e).applyQuaternion(this.quaternion),this.position.add(um.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(fm,e)}translateY(e){return this.translateOnAxis(dm,e)}translateZ(e){return this.translateOnAxis(hm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Oi.copy(this.matrixWorld).invert())}lookAt(e,n,s){e.isVector3?ul.copy(e):ul.set(e,n,s);const a=this.parent;this.updateWorldMatrix(!0,!1),zo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Oi.lookAt(zo,ul,this.up):Oi.lookAt(ul,zo,this.up),this.quaternion.setFromRotationMatrix(Oi),a&&(Oi.extractRotation(a.matrixWorld),bs.setFromRotationMatrix(Oi),this.quaternion.premultiply(bs.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(G0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(V0)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Oi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Oi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Oi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let s=0,a=this.children.length;s<a;s++){const f=this.children[s].getObjectByProperty(e,n);if(f!==void 0)return f}}getObjectsByProperty(e,n,s=[]){this[e]===n&&s.push(this);const a=this.children;for(let l=0,f=a.length;l<f;l++)a[l].getObjectsByProperty(e,n,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zo,e,B0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zo,H0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let s=0,a=n.length;s<a;s++){const l=n[s];(l.matrixWorldAutoUpdate===!0||e===!0)&&l.updateMatrixWorld(e)}}updateWorldMatrix(e,n){const s=this.parent;if(e===!0&&s!==null&&s.matrixWorldAutoUpdate===!0&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),n===!0){const a=this.children;for(let l=0,f=a.length;l<f;l++){const u=a[l];u.matrixWorldAutoUpdate===!0&&u.updateWorldMatrix(!1,!0)}}}toJSON(e){const n=e===void 0||typeof e=="string",s={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(u=>({boxInitialized:u.boxInitialized,boxMin:u.box.min.toArray(),boxMax:u.box.max.toArray(),sphereInitialized:u.sphereInitialized,sphereRadius:u.sphere.radius,sphereCenter:u.sphere.center.toArray()})),a.maxGeometryCount=this._maxGeometryCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function l(u,h){return u[h.uuid]===void 0&&(u[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){const h=u.shapes;if(Array.isArray(h))for(let m=0,_=h.length;m<_;m++){const y=h[m];l(e.shapes,y)}else l(e.shapes,h)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const u=[];for(let h=0,m=this.material.length;h<m;h++)u.push(l(e.materials,this.material[h]));a.material=u}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let u=0;u<this.children.length;u++)a.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let u=0;u<this.animations.length;u++){const h=this.animations[u];a.animations.push(l(e.animations,h))}}if(n){const u=f(e.geometries),h=f(e.materials),m=f(e.textures),_=f(e.images),y=f(e.shapes),v=f(e.skeletons),S=f(e.animations),w=f(e.nodes);u.length>0&&(s.geometries=u),h.length>0&&(s.materials=h),m.length>0&&(s.textures=m),_.length>0&&(s.images=_),y.length>0&&(s.shapes=y),v.length>0&&(s.skeletons=v),S.length>0&&(s.animations=S),w.length>0&&(s.nodes=w)}return s.object=a,s;function f(u){const h=[];for(const m in u){const _=u[m];delete _.metadata,h.push(_)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let s=0;s<e.children.length;s++){const a=e.children[s];this.add(a.clone())}return this}}En.DEFAULT_UP=new se(0,1,0);En.DEFAULT_MATRIX_AUTO_UPDATE=!0;En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ui=new se,ki=new se,Ku=new se,zi=new se,Cs=new se,Rs=new se,pm=new se,Zu=new se,Qu=new se,Ju=new se;let fl=!1;class fi{constructor(e=new se,n=new se,s=new se){this.a=e,this.b=n,this.c=s}static getNormal(e,n,s,a){a.subVectors(s,n),ui.subVectors(e,n),a.cross(ui);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,n,s,a,l){ui.subVectors(a,n),ki.subVectors(s,n),Ku.subVectors(e,n);const f=ui.dot(ui),u=ui.dot(ki),h=ui.dot(Ku),m=ki.dot(ki),_=ki.dot(Ku),y=f*m-u*u;if(y===0)return l.set(0,0,0),null;const v=1/y,S=(m*h-u*_)*v,w=(f*_-u*h)*v;return l.set(1-S-w,w,S)}static containsPoint(e,n,s,a){return this.getBarycoord(e,n,s,a,zi)===null?!1:zi.x>=0&&zi.y>=0&&zi.x+zi.y<=1}static getUV(e,n,s,a,l,f,u,h){return fl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),fl=!0),this.getInterpolation(e,n,s,a,l,f,u,h)}static getInterpolation(e,n,s,a,l,f,u,h){return this.getBarycoord(e,n,s,a,zi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(l,zi.x),h.addScaledVector(f,zi.y),h.addScaledVector(u,zi.z),h)}static isFrontFacing(e,n,s,a){return ui.subVectors(s,n),ki.subVectors(e,n),ui.cross(ki).dot(a)<0}set(e,n,s){return this.a.copy(e),this.b.copy(n),this.c.copy(s),this}setFromPointsAndIndices(e,n,s,a){return this.a.copy(e[n]),this.b.copy(e[s]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,s,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ui.subVectors(this.c,this.b),ki.subVectors(this.a,this.b),ui.cross(ki).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return fi.getBarycoord(e,this.a,this.b,this.c,n)}getUV(e,n,s,a,l){return fl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),fl=!0),fi.getInterpolation(e,this.a,this.b,this.c,n,s,a,l)}getInterpolation(e,n,s,a,l){return fi.getInterpolation(e,this.a,this.b,this.c,n,s,a,l)}containsPoint(e){return fi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const s=this.a,a=this.b,l=this.c;let f,u;Cs.subVectors(a,s),Rs.subVectors(l,s),Zu.subVectors(e,s);const h=Cs.dot(Zu),m=Rs.dot(Zu);if(h<=0&&m<=0)return n.copy(s);Qu.subVectors(e,a);const _=Cs.dot(Qu),y=Rs.dot(Qu);if(_>=0&&y<=_)return n.copy(a);const v=h*y-_*m;if(v<=0&&h>=0&&_<=0)return f=h/(h-_),n.copy(s).addScaledVector(Cs,f);Ju.subVectors(e,l);const S=Cs.dot(Ju),w=Rs.dot(Ju);if(w>=0&&S<=w)return n.copy(l);const E=S*m-h*w;if(E<=0&&m>=0&&w<=0)return u=m/(m-w),n.copy(s).addScaledVector(Rs,u);const x=_*w-S*y;if(x<=0&&y-_>=0&&S-w>=0)return pm.subVectors(l,a),u=(y-_)/(y-_+(S-w)),n.copy(a).addScaledVector(pm,u);const g=1/(x+E+v);return f=E*g,u=v*g,n.copy(s).addScaledVector(Cs,f).addScaledVector(Rs,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Mg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vr={h:0,s:0,l:0},dl={h:0,s:0,l:0};function ef(r,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(e-r)*6*n:n<1/2?e:n<2/3?r+(e-r)*6*(2/3-n):r}class Mt{constructor(e,n,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,s)}set(e,n,s){if(n===void 0&&s===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.toWorkingColorSpace(this,n),this}setRGB(e,n,s,a=At.workingColorSpace){return this.r=e,this.g=n,this.b=s,At.toWorkingColorSpace(this,a),this}setHSL(e,n,s,a=At.workingColorSpace){if(e=R0(e,1),n=Dn(n,0,1),s=Dn(s,0,1),n===0)this.r=this.g=this.b=s;else{const l=s<=.5?s*(1+n):s+n-s*n,f=2*s-l;this.r=ef(f,l,e+1/3),this.g=ef(f,l,e),this.b=ef(f,l,e-1/3)}return At.toWorkingColorSpace(this,a),this}setStyle(e,n=ln){function s(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const f=a[1],u=a[2];switch(f){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return s(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,n);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return s(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,n);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return s(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],f=l.length;if(f===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(l,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=ln){const s=Mg[e.toLowerCase()];return s!==void 0?this.setHex(s,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vs(e.r),this.g=Vs(e.g),this.b=Vs(e.b),this}copyLinearToSRGB(e){return this.r=Gu(e.r),this.g=Gu(e.g),this.b=Gu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ln){return At.fromWorkingColorSpace(gn.copy(this),e),Math.round(Dn(gn.r*255,0,255))*65536+Math.round(Dn(gn.g*255,0,255))*256+Math.round(Dn(gn.b*255,0,255))}getHexString(e=ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=At.workingColorSpace){At.fromWorkingColorSpace(gn.copy(this),n);const s=gn.r,a=gn.g,l=gn.b,f=Math.max(s,a,l),u=Math.min(s,a,l);let h,m;const _=(u+f)/2;if(u===f)h=0,m=0;else{const y=f-u;switch(m=_<=.5?y/(f+u):y/(2-f-u),f){case s:h=(a-l)/y+(a<l?6:0);break;case a:h=(l-s)/y+2;break;case l:h=(s-a)/y+4;break}h/=6}return e.h=h,e.s=m,e.l=_,e}getRGB(e,n=At.workingColorSpace){return At.fromWorkingColorSpace(gn.copy(this),n),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=ln){At.fromWorkingColorSpace(gn.copy(this),e);const n=gn.r,s=gn.g,a=gn.b;return e!==ln?`color(${e} ${n.toFixed(3)} ${s.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(s*255)},${Math.round(a*255)})`}offsetHSL(e,n,s){return this.getHSL(vr),this.setHSL(vr.h+e,vr.s+n,vr.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,s){return this.r=e.r+(n.r-e.r)*s,this.g=e.g+(n.g-e.g)*s,this.b=e.b+(n.b-e.b)*s,this}lerpHSL(e,n){this.getHSL(vr),e.getHSL(dl);const s=Bu(vr.h,dl.h,n),a=Bu(vr.s,dl.s,n),l=Bu(vr.l,dl.l,n);return this.setHSL(s,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,s=this.g,a=this.b,l=e.elements;return this.r=l[0]*n+l[3]*s+l[6]*a,this.g=l[1]*n+l[4]*s+l[7]*a,this.b=l[2]*n+l[5]*s+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new Mt;Mt.NAMES=Mg;let W0=0;class Ks extends $s{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:W0++}),this.uuid=jo(),this.name="",this.type="Material",this.blending=Gs,this.side=Er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pf,this.blendDst=mf,this.blendEquation=jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=Ul,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=em,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ss,this.stencilZFail=Ss,this.stencilZPass=Ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const s=e[n];if(s===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(s):a&&a.isVector3&&s&&s.isVector3?a.copy(s):this[n]=s}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Gs&&(s.blending=this.blending),this.side!==Er&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==pf&&(s.blendSrc=this.blendSrc),this.blendDst!==mf&&(s.blendDst=this.blendDst),this.blendEquation!==jr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Ul&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==em&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ss&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Ss&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Ss&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function a(l){const f=[];for(const u in l){const h=l[u];delete h.metadata,f.push(h)}return f}if(n){const l=a(e.textures),f=a(e.images);l.length>0&&(s.textures=l),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let s=null;if(n!==null){const a=n.length;s=new Array(a);for(let l=0;l!==a;++l)s[l]=n[l].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Bl extends Ks{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=og,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const qt=new se,hl=new bt;class ei{constructor(e,n,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=s,this.usage=tm,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=xr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,s){e*=this.itemSize,s*=n.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=n.array[s+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,s=this.count;n<s;n++)hl.fromBufferAttribute(this,n),hl.applyMatrix3(e),this.setXY(n,hl.x,hl.y);else if(this.itemSize===3)for(let n=0,s=this.count;n<s;n++)qt.fromBufferAttribute(this,n),qt.applyMatrix3(e),this.setXYZ(n,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let n=0,s=this.count;n<s;n++)qt.fromBufferAttribute(this,n),qt.applyMatrix4(e),this.setXYZ(n,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let n=0,s=this.count;n<s;n++)qt.fromBufferAttribute(this,n),qt.applyNormalMatrix(e),this.setXYZ(n,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let n=0,s=this.count;n<s;n++)qt.fromBufferAttribute(this,n),qt.transformDirection(e),this.setXYZ(n,qt.x,qt.y,qt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let s=this.array[e*this.itemSize+n];return this.normalized&&(s=Fo(s,this.array)),s}setComponent(e,n,s){return this.normalized&&(s=Nn(s,this.array)),this.array[e*this.itemSize+n]=s,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Fo(n,this.array)),n}setX(e,n){return this.normalized&&(n=Nn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Fo(n,this.array)),n}setY(e,n){return this.normalized&&(n=Nn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Fo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Nn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Fo(n,this.array)),n}setW(e,n){return this.normalized&&(n=Nn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,s){return e*=this.itemSize,this.normalized&&(n=Nn(n,this.array),s=Nn(s,this.array)),this.array[e+0]=n,this.array[e+1]=s,this}setXYZ(e,n,s,a){return e*=this.itemSize,this.normalized&&(n=Nn(n,this.array),s=Nn(s,this.array),a=Nn(a,this.array)),this.array[e+0]=n,this.array[e+1]=s,this.array[e+2]=a,this}setXYZW(e,n,s,a,l){return e*=this.itemSize,this.normalized&&(n=Nn(n,this.array),s=Nn(s,this.array),a=Nn(a,this.array),l=Nn(l,this.array)),this.array[e+0]=n,this.array[e+1]=s,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==tm&&(e.usage=this.usage),e}}class Eg extends ei{constructor(e,n,s){super(new Uint16Array(e),n,s)}}class wg extends ei{constructor(e,n,s){super(new Uint32Array(e),n,s)}}class pi extends ei{constructor(e,n,s){super(new Float32Array(e),n,s)}}let j0=0;const $n=new Zt,tf=new En,Ps=new se,Bn=new qo,Bo=new qo,sn=new se;class ti extends $s{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:j0++}),this.uuid=jo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vg(e)?wg:Eg)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,s=0){this.groups.push({start:e,count:n,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const l=new mt().getNormalMatrix(e);s.applyNormalMatrix(l),s.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $n.makeRotationFromQuaternion(e),this.applyMatrix4($n),this}rotateX(e){return $n.makeRotationX(e),this.applyMatrix4($n),this}rotateY(e){return $n.makeRotationY(e),this.applyMatrix4($n),this}rotateZ(e){return $n.makeRotationZ(e),this.applyMatrix4($n),this}translate(e,n,s){return $n.makeTranslation(e,n,s),this.applyMatrix4($n),this}scale(e,n,s){return $n.makeScale(e,n,s),this.applyMatrix4($n),this}lookAt(e){return tf.lookAt(e),tf.updateMatrix(),this.applyMatrix4(tf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(e){const n=[];for(let s=0,a=e.length;s<a;s++){const l=e[s];n.push(l.x,l.y,l.z||0)}return this.setAttribute("position",new pi(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new se(-1/0,-1/0,-1/0),new se(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const l=n[s];Bn.setFromBufferAttribute(l),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new se,1/0);return}if(e){const s=this.boundingSphere.center;if(Bn.setFromBufferAttribute(e),n)for(let l=0,f=n.length;l<f;l++){const u=n[l];Bo.setFromBufferAttribute(u),this.morphTargetsRelative?(sn.addVectors(Bn.min,Bo.min),Bn.expandByPoint(sn),sn.addVectors(Bn.max,Bo.max),Bn.expandByPoint(sn)):(Bn.expandByPoint(Bo.min),Bn.expandByPoint(Bo.max))}Bn.getCenter(s);let a=0;for(let l=0,f=e.count;l<f;l++)sn.fromBufferAttribute(e,l),a=Math.max(a,s.distanceToSquared(sn));if(n)for(let l=0,f=n.length;l<f;l++){const u=n[l],h=this.morphTargetsRelative;for(let m=0,_=u.count;m<_;m++)sn.fromBufferAttribute(u,m),h&&(Ps.fromBufferAttribute(e,m),sn.add(Ps)),a=Math.max(a,s.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=e.array,a=n.position.array,l=n.normal.array,f=n.uv.array,u=a.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ei(new Float32Array(4*u),4));const h=this.getAttribute("tangent").array,m=[],_=[];for(let A=0;A<u;A++)m[A]=new se,_[A]=new se;const y=new se,v=new se,S=new se,w=new bt,E=new bt,x=new bt,g=new se,L=new se;function C(A,K,$){y.fromArray(a,A*3),v.fromArray(a,K*3),S.fromArray(a,$*3),w.fromArray(f,A*2),E.fromArray(f,K*2),x.fromArray(f,$*2),v.sub(y),S.sub(y),E.sub(w),x.sub(w);const pe=1/(E.x*x.y-x.x*E.y);isFinite(pe)&&(g.copy(v).multiplyScalar(x.y).addScaledVector(S,-E.y).multiplyScalar(pe),L.copy(S).multiplyScalar(E.x).addScaledVector(v,-x.x).multiplyScalar(pe),m[A].add(g),m[K].add(g),m[$].add(g),_[A].add(L),_[K].add(L),_[$].add(L))}let N=this.groups;N.length===0&&(N=[{start:0,count:s.length}]);for(let A=0,K=N.length;A<K;++A){const $=N[A],pe=$.start,k=$.count;for(let te=pe,re=pe+k;te<re;te+=3)C(s[te+0],s[te+1],s[te+2])}const j=new se,I=new se,F=new se,fe=new se;function T(A){F.fromArray(l,A*3),fe.copy(F);const K=m[A];j.copy(K),j.sub(F.multiplyScalar(F.dot(K))).normalize(),I.crossVectors(fe,K);const pe=I.dot(_[A])<0?-1:1;h[A*4]=j.x,h[A*4+1]=j.y,h[A*4+2]=j.z,h[A*4+3]=pe}for(let A=0,K=N.length;A<K;++A){const $=N[A],pe=$.start,k=$.count;for(let te=pe,re=pe+k;te<re;te+=3)T(s[te+0]),T(s[te+1]),T(s[te+2])}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new ei(new Float32Array(n.count*3),3),this.setAttribute("normal",s);else for(let v=0,S=s.count;v<S;v++)s.setXYZ(v,0,0,0);const a=new se,l=new se,f=new se,u=new se,h=new se,m=new se,_=new se,y=new se;if(e)for(let v=0,S=e.count;v<S;v+=3){const w=e.getX(v+0),E=e.getX(v+1),x=e.getX(v+2);a.fromBufferAttribute(n,w),l.fromBufferAttribute(n,E),f.fromBufferAttribute(n,x),_.subVectors(f,l),y.subVectors(a,l),_.cross(y),u.fromBufferAttribute(s,w),h.fromBufferAttribute(s,E),m.fromBufferAttribute(s,x),u.add(_),h.add(_),m.add(_),s.setXYZ(w,u.x,u.y,u.z),s.setXYZ(E,h.x,h.y,h.z),s.setXYZ(x,m.x,m.y,m.z)}else for(let v=0,S=n.count;v<S;v+=3)a.fromBufferAttribute(n,v+0),l.fromBufferAttribute(n,v+1),f.fromBufferAttribute(n,v+2),_.subVectors(f,l),y.subVectors(a,l),_.cross(y),s.setXYZ(v+0,_.x,_.y,_.z),s.setXYZ(v+1,_.x,_.y,_.z),s.setXYZ(v+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,s=e.count;n<s;n++)sn.fromBufferAttribute(e,n),sn.normalize(),e.setXYZ(n,sn.x,sn.y,sn.z)}toNonIndexed(){function e(u,h){const m=u.array,_=u.itemSize,y=u.normalized,v=new m.constructor(h.length*_);let S=0,w=0;for(let E=0,x=h.length;E<x;E++){u.isInterleavedBufferAttribute?S=h[E]*u.data.stride+u.offset:S=h[E]*_;for(let g=0;g<_;g++)v[w++]=m[S++]}return new ei(v,_,y)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new ti,s=this.index.array,a=this.attributes;for(const u in a){const h=a[u],m=e(h,s);n.setAttribute(u,m)}const l=this.morphAttributes;for(const u in l){const h=[],m=l[u];for(let _=0,y=m.length;_<y;_++){const v=m[_],S=e(v,s);h.push(S)}n.morphAttributes[u]=h}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let u=0,h=f.length;u<h;u++){const m=f[u];n.addGroup(m.start,m.count,m.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const m in h)h[m]!==void 0&&(e[m]=h[m]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const s=this.attributes;for(const h in s){const m=s[h];e.data.attributes[h]=m.toJSON(e.data)}const a={};let l=!1;for(const h in this.morphAttributes){const m=this.morphAttributes[h],_=[];for(let y=0,v=m.length;y<v;y++){const S=m[y];_.push(S.toJSON(e.data))}_.length>0&&(a[h]=_,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const u=this.boundingSphere;return u!==null&&(e.data.boundingSphere={center:u.center.toArray(),radius:u.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone(n));const a=e.attributes;for(const m in a){const _=a[m];this.setAttribute(m,_.clone(n))}const l=e.morphAttributes;for(const m in l){const _=[],y=l[m];for(let v=0,S=y.length;v<S;v++)_.push(y[v].clone(n));this.morphAttributes[m]=_}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let m=0,_=f.length;m<_;m++){const y=f[m];this.addGroup(y.start,y.count,y.materialIndex)}const u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const mm=new Zt,Hr=new Pf,pl=new Yo,gm=new se,Ls=new se,Ns=new se,Ds=new se,nf=new se,ml=new se,gl=new bt,vl=new bt,_l=new bt,vm=new se,_m=new se,xm=new se,xl=new se,yl=new se;class Si extends En{constructor(e=new ti,n=new Bl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const a=n[s[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,f=a.length;l<f;l++){const u=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=l}}}}getVertexPosition(e,n){const s=this.geometry,a=s.attributes.position,l=s.morphAttributes.position,f=s.morphTargetsRelative;n.fromBufferAttribute(a,e);const u=this.morphTargetInfluences;if(l&&u){ml.set(0,0,0);for(let h=0,m=l.length;h<m;h++){const _=u[h],y=l[h];_!==0&&(nf.fromBufferAttribute(y,e),f?ml.addScaledVector(nf,_):ml.addScaledVector(nf.sub(n),_))}n.add(ml)}return n}raycast(e,n){const s=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),pl.copy(s.boundingSphere),pl.applyMatrix4(l),Hr.copy(e.ray).recast(e.near),!(pl.containsPoint(Hr.origin)===!1&&(Hr.intersectSphere(pl,gm)===null||Hr.origin.distanceToSquared(gm)>(e.far-e.near)**2))&&(mm.copy(l).invert(),Hr.copy(e.ray).applyMatrix4(mm),!(s.boundingBox!==null&&Hr.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,n,Hr)))}_computeIntersections(e,n,s){let a;const l=this.geometry,f=this.material,u=l.index,h=l.attributes.position,m=l.attributes.uv,_=l.attributes.uv1,y=l.attributes.normal,v=l.groups,S=l.drawRange;if(u!==null)if(Array.isArray(f))for(let w=0,E=v.length;w<E;w++){const x=v[w],g=f[x.materialIndex],L=Math.max(x.start,S.start),C=Math.min(u.count,Math.min(x.start+x.count,S.start+S.count));for(let N=L,j=C;N<j;N+=3){const I=u.getX(N),F=u.getX(N+1),fe=u.getX(N+2);a=Sl(this,g,e,s,m,_,y,I,F,fe),a&&(a.faceIndex=Math.floor(N/3),a.face.materialIndex=x.materialIndex,n.push(a))}}else{const w=Math.max(0,S.start),E=Math.min(u.count,S.start+S.count);for(let x=w,g=E;x<g;x+=3){const L=u.getX(x),C=u.getX(x+1),N=u.getX(x+2);a=Sl(this,f,e,s,m,_,y,L,C,N),a&&(a.faceIndex=Math.floor(x/3),n.push(a))}}else if(h!==void 0)if(Array.isArray(f))for(let w=0,E=v.length;w<E;w++){const x=v[w],g=f[x.materialIndex],L=Math.max(x.start,S.start),C=Math.min(h.count,Math.min(x.start+x.count,S.start+S.count));for(let N=L,j=C;N<j;N+=3){const I=N,F=N+1,fe=N+2;a=Sl(this,g,e,s,m,_,y,I,F,fe),a&&(a.faceIndex=Math.floor(N/3),a.face.materialIndex=x.materialIndex,n.push(a))}}else{const w=Math.max(0,S.start),E=Math.min(h.count,S.start+S.count);for(let x=w,g=E;x<g;x+=3){const L=x,C=x+1,N=x+2;a=Sl(this,f,e,s,m,_,y,L,C,N),a&&(a.faceIndex=Math.floor(x/3),n.push(a))}}}}function X0(r,e,n,s,a,l,f,u){let h;if(e.side===Un?h=s.intersectTriangle(f,l,a,!0,u):h=s.intersectTriangle(a,l,f,e.side===Er,u),h===null)return null;yl.copy(u),yl.applyMatrix4(r.matrixWorld);const m=n.ray.origin.distanceTo(yl);return m<n.near||m>n.far?null:{distance:m,point:yl.clone(),object:r}}function Sl(r,e,n,s,a,l,f,u,h,m){r.getVertexPosition(u,Ls),r.getVertexPosition(h,Ns),r.getVertexPosition(m,Ds);const _=X0(r,e,n,s,Ls,Ns,Ds,xl);if(_){a&&(gl.fromBufferAttribute(a,u),vl.fromBufferAttribute(a,h),_l.fromBufferAttribute(a,m),_.uv=fi.getInterpolation(xl,Ls,Ns,Ds,gl,vl,_l,new bt)),l&&(gl.fromBufferAttribute(l,u),vl.fromBufferAttribute(l,h),_l.fromBufferAttribute(l,m),_.uv1=fi.getInterpolation(xl,Ls,Ns,Ds,gl,vl,_l,new bt),_.uv2=_.uv1),f&&(vm.fromBufferAttribute(f,u),_m.fromBufferAttribute(f,h),xm.fromBufferAttribute(f,m),_.normal=fi.getInterpolation(xl,Ls,Ns,Ds,vm,_m,xm,new se),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const y={a:u,b:h,c:m,normal:new se,materialIndex:0};fi.getNormal(Ls,Ns,Ds,y.normal),_.face=y}return _}class $o extends ti{constructor(e=1,n=1,s=1,a=1,l=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:s,widthSegments:a,heightSegments:l,depthSegments:f};const u=this;a=Math.floor(a),l=Math.floor(l),f=Math.floor(f);const h=[],m=[],_=[],y=[];let v=0,S=0;w("z","y","x",-1,-1,s,n,e,f,l,0),w("z","y","x",1,-1,s,n,-e,f,l,1),w("x","z","y",1,1,e,s,n,a,f,2),w("x","z","y",1,-1,e,s,-n,a,f,3),w("x","y","z",1,-1,e,n,s,a,l,4),w("x","y","z",-1,-1,e,n,-s,a,l,5),this.setIndex(h),this.setAttribute("position",new pi(m,3)),this.setAttribute("normal",new pi(_,3)),this.setAttribute("uv",new pi(y,2));function w(E,x,g,L,C,N,j,I,F,fe,T){const A=N/F,K=j/fe,$=N/2,pe=j/2,k=I/2,te=F+1,re=fe+1;let le=0,V=0;const z=new se;for(let Y=0;Y<re;Y++){const D=Y*K-pe;for(let q=0;q<te;q++){const Z=q*A-$;z[E]=Z*L,z[x]=D*C,z[g]=k,m.push(z.x,z.y,z.z),z[E]=0,z[x]=0,z[g]=I>0?1:-1,_.push(z.x,z.y,z.z),y.push(q/F),y.push(1-Y/fe),le+=1}}for(let Y=0;Y<fe;Y++)for(let D=0;D<F;D++){const q=v+D+te*Y,Z=v+D+te*(Y+1),ue=v+(D+1)+te*(Y+1),ge=v+(D+1)+te*Y;h.push(q,Z,ge),h.push(Z,ue,ge),V+=6}u.addGroup(S,V,T),S+=V,v+=le}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $o(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function qs(r){const e={};for(const n in r){e[n]={};for(const s in r[n]){const a=r[n][s];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][s]=null):e[n][s]=a.clone():Array.isArray(a)?e[n][s]=a.slice():e[n][s]=a}}return e}function Sn(r){const e={};for(let n=0;n<r.length;n++){const s=qs(r[n]);for(const a in s)e[a]=s[a]}return e}function q0(r){const e=[];for(let n=0;n<r.length;n++)e.push(r[n].clone());return e}function Tg(r){return r.getRenderTarget()===null?r.outputColorSpace:At.workingColorSpace}const Y0={clone:qs,merge:Sn};var $0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,K0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zr extends Ks{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$0,this.fragmentShader=K0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qs(e.uniforms),this.uniformsGroups=q0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const f=this.uniforms[a].value;f&&f.isTexture?n.uniforms[a]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?n.uniforms[a]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[a]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[a]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[a]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[a]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[a]={type:"m4",value:f.toArray()}:n.uniforms[a]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const s={};for(const a in this.extensions)this.extensions[a]===!0&&(s[a]=!0);return Object.keys(s).length>0&&(n.extensions=s),n}}class Ag extends En{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=Gi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Zn extends Ag{constructor(e=50,n=1,s=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Sf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Sf*2*Math.atan(Math.tan(zu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,n,s,a,l,f){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=a,this.view.width=l,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(zu*.5*this.fov)/this.zoom,s=2*n,a=this.aspect*s,l=-.5*a;const f=this.view;if(this.view!==null&&this.view.enabled){const h=f.fullWidth,m=f.fullHeight;l+=f.offsetX*a/h,n-=f.offsetY*s/m,a*=f.width/h,s*=f.height/m}const u=this.filmOffset;u!==0&&(l+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,n,n-s,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Us=-90,Is=1;class Z0 extends En{constructor(e,n,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Zn(Us,Is,e,n);a.layers=this.layers,this.add(a);const l=new Zn(Us,Is,e,n);l.layers=this.layers,this.add(l);const f=new Zn(Us,Is,e,n);f.layers=this.layers,this.add(f);const u=new Zn(Us,Is,e,n);u.layers=this.layers,this.add(u);const h=new Zn(Us,Is,e,n);h.layers=this.layers,this.add(h);const m=new Zn(Us,Is,e,n);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[s,a,l,f,u,h]=n;for(const m of n)this.remove(m);if(e===Gi)s.up.set(0,1,0),s.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===kl)s.up.set(0,-1,0),s.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of n)this.add(m),m.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,f,u,h,m,_]=this.children,y=e.getRenderTarget(),v=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),w=e.xr.enabled;e.xr.enabled=!1;const E=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,a),e.render(n,l),e.setRenderTarget(s,1,a),e.render(n,f),e.setRenderTarget(s,2,a),e.render(n,u),e.setRenderTarget(s,3,a),e.render(n,h),e.setRenderTarget(s,4,a),e.render(n,m),s.texture.generateMipmaps=E,e.setRenderTarget(s,5,a),e.render(n,_),e.setRenderTarget(y,v,S),e.xr.enabled=w,s.texture.needsPMREMUpdate=!0}}class bg extends Hn{constructor(e,n,s,a,l,f,u,h,m,_){e=e!==void 0?e:[],n=n!==void 0?n:Ws,super(e,n,s,a,l,f,u,h,m,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Q0 extends Kr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},a=[s,s,s,s,s,s];n.encoding!==void 0&&(Go("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===$r?ln:Jn),this.texture=new bg(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Kn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new $o(5,5,5),l=new Zr({name:"CubemapFromEquirect",uniforms:qs(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Un,blending:yr});l.uniforms.tEquirect.value=n;const f=new Si(a,l),u=n.minFilter;return n.minFilter===Vo&&(n.minFilter=Kn),new Z0(1,10,this).update(e,f),n.minFilter=u,f.geometry.dispose(),f.material.dispose(),this}clear(e,n,s,a){const l=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(n,s,a);e.setRenderTarget(l)}}const rf=new se,J0=new se,ey=new mt;class Vr{constructor(e=new se(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,s,a){return this.normal.set(e,n,s),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,s){const a=rf.subVectors(s,n).cross(J0.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const s=e.delta(rf),a=this.normal.dot(s);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/a;return l<0||l>1?null:n.copy(e.start).addScaledVector(s,l)}intersectsLine(e){const n=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return n<0&&s>0||s<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const s=n||ey.getNormalMatrix(e),a=this.coplanarPoint(rf).applyMatrix4(e),l=this.normal.applyMatrix3(s).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Gr=new Yo,Ml=new se;class Cg{constructor(e=new Vr,n=new Vr,s=new Vr,a=new Vr,l=new Vr,f=new Vr){this.planes=[e,n,s,a,l,f]}set(e,n,s,a,l,f){const u=this.planes;return u[0].copy(e),u[1].copy(n),u[2].copy(s),u[3].copy(a),u[4].copy(l),u[5].copy(f),this}copy(e){const n=this.planes;for(let s=0;s<6;s++)n[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,n=Gi){const s=this.planes,a=e.elements,l=a[0],f=a[1],u=a[2],h=a[3],m=a[4],_=a[5],y=a[6],v=a[7],S=a[8],w=a[9],E=a[10],x=a[11],g=a[12],L=a[13],C=a[14],N=a[15];if(s[0].setComponents(h-l,v-m,x-S,N-g).normalize(),s[1].setComponents(h+l,v+m,x+S,N+g).normalize(),s[2].setComponents(h+f,v+_,x+w,N+L).normalize(),s[3].setComponents(h-f,v-_,x-w,N-L).normalize(),s[4].setComponents(h-u,v-y,x-E,N-C).normalize(),n===Gi)s[5].setComponents(h+u,v+y,x+E,N+C).normalize();else if(n===kl)s[5].setComponents(u,y,E,C).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Gr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Gr)}intersectsSprite(e){return Gr.center.set(0,0,0),Gr.radius=.7071067811865476,Gr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Gr)}intersectsSphere(e){const n=this.planes,s=e.center,a=-e.radius;for(let l=0;l<6;l++)if(n[l].distanceToPoint(s)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let s=0;s<6;s++){const a=n[s];if(Ml.x=a.normal.x>0?e.max.x:e.min.x,Ml.y=a.normal.y>0?e.max.y:e.min.y,Ml.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Ml)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let s=0;s<6;s++)if(n[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Rg(){let r=null,e=!1,n=null,s=null;function a(l,f){n(l,f),s=r.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(s=r.requestAnimationFrame(a),e=!0)},stop:function(){r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(l){n=l},setContext:function(l){r=l}}}function ty(r,e){const n=e.isWebGL2,s=new WeakMap;function a(m,_){const y=m.array,v=m.usage,S=y.byteLength,w=r.createBuffer();r.bindBuffer(_,w),r.bufferData(_,y,v),m.onUploadCallback();let E;if(y instanceof Float32Array)E=r.FLOAT;else if(y instanceof Uint16Array)if(m.isFloat16BufferAttribute)if(n)E=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else E=r.UNSIGNED_SHORT;else if(y instanceof Int16Array)E=r.SHORT;else if(y instanceof Uint32Array)E=r.UNSIGNED_INT;else if(y instanceof Int32Array)E=r.INT;else if(y instanceof Int8Array)E=r.BYTE;else if(y instanceof Uint8Array)E=r.UNSIGNED_BYTE;else if(y instanceof Uint8ClampedArray)E=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+y);return{buffer:w,type:E,bytesPerElement:y.BYTES_PER_ELEMENT,version:m.version,size:S}}function l(m,_,y){const v=_.array,S=_._updateRange,w=_.updateRanges;if(r.bindBuffer(y,m),S.count===-1&&w.length===0&&r.bufferSubData(y,0,v),w.length!==0){for(let E=0,x=w.length;E<x;E++){const g=w[E];n?r.bufferSubData(y,g.start*v.BYTES_PER_ELEMENT,v,g.start,g.count):r.bufferSubData(y,g.start*v.BYTES_PER_ELEMENT,v.subarray(g.start,g.start+g.count))}_.clearUpdateRanges()}S.count!==-1&&(n?r.bufferSubData(y,S.offset*v.BYTES_PER_ELEMENT,v,S.offset,S.count):r.bufferSubData(y,S.offset*v.BYTES_PER_ELEMENT,v.subarray(S.offset,S.offset+S.count)),S.count=-1),_.onUploadCallback()}function f(m){return m.isInterleavedBufferAttribute&&(m=m.data),s.get(m)}function u(m){m.isInterleavedBufferAttribute&&(m=m.data);const _=s.get(m);_&&(r.deleteBuffer(_.buffer),s.delete(m))}function h(m,_){if(m.isGLBufferAttribute){const v=s.get(m);(!v||v.version<m.version)&&s.set(m,{buffer:m.buffer,type:m.type,bytesPerElement:m.elementSize,version:m.version});return}m.isInterleavedBufferAttribute&&(m=m.data);const y=s.get(m);if(y===void 0)s.set(m,a(m,_));else if(y.version<m.version){if(y.size!==m.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");l(y.buffer,m,_),y.version=m.version}}return{get:f,remove:u,update:h}}class Lf extends ti{constructor(e=1,n=1,s=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:s,heightSegments:a};const l=e/2,f=n/2,u=Math.floor(s),h=Math.floor(a),m=u+1,_=h+1,y=e/u,v=n/h,S=[],w=[],E=[],x=[];for(let g=0;g<_;g++){const L=g*v-f;for(let C=0;C<m;C++){const N=C*y-l;w.push(N,-L,0),E.push(0,0,1),x.push(C/u),x.push(1-g/h)}}for(let g=0;g<h;g++)for(let L=0;L<u;L++){const C=L+m*g,N=L+m*(g+1),j=L+1+m*(g+1),I=L+1+m*g;S.push(C,N,I),S.push(N,j,I)}this.setIndex(S),this.setAttribute("position",new pi(w,3)),this.setAttribute("normal",new pi(E,3)),this.setAttribute("uv",new pi(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lf(e.width,e.height,e.widthSegments,e.heightSegments)}}var ny=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,iy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ry=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,oy=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,ay=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ly=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uy=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,dy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,py=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,my=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,_y=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,My=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ey=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,wy=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ty=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ay=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,by=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Cy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ry=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Py=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ly=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ny="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dy=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Uy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Iy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Fy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Oy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ky=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,By=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wy=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,jy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,$y=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ky=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,eS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tS=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,nS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,iS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,rS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sS=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,oS=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aS=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,lS=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,cS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mS=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,vS=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,_S=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,xS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,SS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,MS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ES=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,TS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,AS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,CS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,RS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,PS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,LS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,NS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,DS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,US=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,IS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,FS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,OS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,kS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,zS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,BS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,HS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,GS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,VS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,WS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,jS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,XS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,YS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,$S=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,KS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ZS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,QS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,JS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,eM=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tM=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nM=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,lM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,cM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,uM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_M=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,MM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,EM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,AM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,CM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,PM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,LM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,NM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,DM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,UM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ht={alphahash_fragment:ny,alphahash_pars_fragment:iy,alphamap_fragment:ry,alphamap_pars_fragment:sy,alphatest_fragment:oy,alphatest_pars_fragment:ay,aomap_fragment:ly,aomap_pars_fragment:cy,batching_pars_vertex:uy,batching_vertex:fy,begin_vertex:dy,beginnormal_vertex:hy,bsdfs:py,iridescence_fragment:my,bumpmap_pars_fragment:gy,clipping_planes_fragment:vy,clipping_planes_pars_fragment:_y,clipping_planes_pars_vertex:xy,clipping_planes_vertex:yy,color_fragment:Sy,color_pars_fragment:My,color_pars_vertex:Ey,color_vertex:wy,common:Ty,cube_uv_reflection_fragment:Ay,defaultnormal_vertex:by,displacementmap_pars_vertex:Cy,displacementmap_vertex:Ry,emissivemap_fragment:Py,emissivemap_pars_fragment:Ly,colorspace_fragment:Ny,colorspace_pars_fragment:Dy,envmap_fragment:Uy,envmap_common_pars_fragment:Iy,envmap_pars_fragment:Fy,envmap_pars_vertex:Oy,envmap_physical_pars_fragment:$y,envmap_vertex:ky,fog_vertex:zy,fog_pars_vertex:By,fog_fragment:Hy,fog_pars_fragment:Gy,gradientmap_pars_fragment:Vy,lightmap_fragment:Wy,lightmap_pars_fragment:jy,lights_lambert_fragment:Xy,lights_lambert_pars_fragment:qy,lights_pars_begin:Yy,lights_toon_fragment:Ky,lights_toon_pars_fragment:Zy,lights_phong_fragment:Qy,lights_phong_pars_fragment:Jy,lights_physical_fragment:eS,lights_physical_pars_fragment:tS,lights_fragment_begin:nS,lights_fragment_maps:iS,lights_fragment_end:rS,logdepthbuf_fragment:sS,logdepthbuf_pars_fragment:oS,logdepthbuf_pars_vertex:aS,logdepthbuf_vertex:lS,map_fragment:cS,map_pars_fragment:uS,map_particle_fragment:fS,map_particle_pars_fragment:dS,metalnessmap_fragment:hS,metalnessmap_pars_fragment:pS,morphcolor_vertex:mS,morphnormal_vertex:gS,morphtarget_pars_vertex:vS,morphtarget_vertex:_S,normal_fragment_begin:xS,normal_fragment_maps:yS,normal_pars_fragment:SS,normal_pars_vertex:MS,normal_vertex:ES,normalmap_pars_fragment:wS,clearcoat_normal_fragment_begin:TS,clearcoat_normal_fragment_maps:AS,clearcoat_pars_fragment:bS,iridescence_pars_fragment:CS,opaque_fragment:RS,packing:PS,premultiplied_alpha_fragment:LS,project_vertex:NS,dithering_fragment:DS,dithering_pars_fragment:US,roughnessmap_fragment:IS,roughnessmap_pars_fragment:FS,shadowmap_pars_fragment:OS,shadowmap_pars_vertex:kS,shadowmap_vertex:zS,shadowmask_pars_fragment:BS,skinbase_vertex:HS,skinning_pars_vertex:GS,skinning_vertex:VS,skinnormal_vertex:WS,specularmap_fragment:jS,specularmap_pars_fragment:XS,tonemapping_fragment:qS,tonemapping_pars_fragment:YS,transmission_fragment:$S,transmission_pars_fragment:KS,uv_pars_fragment:ZS,uv_pars_vertex:QS,uv_vertex:JS,worldpos_vertex:eM,background_vert:tM,background_frag:nM,backgroundCube_vert:iM,backgroundCube_frag:rM,cube_vert:sM,cube_frag:oM,depth_vert:aM,depth_frag:lM,distanceRGBA_vert:cM,distanceRGBA_frag:uM,equirect_vert:fM,equirect_frag:dM,linedashed_vert:hM,linedashed_frag:pM,meshbasic_vert:mM,meshbasic_frag:gM,meshlambert_vert:vM,meshlambert_frag:_M,meshmatcap_vert:xM,meshmatcap_frag:yM,meshnormal_vert:SM,meshnormal_frag:MM,meshphong_vert:EM,meshphong_frag:wM,meshphysical_vert:TM,meshphysical_frag:AM,meshtoon_vert:bM,meshtoon_frag:CM,points_vert:RM,points_frag:PM,shadow_vert:LM,shadow_frag:NM,sprite_vert:DM,sprite_frag:UM},Le={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new mt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new mt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0},uvTransform:{value:new mt}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}}},yi={basic:{uniforms:Sn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:Sn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new Mt(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:Sn([Le.common,Le.specularmap,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,Le.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:Sn([Le.common,Le.envmap,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.roughnessmap,Le.metalnessmap,Le.fog,Le.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:Sn([Le.common,Le.aomap,Le.lightmap,Le.emissivemap,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.gradientmap,Le.fog,Le.lights,{emissive:{value:new Mt(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:Sn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,Le.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:Sn([Le.points,Le.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:Sn([Le.common,Le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:Sn([Le.common,Le.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:Sn([Le.common,Le.bumpmap,Le.normalmap,Le.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:Sn([Le.sprite,Le.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:Sn([Le.common,Le.displacementmap,{referencePosition:{value:new se},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:Sn([Le.lights,Le.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};yi.physical={uniforms:Sn([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new mt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new mt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new mt},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new mt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new mt},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new mt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new mt}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};const El={r:0,b:0,g:0};function IM(r,e,n,s,a,l,f){const u=new Mt(0);let h=l===!0?0:1,m,_,y=null,v=0,S=null;function w(x,g){let L=!1,C=g.isScene===!0?g.background:null;C&&C.isTexture&&(C=(g.backgroundBlurriness>0?n:e).get(C)),C===null?E(u,h):C&&C.isColor&&(E(C,1),L=!0);const N=r.xr.getEnvironmentBlendMode();N==="additive"?s.buffers.color.setClear(0,0,0,1,f):N==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,f),(r.autoClear||L)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),C&&(C.isCubeTexture||C.mapping===Gl)?(_===void 0&&(_=new Si(new $o(1,1,1),new Zr({name:"BackgroundCubeMaterial",uniforms:qs(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(j,I,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(_)),_.material.uniforms.envMap.value=C,_.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,_.material.toneMapped=At.getTransfer(C.colorSpace)!==It,(y!==C||v!==C.version||S!==r.toneMapping)&&(_.material.needsUpdate=!0,y=C,v=C.version,S=r.toneMapping),_.layers.enableAll(),x.unshift(_,_.geometry,_.material,0,0,null)):C&&C.isTexture&&(m===void 0&&(m=new Si(new Lf(2,2),new Zr({name:"BackgroundMaterial",uniforms:qs(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:Er,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(m)),m.material.uniforms.t2D.value=C,m.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,m.material.toneMapped=At.getTransfer(C.colorSpace)!==It,C.matrixAutoUpdate===!0&&C.updateMatrix(),m.material.uniforms.uvTransform.value.copy(C.matrix),(y!==C||v!==C.version||S!==r.toneMapping)&&(m.material.needsUpdate=!0,y=C,v=C.version,S=r.toneMapping),m.layers.enableAll(),x.unshift(m,m.geometry,m.material,0,0,null))}function E(x,g){x.getRGB(El,Tg(r)),s.buffers.color.setClear(El.r,El.g,El.b,g,f)}return{getClearColor:function(){return u},setClearColor:function(x,g=1){u.set(x),h=g,E(u,h)},getClearAlpha:function(){return h},setClearAlpha:function(x){h=x,E(u,h)},render:w}}function FM(r,e,n,s){const a=r.getParameter(r.MAX_VERTEX_ATTRIBS),l=s.isWebGL2?null:e.get("OES_vertex_array_object"),f=s.isWebGL2||l!==null,u={},h=x(null);let m=h,_=!1;function y(k,te,re,le,V){let z=!1;if(f){const Y=E(le,re,te);m!==Y&&(m=Y,S(m.object)),z=g(k,le,re,V),z&&L(k,le,re,V)}else{const Y=te.wireframe===!0;(m.geometry!==le.id||m.program!==re.id||m.wireframe!==Y)&&(m.geometry=le.id,m.program=re.id,m.wireframe=Y,z=!0)}V!==null&&n.update(V,r.ELEMENT_ARRAY_BUFFER),(z||_)&&(_=!1,fe(k,te,re,le),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,n.get(V).buffer))}function v(){return s.isWebGL2?r.createVertexArray():l.createVertexArrayOES()}function S(k){return s.isWebGL2?r.bindVertexArray(k):l.bindVertexArrayOES(k)}function w(k){return s.isWebGL2?r.deleteVertexArray(k):l.deleteVertexArrayOES(k)}function E(k,te,re){const le=re.wireframe===!0;let V=u[k.id];V===void 0&&(V={},u[k.id]=V);let z=V[te.id];z===void 0&&(z={},V[te.id]=z);let Y=z[le];return Y===void 0&&(Y=x(v()),z[le]=Y),Y}function x(k){const te=[],re=[],le=[];for(let V=0;V<a;V++)te[V]=0,re[V]=0,le[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:te,enabledAttributes:re,attributeDivisors:le,object:k,attributes:{},index:null}}function g(k,te,re,le){const V=m.attributes,z=te.attributes;let Y=0;const D=re.getAttributes();for(const q in D)if(D[q].location>=0){const ue=V[q];let ge=z[q];if(ge===void 0&&(q==="instanceMatrix"&&k.instanceMatrix&&(ge=k.instanceMatrix),q==="instanceColor"&&k.instanceColor&&(ge=k.instanceColor)),ue===void 0||ue.attribute!==ge||ge&&ue.data!==ge.data)return!0;Y++}return m.attributesNum!==Y||m.index!==le}function L(k,te,re,le){const V={},z=te.attributes;let Y=0;const D=re.getAttributes();for(const q in D)if(D[q].location>=0){let ue=z[q];ue===void 0&&(q==="instanceMatrix"&&k.instanceMatrix&&(ue=k.instanceMatrix),q==="instanceColor"&&k.instanceColor&&(ue=k.instanceColor));const ge={};ge.attribute=ue,ue&&ue.data&&(ge.data=ue.data),V[q]=ge,Y++}m.attributes=V,m.attributesNum=Y,m.index=le}function C(){const k=m.newAttributes;for(let te=0,re=k.length;te<re;te++)k[te]=0}function N(k){j(k,0)}function j(k,te){const re=m.newAttributes,le=m.enabledAttributes,V=m.attributeDivisors;re[k]=1,le[k]===0&&(r.enableVertexAttribArray(k),le[k]=1),V[k]!==te&&((s.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[s.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](k,te),V[k]=te)}function I(){const k=m.newAttributes,te=m.enabledAttributes;for(let re=0,le=te.length;re<le;re++)te[re]!==k[re]&&(r.disableVertexAttribArray(re),te[re]=0)}function F(k,te,re,le,V,z,Y){Y===!0?r.vertexAttribIPointer(k,te,re,V,z):r.vertexAttribPointer(k,te,re,le,V,z)}function fe(k,te,re,le){if(s.isWebGL2===!1&&(k.isInstancedMesh||le.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;C();const V=le.attributes,z=re.getAttributes(),Y=te.defaultAttributeValues;for(const D in z){const q=z[D];if(q.location>=0){let Z=V[D];if(Z===void 0&&(D==="instanceMatrix"&&k.instanceMatrix&&(Z=k.instanceMatrix),D==="instanceColor"&&k.instanceColor&&(Z=k.instanceColor)),Z!==void 0){const ue=Z.normalized,ge=Z.itemSize,Ee=n.get(Z);if(Ee===void 0)continue;const be=Ee.buffer,Ce=Ee.type,Ie=Ee.bytesPerElement,He=s.isWebGL2===!0&&(Ce===r.INT||Ce===r.UNSIGNED_INT||Z.gpuType===lg);if(Z.isInterleavedBufferAttribute){const Ge=Z.data,Q=Ge.stride,Lt=Z.offset;if(Ge.isInstancedInterleavedBuffer){for(let qe=0;qe<q.locationSize;qe++)j(q.location+qe,Ge.meshPerAttribute);k.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=Ge.meshPerAttribute*Ge.count)}else for(let qe=0;qe<q.locationSize;qe++)N(q.location+qe);r.bindBuffer(r.ARRAY_BUFFER,be);for(let qe=0;qe<q.locationSize;qe++)F(q.location+qe,ge/q.locationSize,Ce,ue,Q*Ie,(Lt+ge/q.locationSize*qe)*Ie,He)}else{if(Z.isInstancedBufferAttribute){for(let Ge=0;Ge<q.locationSize;Ge++)j(q.location+Ge,Z.meshPerAttribute);k.isInstancedMesh!==!0&&le._maxInstanceCount===void 0&&(le._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Ge=0;Ge<q.locationSize;Ge++)N(q.location+Ge);r.bindBuffer(r.ARRAY_BUFFER,be);for(let Ge=0;Ge<q.locationSize;Ge++)F(q.location+Ge,ge/q.locationSize,Ce,ue,ge*Ie,ge/q.locationSize*Ge*Ie,He)}}else if(Y!==void 0){const ue=Y[D];if(ue!==void 0)switch(ue.length){case 2:r.vertexAttrib2fv(q.location,ue);break;case 3:r.vertexAttrib3fv(q.location,ue);break;case 4:r.vertexAttrib4fv(q.location,ue);break;default:r.vertexAttrib1fv(q.location,ue)}}}}I()}function T(){$();for(const k in u){const te=u[k];for(const re in te){const le=te[re];for(const V in le)w(le[V].object),delete le[V];delete te[re]}delete u[k]}}function A(k){if(u[k.id]===void 0)return;const te=u[k.id];for(const re in te){const le=te[re];for(const V in le)w(le[V].object),delete le[V];delete te[re]}delete u[k.id]}function K(k){for(const te in u){const re=u[te];if(re[k.id]===void 0)continue;const le=re[k.id];for(const V in le)w(le[V].object),delete le[V];delete re[k.id]}}function $(){pe(),_=!0,m!==h&&(m=h,S(m.object))}function pe(){h.geometry=null,h.program=null,h.wireframe=!1}return{setup:y,reset:$,resetDefaultState:pe,dispose:T,releaseStatesOfGeometry:A,releaseStatesOfProgram:K,initAttributes:C,enableAttribute:N,disableUnusedAttributes:I}}function OM(r,e,n,s){const a=s.isWebGL2;let l;function f(_){l=_}function u(_,y){r.drawArrays(l,_,y),n.update(y,l,1)}function h(_,y,v){if(v===0)return;let S,w;if(a)S=r,w="drawArraysInstanced";else if(S=e.get("ANGLE_instanced_arrays"),w="drawArraysInstancedANGLE",S===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}S[w](l,_,y,v),n.update(y,l,v)}function m(_,y,v){if(v===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let w=0;w<v;w++)this.render(_[w],y[w]);else{S.multiDrawArraysWEBGL(l,_,0,y,0,v);let w=0;for(let E=0;E<v;E++)w+=y[E];n.update(w,l,1)}}this.setMode=f,this.render=u,this.renderInstances=h,this.renderMultiDraw=m}function kM(r,e,n){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const F=e.get("EXT_texture_filter_anisotropic");s=r.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function l(F){if(F==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";F="mediump"}return F==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const f=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let u=n.precision!==void 0?n.precision:"highp";const h=l(u);h!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",h,"instead."),u=h);const m=f||e.has("WEBGL_draw_buffers"),_=n.logarithmicDepthBuffer===!0,y=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),v=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=r.getParameter(r.MAX_TEXTURE_SIZE),w=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),E=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),g=r.getParameter(r.MAX_VARYING_VECTORS),L=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),C=v>0,N=f||e.has("OES_texture_float"),j=C&&N,I=f?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:f,drawBuffers:m,getMaxAnisotropy:a,getMaxPrecision:l,precision:u,logarithmicDepthBuffer:_,maxTextures:y,maxVertexTextures:v,maxTextureSize:S,maxCubemapSize:w,maxAttributes:E,maxVertexUniforms:x,maxVaryings:g,maxFragmentUniforms:L,vertexTextures:C,floatFragmentTextures:N,floatVertexTextures:j,maxSamples:I}}function zM(r){const e=this;let n=null,s=0,a=!1,l=!1;const f=new Vr,u=new mt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(y,v){const S=y.length!==0||v||s!==0||a;return a=v,s=y.length,S},this.beginShadows=function(){l=!0,_(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(y,v){n=_(y,v,0)},this.setState=function(y,v,S){const w=y.clippingPlanes,E=y.clipIntersection,x=y.clipShadows,g=r.get(y);if(!a||w===null||w.length===0||l&&!x)l?_(null):m();else{const L=l?0:s,C=L*4;let N=g.clippingState||null;h.value=N,N=_(w,v,C,S);for(let j=0;j!==C;++j)N[j]=n[j];g.clippingState=N,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=L}};function m(){h.value!==n&&(h.value=n,h.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function _(y,v,S,w){const E=y!==null?y.length:0;let x=null;if(E!==0){if(x=h.value,w!==!0||x===null){const g=S+E*4,L=v.matrixWorldInverse;u.getNormalMatrix(L),(x===null||x.length<g)&&(x=new Float32Array(g));for(let C=0,N=S;C!==E;++C,N+=4)f.copy(y[C]).applyMatrix4(L,u),f.normal.toArray(x,N),x[N+3]=f.constant}h.value=x,h.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,x}}function BM(r){let e=new WeakMap;function n(f,u){return u===gf?f.mapping=Ws:u===vf&&(f.mapping=js),f}function s(f){if(f&&f.isTexture){const u=f.mapping;if(u===gf||u===vf)if(e.has(f)){const h=e.get(f).texture;return n(h,f.mapping)}else{const h=f.image;if(h&&h.height>0){const m=new Q0(h.height/2);return m.fromEquirectangularTexture(r,f),e.set(f,m),f.addEventListener("dispose",a),n(m.texture,f.mapping)}else return null}}return f}function a(f){const u=f.target;u.removeEventListener("dispose",a);const h=e.get(u);h!==void 0&&(e.delete(u),h.dispose())}function l(){e=new WeakMap}return{get:s,dispose:l}}class Pg extends Ag{constructor(e=-1,n=1,s=1,a=-1,l=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=s,this.bottom=a,this.near=l,this.far=f,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,s,a,l,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=s,this.view.offsetY=a,this.view.width=l,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=s-e,f=s+e,u=a+n,h=a-n;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=m*this.view.offsetX,f=l+m*this.view.width,u-=_*this.view.offsetY,h=u-_*this.view.height}this.projectionMatrix.makeOrthographic(l,f,u,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const zs=4,ym=[.125,.215,.35,.446,.526,.582],Xr=20,sf=new Pg,Sm=new Mt;let of=null,af=0,lf=0;const Wr=(1+Math.sqrt(5))/2,Fs=1/Wr,Mm=[new se(1,1,1),new se(-1,1,1),new se(1,1,-1),new se(-1,1,-1),new se(0,Wr,Fs),new se(0,Wr,-Fs),new se(Fs,0,Wr),new se(-Fs,0,Wr),new se(Wr,Fs,0),new se(-Wr,Fs,0)];class Em{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,s=.1,a=100){of=this._renderer.getRenderTarget(),af=this._renderer.getActiveCubeFace(),lf=this._renderer.getActiveMipmapLevel(),this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,s,a,l),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Am(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(of,af,lf),e.scissorTest=!1,wl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ws||e.mapping===js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),of=this._renderer.getRenderTarget(),af=this._renderer.getActiveCubeFace(),lf=this._renderer.getActiveMipmapLevel();const s=n||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,s={magFilter:Kn,minFilter:Kn,generateMipmaps:!1,type:Wo,format:hi,colorSpace:Vi,depthBuffer:!1},a=wm(e,n,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wm(e,n,s);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=HM(l)),this._blurMaterial=GM(l,e,n)}return a}_compileMaterial(e){const n=new Si(this._lodPlanes[0],e);this._renderer.compile(n,sf)}_sceneToCubeUV(e,n,s,a){const u=new Zn(90,1,n,s),h=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],_=this._renderer,y=_.autoClear,v=_.toneMapping;_.getClearColor(Sm),_.toneMapping=Sr,_.autoClear=!1;const S=new Bl({name:"PMREM.Background",side:Un,depthWrite:!1,depthTest:!1}),w=new Si(new $o,S);let E=!1;const x=e.background;x?x.isColor&&(S.color.copy(x),e.background=null,E=!0):(S.color.copy(Sm),E=!0);for(let g=0;g<6;g++){const L=g%3;L===0?(u.up.set(0,h[g],0),u.lookAt(m[g],0,0)):L===1?(u.up.set(0,0,h[g]),u.lookAt(0,m[g],0)):(u.up.set(0,h[g],0),u.lookAt(0,0,m[g]));const C=this._cubeSize;wl(a,L*C,g>2?C:0,C,C),_.setRenderTarget(a),E&&_.render(w,u),_.render(e,u)}w.geometry.dispose(),w.material.dispose(),_.toneMapping=v,_.autoClear=y,e.background=x}_textureToCubeUV(e,n){const s=this._renderer,a=e.mapping===Ws||e.mapping===js;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Am()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tm());const l=a?this._cubemapMaterial:this._equirectMaterial,f=new Si(this._lodPlanes[0],l),u=l.uniforms;u.envMap.value=e;const h=this._cubeSize;wl(n,0,0,3*h,2*h),s.setRenderTarget(n),s.render(f,sf)}_applyPMREM(e){const n=this._renderer,s=n.autoClear;n.autoClear=!1;for(let a=1;a<this._lodPlanes.length;a++){const l=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),f=Mm[(a-1)%Mm.length];this._blur(e,a-1,a,l,f)}n.autoClear=s}_blur(e,n,s,a,l){const f=this._pingPongRenderTarget;this._halfBlur(e,f,n,s,a,"latitudinal",l),this._halfBlur(f,e,s,s,a,"longitudinal",l)}_halfBlur(e,n,s,a,l,f,u){const h=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const _=3,y=new Si(this._lodPlanes[a],m),v=m.uniforms,S=this._sizeLods[s]-1,w=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*Xr-1),E=l/w,x=isFinite(l)?1+Math.floor(_*E):Xr;x>Xr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Xr}`);const g=[];let L=0;for(let F=0;F<Xr;++F){const fe=F/E,T=Math.exp(-fe*fe/2);g.push(T),F===0?L+=T:F<x&&(L+=2*T)}for(let F=0;F<g.length;F++)g[F]=g[F]/L;v.envMap.value=e.texture,v.samples.value=x,v.weights.value=g,v.latitudinal.value=f==="latitudinal",u&&(v.poleAxis.value=u);const{_lodMax:C}=this;v.dTheta.value=w,v.mipInt.value=C-s;const N=this._sizeLods[a],j=3*N*(a>C-zs?a-C+zs:0),I=4*(this._cubeSize-N);wl(n,j,I,3*N,2*N),h.setRenderTarget(n),h.render(y,sf)}}function HM(r){const e=[],n=[],s=[];let a=r;const l=r-zs+1+ym.length;for(let f=0;f<l;f++){const u=Math.pow(2,a);n.push(u);let h=1/u;f>r-zs?h=ym[f-r+zs-1]:f===0&&(h=0),s.push(h);const m=1/(u-2),_=-m,y=1+m,v=[_,_,y,_,y,y,_,_,y,y,_,y],S=6,w=6,E=3,x=2,g=1,L=new Float32Array(E*w*S),C=new Float32Array(x*w*S),N=new Float32Array(g*w*S);for(let I=0;I<S;I++){const F=I%3*2/3-1,fe=I>2?0:-1,T=[F,fe,0,F+2/3,fe,0,F+2/3,fe+1,0,F,fe,0,F+2/3,fe+1,0,F,fe+1,0];L.set(T,E*w*I),C.set(v,x*w*I);const A=[I,I,I,I,I,I];N.set(A,g*w*I)}const j=new ti;j.setAttribute("position",new ei(L,E)),j.setAttribute("uv",new ei(C,x)),j.setAttribute("faceIndex",new ei(N,g)),e.push(j),a>zs&&a--}return{lodPlanes:e,sizeLods:n,sigmas:s}}function wm(r,e,n){const s=new Kr(r,e,n);return s.texture.mapping=Gl,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function wl(r,e,n,s,a){r.viewport.set(e,n,s,a),r.scissor.set(e,n,s,a)}function GM(r,e,n){const s=new Float32Array(Xr),a=new se(0,1,0);return new Zr({name:"SphericalGaussianBlur",defines:{n:Xr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Nf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:yr,depthTest:!1,depthWrite:!1})}function Tm(){return new Zr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yr,depthTest:!1,depthWrite:!1})}function Am(){return new Zr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yr,depthTest:!1,depthWrite:!1})}function Nf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function VM(r){let e=new WeakMap,n=null;function s(u){if(u&&u.isTexture){const h=u.mapping,m=h===gf||h===vf,_=h===Ws||h===js;if(m||_)if(u.isRenderTargetTexture&&u.needsPMREMUpdate===!0){u.needsPMREMUpdate=!1;let y=e.get(u);return n===null&&(n=new Em(r)),y=m?n.fromEquirectangular(u,y):n.fromCubemap(u,y),e.set(u,y),y.texture}else{if(e.has(u))return e.get(u).texture;{const y=u.image;if(m&&y&&y.height>0||_&&y&&a(y)){n===null&&(n=new Em(r));const v=m?n.fromEquirectangular(u):n.fromCubemap(u);return e.set(u,v),u.addEventListener("dispose",l),v.texture}else return null}}}return u}function a(u){let h=0;const m=6;for(let _=0;_<m;_++)u[_]!==void 0&&h++;return h===m}function l(u){const h=u.target;h.removeEventListener("dispose",l);const m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function f(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function WM(r){const e={};function n(s){if(e[s]!==void 0)return e[s];let a;switch(s){case"WEBGL_depth_texture":a=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=r.getExtension(s)}return e[s]=a,a}return{has:function(s){return n(s)!==null},init:function(s){s.isWebGL2?(n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance")):(n("WEBGL_depth_texture"),n("OES_texture_float"),n("OES_texture_half_float"),n("OES_texture_half_float_linear"),n("OES_standard_derivatives"),n("OES_element_index_uint"),n("OES_vertex_array_object"),n("ANGLE_instanced_arrays")),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture")},get:function(s){const a=n(s);return a===null&&console.warn("THREE.WebGLRenderer: "+s+" extension not supported."),a}}}function jM(r,e,n,s){const a={},l=new WeakMap;function f(y){const v=y.target;v.index!==null&&e.remove(v.index);for(const w in v.attributes)e.remove(v.attributes[w]);for(const w in v.morphAttributes){const E=v.morphAttributes[w];for(let x=0,g=E.length;x<g;x++)e.remove(E[x])}v.removeEventListener("dispose",f),delete a[v.id];const S=l.get(v);S&&(e.remove(S),l.delete(v)),s.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,n.memory.geometries--}function u(y,v){return a[v.id]===!0||(v.addEventListener("dispose",f),a[v.id]=!0,n.memory.geometries++),v}function h(y){const v=y.attributes;for(const w in v)e.update(v[w],r.ARRAY_BUFFER);const S=y.morphAttributes;for(const w in S){const E=S[w];for(let x=0,g=E.length;x<g;x++)e.update(E[x],r.ARRAY_BUFFER)}}function m(y){const v=[],S=y.index,w=y.attributes.position;let E=0;if(S!==null){const L=S.array;E=S.version;for(let C=0,N=L.length;C<N;C+=3){const j=L[C+0],I=L[C+1],F=L[C+2];v.push(j,I,I,F,F,j)}}else if(w!==void 0){const L=w.array;E=w.version;for(let C=0,N=L.length/3-1;C<N;C+=3){const j=C+0,I=C+1,F=C+2;v.push(j,I,I,F,F,j)}}else return;const x=new(vg(v)?wg:Eg)(v,1);x.version=E;const g=l.get(y);g&&e.remove(g),l.set(y,x)}function _(y){const v=l.get(y);if(v){const S=y.index;S!==null&&v.version<S.version&&m(y)}else m(y);return l.get(y)}return{get:u,update:h,getWireframeAttribute:_}}function XM(r,e,n,s){const a=s.isWebGL2;let l;function f(S){l=S}let u,h;function m(S){u=S.type,h=S.bytesPerElement}function _(S,w){r.drawElements(l,w,u,S*h),n.update(w,l,1)}function y(S,w,E){if(E===0)return;let x,g;if(a)x=r,g="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),g="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[g](l,w,u,S*h,E),n.update(w,l,E)}function v(S,w,E){if(E===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let g=0;g<E;g++)this.render(S[g]/h,w[g]);else{x.multiDrawElementsWEBGL(l,w,0,u,S,0,E);let g=0;for(let L=0;L<E;L++)g+=w[L];n.update(g,l,1)}}this.setMode=f,this.setIndex=m,this.render=_,this.renderInstances=y,this.renderMultiDraw=v}function qM(r){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function s(l,f,u){switch(n.calls++,f){case r.TRIANGLES:n.triangles+=u*(l/3);break;case r.LINES:n.lines+=u*(l/2);break;case r.LINE_STRIP:n.lines+=u*(l-1);break;case r.LINE_LOOP:n.lines+=u*l;break;case r.POINTS:n.points+=u*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:s}}function YM(r,e){return r[0]-e[0]}function $M(r,e){return Math.abs(e[1])-Math.abs(r[1])}function KM(r,e,n){const s={},a=new Float32Array(8),l=new WeakMap,f=new cn,u=[];for(let m=0;m<8;m++)u[m]=[m,0];function h(m,_,y){const v=m.morphTargetInfluences;if(e.isWebGL2===!0){const w=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,E=w!==void 0?w.length:0;let x=l.get(_);if(x===void 0||x.count!==E){let te=function(){pe.dispose(),l.delete(_),_.removeEventListener("dispose",te)};var S=te;x!==void 0&&x.texture.dispose();const C=_.morphAttributes.position!==void 0,N=_.morphAttributes.normal!==void 0,j=_.morphAttributes.color!==void 0,I=_.morphAttributes.position||[],F=_.morphAttributes.normal||[],fe=_.morphAttributes.color||[];let T=0;C===!0&&(T=1),N===!0&&(T=2),j===!0&&(T=3);let A=_.attributes.position.count*T,K=1;A>e.maxTextureSize&&(K=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const $=new Float32Array(A*K*4*E),pe=new yg($,A,K,E);pe.type=xr,pe.needsUpdate=!0;const k=T*4;for(let re=0;re<E;re++){const le=I[re],V=F[re],z=fe[re],Y=A*K*4*re;for(let D=0;D<le.count;D++){const q=D*k;C===!0&&(f.fromBufferAttribute(le,D),$[Y+q+0]=f.x,$[Y+q+1]=f.y,$[Y+q+2]=f.z,$[Y+q+3]=0),N===!0&&(f.fromBufferAttribute(V,D),$[Y+q+4]=f.x,$[Y+q+5]=f.y,$[Y+q+6]=f.z,$[Y+q+7]=0),j===!0&&(f.fromBufferAttribute(z,D),$[Y+q+8]=f.x,$[Y+q+9]=f.y,$[Y+q+10]=f.z,$[Y+q+11]=z.itemSize===4?f.w:1)}}x={count:E,texture:pe,size:new bt(A,K)},l.set(_,x),_.addEventListener("dispose",te)}let g=0;for(let C=0;C<v.length;C++)g+=v[C];const L=_.morphTargetsRelative?1:1-g;y.getUniforms().setValue(r,"morphTargetBaseInfluence",L),y.getUniforms().setValue(r,"morphTargetInfluences",v),y.getUniforms().setValue(r,"morphTargetsTexture",x.texture,n),y.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}else{const w=v===void 0?0:v.length;let E=s[_.id];if(E===void 0||E.length!==w){E=[];for(let N=0;N<w;N++)E[N]=[N,0];s[_.id]=E}for(let N=0;N<w;N++){const j=E[N];j[0]=N,j[1]=v[N]}E.sort($M);for(let N=0;N<8;N++)N<w&&E[N][1]?(u[N][0]=E[N][0],u[N][1]=E[N][1]):(u[N][0]=Number.MAX_SAFE_INTEGER,u[N][1]=0);u.sort(YM);const x=_.morphAttributes.position,g=_.morphAttributes.normal;let L=0;for(let N=0;N<8;N++){const j=u[N],I=j[0],F=j[1];I!==Number.MAX_SAFE_INTEGER&&F?(x&&_.getAttribute("morphTarget"+N)!==x[I]&&_.setAttribute("morphTarget"+N,x[I]),g&&_.getAttribute("morphNormal"+N)!==g[I]&&_.setAttribute("morphNormal"+N,g[I]),a[N]=F,L+=F):(x&&_.hasAttribute("morphTarget"+N)===!0&&_.deleteAttribute("morphTarget"+N),g&&_.hasAttribute("morphNormal"+N)===!0&&_.deleteAttribute("morphNormal"+N),a[N]=0)}const C=_.morphTargetsRelative?1:1-L;y.getUniforms().setValue(r,"morphTargetBaseInfluence",C),y.getUniforms().setValue(r,"morphTargetInfluences",a)}}return{update:h}}function ZM(r,e,n,s){let a=new WeakMap;function l(h){const m=s.render.frame,_=h.geometry,y=e.get(h,_);if(a.get(y)!==m&&(e.update(y),a.set(y,m)),h.isInstancedMesh&&(h.hasEventListener("dispose",u)===!1&&h.addEventListener("dispose",u),a.get(h)!==m&&(n.update(h.instanceMatrix,r.ARRAY_BUFFER),h.instanceColor!==null&&n.update(h.instanceColor,r.ARRAY_BUFFER),a.set(h,m))),h.isSkinnedMesh){const v=h.skeleton;a.get(v)!==m&&(v.update(),a.set(v,m))}return y}function f(){a=new WeakMap}function u(h){const m=h.target;m.removeEventListener("dispose",u),n.remove(m.instanceMatrix),m.instanceColor!==null&&n.remove(m.instanceColor)}return{update:l,dispose:f}}class Lg extends Hn{constructor(e,n,s,a,l,f,u,h,m,_){if(_=_!==void 0?_:Yr,_!==Yr&&_!==Xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&_===Yr&&(s=_r),s===void 0&&_===Xs&&(s=qr),super(null,a,l,f,u,h,_,s,m),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=u!==void 0?u:Mn,this.minFilter=h!==void 0?h:Mn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Ng=new Hn,Dg=new Lg(1,1);Dg.compareFunction=gg;const Ug=new yg,Ig=new I0,Fg=new bg,bm=[],Cm=[],Rm=new Float32Array(16),Pm=new Float32Array(9),Lm=new Float32Array(4);function Zs(r,e,n){const s=r[0];if(s<=0||s>0)return r;const a=e*n;let l=bm[a];if(l===void 0&&(l=new Float32Array(a),bm[a]=l),e!==0){s.toArray(l,0);for(let f=1,u=0;f!==e;++f)u+=n,r[f].toArray(l,u)}return l}function Qt(r,e){if(r.length!==e.length)return!1;for(let n=0,s=r.length;n<s;n++)if(r[n]!==e[n])return!1;return!0}function Jt(r,e){for(let n=0,s=e.length;n<s;n++)r[n]=e[n]}function jl(r,e){let n=Cm[e];n===void 0&&(n=new Int32Array(e),Cm[e]=n);for(let s=0;s!==e;++s)n[s]=r.allocateTextureUnit();return n}function QM(r,e){const n=this.cache;n[0]!==e&&(r.uniform1f(this.addr,e),n[0]=e)}function JM(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Qt(n,e))return;r.uniform2fv(this.addr,e),Jt(n,e)}}function eE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Qt(n,e))return;r.uniform3fv(this.addr,e),Jt(n,e)}}function tE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Qt(n,e))return;r.uniform4fv(this.addr,e),Jt(n,e)}}function nE(r,e){const n=this.cache,s=e.elements;if(s===void 0){if(Qt(n,e))return;r.uniformMatrix2fv(this.addr,!1,e),Jt(n,e)}else{if(Qt(n,s))return;Lm.set(s),r.uniformMatrix2fv(this.addr,!1,Lm),Jt(n,s)}}function iE(r,e){const n=this.cache,s=e.elements;if(s===void 0){if(Qt(n,e))return;r.uniformMatrix3fv(this.addr,!1,e),Jt(n,e)}else{if(Qt(n,s))return;Pm.set(s),r.uniformMatrix3fv(this.addr,!1,Pm),Jt(n,s)}}function rE(r,e){const n=this.cache,s=e.elements;if(s===void 0){if(Qt(n,e))return;r.uniformMatrix4fv(this.addr,!1,e),Jt(n,e)}else{if(Qt(n,s))return;Rm.set(s),r.uniformMatrix4fv(this.addr,!1,Rm),Jt(n,s)}}function sE(r,e){const n=this.cache;n[0]!==e&&(r.uniform1i(this.addr,e),n[0]=e)}function oE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Qt(n,e))return;r.uniform2iv(this.addr,e),Jt(n,e)}}function aE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Qt(n,e))return;r.uniform3iv(this.addr,e),Jt(n,e)}}function lE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Qt(n,e))return;r.uniform4iv(this.addr,e),Jt(n,e)}}function cE(r,e){const n=this.cache;n[0]!==e&&(r.uniform1ui(this.addr,e),n[0]=e)}function uE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Qt(n,e))return;r.uniform2uiv(this.addr,e),Jt(n,e)}}function fE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Qt(n,e))return;r.uniform3uiv(this.addr,e),Jt(n,e)}}function dE(r,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Qt(n,e))return;r.uniform4uiv(this.addr,e),Jt(n,e)}}function hE(r,e,n){const s=this.cache,a=n.allocateTextureUnit();s[0]!==a&&(r.uniform1i(this.addr,a),s[0]=a);const l=this.type===r.SAMPLER_2D_SHADOW?Dg:Ng;n.setTexture2D(e||l,a)}function pE(r,e,n){const s=this.cache,a=n.allocateTextureUnit();s[0]!==a&&(r.uniform1i(this.addr,a),s[0]=a),n.setTexture3D(e||Ig,a)}function mE(r,e,n){const s=this.cache,a=n.allocateTextureUnit();s[0]!==a&&(r.uniform1i(this.addr,a),s[0]=a),n.setTextureCube(e||Fg,a)}function gE(r,e,n){const s=this.cache,a=n.allocateTextureUnit();s[0]!==a&&(r.uniform1i(this.addr,a),s[0]=a),n.setTexture2DArray(e||Ug,a)}function vE(r){switch(r){case 5126:return QM;case 35664:return JM;case 35665:return eE;case 35666:return tE;case 35674:return nE;case 35675:return iE;case 35676:return rE;case 5124:case 35670:return sE;case 35667:case 35671:return oE;case 35668:case 35672:return aE;case 35669:case 35673:return lE;case 5125:return cE;case 36294:return uE;case 36295:return fE;case 36296:return dE;case 35678:case 36198:case 36298:case 36306:case 35682:return hE;case 35679:case 36299:case 36307:return pE;case 35680:case 36300:case 36308:case 36293:return mE;case 36289:case 36303:case 36311:case 36292:return gE}}function _E(r,e){r.uniform1fv(this.addr,e)}function xE(r,e){const n=Zs(e,this.size,2);r.uniform2fv(this.addr,n)}function yE(r,e){const n=Zs(e,this.size,3);r.uniform3fv(this.addr,n)}function SE(r,e){const n=Zs(e,this.size,4);r.uniform4fv(this.addr,n)}function ME(r,e){const n=Zs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function EE(r,e){const n=Zs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function wE(r,e){const n=Zs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function TE(r,e){r.uniform1iv(this.addr,e)}function AE(r,e){r.uniform2iv(this.addr,e)}function bE(r,e){r.uniform3iv(this.addr,e)}function CE(r,e){r.uniform4iv(this.addr,e)}function RE(r,e){r.uniform1uiv(this.addr,e)}function PE(r,e){r.uniform2uiv(this.addr,e)}function LE(r,e){r.uniform3uiv(this.addr,e)}function NE(r,e){r.uniform4uiv(this.addr,e)}function DE(r,e,n){const s=this.cache,a=e.length,l=jl(n,a);Qt(s,l)||(r.uniform1iv(this.addr,l),Jt(s,l));for(let f=0;f!==a;++f)n.setTexture2D(e[f]||Ng,l[f])}function UE(r,e,n){const s=this.cache,a=e.length,l=jl(n,a);Qt(s,l)||(r.uniform1iv(this.addr,l),Jt(s,l));for(let f=0;f!==a;++f)n.setTexture3D(e[f]||Ig,l[f])}function IE(r,e,n){const s=this.cache,a=e.length,l=jl(n,a);Qt(s,l)||(r.uniform1iv(this.addr,l),Jt(s,l));for(let f=0;f!==a;++f)n.setTextureCube(e[f]||Fg,l[f])}function FE(r,e,n){const s=this.cache,a=e.length,l=jl(n,a);Qt(s,l)||(r.uniform1iv(this.addr,l),Jt(s,l));for(let f=0;f!==a;++f)n.setTexture2DArray(e[f]||Ug,l[f])}function OE(r){switch(r){case 5126:return _E;case 35664:return xE;case 35665:return yE;case 35666:return SE;case 35674:return ME;case 35675:return EE;case 35676:return wE;case 5124:case 35670:return TE;case 35667:case 35671:return AE;case 35668:case 35672:return bE;case 35669:case 35673:return CE;case 5125:return RE;case 36294:return PE;case 36295:return LE;case 36296:return NE;case 35678:case 36198:case 36298:case 36306:case 35682:return DE;case 35679:case 36299:case 36307:return UE;case 35680:case 36300:case 36308:case 36293:return IE;case 36289:case 36303:case 36311:case 36292:return FE}}class kE{constructor(e,n,s){this.id=e,this.addr=s,this.cache=[],this.type=n.type,this.setValue=vE(n.type)}}class zE{constructor(e,n,s){this.id=e,this.addr=s,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=OE(n.type)}}class BE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,s){const a=this.seq;for(let l=0,f=a.length;l!==f;++l){const u=a[l];u.setValue(e,n[u.id],s)}}}const cf=/(\w+)(\])?(\[|\.)?/g;function Nm(r,e){r.seq.push(e),r.map[e.id]=e}function HE(r,e,n){const s=r.name,a=s.length;for(cf.lastIndex=0;;){const l=cf.exec(s),f=cf.lastIndex;let u=l[1];const h=l[2]==="]",m=l[3];if(h&&(u=u|0),m===void 0||m==="["&&f+2===a){Nm(n,m===void 0?new kE(u,r,e):new zE(u,r,e));break}else{let y=n.map[u];y===void 0&&(y=new BE(u),Nm(n,y)),n=y}}}class Dl{constructor(e,n){this.seq=[],this.map={};const s=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<s;++a){const l=e.getActiveUniform(n,a),f=e.getUniformLocation(n,l.name);HE(l,f,this)}}setValue(e,n,s,a){const l=this.map[n];l!==void 0&&l.setValue(e,s,a)}setOptional(e,n,s){const a=n[s];a!==void 0&&this.setValue(e,s,a)}static upload(e,n,s,a){for(let l=0,f=n.length;l!==f;++l){const u=n[l],h=s[u.id];h.needsUpdate!==!1&&u.setValue(e,h.value,a)}}static seqWithValue(e,n){const s=[];for(let a=0,l=e.length;a!==l;++a){const f=e[a];f.id in n&&s.push(f)}return s}}function Dm(r,e,n){const s=r.createShader(e);return r.shaderSource(s,n),r.compileShader(s),s}const GE=37297;let VE=0;function WE(r,e){const n=r.split(`
`),s=[],a=Math.max(e-6,0),l=Math.min(e+6,n.length);for(let f=a;f<l;f++){const u=f+1;s.push(`${u===e?">":" "} ${u}: ${n[f]}`)}return s.join(`
`)}function jE(r){const e=At.getPrimaries(At.workingColorSpace),n=At.getPrimaries(r);let s;switch(e===n?s="":e===Ol&&n===Fl?s="LinearDisplayP3ToLinearSRGB":e===Fl&&n===Ol&&(s="LinearSRGBToLinearDisplayP3"),r){case Vi:case Vl:return[s,"LinearTransferOETF"];case ln:case Rf:return[s,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[s,"LinearTransferOETF"]}}function Um(r,e,n){const s=r.getShaderParameter(e,r.COMPILE_STATUS),a=r.getShaderInfoLog(e).trim();if(s&&a==="")return"";const l=/ERROR: 0:(\d+)/.exec(a);if(l){const f=parseInt(l[1]);return n.toUpperCase()+`

`+a+`

`+WE(r.getShaderSource(e),f)}else return a}function XE(r,e){const n=jE(e);return`vec4 ${r}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function qE(r,e){let n;switch(e){case i0:n="Linear";break;case r0:n="Reinhard";break;case s0:n="OptimizedCineon";break;case o0:n="ACESFilmic";break;case l0:n="AgX";break;case a0:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function YE(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Bs).join(`
`)}function $E(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Bs).join(`
`)}function KE(r){const e=[];for(const n in r){const s=r[n];s!==!1&&e.push("#define "+n+" "+s)}return e.join(`
`)}function ZE(r,e){const n={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let a=0;a<s;a++){const l=r.getActiveAttrib(e,a),f=l.name;let u=1;l.type===r.FLOAT_MAT2&&(u=2),l.type===r.FLOAT_MAT3&&(u=3),l.type===r.FLOAT_MAT4&&(u=4),n[f]={type:l.type,location:r.getAttribLocation(e,f),locationSize:u}}return n}function Bs(r){return r!==""}function Im(r,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fm(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const QE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ef(r){return r.replace(QE,ew)}const JE=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ew(r,e){let n=ht[e];if(n===void 0){const s=JE.get(e);if(s!==void 0)n=ht[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Ef(n)}const tw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Om(r){return r.replace(tw,nw)}function nw(r,e,n,s){let a="";for(let l=parseInt(e);l<parseInt(n);l++)a+=s.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function km(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function iw(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===sg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Lx?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Bi&&(e="SHADOWMAP_TYPE_VSM"),e}function rw(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Ws:case js:e="ENVMAP_TYPE_CUBE";break;case Gl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function sw(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case js:e="ENVMAP_MODE_REFRACTION";break}return e}function ow(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case og:e="ENVMAP_BLENDING_MULTIPLY";break;case t0:e="ENVMAP_BLENDING_MIX";break;case n0:e="ENVMAP_BLENDING_ADD";break}return e}function aw(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:s,maxMip:n}}function lw(r,e,n,s){const a=r.getContext(),l=n.defines;let f=n.vertexShader,u=n.fragmentShader;const h=iw(n),m=rw(n),_=sw(n),y=ow(n),v=aw(n),S=n.isWebGL2?"":YE(n),w=$E(n),E=KE(l),x=a.createProgram();let g,L,C=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(Bs).join(`
`),g.length>0&&(g+=`
`),L=[S,"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(Bs).join(`
`),L.length>0&&(L+=`
`)):(g=[km(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+_:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors&&n.isWebGL2?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0&&n.isWebGL2?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bs).join(`
`),L=[S,km(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.envMap?"#define "+_:"",n.envMap?"#define "+y:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+h:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.useLegacyLights?"#define LEGACY_LIGHTS":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.logarithmicDepthBuffer&&n.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Sr?"#define TONE_MAPPING":"",n.toneMapping!==Sr?ht.tonemapping_pars_fragment:"",n.toneMapping!==Sr?qE("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,XE("linearToOutputTexel",n.outputColorSpace),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Bs).join(`
`)),f=Ef(f),f=Im(f,n),f=Fm(f,n),u=Ef(u),u=Im(u,n),u=Fm(u,n),f=Om(f),u=Om(u),n.isWebGL2&&n.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,g=[w,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,L=["precision mediump sampler2DArray;","#define varying in",n.glslVersion===nm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===nm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+L);const N=C+g+f,j=C+L+u,I=Dm(a,a.VERTEX_SHADER,N),F=Dm(a,a.FRAGMENT_SHADER,j);a.attachShader(x,I),a.attachShader(x,F),n.index0AttributeName!==void 0?a.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(x,0,"position"),a.linkProgram(x);function fe($){if(r.debug.checkShaderErrors){const pe=a.getProgramInfoLog(x).trim(),k=a.getShaderInfoLog(I).trim(),te=a.getShaderInfoLog(F).trim();let re=!0,le=!0;if(a.getProgramParameter(x,a.LINK_STATUS)===!1)if(re=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(a,x,I,F);else{const V=Um(a,I,"vertex"),z=Um(a,F,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(x,a.VALIDATE_STATUS)+`

Program Info Log: `+pe+`
`+V+`
`+z)}else pe!==""?console.warn("THREE.WebGLProgram: Program Info Log:",pe):(k===""||te==="")&&(le=!1);le&&($.diagnostics={runnable:re,programLog:pe,vertexShader:{log:k,prefix:g},fragmentShader:{log:te,prefix:L}})}a.deleteShader(I),a.deleteShader(F),T=new Dl(a,x),A=ZE(a,x)}let T;this.getUniforms=function(){return T===void 0&&fe(this),T};let A;this.getAttributes=function(){return A===void 0&&fe(this),A};let K=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return K===!1&&(K=a.getProgramParameter(x,GE)),K},this.destroy=function(){s.releaseStatesOfProgram(this),a.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=VE++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=I,this.fragmentShader=F,this}let cw=0;class uw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,s=e.fragmentShader,a=this._getShaderStage(n),l=this._getShaderStage(s),f=this._getShaderCacheForMaterial(e);return f.has(a)===!1&&(f.add(a),a.usedTimes++),f.has(l)===!1&&(f.add(l),l.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const s of n)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let s=n.get(e);return s===void 0&&(s=new Set,n.set(e,s)),s}_getShaderStage(e){const n=this.shaderCache;let s=n.get(e);return s===void 0&&(s=new fw(e),n.set(e,s)),s}}class fw{constructor(e){this.id=cw++,this.code=e,this.usedTimes=0}}function dw(r,e,n,s,a,l,f){const u=new Sg,h=new uw,m=[],_=a.isWebGL2,y=a.logarithmicDepthBuffer,v=a.vertexTextures;let S=a.precision;const w={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(T){return T===0?"uv":`uv${T}`}function x(T,A,K,$,pe){const k=$.fog,te=pe.geometry,re=T.isMeshStandardMaterial?$.environment:null,le=(T.isMeshStandardMaterial?n:e).get(T.envMap||re),V=le&&le.mapping===Gl?le.image.height:null,z=w[T.type];T.precision!==null&&(S=a.getMaxPrecision(T.precision),S!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",S,"instead."));const Y=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,D=Y!==void 0?Y.length:0;let q=0;te.morphAttributes.position!==void 0&&(q=1),te.morphAttributes.normal!==void 0&&(q=2),te.morphAttributes.color!==void 0&&(q=3);let Z,ue,ge,Ee;if(z){const en=yi[z];Z=en.vertexShader,ue=en.fragmentShader}else Z=T.vertexShader,ue=T.fragmentShader,h.update(T),ge=h.getVertexShaderID(T),Ee=h.getFragmentShaderID(T);const be=r.getRenderTarget(),Ce=pe.isInstancedMesh===!0,Ie=pe.isBatchedMesh===!0,He=!!T.map,Ge=!!T.matcap,Q=!!le,Lt=!!T.aoMap,qe=!!T.lightMap,Fe=!!T.bumpMap,Be=!!T.normalMap,St=!!T.displacementMap,st=!!T.emissiveMap,P=!!T.metalnessMap,b=!!T.roughnessMap,ne=T.anisotropy>0,ye=T.clearcoat>0,xe=T.iridescence>0,Me=T.sheen>0,H=T.transmission>0,X=ne&&!!T.anisotropyMap,he=ye&&!!T.clearcoatMap,Te=ye&&!!T.clearcoatNormalMap,we=ye&&!!T.clearcoatRoughnessMap,me=xe&&!!T.iridescenceMap,lt=xe&&!!T.iridescenceThicknessMap,Ke=Me&&!!T.sheenColorMap,Ze=Me&&!!T.sheenRoughnessMap,Ye=!!T.specularMap,We=!!T.specularColorMap,ot=!!T.specularIntensityMap,vt=H&&!!T.transmissionMap,Ct=H&&!!T.thicknessMap,ct=!!T.gradientMap,Re=!!T.alphaMap,G=T.alphaTest>0,Pe=!!T.alphaHash,Ne=!!T.extensions,nt=!!te.attributes.uv1,Qe=!!te.attributes.uv2,Et=!!te.attributes.uv3;let wt=Sr;return T.toneMapped&&(be===null||be.isXRRenderTarget===!0)&&(wt=r.toneMapping),{isWebGL2:_,shaderID:z,shaderType:T.type,shaderName:T.name,vertexShader:Z,fragmentShader:ue,defines:T.defines,customVertexShaderID:ge,customFragmentShaderID:Ee,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:S,batching:Ie,instancing:Ce,instancingColor:Ce&&pe.instanceColor!==null,supportsVertexTextures:v,outputColorSpace:be===null?r.outputColorSpace:be.isXRRenderTarget===!0?be.texture.colorSpace:Vi,map:He,matcap:Ge,envMap:Q,envMapMode:Q&&le.mapping,envMapCubeUVHeight:V,aoMap:Lt,lightMap:qe,bumpMap:Fe,normalMap:Be,displacementMap:v&&St,emissiveMap:st,normalMapObjectSpace:Be&&T.normalMapType===S0,normalMapTangentSpace:Be&&T.normalMapType===y0,metalnessMap:P,roughnessMap:b,anisotropy:ne,anisotropyMap:X,clearcoat:ye,clearcoatMap:he,clearcoatNormalMap:Te,clearcoatRoughnessMap:we,iridescence:xe,iridescenceMap:me,iridescenceThicknessMap:lt,sheen:Me,sheenColorMap:Ke,sheenRoughnessMap:Ze,specularMap:Ye,specularColorMap:We,specularIntensityMap:ot,transmission:H,transmissionMap:vt,thicknessMap:Ct,gradientMap:ct,opaque:T.transparent===!1&&T.blending===Gs,alphaMap:Re,alphaTest:G,alphaHash:Pe,combine:T.combine,mapUv:He&&E(T.map.channel),aoMapUv:Lt&&E(T.aoMap.channel),lightMapUv:qe&&E(T.lightMap.channel),bumpMapUv:Fe&&E(T.bumpMap.channel),normalMapUv:Be&&E(T.normalMap.channel),displacementMapUv:St&&E(T.displacementMap.channel),emissiveMapUv:st&&E(T.emissiveMap.channel),metalnessMapUv:P&&E(T.metalnessMap.channel),roughnessMapUv:b&&E(T.roughnessMap.channel),anisotropyMapUv:X&&E(T.anisotropyMap.channel),clearcoatMapUv:he&&E(T.clearcoatMap.channel),clearcoatNormalMapUv:Te&&E(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&E(T.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&E(T.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&E(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ke&&E(T.sheenColorMap.channel),sheenRoughnessMapUv:Ze&&E(T.sheenRoughnessMap.channel),specularMapUv:Ye&&E(T.specularMap.channel),specularColorMapUv:We&&E(T.specularColorMap.channel),specularIntensityMapUv:ot&&E(T.specularIntensityMap.channel),transmissionMapUv:vt&&E(T.transmissionMap.channel),thicknessMapUv:Ct&&E(T.thicknessMap.channel),alphaMapUv:Re&&E(T.alphaMap.channel),vertexTangents:!!te.attributes.tangent&&(Be||ne),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,vertexUv1s:nt,vertexUv2s:Qe,vertexUv3s:Et,pointsUvs:pe.isPoints===!0&&!!te.attributes.uv&&(He||Re),fog:!!k,useFog:T.fog===!0,fogExp2:k&&k.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:y,skinning:pe.isSkinnedMesh===!0,morphTargets:te.morphAttributes.position!==void 0,morphNormals:te.morphAttributes.normal!==void 0,morphColors:te.morphAttributes.color!==void 0,morphTargetsCount:D,morphTextureStride:q,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&K.length>0,shadowMapType:r.shadowMap.type,toneMapping:wt,useLegacyLights:r._useLegacyLights,decodeVideoTexture:He&&T.map.isVideoTexture===!0&&At.getTransfer(T.map.colorSpace)===It,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Hi,flipSided:T.side===Un,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionDerivatives:Ne&&T.extensions.derivatives===!0,extensionFragDepth:Ne&&T.extensions.fragDepth===!0,extensionDrawBuffers:Ne&&T.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ne&&T.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ne&&T.extensions.clipCullDistance&&s.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:_||s.has("EXT_frag_depth"),rendererExtensionDrawBuffers:_||s.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:_||s.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()}}function g(T){const A=[];if(T.shaderID?A.push(T.shaderID):(A.push(T.customVertexShaderID),A.push(T.customFragmentShaderID)),T.defines!==void 0)for(const K in T.defines)A.push(K),A.push(T.defines[K]);return T.isRawShaderMaterial===!1&&(L(A,T),C(A,T),A.push(r.outputColorSpace)),A.push(T.customProgramCacheKey),A.join()}function L(T,A){T.push(A.precision),T.push(A.outputColorSpace),T.push(A.envMapMode),T.push(A.envMapCubeUVHeight),T.push(A.mapUv),T.push(A.alphaMapUv),T.push(A.lightMapUv),T.push(A.aoMapUv),T.push(A.bumpMapUv),T.push(A.normalMapUv),T.push(A.displacementMapUv),T.push(A.emissiveMapUv),T.push(A.metalnessMapUv),T.push(A.roughnessMapUv),T.push(A.anisotropyMapUv),T.push(A.clearcoatMapUv),T.push(A.clearcoatNormalMapUv),T.push(A.clearcoatRoughnessMapUv),T.push(A.iridescenceMapUv),T.push(A.iridescenceThicknessMapUv),T.push(A.sheenColorMapUv),T.push(A.sheenRoughnessMapUv),T.push(A.specularMapUv),T.push(A.specularColorMapUv),T.push(A.specularIntensityMapUv),T.push(A.transmissionMapUv),T.push(A.thicknessMapUv),T.push(A.combine),T.push(A.fogExp2),T.push(A.sizeAttenuation),T.push(A.morphTargetsCount),T.push(A.morphAttributeCount),T.push(A.numDirLights),T.push(A.numPointLights),T.push(A.numSpotLights),T.push(A.numSpotLightMaps),T.push(A.numHemiLights),T.push(A.numRectAreaLights),T.push(A.numDirLightShadows),T.push(A.numPointLightShadows),T.push(A.numSpotLightShadows),T.push(A.numSpotLightShadowsWithMaps),T.push(A.numLightProbes),T.push(A.shadowMapType),T.push(A.toneMapping),T.push(A.numClippingPlanes),T.push(A.numClipIntersection),T.push(A.depthPacking)}function C(T,A){u.disableAll(),A.isWebGL2&&u.enable(0),A.supportsVertexTextures&&u.enable(1),A.instancing&&u.enable(2),A.instancingColor&&u.enable(3),A.matcap&&u.enable(4),A.envMap&&u.enable(5),A.normalMapObjectSpace&&u.enable(6),A.normalMapTangentSpace&&u.enable(7),A.clearcoat&&u.enable(8),A.iridescence&&u.enable(9),A.alphaTest&&u.enable(10),A.vertexColors&&u.enable(11),A.vertexAlphas&&u.enable(12),A.vertexUv1s&&u.enable(13),A.vertexUv2s&&u.enable(14),A.vertexUv3s&&u.enable(15),A.vertexTangents&&u.enable(16),A.anisotropy&&u.enable(17),A.alphaHash&&u.enable(18),A.batching&&u.enable(19),T.push(u.mask),u.disableAll(),A.fog&&u.enable(0),A.useFog&&u.enable(1),A.flatShading&&u.enable(2),A.logarithmicDepthBuffer&&u.enable(3),A.skinning&&u.enable(4),A.morphTargets&&u.enable(5),A.morphNormals&&u.enable(6),A.morphColors&&u.enable(7),A.premultipliedAlpha&&u.enable(8),A.shadowMapEnabled&&u.enable(9),A.useLegacyLights&&u.enable(10),A.doubleSided&&u.enable(11),A.flipSided&&u.enable(12),A.useDepthPacking&&u.enable(13),A.dithering&&u.enable(14),A.transmission&&u.enable(15),A.sheen&&u.enable(16),A.opaque&&u.enable(17),A.pointsUvs&&u.enable(18),A.decodeVideoTexture&&u.enable(19),T.push(u.mask)}function N(T){const A=w[T.type];let K;if(A){const $=yi[A];K=Y0.clone($.uniforms)}else K=T.uniforms;return K}function j(T,A){let K;for(let $=0,pe=m.length;$<pe;$++){const k=m[$];if(k.cacheKey===A){K=k,++K.usedTimes;break}}return K===void 0&&(K=new lw(r,A,T,l),m.push(K)),K}function I(T){if(--T.usedTimes===0){const A=m.indexOf(T);m[A]=m[m.length-1],m.pop(),T.destroy()}}function F(T){h.remove(T)}function fe(){h.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:N,acquireProgram:j,releaseProgram:I,releaseShaderCache:F,programs:m,dispose:fe}}function hw(){let r=new WeakMap;function e(l){let f=r.get(l);return f===void 0&&(f={},r.set(l,f)),f}function n(l){r.delete(l)}function s(l,f,u){r.get(l)[f]=u}function a(){r=new WeakMap}return{get:e,remove:n,update:s,dispose:a}}function pw(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function zm(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Bm(){const r=[];let e=0;const n=[],s=[],a=[];function l(){e=0,n.length=0,s.length=0,a.length=0}function f(y,v,S,w,E,x){let g=r[e];return g===void 0?(g={id:y.id,object:y,geometry:v,material:S,groupOrder:w,renderOrder:y.renderOrder,z:E,group:x},r[e]=g):(g.id=y.id,g.object=y,g.geometry=v,g.material=S,g.groupOrder=w,g.renderOrder=y.renderOrder,g.z=E,g.group=x),e++,g}function u(y,v,S,w,E,x){const g=f(y,v,S,w,E,x);S.transmission>0?s.push(g):S.transparent===!0?a.push(g):n.push(g)}function h(y,v,S,w,E,x){const g=f(y,v,S,w,E,x);S.transmission>0?s.unshift(g):S.transparent===!0?a.unshift(g):n.unshift(g)}function m(y,v){n.length>1&&n.sort(y||pw),s.length>1&&s.sort(v||zm),a.length>1&&a.sort(v||zm)}function _(){for(let y=e,v=r.length;y<v;y++){const S=r[y];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:n,transmissive:s,transparent:a,init:l,push:u,unshift:h,finish:_,sort:m}}function mw(){let r=new WeakMap;function e(s,a){const l=r.get(s);let f;return l===void 0?(f=new Bm,r.set(s,[f])):a>=l.length?(f=new Bm,l.push(f)):f=l[a],f}function n(){r=new WeakMap}return{get:e,dispose:n}}function gw(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new se,color:new Mt};break;case"SpotLight":n={position:new se,direction:new se,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new se,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new se,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":n={color:new Mt,position:new se,halfWidth:new se,halfHeight:new se};break}return r[e.id]=n,n}}}function vw(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":n={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=n,n}}}let _w=0;function xw(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function yw(r,e){const n=new gw,s=vw(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let _=0;_<9;_++)a.probe.push(new se);const l=new se,f=new Zt,u=new Zt;function h(_,y){let v=0,S=0,w=0;for(let $=0;$<9;$++)a.probe[$].set(0,0,0);let E=0,x=0,g=0,L=0,C=0,N=0,j=0,I=0,F=0,fe=0,T=0;_.sort(xw);const A=y===!0?Math.PI:1;for(let $=0,pe=_.length;$<pe;$++){const k=_[$],te=k.color,re=k.intensity,le=k.distance,V=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)v+=te.r*re*A,S+=te.g*re*A,w+=te.b*re*A;else if(k.isLightProbe){for(let z=0;z<9;z++)a.probe[z].addScaledVector(k.sh.coefficients[z],re);T++}else if(k.isDirectionalLight){const z=n.get(k);if(z.color.copy(k.color).multiplyScalar(k.intensity*A),k.castShadow){const Y=k.shadow,D=s.get(k);D.shadowBias=Y.bias,D.shadowNormalBias=Y.normalBias,D.shadowRadius=Y.radius,D.shadowMapSize=Y.mapSize,a.directionalShadow[E]=D,a.directionalShadowMap[E]=V,a.directionalShadowMatrix[E]=k.shadow.matrix,N++}a.directional[E]=z,E++}else if(k.isSpotLight){const z=n.get(k);z.position.setFromMatrixPosition(k.matrixWorld),z.color.copy(te).multiplyScalar(re*A),z.distance=le,z.coneCos=Math.cos(k.angle),z.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),z.decay=k.decay,a.spot[g]=z;const Y=k.shadow;if(k.map&&(a.spotLightMap[F]=k.map,F++,Y.updateMatrices(k),k.castShadow&&fe++),a.spotLightMatrix[g]=Y.matrix,k.castShadow){const D=s.get(k);D.shadowBias=Y.bias,D.shadowNormalBias=Y.normalBias,D.shadowRadius=Y.radius,D.shadowMapSize=Y.mapSize,a.spotShadow[g]=D,a.spotShadowMap[g]=V,I++}g++}else if(k.isRectAreaLight){const z=n.get(k);z.color.copy(te).multiplyScalar(re),z.halfWidth.set(k.width*.5,0,0),z.halfHeight.set(0,k.height*.5,0),a.rectArea[L]=z,L++}else if(k.isPointLight){const z=n.get(k);if(z.color.copy(k.color).multiplyScalar(k.intensity*A),z.distance=k.distance,z.decay=k.decay,k.castShadow){const Y=k.shadow,D=s.get(k);D.shadowBias=Y.bias,D.shadowNormalBias=Y.normalBias,D.shadowRadius=Y.radius,D.shadowMapSize=Y.mapSize,D.shadowCameraNear=Y.camera.near,D.shadowCameraFar=Y.camera.far,a.pointShadow[x]=D,a.pointShadowMap[x]=V,a.pointShadowMatrix[x]=k.shadow.matrix,j++}a.point[x]=z,x++}else if(k.isHemisphereLight){const z=n.get(k);z.skyColor.copy(k.color).multiplyScalar(re*A),z.groundColor.copy(k.groundColor).multiplyScalar(re*A),a.hemi[C]=z,C++}}L>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Le.LTC_FLOAT_1,a.rectAreaLTC2=Le.LTC_FLOAT_2):(a.rectAreaLTC1=Le.LTC_HALF_1,a.rectAreaLTC2=Le.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Le.LTC_FLOAT_1,a.rectAreaLTC2=Le.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(a.rectAreaLTC1=Le.LTC_HALF_1,a.rectAreaLTC2=Le.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),a.ambient[0]=v,a.ambient[1]=S,a.ambient[2]=w;const K=a.hash;(K.directionalLength!==E||K.pointLength!==x||K.spotLength!==g||K.rectAreaLength!==L||K.hemiLength!==C||K.numDirectionalShadows!==N||K.numPointShadows!==j||K.numSpotShadows!==I||K.numSpotMaps!==F||K.numLightProbes!==T)&&(a.directional.length=E,a.spot.length=g,a.rectArea.length=L,a.point.length=x,a.hemi.length=C,a.directionalShadow.length=N,a.directionalShadowMap.length=N,a.pointShadow.length=j,a.pointShadowMap.length=j,a.spotShadow.length=I,a.spotShadowMap.length=I,a.directionalShadowMatrix.length=N,a.pointShadowMatrix.length=j,a.spotLightMatrix.length=I+F-fe,a.spotLightMap.length=F,a.numSpotLightShadowsWithMaps=fe,a.numLightProbes=T,K.directionalLength=E,K.pointLength=x,K.spotLength=g,K.rectAreaLength=L,K.hemiLength=C,K.numDirectionalShadows=N,K.numPointShadows=j,K.numSpotShadows=I,K.numSpotMaps=F,K.numLightProbes=T,a.version=_w++)}function m(_,y){let v=0,S=0,w=0,E=0,x=0;const g=y.matrixWorldInverse;for(let L=0,C=_.length;L<C;L++){const N=_[L];if(N.isDirectionalLight){const j=a.directional[v];j.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),j.direction.sub(l),j.direction.transformDirection(g),v++}else if(N.isSpotLight){const j=a.spot[w];j.position.setFromMatrixPosition(N.matrixWorld),j.position.applyMatrix4(g),j.direction.setFromMatrixPosition(N.matrixWorld),l.setFromMatrixPosition(N.target.matrixWorld),j.direction.sub(l),j.direction.transformDirection(g),w++}else if(N.isRectAreaLight){const j=a.rectArea[E];j.position.setFromMatrixPosition(N.matrixWorld),j.position.applyMatrix4(g),u.identity(),f.copy(N.matrixWorld),f.premultiply(g),u.extractRotation(f),j.halfWidth.set(N.width*.5,0,0),j.halfHeight.set(0,N.height*.5,0),j.halfWidth.applyMatrix4(u),j.halfHeight.applyMatrix4(u),E++}else if(N.isPointLight){const j=a.point[S];j.position.setFromMatrixPosition(N.matrixWorld),j.position.applyMatrix4(g),S++}else if(N.isHemisphereLight){const j=a.hemi[x];j.direction.setFromMatrixPosition(N.matrixWorld),j.direction.transformDirection(g),x++}}}return{setup:h,setupView:m,state:a}}function Hm(r,e){const n=new yw(r,e),s=[],a=[];function l(){s.length=0,a.length=0}function f(y){s.push(y)}function u(y){a.push(y)}function h(y){n.setup(s,y)}function m(y){n.setupView(s,y)}return{init:l,state:{lightsArray:s,shadowsArray:a,lights:n},setupLights:h,setupLightsView:m,pushLight:f,pushShadow:u}}function Sw(r,e){let n=new WeakMap;function s(l,f=0){const u=n.get(l);let h;return u===void 0?(h=new Hm(r,e),n.set(l,[h])):f>=u.length?(h=new Hm(r,e),u.push(h)):h=u[f],h}function a(){n=new WeakMap}return{get:s,dispose:a}}class Mw extends Ks{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ew extends Ks{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ww=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Aw(r,e,n){let s=new Cg;const a=new bt,l=new bt,f=new cn,u=new Mw({depthPacking:x0}),h=new Ew,m={},_=n.maxTextureSize,y={[Er]:Un,[Un]:Er,[Hi]:Hi},v=new Zr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:ww,fragmentShader:Tw}),S=v.clone();S.defines.HORIZONTAL_PASS=1;const w=new ti;w.setAttribute("position",new ei(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Si(w,v),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sg;let g=this.type;this.render=function(I,F,fe){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||I.length===0)return;const T=r.getRenderTarget(),A=r.getActiveCubeFace(),K=r.getActiveMipmapLevel(),$=r.state;$.setBlending(yr),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const pe=g!==Bi&&this.type===Bi,k=g===Bi&&this.type!==Bi;for(let te=0,re=I.length;te<re;te++){const le=I[te],V=le.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",le,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);const z=V.getFrameExtents();if(a.multiply(z),l.copy(V.mapSize),(a.x>_||a.y>_)&&(a.x>_&&(l.x=Math.floor(_/z.x),a.x=l.x*z.x,V.mapSize.x=l.x),a.y>_&&(l.y=Math.floor(_/z.y),a.y=l.y*z.y,V.mapSize.y=l.y)),V.map===null||pe===!0||k===!0){const D=this.type!==Bi?{minFilter:Mn,magFilter:Mn}:{};V.map!==null&&V.map.dispose(),V.map=new Kr(a.x,a.y,D),V.map.texture.name=le.name+".shadowMap",V.camera.updateProjectionMatrix()}r.setRenderTarget(V.map),r.clear();const Y=V.getViewportCount();for(let D=0;D<Y;D++){const q=V.getViewport(D);f.set(l.x*q.x,l.y*q.y,l.x*q.z,l.y*q.w),$.viewport(f),V.updateMatrices(le,D),s=V.getFrustum(),N(F,fe,V.camera,le,this.type)}V.isPointLightShadow!==!0&&this.type===Bi&&L(V,fe),V.needsUpdate=!1}g=this.type,x.needsUpdate=!1,r.setRenderTarget(T,A,K)};function L(I,F){const fe=e.update(E);v.defines.VSM_SAMPLES!==I.blurSamples&&(v.defines.VSM_SAMPLES=I.blurSamples,S.defines.VSM_SAMPLES=I.blurSamples,v.needsUpdate=!0,S.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new Kr(a.x,a.y)),v.uniforms.shadow_pass.value=I.map.texture,v.uniforms.resolution.value=I.mapSize,v.uniforms.radius.value=I.radius,r.setRenderTarget(I.mapPass),r.clear(),r.renderBufferDirect(F,null,fe,v,E,null),S.uniforms.shadow_pass.value=I.mapPass.texture,S.uniforms.resolution.value=I.mapSize,S.uniforms.radius.value=I.radius,r.setRenderTarget(I.map),r.clear(),r.renderBufferDirect(F,null,fe,S,E,null)}function C(I,F,fe,T){let A=null;const K=fe.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(K!==void 0)A=K;else if(A=fe.isPointLight===!0?h:u,r.localClippingEnabled&&F.clipShadows===!0&&Array.isArray(F.clippingPlanes)&&F.clippingPlanes.length!==0||F.displacementMap&&F.displacementScale!==0||F.alphaMap&&F.alphaTest>0||F.map&&F.alphaTest>0){const $=A.uuid,pe=F.uuid;let k=m[$];k===void 0&&(k={},m[$]=k);let te=k[pe];te===void 0&&(te=A.clone(),k[pe]=te,F.addEventListener("dispose",j)),A=te}if(A.visible=F.visible,A.wireframe=F.wireframe,T===Bi?A.side=F.shadowSide!==null?F.shadowSide:F.side:A.side=F.shadowSide!==null?F.shadowSide:y[F.side],A.alphaMap=F.alphaMap,A.alphaTest=F.alphaTest,A.map=F.map,A.clipShadows=F.clipShadows,A.clippingPlanes=F.clippingPlanes,A.clipIntersection=F.clipIntersection,A.displacementMap=F.displacementMap,A.displacementScale=F.displacementScale,A.displacementBias=F.displacementBias,A.wireframeLinewidth=F.wireframeLinewidth,A.linewidth=F.linewidth,fe.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const $=r.properties.get(A);$.light=fe}return A}function N(I,F,fe,T,A){if(I.visible===!1)return;if(I.layers.test(F.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&A===Bi)&&(!I.frustumCulled||s.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(fe.matrixWorldInverse,I.matrixWorld);const pe=e.update(I),k=I.material;if(Array.isArray(k)){const te=pe.groups;for(let re=0,le=te.length;re<le;re++){const V=te[re],z=k[V.materialIndex];if(z&&z.visible){const Y=C(I,z,T,A);I.onBeforeShadow(r,I,F,fe,pe,Y,V),r.renderBufferDirect(fe,null,pe,Y,I,V),I.onAfterShadow(r,I,F,fe,pe,Y,V)}}}else if(k.visible){const te=C(I,k,T,A);I.onBeforeShadow(r,I,F,fe,pe,te,null),r.renderBufferDirect(fe,null,pe,te,I,null),I.onAfterShadow(r,I,F,fe,pe,te,null)}}const $=I.children;for(let pe=0,k=$.length;pe<k;pe++)N($[pe],F,fe,T,A)}function j(I){I.target.removeEventListener("dispose",j);for(const fe in m){const T=m[fe],A=I.target.uuid;A in T&&(T[A].dispose(),delete T[A])}}}function bw(r,e,n){const s=n.isWebGL2;function a(){let G=!1;const Pe=new cn;let Ne=null;const nt=new cn(0,0,0,0);return{setMask:function(Qe){Ne!==Qe&&!G&&(r.colorMask(Qe,Qe,Qe,Qe),Ne=Qe)},setLocked:function(Qe){G=Qe},setClear:function(Qe,Et,wt,Bt,en){en===!0&&(Qe*=Bt,Et*=Bt,wt*=Bt),Pe.set(Qe,Et,wt,Bt),nt.equals(Pe)===!1&&(r.clearColor(Qe,Et,wt,Bt),nt.copy(Pe))},reset:function(){G=!1,Ne=null,nt.set(-1,0,0,0)}}}function l(){let G=!1,Pe=null,Ne=null,nt=null;return{setTest:function(Qe){Qe?Ie(r.DEPTH_TEST):He(r.DEPTH_TEST)},setMask:function(Qe){Pe!==Qe&&!G&&(r.depthMask(Qe),Pe=Qe)},setFunc:function(Qe){if(Ne!==Qe){switch(Qe){case Yx:r.depthFunc(r.NEVER);break;case $x:r.depthFunc(r.ALWAYS);break;case Kx:r.depthFunc(r.LESS);break;case Ul:r.depthFunc(r.LEQUAL);break;case Zx:r.depthFunc(r.EQUAL);break;case Qx:r.depthFunc(r.GEQUAL);break;case Jx:r.depthFunc(r.GREATER);break;case e0:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Ne=Qe}},setLocked:function(Qe){G=Qe},setClear:function(Qe){nt!==Qe&&(r.clearDepth(Qe),nt=Qe)},reset:function(){G=!1,Pe=null,Ne=null,nt=null}}}function f(){let G=!1,Pe=null,Ne=null,nt=null,Qe=null,Et=null,wt=null,Bt=null,en=null;return{setTest:function(xt){G||(xt?Ie(r.STENCIL_TEST):He(r.STENCIL_TEST))},setMask:function(xt){Pe!==xt&&!G&&(r.stencilMask(xt),Pe=xt)},setFunc:function(xt,Yt,un){(Ne!==xt||nt!==Yt||Qe!==un)&&(r.stencilFunc(xt,Yt,un),Ne=xt,nt=Yt,Qe=un)},setOp:function(xt,Yt,un){(Et!==xt||wt!==Yt||Bt!==un)&&(r.stencilOp(xt,Yt,un),Et=xt,wt=Yt,Bt=un)},setLocked:function(xt){G=xt},setClear:function(xt){en!==xt&&(r.clearStencil(xt),en=xt)},reset:function(){G=!1,Pe=null,Ne=null,nt=null,Qe=null,Et=null,wt=null,Bt=null,en=null}}}const u=new a,h=new l,m=new f,_=new WeakMap,y=new WeakMap;let v={},S={},w=new WeakMap,E=[],x=null,g=!1,L=null,C=null,N=null,j=null,I=null,F=null,fe=null,T=new Mt(0,0,0),A=0,K=!1,$=null,pe=null,k=null,te=null,re=null;const le=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,z=0;const Y=r.getParameter(r.VERSION);Y.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(Y)[1]),V=z>=1):Y.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),V=z>=2);let D=null,q={};const Z=r.getParameter(r.SCISSOR_BOX),ue=r.getParameter(r.VIEWPORT),ge=new cn().fromArray(Z),Ee=new cn().fromArray(ue);function be(G,Pe,Ne,nt){const Qe=new Uint8Array(4),Et=r.createTexture();r.bindTexture(G,Et),r.texParameteri(G,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(G,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let wt=0;wt<Ne;wt++)s&&(G===r.TEXTURE_3D||G===r.TEXTURE_2D_ARRAY)?r.texImage3D(Pe,0,r.RGBA,1,1,nt,0,r.RGBA,r.UNSIGNED_BYTE,Qe):r.texImage2D(Pe+wt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Qe);return Et}const Ce={};Ce[r.TEXTURE_2D]=be(r.TEXTURE_2D,r.TEXTURE_2D,1),Ce[r.TEXTURE_CUBE_MAP]=be(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),s&&(Ce[r.TEXTURE_2D_ARRAY]=be(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ce[r.TEXTURE_3D]=be(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),u.setClear(0,0,0,1),h.setClear(1),m.setClear(0),Ie(r.DEPTH_TEST),h.setFunc(Ul),st(!1),P(Mp),Ie(r.CULL_FACE),Be(yr);function Ie(G){v[G]!==!0&&(r.enable(G),v[G]=!0)}function He(G){v[G]!==!1&&(r.disable(G),v[G]=!1)}function Ge(G,Pe){return S[G]!==Pe?(r.bindFramebuffer(G,Pe),S[G]=Pe,s&&(G===r.DRAW_FRAMEBUFFER&&(S[r.FRAMEBUFFER]=Pe),G===r.FRAMEBUFFER&&(S[r.DRAW_FRAMEBUFFER]=Pe)),!0):!1}function Q(G,Pe){let Ne=E,nt=!1;if(G)if(Ne=w.get(Pe),Ne===void 0&&(Ne=[],w.set(Pe,Ne)),G.isWebGLMultipleRenderTargets){const Qe=G.texture;if(Ne.length!==Qe.length||Ne[0]!==r.COLOR_ATTACHMENT0){for(let Et=0,wt=Qe.length;Et<wt;Et++)Ne[Et]=r.COLOR_ATTACHMENT0+Et;Ne.length=Qe.length,nt=!0}}else Ne[0]!==r.COLOR_ATTACHMENT0&&(Ne[0]=r.COLOR_ATTACHMENT0,nt=!0);else Ne[0]!==r.BACK&&(Ne[0]=r.BACK,nt=!0);nt&&(n.isWebGL2?r.drawBuffers(Ne):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ne))}function Lt(G){return x!==G?(r.useProgram(G),x=G,!0):!1}const qe={[jr]:r.FUNC_ADD,[Dx]:r.FUNC_SUBTRACT,[Ux]:r.FUNC_REVERSE_SUBTRACT};if(s)qe[Ap]=r.MIN,qe[bp]=r.MAX;else{const G=e.get("EXT_blend_minmax");G!==null&&(qe[Ap]=G.MIN_EXT,qe[bp]=G.MAX_EXT)}const Fe={[Ix]:r.ZERO,[Fx]:r.ONE,[Ox]:r.SRC_COLOR,[pf]:r.SRC_ALPHA,[Vx]:r.SRC_ALPHA_SATURATE,[Hx]:r.DST_COLOR,[zx]:r.DST_ALPHA,[kx]:r.ONE_MINUS_SRC_COLOR,[mf]:r.ONE_MINUS_SRC_ALPHA,[Gx]:r.ONE_MINUS_DST_COLOR,[Bx]:r.ONE_MINUS_DST_ALPHA,[Wx]:r.CONSTANT_COLOR,[jx]:r.ONE_MINUS_CONSTANT_COLOR,[Xx]:r.CONSTANT_ALPHA,[qx]:r.ONE_MINUS_CONSTANT_ALPHA};function Be(G,Pe,Ne,nt,Qe,Et,wt,Bt,en,xt){if(G===yr){g===!0&&(He(r.BLEND),g=!1);return}if(g===!1&&(Ie(r.BLEND),g=!0),G!==Nx){if(G!==L||xt!==K){if((C!==jr||I!==jr)&&(r.blendEquation(r.FUNC_ADD),C=jr,I=jr),xt)switch(G){case Gs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ep:r.blendFunc(r.ONE,r.ONE);break;case wp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Tp:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Gs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ep:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case wp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Tp:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}N=null,j=null,F=null,fe=null,T.set(0,0,0),A=0,L=G,K=xt}return}Qe=Qe||Pe,Et=Et||Ne,wt=wt||nt,(Pe!==C||Qe!==I)&&(r.blendEquationSeparate(qe[Pe],qe[Qe]),C=Pe,I=Qe),(Ne!==N||nt!==j||Et!==F||wt!==fe)&&(r.blendFuncSeparate(Fe[Ne],Fe[nt],Fe[Et],Fe[wt]),N=Ne,j=nt,F=Et,fe=wt),(Bt.equals(T)===!1||en!==A)&&(r.blendColor(Bt.r,Bt.g,Bt.b,en),T.copy(Bt),A=en),L=G,K=!1}function St(G,Pe){G.side===Hi?He(r.CULL_FACE):Ie(r.CULL_FACE);let Ne=G.side===Un;Pe&&(Ne=!Ne),st(Ne),G.blending===Gs&&G.transparent===!1?Be(yr):Be(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),h.setFunc(G.depthFunc),h.setTest(G.depthTest),h.setMask(G.depthWrite),u.setMask(G.colorWrite);const nt=G.stencilWrite;m.setTest(nt),nt&&(m.setMask(G.stencilWriteMask),m.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),m.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),ne(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?Ie(r.SAMPLE_ALPHA_TO_COVERAGE):He(r.SAMPLE_ALPHA_TO_COVERAGE)}function st(G){$!==G&&(G?r.frontFace(r.CW):r.frontFace(r.CCW),$=G)}function P(G){G!==Rx?(Ie(r.CULL_FACE),G!==pe&&(G===Mp?r.cullFace(r.BACK):G===Px?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):He(r.CULL_FACE),pe=G}function b(G){G!==k&&(V&&r.lineWidth(G),k=G)}function ne(G,Pe,Ne){G?(Ie(r.POLYGON_OFFSET_FILL),(te!==Pe||re!==Ne)&&(r.polygonOffset(Pe,Ne),te=Pe,re=Ne)):He(r.POLYGON_OFFSET_FILL)}function ye(G){G?Ie(r.SCISSOR_TEST):He(r.SCISSOR_TEST)}function xe(G){G===void 0&&(G=r.TEXTURE0+le-1),D!==G&&(r.activeTexture(G),D=G)}function Me(G,Pe,Ne){Ne===void 0&&(D===null?Ne=r.TEXTURE0+le-1:Ne=D);let nt=q[Ne];nt===void 0&&(nt={type:void 0,texture:void 0},q[Ne]=nt),(nt.type!==G||nt.texture!==Pe)&&(D!==Ne&&(r.activeTexture(Ne),D=Ne),r.bindTexture(G,Pe||Ce[G]),nt.type=G,nt.texture=Pe)}function H(){const G=q[D];G!==void 0&&G.type!==void 0&&(r.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function X(){try{r.compressedTexImage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function he(){try{r.compressedTexImage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Te(){try{r.texSubImage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function we(){try{r.texSubImage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function me(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function lt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ke(){try{r.texStorage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ze(){try{r.texStorage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ye(){try{r.texImage2D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function We(){try{r.texImage3D.apply(r,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ot(G){ge.equals(G)===!1&&(r.scissor(G.x,G.y,G.z,G.w),ge.copy(G))}function vt(G){Ee.equals(G)===!1&&(r.viewport(G.x,G.y,G.z,G.w),Ee.copy(G))}function Ct(G,Pe){let Ne=y.get(Pe);Ne===void 0&&(Ne=new WeakMap,y.set(Pe,Ne));let nt=Ne.get(G);nt===void 0&&(nt=r.getUniformBlockIndex(Pe,G.name),Ne.set(G,nt))}function ct(G,Pe){const nt=y.get(Pe).get(G);_.get(Pe)!==nt&&(r.uniformBlockBinding(Pe,nt,G.__bindingPointIndex),_.set(Pe,nt))}function Re(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),s===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),v={},D=null,q={},S={},w=new WeakMap,E=[],x=null,g=!1,L=null,C=null,N=null,j=null,I=null,F=null,fe=null,T=new Mt(0,0,0),A=0,K=!1,$=null,pe=null,k=null,te=null,re=null,ge.set(0,0,r.canvas.width,r.canvas.height),Ee.set(0,0,r.canvas.width,r.canvas.height),u.reset(),h.reset(),m.reset()}return{buffers:{color:u,depth:h,stencil:m},enable:Ie,disable:He,bindFramebuffer:Ge,drawBuffers:Q,useProgram:Lt,setBlending:Be,setMaterial:St,setFlipSided:st,setCullFace:P,setLineWidth:b,setPolygonOffset:ne,setScissorTest:ye,activeTexture:xe,bindTexture:Me,unbindTexture:H,compressedTexImage2D:X,compressedTexImage3D:he,texImage2D:Ye,texImage3D:We,updateUBOMapping:Ct,uniformBlockBinding:ct,texStorage2D:Ke,texStorage3D:Ze,texSubImage2D:Te,texSubImage3D:we,compressedTexSubImage2D:me,compressedTexSubImage3D:lt,scissor:ot,viewport:vt,reset:Re}}function Cw(r,e,n,s,a,l,f){const u=a.isWebGL2,h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new WeakMap;let y;const v=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(P,b){return S?new OffscreenCanvas(P,b):zl("canvas")}function E(P,b,ne,ye){let xe=1;if((P.width>ye||P.height>ye)&&(xe=ye/Math.max(P.width,P.height)),xe<1||b===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap){const Me=b?Mf:Math.floor,H=Me(xe*P.width),X=Me(xe*P.height);y===void 0&&(y=w(H,X));const he=ne?w(H,X):y;return he.width=H,he.height=X,he.getContext("2d").drawImage(P,0,0,H,X),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+H+"x"+X+")."),he}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function x(P){return im(P.width)&&im(P.height)}function g(P){return u?!1:P.wrapS!==di||P.wrapT!==di||P.minFilter!==Mn&&P.minFilter!==Kn}function L(P,b){return P.generateMipmaps&&b&&P.minFilter!==Mn&&P.minFilter!==Kn}function C(P){r.generateMipmap(P)}function N(P,b,ne,ye,xe=!1){if(u===!1)return b;if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Me=b;if(b===r.RED&&(ne===r.FLOAT&&(Me=r.R32F),ne===r.HALF_FLOAT&&(Me=r.R16F),ne===r.UNSIGNED_BYTE&&(Me=r.R8)),b===r.RED_INTEGER&&(ne===r.UNSIGNED_BYTE&&(Me=r.R8UI),ne===r.UNSIGNED_SHORT&&(Me=r.R16UI),ne===r.UNSIGNED_INT&&(Me=r.R32UI),ne===r.BYTE&&(Me=r.R8I),ne===r.SHORT&&(Me=r.R16I),ne===r.INT&&(Me=r.R32I)),b===r.RG&&(ne===r.FLOAT&&(Me=r.RG32F),ne===r.HALF_FLOAT&&(Me=r.RG16F),ne===r.UNSIGNED_BYTE&&(Me=r.RG8)),b===r.RGBA){const H=xe?Il:At.getTransfer(ye);ne===r.FLOAT&&(Me=r.RGBA32F),ne===r.HALF_FLOAT&&(Me=r.RGBA16F),ne===r.UNSIGNED_BYTE&&(Me=H===It?r.SRGB8_ALPHA8:r.RGBA8),ne===r.UNSIGNED_SHORT_4_4_4_4&&(Me=r.RGBA4),ne===r.UNSIGNED_SHORT_5_5_5_1&&(Me=r.RGB5_A1)}return(Me===r.R16F||Me===r.R32F||Me===r.RG16F||Me===r.RG32F||Me===r.RGBA16F||Me===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Me}function j(P,b,ne){return L(P,ne)===!0||P.isFramebufferTexture&&P.minFilter!==Mn&&P.minFilter!==Kn?Math.log2(Math.max(b.width,b.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?b.mipmaps.length:1}function I(P){return P===Mn||P===Cp||P===Du?r.NEAREST:r.LINEAR}function F(P){const b=P.target;b.removeEventListener("dispose",F),T(b),b.isVideoTexture&&_.delete(b)}function fe(P){const b=P.target;b.removeEventListener("dispose",fe),K(b)}function T(P){const b=s.get(P);if(b.__webglInit===void 0)return;const ne=P.source,ye=v.get(ne);if(ye){const xe=ye[b.__cacheKey];xe.usedTimes--,xe.usedTimes===0&&A(P),Object.keys(ye).length===0&&v.delete(ne)}s.remove(P)}function A(P){const b=s.get(P);r.deleteTexture(b.__webglTexture);const ne=P.source,ye=v.get(ne);delete ye[b.__cacheKey],f.memory.textures--}function K(P){const b=P.texture,ne=s.get(P),ye=s.get(b);if(ye.__webglTexture!==void 0&&(r.deleteTexture(ye.__webglTexture),f.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let xe=0;xe<6;xe++){if(Array.isArray(ne.__webglFramebuffer[xe]))for(let Me=0;Me<ne.__webglFramebuffer[xe].length;Me++)r.deleteFramebuffer(ne.__webglFramebuffer[xe][Me]);else r.deleteFramebuffer(ne.__webglFramebuffer[xe]);ne.__webglDepthbuffer&&r.deleteRenderbuffer(ne.__webglDepthbuffer[xe])}else{if(Array.isArray(ne.__webglFramebuffer))for(let xe=0;xe<ne.__webglFramebuffer.length;xe++)r.deleteFramebuffer(ne.__webglFramebuffer[xe]);else r.deleteFramebuffer(ne.__webglFramebuffer);if(ne.__webglDepthbuffer&&r.deleteRenderbuffer(ne.__webglDepthbuffer),ne.__webglMultisampledFramebuffer&&r.deleteFramebuffer(ne.__webglMultisampledFramebuffer),ne.__webglColorRenderbuffer)for(let xe=0;xe<ne.__webglColorRenderbuffer.length;xe++)ne.__webglColorRenderbuffer[xe]&&r.deleteRenderbuffer(ne.__webglColorRenderbuffer[xe]);ne.__webglDepthRenderbuffer&&r.deleteRenderbuffer(ne.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let xe=0,Me=b.length;xe<Me;xe++){const H=s.get(b[xe]);H.__webglTexture&&(r.deleteTexture(H.__webglTexture),f.memory.textures--),s.remove(b[xe])}s.remove(b),s.remove(P)}let $=0;function pe(){$=0}function k(){const P=$;return P>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+a.maxTextures),$+=1,P}function te(P){const b=[];return b.push(P.wrapS),b.push(P.wrapT),b.push(P.wrapR||0),b.push(P.magFilter),b.push(P.minFilter),b.push(P.anisotropy),b.push(P.internalFormat),b.push(P.format),b.push(P.type),b.push(P.generateMipmaps),b.push(P.premultiplyAlpha),b.push(P.flipY),b.push(P.unpackAlignment),b.push(P.colorSpace),b.join()}function re(P,b){const ne=s.get(P);if(P.isVideoTexture&&St(P),P.isRenderTargetTexture===!1&&P.version>0&&ne.__version!==P.version){const ye=P.image;if(ye===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ye.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ge(ne,P,b);return}}n.bindTexture(r.TEXTURE_2D,ne.__webglTexture,r.TEXTURE0+b)}function le(P,b){const ne=s.get(P);if(P.version>0&&ne.__version!==P.version){ge(ne,P,b);return}n.bindTexture(r.TEXTURE_2D_ARRAY,ne.__webglTexture,r.TEXTURE0+b)}function V(P,b){const ne=s.get(P);if(P.version>0&&ne.__version!==P.version){ge(ne,P,b);return}n.bindTexture(r.TEXTURE_3D,ne.__webglTexture,r.TEXTURE0+b)}function z(P,b){const ne=s.get(P);if(P.version>0&&ne.__version!==P.version){Ee(ne,P,b);return}n.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture,r.TEXTURE0+b)}const Y={[_f]:r.REPEAT,[di]:r.CLAMP_TO_EDGE,[xf]:r.MIRRORED_REPEAT},D={[Mn]:r.NEAREST,[Cp]:r.NEAREST_MIPMAP_NEAREST,[Du]:r.NEAREST_MIPMAP_LINEAR,[Kn]:r.LINEAR,[c0]:r.LINEAR_MIPMAP_NEAREST,[Vo]:r.LINEAR_MIPMAP_LINEAR},q={[M0]:r.NEVER,[C0]:r.ALWAYS,[E0]:r.LESS,[gg]:r.LEQUAL,[w0]:r.EQUAL,[b0]:r.GEQUAL,[T0]:r.GREATER,[A0]:r.NOTEQUAL};function Z(P,b,ne){if(ne?(r.texParameteri(P,r.TEXTURE_WRAP_S,Y[b.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,Y[b.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,Y[b.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,D[b.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,D[b.minFilter])):(r.texParameteri(P,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(P,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(b.wrapS!==di||b.wrapT!==di)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(P,r.TEXTURE_MAG_FILTER,I(b.magFilter)),r.texParameteri(P,r.TEXTURE_MIN_FILTER,I(b.minFilter)),b.minFilter!==Mn&&b.minFilter!==Kn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),b.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,q[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ye=e.get("EXT_texture_filter_anisotropic");if(b.magFilter===Mn||b.minFilter!==Du&&b.minFilter!==Vo||b.type===xr&&e.has("OES_texture_float_linear")===!1||u===!1&&b.type===Wo&&e.has("OES_texture_half_float_linear")===!1)return;(b.anisotropy>1||s.get(b).__currentAnisotropy)&&(r.texParameterf(P,ye.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,a.getMaxAnisotropy())),s.get(b).__currentAnisotropy=b.anisotropy)}}function ue(P,b){let ne=!1;P.__webglInit===void 0&&(P.__webglInit=!0,b.addEventListener("dispose",F));const ye=b.source;let xe=v.get(ye);xe===void 0&&(xe={},v.set(ye,xe));const Me=te(b);if(Me!==P.__cacheKey){xe[Me]===void 0&&(xe[Me]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,ne=!0),xe[Me].usedTimes++;const H=xe[P.__cacheKey];H!==void 0&&(xe[P.__cacheKey].usedTimes--,H.usedTimes===0&&A(b)),P.__cacheKey=Me,P.__webglTexture=xe[Me].texture}return ne}function ge(P,b,ne){let ye=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ye=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ye=r.TEXTURE_3D);const xe=ue(P,b),Me=b.source;n.bindTexture(ye,P.__webglTexture,r.TEXTURE0+ne);const H=s.get(Me);if(Me.version!==H.__version||xe===!0){n.activeTexture(r.TEXTURE0+ne);const X=At.getPrimaries(At.workingColorSpace),he=b.colorSpace===Jn?null:At.getPrimaries(b.colorSpace),Te=b.colorSpace===Jn||X===he?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const we=g(b)&&x(b.image)===!1;let me=E(b.image,we,!1,a.maxTextureSize);me=st(b,me);const lt=x(me)||u,Ke=l.convert(b.format,b.colorSpace);let Ze=l.convert(b.type),Ye=N(b.internalFormat,Ke,Ze,b.colorSpace,b.isVideoTexture);Z(ye,b,lt);let We;const ot=b.mipmaps,vt=u&&b.isVideoTexture!==!0&&Ye!==pg,Ct=H.__version===void 0||xe===!0,ct=j(b,me,lt);if(b.isDepthTexture)Ye=r.DEPTH_COMPONENT,u?b.type===xr?Ye=r.DEPTH_COMPONENT32F:b.type===_r?Ye=r.DEPTH_COMPONENT24:b.type===qr?Ye=r.DEPTH24_STENCIL8:Ye=r.DEPTH_COMPONENT16:b.type===xr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),b.format===Yr&&Ye===r.DEPTH_COMPONENT&&b.type!==Cf&&b.type!==_r&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),b.type=_r,Ze=l.convert(b.type)),b.format===Xs&&Ye===r.DEPTH_COMPONENT&&(Ye=r.DEPTH_STENCIL,b.type!==qr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),b.type=qr,Ze=l.convert(b.type))),Ct&&(vt?n.texStorage2D(r.TEXTURE_2D,1,Ye,me.width,me.height):n.texImage2D(r.TEXTURE_2D,0,Ye,me.width,me.height,0,Ke,Ze,null));else if(b.isDataTexture)if(ot.length>0&&lt){vt&&Ct&&n.texStorage2D(r.TEXTURE_2D,ct,Ye,ot[0].width,ot[0].height);for(let Re=0,G=ot.length;Re<G;Re++)We=ot[Re],vt?n.texSubImage2D(r.TEXTURE_2D,Re,0,0,We.width,We.height,Ke,Ze,We.data):n.texImage2D(r.TEXTURE_2D,Re,Ye,We.width,We.height,0,Ke,Ze,We.data);b.generateMipmaps=!1}else vt?(Ct&&n.texStorage2D(r.TEXTURE_2D,ct,Ye,me.width,me.height),n.texSubImage2D(r.TEXTURE_2D,0,0,0,me.width,me.height,Ke,Ze,me.data)):n.texImage2D(r.TEXTURE_2D,0,Ye,me.width,me.height,0,Ke,Ze,me.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){vt&&Ct&&n.texStorage3D(r.TEXTURE_2D_ARRAY,ct,Ye,ot[0].width,ot[0].height,me.depth);for(let Re=0,G=ot.length;Re<G;Re++)We=ot[Re],b.format!==hi?Ke!==null?vt?n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Re,0,0,0,We.width,We.height,me.depth,Ke,We.data,0,0):n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Re,Ye,We.width,We.height,me.depth,0,We.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):vt?n.texSubImage3D(r.TEXTURE_2D_ARRAY,Re,0,0,0,We.width,We.height,me.depth,Ke,Ze,We.data):n.texImage3D(r.TEXTURE_2D_ARRAY,Re,Ye,We.width,We.height,me.depth,0,Ke,Ze,We.data)}else{vt&&Ct&&n.texStorage2D(r.TEXTURE_2D,ct,Ye,ot[0].width,ot[0].height);for(let Re=0,G=ot.length;Re<G;Re++)We=ot[Re],b.format!==hi?Ke!==null?vt?n.compressedTexSubImage2D(r.TEXTURE_2D,Re,0,0,We.width,We.height,Ke,We.data):n.compressedTexImage2D(r.TEXTURE_2D,Re,Ye,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):vt?n.texSubImage2D(r.TEXTURE_2D,Re,0,0,We.width,We.height,Ke,Ze,We.data):n.texImage2D(r.TEXTURE_2D,Re,Ye,We.width,We.height,0,Ke,Ze,We.data)}else if(b.isDataArrayTexture)vt?(Ct&&n.texStorage3D(r.TEXTURE_2D_ARRAY,ct,Ye,me.width,me.height,me.depth),n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,Ke,Ze,me.data)):n.texImage3D(r.TEXTURE_2D_ARRAY,0,Ye,me.width,me.height,me.depth,0,Ke,Ze,me.data);else if(b.isData3DTexture)vt?(Ct&&n.texStorage3D(r.TEXTURE_3D,ct,Ye,me.width,me.height,me.depth),n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,Ke,Ze,me.data)):n.texImage3D(r.TEXTURE_3D,0,Ye,me.width,me.height,me.depth,0,Ke,Ze,me.data);else if(b.isFramebufferTexture){if(Ct)if(vt)n.texStorage2D(r.TEXTURE_2D,ct,Ye,me.width,me.height);else{let Re=me.width,G=me.height;for(let Pe=0;Pe<ct;Pe++)n.texImage2D(r.TEXTURE_2D,Pe,Ye,Re,G,0,Ke,Ze,null),Re>>=1,G>>=1}}else if(ot.length>0&&lt){vt&&Ct&&n.texStorage2D(r.TEXTURE_2D,ct,Ye,ot[0].width,ot[0].height);for(let Re=0,G=ot.length;Re<G;Re++)We=ot[Re],vt?n.texSubImage2D(r.TEXTURE_2D,Re,0,0,Ke,Ze,We):n.texImage2D(r.TEXTURE_2D,Re,Ye,Ke,Ze,We);b.generateMipmaps=!1}else vt?(Ct&&n.texStorage2D(r.TEXTURE_2D,ct,Ye,me.width,me.height),n.texSubImage2D(r.TEXTURE_2D,0,0,0,Ke,Ze,me)):n.texImage2D(r.TEXTURE_2D,0,Ye,Ke,Ze,me);L(b,lt)&&C(ye),H.__version=Me.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function Ee(P,b,ne){if(b.image.length!==6)return;const ye=ue(P,b),xe=b.source;n.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+ne);const Me=s.get(xe);if(xe.version!==Me.__version||ye===!0){n.activeTexture(r.TEXTURE0+ne);const H=At.getPrimaries(At.workingColorSpace),X=b.colorSpace===Jn?null:At.getPrimaries(b.colorSpace),he=b.colorSpace===Jn||H===X?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const Te=b.isCompressedTexture||b.image[0].isCompressedTexture,we=b.image[0]&&b.image[0].isDataTexture,me=[];for(let Re=0;Re<6;Re++)!Te&&!we?me[Re]=E(b.image[Re],!1,!0,a.maxCubemapSize):me[Re]=we?b.image[Re].image:b.image[Re],me[Re]=st(b,me[Re]);const lt=me[0],Ke=x(lt)||u,Ze=l.convert(b.format,b.colorSpace),Ye=l.convert(b.type),We=N(b.internalFormat,Ze,Ye,b.colorSpace),ot=u&&b.isVideoTexture!==!0,vt=Me.__version===void 0||ye===!0;let Ct=j(b,lt,Ke);Z(r.TEXTURE_CUBE_MAP,b,Ke);let ct;if(Te){ot&&vt&&n.texStorage2D(r.TEXTURE_CUBE_MAP,Ct,We,lt.width,lt.height);for(let Re=0;Re<6;Re++){ct=me[Re].mipmaps;for(let G=0;G<ct.length;G++){const Pe=ct[G];b.format!==hi?Ze!==null?ot?n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,G,0,0,Pe.width,Pe.height,Ze,Pe.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,G,We,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ot?n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,G,0,0,Pe.width,Pe.height,Ze,Ye,Pe.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,G,We,Pe.width,Pe.height,0,Ze,Ye,Pe.data)}}}else{ct=b.mipmaps,ot&&vt&&(ct.length>0&&Ct++,n.texStorage2D(r.TEXTURE_CUBE_MAP,Ct,We,me[0].width,me[0].height));for(let Re=0;Re<6;Re++)if(we){ot?n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,me[Re].width,me[Re].height,Ze,Ye,me[Re].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,We,me[Re].width,me[Re].height,0,Ze,Ye,me[Re].data);for(let G=0;G<ct.length;G++){const Ne=ct[G].image[Re].image;ot?n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,G+1,0,0,Ne.width,Ne.height,Ze,Ye,Ne.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,G+1,We,Ne.width,Ne.height,0,Ze,Ye,Ne.data)}}else{ot?n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,Ze,Ye,me[Re]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,We,Ze,Ye,me[Re]);for(let G=0;G<ct.length;G++){const Pe=ct[G];ot?n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,G+1,0,0,Ze,Ye,Pe.image[Re]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Re,G+1,We,Ze,Ye,Pe.image[Re])}}}L(b,Ke)&&C(r.TEXTURE_CUBE_MAP),Me.__version=xe.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function be(P,b,ne,ye,xe,Me){const H=l.convert(ne.format,ne.colorSpace),X=l.convert(ne.type),he=N(ne.internalFormat,H,X,ne.colorSpace);if(!s.get(b).__hasExternalTextures){const we=Math.max(1,b.width>>Me),me=Math.max(1,b.height>>Me);xe===r.TEXTURE_3D||xe===r.TEXTURE_2D_ARRAY?n.texImage3D(xe,Me,he,we,me,b.depth,0,H,X,null):n.texImage2D(xe,Me,he,we,me,0,H,X,null)}n.bindFramebuffer(r.FRAMEBUFFER,P),Be(b)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ye,xe,s.get(ne).__webglTexture,0,Fe(b)):(xe===r.TEXTURE_2D||xe>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&xe<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ye,xe,s.get(ne).__webglTexture,Me),n.bindFramebuffer(r.FRAMEBUFFER,null)}function Ce(P,b,ne){if(r.bindRenderbuffer(r.RENDERBUFFER,P),b.depthBuffer&&!b.stencilBuffer){let ye=u===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(ne||Be(b)){const xe=b.depthTexture;xe&&xe.isDepthTexture&&(xe.type===xr?ye=r.DEPTH_COMPONENT32F:xe.type===_r&&(ye=r.DEPTH_COMPONENT24));const Me=Fe(b);Be(b)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Me,ye,b.width,b.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,Me,ye,b.width,b.height)}else r.renderbufferStorage(r.RENDERBUFFER,ye,b.width,b.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,P)}else if(b.depthBuffer&&b.stencilBuffer){const ye=Fe(b);ne&&Be(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,r.DEPTH24_STENCIL8,b.width,b.height):Be(b)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ye,r.DEPTH24_STENCIL8,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,P)}else{const ye=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let xe=0;xe<ye.length;xe++){const Me=ye[xe],H=l.convert(Me.format,Me.colorSpace),X=l.convert(Me.type),he=N(Me.internalFormat,H,X,Me.colorSpace),Te=Fe(b);ne&&Be(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Te,he,b.width,b.height):Be(b)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Te,he,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,he,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ie(P,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(r.FRAMEBUFFER,P),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!s.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),re(b.depthTexture,0);const ye=s.get(b.depthTexture).__webglTexture,xe=Fe(b);if(b.depthTexture.format===Yr)Be(b)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ye,0,xe):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ye,0);else if(b.depthTexture.format===Xs)Be(b)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ye,0,xe):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ye,0);else throw new Error("Unknown depthTexture format")}function He(P){const b=s.get(P),ne=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!b.__autoAllocateDepthBuffer){if(ne)throw new Error("target.depthTexture not supported in Cube render targets");Ie(b.__webglFramebuffer,P)}else if(ne){b.__webglDepthbuffer=[];for(let ye=0;ye<6;ye++)n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[ye]),b.__webglDepthbuffer[ye]=r.createRenderbuffer(),Ce(b.__webglDepthbuffer[ye],P,!1)}else n.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=r.createRenderbuffer(),Ce(b.__webglDepthbuffer,P,!1);n.bindFramebuffer(r.FRAMEBUFFER,null)}function Ge(P,b,ne){const ye=s.get(P);b!==void 0&&be(ye.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),ne!==void 0&&He(P)}function Q(P){const b=P.texture,ne=s.get(P),ye=s.get(b);P.addEventListener("dispose",fe),P.isWebGLMultipleRenderTargets!==!0&&(ye.__webglTexture===void 0&&(ye.__webglTexture=r.createTexture()),ye.__version=b.version,f.memory.textures++);const xe=P.isWebGLCubeRenderTarget===!0,Me=P.isWebGLMultipleRenderTargets===!0,H=x(P)||u;if(xe){ne.__webglFramebuffer=[];for(let X=0;X<6;X++)if(u&&b.mipmaps&&b.mipmaps.length>0){ne.__webglFramebuffer[X]=[];for(let he=0;he<b.mipmaps.length;he++)ne.__webglFramebuffer[X][he]=r.createFramebuffer()}else ne.__webglFramebuffer[X]=r.createFramebuffer()}else{if(u&&b.mipmaps&&b.mipmaps.length>0){ne.__webglFramebuffer=[];for(let X=0;X<b.mipmaps.length;X++)ne.__webglFramebuffer[X]=r.createFramebuffer()}else ne.__webglFramebuffer=r.createFramebuffer();if(Me)if(a.drawBuffers){const X=P.texture;for(let he=0,Te=X.length;he<Te;he++){const we=s.get(X[he]);we.__webglTexture===void 0&&(we.__webglTexture=r.createTexture(),f.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(u&&P.samples>0&&Be(P)===!1){const X=Me?b:[b];ne.__webglMultisampledFramebuffer=r.createFramebuffer(),ne.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,ne.__webglMultisampledFramebuffer);for(let he=0;he<X.length;he++){const Te=X[he];ne.__webglColorRenderbuffer[he]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,ne.__webglColorRenderbuffer[he]);const we=l.convert(Te.format,Te.colorSpace),me=l.convert(Te.type),lt=N(Te.internalFormat,we,me,Te.colorSpace,P.isXRRenderTarget===!0),Ke=Fe(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ke,lt,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+he,r.RENDERBUFFER,ne.__webglColorRenderbuffer[he])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(ne.__webglDepthRenderbuffer=r.createRenderbuffer(),Ce(ne.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(xe){n.bindTexture(r.TEXTURE_CUBE_MAP,ye.__webglTexture),Z(r.TEXTURE_CUBE_MAP,b,H);for(let X=0;X<6;X++)if(u&&b.mipmaps&&b.mipmaps.length>0)for(let he=0;he<b.mipmaps.length;he++)be(ne.__webglFramebuffer[X][he],P,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+X,he);else be(ne.__webglFramebuffer[X],P,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0);L(b,H)&&C(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Me){const X=P.texture;for(let he=0,Te=X.length;he<Te;he++){const we=X[he],me=s.get(we);n.bindTexture(r.TEXTURE_2D,me.__webglTexture),Z(r.TEXTURE_2D,we,H),be(ne.__webglFramebuffer,P,we,r.COLOR_ATTACHMENT0+he,r.TEXTURE_2D,0),L(we,H)&&C(r.TEXTURE_2D)}n.unbindTexture()}else{let X=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(u?X=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),n.bindTexture(X,ye.__webglTexture),Z(X,b,H),u&&b.mipmaps&&b.mipmaps.length>0)for(let he=0;he<b.mipmaps.length;he++)be(ne.__webglFramebuffer[he],P,b,r.COLOR_ATTACHMENT0,X,he);else be(ne.__webglFramebuffer,P,b,r.COLOR_ATTACHMENT0,X,0);L(b,H)&&C(X),n.unbindTexture()}P.depthBuffer&&He(P)}function Lt(P){const b=x(P)||u,ne=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let ye=0,xe=ne.length;ye<xe;ye++){const Me=ne[ye];if(L(Me,b)){const H=P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,X=s.get(Me).__webglTexture;n.bindTexture(H,X),C(H),n.unbindTexture()}}}function qe(P){if(u&&P.samples>0&&Be(P)===!1){const b=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],ne=P.width,ye=P.height;let xe=r.COLOR_BUFFER_BIT;const Me=[],H=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,X=s.get(P),he=P.isWebGLMultipleRenderTargets===!0;if(he)for(let Te=0;Te<b.length;Te++)n.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,X.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,X.__webglMultisampledFramebuffer),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,X.__webglFramebuffer);for(let Te=0;Te<b.length;Te++){Me.push(r.COLOR_ATTACHMENT0+Te),P.depthBuffer&&Me.push(H);const we=X.__ignoreDepthValues!==void 0?X.__ignoreDepthValues:!1;if(we===!1&&(P.depthBuffer&&(xe|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&(xe|=r.STENCIL_BUFFER_BIT)),he&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,X.__webglColorRenderbuffer[Te]),we===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[H]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[H])),he){const me=s.get(b[Te]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,me,0)}r.blitFramebuffer(0,0,ne,ye,0,0,ne,ye,xe,r.NEAREST),m&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Me)}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),he)for(let Te=0;Te<b.length;Te++){n.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.RENDERBUFFER,X.__webglColorRenderbuffer[Te]);const we=s.get(b[Te]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,X.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.TEXTURE_2D,we,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,X.__webglMultisampledFramebuffer)}}function Fe(P){return Math.min(a.maxSamples,P.samples)}function Be(P){const b=s.get(P);return u&&P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function St(P){const b=f.render.frame;_.get(P)!==b&&(_.set(P,b),P.update())}function st(P,b){const ne=P.colorSpace,ye=P.format,xe=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===yf||ne!==Vi&&ne!==Jn&&(At.getTransfer(ne)===It?u===!1?e.has("EXT_sRGB")===!0&&ye===hi?(P.format=yf,P.minFilter=Kn,P.generateMipmaps=!1):b=_g.sRGBToLinear(b):(ye!==hi||xe!==Mr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ne)),b}this.allocateTextureUnit=k,this.resetTextureUnits=pe,this.setTexture2D=re,this.setTexture2DArray=le,this.setTexture3D=V,this.setTextureCube=z,this.rebindTextures=Ge,this.setupRenderTarget=Q,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=qe,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=be,this.useMultisampledRTT=Be}function Rw(r,e,n){const s=n.isWebGL2;function a(l,f=Jn){let u;const h=At.getTransfer(f);if(l===Mr)return r.UNSIGNED_BYTE;if(l===cg)return r.UNSIGNED_SHORT_4_4_4_4;if(l===ug)return r.UNSIGNED_SHORT_5_5_5_1;if(l===u0)return r.BYTE;if(l===f0)return r.SHORT;if(l===Cf)return r.UNSIGNED_SHORT;if(l===lg)return r.INT;if(l===_r)return r.UNSIGNED_INT;if(l===xr)return r.FLOAT;if(l===Wo)return s?r.HALF_FLOAT:(u=e.get("OES_texture_half_float"),u!==null?u.HALF_FLOAT_OES:null);if(l===d0)return r.ALPHA;if(l===hi)return r.RGBA;if(l===h0)return r.LUMINANCE;if(l===p0)return r.LUMINANCE_ALPHA;if(l===Yr)return r.DEPTH_COMPONENT;if(l===Xs)return r.DEPTH_STENCIL;if(l===yf)return u=e.get("EXT_sRGB"),u!==null?u.SRGB_ALPHA_EXT:null;if(l===m0)return r.RED;if(l===fg)return r.RED_INTEGER;if(l===g0)return r.RG;if(l===dg)return r.RG_INTEGER;if(l===hg)return r.RGBA_INTEGER;if(l===Uu||l===Iu||l===Fu||l===Ou)if(h===It)if(u=e.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(l===Uu)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(l===Iu)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(l===Fu)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(l===Ou)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=e.get("WEBGL_compressed_texture_s3tc"),u!==null){if(l===Uu)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(l===Iu)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(l===Fu)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(l===Ou)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(l===Rp||l===Pp||l===Lp||l===Np)if(u=e.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(l===Rp)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(l===Pp)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(l===Lp)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(l===Np)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(l===pg)return u=e.get("WEBGL_compressed_texture_etc1"),u!==null?u.COMPRESSED_RGB_ETC1_WEBGL:null;if(l===Dp||l===Up)if(u=e.get("WEBGL_compressed_texture_etc"),u!==null){if(l===Dp)return h===It?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(l===Up)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(l===Ip||l===Fp||l===Op||l===kp||l===zp||l===Bp||l===Hp||l===Gp||l===Vp||l===Wp||l===jp||l===Xp||l===qp||l===Yp)if(u=e.get("WEBGL_compressed_texture_astc"),u!==null){if(l===Ip)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(l===Fp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(l===Op)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(l===kp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(l===zp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(l===Bp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(l===Hp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(l===Gp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(l===Vp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(l===Wp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(l===jp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(l===Xp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(l===qp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(l===Yp)return h===It?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(l===ku||l===$p||l===Kp)if(u=e.get("EXT_texture_compression_bptc"),u!==null){if(l===ku)return h===It?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(l===$p)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(l===Kp)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(l===v0||l===Zp||l===Qp||l===Jp)if(u=e.get("EXT_texture_compression_rgtc"),u!==null){if(l===ku)return u.COMPRESSED_RED_RGTC1_EXT;if(l===Zp)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(l===Qp)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(l===Jp)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return l===qr?s?r.UNSIGNED_INT_24_8:(u=e.get("WEBGL_depth_texture"),u!==null?u.UNSIGNED_INT_24_8_WEBGL:null):r[l]!==void 0?r[l]:null}return{convert:a}}class Pw extends Zn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Tl extends En{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Lw={type:"move"};class uf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new se,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new se),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new se,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new se),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const s of e.hand.values())this._getHandJoint(n,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,s){let a=null,l=null,f=null;const u=this._targetRay,h=this._grip,m=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(m&&e.hand){f=!0;for(const E of e.hand.values()){const x=n.getJointPose(E,s),g=this._getHandJoint(m,E);x!==null&&(g.matrix.fromArray(x.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=x.radius),g.visible=x!==null}const _=m.joints["index-finger-tip"],y=m.joints["thumb-tip"],v=_.position.distanceTo(y.position),S=.02,w=.005;m.inputState.pinching&&v>S+w?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&v<=S-w&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(l=n.getPose(e.gripSpace,s),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1));u!==null&&(a=n.getPose(e.targetRaySpace,s),a===null&&l!==null&&(a=l),a!==null&&(u.matrix.fromArray(a.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,a.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(a.linearVelocity)):u.hasLinearVelocity=!1,a.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(a.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(Lw)))}return u!==null&&(u.visible=a!==null),h!==null&&(h.visible=l!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const s=new Tl;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[n.jointName]=s,e.add(s)}return e.joints[n.jointName]}}class Nw extends $s{constructor(e,n){super();const s=this;let a=null,l=1,f=null,u="local-floor",h=1,m=null,_=null,y=null,v=null,S=null,w=null;const E=n.getContextAttributes();let x=null,g=null;const L=[],C=[],N=new bt;let j=null;const I=new Zn;I.layers.enable(1),I.viewport=new cn;const F=new Zn;F.layers.enable(2),F.viewport=new cn;const fe=[I,F],T=new Pw;T.layers.enable(1),T.layers.enable(2);let A=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ue=L[Z];return ue===void 0&&(ue=new uf,L[Z]=ue),ue.getTargetRaySpace()},this.getControllerGrip=function(Z){let ue=L[Z];return ue===void 0&&(ue=new uf,L[Z]=ue),ue.getGripSpace()},this.getHand=function(Z){let ue=L[Z];return ue===void 0&&(ue=new uf,L[Z]=ue),ue.getHandSpace()};function $(Z){const ue=C.indexOf(Z.inputSource);if(ue===-1)return;const ge=L[ue];ge!==void 0&&(ge.update(Z.inputSource,Z.frame,m||f),ge.dispatchEvent({type:Z.type,data:Z.inputSource}))}function pe(){a.removeEventListener("select",$),a.removeEventListener("selectstart",$),a.removeEventListener("selectend",$),a.removeEventListener("squeeze",$),a.removeEventListener("squeezestart",$),a.removeEventListener("squeezeend",$),a.removeEventListener("end",pe),a.removeEventListener("inputsourceschange",k);for(let Z=0;Z<L.length;Z++){const ue=C[Z];ue!==null&&(C[Z]=null,L[Z].disconnect(ue))}A=null,K=null,e.setRenderTarget(x),S=null,v=null,y=null,a=null,g=null,q.stop(),s.isPresenting=!1,e.setPixelRatio(j),e.setSize(N.width,N.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){l=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){u=Z,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(Z){m=Z},this.getBaseLayer=function(){return v!==null?v:S},this.getBinding=function(){return y},this.getFrame=function(){return w},this.getSession=function(){return a},this.setSession=async function(Z){if(a=Z,a!==null){if(x=e.getRenderTarget(),a.addEventListener("select",$),a.addEventListener("selectstart",$),a.addEventListener("selectend",$),a.addEventListener("squeeze",$),a.addEventListener("squeezestart",$),a.addEventListener("squeezeend",$),a.addEventListener("end",pe),a.addEventListener("inputsourceschange",k),E.xrCompatible!==!0&&await n.makeXRCompatible(),j=e.getPixelRatio(),e.getSize(N),a.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ue={antialias:a.renderState.layers===void 0?E.antialias:!0,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(a,n,ue),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),g=new Kr(S.framebufferWidth,S.framebufferHeight,{format:hi,type:Mr,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil})}else{let ue=null,ge=null,Ee=null;E.depth&&(Ee=E.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ue=E.stencil?Xs:Yr,ge=E.stencil?qr:_r);const be={colorFormat:n.RGBA8,depthFormat:Ee,scaleFactor:l};y=new XRWebGLBinding(a,n),v=y.createProjectionLayer(be),a.updateRenderState({layers:[v]}),e.setPixelRatio(1),e.setSize(v.textureWidth,v.textureHeight,!1),g=new Kr(v.textureWidth,v.textureHeight,{format:hi,type:Mr,depthTexture:new Lg(v.textureWidth,v.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0});const Ce=e.properties.get(g);Ce.__ignoreDepthValues=v.ignoreDepthValues}g.isXRRenderTarget=!0,this.setFoveation(h),m=null,f=await a.requestReferenceSpace(u),q.setContext(a),q.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode};function k(Z){for(let ue=0;ue<Z.removed.length;ue++){const ge=Z.removed[ue],Ee=C.indexOf(ge);Ee>=0&&(C[Ee]=null,L[Ee].disconnect(ge))}for(let ue=0;ue<Z.added.length;ue++){const ge=Z.added[ue];let Ee=C.indexOf(ge);if(Ee===-1){for(let Ce=0;Ce<L.length;Ce++)if(Ce>=C.length){C.push(ge),Ee=Ce;break}else if(C[Ce]===null){C[Ce]=ge,Ee=Ce;break}if(Ee===-1)break}const be=L[Ee];be&&be.connect(ge)}}const te=new se,re=new se;function le(Z,ue,ge){te.setFromMatrixPosition(ue.matrixWorld),re.setFromMatrixPosition(ge.matrixWorld);const Ee=te.distanceTo(re),be=ue.projectionMatrix.elements,Ce=ge.projectionMatrix.elements,Ie=be[14]/(be[10]-1),He=be[14]/(be[10]+1),Ge=(be[9]+1)/be[5],Q=(be[9]-1)/be[5],Lt=(be[8]-1)/be[0],qe=(Ce[8]+1)/Ce[0],Fe=Ie*Lt,Be=Ie*qe,St=Ee/(-Lt+qe),st=St*-Lt;ue.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(st),Z.translateZ(St),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert();const P=Ie+St,b=He+St,ne=Fe-st,ye=Be+(Ee-st),xe=Ge*He/b*P,Me=Q*He/b*P;Z.projectionMatrix.makePerspective(ne,ye,xe,Me,P,b),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}function V(Z,ue){ue===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ue.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(a===null)return;T.near=F.near=I.near=Z.near,T.far=F.far=I.far=Z.far,(A!==T.near||K!==T.far)&&(a.updateRenderState({depthNear:T.near,depthFar:T.far}),A=T.near,K=T.far);const ue=Z.parent,ge=T.cameras;V(T,ue);for(let Ee=0;Ee<ge.length;Ee++)V(ge[Ee],ue);ge.length===2?le(T,I,F):T.projectionMatrix.copy(I.projectionMatrix),z(Z,T,ue)};function z(Z,ue,ge){ge===null?Z.matrix.copy(ue.matrixWorld):(Z.matrix.copy(ge.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ue.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ue.projectionMatrix),Z.projectionMatrixInverse.copy(ue.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Sf*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return T},this.getFoveation=function(){if(!(v===null&&S===null))return h},this.setFoveation=function(Z){h=Z,v!==null&&(v.fixedFoveation=Z),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=Z)};let Y=null;function D(Z,ue){if(_=ue.getViewerPose(m||f),w=ue,_!==null){const ge=_.views;S!==null&&(e.setRenderTargetFramebuffer(g,S.framebuffer),e.setRenderTarget(g));let Ee=!1;ge.length!==T.cameras.length&&(T.cameras.length=0,Ee=!0);for(let be=0;be<ge.length;be++){const Ce=ge[be];let Ie=null;if(S!==null)Ie=S.getViewport(Ce);else{const Ge=y.getViewSubImage(v,Ce);Ie=Ge.viewport,be===0&&(e.setRenderTargetTextures(g,Ge.colorTexture,v.ignoreDepthValues?void 0:Ge.depthStencilTexture),e.setRenderTarget(g))}let He=fe[be];He===void 0&&(He=new Zn,He.layers.enable(be),He.viewport=new cn,fe[be]=He),He.matrix.fromArray(Ce.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Ce.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),be===0&&(T.matrix.copy(He.matrix),T.matrix.decompose(T.position,T.quaternion,T.scale)),Ee===!0&&T.cameras.push(He)}}for(let ge=0;ge<L.length;ge++){const Ee=C[ge],be=L[ge];Ee!==null&&be!==void 0&&be.update(Ee,ue,m||f)}Y&&Y(Z,ue),ue.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ue}),w=null}const q=new Rg;q.setAnimationLoop(D),this.setAnimationLoop=function(Z){Y=Z},this.dispose=function(){}}}function Dw(r,e){function n(x,g){x.matrixAutoUpdate===!0&&x.updateMatrix(),g.value.copy(x.matrix)}function s(x,g){g.color.getRGB(x.fogColor.value,Tg(r)),g.isFog?(x.fogNear.value=g.near,x.fogFar.value=g.far):g.isFogExp2&&(x.fogDensity.value=g.density)}function a(x,g,L,C,N){g.isMeshBasicMaterial||g.isMeshLambertMaterial?l(x,g):g.isMeshToonMaterial?(l(x,g),y(x,g)):g.isMeshPhongMaterial?(l(x,g),_(x,g)):g.isMeshStandardMaterial?(l(x,g),v(x,g),g.isMeshPhysicalMaterial&&S(x,g,N)):g.isMeshMatcapMaterial?(l(x,g),w(x,g)):g.isMeshDepthMaterial?l(x,g):g.isMeshDistanceMaterial?(l(x,g),E(x,g)):g.isMeshNormalMaterial?l(x,g):g.isLineBasicMaterial?(f(x,g),g.isLineDashedMaterial&&u(x,g)):g.isPointsMaterial?h(x,g,L,C):g.isSpriteMaterial?m(x,g):g.isShadowMaterial?(x.color.value.copy(g.color),x.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function l(x,g){x.opacity.value=g.opacity,g.color&&x.diffuse.value.copy(g.color),g.emissive&&x.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(x.map.value=g.map,n(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,n(g.alphaMap,x.alphaMapTransform)),g.bumpMap&&(x.bumpMap.value=g.bumpMap,n(g.bumpMap,x.bumpMapTransform),x.bumpScale.value=g.bumpScale,g.side===Un&&(x.bumpScale.value*=-1)),g.normalMap&&(x.normalMap.value=g.normalMap,n(g.normalMap,x.normalMapTransform),x.normalScale.value.copy(g.normalScale),g.side===Un&&x.normalScale.value.negate()),g.displacementMap&&(x.displacementMap.value=g.displacementMap,n(g.displacementMap,x.displacementMapTransform),x.displacementScale.value=g.displacementScale,x.displacementBias.value=g.displacementBias),g.emissiveMap&&(x.emissiveMap.value=g.emissiveMap,n(g.emissiveMap,x.emissiveMapTransform)),g.specularMap&&(x.specularMap.value=g.specularMap,n(g.specularMap,x.specularMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest);const L=e.get(g).envMap;if(L&&(x.envMap.value=L,x.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=g.reflectivity,x.ior.value=g.ior,x.refractionRatio.value=g.refractionRatio),g.lightMap){x.lightMap.value=g.lightMap;const C=r._useLegacyLights===!0?Math.PI:1;x.lightMapIntensity.value=g.lightMapIntensity*C,n(g.lightMap,x.lightMapTransform)}g.aoMap&&(x.aoMap.value=g.aoMap,x.aoMapIntensity.value=g.aoMapIntensity,n(g.aoMap,x.aoMapTransform))}function f(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,g.map&&(x.map.value=g.map,n(g.map,x.mapTransform))}function u(x,g){x.dashSize.value=g.dashSize,x.totalSize.value=g.dashSize+g.gapSize,x.scale.value=g.scale}function h(x,g,L,C){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.size.value=g.size*L,x.scale.value=C*.5,g.map&&(x.map.value=g.map,n(g.map,x.uvTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,n(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function m(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.rotation.value=g.rotation,g.map&&(x.map.value=g.map,n(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,n(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function _(x,g){x.specular.value.copy(g.specular),x.shininess.value=Math.max(g.shininess,1e-4)}function y(x,g){g.gradientMap&&(x.gradientMap.value=g.gradientMap)}function v(x,g){x.metalness.value=g.metalness,g.metalnessMap&&(x.metalnessMap.value=g.metalnessMap,n(g.metalnessMap,x.metalnessMapTransform)),x.roughness.value=g.roughness,g.roughnessMap&&(x.roughnessMap.value=g.roughnessMap,n(g.roughnessMap,x.roughnessMapTransform)),e.get(g).envMap&&(x.envMapIntensity.value=g.envMapIntensity)}function S(x,g,L){x.ior.value=g.ior,g.sheen>0&&(x.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),x.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(x.sheenColorMap.value=g.sheenColorMap,n(g.sheenColorMap,x.sheenColorMapTransform)),g.sheenRoughnessMap&&(x.sheenRoughnessMap.value=g.sheenRoughnessMap,n(g.sheenRoughnessMap,x.sheenRoughnessMapTransform))),g.clearcoat>0&&(x.clearcoat.value=g.clearcoat,x.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(x.clearcoatMap.value=g.clearcoatMap,n(g.clearcoatMap,x.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,n(g.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(x.clearcoatNormalMap.value=g.clearcoatNormalMap,n(g.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Un&&x.clearcoatNormalScale.value.negate())),g.iridescence>0&&(x.iridescence.value=g.iridescence,x.iridescenceIOR.value=g.iridescenceIOR,x.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(x.iridescenceMap.value=g.iridescenceMap,n(g.iridescenceMap,x.iridescenceMapTransform)),g.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=g.iridescenceThicknessMap,n(g.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),g.transmission>0&&(x.transmission.value=g.transmission,x.transmissionSamplerMap.value=L.texture,x.transmissionSamplerSize.value.set(L.width,L.height),g.transmissionMap&&(x.transmissionMap.value=g.transmissionMap,n(g.transmissionMap,x.transmissionMapTransform)),x.thickness.value=g.thickness,g.thicknessMap&&(x.thicknessMap.value=g.thicknessMap,n(g.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=g.attenuationDistance,x.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(x.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(x.anisotropyMap.value=g.anisotropyMap,n(g.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=g.specularIntensity,x.specularColor.value.copy(g.specularColor),g.specularColorMap&&(x.specularColorMap.value=g.specularColorMap,n(g.specularColorMap,x.specularColorMapTransform)),g.specularIntensityMap&&(x.specularIntensityMap.value=g.specularIntensityMap,n(g.specularIntensityMap,x.specularIntensityMapTransform))}function w(x,g){g.matcap&&(x.matcap.value=g.matcap)}function E(x,g){const L=e.get(g).light;x.referencePosition.value.setFromMatrixPosition(L.matrixWorld),x.nearDistance.value=L.shadow.camera.near,x.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:a}}function Uw(r,e,n,s){let a={},l={},f=[];const u=n.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function h(L,C){const N=C.program;s.uniformBlockBinding(L,N)}function m(L,C){let N=a[L.id];N===void 0&&(w(L),N=_(L),a[L.id]=N,L.addEventListener("dispose",x));const j=C.program;s.updateUBOMapping(L,j);const I=e.render.frame;l[L.id]!==I&&(v(L),l[L.id]=I)}function _(L){const C=y();L.__bindingPointIndex=C;const N=r.createBuffer(),j=L.__size,I=L.usage;return r.bindBuffer(r.UNIFORM_BUFFER,N),r.bufferData(r.UNIFORM_BUFFER,j,I),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,C,N),N}function y(){for(let L=0;L<u;L++)if(f.indexOf(L)===-1)return f.push(L),L;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(L){const C=a[L.id],N=L.uniforms,j=L.__cache;r.bindBuffer(r.UNIFORM_BUFFER,C);for(let I=0,F=N.length;I<F;I++){const fe=Array.isArray(N[I])?N[I]:[N[I]];for(let T=0,A=fe.length;T<A;T++){const K=fe[T];if(S(K,I,T,j)===!0){const $=K.__offset,pe=Array.isArray(K.value)?K.value:[K.value];let k=0;for(let te=0;te<pe.length;te++){const re=pe[te],le=E(re);typeof re=="number"||typeof re=="boolean"?(K.__data[0]=re,r.bufferSubData(r.UNIFORM_BUFFER,$+k,K.__data)):re.isMatrix3?(K.__data[0]=re.elements[0],K.__data[1]=re.elements[1],K.__data[2]=re.elements[2],K.__data[3]=0,K.__data[4]=re.elements[3],K.__data[5]=re.elements[4],K.__data[6]=re.elements[5],K.__data[7]=0,K.__data[8]=re.elements[6],K.__data[9]=re.elements[7],K.__data[10]=re.elements[8],K.__data[11]=0):(re.toArray(K.__data,k),k+=le.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,$,K.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(L,C,N,j){const I=L.value,F=C+"_"+N;if(j[F]===void 0)return typeof I=="number"||typeof I=="boolean"?j[F]=I:j[F]=I.clone(),!0;{const fe=j[F];if(typeof I=="number"||typeof I=="boolean"){if(fe!==I)return j[F]=I,!0}else if(fe.equals(I)===!1)return fe.copy(I),!0}return!1}function w(L){const C=L.uniforms;let N=0;const j=16;for(let F=0,fe=C.length;F<fe;F++){const T=Array.isArray(C[F])?C[F]:[C[F]];for(let A=0,K=T.length;A<K;A++){const $=T[A],pe=Array.isArray($.value)?$.value:[$.value];for(let k=0,te=pe.length;k<te;k++){const re=pe[k],le=E(re),V=N%j;V!==0&&j-V<le.boundary&&(N+=j-V),$.__data=new Float32Array(le.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=N,N+=le.storage}}}const I=N%j;return I>0&&(N+=j-I),L.__size=N,L.__cache={},this}function E(L){const C={boundary:0,storage:0};return typeof L=="number"||typeof L=="boolean"?(C.boundary=4,C.storage=4):L.isVector2?(C.boundary=8,C.storage=8):L.isVector3||L.isColor?(C.boundary=16,C.storage=12):L.isVector4?(C.boundary=16,C.storage=16):L.isMatrix3?(C.boundary=48,C.storage=48):L.isMatrix4?(C.boundary=64,C.storage=64):L.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",L),C}function x(L){const C=L.target;C.removeEventListener("dispose",x);const N=f.indexOf(C.__bindingPointIndex);f.splice(N,1),r.deleteBuffer(a[C.id]),delete a[C.id],delete l[C.id]}function g(){for(const L in a)r.deleteBuffer(a[L]);f=[],a={},l={}}return{bind:h,update:m,dispose:g}}class Df{constructor(e={}){const{canvas:n=P0(),context:s=null,depth:a=!0,stencil:l=!0,alpha:f=!1,antialias:u=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:m=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:y=!1}=e;this.isWebGLRenderer=!0;let v;s!==null?v=s.getContextAttributes().alpha:v=f;const S=new Uint32Array(4),w=new Int32Array(4);let E=null,x=null;const g=[],L=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ln,this._useLegacyLights=!1,this.toneMapping=Sr,this.toneMappingExposure=1;const C=this;let N=!1,j=0,I=0,F=null,fe=-1,T=null;const A=new cn,K=new cn;let $=null;const pe=new Mt(0);let k=0,te=n.width,re=n.height,le=1,V=null,z=null;const Y=new cn(0,0,te,re),D=new cn(0,0,te,re);let q=!1;const Z=new Cg;let ue=!1,ge=!1,Ee=null;const be=new Zt,Ce=new bt,Ie=new se,He={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ge(){return F===null?le:1}let Q=s;function Lt(R,ee){for(let ce=0;ce<R.length;ce++){const de=R[ce],ae=n.getContext(de,ee);if(ae!==null)return ae}return null}try{const R={alpha:!0,depth:a,stencil:l,antialias:u,premultipliedAlpha:h,preserveDrawingBuffer:m,powerPreference:_,failIfMajorPerformanceCaveat:y};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${bf}`),n.addEventListener("webglcontextlost",Re,!1),n.addEventListener("webglcontextrestored",G,!1),n.addEventListener("webglcontextcreationerror",Pe,!1),Q===null){const ee=["webgl2","webgl","experimental-webgl"];if(C.isWebGL1Renderer===!0&&ee.shift(),Q=Lt(ee,R),Q===null)throw Lt(ee)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&Q instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),Q.getShaderPrecisionFormat===void 0&&(Q.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let qe,Fe,Be,St,st,P,b,ne,ye,xe,Me,H,X,he,Te,we,me,lt,Ke,Ze,Ye,We,ot,vt;function Ct(){qe=new WM(Q),Fe=new kM(Q,qe,e),qe.init(Fe),We=new Rw(Q,qe,Fe),Be=new bw(Q,qe,Fe),St=new qM(Q),st=new hw,P=new Cw(Q,qe,Be,st,Fe,We,St),b=new BM(C),ne=new VM(C),ye=new ty(Q,Fe),ot=new FM(Q,qe,ye,Fe),xe=new jM(Q,ye,St,ot),Me=new ZM(Q,xe,ye,St),Ke=new KM(Q,Fe,P),we=new zM(st),H=new dw(C,b,ne,qe,Fe,ot,we),X=new Dw(C,st),he=new mw,Te=new Sw(qe,Fe),lt=new IM(C,b,ne,Be,Me,v,h),me=new Aw(C,Me,Fe),vt=new Uw(Q,St,Fe,Be),Ze=new OM(Q,qe,St,Fe),Ye=new XM(Q,qe,St,Fe),St.programs=H.programs,C.capabilities=Fe,C.extensions=qe,C.properties=st,C.renderLists=he,C.shadowMap=me,C.state=Be,C.info=St}Ct();const ct=new Nw(C,Q);this.xr=ct,this.getContext=function(){return Q},this.getContextAttributes=function(){return Q.getContextAttributes()},this.forceContextLoss=function(){const R=qe.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=qe.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(R){R!==void 0&&(le=R,this.setSize(te,re,!1))},this.getSize=function(R){return R.set(te,re)},this.setSize=function(R,ee,ce=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}te=R,re=ee,n.width=Math.floor(R*le),n.height=Math.floor(ee*le),ce===!0&&(n.style.width=R+"px",n.style.height=ee+"px"),this.setViewport(0,0,R,ee)},this.getDrawingBufferSize=function(R){return R.set(te*le,re*le).floor()},this.setDrawingBufferSize=function(R,ee,ce){te=R,re=ee,le=ce,n.width=Math.floor(R*ce),n.height=Math.floor(ee*ce),this.setViewport(0,0,R,ee)},this.getCurrentViewport=function(R){return R.copy(A)},this.getViewport=function(R){return R.copy(Y)},this.setViewport=function(R,ee,ce,de){R.isVector4?Y.set(R.x,R.y,R.z,R.w):Y.set(R,ee,ce,de),Be.viewport(A.copy(Y).multiplyScalar(le).floor())},this.getScissor=function(R){return R.copy(D)},this.setScissor=function(R,ee,ce,de){R.isVector4?D.set(R.x,R.y,R.z,R.w):D.set(R,ee,ce,de),Be.scissor(K.copy(D).multiplyScalar(le).floor())},this.getScissorTest=function(){return q},this.setScissorTest=function(R){Be.setScissorTest(q=R)},this.setOpaqueSort=function(R){V=R},this.setTransparentSort=function(R){z=R},this.getClearColor=function(R){return R.copy(lt.getClearColor())},this.setClearColor=function(){lt.setClearColor.apply(lt,arguments)},this.getClearAlpha=function(){return lt.getClearAlpha()},this.setClearAlpha=function(){lt.setClearAlpha.apply(lt,arguments)},this.clear=function(R=!0,ee=!0,ce=!0){let de=0;if(R){let ae=!1;if(F!==null){const De=F.texture.format;ae=De===hg||De===dg||De===fg}if(ae){const De=F.texture.type,$e=De===Mr||De===_r||De===Cf||De===qr||De===cg||De===ug,tt=lt.getClearColor(),Oe=lt.getClearAlpha(),ut=tt.r,rt=tt.g,at=tt.b;$e?(S[0]=ut,S[1]=rt,S[2]=at,S[3]=Oe,Q.clearBufferuiv(Q.COLOR,0,S)):(w[0]=ut,w[1]=rt,w[2]=at,w[3]=Oe,Q.clearBufferiv(Q.COLOR,0,w))}else de|=Q.COLOR_BUFFER_BIT}ee&&(de|=Q.DEPTH_BUFFER_BIT),ce&&(de|=Q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q.clear(de)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Re,!1),n.removeEventListener("webglcontextrestored",G,!1),n.removeEventListener("webglcontextcreationerror",Pe,!1),he.dispose(),Te.dispose(),st.dispose(),b.dispose(),ne.dispose(),Me.dispose(),ot.dispose(),vt.dispose(),H.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",en),ct.removeEventListener("sessionend",xt),Ee&&(Ee.dispose(),Ee=null),Yt.stop()};function Re(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function G(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const R=St.autoReset,ee=me.enabled,ce=me.autoUpdate,de=me.needsUpdate,ae=me.type;Ct(),St.autoReset=R,me.enabled=ee,me.autoUpdate=ce,me.needsUpdate=de,me.type=ae}function Pe(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Ne(R){const ee=R.target;ee.removeEventListener("dispose",Ne),nt(ee)}function nt(R){Qe(R),st.remove(R)}function Qe(R){const ee=st.get(R).programs;ee!==void 0&&(ee.forEach(function(ce){H.releaseProgram(ce)}),R.isShaderMaterial&&H.releaseShaderCache(R))}this.renderBufferDirect=function(R,ee,ce,de,ae,De){ee===null&&(ee=He);const $e=ae.isMesh&&ae.matrixWorld.determinant()<0,tt=Xl(R,ee,ce,de,ae);Be.setMaterial(de,$e);let Oe=ce.index,ut=1;if(de.wireframe===!0){if(Oe=xe.getWireframeAttribute(ce),Oe===void 0)return;ut=2}const rt=ce.drawRange,at=ce.attributes.position;let Rt=rt.start*ut,vn=(rt.start+rt.count)*ut;De!==null&&(Rt=Math.max(Rt,De.start*ut),vn=Math.min(vn,(De.start+De.count)*ut)),Oe!==null?(Rt=Math.max(Rt,0),vn=Math.min(vn,Oe.count)):at!=null&&(Rt=Math.max(Rt,0),vn=Math.min(vn,at.count));const Vt=vn-Rt;if(Vt<0||Vt===1/0)return;ot.setup(ae,de,tt,ce,Oe);let wn,gt=Ze;if(Oe!==null&&(wn=ye.get(Oe),gt=Ye,gt.setIndex(wn)),ae.isMesh)de.wireframe===!0?(Be.setLineWidth(de.wireframeLinewidth*Ge()),gt.setMode(Q.LINES)):gt.setMode(Q.TRIANGLES);else if(ae.isLine){let dt=de.linewidth;dt===void 0&&(dt=1),Be.setLineWidth(dt*Ge()),ae.isLineSegments?gt.setMode(Q.LINES):ae.isLineLoop?gt.setMode(Q.LINE_LOOP):gt.setMode(Q.LINE_STRIP)}else ae.isPoints?gt.setMode(Q.POINTS):ae.isSprite&&gt.setMode(Q.TRIANGLES);if(ae.isBatchedMesh)gt.renderMultiDraw(ae._multiDrawStarts,ae._multiDrawCounts,ae._multiDrawCount);else if(ae.isInstancedMesh)gt.renderInstances(Rt,Vt,ae.count);else if(ce.isInstancedBufferGeometry){const dt=ce._maxInstanceCount!==void 0?ce._maxInstanceCount:1/0,_n=Math.min(ce.instanceCount,dt);gt.renderInstances(Rt,Vt,_n)}else gt.render(Rt,Vt)};function Et(R,ee,ce){R.transparent===!0&&R.side===Hi&&R.forceSinglePass===!1?(R.side=Un,R.needsUpdate=!0,Wi(R,ee,ce),R.side=Er,R.needsUpdate=!0,Wi(R,ee,ce),R.side=Hi):Wi(R,ee,ce)}this.compile=function(R,ee,ce=null){ce===null&&(ce=R),x=Te.get(ce),x.init(),L.push(x),ce.traverseVisible(function(ae){ae.isLight&&ae.layers.test(ee.layers)&&(x.pushLight(ae),ae.castShadow&&x.pushShadow(ae))}),R!==ce&&R.traverseVisible(function(ae){ae.isLight&&ae.layers.test(ee.layers)&&(x.pushLight(ae),ae.castShadow&&x.pushShadow(ae))}),x.setupLights(C._useLegacyLights);const de=new Set;return R.traverse(function(ae){const De=ae.material;if(De)if(Array.isArray(De))for(let $e=0;$e<De.length;$e++){const tt=De[$e];Et(tt,ce,ae),de.add(tt)}else Et(De,ce,ae),de.add(De)}),L.pop(),x=null,de},this.compileAsync=function(R,ee,ce=null){const de=this.compile(R,ee,ce);return new Promise(ae=>{function De(){if(de.forEach(function($e){st.get($e).currentProgram.isReady()&&de.delete($e)}),de.size===0){ae(R);return}setTimeout(De,10)}qe.get("KHR_parallel_shader_compile")!==null?De():setTimeout(De,10)})};let wt=null;function Bt(R){wt&&wt(R)}function en(){Yt.stop()}function xt(){Yt.start()}const Yt=new Rg;Yt.setAnimationLoop(Bt),typeof self<"u"&&Yt.setContext(self),this.setAnimationLoop=function(R){wt=R,ct.setAnimationLoop(R),R===null?Yt.stop():Yt.start()},ct.addEventListener("sessionstart",en),ct.addEventListener("sessionend",xt),this.render=function(R,ee){if(ee!==void 0&&ee.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),ee.parent===null&&ee.matrixWorldAutoUpdate===!0&&ee.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(ee),ee=ct.getCamera()),R.isScene===!0&&R.onBeforeRender(C,R,ee,F),x=Te.get(R,L.length),x.init(),L.push(x),be.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),Z.setFromProjectionMatrix(be),ge=this.localClippingEnabled,ue=we.init(this.clippingPlanes,ge),E=he.get(R,g.length),E.init(),g.push(E),un(R,ee,0,C.sortObjects),E.finish(),C.sortObjects===!0&&E.sort(V,z),this.info.render.frame++,ue===!0&&we.beginShadows();const ce=x.state.shadowsArray;if(me.render(ce,R,ee),ue===!0&&we.endShadows(),this.info.autoReset===!0&&this.info.reset(),lt.render(E,R),x.setupLights(C._useLegacyLights),ee.isArrayCamera){const de=ee.cameras;for(let ae=0,De=de.length;ae<De;ae++){const $e=de[ae];Ko(E,R,$e,$e.viewport)}}else Ko(E,R,ee);F!==null&&(P.updateMultisampleRenderTarget(F),P.updateRenderTargetMipmap(F)),R.isScene===!0&&R.onAfterRender(C,R,ee),ot.resetDefaultState(),fe=-1,T=null,L.pop(),L.length>0?x=L[L.length-1]:x=null,g.pop(),g.length>0?E=g[g.length-1]:E=null};function un(R,ee,ce,de){if(R.visible===!1)return;if(R.layers.test(ee.layers)){if(R.isGroup)ce=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(ee);else if(R.isLight)x.pushLight(R),R.castShadow&&x.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Z.intersectsSprite(R)){de&&Ie.setFromMatrixPosition(R.matrixWorld).applyMatrix4(be);const $e=Me.update(R),tt=R.material;tt.visible&&E.push(R,$e,tt,ce,Ie.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Z.intersectsObject(R))){const $e=Me.update(R),tt=R.material;if(de&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ie.copy(R.boundingSphere.center)):($e.boundingSphere===null&&$e.computeBoundingSphere(),Ie.copy($e.boundingSphere.center)),Ie.applyMatrix4(R.matrixWorld).applyMatrix4(be)),Array.isArray(tt)){const Oe=$e.groups;for(let ut=0,rt=Oe.length;ut<rt;ut++){const at=Oe[ut],Rt=tt[at.materialIndex];Rt&&Rt.visible&&E.push(R,$e,Rt,ce,Ie.z,at)}}else tt.visible&&E.push(R,$e,tt,ce,Ie.z,null)}}const De=R.children;for(let $e=0,tt=De.length;$e<tt;$e++)un(De[$e],ee,ce,de)}function Ko(R,ee,ce,de){const ae=R.opaque,De=R.transmissive,$e=R.transparent;x.setupLightsView(ce),ue===!0&&we.setGlobalState(C.clippingPlanes,ce),De.length>0&&wr(ae,De,ee,ce),de&&Be.viewport(A.copy(de)),ae.length>0&&Mi(ae,ee,ce),De.length>0&&Mi(De,ee,ce),$e.length>0&&Mi($e,ee,ce),Be.buffers.depth.setTest(!0),Be.buffers.depth.setMask(!0),Be.buffers.color.setMask(!0),Be.setPolygonOffset(!1)}function wr(R,ee,ce,de){if((ce.isScene===!0?ce.overrideMaterial:null)!==null)return;const De=Fe.isWebGL2;Ee===null&&(Ee=new Kr(1,1,{generateMipmaps:!0,type:qe.has("EXT_color_buffer_half_float")?Wo:Mr,minFilter:Vo,samples:De?4:0})),C.getDrawingBufferSize(Ce),De?Ee.setSize(Ce.x,Ce.y):Ee.setSize(Mf(Ce.x),Mf(Ce.y));const $e=C.getRenderTarget();C.setRenderTarget(Ee),C.getClearColor(pe),k=C.getClearAlpha(),k<1&&C.setClearColor(16777215,.5),C.clear();const tt=C.toneMapping;C.toneMapping=Sr,Mi(R,ce,de),P.updateMultisampleRenderTarget(Ee),P.updateRenderTargetMipmap(Ee);let Oe=!1;for(let ut=0,rt=ee.length;ut<rt;ut++){const at=ee[ut],Rt=at.object,vn=at.geometry,Vt=at.material,wn=at.group;if(Vt.side===Hi&&Rt.layers.test(de.layers)){const gt=Vt.side;Vt.side=Un,Vt.needsUpdate=!0,Tr(Rt,ce,de,vn,Vt,wn),Vt.side=gt,Vt.needsUpdate=!0,Oe=!0}}Oe===!0&&(P.updateMultisampleRenderTarget(Ee),P.updateRenderTargetMipmap(Ee)),C.setRenderTarget($e),C.setClearColor(pe,k),C.toneMapping=tt}function Mi(R,ee,ce){const de=ee.isScene===!0?ee.overrideMaterial:null;for(let ae=0,De=R.length;ae<De;ae++){const $e=R[ae],tt=$e.object,Oe=$e.geometry,ut=de===null?$e.material:de,rt=$e.group;tt.layers.test(ce.layers)&&Tr(tt,ee,ce,Oe,ut,rt)}}function Tr(R,ee,ce,de,ae,De){R.onBeforeRender(C,ee,ce,de,ae,De),R.modelViewMatrix.multiplyMatrices(ce.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ae.onBeforeRender(C,ee,ce,de,R,De),ae.transparent===!0&&ae.side===Hi&&ae.forceSinglePass===!1?(ae.side=Un,ae.needsUpdate=!0,C.renderBufferDirect(ce,ee,de,ae,R,De),ae.side=Er,ae.needsUpdate=!0,C.renderBufferDirect(ce,ee,de,ae,R,De),ae.side=Hi):C.renderBufferDirect(ce,ee,de,ae,R,De),R.onAfterRender(C,ee,ce,de,ae,De)}function Wi(R,ee,ce){ee.isScene!==!0&&(ee=He);const de=st.get(R),ae=x.state.lights,De=x.state.shadowsArray,$e=ae.state.version,tt=H.getParameters(R,ae.state,De,ee,ce),Oe=H.getProgramCacheKey(tt);let ut=de.programs;de.environment=R.isMeshStandardMaterial?ee.environment:null,de.fog=ee.fog,de.envMap=(R.isMeshStandardMaterial?ne:b).get(R.envMap||de.environment),ut===void 0&&(R.addEventListener("dispose",Ne),ut=new Map,de.programs=ut);let rt=ut.get(Oe);if(rt!==void 0){if(de.currentProgram===rt&&de.lightsStateVersion===$e)return Qo(R,tt),rt}else tt.uniforms=H.getUniforms(R),R.onBuild(ce,tt,C),R.onBeforeCompile(tt,C),rt=H.acquireProgram(tt,Oe),ut.set(Oe,rt),de.uniforms=tt.uniforms;const at=de.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(at.clippingPlanes=we.uniform),Qo(R,tt),de.needsLights=Jo(R),de.lightsStateVersion=$e,de.needsLights&&(at.ambientLightColor.value=ae.state.ambient,at.lightProbe.value=ae.state.probe,at.directionalLights.value=ae.state.directional,at.directionalLightShadows.value=ae.state.directionalShadow,at.spotLights.value=ae.state.spot,at.spotLightShadows.value=ae.state.spotShadow,at.rectAreaLights.value=ae.state.rectArea,at.ltc_1.value=ae.state.rectAreaLTC1,at.ltc_2.value=ae.state.rectAreaLTC2,at.pointLights.value=ae.state.point,at.pointLightShadows.value=ae.state.pointShadow,at.hemisphereLights.value=ae.state.hemi,at.directionalShadowMap.value=ae.state.directionalShadowMap,at.directionalShadowMatrix.value=ae.state.directionalShadowMatrix,at.spotShadowMap.value=ae.state.spotShadowMap,at.spotLightMatrix.value=ae.state.spotLightMatrix,at.spotLightMap.value=ae.state.spotLightMap,at.pointShadowMap.value=ae.state.pointShadowMap,at.pointShadowMatrix.value=ae.state.pointShadowMatrix),de.currentProgram=rt,de.uniformsList=null,rt}function Zo(R){if(R.uniformsList===null){const ee=R.currentProgram.getUniforms();R.uniformsList=Dl.seqWithValue(ee.seq,R.uniforms)}return R.uniformsList}function Qo(R,ee){const ce=st.get(R);ce.outputColorSpace=ee.outputColorSpace,ce.batching=ee.batching,ce.instancing=ee.instancing,ce.instancingColor=ee.instancingColor,ce.skinning=ee.skinning,ce.morphTargets=ee.morphTargets,ce.morphNormals=ee.morphNormals,ce.morphColors=ee.morphColors,ce.morphTargetsCount=ee.morphTargetsCount,ce.numClippingPlanes=ee.numClippingPlanes,ce.numIntersection=ee.numClipIntersection,ce.vertexAlphas=ee.vertexAlphas,ce.vertexTangents=ee.vertexTangents,ce.toneMapping=ee.toneMapping}function Xl(R,ee,ce,de,ae){ee.isScene!==!0&&(ee=He),P.resetTextureUnits();const De=ee.fog,$e=de.isMeshStandardMaterial?ee.environment:null,tt=F===null?C.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Vi,Oe=(de.isMeshStandardMaterial?ne:b).get(de.envMap||$e),ut=de.vertexColors===!0&&!!ce.attributes.color&&ce.attributes.color.itemSize===4,rt=!!ce.attributes.tangent&&(!!de.normalMap||de.anisotropy>0),at=!!ce.morphAttributes.position,Rt=!!ce.morphAttributes.normal,vn=!!ce.morphAttributes.color;let Vt=Sr;de.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(Vt=C.toneMapping);const wn=ce.morphAttributes.position||ce.morphAttributes.normal||ce.morphAttributes.color,gt=wn!==void 0?wn.length:0,dt=st.get(de),_n=x.state.lights;if(ue===!0&&(ge===!0||R!==T)){const Tn=R===T&&de.id===fe;we.setState(de,R,Tn)}let Ft=!1;de.version===dt.__version?(dt.needsLights&&dt.lightsStateVersion!==_n.state.version||dt.outputColorSpace!==tt||ae.isBatchedMesh&&dt.batching===!1||!ae.isBatchedMesh&&dt.batching===!0||ae.isInstancedMesh&&dt.instancing===!1||!ae.isInstancedMesh&&dt.instancing===!0||ae.isSkinnedMesh&&dt.skinning===!1||!ae.isSkinnedMesh&&dt.skinning===!0||ae.isInstancedMesh&&dt.instancingColor===!0&&ae.instanceColor===null||ae.isInstancedMesh&&dt.instancingColor===!1&&ae.instanceColor!==null||dt.envMap!==Oe||de.fog===!0&&dt.fog!==De||dt.numClippingPlanes!==void 0&&(dt.numClippingPlanes!==we.numPlanes||dt.numIntersection!==we.numIntersection)||dt.vertexAlphas!==ut||dt.vertexTangents!==rt||dt.morphTargets!==at||dt.morphNormals!==Rt||dt.morphColors!==vn||dt.toneMapping!==Vt||Fe.isWebGL2===!0&&dt.morphTargetsCount!==gt)&&(Ft=!0):(Ft=!0,dt.__version=de.version);let wi=dt.currentProgram;Ft===!0&&(wi=Wi(de,ee,ae));let ea=!1,mi=!1,ji=!1;const Ht=wi.getUniforms(),Gn=dt.uniforms;if(Be.useProgram(wi.program)&&(ea=!0,mi=!0,ji=!0),de.id!==fe&&(fe=de.id,mi=!0),ea||T!==R){Ht.setValue(Q,"projectionMatrix",R.projectionMatrix),Ht.setValue(Q,"viewMatrix",R.matrixWorldInverse);const Tn=Ht.map.cameraPosition;Tn!==void 0&&Tn.setValue(Q,Ie.setFromMatrixPosition(R.matrixWorld)),Fe.logarithmicDepthBuffer&&Ht.setValue(Q,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(de.isMeshPhongMaterial||de.isMeshToonMaterial||de.isMeshLambertMaterial||de.isMeshBasicMaterial||de.isMeshStandardMaterial||de.isShaderMaterial)&&Ht.setValue(Q,"isOrthographic",R.isOrthographicCamera===!0),T!==R&&(T=R,mi=!0,ji=!0)}if(ae.isSkinnedMesh){Ht.setOptional(Q,ae,"bindMatrix"),Ht.setOptional(Q,ae,"bindMatrixInverse");const Tn=ae.skeleton;Tn&&(Fe.floatVertexTextures?(Tn.boneTexture===null&&Tn.computeBoneTexture(),Ht.setValue(Q,"boneTexture",Tn.boneTexture,P)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ae.isBatchedMesh&&(Ht.setOptional(Q,ae,"batchingTexture"),Ht.setValue(Q,"batchingTexture",ae._matricesTexture,P));const Qs=ce.morphAttributes;if((Qs.position!==void 0||Qs.normal!==void 0||Qs.color!==void 0&&Fe.isWebGL2===!0)&&Ke.update(ae,ce,wi),(mi||dt.receiveShadow!==ae.receiveShadow)&&(dt.receiveShadow=ae.receiveShadow,Ht.setValue(Q,"receiveShadow",ae.receiveShadow)),de.isMeshGouraudMaterial&&de.envMap!==null&&(Gn.envMap.value=Oe,Gn.flipEnvMap.value=Oe.isCubeTexture&&Oe.isRenderTargetTexture===!1?-1:1),mi&&(Ht.setValue(Q,"toneMappingExposure",C.toneMappingExposure),dt.needsLights&&Ei(Gn,ji),De&&de.fog===!0&&X.refreshFogUniforms(Gn,De),X.refreshMaterialUniforms(Gn,de,le,re,Ee),Dl.upload(Q,Zo(dt),Gn,P)),de.isShaderMaterial&&de.uniformsNeedUpdate===!0&&(Dl.upload(Q,Zo(dt),Gn,P),de.uniformsNeedUpdate=!1),de.isSpriteMaterial&&Ht.setValue(Q,"center",ae.center),Ht.setValue(Q,"modelViewMatrix",ae.modelViewMatrix),Ht.setValue(Q,"normalMatrix",ae.normalMatrix),Ht.setValue(Q,"modelMatrix",ae.matrixWorld),de.isShaderMaterial||de.isRawShaderMaterial){const Tn=de.uniformsGroups;for(let Ar=0,ta=Tn.length;Ar<ta;Ar++)if(Fe.isWebGL2){const Qr=Tn[Ar];vt.update(Qr,wi),vt.bind(Qr,wi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return wi}function Ei(R,ee){R.ambientLightColor.needsUpdate=ee,R.lightProbe.needsUpdate=ee,R.directionalLights.needsUpdate=ee,R.directionalLightShadows.needsUpdate=ee,R.pointLights.needsUpdate=ee,R.pointLightShadows.needsUpdate=ee,R.spotLights.needsUpdate=ee,R.spotLightShadows.needsUpdate=ee,R.rectAreaLights.needsUpdate=ee,R.hemisphereLights.needsUpdate=ee}function Jo(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(R,ee,ce){st.get(R.texture).__webglTexture=ee,st.get(R.depthTexture).__webglTexture=ce;const de=st.get(R);de.__hasExternalTextures=!0,de.__hasExternalTextures&&(de.__autoAllocateDepthBuffer=ce===void 0,de.__autoAllocateDepthBuffer||qe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),de.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,ee){const ce=st.get(R);ce.__webglFramebuffer=ee,ce.__useDefaultFramebuffer=ee===void 0},this.setRenderTarget=function(R,ee=0,ce=0){F=R,j=ee,I=ce;let de=!0,ae=null,De=!1,$e=!1;if(R){const Oe=st.get(R);Oe.__useDefaultFramebuffer!==void 0?(Be.bindFramebuffer(Q.FRAMEBUFFER,null),de=!1):Oe.__webglFramebuffer===void 0?P.setupRenderTarget(R):Oe.__hasExternalTextures&&P.rebindTextures(R,st.get(R.texture).__webglTexture,st.get(R.depthTexture).__webglTexture);const ut=R.texture;(ut.isData3DTexture||ut.isDataArrayTexture||ut.isCompressedArrayTexture)&&($e=!0);const rt=st.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(rt[ee])?ae=rt[ee][ce]:ae=rt[ee],De=!0):Fe.isWebGL2&&R.samples>0&&P.useMultisampledRTT(R)===!1?ae=st.get(R).__webglMultisampledFramebuffer:Array.isArray(rt)?ae=rt[ce]:ae=rt,A.copy(R.viewport),K.copy(R.scissor),$=R.scissorTest}else A.copy(Y).multiplyScalar(le).floor(),K.copy(D).multiplyScalar(le).floor(),$=q;if(Be.bindFramebuffer(Q.FRAMEBUFFER,ae)&&Fe.drawBuffers&&de&&Be.drawBuffers(R,ae),Be.viewport(A),Be.scissor(K),Be.setScissorTest($),De){const Oe=st.get(R.texture);Q.framebufferTexture2D(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Q.TEXTURE_CUBE_MAP_POSITIVE_X+ee,Oe.__webglTexture,ce)}else if($e){const Oe=st.get(R.texture),ut=ee||0;Q.framebufferTextureLayer(Q.FRAMEBUFFER,Q.COLOR_ATTACHMENT0,Oe.__webglTexture,ce||0,ut)}fe=-1},this.readRenderTargetPixels=function(R,ee,ce,de,ae,De,$e){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let tt=st.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&$e!==void 0&&(tt=tt[$e]),tt){Be.bindFramebuffer(Q.FRAMEBUFFER,tt);try{const Oe=R.texture,ut=Oe.format,rt=Oe.type;if(ut!==hi&&We.convert(ut)!==Q.getParameter(Q.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const at=rt===Wo&&(qe.has("EXT_color_buffer_half_float")||Fe.isWebGL2&&qe.has("EXT_color_buffer_float"));if(rt!==Mr&&We.convert(rt)!==Q.getParameter(Q.IMPLEMENTATION_COLOR_READ_TYPE)&&!(rt===xr&&(Fe.isWebGL2||qe.has("OES_texture_float")||qe.has("WEBGL_color_buffer_float")))&&!at){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ee>=0&&ee<=R.width-de&&ce>=0&&ce<=R.height-ae&&Q.readPixels(ee,ce,de,ae,We.convert(ut),We.convert(rt),De)}finally{const Oe=F!==null?st.get(F).__webglFramebuffer:null;Be.bindFramebuffer(Q.FRAMEBUFFER,Oe)}}},this.copyFramebufferToTexture=function(R,ee,ce=0){const de=Math.pow(2,-ce),ae=Math.floor(ee.image.width*de),De=Math.floor(ee.image.height*de);P.setTexture2D(ee,0),Q.copyTexSubImage2D(Q.TEXTURE_2D,ce,0,0,R.x,R.y,ae,De),Be.unbindTexture()},this.copyTextureToTexture=function(R,ee,ce,de=0){const ae=ee.image.width,De=ee.image.height,$e=We.convert(ce.format),tt=We.convert(ce.type);P.setTexture2D(ce,0),Q.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL,ce.flipY),Q.pixelStorei(Q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ce.premultiplyAlpha),Q.pixelStorei(Q.UNPACK_ALIGNMENT,ce.unpackAlignment),ee.isDataTexture?Q.texSubImage2D(Q.TEXTURE_2D,de,R.x,R.y,ae,De,$e,tt,ee.image.data):ee.isCompressedTexture?Q.compressedTexSubImage2D(Q.TEXTURE_2D,de,R.x,R.y,ee.mipmaps[0].width,ee.mipmaps[0].height,$e,ee.mipmaps[0].data):Q.texSubImage2D(Q.TEXTURE_2D,de,R.x,R.y,$e,tt,ee.image),de===0&&ce.generateMipmaps&&Q.generateMipmap(Q.TEXTURE_2D),Be.unbindTexture()},this.copyTextureToTexture3D=function(R,ee,ce,de,ae=0){if(C.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const De=R.max.x-R.min.x+1,$e=R.max.y-R.min.y+1,tt=R.max.z-R.min.z+1,Oe=We.convert(de.format),ut=We.convert(de.type);let rt;if(de.isData3DTexture)P.setTexture3D(de,0),rt=Q.TEXTURE_3D;else if(de.isDataArrayTexture||de.isCompressedArrayTexture)P.setTexture2DArray(de,0),rt=Q.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}Q.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL,de.flipY),Q.pixelStorei(Q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,de.premultiplyAlpha),Q.pixelStorei(Q.UNPACK_ALIGNMENT,de.unpackAlignment);const at=Q.getParameter(Q.UNPACK_ROW_LENGTH),Rt=Q.getParameter(Q.UNPACK_IMAGE_HEIGHT),vn=Q.getParameter(Q.UNPACK_SKIP_PIXELS),Vt=Q.getParameter(Q.UNPACK_SKIP_ROWS),wn=Q.getParameter(Q.UNPACK_SKIP_IMAGES),gt=ce.isCompressedTexture?ce.mipmaps[ae]:ce.image;Q.pixelStorei(Q.UNPACK_ROW_LENGTH,gt.width),Q.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,gt.height),Q.pixelStorei(Q.UNPACK_SKIP_PIXELS,R.min.x),Q.pixelStorei(Q.UNPACK_SKIP_ROWS,R.min.y),Q.pixelStorei(Q.UNPACK_SKIP_IMAGES,R.min.z),ce.isDataTexture||ce.isData3DTexture?Q.texSubImage3D(rt,ae,ee.x,ee.y,ee.z,De,$e,tt,Oe,ut,gt.data):ce.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),Q.compressedTexSubImage3D(rt,ae,ee.x,ee.y,ee.z,De,$e,tt,Oe,gt.data)):Q.texSubImage3D(rt,ae,ee.x,ee.y,ee.z,De,$e,tt,Oe,ut,gt),Q.pixelStorei(Q.UNPACK_ROW_LENGTH,at),Q.pixelStorei(Q.UNPACK_IMAGE_HEIGHT,Rt),Q.pixelStorei(Q.UNPACK_SKIP_PIXELS,vn),Q.pixelStorei(Q.UNPACK_SKIP_ROWS,Vt),Q.pixelStorei(Q.UNPACK_SKIP_IMAGES,wn),ae===0&&de.generateMipmaps&&Q.generateMipmap(rt),Be.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?P.setTextureCube(R,0):R.isData3DTexture?P.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?P.setTexture2DArray(R,0):P.setTexture2D(R,0),Be.unbindTexture()},this.resetState=function(){j=0,I=0,F=null,Be.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=e===Rf?"display-p3":"srgb",n.unpackColorSpace=At.workingColorSpace===Vl?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ln?$r:mg}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===$r?ln:Vi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Iw extends Df{}Iw.prototype.isWebGL1Renderer=!0;class Og extends En{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n}}class kg extends Ks{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Mt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Gm=new se,Vm=new se,Wm=new Zt,ff=new Pf,Al=new Yo;class Fw extends En{constructor(e=new ti,n=new kg){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,s=[0];for(let a=1,l=n.count;a<l;a++)Gm.fromBufferAttribute(n,a-1),Vm.fromBufferAttribute(n,a),s[a]=s[a-1],s[a]+=Gm.distanceTo(Vm);e.setAttribute("lineDistance",new pi(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const s=this.geometry,a=this.matrixWorld,l=e.params.Line.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Al.copy(s.boundingSphere),Al.applyMatrix4(a),Al.radius+=l,e.ray.intersectsSphere(Al)===!1)return;Wm.copy(a).invert(),ff.copy(e.ray).applyMatrix4(Wm);const u=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=u*u,m=new se,_=new se,y=new se,v=new se,S=this.isLineSegments?2:1,w=s.index,x=s.attributes.position;if(w!==null){const g=Math.max(0,f.start),L=Math.min(w.count,f.start+f.count);for(let C=g,N=L-1;C<N;C+=S){const j=w.getX(C),I=w.getX(C+1);if(m.fromBufferAttribute(x,j),_.fromBufferAttribute(x,I),ff.distanceSqToSegment(m,_,v,y)>h)continue;v.applyMatrix4(this.matrixWorld);const fe=e.ray.origin.distanceTo(v);fe<e.near||fe>e.far||n.push({distance:fe,point:y.clone().applyMatrix4(this.matrixWorld),index:C,face:null,faceIndex:null,object:this})}}else{const g=Math.max(0,f.start),L=Math.min(x.count,f.start+f.count);for(let C=g,N=L-1;C<N;C+=S){if(m.fromBufferAttribute(x,C),_.fromBufferAttribute(x,C+1),ff.distanceSqToSegment(m,_,v,y)>h)continue;v.applyMatrix4(this.matrixWorld);const I=e.ray.origin.distanceTo(v);I<e.near||I>e.far||n.push({distance:I,point:y.clone().applyMatrix4(this.matrixWorld),index:C,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const a=n[s[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,f=a.length;l<f;l++){const u=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=l}}}}}class zg extends Ks{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Mt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const jm=new Zt,wf=new Pf,bl=new Yo,Cl=new se;class Ow extends En{constructor(e=new ti,n=new zg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const s=this.geometry,a=this.matrixWorld,l=e.params.Points.threshold,f=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),bl.copy(s.boundingSphere),bl.applyMatrix4(a),bl.radius+=l,e.ray.intersectsSphere(bl)===!1)return;jm.copy(a).invert(),wf.copy(e.ray).applyMatrix4(jm);const u=l/((this.scale.x+this.scale.y+this.scale.z)/3),h=u*u,m=s.index,y=s.attributes.position;if(m!==null){const v=Math.max(0,f.start),S=Math.min(m.count,f.start+f.count);for(let w=v,E=S;w<E;w++){const x=m.getX(w);Cl.fromBufferAttribute(y,x),Xm(Cl,x,h,a,e,n,this)}}else{const v=Math.max(0,f.start),S=Math.min(y.count,f.start+f.count);for(let w=v,E=S;w<E;w++)Cl.fromBufferAttribute(y,w),Xm(Cl,w,h,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,s=Object.keys(n);if(s.length>0){const a=n[s[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,f=a.length;l<f;l++){const u=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=l}}}}}function Xm(r,e,n,s,a,l,f){const u=wf.distanceSqToPoint(r);if(u<n){const h=new se;wf.closestPointToPoint(r,h),h.applyMatrix4(s);const m=a.ray.origin.distanceTo(h);if(m<a.near||m>a.far)return;l.push({distance:m,distanceToRay:Math.sqrt(u),point:h,index:e,face:null,object:f})}}class Hl extends ti{constructor(e=1,n=32,s=16,a=0,l=Math.PI*2,f=0,u=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:s,phiStart:a,phiLength:l,thetaStart:f,thetaLength:u},n=Math.max(3,Math.floor(n)),s=Math.max(2,Math.floor(s));const h=Math.min(f+u,Math.PI);let m=0;const _=[],y=new se,v=new se,S=[],w=[],E=[],x=[];for(let g=0;g<=s;g++){const L=[],C=g/s;let N=0;g===0&&f===0?N=.5/n:g===s&&h===Math.PI&&(N=-.5/n);for(let j=0;j<=n;j++){const I=j/n;y.x=-e*Math.cos(a+I*l)*Math.sin(f+C*u),y.y=e*Math.cos(f+C*u),y.z=e*Math.sin(a+I*l)*Math.sin(f+C*u),w.push(y.x,y.y,y.z),v.copy(y).normalize(),E.push(v.x,v.y,v.z),x.push(I+N,1-C),L.push(m++)}_.push(L)}for(let g=0;g<s;g++)for(let L=0;L<n;L++){const C=_[g][L+1],N=_[g][L],j=_[g+1][L],I=_[g+1][L+1];(g!==0||f>0)&&S.push(C,N,I),(g!==s-1||h<Math.PI)&&S.push(N,j,I)}this.setIndex(S),this.setAttribute("position",new pi(w,3)),this.setAttribute("normal",new pi(E,3)),this.setAttribute("uv",new pi(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Bg{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=qm(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=qm();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}function qm(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bf);const kw={base:"#1e1e2e",mantle:"#181825",crust:"#11111b",surface0:"#313244",surface1:"#45475a",surface2:"#585b70",overlay0:"#6c7086",overlay1:"#7f849c",subtext0:"#a6adc8",subtext1:"#bac2de",text:"#cdd6f4",lavender:"#b4befe",blue:"#89b4fa",sapphire:"#74c7ec",sky:"#89dceb",teal:"#94e2d5",green:"#a6e3a1",yellow:"#f9e2af",peach:"#fab387",maroon:"#eba0ac",red:"#f38ba8",mauve:"#cba6f7",pink:"#f5c2e7",flamingo:"#f2cdcd",rosewater:"#f5e0dc"},Qn={base:1973806,mantle:1579045,crust:1118491,surface0:3224132,surface1:4540250,surface2:5790576,overlay0:7106694,overlay1:8357020,subtext0:10923464,subtext1:12239582,text:13489908,lavender:11845374,blue:9024762,sapphire:7653356,sky:9034987,teal:9757397,green:10937249,yellow:16376495,peach:16429959,maroon:15442092,red:15961e3,mauve:13346551,pink:16106215,flamingo:15912397,rosewater:16113884},Ym={design:"mauve",implement:"blue",verify:"green",default:"lavender"};function Ho(r){return kw[Ym[r]??Ym.default]}const $m=[Qn.mauve,Qn.blue,Qn.pink,Qn.teal,Qn.lavender,Qn.sapphire];function zw(r){return[r>>16&255,r>>8&255,r&255].map(e=>e/255)}function Bw(){const r=ze.useRef(null),[e,n]=ze.useState(!1);return ze.useEffect(()=>{const s=r.current;if(!s)return;const a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let l=null,f=0,u=!1,h=!1;try{const m=new Og,_=new Zn(65,window.innerWidth/window.innerHeight,.1,1e3);_.position.z=60,l=new Df({canvas:s,antialias:!1,alpha:!0}),l.setSize(window.innerWidth,window.innerHeight),l.setPixelRatio(1),l.setClearColor(Qn.base,0);const y=60,v=new ti,S=new Float32Array(y*3),w=new Float32Array(y*3),E=new Float32Array(y),x=new Float32Array(y),g=new Float32Array(y);for(let fe=0;fe<y;fe++){const T=(Math.random()-.5)*140,A=(Math.random()-.5)*90,K=(Math.random()-.5)*20;S[fe*3]=T,S[fe*3+1]=A,S[fe*3+2]=K,x[fe]=T,E[fe]=A,g[fe]=Math.random()*Math.PI*2;const $=$m[Math.floor(Math.random()*$m.length)],[pe,k,te]=zw($);w[fe*3]=pe,w[fe*3+1]=k,w[fe*3+2]=te}v.setAttribute("position",new ei(S,3)),v.setAttribute("color",new ei(w,3));const L=new zg({size:2.2,vertexColors:!0,transparent:!0,opacity:.58,sizeAttenuation:!0}),C=new Ow(v,L);m.add(C);const N=new Bg,j=()=>{if(u)return;if(h||document.hidden){f=requestAnimationFrame(j);return}f=requestAnimationFrame(j);const fe=N.getElapsedTime();if(!a){const T=v.getAttribute("position");for(let A=0;A<y;A++){const K=g[A],$=E[A]+Math.sin(fe*.3+K)*4,pe=x[A]+Math.cos(fe*.22+K*.7)*1.8;T.setXYZ(A,pe,$,S[A*3+2])}T.needsUpdate=!0,L.opacity=.48+Math.sin(fe*.5)*.12}l.render(m,_)};j();const I=()=>{u||!l||(_.aspect=window.innerWidth/window.innerHeight,_.updateProjectionMatrix(),l.setSize(window.innerWidth,window.innerHeight))};window.addEventListener("resize",I);const F=()=>{document.hidden?h=!0:(h=!1,N.getDelta())};return document.addEventListener("visibilitychange",F),()=>{u=!0,cancelAnimationFrame(f),window.removeEventListener("resize",I),document.removeEventListener("visibilitychange",F);try{l==null||l.dispose()}catch{}try{v.dispose()}catch{}try{L.dispose()}catch{}}}catch{if(n(!0),l)try{l.dispose()}catch{}}return()=>{if(u=!0,f&&cancelAnimationFrame(f),l)try{l.dispose()}catch{}}},[]),e?O.jsx("div",{className:"fixed inset-0 -z-10 bg-gradient-to-br from-catppuccin-base via-catppuccin-mantle to-catppuccin-crust","aria-hidden":"true"}):O.jsx("canvas",{ref:r,"aria-hidden":"true",style:{position:"fixed",inset:0,width:"100%",height:"100%",zIndex:-1,pointerEvents:"none",display:"block"}})}const Km=180,df=72,Rl=[Qn.mauve,Qn.blue,Qn.teal,Qn.pink];function Hw({nodes:r,edges:e,width:n,height:s,currentKey:a}){const l=ze.useRef(null),[f,u]=ze.useState(!1);return ze.useEffect(()=>{const h=l.current;if(!h||r.length===0||e.length===0)return;const m=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let _=null,y=0,v=!1,S=!1;try{const w=new Og,E=s,x=n,g=new Pg(-x/2,x/2,E/2,-E/2,.1,100);g.position.set(n/2,s/2,10),g.lookAt(n/2,s/2,0),_=new Df({canvas:h,antialias:!0,alpha:!0}),_.setSize(n,s),_.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),_.setClearColor(0,0);const L=new Map;for(const A of r)L.set(A.key,A);const C=[],N=[],j=new Hl(3.2,8,8);for(let A=0;A<e.length;A++){const K=e[A],$=L.get(K.from),pe=L.get(K.to);if(!$||!pe)continue;const k=$.x+Km,te=$.y+df/2,re=pe.x,le=pe.y+df/2,V=(k+re)/2,z=[],Y=12;for(let be=0;be<=Y;be++){const Ce=be/Y,Ie=(1-Ce)**2*k+2*(1-Ce)*Ce*V+Ce**2*re,He=(1-Ce)*te+Ce*le+Math.sin(Ce*Math.PI)*2;z.push(new se(Ie,He,$.phaseIndex*.1))}const D=new ti().setFromPoints(z),q=Rl[A%Rl.length],Z=new kg({color:q,transparent:!0,opacity:.55}),ue=new Fw(D,Z);w.add(ue),C.push(ue);const ge=new Bl({color:Rl[(A+1)%Rl.length],transparent:!0,opacity:.7}),Ee=new Si(j.clone(),ge);Ee.position.set(V,(te+le)/2,.6),Ee._ph=Math.random()*Math.PI*2,w.add(Ee),N.push(Ee)}let I=null;if(a){const A=L.get(a);if(A){const K=new Hl(9,12,12),$=new Bl({color:Qn.yellow,transparent:!0,opacity:.32});I=new Si(K,$),I.position.set(A.x+Km/2,A.y+df/2,1),w.add(I)}}const F=new Bg,fe=()=>{if(!v){if(S||document.hidden){y=requestAnimationFrame(fe);return}if(y=requestAnimationFrame(fe),!m){const A=F.getElapsedTime();for(let K=0;K<N.length;K++){const $=N[K],pe=$._ph,k=$.material;k.opacity=.5+Math.sin(A*1.2+pe)*.25,$.scale.setScalar(.9+Math.sin(A*.9+pe)*.18)}for(let K=0;K<C.length;K++){const pe=C[K].material;pe.opacity=.35+Math.sin(A*.7+K)*.12}if(I){const K=1+Math.sin(A*2)*.15;I.scale.setScalar(K);const $=I.material;$.opacity=.26+Math.sin(A*1.6)*.08}}_.render(w,g)}};fe();const T=()=>{S=document.hidden,S||F.getDelta()};return document.addEventListener("visibilitychange",T),()=>{v=!0,cancelAnimationFrame(y),document.removeEventListener("visibilitychange",T);try{_==null||_.dispose()}catch{}for(const A of C)try{A.geometry.dispose(),A.material.dispose()}catch{}for(const A of N)try{A.geometry.dispose(),A.material.dispose()}catch{}if(I)try{I.geometry.dispose(),I.material.dispose()}catch{}try{j.dispose()}catch{}}}catch{if(u(!0),_)try{_.dispose()}catch{}}return()=>{if(v=!0,y&&cancelAnimationFrame(y),_)try{_.dispose()}catch{}}},[r,e,n,s,a]),f||r.length===0||e.length===0?null:O.jsx("canvas",{ref:l,width:n,height:s,"aria-hidden":"true",style:{position:"absolute",left:0,top:0,width:n,height:s,pointerEvents:"none",display:"block"}})}const Pl=180,Os=72;function Gw(r){switch(r){case"passed":return"#a6e3a1";case"running":return"#89b4fa";case"failed":return"#f38ba8";case"skipped":return"#6c7086";default:return"#6c7086"}}function Vw({workflowSteps:r,stepStatuses:e,currentStepKey:n,selectedKey:s,onSelectKey:a}){const[l,f]=ze.useState(1),[u,h]=ze.useState({x:0,y:0}),[m,_]=ze.useState(!1),y=ze.useRef(null),v=ze.useRef(null),S=ze.useMemo(()=>r.map((T,A)=>({key:T.key,phase:T.phase,type:T.type,index:A})),[r]),{nodes:w,edges:E,width:x,height:g}=ze.useMemo(()=>V_(S),[S]),L=ze.useMemo(()=>{const T=new Map;for(const A of e??[])T.set(A.stepKey,A.status);return T},[e]),C=ze.useMemo(()=>{const T=new Map;for(const A of w){const K=A.phase??"(none)";T.has(K)||T.set(K,A.phaseIndex)}return Array.from(T.entries()).sort((A,K)=>A[1]-K[1])},[w]),N=ze.useCallback(T=>{if(T.ctrlKey||T.metaKey){T.preventDefault();const A=-T.deltaY*.0015;f(K=>Math.min(2,Math.max(.35,K+A)))}},[]),j=ze.useCallback(T=>{T.target.closest("[data-node]")||(_(!0),y.current={x:T.clientX,y:T.clientY,panX:u.x,panY:u.y},T.target.setPointerCapture(T.pointerId))},[u.x,u.y]),I=ze.useCallback(T=>{if(!m||!y.current)return;const A=T.clientX-y.current.x,K=T.clientY-y.current.y;h({x:y.current.panX+A,y:y.current.panY+K})},[m]),F=ze.useCallback(()=>{_(!1),y.current=null},[]),fe=ze.useCallback(()=>{if(!v.current)return;const T=v.current.getBoundingClientRect(),A=T.width/Math.max(x,1),K=T.height/Math.max(g,1),$=Math.min(1,Math.min(A,K)*.92);f(Math.max(.35,$)),h({x:0,y:0})},[x,g]);return r.length===0?O.jsxs("div",{className:"flex h-full flex-col items-center justify-center gap-2 p-6 text-sm text-catppuccin-subtext0",children:[O.jsx("div",{className:"text-catppuccin-overlay0",children:"ワークフロー定義がありません。ワークフローを選択してください。"}),O.jsx("div",{className:"text-xs text-catppuccin-overlay0",children:"左側の定義ブラウザからワークフロー → セッションを選択するとキャンバスに表示されます。"})]}):O.jsxs("div",{className:"flex h-full flex-col overflow-hidden bg-catppuccin-base",children:[O.jsxs("div",{className:"flex shrink-0 items-center gap-2 border-b border-catppuccin-surface0 bg-catppuccin-mantle px-3 py-2",children:[O.jsx("div",{className:"text-xs font-semibold tracking-widest text-catppuccin-subtext0",children:"DEFINITION CANVAS"}),O.jsxs("div",{className:"ml-auto flex items-center gap-1",children:[O.jsx("button",{onClick:()=>f(T=>Math.max(.35,T-.15)),className:"rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",title:"Zoom out",children:"−"}),O.jsxs("span",{className:"min-w-[52px] text-center font-mono text-xs text-catppuccin-subtext0",children:[Math.round(l*100),"%"]}),O.jsx("button",{onClick:()=>f(T=>Math.min(2,T+.15)),className:"rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",title:"Zoom in",children:"＋"}),O.jsx("button",{onClick:fe,className:"rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",children:"Fit"}),O.jsx("button",{onClick:()=>{h({x:0,y:0}),f(1)},className:"rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",children:"100%"})]})]}),C.length>0&&O.jsxs("div",{className:"flex shrink-0 flex-wrap items-center gap-2 border-b border-catppuccin-surface0 bg-catppuccin-base px-3 py-1.5",children:[C.map(([T,A])=>O.jsxs("span",{className:"inline-flex items-center gap-1 text-[11px]",children:[O.jsx("span",{className:"inline-block h-2 w-2 rounded-full",style:{background:Ho(T)}}),O.jsx("span",{className:"text-catppuccin-subtext0",children:T}),O.jsxs("span",{className:"font-mono text-catppuccin-overlay0",children:["depth ",A]})]},T)),O.jsx("span",{className:"ml-auto text-[11px] text-catppuccin-overlay0",children:"横=進行(→) 縦=並列 Phase=色/深度 Threeエッジあり"})]}),O.jsxs("div",{ref:v,className:jt("relative flex-1 overflow-hidden",m?"cursor-grabbing":"cursor-grab"),onWheel:N,onPointerDown:j,onPointerMove:I,onPointerUp:F,onPointerLeave:F,style:{background:"radial-gradient(circle at 1px 1px, rgba(205,214,244,0.08) 1px, transparent 0)",backgroundSize:"22px 22px"},children:[O.jsxs("div",{className:"absolute left-0 top-0",style:{width:x,height:g,transform:`translate(${u.x}px, ${u.y}px) scale(${l})`,transformOrigin:"top left"},children:[O.jsx("svg",{width:x,height:g,className:"absolute inset-0",style:{pointerEvents:"none"},children:(()=>{const T=new Map;for(const A of w)T.set(A.key,A);return E.map((A,K)=>{const $=T.get(A.from),pe=T.get(A.to);if(!$||!pe)return null;const k=$.x+Pl,te=$.y+Os/2,re=pe.x,le=pe.y+Os/2,V=(k+re)/2,z=`M ${k} ${te} C ${V} ${te}, ${V} ${le}, ${re} ${le}`,Y=Ho(pe.phase??"");return O.jsx("path",{d:z,stroke:Y,strokeWidth:1.4,fill:"none",opacity:.45,strokeDasharray:($.phase===pe.phase,"0")},`${A.from}-${A.to}-${K}`)})})()}),O.jsx(Hw,{nodes:w,edges:E,width:x,height:g,currentKey:n}),w.map(T=>{const A=L.get(T.key)??"pending",K=I_({status:A,stepKey:T.key},n),$=s===T.key,pe=K.isCurrent,k=Ho(T.phase??""),te=Math.max(.9,1-T.phaseIndex*.06);return O.jsxs("button",{"data-node":!0,onClick:()=>a==null?void 0:a(T.key),className:jt("absolute flex flex-col justify-between rounded-md border bg-catppuccin-surface0 p-2 text-left shadow-sm transition-shadow",$?"ring-2 ring-catppuccin-yellow shadow-md":"hover:shadow-md",pe?"animate-pulse":""),style:{left:T.x,top:T.y,width:Pl,height:Os,borderColor:$?"#f9e2af":K.borderColor,borderWidth:pe||$?2:1,borderStyle:K.isSkipped?"dashed":"solid",opacity:te,boxShadow:pe?`0 0 12px ${k}55, 0 2px 8px rgba(0,0,0,0.35)`:$?"0 0 10px rgba(249,226,175,0.35)":void 0,zIndex:T.phaseIndex+(pe?10:0)+($?5:0)},children:[O.jsxs("div",{className:"flex items-center gap-1.5",children:[O.jsx("span",{className:"h-2 w-2 shrink-0 rounded-full",style:{background:k},title:T.phase??""}),O.jsx("span",{className:"truncate text-[11px] font-bold",style:{color:k},children:T.phase??"-"}),O.jsx("span",{className:jt("ml-auto h-2 w-2 rounded-full",A==="running"?"animate-ping":""),style:{background:Gw(A)}})]}),O.jsx("div",{className:"truncate font-mono text-xs font-bold text-catppuccin-text",title:T.key,children:T.key}),O.jsxs("div",{className:"flex items-center gap-1 text-[10px]",children:[O.jsx("span",{className:"rounded bg-catppuccin-surface1 px-1 py-0.5 font-mono text-catppuccin-subtext0",children:T.type}),O.jsx("span",{className:"ml-auto font-mono text-catppuccin-overlay0",children:A}),pe&&O.jsx("span",{className:"font-bold text-catppuccin-yellow",children:"●"})]})]},T.key)})]}),O.jsxs("div",{className:"absolute bottom-3 right-3 flex h-[96px] w-[148px] flex-col rounded border border-catppuccin-surface1 bg-catppuccin-mantle/90 p-1 shadow-lg backdrop-blur",children:[O.jsx("div",{className:"mb-1 text-[9px] font-semibold tracking-widest text-catppuccin-overlay0",children:"MINIMAP"}),O.jsx("div",{className:"relative flex-1 overflow-hidden rounded bg-catppuccin-base",children:O.jsxs("svg",{width:"100%",height:"100%",viewBox:`0 0 ${x} ${g}`,preserveAspectRatio:"xMidYMid meet",children:[E.map((T,A)=>{const K=w.find(le=>le.key===T.from),$=w.find(le=>le.key===T.to);if(!K||!$)return null;const pe=K.x+Pl,k=K.y+Os/2,te=$.x,re=$.y+Os/2;return O.jsx("line",{x1:pe,y1:k,x2:te,y2:re,stroke:Ho($.phase??""),strokeWidth:1.2,opacity:.5},`mm-${A}`)}),w.map(T=>{const A=T.key===n,K=T.key===s;return O.jsx("rect",{x:T.x,y:T.y,width:Pl,height:Os,rx:4,fill:K?"#f9e2af":A?"#89b4fa":Ho(T.phase??""),opacity:K||A?.95:.72,stroke:K?"#f9e2af":A?"#89b4fa":"#313244",strokeWidth:K||A?1.5:.6},`mm-n-${T.key}`)}),(()=>{if(!v.current)return null;const T=v.current.getBoundingClientRect(),A=-u.x/l,K=-u.y/l,$=T.width/l,pe=T.height/l;return O.jsx("rect",{x:A,y:K,width:$,height:pe,fill:"none",stroke:"#f9e2af",strokeWidth:1.2,opacity:.85,rx:2})})()]})}),O.jsxs("div",{className:"mt-0.5 text-center font-mono text-[9px] text-catppuccin-overlay0",children:[w.length," nodes · ",E.length," edges"]})]}),O.jsx("div",{className:"pointer-events-none absolute left-3 bottom-3 rounded bg-catppuccin-mantle/85 px-2 py-1 text-[10px] text-catppuccin-overlay0",children:"Drag: pan · Ctrl+Wheel: zoom · Click node: detail"})]})]})}function Ll(r,e){return r.length<=e?r:r.slice(0,e-1)+"…"}function Ww(r){return D_(r)}function jw(r){switch(r){case"passed":return"passed";case"running":return"running";case"failed":return"destructive";case"skipped":return"skipped";case"pending":return"pending";default:return"secondary"}}function Xw(){const[r,e]=ze.useState(null),[n,s]=ze.useState(null),[a,l]=ze.useState(null),[f,u]=ze.useState(null),[h,m]=ze.useState(""),[_,y]=ze.useState(""),[v,S]=ze.useState(null),[w,E]=ze.useState(0),[x,g]=ze.useState(!1),[L,C]=ze.useState(!1),[N,j]=ze.useState(null),[I,F]=ze.useState(!1),[fe,T]=ze.useState([]),[A,K]=ze.useState(null),[$,pe]=ze.useState(!1),k=ze.useRef(null);k.current=a;const te=ze.useRef(null),re=ze.useRef(0),le=ze.useCallback(async()=>{var X;(X=te.current)==null||X.abort();const H=new AbortController;te.current=H;try{const he=new URLSearchParams;he.set("limit","200"),k.current&&he.set("focusId",k.current);const Te=await fetch(`/api/snapshot?${he.toString()}`,{signal:H.signal});if(!Te.ok)throw new Error(`HTTP ${Te.status}`);const we=await Te.json();e(we),s(null),re.current=0,!k.current&&we.selectedSession?(l(we.selectedSession.id),E(0),g(!1),C(!1),!f&&we.selectedSession.workflowId&&u(we.selectedSession.workflowId)):k.current?!we.sessions.some(lt=>lt.id===k.current)&&we.selectedSession&&(l(we.selectedSession.id),E(0),g(!1),we.selectedSession.workflowId&&u(we.selectedSession.workflowId)):!we.selectedSession&&we.sessions.length>0&&(l(we.sessions[0].id),!f&&we.sessions[0]&&u(we.sessions[0].workflowId))}catch(he){if(he instanceof DOMException&&he.name==="AbortError")return;re.current+=1,s(he instanceof Error?he.message:String(he))}},[f]),V=ze.useCallback(async()=>{try{const H=await fetch("/api/workflows");if(!H.ok)return;const X=await H.json();T(X.workflows??[]),!f&&X.workflows.length>0&&k.current}catch{}},[f]);ze.useEffect(()=>{let H,X=!1;const he=()=>{if(X)return;const we=re.current===0?1e3:Math.min(1e3*Math.pow(2,re.current),1e4);H=window.setTimeout(async()=>{if(document.hidden){he();return}await le(),he()},we)};le(),he();const Te=()=>{document.hidden||(H&&window.clearTimeout(H),le(),he())};return document.addEventListener("visibilitychange",Te),()=>{var we;X=!0,H&&window.clearTimeout(H),document.removeEventListener("visibilitychange",Te),(we=te.current)==null||we.abort()}},[le]),ze.useEffect(()=>{V();const H=window.setInterval(V,1e4);return()=>window.clearInterval(H)},[V]),ze.useEffect(()=>{if(!f){K(null);return}let H=!1;return pe(!0),fetch(`/api/workflows/${encodeURIComponent(f)}`).then(X=>{if(!X.ok)throw new Error(`HTTP ${X.status}`);return X.json()}).then(X=>{H||K(X)}).catch(()=>{H||K(null)}).finally(()=>{H||pe(!1)}),()=>{H=!0}},[f]);const z=(()=>{if(r)return a?r.sessions.find(H=>H.id===a):r.selectedSession??void 0})(),Y=(()=>{var X;if(!z||!r)return(r==null?void 0:r.selectedSteps)??[];const H=r.stepsBySession[z.id];return H||(((X=r.selectedSession)==null?void 0:X.id)===z.id?r.selectedSteps:[])})(),D=(()=>{var X;if(!z||!r)return(r==null?void 0:r.selectedArtifacts)??[];const H=r.artifactsBySession[z.id];return H||(((X=r.selectedSession)==null?void 0:X.id)===z.id?r.selectedArtifacts:[])})(),q=(()=>{var X;if(!z||!r)return(r==null?void 0:r.selectedGateEvents)??[];const H=r.gateEventsBySession[z.id];return H||(((X=r.selectedSession)==null?void 0:X.id)===z.id?r.selectedGateEvents:[])})(),Z=(()=>{var X;if(!z||!r)return(r==null?void 0:r.selectedAttempts)??[];const H=r.attemptsBySession[z.id];return H||(((X=r.selectedSession)==null?void 0:X.id)===z.id?r.selectedAttempts:[])})();ze.useEffect(()=>{S(null),E(0),g(!1),j(null),C(!1)},[a,f]),ze.useEffect(()=>{!v&&(z!=null&&z.currentStep)},[v,z==null?void 0:z.currentStep]);const ue=(()=>{var he;const H=new Map;if(!r||!z)return H;const X=(he=r.artifactExists)==null?void 0:he[z.id];if(X){for(const[Te,we]of Object.entries(X))H.set(Te,we);return H}return H})();function ge(H){if(ue.has(H.filePath))return ue.get(H.filePath)}function Ee(H,X){return X===void 0?`${H.artifactKey}: ${H.filePath} (判定中…)`:z_(H,X)}const be=ze.useMemo(()=>{const H=new Map;if(!r)return H;for(const X of r.sessions){const he=H.get(X.workflowId);he?he.push(X):H.set(X.workflowId,[X])}return H},[r]),Ce=ze.useMemo(()=>{let H=fe;if(h.trim()){const X=h.trim().toLowerCase();H=H.filter(he=>he.id.toLowerCase().includes(X)||(he.description??"").toLowerCase().includes(X))}if(!h.trim()&&r){const X=new Set(r.sessions.map(he=>he.workflowId));for(const he of X)H.some(Te=>Te.id===he)||(H=[...H,{id:he,workflowPath:"",steps:[]}])}return H=[...H].sort((X,he)=>X.id.localeCompare(he.id)),H},[fe,h,r]),Ie=ze.useMemo(()=>{if($)return[];if(A&&f===A.id)return A.steps.map(X=>({key:X.key,phase:X.phase,type:X.type}));if(f&&A&&A.id!==f)return[];if(z&&Y.length>0&&(!f||z.workflowId===f))return Y.map(X=>({key:X.stepKey,phase:X.phase,type:X.type}));if(A)return A.steps.map(X=>({key:X.key,phase:X.phase,type:X.type}));const H=fe.find(X=>X.id===f);return H?H.steps.map(X=>({key:X.key,phase:X.phase,type:X.type})):[]},[A,$,f,z,Y,fe]),He=ze.useMemo(()=>{if(Y.length!==0&&!(z&&f&&z.workflowId!==f))return Y.map(H=>({stepKey:H.stepKey,status:H.status}))},[Y,z,f]),Ge=ze.useMemo(()=>{if(!v)return null;if(A&&f===A.id){const X=A.steps.find(he=>he.key===v);if(X)return X}const H=Y.find(X=>X.stepKey===v);return H?{key:H.stepKey,phase:H.phase??"",type:H.type,maxRetries:H.maxRetries,onFail:null,hasCondition:!1,hasBeforeStep:!1,hasAfterStep:!1,task:void 0,humanGate:void 0,parallel:void 0}:null},[v,A,f,Y]),Q=ze.useMemo(()=>v?Y.find(H=>H.stepKey===v)??null:null,[v,Y]),Lt=ze.useMemo(()=>Q?Z.filter(H=>H.stepId===Q.id):[],[Q,Z]),qe=ze.useMemo(()=>v?q.filter(H=>H.stepKey===v):[],[v,q]),Fe=ze.useMemo(()=>{if(!v)return D;const H=D.filter(X=>X.stepKey===v);return H.length>0?H:[]},[v,D]);ze.useEffect(()=>{w>=Fe.length&&Fe.length>0&&E(Fe.length-1),Fe.length===0&&E(0)},[Fe.length,w]),ze.useEffect(()=>{Fe.length>Di&&!L&&w>=Di&&C(!0)},[w,Fe.length,L]);const Be=Fe[w],St=Be==null?void 0:Be.filePath;if(ze.useEffect(()=>{if(!x||!z||!St){j(null);return}const H=Be;if(!H){j(null);return}const X=new AbortController;F(!0);const he=new URLSearchParams;return he.set("filePath",H.filePath),he.set("sessionId",z.id),fetch(`/api/preview?${he.toString()}`,{signal:X.signal}).then(Te=>Te.json()).then(Te=>{j(Te),F(!1)}).catch(Te=>{Te instanceof DOMException&&Te.name==="AbortError"||(j({ok:!1,reason:Te instanceof Error?Te.message:String(Te)}),F(!1))}),()=>X.abort()},[x,w,z==null?void 0:z.id,St,Be]),ze.useEffect(()=>{E(0),g(!1),j(null),C(!1)},[a,v]),ze.useEffect(()=>{const H=X=>{var me,lt;if(!r||r.sessions.length===0)return;const he=r.sessions,Te=a?he.findIndex(Ke=>Ke.id===a):0;if(X.key==="Tab")return;if(X.key==="a"||X.key==="A"){Fe.length>Di&&C(Ke=>!Ke);return}if(X.key==="r"||X.key==="R"){le(),V();return}if(X.key==="Enter"){Fe.length>0&&g(Ke=>!Ke);return}const we=(lt=(me=X.target)==null?void 0:me.tagName)==null?void 0:lt.toLowerCase();if(!(we==="input"||we==="textarea")){if(X.key==="j"||X.key==="ArrowDown"){X.preventDefault();const Ke=Math.min(Te+1,he.length-1);if(Ke!==Te){const Ze=he[Ke].id;l(Ze);const Ye=he[Ke];u(Ye.workflowId)}}else if(X.key==="k"||X.key==="ArrowUp"){X.preventDefault();const Ke=Math.max(Te-1,0);if(Ke!==Te){const Ze=he[Ke].id;l(Ze);const Ye=he[Ke];u(Ye.workflowId)}}}};return window.addEventListener("keydown",H),()=>window.removeEventListener("keydown",H)},[r,a,Fe.length,le,V]),!r)return O.jsx("div",{className:"flex h-screen items-center justify-center bg-catppuccin-base text-catppuccin-text",children:O.jsx("div",{className:"text-sm text-catppuccin-subtext0",children:n?`Error: ${n}`:"Loading..."})});const st=r.totalSessions,P=fp(Y),b=z?hp(z.status):null,ne=Fe.length,ye=ne>Di&&!L,xe=ye?Di:ne,Me=(()=>{if(!Q){const X=new Map;for(const he of Y)X.set(he.id,he.stepKey);return pp(Z,q,X)}const H=new Map;return H.set(Q.id,Q.stepKey),pp(Lt,qe,H)})();return O.jsxs("div",{className:"relative flex h-screen bg-transparent text-catppuccin-text overflow-hidden",children:[O.jsx(Bw,{}),O.jsxs("div",{className:"flex w-[320px] shrink-0 flex-col border-r bg-catppuccin-mantle border-catppuccin-surface0",children:[O.jsxs("div",{className:"border-b border-catppuccin-surface0 px-3 py-2",children:[O.jsx("h2",{className:"text-xs font-semibold tracking-widest text-catppuccin-subtext0",children:"DEFINITION BROWSER"}),O.jsxs("div",{className:"mt-2 flex flex-col gap-1.5",children:[O.jsx("input",{value:h,onChange:H=>m(H.target.value),placeholder:"ワークフロー検索 (id/説明)",className:"w-full rounded border border-catppuccin-surface1 bg-catppuccin-base px-2 py-1 text-xs text-catppuccin-text placeholder:text-catppuccin-overlay0 focus:border-catppuccin-mauve focus:outline-none"}),O.jsx("input",{value:_,onChange:H=>y(H.target.value),placeholder:"セッション検索 (title/id)",className:"w-full rounded border border-catppuccin-surface1 bg-catppuccin-base px-2 py-1 text-xs text-catppuccin-text placeholder:text-catppuccin-overlay0 focus:border-catppuccin-mauve focus:outline-none"})]}),O.jsxs("div",{className:"mt-2 flex items-center gap-2 text-[10px] text-catppuccin-overlay0",children:[O.jsxs("span",{children:["workflows ",Ce.length]}),O.jsx("span",{children:"·"}),O.jsxs("span",{children:["sessions ",st]}),(h||_)&&O.jsx("button",{onClick:()=>{m(""),y("")},className:"ml-auto rounded bg-catppuccin-surface1 px-1.5 py-0.5 text-catppuccin-text hover:bg-catppuccin-surface2",children:"clear"})]})]}),O.jsx("div",{className:"flex-1 overflow-auto",children:r.dbMissing&&Ce.length===0?O.jsxs("div",{className:"p-4 text-sm text-catppuccin-subtext0",children:[O.jsx("span",{children:"セッションがありません。`tado init --title` で作成してください"}),r.error&&O.jsx("div",{className:"mt-2 text-catppuccin-red",children:r.error}),n&&O.jsx("div",{className:"mt-2 text-catppuccin-red",children:n})]}):Ce.length===0?O.jsx("div",{className:"p-4 text-xs text-catppuccin-overlay0",children:"ワークフローが見つかりません。"}):O.jsx("div",{className:"flex flex-col",children:Ce.map(H=>{const X=(be.get(H.id)??[]).filter(we=>{if(!_.trim())return!0;const me=_.trim().toLowerCase();return(we.title??we.workflowId).toLowerCase().includes(me)||we.id.toLowerCase().includes(me)}),he=f===H.id,Te=X.length>0;return O.jsxs("div",{className:jt("border-b border-catppuccin-surface0/60",he?"bg-catppuccin-surface0/60":""),children:[O.jsxs("button",{onClick:()=>{u(H.id),S(null)},className:jt("flex w-full items-center gap-2 px-3 py-2 text-left",he?"bg-catppuccin-surface0 text-catppuccin-text":"hover:bg-catppuccin-surface0/40 text-catppuccin-subtext1"),children:[O.jsx("span",{className:jt("shrink-0 text-[10px]",he?"text-catppuccin-mauve":"text-catppuccin-overlay0"),children:he?"●":"○"}),O.jsx("span",{className:jt("flex-1 truncate font-mono text-xs",he?"font-bold text-catppuccin-text":""),children:H.id}),O.jsx("span",{className:"shrink-0 rounded bg-catppuccin-surface1 px-1 py-0.5 font-mono text-[10px] text-catppuccin-subtext0",children:X.length})]}),H.description&&O.jsx("div",{className:"px-6 pb-1 text-[11px] leading-tight text-catppuccin-overlay0",children:Ll(H.description,80)}),O.jsxs("div",{className:"px-2 pb-1 text-[10px] font-mono text-catppuccin-overlay0 truncate",children:[H.workflowPath||"(no path)"," · steps"," ",H.steps.length||((A==null?void 0:A.id)===H.id?A.steps.length:"?")]}),Te?O.jsx("div",{className:"ml-3 flex flex-col border-l border-catppuccin-surface1/60 pl-2",children:X.map(we=>{const me=Ww(we),lt=fp(r.stepsBySession[we.id]??[]),Ke=hp(we.status),Ze=we.id===a;return O.jsxs("button",{onClick:()=>{l(we.id),u(we.workflowId)},className:jt("flex w-full items-center gap-1.5 border-l-2 px-2 py-1.5 text-left text-xs",Ze?"border-catppuccin-mauve bg-catppuccin-surface0 text-catppuccin-text":"border-transparent hover:bg-catppuccin-surface0/50 text-catppuccin-subtext1"),children:[O.jsx("span",{className:jt("shrink-0",Ze?"text-catppuccin-mauve":"text-transparent"),children:"▸"}),O.jsx("span",{className:"w-[72px] shrink-0 truncate font-mono text-[11px] text-catppuccin-subtext0",children:Ll(me,10)}),O.jsx("span",{className:"shrink-0 font-mono text-[11px] text-catppuccin-green",children:lt.text}),O.jsx("span",{className:"shrink-0 text-[11px]",style:{color:Ke.color},children:Ke.symbol}),O.jsx("span",{className:jt("truncate text-[11px]",Ze?"font-bold text-catppuccin-text":""),children:Ll(dp(we),16)})]},we.id)})}):O.jsx("div",{className:"ml-6 px-2 pb-2 text-[11px] italic text-catppuccin-overlay0",children:"セッションなし — ブラウズモード（定義のみ表示）"})]},H.id)})})}),O.jsx("div",{className:"border-t border-catppuccin-surface0 px-3 py-2 text-[10px] text-catppuccin-overlay0",children:"j/k: session   Enter: preview   a: expand   r: reload"})]}),O.jsxs("div",{className:"flex flex-1 flex-col overflow-hidden border-r border-catppuccin-surface0 bg-catppuccin-base",children:[O.jsx("div",{className:"shrink-0 border-b border-catppuccin-surface0 bg-catppuccin-mantle px-3 py-2",children:z?O.jsxs("div",{children:[O.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[O.jsx("h1",{className:"text-sm font-bold text-catppuccin-text",children:dp(z)}),O.jsxs("span",{className:"font-mono text-xs text-catppuccin-subtext0",children:["(",z.id.slice(0,8),")"]}),b&&O.jsxs("span",{className:"inline-flex items-center gap-1 text-xs",style:{color:b.color},children:[O.jsx("span",{children:b.symbol}),O.jsx("span",{children:b.label})]}),O.jsx(Io,{variant:"secondary",className:"font-mono text-[11px]",children:P.text}),O.jsxs("span",{className:"ml-auto text-[11px] text-catppuccin-overlay0",children:["current: ",z.currentStep??"-"]})]}),O.jsxs("div",{className:"mt-1 font-mono text-[11px] text-catppuccin-subtext0 truncate",children:[O.jsx("span",{className:"text-catppuccin-overlay1",children:"cwd:"})," ",(z.cwd??z.workflowPath.replace(/\/[^/]*$/,"")??"")||"(none)",O.jsx("span",{className:"ml-2 text-catppuccin-overlay1",children:"workflow:"})," ",z.workflowPath,$&&O.jsx("span",{className:"ml-2 text-catppuccin-yellow",children:"loading def…"})]}),n&&O.jsx("div",{className:"mt-1 text-xs text-catppuccin-red",children:n})]}):f?O.jsxs("div",{children:[O.jsxs("div",{className:"flex items-center gap-2",children:[O.jsx("h1",{className:"text-sm font-bold text-catppuccin-text",children:f}),O.jsx(Io,{variant:"secondary",className:"font-mono text-[11px]",children:"browsing"}),$&&O.jsx("span",{className:"text-xs text-catppuccin-yellow",children:"loading…"}),A&&O.jsxs("span",{className:"text-xs text-catppuccin-subtext0",children:[A.steps.length," steps · ",A.workflowPath]})]}),O.jsx("div",{className:"font-mono text-[11px] text-catppuccin-overlay0",children:"定義ブラウズモード — セッションを選択すると進捗が重なります"})]}):O.jsx("div",{className:"text-xs text-catppuccin-subtext0",children:"ワークフローまたはセッションを選択してください。"})}),O.jsx("div",{className:"flex-1 overflow-hidden",children:O.jsx(Vw,{workflowSteps:Ie,stepStatuses:He,currentStepKey:(z==null?void 0:z.currentStep)??null,selectedKey:v,onSelectKey:S})})]}),O.jsxs("div",{className:"flex w-[360px] shrink-0 flex-col overflow-hidden bg-catppuccin-mantle",children:[O.jsxs("div",{className:"border-b border-catppuccin-surface0 px-3 py-2",children:[O.jsx("h2",{className:"text-xs font-semibold tracking-widest text-catppuccin-subtext0",children:"DETAIL — 三位一体"}),v?O.jsxs("div",{className:"mt-1 flex items-center gap-2",children:[O.jsx("span",{className:"font-mono text-xs font-bold text-catppuccin-text",children:v}),Ge&&O.jsx(Io,{variant:jw((Q==null?void 0:Q.status)??"pending"),className:"text-[11px]",children:(Q==null?void 0:Q.status)??Ge.type}),O.jsx("button",{onClick:()=>S(null),className:"ml-auto rounded bg-catppuccin-surface1 px-1.5 py-0.5 text-[11px] text-catppuccin-text hover:bg-catppuccin-surface2",children:"clear"})]}):O.jsx("div",{className:"mt-1 text-xs text-catppuccin-overlay0",children:"キャンバスのノードを選択すると、上:定義 / 中:進捗 / 下:成果物 が表示されます。"})]}),O.jsx("div",{className:"flex-1 overflow-auto",children:v?O.jsxs("div",{className:"flex flex-col gap-3 p-3",children:[O.jsxs("div",{children:[O.jsx("h3",{className:"mb-1 text-xs font-bold tracking-wide text-catppuccin-lavender",children:"① 定義"}),Ge?O.jsxs(ks,{className:"bg-catppuccin-surface0 p-2",children:[O.jsxs("div",{className:"flex flex-wrap gap-1.5 text-xs",children:[O.jsxs(Io,{variant:"secondary",className:"font-mono text-[11px]",children:["phase: ",Ge.phase||"-"]}),O.jsxs(Io,{variant:"outline",className:"font-mono text-[11px]",children:["type: ",Ge.type]}),O.jsxs("span",{className:"font-mono text-[11px] text-catppuccin-overlay0",children:["maxRetries: ",String(Ge.maxRetries)]}),Ge.hasCondition&&O.jsx("span",{className:"rounded bg-catppuccin-surface1 px-1 py-0.5 text-[11px]",children:"condition ✓"}),Ge.hasBeforeStep&&O.jsx("span",{className:"rounded bg-catppuccin-surface1 px-1 py-0.5 text-[11px]",children:"beforeStep ✓"}),Ge.hasAfterStep&&O.jsx("span",{className:"rounded bg-catppuccin-surface1 px-1 py-0.5 text-[11px]",children:"afterStep ✓"})]}),Ge.task&&O.jsxs("div",{className:"mt-2 rounded bg-catppuccin-base p-2 font-mono text-xs",children:[O.jsx("div",{className:"font-semibold text-catppuccin-subtext0",children:"task"}),O.jsxs("div",{children:["action: ",Ll(Ge.task.action,120)]}),Ge.task.subagentType&&O.jsxs("div",{children:["subagent: ",Ge.task.subagentType]}),Ge.task.readonly!=null&&O.jsxs("div",{children:["readonly: ",String(Ge.task.readonly)]})]}),Ge.humanGate&&O.jsxs("div",{className:"mt-2 rounded bg-catppuccin-base p-2 text-xs",children:[O.jsx("div",{className:"font-semibold text-catppuccin-subtext0",children:"humanGate"}),O.jsxs("div",{className:"font-mono",children:["present:"," ",(Ge.humanGate.presentArtifacts??[]).join(", ")||"-"]}),O.jsxs("div",{className:"font-mono",children:["outcomeKey: ",Ge.humanGate.outcomeQuestionKey]}),Ge.humanGate.reviseTargetStep&&O.jsxs("div",{className:"font-mono",children:["reviseTarget: ",Ge.humanGate.reviseTargetStep]}),O.jsxs("div",{className:"font-mono",children:["questions: ",(Ge.humanGate.questions??[]).length]})]}),Ge.parallel&&O.jsxs("div",{className:"mt-2 rounded bg-catppuccin-base p-2 text-xs",children:[O.jsx("div",{className:"font-semibold text-catppuccin-subtext0",children:"parallel"}),(Ge.parallel.subtasks??[]).map(H=>O.jsxs("div",{className:"font-mono",children:["- ",H.key," (",H.subagentType,") ",H.readonly?"[readonly]":""]},H.key))]}),Ge.onFail!=null&&O.jsxs("div",{className:"mt-1 font-mono text-[11px] text-catppuccin-overlay0",children:["onFail: ",JSON.stringify(Ge.onFail)]})]}):O.jsx("div",{className:"text-xs text-catppuccin-overlay0",children:"(no definition)"})]}),O.jsxs("div",{children:[O.jsx("h3",{className:"mb-1 text-xs font-bold tracking-wide text-catppuccin-lavender",children:"② 進捗"}),Q?O.jsxs(ks,{className:"bg-catppuccin-surface0 p-2",children:[O.jsxs("div",{className:"flex items-center gap-2 text-xs",children:[O.jsx("span",{className:"font-bold",style:{color:Q.status==="passed"?"#a6e3a1":Q.status==="failed"?"#f38ba8":Q.status==="running"?"#89b4fa":"#6c7086"},children:Q.status}),O.jsxs("span",{className:"font-mono text-catppuccin-overlay0",children:["attempts ",Q.retryCount,"/",String(Q.maxRetries)]}),O.jsxs("span",{className:"ml-auto font-mono text-[11px] text-catppuccin-subtext0",children:["idx ",Q.stepIndex]})]}),Lt.length>0&&O.jsxs("div",{className:"mt-2",children:[O.jsxs("div",{className:"text-[11px] font-semibold text-catppuccin-subtext0",children:["attempts (",Lt.length,")"]}),O.jsx("div",{className:"flex flex-col gap-1 font-mono text-[11px]",children:Lt.map(H=>O.jsxs("div",{className:"truncate text-catppuccin-text",children:[H.startedAt??""," #",H.attemptNumber," check:",H.checkStatus??"-"]},H.id))})]}),qe.length>0&&O.jsxs("div",{className:"mt-2",children:[O.jsxs("div",{className:"text-[11px] font-semibold text-catppuccin-subtext0",children:["gateEvents (",qe.length,")"]}),O.jsx("div",{className:"flex flex-col gap-1 font-mono text-[11px]",children:qe.map(H=>O.jsxs("div",{className:"truncate text-catppuccin-yellow",children:[H.createdAt??""," ",H.event," ",H.choice??""]},H.id))})]}),O.jsxs("div",{className:"mt-2",children:[O.jsx("div",{className:"text-[11px] font-semibold text-catppuccin-subtext0",children:"history (filtered, latest 20)"}),Me.length===0?O.jsx("div",{className:"text-xs text-catppuccin-subtext0",children:"(no history)"}):O.jsx("div",{className:"flex flex-col gap-1 font-mono text-[11px]",children:Me.map((H,X)=>O.jsx("div",{className:jt("truncate",H.kind==="attempt"?"text-catppuccin-text":"text-catppuccin-yellow"),children:H_(H)},X))})]})]}):O.jsx(ks,{className:"bg-catppuccin-surface0 p-2",children:O.jsx("div",{className:"text-xs text-catppuccin-overlay0",children:"セッション未選択またはステップ進捗なし（定義のみブラウズ中）"})})]}),O.jsxs("div",{children:[O.jsxs("div",{className:"mb-1 flex flex-wrap items-center gap-2",children:[O.jsx("h3",{className:"text-xs font-bold tracking-wide text-catppuccin-lavender",children:"③ 成果物"}),O.jsxs("span",{className:"text-xs font-normal text-catppuccin-subtext0",children:["(",ne,")"]}),ne>0&&O.jsxs(O.Fragment,{children:[(()=>{let H=0,X=0;for(const Te of Fe){const we=ge(Te);we===!0?H++:we===void 0&&X++}const he=ne-H-X;return X>0?O.jsxs("span",{className:"text-xs text-catppuccin-subtext0",children:["— 存在 ",H," / 欠損 ",he," / 判定中 ",X]}):O.jsxs("span",{className:"text-xs text-catppuccin-subtext0",children:["— 存在 ",H," / 欠損 ",he]})})(),ne>Di&&O.jsx("button",{onClick:()=>C(H=>!H),className:"rounded bg-catppuccin-surface1 px-2 py-0.5 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",children:L?"a: collapse":`… 他${ne-Di}件 (aで展開)`})]})]}),ne===0?O.jsx("div",{className:"text-xs text-catppuccin-subtext0",children:z?"(no artifacts for this step)":"(no session)"}):O.jsxs("div",{className:"flex flex-col gap-1",children:[Fe.slice(0,xe).map((H,X)=>{const he=ge(H),Te=Ee(H,he),we=X===w;return O.jsxs("button",{onClick:()=>{E(X)},onDoubleClick:()=>{E(X),g(!0)},className:jt("flex w-full items-center gap-2 rounded px-2 py-1 text-left font-mono text-xs",we?"bg-[#334433] font-bold":"hover:bg-catppuccin-surface0",we?"ring-1 ring-catppuccin-yellow":""),children:[O.jsx("span",{className:jt("shrink-0",we?"text-catppuccin-yellow":"text-transparent"),children:"▸"}),O.jsx("span",{className:jt("truncate",he===!0?"text-catppuccin-sky":he===!1?"text-catppuccin-red":"text-catppuccin-overlay0"),children:Te})]},`${H.artifactKey}-${X}`)}),ye&&O.jsx("div",{className:"px-2 py-1 font-mono text-xs text-catppuccin-overlay0",children:(()=>{const H=ne-Di;let X=0,he=0;for(let Te=Di;Te<ne;Te++){const we=ge(Fe[Te]);we===!1?X++:we===void 0&&he++}return he>0?`… 他 ${H}件 (欠損 ${X} / 判定中 ${he}) (aで展開)`:X===H?`… 他 ${H}件は欠損 (aで展開)`:`… 他 ${H}件 (欠損 ${X}) (aで展開)`})()}),x&&Fe[w]&&O.jsxs(ks,{className:"mt-2 border-catppuccin-surface2 bg-catppuccin-mantle",children:[O.jsxs("div",{className:"border-b border-catppuccin-surface1 px-3 py-1 text-xs font-semibold text-catppuccin-subtext0",children:["Preview: ",Fe[w].artifactKey," ",O.jsx("span",{className:"font-mono font-normal text-catppuccin-overlay0",children:Fe[w].filePath})]}),O.jsx("div",{className:"max-h-[50vh] overflow-auto p-3 font-mono text-xs",children:I?O.jsx("div",{className:"text-catppuccin-subtext0",children:"loading..."}):N!=null&&N.ok?(()=>{const H=N.content??"";if(!H)return O.jsx("div",{className:"text-catppuccin-subtext0",children:"(empty file)"});const X=H.split(`
`);return O.jsx("div",{className:"flex flex-col",children:X.map((he,Te)=>O.jsx("div",{className:"whitespace-pre-wrap break-all text-catppuccin-text",children:he||" "},Te))})})():N?O.jsx("div",{className:"text-catppuccin-yellow",children:Ru(N.reason??"unknown")}):O.jsx("div",{className:"text-catppuccin-subtext0",children:"no preview"})}),O.jsx("div",{className:"border-t border-catppuccin-surface1 px-3 py-1 text-[10px] text-catppuccin-overlay0",children:"Enter: collapse"})]}),!x&&Fe[w]&&O.jsx("div",{className:"px-2 py-1 font-mono text-xs",children:(()=>{const H=Fe[w],X=ge(H);if(X===!1)return O.jsx("span",{className:"text-catppuccin-red",children:Ru("file not found")});if(X===void 0)return O.jsx("span",{className:"text-catppuccin-overlay0",children:"判定中…"});const he=k_(H.filePath);return he?O.jsx("span",{className:"text-catppuccin-yellow",children:Ru(he)}):O.jsxs("span",{className:"text-catppuccin-overlay0",children:["Press Enter to preview ",H.filePath]})})()}),Fe.length>0&&!x&&O.jsx("button",{onClick:()=>g(!0),className:"mt-1 rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",children:"Preview"}),x&&O.jsx("button",{onClick:()=>g(!1),className:"mt-1 rounded bg-catppuccin-surface1 px-2 py-1 text-xs text-catppuccin-text hover:bg-catppuccin-surface2",children:"Close preview"})]})]})]}):O.jsx("div",{className:"p-4 text-sm text-catppuccin-subtext0",children:z?O.jsxs("div",{className:"flex flex-col gap-2",children:[O.jsx("div",{className:"text-xs font-semibold text-catppuccin-lavender",children:"Session overview"}),O.jsxs(ks,{className:"bg-catppuccin-surface0 p-2",children:[O.jsxs("div",{className:"font-mono text-xs",children:["id: ",z.id]}),O.jsxs("div",{className:"font-mono text-xs",children:["workflow: ",z.workflowId]}),O.jsxs("div",{className:"font-mono text-xs",children:["status: ",z.status]}),O.jsxs("div",{className:"font-mono text-xs",children:["currentStep: ",z.currentStep??"-"]}),O.jsxs("div",{className:"font-mono text-xs",children:["steps: ",Y.length]})]}),O.jsx("div",{className:"text-xs text-catppuccin-overlay0",children:"ノードクリックで詳細を表示。右ペインは選択中ノードの三位一体表示です。"})]}):O.jsx("div",{children:"ノードを選択してください。"})})})]})]})}P_.createRoot(document.getElementById("root")).render(O.jsx(E_.StrictMode,{children:O.jsx(Xw,{})}));
