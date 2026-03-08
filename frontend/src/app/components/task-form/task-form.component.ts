import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  title = '';
  description = '';
  priority: 'low' | 'medium' | 'high' = 'medium';
  isSubmitting = false;
  successMessage = '';

  @Output() taskCreated = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    if (!this.title.trim()) return;

    this.isSubmitting = true;
    this.taskService
      .createTask({
        title: this.title.trim(),
        description: this.description.trim(),
        priority: this.priority,
      })
      .subscribe({
        next: (task) => {
          this.taskCreated.emit(task);
          this.successMessage = `"${task.title}" created!`;
          this.resetForm();
          this.isSubmitting = false;
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (err) => {
          console.error('Failed to create task', err);
          this.isSubmitting = false;
        },
      });
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
    this.priority = 'medium';
  }
}
