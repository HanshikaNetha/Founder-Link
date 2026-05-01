import { Routes } from '@angular/router';
import { EditProfile } from './pages/edit-profile/edit-profile';
import { Profile } from './pages/profile/profile';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: Profile
  },
  {
    path: 'edit',
    component: EditProfile
  }
];