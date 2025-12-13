[**frontend**](../../../README.md)

***

[frontend](../../../README.md) / [utils/secureStorage](../README.md) / SecureStorage

# Variable: SecureStorage

> `const` **SecureStorage**: `object`

Defined in: [src/utils/secureStorage.ts:10](https://github.com/zynqly-smartkassa/smart-kassa/blob/de54eaa3e5027d345b94c25040896cec3a2cb70b/frontend/src/utils/secureStorage.ts#L10)

Secure storage utility that uses Capacitor Preferences on mobile
and localStorage on web

## Type Declaration

### clear()

> **clear**(): `Promise`\<`void`\>

Clear all values from secure storage

#### Returns

`Promise`\<`void`\>

### get()

> **get**(`key`): `Promise`\<`string` \| `null`\>

Get a value from secure storage

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`string` \| `null`\>

### remove()

> **remove**(`key`): `Promise`\<`void`\>

Remove a value from secure storage

#### Parameters

##### key

`string`

#### Returns

`Promise`\<`void`\>

### set()

> **set**(`key`, `value`): `Promise`\<`void`\>

Set a value in secure storage

#### Parameters

##### key

`string`

##### value

`string`

#### Returns

`Promise`\<`void`\>
