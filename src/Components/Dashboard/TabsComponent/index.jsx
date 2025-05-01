import React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Grid from '../Grid';
import List from '../List';
import "./style.css"

export default function TabsComponent({coins}) {
  const [value, setValue] = useState("grid");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    color: "var(--white)",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontfamily: "Inter",
    textTransform: "capitalize",
  };

  const theme = createTheme({
    palette: {
      primary:{
        main: "#3a80e9",
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
      <TabContext value={value}>
          <TabList onChange={handleChange} variant="fullWidth">
            <Tab label="Grid" value="grid" sx={style} />
            <Tab label="List" value="list" sx={style}/>
          </TabList>
        
        <TabPanel value="grid">
          <div className='grid-flex'>
            {coins.map((coin, i)=>{
            return(
             <Grid coin={coin} key={i}/>
            );
          })}</div>
        </TabPanel>
        <TabPanel value="list">
              <div className='list-table'>
                  {coins.map((item, i) => {
                    return <List coin = {item} key = {i} />;
                  })}
             </div>
        </TabPanel>
       
      </TabContext>
      </ThemeProvider>
    </div>
  );
}
