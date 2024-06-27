'use client'
import { useEffect, useState } from 'react';
import { instanceAxios } from '@/utils/axios';
import { useParams } from 'next/navigation';

const EditProduct = () => {
    const { id } = useParams()
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [desc, setDesc] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const { data } = await instanceAxios.get(`/products/${id}`);
                    setName(data.name);
                    setPrice(data.price);
                    setDesc(data.desc);
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to fetch product', error);
                    setLoading(false);
                }
            })();
        }
    }, [id]);

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (!id) {
                console.error('Product ID is missing');
                return;
            }
            await instanceAxios.put(`/products/${id}`, { name, price, desc });
            alert('Product updated successfully');
        } catch (error) {
            console.error('Failed to update product', error);
            alert('Failed to update product');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Product</h1>
            <form className='container' onSubmit={handleSave}>
                <div>
                    <label>Name</label>
                    <input
                        className='form-control'
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        className='form-control'
                        type="number"
                        value={price}
                        onChange={e => setPrice(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        className='form-control'
                        type="text"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                </div>
                <button className='btn btn-primary mt-3' type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditProduct;
