import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { FaIconComponent } from './fa-icon/fa-icon.component';
import {
  faHome,
  faLink,
  faExternalLinkAlt,
  faAngleDoubleUp,
  faAngleDoubleRight,
  faEnvelope,
  faFileAlt,
  faUser,
  faUserEdit,
  faUserCog,
  faPencilAlt,
  faTasks,
  faSignInAlt,
  faSignOutAlt,
  faQuestionCircle,
  faBookOpen,
  faInfoCircle,
  faBalanceScale,
  faShieldAlt,
  faCommentDots,
  faBug,
  faExclamation,
  faFolderOpen,
  faProjectDiagram,
  faChartBar,
  faPaintBrush,
  faList,
  faTable,
  faDownload,
  faUpload,
  faTerminal,
  faSearch,
  faFilter,
  faColumns,
  faSyncAlt,
  faDna,
  faCalculator,
  faCertificate,
  faCog,
  faCogs,
  faDatabase,
  faHashtag,
  faTag,
  faTags,
  faTachometerAlt,
  faCalendarAlt,
  faStopwatch,
  faCopy,
  faCode,
  faCodeBranch,
  faKeyboard,
  faDesktop,
  faQuestion,
  faUserCheck,
  faPlusCircle,
  faTools,
  faCheck,
  faTimes,
  faStar,
  faMedal,
  faCheckDouble,
  faLock,
  faLockOpen,
  faDollarSign,
  faSpinner,
  faFlask,
  faTrash,
  faChevronUp,
  faChevronDown,
  faCloud,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGitAlt,
  faGithub,
  faDocker,
  faLinkedin,
  faOrcid,
  faCreativeCommons,
  faCreativeCommonsBy,
  faCreativeCommonsNc,
  faCreativeCommonsZero,
  faCreativeCommonsSa,
  faCreativeCommonsShare,
  faOsi,
} from '@fortawesome/free-brands-svg-icons';
import {
  faFileAlt as farFileAlt,
  faStar as farStar,
} from '@fortawesome/free-regular-svg-icons';
import { MatIconComponent } from './mat-icon/mat-icon.component';
import { CCIconComponent } from './cc-icon/cc-icon.component';
export { BiosimulationsIcon } from './icon/icon.component';
@NgModule({
  imports: [CommonModule, MatIconModule, FontAwesomeModule, MatSnackBarModule],
  declarations: [
    IconComponent,
    FaIconComponent,
    MatIconComponent,
    CCIconComponent,
  ],
  exports: [IconComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BiosimulationsIconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faShareAlt,
      faHome,
      faLink,
      faExternalLinkAlt,
      faAngleDoubleUp,
      faAngleDoubleRight,
      faEnvelope,
      faFileAlt,
      faUser,
      faUserEdit,
      faUserCheck,
      faUserCog,
      faPencilAlt,
      faTasks,
      faSignInAlt,
      faSignOutAlt,
      faQuestionCircle,
      faBookOpen,
      faInfoCircle,
      faCloud,
      faBalanceScale,
      faShieldAlt,
      faCommentDots,
      faBug,
      faExclamation,
      faFolderOpen,
      faProjectDiagram,
      faChartBar,
      faPaintBrush,
      faList,
      faPlusCircle,
      faTools,
      faCheck,
      faTimes,
      faStar,
      faCertificate,
      faMedal,
      faCheckDouble,
      faLock,
      faLockOpen,
      faDollarSign,
      faSpinner,
      faFlask,
      faTrash,
      faChevronUp,
      faChevronDown,
      faTable,
      faDownload,
      faUpload,
      faTerminal,
      faSearch,
      faFilter,
      faColumns,
      faSyncAlt,
      faDna,
      faCalculator,
      faCog,
      faCogs,
      faDatabase,
      faHashtag,
      faTag,
      faTags,
      faTachometerAlt,
      faCalendarAlt,
      faStopwatch,
      faCopy,
      faCode,
      faCodeBranch,
      faKeyboard,
      faDesktop,
      faGitAlt,
      faQuestion,
      faGithub,
      faDocker,
      faLinkedin,
      faOrcid,
      faCreativeCommons,
      faCreativeCommonsBy,
      faCreativeCommonsNc,
      faCreativeCommonsZero,
      faCreativeCommonsSa,
      faCreativeCommonsShare,
      farFileAlt,
      farStar,
      faOsi,
    );
  }
}
