(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{14:function(e,s,t){"use strict";t.r(s);var r=t(0),u={namespaced:!0,state:{users:[]},mutations:{setUsers(e,s=[]){r.a.set(e.users,s)}},actions:{doGetUsers:({commit:e})=>[]}},o={name:"home",asyncData:({store:e,route:s})=>(e.registerModule("user",u),e.dispatch("user/doGetUsers")),data:()=>({}),computed:{users(){return this.$store.state.user.users}},mounted(){},methods:{},destroyed(){this.$store.unregisterModule("user")}},n=t(4),a=Object(n.a)(o,(function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("\n    home\n")])}),[],!1,null,null,null);s.default=a.exports}}]);