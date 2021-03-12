(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["personalAccount"],{2532:function(e,t,s){"use strict";var r=s("23e7"),a=s("5a34"),o=s("1d80"),n=s("ab13");r({target:"String",proto:!0,forced:!n("includes")},{includes:function(e){return!!~String(o(this)).indexOf(a(e),arguments.length>1?arguments[1]:void 0)}})},"42b3":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("main",{attrs:{id:"PersonalAccount"}},[s("h1",{staticClass:"h2 text-center mb-4 sr-only"},[e._v("Vos données personnelles")]),s("b-tabs",{attrs:{"content-class":"p-md-5",pills:"",fill:""}},[s("b-tab",{attrs:{title:"Sujets"}},[s("h2",{staticClass:"h4 my-5"},[e._v("Vous suivez ces sujets")]),s("b-list-group",{attrs:{flush:""}},[e._l(e.allFollows,(function(e){return s("Subject",{key:e.id,attrs:{subject:e}})})),e.showAllSubjects?e._l(e.subjectsNotFollowed,(function(e){return s("Subject",{key:e.id,attrs:{subject:e}})})):s("b-button",{staticClass:"mt-4",attrs:{variant:"outline-dark"},on:{click:function(t){return e.showMoreSubjects()}}},[e._v("Voir tous les sujets")])],2)],1),s("b-tab",{attrs:{title:"Profile",lazy:""}},[s("UserForm",{attrs:{userData:e.oneUser}})],1),s("b-tab",{attrs:{title:"Privacy"}},[s("b-form",{staticClass:"mt-4",on:{submit:function(t){return t.preventDefault(),e.handleUpdateRgpd()}}},[s("b-row",[s("b-col",{staticClass:"d-flex align-items-center flex-row-reverse justify-content-end",attrs:{cols:"12"}},[s("label",{staticClass:"ml-2 my-0",attrs:{for:"restricted"}},[e._v(" Restreindre l'utilisation de mes données")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.rgpdCheckboxes.restricted,expression:"rgpdCheckboxes.restricted"}],attrs:{id:"restricted",type:"checkbox"},domProps:{checked:Array.isArray(e.rgpdCheckboxes.restricted)?e._i(e.rgpdCheckboxes.restricted,null)>-1:e.rgpdCheckboxes.restricted},on:{change:[function(t){var s=e.rgpdCheckboxes.restricted,r=t.target,a=!!r.checked;if(Array.isArray(s)){var o=null,n=e._i(s,o);r.checked?n<0&&e.$set(e.rgpdCheckboxes,"restricted",s.concat([o])):n>-1&&e.$set(e.rgpdCheckboxes,"restricted",s.slice(0,n).concat(s.slice(n+1)))}else e.$set(e.rgpdCheckboxes,"restricted",a)},function(t){e.updateSuccess=!1}]}})]),s("b-col",{staticClass:"d-flex align-items-center flex-row-reverse justify-content-end",attrs:{cols:"12"}},[s("label",{staticClass:"ml-2 my-0",attrs:{for:"contactable"}},[e._v(" Etre contacté par des partenaires commerciaux")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.rgpdCheckboxes.contactable,expression:"rgpdCheckboxes.contactable"}],attrs:{id:"contactable",type:"checkbox"},domProps:{checked:Array.isArray(e.rgpdCheckboxes.contactable)?e._i(e.rgpdCheckboxes.contactable,null)>-1:e.rgpdCheckboxes.contactable},on:{change:[function(t){var s=e.rgpdCheckboxes.contactable,r=t.target,a=!!r.checked;if(Array.isArray(s)){var o=null,n=e._i(s,o);r.checked?n<0&&e.$set(e.rgpdCheckboxes,"contactable",s.concat([o])):n>-1&&e.$set(e.rgpdCheckboxes,"contactable",s.slice(0,n).concat(s.slice(n+1)))}else e.$set(e.rgpdCheckboxes,"contactable",a)},function(t){e.updateSuccess=!1}]}})]),s("b-col",{staticClass:"d-flex align-items-center flex-row-reverse justify-content-end",attrs:{cols:"12"}},[s("label",{staticClass:"ml-2 my-0",attrs:{for:"shareWithPartners"}},[e._v(" Accepter que les données soient transmises a des partenaires")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.rgpdCheckboxes.shareWithPartners,expression:"rgpdCheckboxes.shareWithPartners"}],attrs:{id:"shareWithPartners",type:"checkbox"},domProps:{checked:Array.isArray(e.rgpdCheckboxes.shareWithPartners)?e._i(e.rgpdCheckboxes.shareWithPartners,null)>-1:e.rgpdCheckboxes.shareWithPartners},on:{change:[function(t){var s=e.rgpdCheckboxes.shareWithPartners,r=t.target,a=!!r.checked;if(Array.isArray(s)){var o=null,n=e._i(s,o);r.checked?n<0&&e.$set(e.rgpdCheckboxes,"shareWithPartners",s.concat([o])):n>-1&&e.$set(e.rgpdCheckboxes,"shareWithPartners",s.slice(0,n).concat(s.slice(n+1)))}else e.$set(e.rgpdCheckboxes,"shareWithPartners",a)},function(t){e.updateSuccess=!1}]}})])],1),e.updateSuccess?s("p",{staticClass:"text-success mt-2 mb-0"},[e._v(" Les modifications ont bien été prises en compte ")]):e._e(),s("b-button",{staticClass:"my-3",attrs:{id:"submitRgpd",type:"submit",variant:"dark"}},[e._v("Envoyer")])],1),s("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.supressAccount",modifiers:{supressAccount:!0}}],staticClass:"text-left",attrs:{type:"button",variant:"link"}},[e._v(" Supprimer mon compte ")]),s("b-modal",{attrs:{id:"supressAccount",title:"BootstrapVue",centered:"","hide-header":"","hide-footer":"","body-class":"p-4 d-flex flex-column align-items-center"}},[s("p",{staticClass:"my-4 text-center"},[e._v(" Vous êtes sur le point de supprimer votre compte de manière définitive. ")]),s("b-button",{staticClass:"w-100 mb-2",attrs:{variant:"dark"},on:{click:function(t){return e.handleDelete()}}},[e._v(" Supprimer votre compte ")]),s("b-button",{staticClass:"w-100",attrs:{variant:"outline-danger"},on:{click:function(t){return e.$bvModal.hide("supressAccount")}}},[e._v(" Annuler ")])],1),s("b-button",{staticClass:"text-left",attrs:{type:"button",variant:"link"},on:{click:function(t){return e.handleExport()}}},[e._v(" Télécharger les données de votre compte ")])],1)],1)],1)},a=[],o=(s("4de4"),s("caad"),s("d81d"),s("d3b7"),s("2532"),s("3ca3"),s("ddb0"),s("2b3d"),s("5530")),n=s("fa7e"),i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ValidationObserver",{ref:"registerObserver",attrs:{tag:"div"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.handleSubmit;return[s("h2",{staticClass:"text-center my-5 h4"},[e._v("Vos informations personnelles")]),e.editInfos||e.editPass?e._e():s("div",[s("div",{staticClass:"d-flex align-items-center mb-4"},[s("h3",{staticClass:"h5 mr-4"},[e._v("Pseudo")]),e.editInfos?e._e():s("p",{staticClass:"m-0"},[e._v(e._s(e.userData.user_name))])]),s("div",{staticClass:"d-flex align-items-center mb-4"},[s("h3",{staticClass:"h5 mr-4"},[e._v("Email")]),e.editInfos?e._e():s("p",{staticClass:"m-0"},[e._v(e._s(e.userData.email))])]),s("div",{staticClass:"d-flex align-items-center mb-4"},[s("h3",{staticClass:"h5 mr-4"},[e._v("Photo de profil")]),s("b-img",{staticClass:"rounded-circle",attrs:{src:e.previewUrl,alt:"Votre photo de profil",width:"100",height:"100"}})],1),s("div",{staticClass:"d-flex align-items-center"},[s("h3",{staticClass:"h5 mr-4"},[e._v("Date de naissance")]),e.editInfos?e._e():s("p",{staticClass:"m-0"},[e._v(e._s(e.userData.birthdate))])])]),e.editInfos?s("b-form",{on:{submit:function(t){return t.preventDefault(),r(e.handleUpdateInfos)}}},[s("ValidationProvider",{attrs:{name:"email",rules:"email"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.valid,a=t.errors;return[s("b-form-group",{attrs:{id:"userMail-group",label:"Email :","label-cols":"12","label-cols-md":"3","label-for":"userMail"}},[s("b-form-input",{attrs:{id:"userMail",type:"text",placeholder:e.userData.email,autofocus:"",trim:"",state:!a[0]&&(!!r||null)},model:{value:e.user.email,callback:function(t){e.$set(e.user,"email",t)},expression:"user.email"}}),s("b-form-invalid-feedback",{attrs:{"aria-live":"polite"}},[e._v(" "+e._s(a[0])+" ")])],1)]}}],null,!0)}),s("ValidationProvider",{attrs:{name:"pseudo",rules:"alpha_num"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.valid,a=t.errors;return[s("b-form-group",{attrs:{id:"userName-group",label:"Pseudo:","label-cols":"12","label-cols-md":"3","label-for":"userName"}},[s("b-form-input",{attrs:{id:"userName",type:"text",placeholder:e.userData.user_name,trim:"",state:!a[0]&&(!!r||null)},model:{value:e.user.user_name,callback:function(t){e.$set(e.user,"user_name",t)},expression:"user.user_name"}}),s("b-form-invalid-feedback",{attrs:{"aria-live":"polite"}},[e._v(" "+e._s(a[0])+" ")])],1)]}}],null,!0)}),s("ValidationProvider",{attrs:{name:"photo de profil",rules:"image"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.valid,a=t.errors;return[s("b-form-group",{attrs:{id:"userImage-group",label:"Photo de profil:","label-cols":"12","label-cols-md":"3","label-for":"userImage"}},[e.editInfos?s("b-form-file",{attrs:{id:"userImage","browse-text":"Parcourir",placeholder:"Faites glisser ou sélectionnez une photo",accept:"image/*",state:!a[0]&&(!!r||null)},on:{change:function(t){return e.showPreview(t)}},model:{value:e.user.image_url,callback:function(t){e.$set(e.user,"image_url",t)},expression:"user.image_url"}}):e._e(),s("b-form-invalid-feedback",{attrs:{"aria-live":"polite"}},[e._v(" "+e._s(a[0])+" ")])],1),s("b-img",{staticClass:"d-block mx-auto",attrs:{src:e.previewUrl,alt:"Votre photo de profil",width:"300",height:"300",fluid:""}})]}}],null,!0)}),e.editInfos&&!e.userIsMajor?s("ValidationProvider",{attrs:{name:"email des parents",rules:"email"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.valid,a=t.errors;return[s("b-form-group",{attrs:{id:"userParentMail-group",label:"Email des responsables:","label-cols":"12","label-cols-md":"3","label-for":"userParentMail"}},[s("b-form-input",{attrs:{id:"userParentMail",type:"email",placeholder:e.userData.parentEmail,state:!a[0]&&(!!r||null)},model:{value:e.user.parentEmail,callback:function(t){e.$set(e.user,"parentEmail",t)},expression:"user.parentEmail"}}),s("b-form-invalid-feedback",{attrs:{"aria-live":"polite"}},[e._v(" "+e._s(a[0])+" ")])],1)]}}],null,!0)}):e._e(),e.editInfos?s("b-button",{staticClass:"w-100 mt-4",attrs:{type:"button",variant:"outline-danger"},on:{click:function(t){e.editInfos=!1}}},[e._v("Annuler")]):e._e(),e.editInfos?s("b-button",{staticClass:"w-100 mt-4",attrs:{type:"submit",variant:"dark"}},[e._v("Envoyer")]):e._e()],1):e._e(),e.editPass?s("b-form",{on:{submit:function(t){return t.preventDefault(),r(e.handleUpdatePassword)}}},[s("ValidationProvider",{attrs:{name:"oldMdp",rules:"required|strongPassword"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.valid,a=t.errors;return[s("b-form-group",{attrs:{id:"oldUserPass-group",label:"Ancien mot de passe:","label-cols":"12","label-cols-md":"3","label-for":"oldUserPass"}},[s("b-form-input",{attrs:{id:"oldUserPass",name:"ancien mot de passe",type:"password",trim:"",placeholder:"*********************",state:!a[0]&&(!!r||null)},model:{value:e.user.oldPassword,callback:function(t){e.$set(e.user,"oldPassword",t)},expression:"user.oldPassword"}}),s("b-form-invalid-feedback",{attrs:{"aria-live":"polite"}},[e._v(" "+e._s(a[0])+" ")])],1)]}}],null,!0)}),s("ValidationProvider",{attrs:{name:"newPassword",vid:"mdp",rules:"required|strongPassword"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.valid,a=t.errors;return[s("b-form-group",{attrs:{id:"newUserPass-group",label:"Nouveau mot de passe:","label-cols":"12","label-cols-md":"3","label-for":"newUserPass"}},[s("b-form-input",{attrs:{id:"newUserPass",type:"password",placeholder:"*********************",trim:"",state:!a[0]&&(!!r||null)},model:{value:e.user.newPassword,callback:function(t){e.$set(e.user,"newPassword",t)},expression:"user.newPassword"}}),s("b-form-invalid-feedback",{attrs:{"aria-live":"polite"}},[e._v(" "+e._s(a[0])+" ")])],1)]}}],null,!0)}),s("ValidationProvider",{attrs:{name:"confirmation du nouveau mot de passe",rules:"confirmed:mdp"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.valid,a=t.errors;return[s("b-form-group",{attrs:{id:"userConfirmPass-group",label:"Confirmation du mot de passe:","label-cols":"12","label-cols-md":"3","label-for":"userConfirmPass"}},[s("b-form-input",{attrs:{id:"userConfirmPass",type:"password",placeholder:"*********************",trim:"",state:!a[0]&&(!!r||null)},model:{value:e.user.confirmation,callback:function(t){e.$set(e.user,"confirmation",t)},expression:"user.confirmation"}}),s("b-form-invalid-feedback",{attrs:{"aria-live":"polite"}},[e._v(" "+e._s(a[0])+" ")])],1)]}}],null,!0)}),s("b-button",{staticClass:"w-100 mt-4",attrs:{type:"button",variant:"outline-danger"},on:{click:function(t){e.editPass=!1}}},[e._v("Annuler")]),s("b-button",{staticClass:"w-100 mt-4",attrs:{type:"submit",variant:"dark"}},[e._v("Envoyer")])],1):e._e(),e.editInfos||e.editPass?e._e():s("b-button",{staticClass:"mt-4 mr-2",attrs:{type:"button",variant:"dark"},on:{click:function(t){e.editInfos=!0}}},[e._v("Modifier vos informations")]),e.editInfos||e.editPass?e._e():s("b-button",{staticClass:"mt-4",attrs:{type:"button",variant:"dark"},on:{click:function(t){e.editPass=!0}}},[e._v("Modifier votre mot de passe")])]}}])})},l=[],c=s("7bb1"),d=s("5a0c"),u=s.n(d),b=s("4208"),p=s.n(b),m=s("2f62");u.a.extend(p.a);var f={name:"UserForm",props:["userData"],data:function(){return{editInfos:!1,editPass:!1,previewUrl:null,user:{email:"",user_name:"",oldPassword:"",newPassword:"",confirmation:"",image_url:null,birthdate:"",parentEmail:""}}},components:{ValidationProvider:c["b"],ValidationObserver:c["a"]},computed:Object(o["a"])(Object(o["a"])({},Object(m["c"])(["userId","oneUser"])),{},{userIsMajor:function(){var e=u()(),t=u()(this.userData.birthdate);return e.diff(t,"year")>=18}}),methods:Object(o["a"])(Object(o["a"])({},Object(m["b"])(["updateUser","updatePassword"])),{},{showPreview:function(e){var t=e.target.files[0];this.previewUrl=URL.createObjectURL(t)},handleUpdateInfos:function(){var e=this,t=new FormData;t.append("email",this.user.email),t.append("user_name",this.user.user_name),this.user.image_url&&t.append("image_url",this.user.image_url),this.updateUser({id:this.userId,data:t}).then((function(){e.editInfos=!1}))},handleUpdatePassword:function(){var e=this,t={oldPassword:this.user.oldPassword,newPassword:this.user.confirmation};this.updatePassword({id:this.userId,requestBody:t}).then((function(){e.editPass=!1,e.user.oldPassword="",e.user.newPassword="",e.user.confirmation=""})).catch((function(t){switch(t){case"Wrong password":e.$refs.registerObserver.setErrors({oldMdp:["Mot de passe invalide"]});break;default:break}return console.error(t)}))}}),mounted:function(){this.user=Object(o["a"])(Object(o["a"])({},this.userData),{},{image_url:null}),this.previewUrl=this.userData.image_url}},h=f,v=s("2877"),g=Object(v["a"])(h,i,l,!1,null,null,null),_=g.exports,k={name:"PersonalAccount",components:{Subject:n["a"],UserForm:_},data:function(){return{showAllSubjects:!1,rgpdCheckboxes:{restricted:"",contactable:"",shareWithPartners:""},updateSuccess:!1,exportedDataURL:""}},computed:Object(o["a"])(Object(o["a"])({},Object(m["c"])(["oneUser","userId","allSubjects","allFollows"])),{},{subjectsNotFollowed:function(){var e=this.allFollows.map((function(e){return e.id}));return this.allSubjects.filter((function(t){return!e.includes(t.id)}))}}),methods:Object(o["a"])(Object(o["a"])({},Object(m["b"])(["fetchUser","fetchAllSubjects","getFollows","updateUser","deleteUser","logout","exportUser"])),{},{showMoreSubjects:function(){this.showAllSubjects=!0,this.fetchAllSubjects()},handleUpdateRgpd:function(){var e=this;this.updateSuccess=!1,this.updateUser({id:this.userId,data:this.rgpdCheckboxes}).then((function(){e.updateSuccess=!0}))},handleDelete:function(){var e=this;this.deleteUser(this.userId).then((function(){e.logout()}))},handleExport:function(){this.exportUser(this.userId).then((function(e){var t=window.URL.createObjectURL(new Blob([e.data])),s=document.createElement("a");s.href=t,s.setAttribute("download","file.pdf"),document.body.appendChild(s),s.click()}))}}),mounted:function(){var e=this;this.getFollows(this.userId),this.fetchUser(this.userId).then((function(){e.rgpdCheckboxes.restricted=e.oneUser.restricted,e.rgpdCheckboxes.contactable=e.oneUser.contactable,e.rgpdCheckboxes.shareWithPartners=e.oneUser.shareWithPartners}))}},w=k,x=Object(v["a"])(w,r,a,!1,null,null,null);t["default"]=x.exports},"5a34":function(e,t,s){var r=s("44e7");e.exports=function(e){if(r(e))throw TypeError("The method doesn't accept regular expressions");return e}},ab13:function(e,t,s){var r=s("b622"),a=r("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(s){try{return t[a]=!1,"/./"[e](t)}catch(r){}}return!1}},d81d:function(e,t,s){"use strict";var r=s("23e7"),a=s("b727").map,o=s("1dde"),n=s("ae40"),i=o("map"),l=n("map");r({target:"Array",proto:!0,forced:!i||!l},{map:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=personalAccount.d1be104c.js.map