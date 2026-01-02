// API Configuration for Django Backend
const API_BASE_URL = '/api';

// Types matching Oracle 10g Database Schema
export interface Taxpayer {
  taxpayer_id: number;
  tin: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  house_no: string;
  street: string;
  city: string;
  zip_code: string;
  zone_id: number;
  registration_date: string;
  status: 'Active' | 'Inactive' | 'Suspended';
}

export interface Officer {
  officer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  rank: 'Junior' | 'Senior';
  branch: string;
  zone_id: number;
  hire_date: string;
  status: 'Active' | 'Inactive';
}

export interface Zone {
  zone_id: number;
  zone_name: string;
  region: string;
  officer_count: number;
}

export interface TaxReturn {
  return_id: number;
  taxpayer_id: number;
  tax_year: number;
  gross_income: number;
  deductions: number;
  taxable_income: number;
  tax_due: number;
  filing_date: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  assigned_officer_id?: number;
  review_date?: string;
  review_notes?: string;
}

export interface Payment {
  payment_id: number;
  taxpayer_id: number;
  return_id?: number;
  amount: number;
  payment_date: string;
  payment_method: 'Bank Transfer' | 'Credit Card' | 'Cash' | 'Cheque';
  reference_no: string;
  status: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
}

export interface SupportTicket {
  ticket_id: number;
  taxpayer_id: number;
  subject: string;
  description: string;
  category: 'General' | 'Technical' | 'Payment' | 'Return' | 'Complaint';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Escalated' | 'Resolved' | 'Closed';
  assigned_officer_id?: number;
  created_date: string;
  updated_date?: string;
  resolution?: string;
}

export interface TicketMessage {
  message_id: number;
  ticket_id: number;
  sender_type: 'Taxpayer' | 'Officer';
  sender_id: number;
  message: string;
  created_date: string;
}

export interface AuditLog {
  log_id: number;
  user_type: 'Taxpayer' | 'Officer';
  user_id: number;
  action: string;
  table_affected: string;
  record_id: number;
  old_value?: string;
  new_value?: string;
  timestamp: string;
  ip_address?: string;
}

// API Helper Functions
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Authentication APIs
export const authAPI = {
  loginTaxpayer: (tin: string, password: string) =>
    fetchAPI<{ user: Taxpayer; token: string }>('/auth/taxpayer/login/', {
      method: 'POST',
      body: JSON.stringify({ tin, password }),
    }),

  loginOfficer: (email: string, password: string) =>
    fetchAPI<{ user: Officer; token: string }>('/auth/officer/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  registerTaxpayer: (data: Omit<Taxpayer, 'taxpayer_id' | 'tin' | 'registration_date' | 'status'> & { password: string }) =>
    fetchAPI<{ user: Taxpayer; tin: string }>('/auth/taxpayer/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    fetchAPI<{ success: boolean }>('/auth/logout/', {
      method: 'POST',
    }),
};

