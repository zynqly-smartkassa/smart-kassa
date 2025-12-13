[**frontend**](../../../../README.md)

***

[frontend](../../../../README.md) / [components/ui/badge](../README.md) / BadgeProps

# Interface: BadgeProps

Defined in: [src/components/ui/badge.tsx:26](https://github.com/zynqly-smartkassa/smart-kassa/blob/de54eaa3e5027d345b94c25040896cec3a2cb70b/frontend/src/components/ui/badge.tsx#L26)

## Extends

- `HTMLAttributes`\<`HTMLDivElement`\>.`VariantProps`\<*typeof* [`badgeVariants`](../variables/badgeVariants.md)\>

## Properties

### about?

> `optional` **about**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2759

#### Inherited from

`React.HTMLAttributes.about`

***

### accessKey?

> `optional` **accessKey**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2732

#### Inherited from

`React.HTMLAttributes.accessKey`

***

### aria-activedescendant?

> `optional` **aria-activedescendant**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2430

Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.

#### Inherited from

`React.HTMLAttributes.aria-activedescendant`

***

### aria-atomic?

> `optional` **aria-atomic**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2432

Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.

#### Inherited from

`React.HTMLAttributes.aria-atomic`

***

### aria-autocomplete?

> `optional` **aria-autocomplete**: `"none"` \| `"list"` \| `"inline"` \| `"both"`

Defined in: node\_modules/@types/react/index.d.ts:2437

Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
presented if they are made.

#### Inherited from

`React.HTMLAttributes.aria-autocomplete`

***

### aria-braillelabel?

> `optional` **aria-braillelabel**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2443

Defines a string value that labels the current element, which is intended to be converted into Braille.

#### See

aria-label.

#### Inherited from

`React.HTMLAttributes.aria-braillelabel`

***

### aria-brailleroledescription?

> `optional` **aria-brailleroledescription**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2448

Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.

#### See

aria-roledescription.

#### Inherited from

`React.HTMLAttributes.aria-brailleroledescription`

***

### aria-busy?

> `optional` **aria-busy**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2449

#### Inherited from

`React.HTMLAttributes.aria-busy`

***

### aria-checked?

> `optional` **aria-checked**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Defined in: node\_modules/@types/react/index.d.ts:2454

Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.

#### See

 - aria-pressed
 - aria-selected.

#### Inherited from

`React.HTMLAttributes.aria-checked`

***

### aria-colcount?

> `optional` **aria-colcount**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2459

Defines the total number of columns in a table, grid, or treegrid.

#### See

aria-colindex.

#### Inherited from

`React.HTMLAttributes.aria-colcount`

***

### aria-colindex?

> `optional` **aria-colindex**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2464

Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.

#### See

 - aria-colcount
 - aria-colspan.

#### Inherited from

`React.HTMLAttributes.aria-colindex`

***

### aria-colindextext?

> `optional` **aria-colindextext**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2469

Defines a human readable text alternative of aria-colindex.

#### See

aria-rowindextext.

#### Inherited from

`React.HTMLAttributes.aria-colindextext`

***

### aria-colspan?

> `optional` **aria-colspan**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2474

Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-colindex
 - aria-rowspan.

#### Inherited from

`React.HTMLAttributes.aria-colspan`

***

### aria-controls?

> `optional` **aria-controls**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2479

Identifies the element (or elements) whose contents or presence are controlled by the current element.

#### See

aria-owns.

#### Inherited from

`React.HTMLAttributes.aria-controls`

***

### aria-current?

> `optional` **aria-current**: `boolean` \| `"true"` \| `"false"` \| `"date"` \| `"time"` \| `"step"` \| `"page"` \| `"location"`

Defined in: node\_modules/@types/react/index.d.ts:2481

Indicates the element that represents the current item within a container or set of related elements.

#### Inherited from

`React.HTMLAttributes.aria-current`

***

### aria-describedby?

> `optional` **aria-describedby**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2486

Identifies the element (or elements) that describes the object.

#### See

aria-labelledby

#### Inherited from

`React.HTMLAttributes.aria-describedby`

***

### aria-description?

> `optional` **aria-description**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2491

Defines a string value that describes or annotates the current element.

#### See

related aria-describedby.

#### Inherited from

`React.HTMLAttributes.aria-description`

***

### aria-details?

> `optional` **aria-details**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2496

Identifies the element that provides a detailed, extended description for the object.

#### See

aria-describedby.

#### Inherited from

`React.HTMLAttributes.aria-details`

***

### aria-disabled?

> `optional` **aria-disabled**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2501

Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.

#### See

 - aria-hidden
 - aria-readonly.

#### Inherited from

`React.HTMLAttributes.aria-disabled`

***

### ~~aria-dropeffect?~~

> `optional` **aria-dropeffect**: `"link"` \| `"none"` \| `"copy"` \| `"execute"` \| `"move"` \| `"popup"`

Defined in: node\_modules/@types/react/index.d.ts:2506

Indicates what functions can be performed when a dragged object is released on the drop target.

#### Deprecated

in ARIA 1.1

#### Inherited from

`React.HTMLAttributes.aria-dropeffect`

***

### aria-errormessage?

> `optional` **aria-errormessage**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2511

Identifies the element that provides an error message for the object.

#### See

 - aria-invalid
 - aria-describedby.

#### Inherited from

`React.HTMLAttributes.aria-errormessage`

***

### aria-expanded?

> `optional` **aria-expanded**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2513

Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.

#### Inherited from

`React.HTMLAttributes.aria-expanded`

***

### aria-flowto?

> `optional` **aria-flowto**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2518

Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order.

#### Inherited from

`React.HTMLAttributes.aria-flowto`

***

### ~~aria-grabbed?~~

> `optional` **aria-grabbed**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2523

Indicates an element's "grabbed" state in a drag-and-drop operation.

#### Deprecated

in ARIA 1.1

#### Inherited from

`React.HTMLAttributes.aria-grabbed`

***

### aria-haspopup?

> `optional` **aria-haspopup**: `boolean` \| `"true"` \| `"false"` \| `"dialog"` \| `"grid"` \| `"listbox"` \| `"menu"` \| `"tree"`

Defined in: node\_modules/@types/react/index.d.ts:2525

Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.

#### Inherited from

`React.HTMLAttributes.aria-haspopup`

***

### aria-hidden?

> `optional` **aria-hidden**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2530

Indicates whether the element is exposed to an accessibility API.

#### See

aria-disabled.

#### Inherited from

`React.HTMLAttributes.aria-hidden`

***

### aria-invalid?

> `optional` **aria-invalid**: `boolean` \| `"true"` \| `"false"` \| `"grammar"` \| `"spelling"`

Defined in: node\_modules/@types/react/index.d.ts:2535

Indicates the entered value does not conform to the format expected by the application.

#### See

aria-errormessage.

#### Inherited from

`React.HTMLAttributes.aria-invalid`

***

### aria-keyshortcuts?

> `optional` **aria-keyshortcuts**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2537

Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

#### Inherited from

`React.HTMLAttributes.aria-keyshortcuts`

***

### aria-label?

> `optional` **aria-label**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2542

Defines a string value that labels the current element.

#### See

aria-labelledby.

#### Inherited from

`React.HTMLAttributes.aria-label`

***

### aria-labelledby?

> `optional` **aria-labelledby**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2547

Identifies the element (or elements) that labels the current element.

#### See

aria-describedby.

#### Inherited from

`React.HTMLAttributes.aria-labelledby`

***

### aria-level?

> `optional` **aria-level**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2549

Defines the hierarchical level of an element within a structure.

#### Inherited from

`React.HTMLAttributes.aria-level`

***

### aria-live?

> `optional` **aria-live**: `"off"` \| `"assertive"` \| `"polite"`

Defined in: node\_modules/@types/react/index.d.ts:2551

Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.

#### Inherited from

`React.HTMLAttributes.aria-live`

***

### aria-modal?

> `optional` **aria-modal**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2553

Indicates whether an element is modal when displayed.

#### Inherited from

`React.HTMLAttributes.aria-modal`

***

### aria-multiline?

> `optional` **aria-multiline**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2555

Indicates whether a text box accepts multiple lines of input or only a single line.

#### Inherited from

`React.HTMLAttributes.aria-multiline`

***

### aria-multiselectable?

> `optional` **aria-multiselectable**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2557

Indicates that the user may select more than one item from the current selectable descendants.

#### Inherited from

`React.HTMLAttributes.aria-multiselectable`

***

### aria-orientation?

> `optional` **aria-orientation**: `"horizontal"` \| `"vertical"`

Defined in: node\_modules/@types/react/index.d.ts:2559

Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.

#### Inherited from

`React.HTMLAttributes.aria-orientation`

***

### aria-owns?

> `optional` **aria-owns**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2565

Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.

#### See

aria-controls.

#### Inherited from

`React.HTMLAttributes.aria-owns`

***

### aria-placeholder?

> `optional` **aria-placeholder**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2570

Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format.

#### Inherited from

`React.HTMLAttributes.aria-placeholder`

***

### aria-posinset?

> `optional` **aria-posinset**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2575

Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-setsize.

#### Inherited from

`React.HTMLAttributes.aria-posinset`

***

### aria-pressed?

> `optional` **aria-pressed**: `boolean` \| `"true"` \| `"false"` \| `"mixed"`

Defined in: node\_modules/@types/react/index.d.ts:2580

Indicates the current "pressed" state of toggle buttons.

#### See

 - aria-checked
 - aria-selected.

#### Inherited from

`React.HTMLAttributes.aria-pressed`

***

### aria-readonly?

> `optional` **aria-readonly**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2585

Indicates that the element is not editable, but is otherwise operable.

#### See

aria-disabled.

#### Inherited from

`React.HTMLAttributes.aria-readonly`

***

### aria-relevant?

> `optional` **aria-relevant**: `"text"` \| `"additions"` \| `"additions removals"` \| `"additions text"` \| `"all"` \| `"removals"` \| `"removals additions"` \| `"removals text"` \| `"text additions"` \| `"text removals"`

Defined in: node\_modules/@types/react/index.d.ts:2590

Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.

#### See

aria-atomic.

#### Inherited from

`React.HTMLAttributes.aria-relevant`

***

### aria-required?

> `optional` **aria-required**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2603

Indicates that user input is required on the element before a form may be submitted.

#### Inherited from

`React.HTMLAttributes.aria-required`

***

### aria-roledescription?

> `optional` **aria-roledescription**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2605

Defines a human-readable, author-localized description for the role of an element.

#### Inherited from

`React.HTMLAttributes.aria-roledescription`

***

### aria-rowcount?

> `optional` **aria-rowcount**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2610

Defines the total number of rows in a table, grid, or treegrid.

#### See

aria-rowindex.

#### Inherited from

`React.HTMLAttributes.aria-rowcount`

***

### aria-rowindex?

> `optional` **aria-rowindex**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2615

Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.

#### See

 - aria-rowcount
 - aria-rowspan.

#### Inherited from

`React.HTMLAttributes.aria-rowindex`

***

### aria-rowindextext?

> `optional` **aria-rowindextext**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2620

Defines a human readable text alternative of aria-rowindex.

#### See

aria-colindextext.

#### Inherited from

`React.HTMLAttributes.aria-rowindextext`

***

### aria-rowspan?

> `optional` **aria-rowspan**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2625

Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.

#### See

 - aria-rowindex
 - aria-colspan.

#### Inherited from

`React.HTMLAttributes.aria-rowspan`

***

### aria-selected?

> `optional` **aria-selected**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2630

Indicates the current "selected" state of various widgets.

#### See

 - aria-checked
 - aria-pressed.

#### Inherited from

`React.HTMLAttributes.aria-selected`

***

### aria-setsize?

> `optional` **aria-setsize**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2635

Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.

#### See

aria-posinset.

#### Inherited from

`React.HTMLAttributes.aria-setsize`

***

### aria-sort?

> `optional` **aria-sort**: `"none"` \| `"ascending"` \| `"descending"` \| `"other"`

Defined in: node\_modules/@types/react/index.d.ts:2637

Indicates if items in a table or grid are sorted in ascending or descending order.

#### Inherited from

`React.HTMLAttributes.aria-sort`

***

### aria-valuemax?

> `optional` **aria-valuemax**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2639

Defines the maximum allowed value for a range widget.

#### Inherited from

`React.HTMLAttributes.aria-valuemax`

***

### aria-valuemin?

> `optional` **aria-valuemin**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2641

Defines the minimum allowed value for a range widget.

#### Inherited from

`React.HTMLAttributes.aria-valuemin`

***

### aria-valuenow?

> `optional` **aria-valuenow**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2646

Defines the current value for a range widget.

#### See

aria-valuetext.

#### Inherited from

`React.HTMLAttributes.aria-valuenow`

***

### aria-valuetext?

> `optional` **aria-valuetext**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2648

Defines the human readable text alternative of aria-valuenow for a range widget.

#### Inherited from

`React.HTMLAttributes.aria-valuetext`

***

### autoCapitalize?

> `optional` **autoCapitalize**: `"off"` \| `"none"` \| `"on"` \| `"sentences"` \| `"words"` \| `"characters"` \| `string` & `object`

Defined in: node\_modules/@types/react/index.d.ts:2733

#### Inherited from

`React.HTMLAttributes.autoCapitalize`

***

### autoCorrect?

> `optional` **autoCorrect**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2772

#### Inherited from

`React.HTMLAttributes.autoCorrect`

***

### autoFocus?

> `optional` **autoFocus**: `boolean`

Defined in: node\_modules/@types/react/index.d.ts:2734

#### Inherited from

`React.HTMLAttributes.autoFocus`

***

### autoSave?

> `optional` **autoSave**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2773

#### Inherited from

`React.HTMLAttributes.autoSave`

***

### children?

> `optional` **children**: `ReactNode`

Defined in: node\_modules/@types/react/index.d.ts:2206

#### Inherited from

`React.HTMLAttributes.children`

***

### className?

> `optional` **className**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2735

#### Inherited from

`React.HTMLAttributes.className`

***

### color?

> `optional` **color**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2774

#### Inherited from

`React.HTMLAttributes.color`

***

### content?

> `optional` **content**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2760

#### Inherited from

`React.HTMLAttributes.content`

***

### contentEditable?

> `optional` **contentEditable**: `Booleanish` \| `"inherit"` \| `"plaintext-only"`

Defined in: node\_modules/@types/react/index.d.ts:2736

#### Inherited from

`React.HTMLAttributes.contentEditable`

***

### contextMenu?

> `optional` **contextMenu**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2737

#### Inherited from

`React.HTMLAttributes.contextMenu`

***

### dangerouslySetInnerHTML?

> `optional` **dangerouslySetInnerHTML**: `object`

Defined in: node\_modules/@types/react/index.d.ts:2207

#### \_\_html

> **\_\_html**: `string` \| `TrustedHTML`

#### Inherited from

`React.HTMLAttributes.dangerouslySetInnerHTML`

***

### datatype?

> `optional` **datatype**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2761

#### Inherited from

`React.HTMLAttributes.datatype`

***

### defaultChecked?

> `optional` **defaultChecked**: `boolean`

Defined in: node\_modules/@types/react/index.d.ts:2726

#### Inherited from

`React.HTMLAttributes.defaultChecked`

***

### defaultValue?

> `optional` **defaultValue**: `string` \| `number` \| readonly `string`[]

Defined in: node\_modules/@types/react/index.d.ts:2727

#### Inherited from

`React.HTMLAttributes.defaultValue`

***

### dir?

> `optional` **dir**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2738

#### Inherited from

`React.HTMLAttributes.dir`

***

### draggable?

> `optional` **draggable**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2739

#### Inherited from

`React.HTMLAttributes.draggable`

***

### enterKeyHint?

> `optional` **enterKeyHint**: `"enter"` \| `"done"` \| `"go"` \| `"next"` \| `"previous"` \| `"search"` \| `"send"`

Defined in: node\_modules/@types/react/index.d.ts:2740

#### Inherited from

`React.HTMLAttributes.enterKeyHint`

***

### exportparts?

> `optional` **exportparts**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2807

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/exportparts](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/exportparts)

