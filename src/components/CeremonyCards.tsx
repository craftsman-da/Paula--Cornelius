import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme, COLORS } from '../context/ThemeContext';

export function CeremonyCards() {
  const { selectedTheme, setSelectedTheme, currentColor } = useTheme();

  return (
    <div className='mt-12 flex flex-col gap-32'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='flex flex-col md:flex-row-reverse items-center gap-8'
      >
        {/* Image Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className='relative w-full md:w-[400px] h-[400px] flex-shrink-0'
        >
          <Link
            to='/gallery'
            className='relative block w-full h-full group cursor-pointer'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-[var(--theme-primary)] to-transparent opacity-20 rounded-3xl transition-opacity duration-300 group-hover:opacity-30' />
            <img
              src='/Paula_plus_Cornelius.jpeg'
              alt='Wedding Ceremony'
              className='w-full h-full object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]'
            />
            <div className='absolute inset-0 rounded-3xl ring-1 ring-black/5' />
          </Link>
        </motion.div>

        {/* Content Section */}
        <div className='flex-1 flex flex-col justify-center items-center md:items-start'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='flex items-center gap-2 mb-4'
          >
            <div className='h-px w-8 bg-gradient-to-r from-transparent to-gray-300' />
            <span className='text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase'>
              Our Special Day
            </span>
            <div className='h-px w-8 bg-gradient-to-l from-transparent to-gray-300' />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-5xl md:text-6xl font-serif text-gray-900 mb-3'
          >
            Wedding{' '}
            <span
              className={`italic font-light transition-colors duration-500 ${currentColor.text}`}
              style={{
                textShadow: `0 0 20px rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.15)`,
              }}
            >
              {currentColor.ceremonyText}
            </span>
            .
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='text-gray-600 text-lg leading-relaxed mb-10 max-w-xl'
          >
            Meet the couple, discover the wedding party, and get all the details
            for the big celebration. Join us as we begin our journey together.
          </motion.p>

          {/* Color Switcher */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='mb-10 w-full max-w-xl'
          >
            <h4 className='text-sm font-semibold text-gray-700 mb-4 uppercase tracking-[0.15em] flex items-center gap-2'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
                />
              </svg>
              Colour of the Day
            </h4>
            <div className='flex gap-4 mb-3'>
              {COLORS.map((color, idx) => (
                <motion.button
                  key={color.name}
                  type='button'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-12 h-12 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    color.bg
                  } ${
                    selectedTheme === idx
                      ? 'ring-4 ring-offset-2 ring-black/20 shadow-xl'
                      : 'hover:shadow-xl hover:ring-2 hover:ring-offset-2 hover:ring-black/10'
                  }`}
                  aria-label={color.name}
                  onClick={() => setSelectedTheme(idx)}
                >
                  {selectedTheme === idx && (
                    <motion.svg
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className='w-6 h-6 text-white drop-shadow-lg'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='3'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5 13l4 4L19 7'
                      />
                    </motion.svg>
                  )}
                </motion.button>
              ))}
            </div>
            <div className='flex gap-4'>
              {COLORS.map((color, idx) => (
                <span
                  key={color.name}
                  className={`text-xs w-12 text-center transition-all duration-300 ${
                    selectedTheme === idx
                      ? 'font-bold text-gray-900'
                      : 'text-gray-500 font-medium'
                  }`}
                >
                  {color.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA Button */}
          <Link
            to='/ceremony-details'
            className='inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-semibold border-2 transition-all duration-300 shadow-lg hover:shadow-xl'
            style={{
              borderColor: 'var(--theme-primary)',
              background: `rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.1)`,
              color: 'var(--theme-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--theme-primary)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.1)`;
              e.currentTarget.style.color = 'var(--theme-primary)';
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='flex items-center gap-2'
            >
              View Details
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
