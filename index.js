const lesson = ()=>{
  fetch('https://openapi.programming-hero.com/api/levels/all')
  .then(res=>res.json())
  .then(data=> lessonName(data.data))
}
lesson()

const loadWord = (id)=>{
  const url = (`https://openapi.programming-hero.com/api/word/${id}`)
  fetch(url).then(res=>res.json()).then(data=>wordDetils(data.data))
}


const lessonName = (ele)=>{
  const id = document.getElementById('lesson')
  id.innerHTML="";
  ele.forEach(element => {
    id.innerHTML +=`
    <div>
    <button id="btn-${element.level_no}" onclick="lessonData(${element.level_no})" class="btn btnColor btn-outline btn-primary"><i class="fa-solid fa-book"></i> lesson ${element.level_no}</button>
    </div>
    `
  });
  
}

const lessonData = (id) =>{
  const url = (`https://openapi.programming-hero.com/api/level/${id}`)
  fetch(url)
  .then(res=>res.json())
  .then(data=> {
    removeColor()
    const click = document.getElementById(`btn-${id}`)
    click.classList.add('color')
    word(data.data)
  })
}
const removeColor =()=>{
  const removebtn = document.querySelectorAll('.btnColor')
removebtn.forEach(ele=> ele.classList.remove('color'))
}

const word = (word)=>{
  const id =document.getElementById('words')
  id.innerHTML="";
  if(word.length === 0){
    id.innerHTML+=`
    <div class="col-span-full">
          <div class="text-center  space-y-4  ">
          <p class="text-blue-400 text-lg ">আপনি এখনো কোন lesson নেই</p>
          <h1 class="text-3xl font-bold">পরবর্তী
           Lesson Select করুন।</h1>
        </div>
    </div>
    `
    return;
  }
  word.forEach(element => { 
    const {word,meaning,pronunciation} = element
    id.innerHTML+=`
    <div class="bg-white pb-3 md:py-10 w-auto h-[200px] rounded-xl"  onclick="modal(${element.id})" >
      <div class="text-center space-y-4">
      <h1>${word ? word:'word not found'}</h1>
      <h3>Meaning /Pronounciation</h3>
      <h2>${meaning ? meaning: 'meaning not found'} / ${pronunciation}</h2>
      <div class="flex justify-between mx-5 pb-5">
        <h1 onclick="loadWord(${element.id})"><i class="fa-solid fa-circle-exclamation"></i></h1>
        <h1><i class="fa-solid fa-xmark"></i></h1>
      </div>
      </div>
    </div>
    `
  });
}

const wordDetils = (word)=>{
  const details = document.getElementById('modal')
  details.innerHTML+=`
  <h1>hello</h1>
  `
 document.getElementById('modal_1)').showModal()
}