## Modules

<dl>
<dt><a href="#module_useAnnouncer">useAnnouncer</a></dt>
<dd><p>Copyright IBM Corp. 2018, 2018</p>
<p>This source code is licensed under the Apache-2.0 license found in the
LICENSE file in the root directory of this source tree.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#useEventListener">useEventListener(element, name, callback, options)</a></dt>
<dd><p>Given a reference to an HTMLElement, specify an event and callback to invoke
whenever the event occurs. Optionally, you can specify options for the event
handler.</p>
</dd>
<dt><a href="#useForceUpdate">useForceUpdate()</a></dt>
<dd><p>Programmatically force an update for your component. This should be used
sparingly and is a last-resort in almost all cases.</p>
</dd>
<dt><a href="#useId">useId(prefix)</a> ⇒ <code>string</code></dt>
<dd><p>Provides a unique identifier with an optional prefix, useful for dynamically
creating <code>id</code> values for controls, especially alongside <code>aria-labelledby</code> or
<code>htmlFor</code>. This <code>id</code> value is guaranteed to be the same for the duration of
the component.</p>
</dd>
<dt><a href="#usePassive">usePassive()</a></dt>
<dd><p>Retrieves information about the current environment and if it supports
passive event listeners.</p>
</dd>
<dt><a href="#usePortalNode">usePortalNode(id)</a></dt>
<dd></dd>
<dt><a href="#usePrevious">usePrevious(value)</a></dt>
<dd><p>Returns the previous value of a value that may be changing over time. Useful
to compare a previous value to a current value.</p>
</dd>
<dt><a href="#useScrollDirection">useScrollDirection()</a></dt>
<dd><p>Provides the vertical scroll direction, can be one of DOWN or UP.</p>
</dd>
<dt><a href="#useWindowEvent">useWindowEvent(name, options)</a></dt>
<dd><p>Helper hook that will force an update for any window event that occurs. We
force the update so that the calling hook can return values from <code>window</code>
directly.</p>
</dd>
<dt><a href="#useWindowScroll">useWindowScroll()</a></dt>
<dd><p>Provides <code>window.{scrollX,scrollY}</code> values that are guaranteed to be
up-to-date whenever the browser is scrolled</p>
</dd>
<dt><a href="#useWindowResize">useWindowResize()</a></dt>
<dd><p>Provides window width and height values that are guaranteed to be
up-to-date whenever the browser is resized</p>
</dd>
</dl>

<a name="module_useAnnouncer"></a>

## useAnnouncer
Copyright IBM Corp. 2018, 2018

This source code is licensed under the Apache-2.0 license found in the
LICENSE file in the root directory of this source tree.


* [useAnnouncer](#module_useAnnouncer)
    * [.useAnnouncer()](#module_useAnnouncer.useAnnouncer)
    * [.useAssertiveAnnouncer()](#module_useAnnouncer.useAssertiveAnnouncer)
    * [.usePoliteAnnouncer()](#module_useAnnouncer.usePoliteAnnouncer)

<a name="module_useAnnouncer.useAnnouncer"></a>

### useAnnouncer.useAnnouncer()
Provides an `announce` method that allows a user to queue up an assertive or
polite message to the user. This message is displayed in an `aria-live`
region with the appropriate mode and the message is set as its text content.
This `aria-live` region is the same for all components, so ordering of
messages sent is important.

**Kind**: static method of [<code>useAnnouncer</code>](#module_useAnnouncer)  
<a name="module_useAnnouncer.useAssertiveAnnouncer"></a>

### useAnnouncer.useAssertiveAnnouncer()
Provides an announce method that will allow the user to queue up messages in
an `aria-live="assertive"` region

**Kind**: static method of [<code>useAnnouncer</code>](#module_useAnnouncer)  
<a name="module_useAnnouncer.usePoliteAnnouncer"></a>

### useAnnouncer.usePoliteAnnouncer()
Provides an announce method that will allow the user to queue up messages in
an `aria-live="polite"` region

**Kind**: static method of [<code>useAnnouncer</code>](#module_useAnnouncer)  
<a name="useEventListener"></a>

## useEventListener(element, name, callback, options)
Given a reference to an HTMLElement, specify an event and callback to invoke
whenever the event occurs. Optionally, you can specify options for the event
handler.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | the element for which the event occurs |
| name | <code>string</code> | the name of the event |
| callback | <code>function</code> | the callback invoked by the listener |
| options | <code>object</code> | configuration object for the listener |

**Example**  
```js
function MyComponent() {
  useEventListener(window, 'click', () => {
    // Window was clicked
  });
}
```
<a name="useForceUpdate"></a>

## useForceUpdate()
Programmatically force an update for your component. This should be used
sparingly and is a last-resort in almost all cases.

**Kind**: global function  
**Example**  
```js
function MyComponent() {
  const forceUpdate = useForceUpdate();
  ...
}
```
<a name="useId"></a>

## useId(prefix) ⇒ <code>string</code>
Provides a unique identifier with an optional prefix, useful for dynamically
creating `id` values for controls, especially alongside `aria-labelledby` or
`htmlFor`. This `id` value is guaranteed to be the same for the duration of
the component.

**Kind**: global function  

| Param | Type |
| --- | --- |
| prefix | <code>string</code> | 

**Example**  
```js
function TextInput() {
  const id = useId('text-input');
  return (
    <div className="form-item">
      <label htmlFor={id}>Label</label>
      <input id={id} type="text" />
    </div>
  );
}
```
<a name="usePassive"></a>

## usePassive()
Retrieves information about the current environment and if it supports
passive event listeners.

**Kind**: global function  
**Example**  
```js
function MyComponent() {
  const passiveIsSupported = usePassive();
  ...
}
```
<a name="usePortalNode"></a>

## usePortalNode(id)
**Kind**: global function  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="usePrevious"></a>

## usePrevious(value)
Returns the previous value of a value that may be changing over time. Useful
to compare a previous value to a current value.

**Kind**: global function  

| Param | Type |
| --- | --- |
| value | <code>any</code> | 

**Example**  
```js
function MyComponent() {
  const [count, updateCount] = useState(0);
  const previous = usePrevious(count);

  return <span>Current count: {count}, previous count: {previous}</span>;
}
```
<a name="useScrollDirection"></a>

## useScrollDirection()
Provides the vertical scroll direction, can be one of DOWN or UP.

**Kind**: global function  
<a name="useWindowEvent"></a>

## useWindowEvent(name, options)
Helper hook that will force an update for any window event that occurs. We
force the update so that the calling hook can return values from `window`
directly.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the window event |
| options | <code>object</code> | optional options for the event listener |

<a name="useWindowScroll"></a>

## useWindowScroll()
Provides `window.{scrollX,scrollY}` values that are guaranteed to be
up-to-date whenever the browser is scrolled

**Kind**: global function  
<a name="useWindowResize"></a>

## useWindowResize()
Provides window width and height values that are guaranteed to be
up-to-date whenever the browser is resized

**Kind**: global function  
