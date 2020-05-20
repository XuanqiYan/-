/*
环境搭建步骤	
	mkdir 目录
	npm init 
	npm install vue-template-compiler
	node index.js
*/

const compiler = require('vue-template-compiler')

// 插值
//const template = `<p >{{message}}</p>`
/*
将模板编译 -> render 函数 
function render (){
		with(this){
			//vue 内部基于h函数 封装的_c  和 _v ,调用_c 和 _v的时候实际在调用h函数
			return _c('p',[_v(_s(message))])
		} 
}
如果执行render函数返回 vnode

*/

// 表达式
//const template = `<p>{{flag ? message : 'xxx'}}</p>`
// with(this){return _c('p',[_v(_s(flag ? message : 'xxx'))])}

// 属性和动态属性
// const template = `
// 	<div id='d' class='container'>
// 		<img :src='imgUrl' />
// 	</div>
// `
//with(this){return _c('div',{staticClass:"container",attrs:{"id":"d"}},[_c('img',{attrs:{"src":imgUrl}})])}

// 条件 
// const template = `
// 	<div>
// 		<p v-if='flag==="a"' > A </p>
// 		<p v-else> B </p>
// 	</div>
// `
//with(this){return _c('div',[(flag==="a")?_c('p',[_v(" A ")]):_c('p',[_v(" B ")])])}

// 循环
// const template = `
// 	<ul>
// 		<li v-for='item in lists' :key='item.id'>{{item.title}}</li>
// 	</ul>
// `
/*
with(this){
		return _c('ul',_l((lists),function(item){return _c('li',{key:item.id},[_v(" "+_s(item.title)+" ")])}),0)	
	}
*/

// 事件 写模板的时候必须要有一个父节点 
// const template = `
// 	<template>
// 		<button @click='handlerClick'> submit </button>
// 		<button v-on:click='handlerclick1'> submit </button>	
// 	</template>
// `
/*
with(this){return _c('div',[_c('button',{on:{"click":handlerClick}},[_v(" submit ")]),_v(" "),_c('button',{on:{"click":handlerclick1}},[_v(" submit ")])])}

with(this){return [_c('button',{on:{"click":handlerClick}},[_v(" submit ")]),_v(" "),_c('button',{on:{"click":handlerclick1}},[_v(" submit ")])]}
*/


// 双向绑定 
const template = `<input type='text' v-model='name' />`
/*
	with(this){return _c('input',{directives:[{name:"model",rawName:"v-model",value:(name),expression:"name"}],
	attrs:{"type":"text"},domProps:{"value":(name)},on:{"input":function($event){if($event.target.composing)
	return;name=$event.target.value}}})}
*/




// 编译
const res = compiler.compile(template)
console.log(res.render)


// ---------------分割线--------------

// 从 vue 源码中找到缩写函数的含义
// function installRenderHelpers (target) {
//     target._c = createElement
//     target._o = markOnce;
//     target._n = toNumber;
//     target._s = toString;
//     target._l = renderList;
//     target._t = renderSlot;
//     target._q = looseEqual;
//     target._i = looseIndexOf;
//     target._m = renderStatic;
//     target._f = resolveFilter;
//     target._k = checkKeyCodes;
//     target._b = bindObjectProps;
//     target._v = createTextVNode;
//     target._e = createEmptyVNode;
//     target._u = resolveScopedSlots;
//     target._g = bindObjectListeners;
//     target._d = bindDynamicKeys;
//     target._p = prependModifier;
// }
