import React from "react";
import DraggableMenu from './components/DraggableMenu';
import "./assets/scss/main.scss";

const App = () => {
  const items = [
    {name: 'Option 1', url: "http://riantavares.github.io"},
    {name: 'Option 2', url: "http://riantavares.github.io"},
    {name: 'Option 3', url: "http://riantavares.github.io"},
    {name: 'Option 4', url: "http://riantavares.github.io"},
    {name: 'Option 5', url: "http://riantavares.github.io"},
    {name: 'Option 6', url: "http://riantavares.github.io"},
    {name: 'Option 7', url: "http://riantavares.github.io"},
    {name: 'Option 8', url: "http://riantavares.github.io"},
    {name: 'Option 9', url: "http://riantavares.github.io"},
    {name: 'Option 10', url: "http://riantavares.github.io"},
    {name: 'Option 11', url: "http://riantavares.github.io"},
  ]

  const settings = {
    dragSpeed: 1.25,
    itemWidth: 150,
    itemHeight: 50,
    itemSideOffsets: 15,
  }

  return(
    <nav className='navigation'>
      <DraggableMenu data={items} {...settings}>
        {
          items.map((item, index) => (
            <div
              key={index}
              className='navigation__menu-item'
            >
              <a href={item.url}>{item.name}</a>
            </div>
          ))
        }
      </DraggableMenu>
    </nav>
  )
}

export default App;