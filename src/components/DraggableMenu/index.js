import React, { useState } from 'react'
import { intValueOf } from '../../helpers/index';


const DraggableMenu = (props) => {
  const ref = React.createRef()
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [transLeftOffset, setTransLeftOffsetsetStartX] = useState(null);
  const { 
    data,
    itemWidth,
    itemHeight,
    itemSideOffsets,
    dragSpeed
  } = props

  const cWrapperStyle = {
    width: `${data.length * (itemWidth + (2 * itemSideOffsets))}px`,
    height: `${itemHeight}px`
  }
  
  const handleMouseDown = (e) => {
    const draggableMenu = ref.current
    e.persist()
  
    draggableMenu.classList.add('active')
  
    const _startX = e.pageX - draggableMenu.offsetLeft
    const _transLeftOffset = intValueOf(draggableMenu.firstChild.style.transform)
    setIsDown(true) 
    setStartX(_startX)
    setTransLeftOffsetsetStartX(_transLeftOffset)

    const x = e.pageX - draggableMenu.offsetLeft
    const walk = (x - _startX) * dragSpeed

    draggableMenu.firstChild.style.cssText = `
      transform: translateX(${_transLeftOffset + walk}px);
      transition: transform 0.0s ease-in-out;
    `;
  }
  const handleMouseLeave = (e) => {
    handleSnap()
  }
  
  const handleMouseUp = (e) => {
    handleSnap();
  }
  
  const handleMouseMove = (e) => {
    const draggableMenu = ref.current
  
    if(!isDown) return 
    e.preventDefault()
  
    const x = e.pageX - draggableMenu.offsetLeft
    const walk = (x - startX) * dragSpeed
    
    draggableMenu.firstChild.style.transform = `translateX(${transLeftOffset + walk}px)`;
  }
  
  const handleSnap = () => {
    const { data, itemWidth, itemSideOffsets } = props
    const draggableMenu = ref.current
  
    setIsDown(false);
    draggableMenu.classList.remove('active')
  
    const tempThresholdOffset = intValueOf(draggableMenu.firstChild.style.transform)
    const end = data.length * (itemWidth + (2 * itemSideOffsets)) - 30 - draggableMenu.offsetWidth
  
    if (tempThresholdOffset < 0 || tempThresholdOffset > end) {
      setIsDown(false);
      draggableMenu.firstChild.style.cssText = `
        transform: translateX(${ tempThresholdOffset < 0 ? 0 : end}px);
        transition: transform 0.5s cubic-bezier(.25,.72,.51,.96);
      `;
    }
  }

  return(
    <div 
      className='navigation__container' 
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}>
      <div 
        className='navigation__wrapper'
        style={{
          ...cWrapperStyle,
          transform: 'translateX(0px)'
        }}>
        {props.children}
      </div>
    </div>
  )
}  

export default DraggableMenu;