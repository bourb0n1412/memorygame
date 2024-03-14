export default function GameFrame({card, handleChoice, flipped}){

  const handleClick = () => {
    handleChoice(card)
  }

    return(
    <div>
        <div className='card'>
          <div className={flipped ? "flipped" : ""} >
            <img className='frontside' src={card.src}/>
            <img className='backside' src='/img/backside.jpg' onClick={handleClick}/>
          </div>
        </div>
    </div>
    )
}
