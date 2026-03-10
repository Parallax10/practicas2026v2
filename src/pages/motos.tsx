"use client";
import { useRouter } from "next/router";
import { fetchMotos } from "./store/slices/motoSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import Handlebars from "handlebars";
import { useState,useEffect } from "react";

export default function Motos(){
    const route = useRouter();
    const click=(evento)=>{
        const motoClick=evento.target.closest(".clickable-card");
        if(motoClick){
            const url=motoClick.getAttribute("data-url");
            if (url){
                route.push(`/detallesMotos/${url}`);
            }
        }
    }
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(fetchMotos())
    },[])

    const {items,template} = useAppSelector(state=>state.motos)
    const [htmlcontent,setHtmlContent]=useState<string>("");

    useEffect(()=>{
        if(template && items.length>0){
            const motor = Array.from(new Set(items.map(item => item.engine)));
            const año = Array.from(new Set(items.map(item => item.year)));
            const carnet = Array.from(new Set(items.map(item => item.license)));
            const estado = Array.from(new Set(items.map(item => item.type)));
            const plantillaCompilada = Handlebars.compile(template);
            const html = plantillaCompilada({
                motos: items ,
                motor:motor,
                año:año,
                carnet:carnet,
                estado:estado
            });
            setHtmlContent(html);
        }
    },[template,items])

    return(
        <div>
            <div  onClick={click} dangerouslySetInnerHTML={{ __html: htmlcontent }} />
        </div>
    )
}