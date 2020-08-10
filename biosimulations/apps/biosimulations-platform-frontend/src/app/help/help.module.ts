import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HelpRoutingModule } from './help-routing.module';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

import { BiosimulationsIconsModule } from '@biosimulations/ui/icons';

@NgModule({
  declarations: [AboutComponent, HelpComponent, PrivacyPolicyComponent],
  imports: [
    CommonModule,    
    HelpRoutingModule,
    BiosimulationsIconsModule,
  ]
})
export class HelpModule { }
