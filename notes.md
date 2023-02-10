# Notes

## remove repetition on edit and add a new task forms:

- make it so the state that decides which form opens has a type proprety in addition to other information:

```js
state =
{
    type : "edit",
	title : ...,
	description : ...,
	priority : ...,
}
```

```js
state =
{
    type : "add",
	title : ...,
	description : ...,
	priority : ...,
}
```

```js
state = null;
```

upon the form component obtaining this state, change the title of the form to depend on the type and then load task information from the state object
