import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConnectionSettingsComponentModel {
  title: string;
  description: string;
  deleteConnection?: boolean;
}

@Component({
  selector: 'app-connection-settings',
  templateUrl: './connection-settings.component.html',
  styleUrls: ['./connection-settings.component.css'],
})
export class ConnectionSettingsComponent {
  connectionSettingsGroups: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ConnectionSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) data: ConnectionSettingsComponentModel
  ) {
    this.connectionSettingsGroups = this.formBuilder.group({
      title: formBuilder.control(data.title),
      description: formBuilder.control(data.description),
    });
  }

  onClickOk() {
    const returnValue: ConnectionSettingsComponentModel = {
      title: this.connectionSettingsGroups.controls['title'].value,
      description: this.connectionSettingsGroups.controls['description'].value,
    };
    this.dialogRef.close(returnValue);
  }

  onClickCancel() {
    this.dialogRef.close();
  }

  onClickDelete() {
    const returnValue: ConnectionSettingsComponentModel = {
      title: this.connectionSettingsGroups.controls['title'].value,
      description: this.connectionSettingsGroups.controls['description'].value,
      deleteConnection: true,
    };
    this.dialogRef.close(returnValue);
  }
}
