const data = {
	name:'zhangsan',
	age:21
}
console.log('cc')
/*
	new Proxy产生一个代理对象
	以后对data对象的访问，可以直接使用proxyData代理对象
	proxyData.name 触发 get(原始的data，属性名，代理对象)
	
*/
const proxyData = new Proxy(data,{
	get(target,key,receiver){
		console.log('get')		
	}
})

