import{j as Mt,d as it,m as vt,s as $t,r as K,k as nt,l as Ct,n as St,a as F,o as N,q as P,w as _,b as d,u as a,e as pt,t as rt,i as yt,v as ht,x as wt,c as j,f as ut,y as at,T as R,N as Nt,z as Ft,F as ct,A as dt,B as kt,C as _t}from"./index.826bc426.js";import{c as Dt,a as Tt,b as bt}from"./index.d0a7f114.js";import{_ as ot}from"./plugin-vue_export-helper.21dcd24c.js";var gt={exports:{}};(function(Z,v){(function(B,g){Z.exports=g()})(Mt,function(){var B=1e3,g=6e4,Y=36e5,w="millisecond",p="second",n="minute",k="hour",h="day",q="week",S="month",z="quarter",E="year",V="date",J="Invalid Date",y=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,s=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},L=function(l,u,t){var r=String(l);return!r||r.length>=u?l:""+Array(u+1-r.length).join(t)+l},A={s:L,z:function(l){var u=-l.utcOffset(),t=Math.abs(u),r=Math.floor(t/60),e=t%60;return(u<=0?"+":"-")+L(r,2,"0")+":"+L(e,2,"0")},m:function l(u,t){if(u.date()<t.date())return-l(t,u);var r=12*(t.year()-u.year())+(t.month()-u.month()),e=u.clone().add(r,S),o=t-e<0,i=u.clone().add(r+(o?-1:1),S);return+(-(r+(t-e)/(o?e-i:i-e))||0)},a:function(l){return l<0?Math.ceil(l)||0:Math.floor(l)},p:function(l){return{M:S,y:E,w:q,d:h,D:V,h:k,m:n,s:p,ms:w,Q:z}[l]||String(l||"").toLowerCase().replace(/s$/,"")},u:function(l){return l===void 0}},O="en",M={};M[O]=c;var I=function(l){return l instanceof G},Q=function l(u,t,r){var e;if(!u)return O;if(typeof u=="string"){var o=u.toLowerCase();M[o]&&(e=o),t&&(M[o]=t,e=o);var i=u.split("-");if(!e&&i.length>1)return l(i[0])}else{var m=u.name;M[m]=u,e=m}return!r&&e&&(O=e),e||!r&&O},$=function(l,u){if(I(l))return l.clone();var t=typeof u=="object"?u:{};return t.date=l,t.args=arguments,new G(t)},f=A;f.l=Q,f.i=I,f.w=function(l,u){return $(l,{locale:u.$L,utc:u.$u,x:u.$x,$offset:u.$offset})};var G=function(){function l(t){this.$L=Q(t.locale,null,!0),this.parse(t)}var u=l.prototype;return u.parse=function(t){this.$d=function(r){var e=r.date,o=r.utc;if(e===null)return new Date(NaN);if(f.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var i=e.match(y);if(i){var m=i[2]-1||0,D=(i[7]||"0").substring(0,3);return o?new Date(Date.UTC(i[1],m,i[3]||1,i[4]||0,i[5]||0,i[6]||0,D)):new Date(i[1],m,i[3]||1,i[4]||0,i[5]||0,i[6]||0,D)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},u.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},u.$utils=function(){return f},u.isValid=function(){return this.$d.toString()!==J},u.isSame=function(t,r){var e=$(t);return this.startOf(r)<=e&&e<=this.endOf(r)},u.isAfter=function(t,r){return $(t)<this.startOf(r)},u.isBefore=function(t,r){return this.endOf(r)<$(t)},u.$g=function(t,r,e){return f.u(t)?this[r]:this.set(e,t)},u.unix=function(){return Math.floor(this.valueOf()/1e3)},u.valueOf=function(){return this.$d.getTime()},u.startOf=function(t,r){var e=this,o=!!f.u(r)||r,i=f.p(t),m=function(X,x){var W=f.w(e.$u?Date.UTC(e.$y,x,X):new Date(e.$y,x,X),e);return o?W:W.endOf(h)},D=function(X,x){return f.w(e.toDate()[X].apply(e.toDate("s"),(o?[0,0,0,0]:[23,59,59,999]).slice(x)),e)},b=this.$W,T=this.$M,U=this.$D,H="set"+(this.$u?"UTC":"");switch(i){case E:return o?m(1,0):m(31,11);case S:return o?m(1,T):m(0,T+1);case q:var tt=this.$locale().weekStart||0,et=(b<tt?b+7:b)-tt;return m(o?U-et:U+(6-et),T);case h:case V:return D(H+"Hours",0);case k:return D(H+"Minutes",1);case n:return D(H+"Seconds",2);case p:return D(H+"Milliseconds",3);default:return this.clone()}},u.endOf=function(t){return this.startOf(t,!1)},u.$set=function(t,r){var e,o=f.p(t),i="set"+(this.$u?"UTC":""),m=(e={},e[h]=i+"Date",e[V]=i+"Date",e[S]=i+"Month",e[E]=i+"FullYear",e[k]=i+"Hours",e[n]=i+"Minutes",e[p]=i+"Seconds",e[w]=i+"Milliseconds",e)[o],D=o===h?this.$D+(r-this.$W):r;if(o===S||o===E){var b=this.clone().set(V,1);b.$d[m](D),b.init(),this.$d=b.set(V,Math.min(this.$D,b.daysInMonth())).$d}else m&&this.$d[m](D);return this.init(),this},u.set=function(t,r){return this.clone().$set(t,r)},u.get=function(t){return this[f.p(t)]()},u.add=function(t,r){var e,o=this;t=Number(t);var i=f.p(r),m=function(T){var U=$(o);return f.w(U.date(U.date()+Math.round(T*t)),o)};if(i===S)return this.set(S,this.$M+t);if(i===E)return this.set(E,this.$y+t);if(i===h)return m(1);if(i===q)return m(7);var D=(e={},e[n]=g,e[k]=Y,e[p]=B,e)[i]||1,b=this.$d.getTime()+t*D;return f.w(b,this)},u.subtract=function(t,r){return this.add(-1*t,r)},u.format=function(t){var r=this,e=this.$locale();if(!this.isValid())return e.invalidDate||J;var o=t||"YYYY-MM-DDTHH:mm:ssZ",i=f.z(this),m=this.$H,D=this.$m,b=this.$M,T=e.weekdays,U=e.months,H=function(x,W,lt,st){return x&&(x[W]||x(r,o))||lt[W].slice(0,st)},tt=function(x){return f.s(m%12||12,x,"0")},et=e.meridiem||function(x,W,lt){var st=x<12?"AM":"PM";return lt?st.toLowerCase():st},X={YY:String(this.$y).slice(-2),YYYY:this.$y,M:b+1,MM:f.s(b+1,2,"0"),MMM:H(e.monthsShort,b,U,3),MMMM:H(U,b),D:this.$D,DD:f.s(this.$D,2,"0"),d:String(this.$W),dd:H(e.weekdaysMin,this.$W,T,2),ddd:H(e.weekdaysShort,this.$W,T,3),dddd:T[this.$W],H:String(m),HH:f.s(m,2,"0"),h:tt(1),hh:tt(2),a:et(m,D,!0),A:et(m,D,!1),m:String(D),mm:f.s(D,2,"0"),s:String(this.$s),ss:f.s(this.$s,2,"0"),SSS:f.s(this.$ms,3,"0"),Z:i};return o.replace(s,function(x,W){return W||X[x]||i.replace(":","")})},u.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},u.diff=function(t,r,e){var o,i=f.p(r),m=$(t),D=(m.utcOffset()-this.utcOffset())*g,b=this-m,T=f.m(this,m);return T=(o={},o[E]=T/12,o[S]=T,o[z]=T/3,o[q]=(b-D)/6048e5,o[h]=(b-D)/864e5,o[k]=b/Y,o[n]=b/g,o[p]=b/B,o)[i]||b,e?T:f.a(T)},u.daysInMonth=function(){return this.endOf(S).$D},u.$locale=function(){return M[this.$L]},u.locale=function(t,r){if(!t)return this.$L;var e=this.clone(),o=Q(t,r,!0);return o&&(e.$L=o),e},u.clone=function(){return f.w(this.$d,this)},u.toDate=function(){return new Date(this.valueOf())},u.toJSON=function(){return this.isValid()?this.toISOString():null},u.toISOString=function(){return this.$d.toISOString()},u.toString=function(){return this.$d.toUTCString()},l}(),C=G.prototype;return $.prototype=C,[["$ms",w],["$s",p],["$m",n],["$H",k],["$W",h],["$M",S],["$y",E],["$D",V]].forEach(function(l){C[l[1]]=function(u){return this.$g(u,l[0],l[1])}}),$.extend=function(l,u){return l.$i||(l(u,G,$),l.$i=!0),$},$.locale=Q,$.isDayjs=I,$.unix=function(l){return $(1e3*l)},$.en=M[O],$.Ls=M,$.p={},$})})(gt);var ft=gt.exports;const Ot=at("\u4EAC\u4E1C"),Bt=at("\u6DD8\u5B9D"),Et={key:0},Vt=at("\u63D0\u4EA4"),xt=it({emits:["submitOrderCb"],setup(Z,{emit:v}){const B=vt(),{userInfo:g}=$t(B);Dt("order");let Y=K(ft().format("YYYY-MM-DD")),w=K(!1);const p=K(null);let n=nt({channel:"\u4EAC\u4E1C",count:1,date:ft().format("YYYY-MM-DD"),product:"",payment:null,receive:null,fanli:null});Ct(()=>n.product,s=>{let c=s.match(/\/[0-9]*返/);c&&c[0].match(/[0-9]+/)&&(n.receive=Number(c[0].match(/[0-9]+/)[0]))});const k=s=>{w.value=!0},h=s=>{w.value=!1},q=s=>{n.date=s[3]},S=nt({product:[{required:!0,message:"\u8BF7\u8F93\u5165\u5546\u54C1\u540D\u79F0"}],payment:[{required:!0,message:"\u8BF7\u8F93\u5165\u5B9E\u4ED8\u91D1\u989D"}],receive:[{required:!0,message:"\u8BF7\u8F93\u5165\u8FD4\u5355\u91D1\u989D"}],fanli:[{required:!1,message:"\u8BF7\u8F93\u5165\u8FD4\u5229\u91D1\u989D"}],phone:[{validator:s=>!s||/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(s),message:"\u624B\u673A\u53F7\u7801\u683C\u5F0F\u4E0D\u6B63\u786E"}]});let z=St(()=>{let s=Number(n.receive)-Number(n.payment)+Number(n.fanli);return isNaN(s)?0:s});const E=()=>{isNaN(n.receive)&&(n.receive=null),isNaN(n.payment)&&(n.payment=null),isNaN(n.fanli)&&(n.fanli=null)},V=()=>{p.value.validate().then(({valid:s,errors:c})=>{s?J():console.log("error submit!!",c)})},J=()=>{let s=Tt("order");s.set("channel",n.channel),s.set("count",Number(n.count)),s.set("date",n.date),s.set("product",n.product),s.set("payment",Number(n.payment)),s.set("receive",Number(n.receive)),s.set("fanli",Number(n.fanli)),s.set("isFinish",!1),s.set("username",g.value.username),s.set("userObjectId",g.value.objectId),R.loading("loading"),s.save().then(c=>{R.hide(),Nt.success("\u63D0\u4EA4\u6210\u529F"),y(),v("submitOrderCb")})},y=()=>{n.channel="\u4EAC\u4E1C",n.count=1,n.date=ft().format("YYYY-MM-DD"),n.product="",n.payment=null,n.receive=null,n.fanli=null};return(s,c)=>{const L=F("nut-radio"),A=F("nut-radiogroup"),O=F("nut-form-item"),M=F("nut-inputnumber"),I=F("nut-calendar"),Q=F("nut-price"),$=F("nut-cell"),f=F("nut-button"),G=F("nut-form");return N(),P(G,{"model-value":a(n),ref_key:"formRef",ref:p},{default:_(()=>[d(O,{prop:"channel"},{default:_(()=>[d(A,{modelValue:a(n).channel,"onUpdate:modelValue":c[0]||(c[0]=C=>a(n).channel=C),direction:"horizontal"},{default:_(()=>[d(L,{shape:"button",label:"\u4EAC\u4E1C"},{default:_(()=>[Ot]),_:1}),d(L,{shape:"button",label:"\u6DD8\u5B9D"},{default:_(()=>[Bt]),_:1})]),_:1},8,["modelValue"])]),_:1}),d(O,{label:"\u4E0B\u5355\u6570\u91CF",prop:"count"},{default:_(()=>[d(M,{modelValue:a(n).count,"onUpdate:modelValue":c[1]||(c[1]=C=>a(n).count=C),"input-width":"60","button-size":"28"},null,8,["modelValue"])]),_:1}),d(O,{label:"\u9009\u62E9\u4E0B\u5355\u65E5\u671F",prop:"channel"},{default:_(()=>[pt("span",{onClick:c[2]||(c[2]=C=>k())},rt(a(n).date?a(n).date:"\u8BF7\u9009\u62E9"),1),d(I,{visible:a(w),"onUpdate:visible":c[3]||(c[3]=C=>yt(w)?w.value=C:w=C),onClose:c[4]||(c[4]=C=>h()),onChoose:q,"default-value":a(n).date,"start-date":"2022-01-01","end-date":a(Y),"is-auto-back-fill":!0},null,8,["visible","default-value","end-date"])]),_:1}),d(O,{label:"\u5546\u54C1\u540D\u79F0",required:"",prop:"product",rules:a(S).product},{default:_(()=>[ht(pt("input",{class:"nut-input-text",placeholder:"\u8BF7\u8F93\u5165\u5546\u54C1\u540D\u79F0",type:"text","onUpdate:modelValue":c[5]||(c[5]=C=>a(n).product=C)},null,512),[[wt,a(n).product]])]),_:1},8,["rules"]),d(O,{label:"\u8FD4\u5355\u91D1\u989D",required:"",prop:"receive",rules:a(S).receive},{default:_(()=>[d(M,{modelValue:a(n).receive,"onUpdate:modelValue":c[6]||(c[6]=C=>a(n).receive=C),onBlur:E,min:"0",step:"1","decimal-places":"2","input-width":"60","button-size":"28"},null,8,["modelValue"])]),_:1},8,["rules"]),d(O,{label:"\u5B9E\u4ED8\u91D1\u989D",required:"",prop:"payment",rules:a(S).payment},{default:_(()=>[d(M,{modelValue:a(n).payment,"onUpdate:modelValue":c[7]||(c[7]=C=>a(n).payment=C),onBlur:E,min:"0",step:"1","decimal-places":"2","input-width":"60","button-size":"28"},null,8,["modelValue"])]),_:1},8,["rules"]),d(O,{label:"\u8FD4\u5229\u91D1\u989D",prop:"fanli",rules:a(S).fanli},{default:_(()=>[d(M,{modelValue:a(n).fanli,"onUpdate:modelValue":c[8]||(c[8]=C=>a(n).fanli=C),onBlur:E,min:"0",step:"1","decimal-places":"2","input-width":"60","button-size":"28"},null,8,["modelValue"])]),_:1},8,["rules"]),d($,{title:"\u9884\u8BA1\u76C8\u5229"},{default:_(()=>[!isNaN(a(z))&&a(z)?(N(),j("span",Et,rt(`${Number(a(n).receive)} + ${Number(a(n).fanli)} - ${Number(a(n).payment)} = `),1)):ut("",!0),d(Q,{price:a(z),size:"large","need-symbol":!1,thousands:!0},null,8,["price"])]),_:1}),d($,null,{default:_(()=>[d(f,{class:"submit-btn",type:"primary",block:"",onClick:V},{default:_(()=>[Vt]),_:1})]),_:1})]),_:1},8,["model-value"])}}});var Yt=ot(xt,[["__scopeId","data-v-32f9dd56"]]);const At={class:"table-container"},It={key:0,class:"list-row table-head"},Lt={class:"row-item"},jt=["id"],Ht={class:"list-row"},qt=at("\u5220\u9664"),zt=at("\u5B8C\u6210"),Ut=it({props:{tabNum:{type:Number,default:0}},emits:["refreshList"],setup(Z,{expose:v,emit:B}){const g=Z,Y=vt(),{userInfo:w}=$t(Y);let p=Dt("order");const n=nt({currentPage:1,pageSize:20,total:100});console.log("tabNum:",g.tabNum);const k=K(!0),h=nt({tableHead:[{title:"\u65E5\u671F",key:"date"},{title:"\u540D\u79F0",key:"product"},{title:"\u8FD4\u5355",key:"receive",class:"red-color"},{title:"\u5B9E\u4ED8",key:"payment"},{title:"\u8FD4\u5229",key:"fanli"},{title:"\u76C8\u5229",key:"totalEarn"},{title:"\u6570\u91CF",key:"count"},{title:"\u5E73\u53F0",key:"channel"}],listData:[]});Ft(()=>{V(!1)});const q=y=>{V(!0).then(()=>{y()})},S=y=>{V(!1).then(()=>{y()})},z=y=>{let s=bt("order",y.objectId);R.loading("loading"),s.destroy().then(c=>{R.hide(),V(!1),B("refreshList")})},E=y=>{let s=bt("order",y.objectId);s.set("isFinish",!0),R.loading("loading"),s.save().then(c=>{R.hide(),V(!1),B("refreshList")})},V=y=>(y?n.currentPage++:(n.currentPage=1,h.listData.length=0,k.value=!0),p.equalTo("userObjectId",w.value.objectId),g.tabNum<2&&p.equalTo("isFinish",Boolean(g.tabNum)),p.descending("createdAt"),p.limit(n.pageSize),p.skip((n.currentPage-1)*n.pageSize),R.loading("loading"),p.findAndCount().then(([s,c])=>{R.hide(),n.total=c;for(let L of s){let A=L.toJSON();A.totalEarn=J(J(A.receive,A.fanli),-A.payment),h.listData.push(A)}console.log(h.listData),h.listData.length>=c&&(k.value=!1)})),J=(y,s)=>(y=String(y).includes(".")?Number(String(y).replace(".","")):y*100,s=String(s).includes(".")?Number(String(s).replace(".","")):s*100,(y+s)/100);return v({}),(y,s)=>{const c=F("nut-button"),L=F("nut-swipe"),A=F("nut-infiniteloading"),O=F("nut-empty");return N(),j("ul",At,[a(h).listData&&a(h).listData.length?(N(),j("div",It,[(N(!0),j(ct,null,dt(a(h).tableHead,M=>(N(),j("div",Lt,rt(M.title),1))),256))])):ut("",!0),a(h).listData&&a(h).listData.length?(N(),j("div",{key:1,class:"table-body",id:`customScroll${g.tabNum}`},[d(A,{"use-window":!1,"container-id":`customScroll${g.tabNum}`,"has-more":k.value,"is-open-refresh":"",onLoadMore:q,onRefresh:S},{default:_(()=>[(N(!0),j(ct,null,dt(a(h).listData,M=>(N(),P(L,{key:M.objectId,disabled:g.tabNum!==0},{left:_(()=>[d(c,{class:"swipe-btn swipe-btn-del",shape:"square",onClick:I=>z(M),type:"danger"},{default:_(()=>[qt]),_:2},1032,["onClick"])]),right:_(()=>[d(c,{class:"swipe-btn",shape:"square",type:"success",onClick:I=>E(M)},{default:_(()=>[zt]),_:2},1032,["onClick"])]),default:_(()=>[pt("li",Ht,[(N(!0),j(ct,null,dt(a(h).tableHead,I=>(N(),j("div",{class:kt(["row-item",{[`${I.class}`]:I.class}])},rt(M[I.key]),3))),256))])]),_:2},1032,["disabled"]))),128))]),_:1},8,["container-id","has-more"])],8,jt)):(N(),P(O,{key:2,description:"\u6682\u65E0\u8BA2\u5355"}))])}}});var mt=ot(Ut,[["__scopeId","data-v-16267e5e"]]);const Wt=it({setup(Z){const v=nt({tabVal:0,initTab1:!1,initTab2:!1}),B=({paneKey:Y})=>{Y===1&&(v.initTab1=!0),Y===2&&(v.initTab2=!0)},g=()=>{v.initTab1=!1,v.initTab2=!1};return(Y,w)=>{const p=F("nut-tabpane"),n=F("nut-tabs");return N(),P(n,{"auto-height":"",modelValue:a(v).tabVal,"onUpdate:modelValue":w[0]||(w[0]=k=>a(v).tabVal=k),type:"smile",onChange:B},{default:_(()=>[d(p,{title:"\u672A\u5B8C\u6210"},{default:_(()=>[d(mt,{"tab-num":0,onRefreshList:g})]),_:1}),d(p,{title:"\u5DF2\u5B8C\u6210"},{default:_(()=>[a(v).initTab1?(N(),P(mt,{key:0,"tab-num":1})):ut("",!0)]),_:1}),d(p,{title:"\u6240\u6709"},{default:_(()=>[a(v).initTab2?(N(),P(mt,{key:0,"tab-num":2})):ut("",!0)]),_:1})]),_:1},8,["modelValue"])}}});var Rt=ot(Wt,[["__scopeId","data-v-1d5ce3bc"]]);const Jt={class:"container"},Pt=it({setup(Z){let v=K(0),B=K(!1);function g(w,p){p===1&&(B.value=!0),v.value=p}function Y(){B.value=!1}return(w,p)=>{const n=F("nut-tabbar-item"),k=F("nut-tabbar");return N(),j("div",Jt,[ht(d(Yt,{class:"main",onSubmitOrderCb:Y},null,512),[[_t,a(v)===0]]),a(B)?ht((N(),P(Rt,{key:0,class:"main"},null,512)),[[_t,a(v)===1]]):ut("",!0),d(k,{onTabSwitch:g,visible:a(v),"onUpdate:visible":p[0]||(p[0]=h=>yt(v)?v.value=h:v=h)},{default:_(()=>[d(n,{"tab-title":"\u586B\u5355",icon:"home"}),d(n,{"tab-title":"\u5217\u8868",icon:"category"})]),_:1},8,["visible"])])}}});var Xt=ot(Pt,[["__scopeId","data-v-65290332"]]);export{Xt as default};
