
import forge from 'node-forge'
// 1. Tạo cặp khóa RSA (RSA-512)
export const generateRSAKeys = () => {
    const keypair = forge.pki.rsa.generateKeyPair(512); // Tạo cặp khóa RSA-512
    const publicKey = forge.pki.publicKeyToPem(keypair.publicKey); // Khóa công khai (PEM format)
    const privateKey = forge.pki.privateKeyToPem(keypair.privateKey); // Khóa bí mật (PEM format)
    return { publicKey, privateKey };
};

// 2. Mã hóa bằng RSA
export const encryptWithRSA = (data:string, publicKeyPem:string) => {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem); // Chuyển PEM thành đối tượng khóa công khai
    const encrypted = publicKey.encrypt(data, 'RSA-OAEP'); // Mã hóa dữ liệu bằng RSA-OAEP
    return forge.util.encode64(encrypted); // Encode kết quả mã hóa thành Base64
};

// 3. Giải mã bằng RSA
export const decryptWithRSA = (encryptedData:string, privateKeyPem:string) => {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem); // Chuyển PEM thành đối tượng khóa bí mật
    const decodedData = forge.util.decode64(encryptedData); // Decode từ Base64
    const decrypted = privateKey.decrypt(decodedData, 'RSA-OAEP'); // Giải mã dữ liệu bằng RSA-OAEP
    return decrypted;
};


export const publicKey_rsa_512 = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJOZmpFzueEW4X4hQuM0DNa52X3YlkPiwix0zJfen+Ge6kPVDGpqmmHjlPDRQYABwi3ws5/ZkOhNAcCmeP0yOeUCAwEAAQ=='
export const privateKey_rsa_512 = 'MIIBOQIBAAJBAJOZmpFzueEW4X4hQuM0DNa52X3YlkPiwix0zJfen+Ge6kPVDGpqmmHjlPDRQYABwi3ws5/ZkOhNAcCmeP0yOeUCAwEAAQJAWwH1/UNG1FQAW330uRTJ6cgUI3VdSaRSp4io8edR25HqFrEiV5DZlQ4YAo2QPWQn0fHieTQdG89KHPp8nKjI4QIhAMOKFWk3FgHBDOwF54kp28WTC/rVpdWUPHinXGnN2OEJAiEAwTzhQ7/mx9BI+OBv7T4D2Ep52023suPtuvYs+hZ2NP0CIB4etAOb/6DPit0EX9DqCLdbWjoOFNhcWCBBr2OA2Mp5AiBnM5V3MnEVe/bM/Eiqork49aWY6yvVnYdkl38z3XUqHQIgYWKt1h6do0zAyUdsN0/aIPtn4G5aAgKvi9B1uJDMDBA='