import * as path from 'path';
import * as fs from 'fs';
import * as Papa from 'papaparse';

const csvFilePath = path.resolve(__dirname, '../data/us-zips.csv');

const readCsv = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
    Papa.parse(fileContent, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error: any) => {
        reject(error);
      },
    });
  });
};

export const resolvers = {
  getZipByCode: async ({ zip }: { zip: string }) => {
    const data = await readCsv();
    return data.find((row) => row.zip === zip);
  },
  getZipsByState: async ({ state_name }: { state_name: string }) => {
    const data = await readCsv();
    return data.filter((row) => row.state_name === state_name);
  },
};
