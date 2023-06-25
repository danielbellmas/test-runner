export const deepEqual = (obj1: any, obj2: any): boolean => {
  // Compare non-object values directly
  if (obj1 === obj2) {
    return true;
  }

  // Check if both objects are of type 'object'
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  // Get the keys of obj1 and obj2
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if the keys are the same
  if (!keys1.every(key => keys2.includes(key))) {
    return false;
  }

  // Recursively check the values for each key
  for (const key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  // All keys and values are equal
  return true;
};
