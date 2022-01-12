async function getData(){
    let url = 'https://test.defontana.com/'
    try{
        let res = await fetch(url)
        if(!res.ok){
            throw Error(res.statusText)
        }
        let data = await res.json()
        return data
    } catch(error){
        console.log(error)
    }
}

async function renderTree(){
    let data = await getData()
    let newData = data.data.sort((a, b) => a.ID - b.ID)

    for(let i = 0; i < newData.length; i++){
        if(newData[i].Parent == 0){
            let parent = document.createElement('ul')
            parent.setAttribute('class', 'parent')
            parent.setAttribute('id', newData[i].ID)
            parent.innerHTML = `<li class="dBlock" id="myList"><span class="caret"><h3>${newData[i].Name}</h3></span></li>`
            document.body.appendChild(parent)
        }
    }

    for(let i = 0; i < newData.length; i++){
        if(newData[i].Parent != 0){
            let child = document.createElement('ul')
            child.setAttribute('class', 'child nested')
            child.setAttribute('id', newData[i].ID)
            child.innerHTML = `<li><p>${newData[i].Name}</p></li>`
            document.getElementById(newData[i].Parent).appendChild(child)
        }
    }

    $('.toggler').click(function(){
        $('.parent').children('ul').toggleClass('nested')
        $('.child').children('ul').toggleClass('nested')
    })
}

renderTree()