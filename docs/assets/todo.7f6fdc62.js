var ne=Object.defineProperty,ie=Object.defineProperties;var le=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var ce=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable;var O=(e,t,i)=>t in e?ne(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,U=(e,t)=>{for(var i in t||(t={}))ce.call(t,i)&&O(e,i,t[i]);if(A)for(var i of A(t))re.call(t,i)&&O(e,i,t[i]);return e},W=(e,t)=>ie(e,le(t));import{v as de,_ as ue,d as ve,s as _e,r as h,x as he,y as fe,z as me,A as G,b as $,o as d,c as u,e as n,f as B,h as Ye,B as R,C as X,t as f,g as v,F as b,n as w,D as I,q as L,k as K,E as pe,G as De,T as ge,N as Me}from"./index.e36c1f45.js";import{d as ye,a as c}from"./dayjs.min.2003846a.js";let Q=["eventswipeleft","eventswiperight","eventslideup","eventslidedown","eventclick","eventlongpress"];function J(e){this.delta={},this.delta.x=e.touches[0].pageX,this.delta.y=e.touches[0].pageY,this.delta.time=new Date().getTime()}function Z(e){let t=this.delta;delete this.delta;let i=new Date().getTime()-t.time;if(t.x-=e.changedTouches[0].pageX,t.y-=e.changedTouches[0].pageY,Math.abs(t.x)<5&&Math.abs(t.y)<5){i<1e3?this.eventclick&&this.eventclick.map(function(o){o(e)}):this.eventlongpress&&this.eventlongpress.map(function(o){o(e)});return}Math.abs(t.x)>Math.abs(t.y)?t.x>0?this.eventswipeleft&&this.eventswipeleft.map(function(o){o(e)}):this.eventswiperight.map(function(o){o(e)}):t.y>0?this.eventslidedown&&this.eventslidedown.map(function(o){o(e)}):this.eventslideup.map(function(o){o(e)})}function Ee(e,t,i){e||console.error("dom is null or undefined"),Q.some(m=>e[m])||(e.addEventListener("touchstart",J),e.addEventListener("touchend",Z)),e["event"+t]||(e["event"+t]=[]),e["event"+t].push(i)}function Ce(e,t,i){if(e["event"+t]){for(let o=0;o<e["event"+t].length;o++)e["event"+t][o]===i&&(e["event"+t].splice(o,1),o--);e["event"+t]&&e["event"+t].length===0&&(delete e["event"+t],Q.every(m=>!e[m])&&(e.removeEventListener("touchstart",J),e.removeEventListener("touchend",Z)))}}var P={bindEvent:Ee,removeEvent:Ce},be={exports:{}};(function(e,t){(function(i,o){e.exports=o(ye.exports)})(de,function(i){function o(r){return r&&typeof r=="object"&&"default"in r?r:{default:r}}var m=o(i),C={name:"zh-cn",weekdays:"\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),weekdaysShort:"\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"),weekdaysMin:"\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"),months:"\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),ordinal:function(r,M){return M==="W"?r+"\u5468":r+"\u65E5"},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY\u5E74M\u6708D\u65E5",LLL:"YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206",LLLL:"YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206",l:"YYYY/M/D",ll:"YYYY\u5E74M\u6708D\u65E5",lll:"YYYY\u5E74M\u6708D\u65E5 HH:mm",llll:"YYYY\u5E74M\u6708D\u65E5dddd HH:mm"},relativeTime:{future:"%s\u5185",past:"%s\u524D",s:"\u51E0\u79D2",m:"1 \u5206\u949F",mm:"%d \u5206\u949F",h:"1 \u5C0F\u65F6",hh:"%d \u5C0F\u65F6",d:"1 \u5929",dd:"%d \u5929",M:"1 \u4E2A\u6708",MM:"%d \u4E2A\u6708",y:"1 \u5E74",yy:"%d \u5E74"},meridiem:function(r,M){var p=100*r+M;return p<600?"\u51CC\u6668":p<900?"\u65E9\u4E0A":p<1100?"\u4E0A\u5348":p<1300?"\u4E2D\u5348":p<1800?"\u4E0B\u5348":"\u665A\u4E0A"}};return m.default.locale(C,null,!0),C})})(be);const ke={class:"todo"},we={class:"todo-header"},Se={key:0,class:"todo-calendar-container todo-calendar-shrink"},Le={class:"cur-date"},xe={class:"date-month"},Te={class:"date-year"},He=["onClick"],$e={class:"item-day"},Be={class:"item-date"},Ve={key:1,class:"todo-calendar-container todo-calendar-expand"},ze={class:"cur-date"},qe={class:"time"},Fe={class:"item-day-container"},Ne={class:"item-day"},je={class:"item-date-container"},Ae=["onClick"],Oe={class:"todo-list"},Ue={key:0,class:"todo-list-content"},We={class:"list-time-month"},Ge={class:"list-time-date"},Re={class:"inner-content"},Xe=["onClick"],Ie={class:"item-title"},Ke={key:0,class:"item-desc"},Pe={class:"item-time"},Qe={class:"more-btn"},Je=["id","onClick"],Ze={class:"iconfont icon-roundcheckfill"},et=ve({setup(e){c.locale("zh-cn");const{proxy:t}=_e();h("");const i=he([{name:"\u7F16\u8F91",icon:"edit",desc:"edit"},{name:"\u5220\u9664",icon:"del",desc:"del"}]);h(null);let o=null;const m=[],C=h("more-btn-"),r=h(null),M=h(!1),p=h(!1),k=h(""),Y=h({}),x=h({}),S=h(!1),E=h(c().format("YYYY/MM/DD 00:00")),T=h(!1),V=fe(()=>{let s=[];for(let a=0;a<(p.value?35:7);a++){const _=c().startOf("week").add(a,"day");s[a]={time:_.format("YYYY/MM/DD 00:00"),haveTask:!!Y.value[_.format("YYYYMMDD")]}}return s});me(()=>{P.bindEvent(r.value,"slideup",()=>{p.value=!0}),P.bindEvent(r.value,"slidedown",()=>{p.value=!1})}),z();function z(){const s=G("todo");t.$toast.loading("loading",{cover:!0}),s.find().then(a=>{q(a,Y.value)})}function q(s,a){s.forEach(_=>{const D=c(_.get("dateTime")).format("YYYYMMDD");a[D]||(a[D]=[]),a[D].push(W(U({},_.attributes),{id:_.id}))}),t.$toast.hide()}function ee(s){return s=c(s).format(s.includes(" ")?"YYYY\u5E74MM\u6708DD\u65E5 HH:mm":"YYYY\u5E74MM\u6708DD\u65E5"),s=c().isSame(c(s),"year")?s.split("\u5E74")[1]:s,s}function F(s){E.value=c(s.time).format("YYYY/MM/DD HH:mm"),o&&clearTimeout(o),T.value=!0,o=setTimeout(()=>{T.value=!1},1500),De(()=>{document.querySelector(".blink").scrollIntoView({behavior:"smooth"})})}function te(s,a){if(!Y.value[s][a])return;let _=I("todo",Y.value[s][a].id);_.set("done",!Y.value[s][a].done),t.$toast.loading("loading",{cover:!0}),_.save().then(D=>{ge.hide(),Y.value[s][a].done=!Y.value[s][a].done}).catch(D=>{Me.danger(D)})}function H(){if(k.value){S.value=!0,x.value={},t.$toast.loading("loading",{cover:!0});const s=G("todo");s.contains("title",k.value),s.find().then(a=>{q(a,x.value)})}else S.value=!1,Y.value={},z()}function se(s,a){m[0]=s,m[1]=a,C.value="more-btn-"+Y.value[s][a].id,M.value=!M.value}function ae(s){const a=Y.value[m[0]],_=C.value.replace("more-btn-","");({edit:()=>{t.$router.push({path:"/schedule/editTodo",query:{id:a[m[1]].id}})},del:()=>{let D=I("todo",_);t.$toast.loading("loading",{cover:!0}),D.destroy().then(N=>{t.$toast.hide(),k.value?H():a.splice(m[1],1)})}})[s.desc]()}return(s,a)=>{const _=$("nut-icon"),D=$("nut-searchbar"),N=$("nut-popover");return d(),u("div",ke,[n("div",we,[B(D,{class:"search-bar",placeholder:"\u641C\u7D22",modelValue:k.value,"onUpdate:modelValue":a[0]||(a[0]=l=>k.value=l),onClear:H,onSearch:H},{leftin:Ye(()=>[B(_,{size:"14",name:"search2"})]),_:1},8,["modelValue"])]),R(n("div",{class:"todo-calendar",ref_key:"calendarRef",ref:r},[p.value?(d(),u("div",Ve,[n("div",ze,f(v(c)(E.value).format("YYYY\u5E74M\u6708")),1),n("div",qe,[n("div",Fe,[(d(),u(b,null,w(7,l=>n("div",Ne,"\u5468"+f("\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u65E5"[l-1]),1)),64))]),n("div",je,[(d(!0),u(b,null,w(v(V),(l,y)=>(d(),u("div",{class:"item-date",onClick:g=>F(l)},[n("div",{class:L({today:v(c)().isSame(l.time,"date"),active:E.value===l.time,gray:!v(c)().isSame(l.time,"month"),have:l.haveTask})},f(v(c)(l.time).format("DD")),3)],8,Ae))),256))])])])):(d(),u("div",Se,[n("div",Le,[n("div",xe,f(v(c)(E.value).format("M\u6708")),1),n("div",Te,f(v(c)(E.value).format("YYYY")),1)]),(d(!0),u(b,null,w(v(V),(l,y)=>(d(),u("div",{class:L(["time",{today:v(c)().isSame(l.time,"date"),active:E.value===l.time,have:l.haveTask}]),onClick:g=>F(l)},[n("div",$e,"\u5468"+f("\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u65E5"[y]),1),n("div",Be,f(v(c)(l.time).format("DD")),1)],10,He))),256))]))],512),[[X,!S.value]]),n("div",Oe,[(d(!0),u(b,null,w(S.value?x.value:Y.value,(l,y)=>(d(),u(b,null,[l.length?(d(),u("div",Ue,[n("div",{class:L(["list-time",{blink:T.value&&y===v(c)(E.value).format("YYYYMMDD")}])},[n("div",We,f(v(c)(y).format("M\u6708")),1),n("div",Ge,f(v(c)(y).format("DD")),1)],2),n("div",Re,[(d(!0),u(b,null,w(l,(g,j)=>(d(),u("div",{class:L(["todo-list-item",{done:g.done}]),onClick:oe=>te(y,j)},[n("div",Ie,f(g.title),1),g.desc?(d(),u("div",Ke,f(g.desc),1)):K("",!0),n("div",Pe,f(ee(g.dateTime)),1),n("div",Qe,[n("i",{class:"iconfont icon-i-more",id:"more-btn-"+g.id,onClick:pe(oe=>se(y,j),["stop"])},null,8,Je)]),R(n("i",Ze,null,512),[[X,g.done]])],10,Xe))),256))])])):K("",!0)],64))),256))]),B(N,{visible:M.value,"onUpdate:visible":a[1]||(a[1]=l=>M.value=l),targetId:C.value,overlay:!0,"overlay-style":{opacity:"0"},list:v(i),location:"left-start",onChoose:ae},null,8,["visible","targetId","list"])])}}});var ot=ue(et,[["__scopeId","data-v-ed664060"]]);export{ot as default};