#### Inherited from

`React.HTMLAttributes.exportparts`

***

### hidden?

> `optional` **hidden**: `boolean`

Defined in: node\_modules/@types/react/index.d.ts:2741

#### Inherited from

`React.HTMLAttributes.hidden`

***

### id?

> `optional` **id**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2742

#### Inherited from

`React.HTMLAttributes.id`

***

### inert?

> `optional` **inert**: `boolean`

Defined in: node\_modules/@types/react/index.d.ts:2793

#### See

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert

#### Inherited from

`React.HTMLAttributes.inert`

***

### inlist?

> `optional` **inlist**: `any`

Defined in: node\_modules/@types/react/index.d.ts:2762

#### Inherited from

`React.HTMLAttributes.inlist`

***

### inputMode?

> `optional` **inputMode**: `"email"` \| `"none"` \| `"search"` \| `"text"` \| `"tel"` \| `"url"` \| `"numeric"` \| `"decimal"`

Defined in: node\_modules/@types/react/index.d.ts:2798

Hints at the type of data that might be entered by the user while editing the element or its contents

#### See

[https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute)

#### Inherited from

`React.HTMLAttributes.inputMode`

***

### is?

> `optional` **is**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2803

Specify that a standard HTML element should behave like a defined custom built-in element

#### See

