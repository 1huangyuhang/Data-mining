/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  Download,
  Share2,
  MoreVertical,
  Activity,
  Clock,
  MapPin,
  Heart,
  Zap,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const TrainingData: React.FC = () => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredExercises = state.exercises.filter((e) => {
    const matchesSearch = e.type
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === 'all' || e.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const exerciseTypes = Array.from(new Set(state.exercises.map((e) => e.type)));

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Training Records
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Detailed history of your physical activities and performance.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
            <Download size={18} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/20">
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by exercise type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 dark:text-white transition-all duration-200"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            >
              <option value="all">All Types</option>
              {exerciseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Activity</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Calories</th>
                <th className="px-6 py-4">Metrics</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <AnimatePresence mode="popLayout">
                {filteredExercises.map((exercise) => (
                  <motion.tr
                    key={exercise.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                          <Activity size={18} />
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {exercise.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                        <Clock size={14} className="text-gray-400" />
                        <span>{exercise.duration} min</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-medium">
                        <Zap size={14} />
                        <span>{exercise.calories} kcal</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        {exercise.distance && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <MapPin size={12} />
                            <span>{exercise.distance} km</span>
                          </div>
                        )}
                        {exercise.heartRate && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Heart size={12} className="text-red-500" />
                            <span>{exercise.heartRate} bpm</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(exercise.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-colors duration-200">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>
            Showing {filteredExercises.length} of {state.exercises.length}{' '}
            records
          </p>
          <div className="flex gap-2">
            <button
              className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg disabled:opacity-30"
              disabled
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg disabled:opacity-30"
              disabled
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingData;
