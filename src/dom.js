/**
 * @app domJS
 * @desc DOM Library
 * @version 0.1.2
 * @author George Raptis | http://georap.gr
 */
var dom = {};

dom.classList = {
    /**
     * @desc returns true if element hsa a class
     * @param el - the element we want to check if contains class
     * @param c (string) - the class name
     */
    contains: function(el, c) {
        'use strict';

        if (arguments.length !== 2) { throw new Error('function "contains" called with ' + arguments.length + ' argument(s), but it expects 2 arguments.'); }
        if (!el || !c) { throw new Error('Can\'t check if class "' + c + '" is contained on ' + el); }

        if (document.documentElement.classList) {
            this.contains = function(el, c) {
                return el.classList.contains(c);
            };
        } else {
            this.contains = function(el, c) {
                var c_names = el.className.split(/\s+/),
                    len = c_names.length;

                while (len--) {
                    if (c_names[len] === c) {
                        return true;
                    }
                }
                return false;
            };
        }

        this.contains(el, c);
    },

    /**
     * @desc adds a CSS class to an element.
     * @param el {Object} - the element to add the class
     * @param c {String} - the name of the class to add to the element
     */
    add: function(el, c) {
        'use strict';

        if (arguments.length !== 2) { throw new Error('function "add" called with ' + arguments.length + ' argument(s), but it expects 2 arguments.'); }
        if (!el || !c) { throw new Error('Can\'t add class "' + c + '" on ' + el); }

        if (document.documentElement.classList) {
            this.add = function(el, c) {
                el.classList.add(c);
                return this;
            };
        } else {
            this.add = function(el, c) {
                if (!this.contains(el, c)) {
                    var c_names = el.className.split(/\s+/);
                    c_names.push(c);
                    el.className = c_names.join(' ');
                }
                return this;
            };
        }

        this.add(el, c);
        return this;
    },

    /**
     * @desc removes a CSS class from an element
     * @param el - the element to remove the class from
     * @param c (String) - the name of the class to remove from element (space seperated)
     */
    remove: function(el, c) {
        'use strict';

        if (arguments.length !== 2) { throw new Error('function "remove" called with ' + arguments.length + ' argument(s), but it expects 2 arguments.'); }
        if (!el || !c) { throw new Error('Can\'t remove class "' + c + '" from ' + el); }

        if (document.documentElement.classList) {
            this.remove = function(el, c) {
                el.classList.remove(c);
                return this;
            };
        } else {
            this.remove = function(el, c) {
                var c_names = el.className.split(/\s+/),
                    len = c_names.length;

                while (len--) {
                    if (c_names[len] === c) {
                        c_names.splice(len, 1);
                        el.className = c_names.join(' ');
                        break;
                    }
                }

                return this;
            };
        }

        this.remove(el, c);
        return this;
    },

    /**
     * @desc toggles a class of an element
     * @deps (fn) contains, (fn) remove, (fn) add
     * @param el - the element to toggle its class
     * @param c (string) - the class name
     */
    toggle: function(el, c) {
        'use strict';

        if (arguments.length !== 2) { throw new Error('function "toggle" called with ' + arguments.length + ' argument(s), but it expects 2 arguments.'); }
        if (!el || !c) { throw new Error('Can\'t toggle class "' + c + '" on ' + el); }

        if (document.documentElement.classList) {
            this.toggle = function(el, c) {
                el.classList.toggle(c);
                return this;
            };
        } else {
            this.toggle = function(el, c) {
                if (this.contains(el, c)) {
                    this.remove(el, c);
                } else {
                    this.add(el, c);
                }
                return this;
            };
        }

        this.toggle(el, c);
        return this;
    }
};

/**
 * @desc get elements by class name
 * @param node {Node} - the node to check for the class name (eg: document)
 * @param c {String} - the class name
 * @return node list {Array} with the elements that contain the class name
 */
dom.getElementsByClassName = function (node, c) {
    'use strict';

    // if getElementsByClassName is supported
    if (document.getElementsByClassName) {
        return node.getElementsByClassName(c);
    }

    // if getElementsByClassName is NOT supported but querySelectorAll is supported
    if (!document.getElementsByClassName && document.querySelectorAll) {
        return node.querySelectorAll('.' + c);
    }

    // if neither getElementsByClassName nor querySelectorAll is supported
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
};

/**
 * @desc Finds the next element sibling of the passed element.
 * @param el {Node}
 */
dom.next = function(el) {
    'use strict';

    if (el.nextElementSibling) {
        this.next = function(el) {
            return el.nextElementSibling;
        };
    } else {
        this.next = function(el) {
            do {
                el = el.nextSibling;
            } while (el && el.nodeType !== 1);
            return el;
        };
    }
    return this.next(el);
};