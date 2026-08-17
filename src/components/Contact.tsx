import React from 'react';
import { RESTAURANT_INFO } from '../data/menu';
import { MapPin, Phone, Clock, Navigation, ExternalLink, UtensilsCrossed, CalendarCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { BookingInquiryForm } from './BookingInquiryForm';

export const Contact: React.FC = () => {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Tawakkal Hind Restaurant Gandhi Nagar Gadkari Nagar Bhusawal Maharashtra 425201'
  )}`;

  return (
    <section id="contact-section" className="py-20 bg-[#15100F] text-[#F7F0E3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A0F18] border border-[#C9A45C]/50 text-xs font-semibold uppercase tracking-widest text-[#FAF6EE] mb-3 shadow">
            <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
            Find Us & Book in Bhusawal
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAF6EE]">
            Visit, Reserve or <span className="text-[#C9A45C]">Inquire</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#9E9288] mt-3 font-light">
            Conveniently situated in Gandhi Nagar, Bhusawal. Reserve your dining table, plan catering, or pick up your takeaway.
          </p>
        </div>

        {/* Online Booking & Inquiry Form (Connected to Formspree) */}
        <div className="mb-14">
          <BookingInquiryForm defaultTab="booking" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-[#1F1716] border border-[#C9A45C]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl space-y-6"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#3A2E2C]">
                <div className="w-12 h-12 rounded-2xl bg-[#5A0F18] border border-[#C9A45C]/60 flex items-center justify-center shadow-lg shrink-0">
                  <UtensilsCrossed className="w-6 h-6 text-[#C9A45C]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#FAF6EE]">Tawakkal Hind</h3>
                  <p className="text-xs text-[#C9A45C] font-medium tracking-wide">Restaurant & Takeaway</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#15100F] border border-[#3A2E2C] flex items-center justify-center text-[#C9A45C] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] mb-1">
                    Address
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D1C7BD] leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#15100F] border border-[#3A2E2C] flex items-center justify-center text-[#C9A45C] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] mb-1">
                    Phone Number
                  </h4>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="text-sm font-bold text-[#C9A45C] hover:underline"
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#15100F] border border-[#3A2E2C] flex items-center justify-center text-[#C9A45C] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] mb-1">
                    Opening Hours
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D1C7BD]">
                    Monday – Sunday: <strong className="text-[#FAF6EE]">{RESTAURANT_INFO.openingHours}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#3A2E2C] flex flex-col sm:flex-row gap-3">
              <a
                id="contact-call-now-btn"
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#5A0F18] hover:bg-[#7B1724] border border-[#C9A45C]/60 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Phone className="w-4 h-4 text-[#C9A45C]" />
                <span>Call Now</span>
              </a>

              <a
                id="contact-get-directions-btn"
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#15100F] hover:bg-[#241B1A] border border-[#C9A45C]/40 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Navigation className="w-4 h-4 text-[#C9A45C]" />
                <span>Get Directions</span>
              </a>
            </div>
          </motion.div>

          {/* Interactive Map Frame / Route Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-[#1F1716] border border-[#3A2E2C] rounded-3xl overflow-hidden shadow-2xl relative min-h-[350px] flex flex-col"
          >
            {/* Map Embed or Google Map Preview Frame */}
            <div className="flex-1 relative w-full h-full min-h-[280px] bg-[#15100F]">
              <iframe
                title="Tawakkal Hind Location Map"
                src="https://maps.google.com/maps?q=Tawakkal%20Hind%20Gandhi%20Nagar%20Gadkari%20Nagar%20Bhusawal%20Maharashtra%20425201&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 bg-[#15100F]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#C9A45C]/40 text-xs text-[#FAF6EE] shadow-lg pointer-events-none">
                <span className="font-bold text-[#C9A45C] block">Tawakkal Hind</span>
                <span className="text-[11px] text-[#9E9288]">Gandhi Nagar, Bhusawal</span>
              </div>
            </div>

            <div className="p-4 bg-[#15100F] border-t border-[#3A2E2C] flex items-center justify-between">
              <span className="text-xs text-[#9E9288]">
                Coordinates: Bhusawal Central District • Pin 425201
              </span>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#C9A45C] hover:underline flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
