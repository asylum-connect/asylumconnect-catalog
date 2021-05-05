import React, {useState, Fragment} from 'react';
import _ from 'lodash';

import {
	FormControl,
	Grid,
	Select,
	TextField,
	Typography
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import {withStyles} from '@material-ui/core/styles';
import AutoComplete from '@material-ui/lab/Autocomplete';

import AsylumConnectButton from '../AsylumConnectButton';
import AsylumConnectCheckbox from '../AsylumConnectCheckbox';
import {InformationIcon} from '../icons';

import {days} from '../Parser';
import {TimeZones} from '../../utils/convertTime';

const styles = (theme) => ({
	container: {
		border: `1px solid ${theme.palette.grey[400]}`,
		borderRadius: '4px',
		padding: '25px',
		marginTop: '25px'
	},
	sectionHeader: {
		marginBottom: '20px'
	},
	inputLabel: {
		marginBottom: '3px',
		fontWeight: '600'
	},
	days: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	weekends: {
		display: 'flex',
		justifyContent: 'center'
	},
	weekend: {
		margin: '15px 15px'
	},
	weekday: {
		width: '18%'
	},
	addButton: {
		marginTop: '25px'
	},
	deleteButton: {
		paddingTop: '20px',
		paddingLeft: '10px',
		cursor: 'pointer'
	},
	inputGroup: {
		marginBottom: '45px'
	},
	select: {
		minWidth: '100%'
	},
	divider: {
		borderTop: `1px solid ${theme.palette.grey[400]}`,
		margin: '25px 0'
	},
	checkbox: {
		margin: '0 0'
	},
	scheduleNote: {
		marginTop: '16px'
	},
	disabled: {
		fontStyle: 'italic',
		backgroundColor: `${theme.palette.secondary[50]}`
	},
	clearButton: {
		cursor: 'pointer'
	}
});

const noOption = {
	twelveFormat: '',
	twentyFourFormat: ''
};

const timeOptions = _.map(_.range(0, 24, 0.5), (time) => {
	const hour = Math.floor(time);
	const min = time % 1 === 0 ? '00' : '30';
	const dayNight = hour < 12 ? 'AM' : 'PM';
	const twelve = hour > 12 ? hour - 12 : hour || 12;
	return {
		twelveFormat: `${twelve}:${min} ${dayNight}`,
		twentyFourFormat: `${hour < 10 ? 0 : ''}${hour}:${min}`
	};
});

const allOptions = [noOption, ...timeOptions];

const EditVisit = ({
	classes,
	website,
	phones,
	emails,
	locations,
	schedules,
	renderSaveButtons
}) => {
	const [websiteEdit, setWebsite] = useState(website || '');
	// const [emailsEdit, setEmails] = useState(emails.length ? emails : [{}]);
	const [emailsEdit, setEmails] = useState(
		emails?.length
			? emails
			: [
					{
						email: 'test@gmail.com',
						title: 'Mx.',
						first_name: 'Test',
						last_name: 'Testerson'
					},
					{email: 'test2@gmail.com', first_name: 'Jeff'},
					{email: 'test3@gmail.com', title: 'Mr.', last_name: 'Esther'}
			  ]
	);
	const [phonesEdit, setPhones] = useState(phones?.length ? phones : [{}]);
	const [locationsEdit, setLocations] = useState(
		locations?.length ? locations : [{}]
	);
	const [schedulesEdit, setSchedules] = useState(
		schedules?.length ? schedules : [{}]
	);

	const renderDelete = (onClick) => {
		return (
			<div className={classes.deleteButton} onClick={onClick}>
				<Typography variant="h5" color="primary">
					(DELETE)
				</Typography>
			</div>
		);
	};

	const renderDivider = () => {
		return <Grid item xs={12} className={classes.divider} />;
	};

	const renderTimeInput = (
		startTime,
		endTime,
		isEnd,
		closed,
		open24,
		setStart,
		setEnd
	) => {
		const scheduleTime = isEnd ? endTime : startTime;
		return (
			<AutoComplete
				value={
					_.find(timeOptions, (t) => t.twentyFourFormat === scheduleTime) ||
					noOption
				}
				onChange={(event, value) => {
					isEnd
						? setEnd(value.twentyFourFormat)
						: setStart(value.twentyFourFormat);
				}}
				options={
					startTime && isEnd
						? _.filter(
								allOptions,
								(option) => option.twentyFourFormat > startTime
						  )
						: allOptions
				}
				getOptionLabel={(option) => option.twelveFormat}
				disabled={closed || open24}
				forcePopupIcon={false}
				disableClearable
				fullWidth
				renderInput={
					closed || open24
						? () => (
								<TextField
									variant="outlined"
									color="secondary"
									fullWidth
									disabled={closed || open24}
									value={closed ? 'Closed' : 'Open 24hr'}
									classes={closed || open24 ? {root: classes.disabled} : {}}
								/>
						  )
						: (params) => {
								return (
									<TextField {...params} variant="outlined" color="secondary" />
								);
						  }
				}
			/>
		);
	};

	const addEntry = (collection, setCollectionFunc) => {
		const collectionCopy = _.cloneDeep(collection);
		collectionCopy.push({});
		setCollectionFunc(collectionCopy);
	};

	const deleteEntry = (collection, idx, setCollectionFunc) => {
		const collectionCopy = _.cloneDeep(collection);
		collectionCopy.splice(idx, 1);
		setCollectionFunc(collectionCopy);
	};

	const applyEdit = (collection, idx, setCollectionFunc, key, value) => {
		const collectionCopy = _.cloneDeep(collection);
		collectionCopy[idx][key] = value;
		setCollectionFunc(collectionCopy);
	};

	const timeZones = _.map(TimeZones, (tz, idx) => {
		return (
			<option key={idx} value={tz.value}>
				{tz.label}
			</option>
		);
	});

	return (
		<Grid container direction="column">
			{/* Web input */}
			<Grid item>
				<Typography variant="body1" className={classes.inputLabel}>
					Website
				</Typography>
				<TextField
					variant="outlined"
					color="secondary"
					value={websiteEdit}
					onChange={({target}) => {
						setWebsite(target.value);
					}}
				/>
			</Grid>

			{/* Emails inputs */}
			<Grid item className={classes.container}>
				<Typography variant="subtitle2" className={classes.sectionHeader}>
					Email(s)
				</Typography>
				<Grid container spacing={3}>
					{_.map(emailsEdit, (email, idx) => {
						return (
							<Fragment key={idx}>
								<Grid item xs={3}>
									<Typography variant="body1" className={classes.inputLabel}>
										Email
									</Typography>
									<TextField
										variant="outlined"
										color="secondary"
										fullWidth
										value={email.email || ''}
										onChange={({target}) => {
											applyEdit(
												emailsEdit,
												idx,
												setEmails,
												'email',
												target.value
											);
										}}
									/>
								</Grid>
								<Grid item xs={2}>
									<Typography variant="body1" className={classes.inputLabel}>
										Title
									</Typography>
									<TextField
										variant="outlined"
										color="secondary"
										fullWidth
										value={email.title || ''}
										onChange={({target}) => {
											applyEdit(
												emailsEdit,
												idx,
												setEmails,
												'title',
												target.value
											);
										}}
									/>
								</Grid>
								<Grid item xs={2}>
									<Typography variant="body1" className={classes.inputLabel}>
										First Name
									</Typography>
									<TextField
										variant="outlined"
										color="secondary"
										fullWidth
										value={email.first_name || ''}
										onChange={({target}) => {
											applyEdit(
												emailsEdit,
												idx,
												setEmails,
												'first_name',
												target.value
											);
										}}
									/>
								</Grid>
								<Grid item xs={3}>
									<Typography variant="body1" className={classes.inputLabel}>
										Last Name
									</Typography>
									<TextField
										variant="outlined"
										color="secondary"
										fullWidth
										value={email.last_name || ''}
										onChange={({target}) => {
											applyEdit(
												emailsEdit,
												idx,
												setEmails,
												'last_name',
												target.value
											);
										}}
									/>
								</Grid>
								<Grid container item xs={2} alignItems="center">
									{emailsEdit.length > 1 &&
										renderDelete(() => {
											deleteEntry(emailsEdit, idx, setEmails);
										})}
								</Grid>
							</Fragment>
						);
					})}
				</Grid>
				<AsylumConnectButton
					variant="secondary"
					className={classes.addButton}
					onClick={() => {
						addEntry(emailsEdit, setEmails);
					}}
				>
					Add new email
				</AsylumConnectButton>
			</Grid>

			{/* Phones inputs */}
			<Grid item className={classes.container}>
				<Typography variant="subtitle2" className={classes.sectionHeader}>
					Phone number(s)
				</Typography>
				<Grid container spacing={3}>
					{_.map(phonesEdit, (phone, idx) => {
						return (
							<Fragment key={idx}>
								<Grid item xs={5}>
									<Typography variant="body1" className={classes.inputLabel}>
										Phone number
									</Typography>
									<TextField
										variant="outlined"
										color="secondary"
										fullWidth
										value={phone.digits || ''}
										onChange={({target}) => {
											applyEdit(
												phonesEdit,
												idx,
												setPhones,
												'digits',
												target.value
											);
										}}
									/>
								</Grid>
								<Grid item xs={5}>
									<Typography variant="body1" className={classes.inputLabel}>
										Label
									</Typography>
									<TextField
										variant="outlined"
										color="secondary"
										fullWidth
										value={phone.phone_type || ''}
										onChange={({target}) => {
											applyEdit(
												phonesEdit,
												idx,
												setPhones,
												'phone_type',
												target.value
											);
										}}
									/>
								</Grid>
								<Grid container item xs={2} alignItems="center">
									{phonesEdit.length > 1 &&
										renderDelete(() => {
											deleteEntry(phonesEdit, idx, setPhones);
										})}
								</Grid>
							</Fragment>
						);
					})}
				</Grid>
				<AsylumConnectButton
					variant="secondary"
					className={classes.addButton}
					onClick={() => {
						addEntry(phonesEdit, setPhones);
					}}
				>
					Add new phone
				</AsylumConnectButton>
			</Grid>

			{/* Locations inputs */}
			<Grid item className={classes.container}>
				<Typography variant="subtitle2" className={classes.sectionHeader}>
					Location
				</Typography>
				{_.map(locationsEdit, (location, idx) => {
					return (
						<Fragment key={idx}>
							<Grid container>
								<Grid container item spacing={3} xs={10}>
									<Grid item xs={8}>
										<Typography variant="body1" className={classes.inputLabel}>
											Address
										</Typography>
										<TextField
											variant="outlined"
											color="secondary"
											fullWidth
											value={location.address || ''}
											onChange={({target}) => {
												applyEdit(
													locationsEdit,
													idx,
													setLocations,
													'address',
													target.value
												);
											}}
										/>
									</Grid>
									<Grid item xs={4}>
										<Typography variant="body1" className={classes.inputLabel}>
											P.O. Box, Apt, Etc
										</Typography>
										<TextField
											variant="outlined"
											color="secondary"
											fullWidth
											value={location.unit || ''}
											onChange={({target}) => {
												applyEdit(
													locationsEdit,
													idx,
													setLocations,
													'unit',
													target.value
												);
											}}
										/>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="body1" className={classes.inputLabel}>
											City
										</Typography>
										<TextField
											variant="outlined"
											color="secondary"
											fullWidth
											value={location.city || ''}
											onChange={({target}) => {
												applyEdit(
													locationsEdit,
													idx,
													setLocations,
													'city',
													target.value
												);
											}}
										/>
									</Grid>
									<Grid item xs={2}>
										<Typography variant="body1" className={classes.inputLabel}>
											State
										</Typography>
										<TextField
											variant="outlined"
											color="secondary"
											fullWidth
											value={location.state || ''}
											onChange={({target}) => {
												applyEdit(
													locationsEdit,
													idx,
													setLocations,
													'state',
													target.value
												);
											}}
										/>
									</Grid>
									<Grid item xs={4}>
										<Typography variant="body1" className={classes.inputLabel}>
											Zip Code
										</Typography>
										<TextField
											variant="outlined"
											color="secondary"
											fullWidth
											value={location.zip_code || ''}
											onChange={({target}) => {
												applyEdit(
													locationsEdit,
													idx,
													setLocations,
													'zip_code',
													target.value
												);
											}}
										/>
									</Grid>
								</Grid>
								<Grid
									container
									item
									xs={2}
									justify="center"
									alignItems="center"
								>
									{locationsEdit.length > 1 &&
										renderDelete(() => {
											deleteEntry(locationsEdit, idx, setLocations);
										})}
								</Grid>
							</Grid>
							{renderDivider()}
						</Fragment>
					);
				})}
				<AsylumConnectButton
					variant="secondary"
					onClick={() => addEntry(locationsEdit, setLocations)}
				>
					Add new location
				</AsylumConnectButton>
			</Grid>

			{/* Schedules inputs */}
			<Grid container item className={classes.container} justify="center">
				<Typography variant="subtitle2" className={classes.sectionHeader}>
					Schedules
				</Typography>
				{_.map(schedulesEdit, (schedule, idx) => {
					return (
						<Grid container spacing={2} key={idx}>
							<Grid item xs={10}>
								<Typography variant="body1" className={classes.inputLabel}>
									Name
								</Typography>
								<TextField
									variant="outlined"
									color="secondary"
									fullWidth
									value={schedule.name}
									onChange={({target}) => {
										applyEdit(
											schedulesEdit,
											idx,
											setSchedules,
											'name',
											target.value
										);
									}}
								/>
							</Grid>
							<Grid container item xs={2} justify="center" alignItems="center">
								{schedulesEdit.length > 1 &&
									renderDelete(() => {
										deleteEntry(schedulesEdit, idx, setSchedules);
									})}
							</Grid>

							<Grid item xs={8}>
								<Typography variant="body1" className={classes.inputLabel}>
									Notes (Optional)
								</Typography>
								<TextField
									variant="outlined"
									color="secondary"
									fullWidth
									value={schedule.note}
									onChange={({target}) => {
										applyEdit(
											schedulesEdit,
											idx,
											setSchedules,
											'note',
											target.value
										);
									}}
								/>
							</Grid>
							<Grid item xs={2}>
								<FormControl
									variant="outlined"
									color="secondary"
									className={classes.select}
								>
									<Typography variant="body1" className={classes.inputLabel}>
										Timezone
									</Typography>
									<Select
										value={schedule.timezone}
										onChange={({target}) => {
											applyEdit(
												schedulesEdit,
												idx,
												setSchedules,
												'timezone',
												target.value
											);
										}}
										native
									>
										{timeZones}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={2} />

							<Grid item xs={1} />
							<Grid container item xs={2} justify="center">
								<Typography variant="body1" className={classes.inputLabel}>
									Closed
								</Typography>
							</Grid>
							<Grid container item xs={3} justify="center">
								<Typography variant="body1" className={classes.inputLabel}>
									Open Time
								</Typography>
							</Grid>
							<Grid container item xs={3} justify="center">
								<Typography variant="body1" className={classes.inputLabel}>
									Close Time
								</Typography>
							</Grid>
							<Grid container item xs={2} justify="center">
								<Typography variant="body1" className={classes.inputLabel}>
									Open 24hr
								</Typography>
							</Grid>
							<Grid item xs={1} />

							{_.map(days, (day, dayIdx) => {
								const dayStart = `${day.name.toLowerCase()}_start`;
								const dayEnd = `${day.name.toLowerCase()}_end`;
								const closed =
									schedule[dayStart] === '00:00' &&
									schedule[dayEnd] === '00:00';
								const open24 =
									schedule[dayStart] === '00:00' &&
									schedule[dayEnd] === '24:00';
								const setStart = (value) => {
									const schedulesCopy = _.cloneDeep(schedulesEdit);
									schedulesCopy[idx][dayStart] = value;
									if (schedulesCopy[idx][dayEnd] <= value) {
										delete schedulesCopy[idx][dayEnd];
									}
									setSchedules(schedulesCopy);
								};
								const setEnd = (value) => {
									applyEdit(schedulesEdit, idx, setSchedules, dayEnd, value);
								};
								return (
									<Fragment key={dayIdx}>
										<Grid container item xs={1} alignItems="center">
											<Typography variant="body1">{day.name}</Typography>
										</Grid>
										<Grid container item xs={2} justify="center">
											<AsylumConnectCheckbox
												label=""
												iconSize={{width: '1.5rem', height: '1.5rem'}}
												additionalClasses={{root: classes.checkbox}}
												checked={closed}
												onChange={() => {
													const schedulesCopy = _.cloneDeep(schedulesEdit);
													schedulesCopy[idx][dayStart] = closed
														? '09:00'
														: '00:00';
													schedulesCopy[idx][dayEnd] = closed
														? '17:00'
														: '00:00';
													setSchedules(schedulesCopy);
												}}
											/>
										</Grid>
										<Grid item xs={3}>
											{renderTimeInput(
												schedule[dayStart],
												schedule[dayEnd],
												false,
												closed,
												open24,
												setStart,
												setEnd
											)}
										</Grid>
										<Grid item xs={3}>
											{renderTimeInput(
												schedule[dayStart],
												schedule[dayEnd],
												true,
												closed,
												open24,
												setStart,
												setEnd
											)}
										</Grid>
										<Grid container item xs={2} justify="center">
											<AsylumConnectCheckbox
												label=""
												iconSize={{width: '1.5rem', height: '1.5rem'}}
												additionalClasses={{root: classes.checkbox}}
												checked={open24}
												onChange={() => {
													const schedulesCopy = _.cloneDeep(schedulesEdit);
													schedulesCopy[idx][dayStart] = open24
														? '09:00'
														: '00:00';
													schedulesCopy[idx][dayEnd] = open24
														? '17:00'
														: '24:00';
													setSchedules(schedulesCopy);
												}}
											/>
										</Grid>
										<Grid container item xs={1} alignItems="center">
											{(schedule[dayStart] || schedule[dayEnd]) && (
												<div
													className={classes.clearButton}
													onClick={() => {
														const schedulesCopy = _.cloneDeep(schedulesEdit);
														delete schedulesCopy[idx][dayStart];
														delete schedulesCopy[idx][dayEnd];
														setSchedules(schedulesCopy);
													}}
												>
													<ClearIcon color="disabled" />
												</div>
											)}
										</Grid>
									</Fragment>
								);
							})}
							{renderDivider()}
						</Grid>
					);
				})}
				<Grid item xs={12}>
					<AsylumConnectButton
						variant="secondary"
						onClick={() => {
							addEntry(schedulesEdit, setSchedules);
						}}
					>
						Add new schedule
					</AsylumConnectButton>
				</Grid>
				<Grid
					container
					item
					xs={12}
					spacing={1}
					direction="row"
					className={classes.scheduleNote}
				>
					<Grid item>
						<InformationIcon />
					</Grid>
					<Grid item>
						<Typography variant="body2">
							Add another schedule if you have programs or locations operating
							at different hours.
						</Typography>
					</Grid>
				</Grid>
			</Grid>

			{renderSaveButtons && renderSaveButtons()}
		</Grid>
	);
};

export default withStyles(styles)(EditVisit);
