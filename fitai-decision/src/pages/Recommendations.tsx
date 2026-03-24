/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getPersonalizedAdvice } from '../services/aiService';
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Info,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Recommendations: React.FC = () => {
  const { state } = useApp();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvice = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getPersonalizedAdvice(
        state.user,
        state.exercises,
        state.diets
      );
      setRecommendations(result.recommendations);
    } catch (err) {
      console.error('Advice Error:', err);
      setError('Failed to generate AI recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, [state.user, state.exercises, state.diets]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="text-blue-600" size={24} />
            AI Decision Support
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Personalized health and fitness strategies based on your recent
            activity.
          </p>
        </div>
        <button
          onClick={fetchAdvice}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50"
        >
          <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
          Refresh Advice
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600">
            <Loader2 className="animate-spin" size={32} />
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
            Analyzing your data and generating insights...
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
          <AlertCircle className="text-red-600" size={48} />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-red-900 dark:text-red-400">
              Something went wrong
            </h3>
            <p className="text-red-700 dark:text-red-500">{error}</p>
          </div>
          <button
            onClick={fetchAdvice}
            className="px-6 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp size={20} />
                  </div>
                  <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Recommended
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                  {rec.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-1">
                  {rec.content}
                </p>

                <div className="pt-4 border-t border-gray-50 dark:border-gray-800 space-y-3">
                  <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400 italic">
                    <Info size={14} className="mt-0.5 flex-shrink-0" />
                    <p>Basis: {rec.basis}</p>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200">
                    <CheckCircle2 size={18} />
                    Accept Plan
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!isLoading && !error && (
        <div className="bg-blue-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-600/20">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold">Need a custom training plan?</h3>
            <p className="text-blue-100 text-sm opacity-90">
              Talk to our AI Assistant to generate a 4-week personalized
              program.
            </p>
          </div>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 whitespace-nowrap">
            Start AI Consultation
          </button>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
