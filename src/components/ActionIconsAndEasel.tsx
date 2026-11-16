import { useState } from 'react';
import { CalendarPlus, Check, Instagram, MapPin } from 'lucide-react';
import { ASSETS, CEREMONIES, type CeremonyItem } from '../constants/assets';

interface ActionIconsAndEaselProps {
  onOpenVenue: (ceremony: CeremonyItem) => void;
}

function FloralActionRing({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="cursor-pointer group relative w-16 h-16 flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D1230]"
    >
      {/* Ornate Maroon Floral Wreath SVG */}
      <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full text-[#5A0B26]" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" strokeOpacity="0.45" />
        <path d="M12 44 C18 52, 26 55, 32 55" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="15" cy="47" r="2.2" fill="currentColor" />
        <circle cx="49" cy="17" r="2.2" fill="currentColor" />
        <circle cx="51" cy="45" r="1.8" fill="currentColor" />
      </svg>
      <div className="relative z-10 text-[#5A0B26] group-hover:text-[#7D1739] transition-colors">
        {children}
      </div>
    </button>
  );
}

export function ActionIconsAndEasel({ onOpenVenue }: ActionIconsAndEaselProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => setToastMessage(null), 3200);
  };

  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ankita & Kaushik Wedding//EN',
      'BEGIN:VEVENT',
      'UID:ankita-kaushik-2026@royalwedding',
      'DTSTAMP:20261116T120000Z',
      'DTSTART:20261201T143000Z',
      'DTEND:20261201T183000Z',
      'SUMMARY:Ankita & Kaushik Wedding (Vivaah)',
      'DESCRIPTION:We cordially invite you to grace the auspicious occasion of the marriage of Ankita & Kaushik.',
      'LOCATION:Sharma Residence, Jaipur, Rajasthan',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ankita-Kaushik-Wedding-2026.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Calendar invite downloaded for Dec 1, 2026');
  };

  const handleInstagramMoments = () => {
    const storyEl = document.getElementById('our-story');
    storyEl?.scrollIntoView({ behavior: 'smooth' });
    showToast('Share your wedding memories with #AnkitaKaushik2026');
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Three Floral-Framed Action Icons */}
      <div className="relative z-20 pt-8 pb-6 flex flex-col items-center">
        <div className="flex items-center justify-center gap-7 sm:gap-10">
          <FloralActionRing label="View Story & Wedding Hashtag" onClick={handleInstagramMoments}>
            <Instagram className="w-7 h-7 stroke-[1.7]" />
          </FloralActionRing>

          <FloralActionRing label="Open Venue Location Map" onClick={() => onOpenVenue(CEREMONIES[4])}>
            <MapPin className="w-7 h-7 stroke-[1.7]" />
          </FloralActionRing>

          <FloralActionRing label="Add Wedding Date to Calendar" onClick={handleDownloadIcs}>
            <CalendarPlus className="w-7 h-7 stroke-[1.7]" />
          </FloralActionRing>
        </div>

        {toastMessage && (
          <div
            role="status"
            className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4D0821] text-[#F9EAD6] text-xs font-medium shadow-md"
          >
            <Check className="w-3.5 h-3.5 text-[#E8C57B]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Twilight Palace Courtyard with Centered Ornate Golden Easel */}
      <div className="relative w-full min-h-[540px] sm:min-h-[650px] flex items-center justify-center py-14 px-4 overflow-hidden">
        {/* Background Courtyard Image */}
        <img
          src={ASSETS.heroMandap}
          alt="Twilight palace courtyard backdrop"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Feathered Top & Bottom Parchment Blends */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F7EBDC] via-[#F7EBDC]/75 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F7EBDC] via-[#F7EBDC]/75 to-transparent"
        />

        {/* Ornate Golden Easel & Parchment Signboard */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-[560px]">
          {/* Top Carved Brass Finial Spire */}
          <div className="w-5 h-7 rounded-t-full bg-gradient-to-b from-[#FCE8A6] via-[#C99137] to-[#8C5B16] shadow-md border border-[#FFF2C6]/60 -mb-1 z-20" />

          {/* Easel Board Outer Ornate Gold Frame */}
          <div className="relative w-full bg-gradient-to-br from-[#D8A54C] via-[#F1CF84] to-[#A67123] p-3 sm:p-4 rounded-[6px] shadow-[0_26px_60px_rgba(35,8,16,0.45)] border border-[#7C4F12]">
            {/* Inner Crimson & Gold Dotted Mat Border */}
            <div className="relative bg-[#F5E7D3] border-2 border-[#7C1D37] px-6 sm:px-12 py-16 sm:py-24 text-center shadow-[inset_0_0_24px_rgba(124,29,55,0.1)]">
              {/* Four Floral Corner Rosettes */}
              {['top-2 left-2', 'top-2 right-2 -scale-x-100', 'bottom-2 left-2 -scale-y-100', 'bottom-2 right-2 scale-[-1]'].map(
                (pos, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 40 40"
                    className={`absolute ${pos} w-8 h-8 sm:w-10 sm:h-10 pointer-events-none`}
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M4 32 Q6 10 32 4" stroke="#6F8647" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="5.5" fill="#E37C98" />
                    <circle cx="21" cy="8" r="3.5" fill="#F4A5B8" />
                    <circle cx="8" cy="21" r="3.5" fill="#F4A5B8" />
                    <circle cx="12" cy="12" r="1.8" fill="#E8BE5E" />
                  </svg>
                ),
              )}

              <p className="font-serif italic text-2xl sm:text-[34px] leading-snug text-[#4E1924]">
                Your Presence Means the World to Us
              </p>
            </div>
          </div>

          {/* Sculpted Golden Easel Legs */}
          <div className="relative w-[78%] h-20 sm:h-28 flex justify-between px-6 sm:px-12 -mt-1 pointer-events-none" aria-hidden="true">
            <div className="w-4 sm:w-5 h-full bg-gradient-to-r from-[#875813] via-[#E5BA67] to-[#916016] -rotate-[9deg] origin-top shadow-lg" />
            <div className="w-3.5 sm:w-4 h-[92%] bg-gradient-to-r from-[#764C10] via-[#C8943E] to-[#764C10] shadow-md" />
            <div className="w-4 sm:w-5 h-full bg-gradient-to-r from-[#875813] via-[#E5BA67] to-[#916016] rotate-[9deg] origin-top shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
