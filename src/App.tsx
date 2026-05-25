import { Heart, MapPin, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { CeremonyCards } from './components/CeremonyCards';
import { Countdown } from './components/Countdown';
import { Parallax } from './components/Parallax';
import { SharedNav } from './components/SharedNav';
import { useTheme } from './context/ThemeContext';

const GOLD = 'var(--theme-primary)';
const GOLD_BORDER =
  'rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.22)';
const GOLD_BG = 'rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.08)'; // eslint-disable-line @typescript-eslint/no-unused-vars

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const goodwillMessages = [
  {
    text: 'My favourite couple!! A Match made in heaven! May your love reflect the love of God for his children :)',
    name: 'Kosisochukwu Leslie',
    title: 'Well-Wisher',
  },
  {
    text: "My sweet brother, seeing you walk into this new chapter makes me so proud and so happy. You've always been the baby of the family, the one who made us laugh and kept our hearts light, and now you're starting your own family with Paula — the love of your life. I pray your marriage is full of joy, laughter, and endless love. May you and your wife always be best friends, partners, and soulmates through every season of life. You deserve all the happiness in the world, and I know you'll be an amazing husband. Congratulations, my lovely lastborn. I love you deeply, and I'll always be here cheering you on.",
    name: 'Chimaoge Eric',
    title: 'Family',
  },
  {
    text: 'It is a unique privilege to witness this lifetime union of love between Engr. Chukwuebuka Cornelius Okoro and Barr. Paula Akunne. I pray that the Good Lord who started this good work in you brings it to fulfilment. May he grant you everlasting love and eternal happiness.',
    name: 'Rev. Fr. Dr. Charles Kenechukwu Okoro',
    title: 'Family',
  },
  {
    text: 'What a beautiful union built on friendship, understanding, and love — the union of Cornelius Chukwuebuka and Paula Amarachi. May the good Lord guide your paths, sustain your love, and richly bless your home with peace, faith, joy, and enduring happiness. May your journey together continue to flourish in grace and unity.',
    name: 'Rev. Fr. Ernest Chukwuemeka Okoro, STL',
    title: 'Family',
  },
];

function AppContent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { selectedTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % goodwillMessages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handle cross-page smooth scroll to #story
  useEffect(() => {
    const target = sessionStorage.getItem('scrollTo');
    if (target) {
      sessionStorage.removeItem('scrollTo');
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    }
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % goodwillMessages.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + goodwillMessages.length) % goodwillMessages.length,
    );

  const coupleNames = ['Paula', '&', 'Cornelius'];
  const weddingDate = '20th July 2026';
  const hashtag = '#PaulaAndCornelius2026';

  return (
    <div
      className='min-h-screen overflow-x-hidden'
      style={{ backgroundColor: '#FBF8F3' }}
    >
      <SharedNav />

      {/* ─── Hero Section ─── */}
      <section id='home' className='pt-20 sm:pt-24 px-4 sm:px-6'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className='relative h-[520px] sm:h-[620px] lg:h-[740px] rounded-2xl sm:rounded-3xl overflow-hidden'
          >
            <div
              className='absolute inset-0 z-10'
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.76) 100%)',
              }}
            />
            <Parallax
              speed={-30}
              className='absolute inset-0 w-full h-[120%] -top-[10%]'
            >
              <img
                src='/Paula_and_Cornelius (2).jpg'
                alt='Paula and Cornelius — Wedding 2026'
                className='w-full h-full object-cover'
              />
            </Parallax>

            <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 z-20 px-4'>
              {/* Decorative line */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className='flex items-center gap-3 px-5 py-2 rounded-full'
                style={{
                  background: 'rgba(0,0,0,0.18)',
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)',
                }}
              >
                <div
                  className='h-px w-10 sm:w-16'
                  style={{
                    background:
                      selectedTheme === 0 ? GOLD : 'rgba(255,255,255,0.75)',
                  }}
                />
                <span
                  className='text-[10px] sm:text-xs tracking-[0.32em] uppercase font-medium'
                  style={{ color: 'white' }}
                >
                  Together Forever
                </span>
                <div
                  className='h-px w-10 sm:w-16'
                  style={{
                    background:
                      selectedTheme === 0 ? GOLD : 'rgba(255,255,255,0.75)',
                  }}
                />
              </motion.div>

              {/* Couple Names */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.35 }}
                className='text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-wide text-center'
                style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
              >
                Paula <span style={{ color: GOLD }}>✦</span> Cornelius
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className='text-white/85 text-sm sm:text-base md:text-lg text-center max-w-lg px-4 italic'
              >
                Together with their families, joyfully invite you to celebrate
                their wedding.
              </motion.p>

              {/* Wedding Date */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className='flex items-center gap-2 sm:gap-3 text-xs sm:text-sm tracking-[0.28em] uppercase font-medium'
              >
                {['20', null, 'July', null, '2026'].map((part, i) =>
                  part === null ? (
                    <span
                      key={i}
                      style={{
                        color: GOLD,
                        textShadow:
                          '0 0 8px rgba(0,0,0,0.65), 0 0 18px rgba(0,0,0,0.4)',
                      }}
                    >
                      ·
                    </span>
                  ) : (
                    <span
                      key={i}
                      style={{
                        color: 'rgba(255,255,255,0.88)',
                        textShadow:
                          '0 0 8px rgba(0,0,0,0.65), 0 0 18px rgba(0,0,0,0.4)',
                      }}
                    >
                      {part}
                    </span>
                  ),
                )}
              </motion.div>

              {/* Hashtag */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.82 }}
                className='text-xs sm:text-sm tracking-wider font-semibold'
                style={{
                  color: 'rgba(255,255,255,0.92)',
                  textShadow:
                    '0 0 6px rgba(0,0,0,0.7), 0 0 16px rgba(0,0,0,0.45), 0 0 10px var(--theme-primary)',
                }}
              >
                {hashtag}
              </motion.p>

              {/* Countdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.95 }}
                className='w-full mt-1'
              >
                <Countdown />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Announcement Section ─── */}
      <section className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={scaleIn}
            className='flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-12 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12'
            style={{
              background:
                'linear-gradient(135deg, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.1) 0%, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.04) 100%)',
              border: `1px solid ${GOLD_BORDER}`,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className='w-24 h-24 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg flex-shrink-0 relative'
              style={{
                border: `2px solid rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.4)`,
              }}
            >
              <Parallax
                speed={-10}
                className='absolute inset-0 w-full h-[140%] -top-[20%]'
              >
                <img
                  src='/Paula_and_Cornelius (12).jpeg'
                  alt='Paula and Cornelius'
                  className='w-full h-full object-cover'
                />
              </Parallax>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className='flex-1 text-center md:text-left'
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className='text-xs sm:text-sm uppercase tracking-[0.26em] mb-2 font-medium'
                style={{ color: GOLD }}
              >
                ✦ Join Us to Celebrate ✦
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 mb-2 sm:mb-3'
              >
                {coupleNames[0]}{' '}
                <span style={{ color: GOLD }}>{coupleNames[1]}</span>{' '}
                {coupleNames[2]}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className='text-sm sm:text-base text-gray-600 mb-1'
              >
                {weddingDate}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.48 }}
                className='text-xs sm:text-sm font-semibold'
                style={{ color: GOLD }}
              >
                {hashtag}
              </motion.p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to='/program-of-event'
                className='block px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm font-semibold transition-all duration-300 w-full md:w-auto text-center shadow-lg hover:shadow-xl whitespace-nowrap'
                style={{
                  backgroundColor: GOLD,
                  color: 'white',
                  border: `2px solid ${GOLD}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = GOLD;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = GOLD;
                  e.currentTarget.style.color = 'white';
                }}
              >
                Program of Event
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Story & Gallery Section ─── */}
      <section id='story' className='py-8 sm:py-12 px-4 sm:px-6'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className='max-w-7xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8'
        >
          {/* Our Story */}
          <motion.div
            variants={slideInLeft}
            className='rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12'
            style={{
              background:
                'linear-gradient(135deg, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.1) 0%, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.04) 100%)',
              border: `1px solid ${GOLD_BORDER}`,
            }}
          >
            <motion.p
              variants={fadeInUp}
              className='text-xs uppercase tracking-[0.26em] mb-2 font-medium'
              style={{ color: GOLD }}
            >
              ✦ Our Journey ✦
            </motion.p>
            <motion.h3
              variants={fadeInUp}
              className='text-xl sm:text-2xl font-serif text-gray-800 mb-4 sm:mb-6'
            >
              Our Love Story
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className='text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8'
            >
              From a chance encounter to a lifetime together. Our journey has
              been filled with laughter, growth, and unwavering love. Every
              moment has led us to this beautiful celebration of our union.
            </motion.p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to='/gift-registry'
                className='inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto text-center'
                style={{
                  backgroundColor: GOLD,
                  color: 'white',
                  border: `2px solid ${GOLD}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = GOLD;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = GOLD;
                  e.currentTarget.style.color = 'white';
                }}
              >
                SEND YOUR GIFT →
              </Link>
            </motion.div>
          </motion.div>

          {/* Photo Gallery */}
          <motion.div variants={slideInRight}>
            <Link
              to='/gallery'
              className='rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 block hover:shadow-lg transition-all duration-500 cursor-pointer group h-full'
              style={{
                background:
                  'linear-gradient(135deg, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.1) 0%, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.04) 100%)',
                border: `1px solid ${GOLD_BORDER}`,
              }}
            >
              <div className='flex justify-between items-start mb-4 sm:mb-6'>
                <div>
                  <p
                    className='text-xs uppercase tracking-[0.26em] mb-2 font-medium'
                    style={{ color: GOLD }}
                  >
                    ✦ Moments ✦
                  </p>
                  <h3 className='text-xl sm:text-2xl font-serif text-gray-800 mb-2'>
                    Our Gallery
                  </h3>
                  <p className='text-xs sm:text-sm text-gray-500 leading-relaxed italic'>
                    Every smile, every glance —<br />
                    our love story, frame by frame.
                  </p>
                </div>
                <span
                  className='font-medium hidden sm:inline transition-colors'
                  style={{ color: GOLD }}
                >
                  View All →
                </span>
              </div>
              <motion.div
                variants={staggerContainer}
                className='grid grid-cols-3 gap-2 sm:gap-3'
              >
                {['/ebuka.jpeg', '/Paula_and_Ebuka.jpeg', '/Paula.png'].map(
                  (src, idx) => (
                    <motion.div
                      key={idx}
                      variants={scaleIn}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      transition={{ duration: 0.3 }}
                      className='aspect-square rounded-lg overflow-hidden'
                      style={{ boxShadow: `0 0 0 1px ${GOLD_BORDER}` }}
                    >
                      <img
                        src={src}
                        alt={`Cherished moment ${idx + 1}`}
                        className='w-full h-full object-cover'
                      />
                    </motion.div>
                  ),
                )}
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Ceremony Cards ─── */}
      <section className='py-8 sm:py-12 px-4 sm:px-6'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className='max-w-7xl mx-auto'
        >
          <CeremonyCards />
        </motion.div>
      </section>

      {/* ─── Wedding Events Section ─── */}
      <section
        className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6 rounded-t-[50px] sm:rounded-t-[100px] mt-12 sm:mt-20'
        style={{
          background:
            'linear-gradient(135deg, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.13) 0%, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.06) 100%)',
        }}
      >
        <div className='max-w-7xl mx-auto'>
          {/* Section Header */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className='text-center mb-12 sm:mb-16'
          >
            <p
              className='text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 font-semibold'
              style={{ color: GOLD }}
            >
              ✦ Wedding Day ✦
            </p>
            <h2 className='text-3xl sm:text-4xl font-serif text-gray-800 mb-3'>
              The Celebration
            </h2>
            <div
              className='h-px w-24 mx-auto'
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
              }}
            />
          </motion.div>

          {/* Holy Matrimony */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className='grid md:grid-cols-2 gap-8 sm:gap-12 items-start mb-14 sm:mb-24'
          >
            <motion.div variants={slideInLeft}>
              <motion.div
                variants={fadeInUp}
                className='flex items-center gap-2 mb-4'
              >
                <Users
                  className='w-4 h-4 sm:w-5 sm:h-5'
                  style={{ color: GOLD }}
                />
                <p className='text-xs sm:text-sm text-gray-600 uppercase tracking-wider'>
                  SACRED CEREMONY
                </p>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className='text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-800 mb-6 sm:mb-8'
              >
                Holy Matrimony
              </motion.h2>
              <motion.div
                variants={staggerContainer}
                className='space-y-4 text-gray-600 mb-6 sm:mb-8'
              >
                {[
                  {
                    icon: MapPin,
                    label: 'Venue',
                    value: 'Saint Barnabas Catholic Church',
                    sub: '10 Washburn Way, Scarborough, ON M1B 1H3',
                  },
                  {
                    icon: Calendar,
                    label: 'Date',
                    value: weddingDate,
                    sub: '',
                  },
                  {
                    icon: Heart,
                    label: 'Holy Mass Begins',
                    value: '12:00 Noon',
                    sub: '',
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className='flex items-start gap-3'
                  >
                    <item.icon
                      className='w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0'
                      style={{ color: GOLD }}
                    />
                    <div>
                      <p className='font-medium text-gray-800 text-sm sm:text-base'>
                        {item.label}
                      </p>
                      <p className='text-xs sm:text-sm'>{item.value}</p>
                      {item.sub && (
                        <p className='text-xs text-gray-500 mt-0.5'>
                          {item.sub}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={slideInRight} className='relative'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className='rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl'
                style={{
                  border: `2px solid rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.3)`,
                }}
              >
                <iframe
                  src='https://www.google.com/maps?q=Saint+Barnabas+Catholic+Church,+10+Washburn+Way,+Scarborough,+ON+M1B+1H3&output=embed'
                  title='Church Location — Saint Barnabas Catholic Church, Scarborough'
                  width='100%'
                  height='300'
                  className='sm:h-[400px]'
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                ></iframe>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Wedding Reception */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className='grid md:grid-cols-2 gap-8 sm:gap-12 items-start'
          >
            <motion.div variants={slideInRight} className='md:order-2'>
              <motion.div
                variants={fadeInUp}
                className='flex items-center gap-2 mb-4'
              >
                <Users
                  className='w-4 h-4 sm:w-5 sm:h-5'
                  style={{ color: GOLD }}
                />
                <p className='text-xs sm:text-sm text-gray-600 uppercase tracking-wider'>
                  JOYFUL CELEBRATION
                </p>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className='text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-800 mb-6 sm:mb-8'
              >
                Wedding Reception
              </motion.h2>
              <motion.div
                variants={staggerContainer}
                className='space-y-4 text-gray-600 mb-6 sm:mb-8'
              >
                {[
                  {
                    icon: MapPin,
                    label: 'Venue',
                    value: 'Styld Spaces Events Studio',
                    sub: '1320 Ellesmere Rd Unit #5, Scarborough, ON M1P 2X9',
                  },
                  {
                    icon: Calendar,
                    label: 'Date',
                    value: weddingDate,
                    sub: '',
                  },
                  {
                    icon: Heart,
                    label: 'Celebration Starts',
                    value: '3:00 PM',
                    sub: '',
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className='flex items-start gap-3'
                  >
                    <item.icon
                      className='w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0'
                      style={{ color: GOLD }}
                    />
                    <div>
                      <p className='font-medium text-gray-800 text-sm sm:text-base'>
                        {item.label}
                      </p>
                      <p className='text-xs sm:text-sm'>{item.value}</p>
                      {item.sub && (
                        <p className='text-xs text-gray-500 mt-0.5'>
                          {item.sub}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={slideInLeft} className='relative md:order-1'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className='rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl'
                style={{
                  border: `2px solid rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.3)`,
                }}
              >
                <iframe
                  src='https://www.google.com/maps?q=1320+Ellesmere+Rd,+Scarborough,+ON+M1P+2X9&output=embed'
                  title='Reception Location — Styld Spaces Events Studio, Scarborough'
                  width='100%'
                  height='300'
                  className='sm:h-[400px]'
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                ></iframe>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Dress Code Section ─── */}
      <section
        className='py-12 sm:py-16 px-4 sm:px-6'
        style={{ backgroundColor: '#FBF8F3' }}
      >
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className='text-center mb-10'
          >
            <p
              className='text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 font-semibold'
              style={{ color: GOLD }}
            >
              ✦ Attire Guide ✦
            </p>
            <h2 className='text-3xl sm:text-4xl font-serif text-gray-800 mb-3'>
              Dress Code
            </h2>
            <p className='text-lg sm:text-xl font-serif italic text-gray-600 mb-2'>
              Formal Attire
            </p>
            <div
              className='h-px w-20 mx-auto'
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
              }}
            />
          </motion.div>

          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className='flex flex-wrap justify-center gap-8 sm:gap-14'
          >
            {[
              {
                name: 'Champagne Gold',
                color: '#C9A84C',
                shadow:
                  '0 8px 28px rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.35)',
              },
              {
                name: 'Black',
                color: '#1A1A1A',
                shadow: '0 8px 28px rgba(26,26,26,0.3)',
              },
              {
                name: 'Chocolate Brown',
                color: '#6B4226',
                shadow:
                  '0 8px 28px rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.35)',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className='flex flex-col items-center gap-3'
              >
                <div
                  className='w-20 h-20 sm:w-24 sm:h-24 rounded-full'
                  style={{
                    backgroundColor: item.color,
                    border: '4px solid white',
                    boxShadow: item.shadow,
                  }}
                />
                <span className='text-sm font-medium text-gray-700'>
                  {item.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Menu Section ─── */}
      <section
        className='py-12 sm:py-16 px-4 sm:px-6'
        style={{
          background:
            'linear-gradient(135deg, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.09) 0%, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.04) 100%)',
        }}
      >
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className='text-center mb-10'
          >
            <p
              className='text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 font-semibold'
              style={{ color: GOLD }}
            >
              ✦ Dining Experience ✦
            </p>
            <h2 className='text-3xl sm:text-4xl font-serif text-gray-800 mb-3'>
              The Wedding Menu
            </h2>
            <p className='text-sm text-gray-500 italic mb-4'>
              A curated culinary experience crafted with love
            </p>
            <div
              className='h-px w-20 mx-auto'
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
              }}
            />
          </motion.div>

          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
          >
            {[
              {
                category: 'Starters & Bites',
                items: [
                  'Tenderloin Bites',
                  'Honey Garlic Chicken Bites',
                  'Bang Bang Shrimp',
                  'Veggie Cups',
                  'Mini Chicken & Waffles',
                ],
              },
              {
                category: 'Main Course',
                items: ['Jollof Rice', 'Fried Rice', 'Moi-Moi', 'Chicken & Fish'],
              },
              {
                category: 'Cocktails & Beverages',
                items: ['Watermelon Mojito', 'Piña Colada'],
              },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                whileHover={{
                  y: -5,
                  boxShadow:
                    '0 20px 45px rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.13)',
                }}
                transition={{ duration: 0.3 }}
                className='bg-white/85 backdrop-blur-sm rounded-3xl p-8 shadow-lg relative overflow-hidden'
                style={{ border: `1px solid ${GOLD_BORDER}` }}
              >
                {/* Top gold accent */}
                <div
                  className='absolute top-0 left-0 w-full h-0.5'
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
                  }}
                />
                <h3
                  className='font-serif text-xl mb-5 text-center pb-4'
                  style={{
                    color: GOLD,
                    borderBottom: `1px solid ${GOLD_BORDER}`,
                  }}
                >
                  {section.category}
                </h3>
                <ul className='space-y-3'>
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className='flex items-center gap-2.5 text-gray-700 text-sm'
                    >
                      <span
                        style={{ color: GOLD }}
                        className='text-xs flex-shrink-0'
                      >
                        ✦
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* View Full Menu CTA */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            className='text-center mt-10'
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to='/dining-menu'
                className='inline-flex items-center gap-2.5 px-8 py-3 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300'
                style={{ backgroundColor: GOLD, color: 'white' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = GOLD;
                  e.currentTarget.style.outline = `2px solid ${GOLD}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = GOLD;
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.outline = 'none';
                }}
              >
                View Full Menu
                <span className='text-base leading-none'>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Goodwill Messages Carousel ─── */}
      <section
        className='py-12 sm:py-16 lg:py-20 px-4 sm:px-6'
        style={{
          background:
            'linear-gradient(135deg, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.13) 0%, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.06) 100%)',
        }}
      >
        <div className='max-w-3xl mx-auto'>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className='text-center mb-10'
          >
            <p
              className='text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 font-semibold'
              style={{ color: GOLD }}
            >
              ✦ Heartfelt Wishes ✦
            </p>
            <h2 className='text-3xl sm:text-4xl font-serif text-gray-800 mb-3'>
              Goodwill Messages
            </h2>
            <p className='text-sm text-gray-500 max-w-sm mx-auto'>
              Warm wishes from those who celebrate this joyful union
            </p>
          </motion.div>

          {/* Carousel */}
          <div className='relative'>
            <div className='overflow-hidden'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-lg text-center relative overflow-hidden'
                  style={{ border: `1px solid ${GOLD_BORDER}` }}
                >
                  {/* Top accent */}
                  <div
                    className='absolute top-0 left-0 w-full h-0.5'
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, var(--theme-primary), rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.5), var(--theme-primary), transparent)',
                    }}
                  />
                  <div
                    className='text-4xl sm:text-5xl mb-4 leading-none'
                    style={{ color: GOLD, opacity: 0.35 }}
                  >
                    ❝
                  </div>
                  <p className='text-gray-600 text-sm sm:text-base leading-relaxed mb-6 italic max-w-xl mx-auto'>
                    "{goodwillMessages[currentSlide].text}"
                  </p>
                  <div
                    className='w-10 h-px mx-auto mb-4'
                    style={{ backgroundColor: GOLD }}
                  />
                  <p className='font-semibold text-gray-800 text-sm'>
                    {goodwillMessages[currentSlide].name}
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>
                    {goodwillMessages[currentSlide].title}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className='flex items-center justify-center gap-5 mt-6'>
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all'
                style={{
                  border: `2px solid rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.4)`,
                  color: GOLD,
                  backgroundColor: 'white',
                }}
              >
                ‹
              </motion.button>

              <div className='flex gap-2'>
                {goodwillMessages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className='rounded-full transition-all duration-300'
                    style={{
                      width: currentSlide === idx ? '20px' : '8px',
                      height: '8px',
                      backgroundColor:
                        currentSlide === idx
                          ? GOLD
                          : 'rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.3)',
                    }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all'
                style={{
                  border: `2px solid rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.4)`,
                  color: GOLD,
                  backgroundColor: 'white',
                }}
              >
                ›
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className='px-4 sm:px-6 py-10 sm:py-14'
        style={{
          background:
            'linear-gradient(135deg, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.15) 0%, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.07) 100%)',
          borderTop: `1px solid ${GOLD_BORDER}`,
        }}
      >
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={fadeInUp}
          className='max-w-7xl mx-auto text-center'
        >
          <motion.p
            variants={fadeInUp}
            className='font-serif text-2xl sm:text-3xl text-gray-700 mb-2'
          >
            Paula <span style={{ color: GOLD }}>✦</span> Cornelius
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className='text-sm mb-1 font-semibold'
            style={{ color: GOLD }}
          >
            {hashtag}
          </motion.p>
          <motion.p variants={fadeInUp} className='text-xs text-gray-500 mb-8'>
            20th July 2026 · Scarborough, ON
          </motion.p>

          <div
            className='h-px w-28 mx-auto mb-8'
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
            }}
          />

          <motion.div
            variants={fadeInUp}
            className='flex justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8'
          >
            <a
              href='#'
              className='hover:text-gray-900 transition-colors font-medium relative group'
            >
              Share Our Joy
              <span
                className='absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full'
                style={{ backgroundColor: GOLD }}
              />
            </a>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className='flex justify-center gap-3 sm:gap-4'
          >
            {[
              { label: 'Twitter', icon: '𝕏' },
              { label: 'Instagram', icon: 'IG' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href='#'
                variants={scaleIn}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className='w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300'
                aria-label={social.label}
                style={{ backgroundColor: GOLD }}
              >
                <span className='text-sm'>{social.icon}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
