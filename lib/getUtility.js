import { useEffect } from "react";
import getAllUtilities from "./getAllUtilities";

//TODO: getUtility from api
export default async function getUtility(id) {
  const utilities = await getAllUtilities(); 
  const utility = utilities.find(utility => utility.id == id);

  


  
 return utility;

}
