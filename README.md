swiftSet.js
===========

swiftSet.js provides a `Set` data type for storing unique values and performing basic set operations _swiftly_. It also includes a discrete-value `Histogram` class which is used as a backing object for `Set`, although it can also be used on its own. swiftSet can handle numeric values, strings, and objects if they're properly configured. Virtually any type of object can be part of a `Set`. 

# Set
This section describes how to get started using `Set` then describes its methods as well as how to work with sets of objects and mixed values. **Note:** the order of items in a set is *undefined*.

## Usage

Include a reference to swiftSet.js in your project.

`<script type="text/javascript" src="swiftSet.js"></script>`

Import `Set` from the swiftSet namespace into whichever context you want to use it in.

```javascript
// Import swiftSet's Set class.
var Set = swiftSet.Set;
```

Create a new set.

```javascript
// Create an empty set and then add items...
var set = new Set().add(1, 2, 2, 3, 3, 3), // (1, 2, 3)

// ...or pass an array of items to the constructor.
set = new Set([1, 2, 2, 3, 3, 3]); // (1, 2, 3)
```
### More

```javascript
// Import Set
var Set = swiftSet.Set,

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

### Set Operations
`Set` supports five basic set operations: union, intersection, difference, complement, and equals. `difference` is the symmetric difference, and `complement` is the relative complement.

```javascript
var Set = swiftSet.Set;

var a = new Set([1, 2, 3]),
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

### Sets of Objects
Objects can also be used in sets, but it requires an extra step &mdash; one of several options to return a unique key from an object. Every option requires that an object has some property to establish its uniqueness, to differentiate it from other objeces. This is often some sort if ID value or unique identifier, and it acts as a key for when the item is added to `Set`'s internal histogram (at its core an object literal).

#### The `toString` Method
This method requires that the objects in the set all have a toString method which can return a unique identifier on the object.

```javascript

// Create a toString function that returns an object id.
function toStr() {
  return this.id;
}

// Create objects with unique ids and add a reference to the toString function.
var o1 = {id: 1, toString: toStr},
{id: 2, toString: toStr},
{id: 3, toString: toStr},
{id: 4, toString: toStr},

// Create two sets.
a = new Set([o1, o2, o2, o3, o3, o3]),
b = new Set([o2, o3, o4]);

// They should each have three items.
a.size(); // => 3
b.size(); // => 3

// Perform an operation.
a.union(b); // => [(o1), (o2), (o3), (o4)]
```

**Note:** Since in the above case the objects are given ids of 1-4, they will have those keys in the histogram, and so will match numbers `1` through `4` as well as strings `"1"` through `"4"`. If you're mixing objects with numbers or strings in a set, you must make sure that the objects' id values will not interfere, unless you're intention is to allow an object with `id: 1` to be treated as the same value as numeric `1` and string `"1"`. See [Mixed Values](#mixed-values) for information on how to make sure that numeric values and numeric strings can be treated as separate items in `Set`.

```javascript
// Determine how items with the same key are treated in a set.
var o1 = {id: 1, toString: function() { return this.id; }},
set = new Set([1, "1", o1]);

// This set will only have one item.
set.size(); // => 1
set.has(1); // => true
set.has("1"); // => true
set.has(o1); // => true
```

#### The Object `key` Method
This method requires that objects in the set all have a `key' property, and that the property is either a value or a function. This method is particularly useful when overriding an object's toString method is not an option.

```javascript

// Create objects with a value key.
var o1 = {key: 1},
o2 = {key: 2},
o3 = {key: 3},
o4 = {key: 4},

// Create two sets.
a = new Set([o1, o2, o3]),
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

var o1 = {id: 1, key: key},
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

#### The Global Key Method
This method requires that a key property or function is specified in `Set`'s constructor.

### Mixed Values

<!---
### About Keys
```javascript

```
-->

One issue with mixing and matching numeric and string values is that the numeric value `1` and the string `"1"` both evaluate to `"1"` when used as a key in an object literal, which is used in the `Set`'s underlying histogram. swiftSet gets around this limitation by providing functionality to give numeric values and numeric strings (or any type for that matter) a wrapper object which returns a unique key according to the type of value.

