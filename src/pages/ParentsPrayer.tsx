import { motion } from 'framer-motion';
import { SharedNav } from '../components/SharedNav';
import { WeddingFooter } from '../components/WeddingFooter';

const GOLD = 'var(--theme-primary)';
const GOLD_BORDER = 'rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.22)';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export function ParentsPrayer() {
  return (
    <div
      className='min-h-screen'
      style={{
        background:
          'linear-gradient(160deg, #fdfaf5 0%, #f9f4e8 45%, #fdf8ee 100%)',
      }}
    >
      <SharedNav />

      {/* ─── Page Header ─── */}
      <motion.section
        initial='hidden'
        animate='visible'
        variants={fadeInUp}
        className='pt-28 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 text-center'
      >
        <p
          className='text-xs sm:text-sm uppercase tracking-[0.3em] mb-3 font-semibold'
          style={{ color: GOLD }}
        >
          ✦ With Boundless Love ✦
        </p>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-800 mb-4'>
          A Parent's Blessing
        </h1>
        <p className='text-sm text-gray-500 max-w-md mx-auto mb-6 leading-relaxed'>
          Heartfelt prayers poured over this union by the parents of the bride —
          words of love that will carry them through every season.
        </p>
        <div
          className='h-px w-24 mx-auto'
          style={{
            background:
              'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
          }}
        />
      </motion.section>

      {/* ─── Cards Grid ─── */}
      <motion.section
        initial='hidden'
        animate='visible'
        variants={staggerContainer}
        className='pb-24 px-4 sm:px-6'
      >
        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start'>

          {/* ── Mother's Prayer Card ── */}
          <motion.div variants={cardVariant} className='flex flex-col'>
            <div className='text-center mb-6'>
              <p
                className='text-xs uppercase tracking-[0.25em] font-semibold mb-2'
                style={{ color: GOLD }}
              >
                From The Bride's Mother
              </p>
              <h2 className='text-xl sm:text-2xl font-serif text-gray-800'>
                Prayer For The Couple
              </h2>
              <div
                className='h-px w-16 mx-auto mt-3'
                style={{
                  background:
                    'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
                }}
              />
            </div>

            <motion.div
              whileHover={{ y: -4, boxShadow: '0 28px 70px rgba(0,0,0,0.18)' }}
              transition={{ duration: 0.3 }}
              className='rounded-2xl overflow-hidden shadow-2xl'
              style={{ border: `1px solid ${GOLD_BORDER}` }}
            >
              <img
                src='/mothers-prayers.jpeg'
                alt="Prayer from Bride's Mother"
                className='w-full h-auto object-contain block'
                style={{ background: '#fdf6e3' }}
              />
            </motion.div>
          </motion.div>

          {/* ── Father's Prayer Card ── */}
          <motion.div variants={cardVariant} className='flex flex-col'>
            <div className='text-center mb-6'>
              <p
                className='text-xs uppercase tracking-[0.25em] font-semibold mb-2'
                style={{ color: GOLD }}
              >
                From The Bride's Father
              </p>
              <h2 className='text-xl sm:text-2xl font-serif text-gray-800'>
                Prayer For The Couple
              </h2>
              <div
                className='h-px w-16 mx-auto mt-3'
                style={{
                  background:
                    'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
                }}
              />
            </div>

            {/* Vintage postcard wrapper — airmail stripe border */}
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }}
              transition={{ duration: 0.3 }}
              style={{
                background:
                  'repeating-linear-gradient(45deg, #c41e3a 0, #c41e3a 6px, #ffffff 6px, #ffffff 12px, #1a6b2e 12px, #1a6b2e 18px)',
                padding: '12px',
                borderRadius: '16px',
                boxShadow:
                  '0 20px 60px rgba(0,0,0,0.14), 0 8px 20px rgba(0,0,0,0.07)',
              }}
            >
              {/* Inner parchment card */}
              <div
                style={{
                  background: '#fdf6e3',
                  borderRadius: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Inner dashed border overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '16px',
                    border: '1px dashed rgba(180,140,60,0.32)',
                    borderRadius: '4px',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                />

                <div
                  style={{
                    padding: '36px 28px 32px',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {/* Top row: postmark stamp + floral corner */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '20px',
                    }}
                  >
                    {/* Circular postmark stamp */}
                    <div
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        border: '2px solid #8B6914',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        flexShrink: 0,
                      }}
                    >
                      {/* Stamp lines */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '-6px',
                          right: '-6px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '3px',
                        }}
                      >
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            style={{
                              height: '1.5px',
                              background: 'rgba(139,105,20,0.5)',
                            }}
                          />
                        ))}
                      </div>
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: '6.5px',
                          color: '#8B6914',
                          fontFamily: 'Georgia, serif',
                          lineHeight: 1.35,
                          fontWeight: 'bold',
                          letterSpacing: '0.05em',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        <div>WITH LOVE</div>
                        <div style={{ fontSize: '14px', lineHeight: 1.1 }}>♡</div>
                        <div>FOREVER</div>
                        <div>& ALWAYS</div>
                      </div>
                    </div>

                    {/* Top-right floral decoration */}
                    <div style={{ lineHeight: 1, textAlign: 'right' }}>
                      <div style={{ fontSize: '52px', lineHeight: 1 }}>🌹</div>
                      <div
                        style={{
                          fontSize: '26px',
                          lineHeight: 1,
                          marginTop: '-6px',
                          marginRight: '-4px',
                        }}
                      >
                        🌸
                      </div>
                    </div>
                  </div>

                  {/* Names heading */}
                  <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                    <div
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontWeight: 'bold',
                        color: '#8B1A1A',
                        fontSize: 'clamp(1.4rem, 4vw, 1.85rem)',
                        lineHeight: 1.1,
                        marginBottom: '3px',
                      }}
                    >
                      PAULA
                    </div>
                    <div
                      style={{
                        fontFamily: 'Georgia, serif',
                        color: '#8B1A1A',
                        fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                        marginBottom: '10px',
                      }}
                    >
                      My Daughter | My Joy | My Gift
                    </div>

                    {/* Decorative & divider */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        margin: '8px 0',
                      }}
                    >
                      <div
                        style={{
                          height: '1px',
                          width: '50px',
                          background:
                            'linear-gradient(90deg, transparent, #8B6914)',
                        }}
                      />
                      <span
                        style={{
                          color: '#8B6914',
                          fontFamily: 'Georgia, serif',
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                        }}
                      >
                        ✦ & ✦
                      </span>
                      <div
                        style={{
                          height: '1px',
                          width: '50px',
                          background:
                            'linear-gradient(90deg, #8B6914, transparent)',
                        }}
                      />
                    </div>

                    <div
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontWeight: 'bold',
                        color: '#1a3d2b',
                        fontSize: 'clamp(1.4rem, 4vw, 1.85rem)',
                        lineHeight: 1.1,
                        marginBottom: '3px',
                      }}
                    >
                      EBUKA
                    </div>
                    <div
                      style={{
                        fontFamily: 'Georgia, serif',
                        color: '#1a3d2b',
                        fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                      }}
                    >
                      My Son-in-Love
                    </div>
                  </div>

                  {/* Gold divider with heart */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      margin: '14px 0',
                    }}
                  >
                    <div
                      style={{
                        height: '1px',
                        width: '60px',
                        background:
                          'linear-gradient(90deg, transparent, #8B6914)',
                      }}
                    />
                    <span style={{ color: '#8B6914', fontSize: '12px' }}>♡</span>
                    <div
                      style={{
                        height: '1px',
                        width: '60px',
                        background:
                          'linear-gradient(90deg, #8B6914, transparent)',
                      }}
                    />
                  </div>

                  {/* Opening greeting — italic cursive style */}
                  <p
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontStyle: 'italic',
                      fontSize: 'clamp(0.8rem, 2.2vw, 0.9rem)',
                      color: '#5a3a1a',
                      marginBottom: '14px',
                      textAlign: 'center',
                      lineHeight: 1.65,
                    }}
                  >
                    My dearest <strong>PAULA</strong>, and my dear son-in-love,{' '}
                    <strong>EBUKA</strong>, ❤
                  </p>

                  {/* Prayer body */}
                  <div
                    style={{
                      color: '#3d2a1a',
                      fontSize: 'clamp(0.78rem, 2vw, 0.875rem)',
                      lineHeight: 1.85,
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    <p style={{ marginBottom: '12px' }}>
                      Today, my heart is filled with profound gratitude, joy, and
                      pride as I reflect on the remarkable journey that has brought
                      you to this beautiful and significant moment in your life.
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                      It seems like only yesterday that I held your tiny hand on
                      that unforgettable Friday afternoon when you came into our
                      lives and filled our hearts with immeasurable happiness. I
                      have watched you grow into an intelligent, compassionate,
                      graceful, and beautiful woman. Seeing the person you have
                      become is one of the greatest blessings and proudest
                      achievements of my life.
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                      <strong style={{ color: '#8B1A1A' }}>Paula</strong>, as you
                      embark on this sacred journey of marriage with{' '}
                      <strong style={{ color: '#1a3d2b' }}>Ebuka</strong>, always
                      remember that marriage is far more than a union of two
                      people—it is a lifelong partnership built on love, trust,
                      friendship, sacrifice, and unwavering commitment. Cherish
                      one another deeply, communicate with honesty and kindness,
                      and make God the firm foundation upon which your home is
                      built.
                    </p>
                    <p style={{ marginBottom: '16px' }}>
                      My prayer is that your marriage will be blessed with
                      enduring happiness, excellent health, divine favor,
                      prosperity, wisdom, and an ever deepening friendship.
                    </p>
                  </div>

                  {/* Closing signature */}
                  <div style={{ textAlign: 'center', marginTop: '4px' }}>
                    <p
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                        color: '#8B1A1A',
                        marginBottom: '2px',
                      }}
                    >
                      I love you endlessly.
                    </p>
                    <p
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                        color: '#8B1A1A',
                      }}
                    >
                      With all my love, Dad. ❤
                    </p>
                  </div>

                  {/* Bottom-right floral decoration */}
                  <div
                    style={{
                      textAlign: 'right',
                      marginTop: '14px',
                      lineHeight: 1,
                    }}
                  >
                    <div
                      style={{
                        fontSize: '26px',
                        lineHeight: 1,
                        marginBottom: '-8px',
                      }}
                    >
                      🌸
                    </div>
                    <div style={{ fontSize: '52px', lineHeight: 1 }}>🌹</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.section>

      {/* ─── Scripture Quote ─── */}
      <motion.section
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeInUp}
        className='pb-20 px-4 sm:px-6 text-center'
      >
        <div
          className='max-w-lg mx-auto py-8 px-6 rounded-2xl'
          style={{
            background:
              'rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.06)',
            border: `1px solid ${GOLD_BORDER}`,
          }}
        >
          <p
            className='text-2xl mb-3'
            style={{ color: GOLD, opacity: 0.5 }}
          >
            ❝
          </p>
          <p
            className='font-serif italic text-sm sm:text-base text-gray-600 leading-relaxed'
          >
            "My grace is sufficient for you, for my power is made perfect in weakness."
          </p>
          <p
            className='text-xs mt-3 font-semibold uppercase tracking-widest'
            style={{ color: GOLD }}
          >
            — 2 Corinthians 12:9
          </p>
        </div>
      </motion.section>

      <WeddingFooter />
    </div>
  );
}
