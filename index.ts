import type { Test, TestResult } from './types';

// TODO implement the expect way of doing it
// TODO Make expect and addTest global functions
// TODO Add colorful output in the terminal
// TODO have test/spec files and execute them in the terminal

class TestRunner {
  private tests: Test[];

  constructor() {
    this.tests = [];
  }

  addTest(testName: string, testFn: () => void) {
    this.tests.push({ testName, testFn });
  }

  runTests() {
    const results: TestResult[] = [];

    for (const { testName, testFn } of this.tests) {
      try {
        testFn();

        results.push({
          testName,
          passed: true
        });
      } catch (error) {
        if (error instanceof Error) {
          results.push({
            testName,
            passed: false,
            message: error.message
          });
        }
      }
    }

    this.printResults(results);
  }

  printResults(results: TestResult[]) {
    console.log('Test Results:\n');

    for (const result of results) {
      const { testName, passed, message } = result;

      console.log(`${testName}: ${passed ? 'Passed' : 'Failed'}\n`);

      if (!passed && message) {
        console.log(message);
      }
    }
  }
}

// Example usage
const testRunner = new TestRunner();

testRunner.addTest('should sum 2 numbers and give the correct result', () => {
  const result = 2 + 2;
  if (result !== 4) {
    throw new Error('Addition test failed');
  }
});

testRunner.addTest('should multiply 2 numbers and give the correct result', () => {
  const result = 3 * 5;
  if (result !== 15) {
    throw new Error('Multiplication test failed');
  }
});

testRunner.addTest('should multiply 2 numbers and give the wrong result', () => {
  const result = 3 * 6;

  if (result !== 15) {
    throw new Error('Multiplication test failed');
  }
});

testRunner.runTests();
