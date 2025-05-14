import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'
function App() {
  const [text, setText] = useState('')
  const [word, setword] = useState("")
  const [addword, setaddword] = useState("");
  const [resultadd, setResultadd] = useState(null)
  const [resultword, setResultword] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState("CorrectText");
  const [errorMessage, setErrorMessage] = useState('');
  const [errorCheck, setErrorCheck] = useState('');
  const [errorValidate, setErrorValidate] = useState('');
  const [errorAdd, setErrorAdd] = useState('');
  console.log(word)

  useEffect(() => {
    if (text.trim().length > 0) {
      setErrorCheck("");
    }
        if (word.trim().length > 0) {
      setErrorValidate("");
        }
         if (addword.trim().length > 0) {
      setErrorAdd("");
    }
 
   
    }, [text,word,addword])

  const handleSpellCheck = async () => {
    setErrorMessage("");
    if (text.trim().length === 0) {
    setErrorCheck("يرجى إدخال النص");
    return;
  }
  setLoading(true)
  try {
    const response = await axios.post(
      'https://arabic-spellchecker.vercel.app/spellcheck/correct',
      { text }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    console.log(response.data)
    setText("")
    setResult(response.data)
  } catch (error) {
    setErrorMessage("حدث خطأ، يرجى المحاولة مرة أخرى");
    console.error('Error:', error)
    setText("")
  }
  setLoading(false)
}
  const handleSpellvalidat = async () => {
        setErrorMessage("");
      if (word.trim().length === 0) {
        setErrorValidate("يرجى إدخال الكلمة");
        
    return;
  }
  setLoading(true)
  try {
    const response = await axios.post(
      'https://arabic-spellchecker.vercel.app/spellcheck/validate',
        { word: word.trim() }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    console.log(response.data)
    setResultword(response.data)
  } catch (error) {
    console.error('Error:', error)
    setErrorMessage("حدث خطأ، يرجى المحاولة مرة أخرى");
   
  }
  setLoading(false)
  }
  const handleSpelladd = async () => {
        setErrorMessage("");
           if (addword.trim().length === 0) {
    setErrorAdd("يرجى إدخال الكلمة");
    return;
  }
  setLoading(true)
  try {
    const response = await axios.post(
      'https://arabic-spellchecker.vercel.app/spellcheck/add',
    { word: addword }
, 
   
    )

    console.log(response.data)
    setResultadd(response.data)
  } catch (error) {
    setErrorMessage("حدث خطأ، يرجى المحاولة مرة أخرى");
    console.error('Error:', error)
   
  }
  setLoading(false)
}



  return (
    <div className="app-container">
      <div className="landig">
    
     <header className="header">
        <h1>المصحح الإملائي العربي</h1>
        <p>أداة تصحيح النصوص العربية بكل سهولة</p>
      </header>
      

      </div>
 

      <main className="main-content">
    <div className="options">
  <h2 
    onClick={() => setOptions("CorrectText")} 
    className={options === "CorrectText" ? "active" : ""}
  >
    تصحيح نص
  </h2>

  <h2 
    onClick={() => setOptions("ValidateWord")} 
    className={options === "ValidateWord" ? "active" : ""}
  >
    تحقق من كلمة
  </h2>

  <h2  
    onClick={() => setOptions("AddWord")} 
    className={options === "AddWord" ? "active" : ""}
  >
    أضف كلمة
  </h2>
        </div>
        {
          options === "CorrectText"
          && (
            <>
                  <div className="input-section">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="اكتب النص هنا..."
            className="text-input"
            dir="rtl"
                />
                {errorCheck && (
                  <div className="error-message" style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
                    {errorCheck}
                  </div>
                )}
                {errorMessage && (
  <div className="error-message" style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
    {errorMessage}
  </div>
)}

          <button 
            onClick={handleSpellCheck}
            className="check-button"
           
          >
              {loading ?  <div className="spinner-small"></div> : "تصحيح النص"}
          </button>
        </div>

        {result && (
          <div className="result-section">
            <h2>النص المصحح:</h2>
            <p className="corrected-text" dir="rtl">{result.correctedText}</p>
            
            {result.details && result.details.length > 0 && (
              <div className="corrections-details">
                <h3>التصحيحات:</h3>
        <ul>
  {result.details.map((detail, index) => (
    <li key={index}>
      <span className="original">{detail.original}</span>
      <span className="arrow">←</span>
      <span className="correct">{detail.correct}</span>
      <div>
        {detail.suggestions.length > 0 && (
          <>
         
          <span style={{fontWeight:"bold" , padding :"0 10px"}}> اقتراحات :</span>
                 <span className="suggestions">
          
       [ {detail.suggestions.join(', ')} ]
            </span>
             </>
          
        )}
        
 
        </div>
    </li>
  ))}
</ul>

              </div>
            )}
          </div>
        )}
            </>
          )
        }
        {options === "ValidateWord" && (
          <>
       
  <div className="input-section">
    <input
      value={word}
      onChange={(e) => setword(e.target.value)}
      placeholder="اكتب الكلمة هنا..."
      className="text-validat"
      dir="rtl"
              />
              {errorValidate && (
                <div className="error-message" style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
                  {errorValidate}
                </div>)}
              
              {errorMessage && (
  <div className="error-message" style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
    {errorMessage}
  </div>
)}

    <button 
      onClick={handleSpellvalidat}
      className="check-button"

    >
       {loading ?  <div className="spinner-small"></div> : "تحقق"}
    </button>
            </div>
              {resultword && (
         <div className="result-section">
  <h2>نتيجة التحقق:</h2>
                <p dir="rtl">
                  <span style={{paddingLeft:"5px"}} > الكلمة :</span>
   <span style={{color :resultword.isCorrect ?"green" :"red"}}>{resultword.word}</span> 
  </p>
  <p dir="rtl">
    الحالة:{" "}
    {resultword.isCorrect ? (
      <span style={{ color: "green" }}>صحيحة ✔️</span>
    ) : (
      <span style={{ color: "red" }}>غير صحيحة ❌</span>
    )}
  </p>

  {!resultword.isCorrect && resultword.suggestions.length > 0 && (
    <div className="suggestions-section" dir="rtl">
    <span style={{fontWeight:"bold" , padding :"0 "}}> اقتراحات :</span>
      <span>
                      [ {resultword.suggestions.join(', ')} ]
                      </span>
    
    </div>
  )}
</div>

        )}
               </>
        )}
        {options === "AddWord" && (
          <>
       
  <div className="input-section">
    <input
      value={addword}
      onChange={(e) => setaddword(e.target.value)}
      placeholder="اكتب الكلمة هنا..."
      className="text-validat"
      dir="rtl"
              />
              {errorAdd && (
                <div className="error-message" style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
                  {errorAdd}
                </div>
              )}
              {errorMessage && (
  <div className="error-message" style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
    {errorMessage}
  </div>
)}

    <button 
      onClick={handleSpelladd }
      className="check-button"
  
    >
         {loading ?  <div className="spinner-small"></div> : "اضف"}
    </button>
            </div>
              {resultadd && (
         <div className="result-section">
  <h2>نتيجة الاضافة</h2>
                <p dir="rtl">
                  <span style={{paddingLeft:"5px"}} > الكلمة :</span>
   <span >{resultadd.word}</span> 
  </p>
  <p dir="rtl">
    الحالة:{" "}
                  {resultadd.message && (
                    <span style={{ color: "green" }}> {resultadd.message} </span>
                  )
                  }
  </p>

</div>

        )}
               </>
        )}

    
      </main>

      <footer className="footer">
        <p>© 2024 المصحح الإملائي العربي - جميع الحقوق محفوظة</p>
      </footer>
    </div>
  )
}

export default App
