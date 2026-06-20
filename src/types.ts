export interface PracticeArea {
  id: string;
  name: string;
  category: "Constitutional & Appellate" | "Civil & Property" | "Service & Labor" | "Corporate, Tax & GST" | "Arbitration & Family";
  description: string;
  landmarkActs: string[];
}

export interface Founder {
  name: string;
  title: string;
  qualifications: string[];
  bio: string;
  keySpecialties: string[];
  imageUrl: string;
  letter: string;
}

export interface Testimonial {
  id: string;
  clientType: "Corporate" | "Individual" | "Administrative";
  statement: string;
  author: string;
  designation: string;
  venueName: string;
}

export interface LegalInsight {
  id: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  readTime: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  category: string;
  description: string;
  courtVenue?: string;
  status: string;
  timestamp: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  timestamp: Date;
}
