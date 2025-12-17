import { LightningElement, api, wire } from 'lwc';
import getAppointmentsForPatient from '@salesforce/apex/AppointmentController.getAppointmentsForPatient';
import getRecentAppointments from '@salesforce/apex/AppointmentController.getRecentAppointments';

export default class PatientAppointments extends LightningElement {
    @api recordId; // Provided only when used on a record page
    data = [];
    columns = [
        { label: 'Date/Time', fieldName: 'Appointment_DateTime__c', type: 'date' },
        { label: 'Status', fieldName: 'Status__c' },
        { label: 'Doctor', fieldName: 'DoctorName' },
        { label: 'Patient', fieldName: 'PatientName' },
        { label: 'Clinic', fieldName: 'ClinicName' }
    ];

    @wire(getAppointmentsForPatient, { patientId: '$recordId' })
    wiredPatientAppointments({ error, data }) {
        if (data && this.recordId) {
            this.data = data.map(row => ({
                ...row,
                DoctorName: row.Doctor__r?.Name,
                PatientName: row.Patient__r?.Name,
                ClinicName: row.Clinic__r?.Name
            }));
        }
    }

    @wire(getRecentAppointments)
    wiredRecentAppointments({ error, data }) {
        if (data && !this.recordId) {   // only load if not on a record page
            this.data = data.map(row => ({
                ...row,
                DoctorName: row.Doctor__r?.Name,
                PatientName: row.Patient__r?.Name,
                ClinicName: row.Clinic__r?.Name
            }));
        }
    }
}

