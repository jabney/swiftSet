swiftSet.js
===========

swiftSet.js provides a `Set` data type for storing unique values and performing basic set operations _swiftly_. It also includes a discrete-value `Histogram` class which is used as a backing object for `Set`, although it can also be used on its own. swiftSet can handle numeric values, strings, and objects if they're properly configured. Virtually any type of object can be part of a `Set`. 

# Set
This section describes how to get started using `Set` then describes its methods as well as how to work with sets of objects and mixed values.

## Usage

Include a reference to swiftSet.js in your project.

`<script type="text/javascript" src="swiftSet.js"></script>`

Import `Set` from the swiftSet namespace to whichever context you want to use it in.

```javascript
// Import swiftSet's Set class.
var Set = swiftSet.Set;
```

Create a new set.

```javascript
// Create an empty set and then add values...
var set = new Set().add(1, 2, 2, 3, 3, 3), // (1, 2, 3)

// ...or pass an array of values to the constructor.
set = new Set([1, 2, 2, 3, 3, 3]); // (1, 2, 3)
```
### More

```javascript

var Set = swiftSet.Set;

One issue with mixing and matching numeric and string values is that the numeric value `1` and the string `"1"` both evaluate to `"1"` when used as a key in an object literal, which is used in the underlying histogram. swiftSet gets around this limitation by providing functionality to give numeric values and numeric strings (or any type for that matter) a wrapper object which returns a unique key according to the type of value.
