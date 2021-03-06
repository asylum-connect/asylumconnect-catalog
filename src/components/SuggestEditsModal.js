import React, { useState } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import { Button, Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core';
import ThankYou from '../images/thanks.svg'
import { createSuggestion } from '../utils/api'

const styles = (theme) => ({
  title: {
    padding: '15px 0',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    marginBottom: '10px',
  },
  titleText: {
    width: '100%',
    fontSize: '18px',
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    padding: '25px 30px',
  },
  selectContent: {
    width: '100%',
  },
  body: {
    marginBottom: '25px',
  },
  commentBox: {
    padding: '10px',
    marginBottom: '15px',
    fontSize: '14px',
  },
  button: {
    width: '170px',
    height: '30px',
    border: 'solid',
    borderRadius: '100px',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  red: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary[500],
    '&:hover': {
      backgroundColor: theme.palette.primary[200],
    }
  },
  yesEditsPadding: {
    width: '101%',
    marginLeft: '-2px',
    height: '34px',
  },
  blue: {
    color: theme.palette.secondary[500],
  },
  xButton: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: theme.palette.secondary[500],
    position: 'absolute',
    right: '0',
  },
  longer: {
    width: '230px',
  },
  longest: {
    width: '100%',
  },
  tallContainer: {
    padding: '0 20px',
    height: '400px',
  },
  verticalButtons: {
    height: '90px',
  },
  error: {
    color: theme.palette.primary[500],
  }
})

const CONTENT = {
  hasInfo: 'hasInfo',
  selectInfo: 'selectInfo',
  thanks: 'thanks',
}

const SELECT_VALUE = {
  RESOURCE_IS_CLOSED: 'This resource is closed or inactive',
  CONTACT_LOCATION_INCORRECT: 'Contact or location information is incorrect',
  DESCRIPTION_INACCURATE: 'Description is inaccurate',
  OTHER: 'Other',
}

