public with sharing class AppointmentController {
    
    // 🔹 For Patient Record Page (shows only this patient's upcoming appointments)
    @AuraEnabled(cacheable=true)
    public static List<Appointment__c> getAppointmentsForPatient(Id patientId) {
        if (patientId == null) {
            return new List<Appointment__c>();
        }
        return [
            SELECT Id, Appointment_DateTime__c, Status__c,
                   Doctor__r.Name, Patient__r.Name, Clinic__r.Name
            FROM Appointment__c
            WHERE Patient__c = :patientId
            AND Appointment_DateTime__c >= :System.today()   
              AND Status__c = 'Scheduled'
            ORDER BY Appointment_DateTime__c ASC
            LIMIT 10
        ];
    }

    // 🔹 For Home/App Page (shows most recent appointments across all patients)
    @AuraEnabled(cacheable=true)
    public static List<Appointment__c> getRecentAppointments() {
        return [
            SELECT Id, Appointment_DateTime__c, Status__c,
                   Doctor__r.Name, Patient__r.Name, Clinic__r.Name
            FROM Appointment__c
            ORDER BY CreatedDate DESC
            LIMIT 10
        ];
    }
}

