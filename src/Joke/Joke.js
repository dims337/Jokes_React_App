import React,{Component} from 'react';
import '../Joke/Joke.css'


class Joke extends Component{



    getColor=()=>{
        if (this.props.vote >= 15){
            return "#4caf50"
        }else if (this.props.vote>=12){
            return "#8bc34a"
        }else if(this.props.vote >= 9){
            return "#CDDC39"
        }else if(this.props.vote >= 6){
            return "FFEB3B"
        }else if(this.props.vote >= 3){
            return 'FFC107'
        }else if (this.props.vote >=0){
            return "#FF9800"
        }else{
            return "#f44336"
        }
    }

    getEmojis=()=>{
        if (this.props.vote >= 15){
            return "em em-rolling_on_the_floor_laughing aria-role=presentation aria-label=ROLLING ON THE FLOOR LAUGHING"
        }else if (this.props.vote>=12){
            return "em em-laughing aria-role=presentation aria-label=SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES"
        }else if(this.props.vote >= 9){
            return "em em-smiley aria-role=presentation aria-label=SMILING FACE WITH OPEN MOUTH"
        }else if(this.props.vote >= 6){
            return "em em-grimacing aria-role=presentation aria-label=GRIMACING FACE"
        }else if(this.props.vote >= 3){
            return "em em-neutral_face aria-role=presentation aria-label=NEUTRAL FACE"
        }else if (this.props.vote >=0){
            return "em em-confused aria-role=presentation aria-label=CONFUSED FACE"
        }else{
            return "em em-angry aria-role=presentation aria-label=ANGRY FACE"
        }
    }



    render(){
        return(
            <div className='Joke'>
                <div className='Joke-btn'>
                    <i className='fas fa-arrow-up' onClick={this.props.upvote}></i>
                    <span className='Joke-votes' style={{borderColor:this.getColor()}}>{this.props.vote}</span>
                    <i className='fas fa-arrow-down' onClick={this.props.downvote}></i>
                </div>
                <div className='Joke-text'>{this.props.joke}</div>
                <div className='Joke-smiley' >
                <i className={this.getEmojis()}></i>
                </div>
            </div>
            
        )
    }
}


export default Joke