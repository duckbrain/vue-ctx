# vue-ctx

Provide implicit context to components further down the tree. Similar to [context in React](https://reactjs.org/docs/context.html). See their docs for rational.

## How to use

Install the `vue-ctx` package from NPM and include it in your project with `Vue.use`

```js
import { VueCtx } from 'vue-ctx';

Vue.use(VueCtx);
```

### `ProvideContext` component

You can use the `ProvideContext` component in any component. You will likely want it on one of your higher level components. Values can be provided one of two ways.

- Single name and value `<ProvideContext name="foo" :value="2">`
- Object of multiple values `<ProvideContext :values="{foo: 2, hello: 'world'}">`

Values provided to the context are *merged* with contexts higher up the chain. Values lower down the chain will override values from higher up in their context.

`ProvideContext` may have any number of children, but it will insert a `<div>` tag with the class `vue-ctx-container`, if there is not exactly 1 child. It is recommended to do so. If 1 child is provided, it will not add any additional elements to the DOM. If you would like to customize the generated `<div>`, you can instead wrap the children of `ProvideContext` in an element with the desired customizations.

### `$ctx` method

All components also have a `$ctx` method. This method returns values from the context. It can be used in component templates or in the script by using `this.$ctx`.

The value returned depends on the number of arguments passed.

```js
$ctx()              // Returns the merged context object
$ctx(name)          // Returns the value by the given name, if not found, it returns undefined.
$ctx(name, fallbck) // Returns the value by the given name, if not found, it returns the fallback.
```
