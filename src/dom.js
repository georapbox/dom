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
    }
};