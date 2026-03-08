export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  high_priority: number;
  medium_priority: number;
  low_priority: number;
}
