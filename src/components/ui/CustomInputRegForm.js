
function CustomInputRegForm({className, name, type='text', title, value, changeValue, blur}) {

  return (
    <span className = {className}>
      <label style = {{paddingRight : '5px'}}>{title}
        <input type={type} 
               className = 'customInputRegForm' 
               value = {value} name = {name}
               onChange = {event => changeValue(event.target.value)} 
               onBlur={(e)=>blur(e.currentTarget.name)}/>
      </label>
    </span>
  );
}

export default CustomInputRegForm;