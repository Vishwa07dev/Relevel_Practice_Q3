/** 
    ////Model ,
        ////Add status , hospital , symptons of patient in appointment model

    ////Create middleware to validate the hospital , user 

    Controller :
                getAllAppointment : 
                                    Patient - Only his appointments
                                    {
                                        - check if user == patient if yes the show the appointment created by the user 
                                        - Doctor can also call this api 
                                    }
                                    Doctor - Only his patients appointments
                                    {
                                        - if user == doctor then show all the appointment assigned to the Doctor
                                    }
                                    ADMIN - All the appointments
                Change deleteAppointment -> cancel appointment
                {
                    just Change that status to cancled 
                }

    Story 5
        To add prescription :
                            Only Docotor can call this api 
                            Create a modle
                            {
                                patientId,
                                diagnosis,
                                medecine,
                                createdAt,
                                updatedAt
                            }
        
        Controller :
                    Create{
                        after create the status of appointment should be completed
                    }
                    get{
                        user : "will see the peresction given to him"
                        docotor : "will see all the presction assigned"
                        admin : "will get all the presction"
                    }

*/