import { Heart, Download, UtensilsCrossed, GlassWater, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useTheme } from '../context/ThemeContext';
import { SharedNav } from '../components/SharedNav';

const GOLD = 'var(--theme-primary)';
const GOLD_BORDER = 'rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.22)';
const GOLD_LIGHT = 'rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.08)';

const menuSections = [
  {
    id: 'starters',
    title: 'Starters & Bites',
    subtitle: 'A symphony of flavours to begin your celebration',
    icon: UtensilsCrossed,
    items: [
      {
        name: 'Tenderloin Bites',
        description:
          'Tender, juicy beef morsels seasoned with aromatic spices, seared to golden perfection. Served with a house herb dipping sauce.',
        tag: 'Signature',
      },
      {
        name: 'Honey Garlic Chicken Bites',
        description:
          'Crispy chicken pieces glazed in a sweet honey garlic reduction, finished with a sprinkle of toasted sesame.',
        tag: 'Fan Favourite',
      },
      {
        name: 'Bang Bang Shrimp',
        description:
          'Lightly breaded shrimp tossed in a creamy, mildly spiced bang bang sauce. A coastal classic reimagined.',
        tag: 'Spicy',
      },
      {
        name: 'Veggie Cups',
        description:
          'Garden-fresh seasonal vegetables artfully arranged in elegant cups with a zesty roasted red pepper hummus.',
        tag: 'Vegetarian',
      },
      {
        name: 'Mini Chicken & Waffles',
        description:
          "Bite-sized Southern comfort — golden waffle squares topped with crispy fried chicken and a drizzle of maple syrup.",
        tag: "Chef's Pick",
      },
    ],
  },
  {
    id: 'cocktails',
    title: 'Cocktails & Beverages',
    subtitle: 'Raise a glass to love, laughter, and forever',
    icon: GlassWater,
    items: [
      {
        name: 'Watermelon Mojito',
        description:
          'A refreshing blend of freshly muddled watermelon, spearmint leaves, fresh lime juice, and a hint of cane sugar. Light, vibrant, and celebratory.',
        tag: 'Non-Alcoholic Avail.',
      },
      {
        name: 'Piña Colada',
        description:
          'A tropical escape in every sip — silky coconut cream, sweet pineapple juice, and smooth rum blended to a velvety finish.',
        tag: 'Tropical Classic',
      },
    ],
  },
];

