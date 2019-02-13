import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {UserList} from '../Models/user-list';
import {DialogData} from '../Models/dialog-data';

@Component({
  selector: 'app-new-list-dialog',
  templateUrl: './new-list-dialog.component.html',
  styleUrls: ['./new-list-dialog.component.css']
})

export class NewListDialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogData>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  onOk(): void {
    if (!this.data.dialogListName) {
      return;
    }
    console.log(this.data.addMovieToNewList);
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

