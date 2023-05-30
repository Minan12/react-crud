import { useState,useEffect } from 'react';
import List from "./List";
import { uid } from 'uid';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

function App() {
  const [contacts, setContacts] = useState([]);

  const [isUpdate, setIsUpdate] = useState({id:null, status: false});

  const [formData, setFormData] = useState({
    name:"",
    telp:""
  });

  useEffect(() => {
    axios.get("http://localhost:3000/contacts").then((res) => {
      console.log(res.data);
      setContacts(res?.data ?? []);
    });
  }, []);

  function handleChange(e){
    let data = {...formData};
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleSubmit(e){
    e.preventDefault();
    alert("okedeh");
      
    let data = [...contacts];

    if(formData.name === ""){
      return false;
    }

    if(formData.telp === ""){
      return false;
    }

    if(isUpdate.status){
      data.forEach((contact) => {
        if(contact.id === isUpdate.id){
          contact.name = formData.name;
          contact.telp = formData.telp;
        }
      });

      axios.put(`http://localhost:3000/contacts/${isUpdate.id}`, {
        name: formData.name,
        telp: formData.telp
      }).then((res) => {
        alert("Berhasil Mengedit data");
      })

    }else{
      let newData = {id:uid(), name: formData.name, telp: formData.telp};
      data.push(newData);

      axios.post("http://localhost:3000/contacts", newData).then((res) => {
        alert("Berhasil menyimpan data");
      });
    }

// menambahkan data
    setIsUpdate({id: null, status: false});
    setContacts(data);
    setFormData({name: "", telp: ""});
  }

  function handleEdit(id){
    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id);
    setFormData({name: foundData.name, telp: foundData.telp});
    setIsUpdate({id: id, status: true});
  }

  function handleDelete(id){
    let data = [...contacts];
    let filteredData =  data.filter(contact => contact.id !== id);

    axios.delete(`http://localhost:3000/contacts/${id}`).then((res) =>{
      alert("Berhasil Menghapus data");
    });

    setContacts(filteredData);
  }

  return (
    <Card className="mx-auto mt-5" style={{ width: '22rem' }}>
      <h1 className="px-3 py-3">My Contact List</h1>

      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.name} name="name" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">No. Telp</label>
          <input type="text" className="form-control" onChange={handleChange} value={formData.telp} name="telp" />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List handleDelete={handleDelete} handleEdit={handleEdit} data={contacts}/>
    </Card>
  );
}
export default App;
