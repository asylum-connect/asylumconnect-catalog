import React from 'react';

import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import {boldFont, dividerSpacing} from '../../theme';
import Loading from '../Loading';

const styles = theme => ({
  bottomSpacing: {
    marginBottom: '0.9rem'
  },
  boldFont: boldFont(theme),
  dividerSpacing: Object.assign(dividerSpacing(theme), {
    marginTop: dividerSpacing(theme).marginBottom
  }),
  switchInputRoot: {
    flexDirection: 'row-reverse',
    width: '100%',
    maxWidth: '500px',
    marginRight: '0px'
  },
  switchRoot: {
    height: 'auto'
  },
  reviewBadge: {
    display: 'inline-block',
    fontSize: '0.6rem',
    borderRadius: '4px',
    padding: '0px 6px',
    width: '120px',
    textAlign: 'center',
    marginBottom: '0.3rem'
  },
  reviewOD: {
    backgroundColor: '#30BCD5',
    color: theme.palette.common.darkBlack
  },
  reviewAC: {
    backgroundColor: theme.palette.secondary[500],
    color: theme.palette.common.white
  }
});

const ReviewList = ({title, classes, list}) => (
  <div>
    {title ? (
      <Typography
        variant="subheading"
        className={classes.boldFont + ' ' + classes.bottomSpacing}
      >
        {title}
      </Typography>
    ) : null}
    {list.length ? (
      list.map(review => (
        <Grid
          key={review.client_user_id}
          container
          spacing={0}
          className={classes.bottomSpacing}
        >
          <Grid item xs={12}>
            <Typography variant="body2">"{review.content}"</Typography>
          </Grid>
        </Grid>
      ))
    ) : (
      <Typography variant="body2" className={classes.boldFont}>
        No Reviews
      </Typography>
    )}
  </div>
);

const Reviews = ({
  classes,
  includeOrgReviews = true,
  orgReviews,
  oppReviews,
  reviews,
  isMobile
}) => (
  <Grid container spacing={0}>
    <Grid item xs={12}>
      <Grid container spacing={0} justify="space-between">
        <Grid item xs={12} md={12}>
          {reviews === false ? (
            <Loading />
          ) : (
            <ReviewList title="User reviews" list={reviews} classes={classes} />
          )}
        </Grid>
        {/*includeOrgReviews ?
        <Grid item xs={12} md={6}>
        {orgReviews === false ? <Loading />
        :
          <ReviewList title='Reviews of the organization' list={orgReviews} classes={classes} acOnly={acFilter} />
        }
        </Grid>
      : null }
        {isMobile && includeOrgReviews ?
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Divider className={classes.dividerSpacing} />
            </Grid>
          </Grid>
        : null}
        <Grid item xs={12} md={includeOrgReviews ? 6 : 12}>
        {oppReviews === false ? <Loading />
        :
          <ReviewList title={includeOrgReviews ? 'Reviews of specific services' : null} list={oppReviews} classes={classes} acOnly={acFilter} />
        }
        </Grid>*/}
      </Grid>
    </Grid>
  </Grid>
);

export default withStyles(styles)(Reviews);
