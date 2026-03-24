/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import {
  Activity,
  Flame,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  MoreVertical,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format, subDays, isSameDay } from 'date-fns';

const Dashboard: React.FC = () => {
  const { state } = useApp();

  const stats = useMemo(() => {
    const today = new Date();
    const todayExercises = state.exercises.filter((e) =>
      isSameDay(new Date(e.date), today)
    );
    const todayDiets = state.diets.filter((d) =>
      isSameDay(new Date(d.date), today)
    );

    const caloriesBurned = todayExercises.reduce(
      (acc, e) => acc + e.calories,
      0
    );
    const caloriesConsumed = todayDiets.reduce((acc, d) => acc + d.calories, 0);
    const exerciseTime = todayExercises.reduce((acc, e) => acc + e.duration, 0);
    const netCalories = caloriesConsumed - caloriesBurned;
    const calorieGoalProgress = Math.min(
      (caloriesConsumed / state.user.dailyCalorieGoal) * 100,
      100
    );

    return {
      caloriesBurned,
      caloriesConsumed,
      exerciseTime,
      netCalories,
      calorieGoalProgress,
    };
  }, [state.exercises, state.diets, state.user.dailyCalorieGoal]);

  const chartData = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = subDays(new Date(), 6 - i);
      const dayExercises = state.exercises.filter((e) =>
        isSameDay(new Date(e.date), date)
      );
      const dayDiets = state.diets.filter((d) =>
        isSameDay(new Date(d.date), date)
      );

      return {
        name: format(date, 'EEE'),
        consumed: dayDiets.reduce((acc, d) => acc + d.calories, 0),
        burned: dayExercises.reduce((acc, e) => acc + e.calories, 0),
      };
    });
  }, [state.exercises, state.diets]);

  const exerciseDistribution = useMemo(() => {
    const types: Record<string, number> = {};
    state.exercises.forEach((e) => {
      types[e.type] = (types[e.type] || 0) + 1;
    });
    return Object.entries(types).map(([name, value]) => ({ name, value }));
  }, [state.exercises]);

  const COLORS = ['#2563EB', '#10B981', '#F97316', '#8B5CF6', '#EC4899'];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Daily Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, {state.user.name}! Here's your health summary for
            today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/20">
            Adjust Goal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Calories Consumed',
            value: stats.caloriesConsumed,
            unit: 'kcal',
            icon: Flame,
            color: 'text-orange-600',
            bg: 'bg-orange-50 dark:bg-orange-900/20',
          },
          {
            label: 'Calories Burned',
            value: stats.caloriesBurned,
            unit: 'kcal',
            icon: Activity,
            color: 'text-blue-600',
            bg: 'bg-blue-50 dark:bg-blue-900/20',
          },
          {
            label: 'Exercise Time',
            value: stats.exerciseTime,
            unit: 'min',
            icon: Clock,
            color: 'text-green-600',
            bg: 'bg-green-50 dark:bg-green-900/20',
          },
          {
            label: 'Daily Goal',
            value: stats.calorieGoalProgress.toFixed(0),
            unit: '%',
            icon: Target,
            color: 'text-purple-600',
            bg: 'bg-purple-50 dark:bg-purple-900/20',
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110`}
              >
                <stat.icon size={20} />
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <MoreVertical size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </h3>
              <span className="text-sm text-gray-400">{stat.unit}</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${stat.color.replace('text', 'bg')} transition-all duration-1000`}
                style={{
                  width: `${stat.label === 'Daily Goal' ? stat.value : Math.min((stat.value / 500) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white">
              Calorie Balance Trend
            </h3>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                <span className="text-gray-500 dark:text-gray-400">
                  Consumed
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-gray-500 dark:text-gray-400">Burned</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="colorConsumed"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF',
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="consumed"
                  stroke="#2563EB"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorConsumed)"
                />
                <Area
                  type="monotone"
                  dataKey="burned"
                  stroke="#10B981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBurned)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white mb-8">
            Exercise Distribution
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={exerciseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {exerciseDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFF',
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
