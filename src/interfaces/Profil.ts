export interface OpeningHours {
  [day: string]: string
}

export interface CompanyInfo {
  companyName: string;
  description: string;
  products?: string[];
  address: string;
  email?: string;
  phone?: string;
  website?: string;
  openingHours?: OpeningHours;
}
