(function (angular) {
    "use strict";
//    decleration of all modules is made here for convinience, then all of them injected into main module Musicanto
    angular.module('cpControllers', []);
    angular.module('cpDirectives',[]);
    angular.module('cpServices',['ngResource', 'ngCookies']);
    angular.module('cpRoutes', ['ui.router'])
    angular.module('cloudplayer', ['cpRoutes', 'cpControllers', 'cpDirectives', 'cpServices'])
})(angular);
(function (angular) {
    angular.module('cpRoutes').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
        .otherwise('/')
        $stateProvider
        .state('main', {
            url: "/",
                templateUrl: 'app/components/mainPage/mainPage.html',
                controller: 'mainPageController',
                controllerAs: 'mainPageCtrl'
            });
//        $locationProvider.html5Mode(true);  //remove # from address bar
    })
})(angular);

(function (angular) {
    var notifierFn = function () {
        toastr.options.closeButton = true;
        toastr.options.progressBar = true;
        toastr.options.showMethod = 'slideDown';
        toastr.options.hideMethod = 'slideUp';
        toastr.options.closeMethod = 'slideUp';
        toastr.options.timeOut = 2000;
        var msg = "Now Playing: ";
        var space = " ";
        return {
            clickedSongnotify: function (song) {
                toastr.success(msg + space + song.title);
            },
            displayGeneralInfoMsg: function (msg) {
                toastr.info(msg)
            }
        }
    };
    angular.module('cpServices').factory('notifier', notifierFn);
})(angular);
var Recorder={swfObject:null,_callbacks:{},_events:{},_initialized:false,options:{},initialize:function(options){this.options=options||{};if(!this.options.flashContainer){this._setupFlashContainer()}this.bind("initialized",function(){Recorder._initialized=true;options.initialized()});this.bind("showFlash",this.options.onFlashSecurity||this._defaultOnShowFlash);this._loadFlash()},clear:function(){Recorder._events={}},record:function(options){options=options||{};this.clearBindings("recordingStart");this.clearBindings("recordingProgress");this.clearBindings("recordingCancel");this.bind("recordingStart",this._defaultOnHideFlash);this.bind("recordingCancel",this._defaultOnHideFlash);this.bind("recordingCancel",this._loadFlash);this.bind("recordingStart",options["start"]);this.bind("recordingProgress",options["progress"]);this.bind("recordingCancel",options["cancel"]);this.flashInterface().record()},stop:function(){return this.flashInterface()._stop()},play:function(options){options=options||{};this.clearBindings("playingProgress");this.bind("playingProgress",options["progress"]);this.bind("playingStop",options["finished"]);this.flashInterface()._play()},upload:function(options){options.audioParam=options.audioParam||"audio";options.params=options.params||{};this.clearBindings("uploadSuccess");this.bind("uploadSuccess",function(responseText){options.success(Recorder._externalInterfaceDecode(responseText))});this.flashInterface().upload(options.url,options.audioParam,options.params)},audioData:function(){return this.flashInterface().audioData().split(";")},request:function(method,uri,contentType,data,callback){var callbackName=this.registerCallback(callback);this.flashInterface().request(method,uri,contentType,data,callbackName)},clearBindings:function(eventName){Recorder._events[eventName]=[]},bind:function(eventName,fn){if(!Recorder._events[eventName]){Recorder._events[eventName]=[]}Recorder._events[eventName].push(fn)},triggerEvent:function(eventName,arg0,arg1){Recorder._executeInWindowContext(function(){for(var cb in Recorder._events[eventName]){if(Recorder._events[eventName][cb]){Recorder._events[eventName][cb].apply(Recorder,[arg0,arg1])}}})},triggerCallback:function(name,args){Recorder._executeInWindowContext(function(){Recorder._callbacks[name].apply(null,args)})},registerCallback:function(fn){var name="CB"+parseInt(Math.random()*999999,10);Recorder._callbacks[name]=fn;return name},flashInterface:function(){if(!this.swfObject){return null}else if(this.swfObject.record){return this.swfObject}else if(this.swfObject.children[3].record){return this.swfObject.children[3]}},_executeInWindowContext:function(fn){window.setTimeout(fn,1)},_setupFlashContainer:function(){this.options.flashContainer=document.createElement("div");this.options.flashContainer.setAttribute("id","recorderFlashContainer");this.options.flashContainer.setAttribute("style","position: fixed; left: -9999px; top: -9999px; width: 230px; height: 140px; margin-left: 10px; border-top: 6px solid rgba(128, 128, 128, 0.6); border-bottom: 6px solid rgba(128, 128, 128, 0.6); border-radius: 5px 5px; padding-bottom: 1px; padding-right: 1px;");document.body.appendChild(this.options.flashContainer)},_clearFlash:function(){var flashElement=this.options.flashContainer.children[0];if(flashElement){this.options.flashContainer.removeChild(flashElement)}},_loadFlash:function(){this._clearFlash();var flashElement=document.createElement("div");flashElement.setAttribute("id","recorderFlashObject");this.options.flashContainer.appendChild(flashElement);swfobject.embedSWF(this.options.swfSrc,"recorderFlashObject","231","141","10.1.0",undefined,undefined,{allowscriptaccess:"always"},undefined,function(e){if(e.success){Recorder.swfObject=e.ref;Recorder._checkForFlashBlock()}else{Recorder._showFlashRequiredDialog()}})},_defaultOnShowFlash:function(){var flashContainer=Recorder.options.flashContainer;flashContainer.style.left=(window.innerWidth||document.body.offsetWidth)/2-115+"px";flashContainer.style.top=(window.innerHeight||document.body.offsetHeight)/2-70+"px"},_defaultOnHideFlash:function(){var flashContainer=Recorder.options.flashContainer;flashContainer.style.left="-9999px";flashContainer.style.top="-9999px"},_checkForFlashBlock:function(){window.setTimeout(function(){if(!Recorder._initialized){Recorder.triggerEvent("showFlash")}},500)},_showFlashRequiredDialog:function(){Recorder.options.flashContainer.innerHTML="<p>Adobe Flash Player 10.1 or newer is required to use this feature.</p><p><a href='http://get.adobe.com/flashplayer' target='_top'>Get it on Adobe.com.</a></p>";Recorder.options.flashContainer.style.color="white";Recorder.options.flashContainer.style.backgroundColor="#777";Recorder.options.flashContainer.style.textAlign="center";Recorder.triggerEvent("showFlash")},_externalInterfaceDecode:function(data){return data.replace(/%22/g,'"').replace(/%5c/g,"\\").replace(/%26/g,"&").replace(/%25/g,"%")}};if(swfobject==undefined){var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if(typeof j.readyState!=D&&j.readyState=="complete"||typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body)){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){!function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()}()}}if(M.wk){!function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()}()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;!function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()}()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return!a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||!/%$/.test(aa.width)&&parseInt(aa.width,10)<310){aa.width="310"}if(typeof aa.height==D||!/%$/.test(aa.height)&&parseInt(aa.height,10)<137){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+encodeURI(O.location).toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";!function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}}()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";!function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}}()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";!function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}}()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return Y[0]>X[0]||Y[0]==X[0]&&Y[1]>X[1]||Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=ad&&typeof ad=="string"?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring(Y[X].indexOf("=")+1))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}()}var __hasProp=Object.prototype.hasOwnProperty;window.SC=window.SC||{};window.SC.URI=function(uri,options){var AUTHORITY_REGEXP,URI_REGEXP;if(uri==null){uri=""}if(options==null){options={}}URI_REGEXP=/^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/;AUTHORITY_REGEXP=/^(?:([^@]*)@)?([^:]*)(?::(\d*))?/;this.scheme=this.user=this.password=this.host=this.port=this.path=this.query=this.fragment=null;this.toString=function(){var str;str="";if(this.isAbsolute()){str+=this.scheme;str+="://";if(this.user!=null){str+=this.user+":"+this.password+"@"}str+=this.host;if(this.port!=null){str+=":"+this.port}}str+=this.path;if(this.path===""&&(this.query!=null||this.fragment!=null)){str+="/"}if(this.query!=null){str+=this.encodeParamsWithPrepend(this.query,"?")}if(this.fragment!=null){str+=this.encodeParamsWithPrepend(this.fragment,"#")}return str};this.isRelative=function(){return!this.isAbsolute()};this.isAbsolute=function(){return this.host!=null};this.decodeParams=function(string){var key,params,part,splitted,value,_i,_len,_ref;if(string==null){string=""}params={};_ref=string.split("&");for(_i=0,_len=_ref.length;_i<_len;_i++){part=_ref[_i];if(part!==""){splitted=part.split("=");key=decodeURIComponent(splitted[0]);value=decodeURIComponent(splitted[1]||"").replace(/\+/g," ");this.normalizeParams(params,key,value)}}return params};this.normalizeParams=function(params,name,v){var after,child_key,k,lastP,result,result_i;if(v==null){v=NULL}result=name.match(/^[\[\]]*([^\[\]]+)\]*(.*)/);k=result[1]||"";after=result[2]||"";if(after===""){params[k]=v}else if(after==="[]"){params[k]||(params[k]=[]);params[k].push(v)}else if(result_i=after.match(/^\[\]\[([^\[\]]+)\]$/)||(result_i=after.match(/^\[\](.+)$/))){child_key=result_i[1];params[k]||(params[k]=[]);lastP=params[k][params[k].length-1];if(lastP!=null&&lastP.constructor===Object&&!(lastP[child_key]!=null)){this.normalizeParams(lastP,child_key,v)}else{params[k].push(this.normalizeParams({},child_key,v))}}else{params[k]||(params[k]={});params[k]=this.normalizeParams(params[k],after,v)}return params};this.encodeParamsWithPrepend=function(params,prepend){var encoded;encoded=this.encodeParams(params);if(encoded!==""){return prepend+encoded}else{return""}};this.encodeParams=function(params){var flattened,key,keyValueStrings,kv,paramString,value,_i,_len;paramString="";if(params.constructor===String){return paramString=params}else{flattened=this.flattenParams(params);keyValueStrings=[];for(_i=0,_len=flattened.length;_i<_len;_i++){kv=flattened[_i];key=kv[0];value=kv[1];if(value===null){keyValueStrings.push(key)}else{keyValueStrings.push(key+"="+encodeURIComponent(value))}}return paramString=keyValueStrings.join("&")}};this.flattenParams=function(params,prefix,paramsArray){var key,prefixedKey,value,_i,_len;if(prefix==null){prefix=""}if(paramsArray==null){paramsArray=[]}if(!(params!=null)){if(prefix!=null){paramsArray.push([prefix,null])}}else if(params.constructor===Object){for(key in params){if(!__hasProp.call(params,key))continue;value=params[key];if(prefix!==""){prefixedKey=prefix+"["+key+"]"}else{prefixedKey=key}this.flattenParams(value,prefixedKey,paramsArray)}}else if(params.constructor===Array){for(_i=0,_len=params.length;_i<_len;_i++){value=params[_i];this.flattenParams(value,prefix+"[]",paramsArray)}}else if(prefix!==""){paramsArray.push([prefix,params])}return paramsArray};this.parse=function(uri,options){var authority,authority_result,nullIfBlank,result,userinfo;if(uri==null){uri=""}if(options==null){options={}}nullIfBlank=function(str){if(str===""){return null}else{return str}};result=uri.match(URI_REGEXP);this.scheme=nullIfBlank(result[1]);authority=result[2];if(authority!=null){authority_result=authority.match(AUTHORITY_REGEXP);userinfo=nullIfBlank(authority_result[1]);if(userinfo!=null){this.user=userinfo.split(":")[0];this.password=userinfo.split(":")[1]}this.host=nullIfBlank(authority_result[2]);this.port=parseInt(authority_result[3],10)||null}this.path=result[3];this.query=nullIfBlank(result[4]);if(options.decodeQuery){this.query=this.decodeParams(this.query)}this.fragment=nullIfBlank(result[5]);if(options.decodeFragment){return this.fragment=this.decodeParams(this.fragment)}};this.parse(uri.toString(),options);return this};!function(){var AbstractDialog,ConnectDialog,EchoDialog,PickerDialog,Player,_ref,_ref1,_ref2,__hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child};window.SC||(window.SC={});SC.Helper={merge:function(a,b){var k,newObj,v,_i,_len;if(a.constructor===Array){newObj=Array.apply(null,a);for(_i=0,_len=b.length;_i<_len;_i++){v=b[_i];newObj.push(v)}return newObj}else{newObj={};for(k in a){if(!__hasProp.call(a,k))continue;v=a[k];newObj[k]=v}for(k in b){if(!__hasProp.call(b,k))continue;v=b[k];newObj[k]=v}return newObj}},groupBy:function(collection,attribute){var group,object,value,_i,_len,_name;group={};for(_i=0,_len=collection.length;_i<_len;_i++){object=collection[_i];if(value=object[attribute]){group[_name=object[attribute]]||(group[_name]=[]);group[object[attribute]].push(object)}}return group},loadJavascript:function(src,callback){var elem;elem=document.createElement("script");elem.async=true;elem.src=src;SC.Helper.attachLoadEvent(elem,callback);document.body.appendChild(elem);return elem},extractOptionsAndCallbackArguments:function(optionsOrCallback,callback){var args;args={};if(callback!=null){args.callback=callback;args.options=optionsOrCallback}else if(typeof optionsOrCallback==="function"){args.callback=optionsOrCallback;args.options={}}else{args.options=optionsOrCallback||{}}return args},openCenteredPopup:function(url,width,height){var options;options={};if(height!=null){options.width=width;options.height=height}else{options=width}options=SC.Helper.merge(options,{location:1,left:window.screenX+(window.outerWidth-options.width)/2,top:window.screenY+(window.outerHeight-options.height)/2,toolbar:"no",scrollbars:"yes"});return window.open(url,options.name,this._optionsToString(options))},_optionsToString:function(options){var k,optionsArray,v;optionsArray=[];for(k in options){if(!__hasProp.call(options,k))continue;v=options[k];optionsArray.push(k+"="+v)}return optionsArray.join(", ")},attachLoadEvent:function(element,func){if(element.addEventListener){return element.addEventListener("load",func,false)}else{return element.onreadystatechange=function(){if(this.readyState==="complete"){return func()}}}},millisecondsToHMS:function(ms){var hms,m,mPrefix,sPrefix,tc;hms={h:Math.floor(ms/(60*60*1e3)),m:Math.floor(ms/6e4%60),s:Math.floor(ms/1e3%60)};tc=[];if(hms.h>0){tc.push(hms.h)}m=hms.m;mPrefix="";sPrefix="";if(hms.m<10&&hms.h>0){mPrefix="0"}if(hms.s<10){sPrefix="0"}tc.push(mPrefix+hms.m);tc.push(sPrefix+hms.s);return tc.join(".")},setFlashStatusCodeMaps:function(query){query["_status_code_map[400]"]=200;query["_status_code_map[401]"]=200;query["_status_code_map[403]"]=200;query["_status_code_map[404]"]=200;query["_status_code_map[422]"]=200;query["_status_code_map[500]"]=200;query["_status_code_map[503]"]=200;return query["_status_code_map[504]"]=200},responseHandler:function(responseText,xhr){var error,json;json=SC.Helper.JSON.parse(responseText);error=null;if(!json){if(xhr){error={message:"HTTP Error: "+xhr.status}}else{error={message:"Unknown error"}}}else if(json.errors){error={message:json.errors&&json.errors[0].error_message}}return{json:json,error:error}},FakeStorage:function(){return{_store:{},getItem:function(key){return this._store[key]||null},setItem:function(key,value){return this._store[key]=value.toString()},removeItem:function(key){return delete this._store[key]}}},JSON:{parse:function(string){if(string[0]!=="{"&&string[0]!=="["){return null}else if(window.JSON!=null){return window.JSON.parse(string)}else{return eval(string)}}}};window.SC=SC.Helper.merge(SC||{},{_version:"2.0.0",_baseUrl:"//connect.soundcloud.com",options:{site:"soundcloud.com",baseUrl:"//connect.soundcloud.com"},connectCallbacks:{},_popupWindow:void 0,initialize:function(options){var key,value,_base;if(options==null){options={}}this.accessToken(options["access_token"]);for(key in options){if(!__hasProp.call(options,key))continue;value=options[key];this.options[key]=value}(_base=this.options).flashXHR||(_base.flashXHR=(new XMLHttpRequest).withCredentials===void 0);return this},hostname:function(subdomain){var str;str="";if(subdomain!=null){str+=subdomain+"."}str+=this.options.site;return str}});window.SC=SC.Helper.merge(SC||{},{_apiRequest:function(method,path,query,callback){var data,uri;if(callback==null){callback=query;query=void 0}query||(query={});uri=SC.prepareRequestURI(path,query);uri.query.format="json";if(SC.options.flashXHR){SC.Helper.setFlashStatusCodeMaps(uri.query)}else{uri.query["_status_code_map[302]"]=200}if(method==="PUT"||method==="DELETE"){uri.query._method=method;method="POST"}if(method!=="GET"){data=uri.encodeParams(uri.query);uri.query={}}return this._request(method,uri,"application/x-www-form-urlencoded",data,function(responseText,xhr){var response;response=SC.Helper.responseHandler(responseText,xhr);if(response.json&&response.json.status==="302 - Found"){return SC._apiRequest("GET",response.json.location,callback)}else{return callback(response.json,response.error)}})},_request:function(method,uri,contentType,data,callback){if(SC.options.flashXHR){return this._flashRequest(method,uri,contentType,data,callback)}else{return this._xhrRequest(method,uri,contentType,data,callback)}},_xhrRequest:function(method,uri,contentType,data,callback){var request;request=new XMLHttpRequest;request.open(method,uri.toString(),true);request.setRequestHeader("Content-Type",contentType);request.onreadystatechange=function(e){if(e.target.readyState===4){return callback(e.target.responseText,e.target)}};return request.send(data)},_flashRequest:function(method,uri,contentType,data,callback){return this.whenRecordingReady(function(){return Recorder.request(method,uri.toString(),contentType,data,function(data,xhr){return callback(Recorder._externalInterfaceDecode(data),xhr)})})},post:function(path,query,callback){return this._apiRequest("POST",path,query,callback)},put:function(path,query,callback){return this._apiRequest("PUT",path,query,callback)},get:function(path,query,callback){return this._apiRequest("GET",path,query,callback)},"delete":function(path,callback){return this._apiRequest("DELETE",path,{},callback)},prepareRequestURI:function(path,query){var k,uri,v;if(query==null){query={}}uri=new SC.URI(path,{decodeQuery:true});for(k in query){if(!__hasProp.call(query,k))continue;v=query[k];uri.query[k]=v}if(uri.isRelative()){uri.host=this.hostname("api");uri.scheme=window.location.protocol.slice(0,-1)}if(this.accessToken()!=null){uri.query.oauth_token=this.accessToken();uri.scheme="https"}else{uri.query.client_id=this.options.client_id}return uri},_getAll:function(path,query,callback,collection){if(collection==null){collection=[]}if(callback==null){callback=query;query=void 0}query||(query={});query.offset||(query.offset=0);query.limit||(query.limit=50);return this.get(path,query,function(objects,error){if(objects.constructor===Array&&objects.length>0){collection=SC.Helper.merge(collection,objects);query.offset+=query.limit;return SC._getAll(path,query,callback,collection)}else{return callback(collection,null)}})}});window.SC=SC.Helper.merge(SC||{},{_connectWindow:null,connect:function(optionsOrCallback){var dialog,dialogOptions,options;if(typeof optionsOrCallback==="function"){options={connected:optionsOrCallback}}else{options=optionsOrCallback}dialogOptions={client_id:options.client_id||SC.options.client_id,redirect_uri:options.redirect_uri||SC.options.redirect_uri,response_type:"code_and_token",scope:options.scope||"non-expiring",display:"popup",window:options.window,retainWindow:options.retainWindow};if(dialogOptions.client_id&&dialogOptions.redirect_uri){dialog=SC.dialog(SC.Dialog.CONNECT,dialogOptions,function(params){if(params.error!=null){throw new Error("SC OAuth2 Error: "+params.error_description)}else{SC.accessToken(params.access_token);if(options.connected!=null){options.connected()}}if(options.callback!=null){return options.callback()}});this._connectWindow=dialog.options.window;return dialog}else{throw"Options client_id and redirect_uri must be passed"}},connectCallback:function(){return SC.Dialog._handleDialogReturn(SC._connectWindow)},disconnect:function(){return this.accessToken(null)},_trigger:function(eventName,argument){if(this.connectCallbacks[eventName]!=null){return this.connectCallbacks[eventName](argument)}},accessToken:function(value){var storage,storageKey;storageKey="SC.accessToken";storage=this.storage();if(value===void 0){return storage.getItem(storageKey)}else if(value===null){return storage.removeItem(storageKey)}else{return storage.setItem(storageKey,value)}},isConnected:function(){return this.accessToken()!=null}});window.SC=SC.Helper.merge(SC||{},{_dialogsPath:"/dialogs",dialog:function(dialogName,optionsOrCallback,callback){var a,dialog,options;a=SC.Helper.extractOptionsAndCallbackArguments(optionsOrCallback,callback);options=a.options;callback=a.callback;options.callback=callback;options.redirect_uri=this.options.redirect_uri;dialog=new SC.Dialog[dialogName+"Dialog"](options);SC.Dialog._dialogs[dialog.id]=dialog;dialog.open();return dialog},Dialog:{ECHO:"Echo",CONNECT:"Connect",PICKER:"Picker",ID_PREFIX:"SoundCloud_Dialog",_dialogs:{},_isDialogId:function(id){return(id||"").match(new RegExp("^"+this.ID_PREFIX))},_getDialogIdFromWindow:function(window){var id,loc;loc=new SC.URI(window.location,{decodeQuery:true,decodeFragment:true});id=loc.query.state||loc.fragment.state;if(this._isDialogId(id)){return id}else{return null}},_handleDialogReturn:function(window){var dialog,dialogId;dialogId=this._getDialogIdFromWindow(window);dialog=this._dialogs[dialogId];if(dialog!=null){if(dialog.handleReturn()){return delete this._dialogs[dialogId]}}},_handleInPopupContext:function(){var isiOS5;if(this._getDialogIdFromWindow(window)&&!window.location.pathname.match(/\/dialogs\//)){isiOS5=navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i);if(isiOS5){return window.opener.SC.Dialog._handleDialogReturn(window)}else if(window.opener){return window.opener.setTimeout(function(){return window.opener.SC.Dialog._handleDialogReturn(window)},1)}else if(window.top){return window.top.setTimeout(function(){return window.top.SC.Dialog._handleDialogReturn(window)},1)}}},AbstractDialog:AbstractDialog=function(){AbstractDialog.prototype.WIDTH=456;AbstractDialog.prototype.HEIGHT=510;AbstractDialog.prototype.ID_PREFIX="SoundCloud_Dialog";AbstractDialog.prototype.PARAM_KEYS=["redirect_uri"];AbstractDialog.prototype.requiresAuthentication=false;AbstractDialog.prototype.generateId=function(){return[this.ID_PREFIX,Math.ceil(Math.random()*1e6).toString(16)].join("_")};function AbstractDialog(options){this.options=options!=null?options:{};this.id=this.generateId()}AbstractDialog.prototype.buildURI=function(uri){var paramKey,_i,_len,_ref;if(uri==null){uri=new SC.URI(SC._baseUrl)}uri.scheme=window.location.protocol.slice(0,-1);uri.path+=SC._dialogsPath+"/"+this.name+"/";uri.fragment={state:this.id};if(this.requiresAuthentication){uri.fragment.access_token=SC.accessToken()}_ref=this.PARAM_KEYS;for(_i=0,_len=_ref.length;_i<_len;_i++){paramKey=_ref[_i];if(this.options[paramKey]!=null){uri.fragment[paramKey]=this.options[paramKey]}}uri.port=null;return uri};AbstractDialog.prototype.open=function(){var url;if(this.requiresAuthentication&&SC.accessToken()==null){return this.authenticateAndOpen()}else{url=this.buildURI();if(this.options.window!=null){return this.options.window.location=url}else{return this.options.window=SC.Helper.openCenteredPopup(url,{width:this.WIDTH,height:this.HEIGHT})}}};AbstractDialog.prototype.authenticateAndOpen=function(){var connectDialog,_this=this;return connectDialog=SC.connect({retainWindow:true,window:this.options.window,connected:function(){_this.options.window=connectDialog.options.window;return _this.open()}})};AbstractDialog.prototype.paramsFromWindow=function(){var params,url;url=new SC.URI(this.options.window.location,{decodeFragment:true,decodeQuery:true});return params=SC.Helper.merge(url.query,url.fragment)};AbstractDialog.prototype.handleReturn=function(){var params;params=this.paramsFromWindow();if(!this.options.retainWindow){this.options.window.close()}return this.options.callback(params)};return AbstractDialog}(),EchoDialog:EchoDialog=function(_super){__extends(EchoDialog,_super);function EchoDialog(){_ref=EchoDialog.__super__.constructor.apply(this,arguments);return _ref}EchoDialog.prototype.PARAM_KEYS=["client_id","redirect_uri","hello"];EchoDialog.prototype.name="echo";return EchoDialog}(AbstractDialog),PickerDialog:PickerDialog=function(_super){__extends(PickerDialog,_super);
function PickerDialog(){_ref1=PickerDialog.__super__.constructor.apply(this,arguments);return _ref1}PickerDialog.prototype.PARAM_KEYS=["client_id","redirect_uri"];PickerDialog.prototype.name="picker";PickerDialog.prototype.requiresAuthentication=true;PickerDialog.prototype.handleReturn=function(){var params,_this=this;params=this.paramsFromWindow();if(params.action==="logout"){SC.accessToken(null);this.open();return false}else if(params.track_uri!=null){if(!this.options.retainWindow){this.options.window.close()}SC.get(params.track_uri,function(track){return _this.options.callback({track:track})});return true}};return PickerDialog}(AbstractDialog),ConnectDialog:ConnectDialog=function(_super){__extends(ConnectDialog,_super);function ConnectDialog(){_ref2=ConnectDialog.__super__.constructor.apply(this,arguments);return _ref2}ConnectDialog.prototype.PARAM_KEYS=["client_id","redirect_uri","client_secret","response_type","scope","display"];ConnectDialog.prototype.name="connect";ConnectDialog.prototype.buildURI=function(){var uri;uri=ConnectDialog.__super__.buildURI.apply(this,arguments);uri.scheme="https";uri.host="soundcloud.com";uri.path="/connect";uri.query=uri.fragment;uri.fragment={};return uri};return ConnectDialog}(AbstractDialog)}});SC.Dialog._handleInPopupContext();window.SC=SC.Helper.merge(SC||{},{Loader:{States:{UNLOADED:1,LOADING:2,READY:3},Package:function(name,loadFunction){return{name:name,callbacks:[],loadFunction:loadFunction,state:SC.Loader.States.UNLOADED,addCallback:function(fn){return this.callbacks.push(fn)},runCallbacks:function(){var callback,_i,_len,_ref3;_ref3=this.callbacks;for(_i=0,_len=_ref3.length;_i<_len;_i++){callback=_ref3[_i];callback.apply(this)}return this.callbacks=[]},setReady:function(){this.state=SC.Loader.States.READY;return this.runCallbacks()},load:function(){this.state=SC.Loader.States.LOADING;return this.loadFunction.apply(this)},whenReady:function(callback){switch(this.state){case SC.Loader.States.UNLOADED:this.addCallback(callback);return this.load();case SC.Loader.States.LOADING:return this.addCallback(callback);case SC.Loader.States.READY:return callback()}}}},packages:{},registerPackage:function(pkg){return this.packages[pkg.name]=pkg}}});window.SC=SC.Helper.merge(SC||{},{oEmbed:function(trackUrl,query,callback){var element,uri,_this=this;if(callback==null){callback=query;query=void 0}query||(query={});query.url=trackUrl;uri=new SC.URI(window.location.protocol+"//"+SC.hostname()+"/oembed.json");uri.query=query;if(callback.nodeType!==void 0&&callback.nodeType===1){element=callback;callback=function(oembed){return element.innerHTML=oembed.html}}return this._request("GET",uri.toString(),null,null,function(responseText,xhr){var response;response=SC.Helper.responseHandler(responseText,xhr);return callback(response.json,response.error)})}});window.SC=SC.Helper.merge(SC||{},{_recorderSwfPath:"/recorder.js/recorder-0.9.0.swf",whenRecordingReady:function(callback){return SC.Loader.packages.recording.whenReady(callback)},record:function(options){if(options==null){options={}}return this.whenRecordingReady(function(){return Recorder.record(options)})},recordStop:function(options){if(options==null){options={}}return Recorder.stop()},recordPlay:function(options){if(options==null){options={}}return Recorder.play(options)},recordUpload:function(query,callback){var flattenedParams,uri;if(query==null){query={}}uri=SC.prepareRequestURI("/tracks",query);uri.query.format="json";SC.Helper.setFlashStatusCodeMaps(uri.query);flattenedParams=uri.flattenParams(uri.query);return Recorder.upload({method:"POST",url:"https://"+this.hostname("api")+"/tracks",audioParam:"track[asset_data]",params:flattenedParams,success:function(responseText){var response;response=SC.Helper.responseHandler(responseText);return callback(response.json,response.error)}})}});SC.Loader.registerPackage(new SC.Loader.Package("recording",function(){if(Recorder.flashInterface()){return SC.Loader.packages.recording.setReady()}else{return Recorder.initialize({swfSrc:SC._baseUrl+SC._recorderSwfPath+"?"+SC._version,initialized:function(){return SC.Loader.packages.recording.setReady()}})}}));window.SC=SC.Helper.merge(SC||{},{storage:function(){return this._fakeStorage||(this._fakeStorage=new SC.Helper.FakeStorage)}});Player=function(){function Player(_player){this._player=_player}Player.prototype.play=function(position){if(this._player.getState()==="loading"||this._player.getState()==="initialize"){return this._player.on("stateChange",function(state){if(state==="idle"){return this.play()}})}else{return this._player.play()}};Player.prototype.stop=function(){this._player.pause();return this._player.seek(0)};Player.prototype.pause=function(){return this._player.pause()};Player.prototype.seek=function(ms){return this._player.seek(ms)};Player.prototype.setVolume=function(volume){return this._player.setVolume(volume)};Player.prototype.getVolume=function(){return this._player.getVolume()};Player.prototype.getType=function(){return this._player.getType()};Player.prototype.getCurrentPosition=function(){return this._player.getCurrentPosition()};Player.prototype.getLoadedPosition=function(){return this._player.getLoadedPosition()};Player.prototype.getDuration=function(){return this._player.getDuration()};Player.prototype.getState=function(){return this._player.getState()};return Player}();window.SC=SC.Helper.merge(SC||{},{whenStreamingReady:function(callback){return SC.Loader.packages.streaming.whenReady(callback)},_isNumeric:function(idOrUrl){return idOrUrl.toString().match(/^\d.*$/)},_prepareTrackUrl:function(idOrUrl){var preparedUrl,url;url=this._isNumeric(idOrUrl)?"/tracks/"+idOrUrl:idOrUrl;preparedUrl=SC.prepareRequestURI(url);return preparedUrl.toString()},_prepareStreamUrl:function(idOrUrl){var preparedUrl,url;url=this._isNumeric(idOrUrl)?"/tracks/"+idOrUrl:idOrUrl;preparedUrl=SC.prepareRequestURI(url);if(!preparedUrl.path.match(/\/stream/)){preparedUrl.path+="/streams"}return preparedUrl.toString()},_setOnPositionListenersForComments:function(player,comments,callback){var group;group=SC.Helper.groupBy(comments,"timestamp");return player._player.on("positionChange",function(current,loaded,duration){var collection,key,_i,_len,_ref3;collection=[];_ref3=Object.keys(group);for(_i=0,_len=_ref3.length;_i<_len;_i++){key=_ref3[_i];if(key>parseInt(current,10)){break}collection.push(group[key]);delete group[key]}collection=[].concat.apply([],collection);return callback(collection)})},stream:function(idOrUrl,optionsOrCallback,callback){var a,options,stream_url,track_url;a=SC.Helper.extractOptionsAndCallbackArguments(optionsOrCallback,callback);options=a.options;callback=a.callback;options.id="T"+idOrUrl+"-"+Math.random();track_url=this._prepareTrackUrl(idOrUrl);stream_url=this._prepareStreamUrl(idOrUrl);return SC.whenStreamingReady(function(){return SC.get(track_url,function(track){options.duration=track.duration;return SC.get(stream_url,function(streams){var createAndCallback,ontimedcommentsCallback,_this=this;options.src=streams.http_mp3_128_url||streams.rtmp_mp3_128_url;createAndCallback=function(options){var player;player=new Player(audioManager.createAudioPlayer(options));if(callback!=null){callback(player)}return player};if(ontimedcommentsCallback=options.ontimedcomments){delete options.ontimedcomments;return SC._getAll(track_url+"/comments",function(comments){var player;player=createAndCallback(options);return SC._setOnPositionListenersForComments(player,comments,ontimedcommentsCallback)})}else{return createAndCallback(options)}})})})},streamStopAll:function(){var player,_i,_len,_ref3,_results;if(window.audioManager!=null){_ref3=window.audioManager._players;_results=[];for(_i=0,_len=_ref3.length;_i<_len;_i++){player=_ref3[_i];player.pause();_results.push(player.seek(0))}return _results}}});SC.Loader.registerPackage(new SC.Loader.Package("streaming",function(){var audioManagerURL;if(window.audioManager!=null){return SC.Loader.packages.streaming.setReady()}else{audioManagerURL=SC._baseUrl+"/audiomanager";return SC.Helper.loadJavascript(audioManagerURL+"/audiomanager.js",function(){window.audioManager=new AudioManager({flashAudioPath:SC._baseUrl+"/audiomanager/flashAudio.swf"});return SC.Loader.packages.streaming.setReady()})}}))}.call(this);
(function (angular) {
    angular.module('cpServices')
        .factory('songHistoryFactory', ['$cookies', songHistoryFactory]);

    function songHistoryFactory($cookies) {
        var recents = $cookies.getObject('recentSearches') || [];
        var listViewSelector = $cookies.getObject('viewPicker');
        var historyLimit = 5;
        var getDatetime = new Date();
        console.log("view selector from serever " + listViewSelector)
        if (listViewSelector == undefined) {
            listViewSelector = true;
        }
        return {
            getRecentSongs: getRecentSongs,
            addSongToRecents: addSongToRecents,
            setListViewSelector: setListViewSelector,
            getListViewSelector: getListViewSelector
        }

        function getRecentSongs() {
            return recents;
        }

        function addSongToRecents(destSong, destUrl) { //        adds the recent song recived from the controller (userinput ng model) to the array, then saves the array as the value stored inside the recentSearches cookie
            var savedObject = {
                name: destSong,
                date: getDatetime.getDate() + "/" + (getDatetime.getMonth() + 1) + "/" + getDatetime.getFullYear(),
                time: getDatetime.getUTCHours() + 3 + ":" + getDatetime.getUTCMinutes(),
                url: destUrl
            }
            if (recents.length >= historyLimit) {
                recents.pop();
            }
            recents.unshift(savedObject);
            console.log(recents)
            $cookies.putObject('recentSearches', recents);
        }

        function setListViewSelector(destSelector) { //  changes the listViewSelector param then saves it as cookie value
            listViewSelector = !listViewSelector;
            $cookies.putObject('viewPicker', listViewSelector)
        }

        function getListViewSelector() {
            return listViewSelector;
        }
    }
})(angular);
(function (angular) {
    ////AngularJS Code ////
    angular.module('cpControllers').controller('mainPageController', ['$scope', '$location', '$sce', 'songHistoryFactory', mainPageController]);

    function mainPageController($scope, $location, $sce, songHistoryFactory) {
        console.log("inside MainController");
        var vm = this
        vm.scope = $scope;
        vm.recents = songHistoryFactory.getRecentSongs();
        vm.scope.$on('tackSelectedEmitEvent', function( event, data ){
  vm.scope.$broadcast( 'tackSelectedBroadcastEvent', data ); //recives url - emit from searchpanel controller and broadcasts down to cloud player (listener)
});
        SC.initialize({
            client_id: "d652006c469530a4a7d6184b18e16c81"
        });
    }
})(angular);

