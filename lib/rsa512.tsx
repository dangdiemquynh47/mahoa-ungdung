import forge from "node-forge";
import crypto from "crypto";

/**
 * Generates a pair of 512-bit RSA keys based on the given input string.
 * The input string is hashed using SHA-256 and then used as a seed to
 * generate the RSA keys.
 *
 * @param {string} input - The input string to generate the RSA keys from.
 * @returns {Object} An object containing the public and private keys,
 *     each as a PEM-encoded string.
 */
export function generateRSAKeys(input: string) {
  // Hash chuỗi đầu vào bằng SHA-256
  const hash = crypto.createHash("sha256").update(input).digest();

  // Dùng hash làm seed để sinh cặp khóa RSA
  const md = forge.md.sha256.create();
  md.update(hash.toString("binary")); // Cập nhật md với giá trị hash

  // Sinh cặp khóa RSA với độ dài 512 bit
  const keyPair = forge.pki.rsa.generateKeyPair({ bits: 512, e: 0x10001 });

  // Trả về public và private key
  return {
    publicKey: forge.pki.publicKeyToPem(keyPair.publicKey),
    privateKey: forge.pki.privateKeyToPem(keyPair.privateKey),
  };
}

/**
 * Encrypts a salary using the given public key.
 *
 * @param {string} salary - The salary to encrypt.
 * @param {string} PUBKEY - The public key to use for encryption.
 * @returns {string} The encrypted salary, encoded as a base64 string.
 */
export const encryptSalary = (salary: string, PUBKEY: string) => {
  const PUBLIC_KEY = generateRSAKeys(PUBKEY).publicKey;
  const publicKey = forge.pki.publicKeyFromPem(PUBLIC_KEY);
  const encrypted = publicKey.encrypt(salary, "RSA-OAEP");
  return forge.util.encode64(encrypted);
};

/**
 * Decrypts a salary that was encrypted using the corresponding public key.
 *
 * @param {string} encryptedSalary - The encrypted salary to decrypt.
 * @param {string} PKEY - The private key to use for decryption.
 * @returns {string | undefined} The decrypted salary, or undefined if decryption fails.
 */
export const decryptSalary = (encryptedSalary: string, PKEY: string) => {
  // Sử dụng private key từ đối số PKEY
  const privateKey = forge.pki.privateKeyFromPem(PKEY);

  const encryptedBytes = forge.util.decode64(encryptedSalary);
  try {
    const decrypted = privateKey.decrypt(encryptedBytes, "RSA-OAEP");
    return decrypted;
  } catch (error) {
    console.error("Error decrypting:", error);
    return undefined;
  }
};
