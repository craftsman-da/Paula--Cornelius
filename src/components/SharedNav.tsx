import { useState, useRef, useEffect } from 'react';
import { Heart, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GOLD = 'var(--theme-primary)';
const GOLD_BORDER = 'rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.28)';
const GOLD_LIGHT = 'rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.1)';

type NavItem =
  | { label: string; to: string; type: 'link' }
  | { label: string; onClick: () => void; type: 'button' };

export function SharedNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      sessionStorage.setItem('scrollTo', 'story');
      window.location.href = '/';
    }
    setIsMenuOpen(false);
  };

  // Close "More" on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close "More" on route change
  useEffect(() => {
    setIsMoreOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Primary links — same 4 as original
  const homeLinks: NavItem[] = [
    { label: 'Home', to: '/', type: 'link' },
    { label: 'Our Story', onClick: scrollToStory, type: 'button' },
    { label: 'Program of Event', to: '/program-of-event', type: 'link' },
    { label: 'Dining Menu', to: '/dining-menu', type: 'link' },
  ];

  const otherLinks: NavItem[] = [
    { label: 'Home', to: '/', type: 'link' },
    { label: 'Gallery', to: '/gallery', type: 'link' },
    { label: 'Program of Event', to: '/program-of-event', type: 'link' },
    { label: 'Dining Menu', to: '/dining-menu', type: 'link' },
  ];

  // Overflow links — shown in desktop "More" dropdown and appended to mobile list
  const moreLinks: NavItem[] = [
    { label: "Parents' Prayers", to: '/parents-prayer', type: 'link' },
  ];

  const navLinks = isHome ? homeLinks : otherLinks;
  const mobileLinks: NavItem[] = [...navLinks, ...moreLinks];

  const linkClass =
    'px-2.5 py-1.5 rounded-full text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 whitespace-nowrap';

  return (
    <div className='fixed top-4 left-0 right-0 z-50 flex justify-center px-4 max-w-[100vw]'>
      <motion.div
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, type: 'spring', stiffness: 90 }}
        className='w-full max-w-3xl'
      >
        {/* Pill bar */}
        <div
          className='flex items-center gap-1 rounded-full px-3 py-2 shadow-xl'
          style={{
            backgroundColor: 'rgba(251, 248, 243, 0.96)',
            border: `1px solid ${GOLD_BORDER}`,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Brand */}
          <Link
            to='/'
            className='flex items-center gap-1.5 pr-3 mr-1 flex-shrink-0'
            style={{ borderRight: `1px solid ${GOLD_BORDER}` }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className='w-4 h-4' style={{ color: GOLD }} fill='currentColor' />
            </motion.div>
            <span className='font-serif text-sm sm:text-base text-gray-800 whitespace-nowrap'>
              Paula <span style={{ color: GOLD }}>&</span> Cornelius
            </span>
          </Link>

          {/* Desktop links */}
          <div className='hidden md:flex items-center gap-0.5 flex-1'>
            {navLinks.map((item) =>
              item.type === 'button' ? (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={linkClass}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = GOLD_LIGHT)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className={linkClass}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = GOLD_LIGHT)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'transparent')
                  }
                >
                  {item.label}
                </Link>
              )
            )}

            {/* More ▾ dropdown */}
            <div className='relative' ref={moreRef}>
              <button
                onClick={() => setIsMoreOpen((o) => !o)}
                className={`${linkClass} flex items-center gap-1`}
                style={{
                  backgroundColor: isMoreOpen ? GOLD_LIGHT : 'transparent',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = GOLD_LIGHT)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = isMoreOpen
                    ? GOLD_LIGHT
                    : 'transparent')
                }
              >
                More
                <motion.span
                  animate={{ rotate: isMoreOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className='inline-flex'
                >
                  <ChevronDown className='w-3.5 h-3.5' />
                </motion.span>
              </button>

              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    key='more-dropdown'
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className='absolute top-full left-0 mt-2 rounded-2xl shadow-xl overflow-hidden'
                    style={{
                      minWidth: '170px',
                      backgroundColor: 'rgba(251, 248, 243, 0.98)',
                      border: `1px solid ${GOLD_BORDER}`,
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                    }}
                  >
                    <div className='p-2 flex flex-col gap-0.5'>
                      {moreLinks.map((item) =>
                        item.type === 'link' ? (
                          <Link
                            key={item.label}
                            to={item.to}
                            className='block px-3 py-2 rounded-xl text-sm text-gray-700 whitespace-nowrap transition-colors'
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = GOLD_LIGHT)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor = 'transparent')
                            }
                            onClick={() => setIsMoreOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ) : null
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Flex spacer on mobile */}
          <div className='flex-1 md:hidden' />

          {/* Send Gift CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='flex-shrink-0'
          >
            <Link
              to='/gift-registry'
              className='flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold text-white whitespace-nowrap shadow-md transition-opacity hover:opacity-90'
              style={{ backgroundColor: GOLD }}
            >
              Send Gift
              <span className='ml-0.5 text-white/80'>→</span>
            </Link>
          </motion.div>

          {/* Mobile hamburger */}
          <motion.button
            className='md:hidden ml-1.5 p-1.5 rounded-full text-gray-600 flex-shrink-0 transition-colors'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = GOLD_LIGHT)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
            aria-label='Toggle menu'
          >
            <AnimatePresence mode='wait' initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key='close'
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className='w-5 h-5' />
                </motion.div>
              ) : (
                <motion.div
                  key='open'
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className='w-5 h-5' />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile dropdown — all links including overflow */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key='mobile-menu'
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className='mt-2 rounded-2xl shadow-xl overflow-hidden'
              style={{
                backgroundColor: 'rgba(251, 248, 243, 0.98)',
                border: `1px solid ${GOLD_BORDER}`,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              <div className='p-3 flex flex-col gap-1'>
                {mobileLinks.map((item, idx) =>
                  item.type === 'button' ? (
                    <motion.button
                      key={item.label}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.06 }}
                      onClick={item.onClick}
                      className='w-full text-left px-4 py-2.5 rounded-xl text-sm text-gray-700 transition-colors'
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = GOLD_LIGHT)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      {item.label}
                    </motion.button>
                  ) : (
                    <motion.div
                      key={item.label}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.06 }}
                    >
                      <Link
                        to={item.to}
                        className='block px-4 py-2.5 rounded-xl text-sm text-gray-700 transition-colors'
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = GOLD_LIGHT)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = 'transparent')
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
