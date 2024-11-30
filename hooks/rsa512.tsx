import { useState } from "react";
import forge from "node-forge";

interface EncryptedObject {
  type: string;
  data: number[];
}

export const useRSADecrypt = (privateKeyPem: string) => {
  const [decryptedData, setDecryptedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const decryptRSA = (encryptedObject: EncryptedObject) => {
    try {
      // Chuyển mảng dữ liệu thành Buffer
      const buffer = Buffer.from(encryptedObject.data);

      // Sử dụng node-forge để giải mã
      const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

      // Giải mã bằng khóa riêng
      const decrypted = privateKey.decrypt(buffer.toString("binary"), "RSA-OAEP");

      setDecryptedData(decrypted);
      setError(null);
    } catch (err) {
      setError("Lỗi giải mã: " + (err as Error).message);
      setDecryptedData(null);
    }
  };

  return { decryptedData, error, decryptRSA };
};
