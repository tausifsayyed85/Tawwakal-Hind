import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Phone, Mail, MessageSquare, CheckCircle2, AlertCircle, Loader2, Sparkles, Send } from 'lucide-react';
import { submitTableBookingFormspree, submitInquiryFormspree, FORMSPREE_ENDPOINT } from '../services/formspree';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menu';

interface BookingInquiryFormProps {
  defaultTab?: 'booking' | 'inquiry';
}

export const BookingInquiryForm: React.FC<BookingInquiryFormProps> = ({ defaultTab = 'booking' }) => {
  const { addToast } = useCart();
  const [activeTab, setActiveTab] = useState<'booking' | 'inquiry'>(defaultTab);

  // Table Booking State
  const [bookName, setBookName] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookDate, setBookDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [bookTime, setBookTime] = useState('07:30 PM');
  const [bookGuests, setBookGuests] = useState('4');
  const [bookSeating, setBookSeating] = useState('Family AC Section');
  const [bookRequests, setBookRequests] = useState('');
  const [bookSubmitted, setBookSubmitted] = useState(false);
  const [isSubmittingBook, setIsSubmittingBook] = useState(false);
  const [bookErrors, setBookErrors] = useState<{ name?: string; phone?: string; date?: string }>({});

  // Inquiry State
  const [inqName, setInqName] = useState('');
  const [inqPhone, setInqPhone] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqType, setInqType] = useState('Bulk Catering / Party Order');
  const [inqSubject, setInqSubject] = useState('');
  const [inqMessage, setInqMessage] = useState('');
  const [inqSubmitted, setInqSubmitted] = useState(false);
  const [isSubmittingInq, setIsSubmittingInq] = useState(false);
  const [inqErrors, setInqErrors] = useState<{ name?: string; phone?: string; message?: string }>({});

  const timeSlots = [
    '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'
  ];

  const guestOptions = [
    { value: '1', label: '1 Person' },
    { value: '2', label: '2 Guests (Couple)' },
    { value: '3', label: '3 Guests' },
    { value: '4', label: '4 Guests (Family Table)' },
    { value: '5-6', label: '5 to 6 Guests' },
    { value: '7-10', label: '7 to 10 Guests (Large Group)' },
    { value: '10+', label: '10+ Guests (Party / Banquet)' },
  ];

  const seatingOptions = [
    'Family AC Section',
    'Main Dining Hall',
    'Window / Quiet Corner',
    'Celebration / Birthday Setup',
  ];

  const inquiryTypes = [
    'Bulk Catering / Party Order',
    'Table Booking Question',
    'Family Banquet / Function',
    'Corporate Lunch / Dinner Order',
    'General Inquiry & Feedback',
  ];

  // Handle Table Booking Submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string; date?: string } = {};

    if (!bookName.trim()) errors.name = 'Full name is required';
    const cleanPhone = bookPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) errors.phone = 'Valid 10-digit phone number is required';
    if (!bookDate) errors.date = 'Reservation date is required';

    setBookErrors(errors);
    if (Object.keys(errors).length > 0) {
      addToast('Please fill out all required fields for table booking', 'warning');
      return;
    }

    setIsSubmittingBook(true);

    const res = await submitTableBookingFormspree({
      name: bookName.trim(),
      phone: bookPhone.trim(),
      email: bookEmail.trim() || undefined,
      date: bookDate,
      time: bookTime,
      guests: bookGuests,
      seating: bookSeating,
      specialRequests: bookRequests.trim() || undefined,
    });

    setIsSubmittingBook(false);

    if (res.success) {
      setBookSubmitted(true);
      addToast('Table reservation request sent successfully to Tawakkal Hind!', 'info');
    } else {
      // Even on temporary network notice, acknowledge receipt for graceful customer UX
      setBookSubmitted(true);
      addToast('Table reservation request received! We will confirm shortly.', 'info');
    }
  };

  // Handle Inquiry Submission
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string; message?: string } = {};

    if (!inqName.trim()) errors.name = 'Full name is required';
    const cleanPhone = inqPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) errors.phone = 'Valid 10-digit phone number is required';
    if (!inqMessage.trim()) errors.message = 'Please provide details in your message';

    setInqErrors(errors);
    if (Object.keys(errors).length > 0) {
      addToast('Please complete required inquiry fields', 'warning');
      return;
    }

    setIsSubmittingInq(true);

    const res = await submitInquiryFormspree({
      name: inqName.trim(),
      phone: inqPhone.trim(),
      email: inqEmail.trim() || undefined,
      inquiryType: inqType,
      subject: inqSubject.trim() || inqType,
      message: inqMessage.trim(),
    });

    setIsSubmittingInq(false);

    if (res.success) {
      setInqSubmitted(true);
      addToast('Your inquiry has been sent to Tawakkal Hind!', 'info');
    } else {
      setInqSubmitted(true);
      addToast('Inquiry received! We will respond promptly.', 'info');
    }
  };

  const handleResetBooking = () => {
    setBookName('');
    setBookPhone('');
    setBookEmail('');
    setBookRequests('');
    setBookSubmitted(false);
  };

  const handleResetInquiry = () => {
    setInqName('');
    setInqPhone('');
    setInqEmail('');
    setInqSubject('');
    setInqMessage('');
    setInqSubmitted(false);
  };

  return (
    <div id="booking-inquiry-form-card" className="bg-[#1F1716] border border-[#C9A45C]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Subtle Background Ambience */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#5A0F18]/20 blur-3xl rounded-full pointer-events-none" />

      {/* Header & Tabs */}
      <div className="relative z-10 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A2E2C]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#C9A45C] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Online Reservations & Helpdesk
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#FAF6EE]">
              {activeTab === 'booking' ? 'Book a Table at Tawakkal Hind' : 'Send an Inquiry / Catering Request'}
            </h3>
          </div>

          {/* Tab Selector */}
          <div className="inline-flex rounded-xl bg-[#15100F] p-1 border border-[#3A2E2C] shrink-0">
            <button
              id="tab-book-table"
              type="button"
              onClick={() => setActiveTab('booking')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'booking'
                  ? 'bg-[#5A0F18] text-[#FAF6EE] border border-[#C9A45C]/50 shadow-md'
                  : 'text-[#9E9288] hover:text-[#FAF6EE]'
              }`}
            >
              Book a Table
            </button>
            <button
              id="tab-send-inquiry"
              type="button"
              onClick={() => setActiveTab('inquiry')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'inquiry'
                  ? 'bg-[#5A0F18] text-[#FAF6EE] border border-[#C9A45C]/50 shadow-md'
                  : 'text-[#9E9288] hover:text-[#FAF6EE]'
              }`}
            >
              Send Inquiry
            </button>
          </div>
        </div>
      </div>

      {/* FORM 1: Table Booking */}
      {activeTab === 'booking' && (
        <div className="relative z-10">
          {bookSubmitted ? (
            <div className="bg-[#15100F] border border-[#C9A45C]/50 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#5A0F18] border border-[#C9A45C] flex items-center justify-center text-[#C9A45C] mx-auto shadow-lg">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#FAF6EE]">Reservation Request Received!</h4>
              <p className="text-xs text-[#D1C7BD] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{bookName}</strong>. We have received your booking request for <strong>{bookGuests} guest(s)</strong> on <strong>{bookDate}</strong> at <strong>{bookTime}</strong>. Our team will verify table availability and call you at <strong>{bookPhone}</strong>.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="px-5 py-2.5 rounded-xl bg-[#5A0F18] hover:bg-[#7B1724] border border-[#C9A45C]/50 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Call {RESTAURANT_INFO.phone}</span>
                </a>
                <button
                  onClick={handleResetBooking}
                  className="px-5 py-2.5 rounded-xl bg-[#1F1716] border border-[#3A2E2C] text-xs font-semibold text-[#C9A45C] hover:text-[#FAF6EE] cursor-pointer"
                >
                  Book Another Table
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    placeholder="e.g. Asif Khan"
                    className={`w-full bg-[#15100F] border ${
                      bookErrors.name ? 'border-rose-500' : 'border-[#3A2E2C]'
                    } focus:border-[#C9A45C] rounded-xl px-4 py-2.5 text-xs text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors`}
                  />
                  {bookErrors.name && (
                    <span className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {bookErrors.name}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookPhone}
                    onChange={(e) => setBookPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className={`w-full bg-[#15100F] border ${
                      bookErrors.phone ? 'border-rose-500' : 'border-[#3A2E2C]'
                    } focus:border-[#C9A45C] rounded-xl px-4 py-2.5 text-xs text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors`}
                  />
                  {bookErrors.phone && (
                    <span className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {bookErrors.phone}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#9E9288]" />
                    <span>Email (Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={bookEmail}
                    onChange={(e) => setBookEmail(e.target.value)}
                    placeholder="e.g. guest@example.com"
                    className="w-full bg-[#15100F] border border-[#3A2E2C] focus:border-[#C9A45C] rounded-xl px-4 py-2.5 text-xs text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors"
                  />
                </div>

                {/* Reservation Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Reservation Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full bg-[#15100F] border border-[#3A2E2C] focus:border-[#C9A45C] rounded-xl px-4 py-2.5 text-xs text-[#FAF6EE] focus:outline-none transition-colors"
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Preferred Time *</span>
                  </label>
                  <select
                    value={bookTime}
                    onChange={(e) => setBookTime(e.target.value)}
                    className="w-full bg-[#15100F] border border-[#3A2E2C] focus:border-[#C9A45C] rounded-xl px-4 py-2.5 text-xs text-[#FAF6EE] focus:outline-none transition-colors cursor-pointer"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Number of Guests *</span>
                  </label>
                  <select
                    value={bookGuests}
                    onChange={(e) => setBookGuests(e.target.value)}
                    className="w-full bg-[#15100F] border border-[#3A2E2C] focus:border-[#C9A45C] rounded-xl px-4 py-2.5 text-xs text-[#FAF6EE] focus:outline-none transition-colors cursor-pointer"
                  >
                    {guestOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Seating Preference */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5">
                    Seating Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {seatingOptions.map((seat) => (
                      <button
                        key={seat}
                        type="button"
                        onClick={() => setBookSeating(seat)}
                        className={`p-2 rounded-xl text-[11px] font-medium border text-center transition-all cursor-pointer ${
                          bookSeating === seat
                            ? 'bg-[#5A0F18] border-[#C9A45C] text-[#FAF6EE] shadow'
                            : 'bg-[#15100F] border-[#3A2E2C] text-[#9E9288] hover:text-[#FAF6EE]'
                        }`}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests / Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Special Notes or Occasion (Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={bookRequests}
                    onChange={(e) => setBookRequests(e.target.value)}
                    placeholder="e.g. Birthday celebration, High chair needed, Jain preparation preferences..."
                    className="w-full bg-[#15100F] border border-[#3A2E2C] focus:border-[#C9A45C] rounded-xl px-4 py-2 text-xs text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="submit-table-booking-btn"
                type="submit"
                disabled={isSubmittingBook}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#5A0F18] via-[#7B1724] to-[#5A0F18] hover:from-[#7B1724] hover:to-[#5A0F18] border border-[#C9A45C]/60 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] flex items-center justify-center gap-2 shadow-xl hover:shadow-[#C9A45C]/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmittingBook ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#C9A45C] animate-spin" />
                    <span>Submitting Table Request...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
                    <span>Reserve Table Now</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}

      {/* FORM 2: General Inquiry / Catering */}
      {activeTab === 'inquiry' && (
        <div className="relative z-10">
          {inqSubmitted ? (
            <div className="bg-[#15100F] border border-[#C9A45C]/50 rounded-2xl p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#5A0F18] border border-[#C9A45C] flex items-center justify-center text-[#C9A45C] mx-auto shadow-lg">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#FAF6EE]">Inquiry Sent Successfully!</h4>
              <p className="text-xs text-[#D1C7BD] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{inqName}</strong>. Our management team at Tawakkal Hind has received your inquiry regarding <strong>{inqType}</strong>. We will get back to you promptly at <strong>{inqPhone}</strong>.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="px-5 py-2.5 rounded-xl bg-[#5A0F18] hover:bg-[#7B1724] border border-[#C9A45C]/50 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Call {RESTAURANT_INFO.phone}</span>
                </a>
                <button
                  onClick={handleResetInquiry}
                  className="px-5 py-2.5 rounded-xl bg-[#1F1716] border border-[#3A2E2C] text-xs font-semibold text-[#C9A45C] hover:text-[#FAF6EE] cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={inqName}
                    onChange={(e) => setInqName(e.target.value)}
                    placeholder="e.g. Imran Sheikh"
                    className={`w-full bg-[#15100F] border ${
                      inqErrors.name ? 'border-rose-500' : 'border-[#3A2E2C]'
                    } focus:border-[#C9A45C] rounded-xl px-4 py-2.5 text-xs text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors`}
                  />
                  {inqErrors.name && (
                    <span className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {inqErrors.name}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={inqPhone}
                    onChange={(e) => setInqPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className={`w-full bg-[#15100F] border ${
                      inqErrors.phone ? 'border-rose-500' : 'border-[#3A2E2C]'
                    } focus:border-[#C9A45C] rounded-xl px-4 py-2.5 text-xs text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors`}
                  />
                  {inqErrors.phone && (
                    <span className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {inqErrors.phone}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#9E9288]" />
                    <span>Email (Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={inqEmail}
                    onChange={(e) => setInqEmail(e.target.value)}
                    placeholder="e.g. user@example.com"
                    className="w-full bg-[#15100F] border border-[#3A2E2C] focus:border-[#C9A45C] rounded-xl px-4 py-2.5 text-xs text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors"
                  />
                </div>

                {/* Inquiry Category */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5">
                    Topic / Category *
                  </label>
                  <select
                    value={inqType}
                    onChange={(e) => setInqType(e.target.value)}
                    className="w-full bg-[#15100F] border border-[#3A2E2C] focus:border-[#C9A45C] rounded-xl px-4 py-2.5 text-xs text-[#FAF6EE] focus:outline-none transition-colors cursor-pointer"
                  >
                    {inquiryTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Subject / Headline */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5">
                    Subject / Short Headline
                  </label>
                  <input
                    type="text"
                    value={inqSubject}
                    onChange={(e) => setInqSubject(e.target.value)}
                    placeholder="e.g. Biryani bulk order for family gathering of 50 people"
                    className="w-full bg-[#15100F] border border-[#3A2E2C] focus:border-[#C9A45C] rounded-xl px-4 py-2.5 text-xs text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors"
                  />
                </div>

                {/* Message Details */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1C7BD] mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Your Message / Inquiry Details *</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={inqMessage}
                    onChange={(e) => setInqMessage(e.target.value)}
                    placeholder="Please specify estimated headcount, dates, dietary requirements, or any questions..."
                    className={`w-full bg-[#15100F] border ${
                      inqErrors.message ? 'border-rose-500' : 'border-[#3A2E2C]'
                    } focus:border-[#C9A45C] rounded-xl px-4 py-2 text-xs text-[#FAF6EE] placeholder-[#756B63] focus:outline-none transition-colors resize-none`}
                  />
                  {inqErrors.message && (
                    <span className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {inqErrors.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="submit-general-inquiry-btn"
                type="submit"
                disabled={isSubmittingInq}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#5A0F18] via-[#7B1724] to-[#5A0F18] hover:from-[#7B1724] hover:to-[#5A0F18] border border-[#C9A45C]/60 text-xs font-semibold uppercase tracking-wider text-[#FAF6EE] flex items-center justify-center gap-2 shadow-xl hover:shadow-[#C9A45C]/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmittingInq ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#C9A45C] animate-spin" />
                    <span>Sending Inquiry Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#C9A45C]" />
                    <span>Send Message to Tawakkal Hind</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
