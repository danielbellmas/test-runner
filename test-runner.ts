import { Test, TestResult } from './types';
import expectHandler from './utils/expect';
import { readdirSync, lstatSync } from 'fs';
import { resolve } from 'path';

export default class TestRunner {
  private tests: Test[];

  constructor() {
    this.tests = [];
  }

  addTest(testName: string, testFn: () => void) {
    this.tests.push({ testName, testFn });
  }

  expect(received: unknown) {
    return expectHandler(received);
  }

  private getTestFiles(folderPath: string): string[] {
    const files: string[] = readdirSync(folderPath);
    const testFiles = files.filter(file => {
      const fullPath = resolve(folderPath, file);
      const isDirectory = lstatSync(fullPath).isDirectory();
      const isTestFile = /(spec|test)\.(js|ts)$/.test(file);
      return !isDirectory && isTestFile;
    });

    return testFiles.map(file => resolve(folderPath, file));
  }

  async runTests() {
    const testFilePaths = this.getTestFiles(resolve(__dirname, 'tests'));

    const results: TestResult[] = [];

    for await (const testFilePath of testFilePaths) {
      const testRunner = (await import(testFilePath)).default;

      for (const { testName, testFn } of testRunner.tests) {
        try {
          testFn();

          results.push({ testName, passed: true });
        } catch (error) {
          if (error instanceof Error) {
            const fileName = testFilePath.split('\\').at(-1);

            results.push({
              testName,
              passed: false,
              message: `${error.message} at ${fileName}`
            });
          }
        }
      }
    }

    this.printResults(results);
  }

  printResults(results: TestResult[]) {
    console.log('Test Results:');
    console.log('-------------');

    for (const result of results) {
      const { testName, passed, message } = result;

      console.log(`${passed ? '✅ Passed' : '❌ Failed'}: ${testName}`);
      if (!passed) console.error(`Error: ${message} `);
      console.log();
    }
  }
}
