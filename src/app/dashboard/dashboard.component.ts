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
    this.generatedNumber = this.generateNumber(this.generatedNumber);
  }

  public getNumberToDisplay = (): string => {
    const currentNumberAsString = this.generatedNumber.toString();
    const numberOfDigits = currentNumberAsString.length;

    switch (numberOfDigits) {
      case 1:
        return `00` + currentNumberAsString;
      case 2:
        return `0` + currentNumberAsString;
      default:
        return currentNumberAsString;
    }
  }

  public checkHigher = (): void => {
    const oldNumber = this.generatedNumber;
    const newNumber = this.generateNumber(oldNumber);
    this.generatedNumber = newNumber;

    newNumber > oldNumber ? this.streak++ : this.streak = 0;

  }

  public checkLower = (): void => {
    const oldNumber = this.generatedNumber;
    const newNumber = this.generateNumber(oldNumber);
    this.generatedNumber = newNumber;

    newNumber < oldNumber ? this.streak++ : this.streak = 0;
  }

  private generateNumber = (currentNumber: number): number => {
    const number = Math.floor(Math.random() * 1000);
    return number === 1000 || number === currentNumber ? this.generateNumber(currentNumber) : number;
  };
}
