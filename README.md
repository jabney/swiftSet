swiftSet.js
===========

swiftSet.js provides a javascript `Set` data type for storing unique values and performing basic set operations _swiftly_. It also includes a discrete-value `Histogram` class which is used as a backing object for `Set`, although it can also be used on its own. swiftSet can handle numeric values, strings, and objects if they're properly configured. Virtually any type of object can be part of a `Set`. 

Contents
+ [Set](#set)
  + [Usage](#usage)
    + [Set Operations](#set-operations)
    + [Sets of Objects](#sets-of-objects)
      + [The `toString` Method](#the-tostring-method)
      + [The Object `key` Method](#the-object-key-method)
      + [The Global Key Method](#the-global-key-method)
    + [Mixed Values](#mixed-values)
      + [How the wrapper works](#how-the-wrapper-works)
      + [Specify a custom `toString` method for the wrapper](#specify-a-custom-tostring-method-for-the-wrapper)
    + [Static Set Operations](#static-set-operations)
  + [How `Set` uses `Histogram` For Fast Operations](#how-set-uses-histogram-for-fast-operations)
+ [Histogram](#histogram)

## Set
This section describes how to get started using `Set` then describes its methods as well as how to work with objects and mixed values.

**Note:** the order of items in a set is *undefined*.

### Usage

Include a reference to swiftSet.js in your project.

`<script type="text/javascript" src="swiftSet.js"></script>`

Import `Set` from the swiftSet namespace into whichever context you want to use it in.

```javascript
var 
// Import swiftSet's Set class.
Set = swiftSet.Set,
```
Create a new set.

```javascript
// Create an empty set and then add items...
set = new Set().add(1, 2, 2, 3, 3, 3), // (1, 2, 3),

// ...or pass an array of items to the constructor.
set = new Set([1, 2, 2, 3, 3, 3]); // (1, 2, 3);
```

#### More

```javascript
var
// Import Set
Set = swiftSet.Set,

// Create a new set.
set = new Set(['a', 'b', 'c']); // ('a', 'b', 'c')

// Add items to the set.
set.add('d', 'e'); // ('a', 'b', 'c', 'd', 'e')

// Remove items from the set.
set.remove('a', 'b'); // ('c', 'd', 'e')

// Add items to the set via an array.
set.addItems(['a', 'b']); // ('a', 'b', 'c', 'd', 'e')

// Remove items from the set via an array.
set.removeItems(['d', 'e']); // ('a', 'b', 'c')

// Get the number of items in the set.
set.size(); // => 3

// Determine if the set has a specific item.
set.has('a'); // => true
set.has('e'); // => false

// Get an array of items in the set.
set.items(); // => ['a', 'b', 'c']

// Iterate over items in the set.
set.each(function(item) {
  console.log(item); // 'a', 'b', 'c'
});
// ... or, since set.items() returns an array ...
set.items().forEach(function(item) {
  console.log(item); // 'a', 'b', 'c'
});

// Copy a set.
var newSet = set.copy(); // ('a', 'b', 'c')
```

#### Set Operations
`Set` supports five basic set operations: union, intersection, difference, complement, and equals. `difference` is the symmetric difference, and `complement` is the relative complement.

```javascript
var
// Import.
Set = swiftSet.Set,

a = new Set([1, 2, 3]),
b = new Set([2, 3, 4]);

// Union A ∪ B joins two sets together.
a.union([2, 3, 4]); // => [1, 2, 3, 4]
a.union(b); // => [1, 2, 3, 4]

// Intersection A ∩ B returns elements common to both sets.
a.intersection([2, 3, 4]); // => [2, 3]
a.intersection(b); // => [2, 3]

// Symmetric Difference A ∆ B returns items not common to both sets.
a.difference([2, 3, 4]); // => [1, 4]
a.difference(b); // => [1, 4]

// Relative Complement A \ B returns elements in A 
// that are not also in B (A - B).
a.complement([2, 3, 4]); // => [1]
a.complement(b); // => [1];

// Equals A = B determines set equality.
a.equals([1, 2, 2, 3, 3]); // => true
a.equals(b); // => false
```

#### Sets of Objects
Objects can also be used in sets, but it requires an extra step &mdash; one of several options to return a unique key from an object. Every option requires that an object has some property to establish its uniqueness, to differentiate it from other objects. This is often some sort if unique value or identifier, and it acts as a key for when the item is added to `Set`'s internal histogram (at its core an object literal).

##### The `toString` Method
This method requires that the objects in the set all have a toString method which can return a unique identifier on the object.

```javascript
var
// Import.
Set = swiftSet.Set,

// Create a toString function that returns an object id.
toStr = function() {
  return this.id;
},

// Create objects with unique ids and add a reference to the toString function.
o1 = {id: 1, toString: toStr},
o2 = {id: 2, toString: toStr},
o3 = {id: 3, toString: toStr},
o4 = {id: 4, toString: toStr},

// Create two sets.
a = new Set([o1, o2, o2, o3, o3, o3]),
b = new Set([o2, o3, o4]);

// They should each have three items.
a.size(); // => 3
b.size(); // => 3

// Perform an operation.
a.union(b); // => [o1, o2, o3, o4]
```

**Note:** Since in the above case the objects are given ids of 1-4, they will have those keys in `Set`'s internal histogram, and so will match numbers `1` through `4` as well as strings `"1"` through `"4"`. If you're mixing objects with numbers or strings in a set, you must make sure that the objects' id values will not interfere, unless you're intention is to allow an object with `id: 1` to be treated as the same value as numeric `1` and string `"1"`. However, most likely not what you want. See [Mixed Values](#mixed-values) for information on how to make sure that numeric values and numeric strings can be treated as separate items in `Set`.

```javascript
var
// Import.
Set = swiftSet.Set,

// Determine how items with the same key are treated in a set.

o1 = {id: 1, toString: function() { return this.id; }},
set = new Set([1, "1", o1]);

// This set will only have one item.
set.size(); // => 1
set.has(1); // => true
set.has("1"); // => true
set.has(o1); // => true 
set.items() // => [1], this could also be ["1"] or [o1].
```

##### The Object `key` Method
This method requires that objects in the set each have a `key` property, and that the property is either a value or a function. This method is particularly useful when overriding an object's toString method is not an option, or when a set needs to contain [Mixed Values](#mixed-values) consisting of objects and numeric values and/or numeric strings.

```javascript
var
// Import.
Set = swiftSet.Set,

// Create objects with a value key.
o1 = {key: 1},
o2 = {key: 2},
o3 = {key: 3},
o4 = {key: 4},

// Create two sets.
a = new Set([o1, o1, o2, o3]),
b = new Set([o2, o3, o4]);

// They should both have three items.
a.size(); // => 3
b.size(); // => 3

// Perform an operation.
a.intersection(b); // => [o2, o3]

// Create a function to be used as a key retriever.
function key() {
  return this.id;  
}

o1 = {id: 1, key: key},
o2 = {id: 2, key: key},
o3 = {id: 3, key: key},
o4 = {id: 4, key: key},

// Create two sets.
a = new Set([o1, o2, o3]),
b = new Set([o2, o3, o4]);

// They should both have three items.
a.size(); // => 3
b.size(); // => 3

// Perform an operation.
a.difference(b); // => [o1, o4]
```

##### The Global Key Method
This method requires that a `key` property or function is specified in `Set`'s constructor. The effective difference between this method and the [Object `key` Method](#the-object-key-method) is that when a global key is specified, it's expected that every item in the set will be an object with that property; whereas objects making use of the [Object `key` Method](#the-object-key-method) can be mixed with other values in the set. See [Mixed Values](#mixed-values) for more information.

```javascript
var
// Import.
Set = swiftSet.Set,

// Create objects with a unique identifier.
o1 = {id: 1},
o2 = {id: 2},
o3 = {id: 3},
o4 = {id: 4},

// Create two sets and specify a value key.
a = new Set([o1, o1, o2, o3], 'id'),
b = new Set([o2, o3, o4], 'id');

// They should both have three items.
a.size(); // => 3
b.size(); // => 3

// Perform an operation.
a.complement(b); // => [o1]

// Create a function to be used as a key retriever.
function getId() {
  return this.id;  
}

// Create two sets and specify a function key.
a = new Set([o1, o2, o3], getId),
b = new Set([o2, o3, o4], getId);

// They should both have three items.
a.size(); // => 3
b.size(); // => 3

// Perform an operation.
a.intersection(b); // => [o2, o3]
```

#### Mixed Values

The issue with mixing and matching numeric and string values is that the numeric value `1` and the string `"1"` both evaluate to `"1"` when used as a key in an object literal, which is used in `Set`'s underlying histogram. swiftSet gets around this limitation by providing functionality to give numeric values and numeric strings (or other types) a wrapper object which returns a unique key according to the type of value. 

```javascript
var
// Import.
Set = swiftSet.Set,

// Get the wrap helper.
wrap = Set.wrapObj(),

// Import the wrapped evaluator.
isWrapped = Set.isWrapped,

// Create an array of mixed values and wrap them.
items = [1, '1', 2, '2'].map(function(item) {
  return wrap(item);
}),

// Create a set with the wrapped items.
set = new Set(items);

// There should be four items in the set.
set.size(); // => 4

// Check that the items exist.
set.has(wrap(1)); // => true
set.has(wrap('1')); // => true
set.has(wrap(2)); // => true
set.has(wrap('2')); // true

// Get an array of the wrapped items.
set.items(); // => [{item: 1, ...}, {item: '1', ...}, {item: 2, ...}, ...]

// Get an array of the unwrapped items.
set.unwrap(); // => [1, '1', 2, '2']

// Objects can also be added, as long as they have an object key
// (or a toString method).
var o1 = {key: 'o1'},
o2 = {key: 'o2' };

// Add objects to set (these are not wrapped).
set.add(o1, o2);

// Manually unwrap items.
set.items().map(function(item) {
  return isWrapped(item) ? item.item : item;
}); // => [1, '1', 2, '2', {key: 'o1'}, {key: 'o2'}]
```

##### How the wrapper works
`Set.wrapObj()` creates a wrapper object with two properties: an `item` property which hods the original value of the item and a `toString` method that encodes the value's type as part of its key.

```javascript

var
// Import.
Set = swiftSet.Set,

wrap = Set.wrapObj();
wrap(1); // => Wrapper {item: 1, toString: function(){...}}
wrap('1'); // => Wrapper {item: '1', toString: function(){...}}
wrap({id:1}); // => Wrapper {item: {id:1}, toString: function() {...}}
```

In the first instance `toString` returns a key with the value `(1:4)` which has the format `(key:typecode)`. `typecode` is a numeric value that represents a built-in type, in this case, `Number`. 

In the second instance `toString` returns a key with the value `(1:5)`. The numeric code `5` represents the built-in type `String`.

**Note:** The numeric typecode is generated internally and its actual value is arbitrary. The important thing is that different types produce different typecodes, so that even values which have the same key, such as `1` and `"1"`, end up encoding with different keys in the wrapper because they're of different types. For more insight into how the type is encoded, see the `swiftSet.js` code.

In the third instance `toString` returns a key with the value `([object Object]:6)`. The numeric code `6` represents the built-in type `Object`. However this key is useless: _every object literal will produce this exact key_. If you want to wrap object literals, you must specify a custom `toString` method for the wrapper. See [Specify a custom `toString` method for the wrapper](#specify-a-custom-tostring-method-for-the-wrapper) below.

##### Specify a custom `toString` method for the wrapper
If for some reason the wrapper's default `toString` method doesn't meet your needs, such as for some type of custom object, a `toString` method can be specified in the call to `Set.wrapObj()`.

```javascript
var
// Import.
Set = swiftSet.Set,

// Specify a custom toString method for the wrapper.
wrap = Set.wrapObj(function() { return 'id' + this.item.id; }),

// Manually wrap an array of objects.
items = [{id: 1}, {id: 2}, {id: 3}].map(function(item) {
  return wrap(item);
}), // => [{item: {id:1}, toString: function() {...}}, ...]

// Create a set of the items.
set = new Set(items);

// The set should have three items.
set.size(); // => 3

// Check that each item exists.
set.has(wrap(items[0])); // => true
set.has(wrap(items[1])); // => true
set.has(wrap(items[2])); // => true

// Get an array of unwrapped items.
set.unwrap(); // => [{id: 1}, {id: 2}, {id: 3}] 
```
In the above example the items have the keys `"id1"`, `"id2"` and `"id3"` as supplied by the specified `toString` function.

#### Static Set Operations
swiftSet.js provides class-level set operations, or _static methods_ for performing `union`, `intersection`, `difference`, `complement`, and `equals` without the need to instantiate a `Set` object. These are low overhead implementations and will typically execute faster than their `Set.prototype` equivalents. However they maintain no state; no persistent objects need to be created, and they operate on two arrays of values. 

```javascript
var
// Import.
Set = swiftSet.Set,

// Create two arrays of values.
a = [1, 1, 2, 3],
b = [2, 3, 4, 4];

Set.union(a, b); // => [1, 2, 3, 4]
Set.intersection(a, b); // => [2, 3]
Set.difference(a, b); // => [1, 4]
Set.complement(a, b); // => [1]
Set.equals(a, b); // => false
Set.equals(a, [1, 2, 2, 3]); // => true
```

Objects can be used with these operations as long as they have their own toString method, or are wrapped. There are no other custom key options that work for values used with these static methods.

```javascript
var
// Import.
Set = swiftSet.Set,
wrap = Set.wrapObj(function() { return this.item.id; }),

// Create two arrays of objects.
a = [{id:1}, {id:2}, {id:3}].map(function(item) {
  return wrap(item);  
}),
b = [{id:2}, {id:3}, {id:4}].map(function(item) {
  return wrap(item);
});

// Pefrom some operations and unwrap the result.

Set.union(a, b).map(function(item) {
  return item.item;
}); // => [{id:1}, {id:2}, {id:3}, {id:4}]

Set.intersection(a, b).map(function(item) {
  return item.item;
}); // => [{id:2}, {id:3}]

Set.difference(a, b).map(function(item) {
    return item.item;
}); // => [{id:1}, {id:4}]

Set.complement(a, b).map(function(item) {
  return item.item;
}); // => [{id:1}]

// No need to unwrap anything for equals.

Set.equals(a, b); // => false
Set.equals(a, [{id:1}, {id:2}, {id:3}]); // => true
```

There may be other situations where one of these methods comes in handy. 

For instance, to remove duplicate items from an array, use `Set.union()`.

```javascript
var
// Import.
Set = swiftSet.Set;

// Remove duplicate items from an array.
Set.union([1, 1, 2, 2, 3, 3], []); // => [1, 2, 3]

// The above is equivalent to this.
new Set([1, 1, 2, 2, 3, 3]).items(); // => [1, 2, 3]
```

To remove unwanted values from an array of unique values, use `Set.complement()`.

```javascript
var
// Import.
Set = swiftSet.Set;

// Remove unwanted items.
Set.complement(['a', 'b', 'c'], ['c']); // => ['a', 'b']

// The above is equivalent to this.
new Set(['a', 'b', 'c']).remove('c'); // =? ['a', 'b']
```

### How `Set` uses `Histogram` For Fast Operations
As the name implies, `swiftSet.js` is _swift_. Operations are fast even for large arrays. `Set` operations make use of two discrete-value histograms and merges them together to get a complete picture of the relation of one set to another. 

Here's what a histogram constructed from an array of values looks like conceptually:

```javascript
var
// Import.
Set = swiftSet.Set,

// Create a set.
set = new Set([1, 1, 2, 2, 2, 3]); // (1, 2, 3)

// Internally the set's histogram looks something like this:
// 
//   |
// 3 |     ***
// 2 | *** ***
// 1 | *** *** ***
// --------------------
//   |  1 | 2 | 3 |
// 
// The `x` axis represents the values in the set, and the `y` axis represents
// the frequency of that value's occurrence in the original array. Value 1 has
// two entries, value 2 has three, and 3 has one entry. This reflects the
// composition original array [1, 1, 2, 2, 2, 3] although the order of items
// is undefined. The internal histogram contains enough information to rebuild
// the original array except for the order of its values.
```

There's no interface in `Set` that exposes the structure of the histogram. If you wish to make use of this type of data, construct a `Histogram` object, which is available with `swiftSet`. See the [Histogram](#histogram) class documentation below.

Set operations build two histograms, one to represet each set of values, after which both histograms are _normalized_ and _merged_. The first set `a` gets its histogram normalized to `1` and the second set `b` gets its values normalized to `2`. This destroys the information about the original composition of the array but it creates a new layer of information about the members of each set, their similarities, and their differences.

```javascript
// Two histograms are created for each set during an operation. Then they
// are normalized and merged.
//
var
// Import.
Set = swiftSet.Set,

// Create two sets.
a = new Set([1, 1, 2, 2, 2, 3]), // (1, 2, 3)
b = new Set([2, 2, 3, 4, 4, 4]); // (2, 3, 4)

// Perform any operation.
a.union(b); // => [1, 2, 3, 4]
a.intersection(b); // => [2, 3]
a.difference(b); // => [1, 4]
a.complement(b); // => [1]

// Histograms before normalization.
//
//         a                       b
//   |                      |
// 3 |     ***            3 |         ***
// 2 | *** ***            2 | ***     ***
// 1 | *** *** ***        1 | *** *** ***
// -----------------      -----------------
// a |  1 | 2 | 3 |       b |  2 | 3 | 4 |
// 
//
// Histograms after normalization (`a` is normalized to `1` and `b` to `2`).
//
//         a                       b
//   |                      |
// 3 |                    3 |
// 2 |                    2 | *** *** ***
// 1 | *** *** ***        1 | *** *** ***
// -----------------      -----------------
// a |  1 | 2 | 3 |       b |  2 | 3 | 4 |
//
```

When the histograms are additively merged, a picture of the two sets' properties emerges. Items exclusively in set `a` have a frequency value of `1`. Items exclusively in set `b` have a frequency value of `2`. Items common to both sets have a frequency value of `3`. Continuing from the previous example,

```javascript
// The merged histograms during a set operation combine additively
// to make a single histogram.
// 
//                       a+b
//   |
// 3 |           ********* *********           --- max
// 2 |           ********* ********* *********
// 1 | ********* ********* ********* ********* --- min
// --------------------------------------------
//   |     1    |    2    |    3    |    4    |
//   | items in |      items in     |items in |
//   |     a    |      both sets    |    b    |
//
```

That information is sufficient to perform all five included set operations, although the `equals` operation is calculated differently from the other four. `Set` operations abstract the concept of an _evaluator_, which is called as the process iterates over the items in the histogram and builds the output based on whether the evaluator returns true or false. 

When performing a `union` all frequencies are valid, so all the items are returned in the output.
`return true` `=>` `[1, 2, 3, 4]`

When performing an `intersection` only items with a frequency of three are returned in the output.
`return freq === 3` `=>` `[2, 3]`

When performing a `difference` only items with frequencies less than three are returned.
`return freq < 3` `=>` `[1, 4]`

When performing a `complement` only items with frequencies of one are returned.
`return freq === 1` `=>` `[1]`

The `equals` operation returns true if the `min` frequency and the `max' frequency are both three. Equivalent sets have the same items, hence the same frequencies after the merge. `equals` doesn't use an evaluator, rather it 

```javascript
var
// Import.
Set = swiftSet.Set,

// Create two equivalent sets.
a = new Set([1, 1, 2, 3, 3, 3]), (1, 2, 3)
b = new Set([1, 2, 2, 2, 3, 3]), (1, 2, 3)

// Perform equals operation.
a.equals(b); // => true

// Histograms after normalization but before merge.
//
//         a                       b
//   |                      |
// 3 |                    3 |
// 2 |                    2 | *** *** ***
// 1 | *** *** ***        1 | *** *** ***
// -----------------      -----------------
// a |  1 | 2 | 3 |       b |  1 | 2 | 3 |
//
//
// Histogram after merge. 
//
//                  a+b
//   |
// 3 | ********* ********* ********* --- min, max
// 2 | ********* ********* *********
// 1 | ********* ********* *********
// ----------------------------------
// a |     1    |    2    |    3    |
//
```
Comparing the above with the previous merged histogram example, you can see that the former has a `min` frequency of one and a `max` frequency of three, hence the sets are not equal. In the latter example, where both sets contain the same items, the histogram is flat. The `min` and `max` frequencies are both three.

<!---
### About Keys
```javascript

```
-->