[https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is](https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is)

#### Inherited from

`React.HTMLAttributes.is`

***

### itemID?

> `optional` **itemID**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2778

#### Inherited from

`React.HTMLAttributes.itemID`

***

### itemProp?

> `optional` **itemProp**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2775

#### Inherited from

`React.HTMLAttributes.itemProp`

***

### itemRef?

> `optional` **itemRef**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2779

#### Inherited from

`React.HTMLAttributes.itemRef`

***

### itemScope?

> `optional` **itemScope**: `boolean`

Defined in: node\_modules/@types/react/index.d.ts:2776

#### Inherited from

`React.HTMLAttributes.itemScope`

***

### itemType?

> `optional` **itemType**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2777

#### Inherited from

`React.HTMLAttributes.itemType`

***

### lang?

> `optional` **lang**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2743

#### Inherited from

`React.HTMLAttributes.lang`

***

### nonce?

> `optional` **nonce**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2744

#### Inherited from

`React.HTMLAttributes.nonce`

***

### onAbort?

> `optional` **onAbort**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2266

#### Inherited from

`React.HTMLAttributes.onAbort`

***

### onAbortCapture?

> `optional` **onAbortCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2267

#### Inherited from

`React.HTMLAttributes.onAbortCapture`

***

### onAnimationEnd?

