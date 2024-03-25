import {Component, OnInit} from '@angular/core';
import {TodoServiceService} from "../shared/todo-service.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  tasks: any;

  constructor(private todoService: TodoServiceService) {
  }

  ngOnInit(): void {
    this.tasks = this.todoService.getTasks();
    console.log(this.tasks)
  }
}
