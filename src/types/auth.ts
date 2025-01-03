export interface UserProfile {
    id: string;
    user_id: string;
    name: string;
    role: 'USER' | 'ADMIN' | 'CENTER_USER';
    country: string;
    country_code: string;
    phone: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'USER' | 'ADMIN' | 'CENTER_USER';
    country: string;
    countryCode: string;
    phone: string;
  }
  
  