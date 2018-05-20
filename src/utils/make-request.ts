import axios, { AxiosPromise } from 'axios';
import WebSocket from 'isomorphic-ws';

export interface IHttpConfig {
  type: 'http';
  addr: string;
  port: number;
  timeout: number;
}

export function makeHttpRequest(config: IHttpConfig): AxiosPromise<any> {
  return axios.post(
    `${config.addr}:${config.port}`,
    '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}',
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
      timeout: config.timeout,
    },
  );
}

export interface IWSConfig {
  type: 'ws';
  addr: string;
  port: number;
  timeout: number;
}

export function makeWsRequest(config: IWSConfig) {
  const socket = new WebSocket(`${config.addr}:${config.port}`, {
    handshakeTimeout: config.timeout,
  });
  return new Promise((resolve, reject) => {
    socket.onopen = () => {
      resolve('worked');
    };

    setTimeout(() => {
      reject(Error('timeout'));
    }, config.timeout);
  });
}

export type RequestConfig = IWSConfig | IHttpConfig;
export function makeRequest(config: RequestConfig) {
  switch (config.type) {
    case 'http':
      return makeHttpRequest(config);
    case 'ws':
      return makeWsRequest(config);
  }
}
