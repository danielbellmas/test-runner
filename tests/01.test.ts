import TestRunner from '../test-runner';

const testRunner = new TestRunner();

testRunner.addTest('should sum 2 numbers and give the correct result', () => {
  testRunner.expect(2 + 2).toBe(4);
});

testRunner.addTest('should multiply 2 numbers and give the wrong result', () => {
  testRunner.expect(3 * 5).toBe(16);
});

export default testRunner;
