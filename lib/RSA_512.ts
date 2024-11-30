import forge from "node-forge";
// 1. Tạo cặp khóa RSA (RSA-512)
export const generateRSAKeys = () => {
  const keypair = forge.pki.rsa.generateKeyPair(512); // Tạo cặp khóa RSA-512
  const publicKey = forge.pki.publicKeyToPem(keypair.publicKey); // Khóa công khai (PEM format)
  const privateKey = forge.pki.privateKeyToPem(keypair.privateKey); // Khóa bí mật (PEM format)
  return { publicKey, privateKey };
};

// 2. Mã hóa bằng RSA
export const encryptWithRSA = (data: string, publicKeyPem: string) => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem); // Chuyển PEM thành đối tượng khóa công khai
  const encrypted = publicKey.encrypt(data, "RSA-OAEP"); // Mã hóa dữ liệu bằng RSA-OAEP
  return forge.util.encode64(encrypted); // Encode kết quả mã hóa thành Base64
};

// 3. Giải mã bằng RSA
export const decryptWithRSA = (
  encryptedData: string,
  privateKeyPem: string
) => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem); // Chuyển PEM thành đối tượng khóa bí mật
  const decodedData = forge.util.decode64(encryptedData); // Decode từ Base64
  const decrypted = privateKey.decrypt(decodedData, "RSA-OAEP"); // Giải mã dữ liệu bằng RSA-OAEP
  return decrypted;
};

export const publicKey_rsa_512 = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAOsptoOjPkVqJpETNW4LEhyItqjtB3B53IrAlUwZGnxTSt4myFH20atK4IGEQ7yh5Kl2y6dxfm1BRI5HMb8S5S8CAwEAAQ==
-----END PUBLIC KEY-----`;

export const privateKey_rsa_512 = `-----BEGIN PRIVATE KEY-----
MIIBPAIBAAJBAL56K2CiWR/WGxv6yOwTmm7ROem4gkaIQL7brY73byoROO1WBmqm
kSBFDzcOf5ZgB0LMy50zXeFGWWqbGRQrBIcCAwEAAQJAIWf/z5TpmKHOY1vafTz6
6tCbHZiUkJY49MBGcjqHLpNE1HHsWFE4+iEJM/pBZuoCN5j3mpsBHpIsNAAOknLp
EQIhAPRHbPjtXM5xSHQ49dUrWpvFLF8BFaE0s1gNp+WWIAiDAiEAx53gIEgzPIdL
/91HXNbVST6Rspl5dhRsooXhjG/6bK0CIQCtT3OoFLfQnBzcoIEB0bWCaNz3NozD
B+HqKh4hzGZDwwIhAIUg6aUeAe3QXgNa1Ik6Tiz3KbxvVu5FWN5bY72BwQZRAiEA
z3l3AfoigSLJqA3Ootfi2h+s9YWj/V+TSd99Qf1dfDU=
-----END PRIVATE KEY-----`;

