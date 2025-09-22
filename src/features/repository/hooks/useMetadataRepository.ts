import { useContext } from "react";
import { MetaDataContext } from "@shares/provider/metadata/metadata.provider";

function useMetadataRepository() {
  const context = useContext(MetaDataContext);
  if (!context) {
    throw new Error("Provider not found");
  }
  const { set, get, remove, has, clear } = context;
  return {
    setMetadata: set,
    getMetadata: get,
    removeMetadata: remove,
    hasMetadata: has,
    clearMetadata: clear,
  };
}

export { useMetadataRepository };
