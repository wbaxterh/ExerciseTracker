import React, {Component} from 'react'; //always import these
import { Link } from 'react-router-dom'; //for routing links
import axios from 'axios';

//Funcitonal Component
//no state 
//no didmount component lifecycle
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td><Link className='btn btn-info' to={"/edit/"+props.exercise._id}>edit</Link>  <a className='btn btn-danger' href="#" 
        onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a></td>

    </tr>
)

export default class ExercisesList extends Component{
    constructor(props){
        super(props); //always start with this
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {
            exercises: []
        }
    }
    //methods
    componentDidMount(){
        axios.get("http://34.224.192.188:5000/exercises/")
        .then(res => {
            this.setState({
                exercises: res.data
            })
            console.log(res.data)
            .catch((err) => {console.log(err);
            })
        })
        .catch((err) => {console.log(err);
        }) 
    }

    //delete method
    deleteExercise(id){
        axios.delete("http://34.224.192.188:5000/exercises/" + id)
        .then(res => console.log(res.data));
        this.setState({
            //filter the array of exercises -> return every element that 
            //does not match the id that we deleted
            //underscore id is the automatic mongodb id of row
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }
    //list method

    exerciseList(){
        return this.state.exercises.map(currentexercise =>{
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key = {currentexercise._id} />;
        })
    }

    render(){
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className='table'>
                    <thead className="thead-light">
                        <tr>
                            <th>
                                Username
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Duration
                            </th>
                            <th>
                                Date
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                        {this.exerciseList()}
                    </thead>
                </table>
                
            </div>
        )
    }
}