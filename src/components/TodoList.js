import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { stateContext } from './Context';
import { AddTask, BtnAdd, DateSelect, Description, Piority, Selected } from './NewTask'

function TodoList() {
    const date = new Date().toJSON().slice(0,10);
    const [edited, setEdited] = useState('');
    const {state, setState} = useContext(stateContext)
    const [editName, setEditName] = useState(state.map(e => e.job))
    const [editDesc, setEditDesc] = useState(state.map( e => e.desc))
    const [editDate, setEditDate] = useState(state.map(e => e.chooseDate))
    const [editPiority, setEditPiority] = useState( state.map (e => e.piority))
    const [search, setSearch] = useState(state.map((item) => item.job))
    const [check, setCheck] = useState(state.map(e => e.isCompleted))
    const isToggle = check.every(e => e === true);

    useEffect(() => {
        setEditName(state.map(e => e.job))
        setEditDesc(state.map(e => e.desc))
        setEditDate(state.map(e => e.chooseDate))
        setEditPiority(state.map(e => e.piority))
        setSearch(state.map(e => e.job))
        setCheck(state.map(e => e.isCompleted))

    },[state])

    const handerEdit = (i) => {
        setEdited(i)
    }

    const handerRemove = (i) => {
        const newList = [...state]
        newList.splice(i, 1)
        localStorage.setItem('item', JSON.stringify(newList))
        setState(newList);
    }

    const handerSubmit = (e, index) => {
        const newList = [...editName];
        newList.splice(index, 1, e);
        setEditName(newList)
    }

    const handerEditDesc = (e, index) => {
        const newList = [...editDesc];
        newList.splice(index, 1, e);
        setEditDesc(newList)
    }
    const handerEditDate = (e, index) => {
        const newList = [...editDate];
        newList.splice(index, 1, e);
        setEditDate(newList)
    }
    const handerEditPiority = (e, index) => {
        const newList = [...editPiority];
        newList.splice(index, 1, e);
        setEditPiority(newList);
    }
    const handerEdited = (index) => {
        const newJob = {job: editName[index], desc: editDesc[index], chooseDate: editDate[index], piority: editPiority[index]}
        setState( prev => {
            const newList = [...prev];
            newList.splice(index, 1, newJob);
            localStorage.setItem('item', JSON.stringify(newList));
            return newList;
        });
        setEdited(null);
    }
    const handerSearch = (e) => {
        const searchName = editName.map((t, i) => {
            
            if (t.toUpperCase().indexOf(e.toUpperCase()) > -1) {
                return t;
            }else {
                return;
            }
        })
        setSearch(searchName)
    }
    const handerCheckbox = (e, index) => {
        const newLists = [...check]
        newLists.splice(index, 1, !newLists[index])
        setCheck(newLists);
        const newJob = {job: editName[index], desc: editDesc[index], chooseDate: editDate[index], piority: editPiority[index], isCompleted: newLists[index]}
        setState( prev => {
            const newList = [...prev];
            newList.splice(index, 1, newJob);
            localStorage.setItem('item', JSON.stringify(newList));
            return newList;
        });
    }
    const handerDeleteAll = () => {
        const newList = [...state]
        newList.splice(0, newList.length)
        localStorage.setItem('item', JSON.stringify(newList))
        setState(newList);
    }
    return (
    <Component>
        <Todo>
            <h4>To Do List</h4>
            <TodoSearch 
                placeholder='Search ...' 
                onKeyUp={e => handerSearch(e.target.value)}
            />
            {state.map((item, index) => ( 
                search[index] === item.job &&
                <EditTodo key={index}> 
                    <NameTodo>
                        <input type={'checkbox'} 
                            // value = {}
                            checked = {check[index]}
                            onChange={(e) => handerCheckbox(e.target.value, index)}
                        />
                        <span>{item.job}</span>
                        <ButtonControl>
                            <Detail onClick={() => handerEdit(index)}>Detail</Detail>
                            <Remove onClick={() => handerRemove(index)}>Remove</Remove>
                        </ButtonControl>
                    </NameTodo>
                    {index === edited && 
                    <CtnEdit>
                        <AddTask 
                            value={editName[index]} 
                            onChange={ e => handerSubmit(e.target.value, index)}
                        />
                        <Description>
                            <h5>
                                Description
                            </h5>
                            <textarea rows={8} 
                                value={editDesc[index]} 
                                onChange = { e => handerEditDesc(e.target.value, index)}
                            />
                        </Description>
                        <Selected>
                            <DateSelect>
                                <h5>Dua Date</h5>
                                <input type="date" name="ex_rate_date"
                                        min={date} 
                                        value={editDate[index]}
                                        onChange={(e => handerEditDate(e.target.value, index))}
                                />
                            </DateSelect>
                            <Piority>
                                <h5>Piority</h5>
                                <select onChange={(e => (
                                    handerEditPiority(e.target.value, index)
                                ))}
                                        value={editPiority[index]}
                                >
                                    <option value="Normal">Normal</option>
                                    <option value="Low">Low</option>
                                    <option value="Height">Height</option>
                                </select>
                            </Piority>
                        </Selected>
                        <BtnAdd onClick={() => handerEdited(index)}>
                            Update
                        </BtnAdd>
                    </CtnEdit>}
                </EditTodo>    
            ))}
            
            
        </Todo>
        {isToggle && check.length !== 0 && <Action>
            <span>Bulk Action:</span>
            <div>
                <BtnDone>Done</BtnDone>
                <BtnRemove onClick={handerDeleteAll}>Remove</BtnRemove>
            </div>
        </Action>}
    </Component>
  )
}

const Component = styled.div`
    width:60%;
    border-left: 1px solid black;
    min-height: 464px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Todo = styled.div`
    padding: 0 80px 0 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    flex: 1;
`
const TodoSearch = styled.input`
    width: 100%;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding-left: 10px;
    outline: none;
    margin-bottom: 10px;
`

const EditTodo = styled.div`
    border: 1px solid black;
    width: 100%;
    margin-bottom: 30px;
`

const NameTodo = styled.div`
    display: flex;
    height: 60px;
    align-items: center;
    margin: 0 15px;

    input {
        display: flex;
        height: 100%;
        width: 20px;
    }

    span {
        flex: 1;
        margin-left: 15px;
    }
`

const CtnEdit = styled.div`
    border-top: 1px solid black;
    padding: 30px;
    padding-bottom: 0;
`

const ButtonControl = styled.div`
    display: flex;
    align-items: center;
    width: 200px;
    justify-content: space-between;
`

const Detail = styled.button`
    cursor: pointer;
    width: 90px;
    height: 30px;
    background-color: #00bcd4;
    color: white;
    border: none;
    border-radius: 4px;
`
const Remove = styled.button`
    cursor: pointer;
    width: 90px;
    height: 30px;
    background-color: #d9534f;
    color: white;
    border: none;
    border-radius: 4px;
`

const Action = styled.div`
    border-top: 1px solid black;
    width: 100%;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    span {
        flex: 1;
        margin-left: 30px;
    }

    div {
        width: 300px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
`
const BtnDone = styled.button`
    cursor: pointer;
    width: 120px;
    height: 40px;
    border-radius: 4px;
    border: none;
    background-color: #2196f3;
    color: white;
`

const BtnRemove = styled.button`
    cursor: pointer;
    width: 120px;
    height: 40px;
    border-radius: 4px;
    border: none;
    background-color: #d9534f;
    color: white;
`

export default TodoList