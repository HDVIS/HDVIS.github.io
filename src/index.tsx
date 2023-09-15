import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { intersection } from "./set_op";

import {
  Typography,
  CssBaseline,
  Paper,
  ThemeProvider,
} from "@material-ui/core";

import { TopBar } from "./TopBar";
import { Papers } from "./Papers";
import { SideBar } from "./SideBar";
// import { TPaperMatrix } from './ChartModal'

import { useStyles, theme } from "./style";

export interface Paper {
  Title: string;
  DOI: string;
  Index: string;
  Path: string;
  Trajectory: string[];
  Correlation: string[];
  Clustering: string[];
  Distribution: string[];
}

// export const getAvatar = (s: string) => {
//   const pieces = s.split(" ");
//   if (pieces.length > 1) {
//     return `${pieces[0][0].toUpperCase()}${pieces[1][0].toUpperCase()}`;
//   } else if(s === 'Clustering') {
//       return 'CLT'
//   } else if(s === 'Classification') {
//       return 'CLS'
//   } else if (s === 'Regression') {
//       return 'RE'
//   } else if (s === 'Reinforcement') {
//       return 'RF'
//   }
//   return `${pieces[0][0].toUpperCase()}`;
// };


export const getTrajectoryAvatar = (s: string) => {
  if(s === 'Q1') {
      return 'Tr2'
  } else if(s === 'Q2') {
      return 'Tr3'
  } else if (s === 'Q3') {
      return 'Tr1'
  } else if (s === 'Q4') {
      return 'Tr5'
  } else if (s === 'Q5') {
      return 'Tr4'
  }
};

export const getTrajectoryLabel = (s: string) => {
  if(s === 'Q1') {
      return 'Temporal Dynamics Trajectory of Items'
  } else if(s === 'Q2') {
      return 'Temporal Dynamics Trajectory of Dimensions'
  } else if (s === 'Q3') {
      return 'Spatial Dynamics Trajectory of Items'
  } else if (s === 'Q4') {
      return 'Spatial Dynamics Trajectory of Dimensions'
  } else if (s === 'Q5') {
      return 'Interactions and Comparison among Trajectory'
  }
};

export const getCorrelationAvatar = (s: string) => {
  if(s === 'Q1') {
      return 'Co3'
  } else if(s === 'Q2') {
      return 'Co1'
  } else if (s === 'Q3') {
      return 'Co2'
  }
};

export const getCorrelationLabel = (s: string) => {
  if(s === 'Q1') {
      return 'Correlation among Items'
  } else if(s === 'Q2') {
      return 'Correlation among Dimensions'
  } else if (s === 'Q3') {
      return 'Correlation among Items and Dimensions'
  }
};

export const getClusteringAvatar = (s: string) => {
  if(s === 'Q1') {
      return 'Cl3'
  } else if(s === 'Q2') {
      return 'Cl1'
  } else if (s === 'Q3') {
      return 'Cl4'
  } else if (s === 'Q4') {
      return 'Cl2'
  } else if (s === 'Q5') {
      return 'Cl5'
  }
};

export const getClusteringLabel = (s: string) => {
  if(s === 'Q1') {
      return 'Existence of Item Clusters'
  } else if(s === 'Q2') {
      return 'Existence of Dimension Clusters'
  } else if (s === 'Q3') {
      return 'Name of Item Clusters'
  } else if (s === 'Q4') {
      return 'Name of Dimension Clusters'
  } else if (s === 'Q5') {
      return 'Relationship among Clusters'
  }
};

export const getDistributionAvatar = (s: string) => {
  if(s === 'Q1') {
      return 'Di1'
  } else if(s === 'Q2') {
      return 'Di3'
  } else if (s === 'Q3') {
      return 'Di3'
  } else if (s === 'Q4') {
      return 'Di4'
  }
};

export const getDistributionLabel = (s: string) => {
  if(s === 'Q1') {
      return 'Dimension Distribution on Different Clusters'
  } else if(s === 'Q2') {
      return 'Spatial Distribution of Item Clusters'
  } else if (s === 'Q3') {
      return 'Spatial Distribution of Dimension Clusters'
  } else if (s === 'Q4') {
      return 'Distribution of Items in 2D Space'
  }
};

