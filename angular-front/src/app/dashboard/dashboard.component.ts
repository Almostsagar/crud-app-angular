import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  emps: any = [];
  x: any;

  dataSource!: MatTableDataSource<Element>;

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000').subscribe((data) => {
      this.emps = data;
      this.createTable();
    });
    this.x = this.selection;
  }

  displayedColumns = [
    'select',
    'first_name',
    'last_name',
    'email',
    'active',
    'age',
  ];

  createTable() {
    const ELEMENT_DATA: Element[] = this.emps;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  selection = new SelectionModel<Element>(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;

    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: Element) =>
          this.selection.select(row)
        );
  }

  openAddDialog() {
    this.dialog.open(DialogContentExampleDialog);
  }
  openDeleteDialog() {
    this.dialog.open(DialogContentDeleteDialog, {
      data: { id: this.selection.selected[0]._id },
    });
  }
  openUpdateDialog(){
    this.dialog.open(DialogContentUpdateDialog, {
      data: 
      { 
        id: this.selection.selected[0]._id,
        first_name: this.selection.selected[0].first_name,
        last_name: this.selection.selected[0].last_name,
        email: this.selection.selected[0].email,
        age: this.selection.selected[0].age,
        active: this.selection.selected[0].active
      },
    });
  }

}

@Component({
  templateUrl: './dashboard.component.addDialog.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DialogContentExampleDialog {}

@Component({
  templateUrl: './dashboard.component.deletedialog.html',
  styleUrls: ['./dashboard.component.css'],
  // providers: [DashboardComponent],
})
export class DialogContentDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}

@Component({
  templateUrl: './dashboard.component.updatedialog.html',
  styleUrls: ['./dashboard.component.css']
})
export class DialogContentUpdateDialog {
  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog
  ) {}
  closeUpdateDialog () {
    this.dialog.closeAll()
  }
}


export interface Element {
  first_name: string;
  last_name: string;
  email: string;
  active: number;
  age: number;
  _id: string;
}

export interface DialogData {
  id: Number;
  first_name: string;
  last_name: string;
  email: string;
  active: number;
  age: number;
}
