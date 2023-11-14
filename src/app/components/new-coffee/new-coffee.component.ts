import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoffeesService } from 'src/app/services/coffees.service';


@Component({
  selector: 'app-new-coffee',
  templateUrl: './new-coffee.component.html',
  styleUrls: ['./new-coffee.component.css']
})
export class NewCoffeeComponent {
  registerForm: FormGroup;

  nameInput: FormControl;
  taglineInput: FormControl;
  descriptionInput: FormControl;
  firstRoastedInput: FormControl;
  roasterTipsInput: FormControl;
  strengthLevelInput: FormControl;
  contributedByInput: FormControl;

  constructor(private coffeeService: CoffeesService , private snackBar: MatSnackBar) {

    this.nameInput = new FormControl('', Validators.required);
    this.taglineInput = new FormControl('', Validators.required);
    this.descriptionInput = new FormControl('', Validators.required);
    this.firstRoastedInput = new FormControl('', Validators.required);
    this.roasterTipsInput = new FormControl('', Validators.required);
    this.strengthLevelInput = new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]);
    this.contributedByInput = new FormControl('', Validators.required);

    this.registerForm = new FormGroup({
      name: this.nameInput,
      tagline: this.taglineInput,
      description: this.descriptionInput,
      first_roasted: this.firstRoastedInput,
      roaster_tips: this.roasterTipsInput,
      strength_level: this.strengthLevelInput,
      contributed_by: this.contributedByInput,
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const body = this.registerForm.value;

      this.coffeeService.createCoffee(body).subscribe(
        (response) => {
          console.log('Coffee created:', response);

          this.snackBar.open('Submission successful! Thank you.', 'Close', {
            duration: 20000,
          });

          this.registerForm.reset();
          window.location.reload();
        },
        (error) => {
          console.error('Error creating coffee:', error);
        }
      );
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}