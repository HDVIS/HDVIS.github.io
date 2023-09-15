import React from "react";
import {
  Grid,
  Paper,
  Card,
  Button,
  CardActions,
  Avatar,
  Chip,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useStyles } from "./style";
import { Paper as TPaper, getClusteringAvatar, getClusteringLabel, getCorrelationLabel, getCorrelationAvatar, getDistributionAvatar, getTrajectoryAvatar, getDistributionLabel, getTrajectoryLabel } from "../index";

interface Props {
  papers: TPaper[];
}

export function Papers(props: Props) {
  const { papers } = props;
  const classes = useStyles();
  const onClickPaper = (paper: TPaper)=>{
    window.open(`https://doi.org/${paper.DOI}`)
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {papers.map((paper, i) => (
            <Grid key={i} item>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent} onClick={()=> onClickPaper(paper)}>
                  <CardMedia
                    component="img"
                    alt="Figure 1"
                    height="60%"
                    width="100%"
                    image={paper.Path}
                  />
                  {/* <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {paper.venue} {paper.year}
                  </Typography> */}
                  <Typography
                    variant="subtitle1"
                    component="p"
                    className={classes.title}
                  >
                    {paper.Title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {paper.Index}
                  </Typography>
                  {/* <Typography variant="body2" component="p">
                    Author1, Author2, Author3, and Author4
                  </Typography> */}
                  <div className={classes.grow}></div>
                  <div className={classes.tags}>
                  <AvatarGroup className={classes.avatarGroup}>
                    {paper.Trajectory.map((tr) => (
                      <Avatar key={tr} className={classes.TrajectoryTag}>
                        <b>{getTrajectoryAvatar(tr)}</b>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <AvatarGroup className={classes.avatarGroup}>
                    {paper.Correlation.map((co) => (
                      <Avatar key={co} className={classes.CorrelationTag}>
                        <b>{getCorrelationAvatar(co)}</b>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <AvatarGroup className={classes.avatarGroup}>
                    {paper.Clustering.map((cl) => (
                      <Avatar key={cl} className={classes.ClusteringTag}>
                        <b>{getClusteringAvatar(cl)}</b>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <AvatarGroup className={classes.avatarGroup}>
                    {paper.Distribution.map((di) => (
                      <Avatar key={di} className={classes.DistributionTag}>
                        <b>{getDistributionAvatar(di)}</b>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  </div>
                </CardContent>
                {/* <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
