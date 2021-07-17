import classnames from 'classnames';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const About = (props) => {
	const {classes, resource} = props;

	return (
		<Grid container spacing={0}>
			<Grid item xs={12} className={classes.contentSpacing}>
				<Grid container spacing={0}>
					<Typography
						variant="body2"
						data-test-id="details-about"
						className={classnames(classes.bottomSpacing, classes.lineSpacing)}
					>
						{resource?.description}
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default About;
