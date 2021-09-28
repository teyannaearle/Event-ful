const CapitalizeEvent = (event) => {
    let words =  event.split(" ")
    let update = []
  
    for (let word of words){
       update.push(word[0].toUpperCase() + word.slice(1))
    }
  
    return update.join(" ")
}
  export default CapitalizeEvent;
  