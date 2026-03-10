import { useAppSelector } from "./store/hooks";
import Link from "next/link";

export default function Favoritos(){
    const favoriteItems = useAppSelector(state => state.favorites.items);

    return(
        <div>
            <h1>Mis Productos Favoritos</h1>
            
            {favoriteItems.length === 0 ? (
                <p>Aún no has añadido ningún favorito.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(150px, 1fr))', gap: '20px',margin:15 ,alignContent:"center",justifyContent:"center"}}>
                    {favoriteItems.map((item, index) => (
                        <div key={index} className="fav-card" style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                            <h3>{item.title}</h3>
                            <img src={item.images[0]}/>
                            <p>{item.price}</p>
                            <br></br>
                            <Link href={`/detallesProductos/${item.url}`}>
                                Ver Detalles
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}