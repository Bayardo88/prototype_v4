import { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabaseClient.js';

export function useSupabaseTable(table, { select = '*', orderBy, ascending = true, limit } = {}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(supabase));

  const queryKey = useMemo(
    () => JSON.stringify({ table, select, orderBy, ascending, limit }),
    [table, select, orderBy, ascending, limit]
  );

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!supabase) {
        setLoading(false);
        setError(
          new Error(
            'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
          )
        );
        return;
      }

      setLoading(true);
      setError(null);

      let q = supabase.from(table).select(select);
      if (orderBy) q = q.order(orderBy, { ascending });
      if (limit) q = q.limit(limit);

      const { data: rows, error: err } = await q;
      if (cancelled) return;
      if (err) setError(err);
      setData(rows ?? []);
      setLoading(false);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [queryKey]);

  return { data, error, loading, configured: Boolean(supabase) };
}

