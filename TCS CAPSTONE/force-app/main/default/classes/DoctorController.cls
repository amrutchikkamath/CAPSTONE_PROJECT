public with sharing class DoctorController {
    @AuraEnabled(cacheable=true)
    public static List<Doctor__c> getAvailableDoctors() {
        return [
            SELECT Id, Name, Specialty__c, Availability_Status__c, Phone__c, Email__c 
            FROM Doctor__c
            WHERE Availability_Status__c != null
            ORDER BY Specialty__c
        ];
    }
}
