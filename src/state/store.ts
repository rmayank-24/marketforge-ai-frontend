import { create } from 'zustand';
import { fetchLaunchKit, LaunchKitResponse } from '../api/client';

interface AppState {
  // State
  isLoading: boolean;
  error: string | null;
  launchKit: LaunchKitResponse | null;
  
  // Actions
  generateLaunchKit: (productIdea: string) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  isLoading: false,
  error: null,
  launchKit: null,

  // Generate launch kit action
  generateLaunchKit: async (productIdea: string) => {
    // Validate input
    if (!productIdea.trim()) {
      set({ error: 'Please enter a product idea' });
      return;
    }

    // Reset state and start loading
    set({ 
      isLoading: true, 
      error: null, 
      launchKit: null 
    });

    try {
      const result = await fetchLaunchKit(productIdea);
      set({ 
        launchKit: result, 
        isLoading: false,
        error: null 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        isLoading: false,
        launchKit: null 
      });
    }
  },

  // Clear error action
  clearError: () => set({ error: null }),

  // Reset all state
  reset: () => set({ 
    isLoading: false, 
    error: null, 
    launchKit: null 
  }),
}));