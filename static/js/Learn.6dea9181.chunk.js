"use strict";(self.webpackChunkreact_cards=self.webpackChunkreact_cards||[]).push([[531],{1179:function(n,e,r){r.r(e),r.d(e,{Learn:function(){return b}});var s=r(885),t=r(2791),a=r(9558),c=r(1907),i=r(9434),u=r(6871),o=r(8278),d=r(576),l="Learn_nextQuestionBtn__uvUH5",_="Learn_container__G4wJb",f="Learn_content__sxuOl",v="Learn_body__Iumir",h="Learn_showAnswerBtn__rc8u0",x="Learn_title__RrS5a",m="Learn_shots__xNoV-",j="Learn_questionContainer__QOoOz",N="Learn_answerContainer__NcsnN",p="Learn_question__qx2xJ",L="Learn_answer__w5E3N",g="Learn_text__ut8sM",w=r(8874),k=r(6310),C=r(4260),S=r(184),I=["Did not know","Forgot","A lot of thought","\u0421onfused","Knew the answer"],b=function(){var n=(0,i.I0)(),e=(0,u.UO)().packId,r=(0,u.s0)(),b=(0,i.v9)(w.mT),q=(0,i.v9)(w.WT),y=(0,i.v9)(w.H),O=(0,i.v9)(w.$_),T=(0,i.v9)(w.tJ),J=(0,i.v9)(k.Jt),Z=(0,i.v9)(C.gr),A=(0,t.useState)(!1),B=(0,s.Z)(A,2),H=B[0],Q=B[1],F=(0,t.useState)(!0),G=(0,s.Z)(F,2),P=G[0],U=G[1],V=(0,t.useState)(1),z=(0,s.Z)(V,2),D=z[0],E=z[1],K=(0,t.useState)(I[0]),M=(0,s.Z)(K,2),R=M[0],W=M[1],Y=(0,t.useState)(null),$=(0,s.Z)(Y,2),X=$[0],nn=$[1];(0,t.useEffect)((function(){P&&(n((0,o.vm)({packId:e,cardQuestion:q,sortCards:y,page:O,pageCount:T})),U(!1)),b.length>0&&nn(en(b))}),[e,b,P]);var en=function(n){var e=n.reduce((function(n,e){return n+(6-e.grade)*(6-e.grade)}),0),r=Math.random()*e,s=n.reduce((function(n,e,s){var t=n.sum+(6-e.grade)*(6-e.grade);return{sum:t,id:t<r?s:n.id}}),{sum:0,id:-1});return n[s.id+1]};return J?(0,S.jsxs)("div",{className:_,children:[(0,S.jsx)(a.Sc,{isDisabled:Z,title:"Back to Packs List",onBackToPageClick:function(){r(c.y.PACKS)}}),(0,S.jsxs)("div",{className:f,children:[(0,S.jsx)("h2",{className:x,children:"Learn"}),(0,S.jsxs)("div",{className:v,children:[(0,S.jsxs)("div",{className:m,children:["Number of attempts to answer a question:",(0,S.jsxs)("span",{children:[" ",null===X||void 0===X?void 0:X.shots]})]}),(0,S.jsxs)("div",{className:j,children:[(0,S.jsx)("span",{children:"Question:"}),(0,S.jsx)("div",{className:p,children:null===X||void 0===X?void 0:X.question})]}),!H&&(0,S.jsx)(a.Y7,{className:h,onClick:function(){return Q(!0)},disabled:Z,children:"Show answer"}),H&&(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)("div",{className:N,children:[(0,S.jsx)("span",{children:"Answer:"}),(0,S.jsx)("div",{className:L,children:null===X||void 0===X?void 0:X.answer})]}),(0,S.jsx)("div",{className:g,children:"Rate yourself:"}),(0,S.jsx)(d.z,{primary:!0,options:I,name:"radio",value:R,setValue:W,setIndex:function(n){E(n+1)}}),(0,S.jsx)(a.Y7,{className:l,onClick:function(){E(1),W(I[0]),Q(!1),b.length>0&&(n((0,o.Oy)({updatedGrade:D,cardId:null===X||void 0===X?void 0:X._id})),nn(en(b)))},children:"Next question"})]})]})]})]}):(0,S.jsx)(u.Fg,{to:c.y.LOGIN})}},8874:function(n,e,r){r.d(e,{$_:function(){return c},H:function(){return a},Ht:function(){return u},WT:function(){return t},mT:function(){return s},tJ:function(){return i},vL:function(){return o}});var s=function(n){return n.cards.cards},t=function(n){return n.cards.searchCardValue},a=function(n){return n.cards.sortCards},c=function(n){return n.cards.page},i=function(n){return n.cards.pageCount},u=function(n){return n.cards.cardsTotalCount},o=function(n){return n.cards.packUserId}}}]);
//# sourceMappingURL=Learn.6dea9181.chunk.js.map