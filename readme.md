# eth-exists

A library that helps check for available nodes / providers.
Useful for when you want to check a list of providers and see which ones
are online.

## Usage

```ts
import { exists } from 'mycrypto-eth-exists';

// a provider to see if they're online or not by sending a
// getNetVersion JSON-RPC request to them and checking for a response
const httpProviderToCheck: IHttpConfig = {
  type: 'http',
  addr: 'http://localhost',
  port: 8545,
  timeout: 5000,
};

// a provider to see if they're online or not by
// attempting to open a ws connection to that address
const wsProviderToCheck: IWSConfig = {
  type: 'ws',
  addr: 'ws://localhost',
  port: 8546,
  timeout: 5000,
};

// array of providers to check
const providersToCheck = [httpProviderToCheck, wsProviderToCheck];

// whether to include the default provider checks
const includeDefaults = false;

async function example() {
  // results will contain an array of providers with the same data as the initially declared
  // objects above, except they will now have a success parameter included to see if
  // they were succesfully connected to or not
  // and an error parameter of the error if it failed to connect
  const results = await exists(providersToCheck, includeDefaults);
}
```

## Provider Check Defaults

```ts
const DEFAULT_WS: IWSConfig = {
  type: 'ws',
  addr: 'ws://localhost',
  port: 8546,
  timeout: 5000,
};

const DEFAULT_HTTP: IHttpConfig = {
  type: 'http',
  addr: 'http://localhost',
  port: 8545,
  timeout: 5000,
};
```
