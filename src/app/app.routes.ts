import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ActivityDetailsAdminComponent } from './activity-details-admin/activity-details-admin.component';
import { ActivityDetailsExpertComponent } from './activity-details-expert/activity-details-expert.component';
import { UserDetailsCustomerComponent } from './user-details-customer/user-details-customer.component';
import { UserDetailsAdminComponent } from './user-details-admin/user-details-admin.component';
import { UserDetailsExpertComponent } from './user-details-expert/user-details-expert.component';
import { AllActivitiesComponent } from './all-activities/all-activities.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AddActivityFormComponent } from './add-activity-form/add-activity-form.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component';
import { WriteReviewFormComponent } from './write-review-form/write-review-form.component';
import { AllActivitiesByNameComponent } from './all-activities-name/all-activities-name.component';
import { AllActivitiesExpertComponent } from './all-activities-expert/all-activities-expert.component';
import { BookingsByCustomerComponent } from './bookings-by-customer/bookings-by-customer.component';
import { BookingsByActivityComponent } from './bookings-by-activity/bookings-by-activity.component';
import { AllActivitiesByLocationComponent } from './all-activities-location/all-activities-location.component';
import { ActivityDetailsCustomerComponent } from './activity-details-cust/activity-details-cust.component';
import { UpdateActivityFormComponent } from './update-activity-form/update-activity-form.component';


export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch:'full'},
    {path:"login", component:LoginComponent},
    {path:"signup",component:SignupComponent},
    {path:"customer/ActivityDetails/:id",component:ActivityDetailsCustomerComponent},
    {path:"admin/ActivityDetails/:id",component:ActivityDetailsAdminComponent},
    {path:"expert/ActivityDetails/:id",component:ActivityDetailsExpertComponent},
    {path:"customer/UserDetails/:id",component:UserDetailsCustomerComponent},
    {path:"admin/UserDetails/:id",component:UserDetailsAdminComponent},
    {path:"expert/UserDetails/:id",component:UserDetailsExpertComponent},
    {path:"allActivities",component:AllActivitiesComponent},
    {path:"reviews/:id", component:ExperiencesComponent},
    {path:"allUsers", component:AllUsersComponent},
    {path:"addForm", component:AddActivityFormComponent},
    {path: 'updateUser/:userId', component: UpdateUserFormComponent},
    {path: 'writeReviewForm/:id', component: WriteReviewFormComponent},
    {path: 'allActivitiesName', component:AllActivitiesByNameComponent},
    { path: 'allActivitiesLocation', component: AllActivitiesByLocationComponent },
    { path: 'allActivitiesExpert', component: AllActivitiesExpertComponent },
    { path: 'bookings/:userId', component:BookingsByCustomerComponent},
    { path: 'bookingsActivity/:activityId', component:BookingsByActivityComponent},
    { path: 'updateActivity/:activityId', component: UpdateActivityFormComponent},
    { path: '', redirectTo: '/allActivities', pathMatch: 'full' },
    { path: '**', redirectTo: '/allActivities' }
];
