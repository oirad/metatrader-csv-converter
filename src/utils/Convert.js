import JSZip from 'jszip';
import csv from 'csv';

export default class Convert {

  constructor(source, outputType) {
    this.source = source;
    this.outputType = outputType;

    this.read(source)
      .then(this.parseCsv)
      .then(this.convert)
      .catch((err) => {
        console.log(err);
      });
  }

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
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  ziploaded(event) {
    return new Promise((resolve, reject) => {
      const content = event.target.result;
      const zip = new JSZip();

      zip.loadAsync(content)
        .then((zipcontent) => {
          const file = zipcontent.file(/.*/)[0];
          console.log(file);
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

  parseCsv(content) {
    return new Promise((resolve, reject) => {
      csv.parse(content, {delimiter: ';'}, (err, output) => {
        if (err) {
          reject(err);
        }
        resolve(output);
      });
    });
  }

  convert(content) {

    console.log(content);

  }

}
