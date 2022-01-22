
function CustomInput({className, name, title, value, changeValue}) {

  return (
    <span className = {className}>
      <label style = {{paddingRight : '5px'}}>{title}
      <input className = 'customInput' 
             style = {{marginLeft : '5px'}} 
             value = {value} name = {name}
             onChange = {event => changeValue(event.target.value)} />
      </label>
    </span>
  );
}

export default CustomInput;