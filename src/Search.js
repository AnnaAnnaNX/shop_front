import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Search extends Component {
	search = () => {
		console.log('search');
  	};
  render() {
  	let links = this.props.listLinks
  				? 
  				this.props.listLinks.map(link => link.audio_versions &&
		          							link.audio_versions.template)
  				:
  				this.props.listLinks;
    return (
        <div>
          <input type="text" id="seach_value" />
          <input type="submit" onClick={() => {
          		const text = document.getElementById('seach_value').value;
          		console.log('text ', text);
          		this.props.searchAction(text);
          	}
          } />

          <ul>
          {
	          this.props.listLinks &&
	          this.props.listLinks.length === 0 && (
	          	<p>
	          		Не найдено
	          	</p>
	          )	
          }
          {
          	this.props.listLinks &&
          	this.props.listLinks.length > 0 &&
          	this.props.listLinks.map(link => {
          		if (link.audio_versions && link.audio_versions.template)
          		return (<li key={link.id}>
		          			{
		          				link.audio_versions &&
		          				link.audio_versions.template
		          			}
          			
          				</li>)
          	})
          }
          </ul>
        </div>
    );
  }
}

export default Search;
