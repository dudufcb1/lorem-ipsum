import { useEffect, useState } from 'react';
import data from './data';
import { nanoid } from 'nanoid';

const App = () => {
  //Definimos contador de parrafos a generar
  const [count, setCount] = useState(1);
  //text extraido que en principio está vacío
  const [text, setText] = useState([]);
  //estado del botón copiar
  const [isTextGenerated, setIsTextGenerated] = useState(false); // Estado para controlar la visibilidad del botón

  //funcion que cree para evitar que pongan manualmente otro número y la app se rompa
  const setQuantity = (quantity) => {
    if (quantity < 0) {
      setCount(1);
    } else if (quantity < data.length) {
      setCount(quantity);
    } else {
      setCount(data.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* let amount = Number(count); */
    let amount = parseInt(count);
    //console.log(amount); //en el slice de abajo la posición 8 no se toma, solo se toma hasta la 7 de 0 a 7 que igual de 8
    /* let result = data.slice(0, amount); */
    /* setText(data.slice(0, amount)); */
    //solución del profe pasandole el data con el slic
    /* setText(result);  esta era la solución mía, pero la cambié a una que me de parrafos random*/
    //mi solución ^ utilizando una variable intermedia
    //solución chatgpt
    let randomIndex = Math.floor(Math.random() * (data.length - amount + 1)); // Generar un índice aleatorio
    let result = data.slice(randomIndex, randomIndex + amount); // Utilizar el índice aleatorio para seleccionar el slice
    setText(result);
    setIsTextGenerated(true);
  };
  //  console.log(count);

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copiado al portapapeles');
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    // Cuando el estado de texto cambia, se actualiza el estado para mostrar u ocultar el botón de copiar
    setIsTextGenerated(text.length > 0);
  }, [text]);

  return (
    <section className="section-center">
      <h4>Cansado de los aburridos lorem ipsum?</h4>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">Párrafos</label>
        <input
          type="number"
          name="amount"
          id="amount"
          min="1"
          step="1"
          max={data.length}
          value={count} //Nos muestra lo que tenemos en estado, digamos que el placeholder
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button className="btn" type="submit">
          Generate
        </button>
        {isTextGenerated ? (
          <button
            className="btn"
            type="button"
            onClick={() => copyText(text.join('\n'))}
          >
            Copiar
          </button>
        ) : (
          ''
        )}
      </form>
      <article className="lorem-text">
        {text.map((item) => {
          //console.log(item);
          return (
            <p className="" key={nanoid()}>
              {item}
            </p>
          );
        })}
      </article>
    </section>
  );
};
export default App;
