import JSZip from 'jszip';
import LineNavigator from 'line-navigator';

import Ctrader from './converters/Ctrader';
import Ninjatrader from './converters/Ninjatrader';

export default class Convert {

  /**
   * @param {File} source
   * @param {String} outputType
   */
  constructor(source, outputType) {
    this.outputType = outputType;

    const converter = this.getConverter();

    if (/csv$/.test(source.name)) {
      this.process(source, converter);
    } else if (/zip$/.test(source.name)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.ziploaded(event).then((data) => {
          this.process(data, converter);
        });
      };
      reader.readAsArrayBuffer(source);
    } else {
      postMessage({ type: 'error', data: { error: 'Filetype is not supported' } });
    }
  }

  /**
   * @param {File} source
   * @param {Class} converter
   */
  process(source, converter) {
    const navigator = new LineNavigator(source);
    let result = '';

     const linesReadHandler = (err, index, lines, isEof, progress) => {
      if (err) {
        throw err;
      }
      lines.forEach((line) => {
        const parts = line.split(';');
        if (parts.length === 7) {
          result += converter.convertLine(line.split(';'));
        }
      });
      if (isEof) {
        postMessage({ type: 'done!', data: { value: 100, blob: converter.generateBlob(result) } });
        return;
      }
      postMessage({ type: 'progress', data: { value: progress } });
      navigator.readSomeLines(index + lines.length, linesReadHandler);
    };
    navigator.readSomeLines(0, linesReadHandler);
  }

  /**
   * Gets the correct converter according to the outputType specified
   *
   * @return {Class}
   */
  getConverter() {
    if (this.outputType === 'ctrader') {
      return Ctrader;
    } else if (this.outputType === 'ninjatrader') {
      return Ninjatrader;
    } else {
      postMessage({ type: 'error', data: { error: 'Output type not supported' } });
    }
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
              resolve(new File([data], file));
            })
            .catch((err) => {
              reject(err);
            });
        });
    });
  }
}
