import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import propertyMap from '../utils/propertyMap';

const Communities = (props) => (
	<Grid container spacing={0}>
		<Grid item xs={12} className={props.classes.sectionSpacing}>
			<Grid container spacing={0}>
				<Grid item xs={12}>
					{props?.list?.length && (
						<Typography variant="body2" data-test-id="details-communities">
							{props.list
								.map((item) => propertyMap?.['community']?.[item?.slug] || '')
								.join(', ')}
						</Typography>
					)}
				</Grid>
			</Grid>
		</Grid>
	</Grid>
);

export default Communities;
