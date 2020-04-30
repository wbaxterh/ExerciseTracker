import React, {Component} from 'react'; //always import these
import  axios  from 'axios'; //for http requests
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise  extends Component{
    constructor(props){
        //always call super when defining the structure of a sub-class
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //state is how you create variables in react
        this.state = {
            username : '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // componentDidMount is a react lifecycyle method
    //called before anything loads on the page
    //kinda like domready I guess
    componentDidMount(){
        axios.get("http://34.224.192.188:5000/users/")
        .then(res =>{
            if (res.data.length > 0){
                this.setState({
                    users: res.data.map(user => user.username),
                    username : res.data[0].username
                })
            }
        });
        

    }

    //add a method onchange
    onChangeUsername(e){
        //always use setState when changing variables
        this.setState({
            username : e.target.value // "e" is basically "this"
        });
    }

        onChangeDescription(e){
            this.setState({
                description : e.target.value 
            });
    }

    onChangeDuration(e){
        this.setState({
            duration : e.target.value 
        });
    }

    onChangeDate(date){
        this.setState({
            date : date
        });
    }
    
    onSubmit(e){
        e.preventDefault();
        //variable just for this method
        const exercise = {
            username : this.state.username,
            description : this.state.description,
            duration: this.state.duration,
            date : this.state.date 
        }

          //submit to the database
        console.log(exercise);

        axios.post("http://34.224.192.188:5000/exercises/add", exercise)
        .then(res => console.log(res.data));

         window.location = "/";
    }


    render(){
        return(
            <div>
            <h3>Create new exercise log</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select ref="userInput"
                    required 
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                        {
                            //map returns something for each element in array
                            //for each user in the array return the options
                            this.state.users.map(function(user){
                                return <option
                                key={user}
                            value={user}>
                                {user}</option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type='text'
                    required
                    className='form-control'
                    value={this.state.description}
                    onChange={this.onChangeDescription}/>
                </div>
                <div className="form-group">
                    <label>Duration (in minutes)</label>
                    <input type='text'
                    required
                    className='form-control'
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker 
                        selected = {this.state.date}
                        onChange = {this.onChangeDate}
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <input type='submit' value='Create Exercise Log' className='btn btn-primary'/>
                </div>
            </form>
            <div><p>You are in the create exercise component!</p></div>
            </div>
        )
    }
}