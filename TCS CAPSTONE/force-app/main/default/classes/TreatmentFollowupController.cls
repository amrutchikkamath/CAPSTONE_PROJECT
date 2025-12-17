public with sharing class TreatmentFollowupController {
    @AuraEnabled(cacheable=true)
    public static List<Treatment__c> getTodayFollowups() {
        Date today = Date.today();
        Date tomorrow = today.addDays(1);

        return [
            SELECT Id, Diagnosis__c,
                   Appointment__r.Patient__r.Name,
                   Appointment__r.Doctor__r.Name 
            FROM Treatment__c 
            WHERE Followup_Required__c = true
              AND Visit_Date__c >= :today
              AND Visit_Date__c < :tomorrow
            LIMIT 5
        ];
    }
}