export default function App() {
  const classes = useStyles();
  const defaultVersion = "webdata"

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [TrajectoryTags, setTrajectoryTags] = useState({});
  const [CorrelationTags, setCorrelationTags] = useState({});
  const [ClusteringTags, setClusteringTags] = useState({});
  const [DistributionTags, setDistributionTags] = useState({});
  const [searchKey, setSearchKey] = useState('');
  const [version, setVersion] = useState(defaultVersion);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [paperYear, setPaperYears] = useState<{[k:string]:number}>({});
  const [paperArea, setPaperAreas] = useState<{[k:string]:number}>({});
  // const [paperMatrix, setPaperMatrix] = useState<TPaperMatrix>({VISData:[], VISTags:[], MLTags:[], MLData:[], matrix: []});

  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";


  const fetchData = async (version) => {
    const papers = await fetch(`/assets/${version}.json`).then((res) =>
      res.json()
    );
    setPapers(papers);
    const initialTrajectoryTag = papers.reduce((o, d) => {
      d.Trajectory.forEach((v) => {
        if (!(v in o)) {
          o[v] = true;
        }
      });
      return o;
    }, {})
  
    const initialCorrelationTag = papers.reduce((o, d) => {
      d.Correlation.forEach((v) => {
        if (!(v in o)) {
          o[v] = true;
        }
      });
      return o;
    }, {})

    const initialClusteringTag = papers.reduce((o, d) => {
      d.Clustering.forEach((v) => {
        if (!(v in o)) {
          o[v] = true;
        }
      });
      return o;
    }, {})

    const initialDistributionTag = papers.reduce((o, d) => {
      d.Distribution.forEach((v) => {
        if (!(v in o)) {
          o[v] = true;
        }
      });
      return o;
    }, {})

    const initialPaperYear = papers.reduce((o, d) => {
      if (! (d.year in o)){
        o[d.year] = 1
      } else {
        o[d.year] +=1
      }
      return o
    }, {})
    
    

    const initialPaperArea = papers.reduce((o, d) => {
      if (! (d.venue in o)){
        o[d.venue] = 1
      } else {
        o[d.venue] +=1
      }
      return o
    }, {})

    
    
    const TrajectoryTags = Object.keys(initialTrajectoryTag)
    const CorrelationTags = Object.keys(initialCorrelationTag)
    const ClusteringTags = Object.keys(initialClusteringTag)
    const DistributionTags = Object.keys(initialDistributionTag)

    // let initialMatrix = VISTags.map(_ =>MLTags.map( _ =>0))

    // papers.forEach(p=>{
    //   VISTags.forEach((vis, i)=>{
    //     MLTags.forEach((ml, j)=>{
    //       if (p['ML'].includes(ml) && p['VIS'].includes(vis)) initialMatrix[i][j]+=1 
    //     })
    //   })
    // })

    // const matrix = initialMatrix.map((row, i)=>{
    //   return row.map((cell, j)=>{
    //     return [j, i, cell>0? cell : undefined] as [number, number, number|undefined]
    //   })
    // }).flat()

    // const MLData = MLTags.map(ml=>{
    //   return papers.filter(p=>p['ML'].includes(ml)).length
    // })

    // const VISData = VISTags.map(vis=>{
    //   return papers.filter(p=>p['VIS'].includes(vis)).length
    // })

    // setPaperMatrix({MLTags, VISTags, MLData, VISData, matrix})
    // setPaperAreas(initialPaperArea)
    // setPaperYears(initialPaperYear)
    setTrajectoryTags(initialTrajectoryTag);
    setCorrelationTags(initialCorrelationTag);
    setClusteringTags(initialClusteringTag);
    setDistributionTags(initialDistributionTag);
    // setMLTags(initialMLTag);

  };

  useEffect(() => {
    fetchData(defaultVersion);
  }, []);

  const onProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onClickFilter = (tag: string, type: "Trajectory" | "Correlation" | "Clustering" | "Distribution") => {
    if (type === "Trajectory") {
      if (tag !== 'all') {
        const newTrajectoryTags = {
          ...TrajectoryTags,
          [tag]: !TrajectoryTags[tag],
        }
        setTrajectoryTags(newTrajectoryTags);
      } else {
        const flag = Object.values(TrajectoryTags).every(d => d)
        const newTrajectoryTags = Object.keys(TrajectoryTags).reduce((o, d) => { 
          if (!(d in o)) {
            o[d] = !flag
          }
          return o
        }, {})
        setTrajectoryTags(newTrajectoryTags);
      }
      
    } else if (type === "Correlation") {
      if (tag != 'all') {
        const newCorrelationTags = {
          ...CorrelationTags,
          [tag]: !CorrelationTags[tag],
        }
        setCorrelationTags(newCorrelationTags);
      } else {
        const flag = Object.values(CorrelationTags).every(d => d)
        const newCorrelationTags = Object.keys(CorrelationTags).reduce((o, d) => { 
          if (!(d in o)) {
            o[d] = !flag
          }
          return o
        }, {})
        setCorrelationTags(newCorrelationTags);
      }
      
    } else if (type === "Clustering") {
      if (tag != 'all') {
        const newClusteringTags = {
          ...ClusteringTags,
          [tag]: !ClusteringTags[tag],
        }
        setClusteringTags(newClusteringTags);
      } else {
        const flag = Object.values(ClusteringTags).every(d => d)
        const newClusteringTags = Object.keys(ClusteringTags).reduce((o, d) => { 
          if (!(d in o)) {
            o[d] = !flag
          }
          return o
        }, {})
        setClusteringTags(newClusteringTags);
      }
      
    } else if (type === "Distribution") {
      if (tag != 'all') {
        const newDistributionTags = {
          ...DistributionTags,
          [tag]: !DistributionTags[tag],
        }
        setDistributionTags(newDistributionTags);
      } else {
        const flag = Object.values(DistributionTags).every(d => d)
        const newDistributionTags = Object.keys(DistributionTags).reduce((o, d) => { 
          if (!(d in o)) {
            o[d] = !flag
          }
          return o
        }, {})
        setDistributionTags(newDistributionTags);
      }
      
    }
    
  };
  const onSetSearchKey = (searchKey:string)=>{
    setSearchKey(searchKey.toLowerCase())
  }

  const onSetVersion = (version:string)=>{
    setVersion(version)
    fetchData(version)
  }

  const papersAfterFilter = Array.from(new Set(papers.filter((p) => p.Trajectory.some(((tr) => TrajectoryTags[tr])) && p.Title.toLowerCase().includes(searchKey)).concat(papers.filter((p) => p.Correlation.some((co) => CorrelationTags[co]) && p.Title.toLowerCase().includes(searchKey))).concat(papers.filter((p) => p.Clustering.some((cl) => ClusteringTags[cl]) && p.Title.toLowerCase().includes(searchKey))).concat(papers.filter((p) => p.Distribution.some((di) => DistributionTags[di]) && p.Title.toLowerCase().includes(searchKey)))));

  // const papersAfterFilter = Array.from(intersection(new Set(papers.filter((p) => p.Trajectory.some(((tr) => TrajectoryTags[tr])) && p.Title.toLowerCase().includes(searchKey))), intersection(new Set(papers.filter((p) => p.Correlation.some((co) => CorrelationTags[co]) && p.Title.toLowerCase().includes(searchKey))), intersection(new Set(papers.filter((p) => p.Clustering.some((cl) => ClusteringTags[cl]) && p.Title.toLowerCase().includes(searchKey))), new Set(papers.filter((p) => p.Distribution.some((di) => DistributionTags[di]) && p.Title.toLowerCase().includes(searchKey)))))));


  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />

        <TopBar menuId={menuId} onProfileMenuOpen={onProfileMenuOpen} handleDrawerToggle={handleDrawerToggle}/>

        <SideBar
          paperNumber={papersAfterFilter.length}
          TrajectoryTags={TrajectoryTags}
          CorrelationTags={CorrelationTags}
          ClusteringTags={ClusteringTags}
          DistributionTags={DistributionTags}
          version={version}
          onClickFilter={onClickFilter}
          onSetSearchKey={onSetSearchKey}
          onSetVersion = {onSetVersion}
          paperYear = {paperYear}
          paperArea={paperArea}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Papers papers={papersAfterFilter} />
      </div>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
