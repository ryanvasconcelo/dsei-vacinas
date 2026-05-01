import { useSearchParams } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';

export function useFilters<T extends Record<string, string | boolean | string[]>>(defaultFilters: T) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localFilters, setLocalFilters] = useState<T>(() => {
    const initial = { ...defaultFilters };
    searchParams.forEach((value, key) => {
      if (key in initial) {
        const defaultVal = initial[key];
        if (typeof defaultVal === 'boolean') {
          (initial as any)[key] = value === 'true';
        } else if (Array.isArray(defaultVal)) {
          (initial as any)[key] = value.split(',').filter(Boolean);
        } else if (typeof defaultVal === 'object' && defaultVal !== null) {
          try {
            (initial as any)[key] = JSON.parse(value);
          } catch {
            // fallback
          }
        } else {
          (initial as any)[key] = value;
        }
      }
    });
    return initial;
  });

  // Debounce string filters
  useEffect(() => {
    const handler = setTimeout(() => {
      const newParams = new URLSearchParams();
      Object.entries(localFilters).forEach(([key, value]) => {
        if (value === true) {
          newParams.set(key, 'true');
        } else if (typeof value === 'string' && value) {
          newParams.set(key, value);
        } else if (Array.isArray(value) && value.length > 0) {
          newParams.set(key, value.join(','));
        } else if (typeof value === 'object' && value !== null) {
          const hasData = Object.values(value).some(v => v !== '');
          if (hasData) {
            newParams.set(key, JSON.stringify(value));
          }
        }
      });
      setSearchParams(newParams, { replace: true });
    }, 300);

    return () => clearTimeout(handler);
  }, [localFilters, setSearchParams]);

  const setFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setLocalFilters(defaultFilters);
  }, [defaultFilters]);

  return { filters: localFilters, setFilter, resetFilters };
}
