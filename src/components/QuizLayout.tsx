import React, { useEffect, useRef, useState } from "react";
import { Timer } from "./Timer";

type checkAnswer = {
  e: React.MouseEvent<HTMLButtonElement>;
  ans: string;
  index: number;
};

type Quiz = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: "multiple" | "boolean";
};

type Props = {
  quiz: Quiz[];
};

export const QuizLayout = ({ quiz }: Props) => {
  const [lock, setLock] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>();
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    if (quiz.length > 0) {
      setCurrentQuiz(quiz[index]);
      const shuffleAnswers = () => {
        if (currentQuiz) {
          const shuffled = shuffle([
            ...currentQuiz.incorrect_answers,
            currentQuiz.correct_answer,
          ]);
          setAnswers(shuffled);
        }
      };
      shuffleAnswers();
      setCountDown(0)
    }
  }, [quiz, index, currentQuiz]);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_Array = [option1, option2, option3, option4] as React.MutableRefObject<HTMLElement | null>[];

  function shuffle(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  const verifyAnswer = ({ e, ans }: checkAnswer) => {
    e.preventDefault();
    const targetButton = e.target as HTMLButtonElement;
    if (lock === false) {
      if (currentQuiz?.correct_answer === ans) {
        setLock(true);
        setScore(score + 1);
        targetButton.classList.add("bg-green-300");
      } else {
        setLock(true);
        const index = answers.findIndex(
          (answer) => answer === currentQuiz?.correct_answer
        );

        targetButton.classList.add("bg-red-300");
        option_Array[index]?.current?.classList.add("bg-green-300");
      }
    }
  };

  const changeQuestion = () => {
    console.log(lock);
    
    if (lock === true) {
      if (quiz.length - 1 > index) {
        setIndex(index + 1);
        setLock(false);
        option_Array.map((option) => {
          option.current?.classList.remove("bg-green-300");
          option.current?.classList.remove("bg-red-300");
        });
      } else {
        setShowScore(true);
      }
    }
  };
  console.log(showScore);

  useEffect(()=>{
    console.log(index,quiz.length);
    if(index>=quiz.length){
      setShowScore(true)
    }else{
      setShowScore(false)
    }
  },[index,quiz,])


  return (
    <div className="w-[350px] px-10 h-max py-10 shadow">
      {/* Header */}
      {!showScore ? (
        <>
          <div className="w-full">
            <div className="w-full mb-2 flex items-center gap-2">
              <Timer maxValue={30} setCountDown={setCountDown} optionArray={option_Array} countDown={countDown} setIndex={setIndex} />
              <p>Try to Answer Within 30 sec</p>
            </div>
            <p className="w-full text-center">
              {index + 1} of {quiz.length} questions
            </p>
            <p className="">{currentQuiz?.question}</p>
          </div>
          {/* Answers .... */}
          <div className="flex flex-col gap-2 py-4">
            {answers?.map((ans, index) => {
              return (
                <button
                  ref={option_Array[index]as React.MutableRefObject<HTMLButtonElement | null>}
                  disabled={lock}
                  onClick={(e) => {
                    verifyAnswer({ e, ans, index });
                  }}
                  key={index}
                  className="w-full py-2 border text-left px-2 hover:bg-green-200 transition-colors disabled:cursor-not-allowed disabled:hover:bg-none"
                >
                  <span>{String.fromCharCode(65 + index)}.</span> {ans}
                </button>
              );
            })}
          </div>
          {/* Footer */}
          <div className="flex justify-end ">
            <div onClick={changeQuestion} className="cursor-pointer">
              Next
            </div>
          </div>
        </>
      ) : (
        <p>
          You Scored {score} out of {quiz.length}
        </p>
      )}
    </div>
  );
};
