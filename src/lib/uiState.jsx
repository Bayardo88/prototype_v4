import React, { createContext, useContext, useMemo, useState } from 'react';

const UiStateContext = createContext(null);

export function UiStateProvider({ children }) {
  const [pinnedTabs, setPinnedTabs] = useState([]); // [{ id: 'valuations', label: 'Valuations' }, ...]

  function pinTab(tab) {
    setPinnedTabs((prev) => {
      if (prev.some((t) => t.id === tab.id)) return prev;
      return [...prev, tab];
    });
  }

  function unpinTab(tabId) {
    setPinnedTabs((prev) => prev.filter((t) => t.id !== tabId));
  }

  const value = useMemo(
    () => ({
      pinnedTabs,
      pinTab,
      unpinTab,
    }),
    [pinnedTabs]
  );

  return React.createElement(UiStateContext.Provider, { value }, children);
}

export function useUiState() {
  const ctx = useContext(UiStateContext);
  if (!ctx) throw new Error('useUiState must be used within UiStateProvider');
  return ctx;
}

