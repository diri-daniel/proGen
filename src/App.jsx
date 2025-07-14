import React from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import { groups, platforms } from './MainComponents/platforms'
import { getSimplified } from './MainComponents/askAi'

export const Main = () => {
  const [renPage, setRenPage] = React.useState({...platforms[0]})
  const [focused, setFocused] = React.useState(false)
  const [placeholder, setPlaceholder] = React.useState(`Describe what you want to find in ${renPage.name}.`)
  const text = React.useRef(document.getElementsByTagName("textarea"))
  const [loading, setLoading] = React.useState(false)
  const [reply, setReply] = React.useState()


  const optClick = (name) => {
    setRenPage({...platforms.
              filter(p => p.name === name)[0]})
    setPlaceholder(`Describe what you want to find in ${name}.`)
    text.current.text.value = ""
    setReply()
  }
  
  const options = groups.map((g) => {
    return <optgroup label= {g} key={g}>
              {platforms.
              filter(p => p.group === g).
              map(p => {
                return <option key={p.name} value={p.name} style={{color: p.colors.primary}} >{p.name}</option>
              })}
            </optgroup>
  })

  const handleForm = async (formdata) => {
    setReply()
    const data = Object.fromEntries(formdata.entries())
    console.log(data)
    setLoading(true)
    let r = await getSimplified(renPage, data["text"])
    setLoading(false)
    setReply(r)
  }

  const textClick = (e) => {
    focused ?
      e.currentTarget.value === "" ?
      e.currentTarget.placeholder === 
      `Describe what you want to find in ${renPage.name}.` ?
        null :
        text.current.text.value = e.currentTarget.placeholder :
      null :
    null
  }

  const placeholderSet = (event) => {
    setPlaceholder(event.currentTarget.text.value)
    text.current.text.value = ""
  }

  return (
    <main className="body" style={{backgroundImage: `linear-gradient(to top right, ${renPage.colors.primary}, white)`}}>
      <form onSubmit={(e)=>{
        e.preventDefault(); 
        handleForm(new FormData(e.target))
        placeholderSet(e)
        }}>
        <label id='select-software'>
          <h2><span style={{color: renPage.colors.primary}}>Select</span> <span style={{color: renPage.colors.secondary}}>Software</span></h2>
          <select className="genbox" style={{color: renPage.colors.primary, borderColor: renPage.colors.primary}} name="software" id="software" onChange={(e) => optClick(e.target.value)} >
            {options}
          </select>
        </label>
        <textarea name='text' className="genbox text" style={{color: renPage.colors.primary, borderColor: renPage.colors.primary}} placeholder={placeholder} onClick={textClick} onFocus = {()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}}/>
        <button style={{backgroundColor: renPage.colors.primary, borderColor: renPage.colors.secondary, color: renPage.textColor, boxShadow: `0 2px 5px ${renPage.colors.secondary}`}} > Get Search Prompt </button>
      </form>
      <div className="screen">
        <img src={renPage.url} alt={`${renPage.name} logo`} />
        {loading ? <p className="genbox">
          thinking...
        </p>: null}
        {reply? <p className="genbox">
          {reply}
        </p>: null}
      </div>
    </main>
  )
}
