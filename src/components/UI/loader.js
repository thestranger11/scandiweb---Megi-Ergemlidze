import React, {Component} from 'react';
import Pulse from '../../assets/pulse.gif';

class Loader extends Component {
	render() { 
		return <img 
			src={Pulse} 
			width={this.props.size ? this.props.size : '60px'} 
			height={this.props.size ? this.props.size : '60px'} 
			alt="loading..."
		/>;
	}
}
 
export default Loader;