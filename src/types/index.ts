export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
export type Category = 'Bugs' | 'Security' | 'Performance' | 'Code Quality';

export interface Finding {
  id: string;
  title: string;
  severity: Severity;
  category: Category;
  filePath: string;
  lineStart: number;
  lineEnd: number;
  explanation: string;
  impact?: string;
  recommendation?: string;
  confidence?: number;
  status: 'Open' | 'Fixed' | 'Ignored';
}

export interface Project {
  id: string;
  name: string;
  language: string;
  files: ProjectFile[];
  lastReview?: string;
}

export interface ProjectFile {
  path: string;
  content: string;
  language: string;
}

export interface ReviewSession {
  id: string;
  projectId: string;
  date: string;
  findings: Finding[];
  summary: string;
}
