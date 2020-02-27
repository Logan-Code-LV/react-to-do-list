import React, { useState } from "react"
import { useItems } from "../hooks/index.js"
import "../styles/Items.css"

export default props => {
  const { items, add, del, toggle } = useItems()
  const [item, setItem] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    add(item)

    setItem("")
  }

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            id="taskbox"
            type="text"
            onChange={e => setItem(e.target.value)}
            placeholder="Insert to-do items ..."
            value={item}
          />
        </form>
      </div>
      <div className="everything">
        <ul className="list">
          {items.map(item => (
            <li
              key={"item" + item.id}
              className={item.status === "completed" ? "completed" : ""}
              onClick={e => toggle(item.id)}
            >
              <input className="checkbox" type="checkbox" />
              {item.text} <button onClick={e => del(item.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
