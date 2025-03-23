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
      return 'Tr1'
  } else if(s === 'Q2') {
      return 'Tr2'
  } else if (s === 'Q3') {
      return 'Tr3'
  } else if (s === 'Q4') {
      return 'Tr4'
  } 
};

export const getTrajectoryLabel = (s: string) => {
  if(s === 'Q1') {
      return 'Trajectory of Items'
  } else if(s === 'Q2') {
      return 'Trajectory of Dimensions'
  } else if (s === 'Q3') {
      return 'Dynamics of Trajectories'
  } else if (s === 'Q4') {
      return 'Interactions and Comparison Among Trajectories'
  } 
};

export const getCorrelationAvatar = (s: string) => {
  if(s === 'Q1') {
      return 'Co2'
  } else if(s === 'Q2') {
      return 'Co1'
  } else if (s === 'Q3') {
      return 'Co3'
  }
};

export const getCorrelationLabel = (s: string) => {
  if(s === 'Q1') {
      return 'Correlation between Dimensions'
  } else if(s === 'Q2') {
      return 'Correlations between Items'
  } else if (s === 'Q3') {
      return 'Correlation between Items and Dimensions'
  }
};

export const getClusteringAvatar = (s: string) => {
  if(s === 'Q1') {
      return 'Cl1'
  } else if(s === 'Q2') {
      return 'Cl5'
  } else if (s === 'Q3') {
      return 'Cl2'
  } else if (s === 'Q4') {
      return 'Cl3'
  } else if (s === 'Q5') {
      return 'Cl4'
  }
};

export const getClusteringLabel = (s: string) => {
  if(s === 'Q1') {
      return 'Clustering of Items'
  } else if(s === 'Q2') {
      return 'Existence of Clusters'
  } else if (s === 'Q3') {
      return 'Name of Clusters'
  } else if (s === 'Q4') {
      return 'Relationship among Clusters'
  } else if (s === 'Q5') {
      return 'Clustering of Dimensions'
  }
};

export const getDistributionAvatar = (s: string) => {
  if(s === 'Q1') {
      return 'Di1'
  } else if(s === 'Q2') {
      return 'Di2'
  } else if (s === 'Q3') {
      return 'Di3'
  }
};

export const getDistributionLabel = (s: string) => {
  if(s === 'Q1') {
      return 'Distribution of dimension(s) on different items'
  } else if(s === 'Q2') {
      return 'Distribution of items in a 2D space'
  } else if (s === 'Q3') {
      return 'Spatial distribution of item clusters or dimensions'
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
    console.log(papers);
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
    const loading = document.getElementById("loading");
    if (loading) loading.remove();
    // setMLTags(initialMLTag);

  };

  useEffect(() => {
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "loading";
    loadingDiv.textContent = "📊 Loading 2,000+ figures and visual tags...";

    loadingDiv.style.position = "fixed";
    loadingDiv.style.top = "50%";
    loadingDiv.style.left = "50%";
    loadingDiv.style.transform = "translate(-50%, -50%)";
    loadingDiv.style.fontSize = "28px";
    loadingDiv.style.fontWeight = "bold";
    loadingDiv.style.color = "#222";
    loadingDiv.style.background = "rgba(255, 255, 255, 0.95)";
    loadingDiv.style.padding = "20px 30px";
    loadingDiv.style.border = "2px solid #ddd";
    loadingDiv.style.borderRadius = "10px";
    loadingDiv.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    loadingDiv.style.zIndex = "9999";
    
    document.body.appendChild(loadingDiv);

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
    <a
      href="https://github.com/HDVIS/HDVIS.github.io/tree/master/HD_code"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        top: "10px",
        right: "20px",
        zIndex: 9999, // ⬅️ 重点加高
        background: "#ffffffee",
        padding: "10px 14px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        textDecoration: "none",
        color: "#000",
        fontSize: "16px",
        fontWeight: "bold",
        border: "2px solid red" // ⬅️ 明显边框，确认有没有渲染出来
      }}
    >
      📂 HD_code
    </a>
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
