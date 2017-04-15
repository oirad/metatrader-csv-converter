import JSZip from 'jszip';
import csv from 'csv';

import Ctrader from './converters/Ctrader';

export default class Convert {

  /**
   * @param {File} source
   * @param {String} outputType
   */
  constructor(source, outputType, index, parent) {
    this.source = source;
    this.outputType = outputType;
    this.index = index;
    this.parent = parent;

    this.read(source)
      .then((content) => { return this.parseCsv(content); })
      .then((data) => { return this.convert(data); })
      .catch((err) => {
        console.log(err);
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
        if (source.type === 'application/zip') {
          reader.onload = (event) => { resolve(this.ziploaded(event)); };
          reader.readAsArrayBuffer(source);
        } else {
          reader.onload = (event) => { resolve(event.target.result); };
          reader.readAsText(source);
        }
      });
      promise
        .then((res) => {
          const results = this.parent.state.results;
          results[this.index].value = 40;
          this.parent.setState({ results });
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
      csv.parse(content, {delimiter: ';'}, (err, output) => {
        if (err) {
          reject(err);
        } else {
          const results = this.parent.state.results;
          results[this.index].value = 70;
          this.parent.setState({ results });
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
        .then((href) => {
          const results = this.parent.state.results;
          results[this.index].value = 100;
          results[this.index].href = href;
          this.parent.setState({ results });
        });
    } else {
      console.log('output type not supported');
    }
  }

}
