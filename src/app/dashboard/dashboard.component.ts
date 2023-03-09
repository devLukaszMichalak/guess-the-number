import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public generatedNumber: number = -1;
  public streak: number = 0;

  ngOnInit(): void {
    this.generatedNumber = this.generateNumber();
  }

  public checkHigher = (): void => {
    const newNumber = this.generateNumber();
    const oldNumber = this.generatedNumber;
    this.generatedNumber = newNumber;

    newNumber >= oldNumber ? this.streak++ : this.streak = 0;

  }

  public checkLower = (): void => {
    const newNumber = this.generateNumber();
    const oldNumber = this.generatedNumber;
    this.generatedNumber = newNumber;

    newNumber <= oldNumber ? this.streak++ : this.streak = 0;
  }

  private generateNumber = (): number => {
    const number = Math.floor(Math.random() * 1000);
    return number === 1000 ? 999 : number;
  };
}
