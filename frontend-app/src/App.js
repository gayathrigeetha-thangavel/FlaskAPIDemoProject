
import React, {useState} from 'react';
import axios from 'axios';
import './App.css';


function App() {

  const [getInputMessage, setInputMessage] = useState('');
  const [fetchedMessage, setFetchedMessage] = useState(null);
  const [userMessage, setUserMessage] = useState('');

  {/*post method*/}
  const addMessage = async () => {
      if(getInputMessage.trim() === ''){
        setUserMessage('enter a message');
        return;
      }

      try {
        const response = await axios.post('http://127.0.0.1:5000/frontend', { message: getInputMessage });
        setUserMessage('Message added successsfully');
        setInputMessage('');
      }
      catch(error)
      {
        const errorMessage = error.response ? error.response.data.error : 'Problem while adding a message';
        console.log(errorMessage);
        setUserMessage(errorMessage);
      }
  }

  {/*get method*/}
  const getMessage = async () => {
      try {
        setUserMessage('')
        const response = await axios.get('http://127.0.0.1:5000/frontend');
        if(!response.data.message){
          setUserMessage('Something went wrong');
        }
        else {
          setFetchedMessage(response.data.message);
        }
        
      }
      catch(error)
      {
        const errorMessage = error.response ? error.response.data.error : 'Error fetching message';
        setUserMessage(errorMessage);
        setFetchedMessage(null);
      }
  }

  {/*designing part*/}
  return (
      <div className="App">
          <h1>Flask demo project!</h1>

          <div className='section'>
              <h2>Post Request</h2>
              <input type="text" value = {getInputMessage} onChange={(e) => setInputMessage(e.target.value)} ></input>
              <button onClick={addMessage}>Add Message</button>
          </div>

          <div className='section'>
              <h2>Get Request</h2>
              <button onClick={getMessage}>Display Message</button> 
          </div>

          {fetchedMessage && (
              <div className="display-section">
                  <p><strong>Message:</strong>{fetchedMessage}</p> {/*retrieved message will be shown here*/}
              </div>
          )}
          
          {userMessage && <div className="message">{userMessage}</div>}   {/*error messages shown here */}
      </div>
  )
}

export default App;