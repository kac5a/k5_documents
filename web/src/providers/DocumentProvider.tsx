import React, {createContext, useEffect, useState} from "react";
import {useNuiEvent} from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

export const DocumentCtx = createContext<DocumentProviderValue>({} as DocumentProviderValue)

type DocumentProviderValue = {
  document: K5Document | undefined
  setDocument: (document: K5Document | undefined) => void
}

// This should be mounted at the top level of your application, it is currently set to
// apply a CSS visibility value. If this is non-performant, this should be customized.
export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [document, setDocument] = useState<K5Document | undefined>()
  const [visible, setVisible] = useState<boolean>(false)

  useNuiEvent<string>('setDocument', (data) => {
    setVisible(!!data)
    setDocument(data ? JSON.parse(data) as K5Document : undefined)
  })

  // Handle pressing escape/backspace
  useEffect(() => {
    // Only attach listener when we are visible
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (!isEnvBrowser()) fetchNui("hideDocument").then((_d) => {}).catch(_e => {});
      if (["Escape"].includes(e.code)) {
        setVisible(!visible)
        setDocument(undefined)
      }
    }

    window.addEventListener("keydown", keyHandler)

    return () => window.removeEventListener("keydown", keyHandler)
  }, [visible])

  return (
    <DocumentCtx.Provider
      value={{
        document,
        setDocument,
      }}
    >
    <div style={{ visibility: visible ? 'visible' : 'hidden', height: '100%'}}>
      {document && children}
    </div>
  </DocumentCtx.Provider>)
}