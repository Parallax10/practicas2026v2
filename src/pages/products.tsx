"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { themeStyles as styles } from '../config/index';
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { fetchProductos } from "./store/slices/prodSlice";
import { useRouter } from "next/navigation";
import Handlebars from "handlebars";

export default function Products(){
    const route=useRouter() 
    const click=(evento)=>{
        const miniClick=evento.target.closest(".mini-thumb")
        const favsClick=evento.target.closest(".heart")
        if(favsClick){
            evento.stopPropagation()
            
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
        const prodClick=evento.target.closest(".clickable-card")
        if(prodClick){
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

    useEffect(()=>{
        if(template && items.length>0){
            const categoriasUnicas = Array.from(new Set(items.map(item => item.categories.name)));
            const marcasUnicas = Array.from(new Set(items.map(item => item.brand.name)));
            const plantillaCompilada=Handlebars.compile(template)
            const html = plantillaCompilada({ 
                products: items, 
                filtrosCategorias: categoriasUnicas,
                filtroMarcas:marcasUnicas
            });
            setHtmlContent(html)
        }
    },[template,items])
    return(
        <div>
            <div onClick={click} dangerouslySetInnerHTML={{__html:htmlcontent}}></div>
        </div>
    )
}
