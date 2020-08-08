export interface Character {
  id?: string;
  name: string;
  subtitle: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description: string;
}
