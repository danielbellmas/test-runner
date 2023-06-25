export interface TestResult {
  testName: string;
  passed: boolean;
  message?: string;
}

export interface Test {
  testName: string;
  testFn: () => void;
}
