import React, { useId } from 'react'

const Input=React.forwardRef(function Input({
    label,
    className="",
    type="text",
    placeholder="",
    ...props
},ref) {
    const id=useId()
  return (
    <div className="inputContainer">
    {label && <label className='label' htmlFor={id}>{label}</label>}
     <input type={type} className={className} ref={ref} placeholder={placeholder} {...props} id={id}/>
    </div>
   
  )
}
)
export default Input