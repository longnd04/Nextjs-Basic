"use client";

import { IProducts } from "@/interfaces";
import { instanceAxios } from "@/utils/axios";
import { useState } from "react";

const AddPro = () => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [desc, setDesc] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await instanceAxios.post('/products', { name, price, desc } as IProducts);
        } catch (error) {
            console.error("Error saving the product", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>Add Product</h1>
                    <form className="container" onSubmit={handleSave}>
                        <div>
                            <label>Name</label>
                            <input
                                className="form-control"
                                type="text"
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Price</label>
                            <input
                                className="form-control"
                                type="number"

                                onChange={e => setPrice(parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <input
                                className="form-control"
                                type="text"
                                onChange={e => setDesc(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary mt-3" type="submit">Save</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default AddPro;
