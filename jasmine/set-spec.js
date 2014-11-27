(function(swiftSet) {
'use strict'

// Imports
var
  // Histogram = swiftSet.Histogram,
  Set = swiftSet.Set
;

function key() {
  return this.id;
}

var

t1 = { id: 't1', toString: key },
t2 = { id: 't2', toString: key },
t3 = { id: 't3', toString: key },
t4 = { id: 't4', toString: key },
t5 = { id: 't5', toString: key },

o1 = { id: 'o1' },
o2 = { id: 'o2' },
o3 = { id: 'o3' },
o4 = { id: 'o4' },
o5 = { id: 'o5' };

describe('Set', function() {

  beforeEach(function() {

  });

  describe('initialization', function() {

    it('creates an accurate set of numbers', function() {
      var num = [7, 7, 8, 8, 9, 9];
      var set = new Set(num);

      expect(set.has(1)).toBe(false);
      expect(set.has(7)).toBe(true);
      expect(set.has(8)).toBe(true);
      expect(set.has(9)).toBe(true);
      expect(set.size()).toEqual(3);
    });
    
    it('creates an accurate set of characters', function() {
      var chr = ['a', 'a', 'b', 'b', 'c', 'c'];
      var set = new Set(chr);

      expect(set.has('x')).toBe(false);
      expect(set.has('a')).toBe(true);
      expect(set.has('b')).toBe(true);
      expect(set.has('c')).toBe(true);
      expect(set.size()).toEqual(3);
    });

    it('creates an accurate set of objects', function() {
      var obj = [t1, t1, t2, t2, t3, t3];
      var set = new Set(obj);

      expect(set.has(t4)).toBe(false);
      expect(set.has(t1)).toBe(true);
      expect(set.has(t2)).toBe(true);
      expect(set.has(t3)).toBe(true);
      expect(set.size()).toEqual(3);
    });

  });
  
  describe('mutability', function() {

    it('accurately adds and removes one or more numbers', function() {
      var num = [1, 2, 2, 3, 3, 3];
      var set = new Set(num);
    
      set.add(3).add(4, 5)
        .remove(1, 2);

      expect(set.has(1)).toBe(false);
      expect(set.has(2)).toBe(false);
      expect(set.has(3)).toBe(true);
      expect(set.has(4)).toBe(true);
      expect(set.has(5)).toBe(true);
      expect(set.size()).toEqual(3);

      expect(set.items()).not.toContain(1);
      expect(set.items()).not.toContain(2);
      expect(set.items()).toContain(3);
      expect(set.items()).toContain(4);
      expect(set.items()).toContain(5);
      expect(set.items().length).toEqual(3);
      
      set = new Set(num)
        .addItems([3, 4, 4, 5, 5])
        .removeItems([1, 2]);

      expect(set.has(1)).toBe(false);
      expect(set.has(2)).toBe(false);
      expect(set.has(3)).toBe(true);
      expect(set.has(4)).toBe(true);
      expect(set.has(5)).toBe(true);
      expect(set.size()).toEqual(3);

      expect(set.items()).not.toContain(1);
      expect(set.items()).not.toContain(2);
      expect(set.items()).toContain(3);
      expect(set.items()).toContain(4);
      expect(set.items()).toContain(5);
      expect(set.items().length).toEqual(3);
      
    });

    it('accurately adds and removes one or more characters', function() {
      var chr = ['a', 'b', 'b', 'c', 'c', 'c'];
      var set = new Set(chr);
    
      set.add('c').add('d', 'e')
        .remove('a', 'b');

      expect(set.has('a')).toBe(false);
      expect(set.has('b')).toBe(false);
      expect(set.has('c')).toBe(true);
      expect(set.has('d')).toBe(true);
      expect(set.has('e')).toBe(true);
      expect(set.size()).toEqual(3);

      expect(set.items()).not.toContain('a');
      expect(set.items()).not.toContain('v');
      expect(set.items()).toContain('c');
      expect(set.items()).toContain('d');
      expect(set.items()).toContain('e');
      expect(set.items().length).toEqual(3);
      
      set = new Set(chr)
        .addItems(['c', 'd', 'd', 'e', 'e'])
        .removeItems(['a', 'b']);

      expect(set.has('a')).toBe(false);
      expect(set.has('b')).toBe(false);
      expect(set.has('c')).toBe(true);
      expect(set.has('d')).toBe(true);
      expect(set.has('e')).toBe(true);
      expect(set.size()).toEqual(3);

      expect(set.items()).not.toContain('a');
      expect(set.items()).not.toContain('v');
      expect(set.items()).toContain('c');
      expect(set.items()).toContain('d');
      expect(set.items()).toContain('e');
      expect(set.items().length).toEqual(3);
    });

    it('accurately adds and removes one or more objects', function() {
      var obj = [t1, t2, t2, t3, t3, t3];
      var set = new Set(obj);
    
      set.add(t3).add(t4, t5)
        .remove(t1, t2);

      expect(set.has(t1)).toBe(false);
      expect(set.has(t2)).toBe(false);
      expect(set.has(t3)).toBe(true);
      expect(set.has(t4)).toBe(true);
      expect(set.has(t5)).toBe(true);
      expect(set.size()).toEqual(3);

      expect(set.items()).not.toContain(t1);
      expect(set.items()).not.toContain(t2);
      expect(set.items()).toContain(t3);
      expect(set.items()).toContain(t4);
      expect(set.items()).toContain(t5);
      expect(set.items().length).toEqual(3);
      
      set = new Set(obj)
        .addItems([t3, t4, t4, t5, t5])
        .removeItems([t1, t2]);

      expect(set.has(t1)).toBe(false);
      expect(set.has(t2)).toBe(false);
      expect(set.has(t3)).toBe(true);
      expect(set.has(t4)).toBe(true);
      expect(set.has(t5)).toBe(true);
      expect(set.size()).toEqual(3);

      expect(set.items()).not.toContain(t1);
      expect(set.items()).not.toContain(t2);
      expect(set.items()).toContain(t3);
      expect(set.items()).toContain(t4);
      expect(set.items()).toContain(t5);
      expect(set.items().length).toEqual(3);
    });

    it('can clear a set and initialize it with new values', function() {
      var
      a = [o1, o1, o2, o3, o3],
      b = [o2, o2, o3, o4, o5],
      s1 = new Set(a, function() { return this.id; }), s2;

      expect(s1.size()).toEqual(3);
      expect(s1.has(o1)).toEqual(true);
      expect(s1.has(o2)).toEqual(true);
      expect(s1.has(o3)).toEqual(true);

      s2 = s1.clone().clear(b);

      expect(s2.size()).toEqual(4);
      expect(s2.has(o1)).toEqual(false);
      expect(s2.has(o2)).toEqual(true);
      expect(s2.has(o3)).toEqual(true);
      expect(s2.has(o4)).toEqual(true);
      expect(s2.has(o5)).toEqual(true);
    });

    it('can be internally mutable with respect to set operations', function() {
      var a = new Set([1, 2, 3, 4, 5]).mutable();
      expect(a.size()).toEqual(5);

      a.intersection([2, 3, 4]); // (2, 3, 4)
      expect(a.size()).toEqual(3);
      expect(a.has(1)).toEqual(false);
      expect(a.has(2)).toEqual(true);
      expect(a.has(3)).toEqual(true);
      expect(a.has(4)).toEqual(true);
      expect(a.has(5)).toEqual(false);

      a.union([1, 5]);  // (1, 2, 3, 4, 5)
      expect(a.size()).toEqual(5);
      expect(a.has(1)).toEqual(true);
      expect(a.has(2)).toEqual(true);
      expect(a.has(3)).toEqual(true);
      expect(a.has(4)).toEqual(true);
      expect(a.has(5)).toEqual(true);

      a.difference([2, 3]); // (1, 4, 5)
      expect(a.size()).toEqual(3);
      expect(a.has(1)).toEqual(true);
      expect(a.has(2)).toEqual(false);
      expect(a.has(3)).toEqual(false);
      expect(a.has(4)).toEqual(true);
      expect(a.has(5)).toEqual(true);

      a.complement([1, 4]); // (5)
      expect(a.size()).toEqual(1);
      expect(a.has(1)).toEqual(false);
      expect(a.has(2)).toEqual(false);
      expect(a.has(3)).toEqual(false);
      expect(a.has(4)).toEqual(false);
      expect(a.has(5)).toEqual(true);
    });
  });

  describe('object key', function() {

    it('uses object toString method to implicity generate a key', function() {
      var
      set = new Set([t1, t2, t3, t4, t5]);

      expect(set.has(t1)).toEqual(true);
      expect(set.has(t2)).toEqual(true);
      expect(set.has(t3)).toEqual(true);
      expect(set.has(t4)).toEqual(true);
      expect(set.has(t5)).toEqual(true);
      expect(set.has({})).toEqual(false);
      expect(set.size()).toEqual(5);
    });
  });
  
  describe('global key', function() {

    it('uses an object function property', function() {
      var set = new Set([o1, o2, o2, o3, o3, o3], function() {
        return this.id;
      });

      expect(set.size()).toEqual(3);

      expect(set.has(o1)).toEqual(true);
      expect(set.has(o2)).toEqual(true);
      expect(set.has(o3)).toEqual(true);
      expect(set.has(o4)).toEqual(false);
    });
  });

  describe('iteration', function() {

    it('properly iterates over the set', function() {
      var set = new Set([7, 8, 8, 9, 9, 9]),
      calls = { method: function() {}};
      spyOn(calls, 'method');

      set.each(function(item, count, key) {
        calls.method(item);
      });
      expect(calls.method).toHaveBeenCalledWith(7);
      expect(calls.method).toHaveBeenCalledWith(8);
      expect(calls.method).toHaveBeenCalledWith(9);
      expect(calls.method).not.toHaveBeenCalledWith(0);
    });

    it('produces a correct list of items', function() {
      var set = new Set([7, 8, 8, 9, 9, 9]),
        values = set.items();

      expect(values).toContain(7);
      expect(values).toContain(8);
      expect(values).toContain(9);
      expect(values.length).toEqual(3);
    });
  });

  describe('key', function() {

    it('generates a unique key for numbers', function() {
      var set1 = new Set([7, 8, 8, 9, 9, 9]),
      set2 = new Set([7, 8, 9]),
      set3 = new Set([3, 4, 5]);

      expect(set1.keyify()).toEqual('{7:4,8:4,9:4}');
      expect(set1.keyify()).toEqual(set2.keyify());
      expect(set1.keyify()).not.toEqual(set3.keyify());
    });
    
    it('generates a unique key for characters', function() {
      var set1 = new Set(['7', '8', '8', '9', '9', '9']),
        set2 = new Set(['7', '8', '9']),
        set3 = new Set(['3', '4', '5']);

      expect(set1.keyify()).toEqual('{7:5,8:5,9:5}');
      expect(set1.keyify()).toEqual(set2.keyify());
      expect(set1.keyify()).not.toEqual(set3.keyify());
    });

    it('generates a unique key for objects', function() {
      var set1 = new Set([o1, o2, o2, o3, o3, o3], key),
        set2 = new Set([o1, o2, o2, o3, o3, o3], key),
        set3 = new Set([o3, o4, o5], key);

      expect(set1.keyify()).toEqual('{o1:6,o2:6,o3:6}');
      expect(set1.keyify()).toEqual(set2.keyify());
      expect(set1.keyify()).not.toEqual(set3.keyify());
    });

    it('can treat strings and numbers differently (with wrap)', function() {
      var wrap = Set.wrapObj(),
      set1 = new Set()
        .add(wrap(1),wrap(2),wrap(2),wrap(3),wrap(3),wrap(3)),
      set2 = new Set()
        .add(wrap('1'),wrap('2'),wrap('2'),wrap('3'),wrap('3'),wrap('3'));

      expect(set1.has(wrap(1))).toEqual(true);
      expect(set1.has(wrap(2))).toEqual(true);
      expect(set1.has(wrap(3))).toEqual(true);
      expect(set1.has(wrap('3'))).toEqual(false);

      expect(set2.has(wrap('1'))).toEqual(true);
      expect(set2.has(wrap('2'))).toEqual(true);
      expect(set2.has(wrap('3'))).toEqual(true);
      expect(set2.has(wrap(3))).toEqual(false);

      expect(set1.keyify()).not.toEqual(set2.keyify());
      set1.addItems(set2.items());
      expect(set1.size()).toEqual(6);
    });

    it('correctly determines set equivalence', function() {
      var set1 = new Set([7, 8, 8, 9, 9, 9]),
        set2 = new Set([7, 8, 9]),
        set3 = new Set([6, 7, 8]);
      expect(set1.equals(set2)).toEqual(true);
      expect(set1.equals(set3)).toEqual(false);
    });

    it('can use sets as items in a set', function() {
      var s1 = new Set([1, 2, 3, 3, 3, 3]),
        s2 = new Set([4, 5, 5, 6, 6, 6]),
        s3 = new Set([7, 8, 8, 9, 9, 9]),
        s4 = new Set([0]),
        set1 = new Set([s1, s2, s2, s3, s3, s3]),
        set2 = new Set([s1, s2, s3]),
        set3 = new Set([s2, s3, s4]);

      expect(set1.size()).toEqual(3);
      expect(set1.equals(set2)).toEqual(true);
      expect(set1.equals(set3)).toEqual(false);
    });
  });
  
  describe('mixed items', function() {
      var wrap = Set.wrapObj(), isWrapped = Set.isWrapped,
      set1 = new Set([wrap(1), wrap(1), '1', wrap(2), '2', t1, t2]),
      set2 = set1.clone();

    it('can build a mixed set of numbers, strings, and objects', function() {
      var values;

      expect(set1.size()).toEqual(6);
      expect(set1.has(wrap(1))).toEqual(true);
      expect(set1.has(wrap('1'))).toEqual(false);
      expect(set1.has('1')).toEqual(true);
      expect(set1.has(wrap(2))).toEqual(true);
      expect(set1.has('2')).toEqual(true);
      expect(set1.has(t1)).toEqual(true);
      expect(set1.has(wrap(t1))).toEqual(false);
      expect(set1.has(t2)).toEqual(true);
      expect(set1.equals(set2)).toEqual(true);

      expect(set2.size()).toEqual(6);
      expect(set2.has(wrap(1))).toEqual(true);
      expect(set2.has(wrap('1'))).toEqual(false);
      expect(set2.has('1')).toEqual(true);
      expect(set2.has(wrap(2))).toEqual(true);
      expect(set2.has('2')).toEqual(true);
      expect(set2.has(t1)).toEqual(true);
      expect(set2.has(wrap(t1))).toEqual(false);
      expect(set2.has(t2)).toEqual(true);
      expect(set2.equals(set2)).toEqual(true);

      values = set1.items().map(function(item) {
        return isWrapped(item) ? item.item : item;
      });

      expect(values).toContain(1);
      expect(values).toContain('1');
      expect(values).toContain(2);
      expect(values).toContain('2');
      expect(values).toContain(t1);
      expect(values).toContain(t2);

      values = set2.items().map(function(item) {
        return isWrapped(item) ? item.item : item;
      });

      expect(values).toContain(1);
      expect(values).toContain('1');
      expect(values).toContain(2);
      expect(values).toContain('2');
      expect(values).toContain(t1);
      expect(values).toContain(t2);
    });

    it('can use a custom toString method on a wrapper', function() {
      var
      wrap = Set.wrapObj(toStr),
      set = new Set([wrap(o1), wrap(o1), wrap(o2), wrap(o3)]);
      function toStr() { return this.item.id; }

      expect(set.size()).toEqual(3);
      expect(set.has(wrap(o1))).toEqual(true);
      expect(set.has(wrap(o2))).toEqual(true);
      expect(set.has(wrap(o3))).toEqual(true);
      expect(set.has(wrap(o4))).toEqual(false);
    });

    it('can properly unwrap values that are wrapped', function() {
      var values = set1.unwrap();

      expect(values).toContain(1);
      expect(values).toContain('1');
      expect(values).toContain(2);
      expect(values).toContain('2');
      expect(values).toContain(t1);
      expect(values).toContain(t2);
      expect(values.length).toEqual(6);

    });
  });

  describe('operations on numbers', function() {
    var set1 = new Set([1, 2, 3]),
    set2 = new Set([2, 3, 4]);

    it('can pefrom a proper union', function() {

      expect(set1.union(set2)).toContain(1);
      expect(set1.union(set2)).toContain(2);
      expect(set1.union(set2)).toContain(3);
      expect(set1.union(set2)).toContain(4);
      
      expect(set1.union([2, 3, 4])).toContain(1);
      expect(set1.union([2, 3, 4])).toContain(2);
      expect(set1.union([2, 3, 4])).toContain(3);
      expect(set1.union([2, 3, 4])).toContain(4);
    });

    it('can pefrom a proper intersection', function() {

      expect(set1.intersection(set2)).not.toContain(1);
      expect(set1.intersection(set2)).toContain(2);
      expect(set1.intersection(set2)).toContain(3);
      expect(set1.intersection(set2)).not.toContain(4);
      
      expect(set1.intersection([2, 3, 4])).not.toContain(1);
      expect(set1.intersection([2, 3, 4])).toContain(2);
      expect(set1.intersection([2, 3, 4])).toContain(3);
      expect(set1.intersection([2, 3, 4])).not.toContain(4);
    });

    it('can pefrom a proper difference', function() {

      expect(set1.difference(set2)).toContain(1);
      expect(set1.difference(set2)).not.toContain(2);
      expect(set1.difference(set2)).not.toContain(3);
      expect(set1.difference(set2)).toContain(4);
      
      expect(set1.difference([2, 3, 4])).toContain(1);
      expect(set1.difference([2, 3, 4])).not.toContain(2);
      expect(set1.difference([2, 3, 4])).not.toContain(3);
      expect(set1.difference([2, 3, 4])).toContain(4);
    });

    it('can pefrom a proper complement', function() {

      expect(set1.complement(set2)).toContain(1);
      expect(set1.complement(set2)).not.toContain(2);
      expect(set1.complement(set2)).not.toContain(3);
      expect(set1.complement(set2)).not.toContain(4);
      
      expect(set1.complement([2, 3, 4])).toContain(1);
      expect(set1.complement([2, 3, 4])).not.toContain(2);
      expect(set1.complement([2, 3, 4])).not.toContain(3);
      expect(set1.complement([2, 3, 4])).not.toContain(4);
    });

    it('can determine set equivalence', function() {
      var set1 = new Set([1, 1, 2, 2, 3, 3]),
      set2 = new Set([1, 2, 3]),
      set3 = new Set([2, 3, 4]);

      expect(set1.equals(set2)).toEqual(true);
      expect(set1.equals([1, 2, 3])).toEqual(true);
      expect(set1.equals(set3)).toEqual(false);
      expect(set1.equals([2, 3, 4])).toEqual(false);
    });
  });

  describe('operations on characters', function() {
    var set1 = new Set(['a', 'b', 'c']),
    set2 = new Set(['b', 'c', 'd']);

    it('can pefrom a proper union', function() {

      expect(set1.union(set2)).toContain('a');
      expect(set1.union(set2)).toContain('b');
      expect(set1.union(set2)).toContain('c');
      expect(set1.union(set2)).toContain('d');
      
      expect(set1.union(['b', 'c', 'd'])).toContain('a');
      expect(set1.union(['b', 'c', 'd'])).toContain('b');
      expect(set1.union(['b', 'c', 'd'])).toContain('c');
      expect(set1.union(['b', 'c', 'd'])).toContain('d');
    });

    it('can pefrom a proper intersection', function() {

      expect(set1.intersection(set2)).not.toContain('a');
      expect(set1.intersection(set2)).toContain('b');
      expect(set1.intersection(set2)).toContain('c');
      expect(set1.intersection(set2)).not.toContain('d');
      
      expect(set1.intersection(['b', 'c', 'd'])).not.toContain('a');
      expect(set1.intersection(['b', 'c', 'd'])).toContain('b');
      expect(set1.intersection(['b', 'c', 'd'])).toContain('c');
      expect(set1.intersection(['b', 'c', 'd'])).not.toContain('d');
    });

    it('can pefrom a proper difference', function() {

      expect(set1.difference(set2)).toContain('a');
      expect(set1.difference(set2)).not.toContain('b');
      expect(set1.difference(set2)).not.toContain('c');
      expect(set1.difference(set2)).toContain('d');
      
      expect(set1.difference(['b', 'c', 'd'])).toContain('a');
      expect(set1.difference(['b', 'c', 'd'])).not.toContain('b');
      expect(set1.difference(['b', 'c', 'd'])).not.toContain('c');
      expect(set1.difference(['b', 'c', 'd'])).toContain('d');
    });

    it('can pefrom a proper complement', function() {

      expect(set1.complement(set2)).toContain('a');
      expect(set1.complement(set2)).not.toContain('b');
      expect(set1.complement(set2)).not.toContain('c');
      expect(set1.complement(set2)).not.toContain('d');
      
      expect(set1.complement(['b', 'c', 'd'])).toContain('a');
      expect(set1.complement(['b', 'c', 'd'])).not.toContain('b');
      expect(set1.complement(['b', 'c', 'd'])).not.toContain('c');
      expect(set1.complement(['b', 'c', 'd'])).not.toContain('d');
    });

    it('can determine set equivalence', function() {
      var set1 = new Set(['a', 'a', 'b', 'b', 'c', 'c']),
      set2 = new Set(['a', 'b', 'c']),
      set3 = new Set(['b', 'c', 'd']);

      expect(set1.equals(set2)).toEqual(true);
      expect(set1.equals(['a', 'b', 'c'])).toEqual(true);
      expect(set1.equals(set3)).toEqual(false);
      expect(set1.equals(['b', 'c', 'd'])).toEqual(false);
    });
  });

  describe('operations on objects', function() {
    var set1 = new Set([t1, t2, t3]),
    set2 = new Set([t2, t3, t4]);

    it('can pefrom a proper union', function() {

      expect(set1.union(set2)).toContain(t1);
      expect(set1.union(set2)).toContain(t2);
      expect(set1.union(set2)).toContain(t3);
      expect(set1.union(set2)).toContain(t4);
      
      expect(set1.union([t2, t3, t4])).toContain(t1);
      expect(set1.union([t2, t3, t4])).toContain(t2);
      expect(set1.union([t2, t3, t4])).toContain(t3);
      expect(set1.union([t2, t3, t4])).toContain(t4);
    });

    it('can pefrom a proper intersection', function() {

      expect(set1.intersection(set2)).not.toContain(t1);
      expect(set1.intersection(set2)).toContain(t2);
      expect(set1.intersection(set2)).toContain(t3);
      expect(set1.intersection(set2)).not.toContain(t4);
      
      expect(set1.intersection([t2, t3, t4])).not.toContain(t1);
      expect(set1.intersection([t2, t3, t4])).toContain(t2);
      expect(set1.intersection([t2, t3, t4])).toContain(t3);
      expect(set1.intersection([t2, t3, t4])).not.toContain(t4);
    });

    it('can pefrom a proper difference', function() {

      expect(set1.difference(set2)).toContain(t1);
      expect(set1.difference(set2)).not.toContain(t2);
      expect(set1.difference(set2)).not.toContain(t3);
      expect(set1.difference(set2)).toContain(t4);
      
      expect(set1.difference([t2, t3, t4])).toContain(t1);
      expect(set1.difference([t2, t3, t4])).not.toContain(t2);
      expect(set1.difference([t2, t3, t4])).not.toContain(t3);
      expect(set1.difference([t2, t3, t4])).toContain(t4);
    });

    it('can pefrom a proper complement', function() {

      expect(set1.complement(set2)).toContain(t1);
      expect(set1.complement(set2)).not.toContain(t2);
      expect(set1.complement(set2)).not.toContain(t3);
      expect(set1.complement(set2)).not.toContain(t4);
      
      expect(set1.complement([t2, t3, t4])).toContain(t1);
      expect(set1.complement([t2, t3, t4])).not.toContain(t2);
      expect(set1.complement([t2, t3, t4])).not.toContain(t3);
      expect(set1.complement([t2, t3, t4])).not.toContain(t4);
    });

    it('can determine set equivalence', function() {
      var set1 = new Set([t1, t1, t2, t2, t3, t3]),
      set2 = new Set([t1, t2, t3]),
      set3 = new Set([t2, t3, t4]);

      expect(set1.equals(set2)).toEqual(true);
      expect(set1.equals([t1, t2, t3])).toEqual(true);
      expect(set1.equals(set3)).toEqual(false);
      expect(set1.equals([t2, t3, t4])).toEqual(false);
    });
  });

  describe('clone method', function() {

    it('can reliably clone a set', function() {
      var
      set1 = new Set([o1, o2, o2, o3, o3, o3], key),
      set2 = set1.clone();

      set2.add(o4, o5);
      expect(set2.size()).toEqual(5);
      expect(set2.has(o1)).toEqual(true);
      expect(set2.has(o2)).toEqual(true);
      expect(set2.has(o3)).toEqual(true);
      expect(set2.has(o4)).toEqual(true);
      expect(set2.has(o5)).toEqual(true);
    });
  });

  describe('static set operations on numbers', function() {
    it('can perform a union of two sets', function() {
      var s = swiftSet.Set;
      expect(s.union([1, 2, 3], [4, 5])).toContain(1);
      expect(s.union([1, 2, 3], [4, 5])).toContain(2);
      expect(s.union([1, 2, 3], [4, 5])).toContain(3);
      expect(s.union([1, 2, 3], [4, 5])).toContain(4);
      expect(s.union([1, 2, 3], [4, 5])).toContain(5);
    });
    it('can perform an intersection of two sets', function() {
      var s = swiftSet.Set;
      expect(s.intersection([1, 2, 3], [3, 4, 5])).not.toContain(1);
      expect(s.intersection([1, 2, 3], [3, 4, 5])).not.toContain(2);
      expect(s.intersection([1, 2, 3], [3, 4, 5])).toContain(3);
      expect(s.intersection([1, 2, 3], [3, 4, 5])).not.toContain(4);
      expect(s.intersection([1, 2, 3], [3, 4, 5])).not.toContain(5);
    });
    it('can perform a difference of two sets', function() {
      var s = swiftSet.Set;
      expect(s.difference([1, 2, 3], [3, 4, 5])).toContain(1);
      expect(s.difference([1, 2, 3], [3, 4, 5])).toContain(2);
      expect(s.difference([1, 2, 3], [3, 4, 5])).not.toContain(3);
      expect(s.difference([1, 2, 3], [3, 4, 5])).toContain(4);
      expect(s.difference([1, 2, 3], [3, 4, 5])).toContain(5);
    });
    it('can perform a complement of two sets', function() {
      var s = swiftSet.Set;
      expect(s.complement([1, 2, 3], [3, 4, 5])).toContain(1);
      expect(s.complement([1, 2, 3], [3, 4, 5])).toContain(2);
      expect(s.complement([1, 2, 3], [3, 4, 5])).not.toContain(3);
      expect(s.complement([1, 2, 3], [3, 4, 5])).not.toContain(4);
      expect(s.complement([1, 2, 3], [3, 4, 5])).not.toContain(5);
    });
    it('can determine set equality', function() {
      var s = swiftSet.Set;
      expect(s.equals([1, 2, 3, 3], [1, 1, 2, 2, 3])).toEqual(true);
      expect(s.equals([1, 2, 3], [3, 4, 5])).toEqual(false);
    });
  });

  describe('static set operations on objects', function() {

    beforeEach(function() {
      Set.pushUid(key);
    });

    afterEach(function() {
      Set.popUid();
    });

    it('can perform a union of two sets', function() {
      var s = swiftSet.Set;
      expect(s.union([o1, o1, o3], [o4, o5])).toContain(o1);
      expect(s.union([o1, o2, o3], [o4, o5])).toContain(o2);
      expect(s.union([o1, o2, o3], [o4, o5])).toContain(o3);
      expect(s.union([o1, o2, o3], [o4, o5])).toContain(o4);
      expect(s.union([o1, o2, o3], [o4, o5])).toContain(o5);
    });
    it('can perform an intersection of two sets', function() {
      var s = swiftSet.Set;
      expect(s.intersection([o1, o2, o3], [o3, o4, o5])).not.toContain(o1);
      expect(s.intersection([o1, o2, o3], [o3, o4, o5])).not.toContain(o2);
      expect(s.intersection([o1, o2, o3], [o3, o4, o5])).toContain(o3);
      expect(s.intersection([o1, o2, o3], [o3, o4, o5])).not.toContain(o4);
      expect(s.intersection([o1, o2, o3], [o3, o4, o5])).not.toContain(o5);
    });
    it('can perform a difference of two sets', function() {
      var s = swiftSet.Set;
      expect(s.difference([o1, o2, o3], [o3, o4, o5])).toContain(o1);
      expect(s.difference([o1, o2, o3], [o3, o4, o5])).toContain(o2);
      expect(s.difference([o1, o2, o3], [o3, o4, o5])).not.toContain(o3);
      expect(s.difference([o1, o2, o3], [o3, o4, o5])).toContain(o4);
      expect(s.difference([o1, o2, o3], [o3, o4, o5])).toContain(o5);
    });
    it('can perform a complement of two sets', function() {
      var s = swiftSet.Set;
      expect(s.complement([o1, o2, o3], [o3, o4, o5])).toContain(o1);
      expect(s.complement([o1, o2, o3], [o3, o4, o5])).toContain(o2);
      expect(s.complement([o1, o2, o3], [o3, o4, o5])).not.toContain(o3);
      expect(s.complement([o1, o2, o3], [o3, o4, o5])).not.toContain(o4);
      expect(s.complement([o1, o2, o3], [o3, o4, o5])).not.toContain(o5);
    });
    it('can determine set equality', function() {
      var s = swiftSet.Set;
      expect(s.equals([o1, o2, o3, o3], [o1, o1, o2, o2, o3])).toEqual(true);
      expect(s.equals([o1, o2, o3], [o3, o4, o5])).toEqual(false);
    });
  });


});

})(window.swiftSet, undefined);

