import { UserRole } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const MONGODB_URI = 'mongodb://localhost:27017/?authSource=formhub';

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
  };
}

export interface Residence {
  _id: string;
  nom_residance: string;
  rue: string;
  adresse: string;
  blocs: {
    nom_bloc: string;
    appartements: number[];
  }[];
}

// Remplace l'IP ci-dessous par l'adresse IP locale de ton PC si tu testes sur un vrai téléphone
const API_URL = 'https://reciclage.onrender.com/api';

export class AuthService {
  private static isConnected = false;

  static async signup(data: SignupData): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Erreur lors de la création du compte');
    }
    return await res.json();
  }

  static async login(data: LoginData): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Erreur lors de la connexion');
    }
    return await res.json();
  }

  static async getAllResidences(): Promise<Residence[]> {
    const res = await fetch(`${API_URL}/residences`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Erreur lors de la récupération des résidences');
    }
    return await res.json();
  }

  static async connectDB() {
    // No-op côté mobile
  }
} 