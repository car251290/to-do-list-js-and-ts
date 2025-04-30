import react, { useState } from 'react';
const List = () => {
const[ListItems,setListItems] = useState<string[]>([]);

const addItem = (item:string) => {
    setListItems([...ListItems,item]);
}
const removeItem = (item:string)=>{
    setListItems(ListItems.filter((id) => id !== item));

}

// check the type of e
const handlerSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check the type of e.target
    const target = e.target as typeof e.target & {
        item: { value: string };
    };
    // e.target.item.value is a string
    const item = target.item.value;
    addItem(item);
    target.item.value = '';
    console.log(item);
}

return(
    <>
    <h1>List</h1>
<form onSubmit={handlerSubmit}>
    <input type="text" name="item" placeholder="Enter item" />
    <button type="submit">Add</button>
    <ul>
        {ListItems.map((item, index) => (
            <li key={index}>
                {item}
                <button onClick={() => removeItem(item)}>Remove</button>
            </li>
        ))}
    </ul>
</form>

    </>
)



}
export default List;