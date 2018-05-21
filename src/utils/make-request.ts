import axios from 'axios';
import WebSocket from 'isomorphic-ws';

export interface IHttpConfig {
  type: 'http';
  addr: string;
  port: number;
  timeout: number;
}

export function makeHttpRequest(config: IHttpConfig) {
  return axios
    .post(
      `${config.addr}:${config.port}`,
      '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}',
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        timeout: config.timeout,
      },
    )
    .then(r => {
      if (r.status !== 200) {
        throw Error('Request failed');
      }
      return r;
    });
}

export interface IWSConfig {
  type: 'ws';
  addr: string;
  port: number;
  timeout: number;
}

export function makeWsRequest(config: IWSConfig) {
  const url = `${config.addr}:${config.port}`;
  console.log(url);
  const socket = new WebSocket(url, {
    handshakeTimeout: config.timeout,
  });
  return new Promise((resolve, reject) => {
    let timeout: NodeJS.Timer;
    socket.onopen = () => {
      clearTimeout(timeout);
      resolve('worked');
    };

    socket.onerror = e => {
      clearTimeout(timeout);
      reject(e);
    };

    timeout = setTimeout(() => {
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
