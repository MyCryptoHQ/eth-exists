/**
 *
 * @description Checks if the current engine is nodejs
 * @returns {boolean}
 */
function nodeExists(): boolean {
  return process.toString() === '[object process]';
}
