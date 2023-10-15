import { categoryModel } from '../model/category.model'
import { Request, Response, Router } from 'express'

export const categoryRouter = Router()

categoryRouter.post('/createCategory', async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).send('O valor da categoria não pode estar vazio')
    }

    // Verifique se o valor já existe no banco de dados
    const categoriaExistente = await categoryModel.findOne({ name })
    if (categoriaExistente) {
      return res.status(400).send('Essa categoria já existe')
    }

    // Crie a categoria no banco de dados usando o modelo
    const novaCategoria = await categoryModel.create({ name })

    res.status(201).json({ success: 'Categoria criada!' })
  } catch (error) {
    console.error('Erro ao criar a categoria:', error)
    res.status(500).json({ message: 'Erro ao criar a categoria' })
  }
})

categoryRouter.delete('/deleteCategory/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Verifique se a categoria existe no banco de dados
    const categoria = await categoryModel.findById(id)
    if (!categoria) {
      return res.status(404).send('Categoria não encontrada')
    }

    // Exclua a categoria do banco de dados
    await categoryModel.findByIdAndDelete(id)

    res.status(200).json({ message: 'Categoria excluída com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir a categoria:', error)
    res.status(500).json({ message: 'Erro ao excluir a categoria' })
  }
})

categoryRouter.get('/getCategories', async (req: Request, res: Response) => {
  try {
    // Busque todas as categorias no banco de dados
    const categories = await categoryModel.find()

    res.status(200).json(categories)
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    res.status(500).json({ message: 'Erro ao buscar categorias' })
  }
})
