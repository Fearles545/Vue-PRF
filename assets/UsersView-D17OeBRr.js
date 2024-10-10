import{u as E}from"./useStore-CJqoHcd7.js";import{d as D,r as _,w as $,c as d,a as e,t as b,b as y,v as C,g as A,o as r,p as S,h as U,_ as x,u as k,F as B,f as M,j as N}from"./index-DCb-RvSQ.js";const V=a=>(S("data-v-cadd9926"),a=a(),U(),a),j={class:"form-title"},F={class:"form-inputs-container"},L={class:"form-group"},T=V(()=>e("label",{for:"name"},"Name",-1)),q={class:"form-group"},w=V(()=>e("label",{for:"email"},"Email",-1)),J={class:"buttons-container"},O={class:"btn",type:"submit"},R=D({__name:"UserDialog",props:{user:{type:Object,default:null},visible:{type:Boolean,required:!0}},emits:["submit","cancel"],setup(a,{emit:m}){var f,c;const i=a,p=m,n=_(((f=i.user)==null?void 0:f.name)||""),o=_(((c=i.user)==null?void 0:c.email)||""),l=_(null),v=_(!!i.user);$(()=>i.user,s=>{n.value=(s==null?void 0:s.name)||"",o.value=(s==null?void 0:s.email)||"",v.value=!!s}),$(()=>i.visible,s=>{var t,u;s?(t=l.value)==null||t.showModal():(u=l.value)==null||u.close()});const g=()=>{var s;n.value===""||o.value===""||(p("submit",{id:(s=i.user)==null?void 0:s.id,name:n.value,email:o.value}),h())},h=()=>{var s;n.value="",o.value="",(s=l.value)==null||s.close(),p("cancel")};return(s,t)=>(r(),d("dialog",{id:"userDialog",popover:"",ref_key:"userDialog",ref:l},[e("form",{class:"user-form",onSubmit:A(g,["prevent"])},[e("h3",j,b(v.value?"Edit User":"Add New User"),1),e("div",F,[e("div",L,[T,y(e("input",{"onUpdate:modelValue":t[0]||(t[0]=u=>n.value=u),type:"text",id:"name",placeholder:"ex: John Doe"},null,512),[[C,n.value]])]),e("div",q,[w,y(e("input",{"onUpdate:modelValue":t[1]||(t[1]=u=>o.value=u),type:"text",id:"email",placeholder:"ex: john@doe.com"},null,512),[[C,o.value]])])]),e("div",J,[e("button",O,b(v.value?"Save":"Add"),1),e("button",{class:"btn btn-cancel",onClick:h},"Cancel")])],32)],512))}}),z=x(R,[["__scopeId","data-v-cadd9926"]]),I=a=>(S("data-v-9d80f2aa"),a=a(),U(),a),G={key:0},H=I(()=>e("p",null,"There's no users yet.",-1)),K=[H],P={key:1},Q=I(()=>e("h2",{class:"user-list-title"},"List of Users",-1)),W={class:"user-list-container"},X={class:"user-list"},Y={class:"user-item-actions"},Z=["onClick"],ee=["onClick"],se=D({__name:"UsersView",setup(a){const{getUsers:m,addUser:i,updateUser:p,removeUser:n}=E(),o=_(null),l=_(!1),v=()=>{o.value=null,l.value=!0},g=c=>{o.value=c,l.value=!0},h=c=>{o.value?p(c):i(c),l.value=!1},f=()=>{l.value=!1};return(c,s)=>(r(),d("section",null,[k(m).length===0?(r(),d("div",G,K)):(r(),d("section",P,[Q,e("div",W,[e("ul",X,[(r(!0),d(B,null,M(k(m),t=>(r(),d("li",{key:t.id,class:"user-item"},[e("h3",null,b(t.name),1),e("p",null,b(t.email),1),e("div",Y,[e("button",{onClick:u=>g(t),class:"btn"},"Edit",8,Z),e("button",{class:"btn btn-cancel",onClick:u=>k(n)(t.id)},"Remove",8,ee)])]))),128))])])])),e("div",{class:"btn-container"},[e("button",{class:"btn",onClick:v},"Add User")]),N(z,{class:"user-dialog",user:o.value,visible:l.value,onSubmit:h,onCancel:f},null,8,["user","visible"])]))}}),ae=x(se,[["__scopeId","data-v-9d80f2aa"]]);export{ae as default};
