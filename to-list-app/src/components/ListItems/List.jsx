import React, { useState } from 'react';
import './List.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const List = () => {
    const [items, setItems] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const addItem = (item) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    const removeItem = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const HandlerAddItems = (e) => {
        e.preventDefault();
        const inputValue = e.target.elements.items.value.trim();
        if(!inputValue) {
            alert('Please enter a valid item name');
            return;
        }
        
        const newItem = {
            id: Date.now(),
            name: e.target.elements.items.value,
        };
        addItem(newItem);
        e.target.reset();
    };

    const startEditing = (id, currentValue) => {
        setEditItemId(id);
        setEditValue(currentValue);
    };

    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    };

    const saveEdit = (id) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, name: editValue } : item
            )
        );
        setEditItemId(null);
        setEditValue('');
    };

    return (
        <>
            <div className="container">
                {/* List container */}
                <div className="list">
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                {editItemId === item.id ? (
                                    // Render input field if the item is being edited
                                    <>
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={handleEditChange}
                                        />
                                        <button
                                            className="submit-button"
                                            onClick={() => saveEdit(item.id)}
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {item.name}
                                        <button
                                            className="Delete-Button"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <FaTrash /> {/* Add the trash icon */}
                                            Remove
                                        </button>
                                        <button
                                            className="Edit-Button"
                                            onClick={() =>
                                                startEditing(item.id, item.name)
                                            }
                                        >
                                            <FaEdit /> {/* Add the edit icon */}
                                            Edit
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Form container */}
                <form onSubmit={HandlerAddItems}>
                    <input type="text" name="items" placeholder="Add Items" />
                    <button className="submit-button" type="submit">
                        Add
                    </button>
                </form>
            </div>
        </>
    );
};

export default List;