import React,{Component} from 'react';
import Joke from '../Joke/Joke'
import axios from 'axios'
import '../JokeList/jokeList.css'
import uuid from 'uuid/v4'


class JokeList extends Component{

    state={
        jokes:JSON.parse(window.localStorage.getItem("jokes") || "[]"),
        isLoading: false
    }

    componentDidMount(){

        if(this.state.jokes.length === 0) this.getJokes()
        
    }

    async getJokes(){

        try{
        let jokes=[];

        while(jokes.length<10){
            const api_url = 'https://icanhazdadjoke.com/'
            let res = await axios.get(api_url, {headers: {Accept:"application/json"}});
             jokes.push({id: uuid(), jokes:res.data.joke, vote: 0})
        }
        this.setState(st=>({
            jokes:[...st.jokes, ...jokes], isLoading:false
        }),
        ()=>window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        )
    }catch(e){
        alert(e);
        this.setState({isLoading:false})
    }
       
    }


    handleVote(id, delta){
        this.setState(st=>({
            jokes:st.jokes.map(j=>(
                j.id === id ? {...j, vote:j.vote+delta} : j
            ))

        }),
        ()=>window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        )
        
        
    }


    handleclick=()=>{
        this.setState({isLoading:true}, this.getJokes)
    }
    render(){
        if(this.state.isLoading){
            return (
                <div className='spinner'>
                    <i className='far fa-8x fa-laugh fa-spin'/>
                    <h1 className="jokelist-title">Loading...</h1>
                </div>
            )
        }
        let sortedJokes = this.state.jokes.sort((a,b)=>b.vote - a.vote)


        let jokeList = sortedJokes.map(j=>(
            <ul>
            
                    <Joke 
                    key={j.id} 
                    joke={j.jokes} 
                    vote={j.vote}
                    upvote={()=>this.handleVote(j.id, 1)}
                    downvote={()=>this.handleVote(j.id, -1)}/>
                
            </ul>
        ))

        return(
            
            <div className='jokeList'>
                <div className='jokeList-sidebar'>
                    <h1 className='jokeList-title'><span>Dad</span> Jokes</h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                    <button className='button' onClick={this.handleclick}>Get More Jokes!</button>
                </div>

                <div className='jokelist-joke'>
                    {jokeList}
                 </div>
            </div>
                
           
        )
    }
}


export default JokeList;