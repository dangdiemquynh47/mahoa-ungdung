"use client"
import React, { useState } from "react";
import forge from "node-forge";

const RSAEncryptDecrypt: React.FC = () => {
  const [encrypted, setEncrypted] = useState<string | null>(null);
  const [decrypted, setDecrypted] = useState<string | null>(null);

  const generateRSAKeys = () => {
    const keypair = forge.pki.rsa.generateKeyPair(512);
    return {
      publicKeyPem: forge.pki.publicKeyToPem(keypair.publicKey),
      privateKeyPem: forge.pki.privateKeyToPem(keypair.privateKey),
    };
  };

  const { publicKeyPem, privateKeyPem } = generateRSAKeys();

  const handleEncrypt = () => {
    const salary = "20000000";
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encryptedData = publicKey.encrypt(salary, "RSA-OAEP");
    setEncrypted(forge.util.encode64(encryptedData));
  };

  const handleDecrypt = () => {
    if (!encrypted) return;
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const encryptedBinary = forge.util.decode64(encrypted);
    const decryptedData = privateKey.decrypt(encryptedBinary, "RSA-OAEP");
    setDecrypted(decryptedData);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>RSA Mã hóa/Giải mã</h1>
      <button onClick={handleEncrypt} style={{ margin: "10px", padding: "10px" }}>
        Mã hóa
      </button>
      <button onClick={handleDecrypt} style={{ margin: "10px", padding: "10px" }}>
        Giải mã
      </button>
      {encrypted && (
        <div>
          <h2>Chuỗi đã mã hóa:</h2>
          <p>{encrypted}</p>
        </div>
      )}
      {decrypted && (
        <div>
          <h2>Chuỗi đã giải mã:</h2>
          <p>{decrypted}</p>
        </div>
      )}
    </div>
  );
};

export default RSAEncryptDecrypt;
