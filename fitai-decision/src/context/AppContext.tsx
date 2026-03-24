/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { ExerciseRecord, DietRecord, AIMessage, UserProfile } from '../types';
import { format } from 'date-fns';

interface AppState {
  user: UserProfile;
  exercises: ExerciseRecord[];
  diets: DietRecord[];
  chatHistory: AIMessage[];
  isChatOpen: boolean;
  theme: 'light' | 'dark';
}

type AppAction =
  | { type: 'ADD_EXERCISE'; payload: ExerciseRecord }
  | { type: 'ADD_DIET'; payload: DietRecord }
  | { type: 'ADD_CHAT_MESSAGE'; payload: AIMessage }
  | { type: 'TOGGLE_CHAT' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'UPDATE_USER'; payload: Partial<UserProfile> };

const initialState: AppState = {
  user: {
    id: '1',
    name: 'Alex',
    weight: 70,
    height: 175,
    goal: 'lose_weight',
    dailyCalorieGoal: 2200,
  },
  exercises: [
    {
      id: '1',
      type: 'Running',
      duration: 30,
      calories: 350,
      date: format(new Date(), 'yyyy-MM-dd'),
      distance: 5,
      intensity: 'medium',
    },
    {
      id: '2',
      type: 'Weightlifting',
      duration: 45,
      calories: 200,
      date: format(new Date(), 'yyyy-MM-dd'),
      intensity: 'high',
    },
  ],
  diets: [
    {
      id: '1',
      food: 'Oatmeal with berries',
      calories: 350,
      protein: 12,
      carbs: 60,
      fat: 5,
      date: format(new Date(), 'yyyy-MM-dd'),
      mealType: 'breakfast',
    },
    {
      id: '2',
      food: 'Grilled Chicken Salad',
      calories: 450,
      protein: 35,
      carbs: 15,
      fat: 20,
      date: format(new Date(), 'yyyy-MM-dd'),
      mealType: 'lunch',
    },
  ],
  chatHistory: [
    {
      id: '1',
      role: 'assistant',
      content:
        'Hello! I am your FitAI Assistant. How can I help you today? You can log your exercise or diet by just telling me.',
      timestamp: new Date().toISOString(),
    },
  ],
  isChatOpen: true,
  theme: 'light',
};

const AppContext = createContext<
  | {
      state: AppState;
      dispatch: React.Dispatch<AppAction>;
    }
  | undefined
>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_EXERCISE':
      return { ...state, exercises: [action.payload, ...state.exercises] };
    case 'ADD_DIET':
      return { ...state, diets: [action.payload, ...state.diets] };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatHistory: [...state.chatHistory, action.payload] };
    case 'TOGGLE_CHAT':
      return { ...state, isChatOpen: !state.isChatOpen };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Sync theme with document class
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
