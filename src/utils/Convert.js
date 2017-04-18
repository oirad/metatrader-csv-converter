import JSZip from 'jszip';
import parse from 'csv-parse';

import Ctrader from './converters/Ctrader';

export default class Convert {

  /**
   * @param {File} source
   * @param {String} outputType
   */
  constructor(source, outputType) {
    this.source = source;
    this.outputType = outputType;

    this.read(source)
      .then((content) => { return this.parseCsv(content); })
      .then((data) => { return this.convert(data); })
      .catch((err) => {
        postMessage({ type: 'error', data: { error: err.toString() } });
      });
  }

  /**
   * Reads the File and returns a promise containing its contents
   *
   * @param {File} source
   * @return {Promise}
   */
  read(source) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const promise = new Promise((resolve, reject) => {
        if (/zip$/.test(source.name)) {
          reader.onload = (event) => { resolve(this.ziploaded(event)); };
          reader.readAsArrayBuffer(source);
        } else {
          reader.onload = (event) => { resolve(event.target.result); };
          reader.readAsText(source);
        }
      });
      promise
        .then((res) => {
          postMessage({ type: 'progress', data: { value: 40 } });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Invoked once the contents of the file (if in zip format) are loaded
   *
   * @param {Event} event
   * @return {Promise}
   */
  ziploaded(event) {
    return new Promise((resolve, reject) => {
      const content = event.target.result;
      const zip = new JSZip();

      zip.loadAsync(content)
        .then((zipcontent) => {
          const file = zipcontent.file(/.*/)[0];
          file.async('string')
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        });
    });
  }

  /**
   * Parses the CSV (semicolon separated)
   *
   * @param {String} content
   * @return {Promise}
   */
  parseCsv(content) {
    return new Promise((resolve, reject) => {
      parse(content, {delimiter: ';'}, (err, output) => {
        if (err) {
          reject(err);
        } else {
          postMessage({ type: 'progress', data: { value: 70 } });
          resolve(output);
        }
      });
    });
  }

  /**
   * @param {Array} content
   */
  convert(content) {
    if (this.outputType === 'ctrader') {
      const ctrader = new Ctrader();
      ctrader.export(content)
        .then((blob) => {
          postMessage({ type: 'done!', data: { value: 100, blob } });
        });
    } else {
      postMessage({ type: 'error', data: { error: 'Output type not supported' } });
    }
  }

}
