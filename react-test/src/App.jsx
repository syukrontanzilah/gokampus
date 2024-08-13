import { useState } from 'react'
import useLocalStorage from './hooks/useLocalstorage';
import { FaTrash } from "react-icons/fa";

function App() {
  // test 1 react
  const [todos, setTodos] = useState([
    { id: 1, text: 'Lari pagi', completed: false },
    { id: 2, text: 'Sarapan pagi', completed: false },
    { id: 3, text: 'Berangkat kerja', completed: false },
    ]);

    const handleCheck = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? 
            { ...todo, completed: !todo.completed } : 
            todo
        ));
    };

    const handleRemove = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };


    // test 2 react
    const [form, setForm] = useState({ 
        name: '', 
        email: '' 
    });
    const [errors, setErrors] = useState({ 
        name: '', 
        email: '' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ 
          ...prevForm, 
          [name]: value 
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email } = form;
        let valid = true;
        let newErrors = { name: '', email: '' };
        if (!name) {
            newErrors.name = 'Nama tidak boleh kosong';
            valid = false;
        }
        if (!email) {
            newErrors.email = 'Email tidak boleh kosong';
            valid = false;
        }
        setErrors(newErrors);
        if (valid) {
            console.log('submit data:', form);
        }
    };

    // test 3 react
    const [name, setName] = useLocalStorage('name', '');
    const handleChangeName = (e) => {
        setName(e.target.value);
    };

  return (
    <main>
      <div className='container'>
      {/* test 1 */}
       <div className='card'>
            <h4>React 1. Todo List</h4>
            <ol>
                {
                todos.map(todo => (
                    <li 
                    key={todo.id} 
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        <input
                            className='check'
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleCheck(todo.id)}
                        />
                        {todo.text}
                        <button 
                        style={{cursor: todo.completed ? 'pointer': 'default'}}
                        className={`delete-button`}
                        disabled = {todo.completed? false : true}
                        onClick={() => handleRemove(todo.id)}>
                         <FaTrash/>
                        </button>
                    </li>
                ))
                }
            </ol>
        </div>

        {/* test 2 */}

        <form className='card' onSubmit={handleSubmit}>
        <h4>React 2. Form Validation</h4>
            <div className='input-list'>
                <label>Nama</label>
                    <input
                        className='input-form'
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder='Masukkan nama'
                    />
                
                {errors.name && <p style={{ color: 'red', fontSize:'12px' }}>{errors.name}</p>}
            </div>
            <div  className='input-list'>
                <label>Email</label>
                    <input
                        className='input-form'
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder='Masukkan email'
                    />
                
                {errors.email && <p style={{ color: 'red', fontSize:'12px' }}>{errors.email}</p>}
            </div>
            <button type="submit">Kirim</button>
        </form>

        {/* test 3 react */}
        <div className='card'>
        <h4>React 3. Save to localstorage</h4>
            <input
                className='input-form'
                type="text"
                value={name}
                onChange={handleChangeName}
                placeholder="Masukkan nama"
            />
            <p style={{fontSize:'12px', marginTop:'10px'}}>Nama tersimpan: {name}</p>
        </div>
      
        </div>
    </main>
  )
}

export default App
