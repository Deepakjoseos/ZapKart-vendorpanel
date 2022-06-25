(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[23,38],{1373:function(e,t,a){"use strict";a.r(t);a(0);var c=a(260),n=a(647),o=a(3486),r=a(675),l=a(626),s=a(2),i=function(){return Object(s.jsx)(c.a,{color:"#3e82f7",colorChange:function(e){console.log("Selected color: ",e)}})};t.default=function(){return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"AvatarStatus"}),Object(s.jsxs)("div",{className:"mt-4",children:[Object(s.jsx)(n.default,{name:"Location",desc:"src/components/shared-components/ColorPicker.js"}),Object(s.jsx)(n.default,{name:"Description",desc:"ColorPicker allow you select & get the color info from color palette."})]}),Object(s.jsxs)("div",{className:"mt-4",children:[Object(s.jsxs)(l.a,{title:"Example",children:[Object(s.jsx)(i,{}),Object(s.jsx)("div",{className:"mt-4",children:Object(s.jsx)(o.a,{className:"hl-code",language:"jsx",style:r.a,children:"import React from 'react'\nimport ColorPicker from 'components/shared-components/ColorPicker';\n\nexport default const Demo = () =>  (\n\tconst onColorChange = (value) => {\n\t\tconsole.log('Selected color: ', value)\n\t}\n\n\treturn (\n\t\t<ColorPicker color={'#3e82f7'} colorChange={onColorChange}/>\n\t)\n)"})})]}),Object(s.jsx)("h4",{className:"mt-4",children:"Props"}),Object(s.jsx)("div",{className:"api-container border-0 p-0",children:Object(s.jsxs)("table",{children:[Object(s.jsx)("thead",{children:Object(s.jsxs)("tr",{children:[Object(s.jsx)("th",{children:"Property"}),Object(s.jsx)("th",{children:"Description"}),Object(s.jsx)("th",{children:"Type"})]})}),Object(s.jsxs)("tbody",{children:[Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{children:"color"}),Object(s.jsx)("td",{children:"Initial color"}),Object(s.jsx)("td",{children:"string"})]}),Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{children:"colorChange"}),Object(s.jsx)("td",{children:"Handler click on color picker"}),Object(s.jsxs)("td",{children:["() => ","{"," hex, hsl, hsv, oldHue, rgb, source ","}"]})]})]})]})})]})]})}},626:function(e,t,a){"use strict";var c=a(5),n=a(3),o=a(0),r=a(6),l=a.n(r),s=a(38),i=a(48),d=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(c=Object.getOwnPropertySymbols(e);n<c.length;n++)t.indexOf(c[n])<0&&Object.prototype.propertyIsEnumerable.call(e,c[n])&&(a[c[n]]=e[c[n]])}return a},b=function(e){var t=e.prefixCls,a=e.className,r=e.hoverable,s=void 0===r||r,b=d(e,["prefixCls","className","hoverable"]);return o.createElement(i.a,null,(function(e){var r=(0,e.getPrefixCls)("card",t),i=l()("".concat(r,"-grid"),a,Object(c.a)({},"".concat(r,"-grid-hoverable"),s));return o.createElement("div",Object(n.a)({},b,{className:i}))}))},m=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(c=Object.getOwnPropertySymbols(e);n<c.length;n++)t.indexOf(c[n])<0&&Object.prototype.propertyIsEnumerable.call(e,c[n])&&(a[c[n]]=e[c[n]])}return a},p=function(e){return o.createElement(i.a,null,(function(t){var a=t.getPrefixCls,c=e.prefixCls,r=e.className,s=e.avatar,i=e.title,d=e.description,b=m(e,["prefixCls","className","avatar","title","description"]),p=a("card",c),u=l()("".concat(p,"-meta"),r),h=s?o.createElement("div",{className:"".concat(p,"-meta-avatar")},s):null,j=i?o.createElement("div",{className:"".concat(p,"-meta-title")},i):null,f=d?o.createElement("div",{className:"".concat(p,"-meta-description")},d):null,g=j||f?o.createElement("div",{className:"".concat(p,"-meta-detail")},j,f):null;return o.createElement("div",Object(n.a)({},b,{className:u}),h,g)}))},u=a(624),h=a(617),j=a(618),f=a(60),g=function(e,t){var a={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&t.indexOf(c)<0&&(a[c]=e[c]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(c=Object.getOwnPropertySymbols(e);n<c.length;n++)t.indexOf(c[n])<0&&Object.prototype.propertyIsEnumerable.call(e,c[n])&&(a[c[n]]=e[c[n]])}return a};var O=function(e){var t,a,r,d=o.useContext(i.b),m=d.getPrefixCls,p=d.direction,O=o.useContext(f.b),y=e.prefixCls,v=e.className,x=e.extra,C=e.headStyle,E=void 0===C?{}:C,N=e.bodyStyle,F=void 0===N?{}:N,w=e.title,S=e.loading,k=e.bordered,P=void 0===k||k,A=e.size,z=e.type,T=e.cover,B=e.actions,D=e.tabList,H=e.children,M=e.activeTabKey,I=e.defaultActiveTabKey,K=e.tabBarExtraContent,W=e.hoverable,L=e.tabProps,R=void 0===L?{}:L,J=g(e,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),G=m("card",y),q=0===F.padding||"0px"===F.padding?{padding:24}:void 0,Q=o.createElement("div",{className:"".concat(G,"-loading-block")}),U=o.createElement("div",{className:"".concat(G,"-loading-content"),style:q},o.createElement(h.a,{gutter:8},o.createElement(j.a,{span:22},Q)),o.createElement(h.a,{gutter:8},o.createElement(j.a,{span:8},Q),o.createElement(j.a,{span:15},Q)),o.createElement(h.a,{gutter:8},o.createElement(j.a,{span:6},Q),o.createElement(j.a,{span:18},Q)),o.createElement(h.a,{gutter:8},o.createElement(j.a,{span:13},Q),o.createElement(j.a,{span:9},Q)),o.createElement(h.a,{gutter:8},o.createElement(j.a,{span:4},Q),o.createElement(j.a,{span:3},Q),o.createElement(j.a,{span:16},Q))),V=void 0!==M,X=Object(n.a)(Object(n.a)({},R),(t={},Object(c.a)(t,V?"activeKey":"defaultActiveKey",V?M:I),Object(c.a)(t,"tabBarExtraContent",K),t)),Y=D&&D.length?o.createElement(u.a,Object(n.a)({size:"large"},X,{className:"".concat(G,"-head-tabs"),onChange:function(t){var a;null===(a=e.onTabChange)||void 0===a||a.call(e,t)}}),D.map((function(e){return o.createElement(u.a.TabPane,{tab:e.tab,disabled:e.disabled,key:e.key})}))):null;(w||x||Y)&&(r=o.createElement("div",{className:"".concat(G,"-head"),style:E},o.createElement("div",{className:"".concat(G,"-head-wrapper")},w&&o.createElement("div",{className:"".concat(G,"-head-title")},w),x&&o.createElement("div",{className:"".concat(G,"-extra")},x)),Y));var Z=T?o.createElement("div",{className:"".concat(G,"-cover")},T):null,$=o.createElement("div",{className:"".concat(G,"-body"),style:F},S?U:H),_=B&&B.length?o.createElement("ul",{className:"".concat(G,"-actions")},function(e){return e.map((function(t,a){return o.createElement("li",{style:{width:"".concat(100/e.length,"%")},key:"action-".concat(a)},o.createElement("span",null,t))}))}(B)):null,ee=Object(s.a)(J,["onTabChange"]),te=A||O,ae=l()(G,(a={},Object(c.a)(a,"".concat(G,"-loading"),S),Object(c.a)(a,"".concat(G,"-bordered"),P),Object(c.a)(a,"".concat(G,"-hoverable"),W),Object(c.a)(a,"".concat(G,"-contain-grid"),function(){var t;return o.Children.forEach(e.children,(function(e){e&&e.type&&e.type===b&&(t=!0)})),t}()),Object(c.a)(a,"".concat(G,"-contain-tabs"),D&&D.length),Object(c.a)(a,"".concat(G,"-").concat(te),te),Object(c.a)(a,"".concat(G,"-type-").concat(z),!!z),Object(c.a)(a,"".concat(G,"-rtl"),"rtl"===p),a),v);return o.createElement("div",Object(n.a)({},ee,{className:ae}),r,Z,$,_)};O.Grid=b,O.Meta=p;t.a=O},647:function(e,t,a){"use strict";a.r(t);a(0);var c=a(2);t.default=function(e){var t=e.name,a=e.desc;return Object(c.jsxs)("div",{className:"mb-3",children:[Object(c.jsxs)("span",{className:"font-weight-bold text-dark",children:[t,":"]}),Object(c.jsxs)("span",{className:"text-gray-light",children:[" ",a]})]})}},675:function(e,t,a){"use strict";t.a={'code[class*="language-"]':{color:"#c5c8c6",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},'pre[class*="language-"]':{color:"#c5c8c6",textShadow:"0 1px rgba(0, 0, 0, 0.3)",fontFamily:"Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",lineHeight:"1.5",MozTabSize:"4",OTabSize:"4",tabSize:"4",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",borderRadius:"0.3em",background:"#1d1f21"},':not(pre) > code[class*="language-"]':{background:"#1d1f21",padding:".1em",borderRadius:".3em"},comment:{color:"#7C7C7C"},prolog:{color:"#7C7C7C"},doctype:{color:"#7C7C7C"},cdata:{color:"#7C7C7C"},punctuation:{color:"#c5c8c6"},".namespace":{Opacity:".7"},property:{color:"#96CBFE"},keyword:{color:"#96CBFE"},tag:{color:"#96CBFE"},"class-name":{color:"#FFFFB6",textDecoration:"underline"},boolean:{color:"#99CC99"},constant:{color:"#99CC99"},symbol:{color:"#f92672"},deleted:{color:"#f92672"},number:{color:"#FF73FD"},selector:{color:"#A8FF60"},"attr-name":{color:"#A8FF60"},string:{color:"#A8FF60"},char:{color:"#A8FF60"},builtin:{color:"#A8FF60"},inserted:{color:"#A8FF60"},variable:{color:"#C6C5FE"},operator:{color:"#EDEDED"},entity:{color:"#FFFFB6",cursor:"help"},url:{color:"#96CBFE"},".language-css .token.string":{color:"#87C38A"},".style .token.string":{color:"#87C38A"},atrule:{color:"#F9EE98"},"attr-value":{color:"#F9EE98"},function:{color:"#DAD085"},regex:{color:"#E9C062"},important:{color:"#fd971f",fontWeight:"bold"},bold:{fontWeight:"bold"},italic:{fontStyle:"italic"}}}}]);
//# sourceMappingURL=23.eec94c5f.chunk.js.map