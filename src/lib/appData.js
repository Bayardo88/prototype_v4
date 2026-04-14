import React, { createContext, useContext, useMemo, useState } from 'react';
import { useTableData } from './useTableData.js';

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const { data: firms, loading: firmsLoading, error: firmsError } = useTableData('firms', {
    select: 'id,name,firm_value,firm_value_delta',
    orderBy: 'name',
    limit: 150,
  });

  const { data: funds, loading: fundsLoading, error: fundsError } = useTableData('funds', {
    select: 'id,name,firm_id',
    orderBy: 'name',
    limit: 150,
  });

  const { data: companies, loading: companiesLoading, error: companiesError } = useTableData(
    'companies',
    {
      select: 'id,name,firm_id,fund_id',
      orderBy: 'name',
      limit: 150,
    }
  );

  const [selectedFirmId, setSelectedFirmId] = useState(null);
  const [selectedFundId, setSelectedFundId] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const selectedFirm =
    firms.find((f) => f.id === selectedFirmId) ?? firms[0] ?? null;

  const fundsForFirm = useMemo(() => {
    if (!selectedFirm) return funds;
    return funds.filter((f) => f.firm_id === selectedFirm.id);
  }, [funds, selectedFirm?.id]);

  const selectedFund =
    fundsForFirm.find((f) => f.id === selectedFundId) ?? fundsForFirm[0] ?? null;

  const companiesForFund = useMemo(() => {
    if (!selectedFirm) return companies;
    if (!selectedFund) return companies.filter((c) => c.firm_id === selectedFirm.id);
    return companies.filter((c) => c.firm_id === selectedFirm.id && c.fund_id === selectedFund.id);
  }, [companies, selectedFirm?.id, selectedFund?.id]);

  const selectedCompany =
    companiesForFund.find((c) => c.id === selectedCompanyId) ?? companiesForFund[0] ?? null;

  const value = useMemo(
    () => ({
      firms,
      funds,
      companies,
      selectedFirm,
      selectedFund,
      selectedCompany,
      setSelectedFirmId,
      setSelectedFundId,
      setSelectedCompanyId,
      loading: firmsLoading || fundsLoading || companiesLoading,
      error: firmsError || fundsError || companiesError,
    }),
    [
      firms,
      funds,
      companies,
      selectedFirm,
      selectedFund,
      selectedCompany,
      firmsLoading,
      fundsLoading,
      companiesLoading,
      firmsError,
      fundsError,
      companiesError,
    ]
  );

  return React.createElement(AppDataContext.Provider, { value }, children);
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
}

