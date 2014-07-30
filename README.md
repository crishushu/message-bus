# message-bus

UMD PubSub Implementation

## Documentation
This package provides a framework-agnostic PubSub implementation and contains the following API:

#### Register a listener
 `register(eventName, functionHandler, executionContext)`
#### Check for the existence of a registered listener object
 `isAlreadyRegistered(listener)`
#### Remove a listener by event name
 `remove(eventName)`
#### Trigger handler via event name
 `fire(eventName)`


## Getting Started
Install the module with: `npm install message-bus`


###### Registration of a listener:

```javascript
var messageBus = require('message-bus');

var users = [];

function User (arg) {
    // some constructor code here
}

messageBus.register('login', function(credentials){
    this.push(new User(credentials))
}, users);
```

###### Trigger the handler of the listener at some other place in your code:

```js
function login(credentials) {
    messageBus.fire('login', credentials);
}

```

<!--
## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
-->

## License
Copyright (c) 2014 Christian H. Schulz  
Licensed under the MIT license.
