import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)
  const [emails, setEmails] = useState(initialEmails)
  const [stars, setStars] = useState(countstars(emails))
  
  
  const readEmails=emails.filter(email => email.read)
  const unreadEmails=emails.filter(email => !email.read)

  const [unread, setRead] = useState(unreadEmails.length)

  function starStatus(email){
    if (email.starred){
      email.starred=false
      setStars(stars-1)
    }else{
      email.starred=true
      setStars(stars+1)
    }

  }

  function readStatus(email){

    if (!email.read){
      email.read=true
      setRead(unread-1)
    }
    

  }

  function countstars(emails){
    let sum=0
    for (let i=0; i<emails.length; i++){
      if (emails[i].starred){
        sum++

      }
    }
    return sum
  }

  function Email({ email }) {
    let name=''
    if (email.read){
      name="email read"
    
    }
    else{
      name="email unread"
    }
    
    return (
      <>
        <li className={name}>
          <div className="select">
            <input
              className="select-checkbox" onClick={() => readStatus(email)}
              type="checkbox"/>
              
          </div>
          <div className="star">
            <input
              className="star-checkbox" onClick={() => starStatus(email)}
              checked={email.starred}
              type="checkbox"
            />
          </div>
          
          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
        </li>
      </>
    );
  }

  

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">{unread}</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">{stars}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">


        {emails.map((email, index) => (
            <Email
              email={email}
              key={index}
            />
        ))}

        
        
        

      </main>
    </div>
  )
}

export default App
