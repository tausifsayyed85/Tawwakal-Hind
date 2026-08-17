import { OrderDetails } from '../types';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyegnvoe';

export interface FormSubmissionResult {
  success: boolean;
  message?: string;
}

export async function submitToFormspree(data: Record<string, any>): Promise<FormSubmissionResult> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.error || 'Failed to submit form to Formspree',
      };
    }
  } catch (error: any) {
    console.warn('Formspree submission error:', error);
    return {
      success: false,
      message: error?.message || 'Network error occurred while submitting',
    };
  }
}

/**
 * Submits a Takeaway Order to Formspree
 */
export async function submitTakeawayOrderFormspree(order: OrderDetails): Promise<FormSubmissionResult> {
  const itemSummary = order.items
    .map((i) => `${i.item.name} (x${i.quantity}) - ₹${i.item.price * i.quantity}`)
    .join('; ');

  const payload = {
    _form_type: 'TAKEAWAY_ORDER',
    subject: `[Tawakkal Hind Takeaway Order] #${order.orderId} - ${order.customerName}`,
    orderId: order.orderId,
    customerName: order.customerName,
    phoneNumber: order.phoneNumber,
    email: order.email || 'Not provided',
    orderType: order.orderType,
    specialInstructions: order.specialInstructions || 'None',
    totalItems: order.items.reduce((acc, curr) => acc + curr.quantity, 0),
    itemsList: itemSummary,
    subtotal: `₹${order.subtotal}`,
    totalAmount: `₹${order.total}`,
    orderPlacedAt: order.createdAt || new Date().toISOString(),
  };

  return submitToFormspree(payload);
}

/**
 * Submits a Table Reservation / Booking request to Formspree
 */
export async function submitTableBookingFormspree(booking: {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: string | number;
  seating?: string;
  specialRequests?: string;
}): Promise<FormSubmissionResult> {
  const payload = {
    _form_type: 'TABLE_RESERVATION',
    subject: `[Tawakkal Hind Table Booking] ${booking.name} - ${booking.date} at ${booking.time} (${booking.guests} guests)`,
    guestName: booking.name,
    phoneNumber: booking.phone,
    email: booking.email || 'Not provided',
    reservationDate: booking.date,
    reservationTime: booking.time,
    numberOfGuests: booking.guests,
    seatingPreference: booking.seating || 'Standard / Any',
    specialRequests: booking.specialRequests || 'None',
    submittedAt: new Date().toISOString(),
  };

  return submitToFormspree(payload);
}

/**
 * Submits a General Inquiry / Catering / Event request to Formspree
 */
export async function submitInquiryFormspree(inquiry: {
  name: string;
  phone: string;
  email?: string;
  inquiryType: string;
  subject?: string;
  message: string;
}): Promise<FormSubmissionResult> {
  const payload = {
    _form_type: 'GENERAL_INQUIRY',
    subject: `[Tawakkal Hind Inquiry] ${inquiry.inquiryType}: ${inquiry.subject || inquiry.name}`,
    name: inquiry.name,
    phone: inquiry.phone,
    email: inquiry.email || 'Not provided',
    inquiryType: inquiry.inquiryType,
    topic: inquiry.subject || 'General',
    message: inquiry.message,
    submittedAt: new Date().toISOString(),
  };

  return submitToFormspree(payload);
}
