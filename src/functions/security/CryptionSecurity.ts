import { AES, enc } from 'crypto-js';

export const EncryptData = (key: string | undefined, DataToEncrypt: string) => {
  if (!key) {
    return;
  }
  const encryptedValue = AES.encrypt(DataToEncrypt, key).toString();
  return encryptedValue;
};

export const DecryptData = (key: string | undefined, EncryptData: string) => {
  if (!key) {
    return;
  }
  const bytes = AES.decrypt(EncryptData, key);
  const decryptedValue = bytes.toString(enc.Utf8);
  return decryptedValue;
};
