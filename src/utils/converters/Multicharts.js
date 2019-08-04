import Abstract from './Abstract';

export default class Multicharts extends Abstract {

  constructor() {
    super();
  }

  /**
   * @inheritdocs
   */
  static convertLine(line) {
    const dateParts = line[0].split('/');
    const timeParts = line[1].split(':');
    const newline = [
      `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`,
      `${timeParts[0]}:${dateParts[1]}`,
      line[2],
      line[3],
      line[4],
      line[5],
      line[6] > 0 ? line[6] : 1
    ];
    return `${newline.join(',')}\r\n`;
  }

}
