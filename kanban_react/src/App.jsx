import { useState, useEffect } from 'react'
import { Route,Routes } from 'react-router-dom'
import axios from 'axios'
import Layout from './component/layout'
import MainPage from './pages/mainPage'

function App() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
      // 스프링 부트 서버에서 데이터를 가져옵니다.
      axios.get('http://localhost:8080/tasks')
        .then(response => {
          setTasks(response.data);
          console.log("response.data : ",response.data);
        })
        .catch(error => console.error("에러 발생!", error));
      console.log("tasks : ",tasks);
    }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route index element={<MainPage></MainPage>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
