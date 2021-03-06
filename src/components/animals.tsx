import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IAnimal } from "../models/Animal";


export function Animals() {
    const [animals, setAnimals] = useState<IAnimal[]>([]);

    useEffect(() => {

        let animals = localStorage.getItem("animals");
        if (animals != null) {
            return setAnimals(JSON.parse(animals));
        }

        axios
            .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals"
            )
            .then(response => {
                let animalsFromApi = response.data.map((animal: IAnimal) => {
                    return new IAnimal(animal.id, animal.name, animal.latinName, animal.yearOfBirth, animal.shortDescription, animal.longDescription, animal.imageUrl, animal.medicine, animal.isFed, animal.lastFed);
                });

                setAnimals(animalsFromApi);
                localStorage.setItem("animals", JSON.stringify(animalsFromApi));
            });
    }, []);

    useEffect(() => {

        let animals: IAnimal[] = JSON.parse(localStorage.getItem("animals") || '[]');
        let fedtrue: boolean = false;

        animals.map(animal => {

            let hoursSinceFed = Math.floor((new Date().getTime() - new Date(animal.lastFed).getTime()) / (1000 * 60 * 60));

            if (hoursSinceFed > 4) {
                animal.isFed = false;
                fedtrue = true;
            };
        });
        if (fedtrue) { setAnimals([...animals]); }
        localStorage.setItem("animals", JSON.stringify(animals));
    }, [animals]);

    let animalsHTML = (<div className="allAnimals">
        {animals && animals.map(animal =>
            <div className="animalBox" key={animal.id}>

                {!animal.isFed && <div className="needFood">Hungrig</div>}
                <h1>{animal.name}</h1>
                <img src={animal.imageUrl}></img>
                <p className="year">{animal.yearOfBirth}</p>
                <p>{animal.shortDescription}
                    <br></br>
                    <Link to={"/animals/" + animal.id}>L??s mer</Link>
                </p>
            </div>
        )}
    </div>)


    return (
        <>{animalsHTML}</>
    );

}