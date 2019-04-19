import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public grid: any;
  private _isXMove: boolean = true;
  private _moves: any;
  private _currentMove: number = 0;
  private _subscription = new Subscription();

  constructor() { }

  ngOnInit() {
    this.resetBoard();
  }

  public makeMove(i, j): void { 
    if(this._isXMove) {
      this.grid[i][j] = "X";
    } else {
      this.grid[i][j] = "O";
    }

    this._moves.push({ "row": i, "col": j, "player": this.grid[i][j] });
    this._currentMove++;

    if(this.checkWinner(i,j)) {
      let winner = this._isXMove ? "X" : "O";

      alert(`You won player ${winner}`);
    }

    this._isXMove = !this._isXMove;
  }

  public resetBoard(): void {
    this.grid = [];

    for(var i = 0; i < 3; i++){
      this.grid[i] = [];

      for(var j = 0; j < 3; j++){
        this.grid[i][j] = "";
      }
    }

    this._isXMove = true;
  }

  public goForward(): void {
    if(this._currentMove > 0 && this._currentMove < this._moves.length) {
      let obj = this._moves[this._currentMove];
      this.grid[obj.row][obj.col] = obj.player;
      this._currentMove++;
    }
  }

  public goBackards(): void {
    if(this._currentMove > 0) {
      let obj = this._moves[this._currentMove];
      this.grid[obj.row][obj.col] = "";
      this._currentMove--;
    }
  }

  private checkWinner(row, col): boolean { 
    return this.checkHorizontal(col) || this.checkVertical(row) || this.checkDiagonal();
  }

  private checkHorizontal(col): boolean {
    let countX = 0;
    let countO = 0;

    for(let i = 0; i < this.grid.length; i++) {
      countX += this.grid[i][col] == "X" ? 1 : 0;
      countO += this.grid[i][col] == "O" ? 1 : 0;
    }

    return countX == 3 || countO == 3;
  }

  private checkVertical(row): boolean {
    let countX = 0;
    let countO = 0;

    for(let i = 0; i < this.grid.length; i++) {
      countX += this.grid[row][i] == "X" ? 1 : 0;
      countO += this.grid[row][i] == "O" ? 1 : 0;
    }

    return countX == 3 || countO == 3;
  }

  private checkDiagonal(): boolean {
    let countXDiag1 = 0;
    let countODiag1 = 0;

    let countXDiag2 = 0;
    let countODiag2 = 0;

    countXDiag1 += this.grid[0][0] == "X" ? 1 : 0;
    countXDiag1 += this.grid[1][1] == "X" ? 1 : 0;
    countXDiag1 += this.grid[2][2] == "X" ? 1 : 0;

    countODiag1 += this.grid[0][0] == "O" ? 1 : 0;
    countODiag1 += this.grid[1][1] == "O" ? 1 : 0;
    countODiag1 += this.grid[2][2] == "O" ? 1 : 0;

    countXDiag2 += this.grid[0][2] == "X" ? 1 : 0;
    countXDiag2 += this.grid[1][1] == "X" ? 1 : 0;
    countXDiag2 += this.grid[2][0] == "X" ? 1 : 0;

    countODiag2 += this.grid[0][2] == "O" ? 1 : 0;
    countODiag2 += this.grid[1][1] == "O" ? 1 : 0;
    countODiag2 += this.grid[2][0] == "O" ? 1 : 0;

    return countXDiag2 == 3 || countODiag2 == 3 || countXDiag1 == 3 || countODiag1 == 3;
  }

}
