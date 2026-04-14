import { useMemo } from 'react';
import { useSupabaseTable } from './useSupabaseTable.js';
import { localDb } from './localDb.js';

function projectFields(rows, select) {
  if (!select || select === '*') return rows;
  const fields = select
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (!fields.length) return rows;
  return rows.map((r) => {
    const out = {};
    for (const f of fields) out[f] = r?.[f];
    return out;
  });
}

function orderRows(rows, orderBy, ascending = true) {
  if (!orderBy) return rows;
  const dir = ascending ? 1 : -1;
  const sorted = rows.slice().sort((a, b) => {
    const av = a?.[orderBy];
    const bv = b?.[orderBy];
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === 'string' && typeof bv === 'string') return av.localeCompare(bv) * dir;
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });
  return sorted;
}

/**
 * Unified table hook: uses Supabase when configured unless forced to local.
 *
 * Enable local mock db via:
 * - VITE_USE_LOCAL_DB=true
 * - or when Supabase env vars are missing.
 */
export function useTableData(table, { select = '*', orderBy, ascending = true, limit } = {}) {
  const forceLocal = String(import.meta.env.VITE_USE_LOCAL_DB ?? '').toLowerCase() === 'true';
  const supa = useSupabaseTable(table, { select, orderBy, ascending, limit });
  const useLocal = forceLocal || !supa.configured;

  const local = useMemo(() => {
    const base = localDb?.[table] ?? [];
    const ordered = orderRows(base, orderBy, ascending);
    const limited = limit ? ordered.slice(0, limit) : ordered;
    return projectFields(limited, select);
  }, [table, select, orderBy, ascending, limit]);

  if (useLocal) {
    return { data: local, loading: false, error: null, configured: true, source: 'local' };
  }

  return { ...supa, source: 'supabase' };
}

