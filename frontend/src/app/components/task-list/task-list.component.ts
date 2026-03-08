import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: 'all' | 'pending' | 'completed' = 'all';
  loading = false;
  private sub!: Subscription;
  private interval: any;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.interval = setInterval(() => this.loadTasks(), 3000);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.interval) clearInterval(this.interval);
  }

  loadTasks(): void {
    this.loading = true;
    this.sub = this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load tasks', err);
        this.loading = false;
      },
    });
  }

  applyFilter(): void {
    if (this.filter === 'all') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter((t) => t.status === this.filter);
    }
  }

  setFilter(filter: 'all' | 'pending' | 'completed'): void {
    this.filter = filter;
    this.applyFilter();
  }

  toggleStatus(task: Task): void {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    this.taskService.updateTask(task.id, { status: newStatus }).subscribe({
      next: (updated) => {
        const idx = this.tasks.findIndex((t) => t.id === updated.id);
        if (idx !== -1) this.tasks[idx] = updated;
        this.applyFilter();
      },
      error: (err) => console.error('Failed to update task', err),
    });
  }

  deleteTask(task: Task): void {
    if (!confirm(`Delete "${task.title}"?`)) return;
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        this.applyFilter();
      },
      error: (err) => console.error('Failed to delete task', err),
    });
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }
}
