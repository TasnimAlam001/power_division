export default async function getAllUtilities() {
    const utilities = await fetch("http://localhost:3000/utilities.json");
  
    if (!utilities.ok) {
      throw new Error("There was an error while fetching the data");
    }
    // console.log(utilities)
    return utilities.json();
  }
       