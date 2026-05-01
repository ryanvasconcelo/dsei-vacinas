import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function SlideOver({ isOpen, onClose, title, children }: SlideOverProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', zIndex: 50 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="modal-overlay"
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="slide-over"
            style={{
              position: 'fixed', right: 0, top: 0, bottom: 0,
              width: '100%', maxWidth: '480px',
              backgroundColor: '#fff',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
              zIndex: 50,
              display: 'flex', flexDirection: 'column'
            }}
          >
            <div style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
              padding: '1.25rem 1.5rem', borderBottom: '1px solid #F0EFE8' 
            }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#1A1916' }}>{title}</h2>
              <button 
                onClick={onClose} 
                style={{ 
                  background: 'none', border: 'none', cursor: 'pointer', 
                  padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%'
                }}
                className="hover-bg-slate-100"
              >
                <X size={20} color="#888880" />
              </button>
            </div>
            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