// Taxpayer APIs
export const taxpayerAPI = {
  getProfile: (taxpayerId: number) =>
    fetchAPI<Taxpayer>(`/taxpayers/${taxpayerId}/`),

  updateProfile: (taxpayerId: number, data: Partial<Taxpayer>) =>
    fetchAPI<Taxpayer>(`/taxpayers/${taxpayerId}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  getReturns: (taxpayerId: number) =>
    fetchAPI<TaxReturn[]>(`/taxpayers/${taxpayerId}/returns/`),

  getPayments: (taxpayerId: number) =>
    fetchAPI<Payment[]>(`/taxpayers/${taxpayerId}/payments/`),

  getTickets: (taxpayerId: number) =>
    fetchAPI<SupportTicket[]>(`/taxpayers/${taxpayerId}/tickets/`),
};

// Tax Return APIs
export const returnAPI = {
  create: (data: Omit<TaxReturn, 'return_id' | 'filing_date' | 'status'>) =>
    fetchAPI<TaxReturn>('/returns/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getById: (returnId: number) =>
    fetchAPI<TaxReturn>(`/returns/${returnId}/`),

  update: (returnId: number, data: Partial<TaxReturn>) =>
    fetchAPI<TaxReturn>(`/returns/${returnId}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  submit: (returnId: number) =>
    fetchAPI<TaxReturn>(`/returns/${returnId}/submit/`, {
      method: 'POST',
    }),

  getByOfficer: (officerId: number) =>
    fetchAPI<TaxReturn[]>(`/officers/${officerId}/returns/`),

  approve: (returnId: number, notes: string) =>
    fetchAPI<TaxReturn>(`/returns/${returnId}/approve/`, {
      method: 'POST',
      body: JSON.stringify({ notes }),
    }),

  reject: (returnId: number, notes: string) =>
    fetchAPI<TaxReturn>(`/returns/${returnId}/reject/`, {
      method: 'POST',
      body: JSON.stringify({ notes }),
    }),
};

// Payment APIs
export const paymentAPI = {
  create: (data: Omit<Payment, 'payment_id' | 'payment_date' | 'status' | 'reference_no'>) =>
    fetchAPI<Payment>('/payments/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getById: (paymentId: number) =>
    fetchAPI<Payment>(`/payments/${paymentId}/`),

  getAll: () =>
    fetchAPI<Payment[]>('/payments/'),
};

// Support Ticket APIs
export const ticketAPI = {
  create: (data: Omit<SupportTicket, 'ticket_id' | 'created_date' | 'status'>) =>
    fetchAPI<SupportTicket>('/tickets/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getById: (ticketId: number) =>
    fetchAPI<SupportTicket>(`/tickets/${ticketId}/`),

  update: (ticketId: number, data: Partial<SupportTicket>) =>
    fetchAPI<SupportTicket>(`/tickets/${ticketId}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  getMessages: (ticketId: number) =>
    fetchAPI<TicketMessage[]>(`/tickets/${ticketId}/messages/`),

  addMessage: (ticketId: number, message: string, senderType: 'Taxpayer' | 'Officer', senderId: number) =>
    fetchAPI<TicketMessage>(`/tickets/${ticketId}/messages/`, {
      method: 'POST',
      body: JSON.stringify({ message, sender_type: senderType, sender_id: senderId }),
    }),

  escalate: (ticketId: number, reason: string) =>
    fetchAPI<SupportTicket>(`/tickets/${ticketId}/escalate/`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    }),

  resolve: (ticketId: number, resolution: string) =>
    fetchAPI<SupportTicket>(`/tickets/${ticketId}/resolve/`, {
      method: 'POST',
      body: JSON.stringify({ resolution }),
    }),

  getByOfficer: (officerId: number) =>
    fetchAPI<SupportTicket[]>(`/officers/${officerId}/tickets/`),

  getEscalated: () =>
    fetchAPI<SupportTicket[]>('/tickets/escalated/'),
};

// Officer APIs
export const officerAPI = {
  getProfile: (officerId: number) =>
    fetchAPI<Officer>(`/officers/${officerId}/`),

  getAll: () =>
    fetchAPI<Officer[]>('/officers/'),

  getByZone: (zoneId: number) =>
    fetchAPI<Officer[]>(`/zones/${zoneId}/officers/`),

  getTaxpayers: (officerId: number) =>
    fetchAPI<Taxpayer[]>(`/officers/${officerId}/taxpayers/`),

  assignTaxpayer: (officerId: number, taxpayerId: number) =>
    fetchAPI<{ success: boolean }>(`/officers/${officerId}/assign-taxpayer/`, {
      method: 'POST',
      body: JSON.stringify({ taxpayer_id: taxpayerId }),
    }),
};

// Zone APIs
export const zoneAPI = {
  getAll: () =>
    fetchAPI<Zone[]>('/zones/'),

  getById: (zoneId: number) =>
    fetchAPI<Zone>(`/zones/${zoneId}/`),

  getTaxpayers: (zoneId: number) =>
    fetchAPI<Taxpayer[]>(`/zones/${zoneId}/taxpayers/`),
};

// Analytics APIs (Senior Manager)
export const analyticsAPI = {
  getDashboardStats: () =>
    fetchAPI<{
      total_taxpayers: number;
      total_returns: number;
      total_revenue: number;
      pending_returns: number;
      active_tickets: number;
      officer_count: number;
    }>('/analytics/dashboard/'),

  getRevenueByMonth: (year: number) =>
    fetchAPI<{ month: string; revenue: number }[]>(`/analytics/revenue/${year}/`),

  getReturnsByStatus: () =>
    fetchAPI<{ status: string; count: number }[]>('/analytics/returns-by-status/'),

  getTicketsByCategory: () =>
    fetchAPI<{ category: string; count: number }[]>('/analytics/tickets-by-category/'),

  getZonePerformance: () =>
    fetchAPI<{
      zone_id: number;
      zone_name: string;
      taxpayer_count: number;
      return_count: number;
      revenue: number;
    }[]>('/analytics/zone-performance/'),

  getOfficerPerformance: () =>
    fetchAPI<{
      officer_id: number;
      officer_name: string;
      returns_processed: number;
      tickets_resolved: number;
      avg_processing_time: number;
    }[]>('/analytics/officer-performance/'),
};

// Audit Log APIs
export const auditAPI = {
  getLogs: (filters?: {
    user_type?: string;
    user_id?: number;
    action?: string;
    from_date?: string;
    to_date?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return fetchAPI<AuditLog[]>(`/audit-logs/?${params.toString()}`);
  },
};