> `optional` **onAnimationEnd**: `AnimationEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2396

#### Inherited from

`React.HTMLAttributes.onAnimationEnd`

***

### onAnimationEndCapture?

> `optional` **onAnimationEndCapture**: `AnimationEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2397

#### Inherited from

`React.HTMLAttributes.onAnimationEndCapture`

***

### onAnimationIteration?

> `optional` **onAnimationIteration**: `AnimationEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2398

#### Inherited from

`React.HTMLAttributes.onAnimationIteration`

***

### onAnimationIterationCapture?

> `optional` **onAnimationIterationCapture**: `AnimationEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2399

#### Inherited from

`React.HTMLAttributes.onAnimationIterationCapture`

***

### onAnimationStart?

> `optional` **onAnimationStart**: `AnimationEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2394

#### Inherited from

`React.HTMLAttributes.onAnimationStart`

***

### onAnimationStartCapture?

> `optional` **onAnimationStartCapture**: `AnimationEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2395

#### Inherited from

`React.HTMLAttributes.onAnimationStartCapture`

***

### onAuxClick?

> `optional` **onAuxClick**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2312

#### Inherited from

`React.HTMLAttributes.onAuxClick`

***

### onAuxClickCapture?

> `optional` **onAuxClickCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2313

#### Inherited from

`React.HTMLAttributes.onAuxClickCapture`

***

### onBeforeInput?

> `optional` **onBeforeInput**: `InputEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2238

#### Inherited from

`React.HTMLAttributes.onBeforeInput`

***

### onBeforeInputCapture?

> `optional` **onBeforeInputCapture**: `FormEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2239

#### Inherited from

`React.HTMLAttributes.onBeforeInputCapture`

***

### onBeforeToggle?

> `optional` **onBeforeToggle**: `ToggleEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2403

#### Inherited from

`React.HTMLAttributes.onBeforeToggle`

***

### onBlur?

> `optional` **onBlur**: `FocusEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2232

#### Inherited from

`React.HTMLAttributes.onBlur`

***

### onBlurCapture?

> `optional` **onBlurCapture**: `FocusEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2233

#### Inherited from

`React.HTMLAttributes.onBlurCapture`

***

### onCanPlay?

> `optional` **onCanPlay**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2268

#### Inherited from

`React.HTMLAttributes.onCanPlay`

***

### onCanPlayCapture?

> `optional` **onCanPlayCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2269

#### Inherited from

`React.HTMLAttributes.onCanPlayCapture`

***

### onCanPlayThrough?

> `optional` **onCanPlayThrough**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2270

#### Inherited from

`React.HTMLAttributes.onCanPlayThrough`

***

### onCanPlayThroughCapture?

> `optional` **onCanPlayThroughCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2271

#### Inherited from

`React.HTMLAttributes.onCanPlayThroughCapture`

***

### onChange?

> `optional` **onChange**: `FormEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2236

#### Inherited from

`React.HTMLAttributes.onChange`

***

### onChangeCapture?

> `optional` **onChangeCapture**: `FormEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2237

#### Inherited from

`React.HTMLAttributes.onChangeCapture`

***

### onClick?

> `optional` **onClick**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2314

#### Inherited from

`React.HTMLAttributes.onClick`

***

### onClickCapture?

> `optional` **onClickCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2315

#### Inherited from

`React.HTMLAttributes.onClickCapture`

***

### onCompositionEnd?

> `optional` **onCompositionEnd**: `CompositionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2222

#### Inherited from

`React.HTMLAttributes.onCompositionEnd`

***

### onCompositionEndCapture?

> `optional` **onCompositionEndCapture**: `CompositionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2223

#### Inherited from

`React.HTMLAttributes.onCompositionEndCapture`

***

### onCompositionStart?

> `optional` **onCompositionStart**: `CompositionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2224

#### Inherited from

`React.HTMLAttributes.onCompositionStart`

***

### onCompositionStartCapture?

> `optional` **onCompositionStartCapture**: `CompositionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2225

#### Inherited from

`React.HTMLAttributes.onCompositionStartCapture`

***

### onCompositionUpdate?

> `optional` **onCompositionUpdate**: `CompositionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2226

#### Inherited from

`React.HTMLAttributes.onCompositionUpdate`

***

### onCompositionUpdateCapture?

> `optional` **onCompositionUpdateCapture**: `CompositionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2227

#### Inherited from

`React.HTMLAttributes.onCompositionUpdateCapture`

***

### onContextMenu?

> `optional` **onContextMenu**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2316

#### Inherited from

`React.HTMLAttributes.onContextMenu`

***

### onContextMenuCapture?

> `optional` **onContextMenuCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2317

#### Inherited from

`React.HTMLAttributes.onContextMenuCapture`

***

### onCopy?

> `optional` **onCopy**: `ClipboardEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2214

#### Inherited from

`React.HTMLAttributes.onCopy`

***

### onCopyCapture?

> `optional` **onCopyCapture**: `ClipboardEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2215

#### Inherited from

`React.HTMLAttributes.onCopyCapture`

***

### onCut?

> `optional` **onCut**: `ClipboardEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2216

#### Inherited from

`React.HTMLAttributes.onCut`

***

### onCutCapture?

