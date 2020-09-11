(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{817:function(e,n,t){"use strict";var r=t(0),a=t(15),i=t(841),s=t.n(i),o=t(842),l=t.n(o),p=t(843),m=function(){return r.createElement(r.Fragment,null,r.createElement("section",{className:p.paragraphSection},r.createElement("img",{alt:"programming",className:[p.img,p.imgLeft].join(" "),src:l.a}),r.createElement("div",{className:p.paragraphDiv},r.createElement(a.a,{lineHeight:"large",size:"four",text:"MyBord is built with TypeScript using GraphQL and [Apollo](https://www.apollographql.com/) on top of Node.js and React.\n\nThe front end client uses [React's experimental concurrent mode](https://reactjs.org/docs/concurrent-mode-intro.html). Other apis include [Framer Motion](https://www.framer.com/motion/) for fluid component animations, [Lottie](https://airbnb.io/lottie/#/) to render animated illustrations, and [Storybook](https://storybook.js.org/) for prototyping. [Ant Design](https://ant.design/) is used for a couple common components (though more and more are getting custom built) and we use [Nucleo](https://nucleoapp.com/) for most of our icons. Lastly, everything gets styled with Less and CSS Modules and testing is done with Enzyme.",textAlign:"justify"}))),r.createElement("section",{className:[p.paragraphSection,p.paragraphMargin].join(" ")},r.createElement("div",{className:p.paragraphDiv},r.createElement(a.a,{lineHeight:"large",size:"four",text:"The back end is written on top of Node.js and Express and specifically uses [Apollo Server](https://www.apollographql.com/docs/apollo-server/v1/servers/express/). We run a PostgreSQL database with a [Prisma](https://www.prisma.io/) ORM. [Passport.js](http://www.passportjs.org/) is used to manage authentication. Third party apis include [Google's Node.js Client Api](https://github.com/googleapis/google-api-nodejs-client#google-apis-nodejs-client).\n\nOur servers are hosted via Heroku and are managed with [Prisma Cloud](https://www.prisma.io/cloud). Virtualization is done with Docker and Circle CI is used for CD management.",textAlign:"justify"})),r.createElement("img",{alt:"programming",className:[p.img,p.imgRight].join(" "),src:s.a})),r.createElement("section",{className:[p.paragraphSection,p.paragraphMargin].join(" ")},r.createElement("div",{className:[p.paragraphDiv,p.paragraphDivNoImg].join(" ")},r.createElement(a.a,{lineHeight:"large",size:"four",text:"Lastly, something to mention: at first, when you build an app, you think \"Fantastic! I'll build this with complete test coverage. Unit tests, integration tests, end to end tests and more! I'll prototype every component in Storybook and make sure I have full accessibility coverage, performance optimization and everything I can think of!\" At first, the ambitions were high, but as all of us developers know, there are always priorities to deliver on for an MVP and not everything can be done if you want to make progress and ship. So while those priorities are important to us as we want Jest, Enzyme, Storybook and more to be part of the core development process for MyBord, we're a bit more lean at the moment and are trying to get new features out the door. Important roadmap features include building out more tools and apis for each user's \"bord\", social media enhancements (following friends, subscribing, copying cards, trending), adding a browser extension, building a React Native app (and thus converting the codebase from React to React Native), enhanced OAuth, and possibly moving from Heroku to AWS.",textAlign:"justify"}))))},c=t(61),g=t(121),A=t(845),d={initial:{top:g.stackCardSize,transition:{duration:.5,ease:"easeOut"}},show:{top:"0rem",transition:{duration:.5,ease:"easeOut"}}},u=function(e){var n=e.showOverlay,t=e.text;return r.createElement(c.b.div,{animate:n?"show":"initial",className:A.overlayDiv,variants:d},r.createElement("div",{className:A.line}),r.createElement("div",{className:A.typographyDiv},r.createElement(a.a,{color:"white",size:"four",text:t,textAlign:"center",weight:"bold"})))},h=t(847),C=t.n(h),b=t(848),f=t.n(b),E=t(849),B=t.n(E),y=t(850),v=t.n(y),_=t(851),w=t.n(_),k=t(852),x=t.n(k),D=t(853),S=t.n(D),F=t(854),z=t.n(F),j=t(855),M=t.n(j),N=t(856),L=t.n(N),I=t(857),W=t.n(I),T=t(858),R=t.n(T),H=t(859),G=t.n(H),O=t(860),Y=t.n(O),q=t(861),U=t.n(q),Z=t(862),P=t.n(Z),J=t(863),V=t.n(J),K=t(864),Q=t.n(K),X=t(865),$=t.n(X),ee=t(866),ne=t.n(ee),te=t(867),re=t.n(te),ae=t(868),ie=t.n(ae),se=t(869),oe=t.n(se),le=t(870),pe=t.n(le),me={antDesign:{label:"Ant Design",link:"https://ant.design/",png:C.a},apolloClient:{fullSize:!0,label:"Apollo Client",link:"https://www.apollographql.com/docs/react/",png:f.a},apolloServer:{fullSize:!0,label:"Apollo Server",link:"https://www.apollographql.com/docs/apollo-server/v1/servers/express/",png:f.a},babel:{fullSize:!0,label:"Babel",link:"https://babeljs.io",png:B.a},circleCi:{fullSize:!0,label:"Circle CI",link:"https://circleci.com",png:v.a},cssModules:{fullSize:!0,label:"CSS Modules",link:"https://github.com/css-modules/css-modules",png:w.a},docker:{fullSize:!0,label:"Docker",link:"https://www.docker.com/",png:x.a},enzyme:{label:"Enzyme",link:"https://airbnb.io/enzyme/",png:S.a},eslint:{label:"ESLint",link:"https://eslint.org",png:z.a},express:{fullSize:!0,label:"Express",link:"https://expressjs.com/",png:M.a},framerMotion:{fullSize:!0,label:"Framer Motion",link:"https://www.framer.com/motion/",png:L.a},graphql:{label:"GraphQL",link:"https://graphql.org/",png:W.a},heroku:{fullSize:!0,label:"Heroku",link:"https://www.heroku.com/",png:R.a},jest:{label:"Jest",link:"https://jestjs.io",png:G.a},less:{label:"Less",link:"http://lesscss.org/",png:Y.a},lottie:{fullSize:!0,label:"Lottie",link:"https://airbnb.io/lottie/#/",png:U.a},node:{fullSize:!0,label:"Node.js",link:"https://nodejs.org/en/",png:P.a},nucleo:{fullSize:!0,label:"Nucleo",link:"https://nucleoapp.com/",png:V.a},passport:{fullSize:!0,label:"Passport",link:"http://www.passportjs.org/",png:Q.a},postgresql:{label:"PostgreSQL",link:"https://www.postgresql.org/",png:$.a},prisma:{fullSize:!0,label:"Prisma",link:"https://www.prisma.io/",png:ne.a},prismaCloud:{fullSize:!0,label:"Prisma Cloud",link:"https://www.prisma.io/cloud",png:ne.a},react:{fullSize:!0,label:"React",link:"https://reactjs.org",png:re.a},storybook:{label:"Storybook",link:"https://storybook.js.org",png:ie.a},typescript:{fullSize:!0,label:"TypeScript",link:"https://www.typescriptlang.org/",png:oe.a},webpack:{label:"Webpack",link:"https://webpack.js.org",png:pe.a}},ce=t(871),ge=function(e){var n=e.id,t=r.useState(!1),a=t[0],i=t[1],s=me[n];return r.createElement("a",{className:ce.stackCardAnchor,href:s.link,rel:"noopener noreferrer",target:"_blank"},r.createElement(u,{showOverlay:a,text:s.label}),r.createElement("div",{className:ce.mouseDiv,onMouseEnter:function(){return i(!0)},onMouseLeave:function(){return i(!1)}}),r.createElement("img",{alt:"react",className:s.fullSize?ce.fullSizeImg:ce.img,src:s.png}))},Ae=t(873),de=function(){return r.createElement("section",{className:Ae.stackSection},r.createElement("div",{className:Ae.stackTitleDiv},r.createElement(a.a,{color:"blue",size:"five",text:"Stack"})),r.createElement("div",{className:Ae.typographyDiv},r.createElement(a.a,{color:"blue",size:"four",text:"General"})),r.createElement("div",{className:Ae.stackCardsContainer},r.createElement(ge,{id:"typescript"}),r.createElement(ge,{id:"graphql"}),r.createElement(ge,{id:"webpack"}),r.createElement(ge,{id:"babel"}),r.createElement(ge,{id:"eslint"}),r.createElement(ge,{id:"circleCi"}),r.createElement(ge,{id:"jest"})),r.createElement("div",{className:Ae.typographyDiv},r.createElement(a.a,{color:"blue",size:"four",text:"Front End"})),r.createElement("div",{className:Ae.stackCardsContainer},r.createElement(ge,{id:"react"}),r.createElement(ge,{id:"apolloClient"}),r.createElement(ge,{id:"framerMotion"}),r.createElement(ge,{id:"storybook"}),r.createElement(ge,{id:"lottie"}),r.createElement(ge,{id:"nucleo"}),r.createElement(ge,{id:"less"}),r.createElement(ge,{id:"cssModules"}),r.createElement(ge,{id:"enzyme"}),r.createElement(ge,{id:"antDesign"})),r.createElement("div",{className:Ae.typographyDiv},r.createElement(a.a,{color:"blue",size:"four",text:"Back End"})),r.createElement("div",{className:Ae.stackCardsContainer},r.createElement(ge,{id:"node"}),r.createElement(ge,{id:"apolloServer"}),r.createElement(ge,{id:"prisma"}),r.createElement(ge,{id:"express"}),r.createElement(ge,{id:"postgresql"}),r.createElement(ge,{id:"passport"})),r.createElement("div",{className:Ae.typographyDiv},r.createElement(a.a,{color:"blue",size:"four",text:"Deployment & Hosting"})),r.createElement("div",{className:Ae.stackCardsContainer},r.createElement(ge,{id:"heroku"}),r.createElement(ge,{id:"prismaCloud"}),r.createElement(ge,{id:"docker"})))};n.a=function(){return r.createElement(r.Fragment,null,r.createElement(m,null),r.createElement(de,null))}},841:function(e,n,t){e.exports=t.p+"images/_/assets/illustrations/forklift.png"},842:function(e,n,t){e.exports=t.p+"images/_/assets/illustrations/programming.png"},843:function(e,n,t){var r=t(844);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};t(21)(r,a);r.locals&&(e.exports=r.locals)},844:function(e,n,t){(n=e.exports=t(20)(!0)).push([e.i,"/* stylelint-disable */\n/* stylelint-enable */\n.img___3xsLE {\n  border-radius: 2rem;\n  height: 30%;\n  max-width: 25rem;\n  min-width: 16rem;\n  width: 30%;\n}\n.imgLeft___2MGtu {\n  margin-right: 2rem;\n}\n.imgRight___3f1eA {\n  margin-left: 2rem;\n}\n.paragraphDiv___3jyOk {\n  align-items: center;\n  display: flex;\n  width: 65%;\n}\n.paragraphDivNoImg___3C95- {\n  width: 100% !important;\n}\n.paragraphMargin___2VEgt {\n  margin-top: 5rem !important;\n}\n.paragraphSection___3ye2y {\n  align-items: center;\n  display: flex;\n  margin: 0 7rem;\n  justify-content: space-between;\n}\n","",{version:3,sources:["/Users/jemery/dev/mybord-client/src/spa/shared/about/aboutForDevs/aboutForDevsDescription/aboutForDevsDescription.module.less"],names:[],mappings:"AAAA,uBAAuB;AAUvB,sBAAsB;AACtB;EACE,oBAAoB;EACpB,YAAY;EACZ,iBAAiB;EACjB,iBAAiB;EACjB,WAAW;CACZ;AACD;EACE,mBAAmB;CACpB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,oBAAoB;EACpB,cAAc;EACd,WAAW;CACZ;AACD;EACE,uBAAuB;CACxB;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,oBAAoB;EACpB,cAAc;EACd,eAAe;EACf,+BAA+B;CAChC",file:"aboutForDevsDescription.module.less",sourcesContent:["/* stylelint-disable */\n:export {\n  caretSize: 0.625rem;\n  footerListMargin: 3rem;\n  footerLogoSize: 5rem;\n  headerHeight: 3rem;\n  headerMarginTop: 2.5rem;\n  navWidth: 5rem;\n  stackCardSize: 7rem;\n}\n/* stylelint-enable */\n.img {\n  border-radius: 2rem;\n  height: 30%;\n  max-width: 25rem;\n  min-width: 16rem;\n  width: 30%;\n}\n.imgLeft {\n  margin-right: 2rem;\n}\n.imgRight {\n  margin-left: 2rem;\n}\n.paragraphDiv {\n  align-items: center;\n  display: flex;\n  width: 65%;\n}\n.paragraphDivNoImg {\n  width: 100% !important;\n}\n.paragraphMargin {\n  margin-top: 5rem !important;\n}\n.paragraphSection {\n  align-items: center;\n  display: flex;\n  margin: 0 7rem;\n  justify-content: space-between;\n}\n"],sourceRoot:""}]),n.locals={caretSize:"0.625rem",footerListMargin:"3rem",footerLogoSize:"5rem",headerHeight:"3rem",headerMarginTop:"2.5rem",navWidth:"5rem",stackCardSize:"7rem",img:"img___3xsLE",imgLeft:"imgLeft___2MGtu",imgRight:"imgRight___3f1eA",paragraphDiv:"paragraphDiv___3jyOk",paragraphDivNoImg:"paragraphDivNoImg___3C95-",paragraphMargin:"paragraphMargin___2VEgt",paragraphSection:"paragraphSection___3ye2y"}},845:function(e,n,t){var r=t(846);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};t(21)(r,a);r.locals&&(e.exports=r.locals)},846:function(e,n,t){(n=e.exports=t(20)(!0)).push([e.i,"/* stylelint-disable */\n/* stylelint-enable */\n/* stylelint-disable */\n/* stylelint-enable */\n.line___2DZw5 {\n  background: #FFF;\n  height: 0.125rem;\n  left: 50%;\n  position: absolute;\n  top: 0.5rem;\n  transform: translateX(-50%);\n  width: 4rem;\n}\n.overlayDiv___1rZcm {\n  background: #565E5FE6;\n  border-radius: 0.5rem;\n  height: 100%;\n  position: absolute;\n  width: 100%;\n}\n.typographyDiv___3GeAx {\n  align-items: center;\n  display: flex;\n  height: 100%;\n  justify-content: center;\n}\n","",{version:3,sources:["/Users/jemery/dev/mybord-client/src/thirdParty/framerMotion/stackCardOverlayAnimation.module.less"],names:[],mappings:"AAAA,uBAAuB;AAcvB,sBAAsB;AACtB,uBAAuB;AAUvB,sBAAsB;AACtB;EACE,iBAAiB;EACjB,iBAAiB;EACjB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,4BAA4B;EAC5B,YAAY;CACb;AACD;EACE,sBAAsB;EACtB,sBAAsB;EACtB,aAAa;EACb,mBAAmB;EACnB,YAAY;CACb;AACD;EACE,oBAAoB;EACpB,cAAc;EACd,aAAa;EACb,wBAAwB;CACzB",file:"stackCardOverlayAnimation.module.less",sourcesContent:["/* stylelint-disable */\n:export {\n  black: #565E5F;\n  blue: #00A6ED;\n  green: #7DCC93;\n  lightGrey: #A4AAAF;\n  orange: #F17D00;\n  purple: #31355A;\n  red: #E41245;\n  transparentBlack: #565E5fA6;\n  transparentWhite: #FFFFFFBF;\n  white: #FFF;\n  yellow: #FCC900;\n}\n/* stylelint-enable */\n/* stylelint-disable */\n:export {\n  caretSize: 0.625rem;\n  footerListMargin: 3rem;\n  footerLogoSize: 5rem;\n  headerHeight: 3rem;\n  headerMarginTop: 2.5rem;\n  navWidth: 5rem;\n  stackCardSize: 7rem;\n}\n/* stylelint-enable */\n.line {\n  background: #FFF;\n  height: 0.125rem;\n  left: 50%;\n  position: absolute;\n  top: 0.5rem;\n  transform: translateX(-50%);\n  width: 4rem;\n}\n.overlayDiv {\n  background: #565E5FE6;\n  border-radius: 0.5rem;\n  height: 100%;\n  position: absolute;\n  width: 100%;\n}\n.typographyDiv {\n  align-items: center;\n  display: flex;\n  height: 100%;\n  justify-content: center;\n}\n"],sourceRoot:""}]),n.locals={black:"#565E5F",blue:"#00A6ED",green:"#7DCC93",lightGrey:"#A4AAAF",orange:"#F17D00",purple:"#31355A",red:"#E41245",transparentBlack:"#565E5fA6",transparentWhite:"#FFFFFFBF",white:"#FFF",yellow:"#FCC900",caretSize:"0.625rem",footerListMargin:"3rem",footerLogoSize:"5rem",headerHeight:"3rem",headerMarginTop:"2.5rem",navWidth:"5rem",stackCardSize:"7rem",line:"line___2DZw5",overlayDiv:"overlayDiv___1rZcm",typographyDiv:"typographyDiv___3GeAx"}},847:function(e,n,t){e.exports=t.p+"images/_/assets/icons/antDesign.png"},848:function(e,n,t){e.exports=t.p+"images/_/assets/icons/apollo.png"},849:function(e,n,t){e.exports=t.p+"images/_/assets/icons/babel.png"},850:function(e,n,t){e.exports=t.p+"images/_/assets/icons/circleCi.png"},851:function(e,n,t){e.exports=t.p+"images/_/assets/icons/cssModules.png"},852:function(e,n,t){e.exports=t.p+"images/_/assets/icons/docker.png"},853:function(e,n,t){e.exports=t.p+"images/_/assets/icons/enzyme.png"},854:function(e,n,t){e.exports=t.p+"images/_/assets/icons/eslint.png"},855:function(e,n,t){e.exports=t.p+"images/_/assets/icons/express.png"},856:function(e,n,t){e.exports=t.p+"images/_/assets/icons/framerMotion.png"},857:function(e,n,t){e.exports=t.p+"images/_/assets/icons/graphql.png"},858:function(e,n,t){e.exports=t.p+"images/_/assets/icons/heroku.png"},859:function(e,n,t){e.exports=t.p+"images/_/assets/icons/jest.png"},860:function(e,n,t){e.exports=t.p+"images/_/assets/icons/less.png"},861:function(e,n,t){e.exports=t.p+"images/_/assets/icons/lottie.png"},862:function(e,n,t){e.exports=t.p+"images/_/assets/icons/node.png"},863:function(e,n,t){e.exports=t.p+"images/_/assets/icons/nucleo.png"},864:function(e,n,t){e.exports=t.p+"images/_/assets/icons/passport.png"},865:function(e,n,t){e.exports=t.p+"images/_/assets/icons/postgresql.png"},866:function(e,n,t){e.exports=t.p+"images/_/assets/icons/prisma.png"},867:function(e,n,t){e.exports=t.p+"images/_/assets/icons/react.png"},868:function(e,n,t){e.exports=t.p+"images/_/assets/icons/storybook.png"},869:function(e,n,t){e.exports=t.p+"images/_/assets/icons/typescript.png"},870:function(e,n,t){e.exports=t.p+"images/_/assets/icons/webpack.png"},871:function(e,n,t){var r=t(872);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};t(21)(r,a);r.locals&&(e.exports=r.locals)},872:function(e,n,t){(n=e.exports=t(20)(!0)).push([e.i,"/* stylelint-disable */\n/* stylelint-enable */\n/* stylelint-disable */\n/* stylelint-enable */\n.stackCardAnchor___dmIng {\n  align-items: center;\n  background: #FFF;\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);\n  display: flex;\n  height: 7rem;\n  justify-content: center;\n  margin: 0 3rem 3rem 0;\n  overflow: hidden;\n  position: relative;\n  width: 7rem;\n}\n.fullSizeImg___wi-KZ {\n  border-radius: 0.5rem;\n  width: 100%;\n}\n.img___SKTRG {\n  width: 75%;\n}\n.mouseDiv___19WOJ {\n  border-radius: 0.5rem;\n  cursor: pointer;\n  height: 100%;\n  position: absolute;\n  width: 100%;\n}\n","",{version:3,sources:["/Users/jemery/dev/mybord-client/src/spa/shared/cards/stackCard/stackCard.module.less"],names:[],mappings:"AAAA,uBAAuB;AAcvB,sBAAsB;AACtB,uBAAuB;AAUvB,sBAAsB;AACtB;EACE,oBAAoB;EACpB,iBAAiB;EACjB,sBAAsB;EACtB,0MAA0M;EAC1M,cAAc;EACd,aAAa;EACb,wBAAwB;EACxB,sBAAsB;EACtB,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;CACb;AACD;EACE,sBAAsB;EACtB,YAAY;CACb;AACD;EACE,WAAW;CACZ;AACD;EACE,sBAAsB;EACtB,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,YAAY;CACb",file:"stackCard.module.less",sourcesContent:["/* stylelint-disable */\n:export {\n  black: #565E5F;\n  blue: #00A6ED;\n  green: #7DCC93;\n  lightGrey: #A4AAAF;\n  orange: #F17D00;\n  purple: #31355A;\n  red: #E41245;\n  transparentBlack: #565E5fA6;\n  transparentWhite: #FFFFFFBF;\n  white: #FFF;\n  yellow: #FCC900;\n}\n/* stylelint-enable */\n/* stylelint-disable */\n:export {\n  caretSize: 0.625rem;\n  footerListMargin: 3rem;\n  footerLogoSize: 5rem;\n  headerHeight: 3rem;\n  headerMarginTop: 2.5rem;\n  navWidth: 5rem;\n  stackCardSize: 7rem;\n}\n/* stylelint-enable */\n.stackCardAnchor {\n  align-items: center;\n  background: #FFF;\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);\n  display: flex;\n  height: 7rem;\n  justify-content: center;\n  margin: 0 3rem 3rem 0;\n  overflow: hidden;\n  position: relative;\n  width: 7rem;\n}\n.fullSizeImg {\n  border-radius: 0.5rem;\n  width: 100%;\n}\n.img {\n  width: 75%;\n}\n.mouseDiv {\n  border-radius: 0.5rem;\n  cursor: pointer;\n  height: 100%;\n  position: absolute;\n  width: 100%;\n}\n"],sourceRoot:""}]),n.locals={black:"#565E5F",blue:"#00A6ED",green:"#7DCC93",lightGrey:"#A4AAAF",orange:"#F17D00",purple:"#31355A",red:"#E41245",transparentBlack:"#565E5fA6",transparentWhite:"#FFFFFFBF",white:"#FFF",yellow:"#FCC900",caretSize:"0.625rem",footerListMargin:"3rem",footerLogoSize:"5rem",headerHeight:"3rem",headerMarginTop:"2.5rem",navWidth:"5rem",stackCardSize:"7rem",stackCardAnchor:"stackCardAnchor___dmIng",fullSizeImg:"fullSizeImg___wi-KZ",img:"img___SKTRG",mouseDiv:"mouseDiv___19WOJ"}},873:function(e,n,t){var r=t(874);"string"==typeof r&&(r=[[e.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};t(21)(r,a);r.locals&&(e.exports=r.locals)},874:function(e,n,t){(n=e.exports=t(20)(!0)).push([e.i,"/* stylelint-disable */\n/* stylelint-enable */\n.stackCardsContainer___1C9Mv {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 1rem 0 1rem 2rem;\n}\n.stackSection___3zXHS {\n  margin-left: 7rem;\n  margin-top: 5rem;\n  padding-right: calc(1rem + 1rem);\n}\n.stackTitleDiv___3N--D {\n  margin-bottom: 1rem;\n}\n.typographyDiv___15nye {\n  margin-bottom: 3rem;\n}\n","",{version:3,sources:["/Users/jemery/dev/mybord-client/src/spa/shared/about/aboutForDevs/aboutForDevsStack/aboutForDevsStack.module.less"],names:[],mappings:"AAAA,uBAAuB;AAUvB,sBAAsB;AACtB;EACE,cAAc;EACd,gBAAgB;EAChB,yBAAyB;CAC1B;AACD;EACE,kBAAkB;EAClB,iBAAiB;EACjB,iCAAiC;CAClC;AACD;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;CACrB",file:"aboutForDevsStack.module.less",sourcesContent:["/* stylelint-disable */\n:export {\n  caretSize: 0.625rem;\n  footerListMargin: 3rem;\n  footerLogoSize: 5rem;\n  headerHeight: 3rem;\n  headerMarginTop: 2.5rem;\n  navWidth: 5rem;\n  stackCardSize: 7rem;\n}\n/* stylelint-enable */\n.stackCardsContainer {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 1rem 0 1rem 2rem;\n}\n.stackSection {\n  margin-left: 7rem;\n  margin-top: 5rem;\n  padding-right: calc(1rem + 1rem);\n}\n.stackTitleDiv {\n  margin-bottom: 1rem;\n}\n.typographyDiv {\n  margin-bottom: 3rem;\n}\n"],sourceRoot:""}]),n.locals={caretSize:"0.625rem",footerListMargin:"3rem",footerLogoSize:"5rem",headerHeight:"3rem",headerMarginTop:"2.5rem",navWidth:"5rem",stackCardSize:"7rem",stackCardsContainer:"stackCardsContainer___1C9Mv",stackSection:"stackSection___3zXHS",stackTitleDiv:"stackTitleDiv___3N--D",typographyDiv:"typographyDiv___15nye"}}}]);
//# sourceMappingURL=5.bundle.js.map