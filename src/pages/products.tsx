"use client";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { fetchProductos } from "./store/slices/prodSlice";
import { useRouter } from "next/navigation";
import Handlebars from "handlebars";
import { toggleFavorite } from "./store/slices/favsSlice";


export default function Products(){
    const route=useRouter() 
    const click=(evento)=>{
        const miniClick=evento.target.closest(".mini-thumb")
        const favsClick=evento.target.closest(".heart")
        const prodClick=evento.target.closest(".clickable-card")
        if(favsClick){
            evento.stopPropagation()
            const url=prodClick.getAttribute("data-url")
            const producto=items.find(p=>p.url===url)
            if(producto){
                dispatch(toggleFavorite(producto));
                favsClick.classList.toggle("favorited");
            }
            return
        }
        if(miniClick){
            evento.stopPropagation()
            const miniImagen=miniClick.getAttribute("src")
            const tarjeta=miniClick.closest(".prod-card")
            if(miniImagen&&tarjeta){
                const imagenGrande=tarjeta.querySelector(".prod-image")
                imagenGrande.setAttribute("src",miniImagen)
                return
        }
        }
        
        if(prodClick &&!favsClick){
            const url=prodClick.getAttribute("data-url")
            if(url){
                route.push(`/detallesProductos/${url}`)
            }
        }
    }
    const dispatch=useAppDispatch();
    useEffect(()=>{
        dispatch(fetchProductos())
    },[])

    const {items,template}=useAppSelector(state=>state.products)
    const [htmlcontent,setHtmlContent]=useState<string>("")
    const favoriteItems=useAppSelector(state=>state.favorites.items)

    useEffect(()=>{
        if(template && items.length>0){
            const categoriasUnicas = Array.from(new Set(items.map(item => item.categories.name)));
            const marcasUnicas = Array.from(new Set(items.map(item => item.brand.name)));
            const plantillaCompilada=Handlebars.compile(template)
            const prodsConFavs=items.map((item)=>{
                const esFavorito=favoriteItems.some(fav=>fav.url===item.url)
                return{...item,
                    isFavorite:esFavorito
                }
            })
            
            const html = plantillaCompilada({ 
                products: prodsConFavs, 
                filtrosCategorias: categoriasUnicas,
                filtroMarcas:marcasUnicas,
            });
            setHtmlContent(html)
        }
    },[template,items,favoriteItems])
    return(
        <div>
            <div onClick={click} dangerouslySetInnerHTML={{__html:htmlcontent}}></div>
        </div>
    )
}
