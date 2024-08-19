export interface Doctor {
  fullName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  sex: string;
  specialisation: {
    name: string;
    field: string;
  };
  profilePicture: string;
  hospital: {
    name: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
    };
  };
  availability: string[]; // Jours disponibles (par exemple ["Monday", "Wednesday", "Friday"])
  isActive: boolean;
  createdAt: Date;
}
