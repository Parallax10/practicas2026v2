import { NextApiRequest, NextApiResponse } from 'next';
const hbsTemplateMotos = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Motos</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f3f4f6;
            color: #333;
        }
        h1 {
            text-align: center;
            color: #111;
            margin-bottom: 30px;
        }
        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .moto-card {
			position:relative;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.3s ease;
            padding: 15px;
            text-align: center;
        }
        .moto-card:hover {
            transform: translateY(-5px);
        }
        .moto-image {
            width: 100%;
            height: auto;
            border-radius: 8px;
            object-fit: cover;
        }
        .moto-title {
            font-size: 1.2rem;
            margin: 15px 0 10px;
            color: #2c3e50;
        }
        .moto-price {
            font-size: 1.4rem;
            font-weight: bold;
            color: #e74c3c;
            margin-bottom: 10px;
        }
        .moto-details {
            font-size: 0.9rem;
            color: #7f8c8d;
            margin: 5px 0;
        }
		.mini-gallery{
			display: none; /* Oculto */
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			background: rgba(255, 255, 255, 0.9);
			padding: 10px;
			box-sizing: border-box;
			gap: 8px;
			justify-content: center;
			flex-wrap: wrap;
			z-index: 10;
		}
		.moto-card:hover .mini-gallery{
			display:flex;
		}
		.mini-thumb{
			width:45px;
			height:45px;
			object-fit:cover;
			border-radius: 2px solid transparent;
			cursor:pointer;
			transition:transform 0.2s, border-color 0.2s;
			border-color: #e74c3c;
		}
		.mini-thumb:hover{
			transform:scale(1.1);
			border-color: #e74c3c;
			
		}
		.filtro{
			margin: 20px;
            padding: 20px;
			width: max-content; 
            height: fit-content;
			border: 1px solid red;
			position: relative;
			gap:15px;
		}
		.filtro-opcion {
			display: flex;        
			align-items: center; 
			gap: 10px;            
			margin-bottom: 12px; 
			cursor: pointer;      
			font-size: 1rem;
			color: #2c3e50;
			gap:15px;
		}
		.main-wrapper {
			display: flex;
			gap: 30px; 
			margin: 0 auto;
			align-items: flex-start; 
			padding: 0 20px;
        }
    </style>