export function DiningMenu() {
  const { currentColor } = useTheme();

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

    // Single-page header
    addBorder();
    doc.setFont('times', 'italic');
    doc.setFontSize(22);
    doc.setTextColor(pdfGold);
    doc.text('Paula & Cornelius', pageWidth / 2, 22, { align: 'center' });

    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      'Monday, 20th July 2026  -  #PaulaAndCornelius2026',
      pageWidth / 2,
      30,
      { align: 'center' }
    );

    doc.setDrawColor(200, 185, 140);
    doc.line(pageWidth / 2 - 30, 34, pageWidth / 2 + 30, 34);

    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(50, 50, 50);
    doc.text('DINING MENU', pageWidth / 2, 44, { align: 'center' });

    doc.setFont('times', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(140, 120, 80);
    doc.text(
      'A curated culinary experience in celebration of love',
      pageWidth / 2,
      52,
      { align: 'center' }
    );

    doc.setDrawColor(200, 185, 140);
    doc.line(pageWidth / 2 - 30, 57, pageWidth / 2 + 30, 57);

    // ── Section 1: Starters & Bites ──
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(pdfGold);
    doc.text('STARTERS & BITES', pageWidth / 2, 67, { align: 'center' });

    doc.setFont('times', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(130, 120, 100);
    doc.text(
      'A symphony of flavours to begin your celebration',
      pageWidth / 2,
      73,
      { align: 'center' }
    );

    autoTable(doc, {
      startY: 78,
      head: [],
      body: menuSections[0].items.map((i) => [i.name, i.description, i.tag]),
      theme: 'plain',
      styles: {
        font: 'times',
        fontSize: 9.5,
        cellPadding: { top: 4, bottom: 4, left: 3, right: 3 },
        valign: 'top',
        overflow: 'linebreak',
      },
      columnStyles: {
        0: { cellWidth: 42, fontStyle: 'bold', textColor: [50, 50, 50] },
        1: { cellWidth: 'auto', fontStyle: 'italic', textColor: [90, 90, 90] },
        2: { cellWidth: 30, fontStyle: 'bold', textColor: pdfGold, halign: 'center' },
      },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 1) {
          doc.setDrawColor(225, 210, 175);
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width + 30,
            data.cell.y + data.cell.height
          );
        }
      },
    });

    // ── Divider between sections ──
    const section1EndY: number = (doc as any).lastAutoTable.finalY;
    const dividerY = section1EndY + 6;
    doc.setDrawColor(200, 185, 140);
    doc.line(14, dividerY, pageWidth - 14, dividerY);

    // ── Section 2: Cocktails & Beverages ──
    const s2TitleY = dividerY + 9;
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(pdfGold);
    doc.text('COCKTAILS & BEVERAGES', pageWidth / 2, s2TitleY, { align: 'center' });

    doc.setFont('times', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(130, 120, 100);
    doc.text(
      'Raise a glass to love, laughter, and forever',
      pageWidth / 2,
      s2TitleY + 6,
      { align: 'center' }
    );

    autoTable(doc, {
      startY: s2TitleY + 11,
      head: [],
      body: menuSections[1].items.map((i) => [i.name, i.description, i.tag]),
      theme: 'plain',
      styles: {
        font: 'times',
        fontSize: 9.5,
        cellPadding: { top: 4, bottom: 4, left: 3, right: 3 },
        valign: 'top',
        overflow: 'linebreak',
      },
      columnStyles: {
        0: { cellWidth: 42, fontStyle: 'bold', textColor: [50, 50, 50] },
        1: { cellWidth: 'auto', fontStyle: 'italic', textColor: [90, 90, 90] },
        2: { cellWidth: 35, fontStyle: 'bold', textColor: pdfGold, halign: 'center' },
      },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 1) {
          doc.setDrawColor(225, 210, 175);
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width + 35,
            data.cell.y + data.cell.height
          );
        }
      },
    });

    // Footer
    doc.setFont('times', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(160, 140, 100);
    doc.text(
      'Paula & Cornelius - 20th July 2026 - #PaulaAndCornelius2026',
      pageWidth / 2,
      pageHeight - 12,
      { align: 'center' }
    );

    doc.save('Paula_Cornelius_Dining_Menu.pdf');
  };

  return (
    <div className='min-h-screen' style={{ backgroundColor: '#FBF8F3' }}>
      <SharedNav />

      {/* Decorative floating elements */}
      <motion.div
        className='fixed top-32 left-6 pointer-events-none'
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        style={{ color: GOLD, opacity: 0.12 }}
      >
        <Heart className='w-12 h-12' fill='currentColor' />
      </motion.div>
      <motion.div
        className='fixed bottom-24 right-6 pointer-events-none'
        animate={{ rotate: -360, scale: [1, 1.15, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ color: GOLD, opacity: 0.1 }}
      >
        <UtensilsCrossed className='w-16 h-16' />
      </motion.div>

      <main className='pt-28 pb-20 px-4 sm:px-6'>
        <div className='max-w-3xl mx-auto'>

          {/* ── Page Header ── */}
          <motion.div
            className='text-center mb-12'
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className='w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'
              style={{ background: GOLD_LIGHT, border: `2px solid ${GOLD_BORDER}` }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <UtensilsCrossed className='w-9 h-9' style={{ color: GOLD }} />
            </motion.div>

            <motion.p
              className='text-xs uppercase tracking-[0.3em] mb-3 font-medium'
              style={{ color: GOLD }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              ✦ Dining Experience ✦
            </motion.p>

            <motion.h1
              className='font-serif text-4xl md:text-5xl text-gray-800 mb-4'
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              The Wedding Menu
            </motion.h1>

            <div className='flex items-center justify-center gap-2 mb-4'>
              <Sparkles className='w-4 h-4' style={{ color: GOLD }} />
              <span className='text-sm font-medium' style={{ color: GOLD }}>
                Paula &amp; Cornelius 2026
              </span>
              <Sparkles className='w-4 h-4' style={{ color: GOLD }} />
            </div>

            <div
              className='h-px w-24 mx-auto my-5'
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
              }}
            />

            <motion.p
              className='text-gray-600 max-w-xl mx-auto leading-relaxed text-sm sm:text-base'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              A curated culinary experience crafted with love for our special
              day. Savour each bite as we celebrate this beautiful journey
              together.
            </motion.p>

            {/* Download button */}
            <motion.button
              onClick={handleDownloadPDF}
              className='mt-8 inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
              style={{ backgroundColor: GOLD }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download className='w-4 h-4' />
              Download Dining Menu
            </motion.button>
          </motion.div>

          {/* ── Menu Sections ── */}
          {menuSections.map((section, sectionIdx) => {
            const SectionIcon = section.icon;
            const baseDelay = 0.6 + sectionIdx * 0.15;

            return (
              <motion.div
                key={section.id}
                className='mb-12'
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: baseDelay }}
              >
                {/* Section header */}
                <div className='flex items-center gap-4 mb-6'>
                  <div
                    className='w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0'
                    style={{ background: GOLD_LIGHT, border: `1px solid ${GOLD_BORDER}` }}
                  >
                    <SectionIcon className='w-5 h-5' style={{ color: GOLD }} />
                  </div>
                  <div className='flex-1'>
                    <h2 className='font-serif text-2xl sm:text-3xl text-gray-800'>
                      {section.title}
                    </h2>
                    <p className='text-xs text-gray-500 italic mt-0.5'>
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className='h-px mb-6'
                  style={{
                    background:
                      'linear-gradient(90deg, var(--theme-primary), rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.15), transparent)',
                  }}
                />

                {/* Menu items */}
                <div className='space-y-3'>
                  {section.items.map((item, itemIdx) => (
                    <motion.div
                      key={item.name}
                      className='bg-white/90 rounded-2xl overflow-hidden'
                      style={{
                        border: `1px solid ${GOLD_BORDER}`,
                        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                      }}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: baseDelay + 0.1 + itemIdx * 0.08,
                      }}
                      whileHover={{
                        y: -3,
                        boxShadow: '0 8px 28px rgba(0,0,0,0.08)',
                        transition: { duration: 0.22 },
                      }}
                    >
                      {/* Gold top bar */}
                      <div
                        className='h-0.5 w-full'
                        style={{
                          background:
                            'linear-gradient(90deg, var(--theme-primary), rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.3), transparent)',
                        }}
                      />
                      <div className='p-5 sm:p-6 flex items-start gap-4'>
                        {/* Bullet */}
                        <span
                          className='mt-1 flex-shrink-0 text-sm'
                          style={{ color: GOLD }}
                        >
                          ✦
                        </span>
                        {/* Text */}
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-start justify-between gap-3 flex-wrap'>
                            <h3 className='font-serif text-lg text-gray-900'>
                              {item.name}
                            </h3>
                            <span
                              className='text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0'
                              style={{
                                backgroundColor: GOLD_LIGHT,
                                color: GOLD,
                                border: `1px solid ${GOLD_BORDER}`,
                              }}
                            >
                              {item.tag}
                            </span>
                          </div>
                          <p className='text-sm text-gray-500 leading-relaxed mt-1'>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* ── Footer verse ── */}
          <motion.div
            className='text-center mt-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <div
              className='inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-md relative overflow-hidden'
              style={{ border: `1px solid ${GOLD_BORDER}` }}
            >
              <div
                className='absolute top-0 left-0 w-full h-0.5'
                style={{
                  background:
                    'linear-gradient(90deg, transparent, var(--theme-primary), transparent)',
                }}
              />
              <Heart
                className='w-5 h-5 mx-auto mb-3'
                style={{ color: GOLD }}
                fill='currentColor'
              />
              <p className='text-sm text-gray-600 italic leading-relaxed'>
                "Let all that you do be done in love."
                <br />
                <span
                  className='not-italic font-semibold mt-2 inline-block'
                  style={{ color: GOLD }}
                >
                  — 1 Corinthians 16:14
                </span>
              </p>
            </div>
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
