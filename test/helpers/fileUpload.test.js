import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'curso-simei',
    api_key: '538771994179391',
    api_secret: 'ghk-rMJw0MFhDDc7ORzR4DaSNrI',
    secure: true
});



describe('Pruebas en fileUpload', () => {

    test('Debe mandar una imagen', async () => {

        const imageUrl = 'https://res.cloudinary.com/curso-simei/image/upload/v1704748102/960x0_k2aagb.jpg';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');

        const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId]);

        // console.log({ cloudResp })
        

    });

    test('Debe retonar null', async () => {

        const file = new File([], 'foto.jpg');

        const url = await fileUpload(file);
        expect(url).toBe(null);


    })

});