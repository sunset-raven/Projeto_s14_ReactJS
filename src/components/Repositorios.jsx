import { useState, useEffect } from "react"
import Axios from 'axios'

export function Repositorios() {
    const [reposFromApi, setReposFromApi] = useState([])
    const [searchedTerm, setSearchedTerm] = useState('')
    const [filteredRepos, setfilteredRepos] = useState([])
    const baseURL = 'https://api.github.com/users/sunset-raven/repos'

    useEffect(() => {
        async function getData() {
            const response = await Axios.get(baseURL)
            setReposFromApi(response.data)
        }
        getData()
    }, [])

    function handleSearch(event) {
        setSearchedTerm(event.target.value)
    }

    useEffect(() => {
        const filtered = reposFromApi.filter(repository => {
            return repository.name.includes(searchedTerm)
        })
        setfilteredRepos(filtered)
    }, [reposFromApi, searchedTerm])

    return (
        <>
            <input placeholder="Digite sua busca" onChange={handleSearch} />
            {
                filteredRepos.map(repository => {
                    return (
                        <div key={repository.name}>
                            <p>{repository.name}</p>
                            <a href={repository.html_url}>conferir</a>
                        </div>
                    )
                })}
        </>

    )
}