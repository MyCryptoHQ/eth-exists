import {
  IHttpConfig,
  IWSConfig,
  makeRequest,
  RequestConfig,
} from './utils/make-request';

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

const DEFAULT_CONFIGS = [DEFAULT_HTTP, DEFAULT_WS];

export type SuccessConfig = RequestConfig & {
  success: true;
};

export type FailConfig = RequestConfig & {
  success: false;
  error: Error;
};

export interface IOptions {
  includeDefaults: boolean;
}

export function exists(
  configs: RequestConfig[] = [],
  opts: IOptions = { includeDefaults: true },
) {
  const configsToCheck = [
    ...configs,
    ...(opts.includeDefaults ? DEFAULT_CONFIGS : []),
  ];
  const result: Promise<(SuccessConfig | FailConfig)[]> = Promise.all(
    configsToCheck.map(c =>
      makeRequest(c)
        .then(() => ({ ...c, success: true as true }))
        .catch(e => ({ ...c, success: false as false, error: e as Error })),
    ),
  );

  return result;
}
