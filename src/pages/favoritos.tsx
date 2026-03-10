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
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {favoriteItems.map((item, index) => (
                        <div key={index} className="fav-card" style={{ border: '1px solid #ccc', padding: '10px' }}>
                            <h3>{item.title}</h3>
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