import{_ as k,d as x,K as I,L as B,z as C,b as o,g as e,o as l,c as N,e as t,f as u,t as _,h as s,j as r,k as m,p as V,m as S,l as R}from"./index.e36c1f45.js";const i=a=>(V("data-v-13b3a457"),a=a(),S(),a),w={key:0,class:"container"},z={class:"username"},F=i(()=>t("i",{class:"iconfont icon-phone"},null,-1)),P=i(()=>t("i",{class:"iconfont icon-email"},null,-1)),T=i(()=>t("br",null,null,-1)),$={style:{"margin-top":"10px"}},j=i(()=>t("i",{class:"iconfont icon-login"},null,-1)),q=R(" \u767B\u5F55"),A=x({setup(a){const f=I(),{userInfo:n,elRef:p}=B(f);return C(()=>{}),(D,c)=>{const h=o("nut-avatar"),d=o("nut-cell"),y=o("nut-cell-group"),g=o("nut-button"),v=o("nut-empty");return e(n)?(l(),N("div",w,[t("i",{onClick:c[0]||(c[0]=b=>e(p).settingRef.actionsheetVisible=!0),class:"iconfont icon-setting"}),u(h,{size:"60",icon:e(n).headImg?e(n).headImg.url:"my",shape:"square"},null,8,["icon"]),t("span",z,_(e(n).username),1),u(y,{class:"info-group"},{default:s(()=>[e(n).mobilePhoneNumber?(l(),r(d,{key:0},{default:s(()=>[F,t("span",null,_(e(n).mobilePhoneNumber),1)]),_:1})):m("",!0),e(n).email?(l(),r(d,{key:1},{default:s(()=>[P,t("span",null,_(e(n).email),1)]),_:1})):m("",!0),T]),_:1})])):(l(),r(v,{key:1,image:"empty",description:"\u672A\u767B\u5F55"},{default:s(()=>[t("div",$,[u(g,{type:"primary",onClick:c[1]||(c[1]=b=>e(p).entryRef.logVisible=!0)},{default:s(()=>[j,q]),_:1})])]),_:1}))}}});var K=k(A,[["__scopeId","data-v-13b3a457"]]);export{K as default};