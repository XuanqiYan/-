const snabbdom = window.snabbdom

// 定义 patch
const patch = snabbdom.init([
    snabbdom_class,
    snabbdom_props,
    snabbdom_style,
    snabbdom_eventlisteners
])

// 引入h函数 渲染模版返回一个虚拟dom (vnode) 
const h = snabbdom.h

const container = document.getElementById('container')

// 生成 vnode
const vnode = h('ul#list', {}, [
    h('li.item', {}, 'Item 1'),
    h('li.item', {}, 'Item 2')
])

// patch 函数可以让vnode渲染成真正的DOM
// patch 用法一：渲染到空的dom元素中 
patch(container, vnode)

document.getElementById('btn-change').addEventListener('click', () => {
    // 生成 newVnode
    const newVnode = h('ul#list', {}, [
        h('li.item', {}, 'Item 1'),
        h('li.item', {}, 'Item B'),
        h('li.item', {}, 'Item 3')
    ])
	//patch 用法二：用新的vnode替换 之前的，从而实现替换已有的dom
    patch(vnode, newVnode)
})