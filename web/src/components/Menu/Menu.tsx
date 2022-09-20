import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListElement from './_components/List/ListElement';
import { NavLinks } from './NavLinks';
import { availableJobs, colors } from '../../AppConfig';

type Props = {
  selected: Page
  setSelected: (selectedPage: Page) => void
  job: string
  jobGrade: number
}

const Menu = ({jobGrade, selected, job, setSelected}: Props) => {

  const handleListItemClick = (selectedPage: Page) => {
    setSelected(selectedPage);
  };

  const canSeeMenu = (navLink: Page) => {
    if (!navLink.jobAccess) { 
      return true
    } else if (!navLink.bossOnly) {
      if (availableJobs.filter(j => j.job === job).length) {
        return true
      } else {
        return false
      }
    } else {
      if (availableJobs.filter(j => j.job === job && j.templateGrades.includes(jobGrade)).length) {
        return true
      } else {
        return false
      }
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: '68vh', width: '100%', maxWidth: 360, background: `linear-gradient(30deg, ${colors.menuGradientBottom} 0%, ${colors.menuGradientTop} 100%)`, margin: "auto", alignSelf: "center", borderRadius: "10px 0 0 10px" }}>
      <List component="nav">
        {NavLinks.map((navLink, key) => {
          return canSeeMenu(navLink) &&
          <ListElement title={navLink.title} key={key} selected={selected.index === key} onClick={() => { handleListItemClick(navLink) }} iconComponent={navLink.iconComponent} />
        })}
      </List>
    </Box>
  );
}

export default Menu