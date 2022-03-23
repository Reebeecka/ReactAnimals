import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IAnimal } from "../models/Animal";

export function ShowAnimal(){
    const[animalId, setAnimalId] = useState(0);

    const [fed, setFed] = useState(false);

    let params = useParams();

    useEffect(()=>{
        if(params.id)
        setAnimalId(+params.id);
    }, []);

    useEffect(()=>{
        if (animalId == 0) return;
        JSON.parse(localStorage.getItem("animals") || '[]');

    },[animalId]);


    let animals:IAnimal[] = JSON.parse(localStorage.getItem("animals") || '[]');

    let animal = animals.find((element) => {
        return element.id === animalId;
    });

    useEffect(()=>{
        if(animal && animal.isFed){
            let ms = ((new Date().getTime() - new Date(animal.lastFed).getTime())/(1000*60*60));

            if(ms > 3){
                setFed(false);
            }
            else{
                setFed(true);
            }

        }
    },[animal]);



    let animalHtml = (
        <div className="animal">
            <h1>{animal?.name}</h1>
            {animal?.isFed&& <div>
                {animal?.name} är <strong>mätt</strong> och åt senast {animal?.lastFed}
                </div>}
            {!animal?.isFed&& <div>
                {animal?.name} är <strong>hungrig</strong> och åt senast {animal?.lastFed}
                </div>}
            <img src={animal?.imageUrl}></img>
            <h4>Majsan föddes år <em>{animal?.yearOfBirth}</em> och latinska namnet är <em>{animal?.latinName}</em></h4>
            <p>Mediciner: {animal?.medicine}</p>
            <h2>Mer om {animal?.name}</h2>
            <p>{animal?.longDescription}</p>
        </div>
    );

    function changeFed(){
        setFed(!fed);
        if(animal && !animal.isFed) {
            animal.isFed=true
        };
        if(animal?.lastFed) {
            animal.lastFed = new Date();
        };
        localStorage.setItem("animals", JSON.stringify(animals));
    };


    return(<div className="animalall">
    {animalHtml}
    <button disabled={fed} onClick={changeFed}>Mata</button>
    <Link to={"/animals"}>Tillbaka till alla djur</Link>
    </div>);
}