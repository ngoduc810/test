import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import {stateContext} from './Context'


function NewTask() {
    const date = new Date().toJSON().slice(0,10);
    const [job, setJob] = useState('');
    const [desc, setDesc] = useState('');
    const [chooseDate, setChooseDate] = useState(date);
    const [piority, setPiority] = useState('Nomar');
    const focusRef = useRef();
    const items = {job, desc, chooseDate, piority, isCompleted: false};
    const { setState } = useContext(stateContext);

    const handerSubmit = () => {
        if(job.trim() === '') {
            return;
        }else {
            setState( prev => {
                const a = prev.map(e => e.chooseDate)
                if(a.length === 0) {
                    const newList = [items]
                    localStorage.setItem('item', JSON.stringify(newList));
                }
                else if(a[0] >= chooseDate) {
                    const newList = [items, ...prev];
                    localStorage.setItem('item', JSON.stringify(newList))                    
                }
                else
                {   
                    a.forEach((e, index) => {
                        if (e < chooseDate){
                            const newList = [...prev]
                            newList.splice(index + 1, 0, items)
                            localStorage.setItem('item', JSON.stringify(newList));
                        }
                    })
                }
                return JSON.parse(localStorage.getItem('item'));
                });
            setJob('');
            setDesc('');
            focusRef.current.focus();
        }
    }
  return (
      <>
        <Component>
        <h4>
            New Task
        </h4>
        <AddTask 
            placeholder='Add new tast ...' 
            value={job}
            onChange={(e) => (
                setJob(e.target.value)
            )}
            ref={focusRef}
        />
        <Description>
            <h5>
                Description
            </h5>
            <textarea 
                rows={8} 
                value={desc}
                onChange={(e) => (
                    setDesc(e.target.value)
                )}
            />
        </Description>
        <Selected>
            <DateSelect>
                <h5>Dua Date</h5>
                <input type="date" name="ex_rate_date"
                        min={date} 
                        value={chooseDate}
                        onChange={(e => setChooseDate(e.target.value))}
                />
            </DateSelect>
            <Piority>
                <h5>Piority</h5>
                <select onChange={(e => (
                            setPiority(e.target.value)
                        ))}
                >
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                    <option value="Height">Height</option>
                </select>
            </Piority>
        </Selected>
        <BtnAdd onClick={handerSubmit}>
            Add
        </BtnAdd>
        </Component>
      </>

  )
}

const Component = styled.div` 
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding:0 50px 0 40px;
`

export const AddTask = styled.input`
    width: 100%;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding-left: 10px;
    outline: none;
`
export const Description = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;

    h5 {
        margin: 0;
    }

    textarea {
        margin-top: 5px;
        /* min-height: 120px; */
        outline: none;
        padding: 5px;
    }
`
export const Selected = styled.div`
    display:flex;
    width: 100%;
    margin-bottom: 30px;
    justify-content: space-between;
`

export const DateSelect = styled.div` 
    display: flex;
    flex-direction: column;
    width: 45%;

    h5 {
        margin-bottom: 5px;
    }

    input {
        height: 30px;
        outline: none;
    }

`

export const Piority = styled.div`
    display: flex;
    flex-direction: column;
    width: 45%;

    h5 {
        margin-bottom: 5px;
    }
    select {
        height: 30px;
        outline: none;
    }
`

export const BtnAdd = styled.button`
    cursor: pointer;
    width: 100%;
    height: 32px;
    border-radius: 4px;
    border: none;
    background-color: #5cb85c;
    color: white;
    margin: 30px 0;
`


export default NewTask

// name="trip-start"