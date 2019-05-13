import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Snackbar from '@material-ui/core/Snackbar';
import Main from './containers/app';
import Search from './Search';
import Block2 from './Block2';
import Block3 from './Block3';
import Block4 from './Block4';
import Block5 from './Block5';
import Map from './Map';
import SimpleDialog from './SimpleDialog';
import {reset} from 'redux-form';
import { connect } from 'react-redux'
import {
  setVisibilitySnackbar,
  fetchCoubs
} from './actions/index'

class App extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
      isSubmitting: false
    });
  };

  handleClose = value => {
    this.setState({ open: false });
  };

  f1 = (values) => {this.setState({isSubmitting: true})
        var request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {
                console.log('success');
                // document.getElementById('name').value = '';
                // document.getElementById('email').value = '';
                // document.getElementById('phone').value = '';
                this.handleClose();
                this.props.dispatch(reset('contact'));
                this.props.dispatch(setVisibilitySnackbar({VisibilitySnackbar: true, message: 'Форма отправлена'}));
                this.setState({isSubmitting: false})
                return false;
                // js_onSuccess();
            } else
            if(request.readyState == 4) {
              console.log('error');
              this.props.dispatch(setVisibilitySnackbar({VisibilitySnackbar: true, message: 'Ошибка при отправке'}));
              this.setState({isSubmitting: false})
                //js_onError(request.response);
            }
        };

        var subject = 'Запрос с лендинга'; //= document.querySelector("#" + form_id_js + " [name='subject']").value;
        var message =  `
          Name: ${values && values['name'] && values['name'].value},
          Email: ${values && values['email'] && values['email'].value},
          Phone: ${values && values['phone'] && values['phone'].value}
          `;
        var data_js = {};
        data_js['access_token'] = '8e6hnw55do5wg6e7pltwkw6j';
        data_js['subject'] = subject;
        data_js['text'] = message;
        console.log('data_js', data_js);
        var form_data = [];
        for ( var key in data_js ) {
            form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
        }

        var params = form_data.join("&");

        request.open("POST", "https://postmail.invotes.com/send", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.send(params);        
  }

  submit = values => {
    // print the form values to the console
    console.log(values)
  }

  render() {
 //update this with your js_form selector
    var form_id_js = "javascript_form";
console.log('this.state.open ', this.state.open)
console.log('snackbar ', this.props.snackbar)
    return (
      <div className="App">
        <Main />

        <a href='#block1'>Блол 1</a>
        <a href='#block2'>Блол 2</a>
        <a href='#block3'>Блол 3</a>
        <a href='#block4'>Блол 4</a>
        <a href='#block5'>Блол 5</a>

        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open simple dialog
        </Button>
        <SimpleDialog
          // selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
          // f1={this.f1}
          onSubmit={this.f1}
          isSubmitting={this.state.isSubmitting}
        />

        <Search 
          listLinks = {this.props.searchMusic.listLinks}
          searchAction = {(text) => {
            console.log('call searchAction');
            this.props.dispatch(fetchCoubs(text))
          }} 
        />

        <Block2 />
        <Block3 />
        <Block4 />
        <Block5 />
        <Map />


        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.props.snackbar.VisibilitySnackbar}
          autoHideDuration={6000}
          onClose={() => {
            console.log('Close snackbar');
            this.props.dispatch(setVisibilitySnackbar({VisibilitySnackbar: false, message: ''}))}
          }
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.snackbar.message}</span>}
        />

      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    snackbar: state.snackbar,
    searchMusic: state.searchMusic
  }
}

export default connect(mapStateToProps)(App);
