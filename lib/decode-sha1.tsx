const CryptoJS = require("crypto-js");

/**
 * Decodes a buffer-like object and computes its SHA-1 hash using crypto-js.
 * @param {Object} bufferObj - The buffer object containing type and data.
 * @returns {string} - The SHA-1 hash of the buffer data.
 */
export function decodeBufferAndHash(bufferObj: any) {
  if (
    !bufferObj ||
    bufferObj.type !== "Buffer" ||
    !Array.isArray(bufferObj.data)
  ) {
    throw new Error("Invalid buffer object format.");
  }

  // Reconstruct the string data from the buffer-like object
  const decodedString = Buffer.from(bufferObj.data).toString("utf8");

  // Compute the SHA-1 hash using crypto-js
  const sha1Hash = CryptoJS.SHA1(decodedString).toString(CryptoJS.enc.Hex);

  return sha1Hash;
}

export function bufferToString(bufferObj: any) {
  if (
    !bufferObj ||
    bufferObj.type !== "Buffer" ||
    !Array.isArray(bufferObj.data)
  ) {
    throw new Error("Invalid buffer object format.");
  }

  // Convert the data array into a string
  return Buffer.from(bufferObj.data).toString("utf8");
}
