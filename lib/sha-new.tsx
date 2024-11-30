import forge from "node-forge";

/**
 * Mã hóa SHA-1 một chuỗi
 * @param {string} data - Dữ liệu cần mã hóa
 * @returns {string} - Chuỗi mã hóa SHA-1 (hexadecimal)
 */
export const hashSHA1 = (data: string): string => {
  const md = forge.md.sha1.create();
  md.update(data);
  return md.digest().toHex();
};

/**
 * Kiểm tra xem giá trị băm có khớp với chuỗi dữ liệu ban đầu không
 * @param {string} data - Dữ liệu ban đầu
 * @param {string} hashedData - Dữ liệu đã mã hóa SHA-1
 * @returns {boolean} - True nếu dữ liệu khớp, False nếu không
 */
export const verifySHA1 = (data: string, hashedData: string): boolean => {
  const hash = hashSHA1(data);
  return hash === hashedData; // So sánh băm tính toán với băm đã lưu
};

// Ví dụ sử dụng
const MK = "MKMKMKMK"; // Đây là mật khẩu cần mã hóa

// Mã hóa SHA-1
const hashedMK = hashSHA1(MK);
console.log("Hashed MK:", hashedMK);

// Kiểm tra xem giá trị đã băm có khớp với MK không
const isValid = verifySHA1(MK, hashedMK);
console.log("Is the hash valid?", isValid); // Will output 'true'
