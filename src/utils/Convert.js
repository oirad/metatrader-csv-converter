import JSZip from 'jszip';

export default class Convert {

  constructor(source, outputType) {
    this.source = source;
    this.outputType = outputType;
    const reader = new FileReader();
    if (this.source.type === 'application/zip') {
      reader.onload = (event) => { this.loaded(event); };
      reader.readAsArrayBuffer(source);
    } else {
      reader.onload = (event) => {
        this.parseCsv(event.target.result);
      }
      reader.readAsText(source);
    }
  }

  loaded(event) {
    const content = event.target.result;
    const zip = new JSZip();

    zip.loadAsync(content)
      .then((zipcontent) => {
        const file = zipcontent.file(/.*/)[0];
        console.log(file);
        file.async('string')
          .then((data) => {
            this.parseCsv(data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  parseCsv(content) {
    console.log(content);
  }

}
