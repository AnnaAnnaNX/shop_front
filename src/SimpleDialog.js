import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import { connect } from 'react-redux'
import { addTodo } from './actions/index'
import { Field, reduxForm } from 'redux-form'
import ContactForm from './ContactForm'

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { onClose, onSubmit, isSubmitting, ...others } = this.props;

    return (
       <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...others}>
          <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
          <div>
            <ContactForm onSubmit={onSubmit.bind(this)} isSubmitting={isSubmitting} />     
      
          </div>
        </Dialog>
    );
  }
}

export default SimpleDialog
