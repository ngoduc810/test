import './App.css'
import styled from 'styled-components';
import NewTask from './components/NewTask';
import TodoList from './components/TodoList';
import { useState } from 'react';
import { stateContext } from './components/Context.js';

function App() {
  const [state, setState] = useState(() => JSON.parse(localStorage.getItem('item')) ?? [])
  return (
    <Component>
      <stateContext.Provider value={{state, setState}}>
        <NewTask />
        <TodoList />
      </stateContext.Provider>
    </Component>
  );
}

const Component = styled.div`
  width: 1200px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 40px auto;
  border: 1px solid black;
`

export default App;

  // const stateContext = useContext()
  // const [list, setList] = useState(() => JSON.parse(localStorage.getItem('item')) ?? [])
  // console.log(list);
