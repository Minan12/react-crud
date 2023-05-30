import React from "react";
import { Button } from 'react-bootstrap';

export default function List({data, handleEdit, handleDelete}) {
    return (
        <div className="list-group">
            {
                data.map((contact)=> {
                    return(
                        <div className="list-group-item list-group-item-action">
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{contact.name}</h5>
                            <div>
                                <Button onClick={()=> handleEdit(contact.id)} className="btn btn-sm btn-light">Edit</Button>
                                <Button onClick={()=> handleDelete(contact.id)} className="btn btn-sm btn-light">Del</Button>
                            </div>
                            </div>
                            <p className="mb-1">{contact.telp}</p>
                        </div>
                    );
                })
            }
        </div>
    );
}