import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-contactme',
  templateUrl: './contactme.component.html',
  styleUrls: ['./contactme.component.css']
})
export class ContactmeComponent {
  userdata: FormGroup;
  isSubmit = false;
  submitMessage = '';

  constructor(private formBuilder: FormBuilder, private firestore: AngularFirestore) {
    this.userdata = this.formBuilder.group({
      name: ['', [Validators.required, this.nameValidator]],
      lastname: ['', [Validators.required, this.nameValidator]],
      phone: ['', [Validators.pattern('^[0-9]{8}$'), Validators.required]],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;

    // Check if the value contains any numbers, symbols, or emojis
    const regex = /^[A-Za-z]+$/;

    if (!regex.test(value)) {
      return { 'invalidNameFormat': true };
    }

    if (value && value.trim().split(' ').length > 15) {
      return { 'nameLengthExceeded': true };
    }

    return null;
  }

  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && !value.includes('@')) {
      return { 'invalidEmailFormat': true };
    }
    return null;
  }

  submitForm() {
    if (this.userdata.valid) {
      this.isSubmit = true;
      this.submitMessage = 'Submitting...';

      const formData = this.userdata.value;

      this.firestore.collection('contactForms').add(formData)
        .then(() => {
          this.submitMessage = 'Message sent successfully :)';
          this.userdata.reset();
          setTimeout(() => {
            this.isSubmit = false;
          }, 1500);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
          this.submitMessage = 'Error sending the message. Please try again.';
          this.isSubmit = false;
        });
    }
  }
}