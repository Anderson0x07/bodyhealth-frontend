import React, { useEffect, useState } from 'react'
import Card from './Card'
import { procesarPeticionGet } from '../../../utils/HandleApi';

export default function Redes(data) {

    console.log(data)

    const redes = [
        {
            name: "Facebook",
            bgColor: "#1877F2",
            link: data.url_facebook,
            id: 1,
        },
        {
            name: "Instagram",
            bgColor: "#C13584 ",
            link: data.url_instagram,
            id: 2,
        },
        {
            name: "WhatsApp",
            bgColor: "#25D366",
            link: data.url_whatsapp,
            id: 3,
        },
        {
            name: "TikTok",
            bgColor: "#000",
            link: data.url_tiktok,
            id: 4,
        },
    ]

    return <Card redes={redes} />

}
