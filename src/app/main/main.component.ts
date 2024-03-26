import {Component, OnInit} from '@angular/core';
import {Task} from "../shared/task";
import {TodoServiceService} from "../shared/todo-service.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  tasks!: Task[];
  deleted = false;
  newTask: string = '';


  constructor(private todoService: TodoServiceService) {  }

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.todoService.getAll().subscribe(
      {
        next: (response) => {
          this.tasks = response;
          console.log(this.tasks);
          return this.tasks;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }

  delete(_id?: string) {
    this.todoService.deleteOne(_id).subscribe(
      {
        next: (response: any) => {
          if (response.status === 204) {
            console.log('Task erfolgreich gelöscht:', _id);
            this.tasks = this.tasks.filter(task => task._id !== _id);
          } else {
            console.error('Unerwarteter Statuscode:', response.status);
          }
        },
        error: (err) => {
          console.error('Fehler beim Löschen des Tasks:', err);
        },
        complete: () => console.log('deleteOne() abgeschlossen')
      });
  }

  addTask() {
    if (!this.newTask.trim()) return;

    const newTask: Task = {
      task: this.newTask,
    };

    this.todoService.addOne(newTask).subscribe({
      next: (task) => {
        console.log('Task hinzugefügt:', task);
        this.tasks.push(task);
        this.newTask = ''; // Eingabefeld zurücksezen
      },
      error: (err) => console.error('Fehler beim Hinzufügen des Tasks:', err),
    });
  }

}

