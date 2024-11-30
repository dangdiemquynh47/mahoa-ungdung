import type { NextApiRequest, NextApiResponse } from "next";
import forge from 'node-forge';

// Hàm xử lý API
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { encryptedData } = req.body; // Dữ liệu mã hóa (mảng byte)
  const privateKeyPem = `
-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBALz...
-----END RSA PRIVATE KEY-----
`; // Thay bằng private key thực tế

  try {
    // Chuyển mảng byte thành buffer
    const encryptedBuffer = Buffer.from(encryptedData);

    // Import private key
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    // Giải mã RSA
    const decryptedData = privateKey.decrypt(encryptedBuffer.toString("base64"), "RSA-OAEP", {
      md: forge.md.sha256.create(), // Dùng SHA-256 làm thuật toán băm
    });

    // Trả về kết quả giải mã
    res.status(200).json({ decryptedData });
  } catch (error) {
    console.error("Lỗi giải mã:", error);
    res.status(500).json({ error: "Giải mã thất bại" });
  }
}
