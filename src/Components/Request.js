import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const moment = require('moment');

moment().format();

const styles = theme => ({
    card: {
      width: 425,
      marginTop: 10,
      marginBottom: 10,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      margin: 10,
      bigAvatar: {
          margin: 20,
          width: 60,
          height: 60,
      },
    },
  });

const Request = function(props) {
    const [userName, setUserNameValue] = useState('');
    const [picture, setPictureValue] = useState('');
    const [expandedValue, setExpandedValue] = useState(false);

    useEffect(() => {
        getUserName();

    }, [])

    const handleExpandClick = () => {
        setExpandedValue(!expandedValue);
    }
    const getUserName = () => {
        var id = props.request.userId;
        var query = `query getUserName($id: String) {
            getUser(id: $id) {
                name
                picture
            }
        }`;
        fetch(`/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json',
            'Accept': 'application/json' 
          },
          body: JSON.stringify({
            query,
            variables: {
                id
            }
          })
        })
        .then(r => r.json())
        .then(function(res) {
            setUserNameValue(res.data.getUser.name)
            return res
        })
        .then(res => setPictureValue(res.data.getUser.picture))
    }
    const { classes } = props;
    return (

        <div>
            <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar alt='http://chittagongit.com//images/default-user-icon/default-user-icon-28.jpg' src={(picture !== '') ? picture : 'http://chittagongit.com//images/default-user-icon/default-user-icon-28.jpg'} className={classes.bigAvatar} />
                }
                action={
                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>
                }
                title={userName || "no user"}
                subheader={moment(props.request.createdAt).fromNow()}
                />
                <CardContent>
                    <Typography variant="title" >
                        {props.request.subject || "no subject"}
                    </Typography>
                    <Typography variant="caption" >
                        {props.request.location || "unknown location"}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    {/* <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton> */}
                    <IconButton
                        className={classnames(classes.expand, {
                        [classes.expandOpen]: expandedValue,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expandedValue}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expandedValue} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                        {props.request.request || "no request"}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}

Request.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Request);