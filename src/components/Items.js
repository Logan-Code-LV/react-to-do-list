import React, { useState } from "react"
import { useItems } from "../hooks/index.js"

export default props => {
  const { items, add, del, toggle } = useItems()
  const [item, setItem] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    add(item)

    setItem("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={e => setItem(e.target.value)}
          placeholder="Work"
          value={item}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map(item => (
          <li
            key={"item" + item.id}
            className={item.status === "completed" ? "completed" : ""}
            onClick={e => toggle(item.id)}
          >
            <input type="checkbox" />
            {item.text} <button onClick={e => del(item.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
