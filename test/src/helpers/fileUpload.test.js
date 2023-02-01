import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../../src/helpers/fileUpload"

// Realizamos la configuración para conectarnos a Cloudinary
cloudinary.config({
    cloud_name: 'dbjyiitng',
    api_key: '242988443193928',
    api_secret: 'ttpk4T1O2z2HXuX28sr_BIvJpZc',
    secure: true

})

describe('Pruebas en fileUpload.js', () => {


    test('debe subir el archivo correctamente a cloudinary', async () => { 

        // Creamos la imagen que vamos a subir
        const imgUrl = 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        const resp = await fetch( imgUrl );
        const blob = await resp.blob();
        const file = new File( [blob], 'foto.jpg' )
        // console.log( file )

        // Subimos la imagen y la almacenamos
        const url = await fileUpload( file );

        // Efectuamos  
        expect( typeof url ).toBe('string');

        // Borramos la imagne que subimos para no llenar de basura cloudinary
        // console.log( url )
        const segments = url.split('/');
        // console.log(segments)
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '' );
        // console.log({imageId})
        const folderName = "react-journal-app";
        // Fn de la API de cloudinary para borrar la img
        await cloudinary.api.delete_resources(`${folderName}/${imageId}`, {
            resource_type: 'image'
        }, () => {});
        
     }, 15000)

    test('debe retornar null', async () => { 

        // Creamos la imagen que vamos a subir
        const file = new File( [], 'foto.jpg' )
        // console.log( file )

        // Subimos la imagen y la almacenamos
        const url = await fileUpload( file );
        // console.log( url )

        // Efectuamos  
        expect( url ).toBe( null );

     })

})