(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[4],{12:function(e,n,t){"use strict";t.d(n,"g",(function(){return a})),t.d(n,"f",(function(){return r})),t.d(n,"r",(function(){return o})),t.d(n,"b",(function(){return i})),t.d(n,"a",(function(){return d})),t.d(n,"i",(function(){return s})),t.d(n,"d",(function(){return c})),t.d(n,"c",(function(){return l})),t.d(n,"j",(function(){return u})),t.d(n,"k",(function(){return h})),t.d(n,"m",(function(){return p})),t.d(n,"l",(function(){return _})),t.d(n,"n",(function(){return f})),t.d(n,"o",(function(){return m})),t.d(n,"q",(function(){return A})),t.d(n,"p",(function(){return v})),t.d(n,"h",(function(){return I})),t.d(n,"e",(function(){return g}));const a="PASIEN_GET_DATA_SUCCESS",r="PASIEN_DETAIL",o="UPDATE_PAGE",i="ANTRIAN_GET_DATA_SUCCESS",d="ANTRIAN_DETAIL",s="RINCIAN_DETAIL",c="ANTRIAN_MODAL_SHOW",l="ANTRIAN_MODAL_HIDDEN",u="TARIF_DETAIL",h="TARIF_GET_DATA_SUCCESS",p="TARIF_MODAL_SHOW",_="TARIF_MODAL_HIDDEN",f="TEKNISI_DETAIL",m="TEKNISI_GET_DATA_SUCCESS",A="TEKNISI_MODAL_SHOW",v="TEKNISI_MODAL_HIDDEN",I="PELAYANAN_GET_DATA_SUCCESS",g="BOOKING_GET_DATA_SUCCESS"},350:function(e,n,t){},363:function(e,n,t){},364:function(e,n,t){"use strict";t.r(n);t(130),t(139),t(140),t(142),t(71),t(127),t(148),t(149),t(150),t(153),t(154),t(155),t(159),t(160),t(161),t(162),t(164),t(165),t(166),t(173),t(174),t(98),t(178),t(128),t(182),t(183),t(184),t(185),t(189),t(190),t(191),t(192),t(193),t(194),t(195),t(196),t(197),t(198),t(199),t(200),t(235),t(241),t(242),t(243),t(249),t(250),t(252),t(253),t(254),t(255),t(256),t(257),t(258),t(259),t(261),t(262),t(263),t(264),t(265),t(266),t(267),t(268),t(269),t(270),t(271),t(272),t(273),t(276),t(277),t(278),t(279),t(280),t(281),t(282),t(284),t(285),t(286),t(288),t(289),t(291),t(293),t(294),t(295),t(296),t(297),t(299),t(300),t(301),t(302),t(303),t(304),t(305),t(306),t(307),t(308),t(309),t(310),t(311),t(312),t(313),t(314),t(315),t(316),t(317),t(318),t(319),t(320),t(321),t(322),t(323),t(324),t(326),t(328),t(329),t(330),t(331),t(332),t(333),t(334),t(335),t(336),t(337),t(129),t(208),t(209),t(210),t(212),t(121),t(345);var a=t(1),r=t.n(a),o=t(72),i=t.n(o),d=t(125),s=t(18),c=(t(350),t(24));const l=Object(c.jsx)("div",{className:"pt-3 text-center",children:Object(c.jsx)("div",{className:"sk-spinner sk-spinner-pulse"})}),u=r.a.lazy((()=>Promise.all([t.e(1),t.e(7),t.e(12)]).then(t.bind(null,593)))),h=r.a.lazy((()=>Promise.all([t.e(1),t.e(14)]).then(t.bind(null,598))));class p extends a.Component{render(){return Object(c.jsx)(d.a,{children:Object(c.jsx)(r.a.Suspense,{fallback:l,children:Object(c.jsxs)(s.Switch,{children:[Object(c.jsx)(s.Route,{exact:!0,path:"/login",name:"Login Page",render:e=>Object(c.jsx)(h,{...e})}),Object(c.jsx)(s.Route,{path:"/",name:"Home",render:e=>Object(c.jsx)(u,{...e})})]})})})}}var _=p;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var f=t(124),m=t(96),A=t(12);const v={data:[],modal:{show:!1,antrian:{id_pasien:"",id_admin:"",nama:"",tanggal_pelaksanaan:""},rincian:{id_status:"",id_pelayanan:"",id_pasien:"",id_admin:"",nama:"",tanggal_pelaksanaan:""}}};var I=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case A.b:return{...e,data:n.payload};case A.a:return{...e,modal:{...e.modal,antrian:n.payload}};case A.i:return{...e,modal:{...e.modal,rincian:n.payload}};case A.d:return{...e,modal:{...e.modal,show:!0}};case A.c:return{...e,modal:{...e.modal,show:!1}};default:return e}};const g={data:[]};var S=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,n=arguments.length>1?arguments[1]:void 0;return n.type===A.e?{...e,data:n.payload}:e};const T={update:!1};var E=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case A.r:return{...e,update:!0};case"STOP_UPDATE":return{...e,update:!1};default:return e}};const b={sidebarShow:!0};var j=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,{type:n,...t}=arguments.length>1?arguments[1]:void 0;return"set"===n?{...e,...t}:e};const y={sidebarUnfoldable:!1};var O=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,{type:n,...t}=arguments.length>1?arguments[1]:void 0;return"set"===n?{...e,...t}:e};const w={data:[],detail:{id_pasien:"",alamat:"",nama:"",jenis_kelamin:"",no_telepon:"",nomor_pasien:"",pendaftaran:[]}};var D=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case A.g:return{...e,data:n.payload};case A.f:return{...e,detail:n.payload};default:return e}};const N={data:[]};var k=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,n=arguments.length>1?arguments[1]:void 0;return n.type===A.h?{...e,data:n.payload}:e};const x={data:[],detail:{id_teknisi:"",nama:""},modal:{show:!1,isInsert:!1}};var C=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case A.o:return{...e,data:n.payload};case A.n:return{...e,detail:n.payload};case A.q:return{...e,modal:{show:!0,isInsert:n.payload}};case A.p:return{...e,modal:{show:!1,isInsert:!1}};default:return e}};const L={data:[],detail:{id_tarif:"",tarif_gigi:""},modal:{show:!1,isInsert:!1}};var R=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case A.k:return{...e,data:n.payload};case A.j:return{...e,detail:n.payload};case A.m:return{...e,modal:{show:!0,isInsert:n.payload}};case A.l:return{...e,modal:{show:!1,isInsert:!1}};default:return e}},P=t(215);let U=Object(m.b)({antrian:I,booking:S,pelayanan:k,update:E,sidebarShow:j,sidebarUnfoldable:O,pasien:D,teknisi:C,tarif:R});const G=Object(m.c)(U,Object(m.a)(P.a));t(360),t(361),t(362),t(363);i.a.render(Object(c.jsx)(f.a,{store:G,children:Object(c.jsx)(_,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((e=>{e.unregister()}))}},[[364,5,6]]]);
//# sourceMappingURL=main.e350f34a.chunk.js.map