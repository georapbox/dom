/**
 * @app domJS
 * @desc DOM Library
 * @version 0.1.3
 * @author George Raptis | http://georap.gr
 */
var dom = {
    addClass: function(el, c) {
        'use strict';

        if (document.documentElement.classList) {
            this.addClass = function(el, c) {
                el.classList.add(c);
                return this;
            };
        } else {
            this.addClass = function(el, c) {
                if (!this.hasClass(el, c)) {
                    el.className += ' ' + c;
                }
                return this;
            };
        }

        this.addClass(el, c);
        return this;
    },

    removeClass: function(el, c) {
        'use strict';

        if (document.documentElement.classList) {
            this.removeClass = function(el, c) {
                el.classList.remove(c);
                return this;
            };
        } else {
            this.removeClass = function(el, c) {
                var regex = new RegExp('(?:\\s|^)' + c + '(?:\\s|$)');
                el.className = el.className.replace(regex, ' ');

                return this;
            };
        }

        this.removeClass(el, c);
        return this;
    },

    hasClass: function(el, c) {
        'use strict';

        if (document.documentElement.classList) {
            this.hasClass = function(el, c) {
                return el.classList.contains(c);
            };
        } else {
            this.hasClass = function(el, c) {
                var regex = new RegExp('(?:\\s|^)' + c + '(?:\\s|$)');
                return !!el.className.match(regex);
            };
        }

        return this.hasClass(el, c);
    },

    toggleClass: function(el, c) {
        'use strict';

        if (document.documentElement.classList) {
            this.toggleClass = function(el, c) {
                el.classList.toggle(c);
                return this;
            };
        } else {
            this.toggleClass = function(el, c) {
                this.hasClass(el, c) ? this.removeClass(el, c) : this.addClass(el, c);
                return this;
            };
        }

        this.toggleClass(el, c);
        return this;
    },

    getElementsByClassName: function(node, c) {
        'use strict';

        if (document.getElementsByClassName) {
            return node.getElementsByClassName(c);
        }

        if (!document.getElementsByClassName && document.querySelectorAll) {
            return node.querySelectorAll('.' + c);
        }

        if (!document.getElementsByClassName && !document.querySelectorAll) {
            var arr = [],
                regx = new RegExp('(^| )' + c + '( |$)'),
                els = node.getElementsByTagName('*'),
                i = 0,
                len = els.length,
                el;

            for (; i < len; i++) {
                el = els[i];
                if (regx.test(el.className)) {
                    arr.push(el);
                }
            }
            return arr;
        }
    },

    next: function(el) {
        'use strict';

        if (el.nextElementSibling) {
            this.next = function(el) {
                return el.nextElementSibling;
            };
        } else {
            this.next = function(el) {
                do { el = el.nextSibling; } while (el && el.nodeType !== 1);
                return el;
            };
        }

        return this.next(el);
    },

    prev: function(el) {
        'use strict';

        if (!el.previousElementSibling) {
            this.prev = function(el) {
                return el.previousElementSibling;
            };
        } else {
            this.prev = function(el) {
                do { el = el.previousSibling; } while (el && el.nodeType !== 1);
                return el;
            };
        }

        return this.prev(el);
    },
    
    select: function(el) { // IE8+
        'use strict';
        return document.querySelector(el);
    },

    selectAll: function(els, callback) { // IE8+
        'use strict';
        
        var elsArr = document.querySelectorAll(els),
            idx = 0,
            elsLen = elsArr.length;
        
        if (typeof callback === 'undefined' || typeof callback !== 'function') {
            return elsArr;
        } else {
            // return [].map.call(elsArr, callback);
            // return [].slice.call(elsArr).forEach(callback);
            for (; idx < elsLen; idx++) {
                callback(elsArr[idx], idx, elsArr);
            }
        }
        
        return this;
    },
    
    walk: function(node, func) {
        'use strict';
        func(node);
        node = node.firstChild;
        while (node) {
            this.walk(node, func);
            node = node.nextSibling;
        }
    }
};