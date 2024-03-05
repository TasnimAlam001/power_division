import getAllUtilities from "./getAllUtilities";


export default async function getUtility(id) {
  const utilities = await getAllUtilities(); 
  const utility = utilities.find(utility => utility.id == id);


  // console.log("blah :", utility)
  
 return utility;

}
