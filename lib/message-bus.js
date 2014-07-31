(function(global, factory) {
    if (typeof module === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        global.MessageBus = factory();
    }
})(this, function() {
    /**
     * Singleton
     * @return {function}
     */    
    var _instance;
    return _instance ? _instance : new MessageBus();
    
    /**
     * PubSub Implementation
     */
    function MessageBus() {
        this.subscribers = {
            global: []
        };
        this.register = function(type, fn, context) {
            type = type || 'global';
            fn = typeof fn === "function" ? fn : context[fn];
            if (typeof this.subscribers[type] === "undefined") {
                this.subscribers[type] = [];
            }
            if (!this.isAlreadyRegistered({
                'event': type,
                'handler': fn,
                'context': context
            })) {
                this.subscribers[type].push({
                    fn: fn,
                    context: context || this
                });
            } 
        },
        this.isAlreadyRegistered = function(listener) {
            var exist = false,
                subscriber;
            if (listener.context) {
                var i,
                    subscribers = this.subscribers[listener.event],
                    len = subscribers.length;
                for (i = 0; i < len; i++) {
                    subscriber = subscribers[i];
                    if (subscriber.fn === listener.handler && subscriber.context === listener.context) {
                        exist = true;
                        break;
                    }
                }
            }
            return exist;
        },
        this.remove = function(type) {
            var pubtype = type || 'global',
                subscribers = this.subscribers[pubtype],
                i,
                max = subscribers ? subscribers.length : 0,
                arg,
                f,
                con;
            if (arguments.length === 1) { // remove all listeners with same type name
                this.subscribers[pubtype] = [];
            } else if (arguments.length === 2) {
                arg = arguments[1];
                if (arg && typeof arguments[1] === 'object') {
                    for (i = 0; i < max; i += 1) {
                        if (subscribers[i].context === arg) {
                            subscribers.splice(i, 1);
                            //break;
                        }
                    }
                } else if (arg && typeof arguments[1] === 'function') {
                    for (i = 0; i < max; i += 1) {
                        if (subscribers[i].fn === arg) {
                            subscribers.splice(i, 1);
                            //break;
                        }
                    }
                }
            } else if (arguments.length === 3) {
                f = typeof arguments[1] === 'function' ? arguments[1] : arguments[2];
                con = typeof arguments[2] === 'object' ? arguments[2] : arguments[1];
                for (i = 0; i < max; i += 1) {
                    if (subscribers[i].fn === f && subscribers[i].context === con) {
                        subscribers.splice(i, 1);
                        break;
                    }
                }
            }
        },
        this.fire = function(type) {
            var pubtype = type || 'global',
                subscribers = this.subscribers[pubtype],
                i, max = subscribers ? subscribers.length : 0;
            for (i = 0; i < max; i += 1) {
                var args = Array.prototype.slice.call(arguments).slice(1, arguments.length);
                subscribers[i].fn.apply(subscribers[i].context, args);
            }
        }
    }
});
