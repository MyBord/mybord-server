(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1001:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t(804),i=t(244),o=t(747),s=t(950);n.default=Object(o.a)({Component:function(){return a.createElement("section",{className:s.parentSection},a.createElement("section",{className:s.section},a.createElement(r.a,null),a.createElement(i.a,{isApp:!0})))}})},747:function(e,n,t){"use strict";var a=t(0),r=t(752),i=t(748),o=t(96);n.a=function(e){var n=e.Component,t=e.gqlString,s=e.setHydration,m=void 0===s||s;if(!t){return function(){var e=Object(o.b)(),t=e.isAnimationComplete,r=e.setHydrationStatus;return a.useEffect((function(){m&&r(!0)}),[r]),t?a.createElement(n,null):null}}var l=i.a.query(t),p=function(e){var t=e.isAnimationComplete,r=e.setHydrationStatus,i=l.data.read();return a.useEffect((function(){m&&r(!0)}),[r]),t?a.createElement(n,{data:i}):null};return function(){var e=Object(o.b)(),n=e.isAnimationComplete,t=e.isHydrated,i=e.setHydrationStatus;return a.createElement(a.Suspense,{fallback:t&&a.createElement(r.a,null)},a.createElement(p,{isAnimationComplete:n,setHydrationStatus:i}))}}},748:function(e,n,t){"use strict";(function(e){var a=t(754),r=t.n(a),i=t(750);n.a={query:function(n){var t=function(n){return new Promise((function(t){var a=JSON.stringify({query:n.loc.source.body}),i=("PROD"===e.env.MODE?"https":"http")+"://mybord.io/graphql";r.a.post(i,a,{headers:{"Content-Type":"application/json"},withCredentials:!0}).then((function(e){return t(e.data.data)}))}))}(n);return{data:Object(i.a)(t)}}}}).call(this,t(60))},750:function(e,n,t){"use strict";n.a=function(e){var n,t="pending",a=e.then((function(e){t="success",n=e}),(function(e){t="error",n=e}));return{read:function(){if("pending"===t)throw a;if("error"===t)throw n;if("success"===t)return n}}}},766:function(e,n,t){e.exports=t.p+"images/_/assets/pictures/bookshelf.jpg"},767:function(e,n,t){e.exports=t.p+"images/_/assets/pictures/spongebob.png"},768:function(e,n,t){var a=t(769);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};t(21)(a,r);a.locals&&(e.exports=a.locals)},769:function(e,n,t){(n=e.exports=t(20)(!0)).push([e.i,"/* stylelint-disable */\n/* stylelint-enable */\n.img___CQhI9 {\n  border-radius: 1rem;\n  height: 30%;\n  max-width: 20rem;\n  min-width: 16rem;\n  width: 30%;\n}\n.imgBookshelf___2aUVN {\n  max-width: 25rem;\n}\n.imgLeft___2xnMF {\n  margin-right: 2rem;\n}\n.imgRight___3uU-F {\n  margin-left: 2rem;\n}\n.paragraphDiv___UO6AN {\n  align-items: center;\n  display: flex;\n  width: 75%;\n}\n.paragraphDivNoImg___2Wopw {\n  width: 100% !important;\n}\n.paragraphMargin___3KVd1 {\n  margin-top: 7rem !important;\n}\n.paragraphMarginThree___1lyna {\n  margin-top: 3rem !important;\n}\n.paragraphMarginTwo___1wDS6 {\n  margin-top: 2rem !important;\n}\n.paragraphSection___qiSpw {\n  align-items: center;\n  display: flex;\n  margin: 0 7rem;\n  justify-content: space-between;\n}\n","",{version:3,sources:["/Users/jemery/dev/mybord-client/src/spa/shared/about/aboutForUsers/aboutForUsers.module.less"],names:[],mappings:"AAAA,uBAAuB;AAUvB,sBAAsB;AACtB;EACE,oBAAoB;EACpB,YAAY;EACZ,iBAAiB;EACjB,iBAAiB;EACjB,WAAW;CACZ;AACD;EACE,iBAAiB;CAClB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,oBAAoB;EACpB,cAAc;EACd,WAAW;CACZ;AACD;EACE,uBAAuB;CACxB;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,oBAAoB;EACpB,cAAc;EACd,eAAe;EACf,+BAA+B;CAChC",file:"aboutForUsers.module.less",sourcesContent:["/* stylelint-disable */\n:export {\n  caretSize: 0.625rem;\n  footerListMargin: 3rem;\n  footerLogoSize: 5rem;\n  headerHeight: 3rem;\n  headerMarginTop: 2.5rem;\n  navWidth: 5rem;\n  stackCardSize: 7rem;\n}\n/* stylelint-enable */\n.img {\n  border-radius: 1rem;\n  height: 30%;\n  max-width: 20rem;\n  min-width: 16rem;\n  width: 30%;\n}\n.imgBookshelf {\n  max-width: 25rem;\n}\n.imgLeft {\n  margin-right: 2rem;\n}\n.imgRight {\n  margin-left: 2rem;\n}\n.paragraphDiv {\n  align-items: center;\n  display: flex;\n  width: 75%;\n}\n.paragraphDivNoImg {\n  width: 100% !important;\n}\n.paragraphMargin {\n  margin-top: 7rem !important;\n}\n.paragraphMarginThree {\n  margin-top: 3rem !important;\n}\n.paragraphMarginTwo {\n  margin-top: 2rem !important;\n}\n.paragraphSection {\n  align-items: center;\n  display: flex;\n  margin: 0 7rem;\n  justify-content: space-between;\n}\n"],sourceRoot:""}]),n.locals={caretSize:"0.625rem",footerListMargin:"3rem",footerLogoSize:"5rem",headerHeight:"3rem",headerMarginTop:"2.5rem",navWidth:"5rem",stackCardSize:"7rem",img:"img___CQhI9",imgBookshelf:"imgBookshelf___2aUVN",imgLeft:"imgLeft___2xnMF",imgRight:"imgRight___3uU-F",paragraphDiv:"paragraphDiv___UO6AN",paragraphDivNoImg:"paragraphDivNoImg___2Wopw",paragraphMargin:"paragraphMargin___3KVd1",paragraphMarginThree:"paragraphMarginThree___1lyna",paragraphMarginTwo:"paragraphMarginTwo___1wDS6",paragraphSection:"paragraphSection___qiSpw"}},804:function(e,n,t){"use strict";var a=t(0),r=t(15),i=t(766),o=t.n(i),s=t(767),m=t.n(s),l=t(768);n.a=function(){return a.createElement(a.Fragment,null,a.createElement("section",{className:l.paragraphSection},a.createElement("img",{alt:"snl",className:[l.img,l.imgLeft].join(" "),src:"https://media.giphy.com/media/i4Mgat1S2f3Co/giphy.gif"}),a.createElement("div",{className:l.paragraphDiv},a.createElement(r.a,{lineHeight:"large",size:"four",text:"Remember the 90's? I know, I barely do too. But when I was growing up, I didn't have a computer, the internet, or a smart phone. So what did I do with all my music, movies, books, articles, encyclopedias, pictures, travel ideas, video games, notebooks, and a lot more? I kept them on my book shelf.",textAlign:"justify"}))),a.createElement("section",{className:[l.paragraphSection,l.paragraphMargin].join(" ")},a.createElement("div",{className:l.paragraphDiv},a.createElement(r.a,{lineHeight:"large",size:"four",text:"Ok, stay with me. I know a \"bookshelf\" is not the most exhilarating idea, but what are you using now? When you come across an interesting video online that you want to save for later, what do you do with it? What about an article you want to read? A funny gif you don't want to forget about? Songs you like, movies you want to see, places you might want to travel to? If you're like me, you'll either bookmark these in your browser, email them to yourself (I have so many emails now 😩) or create a favorites list on LOTS of different websites.",textAlign:"justify"})),a.createElement("img",{alt:"bookshelf",className:[l.img,l.imgBookshelf,l.imgRight].join(" "),src:o.a})),a.createElement("section",{className:[l.paragraphSection,l.paragraphMargin].join(" ")},a.createElement("img",{alt:"spongebob",className:[l.img,l.imgLeft].join(" "),src:m.a}),a.createElement("div",{className:l.paragraphDiv},a.createElement(r.a,{lineHeight:"large",size:"four",text:"Let's fix this. I'm going to give you back your bookshelf. Anything on the internet you see, like, want to save for later, or more, you can save it here. No more emails. No more bookmarks. No more to do lists on 20 different apps and websites. Just one app, one place, to put all your stuff.",textAlign:"justify"}))),a.createElement("section",{className:[l.paragraphSection,l.paragraphMarginThree].join(" ")},a.createElement("div",{className:[l.paragraphDiv,l.paragraphDivNoImg].join(" ")},a.createElement(r.a,{lineHeight:"large",size:"four",text:"Share with your friends. See what's on their bord, get inspired, and discover cool new stuff.",textAlign:"justify"}))),a.createElement("section",{className:[l.paragraphSection,l.paragraphMarginTwo].join(" ")},a.createElement("div",{className:[l.paragraphDiv,l.paragraphDivNoImg].join(" ")},a.createElement(r.a,{lineHeight:"large",size:"four",text:"Sincerely,\n- some random guy on the internet who helped build this site",textAlign:"justify"}))))}},950:function(e,n,t){var a=t(951);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};t(21)(a,r);a.locals&&(e.exports=a.locals)},951:function(e,n,t){(n=e.exports=t(20)(!0)).push([e.i,"/* stylelint-disable */\n/* stylelint-enable */\n.parentSection___2TV4t {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  margin-top: 4rem;\n  width: 100%;\n}\n.section___3277k {\n  flex: auto;\n  height: 10rem;\n  overflow: auto;\n  padding-top: 4rem;\n}\n","",{version:3,sources:["/Users/jemery/dev/mybord-client/src/spa/app/pages/aboutPage/aboutPage.module.less"],names:[],mappings:"AAAA,uBAAuB;AAUvB,sBAAsB;AACtB;EACE,cAAc;EACd,uBAAuB;EACvB,aAAa;EACb,iBAAiB;EACjB,YAAY;CACb;AACD;EACE,WAAW;EACX,cAAc;EACd,eAAe;EACf,kBAAkB;CACnB",file:"aboutPage.module.less",sourcesContent:["/* stylelint-disable */\n:export {\n  caretSize: 0.625rem;\n  footerListMargin: 3rem;\n  footerLogoSize: 5rem;\n  headerHeight: 3rem;\n  headerMarginTop: 2.5rem;\n  navWidth: 5rem;\n  stackCardSize: 7rem;\n}\n/* stylelint-enable */\n.parentSection {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  margin-top: 4rem;\n  width: 100%;\n}\n.section {\n  flex: auto;\n  height: 10rem;\n  overflow: auto;\n  padding-top: 4rem;\n}\n"],sourceRoot:""}]),n.locals={caretSize:"0.625rem",footerListMargin:"3rem",footerLogoSize:"5rem",headerHeight:"3rem",headerMarginTop:"2.5rem",navWidth:"5rem",stackCardSize:"7rem",parentSection:"parentSection___2TV4t",section:"section___3277k"}}}]);
//# sourceMappingURL=14.bundle.js.map