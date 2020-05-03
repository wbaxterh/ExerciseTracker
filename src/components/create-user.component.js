import React, {Component} from 'react'; //always import these
import  axios  from 'axios'; // for http calls

export default class CreateUser extends Component{

/////////
    //define constructor
/////////
    constructor(props){
        //always call super when defining the structure of a sub-class
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this); 
        this.onSubmit = this.onSubmit.bind(this);

        //state is how you create variables in react
        this.state = {
            username : '',
        }
    }

////
//////methods
/////

    //add a method onchange
    onChangeUsername(e){
        //always use setState when changing variables
        this.setState({
            username : e.target.value // "e" is basically "this"
        });
    }
    onSubmit(e){
        e.preventDefault();
        //variable just for this method
        const user = {
            username : this.state.username,
        }

        console.log(user);

        axios.post("http://50.16.77.250:5000/users/add", user)
        .then(res => console.log(res.data));
        //return yusername field to blank
        this.setState ({
            username: ''
        });
    };

///////
/////////render
////
    render(){
        return(
            <div>
                <h3>Create new User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label> Username </label>
                        <input type='text'
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername} />

                    </div>
                    <div className='form=group'>
                        <input type='submit' value='Create User' className='btn btn-primary'/>
                    </div>
                </form>
            </div>
        )
    }
}