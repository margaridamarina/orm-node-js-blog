const database = require('../models')

class SubcategoriaController {
  // static async pegaSubcategoriasAtivas(req, res){
  //   try {
  //   // console.log({database, Categoria:database.Subcategorias})
  //     const SubcategoriasAtivas = await database.Subcategorias.findAll()
  //     return res.status(200).json(SubcategoriasAtivas)  
  //   } catch (error) {
  //     return res.status(500).json(error.message)
  //   }
  // }

  static async pegaTodasAsSubcategorias(req, res){
    try {
      const todasAsSubcategorias = await database.Subcategorias.findAll()
      return res.status(200).json(todasAsSubcategorias)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaSubcategoriaPorTitulo(req, res) {
    const { subcategoriaTitle } = req.params
    try {
      const umaSubcategoria = await database.Subcategorias.findOne( { 
        where: { 
          title: String(subcategoriaTitle) 
        }
      })
      return res.status(200).json(umaSubcategoria)
    } catch (error) {
      console.error(error)
      return res.status(500).json(error.message)
    }
  }

  static async criaSubcategoria(req, res) {
    const { subcategoriaTitle } = req.params
    const novaSubcategoria = { ...req.body, subcategory_title: String(subcategoriaTitle) }
    try {
      const novaSubcategoriaCriada = await database.Subcategorias.create(novaSubcategoria)
      return res.status(200).json(novaSubcategoriaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaSubcategoria(req, res) {
    const { subcategoriaTitle } = req.params
    const novasInfos = req.body
    try {
      await database.Subcategorias.update(novasInfos, { 
        where: { 
          title: String(subcategoriaTitle),
        }})
      const SubcategoriaAtualizada = await database.Subcategorias.findOne( { 
        where: { 
          title: String(subcategoriaTitle) }
        })
      return res.status(200).json(SubcategoriaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaSubcategoria(req, res) {
    const { subcategoriaTitle } = req.params
    try {
      await database.Subcategorias.destroy(
        { where: { 
          title: String(subcategoriaTitle) }
        })
      return res.status(200).json({ mensagem: `subcategoria ${subcategoriaTitle} deletada` })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  
  // static async restauraSubcategoria(req, res) {
  //   const { subcategoriaTitle } = req.params
  //   try {
  //     await database.Subcategorias.restore({ where: { id: Number(subcategoriaTitle) }})
  //     return res.status(200).json({ mensagem: `id ${subcategoriaTitle} restaurado` })
  //   } catch (error) {
  //     return res.status(500).json(error.message)
  //   }
  // }
}

module.exports = SubcategoriaController