export interface User {
  id: string;
  name: string;
  email: string;
  studentNumber: string;
  faculty: string;
  yearOfStudy: number;
  campus: Campus;
  profileImage?: string;
}

export type Campus = "Potchefstroom" | "Vanderbijlpark" | "Mahikeng";

export interface Bursary {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string;
  description: string;
  link: string;
}

export interface Resource {
  id: string;
  title: string;
  type: "Textbook" | "Equipment" | "Transport" | "Food" | "Other";
  description: string;
  condition?: string;
  location: Campus;
  userId: string;
  userName: string;
  createdAt: string;
  image?: string;
  isOffer: boolean;
}

export interface MentalHealthResource {
  id: string;
  title: string;
  type: "Counselor" | "Psychologist" | "Workshop" | "Support Group" | "Crisis";
  description: string;
  contact: string;
  location: Campus;
  availableDates?: string[];
}

export interface CareerOpportunity {
  id: string;
  title: string;
  company: string;
  type: "Internship" | "Graduate Program" | "Part-time" | "Volunteer";
  description: string;
  deadline: string;
  location: string;
  link: string;
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  type: "Academic" | "Financial" | "Administrative" | "Event";
  description: string;
  isCompleted: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: string;
}
