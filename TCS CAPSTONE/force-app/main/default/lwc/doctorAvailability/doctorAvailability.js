import { LightningElement, wire } from 'lwc';
import getAvailableDoctors from '@salesforce/apex/DoctorController.getAvailableDoctors';

export default class DoctorAvailability extends LightningElement {
    doctors = [];
    error;

    @wire(getAvailableDoctors)
    wiredDoctors({ error, data }) {
        if (data) {
            this.doctors = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.doctors = [];
        }
    }
}
