import axios from 'axios';
import { create } from 'zustand';

export interface SearchState {
  isLoading: boolean;
  results?: SearchResult[];
  fetchResults: (query: string, type: 'character' | 'film') => Promise<void>;
}

export interface SearchResult {
  id: string;
  title: string;
}

export const useSearchStore = create<SearchState>((set) => ({
  isLoading: false,
  fetchResults: async (query, type) => {
    set({ isLoading: true });
    try {
      const res = await axios.get<SearchResult[]>('/api/search', {
        params: { q: query, type },
      });
      set({ results: res.data });
    } catch (error) {
      console.error('Search failed', error);
      set({ results: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));