> `optional` **onCutCapture**: `ClipboardEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2217

#### Inherited from

`React.HTMLAttributes.onCutCapture`

***

### onDoubleClick?

> `optional` **onDoubleClick**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2318

#### Inherited from

`React.HTMLAttributes.onDoubleClick`

***

### onDoubleClickCapture?

> `optional` **onDoubleClickCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2319

#### Inherited from

`React.HTMLAttributes.onDoubleClickCapture`

***

### onDrag?

> `optional` **onDrag**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2320

#### Inherited from

`React.HTMLAttributes.onDrag`

***

### onDragCapture?

> `optional` **onDragCapture**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2321

#### Inherited from

`React.HTMLAttributes.onDragCapture`

***

### onDragEnd?

> `optional` **onDragEnd**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2322

#### Inherited from

`React.HTMLAttributes.onDragEnd`

***

### onDragEndCapture?

> `optional` **onDragEndCapture**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2323

#### Inherited from

`React.HTMLAttributes.onDragEndCapture`

***

### onDragEnter?

> `optional` **onDragEnter**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2324

#### Inherited from

`React.HTMLAttributes.onDragEnter`

***

### onDragEnterCapture?

> `optional` **onDragEnterCapture**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2325

#### Inherited from

`React.HTMLAttributes.onDragEnterCapture`

***

### onDragExit?

> `optional` **onDragExit**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2326

#### Inherited from

`React.HTMLAttributes.onDragExit`

***

### onDragExitCapture?

> `optional` **onDragExitCapture**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2327

#### Inherited from

`React.HTMLAttributes.onDragExitCapture`

***

### onDragLeave?

> `optional` **onDragLeave**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2328

#### Inherited from

`React.HTMLAttributes.onDragLeave`

***

### onDragLeaveCapture?

> `optional` **onDragLeaveCapture**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2329

#### Inherited from

`React.HTMLAttributes.onDragLeaveCapture`

***

### onDragOver?

> `optional` **onDragOver**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2330

#### Inherited from

`React.HTMLAttributes.onDragOver`

***

### onDragOverCapture?

> `optional` **onDragOverCapture**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2331

#### Inherited from

`React.HTMLAttributes.onDragOverCapture`

***

### onDragStart?

> `optional` **onDragStart**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2332

#### Inherited from

`React.HTMLAttributes.onDragStart`

***

### onDragStartCapture?

> `optional` **onDragStartCapture**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2333

#### Inherited from

`React.HTMLAttributes.onDragStartCapture`

***

### onDrop?

> `optional` **onDrop**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2334

#### Inherited from

`React.HTMLAttributes.onDrop`

***

### onDropCapture?

> `optional` **onDropCapture**: `DragEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2335

#### Inherited from

`React.HTMLAttributes.onDropCapture`

***

### onDurationChange?

> `optional` **onDurationChange**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2272

#### Inherited from

`React.HTMLAttributes.onDurationChange`

***

### onDurationChangeCapture?

> `optional` **onDurationChangeCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2273

#### Inherited from

`React.HTMLAttributes.onDurationChangeCapture`

***

### onEmptied?

> `optional` **onEmptied**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2274

#### Inherited from

`React.HTMLAttributes.onEmptied`

***

### onEmptiedCapture?

> `optional` **onEmptiedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2275

#### Inherited from

`React.HTMLAttributes.onEmptiedCapture`

***

### onEncrypted?

> `optional` **onEncrypted**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2276

#### Inherited from

`React.HTMLAttributes.onEncrypted`

***

### onEncryptedCapture?

> `optional` **onEncryptedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2277

#### Inherited from

`React.HTMLAttributes.onEncryptedCapture`

***

### onEnded?

> `optional` **onEnded**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2278

#### Inherited from

`React.HTMLAttributes.onEnded`

***

### onEndedCapture?

> `optional` **onEndedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2279

#### Inherited from

`React.HTMLAttributes.onEndedCapture`

***

### onError?

> `optional` **onError**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2252

#### Inherited from

`React.HTMLAttributes.onError`

***

### onErrorCapture?

> `optional` **onErrorCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2253

#### Inherited from

`React.HTMLAttributes.onErrorCapture`

***

### onFocus?

> `optional` **onFocus**: `FocusEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2230

#### Inherited from

`React.HTMLAttributes.onFocus`

***

### onFocusCapture?

> `optional` **onFocusCapture**: `FocusEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2231

#### Inherited from

`React.HTMLAttributes.onFocusCapture`

***

### onGotPointerCapture?

> `optional` **onGotPointerCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2378

#### Inherited from

`React.HTMLAttributes.onGotPointerCapture`

***

### onGotPointerCaptureCapture?

> `optional` **onGotPointerCaptureCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2379

#### Inherited from

`React.HTMLAttributes.onGotPointerCaptureCapture`

***

### onInput?

> `optional` **onInput**: `FormEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2240

#### Inherited from

`React.HTMLAttributes.onInput`

***

### onInputCapture?

> `optional` **onInputCapture**: `FormEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2241

#### Inherited from

`React.HTMLAttributes.onInputCapture`

***

### onInvalid?

> `optional` **onInvalid**: `FormEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2246

#### Inherited from

`React.HTMLAttributes.onInvalid`

***

### onInvalidCapture?

> `optional` **onInvalidCapture**: `FormEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2247

#### Inherited from

`React.HTMLAttributes.onInvalidCapture`

***

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2256

#### Inherited from

`React.HTMLAttributes.onKeyDown`

***

### onKeyDownCapture?

> `optional` **onKeyDownCapture**: `KeyboardEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2257

#### Inherited from

`React.HTMLAttributes.onKeyDownCapture`

***

### ~~onKeyPress?~~

> `optional` **onKeyPress**: `KeyboardEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2259

#### Deprecated

Use `onKeyUp` or `onKeyDown` instead

#### Inherited from

`React.HTMLAttributes.onKeyPress`

***

### ~~onKeyPressCapture?~~

> `optional` **onKeyPressCapture**: `KeyboardEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2261

#### Deprecated

Use `onKeyUpCapture` or `onKeyDownCapture` instead

#### Inherited from

`React.HTMLAttributes.onKeyPressCapture`

***

### onKeyUp?

> `optional` **onKeyUp**: `KeyboardEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2262

#### Inherited from

`React.HTMLAttributes.onKeyUp`

***

### onKeyUpCapture?

