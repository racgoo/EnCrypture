interface Encrypter {
  hash(password: string): Promise<string>;
  verify(password: string, hash: string): Promise<boolean>;
}

export type { Encrypter };
