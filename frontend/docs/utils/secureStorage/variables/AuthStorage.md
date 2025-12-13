[**frontend**](../../../README.md)

***

[frontend](../../../README.md) / [utils/secureStorage](../README.md) / AuthStorage

# Variable: AuthStorage

> `const` **AuthStorage**: `object`

Defined in: [src/utils/secureStorage.ts:60](https://github.com/zynqly-smartkassa/smart-kassa/blob/de54eaa3e5027d345b94c25040896cec3a2cb70b/frontend/src/utils/secureStorage.ts#L60)

Auth storage utility for tokens

## Type Declaration

### clearAccessToken()

> **clearAccessToken**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

### clearTokens()

> **clearTokens**(): `Promise`\<`void`\>

Remove all tokens (for logout)

#### Returns

`Promise`\<`void`\>

### getAccessToken()

> **getAccessToken**(): `Promise`\<`string` \| `null`\>

Get the access token

#### Returns

`Promise`\<`string` \| `null`\>

### getRefreshToken()

> **getRefreshToken**(): `Promise`\<`string` \| `null`\>

Get the refresh token

#### Returns

`Promise`\<`string` \| `null`\>

### setTokens()

> **setTokens**(`accessToken`, `refreshToken?`): `Promise`\<`void`\>

Save access and refresh tokens

#### Parameters

##### accessToken

`string`

##### refreshToken?

`string`

#### Returns

`Promise`\<`void`\>