> `optional` **onKeyUpCapture**: `KeyboardEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2263

#### Inherited from

`React.HTMLAttributes.onKeyUpCapture`

***

### onLoad?

> `optional` **onLoad**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2250

#### Inherited from

`React.HTMLAttributes.onLoad`

***

### onLoadCapture?

> `optional` **onLoadCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2251

#### Inherited from

`React.HTMLAttributes.onLoadCapture`

***

### onLoadedData?

> `optional` **onLoadedData**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2280

#### Inherited from

`React.HTMLAttributes.onLoadedData`

***

### onLoadedDataCapture?

> `optional` **onLoadedDataCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2281

#### Inherited from

`React.HTMLAttributes.onLoadedDataCapture`

***

### onLoadedMetadata?

> `optional` **onLoadedMetadata**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2282

#### Inherited from

`React.HTMLAttributes.onLoadedMetadata`

***

### onLoadedMetadataCapture?

> `optional` **onLoadedMetadataCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2283

#### Inherited from

`React.HTMLAttributes.onLoadedMetadataCapture`

***

### onLoadStart?

> `optional` **onLoadStart**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2284

#### Inherited from

`React.HTMLAttributes.onLoadStart`

***

### onLoadStartCapture?

> `optional` **onLoadStartCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2285

#### Inherited from

`React.HTMLAttributes.onLoadStartCapture`

***

### onLostPointerCapture?

> `optional` **onLostPointerCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2380

#### Inherited from

`React.HTMLAttributes.onLostPointerCapture`

***

### onLostPointerCaptureCapture?

> `optional` **onLostPointerCaptureCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2381

#### Inherited from

`React.HTMLAttributes.onLostPointerCaptureCapture`

***

### onMouseDown?

> `optional` **onMouseDown**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2336

#### Inherited from

`React.HTMLAttributes.onMouseDown`

***

### onMouseDownCapture?

> `optional` **onMouseDownCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2337

#### Inherited from

`React.HTMLAttributes.onMouseDownCapture`

***

### onMouseEnter?

> `optional` **onMouseEnter**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2338

#### Inherited from

`React.HTMLAttributes.onMouseEnter`

***

### onMouseLeave?

> `optional` **onMouseLeave**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2339

#### Inherited from

`React.HTMLAttributes.onMouseLeave`

***

### onMouseMove?

> `optional` **onMouseMove**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2340

#### Inherited from

`React.HTMLAttributes.onMouseMove`

***

### onMouseMoveCapture?

> `optional` **onMouseMoveCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2341

#### Inherited from

`React.HTMLAttributes.onMouseMoveCapture`

***

### onMouseOut?

> `optional` **onMouseOut**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2342

#### Inherited from

`React.HTMLAttributes.onMouseOut`

***

### onMouseOutCapture?

> `optional` **onMouseOutCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2343

#### Inherited from

`React.HTMLAttributes.onMouseOutCapture`

***

### onMouseOver?

> `optional` **onMouseOver**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2344

#### Inherited from

`React.HTMLAttributes.onMouseOver`

***

### onMouseOverCapture?

> `optional` **onMouseOverCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2345

#### Inherited from

`React.HTMLAttributes.onMouseOverCapture`

***

### onMouseUp?

> `optional` **onMouseUp**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2346

#### Inherited from

`React.HTMLAttributes.onMouseUp`

***

### onMouseUpCapture?

> `optional` **onMouseUpCapture**: `MouseEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2347

#### Inherited from

`React.HTMLAttributes.onMouseUpCapture`

***

### onPaste?

> `optional` **onPaste**: `ClipboardEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2218

#### Inherited from

`React.HTMLAttributes.onPaste`

***

### onPasteCapture?

> `optional` **onPasteCapture**: `ClipboardEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2219

#### Inherited from

`React.HTMLAttributes.onPasteCapture`

***

### onPause?

> `optional` **onPause**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2286

#### Inherited from

`React.HTMLAttributes.onPause`

***

### onPauseCapture?

> `optional` **onPauseCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2287

#### Inherited from

`React.HTMLAttributes.onPauseCapture`

***

### onPlay?

> `optional` **onPlay**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2288

#### Inherited from

`React.HTMLAttributes.onPlay`

***

### onPlayCapture?

> `optional` **onPlayCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2289

#### Inherited from

`React.HTMLAttributes.onPlayCapture`

***

### onPlaying?

> `optional` **onPlaying**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2290

#### Inherited from

`React.HTMLAttributes.onPlaying`

***

### onPlayingCapture?

> `optional` **onPlayingCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2291

#### Inherited from

`React.HTMLAttributes.onPlayingCapture`

***

### onPointerCancel?

> `optional` **onPointerCancel**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2370

#### Inherited from

`React.HTMLAttributes.onPointerCancel`

***

### onPointerCancelCapture?

> `optional` **onPointerCancelCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2371

#### Inherited from

`React.HTMLAttributes.onPointerCancelCapture`

***

### onPointerDown?

> `optional` **onPointerDown**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2364

#### Inherited from

`React.HTMLAttributes.onPointerDown`

***

### onPointerDownCapture?

> `optional` **onPointerDownCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2365

#### Inherited from

`React.HTMLAttributes.onPointerDownCapture`

***

### onPointerEnter?

> `optional` **onPointerEnter**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2372

#### Inherited from

`React.HTMLAttributes.onPointerEnter`

***

### onPointerLeave?

> `optional` **onPointerLeave**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2373

#### Inherited from

`React.HTMLAttributes.onPointerLeave`

***

### onPointerMove?

> `optional` **onPointerMove**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2366

#### Inherited from

`React.HTMLAttributes.onPointerMove`

***

### onPointerMoveCapture?

> `optional` **onPointerMoveCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2367

#### Inherited from

`React.HTMLAttributes.onPointerMoveCapture`

***

### onPointerOut?

> `optional` **onPointerOut**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2376

#### Inherited from

`React.HTMLAttributes.onPointerOut`

***

### onPointerOutCapture?

> `optional` **onPointerOutCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2377

#### Inherited from

`React.HTMLAttributes.onPointerOutCapture`

***

