import fs from "fs"
import { User } from "../model/user.js"
import path from "path"
import userSchema from "../utils/validation.js"

const usersFile = path.resolve(process.cwd(), "data", "user.json")

const readUsersFromFile = () => {
    try {
        const rawData = fs.readFileSync(usersFile, "utf-8")
        if(!rawData.trim()) {
            return []
        }
        return JSON.parse(rawData)
    }
    catch(error) {
        console.error('Erreur lors de la lecture ou du parsing du fichier user.json:', error)
        return []
    }
}

    const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null,2))
}

    export const getUsers = (req, res) => {
    const users = readUsersFromFile()
    res.json(users)
}
export const getUser = (req, res) => {
    const users = readUsersFromFile()
    const user = users.find(u => u.id === parseInt(req.params.id))
    res.json(user)
}

export const createUser = (req, res) => {
    const users = readUsersFromFile()
    try {
        const { value, error } = userSchema.validate(req.body);
        const user = new User(Date.now(), req.body.name, req.body.email, req.body.password, new Date().toISOString())
       
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
        const emailExists = users.some(u => u.email === value.email);
        if (emailExists) {
          return res.status(400).json({ message: 'Email already exists' });
        }
        users.push(user)
        writeUsersToFile(users)
        res.status(201).json(user)
     
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

export const updateUser = (req, res) => {
    const users = readUsersFromFile()
    const user = users.find(u => u.id === parseInt(req.params.id))

    if(!user) return res.status(404).send("user not found")

    user.name = req.body.name || task.name
    user.email = req.body.email || task.email
    user.password = req.body.password || task.password
    user.accountDate = req.body.accountDate || task.accountDate
    

    
    writeUsersToFile(users)

    res.json(user)
}

export const deleteUser = (req, res) => {
    const users = readUsersFromFile()
    const index = users.findIndex(u => u.id === req.params.id)
    if(!index) return res.status(404).send("User not found")
    users.splice(index, 1)
    writeUsersToFile(users)
    res.status(204).send()
}