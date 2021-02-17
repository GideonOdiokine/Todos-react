import React from 'react';
import ListItem from './ListItem';
// import  './index.css';




class App extends React.Component{
 constructor(){
     super();

     this.state = {
         newTodo: '',
         editing: false,
         editIndex:null,
         notification:null,
         todos:[
         {
             id:1,
             name: 'Buy A Car'
         },
         {
             id:2,
             name:' Write some code',
         },
         {
            id:3,
            name:'Go See The Mall'
        },
        {
            id:4,
            name:'Play Golf'
        }
        ]
        }

 }
    handleChange=(e)=>{
        this.setState({newTodo: e.target.value})
    }
    generateTodosId=()=>{
        const lastTodo = this.state.todos[this.state.todos.length -1];
        if(lastTodo){
            return lastTodo.id + 1;
        }
        return 1;
    }
    alert=(notification)=>{
        this.setState({notification});
        setTimeout(()=>{
            this.setState({notification:null});
        },2000)
    }
    SubmitTodo=(e)=>{
        e.preventDefault();
        const newTodo = {
            name:this.state.newTodo,
            id:this.generateTodosId()
        }

        const oldTodos = this.state.todos;
        oldTodos.push(newTodo);

        this.setState({
            todos: oldTodos,
            newTodo:''
        })
        this.alert('todo is added to todos successfully')

    }


    deleteTodo=(index)=>{

        const todos= this.state.todos;

        delete todos[index];

        this.setState({todos})
        this.alert('todo deleted successfully');
    }

    editTodo=(index)=>{
        const todos = this.state.todos[index]

        this.setState({
            editing: true,
            newTodo:todos.name,
            editIndex : index
        })

    }
    updateTodo=()=>{
        const todo = this.state.todos[this.state.editIndex]
        todo.name = this.state.newTodo;

        const todos = this.state.todos;
        todos[this.state.editIndex]=todo;

        this.setState({todos, editing:false,editIndex:null, newTodo:''})
        this.alert('todo is updated successfully')
    }
    render(){
        return(
            <div className="container">
                <h2 className="text-center mt-10 p-4">TODO APP</h2>
                <div className="alert ">
                    <p className="text-center text-white bg-success">{this.state.notification}</p>
                </div>
        
                <input type="text" className="form-control my-4" placeholder="Add new todo" onChange={this.handleChange} value={this.state.newTodo}/>
                <button className="btn-info form-control" onClick={this.state.editing? this.updateTodo : this.SubmitTodo} disabled={this.state.newTodo.length < 5 }>{this.state.editing? 'update todo':'Add Todo'}</button>
                {
                    !this.state.editing && <ul className="list-group">
                    {this.state.todos.map((item,index)=>{
                        return <ListItem editTodo={()=>this.editTodo(index)} item={item} deleteTodo={()=>this.deleteTodo(index)}/>
                    })}
                </ul>
                }
            </div>
        )
    }
}


export default App;