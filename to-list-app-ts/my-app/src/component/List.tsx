import React, { useState } from 'react';
import './liststyle.css';

const List = () => {
    const [ListItems, setListItems] = useState<string[]>([]);

    const addItem = (item: string) => {
        setListItems([...ListItems, item]);
    };

    const removeItem = (item: string) => {
        setListItems(ListItems.filter((id) => id !== item));
    };

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            item: { value: string };
        };
        const item = target.item.value.trim();
        if (!item) {
            alert('Please enter a valid item.');
            return;
        }
        addItem(item);
        target.item.value = '';
    };

    return (
        <div className="container">
            <h1>List</h1>
            <ul>
                {ListItems.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeItem(item)}>Remove</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handlerSubmit}>
                <input type="text" name="item" placeholder="Enter item" />
                <button type="submit">Add</button>
            </form>
        
        </div>
    );
};

export default List;