(function(angular){
    var headerDirFn = function() {
        return {
            restrict: 'E',
            templateUrl: 'app/shared/header/header.html',
            scope: {
                title:'@',
                description:'@'
            },
            link: function(scope, element, attrs){
            }
        }
    }
    angular.module('cpDirectives').directive('cloudplayerHeader', headerDirFn)
})(angular);

(function (angular) {
    "use strict";
    angular.module('cpDirectives').directive('cloudPlayer', playerDirFn)

    function playerDirFn() {
        return {
            restrict: 'EA',
            templateUrl: 'app/shared/player/cloud-player.html',
            controller: 'cloudPlayerController',
            controllerAs: 'cloudPlayerCtrl',
            scope: true,
            link: function (scope, element, attrs, controller) {
            }
        }
    }
})(angular);
(function (angular) {
    angular.module('cpControllers').controller('cloudPlayerController', ['$scope', cloudPlayerController]);

    function cloudPlayerController($scope) {
        var vm = this;
        vm.scope = $scope;
        vm.trackSelected = false;
        console.log(vm.scope.$parent.mainPageCtrl.selectedWidgetUrl)
        vm.scope.$on('tackSelectedBroadcastEvent',  function( event, data ){ //listens to searchpanel emit event, and broadcasts to cloudplayer controller that listens to the new event
        vm.trackSelected = true;
         vm.selectedWidgetUrl = data;
        });
    }
})(angular);
(function(angular){
    angular.module('cpDirectives').directive('searchHistory', searchHistoryDirFn)
    function searchHistoryDirFn(){
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: 'app/shared/searchHistory/search-history.html',
            scope: {
                recents:'='
            }
        }
    }
})(angular);
(function (angular) {
    angular.module('cpControllers').controller('searchPanelController', ['$scope', '$location', '$sce', 'songHistoryFactory', 'notifier', searchPanelController])

    function searchPanelController($scope, $location, $sce, songHistoryFactory, notifier) {
        console.log("search panel directive controller");
        var vm = this;
        vm.scope = $scope;
        var nextPage;
        var pageSize = 9;
        var widgetAttrs = "&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"
        vm.defualtPicPath = "assets/images/soundcloud.png";
        vm.userInput = "ACDC"; // just for initial loading
        vm.listViewSelector; // assigned from service to remember the last state
        vm.panelFoldSelector = false;
        vm.searchResult;
        vm.selectedWidgetUrl; // to be broadcasted up the scopes and back to the cloudplayer ctrl
        vm.getSongs = getSongs;
        var setResults = setResults;
        vm.selectSong = selectSong;
        vm.onClickNextBtn = onClickNextBtn;
        vm.changeView = changeView;

        function getSongs() { // this method retrives all songs with string taken form input field plus saves the search to the history service
            console.log("getSongs() running...")
            console.log("search added: " + vm.userInput)
            var self = this
            SC.get('/tracks', {
                q: self.userInput,
                'limit': pageSize,
                'linked_partitioning': 1,
            }, function (tracks) {
                setResults(tracks)
            });
            songHistoryFactory.addSongToRecents(vm.userInput, vm.selectedWidgetUrl)
            console.log("Song List:");
            console.log(vm.searchResult);
            vm.listViewSelector = songHistoryFactory.getListViewSelector();
            notifier.displayGeneralInfoMsg("Results for " + vm.userInput);
        }

        function setResults(tracks) {
            var self = this
            console.log("setResults(tracks) running");
            vm.searchResult = tracks.collection;
            vm.searchResult.forEach(function (item) {
                if (item.artwork_url == null) {
                    item.artwork_url = vm.defualtPicPath
                }
            })
            vm.scope.$apply();
            console.log(self.searchResult)
                //                this.scope.$apply()
            nextPage = tracks.next_href;
            console.log("setResults finished.")
        }

        function selectSong(selectedSong) {
            console.log("selectSong(selectedSong) running... ")
            vm.selectedWidgetUrl = $sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=" + selectedSong.uri + widgetAttrs);
            console.log("https://w.soundcloud.com/player/?url=" + selectedSong.uri + widgetAttrs)
            vm.scope.$emit('tackSelectedEmitEvent', vm.selectedWidgetUrl);
            vm.panelFoldSelector = true;
            notifier.clickedSongnotify(selectedSong);
        } // sets selected song by user click on a song item from list, also sets a defualt photo if no artwork exists
        function onClickNextBtn() {
            var self = this;
            console.log(vm.searchResult)
            console.log("onClickNextBtn() running...")
            SC.get(nextPage, function (tracks) {
                setResults(tracks);
            })
        }

        function changeView() {
            console.log(this.panelFoldSelector)
            console.log("changeView running...")
            songHistoryFactory.setListViewSelector()
            vm.listViewSelector = songHistoryFactory.getListViewSelector();
            console.log("listviewselector= " + vm.listViewSelector)

        }
    }
})(angular);
(function(angular){
    angular.module('cpDirectives').directive('searchPanel', searchPanelDirFn)
    function searchPanelDirFn(){
        return{
            restrict: 'EA',
            templateUrl: 'app/shared/searchPanel/search-panel.html',
            controller: 'searchPanelController',
            controllerAs: 'searchPanelCtrl',
            scope: true,
            link: function(scope, element, attrs, mainPageControllerController){
                console.log("link function of searchPanelDirective");
            }
        }
    }
})(angular);
(function(angular){
    angular.module('cpDirectives').directive('listSort', listSortDirFn)
    function listSortDirFn(){
        return {
            restrict: 'EA',
            scope:true,
        template: '<li class="alert alert-info no-bullets" ng-repeat="song in searchPanelCtrl.searchResult" ng-click="searchPanelCtrl.selectSong(song)"> {{song.title}} </li>'
        } 
    }
})(angular);
(function (angular){
    angular.module('cpDirectives').directive('tileSort', tileSortDirFn)

    function tileSortDirFn(){
        return {
            restrict: 'EA',
            templateUrl: 'app/shared/searchPanel/tileSort/tile-sort.html',
            scope:true
        }
    }
})(angular);
