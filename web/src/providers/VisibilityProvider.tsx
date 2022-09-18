import React, {createContext, useEffect, useState} from "react";
import {useNuiEvent} from "../hooks/useNuiEvent";
import {fetchNui} from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

export const VisibilityCtx = createContext<VisibilityProviderValue>({} as VisibilityProviderValue)

type VisibilityProviderValue = {
  setVisible: (visible: boolean) => void
  visible: boolean
  givenDocument: K5Document | undefined
  setGivenDocument: (doc: K5Document | undefined) => void
}

// This should be mounted at the top level of your application, it is currently set to
// apply a CSS visibility value. If this is non-performant, this should be customized.
export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false)
  const [givenDocument, setGivenDocument] = useState<K5Document| undefined>()

  useNuiEvent<{ app: boolean, givenDocument: string | undefined }>('setVisible', (data: { app: boolean, givenDocument: string | undefined }) => {
    console.log(data.givenDocument)
    setVisible(data.app)
    data.givenDocument && setGivenDocument(JSON.parse(data.givenDocument) as K5Document)
  })

  // Handle pressing escape/backspace
  useEffect(() => {
    // Only attach listener when we are visible
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (["Escape"].includes(e.code)) {
        if (!isEnvBrowser()) fetchNui("hideFrame").then((_d) => {}).catch(_e => {});
        else {
          setVisible(!visible)
        };
      }
    }

    window.addEventListener("keydown", keyHandler)

    return () => window.removeEventListener("keydown", keyHandler)
  }, [visible])

  return (
    <VisibilityCtx.Provider
      value={{
        visible,
        setVisible,
        givenDocument,
        setGivenDocument
      }}
    >
    <div style={{ visibility: visible ? 'visible' : 'hidden', height: '100%'}}>
        {children}
    </div>
  </VisibilityCtx.Provider>)
}