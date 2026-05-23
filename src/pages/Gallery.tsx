import { useState, useMemo } from 'react';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadLocalImages } from '../data/galleryData';
import { SharedNav } from '../components/SharedNav';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Gallery() {
  const images = useMemo(() => {
    const localImages = loadLocalImages();
    return [...localImages];
  }, []);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const openModal = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + images.length) % images.length
      );
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImageIndex === null) return;

    if (e.key === 'ArrowRight') nextImage(e as any);
    if (e.key === 'ArrowLeft') prevImage(e as any);
    if (e.key === 'Escape') closeModal();
  };

  useState(() => {
    window.addEventListener('keydown', handleKeyDown as any);
    return () => window.removeEventListener('keydown', handleKeyDown as any);
  });

  return (
    <div className='min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-amber-50/20'>
      <SharedNav />

      <main className='pt-24 sm:pt-28 pb-12 sm:pb-20 px-3 sm:px-6'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <motion.div
            className='text-center mb-8 sm:mb-16'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className='inline-block mb-4'
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Heart className='w-8 h-8 sm:w-12 sm:h-12 text-rose-400 fill-rose-400 mx-auto' />
            </motion.div>
            <h1 className='font-serif text-3xl sm:text-5xl md:text-6xl text-gray-900 mb-4 sm:mb-6'>
              Our Love Story
            </h1>
            <p className='text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg px-4'>
              Every moment captured, every smile cherished. These photos
              celebrate our journey of love, laughter, and the promise of
              forever together.
            </p>
            <div className='mt-6 flex items-center justify-center gap-2 text-rose-600'>
              <div className='h-px w-12 bg-gradient-to-r from-transparent to-rose-300'></div>
              <Heart className='w-4 h-4 fill-rose-400' />
              <div className='h-px w-12 bg-gradient-to-l from-transparent to-rose-300'></div>
            </div>
          </motion.div>

          {/* Masonry Gallery Grid */}
          <motion.div
            className='columns-1 sm:columns-2 lg:columns-3 gap-2 sm:gap-3 md:gap-4 space-y-2 sm:space-y-3 md:space-y-4'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className='break-inside-avoid'
              >
                <motion.div
                  className='group relative overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-2xl cursor-pointer bg-white'
                  onClick={() => openModal(index)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Decorative corner hearts */}
                  <div className='absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <Heart className='w-5 h-5 text-white fill-white drop-shadow-lg' />
                  </div>

                  {/* Image overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'></div>

                  {/* Image */}
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className='w-full h-auto object-cover'
                    loading='lazy'
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Bottom gradient with alt text */}
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'>
                    <p className='text-white text-xs sm:text-sm font-medium capitalize'>
                      {image.alt}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Image count */}
          <motion.div
            className='text-center mt-12 sm:mt-16 text-gray-500 text-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className='flex items-center justify-center gap-2'>
              <Heart className='w-4 h-4 fill-rose-400 text-rose-400' />
              {images.length} Precious moments captured
            </p>
          </motion.div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            className='fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-2 sm:p-4'
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button */}
            <motion.button
              onClick={closeModal}
              className='absolute top-3 right-3 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors z-50 p-2 rounded-full hover:bg-white/10'
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className='w-6 h-6 sm:w-8 sm:h-8' />
            </motion.button>

            {/* Previous button */}
            <motion.button
              onClick={prevImage}
              className='absolute left-2 sm:left-4 md:left-8 text-white/70 hover:text-white transition-colors p-2 sm:p-3 z-50 rounded-full hover:bg-white/10'
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12' />
            </motion.button>

            {/* Image container */}
            <motion.div
              className='relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center px-12 sm:px-16 md:px-20'
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                className='max-w-full max-h-full object-contain rounded-lg shadow-2xl'
              />

              {/* Image caption */}
              <motion.div
                className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 rounded-b-lg'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className='text-white text-sm sm:text-base text-center capitalize'>
                  {images[selectedImageIndex].alt}
                </p>
                <p className='text-white/60 text-xs sm:text-sm text-center mt-1'>
                  {selectedImageIndex + 1} / {images.length}
                </p>
              </motion.div>
            </motion.div>

            {/* Next button */}
            <motion.button
              onClick={nextImage}
              className='absolute right-2 sm:right-4 md:right-8 text-white/70 hover:text-white transition-colors p-2 sm:p-3 z-50 rounded-full hover:bg-white/10'
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12' />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
