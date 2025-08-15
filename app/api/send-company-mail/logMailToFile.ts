import fs from 'fs';
import path from 'path';

export const logMailToFile = (entry: string) => {
  const dirPath = path.join(__dirname, 'logs');
  const logFilePath = path.join(dirPath, 'sent-mails-log.txt');

  // Make sure folder exists
  // if (!fs.existsSync(dirPath)) {
  //   fs.mkdirSync(dirPath, { recursive: true });
  // }

  try {
    fs.appendFileSync(logFilePath, entry, 'utf8');
  } catch (e) {
    console.log('Error writing log to file: ', e);
  }
};
