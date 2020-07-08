/*
window.dom={};

window.dom = {
    create: function () { }
};

dom.create = function () { }

window.dom = {
    create(tagName) {
        return document.createElement(tagName)
    }
};
*/
/*有bug td放不了
window.dom = {
    create(string) {
        const container = document.createElement('div');
        container.innerHTML = string;
        return container.children[0];
    }
};
*/
//template容纳任意标签 万能创建方法
window.dom = {
    create(string) {
        const container = document.createElement('template');
        container.innerHTML = string.trim();//trim()可以去掉字符串文本两边空格！
        return container.content.firstChild;//content.firstChild只能通过这种方法拿到第一个孩子
    },
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
    },//找到node的爸爸，然后调用爸爸的insertBefore方法，把node插入到弄得下一个节点的前面，dom变态之处
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node) {
        parent.appendChild(node);
    },
    wrap(node, parent) {
        dom.before(node, parent)//先把div3放到div2的前面，再把div2放到div3里面
        dom.append(parent, node)
    },
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        //const childNodes = node.childNodes
        //const { childNodes } = node;
        const array = [];
        let x = node.firstChild;//因为node的的孩子不断变化，所以不能用childNode，只能一个个删除所有孩子（吃人语法）
        while (x) {
            array.push(dom.remove(node.firstChild))//然后把移除的每个孩子放到array中
            x = node.firstChild//每次让下一个孩子当第一个孩子while循环
        }
        return array
    },
    attr(node, name, value) {//js重载，接受不同个数的参数
        if (arguments.length === 3) {//如果长度为3就修改
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {//如果长度为2就读取
            return node.getAttribute(name)
        }
    },
    text(node, string) {//注意只能改内容，如果有标签嵌套，需要得到标签的id，这样才能修改制定内容/重载
        if (arguments.length === 2) {
            if ('innerText' in node) {//适配（案例电源适配器）/如果node中存在innertext，说明是ie浏览器
                node.innerText = string//ie
            } else {
                node.textContent = string//firefox/chrome
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {//适配（案例电源适配器）/如果node中存在innertext，说明是ie浏览器
                return node.innerText//ie
            } else {
                return node.textContent//firefox/chrome
            }
        }
    },
    html(node, string) {//重载
        if (arguments.length === 2) {
            node.innerHTML = string//ie
        } else if (arguments.length === 1) {
            return node.innerHTML//ie
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            //dom.style(div,'color','red')
            node.style[name] = value//node.style.name会变成字符串
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {//查看name的类型
                //dom.style(div,'color')
                return node.style[name]
            } else if (name instanceof Object) {//name是object的实例
                //dom.style(div,{color:'red'})
                const object = name
                for (let key in object) {
                    //key:border/color
                    //node.style.border=...
                    //node.style.color=...
                    node.style[key] = object[key]
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },//如果有scope就从scope中找寻，如果没有就从document中
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {//删除自己
        return Array.from(node.parentNode.children)//Array.from变成数组然后进行过滤
            .filter(n => n !== node)//对每个节点进行过滤，如果当前节点不等于参数node，就放入Array中
        /*filter也是一个常用的操作，它用于把Array的某些元素过滤掉，然后返回剩下的元素。
        和map()类似，Array的filter()也接收一个函数。和map()不同的是，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素。*/
    },
    next(node) {//bug 会找到文本节点
        return node.nextSibling
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {//如果x存在并且x的类型为文本，则让x等于下一个节点（跳过文本）
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {//如果x存在并且x的类型为文本，则让x等于下一个节点（跳过文本）
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }





};