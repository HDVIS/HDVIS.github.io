import React, { useState } from "react";

import {
  Drawer,
  Divider,
  Toolbar,
  Chip,
  Typography,
  InputBase,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Hidden,
} from "@material-ui/core";
import { Search as SearchIcon, LaunchOutlined as LaunchIcon } from "@material-ui/icons";
import Select from '@material-ui/core/Select';
import { getClusteringAvatar, getClusteringLabel, getCorrelationLabel, getCorrelationAvatar, getDistributionAvatar, getTrajectoryAvatar, getDistributionLabel, getTrajectoryLabel} from '../index'
import { useStyles } from "./style";


import { ChartModal, TPaperMatrix } from '../ChartModal'
import { theme } from "../style";

const VISTagDetails = {
  "Data Processing4VIS": "raw data is transformed into a format that better suits the following visualization processes.",
  "Data-VIS Mapping": "the values of data fields are mapped into the visual channels of graphic marks.",
  "Insight Communication": "insights are transformed into visualizations that can effectively communicate them.",
  "Style Imitation": "the styles of given visualizations examples are applied to create new visualizations. ",
  "VIS Reading": "users observe the appearance of a visualization, read the encoded data, and understand the underlying information. ML techniques try to automatically 'read' the visualizations like humans",
  "User Profiling": "user actions with visualizations are logged and then analyzed in order to better understand users.",
  "VIS Interaction": "users interact with the visualization and change its appearance.",
}

const TrajectoryTagDetails = {
  "Q1": "Dummy illustration for Trajectory Q1.",
  "Q2": "Dummy illustration for Trajectory Q2.",
  "Q3": "Dummy illustration for Trajectory Q3.",
  "Q4": "Dummy illustration for Trajectory Q4.",
  "Q5": "Dummy illustration for Trajectory Q5.",
}

const CorrelationTagDetails = {
  "Q1": "Dummy illustration for Correlation Q1.",
  "Q2": "Dummy illustration for Correlation Q2.",
  "Q3": "Dummy illustration for Correlation Q3.",
}

const ClusteringTagDetails = {
  "Q1": "Dummy illustration for Clustering Q1.",
  "Q2": "Dummy illustration for Clustering Q2.",
  "Q3": "Dummy illustration for Clustering Q3.",
  "Q4": "Dummy illustration for Clustering Q4.",
  "Q5": "Dummy illustration for Clustering Q5.",
}

const DistributionTagDetails = {
  "Q1": "Dummy illustration for Distribution Q1.",
  "Q2": "Dummy illustration for Distribution Q2.",
  "Q3": "Dummy illustration for Distribution Q3.",
  "Q4": "Dummy illustration for Distribution Q4.",
}

interface Props {
  paperNumber: number;
  version: string;
  TrajectoryTags: Record<string, boolean>;
  CorrelationTags: Record<string, boolean>;
  ClusteringTags: Record<string, boolean>;
  DistributionTags: Record<string, boolean>;
  paperYear: Record<string, number>;
  paperArea: Record<string, number>;
  // paperMatrix: TPaperMatrix;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  onClickFilter: (k: string, type: 'Trajectory' | 'Correlation' | 'Clustering' | 'Distribution') => void;
  onSetSearchKey: (key: string) => void;
  onSetVersion: (version: string) => void;
}


