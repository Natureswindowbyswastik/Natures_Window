import React from 'react'

function Button({isPrimary , text, onClick,type}) {
  return (
  <button onClick={onClick} type={type} className={isPrimary?'px-4 py-2 text-white bg-yellow text-xl rounded-md hover:text-yellow hover:bg-white hover:border':'border text-yellow px-4 py-2 rounded-md hover:text-white hover:bg-yellow hover:scale-105 transition-transform duration-300'}>{text}</button>
  )
}

export default Button