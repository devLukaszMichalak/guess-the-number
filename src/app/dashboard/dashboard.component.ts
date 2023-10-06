import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public generatedNumber: number = -1;
  public rollingNumber: number = 0;
  public streak: number = 0;

  public areNumbersRolling: boolean = false;
  public shouldShowSadEffect: boolean = false;

  private intervalId?: number;
  private readonly NUMBER_OF_ROLLS: number = 10;

  ngOnInit(): void {
    this.generatedNumber = this.generateNumber(this.generatedNumber);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  public getNumberToDisplay = (number: number): string => {
    const currentNumberAsString = number.toString();
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
    this.rollNumbers((a, b) => a < b, oldNumber, newNumber);
    this.generatedNumber = newNumber;
  }

  public checkLower = (): void => {
    const oldNumber = this.generatedNumber;
    const newNumber = this.generateNumber(oldNumber);
    this.rollNumbers((a, b) => a > b, oldNumber, newNumber);
    this.generatedNumber = newNumber;
  }

  private rollNumbers(compareFunc: (newNumber: number, oldNumber: number) => boolean, newNumber: number, oldNumber: number): void {
    this.shouldShowSadEffect = false;
    let counter: number = 0;
    this.areNumbersRolling = true;
    this.intervalId = setInterval(() => {
      counter++;
      this.rollingNumber = this.generateNumber(this.rollingNumber);
      if (counter === this.NUMBER_OF_ROLLS) {
        this.areNumbersRolling = false;
        clearInterval(this.intervalId);
        if (compareFunc(newNumber, oldNumber)) {
          this.streak++;
        } else {
          this.streak = 0;
          this.shouldShowSadEffect = true;
        }
      }
    }, 100);
  }

  private generateNumber = (currentNumber: number): number => {
    const number = Math.floor(Math.random() * 1000);
    return number === 1000 || number === currentNumber ? this.generateNumber(currentNumber) : number;
  };
}
