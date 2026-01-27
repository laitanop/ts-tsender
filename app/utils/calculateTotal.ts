/**
 * Calculates the total sum of numbers from a string.
 * Supports both comma-separated and newline-separated formats.
 * 
 * @param amountsString - String containing numbers separated by commas or newlines
 * @returns The sum of all numbers, or 0 if input is empty/invalid
 * 
 * @example
 * calculateTotal("100, 200, 300") // returns 600
 * calculateTotal("100\n200\n300") // returns 600
 * calculateTotal("100, 200\n300") // returns 600
 */
export function calculateTotal(amountsString: string): number {
  if (!amountsString || amountsString.trim() === "") {
    return 0;
  }

  // Split by both commas and newlines, then flatten
  const numbers = amountsString
    .split(/[,\n]/) // Split by comma or newline
    .map((item) => item.trim()) // Remove whitespace
    .filter((item) => item !== "") // Remove empty strings
    .map((item) => parseFloat(item)) // Convert to numbers
    .filter((num) => !isNaN(num)); // Remove invalid numbers

  // Sum all valid numbers
  return numbers.reduce((sum, num) => sum + num, 0);
}
