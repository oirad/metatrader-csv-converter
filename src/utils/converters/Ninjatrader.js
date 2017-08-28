import Abstract from './Abstract';

export default class Ninjatrader extends Abstract {

  constructor() {
    super();
  }

  /**
   * @inheritdocs
   */
  static convertLine(line) {
    const hasTime = line[1].length > 0;
    const dateParts = line[0].split('/');
    const timedata = line[1].split(':').join('').length <= 4 ? line[1].split(':').join('') + '00' : line[1].split(':').join('');
    const time = hasTime ? ` ${timedata}` : '';
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
