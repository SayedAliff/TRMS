// API Configuration for Django Backend
const API_BASE_URL = '/api';

let jwt_token: string | null = localStorage.getItem('trms_token') || null;

function setToken(token: string) {
  jwt_token = token;
  localStorage.setItem('trms_token', token);
}

function clearToken() {
  jwt_token = null;
  localStorage.removeItem('trms_token');
}

// --- Interfaces (snake_case, match backend) ---

export interface User {
  id: number;
  tin?: string;
  officer_id?: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  user_type: 'taxpayer' | 'officer' | 'manager';
  rank?: string;
  branch?: string;
  zone_id?: number;
  house_no?: string;
  street?: string;
  city?: string;
  zip_code?: string;
  status?: string;
  date_of_birth?: string;
  gender?: string;
  username?: string;
  password?: string;
}

export interface TaxReturn {
  id: number;
  tin: string;
  assessment_year: string;
  total_income: number;
  taxable_amount: number;
  calculated_tax: number;
  tax_category: string;
  declaration: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: number;
  tin: string;
  return_id: number;
  amount: number;
  payment_method: string;
  payment_date: string;
  status: string;
}

export interface SupportTicket {
  id: number;
  tin: string;
  issue_description: string;
  submission_date: string;
  resolution_status: string;
  officer_id?: number;
  taxpayer_name?: string;
}

export interface Zone {
  id: number;
  zone_name: string;
  city: string;
}

export interface Category {
  id: number;
  name: string;
}

// --- API Helper ---

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(jwt_token ? { Authorization: `Bearer ${jwt_token}` } : {}),
    ...(options.headers && !Array.isArray(options.headers) ? options.headers as Record<string, string> : {}),
  };
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw data.detail ? new Error(data.detail) : new Error('API error');
  }
  return data;
}

// --- Auth ---

export const authAPI = {
  login: async (payload: { tin?: string; officer_id?: string; password: string }) => {
    // POST /api/users/auth/login/
    const res = await fetch(`${API_BASE_URL}/users/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Login failed');
    setToken(data.token);
    return data;
  },
  logout: () => {
    clearToken();
  },
  register_taxpayer: (payload: Omit<User, 'id' | 'user_type'> & { password: string }) =>
    fetchAPI<User>('/users/taxpayers/register/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

// --- Users (Taxpayer/Officer/Manager) ---

export const userAPI = {
  get_profile: () => fetchAPI<User>('/users/profile/'),
  update_profile: (payload: Partial<User>) =>
    fetchAPI<User>('/users/profile/', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  change_password: (payload: { old_password: string; new_password: string }) =>
    fetchAPI<{ detail: string }>('/users/change-password/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  get_taxpayers: () => fetchAPI<User[]>('/users/taxpayers/'),
  get_officers: () => fetchAPI<User[]>('/users/officers/'),
  get_managers: () => fetchAPI<User[]>('/users/managers/'),
  get_by_tin: (tin: string) => fetchAPI<User>(`/users/taxpayers/${tin}/`),
  get_by_officer_id: (officer_id: string) => fetchAPI<User>(`/users/officers/${officer_id}/`),
};

// --- Tax Returns ---

export const taxReturnAPI = {
  list: (tin: string) => fetchAPI<TaxReturn[]>(`/taxes/returns/?tin=${tin}`),
  create: (payload: Omit<TaxReturn, 'id' | 'status' | 'created_at' | 'updated_at'>) =>
    fetchAPI<TaxReturn>('/taxes/returns/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  get: (id: number) => fetchAPI<TaxReturn>(`/taxes/returns/${id}/`),
  update: (id: number, payload: Partial<TaxReturn>) =>
    fetchAPI<TaxReturn>(`/taxes/returns/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  delete: (id: number) =>
    fetchAPI<{ detail: string }>(`/taxes/returns/${id}/`, { method: 'DELETE' }),
};

// --- Payments ---

export const paymentAPI = {
  list: (tin: string) => fetchAPI<Payment[]>(`/taxes/payments/?tin=${tin}`),
  create: (payload: Omit<Payment, 'id' | 'payment_date' | 'status'>) =>
    fetchAPI<Payment>('/taxes/payments/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  get: (id: number) => fetchAPI<Payment>(`/taxes/payments/${id}/`),
};

// --- Support Tickets ---

export const supportAPI = {
  list: (tin?: string) =>
    fetchAPI<SupportTicket[]>(tin ? `/support/tickets/?tin=${tin}` : '/support/tickets/'),
  create: (payload: Omit<SupportTicket, 'id' | 'submission_date' | 'resolution_status'>) =>
    fetchAPI<SupportTicket>('/support/tickets/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  get: (id: number) => fetchAPI<SupportTicket>(`/support/tickets/${id}/`),
  update: (id: number, payload: Partial<SupportTicket>) =>
    fetchAPI<SupportTicket>(`/support/tickets/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  delete: (id: number) =>
    fetchAPI<{ detail: string }>(`/support/tickets/${id}/`, { method: 'DELETE' }),
};

// --- Zones & Categories ---

export const zoneAPI = {
  list: () => fetchAPI<Zone[]>('/taxes/zones/'),
  get: (id: number) => fetchAPI<Zone>(`/taxes/zones/${id}/`),
};

export const categoryAPI = {
  list: () => fetchAPI<Category[]>('/taxes/categories/'),
  get: (id: number) => fetchAPI<Category>(`/taxes/categories/${id}/`),
};
