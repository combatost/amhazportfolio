import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', [Validators.pattern('^[0-9]+$'), Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
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
