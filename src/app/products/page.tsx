"use client"
import { IProducts } from "@/interfaces"
import { instanceAxios } from "@/utils/axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Product() {

    const [products, setProducts] = useState<IProducts[]>([])
    useEffect(() => {
        (async () => {
            const { data } = await instanceAxios.get('/products')
            setProducts(data)
        })()
    }, [])
    const haneleDelete = async (id: number) => {
        const cf = confirm("chắc chưa")
        if (cf) {
            await instanceAxios.delete(`products/${id}`)
            const newPro = products.filter((p: IProducts) => p.id !== id)
            setProducts(newPro)
            alert('Xoá thành công')
        }
    }
    return (
        <>
            <h1 className="text-center">Product List</h1>
            <table className="table container text-center">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Desc</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p: IProducts, index: number) => (
                        <tr key={index}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>{p.desc}</td>
                            <td>
                                <button className="btn btn-primary mx-3">
                                    <Link href={`/products/editpro/${p.id}`}>
                                        Sửa
                                    </Link>
                                </button>
                                <button onClick={() => haneleDelete(p.id as number)} className="btn btn-danger">Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    )
}
