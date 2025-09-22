import { createContext, useEffect, useState, type ReactNode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

interface MetadataContextType {
  set: (key: string, value: string) => void;
  get: (key: string) => string | undefined;
  remove: (key: string) => void;
  has: (key: string) => boolean;
  clear: () => void;
}

const MetaDataContext = createContext<MetadataContextType | null>(null);

const initMetaData = () => {
  // 기존 data- meta 태그들을 읽어서 Map에 저장
  const metadataTags = document.querySelectorAll("meta[name^='data-']");
  const initialMap = new Map<string, string>();
  metadataTags.forEach((meta) => {
    const name = meta.getAttribute("name")?.replace("data-", "") || "";
    const content = meta.getAttribute("content") || "";
    if (name) {
      initialMap.set(name, content);
    }
  });
  // 기존 태그들 제거 (Helmet이 다시 만들어줄 예정)
  metadataTags.forEach((meta) => meta.remove());
  return initialMap;
};

const initializedMetaData = initMetaData();

function MetaDataProvider({ children }: { children: ReactNode }) {
  const [metadata, setMetadata] =
    useState<Map<string, string>>(initializedMetaData);

  useEffect(() => {
    console.log(Array.from(metadata.entries()));
  }, [metadata]);

  const set = (key: string, value: string) => {
    setMetadata((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, value);
      return newMap;
    });
  };

  const get = (key: string) => {
    return metadata.get(key);
  };

  const remove = (key: string) => {
    setMetadata((prev) => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  };

  const has = (key: string) => {
    return metadata.has(key);
  };

  const clear = () => {
    setMetadata(new Map());
  };

  return (
    <HelmetProvider>
      <MetaDataContext.Provider value={{ set, get, remove, has, clear }}>
        <Helmet>
          {Array.from(metadata.entries()).map(([key, value]) => (
            <meta key={`meta-${key}`} name={`data-${key}`} content={value} />
          ))}
        </Helmet>
        {children}
      </MetaDataContext.Provider>
    </HelmetProvider>
  );
}

export { MetaDataProvider, MetaDataContext };
