function BurgerButton({show, setShow}) {

  return (
    <div className = {show? 'burgerButton open' :'burgerButton'} onClick = {()=>setShow(!show)}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

  ) 
}

export default BurgerButton;