### onPointerOver?

> `optional` **onPointerOver**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2374

#### Inherited from

`React.HTMLAttributes.onPointerOver`

***

### onPointerOverCapture?

> `optional` **onPointerOverCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2375

#### Inherited from

`React.HTMLAttributes.onPointerOverCapture`

***

### onPointerUp?

> `optional` **onPointerUp**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2368

#### Inherited from

`React.HTMLAttributes.onPointerUp`

***

### onPointerUpCapture?

> `optional` **onPointerUpCapture**: `PointerEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2369

#### Inherited from

`React.HTMLAttributes.onPointerUpCapture`

***

### onProgress?

> `optional` **onProgress**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2292

#### Inherited from

`React.HTMLAttributes.onProgress`

***

### onProgressCapture?

> `optional` **onProgressCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2293

#### Inherited from

`React.HTMLAttributes.onProgressCapture`

***

### onRateChange?

> `optional` **onRateChange**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2294

#### Inherited from

`React.HTMLAttributes.onRateChange`

***

### onRateChangeCapture?

> `optional` **onRateChangeCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2295

#### Inherited from

`React.HTMLAttributes.onRateChangeCapture`

***

### onReset?

> `optional` **onReset**: `FormEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2242

#### Inherited from

`React.HTMLAttributes.onReset`

***

### onResetCapture?

> `optional` **onResetCapture**: `FormEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2243

#### Inherited from

`React.HTMLAttributes.onResetCapture`

***

### onScroll?

> `optional` **onScroll**: `UIEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2384

#### Inherited from

`React.HTMLAttributes.onScroll`

***

### onScrollCapture?

> `optional` **onScrollCapture**: `UIEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2385

#### Inherited from

`React.HTMLAttributes.onScrollCapture`

***

### onScrollEnd?

> `optional` **onScrollEnd**: `UIEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2386

#### Inherited from

`React.HTMLAttributes.onScrollEnd`

***

### onScrollEndCapture?

> `optional` **onScrollEndCapture**: `UIEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2387

#### Inherited from

`React.HTMLAttributes.onScrollEndCapture`

***

### onSeeked?

> `optional` **onSeeked**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2296

#### Inherited from

`React.HTMLAttributes.onSeeked`

***

### onSeekedCapture?

> `optional` **onSeekedCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2297

#### Inherited from

`React.HTMLAttributes.onSeekedCapture`

***

### onSeeking?

> `optional` **onSeeking**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2298

#### Inherited from

`React.HTMLAttributes.onSeeking`

***

### onSeekingCapture?

> `optional` **onSeekingCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2299

#### Inherited from

`React.HTMLAttributes.onSeekingCapture`

***

### onSelect?

> `optional` **onSelect**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2350

#### Inherited from

`React.HTMLAttributes.onSelect`

***

### onSelectCapture?

> `optional` **onSelectCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2351

#### Inherited from

`React.HTMLAttributes.onSelectCapture`

***

### onStalled?

> `optional` **onStalled**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2300

#### Inherited from

`React.HTMLAttributes.onStalled`

***

### onStalledCapture?

> `optional` **onStalledCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2301

#### Inherited from

`React.HTMLAttributes.onStalledCapture`

***

### onSubmit?

> `optional` **onSubmit**: `FormEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2244

#### Inherited from

`React.HTMLAttributes.onSubmit`

***

### onSubmitCapture?

> `optional` **onSubmitCapture**: `FormEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2245

#### Inherited from

`React.HTMLAttributes.onSubmitCapture`

***

### onSuspend?

> `optional` **onSuspend**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2302

#### Inherited from

`React.HTMLAttributes.onSuspend`

***

### onSuspendCapture?

> `optional` **onSuspendCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2303

#### Inherited from

`React.HTMLAttributes.onSuspendCapture`

***

### onTimeUpdate?

> `optional` **onTimeUpdate**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2304

#### Inherited from

`React.HTMLAttributes.onTimeUpdate`

***

### onTimeUpdateCapture?

> `optional` **onTimeUpdateCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2305

#### Inherited from

`React.HTMLAttributes.onTimeUpdateCapture`

***

### onToggle?

> `optional` **onToggle**: `ToggleEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2402

#### Inherited from

`React.HTMLAttributes.onToggle`

***

### onTouchCancel?

> `optional` **onTouchCancel**: `TouchEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2354

#### Inherited from

`React.HTMLAttributes.onTouchCancel`

***

### onTouchCancelCapture?

> `optional` **onTouchCancelCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2355

#### Inherited from

`React.HTMLAttributes.onTouchCancelCapture`

***

### onTouchEnd?

> `optional` **onTouchEnd**: `TouchEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2356

#### Inherited from

`React.HTMLAttributes.onTouchEnd`

***

### onTouchEndCapture?

> `optional` **onTouchEndCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2357

#### Inherited from

`React.HTMLAttributes.onTouchEndCapture`

***

### onTouchMove?

> `optional` **onTouchMove**: `TouchEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2358

#### Inherited from

`React.HTMLAttributes.onTouchMove`

***

### onTouchMoveCapture?

> `optional` **onTouchMoveCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2359

#### Inherited from

`React.HTMLAttributes.onTouchMoveCapture`

***

### onTouchStart?

> `optional` **onTouchStart**: `TouchEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2360

#### Inherited from

`React.HTMLAttributes.onTouchStart`

***

### onTouchStartCapture?

> `optional` **onTouchStartCapture**: `TouchEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2361

#### Inherited from

`React.HTMLAttributes.onTouchStartCapture`

***

### onTransitionCancel?

> `optional` **onTransitionCancel**: `TransitionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2406

#### Inherited from

`React.HTMLAttributes.onTransitionCancel`

***

### onTransitionCancelCapture?

> `optional` **onTransitionCancelCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2407

#### Inherited from

`React.HTMLAttributes.onTransitionCancelCapture`

***

### onTransitionEnd?

> `optional` **onTransitionEnd**: `TransitionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2408

#### Inherited from

`React.HTMLAttributes.onTransitionEnd`

***

### onTransitionEndCapture?

> `optional` **onTransitionEndCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2409

#### Inherited from

`React.HTMLAttributes.onTransitionEndCapture`

***

### onTransitionRun?

> `optional` **onTransitionRun**: `TransitionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2410

