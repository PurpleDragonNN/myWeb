import{d as D,r as h,o as R,c as S,a as u,u as m,n as U,p as q,b as W,e as L}from"./index.9d858a39.js";var y="./assets/bg.fc35cbae.png",A="./assets/head.87d82a8c.png",H="./assets/wx-share.a576657c.png";var z=(i,b)=>{const d=i.__vccOpts||i;for(const[f,F]of b)d[f]=F;return d};const E=i=>(q("data-v-041179c3"),i=i(),W(),i),M={class:"input-block"},P=E(()=>u("input",{type:"file",class:"upload-btn"},null,-1)),V=["value"],N={class:"show"},O=["href"],$=E(()=>u("p",null,"\u8F6C\u6362\u540E\uFF08\u70B9\u51FB\u4E0B\u8F7D\uFF09:",-1)),j=["src"],G=E(()=>u("p",null,"\u8F6C\u6362\u524D:",-1)),J=["src"],K=D({setup(i){let b=h(k("head.png")),d=h(""),f=h(""),F=window.innerHeight>window.innerWidth,C=h(50),I=h(null),v=h(null);function k(r){return new URL({"../../assets/radius/img/bg.png":y,"../../assets/radius/img/head.png":A,"../../assets/radius/img/wx-share.png":H}[`../../assets/radius/img/${r}`],self.location).href}R(()=>{setTimeout(()=>{let a=T({img:v.value,type:1,radius:C.value*(v.value.naturalWidth/750)});d.value=a,f.value=a},300);let r=document.querySelector(".upload-btn");r.onchange=function(a){let w=a.target.files[0],p=new FileReader;p.readAsDataURL(w),p.addEventListener("load",()=>{b.value=p.result,setTimeout(()=>{let e=T({img:v.value,type:1,radius:C.value*(v.value.naturalWidth/750)});d.value=e,f.value=e},500)})}});function T(r){console.log(r);var a=r.img,w=r.type||0,p=r.radius||0,e,c,n;if(w?e={width:a.naturalWidth,height:a.naturalHeight}:e={width:a.width,height:a.height},c=document.createElement("canvas"),!c.getContext)return console.log("\u60A8\u7684\u6D4F\u89C8\u5668\u7248\u672C\u8FC7\u4F4E\uFF0C\u6682\u4E0D\u652F\u6301\u3002"),!1;c.width=e.width,c.height=e.height,n=c.getContext("2d"),n.clearRect(0,0,e.width,e.height),n.save(),n.beginPath(),B(n,0,0,e.width,e.height,p),n.clip(),w?n.drawImage(a,0,0,e.width,e.height,0,0,e.width,e.height):n.drawImage(a,0,0,a.naturalWidth,a.naturalHeight,0,0,e.width,e.height),n.restore();function B(s,t,l,_,g,o){s.strokeStyle="#fff",s.beginPath(),s.moveTo(t,l+o),s.lineTo(t,l+g-o),s.quadraticCurveTo(t,l+g,t+o,l+g),s.lineTo(t+_-o,l+g),s.quadraticCurveTo(t+_,l+g,t+_,l+g-o),s.lineTo(t+_,l+o),s.quadraticCurveTo(t+_,l,t+_-o,l),s.lineTo(t+o,l),s.quadraticCurveTo(t,l,t,l+o),s.stroke()}return c.toDataURL("image/png")}return(r,a)=>(L(),S("div",{class:U(["container",{mobile:m(F)}])},[u("div",M,[P,u("input",{type:"number",value:m(C),placeholder:"\u8BF7\u8F93\u5165\u5706\u89D2\u77E9\u5F62\u7684\u534A\u5F84",class:"radius"},null,8,V)]),u("div",N,[u("a",{href:m(f),download:"\u56FE\u7247",class:"download-btn"},[$,u("img",{ref_key:"afterImgEl",ref:I,src:m(d),alt:"",class:"after-transform"},null,8,j)],8,O),u("div",null,[G,u("img",{ref_key:"beforeImgEl",ref:v,src:m(b),alt:"",class:"before-transform"},null,8,J)])])],2))}});var X=z(K,[["__scopeId","data-v-041179c3"]]);export{X as default};