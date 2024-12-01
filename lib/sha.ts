import forge from "node-forge";
import * as crypto from "crypto";

/**
 * Mã hóa SHA1 một chuỗi
 * @param {string} data - Dữ liệu cần mã hóa
 * @returns {string} - Chuỗi mã hóa SHA-1 (hexadecimal)
 */
export const hashSHA1 = (data: string): string => {
  // Tạo đối tượng SHA-1 từ node-forge
  const md = forge.md.sha1.create();
  md.update(data); // Cập nhật dữ liệu vào đối tượng SHA-1

  // Trả về hash dưới dạng hex (chuỗi hexadecimal)
  return md.digest().toHex();
};

export const hashPassword = (password: string) => {
  return crypto.createHash("sha1").update(password).digest();
};
