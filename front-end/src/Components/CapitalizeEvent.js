const CapitalizeEvent = (event) => {
    let words =  event.split(" ")
    let update = []
  
    for (let word of words){
      if (word !== ""){
       update.push(word[0].toUpperCase() + word.slice(1))
      }
    }
  
    return update.join(" ")
}
  export default CapitalizeEvent;
  