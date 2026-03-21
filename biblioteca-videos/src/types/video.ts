export interface Exam {
  id: string;
  title: string;
  year: string;
  url: string;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  source: string;
}

export interface Video {
  id: string;
  title: string;
  subject: string;
  contest: string;
  thumbnailUrl: string;
  videoUrl: string;
  exams?: Exam[];
  comments?: Comment[];
}
