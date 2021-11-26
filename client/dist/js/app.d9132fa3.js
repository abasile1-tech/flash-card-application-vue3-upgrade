(function(e){function t(t){for(var n,c,i=t[0],d=t[1],o=t[2],p=0,l=[];p<i.length;p++)c=i[p],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&l.push(a[c][0]),a[c]=0;for(n in d)Object.prototype.hasOwnProperty.call(d,n)&&(e[n]=d[n]);u&&u(t);while(l.length)l.shift()();return s.push.apply(s,o||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,i=1;i<r.length;i++){var d=r[i];0!==a[d]&&(n=!1)}n&&(s.splice(t--,1),e=c(c.s=r[0]))}return e}var n={},a={app:0},s=[];function c(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=e,c.c=n,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(r,n,function(t){return e[t]}.bind(null,n));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],d=i.push.bind(i);i.push=t,i=i.slice();for(var o=0;o<i.length;o++)t(i[o]);var u=d;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view",{attrs:{emittedObject:e.objectToPass,emittedUser:e.userToPass},on:{emitDeck:e.emitDeck,emitUser:e.emitUser}})],1)},s=[],c={name:"App",components:{},data:function(){return{objectToPass:{},userToPass:{}}},methods:{emitDeck:function(e){this.objectToPass=e},emitUser:function(e){this.userToPass=e}}},i=c,d=(r("034f"),r("2877")),o=Object(d["a"])(i,a,s,!1,null,null,null),u=o.exports,p=r("8c4f"),l=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"welcome_css"}},[r("h1",[e._v("Welcome, "+e._s(e.emittedUser.userName)+"!")]),r("br"),e.onlyOneDeck?r("p",{staticClass:"displayInline"},[e._v(" You currently have "+e._s(this.deckObjectList.length)+" deck in your library.")]):r("p",{staticClass:"displayInline"},[e._v(" You currently have "+e._s(this.deckObjectList.length)+" decks in your library.")]),r("br"),r("br"),r("p",{staticClass:"displayInline"},[e._v("Please enter the name of your new deck into the textbox:")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.deckInput,expression:"deckInput"}],attrs:{type:"text"},domProps:{value:e.deckInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submit.apply(null,arguments)},input:function(t){t.target.composing||(e.deckInput=t.target.value)}}}),r("button",{on:{click:e.submit}},[e._v("submit")]),r("br"),r("p",[e._v("When you have decks, they show up here. ")]),r("p",[e._v("Click on the deck that you want to work on and you will be redirected to that deck's page.")]),r("div",{staticClass:"flexContainer"},e._l(this.deckObjectList,(function(t){return r("button",{key:t,staticClass:"deckButtons",on:{click:function(r){return e.goToDeck(t)}}},[e._v(e._s(t.deckName))])})),0),r("br"),r("button",{on:{click:function(t){return e.returnToLoginPage()}}},[e._v("Return To Login Page")])])},m=[],k=r("1da1"),h=(r("96cf"),r("bc3a")),f=r.n(h),v="/api/decks/",b="/api/users/",g={name:"Welcome",components:{},props:{emittedUser:{Type:Object,required:!0,_id:{type:String,required:!0},userName:{type:String,required:!0}}},data:function(){return{deckInput:"",deckObjectList:[],onlyOneDeck:!1}},methods:{submit:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.a.post(v,{deckName:e.deckInput,userId:e.emittedUser._id});case 2:r=t.sent,201!==r.status&&console.log("error: ",r),e.deckObjectList.push(r.data),1==e.deckObjectList.length?e.onlyOneDeck=!0:e.onlyOneDeck=!1,e.deckInput="";case 7:case"end":return t.stop()}}),t)})))()},goToDeck:function(e){this.$emit("emitDeck",e),this.$router.push({path:"/welcome/single-deck/".concat(e.deckName)})},returnToLoginPage:function(){localStorage.removeItem("emittedUser._id"),this.$router.push({path:"/"})}},created:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(void 0!=e.emittedUser._id&&localStorage.setItem("emittedUser._id",e.emittedUser._id),void 0!=e.emittedUser._id){t.next=7;break}return e.emittedUser._id=localStorage.getItem("emittedUser._id"),t.next=5,f.a.get(b+e.emittedUser._id);case 5:r=t.sent,e.emittedUser=r.data;case 7:return t.next=9,f.a.get(v+e.emittedUser._id);case 9:n=t.sent,e.deckObjectList=n.data,1==e.deckObjectList.length&&(e.onlyOneDeck=!0);case 12:case"end":return t.stop()}}),t)})))()}},I=g,y=(r("d33e"),Object(d["a"])(I,l,m,!1,null,"158c1bae",null)),w=y.exports,_=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"singleDeck_css"}},[e.editDeckNameSelected?e._e():r("h1",[e._v(e._s(e.emittedObject.deckName))]),r("div",{staticClass:"textBox"},[e.editDeckNameSelected?r("input",{directives:[{name:"model",rawName:"v-model",value:e.editDeckNameInput,expression:"editDeckNameInput"},{name:"focus",rawName:"v-focus"}],attrs:{type:"text",placeholder:"Type the new deck name"},domProps:{value:e.editDeckNameInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitEditedDeckName.apply(null,arguments)},input:function(t){t.target.composing||(e.editDeckNameInput=t.target.value)}}}):e._e()]),r("button",{staticClass:"cardNavigationButtons1",on:{click:function(t){return e.updateCardIndex(-1)}}},[e._v("Previous Card")]),r("button",{staticClass:"cardNavigationButtons2",on:{click:function(t){return e.updateCardIndex(1)}}},[e._v("Next Card")]),r("div",{staticClass:"card",class:{flipped:"Front"===this.cardSide}},[r("p",{staticClass:"cardPromptClass1"},[e._v(e._s(e.cardSide))]),e.addCardFront||e.addCardBack?e._e():r("p",{staticClass:"cardPromptClass2"},[e._v(e._s(e.cardPrompt))]),e.addCardFront?r("input",{directives:[{name:"model",rawName:"v-model",value:e.cardFrontInput,expression:"cardFrontInput"},{name:"focus",rawName:"v-focus"}],staticClass:"cardInputBox",attrs:{type:"text",placeholder:"Type front text"},domProps:{value:e.cardFrontInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.flipCard.apply(null,arguments)},input:function(t){t.target.composing||(e.cardFrontInput=t.target.value)}}}):e._e(),e.addCardBack?r("input",{directives:[{name:"model",rawName:"v-model",value:e.cardBackInput,expression:"cardBackInput"}],staticClass:"cardInputBox",attrs:{type:"text",placeholder:"Type back text"},domProps:{value:e.cardBackInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitCard.apply(null,arguments)},input:function(t){t.target.composing||(e.cardBackInput=t.target.value)}}}):e._e(),e.addCardBack?e._e():r("button",{staticClass:"cardButton",on:{click:e.flipCard}},[e._v("Flip Card")]),e.addCardBack?r("button",{staticClass:"cardButton",on:{click:e.submitCard}},[e._v("Submit Card")]):e._e()]),r("button",{staticClass:"addCardButton",on:{click:e.addCard}},[e._v("Add Card")]),r("button",{staticClass:"deleteCardButton",on:{click:e.deleteCard}},[e._v("Delete Card")]),r("div",[r("button",{staticClass:"deckEditButton",on:{click:e.editDeckName}},[e._v("Edit Deck Name")]),r("button",{staticClass:"deckDeleteButton",on:{click:e.deleteDeck}},[e._v("Delete Deck")]),r("br"),r("button",{staticClass:"decksReturnButton",on:{click:e.goBackToDecks}},[e._v("Return To Decks")])])])},x=[],N=(r("a434"),"/api/decks/"),C={props:{emittedObject:{type:Object,required:!0,_id:{type:String,required:!0},cards:{type:Array,required:!0},deckName:{type:String,required:!0}}},directives:{focus:{inserted:function(e){e.focus()}}},data:function(){return{cardSide:"Front",cardPrompt:"please add a card",cardFrontInput:"",cardBackInput:"",addCardFront:!1,addCardBack:!1,cardsListIndex:0,editDeckNameSelected:!1,editDeckNameInput:"",cardId:""}},methods:{flipCard:function(){if(0===this.emittedObject.cards.length&&(this.cardPrompt="there is no card to flip. please add a card"),this.addCardFront)return this.cardSide="Back",this.addCardBack=!0,void(this.addCardFront=!1);"Front"===this.cardSide?(this.cardSide="Back",this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardBack):(this.cardSide="Front",this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardFront)},addCard:function(){this.addCardFront=!0},submitCard:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.a.post(N+e.emittedObject._id+"/cards",{cardFront:e.cardFrontInput,cardBack:e.cardBackInput});case 2:r=t.sent,201!==r.status&&console.log("error: ",r),e.emittedObject.cards=r.data.cards,e.addCardFront=!1,e.addCardBack=!1,e.cardSide="Front",e.cardFrontInput="",e.cardBackInput="",e.cardsListIndex=e.emittedObject.cards.length-1,e.cardPrompt=e.emittedObject.cards[e.cardsListIndex].cardFront,e.cardId=e.emittedObject.cards[e.cardsListIndex]._id;case 13:case"end":return t.stop()}}),t)})))()},updateCardIndex:function(e){0!==this.emittedObject.cards.length?1!==this.emittedObject.cards.length?(e+this.cardsListIndex<0?this.cardsListIndex=this.emittedObject.cards.length-1:e+this.cardsListIndex>this.emittedObject.cards.length-1?this.cardsListIndex=0:this.cardsListIndex=e+this.cardsListIndex,this.cardSide="Front",this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardFront,this.cardId=this.emittedObject.cards[this.cardsListIndex]._id):console.log("there is only one card in the deck."):console.log("there are no cards in the deck.")},deleteCard:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.a.delete(N+e.emittedObject._id+"/cards/"+e.cardId);case 2:e.emittedObject.cards.splice(e.cardsListIndex,1),e.emittedObject.cards.length-1>=0?(e.cardsListIndex=0===e.cardsListIndex?0:e.cardsListIndex-1,e.cardPrompt=e.emittedObject.cards[e.cardsListIndex].cardFront,e.cardId=e.emittedObject.cards[e.cardsListIndex]._id):e.cardPrompt="please add a card";case 4:case"end":return t.stop()}}),t)})))()},goBackToDecks:function(){this.$router.push({path:"/welcome"})},deleteDeck:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.a.delete(N+e.emittedObject._id+"/deckName");case 2:e.goBackToDecks();case 3:case"end":return t.stop()}}),t)})))()},editDeckName:function(){this.editDeckNameSelected=!0},submitEditedDeckName:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.emittedObject.deckName=e.editDeckNameInput,t.next=3,f.a.put(N+e.emittedObject._id+"/deckName",{deckName:e.editDeckNameInput});case 3:r=t.sent,201!==r.status&&console.log("error: ",r),e.editDeckNameInput="",e.editDeckNameSelected=!1;case 7:case"end":return t.stop()}}),t)})))()}},created:function(){0!=this.emittedObject.cards.length&&(this.cardPrompt=this.emittedObject.cards[0].cardFront,this.cardId=this.emittedObject.cards[0]._id)}},O=C,j=(r("b020"),Object(d["a"])(O,_,x,!1,null,"76f5f1ff",null)),P=j.exports,D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"loginPage_css"}},[n("h1",[e._v("Welcome to the Flash Card App!")]),n("img",{attrs:{src:r("5c7d"),alt:"Flash Cards"}}),n("br"),n("p",{staticClass:"displayInline"},[e._v("If you already have an account, please enter your username and password:")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:e.userNameInput,expression:"userNameInput"}],attrs:{type:"text",placeholder:"Type your username"},domProps:{value:e.userNameInput},on:{input:function(t){t.target.composing||(e.userNameInput=t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordInput,expression:"passwordInput"}],attrs:{type:"password",placeholder:"Type your password"},domProps:{value:e.passwordInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.logIn.apply(null,arguments)},input:function(t){t.target.composing||(e.passwordInput=t.target.value)}}}),n("br"),n("button",{on:{click:function(t){return e.logIn()}}},[e._v("Log In")]),n("br"),n("p",{staticClass:"displayInline"},[e._v("If you do not already have an account, please create one by entering a username and password:")]),n("br"),n("input",{directives:[{name:"model",rawName:"v-model",value:e.userNameInputNew,expression:"userNameInputNew"}],attrs:{type:"text",placeholder:"Type a new username"},domProps:{value:e.userNameInputNew},on:{input:function(t){t.target.composing||(e.userNameInputNew=t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.passwordInputNew,expression:"passwordInputNew"}],attrs:{type:"password",placeholder:"Type a new password"},domProps:{value:e.passwordInputNew},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.signUp.apply(null,arguments)},input:function(t){t.target.composing||(e.passwordInputNew=t.target.value)}}}),n("br"),n("button",{on:{click:function(t){return e.signUp()}}},[e._v("Sign Up")]),n("br"),n("div",{staticClass:"snackbar",attrs:{id:"snackbar1"}},[e._v("Incorrect Password")]),n("div",{staticClass:"snackbar",attrs:{id:"snackbar2"}},[e._v("UserName Already Taken")]),n("div",{staticClass:"snackbar",attrs:{id:"snackbar3"}},[e._v("User Not Found")])])},B=[],L="/api/users/",S={name:"LoginPage",components:{},props:{},data:function(){return{userNameInput:"",passwordInput:"",userNameInputNew:"",passwordInputNew:""}},methods:{logIn:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.a.post(L+"/login",{userName:e.userNameInput,userPassword:e.passwordInput});case 2:if(r=t.sent,n=r.data,205!=r.status){t.next=8;break}return e.showSnackBar("snackbar1"),e.clearLogInInputs(),t.abrupt("return");case 8:if(202!=r.status){t.next=12;break}return e.showSnackBar("snackbar3"),e.clearLogInInputs(),t.abrupt("return");case 12:e.$emit("emitUser",n),e.clearLogInInputs(),e.$router.push({path:"/welcome/"});case 15:case"end":return t.stop()}}),t)})))()},signUp:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.a.post(L,{userName:e.userNameInputNew,userPassword:e.passwordInputNew});case 2:if(r=t.sent,205!=r.status){t.next=7;break}return e.showSnackBar("snackbar2"),e.clearSignUpInputs(),t.abrupt("return");case 7:n=r.data,e.clearSignUpInputs(),e.$emit("emitUser",n),e.$router.push({path:"/welcome/"});case 11:case"end":return t.stop()}}),t)})))()},showSnackBar:function(e){var t=document.getElementById(e);t.classList.add("show"),setTimeout((function(){t.classList.remove("show")}),3e3)},clearLogInInputs:function(){this.userNameInput="",this.passwordInput=""},clearSignUpInputs:function(){this.userNameInputNew="",this.passwordInputNew=""}}},F=S,T=(r("86b9"),Object(d["a"])(F,D,B,!1,null,"70bbe0c4",null)),U=T.exports,R=[{path:"/welcome/",component:w,props:!0},{path:"/welcome/single-deck/:deckName",component:P,props:!0},{path:"/",component:U,props:!0}];n["a"].use(p["a"]);var E=new p["a"]({routes:R});n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(u)},router:E}).$mount("#app")},"5c7d":function(e,t,r){e.exports=r.p+"img/flash_cards.8ef07bb4.png"},"725d":function(e,t,r){},"85ec":function(e,t,r){},"86b9":function(e,t,r){"use strict";r("e3d0")},b020:function(e,t,r){"use strict";r("725d")},d33e:function(e,t,r){"use strict";r("ec77")},e3d0:function(e,t,r){},ec77:function(e,t,r){}});
//# sourceMappingURL=app.d9132fa3.js.map