/*
 * heap-server
 * https://github.com/anthonyringoet/heap-server
 *
 * Copyright (c) 2014 Anthony Ringoet
 * Licensed under the MIT license.
 */
const rp = require('request-promise');
const HEAP_URL = 'https://heapanalytics.com/api/';

module.exports = class Heap {

  constructor(app_id, debug) {
    if (!app_id) {
      throw new TypeError('An api token is required');
    }

    this.debug = debug;
    this.app_id = app_id;
  }

  push(data) {
    const { app_id } = this;
    const body = Object.assign({ app_id }, data);
    const url = HEAP_URL + (body.event ? 'track' : 'identify');
    const json = true;
    const method = 'POST';

    return this.send(url, json, method, body)
      .catch(err => {
        if (this.debug) {
          console.log(err);
        }
        return err;
      });
  };

  // this method can be stubbed out for testing
  send(url, json, method, body) {
    return rp({ url, json, method, body });
  }

};
