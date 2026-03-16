import imagen from './imagen.jpg'

function Titulo(){
    return(
        <div>
            <h1>EL ACERTIJO</h1>
            <hr/>
            <img src={imagen} alt="logo"></img>
        </div>
    );
}

export default Titulo;