</head>
<body>
    <h1>Nuestro Catálogo</h1>

    <div class="main-wrapper">
        
        <div class="filtro">
            <h2>Filtros</h2>
            
            <h3>Tipo</h3>
            {{#each estado}}
                <label class="filtro-opcion">
                    <input type="checkbox"/>
                    <span>{{this}}</span>
                </label>
            {{/each}}
            
            <h3>Motor</h3>
            {{#each motor}}
                <label class="filtro-opcion">
                    <input type="checkbox"/>
                    <span>{{this}}</span>
                </label>
            {{/each}}

			<h3>Año</h3>
            {{#each año}}
                <label class="filtro-opcion">
                    <input type="checkbox"/>
                    <span>{{this}}</span>
                </label>
            {{/each}}

			<h3>Licencia</h3>
            {{#each carnet}}
                <label class="filtro-opcion">
                    <input type="checkbox"/>
                    <span>{{this}}</span>
                </label>
            {{/each}}

			<h3>Motor</h3>
            {{#each motor}}
                <label class="filtro-opcion">
                    <input type="checkbox"/>
                    <span>{{this}}</span>
                </label>
            {{/each}}
        </div>

        <div class="grid-container">
            {{#each motos}}
                <div class="moto-card clickable-card" data-url="{{this.url}}" style="cursor: pointer;">
                    <div class="mini-gallery">  
                        {{#each this.images}}
                            <img class="mini-thumb" src="{{this}}">
                        {{/each}}
                    </div>
                    <img class="moto-image" src="{{this.thumbnail}}" alt="{{this.title}}" />
                    <h2 class="moto-title">{{this.title}}</h2>
                    <p class="moto-price">{{this.price}} €</p>
                    <p class="moto-details"><strong>Motor:</strong> {{this.engine}} | <strong>Año:</strong> {{this.year}}</p>
                    <p class="moto-details"><strong>Carnet:</strong> {{this.license}} | <strong>Estado:</strong> {{this.type}}</p>
                </div>
            {{/each}}
        </div>
        
    </div>
</body>
</html>
`;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const filteredMotos = motos.filter((moto) => {
        if (req.query.url) return moto.url === req.query.url;
        return true;
    });

    res.status(200).json({
        data: filteredMotos,
        template: hbsTemplateMotos
    });
}


const motos = [
	{
		engine: 'gasolina',
		id: '1000010295201951373798',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/kymco/people/kymco-people-s-125-2019-km0-1373798_51934_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/kymco/people/kymco-people-s-125-2019-km0-1373798_51935_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/kymco/people/kymco-people-s-125-2019-km0-1373798_51936_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/kymco/people/kymco-people-s-125-2019-km0-1373798_51937_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/kymco/people/kymco-people-s-125-2019-km0-1373798_51938_640.webp',
		],
		license: 'B con antigüedad',
		price: 2599,
		thumbnail: 'https://dev.elmotorista.es/image?g=51934a399df8bec49483950525d4797f40ecf3b55fdd0.jpg&e=4&m=T',
		title: 'KYMCO PEOPLE S 125 2019',
		type: 'Seminueva',
		url: 'kymco-people-s-125-2019-km0-1373798',
		year: 2019,
	},
	{
		engine: 'gasolina',
		id: '1000010295201851352021',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/kymco/people/kymco-people-s-125-2018-km0-1352021_57403_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/kymco/people/kymco-people-s-125-2018-km0-1352021_57404_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/kymco/people/kymco-people-s-125-2018-km0-1352021_57405_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/kymco/people/kymco-people-s-125-2018-km0-1352021_57406_640.webp',
		],
		license: 'B con antigüedad',
		price: 2599,
		thumbnail: 'https://dev.elmotorista.es/image?g=57403496ff982887beb0c644120479cf2a7860b1a68fd.jpg&e=4&m=T',
		title: 'KYMCO PEOPLE S 125 2018',
		type: 'Seminueva',
		url: 'kymco-people-s-125-2018-km0-1352021',
		year: 2018,
	},
	{
		engine: 'electrico',
		id: '1000010415201851345610',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/vespa/elettrica/vespa-elettrica-50-pure-electric-2018-km0-1345610_44981_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/vespa/elettrica/vespa-elettrica-50-pure-electric-2018-km0-1345610_44982_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/vespa/elettrica/vespa-elettrica-50-pure-electric-2018-km0-1345610_44983_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/vespa/elettrica/vespa-elettrica-50-pure-electric-2018-km0-1345610_44984_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/vespa/elettrica/vespa-elettrica-50-pure-electric-2018-km0-1345610_44985_640.webp',
		],
		license: 'AM',
		price: 4799,
		thumbnail: 'https://dev.elmotorista.es/image?g=4498105166b0ce41a2323869e7ae4b551786c48d50933.jpg&e=2&m=T',
		title: 'VESPA ELETTRICA 50 PURE ELECTRIC 2018',
		type: 'Seminueva',
		url: 'vespa-elettrica-50-pure-electric-2018-km0-1345610',
		year: 2018,
	},
	{
		engine: 'electrico',
		id: '1000011347202051389114',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/es3-evo/askoll-es3-evo-125-2020-km0-1389114_27519_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/es3-evo/askoll-es3-evo-125-2020-km0-1389114_27520_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/es3-evo/askoll-es3-evo-125-2020-km0-1389114_27521_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/es3-evo/askoll-es3-evo-125-2020-km0-1389114_27522_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/es3-evo/askoll-es3-evo-125-2020-km0-1389114_27523_640.webp',
		],
		license: 'B con antigüedad',
		price: 2099,
		thumbnail: 'https://dev.elmotorista.es/image?g=27519d5b47c02681117432a1fe0c5fa6d632e217e74c3.jpeg&e=24&m=T',
		title: 'ASKOLL eS3 Evo 125 2020',
		type: 'Seminueva',
		url: 'askoll-es3-evo-125-2020-km0-1389114',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011347202051391375',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/es3-evo/askoll-es3-evo-125-2020-km0-1391375_38430_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/es3-evo/askoll-es3-evo-125-2020-km0-1391375_38431_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/es3-evo/askoll-es3-evo-125-2020-km0-1391375_38432_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/es3-evo/askoll-es3-evo-125-2020-km0-1391375_38433_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/es3-evo/askoll-es3-evo-125-2020-km0-1391375_38434_640.webp',
		],
		license: 'B con antigüedad',
		price: 2299,
		thumbnail: 'https://dev.elmotorista.es/image?g=38430c5a8bee91e4e6f8a05c04d52ac0ba58ce17f60f3.jpg&e=24&m=T',
		title: 'ASKOLL eS3 Evo 125 2020',
		type: 'Seminueva',
		url: 'askoll-es3-evo-125-2020-km0-1391375',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011349202051391835',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1391835_36801_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1391835_36802_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1391835_36803_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1391835_36804_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1391835_36805_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1391835_36806_640.webp',
		],
		license: 'AM',
		price: 1799,
		thumbnail: 'https://dev.elmotorista.es/image?g=36801581d5eb7501d1fb637704a3c116258ff099a4476.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-2 50 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2020-km0-1391835',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011346202051389112',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/es2-evo/askoll-es2-evo-50-2020-km0-1389112_41738_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/es2-evo/askoll-es2-evo-50-2020-km0-1389112_41739_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/es2-evo/askoll-es2-evo-50-2020-km0-1389112_41740_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/es2-evo/askoll-es2-evo-50-2020-km0-1389112_41741_640.webp',
		],
		license: 'AM',
		price: 2199,
		thumbnail: 'https://dev.elmotorista.es/image?g=41738d2ee7ca12289b52fcece971f2aedf70d73f37a28.jpeg&e=24&m=T',
		title: 'ASKOLL eS2 Evo 50 2020',
		type: 'Seminueva',
		url: 'askoll-es2-evo-50-2020-km0-1389112',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011349202051389118',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1389118_57637_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1389118_57638_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1389118_57639_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1389118_57640_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1389118_57641_640.webp',
		],
		license: 'AM',
		price: 1799,
		thumbnail: 'https://dev.elmotorista.es/image?g=57637102e9a509d1f4387ff3d6cdcb5cd52edd1b4ea3f.jpg&e=24&m=T',
		title: 'ASKOLL NGS-2 50 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2020-km0-1389118',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011349202051391836',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1391836_37482_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1391836_37483_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1391836_37484_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1391836_37485_640.webp',
		],
		license: 'AM',
		price: 1799,
		thumbnail: 'https://dev.elmotorista.es/image?g=3748223ba91500aa672d3c5548659d78151348c2c51ab.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-2 50 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2020-km0-1391836',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011349202051392332',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392332_36284_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392332_36285_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392332_36286_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392332_36287_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392332_36288_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392332_36289_640.webp',
		],
		license: 'AM',
		price: 1799,
		thumbnail: 'https://dev.elmotorista.es/image?g=36284312e319857c8250549043f8147632159cb6b58da.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-2 50 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2020-km0-1392332',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011349202051392326',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392326_41733_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392326_41734_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392326_41735_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392326_41736_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392326_41737_640.webp',
		],
		license: 'AM',
		price: 1499,
		thumbnail: 'https://dev.elmotorista.es/image?g=417330209d75a094dcd496ede66c0380edf91ef8ff5c3.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-2 50 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2020-km0-1392326',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011349202151403945',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403945_41757_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403945_41758_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403945_41759_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403945_41760_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403945_41761_640.webp',
		],
		license: 'AM',
		price: 1499,
		thumbnail: 'https://dev.elmotorista.es/image?g=417574dfd35229eea5ec47f2909fb0d9f531d4a00ba6d.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-2 50 2021',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2021-km0-1403945',
		year: 2021,
	},
	{
		engine: 'electrico',
		id: '1000011349202051392330',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392330_33379_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392330_33380_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392330_33381_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392330_33382_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392330_33383_640.webp',
		],
		license: 'AM',
		price: 1499,
		thumbnail: 'https://dev.elmotorista.es/image?g=33379d5702a51e24504cb8f5d5c2d1543b98c5a2a8a32.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-2 50 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2020-km0-1392330',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011349202151403948',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403948_38347_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403948_38348_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403948_38349_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403948_38350_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403948_38351_640.webp',
		],
		license: 'AM',
		price: 1799,
		thumbnail: 'https://dev.elmotorista.es/image?g=383471e2fbc7a0b27c50acdf0063952cd12320def259a.jpg&e=24&m=T',
		title: 'ASKOLL NGS-2 50 2021',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2021-km0-1403948',
		year: 2021,
	},
	{
		engine: 'electrico',
		id: '1000011349202151403942',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403942_38352_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403942_38353_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403942_38354_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403942_38355_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403942_38356_640.webp',
		],
		license: 'AM',
		price: 1799,
		thumbnail: 'https://dev.elmotorista.es/image?g=3835248994e0e72b51a4cdf9b700f800a5fd515917c99.jpg&e=24&m=T',
		title: 'ASKOLL NGS-2 50 2021',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2021-km0-1403942',
		year: 2021,
	},
	{
		engine: 'electrico',
		id: '1000011349202051392329',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392329_37478_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392329_37479_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392329_37480_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2020-km0-1392329_37481_640.webp',
		],
		license: 'AM',
		price: 1499,
		thumbnail: 'https://dev.elmotorista.es/image?g=374787a5074a000638fea064765ec08fef27b07c7fe3f.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-2 50 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2020-km0-1392329',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011349202051392328',
		images: ['https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-blanco-2020_640.webp'],
		license: 'AM',
		price: 1499,
		thumbnail: 'https://dev.elmotorista.es/image?v2=109/20201008112852_200711.jpg&m=S',
		title: 'ASKOLL NGS-2 50 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2020-km0-1392328',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011349202151403947',
		images: ['https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-blanco-2020_640.webp'],
		license: 'AM',
		price: 1799,
		thumbnail: 'https://dev.elmotorista.es/image?v2=109/20201008112852_200711.jpg&m=S',
		title: 'ASKOLL NGS-2 50 2021',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2021-km0-1403947',
		year: 2021,
	},
	{
		engine: 'electrico',
		id: '1000011349202151403971',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403971_36296_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403971_36297_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403971_36298_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403971_36299_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403971_36300_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-2/askoll-ngs-2-50-2021-km0-1403971_36301_640.webp',
		],
		license: 'AM',
		price: 1499,
		thumbnail: 'https://dev.elmotorista.es/image?g=36296660a15ef83b75c4a27bcc18a695201d1e8318842.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-2 50 2021',
		type: 'Seminueva',
		url: 'askoll-ngs-2-50-2021-km0-1403971',
		year: 2021,
	},
	{
		engine: 'electrico',
		id: '1000011350202051391839',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391839_38371_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391839_38372_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391839_38373_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391839_38374_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391839_38375_640.webp',
		],
		license: 'B con antigüedad',
		price: 1799,
		thumbnail: 'https://dev.elmotorista.es/image?g=38371209a3acb2b0243c562debb0fa07faa5ab8a2df4d.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-3 125 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-3-125-2020-km0-1391839',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011350202051391843',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391843_36908_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391843_36909_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391843_36910_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391843_36911_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391843_36912_640.webp',
		],
		license: 'B con antigüedad',
		price: 1799,
		thumbnail: 'https://dev.elmotorista.es/image?g=36908832f4886dd2e184702f59e6f14f7b9cab3ab05b5.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-3 125 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-3-125-2020-km0-1391843',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011350202051391382',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391382_38179_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391382_38180_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391382_38181_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391382_38182_640.webp',
		],
		license: 'B con antigüedad',
		price: 1799,
		thumbnail: 'https://dev.elmotorista.es/image?g=3817952bf4c6318967c4863832ee58cb3d1245212aa53.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-3 125 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-3-125-2020-km0-1391382',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011350202051391845',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391845_38151_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391845_38152_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391845_38153_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391845_38154_640.webp',
		],
		license: 'B con antigüedad',
		price: 1799,
		thumbnail: 'https://dev.elmotorista.es/image?g=38151a3ffbaaa541005b1bf030f7c923f55aa160d4b22.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-3 125 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-3-125-2020-km0-1391845',
		year: 2020,
	},
	{
		engine: 'electrico',
		id: '1000011350202051391841',
		images: [
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391841_38195_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391841_38196_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391841_38197_640.webp',
			'https://estaticos.elmotorista.es/vehiculos/askoll/ngs-3/askoll-ngs-3-125-2020-km0-1391841_38198_640.webp',
		],
		license: 'B con antigüedad',
		price: 1799,
		thumbnail: 'https://dev.elmotorista.es/image?g=38195f33ad20a5daa1744aef671270bdfe91130e5d714.jpeg&e=24&m=T',
		title: 'ASKOLL NGS-3 125 2020',
		type: 'Seminueva',
		url: 'askoll-ngs-3-125-2020-km0-1391841',
		year: 2020,
	},
];
