const NodeRSA = require("node-rsa");
const CryptoJS = require("crypto-js");

/**
 * Encrypts the given buffer using RSA-512 and the provided public key.
 *
 * @param {Object} bufferObj - The buffer object containing type and data.
 * @param {string} publicKey - The RSA public key.
 * @returns {string} The encrypted data in base64 format.
 */
export function encryptWithRSA512(bufferObj: any, publicKey: any) {
//   try {
    // Validate buffer object
    if (
      !bufferObj ||
      bufferObj.type !== "Buffer" ||
      !Array.isArray(bufferObj.data)
    ) {
      throw new Error("Invalid buffer object.");
    }

    // Convert buffer data to a Node.js Buffer
    const bufferData = Buffer.from(bufferObj.data);

    // Create RSA key from the public key
    const key = new NodeRSA(publicKey, "pkcs8-public-pem");

    // Encrypt the buffer data using RSA-512
    const encryptedData = key.encrypt(bufferData, "base64");

    // Return encrypted data as a base64 string using crypto-js for consistency
    return CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(encryptedData)
    );
//   } catch (error: any) {
//     console.error("Encryption failed:", error);
//     // throw error;
//   }
}

// // Example usage
// const buffer = {
//     "type": "Buffer",
//     "data": [
//         113, 119, 119, 119, 111, 111, 111, 97, 97
//     ]
// };

// // Replace this with your actual RSA public key
// const puclickey = `-----BEGIN PUBLIC KEY-----
// YOUR_PUBLIC_KEY_HERE
// -----END PUBLIC KEY-----`;

// try {
//     const encrypted = encryptWithRSA512(buffer, puclickey);
//     console.log("Encrypted data:", encrypted);
// } catch (error) {
//     console.error("Error:", error.message);
// }
