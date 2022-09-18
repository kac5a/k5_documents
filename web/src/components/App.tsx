import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Header from './Header';
import Menu from './Menu/Menu';
import { useContext, useState } from 'react';
import { NavLinks } from './Menu/NavLinks';
import { useJob } from '../hooks/useJob';
import { debugData } from '../utils/debugData';
import { ContextProvider } from '../context/Context';
import { VisibilityCtx } from '../providers/VisibilityProvider';
import DocumentViewFromPlayer from './Components/DocumentViewFromPlayer';

export default function App() {
  const [selectedPage, setSelectedPage] = useState<Page>(NavLinks[0])
  const { isBoss, job } = useJob()
  const {visible, givenDocument} = useContext(VisibilityCtx)

  debugData([
    {
      action: 'setVisible',
      data: true,
    }
  ])

  return (
    <ContextProvider>
      {visible && !givenDocument && <Box sx={{  p:0, height: "70vh", width: "70vw", display: "flex", alignItems: "center" }}>
        <Grid container sx={{height: '100%'}}>
          <Grid item xs={3} style={{marginTop: "auto", marginBottom: "auto"}}>
            <Menu selected={selectedPage} isBoss={isBoss} job={job?.name!} setSelected={setSelectedPage}/>
          </Grid>
          <Grid item xs={9}>
            <Box
              component="main"
              sx={{
                height: '100%', p: 3, flexGrow: 1, bgcolor: 'background.default', borderRadius: "1vh", display: "flex", flexDirection: "column"
              }}> 
              <Header title={selectedPage.title} />
              {getSelectedComponent(selectedPage.index)}
            </Box>
          </Grid>
        </Grid>
      </Box>}
      {visible && givenDocument && <DocumentViewFromPlayer />}
    </ContextProvider>
  );
}

const getSelectedComponent = (selectedIndex: number) => {
  let component = null
  NavLinks.forEach(navlink => {
    if (navlink.index === selectedIndex)
    component = navlink.component
  });
  return component
}