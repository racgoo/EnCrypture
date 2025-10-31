import type {
  CLIENT_ENCRYPT_TYPE,
  SERVER_ENCRYPT_TYPE,
} from "../../pages/encrypt/constants";

export type EncryptionType =
  | typeof CLIENT_ENCRYPT_TYPE
  | typeof SERVER_ENCRYPT_TYPE;
