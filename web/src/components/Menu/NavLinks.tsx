import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DifferenceIcon from '@mui/icons-material/Difference';
import MyDocuments from '../Pages/MyDocuments';
import Templates from '../Pages/Templates';
import IssuedDocuments from '../Pages/IssuedDocuments';
import { citizenTemplates, texts } from '../../AppConfig';

export const NavLinks: Page[] = [
  {
    index: 0,
    title: texts.myDocumentsTitle,
    component: <MyDocuments/>,
    iconComponent: <InboxIcon />,
    jobAccess: false,
    bossOnly: false
  },
  {
    index: 1,
    title: texts.issuedDocumentsTitle,
    component: <IssuedDocuments/>,
    iconComponent: <DraftsIcon />,
    jobAccess: !citizenTemplates.length,
    bossOnly: false
  },
  {
    index: 2,
    title:texts.templatesTitle,
    component: <Templates/>,
    iconComponent: <DifferenceIcon />,
    jobAccess: true,
    bossOnly: true
  },
]