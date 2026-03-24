/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  X,
  Sparkles,
  User,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  type?: 'text' | 'exercise_card' | 'diet_card';
  data?: any;
}

const ChatPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your FitAI Assistant. How can I help you today? You can log your exercise or diet by just telling me.',
      timestamp: new Date().toISOString(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 模拟用户数据
  const profile = {
    name: 'Alex',
    weight: 70,
    height: 175,
    goal: 'lose_weight',
    dailyCalorieGoal: 2200,
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 模拟AI响应
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'm sorry, the AI service is currently unavailable. Please try again later.",
          timestamp: new Date().toISOString(),
          type: 'text'
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I couldn't process that. Could you try rephrasing?",
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: '400px',
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #e5e7eb',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#2563eb', color: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={20} />
          <h2 style={{ fontWeight: 'bold' }}>FitAI Assistant</h2>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            padding: '0.25rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#ffffff',
            borderRadius: '0.375rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <X size={20} />
        </button>
      </div>

      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{ display: 'flex', gap: '0.75rem', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}
            >
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  backgroundColor: msg.role === 'assistant' ? '#eff6ff' : '#f3f4f6',
                  color: msg.role === 'assistant' ? '#2563eb' : '#6b7280'
                }}
              >
                {msg.role === 'assistant' ? (
                  <Sparkles size={16} />
                ) : (
                  <User size={16} />
                )}
              </div>
              <div
                style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <div
                  style={{
                    padding: '0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    backgroundColor: msg.role === 'assistant' ? '#f9fafb' : '#2563eb',
                    color: msg.role === 'assistant' ? '#111827' : '#ffffff',
                    borderTopLeftRadius: msg.role === 'assistant' ? 0 : '1rem',
                    borderTopRightRadius: msg.role === 'user' ? 0 : '1rem'
                  }}
                >
                  {msg.content}
                </div>

                {msg.type === 'exercise_card' && msg.data && (
                  <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: '0.75rem', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <p style={{ fontWeight: 'bold', color: '#16a34a' }}>
                      ✅ Exercise Logged
                    </p>
                    <p style={{ color: '#4b5563' }}>
                      Type: {msg.data.type}
                    </p>
                    <p style={{ color: '#4b5563' }}>
                      Duration: {msg.data.duration} mins
                    </p>
                    <p style={{ color: '#4b5563' }}>
                      Calories: {msg.data.calories} kcal
                    </p>
                  </div>
                )}

                {msg.type === 'diet_card' && msg.data && (
                  <div style={{ padding: '0.75rem', backgroundColor: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '0.75rem', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <p style={{ fontWeight: 'bold', color: '#d97706' }}>
                      ✅ Diet Logged
                    </p>
                    <p style={{ color: '#4b5563' }}>
                      Food: {msg.data.food}
                    </p>
                    <p style={{ color: '#4b5563' }}>
                      Calories: {msg.data.calories} kcal
                    </p>
                    <p style={{ color: '#4b5563' }}>
                      Protein: {msg.data.protein}g
                    </p>
                  </div>
                )}

                <p style={{ fontSize: '0.625rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                  {format(new Date(msg.timestamp), 'HH:mm')}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Loader2 style={{ animation: 'spin 1s linear infinite' }} size={16} />
            </div>
            <div style={{ backgroundColor: '#f9fafb', padding: '0.75rem', borderRadius: '1rem', borderTopLeftRadius: 0 }}>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <span style={{ width: '0.375rem', height: '0.375rem', backgroundColor: '#d1d5db', borderRadius: '50%', animation: 'bounce 1s infinite' }}></span>
                <span style={{ width: '0.375rem', height: '0.375rem', backgroundColor: '#d1d5db', borderRadius: '50%', animation: 'bounce 1s infinite 0.25s' }}></span>
                <span style={{ width: '0.375rem', height: '0.375rem', backgroundColor: '#d1d5db', borderRadius: '50%', animation: 'bounce 1s infinite 0.5s' }}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '1rem', borderTop: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {['#Exercise', '#Diet', '#Advice', '#Report'].map((tag) => (
            <button
              key={tag}
              onClick={() => setInput(tag + ' ')}
              style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: '#f3f4f6',
                color: '#6b7280',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                border: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#eff6ff';
                e.currentTarget.style.color = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        <div style={{ position: 'relative' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message or use #tags..."
            style={{
              width: '100%',
              padding: '0.75rem 3rem 0.75rem 1rem',
              backgroundColor: '#f9fafb',
              border: 'none',
              borderRadius: '1rem',
              fontSize: '0.875rem',
              resize: 'none',
              transition: 'all 0.2s ease'
            }}
            rows={2}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          <div style={{ position: 'absolute', right: '0.75rem', bottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button style={{ padding: '0.375rem', color: '#9ca3af', backgroundColor: 'transparent', border: 'none', transition: 'all 0.2s ease' }}>
              <ImageIcon size={18} />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              style={{
                padding: '0.375rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                borderRadius: '0.75rem',
                border: 'none',
                transition: 'all 0.2s ease',
                boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.2)',
                opacity: (!input.trim() || isLoading) ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (input.trim() && !isLoading) {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                }
              }}
              onMouseLeave={(e) => {
                if (input.trim() && !isLoading) {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPanel;
