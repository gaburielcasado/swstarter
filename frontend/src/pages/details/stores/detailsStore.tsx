import axios from 'axios';
import { create } from 'zustand';

export interface DetailLinkItem {
  id: string;
  title: string;
}

export interface DetailLinksPanel {
  title: string;
  items: DetailLinkItem[];
}

export interface DescriptionPanel {
  title: string;
  body: string;
}

export interface DetailsResult {
  title: string;
  descriptionPanel: DescriptionPanel;
  detailLinksPanel: DetailLinksPanel;
}

export interface DetailsState {
  isLoading: boolean;
  result?: DetailsResult;
  fetchDetails: (id: string) => Promise<void>;
}

export const useDetailsStore = create<DetailsState>((set) => ({
  isLoading: false,
  fetchDetails: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await axios.get<DetailsResult>(`/api/details/${id}`);
      if (response.status === 200) {
        set({ result: response.data });
      } else {
        console.error('Unexpected response status:', response.status);
        set({ result: undefined });
      }
    } catch (error) {
      console.error('Failed to fetch details:', error);
      set({ result: undefined });
    } finally {
      set({ isLoading: false });
    }
  },
}));
