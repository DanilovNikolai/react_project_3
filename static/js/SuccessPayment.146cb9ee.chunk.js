"use strict";(self.webpackChunkreact_project_3=self.webpackChunkreact_project_3||[]).push([[225],{1100:function(e,r,t){t.r(r),t.d(r,{default:function(){return v}});var n=t(2791),s=t(9439),a=t(7689),c=t(1087),o="SuccessPaymentBlock_root__DUXxU";var i=t.p+"static/media/cart_happy_face_emoji_emotion_smile_icon.26154ae7e18e97d5885985982ac8ea1a.svg";function l(e,r){return Math.floor(Math.random()*(r-e)+e)}var u=function(e,r){return"abcdefghijklmnopqrstuvwxyz"[Math.floor(26*Math.random())]+l(e,r).toString()+l(e,r).toString()+l(e,r).toString()},d=t(1210),h=t(9434),f=t(7891),m=t(9085),g=t(4371),j=t(184),p=function(){var e=u(1,100),r=(0,h.I0)(),t=(0,h.v9)(m.K).totalPrice,l=(0,a.TH)().pathname,p=(0,g.a)().isAuth,v=(0,a.s0)(),x=(0,n.useState)(!1),_=(0,s.Z)(x,2),S=_[0],k=_[1],y=(0,n.useRef)(0);return(0,n.useEffect)((function(){if(console.log(S),console.log("render"),"/success_payment"===l)if(S)v("/");else{if(r((0,f.H5)()),p){console.log("\u0440\u0435\u043d\u0434\u0435\u0440 \u0431\u043e\u043d\u0443\u0441\u043e\u0432"),console.log(y);var e=JSON.parse(localStorage.getItem("currentUser"));y.current=Math.round(t/100),e.coins+=Math.round(t/100),e.cart=[],localStorage.setItem("currentUser",JSON.stringify(e));var n=e.email,s=JSON.parse(localStorage.getItem("users")).map((function(e){return e.email===n&&(e.cart=[]),e}));localStorage.setItem("users",JSON.stringify(s))}else localStorage.removeItem("cart");k(!0)}}),[]),(0,j.jsxs)("h2",{className:o,children:[(0,j.jsx)("div",{children:(0,j.jsx)("img",{src:i,alt:"smile_face"})}),(0,j.jsx)("div",{children:"\u0423\u0440\u0430! \u041e\u043f\u043b\u0430\u0442\u0430 \u043f\u0440\u043e\u0448\u043b\u0430 \u0443\u0441\u043f\u0435\u0448\u043d\u043e!"}),(0,j.jsxs)("div",{children:["\u041d\u043e\u043c\u0435\u0440 \u0432\u0430\u0448\u0435\u0433\u043e \u0437\u0430\u043a\u0430\u0437\u0430 ",(0,j.jsxs)("span",{children:["#",e]})]}),(0,j.jsxs)("div",{children:["\u0412\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0431\u043e\u043d\u0443\u0441\u043e\u0432 \u0437\u0430 \u0437\u0430\u043a\u0430\u0437: ",(0,j.jsx)("span",{children:y.current})]}),(0,j.jsx)("div",{children:"\u0412\u0430\u0448 \u0437\u0430\u043a\u0430\u0437 \u0443\u0436\u0435 \u043d\u0430\u0447\u0438\u043d\u0430\u044e\u0442 \u0433\u043e\u0442\u043e\u0432\u0438\u0442\u044c!"}),(0,j.jsx)("div",{children:(0,j.jsx)("span",{children:"\u041f\u0440\u0438\u044f\u0442\u043d\u043e\u0433\u043e \u0430\u043f\u043f\u0435\u0442\u0438\u0442\u0430!"})}),(0,j.jsx)(c.rU,{to:"/",children:(0,j.jsx)(d.Z,{})})]})},v=function(){return(0,j.jsx)(p,{})}}}]);
//# sourceMappingURL=SuccessPayment.146cb9ee.chunk.js.map