export interface UserDetails {
    id: string;
    displayName: string;
    officeLocation: string;
    mail: string;
  }
  
  export interface UserContextType {
    userDetails: UserDetails | null;
    photoUrl: string | null;
  }
  