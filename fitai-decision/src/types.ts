/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExerciseRecord {
  id: string;
  type: string;
  duration: number; // minutes
  calories: number;
  date: string;
  heartRate?: number;
  distance?: number; // km
  intensity?: 'low' | 'medium' | 'high';
}

export interface DietRecord {
  id: string;
  food: string;
  calories: number;
  protein?: number; // grams
  carbs?: number;
  fat?: number;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  type?: 'text' | 'exercise_card' | 'diet_card' | 'recommendation_card';
  data?: any;
}

export interface UserProfile {
  id: string;
  name: string;
  weight: number;
  height: number;
  goal: 'lose_weight' | 'gain_muscle' | 'maintain';
  dailyCalorieGoal: number;
}
