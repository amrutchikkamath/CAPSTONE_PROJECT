import { LightningElement, wire } from 'lwc';
import getTodayFollowups from '@salesforce/apex/TreatmentFollowupController.getTodayFollowups';

export default class TodayFollowUps extends LightningElement {
    treatments;

    @wire(getTodayFollowups)
    wiredTreatments({ error, data }) {
        if (data) {
            this.treatments = data;
        } else if (error) {
            console.error(error);
        }
    }
}