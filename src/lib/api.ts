const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://192.168.1.200:3001/api';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// Deck API functions
export async function getDeckWords(deckId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/decks/${deckId}/words`);
    if (!res.ok) throw new Error("Failed to fetch words");

    const json = await res.json();
    return json.data;
    console.log("Fetched words:", json.data); // 👈 Add this

  } catch (err) {
    console.error("API call error:", err);
    return []; // fallback is array
  }
}


// export const addWordsToDeck = async (deckId: string, words: any[]): Promise<ApiResponse> => {
//   return await apiCall(`/api/decks/${deckId}/words`, {
//     method: 'POST',
//     body: JSON.stringify({ words })
//   });
// };
export const addWordsToDeck = async (
  deckId: string,
  words: { text: string; meaning: string }[]
): Promise<ApiResponse> => {
  return await apiCall(`/decks/${deckId}/words`, {
    method: 'POST',
    body: JSON.stringify({ words }),
  });
};



export const addDeck = async (deckData: { name: string; userId: string; description?: string }): Promise<ApiResponse> => {
  return await apiCall('/decks', {
    method: 'POST',
    body: JSON.stringify(deckData),
  });
};


// /get/Decks
export async function getDecks(userId: string) {
  const response = await fetch(`https://192.168.1.200:3001/api/decks?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch decks');
  }
  return response.json();
}

export async function deleteDeck(id: string): Promise<void> {
  const response = await fetch(`https://192.168.1.200:3001/api/decks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete deck');
  }
}








// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to get user data
export const getUser = () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

// Helper function to check if user is logged in
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

// Helper function to logout
export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Generic API call function
export const apiCall = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || 'An error occurred',
      };
    }

    return { data };
  } catch (error) {
    console.error('API call error:', error);
    return {
      error: 'Network error occurred',
    };
  }
};

// Auth API functions
export const authApi = {
  login: async (email: string, password: string) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData: {
    email: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  getCurrentUser: async () => {
    return apiCall('/auth/me');
  },
}; 