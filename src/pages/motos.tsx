"use client";
import { useRouter } from "next/router";
import { fetchMotos } from "./store/slices/motoSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import Handlebars from "handlebars";
import { useState,useEffect } from "react";
import { useParams } from "next/navigation";

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
            const compiledTemplate = Handlebars.compile(template);
            const html = compiledTemplate({ motos: items });
            setHtmlContent(html);
        }
    },[template,items])

    return(
        <div>
            <div  onClick={click} dangerouslySetInnerHTML={{ __html: htmlcontent }} />
        </div>
    )
}