swiftSet.js
===========

swiftSet.js provides a `Set` data type for storing unique values and performing basic set operations _swiftly_. It also includes a discrete-value `Histogram` class which is used as a backing object for `Set`, although it can also be used on its own. swiftSet can handle numeric values, strings, and objects if they're properly configured. Virtually any type of object can be part of the `Set`. 

## Usage
=====
First, import `Set` from the swiftSet namespace.

```
// Import swiftSet's Set class.
var Set = swiftSet.Set;
```

Next create a new set.

```
// Create an empty set and then add values...
var set = new Set().add(1, 2, 2, 3, 3, 3), // (1, 2, 3)

// ...or pass an array of values to the constructor.
set = new Set([1, 2, 2, 3, 3, 3]); // (1, 2, 3)
```

One issue with mixing and matching numeric and string values is that the numeric value `1` and the string `"1"` both evaluate to `"1"` when used as a key in object literals. swiftSet gets around this limitation by providing wrapper functionality to give numeric values and numeric strings a wrapper object which returns a unique key according to the type of value.
