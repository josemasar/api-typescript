import express from "express"
import { getClub, getResultado } from "./database"

export default function createServer(){
    const app = express()
    app.get("/resultados/:equipo1/:equipo2", (req,res)=>{
        try{
            let team1 = getClub(req.params.equipo1)
            let team2 = getClub(req.params.equipo2)
            let match = getResultado(team1, team2)
            if (match.score){
                res.json({
                    date: match.date,
                    score: `${team1}: ${match.score.ft[0]} - ${team2}: ${match.score.ft[1]}`
                })
            }else{
                res.json({
                    team1,
                    team2,
                    date: match.date
                })
            }
        }catch(err){
            if (err instanceof Error) {
            res.status(400).json({
                error: err.message
            })
            }
        }
    })
    return app
}
