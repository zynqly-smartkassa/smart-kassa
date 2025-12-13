[**frontend**](../../../README.md)

***

[frontend](../../../README.md) / [hooks/useToast](../README.md) / useWarningToast

# Function: useWarningToast()

> **useWarningToast**(`showToast`, `message`, `resetAction`): `void`

Defined in: [src/hooks/useToast.ts:13](https://github.com/zynqly-smartkassa/smart-kassa/blob/de54eaa3e5027d345b94c25040896cec3a2cb70b/frontend/src/hooks/useToast.ts#L13)

Toast to show the User that he has to log in to use the App

## Parameters

### showToast

`boolean`

The Boolean Value to show the Toast or not (used to controll when to show the toast)

### message

`string`

The Message in the Toast

### resetAction

`ThunkDispatch`\<\{ `authState`: `AuthState`; `toastState`: \{ `showWarning`: `boolean`; \}; `user`: `USER_DTO`; \}, `undefined`, `UnknownAction`\> & `Dispatch`\<`UnknownAction`\>

The Dispatcher to globaly set the showToast Value to false

## Returns

`void`

## Author

Casper Zielinski
