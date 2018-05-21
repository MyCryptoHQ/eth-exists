import { makeHttpRequest, makeWsRequest } from '@src/utils/make-request';
import { Server } from 'mock-socket';
import moxios from 'moxios';

describe('makeHttpRequest tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should return with a successful request', done => {
    makeHttpRequest({
      addr: '',
      port: 100000,
      timeout: 5000,
      type: 'http',
    }).then(() => {
      done();
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200 });
    });
  });

  it('should return with a failed request', done => {
    makeHttpRequest({
      addr: '',
      port: 100000,
      timeout: 5000,
      type: 'http',
    }).catch(e => {
      done();
    });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWithTimeout();
    });
  });
});
