(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["competitions"],{2503:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-sheet",{staticClass:"competitions"},[n("v-data-table",{staticClass:"elevation-1",attrs:{dense:"",headers:[{value:"emblemUrl",text:"Флаг",align:"center"},{value:"code",text:"Код",align:"center"},{value:"name",text:"Название"},{value:"area.name",text:"Область"},{value:"currentSeason.startDate",text:"Начало",align:"center"},{value:"currentSeason.endDate",text:"Конец",align:"center"},{value:"numberOfAvailableSeasons",text:"Сезоны",align:"center"},{value:"actions",text:"Действия",sortable:!1,align:"center"}],items:e.competitions.items,"items-per-page":100,"footer-props":{"items-per-page-options":[5,10,20,30,50,100,500,-1]},"item-key":"id"},scopedSlots:e._u([{key:"item.emblemUrl",fn:function(e){var t=e.item.emblemUrl;return[n("v-emblem",{attrs:{url:t}})]}},{key:"item.actions",fn:function(t){var a=t.item.id;return[n("v-btn-toggle",{attrs:{dense:"",borderless:""}},[n("v-btn",{attrs:{small:"",text:"",to:{name:"TeamsFrom",params:{competitionId:a}}}},[e._v(" Команды "),n("v-icon",{attrs:{right:""}},[e._v(" mdi-send ")])],1),n("v-btn",{attrs:{small:"",text:"",to:{name:"MatchesFrom",params:{competitionId:a}}}},[e._v(" Матчи "),n("v-icon",{attrs:{right:""}},[e._v(" mdi-send ")])],1)],1)]}}],null,!0)})],1)},r=[],o=n("1da1"),i=n("5530"),s=(n("96cf"),n("2f62")),c=n("4a62"),m={name:"Competitions",components:{VEmblem:c["a"]},data:function(){return{}},computed:Object(i["a"])({},Object(s["d"])("competitions",["competitions"])),methods:Object(i["a"])(Object(i["a"])({},Object(s["b"])("competitions",["fetchCompetitionsIfNotExits"])),{},{beforeCompetitionsCreateAndUpdate:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.fetchCompetitionsIfNotExits,t.next=3,n();case 3:case"end":return t.stop()}}),t)})))()}}),beforeRouteEnter:function(e,t,n){n((function(e){return e.beforeCompetitionsCreateAndUpdate()}))},beforeRouteUpdate:function(e,t,n){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n();case 2:return e.next=4,a.beforeCompetitionsCreateAndUpdate();case 4:case"end":return e.stop()}}),e)})))()}},u=m,l=n("2877"),p=n("6544"),d=n.n(p),f=n("8336"),v=n("a609"),b=n("8fea"),g=n("132d"),x=n("8dd9"),h=Object(l["a"])(u,a,r,!1,null,null,null);t["default"]=h.exports;d()(h,{VBtn:f["a"],VBtnToggle:v["a"],VDataTable:b["a"],VIcon:g["a"],VSheet:x["a"]})}}]);
//# sourceMappingURL=competitions.cb5421f2.js.map