// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dom.js":[function(require,module,exports) {
var _window$dom;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
window.dom = (_window$dom = {
  create: function create(string) {
    var container = document.createElement('template');
    container.innerHTML = string.trim(); //trim()可以去掉字符串文本两边空格！

    return container.content.firstChild; //content.firstChild只能通过这种方法拿到第一个孩子
  },
  after: function after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  //找到node的爸爸，然后调用爸爸的insertBefore方法，把node插入到弄得下一个节点的前面，dom变态之处
  before: function before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  append: function append(parent, node) {
    parent.appendChild(node);
  },
  wrap: function wrap(node, parent) {
    dom.before(node, parent); //先把div3放到div2的前面，再把div2放到div3里面

    dom.append(parent, node);
  },
  remove: function remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty: function empty(node) {
    //const childNodes = node.childNodes
    //const { childNodes } = node;
    var array = [];
    var x = node.firstChild; //因为node的的孩子不断变化，所以不能用childNode，只能一个个删除所有孩子（吃人语法）

    while (x) {
      array.push(dom.remove(node.firstChild)); //然后把移除的每个孩子放到array中

      x = node.firstChild; //每次让下一个孩子当第一个孩子while循环
    }

    return array;
  },
  attr: function attr(node, name, value) {
    //js重载，接受不同个数的参数
    if (arguments.length === 3) {
      //如果长度为3就修改
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      //如果长度为2就读取
      return node.getAttribute(name);
    }
  },
  text: function text(node, string) {
    //注意只能改内容，如果有标签嵌套，需要得到标签的id，这样才能修改制定内容/重载
    if (arguments.length === 2) {
      if ('innerText' in node) {
        //适配（案例电源适配器）/如果node中存在innertext，说明是ie浏览器
        node.innerText = string; //ie
      } else {
        node.textContent = string; //firefox/chrome
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        //适配（案例电源适配器）/如果node中存在innertext，说明是ie浏览器
        return node.innerText; //ie
      } else {
        return node.textContent; //firefox/chrome
      }
    }
  },
  html: function html(node, string) {
    //重载
    if (arguments.length === 2) {
      node.innerHTML = string; //ie
    } else if (arguments.length === 1) {
      return node.innerHTML; //ie
    }
  },
  style: function style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value; //node.style.name会变成字符串
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        //查看name的类型
        //dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //name是object的实例
        //dom.style(div,{color:'red'})
        var object = name;

        for (var key in object) {
          //key:border/color
          //node.style.border=...
          //node.style.color=...
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add: function add(node, className) {
      node.classList.add(className);
    },
    remove: function remove(node, className) {
      node.classList.remove(className);
    },
    has: function has(node, className) {
      return node.classList.contains(className);
    }
  },
  on: function on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off: function off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find: function find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  //如果有scope就从scope中找寻，如果没有就从document中
  parent: function parent(node) {
    return node.parentNode;
  },
  children: function children(node) {
    return node.children;
  },
  siblings: function siblings(node) {
    //删除自己
    return Array.from(node.parentNode.children) //Array.from变成数组然后进行过滤
    .filter(function (n) {
      return n !== node;
    }); //对每个节点进行过滤，如果当前节点不等于参数node，就放入Array中

    /*filter也是一个常用的操作，它用于把Array的某些元素过滤掉，然后返回剩下的元素。
    和map()类似，Array的filter()也接收一个函数。和map()不同的是，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素。*/
  },
  next: function next(node) {
    //bug 会找到文本节点
    return node.nextSibling;
  }
}, _defineProperty(_window$dom, "next", function next(node) {
  var x = node.nextSibling;

  while (x && x.nodeType === 3) {
    //如果x存在并且x的类型为文本，则让x等于下一个节点（跳过文本）
    x = x.nextSibling;
  }

  return x;
}), _defineProperty(_window$dom, "previous", function previous(node) {
  var x = node.previousSibling;

  while (x && x.nodeType === 3) {
    //如果x存在并且x的类型为文本，则让x等于下一个节点（跳过文本）
    x = x.previousSibling;
  }

  return x;
}), _defineProperty(_window$dom, "each", function each(nodeList, fn) {
  for (var i = 0; i < nodeList.length; i++) {
    fn.call(null, nodeList[i]);
  }
}), _defineProperty(_window$dom, "index", function index(node) {
  var list = dom.children(node.parentNode);
  var i;

  for (i = 0; i < list.length; i++) {
    if (list[i] === node) {
      break;
    }
  }

  return i;
}), _window$dom);
},{}],"C:/Users/NING MEI/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49883" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/NING MEI/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dom.js"], null)
//# sourceMappingURL=/dom.1d0b6d56.js.map