import Abstract from './Abstract';

export default class Ctrader extends Abstract {

  constructor() {
    super();
  }

  /**
   * @inheritdocs
   */
  convert(data) {
    return new Promise((resolve, reject) => {
      let result = '';
      data.forEach((line) => {
        const dateParts = line[0].split('/');
        const newline = [
          `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`,
          line[1],
          line[2],
          line[3],
          line[4],
          line[5],
          line[6] > 0 ? line[6] : 1
        ];
        result += `${newline.join(',')}\r\n`;
      });
      resolve(result);
    });
  }

}
