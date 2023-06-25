import TestRunner from '../test-runner';

const testRunner = new TestRunner();

testRunner.addTest('should sum 2 numbers and give the correct result', () => {
  testRunner.expect(2 + 2).toBe(4);
});

export default testRunner;
