export default class Abstract {

  /**
   * Used to partially enforce abstract patterns
   */
	constructor() {
    if (this.constructor === Abstract) {
      throw new TypeError("Can not construct abstract class.");
    }
    if (this.convert === Abstract.prototype.convert) {
      throw new TypeError("Please implement abstract method convert.");
    }
  }

  /**
   * Converts the passed data to the new csv format
   *
   * @param {Array} data
   * @return {Promise}
   * @abstract
   */
	convert() {
    throw new TypeError("Do not call abstract method convert from child.");
  }

  /**
   * Generates the output file url
   *
   * @param {String} data
   * @return {Promise}
   */
  generateurl(data) {
    return new Promise((resolve) => {
      resolve(`data:text/csv;charset=utf-8,${encodeURIComponent(data)}`);
    });
  };

  /**
   * Main function
   *
   * @param {Array} data
   * @return {String}
   */
  export(data) {
    return this.convert(data)
      .then(this.generateurl);
  }

}
