# Stoopy

## Install

```bash
yarn add @seasonedsoftware/stoopy
```

## Usage

Check [the samples](https://seasonedsoftware.github.io/stoopy/).

## API

| Property                      |    Type     | Required |                 Default                  |
| ----------------------------- | :---------: | :------: | :--------------------------------------: |
| [fields](#fields)             |    Array    |    ✔     |                    -                     |
| [initialState](#initialstate) |   Object    |          |                    -                     |
| [onNext](#onnext)             |    Func     |          |                    -                     |
| [onEnd](#onend)               |    Func     |          |                    -                     |
| [saving](#saving)             |    Bool     |          |                  false                   |
| [onProgress](#onProgress)     |    Func     |          |                    -                     |
| [layout](#layout)             | Object/Func |          |                    -                     |
| [title](#title)               |   String    |          | "Almost there! Just a few more steps..." |
| [Children](#text)             |  Component  |          |                    -                     |

### fields

Ex:

```javascript
;[
  'field1', // defaults to text input,
  { name: 'field2', label: 'Second Field', type: 'field' }, // field object
]
```

Here is where you define your form itself.
It must be an `Array`, as the order of the inputs is the order in which fields steps will be shown.
If the element is a string, it will become a text field, using the string as field
name and label (Capitalized).
Most commonly, you will use the field object. It uses [react-use-form-state](https://github.com/wsmd/react-use-form-state) under the hood, so bellow are all the available
options:

#### field object

This are all available options:

```javascript
{ name: 'name', // required
label: 'label', // if none is provided, will default to Name (Capitalized)
type: 'fieldType', // if none is provided, will default to text
optional: true, // if set to true, the field can be skiped without filling. By default, all fields are required.
choices: ['choice1', { value: 'choice2', label: 'differentName' }], // if using default multiple choice inputs like radio, select, etc
Component: ({ value, setValue, color })  => (
  <input
    value={value}
    onChange={setValue}
    color={color}
  />
),
// react-use-form-state props.
onChange: func, // react-use-form-state props.
onBlur: func, // same
validate: func, // validation
validateOnBlur: boolean,
touchOnChange: boolean,
// Any other properties will go directly to the input component.
other: 'props' // goes to the input component
}
```

#### type

Those are all the currently available types, some are custom types, some have extra config on top of
`react-use-form-state` field types. Besides them, you can always use the ones listed [here](https://github.com/wsmd/react-use-form-state#input-types) and provide a custom component to work with them.

- `text`
- `select`
- `checkbox`
- `radio`

### initialState

Ex: `{ field1: 'value'}`

With this prop you can provide a initialState to your form.
This is useful, for instance, if you want to save each step on your backend and allow your user to continue from where he stopped on a different session.
Those values will still be considered in step/progress counting.

### onNext

Ex: `({ value, values }) => doSomething(value) // or doSomething(values)`

Function to be called every time a step is submited. It receives an object with two parameters,
`value` and `values`. `value` is the current step's input value, while `values`
includes the values of all steps so far.

### onEnd

Ex: `values => doSomething(values)`

A function to be called after the last step is submited. It receives an object
with the values from all fields of the form.

### saving

Ex: `true|false`
When true, Stoopy will display a loading animation instead of the form. For instance, if your onNext/onEnd functions perform http requests to save the data somewhere else, you should set `saving` to true when the request begins, and back to false when its done.

### onProgress

Ex: `({ currentStep, totalSteps }) => showProgress(currentStep, totalSteps)`

A function to be called everytime progress changes. You can also directly provide an custom progress tracker to [layout](#layout) (see bellow),
but if you need to take this info somewhere else, you use `onProgress` prop.

### layout

Ex: `{ ProgressTracker: CustomProgressTracker, NextButton: CustomNextButton}` or
Ex: `({ CurrentField, nextProps, BackProps, progress, saving }) => // your layout goes here`

This prop works in two diferent ways:

1. If you provide it an object, you can override the default components with your own. Check [here](#layout-object) for the full list.
2. If you need, however, more customization, you can provide it with a component (a [render prop](https://reactjs.org/docs/render-props.html)) that
   receives four props:

- `CurrentField`: Where the current input will be shown. You can optionally provide it with an `customInputs` prop, an object override the defaults
  inputs. Ex: `<CurrentField customInputs={{ radioInput: CustomRadioInput, ...}}` />
- `nextProps`: An object containing necessary props for your next button to work properly.
- `backProps`: An object containing necessary props for your back button to work properly.
- `progress`: Same progress object received by [onProgress](#onprogress), with `currentStep` and `totalSteps`.
- `saving`: Loading state provided in [saving](#saving)

Bellow you can check which are all the default components you can override within your `layout object`

#### layout object

- `FormHeader`: Component that stays on top of the form, receives same `progress` object received by [onProgress](#onprogress).
- `ProgressTracker`: Self explaining, also receives the same `progress` object.
- `Loading`: Component to show when saving is set to `true`.
- `NextButton`: Component for submitting the current step. Receives a `nextProps` object with props needed (actually, for now just a `type=submit`).
- `BackButton`: Component for submitting the current step. Receives a `backProps` object with props needed (onClick).
- `customInputs`: An object where you can override all default inputs. See the full list [bellow](#default-inputs)

#### default inputs

Those are the currently available defaults:

- `TextInput`
- `SelectInput`
- `RadioInput`
- `CheckboxInput`

### title

Ex: `"Complete this great form!"`

A string to be used as title on top of the form.

### Children

Ex: `() => <h1>Congrats, you just finished this form!</h1>`

When there are no more fields, stoopy will render the children.

## License

MIT © [Seasoned](https://github.com/SeasonedSoftware)
