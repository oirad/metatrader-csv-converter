export default class Abstract {

  /**
   * Used to partially enforce abstract patterns
   */
	constructor() {
    if (this.constructor === Abstract) {
      throw new TypeError('Can not construct abstract class.');
    }
    if (this.convert === Abstract.prototype.convert) {
      throw new TypeError('Please implement abstract method convert.');
    }
  }

  /**
   * Converts the passed line
   *
   * @param {Array} data
   * @return {String}
   * @abstract
   * @static
   */
	static convertLine() {
    throw new TypeError('Do not call abstract method convert from child.');
  }

  /**
   * Generates the output file url
   *
   * @param {String} data
   * @return {Blob}
   *
   */
  static generateBlob(data) {
    return new Blob([data], { type: 'data:text/csv;charset=utf-8' });
  };

}
