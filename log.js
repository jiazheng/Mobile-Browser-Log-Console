(function () {
function parse(a, flag) {
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
                s = s + i + ":" + parse(a[i], true) + ",";
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

function G(id) {
    return document.getElementById(id);
}

function addPanel() {
    var panel = document.createElement("div");
    panel.id = "panel";
    var s = panel.style;
    s.position = "absolute";
    s.top = "0px";
    s.right = "0px";
    s.border = "1px solid black";
    s.background = "white";
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
    btn.style.width = "40px";
    btn.onclick = function () {
        G("panel").innerHTML = "";
    }
    if (document && document.body) {
        document.body.appendChild(btn);
    }
}

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

addPanel();

function log(a) {
    var p = document.getElementById("panel");
    var div = document.createElement("div");
    div.innerHTML = parse(a);
    if (p) {
        p.appendChild(div);
        p.scrollTop = 99999;
    }
}

//if (typeof console == "undefined"){
    window.console = {};
    window.console.log = log;
    window._log = log;
//}
})();





