import Abstract from './Abstract';

export default class Ninjatrader extends Abstract {

  constructor() {
    super();
  }

  /**
   * @inheritdocs
   */
  static convertLine(line) {
    const hasTime = parseInt(line[1]) > 0;
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
    return `${newline.join(';')}\r\n`;
  }

}
