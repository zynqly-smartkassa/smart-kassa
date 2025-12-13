[**frontend**](../../../../README.md)

***

[frontend](../../../../README.md) / [hooks/rides/useRideStates](../README.md) / useRideStates

# Function: useRideStates()

> **useRideStates**(`isRideActive`, `driverLocation`): `object`

Defined in: [src/hooks/rides/useRideStates.ts:5](https://github.com/zynqly-smartkassa/smart-kassa/blob/de54eaa3e5027d345b94c25040896cec3a2cb70b/frontend/src/hooks/rides/useRideStates.ts#L5)

## Parameters

### isRideActive

`boolean`

### driverLocation

\[`number`, `number`\] | `null`

## Returns

`object`

### checkRide()

> **checkRide**: () => `boolean`

#### Returns

`boolean`

### destination

> **destination**: `string`

### destinationCoords

> **destinationCoords**: \[`number`, `number`\] \| `null`

### isDestinationInvalid

> **isDestinationInvalid**: `boolean`

### isRoutCalculated

> **isRoutCalculated**: `boolean`

### routingStartCoords

> **routingStartCoords**: \[`number`, `number`\] \| `null`

### setDestination

> **setDestination**: `Dispatch`\<`SetStateAction`\<`string`\>\>

### setDestinationCoords

> **setDestinationCoords**: `Dispatch`\<`SetStateAction`\<\[`number`, `number`\] \| `null`\>\>

### setIsRouteCalculated

> **setIsRouteCalculated**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

### setRoutingStartCoords

> **setRoutingStartCoords**: `Dispatch`\<`SetStateAction`\<\[`number`, `number`\] \| `null`\>\>

### setShowDestinationHint

> **setShowDestinationHint**: `Dispatch`\<`SetStateAction`\<`boolean`\>\>

### setTimer

> **setTimer**: `Dispatch`\<`SetStateAction`\<`number`\>\>

### showDestinationHint

> **showDestinationHint**: `boolean`

### showNewRoute()

> **showNewRoute**: () => `void`

#### Returns

`void`

### timer

> **timer**: `number`
