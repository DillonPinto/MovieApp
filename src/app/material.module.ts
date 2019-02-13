import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatMenuModule,
  MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatCardActions,
  MatExpansionModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule,
  MatSelectModule, MatCheckboxModule, MatPaginatorModule

} from '@angular/material';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

// Import all material modules here
@NgModule({
  imports: [MatButtonModule, MatToolbarModule,
    MatMenuModule, MatIconModule, MatTabsModule, MatCardModule,
    MatExpansionModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule,
      MatSelectModule, MatDialogModule, MatCheckboxModule, MatPaginatorModule
    ],
  exports: [MatButtonModule, MatToolbarModule,
    MatMenuModule, MatIconModule,
    MatTabsModule, MatCardModule, MatExpansionModule, MatAutocompleteModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatCheckboxModule,
    MatPaginatorModule]
})

export class MaterialModule { }
