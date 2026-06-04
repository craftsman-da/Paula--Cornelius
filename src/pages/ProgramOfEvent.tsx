import { Clock, MapPin, Download, Heart } from 'lucide-react';
import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useTheme } from '../context/ThemeContext.tsx';
import { programData } from '../data/programData';
import { SharedNav } from '../components/SharedNav';
import { WeddingFooter } from '../components/WeddingFooter';

const GOLD = 'var(--theme-primary)';
const GOLD_BORDER = 'rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.22)';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const timelineItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function ProgramOfEvent() {
  const { currentColor } = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const tabNames = Object.keys(programData) as Array<keyof typeof programData>;
  const currentTabData = programData[tabNames[activeTab]];
  const currentEvents = currentTabData.events;
  const currentVenue = currentTabData.venue;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const pdfGold = currentColor.value;

    const addBorder = () => {
      doc.setDrawColor(pdfGold);
      doc.setLineWidth(0.5);
      doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
      doc.setLineWidth(0.2);
      doc.rect(7, 7, pageWidth - 14, pageHeight - 14);
    };

    const addHeader = (title: string, venue: string) => {
      addBorder();

      doc.setFont('times', 'italic');
      doc.setFontSize(24);
      doc.setTextColor(pdfGold);
      doc.text('Paula & Cornelius', pageWidth / 2, 25, { align: 'center' });

      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      doc.text('Monday, 20th July 2026', pageWidth / 2, 33, {
        align: 'center',
      });

      doc.setFont('times', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(150, 130, 80);
      doc.text('#PaulaAndCornelius2026', pageWidth / 2, 39, {
        align: 'center',
      });

      doc.setDrawColor(200, 185, 140);
      doc.line(pageWidth / 2 - 20, 43, pageWidth / 2 + 20, 43);

      doc.setFont('times', 'bold');
      doc.setFontSize(17);
      doc.setTextColor(60, 60, 60);
      doc.text(title.toUpperCase(), pageWidth / 2, 54, { align: 'center' });

      doc.setFont('times', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text(venue, pageWidth / 2, 62, { align: 'center', maxWidth: 160 });
    };

    // Page 1: Holy Mass
    const massData = programData['The Holy Mass'];
    addHeader('The Holy Mass', massData.venue);

    autoTable(doc, {
      startY: 72,
      head: [],
      body: massData.events.map((e) => [e.time, e.title, e.description]),
      theme: 'plain',
      styles: {
        font: 'times',
        fontSize: 10,
        cellPadding: 4,
        valign: 'top',
        overflow: 'linebreak',
      },
      columnStyles: {
        0: { cellWidth: 28, fontStyle: 'bold', textColor: pdfGold },
        1: { cellWidth: 48, fontStyle: 'bold', textColor: [60, 60, 60] },
        2: {
          cellWidth: 'auto',
          fontStyle: 'italic',
          textColor: [100, 100, 100],
        },
      },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 2) {
          doc.setDrawColor(235, 220, 185);
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
        }
      },
    });

    // Page 2: Reception
    doc.addPage();
    const receptionData = programData['The Grand Reception'];
    addHeader('The Grand Reception', receptionData.venue);

    autoTable(doc, {
      startY: 72,
      head: [],
      body: receptionData.events.map((e) => [e.time, e.title, e.description]),
      theme: 'plain',
      styles: {
        font: 'times',
        fontSize: 10,
        cellPadding: 4,
        valign: 'top',
        overflow: 'linebreak',
      },
      columnStyles: {
        0: { cellWidth: 28, fontStyle: 'bold', textColor: pdfGold },
        1: { cellWidth: 48, fontStyle: 'bold', textColor: [60, 60, 60] },
        2: {
          cellWidth: 'auto',
          fontStyle: 'italic',
          textColor: [100, 100, 100],
        },
      },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 2) {
          doc.setDrawColor(235, 220, 185);
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          );
        }
      },
    });

    doc.save('Paula_Cornelius_Wedding_Program.pdf');
  };

  return (
    <div className='min-h-screen' style={{ backgroundColor: '#FBF8F3' }}>
      <SharedNav />

      {/* Hero Section */}
      <section
        className='pt-28 pb-16 px-6'
        style={{
          background:
            'linear-gradient(to bottom, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.1), rgba(251,248,243,1))',
        }}
      >
        <motion.div
          initial='hidden'
          animate='visible'
          variants={staggerContainer}
          className='max-w-4xl mx-auto text-center'
        >
          <motion.p
            variants={fadeInUp}
            className='text-xs uppercase tracking-[0.3em] mb-3 font-semibold'
            style={{ color: GOLD }}
          >
            ✦ The Schedule ✦
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className='text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-4'
          >
            Program of Event
          </motion.h1>
          <motion.p variants={fadeInUp} className='text-base text-gray-600 mb-8'>
            Explore the detailed schedule for both the Holy Mass and Grand
            Reception
          </motion.p>
          <motion.div
            variants={scaleIn}
            className='inline-block px-8 py-4 rounded-2xl mb-8'
            style={{
              background: 'rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.1)',
              border: `1px solid ${GOLD_BORDER}`,
            }}
          >
            <p className='text-gray-800 font-medium text-sm'>
              Monday, 20th July 2026 · Saint Barnabas Catholic Church &amp; Styld
              Spaces Events Studio · Scarborough, ON
            </p>
          </motion.div>

          {/* Officiating Priests */}
          <motion.div
            variants={fadeInUp}
            className='mt-8 mb-6 inline-block bg-white rounded-2xl px-8 py-6 shadow-sm text-left relative overflow-hidden'
            style={{ border: `1px solid ${GOLD_BORDER}` }}
          >
            <div
              className='absolute top-0 left-0 w-full h-0.5'
              style={{
                background: 'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
              }}
            />
            <p className='font-medium text-gray-800 text-sm sm:text-base mb-3 flex items-center gap-2'>
              <Heart className='w-4 h-4 flex-shrink-0' style={{ color: GOLD }} fill='currentColor' />
              Officiating Priests
            </p>
            <ul className='space-y-1.5'>
              {['Fr. Hansoo Park', 'Fr. Jeremy Zou', 'Fr. Charles Okoro', 'Fr. Ernest Okoro'].map((priest) => (
                <li key={priest} className='flex items-center gap-2 text-sm text-gray-600'>
                  <span className='text-xs' style={{ color: GOLD }}>✦</span>
                  {priest}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className='flex flex-col sm:flex-row gap-4 justify-center'
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPDF}
              className='inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium shadow-lg transition-all'
              style={{ backgroundColor: GOLD }}
            >
              <Download className='w-5 h-5' />
              Download Program Summary
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline Section with Tabs */}
      <section className='py-16 px-6'>
        <div className='max-w-4xl mx-auto'>
          {/* Tab Buttons */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={staggerContainer}
            className='flex flex-col sm:flex-row gap-4 mb-12 justify-center'
          >
            {tabNames.map((tabName, index) => (
              <motion.button
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(index)}
                className='px-6 py-3 rounded-full font-medium transition-all duration-300'
                style={{
                  backgroundColor:
                    activeTab === index ? GOLD : 'white',
                  color: activeTab === index ? 'white' : '#6B7280',
                  border: `1px solid ${activeTab === index ? GOLD : GOLD_BORDER}`,
                  boxShadow:
                    activeTab === index
                      ? '0 8px 25px rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.3)'
                      : '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                {tabName}
              </motion.button>
            ))}
          </motion.div>

          {/* Timeline */}
          <div className='relative'>
            {/* Vertical line */}
            <div
              className='absolute left-4 md:left-1/2 top-0 bottom-0 w-px rounded-full'
              style={{
                background: `linear-gradient(to bottom, var(--theme-primary), rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.25))`,
                transform: 'translateX(-50%)',
              }}
            />

            {/* Timeline Items */}
            <motion.div
              key={activeTab}
              initial='hidden'
              animate='visible'
              variants={staggerContainer}
              className='space-y-10'
            >
              {currentEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-50px', amount: 0.3 }}
                  variants={timelineItem}
                  className={`flex flex-col md:flex-row ${
                    index % 2 === 0 ? '' : 'md:flex-row-reverse'
                  } gap-8 items-center relative`}
                >
                  {/* Mobile Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
                    className='absolute left-4 w-4 h-4 rounded-full border-2 border-white shadow-sm md:hidden transform -translate-x-1/2 z-10'
                    style={{ backgroundColor: GOLD }}
                  />

                  {/* Content Card */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.5, ease: 'easeOut' },
                      },
                    }}
                    className='w-full md:w-[calc(50%-24px)] pl-12 md:px-6'
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0 20px 40px rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.12)',
                      }}
                      transition={{ duration: 0.3 }}
                      className='bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden'
                      style={{ border: `1px solid ${GOLD_BORDER}` }}
                    >
                      {/* Card top accent */}
                      <div
                        className='absolute top-0 left-0 w-full h-0.5'
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.25), transparent)',
                        }}
                      />
                      <div className='flex items-start gap-4'>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 mb-2'>
                            <Clock className='w-4 h-4 text-gray-400' />
                            <p
                              className='font-semibold text-sm'
                              style={{ color: GOLD }}
                            >
                              {event.time}
                            </p>
                          </div>
                          <h3 className='text-lg font-serif text-gray-900 mb-2'>
                            {event.title}
                          </h3>
                          <p className='text-gray-600 text-sm leading-relaxed'>
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Timeline Dot — Desktop */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                    className='hidden md:flex items-center justify-center w-16 h-16 relative z-10 flex-shrink-0'
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.4 }}
                      className='w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center'
                      style={{ backgroundColor: GOLD }}
                    >
                      <div className='w-2 h-2 bg-white rounded-full' />
                    </motion.div>
                  </motion.div>

                  {/* Desktop spacer — fills the empty half opposite the card */}
                  <div className='hidden md:block md:w-[calc(50%-56px)] flex-shrink-0' />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section
        className='py-16 px-6'
        style={{
          background:
            'linear-gradient(135deg, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.1) 0%, rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.05) 100%)',
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
              className='text-xs uppercase tracking-[0.3em] mb-3 font-semibold'
              style={{ color: GOLD }}
            >
              ✦ Good to Know ✦
            </p>
            <h2 className='text-3xl font-serif text-gray-900'>
              Important Information
            </h2>
          </motion.div>

          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className='grid md:grid-cols-3 gap-6'
          >
            {[
              {
                icon: MapPin,
                title: 'Venue',
                description: currentVenue,
              },
              {
                icon: Clock,
                title: 'Arrival Time',
                description: `Please arrive by ${
                  activeTab === 0 ? '11:00 AM' : '2:45 PM'
                } to be comfortably seated.`,
              },
              {
                icon: Heart,
                title: 'Dress Code',
                description:
                  'Formal Attire — Champagne Gold, Black, or Chocolate Brown',
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px rgba(var(--theme-r), var(--theme-g), var(--theme-b),0.15)',
                }}
                transition={{ duration: 0.3 }}
                className='bg-white rounded-2xl p-8 text-center shadow-md relative overflow-hidden'
                style={{ border: `1px solid ${GOLD_BORDER}` }}
              >
                <div
                  className='absolute top-0 left-0 w-full h-0.5'
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <card.icon
                    className='w-8 h-8 mx-auto mb-4'
                    style={{ color: GOLD }}
                  />
                </motion.div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {card.title}
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <WeddingFooter />
    </div>
  );
}
