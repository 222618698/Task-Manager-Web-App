import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { TaskStats } from '../../models/task.model';

@Component({
  selector: 'app-task-stats',
  templateUrl: './task-stats.component.html',
  styleUrls: ['./task-stats.component.css'],
})
export class TaskStatsComponent implements OnInit, OnDestroy {
  stats: TaskStats = {
    total: 0,
    completed: 0,
    pending: 0,
    high_priority: 0,
    medium_priority: 0,
    low_priority: 0,
  };

  private sub!: Subscription;
  private interval: any;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadStats();
    this.interval = setInterval(() => this.loadStats(), 3000);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.interval) clearInterval(this.interval);
  }

  loadStats(): void {
    this.sub = this.taskService.getStats().subscribe({
      next: (data) => (this.stats = data),
      error: (err) => console.error('Failed to load stats', err),
    });
  }

  get completionRate(): number {
    if (this.stats.total === 0) return 0;
    return Math.round((this.stats.completed / this.stats.total) * 100);
  }
}
