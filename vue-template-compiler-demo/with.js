const obj = {
	a:10,
	b:20
}

// console.log(obj.a)
// console.log(obj.b)
// console.log(obj.c) // 不存在的属性原始方式 undefined

// with 改变{ } 内部自由变量的查找方式，将{}内的自由变量变为obj的属性来查找 
with(obj){
	console.log(a) //10
	console.log(b) //20
	//console.log(c) // 直接报错
}