#### Inherited from

`React.HTMLAttributes.onTransitionRun`

***

### onTransitionRunCapture?

> `optional` **onTransitionRunCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2411

#### Inherited from

`React.HTMLAttributes.onTransitionRunCapture`

***

### onTransitionStart?

> `optional` **onTransitionStart**: `TransitionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2412

#### Inherited from

`React.HTMLAttributes.onTransitionStart`

***

### onTransitionStartCapture?

> `optional` **onTransitionStartCapture**: `TransitionEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2413

#### Inherited from

`React.HTMLAttributes.onTransitionStartCapture`

***

### onVolumeChange?

> `optional` **onVolumeChange**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2306

#### Inherited from

`React.HTMLAttributes.onVolumeChange`

***

### onVolumeChangeCapture?

> `optional` **onVolumeChangeCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2307

#### Inherited from

`React.HTMLAttributes.onVolumeChangeCapture`

***

### onWaiting?

> `optional` **onWaiting**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2308

#### Inherited from

`React.HTMLAttributes.onWaiting`

***

### onWaitingCapture?

> `optional` **onWaitingCapture**: `ReactEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2309

#### Inherited from

`React.HTMLAttributes.onWaitingCapture`

***

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2390

#### Inherited from

`React.HTMLAttributes.onWheel`

***

### onWheelCapture?

> `optional` **onWheelCapture**: `WheelEventHandler`\<`HTMLDivElement`\>

Defined in: node\_modules/@types/react/index.d.ts:2391

#### Inherited from

`React.HTMLAttributes.onWheelCapture`

***

### part?

> `optional` **part**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2811

#### See

[https://developer.mozilla.org/en-US/docs/Web/HTML/Global\_attributes/part](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part)

#### Inherited from

`React.HTMLAttributes.part`

***

### popover?

> `optional` **popover**: `""` \| `"auto"` \| `"manual"` \| `"hint"`

Defined in: node\_modules/@types/react/index.d.ts:2785

#### Inherited from

`React.HTMLAttributes.popover`

***

### popoverTarget?

> `optional` **popoverTarget**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2787

#### Inherited from

`React.HTMLAttributes.popoverTarget`

***

### popoverTargetAction?

> `optional` **popoverTargetAction**: `"toggle"` \| `"show"` \| `"hide"`

Defined in: node\_modules/@types/react/index.d.ts:2786

#### Inherited from

`React.HTMLAttributes.popoverTargetAction`

***

### prefix?

> `optional` **prefix**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2763

#### Inherited from

`React.HTMLAttributes.prefix`

***

### property?

> `optional` **property**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2764

#### Inherited from

`React.HTMLAttributes.property`

***

### radioGroup?

> `optional` **radioGroup**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2753

#### Inherited from

`React.HTMLAttributes.radioGroup`

***

### rel?

> `optional` **rel**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2765

#### Inherited from

`React.HTMLAttributes.rel`

***

### resource?

> `optional` **resource**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2766

#### Inherited from

`React.HTMLAttributes.resource`

***

### results?

> `optional` **results**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2780

#### Inherited from

`React.HTMLAttributes.results`

***

### rev?

> `optional` **rev**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2767

#### Inherited from

`React.HTMLAttributes.rev`

***

### role?

> `optional` **role**: `AriaRole`

Defined in: node\_modules/@types/react/index.d.ts:2756

#### Inherited from

`React.HTMLAttributes.role`

***

### security?

> `optional` **security**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2781

#### Inherited from

`React.HTMLAttributes.security`

***

### slot?

> `optional` **slot**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2745

#### Inherited from

`React.HTMLAttributes.slot`

***

### spellCheck?

> `optional` **spellCheck**: `Booleanish`

Defined in: node\_modules/@types/react/index.d.ts:2746

#### Inherited from

`React.HTMLAttributes.spellCheck`

***

### style?

> `optional` **style**: `CSSProperties`

Defined in: node\_modules/@types/react/index.d.ts:2747

#### Inherited from

`React.HTMLAttributes.style`

***

### suppressContentEditableWarning?

> `optional` **suppressContentEditableWarning**: `boolean`

Defined in: node\_modules/@types/react/index.d.ts:2728

#### Inherited from

`React.HTMLAttributes.suppressContentEditableWarning`

***

### suppressHydrationWarning?

> `optional` **suppressHydrationWarning**: `boolean`

Defined in: node\_modules/@types/react/index.d.ts:2729

#### Inherited from

`React.HTMLAttributes.suppressHydrationWarning`

***

### tabIndex?

> `optional` **tabIndex**: `number`

Defined in: node\_modules/@types/react/index.d.ts:2748

#### Inherited from

`React.HTMLAttributes.tabIndex`

***

### title?

> `optional` **title**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2749

#### Inherited from

`React.HTMLAttributes.title`

***

### translate?

> `optional` **translate**: `"yes"` \| `"no"`

Defined in: node\_modules/@types/react/index.d.ts:2750

#### Inherited from

`React.HTMLAttributes.translate`

***

### typeof?

> `optional` **typeof**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2768

#### Inherited from

`React.HTMLAttributes.typeof`

***

### unselectable?

> `optional` **unselectable**: `"off"` \| `"on"`

Defined in: node\_modules/@types/react/index.d.ts:2782

#### Inherited from

`React.HTMLAttributes.unselectable`

***

### variant?

> `optional` **variant**: `"default"` \| `"destructive"` \| `"outline"` \| `"secondary"` \| `null`

Defined in: [src/components/ui/badge.tsx:10](https://github.com/zynqly-smartkassa/smart-kassa/blob/de54eaa3e5027d345b94c25040896cec3a2cb70b/frontend/src/components/ui/badge.tsx#L10)

#### Inherited from

`VariantProps.variant`

***

### vocab?

> `optional` **vocab**: `string`

Defined in: node\_modules/@types/react/index.d.ts:2769

#### Inherited from

`React.HTMLAttributes.vocab`