const SuggestEditsModal = ({ classes, open, setOpen, setIsEditing, resource, userData }) => {
  const [content, setContent] = useState(CONTENT.hasInfo)
  const [isResourceClosed, setResourceClosed] = useState(false)
  const [isInfoIncorrect, setInfoIncorrect] = useState(false)
  const [isDescIncorrect, setDescIncorrect] = useState(false)
  const [isOther, setIsOther] = useState(false)
  const [comment, setComment] = useState('')
  const [errorMsg, setError] = useState('')

  const renderHasCorrectInfo = () => {
    return (
      <div>
        <Typography variant="body1" className={classes.body}>Do you have the correct information?</Typography>
        <Grid container direction="column" justify="space-around" classes={{ root: classes.verticalButtons }}>
          <Button
            classes={{ root: classNames(classes.button, classes.yesEditsPadding, classes.red) }}
            onClick={() => {
              setIsEditing(true)
              onClose()
            }}
          >
            Yes, I'll make the edits
            </Button>
          <Button
            classes={{ root: classNames(classes.button, classes.longest, classes.blue) }}
            onClick={() => setContent(CONTENT.selectInfo)}
          >
            No, but I know it's wrong
            </Button>
        </Grid>
      </div>
    )
  }

  const renderSelections = () => {
    return (
      <Grid container direction="column" alignItems="center">
        <Grid container direction="column" className={classes.selectContent}>
          <Typography variant="body1">What information is incorrect?</Typography>
          <FormControlLabel control={<Checkbox checked={isResourceClosed} onChange={() => handleCheck(isResourceClosed, setResourceClosed)} />} label={SELECT_VALUE.RESOURCE_IS_CLOSED} />
          <FormControlLabel control={<Checkbox checked={isInfoIncorrect} onChange={() => handleCheck(isInfoIncorrect, setInfoIncorrect)} />} label={SELECT_VALUE.CONTACT_LOCATION_INCORRECT} />
          <FormControlLabel control={<Checkbox checked={isDescIncorrect} onChange={() => handleCheck(isDescIncorrect, setDescIncorrect)} />} label={SELECT_VALUE.DESCRIPTION_INACCURATE} />
          <FormControlLabel control={<Checkbox checked={isOther} onChange={() => handleCheck(isOther, setIsOther)} />} label={SELECT_VALUE.OTHER} />
          <label for="comment"><Typography variant="body1">Your comment</Typography></label>
          <textarea
            id="comment"
            name="title"
            placeholder="Add a note..."
            rows={5}
            className={classes.commentBox}
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </Grid>
        <Button
          classes={{ root: classNames(classes.button, classes.red) }}
          onClick={() => handleSubmit()}
        >
          Submit
            </Button>
        {errorMsg && <Typography variant='caption' className={classes.error}>{errorMsg}</Typography>}
      </Grid>
    )
  }

  const renderThankYou = () => {
    return (
      <Grid container direction="column" justify="space-around" alignItems="center" classes={{ root: classes.tallContainer }}>
        <div className={classes.titleText}>Thank you!</div>
        <Typography variant="body1">Our team has received your proposed edits and will update the relevant page(s) shortly.</Typography>
        <img src={ThankYou} alt="super thank you" />
        <Button
          classes={{ root: classNames(classes.button, classes.longer, classes.blue) }}
          onClick={onClose}
        >
          Close
            </Button>
      </Grid>
    )
  }

  const renderContent = () => {
    switch (content) {
      case CONTENT.hasInfo:
        return renderHasCorrectInfo()
      case CONTENT.selectInfo:
        return renderSelections()
      case CONTENT.thanks:
        return renderThankYou()
    }
  }

  const handleCheck = (checkVal, setCheckVal) => {
    setCheckVal(!checkVal)
  }

  const handleSubmit = () => {
    const suggestions = []
    const sharedInfo = {
      organizationId: resource._id,
      userEmail: userData.email,
    }

    if (isResourceClosed) {
      suggestions.push({
        ...sharedInfo,
        field: 'Schedule',
        value: SELECT_VALUE.RESOURCE_IS_CLOSED + (comment ? `. ${comment}` : ''),
      })
    }

    if (isInfoIncorrect) {
      suggestions.push({
        ...sharedInfo,
        field: 'Location',
        value: SELECT_VALUE.CONTACT_LOCATION_INCORRECT + (comment ? `. ${comment}` : ''),
      })
    }

    if (isDescIncorrect) {
      suggestions.push({
        ...sharedInfo,
        field: 'Description',
        value: SELECT_VALUE.DESCRIPTION_INACCURATE + (comment ? `. ${comment}` : ''),
      })
    }

    if (isOther) {
      suggestions.push({
        ...sharedInfo,
        field: 'Description',
        value: SELECT_VALUE.OTHER + (comment ? `. ${comment}` : ''),
      })
    }

    if (suggestions.length) {
      createSuggestion(suggestions)
        .then(() => {
          setContent(CONTENT.thanks)
        })
        .catch((error) => {
          setError(error.message)
        })
    } else {
      setContent(CONTENT.thanks)
    }
  }

  const onClose = () => {
    setContent(CONTENT.hasInfo)
    setComment('')
    setResourceClosed(false)
    setInfoIncorrect(false)
    setDescIncorrect(false)
    setIsOther(false)
    setOpen(false)
    setError('')
  }

  return (
    <Modal
      ariaHideApp={false}
      style={{
        overlay: {
          background: 'rgba(29,31,35,0.55)',
        },
        content: {
          position: 'absolute',
          top: '30%',
          left: '35%',
          bottom: 'auto',
          width: '450px',
          padding: 0,
          fontFamily: '"Open Sans", sans-serif',
          background: '#FFFFFF',
          borderWidth: '5px',
          borderStyle: 'solid none none none',
          borderColor: ' #5073B3',
          boxShadow: '3px 0px 10px rgba(0,0,0,0.1)',
        },
      }}
      isOpen={open}
    >
      {content !== CONTENT.thanks &&
        <Grid container direction="row" alignItems="center" className={classes.title} >
          <div className={classes.titleText}>Suggest Edits</div>
          <Button classes={{ root: classes.xButton }} onClick={onClose}>x</Button>
        </Grid>
      }
      <div className={classes.content}>
        {renderContent()}
      </div>
    </Modal>
  )
}

export default withStyles(styles)(SuggestEditsModal);