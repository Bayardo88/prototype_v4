import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const UiStateContext = createContext(null);

export function UiStateProvider({ children }) {
  const [pinnedTabs, setPinnedTabs] = useState([]); // [{ id: 'valuations', label: 'Valuations' }, ...]
  const [pendingCompanySecondaryTab, setPendingCompanySecondaryTab] = useState(null);
  const [pendingCapTableTertiary, setPendingCapTableTertiary] = useState(null);

  const queueCompanySecondaryTab = useCallback((tab) => {
    setPendingCompanySecondaryTab(tab);
    if (tab !== 'cap-table') setPendingCapTableTertiary(null);
  }, []);

  const clearPendingCompanySecondaryTab = useCallback(() => {
    setPendingCompanySecondaryTab(null);
  }, []);

  const queueCapTableTertiary = useCallback((tabId) => {
    setPendingCapTableTertiary(tabId);
  }, []);

  const clearPendingCapTableTertiary = useCallback(() => {
    setPendingCapTableTertiary(null);
  }, []);

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
      pendingCompanySecondaryTab,
      queueCompanySecondaryTab,
      clearPendingCompanySecondaryTab,
      pendingCapTableTertiary,
      queueCapTableTertiary,
      clearPendingCapTableTertiary,
    }),
    [
      pinnedTabs,
      pendingCompanySecondaryTab,
      queueCompanySecondaryTab,
      clearPendingCompanySecondaryTab,
      pendingCapTableTertiary,
      queueCapTableTertiary,
      clearPendingCapTableTertiary,
    ]
  );

  return React.createElement(UiStateContext.Provider, { value }, children);
}

export function useUiState() {
  const ctx = useContext(UiStateContext);
  if (!ctx) throw new Error('useUiState must be used within UiStateProvider');
  return ctx;
}

