一 .基本使用  组件使用  -- 常用必须会

二 .高级特性           -- 不常用 体现深度

	自定义v-model
	$nextTick
	slot
	动态组件
	异步加载组件 ）按需加载：什么时候用什么时候加载）
		import()
	keep-alive
	mixin

三 .vuex 和 router 部分

四 .vue原理部分
	组件化：
		封装组件的标准：只要公共的需求就会封装成一个组件
		粒度问题：
			粒度大：拆分组件过细，导致vue加载组件数量较多，每个组件生命周期是一定的，会耗时耗性能
			粒度小：拆分组件笼统，项目迭代影响速度会拖慢 ，项目的灵活性下降
			
	mvvm 模型：
		m:model 数据 data
		v:view 视图 模板 $el
		vm: vue把数据和模板结合的处理能力
		
	响应式：
		由于vue数据驱动视图（mvvm）如何vue监听data变化 ？如何跟新视图？	
		/*
			vue2.x	
				vue2.x版本借助原生API - Object.defineProperty 接口实现了响应式
					Object.defineProperty接口有天然的缺陷
						1.只能监听对象，无法监听数组
							利用重写数组原型中的各种跟新数组的方法来实现监听工作
						2.如果复杂对象，深度监听 ，需要递归到底，一次性计算太大
						3.不能监听
							新增属性 --》Vue.set('新增属性名','值')
							删除的属性 --》Vue.delete('已存在的属性')
			vue3.0	
				vue3.0使用proxy改写了响应式,弥补了defineProperty接口的缺陷
				但是proxy存在兼容性问题，无法兼容内核较低的浏览器和ie11,无法实现polyfill			
		*/
	   
	   
	虚拟dom ： （vue react 实现模板编译的基础原理 ）
		1.由于现在复客户端出现，传统模式的jquery操作将不适用，
			vue/react前端框架，是数据驱动视图，那么如何高效的操作dom 就变成一个框架内部所需要解决的问题
			 
		2.js运算性能非常快 ，相比dom运算来说提升很多
		 
		3.vue 先用js模拟dom结构，形成虚拟dom 放在内存中，然后在形成真实的dom挂载到页面中 
		
		4.如果需要跟新dom 结构，vue会在内存中对比新的虚拟dom 和 旧的 虚拟dom (diff算法),找出新旧对象的最小的差异
		
		5.再基于最小的差异 跟新真实的dom
		
		
		问题：
			vue如何模拟虚拟dom ？(这不是一个唯一标准)
			
			<div id='div1' class='container'>
				<p click='handleClick'>虚拟dom</p>
				<ul style='font-size:20px'>
					<li>xxxx</li>
				</ul>
			</div>	
			
			const vnode = {
				tag:'div',
				props:{
					id:'div1',
					class:'container'
				},
				children:[
					{
						tag:'p',
						props:{
							click:handleClick
						},
						children:'虚拟dom'
					},
					{
						tag:'ul',
						props:{
							style:'font-size:20px'
						},
						children:[
							{
								tag:'li',
								props:{},
								children:'xxx'
							}
						]
					}
				]
			}
			
		问题： vue 如何描述虚拟dom (snabbdom)
		
			vue中的虚拟dom
				children: Array(2)
					0: {sel: "li.item", data: {…}, children: undefined, text: "Item 1", elm: li.item, …}
					1: {sel: "li.item", data: {…}, children: undefined, text: "Item 2", elm: li.item, …}
				data: {}
				elm: ul#list
				key: undefined 
				sel: "ul#list"
				text: undefined
				
		diff算法 （如何比较两个vnode 的差异，找出最小的变化 ）
			传统diff 计算的复杂度 n^3 --> 不可用的算法 
				第一：遍历第一dom树 for
				第二：遍历第二个dom树 for
				第三：排序 for
			
			假设 第一个和第二个dom树都有1000节点
			for(i<=1000){
				for(j<=1000){
					for(k<=1000){
						//排序比较
					}
				}
			}
			
			1000*1000*1000=很大的数据 --》 算法不可用
 			
			vue中 patch 函数实现diff算法 
				前端大牛将基于传统的diff算法结果网页特性优化 ，使其复杂度从n^3 变成n^1
				第一：不做跨级比较 
				第二：如果tag不同，直接删掉重建，不再深度比较	
				第三：如果tag和 key  相同,则认为是同一个节点，不在深度比较
				 
		面试题：v-for 为什么要绑定key?
			data:[
				{id:3,content:'...'},		
				{id:1,content:'xxx'},	
				{id:2,content:'ooo'},
				
			]
			<ul>
				<li v-for='data' :key='index'/> --> tag：li  key:1
			</ul>
			
		面试题：为了达到虚拟dom复用，在绑定key的时候 不要绑定索引？
		
	模板编译：
		注意：
			vue中的模板不是html 因为模板具备解析指令 循环 判断 插值表达式
			再面试的时候通常不会直接问你什么是模板编译，通过“组件的渲染和跟新的过程“来考察
			
		概念：模板怎么转化成js代码 这个过程叫模板编译
		
		前置知识点：
			with(obj){
				
			}	
		
		vue是如何编译的？ （使用 vue-template-compiler 插件来完成模板编译的）
		总结：
			模板编译就是将模板转化成render函数
			render函数执行返回虚拟dom （vnode）
			vnode在 patch(elm,vnode) 函数渲染成真实的dom
			注意：只有在开发环境中才能执行模板编译（webpack环境 或者是 vue-cli 脚手架环境 ）
	
回顾：
	1.响应式： 监听data属性的变化（getter 和 setter）
	2.模板编译：使用vue-template-complier 编译成render函数	，执行render生成vnode
	3.vdom: patch(elm,vnode) 和 patch(vnode,newVnode)
	
	面试题：组件初次渲染的执行流程
		1: 模板编译render函数 （在开发环境下,只编译一次）
		2: 执行render函数，会触发响应式，监听data中属性的getter 和 setter
		3. 将render产生的虚拟dom (vnode) 使用patch(elm,vnode) 生成真实dom ，并挂载浏览器
			eg:
				<template>
					<p>{{message}}</p>
				<template>
				
				<script>
					export default{
						data(){
							return {
								message:'xxx' //触发get
								city:'北京' //不会触发get ,因为模板中没有用到city,如果改变city 也不会触发setter ，不会触发视图更新，除非模板中使用city属性
							}
						}
						
					}
				</script>
		
	面试题：组件跟新数据重新渲染视图的流程
		1: 修改data中的属性 触发setter (此前在getter中已经被监听的属性)
		2: 重新执行render函数（不需要重新编译）会产生新的虚拟dom (newVnode)
		3: patch(vnode,newVnode),内部根据diff算法比较两个虚拟dom的最小差异，根据最小差异跟新视图
		
		
	面试题：异步渲染 提升性能
	
		

			
		 
		 
		 
		
		
	
		
				
				
				
				
				
			
				
					
				
			

		  
	
				

				
			
			 
		

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
五 .面试真题
v-show 和 v-if 的区别 
为何 v-for 要绑定key
描述vue生命周期 （并且有父子组件的情况）
vue 组件如何通信
描述vue 组件更新渲染的过程
双向绑定v-model的实现原理 

