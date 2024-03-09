import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { FeeStructureComponent } from './fee/fee-structure/fee-structure.component';
import { FeeTransectionComponent } from './fee/fee-transection/fee-transection.component';
import { FeeComponent } from './fee/fee.component';
import { FeeAnalyticsComponent } from './fee/fee-analytics/fee-analytics.component';
import { StudentFeeComponent } from './student/student-fee/student-fee.component';
import { AddEditStudentFeeComponent } from './student/student-fee/add-edit-student-fee/add-edit-student-fee.component';
import { StudentPersonalComponent } from './student/student-personal/student-personal.component';
import { StudentManageComponent } from './student/student-manage/student-manage.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { AddEditFeeStructureComponent } from './fee/add-edit-fee-structure/add-edit-fee-structure.component';

export const routes: Routes = [
    { path: '', redirectTo: 'student', pathMatch: 'full' },
    {
        path:"student",
        component:StudentComponent,
        children:[
            {path:"",redirectTo:"studentList",pathMatch:"full"},
            {path:"studentList",component:StudentListComponent},
            {
                path:"manage",
                component:StudentManageComponent,
                children:[
                    {path:"",redirectTo:"personal",pathMatch:"full"},
                    {path:"personal",component:StudentPersonalComponent},
                    {path:"fee",component:StudentFeeComponent},
                    {path:"addEditFee",component:AddEditStudentFeeComponent},
                ]
            },
            {path:"addStudent",component:AddStudentComponent}
        ],
        
    },
    {
        path:"fee",
        component:FeeComponent,
        children:[
            {path:"",redirectTo:"feeAnalytics",pathMatch:"full"},
            {path:"feeAnalytics",component:FeeAnalyticsComponent},
            {path:"feeStructure",component:FeeStructureComponent},
            {path:"addEditFeeStructure",component:AddEditFeeStructureComponent},
            {path:"feeTransection",component:FeeTransectionComponent},
        ]
    },  
    

];
