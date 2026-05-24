import { Heart, Gift, Copy, Check, Sparkles, Mail } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SharedNav } from '../components/SharedNav';

const GOLD = 'var(--theme-primary)';
const GOLD_LIGHT = 'rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.15)';
const GOLD_BORDER = 'rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.25)';

export function GiftRegistry() {
  const { currentColor } = useTheme();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const bankDetails = [
    {
      id: 'zenith',
      type: 'bank',
      bankName: 'Zenith Bank',
      accountNumber: '2087960978',
      accountName: 'Akunne Paula',
    },
    {
      id: 'interac',
      type: 'interac',
      bankName: 'Interac e-Transfer',
      accountNumber: 'akunne.paula@gmail.com',
      accountName: 'Akunne Paula',
    },
  ];

  return (
    <div className='min-h-screen' style={{ backgroundColor: '#FBF8F3' }}>
      {/* Decorative floating elements */}
      <motion.div
        className='fixed top-24 left-8 pointer-events-none'
        animate={{ rotate: 360, scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        style={{ color: GOLD, opacity: 0.2 }}
      >
        <Heart className='w-14 h-14' fill='currentColor' />
      </motion.div>
      <motion.div
        className='fixed bottom-24 right-8 pointer-events-none'
        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ color: GOLD, opacity: 0.15 }}
      >
        <Heart className='w-20 h-20' fill='currentColor' />
      </motion.div>

      <SharedNav />

      <main className='pt-28 pb-20 px-6'>
        <div className='max-w-3xl mx-auto'>
          {/* Header */}
          <motion.div
            className='text-center mb-14'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className='w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'
              style={{ background: GOLD_LIGHT, border: `2px solid ${GOLD_BORDER}` }}
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Gift className='w-10 h-10' style={{ color: GOLD }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p
                className='text-xs uppercase tracking-[0.3em] mb-3 font-medium'
                style={{ color: GOLD }}
              >
                ✦ Wedding Gift Registry ✦
              </p>
              <h1 className='font-serif text-4xl md:text-5xl text-gray-800 mb-4'>
                Send Your Gift
              </h1>
              <div className='flex items-center justify-center gap-2 mb-4'>
                <Sparkles className='w-4 h-4' style={{ color: GOLD }} />
                <span className='text-sm font-medium' style={{ color: GOLD }}>
                  Paula &amp; Cornelius 2026
                </span>
                <Sparkles className='w-4 h-4' style={{ color: GOLD }} />
              </div>
            </motion.div>

            {/* Gold divider */}
            <div
              className='h-px w-24 mx-auto my-5'
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
              }}
            />

            <motion.p
              className='text-gray-600 max-w-xl mx-auto leading-relaxed'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Your presence at our wedding is the greatest gift of all. However,
              if you wish to honour us with a gift, a cash gift would be
              gratefully received to help us begin our beautiful new life
              together.
            </motion.p>
          </motion.div>

          {/* Gift Cards */}
          <div className='grid md:grid-cols-2 gap-6'>
            {bankDetails.map((bank, index) => (
              <motion.div
                key={bank.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.2, type: 'spring' }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group'
                style={{ border: `1px solid ${GOLD_BORDER}` }}
              >
                {/* Top gold accent bar */}
                <motion.div
                  className='absolute top-0 left-0 w-full h-1'
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, var(--theme-primary), rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.5), var(--theme-primary), transparent)',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.7 }}
                />

                {/* Background decoration */}
                <motion.div
                  className='absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10'
                  style={{ backgroundColor: GOLD }}
                  animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity }}
                />

                <h3
                  className='text-xs font-semibold uppercase tracking-wider mb-5 flex items-center gap-2'
                  style={{ color: GOLD }}
                >
                  {bank.type === 'bank' ? (
                    <Heart className='w-4 h-4' fill='currentColor' />
                  ) : (
                    <Mail className='w-4 h-4' />
                  )}
                  {bank.type === 'bank' ? 'Bank Transfer' : 'Interac e-Transfer'}
                </h3>

                <div className='space-y-5 relative z-10'>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <p className='text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider'>
                      {bank.type === 'bank' ? 'Bank Name' : 'Transfer Method'}
                    </p>
                    <p className='font-semibold text-gray-900'>{bank.bankName}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <p className='text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider'>
                      Account Name
                    </p>
                    <p className='font-semibold text-gray-900'>{bank.accountName}</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <p className='text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider'>
                      {bank.type === 'bank' ? 'Account Number' : 'Email Address'}
                    </p>
                    <div className='flex items-center gap-3'>
                      <p
                        className='font-mono font-bold text-gray-900 tracking-wider'
                        style={{
                          fontSize:
                            bank.type === 'interac' ? '0.9rem' : '1.5rem',
                        }}
                      >
                        {bank.accountNumber}
                      </p>
                      <motion.button
                        onClick={() =>
                          handleCopy(bank.accountNumber, bank.id)
                        }
                        className='p-2.5 rounded-full transition-all'
                        style={{
                          backgroundColor:
                            copied === bank.id
                              ? 'rgba(34, 197, 94, 0.1)'
                              : GOLD_LIGHT,
                        }}
                        title='Copy'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <motion.div
                          initial={false}
                          animate={{ rotate: copied === bank.id ? 360 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {copied === bank.id ? (
                            <Check className='w-5 h-5 text-green-500' />
                          ) : (
                            <Copy className='w-5 h-5' style={{ color: GOLD }} />
                          )}
                        </motion.div>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bible Verse */}
          <motion.div
            className='mt-14 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className='inline-block bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-md relative overflow-hidden'
              style={{ border: `1px solid ${GOLD_BORDER}` }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Top gold line */}
              <div
                className='absolute top-0 left-0 w-full h-0.5'
                style={{
                  background:
                    'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
                }}
              />
              <Sparkles className='w-6 h-6 mx-auto mb-4' style={{ color: GOLD }} />
              <p className='text-sm text-gray-600 italic leading-relaxed'>
                "It is more blessed to give than to receive."
                <br />
                <span
                  className='not-italic font-semibold mt-2 inline-block'
                  style={{ color: GOLD }}
                >
                  — Acts 20:35
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className='px-6 py-10 border-t'
        style={{ backgroundColor: '#FBF8F3', borderColor: GOLD_BORDER }}
      >
        <motion.div
          className='max-w-3xl mx-auto text-center'
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <p className='font-serif text-xl text-gray-700 mb-1'>
            Paula <span style={{ color: GOLD }}>✦</span> Cornelius
          </p>
          <p className='text-xs font-semibold mb-1' style={{ color: GOLD }}>
            #PaulaAndCornelius2026
          </p>
          <p className='text-xs text-gray-500 mb-6'>20th July 2026 · Scarborough, ON</p>
          <div className='flex justify-center gap-4'>
            {[
              { label: 'Twitter', icon: '𝕏' },
              { label: 'Instagram', icon: 'IG' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href='#'
                aria-label={social.label}
                className='w-10 h-10 rounded-full flex items-center justify-center text-white'
                style={{ backgroundColor: GOLD }}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className='text-sm'>{social.icon}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
