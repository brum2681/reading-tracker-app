export interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export interface ReadingLog {
  logId: number;
  studentId: number;
  bookId: number;
  dateFinished: string;
  rating: string;
}

export interface Book{
  bookId: number;
  title: string;
  author: string;
  published_year: number;
}