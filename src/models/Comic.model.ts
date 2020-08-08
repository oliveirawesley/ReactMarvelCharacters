export interface Comic {
  id?: string;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
