import Abstract from './Abstract';

export default class Ninjatrader extends Abstract {

  constructor() {
    super();
  }

  /**
   * Check if at least one of the lines passed have a time
   *
   * @param {Array} elements
   * @return {Boolean}
   */
  hasTime(elements) {
    return elements.some((line) => {
      return parseInt(line[1]) > 0;
    });
  }

  /**
   * @inheritdocs
   */
  convert(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      const hasTime = this.hasTime(data.slice(0, 10));
      data.forEach((line) => {
        const dateParts = line[0].split('/');
        const time = hasTime ? ` ${line[1].split(':').join('')}` : '';
        const newline = [
          `${dateParts[2]}${dateParts[1]}${dateParts[0]}${time}`,
          line[2],
          line[3],
          line[4],
          line[5],
          line[6] || 0
        ];
        result += `${newline.join(';')}\r\n`;
      });
      resolve(result);
    });
  }

}
