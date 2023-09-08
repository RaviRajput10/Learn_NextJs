import React, { useState, useEffect } from "react";

const Dog = () => {
  const [image, setImage] = useState([]); 
  const [randomImage, setRandomImage] = useState(null); 
  const [isLoading, setLoading] = useState(true)


  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(false)

    const  formData = new FormData(e.target);
    const form_values = Object.fromEntries(formData);
    const { breed } = form_values
    console.log('form values', breed)
    fetchData(breed);

  }

   const  fetchData = async (breed) => {
    try {
      const resp = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
      const data = await resp.json();
      if (data.status === "success") {
        setImage(data.message);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect((breed) => {
  //   fetchData(breed); // Call the fetchData function
  // }, []);

  const randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    // Check if the image array is not empty
    if (image.length > 0) {
      const randomIndex = randomNumber(0, image.length - 1);
      setRandomImage(image[randomIndex]);

    }
  }, [image]); // Trigger when the image array changes



  return (
    <>
      <h1>Get random image</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="breed" />
        <button type="submit">Show image</button>
      </form>
      <br />
      <div
        style={{ height: "400px", width: "400px", border: "1px solid black" }}
      >
        {/* Display the random image */}
        { isLoading ? "Loading..." :
        randomImage && <img src={randomImage}   style={{ height: "400px", width: "400px"}} alt="Random Dog" /> 
        }
      </div>
    </>
  );
};

export default Dog;
