<<<<<<< HEAD
export function findImage(strParameter, regeParameter, regeParameter2, idk, cliente) {
    for(let i = 0; i < 3; i++) {
        var randomImage = strParameter.match(regeParameter)
        var randomPost = strParameter.match(regeParameter2)
        if (randomImage === null) {
            if(i === 2) {
                cliente.say(idk, `no encontre una PORONGA DE MONO BabyRage`)
            }
        } else {
            for (let i = 0; i < 1; i++) {
                var image = randomImage[i];
                var post = randomPost[i];
            }
            cliente.say(idk, `${image} PogChamp, y aqui esta el tonto POST BabyRage https://www.reddit.com${post}`)
            return
        } 
    } 
=======
export function findImage(strParameter, regeParameter, regeParameter2, idk, cliente) {
    for(let i = 0; i < 3; i++) {
        var randomImage = strParameter.match(regeParameter)
        var randomPost = strParameter.match(regeParameter2)
        if (randomImage === null) {
            if(i === 2) {
                cliente.say(idk, `no encontre una PORONGA DE MONO BabyRage`)
            }
        } else {
            for (let i = 0; i < 1; i++) {
                var image = randomImage[i];
                var post = randomPost[i];
            }
            cliente.say(idk, `${image} PogChamp, y aqui esta el tonto POST BabyRage https://www.reddit.com${post}`)
            return
        } 
    } 
>>>>>>> e5d4d4f08e36ed195e90f2a82b7868054ccef80d
}