import React from 'react';
import url from 'url';
import trim from 'trim';
import _ from 'lodash';

import {withStyles} from '@material-ui/core/styles';
import {Grid, Typography} from '@material-ui/core';
import Fa from 'react-fontawesome';

import {AddressParser, ScheduleParser} from './Parser';
import Phone from './ResourcePhone';
import {boldFont, bodyLink, listLink, dividerSpacing} from '../theme';

import EditVisit from './EditComponents/EditVisit';

const styles = (theme) => ({
	boldFont: boldFont(theme),
	bodyLink: bodyLink(theme),
	listLink: listLink(theme),
	dividerSpacing: dividerSpacing(theme),
	bottomSpacing: {
		marginBottom: theme.spacing(1)
	},
	lineSpacing: {
		lineHeight: '1.4rem',
		marginBottom: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			paddingLeft: theme.spacing(4),
			position: 'relative'
		}
	},
	locationSpacing: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1)
	},
	mobileIcon: {
		display: 'none',
		[theme.breakpoints.down('xs')]: {
			display: 'block',
			position: 'absolute',
			left: 0,
			top: theme.spacing(1) / 2,
			width: '22px'
		}
	},
	mobileHide: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	container: {
		border: `1px solid ${theme.palette.grey[400]}`,
		borderRadius: '4px',
		padding: '25px',
		marginTop: '25px'
	}
});

//TODO: Update each of these to utilize components where the code is shared with DetailAccessInstructions.js

const Visit = ({
	website,
	phones,
	emails,
	locations,
	schedules,
	classes,
	isMobile,
	className,
	editMode,
	renderSaveButtons
}) => {
	if (editMode) {
		return (
			<EditVisit
				website={website}
				phones={phones}
				emails={emails}
				locations={locations}
				schedules={schedules}
				renderSaveButtons={renderSaveButtons}
			/>
		);
	}

	return (
		<Grid container spacing={0} className={className}>
			<Grid item xs={12}>
				<Typography variant="body2" className={classes.lineSpacing}>
					<strong className={classes.boldFont + ' ' + classes.mobileHide}>
						Website:{' '}
					</strong>
					{website ? (
						<a
							href={website}
							target="_blank"
							className={classes.bodyLink}
							rel="noopener noreferrer"
						>
							{isMobile ? url.parse(website).hostname : website}
						</a>
					) : null}
					<Fa name="link" className={classes.mobileIcon} />
				</Typography>
				{emails && emails.length ? (
					<Typography variant="body2" className={classes.lineSpacing}>
						<strong className={classes.boldFont + ' ' + classes.mobileHide}>
							Email:{' '}
						</strong>
						{emails.map((email) => {
							let name = trim(
								(email.title ? email.title : '') +
									' ' +
									(email.first_name ? email.first_name : '') +
									' ' +
									(email.last_name ? email.last_name : '')
							);
							return (
								<a
									href={'mailto:' + email.email}
									key={email._id}
									className={classes.bodyLink + ' ' + classes.listLink}
								>
									{email.email}
									{name ? '(' + name + ')' : ''}
								</a>
							);
						})}
						<Fa name="envelope" className={classes.mobileIcon} />
					</Typography>
				) : null}
				{phones && phones.length ? (
					<Typography variant="body2" className={classes.lineSpacing}>
						<strong className={classes.boldFont + ' ' + classes.mobileHide}>
							Phone number(s):{' '}
						</strong>
						{phones.map((phone) => (
							<Phone
								key={phone._id}
								phone={phone}
								classes={classes}
								includeType={true}
							/>
						))}
						<Fa name="phone" className={classes.mobileIcon} />
					</Typography>
				) : null}
				{_.map(locations, (location) => {
					return (
						<div
							key={location._id}
							className={locations.length > 1 ? classes.locationSpacing : null}
						>
							<Typography variant="body2" className={classes.lineSpacing}>
								<strong className={classes.boldFont}>
									{location.name || 'Location'}:{' '}
								</strong>
								{AddressParser({address: location})}
								<Fa name="map-marker" className={classes.mobileIcon} />
							</Typography>
						</div>
					);
				})}
				{_.map(schedules, (schedule) => {
					let sched;
					return (
						<div
							key={schedule._id}
							className={schedules.length > 1 ? classes.locationSpacing : null}
						>
							<Typography variant="body2" className={classes.lineSpacing}>
								<strong className={classes.boldFont}>{`Schedule: `}</strong>
								{schedule.name}
								<Fa name="map-marker" className={classes.mobileIcon} />
							</Typography>
							{schedule && (sched = ScheduleParser({schedule})).length ? (
								<Typography variant="body2" className={classes.lineSpacing}>
									<strong
										className={classes.boldFont + ' ' + classes.mobileHide}
									>
										Hours:{' '}
									</strong>
									{sched
										.map((sch) => {
											return sch.days + ' ' + sch.time;
										})
										.join(', ')}
									<Fa name="clock-o" className={classes.mobileIcon} />
								</Typography>
							) : null}
							{schedule && schedule.note && trim(schedule.note).length ? (
								<Typography variant="body2" className={classes.lineSpacing}>
									<strong className={classes.boldFont}>
										Additional Information:{' '}
									</strong>
									{schedule.note}
									<Fa name="info-circle" className={classes.mobileIcon} />
								</Typography>
							) : null}
						</div>
					);
				})}
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(Visit);
