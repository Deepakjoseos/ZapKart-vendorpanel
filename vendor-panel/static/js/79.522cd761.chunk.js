(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[79],{1135:function(e,t,c){"use strict";var s=c(0),i=c(36),l=c(662),r=c(140),n=c(706),a=c(777),j=c(563),o=c(583),d=c(1126),h=c(642),x=c(637),m=c(40),b=c(47),u=c(1158),g=c(2),O=function(e){var t=Object(b.g)(),c=e.otherSignIn,i=e.showForgetPassword,m=e.hideAuthMessage,O=e.onForgetPasswordClick,f=e.showLoading,p=e.signInWithGoogle,v=(e.signInWithFacebook,e.extra),w=e.signIn,F=e.token,C=e.loading,M=e.redirect,y=e.showMessage,z=e.message,N=e.allowRedirect;Object(s.useEffect)((function(){null!==F&&N&&t.push(M),y&&setTimeout((function(){m()}),3e3)}));var L=Object(g.jsxs)("div",{children:[Object(g.jsx)(l.a,{children:Object(g.jsx)("span",{className:"text-muted font-size-base font-weight-normal",children:"or connect with"})}),Object(g.jsx)("div",{className:"d-flex justify-content-center",children:Object(g.jsx)(r.a,{onClick:function(){return f(),void p()},className:"mr-2",disabled:C,icon:Object(g.jsx)(x.a,{svg:h.a}),children:"Google"})})]});return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(u.a.div,{initial:{opacity:0,marginBottom:0},animate:{opacity:y?1:0,marginBottom:y?20:0},children:Object(g.jsx)(n.a,{type:"error",showIcon:!0,message:z})}),Object(g.jsxs)(a.a,{layout:"vertical",name:"login-form",initialValues:{email:"",password:""},onFinish:function(e){f(),w(e)},children:[Object(g.jsx)(a.a.Item,{name:"email",label:"Email",rules:[{required:!0,message:"Please input your email"},{type:"email",message:"Please enter a validate email!"}],children:Object(g.jsx)(j.a,{prefix:Object(g.jsx)(o.a,{className:"text-primary"})})}),Object(g.jsx)(a.a.Item,{name:"password",label:Object(g.jsxs)("div",{className:"".concat(i?"d-flex justify-content-between w-100 align-items-center":""),children:[Object(g.jsx)("span",{children:"Password"}),i&&Object(g.jsx)("span",{onClick:function(){return O},className:"cursor-pointer font-size-sm font-weight-normal text-muted",children:"Forget Password?"})]}),rules:[{required:!0,message:"Please input your password"}],children:Object(g.jsx)(j.a.Password,{prefix:Object(g.jsx)(d.a,{className:"text-primary"})})}),Object(g.jsx)(a.a.Item,{children:Object(g.jsx)(r.a,{type:"primary",htmlType:"submit",block:!0,loading:C,children:"Sign In"})}),c?L:null,v]})]})};O.defaultProps={otherSignIn:!0,showForgetPassword:!1};var f={signIn:m.e,showAuthMessage:m.c,showLoading:m.d,hideAuthMessage:m.b,signInWithGoogle:m.h,signInWithFacebook:m.f};t.a=Object(i.b)((function(e){var t=e.auth;return{loading:t.loading,message:t.message,showMessage:t.showMessage,token:t.token,redirect:t.redirect}}),f)(O)},3478:function(e,t,c){"use strict";c.r(t);var s=c(16),i=(c(0),c(1135)),l=c(617),r=c(618),n=c(36),a=c(2),j={backgroundImage:"url(".concat("/img/others/img-17.jpg",")"),backgroundRepeat:"no-repeat",backgroundSize:"cover"};t.default=function(e){var t=Object(n.d)((function(e){return e.theme.currentTheme}));return Object(a.jsx)("div",{className:"h-100 ".concat("light"===t?"bg-white":""),children:Object(a.jsxs)(l.a,{justify:"center",className:"align-items-stretch h-100",children:[Object(a.jsx)(r.a,{xs:20,sm:20,md:24,lg:16,children:Object(a.jsx)("div",{className:"container d-flex flex-column justify-content-center h-100",children:Object(a.jsx)(l.a,{justify:"center",children:Object(a.jsxs)(r.a,{xs:24,sm:24,md:20,lg:12,xl:8,children:[Object(a.jsx)("h1",{children:"Sign In"}),Object(a.jsx)("div",{className:"mt-4",children:Object(a.jsx)(i.a,Object(s.a)({},e))})]})})})}),Object(a.jsx)(r.a,{xs:0,sm:0,md:0,lg:8,children:Object(a.jsxs)("div",{className:"d-flex flex-column justify-content-between h-100 px-4",style:j,children:[Object(a.jsx)("div",{className:"text-right",children:Object(a.jsx)("img",{src:"/img/logo-white.png",alt:"logo"})}),Object(a.jsx)(l.a,{justify:"center",children:Object(a.jsxs)(r.a,{xs:0,sm:0,md:0,lg:20,children:[Object(a.jsx)("img",{className:"img-fluid mb-5",src:"/img/others/img-18.png",alt:""}),Object(a.jsx)("h1",{className:"text-white",children:"Welcome to emilus"}),Object(a.jsx)("p",{className:"text-white",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque."})]})}),Object(a.jsx)("div",{className:"d-flex justify-content-end pb-4",children:Object(a.jsxs)("div",{children:[Object(a.jsx)("a",{className:"text-white",href:"/#",onClick:function(e){return e.preventDefault()},children:"Term & Conditions"}),Object(a.jsx)("span",{className:"mx-2 text-white",children:" | "}),Object(a.jsx)("a",{className:"text-white",href:"/#",onClick:function(e){return e.preventDefault()},children:"Privacy & Policy"})]})})]})})]})})}},617:function(e,t,c){"use strict";var s=c(312);t.a=s.a},618:function(e,t,c){"use strict";var s=c(305);t.a=s.a},637:function(e,t,c){"use strict";var s=c(0),i=c.n(s),l=c(725),r=c(2),n=i.a.forwardRef((function(e,t){return Object(r.jsx)(l.a,{component:e.svg,className:e.className})}));t.a=n},642:function(e,t,c){"use strict";c.d(t,"c",(function(){return i})),c.d(t,"a",(function(){return l})),c.d(t,"b",(function(){return r}));c(0);var s=c(2),i=function(){return Object(s.jsx)("svg",{viewBox:"0 0 1024 1024",width:"1em",height:"1em",fill:"currentColor",children:Object(s.jsx)("path",{d:"M537.016,909.264c-7.034,0-14.006-2.372-19.671-6.97L18.508,496.986C11.232,491.055,7,482.161,7,472.781\r c0-9.374,4.232-18.267,11.508-24.204L517.345,43.272c9.318-7.551,22.258-9.104,33.064-3.959\r c10.871,5.175,17.785,16.135,17.785,28.162v219.277c243.388,16.107,436.483,219.246,436.483,466.625v62.353\r c0,12.18-7.097,23.235-18.147,28.314c-11.054,5.119-24.054,3.292-33.311-4.626l-52.55-45.027\r c-93.318-79.986-210.359-126.841-332.476-133.66v217.36c0,12.022-6.914,22.986-17.785,28.158\r C546.146,908.262,541.58,909.268,537.016,909.264L537.016,909.264z M125.715,472.781L506.65,782.309V614.776\r c0-15.697,12.702-28.401,28.399-28.401c134.946,0,265.707,48.367,368.18,136.193l0.972,0.834\r c-2.664-201.286-167.231-364.213-369.148-364.213c-15.699,0-28.4-12.704-28.4-28.399V163.258\r C506.65,163.258,125.715,472.781,125.715,472.781L125.715,472.781z"})})},l=function(){return Object(s.jsx)("svg",{viewBox:"0 0 1024 1024",width:"1em",height:"1em",fill:"currentColor",children:Object(s.jsxs)("g",{children:[Object(s.jsx)("path",{fill:"#59C36A",d:"M827.301,875.968c-84.521,71.388-194.169,116.693-313.528,116.693c-177.609,0-333.52-97.848-418.041-240.62\r l31.646-145.858l140.255-26.039c32.553,105.078,130.779,182.178,246.141,182.178c55.964,0,107.937-17.703,150.767-49.112\r l134.777,20.558L827.301,875.968z"}),Object(s.jsx)("path",{fill:"#00A66C",d:"M827.301,875.968l-27.984-142.201l-134.777-20.558c-42.83,31.409-94.803,49.112-150.767,49.112v230.34\r C633.132,992.661,742.779,947.355,827.301,875.968z"}),Object(s.jsx)("g",{id:"Connected_Home_1_",children:Object(s.jsx)("g",{children:Object(s.jsx)("g",{children:Object(s.jsx)("g",{children:Object(s.jsx)("path",{fill:"#FFDA2D",d:"M256.781,505.331c0,26.267,3.998,51.396,10.851,74.813l-171.9,171.897\r c-42.83-71.957-69.29-156.48-69.29-246.71c0-90.233,26.46-174.754,69.29-246.711l137.965,23.743l33.936,148.154\r C260.779,453.932,256.781,479.06,256.781,505.331L256.781,505.331z"})})})})}),Object(s.jsx)("path",{fill:"#4086F4",d:"M1001.103,505.331c0,148.48-68.719,281.547-173.802,370.637L664.539,713.209\r c33.121-23.988,61.107-55.971,79.384-93.66h-230.15c-15.993,0-28.556-12.567-28.556-28.554V419.666\r c0-15.99,12.563-28.554,28.556-28.554h450.78c13.707,0,25.698,9.708,27.983,23.412\r C998.247,444.225,1001.103,475.063,1001.103,505.331L1001.103,505.331z"}),Object(s.jsx)("path",{fill:"#4175DF",d:"M743.924,619.549c-18.275,37.689-46.264,69.672-79.382,93.66l162.759,162.759\r c105.083-89.09,173.802-222.153,173.802-370.637c0-30.269-2.855-61.106-8.567-90.807c-2.284-13.704-14.278-23.412-27.984-23.412\r H513.772v228.437H743.924z"}),Object(s.jsx)("path",{fill:"#FF641A",d:"M835.297,154.107c0.571,7.996-2.855,15.422-7.996,21.131L705.086,296.881\r c-9.704,10.278-25.694,11.421-37.118,2.855c-45.119-33.693-98.231-51.396-154.195-51.396\r c-115.361,0-213.588,77.095-246.141,182.178L95.731,258.62C180.253,115.848,336.163,18,513.772,18\r c113.647,0,224.439,41.88,311.244,114.978C831.298,138.119,834.723,146.112,835.297,154.107L835.297,154.107z"}),Object(s.jsx)("path",{fill:"#F03800",d:"M667.966,299.736c11.422,8.567,27.411,7.423,37.119-2.855l122.214-121.643\r c5.143-5.709,8.569-13.133,7.996-21.131c-0.575-7.997-3.999-15.988-10.279-21.13C738.212,59.88,627.42,18,513.772,18v230.34\r C569.736,248.34,622.849,266.043,667.966,299.736z"})]})})},r=function(){return Object(s.jsx)("svg",{viewBox:"0 0 1024 1024",width:"1em",height:"1em",fill:"currentColor",children:Object(s.jsxs)("g",{children:[Object(s.jsx)("g",{children:Object(s.jsx)("path",{fill:"#E5E1E5",d:"M163.033,1011.756L2.746,191.353c-4.863-24.879,11.365-48.991,36.245-53.852l124.042-24.234l194.642-42.82\r l279.663,941.308H163.033V1011.756z"})}),Object(s.jsx)("path",{fill:"#99E6FC",d:"M163.033,680.979L68.355,196.393l94.678-18.501l143.802-23.615l62.994,584.599L163.033,680.979z"}),Object(s.jsxs)("g",{id:"XMLID_159_",children:[Object(s.jsx)("g",{children:Object(s.jsx)("path",{fill:"#F9F7F8",d:"M1014.357,64.9v957.461c0,25.351-20.549,45.899-45.899,45.899H208.93\r c-25.351,0-45.901-20.549-45.901-45.899V64.9c0-25.35,20.551-45.9,45.901-45.9h759.528C993.809,19,1014.357,39.551,1014.357,64.9\r z"})}),Object(s.jsx)("path",{fill:"#EFEDEF",d:"M574.473,971.206c-90.848,0-164.495-73.646-164.495-164.493V19H208.93\r c-25.351,0-45.901,20.551-45.901,45.9v957.461c0,25.351,20.551,45.899,45.901,45.899h759.528\r c25.351,0,45.899-20.549,45.899-45.899v-51.155H574.473z"}),Object(s.jsx)("path",{fill:"#FEC165",d:"M950.933,737.554V234.861c0-7.122-5.774-12.896-12.897-12.896H239.354c-7.12,0-12.896,5.774-12.896,12.896\r v502.692H950.933z"}),Object(s.jsx)("path",{fill:"#FDB441",d:"M409.978,221.965H239.354c-7.12,0-12.896,5.774-12.896,12.896v502.692h183.52V221.965z"}),Object(s.jsx)("circle",{fill:"#FEE903",cx:"588.693",cy:"600.309",r:"246.948"}),Object(s.jsx)("path",{fill:"#F4D902",d:"M409.978,770.729V429.889c-42.274,44.316-68.229,104.339-68.229,170.419\r C341.748,666.391,367.703,726.41,409.978,770.729z"}),Object(s.jsxs)("g",{children:[Object(s.jsx)("path",{fill:"#99E6FC",d:"M902.813,668.316c-57.591-25.393-122.604-28.267-182.203-8.034l-51.163,17.336\r c-52.369,17.759-109.135,17.759-161.505,0l-51.163-17.336c-59.602-20.232-124.611-17.358-182.182,8.034l-48.142,21.226v105.269\r l80.12,33.354h599.658l44.699-33.354V689.542L902.813,668.316z"}),Object(s.jsx)("path",{fill:"#62DBFB",d:"M409.978,828.165V649.264c-45.72-6.239-92.605,0.184-135.379,19.053l-48.141,21.226v105.269\r l80.119,33.354H409.978z"}),Object(s.jsx)("path",{fill:"#62DBFB",d:"M950.933,794.811v61.709c0,5.452-4.424,9.878-9.879,9.878H236.332c-5.453,0-9.877-4.426-9.877-9.878\r v-61.709l48.142-21.229c57.57-25.39,122.58-28.268,182.182-8.055l51.163,17.358c52.37,17.759,109.136,17.759,161.505,0\r l51.163-17.358c59.6-20.213,124.612-17.335,182.203,8.055L950.933,794.811z"}),Object(s.jsx)("path",{fill:"#01D0FB",d:"M236.332,866.397h184.86c-7.214-18.51-11.215-38.625-11.215-59.685v-52.188\r c-45.72-6.231-92.605,0.192-135.379,19.061l-48.141,21.226v61.71c-0.003,5.451,4.421,9.875,9.874,9.875V866.397z"})]})]})]})})}}}]);
//# sourceMappingURL=79.522cd761.chunk.js.map