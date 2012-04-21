/**
 * 移动浏览器控制台
 * @author jiazheng
 */
(function () {

/**
 * 将数据进行字符串化，最用用于控制台输出
 * @param {Mix} 用于展示的数据
 * @param {boolean} 标志位用于处理JSON内部的字符串，如果是true表示是JSON内部字符串，需要加引号输出
 * @return {string} 返回数据的字符串结果
 */
function stringify(a, flag) {
    var s = "";
    if (a && a.constructor == Array) {
        s = "[" + a.join(", ") + "]";
    } else if (typeof a == "function") {
        s = "function";
    } else if (typeof a == "object") {
        if (a.addEventListener || a.attachEvent) {
            s = a.tagName;
        } else {
            s = "{";
            for (var i in a) {
                s = s + i + ":" + stringify(a[i], true) + ",";
            }
            s = s.substr(0, s.length - 1) + "}";
        }
    } else if (typeof a == "string" && flag) {
        s = "\"" + a + "\"";
    } else {
        s = a;
    }
    return s;
}

/**
 * 获取id对应的元素
 * @param {string} 元素id
 * @return {HTMLElement} 元素实例
 */
function G(id) {
    return document.getElementById(id);
}

/**
 * 添加控制台面板到页面
 */
function addPanel() {
    var panel = document.createElement("div");
    panel.id = "panel";
    var s = panel.style;
    s.position = "absolute";
    s.top = "0px";
    s.right = "0px";
    s.border = "1px solid black";
    s.background = "rgba(255, 255, 255, .5)";
    s.width = "140px";
    s.height = "200px";
    s.fontSize = "11px";
    s.fontFamily = "Monaco, Tahoma, Arial";
    s.padding = "3px";
    s.overflowY = "scroll";
    s.overflowX = "scroll";
    if (document && document.body) {
        document.body.appendChild(panel);
    }
    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = "clear";
    btn.style.position = "absolute";
    btn.style.right = "0px";
    btn.style.top = "0px";
    btn.style.opacity = '0.5';
    btn.onclick = function () {
        G("panel").innerHTML = "";
    }
    panel.appendChild(btn);
    if (document && document.body) {
        document.body.appendChild(panel);
        if (log._content.length > 0) {
            for (var i = 0; i < log._content.length; i ++) {
                log(log._content[i]);
            }
            delete log._content;
        }
    } else {
        addEvent(window, 'load', function(){
            addPanel();
        });
    }
}
/**
 * 添加事件处理函数
 * @param {HTMLElement} 绑定事件监听的元素
 * @param {string} 事件类型
 * @param {Function} 监听函数
 */
function addEvent(elem, type, handler) {
    if (!elem) {
        return;
    }
    if (elem.addEventListener) {
        elem.addEventListener(type, handler, false);
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + type, handler);
    }
}

function log(a) {
    var p = G("panel");
    var div = document.createElement("div");
    div.innerHTML = stringify(a);
    if (p) {
        p.appendChild(div);
        p.scrollTop = 99999;
    } else {
        // 面板尚未准备好，缓存起来
        log._content.push(a);
    }
}

log._content = [];

//if (typeof console == "undefined"){
    window.console = {};
    window.console.log = log;
//}
// 添加面板
addPanel();
})();





