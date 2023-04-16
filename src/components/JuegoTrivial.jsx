import axios from "axios";
import React, { useState } from "react";


export default function JuegoTrivial(){

    const [questions, setQuestions] = useState([]);
    const [amountQuestions, setAmountQuestions] = useState(0);

    //Elegimos el número de preguntas que queremos
    const handleAmountChange = (e) => {
        setAmountQuestions(e.target.value)
    }

    //Añadimos las preguntas
    const addQuestions = () => {
        axios.get(`https://opentdb.com/api.php?amount=${amountQuestions}`).then( res => {
            console.log(res.data.results);
            setQuestions(res.data.results)
        })
    }

    //Mezclamos las respuestas
    const mixAnswers = (answers) => {
        const mixedAnswers = [...answers].sort(() => Math.random() - 0.5);
        return mixedAnswers;
    }

    return(
        <div>
            <label htmlFor="amount">Ingrese la cantidad de preguntas:</label>
            <input type="number" name="amount" value={amountQuestions} onChange={handleAmountChange}/>
            <button onClick={addQuestions}>Generar preguntas</button>
            {questions && questions.map((question, index) => {
                
                const answers = [ ...question.incorrect_answers, question.correct_answer];
                
                const mixedAnswers = mixAnswers(answers)

                return (
                    <div key={index}>
                    <h3>{question.question}</h3>
                    <ul>
                        {mixedAnswers.map((answers, i) => (
                            <li key={i}>{answers}</li>
                        ))}
                    </ul>
                </div>
                )
                
            })}
            
        </div>
    )
}
