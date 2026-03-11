const express = require("express");
const cors = require("cors")

const app = express()

const {intializerDatabase} = require("./db.connect")

const Recipe = require("./recipe.modals")

intializerDatabase()
app.use(cors())
app.use(express.json())


async function recipeData(data){
    try{
        const recipe = new Recipe(data)
        const savedData = await recipe.save()
        return savedData

    }catch(error){
        throw error 
    }
}

app.post("/recipes",async(req,res) => {
    try{
     const recipe = await recipeData(req.body)
    res.status(201).json({message: "data saved to the dbms.", data : recipe})
    }catch(error){
        res.status(500).json({error: "failed to fetch data."})
    }

} )

async function allDishes(){
    try{
        const recipe = await Recipe.find()
        return recipe
    }catch(error){
        throw error
    }
}
app.get("/recipes", async(req,res) => {
    try{
        const recipe = await allDishes()
       
        if(!recipe){
            res.status(404).json({error : "Dishes are not found."})
        }else{
            res.json(recipe)
        }
    }catch(error){
        res.status(500).json({error : "failed to fetch data."})
    }

})

async function recipeTitle (title){
    try{
        const recipe = await Recipe.findOne({title : title })
        return recipe;
    }catch(error){
        throw error 
    }
}

app.get("/recipes/title/:title", async (req, res) => {
    try{
 const recipe = await recipeTitle(req.params.title)

 if(recipe){
    res.json(recipe)
 }else{
    res.status(404).json({error : "data not found"})
 }
 
    }catch(error){
        res.status(500).json({error : "failed to fetch data."})
    }
   
})

async function recipeAuthor (author){
    try{
        const recipe = await Recipe.find({author : author })
        return recipe;
    }catch(error){
        throw error 
    }
}

app.get("/recipes/author/:author", async(req,res) => {
    try{
        const recipe = await recipeAuthor(req.params.author)
        if(recipe){
            res.json(recipe)
        }else{
            res.status(404).json({error : "data not found."})
        }
    }catch(error){
        res.status(500).json({error: "failed to fetch data."})
    }

})

async function recipeDifficulty(difficulty){
    try{
        const recipe = await Recipe.find({difficulty: difficulty})
        return recipe
    }catch(error){
throw error
    }
}

app.get("/recipes/difficulty/:difficulty", async (req, res)=> {
    try{
        const recipe = await recipeDifficulty(req.params.difficulty)
        if(recipe){
            res.json(recipe)
        }else{
            res.status(404).json({error: "Data not found."})
        }
    }catch(error){
        res.status(500).json({error : "failed to fetch data."})
    }
})

async function recipeById (recipeId, update){
    try{
        const recipe = await Recipe.findByIdAndUpdate(recipeId, update , {new: true})
        return recipe
    }catch(error){
        throw error
    }
}

app.post("/recipes/recipeId/:id", async (req, res) => {
    try{
        const recipe = await recipeById(req.params.id , req.body)
        if(recipe){
            res.json(recipe)
        }else{
            res.status(404).json({error : "data not found."})
        }
    }catch(error){
        res.status(500).json({error : "failed to fetch"})
    }
})

async function recipesTitle (recipeTitle, update){
    try{
        const recipe = await Recipe.findOneAndUpdate({title : recipeTitle}, update , {new: true})
        return recipe
    }catch(error){
        throw error
    }
}

app.post("/recipes/recipeTitle/:title", async (req,res) => {
    try{
        const recipe = await recipesTitle(req.params.title, req.body)
        if(recipe){
            res.json(recipe)
        }else{
            res.status(404).json({error : "data not found."})
        }
    }catch(error){
        res.status(500).json({error : "failed to fetch data."})
    }
})

async function deleteRecipe(id){
    try{
        const recipe = await Recipe.findByIdAndDelete(id)
        return recipe
    }catch(error){
        throw error 
    }
}

app.delete("/recipes/:id", async (req, res) => {
    try{
        const deletedRecipe = await deleteRecipe(req.params.id)
        if(deletedRecipe){
            res.status(200).json({message: "data deleted successfully", data : deletedRecipe})  
              }else{
                res.status(404).json({error : "Data not found."})
              }
    }catch(error){
        res.status(500).json({error: "failed to fetch data."})
    }
})

const PORT = 3000
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT} port.`)
})

