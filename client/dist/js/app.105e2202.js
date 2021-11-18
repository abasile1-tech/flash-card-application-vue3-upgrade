(function(e){function t(t){for(var n,d,i=t[0],s=t[1],o=t[2],p=0,l=[];p<i.length;p++)d=i[p],Object.prototype.hasOwnProperty.call(a,d)&&a[d]&&l.push(a[d][0]),a[d]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);u&&u(t);while(l.length)l.shift()();return c.push.apply(c,o||[]),r()}function r(){for(var e,t=0;t<c.length;t++){for(var r=c[t],n=!0,i=1;i<r.length;i++){var s=r[i];0!==a[s]&&(n=!1)}n&&(c.splice(t--,1),e=d(d.s=r[0]))}return e}var n={},a={app:0},c=[];function d(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,d),r.l=!0,r.exports}d.m=e,d.c=n,d.d=function(e,t,r){d.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},d.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.t=function(e,t){if(1&t&&(e=d(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(d.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)d.d(r,n,function(t){return e[t]}.bind(null,n));return r},d.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return d.d(t,"a",t),t},d.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},d.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var o=0;o<i.length;o++)t(i[o]);var u=s;c.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";r("85ec")},"41c4":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view",{attrs:{emittedObject:e.objectToPass},on:{emitDeck:e.emitDeck}})],1)},c=[],d={name:"App",components:{},data:function(){return{objectToPass:{}}},methods:{emitDeck:function(e){this.objectToPass=e}}},i=d,s=(r("034f"),r("2877")),o=Object(s["a"])(i,a,c,!1,null,null,null),u=o.exports,p=r("8c4f"),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("Welcome to the Flash Card App!")]),n("br"),n("p",{staticClass:"displayInline"},[e._v(" You currently have "+e._s(this.deckObjectList.length)+" decks in your library.")]),n("br"),n("br"),n("p",{staticClass:"displayInline"},[e._v("Please enter the name of your new deck into the textbox:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.deckInput,expression:"deckInput"}],attrs:{type:"text"},domProps:{value:e.deckInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submit.apply(null,arguments)},input:function(t){t.target.composing||(e.deckInput=t.target.value)}}}),n("button",{on:{click:e.submit}},[e._v("submit")]),n("br"),n("p",[e._v("When you have decks, they show up here. ")]),n("p",[e._v("Click on the deck that you want to work on and you will be redirected to that deck's page.")]),n("div",{staticClass:"flexContainer"},e._l(this.deckObjectList,(function(t){return n("button",{key:t,staticClass:"deckButtons",on:{click:function(r){return e.goToDeck(t)}}},[e._v(e._s(t.deckName))])})),0),n("br"),n("img",{attrs:{src:r("5c7d"),alt:"Flash Cards"}}),n("br")])},m=[],k=r("1da1"),h=(r("96cf"),r("bc3a")),f=r.n(h),b="/api/decks/",v={name:"Welcome",components:{},props:{},data:function(){return{deckInput:"",deckObjectList:[]}},methods:{submit:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.a.post(b,{deckName:e.deckInput});case 2:r=t.sent,201!==r.status&&console.log("error: ",r),e.deckObjectList.push(r.data),e.deckInput="";case 6:case"end":return t.stop()}}),t)})))()},goToDeck:function(e){this.$emit("emitDeck",e),this.$router.push({path:"/single-deck/".concat(e.deckName)})}},created:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.a.get(b);case 2:r=t.sent,e.deckObjectList=r.data;case 4:case"end":return t.stop()}}),t)})))()}},y=v,g=(r("a997"),Object(s["a"])(y,l,m,!1,null,"3ef9d389",null)),x=g.exports,I=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.editDeckNameSelected?e._e():r("h1",[e._v(e._s(e.emittedObject.deckName))]),e.editDeckNameSelected?r("input",{directives:[{name:"model",rawName:"v-model",value:e.editDeckNameInput,expression:"editDeckNameInput"},{name:"focus",rawName:"v-focus"}],attrs:{type:"text",placeholder:"Type the new deck name"},domProps:{value:e.editDeckNameInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitEditedDeckName.apply(null,arguments)},input:function(t){t.target.composing||(e.editDeckNameInput=t.target.value)}}}):e._e(),r("button",{on:{click:function(t){return e.updateCardIndex(-1)}}},[e._v("Previous Card")]),r("button",{on:{click:function(t){return e.updateCardIndex(1)}}},[e._v("Next Card")]),r("div",{staticClass:"card"},[r("p",[e._v(e._s(e.cardSide))]),e.addCardFront||e.addCardBack?e._e():r("p",[e._v(e._s(e.cardPrompt))]),e.addCardFront?r("input",{directives:[{name:"model",rawName:"v-model",value:e.cardFrontInput,expression:"cardFrontInput"},{name:"focus",rawName:"v-focus"}],attrs:{type:"text",placeholder:"Type front text"},domProps:{value:e.cardFrontInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.flipCard.apply(null,arguments)},input:function(t){t.target.composing||(e.cardFrontInput=t.target.value)}}}):e._e(),e.addCardBack?r("input",{directives:[{name:"model",rawName:"v-model",value:e.cardBackInput,expression:"cardBackInput"}],attrs:{type:"text",placeholder:"Type back text"},domProps:{value:e.cardBackInput},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitCard.apply(null,arguments)},input:function(t){t.target.composing||(e.cardBackInput=t.target.value)}}}):e._e(),e.addCardBack?e._e():r("button",{staticClass:"cardButton",on:{click:e.flipCard}},[e._v("Flip Card")]),e.addCardBack?r("button",{staticClass:"cardButton",on:{click:e.submitCard}},[e._v("Submit Card")]):e._e()]),r("button",{on:{click:e.addCard}},[e._v("Add Card")]),r("button",{on:{click:e.deleteCard}},[e._v("Delete Card")]),r("div",[r("button",{on:{click:e.goBackToDecks}},[e._v("Return To Decks")]),r("button",{on:{click:e.deleteDeck}},[e._v("Delete Current Deck")]),r("button",{on:{click:e.editDeckName}},[e._v("Edit Deck Name")])])])},O=[],_=(r("a434"),"/api/decks/"),j={props:{emittedObject:{type:Object,required:!0,_id:{type:String,required:!0},cards:{type:Array,required:!0},deckName:{type:String,required:!0}}},directives:{focus:{inserted:function(e){e.focus()}}},data:function(){return{cardSide:"Front",cardPrompt:"please add a card",cardFrontInput:"",cardBackInput:"",addCardFront:!1,addCardBack:!1,cardsListIndex:0,editDeckNameSelected:!1,editDeckNameInput:"",cardId:""}},methods:{flipCard:function(){if(0===this.emittedObject.cards.length&&(this.cardPrompt="there is no card to flip. please add a card"),this.addCardFront)return this.cardSide="Back",this.addCardBack=!0,void(this.addCardFront=!1);"Front"===this.cardSide?(this.cardSide="Back",this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardBack):(this.cardSide="Front",this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardFront)},addCard:function(){this.addCardFront=!0},submitCard:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.a.post(_+e.emittedObject._id+"/cards",{cardFront:e.cardFrontInput,cardBack:e.cardBackInput});case 2:r=t.sent,201!==r.status&&console.log("error: ",r),e.emittedObject.cards=r.data.cards,e.addCardFront=!1,e.addCardBack=!1,e.cardSide="Front",e.cardFrontInput="",e.cardBackInput="",e.cardsListIndex=e.emittedObject.cards.length-1,e.cardPrompt=e.emittedObject.cards[e.cardsListIndex].cardFront,e.cardId=e.emittedObject.cards[e.cardsListIndex]._id;case 13:case"end":return t.stop()}}),t)})))()},updateCardIndex:function(e){0!==this.emittedObject.cards.length?1!==this.emittedObject.cards.length?(e+this.cardsListIndex<0?this.cardsListIndex=this.emittedObject.cards.length-1:e+this.cardsListIndex>this.emittedObject.cards.length-1?this.cardsListIndex=0:this.cardsListIndex=e+this.cardsListIndex,this.cardSide="Front",this.cardPrompt=this.emittedObject.cards[this.cardsListIndex].cardFront,this.cardId=this.emittedObject.cards[this.cardsListIndex]._id):console.log("there is only one card in the deck."):console.log("there are no cards in the deck.")},deleteCard:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.a.delete(_+e.emittedObject._id+"/cards/"+e.cardId);case 2:e.emittedObject.cards.splice(e.cardsListIndex,1),e.emittedObject.cards.length-1>=0?(e.cardsListIndex=0===e.cardsListIndex?0:e.cardsListIndex-1,e.cardPrompt=e.emittedObject.cards[e.cardsListIndex].cardFront,e.cardId=e.emittedObject.cards[e.cardsListIndex]._id):e.cardPrompt="please add a card";case 4:case"end":return t.stop()}}),t)})))()},goBackToDecks:function(){this.$router.push({path:"/"})},deleteDeck:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.a.delete(_+e.emittedObject._id+"/deckName");case 2:e.goBackToDecks();case 3:case"end":return t.stop()}}),t)})))()},editDeckName:function(){this.editDeckNameSelected=!0},submitEditedDeckName:function(){var e=this;return Object(k["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.emittedObject.deckName=e.editDeckNameInput,t.next=3,f.a.put(_+e.emittedObject._id+"/deckName",{deckName:e.editDeckNameInput});case 3:r=t.sent,201!==r.status&&console.log("error: ",r),e.editDeckNameInput="",e.editDeckNameSelected=!1;case 7:case"end":return t.stop()}}),t)})))()}},created:function(){0!=this.emittedObject.cards.length&&(this.cardPrompt=this.emittedObject.cards[0].cardFront,this.cardId=this.emittedObject.cards[0]._id)}},C=j,w=(r("af87"),Object(s["a"])(C,I,O,!1,null,"038faeda",null)),N=w.exports,D=[{path:"/",component:x},{path:"/single-deck/:deckName",component:N,props:!0}];n["a"].use(p["a"]);var F=new p["a"]({routes:D});n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(u)},router:F}).$mount("#app")},"5c7d":function(e,t,r){e.exports=r.p+"img/flash_cards.8ef07bb4.png"},"85ec":function(e,t,r){},a997:function(e,t,r){"use strict";r("b665")},af87:function(e,t,r){"use strict";r("41c4")},b665:function(e,t,r){}});
//# sourceMappingURL=app.105e2202.js.map