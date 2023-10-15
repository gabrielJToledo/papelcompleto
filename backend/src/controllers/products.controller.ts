import { productModel } from './../model/products.model';
import { Request, Response, Router } from 'express'
import multer from 'multer'
import { promises as fs } from 'fs';
import mongoose from 'mongoose';

export const productsRouter = Router()

const upload = multer({ dest: 'src/imagesdb' });

productsRouter.post('/createProduct', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 5 }]), async (req: Request, res: Response) => {
    const currentProductCreated = { ...req.body }
    const imgFiles: any = req.files

    let imagesArray: any = []

    const existingProduct = await productModel.findOne({ name: currentProductCreated.name });
    if (existingProduct) {
        return res.status(400).send('Já existe um produto com esse nome no banco de dados!');
    }

    try {
        if (!currentProductCreated.name) {
            return res.status(400).send('O produto deve ter um nome!')
        }
        if (!currentProductCreated.category) {
            return res.status(400).send('O produto deve ter uma categoria!')
        }
        if (!currentProductCreated.price) {
            return res.status(400).send('O produto deve ter um preço!')
        }
        if (!imgFiles.coverImage) {
            return res.status(400).send('O produto deve ter pelo menos a imagem de capa!')
        }

        if (imgFiles.coverImage[0].mimetype !== 'image/jpeg') {
            await fs.unlink(imgFiles.coverImage[0].path);
            return res.status(400).json({ error: 'A imagem de capa deve estar no formato JPEG (extensão .jpg)' });
        }

        console.log(imgFiles.images)

        if (imgFiles.images !== undefined) {
            imgFiles.images.map(async (img: any) => {
                if (img.mimetype !== 'image/jpeg') {
                    await fs.unlink(img.path);
                    return res.status(400).json({ error: 'As imagens deve estar no formato JPEG (extensão .jpg)' });
                }

                const convertImages = await fs.readFile(img.path)

                imagesArray.push(convertImages)

                currentProductCreated.images = imagesArray
            })
        }

        const coverImageData = await fs.readFile(imgFiles.coverImage[0].path)

        currentProductCreated.coverImage = coverImageData

        await productModel.create(currentProductCreated)

        return res.status(200).send('Produto criado!')
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Ocorreu um erro ao criar o produto.' });
    }
})

// Rota para deletar um produto
productsRouter.delete('/:productId', async (req: Request, res: Response) => {
    const productId = req.params.productId;

    try {
        // Se necessário, também é possível excluir a imagem relacionada ao produto aqui
        // if (existingProduct?.coverImage) {
        //     await fs.unlink(existingProduct.coverImage);
        // }

        const deletedProduct = await productModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).send('Produto não encontrado.');
        }


        return res.status(200).send('Produto excluído com sucesso.');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ocorreu um erro ao excluir o produto.' });
    }
});

// Rota para atualizar um produto
productsRouter.put('/:productId', upload.single('coverImage'), async (req: Request, res: Response) => {

    const productId = req.params.productId;
    const updatedProductData = { ...req.body };

    if (req.file) {
        console.log(req.file); // Informações do arquivo
    }

    try {
        const existingProduct = await productModel.findById(productId);
        if (!existingProduct) {
            return res.status(404).send('Produto não encontrado.');
        }

        // Se necessário, também é possível excluir a imagem antiga do produto aqui

        // Atualiza os dados do produto com os valores do corpo da requisição
        existingProduct.name = updatedProductData.name || existingProduct.name;
        existingProduct.category = updatedProductData.category || existingProduct.category;
        existingProduct.price = updatedProductData.price || existingProduct.price;

        if (req.file) {
            if (req.file.mimetype !== 'image/jpeg') {
                await fs.unlink(req.file.path);
                return res.status(400).json({ error: 'A imagem de capa deve estar no formato JPEG (extensão .jpg)' });
            }

            const coverImageData = await fs.readFile(req.file.path);
            existingProduct.coverImage = coverImageData;
        }

        await existingProduct.save();

        return res.status(200).send("Produto Atualizado!");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});

productsRouter.get('/cart', async (req, res) => {
    const cartItemIds: any = req.query.ids;

    try {
        // Verifica se os IDs dos itens do carrinho foram fornecidos
        if (!cartItemIds) {
            return res.status(200).json([]);
        }

        // Converte a string de IDs para um array de IDs
        const idsArray = cartItemIds.map((item: any) => item.id);

        // Consulta os produtos com base nos IDs fornecidos
        const products = await productModel.find({ _id: { $in: idsArray } });

        // Verifica se foram encontrados produtos
        if (products.length === 0) {
            return res.status(200).json([]);
        }

        // Retorna os produtos encontrados
        return res.json(products);
    } catch (error) {
        return res.status(500).send(error);
    }
});



// Rota para obter um produto específico
productsRouter.get('/:productId', async (req: Request, res: Response) => {
    const productId = req.params.productId;

    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).send('Produto não encontrado.');
        }

        return res.status(200).send(product);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ocorreu um erro ao obter o produto.' });
    }
});


// Rota para obter todos os produtos com paginação
productsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1; // Página atual, padrão é 1 se não for especificado
        const itemsPerPage = parseInt(req.query.limit as string) || 2; // Número de itens por página, padrão é 10 se não for especificado

        const skip = (page - 1) * itemsPerPage;
        
        const products = await productModel
            .find()
            .skip(skip)
            .limit(itemsPerPage);

        return res.status(200).send(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ocorreu um erro ao obter os produtos.' });
    }
});


productsRouter.get('/category/:categoryName', async (req: Request, res: Response) => {
    const categoryName = req.params.categoryName;

    try {
        const productsInCategory = await productModel.find({ category: categoryName });

        if (productsInCategory.length === 0) {
            return res.status(404).send('Nenhum produto encontrado para essa categoria.');
        }

        return res.status(200).send(productsInCategory);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Produto não encontrado!');
    }
});