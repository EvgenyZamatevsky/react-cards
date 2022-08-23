"use strict";(self.webpackChunkreact_cards=self.webpackChunkreact_cards||[]).push([[25],{9743:function(e,a,t){t.r(a),t.d(a,{Packs:function(){return F}});var n=t(885),c=t(2791),s=t(7305),i=t(3949),r=t(9425),u=t(1866),d=t(9434),l=t(6310),o=t(6871),k=t(1907),m=t(1543),v=t(6582),p=t(6288),_=t(6109),f=t(4064),h="Pack_container__5O9xN",C="Pack_list__9X9AP",P="Pack_name__-WpXI",x="Pack_cardsCount__q8tHJ",N="Pack_updated__DLk6N",j="Pack_userName__SOjrz",S=t(184),g=function(e){var a=e.userId,t=e.userName,s=e.packId,i=e.packName,g=e.cardsCount,D=e.packUpdated,I=e.isDisabled,M=(0,u.T)(),V=(0,o.s0)(),A=(0,d.v9)(l.DQ),y=(0,c.useState)(!1),b=(0,n.Z)(y,2),w=b[0],U=b[1],B=(0,c.useState)(!1),Z=(0,n.Z)(B,2),E=Z[0],O=Z[1],R=(0,c.useState)(_.v),z=(0,n.Z)(R,2),F=z[0],J=z[1],L=(0,c.useState)(_.v),Q=(0,n.Z)(L,2),T=Q[0],q=Q[1],H=(0,c.useRef)(null),K=A===a,W=function(){return U(!1),q(_.v),void(F!==i&&J(i))},X=function(){return O(!1)};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(p.u_,{isModalActive:w,onDeactivateModalClick:W,children:(0,S.jsx)(p.N1,{value:F,setUpdatedPackName:J,onDeactivateModalClick:W,onSaveClick:function(){var e=F.trim(),t=i.trim();e!==_.v?(e!==t&&M((0,r.JS)({authorizedUserId:a,packId:s,updatedPackName:e})),U(!1)):q(_.c)},title:"Edit pack",errorMessage:T,setErrorMessage:q,ref:H})}),(0,S.jsx)(p.u_,{isModalActive:E,onDeactivateModalClick:X,children:(0,S.jsx)(p.tc,{title:"Delete Pack",name:i,onDeactivateModalClick:X,onDeleteClick:function(){M((0,r.Kc)({packId:s,authorizedUserId:a})),O(!1)}})}),(0,S.jsx)("div",{className:h,children:(0,S.jsxs)("div",{className:C,children:[(0,S.jsx)(f.Y,{className:P,onClick:function(){V("".concat(k.y.CARDS,"/").concat(s))},disabled:I,children:i}),(0,S.jsx)("div",{className:x,children:g}),(0,S.jsx)("div",{className:N,children:(0,v.N)(D)}),(0,S.jsx)("div",{className:j,children:t}),(0,S.jsx)(m.e,{onActivateDeleteModalClick:function(){return O(!0)},onActivateEditModalClick:function(){var e;U(!0),J(i),null===(e=H.current)||void 0===e||e.focus()},cardsCount:g,packId:s,isOwner:K})]})})]})},D=t(7746),I=t(5164),M={container:"Packs_container__Shc0U",top:"Packs_top__RVEbs",title:"Packs_title__aCFqi",addNewPackBtn:"Packs_addNewPackBtn__nj-PJ",main:"Packs_main__8DO3Q",sort:"Packs_sort__RAcax",emptyItems:"Packs_emptyItems__H+9hP"},V=t(4260),A=function(e){return e.packs.packs},y=function(e){return e.packs.searchPackValue},b=function(e){return e.packs.sortValue},w=function(e){return e.packs.minValue},U=function(e){return e.packs.maxValue},B=function(e){return e.packs.minCardsCount},Z=function(e){return e.packs.maxCardsCount},E=function(e){return e.packs.pageCount},O=function(e){return e.packs.page},R=function(e){return e.packs.selectedPack},z=function(e){return e.packs.packsTotalCount},F=function(){var e=(0,u.T)(),a=(0,d.v9)(l.Jt),t=(0,d.v9)(V.gr),r=(0,d.v9)(A),m=(0,d.v9)(y),v=(0,d.v9)(b),p=(0,d.v9)(w),f=(0,d.v9)(U),h=(0,d.v9)(B),C=(0,d.v9)(Z),P=(0,d.v9)(l.DQ),x=(0,d.v9)(R),N=(0,d.v9)(E),j=(0,d.v9)(O),F=(0,d.v9)(z),J=(0,c.useState)(!1),L=(0,n.Z)(J,2),Q=L[0],T=L[1],q=(0,c.useState)(_.v),H=(0,n.Z)(q,2),K=H[0],W=H[1],X=(0,c.useState)(!1),Y=(0,n.Z)(X,2),G=Y[0],$=Y[1],ee=(0,c.useState)(_.v),ae=(0,n.Z)(ee,2),te=ae[0],ne=ae[1],ce=(0,c.useRef)(null),se=r.map((function(e){var a=e._id,n=e.name,c=e.cardsCount,s=e.updated,i=e.user_name,r=e.user_id;return(0,S.jsx)(g,{packId:a,userId:r,packName:n,cardsCount:c,packUpdated:s,userName:i,isDisabled:t},a)}));(0,c.useEffect)((function(){e((0,D.KQ)({packName:m,sortPacks:v,min:p,max:f,pageCount:N,page:j,userId:P}))}),[m,v,p,f,N,j,x]);var ie=(0,c.useCallback)((function(a){var t=a.min,n=a.max;e((0,I.iP)({max:n,min:t}))}),[]),re=function(){T(!1),W(_.v),$(!1),ne(_.v)},ue=function(){return re()};return a?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(i.u_,{isModalActive:Q,onDeactivateModalClick:ue,children:(0,S.jsx)(i.N1,{onDeactivateModalClick:ue,setUpdatedPackName:W,setIsPackPrivate:$,onSaveClick:function(){var a=K.trim();a!==_.v?(e((0,D.St)({authorizedUserId:P,packName:a,isPackPrivate:G})),re()):ne(_.c)},value:K,isPackPrivate:G,isLabelItem:!0,errorMessage:te,setErrorMessage:ne,ref:ce,title:"Add new pack"})}),(0,S.jsxs)("div",{className:M.container,children:[(0,S.jsxs)("div",{className:M.top,children:[(0,S.jsx)("h2",{className:M.title,children:"Packs list"}),(0,S.jsx)(s.Y7,{primary:!0,additionalPrimaryBtn:M.addNewPackBtn,onClick:function(){var e;T(!0),null===(e=ce.current)||void 0===e||e.focus()},disabled:t,children:"Add new pack"})]}),(0,S.jsxs)("div",{className:M.main,children:[(0,S.jsx)(s.ol,{title:"Search",searchValue:m,handleSetSearchValueChange:function(a){e((0,I.PN)(a))},handleResetSearchValueClick:function(a){e((0,I.PN)(a))}}),(0,S.jsx)(s.jW,{selectedPack:x}),(0,S.jsx)(s.w$,{max:f,min:p,maxDefaultValue:C,minDefaultValue:h,onSetMinAndMaxValueMouseUp:ie})]}),(0,S.jsxs)("div",{className:M.sort,children:[(0,S.jsx)(s.PE,{sortValues:["Name","Cards","Last Updated","Created by"],sortByDescending:["0name","0cardsCount","0updated","0user_name"],sortByAscending:["1name","1cardsCount","1updated","1user_name"],sortValue:v,handleSortByAscendingClick:function(a){e((0,I.Vw)(a))},handleSortByDescendingClick:function(a){e((0,I.Vw)(a))},isDisabled:t}),(0,S.jsx)("div",{className:M.actions,children:"Actions"})]}),r.length?se:(0,S.jsx)("h2",{className:M.emptyItems,children:"This pack is empty"}),(0,S.jsx)(s.tl,{pageCount:N,page:j,handleSetPageClick:function(a){e((0,I.tO)(a))},handleSetPageCountChange:function(a){e((0,I.j9)(a))},totalItemsCount:F})]})]}):(0,S.jsx)(o.Fg,{to:k.y.LOGIN})}}}]);
//# sourceMappingURL=Packs.512861ad.chunk.js.map