export function SideBar(props: Props) {
  const { paperNumber, TrajectoryTags, CorrelationTags, ClusteringTags, DistributionTags, onClickFilter, onSetSearchKey, onSetVersion, paperArea, paperYear, mobileOpen, handleDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const drawer = <div className={classes.drawerContainer}>
    <Toolbar />

    <Typography variant="h5" className={classes.paperNumber}>
      Figures: {paperNumber}
    </Typography>

    <Divider />

    <Typography variant="subtitle2" className={classes.filterTitle}>
      Keywords search:
    </Typography>
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => onSetSearchKey(event.target.value)}
      />
    </div>

    <Typography variant="subtitle2" className={classes.filterTitle}>
    Trajectory Filter: <Button variant="outlined" size="small" onClick={() => onClickFilter("all", 'Trajectory')}> {Object.values(TrajectoryTags).every(d => d) ? 'Unselect All' : 'Select All'}</Button>
    </Typography>
    <div className={classes.filters}>
      {Object.entries(TrajectoryTags).map(([tr, checked]) => (
        <Tooltip key={tr} title={TrajectoryTagDetails[tr]}>
          <Chip
            key={tr}
            avatar={<Avatar style={{backgroundColor: theme.palette.primary.main, color: "white" }} ><b>{getTrajectoryAvatar(tr)}</b></Avatar>}
            label={getTrajectoryLabel(tr)}
            clickable
            style={{ backgroundColor: checked ? theme.palette.primary.light : "white", color: checked ?  "white" : theme.palette.primary.light }}
            variant={checked ? "default" : "outlined"}
            onClick={() => onClickFilter(tr, 'Trajectory')}
          />
        </Tooltip>
      ))}
    </div>

    <Divider />

    <Typography variant="subtitle2" className={classes.filterTitle}>
      Correlation filter: <Button variant="outlined" size="small" onClick={() => onClickFilter("all", 'Correlation')}> {Object.values(CorrelationTags).every(d => d) ? 'Unselect All' : 'Select All'}</Button>
    </Typography>
    <div className={classes.filters}>
      <div className={classes.filters}>
        {Object.entries(CorrelationTags).map(([co, checked]) => (
          <Chip
            key={co}
            avatar={<Avatar style={{backgroundColor: theme.palette.secondary.main, color: "white" }} ><b>{getCorrelationAvatar(co)}</b></Avatar>}
            label={getCorrelationLabel(co)}
            clickable
            style={{ backgroundColor: checked ? theme.palette.secondary.light : "white", color: checked ?  "white" : theme.palette.secondary.light }}
            variant={checked ? "default" : "outlined"}
            onClick={() => onClickFilter(co, 'Correlation')}
          />
        ))}
      </div>
    </div>
    <Divider />

    <Typography variant="subtitle2" className={classes.filterTitle}>
      Clustering filter: <Button variant="outlined" size="small" onClick={() => onClickFilter("all", 'Clustering')}> {Object.values(ClusteringTags).every(d => d) ? 'Unselect All' : 'Select All'}</Button>
    </Typography>
    <div className={classes.filters}>
      <div className={classes.filters}>
        {Object.entries(ClusteringTags).map(([cl, checked]) => (
          <Chip
            key={cl}
            avatar={<Avatar style={{backgroundColor: theme.palette.info.main, color: "white" }} ><b>{getClusteringAvatar(cl)}</b></Avatar>}
            label={getClusteringLabel(cl)}
            clickable
            variant={checked ? "default" : "outlined"}
            style={{ backgroundColor: checked ? theme.palette.info.light : "white", color: checked ?  "white" : theme.palette.info.light }}
            onClick={() => onClickFilter(cl, 'Clustering')}
          />
        ))}
      </div>
    </div>
    <Divider />

    <Typography variant="subtitle2" className={classes.filterTitle}>
      Distribution filter: <Button variant="outlined" size="small" onClick={() => onClickFilter("all", 'Distribution')}> {Object.values(DistributionTags).every(d => d) ? 'Unselect All' : 'Select All'}</Button>
    </Typography>
    <div className={classes.filters}>
      <div className={classes.filters}>
        {Object.entries(DistributionTags).map(([di, checked]) => (
          <Chip
            key={di}
            avatar={<Avatar style={{backgroundColor: theme.palette.success.main, color: "white" }} ><b>{getDistributionAvatar(di)}</b></Avatar>}
            label={getDistributionLabel(di)}
            clickable
            variant={checked ? "default" : "outlined"}
            style={{ backgroundColor: checked ? theme.palette.success.light : "white", color: checked ?  "white" : theme.palette.success.light }}
            onClick={() => onClickFilter(di, 'Distribution')}
          />
        ))}
      </div>
    </div>
    <Divider />
    {/* <FormControl required className={classes.formControl}>
    <InputLabel>Version</InputLabel> */}
    {/* <Typography variant="subtitle2" className={classes.filterTitle}>
      Select a version:

      <Select
        native
        value={props.version}
        onChange={(e: React.ChangeEvent<{ value: string }>) => props.onSetVersion(e.target.value)}
        style={{ marginLeft: '10px' }}
        name="version"
        inputProps={{
          id: 'version-required',
        }}
      >
        <option value={'survey'}> ML4VIS Survey 2020</option>
        <option value={'latest'}> Latest</option>
      </Select>
    </Typography> */}
    {/* </FormControl> */}

    {/* <Divider />
    <Button onClick={handleClick}>
      <LaunchIcon/> <span>Other Related Surveys</span>
    </Button> */}
    {/* <Menu
      open={Boolean(anchorEl)}
      aria-haspopup="true"
      keepMounted
      onClose={handleClose}
    >
      <MenuItem onClick={() => window.open("https://arxiv.org/pdf/2102.01330")}>Survey on Artificial Intelligence Approaches for Visualization Data</MenuItem>
      <MenuItem onClick={()=>window.open("https://arxiv.org/abs/2204.06504")}>DL4SciVis: A State-of-the-Art Survey on Deep Learning for Scientific Visualization</MenuItem>
      <MenuItem onClick={() => window.open("https://www.sciencedirect.com/science/article/pii/S2468502X20300292")}>A survey on automatic infographics and visualization recommendations</MenuItem>
    </Menu> */}
  </div>

  return (<>
      <Hidden smUp implementation="css">
        {/* this drawer is for the mobile mode */}
        <Drawer
          variant="temporary"
          anchor={'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
}
