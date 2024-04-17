import { useEffect, useState } from "react"
import { QuizLayout } from "./components/QuizLayout"
import axios from "axios";
import { categories, difficulty } from "./data/data";

type options = {
  category: string,
  difficulty: string,
}

const App = () => {
  const [quiz,setQuiz] = useState([]);
  const [startQuiz,setStartQuiz] = useState<boolean>(false)
  const [options,setOptions] = useState<options>({
    category:"",
    difficulty:""
  })
  const [loading,setLoading] = useState<boolean>(false);

  

console.log(options);


console.log(quiz);

const handleInputChange = (event : React.ChangeEvent<HTMLSelectElement>)=>{
  const { name, value } = event.target; 
  setOptions({ ...options, [name]: value });
}

const getQuiz = async (e:React.MouseEvent<HTMLFormElement>)=>{
  e.preventDefault();
  setLoading(true)
  try {
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${options.category}&difficulty=${options.difficulty}`);
    setQuiz(response.data.results)
    setStartQuiz(true)
  } catch (error) {
    console.log(error);
    alert("Something went wrong")
  }finally{
    setLoading(true)
  }
}



  return (
    <div className="w-full h-screen flex items-center justify-center">
      {
        !startQuiz?
        <div className="w-[350px] px-10 h-max py-10 shadow">
          <h1>Welcome to Quiz App</h1>
          <form onSubmit={getQuiz} className="flex flex-col">
          <select required className="border mt-4 py-2 " name="category" id="categories" onChange={handleInputChange}>
            <option value="" selected>Select a category</option>
             {
                categories.map((category,index)=>{
                  return <option key={index} value={category.id}>{category.label}</option>
                })
             }
          </select>
          <select required className="border mt-4 py-2 " name="difficulty" id="difficulty" onChange={handleInputChange}>
            <option value="" selected>Select Difficulty</option>
             {
                difficulty.map((category,index)=>{
                  return <option key={index} value={category.id}>{category.label}</option>
                })
             }
          </select>
          <button disabled={loading} className="bg-black text-white mt-4 py-2 px-2 disabled:opacity-40 disabled:cursor-pointer">Start Quiz</button>
          </form>
        </div>
        :
        <QuizLayout quiz = {quiz}/>
      }
    </div>
  )
}

export default App
