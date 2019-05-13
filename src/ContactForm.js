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

const required = value => (value || typeof value === 'number' ? undefined : 'Обязательное поле')
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Некорректный email'
    : undefined
const numeric = value =>
  value && /[^0-9]/i.test(value)
    ? 'Only numeric characters'
    : undefined
const maxLength = max => value =>
  value && value.length > max ? `Должно быть ${max} символов или меньше` : undefined    
const maxLength50 = maxLength(50)
const maxLength11 = maxLength(11)
export const minLength = min => value =>
  value && value.length < min ? `Должно быть ${min} символов или больше` : undefined
export const minLength2 = minLength(2)
export const minLength7 = minLength(7)

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

class ContactForm extends React.Component {
  render() {
    const { dispatch, handleSubmit, pristine, reset, submitting, isSubmitting, f1 } = this.props;
console.log('submitting', submitting);
    return (
          <form onSubmit={handleSubmit}>

            <Field name="name"
              type="text"
              component={renderField}       
              validate={[required, maxLength50, minLength2]}
            />


            <Field name="email"
              type="text"
              component={renderField}       
              validate={[email]}
            />


            <Field name="phone"
              type="number"
              component={renderField}       
              validate={[required, numeric, maxLength11, minLength7]}
            />

             <button type="submit" disabled={submitting || isSubmitting}>Submit</button>
             <button type="button" disabled={pristine || submitting || isSubmitting} onClick={reset}>
                Clear Values
              </button>
          </form>
    );
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)