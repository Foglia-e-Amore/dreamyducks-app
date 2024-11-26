import Header from '../Header';
import PolyatomicList from '../../datas/PolyatomicList';
import './EQL.css';
import React, { useState, useEffect, useRef } from 'react';

function EQL() { 
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [isFormulaToName, setIsNameToFormula] = useState(true)
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [element, setElement] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answerInput, setAnswerInput] = useState("");
    const [time, setTime] = setInterval = useState(0);
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [isHintUsed, setIsHintUsed] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const cardItems = PolyatomicList.map(item =>
        <ElementCard name={item.name} formula={item.formula}/>
    );

    const requestRef = useRef();
    const previousTimeRef = useRef();

    //comment
    const animate = timeStamp => {
        if(!previousTimeRef.current) {
            previousTimeRef.current = timeStamp;
        }
        const deltaTime = (timeStamp - previousTimeRef.current) /1000; //conver to second

        if(!isGameOver && deltaTime >= 0.1) {
            setTime(prevTime => +(prevTime + deltaTime).toFixed(1));
            previousTimeRef.current = timeStamp;
        } 

        requestRef.current = requestAnimationFrame(animate);
    }; 

    useEffect(() => { 
            requestRef.current = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(requestRef.current); 
    }, [isGameOver]); 

    
    useEffect(() => {
        console.log("Initialize");
        const list = shuffleArray([...PolyatomicList]);
        setShuffledQuestions(list);
        
        setQuestionIndex(0);
        setElement(list[0]);

        if(isFormulaToName) {
            setQuestion(list[0].formula)
            setAnswer(list[0].name)
        } else {
            setQuestion(list[0].name)
            setAnswer(list[0].typeFormula)
        }
    }, []);
    const onSwitchGameMode = () => {
        setIsNameToFormula(prevState => {
            let newState = !prevState

            const list = shuffleArray([...PolyatomicList]);
            setShuffledQuestions(list);
            setElement(list[0]);

            if(newState) {
                setQuestion(list[0].formula)
                setAnswer(list[0].name)
            } else {
                setQuestion(list[0].name);
                setAnswer(list[0].typeFormula)
            }
            return newState;
        });

        
        setQuestionIndex(0);

        setAnswerInput("")
        setIsHintUsed(false)
        setIsGameOver(false)
        setScore(0)
        setMaxScore(0)
    }

    const onAnswerChange = (e) => {
        setAnswerInput(e.target.value);
    }

    const onHintClick = () => {
        console.log("length of shuffledquestions:" + shuffledQuestions.length);

        let firstThreeChars = answer.substring(0, 2);
        if(isHintUsed) {
            if(!isGameOver) {
            setMaxScore(maxScore + 10);

            if(questionIndex < shuffledQuestions.length -1) {
                setNextQuestion();
            } else { //End of game
                setIsGameOver(true);
            }}
        } else {
            setAnswerInput(firstThreeChars);
            setIsHintUsed(true);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          onSubmitClick();
        }
      };

    const onSubmitClick = () => {
        console.log("type formula:" + element.typeFormula);
        console.log("Answer input " + answerInput);
        if(answerInput === answer) {
            if(!isGameOver) {
            console.log("answer is correct");
            if(isHintUsed) {
                setScore(score + 5)
;            } else {
                setScore(score + 10);
            }
            setMaxScore(maxScore + 10);

            if(questionIndex < shuffledQuestions.length -1) {
                setNextQuestion();
            } else { //End of game
                setIsGameOver(true);
            }}
        }
    }

    const setNextQuestion = () => {
        setIsHintUsed(false);
        setAnswerInput("");
        setQuestionIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          setElement(shuffledQuestions[newIndex]);
          if(isFormulaToName) {
            setQuestion(shuffledQuestions[newIndex]?.formula)
            setAnswer(shuffledQuestions[newIndex]?.name)
          } else {
            setQuestion(shuffledQuestions[newIndex]?.name);
            setAnswer(shuffledQuestions[newIndex]?.typeFormula);
          }
          return newIndex;
        });
        console.log("new question setted");
        console.log("index" + questionIndex);
      }

      const ResetGame = () => {
        const list = shuffleArray([...PolyatomicList]);
        setShuffledQuestions(list);
        setElement(list[0]);

        if(isFormulaToName) {
            setQuestion(list[0].formula)
            setAnswer(list[0].name)
        } else {
            setQuestion(list[0].name);
            setAnswer(list[0].typeFormula)
        }
        setQuestionIndex(0);

        setAnswerInput("")
        setIsHintUsed(false)
        setIsGameOver(false)
        setScore(0)
        setMaxScore(0)
        setTime(0);
        previousTimeRef.current = null;
    }

    return(
        <div className="EQL">
            <Header />
            <div className='EQLBody'>
                <h1>Element Quick Learn</h1>
                <div onClick={onSwitchGameMode} className='PlaySelector'>
                    <p>Formula</p>
                    <p>to</p>
                    <p>Name</p>
                </div>
                <div className='PlayDisplay'>
                    <p className='timer'>Time: {time}</p>
                    <p className='score'>Score: {score}/{maxScore}</p>
                    <h2 className='question'>{question}</h2>
                    <input 
                        type="text" 
                        placeholder='Type answer'
                        value={answerInput}
                        onChange={onAnswerChange}
                        onKeyDown={handleKeyPress}
                        className='AnswerInput'>
                    </input>

                    <div className='ControlButtons'>
                        <button onClick={onHintClick} className='HintButton'>{isHintUsed ? "Skip" : "Hint"}</button>
                        <button onClick={onSubmitClick} className='SubmitButton'>Guess</button>
                    </div>
                </div>
                <div className={`gameOverDisplay ${isGameOver ? '' : 'hidden'}`}>
                    <p>Score: {score}</p>
                    <button onClick={ResetGame}>Play Again</button>
                </div>
                <div className='BottomSection'>
                    <div className='DataTableHeading'>
                        <h4>All Datas</h4>
                    </div>
                    <div className='DataTable'>
                        {cardItems}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EQL;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
 
        // Generate random number 
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

function ElementCard(props) {
    return(
        <div className='ElementCard'>
            <p>{props.name}</p>
            <p>{props.formula}</p>
        </div>
    )
}