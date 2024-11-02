import {Component, Input} from '@angular/core';
import {Activity} from "../../models/activity/activity.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  @Input({required: true}) activity!: Activity;
}
