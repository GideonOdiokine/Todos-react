import React from 'react';


const ListItem=(props)=>{
    console.log(props)
    return <li className="list-group-item">
    <button onClick={props.editTodo} className="btn-sm btn-success mr-4 mr-2">edit</button>
    {props.item.name}
    <button onClick={props.deleteTodo} className="btn btn-sm btn-danger ml-4 mr-2">X</button>
</li>
}

export default ListItem;