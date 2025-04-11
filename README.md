# json-response-gen

## :book: Table of Contents

- [Intentions](#tada-intentions)
- [Installation](#computer-installation)
- [Usage](#usage)
  - [Examples](#small-example)
  - [Classes](#classes)
    - [Builder](#builder)
    - [Custom](#custom)
    - [DateRange](#daterange)
    - [Option](#option)
    - [Regex](#regex)
    - [Repetition](#repetition)
    - [Shared](#shared)
  - [Quick Regex](#quick-regex)
- [Contribution Guidelines](#contribution-guidelines)
- [Todo](#todo)

<hr>

## :tada: Intentions

This is a helper tool to generate random data in a JSON shape when you know the shape of data samples but are unable to obtain any examples of it due to potential time or data constraints.

It should hopefully allow for more rapid iterating when design requirements are changing, or development on the data end begins to lag behind. This should allow you to easily modify the shape/template, rerun and once again have usable data samples for whatever purpose. It should also allow for some ease of sharing, such as if working with large amounts of data, one can share the template rather than files which are each hundred, or thousands of lines, then have the other person generate it locally.
This could lead to testing inconsistencies if youre comparing hard-coded values, so providing exhaustive built in testing functions is next on the chopping block.

Library allows for building multiple JSON objects or arrays, with potential links between data per use case. Contains some basic but helpful regex builders.

<div align="justify">

<hr>

## :computer: Installation

```
npm install json-response-gen --save-dev
```

<hr>

## Usage

It currently runs the template by default within `__jgen__/templates/index.js`, so you can define your build function there and stores results within `__jgen__/mocks`. Generation location can be changed by providing it to the `Builder` class.

After defining that you can add the following to your `package.json` to be able to generate off of `npm run jgen`

You can define a different location to look for the template `index.js` in through the `--dir` flag i.e. `--dir="__template__"`

```
...
"scripts": {
  ...
  "jgen": "jgen"
}
...
```

### Small Example

After creating the `index.js` file above in `__jgen__/templates/` you can define something like this to it. You can scale it to however large and complex you need it to be.

```typescript
const {
  ALPHA_1,
  Builder,
  Option,
  SELECTION_TYPES,
} = require('json-response-gen');

const shape = {
  name: ALPHA_1(6),
  items: [
    {
      itemName: ALPHA_1(4, 7),
      option: new Option(['big_dawg', 'smol_cat'], SELECTION_TYPES.RANDOM),
    },
  ],
};

const build = () => {
  new Builder({}).build(shape, 'success.json');
};

module.exports = build;
```

More examples can be seen [here](examples/).

### Classes

All of these also contain an alias `b` which is just the `build` function, you shouldnt have to worry about that though, that ones used internally.

#### Builder

This is the root class, you'll want to use this to wrap around your shape, and it also allows you to provide some options.

```typescript
/**
 * Simple Usage: Given no options, builds the shape and saves it to a file 'success.json' in the default __jgen__/mocks directory
 * Can hold on to the builder to chain.
 */
const builder = new Builder().build(shape, 'success.json');
```

<details>
  <summary>
    Detailed Information
  </summary>
<table>
  <tr>
    <td> Init/Methods </td> <td> Parameters/Examples </td>
  </tr>
  <tr>
  <td>

The constructor, takes options to customize the save location and add defaults

```typescript
new Builder(options);
```

  </td>
  <td>

```typescript
const options: {
  // Default number of repetitions when building arrays/Repetition class and given an array or not provided in Repetition, defaults to 3
  repetitions?: number;

  // Selection type for selecting value from Option class when not provided within the Option, defaults to IN_ORDER
  selectionType?: SelectionType;

  // Directory to write to, write directory defaults to __jgen__/mocks
  writeDir?: string;
};
```

  </td>
  </tr>
  <tr>
  <td>

Builds the given shape, and if given a file name, saves it to that.

```typescript

.build(shape: InputType, fileName?: string)
```

  </td>
  <td>

```typescript
// Any shape you wish to define, this is a small example
const shape = {
  hasItem: new Option([true, false]);
  users: [{
    id:  ALPHA_NUMERIC(10),
  }]
}

// If no writeDir was given to Builder, this example would save to __jgen__/mocks/subdir/filename.json
// Otherwise  it would save to `${writeDir}/subdir/filename.json`
fileName = 'subdir/filename.json'
```

  </td>
  </tr>

</table>
 
</details>

#### Custom

This is the custom class, simple, just provide a callback and it will call that function when it is its turn to build.For even lazier/quicker usage it has an alias as `C` so `new C(callback)` and `new Custom(callback)` do the same thing.

```typescript
/**
 * Simple Usage: Takes a callback which will be run the moment it is built.
 */
new Custom(() => `mockValue:${Math.random()}`);

// or
new C(() => `mockValue:${Math.random()}`);
```

<details>
  <summary>
    Detailed Information
  </summary>
<table>
  <tr>
    <td> Init/Methods </td> <td> Parameters/Examples </td>
  </tr>

  <tr>
  <td>

The constructor, takes callback to run and a spread option if callback generates object that should be spread instead of set to key.

```typescript
new Custom(callback: Function, shouldSpread = false);
```

  </td>
  <td>

```typescript
// Function to run when it is built.
callback: Function;

// If the callback returns an object or array, if it should spread that result instead of setting it on the given key.
shouldSpread: boolean;
```

  </td>
  </tr>

  <tr>
  <td>

Mainly used internally, but 'builds' the item, in this case, runs the callback given to the class instance. No use for the parameters as its user defined.

```typescript
build(buildOptions?: BuildProps, extraInfo?: {})

// or
b(buildOptions?: BuildProps, extraInfo?: {})
```

  </td>
  <td>

```typescript
// Build options passed down from the Builder instance, could be used to leverage other user defined info.
buildOptions?: BuildProps,

// Extra info passed down when sharing data with another generated object.
extraInfo?: {}: Function;
```

  </td>
  </tr>

  </table>
  </details>

#### DateRange

This is the DateRange class, rough and simple, returns a date within a range.

```typescript
/**
 * Simple Usage: Takes a range of +/- years to keep the random date within, if second param is true, the maximum date is the current date.
 */
new DateRange(10, true);
```

<details>
  <summary>
    Detailed Information
  </summary>
<table>
  <tr>
    <td> Init/Methods </td> <td> Parameters/Examples </td>
  </tr>

  <tr>
  <td>

The constructor, takes range for dates and if max date is the present

```typescript
new DateRange(range: number, maxToday = true);
```

  </td>
  <td>

```typescript
// Range of years to have dates within.
range: number;

// If the present day should be the latest date.
maxToday: boolean;
```

  </td>
  </tr>

  <tr>
  <td>

Mainly used internally, but 'builds' the date. In this case, no use for the parameters.

```typescript
build(buildOptions?: BuildProps, extraInfo?: {})

// or
b(buildOptions?: BuildProps, extraInfo?: {})
```

  </td>
  <td>

```typescript
// Build options passed down from the Builder instance, could be used to leverage other user defined info.
buildOptions?: BuildProps,

// Extra info passed down when sharing data with another generated object.
extraInfo?: {}: Function;
```

  </td>
  </tr>

  </table>
  </details>

#### Option

This is the Option class, it takes an array of options, and based on selection method, **in order** or **random** picks an object and handles its building.

```typescript
/**
 * Simple Usage: Takes an array of potential items, objects, array, and handles them in their respective manner, also takes in an object, which lets user decide which way to select items, and if to spread generated objects.
 */
new Option([1, 2, 3], { selectionType: SELECTION_TYPES.RANDOM });
```

<details>
  <summary>
    Detailed Information
  </summary>
<table>
  <tr>
    <td> Init/Methods </td> <td> Parameters/Examples </td>
  </tr>

  <tr>
  <td>

The constructor, takes options to select from location and options

```typescript
new Option(array: any[], options?: OptionProps);
```

  </td>
  <td>

```typescript
// Options from which to select from.
array: any[];

// If the present day should be the latest date.
options?: {

  // If the build returns an object, if it should spread that result instead of setting it on the given key.
  shouldSpread?: boolean;

   // Order in how items should be picked from provided array.
  selectionType?: string;
};
```

  </td>
  </tr>

  <tr>
  <td>

Mainly used internally, but 'builds' an option based on selectionType. If no selectionType was included, it uses the one from buildOptions, which defaults to IN_ORDER, if none provided there.

```typescript
build(buildOptions?: BuildProps, extraInfo?: {})

// or
b(buildOptions?: BuildProps, extraInfo?: {})
```

  </td>
  <td>

```typescript
// Build options passed down from the Builder instance, could be used to leverage other user defined info.
buildOptions?: BuildProps,

// Extra info passed down when sharing data with another generated object.
extraInfo?: {}: Function;
```

  </td>
  </tr>

  </table>
  </details>

#### Regex

This is the Regex class, it takes a regex pattern, and uses RandExp to randomly generate a string based on the inputted pattern

```typescript
/**
 * Simple Usage: Takes a regex pattern to be built
 */
new Regex(/^[A-Z]{5,10}$/);
```

<details>
  <summary>
    Detailed Information
  </summary>
<table>
  <tr>
    <td> Init/Methods </td> <td> Parameters/Examples </td>
  </tr>

  <tr>
  <td>

The constructor, takes a regex pattern

```typescript
new Regex(pattern: RegExp)
```

  </td>
  <td>

```typescript
// Pattern to use
pattern: RegExp,
```

  </td>
  </tr>

  <tr>
  <td>

Mainly used internally, but 'builds' the string from the pattern.

```typescript
build(buildOptions?: BuildProps, extraInfo?: {})

// or
b(buildOptions?: BuildProps, extraInfo?: {})
```

  </td>
  <td>

```typescript
// Build options passed down from the Builder instance, could be used to leverage other user defined info.
buildOptions?: BuildProps,

// Extra info passed down when sharing data with another generated object.
extraInfo?: {}: Function;
```

  </td>
  </tr>

  </table>
  </details>

#### Repetition

This is the Repetition class, basically the array one, but as their usage can get complex with nested arrays and a potential desire to share data, such as say responses, this class is lightly more complex.

Examples could be very helpful when you do want to share data between generations.

```typescript
/**
 * Simple Usage: Returns an array of length X of the shape provided
 */
new Repetition({ token: ALPHA(5, 10) }, { repetitions });
```

<details>
  <summary>
    Detailed Information
  </summary>
<table>
  <tr>
    <td> Init/Methods </td> <td> Parameters/Examples </td>
  </tr>

  <tr>
  <td>

The constructor, takes a shape, and options

```typescript
new Repetition(shape: any, options?: RepetitionProps)
```

  </td>
  <td>

```typescript
// Shape to build, similar to the one provided to builder.
shape: any,

options: {
   //Length of array if not shared, otherwise defaults to the one in buildOptions or 3
  repetitions?: number;

  // Path to the array it is to be built off of, if root object is an array, use '/'
  // For nested arrays, begin the path with a question mark.
  // i.e. if we have [ {token: "", arr: [{ id:"", name: "" }]}, {...} ], '/' would refer to the root arr, '?.arr' would refer to the nested array within the current item we're looking at.
  baseArrayPath?: string;

  // The keys to share from the other generation
  sharedKeysMap?: {

    // Array of keys from array you intend on using to share from
    toShare?: string[];

    /**
     * Object of oldKey: [newKey, newkey2]
     * We use an array so you can declare more keys to use the same value
     */
    toRename?: {
      [key: string]: string[];
    };
  };
}
```

  </td>
  </tr>

  <tr>
  <td>

Mainly used internally, but 'builds' the array from the shape, if provided with a path to go to, it will pass it onto `buildShared`.

```typescript
build(buildOptions?: BuildProps, extraInfo?: {})

// or
b(buildOptions?: BuildProps, extraInfo?: {})

// Similar functionality to build, in this case, extraInfo contains parent information if its a descendant of an array item
buildShared(buildOptions: BuildProps, extraInfo = {})
```

  </td>
  <td>

```typescript
// Build options passed down from the Builder instance, could be used to leverage other user defined info.
buildOptions?: BuildProps,

// Extra info passed down when sharing data with another generated object.
extraInfo?: {}: Function;
```

  </td>
  </tr>

  </table>
  </details>

#### Shared

This is the Shared class, a key in which to store the given `option` (a value to build or use) within a Map in the Builder. If no `option` is given, access is assumed and it looks for the stored value.

```typescript
/**
 * Simple Usage: Takes a key, and share  value, stores it, and allows reuse.
 */
new Shared('identifier', { value: ALPHA(5, 10) });
```

<details>
  <summary>
    Detailed Information
  </summary>
<table>
  <tr>
    <td> Init/Methods </td> <td> Parameters/Examples </td>
  </tr>

  <tr>
  <td>

The constructor, takes options to select from location and options

```typescript
new Shared(key: string, options?: SharedProps)
```

  </td>
  <td>

```typescript
// String to use as key for saving or access.
key: string;

// If the present day should be the latest date.
options?: {

  // If the build returns an object, if it should spread that result instead of setting it on the given key.
  shouldSpread?: boolean;

   // Value, shape, or class to use or build at first use or when reusing.
  value?: any;
};
```

  </td>
  </tr>

  <tr>
  <td>

Mainly used internally, but either 'builds' the value given. Or if no value was given, attempts to access the stored value.

```typescript
build(buildOptions?: BuildProps, extraInfo?: {})

// or
b(buildOptions?: BuildProps, extraInfo?: {})
```

  </td>
  <td>

```typescript
// Build options passed down from the Builder instance, could be used to leverage other user defined info.
buildOptions?: BuildProps,

// Extra info passed down when sharing data with another generated object.
extraInfo?: {}: Function;
```

  </td>
  </tr>

  </table>
  </details>

### Quick Regex

We also provide some quick regex functions to help speed up the process.

These are self explanatory, and if a little vague they should have comments on them when hovered over, or you can check out the code itself in [`src/utils/regexOptions.ts`](src/utils/regexOptions.ts)

These take a min and an optional max for length, if no max, then string will always be length of min

- `UPPER_ALPHA`
- `LOWER_ALPHA`
- `ALPHA`
- `ALPHA_1`
- `LOWER_ALPHA_NUMERIC`
- `UPPER_ALPHA_NUMERIC`
- `ALPHA_NUMERIC`
- `NUMERIC`

This one just takes a word count

- `ALPHA_PHRASE`

This one takes a length, min 9, and an optional domain, its not exhaustive, just a quick rough function.

- `EMAIL`

<hr/>

## Contribution Guidelines

To be honest not much, ideas can be bangers. Suggest some improvements or point out bugs please!

<hr>

### TODO::

- Tag and publish
- Make test functions exhaustive
- Transpile user defined files so they can use ES6 import, etc.

</div>
