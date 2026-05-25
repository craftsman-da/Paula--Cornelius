import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, COLORS } from '../context/ThemeContext';

export function FloatingThemeSwitcher() {
  const { selectedTheme, setSelectedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    document.addEventListener('touchstart', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('touchstart', handle);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className='fixed bottom-6 right-5 z-50 flex flex-col items-center gap-2.5'
    >
      {/* Color swatches — bubble up above trigger */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.88 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className='flex flex-col items-center gap-2 p-2.5 rounded-2xl shadow-xl'
            style={{
              backgroundColor: 'rgba(251, 248, 243, 0.96)',
              border: '1px solid rgba(0,0,0,0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {COLORS.map((color, idx) => (
              <motion.button
                key={color.name}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.055, duration: 0.18, ease: 'easeOut' }}
                onClick={() => {
                  setSelectedTheme(idx);
                  setOpen(false);
                }}
                className='relative w-7 h-7 rounded-full flex-shrink-0 cursor-pointer'
                style={{
                  backgroundColor: color.value,
                  boxShadow:
                    selectedTheme === idx
                      ? `0 0 0 2px #fff, 0 0 0 3.5px ${color.value}, 0 2px 8px rgba(0,0,0,0.18)`
                      : '0 2px 6px rgba(0,0,0,0.18)',
                  transition: 'box-shadow 0.2s',
                }}
                aria-label={color.name}
                title={color.name}
              >
                {selectedTheme === idx && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className='absolute inset-0 flex items-center justify-center'
                  >
                    <svg
                      className='w-3 h-3 drop-shadow'
                      fill='none'
                      stroke='white'
                      strokeWidth='3'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                    </svg>
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.12, opacity: 1 }}
        whileTap={{ scale: 0.92 }}
        className='w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0'
        style={{
          backgroundColor: 'rgba(251, 248, 243, 0.94)',
          border: '1px solid rgba(0,0,0,0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: open
            ? '0 4px 20px rgba(0,0,0,0.14)'
            : '0 2px 10px rgba(0,0,0,0.1)',
          opacity: open ? 1 : 0.7,
          transition: 'opacity 0.2s, box-shadow 0.2s',
        }}
        aria-label='Change theme colour'
        title='Colour of the day'
      >
        {/* 3 stacked colour dots — hints at picker */}
        <span className='flex flex-col items-center gap-[3px]'>
          {COLORS.map((color) => (
            <span
              key={color.name}
              className='block rounded-full flex-shrink-0'
              style={{
                width: 7,
                height: 7,
                backgroundColor: color.value,
                opacity: color.value === COLORS[selectedTheme].value ? 1 : 0.45,
              }}
            />
          ))}
        </span>
      </motion.button>
    </div>
  );
}
