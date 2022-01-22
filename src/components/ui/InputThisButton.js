import CustomInput from './CustomInput'
import SubmitButton from './SubmitButton'

function InputThisButton({title, value, changeValue, callback}) {

  return (
    <div>
      <CustomInput title = {title} value = {value}  changeValue={changeValue}/>
      <SubmitButton  callback={callback} title={'ADD'} />
    </div>
  );
}

export default InputThisButton;