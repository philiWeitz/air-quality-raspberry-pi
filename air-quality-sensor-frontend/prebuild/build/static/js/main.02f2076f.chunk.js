(this["webpackJsonpair-quality-sensor-frontend"]=this["webpackJsonpair-quality-sensor-frontend"]||[]).push([[0],{199:function(e,t,n){},200:function(e,t,n){},357:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),s=n(52),c=n.n(s),i=(n(199),n(10)),u=n(359),j=n(360),l=n(364),o=n(186),h=n(187),m=n(81),d=n(78),b=n(189),x=(n(200),n(17)),O=n.n(x),p=n(33),f=n(170),y=n.n(f),g=n(171),v=y.a.create({baseURL:"http://".concat(window.location.hostname,":").concat(g.a.BACKEND_PORT),timeout:2e4}),w=function(){var e=Object(p.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.get("/measurements/air/latest/day");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=Object(p.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.get("/measurements/air/latest/month");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(p.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.get("/measurements/air/latest/year");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=Object(p.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.get("/measurements/temperature/latest/day");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(p.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.get("/measurements/temperature/latest/month");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),K=function(){var e=Object(p.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.get("/measurements/temperature/latest/year");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),M=n(190),D=n.p+"static/media/chocobo.840447c8.gif",I=n(119),T=n(3),E=function(){var e=Object(r.useState)(!1),t=Object(i.a)(e,2),n=t[0],a=t[1],s=Object(I.useSpring)({position:"absolute",zIndex:2,reset:n,transform:"translateX(-500px)",config:{duration:1e4},from:{transform:"translateX(2000px)"},onStart:function(){a(!1)},onRest:function(){setTimeout((function(){return a(!0)}),1e4*Math.random()+2e4)}});return Object(T.jsx)(I.animated.img,{src:D,alt:"",style:Object(M.a)({},s)})},P=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1],s=Object(r.useState)([]),c=Object(i.a)(s,2),x=c[0],O=c[1],p=Object(r.useState)([]),f=Object(i.a)(p,2),y=f[0],g=f[1],v=Object(r.useState)([]),M=Object(i.a)(v,2),D=M[0],I=M[1],P=Object(r.useState)([]),R=Object(i.a)(P,2),q=R[0],B=R[1],J=Object(r.useState)([]),X=Object(i.a)(J,2),z=X[0],C=X[1],H=Object(r.useState)(!1),L=Object(i.a)(H,2),U=L[0],_=L[1];Object(r.useEffect)((function(){w().then((function(e){a(e.measurements)})),N().then((function(e){O(e.measurements)})),k().then((function(e){g(e.measurements)})),A().then((function(e){I(e.measurements)})),S().then((function(e){B(e.measurements)})),K().then((function(e){C(e.measurements)})),setTimeout((function(){return _(!0)}),1e4);var e=setInterval((function(){w().then((function(e){a(e.measurements)})),A().then((function(e){I(e.measurements)}))}),6e4);return function(){clearInterval(e)}}),[]);var F=function(e){return Object(T.jsx)(u.a,{width:"100%",height:"100%",children:Object(T.jsxs)(j.a,{width:500,height:300,data:e,children:[Object(T.jsx)(l.a,{strokeDasharray:"3 3"}),Object(T.jsx)(o.a,{dataKey:"timestamp",tickMargin:10}),Object(T.jsx)(h.a,{}),Object(T.jsx)(m.a,{}),Object(T.jsx)(d.a,{verticalAlign:"top",height:36}),Object(T.jsx)(b.a,{type:"monotone",dataKey:"pm2p5",stroke:"#8884d8",name:"PM 2.5",dot:!1}),Object(T.jsx)(b.a,{type:"monotone",dataKey:"pm10",stroke:"#82ca9d",name:"PM 10",dot:!1})]})})},G=function(e){return Object(T.jsx)(u.a,{width:"100%",height:"100%",children:Object(T.jsxs)(j.a,{width:500,height:300,data:e,children:[Object(T.jsx)(l.a,{strokeDasharray:"3 3"}),Object(T.jsx)(o.a,{dataKey:"timestamp",tickMargin:10}),Object(T.jsx)(h.a,{domain:["auto","auto"]}),Object(T.jsx)(m.a,{}),Object(T.jsx)(d.a,{verticalAlign:"top",height:36}),Object(T.jsx)(b.a,{type:"monotone",dataKey:"temperature",stroke:"#8884d8",name:"Temperature",dot:!1})]})})},Q=function(e){return Object(T.jsx)(u.a,{width:"100%",height:"100%",children:Object(T.jsxs)(j.a,{width:500,height:300,data:e,children:[Object(T.jsx)(l.a,{strokeDasharray:"3 3"}),Object(T.jsx)(o.a,{dataKey:"timestamp",tickMargin:10}),Object(T.jsx)(h.a,{domain:["auto","auto"]}),Object(T.jsx)(m.a,{}),Object(T.jsx)(d.a,{verticalAlign:"top",height:36}),Object(T.jsx)(b.a,{type:"monotone",dataKey:"humidity",stroke:"#8884d8",name:"Humidity",dot:!1})]})})};return Object(T.jsxs)("div",{children:[U&&Object(T.jsx)(E,{}),Object(T.jsxs)("div",{className:"container is-max-widescreen mt-6",children:[Object(T.jsxs)("div",{className:"box mb-6",children:[n.length>1&&Object(T.jsxs)("div",{className:"mb-6 mr-3",children:[Object(T.jsx)("h2",{className:"title",style:{textAlign:"center"},children:"24 hour air pollution trend"}),Object(T.jsx)("div",{style:{height:"20rem"},children:F(n)})]}),x.length>1&&Object(T.jsxs)("div",{className:"mb-6 mr-6",children:[Object(T.jsx)("h2",{className:"title",style:{textAlign:"center"},children:"30 days air pollution trend"}),Object(T.jsx)("div",{style:{height:"20rem"},children:F(x)})]}),y.length>1&&Object(T.jsxs)("div",{className:"mb-6 mr-6",children:[Object(T.jsx)("h2",{className:"title",style:{textAlign:"center"},children:"12 month air pollution trend"}),Object(T.jsx)("div",{style:{height:"20rem"},children:F(y)})]})]}),Object(T.jsxs)("div",{className:"box mb-6",children:[D.length>1&&Object(T.jsxs)("div",{className:"mb-6 mr-3",children:[Object(T.jsx)("h2",{className:"title",style:{textAlign:"center"},children:"24 hour temperature trend"}),Object(T.jsx)("div",{style:{height:"20rem"},children:G(D)})]}),q.length>1&&Object(T.jsxs)("div",{className:"mb-6 mr-3",children:[Object(T.jsx)("h2",{className:"title",style:{textAlign:"center"},children:"30 days temperature trend"}),Object(T.jsx)("div",{style:{height:"20rem"},children:G(q)})]}),z.length>1&&Object(T.jsxs)("div",{className:"mb-6 mr-3",children:[Object(T.jsx)("h2",{className:"title",style:{textAlign:"center"},children:"12 month temperature trend"}),Object(T.jsx)("div",{style:{height:"20rem"},children:G(z)})]})]}),Object(T.jsxs)("div",{className:"box mb-6",children:[D.length>1&&Object(T.jsxs)("div",{className:"mb-6 mr-3",children:[Object(T.jsx)("h2",{className:"title",style:{textAlign:"center"},children:"24 hour humidity trend"}),Object(T.jsx)("div",{style:{height:"20rem"},children:Q(D)})]}),q.length>1&&Object(T.jsxs)("div",{className:"mb-6 mr-3",children:[Object(T.jsx)("h2",{className:"title",style:{textAlign:"center"},children:"30 days humidity trend"}),Object(T.jsx)("div",{style:{height:"20rem"},children:Q(q)})]}),z.length>1&&Object(T.jsxs)("div",{className:"mb-6 mr-3",children:[Object(T.jsx)("h2",{className:"title",style:{textAlign:"center"},children:"12 month humidity trend"}),Object(T.jsx)("div",{style:{height:"20rem"},children:Q(z)})]})]})]})]})};n(356);c.a.render(Object(T.jsx)(a.a.StrictMode,{children:Object(T.jsx)(P,{})}),document.getElementById("root"))}},[[357,1,2]]]);
//# sourceMappingURL=main.02f2076f.chunk.js.map