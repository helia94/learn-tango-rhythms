/**
 * Deep merge multiple translation objects
 * Handles nested objects like exercises.* properly
 */
export function deepMergeTranslations(...objects: any[]): any {
  const result: any = {};
  
  for (const obj of objects) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (
          typeof obj[key] === 'object' && 
          obj[key] !== null && 
          !Array.isArray(obj[key])
        ) {
          // If it's an object, recursively merge
          result[key] = deepMergeTranslations(result[key] || {}, obj[key]);
        } else {
          // Otherwise, just assign the value
          result[key] = obj[key];
        }
      }
    }
  }
  
  return result;
}
