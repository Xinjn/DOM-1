/*
const div = dom.create('div');
console.log(div)

const div = dom.create('div');
const span = dom.create('span');
div.appendChild(span);
console.log(div);
*/
/*
const div = dom.create("<div><span></span></div>");
console.log(div)
*/
/*
const div = dom.create("<tr><td>hi</td></tr>");
console.log(div)
*/
/*
const div = dom.create("<div>newDiv</div>");
dom.after(test, div);
*/
/*
const div = dom.create("<div>newDiv2</div>");
dom.before(test, div);
*/
/*
const div = dom.create("<div>newDiv2</div>");
dom.append(test, div);
*/
/*
const div = dom.create("<div>newDiv</div>");
const div3 = dom.create('<div id="partent">');
dom.wrap(test, div3)
*/

/*
const nodes = dom.empty(window.empty);
console.log(nodes)
*/
/*
dom.attr(test, 'title', 'Hi, I an Xinjn')
const title = dom.attr(test, 'title')//读取
console.log(`title:${title}`)
*/
/*
dom.text(test, '你好，这是新内容');
console.log(dom.text(test));//读取
*/
/*
dom.html(test, '你好，这是新内容');
console.log(dom.html(test));//读取
*/

dom.style(test, { border: '1px solid red', color: 'blue' })//设置
//console.log(dom.style(test, 'border'))//读取
//dom.style(test, 'border', '1px solid black')//设置


dom.class.add(test, 'red')
//dom.class.remove(test, 'red')
//console.log(dom.class.has(test, 'red'))

/*
fn = () => {
    console.log('点击')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)
*/
/*
const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
console.log(dom.find('.blue', test2))
*/
//console.log(dom.siblings(dom.find('#e2')[0]))
/*
const s2 = dom.find('#e2')[0]
console.log(dom.next(s2))
*/
/*
const s2 = dom.find('#e2')[0]
console.log(dom.previous(s2))
*/
/*
const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))
*/
const s2 = dom.find('#e2')[0]
console.log(dom.index(s2))

const div = dom.find('#test>.red')[0] // 获取对应的元素
dom.style(div, 'color', 'red') // 设置 div.style.color

const divList = dom.find('.red') // 获取多个 div.red 元素
dom.each(divList, (n) => console.log(n)) // 遍历 divList 里的所有元素