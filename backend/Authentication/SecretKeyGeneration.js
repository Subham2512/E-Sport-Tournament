import Crypto from "crypto";

const generateRandomKey = (length) => {
    return Crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  };

export default generateRandomKey;