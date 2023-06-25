import { deepEqual } from './object';

const expect = (received: unknown) => ({
  toBe: (expected: unknown) => {
    const isSameType = typeof received === typeof expected;

    const failedError = new Error(`Expected ${expected} but received ${received}`);

    if (typeof received === 'object' && typeof expected === 'object') {
      if (Array.isArray(received) && Array.isArray(expected)) {
        if (received.length !== expected.length) {
          throw failedError;
        }

        for (let i = 0; i < received.length; i++) {
          if (received[i] !== expected[i]) {
            throw failedError;
          }
        }
      } else {
        if (!deepEqual(received, expected)) {
          throw failedError;
        }
      }
    }

    if (received !== expected || !isSameType) {
      throw failedError;
    }
  }
});

export default expect;
