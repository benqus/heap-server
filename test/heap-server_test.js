const chai = require('chai');
const sinon = require('sinon');
const Promise = require('bluebird');

const Heap = require('../lib/heap-server.js');

const app_id = '--some-key--';

const { assert, expect } = chai;

describe('The client', () => {

  describe('is invoked without an id', () => {

    it('should trow an error', (done) => {
      assert.throws(() => new Heap());
      done();
    });

  });

  describe('functionality', () => {

    let heapClient = null;

    beforeEach(() => {
      heapClient = new Heap(app_id);
    });

    it('sends a call to remote', () => {
      const promise = new Promise(resolve => resolve());
      const stub = sinon.stub(heapClient, 'send').returns(promise);

      heapClient.push({ event: true });

      expect(stub.callCount).to.equal(1);
    });

    it('sends a call to "track" endpoint', () => {
      const promise = new Promise(resolve => resolve());
      const stub = sinon.stub(heapClient, 'send').returns(promise);
      const event = 'someEvent';

      heapClient.push({ event });

      expect(stub.getCall(0).args).to.deep.equal([
        'https://heapanalytics.com/api/track',
        true,
        'POST',
        { app_id, event }
      ]);
    });

    it('sends a call to "identify" endpoint', () => {
      const promise = new Promise(resolve => resolve());
      const stub = sinon.stub(heapClient, 'send').returns(promise);
      const payload = { a: 'a'};

      heapClient.push({ payload });

      expect(stub.getCall(0).args).to.deep.equal([
        'https://heapanalytics.com/api/identify',
        true,
        'POST',
        { app_id, payload }
      ]);
    });

  });

});
