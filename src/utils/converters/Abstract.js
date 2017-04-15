export default class Abstract {

	constructor() {
    if (this.constructor === Abstract) {
      throw new TypeError("Can not construct abstract class.");
    }
    if (this.convert === Abstract.prototype.convert) {
      throw new TypeError("Please implement abstract method convert.");
    }
  }

	convert() {
    throw new TypeError("Do not call abstract method convert from child.");
  }

  generateurl(data) {
    return new Promise((resolve) => {
      resolve(`data:text/csv;charset=utf-8,${encodeURIComponent(data)}`);
    });
  };

  export(data) {
    return this.convert(data)
      .then(this.generateurl);
  }

}
